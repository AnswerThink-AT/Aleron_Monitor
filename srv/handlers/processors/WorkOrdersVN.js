//Interface S
const cds = require('@sap/cds');
const moment = require('moment');
const Processor = require('./BaseProcessor');
const LOG = cds.log('Monitor.Procesor-WorkOrdersVN');
const ProcessLogger = require('../common/ProcessLogger');

const SalesContractComm = require('../communicators/SalesContract');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SalesOrderComm = require('../communicators/SalesOrder');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const SmartyAddressComm = require('../communicators/SmartyAddress');
const ProductComm = require('../communicators/Product');
const WorkforceComm = require('../communicators/Workforce');
const HrCostDistObj = require('../communicators/HrCostDistObj');
const BillingTypeComm = require('../communicators/BillingType');

// Utility & Common functions
const {
    toEmployeeType
} = require('../common/utils');
const {
    fractionalseconds
} = require('@cap-js/hana/lib/cql-functions');

// List of required entities
const {
    WorkOrders,
    FieldValidations,
    FieldValidations: {
        elements: {
            validation: {
                enum: mFieldValidationTypeEnum
            },
        },
    },
} = cds.entities('com.aleron.monitor');

class WorkOrdersVN extends Processor {
    constructor(options) {
        super(options);
        // Processor Specific configuration
        this.recordsEntity = 'com.aleron.monitor.WorkOrders';
        this.LOG = cds.log('Monitor.Processor-WorkOrdersVN');
        this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

        // Communicators used by EmployeeContractor Processor
        this.salesContractAPI = null;
        this.businesPartnerAPI = null;
        this.countryRegionAPI = null;
        this.salesOrderAPI = null;
        this.smartyAddressAPI = null;
        this.enterpriseProjectAPI = null;
        this.empCustInfoAPI = null;
        this.productAPI = null;
        this.workforceAPI = null;
        this.HrCostDistObjAPI = null;
        this.billingTypeAPI = null;
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
        this.HrCostDistObjAPI = new HrCostDistObj();
        this.billingTypeAPI = new BillingTypeComm();
        // this.countryRegionAPI = new CountryRegionComm();
    }

