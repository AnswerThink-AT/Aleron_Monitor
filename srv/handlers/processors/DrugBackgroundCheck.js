const Processor = require('./BaseProcessor');
const cds = require('@sap/cds');
const moment = require('moment');
const LOG = cds.log('Monitor.Processor-DrugBackgroundCheck');
const ProcessLogger = require('../common/ProcessLogger');
const { SELECT, INSERT, UPDATE, DELETE } = require('@sap/cds/lib/ql/cds-ql');
const {
    determineConditionType
} = require('../common/pricingHelper');

// Import communicators as needed
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const SalesOrderComm = require('../communicators/SalesOrder');
const ProductComm = require('../communicators/Product');
const PurchaseOrder = require('../communicators/PurchaseOrder');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const SupplierInvoiceComm = require('../communicators/SupplierInvoice');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const BillingTypeComm = require('../communicators/BillingType');
const SupplierLFA1Comm = require('../communicators/SupplierLFA1'); // ADD

// List of required entities
const {
    Files,
    Drug_Background_Check,
    InterfaceSteps,
    FieldValidations,
    Vendor_VendorRemit,
    FieldValidations: {
        elements: {
            validation: { enum: mFieldValidationTypeEnum },
        },
    },
} = cds.entities('com.aleron.monitor');

const mPORequiredSAPEnum = {
    none: { val: '' },
    create_PO: { val: '1' },
    create_IC_PO: { val: '2' },
    create_PO_OLD: { val: 'X' }
};

// Define PORequiredSAP enum manually since it might not exist in the entity
// const mPORequiredSAPEnum = {
//     none: { val: 'NONE' },
//     create_PO: { val: 'CREATE_PO' }
// };

class DrugBackgroundCheckProcessor extends Processor {
    constructor(options) {
        super(options);
        this.recordsEntity = 'com.aleron.monitor.Drug_Background_Check';
        this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);


