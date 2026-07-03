// Interface F
const cds = require('@sap/cds');
const moment = require('moment');
const LOG = cds.log('Monitor.Procesor-SOWscInvoice');
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
const SupplierLFA1Comm = require('../communicators/SupplierLFA1');
const { determineConditionType } = require('../common/pricingHelper');

// Utility & Common functions
const { toEmployeeType } = require('../common/utils');
const { UPDATE, SELECT } = require('@sap/cds/lib/ql/cds-ql');
const { or } = require('@sap-cloud-sdk/odata-v2');

// List of required entities
const {
    SowScInvoice,
    FieldValidations,
    FieldValidations: {
        elements: {
            validation: { enum: mFieldValidationTypeEnum },
        },
    },
} = cds.entities('com.aleron.monitor');

class SOWscInvoice extends Processor {
    constructor(options) {
        super(options);
        // Processor Specific configuration
        this.recordsEntity = 'com.aleron.monitor.SowScInvoice';
        this.LOG = cds.log('Monitor.Processor-SOWscInvoice');
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
        this.billingTypeAPI = null;
        this.supplierLFA1API = null;
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
        this.supplierLFA1API = new SupplierLFA1Comm();
    }

    _getColumnsForFetch(sEntity) {
        const mEntityColumns = {
            'com.aleron.monitor.SowScInvoice': [
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
                ], // customer fields
                ...[
                    'contractNo',
                    'wnInvoiceNo',
                    'internalOrder',
                    'wnWorkOrder',
                    'beginDate',
                    'endDate',
                    'materialNo',
                    'materialDesc',
                    'itemQuantity',
                    'purchasingUOM',
                    'custLineItemUOM',
                    'customerBillRate',
                    'customerTotal',
                    'wnVendorTaxAmount',
                    'custPurchaseOrder',
                    'custPoLineItemNo',
                    'vendorPayRate',
                    'vendorTotal',
                    'supplierInvoiceNo',
                    'hybridPricing',
                    'supplierAdminFee',
                    'customerAdminFee',
                    'commodityCode',
                    'categoryCode',
                    'taxIndicator',
                    'plant',
                    'clientTaxAmount',
                    'verbiageCode',
                    'clientTaxIndicator',
                    'vendorTaxIndicator',
                    'distributionChannelSAP',
                    'projectNumberSAP',
                    'salesDocumentNoSAP',
                    'vcData1UUID',
                    'vcData2UUID',
                    'projectUUID',
                    'PORequiredSAP',
                    'salesDocumentNoSAP',
                    'salesItemNoSAP',
                    'purchaseDocumentNoSAP',
                    'purchaseDocumentItemSAP',
                    'z42SAP',
                    'invoiceDocumentNoSAP',
                    'fiscalYearSAP'
                ], // Extra field
            ],
        };

