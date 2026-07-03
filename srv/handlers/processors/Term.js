const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Processor-Term');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');
const SalesOrderComm = require('../communicators/SalesOrder');
const SalesContractComm = require('../communicators/SalesContract');
const { Terminations } = cds.entities('com.aleron.monitor');

class Term extends Processor {
  constructor(options) {
    super(options);
    this.recordsEntity = 'com.aleron.monitor.Terminations';
    this.columnsForRecords = this._getColumnsForFetch();
    this.salesOrderAPI = null;
    this.salesContractAPI = null;
  }

  _getColumnsForFetch() {
    return [
      'ID', 'file_ID', 'processLevel_code', 'valid',
      'contractNo', 'term', 'employeeNo', 'endDate',
      'actionReason', 'salesDocumentType', 'workOrderWN'
    ];
  }

  prepareCommunicators() {
    this.salesOrderAPI = new SalesOrderComm();
    this.salesContractAPI = new SalesContractComm();
  }

  async validateRecords(sProcessCode, bBreakExecution) {
    const aPassedRecordIDs = [];
    const aSkippedRecords = [];

    await ProcessLogger.removeLogs(this.recordIDs, null, sProcessCode);
    const aRecordsForProcessing = this.records.filter(r => this.shouldRecordProcess(r, sProcessCode));

    for (const record of aRecordsForProcessing) {
      aPassedRecordIDs.push(record.ID);
    }

    if (aPassedRecordIDs.length) {
      await Promise.allSettled([
        ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode),
        ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3}))),
        this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
        UPDATE(Terminations).set({ valid: true, processLevel_code: sProcessCode }).where({ ID: { in: aPassedRecordIDs } })
      ]);
    }

    this.updateExclusionSet({ passed: aPassedRecordIDs, failed: [], skipped: aSkippedRecords, bBreakExecution });
    return { hasError: false, continue: true };
  }

  async _getSalesOrderByVBELNAndContract(vbeln, contractNo) {
    const query = SELECT.one.from('A_SalesOrder').where({
      SalesOrder: vbeln,
      ReferenceSDDocument: contractNo
    });
    return await this.salesOrderAPI.executeQuery(query);
  }

  async processSalesOrder(sProcessCode, bBreakExecution) {
    if (!this.salesOrderAPI) this.prepareCommunicators();

    const aRecordsForProcessing = this.records.filter(r => this.shouldRecordProcess(r, sProcessCode));
    const aErrorLogs = [], aPassedRecordIDs = [], aFailedRecordIDs = [];

    this.updateProcessingState(sProcessCode);
    LOG.info(`[Step 3] Begin Sales Order Processing for ${aRecordsForProcessing.length} records`);

    for (const record of aRecordsForProcessing) {
      const { ID, salesDocumentType: AUART, contractNo: CONTRACT, workOrderWN: VBELN, endDate } = record;
      LOG.info(`[${ID}] START: AUART=${AUART}, CONTRACT=${CONTRACT}, VBELN=${VBELN}, ENDDA=${endDate}`);

      try {
        // Step 1: AUART check
        if (!AUART) {
          LOG.warn(`[${ID}] Missing AUART`);
          aErrorLogs.push({ record_ID: ID, message: 'WO type is missing.', process_code: sProcessCode });
          aFailedRecordIDs.push(ID);
          continue;
        }

        if (!['SC', 'MS', 'IC', 'CP'].includes(AUART)) {
          LOG.warn(`[${ID}] Invalid AUART value: ${AUART}`);
          aErrorLogs.push({ record_ID: ID, message: `WO type '${AUART}' is not supported.`, process_code: sProcessCode });
          aFailedRecordIDs.push(ID);
          continue;
        }

        // Step 2: Fetch Sales Order by VBELN + Contract
        LOG.info(`[${ID}] Fetching Sales Order where VBELN = ${VBELN} and Contract = ${CONTRACT}`);
        const soData = await this._getSalesOrderByVBELNAndContract(VBELN, CONTRACT);

        if (!soData) {
          LOG.error(`[${ID}] Sales Order not found for VBELN=${VBELN} and Contract=${CONTRACT}`);
          aErrorLogs.push({ record_ID: ID, message: `Sales Order ${VBELN} not found for contract ${CONTRACT}.`, process_code: sProcessCode });
          aFailedRecordIDs.push(ID);
          continue;
        }

        const {
          YY1_CustomSalesOrder_SDH: VAR_CON_DOC_TYP,
          SalesOrganization,
          DistributionChannel,
          Division,
          OverallOrdReltdBillgStatus: FKSAK,
          CustomerPriceGroup: priceGroup
        } = soData;

        LOG.info(`[${ID}] SO Type: ${VAR_CON_DOC_TYP}, Org=${SalesOrganization}, DC=${DistributionChannel}, Div=${Division}`);
        LOG.info(`[${ID}] FKSAK=${FKSAK}, PriceGroup=${priceGroup}`);

        // Step 3: Contract type logic
        if (VAR_CON_DOC_TYP === 'ZCCP') {
          LOG.warn(`[${ID}] Contract type ZCCP is not eligible for termination`);
          aErrorLogs.push({ record_ID: ID, message: 'Termination only applies to Managed services and Sub contracting.', process_code: sProcessCode });
          aFailedRecordIDs.push(ID);
          continue;
        }

        if (!['ZWMS', 'ZWSC'].includes(VAR_CON_DOC_TYP)) {
          LOG.warn(`[${ID}] Unsupported contract type: ${VAR_CON_DOC_TYP}`);
          aErrorLogs.push({ record_ID: ID, message: `Unsupported contract type ${VAR_CON_DOC_TYP}.`, process_code: sProcessCode });
          aFailedRecordIDs.push(ID);
          continue;
        }

        // Step 4: Price group decision
        record.sapPO = priceGroup === 'ZM' ? '' : 'X';
        LOG.info(`[${ID}] Derived sapPO = '${record.sapPO}'`);

        if (FKSAK === 'C') {
          LOG.warn(`[${ID}] FKSAK = C — No open line items, will not update`);
          aErrorLogs.push({ record_ID: ID, message: 'No open line item. Cannot block.' , process_code: sProcessCode});
        }

        // Step 5: Update SO if billing not complete
        if (FKSAK !== 'C') {
          const updatePayload = {
            SalesOrder: VBELN,
            OrderBlockReason: 'Z1',
            SalesOrderReason: 'Z02',
            DunningBlock: endDate
          };

          LOG.info(`[${ID}] Sending update payload: ${JSON.stringify(updatePayload)}`);
          const updateResult = await this.salesOrderAPI.updateSalesOrder(updatePayload);

          if (updateResult?.success) {
            LOG.info(`[${ID}] Sales Order ${VBELN} updated successfully`);
            await UPDATE(Terminations).set({
              valid: true,
              processLevel_code: sProcessCode,
              sapVBELN: VBELN
            }).where({ ID });
            aPassedRecordIDs.push(ID);
          } else {
            const msg = updateResult?.message || 'Unknown error';
            LOG.error(`[${ID}] Update failed: ${msg}`);
            aErrorLogs.push({ record_ID: ID, message: `Update failed: ${msg}`, process_code: sProcessCode });
            aFailedRecordIDs.push(ID);
          }
        } else {
          LOG.info(`[${ID}] No update performed (FKSAK = C). Marking record as valid.`);
          await UPDATE(Terminations).set({
            valid: true,
            processLevel_code: sProcessCode
          }).where({ ID });
          aPassedRecordIDs.push(ID);
        }

      } catch (err) {
        LOG.error(`[${ID}] EXCEPTION: ${err.message}`);
        aErrorLogs.push({ record_ID: ID, message: `Exception: ${err.message}`, process_code: sProcessCode });
        aFailedRecordIDs.push(ID);
      }
    }

    if (aErrorLogs.length) await ProcessLogger.addLogs(aErrorLogs);
    if (aPassedRecordIDs.length) await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
    if (aPassedRecordIDs.length) await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));

    this.updateExclusionSet({
      passed: aPassedRecordIDs,
      failed: aFailedRecordIDs,
      skipped: [],
      bBreakExecution
    });

    return {
      hasError: aFailedRecordIDs.length > 0,
      continue: true
    };
  }

  async executeStep(step, sProcessCode, bBreakExecution) {
    switch (sProcessCode) {
      case '1':
        LOG.info('Executing Step 1 - Validation');
        return await this.validateRecords(sProcessCode, bBreakExecution);
      case '3':
        LOG.info('Executing Step 3 - Sales Order Update');
        return await this.processSalesOrder(sProcessCode, bBreakExecution);
      default:
        LOG.warn(`Step ${sProcessCode} not implemented in Term processor`);
        return { hasError: false, continue: true };
    }
  }
}

module.exports = Term;
