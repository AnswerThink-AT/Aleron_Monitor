const cds = require('@sap/cds');
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql;
const moment = require('moment');
const LOG = cds.log('Monitor.Procesor-Bonus_G');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');

const SalesContractComm = require('../communicators/SalesContract');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SalesOrderComm = require('../communicators/SalesOrder');
const PurchaseOrderComm = require('../communicators/PurchaseOrder');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const SmartyAddressComm = require('../communicators/SmartyAddress');
const ProductComm = require('../communicators/Product');
const WorkforceComm = require('../communicators/Workforce');
const SupplierInvoiceComm = require('../communicators/SupplierInvoice');
const BillingTypeComm = require('../communicators/BillingType');
const BomnusComm = require('../communicators/Bonus');
const SupplierLFA1Comm = require('../communicators/SupplierLFA1'); // ADD

const { determineConditionType } = require('../common/pricingHelper');

// At the top of the class/file (once)
const L = '[Monitor.Processor-Bonus_G][SO CREATE/CHANGE]';
const safe = (v) => {
  try { return typeof v === 'string' ? v : JSON.stringify(v); }
  catch { return String(v); }
};
const log = (logger, level, msg, ctx={}) => {
  const line = `${L} ${msg}${Object.keys(ctx).length ? ' :: ' + safe(ctx) : ''}`;
  if (level === 'error') return logger?.error ? logger.error(line) : console.error(line);
  if (level === 'warn')  return logger?.warn  ? logger.warn(line)  : console.warn(line);
  return logger?.info ? logger.info(line) : console.log(line);
};


// Utility & Common functions
const { toEmployeeType } = require('../common/utils');
// const { UPDATE, SELECT, orderBy } = require('@sap/cds/lib/ql/cds-ql');
const { or } = require('@sap-cloud-sdk/odata-v2');
// const SalesOrder = require('../communicators/SalesOrder');

// List of required entities
const {
    Bonus,
    FieldValidations,
    FieldValidations: {
        elements: {
            validation: { enum: mFieldValidationTypeEnum },
        },
    },
} = cds.entities('com.aleron.monitor');

class Bonus_G extends Processor {
    constructor(options) {
        super(options);
        // Processor Specific configuration
        this.recordsEntity = 'com.aleron.monitor.Bonus';
        this.LOG = cds.log('Monitor.Processor-Bonus_G');
        this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

        // Communicators used by WorkOrdersWN Processor
        this.salesContractAPI = null;
        this.businesPartnerAPI = null;
        this.countryRegionAPI = null;
        this.salesOrderAPI = null;
        this.PurchaseOrderAPI = null;
        this.smartyAddressAPI = null;
        this.enterpriseProjectAPI = null;
        this.empCustInfoAPI = null;
        this.productAPI = null;
        this.workforceAPI = null;
        this.supplierInvoiceAPI = null;
        this.supplierLFA1API = null; // ADD
        this.billingTypeAPI = null;
        this.BonusAPI = null;
    }

    prepareCommunicators() {
        this.LOG._info && this.LOG.info('Preparing Communicators');
        this.salesContractAPI = new SalesContractComm();
        this.businesPartnerAPI = new BusinessPartnerComm();
        this.salesOrderAPI = new SalesOrderComm();
        this.smartyAddressAPI = new SmartyAddressComm();
        this.enterpriseProjectAPI = new EnterpriseProjectComm();
        this.empCustInfoAPI = new EmpCustInfoComm();
        this.productAPI = new ProductComm();
        this.workforceAPI = new WorkforceComm();
        this.PurchaseOrderAPI = new PurchaseOrderComm();
        this.supplierInvoiceAPI = new SupplierInvoiceComm();
        this.billingTypeAPI = new BillingTypeComm();
        this.BonusAPI = new BomnusComm();
        this.supplierLFA1API = new SupplierLFA1Comm();                // ADD
    }

    _getColumnsForFetch(sEntity) {
        const mEntityColumns = {
            'com.aleron.monitor.Bonus': [
                ...['ID', 'file_ID', 'processLevel_code', 'valid',], // mandatory columns        
                ...[
                    'customerFieldValue1',
                    'customerFieldName2',
                    'customerFieldValue2',
                    'customerFieldName3',
                    'customerFieldValue3',
                    'customerFieldName4',
                    'customerFieldValue4',
                    'customerFieldName5',
                    'customerFieldValue5',
                    'customerFieldName6',
                    'customerFieldValue6',
                    'customerFieldName7',
                    'customerFieldValue7',
                    'customerFieldName8',
                    'customerFieldValue8',
                    'customerFieldName9',
                    'customerFieldValue9',
                    'customerFieldName10',
                    'customerFieldValue10',
                    'customerFieldName11',
                    'customerFieldValue11',
                    'customerFieldName12',
                    'customerFieldValue12',
                    'customerFieldName13',
                    'customerFieldValue13',
                    'customerFieldName14',
                    'customerFieldValue14',
                    'customerFieldName15',
                    'customerFieldValue15',
                ], // customerfields
                ...[
                    'contractNo',
                    'wnInvoiceNo',
                    'sapEmployeeNo',
                    'wnWorkOrder',
                    'woType',
                    'internalOrder',
                    'endDate',
                    'customerBillRate',
                    'vendorPayRate',
                    'currency',
                    'customerPO',
                    //Required Field from Common Field
                    'distributionChannelSAP',
                    'projectNumberSAP',
                    'salesDocumentNoSAP',
                    'vcData1UUID',
                    'vcData2UUID',
                    'vcData1ICUUID',
                    'vcData2ICUUID',
                    'projectUUID',
                    'PORequiredSAP',
                    'salesDocumentNoSAP',
                    'salesItemNoSAP',
                    'purchaseDocumentNoSAP',
                    'purchaseDocumentItemSAP',
                    'z42SAP',
                    'invoiceDocumentNoSAP',
                    'fiscalYearSAP',
                    'salesOrderICUpdateRequired',
                    'p2SalesDocumentNoSAP'
                ], // Extra field
            ],
        };

        return [...new Set(mEntityColumns[sEntity])];
    }


    async validateRecords(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;

        LOG.info(`[VAL] start; process=${sProcessCode}, records=${(this.records || []).length}`);

        const aRecordsForProcessing = [];
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        let aRecordIDs = [],
            aSalesOrderWhere = [],
            aSalesOrderItemWhere = [],
            aSalesContractIDs = [];

        let mSalesOrders = new Map(),
            mSalesOrderItems = new Map();

        for (const record of this.records || []) {
            const willProcess = this.shouldRecordProcess(record, sProcessCode);
            LOG.info(`[VAL] record ${record.ID} shouldProcess=${willProcess} PL=${record.processLevel_code} valid=${record.valid}`);

            if (willProcess) {
                aRecordsForProcessing.push({ ...record });
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({ ...record });
                continue;
            }

            if (record.contractNo) aSalesContractIDs.push(record.contractNo);
            if (record.wnWorkOrder) aSalesOrderWhere.push(record.wnWorkOrder);
        }

        LOG.info(`[VAL] collected; forProcessing=${aRecordsForProcessing.length}, skipped=${aSkippedRecords.length}`);
        LOG.info(`[VAL] unique contractNos=${[...new Set(aSalesContractIDs)].length} -> ${JSON.stringify([...new Set(aSalesContractIDs)])}`);
        LOG.info(`[VAL] unique workOrders=${[...new Set(aSalesOrderWhere)].length} -> ${JSON.stringify([...new Set(aSalesOrderWhere)])}`);

        await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);
        LOG.info(`[VAL] ProcessLogger.removeLogs done; count=${aRecordIDs.length}`);

        this.updateProcessingState(sProcessCode);
        LOG.info(`[VAL] updateProcessingState(${sProcessCode}) done`);

        if (!aRecordsForProcessing.length) {
            LOG.info('[VAL] nothing to process; early return');
            return { hasError: false, continue: true };
        }

        LOG.info('[VAL] fetching reference data (SC/SO/SOItem/FieldValidations)…');
        const [
            { reason: anySalesContractErr, value: aSalesContracts },
            { reason: anySalesOrderErr, value: aSalesOrders },
            { reason: anySalesOrderItemErr, value: aSalesOrderItems },
            { reason: anyFieldValidationErr, value: aFieldValidations }
        ] = await Promise.allSettled([
            // Sales Contract Information with explicit fallback + logs
            this._fetchSalesContracts(aSalesContractIDs),

            // Sales Orders
            this.salesOrderAPI.executeQuery(
                SELECT.from('A_SalesOrder')
                    .columns(['SalesOrder', 'SalesOrganization', 'DistributionChannel', 'OrganizationDivision', 'SoldToParty',
                        'YY1_AlphanumericSalesO_SDH', 'YY1_CustomSalesOrder_SDH', 'CustomerGroup'])
                    .where({ YY1_AlphanumericSalesO_SDH: { in: [...new Set(aSalesOrderWhere)] } })
            ),

            // Sales Order Items (first item only)
            this.salesOrderAPI.executeQuery(
                SELECT.from('A_SalesOrderItem')
                    .columns(['SalesOrder', 'SalesOrderItem', 'YY1_WeekEnd_SD_SDI',
                        'SalesOrderItemCategory', 'YY1_WNWorkOrder_SD_SDI'])
                    .where({
                        YY1_WNWorkOrder_SD_SDI: { in: [...new Set(aSalesOrderWhere)] },
                        SalesOrderItem: '10'
                    })
            ),

            // Field Validations
            SELECT.from(FieldValidations)
                .columns(['field', 'validation', 'term'])
                .where({
                    interfaceType_ID: this.file.interfaceType_ID,
                    validation: { in: [mFieldValidationTypeEnum.blank.val, mFieldValidationTypeEnum.mandatory.val] },
                }),
        ]);

        if (anySalesContractErr) LOG.error(`[VAL] SC error: ${anySalesContractErr.message}`);
        if (anySalesOrderErr) LOG.error(`[VAL] SO error: ${anySalesOrderErr.message}`);
        if (anySalesOrderItemErr) LOG.error(`[VAL] SOItem error: ${anySalesOrderItemErr.message}`);
        if (anyFieldValidationErr) LOG.error(`[VAL] FieldValidation error: ${anyFieldValidationErr.message}`);

        LOG.info(`[VAL] SC fetched: ${Array.isArray(aSalesContracts) ? aSalesContracts.length : 'non-array'}`);
        if (Array.isArray(aSalesContracts)) {
            const sample = aSalesContracts.slice(0, 3).map(sc => ({
                SalesContract: sc.SalesContract,
                PurchaseOrderByCustomer: sc.PurchaseOrderByCustomer
            }));
            LOG.info(`[VAL] SC sample(<=3): ${JSON.stringify(sample)}`);
        }
        LOG.info(`[VAL] SO fetched: ${Array.isArray(aSalesOrders) ? aSalesOrders.length : 'non-array'}`);
        LOG.info(`[VAL] SOItem fetched: ${Array.isArray(aSalesOrderItems) ? aSalesOrderItems.length : 'non-array'}`);
        LOG.info(`[VAL] FieldValidations fetched: ${Array.isArray(aFieldValidations) ? aFieldValidations.length : 'non-array'}`);

        if (!anySalesOrderErr?.message && Array.isArray(aSalesOrders) && aSalesOrders.length) {
            aSalesOrders.forEach(o => mSalesOrders.set(o.YY1_AlphanumericSalesO_SDH, o));
        }
        if (!anySalesOrderItemErr?.message && Array.isArray(aSalesOrderItems) && aSalesOrderItems.length) {
            aSalesOrderItems.forEach(oi => mSalesOrderItems.set(oi.YY1_WNWorkOrder_SD_SDI, oi));
        }
        LOG.info(`[VAL] maps ready; mSalesOrders=${mSalesOrders.size}, mSalesOrderItems=${mSalesOrderItems.size}`);

        const stMandatoryFields = new Set(
            (aFieldValidations || []).flatMap(r => r.validation === mFieldValidationTypeEnum.mandatory.val ? r.field : [])
        );
        const stBlankFields = new Set(
            (aFieldValidations || []).flatMap(r => r.validation === mFieldValidationTypeEnum.blank.val ? r.field : [])
        );
        LOG.info(`[VAL] rules: mandatory=${stMandatoryFields.size}, blank=${stBlankFields.size}`);

        for (const oRecord of aRecordsForProcessing) {
            LOG.info(`[VAL] record ${oRecord.ID} start; woType=${oRecord.woType}, workOrder=${oRecord.wnWorkOrder}, contractNo=${oRecord.contractNo}`);
            let hasRecordFailed = false;

            const oSalesOrder = mSalesOrders.get(oRecord.wnWorkOrder);
            const oSalesOrderItem = mSalesOrderItems.get(oRecord.wnWorkOrder);
            LOG.info(`[VAL] record ${oRecord.ID} SO found=${!!oSalesOrder}, SOItem found=${!!oSalesOrderItem}`);

            // Field validations
            const oFieldValidationRes = this._validateFieldValidations({ stMandatoryFields, stBlankFields, oRecord });
            if (oFieldValidationRes.hasError) {
                oFieldValidationRes.errors = oFieldValidationRes.errors.map(err => ({ ...err, process_code: sProcessCode }));
                LOG.info(`[VAL] record ${oRecord.ID} field validations failed; errs=${oFieldValidationRes.errors.length}`);
                aErrorLogs.push(...oFieldValidationRes.errors);
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            } else {
                LOG.info(`[VAL] record ${oRecord.ID} field validations passed`);
            }

            // Sales contract check (matches by SalesContract only per your current rule)
            const oSalesContractRes = this._validateSalesContract(oRecord, aSalesContracts || []);
            if (oSalesContractRes.hasError) {
                LOG.info(`[VAL] record ${oRecord.ID} sales contract failed; errs=${oSalesContractRes.errors.length}`);
                oSalesContractRes.errors = oSalesContractRes.errors.map(err => ({ ...err, process_code: sProcessCode }));
                aErrorLogs.push(...oSalesContractRes.errors);
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            } else {
                LOG.info(`[VAL] record ${oRecord.ID} sales contract passed`);
            }

            // SO item duplicate check
            let oSalesOrderItemCheck = [];
            if (oSalesOrder) {
                const isZI = oSalesOrder.CustomerGroup === 'ZI';
                if (['CP', 'CR'].includes(oRecord.woType) && isZI) {
                    LOG.info(`[VAL] record ${oRecord.ID} SOItem check by invoice+IC`);
                    oSalesOrderItemCheck = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderItem')
                            .columns(['SalesOrder', 'SalesOrderItem', 'SalesOrderItemCategory', 'Material',
                                'YY1_WNWorkOrder_SD_SDI', 'YY1_WNInvoice_SD_SDI'])
                            .where({
                                SalesOrder: oSalesOrder.SalesOrder,
                                YY1_WNInvoice_SD_SDI: oRecord.wnInvoiceNo + 'IC'
                            })
                    );
                } else if (['CP', 'CR', 'MS', 'SC'].includes(oRecord.woType)) {
                    LOG.info(`[VAL] record ${oRecord.ID} SOItem check by invoice`);
                    oSalesOrderItemCheck = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderItem')
                            .columns(['SalesOrder', 'SalesOrderItem', 'SalesOrderItemCategory', 'Material',
                                'YY1_WNWorkOrder_SD_SDI', 'YY1_WNInvoice_SD_SDI'])
                            .where({
                                SalesOrder: oSalesOrder.SalesOrder,
                                YY1_WNInvoice_SD_SDI: oRecord.wnInvoiceNo
                            })
                    );
                } else {
                    LOG.info(`[VAL] record ${oRecord.ID} SOItem check skipped for woType=${oRecord.woType}`);
                }
            } else {
                LOG.info(`[VAL] record ${oRecord.ID} no SO found; skip SOItem check`);
            }

            if (Array.isArray(oSalesOrderItemCheck) && oSalesOrderItemCheck.length > 0) {
                LOG.info(`[VAL] record ${oRecord.ID} duplicate lines found: ${oSalesOrderItemCheck.length}`);
                oSalesOrderItemCheck = oSalesOrderItemCheck.map(err => ({ ...err, process_code: sProcessCode }));
                aErrorLogs.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_DUPLICATE_LINES'),process_code: sProcessCode });
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }

            if (!hasRecordFailed) {
                aPassedRecordIDs.push(oRecord.ID);
                LOG.info(`[VAL] record ${oRecord.ID} PASSED`);
            } else {
                LOG.info(`[VAL] record ${oRecord.ID} FAILED`);
            }
        }

        // summarize and update DB
        LOG.info(`[VAL] summary: passed=${aPassedRecordIDs.length}, failed=${aFailedRecordIDs.length}, skipped=${aSkippedRecords.length}, errorLogs=${aErrorLogs.length}`);

        if (aErrorLogs.length) {
            try {
                LOG.info('[VAL] writing failure logs + updating failed records (PL=1 only)…');
                const updates = aFailedRecordIDs
                    .filter(recordID => {
                        const record = this.records.find(r => r.ID === recordID);
                        const pl = record?.processLevel_code;
                        const eff = (pl === '0' || pl === '1') ? '1' : pl;
                        return eff === '1';
                    })
                    .map(recordID => {
                        const record = this.records.find(r => r.ID === recordID);
                        const pl = record?.processLevel_code;
                        const eff = (pl === '0' || pl === '1') ? '1' : pl;
                        return UPDATE(Bonus).set({ valid: false, processLevel_code: eff }).where({ ID: recordID });
                    });

                await Promise.allSettled([ProcessLogger.addLogs(aErrorLogs), ...updates]);
                LOG.info('[VAL] failure updates done');
            } catch (err) {
                LOG.error(`[VAL] failure update error: ${err.message}`);
            }
        }

        if (aPassedRecordIDs.length) {
            LOG.info('[VAL] clearing logs + updating passed records (PL=1 only)…');
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));

            const updates = aPassedRecordIDs
                .filter(recordID => {
                    const record = this.records.find(r => r.ID === recordID);
                    const pl = record?.processLevel_code;
                    const eff = (pl === '0' || pl === '1') ? '1' : pl;
                    return eff === '1';
                })
                .map(recordID => {
                    const record = this.records.find(r => r.ID === recordID);
                    const pl = record?.processLevel_code;
                    const eff = (pl === '0' || pl === '1') ? '1' : pl;
                    return UPDATE(Bonus).set({ valid: true, processLevel_code: eff }).where({ ID: recordID });
                });

            await Promise.allSettled(updates);
            LOG.info('[VAL] success updates done');
        }

        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords,
            bBreakExecution,
        });
        LOG.info('[VAL] updateExclusionSet done');

        const res = {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
        LOG.info(`[VAL] end; hasError=${res.hasError}, continue=${res.continue}`);
        return res;
    }

    // --------------------------------
    // (old, unchanged) query by SalesContract only
    _getSalesContractQuery(aSalesContractWhere) {
        return SELECT.from('SalesContract', sc => {
            sc.SalesContract,
                sc.SalesOrganization,
                sc.DistributionChannel,
                sc.OrganizationDivision,
                sc._Item(scItem => {
                    scItem.SalesContract,
                        scItem.SalesContractItem,
                        scItem.Product
                });
        })
            .where({ SalesContract: { in: [...new Set(aSalesContractWhere)] } });
    }

    // --------------------------------
    // (old, unchanged) validator – still matches only SalesContract
    _validateFieldValidations({ stMandatoryFields, stBlankFields, oRecord }) {
        let hasError = false, aErrorLogs = [];
        for (const anyField in oRecord) {
            if (stMandatoryFields.has(anyField) && !oRecord[anyField]) {
                hasError = true;
                aErrorLogs.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_MANDT_FIELD', [anyField]) });
            }
            if (stBlankFields.has(anyField) && oRecord[anyField]) {
                hasError = true;
                aErrorLogs.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_BLANK_FIELD', [anyField]) });
            }
        }
        return { hasError, errors: aErrorLogs };
    }

    _validateSalesContract(oRecord, aSalesContracts) {
        const LOG = this.LOG || console;
        let hasError = false, aErrors = [];

        const list = Array.isArray(aSalesContracts) ? aSalesContracts : [];

        // Try exact SalesContract match first (original behavior)
        const bySalesContract = list.find(sc => oRecord.contractNo === sc.SalesContract);

        // If not, try PO by Customer
        const byPOBC = bySalesContract ? null : list.find(sc => oRecord.contractNo === sc.PurchaseOrderByCustomer);

        if (bySalesContract) {
            LOG.info(`[VAL][SC] record ${oRecord.ID} matched by SalesContract: contractNo=${oRecord.contractNo}`);
        } else if (byPOBC) {
            LOG.info(
                `[VAL][SC] record ${oRecord.ID} matched by PurchaseOrderByCustomer: contractNo(POBC)=${oRecord.contractNo} -> SalesContract=${byPOBC.SalesContract}`
            );
        } else {
            hasError = true;
            aErrors.push({
                record_ID: oRecord.ID,
                message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'),
            });
            LOG.info(
                `[VAL][SC] record ${oRecord.ID} no match; tried SalesContract and PurchaseOrderByCustomer for value=${oRecord.contractNo}`
            );
        }

        return { hasError, errors: aErrors };
    }


    // ================================
    // Explicit SC fetch with fallback
    // ================================
    _getSalesContractQuery_BySalesContract(values) {
        return SELECT.from('SalesContract', sc => {
            sc.SalesContract,
                sc.SalesOrganization,
                sc.DistributionChannel,
                sc.OrganizationDivision,
                sc.PurchaseOrderByCustomer, // included for logging visibility
                sc._Item(scItem => {
                    scItem.SalesContract,
                        scItem.SalesContractItem,
                        scItem.Product
                });
        }).where({ SalesContract: { in: [...new Set(values)] } });
    }

    _getSalesContractQuery_ByPOBC(values) {
        return SELECT.from('SalesContract', sc => {
            sc.SalesContract,
                sc.SalesOrganization,
                sc.DistributionChannel,
                sc.OrganizationDivision,
                sc.PurchaseOrderByCustomer,
                sc._Item(scItem => {
                    scItem.SalesContract,
                        scItem.SalesContractItem,
                        scItem.Product
                });
        }).where({ PurchaseOrderByCustomer: { in: [...new Set(values)] } });
    }

    async _fetchSalesContracts(aSalesContractWhere) {
        const LOG = this.LOG || console;
        const uniq = [...new Set(aSalesContractWhere || [])];

        LOG.info(`[SC] fetch start; input=${(aSalesContractWhere || []).length}, uniq=${uniq.length}, values=${JSON.stringify(uniq)}`);
        if (!uniq.length) {
            LOG.info('[SC] no contract values; returning []');
            return [];
        }

        LOG.info('[SC] querying by SalesContract...');
        const bySC = await this.salesContractAPI.executeQuery(this._getSalesContractQuery_BySalesContract(uniq));
        LOG.info(`[SC] by SalesContract count=${Array.isArray(bySC) ? bySC.length : 'non-array'}`);

        if (Array.isArray(bySC) && bySC.length > 0) {
            const sample = bySC.slice(0, 3).map(sc => ({ SalesContract: sc.SalesContract, POBC: sc.PurchaseOrderByCustomer }));
            LOG.info(`[SC] using SalesContract result; sample(<=3)=${JSON.stringify(sample)}`);
            return bySC;
        }

        LOG.info('[SC] empty by SalesContract; trying by PurchaseOrderByCustomer...');
        const byPOBC = await this.salesContractAPI.executeQuery(this._getSalesContractQuery_ByPOBC(uniq));
        LOG.info(`[SC] by PurchaseOrderByCustomer count=${Array.isArray(byPOBC) ? byPOBC.length : 'non-array'}`);

        if (Array.isArray(byPOBC) && byPOBC.length > 0) {
            const sample = byPOBC.slice(0, 3).map(sc => ({ SalesContract: sc.SalesContract, POBC: sc.PurchaseOrderByCustomer }));
            LOG.info(`[SC] using PurchaseOrderByCustomer result; sample(<=3)=${JSON.stringify(sample)}`);
            return byPOBC;
        }

        LOG.info('[SC] no results from either SalesContract or PurchaseOrderByCustomer; returning []');
        return [];
    }



//     // Step 3 Update SalesOrder Iterm
//     async processSalesOrder(sProcessCode, bBreakExecution) {
//         const aRecordsForProcessing = [],
//             aErrorLogs = [],
//             aFailedRecordIDs = [],
//             aPassedRecordIDs = [],
//             aSkippedRecords = [];

//         let aRecordIDs = [],
//             aWNWorkOrderWhere = [],
//             aSalesOrderWhere = [],
//             aSalesOrderPartnerWhere = [],
//             aPurchaseOrderItemWhere = [],
//             aCustomerWhere = [],
//             aCustomerTermWhere = [],
//             aVendorWhere = [],
//             aCustomerFieldNamesWhere = [];

//         let mSalesOrder = new Map(),        // Map for Sales Order
//             mSalesOrderItem = new Map(),    // Map for Sales Order Item
//             mSalesOrderFirstItem = new Map(),   // Map for Sales Order First Item
//             mSalesOrderPartner = new Map(), // Map for Sales Order Partner Function
//             mVendor = new Map(),            // Map for Vendor and Vendor ZR
//             mPurchaseOrderItem = new Map(), // Map for Purchasing Document Item
//             mTravelPayTerm = new Map(),     // Map for Travel Pay Term Config Table
//             mTravelPayTermFeed = new Map(), // Map for Travel Pay Term Feed Config Table
//             mCustomerFieldNameValue = new Map(),    // Map for CustomFieldsToVC Table
//             mProcessingRecordsToCentralMapping = new Map();

//         for (const [iRecordIndex, record] of this.records.entries()) {
//             if (this.shouldRecordProcess(record, sProcessCode)) {
//                 // If record is on step level & is already valid, then skip
//                 aRecordsForProcessing.push({ ...record });
//                 mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
//                 aRecordIDs.push(record.ID);
//             } else {
//                 aSkippedRecords.push({ ...record });
//                 continue;
//             }

//             if (record.wnWorkOrder) {
//                 aWNWorkOrderWhere.push(record.wnWorkOrder);
//             }

//             ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));
//         }

