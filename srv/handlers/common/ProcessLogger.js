const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Common-ErrorLogger');
const {
  ProcessLogs,
  LogType: {
    elements: {
      code: {enum: mLogTypeEnum},
    },
  },
} = cds.entities('com.aleron.monitor');
let db = null;
cds.connect
  .to('db')
  .then((dbConn) => (db = dbConn))
  .catch(() => {});

/**
 * Adds logs to the ProcessLogs entity in the database.
 *
 * @param {Array|Object} anyLogs - The logs to be added. Can be an array of log objects or a single log object.
 * @param {string} anyLogs[].record_ID - The record ID of the log.
 * @param {string} anyLogs[].message - The message of the log.
 * @param {string} [anyLogs[].type = LogType.error] - The message type. defaults to error
 * @returns {Promise<void>} - A promise that resolves when the logs have been added to the database.
 * @public
 */
async function addLogs(anyLogs) {
  let aLogs = [];

  if (Array.isArray(anyLogs)) {
    aLogs = anyLogs.flatMap((oLog) => {
      if (oLog.record_ID && oLog.message) {
        return [
          {
            record_ID: oLog.record_ID,
            message: oLog.message,
            type_code: oLog.type ?? mLogTypeEnum.error.val,
            process_code: oLog.process_code ?? null,
          },
        ];
      }
      return [];
    });
  } else if (anyLogs?.record_ID && anyLogs?.message) {
    aLogs.push({
      record_ID: anyLogs.record_ID,
      message: anyLogs.message,
      type_code: anyLogs.type ?? mLogTypeEnum.error.val,
      process_code: anyLogs.process_code ?? null,
    });
  } else {
    LOG._error && LOG.error('Invalid logs');
    return;
  }

  if (aLogs.length) {
    try {
      await db.run(INSERT.into(ProcessLogs).entries(aLogs));
      LOG._info && LOG.info(`Added ${aLogs.length} logs`);
    } catch (err) {
      LOG._error && LOG.error(err.message);
    }
    return;
  }
}

/**
 * Removes logs from the ProcessLogs entity in the database,
 * scoped to a specific process_code so that logs from other
 * steps are preserved.
 *
 * @param {string[]} anyRecordID - The record ID(s) of the logs to be removed.
 * @param {string} [ID]          - The optional specific log ID to remove.
 * @param {string} process_code  - The process step code to scope the deletion.
 * @returns {Promise<void>}
 * @public
 */
async function removeLogs(anyRecordID, ID, process_code) {
  if (!anyRecordID && !ID) {
    LOG._error && LOG.error('Neither ID nor record_ID provided');
    return;
  }

  try {
    if (ID) {
      await db.run(DELETE.from(ProcessLogs).where({ID: ID, process_code: process_code}));
      LOG._info && LOG.info(`Removed log with record_ID: ${anyRecordID} and ID: ${ID}`);
    } else if (Array.isArray(anyRecordID)) {
      await db.run(DELETE.from(ProcessLogs).where({record_ID: {in: anyRecordID}, process_code: process_code}));
      LOG._info && LOG.info(`Removed logs for record IDs: ${anyRecordID} at process_code: ${process_code}`);
    } else {
      await db.run(DELETE.from(ProcessLogs).where({record_ID: anyRecordID, process_code: process_code}));
      LOG._info && LOG.info(`Removed logs with record_ID: ${anyRecordID} at process_code: ${process_code}`);
    }
  } catch (err) {
    LOG._error && LOG.error(err.message);
  }
  return;
}

module.exports = {addLogs, removeLogs};
