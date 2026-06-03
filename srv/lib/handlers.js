const { getSoapService } = require('./soap-service');

let userReadServicePromise = null;
let userReadServiceEndpoint = { url: null };

let journalServicePromise = null;
let journalServiceEndpoint = { url: null };

// Initialize SOAP service
(async function () {
  userReadServicePromise = getSoapService(
    'UserRead',
    './srv/lib/wsdl/QUERYBUSINESSUSERIN.wsdl',
    userReadServiceEndpoint
  );
})();

// journal-entry init
// (async() => {
//   journalServicePromise = getSoapService(
//     'JournalEntryCreateRequestConfirmation_In',
//     './srv/lib/wsdl/JOURNALENTRYCREATEREQUESTCONFI.wsdl',
//     journalServiceEndpoint.url =
//   'https://my420210-api.s4hana.cloud.sap/sap/bc/srt/scs_ext/sap/journalentrycreaterequestconfi'
//   );
// })();

(async() => {
   journalServicePromise = getSoapService(
      'JournalEntryCreateRequestConfirmation_In',
      './srv/lib/wsdl/JOURNALENTRYCREATEREQUESTCONFI.wsdl',
      'https://my420210-api.s4hana.cloud.sap/sap/bc/srt/scs_ext/sap/journalentrycreaterequestconfi'
    );
   journalServicePromise.then(c => journalServiceEndpoint.url = c.endpoint);
  })();

// Extract all `contains(...)` or `startswith(...)` values from $filter
function extractSearchText(req) {
  const where = req.query?.WHERE;
  if (!where || !Array.isArray(where)) return null;

  const searchTerms = new Set();

  for (const clause of where) {
    if (
      (clause?.op === 'contains' || clause?.op === 'startswith') &&
      clause.args?.[1]?.val
    ) {
      searchTerms.add(clause.args[1].val.toLowerCase());
    }
  }

  return searchTerms.size > 0 ? [...searchTerms] : null;
}

async function readBusinessUser(req) {
  try {
    const searchTerms = extractSearchText(req); // e.g., ['s', 'm']
    const userReadService = await userReadServicePromise;
    userReadService.setEndpoint(userReadServiceEndpoint.url);

    const param = {
      BusinessUser: {
        PersonIDInterval: {
          IntervalBoundaryTypeCode: 9,
          LowerBoundaryPersonID: '0000000000'
        },
        BusinessPartnerRoleCodeInterval: {
          IntervalBoundaryTypeCode: 9,
          LowerBoundaryBusinessPartnerRoleCode: '000000'
        }
      },
      QueryProcessingConditions: {
        QueryHitsUnlimitedIndicator: true
      }
    };

    const resp = await userReadService.QueryBusinessUserInAsync(param);

    const busUsers = [];
    if (resp?.[0]?.BusinessUser?.length) {
      for (const busUser of resp[0].BusinessUser) {

        // new line
        const firstRel = busUser.Relationship?.[0]?.Partner1 || {};
        const entry = {
          PersonExternalID: busUser.PersonExternalID,
          PersonID: busUser.PersonID,
          PersonFullName: busUser.PersonalInformation?.PersonFullName,
          UserName: busUser.User?.UserName || busUser.PersonExternalID,
          EmailAddress: busUser.WorkplaceInformation?.EmailAddress,

          BusinessPartnerID:         firstRel.BusinessPartnerID,
          BusinessPartnerExternalID: firstRel.BusinessPartnerExternalID,
          BusinessPartnerRoleCode:   busUser.BusinessPartnerRoleCode,
          RoleName:                  busUser.User?.Role?.[0]?.RoleName
        };

        // Apply filter (client-side) if search terms exist
        if (searchTerms?.length) {
          const isMatch = searchTerms.some((term) =>
            (entry.PersonFullName?.toLowerCase().includes(term)) ||
            (entry.EmailAddress?.toLowerCase().includes(term)) ||
            (entry.UserName?.toLowerCase().includes(term)) ||
            (entry.PersonExternalID?.toLowerCase().includes(term))
          );

          if (!isMatch) continue;
        }

        busUsers.push(entry);
        if (busUsers.length >= 100) break;
      }
    }

    return busUsers;
  } catch (err) {
    req.error(err.code || 500, err.message || 'Error in readBusinessUser');
  }
}

module.exports = {
  readBusinessUser,
  journalServicePromise,
  journalServiceEndpoint
};