//         await ProcessLogger.removeLogs(aRecordIDs);

//         this.updateProcessingState(sProcessCode);
//         if (!aRecordsForProcessing.length) {
//             // If Step doesn't need to be processed, simply return to avoid costly calls
//             return {
//                 hasError: false,
//                 continue: true,
//             };
//         }

//         try {
//             const [
//                 { reason: anySalesOrderFirstItemErr, value: aSalesOrderFirstItems },
//                 { reason: anyCustomFieldsTOVCErr, value: aCustomFieldsTOVC },
//             ] = await Promise.allSettled([
//                 this.salesOrderAPI.executeQuery(
//                     SELECT.from('A_SalesOrderItem')
//                         .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI', 'SalesOrderItemCategory',
//                             'YY1_WNWorkOrder_SD_SDI', 'Material', 'WBSElement', 'ProductionPlant'])
//                         .where({
//                             YY1_WNWorkOrder_SD_SDI: { in: [...new Set(aWNWorkOrderWhere)] },
//                             SalesOrderItem: '10'
//                         })
//                 ),

//                 SELECT.from('com.aleron.monitor.CustomFieldsToVC')
//                     .columns(['customValue', 'fieldName'])
//                     .where({ customValue: { in: aCustomerFieldNamesWhere } }),
//             ]);

//             if (!anySalesOrderFirstItemErr?.message && aSalesOrderFirstItems.length) {
//                 aSalesOrderFirstItems.forEach((oSalesOrderItem) => {
//                     if (!mSalesOrderFirstItem.has(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI)) {
//                         mSalesOrderFirstItem.set(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI, []);
//                     }
//                     mSalesOrderFirstItem.get(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI).push(oSalesOrderItem);
//                     aSalesOrderWhere.push(oSalesOrderItem.SalesOrder);
//                 });
//             }

//             if (!anyCustomFieldsTOVCErr?.message && aCustomFieldsTOVC.length) {
//                 for (const [recordID, customerfieldEntries] of mCustomerFieldNameValue.entries()) {
//                     customerfieldEntries.forEach(entry => {
//                         // Check if the customerFieldName is in the data array
//                         const matchedData = aCustomFieldsTOVC.find(o => o.customValue === entry.customerFieldName);
//                         if (matchedData) {
//                             // Add fieldName to the entry
//                             entry.fieldName = matchedData.fieldName;
//                         }
//                     });
//                 }
//             }
//         } catch (err) {
//             this.LOG._error && this.LOG.error(err.message);
//         }

//         try {
//             const [
//                 { reason: anySalesOrderErr, value: aSalesOrders },
//                 { reason: anySalesOrderItemErr, value: aSalesOrderItems },
//                 { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
//             ] = await Promise.allSettled([
//                 this.salesOrderAPI.executeQuery(
//                     SELECT.from('A_SalesOrder')
//                         .columns(['SalesOrder', 'SalesOrganization', 'DistributionChannel', 'OrganizationDivision',
//                             'SoldToParty', 'YY1_AlphanumericSalesO_SDH', 'YY1_CustomSalesOrder_SDH', 'CustomerGroup', 'CustomerPriceGroup'])
//                         .where({
//                             SalesOrder: { in: [...new Set(aSalesOrderWhere)] }
//                         })
//                 ),

//                 this.salesOrderAPI.executeQuery(
//                     SELECT.from('A_SalesOrderItem')
//                         .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI', 'SalesOrderItemCategory',
//                             'YY1_WNWorkOrder_SD_SDI', 'Material', 'WBSElement', 'ProductionPlant'])
//                         .where({
//                             SalesOrder: { in: [...new Set(aSalesOrderWhere)] }
//                         })
//                 ),

//                 this.salesOrderAPI.executeQuery(
//                     SELECT.from('A_SalesOrderHeaderPartner')
//                         .columns(['SalesOrder', 'Customer', 'Supplier', 'PartnerFunction'])
//                         .where({
//                             SalesOrder: { in: [...new Set(aSalesOrderWhere)] },
//                             PartnerFunction: { in: ['ZR', 'BP'] }
//                         })
//                 ),
//             ]);

//             if (!anySalesOrderErr?.message && aSalesOrders.length) {
//                 aSalesOrders.forEach((oSalesOrder) => {
//                     mSalesOrder.set(oSalesOrder.SalesOrder, oSalesOrder);
//                     aCustomerWhere.push(oSalesOrder.SoldToParty);
//                     aCustomerTermWhere.push(oSalesOrder.CustomerPaymentTerms);
//                 });
//             }

//             if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
//                 aSalesOrderItems.forEach((oSalesOrderItem) => {
//                     if (!mSalesOrderItem.has(oSalesOrderItem.SalesOrder)) {
//                         mSalesOrderItem.set(oSalesOrderItem.SalesOrder, []);
//                     }
//                     mSalesOrderItem.get(oSalesOrderItem.SalesOrder).push(oSalesOrderItem);
//                     if (!aPurchaseOrderItemWhere.includes(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI) && oSalesOrderItem.YY1_PurchasingDoc_SD_SDI) {
//                         aPurchaseOrderItemWhere.push(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI);
//                     }
//                 });
//             }

//             if (!anySalesOrderPartnerErr?.message && aSalesOrderPartners.length) {
//                 aSalesOrderPartners.forEach((oSalesOrderPartner) => {
//                     if (!mSalesOrderPartner.has(oSalesOrderPartner.SalesOrder)) {
//                         mSalesOrderPartner.set(oSalesOrderPartner.SalesOrder, []);
//                     }
//                     mSalesOrderPartner.get(oSalesOrderPartner.SalesOrder).push(oSalesOrderPartner);

//                     if (oSalesOrderPartner.PartnerFunction === 'ZR') {
//                         aVendorWhere.push(oSalesOrderPartner.Supplier);
//                     }
//                 });
//             }
//         } catch (err) {
//             this.LOG._error && this.LOG.error(err.message);
//         }

//         try {
//             const [
//                 { reason: anyVendorErr, value: aVendors },
//                 { reason: anyPurchaseOrderItemErr, value: aPurchaseOrderItems },
//                 { reason: anyTravelPayTermsErr, value: aTravelPayTerms },
//                 { reason: anyTravelPayTermFeedErr, value: aTravelPayTermFeeds },
//             ] = await Promise.allSettled([
//                 SELECT.from('com.aleron.monitor.Vendor_VendorRemit')
//                     .columns(['vendor', 'vendorZR'])
//                     .where({ vendor: { in: aVendorWhere } }),

//                 this.PurchaseOrderAPI.executeQuery(
//                     SELECT.from('PurchaseOrderItem')
//                         .columns(['PurchaseOrder', 'PurchaseOrderItem'])
//                         .where({ PurchaseOrder: { in: [...new Set(aPurchaseOrderItemWhere)] } })
//                 ),

//                 SELECT.from('com.aleron.monitor.TravelCustomerPayTermByPOBox')
//                     .columns(['customerNo', 'customerTerm', 'poBox'])
//                     .where({
//                         customerNo: { in: aCustomerWhere },
//                         customerTerm: { in: aCustomerTermWhere }
//                     }),

//                 SELECT.from('com.aleron.monitor.TravelPayTermFeed')
//                     .columns(['paymentTerm', 'netPaymentTerm'])
//                     .where({
//                         paymentTerm: { in: aCustomerTermWhere }
//                     }),
//             ]);

//             if (!anyVendorErr?.message && aVendors.length) {
//                 aVendors.forEach((oVendor) => {
//                     mVendor.set(oVendor.vendor, oVendor);
//                 });
//             }

//             if (!anyPurchaseOrderItemErr?.message && aPurchaseOrderItems.length) {
//                 aPurchaseOrderItems.forEach((oPurchaseOrder) => {
//                     if (!mPurchaseOrderItem.has(oPurchaseOrder.PurchaseOrder)) {
//                         mPurchaseOrderItem.set(oPurchaseOrder.PurchaseOrder, []);
//                     }
//                     mPurchaseOrderItem.get(oPurchaseOrder.PurchaseOrder).push(oPurchaseOrder);
//                 });
//             }

//             if (!anyTravelPayTermsErr?.message && aTravelPayTerms.length) {
//                 aTravelPayTerms.forEach((oTravelPayTerm) => {
//                     mTravelPayTerm.set(oTravelPayTerm.customerNo, oTravelPayTerm);
//                 });
//             }

//             if (!anyTravelPayTermFeedErr?.message && aTravelPayTermFeeds.length) {
//                 aTravelPayTermFeeds.forEach((oTravelPayTermFeed) => {
//                     mTravelPayTermFeed.set(oTravelPayTermFeed.paymentTerm, oTravelPayTermFeed);
//                 });
//             }
//         } catch (err) {
//             this.LOG._error && this.LOG.error(err.message);
//         }

//         const aPayloads = [];
//         const mPayloadMap = new Map();

//         for (const oRecord of aRecordsForProcessing) {
//             const aErrors = [];

//             let oSalesOrder, oSalesOrderItem, oPartnerFunctionZV, oSalesOrderPartner,
//                 oTravelPayTerm, oTravelPayTermFeed, vendor, firstSOItem, lastSOItem,
//                 oConditionType, oBillingType;
//             let aSalesOrderFirstItem = mSalesOrderFirstItem.get(oRecord.wnWorkOrder);          // Fetching SO Items based on the wnWorkOrder from File

//             if (oRecord.salesItemNoSAP) {
//                 // SalesOrder already created, only VC Data needs to be checked further
//                 aPassedRecordIDs.push(oRecord.ID);
//                 mPayloadMap.set(oRecord.ID, {
//                     salesOrder: oRecord.salesDocumentNoSAP,
//                     salesOrderItem: oRecord.salesItemNoSAP,
//                     salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
//                     p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
//                     PORequiredSAP: oRecord.PORequiredSAP,
//                     purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP
//                 });
//                 continue; // Skip this record
//             }

//             if (!oRecord.woType || !['SC', 'MS', 'IC', 'CP'].includes(oRecord.woType)) {
//                 aErrors.push({
//                     record_ID: oRecord.ID,
//                     message: cds.i18n.messages.at('ERR_SALES_DOCUMENT_TYPE'),
//                 });
//                 aFailedRecordIDs.push(oRecord.ID);
//                 aErrorLogs.push(...aErrors);
//                 continue; // Skip this record
//             }

//             if (['CP', 'CR'].includes(oRecord.woType)) {
//                 if (aSalesOrderFirstItem.length === 1) {
//                     oSalesOrder = mSalesOrder.get(aSalesOrderFirstItem[0].SalesOrder);
//                     if (!['CP', 'CR'].includes(oSalesOrder.DistributionChannel)) {
//                         aErrors.push({
//                             record_ID: oRecord.ID,
//                             message: cds.i18n.messages.at('ERR_SALES_ORDER_PAYROLL'),
//                         });
//                         aFailedRecordIDs.push(oRecord.ID);
//                         aErrorLogs.push(...aErrors);
//                         continue; // Skip this record
//                     }
//                 } else {
//                     for (const item of aSalesOrderFirstItem) {
//                         let oInternalSalesOrder = mSalesOrder.get(item.SalesOrder);
//                         if (['CP', 'CR'].includes(oInternalSalesOrder.DistributionChannel)) {
//                             oSalesOrder = oInternalSalesOrder;
//                         } else {
//                             if (oInternalSalesOrder.DistributionChannel === 'IC' && oInternalSalesOrder.CustomerGroup === 'Z1') {
//                                 oRecord.salesOrderICUpdateRequired = 'X';
//                                 oRecord.p2SalesDocumentNoSAP = oInternalSalesOrder.SalesOrder;
//                             }
//                         }
//                     }
//                 }
//             } else if (['MS'].includes(oRecord.woType)) {
//                 for (const item of aSalesOrderFirstItem) {
//                     let oInternalSalesOrder = mSalesOrder.get(item.SalesOrder);
//                     if (['MS'].includes(oInternalSalesOrder.DistributionChannel)) {
//                         oSalesOrder = oInternalSalesOrder;
//                         let salesOrderPartner = mSalesOrderPartner.get(oInternalSalesOrder.SalesOrder);
//                         if (salesOrderPartner) {
//                             oPartnerFunctionZV = salesOrderPartner.find(item => item.PartnerFunction === 'ZV');
//                             vendor = mVendor.get(oPartnerFunctionZV?.Supplier);

//                             if (vendor) {
//                                 oRecord.PORequiredSAP = '';
//                             } else {
//                                 oRecord.PORequiredSAP = '1';
//                             }

//                             if (oSalesOrder.CustomerPriceGroup === 'ZM') {
//                                 oRecord.PORequiredSAP = '';
//                             }
//                         }
//                     }
//                 }
//             }

//             if (!oSalesOrder) {
//                 aErrors.push({
//                     record_ID: oRecord.ID,
//                     message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST'),
//                 });
//                 aFailedRecordIDs.push(oRecord.ID);
//                 aErrorLogs.push(...aErrors);
//                 continue; // Skip this record
//             }

//             // oSalesOrder is having object of Sales Order
//             oSalesOrderItem = mSalesOrderItem.get(oSalesOrder.SalesOrder);  // oSalesOrderItem is having all Item related to oSalesOrder.SalesOrder
//             oTravelPayTermFeed = mTravelPayTermFeed.get(oSalesOrder.CustomerPaymentTerms);  // oTravelPayTermFeed is havgin a obeject of Travel Pay Term Feed from Config Table
//             oTravelPayTerm = mTravelPayTerm.get(oSalesOrder.SoldToParty);  // oTravelPayTerm is havgin a obeject of Travel Pay Term from Config Table
//             oSalesOrderPartner = mSalesOrderPartner.get(oSalesOrder.SalesOrder);    // oSalesOrderPartner is having all Partner Function related to oSalesOrder.SalesOrder

//             firstSOItem = oSalesOrderItem.filter(item => item.SalesOrderItem === "10" && item.SalesOrderItemCategory === "TADN")[0];
//             lastSOItem = oSalesOrderItem.reduce((maxItem, current) =>
//                 Number(current.SalesOrderItem) > Number(maxItem.SalesOrderItem) ? current : maxItem
//             );

//             oConditionType = await determineConditionType({
//                 customer: oSalesOrder.SoldToParty,
//                 salesOrganization: oSalesOrder.SalesOrganization,
//                 distributionChannel: oSalesOrder.DistributionChannel,
//                 division: oSalesOrder.OrganizationDivision
//             });

//             oBillingType = await this.billingTypeAPI.executeQuery(
//                 SELECT.from('YY1_BILLINGTYPE')
//                     .columns(['Billing_type', 'SO_order_Type'])
//                     .where({
//                         SO_order_Type: oSalesOrder.YY1_CustomSalesOrder_SDH
//                     })
//             )

//             if (!firstSOItem.WBSElement || firstSOItem.WBSElement !== oRecord.internalOrder) {
//                 aErrors.push({
//                     record_ID: oRecord.ID,
//                     message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'),
//                 });
//                 aFailedRecordIDs.push(oRecord.ID);
//                 aErrorLogs.push(...aErrors);
//                 continue; // Skip this record
//             }

//             // if (oRecord.PORequiredSAP === '1') {
//             //     if (!firstSOItem.YY1_PurchasingDoc_SD_SDI) {
//             //         aErrors.push({
//             //             record_ID: oRecord.ID,
//             //             message: cds.i18n.messages.at('ERR_CREATE_PO'),
//             //         });
//             //         aFailedRecordIDs.push(oRecord.ID);
//             //         aErrorLogs.push(...aErrors);
//             //         continue; // Skip this record
//             //     } else {
//             //         oRecord.purchaseDocumentNoSAP = firstSOItem.YY1_PurchasingDoc_SD_SDI;
//             //         let purchaseOrderItem = mPurchaseOrderItem.get(firstSOItem.YY1_PurchasingDoc_SD_SDI);
//             //         const poItemMax = purchaseOrderItem?.reduce((maxItem, current) =>
//             //             current.PurchaseOrderItem > maxItem.PurchaseOrderItem ? current : maxItem
//             //         );
//             //         if (Number(poItemMax.PurchaseOrderItem) > Number(lastSOItem.SalesOrderItem)) {
//             //             lastSOItem.SalesOrderItem = poItemMax.PurchaseOrderItem;
//             //         }
//             //     }
//             // }

//             if (oRecord.PORequiredSAP === '1') {
//   if (!firstSOItem?.YY1_PurchasingDoc_SD_SDI) {
//     aErrors.push({
//       record_ID: oRecord.ID,
//       message: cds.i18n.messages.at('ERR_CREATE_PO'),
//     });
//     aFailedRecordIDs.push(oRecord.ID);
//     aErrorLogs.push(...aErrors);
//     continue; // still need a PO number on SO item 10
//   }

//   oRecord.purchaseDocumentNoSAP = firstSOItem.YY1_PurchasingDoc_SD_SDI;

//   const purchaseOrderItem = mPurchaseOrderItem.get(firstSOItem.YY1_PurchasingDoc_SD_SDI);

//   if (!Array.isArray(purchaseOrderItem) || purchaseOrderItem.length === 0) {
//     // ✅ No PO items yet: keep SO 'lastSOItem' as-is.
//     // We'll create a new PO item with this SO item number in processPurchaseOrder.
//     oRecord._poCreateWithSOItem = String(Number(lastSOItem.SalesOrderItem) + 10);
//   } else {
//     // There are existing PO items: align to the highest between PO and SO
//     const poItemMax = purchaseOrderItem.reduce(
//       (maxItem, current) =>
//         Number(current.PurchaseOrderItem) > Number(maxItem.PurchaseOrderItem) ? current : maxItem
//     );
//     if (poItemMax && Number(poItemMax.PurchaseOrderItem) > Number(lastSOItem.SalesOrderItem)) {
//       lastSOItem.SalesOrderItem = poItemMax.PurchaseOrderItem;
//     }
//   }
// }


//             if (oRecord.wnInvoiceNo === oSalesOrder.YY1_WNInvoice_SD_SDI) {
//                 aErrorLogs.push({
//                     record_ID: oRecord.ID,
//                     message: cds.i18n.messages.at('ERR_DUPLICATE_LINES'),
//                 });
//                 aFailedRecordIDs.push(oRecord.ID);
//                 aErrorLogs.push(...aErrors);
//                 continue; // Skip this record
//             }

//             mPayloadMap.set(oRecord.ID, {
//                 salesOrder: '',
//                 salesOrderItem: '',
//                 salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
//                 p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
//                 PORequiredSAP: oRecord.PORequiredSAP,
//                 purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP
//             });

//             // Prepare payload for SalesOrderItem creation
//             const oPayload = this._prepareDataForSalesOrderItemCreate({
//                 record: oRecord,                        // record form File
//                 firstSOItem: firstSOItem,               // SO Item first object
//                 lastSOItem: lastSOItem,                 // SO Item Max Object
//                 travelPayTerm: oTravelPayTerm,          // Travel Pay Term
//                 travelPayTermFeed: oTravelPayTermFeed,  // Teravel Pay Term Feed
//                 conditionType: oConditionType,           // conditionType
//                 billingType: oBillingType[0],               // Billing Type
//             });

//             // Add payload to aPayloads and map record.ID to its payloadIndex
//             const iPayloadIndex = aPayloads.push(oPayload) - 1;
//             const oMapEntry = mPayloadMap.get(oRecord.ID);
//             oMapEntry.payloadIndex = iPayloadIndex;
//             mPayloadMap.set(oRecord.ID, oMapEntry);
//         }

//         if (Array.isArray(aPayloads) && aPayloads.length > 0) {
//             // TODO: Check if aPayloads[].errors has any value; process accordingly
//             aPayloads.forEach((oPayload) => delete oPayload.errors);

//             // Create SalesOrderItems in S/4HANA via OData
//             const aSalesOrderItemResults = await this.salesOrderAPI.createSalesOrderItems(aPayloads);

//             // Process the results
//             aSalesOrderItemResults.forEach((oResult, iPayloadIndex) => {
//                 // Find the record ID corresponding to the payload index
//                 const sRecordID = [...mPayloadMap.entries()].find(
//                     ([, oMapEntry]) => oMapEntry.payloadIndex === iPayloadIndex,
//                 )?.[0];

//                 if (!oResult.hasError) {
//                     const oCreatedSalesOrderItem = oResult.value;
//                     aPassedRecordIDs.push(sRecordID);

//                     // Update the map entry with the created SalesOrder ID
//                     const oMapEntry = mPayloadMap.get(sRecordID);
//                     oMapEntry.salesOrder = oCreatedSalesOrderItem.SalesOrder;
//                     oMapEntry.salesOrderItem = oCreatedSalesOrderItem.SalesOrderItem;
//                     mPayloadMap.set(sRecordID, oMapEntry);
//                 } else {
//                     aFailedRecordIDs.push(sRecordID);
//                     if (Array.isArray(oResult.reason)) {
//                         oResult.reason.forEach((oError) => {
//                             aErrorLogs.push({
//                                 record_ID: sRecordID,
//                                 ...oError,
//                             });
//                         });
//                     } else {
//                         aErrorLogs.push({
//                             record_ID: sRecordID,
//                             message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM_CREATION_FAILED', [oResult.reason]),
//                         });
//                     }

//                     // Remove the failed record from the map
//                     mPayloadMap.delete(sRecordID);
//                 }
//             });
//         }

//         // VC Date update process
//         await this._prepareVCData({
//             records: this.records,
//             mCustomerFieldNameValue: mCustomerFieldNameValue,
//             mPayloadMap: mPayloadMap,
//             mSalesOrders: mSalesOrder,
//             aPassedRecordIDs: aPassedRecordIDs,
//             aFailedRecordIDs: aFailedRecordIDs,
//             aErrorLogs: aErrorLogs
//         });

//         if (aErrorLogs.length) {
//             await ProcessLogger.addLogs(aErrorLogs);
//             await UPDATE(Bonus)
//                 .set({ valid: false, processLevel_code: sProcessCode })
//                 .where({ ID: { in: aFailedRecordIDs } });
//         }

//         // Update the `salesDocumentNoSAP` field in `this.records` and the database
//         this.records.forEach((oRecord) => {
//             const oMapEntry = mPayloadMap.get(oRecord.ID);

//             if (oMapEntry && oMapEntry.salesOrder) {
//                 // Update fields in memory
//                 oRecord.salesDocumentNoSAP = oMapEntry.salesOrder;
//                 oRecord.salesItemNoSAP = oMapEntry.salesOrderItem;
//                 oRecord.vcData1UUID = oMapEntry.vcData1UUID ?? '';
//                 oRecord.vcData2UUID = oMapEntry.vcData2UUID ?? '';
//                 oRecord.salesOrderICUpdateRequired = oMapEntry.salesOrderICUpdateRequired;
//                 oRecord.p2SalesDocumentNoSAP = oMapEntry.p2SalesDocumentNoSAP;
//                 oRecord.PORequiredSAP = oMapEntry.PORequiredSAP;
//                 oRecord.purchaseDocumentNoSAP = oMapEntry.purchaseDocumentNoSAP;
//             }
//         });

//         // Create records to update using flatMap
//         const aRecordsToUpdate = this.records.flatMap((oRecord) => {
//             const oMapEntry = mPayloadMap.get(oRecord.ID);

//             return oMapEntry && oMapEntry.salesOrder
//                 ? [
//                     {
//                         ID: oRecord.ID,
//                         salesDocumentNoSAP: oMapEntry.salesOrder,
//                         salesItemNoSAP: oMapEntry.salesOrderItem,
//                         vcData1UUID: oMapEntry.vcData1UUID,
//                         vcData2UUID: oMapEntry.vcData2UUID,
//                         salesOrderICUpdateRequired: oMapEntry.salesOrderICUpdateRequired,
//                         p2SalesDocumentNoSAP: oMapEntry.p2SalesDocumentNoSAP,
//                         PORequiredSAP: oMapEntry.PORequiredSAP,
//                         purchaseDocumentNoSAP: oMapEntry.purchaseDocumentNoSAP,
//                     },
//                 ]
//                 : [];
//         });

//         if (aRecordsToUpdate.length) {
//             await Promise.all(
//                 aRecordsToUpdate.map((oRecord) => {
//                     const iRecordIndex = mProcessingRecordsToCentralMapping.get(oRecord.ID);
//                     this.records[iRecordIndex].salesDocumentNoSAP = oRecord.salesDocumentNoSAP;
//                     this.records[iRecordIndex].salesItemNoSAP = oRecord.salesItemNoSAP;
//                     this.records[iRecordIndex].vcData1UUID = oRecord.vcData1UUID;
//                     this.records[iRecordIndex].vcData2UUID = oRecord.vcData2UUID;
//                     this.records[iRecordIndex].salesOrderICUpdateRequired = oRecord.salesOrderICUpdateRequired;
//                     this.records[iRecordIndex].p2SalesDocumentNoSAP = oRecord.p2SalesDocumentNoSAP;
//                     this.records[iRecordIndex].PORequiredSAP = oRecord.PORequiredSAP;
//                     this.records[iRecordIndex].purchaseDocumentNoSAP = oRecord.purchaseDocumentNoSAP;
//                     return UPDATE(Bonus)
//                         .set({
//                             salesDocumentNoSAP: oRecord.salesDocumentNoSAP,
//                             salesItemNoSAP: oRecord.salesItemNoSAP,
//                             vcData1UUID: oRecord.vcData1UUID,
//                             vcData2UUID: oRecord.vcData2UUID,
//                             salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
//                             p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
//                             PORequiredSAP: oRecord.PORequiredSAP,
//                             purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP,
//                         })
//                         .where({ ID: oRecord.ID });
//                 }),
//             );
//         }

//         // Update the status of passed records
//         if (aPassedRecordIDs.length) {
//             await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
//             await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
//         }

//         // Update the status of failed records
//         if (aFailedRecordIDs.length) {
//             await Promise.allSettled([
//                 this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
//             ]);
//         }

//         // Update Exclusion Set
//         this.updateExclusionSet({
//             passed: aPassedRecordIDs,
//             failed: aFailedRecordIDs,
//             skipped: aSkippedRecords,
//             bBreakExecution,
//         });