        // Initialize any processor-specific properties
        this.businessPartnerAPI = null;
        this.salesOrderAPI = null;
        this.productAPI = null;
        this.purchaseOrderAPI = null;
        this.supplierInvoiceAPI = null;
        this.empCustInfoAPI = null;
        this.billingTypeAPI = null;
        this.supplierLFA1API = null; // ADD

    }

    prepareCommunicators() {
        this.LOG._info && this.LOG.info('Preparing Communicators');
        this.businessPartnerAPI = new BusinessPartnerComm();
        this.salesOrderAPI = new SalesOrderComm();
        this.productAPI = new ProductComm();
        this.purchaseOrderAPI = new PurchaseOrder();
        this.empCustInfoAPI = new EmpCustInfoComm();
        this.supplierInvoiceAPI = new SupplierInvoiceComm();
        this.billingTypeAPI = new BillingTypeComm();
        this.supplierLFA1API = new SupplierLFA1Comm();      // ADD

    }

    _getColumnsForFetch(sEntity) {
        const mEntityColumns = {
            'com.aleron.monitor.Drug_Background_Check': [
                // Standard fields
                'ID', 'file_ID', 'processLevel_code', 'valid',

                // Drug Background Check specific fields
                'contractNo',
                'wnInvoiceNo',
                'employeeNo',
                'workOrderWN',
                'salesDocumentType',
                'expenseType',
                'project',
                'weekEndDate',
                'amount',
                'currency',
                'customerPoNoLabor',

                // SAP fields
                'salesDocumentNoSAP',
                'salesItemNoSAP',
                'purchaseDocumentNoSAP',
                'purchaseDocumentItemSAP',
                //  'purchaseItemNoSAP',
                // 'rejectionReason',

                // VC Data fields
                'vcData1UUID',
                'vcData2UUID',
                'PORequiredSAP',

                // Custom fields (from customerFields annotation)
                'customerFieldName1', 'customerFieldValue1', 'customerFieldName2', 'customerFieldValue2', 'customerFieldName3', 'customerFieldValue3',
                'customerFieldName4', 'customerFieldValue4', 'customerFieldName5', 'customerFieldValue5', 'customerFieldName6', 'customerFieldValue6',
                'customerFieldName7', 'customerFieldValue7', 'customerFieldName8', 'customerFieldValue8', 'customerFieldName9', 'customerFieldValue9',
                'customerFieldName10', 'customerFieldValue10', 'customerFieldName11', 'customerFieldValue11', 'customerFieldName12', 'customerFieldValue12',
                'customerFieldName13', 'customerFieldValue13', 'customerFieldName14', 'customerFieldValue14', 'customerFieldName15', 'customerFieldValue15'
            ]
        };

        return [...new Set(mEntityColumns[sEntity])];
    }

    async validateRecords(sProcessCode, bBreakExecution) {
        const aRecordsForProcessing = [];
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        this.updateProcessingState(sProcessCode);

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                aRecordsForProcessing.push({ ...record });
            } else {
                aSkippedRecords.push({ ...record });
            }

        }

        if (!aRecordsForProcessing.length) {
            return {
                hasError: false,
                continue: true,
            };
        }

        // Get field validations for this interface type
        const [
            { reason: anyFieldValidationErr, value: aFieldValidations }
        ] = await Promise.allSettled([
            SELECT.from(FieldValidations)
                .columns(['field', 'validation'])
                .where({
                    interfaceType_ID: this.file.interfaceType_ID,
                    validation: {
                        in: [mFieldValidationTypeEnum.blank.val, mFieldValidationTypeEnum.mandatory.val]
                    }
                })
        ]);

        if (anyFieldValidationErr) {
            LOG._error && LOG.error(anyFieldValidationErr.message);
        }

        // Create sets for mandatory and blank field validations
        const stMandatoryFields = new Set(
            aFieldValidations ? aFieldValidations.flatMap((record) =>
                record.validation === mFieldValidationTypeEnum.mandatory.val ? record.field : []
            ) : []
        );
        const stBlankFields = new Set(
            aFieldValidations ? aFieldValidations.flatMap((record) =>
                record.validation === mFieldValidationTypeEnum.blank.val ? record.field : []
            ) : []
        );

        // Validate each record
        for (const record of aRecordsForProcessing) {
            let hasRecordFailed = false;

            // Validate field validations
            const fieldValidationResult = this._validateFieldValidations({
                stMandatoryFields,
                stBlankFields,
                oRecord: record
            });

            if (fieldValidationResult.hasError) {
                aErrorLogs.push(...fieldValidationResult.errors);
                aErrorLogs[aErrorLogs.length - 1].process_code = sProcessCode;
                aFailedRecordIDs.push(record.ID);
                hasRecordFailed = true;
            }

            // Add your custom validation logic here
            if (!hasRecordFailed) {

                // if (!record.contractNo) {
                //     aErrorLogs.push({
                //         record_ID: record.ID,
                //         message: 'Contract number is required'
                //     });
                //     aFailedRecordIDs.push(record.ID);
                //     hasRecordFailed = true;
                // }

                // if (!record.employeeNo) {
                //     aErrorLogs.push({
                //         record_ID: record.ID,
                //         message: 'Employee number is required'
                //     });
                //     aFailedRecordIDs.push(record.ID);
                //     hasRecordFailed = true;
                // }

                if (!record.workOrderWN) {
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: 'Work order is required'
                        , process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                    hasRecordFailed = true;
                }

                // Validate salesDocumentType
                if (!hasRecordFailed && record.salesDocumentType) {
                    if (!['MS', 'CP'].includes(record.salesDocumentType)) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: 'Record Type must be "MS" or "CP"', process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        hasRecordFailed = true;
                    }
                }

                // Validate expenseType
                if (!hasRecordFailed && record.expenseType) {
                    if (!['BACK', 'DRUG', 'NON'].includes(record.expenseType)) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: 'Expense type must be "DRUG" or "BACK" or "NON"', process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        hasRecordFailed = true;
                    }
                }

                // New validation logic for workorder and duplicate check
                if (!hasRecordFailed && record.workOrderWN) {
                    try {
                        // Step 1: Get SalesOrder from workorder using YY1_WNWorkOrder_SD_SDI
                        const salesOrderResult = await this._getSalesOrderByWorkOrder(record.workOrderWN);

                        if (!salesOrderResult.success) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Failed to get SalesOrder for workorder ${record.workOrderWN}: ${salesOrderResult.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            hasRecordFailed = true;
                        } else if (salesOrderResult.data) {
                            const salesOrder = salesOrderResult.data;
                            record.salesDocumentNoSAP = salesOrder.SalesOrder;
                            // Step 2: Get SalesOrder Header Data (Customer Group)
                            const headerResult = await this._getSalesOrderHeader(salesOrder.SalesOrder);

                            if (!headerResult.success) {
                                aErrorLogs.push({
                                    record_ID: record.ID,
                                    message: `Failed to get SalesOrder header for ${salesOrder.SalesOrder}: ${headerResult.message}`, process_code: sProcessCode
                                });
                                aFailedRecordIDs.push(record.ID);
                                hasRecordFailed = true;
                            } else {
                                const header = headerResult.data;
                                const customerGroup = header.CustomerGroup;

                                // Step 3: Check if Customer Group is Z1 (IC Case)
                                let wnInvoice = record.wnInvoiceNo || '';

                                if (customerGroup === 'ZI') {
                                    // Step 4: If Customer Group is Z1, append "IC" to WN_INV
                                    wnInvoice = wnInvoice + 'IC';
                                }

                                // Step 5: Check for duplicate lines in SO items where YY1_WNInvoice_SD_SDI = WN_INV

                                const duplicateCheckResult = await this._checkDuplicateInvoiceLines(salesOrder.SalesOrder, wnInvoice);
                                if (!duplicateCheckResult.success) {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: `Failed to check duplicate invoice lines: ${duplicateCheckResult.message}`, process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                } else if (duplicateCheckResult.hasDuplicates) {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: `Duplicate lines not allowed for invoice ${wnInvoice} in SalesOrder ${salesOrder.SalesOrder}`, process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                }
                            }
                        }
                    } catch (err) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error during workorder validation: ${err.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        hasRecordFailed = true;
                    }
                }
            }

            // If record passed all validations
            if (!hasRecordFailed) {
                aPassedRecordIDs.push(record.ID);
            }
        }

        // Update exclusion set
        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords.map(record => record.ID),
            bBreakExecution
        });

        // Mark records as valid/invalid
        // if (aPassedRecordIDs.length > 0) {
        //     await ProcessLogger.removeLogs(aPassedRecordIDs);
        //     await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
        // }

        // if (aFailedRecordIDs.length > 0) {
        //     await ProcessLogger.addLogs(aErrorLogs);
        //     await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
        // }
        if (aErrorLogs.length) {
            try {
                await Promise.allSettled([
                    ProcessLogger.addLogs(aErrorLogs),
                    // this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
                    ...aFailedRecordIDs.filter(recordID => {
                        const record = this.records.find(r => r.ID === recordID);
                        let recordProcessLevelCode = sProcessCode;
                        if (record) {
                            if (record.processLevel_code === '0') {
                                recordProcessLevelCode = '1';
                            } else if (record.processLevel_code === '1') {
                                recordProcessLevelCode = '1';
                            }
                            // else if (record.processLevel_code === '2' && !record.valid) {
                            //   recordProcessLevelCode = '1';
                            // } 
                            else {
                                recordProcessLevelCode = record.processLevel_code;
                            }
                        }
                        return recordProcessLevelCode === '1';
                    }).map(recordID => {
                        const record = this.records.find(r => r.ID === recordID);
                        let recordProcessLevelCode = sProcessCode;
                        if (record) {
                            if (record.processLevel_code === '0') {
                                recordProcessLevelCode = '1';
                            } else if (record.processLevel_code === '1') {
                                recordProcessLevelCode = '1';
                            }
                            // else if (record.processLevel_code === '2' && !record.valid) {
                            //   recordProcessLevelCode = '1';
                            // } 
                            else {
                                recordProcessLevelCode = record.processLevel_code;
                            }
                        }
                        return UPDATE(Drug_Background_Check)
                            .set({ valid: false, processLevel_code: recordProcessLevelCode })
                            .where({ ID: recordID });
                    }),
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
            await ProcessLogger.removeLogs(aPassedRecordIDs);
            // await Promise.allSettled(
            //     aPassedRecordIDs.map(id => {
            //         const rec = this.records.find(r => r.ID === id);
            //         if (rec && rec.contractNo) {
            //             return UPDATE(Drug_Background_Check)
            //                 .set({ contractNo: rec.contractNo })
            //                 .where({ ID: id });
            //         }
            //         return Promise.resolve();
            //     })
            // );

            await Promise.allSettled([
                // ProcessLogger.removeLogs(aPassedRecordIDs),
                // this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
                ...aPassedRecordIDs.filter(recordID => {
                    const record = this.records.find(r => r.ID === recordID);
                    let recordProcessLevelCode = sProcessCode;
                    if (record) {
                        if (record.processLevel_code === '0') {
                            recordProcessLevelCode = '1';
                        } else if (record.processLevel_code === '1') {
                            recordProcessLevelCode = '1';
                        }
                        //  else if (record.processLevel_code === '2' && !record.valid) {
                        //   recordProcessLevelCode = '1';
                        // }
                        else {
                            recordProcessLevelCode = record.processLevel_code;
                        }
                    }
                    return recordProcessLevelCode === '1';
                }).map(recordID => {
                    const record = this.records.find(r => r.ID === recordID);
                    let recordProcessLevelCode = sProcessCode;
                    if (record) {
                        if (record.processLevel_code === '0') {
                            recordProcessLevelCode = '1';
                        } else if (record.processLevel_code === '1') {
                            recordProcessLevelCode = '1';
                        }
                        // else if (record.processLevel_code === '2' && !record.valid) {
                        //   recordProcessLevelCode = '1';
                        // } 
                        else {
                            recordProcessLevelCode = record.processLevel_code;
                        }
                    }
                    return UPDATE(Drug_Background_Check)
                        .set({ valid: true, processLevel_code: recordProcessLevelCode })
                        .where({ ID: recordID });
                }),
            ]);
            this.LOG._info &&
                this.LOG.info(cds.i18n.messages.at('INFO_RECORDS_UPDATED', [sProcessCode, 'All']));
        }
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aPassedRecordIDs.length > 0,
        };
    }

    _validateFieldValidations({ stMandatoryFields, stBlankFields, oRecord }) {
        const errors = [];

        // Check mandatory fields
        for (const field of stMandatoryFields) {
            if (!oRecord[field] || oRecord[field].toString().trim() === '') {
                errors.push({
                    record_ID: oRecord.ID,
                    message: `Mandatory field '${field}' is empty`
                });
            }
        }

        // Check blank fields
        for (const field of stBlankFields) {
            if (oRecord[field] && oRecord[field].toString().trim() !== '') {
                errors.push({
                    record_ID: oRecord.ID,
                    message: `Field '${field}' should be blank`
                });
            }
        }

        return {
            hasError: errors.length > 0,
            errors
        };
    }

    /**
     * Get SalesOrder by workorder using YY1_WNWorkOrder_SD_SDI field
     * @param {string} workOrder - The work order number
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderByWorkOrder(workOrder) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'Material', 'SalesOrderItemCategory'])
                .where({
                    YY1_WNWorkOrder_SD_SDI: workOrder
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No SalesOrder found for workorder ${workOrder}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder by workorder: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get SalesOrder Header Data including Customer Group
     * @param {string} salesOrder - The SalesOrder number
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderHeader(salesOrder) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrder')
                .columns(['SalesOrder', 'CustomerGroup', 'SalesOrganization', 'DistributionChannel', 'SoldToParty', 'OrganizationDivision'])
                .where({
                    SalesOrder: salesOrder
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: false,
                    message: `SalesOrder header not found for ${salesOrder}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder header: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Check for duplicate invoice lines in SalesOrder items
     * @param {string} salesOrder - The SalesOrder number
     * @param {string} wnInvoice - The WN Invoice number to check
     * @returns {Object} Result object with success, hasDuplicates, and message properties
     */
    async _checkDuplicateInvoiceLines(salesOrder, wnInvoice) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    hasDuplicates: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'Material', 'SalesOrderItemCategory'])
                .where({
                    // SalesOrder: salesOrder,
                    YY1_WNInvoice_SD_SDI: wnInvoice
                });

            const results = await this.salesOrderAPI.executeQuery(query);

            if (!results || results.length === 0) {
                return {
                    success: true,
                    hasDuplicates: false,
                    message: null
                };
            }


            // If there are entries, it means duplicates exist
            return {
                success: true,
                hasDuplicates: true,
                message: `Found ${results.length} existing line(s) with invoice ${wnInvoice}`,
                data: results
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error checking duplicate invoice lines: ${err.message}`);
            return {
                success: false,
                hasDuplicates: false,
                message: err.message
            };
        }
    }

    /**
     * General routine for processing SalesOrder updates
     * @param {Array} records - Array of records to process
     * @param {string} processCode - The process code
     * @param {boolean} breakExecution - Whether to break execution on error
     * @returns {Object} Result object with success, processed, failed, and message properties
     */
    // async processSalesOrder(sProcessCode, breakExecution) {
    //     const processedRecords = [];
    //     const failedRecords = [];
    //     const errorLogs = [];

    //     const aRecordsForProcessing = [];
    //     const aErrorLogs = [];
    //     const aFailedRecordIDs = [];
    //     const aPassedRecordIDs = [];
    //     const aSkippedRecords = [];
    //     let aRecordIDs = [];
    //     let mCustomerFieldNameValue = new Map();
    //     let mSalesOrders = new Map();
    //     let aCustomerFieldNamesWhere = [];
    //     let mProcessingRecordsToCentralMapping = new Map();

    //     for (const [iRecordIndex, record] of this.records.entries()) {
    //         if (this.shouldRecordProcess(record, sProcessCode)) {
    //             // If record is on step level & is already valid, then skip
    //             aRecordsForProcessing.push({ ...record });
    //             mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
    //             aRecordIDs.push(record.ID);
    //         } else {
    //             aSkippedRecords.push({ ...record });
    //             continue;
    //         }

    //         ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));
    //     }

    //     await ProcessLogger.removeLogs(aRecordIDs);

    //     this.updateProcessingState(sProcessCode);

    //     // for (const record of this.records) {
    //     //     if (this.shouldRecordProcess(record, sProcessCode)) {
    //     //         aRecordsForProcessing.push({ ...record });
    //     //     } else {
    //     //         aSkippedRecords.push({ ...record });
    //     //     }
    //     // }

    //     if (!aRecordsForProcessing.length) {
    //         return {
    //             hasError: false,
    //             continue: true,
    //         };
    //     }

    //     try {
    //         const [
    //             { reason: anyCustomFieldsTOVCErr, value: aCustomFieldsTOVC },
    //         ] = await Promise.allSettled([
    //              SELECT.from('com.aleron.monitor.CustomFieldsToVC')
    //                 .columns(['customValue', 'fieldName'])
    //                 .where({ customValue: { in: aCustomerFieldNamesWhere } }),
    //         ]);

    //           if (!anyCustomFieldsTOVCErr?.message && aCustomFieldsTOVC.length) {
    //             for (const [recordID, customerfieldEntries] of mCustomerFieldNameValue.entries()) {
    //                 customerfieldEntries.forEach(entry => {
    //                     // Check if the customerFieldName is in the data array
    //                     const matchedData = aCustomFieldsTOVC.find(o => o.customValue === entry.customerFieldName);
    //                     if (matchedData) {
    //                         // Add fieldName to the entry
    //                         entry.fieldName = matchedData.fieldName;
    //                     }
    //                 });
    //             }
    //         }
    //     } catch (err) {
    //         this.LOG._error && this.LOG.error(err.message);
    //     }

    //     let mPayloadMap = new Map();
    //     let aPayloads = [];
    //     let mSalesOrder = new Map();
    //     // this.LOG._info && this.LOG.info(`Starting SalesOrder updates for ${records.length} records`);


    //     for (const record of aRecordsForProcessing) {
    //         try {
    //             // Step 1: Check if salesItemNoSAP is blank - if not blank, skip the step
    //             if (record.salesItemNoSAP && record.salesItemNoSAP.toString().trim() !== '') {
    //                 this.LOG._info && this.LOG.info(`Skipping record ${record.ID} - salesItemNoSAP is not blank: ${record.salesItemNoSAP}`);
    //                 // if (record.salesItemNoSAP) {
    //                 //     // SalesOrder already created, only VC Data needs to be checked further
    //                 aPassedRecordIDs.push(record.ID);
    //                 mPayloadMap.set(record.ID, {
    //                     salesOrder: record.salesDocumentNoSAP,
    //                     salesOrderItem: record.salesItemNoSAP,
    //                     salesOrderICUpdateRequired: record.salesOrderICUpdateRequired,
    //                     p2SalesDocumentNoSAP: record.p2SalesDocumentNoSAP,
    //                     PORequiredSAP: record.PORequiredSAP
    //                 });
    //                 //     // continue; // Skip this record
    //                 // }
    //                 continue;
    //             }

    //             // Step 2: Check salesDocumentType and pull SalesOrder data
    //             if (record.salesDocumentType === 'CP' || record.salesDocumentType === 'CR') {
    //                 this.LOG._info && this.LOG.info(`Processing record ${record.ID} with salesDocumentType: ${record.salesDocumentType}`);

    //                 // Initialize variables
    //                 let varSoNum = null;
    //                 let varDcIc = null;
    //                 let varCustGrpIc = null;
    //                 let varworkOrderWN = null;
    //                 let sapP2So = false;
    //                 let sapP2Vbeln = null;

    //                 // First attempt: Pull SalesOrder where SalesOrder = workOrderWN and item number = 000010 and Distribution channel = CP or CR
    //                 const firstAttemptResult = await this._getSalesOrderByWorkOrderAndDistributionChannel(
    //                     record.workOrderWN,
    //                     '000010',
    //                     [record.salesDocumentType]
    //                 );

    //                 if (firstAttemptResult.success && firstAttemptResult.data) {
    //                     varSoNum = firstAttemptResult.data.SalesOrder;
    //                     this.LOG._info && this.LOG.info(`Found SalesOrder (first attempt): ${varSoNum}`);
    //                 } else {
    //                     // Second attempt: Pull SalesOrder where YY1_WNWorkOrder_SD_SDI = workOrderWN and item number = 000010 and Distribution channel = CP or CR
    //                     const secondAttemptResult = await this._getSalesOrderByworkOrderWNAndDistributionChannel(
    //                         record.workOrderWN,
    //                         '000010',
    //                         [record.salesDocumentType]
    //                     );

    //                     if (secondAttemptResult.success && secondAttemptResult.data) {
    //                         varSoNum = secondAttemptResult.data.SalesOrder;
    //                         this.LOG._info && this.LOG.info(`Found SalesOrder (second attempt): ${varSoNum}`);

    //                         // IC logic - execute when we find entry in second attempt (IC case)
    //                         // Pull Distribution channel as VAR_DC_IC and YY1_WNWorkOrder_SD_SDI from Sales Order Header and Sales Order Item API
    //                         const headerItemResult = await this._getSalesOrderHeaderAndItem(varSoNum, '000010');

    //                         if (headerItemResult.success && headerItemResult.data) {
    //                             varDcIc = headerItemResult.data.DistributionChannel;
    //                             varworkOrderWN = headerItemResult.data.YY1_WNWorkOrder_SD_SDI;
    //                             this.LOG._info && this.LOG.info(`Found Distribution Channel: ${varDcIc}, WN WorkOrder: ${varworkOrderWN}`);
    //                         }

    //                         // Pull Customer group into VAR_CUST_GRP_IC from Sales order Business data where VBELN = VAR_SO_NUM and Item number = 000000
    //                         const businessDataResult = await this._getSalesOrderBusinessData(varSoNum, '000000');

    //                         if (businessDataResult.success && businessDataResult.data) {
    //                             varCustGrpIc = businessDataResult.data.CustomerGroup;
    //                             this.LOG._info && this.LOG.info(`Found Customer Group: ${varCustGrpIc}`);
    //                         }

    //                         // Check conditions for setting SAP_P_2_SO and SAP_P_2_VBELN
    //                         if (varDcIc === 'IC' || varCustGrpIc === 'ZI') {
    //                             sapP2So = true;
    //                             sapP2Vbeln = varworkOrderWN;
    //                             this.LOG._info && this.LOG.info(`Setting SAP_P_2_SO = true, SAP_P_2_VBELN = ${sapP2Vbeln}`);
    //                         }

    //                         // Store the variables in the record for later use
    //                         record._varSoNum = varSoNum;
    //                         record._varDcIc = varDcIc;
    //                         record._varCustGrpIc = varCustGrpIc;
    //                         record._varworkOrderWN = varworkOrderWN;
    //                         record.salesOrderICUpdateRequired = sapP2So;
    //                         record.p2SalesDocumentNoSAP = sapP2Vbeln;
    //                     } else {
    //                         // No entry found in second attempt - Error
    //                         errorLogs.push({
    //                             record_ID: record.ID,
    //                             message: `No Contract Payroll Sales order found for workorder ${record.workOrderWN} and distribution channel ${record.salesDocumentType}`
    //                         });
    //                         failedRecords.push(record.ID);
    //                         continue;
    //                     }
    //                 }
    //             }

    //             // Step 2b: Check salesDocumentType = MS logic
    //             if (record.salesDocumentType === 'MS') {
    //                 this.LOG._info && this.LOG.info(`Processing record ${record.ID} with salesDocumentType: MS`);

    //                 // Initialize variables
    //                 let varLifnrZr = null;
    //                 let varLifnrMwebwe = null;
    //                 let varSoPricGrp = null;
    //                 let poRequiredSAP = null;

    //                 // Pull LIFNR vendor number into VAR_LIFNR_ZR from Sales order partner API
    //                 const salesOrderResult = await this._getSalesOrderByWorkOrder(record.workOrderWN);
    //                 const salesOrder = salesOrderResult.data;
    //                 record.salesDocumentNoSAP = salesOrder.SalesOrder;
    //                 // const partnerResult = await this._getSalesOrderPartner(record.workOrderWN, '000000', 'ZR');
    //                 const partnerResult = await this._getSalesOrderPartner(record.salesDocumentNoSAP, '000000', 'ZR');

    //                 if (partnerResult.success && partnerResult.data) {
    //                     varLifnrZr = partnerResult.data.Supplier;
    //                     this.LOG._info && this.LOG.info(`Found LIFNR_ZR: ${varLifnrZr}`);

    //                     // If VAR_LIFNR_ZR is not blank
    //                     if (varLifnrZr && varLifnrZr.toString().trim() !== '') {
    //                         // Pull ZLIFNR_ZR into VAR_LIFNR_MWEBWE from ZSD_MBEWBE where LIFNR = VAR_LIFNR_ZR
    //                         const mwebweResult = await this._getZsdMbebwe(varLifnrZr);

    //                         if (mwebweResult.success && mwebweResult.data) {
    //                             varLifnrMwebwe = mwebweResult.data.ZLIFNR_ZR;
    //                             this.LOG._info && this.LOG.info(`Found VAR_LIFNR_MWEBWE: ${varLifnrMwebwe}`);

    //                             // If there is an entry
    //                             if (varLifnrMwebwe && varLifnrMwebwe.toString().trim() !== '') {
    //                                 poRequiredSAP = mPORequiredSAPEnum.none.val; // don't create PO
    //                                 this.LOG._info && this.LOG.info(`Setting PORequiredSAP = none (don't create PO) - found entry in ZSD_MBEWBE`);
    //                             } else {
    //                                 poRequiredSAP = mPORequiredSAPEnum.create_PO.val; // Create PO
    //                                 this.LOG._info && this.LOG.info(`Setting PORequiredSAP = create_PO - no entry in ZSD_MBEWBE`);
    //                             }
    //                         } else {
    //                             poRequiredSAP = mPORequiredSAPEnum.create_PO.val; // Create PO
    //                             this.LOG._info && this.LOG.info(`Setting PORequiredSAP = create_PO - no entry found in ZSD_MBEWBE`);
    //                         }
    //                     } else {
    //                         // VAR_LIFNR_ZR is blank, check price group
    //                         // Pull data Price group (customer) into VAR_SO_PRIC_GRP from Sales Document: Business Data
    //                         const businessDataResult = await this._getSalesOrderBusinessData(record.workOrderWN, '000000');

    //                         if (businessDataResult.success && businessDataResult.data) {
    //                             varSoPricGrp = businessDataResult.data.CustomerGroup;
    //                             this.LOG._info && this.LOG.info(`Found Price Group: ${varSoPricGrp}`);

    //                             // Check if Price group (customer) = ZM
    //                             if (varSoPricGrp === 'ZM') {
    //                                 poRequiredSAP = mPORequiredSAPEnum.none.val; // don't create PO
    //                                 this.LOG._info && this.LOG.info(`Setting PORequiredSAP = none (don't create PO) - Price group is ZM`);
    //                             } else {
    //                                 poRequiredSAP = mPORequiredSAPEnum.create_PO.val; // Create PO
    //                                 this.LOG._info && this.LOG.info(`Setting PORequiredSAP = create_PO - Price group is not ZM`);
    //                             }
    //                         } else {
    //                             poRequiredSAP = mPORequiredSAPEnum.create_PO.val; // Create PO
    //                             this.LOG._info && this.LOG.info(`Setting PORequiredSAP = create_PO - no business data found`);
    //                         }
    //                     }
    //                 } else {
    //                     // No partner found, check price group
    //                     // const businessDataResult = await this._getSalesOrderBusinessData(record.workOrderWN, '000000');
    //                     const businessDataResult = await this._getSalesOrderBusinessData(record.salesDocumentNoSAP, '000000');

    //                     if (businessDataResult.success && businessDataResult.data) {
    //                         varSoPricGrp = businessDataResult.data.CustomerGroup;
    //                         this.LOG._info && this.LOG.info(`Found Price Group: ${varSoPricGrp}`);

    //                         // Check if Price group (customer) = ZM
    //                         if (varSoPricGrp === 'ZM') {
    //                             poRequiredSAP = mPORequiredSAPEnum.none.val; // don't create PO
    //                             this.LOG._info && this.LOG.info(`Setting PORequiredSAP = none (don't create PO) - Price group is ZM`);
    //                         } else {
    //                             poRequiredSAP = mPORequiredSAPEnum.create_PO.val; // Create PO
    //                             this.LOG._info && this.LOG.info(`Setting PORequiredSAP = create_PO - Price group is not ZM`);
    //                         }
    //                     } else {
    //                         poRequiredSAP = mPORequiredSAPEnum.create_PO.val; // Create PO
    //                         this.LOG._info && this.LOG.info(`Setting PORequiredSAP = create_PO - no business data found`);
    //                     }
    //                 }

    //                 // Store the variables in the record for later use
    //                 record._varLifnrZr = varLifnrZr;
    //                 record._varLifnrMwebwe = varLifnrMwebwe;
    //                 record._varSoPricGrp = varSoPricGrp;
    //                 record._varSoNum = record.salesDocumentNoSAP;
    //                 // Store PO required status in record for later use
    //                 record._poRequiredSAP = poRequiredSAP;
    //             }

    //             // Step 2c: Get SO item partner - Sold to using the SalesOrder from previous steps
    //             if (record._varSoNum) {
    //                 this.LOG._info && this.LOG.info(`Getting SO item partner for record ${record.ID}`);

    //                 // Use the SalesOrder from previous steps
    //                 const salesOrderToUse = record._varSoNum || record.workOrderWN;

    //                 // Get SO item partner - Sold to
    //                 const soldToPartnerResult = await this._getSalesOrderItemPartner(salesOrderToUse, '000010', 'WE');

    //                 if (soldToPartnerResult.success && soldToPartnerResult.data) {
    //                     record._soldToPartner = soldToPartnerResult.data.Customer;
    //                     this.LOG._info && this.LOG.info(`Found Sold To Partner: ${record._soldToPartner}`);
    //                 } else {
    //                     this.LOG._warn && this.LOG.warn(`No Sold To Partner found for SalesOrder: ${salesOrderToUse}`);
    //                     record._soldToPartner = null;
    //                 }

    //                 // Get SO item partner - Bill to
    //                 const billToPartnerResult = await this._getSalesOrderItemPartner(salesOrderToUse, '000010', 'RE');

    //                 if (billToPartnerResult.success && billToPartnerResult.data) {
    //                     record._billToPartner = billToPartnerResult.data.Customer;
    //                     this.LOG._info && this.LOG.info(`Found Bill To Partner: ${record._billToPartner}`);
    //                 } else {
    //                     this.LOG._warn && this.LOG.warn(`No Bill To Partner found for SalesOrder: ${salesOrderToUse}`);
    //                     record._billToPartner = null;
    //                 }

    //                 // Get item data
    //                 const itemDataResult = await this._getSalesOrderItemData(salesOrderToUse, '000010');

    //                 if (itemDataResult.success && itemDataResult.data) {
    //                     record._itemData = itemDataResult.data;
    //                     this.LOG._info && this.LOG.info(`Found Item Data for SalesOrder: ${salesOrderToUse}`);
    //                 } else {
    //                     this.LOG._warn && this.LOG.warn(`No Item Data found for SalesOrder: ${salesOrderToUse}`);
    //                     record._itemData = null;
    //                 }

    //                 // Get next item number
    //                 const nextItemNumberResult = await this._getNextItemNumber(salesOrderToUse);

    //                 if (nextItemNumberResult.success && nextItemNumberResult.data) {
    //                     record._nextItemNumber = nextItemNumberResult.data.nextItemNumber;
    //                     this.LOG._info && this.LOG.info(`Found Next Item Number: ${record._nextItemNumber}`);
    //                 } else {
    //                     this.LOG._warn && this.LOG.warn(`No Next Item Number found for SalesOrder: ${salesOrderToUse}`);
    //                     record._nextItemNumber = null;
    //                 }
    //             }

    //             // Step 2d: Create PO depending on salesOrderICUpdateRequired flag
    //             if (record.salesOrderICUpdateRequired) {
    //                 this.LOG._info && this.LOG.info(`Creating PO for record ${record.ID} - salesOrderICUpdateRequired is true`);

    //             } else {
    //                 this.LOG._info && this.LOG.info(`Skipping PO creation for record ${record.ID} - salesOrderICUpdateRequired is false`);
    //                 record._purchaseOrderNumber = null;
    //                 record._purchaseOrderItem = null;
    //             }

    //             // Step 2e: Prepare SalesOrder update payload
    //             if (record._varSoNum || record.workOrderWN) {
    //                 this.LOG._info && this.LOG.info(`Preparing SalesOrder update payload for record ${record.ID}`);

    //                 try {

    //                     // Get Customer Payment Terms
    //                     const salesOrderToUse = record._varSoNum;
    //                     const customerPaymentTermsResult = await this._getCustomerPaymentTerms(salesOrderToUse);

    //                     let varCustTermopay = null;
    //                     let varCustPobox = null;
    //                     let varZtermNet = null;

    //                     if (customerPaymentTermsResult.success && customerPaymentTermsResult.data) {
    //                         varCustTermopay = customerPaymentTermsResult.data.CustomerPaymentTerms;

    //                         // Get PO_BOX from config table
    //                         const poBoxResult = await this._getPoBoxFromConfig(record._soldToPartner, varCustTermopay);
    //                         if (poBoxResult.success && poBoxResult.data) {
    //                             varCustPobox = poBoxResult.data.PO_BOX;
    //                         }

    //                         // Get ZTERM_NET
    //                         const ztermResult = await this._getZtermNet(varCustTermopay);
    //                         if (ztermResult.success && ztermResult.data) {
    //                             varZtermNet = ztermResult.data.ZTERM_NET;
    //                         }

    //                         // Store the values in the record for use in createPayload
    //                         record._customerPaymentTerms = varZtermNet || '';
    //                         record._poBox = varCustPobox || '';
    //                     }

    //                 } catch (err) {
    //                     errorLogs.push({
    //                         record_ID: record.ID,
    //                         message: `Error preparing SalesOrder update payload: ${err.message}`
    //                     });
    //                     failedRecords.push(record.ID);
    //                     continue;
    //                 }
    //             }


    //             // Step 4a: Get SalesOrder header data for condition type determination
    //             const salesOrderHeaderResult = await this._getSalesOrderHeader(record.salesDocumentNoSAP);

    //             if (!salesOrderHeaderResult.success || !salesOrderHeaderResult.data) {
    //                 errorLogs.push({
    //                     record_ID: record.ID,
    //                     message: `Failed to get SalesOrder header for ${salesOrderHeaderResult.message}`
    //                 });
    //                 failedRecords.push(record.ID);
    //                 continue;
    //             }

    //             let salesOrderHeader = salesOrderHeaderResult.data;
    //             // Add to mSalesOrders map when we have the header data
    //             if (record.workOrderWN) {
    //                 mSalesOrders.set(record.workOrderWN, salesOrderHeader);
    //             }
    //             record._salesOrderHeaderData = salesOrderHeader;
    //             // Step 4b: Determine condition type dynamically (similar to Bonus_G.js)
    //             const conditionType = await determineConditionType({
    //                 customer: salesOrderHeader.SoldToParty,
    //                 salesOrganization: salesOrderHeader.SalesOrganization,
    //                 distributionChannel: salesOrderHeader.DistributionChannel,
    //                 division: salesOrderHeader.OrganizationDivision || ''
    //             });

    //             this.LOG._info && this.LOG.info(`Record ${record.ID} → Determined condition type: ${conditionType} for customer: ${salesOrderHeader.SoldToParty}`);

    //             // Step 5: Prepare update data based on record
    //             const oPayload = this._prepareSalesOrderUpdateData({
    //                 record: record,
    //                 salesOrder: record.salesDocumentNoSAP,
    //                 itemData: record._itemData,
    //                 conditionType: conditionType, // Use dynamically determined condition type
    //                 customerPaymentTerms: record._customerPaymentTerms,
    //                 poBoxData: record._poBox
    //             });

    //             // Add payload to aPayloads and map record.ID to its payloadIndex
    //             const iPayloadIndex = aPayloads.push(oPayload) - 1;
    //             let oMapEntry = mPayloadMap.get(record.ID);
    //             // Create the map entry if it doesn't exist
    //             if (!oMapEntry) {
    //                 oMapEntry = {
    //                     salesOrder: record.salesDocumentNoSAP,
    //                     salesOrderItem: record._nextItemNumber,
    //                     purchaseDocumentNoSAP:record._itemData.YY1_PurchasingDoc_SD_SDI,
    //                     salesOrderICUpdateRequired: record.salesOrderICUpdateRequired,
    //                     p2SalesDocumentNoSAP: record.p2SalesDocumentNoSAP,
    //                     PORequiredSAP: record._poRequiredSAP
    //                 };
    //             }
    //             oMapEntry.payloadIndex = iPayloadIndex;
    //             mPayloadMap.set(record.ID, oMapEntry);
    //             if (Array.isArray(aPayloads) && aPayloads.length > 0) {
    //                 aPayloads.forEach((oPayload) => delete oPayload.errors);
    //                 this.LOG._info && this.LOG.info(`Record ${record.ID} → SalesOrder Item Create payload: ${JSON.stringify(aPayloads)}`);

    //                 const aSalesOrderItemResults = await this.salesOrderAPI.createSalesOrderItems(aPayloads);

    //                 aSalesOrderItemResults.forEach((oResult, iPayloadIndex) => {
    //                     // Find the record ID corresponding to the payload index
    //                     const sRecordID = [...mPayloadMap.entries()].find(
    //                         ([, oMapEntry]) => oMapEntry.payloadIndex === iPayloadIndex,
    //                     )?.[0];

    //                     if (!oResult.hasError) {
    //                         const oCreatedSalesOrderItem = oResult.value;
    //                         aPassedRecordIDs.push(sRecordID);

    //                         // Update the map entry with the created SalesOrder ID
    //                         const oMapEntry = mPayloadMap.get(sRecordID);
    //                         oMapEntry.salesOrder = oCreatedSalesOrderItem.SalesOrder;
    //                         oMapEntry.salesOrderItem = oCreatedSalesOrderItem.SalesOrderItem;
    //                         mPayloadMap.set(sRecordID, oMapEntry);
    //                     } else {
    //                         aFailedRecordIDs.push(sRecordID);
    //                         if (Array.isArray(oResult.reason)) {
    //                             oResult.reason.forEach((oError) => {
    //                                 aErrorLogs.push({
    //                                     record_ID: sRecordID,
    //                                     ...oError,
    //                                 });
    //                             });
    //                         } else {
    //                             aErrorLogs.push({
    //                                 record_ID: sRecordID,
    //                                 message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM_CREATION_FAILED', [oResult.reason]),
    //                             });
    //                         }

    //                         // Remove the failed record from the map
    //                         mPayloadMap.delete(sRecordID);
    //                     }
    //                 });



    //             }
    //         }
    //         catch (err) {
    //             errorLogs.push({
    //                 record_ID: record.ID,
    //                 message: `Unexpected error during SalesOrder update: ${err.message}`
    //             });
    //             failedRecords.push(record.ID);
    //         }
    //         // ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));

    //     }


    //     // Call VC Data preparation
    //     await this._prepareVCData({
    //         records: this.records,
    //         mCustomerFieldNameValue: mCustomerFieldNameValue,
    //         mPayloadMap: mPayloadMap, // fields to update at record level
    //         mSalesOrders: mSalesOrders, // salesorderheaderdata
    //         aPassedRecordIDs: aPassedRecordIDs,
    //         aFailedRecordIDs: aFailedRecordIDs,
    //         aErrorLogs: errorLogs
    //     });

    //     if (aErrorLogs.length) {
    //         await ProcessLogger.addLogs(aErrorLogs);

    //     }

    //     // Update the `salesDocumentNoSAP` field in `this.records` and the database
    //     this.records.forEach((oRecord) => {
    //         const oMapEntry = mPayloadMap.get(oRecord.ID);

    //         if (oMapEntry && oMapEntry.salesOrder) {
    //             // Update fields in memory
    //             oRecord.salesDocumentNoSAP = oMapEntry.salesOrder;
    //             oRecord.salesItemNoSAP = oMapEntry.salesOrderItem;
    //             oRecord.vcData1UUID = oMapEntry.vcData1UUID ?? '';
    //             oRecord.vcData2UUID = oMapEntry.vcData2UUID ?? '';
    //             oRecord.salesOrderICUpdateRequired = oMapEntry.salesOrderICUpdateRequired;
    //             oRecord.p2SalesDocumentNoSAP = oMapEntry.p2SalesDocumentNoSAP;
    //             oRecord.PORequiredSAP = oMapEntry.PORequiredSAP;
    //             oRecord.purchaseDocumentNoSAP = oMapEntry.purchaseDocumentNoSAP;
    //         }
    //     });

    //     // Create records to update using flatMap
    //     const aRecordsToUpdate = this.records.flatMap((oRecord) => {
    //         const oMapEntry = mPayloadMap.get(oRecord.ID);

    //         return oMapEntry && oMapEntry.salesOrder
    //             ? [
    //                 {
    //                     ID: oRecord.ID,
    //                     salesDocumentNoSAP: oMapEntry.salesOrder,
    //                     salesItemNoSAP: oMapEntry.salesOrderItem,
    //                     vcData1UUID: oMapEntry.vcData1UUID,
    //                     vcData2UUID: oMapEntry.vcData2UUID,
    //                     salesOrderICUpdateRequired: oMapEntry.salesOrderICUpdateRequired,
    //                     p2SalesDocumentNoSAP: oMapEntry.p2SalesDocumentNoSAP,
    //                     PORequiredSAP: oMapEntry.PORequiredSAP,
    //                     purchaseDocumentNoSAP: oMapEntry.purchaseDocumentNoSAP,
    //                 },
    //             ]
    //             : [];
    //     });

    //      if (aRecordsToUpdate.length) {
    //                 await Promise.all(
    //                     aRecordsToUpdate.map((oRecord) => {
    //                         const iRecordIndex = mProcessingRecordsToCentralMapping.get(oRecord.ID);
    //                         this.records[iRecordIndex].salesDocumentNoSAP = oRecord.salesDocumentNoSAP;
    //                         this.records[iRecordIndex].salesItemNoSAP = oRecord.salesItemNoSAP;
    //                         this.records[iRecordIndex].vcData1UUID = oRecord.vcData1UUID;
    //                         this.records[iRecordIndex].vcData2UUID = oRecord.vcData2UUID;
    //                         this.records[iRecordIndex].salesOrderICUpdateRequired = oRecord.salesOrderICUpdateRequired;
    //                         this.records[iRecordIndex].p2SalesDocumentNoSAP = oRecord.p2SalesDocumentNoSAP;
    //                         this.records[iRecordIndex].PORequiredSAP = oRecord.PORequiredSAP;
    //                         this.records[iRecordIndex].purchaseDocumentNoSAP = oRecord.purchaseDocumentNoSAP;
    //                         return UPDATE(Drug_Background_Check)
    //                             .set({
    //                                 salesDocumentNoSAP: oRecord.salesDocumentNoSAP,
    //                                 salesItemNoSAP: oRecord.salesItemNoSAP,
    //                                 vcData1UUID: oRecord.vcData1UUID,
    //                                 vcData2UUID: oRecord.vcData2UUID,
    //                                 salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
    //                                 p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
    //                                 PORequiredSAP: oRecord.PORequiredSAP,
    //                                 purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP,
    //                             })
    //                             .where({ ID: oRecord.ID });
    //                     }),
    //                 );
    //             }

    //     // Step 10: Update record statuses
    //     if (aPassedRecordIDs.length > 0) {
    //         // this.LOG._info && this.LOG.info(`Updating ${aPassedRecordIDs.length} passed records with valid=true and processLevel_code=${sProcessCode}`);
    //         // this.LOG._info && this.LOG.info(`Passed record IDs: ${JSON.stringify(aPassedRecordIDs)}`);
    //         await ProcessLogger.removeLogs(aPassedRecordIDs);
    //         await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
    //         // try {
    //         //     const updateResult = await UPDATE(Drug_Background_Check)
    //         //         .set({ valid: true, processLevel_code: sProcessCode })
    //         //         .where({ ID: { in: aPassedRecordIDs } });
    //         //     this.LOG._info && this.LOG.info(`UPDATE result: ${JSON.stringify(updateResult)}`);
    //         //     this.LOG._info && this.LOG.info(`Successfully updated ${aPassedRecordIDs.length} passed records`);
    //         // } catch (updateErr) {
    //         //     this.LOG._error && this.LOG.error(`Failed to update passed records: ${updateErr.message}`);
    //         //     this.LOG._error && this.LOG.error(`Error stack: ${updateErr.stack}`);
    //         // }
    //     }



    //     if (aFailedRecordIDs.length > 0) {
    //         await ProcessLogger.addLogs(errorLogs);
    //         await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
    //     }

    //     // Update Exclusion Set
    //     this.updateExclusionSet({
    //         passed: aPassedRecordIDs,
    //         failed: aFailedRecordIDs,
    //         skipped: aSkippedRecords,
    //         breakExecution,
    //     });

    //     return {
    //         hasError: aFailedRecordIDs.length > 0,
    //         continue: aFailedRecordIDs.length === 0,
    //     };
    // }

    async processSalesOrder(sProcessCode, bBreakExecution) {
        const aRecordsForProcessing = [],
            aErrorLogs = [],
            aFailedRecordIDs = [],
            aPassedRecordIDs = [],
            aSkippedRecords = [];

        let aRecordIDs = [],
            aworkOrderWNWhere = [],
            aSalesOrderWhere = [],
            aSalesOrderPartnerWhere = [],
            aPurchaseOrderItemWhere = [],
            aCustomerWhere = [],
            aCustomerTermWhere = [],
            aVendorWhere = [],
            aCustomerFieldNamesWhere = [];

        let mSalesOrder = new Map(),        // Map for Sales Order
            mSalesOrderItem = new Map(),    // Map for Sales Order Item
            mSalesOrderFirstItem = new Map(),   // Map for Sales Order First Item
            mSalesOrderPartner = new Map(), // Map for Sales Order Partner Function
            mVendor = new Map(),            // Map for Vendor and Vendor ZR
            mPurchaseOrderItem = new Map(), // Map for Purchasing Document Item
            mTravelPayTerm = new Map(),     // Map for Travel Pay Term Config Table
            mTravelPayTermFeed = new Map(), // Map for Travel Pay Term Feed Config Table
            mCustomerFieldNameValue = new Map(),    // Map for CustomFieldsToVC Table
            mProcessingRecordsToCentralMapping = new Map();

        for (const [iRecordIndex, record] of this.records.entries())
        // for (const record of this.records)
        {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({ ...record });
                mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
                aRecordIDs.push(record.ID);
            } else {

                aSkippedRecords.push({ ...record });
                continue;
            }

            if (record.workOrderWN) {
                aworkOrderWNWhere.push(record.workOrderWN);
            }

            ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));
        }

        await ProcessLogger.removeLogs(aRecordIDs);

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
                { reason: anySalesOrderFirstItemErr, value: aSalesOrderFirstItems },
                { reason: anyCustomFieldsTOVCErr, value: aCustomFieldsTOVC },
            ] = await Promise.allSettled([
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI', 'SalesOrderItemCategory',
                            'YY1_WNWorkOrder_SD_SDI', 'Material', 'WBSElement', 'ProductionPlant'])
                        .where({
                            YY1_WNWorkOrder_SD_SDI: { in: [...new Set(aworkOrderWNWhere)] },
                            SalesOrderItem: '10'
                        })
                ),

                SELECT.from('com.aleron.monitor.CustomFieldsToVC')
                    .columns(['customValue', 'fieldName'])
                    .where({ customValue: { in: aCustomerFieldNamesWhere } }),
            ]);

            if (!anySalesOrderFirstItemErr?.message && aSalesOrderFirstItems?.length) {
                aSalesOrderFirstItems.forEach((oSalesOrderItem) => {
                    if (!mSalesOrderFirstItem.has(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI)) {
                        mSalesOrderFirstItem.set(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI, []);
                    }
                    mSalesOrderFirstItem.get(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI).push(oSalesOrderItem);
                    aSalesOrderWhere.push(oSalesOrderItem.SalesOrder);
                });
            }

            if (!anyCustomFieldsTOVCErr?.message && aCustomFieldsTOVC?.length) {
                for (const [recordID, customerfieldEntries] of mCustomerFieldNameValue.entries()) {
                    customerfieldEntries.forEach(entry => {
                        // Check if the customerFieldName is in the data array
                        const matchedData = aCustomFieldsTOVC.find(o => o.customValue === entry.customerFieldName);
                        if (matchedData) {
                            // Add fieldName to the entry
                            entry.fieldName = matchedData.fieldName;
                        }
                    });
                }
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        try {
            const uniqueSalesOrderWhere = [...new Set(aSalesOrderWhere)];
            const hasSalesOrders = uniqueSalesOrderWhere.length > 0;
            const [
                { reason: anySalesOrderErr, value: aSalesOrders },
                { reason: anySalesOrderItemErr, value: aSalesOrderItems },
                { reason: anySalesOrderPartnerErr, value: aSalesOrderPartners },
            ] = await Promise.allSettled([
                hasSalesOrders ? this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns(['SalesOrder', 'SalesOrganization', 'DistributionChannel', 'OrganizationDivision',
                            'SoldToParty', 'YY1_AlphanumericSalesO_SDH', 'YY1_CustomSalesOrder_SDH', 'CustomerGroup', 'CustomerPriceGroup'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderWhere)] }
                        })
                ) : Promise.resolve([]),

                hasSalesOrders ? this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI', 'SalesOrderItemCategory',
                            'YY1_WNWorkOrder_SD_SDI', 'Material', 'WBSElement', 'ProductionPlant'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderWhere)] }
                        })
                ) : Promise.resolve([]),

                hasSalesOrders ? this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderHeaderPartner')
                        .columns(['SalesOrder', 'Customer', 'Supplier', 'PartnerFunction'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderWhere)] },
                            PartnerFunction: { in: ['ZR', 'BP'] }
                        })
                ) : Promise.resolve([]),
            ]);

            if (!anySalesOrderErr?.message && aSalesOrders?.length) {
                aSalesOrders.forEach((oSalesOrder) => {
                    mSalesOrder.set(oSalesOrder.SalesOrder, oSalesOrder);
                    aCustomerWhere.push(oSalesOrder.SoldToParty);
                    aCustomerTermWhere.push(oSalesOrder.CustomerPaymentTerms);
                });
            }

            if (!anySalesOrderItemErr?.message && aSalesOrderItems?.length) {
                aSalesOrderItems.forEach((oSalesOrderItem) => {
                    if (!mSalesOrderItem.has(oSalesOrderItem.SalesOrder)) {
                        mSalesOrderItem.set(oSalesOrderItem.SalesOrder, []);
                    }
                    mSalesOrderItem.get(oSalesOrderItem.SalesOrder).push(oSalesOrderItem);
                    if (!aPurchaseOrderItemWhere.includes(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI) && oSalesOrderItem.YY1_PurchasingDoc_SD_SDI) {
                        aPurchaseOrderItemWhere.push(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI);
                    }
                });
            }

            if (!anySalesOrderPartnerErr?.message && aSalesOrderPartners?.length) {

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

                this.purchaseOrderAPI.executeQuery(
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

            if (!anyVendorErr?.message && aVendors?.length) {
                aVendors.forEach((oVendor) => {
                    mVendor.Set(oVendor.vendor, oVendor);
                });
            }

            if (!anyPurchaseOrderItemErr?.message && aPurchaseOrderItems?.length) {
                aPurchaseOrderItems.forEach((oPurchaseOrder) => {
                    if (!mPurchaseOrderItem.has(oPurchaseOrder.PurchaseOrder)) {
                        mPurchaseOrderItem.set(oPurchaseOrder.PurchaseOrder, []);
                    }
                    mPurchaseOrderItem.get(oPurchaseOrder.PurchaseOrder).push(oPurchaseOrder);
                });
            }

            if (!anyTravelPayTermsErr?.message && aTravelPayTerms?.length) {
                aTravelPayTerms.forEach((oTravelPayTerm) => {
                    mTravelPayTerm.Set(oTravelPayTerm.customerNo, oTravelPayTerm);
                });
            }

            if (!anyTravelPayTermFeedErr?.message && aTravelPayTermFeeds?.length) {
                aTravelPayTermFeeds.forEach((oTravelPayTermFeed) => {
                    mTravelPayTermFeed.Set(oTravelPayTermFeed.paymentTerm, oTravelPayTermFeed);
                });
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        const aPayloads = [];
        const mPayloadMap = new Map();

        for (const oRecord of aRecordsForProcessing) {
            const aErrors = [];

            let oSalesOrder, oSalesOrderItem, oPartnerFunctionZV, oSalesOrderPartner,
                oTravelPayTerm, oTravelPayTermFeed, vendor, firstSOItem, lastSOItem,
                oConditionType, oBillingType;
            let aSalesOrderFirstItem = mSalesOrderFirstItem.get(oRecord.workOrderWN);          // Fetching SO Items based on the workOrderWN from File

            if (oRecord.salesItemNoSAP) {
                // SalesOrder already created, only VC Data needs to be checked further
                aPassedRecordIDs.push(oRecord.ID);
                mPayloadMap.set(oRecord.ID, {
                    salesOrder: oRecord.salesDocumentNoSAP,
                    salesOrderItem: oRecord.salesItemNoSAP,
                    salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
                    p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
                    PORequiredSAP: oRecord.PORequiredSAP,
                    purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP
                });
                continue; // Skip this record
            }

            if (!oRecord.salesDocumentType || !['SC', 'MS', 'IC', 'CP'].includes(oRecord.salesDocumentType)) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_DOCUMENT_TYPE'),
                    process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);

                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (['CP', 'CR'].includes(oRecord.salesDocumentType)) {
                if (aSalesOrderFirstItem?.length === 1) {
                    oSalesOrder = mSalesOrder?.get(aSalesOrderFirstItem[0].SalesOrder);
                    if (!['CP', 'CR'].includes(oSalesOrder.DistributionChannel)) {
                        aErrors.push({
                            record_ID: oRecord.ID,
                            message: cds.i18n.messages.at('ERR_SALES_ORDER_PAYROLL'),
                            process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(oRecord.ID);
                        aErrorLogs.push(...aErrors);
                        continue; // Skip this record
                    }
                } else {
                    if (aSalesOrderFirstItem?.length > 1) {
                        for (const item of aSalesOrderFirstItem) {
                            let oInternalSalesOrder = mSalesOrder?.get(item.SalesOrder);
                            if (['CP', 'CR'].includes(oInternalSalesOrder.DistributionChannel)) {
                                oSalesOrder = oInternalSalesOrder;
                            } else {
                                if (oInternalSalesOrder.DistributionChannel === 'IC' && oInternalSalesOrder.CustomerGroup === 'Z1') {
                                    oRecord.salesOrderICUpdateRequired = 'X';
                                    oRecord.p2SalesDocumentNoSAP = oInternalSalesOrder.SalesOrder;
                                }
                            }
                        }
                    }
                }
            } else if (['MS'].includes(oRecord.salesDocumentType)) {
                for (const item of aSalesOrderFirstItem) {
                    let oInternalSalesOrder = mSalesOrder?.get(item.SalesOrder);
                    if (['MS'].includes(oInternalSalesOrder.DistributionChannel)) {
                        oSalesOrder = oInternalSalesOrder;
                        let salesOrderPartner = mSalesOrderPartner?.get(oInternalSalesOrder.SalesOrder);
                        if (salesOrderPartner) {
                            oPartnerFunctionZV = salesOrderPartner.find(item => item.PartnerFunction === 'ZV');
                            vendor = mVendor?.get(oPartnerFunctionZV?.Supplier);

                            if (vendor) {
                                oRecord.PORequiredSAP = '';
                            } else {
                                oRecord.PORequiredSAP = '1';
                            }

                            if (oSalesOrder.CustomerPriceGroup === 'ZM') {
                                oRecord.PORequiredSAP = '';
                            }
                        }
                    }
                }
            }

            if (!oSalesOrder) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            // oSalesOrder is having object of Sales Order
            oSalesOrderItem = mSalesOrderItem?.get(oSalesOrder.SalesOrder);  // oSalesOrderItem is having all Item related to oSalesOrder.SalesOrder
            oTravelPayTermFeed = mTravelPayTermFeed?.get(oSalesOrder.CustomerPaymentTerms);  // oTravelPayTermFeed is havgin a obeject of Travel Pay Term Feed from Config Table
            oTravelPayTerm = mTravelPayTerm?.get(oSalesOrder.SoldToParty);  // oTravelPayTerm is havgin a obeject of Travel Pay Term from Config Table
            oSalesOrderPartner = mSalesOrderPartner?.get(oSalesOrder.SalesOrder);    // oSalesOrderPartner is having all Partner Function related to oSalesOrder.SalesOrder

            firstSOItem = oSalesOrderItem?.filter(item => item.SalesOrderItem === "10" && item.SalesOrderItemCategory === "TADN")[0];
            lastSOItem = oSalesOrderItem?.reduce((maxItem, current) =>
                Number(current.SalesOrderItem) > Number(maxItem.SalesOrderItem) ? current : maxItem
            );

            oConditionType = await determineConditionType({
                customer: oSalesOrder.SoldToParty,
                salesOrganization: oSalesOrder.SalesOrganization,
                distributionChannel: oSalesOrder.DistributionChannel,
                division: oSalesOrder.OrganizationDivision
            });

            oBillingType = await this.billingTypeAPI.executeQuery(
                SELECT.from('YY1_BILLINGTYPE')
                    .columns(['Billing_type', 'SO_order_Type'])
                    .where({
                        SO_order_Type: oSalesOrder.YY1_CustomSalesOrder_SDH
                    })
            )

            if (!firstSOItem.WBSElement || firstSOItem.WBSElement !== oRecord.project) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (oRecord.PORequiredSAP === '1') {
                if (!firstSOItem.YY1_PurchasingDoc_SD_SDI) {
                    aErrors.push({
                        record_ID: oRecord.ID,
                        message: cds.i18n.messages.at('ERR_CREATE_PO'), process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(oRecord.ID);
                    aErrorLogs.push(...aErrors);
                    continue; // Skip this record
                } else {
                    oRecord.purchaseDocumentNoSAP = firstSOItem.YY1_PurchasingDoc_SD_SDI;
                    let purchaseOrderItem = mPurchaseOrderItem?.get(firstSOItem.YY1_PurchasingDoc_SD_SDI);
                    const poItemMax = purchaseOrderItem?.reduce((maxItem, current) =>
                        current.PurchaseOrderItem > maxItem.PurchaseOrderItem ? current : maxItem
                    );
                    if (Number(poItemMax.PurchaseOrderItem) > Number(lastSOItem.SalesOrderItem)) {
                        lastSOItem.SalesOrderItem = poItemMax.PurchaseOrderItem;
                    }
                }
            }

            if (oRecord.wnInvoiceNo === oSalesOrder.YY1_WNInvoice_SD_SDI) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_DUPLICATE_LINES'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            mPayloadMap.set(oRecord.ID, {
                salesOrder: '',
                salesOrderItem: '',
                salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
                p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
                PORequiredSAP: oRecord.PORequiredSAP,
                purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP
            });

            // Prepare payload for SalesOrderItem creation
            const oPayload = this._prepareDataForSalesOrderItemCreate({
                record: oRecord,                        // record form File
                firstSOItem: firstSOItem,               // SO Item first object
                lastSOItem: lastSOItem,                 // SO Item Max Object
                travelPayTerm: oTravelPayTerm,          // Travel Pay Term
                travelPayTermFeed: oTravelPayTermFeed,  // Teravel Pay Term Feed
                conditionType: oConditionType,           // conditionType
                billingType: oBillingType[0],               // Billing Type
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
                                process_code: sProcessCode,
                                ...oError,
                            });
                        });
                    } else {
                        aErrorLogs.push({
                            record_ID: sRecordID,
                            message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM_CREATION_FAILED', [oResult.reason]), process_code: sProcessCode
                        });
                    }

                    // Remove the failed record from the map
                    mPayloadMap.delete(sRecordID);
                }
            });
        }


        // VC Date update process
        await this._prepareVCData({
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
            await UPDATE(Drug_Background_Check)
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
                oRecord.vcData1UUID = oMapEntry.vcData1UUID ?? '';
                oRecord.vcData2UUID = oMapEntry.vcData2UUID ?? '';
                oRecord.salesOrderICUpdateRequired = oMapEntry.salesOrderICUpdateRequired;
                oRecord.p2SalesDocumentNoSAP = oMapEntry.p2SalesDocumentNoSAP;
                oRecord.PORequiredSAP = oMapEntry.PORequiredSAP;
                oRecord.purchaseDocumentNoSAP = oMapEntry.purchaseDocumentNoSAP;
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
                        vcData1UUID: oMapEntry.vcData1UUID,
                        vcData2UUID: oMapEntry.vcData2UUID,
                        salesOrderICUpdateRequired: oMapEntry.salesOrderICUpdateRequired,
                        p2SalesDocumentNoSAP: oMapEntry.p2SalesDocumentNoSAP,
                        PORequiredSAP: oMapEntry.PORequiredSAP,
                        purchaseDocumentNoSAP: oMapEntry.purchaseDocumentNoSAP,
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
                    this.records[iRecordIndex].vcData1UUID = oRecord.vcData1UUID;
                    this.records[iRecordIndex].vcData2UUID = oRecord.vcData2UUID;
                    this.records[iRecordIndex].salesOrderICUpdateRequired = oRecord.salesOrderICUpdateRequired;
                    this.records[iRecordIndex].p2SalesDocumentNoSAP = oRecord.p2SalesDocumentNoSAP;
                    this.records[iRecordIndex].PORequiredSAP = oRecord.PORequiredSAP;
                    this.records[iRecordIndex].purchaseDocumentNoSAP = oRecord.purchaseDocumentNoSAP;
                    return UPDATE(Drug_Background_Check)
                        .set({
                            salesDocumentNoSAP: oRecord.salesDocumentNoSAP,
                            salesItemNoSAP: oRecord.salesItemNoSAP,
                            vcData1UUID: oRecord.vcData1UUID,
                            vcData2UUID: oRecord.vcData2UUID,
                            salesOrderICUpdateRequired: oRecord.salesOrderICUpdateRequired,
                            p2SalesDocumentNoSAP: oRecord.p2SalesDocumentNoSAP,
                            PORequiredSAP: oRecord.PORequiredSAP,
                            purchaseDocumentNoSAP: oRecord.purchaseDocumentNoSAP,
                        })
                        .where({ ID: oRecord.ID });
                }),
            );
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await Promise.allSettled([
                this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
            ]);
        }

        // Update Exclusion Set
        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords,
            bBreakExecution,
        });

        // Return Process Result
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
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
            Material: 'MISC_EXPENSE',
            RequestedQuantity: '1',
            OrderQuantityUnit: 'LAB',
            ProductionPlant: firstSOItem.ProductionPlant || '',
            SalesOrderItemText: 'DRUG SCREENING',
            WBSElement: firstSOItem.WBSElement,
            PurchaseOrderByCustomer: record?.customerPoNoLabor ?? '',
            PricingDate: `/Date(${+moment()})/`,
            YY1_PurchasingDoc_SD_SDI: firstSOItem.YY1_PurchasingDoc_SD_SDI || '',
            YY1_WeekEnd_SD_SDI: `/Date(${moment(record.weekEndDate, "YYYYMMDD").valueOf()})/`,
            YY1_CustomBillingType_SDI: billingType.Billing_type,
            YY1_WNWorkOrder_SD_SDI: firstSOItem.YY1_WNWorkOrder_SD_SDI,
            YY1_WNInvoice_SD_SDI: record.wnInvoiceNo,
            to_ScheduleLine: [this._prepareDataForScheduleLine({ record, lastSOItem })],
            to_PricingElement: {
                results: [{
                    ConditionType: conditionType,
                    ConditionRateValue: record.amount
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

    /**
     * Special routine for processing IC (Intercompany) SalesOrder updates
     * @param {Array} records - Array of records to process
     * @param {string} processCode - The process code
     * @param {boolean} breakExecution - Whether to break execution on error
     * @returns {Object} Result object with success, processed, failed, and message properties
     */
    async processICSalesOrderUpdates(processCode, breakExecution) {
        const processedRecords = [];
        const failedRecords = [];
        const errorLogs = [];

        const aRecordsForProcessing = [];
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        this.updateProcessingState(processCode);

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, processCode)) {
                aRecordsForProcessing.push({ ...record });
            } else {
                aSkippedRecords.push({ ...record });
            }
        }

        if (!aRecordsForProcessing.length) {
            return {
                hasError: false,
                continue: true,
            };
        }


        this.LOG._info && this.LOG.info(`Starting IC SalesOrder updates for ${records.length} records`);

        for (const record of aRecordsForProcessing) {
            try {
                // Step 1: Check if this is an IC scenario (salesOrderICUpdateRequired flag)
                if (!record.salesOrderICUpdateRequired) {
                    this.LOG._info && this.LOG.info(`Skipping record ${record.ID} - not an IC scenario`);
                    continue;
                }

                // Step 2: Validate required IC data
                if (!record._varSoNum || !record.p2SalesDocumentNoSAP) {
                    errorLogs.push({
                        record_ID: record.ID,
                        message: 'Missing required IC data: SalesOrder number or P2 Sales Document'
                    });
                    failedRecords.push(record.ID);
                    continue;
                }

                this.LOG._info && this.LOG.info(`Processing IC record ${record.ID} with SalesOrder: ${record._varSoNum}, P2 Document: ${record.p2SalesDocumentNoSAP}`);

                // Step 3: Pull Distribution channel as VAR_IC_DIST_CHANNEL from sales order header where SalesOrderDocument = p2SalesDocumentNoSAP
                const icDistChannelResult = await this._getSalesOrderHeader(record.p2SalesDocumentNoSAP);

                if (!icDistChannelResult.success || !icDistChannelResult.data) {
                    errorLogs.push({
                        record_ID: record.ID,
                        message: `Failed to get distribution channel for P2 document: ${icDistChannelResult.message}`
                    });
                    failedRecords.push(record.ID);
                    continue;
                }

                const varIcDistChannel = icDistChannelResult.data.DistributionChannel;
                this.LOG._info && this.LOG.info(`Found IC Distribution Channel: ${varIcDistChannel}`);

                // Step 4: Check if VAR_IC_DIST_CHANNEL <> IC
                if (varIcDistChannel !== 'IC') {
                    errorLogs.push({
                        record_ID: record.ID,
                        message: `WN & <> IC Dis Ch. Check SS order. Distribution Channel: ${varIcDistChannel}`
                    });
                    failedRecords.push(record.ID);
                    continue;
                }

                // Step 5: SET VAR_VBELN_SO = p2SalesDocumentNoSAP
                const varVbelnSo = record.p2SalesDocumentNoSAP;

                if (!varVbelnSo || varVbelnSo.toString().trim() === '') {
                    errorLogs.push({
                        record_ID: record.ID,
                        message: 'Sales order not found - VAR_VBELN_SO is blank'
                    });
                    failedRecords.push(record.ID);
                    continue;
                }

                // Step 6: Pull vendor into VAR_LIFNR from partner table where so number = VAR_VBELN_SO and item number = 000000 and partner function = ZR
                const vendorResult = await this._getSalesOrderPartner(varVbelnSo, '000000', 'ZR');

                let varLifnr = null;
                if (vendorResult.success && vendorResult.data) {
                    varLifnr = vendorResult.data.Supplier;
                    this.LOG._info && this.LOG.info(`Found Vendor (VAR_LIFNR): ${varLifnr}`);
                }

                // Step 7: Pull VENDOR into VAR_LIFNR_MWEBWE from ZSD_MBEWBE where vendor = VAR_LIFNR
                let varLifnrMwebwe = null;
                let sapPo = '2'; // Default to create PO

                if (varLifnr && varLifnr.toString().trim() !== '') {
                    const mwebweResult = await this._getZsdMbebwe(varLifnr);

                    if (mwebweResult.success && mwebweResult.data) {
                        varLifnrMwebwe = mwebweResult.data.ZLIFNR_ZR;
                        this.LOG._info && this.LOG.info(`Found VAR_LIFNR_MWEBWE: ${varLifnrMwebwe}`);

                        // If there is an entry
                        if (varLifnrMwebwe && varLifnrMwebwe.toString().trim() !== '') {
                            sapPo = ''; // don't create PO
                            this.LOG._info && this.LOG.info(`Setting SAP_PO = space (don't create PO) - found entry in ZSD_MBEWBE`);
                        } else {
                            sapPo = '2'; // Create PO
                            this.LOG._info && this.LOG.info(`Setting SAP_PO = 2 (create PO) - no entry in ZSD_MBEWBE`);
                        }
                    } else {
                        sapPo = '2'; // Create PO
                        this.LOG._info && this.LOG.info(`Setting SAP_PO = 2 (create PO) - no entry found in ZSD_MBEWBE`);
                    }
                }

                // Step 8: Pull pricing group into VAR_KONDA from Business data where SO number = VAR_VBELN_SO and item number = 000000 and Partner Function = ZM
                const pricingGroupResult = await this._getSalesOrderBusinessData(varVbelnSo, '000000');

                let varKonda = null;
                if (pricingGroupResult.success && pricingGroupResult.data) {
                    varKonda = pricingGroupResult.data.CustomerGroup;
                    this.LOG._info && this.LOG.info(`Found Pricing Group (VAR_KONDA): ${varKonda}`);

                    // If there is an entry
                    if (varKonda && varKonda.toString().trim() !== '') {
                        sapPo = ''; // don't create PO
                        this.LOG._info && this.LOG.info(`Setting SAP_PO = space (don't create PO) - found pricing group entry`);
                    }
                }

                // Step 9: Get sold to party and order reason from SO Header where VBELN = VAR_VBELN_SO
                const soHeaderResult = await this._getSalesOrderHeader(varVbelnSo);

                let varSorg = null;
                let varCustContactDate = null;
                let varCustomer = null;
                let varOrdReason = null;

                if (soHeaderResult.success && soHeaderResult.data) {
                    varSorg = soHeaderResult.data.SalesOrganization;
                    varCustContactDate = soHeaderResult.data.LastCustomerContactDate;
                    varCustomer = soHeaderResult.data.SoldToParty;
                    varOrdReason = soHeaderResult.data.OrderReason;

                    this.LOG._info && this.LOG.info(`Found SO Header data - SORG: ${varSorg}, Customer: ${varCustomer}, Order Reason: ${varOrdReason}`);
                }

                // Step 10: Get Bill to Party - Pull KUNNR to VAR_BILLTO from partner function where VBELN = VAR_VBELN_SO and item number = 000000 and partner function = RE
                const billToResult = await this._getSalesOrderPartner(varVbelnSo, '000000', 'RE');

                let varBillto = null;
                if (billToResult.success && billToResult.data) {
                    varBillto = billToResult.data.Customer;
                    this.LOG._info && this.LOG.info(`Found Bill To Party (VAR_BILLTO): ${varBillto}`);
                }

                // Step 11: Get Item details from Item table where VBELN = VAR_VBELN_SO and item number = 000010 and item category = ZDUM
                const itemDetailsResult = await this._getSalesOrderItemWithCategory(varVbelnSo, '000010', 'ZDUM');

                let varSoItem = null;
                let varMat = null;
                let varZzEbel = null;

                if (itemDetailsResult.success && itemDetailsResult.data) {
                    varSoItem = itemDetailsResult.data.SalesOrderItem;
                    varMat = itemDetailsResult.data.Material;
                    varZzEbel = itemDetailsResult.data.YY1_PurchasingDoc_SD_SDI; // ZZ_EBELN equivalent

                    this.LOG._info && this.LOG.info(`Found Item details - SO Item: ${varSoItem}, Material: ${varMat}, ZZ_EBELN: ${varZzEbel}`);
                }

                // Step 12: Get next item number - Pull max item number into VAR_SO_ITEM from the SO items table. Add 10 to VAR_SO_ITEM
                const nextSoItemNumberResult = await this._getNextItemNumber(varVbelnSo);

                if (!nextSoItemNumberResult.success || !nextSoItemNumberResult.data) {
                    errorLogs.push({
                        record_ID: record.ID,
                        message: `Failed to get next item number for SO: ${nextSoItemNumberResult.message}`
                    });
                    failedRecords.push(record.ID);
                    continue;
                }

                let varSoItemNext = nextSoItemNumberResult.data.nextItemNumber;
                this.LOG._info && this.LOG.info(`Next SO Item Number: ${varSoItemNext}`);

                // Step 13: If SAP_PO = 2, Pull max item number into VAR_PO_ITEM from PO items table. Add 10 to VAR_PO_ITEM
                let varPoItem = null;
                if (sapPo === '2') {
                    const poItemNumberResult = await this._getNextPOItemNumber(varZzEbel);

                    if (poItemNumberResult.success && poItemNumberResult.data) {
                        varPoItem = poItemNumberResult.data.nextItemNumber;
                        this.LOG._info && this.LOG.info(`Next PO Item Number: ${varPoItem}`);

                        // If VAR_SO_ITEM < VAR_PO_ITEM, VAR_SO_ITEM = VAR_PO_ITEM
                        if (parseInt(varSoItemNext) < parseInt(varPoItem)) {
                            varSoItemNext = varPoItem;
                            this.LOG._info && this.LOG.info(`Adjusted SO Item Number to PO Item Number: ${varSoItemNext}`);
                        }
                    }
                }

                // Step 14: If VAR_ORD_REASON is not blank and WEEK_ENDDATE >= VAR_CUST_CONTACT_DATE, set SAP_SO_REJ = ZR
                let sapSoRej = null;
                if (varOrdReason && varOrdReason.toString().trim() !== '') {
                    const weekEndDate = record.weekEndDate ? new Date(record.weekEndDate) : null;
                    const custContactDate = varCustContactDate ? new Date(varCustContactDate) : null;

                    if (weekEndDate && custContactDate && weekEndDate >= custContactDate) {
                        sapSoRej = 'ZR';
                        this.LOG._info && this.LOG.info(`Setting SAP_SO_REJ = ZR - Order reason exists and week end date >= customer contact date`);
                    }
                }

                // Store all the variables in the record for later use
                record._varIcDistChannel = varIcDistChannel;
                record._varVbelnSo = varVbelnSo;
                record._varLifnr = varLifnr;
                record._varLifnrMwebwe = varLifnrMwebwe;
                record._sapPo = sapPo;
                record._varKonda = varKonda;
                record._varSorg = varSorg;
                record._varCustContactDate = varCustContactDate;
                record._varCustomer = varCustomer;
                record._varOrdReason = varOrdReason;
                record._varBillto = varBillto;
                record._varSoItem = varSoItem;
                record._varMat = varMat;
                record._varZzEbel = varZzEbel;
                record._varSoItemNext = varSoItemNext;
                record._varPoItem = varPoItem;
                record._sapSoRej = sapSoRej;

                // Step 4: Get Customer Payment Terms for the IC SalesOrder
                const customerPaymentTermsResult = await this._getCustomerPaymentTerms(record._varSoNum);

                let varCustTermopay = null;
                let varCustPobox = null;
                let varZtermNet = null;

                if (customerPaymentTermsResult.success && customerPaymentTermsResult.data) {
                    varCustTermopay = customerPaymentTermsResult.data.CustomerPaymentTerms;

                    // Get PO_BOX from config table
                    const poBoxResult = await this._getPoBoxFromConfig(record._soldToPartner, varCustTermopay);
                    if (poBoxResult.success && poBoxResult.data) {
                        varCustPobox = poBoxResult.data.PO_BOX;
                    }

                    // Get ZTERM_NET
                    const ztermResult = await this._getZtermNet(varCustTermopay);
                    if (ztermResult.success && ztermResult.data) {
                        varZtermNet = ztermResult.data.ZTERM_NET;
                    }

                    // Store the values in the record for use in createPayload
                    record._customerPaymentTerms = varZtermNet || varCustTermopay || '';
                    record._poBox = varCustPobox || '';
                }

                // Step 5: Get next item number for the IC SalesOrder
                const nextItemNumberResult = await this._getNextItemNumber(record._varSoNum);

                if (!nextItemNumberResult.success || !nextItemNumberResult.data) {
                    errorLogs.push({
                        record_ID: record.ID,
                        message: `Failed to get next item number for IC SalesOrder: ${nextItemNumberResult.message}`
                    });
                    failedRecords.push(record.ID);
                    continue;
                }

                const icItemNumber = nextItemNumberResult.data.nextItemNumber;

                // Step 6: Prepare IC SalesOrder item creation payload
                // Determine Material and SalesOrderItemText based on expense type for IC
                let icMaterial = 'EXPENSE'; // Default material
                let icSalesOrderItemText = 'IC DRUG BACKGROUND CHECK'; // Default text

                if (record.expenseType === 'DRUG') {
                    icMaterial = 'MISC_EXPENSE';
                    icSalesOrderItemText = 'IC DRUG SCREENING';
                } else if (record.expenseType === 'BACK') {
                    icMaterial = 'MISC_EXPENSE';
                    icSalesOrderItemText = 'IC BACKGROUND CHECK';
                } else if (record.expenseType === 'NON') {
                    icMaterial = 'MISC_EXPENSE';
                    icSalesOrderItemText = 'IC NON-TRAVEL EXPENSE';
                }

                const icSalesOrderItemPayload = {
                    SalesOrder: record._varSoNum,
                    SalesOrderItem: icItemNumber,

                    // Item details
                    Material: icMaterial,
                    SalesOrderItemText: icSalesOrderItemText,
                    SalesDocumentItemCategory: 'TAD',
                    CustomerPurchaseOrderNumber: record.customerPoNoLabor || '',
                    PricingDate: new Date().toISOString().split('T')[0],

                    // WBSElement and Production Plant from P2 document
                    WBSElement: wbsElementResult.data.VAR_Project,
                    ProductionPlant: wbsElementResult.data.VAR_SORG,

                    // Customer Payment Terms and PO Box
                    CustomerPaymentTerms: varZtermNet || varCustTermopay || '',
                    PurchaseOrderByShipToParty: varCustPobox || '',

                    // Reference to P2 Sales Document
                    YY1_PurchasingDoc_SD_SDI: record.p2SalesDocumentNoSAP,

                    // Schedule lines
                    to_ScheduleLine: [{
                        SalesOrderItem: icItemNumber,
                        RequestedDeliveryDate: record.weekEndDate || new Date().toISOString().split('T')[0],
                        RequestedQuantity: '1.000',
                        RequestedQuantityUnit: 'EA',
                        ScheduleLineCategory: 'CD'
                    }]
                };

                // Step 7: Create IC SalesOrder item
                const icCreationResult = await this._createSalesOrderItem(record, icSalesOrderItemPayload);

                // Step 8: Handle IC creation result
                if (icCreationResult.success) {
                    processedRecords.push(record.ID);
                    this.LOG._info && this.LOG.info(`Successfully created IC SalesOrder item for record ${record.ID}`);

                    // Update entity with IC SalesOrder details
                    try {
                        const updateEntityData = {
                            salesDocumentNoSAP: record._varSoNum,
                            salesItemNoSAP: icItemNumber,
                            purchaseDocumentNoSAP: record.p2SalesDocumentNoSAP,
                            purchaseItemNoSAP: '', // No separate PO item for IC
                            rejectionReason: '' // Clear rejection reason on success
                        };

                        await UPDATE(Drug_Background_Check)
                            .set(updateEntityData)
                            .where({ ID: record.ID });

                        this.LOG._info && this.LOG.info(`Updated entity with IC SalesOrder details for record ${record.ID}`);

                    } catch (entityUpdateErr) {
                        this.LOG._error && this.LOG.error(`Failed to update entity for IC record ${record.ID}: ${entityUpdateErr.message}`);
                    }
                } else {
                    errorLogs.push({
                        record_ID: record.ID,
                        message: `IC SalesOrder item creation failed: ${icCreationResult.message}`
                    });
                    failedRecords.push(record.ID);

                    // Break execution if configured
                    if (breakExecution) {
                        this.LOG._error && this.LOG.error(`Breaking execution due to IC SalesOrder creation failure for record ${record.ID}`);
                        break;
                    }
                }

            } catch (err) {
                errorLogs.push({
                    record_ID: record.ID,
                    message: `Unexpected error during IC SalesOrder processing: ${err.message}`
                });
                failedRecords.push(record.ID);


            }
        }

        // Step 9: Log results
        this.LOG._info && this.LOG.info(`IC SalesOrder updates completed. Processed: ${processedRecords.length}, Failed: ${failedRecords.length}`);

        // Step 10: Update record statuses
        if (processedRecords.length > 0) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);
            await this.markRecordsValid(processCode, processedRecords, true);
        }

        if (failedRecords.length > 0) {
            await ProcessLogger.addLogs(errorLogs);
            await this.markRecordsValid(processCode, failedRecords, false);
        }

        return {
            success: failedRecords.length === 0,
            processed: processedRecords,
            failed: failedRecords,
            errorLogs: errorLogs,
            message: `IC Processed ${processedRecords.length} records, ${failedRecords.length} failed`
        };
    }

    // /**
    //  * Prepare data for SalesOrder item creation (similar to Bonus_G.js)
    //  * @param {object} params
    //  * @param {object} params.record - record from file
    //  * @param {object} params.salesOrder - SalesOrder object
    //  * @param {object} params.itemData - SalesOrder Item data
    //  * @param {string} params.conditionType - Condition type for pricing
    //  * @param {object} params.customerPaymentTerms - Customer payment terms data
    //  * @param {object} params.poBoxData - PO Box data
    //  * @returns {object} SalesOrderItem payload
    //  */
    // _prepareSalesOrderUpdateData({
    //     record,
    //     salesOrder,
    //     itemData,
    //     conditionType,
    //     customerPaymentTerms,
    //     poBoxData
    // }) {
    //     // Determine Material and SalesOrderItemText based on expense type
    //     let material = 'EXPENSE'; // Default material
    //     let salesOrderItemText = 'DRUG BACKGROUND CHECK'; // Default text

    //     if (record.expenseType === 'DRUG') {
    //         material = 'MISC_EXPENSE';
    //         salesOrderItemText = 'DRUG SCREENING';
    //     } else if (record.expenseType === 'BACK') {
    //         material = 'MISC_EXPENSE';
    //         salesOrderItemText = 'BACKGROUND CHECK';
    //     } else if (record.expenseType === 'NON') {
    //         material = 'MISC_EXPENSE';
    //         salesOrderItemText = 'NON-TRAVEL EXPENSE';
    //     }

    //     const oReturnData = {
    //         SalesOrder: salesOrder,
    //         SalesOrderItem: record._nextItemNumber,
    //         SalesOrderItemCategory: 'TAD',
    //         Material: material,
    //         RequestedQuantity: '1',
    //         OrderQuantityUnit: 'LAB',
    //         ProductionPlant: itemData?.ProductionPlant || '',
    //         SalesOrderItemText: salesOrderItemText,
    //         WBSElement: itemData?.WBSElement || '',
    //         // PurchaseOrderByCustomer: record.customerPO || '',
    //         PricingDate: `/Date(${+moment()})/`,
    //         // UnderlyingPurchaseOrderItem: record.custPoLineItemNo||'',
    //         // YY1_PurchasingDoc_SD_SDI: record._purchaseOrderNumber || '',
    //         YY1_WeekEnd_SD_SDI: `/Date(${moment(record.weekEndDate, "YYYY-MM-DD").valueOf()})/`,
    //         YY1_WNWorkOrder_SD_SDI: itemData?.YY1_WNWorkOrder_SD_SDI || '',
    //         YY1_WNInvoice_SD_SDI: itemData?.YY1_WNInvoice_SD_SDI || '',
    //         YY1_PurchasingDoc_SD_SDI: itemData?.YY1_PurchasingDoc_SD_SDI || '',
    //         YY1_CustomBillingType_SDI: itemData?.YY1_CustomBillingType_SDI || '',
    //         YY1_CategoryCode_SD_SDI: itemData?.YY1_CategoryCode_SD_SDI || '',
    //         to_ScheduleLine: [this._prepareDataForScheduleLine({ record, salesOrder })],
    //         to_PricingElement: {
    //             results: [{
    //                 ConditionType: conditionType,
    //                 ConditionRateValue: record.amount || '0'
    //             }]
    //         }
    //     };

    //     // Add customer payment terms if available
    //     if (customerPaymentTerms) {
    //         oReturnData.CustomerPaymentTerms = customerPaymentTerms;
    //     }

    //     // Add PO Box if available
    //     if (poBoxData) {
    //         oReturnData.PurchaseOrderByShipToParty = poBoxData;
    //     }

    //     // Add amount and currency if available
    //     if (record.amount) {
    //         oReturnData.NetAmount = record.amount;
    //     }

    //     if (record.currency) {
    //         oReturnData.TransactionCurrency = record.currency;
    //     }

    //     // Fill custom fields (similar to Bonus_G.js)
    //     const textEntries = [];
    //     const partnerFunctions = [];
    //     let z4Email = '';
    //     let z4Name = '';
    //     let z4Phone = '';

    //     for (const fieldIndex of Array(15).keys()) {
    //         const fieldName = record[`customerFieldName${fieldIndex + 1}`];
    //         const fieldValue = record[`customerFieldValue${fieldIndex + 1}`];

    //         if (fieldName === 'Z20') {
    //             // Update text ZJOB with its respective value
    //             textEntries.push({
    //                 LongText: fieldValue,
    //                 LongTextID: 'ZJOB',
    //                 Language: 'EN'
    //             });
    //         }
    //         if (fieldName === 'Z21') {
    //             // Update text ZSLD with its respective value
    //             textEntries.push({
    //                 LongText: fieldValue,
    //                 LongTextID: 'ZSLD',
    //                 Language: 'EN'
    //             });
    //         }
    //         if (fieldName === 'Z4') {
    //             // Update from VAR_WORDER ITEM (workOrderWN)
    //             // This could be used for additional work order related text
    //             if (record.workOrderWN) {
    //                 textEntries.push({
    //                     LongText: record.workOrderWN,
    //                     LongTextID: 'Z4',
    //                     Language: 'EN'
    //                 });
    //             }
    //         }
    //         if (fieldName === 'Z13') {
    //             // Partner function Z4 - email
    //             z4Email = fieldValue;
    //         }
    //         if (fieldName === 'Z14') {
    //             // Partner function Z4 - name
    //             z4Name = fieldValue;
    //         }
    //         if (fieldName === 'Z15') {
    //             // Partner function Z4 - telephone number
    //             z4Phone = fieldValue;
    //         }
    //         if (
    //             fieldName === 'Z41' &&
    //             ['X', 'YES', 'Y'].includes(fieldValue)
    //         ) {
    //             oReturnData.PriceListType = 'ZD';
    //         }
    //     }

    //     // Add text entries if any exist
    //     if (textEntries.length > 0) {
    //         oReturnData.to_Text = textEntries;
    //     }

    //     // Add partner function Z4 if any of Z13, Z14, Z15 are present
    //     if (z4Email || z4Name || z4Phone) {
    //         const partnerAddress = {};

    //         if (z4Name) {
    //             partnerAddress.AddresseeFullName = z4Name;
    //         }
    //         if (z4Email) {
    //             partnerAddress.EmailAddress = z4Email;
    //         }
    //         if (z4Phone) {
    //             partnerAddress.PhoneNumber = z4Phone;
    //         }

    //         partnerFunctions.push({
    //             PartnerFunction: 'Z4',
    //             to_Address: [partnerAddress]
    //         });
    //     }

    //     // Add partner functions if any exist
    //     if (partnerFunctions.length > 0) {
    //         oReturnData.to_PartnerFunction = partnerFunctions;
    //     }

    //     return oReturnData;
    // }

    /**
     * Prepare data for schedule line (similar to Bonus_G.js)
     * @param {object} params
     * @param {object} params.record - record from file
     * @param {object} params.salesOrder - SalesOrder object
     * @returns {object} Schedule line data
     */
    _prepareDataForScheduleLine({ record, lastSOItem }) {
        return {
            SalesOrderItem: String(Number(lastSOItem.SalesOrderItem) + 10),
            RequestedDeliveryDate: `/Date(${+moment()})/`,
            ScheduleLineOrderQuantity: '1',
            OrderQuantityISOUnit: '_01'
        };
    }

    /**
     * Get SalesOrder by workorder and distribution channel (first attempt)
     * @param {string} workOrder - The work order number
     * @param {string} itemNumber - The item number (000010)
     * @param {Array} distributionChannels - Array of distribution channels to check
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderByWorkOrderAndDistributionChannel(workOrder, itemNumber, distributionChannels) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'Material', 'SalesOrderItemCategory', 'DistributionChannel'])
                .where({
                    SalesOrder: workOrder,
                    SalesOrderItem: itemNumber,
                    DistributionChannel: { in: distributionChannels }
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No SalesOrder found for workorder ${workOrder} with distribution channels ${distributionChannels.join(', ')}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder by workorder and distribution channel: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get SalesOrder by YY1_WNWorkOrder_SD_SDI and distribution channel (second attempt)
     * @param {string} workOrder - The work order number
     * @param {string} itemNumber - The item number (000010)
     * @param {Array} distributionChannels - Array of distribution channels to check
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderByworkOrderWNAndDistributionChannel(workOrder, itemNumber, distributionChannels) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'Material', 'SalesOrderItemCategory', 'DistributionChannel'])
                .where({
                    YY1_WNWorkOrder_SD_SDI: workOrder,
                    SalesOrderItem: itemNumber,
                    DistributionChannel: { in: distributionChannels }
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No SalesOrder found for WN workorder ${workOrder} with distribution channels ${distributionChannels.join(', ')}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder by WN workorder and distribution channel: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get SalesOrder Header and Item data
     * @param {string} salesOrder - The SalesOrder number
     * @param {string} itemNumber - The item number (000010)
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderHeaderAndItem(salesOrder, itemNumber) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'DistributionChannel', 'YY1_WNWorkOrder_SD_SDI'])
                .where({
                    SalesOrder: salesOrder,
                    SalesOrderItem: itemNumber
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: false,
                    message: `SalesOrder header and item not found for ${salesOrder} item ${itemNumber}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder header and item: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get SalesOrder Business Data (Customer Group)
     * @param {string} salesOrder - The SalesOrder number (VBELN)
     * @param {string} itemNumber - The item number (000000 for header)
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderBusinessData(salesOrder, itemNumber) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            // For business data, we typically query the header
            const query = SELECT.one.from('A_SalesOrder')
                .columns(['SalesOrder', 'CustomerGroup', 'SalesOrganization', 'DistributionChannel'])
                .where({
                    SalesOrder: salesOrder
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: false,
                    message: `SalesOrder business data not found for ${salesOrder}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder business data: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get SalesOrder Partner data
     * @param {string} salesOrder - The SalesOrder number
     * @param {string} itemNumber - The item number (000000 for header)
     * @param {string} partnerFunction - The partner function (ZR)
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderPartner(salesOrder, itemNumber, partnerFunction) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderHeaderPartner')
                .columns(['SalesOrder', 'PartnerFunction', 'Supplier', 'Customer'])
                .where({
                    SalesOrder: salesOrder,
                    PartnerFunction: partnerFunction
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No partner found for SalesOrder ${salesOrder} with function ${partnerFunction}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder partner: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get ZSD_MBEBWE data (ZLIFNR_ZR) using Vendor_VendorRemit entity
     * @param {string} lifnr - The vendor number
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getZsdMbebwe(lifnr) {
        try {
            this.LOG._info && this.LOG.info(`Querying Vendor_VendorRemit for vendor: ${lifnr}`);

            const query = SELECT.one.from(Vendor_VendorRemit)
                .columns(['vendor', 'vendorZR', 'config_ID'])
                .where({ vendor: lifnr });

            const result = await cds.run(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No Vendor_VendorRemit entry found for vendor: ${lifnr}`
                };
            }

            return {
                success: true,
                data: {
                    LIFNR: result.vendor,
                    ZLIFNR_ZR: result.vendorZR
                },
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting Vendor_VendorRemit data: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get SalesOrder item partner - Sold to
     * @param {string} salesOrder - The SalesOrder number
     * @param {string} itemNumber - The item number (000010)
     * @param {string} partnerFunction - The partner function (WE)
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderItemPartner(salesOrder, itemNumber, partnerFunction) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderItemPartner')
                .columns(['SalesOrder', 'SalesOrderItem', 'PartnerFunction', 'Customer'])
                .where({
                    SalesOrder: salesOrder,
                    SalesOrderItem: itemNumber,
                    PartnerFunction: partnerFunction
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No SalesOrder item partner found for SalesOrder ${salesOrder} item ${itemNumber} with function ${partnerFunction}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder item partner: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get SalesOrder item data
     * @param {string} salesOrder - The SalesOrder number
     * @param {string} itemNumber - The item number (000010)
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderItemData(salesOrder, itemNumber) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'Material', 'SalesOrderItemCategory', 'WBSElement', 'ProductionPlant', 'YY1_WNWorkOrder_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI', 'YY1_CustomBillingType_SDI'])
                .where({
                    SalesOrder: salesOrder,
                    SalesOrderItem: itemNumber
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No SalesOrder item data found for SalesOrder ${salesOrder} item ${itemNumber}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder item data: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get next item number
     * @param {string} salesOrder - The SalesOrder number
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getNextItemNumber(salesOrder) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            // Get all item numbers for the SalesOrder
            const query = SELECT.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem'])
                .where({
                    SalesOrder: salesOrder
                });

            const results = await this.salesOrderAPI.executeQuery(query);

            if (!results || results.length === 0) {
                return {
                    success: true,
                    data: {
                        nextItemNumber: '000010' // Default to 000010 if no items found
                    },
                    message: `No items found for SalesOrder ${salesOrder}, using default next item number`
                };
            }

            // Find the maximum item number
            const itemNumbers = results.map(item => parseInt(item.SalesOrderItem, 10));
            const maxItemNumber = Math.max(...itemNumbers);

            // Add 10 to get the next item number
            const nextItemNumber = maxItemNumber + 10;

            // Format to 6-digit string with leading zeros
            const formattedNextItemNumber = nextItemNumber.toString();
            // .padStart(6, '0');

            this.LOG._info && this.LOG.info(`Max item number: ${maxItemNumber}, Next item number: ${formattedNextItemNumber}`);

            return {
                success: true,
                data: {
                    nextItemNumber: formattedNextItemNumber
                },
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting next item number: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Create Purchase Order
     * @param {Object} record - The record to process
     * @returns {Object} Result object with success, data, and message properties
     */
    async _createPurchaseOrder(record) {
        try {
            this.LOG._info && this.LOG.info(`Starting PO creation for record ${record.ID}`);

            // Prepare PO creation payload
            const poPayload = this._preparePurchaseOrderPayload(record);

            if (!poPayload) {
                return {
                    success: false,
                    message: 'Failed to prepare PO payload - missing required data'
                };
            }

            this.LOG._info && this.LOG.info(`PO payload prepared: ${JSON.stringify(poPayload)}`);

            // Create PO using the appropriate API
            // Note: This would need to be implemented based on the actual PO creation API
            // For now, using a placeholder implementation
            const poResult = await this._executePurchaseOrderCreation(poPayload);

            if (poResult.success) {
                this.LOG._info && this.LOG.info(`PO creation successful for record ${record.ID}`);

                // Log the step completion
                // await INSERT.into(InterfaceSteps).entries({ 
                //     record_ID: record.ID, 
                //     step: 'PURCHASE_ORDER_CREATION', 
                //     createdAt: new Date(),
                //     details: `Created PO: ${poResult.data.purchaseOrderNumber}`
                // });

                return {
                    success: true,
                    data: {
                        purchaseOrderNumber: poResult.data.purchaseOrderNumber,
                        purchaseOrderItem: poResult.data.purchaseOrderItem
                    },
                    message: 'Purchase Order created successfully'
                };
            } else {
                this.LOG._error && this.LOG.error(`PO creation failed: ${poResult.message}`);

                // Log the error step
                // await INSERT.into(InterfaceSteps).entries({ 
                //     record_ID: record.ID, 
                //     step: 'PURCHASE_ORDER_CREATION_ERROR', 
                //     createdAt: new Date(),
                //     details: `Error: ${poResult.message}`
                // });

                return {
                    success: false,
                    message: poResult.message
                };
            }

        } catch (err) {
            this.LOG._error && this.LOG.error(`Error in _createPurchaseOrder for record ${record.ID}: ${err.message}`);

            // Log the error step
            try {
                await INSERT.into(InterfaceSteps).entries({
                    record_ID: record.ID,
                    step: 'PURCHASE_ORDER_CREATION_ERROR',
                    createdAt: new Date(),
                    details: `Error: ${err.message}`
                });
            } catch (logErr) {
                this.LOG._error && this.LOG.error(`Failed to log error step: ${logErr.message}`);
            }

            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Prepare Purchase Order payload
     * @param {Object} record - The record to process
     * @returns {Object} PO payload or null if missing required data
     */
    _preparePurchaseOrderPayload(record) {
        try {
            // Check for required data
            if (!record._varSoNum && !record.workOrderWN) {
                this.LOG._error && this.LOG.error(`Missing SalesOrder information for PO creation`);
                return null;
            }

            const salesOrder = record._varSoNum || record.workOrderWN;

            // Determine Material based on expense type for PO
            let poMaterial = 'EXPENSE'; // Default material

            if (record.expenseType === 'DRUG') {
                poMaterial = 'MISC_EXPENSE';
            } else if (record.expenseType === 'BACK') {
                poMaterial = 'MISC_EXPENSE';
            } else if (record.expenseType === 'NON') {
                poMaterial = 'MISC_EXPENSE';
            }

            const poPayload = {
                // Basic PO header information
                PurchaseOrderType: 'NB', // Standard PO
                CompanyCode: '1000', // Default company code
                PurchaseOrganization: '1000', // Default purchase organization
                Vendor: record._varLifnrZr || '0000000000', // Vendor from previous steps

                // PO item information
                to_Item: [{
                    Material: poMaterial,
                    Plant: '1000', // Default plant
                    StorageLocation: '0001', // Default storage location
                    Quantity: '1',
                    Unit: 'EA', // Each
                    NetPrice: record.amount || '0',
                    Currency: record.currency || 'USD',

                    // Reference to SalesOrder
                    ReferenceDocument: salesOrder,
                    ReferenceDocumentItem: '000010',

                    // Additional fields based on record data
                    ItemCategory: '0', // Standard item
                    AccountAssignment: 'K', // Cost center
                    CostCenter: record.project || '0000000000'
                }]
            };

            return poPayload;
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error preparing PO payload: ${err.message}`);
            return null;
        }
    }

    /**
     * Execute Purchase Order creation
     * @param {Object} poPayload - The PO payload to create
     * @returns {Object} Result object with success, data, and message properties
     */
    async _executePurchaseOrderCreation(poPayload) {
        try {
            // Note: This would need to be implemented based on the actual PO creation API
            // For now, using a placeholder implementation that simulates PO creation
            this.LOG._info && this.LOG.info(`Executing PO creation with payload: ${JSON.stringify(poPayload)}`);

            // Simulate PO creation delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Generate mock PO number and item
            const mockPONumber = `PO${Date.now()}`;
            const mockPOItem = '000010';

            this.LOG._info && this.LOG.info(`Mock PO created: ${mockPONumber} Item: ${mockPOItem}`);

            return {
                success: true,
                data: {
                    purchaseOrderNumber: mockPONumber,
                    purchaseOrderItem: mockPOItem
                },
                message: 'Purchase Order created successfully (mock)'
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error executing PO creation: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get WBSElement data
     * @param {string} workOrder - The work order number
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getWbsElementData(workOrder) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'Material', 'SalesOrderItemCategory'])
                .where({
                    YY1_WNWorkOrder_SD_SDI: workOrder
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: false,
                    message: `No SalesOrder found for workorder ${workOrder}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting WBSElement data: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get Customer Payment Terms
     * @param {string} salesOrder - The SalesOrder number
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getCustomerPaymentTerms(salesOrder) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrder')
                .columns(['SalesOrder', 'CustomerPaymentTerms', 'CustomerGroup', 'SalesOrganization', 'DistributionChannel'])
                .where({
                    SalesOrder: salesOrder
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: false,
                    message: `No SalesOrder header found for ${salesOrder}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting Customer Payment Terms: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get PO_BOX from config table
     * @param {string} customer - The customer number
     * @param {string} paymentTerms - The payment terms
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getPoBoxFromConfig(customer, paymentTerms) {
        try {
            this.LOG._info && this.LOG.info(`Querying TravelCustomerPayTermByPOBox for customer: ${customer}, paymentTerms: ${paymentTerms}`);

            const query = SELECT.one.from('com.aleron.monitor.TravelCustomerPayTermByPOBox')
                .columns(['customerNo', 'customerTerm', 'poBox'])
                .where({
                    customerNo: customer,
                    customerTerm: paymentTerms
                });

            const result = await cds.run(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No PO_BOX found for customer: ${customer} and payment terms: ${paymentTerms}`
                };
            }

            return {
                success: true,
                data: {
                    PO_BOX: result.poBox
                },
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting PO_BOX from config: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Create SalesOrder item
     * @param {Object} record - The record to process
     * @param {Object} itemPayload - The item payload to create
     * @returns {Object} Result object with success, data, and message properties
     */
    async _createSalesOrderItem(record, itemPayload) {
        try {
            this.LOG._info && this.LOG.info(`Starting SalesOrder item creation for record ${record.ID}`);

            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            this.LOG._info && this.LOG.info(`Item creation payload: ${JSON.stringify(itemPayload)}`);

            // Create SalesOrder item using the appropriate API
            const creationResults = await this.salesOrderAPI.createSalesOrders([itemPayload]);

            if (!creationResults || creationResults.length === 0) {
                return {
                    success: false,
                    message: 'No response from SalesOrder creation API'
                };
            }

            const creationResult = creationResults[0];

            if (creationResult.hasError) {
                this.LOG._error && this.LOG.error(`SalesOrder item creation failed: ${creationResult.reason}`);
                return {
                    success: false,
                    message: creationResult.reason
                };
            }

            // Log the step completion
            await INSERT.into(InterfaceSteps).entries({
                record_ID: record.ID,
                step: 'SALESORDER_ITEM_CREATION',
                createdAt: new Date(),
                details: `Created SalesOrder item: ${itemPayload.SalesOrder} Item: ${itemPayload.SalesOrderItem}`
            });

            this.LOG._info && this.LOG.info(`SalesOrder item creation successful for record ${record.ID}`);

            return {
                success: true,
                data: creationResult.data,
                message: 'SalesOrder item created successfully'
            };

        } catch (err) {
            this.LOG._error && this.LOG.error(`Error in _createSalesOrderItem for record ${record.ID}: ${err.message}`);

            // Log the error step
            try {
                await INSERT.into(InterfaceSteps).entries({
                    record_ID: record.ID,
                    step: 'SALESORDER_ITEM_CREATION_ERROR',
                    createdAt: new Date(),
                    details: `Error: ${err.message}`
                });
            } catch (logErr) {
                this.LOG._error && this.LOG.error(`Failed to log error step: ${logErr.message}`);
            }

            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get SalesOrder item with specific category
     * @param {string} salesOrder - The SalesOrder number
     * @param {string} itemNumber - The item number
     * @param {string} itemCategory - The item category to filter by
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getSalesOrderItemWithCategory(salesOrder, itemNumber, itemCategory) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            const query = SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'Material', 'SalesOrderItemCategory', 'YY1_PurchasingDoc_SD_SDI'])
                .where({
                    SalesOrder: salesOrder,
                    SalesOrderItem: itemNumber,
                    SalesDocumentItemCategory: itemCategory
                });

            const result = await this.salesOrderAPI.executeQuery(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No SalesOrder item found for SalesOrder ${salesOrder} item ${itemNumber} with category ${itemCategory}`
                };
            }

            return {
                success: true,
                data: result,
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting SalesOrder item with category: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get next PO item number
     * @param {string} purchaseOrder - The Purchase Order number
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getNextPOItemNumber(purchaseOrder) {
        try {
            if (!this.salesOrderAPI) {
                return {
                    success: false,
                    message: 'SalesOrder API not initialized'
                };
            }

            // Note: This would need to be implemented based on the actual PO API
            // For now, using a placeholder implementation
            this.LOG._info && this.LOG.info(`Getting next PO item number for PO: ${purchaseOrder}`);

            // Simulate getting next PO item number
            const mockNextItemNumber = '000020';

            return {
                success: true,
                data: {
                    nextItemNumber: mockNextItemNumber
                },
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting next PO item number: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
        }
    }

    /**
     * Get ZTERM_NET from TravelPayTermFeed
     * @param {string} paymentTerms - The payment terms
     * @returns {Object} Result object with success, data, and message properties
     */
    async _getZtermNet(paymentTerms) {
        try {
            this.LOG._info && this.LOG.info(`Querying TravelPayTermFeed for payment terms: ${paymentTerms}`);

            const query = SELECT.one.from('com.aleron.monitor.TravelPayTermFeed')
                .columns(['paymentTerm', 'netPaymentTerm'])
                .where({
                    paymentTerm: paymentTerms
                });

            const result = await cds.run(query);

            if (!result) {
                return {
                    success: true,
                    data: null,
                    message: `No net payment term found for payment terms: ${paymentTerms}`
                };
            }

            return {
                success: true,
                data: {
                    ZTERM_NET: result.netPaymentTerm
                },
                message: null
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error getting ZTERM_NET: ${err.message}`);
            return {
                success: false,
                message: err.message
            };
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

        await ProcessLogger.removeLogs(aRecordIDs);

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

                this.purchaseOrderAPI.executeQuery(
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
                    message: cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (salesOrder.DistributionChannel !== 'IC') {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_DIST_IC'), process_code: sProcessCode
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

            if (oRecord.PORequiredSAP === '2') {
                let purchaseOrderItem = mPurchaseOrderItem.get(firstSOItem?.YY1_PurchasingDoc_SD_SDI);

                const poItemMax = purchaseOrderItem.reduce((maxItem, current) => {
                    current.PurchaseOrderItem > maxItem.PurchaseOrderItem ? current : maxItem;
                });

                if (Number(poItemMax.PurchaseOrderItem) > Number(lastSOItem.SalesOrderItem)) {
                    lastSOItem.SalesOrderItem = poItemMax.PurchaseOrderItem;
                }
            }

            if (!firstSOItem.WBSElement) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (['CP', 'CR'].includes(oRecord.salesDocumentType)) {
                if (oRecord.wnInvoiceNo + 'IC' === salesOrder.YY1_WNInvoice_SD_SDI) {
                    aErrorLogs.push({
                        record_ID: oRecord.ID,
                        message: cds.i18n.messages.at('ERR_DUPLICATE_LINES'), process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(oRecord.ID);
                    aErrorLogs.push(...aErrors);
                    continue; // Skip this record
                }
            }

            if (oRecord.wnInvoiceNo === salesOrder.YY1_WNInvoice_SD_SDI) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_DUPLICATE_LINES'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
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
                                ...oError, process_code: sProcessCode
                            });
                        });
                    } else {
                        aErrorLogs.push({
                            record_ID: sRecordID,
                            message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM_CREATION_FAILED', [oResult.reason]), process_code: sProcessCode
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
                    return UPDATE(Drug_Background_Check)
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
            await ProcessLogger.removeLogs(aPassedRecordIDs);
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
            PurchaseOrderByCustomer: record?.customerPoNoLabor,
            PricingDate: `/Date(${+moment()})/`,
            ProductionPlant: firstSOItem.ProductionPlant,
            YY1_PurchasingDoc_SD_SDI: soItemMax.YY1_PurchasingDoc_SD_SDI,
            YY1_WeekEnd_SD_SDI: `/Date(${moment(record.weekEndDate, "YYYYMMDD").valueOf()})/`,
            YY1_CustomBillingType_SDI: billingType.Billing_type,
            YY1_WNWorkOrder_SD_SDI: soItemMax.YY1_WNWorkOrder_SD_SDI,
            YY1_WNInvoice_SD_SDI: record.wnInvoiceNo,
            to_ScheduleLine: [this._prepareDataForScheduleLine({ record, lastSOItem })],
            to_PricingElement: {
                results: [{
                    ConditionType: conditionType,
                    ConditionRateValue: record.amount
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


    /**
     * General routine for processing Purchase Order updates (similar to Bonus_G.js)
     * @param {string} sProcessCode - The process code
     * @param {boolean} bBreakExecution - Whether to break execution on error
     * @returns {Object} Result object with hasError and continue properties
     */
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

        let mSalesOrder = new Map(),   // Map for SalesOrders
            mSalesOrderItem = new Map(),   // Map for SalesOrderItems
            mSalesOrderPartner = new Map(),    // Map for SalesOrderPartners
            mBusinessPartner = new Map(),   // Map for BusinessPartner
            mProcessingRecordsToCentralMapping = new Map();

        for (const [iRecordIndex, record] of this.records.entries()) {
            if (this.shouldRecordProcess(record, sProcessCode) && record.PORequiredSAP) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({ ...record });
                mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
                aRecordIDs.push(record.ID);
            } else {
                if (record.PORequiredSAP === '' || !record.PORequiredSAP) {
                    await this.markRecordsValid(sProcessCode, [record.ID], true);
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

        await ProcessLogger.removeLogs(aRecordIDs);

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
                        .columns(['SalesOrder', 'SalesOrderType', 'SalesOrganization', 'DistributionChannel', 'TransactionCurrency'
                            , 'TaxDepartureCountry', 'SoldToParty', 'OrganizationDivision', 'YY1_CustomSalesOrder_SDH'
                        ])
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
                            'YY1_ExtensionUUID1_SDI',
                            // 'YY1_CostCenter_SD_SDI', 
                            'YY1_EEGroup_SD_SDI',
                            'YY1_DuplicateWeek_SD_SDI', 'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI',
                            'YY1_CommodityCode_SD_SDI', 'YY1_ExtensionUUID2_SDI',
                            'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_WNWorkOrder_SD_SDI', 'YY1_CategoryCode_SD_SDI',
                            'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI',
                            'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] }
                        })
                ),

                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderHeaderPartner')
                        .columns(['SalesOrder', 'Customer', 'AddressID', 'ReferenceBusinessPartner', 'PartnerFunction', 'Supplier'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesDocumentNoWhere)] },
                            PartnerFunction: { in: ['SH', 'ZV', 'ZR'] }
                        })
                ),
            ]);

            if (!anySalesOrderErr?.message && aSalesOrders.length) {
                aSalesOrders.forEach((oSalesOrder) =>
                    mSalesOrder.set(oSalesOrder.SalesOrder, oSalesOrder)
                );
            }

            if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
                aSalesOrderItems.forEach((oSalesOrderItem) => {
                    if (!mSalesOrderItem.has(oSalesOrderItem.SalesOrder)) {
                        mSalesOrderItem.set(oSalesOrderItem.SalesOrder, []);
                    }
                    mSalesOrderItem.get(oSalesOrderItem.SalesOrder).push(oSalesOrderItem)
                });
            }

            if (!anySalesOrderPartnerErr?.message && aSalesOrderPartners.length) {
                aSalesOrderPartners.forEach((oSalesOrderPartner) => {
                    if (!mSalesOrderPartner.has(oSalesOrderPartner.SalesOrder)) {
                        mSalesOrderPartner.set(oSalesOrderPartner.SalesOrder, []);
                    }
                    mSalesOrderPartner.get(oSalesOrderPartner.SalesOrder).push(oSalesOrderPartner);
                    if (oSalesOrderPartner.PartnerFunction === 'SH') {
                        aBusinessPartnerAddressWhere.push(oSalesOrderPartner.ReferenceBusinessPartner)
                    }
                });
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        try {
            const [
                { reason: anyBusinessPartnerErr, value: aBusinessPartners },
            ] = await Promise.allSettled([
                this.businessPartnerAPI.executeQuery(
                    SELECT.from('A_BusinessPartnerAddress')
                        .columns(['BusinessPartner', 'Language', 'HouseNumber', 'StreetName', 'CityName', 'PostalCode', 'Country', 'Region', 'TaxJurisdiction'])
                        .where({
                            BusinessPartner: { in: [...new Set(aBusinessPartnerAddressWhere)] }
                        })
                )
            ]);

            if (!anyBusinessPartnerErr?.message && aBusinessPartners.length) {
                aBusinessPartners.forEach((oBusinessPartner) => {
                    mBusinessPartner.set(oBusinessPartner.BusinessPartner, oBusinessPartner)
                });
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        let mPayloadMap = new Map();

        for (const oRecord of aRecordsForProcessing) {
            const aErrors = [];

            let oSalesOrder, oSalesOrderItem, deliveryAddress;

            if (oRecord.PORequiredSAP === '2') {
                oSalesOrder = mSalesOrder.get(oRecord.salesOrderICSAP);
                oSalesOrderItem = mSalesOrderItem.get(oRecord.salesOrderICSAP);
            } else {
                oSalesOrder = mSalesOrder.get(oRecord.salesDocumentNoSAP);
                oSalesOrderItem = mSalesOrderItem.get(oRecord.salesDocumentNoSAP);
            }

            let firstSOItem = oSalesOrderItem.filter(item => item.SalesOrderItem === "10" && item.SalesOrderItemCategory === "TADN")[0];
            let lastSOItem = oSalesOrderItem.reduce((maxItem, current) =>
                Number(current.SalesOrderItem) > Number(maxItem.SalesOrderItem) ? current : maxItem
            );

            // let duplicateCheck = oSalesOrderItem.filter(item => item.YY1_WNInvoice_SD_SDI === oRecord.wnInvoiceNo) ?? [];
            let duplicateCheck = oSalesOrderItem.filter(item =>
                item.YY1_WNInvoice_SD_SDI === oRecord.wnInvoiceNo &&
                item.SalesOrderItem !== oRecord.salesItemNoSAP
            ) ?? [];

            let oSalesOrderPartner = mSalesOrderPartner.get(oRecord.salesDocumentNoSAP);
            let oSalesOrderPartnerSH = oSalesOrderPartner.filter(p => p.PartnerFunction === 'SH')[0];
            let oBusinessPartner = mBusinessPartner.get(oSalesOrderPartnerSH?.ReferenceBusinessPartner);
            let conditionType = await determineConditionType({
                customer: oSalesOrder.SoldToParty,
                salesOrganization: oSalesOrder.SalesOrganization,
                distributionChannel: oSalesOrder.DistributionChannel,
                division: oSalesOrder.OrganizationDivision
            });

            if (!oRecord.purchaseDocumentNoSAP) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: 'Purchase order missing - PO must exist from previous SalesOrder processing', process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (!oSalesOrder.SalesOrder) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: 'Sales order not found', process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this
            }

            if (oSalesOrder.YY1_CustomSalesOrder_SDH !== 'ZWMS') {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: 'Sales order type must be ZWMS', process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (!firstSOItem.WBSElement) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: 'Project not found on dummy line 00010', process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            }

            if (!oSalesOrderPartnerSH.Customer) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: 'Ship-to partner SH missing', process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                continue; // Skip this record
            } else {
                deliveryAddress = {
                    PurchaseOrder: lastSOItem.YY1_PurchasingDoc_SD_SDI,
                    PurchaseOrderItem: lastSOItem.SalesOrderItem,
                    DeliveryAddressID: oSalesOrderPartnerSH.AddressID
                };
            }


            const oItemPayload = this._prepareDataForPurchaseOrderUpdate({
                record: oRecord,
                salesOrder: oSalesOrder,
                firstSOItem: firstSOItem,
                lastSOItem: lastSOItem,
                businessPartnerSH: oSalesOrderPartnerSH,
                deliveryAddress: deliveryAddress,
                conditionType: conditionType,
                duplicateCheck: duplicateCheck,
                businessPartner: oBusinessPartner
            });

            const oPurchaseOrderItemResults = await this.purchaseOrderAPI.createPurchaseOrderItem(firstSOItem.YY1_PurchasingDoc_SD_SDI, oItemPayload);

            if (oPurchaseOrderItemResults.error) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: `${oPurchaseOrderItemResults.error}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                LOG.error(
                    `Error processing record ID ${oRecord.ID}: ${oPurchaseOrderItemResults.error}`,
                );
                continue; // Skip this record
            } else {
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
                aPassedRecordIDs.push(oRecord.ID);
                await this.salesOrderAPI.executeQuery(
                    UPDATE('A_SalesOrderItem')
                        .set({ YY1_PurchasingDoc_SD_SDI: oPurchaseOrderItemResults.value.PurchaseOrder })
                        .where({
                            SalesOrder: oSalesOrder.SalesOrder,
                            SalesOrderItem: oSalesOrderItem.SalesOrderItem
                        })
                );
            }
            // else if (oPurchaseOrderItemResults.error) {
            //     aErrorLogs.push({
            //         record_ID: oRecord.ID,
            //         message: `${oPurchaseOrderItemResults.error}`,
            //     });
            //     aFailedRecordIDs.push(oRecord.ID);
            //     this.LOG._error && this.LOG.error(
            //         `Error processing record ID ${oRecord.ID}: ${oPurchaseOrderItemResults.error}`,
            //     );
            //     continue; // Skip this record
            // }
        }

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(Drug_Background_Check)
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
                    return UPDATE(Drug_Background_Check)
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
            await ProcessLogger.removeLogs(aPassedRecordIDs);
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

    /**
     * Prepare data for Purchase Order update (similar to Bonus_G.js)
     * @param {object} params
     * @param {object} params.record - record from file
     * @param {object} params.salesOrder - SalesOrder object
     * @param {object} params.firstSOItem - First SalesOrder item
     * @param {object} params.lastSOItem - Last SalesOrder item
     * @param {object} params.businessPartnerSH - Business Partner SH data
     * @param {object} params.deliveryAddress - Delivery address data
     * @param {string} params.conditionType - Condition type for pricing
     * @param {Array} params.duplicateCheck - Duplicate check results
     * @returns {object} Purchase Order update payload
     */
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
            PurchaseOrder: lastSOItem.YY1_PurchasingDoc_SD_SDI,
            PurchaseOrderItem: record.salesItemNoSAP,
            PurchaseOrderCategory: 'F',
            CompanyCode: salesOrder.SalesOrganization,
            Material: firstSOItem.Material || 'EXPENSE',
            Plant: firstSOItem.ProductionPlant || '1000',
            PurchaseOrderQuantityUnit: firstSOItem.OrderQuantityUnit || 'EA',
            OrderQuantity: 1,
            NetPriceQuantity: 1,
            OrderPriceUnit: firstSOItem.OrderQuantityUnit || 'EA',
            DocumentCurrency: salesOrder.TransactionCurrency || 'USD',
            NetPriceAmount: Number(record.amount) || 0,
            TaxCode: 'I0',
            TaxJurisdiction: businessPartner.TaxJurisdiction,
            AccountAssignmentCategory: 'Z',
            YY1_SDDocumentPD_PDI: record.salesDocumentNoSAP || '',
            YY1_WNWorkOrder_PDI: lastSOItem.YY1_WNWorkOrder_SD_SDI || '',
            // YY1_CostCenter_PDI: lastSOItem.YY1_WNWorkOrder_SD_SDI || '',
            YY1_SupplierInvoiceNum_PDI: lastSOItem.YY1_SupplierInvoice_SD_SDI || '',
            YY1_WeekEnd_PDI: lastSOItem.YY1_WeekEnd_SD_SDI || '',
            YY1_WNInvoice_PDI: record.wnInvoiceNo || '',
            _PurOrdAccountAssignment: [{
                PurchaseOrderItem: record.salesItemNoSAP,
                AccountAssignmentNumber: '1',
                GLAccount: '',
                ControllingArea: 'A000',
                WBSElementExternalID: lastSOItem.WBSElement,
                Quantity: Number(lastSOItem.RequestedQuantity) || 1,
                OrderQuantityUnit: lastSOItem.OrderQuantityUnit || 'EA',
                DocumentCurrency: salesOrder.TransactionCurrency || 'USD',
                PurgDocNetAmount: Number(record.amount) || 0
            }]
            // _PurOrdPricingElement: [{
            //     ConditionType: conditionType,
            //     ConditionRateAmount: Number(record.amount) || 0
            // }]
        };

        if (deliveryAddress.DeliveryAddressID) {
            oReturnData._DeliveryAddress = deliveryAddress;
        } else {
            oReturnData._DeliveryAddress = {
                PurchaseOrder: lastSOItem.YY1_PurchasingDoc_SD_SDI,
                PurchaseOrderItem: record.salesItemNoSAP,
                CorrespondenceLanguage: businessPartnerSH?.Language || 'EN',
                HouseNumber: businessPartnerSH?.HouseNumber || '',
                StreetName: businessPartnerSH?.StreetName || '',
                CityName: businessPartnerSH?.CityName || '',
                PostalCode: businessPartnerSH?.PostalCode || '',
                Country: businessPartnerSH?.Country || 'US',
                Region: businessPartnerSH?.Region || ''
            };
        }

        // Set GL Account based on SalesOrder type and distribution channel
        if (['ZWMS'].includes(salesOrder.YY1_CustomSalesOrder_SDH) && salesOrder.DistributionChannel !== 'IC') {
            oReturnData._PurOrdAccountAssignment[0].GLAccount = '0000540110';
        } else if (['ZWMS'].includes(salesOrder.YY1_CustomSalesOrder_SDH) && salesOrder.DistributionChannel === 'IC') {
            oReturnData._PurOrdAccountAssignment[0].GLAccount = '0000588000';
        }

        if (duplicateCheck.length > 0) {
            oReturnData.YY1_DuplicateWeek_PDI = 'X';
        }

        return oReturnData;
    }



    /**
     * Determine condition type similar to Travel.js STEP 5.7a
     * @param {Object} soHdr - Sales Order header data
     * @returns {Promise<string>} Condition type
     */
    async _determineConditionType(soHdr) {
        try {
            // Use the imported determineConditionType function from pricingHelper
            const condType = await determineConditionType({
                customer: soHdr.SoldToParty,
                salesOrganization: soHdr.SalesOrganization,
                distributionChannel: soHdr.DistributionChannel,
                division: soHdr.OrganizationDivision
            });

            this.LOG._info && this.LOG.info(`Determined condition type: ${condType} for customer: ${soHdr.SoldToParty}, org: ${soHdr.SalesOrganization}, channel: ${soHdr.DistributionChannel}, division: ${soHdr.OrganizationDivision}`);

            return condType;
        } catch (err) {
            this.LOG._error && this.LOG.error(`Error determining condition type: ${err.message}`);
            return 'PBXX'; // Default fallback
        }
    }


    /**
     * Set rejection reasons for records (similar to RejectSO pattern)
     * @param {string} sProcessCode - The process code
     * @param {boolean} bBreakExecution - Whether to break execution on error
     * @returns {Object} Result object with hasError and continue properties
     */
    async RejectSO(sProcessCode, bBreakExecution) {
        const aRecordsForProcessing = [];
        const aPassedRecordIDs = [];
        const aFailedRecordIDs = [];
        const aSkippedRecords = [];
        const aErrorLogs = [];

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                aRecordsForProcessing.push({ ...record });
            } else {
                aSkippedRecords.push({ ...record });
                continue;
            }
        }

        this.updateProcessingState(sProcessCode);
        if (!aRecordsForProcessing.length) {
            // If Step doesn't need to be processed, simply return to avoid costly calls
            return {
                hasError: false,
                continue: true,
            };
        }

        for (const record of this.records) {
            // if (record.creditSteps && record.creditSteps.split(',').includes('H')) 
            {
                try {
                    // const status = record.orderRelatedBillingStatus;
                    // if (sProcessCode === '1' && (status === 'A' || status === '')) 
                    {
                        // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'H', createdAt: new Date() });
                        // await this._deletePreviousSteps(record.ID, 'H');
                        // aPassedRecordIDs.push(record.ID);
                        // PATCH SalesOrderItem to set rejection reason
                        // const patchResult = await this.salesOrderAPI.updateSalesOrderItem({
                        //     SalesOrder: record.salesDocumentNoSAP,
                        //     SalesOrderItem: record.salesItemNoSAP || '000010',
                        //     SalesDocumentRjcnReason: '60' // or your required reason code
                        // });
                        const patchResult = await this.salesOrderAPI.executeQuery(
                            UPDATE('A_SalesOrderItem')
                                .set({
                                    SalesDocumentRjcnReason: '60' // or your required reason code
                                })
                                .where({
                                    SalesOrder: record.salesDocumentNoSAP,
                                    SalesOrderItem: record.salesItemNoSAP
                                })
                        );

                        if (!patchResult.error) {
                            // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'H', createdAt: new Date() });
                            // await this._deletePreviousSteps(record.ID, 'H');
                            aPassedRecordIDs.push(record.ID);
                        } else {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error rejecting sales order item: ${patchResult.error}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                    }
                    // else {
                    //     aSkippedRecords.push(record.ID);
                    // }
                } catch (err) {
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: `Error rejecting sales order: ${err.message}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                }
            }
            // else {
            //     aPassedRecordIDs.push(record.ID);
            // }
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);
            await UPDATE(Drug_Background_Check)
                .set({
                    valid: true,
                    processLevel_code: sProcessCode
                })
                .where({ ID: { in: aPassedRecordIDs } });
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(this.recordsEntity)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    /**
    * Prepare VC Data Payload and insert it
    * @param {Object} params - Parameters for VC Data preparation
    * @param {Array} params.records - Array of records to process
    * @param {Map} params.mCustomerFieldNameValue - Map of customer field data
    * @param {Map} params.mPayloadMap - Map of payload data
    * @param {Map} params.mSalesOrders - Map of SalesOrder data
    * @param {Array} params.aPassedRecordIDs - Array of passed record IDs
    * @param {Array} params.aFailedRecordIDs - Array of failed record IDs
    * @param {Array} params.aErrorLogs - Array of error logs
    */
    async _prepareVCData({
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
                const oSalesOrder = mSalesOrders.get(record.workOrderWN);


                if (oMapEntry && oMapEntry.salesOrder) {
                    const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID);
                    const VC1CustomerFieldName = ['Z40', 'Z43', 'Z44', 'Z45', 'Z46'];
                    const VC2CustomerFieldName = ['Z01', 'Z02', 'Z03', 'Z04', 'Z05', 'Z06', 'Z07', 'Z08', 'Z09', 'Z10', 'Z11', 'Z12',
                        'Z16', 'Z17', 'Z18', 'Z19', 'Z24', 'Z25', 'Z26', 'Z27', 'Z28', 'Z29', 'Z31',
                        'Z32', 'Z33', 'Z34', 'Z35', 'Z37', 'Z39', 'Z42'];

                    const oCustFieldResult = aCustomerfieldEntry ? aCustomerfieldEntry.reduce((acc, entry) => {
                        if (VC1CustomerFieldName.includes(entry.customerFieldName)) {
                            acc.VC1Fields[entry.fieldName] = entry.customerFieldValue;
                        } else if (VC2CustomerFieldName.includes(entry.customerFieldName)) {
                            acc.VC2Fields[entry.fieldName] = entry.customerFieldValue;
                        }
                        return acc;
                    }, { VC1Fields: {}, VC2Fields: {} }) : { VC1Fields: {}, VC2Fields: {} };

                    const salesVC1 = {
                        SalesOrderNumber: oMapEntry.salesOrder,
                        SalesOrderItemNum: oMapEntry.salesOrderItem,
                        ...(oCustFieldResult.VC1Fields || {}),
                    };
                    const salesVC2 = {
                        Sales_Order_Number: oMapEntry.salesOrder,
                        Sales_Order_Item_Num: oMapEntry.salesOrderItem,
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
            // TODO: Convert to Batch call and take call out of loop
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

                // remove id which is getting error from PassRecordIds.
                const index = aPassedRecordIDs.indexOf(aPayloadsSalesVCData[i][2]);
                if (index !== -1) aPassedRecordIDs.splice(index, 1);
                this.LOG._error && this.LOG.error(
                    `Error processing record ID ${aPayloadsSalesVCData[i][2]}: ${insertedSalesVCData1.message} || ${insertedSalesVCData2.message}`,
                );
            }
        }
    }


    async CreditMIRO(sProcessCode, bBreakExecution) {
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

        let mPurchaseOrder = new Map(),     // Map for PurchaseOrder
            mPurchaseOrderItem = new Map(), // Map for PurchaseOrderItem
            mSalesOrder = new Map(),        // Map for SaleOrder
            mSalesOrderLastItem = new Map(),    // Map for SalesOrderLastItem
            mSalesOrderLastFirstItem = new Map(),    // Map for SalesOrderFirstItem
            mEmpCustInfo = new Map();       // Map for EmpCustInfo 

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode) && record.PORequiredSAP) {
                // If record is on step level & is already valid, then skip
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

            if (record.purchaseDocumentNoSAP) {
                aPurchaseOrderWhere.push(record.purchaseDocumentNoSAP);
            }

            if (record.purchaseDocumentItemSAP) {
                aPurchaseOrderItemWhere.push(record.purchaseDocumentItemSAP);
            }

            if (record.employeeNo) {
                aEmpCustInfoWhere.push(record.employeeNo);
            }
        }

        await ProcessLogger.removeLogs(aRecordIDs);

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
                { reason: anySalesOrderLastItemErr, value: aSalesOrderLastItems },
                { reason: anySalesOrderFirstItemErr, value: aSalesOrderFirstItems },
            ] = await Promise.allSettled([
                this.purchaseOrderAPI.executeQuery(
                    SELECT.from('PurchaseOrder')
                        .columns(['PurchaseOrder', 'DocumentCurrency', 'Supplier'])
                        .where({
                            PurchaseOrder: { in: [...new Set(aPurchaseOrderWhere)] }
                        })
                ),

                this.purchaseOrderAPI.executeQuery(
                    SELECT.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder', 'PurchaseOrderItem', 'OrderQuantity', 'NetPriceAmount',
                            'TaxCode', 'TaxJurisdiction', 'Plant', 'CompanyCode',
                            'PurchaseOrderQuantityUnit', 'Material'])
                        .where({
                            PurchaseOrder: { in: [...new Set(aPurchaseOrderWhere)] },
                            PurchaseOrderItem: { in: [...new Set(aPurchaseOrderItemWhere)] }
                        })
                ),

                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI', 'YY1_WNInvoice_SD_SDI',
                            'YY1_WNWorkOrder_SD_SDI'
                        ])
                        .where({
                            YY1_PurchasingDoc_SD_SDI: { in: [...new Set(aPurchaseOrderWhere)] },
                            SalesOrderItem: { in: [...new Set(aPurchaseOrderItemWhere)] },
                        })
                ),

                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI', 'YY1_WNInvoice_SD_SDI',
                            'YY1_WNWorkOrder_SD_SDI'
                        ])
                        .where({
                            YY1_PurchasingDoc_SD_SDI: { in: [...new Set(aPurchaseOrderWhere)] },
                            SalesOrderItem: '10',
                        })
                ),
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

            if (!anySalesOrderLastItemErr?.message && aSalesOrderLastItems.length) {
                aSalesOrderLastItems.forEach((oSalesOrderItem) => {
                    mSalesOrderLastItem.set(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI, oSalesOrderItem);
                    aSalesOrderWhere.push(oSalesOrderItem.SalesOrder);
                });
            }

            if (!anySalesOrderFirstItemErr?.message && aSalesOrderFirstItems.length) {
                aSalesOrderFirstItems.forEach((oSalesOrderItem) => {
                    mSalesOrderLastFirstItem.set(oSalesOrderItem.YY1_PurchasingDoc_SD_SDI, oSalesOrderItem);
                    if (!aSalesOrderWhere.includes(oSalesOrderItem.SalesOrder)) {
                        aSalesOrderWhere.push(oSalesOrderItem.SalesOrder);
                    }
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
                        .columns(['SalesOrder', 'SalesOrganization', 'DistributionChannel', 'OrganizationDivision',
                            'YY1_AlphanumericSalesO_SDH'
                        ])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderWhere)] },
                        })
                ),

                this.empCustInfoAPI.executeQuery(
                    SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
                        .columns(['Name', 'FirstName', 'MiddleName', 'WORKER_ID'])
                        .where({
                            WORKER_ID: { in: [...new Set(aEmpCustInfoWhere)] },
                        })
                ),
            ]);

            if (!anySalesOrderErr?.message && aSalesOrders.length) {
                aSalesOrders.forEach((oSalesOrder) => {
                    mSalesOrder.set(oSalesOrder.SalesOrder, oSalesOrder);
                });
            }

            if (!anyEmpCustInfoErr?.message && aEmpCustInfos.length) {
                aEmpCustInfos.forEach((oEmpCustInfo) => {
                    mEmpCustInfo.set(oEmpCustInfo.WORKER_ID, oEmpCustInfo);
                });
            }
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        try {
            for (const oRecord of aRecordsForProcessing) {
                const oPurchaseOrder = mPurchaseOrder.get(oRecord.purchaseDocumentNoSAP);
                const oPurchaseOrderItem = mPurchaseOrderItem.get(oRecord.purchaseDocumentNoSAP);
                const oEmpCustInfo = mEmpCustInfo.get(oRecord.employeeNo);

                if (!oEmpCustInfo) {
                    aErrors.push({
                        record_ID: oRecord.ID,
                        message: cds.i18n.messages.at('ERR_EMP_NO_MISSING_INFOTYPE'), process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(oRecord.ID);
                    aErrorLogs.push(...aErrors);
                    continue; // Skip this record
                }

                let paymentBlockingReason;
                try {
                    const lfa1Row = await this.supplierLFA1API.executeQuery(
                        SELECT.one
                            .from('YY1_Supplier_LFA1') // entity set per S/4: .../YY1_SUPPLIER_LFA1_CDS/YY1_Supplier_LFA1
                            .columns(['Supplier', 'SupplierStandardCarrierAccess'])
                            .where({ Supplier: oPurchaseOrder?.Supplier })
                    );
                    const carrier = lfa1Row?.SupplierStandardCarrierAccess;
                    paymentBlockingReason = carrier ? String(carrier).trim().slice(0, 2).toUpperCase() : undefined;
                } catch (e) {
                    LOG.error(`[Drug][MIRO] Supplier LFA1 lookup failed for ${oPurchaseOrder?.Supplier}: ${e.message}`);
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

                    await UPDATE(Drug_Background_Check)
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
            await UPDATE(Drug_Background_Check)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);
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

module.exports = DrugBackgroundCheckProcessor; 