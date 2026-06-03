// Jobs/syncBusinessUsers.js
const cds            = require('@sap/cds');
const { getSoapService } = require('../lib/soap-service');

// ★ add this line ★
const { DELETE, INSERT } = cds.ql;

let userReadServicePromise = null;
let userReadServiceEndpoint = { url: null };

(async function () {
  userReadServicePromise = getSoapService(
    'UserRead',
    './srv/lib/wsdl/QUERYBUSINESSUSERIN.wsdl',
    userReadServiceEndpoint
  );
})();

module.exports = async function syncBusinessUsers() {
  const db = await cds.connect.to('db');
  const CachedBusinessUser = cds.model.definitions['trip.CachedBusinessUser'];
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
  if (!resp?.[0]?.BusinessUser?.length) {
    console.log('[syncBusinessUsers] no users returned');
    return;
  }

  const users = resp[0].BusinessUser.map(u => {
    const firstRel = u.Relationship?.[0]?.Partner1 || {};

    return {
      PersonID:                   u.PersonID,
      PersonExternalID:           u.PersonExternalID,
      PersonFullName:             u.PersonalInformation?.PersonFullName,
      UserName:                   u.User?.UserName || u.PersonExternalID,
      EmailAddress:               u.WorkplaceInformation?.EmailAddress,

      BusinessPartnerID:          firstRel.BusinessPartnerID,
      BusinessPartnerExternalID:  firstRel.BusinessPartnerExternalID,
      BusinessPartnerRoleCode:    u.BusinessPartnerRoleCode,
      RoleName:                   u.User?.Role?.[0]?.RoleName
    };
  });

  // now these will work, because DELETE & INSERT are defined
  await db.run(DELETE.from(CachedBusinessUser));
  await db.run(INSERT.into(CachedBusinessUser).entries(users));

  console.log(`[syncBusinessUsers] Synced ${users.length} users`);
};