//         // Return Process Result
//         return {
//             hasError: aFailedRecordIDs.length > 0,
//             continue: aFailedRecordIDs.length === 0,
//         };
//     }


    // /**
    //        * Prepare data for SalesOrder creation
    //        * @param {object} mParams
    //        * @param {object} mParams.record -  record from file
    //        * @param {object} mParams.firstSOItem - First SalesOrder Item Object
    //        * @param {object} mParams.soItemMax - SalesOrder Item Object with Max Item Number
    //        * @returns {object} SalesOrderItem payload with 'errors' property. `errors` property MUST BE removed before sending to S/4HANA
    //        */
    // _prepareDataForSalesOrderItemCreate({
    //     record,
    //     firstSOItem,
    //     lastSOItem,
    //     travelPayTerm,
    //     travelPayTermFeed,
    //     conditionType,
    //     billingType,
    // }) {
    //     const oReturnData = {
    //         SalesOrder: firstSOItem.SalesOrder,
    //         SalesOrderItem: String(Number(lastSOItem.SalesOrderItem) + 10),
    //         SalesOrderItemCategory: 'TAD',
    //         Material: firstSOItem.Material,
    //         RequestedQuantity: '1',
    //         OrderQuantityUnit: 'LAB',
    //         ProductionPlant: firstSOItem.ProductionPlant || '',
    //         SalesOrderItemText: 'BONUS',
    //         WBSElement: firstSOItem.WBSElement,
    //         PurchaseOrderByCustomer: record?.customerPO ?? '',
    //         PricingDate: `/Date(${+moment()})/`,
    //         YY1_PurchasingDoc_SD_SDI: firstSOItem.YY1_PurchasingDoc_SD_SDI || '',
    //         YY1_WeekEnd_SD_SDI: `/Date(${moment(record.endDate, "YYYYMMDD").valueOf()})/`,
    //         YY1_CustomBillingType_SDI: billingType.Billing_type,
    //         YY1_WNWorkOrder_SD_SDI: firstSOItem.YY1_WNWorkOrder_SD_SDI,
    //         YY1_WNInvoice_SD_SDI: record.wnInvoiceNo,
    //         to_ScheduleLine: [this._prepareDataForScheduleLine({ record, lastSOItem })],
    //         to_PricingElement: {
    //             results: [{
    //                 ConditionType: conditionType,
    //                 ConditionRateValue: record.customerBillRate
    //             }]
    //         }
    //     }

    //     if (travelPayTerm) {
    //         oReturnData.PurchaseOrderByShipToParty = travelPayTerm.poBox;
    //     }

    //     if (travelPayTermFeed) {
    //         oReturnData.CustomerPaymentTerms = travelPayTermFeed.netPaymentTerm;
    //     }

    //     // Fill custom fields
    //     for (const fieldIndex of Array(15).keys()) {
    //         if (record[`customerFieldName${fieldIndex + 1}`] === 'Z20') {
    //             oReturnData.to_Text[0].LongText = record[`customerFieldValue${fieldIndex + 1}`];
    //             oReturnData.to_Text[0].LongTextID = 'ZJOB';
    //             oReturnData.to_Text[0].Language = 'EN';
    //             break;
    //         }
    //         if (record[`customerFieldName${fieldIndex + 1}`] === 'Z21') {
    //             oReturnData.to_Text[0].LongText = record[`customerFieldValue${fieldIndex + 1}`];
    //             oReturnData.to_Text[0].LongTextID = 'ZSLD';
    //             oReturnData.to_Text[0].Language = 'EN';
    //             break;
    //         }
    //         if (
    //             record[`customerFieldName${fieldIndex + 1}`] === 'Z41' &&
    //             ['X', 'YES', 'Y'].includes(record[`customerFieldValue${fieldIndex + 1}`])
    //         ) {
    //             oReturnData.PriceListType = 'ZD';
    //         }
    //     }

    //     return oReturnData;
    // }

    // _prepareDataForScheduleLine({ record, lastSOItem }) {
    //     return {
    //         SalesOrderItem: String(Number(lastSOItem.SalesOrderItem) + 10),
    //         RequestedDeliveryDate: `/Date(${+moment()})/`,
    //         ScheduleLineOrderQuantity: '1',
    //         OrderQuantityISOUnit: '_01',
    //     };
    // }

    // // Prepare VC Data Payload and insert it
    // async _prepareVCData({
    //     records,
    //     mCustomerFieldNameValue,
    //     mPayloadMap,
    //     mSalesOrders,
    //     aPassedRecordIDs,
    //     aFailedRecordIDs,
    //     aErrorLogs
    // }) {
    //     const SalesVCData_1 = new SalesVCData_1Comm();
    //     const SalesVCData_2 = new SalesVCData_2Comm();

    //     // 1. filtering the records based on the not failed records ids.
    //     // 2. generating payload for both VCData1 & VCData2 based on the salesorder for that record id.
    //     let aPayloadsSalesVCData = records
    //         .filter((record) => !aFailedRecordIDs.includes(record.ID))
    //         .map((record) => {
    //             const oMapEntry = mPayloadMap.get(record.ID);
    //             const oSalesOrder = mSalesOrders.get(record.wnWorkOrder);

    //             if (oMapEntry && oMapEntry.salesOrder) {
    //                 const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID);
    //                 const VC1CustomerFieldName = ['Z40', 'Z43', 'Z44', 'Z45', 'Z46'];
    //                 const VC2CustomerFieldName = ['Z01', 'Z02', 'Z03', 'Z04', 'Z05', 'Z06', 'Z07', 'Z08', 'Z09', 'Z10', 'Z11', 'Z12',
    //                     'Z16', 'Z17', 'Z18', 'Z19', 'Z24', 'Z25', 'Z26', 'Z27', 'Z28', 'Z29', 'Z31',
    //                     'Z32', 'Z33', 'Z34', 'Z35', 'Z37', 'Z39', 'Z42'];
    //                 const oCustFieldResult = aCustomerfieldEntry.reduce((acc, entry) => {
    //                     if (VC1CustomerFieldName.includes(entry.customerFieldName)) {
    //                         acc.VC1Fields[entry.fieldName] = entry.customerFieldValue;
    //                     } else if (VC2CustomerFieldName.includes(entry.customerFieldName)) {
    //                         acc.VC2Fields[entry.fieldName] = entry.customerFieldValue;
    //                     }
    //                     return acc;
    //                 }, { VC1Fields: {}, VC2Fields: {} });

    //                 const salesVC1 = {
    //                     SalesOrderNumber: oMapEntry.salesOrder,
    //                     SalesOrderItemNum: oMapEntry.salesOrderItem,
    //                     YY8_WEEK_ENDING2: moment(record.endDate).format('YYYY-MM-DD'),
    //                     ...(oCustFieldResult.VC1Fields || {}),
    //                 };
    //                 const salesVC2 = {
    //                     Sales_Order_Number: oMapEntry.salesOrder,
    //                     Sales_Order_Item_Num: oMapEntry.salesOrderItem,
    //                     YY166_BONUS_PRICE: record?.customerBillRate || '0.00',
    //                     YY167_BONUS_PAY_RATE: record?.vendorPayRate || '0.00',
    //                     YY246_ZSD_WN_INVOICE_VCSD: record?.salesOrderICUpdateRequired === 'X' ? record.wnInvoiceNo + 'IC' : record.wnInvoiceNo,
    //                     YY247_ZSD_WN_WORK_ORDER_VCSD: record.wnWorkOrder,
    //                     ...(oCustFieldResult.VC2Fields || {}),
    //                 };
    //                 const recordID = record.ID;
    //                 const vcData1UUID = record.vcData1UUID;
    //                 const vcData2UUID = record.vcData2UUID;
    //                 return [salesVC1, salesVC2, recordID, vcData1UUID, vcData2UUID];
    //             } else {
    //                 return [];
    //             }
    //         });

    //     for (let i = 0; i < aPayloadsSalesVCData.length; i++) {
    //         let insertedSalesVCData1, insertedSalesVCData2;
    //         // TODO: Conver to Batch call and take call out of loop
    //         if (!aPayloadsSalesVCData[i][3]) {
    //             insertedSalesVCData1 = await SalesVCData_1.executeQuery(
    //                 INSERT.into('YY1_SALESVCDATA_1').entries(aPayloadsSalesVCData[i][0]),
    //             );
    //         }
    //         if (!aPayloadsSalesVCData[i][4]) {
    //             insertedSalesVCData2 = await SalesVCData_2.executeQuery(
    //                 INSERT.into('YY1_SALESVCDATA_2').entries(aPayloadsSalesVCData[i][1]),
    //             );
    //         }

    //         const oMapEntry = mPayloadMap.get(aPayloadsSalesVCData[i][2]);
    //         if (insertedSalesVCData1?.SAP_UUID || aPayloadsSalesVCData[i][3]) {
    //             oMapEntry.vcData1UUID = insertedSalesVCData1?.SAP_UUID ?? aPayloadsSalesVCData[i][3];
    //         }
    //         if (insertedSalesVCData2?.SAP_UUID || aPayloadsSalesVCData[i][4]) {
    //             oMapEntry.vcData2UUID = insertedSalesVCData2?.SAP_UUID ?? aPayloadsSalesVCData[i][4];
    //         }
    //         mPayloadMap.set(aPayloadsSalesVCData[i][2], oMapEntry);

    //         // error log for failed to insert records in VCData
    //         if (insertedSalesVCData1?.message || insertedSalesVCData2?.message) {
    //             if (insertedSalesVCData1?.message) {
    //                 aErrorLogs.push({
    //                     record_ID: aPayloadsSalesVCData[i][2],
    //                     message: `${insertedSalesVCData1.message}`,
    //                 });
    //             }
    //             if (insertedSalesVCData2?.message) {
    //                 aErrorLogs.push({
    //                     record_ID: aPayloadsSalesVCData[i][2],
    //                     message: `${insertedSalesVCData2.message}`,
    //                 });
    //             }

    //             aFailedRecordIDs.push(aPayloadsSalesVCData[i][2]);

    //             // remvove id which is getting error from PassRecordIds.
    //             const index = aPassedRecordIDs.indexOf(aPayloadsSalesVCData[i][2]);
    //             if (index !== -1) aPassedRecordIDs.splice(index, 1);
    //             LOG.error(
    //                 `Error processing record ID ${aPayloadsSalesVCData[i][2]}: ${insertedSalesVCData1.message} || ${insertedSalesVCData2.message}`,
    //             );
    //         }
    //     }
    // }


    async processSalesOrder(sProcessCode, bBreakExecution) {
  // ---- hard guards that explain the classic SELECT issue
  if (!globalThis.SELECT || typeof globalThis.SELECT.from !== 'function') {
    log(this.LOG, 'error', 'cds SELECT is undefined. Import cds or pass CQN correctly.');
    throw new Error('Fatal: cds SELECT is undefined (import cds and use SELECT.from)');
  }
  if (!this.salesOrderAPI?.executeQuery) {
    log(this.LOG, 'error', 'salesOrderAPI client missing or invalid', { hasClient: !!this.salesOrderAPI });
  }
  if (!this.PurchaseOrderAPI?.executeQuery) {
    log(this.LOG, 'warn', 'PurchaseOrderAPI client missing or invalid', { hasClient: !!this.PurchaseOrderAPI });
  }
  if (!this.billingTypeAPI?.executeQuery) {
    log(this.LOG, 'warn', 'billingTypeAPI client missing or invalid', { hasClient: !!this.billingTypeAPI });
  }

  log(this.LOG, 'info', 'processSalesOrder:start', { sProcessCode, bBreakExecution, totalRecords: this.records?.length });

  const aRecordsForProcessing = [],
        aErrorLogs = [],
        aFailedRecordIDs = [],
        aPassedRecordIDs = [],
        aSkippedRecords = [];

  let aRecordIDs = [],
      aWNWorkOrderWhere = [],
      aSalesOrderWhere = [],
      aSalesOrderPartnerWhere = [],
      aPurchaseOrderItemWhere = [],
      aCustomerWhere = [],
      aCustomerTermWhere = [],
      aVendorWhere = [],
      aCustomerFieldNamesWhere = [];

  let mSalesOrder = new Map(),
      mSalesOrderItem = new Map(),
      mSalesOrderFirstItem = new Map(),
      mSalesOrderPartner = new Map(),
      mVendor = new Map(),
      mPurchaseOrderItem = new Map(),
      mTravelPayTerm = new Map(),
      mTravelPayTermFeed = new Map(),
      mCustomerFieldNameValue = new Map(),
      mProcessingRecordsToCentralMapping = new Map();

  // Collect candidates
  for (const [iRecordIndex, record] of this.records.entries()) {
    const should = this.shouldRecordProcess(record, sProcessCode);
    log(this.LOG, 'info', 'record:scan', { idx: iRecordIndex, ID: record.ID, shouldProcess: should, woType: record.woType, wnWorkOrder: record.wnWorkOrder });
    if (should) {
      aRecordsForProcessing.push({ ...record });
      mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
      aRecordIDs.push(record.ID);
    } else {
      aSkippedRecords.push({ ...record });
    }
    if (record.wnWorkOrder) aWNWorkOrderWhere.push(record.wnWorkOrder);
    ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } =
      this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));
  }

  log(this.LOG, 'info', 'candidates:collected', {
    toProcess: aRecordsForProcessing.length,
    skipped: aSkippedRecords.length,
    wnWorkOrders: [...new Set(aWNWorkOrderWhere)].length,
    customFieldNames: aCustomerFieldNamesWhere.length
  });

  await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);
  this.updateProcessingState(sProcessCode);

  if (!aRecordsForProcessing.length) {
    log(this.LOG, 'info', 'no-work:early-return');
    return { hasError: false, continue: true };
  }

  // -------- Phase 1: SO first item + CustomFieldsToVC
  const t1 = Date.now();
  try {
    const [
      soFirstItem, customFields
    ] = await Promise.allSettled([
      this.salesOrderAPI?.executeQuery(
        SELECT.from('A_SalesOrderItem')
          .columns(['SalesOrder','SalesOrderItem','YY1_PurchasingDoc_SD_SDI','SalesOrderItemCategory','YY1_WNWorkOrder_SD_SDI','Material','WBSElement','ProductionPlant'])
          .where({ YY1_WNWorkOrder_SD_SDI: { in: [...new Set(aWNWorkOrderWhere)] }, SalesOrderItem: '10' })
      ),
      SELECT.from('com.aleron.monitor.CustomFieldsToVC')
        .columns(['customValue','fieldName'])
        .where({ customValue: { in: aCustomerFieldNamesWhere } }),
    ]);

    if (soFirstItem.status !== 'fulfilled') {
      log(this.LOG, 'error', 'Phase1:SOFirstItem:rejected', { reason: safe(soFirstItem.reason) });
    } else {
      const aSalesOrderFirstItems = soFirstItem.value || [];
      log(this.LOG, 'info', 'Phase1:SOFirstItem:ok', { count: aSalesOrderFirstItems.length });
      aSalesOrderFirstItems.forEach((it) => {
        if (!mSalesOrderFirstItem.has(it.YY1_WNWorkOrder_SD_SDI)) mSalesOrderFirstItem.set(it.YY1_WNWorkOrder_SD_SDI, []);
        mSalesOrderFirstItem.get(it.YY1_WNWorkOrder_SD_SDI).push(it);
        aSalesOrderWhere.push(it.SalesOrder);
      });
    }

    if (customFields.status !== 'fulfilled') {
      log(this.LOG, 'error', 'Phase1:CustomFieldsToVC:rejected', { reason: safe(customFields.reason) });
    } else {
      const aCustomFieldsTOVC = customFields.value || [];
      log(this.LOG, 'info', 'Phase1:CustomFieldsToVC:ok', { count: aCustomFieldsTOVC.length });
      for (const [, entries] of mCustomerFieldNameValue.entries()) {
        entries.forEach(entry => {
          const matched = aCustomFieldsTOVC.find(o => o.customValue === entry.customerFieldName);
          if (matched) entry.fieldName = matched.fieldName;
        });
      }
    }
  } catch (err) {
    log(this.LOG, 'error', 'Phase1:exception', { message: err.message, stack: err.stack });
  } finally {
    log(this.LOG, 'info', 'Phase1:done', { ms: Date.now() - t1, salesOrderWhere: [...new Set(aSalesOrderWhere)].length });
  }

  // -------- Phase 2: SO header/items/partners
  const t2 = Date.now();
  try {
    const [soHdr, soItems, soPartners] = await Promise.allSettled([
      this.salesOrderAPI?.executeQuery(
        SELECT.from('A_SalesOrder')
          .columns(['SalesOrder','SalesOrganization','DistributionChannel','OrganizationDivision','SoldToParty','YY1_AlphanumericSalesO_SDH','YY1_CustomSalesOrder_SDH','CustomerGroup','CustomerPriceGroup','CustomerPaymentTerms'])
          .where({ SalesOrder: { in: [...new Set(aSalesOrderWhere)] } })
      ),
      this.salesOrderAPI?.executeQuery(
        SELECT.from('A_SalesOrderItem')
          .columns(['SalesOrder','SalesOrderItem','YY1_PurchasingDoc_SD_SDI','SalesOrderItemCategory','YY1_WNWorkOrder_SD_SDI','Material','WBSElement','ProductionPlant'])
          .where({ SalesOrder: { in: [...new Set(aSalesOrderWhere)] } })
      ),
      this.salesOrderAPI?.executeQuery(
        SELECT.from('A_SalesOrderHeaderPartner')
          .columns(['SalesOrder','Customer','Supplier','PartnerFunction'])
          .where({ SalesOrder: { in: [...new Set(aSalesOrderWhere)] }, PartnerFunction: { in: ['ZR','BP','ZV'] } })
      ),
    ]);

    if (soHdr.status !== 'fulfilled') {
      log(this.LOG, 'error', 'Phase2:SOHeader:rejected', { reason: safe(soHdr.reason) });
    } else {
      const aSalesOrders = soHdr.value || [];
      log(this.LOG, 'info', 'Phase2:SOHeader:ok', { count: aSalesOrders.length });
      aSalesOrders.forEach(o => {
        mSalesOrder.set(o.SalesOrder, o);
        aCustomerWhere.push(o.SoldToParty);
        aCustomerTermWhere.push(o.CustomerPaymentTerms);
      });
    }

    if (soItems.status !== 'fulfilled') {
      log(this.LOG, 'error', 'Phase2:SOItems:rejected', { reason: safe(soItems.reason) });
    } else {
      const aSalesOrderItems = soItems.value || [];
      log(this.LOG, 'info', 'Phase2:SOItems:ok', { count: aSalesOrderItems.length });
      aSalesOrderItems.forEach(it => {
        if (!mSalesOrderItem.has(it.SalesOrder)) mSalesOrderItem.set(it.SalesOrder, []);
        mSalesOrderItem.get(it.SalesOrder).push(it);
        if (it.YY1_PurchasingDoc_SD_SDI && !aPurchaseOrderItemWhere.includes(it.YY1_PurchasingDoc_SD_SDI)) {
          aPurchaseOrderItemWhere.push(it.YY1_PurchasingDoc_SD_SDI);
        }
      });
    }

    if (soPartners.status !== 'fulfilled') {
      log(this.LOG, 'error', 'Phase2:SOHeaderPartner:rejected', { reason: safe(soPartners.reason) });
    } else {
      const aSalesOrderPartners = soPartners.value || [];
      log(this.LOG, 'info', 'Phase2:SOHeaderPartner:ok', { count: aSalesOrderPartners.length });
      aSalesOrderPartners.forEach(p => {
        if (!mSalesOrderPartner.has(p.SalesOrder)) mSalesOrderPartner.set(p.SalesOrder, []);
        mSalesOrderPartner.get(p.SalesOrder).push(p);
        if (p.PartnerFunction === 'ZR') aVendorWhere.push(p.Supplier);
      });
    }
  } catch (err) {
    log(this.LOG, 'error', 'Phase2:exception', { message: err.message, stack: err.stack });
  } finally {
    log(this.LOG, 'info', 'Phase2:done', {
      ms: Date.now() - t2,
      mSalesOrder: mSalesOrder.size,
      mSalesOrderItem: mSalesOrderItem.size,
      mSalesOrderPartner: mSalesOrderPartner.size,
      vendorWhere: aVendorWhere.length,
      poItemWhere: aPurchaseOrderItemWhere.length
    });
  }

  // -------- Phase 3: Vendor / PO Items / Travel Terms
  const t3 = Date.now();
  try {
    const [vendors, poItems, travelTerms, travelFeed] = await Promise.allSettled([
      SELECT.from('com.aleron.monitor.Vendor_VendorRemit').columns(['vendor','vendorZR']).where({ vendor: { in: aVendorWhere } }),
      this.PurchaseOrderAPI?.executeQuery(
        SELECT.from('PurchaseOrderItem').columns(['PurchaseOrder','PurchaseOrderItem']).where({ PurchaseOrder: { in: [...new Set(aPurchaseOrderItemWhere)] } })
      ),
      SELECT.from('com.aleron.monitor.TravelCustomerPayTermByPOBox').columns(['customerNo','customerTerm','poBox'])
        .where({ customerNo: { in: aCustomerWhere }, customerTerm: { in: aCustomerTermWhere } }),
      SELECT.from('com.aleron.monitor.TravelPayTermFeed').columns(['paymentTerm','netPaymentTerm'])
        .where({ paymentTerm: { in: aCustomerTermWhere } }),
    ]);

    if (vendors.status !== 'fulfilled') log(this.LOG, 'warn', 'Phase3:Vendors:rejected', { reason: safe(vendors.reason) });
    else { (vendors.value || []).forEach(v => mVendor.set(v.vendor, v)); log(this.LOG, 'info', 'Phase3:Vendors:ok', { count: mVendor.size }); }

    if (poItems.status !== 'fulfilled') log(this.LOG, 'warn', 'Phase3:POItems:rejected', { reason: safe(poItems.reason) });
    else {
      (poItems.value || []).forEach(po => {
        if (!mPurchaseOrderItem.has(po.PurchaseOrder)) mPurchaseOrderItem.set(po.PurchaseOrder, []);
        mPurchaseOrderItem.get(po.PurchaseOrder).push(po);
      });
      log(this.LOG, 'info', 'Phase3:POItems:ok', { distinctPOs: mPurchaseOrderItem.size });
    }

    if (travelTerms.status !== 'fulfilled') log(this.LOG, 'warn', 'Phase3:TravelTerms:rejected', { reason: safe(travelTerms.reason) });
    else {
      (travelTerms.value || []).forEach(t => mTravelPayTerm.set(t.customerNo, t));
      log(this.LOG, 'info', 'Phase3:TravelTerms:ok', { count: mTravelPayTerm.size });
    }

    if (travelFeed.status !== 'fulfilled') log(this.LOG, 'warn', 'Phase3:TravelFeed:rejected', { reason: safe(travelFeed.reason) });
    else {
      (travelFeed.value || []).forEach(t => mTravelPayTermFeed.set(t.paymentTerm, t));
      log(this.LOG, 'info', 'Phase3:TravelFeed:ok', { count: mTravelPayTermFeed.size });
    }
  } catch (err) {
    log(this.LOG, 'error', 'Phase3:exception', { message: err.message, stack: err.stack });
  } finally {
    log(this.LOG, 'info', 'Phase3:done', { ms: Date.now() - t3 });
  }

  // --- helper: recover Sales Order number from what we've already loaded ---
  const backfillSalesOrderNo = (rec) => {
    const firstItems = mSalesOrderFirstItem.get(rec.wnWorkOrder) || [];
    if (firstItems.length) {
      const mapDC = { MS: 'MS', CP: 'CP', CR: 'CR', IC: 'IC' };
      const preferred = firstItems.find(fi => {
        const hdr = mSalesOrder.get(fi.SalesOrder);
        return hdr && hdr.DistributionChannel === mapDC[rec.woType];
      });
      return (preferred || firstItems[0]).SalesOrder;
    }
    for (const [so, items] of mSalesOrderItem.entries()) {
      const match = items.some(it =>
        it.YY1_WNWorkOrder_SD_SDI === rec.wnWorkOrder &&
        (!rec.salesItemNoSAP || it.SalesOrderItem === rec.salesItemNoSAP)
      );
      if (match) return so;
    }
    return null;
  };

  // -------- Build payloads
  const aPayloads = [];
  const mPayloadMap = new Map();

  for (const oRecord of aRecordsForProcessing) {
    const recCtx = { ID: oRecord.ID, wnWorkOrder: oRecord.wnWorkOrder, woType: oRecord.woType };
    const aErrors = [];
    let oSalesOrder, oSalesOrderItem, oPartnerFunctionZV, oSalesOrderPartner,
        oTravelPayTerm, oTravelPayTermFeed, vendor, firstSOItem, lastSOItem, oConditionType, oBillingType;

    const aSalesOrderFirstItem = mSalesOrderFirstItem.get(oRecord.wnWorkOrder) || [];
    log(this.LOG, 'info', 'record:begin', { ...recCtx, firstItemMatches: aSalesOrderFirstItem.length });

    // Backfill SO if item exists but header does not
    if (oRecord.salesItemNoSAP && !oRecord.salesDocumentNoSAP) {
      const recoveredSO = backfillSalesOrderNo(oRecord);
      if (recoveredSO) {
        this.LOG.info('[SO CREATE/CHANGE] backfill:SO', {
          ID: oRecord.ID, item: oRecord.salesItemNoSAP, so: recoveredSO, wo: oRecord.wnWorkOrder
        });
        oRecord.salesDocumentNoSAP = recoveredSO;
      } else {
        // No header found -> force normal create path
        this.LOG.warn('[SO CREATE/CHANGE] dangling item without SO; forcing create', {
          ID: oRecord.ID, item: oRecord.salesItemNoSAP, wo: oRecord.wnWorkOrder
        });
        oRecord.salesItemNoSAP = null;
      }
    }

    // Skip only when BOTH header and item exist
    if (oRecord.salesItemNoSAP && oRecord.salesDocumentNoSAP) {
      log(this.LOG, 'info', 'record:already-has-SOItem', {
        ...recCtx, salesOrder: oRecord.salesDocumentNoSAP, item: oRecord.salesItemNoSAP
      });
      aPassedRecordIDs.push(oRecord.ID);
      mPayloadMap.set(oRecord.ID, {
        salesOrder: oRecord.salesDocumentNoSAP,
        salesOrderItem: oRecord.salesItemNoSAP,
        salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
        p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
        PORequiredSAP: oRecord.PORequiredSAP,
        purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP
      });
      continue;
    }

    // Type validation
    if (!oRecord.woType || !['SC','MS','IC','CP','CR'].includes(oRecord.woType)) {
      aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SALES_DOCUMENT_TYPE') });
      aFailedRecordIDs.push(oRecord.ID);
      aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
      aErrorLogs.push(...aErrors);
      log(this.LOG, 'warn', 'record:invalid-woType', recCtx);
      continue;
    }

    // Pick Sales Order by type
    if (['CP','CR'].includes(oRecord.woType)) {
      if (aSalesOrderFirstItem.length === 1) {
        oSalesOrder = mSalesOrder.get(aSalesOrderFirstItem[0].SalesOrder);
        log(this.LOG, 'info', 'record:pick-CP/CR-single', { ...recCtx, picked: oSalesOrder?.SalesOrder, dist: oSalesOrder?.DistributionChannel });
        if (oSalesOrder && !['CP','CR'].includes(oSalesOrder.DistributionChannel)) {
          aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SALES_ORDER_PAYROLL') });
        }
      } else {
        for (const item of aSalesOrderFirstItem) {
          const so = mSalesOrder.get(item.SalesOrder);
          if (['CP','CR'].includes(so?.DistributionChannel)) oSalesOrder = so;
          else if (so?.DistributionChannel === 'IC' && so.CustomerGroup === 'Z1') {
            oRecord.salesOrderICUpdateRequired = 'X';
            oRecord.p2SalesDocumentNoSAP = so.SalesOrder;
          }
        }
        log(this.LOG, 'info', 'record:pick-CP/CR-multi', { ...recCtx, picked: oSalesOrder?.SalesOrder, icUpdate: oRecord.salesOrderICUpdateRequired, p2: oRecord.p2SalesDocumentNoSAP });
      }
    } else if (oRecord.woType === 'MS') {
      for (const item of aSalesOrderFirstItem) {
        const so = mSalesOrder.get(item.SalesOrder);
        if (so?.DistributionChannel === 'MS') {
          oSalesOrder = so;
          const partners = mSalesOrderPartner.get(so.SalesOrder);
          if (partners) {
            oPartnerFunctionZV = partners.find(p => p.PartnerFunction === 'ZV');
            vendor = mVendor.get(oPartnerFunctionZV?.Supplier);
            oRecord.PORequiredSAP = vendor ? '' : '1';
            if (so.CustomerPriceGroup === 'ZM') oRecord.PORequiredSAP = '';
          }
        }
      }
      log(this.LOG, 'info', 'record:pick-MS', { ...recCtx, picked: oSalesOrder?.SalesOrder, PORequiredSAP: oRecord.PORequiredSAP });
    }

    if (!oSalesOrder) {
      aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST') });
      aFailedRecordIDs.push(oRecord.ID);
      aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
      aErrorLogs.push(...aErrors);
      log(this.LOG, 'warn', 'record:no-sales-order', recCtx);
      continue;
    }

    // Resolve derived objects
    oSalesOrderItem   = mSalesOrderItem.get(oSalesOrder.SalesOrder) || [];
    oTravelPayTermFeed= mTravelPayTermFeed.get(oSalesOrder.CustomerPaymentTerms);
    oTravelPayTerm    = mTravelPayTerm.get(oSalesOrder.SoldToParty);
    oSalesOrderPartner= mSalesOrderPartner.get(oSalesOrder.SalesOrder) || [];

    firstSOItem = oSalesOrderItem.find(it => it.SalesOrderItem === '10' && it.SalesOrderItemCategory === 'TADN');
    lastSOItem  = oSalesOrderItem.reduce((max, cur) => Number(cur.SalesOrderItem) > Number(max.SalesOrderItem) ? cur : max, oSalesOrderItem[0] || { SalesOrderItem: '0' });

    log(this.LOG, 'info', 'record:items-derived', {
      ...recCtx,
      salesOrder: oSalesOrder.SalesOrder,
      itemsCount: oSalesOrderItem.length,
      firstHasWBS: !!firstSOItem?.WBSElement,
      firstPO: firstSOItem?.YY1_PurchasingDoc_SD_SDI,
      lastItem: lastSOItem?.SalesOrderItem
    });

    // Pricing & billing metadata
    try {
      oConditionType = await determineConditionType({
        customer: oSalesOrder.SoldToParty,
        salesOrganization: oSalesOrder.SalesOrganization,
        distributionChannel: oSalesOrder.DistributionChannel,
        division: oSalesOrder.OrganizationDivision
      });
      log(this.LOG, 'info', 'record:condition-type', { ...recCtx, oConditionType });
    } catch (e) {
      log(this.LOG, 'warn', 'record:condition-type:failed', { ...recCtx, reason: e.message });
    }

    let billingTypeRows = [];
    try {
      billingTypeRows = await this.billingTypeAPI.executeQuery(
        SELECT.from('YY1_BILLINGTYPE').columns(['Billing_type','SO_order_Type']).where({ SO_order_Type: oSalesOrder.YY1_CustomSalesOrder_SDH })
      );
      oBillingType = billingTypeRows?.[0];
      log(this.LOG, 'info', 'record:billing-type', { ...recCtx, rows: billingTypeRows?.length, billingType: oBillingType?.Billing_type });
    } catch (e) {
      log(this.LOG, 'warn', 'record:billing-type:failed', { ...recCtx, reason: e.message });
    }

    if (!firstSOItem?.WBSElement || firstSOItem.WBSElement !== oRecord.internalOrder) {
      aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING') });
      aFailedRecordIDs.push(oRecord.ID);
      aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
      aErrorLogs.push(...aErrors);
      log(this.LOG, 'warn', 'record:wbs-mismatch', { ...recCtx, firstWBSElement: firstSOItem?.WBSElement, internalOrder: oRecord.internalOrder });
      continue;
    }

    // PO alignment block (instrumented)
    if (oRecord.PORequiredSAP === '1') {
      if (!firstSOItem?.YY1_PurchasingDoc_SD_SDI) {
        aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_CREATE_PO') });
        aFailedRecordIDs.push(oRecord.ID);
        aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
        aErrorLogs.push(...aErrors);
        log(this.LOG, 'warn', 'record:po-missing-on-item10', { ...recCtx });
        continue;
      }
      oRecord.purchaseDocumentNoSAP = firstSOItem.YY1_PurchasingDoc_SD_SDI;
      const purchaseOrderItem = mPurchaseOrderItem.get(firstSOItem.YY1_PurchasingDoc_SD_SDI);
      if (!Array.isArray(purchaseOrderItem) || purchaseOrderItem.length === 0) {
        oRecord._poCreateWithSOItem = String(Number(lastSOItem.SalesOrderItem) + 10);
        log(this.LOG, 'info', 'record:po-align:no-existing-po-items', { ...recCtx, nextSOItem: oRecord._poCreateWithSOItem });
      } else {
        const poItemMax = purchaseOrderItem.reduce((max, cur) => Number(cur.PurchaseOrderItem) > Number(max.PurchaseOrderItem) ? cur : max);
        if (poItemMax && Number(poItemMax.PurchaseOrderItem) > Number(lastSOItem.SalesOrderItem)) {
          lastSOItem.SalesOrderItem = poItemMax.PurchaseOrderItem;
        }
        log(this.LOG, 'info', 'record:po-align:existing', { ...recCtx, poMax: poItemMax?.PurchaseOrderItem, lastSOItem: lastSOItem?.SalesOrderItem });
      }
    }

    if (oRecord.wnInvoiceNo === oSalesOrder.YY1_WNInvoice_SD_SDI) {
      aFailedRecordIDs.push(oRecord.ID);
      aErrorLogs.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_DUPLICATE_LINES'), process_code: sProcessCode });
      log(this.LOG, 'warn', 'record:duplicate-invoice', { ...recCtx, invoice: oRecord.wnInvoiceNo });
      continue;
    }

    mPayloadMap.set(oRecord.ID, {
      salesOrder: '',
      salesOrderItem: '',
      salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
      p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
      PORequiredSAP: oRecord.PORequiredSAP,
      purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP
    });

    // Prepare payload (guard + log)
    let oPayload;
    try {
      oPayload = this._prepareDataForSalesOrderItemCreate({
        record: oRecord,
        firstSOItem,
        lastSOItem,
        travelPayTerm: oTravelPayTerm,
        travelPayTermFeed: oTravelPayTermFeed,
        conditionType: oConditionType,
        billingType: oBillingType
      });
      log(this.LOG, 'info', 'record:payload-prepared', { ...recCtx, hasErrors: !!oPayload?.errors, itemHint: lastSOItem?.SalesOrderItem });
    } catch (e) {
      aFailedRecordIDs.push(oRecord.ID);
      aErrorLogs.push({ record_ID: oRecord.ID, message: `Payload build failed: ${e.message}`, process_code: sProcessCode });
      log(this.LOG, 'error', 'record:payload-exception', { ...recCtx, reason: e.message });
      continue;
    }

    const iPayloadIndex = aPayloads.push(oPayload) - 1;
    const mapEntry = mPayloadMap.get(oRecord.ID);
    mapEntry.payloadIndex = iPayloadIndex;
    mPayloadMap.set(oRecord.ID, mapEntry);
  }

  // -------- Create SO Items
  if (Array.isArray(aPayloads) && aPayloads.length > 0) {
    aPayloads.forEach(p => delete p.errors);
    log(this.LOG, 'info', 'createSOItems:begin', { payloadCount: aPayloads.length });

    let aSalesOrderItemResults;
    try {
      aSalesOrderItemResults = await this.salesOrderAPI.createSalesOrderItems(aPayloads);
    } catch (e) {
      log(this.LOG, 'error', 'createSOItems:exception', { reason: e.message, stack: e.stack });
      throw e;
    }

    log(this.LOG, 'info', 'createSOItems:results', { count: aSalesOrderItemResults?.length });

    aSalesOrderItemResults.forEach((oResult, iPayloadIndex) => {
      const entry = [...mPayloadMap.entries()].find(([, v]) => v.payloadIndex === iPayloadIndex);
      const sRecordID = entry?.[0];
      const recCtx = { ID: sRecordID, payloadIndex: iPayloadIndex };

      if (!oResult.hasError) {
        const created = oResult.value;
        aPassedRecordIDs.push(sRecordID);
        const mapEntry = mPayloadMap.get(sRecordID);
        mapEntry.salesOrder = created.SalesOrder;
        mapEntry.salesOrderItem = created.SalesOrderItem;
        mPayloadMap.set(sRecordID, mapEntry);
        log(this.LOG, 'info', 'createSOItems:success', { ...recCtx, salesOrder: created.SalesOrder, item: created.SalesOrderItem });
      } else {
        aFailedRecordIDs.push(sRecordID);
        if (Array.isArray(oResult.reason)) {
          
          oResult.reason.forEach((err) => aErrorLogs.push({ record_ID: sRecordID, ...err, process_code: sProcessCode }));
        } else {
          aErrorLogs.push({ record_ID: sRecordID, message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM_CREATION_FAILED', [oResult.reason]), process_code: sProcessCode });
        }
        mPayloadMap.delete(sRecordID);
        log(this.LOG, 'warn', 'createSOItems:failed', { ...recCtx, reason: safe(oResult.reason) });
      }
    });
  } else {
    log(this.LOG, 'info', 'createSOItems:skipped', { reason: 'no payloads' });
  }

  // -------- VC Data (run only for entries that now have a sales order)
  const tVC = Date.now();
  const mPayloadForVC = new Map([...mPayloadMap].filter(([, v]) => v?.salesOrder));
  await this._prepareVCData({
    records: this.records,
    mCustomerFieldNameValue,
    mPayloadMap: mPayloadForVC,
    mSalesOrders: mSalesOrder,
    aPassedRecordIDs,
    aFailedRecordIDs,
    aErrorLogs
  });
  log(this.LOG, 'info', 'vc:update:done', { ms: Date.now() - tVC });

  if (aErrorLogs.length) {
    await ProcessLogger.addLogs(aErrorLogs);
    await UPDATE(Bonus).set({ valid: false, processLevel_code: sProcessCode }).where({ ID: { in: aFailedRecordIDs } });
    log(this.LOG, 'info', 'errors:written', { count: aErrorLogs.length, failed: aFailedRecordIDs.length });
  }

  // Persist successful updates (keep your existing block in your codebase here)
  // ... your DB update block for mPayloadMap -> this.records & UPDATE(Bonus) ...

  log(this.LOG, 'info', 'post-update:summary', {
    passed: aPassedRecordIDs.length,
    failed: aFailedRecordIDs.length,
    skipped: aSkippedRecords.length
  });

  if (aPassedRecordIDs.length) {
    await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
    await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
    await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
  }
  if (aFailedRecordIDs.length) {
    await Promise.allSettled([ this.markRecordsValid(sProcessCode, aFailedRecordIDs, false) ]);
  }

  this.updateExclusionSet({
    passed: aPassedRecordIDs,
    failed: aFailedRecordIDs,
    skipped: aSkippedRecords,
    bBreakExecution,
  });

  log(this.LOG, 'info', 'processSalesOrder:end');

  return {
    hasError: aFailedRecordIDs.length > 0,
    continue: aFailedRecordIDs.length === 0,
  };
}

/**
 * Prepare data for SalesOrder creation
 */
_prepareDataForSalesOrderItemCreate({
  record,
  firstSOItem,
  lastSOItem,
  travelPayTerm,
  travelPayTermFeed,
  conditionType,
  billingType,
}) {
  const oReturnData = {
    SalesOrder: firstSOItem.SalesOrder,
    SalesOrderItem: String(Number(lastSOItem.SalesOrderItem) + 10),
    SalesOrderItemCategory: 'TAD',
    Material: firstSOItem.Material,
    RequestedQuantity: '1',
    OrderQuantityUnit: 'LAB',
    ProductionPlant: firstSOItem.ProductionPlant || '',
    SalesOrderItemText: 'BONUS',
    WBSElement: firstSOItem.WBSElement,
    PurchaseOrderByCustomer: record?.customerPO ?? '',
    PricingDate: `/Date(${+moment()})/`,
    YY1_PurchasingDoc_SD_SDI: firstSOItem.YY1_PurchasingDoc_SD_SDI || '',
    YY1_WeekEnd_SD_SDI: `/Date(${moment(record.endDate, "YYYYMMDD").valueOf()})/`,
    YY1_CustomBillingType_SDI: billingType?.Billing_type || '',
    YY1_WNWorkOrder_SD_SDI: firstSOItem.YY1_WNWorkOrder_SD_SDI,
    YY1_WNInvoice_SD_SDI: record.wnInvoiceNo,
    to_ScheduleLine: [this._prepareDataForScheduleLine({ record, lastSOItem })],
    to_PricingElement: {
      results: [{
        ConditionType: conditionType,
        ConditionRateValue: record.customerBillRate
      }]
    }, 
    // make sure to_Text exists before we write to it in the loop
    to_Text: [{ LongText: '', LongTextID: '', Language: 'EN' }] 
  };

  if (travelPayTerm) {
    oReturnData.PurchaseOrderByShipToParty = travelPayTerm.poBox;
  }

  if (travelPayTermFeed) {
    oReturnData.CustomerPaymentTerms = travelPayTermFeed.netPaymentTerm;
  }

  // Fill custom fields
  for (const fieldIndex of Array(15).keys()) {
    if (record[`customerFieldName${fieldIndex + 1}`] === 'Z20') {
      oReturnData.to_Text[0].LongText = record[`customerFieldValue${fieldIndex + 1}`];
      oReturnData.to_Text[0].LongTextID = 'ZJOB';
      oReturnData.to_Text[0].Language = 'EN';
      break;
    }
    if (record[`customerFieldName${fieldIndex + 1}`] === 'Z21') {
      oReturnData.to_Text[0].LongText = record[`customerFieldValue${fieldIndex + 1}`];
      oReturnData.to_Text[0].LongTextID = 'ZSLD';
      oReturnData.to_Text[0].Language = 'EN';
      break;
    }
    if (
      record[`customerFieldName${fieldIndex + 1}`] === 'Z41' &&
      ['X', 'YES', 'Y'].includes(record[`customerFieldValue${fieldIndex + 1}`])
    ) {
      oReturnData.PriceListType = 'ZD';
    }
  }
  if (!oReturnData.to_Text[0].LongText) {
    delete oReturnData.to_Text;
  }
  return oReturnData;
}

_prepareDataForScheduleLine({ record, lastSOItem }) {
  return {
    SalesOrderItem: String(Number(lastSOItem.SalesOrderItem) + 10),
    RequestedDeliveryDate: `/Date(${+moment()})/`,
    ScheduleLineOrderQuantity: '1',
    OrderQuantityISOUnit: '_01',
  };
}

// Prepare VC Data Payload and insert it
async _prepareVCData({
  records,
  mCustomerFieldNameValue,
  mPayloadMap,
  mSalesOrders,       // (still passed in; use if you need header metadata)
  aPassedRecordIDs,
  aFailedRecordIDs,
  aErrorLogs
}) {
  // If no eligible entries, nothing to do
  if (!mPayloadMap || mPayloadMap.size === 0) return;

  const SalesVCData_1 = new SalesVCData_1Comm();
  const SalesVCData_2 = new SalesVCData_2Comm();

  // 1) consider only not-failed records
  // 2) generate payloads using salesOrder/salesOrderItem from map entry
  let aPayloadsSalesVCData = records
    .filter((record) => !aFailedRecordIDs.includes(record.ID))
    .map((record) => {
      const oMapEntry = mPayloadMap.get(record.ID);
      if (oMapEntry && oMapEntry.salesOrder) {
        const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID) || [];
        const VC1CustomerFieldName = ['Z40', 'Z43', 'Z44', 'Z45', 'Z46'];
        const VC2CustomerFieldName = ['Z01', 'Z02', 'Z03', 'Z04', 'Z05', 'Z06', 'Z07', 'Z08', 'Z09', 'Z10', 'Z11', 'Z12',
          'Z16', 'Z17', 'Z18', 'Z19', 'Z24', 'Z25', 'Z26', 'Z27', 'Z28', 'Z29', 'Z31',
          'Z32', 'Z33', 'Z34', 'Z35', 'Z37', 'Z39', 'Z42'];

        const oCustFieldResult = aCustomerfieldEntry.reduce((acc, entry) => {
          if (VC1CustomerFieldName.includes(entry.customerFieldName)) {
            acc.VC1Fields[entry.fieldName] = entry.customerFieldValue;
          } else if (VC2CustomerFieldName.includes(entry.customerFieldName)) {
            acc.VC2Fields[entry.fieldName] = entry.customerFieldValue;
          }
          return acc;
        }, { VC1Fields: {}, VC2Fields: {} });

        const salesVC1 = {
          SalesOrderNumber: oMapEntry.salesOrder,
          SalesOrderItemNum: oMapEntry.salesOrderItem,
          YY8_WEEK_ENDING2: moment(record.endDate).format('YYYY-MM-DD'),
          ...(oCustFieldResult.VC1Fields || {}),
        };
        const salesVC2 = {
          Sales_Order_Number: oMapEntry.salesOrder,
          Sales_Order_Item_Num: oMapEntry.salesOrderItem,
          YY166_BONUS_PRICE: record?.customerBillRate || '0.00',
          YY167_BONUS_PAY_RATE: record?.vendorPayRate || '0.00',
          YY246_ZSD_WN_INVOICE_VCSD: record?.salesOrderICUpdateRequired === 'X' ? record.wnInvoiceNo + 'IC' : record.wnInvoiceNo,
          YY247_ZSD_WN_WORK_ORDER_VCSD: record.wnWorkOrder,
          ...(oCustFieldResult.VC2Fields || {}),
        };
        const recordID = record.ID;
        const vcData1UUID = record.vcData1UUID;
        const vcData2UUID = record.vcData2UUID;
        return [salesVC1, salesVC2, recordID, vcData1UUID, vcData2UUID];
      } else {
        return [];
      }
    })
    .filter(arr => Array.isArray(arr) && arr.length); // remove empties

  for (let i = 0; i < aPayloadsSalesVCData.length; i++) {
    let insertedSalesVCData1, insertedSalesVCData2;
    // TODO: Convert to batch and move call out of loop
    if (!aPayloadsSalesVCData[i][3]) {
      insertedSalesVCData1 = await SalesVCData_1.executeQuery(
        INSERT.into('YY1_SALESVCDATA_1').entries(aPayloadsSalesVCData[i][0]),
      );
    }
    if (!aPayloadsSalesVCData[i][4]) {
      insertedSalesVCData2 = await SalesVCData_2.executeQuery(
        INSERT.into('YY1_SALESVCDATA_2').entries(aPayloadsSalesVCData[i][1]),
      );
    }

    const oMapEntry = mPayloadMap.get(aPayloadsSalesVCData[i][2]) || {};
    if (insertedSalesVCData1?.SAP_UUID || aPayloadsSalesVCData[i][3]) {
      oMapEntry.vcData1UUID = insertedSalesVCData1?.SAP_UUID ?? aPayloadsSalesVCData[i][3];
    }
    if (insertedSalesVCData2?.SAP_UUID || aPayloadsSalesVCData[i][4]) {
      oMapEntry.vcData2UUID = insertedSalesVCData2?.SAP_UUID ?? aPayloadsSalesVCData[i][4];
    }
    mPayloadMap.set(aPayloadsSalesVCData[i][2], oMapEntry);

    // error log for failed to insert records in VCData
    if (insertedSalesVCData1?.message || insertedSalesVCData2?.message) {
      if (insertedSalesVCData1?.message) {
        aErrorLogs.push({
          record_ID: aPayloadsSalesVCData[i][2],
          message: `${insertedSalesVCData1.message}`, process_code: sProcessCode
        });
      }
      if (insertedSalesVCData2?.message) {
        aErrorLogs.push({
          record_ID: aPayloadsSalesVCData[i][2],
          message: `${insertedSalesVCData2.message}`, process_code: sProcessCode
        });
      }

      aFailedRecordIDs.push(aPayloadsSalesVCData[i][2]);

      // remove id which is getting error from PassRecordIds.
      const index = aPassedRecordIDs.indexOf(aPayloadsSalesVCData[i][2]);
      if (index !== -1) aPassedRecordIDs.splice(index, 1);
      LOG.error(
        `Error processing record ID ${aPayloadsSalesVCData[i][2]}: ${insertedSalesVCData1?.message} || ${insertedSalesVCData2?.message}`,
      );
    }
  }
}


    async processIntercompanyso(sProcessCode, bBreakExecution) {
        const aRecordsForProcessing = [],
            aErrorLogs = [],
            aFailedRecordIDs = [],
            aPassedRecordIDs = [],
            aSkippedRecords = [];

        let aRecordIDs = [],
            aSalesOrderWhere = [],
            aVendorWhere = [],
            aPurchaseOrderItemWhere = [],
            aCustomerWhere = [],
            aCustomerTermWhere = [],
            aCustomerFieldNamesWhere = [];

        let mCustomerFieldNameValue = new Map(),    // Map for CustomFieldsToVC Table
            mSalesOrder = new Map(), // Map for Sales Order
            mSalesOrderItem = new Map(), // Map for Sales Order Item
            mSalesOrderPartner = new Map(), // Map for Sales Order Partner Fucntion
            mVendor = new Map(), // Map for Vendor from Config Table
            mPurchaseOrderItem = new Map(), // Map for Purchase Order Item
            mTravelPayTerm = new Map(), // Map for Travel Pay Term from Config Table
            mTravelPayTermFeed = new Map(), // Map for Travel Pay Term Feed from Config Table
            mProcessingRecordsToCentralMapping = new Map();

        for (const [iRecordIndex, record] of this.records.entries()) {
            if (this.shouldRecordProcess(record, sProcessCode) && record.salesOrderICUpdateRequired === 'X' && record?.p2SalesDocumentNoSAP) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({ ...record });
                mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
                aRecordIDs.push(record.ID);
            } else {
                if (record.salesOrderICUpdateRequired !== 'X' || !record.p2SalesDocumentNoSAP) {
                    await this.markRecordsValid(sProcessCode, [record.ID], true);
                    continue;
                } else {
                    aSkippedRecords.push({ ...record });
                    continue;
                }
            }

            if (record.p2SalesDocumentNoSAP) {
                aSalesOrderWhere.push(record.p2SalesDocumentNoSAP);
            }

            ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));
        }

        await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);

        this.updateProcessingState(sProcessCode);
        if (!aRecordsForProcessing.length) {
            // If Step doesn't need to be processed, simply return to avoid costly calls
            return {
                hasError: false,
                continue: true,
            };
        }

        try {
            const [
                { reason: anySalesOrderErr, value: aSalesOrders },
                { reason: anySalesOrderItemErr, value: aSalesOrderItems },
                { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
            ] = await Promise.allSettled([
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns(['SalesOrder', 'SalesOrganization', 'DistributionChannel', 'OrganizationDivision', 'CustomerPaymentTerms',
                            'SoldToParty', 'YY1_AlphanumericSalesO_SDH', 'YY1_CustomSalesOrder_SDH', 'CustomerGroup', 'CustomerPriceGroup', 'AdditionalCustomerGroup2'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderWhere)] }
                        })
                ),

                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI',
                            'YY1_WNWorkOrder_SD_SDI', 'Material'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderWhere)] }
                        })
                ),

                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderHeaderPartner')
                        .columns(['SalesOrder', 'Customer', 'Supplier', 'PartnerFunction'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderWhere)] },
                            PartnerFunction: { in: ['ZR', 'ZM', 'BP'] }
                        })
                ),
            ]);

            if (!anySalesOrderErr?.message && aSalesOrders.length) {
                aSalesOrders.forEach((oSalesOrder) => {
                    mSalesOrder.set(oSalesOrder.SalesOrder, oSalesOrder);
                    aCustomerWhere.push(oSalesOrder.SoldToParty);
                    aCustomerTermWhere.push(oSalesOrder.CustomerPaymentTerms);
                });
            }

            if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
                aSalesOrderItems.forEach((oSalesOrderItem) => {
                    if (!mSalesOrderItem.has(oSalesOrderItem.SalesOrder)) {
                        mSalesOrderItem.set(oSalesOrderItem.SalesOrder, []);
                    }
                    mSalesOrderItem.get(oSalesOrderItem.SalesOrder).push(oSalesOrderItem);
                    if (!aPurchaseOrderItemWhere.includes(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI)) {
                        aPurchaseOrderItemWhere.push(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI);
                    }
                });
            }

            if (!anySalesOrderPartnerErr?.message && aSalesOrderPartners.length) {
                aSalesOrderPartners.forEach((oSalesOrderPartner) => {
                    if (!mSalesOrderPartner.has(oSalesOrderPartner.SalesOrder)) {
                        mSalesOrderPartner.set(oSalesOrderPartner.SalesOrder, []);
                    }
                    mSalesOrderPartner.get(oSalesOrderPartner.SalesOrder).push(oSalesOrderPartner);

                    if (oSalesOrderPartner.PartnerFunction === 'ZR') {
                        aVendorWhere.push(oSalesOrderPartner.Supplier);
                    }
                });
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        try {
            const [
                { reason: anyVendorErr, value: aVendors },
                { reason: anyPurchaseOrderItemErr, value: aPurchaseOrderItems },
                { reason: anyTravelPayTermsErr, value: aTravelPayTerms },
                { reason: anyTravelPayTermFeedErr, value: aTravelPayTermFeeds },
            ] = await Promise.allSettled([
                SELECT.from('com.aleron.monitor.Vendor_VendorRemit')
                    .columns(['vendor', 'vendorZR'])
                    .where({ vendor: { in: aVendorWhere } }),

                this.PurchaseOrderAPI.executeQuery(
                    SELECT.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder', 'PurchaseOrderItem'])
                        .where({ PurchaseOrder: { in: [...new Set(aPurchaseOrderItemWhere)] } })
                ),

                SELECT.from('com.aleron.monitor.TravelCustomerPayTermByPOBox')
                    .columns(['customerNo', 'customerTerm', 'poBox'])
                    .where({
                        customerNo: { in: aCustomerWhere },
                        customerTerm: { in: aCustomerTermWhere }
                    }),

                SELECT.from('com.aleron.monitor.TravelPayTermFeed')
                    .columns(['paymentTerm', 'netPaymentTerm'])
                    .where({
                        paymentTerm: { in: aCustomerTermWhere }
                    }),
            ]);

            if (!anyVendorErr?.message && aVendors.length) {
                aVendors.forEach((oVendor) => {
                    mVendor.set(oVendor.SalesOrder, oVendor);
                });
            }

            if (!anyPurchaseOrderItemErr?.message && aPurchaseOrderItems.length) {
                aPurchaseOrderItems.forEach((oPurchaseOrder) => {
                    if (!mPurchaseOrderItem.has(oPurchaseOrder.PurchaseOrder)) {
                        mPurchaseOrderItem.set(oPurchaseOrder.PurchaseOrder, []);
                    }
                    mPurchaseOrderItem.get(oPurchaseOrder.PurchaseOrder).push(oPurchaseOrder);
                });
            }

            if (!anyTravelPayTermsErr?.message && aTravelPayTerms.length) {
                aTravelPayTerms.forEach((oTravelPayTerm) => {
                    mTravelPayTerm.set(oTravelPayTerm.customerNo, oTravelPayTerm);
                });
            }

            if (!anyTravelPayTermFeedErr?.message && aTravelPayTermFeeds.length) {
                aTravelPayTermFeeds.forEach((oTravelPayTermFeed) => {
                    mTravelPayTermFeed.set(oTravelPayTermFeed.paymentTerm, oTravelPayTermFeed);
                });
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        const mConditionType = new Map();
        const mBillingType = new Map();

        for (const record of aRecordsForProcessing) {
            let salesOrder = mSalesOrder.get(record.p2SalesDocumentNoSAP);

            const conditionType = await determineConditionType({
                customer: salesOrder.SoldToParty,
                salesOrganization: salesOrder.SalesOrganization,
                distributionChannel: salesOrder.DistributionChannel,
                division: salesOrder.OrganizationDivision
            });
            mConditionType.set(record.ID, conditionType);

            const billingType = await this.billingTypeAPI.executeQuery(
                SELECT.from('YY1_BILLINGTYPE')
                    .columns(['Billing_type', 'SO_order_Type'])
                    .where({
                        SO_order_Type: salesOrder.YY1_CustomSalesOrder_SDH
                    })
            )
            mBillingType.set(record.ID, billingType[0]);
        }

        const aPayloads = [];
        const mPayloadMap = new Map();

        for (const oRecord of aRecordsForProcessing) {
            const aErrors = [];

            let salesOrder = mSalesOrder.get(oRecord.p2SalesDocumentNoSAP);
            let salesOrderItem = mSalesOrder.get(oRecord.p2SalesDocumentNoSAP);
            let salesOrderPartner = mSalesOrderPartner.get(salesOrder?.salesOrder);
            let oPartnerFunctionZV = salesOrderPartner.filter(item => item.PartnerFunction === 'ZV')[0];
            let oPartnerFunctionBP = salesOrderPartner.filter(item => item.PartnerFunction === 'BP')[0];
            let vendor = mVendor.get(oPartnerFunctionZV?.Supplier);
            let firstSOItem = salesOrderItem.filter(item => item.SalesOrderItem === "10" && item.SalesOrderItemCategory === "TADN")[0];
            let lastSOItem = salesOrderItem.reduce((maxItem, current) =>
                Number(current.SalesOrderItem) > Number(maxItem.SalesOrderItem) ? current : maxItem
            );
            let travelPayTerm = mTravelPayTerm.get(salesOrder.SoldToParty);
            let travelPayTermFeed = mTravelPayTermFeed.get(salesOrder.CustomerPaymentTerms);


            if (!salesOrder) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST'),
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (salesOrder.DistributionChannel !== 'IC') {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_DIST_IC'),
                    process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (vendor || salesOrder.CustomerPriceGroup === 'ZM') {
                oRecord.PORequiredSAP = '';
            } else {
                oRecord.PORequiredSAP = '2';
            }

            // if (oRecord.PORequiredSAP === '2') {
            //     let purchaseOrderItem = mPurchaseOrderItem.get(firstSOItem?.YY1_PurchasingDoc_SD_SDI);

            //     const poItemMax = purchaseOrderItem.reduce((maxItem, current) => {
            //         current.PurchaseOrderItem > maxItem.PurchaseOrderItem ? current : maxItem;
            //     });

            //     if (Number(poItemMax.PurchaseOrderItem) > Number(lastSOItem.SalesOrderItem)) {
            //         lastSOItem.SalesOrderItem = poItemMax.PurchaseOrderItem;
            //     }
            // }

            if (oRecord.PORequiredSAP === '2') {
  const poNumber = firstSOItem?.YY1_PurchasingDoc_SD_SDI;

  if (!poNumber) {
    aErrors.push({
      record_ID: oRecord.ID,
      message: cds.i18n.messages.at?.('ERR_PURCHASE_ORDER_MISSING') || 'Purchase Order missing on SO item 10.',
    });
    aFailedRecordIDs.push(oRecord.ID);
    aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
    aErrorLogs.push(...aErrors);
    continue; // stop this record
  }

  const purchaseOrderItem = mPurchaseOrderItem.get(poNumber);

  if (!Array.isArray(purchaseOrderItem) || purchaseOrderItem.length === 0) {
    aErrors.push({
      record_ID: oRecord.ID,
      message: cds.i18n.messages.at?.('ERR_PURCHASE_ORDER_ITEM_NOT_FOUND')
        || `No PO items found for PO ${poNumber}`,
    });
    aFailedRecordIDs.push(oRecord.ID);
    aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
    aErrorLogs.push(...aErrors);
    continue; // stop this record
  }

  const poItemMax = purchaseOrderItem.reduce(
    (maxItem, current) =>
      Number(current.PurchaseOrderItem) > Number(maxItem.PurchaseOrderItem) ? current : maxItem
  );

  if (poItemMax && Number(poItemMax.PurchaseOrderItem) > Number(lastSOItem.SalesOrderItem)) {
    lastSOItem.SalesOrderItem = poItemMax.PurchaseOrderItem;
  }
}


            if (!firstSOItem.WBSElement) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'),
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (['CP', 'CR'].includes(oRecord.woType)) {
                if (oRecord.wnInvoiceNo + 'IC' === salesOrder.YY1_WNInvoice_SD_SDI) {
                    aErrorLogs.push({
                        record_ID: oRecord.ID,
                        message: cds.i18n.messages.at('ERR_DUPLICATE_LINES'),
                        process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(oRecord.ID);
                    aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
                    aErrorLogs.push(...aErrors);
                    continue; // Skip this record
                }
            }

            if (oRecord.wnInvoiceNo === salesOrder.YY1_WNInvoice_SD_SDI) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_DUPLICATE_LINES'),
                    process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            mPayloadMap.set(oRecord.ID, {
                salesOrder: '',
                salesOrderItem: '',
                PORequiredSAP: oRecord.PORequiredSAP,
            });

            // Prepare payload for SalesOrderItem creation
            const oPayload = this._prepareDataForICSalesOrderItemCreate({
                record: oRecord,                        // record form File
                firstSOItem: firstSOItem,               // SO Item first object
                lastSOItem: lastSOItem,                 // SO Item last Object
                conditionType: conditionType,           // conditionType
                billingType: billingType,               // Billing Type
                travelPayTerm: travelPayTerm,           // Travel Pay Term
                travelPayTermFeed: travelPayTermFeed        // Teravel Pay Term Feed
            });

            // Add payload to aPayloads and map record.ID to its payloadIndex
            const iPayloadIndex = aPayloads.push(oPayload) - 1;
            const oMapEntry = mPayloadMap.get(oRecord.ID);
            oMapEntry.payloadIndex = iPayloadIndex;
            mPayloadMap.set(oRecord.ID, oMapEntry);
        }

        if (Array.isArray(aPayloads) && aPayloads.length > 0) {
            // TODO: Check if aPayloads[].errors has any value; process accordingly
            aPayloads.forEach((oPayload) => delete oPayload.errors);

            // Create SalesOrderItems in S/4HANA via OData
            const aSalesOrderItemResults = await this.salesOrderAPI.createSalesOrderItems(aPayloads);

            // Process the results
            aSalesOrderItemResults.forEach((oResult, iPayloadIndex) => {
                // Find the record ID corresponding to the payload index
                const sRecordID = [...mPayloadMap.entries()].find(
                    ([, oMapEntry]) => oMapEntry.payloadIndex === iPayloadIndex,
                )?.[0];

                if (!oResult.hasError) {
                    const oCreatedSalesOrderItem = oResult.value;
                    aPassedRecordIDs.push(sRecordID);

                    // Update the map entry with the created SalesOrder ID
                    const oMapEntry = mPayloadMap.get(sRecordID);
                    oMapEntry.salesOrder = oCreatedSalesOrderItem.SalesOrder;
                    oMapEntry.salesOrderItem = oCreatedSalesOrderItem.SalesOrderItem;
                    mPayloadMap.set(sRecordID, oMapEntry);
                } else {
                    aFailedRecordIDs.push(sRecordID);
                    if (Array.isArray(oResult.reason)) {
                        oResult.reason.forEach((oError) => {
                            aErrorLogs.push({
                                record_ID: sRecordID,
                                ...oError,
                                process_code: sProcessCode
                            });
                        });
                    } else {
                        aErrorLogs.push({
                            record_ID: sRecordID,
                            message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM_CREATION_FAILED', [oResult.reason]),
                            process_code: sProcessCode
                        });
                    }

                    // Remove the failed record from the map
                    mPayloadMap.delete(sRecordID);
                }
            });
        }

        // VC Date update process
        await this._prepareICVCData({
            records: this.records,
            mCustomerFieldNameValue: mCustomerFieldNameValue,
            mPayloadMap: mPayloadMap,
            mSalesOrders: mSalesOrder,
            aPassedRecordIDs: aPassedRecordIDs,
            aFailedRecordIDs: aFailedRecordIDs,
            aErrorLogs: aErrorLogs
        });

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(SowScInvoice)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        // Update the `salesDocumentNoSAP` field in `this.records` and the database
        this.records.forEach((oRecord) => {
            const oMapEntry = mPayloadMap.get(oRecord.ID);

            if (oMapEntry && oMapEntry.salesOrder) {
                // Update fields in memory
                oRecord.salesDocumentNoSAP = oMapEntry.salesOrder;
                oRecord.salesItemNoSAP = oMapEntry.salesOrderItem;
                oRecord.vcData1ICUUID = oMapEntry.vcData1ICUUID ?? '';
                oRecord.vcData2ICUUID = oMapEntry.vcData2ICUUID ?? '';
                oRecord.PORequiredSAP = oMapEntry.PORequiredSAP;
            }
        });

        // Create records to update using flatMap
        const aRecordsToUpdate = this.records.flatMap((oRecord) => {
            const oMapEntry = mPayloadMap.get(oRecord.ID);

            return oMapEntry && oMapEntry.salesOrder
                ? [
                    {
                        ID: oRecord.ID,
                        salesDocumentNoSAP: oMapEntry.salesOrder,
                        salesItemNoSAP: oMapEntry.salesOrderItem,
                        vcData1ICUUID: oMapEntry.vcData1ICUUID,
                        vcData2ICUUID: oMapEntry.vcData2ICUUID,
                        PORequiredSAP: oMapEntry.PORequiredSAP,
                    },
                ]
                : [];
        });

        if (aRecordsToUpdate.length) {
            await Promise.all(
                aRecordsToUpdate.map((oRecord) => {
                    const iRecordIndex = mProcessingRecordsToCentralMapping.get(oRecord.ID);
                    this.records[iRecordIndex].salesDocumentNoSAP = oRecord.salesDocumentNoSAP;
                    this.records[iRecordIndex].salesItemNoSAP = oRecord.salesItemNoSAP;
                    this.records[iRecordIndex].vcData1ICUUID = oRecord.vcData1ICUUID;
                    this.records[iRecordIndex].vcData2ICUUID = oRecord.vcData2ICUUID;
                    this.records[iRecordIndex].PORequiredSAP = oRecord.PORequiredSAP;
                    return UPDATE(SowScInvoice)
                        .set({
                            salesDocumentNoSAP: oRecord.salesDocumentNoSAP,
                            salesItemNoSAP: oRecord.salesItemNoSAP,
                            vcData1ICUUID: oRecord.vcData1ICUUID,
                            vcData2ICUUID: oRecord.vcData2ICUUID,
                            PORequiredSAP: oRecord.PORequiredSAP,
                        })
                        .where({ ID: oRecord.ID });
                }),
            );
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await Promise.allSettled([
                this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
            ]);
        }

        // Step 8: Update Exclusion Set
        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords,
            bBreakExecution,
        });

        // Step 9: Return Process Result
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    _prepareDataForICSalesOrderItemCreate({
        record,
        firstSOItem,
        lastSOItem,
        conditionType,
        billingType,
        travelPayTerm,
        travelPayTermFeed
    }) {
        const oReturnData = {
            SalesOrder: lastSOItem.SalesOrder,
            SalesOrderItem: String(Number(lastSOItem.SalesOrderItem) + 10),
            Material: firstSOItem.Material,
            SalesOrderItemText: 'BONUS',
            SalesOrderItemCategory: 'ZLAB',
            PurchaseOrderByCustomer: record.customerPO,
            PricingDate: `/Date(${+moment()})/`,
            ProductionPlant: firstSOItem.ProductionPlant,
            YY1_PurchasingDoc_SD_SDI: soItemMax.YY1_PurchasingDoc_SD_SDI,
            YY1_WeekEnd_SD_SDI: `/Date(${moment(record.endDate, "YYYYMMDD").valueOf()})/`,
            YY1_CustomBillingType_SDI: billingType.Billing_type,
            YY1_WNWorkOrder_SD_SDI: soItemMax.YY1_WNWorkOrder_SD_SDI,
            YY1_WNInvoice_SD_SDI: record.wnInvoiceNo,
            to_ScheduleLine: [this._prepareDataForScheduleLine({ record, lastSOItem })],
            to_PricingElement: {
                results: [{
                    ConditionType: conditionType,
                    ConditionRateValue: record.customerBillRate
                }]
            }

        }

        if (travelPayTerm) {
            oReturnData.PurchaseOrderByShipToParty = travelPayTerm.poBox;
        }

        if (travelPayTermFeed) {
            oReturnData.CustomerPaymentTerms = travelPayTermFeed.netPaymentTerm;
        }

        // Fill custom fields
        for (const fieldIndex of Array(15).keys()) {
            if (record[`customerFieldName${fieldIndex + 1}`] === 'Z20') {
                oReturnData.to_Text[0].LongText = record[`customerFieldValue${fieldIndex + 1}`];
                oReturnData.to_Text[0].LongTextID = 'ZJOB';
                oReturnData.to_Text[0].Language = 'EN';
                break;
            }
            if (record[`customerFieldName${fieldIndex + 1}`] === 'Z21') {
                oReturnData.to_Text[0].LongText = record[`customerFieldValue${fieldIndex + 1}`];
                oReturnData.to_Text[0].LongTextID = 'ZSLD';
                oReturnData.to_Text[0].Language = 'EN';
                break;
            }
            if (
                record[`customerFieldName${fieldIndex + 1}`] === 'Z41' &&
                ['X', 'YES', 'Y'].includes(record[`customerFieldValue${fieldIndex + 1}`])
            ) {
                oReturnData.PriceListType = 'ZD';
            }
        }

        return oReturnData;
    }

    // Prepare VC Data Payload and insert it
    async _prepareICVCData({
        records,
        mCustomerFieldNameValue,
        mPayloadMap,
        mSalesOrders,
        aPassedRecordIDs,
        aFailedRecordIDs,
        aErrorLogs
    }) {
        const SalesVCData_1 = new SalesVCData_1Comm();
        const SalesVCData_2 = new SalesVCData_2Comm();

        // 1. filtering the records based on the not failed records ids.
        // 2. generating payload for both VCData1 & VCData2 based on the salesorder for that record id.
        let aPayloadsSalesVCData = records
            .filter((record) => !aFailedRecordIDs.includes(record.ID))
            .map((record) => {
                const oMapEntry = mPayloadMap.get(record.ID);
                const oSalesOrder = mSalesOrders.get(record.p2SalesDocumentNoSAP);

                if (oMapEntry && oMapEntry.salesOrder) {
                    const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID);
                    const VC1CustomerFieldName = ['Z40', 'Z43', 'Z44', 'Z45', 'Z46'];
                    const VC2CustomerFieldName = ['Z01', 'Z02', 'Z03', 'Z04', 'Z05', 'Z06', 'Z07', 'Z08', 'Z09', 'Z10', 'Z11', 'Z12',
                        'Z16', 'Z17', 'Z18', 'Z19', 'Z24', 'Z25', 'Z26', 'Z27', 'Z28', 'Z29', 'Z31',
                        'Z32', 'Z33', 'Z34', 'Z35', 'Z37', 'Z39', 'Z42'];
                    const oCustFieldResult = aCustomerfieldEntry.reduce((acc, entry) => {
                        if (VC1CustomerFieldName.includes(entry.customerFieldName)) {
                            acc.VC1Fields[entry.fieldName] = entry.customerFieldValue;
                        } else if (VC2CustomerFieldName.includes(entry.customerFieldName)) {
                            acc.VC2Fields[entry.fieldName] = entry.customerFieldValue;
                        }
                        return acc;
                    }, { VC1Fields: {}, VC2Fields: {} });

                    const salesVC1 = {
                        SalesOrderNumber: oMapEntry.salesOrder,
                        SalesOrderItemNum: oMapEntry.salesOrderItem,
                        YY8_WEEK_ENDING2: moment(record.endDate).format('YYYY-MM-DD'),
                        ...(oCustFieldResult.VC1Fields || {}),
                    };
                    const salesVC2 = {
                        Sales_Order_Number: oMapEntry.salesOrder,
                        Sales_Order_Item_Num: oMapEntry.salesOrderItem,
                        YY166_BONUS_PRICE: record?.customerBillRate || '0.00',
                        YY167_BONUS_PAY_RATE: record?.vendorPayRate || '0.00',
                        YY246_ZSD_WN_INVOICE_VCSD: record?.salesOrderICUpdateRequired === 'X' ? record.wnInvoiceNo + 'IC' : record.wnInvoiceNo,
                        YY247_ZSD_WN_WORK_ORDER_VCSD: record.wnWorkOrder,
                        ...(oCustFieldResult.VC2Fields || {}),
                    };
                    const recordID = record.ID;
                    const vcData1UUID = record.vcData1ICUUID;
                    const vcData2UUID = record.vcData2ICUUID;
                    return [salesVC1, salesVC2, recordID, vcData1UUID, vcData2UUID];
                } else {
                    return [];
                }
            });

        for (let i = 0; i < aPayloadsSalesVCData.length; i++) {
            let insertedSalesVCData1, insertedSalesVCData2;
            // TODO: Conver to Batch call and take call out of loop
            if (!aPayloadsSalesVCData[i][3]) {
                insertedSalesVCData1 = await SalesVCData_1.executeQuery(
                    INSERT.into('YY1_SALESVCDATA_1').entries(aPayloadsSalesVCData[i][0]),
                );
            }
            if (!aPayloadsSalesVCData[i][4]) {
                insertedSalesVCData2 = await SalesVCData_2.executeQuery(
                    INSERT.into('YY1_SALESVCDATA_2').entries(aPayloadsSalesVCData[i][1]),
                );
            }

            const oMapEntry = mPayloadMap.get(aPayloadsSalesVCData[i][2]);
            if (insertedSalesVCData1?.SAP_UUID || aPayloadsSalesVCData[i][3]) {
                oMapEntry.vcData1ICUUID = insertedSalesVCData1?.SAP_UUID ?? aPayloadsSalesVCData[i][3];
            }
            if (insertedSalesVCData2?.SAP_UUID || aPayloadsSalesVCData[i][4]) {
                oMapEntry.vcData2ICUUID = insertedSalesVCData2?.SAP_UUID ?? aPayloadsSalesVCData[i][4];
            }
            mPayloadMap.set(aPayloadsSalesVCData[i][2], oMapEntry);

            // error log for failed to insert records in VCData
            if (insertedSalesVCData1?.message || insertedSalesVCData2?.message) {
                if (insertedSalesVCData1?.message) {
                    aErrorLogs.push({
                        record_ID: aPayloadsSalesVCData[i][2],
                        message: `${insertedSalesVCData1.message}`, process_code: sProcessCode
                    });
                }
                if (insertedSalesVCData2?.message) {
                    aErrorLogs.push({
                        record_ID: aPayloadsSalesVCData[i][2],
                        message: `${insertedSalesVCData2.message}`, process_code: sProcessCode
                    });
                }

                aFailedRecordIDs.push(aPayloadsSalesVCData[i][2]);

                // remvove id which is getting error from PassRecordIds.
                const index = aPassedRecordIDs.indexOf(aPayloadsSalesVCData[i][2]);
                if (index !== -1) aPassedRecordIDs.splice(index, 1);
                LOG.error(
                    `Error processing record ID ${aPayloadsSalesVCData[i][2]}: ${insertedSalesVCData1.message} || ${insertedSalesVCData2.message}`,
                );
            }
        }
    }

    /*** Step 5: Create / Update PO ***/
    // async processPurchaseOrder(sProcessCode, bBreakExecution) {
    //     const aRecordsForProcessing = [],
    //         aErrorLogs = [],
    //         aFailedRecordIDs = [],
    //         aPassedRecordIDs = [],
    //         aSkippedRecords = [];

    //     let aRecordIDs = [],
    //         aSalesDocumentNoWhere = [],
    //         aSalesDocumentItemNOWhere = [],
    //         aBusinessPartnerAddressWhere = [];

    //     let mSalesOrder = new Map(),   // Map for SalesOrders
    //         mSalesOrderItem = new Map(),   // Map for SalesOrderItems
    //         mSalesOrderPartner = new Map(),    // Map for SalesOrderPartners
    //         mBusinessPartner = new Map(),   // Map for BusinessPartner
    //         mProcessingRecordsToCentralMapping = new Map();

    //     for (const [iRecordIndex, record] of this.records.entries()) {
    //         if (this.shouldRecordProcess(record, sProcessCode) && record.PORequiredSAP) {
    //             // If record is on step level & is already valid, then skip
    //             aRecordsForProcessing.push({ ...record });
    //             mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
    //             aRecordIDs.push(record.ID);
    //         } else {
    //             if (record.PORequiredSAP === '' || !record.PORequiredSAP) {
    //                 await this.markRecordsValid(sProcessCode, [record.ID], true);
    //                 continue;
    //             } else {
    //                 aSkippedRecords.push({ ...record });
    //                 continue;
    //             }
    //         }

    //         if (record.PORequiredSAP === '2') {
    //             aSalesDocumentNoWhere.push(record.salesOrderICSAP);
    //             aSalesDocumentItemNOWhere.push(record.salesItemNoICSAP);
    //         } else {
    //             aSalesDocumentNoWhere.push(record.salesDocumentNoSAP);
    //             aSalesDocumentItemNOWhere.push(record.salesItemNoSAP);
    //         }
    //     }

    //     await ProcessLogger.removeLogs(aRecordIDs);

    //     this.updateProcessingState(sProcessCode);
    //     if (!aRecordsForProcessing.length) {
    //         // If Step doesn't need to be processed, simply return to avoid costly calls
    //         return {
    //             hasError: false,
    //             continue: true,
    //         };
    //     }

    //     try {
    //         const [
    //             { reason: anySalesOrderErr, value: aSalesOrders },
    //             { reason: anySalesOrderItemErr, value: aSalesOrderItems },
    //             { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
    //         ] = await Promise.allSettled([
    //             this.salesOrderAPI.executeQuery(
    //                 SELECT.from('A_SalesOrder')
    //                     .columns(['SalesOrder', 'SalesOrderType', 'SalesOrganization', 'DistributionChannel', 'TransactionCurrency'
    //                         , 'TaxDepartureCountry', 'SoldToParty', 'OrganizationDivision', 'YY1_CustomSalesOrder_SDH'
    //                     ])
    //                     .where({
    //                         SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] }
    //                     })
    //             ),

    //             this.salesOrderAPI.executeQuery(
    //                 SELECT.from('A_SalesOrderItem')
    //                     .columns(['SalesOrder', 'SalesOrderItem', 'HigherLevelItem', 'HigherLevelItemUsage',
    //                         'SalesOrderItemCategory', 'SalesOrderItemText', 'PurchaseOrderByCustomer',
    //                         'PurchaseOrderByShipToParty', 'UnderlyingPurchaseOrderItem', 'ExternalItemID',
    //                         'Material', 'MaterialByCustomer', 'PricingDate', 'PricingReferenceMaterial',
    //                         'BillingPlan', 'RequestedQuantity', 'RequestedQuantityUnit',
    //                         'RequestedQuantitySAPUnit', 'RequestedQuantityISOUnit', 'OrderQuantityUnit',
    //                         'OrderQuantitySAPUnit', 'OrderQuantityISOUnit', 'ConfdDelivQtyInOrderQtyUnit',
    //                         'ItemGrossWeight', 'ItemNetWeight', 'ItemWeightUnit', 'ItemWeightSAPUnit',
    //                         'ItemWeightISOUnit', 'ItemVolume', 'ItemVolumeUnit', 'ItemVolumeSAPUnit',
    //                         'ItemVolumeISOUnit', 'OriginallyRequestedMaterial', 'TransactionCurrency',
    //                         'NetAmount', 'TotalSDDocReferenceStatus', 'SDDocReferenceStatus',
    //                         'MaterialSubstitutionReason', 'MaterialGroup', 'MaterialPricingGroup',
    //                         'AdditionalMaterialGroup1', 'AdditionalMaterialGroup2',
    //                         'AdditionalMaterialGroup3', 'AdditionalMaterialGroup4',
    //                         'AdditionalMaterialGroup5', 'BillingDocumentDate', 'ContractAccount',
    //                         'AdditionalValueDays', 'ServicesRenderedDate', 'Batch', 'ProductionPlant',
    //                         'OriginalPlant', 'AltvBsdConfSubstitutionStatus', 'StorageLocation',
    //                         'DeliveryGroup', 'ShippingPoint', 'ShippingType', 'DeliveryPriority',
    //                         'DeliveryDateQuantityIsFixed', 'DeliveryDateTypeRule',
    //                         'IncotermsClassification', 'IncotermsTransferLocation',
    //                         'IncotermsLocation1', 'IncotermsLocation2', 'TaxAmount',
    //                         'ProductTaxClassification1', 'ProductTaxClassification2',
    //                         'ProductTaxClassification3', 'ProductTaxClassification4',
    //                         'ProductTaxClassification5', 'ProductTaxClassification6',
    //                         'ProductTaxClassification7', 'ProductTaxClassification8',
    //                         'ProductTaxClassification9', 'MatlAccountAssignmentGroup', 'CostAmount',
    //                         'CustomerPaymentTerms', 'FixedValueDate', 'CustomerGroup',
    //                         'SalesDocumentRjcnReason', 'ItemBillingBlockReason',
    //                         'SlsDocIsRlvtForProofOfDeliv', 'WBSElement', 'ProfitCenter',
    //                         'AccountingExchangeRate', 'ReferenceSDDocument',
    //                         'ReferenceSDDocumentItem', 'SDProcessStatus', 'DeliveryStatus',
    //                         'OrderRelatedBillingStatus', 'Subtotal1Amount', 'Subtotal2Amount',
    //                         'Subtotal3Amount', 'Subtotal4Amount', 'Subtotal5Amount',
    //                         'Subtotal6Amount', 'YY1_StrTimeMarkup_SD_SDI', 'YY1_DoubTimeMarkup_SD_SDI',
    //                         'YY1_LegacyPurchase_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_CustomURL_SDI',
    //                         'YY1_ExtensionUUID1_SDI',
    //                         // 'YY1_CostCenter_SD_SDI', 
    //                         'YY1_EEGroup_SD_SDI',
    //                         'YY1_DuplicateWeek_SD_SDI', 'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI',
    //                         'YY1_CommodityCode_SD_SDI', 'YY1_ExtensionUUID2_SDI',
    //                         'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
    //                         'YY1_WNWorkOrder_SD_SDI', 'YY1_CategoryCode_SD_SDI',
    //                         'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
    //                         'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI',
    //                         'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
    //                     ])
    //                     .where({
    //                         SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] }
    //                     })
    //             ),

    //             this.salesOrderAPI.executeQuery(
    //                 SELECT.from('A_SalesOrderHeaderPartner')
    //                     .columns(['SalesOrder', 'Customer', 'AddressID', 'ReferenceBusinessPartner', 'PartnerFunction', 'Supplier'])
    //                     .where({
    //                         SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] },
    //                         PartnerFunction: { in: ['SH', 'ZV', 'ZR'] }
    //                     })
    //             ),
    //         ]);

    //         if (!anySalesOrderErr?.message && aSalesOrders.length) {
    //             aSalesOrders.forEach((oSalesOrder) =>
    //                 mSalesOrder.set(oSalesOrder.SalesOrder, oSalesOrder)
    //             );
    //         }

    //         if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
    //             aSalesOrderItems.forEach((oSalesOrderItem) => {
    //                 if (!mSalesOrderItem.has(oSalesOrderItem.SalesOrder)) {
    //                     mSalesOrderItem.set(oSalesOrderItem.SalesOrder, []);
    //                 }
    //                 mSalesOrderItem.get(oSalesOrderItem.SalesOrder).push(oSalesOrderItem)
    //             });
    //         }

    //         if (!anySalesOrderPartnerErr?.message && aSalesOrderPartners.length) {
    //             aSalesOrderPartners.forEach((oSalesOrderPartner) => {
    //                 if (!mSalesOrderPartner.has(oSalesOrderPartner.SalesOrder)) {
    //                     mSalesOrderPartner.set(oSalesOrderPartner.SalesOrder, []);
    //                 }
    //                 mSalesOrderPartner.get(oSalesOrderPartner.SalesOrder).push(oSalesOrderPartner);
    //                 if (oSalesOrderPartner.PartnerFunction === 'SH') {
    //                     aBusinessPartnerAddressWhere.push(oSalesOrderPartner.ReferenceBusinessPartner)
    //                 }
    //             });
    //         }
    //     } catch (err) {
    //         this.LOG._error && this.LOG.error(err.message);
    //     }

    //     try {
    //         const [
    //             { reason: anyBusinessPartnerErr, value: aBusinessPartners },
    //         ] = await Promise.allSettled([
    //             this.businesPartnerAPI.executeQuery(
    //                 SELECT.from('A_BusinessPartnerAddress')
    //                     .columns(['BusinessPartner', 'Language', 'HouseNumber', 'StreetName', 'CityName', 'PostalCode', 'Country', 'Region', 'TaxJurisdiction'])
    //                     .where({
    //                         BusinessPartner: { in: [...new Set(aBusinessPartnerAddressWhere)] }
    //                     })
    //             )
    //         ]);

    //         if (!anyBusinessPartnerErr?.message && aBusinessPartners.length) {
    //             aBusinessPartners.forEach((oBusinessPartner) => {
    //                 mBusinessPartner.set(oBusinessPartner.BusinessPartner, oBusinessPartner)
    //             });
    //         }
    //     } catch (err) {
    //         this.LOG._error && this.LOG.error(err.message);
    //     }

    //     let mPayloadMap = new Map();

    //     for (const oRecord of aRecordsForProcessing) {
    //         const aErrors = [];

    //         let oSalesOrder, oSalesOrderItem, deliveryAddress;

    //         if (oRecord.PORequiredSAP === '2') {
    //             oSalesOrder = mSalesOrder.get(oRecord.salesOrderICSAP);
    //             oSalesOrderItem = mSalesOrderItem.get(oRecord.salesOrderICSAP);
    //         } else {
    //             oSalesOrder = mSalesOrder.get(oRecord.salesDocumentNoSAP);
    //             oSalesOrderItem = mSalesOrderItem.get(oRecord.salesDocumentNoSAP);
    //         }

    //         let firstSOItem = oSalesOrderItem.filter(item => item.SalesOrderItem === "10" && item.SalesOrderItemCategory === "TADN")[0];
    //         let lastSOItem = oSalesOrderItem.reduce((maxItem, current) =>
    //             Number(current.SalesOrderItem) > Number(maxItem.SalesOrderItem) ? current : maxItem
    //         );

    //         // let duplicateCheck = oSalesOrderItem.filter(item => item.YY1_WNInvoice_SD_SDI === oRecord.wnInvoiceNo) ?? [];
    //         let duplicateCheck = oSalesOrderItem.filter(item =>
    //             item.YY1_WNInvoice_SD_SDI === oRecord.wnInvoiceNo &&
    //             item.SalesOrderItem !== oRecord.salesItemNoSAP
    //         ) ?? [];
    //         let oSalesOrderPartner = mSalesOrderPartner.get(oRecord.salesDocumentNoSAP);
    //         let oSalesOrderPartnerSH = oSalesOrderPartner.filter(p => p.PartnerFunction === 'SH')[0];
    //         let oBusinessPartner = mBusinessPartner.get(oSalesOrderPartnerSH?.ReferenceBusinessPartner);
    //         let conditionType = await determineConditionType({
    //             customer: oSalesOrder.SoldToParty,
    //             salesOrganization: oSalesOrder.SalesOrganization,
    //             distributionChannel: oSalesOrder.DistributionChannel,
    //             division: oSalesOrder.OrganizationDivision
    //         });

    //         if (!oRecord.purchaseDocumentNoSAP) {
    //             aErrors.push({
    //                 record_ID: oRecord.ID,
    //                 message: cds.i18n.messages.at('ERR_PURCHASE_ORDER_MISSING'),
    //             });
    //             aFailedRecordIDs.push(oRecord.ID);
    //             aErrorLogs.push(...aErrors);
    //             continue; // Skip this record
    //         }

    //         if (!oSalesOrder.SalesOrder) {
    //             aErrors.push({
    //                 record_ID: oRecord.ID,
    //                 message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST'),
    //             });
    //             aFailedRecordIDs.push(oRecord.ID);
    //             aErrorLogs.push(...aErrors);
    //             continue; // Skip this record
    //         }

    //         if (oSalesOrder.YY1_CustomSalesOrder_SDH !== 'ZWMS') {
    //             aErrors.push({
    //                 record_ID: oRecord.ID,
    //                 message: cds.i18n.messages.at('ERR_SALES_ORDER_TYPE'),
    //             });
    //             aFailedRecordIDs.push(oRecord.ID);
    //             aErrorLogs.push(...aErrors);
    //             continue; // Skip this record
    //         }

    //         if (!firstSOItem.WBSElement) {
    //             aErrors.push({
    //                 record_ID: oRecord.ID,
    //                 message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'),
    //             });
    //             aFailedRecordIDs.push(oRecord.ID);
    //             aErrorLogs.push(...aErrors);
    //             continue; // Skip this record
    //         }

    //         if (!oSalesOrderPartnerSH.Customer) {
    //             aErrors.push({
    //                 record_ID: oRecord.ID,
    //                 message: cds.i18n.messages.at('ERR_SHIP_TO_ADDRESS_NOT_FOUND'),
    //             });
    //             aFailedRecordIDs.push(oRecord.ID);
    //             aErrorLogs.push(...aErrors);
    //             continue; // Skip this record
    //         } else {
    //             deliveryAddress = {
    //                 PurchaseOrder: lastSOItem.YY1_PurchasingDoc_SD_SDI,
    //                 PurchaseOrderItem: lastSOItem.SalesOrderItem,
    //                 DeliveryAddressID: oSalesOrderPartnerSH.AddressID
    //             };
    //         }

    //         const oItemPayload = this._prepareDataForPurchaseOrderUpdate({
    //             record: oRecord,
    //             salesOrder: oSalesOrder,
    //             firstSOItem: firstSOItem,
    //             lastSOItem: lastSOItem,
    //             businessPartnerSH: oSalesOrderPartnerSH,
    //             deliveryAddress: deliveryAddress,
    //             conditionType: conditionType,
    //             duplicateCheck: duplicateCheck,
    //             businessPartner: oBusinessPartner
    //         });

    //         const oPurchaseOrderItemResults = await this.PurchaseOrderAPI.createPurchaseOrderItem(firstSOItem.YY1_PurchasingDoc_SD_SDI, oItemPayload);

    //         if (oPurchaseOrderItemResults.error) {
    //             aErrorLogs.push({
    //                 record_ID: oRecord.ID,
    //                 message: `${oPurchaseOrderItemResults.error}`,
    //             });
    //             aFailedRecordIDs.push(oRecord.ID);
    //             LOG.error(
    //                 `Error processing record ID ${oRecord.ID}: ${oPurchaseOrderItemResults.error}`,
    //             );
    //             continue; // Skip this record
    //         } else {
    //             mPayloadMap.set(oRecord.ID, {
    //                 purchaseDocumentNoSAP: oPurchaseOrderItemResults.value.PurchaseOrder,
    //                 purchaseDocumentItemSAP: oRecord.salesItemNoSAP
    //             });
    //             oRecord.purchaseDocumentNoSAP = oPurchaseOrderItemResults.value.PurchaseOrder;
    //             oRecord.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;

    //             const item = this.records.find((record) => record.ID === oRecord.ID);
    //             if (item) {
    //                 item.purchaseDocumentNoSAP = oPurchaseOrderItemResults.value.PurchaseOrder;
    //                 item.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;
    //             }

    //             aPassedRecordIDs.push(oRecord.ID);

    //             await this.salesOrderAPI.executeQuery(
    //                 UPDATE('A_SalesOrderItem')
    //                     .set({ YY1_PurchasingDoc_SD_SDI: oPurchaseOrderItemResults.value.PurchaseOrder })
    //                     .where({
    //                         SalesOrder: oSalesOrder.SalesOrder,
    //                         SalesOrderItem: oSalesOrderItem.SalesOrderItem
    //                     })
    //             );
    //         }
    //     }

    //     if (aErrorLogs.length) {
    //         await ProcessLogger.addLogs(aErrorLogs);
    //         await UPDATE(Bonus)
    //             .set({ valid: false, processLevel_code: sProcessCode })
    //             .where({ ID: { in: aFailedRecordIDs } });
    //     }

    //     // Update the `purchaseDocumentNoSAP` and `purchaseDocumentItemSAP` field in `this.records` and the database
    //     this.records.forEach((oRecord) => {
    //         const oMapEntry = mPayloadMap?.get(oRecord.ID);
    //         // Update fields in memory
    //         if (oMapEntry) {
    //             oRecord.purchaseDocumentNoSAP = oMapEntry?.purchaseDocumentNoSAP;
    //             oRecord.purchaseDocumentItemSAP = oMapEntry?.purchaseDocumentItemSAP;
    //         }
    //     });

    //     // Create records to update using flatMap
    //     const aRecordsToUpdate = this.records.flatMap((oRecord) => {
    //         const oMapEntry = mPayloadMap?.get(oRecord.ID);
    //         return oMapEntry && oMapEntry?.purchaseDocumentNoSAP
    //             ? [
    //                 {
    //                     ID: oRecord.ID,
    //                     purchaseDocumentNoSAP: oMapEntry?.purchaseDocumentNoSAP,
    //                     purchaseDocumentItemSAP: oMapEntry?.purchaseDocumentItemSAP,
    //                 },
    //             ]
    //             : [];
    //     });

    //     if (aRecordsToUpdate.length) {
    //         await Promise.all(
    //             aRecordsToUpdate.map((oRecord) => {
    //                 const iRecordIndex = mProcessingRecordsToCentralMapping.get(oRecord.ID);
    //                 this.records[iRecordIndex].purchaseDocumentNoSAP = oRecord.purchaseDocumentNoSAP;
    //                 this.records[iRecordIndex].purchaseDocumentItemSAP = oRecord.purchaseDocumentItemSAP;
    //                 return UPDATE(Bonus)
    //                     .set({
    //                         purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP,
    //                         purchaseDocumentItemSAP: oRecord.purchaseDocumentItemSAP,
    //                     })
    //                     .where({ ID: oRecord.ID });
    //             }),
    //         );
    //     }

    //     // Update the status of passed records
    //     if (aPassedRecordIDs.length) {
    //         await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
    //         await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
    //     }

    //     // Update the status of failed records
    //     if (aFailedRecordIDs.length) {
    //         await Promise.allSettled([
    //             this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
    //         ]);
    //     }

    //     // Step 8: Update Exclusion Set
    //     this.updateExclusionSet({
    //         passed: aPassedRecordIDs,
    //         failed: aFailedRecordIDs,
    //         skipped: aSkippedRecords,
    //         bBreakExecution,
    //     });

    //     // Step 9: Return Process Result
    //     return {
    //         hasError: aFailedRecordIDs.length > 0,
    //         continue: aFailedRecordIDs.length === 0,
    //     };
    // }

    /*** Step 5: Create / Update PO ***/
// async processPurchaseOrder(sProcessCode, bBreakExecution) {
//   const aRecordsForProcessing = [],
//     aErrorLogs = [],
//     aFailedRecordIDs = [],
//     aPassedRecordIDs = [],
//     aSkippedRecords = [];

//   let aRecordIDs = [],
//     aSalesDocumentNoWhere = [],
//     aSalesDocumentItemNOWhere = [],
//     aBusinessPartnerAddressWhere = [];

//   let mSalesOrder = new Map(),
//     mSalesOrderItem = new Map(),
//     mSalesOrderPartner = new Map(),
//     mBusinessPartner = new Map(),
//     mProcessingRecordsToCentralMapping = new Map();

//   for (const [iRecordIndex, record] of this.records.entries()) {
//     if (this.shouldRecordProcess(record, sProcessCode) && record.PORequiredSAP) {
//       aRecordsForProcessing.push({ ...record });
//       mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
//       aRecordIDs.push(record.ID);
//     } else {
//       if (record.PORequiredSAP === '' || !record.PORequiredSAP) {
//         await this.markRecordsValid(sProcessCode, [record.ID], true);
//         continue;
//       } else {
//         aSkippedRecords.push({ ...record });
//         continue;
//       }
//     }

//     if (record.PORequiredSAP === '2') {
//       aSalesDocumentNoWhere.push(record.salesOrderICSAP);
//       aSalesDocumentItemNOWhere.push(record.salesItemNoICSAP);
//     } else {
//       aSalesDocumentNoWhere.push(record.salesDocumentNoSAP);
//       aSalesDocumentItemNOWhere.push(record.salesItemNoSAP);
//     }
//   }

//   await ProcessLogger.removeLogs(aRecordIDs);

//   this.updateProcessingState(sProcessCode);
//   if (!aRecordsForProcessing.length) {
//     return { hasError: false, continue: true };
//   }

//   try {
//     const [
//       { reason: anySalesOrderErr, value: aSalesOrders },
//       { reason: anySalesOrderItemErr, value: aSalesOrderItems },
//       { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
//     ] = await Promise.allSettled([
//       this.salesOrderAPI.executeQuery(
//         SELECT.from('A_SalesOrder')
//           .columns([
//             'SalesOrder',
//             'SalesOrderType',
//             'SalesOrganization',
//             'DistributionChannel',
//             'TransactionCurrency',
//             'TaxDepartureCountry',
//             'SoldToParty',
//             'OrganizationDivision',
//             'YY1_CustomSalesOrder_SDH',
//           ])
//           .where({ SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] } })
//       ),
//       this.salesOrderAPI.executeQuery(
//         SELECT.from('A_SalesOrderItem')
//           .columns([
//             'SalesOrder',
//             'SalesOrderItem',
//             'HigherLevelItem',
//             'HigherLevelItemUsage',
//             'SalesOrderItemCategory',
//             'SalesOrderItemText',
//             'PurchaseOrderByCustomer',
//             'PurchaseOrderByShipToParty',
//             'UnderlyingPurchaseOrderItem',
//             'ExternalItemID',
//             'Material',
//             'MaterialByCustomer',
//             'PricingDate',
//             'PricingReferenceMaterial',
//             'BillingPlan',
//             'RequestedQuantity',
//             'RequestedQuantityUnit',
//             'RequestedQuantitySAPUnit',
//             'RequestedQuantityISOUnit',
//             'OrderQuantityUnit',
//             'OrderQuantitySAPUnit',
//             'OrderQuantityISOUnit',
//             'ConfdDelivQtyInOrderQtyUnit',
//             'ItemGrossWeight',
//             'ItemNetWeight',
//             'ItemWeightUnit',
//             'ItemWeightSAPUnit',
//             'ItemWeightISOUnit',
//             'ItemVolume',
//             'ItemVolumeUnit',
//             'ItemVolumeSAPUnit',
//             'ItemVolumeISOUnit',
//             'OriginallyRequestedMaterial',
//             'TransactionCurrency',
//             'NetAmount',
//             'TotalSDDocReferenceStatus',
//             'SDDocReferenceStatus',
//             'MaterialSubstitutionReason',
//             'MaterialGroup',
//             'MaterialPricingGroup',
//             'AdditionalMaterialGroup1',
//             'AdditionalMaterialGroup2',
//             'AdditionalMaterialGroup3',
//             'AdditionalMaterialGroup4',
//             'AdditionalMaterialGroup5',
//             'BillingDocumentDate',
//             'ContractAccount',
//             'AdditionalValueDays',
//             'ServicesRenderedDate',
//             'Batch',
//             'ProductionPlant',
//             'OriginalPlant',
//             'AltvBsdConfSubstitutionStatus',
//             'StorageLocation',
//             'DeliveryGroup',
//             'ShippingPoint',
//             'ShippingType',
//             'DeliveryPriority',
//             'DeliveryDateQuantityIsFixed',
//             'DeliveryDateTypeRule',
//             'IncotermsClassification',
//             'IncotermsTransferLocation',
//             'IncotermsLocation1',
//             'IncotermsLocation2',
//             'TaxAmount',
//             'ProductTaxClassification1',
//             'ProductTaxClassification2',
//             'ProductTaxClassification3',
//             'ProductTaxClassification4',
//             'ProductTaxClassification5',
//             'ProductTaxClassification6',
//             'ProductTaxClassification7',
//             'ProductTaxClassification8',
//             'ProductTaxClassification9',
//             'MatlAccountAssignmentGroup',
//             'CostAmount',
//             'CustomerPaymentTerms',
//             'FixedValueDate',
//             'CustomerGroup',
//             'SalesDocumentRjcnReason',
//             'ItemBillingBlockReason',
//             'SlsDocIsRlvtForProofOfDeliv',
//             'WBSElement',
//             'ProfitCenter',
//             'AccountingExchangeRate',
//             'ReferenceSDDocument',
//             'ReferenceSDDocumentItem',
//             'SDProcessStatus',
//             'DeliveryStatus',
//             'OrderRelatedBillingStatus',
//             'Subtotal1Amount',
//             'Subtotal2Amount',
//             'Subtotal3Amount',
//             'Subtotal4Amount',
//             'Subtotal5Amount',
//             'Subtotal6Amount',
//             'YY1_StrTimeMarkup_SD_SDI',
//             'YY1_DoubTimeMarkup_SD_SDI',
//             'YY1_LegacyPurchase_SD_SDI',
//             'YY1_WeekEnd_SD_SDI',
//             'YY1_CustomURL_SDI',
//             'YY1_ExtensionUUID1_SDI',
//             'YY1_EEGroup_SD_SDI',
//             'YY1_DuplicateWeek_SD_SDI',
//             'YY1_ACA_HRS_SDI',
//             'YY1_Royality_SD_SDI',
//             'YY1_CommodityCode_SD_SDI',
//             'YY1_ExtensionUUID2_SDI',
//             'YY1_SupplierInvoice_SD_SDI',
//             'YY1_InvoiceVATtxt_SD_SDI',
//             'YY1_WNWorkOrder_SD_SDI',
//             'YY1_CategoryCode_SD_SDI',
//             'YY1_OverTimeMarkup_SD_SDI',
//             'YY1_ACA_HRS_PRICE_SDI',
//             'YY1_WNInvoice_SD_SDI',
//             'YY1_PurchasingDoc_SD_SDI',
//             'YY1_CustomBillingType_SDI',
//             'YY1_ACA_RG_ONLY_SDI',
//           ])
//           .where({ SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] } })
//       ),
//       this.salesOrderAPI.executeQuery(
//         SELECT.from('A_SalesOrderHeaderPartner')
//           .columns([
//             'SalesOrder',
//             'Customer',
//             'AddressID',
//             'ReferenceBusinessPartner',
//             'PartnerFunction',
//             'Supplier',
//           ])
//           .where({
//             SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] },
//             PartnerFunction: { in: ['SH', 'ZV', 'ZR'] },
//           })
//       ),
//     ]);

//     if (!anySalesOrderErr?.message && aSalesOrders.length) {
//       aSalesOrders.forEach((oSalesOrder) => mSalesOrder.set(oSalesOrder.SalesOrder, oSalesOrder));
//     }

//     if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
//       aSalesOrderItems.forEach((oSalesOrderItem) => {
//         if (!mSalesOrderItem.has(oSalesOrderItem.SalesOrder)) {
//           mSalesOrderItem.set(oSalesOrderItem.SalesOrder, []);
//         }
//         mSalesOrderItem.get(oSalesOrderItem.SalesOrder).push(oSalesOrderItem);
//       });
//     }

//     if (!anySalesOrderPartnerErr?.message && aSalesOrderPartners.length) {
//       aSalesOrderPartners.forEach((oSalesOrderPartner) => {
//         if (!mSalesOrderPartner.has(oSalesOrderPartner.SalesOrder)) {
//           mSalesOrderPartner.set(oSalesOrderPartner.SalesOrder, []);
//         }
//         mSalesOrderPartner.get(oSalesOrderPartner.SalesOrder).push(oSalesOrderPartner);
//         if (oSalesOrderPartner.PartnerFunction === 'SH') {
//           aBusinessPartnerAddressWhere.push(oSalesOrderPartner.ReferenceBusinessPartner);
//         }
//       });
//     }
//   } catch (err) {
//     this.LOG._error && this.LOG.error(err.message);
//   }

//   try {
//     const [{ reason: anyBusinessPartnerErr, value: aBusinessPartners }] =
//       await Promise.allSettled([
//         this.businesPartnerAPI.executeQuery(
//           SELECT.from('A_BusinessPartnerAddress')
//             .columns([
//               'BusinessPartner',
//               'Language',
//               'HouseNumber',
//               'StreetName',
//               'CityName',
//               'PostalCode',
//               'Country',
//               'Region',
//               'TaxJurisdiction',
//             ])
//             .where({ BusinessPartner: { in: [...new Set(aBusinessPartnerAddressWhere)] } })
//         ),
//       ]);

//     if (!anyBusinessPartnerErr?.message && aBusinessPartners.length) {
//       aBusinessPartners.forEach((oBusinessPartner) =>
//         mBusinessPartner.set(oBusinessPartner.BusinessPartner, oBusinessPartner)
//       );
//     }
//   } catch (err) {
//     this.LOG._error && this.LOG.error(err.message);
//   }

//   let mPayloadMap = new Map();

//   for (const oRecord of aRecordsForProcessing) {
//     const aErrors = [];

//     let oSalesOrder, oSalesOrderItems, deliveryAddress;

//     if (oRecord.PORequiredSAP === '2') {
//       oSalesOrder = mSalesOrder.get(oRecord.salesOrderICSAP);
//       oSalesOrderItems = mSalesOrderItem.get(oRecord.salesOrderICSAP) || [];
//     } else {
//       oSalesOrder = mSalesOrder.get(oRecord.salesDocumentNoSAP);
//       oSalesOrderItems = mSalesOrderItem.get(oRecord.salesDocumentNoSAP) || [];
//     }

//     const firstSOItem = oSalesOrderItems.find(
//       (item) => item.SalesOrderItem === '10' && item.SalesOrderItemCategory === 'TADN'
//     );
//     const lastSOItem = oSalesOrderItems.reduce(
//       (maxItem, current) =>
//         Number(current.SalesOrderItem) > Number(maxItem.SalesOrderItem) ? current : maxItem,
//       { SalesOrderItem: '00000' }
//     );

//     // if missing required base item, stop
//     if (!firstSOItem) {
//       aErrors.push({
//         record_ID: oRecord.ID,
//         message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM10_NOT_FOUND'),
//       });
//       aFailedRecordIDs.push(oRecord.ID);
//       aErrorLogs.push(...aErrors);
//       continue;
//     }

//     const duplicateCheck =
//       oSalesOrderItems.filter(
//         (item) => item.YY1_WNInvoice_SD_SDI === oRecord.wnInvoiceNo && item.SalesOrderItem !== oRecord.salesItemNoSAP
//       ) ?? [];

//     // >>> use partners from the **chosen** SO <<<
//     const oSalesOrderPartnerList = mSalesOrderPartner.get(oSalesOrder?.SalesOrder) || [];
//     const oSalesOrderPartnerSH = oSalesOrderPartnerList.find((p) => p.PartnerFunction === 'SH');
//     const oBusinessPartner = mBusinessPartner.get(oSalesOrderPartnerSH?.ReferenceBusinessPartner);

//     const conditionType = await determineConditionType({
//       customer: oSalesOrder.SoldToParty,
//       salesOrganization: oSalesOrder.SalesOrganization,
//       distributionChannel: oSalesOrder.DistributionChannel,
//       division: oSalesOrder.OrganizationDivision,
//     });

//     if (!oRecord.purchaseDocumentNoSAP) {
//       aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_PURCHASE_ORDER_MISSING') });
//       aFailedRecordIDs.push(oRecord.ID);
//       aErrorLogs.push(...aErrors);
//       continue;
//     }

//     if (!oSalesOrder?.SalesOrder) {
//       aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST') });
//       aFailedRecordIDs.push(oRecord.ID);
//       aErrorLogs.push(...aErrors);
//       continue;
//     }

//     if (oSalesOrder.YY1_CustomSalesOrder_SDH !== 'ZWMS') {
//       aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SALES_ORDER_TYPE') });
//       aFailedRecordIDs.push(oRecord.ID);
//       aErrorLogs.push(...aErrors);
//       continue;
//     }

//     if (!firstSOItem.WBSElement) {
//       aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING') });
//       aFailedRecordIDs.push(oRecord.ID);
//       aErrorLogs.push(...aErrors);
//       continue;
//     }

//     if (!oSalesOrderPartnerSH?.Customer) {
//       aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SHIP_TO_ADDRESS_NOT_FOUND') });
//       aFailedRecordIDs.push(oRecord.ID);
//       aErrorLogs.push(...aErrors);
//       continue;
//     } else {
//       deliveryAddress = {
//         PurchaseOrder: firstSOItem.YY1_PurchasingDoc_SD_SDI,
//         PurchaseOrderItem: lastSOItem.SalesOrderItem,
//         DeliveryAddressID: oSalesOrderPartnerSH.AddressID,
//       };
//     }

//     const oItemPayload = this._prepareDataForPurchaseOrderUpdate({
//       record: oRecord,
//       salesOrder: oSalesOrder,
//       firstSOItem: firstSOItem,
//       lastSOItem: lastSOItem,
//       businessPartnerSH: oSalesOrderPartnerSH,
//       deliveryAddress: deliveryAddress,
//       conditionType: conditionType,
//       duplicateCheck: duplicateCheck,
//       businessPartner: oBusinessPartner,
//     });

//     const oPurchaseOrderItemResults = await this.PurchaseOrderAPI.createPurchaseOrderItem(
//       firstSOItem.YY1_PurchasingDoc_SD_SDI,
//       oItemPayload
//     );

//     if (oPurchaseOrderItemResults.error) {
//       aErrorLogs.push({ record_ID: oRecord.ID, message: `${oPurchaseOrderItemResults.error}` });
//       aFailedRecordIDs.push(oRecord.ID);
//       LOG.error(`Error processing record ID ${oRecord.ID}: ${oPurchaseOrderItemResults.error}`);
//       continue;
//     } else {
//       mPayloadMap.set(oRecord.ID, {
//         purchaseDocumentNoSAP: oPurchaseOrderItemResults.value.PurchaseOrder,
//         purchaseDocumentItemSAP: oRecord.salesItemNoSAP,
//       });
//       oRecord.purchaseDocumentNoSAP = oPurchaseOrderItemResults.value.PurchaseOrder;
//       oRecord.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;

//       const item = this.records.find((record) => record.ID === oRecord.ID);
//       if (item) {
//         item.purchaseDocumentNoSAP = oPurchaseOrderItemResults.value.PurchaseOrder;
//         item.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;
//       }

//       aPassedRecordIDs.push(oRecord.ID);

//       // >>> fix WHERE to use the concrete item number <<<
//       await this.salesOrderAPI.executeQuery(
//         UPDATE('A_SalesOrderItem')
//           .set({ YY1_PurchasingDoc_SD_SDI: oPurchaseOrderItemResults.value.PurchaseOrder })
//           .where({
//             SalesOrder: oSalesOrder.SalesOrder,
//             SalesOrderItem: oRecord.salesItemNoSAP,
//           })
//       );
//     }
//   }

//   if (aErrorLogs.length) {
//     await ProcessLogger.addLogs(aErrorLogs);
//     await UPDATE(Bonus).set({ valid: false, processLevel_code: sProcessCode }).where({ ID: { in: aFailedRecordIDs } });
//   }

//   this.records.forEach((oRecord) => {
//     const oMapEntry = mPayloadMap?.get(oRecord.ID);
//     if (oMapEntry) {
//       oRecord.purchaseDocumentNoSAP = oMapEntry?.purchaseDocumentNoSAP;
//       oRecord.purchaseDocumentItemSAP = oMapEntry?.purchaseDocumentItemSAP;
//     }
//   });

//   const aRecordsToUpdate = this.records.flatMap((oRecord) => {
//     const oMapEntry = mPayloadMap?.get(oRecord.ID);
//     return oMapEntry && oMapEntry?.purchaseDocumentNoSAP
//       ? [
//           {
//             ID: oRecord.ID,
//             purchaseDocumentNoSAP: oMapEntry?.purchaseDocumentNoSAP,
//             purchaseDocumentItemSAP: oMapEntry?.purchaseDocumentItemSAP,
//           },
//         ]
//       : [];
//   });

//   if (aRecordsToUpdate.length) {
//     await Promise.all(
//       aRecordsToUpdate.map((oRecord) => {
//         const iRecordIndex = mProcessingRecordsToCentralMapping.get(oRecord.ID);
//         this.records[iRecordIndex].purchaseDocumentNoSAP = oRecord.purchaseDocumentNoSAP;
//         this.records[iRecordIndex].purchaseDocumentItemSAP = oRecord.purchaseDocumentItemSAP;
//         return UPDATE(Bonus)
//           .set({
//             purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP,
//             purchaseDocumentItemSAP: oRecord.purchaseDocumentItemSAP,
//           })
//           .where({ ID: oRecord.ID });
//       })
//     );
//   }

//   if (aPassedRecordIDs.length) {
//     await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
//     await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
//   }

//   if (aFailedRecordIDs.length) {
//     await Promise.allSettled([this.markRecordsValid(sProcessCode, aFailedRecordIDs, false)]);
//   }

//   this.updateExclusionSet({
//     passed: aPassedRecordIDs,
//     failed: aFailedRecordIDs,
//     skipped: aSkippedRecords,
//     bBreakExecution,
//   });

//   return { hasError: aFailedRecordIDs.length > 0, continue: aFailedRecordIDs.length === 0 };
// }

/*** Step 5: Create / Update PO ***/
async processPurchaseOrder(sProcessCode, bBreakExecution) {
  const aRecordsForProcessing = [],
    aErrorLogs = [],
    aFailedRecordIDs = [],
    aPassedRecordIDs = [],
    aSkippedRecords = [];

  let aRecordIDs = [],
    aSalesDocumentNoWhere = [],
    aSalesDocumentItemNOWhere = [],
    aBusinessPartnerAddressWhere = [];

  let mSalesOrder = new Map(),          // SO headers
    mSalesOrderItem = new Map(),        // SO items
    mSalesOrderPartner = new Map(),     // SO partners
    mBusinessPartner = new Map(),       // BP addresses (Ship-To)
    mProcessingRecordsToCentralMapping = new Map();

  // ---------- collect ----------
  for (const [iRecordIndex, record] of this.records.entries()) {
    if (this.shouldRecordProcess(record, sProcessCode) && record.PORequiredSAP) {
      aRecordsForProcessing.push({ ...record });
      mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
      aRecordIDs.push(record.ID);
    } else {
      if (record.PORequiredSAP === '' || !record.PORequiredSAP) {
        await this.markRecordsValid(sProcessCode, [record.ID], true);
        continue;
      } else {
        aSkippedRecords.push({ ...record });
        continue;
      }
    }

    if (record.PORequiredSAP === '2') {
      aSalesDocumentNoWhere.push(record.salesOrderICSAP);
      aSalesDocumentItemNOWhere.push(record.salesItemNoICSAP);
    } else {
      aSalesDocumentNoWhere.push(record.salesDocumentNoSAP);
      aSalesDocumentItemNOWhere.push(record.salesItemNoSAP);
    }
  }

  await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);
  this.updateProcessingState(sProcessCode);

  if (!aRecordsForProcessing.length) {
    return { hasError: false, continue: true };
  }

  // ---------- read refs ----------
  try {
    const [
      { reason: anySalesOrderErr, value: aSalesOrders },
      { reason: anySalesOrderItemErr, value: aSalesOrderItems },
      { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
    ] = await Promise.allSettled([
      this.salesOrderAPI.executeQuery(
        SELECT.from('A_SalesOrder')
          .columns([
            'SalesOrder','SalesOrderType','SalesOrganization','DistributionChannel','TransactionCurrency',
            'TaxDepartureCountry','SoldToParty','OrganizationDivision','YY1_CustomSalesOrder_SDH'
          ])
          .where({ SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] } })
      ),
      this.salesOrderAPI.executeQuery(
        SELECT.from('A_SalesOrderItem')
          .columns([
            'SalesOrder','SalesOrderItem','SalesOrderItemCategory','SalesOrderItemText',
            'Material','PricingDate','RequestedQuantity','OrderQuantityUnit',
            'ProductionPlant','TransactionCurrency','WBSElement',
            'YY1_WeekEnd_SD_SDI','YY1_WNInvoice_SD_SDI','YY1_WNWorkOrder_SD_SDI',
            'YY1_PurchasingDoc_SD_SDI','YY1_CustomBillingType_SDI'
          ])
          .where({ SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] } })
      ),
      this.salesOrderAPI.executeQuery(
        SELECT.from('A_SalesOrderHeaderPartner')
          .columns(['SalesOrder','Customer','AddressID','ReferenceBusinessPartner','PartnerFunction','Supplier'])
          .where({
            SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] },
            PartnerFunction: { in: ['SH','ZV','ZR'] }
          })
      ),
    ]);

    if (!anySalesOrderErr?.message && Array.isArray(aSalesOrders)) {
      aSalesOrders.forEach(h => mSalesOrder.set(h.SalesOrder, h));
    }
    if (!anySalesOrderItemErr?.message && Array.isArray(aSalesOrderItems)) {
      aSalesOrderItems.forEach(it => {
        if (!mSalesOrderItem.has(it.SalesOrder)) mSalesOrderItem.set(it.SalesOrder, []);
        mSalesOrderItem.get(it.SalesOrder).push(it);
      });
    }
    if (!anySalesOrderPartnerErr?.message && Array.isArray(aSalesOrderPartners)) {
      aSalesOrderPartners.forEach(p => {
        if (!mSalesOrderPartner.has(p.SalesOrder)) mSalesOrderPartner.set(p.SalesOrder, []);
        mSalesOrderPartner.get(p.SalesOrder).push(p);
        if (p.PartnerFunction === 'SH') aBusinessPartnerAddressWhere.push(p.ReferenceBusinessPartner);
      });
    }
  } catch (err) {
    this.LOG._error && this.LOG.error(err.message);
  }

  try {
    const [{ reason: anyBusinessPartnerErr, value: aBusinessPartners }] =
      await Promise.allSettled([
        this.businesPartnerAPI.executeQuery(
          SELECT.from('A_BusinessPartnerAddress')
            .columns([
              'BusinessPartner','Language','HouseNumber','StreetName','CityName',
              'PostalCode','Country','Region','TaxJurisdiction'
            ])
            .where({ BusinessPartner: { in: [...new Set(aBusinessPartnerAddressWhere)] } })
        )
      ]);

    if (!anyBusinessPartnerErr?.message && Array.isArray(aBusinessPartners)) {
      aBusinessPartners.forEach(a => mBusinessPartner.set(a.BusinessPartner, a));
    }
  } catch (err) {
    this.LOG._error && this.LOG.error(err.message);
  }

  // ---------- create PO items ----------
  const mPayloadMap = new Map();

  for (const oRecord of aRecordsForProcessing) {
    const aErrors = [];

    // choose the correct SO
    const soNumber = oRecord.PORequiredSAP === '2' ? oRecord.salesOrderICSAP : oRecord.salesDocumentNoSAP;
    const soItems = mSalesOrderItem.get(soNumber) || [];
    const so = mSalesOrder.get(soNumber);

    // defensive: item 10 must exist
    const firstSOItem = soItems.find(i => i.SalesOrderItem === '10' && i.SalesOrderItemCategory === 'TADN');
    const lastSOItem = soItems.reduce(
      (max, cur) => Number(cur.SalesOrderItem) > Number(max.SalesOrderItem) ? cur : max,
      { SalesOrderItem: '00000' }
    );

    if (!oRecord.purchaseDocumentNoSAP) {
      aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_PURCHASE_ORDER_MISSING') });
    }
    if (!so?.SalesOrder) {
      aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST') });
    }
    if (so?.YY1_CustomSalesOrder_SDH !== 'ZWMS') {
      aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SALES_ORDER_TYPE') });
    }
    if (!firstSOItem?.WBSElement) {
      aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING') });
    }

    // partner / delivery
    const partners = mSalesOrderPartner.get(soNumber) || [];
    const pfSH = partners.find(p => p.PartnerFunction === 'SH');
    const bpAddr = mBusinessPartner.get(pfSH?.ReferenceBusinessPartner);

    if (!pfSH?.Customer) {
      aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_SHIP_TO_ADDRESS_NOT_FOUND') });
    }

    if (aErrors.length) {
      aFailedRecordIDs.push(oRecord.ID);
      aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
      aErrorLogs.push(...aErrors);
      continue;
    }

    const duplicateCheck =
      soItems.filter(i => i.YY1_WNInvoice_SD_SDI === oRecord.wnInvoiceNo && i.SalesOrderItem !== oRecord.salesItemNoSAP) ?? [];

    const conditionType = await determineConditionType({
      customer: so.SoldToParty,
      salesOrganization: so.SalesOrganization,
      distributionChannel: so.DistributionChannel,
      division: so.OrganizationDivision
    });

    // build payload for communicator
    const deliveryAddress = {
      PurchaseOrder: firstSOItem.YY1_PurchasingDoc_SD_SDI,
      PurchaseOrderItem: lastSOItem.SalesOrderItem,
      DeliveryAddressID: pfSH.AddressID
    };

    const oItemPayload = this._prepareDataForPurchaseOrderUpdate({
      record: oRecord,
      salesOrder: so,
      firstSOItem,
      lastSOItem,
      businessPartnerSH: bpAddr, // NOTE: method uses some fields directly from businessPartnerSH if DeliveryAddressID missing
      deliveryAddress,
      conditionType,
      duplicateCheck,
      businessPartner: bpAddr
    });

    // communicator call — fully guarded
    let oPurchaseOrderItemResults;
    try {
      oPurchaseOrderItemResults = await this.PurchaseOrderAPI.createPurchaseOrderItem(
        firstSOItem.YY1_PurchasingDoc_SD_SDI,
        oItemPayload
      );
    } catch (e) {
      oPurchaseOrderItemResults = { error: e.message };
    }

    if (oPurchaseOrderItemResults?.error) {
      aFailedRecordIDs.push(oRecord.ID);
      aErrorLogs.push({ record_ID: oRecord.ID, message: `${oPurchaseOrderItemResults.error}`, process_code: sProcessCode });
      this.LOG._error && this.LOG.error(`PO item create failed for record ${oRecord.ID}: ${oPurchaseOrderItemResults.error}`);
      continue;
    }

    // success path
    const createdPO = oPurchaseOrderItemResults?.value?.PurchaseOrder
      ?? oPurchaseOrderItemResults?.PurchaseOrder
      ?? oRecord.purchaseDocumentNoSAP; // keep at least existing header

    mPayloadMap.set(oRecord.ID, {
      purchaseDocumentNoSAP: createdPO,
      purchaseDocumentItemSAP: oRecord.salesItemNoSAP
    });

    oRecord.purchaseDocumentNoSAP = createdPO;
    oRecord.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;

    const found = this.records.find(r => r.ID === oRecord.ID);
    if (found) {
      found.purchaseDocumentNoSAP = createdPO;
      found.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;
    }

    aPassedRecordIDs.push(oRecord.ID);

    // update SO item with PO number — only if we have an item number
    if (oRecord.salesItemNoSAP) {
      try {
        await this.salesOrderAPI.executeQuery(
          UPDATE('A_SalesOrderItem')
            .set({ YY1_PurchasingDoc_SD_SDI: createdPO })
            .where({
              SalesOrder: so.SalesOrder,
              SalesOrderItem: oRecord.salesItemNoSAP
            })
        );
      } catch (e) {
        // don't fail the whole record for this non-critical update
        this.LOG._error && this.LOG.error(`Failed to patch SO item with PO: ${e.message}`);
      }
    }
  }

  // ---------- write errors / updates ----------
  if (aErrorLogs.length) {
    await ProcessLogger.addLogs(aErrorLogs);
    await UPDATE(Bonus)
      .set({ valid: false, processLevel_code: sProcessCode })
      .where({ ID: { in: aFailedRecordIDs } });
  }

  // sync fields back
  this.records.forEach((r) => {
    const m = mPayloadMap.get(r.ID);
    if (m) {
      r.purchaseDocumentNoSAP = m.purchaseDocumentNoSAP;
      r.purchaseDocumentItemSAP = m.purchaseDocumentItemSAP;
    }
  });

  const aRecordsToUpdate = this.records.flatMap((r) => {
    const m = mPayloadMap.get(r.ID);
    return m && m.purchaseDocumentNoSAP
      ? [{ ID: r.ID, purchaseDocumentNoSAP: m.purchaseDocumentNoSAP, purchaseDocumentItemSAP: m.purchaseDocumentItemSAP }]
      : [];
  });

  if (aRecordsToUpdate.length) {
    await Promise.all(
      aRecordsToUpdate.map((r) => {
        const idx = mProcessingRecordsToCentralMapping.get(r.ID);
        this.records[idx].purchaseDocumentNoSAP = r.purchaseDocumentNoSAP;
        this.records[idx].purchaseDocumentItemSAP = r.purchaseDocumentItemSAP;
        return UPDATE(Bonus)
          .set({
            purchaseDocumentNoSAP: r.purchaseDocumentNoSAP,
            purchaseDocumentItemSAP: r.purchaseDocumentItemSAP
          })
          .where({ ID: r.ID });
      })
    );
  }

  if (aPassedRecordIDs.length) {
    await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
    await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
    await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
  }

  if (aFailedRecordIDs.length) {
    await Promise.allSettled([ this.markRecordsValid(sProcessCode, aFailedRecordIDs, false) ]);
  }

  // exclusion + final result — if any failed, STOP the pipeline
  this.updateExclusionSet({
    passed: aPassedRecordIDs,
    failed: aFailedRecordIDs,
    skipped: aSkippedRecords,
    bBreakExecution
  });

  return {
    hasError: aFailedRecordIDs.length > 0,
    continue: aFailedRecordIDs.length === 0
  };
}



    _prepareDataForPurchaseOrderUpdate({
        record,
        salesOrder,
        firstSOItem,
        lastSOItem,
        businessPartnerSH,
        deliveryAddress,
        conditionType,
        duplicateCheck,
        businessPartner
    }) {
        const oReturnData = {
            PurchaseOrder: firstSOItem.YY1_PurchasingDoc_SD_SDI,
            PurchaseOrderItem: record.salesItemNoSAP,
            PurchaseOrderCategory: 'F',
            CompanyCode: salesOrder.SalesOrganization,
            Material: firstSOItem.Material,
            PurchaseOrderItemText: 'BONUS',
            Plant: firstSOItem.ProductionPlant,
            PurchaseOrderQuantityUnit: firstSOItem.OrderQuantityUnit,
            OrderQuantity: 1,
            NetPriceQuantity: 1,
            OrderPriceUnit: firstSOItem.OrderQuantityUnit,
            DocumentCurrency: salesOrder.TransactionCurrency,
            NetPriceAmount: Number(record.vendorPayRate),
            TaxCode: 'I0',          // Temp I0 will HardCode as per the discussion
            TaxJurisdiction: businessPartner.TaxJurisdiction,
            AccountAssignmentCategory: 'Z',
            YY1_SDDocumentPD_PDI: record.salesDocumentNoSAP,
            YY1_WNWorkOrder_PDI: lastSOItem.YY1_WNWorkOrder_SD_SDI,
            // YY1_CommodityCode_PDI: lastSOItem.YY1_CommodityCode_SD_SDI,
            // YY1_CategoryCode_PDI: lastSOItem.YY1_CategoryCode_SD_SDI,
            // YY1_CostCenter_PDI: lastSOItem.YY1_WNWorkOrder_SD_SDI,
            YY1_SupplierInvoiceNum_PDI: lastSOItem.YY1_SupplierInvoice_SD_SDI,
            YY1_WeekEnd_PDI: lastSOItem.YY1_WeekEnd_SD_SDI,
            YY1_WNInvoice_PDI: record.wnInvoiceNo,       //  will activate post added in API
            _PurOrdAccountAssignment: [{
                PurchaseOrderItem: record.salesItemNoSAP,
                AccountAssignmentNumber: '1',
                GLAccount: '',
                ControllingArea: 'A000',
                WBSElementExternalID: lastSOItem.WBSElement,
                Quantity: Number(lastSOItem.RequestedQuantity),
                OrderQuantityUnit: lastSOItem.OrderQuantityUnit,
                DocumentCurrency: salesOrder.TransactionCurrency,
                PurgDocNetAmount: Number(record.vendorPayRate)
            }]
            // _PurOrdPricingElement: [{
            //     ConditionType: conditionType,
            //     ConditionRateAmount: Number(record.vendorPayRate)
            // }]
        }

        if (deliveryAddress.DeliveryAddressID) {
            oReturnData._DeliveryAddress = deliveryAddress;
        } else {
            oReturnData._DeliveryAddress = {
                PurchaseOrder: salesOrder.YY1_PurchasingDoc_SD_SDI,
                PurchaseOrderItem: record.salesItemNoSAP,
                CorrespondenceLanguage: businessPartnerSH.Language,
                HouseNumber: businessPartnerSH.HouseNumber,
                StreetName: businessPartnerSH.StreetName,
                CityName: businessPartnerSH.CityName,
                PostalCode: businessPartnerSH.PostalCode,
                Country: businessPartnerSH.Country,
                Region: businessPartnerSH.Region
            }
        }

        if (['ZWMS'].includes(salesOrder.YY1_CustomSalesOrder_SDH) && salesOrder.DistributionChannel !== 'IC') {
            oReturnData._PurOrdAccountAssignment[0].GLAccount = '0000540110';
        } else if (['ZWMS'].includes(salesOrder.YY1_CustomSalesOrder_SDH) && salesOrder.DistributionChannel === 'IC') {
            oReturnData._PurOrdAccountAssignment[0].GLAccount = '0000588000';
        }

        if (duplicateCheck.length > 0) {
            oReturnData.YY1_DuplicateWeek_PDI = 'X'
        }

        return oReturnData;
    }

    // /*** Step B: MIRO (Incoming Invoice) creation ***/
    // async processSupplierInvoice(sProcessCode, bBreakExecution) {
    //     const aRecordsForProcessing = [],
    //         aSkippedRecords = [],
    //         aErrorLogs = [],
    //         aPassedRecordIDs = [],
    //         aFailedRecordIDs = [];

    //     let aRecordIDs = [],
    //         aPurchaseOrderWhere = [],
    //         aPurchaseOrderItemWhere = [],
    //         aSalesOrderWhere = [],
    //         aEmpCustInfoWhere = [];

    //     let mPurchaseOrder = new Map(),     // Map for PurchaseOrder
    //         mPurchaseOrderItem = new Map(), // Map for PurchaseOrderItem
    //         mSalesOrder = new Map(),        // Map for SaleOrder
    //         mSalesOrderLastItem = new Map(),    // Map for SalesOrderLastItem
    //         mSalesOrderLastFirstItem = new Map(),    // Map for SalesOrderFirstItem
    //         mEmpCustInfo = new Map();       // Map for EmpCustInfo 

    //     for (const record of this.records) {
    //         if (this.shouldRecordProcess(record, sProcessCode) && record.PORequiredSAP) {
    //             // If record is on step level & is already valid, then skip
    //             aRecordsForProcessing.push({ ...record });
    //             aRecordIDs.push(record.ID);
    //         } else {
    //             if (record.PORequiredSAP === '' || !record.PORequiredSAP) {
    //                 await this.markRecordsValid(sProcessCode, [record.ID], true);
    //                 continue;
    //             } else {
    //                 aSkippedRecords.push({ ...record });
    //                 continue;
    //             }
    //         }

    //         if (record.purchaseDocumentNoSAP) {
    //             aPurchaseOrderWhere.push(record.purchaseDocumentNoSAP);
    //         }

    //         if (record.purchaseDocumentItemSAP) {
    //             aPurchaseOrderItemWhere.push(record.purchaseDocumentItemSAP);
    //         }

    //         if (record.sapEmployeeNo) {
    //             aEmpCustInfoWhere.push(record.sapEmployeeNo);
    //         }
    //     }

    //     await ProcessLogger.removeLogs(aRecordIDs);

    //     this.updateProcessingState(sProcessCode);
    //     if (!aRecordsForProcessing.length) {
    //         // If Step doesn't need to be processed, simply return to avoid costly calls
    //         return {
    //             hasError: false,
    //             continue: true,
    //         };
    //     }

    //     try {
    //         const [
    //             { reason: anyPurchaseOrderErr, value: aPurchaseOrders },
    //             { reason: anyPurchaseOrderItemErr, value: aPurchaseOrderItems },
    //             { reason: anySalesOrderLastItemErr, value: aSalesOrderLastItems },
    //             { reason: anySalesOrderFirstItemErr, value: aSalesOrderFirstItems },
    //         ] = await Promise.allSettled([
    //             this.PurchaseOrderAPI.executeQuery(
    //                 SELECT.from('PurchaseOrder')
    //                     .columns(['PurchaseOrder', 'DocumentCurrency', 'Supplier'])
    //                     .where({
    //                         PurchaseOrder: { in: [...new Set(aPurchaseOrderWhere)] }
    //                     })
    //             ),

    //             this.PurchaseOrderAPI.executeQuery(
    //                 SELECT.from('PurchaseOrderItem')
    //                     .columns(['PurchaseOrder', 'PurchaseOrderItem', 'OrderQuantity', 'NetPriceAmount',
    //                         'TaxCode', 'TaxJurisdiction', 'Plant', 'CompanyCode',
    //                         'PurchaseOrderQuantityUnit', 'Material'])
    //                     .where({
    //                         PurchaseOrder: { in: [...new Set(aPurchaseOrderWhere)] },
    //                         PurchaseOrderItem: { in: [...new Set(aPurchaseOrderItemWhere)] }
    //                     })
    //             ),

    //             this.salesOrderAPI.executeQuery(
    //                 SELECT.from('A_SalesOrderItem')
    //                     .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI', 'YY1_WNInvoice_SD_SDI',
    //                         'YY1_WNWorkOrder_SD_SDI'
    //                     ])
    //                     .where({
    //                         YY1_PurchasingDoc_SD_SDI: { in: [...new Set(aPurchaseOrderWhere)] },
    //                         SalesOrderItem: { in: [...new Set(aPurchaseOrderItemWhere)] },
    //                     })
    //             ),

    //             this.salesOrderAPI.executeQuery(
    //                 SELECT.from('A_SalesOrderItem')
    //                     .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI', 'YY1_WNInvoice_SD_SDI',
    //                         'YY1_WNWorkOrder_SD_SDI'
    //                     ])
    //                     .where({
    //                         YY1_PurchasingDoc_SD_SDI: { in: [...new Set(aPurchaseOrderWhere)] },
    //                         SalesOrderItem: '10',
    //                     })
    //             ),
    //         ]);

    //         if (!anyPurchaseOrderErr?.message && aPurchaseOrders.length) {
    //             aPurchaseOrders.forEach((oPurchaseOrder) =>
    //                 mPurchaseOrder.set(oPurchaseOrder.PurchaseOrder, oPurchaseOrder)
    //             );
    //         }

    //         if (!anyPurchaseOrderItemErr?.message && aPurchaseOrderItems.length) {
    //             aPurchaseOrderItems.forEach((oPurchaseOrderItem) => {
    //                 mPurchaseOrderItem.set(oPurchaseOrderItem.PurchaseOrder, oPurchaseOrderItem);
    //             });
    //         }

    //         if (!anySalesOrderLastItemErr?.message && aSalesOrderLastItems.length) {
    //             aSalesOrderLastItems.forEach((oSalesOrderItem) => {
    //                 mSalesOrderLastItem.set(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI, oSalesOrderItem);
    //                 aSalesOrderWhere.push(oSalesOrderItem.SalesOrder);
    //             });
    //         }

    //         if (!anySalesOrderFirstItemErr?.message && aSalesOrderFirstItems.length) {
    //             aSalesOrderFirstItems.forEach((oSalesOrderItem) => {
    //                 mSalesOrderLastFirstItem.set(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI, oSalesOrderItem);
    //                 if (!aSalesOrderWhere.includes(oSalesOrderItem.SalesOrder)) {
    //                     aSalesOrderWhere.push(oSalesOrderItem.SalesOrder);
    //                 }
    //             });
    //         }
    //     } catch (err) {
    //         this.LOG._error && this.LOG.error(err.message);
    //     }

    //     try {
    //         const [
    //             { reason: anySalesOrderErr, value: aSalesOrders },
    //             { reason: anyEmpCustInfoErr, value: aEmpCustInfos },
    //         ] = await Promise.allSettled([
    //             this.salesOrderAPI.executeQuery(
    //                 SELECT.from('A_SalesOrder')
    //                     .columns(['SalesOrder', 'SalesOrganization', 'DistributionChannel', 'OrganizationDivision',
    //                         'YY1_AlphanumericSalesO_SDH'
    //                     ])
    //                     .where({
    //                         SalesOrder: { in: [...new Set(aSalesOrderWhere)] },
    //                     })
    //             ),

    //             this.empCustInfoAPI.executeQuery(
    //                 SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
    //                     .columns(['Name', 'FirstName', 'MiddleName', 'WORKER_ID'])
    //                     .where({
    //                         WORKER_ID: { in: [...new Set(aEmpCustInfoWhere)] },
    //                     })
    //             ),
    //         ]);

    //         if (!anySalesOrderErr?.message && aSalesOrders.length) {
    //             aSalesOrders.forEach((oSalesOrder) => {
    //                 mSalesOrder.set(oSalesOrder.SalesOrder, oSalesOrder);
    //             });
    //         }

    //         if (!anyEmpCustInfoErr?.message && aEmpCustInfos.length) {
    //             aEmpCustInfos.forEach((oEmpCustInfo) => {
    //                 mEmpCustInfo.set(oEmpCustInfo.WORKER_ID, oEmpCustInfo);
    //             });
    //         }
    //     } catch (err) {
    //         this.LOG._error && this.LOG.error(err.message);
    //     }

    //     try {
    //         for (const oRecord of aRecordsForProcessing) {
    //             const oPurchaseOrder = mPurchaseOrder.get(oRecord.purchaseDocumentNoSAP);
    //             const oPurchaseOrderItem = mPurchaseOrderItem.get(oRecord.purchaseDocumentNoSAP);
    //             const oEmpCustInfo = mEmpCustInfo.get(oRecord.sapEmployeeNo);

    //             if (!oEmpCustInfo) {
    //                 aErrors.push({
    //                     record_ID: oRecord.ID,
    //                     message: cds.i18n.messages.at('ERR_EMP_NO_MISSING_INFOTYPE'),
    //                 });
    //                 aFailedRecordIDs.push(oRecord.ID);
    //                 aErrorLogs.push(...aErrors);
    //                 continue; // Skip this record
    //             }

    //             let paymentBlockingReason;
    //             try {
    //                 const lfa1Row = await this.supplierLFA1API.executeQuery(
    //                     SELECT.one
    //                         .from('YY1_Supplier_LFA1') // entity set per S/4: .../YY1_SUPPLIER_LFA1_CDS/YY1_Supplier_LFA1
    //                         .columns(['Supplier', 'SupplierStandardCarrierAccess'])
    //                         .where({ Supplier: oPurchaseOrder?.Supplier })
    //                 );
    //                 const carrier = lfa1Row?.SupplierStandardCarrierAccess;
    //                 paymentBlockingReason = carrier ? String(carrier).trim().slice(0, 2).toUpperCase() : undefined;
    //             } catch (e) {
    //                 LOG.error(`[Bonus_G][MIRO] Supplier LFA1 lookup failed for ${oPurchaseOrder?.Supplier}: ${e.message}`);
    //             }

    //             const oPayload = this._prepareDataForSupplierInvoiceCreate({
    //                 record: oRecord,
    //                 purchaseOrder: oPurchaseOrder,
    //                 purchaseOrderItem: oPurchaseOrderItem,
    //                 paymentBlockingReason
    //             });



    //             let result = await this.supplierInvoiceAPI.createSupplierInvoice(oPayload);

    //             if (result.SupplierInvoice) {
    //                 oRecord.invoiceDocumentNoSAP = result.SupplierInvoice;
    //                 oRecord.fiscalYearSAP = result.FiscalYear;

    //                 const item = this.records.find((record) => record.ID === oRecord.ID);
    //                 if (item) {
    //                     item.invoiceDocumentNoSAP = result.SupplierInvoice;
    //                     item.fiscalYearSAP = result.FiscalYear;
    //                 }

    //                 await UPDATE(Bonus)
    //                     .set({
    //                         invoiceDocumentNoSAP: result.SupplierInvoice,
    //                         fiscalYearSAP: result.FiscalYear,
    //                         valid: true,
    //                         processLevel_code: sProcessCode,
    //                     })
    //                     .where({ ID: oRecord.ID });
    //                 aPassedRecordIDs.push(oRecord.ID);
    //             } else {
    //                 aErrorLogs.push({
    //                     record_ID: oRecord.ID,
    //                     message: `${result.error}`,
    //                 });
    //                 aFailedRecordIDs.push(oRecord.ID);
    //                 LOG.error(
    //                     `Error processing record ID ${oRecord.ID}: ${result.error}`,
    //                 );
    //             }
    //         }
    //     } catch (error) {
    //         LOG.error(`Critical error in processSupplierInvoice: ${error.message}`, { error });
    //     }

    //     if (aErrorLogs.length) {
    //         await ProcessLogger.addLogs(aErrorLogs);
    //         await UPDATE(Bonus)
    //             .set({ valid: false, processLevel_code: sProcessCode })
    //             .where({ ID: { in: aFailedRecordIDs } });
    //     }

    //     if (aPassedRecordIDs.length) {
    //         await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
    //     }

    //     this.updateExclusionSet({
    //         passed: aPassedRecordIDs,
    //         failed: aFailedRecordIDs,
    //         skipped: aSkippedRecords,
    //         bBreakExecution,
    //     });

    //     return {
    //         hasError: aFailedRecordIDs.length > 0,
    //         continue: aFailedRecordIDs.length === 0,
    //     };

    // }

    /*** Step B: MIRO (Incoming Invoice) creation ***/