        return [...new Set(mEntityColumns[sEntity])];
    }

    async validateRecords(sProcessCode, bBreakExecution) {
        const aRecordsForProcessing = [];
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        // Clear the error logs for the selected records; so that new process can start
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);

        let aSalesContractIDs = [];
        let aMaterialNos = [];
        let aRecordIDs = [];

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                aRecordsForProcessing.push({ ...record });
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({ ...record });
                continue;
            }

            if (record.contractNo) {
                aSalesContractIDs.push(record.contractNo);
            }

            if (record.materialNo) {
                aMaterialNos.push(record.materialNo);
            }
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

        aSalesContractIDs = [...new Set(aSalesContractIDs)];
        aMaterialNos = [...new Set(aMaterialNos)];

        const [
            { reason: anySalesContractPrimaryErr, value: aSalesContractPrimaryResults },
            { reason: anySalesContractFallbackErr, value: aSalesContractFallbackResults },
            { reason: anyFieldValidationErr, value: aFieldValidations }
        ] = await Promise.allSettled([
            // Sales Contract Information
            // Primary query using SalesContract field
            this.salesContractAPI.executeQuery(
                this._getSalesContractQuery(aSalesContractIDs)
            ),
            // Fallback query using PurchaseOrderByCustomer field
            // this.salesContractAPI.executeQuery(
            //     SELECT.from('SalesContract')
            //         .columns(['SalesContract', 'SalesOrganization', 'DistributionChannel', 'OrganizationDivision', 'SoldToParty', 'PurchaseOrderByCustomer'])
            //         .where({ PurchaseOrderByCustomer: { in: aSalesContractIDs } })
            // ),
            this.salesContractAPI.executeQuery(
                this._getLegSalesContractQuery(aSalesContractIDs)
            ),

            // All Field Validations
            SELECT.from(FieldValidations)
                .columns(['field', 'validation', 'term'])
                .where({
                    // FIXME: Change it to tagged template to format `entry or entry or entry`
                    interfaceType_ID: this.file.interfaceType_ID,
                    validation: {
                        in: [mFieldValidationTypeEnum.blank.val, mFieldValidationTypeEnum.mandatory.val],
                    },
                }),
        ]);

        let aSalesContracts = [];
        if (!anySalesContractPrimaryErr && aSalesContractPrimaryResults && aSalesContractPrimaryResults.length > 0) {
            aSalesContracts.push(...aSalesContractPrimaryResults);
        }
        if (!anySalesContractFallbackErr && aSalesContractFallbackResults && aSalesContractFallbackResults.length > 0) {
            const primarySet = new Set(aSalesContracts.map(r => r.SalesContract));
            const fallbackOnly = aSalesContractFallbackResults.filter(r => !primarySet.has(r.SalesContract));
            aSalesContracts.push(...fallbackOnly);
        }

        if (anySalesContractPrimaryErr) {
            LOG._error && LOG.error(anySalesContractPrimaryErr.message);
        }

        if (anySalesContractFallbackErr) {
            LOG._error && LOG.error(anySalesContractFallbackErr.message);
        }

        if (anyFieldValidationErr) {
            LOG._error && LOG.error(anyFieldValidationErr.message);
        }

        const stMandatoryFields = new Set(
            aFieldValidations.flatMap((record) =>
                record.validation === mFieldValidationTypeEnum.mandatory.val ? record.field : [],
            ),
        );
        const stBlankFields = new Set(
            aFieldValidations.flatMap((record) =>
                record.validation === mFieldValidationTypeEnum.blank.val ? record.field : [],
            ),
        );

        // Run the steps only for filtered records
        for (const oRecord of aRecordsForProcessing) {
            let hasRecordFailed = false;

            // Check mandatory / blank fields
            const oFieldValidationRes = this._validateFieldValidations({
                stMandatoryFields,
                stBlankFields,
                oRecord,
            });
            if (oFieldValidationRes.hasError) {
                oFieldValidationRes.errors.forEach((err) => {
                    err.process_code = sProcessCode;
                });
                aErrorLogs.push(...oFieldValidationRes.errors);
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }

            // Check sales contract
            const oSalesContractRes = await this._validateSalesContract(oRecord, aSalesContracts);
            if (oSalesContractRes.hasError) {
                oSalesContractRes.errors.forEach((err) => {
                    err.process_code = sProcessCode;
                });
                aErrorLogs.push(...oSalesContractRes.errors);
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            } else {
                // Always use the resolved contract value for further processing
                oRecord.contractNo = oSalesContractRes.updatedContract;
            }

            if (oRecord?.vendorPayRate && !oRecord.vendorTotal) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_VENDOR_TOTAL'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }

            if (oRecord?.vendorTotal && !oRecord.vendorPayRate) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_VENDOR_PAY_RATE'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }


            if (!hasRecordFailed) {
                aPassedRecordIDs.push(oRecord.ID);
            }
        }

        // If errors are there, log them and update failed records
        if (aErrorLogs.length) {
            try {
                await Promise.allSettled([
                    ProcessLogger.addLogs(aErrorLogs),
                    this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
                ]);
                this.LOG._info &&
                    this.LOG.info(
                        cds.i18n.messages.at('INFO_RECORDS_UPDATED', [
                            sProcessCode,
                            aErrorLogs.map((log) => log.record_ID).join(','),
                        ]),
                    );
            } catch (err) {
                this.LOG._error && this.LOG.error(err.message);
            }
        }
        if (aPassedRecordIDs.length) {
            // Update contractNo in the entity for all passed records
            await Promise.allSettled(
                aPassedRecordIDs.map(id => {
                    const rec = this.records.find(r => r.ID === id);
                    if (rec && rec.contractNo) {
                        return UPDATE(SowScInvoice)
                            .set({ contractNo: rec.contractNo })
                            .where({ ID: id });
                    }
                    return Promise.resolve();
                })
            );

            await Promise.allSettled([
                ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode),
                ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3}))),
                this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
            ]);
            this.LOG._info && this.LOG.info(cds.i18n.messages.at('INFO_RECORDS_UPDATED', [sProcessCode, 'All']));
        }

        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords,
            bBreakExecution,
        });
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    _getSalesContractQuery(aSalesContractWhere) {
        // prettier-ignore
        return SELECT.from('SalesContract', sc => {
            sc.SalesContract,
                sc.SalesOrganization,
                sc.DistributionChannel,
                sc.OrganizationDivision,
                sc.SoldToParty,
                sc.PurchaseOrderByCustomer,
                sc._Item((scItem) => {
                    scItem.SalesContract,
                        scItem.SalesContractItem,
                        scItem.Product
                })
        })
            .where({ SalesContract: { in: [...new Set(aSalesContractWhere)] } })
    }

    _getLegSalesContractQuery(aSalesContractWhere) {
        // prettier-ignore
        return SELECT.from('SalesContract', sc => {
            sc.SalesContract,
                sc.SalesOrganization,
                sc.DistributionChannel,
                sc.OrganizationDivision,
                sc.SoldToParty,
                sc.PurchaseOrderByCustomer,
                sc._Item((scItem) => {
                    scItem.SalesContract,
                        scItem.SalesContractItem,
                        scItem.Product
                })
        })
            .where({ PurchaseOrderByCustomer: { in: [...new Set(aSalesContractWhere)] } })
    }

    _validateFieldValidations({ stMandatoryFields, stBlankFields, oRecord }) {
        let hasError = false,
            aErrorLogs = [];
        for (const anyField in oRecord) {
            if (stMandatoryFields.has(anyField) && !oRecord[anyField]) {
                hasError = true;
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_MANDT_FIELD', [anyField]), process_code: sProcessCode
                });
            }
            if (stBlankFields.has(anyField) && oRecord[anyField]) {
                hasError = true;
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_BLANK_FIELD', [anyField]), process_code: sProcessCode
                });
            }
        }
        return {
            hasError,
            errors: aErrorLogs,
        };
    }

    async _validateSalesContract(oRecord, aSalesContracts) {
        let hasError = false,
            aErrors = [];

        let updatedContract = oRecord.contractNo;
        // Try to find by contractNo (primary)
        let oSalesContract = aSalesContracts.find((sc) => oRecord.contractNo === sc.SalesContract);
        // Fallback: Try to find by PurchaseOrderByCustomer
        if (!oSalesContract) {
            oSalesContract = aSalesContracts.find((sc) => oRecord.contractNo === sc.PurchaseOrderByCustomer);
            if (oSalesContract) {
                // Fallback found: update contractNo to resolved SalesContract
                oRecord.contractNo = oSalesContract.SalesContract;
                updatedContract = oSalesContract.SalesContract;
                const idx = this.records.findIndex(r => r.ID === oRecord.ID);
                if (idx !== -1) {
                    this.records[idx].contractNo = oSalesContract.SalesContract;
                }
                if (oSalesContract.PurchaseOrderByCustomer) {
                    await UPDATE(SowScInvoice)
                        .set({ legacyContractNo: oSalesContract.PurchaseOrderByCustomer })
                        .where({ ID: oRecord.ID });
                }
            }
        }
        if (!oSalesContract) {
            hasError = true;
            aErrors.push({
                record_ID: oRecord.ID,
                message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'),
            });
        } else {
            const oSalesContractItem = oSalesContract._Item?.find(
                (item) => item.Product === oRecord.materialNo && item.SalesContract === oRecord.contractNo,
            );

            if (!oSalesContractItem) {
                hasError = true;
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_MATERIAL_NOT_FOUND', [
                        oRecord.materialNo,
                        oRecord.contractNo,
                    ]),
                });
            } else {
                if (oRecord.materialNo === 'SC_EXPENSE') {
                    if (!oRecord.itemQuantity || parseFloat(oRecord.itemQuantity.toString().trim()) === 0) {
                        hasError = true;
                        aErrors.push({
                            record_ID: oRecord.ID,
                            message: cds.i18n.messages.at('ERR_MATERIAL_QTY'),
                        });
                    }
                    if (!oRecord.customerBillRate || parseFloat(oRecord.customerBillRate.toString().trim()) === 0) {
                        hasError = true;
                        aErrors.push({
                            record_ID: oRecord.ID,
                            message: cds.i18n.messages.at('ERR_CUSTOMER_BILL_RATE'),
                        });
                    }
                    if (!oRecord.customerTotal || parseFloat(oRecord.customerTotal.toString().trim()) === 0) {
                        hasError = true;
                        aErrors.push({
                            record_ID: oRecord.ID,
                            message: cds.i18n.messages.at('ERR_CUSTOMER_BILL_TOTAL'),
                        });
                    }
                    if (!oRecord.customerAdminFee || parseFloat(oRecord.customerAdminFee.toString().trim()) === 0) {
                        hasError = true;
                        aErrors.push({
                            record_ID: oRecord.ID,
                            message: cds.i18n.messages.at('ERR_CUSTOMER_ADMIN_FEE'),
                        });
                    }
                }
            }
        }

        return {
            hasError,
            errors: aErrors,
            updatedContract
        };
    }

    async processSalesOrder(sProcessCode, bBreakExecution) {
        // Helper to stringify safely for logs
        const _s = (v) => {
            try { return typeof v === 'string' ? v : JSON.stringify(v); }
            catch { return String(v); }
        };
        const _len = (x) => (Array.isArray(x) ? x.length : (x ? Object.keys(x).length : 0));

        this.LOG._info && this.LOG.info(`[SO] >>> Enter processSalesOrder | sProcessCode=${sProcessCode} | bBreakExecution=${bBreakExecution}`);
        this.LOG._info && this.LOG.info(`[SO] Records in memory: ${_len(this.records)} | recordIDs=${_s(this.recordIDs)}`);

        // Clear the error logs for the selected records; so that new process can start
        this.LOG._info && this.LOG.info(`[SO] Calling ProcessLogger.removeLogs for recordIDs: ${_s(this.recordIDs)}`);
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);
        this.LOG._info && this.LOG.info(`[SO] ProcessLogger.removeLogs done`);

        const aRecordsForProcessing = [],
            aErrorLogs = [],
            aFailedRecordIDs = [],
            aPassedRecordIDs = [],
            aSkippedRecords = [];

        let aRecordIDs = [],
            aCustomerFieldNamesWhere = [],
            aUoMWhere = [],
            aSalesOrderWhere = [],
            aSalesOrderItemWhere = [],
            aPurchaseOrderItemWhere = [];

        let mCreatePO = new Map(), // Map for PORequiredSAP Indicator
            mZ42SAP = new Map(), // Map for z42SAP Field
            mUoM = new Map(),   // Map for UoM Table
            mCustomerFieldNameValue = new Map(), // Map for CustomFieldsToVC Table
            mSalesOrderItems = new Map(), // Map for Existing Sales Order Items
            mSalesOrderPartners = new Map(), // Map for Existing Sales Order Partner AG
            mSalesOrders = new Map(), // Map for Existing Sales Order
            mPurchaseOrderItems = new Map(), // Map for Existing Purchase Order Items
            mProcessingRecordsToCentralMapping = new Map();

        // NEW: track next item number per Work Order (wnWorkOrder)
        const mNextSalesItemNoByWorkOrder = new Map();

        this.LOG._info && this.LOG.info(`[SO] Begin pick/collect loop over ${_len(this.records)} records`);
        for (const [iRecordIndex, record] of this.records.entries()) {
            const canProcess = this.shouldRecordProcess(record, sProcessCode);
            this.LOG._info && this.LOG.info(`[SO] [Pick] idx=${iRecordIndex} ID=${record.ID} shouldProcess=${canProcess} fields={ wnWorkOrder=${record.wnWorkOrder}, purchasingUOM=${record.purchasingUOM}, vendorPayRate=${record.vendorPayRate}, salesItemNoSAP=${record.salesItemNoSAP} }`);

            if (canProcess) {
                aRecordsForProcessing.push({ ...record });
                mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
                aRecordIDs.push(record.ID);
                this.LOG._info && this.LOG.info(`[SO] [Pick] Added for processing. mapIndex=${iRecordIndex}`);
            } else {
                aSkippedRecords.push({ ...record });
                this.LOG._info && this.LOG.info(`[SO] [Pick] Skipped record ID=${record.ID}`);
                continue;
            }

            if (record?.vendorPayRate && parseFloat(record.vendorPayRate.toString().trim()) !== 0) {
                mCreatePO.set(record.ID, { PORequiredSAP: "X" });
                this.LOG._info && this.LOG.info(`[SO] [Pick] PORequired set for ID=${record.ID}`);
            }

            if (record.wnWorkOrder) {
                aSalesOrderWhere.push(record.wnWorkOrder);
            }

            if (record.purchasingUOM) {
                aUoMWhere.push(record.purchasingUOM);
            }

            const beforeCFSize = _len(mCustomerFieldNameValue);
            ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } =
                this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));
            const afterCFSize = _len(mCustomerFieldNameValue);
            this.LOG._info && this.LOG.info(`[SO] [Pick] customerFieldNameValues updated | mapSize ${beforeCFSize} -> ${afterCFSize}`);
        }
        this.LOG._info && this.LOG.info(`[SO] Pick loop done | toProcess=${_len(aRecordsForProcessing)} skipped=${_len(aSkippedRecords)} mappedKeys=${_len(mProcessingRecordsToCentralMapping)} recordIDs=${_s(aRecordIDs)}`);

        this.LOG._info && this.LOG.info(`[SO] Clear previous run logs for picked IDs: ${_s(aRecordIDs)}`);
        await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);
        this.LOG._info && this.LOG.info(`[SO] Done removeLogs for picked IDs`);

        this.LOG._info && this.LOG.info(`[SO] Update processing state to code=${sProcessCode}`);
        this.updateProcessingState(sProcessCode);

        if (!aRecordsForProcessing.length) {
            this.LOG._info && this.LOG.info(`[SO] No records to process for step=${sProcessCode}. Early exit.`);
            return { hasError: false, continue: true };
        }

        // --- First batch of reference queries ---
        try {
            this.LOG._info && this.LOG.info(`[SO] Query Set #1: SalesOrders by WN=${_s([...new Set(aSalesOrderWhere)])}`);
            this.LOG._info && this.LOG.info(`[SO] Query Set #1: CustomFieldsToVC by values=${_s(aCustomerFieldNamesWhere)}`);
            this.LOG._info && this.LOG.info(`[SO] Query Set #1: UoM by values=${_s([...new Set(aUoMWhere)])}`);

            const [
                { reason: anySalesOrderErr, value: aSalesOrders },
                { reason: anyCustomFieldsTOVCErr, value: aCustomFieldsTOVC },
                { reason: anyUoMErr, value: aUoMs },
            ] = await Promise.allSettled([
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns([
                            'SalesOrder', 'SalesOrganization', 'DistributionChannel', 'OrganizationDivision',
                            'SoldToParty', 'YY1_AlphanumericSalesO_SDH', 'YY1_CustomSalesOrder_SDH', 'YY1_ContractEndDate_SDH'
                        ])
                        .where({ YY1_AlphanumericSalesO_SDH: { in: [...new Set(aSalesOrderWhere)] } })
                ),
                SELECT.from('com.aleron.monitor.CustomFieldsToVC')
                    .columns(['customValue', 'fieldName'])
                    .where({ customValue: { in: aCustomerFieldNamesWhere } }),
                SELECT.from('com.aleron.monitor.SCON_UOM')
                    .columns([
                        'salesDocItemCategory', 'uoM', 'description', 'billQtyChar', 'billRateChar', 'billTotalChar',
                        'payQtyChar', 'payRateChar', 'payTotalChar', 'priceChar'
                    ])
                    .where({ uoM: { in: [...new Set(aUoMWhere)] } }),
            ]);

            this.LOG._info && this.LOG.info(`[SO] Query #1 results | SalesOrders=${_len(aSalesOrders)} err=${anySalesOrderErr?.message}`);
            this.LOG._info && this.LOG.info(`[SO] Query #1 results | CustomFieldsToVC=${_len(aCustomFieldsTOVC)} err=${anyCustomFieldsTOVCErr?.message}`);
            this.LOG._info && this.LOG.info(`[SO] Query #1 results | UoM=${_len(aUoMs)} err=${anyUoMErr?.message}`);

            if (!anySalesOrderErr?.message && aSalesOrders.length) {
                aSalesOrders.forEach((oSalesOrder) => {
                    mSalesOrders.set(oSalesOrder.YY1_AlphanumericSalesO_SDH, oSalesOrder);
                    aSalesOrderItemWhere.push(oSalesOrder.SalesOrder);
                });
                this.LOG._info && this.LOG.info(`[SO] mSalesOrders size=${_len(mSalesOrders)} aSalesOrderItemWhere=${_s(aSalesOrderItemWhere)}`);
            }

            if (!anyCustomFieldsTOVCErr?.message && aCustomFieldsTOVC.length) {
                let updates = 0;
                for (const [recordID, customerfieldEntries] of mCustomerFieldNameValue.entries()) {
                    customerfieldEntries.forEach(entry => {
                        const matchedData = aCustomFieldsTOVC.find(o => o.customValue === entry.customerFieldName);
                        if (matchedData) {
                            entry.fieldName = matchedData.fieldName;
                            updates++;
                        }
                    });
                }
                this.LOG._info && this.LOG.info(`[SO] Enriched CustomerFieldNameValue entries with fieldName | updates=${updates}`);
            }

            if (!anyUoMErr?.message && aUoMs.length) {
                aUoMs.forEach((oUoM) => mUoM.set(oUoM.uoM, oUoM));
                this.LOG._info && this.LOG.info(`[SO] mUoM size=${_len(mUoM)}`);
            }

        } catch (err) {
            this.LOG._error && this.LOG.error(`[SO] Query Set #1 exception: ${err.message}`);
        }

        // --- Second batch (SO Items + Partners) ---
        try {
            this.LOG._info && this.LOG.info(`[SO] Query Set #2: SalesOrderItems by SalesOrder in=${_s([...new Set(aSalesOrderItemWhere)])}`);
            this.LOG._info && this.LOG.info(`[SO] Query Set #2: SalesOrderHeaderPartner (SP) by SalesOrder in=${_s([...new Set(aSalesOrderItemWhere)])}`);

            const [
                { reason: anySalesOrderItemErr, value: aSalesOrderItems },
                { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
            ] = await Promise.allSettled([
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns([
                            'SalesOrder', 'SalesOrderItem', 'SalesDocumentRjcnReason', 'ProductionPlant',
                            'WBSElement', 'YY1_PurchasingDoc_SD_SDI', 'YY1_WeekEnd_SD_SDI',
                            'SalesOrderItemCategory', 'YY1_WNWorkOrder_SD_SDI'
                        ])
                        .where({ SalesOrder: { in: [...new Set(aSalesOrderItemWhere)] } })
                ),
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderHeaderPartner')
                        .columns(['SalesOrder', 'Customer'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderItemWhere)] },
                            PartnerFunction: 'SP'
                        })
                )
            ]);

            this.LOG._info && this.LOG.info(`[SO] Query #2 results | SOItems=${_len(aSalesOrderItems)} err=${anySalesOrderItemErr?.message}`);
            this.LOG._info && this.LOG.info(`[SO] Query #2 results | SOHeaderPartners=${_len(aSalesOrderPartners)} err=${anySalesOrderPartnerErr?.message}`);

            if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
                aSalesOrderItems.forEach((oSalesOrderItem) => {
                    if (!mSalesOrderItems.has(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI)) {
                        mSalesOrderItems.set(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI, []);
                    }
                    mSalesOrderItems.get(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI).push(oSalesOrderItem);
                    if (oSalesOrderItem.YY1_PurchasingDoc_SD_SDI && !aPurchaseOrderItemWhere.includes(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI)) {
                        aPurchaseOrderItemWhere.push(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI);
                    }
                });
                this.LOG._info && this.LOG.info(`[SO] mSalesOrderItems size=${_len(mSalesOrderItems)} aPurchaseOrderItemWhere=${_s(aPurchaseOrderItemWhere)}`);
            }
            if (!anySalesOrderPartnerErr?.message && aSalesOrderPartners.length) {
                aSalesOrderPartners.forEach((oSalesOrderPartner) => {
                    if (!mSalesOrderPartners.has(oSalesOrderPartner.SalesOrder)) {
                        mSalesOrderPartners.set(oSalesOrderPartner.SalesOrder, []);
                    }
                    mSalesOrderPartners.get(oSalesOrderPartner.SalesOrder).push(oSalesOrderPartner);
                });
                this.LOG._info && this.LOG.info(`[SO] mSalesOrderPartners size=${_len(mSalesOrderPartners)}`);
            }

        } catch (err) {
            this.LOG._error && this.LOG.error(`[SO] Query Set #2 exception: ${err.message}`);
        }

        // --- Third batch (PO Items) ---
        try {
            this.LOG._info && this.LOG.info(`[SO] Query Set #3: PurchaseOrderItems by PO in=${_s([...new Set(aPurchaseOrderItemWhere)])}`);

            const [
                { reason: anyPurchaseOrderItemErr, value: aPurchaseOrderItems },
            ] = await Promise.allSettled([
                this.PurchaseOrderAPI.executeQuery(
                    SELECT.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder', 'PurchaseOrderItem'])
                        .where({ PurchaseOrder: { in: [...new Set(aPurchaseOrderItemWhere)] } })
                ),
            ]);

            this.LOG._info && this.LOG.info(`[SO] Query #3 results | POItems=${_len(aPurchaseOrderItems)} err=${anyPurchaseOrderItemErr?.message}`);

            if (!anyPurchaseOrderItemErr?.message && aPurchaseOrderItems.length) {
                aPurchaseOrderItems.forEach((oPurchaseOrder) => {
                    if (!mPurchaseOrderItems.has(oPurchaseOrder.PurchaseOrder)) {
                        mPurchaseOrderItems.set(oPurchaseOrder.PurchaseOrder, []);
                    }
                    mPurchaseOrderItems.get(oPurchaseOrder.PurchaseOrder).push(oPurchaseOrder);
                });
                this.LOG._info && this.LOG.info(`[SO] mPurchaseOrderItems size=${_len(mPurchaseOrderItems)}`);
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(`[SO] Query Set #3 exception: ${err.message}`);
        }

        const mConditionType = new Map();
        const mBillingType = new Map();

        // Pre-calc per-record condition/billing
        this.LOG._info && this.LOG.info(`[SO] Begin condition/billing pre-calc for ${_len(aRecordsForProcessing)} records`);
        for (const record of aRecordsForProcessing) {
            let salesOrder = mSalesOrders.get(record.wnWorkOrder);
            this.LOG._info && this.LOG.info(`[SO] [PreCalc] ID=${record.ID} wnWorkOrder=${record.wnWorkOrder} salesOrderFound=${!!salesOrder}`);

            const conditionType = await determineConditionType({
                customer: salesOrder?.SoldToParty,
                salesOrganization: salesOrder?.SalesOrganization,
                distributionChannel: salesOrder?.DistributionChannel,
                division: salesOrder?.OrganizationDivision
            });
            mConditionType.set(record.ID, conditionType);
            this.LOG._info && this.LOG.info(`[SO] [PreCalc] ID=${record.ID} conditionType=${_s(conditionType)}`);

            const billingType = await this.billingTypeAPI.executeQuery(
                SELECT.from('YY1_BILLINGTYPE')
                    .columns(['Billing_type', 'SO_order_Type'])
                    .where({ SO_order_Type: salesOrder?.YY1_CustomSalesOrder_SDH })
            );
            mBillingType.set(record.ID, billingType[0]);
            this.LOG._info && this.LOG.info(`[SO] [PreCalc] ID=${record.ID} billingType=${_s(billingType?.[0])}`);
        }
        this.LOG._info && this.LOG.info(`[SO] Pre-calc done | mConditionType=${_len(mConditionType)} mBillingType=${_len(mBillingType)}`);

        const aPayloads = [];
        const mPayloadMap = new Map();

        // Build payloads
        this.LOG._info && this.LOG.info(`[SO] Begin payload build for ${_len(aRecordsForProcessing)} records`);
        for (const oRecord of aRecordsForProcessing) {
            const aErrors = [];
            this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} salesItemNoSAP=${oRecord.salesItemNoSAP}`);

            if (oRecord.salesItemNoSAP) {
                aPassedRecordIDs.push(oRecord.ID);
                mPayloadMap.set(oRecord.ID, {
                    salesOrder: oRecord.salesDocumentNoSAP,
                    salesOrderItem: oRecord.salesItemNoSAP,
                });
                this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} already has SO item, skip payload create`);
                continue;
            }

            let salesOrder = mSalesOrders.get(oRecord.wnWorkOrder);
            let salesOrderItem = mSalesOrderItems.get(oRecord.wnWorkOrder);
            let poRequired = mCreatePO.get(oRecord.ID);
            let uoM = mUoM.get(oRecord.purchasingUOM);
            let conditionType = mConditionType.get(oRecord.ID);
            let billingType = mBillingType.get(oRecord.ID);
            let aCustomerFieldNameValue = mCustomerFieldNameValue.get(oRecord.ID);
            let oCustomerFieldNameValue = aCustomerFieldNameValue?.find(obj => obj.customerFieldName === 'Z42');
            let firstSOItem, soItemMax;

            this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} ctx={ SO?=${!!salesOrder}, SOItems?=${!!salesOrderItem}, POReq?=${_s(poRequired)}, UoM?=${!!uoM}, Cond?=${_s(conditionType)}, Bill?=${_s(billingType)} }`);

            // Contract end date handling
            if (salesOrder?.YY1_ContractEndDate_SDH) {
                const contractEndDateMatch = salesOrder.YY1_ContractEndDate_SDH.match(/\/Date\((\d+)\)\//);
                if (contractEndDateMatch) {
                    const contractEndDateTimestamp = parseInt(contractEndDateMatch[1]);
                    const recordEndDateTimestamp = moment(oRecord.endDate, "YYYYMMDD").valueOf();
                    if (recordEndDateTimestamp > contractEndDateTimestamp) {
                        oRecord.rejectReasonSalesOrderSAP = 'ZR';
                        this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} reject reason set to ZR (endDate beyond contractEnd)`);
                    }
                }
            }

            if (salesOrderItem) {
                firstSOItem = salesOrderItem.filter(item => item.SalesOrderItem === "10" && item.SalesOrderItemCategory === "TADN")[0];
                this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} firstSOItem=${_s(firstSOItem)}`);

                if (!firstSOItem?.WBSElement) {
                    aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'), process_code: sProcessCode });
                    aFailedRecordIDs.push(oRecord.ID);
                    aErrorLogs.push(...aErrors);
                    this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} fail: WBSElement missing`);
                    continue;
                }

                // Max existing SO item
                soItemMax = salesOrderItem.reduce((maxItem, current) =>
                    Number(current.SalesOrderItem) > Number(maxItem.SalesOrderItem) ? current : maxItem
                );
                this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} soItemMax(before PO adjust)=${_s(soItemMax)}`);

                // === Existing PO-based max logic (kept) ===
                if (poRequired?.PORequiredSAP === "X") {
                    if (soItemMax.SalesOrderItem === '10') {
                        poRequired.purchaseDocumentItemSAP = '20';
                        mCreatePO.set(oRecord.ID, poRequired);
                        this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} PORequired: set purchaseDocumentItemSAP=20`);
                    } else {
                        if (!soItemMax.YY1_PurchasingDoc_SD_SDI || !firstSOItem.YY1_PurchasingDoc_SD_SDI) {
                            aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_CREATE_PO'), process_code: sProcessCode });
                            aFailedRecordIDs.push(oRecord.ID);
                            aErrorLogs.push(...aErrors);
                            this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} fail: Missing PurchasingDoc on SO items for PO requirement`);
                            continue;
                        } else {
                            let purchaseOrderItem = mPurchaseOrderItems.get(firstSOItem.YY1_PurchasingDoc_SD_SDI);
                            const poItemMax = purchaseOrderItem?.reduce((maxItem, current) =>
                                Number(current.PurchaseOrderItem) > Number(maxItem.PurchaseOrderItem) ? current : maxItem
                            );
                            if (poItemMax && Number(poItemMax.PurchaseOrderItem) > Number(soItemMax.SalesOrderItem)) {
                                soItemMax.SalesOrderItem = poItemMax.PurchaseOrderItem;
                            }
                            this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} adjusted soItemMax via PO=${_s(soItemMax)}`);
                        }
                    }
                }

                if (!uoM && ['SC_EXPENSE', 'SC_EXPENSE_NT'].includes(oRecord.materialNo)) {
                    aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_EXPENSE_SCON'), process_code: sProcessCode });
                    aFailedRecordIDs.push(oRecord.ID);
                    aErrorLogs.push(...aErrors);
                    this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} fail: UoM missing for expense material`);
                    continue;
                } else if (!uoM) {
                    aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_LABOR_SCON'), process_code: sProcessCode });
                    aFailedRecordIDs.push(oRecord.ID);
                    aErrorLogs.push(...aErrors);
                    this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} fail: UoM missing for labor material`);
                    continue;
                }

                if ((oCustomerFieldNameValue?.customerFieldValue)?.trim() !== '' &&
                    oCustomerFieldNameValue?.customerFieldValue !== '00.00' &&
                    oCustomerFieldNameValue?.customerFieldValue !== '0.00') {
                    if (['SC_EXPENSE', 'SC_EXPENSE_NT'].includes(oRecord.materialNo)) {
                        aErrors.push({ record_ID: oRecord.ID, message: cds.i18n.messages.at('ERR_ACCELERATED_PAYMENT_FEE'), process_code: sProcessCode });
                        aFailedRecordIDs.push(oRecord.ID);
                        aErrorLogs.push(...aErrors);
                        this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} fail: Z42 not allowed on expense`);
                        continue;
                    } else {
                        mZ42SAP.set(oRecord.ID, { ID: oRecord.ID, z42SAP: true });
                        this.LOG._info && this.LOG.info(`[SO] [Build] ID=${oRecord.ID} Z42 flag set true`);
                    }
                }

                // === NEW: Compute next SalesOrderItem per work order, ensuring no duplicates ===
                const workOrderKey = oRecord.wnWorkOrder;
                const baseMaxNumber = Number(soItemMax.SalesOrderItem);
                let nextSalesOrderItemNumber;

                if (mNextSalesItemNoByWorkOrder.has(workOrderKey)) {
                    // There were already new items in this run for this work order
                    nextSalesOrderItemNumber = mNextSalesItemNoByWorkOrder.get(workOrderKey) + 10;
                } else {
                    // First new item for this work order: start from highest among existing SO & PO
                    nextSalesOrderItemNumber = baseMaxNumber + 10;
                }
                mNextSalesItemNoByWorkOrder.set(workOrderKey, nextSalesOrderItemNumber);

                this.LOG._info && this.LOG.info(
                    `[SO] [Build] ID=${oRecord.ID} workOrder=${workOrderKey} baseMax=${baseMaxNumber} nextItem=${nextSalesOrderItemNumber}`
                );

                // Prepare payload for SalesOrderItem creation
                const oPayload = this._prepareDataForSalesOrderItemCreate({
                    record: oRecord,
                    firstSOItem: firstSOItem,
                    soItemMax: soItemMax,
                    conditionType: conditionType,
                    billingType: billingType,
                    nextSalesOrderItemNumber: nextSalesOrderItemNumber
                });
                const iPayloadIndex = aPayloads.push(oPayload) - 1;
                mPayloadMap.set(oRecord.ID, { payloadIndex: iPayloadIndex });
                this.LOG._info && this.LOG.info(
                    `[SO] [Build] ID=${oRecord.ID} payloadIndex=${iPayloadIndex} payloadSummary=${_s({
                        SalesOrder: oPayload.SalesOrder,
                        SalesOrderItem: oPayload.SalesOrderItem,
                        Material: oPayload.Material
                    })}`
                );
            }
        }
        this.LOG._info && this.LOG.info(`[SO] Payload build done | payloads=${_len(aPayloads)} mapKeys=${_len(mPayloadMap)} failsSoFar=${_len(aFailedRecordIDs)}`);

        if (Array.isArray(aPayloads) && aPayloads.length > 0) {
            // TODO: Check if aPayloads[].errors has any value; process accordingly
            aPayloads.forEach((oPayload) => delete oPayload.errors);
            this.LOG._info && this.LOG.info(`[SO] Creating SalesOrderItems in S/4 | count=${aPayloads.length}`);

            const aSalesOrderItemResults = await this.salesOrderAPI.createSalesOrderItems(aPayloads);
            this.LOG._info && this.LOG.info(`[SO] createSalesOrderItems done | results=${_len(aSalesOrderItemResults)}`);

            aSalesOrderItemResults.forEach((oResult, iPayloadIndex) => {
                const sRecordID = [...mPayloadMap.entries()].find(
                    ([, oMapEntry]) => oMapEntry.payloadIndex === iPayloadIndex,
                )?.[0];

                this.LOG._info && this.LOG.info(`[SO] [CreateResult] idx=${iPayloadIndex} recordID=${sRecordID} hasError=${oResult.hasError}`);

                if (!oResult.hasError) {
                    const oCreatedSalesOrderItem = oResult.value;
                    aPassedRecordIDs.push(sRecordID);

                    const oMapEntry = mPayloadMap.get(sRecordID);
                    oMapEntry.salesOrder = oCreatedSalesOrderItem.SalesOrder;
                    oMapEntry.salesOrderItem = oCreatedSalesOrderItem.SalesOrderItem;
                    mPayloadMap.set(sRecordID, oMapEntry);

                    this.LOG._info && this.LOG.info(
                        `[SO] [CreateResult] SUCCESS recordID=${sRecordID} SO=${oMapEntry.salesOrder} Item=${oMapEntry.salesOrderItem}`
                    );
                } else {
                    aFailedRecordIDs.push(sRecordID);
                    if (Array.isArray(oResult.reason)) {
                        oResult.reason.forEach((oError) => {
                            aErrorLogs.push({ record_ID: sRecordID, ...oError, process_code: sProcessCode });
                        });
                        this.LOG._info && this.LOG.info(`[SO] [CreateResult] FAIL recordID=${sRecordID} errors=${_s(oResult.reason)}`);
                    } else {
                        aErrorLogs.push({
                            record_ID: sRecordID,
                            process_code: sProcessCode,
                            message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM_CREATION_FAILED', [oResult.reason]),
                        });
                        this.LOG._info && this.LOG.info(`[SO] [CreateResult] FAIL recordID=${sRecordID} error=${_s(oResult.reason)}`);
                    }
                    mPayloadMap.delete(sRecordID);
                }
            });
        } else {
            this.LOG._info && this.LOG.info(`[SO] No payloads to create`);
        }

        // VC Data update process
        this.LOG._info && this.LOG.info(`[SO] Begin _prepareVCData`);
        await this._prepareVCData({
            records: this.records,
            mCustomerFieldNameValue: mCustomerFieldNameValue,
            mPayloadMap: mPayloadMap,
            mUoM: mUoM,
            mSalesOrders: mSalesOrders,
            aPassedRecordIDs: aPassedRecordIDs,
            aFailedRecordIDs: aFailedRecordIDs,
            aErrorLogs: aErrorLogs
        });
        this.LOG._info && this.LOG.info(`[SO] _prepareVCData done | passed=${_len(aPassedRecordIDs)} failed=${_len(aFailedRecordIDs)} errorLogs=${_len(aErrorLogs)}`);

        if (aErrorLogs.length) {
            this.LOG._info && this.LOG.info(`[SO] Writing error logs count=${aErrorLogs.length}`);
            await ProcessLogger.addLogs(aErrorLogs);
            this.LOG._info && this.LOG.info(`[SO] Marking failed ${aFailedRecordIDs.length} records invalid at step=${sProcessCode}`);
            await UPDATE(SowScInvoice)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        // Update the `salesDocumentNoSAP` field in `this.records` and the database
        this.LOG._info && this.LOG.info(`[SO] Begin in-memory updates from mPayloadMap (size=${_len(mPayloadMap)})`);
        this.records.forEach((oRecord) => {
            const oMapEntry = mPayloadMap.get(oRecord.ID);
            const oCreatePO = mCreatePO.get(oRecord.ID);
            const oZ42SAP = mZ42SAP.get(oRecord.ID);
            if (oMapEntry && oMapEntry.salesOrder) {
                oRecord.salesDocumentNoSAP = oMapEntry.salesOrder;
                oRecord.salesItemNoSAP = oMapEntry.salesOrderItem;
                oRecord.PORequiredSAP = oCreatePO?.PORequiredSAP;
                oRecord.purchaseDocumentItemSAP = oCreatePO?.purchaseDocumentItemSAP ?? '';
                oRecord.vcData1UUID = oMapEntry.vcData1UUID ?? '';
                oRecord.vcData2UUID = oMapEntry.vcData2UUID ?? '';
                oRecord.z42SAP = oZ42SAP?.z42SAP ? oZ42SAP.z42SAP : false;
                this.LOG._info && this.LOG.info(
                    `[SO] [MemUpdate] ID=${oRecord.ID} SO=${oRecord.salesDocumentNoSAP} Item=${oRecord.salesItemNoSAP} POReq=${oRecord.PORequiredSAP} Z42=${oRecord.z42SAP}`
                );
            }
        });

        // Create records to update using flatMap
        const aRecordsToUpdate = this.records.flatMap((oRecord) => {
            const oMapEntry = mPayloadMap.get(oRecord.ID);
            const oCreatePO = mCreatePO.get(oRecord.ID);
            const oZ42SAP = mZ42SAP.get(oRecord.ID);
            return oMapEntry && oMapEntry.salesOrder
                ? [{
                    ID: oRecord.ID,
                    salesDocumentNoSAP: oMapEntry.salesOrder,
                    salesItemNoSAP: oMapEntry.salesOrderItem,
                    PORequiredSAP: oCreatePO?.PORequiredSAP,
                    purchaseDocumentItemSAP: oCreatePO?.purchaseDocumentItemSAP ?? '',
                    vcData1UUID: oMapEntry.vcData1UUID,
                    vcData2UUID: oMapEntry.vcData2UUID,
                    z42SAP: oZ42SAP?.z42SAP ? oZ42SAP.z42SAP : false
                }]
                : [];
        });
        this.LOG._info && this.LOG.info(`[SO] DB update list prepared | count=${aRecordsToUpdate.length}`);

        if (aRecordsToUpdate.length) {
            this.LOG._info && this.LOG.info(`[SO] Begin DB UPDATE for ${aRecordsToUpdate.length} records`);
            await Promise.all(
                aRecordsToUpdate.map((oRecord) => {
                    const iRecordIndex = mProcessingRecordsToCentralMapping.get(oRecord.ID);
                    // Mirror changes into central memory array
                    this.records[iRecordIndex].salesDocumentNoSAP = oRecord.salesDocumentNoSAP;
                    this.records[iRecordIndex].salesItemNoSAP = oRecord.salesItemNoSAP;
                    this.records[iRecordIndex].PORequiredSAP = oRecord.PORequiredSAP;
                    this.records[iRecordIndex].purchaseDocumentItemSAP = oRecord?.purchaseDocumentItemSAP ?? '';
                    this.records[iRecordIndex].vcData1UUID = oRecord.vcData1UUID;
                    this.records[iRecordIndex].vcData2UUID = oRecord.vcData2UUID;
                    this.records[iRecordIndex].z42SAP = oRecord?.z42SAP ? oRecord.z42SAP : false;

                    this.LOG._info && this.LOG.info(
                        `[SO] [DBUpdate] ID=${oRecord.ID} SO=${oRecord.salesDocumentNoSAP} Item=${oRecord.salesItemNoSAP} POReq=${oRecord.PORequiredSAP} Z42=${oRecord?.z42SAP}`
                    );

                    return UPDATE(SowScInvoice)
                        .set({
                            salesDocumentNoSAP: oRecord.salesDocumentNoSAP,
                            salesItemNoSAP: oRecord.salesItemNoSAP,
                            PORequiredSAP: oRecord.PORequiredSAP,
                            purchaseDocumentItemSAP: oRecord?.purchaseDocumentItemSAP ?? '',
                            vcData1UUID: oRecord.vcData1UUID,
                            vcData2UUID: oRecord.vcData2UUID,
                            z42SAP: oRecord?.z42SAP ? oRecord.z42SAP : false,
                        })
                        .where({ ID: oRecord.ID });
                }),
            );
            this.LOG._info && this.LOG.info(`[SO] DB UPDATE done`);
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            this.LOG._info && this.LOG.info(`[SO] Remove logs & mark valid for passed IDs count=${aPassedRecordIDs.length}`);
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            this.LOG._info && this.LOG.info(`[SO] Mark invalid for failed IDs count=${aFailedRecordIDs.length}`);
            await Promise.allSettled([
                this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
            ]);
        }

        // Step 8: Update Exclusion Set
        this.LOG._info && this.LOG.info(
            `[SO] Update exclusion set | passed=${aPassedRecordIDs.length} failed=${aFailedRecordIDs.length} skipped=${aSkippedRecords.length} bBreakExecution=${bBreakExecution}`
        );
        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords,
            bBreakExecution,
        });

        const result = {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
        this.LOG._info && this.LOG.info(`[SO] <<< Exit processSalesOrder | result=${_s(result)}`);
        return result;
    }



    /**
       * Prepare data for SalesOrder creation
       * @param {object} mParams
       * @param {object} mParams.record -  record from file
       * @param {object} mParams.firstSOItem - First SalesOrder Item Object
       * @param {object} mParams.soItemMax - SalesOrder Item Object with Max Item Number
       * @returns {object} SalesOrderItem payload with 'errors' property. `errors` property MUST BE removed before sending to S/4HANA
       */
    _prepareDataForSalesOrderItemCreate({
        record,
        firstSOItem,
        soItemMax,
        conditionType,
        billingType,
        nextSalesOrderItemNumber // NEW PARAM
    }) {
        const oReturnData = {
            SalesOrder: soItemMax.SalesOrder,
            // Use the pre-computed next item number to avoid duplicates
            SalesOrderItem: String(nextSalesOrderItemNumber),
            SalesOrderItemCategory: 'TAD',
            Material: record?.materialNo,
            RequestedQuantity: '1',
            OrderQuantityUnit: 'LAB',
            ProductionPlant: soItemMax.ProductionPlant || '',
            ProductTaxClassification1: record?.clientTaxIndicator || '',
            SalesOrderItemText: record?.MaterialDesc || '',
            WBSElement: firstSOItem.WBSElement,
            PurchaseOrderByCustomer: record.custPurchaseOrder,
            UnderlyingPurchaseOrderItem: record.custPoLineItemNo,
            CostAmount: record.customerTotal,
            NetAmount: record.customerTotal,
            YY1_CommodityCode_SD_SDI: record.commodityCode || '',
            YY1_CategoryCode_SD_SDI: record.categoryCode || '',
            // YY1_CostCenter_SD_SDI: '',
            YY1_SupplierInvoice_SD_SDI: record.supplierInvoiceNo || '',
            YY1_PurchasingDoc_SD_SDI: firstSOItem.YY1_PurchasingDoc_SD_SDI || '',
            YY1_InvoiceVATtxt_SD_SDI: record.verbiageCode || '',
            YY1_WeekEnd_SD_SDI: `/Date(${moment(record.endDate, "YYYYMMDD").valueOf()})/`,
            YY1_CustomBillingType_SDI: billingType.Billing_type,
            YY1_WNWorkOrder_SD_SDI: soItemMax.YY1_WNWorkOrder_SD_SDI,
            YY1_WNInvoice_SD_SDI: record.wnInvoiceNo,
            ItemBillingBlockReason: record.rejectReasonSalesOrderSAP === 'ZR' ? 'ZI' : '',
            SalesDocumentRjcnReason: record.rejectReasonSalesOrderSAP === 'ZR' ? 'ZR' : '',
            to_ScheduleLine: [this._prepareDataForScheduleLine({ record, soItemMax })],
            to_PricingElement: {
                results: [{
                    ConditionType: conditionType,
                    ConditionRateValue: record.customerTotal
                }]
            }
        };

        return oReturnData;
    }

    _prepareDataForScheduleLine({ record, soItemMax }) {
        return {
            SalesOrderItem: '10',
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
        mUoM,
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
                const oUoM = mUoM.get(record.purchasingUOM);
                const oSalesOrder = mSalesOrders.get(record.wnWorkOrder);
                let MATERIAL_GROUP_3 = '';
                if (parseFloat((record?.itemQuantity).toString().trim() > '0.00') &&
                    parseFloat((record?.customerAdminFee).toString().trim() > '0.00') &&
                    record?.customerBillRate &&
                    record?.customerTotal) {
                    MATERIAL_GROUP_3 = 'ZCF'
                }
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
                    let shift = 1;
                    const salesVC1 = {
                        SalesOrderNumber: oMapEntry.salesOrder,
                        SalesOrderItemNum: oMapEntry.salesOrderItem,
                        YY5_LINE_ITEM_NUMBER: Number(record.custPoLineItemNo),
                        YY6_SC_LINE_ITEM_NUMBER: record.custPoLineItemNo,
                        ...(['11961', '11962'].includes(oSalesOrder.SoldToParty) && {
                            YY8_WEEK_ENDING2: moment(oCustFieldResult.VC2Fields?.YY241_CUST_BGRD_CHECK_DATE).format('YYYY-MM-DD') || '',
                        }),
                        ...(!['11961', '11962'].includes(oSalesOrder.SoldToParty) && {
                            YY8_WEEK_ENDING2: moment(record.endDate).format('YYYY-MM-DD'),
                        }),
                        ...(oCustFieldResult.VC1Fields || {}),
                    };
                    const salesVC2 = {
                        Sales_Order_Number: oMapEntry.salesOrder,
                        Sales_Order_Item_Num: oMapEntry.salesOrderItem,
                        SERVICE_START_DATE: `/Date(${moment(record.beginDate, "YYYYMMDD").valueOf()})/`,
                        SERVICE_END_DATE: `/Date(${moment(record.endDate, "YYYYMMDD").valueOf()})/`,
                        YY246_ZSD_WN_INVOICE_VCSD: record.wnInvoiceNo,
                        YY247_ZSD_WN_WORK_ORDER_VCSD: record.wnWorkOrder,
                        CUST_CATERGORY_CODE2: record.categoryCode,
                        CUST_COMMODITY_CODE2: record.commodityCode,
                        SUPPLIER_INVOICE_NUMBER: record.supplierInvoiceNo,
                        ...(['SC_EXPENSE', 'SC_EXPENSE_NT'].includes(record.materialNo) && {
                            YY241_CUST_BGRD_CHECK_DATE: moment(record.endDate).format('YYYY-MM-DD'),
                            YY244_ITEM_CATEGORY: 'ZSCE',
                            VC_PRICE_CUST: oUoM.priceChar,
                            VC_PRICE_VEN: oUoM.priceChar,
                            SC_UOM: record.custLineItemUOM ? record.custLineItemUOM : record.purchasingUOM,
                            ...(oUoM.BillTotalChar && { [oUoM.BillTotalChar]: record.customerTotal })
                        }),
                        ...(!['SC_EXPENSE', 'SC_EXPENSE_NT'].includes(record.materialNo) && {
                            YY244_ITEM_CATEGORY: 'ZSCL',
                            HYBRID_PRICING: record.hybridPricing === 'Y' ? 'YES' : record.hybridPricing === 'W' ? 'WAIVED' : '',
                            SC_UOM: record.custLineItemUOM,
                            SC_ADMIN_CUST: record.customerAdminFee,
                            SC_ADMIN_VEN: record.supplierAdminFee,
                            MATERIAL_GROUP_3: MATERIAL_GROUP_3,
                            ...(oUoM.BillQtyChar && { [oUoM.BillQtyChar]: record.itemQuantity }),
                            ...(oUoM.BillRateChar && { [oUoM.BillRateChar]: record.customerBillRate }),
                            ...(oUoM.BillTotalChar && { [oUoM.BillTotalChar]: record.customerTotal }),
                            ...(oUoM.PayRateChar && { [oUoM.PayRateChar]: record.vendorPayRate }),
                            ...(oUoM.PayTotalChar && { [oUoM.PayTotalChar]: record.vendorTotal })
                        }),
                        ...(oCustFieldResult.VC2Fields || {}),
                    };
                    const recordID = record.ID;
                    const vcData1UUID = record.vcData1UUID;
                    const vcData2UUID = record.vcData2UUID;
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

                // remvove id which is getting error from PassRecordIds.
                const index = aPassedRecordIDs.indexOf(aPayloadsSalesVCData[i][2]);
                if (index !== -1) aPassedRecordIDs.splice(index, 1);
                LOG.error(
                    `Error processing record ID ${aPayloadsSalesVCData[i][2]}: ${insertedSalesVCData1.message} || ${insertedSalesVCData2.message}`,
                );
            }
        }
    }

    async processPurchaseOrder(sProcessCode, bBreakExecution) {
        // Clear the error logs for the selected records; so that new process can start
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);

        const aRecordsForProcessing = [],
            aErrorLogs = [],
            aFailedRecordIDs = [],
            aPassedRecordIDs = [],
            aSkippedRecords = [];

        let aRecordIDs = [],
            aSalesDocumentNoWhere = [],
            aSalesDocumentItemNOWhere = [];

        let mSalesOrders = new Map(),   // Map for SalesOrders
            mSalesOrderFirstItems = new Map(),  // Map for SalesOrderFirstItems
            mSalesOrderItems = new Map(),   // Map for SalesOrderItems
            mSalesOrderPartners = new Map(),    // Map for SalesOrderPartners
            mBusinessPartner = new Map(),   // Map for BusinessPartner
            mProcessingRecordsToCentralMapping = new Map();

        for (const [iRecordIndex, record] of this.records.entries()) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({ ...record });
                mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({ ...record });
                continue;
            }

            if (record.salesDocumentNoSAP) {
                aSalesDocumentNoWhere.push(record.salesDocumentNoSAP);
            }

            if (record.salesItemNoSAP) {
                aSalesDocumentItemNOWhere.push(record.salesItemNoSAP);
            }
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
            // OLD: Destructuring that included BusinessPartner (BP) call here
            // const [
            //     { reason: anySalesOrderErr, value: aSalesOrders },
            //     { reason: anySalesOrderFirstItemErr, value: aSalesOrderFirstItems },
            //     { reason: anySalesOrderItemErr, value: aSalesOrderItems },
            //     { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
            //     { reason: anyBusinessPartnerErr, value: aBusinessPartners }, // <-- BP here (now disabled)
            // ] = await Promise.allSettled([
            //     /* queries... */,
            //     this.businesPartnerAPI.executeQuery(
            //         SELECT.from('A_BusinessPartnerAddress')
            //             .columns(['BusinessPartner', 'Language', 'HouseNumber', 'StreetName', 'CityName', 'PostalCode', 'Country', 'Region'])
            //             .where({ BusinessPartner: 'SDICA-CA' })
            //     )
            // ]);

            // NEW: Run without BP; we will fetch BP later only if SalesOrganization === '2500'
            const [
                { reason: anySalesOrderErr, value: aSalesOrders },
                { reason: anySalesOrderFirstItemErr, value: aSalesOrderFirstItems },
                { reason: anySalesOrderItemErr, value: aSalesOrderItems },
                { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
            ] = await Promise.allSettled([
                // this.salesOrderAPI.executeQuery(this._getSalesOrderQuery(aSalesDocumentNoWhere)),
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns(['SalesOrder', 'SalesOrderType', 'SalesOrganization', 'DistributionChannel', 'TransactionCurrency'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] }
                        })
                ),
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder', 'SalesOrderItem', 'HigherLevelItem', 'HigherLevelItemUsage',
                            'SalesOrderItemCategory', 'SalesOrderItemText', 'PurchaseOrderByCustomer',
                            'PurchaseOrderByShipToParty', 'UnderlyingPurchaseOrderItem', 'ExternalItemID',
                            'Material', 'MaterialByCustomer', 'PricingDate', 'PricingReferenceMaterial',
                            'BillingPlan', 'RequestedQuantity', 'RequestedQuantityUnit',
                            'RequestedQuantitySAPUnit', 'RequestedQuantityISOUnit', 'OrderQuantityUnit',
                            'OrderQuantitySAPUnit', 'OrderQuantityISOUnit', 'ConfdDelivQtyInOrderQtyUnit',
                            'ItemGrossWeight', 'ItemNetWeight', 'ItemWeightUnit', 'ItemWeightSAPUnit',
                            'ItemWeightISOUnit', 'ItemVolume', 'ItemVolumeUnit', 'ItemVolumeSAPUnit',
                            'ItemVolumeISOUnit', 'OriginallyRequestedMaterial', 'TransactionCurrency',
                            'NetAmount', 'TotalSDDocReferenceStatus', 'SDDocReferenceStatus',
                            'MaterialSubstitutionReason', 'MaterialGroup', 'MaterialPricingGroup',
                            'AdditionalMaterialGroup1', 'AdditionalMaterialGroup2',
                            'AdditionalMaterialGroup3', 'AdditionalMaterialGroup4',
                            'AdditionalMaterialGroup5', 'BillingDocumentDate', 'ContractAccount',
                            'AdditionalValueDays', 'ServicesRenderedDate', 'Batch', 'ProductionPlant',
                            'OriginalPlant', 'AltvBsdConfSubstitutionStatus', 'StorageLocation',
                            'DeliveryGroup', 'ShippingPoint', 'ShippingType', 'DeliveryPriority',
                            'DeliveryDateQuantityIsFixed', 'DeliveryDateTypeRule',
                            'IncotermsClassification', 'IncotermsTransferLocation',
                            'IncotermsLocation1', 'IncotermsLocation2', 'TaxAmount',
                            'ProductTaxClassification1', 'ProductTaxClassification2',
                            'ProductTaxClassification3', 'ProductTaxClassification4',
                            'ProductTaxClassification5', 'ProductTaxClassification6',
                            'ProductTaxClassification7', 'ProductTaxClassification8',
                            'ProductTaxClassification9', 'MatlAccountAssignmentGroup', 'CostAmount',
                            'CustomerPaymentTerms', 'FixedValueDate', 'CustomerGroup',
                            'SalesDocumentRjcnReason', 'ItemBillingBlockReason',
                            'SlsDocIsRlvtForProofOfDeliv', 'WBSElement', 'ProfitCenter',
                            'AccountingExchangeRate', 'ReferenceSDDocument',
                            'ReferenceSDDocumentItem', 'SDProcessStatus', 'DeliveryStatus',
                            'OrderRelatedBillingStatus', 'Subtotal1Amount', 'Subtotal2Amount',
                            'Subtotal3Amount', 'Subtotal4Amount', 'Subtotal5Amount',
                            'Subtotal6Amount', 'YY1_StrTimeMarkup_SD_SDI', 'YY1_DoubTimeMarkup_SD_SDI',
                            'YY1_LegacyPurchase_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_CustomURL_SDI',
                            'YY1_ExtensionUUID1_SDI', 'YY1_EEGroup_SD_SDI',
                            'YY1_DuplicateWeek_SD_SDI', 'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI',
                            'YY1_CommodityCode_SD_SDI', 'YY1_ExtensionUUID2_SDI',
                            'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_WNWorkOrder_SD_SDI', 'YY1_CategoryCode_SD_SDI',
                            'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI',
                            'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] },
                            SalesOrderItem: '10',
                            SalesOrderItemCategory: 'TADN'
                        }),
                ),
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder', 'SalesOrderItem', 'HigherLevelItem', 'HigherLevelItemUsage',
                            'SalesOrderItemCategory', 'SalesOrderItemText', 'PurchaseOrderByCustomer',
                            'PurchaseOrderByShipToParty', 'UnderlyingPurchaseOrderItem', 'ExternalItemID',
                            'Material', 'MaterialByCustomer', 'PricingDate', 'PricingReferenceMaterial',
                            'BillingPlan', 'RequestedQuantity', 'RequestedQuantityUnit',
                            'RequestedQuantitySAPUnit', 'RequestedQuantityISOUnit', 'OrderQuantityUnit',
                            'OrderQuantitySAPUnit', 'OrderQuantityISOUnit', 'ConfdDelivQtyInOrderQtyUnit',
                            'ItemGrossWeight', 'ItemNetWeight', 'ItemWeightUnit', 'ItemWeightSAPUnit',
                            'ItemWeightISOUnit', 'ItemVolume', 'ItemVolumeUnit', 'ItemVolumeSAPUnit',
                            'ItemVolumeISOUnit', 'OriginallyRequestedMaterial', 'TransactionCurrency',
                            'NetAmount', 'TotalSDDocReferenceStatus', 'SDDocReferenceStatus',
                            'MaterialSubstitutionReason', 'MaterialGroup', 'MaterialPricingGroup',
                            'AdditionalMaterialGroup1', 'AdditionalMaterialGroup2',
                            'AdditionalMaterialGroup3', 'AdditionalMaterialGroup4',
                            'AdditionalMaterialGroup5', 'BillingDocumentDate', 'ContractAccount',
                            'AdditionalValueDays', 'ServicesRenderedDate', 'Batch', 'ProductionPlant',
                            'OriginalPlant', 'AltvBsdConfSubstitutionStatus', 'StorageLocation',
                            'DeliveryGroup', 'ShippingPoint', 'ShippingType', 'DeliveryPriority',
                            'DeliveryDateQuantityIsFixed', 'DeliveryDateTypeRule',
                            'IncotermsClassification', 'IncotermsTransferLocation',
                            'IncotermsLocation1', 'IncotermsLocation2', 'TaxAmount',
                            'ProductTaxClassification1', 'ProductTaxClassification2',
                            'ProductTaxClassification3', 'ProductTaxClassification4',
                            'ProductTaxClassification5', 'ProductTaxClassification6',
                            'ProductTaxClassification7', 'ProductTaxClassification8',
                            'ProductTaxClassification9', 'MatlAccountAssignmentGroup', 'CostAmount',
                            'CustomerPaymentTerms', 'FixedValueDate', 'CustomerGroup',
                            'SalesDocumentRjcnReason', 'ItemBillingBlockReason',
                            'SlsDocIsRlvtForProofOfDeliv', 'WBSElement', 'ProfitCenter',
                            'AccountingExchangeRate', 'ReferenceSDDocument',
                            'ReferenceSDDocumentItem', 'SDProcessStatus', 'DeliveryStatus',
                            'OrderRelatedBillingStatus', 'Subtotal1Amount', 'Subtotal2Amount',
                            'Subtotal3Amount', 'Subtotal4Amount', 'Subtotal5Amount',
                            'Subtotal6Amount', 'YY1_StrTimeMarkup_SD_SDI', 'YY1_DoubTimeMarkup_SD_SDI',
                            'YY1_LegacyPurchase_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_CustomURL_SDI',
                            'YY1_ExtensionUUID1_SDI', 'YY1_EEGroup_SD_SDI',
                            'YY1_DuplicateWeek_SD_SDI', 'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI',
                            'YY1_CommodityCode_SD_SDI', 'YY1_ExtensionUUID2_SDI',
                            'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_WNWorkOrder_SD_SDI', 'YY1_CategoryCode_SD_SDI',
                            'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI',
                            'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] },
                            SalesOrderItem: { in: [...new Set(aSalesDocumentItemNOWhere)] }
                        }),
                ),
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderHeaderPartner')
                        .columns(['SalesOrder', 'Customer', 'AddressID', 'ReferenceBusinessPartner', 'PartnerFunction', 'Supplier'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] },
                            PartnerFunction: { in: ['SH', 'ZV', 'ZR'] }
                        })
                ),
                // OLD: BP query moved out (conditional below)
                // this.businesPartnerAPI.executeQuery(
                //     SELECT.from('A_BusinessPartnerAddress')
                //         .columns(['BusinessPartner', 'Language', 'HouseNumber', 'StreetName', 'CityName', 'PostalCode', 'Country', 'Region'])
                //         .where({
                //             BusinessPartner: 'SDICA-CA'
                //         })
                // )
            ]);

            if (!anySalesOrderErr?.message && aSalesOrders.length) {
                aSalesOrders.forEach((oSalesOrder) =>
                    mSalesOrders.set(oSalesOrder.SalesOrder, oSalesOrder)
                );
            }
            if (!anySalesOrderFirstItemErr?.message && aSalesOrderFirstItems.length) {
                aSalesOrderFirstItems.forEach((oSalesOrderFirstItem) =>
                    mSalesOrderFirstItems.set(oSalesOrderFirstItem.SalesOrder, oSalesOrderFirstItem)
                );
            }
            if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
                aSalesOrderItems.forEach((oSalesOrderItem) =>
                    mSalesOrderItems.set(oSalesOrderItem.SalesOrder, oSalesOrderItem)
                );
            }
            if (!anySalesOrderPartnerErr?.message && aSalesOrderPartners.length) {
                aSalesOrderPartners.forEach((oSalesOrderPartner) => {
                    if (!mSalesOrderPartners.has(oSalesOrderPartner.SalesOrder)) {
                        mSalesOrderPartners.set(oSalesOrderPartner.SalesOrder, []);
                    }
                    mSalesOrderPartners.get(oSalesOrderPartner.SalesOrder).push(oSalesOrderPartner)
                });
            }

            // OLD: Populate BP from earlier Promise.allSettled result (not used anymore)
            // if (!anyBusinessPartnerErr?.message && aBusinessPartners.length) {
            //     mBusinessPartner.set('SDICA-CA', aBusinessPartners[0]);
            // }

            // NEW: Conditionally fetch BP only if at least one SalesOrder has SalesOrganization === '2500'
            const needsBPFor2500 = [...mSalesOrders.values()].some(so => so.SalesOrganization === '2500');
            if (needsBPFor2500) {
                try {
                    const aBP = await this.businesPartnerAPI.executeQuery(
                        SELECT.from('A_BusinessPartnerAddress')
                            .columns(['BusinessPartner', 'Language', 'HouseNumber', 'StreetName', 'CityName', 'PostalCode', 'Country', 'Region'])
                            .where({ BusinessPartner: 'SDICA-CA' })
                    );
                    if (aBP?.length) {
                        mBusinessPartner.set('SDICA-CA', aBP[0]);
                    }
                } catch (e) {
                    this.LOG._error && this.LOG.error(`BP lookup failed: ${e.message}`);
                }
            }

        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        let mPayloadMap = new Map();

        for (const oRecord of aRecordsForProcessing) {
            const aErrors = [];
            const oSalesOrder = mSalesOrders.get(oRecord.salesDocumentNoSAP);
            const oSalesOrderFirstItem = mSalesOrderFirstItems.get(oRecord.salesDocumentNoSAP);
            const oSalesOrderItem = mSalesOrderItems.get(oRecord.salesDocumentNoSAP);
            const oSalesOrderPartner = mSalesOrderPartners.get(oRecord.salesDocumentNoSAP);
            const oBusinessPartner = mBusinessPartner.get('SDICA-CA');

            // OLD: direct find (could throw if oSalesOrderPartner undefined)
            // const supplier = oSalesOrderPartner.find(p =>
            //     ['ZV', 'ZR'].includes(p.PartnerFunction)
            // )?.Supplier;

            // NEW: null-safe supplier resolution
            const supplier = oSalesOrderPartner?.find(p =>
                ['ZV', 'ZR'].includes(p.PartnerFunction)
            )?.Supplier;

            if (!oSalesOrderItem?.SalesOrder) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }
            if (oSalesOrder.SalesOrderType === 'ZWSC') {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_ORDER_TYPE'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }
            if (!oSalesOrderFirstItem?.WBSElement) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }
            if (oSalesOrder.SalesOrganization !== '2500' && !oSalesOrderPartner) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SHIP_TO_ADDRESS_NOT_FOUND'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            // OLD: BP was required for all
            // if (!oBusinessPartner) {
            //     aErrors.push({
            //         record_ID: oRecord.ID,
            //         message: cds.i18n.messages.at('ERR_BP_SDICA_NOT_FOUND'),
            //     });
            //     aFailedRecordIDs.push(oRecord.ID);
            //     aErrorLogs.push(...aErrors);
            //     continue; // Skip this record
            // }

            // NEW: Require BP only when SalesOrganization === '2500'
            if (oSalesOrder.SalesOrganization === '2500' && !oBusinessPartner) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_BP_SDICA_NOT_FOUND'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (!oSalesOrderFirstItem.YY1_PurchasingDoc_SD_SDI || oRecord.purchaseDocumentItemSAP === '20') {
                // Prepare payload for PurchaseOrder creation
                const oPayload = this._prepareDataForPurchaseOrderCreate({
                    record: oRecord,
                    salesOrder: oSalesOrder,
                    salesOrderItem: oSalesOrderItem,
                    supplier: supplier
                });

                const oPurchaseOrderResults = await this.PurchaseOrderAPI.createPurchaseOrder(oPayload);

                if (oPurchaseOrderResults.PurchaseOrder) {
                    mPayloadMap.set(oRecord.ID, {
                        purchaseDocumentNoSAP: oPurchaseOrderResults.PurchaseOrder,
                        purchaseDocumentItemSAP: oRecord.salesItemNoSAP
                    });
                    oRecord.purchaseDocumentNoSAP = oPurchaseOrderResults.PurchaseOrder;
                    oRecord.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;

                    const item = this.records.find((record) => record.ID === oRecord.ID);
                    if (item) {
                        item.purchaseDocumentNoSAP = oPurchaseOrderResults.PurchaseOrder;
                        item.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;
                    }
                    await UPDATE(SowScInvoice)
                        .set({
                            valid: true,
                            processLevel_code: sProcessCode,
                        })
                        .where({ ID: oRecord.ID });
                    aPassedRecordIDs.push(oRecord.ID);

                    const itemKeys = [oSalesOrderItem.SalesOrderItem, oSalesOrderFirstItem.SalesOrderItem];

                    for (const itm of itemKeys) {
                        await this.salesOrderAPI.executeQuery(
                            UPDATE('A_SalesOrderItem')
                                .set({ YY1_PurchasingDoc_SD_SDI: oPurchaseOrderResults.PurchaseOrder })
                                .where({
                                    SalesOrder: oSalesOrder.SalesOrder,
                                    SalesOrderItem: itm
                                })
                        );
                    }
                } else if (oPurchaseOrderResults.error) {
                    aErrorLogs.push({
                        record_ID: oRecord.ID,
                        message: `${oPurchaseOrderResults.error}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(oRecord.ID);
                    LOG.error(
                        `Error processing record ID ${oRecord.ID}: ${oPurchaseOrderResults.error}`,
                    );
                    continue; // Skip this record
                }
            } else {
                const oItemPayload = this._prepareDataForPurchaseOrderUpdate({
                    record: oRecord,
                    salesOrder: oSalesOrder,
                    salesOrderFirstItem: oSalesOrderFirstItem,
                    salesOrderItem: oSalesOrderItem,
                    businessPartner: oBusinessPartner
                });

                const oPurchaseOrderItemResults = await this.PurchaseOrderAPI.createPurchaseOrderItem(oSalesOrderFirstItem.YY1_PurchasingDoc_SD_SDI, oItemPayload);

                if (oPurchaseOrderItemResults.value) {
                    mPayloadMap.set(oRecord.ID, {
                        purchaseDocumentNoSAP: oPurchaseOrderItemResults.value.PurchaseOrder,
                        purchaseDocumentItemSAP: oRecord.salesItemNoSAP
                    });
                    oRecord.purchaseDocumentNoSAP = oPurchaseOrderItemResults.value.PurchaseOrder;
                    oRecord.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;

                    const item = this.records.find((record) => record.ID === oRecord.ID);
                    if (item) {
                        item.purchaseDocumentNoSAP = oPurchaseOrderItemResults.value.PurchaseOrder;
                        item.purchaseDocumentItemSAP = oRecord.salesItemNoSAP;
                    }
                    await UPDATE(SowScInvoice)
                        .set({
                            valid: true,
                            processLevel_code: sProcessCode,
                        })
                        .where({ ID: oRecord.ID });
                    aPassedRecordIDs.push(oRecord.ID);

                    this.salesOrderAPI.executeQuery(
                        UPDATE('A_SalesOrderItem')
                            .set({ YY1_PurchasingDoc_SD_SDI: oPurchaseOrderItemResults.value.PurchaseOrder })
                            .where({
                                SalesOrder: oSalesOrder.SalesOrder,
                                SalesOrderItem: oSalesOrderItem.SalesOrderItem
                            })
                    );
                } else if (oPurchaseOrderItemResults.error) {
                    aErrorLogs.push({
                        record_ID: oRecord.ID,
                        message: `${oPurchaseOrderItemResults.error}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(oRecord.ID);
                    LOG.error(
                        `Error processing record ID ${oRecord.ID}: ${oPurchaseOrderItemResults.error}`,
                    );
                    continue; // Skip this record
                }
            }
        }

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(SowScInvoice)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }


        // Update the `purchaseDocumentNoSAP` and `purchaseDocumentItemSAP` field in `this.records` and the database
        this.records.forEach((oRecord) => {
            const oMapEntry = mPayloadMap?.get(oRecord.ID);
            // Update fields in memory
            if (oMapEntry) {
                oRecord.purchaseDocumentNoSAP = oMapEntry?.purchaseDocumentNoSAP;
                oRecord.purchaseDocumentItemSAP = oMapEntry?.purchaseDocumentItemSAP;
            }
        });

        // Create records to update using flatMap
        const aRecordsToUpdate = this.records.flatMap((oRecord) => {
            const oMapEntry = mPayloadMap?.get(oRecord.ID);
            return oMapEntry && oMapEntry?.purchaseDocumentNoSAP
                ? [
                    {
                        ID: oRecord.ID,
                        purchaseDocumentNoSAP: oMapEntry?.purchaseDocumentNoSAP,
                        purchaseDocumentItemSAP: oMapEntry?.purchaseDocumentItemSAP,
                    },
                ]
                : [];
        });

        if (aRecordsToUpdate.length) {
            await Promise.all(
                aRecordsToUpdate.map((oRecord) => {
                    const iRecordIndex = mProcessingRecordsToCentralMapping.get(oRecord.ID);
                    this.records[iRecordIndex].purchaseDocumentNoSAP = oRecord.purchaseDocumentNoSAP;
                    this.records[iRecordIndex].purchaseDocumentItemSAP = oRecord.purchaseDocumentItemSAP;
                    return UPDATE(SowScInvoice)
                        .set({
                            purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP,
                            purchaseDocumentItemSAP: oRecord.purchaseDocumentItemSAP,
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

    _getSalesOrderQuery(aSalesDocumentNoWhere) {
        // prettier-ignore
        return SELECT.from('A_SalesOrder', so => {
            so.SalesOrder,
                so.SalesOrderType,
                so.SalesOrganization,
                so.DistributionChannel,
                so.TransactionCurrency,
                so.to_Item((soItem) => {
                    soItem.SalesOrder,
                        soItem.SalesOrderItem,
                        soItem.WBSElement,
                        soItem.ProfitCenter,
                        soItem.Material,
                        soItem.OrderQuantityUnit,
                        soItem.ProductionPlant
                })
        }).where({
            SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] },
            SalesOrderItem: '10',
            SalesOrderItemCategory: 'TADN'
        })
    }

    _prepareDataForPurchaseOrderCreate({
        record,
        salesOrder,
        salesOrderItem,
        supplier
    }) {
        const oReturnData = {
            PurchaseOrderType: 'ZSC',
            CompanyCode: salesOrder.SalesOrganization,
            PurchasingOrganization: salesOrder.SalesOrganization,
            PurchasingGroup: salesOrder.DistributionChannel,
            Supplier: supplier,
            DocumentCurrency: salesOrder.TransactionCurrency,
            _PurchaseOrderItem: [{
                PurchaseOrderCategory: 'F',
                PurchaseOrderItem: record.salesItemNoSAP,    // need to check 
                Material: record.materialNo,
                Plant: salesOrderItem.ProductionPlant,
                PurchaseOrderQuantityUnit: salesOrderItem.OrderQuantityUnit,
                OrderQuantity: 1,
                NetPriceQuantity: 1,
                OrderPriceUnit: salesOrderItem.OrderQuantityUnit,
                DocumentCurrency: salesOrder.TransactionCurrency,
                NetPriceAmount: Number(record.vendorTotal),
                TaxCode: ['1200', '1500'].includes(salesOrder.SalesOrganization) ? 'I0' : salesOrder.SalesOrganization === '2500' ? 'C2' : '',
                TaxJurisdiction: ['1200', '1500'].includes(salesOrder.SalesOrganization) ? '36029A0015' : '0000000000',
                AccountAssignmentCategory: 'Z',
                YY1_SDDocumentPD_PDI: salesOrder.SalesOrder,
                YY1_WNWorkOrder_PDI: salesOrderItem.YY1_WNWorkOrder_SD_SDI,
                YY1_CommodityCode_PDI: salesOrderItem.YY1_CommodityCode_SD_SDI,
                YY1_CategoryCode_PDI: salesOrderItem.YY1_CategoryCode_SD_SDI,
                YY1_CostCenter_PDI: salesOrderItem.YY1_CostCenter_SD_SDI,
                YY1_SupplierInvoiceNum_PDI: salesOrderItem.YY1_SupplierInvoice_SD_SDI,
                YY1_WeekEnd_PDI: salesOrderItem.YY1_WeekEnd_SD_SDI,
                YY1_WNInvoice_PDI: record.wnInvoiceNo,
                _PurOrdAccountAssignment: [{
                    AccountAssignmentNumber: '1',
                    OrderQuantityUnit: salesOrderItem.OrderQuantityUnit,
                    Quantity: Number(salesOrderItem.RequestedQuantity),
                    DocumentCurrency: salesOrder.TransactionCurrency,
                    PurgDocNetAmount: Number(record.vendorTotal),
                    GLAccount: '',
                    ControllingArea: 'A000',
                    WBSElementExternalID: salesOrderItem.WBSElement
                }]
                // _PurOrdPricingElement: [{
                //     ConditionType: 'ZPAY',
                //     ConditionRateAmount: Number(record.vendorTotal)
                // }]
            }]
        }

        if (['SC_EXPENSE', 'SC_EXPENSE_NT'].includes(record.materialNo) && salesOrder.DistributionChannel === 'SC') {
            oReturnData._PurchaseOrderItem[0]._PurOrdAccountAssignment[0].GLAccount = '0000531010';
        } else if (salesOrder.DistributionChannel === 'SC') {
            oReturnData._PurchaseOrderItem[0]._PurOrdAccountAssignment[0].GLAccount = '0000530105';
        } else {
            oReturnData._PurchaseOrderItem[0]._PurOrdAccountAssignment[0].GLAccount = '0000540110';
        }

        return oReturnData;
    }

    _prepareDataForPurchaseOrderUpdate({
        record,
        salesOrder,
        salesOrderFirstItem,
        salesOrderItem,
        businessPartner
    }) {
        const oReturnData = {
            PurchaseOrder: salesOrderItem.YY1_PurchasingDoc_SD_SDI,
            PurchaseOrderItem: record.salesItemNoSAP,
            PurchaseOrderCategory: 'F',
            CompanyCode: salesOrder.SalesOrganization,
            Material: record.materialNo,
            Plant: salesOrderItem.ProductionPlant,
            PurchaseOrderQuantityUnit: salesOrderItem.OrderQuantityUnit,
            OrderQuantity: 1,
            NetPriceQuantity: 1,
            OrderPriceUnit: salesOrderItem.OrderQuantityUnit,
            DocumentCurrency: salesOrder.TransactionCurrency,
            NetPriceAmount: Number(record.vendorTotal),
            TaxCode: ['1200', '1500'].includes(salesOrder.SalesOrganization)
                ? 'I0'
                : salesOrder.SalesOrganization === '2500'
                    ? 'C2'
                    : '',
            TaxJurisdiction: ['1200', '1500'].includes(salesOrder.SalesOrganization)
                ? '36029A0015'
                : '0000000000',
            AccountAssignmentCategory: 'Z',
            YY1_SDDocumentPD_PDI: salesOrder.SalesOrder,
            YY1_WNWorkOrder_PDI: salesOrderItem.YY1_WNWorkOrder_SD_SDI,
            YY1_CommodityCode_PDI: salesOrderItem.YY1_CommodityCode_SD_SDI,
            YY1_CategoryCode_PDI: salesOrderItem.YY1_CategoryCode_SD_SDI,
            YY1_CostCenter_PDI: salesOrderItem.YY1_CostCenter_SD_SDI,
            YY1_SupplierInvoiceNum_PDI: salesOrderItem.YY1_SupplierInvoice_SD_SDI,
            YY1_WeekEnd_PDI: salesOrderItem.YY1_WeekEnd_SD_SDI,
            YY1_WNInvoice_PDI: record.wnInvoiceNo,
            _PurOrdAccountAssignment: [{
                PurchaseOrderItem: record.salesItemNoSAP,
                AccountAssignmentNumber: '1',
                GLAccount: '',
                ControllingArea: 'A000',
                WBSElementExternalID: salesOrderItem.WBSElement,
                Quantity: Number(salesOrderItem.RequestedQuantity),
                OrderQuantityUnit: salesOrderItem.OrderQuantityUnit,
                DocumentCurrency: salesOrder.TransactionCurrency,
                PurgDocNetAmount: Number(record.vendorTotal)
            }]
        };

        // ✅ Only add DeliveryAddress when we *expect* and *have* BP
        if (salesOrder.SalesOrganization === '2500' && businessPartner) {
            oReturnData._DeliveryAddress = {
                PurchaseOrder: salesOrderItem.YY1_PurchasingDoc_SD_SDI,
                PurchaseOrderItem: record.salesItemNoSAP,
                CorrespondenceLanguage: businessPartner.Language,
                HouseNumber: businessPartner.HouseNumber,
                StreetName: businessPartner.StreetName,
                CityName: businessPartner.CityName,
                PostalCode: businessPartner.PostalCode,
                Country: businessPartner.Country,
                Region: businessPartner.Region
            };
        }

        if (['SC_EXPENSE', 'SC_EXPENSE_NT'].includes(record.materialNo) &&
            salesOrder.DistributionChannel === 'SC') {
            oReturnData._PurOrdAccountAssignment[0].GLAccount = '0000531010';
        } else if (salesOrder.DistributionChannel === 'SC') {
            oReturnData._PurOrdAccountAssignment[0].GLAccount = '0000530105';
        } else {
            oReturnData._PurOrdAccountAssignment[0].GLAccount = '0000540110';
        }

        return oReturnData;
    }


    /*** Step B: MIRO (Incoming Invoice) creation ***/
    async processSupplierInvoice(sProcessCode, bBreakExecution) {

        const aRecordsForProcessing = [],
            aSkippedRecords = [],
            aErrorLogs = [],
            aPassedRecordIDs = [],
            aFailedRecordIDs = [];

        let aRecordIDs = [],
            aPurchaseOrderWhere = [],
            aPurchaseOrderItemWhere = [];

        let mPurchaseOrder = new Map(),     // Map for PurchaseOrder
            mPurchaseOrderItem = new Map(); // Map for PurchaseOrderItem

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({ ...record });
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({ ...record });
                continue;
            }

            if (record.purchaseDocumentNoSAP) {
                aPurchaseOrderWhere.push(record.purchaseDocumentNoSAP);
            }

            if (record.purchaseDocumentItemSAP) {
                aPurchaseOrderItemWhere.push(record.purchaseDocumentItemSAP);
            }
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
                { reason: anyPurchaseOrderErr, value: aPurchaseOrders },
                { reason: anyPurchaseOrderItemErr, value: aPurchaseOrderItems },
            ] = await Promise.allSettled([
                this.PurchaseOrderAPI.executeQuery(
                    SELECT.from('PurchaseOrder')
                        .columns(['PurchaseOrder', 'CompanyCode', 'DocumentCurrency', 'Supplier'])
                        .where({
                            PurchaseOrder: { in: [...new Set(aPurchaseOrderWhere)] }
                        })
                ),

                this.PurchaseOrderAPI.executeQuery(
                    SELECT.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder', 'PurchaseOrderItem', 'OrderQuantity', 'NetPriceAmount',
                            'TaxCode', 'TaxJurisdiction', 'Plant',
                            'PurchaseOrderQuantityUnit', 'Material'])
                        .where({
                            PurchaseOrder: { in: [...new Set(aPurchaseOrderWhere)] },
                            PurchaseOrderItem: { in: [...new Set(aPurchaseOrderItemWhere)] }
                        })
                )
            ]);

            if (!anyPurchaseOrderErr?.message && aPurchaseOrders.length) {
                aPurchaseOrders.forEach((oPurchaseOrder) =>
                    mPurchaseOrder.set(oPurchaseOrder.PurchaseOrder, oPurchaseOrder)
                );
            }
            if (!anyPurchaseOrderItemErr?.message && aPurchaseOrderItems.length) {
                aPurchaseOrderItems.forEach((oPurchaseOrderItem) => {
                    mPurchaseOrderItem.set(oPurchaseOrderItem.PurchaseOrder, oPurchaseOrderItem);
                });
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        try {
            for (const oRecord of aRecordsForProcessing) {
                const oPurchaseOrder = mPurchaseOrder.get(oRecord.purchaseDocumentNoSAP);
                const oPurchaseOrderItem = mPurchaseOrderItem.get(oRecord.purchaseDocumentNoSAP);

                let paymentBlockingReason;
                try {
                    const row = await this.supplierLFA1API.executeQuery(
                        SELECT.one
                            .from('YY1_Supplier_LFA1') // entity set per S/4 URL: .../YY1_SUPPLIER_LFA1_CDS/YY1_Supplier_LFA1
                            .columns(['Supplier', 'SupplierStandardCarrierAccess'])
                            .where({ Supplier: oPurchaseOrder?.Supplier })
                    );
                    const carrier = row?.SupplierStandardCarrierAccess;
                    paymentBlockingReason = carrier ? String(carrier).trim().slice(0, 2).toUpperCase() : undefined;
                } catch (e) {
                    LOG.error(`[MIRO] Supplier lookup failed for ${oPurchaseOrder?.Supplier}: ${e.message}`);
                }

                const oPayload = this._prepareDataForSupplierInvoiceCreate({
                    record: oRecord,
                    purchaseOrder: oPurchaseOrder,
                    purchaseOrderItem: oPurchaseOrderItem,
                    paymentBlockingReason
                });

                let result = await this.supplierInvoiceAPI.createSupplierInvoice(oPayload);

                if (result.SupplierInvoice) {
                    oRecord.invoiceDocumentNoSAP = result.SupplierInvoice;
                    oRecord.fiscalYearSAP = result.FiscalYear;

                    const item = this.records.find((record) => record.ID === oRecord.ID);
                    if (item) {
                        item.invoiceDocumentNoSAP = result.SupplierInvoice;
                        item.fiscalYearSAP = result.FiscalYear;
                    }

                    await UPDATE(SowScInvoice)
                        .set({
                            invoiceDocumentNoSAP: result.SupplierInvoice,
                            fiscalYearSAP: result.FiscalYear,
                            valid: true,
                            processLevel_code: sProcessCode,
                        })
                        .where({ ID: oRecord.ID });
                    aPassedRecordIDs.push(oRecord.ID);
                } else {
                    aErrorLogs.push({
                        record_ID: oRecord.ID,
                        message: `${result.error}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(oRecord.ID);
                    LOG.error(
                        `Error processing record ID ${oRecord.ID}: ${result.error}`,
                    );
                }
            }
        } catch (error) {
            LOG.error(`Critical error in processSupplierInvoice: ${error.message}`, { error });
        }

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(SowScInvoice)
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
            continue: aFailedRecordIDs.length === 0,
        };
    }

    _prepareDataForSupplierInvoiceCreate({
        record,
        purchaseOrder,
        purchaseOrderItem,
        paymentBlockingReason
    }) {
        const oReturnData = {
            CompanyCode: purchaseOrder.CompanyCode,
            DocumentDate: `/Date(${+moment()})/`,
            PostingDate: `/Date(${+moment()})/`,
            SupplierInvoiceIDByInvcgParty: purchaseOrder.PurchaseOrder,
            InvoicingParty: purchaseOrder.Supplier,
            DocumentCurrency: purchaseOrder.DocumentCurrency,
            InvoiceGrossAmount: purchaseOrderItem.NetPriceAmount.toString(),
            DueCalculationBaseDate: `/Date(${+moment()})/`,
            AccountingDocumentType: 'RE',
            AssignmentReference: record.wnInvoiceNo,
            PaymentBlockingReason: paymentBlockingReason,
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

module.exports = SOWscInvoice;