    _getColumnsForFetch(sEntity) {
        const mEntityColumns = {
            'com.aleron.monitor.WorkOrders': [
                ...['ID', 'file_ID', 'processLevel_code', 'valid', ], // mandatory columns
                ...['salesOffice', 'salesDocumentType', ], // sales data columns
                ...['contractNo', 'companyCode', ], // sales contract
                ...['soldToParty', 'billToParty'], // partner function
                ...[
                    'doorNo',
                    'street',
                    'city',
                    'region',
                    'country',
                    'postalCode',
                ], // address columns
                ...[
                    'personnelNoSAP',
                    'projectNumberSAP',
                    'projectUUID',
                    'vcData1UUID',
                    'vcData2UUID',
                    'workOrderWN',
                    'materialNo',
                    'remitToVendor',
                    'currency',
                    'endDate',
                    'beginDate',
                    'ssn',
                    'workLocation',
                    'actionType',
                    'lastName',
                    'firstName',
                    'middleName',
                    'laborPurchaseOrder',
                    'laborPODate',
                    'attentionLine',
                    'distributionEmail',
                    'PORequiredSAP',
                ], // extra columns
                ...[
                    'shiftCustomerBillRateFirst',
                    'shiftCustomerOTBillRateFirst',
                    'shiftCustomerDTBillRateFirst',
                    'shiftCustomerBillRateSecond',
                    'shiftCustomerOTBillRateSecond',
                    'shiftCustomerDTBillRateSecond',
                    'shiftCustomerBillRateThird',
                    'shiftCustomerOTBillRateThird',
                    'shiftCustomerDTBillRateThird',
                ], // shift customer rates columns
                ...[
                    'shiftVendorPayRateFirst',
                    'shiftVendorOTPayRateFirst',
                    'shiftVendorDTPayRateFirst',
                    'shiftVendorPayRateSecond',
                    'shiftVendorOTPayRateSecond',
                    'shiftVendorDTPayRateSecond',
                    'shiftVendorPayRateThird',
                    'shiftVendorOTPayRateThird',
                    'shiftVendorDTPayRateThird',
                ], // shift vendor rates column
                ...[
                    'customerFieldName1',
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
                ...['salesDocumentNoSAP', 'salesItemNoSAP'], // Sales Order Information
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
        let aSalesContracts = [];

        // Clear the error logs for the selected records; so that new process can start
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);
        // Get list of countries by looping over `this.file.to_WorkOrders` and get unique countries

        let aCountries = [];
        let aAreas = [];
        let aActionIndicators = [];
        let aSalesContractIDs = [];
        let aZipCodesToCheck = [];
        let aRemitVendors = [];
        let aWNWorkOrders = [];
        let aRecordIDs = [];

        let mSalesOrderItems = new Map(); // Map for Sales Order Item 

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                aRecordsForProcessing.push({
                    ...record
                });
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({
                    ...record
                });
                continue;
            }

            if (record.contractNo) {
                aSalesContractIDs.push(record.contractNo);
            }

            if (record.salesDocumentType) {
                aAreas.push(`ZW${record.salesDocumentType}`);
            }

            if (record.actionType) {
                aActionIndicators.push(record.actionType);
            }

            if (record.contractNo) {
                aSalesContractIDs.push(record.contractNo);
            }

            if (record.postalCode) {
                aZipCodesToCheck.push({
                    zipcode: String(record.postalCode),
                    record_ID: record.ID,
                });
            }

            if (record.remitToVendor) {
                aRemitVendors.push(record.remitToVendor)
            }

            if (record.workOrderWN) {
                aWNWorkOrders.push(record.workOrderWN)
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

        const [{
                reason: anySalesContractPrimaryErr,
                value: aSalesContractPrimaryResults
            },
            {
                reason: anySalesContractFallbackErr,
                value: aSalesContractFallbackResults
            },
            {
                reason: anyFieldValidationErr,
                value: aFieldValidations
            },
            {
                reason: anyZipCodeErr,
                value: aZipCodeValidations
            },
            {
                reason: anySupplierErr,
                value: aSuppliers
            },
            {
                reason: anySalesOrderItemErr,
                value: aSalesOrderItems
            },
        ] = await Promise.allSettled([
            // Sales Contract Information
            // Primary query using SalesContract field
            this.salesContractAPI.executeQuery(
                SELECT.from('SalesContract')
                .columns(['SalesContract', 'SalesOrganization', 'DistributionChannel', 'SoldToParty', 'PurchaseOrderByCustomer'])
                .where({
                    SalesContract: {
                        in: aSalesContractIDs
                    }
                }),
            ),
            // Fallback query using PurchaseOrderByCustomer field
            this.salesContractAPI.executeQuery(
                SELECT.from('SalesContract')
                .columns(['SalesContract', 'SalesOrganization', 'DistributionChannel', 'SoldToParty', 'PurchaseOrderByCustomer'])
                .where({
                    PurchaseOrderByCustomer: {
                        in: aSalesContractIDs
                    }
                }),
            ),

            // All Field Validations
            SELECT.from(FieldValidations)
            .columns(['field', 'validation', 'term'])
            .where({
                // FIXME: Change it to tagged template to format `entry or entry or entry`
                interfaceType_ID: this.file.interfaceType_ID,
                country: {
                    in: aCountries,
                },
                area: {
                    in: aAreas,
                },
                actionIndicator: {
                    in: aActionIndicators,
                },
                validation: {
                    in: [mFieldValidationTypeEnum.blank.val, mFieldValidationTypeEnum.mandatory.val],
                },
            }),

            // ZipCode Validation
            this.smartyAddressAPI.checkZipCodes(aZipCodesToCheck),

            this.businesPartnerAPI.executeQuery(
                SELECT.from('A_Supplier')
                .columns(['Supplier'])
                .where({
                    Supplier: {
                        in: aRemitVendors
                    }
                }),
            ),

            this.salesOrderAPI.executeQuery(
                SELECT.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'YY1_WNWorkOrder_SD_SDI'])
                .where({
                    YY1_WNWorkOrder_SD_SDI: {
                        in: aWNWorkOrders
                    },
                    SalesOrderItem: '10'
                })
            )
        ]);

        if (!anySalesContractPrimaryErr && aSalesContractPrimaryResults && aSalesContractPrimaryResults.length > 0) {
            aSalesContracts.push(...aSalesContractPrimaryResults);
        }
        if (!anySalesContractFallbackErr && aSalesContractFallbackResults && aSalesContractFallbackResults.length > 0) {
            const primarySet = new Set(aSalesContracts.map(r => r.SalesContract));
            const fallbackOnly = aSalesContractFallbackResults.filter(r => !primarySet.has(r.SalesContract));
            aSalesContracts.push(...fallbackOnly);
        }

        if (anyFieldValidationErr) {
            LOG._error && LOG.error(anyFieldValidationErr.message);
        }

        if (anyZipCodeErr) {
            LOG._error && LOG.error(anyZipCodeErr.message);
        }

        if (anySupplierErr) {
            LOG._error && LOG.error(anySupplierErr.message);
        }

        if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
            aSalesOrderItems.forEach((oSalesOrderItem) => {
                mSalesOrderItems.set(oSalesOrderItem.YY1_WNWorkOrder_SD_SDI, oSalesOrderItem)
            });
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

        const mZipCodeValidation = new Map([...aZipCodeValidations.map((r) => [r.record_ID, r])]);

        const mDistChannelMap = new Map();

        // Run the steps only for filtered records
        // aRecordsForProcessing.forEach(async (oRecord) =>
        for (const oRecord of aRecordsForProcessing) {
            let hasRecordFailed = false;

            // Check postal code format
            const oZipCode = mZipCodeValidation.get(oRecord.ID);
            if (!oZipCode?.valid) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_ZIPCODE_NOT_VALID'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }

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
            const oSalesContractRes = await this._validateSalesContract(oRecord, aSalesContracts, mDistChannelMap);
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

            // Check Supplier - Remit Vendor
            const oSupplierRes = this._validateSupplier(oRecord, aSuppliers);
            if (oSupplierRes.hasError) {
                oSupplierRes.errors.forEach((err) => {
                    err.process_code = sProcessCode;
                });
                aErrorLogs.push(...oSupplierRes.errors);
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }

            const oSalesOrderItem = mSalesOrderItems.get(oRecord.workOrderWN);
            if (oSalesOrderItem) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_ORDER_EXIST_WNWORKORDER', [
                        oSalesOrderItem.SalesOrder,
                        oRecord.workOrderWN
                    ]),process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }

            if (!hasRecordFailed) {
                aPassedRecordIDs.push(oRecord.ID);
            }
            // });
        }

        // If errors are there, log them and update failed records
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
                        return UPDATE(WorkOrders)
                            .set({
                                valid: false,
                                processLevel_code: recordProcessLevelCode
                            })
                            .where({
                                ID: recordID
                            });
                    }),
                ]);
                LOG._info &&
                    LOG.info(
                        cds.i18n.messages.at('INFO_RECORDS_UPDATED', [
                            sProcessCode,
                            aErrorLogs.map((log) => log.record_ID).join(','),
                        ]),
                    );
            } catch (err) {
                LOG._error && LOG.error(err.message);
            }
        }
        if (aPassedRecordIDs.length) {

            // Update contractNo in the entity for all passed records
            await Promise.allSettled(
                aPassedRecordIDs.map(id => {
                    const rec = this.records.find(r => r.ID === id);
                    if (rec && rec.contractNo) {
                        return UPDATE(WorkOrders)
                            .set({
                                contractNo: rec.contractNo
                            })
                            .where({
                                ID: id
                            });
                    }
                    return Promise.resolve();
                })
            );

            await Promise.allSettled([
                ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode),
                ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3}))),
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
                    return UPDATE(WorkOrders)
                        .set({
                            valid: true,
                            processLevel_code: recordProcessLevelCode
                        })
                        .where({
                            ID: recordID
                        });
                }),
            ]);
            LOG._info && LOG.info(cds.i18n.messages.at('INFO_RECORDS_UPDATED', [sProcessCode, 'All']));
        }

        if (mDistChannelMap.size) {
            for (const [id, {
                    distributionChannel
                }] of mDistChannelMap.entries()) {
                // update this.records 
                const record = this.records.find(r => r.ID === id);
                record.distributionChannel = distributionChannel;
                // update DB
                await UPDATE(WorkOrders)
                    .set({
                        distributionChannel
                    })
                    .where({
                        ID: id
                    });
            }
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

    _validateFieldValidations({
        stMandatoryFields,
        stBlankFields,
        oRecord
    }) {
        let hasError = false,
            aErrorLogs = [];
        for (const anyField in oRecord) {
            if (stMandatoryFields.has(anyField) && !oRecord[anyField]) {
                hasError = true;
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_MANDT_FIELD', [anyField]),process_code: sProcessCode
                });
            }
            if (stBlankFields.has(anyField) && oRecord[anyField]) {
                hasError = true;
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_BLANK_FIELD', [anyField]),process_code: sProcessCode
                });
            }
        }
        return {
            hasError,
            errors: aErrorLogs,
        };
    }

    // --- Step 2: Hire / Re-Hire ---
    async employeeHire(sProcessCode, bBreakExecution) {
    this.LOG._info && this.LOG.info('Starting employeeHire process');

    // =========================================================
    // PRE-PASS: Fill personnel numbers for 'U' duplicates (SSN)
    // - Reads ALL lines of the current file(s)
    // - Copies personnelNoSAP to U rows with matching SSN
    // - DOES NOT change processLevel_code or valid
    // =========================================================
    try {
        const trim = v => (v ?? '').toString().trim();
        const uniq = arr => [...new Set(arr)];
        const fileIdsAll = uniq(this.records.map(r => r.file_ID).filter(Boolean));

        if (fileIdsAll.length) {
        const siblingRows = await SELECT.from(WorkOrders)
            .columns(['ID','file_ID','processLevel_code','valid','ssn','personnelNoSAP'])
            .where({ file_ID: { in: fileIdsAll } });

        const mSsnToEmp = new Map();
        (siblingRows || []).forEach(r => {
            const emp = trim(r.personnelNoSAP);
            if (!emp) return;
            const s = trim(r.ssn);
            if (s && !mSsnToEmp.has(s)) mSsnToEmp.set(s, emp);
        });

        const toFill = (siblingRows || [])
            .filter(r => r.processLevel_code === 'U' && !trim(r.personnelNoSAP))
            .map(r => {
            const emp = mSsnToEmp.get(trim(r.ssn));
            return emp ? { id: r.ID, emp } : null;
            })
            .filter(Boolean);

        if (toFill.length) {
            await Promise.allSettled(
            toFill.map(x =>
                UPDATE(WorkOrders).set({ personnelNoSAP: x.emp }).where({ ID: x.id })
            )
            );
            // sync in-memory
            const filledMap = new Map(toFill.map(x => [String(x.id), x.emp]));
            for (const r of this.records) {
            const emp = filledMap.get(String(r.ID));
            if (emp) r.personnelNoSAP = emp;
            }
            this.LOG._info && this.LOG.info(
            `[WO] Pre-pass U: filled personnelNoSAP on ${toFill.length} duplicate row(s) (SSN).`
            );
        }

        // Optional: EmpCustInfo supplement for any remaining U blanks (SSN only)
        const stillBlankSSNs = (siblingRows || [])
            .filter(r => r.processLevel_code === 'U' && !trim(r.personnelNoSAP))
            .map(r => trim(r.ssn))
            .filter(Boolean);
        const remainingKeys = uniq(stillBlankSSNs.filter(k => !mSsnToEmp.has(k)));

        if (remainingKeys.length) {
            const empRows = await this.empCustInfoAPI.executeQuery(
            SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
                .columns(['SSN','WORKER_ID'])
                .where({ SSN: { in: remainingKeys } })
            );
            const mECI = new Map();
            (empRows || []).forEach(r => {
            const s = trim(r.SSN);
            const w = trim(r.WORKER_ID);
            if (s && w && !mECI.has(s)) mECI.set(s, w);
            });

            const toFillECI = (siblingRows || [])
            .filter(r => r.processLevel_code === 'U' && !trim(r.personnelNoSAP))
            .map(r => {
                const emp = mECI.get(trim(r.ssn));
                return emp ? { id: r.ID, emp } : null;
            })
            .filter(Boolean);

            if (toFillECI.length) {
            await Promise.allSettled(
                toFillECI.map(x =>
                UPDATE(WorkOrders).set({ personnelNoSAP: x.emp }).where({ ID: x.id })
                )
            );
            const filled2 = new Map(toFillECI.map(x => [String(x.id), x.emp]));
            for (const r of this.records) {
                const emp = filled2.get(String(r.ID));
                if (emp) r.personnelNoSAP = emp;
            }
            this.LOG._info && this.LOG.info(
                `[WO] Pre-pass U (EmpCustInfo): filled personnelNoSAP on ${toFillECI.length} duplicate row(s).`
            );
            }
        }
        }
    } catch (e) {
        this.LOG._error && this.LOG.error(`[WO] Pre-pass U failed: ${e.message}`);
    }
    // ---------------- END PRE-PASS ------------------------

    // ---------------- PRE-HEAL (SAFE) ----------------
    // Do NOT flip "true holds": only set valid=true if an employee number already exists.
    // try {
    //     const healed = await UPDATE(WorkOrders)
    //     .set({ valid: true })
    //     .where({
    //         processLevel_code: '2',
    //         valid: false,
    //         personnelNoSAP: { '!=': null }
    //     });

    //     const healedCount = typeof healed === 'number'
    //     ? healed
    //     : (healed?.rowCount ?? healed?.rows ?? healed?.affectedRows ?? 0);

    //     this.LOG._info && this.LOG.info(
    //     `[WO] Pre-heal (safe): set valid=true for ${healedCount} PL=2 row(s) that already had an employee number`
    //     );
    // } catch (e) {
    //     this.LOG._error && this.LOG.error(`[WO] Pre-heal failed: ${e.message}`);
    // }

    // ---------------- PRE-HEAL ----------------
    // Flip any row stuck at valid=false with NO personnel number to valid=true.
    try {
    const healed = await UPDATE(WorkOrders)
        .set({ valid: true })
        .where({
            processLevel_code: '2',
        valid: false,
        personnelNoSAP: null
        });

    const healedCount = typeof healed === 'number'
        ? healed
        : (healed?.rowCount ?? healed?.rows ?? healed?.affectedRows ?? 0);

    this.LOG._info && this.LOG.info(
        `[WO] Pre-heal: set valid=true for ${healedCount} row(s) with no personnel number`
    );
    } catch (e) {
    this.LOG._error && this.LOG.error(`[WO] Pre-heal failed: ${e.message}`);
    }


    let aRecordsForProcessing = [],
        aSkippedRecords = [],
        aErrorLogs = [],
        aPassedRecordIDs = [],
        aFailedRecordIDs = [];

    // pick records for this step
    for (const record of this.records) {
        if (this.shouldRecordProcess(record, sProcessCode)) {
        aRecordsForProcessing.push({ ...record });
        } else {
        aSkippedRecords.push({ ...record });
        }
    }

    this.updateProcessingState(sProcessCode);
    if (!aRecordsForProcessing.length) {
        return { hasError: false, continue: true };
    }

    const trim = v => (v ?? '').toString().trim();
    const uniq = arr => [...new Set(arr)];
    const ssnsAll    = uniq(aRecordsForProcessing.map(r => trim(r.ssn)).filter(Boolean));
    const fileIdsAll = uniq(aRecordsForProcessing.map(r => r.file_ID).filter(Boolean));

    // --------------- A) EmpCustInfo-first ---------------
    try {
        if (ssnsAll.length) {
        const empRows = await this.empCustInfoAPI.executeQuery(
            SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
            .columns(['SSN', 'WORKER_ID'])
            .where({ SSN: { in: ssnsAll } })
        );

        const mSsnToWorker = new Map();
        (empRows || []).forEach(r => {
            const s = trim(r.SSN);
            const w = trim(r.WORKER_ID);
            if (s && w && !mSsnToWorker.has(s)) mSsnToWorker.set(s, w);
        });

        if (mSsnToWorker.size) {
            const upd = [];
            const resolvedIds = [];
            for (const rec of aRecordsForProcessing) {
            const w = mSsnToWorker.get(trim(rec.ssn));
            if (!w) continue;
            rec.personnelNoSAP = w;
            upd.push(
                UPDATE(WorkOrders)
                .set({ personnelNoSAP: w, valid: true })
                .where({ ID: rec.ID })
            );
            resolvedIds.push(rec.ID);
            }
            if (upd.length) await Promise.allSettled(upd);
            if (resolvedIds.length) {
            await this.markRecordsValid(sProcessCode, resolvedIds, true);
            aPassedRecordIDs.push(...resolvedIds);
            this.LOG._info && this.LOG.info(`[WO] EmpCustInfo-first resolved ${resolvedIds.length} row(s).`);
            }
        }
        }
    } catch (e) {
        this.LOG._error && this.LOG.error(`[WO] EmpCustInfo-first failed: ${e.message}`);
    }

    // --------------- B) Release holds (only among current step-2 rows) ---------------
    try {
        if (ssnsAll.length && fileIdsAll.length) {
        const siblingRows = await SELECT.from(WorkOrders)
            .columns(['file_ID', 'ssn', 'personnelNoSAP'])
            .where({ file_ID: { in: fileIdsAll }, ssn: { in: ssnsAll } });

        const mSsnToEmp = new Map();
        (siblingRows || []).forEach(r => {
            const s = trim(r.ssn);
            const e = trim(r.personnelNoSAP);
            if (s && e && !mSsnToEmp.has(s)) mSsnToEmp.set(s, e);
        });

        const toRelease = aRecordsForProcessing
            .filter(r => !trim(r.personnelNoSAP))
            .map(r => ({ rec: r, emp: mSsnToEmp.get(trim(r.ssn)) }))
            .filter(x => !!x.emp);

        if (toRelease.length) {
            await Promise.allSettled(
            toRelease.map(x =>
                UPDATE(WorkOrders)
                .set({ personnelNoSAP: x.emp, valid: true })
                .where({ ID: x.rec.ID })
            )
            );
            const releasedIds = [];
            toRelease.forEach(x => {
            x.rec.personnelNoSAP = x.emp;
            releasedIds.push(x.rec.ID);
            aErrorLogs.push({
                record_ID: x.rec.ID,
                message: `Released hold: copied employee ${x.emp} from sibling row.`,process_code: sProcessCode
            });
            });
            if (releasedIds.length) {
            await this.markRecordsValid(sProcessCode, releasedIds, true);
            aPassedRecordIDs.push(...releasedIds);
            this.LOG._info && this.LOG.info(`[WO] Released ${releasedIds.length} follower(s) after writeback (PL=2).`);
            }
        }
        }
    } catch (e) {
        this.LOG._error && this.LOG.error(`[WO] Release-holds failed: ${e.message}`);
    }

    // ---------- C) GROUP-STATE GUARD + First-time split ----------
    let mSsnDbState = new Map();
    try {
        if (ssnsAll.length && fileIdsAll.length) {
        const snap = await SELECT.from(WorkOrders)
            .columns(['ID', 'file_ID', 'ssn', 'personnelNoSAP', 'processLevel_code', 'valid'])
            .where({ file_ID: { in: fileIdsAll }, ssn: { in: ssnsAll } });

        (snap || []).forEach(r => {
            const s = trim(r.ssn);
            if (!s) return;
            if (!mSsnDbState.has(s)) {
            mSsnDbState.set(s, {
                hasEmp: false,
                hasLeaderHold: false,   // PL=2, valid=true, no emp
                hasFollowerHoldU: false // PL=U, valid=false, no emp
            });
            }
            const st = mSsnDbState.get(s);
            const hasEmpNo = !!trim(r.personnelNoSAP);
            if (hasEmpNo) st.hasEmp = true;
            if (r.processLevel_code === '2' && !hasEmpNo && r.valid === true)  st.hasLeaderHold   = true;
            if (r.processLevel_code === 'U' && !hasEmpNo && r.valid === false) st.hasFollowerHoldU = true;
        });
        }
    } catch (e) {
        this.LOG._error && this.LOG.error(`[WO] DB snapshot for guard failed: ${e.message}`);
    }

    const unresolved = aRecordsForProcessing.filter(r => !trim(r.personnelNoSAP));

    const bySsn = new Map();
    const noSsn = [];
    for (const r of unresolved) {
        const s = trim(r.ssn);
        if (!s) { noSsn.push(r); continue; }
        if (!bySsn.has(s)) bySsn.set(s, []);
        bySsn.get(s).push(r);
    }

    for (const [ssn, list] of bySsn.entries()) {
        const state = mSsnDbState.get(ssn) || { hasEmp: false, hasLeaderHold: false, hasFollowerHoldU: false };

        if (state.hasEmp || state.hasLeaderHold || state.hasFollowerHoldU) {
        this.LOG._info && this.LOG.info(`[WO] SSN=${ssn}: holds already established; leaving statuses unchanged.`);
        list.forEach(r => {
            aFailedRecordIDs.push(r.ID);
            aErrorLogs.push({ record_ID: r.ID, message: `Employee Not Created.`,process_code: sProcessCode });
        });
        continue;
        }

        // Fresh group (first run at this step)
        list.sort((a, b) => String(a.ID).localeCompare(String(b.ID)));
        const leader = list[0];
        const followers = list.slice(1);

        await UPDATE(WorkOrders).set({ processLevel_code: '2', valid: true }).where({ ID: leader.ID });
        aFailedRecordIDs.push(leader.ID);
        aErrorLogs.push({
        record_ID: leader.ID,
        message: `Employee Not Created for SSN ${ssn}.`,process_code: sProcessCode
        });

        if (followers.length) {
        await Promise.allSettled(
            followers.map(f =>
            UPDATE(WorkOrders)
                .set({ processLevel_code: 'U', valid: false }) // move duplicates to U
                .where({ ID: f.ID })
            )
        );
        followers.forEach(f => {
            aFailedRecordIDs.push(f.ID);
            aErrorLogs.push({
            record_ID: f.ID,
            message: `Duplicate SSN ${ssn}: moved to Step 'U' until leader gets employee number.`,process_code: sProcessCode
            });
        });
        }
    }

    // No SSN at all: keep at PL=2 valid=true (cannot dedupe; CPI will create)
    if (noSsn.length) {
        await Promise.allSettled(
        noSsn.map(r =>
            UPDATE(WorkOrders).set({ processLevel_code: '2', valid: true }).where({ ID: r.ID })
        )
        );
        noSsn.forEach(r => {
        aFailedRecordIDs.push(r.ID);
        aErrorLogs.push({ record_ID: r.ID, message: `Employee Not Created.`,process_code: sProcessCode });
        });
    }

    if (aErrorLogs.length) await ProcessLogger.addLogs(aErrorLogs);
    if (aPassedRecordIDs.length) await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);

    this.updateExclusionSet({
        passed: aPassedRecordIDs,
        failed: aFailedRecordIDs,
        skipped: aSkippedRecords,
        bBreakExecution,
    });

    // ---------------- FINAL-HEAL (SAFE for PL=2 only) ----------------
    // try {
    //     const healed = await UPDATE(WorkOrders)
    //     .set({ valid: true })
    //     .where({
    //         processLevel_code: '2',
    //         valid: false,
    //         personnelNoSAP: { '!=': null }
    //     });

    //     const healedCount = typeof healed === 'number'
    //     ? healed
    //     : (healed?.rowCount ?? healed?.rows ?? healed?.affectedRows ?? 0);

    //     this.LOG._info && this.LOG.info(
    //     `[WO] Final-heal (safe): set valid=true for ${healedCount} PL=2 row(s) that already had an employee number`
    //     );
    // } catch (e) {
    //     this.LOG._error && this.LOG.error(`[WO] Final-heal failed: ${e.message}`);
    // }

    // ---------------- FINAL-HEAL ----------------
    // Ensure any row still at valid=false with NO personnel number is flipped to valid=true.
    try {
    const healed = await UPDATE(WorkOrders)
        .set({ valid: true })
        .where({
            processLevel_code: '2',
        valid: false,
        personnelNoSAP: null
        });

    const healedCount = typeof healed === 'number'
        ? healed
        : (healed?.rowCount ?? healed?.rows ?? healed?.affectedRows ?? 0);

    this.LOG._info && this.LOG.info(
        `[WO] Final-heal: set valid=true for ${healedCount} row(s) with no personnel number`
    );
    } catch (e) {
    this.LOG._error && this.LOG.error(`[WO] Final-heal failed: ${e.message}`);
    }


    return {
        hasError: aFailedRecordIDs.length > 0,
        continue: aFailedRecordIDs.length === 0,
    };
    }

    async checkEmployeeCreationS4(sProcessCode, bBreakExecution) {
    this.LOG._info && this.LOG.info("Starting checkEmployeeCreationS4 (Step 'U')");

    let aRecordsForProcessing = [],
        aSkippedRecords = [],
        aErrorLogs = [],
        aFailedRecordIDs = [],
        aPassedRecordIDs = [];

    // Collect ONLY rows the UI intends to process in this click
    for (const record of this.records) {
        
        if (this.shouldRecordProcess(record, sProcessCode)) {
        aRecordsForProcessing.push({ ...record });
        } else {
        aSkippedRecords.push({ ...record });
        }
    }

    this.updateProcessingState(sProcessCode);
    if (!aRecordsForProcessing.length) {
        return { hasError: false, continue: true };
    }

    const trim = v => (v ?? '').toString().trim();
    const uniq = arr => [...new Set(arr)];

    // Scope + selection set
    const fileIdsAll   = uniq(aRecordsForProcessing.map(r => r.file_ID).filter(Boolean));
    const selectedIds  = new Set(aRecordsForProcessing.map(r => String(r.ID))); // <- key change

    // helper
    const applyToMem = (m) => {
    for (const r of this.records) {
      const emp = m.get(String(r.ID));
      if (emp) r.personnelNoSAP = emp;    }
    for (const r of aRecordsForProcessing) {
      const emp = m.get(String(r.ID));
     if (emp) r.personnelNoSAP = emp;
    }
  };

    // --------- PREFILL: copy employee numbers within the same file by SSN ----------
    try {
        if (fileIdsAll.length) {
        const siblingRows = await SELECT.from(WorkOrders)
            .columns(['ID','file_ID','processLevel_code','valid','ssn','personnelNoSAP'])
            .where({ file_ID: { in: fileIdsAll } });

        // SSN -> employee no. (from any row that already has one)
        const mSsnToEmp = new Map();
        (siblingRows || []).forEach(r => {
            const emp = trim(r.personnelNoSAP);
            if (!emp) return;
            const s = trim(r.ssn);
            if (s && !mSsnToEmp.has(s)) mSsnToEmp.set(s, emp);
        });

        // Build updates ONLY for selected U rows missing the number
        const toFill = (siblingRows || [])
            .filter(r =>
            r.processLevel_code === 'U' &&
            !trim(r.personnelNoSAP) &&
            selectedIds.has(String(r.ID))                       // <- only selected
            )
            .map(r => {
            const emp = mSsnToEmp.get(trim(r.ssn));
            return emp ? { id: r.ID, emp } : null;
            })
            .filter(Boolean);

        if (toFill.length) {
            await Promise.allSettled(
            toFill.map(x =>
                UPDATE(WorkOrders)
                .set({ personnelNoSAP: x.emp }) // ONLY the number; no status flips
                .where({ ID: x.id })
            )
            );

            // keep in-memory model synced for the rest of this run
            // const justFilled = new Map(toFill.map(x => [String(x.id), x.emp]));
            // for (const r of aRecordsForProcessing) {
            // const emp = justFilled.get(String(r.ID));
            // if (emp) r.personnelNoSAP = emp;
            // }

            const justFilled = new Map(toFill.map(x => [String(x.id), x.emp]));
            applyToMem(justFilled);

            toFill.forEach(x => {
            aErrorLogs.push({
                record_ID: x.id,
                message: `Employee number ${x.emp} copied from leader (S4 check; SSN match).`,process_code: sProcessCode
            });
            });

            aPassedRecordIDs.push(...toFill.map(x => x.id));
            this.LOG._info && this.LOG.info(
            `[U] Filled personnelNoSAP on ${toFill.length} selected duplicate row(s) (SSN only).`
            );
        } else {
            this.LOG._info && this.LOG.info(`[U] No selected duplicates needed filling (SSN only).`);
        }

        // ---- Optional: supplement from Emp-Cust-Info for selected rows still blank ----
        const stillBlankSelectedSSNs = (siblingRows || [])
            .filter(r =>
            r.processLevel_code === 'U' &&
            !trim(r.personnelNoSAP) &&
            selectedIds.has(String(r.ID))                       // <- only selected
            )
            .map(r => trim(r.ssn))
            .filter(Boolean);

        const remainingKeys = uniq(stillBlankSelectedSSNs.filter(k => !mSsnToEmp.has(k)));
        if (remainingKeys.length) {
            try {
            const empRows = await this.empCustInfoAPI.executeQuery(
                SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
                .columns(['SSN','WORKER_ID'])
                .where({ SSN: { in: remainingKeys } })
            );
            const mECI = new Map();
            (empRows || []).forEach(r => {
                const s = trim(r.SSN);
                const w = trim(r.WORKER_ID);
                if (s && w && !mECI.has(s)) mECI.set(s, w);
            });

            const toFillECI = (siblingRows || [])
                .filter(r =>
                r.processLevel_code === 'U' &&
                !trim(r.personnelNoSAP) &&
                selectedIds.has(String(r.ID))                   // <- only selected
                )
                .map(r => {
                const emp = mECI.get(trim(r.ssn));
                return emp ? { id: r.ID, emp } : null;
                })
                .filter(Boolean);

            if (toFillECI.length) {
                await Promise.allSettled(
                toFillECI.map(x =>
                    UPDATE(WorkOrders)
                    .set({ personnelNoSAP: x.emp })
                    .where({ ID: x.id })
                )
                );
                
                // const justFilled2 = new Map(toFillECI.map(x => [String(x.id), x.emp]));
                // for (const r of aRecordsForProcessing) {
                // const emp = justFilled2.get(String(r.ID));
                // if (emp) r.personnelNoSAP = emp;
                // }

                const justFilled2 = new Map(toFillECI.map(x => [String(x.id), x.emp]));
                applyToMem(justFilled2);

                toFillECI.forEach(x => {
                aErrorLogs.push({
                    record_ID: x.id,
                    message: `Employee number ${x.emp} copied from EmpCustInfo (S4 check; SSN).`,process_code: sProcessCode
                });
                });
                aPassedRecordIDs.push(...toFillECI.map(x => x.id));
                this.LOG._info && this.LOG.info(
                `[U] Filled personnelNoSAP on ${toFillECI.length} selected row(s) from EmpCustInfo (SSN).`
                );
            }
            } catch (e) {
            this.LOG._error && this.LOG.error(`[U] EmpCustInfo supplemental fill failed: ${e.message}`);
            }
        }
        }
    } catch (e) {
        this.LOG._error && this.LOG.error(`[U] Prefill from leaders failed: ${e.message}`);
    }

    // Only the selected U rows are evaluated for unresolved log entries
    const unresolved = aRecordsForProcessing.filter(r => !trim(r.personnelNoSAP));
    if (unresolved.length) {
        unresolved.forEach(r => {
        aFailedRecordIDs.push(r.ID);
        aErrorLogs.push({
            record_ID: r.ID,
            message: `Employee not yet created in S/4 (no personnel number found).`,process_code: sProcessCode
        });
        });
    }

    if (aErrorLogs.length) await ProcessLogger.addLogs(aErrorLogs);

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

    async _validateSalesContract(oRecord, aSalesContracts, mDistChannelMap) {
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
                    await UPDATE(WorkOrders)
                        .set({
                            legacyContractNo: oSalesContract.PurchaseOrderByCustomer
                        })
                        .where({
                            ID: oRecord.ID
                        });
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
            if (oSalesContract.SoldToParty !== oRecord.soldToParty) {
                hasError = true;
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_CONTRACT_STP', [oRecord.soldToParty]),
                });
            }
            mDistChannelMap.set(oRecord.ID, {
                distributionChannel: oSalesContract.DistributionChannel
            });
        }
        return {
            hasError,
            errors: aErrors,
            updatedContract
        };
    }

    _validateSupplier(oRecord, aSuppliers) {
        let hasError = false,
            aErrors = [];

        // Find supplier based record;
        const oSupplier = aSuppliers.find((sc) => oRecord.remitToVendor === sc.Supplier);
        if (!oSupplier) {
            hasError = true;
            aErrors.push({
                record_ID: oRecord.ID,
                message: cds.i18n.messages.at('ERR_INVALID_REMIT_VENDOR'),
            });
        }

        return {
            hasError,
            errors: aErrors,
        };
    }

    async processProject(sProcessCode, bBreakExecution) {
        this.LOG._info && this.LOG.info('Logging _processHrCostDistObj');

        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);

        const aRecordsForProcessing = [],
            aSkippedRecords = [],
            aErrorLogs = [],
            aPassedRecordIDs = [],
            aFailedRecordIDs = [];

        let aRecordIDs = [];

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({
                    ...record
                });
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({
                    ...record
                });
                continue;
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

        // New code for personal number issue
        // Refresh personnelNoSAP for records missing it before building payloads.
        const trim = v => (v ?? '').toString().trim();
        const idsNeedingEmp = aRecordsForProcessing
          .filter(r => !trim(r.personnelNoSAP))
          .map(r => r.ID);
        if (idsNeedingEmp.length) {
          const freshRows = await SELECT.from(WorkOrders)
            .columns(['ID','personnelNoSAP'])
            .where({ ID: { in: idsNeedingEmp } });
          const mFresh = new Map((freshRows || []).map(r => [String(r.ID), trim(r.personnelNoSAP)]));
          // update the local working set
         for (const r of aRecordsForProcessing) {
            const emp = mFresh.get(String(r.ID));
            if (emp) r.personnelNoSAP = emp;
          }
          // keep central memory in sync too
          for (const r of this.records) {
            const emp = mFresh.get(String(r.ID));
            if (emp) r.personnelNoSAP = emp;
          }
       }

        if (sProcessCode === '4') {
            let aPayloads = aRecordsForProcessing.map((record) => ({
                EnterpriseProjectType: record.distributionChannel === 'IC' ? 'Z4' : '40',
                CompanyCode: record.companyCode,
                ProfitCenter: record.salesOffice,
                ProjectDescription: `${record.soldToParty}-${record.personnelNoSAP}`,
                ResponsibleCostCenter: `${record.companyCode}${record.salesOffice}`,
                ProjectStartDate: moment(record.beginDate).format('YYYY-MM-DD'),
                // ProjectEndDate: moment(record.beginDate).add(10, 'years').format('YYYY-MM-DD'),
                ProjectEndDate: '2200-12-31',
                ProjectProfileCode: 'YP05',
                EntProjIsMultiSlsOrdItmsEnbld: true,
                ProjectCurrency: record.currency_code,
                // YY1_EmployeeName_PPH: `${record.lastName} ${record.firstName}`,
                YY1_Employee_PPH: record.personnelNoSAP,
            }));

            try {
                for (let i = 0; i < aPayloads.length; i++) {
                    // Check for Employee Number
                    if (!aRecordsForProcessing[i].personnelNoSAP) {
                        aErrorLogs.push({
                            record_ID: aRecordsForProcessing[i].ID,
                            message: cds.i18n.messages.at('ERR_EMP_NUMBER_MISSING'),process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                        continue; // Skip this record
                    }

                    let insertedProject = await this.enterpriseProjectAPI.executeQuery(
                        INSERT.into('A_EnterpriseProject').entries(aPayloads[i]),
                    );

                    if (insertedProject.Project) {
                        aRecordsForProcessing[i].projectNumberSAP = insertedProject.Project;
                        aRecordsForProcessing[i].projectUUID = insertedProject.ProjectUUID;

                        const item = this.records.find((record) => record.ID === aRecordsForProcessing[i].ID);
                        if (item) {
                            item.projectNumberSAP = insertedProject.Project;
                            item.projectUUID = insertedProject.ProjectUUID;
                        }
                        await UPDATE(WorkOrders)
                            .set({
                                projectNumberSAP: insertedProject.Project,
                                projectUUID: insertedProject.ProjectUUID,
                                valid: true,
                                processLevel_code: sProcessCode,
                            })
                            .where({
                                ID: aRecordsForProcessing[i].ID
                            });

                        aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
                    } else {
                        aErrorLogs.push({
                            record_ID: aRecordsForProcessing[i].ID,
                            message: `${insertedProject.message}`,process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                        LOG.error(
                            `Error processing record ID ${aRecordsForProcessing[i]}: ${insertedProject.message}`,
                        );
                    }
                }
            } catch (error) {
                LOG.error(`Critical error in _processProject: ${error.message}`, {
                    error
                });
            }
        } else if (sProcessCode === 'C') {
            for (let i = 0; i < aRecordsForProcessing.length; i++) {
                let updatedProject = await this.enterpriseProjectAPI.updateProject(
                    aRecordsForProcessing[i].projectUUID,
                    aRecordsForProcessing[i].salesDocumentNoSAP,
                );
                let releaseProject = await this.enterpriseProjectAPI.releaseProject(
                    aRecordsForProcessing[i].projectUUID,
                    "10"
                );
                if (updatedProject.message) {
                    aErrorLogs.push({
                        record_ID: aRecordsForProcessing[i].ID,
                        message: `${updatedProject.message}`,process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                    LOG.error(
                        `Error processing record ID ${aRecordsForProcessing[i].ID}: ${updatedProject.message}`,
                    );
                } else if (releaseProject.message) {
                    aErrorLogs.push({
                        record_ID: aRecordsForProcessing[i].ID,
                        message: `${releaseProject.message}`,process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                    LOG.error(
                        `Error processing record ID ${aRecordsForProcessing[i].ID}: ${releaseProject.message}`,
                    );
                } else {
                    await UPDATE(WorkOrders)
                        .set({
                            valid: true,
                            processLevel_code: sProcessCode,
                        })
                        .where({
                            ID: aRecordsForProcessing[i].ID
                        });

                    aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
                }
            }
        }

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(WorkOrders)
                .set({
                    valid: false,
                    processLevel_code: sProcessCode
                })
                .where({
                    ID: {
                        in: aFailedRecordIDs
                    }
                });
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

    async processSalesOrder(sProcessCode, bBreakExecution) {

        const aRecordsForProcessing = [],
            aErrorLogs = [],
            aFailedRecordIDs = [],
            aPassedRecordIDs = [],
            aSkippedRecords = [];

        let sWhereForBusinessPartner = '',
            sWhereForBPCustomer = '',
            aSalesContractIDs = [],
            aVendorRemitWhere = [],
            aSoldToPartyWhere = [],
            aCustomerFieldNamesWhere = [],
            aCustomerEDIPartnerWhere = [],
            aPersonalIDs = [],
            aWorkforcRes = [],
            aRegionWhere = [],
            aMaterialNoWhere = [],
            aSalesOrgWhere = [],
            asalesDocumentTypeWhere = [],
            aAddresses = [],
            aRecordIDs = [],
            aTaxCodeByProvince = [],
            sTaxCodeByProvinceWhere = '',
            aTaxCodeByCity = [],
            sTaxCodeByCityWhere = '',
            aTaxCodeByCounty = [],
            aTaxCodeByCountyWhere = [],
            sTaxCodeByCountyWhere = '',
            mSalesContract = new Map(),
            mProduct = new Map(), // Map for Product Table
            mPaymentTerms = new Map(), // Map for PaymentTerms Table
            mCustomerPaymentTerms = new Map(), // Map for CustomerPaymentTerm from BP
            mVendorRemits = new Map(), // Map for Vendor_VendorRemit Table
            mSupplierAccs = new Map(), // Map for Supplier from BP
            mCustomerEDIPartners = new Map(), // Map for CustomerEDIPartnerConfig Table
            mEdiShiftEmpSubGrps = new Map(), // Map for EdiShiftDiffForEmpSubGrp Table
            mEdiShiftCAs = new Map(), // Map for EdiShiftDiffForCanada Table
            mCreatePO = new Map(), // Map for PORequiredSAP Indicator
            mBillingTypes = new Map(), // Map for Billing Types
            mProcessingRecordsToCentralMapping = new Map(),
            mBusinessPartners = new Map(), // Map for PartnerFunction & BPCustomerNumber from BP
            mBusinessPartnerWhere = new Map(),
            mCustomerFieldNameValue = new Map(); // Map for CustomFieldsToVC Table

        for (const [iRecordIndex, record] of this.records.entries()) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({
                    ...record
                });
                mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({
                    ...record
                });
                continue;
            }

            if (record.contractNo) {
                aSalesContractIDs.push(record.contractNo);
                mBusinessPartnerWhere.set(record.contractNo, {
                    Customer: record.soldToParty,
                    SalesOrganization: null, // To be used after salescontract are fetchedd
                    PartnerFunction: 'ZE',
                    DistributionChannel: '01',
                    OrganizationDivision: null, // To be changed after salescontracts are fetched
                });
            }

            if (
                record.street &&
                record.region &&
                record.city &&
                record.workLocation &&
                record.doorNo &&
                record.postalCode
            ) {
                aAddresses.push({
                    record_ID: record.ID,
                    street: `${record.doorNo} ${record.street}`,
                    city: record.city,
                    state: record.region,
                    zipcode: record.postalCode,
                });
            }

            // Prepare query for aTaxCodeBy<...> selects
            if (record.country_code === 'CA') {
                sTaxCodeByProvinceWhere += `or (country_code = '${record.country_code}' and region = '${record.region}')`;
            } else if (record.country_code === 'US') {
                sTaxCodeByProvinceWhere += `or (country_code = '${record.country_code}' and region = '${record.region}')`;
                // sTaxCodeByCityWhere += `or (country_code = '${record.country_code}' and city = '${record.city}' and region = '${record.region}')`;
                sTaxCodeByCityWhere += `or (upper(country_code) = upper('${record.country_code}') and upper(city) = upper('${record.city}') and upper(region) = upper('${record.region}'))`;
                aTaxCodeByCountyWhere.push({
                    record_ID: record.ID,
                    country_code: record.country_code,
                    region: record.region,
                });
            }

            if (record.remitToVendor) {
                aVendorRemitWhere.push(record.remitToVendor);
                mCreatePO.set(record.ID, {
                    PORequiredSAP: "X"
                })
            }

            if (record.soldToParty) {
                aSoldToPartyWhere.push(record.soldToParty);
            }

            if (record.region) {
                aRegionWhere.push(record.region);
            }

            if (record.materialNo) {
                aMaterialNoWhere.push(record.materialNo);
            }

            if (record.personnelNoSAP) {
                aPersonalIDs.push(record.personnelNoSAP);
            }

            if (record.salesDocumentType) {
                asalesDocumentTypeWhere.push('ZW' + record.salesDocumentType);
            }

            ({
                mCustomerFieldNameValue,
                aCustomerFieldNamesWhere
            } = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));

        }

        sTaxCodeByProvinceWhere.length && (sTaxCodeByProvinceWhere = sTaxCodeByProvinceWhere.slice(3).trim());
        sTaxCodeByCityWhere.length && (sTaxCodeByCityWhere = sTaxCodeByCityWhere.slice(3).trim());

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
            const [{
                    reason: anySalesContractErr,
                    value: aSalesContracts
                },
                {
                    reason: anyVendorRemitErr,
                    value: aVendorRemits
                },
                {
                    reason: anyPaymentTermsErr,
                    value: aPaymentTerms
                },
                {
                    reason: anyAddressErr,
                    value: aAddressesWithCounty
                },
                {
                    reason: anyTaxCodeByProvinceErr,
                    value: aTaxCodeByProvinceResults
                },
                {
                    reason: anyTaxCodeByCityErr,
                    value: aTaxCodeByCityResults
                },
                {
                    reason: anyCustomFieldsTOVCErr,
                    value: aCustomFieldsTOVC
                },
                {
                    reason: anyWorkforceErr,
                    value: aWorkforces
                },
                {
                    reason: anyBillingTypeErr,
                    value: aBillingTypes
                }
            ] = await Promise.allSettled([
                this.salesContractAPI.executeQuery(this._getSalesContractQuery(aSalesContractIDs)),
                SELECT.from('com.aleron.monitor.Vendor_VendorRemit')
                .columns(['vendor', 'vendorZR'])
                .where({
                    vendor: {
                        in: [...new Set(aVendorRemitWhere)]
                    }
                }),
                SELECT.from('com.aleron.monitor.PaymentTerms')
                .columns(['customerNo', 'supplierNo', 'customerTerm', 'vendorTerm', 'poBox'])
                .where({
                    customerNo: {
                        in: [...new Set(aSoldToPartyWhere)]
                    },
                    supplierNo: {
                        in: [...new Set(aVendorRemitWhere)]
                    }
                }),
                this.smartyAddressAPI.getCountyFor(aAddresses),
                SELECT.from('com.aleron.monitor.TaxCodeByProvince')
                .columns(['country_code', 'region', 'taxJurisdiction'])
                .where(`${sTaxCodeByProvinceWhere}`),
                SELECT.from('com.aleron.monitor.TaxCodeByCity')
                .columns(['country_code', 'region', 'city', 'taxJurisdiction'])
                .where(`${sTaxCodeByCityWhere}`),
                SELECT.from('com.aleron.monitor.CustomFieldsToVC')
                .columns(['customValue', 'fieldName'])
                .where({
                    customValue: {
                        in: aCustomerFieldNamesWhere
                    }
                }),
                this.workforceAPI.executeQuery(
                    SELECT.from('YY1_workforce_cds')
                    .columns(['WorkforcePersonExternalID', 'PersonWorkAgreement'])
                    .where({
                        WorkforcePersonExternalID: {
                            in: [...new Set(aPersonalIDs)]
                        }
                    })
                ),
                this.billingTypeAPI.executeQuery(
                    SELECT.from('YY1_BILLINGTYPE')
                    .columns(['Billing_type', 'SO_order_Type'])
                    .where({
                        SO_order_Type: {
                            in: [...new Set(asalesDocumentTypeWhere)]
                        }
                    })
                )
            ]);

            if (!anySalesContractErr?.message && aSalesContracts.length) {
                aSalesContracts.forEach((oSalesContract) => {
                    mSalesContract.set(oSalesContract.SalesContract, oSalesContract);
                    const oBusinessPartnerWhere = mBusinessPartnerWhere.get(oSalesContract.SalesContract);
                    if (oBusinessPartnerWhere) {
                        sWhereForBusinessPartner += `or (Customer = '${oBusinessPartnerWhere.Customer}' and SalesOrganization = '${oSalesContract.SalesOrganization}' and (PartnerFunction = 'WE' or PartnerFunction = 'Z4' or PartnerFunction = 'Z5' or PartnerFunction = 'ZE') and DistributionChannel = '01' and Division = '${oSalesContract.OrganizationDivision}')`;
                        sWhereForBPCustomer += `or (Customer = '${oBusinessPartnerWhere.Customer}' and SalesOrganization = '${oSalesContract.SalesOrganization}')`;
                    }
                    aSalesOrgWhere.push(oSalesContract.SalesOrganization);
                });

                sWhereForBusinessPartner.length && (sWhereForBusinessPartner = sWhereForBusinessPartner.slice(3).trim()); // Remove the first `or `
                sWhereForBPCustomer.length && (sWhereForBPCustomer = sWhereForBPCustomer.slice(3).trim()); // Remove the first `or `
            }

            if (!anyVendorRemitErr?.message && aVendorRemits.length) {
                aVendorRemits.forEach((oVendorRemits) =>
                    mVendorRemits.set(oVendorRemits.vendor, oVendorRemits)
                );
            }

            if (!anyPaymentTermsErr?.message && aPaymentTerms.length) {
                aPaymentTerms.forEach((oPaymentTerm) =>
                    mPaymentTerms.set(oPaymentTerm.customerNo, oPaymentTerm),
                );
            }

            if (!anyAddressErr?.message && aAddressesWithCounty.length) {
                aAddresses = aAddressesWithCounty;
                aAddresses.forEach((oAddress) => {
                    const oWhere = aTaxCodeByCountyWhere.find(
                        (oWhere) => oWhere.record_ID === oAddress.record_ID,
                    );
                    if (oWhere && oAddress.county) {
                        sTaxCodeByCountyWhere += `or (country_code = '${oWhere.country_code.toUpperCase()}' and county = '${oAddress.county.toUpperCase()}' and region = '${oWhere.region.toUpperCase()}')`;
                    }
                });
                sTaxCodeByCountyWhere.length &&
                    (sTaxCodeByCountyWhere = sTaxCodeByCountyWhere.slice(3).trim());
            }
            if (!anyTaxCodeByProvinceErr?.message && aTaxCodeByProvinceResults.length) {
                aTaxCodeByProvince = aTaxCodeByProvinceResults;
            }
            if (!anyTaxCodeByCityErr?.message && aTaxCodeByCityResults.length) {
                aTaxCodeByCity = aTaxCodeByCityResults;
            }
            if (!anyCustomFieldsTOVCErr?.message && aCustomFieldsTOVC.length) {
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
            if (!anyWorkforceErr?.message && aWorkforces.length) {
                aWorkforcRes = [...aWorkforces];
            }
            if (!anyBillingTypeErr?.message && aBillingTypes.length) {
                aBillingTypes.forEach((oBillingTypes) =>
                    mBillingTypes.set(oBillingTypes.SO_order_Type, oBillingTypes),
                );
            }

        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }

        try {
            const [{
                    reason: anyBusinessPartnerErr,
                    value: aBusinessPartners
                },
                {
                    reason: anyBPCustomerErr,
                    value: aBPCustomers
                },
                {
                    reason: anySupplierAccErr,
                    value: aSupplierAccs
                },
                {
                    reason: anyTaxCodeByCountyErr,
                    value: aTaxCodeByCountyResults
                },
                {
                    reason: anyProductErr,
                    value: aProducts
                },
            ] = await Promise.allSettled([
                this.businesPartnerAPI.executeQuery(
                    SELECT.from('A_CustSalesPartnerFunc')
                    .columns(['Customer', 'PartnerFunction', 'BPCustomerNumber', 'Supplier', 'PersonnelNumber', 'ContactPerson'])
                    .where(`${sWhereForBusinessPartner}`),
                ),
                this.businesPartnerAPI.executeQuery(
                    SELECT.from('A_CustomerSalesArea')
                    .columns(['Customer', 'CustomerPaymentTerms'])
                    .where(`${sWhereForBPCustomer}`)
                ),
                this.businesPartnerAPI.executeQuery(
                    SELECT.from('A_Supplier')
                    .columns(['SupplierAccountGroup', 'Supplier', 'Industry'])
                    .where({
                        Supplier: {
                            in: [...new Set(aVendorRemitWhere)]
                        }
                    })
                ),
                SELECT.from('com.aleron.monitor.TaxCodeByCounty')
                .columns(['country_code', 'region', 'county', 'taxJurisdiction'])
                .where(`${sTaxCodeByCountyWhere}`),
                this.productAPI.executeQuery(
                    SELECT.from('A_ProductSalesDelivery')
                    .columns(['Product', 'ProductSalesOrg', 'ProductDistributionChnl', 'FirstSalesSpecProductGroup'])
                    .where({
                        Product: {
                            in: aMaterialNoWhere
                        },
                        ProductSalesOrg: {
                            in: aSalesOrgWhere
                        },
                        ProductDistributionChnl: '01'
                    }),
                )
            ]);
            if (!anyBusinessPartnerErr?.message && aBusinessPartners.length) {
                aBusinessPartners.forEach((oBusinessPartner) => {
                    mBusinessPartners.set(
                        `${oBusinessPartner.Customer}_${oBusinessPartner.PartnerFunction}`,
                        oBusinessPartner,
                    );
                    if (oBusinessPartner.PartnerFunction === 'ZE') {
                        aCustomerEDIPartnerWhere.push(oBusinessPartner.BPCustomerNumber);
                    }
                });
            }
            if (!anyBPCustomerErr?.message && aBPCustomers.length) {
                aBPCustomers.forEach((oBPCustomer) => {
                    if (!mPaymentTerms.has(oBPCustomer.Customer)) {
                        mCustomerPaymentTerms.set(oBPCustomer.Customer, oBPCustomer)
                    }
                })
            }
            if (!anySupplierAccErr?.message && aSupplierAccs.length) {
                aSupplierAccs.forEach((oSupplierAcc) => {
                    mSupplierAccs.set(oSupplierAcc.Supplier, oSupplierAcc);
                })
            }
            if (!anyTaxCodeByCountyErr?.message && aTaxCodeByCountyResults.length) {
                aTaxCodeByCounty = aTaxCodeByCountyResults;
            }
            if (!anyProductErr?.message && aProducts.length) {
                aProducts.forEach((oProduct) => {
                    mProduct.set(oProduct.Product, oProduct);
                })
            }
        } catch (err) {
            this.LOG._error & this.LOG.error(err.message);
        }

        try {
            const [{
                    reason: anyCustEDIPartnerErr,
                    value: aCustEDIPartners
                },
                {
                    reason: anyEdiShiftEmpSubGrpErr,
                    value: aEdiShiftEmpSubGrps
                },
                {
                    reason: anyEdiShiftCAErr,
                    value: aEdiShiftCAs
                },
            ] = await Promise.allSettled([
                SELECT.from('com.aleron.monitor.CustomerEDIPartnerConfig')
                .columns(['customerNo', 'materialGroup2', 'shiftDiffCustom', 'shiftDiffUS', 'shiftDiffCA'])
                .where({
                    customerNo: {
                        in: aCustomerEDIPartnerWhere
                    }
                }),
                SELECT.from('com.aleron.monitor.EdiShiftDiffForEmpSubGrp')
                .columns(['customerNo', 'materialGroup2', 'employeeSubGroup'])
                .where({
                    customerNo: {
                        in: aCustomerEDIPartnerWhere
                    },
                    employeeSubGroup: '11'
                }),
                SELECT.from('com.aleron.monitor.ediShiftDiffForCanada')
                .columns(['customerNo', 'region', 'materialNo', 'shiftDifferential'])
                .where({
                    customerNo: {
                        in: aCustomerEDIPartnerWhere
                    },
                    region: {
                        in: aRegionWhere
                    },
                    materialNo: {
                        in: aMaterialNoWhere
                    },
                }),
            ]);

            if (!anyCustEDIPartnerErr?.message && aCustEDIPartners.length) {
                aCustEDIPartners.forEach((oCustEDIPartner) => {
                    mCustomerEDIPartners.set(oCustEDIPartner.customerNo, oCustEDIPartner);
                })
            }
            if (!anyEdiShiftEmpSubGrpErr?.message && aEdiShiftEmpSubGrps.length) {
                aEdiShiftEmpSubGrps.forEach((oEdiShiftEmpSubGrp) => {
                    mEdiShiftEmpSubGrps.set(oEdiShiftEmpSubGrp.customerNo, oEdiShiftEmpSubGrp);
                })
            }
            if (!anyEdiShiftCAErr?.message && aEdiShiftCAs.length) {
                aEdiShiftCAs.forEach((oEdiShiftCA) => {
                    mEdiShiftCAs.set(oEdiShiftCA.customerNo, oEdiShiftCA);
                })
            }
        } catch (err) {
            this.LOG._error & this.LOG.error(err.message);
        }

        const aPayloads = [];
        const mPayloadMap = new Map();

        aRecordsForProcessing.forEach((oRecord) => {
            const aErrors = [];
            if (!oRecord.projectNumberSAP) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'),process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            if (oRecord.salesDocumentNoSAP) {
                // SalesOrder already created, only VC Data needs to be checked further
                aPassedRecordIDs.push(oRecord.ID);
                mPayloadMap.set(oRecord.ID, {
                    payloadIndex: null,
                    salesOrder: oRecord.salesDocumentNoSAP,
                    salesOrderItem: oRecord.salesItemNoSAP,
                    scheduleLine: oRecord.scheduleLineSAP,
                });
                return; // Skip this record
            }

            // if (oRecord.country_code !== 'CA') {
            //   const oAddr = aAddresses.find((oAddress) => oAddress.record_ID === oRecord.ID);
            //   if (!oAddr || !oAddr.county) {
            //     aErrors.push({
            //       record_ID: oRecord.ID,
            //       message: cds.i18n.messages.at('ERR_COUNTY_NOT_FOUND'),
            //     });
            //     aFailedRecordIDs.push(oRecord.ID);
            //     aErrorLogs.push(...aErrors);
            //     return; // Skip this record
            //   }
            // }

            const sTaxCode = this._getTaxCodeForRecord({
                record: oRecord,
                aTaxCodeByProvince,
                aTaxCodeByCity,
                aTaxCodeByCounty,
                aAddresses
            });
            if (!sTaxCode) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_TAX_CODE_NOT_FOUND', [
                        oRecord.country_code,
                        oRecord.region,
                    ]),process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            if (!['SC', 'MS', 'IC', 'CP'].includes(oRecord.salesDocumentType)) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_WO_TYPE'),process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            if (oRecord.salesDocumentType === 'CP') {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_CONTRACT_PAYROLL'),process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            const oSalesContract = mSalesContract.get(oRecord.contractNo);
            if (!oSalesContract) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'),process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            const oBillingType = mBillingTypes.get('ZW' + oRecord.salesDocumentType);
            if (!oBillingType) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_BILLING_TYPE', ['ZW' + oRecord.salesDocumentType]),process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            const oSalesContractItem = oSalesContract._Item.find(
                (item) => item.Product === oRecord.materialNo && item.SalesContract === oRecord.contractNo,
            );

            if (!oSalesContractItem) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_MATERIAL_NOT_FOUND', [
                        oRecord.materialNo,
                        oRecord.contractNo
                    ]),process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            const oVendorRemits = mVendorRemits.get(oRecord.remitToVendor);
            const oSupplierAccs = mSupplierAccs.get(oRecord.remitToVendor);
            const oCreatePO = mCreatePO.get(oRecord.ID);
            const oProduct = mProduct.get(oRecord.materialNo);
            const PersonWorkAgreement = aWorkforcRes.find(item => item.WorkforcePersonExternalID === oRecord.personnelNoSAP)?.PersonWorkAgreement;

            // Prepare payload for SalesOrder creation
            const oPayload = this._prepareDataForSalesOrderCreate({
                record: oRecord,
                salesContract: oSalesContract,
                paymentTermsMap: mPaymentTerms,
                customerPaymentTermsMap: mCustomerPaymentTerms,
                vendorRemit: oVendorRemits,
                supplierAcc: oSupplierAccs,
                businessPartnerMap: mBusinessPartners,
                taxCode: sTaxCode,
                product: oProduct,
                customerEDIPartner: mCustomerEDIPartners,
                editShiftEmpSubGrp: mEdiShiftEmpSubGrps,
                editShiftCA: mEdiShiftCAs,
                personalNO: PersonWorkAgreement,
                createPO: oCreatePO,
                billingType: oBillingType,
                salesContractItem: oSalesContractItem
            });

            // Add payload to aPayloads and map record.ID to its payloadIndex
            const iPayloadIndex = aPayloads.push(oPayload) - 1;
            mPayloadMap.set(oRecord.ID, {
                payloadIndex: iPayloadIndex,
                salesOrder: null, // To be updated in Step 4
                scheduleLinePayloadIndex: null, // To be updated in Step 5
                // partnerFunctionSAP: oSupplierAccs?.SupplierAccountGroup === 'ZRMT' ? 'ZR' : 'ZV'
                partnerFunctionSAP: 'ZV'
            });
        });

        // TODO: Check if aPayloads[].errors has any value; process accordingly
        aPayloads.forEach((oPayload) => delete oPayload.errors);

        // Step 4: Create SalesOrders in S/4HANA via OData
        const aSalesOrderResults = await this.salesOrderAPI.createSalesOrders(aPayloads);

        // Process the results
        aSalesOrderResults.forEach((oResult, iPayloadIndex) => {
            // Find the record ID corresponding to the payload index
            const sRecordID = [...mPayloadMap.entries()].find(
                ([, oMapEntry]) => oMapEntry.payloadIndex === iPayloadIndex,
            )?.[0];

            if (!oResult.hasError) {
                const oCreatedSalesOrder = oResult.value;
                aPassedRecordIDs.push(sRecordID);

                // Update the map entry with the created SalesOrder ID
                const oMapEntry = mPayloadMap.get(sRecordID);
                oMapEntry.salesOrder = oCreatedSalesOrder.SalesOrder;
                oMapEntry.salesOrderItem = '10'; // oCreatedSalesOrder.to_Item[0].SalesOrderItem;
                oMapEntry.scheduleLine = '1'; //oCreatedSalesOrder.to_Item[0].to_ScheduleLine[0].ScheduleLine;
                mPayloadMap.set(sRecordID, oMapEntry);
            } else {
                aFailedRecordIDs.push(sRecordID);
                if (Array.isArray(oResult.reason)) {
                    oResult.reason.forEach((oError) => {
                        aErrorLogs.push({
                            record_ID: sRecordID,
                            ...oError,process_code: sProcessCode
                        });
                    });
                } else {
                    aErrorLogs.push({
                        record_ID: sRecordID,process_code: sProcessCode,
                        message: cds.i18n.messages.at('ERR_SALES_ORDER_CREATION_FAILED', [oResult.reason]),
                    });
                }

                // Remove the failed record from the map
                mPayloadMap.delete(sRecordID);
            }
        });

        // TODO: VC Date update process
        await this._prepareVCData({
            records: this.records,
            mCustomerFieldNameValue: mCustomerFieldNameValue,
            mPayloadMap: mPayloadMap,
            aPassedRecordIDs: aPassedRecordIDs,
            aFailedRecordIDs: aFailedRecordIDs,
            aErrorLogs: aErrorLogs,
        });

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(WorkOrders)
                .set({
                    valid: false,
                    processLevel_code: sProcessCode
                })
                .where({
                    ID: {
                        in: aFailedRecordIDs
                    }
                });
        }

        // Update the `salesDocumentNoSAP` field in `this.records` and the database
        this.records.forEach((oRecord) => {
            const oMapEntry = mPayloadMap.get(oRecord.ID);
            const oCreatePO = mCreatePO.get(oRecord.ID);
            if (oMapEntry && oMapEntry.salesOrder) {
                // Update fields in memory
                oRecord.salesDocumentNoSAP = oMapEntry.salesOrder;
                oRecord.salesItemNoSAP = oMapEntry.salesOrderItem;
                oRecord.PORequiredSAP = oCreatePO.PORequiredSAP;
                oRecord.vcData1UUID = oMapEntry.vcData1UUID ?? '';
                oRecord.vcData2UUID = oMapEntry.vcData2UUID ?? '';
                oRecord.partnerFunctionSAP = oMapEntry.partnerFunctionSAP;
            }
        });

        // Create records to update using flatMap
        const aRecordsToUpdate = this.records.flatMap((oRecord) => {
            const oMapEntry = mPayloadMap.get(oRecord.ID);
            const oCreatePO = mCreatePO.get(oRecord.ID);
            return oMapEntry && oMapEntry.salesOrder ?
                [{
                    ID: oRecord.ID,
                    salesDocumentNoSAP: oMapEntry.salesOrder,
                    salesItemNoSAP: oMapEntry.salesOrderItem,
                    PORequiredSAP: oCreatePO.PORequiredSAP,
                    vcData1UUID: oMapEntry.vcData1UUID,
                    vcData2UUID: oMapEntry.vcData2UUID,
                    partnerFunctionSAP: oMapEntry.partnerFunctionSAP,
                }, ] :
                [];
        });

        if (aRecordsToUpdate.length) {
            await Promise.all(
                aRecordsToUpdate.map((oRecord) => {
                    const iRecordIndex = mProcessingRecordsToCentralMapping.get(oRecord.ID);
                    this.records[iRecordIndex].salesDocumentNoSAP = oRecord.salesDocumentNoSAP;
                    this.records[iRecordIndex].salesItemNoSAP = oRecord.salesItemNoSAP;
                    this.records[iRecordIndex].PORequiredSAP = oRecord.PORequiredSAP;
                    this.records[iRecordIndex].vcData1UUID = oRecord.vcData1UUID;
                    this.records[iRecordIndex].vcData2UUID = oRecord.vcData2UUID;
                    this.records[iRecordIndex].partnerFunctionSAP = oRecord.partnerFunctionSAP;
                    return UPDATE(WorkOrders)
                        .set({
                            salesDocumentNoSAP: oRecord.salesDocumentNoSAP,
                            salesItemNoSAP: oRecord.salesItemNoSAP,
                            PORequiredSAP: oRecord.PORequiredSAP,
                            vcData1UUID: oRecord.vcData1UUID,
                            vcData2UUID: oRecord.vcData2UUID,
                            partnerFunctionSAP: oRecord.partnerFunctionSAP
                        })
                        .where({
                            ID: oRecord.ID
                        });
                }),
            );
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await Promise.allSettled([
                this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
                ProcessLogger.addLogs(aErrorLogs),
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

    _getSalesContractQuery(aSalesContractWhere) {
        // prettier-ignore
        return SELECT.from('SalesContract', sc => {
                sc.SalesContract,
                    sc.SalesOrganization,
                    sc.DistributionChannel,
                    sc.OrganizationDivision,
                    sc._Item((scItem) => {
                        scItem.SalesContract,
                            scItem.SalesContractItem,
                            scItem.Product
                    })
            })
            .where({
                SalesContract: {
                    in: [...new Set(aSalesContractWhere)]
                }
            })
    }

    /**
   * Prepare data for SalesOrder creation
   * @param {object} mParams
   * @param {object} mParams.record - EmployeeHires record
   * @param {object} mParams.salesContract - SalesContract record
   * @param {object} mParams.businessPartnerMap - BusinessPartner record
   * @param {object} mParams.vendorRemit - vendor vendorZR based on remit to vendor
   * @param {object} mParams.supplierAcc - supplier supplierAccountGroup based on remit to vendor
   * @param {object} mParams.customerPaymentTermsMap - Map of Customer Payment terms
   * @param {object} mParams.paymentTermsMap - Map of payment terms
   * @param {object} mParams.taxCode - Tax code
   * @param {object} mParams.createPO - Create PO Indicator
   * @returns {object} SalesOrder payload with 'errors' property. `errors` property MUST BE removed before sending to S/4HANA
   */
    _prepareDataForSalesOrderCreate({
    record,
    salesContract,
    paymentTermsMap,
    customerPaymentTermsMap,
    vendorRemit,
    supplierAcc,
    businessPartnerMap,
    taxCode,
    product,
    customerEDIPartner,
    editShiftEmpSubGrp,
    editShiftCA,
    personalNO,
    createPO,
    billingType,
    salesContractItem
  }) {
    const oReturnData = {
      SalesOrderType: 'OR',
      SDDocumentReason: '',
      PricingDate: `/Date(${+moment()})/`,
      IncotermsClassification: 'DAP',
      IncotermsLocation1: '1',
      CustomerPaymentTerms: '',
      SalesOffice: record.salesOffice,
      YY1_CustomSalesOrder_SDH: record.salesDocumentType === 'MS' ? 'ZWMS' : record.salesDocumentType === 'SC' ? 'ZWSC' : 'ZW' + records.salesDocumentType,
      // ReferenceSDDocument: record.contractNo,   removed for interface 1
      SoldToParty: record.soldToParty,
      DistributionChannel: record.salesDocumentType,
      SalesOrganization: salesContract.SalesOrganization,
      OrganizationDivision: salesContract.OrganizationDivision,
      ReferenceSDDocumentCategory: 'G',
      YY1_AlphanumericSalesO_SDH: record.workOrderWN,
      to_Item: [
        {
          SalesOrderItem: '10',
          UnderlyingPurchaseOrderItem: '10',
          SalesOrderItemCategory: 'TADN',
          Material: record.materialNo,
          RequestedQuantity: '1',
          RequestedQuantityUnit: 'LAB',
          RequestedQuantitySAPUnit: 'LAB',
          RequestedQuantityISOUnit: '_01',
          TransactionCurrency: record.currency_code,
          ReferenceSDDocument: record.contractNo,
          ReferenceSDDocumentItem: salesContractItem.SalesContractItem,
          WBSElement: record.projectNumberSAP,
          YY1_WNWorkOrder_SD_SDI: record.workOrderWN ? record.workOrderWN.substring(0, 10) : '',
          YY1_CustomBillingType_SDI: billingType.Billing_type,
          YY1_WeekEnd_SD_SDI: `/Date(${moment(record.beginDate, "YYYYMMDD").valueOf()})/`,  // Defect
          to_ScheduleLine: [this._prepareDataForScheduleLine({ record })],
          to_Partner: [],
          to_Text:[],
        },
      ],
      to_Partner: this._preparePartnerFunctions({ record, businessPartnerMap, vendorRemit, supplierAcc, personalNO, taxCode }),
      errors: [],
    };

        if (record.laborPODate) {
            oReturnData.to_Item[0].ServicesRenderedDate = record.laborPODate;
        }

        if (record.beginDate) {
            oReturnData.to_Item[0].YY1_WeekEnd_SD_SDI = `/Date(${moment(record.beginDate, "YYYYMMDD").valueOf()})/`;
        }

        if (record.remitToVendor?.startsWith('IV')) {
            oReturnData.CustomerGroup = 'ZI';
            oReturnData.DistributionChannel = 'IC';
        }

        if (record.remitToVendor && supplierAcc?.SupplierAccountGroup === 'ZRMT' && supplierAcc?.Industry === 'ZMBE') {
            oReturnData.CustomerPriceGroup = 'ZM';
            createPO.PORequiredSAP = "";
        }

        const oPaymentTerm = paymentTermsMap.get(record.soldToParty);
        const oCustomerPaymentTerm = customerPaymentTermsMap.get(record.soldToParty);
        if (oPaymentTerm?.customerTerm) {
            oReturnData.CustomerPaymentTerms = oPaymentTerm.customerTerm;
        } else if (oCustomerPaymentTerm?.CustomerPaymentTerms) {
            oReturnData.CustomerPaymentTerms = oCustomerPaymentTerm.CustomerPaymentTerms;
        }

        if (oPaymentTerm?.poBox) {
            oReturnData.PurchaseOrderByShipToParty = oPaymentTerm.poBox;
        }

        // if(['1500', '2500'].includes(record.companyCode) && 
        // ['MS','CP','CR','SC'].includes(record.salesDocumentType)){
        //   oReturnData.PurchaseOrderByCustomer = record?.laborPurchaseOrder || '';
        // }

        const oBusinessPartner = businessPartnerMap.get(`${record.soldToParty}_ZE`);
        if (oBusinessPartner) {
            const oCustomerEDIPartner = customerEDIPartner.get(oBusinessPartner.BPCustomerNumber);
            const oEditShiftEmpSubGrp = editShiftEmpSubGrp.get(oBusinessPartner.BPCustomerNumber);
            const oEditShiftCA = editShiftCA.get(oBusinessPartner.BPCustomerNumber);

            if (oCustomerEDIPartner?.shiftDiffCustom) {
                oReturnData.YY1_ShipToParty_SDH = oEditShiftEmpSubGrp.materialGroup2;
            } else if (oCustomerEDIPartner?.shiftDiffCA) {
                oReturnData.YY1_ShipToParty_SDH = oEditShiftCA.shiftDifferential;
            } else if (oCustomerEDIPartner?.shiftDiffUS) {
                oReturnData.YY1_ShipToParty_SDH = product?.FirstSalesSpecProductGroup;
            } else if (!['EDIXEROXUS', 'EDIXEROXXS'].includes(oCustomerEDIPartner?.customerNo) && oEditShiftEmpSubGrp) {
                oReturnData.YY1_ShipToParty_SDH = oEditShiftEmpSubGrp.materialGroup2;
            } else {
                oReturnData.YY1_ShipToParty_SDH = 'Z02';
            }
        }

        // Fill Item information
        // const oSalesContractItem = salesContract._Item.find(
        //   (item) => item.Product === record.materialNo && item.SalesContract === record.contractNo,
        // );

        // if (oSalesContractItem) {
        //   oReturnData.to_Item[0].ReferenceSDDocumentItem = oSalesContractItem.SalesContractItem;
        // } else {
        //   oReturnData.errors.push({
        //     record_ID: record.ID,
        //     message: cds.i18n.messages.at('ERR_MATERIAL_NOT_FOUND', [
        //       record.material,
        //       record.contractNo,
        //     ]),
        //   });
        // }

        if (!(['1500', '2500'].includes(record.companyCode) && ['MS', 'CP', 'CR', 'SC'].includes(record.salesDocumentType))) {
            oReturnData.to_Item[0].PurchaseOrderByCustomer = record?.laborPurchaseOrder || '';
        }

        if (record.remitToVendor) {
            oReturnData.to_Item[0].to_Partner.push({
                PartnerFunction: 'ZV',
                Supplier: record.remitToVendor,
            });
        }

        // only for Interface 1
        // if(record.salesDocumentType === 'SC'){
        //   oReturnData.to_Item[0].SalesOrderItemText = record?.poDesc;
        // }

        // Fill custom fields
        for (const fieldIndex of Array(15).keys()) {
            if (record[`customerFieldName${fieldIndex + 1}`] === 'Z20') {
                oReturnData.to_Item[0].to_Text.push({
                    LongText: record[`customerFieldValue${fieldIndex + 1}`],
                    LongTextID: 'ZJOB',
                    Language: 'EN'
                });
                // break;
            }
            if (record[`customerFieldName${fieldIndex + 1}`] === 'Z21') {
                oReturnData.to_Item[0].to_Text.push({
                    LongText: record[`customerFieldValue${fieldIndex + 1}`],
                    LongTextID: 'ZSLD',
                    Language: 'EN'
                });
                // break;
            }
            if (
                record[`customerFieldName${fieldIndex + 1}`] === 'Z41' && ['X', 'YES', 'Y'].includes(record[`customerFieldValue${fieldIndex + 1}`])
            ) {
                oReturnData.PriceListType = 'ZD';
            }
        }

        // // only for Interface 1
        // if(record.lineItemDesc){
        //   oReturnData.to_Item[0].to_Text[0].LongText = record.lineItemDesc;
        //   oReturnData.to_Item[0].to_Text[0].LongTextID = 'ZSLD';
        //   oReturnData.to_Item[0].to_Text[0].Language = 'EN';
        // }

        return oReturnData;
    }

    _prepareDataForScheduleLine({
        record
    }) {
        return {
            RequestedDeliveryDate: `/Date(${+moment()})/`,
            ScheduleLineOrderQuantity: '1',
            OrderQuantityISOUnit: '_01',
        };
    }

    /**
     * Prepare Partner Functions
     * @param {object} params
     * @param {object} params.record - EmployeeHires record
     * @param {object} mParams.vendorRemit - vendor vendorZR based on remit to vendor
     * @param {object} mParams.supplierAcc - supplier supplierAccountGroup based on remit to vendor
     * @param {Map} params.businessPartnerMap - Map of BusinessPartner data
     * @param {string} params.taxCode - Tax code
     * @returns {object} Partner Functions payload
     */
    _preparePartnerFunctions({
        record,
        businessPartnerMap,
        vendorRemit,
        supplierAcc,
        personalNO,
        taxCode
    }) {
        const aPartnerFunctions = [];

        // Sold to Party
        aPartnerFunctions.push({
            PartnerFunction: 'AG',
            Customer: record.soldToParty,
        });

        // Bill to Party
        aPartnerFunctions.push({
            PartnerFunction: 'RE',
            Customer: record.billToParty,
        });

        // TODO
        // SAP Employee
        aPartnerFunctions.push({
            PartnerFunction: 'Z3',
            Personnel: personalNO,
        });

        if (record.remitToVendor) {
            aPartnerFunctions.push({
                PartnerFunction: supplierAcc?.SupplierAccountGroup === 'ZRMT' ? 'ZR' : 'ZV',
                Supplier: record.remitToVendor,
            });

            if (supplierAcc?.SupplierAccountGroup === 'ZRMT') {
                aPartnerFunctions.push({
                    PartnerFunction: 'ZW',
                    Supplier: vendorRemit?.vendor ? vendorRemit.vendorZR : record.remitToVendor,
                });
            }
        }
        // Ship to Party (at header)
        const oShipToParty = businessPartnerMap.get(`${record.soldToParty}_SH`);
        const oAddr = {
            CorrespondenceLanguage: 'EN',
            StreetName: record.street,
            CityName: record.city,
            HouseNumber: record.doorNo,
            Country: record.country_code,
            Region: record.region,
            PostalCode: record.postalCode,
            TaxJurisdiction: taxCode,
        };
        if (oShipToParty && record.workLocation) {
            aPartnerFunctions.push({
                PartnerFunction: 'WE',
                Customer: oShipToParty.BPCustomerNumber,
                to_Address: [oAddr],
            });
        }

        // Email / Attention
        const oEmailContact = businessPartnerMap.get(`${record.soldToParty}_Z5`);
        if (!oEmailContact) {
            // Error
        } else {
            if (record.attentionLine) {
                oAddr.AddresseeFullName = record.attentionLine; // Check again
            }
            if (record.distributionEmail) {
                oAddr.EmailAddress = record.distributionEmail;
            }
            aPartnerFunctions.push({
                PartnerFunction: 'Z5',
                ContactPerson: oEmailContact.BPCustomerNumber, //'21',  // Mapping needs to be done dynamic
                to_Address: [oAddr],
            });
        }

        const targetFields = ['Z13', 'Z14', 'Z15'];
        const foundFields = {};

        for (let fieldIndex = 1; fieldIndex <= 15; fieldIndex++) {
            const fieldName = record[`customerFieldName${fieldIndex}`];
            const fieldValue = record[`customerFieldValue${fieldIndex}`];

            if (targetFields.includes(fieldName)) {
                foundFields[fieldName] = fieldValue;
            }
        }

    //Z4
    // Z4
if (Object.keys(foundFields).length > 0) {
      const oContactInfo = businessPartnerMap.get(`${record.soldToParty}_Z4`);
      if (!oContactInfo) {
      // Error
    } else {
      const oContactAddr = {
        OrganizationName1: foundFields.Z14 ||record.custManName,
        PhoneNumber: foundFields.Z15 ||record.custManPhone,
        EmailAddress: foundFields.Z13 ||record.custManEmail,
      };

                // const oContact = businessPartnerMap.get(`${record.soldToParty}_Z4`);
                aPartnerFunctions.push({
                    PartnerFunction: 'Z4',
                    ContactPerson: oContactInfo.ContactPerson,
                    // Customer: oContactInfo?.BPCustomerNumber || oShipToParty.BPCustomerNumber,
                    to_Address: [oContactAddr],
                });
            }
        }

        // if (Object.keys(foundFields).length) {
        //   oAddr.AddresseeFullName = foundFields.Z14 || '';
        //   oAddr.PhoneNumber = foundFields.Z15 || '';
        //   oAddr.EmailAddress = foundFields.Z13 || '';

        //   aPartnerFunctions.push({
        //     PartnerFunction: 'Z4',
        //     // Customer: oShipToParty.BPCustomer,
        //     to_Address: [oAddr],
        //   });
        // } 

        return aPartnerFunctions;
    }

    _getTaxCodeForRecord({
        record,
        aTaxCodeByProvince,
        aTaxCodeByCity,
        aTaxCodeByCounty,
        aAddresses
    }) {
        let sTaxCode = null,
            oTaxCode;
        let laddr = null;
        switch (record.country_code) {
            case 'CA':
                oTaxCode = aTaxCodeByProvince.find(
                    (oTaxCode) =>
                    oTaxCode.region === record.region && oTaxCode.country_code === record.country_code,
                );
                if (oTaxCode) {
                    sTaxCode = oTaxCode.taxJurisdiction;
                }
                break;
            case 'US':
                oTaxCode = aTaxCodeByCity.find(
                    (oTaxCode) =>
                    oTaxCode.city === record.city &&
                    oTaxCode.region === record.region &&
                    oTaxCode.country_code === record.country_code,
                );
                if (oTaxCode) {
                    sTaxCode = oTaxCode.taxJurisdiction;
                } else {
                    laddr = aAddresses.find(
                        (addr) =>
                        addr.zipcode === record.postalCode
                    );
                    record.county = laddr?.county.toUpperCase();
                    oTaxCode = aTaxCodeByCounty.find(
                        (oTaxCode) =>
                        oTaxCode.region === record.region &&
                        oTaxCode.country_code === record.country_code,
                    ); // CHECK: Does record.county exists yet ?
                    if (oTaxCode) {
                        sTaxCode = oTaxCode.taxJurisdiction;
                    } else {
                        oTaxCode = aTaxCodeByProvince.find(
                            (oTaxCode) =>
                            oTaxCode.region === record.region && oTaxCode.country_code === record.country_code,
                        );
                        if (oTaxCode) {
                            sTaxCode = oTaxCode.taxJurisdiction;
                        }
                    }
                }
                break;
            default:
                break;
        }
        return sTaxCode;
    }

    // Prepare VC Data Payload and insert it
    // async _prepareVCData({
    //   records,
    //   mCustomerFieldNameValue,
    //   mPayloadMap,
    //   aPassedRecordIDs,
    //   aFailedRecordIDs,
    //   aErrorLogs
    // }) {
    //   const SalesVCData_1 = new SalesVCData_1Comm();
    //   const SalesVCData_2 = new SalesVCData_2Comm();

    //   // 1. filtering the records based on the not failed records ids.
    //   // 2. generating payload for both VCData1 & VCData2 based on the salesorder for that record id.
    //   let aPayloadsSalesVCData = records
    //     .filter((record) => !aFailedRecordIDs.includes(record.ID))
    //     .map((record) => {
    //       const oMapEntry = mPayloadMap.get(record.ID);
    //       if (oMapEntry && oMapEntry.salesOrder) {

    //         const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID);

    //         // const VC1Fields = ['YY6_SC_LINE_ITEM_NUMBER', 'YY3_ACA_HRS_PRICE', 'YY118_MARK_UP_RG', 'YY119_MARK_UP_OT', 'YY120_MARK_UP_DB'];
    //         const VC1CustomerFieldName = ['Z40', 'Z43', 'Z44', 'Z45', 'Z46'];
    //         const VC2CustomerFieldName = ['Z01', 'Z02', 'Z03', 'Z04', 'Z05', 'Z06', 'Z07', 'Z08', 'Z09', 'Z10', 'Z11', 'Z12',
    //           'Z16', 'Z17', 'Z18', 'Z19', 'Z24', 'Z25', 'Z26', 'Z27', 'Z28', 'Z29', 'Z31',
    //           'Z32', 'Z33', 'Z34', 'Z35', 'Z37', 'Z39', 'Z42'];
    //         const oCustFieldResult = aCustomerfieldEntry.reduce((acc, entry) => {
    //           if (VC1CustomerFieldName.includes(entry.customerFieldName)) {
    //             acc.VC1Fields[entry.fieldName] = entry.customerFieldValue;
    //           } else if (VC2CustomerFieldName.includes(entry.customerFieldName)) {
    //             acc.VC2Fields[entry.fieldName] = entry.customerFieldValue;
    //           }
    //           return acc;
    //         }, { VC1Fields: {}, VC2Fields: {} });


    //         let shift = 1;
    //         const salesVC1 = {
    //           SalesOrderNumber: oMapEntry.salesOrder,
    //           SalesOrderItemNum: '10',
    //           YY8_WEEK_ENDING2: moment(record.beginDate).format('YYYY-MM-DD'),
    //           YY12_DAY1_SHIFT1_RG: shift,
    //           YY13_DAY1_SHIFT1_OT: shift,
    //           YY14_DAY1_SHIFT1_DB: shift,
    //           YY15_DAY1_SHIFT2_RG: shift,
    //           YY16_DAY1_SHIFT2_OT: shift,
    //           YY17_DAY1_SHIFT2_DB: shift,
    //           YY18_DAY1_SHIFT3_RG: shift,
    //           YY19_DAY1_SHIFT3_OT: shift,
    //           YY20_DAY1_SHIFT3_DB: shift,
    //           YY100_SHIFT1_TOTAL_HRS_RG: shift,
    //           YY101_SHIFT1_TOTAL_HRS_OT: shift,
    //           YY102_SHIFT1_TOTAL_HRS_DB: shift,
    //           YY103_SHIFT2_TOTAL_HRS_RG: shift,
    //           YY104_SHIFT2_TOTAL_HRS_OT: shift,
    //           YY105_SHIFT2_TOTAL_HRS_DB: shift,
    //           YY106_SHIFT3_TOTAL_HRS_RG: shift,
    //           YY107_SHIFT3_TOTAL_HRS_OT: shift,
    //           YY108_SHIFT3_TOTAL_HRS_DB: shift,
    //           YY109_SHIFT1_PRICE_RG: record.shiftCustomerBillRateFirst,
    //           YY110_SHIFT1_PRICE_OT: record.shiftCustomerOTBillRateFirst,
    //           YY111_SHIFT1_PRICE_DB: record.shiftCustomerDTBillRateFirst,
    //           YY112_SHIFT2_PRICE_RG: record.shiftCustomerBillRateSecond,
    //           YY113_SHIFT2_PRICE_OT: record.shiftCustomerOTBillRateSecond,
    //           YY114_SHIFT2_PRICE_DB: record.shiftCustomerDTBillRateSecond,
    //           YY115_SHIFT3_PRICE_RG: record.shiftCustomerBillRateThird,
    //           YY116_SHIFT3_PRICE_OT: record.shiftCustomerOTBillRateThird,
    //           YY117_SHIFT3_PRICE_DB: record.shiftCustomerDTBillRateThird,
    //           YY121_SHIFT1_TOTAL_PRICE_RG: shift * record.shiftCustomerBillRateFirst,
    //           YY122_SHIFT1_TOTAL_PRICE_OT: shift * record.shiftCustomerOTBillRateFirst,
    //           YY123_SHIFT1_TOTAL_PRICE_DB: shift * record.shiftCustomerDTBillRateFirst,
    //           YY124_SHIFT2_TOTAL_PRICE_RG: shift * record.shiftCustomerBillRateSecond,
    //           YY125_SHIFT2_TOTAL_PRICE_OT: shift * record.shiftCustomerOTBillRateSecond,
    //           YY126_SHIFT2_TOTAL_PRICE_DB: shift * record.shiftCustomerDTBillRateSecond,
    //           YY127_SHIFT3_TOTAL_PAY_RG: shift * record.shiftCustomerBillRateThird,
    //           YY128_SHIFT3_TOTAL_PAY_OT: shift * record.shiftCustomerOTBillRateThird,
    //           YY129_SHIFT3_TOTAL_PAY_DB: shift * record.shiftCustomerDTBillRateThird,
    //           ...(oCustFieldResult.VC1Fields || {}),
    //         };
    //         const salesVC2 = {
    //           Sales_Order_Number: oMapEntry.salesOrder,
    //           Sales_Order_Item_Num: '10',
    //           YY135_DAILY_TOTAL_VENDOR: 0,
    //           YY137_HOLIDAY_TOTAL_VENDOR: 0,
    //           YY247_ZSD_WN_WORK_ORDER_VCSD: record.workOrderWN,
    //           YY251_SHIFT1_PAY_RATE_RG: record.shiftVendorPayRateFirst,
    //           YY252_SHIFT1_PAY_RATE_OT: record.shiftVendorOTPayRateFirst,
    //           YY253_SHIFT1_PAY_RATE_DB: record.shiftVendorDTPayRateFirst,
    //           YY254_SHIFT2_PAY_RATE_RG: record.shiftVendorPayRateSecond,
    //           YY255_SHIFT2_PAY_RATE_OT: record.shiftVendorOTPayRateSecond,
    //           YY256_SHIFT2_PAY_RATE_DB: record.shiftVendorDTPayRateSecond,
    //           YY257_SHIFT3_PAY_RATE_RG: record.shiftVendorPayRateThird,
    //           YY258_SHIFT3_PAY_RATE_OT: record.shiftVendorOTPayRateThird,
    //           YY259_SHIFT3_PAY_RATE_DB: record.shiftVendorDTPayRateThird,
    //           YY260_SHIFT1_TOTAL_PAY_RG: record.shiftVendorPayRateFirst,
    //           YY261_SHIFT1_TOTAL_PAY_OT: record.shiftVendorOTPayRateFirst,
    //           YY262_SHIFT1_TOTAL_PAY_DB: record.shiftVendorDTPayRateFirst,
    //           YY263_SHIFT2_TOTAL_PAY_RG: record.shiftVendorPayRateSecond,
    //           YY264_SHIFT2_TOTAL_PAY_OT: record.shiftVendorOTPayRateSecond,
    //           YY265_SHIFT2_TOTAL_PAY_DB: record.shiftVendorDTPayRateSecond,
    //           YY266_SHIFT3_TOTAL_PAY_RG: record.shiftVendorPayRateThird,
    //           YY267_SHIFT3_TOTAL_PAY_OT: record.shiftVendorOTPayRateThird,
    //           YY268_SHIFT3_TOTAL_PAY_DB: record.shiftVendorDTPayRateThird,
    //           ...(oCustFieldResult.VC2Fields || {}),
    //         };
    //         const recordID = record.ID;
    //         const vcData1UUID = record.vcData1UUID;
    //         const vcData2UUID = record.vcData2UUID;
    //         return [salesVC1, salesVC2, recordID, vcData1UUID, vcData2UUID];
    //       } else {
    //         return [];
    //       }
    //     });

    //   for (let i = 0; i < aPayloadsSalesVCData.length; i++) {
    //     let insertedSalesVCData1, insertedSalesVCData2;
    //     // TODO: Conver to Batch call and take call out of loop
    //     if (!aPayloadsSalesVCData[i][3]) {
    //       insertedSalesVCData1 = await SalesVCData_1.executeQuery(
    //         INSERT.into('YY1_SALESVCDATA_1').entries(aPayloadsSalesVCData[i][0]),
    //       );
    //     }
    //     if (!aPayloadsSalesVCData[i][4]) {
    //       insertedSalesVCData2 = await SalesVCData_2.executeQuery(
    //         INSERT.into('YY1_SALESVCDATA_2').entries(aPayloadsSalesVCData[i][1]),
    //       );
    //     }

    //     const oMapEntry = mPayloadMap.get(aPayloadsSalesVCData[i][2]);
    //     if (insertedSalesVCData1?.SAP_UUID || aPayloadsSalesVCData[i][3]) {
    //       oMapEntry.vcData1UUID = insertedSalesVCData1?.SAP_UUID ?? aPayloadsSalesVCData[i][3];
    //     }
    //     if (insertedSalesVCData2?.SAP_UUID || aPayloadsSalesVCData[i][4]) {
    //       oMapEntry.vcData2UUID = insertedSalesVCData2?.SAP_UUID ?? aPayloadsSalesVCData[i][4];
    //     }
    //     mPayloadMap.set(aPayloadsSalesVCData[i][2], oMapEntry);

    //     // error log for failed to insert records in VCData
    //     if (insertedSalesVCData1?.message || insertedSalesVCData2?.message) {
    //       if (insertedSalesVCData1?.message) {
    //         aErrorLogs.push({
    //           record_ID: aPayloadsSalesVCData[i][2],
    //           message: `${insertedSalesVCData1.message}`,
    //         });
    //       }
    //       if (insertedSalesVCData2?.message) {
    //         aErrorLogs.push({
    //           record_ID: aPayloadsSalesVCData[i][2],
    //           message: `${insertedSalesVCData2.message}`,
    //         });
    //       }

    //       aFailedRecordIDs.push(aPayloadsSalesVCData[i][2]);

    //       // remvove id which is getting error from PassRecordIds.
    //       const index = aPassedRecordIDs.indexOf(aPayloadsSalesVCData[i][2]);
    //       if (index !== -1) aPassedRecordIDs.splice(index, 1);
    //       LOG.error(
    //         `Error processing record ID ${aPayloadsSalesVCData[i][2]}: ${insertedSalesVCData1.message} || ${insertedSalesVCData2.message}`,
    //       );
    //     }
    //   }
    // }

    // Prepare VC Data Payload and insert it
    // async _prepareVCData({
    //   records,
    //   mCustomerFieldNameValue,
    //   mPayloadMap,
    //   aPassedRecordIDs,
    //   aFailedRecordIDs,
    //   aErrorLogs
    // }) {
    //   const SalesVCData_1 = new SalesVCData_1Comm();
    //   const SalesVCData_2 = new SalesVCData_2Comm();


    //   // Z -> target mapping from your HANA table

    //   const Z_MAP = Object.freeze({
    //     Z01: 'YY216_CUST_BUSINESS_UNIT',
    //     Z02: 'YY217_CUST_CHARGE_NUMBER',
    //     Z03: 'YY250_CUST_COST_CENTER2',
    //     Z04: 'YY220_CUST_COMPANY_CODE',
    //     Z05: 'YY221_CUST_DEPT_NUMBER',
    //     Z06: 'YY222_CUST_DOTS_NUMBER',
    //     Z07: 'YY223_CUST_RUI',
    //     Z08: 'YY144_WEEKLY_CLOCK_FEE',
    //     Z09: 'YY224_CUST_ACCT_NUMBER',
    //     Z10: 'YY225_CUST_BUDGET_CENTER',
    //     Z11: 'YY226_CUST_CON_NUMBER',
    //     Z12: 'YY227_CUST_VENDOR_NUMBER',
    //     // Z13..Z15: no mapped YY provided -> ignore
    //     Z16: 'YY228_CUST_ORG_CODE',
    //     Z17: 'YY229_CUST_LEGAL_ENTITY',
    //     Z18: 'YY230_CUST_ORACLE_NUMBER',
    //     Z19: 'YY231_CUST_UNIT_STORE_NUMBER',
    //     // Z20..Z23: no mapped YY provided -> ignore
    //     Z24: 'YY233_CUST_EMPLOYEE_NUMBER',
    //     Z25: 'YY234_CUST_AGREE_NUMBER',
    //     Z26: 'YY241_CUST_BGRD_CHECK_DATE',
    //     Z27: 'YY242_CUST_DIV_UNIT_NUMBER',
    //     Z28: 'YY236_CUST_FEPS_CODE',
    //     Z29: 'YY237_CUST_POSITION',
    //     // Z30: no mapped YY provided -> ignore
    //     Z31: 'YY235_CUST_TASK15',
    //     Z32: 'YY238_CUST_GL_CODE',
    //     Z33: 'YY240_CUST_BB_NUMBER',
    //     Z34: 'YY218_CUST_PROJECT_NUMBER',
    //     Z35: 'YY239_CUST_PURCHASE_AGREE',
    //     // Z36: no mapped YY provided -> ignore
    //     Z37: 'YY237_CUST_POSITION',
    //     // Z38: no mapped YY provided -> ignore
    //     Z39: 'CUST_CATERGORY_CODE2',       // non-YY, VC2
    //     Z40: 'YY6_SC_LINE_ITEM_NUMBER',   // VC1
    //     // Z41: no mapped YY provided -> ignore
    //     Z42: 'ACCELERATED_FEE_DISC_VEN',  // non-YY, VC2
    //     Z43: 'YY3_ACA_HRS_PRICE',         // VC1
    //     Z44: 'YY118_MARK_UP_RG',          // VC1
    //     Z45: 'YY119_MARK_UP_OT',          // VC1
    //     Z46: 'YY120_MARK_UP_DB'           // VC1
    //   });

    //   // VC1 and VC2 property sets (from EDMX) to bucket Z targets correctly
    //   const VC1_PROPS = new Set([
    //     'YY3_ACA_HRS_PRICE',
    //     'YY6_SC_LINE_ITEM_NUMBER',
    //     'YY8_WEEK_ENDING2',
    //     'YY12_DAY1_SHIFT1_RG','YY13_DAY1_SHIFT1_OT','YY14_DAY1_SHIFT1_DB',
    //     'YY15_DAY1_SHIFT2_RG','YY16_DAY1_SHIFT2_OT','YY17_DAY1_SHIFT2_DB',
    //     'YY18_DAY1_SHIFT3_RG','YY19_DAY1_SHIFT3_OT','YY20_DAY1_SHIFT3_DB',
    //     'YY100_SHIFT1_TOTAL_HRS_RG','YY101_SHIFT1_TOTAL_HRS_OT','YY102_SHIFT1_TOTAL_HRS_DB',
    //     'YY103_SHIFT2_TOTAL_HRS_RG','YY104_SHIFT2_TOTAL_HRS_OT','YY105_SHIFT2_TOTAL_HRS_DB',
    //     'YY106_SHIFT3_TOTAL_HRS_RG','YY107_SHIFT3_TOTAL_HRS_OT','YY108_SHIFT3_TOTAL_HRS_DB',
    //     'YY109_SHIFT1_PRICE_RG','YY110_SHIFT1_PRICE_OT','YY111_SHIFT1_PRICE_DB',
    //     'YY112_SHIFT2_PRICE_RG','YY113_SHIFT2_PRICE_OT','YY114_SHIFT2_PRICE_DB',
    //     'YY115_SHIFT3_PRICE_RG','YY116_SHIFT3_PRICE_OT','YY117_SHIFT3_PRICE_DB',
    //     'YY118_MARK_UP_RG','YY119_MARK_UP_OT','YY120_MARK_UP_DB',
    //     'YY121_SHIFT1_TOTAL_PRICE_RG','YY122_SHIFT1_TOTAL_PRICE_OT','YY123_SHIFT1_TOTAL_PRICE_DB',
    //     'YY124_SHIFT2_TOTAL_PRICE_RG','YY125_SHIFT2_TOTAL_PRICE_OT','YY126_SHIFT2_TOTAL_PRICE_DB',
    //     'YY127_SHIFT3_TOTAL_PAY_RG','YY128_SHIFT3_TOTAL_PAY_OT','YY129_SHIFT3_TOTAL_PAY_DB'
    //   ]);
    //   const VC2_PROPS = new Set([
    //     'YY216_CUST_BUSINESS_UNIT','YY217_CUST_CHARGE_NUMBER','YY218_CUST_PROJECT_NUMBER',
    //     'YY219_CUST_COST_CENTER','YY220_CUST_COMPANY_CODE','YY221_CUST_DEPT_NUMBER',
    //     'YY222_CUST_DOTS_NUMBER','YY223_CUST_RUI','YY224_CUST_ACCT_NUMBER',
    //     'YY225_CUST_BUDGET_CENTER','YY226_CUST_CON_NUMBER','YY227_CUST_VENDOR_NUMBER',
    //     'YY228_CUST_ORG_CODE','YY229_CUST_LEGAL_ENTITY','YY230_CUST_ORACLE_NUMBER',
    //     'YY231_CUST_UNIT_STORE_NUMBER','YY232_CUST_SVC_DATE','YY233_CUST_EMPLOYEE_NUMBER',
    //     'YY234_CUST_AGREE_NUMBER','YY235_CUST_TASK15','YY236_CUST_FEPS_CODE',
    //     'YY237_CUST_POSITION','YY238_CUST_GL_CODE','YY239_CUST_PURCHASE_AGREE',
    //     'YY240_CUST_BB_NUMBER','YY241_CUST_BGRD_CHECK_DATE','YY242_CUST_DIV_UNIT_NUMBER',
    //     'YY243_CUST_POSITION_CODE','YY247_ZSD_WN_WORK_ORDER_VCSD','YY250_CUST_COST_CENTER2',
    //     'YY251_SHIFT1_PAY_RATE_RG','YY252_SHIFT1_PAY_RATE_OT','YY253_SHIFT1_PAY_RATE_DB',
    //     'YY254_SHIFT2_PAY_RATE_RG','YY255_SHIFT2_PAY_RATE_OT','YY256_SHIFT2_PAY_RATE_DB',
    //     'YY257_SHIFT3_PAY_RATE_RG','YY258_SHIFT3_PAY_RATE_OT','YY259_SHIFT3_PAY_RATE_DB',
    //     'YY260_SHIFT1_TOTAL_PAY_RG','YY261_SHIFT1_TOTAL_PAY_OT','YY262_SHIFT1_TOTAL_PAY_DB',
    //     'YY263_SHIFT2_TOTAL_PAY_RG','YY264_SHIFT2_TOTAL_PAY_OT','YY265_SHIFT2_TOTAL_PAY_DB',
    //     'YY266_SHIFT3_TOTAL_PAY_RG','YY267_SHIFT3_TOTAL_PAY_OT','YY268_SHIFT3_TOTAL_PAY_DB',
    //     // also VC2 totals/fees that appear in other flows
    //     'YY134_DAILY_PAY_VENDOR','YY142_SALARY_PAY_VENDOR','YY144_WEEKLY_CLOCK_FEE',
    //     'YY150_DAILY_PAY_DAYS','YY151_DAILY_PRICE','YY152_DAILY_TOTAL_RATE','YY203_SALARY',
    //     // non-YY VC2 fields from your table:
    //     'ACCELERATED_FEE_DISC_VEN','CUST_CATERGORY_CODE2'
    //   ]);

    //   // 1. filter not-failed; 2. build payloads
    //   let aPayloadsSalesVCData = records
    //     .filter((record) => !aFailedRecordIDs.includes(record.ID))
    //     .map((record) => {
    //       const oMapEntry = mPayloadMap.get(record.ID);
    //       if (!(oMapEntry && oMapEntry.salesOrder)) return [];

    //       const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID) || [];

    //       // Build VC1/VC2 maps by translating Zxx -> target prop; bucket by EDMX sets
    //       const oCustFieldResult = aCustomerfieldEntry.reduce(
    //         (acc, entry) => {
    //           const z = (entry.customerFieldName || '').trim();
    //           const target = Z_MAP[z];
    //           if (!target) return acc; // ignore Zs without a configured target

    //           if (VC1_PROPS.has(target)) {
    //             acc.VC1Fields[target] = entry.customerFieldValue;
    //           } else {
    //             acc.VC2Fields[target] = entry.customerFieldValue; // default to VC2
    //           }
    //           return acc;
    //         },
    //         { VC1Fields: {}, VC2Fields: {} }
    //       );

    //       // ---- existing mapping as-is  ----
    //       let shift = 1;

    //       const salesVC1 = {
    //         SalesOrderNumber: oMapEntry.salesOrder,
    //         SalesOrderItemNum: '10',
    //         YY8_WEEK_ENDING2: moment(record.beginDate).format('YYYY-MM-DD'),
    //         YY12_DAY1_SHIFT1_RG: shift,
    //         YY13_DAY1_SHIFT1_OT: shift,
    //         YY14_DAY1_SHIFT1_DB: shift,
    //         YY15_DAY1_SHIFT2_RG: shift,
    //         YY16_DAY1_SHIFT2_OT: shift,
    //         YY17_DAY1_SHIFT2_DB: shift,
    //         YY18_DAY1_SHIFT3_RG: shift,
    //         YY19_DAY1_SHIFT3_OT: shift,
    //         YY20_DAY1_SHIFT3_DB: shift,
    //         YY100_SHIFT1_TOTAL_HRS_RG: shift,
    //         YY101_SHIFT1_TOTAL_HRS_OT: shift,
    //         YY102_SHIFT1_TOTAL_HRS_DB: shift,
    //         YY103_SHIFT2_TOTAL_HRS_RG: shift,
    //         YY104_SHIFT2_TOTAL_HRS_OT: shift,
    //         YY105_SHIFT2_TOTAL_HRS_DB: shift,
    //         YY106_SHIFT3_TOTAL_HRS_RG: shift,
    //         YY107_SHIFT3_TOTAL_HRS_OT: shift,
    //         YY108_SHIFT3_TOTAL_HRS_DB: shift,
    //         YY109_SHIFT1_PRICE_RG: record.shiftCustomerBillRateFirst,
    //         YY110_SHIFT1_PRICE_OT: record.shiftCustomerOTBillRateFirst,
    //         YY111_SHIFT1_PRICE_DB: record.shiftCustomerDTBillRateFirst,
    //         YY112_SHIFT2_PRICE_RG: record.shiftCustomerBillRateSecond,
    //         YY113_SHIFT2_PRICE_OT: record.shiftCustomerOTBillRateSecond,
    //         YY114_SHIFT2_PRICE_DB: record.shiftCustomerDTBillRateSecond,
    //         YY115_SHIFT3_PRICE_RG: record.shiftCustomerBillRateThird,
    //         YY116_SHIFT3_PRICE_OT: record.shiftCustomerOTBillRateThird,
    //         YY117_SHIFT3_PRICE_DB: record.shiftCustomerDTBillRateThird,
    //         YY121_SHIFT1_TOTAL_PRICE_RG: shift * record.shiftCustomerBillRateFirst,
    //         YY122_SHIFT1_TOTAL_PRICE_OT: shift * record.shiftCustomerOTBillRateFirst,
    //         YY123_SHIFT1_TOTAL_PRICE_DB: shift * record.shiftCustomerDTBillRateFirst,
    //         YY124_SHIFT2_TOTAL_PRICE_RG: shift * record.shiftCustomerBillRateSecond,
    //         YY125_SHIFT2_TOTAL_PRICE_OT: shift * record.shiftCustomerOTBillRateSecond,
    //         YY126_SHIFT2_TOTAL_PRICE_DB: shift * record.shiftCustomerDTBillRateSecond,
    //         YY127_SHIFT3_TOTAL_PAY_RG: shift * record.shiftCustomerBillRateThird,
    //         YY128_SHIFT3_TOTAL_PAY_OT: shift * record.shiftCustomerOTBillRateThird,
    //         YY129_SHIFT3_TOTAL_PAY_DB: shift * record.shiftCustomerDTBillRateThird,
    //         ...(oCustFieldResult.VC1Fields || {}),
    //       };

    //       const salesVC2 = {
    //         Sales_Order_Number: oMapEntry.salesOrder,
    //         Sales_Order_Item_Num: '10',
    //         YY135_DAILY_TOTAL_VENDOR: 0,
    //         YY137_HOLIDAY_TOTAL_VENDOR: 0,
    //         YY247_ZSD_WN_WORK_ORDER_VCSD: record.workOrderWN,
    //         YY251_SHIFT1_PAY_RATE_RG: record.shiftVendorPayRateFirst,
    //         YY252_SHIFT1_PAY_RATE_OT: record.shiftVendorOTPayRateFirst,
    //         YY253_SHIFT1_PAY_RATE_DB: record.shiftVendorDTPayRateFirst,
    //         YY254_SHIFT2_PAY_RATE_RG: record.shiftVendorPayRateSecond,
    //         YY255_SHIFT2_PAY_RATE_OT: record.shiftVendorOTPayRateSecond,
    //         YY256_SHIFT2_PAY_RATE_DB: record.shiftVendorDTPayRateSecond,
    //         YY257_SHIFT3_PAY_RATE_RG: record.shiftVendorPayRateThird,
    //         YY258_SHIFT3_PAY_RATE_OT: record.shiftVendorOTPayRateThird,
    //         YY259_SHIFT3_PAY_RATE_DB: record.shiftVendorDTPayRateThird,
    //         YY260_SHIFT1_TOTAL_PAY_RG: record.shiftVendorPayRateFirst,
    //         YY261_SHIFT1_TOTAL_PAY_OT: record.shiftVendorOTPayRateFirst,
    //         YY262_SHIFT1_TOTAL_PAY_DB: record.shiftVendorDTPayRateFirst,
    //         YY263_SHIFT2_TOTAL_PAY_RG: record.shiftVendorPayRateSecond,
    //         YY264_SHIFT2_TOTAL_PAY_OT: record.shiftVendorOTPayRateSecond,
    //         YY265_SHIFT2_TOTAL_PAY_DB: record.shiftVendorDTPayRateSecond,
    //         YY266_SHIFT3_TOTAL_PAY_RG: record.shiftVendorPayRateThird,
    //         YY267_SHIFT3_TOTAL_PAY_OT: record.shiftVendorOTPayRateThird,
    //         YY268_SHIFT3_TOTAL_PAY_DB: record.shiftVendorDTPayRateThird,
    //         ...(oCustFieldResult.VC2Fields || {}),
    //       };

    //       // readable debug log of payloads
    //       try {
    //         LOG.info(
    //           `[VC] Constructed payloads for record ${record.ID}`,
    //           {
    //             recID: record.ID,
    //             salesOrder: String(oMapEntry.salesOrder),
    //             vc1Payload: JSON.stringify(salesVC1, null, 2),
    //             vc2Payload: JSON.stringify(salesVC2, null, 2)
    //           }
    //         );
    //       } catch (e) {}

    //       const recordID = record.ID;
    //       const vcData1UUID = record.vcData1UUID;
    //       const vcData2UUID = record.vcData2UUID;
    //       return [salesVC1, salesVC2, recordID, vcData1UUID, vcData2UUID];
    //     }).filter(payload => payload.length > 0);

    //   for (let i = 0; i < aPayloadsSalesVCData.length; i++) {
    //     let insertedSalesVCData1, insertedSalesVCData2;

    //     const recID = aPayloadsSalesVCData[i][2];
    //     const hasVC1Already = !!aPayloadsSalesVCData[i][3];
    //     const hasVC2Already = !!aPayloadsSalesVCData[i][4];

    //     // pre-insert log
    //     try {
    //       LOG.info(
    //         `[VC] PRE-INSERT for record ${recID}`,
    //         {
    //           recID,
    //           hasVC1Already,
    //           hasVC2Already,
    //           vc1Payload: JSON.stringify(aPayloadsSalesVCData[i][0], null, 2),
    //           vc2Payload: JSON.stringify(aPayloadsSalesVCData[i][1], null, 2)
    //         }
    //       );
    //     } catch (e) {}

    //     // TODO: Convert to Batch call and take call out of loop 
    //     if (!aPayloadsSalesVCData[i][3]) {
    //       insertedSalesVCData1 = await SalesVCData_1.executeQuery(
    //         INSERT.into('YY1_SALESVCDATA_1').entries(aPayloadsSalesVCData[i][0]),
    //       );
    //     }
    //     if (!aPayloadsSalesVCData[i][4]) {
    //       insertedSalesVCData2 = await SalesVCData_2.executeQuery(
    //         INSERT.into('YY1_SALESVCDATA_2').entries(aPayloadsSalesVCData[i][1]),
    //       );
    //     }

    //     // post-insert log
    //     try {
    //       LOG.info(
    //         `[VC] POST-INSERT result for record ${recID}`,
    //         {
    //           recID,
    //           vc1Result: JSON.stringify(insertedSalesVCData1 || {}, null, 2),
    //           vc2Result: JSON.stringify(insertedSalesVCData2 || {}, null, 2)
    //         }
    //       );
    //     } catch (e) {}

    //     const oMapEntry = mPayloadMap.get(aPayloadsSalesVCData[i][2]);
    //     if (insertedSalesVCData1?.SAP_UUID || aPayloadsSalesVCData[i][3]) {
    //       oMapEntry.vcData1UUID = insertedSalesVCData1?.SAP_UUID ?? aPayloadsSalesVCData[i][3];
    //     }
    //     if (insertedSalesVCData2?.SAP_UUID || aPayloadsSalesVCData[i][4]) {
    //       oMapEntry.vcData2UUID = insertedSalesVCData2?.SAP_UUID ?? aPayloadsSalesVCData[i][4];
    //     }
    //     mPayloadMap.set(aPayloadsSalesVCData[i][2], oMapEntry);

    //     // unchanged error handling
    //     if (insertedSalesVCData1?.message || insertedSalesVCData2?.message) {
    //       if (insertedSalesVCData1?.message) {
    //         aErrorLogs.push({
    //           record_ID: aPayloadsSalesVCData[i][2],
    //           message: `${insertedSalesVCData1.message}`,
    //         });
    //       }
    //       if (insertedSalesVCData2?.message) {
    //         aErrorLogs.push({
    //           record_ID: aPayloadsSalesVCData[i][2],
    //           message: `${insertedSalesVCData2.message}`,
    //         });
    //       }

    //       aFailedRecordIDs.push(aPayloadsSalesVCData[i][2]);

    //       const index = aPassedRecordIDs.indexOf(aPayloadsSalesVCData[i][2]);
    //       if (index !== -1) aPassedRecordIDs.splice(index, 1);
    //       LOG.error(
    //         `Error processing record ID ${aPayloadsSalesVCData[i][2]}: ${insertedSalesVCData1?.message} || ${insertedSalesVCData2?.message}`,
    //       );
    //     }
    //   }
    // }


    // prepare VC Data
    async _prepareVCData({
        records,
        mCustomerFieldNameValue,
        mPayloadMap,
        aPassedRecordIDs,
        aFailedRecordIDs,
        aErrorLogs
    }) {
        const LOG = this.LOG || console;
        const moment = require('moment');

        const SalesVCData_1 = new SalesVCData_1Comm();
        const SalesVCData_2 = new SalesVCData_2Comm();

        const mEmployeeType = {
            Salary: 'SAL',
            Daily: 'DAY',
            Hourly: 'HOU'
        };

        // ---- Z-code mapping with VC routing ----
        /** @type {Record<string,{target:string, vc:1|2}|undefined>} */
        const Z_MAP = Object.freeze({
            Z01: {
                target: 'YY216_CUST_BUSINESS_UNIT',
                vc: 2
            },
            Z02: {
                target: 'YY217_CUST_CHARGE_NUMBER',
                vc: 2
            },
            Z03: {
                target: 'YY250_CUST_COST_CENTER2',
                vc: 2
            },
            Z04: {
                target: 'YY220_CUST_COMPANY_CODE',
                vc: 2
            },
            Z05: {
                target: 'YY221_CUST_DEPT_NUMBER',
                vc: 2
            },
            Z06: {
                target: 'YY222_CUST_DOTS_NUMBER',
                vc: 2
            },
            Z07: {
                target: 'YY223_CUST_RUI',
                vc: 2
            },
            Z08: {
                target: 'YY144_WEEKLY_CLOCK_FEE',
                vc: 2
            }, // override base if present
            Z09: {
                target: 'YY224_CUST_ACCT_NUMBER',
                vc: 2
            },
            Z10: {
                target: 'YY225_CUST_BUDGET_CENTER',
                vc: 2
            },
            Z11: {
                target: 'YY226_CUST_CON_NUMBER',
                vc: 2
            },
            Z12: {
                target: 'YY227_CUST_VENDOR_NUMBER',
                vc: 2
            },
            // Z13..Z15: ignore
            Z16: {
                target: 'YY228_CUST_ORG_CODE',
                vc: 2
            },
            Z17: {
                target: 'YY229_CUST_LEGAL_ENTITY',
                vc: 2
            },
            Z18: {
                target: 'YY230_CUST_ORACLE_NUMBER',
                vc: 2
            },
            Z19: {
                target: 'YY231_CUST_UNIT_STORE_NUMBER',
                vc: 2
            },
            // Z20..Z23: ignore
            Z24: {
                target: 'YY233_CUST_EMPLOYEE_NUMBER',
                vc: 2
            },
            Z25: {
                target: 'YY234_CUST_AGREE_NUMBER',
                vc: 2
            },
            Z26: {
                target: 'YY241_CUST_BGRD_CHECK_DATE',
                vc: 2
            },
            Z27: {
                target: 'YY242_CUST_DIV_UNIT_NUMBER',
                vc: 2
            },
            Z28: {
                target: 'YY236_CUST_FEPS_CODE',
                vc: 2
            },
            Z29: {
                target: 'YY237_CUST_POSITION',
                vc: 2
            },
            // Z30: ignore
            Z31: {
                target: 'YY235_CUST_TASK15',
                vc: 2
            },
            Z32: {
                target: 'YY238_CUST_GL_CODE',
                vc: 2
            },
            Z33: {
                target: 'YY240_CUST_BB_NUMBER',
                vc: 2
            },
            Z34: {
                target: 'YY218_CUST_PROJECT_NUMBER',
                vc: 2
            },
            Z35: {
                target: 'YY239_CUST_PURCHASE_AGREE',
                vc: 2
            },
            // Z36: ignore
            Z37: {
                target: 'YY237_CUST_POSITION',
                vc: 2
            },
            // Z38: ignore
            Z39: {
                target: 'CUST_CATERGORY_CODE2',
                vc: 2
            }, // non-YY VC2
            Z40: {
                target: 'YY6_SC_LINE_ITEM_NUMBER',
                vc: 1
            }, // VC1
            // Z41: ignore
            Z42: {
                target: 'ACCELERATED_FEE_DISC_VEN',
                vc: 2
            }, // non-YY VC2
            Z43: {
                target: 'YY3_ACA_HRS_PRICE',
                vc: 1
            }, // VC1
            Z44: {
                target: 'YY118_MARK_UP_RG',
                vc: 1
            },
            Z45: {
                target: 'YY119_MARK_UP_OT',
                vc: 1
            },
            Z46: {
                target: 'YY120_MARK_UP_DB',
                vc: 1
            },
            Z30: {
                target: 'SUPPLIER_INVOICE_NUMBER',
                vc: 2
            }, // SUPPLIER'S INVOICE (SUBCON SCENARIO)
            Z36: {
                target: 'YY232_CUST_SVC_DATE',
                vc: 2
            },
            Z38: {
                target: 'CUST_COMMODITY_CODE2',
                vc: 2
            },
        });

        // ---- Validation sets (same schema as Interface T) ----
        const DECIMAL_VC1 = new Set([
            'YY3_ACA_HRS_PRICE', 'YY12_DAY1_SHIFT1_RG', 'YY13_DAY1_SHIFT1_OT', 'YY14_DAY1_SHIFT1_DB',
            'YY15_DAY1_SHIFT2_RG', 'YY16_DAY1_SHIFT2_OT', 'YY17_DAY1_SHIFT2_DB', 'YY18_DAY1_SHIFT3_RG',
            'YY19_DAY1_SHIFT3_OT', 'YY20_DAY1_SHIFT3_DB', 'YY100_SHIFT1_TOTAL_HRS_RG', 'YY101_SHIFT1_TOTAL_HRS_OT',
            'YY102_SHIFT1_TOTAL_HRS_DB', 'YY103_SHIFT2_TOTAL_HRS_RG', 'YY104_SHIFT2_TOTAL_HRS_OT',
            'YY105_SHIFT2_TOTAL_HRS_DB', 'YY106_SHIFT3_TOTAL_HRS_RG', 'YY107_SHIFT3_TOTAL_HRS_OT',
            'YY108_SHIFT3_TOTAL_HRS_DB', 'YY109_SHIFT1_PRICE_RG', 'YY110_SHIFT1_PRICE_OT', 'YY111_SHIFT1_PRICE_DB',
            'YY112_SHIFT2_PRICE_RG', 'YY113_SHIFT2_PRICE_OT', 'YY114_SHIFT2_PRICE_DB', 'YY115_SHIFT3_PRICE_RG',
            'YY116_SHIFT3_PRICE_OT', 'YY117_SHIFT3_PRICE_DB', 'YY118_MARK_UP_RG', 'YY119_MARK_UP_OT',
            'YY120_MARK_UP_DB', 'YY121_SHIFT1_TOTAL_PRICE_RG', 'YY122_SHIFT1_TOTAL_PRICE_OT',
            'YY123_SHIFT1_TOTAL_PRICE_DB', 'YY124_SHIFT2_TOTAL_PRICE_RG', 'YY125_SHIFT2_TOTAL_PRICE_OT',
            'YY126_SHIFT2_TOTAL_PRICE_DB', 'YY127_SHIFT3_TOTAL_PAY_RG', 'YY128_SHIFT3_TOTAL_PAY_OT',
            'YY129_SHIFT3_TOTAL_PAY_DB',
        ]);
        const DATE_VC1 = new Set(['YY8_WEEK_ENDING2']);

        const DECIMAL_VC2 = new Set([
            'YY134_DAILY_PAY_VENDOR', 'YY142_SALARY_PAY_VENDOR', 'YY144_WEEKLY_CLOCK_FEE',
            'YY150_DAILY_PAY_DAYS', 'YY151_DAILY_PRICE', 'YY152_DAILY_TOTAL_RATE', 'YY203_SALARY',
            'YY251_SHIFT1_PAY_RATE_RG', 'YY252_SHIFT1_PAY_RATE_OT', 'YY253_SHIFT1_PAY_RATE_DB',
            'YY254_SHIFT2_PAY_RATE_RG', 'YY255_SHIFT2_PAY_RATE_OT', 'YY256_SHIFT2_PAY_RATE_DB',
            'YY257_SHIFT3_PAY_RATE_RG', 'YY258_SHIFT3_PAY_RATE_OT', 'YY259_SHIFT3_PAY_RATE_DB',
            'YY260_SHIFT1_TOTAL_PAY_RG', 'YY261_SHIFT1_TOTAL_PAY_OT', 'YY262_SHIFT1_TOTAL_PAY_DB',
            'YY263_SHIFT2_TOTAL_PAY_RG', 'YY264_SHIFT2_TOTAL_PAY_OT', 'YY265_SHIFT2_TOTAL_PAY_DB',
            'YY266_SHIFT3_TOTAL_PAY_RG', 'YY267_SHIFT3_TOTAL_PAY_OT', 'YY268_SHIFT3_TOTAL_PAY_DB',
        ]);
        const DATE_VC2 = new Set(['YY241_CUST_BGRD_CHECK_DATE', 'YY232_CUST_SVC_DATE']);

        // ---- Helpers (exactly as T) ----
        const toEmployeeType = (subgrp) => {
            const s = String(subgrp || '').toUpperCase();
            if (s.includes('SAL')) return mEmployeeType.Salary;
            if (s.includes('DAY')) return mEmployeeType.Daily;
            return mEmployeeType.Hourly;
        };

        const fmtDecimal = (v) => {
            if (v === null || v === undefined || v === '') return '0.00';
            const n = Number(v);
            return Number.isFinite(n) ? n.toFixed(2) : null; // null → invalid
        };

        const fmtDateISO = (v) => {
            if (!v) return null;
            const m = moment(v, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD', 'MM/DD/YYYY', 'DD/MM/YYYY'], true);
            return m.isValid() ? m.format('YYYY-MM-DD') : null;
        };

        const validateFormats = (obj, decSet, dateSet, which, recID, errs) => {
            for (const [k, v] of Object.entries(obj)) {
                if (decSet.has(k)) {
                    if (!(v === null || v === '' || Number.isFinite(Number(v)))) {
                        const msg = `${which}: ${k} must be decimal (got '${v}')`;
                        LOG.info(`[VC] ${msg} recID=${recID}`);
                        errs.push({
                            record_ID: recID,
                            message: msg
                        });
                    }
                }
                if (dateSet.has(k)) {
                    if (!(v === null || moment(v, 'YYYY-MM-DD', true).isValid())) {
                        const msg = `${which}: ${k} invalid date (got '${v}')`;
                        LOG.info(`[VC] ${msg} recID=${recID}`);
                        errs.push({
                            record_ID: recID,
                            message: msg
                        });
                    }
                }
            }
        };

        LOG.info(`[VC] Mapping records to payloads…`);

        const prepared = records
            .filter((r) => !aFailedRecordIDs.includes(r.ID))
            .map((record) => {
                const oMapEntry = mPayloadMap.get(record.ID);
                if (!(oMapEntry && oMapEntry.salesOrder)) return null;

                // Employee type + shift (T logic)
                const employeeType = toEmployeeType(record.employeeSubgroup);
                const shift = employeeType === mEmployeeType.Hourly ? 1 : 0.0;

                // Collect Z fields and route to VC1/VC2 with normalization
                const cf = mCustomerFieldNameValue.get(record.ID) || [];
                const VC1Fields = {};
                const VC2Fields = {};
                for (const entry of cf) {
                    const zcode = (entry.customerFieldName || '').trim();
                    const cfg = Z_MAP[zcode];
                    if (!cfg || !cfg.target) continue;
                    const key = cfg.target;
                    let value = entry.customerFieldValue;

                    if (DATE_VC2.has(key)) value = fmtDateISO(value);
                    if (DECIMAL_VC2.has(key)) value = fmtDecimal(value);

                    if (cfg.vc === 1) VC1Fields[key] = value;
                    else VC2Fields[key] = value;
                }

                // VC1 payload (kept your keys; normalized numbers/dates)
                const salesVC1 = {
                    SalesOrderNumber: String(oMapEntry.salesOrder),
                    SalesOrderItemNum: '10',
                    YY8_WEEK_ENDING2: fmtDateISO(record.beginDate),
                    YY12_DAY1_SHIFT1_RG: shift,
                    YY13_DAY1_SHIFT1_OT: shift,
                    YY14_DAY1_SHIFT1_DB: shift,
                    YY15_DAY1_SHIFT2_RG: shift,
                    YY16_DAY1_SHIFT2_OT: shift,
                    YY17_DAY1_SHIFT2_DB: shift,
                    YY18_DAY1_SHIFT3_RG: shift,
                    YY19_DAY1_SHIFT3_OT: shift,
                    YY20_DAY1_SHIFT3_DB: shift,
                    YY100_SHIFT1_TOTAL_HRS_RG: shift,
                    YY101_SHIFT1_TOTAL_HRS_OT: shift,
                    YY102_SHIFT1_TOTAL_HRS_DB: shift,
                    YY103_SHIFT2_TOTAL_HRS_RG: shift,
                    YY104_SHIFT2_TOTAL_HRS_OT: shift,
                    YY105_SHIFT2_TOTAL_HRS_DB: shift,
                    YY106_SHIFT3_TOTAL_HRS_RG: shift,
                    YY107_SHIFT3_TOTAL_HRS_OT: shift,
                    YY108_SHIFT3_TOTAL_HRS_DB: shift,
                    YY109_SHIFT1_PRICE_RG: fmtDecimal(record.shiftCustomerBillRateFirst),
                    YY110_SHIFT1_PRICE_OT: fmtDecimal(record.shiftCustomerOTBillRateFirst),
                    YY111_SHIFT1_PRICE_DB: fmtDecimal(record.shiftCustomerDTBillRateFirst),
                    YY112_SHIFT2_PRICE_RG: fmtDecimal(record.shiftCustomerBillRateSecond),
                    YY113_SHIFT2_PRICE_OT: fmtDecimal(record.shiftCustomerOTBillRateSecond),
                    YY114_SHIFT2_PRICE_DB: fmtDecimal(record.shiftCustomerDTBillRateSecond),
                    YY115_SHIFT3_PRICE_RG: fmtDecimal(record.shiftCustomerBillRateThird),
                    YY116_SHIFT3_PRICE_OT: fmtDecimal(record.shiftCustomerOTBillRateThird),
                    YY117_SHIFT3_PRICE_DB: fmtDecimal(record.shiftCustomerDTBillRateThird),
                    YY121_SHIFT1_TOTAL_PRICE_RG: fmtDecimal(shift * (Number(record.shiftCustomerBillRateFirst) || 0)),
                    YY122_SHIFT1_TOTAL_PRICE_OT: fmtDecimal(shift * (Number(record.shiftCustomerOTBillRateFirst) || 0)),
                    YY123_SHIFT1_TOTAL_PRICE_DB: fmtDecimal(shift * (Number(record.shiftCustomerDTBillRateFirst) || 0)),
                    YY124_SHIFT2_TOTAL_PRICE_RG: fmtDecimal(shift * (Number(record.shiftCustomerBillRateSecond) || 0)),
                    YY125_SHIFT2_TOTAL_PRICE_OT: fmtDecimal(shift * (Number(record.shiftCustomerOTBillRateSecond) || 0)),
                    YY126_SHIFT2_TOTAL_PRICE_DB: fmtDecimal(shift * (Number(record.shiftCustomerDTBillRateSecond) || 0)),
                    YY127_SHIFT3_TOTAL_PAY_RG: fmtDecimal(shift * (Number(record.shiftCustomerBillRateThird) || 0)),
                    YY128_SHIFT3_TOTAL_PAY_OT: fmtDecimal(shift * (Number(record.shiftCustomerOTBillRateThird) || 0)),
                    YY129_SHIFT3_TOTAL_PAY_DB: fmtDecimal(shift * (Number(record.shiftCustomerDTBillRateThird) || 0)),
                    ...VC1Fields,
                };

                // VC2 base (your mapping) → then Z overrides
                const baseVC2 = {
                    Sales_Order_Number: String(oMapEntry.salesOrder),
                    Sales_Order_Item_Num: '10',
                    YY135_DAILY_TOTAL_VENDOR: fmtDecimal(0),
                    YY137_HOLIDAY_TOTAL_VENDOR: fmtDecimal(0),
                    YY247_ZSD_WN_WORK_ORDER_VCSD: record.workOrderWN,
                    YY251_SHIFT1_PAY_RATE_RG: fmtDecimal(record.shiftVendorPayRateFirst),
                    YY252_SHIFT1_PAY_RATE_OT: fmtDecimal(record.shiftVendorOTPayRateFirst),
                    YY253_SHIFT1_PAY_RATE_DB: fmtDecimal(record.shiftVendorDTPayRateFirst),
                    YY254_SHIFT2_PAY_RATE_RG: fmtDecimal(record.shiftVendorPayRateSecond),
                    YY255_SHIFT2_PAY_RATE_OT: fmtDecimal(record.shiftVendorOTPayRateSecond),
                    YY256_SHIFT2_PAY_RATE_DB: fmtDecimal(record.shiftVendorDTPayRateSecond),
                    YY257_SHIFT3_PAY_RATE_RG: fmtDecimal(record.shiftVendorPayRateThird),
                    YY258_SHIFT3_PAY_RATE_OT: fmtDecimal(record.shiftVendorOTPayRateThird),
                    YY259_SHIFT3_PAY_RATE_DB: fmtDecimal(record.shiftVendorDTPayRateThird),
                    YY260_SHIFT1_TOTAL_PAY_RG: fmtDecimal(record.shiftVendorPayRateFirst),
                    YY261_SHIFT1_TOTAL_PAY_OT: fmtDecimal(record.shiftVendorOTPayRateFirst),
                    YY262_SHIFT1_TOTAL_PAY_DB: fmtDecimal(record.shiftVendorDTPayRateFirst),
                    YY263_SHIFT2_TOTAL_PAY_RG: fmtDecimal(record.shiftVendorPayRateSecond),
                    YY264_SHIFT2_TOTAL_PAY_OT: fmtDecimal(record.shiftVendorOTPayRateSecond),
                    YY265_SHIFT2_TOTAL_PAY_DB: fmtDecimal(record.shiftVendorDTPayRateSecond),
                    YY266_SHIFT3_TOTAL_PAY_RG: fmtDecimal(record.shiftVendorPayRateThird),
                    YY267_SHIFT3_TOTAL_PAY_OT: fmtDecimal(record.shiftVendorOTPayRateThird),
                    YY268_SHIFT3_TOTAL_PAY_DB: fmtDecimal(record.shiftVendorDTPayRateThird),

                    // Common VC2 business attributes (kept)
                    YY216_CUST_BUSINESS_UNIT: record.custBusUnitName,
                    YY217_CUST_CHARGE_NUMBER: record.custChrgNo,
                    YY218_CUST_PROJECT_NUMBER: record.projectNo,
                    YY219_CUST_COST_CENTER: record.custCostCtr,
                    YY220_CUST_COMPANY_CODE: record.custCompCode,
                    YY221_CUST_DEPT_NUMBER: record.custDepNo,
                    YY222_CUST_DOTS_NUMBER: record.custDOTSNo,
                    YY223_CUST_RUI: record.custRUI,
                    YY224_CUST_ACCT_NUMBER: record.custAccNo,
                    YY225_CUST_BUDGET_CENTER: record.custBudCtr,
                    YY226_CUST_CON_NUMBER: record.custConNo,
                    YY227_CUST_VENDOR_NUMBER: record.sgVendNoAtCust,
                    YY228_CUST_ORG_CODE: record.custOrgName,
                    YY229_CUST_LEGAL_ENTITY: record.custLegEnt,
                    YY230_CUST_ORACLE_NUMBER: record.custOrcNo,
                    YY231_CUST_UNIT_STORE_NUMBER: record.custUtStrNo,
                    YY232_CUST_SVC_DATE: fmtDateISO(record.svcDatFrom),
                    YY233_CUST_EMPLOYEE_NUMBER: record.custEmpNo,
                    YY234_CUST_AGREE_NUMBER: record.custAgrName,
                    YY235_CUST_TASK15: record.taskNo,
                    YY236_CUST_FEPS_CODE: record.custFEPSCode,
                    YY238_CUST_GL_CODE: record.custGLCode,
                    YY239_CUST_PURCHASE_AGREE: record.purchaseAgreement,
                    YY240_CUST_BB_NUMBER: record.bbNo,
                    YY241_CUST_BGRD_CHECK_DATE: fmtDateISO(record.custBgChkDate),
                    YY242_CUST_DIV_UNIT_NUMBER: record.custDivUnit,
                    YY243_CUST_POSITION_CODE: record.custPosCode,

                    // Weekly Clock Fee base (Z08 can override)
                    YY144_WEEKLY_CLOCK_FEE: fmtDecimal(record.custWkTimeFee),

                    // Keep these compatible even if unused here
                    YY134_DAILY_PAY_VENDOR: fmtDecimal(0),
                    YY142_SALARY_PAY_VENDOR: fmtDecimal(0),
                    YY150_DAILY_PAY_DAYS: fmtDecimal(0),
                    YY151_DAILY_PRICE: fmtDecimal(0),
                    YY152_DAILY_TOTAL_RATE: fmtDecimal(0),
                    YY203_SALARY: fmtDecimal(0),

                    // Non-YY from Z-map (left undefined unless provided)
                    ACCELERATED_FEE_DISC_VEN: undefined,
                    CUST_CATERGORY_CODE2: undefined,
                };

                // Apply Z overrides (incl. Z08 → YY144_WEEKLY_CLOCK_FEE)
                const salesVC2 = {
                    ...baseVC2,
                    ...VC2Fields
                };

                // Validate formats; collect errors but don't hard-stop
                const localErrs = [];
                validateFormats(salesVC1, DECIMAL_VC1, DATE_VC1, 'VC1', record.ID, localErrs);
                validateFormats(salesVC2, DECIMAL_VC2, DATE_VC2, 'VC2', record.ID, localErrs);
                if (localErrs.length) {
                    localErrs.forEach((err) => {
          err.process_code = sProcessCode;
        });
                    aErrorLogs.push(...localErrs);
                    aFailedRecordIDs.push(record.ID);
                    const idx = aPassedRecordIDs.indexOf(record.ID);
                    if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
                    LOG.info(`[VC] Validation failed; skipping inserts recID=${record.ID}`);
                    return null;
                }

                // Debug echo (kept)
                try {
                    LOG.info(
                        `[VC] Constructed payloads for record ${record.ID}`, {
                            recID: record.ID,
                            salesOrder: String(oMapEntry.salesOrder),
                            vc1Payload: JSON.stringify(salesVC1, null, 2),
                            vc2Payload: JSON.stringify(salesVC2, null, 2)
                        }
                    );
                } catch (e) {}

                return {
                    salesVC1,
                    salesVC2,
                    recID: record.ID,
                    vcData1UUID: record.vcData1UUID,
                    vcData2UUID: record.vcData2UUID,
                };
            })
            .filter(Boolean);

        // Insert loop (no hard stop; mirrors Interface T)
        for (const row of prepared) {
            const {
                salesVC1,
                salesVC2,
                recID
            } = row;
            let insertedSalesVCData1, insertedSalesVCData2;

            // pre-insert log (kept)
            try {
                LOG.info(
                    `[VC] PRE-INSERT for record ${recID}`, {
                        recID,
                        hasVC1Already: !!row.vcData1UUID,
                        hasVC2Already: !!row.vcData2UUID,
                        vc1Payload: JSON.stringify(salesVC1, null, 2),
                        vc2Payload: JSON.stringify(salesVC2, null, 2)
                    }
                );
            } catch (e) {}

            // VC1
            try {
                if (!row.vcData1UUID) {
                    insertedSalesVCData1 = await SalesVCData_1.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_1').entries(salesVC1),
                    );
                } else {
                    LOG.info(`[VC] Skipping VC1 insert (UUID exists) recID=${recID}`);
                }
            } catch (e) {
                LOG.info(`[VC] VC1 INSERT exception recID=${recID}: ${e?.message}`);
                aErrorLogs.push({
                    record_ID: recID,
                    message: e?.message || 'VC1 INSERT exception' ,process_code: sProcessCode
                });
                aFailedRecordIDs.push(recID);
                const idx = aPassedRecordIDs.indexOf(recID);
                if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
                continue;
            }
            if (insertedSalesVCData1?.message) {
                aErrorLogs.push({
                    record_ID: recID,
                    message: insertedSalesVCData1.message,process_code: sProcessCode
                });
                aFailedRecordIDs.push(recID);
                const idx = aPassedRecordIDs.indexOf(recID);
                if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
                continue;
            }

            // VC2
            try {
                if (!row.vcData2UUID) {
                    insertedSalesVCData2 = await SalesVCData_2.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_2').entries(salesVC2),
                    );
                } else {
                    LOG.info(`[VC] Skipping VC2 insert (UUID exists) recID=${recID}`);
                }
            } catch (e) {
                LOG.info(`[VC] VC2 INSERT exception recID=${recID}: ${e?.message}`);
                aErrorLogs.push({
                    record_ID: recID,
                    message: e?.message || 'VC2 INSERT exception',process_code: sProcessCode
                });
                aFailedRecordIDs.push(recID);
                const idx = aPassedRecordIDs.indexOf(recID);
                if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
                continue;
            }
            if (insertedSalesVCData2?.message) {
                aErrorLogs.push({
                    record_ID: recID,
                    message: insertedSalesVCData2.message,process_code: sProcessCode
                });
                aFailedRecordIDs.push(recID);
                const idx = aPassedRecordIDs.indexOf(recID);
                if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
                continue;
            }

            // Map UUIDs back (kept)
            const oMapEntry = mPayloadMap.get(recID) || {};
            if (insertedSalesVCData1?.SAP_UUID || row.vcData1UUID) {
                oMapEntry.vcData1UUID = insertedSalesVCData1?.SAP_UUID ?? row.vcData1UUID;
            }
            if (insertedSalesVCData2?.SAP_UUID || row.vcData2UUID) {
                oMapEntry.vcData2UUID = insertedSalesVCData2?.SAP_UUID ?? row.vcData2UUID;
            }
            mPayloadMap.set(recID, oMapEntry);

            // post-insert log (kept)
            try {
                LOG.info(
                    `[VC] POST-INSERT result for record ${recID}`, {
                        recID,
                        vc1Result: JSON.stringify(insertedSalesVCData1 || {}, null, 2),
                        vc2Result: JSON.stringify(insertedSalesVCData2 || {}, null, 2)
                    }
                );
            } catch (e) {}
        }
    }

    async processOrderPartners(sProcessCode, bBreakExecution) {
        const aRecordsForProcessing = [],
            aSkippedRecords = [],
            aErrorLogs = [],
            mPayloadIndices = new Map();
        let aDeletePayloads = [],
            aFailedRecordIDs = [],
            aPassedRecordIDs = [],
            aDeleteResponse = [],
            aRecordIDs = [];

        this.records.forEach((oRecord) => {
            if (this.shouldRecordProcess(oRecord, sProcessCode) && oRecord.salesDocumentNoSAP) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({
                    ...oRecord
                });
                aRecordIDs.push(oRecord.ID);
            } else {
                aSkippedRecords.push({
                    ...oRecord
                });
            }
        });

        await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);

        this.updateProcessingState(sProcessCode);
        if (!aRecordsForProcessing.length) {
            // If Step doesn't need to be processed, simply return to avoid costly calls
            return {
                hasError: false,
                continue: true,
            };
        }

        aRecordsForProcessing.forEach((record) => {
            if (record.partnerFunctionSAP === 'ZR') {
                aDeletePayloads.push({
                    SalesOrder: record.salesDocumentNoSAP,
                    PartnerFunction: 'ZV',
                });
                mPayloadIndices.set(aDeletePayloads.length - 1, record.ID);
            } else if (record.partnerFunctionSAP === 'ZV') {
                aDeletePayloads.push({
                    SalesOrder: record.salesDocumentNoSAP,
                    PartnerFunction: 'ZR',
                });
                mPayloadIndices.set(aDeletePayloads.length - 1, record.ID);
            }
        });
        try {
            if (aDeletePayloads.length) {
                aDeleteResponse = await this.salesOrderAPI.deleteSalesOrderPartners(aDeletePayloads);
                aDeleteResponse.forEach((oResult, iPayloadIndex) => {
                    const sRecordID = mPayloadIndices.get(iPayloadIndex); // CHECK: Determine via. payload index
                    if (!oResult.hasError) {
                        aPassedRecordIDs.push(sRecordID);
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
                                message: cds.i18n.messages.at('ERR_SALES_ORDER_PARTNER_DELETION_FAILED', [
                                    oResult.reason,
                                ]),process_code: sProcessCode
                            });
                        }
                    }
                });
                aFailedRecordIDs = [...new Set(aFailedRecordIDs)];
                aPassedRecordIDs = [...new Set(aPassedRecordIDs)];
                aFailedRecordIDs.forEach((recordID) => {
                    if (aPassedRecordIDs.includes(recordID)) {
                        aPassedRecordIDs.splice(aPassedRecordIDs.indexOf(recordID), 1);
                    }
                });
            }
            if (aPassedRecordIDs.length) {
                await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
            }
            if (aFailedRecordIDs.length) {
                await Promise.allSettled([
                    this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
                    ProcessLogger.addLogs(aErrorLogs),
                ]);
            }
            // Update exclusion set
            this.updateExclusionSet({
                passed: aPassedRecordIDs,
                failed: aFailedRecordIDs,
                skipped: aSkippedRecords,
                bBreakExecution,
            });
            // Step response for Processing framework
            return {
                hasError: aFailedRecordIDs.length > 0,
                continue: aFailedRecordIDs.length === 0,
            };
        } catch (err) {
            this.LOG._error && this.LOG.error(err.message);
        }
    }

    async updateInfotype(sProcessCode, bBreakExecution) {
        const aRecordsForProcessing = [];
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        // Clear the error logs for the selected records
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                aRecordsForProcessing.push({
                    ...record
                });
            } else {
                aSkippedRecords.push({
                    ...record
                });
                continue;
            }
        }

        this.updateProcessingState(sProcessCode);
        if (!aRecordsForProcessing.length) {
            return {
                hasError: false,
                continue: true,
            };
        }

        // Process each record
        for (const record of aRecordsForProcessing) {
            try {
                // Get position ID based on company code
                let positionId = '0';
                const companyCodeMap = {
                    '1000': '88881000',
                    '1100': '88881100',
                    '1200': '88881200',
                    '1300': '88881300',
                    '1400': '88881400',
                    '1500': '88881500',
                    '2200': '88882200',
                    '2100': '88882100',
                    '2500': '88882500',
                    '5200': '88885200'
                };
                positionId = companyCodeMap[record.companyCode] || '0';

                // Get personnel sub area based on company code
                let personnelSubArea = '';
                const personnelAreaMap = {
                    '1000': '9000',
                    '1100': '9100',
                    '1200': '9200',
                    '1300': '9300',
                    '1400': '9400',
                    '1500': '9500',
                    '2200': '9700',
                    '2100': '9600',
                    '2500': '9800',
                    '5200': '9900'
                };
                personnelSubArea = personnelAreaMap[record.companyCode] || '';

                // Determine ZPAYROLL value
                let zPayroll = 'NONPAYROLL';
                if (['CP', 'BP', 'DP'].includes(record.salesDocumentType)) {
                    zPayroll = 'PAYROLL';
                } else if (record.payroll === 'CR') {
                    zPayroll = 'RECRUITED';
                }

                // Determine T_REASON based on country and existing records
                let tReason = '';
                const existingRecords = await this.empCustInfoAPI.executeQuery(
                    SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO').where({
                        SSN: record?.ssn || '',
                        FirstName: record?.firstName || '',
                        Name: record?.lastName || '',
                        MiddleName: record?.middleName || ''
                    }));

                if (existingRecords && existingRecords.length > 0) {
                    // Rehire
                    tReason = record.country_code === 'USA' ? 'U2' : 'C2';
                } else {
                    // Hire
                    tReason = record.country_code === 'USA' ? 'U4' : 'C3';
                }

                // Prepare payload for YY1_EMPLOYEE_CUSTOMER_INFO
                const payload = {
                    WORKER_ID: record.personnelNoSAP,
                    Name: record.lastName,
                    FirstName: record.firstName,
                    MiddleName: record.middleName,
                    WorkScheduleRule: '',
                    WorkScheduleType: '',
                    EmployeePersonnelArea: personnelSubArea,
                    EmploymentType: record.salesDocumentType,
                    SSN: record.ssn,
                    EMP_GRP: 'N',
                    EMP_SUBGRP: '11',
                    START_DATE: moment(record.beginDate).format('YYYY-MM-DD'),
                    END_DATE: moment(record.endDate).format('YYYY-MM-DD'),
                    CONTRAT_SAP: record.contractNo,
                    SALES_ORD_SAP: record.salesDocumentNoSAP,
                    PROJECT_ID: record.projectNumberSAP,
                    PROJECT_NAME: `${record.soldToParty}-${record.personnelNoSAP}`,
                    CUSTOMER_ID: record.billToParty,
                    SS_ORDER: record.workOrderWN,
                    WN_ORDER: record.workOrderWN,
                    POSITION_ID: positionId,
                    JOB_ID: null,
                    ZPAYROLL: zPayroll,
                    RECRID: null,
                    ZTIME_IND: null,
                    ZHIRE_ACTION: null,
                    ACTION_TYPE: record.actionType,
                    T_REASON: tReason,
                    ZHRREPT: '',
                    CreatedOn: moment().format('YYYY-MM-DD')
                };

                // Update YY1_EMPLOYEE_CUSTOMER_INFO
                await this.empCustInfoAPI.executeQuery(
                    INSERT.into('YY1_EMPLOYEE_CUSTOMER_INFO').entries(payload),
                );
                aPassedRecordIDs.push(record.ID);
            } catch (error) {
                this.LOG._error && this.LOG.error(`Error processing record ${record.ID}:`, error);
                aErrorLogs.push({
                    record_ID: record.ID,
                    error: error.message || 'Unknown error occurred', process_code: sProcessCode
                });
                aFailedRecordIDs.push(record.ID);
            }
        }

        // Log results
        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(WorkOrders_WN)
                .set({
                    valid: false,
                    processLevel_code: sProcessCode
                })
                .where({
                    ID: {
                        in: aFailedRecordIDs
                    }
                });
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
            continue: !bBreakExecution || aFailedRecordIDs.length === 0,
        };
    }

    async processHrCostDistObj(sProcessCode, bBreakExecution) {
        this.LOG._info && this.LOG.info('Logging _processHrCostDistObj');

        let aRecordsForProcessing = [],
            aSkippedRecords = [],
            aErrorLogs = [],
            aPassedRecordIDs = [],
            aFailedRecordIDs = [],
            aRecordIDs = [];

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                aRecordsForProcessing.push({
                    ...record
                });
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({
                    ...record
                });
                continue;
            }
        }

        await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);

        this.updateProcessingState(sProcessCode);
        if (!aRecordsForProcessing.length) {
            return {
                hasError: false,
                continue: true,
            };
        }

        let aHRPayloads = aRecordsForProcessing.map(record => ({
            WorkerID: record.personnelNoSAP,
            StartDate: moment(record.beginDate).format('YYYY-MM-DD'),
            // EndDate: moment(record.beginDate).add(10, 'years').format('YYYY-MM-DD'),
            EndDate: '9999-12-31',
            CompanyCode1: record.companyCode,
            CompanyCode1_Text: record.companyCodeDescription || '',
            Project1: record.projectNumberSAP,
            Percentage1: '100.00'
        }));

        for (let i = 0; i < aHRPayloads.length; i++) {
            let HRCostObj = await this.HrCostDistObjAPI.executeQuery(
                INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(aHRPayloads[i])
            );
            if (HRCostObj && !HRCostObj.error) {
                await UPDATE(WorkOrders)
                    .set({
                        valid: true,
                        processLevel_code: sProcessCode,
                    })
                    .where({
                        ID: aRecordsForProcessing[i].ID
                    });
                aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
            } else {
                aErrorLogs.push({
                    record_ID: aRecordsForProcessing[i].ID,
                    message: HRCostObj ? HRCostObj.message : 'Unknown error',process_code: sProcessCode
                });
                aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                LOG.error(
                    `Error processing record ID ${aRecordsForProcessing[i].ID}: ${HRCostObj ? HRCostObj.message : 'Unknown error'}`,
                );
            }
        }

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(WorkOrders)
                .set({
                    valid: false,
                    processLevel_code: sProcessCode
                })
                .where({
                    ID: {
                        in: aFailedRecordIDs
                    }
                });
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
}

module.exports = WorkOrdersVN;