async processSupplierInvoice(sProcessCode, bBreakExecution) {
  const aRecordsForProcessing = [],
    aSkippedRecords = [],
    aErrorLogs = [],
    aPassedRecordIDs = [],
    aFailedRecordIDs = [];

  let aRecordIDs = [],
    aPurchaseOrderWhere = [],
    aPurchaseOrderItemWhere = [],
    aSalesOrderWhere = [],
    aEmpCustInfoWhere = [];

  let mPurchaseOrder = new Map(),     // PO header
    mPurchaseOrderItem = new Map(),   // PO item (by PO number)
    mSalesOrder = new Map(),          // SO header
    mSalesOrderLastItem = new Map(),  // SO last item by PO
    mSalesOrderLastFirstItem = new Map(), // SO first item by PO
    mEmpCustInfo = new Map();         // Emp info

  // --- collect ---
  for (const record of this.records) {
    if (this.shouldRecordProcess(record, sProcessCode) && record.PORequiredSAP) {
      aRecordsForProcessing.push({ ...record });
      aRecordIDs.push(record.ID);
    } else {
      if (record.PORequiredSAP === '' || !record.PORequiredSAP) {
        await this.markRecordsValid(sProcessCode, [record.ID], true);
        continue;
      } else {
        aSkippedRecords.push({ ...record });
        continue;
      }
    }

    if (record.purchaseDocumentNoSAP) aPurchaseOrderWhere.push(record.purchaseDocumentNoSAP);
    if (record.purchaseDocumentItemSAP) aPurchaseOrderItemWhere.push(record.purchaseDocumentItemSAP);
    if (record.sapEmployeeNo) aEmpCustInfoWhere.push(record.sapEmployeeNo);
  }

  await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);

  this.updateProcessingState(sProcessCode);
  if (!aRecordsForProcessing.length) {
    return { hasError: false, continue: true };
  }

  // --- ref data fetch ---
  try {
    const [
      { reason: anyPurchaseOrderErr, value: aPurchaseOrders },
      { reason: anyPurchaseOrderItemErr, value: aPurchaseOrderItems },
      { reason: anySalesOrderLastItemErr, value: aSalesOrderLastItems },
      { reason: anySalesOrderFirstItemErr, value: aSalesOrderFirstItems },
    ] = await Promise.allSettled([
      this.PurchaseOrderAPI.executeQuery(
        SELECT.from('PurchaseOrder')
          .columns(['PurchaseOrder','DocumentCurrency','Supplier'])
          .where({ PurchaseOrder: { in: [...new Set(aPurchaseOrderWhere)] } })
      ),

      this.PurchaseOrderAPI.executeQuery(
        SELECT.from('PurchaseOrderItem')
          .columns([
            'PurchaseOrder','PurchaseOrderItem','OrderQuantity','NetPriceAmount',
            'TaxCode','TaxJurisdiction','Plant','CompanyCode',
            'PurchaseOrderQuantityUnit','Material'
          ])
          .where({
            PurchaseOrder: { in: [...new Set(aPurchaseOrderWhere)] },
            PurchaseOrderItem: { in: [...new Set(aPurchaseOrderItemWhere)] }
          })
      ),

      this.salesOrderAPI.executeQuery(
        SELECT.from('A_SalesOrderItem')
          .columns(['SalesOrder','SalesOrderItem','YY1_PurchasingDoc_SD_SDI','YY1_WNInvoice_SD_SDI','YY1_WNWorkOrder_SD_SDI'])
          .where({
            YY1_PurchasingDoc_SD_SDI: { in: [...new Set(aPurchaseOrderWhere)] },
            SalesOrderItem: { in: [...new Set(aPurchaseOrderItemWhere)] },
          })
      ),

      this.salesOrderAPI.executeQuery(
        SELECT.from('A_SalesOrderItem')
          .columns(['SalesOrder','SalesOrderItem','YY1_PurchasingDoc_SD_SDI','YY1_WNInvoice_SD_SDI','YY1_WNWorkOrder_SD_SDI'])
          .where({
            YY1_PurchasingDoc_SD_SDI: { in: [...new Set(aPurchaseOrderWhere)] },
            SalesOrderItem: '10',
          })
      ),
    ]);

    if (!anyPurchaseOrderErr?.message && Array.isArray(aPurchaseOrders)) {
      aPurchaseOrders.forEach(h => mPurchaseOrder.set(h.PurchaseOrder, h));
    }

    if (!anyPurchaseOrderItemErr?.message && Array.isArray(aPurchaseOrderItems)) {
      aPurchaseOrderItems.forEach(it => {
        // keep last seen item per PO (your previous code did a 1:1 map)
        mPurchaseOrderItem.set(it.PurchaseOrder, it);
      });
    }

    if (!anySalesOrderLastItemErr?.message && Array.isArray(aSalesOrderLastItems)) {
      aSalesOrderLastItems.forEach(it => {
        mSalesOrderLastItem.set(it.YY1_PurchasingDoc_SD_SDI, it);
        aSalesOrderWhere.push(it.SalesOrder);
      });
    }

    if (!anySalesOrderFirstItemErr?.message && Array.isArray(aSalesOrderFirstItems)) {
      aSalesOrderFirstItems.forEach(it => {
        mSalesOrderLastFirstItem.set(it.YY1_PurchasingDoc_SD_SDI, it);
        if (!aSalesOrderWhere.includes(it.SalesOrder)) aSalesOrderWhere.push(it.SalesOrder);
      });
    }
  } catch (err) {
    this.LOG._error && this.LOG.error(err.message);
  }

  try {
    const [
      { reason: anySalesOrderErr, value: aSalesOrders },
      { reason: anyEmpCustInfoErr, value: aEmpCustInfos },
    ] = await Promise.allSettled([
      this.salesOrderAPI.executeQuery(
        SELECT.from('A_SalesOrder')
          .columns(['SalesOrder','SalesOrganization','DistributionChannel','OrganizationDivision','YY1_AlphanumericSalesO_SDH'])
          .where({ SalesOrder: { in: [...new Set(aSalesOrderWhere)] } })
      ),

      this.empCustInfoAPI.executeQuery(
        SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
          .columns(['Name','FirstName','MiddleName','WORKER_ID'])
          .where({ WORKER_ID: { in: [...new Set(aEmpCustInfoWhere)] } })
      ),
    ]);

    if (!anySalesOrderErr?.message && Array.isArray(aSalesOrders)) {
      aSalesOrders.forEach(h => mSalesOrder.set(h.SalesOrder, h));
    }
    if (!anyEmpCustInfoErr?.message && Array.isArray(aEmpCustInfos)) {
      aEmpCustInfos.forEach(e => mEmpCustInfo.set(e.WORKER_ID, e));
    }
  } catch (err) {
    this.LOG._error && this.LOG.error(err.message);
  }

  // --- create supplier invoices (MIRO) ---
  try {
    for (const oRecord of aRecordsForProcessing) {
      const aErrors = []; // <<< IMPORTANT: define per-record

      const oPurchaseOrder = mPurchaseOrder.get(oRecord.purchaseDocumentNoSAP);
      const oPurchaseOrderItem = mPurchaseOrderItem.get(oRecord.purchaseDocumentNoSAP);
      const oEmpCustInfo = mEmpCustInfo.get(oRecord.sapEmployeeNo);

      // basic guards → log + fail the record, do NOT throw
      if (!oPurchaseOrder) {
        aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at?.('ERR_PURCHASE_ORDER_NOT_FOUND') || 'Purchase Order not found.' });
      }
      if (!oPurchaseOrderItem) {
        aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at?.('ERR_PURCHASE_ORDER_ITEM_NOT_FOUND') || 'Purchase Order item not found.' });
      }
      if (!oEmpCustInfo) {
        aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_EMP_NO_MISSING_INFOTYPE') });
      }

      if (aErrors.length) {
        aFailedRecordIDs.push(oRecord.ID);
        aErrors = aErrors.map(err => ({ ...err, process_code: sProcessCode }));
        aErrorLogs.push(...aErrors);
        continue; // next record
      }

      // Optional: derive PaymentBlockingReason from LFA1
      let paymentBlockingReason;
      try {
        const lfa1Row = await this.supplierLFA1API.executeQuery(
          SELECT.one
            .from('YY1_Supplier_LFA1')
            .columns(['Supplier','SupplierStandardCarrierAccess'])
            .where({ Supplier: oPurchaseOrder?.Supplier })
        );
        const carrier = lfa1Row?.SupplierStandardCarrierAccess;
        paymentBlockingReason = carrier ? String(carrier).trim().slice(0, 2).toUpperCase() : undefined;
      } catch (e) {
        this.LOG._error && this.LOG.error(`[Bonus_G][MIRO] Supplier LFA1 lookup failed for ${oPurchaseOrder?.Supplier}: ${e.message}`);
      }

      const oPayload = this._prepareDataForSupplierInvoiceCreate({
        record: oRecord,
        purchaseOrder: oPurchaseOrder,
        purchaseOrderItem: oPurchaseOrderItem,
        paymentBlockingReason
      });

      let result;
      try {
        result = await this.supplierInvoiceAPI.createSupplierInvoice(oPayload);
      } catch (e) {
        result = { error: e.message };
      }

      if (result?.SupplierInvoice) {
        oRecord.invoiceDocumentNoSAP = result.SupplierInvoice;
        oRecord.fiscalYearSAP = result.FiscalYear;

        const item = this.records.find(r => r.ID === oRecord.ID);
        if (item) {
          item.invoiceDocumentNoSAP = result.SupplierInvoice;
          item.fiscalYearSAP = result.FiscalYear;
        }

        await UPDATE(Bonus)
          .set({
            invoiceDocumentNoSAP: result.SupplierInvoice,
            fiscalYearSAP: result.FiscalYear,
            valid: true,
            processLevel_code: sProcessCode,
          })
          .where({ ID: oRecord.ID });

        aPassedRecordIDs.push(oRecord.ID);
      } else {
        aErrorLogs.push({ record_ID: oRecord.ID, message: `${result?.error || 'Unknown MIRO error'}`, process_code: sProcessCode });
        aFailedRecordIDs.push(oRecord.ID);
        this.LOG._error && this.LOG.error(`Error processing record ID ${oRecord.ID}: ${result?.error || 'Unknown MIRO error'}`);
      }
    }
  } catch (error) {
    // catastrophic loop error → fail all remaining records so pipeline stops
    this.LOG._error && this.LOG.error(`Critical error in processSupplierInvoice: ${error.message}`, { error });
    for (const rec of aRecordsForProcessing) {
      if (!aFailedRecordIDs.includes(rec.ID) && !aPassedRecordIDs.includes(rec.ID)) {
        aFailedRecordIDs.push(rec.ID);
        aErrorLogs.push({ record_ID: rec.ID, message: `MIRO critical error: ${error.message}`,process_code: sProcessCode });
      }
    }
  }

  // --- write logs and statuses ---
  if (aErrorLogs.length) {
    await ProcessLogger.addLogs(aErrorLogs);
    await UPDATE(Bonus)
      .set({ valid: false, processLevel_code: sProcessCode })
      .where({ ID: { in: aFailedRecordIDs } });
  }

  if (aPassedRecordIDs.length) {
    await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
    await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
  }

  this.updateExclusionSet({
    passed: aPassedRecordIDs,
    failed: aFailedRecordIDs,
    skipped: aSkippedRecords,
    bBreakExecution,
  });

  return {
    hasError: aFailedRecordIDs.length > 0,
    continue: aFailedRecordIDs.length === 0, // if any failed, STOP the pipeline
  };
}


    _prepareDataForSupplierInvoiceCreate({
        record,
        purchaseOrder,
        purchaseOrderItem,
        paymentBlockingReason
    }) {
        const oReturnData = {
            CompanyCode: purchaseOrderItem.CompanyCode,
            DocumentDate: `/Date(${+moment()})/`,
            PostingDate: `/Date(${+moment()})/`,
            SupplierInvoiceIDByInvcgParty: purchaseOrder.PurchaseOrder,
            InvoicingParty: purchaseOrder.Supplier,
            DocumentCurrency: purchaseOrder.DocumentCurrency,
            InvoiceGrossAmount: purchaseOrderItem.NetPriceAmount.toString(),
            DueCalculationBaseDate: `/Date(${+moment()})/`,
            AccountingDocumentType: 'RE',
            PaymentBlockingReason: paymentBlockingReason,
            AssignmentReference: record.wnInvoiceNo,
            to_SuplrInvcItemPurOrdRef: {
                results: [{
                    SupplierInvoiceItem: '1',
                    PurchaseOrder: purchaseOrder.PurchaseOrder,
                    PurchaseOrderItem: purchaseOrderItem.PurchaseOrderItem,
                    DocumentCurrency: purchaseOrder.DocumentCurrency,
                    SupplierInvoiceItemAmount: purchaseOrderItem.NetPriceAmount.toString(),
                    PurchaseOrderQuantityUnit: purchaseOrderItem.PurchaseOrderQuantityUnit,
                    PurchaseOrderQtyUnitSAPCode: purchaseOrderItem.PurchaseOrderQuantityUnit,
                    PurchaseOrderQtyUnitISOCode: '_01',
                    QuantityInPurchaseOrderUnit: purchaseOrderItem.OrderQuantity.toString(),
                    PurchaseOrderPriceUnit: purchaseOrderItem.PurchaseOrderQuantityUnit,
                    PurchaseOrderPriceUnitSAPCode: purchaseOrderItem.PurchaseOrderQuantityUnit,
                    PurchaseOrderPriceUnitISOCode: '_01',
                    QtyInPurchaseOrderPriceUnit: purchaseOrderItem.OrderQuantity.toString()
                }]
            }
        };

        return oReturnData;
    }
}

module.exports = Bonus_G;