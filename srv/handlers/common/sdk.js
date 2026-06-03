const cds = require('@sap/cds');
const {
  LogType: {
    elements: {
      code: {enum: mLogTypeEnum},
    },
  },
} = cds.entities('com.aleron.monitor');

/**
 * Reads the OData error & converts it into Error Logs for monitor app
 * @param {ErrorResponse.body} oBody body of the error for parsing into logger format
 * @returns {array} array of OData errors as process logs
 * @public
 */
function parseODataV2Error(oBody, bExcludeTechnical = true) {
  // convert oData error format to process log format
  const aProcessLogs = oBody.error.innererror.errordetails.flatMap((oError) =>
    oError.code.includes('/IWBEP/') && bExcludeTechnical
      ? [] // Exclude IWBEP errors like 'An Exception was raised , etc.'
      : [
          {
            message: oError.message,
            type: mLogTypeEnum.error.val,
          },
        ],
  );
  return aProcessLogs;
}

module.exports = {parseODataV2Error};
