// Interface E
const cds = require('@sap/cds');
const moment = require('moment');
const LOG = cds.log('Monitor.Procesor-SOWscWO');
const Processor = require('./BaseProcessor');
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
const BillingTypeComm = require('../communicators/BillingType');

// Utility & Common functions
const { toEmployeeType } = require('../common/utils');
const { UPDATE, SELECT } = require('@sap/cds/lib/ql/cds-ql');
const { or } = require('@sap-cloud-sdk/odata-v2');

// List of required entities
const {
    SowScWo,
    FieldValidations,
    FGdefaultEmp,
    FieldValidations: {
        elements: {
            validation: { enum: mFieldValidationTypeEnum },
        },
    },
} = cds.entities('com.aleron.monitor');

class SOWscWO extends Processor {
    constructor(options) {
        super(options);
        // Processor Specific configuration
        this.recordsEntity = 'com.aleron.monitor.SowScWo';
        this.LOG = cds.log('Monitor.Processor-SOWscWO');
        this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

        // Communicators used by WorkOrdersWN Processor
        this.salesContractAPI = null;
        this.businesPartnerAPI = null;
        this.countryRegionAPI = null;
        this.salesOrderAPI = null;
        this.smartyAddressAPI = null;
        this.enterpriseProjectAPI = null;
        this.empCustInfoAPI = null;
        this.productAPI = null;
        this.workforceAPI = null;
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
        this.billingTypeAPI = new BillingTypeComm();
    }

    _getColumnsForFetch(sEntity) {
        const mEntityColumns = {
            'com.aleron.monitor.SowScWo': [
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
                    'companyCode',
                    'contractNo',
                    'soldToParty',
                    'billToParty',
                    'workOrderWN',
                    'salesOffice',
                    'custPurOrder',
                    'beginDate',
                    'endDate',
                    'currency',
                    'materialNo',
                    'workLocation',
                    'poDesc',
                    'remitToVendor',
                    'custPurOrderTotal',
                    'attentionLine',
                    'distributionEmail',
                    'distributionChannelSAP',
                    'projectNumberSAP',
                    'salesDocumentNoSAP',
                    'vcData1UUID',
                    'vcData2UUID',
                    'projectUUID'
                ], // Extra field
                ...[
                    'doorNo',
                    'street',
                    'city',
                    'region',
                    'country_code',
                    'postalCode',
                ], // address columns
            ],
        };

        return [...new Set(mEntityColumns[sEntity])];
    }

    // Step 1 Validation of Recrods
    async validateRecords(sProcessCode, bBreakExecution) {
        const aRecordsForProcessing = [];
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];
        let aSalesContracts = [];

        // Clear the error logs for the selected records; so that new process can start
        await ProcessLogger.removeLogs([...this.recordIDs]);

        let aSalesContractIDs = [];
        let aZipCodesToCheck = [];
        let aWorkOrderWNs = [];
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

            if (record.postalCode) {
                aZipCodesToCheck.push({
                    zipcode: String(record.postalCode),
                    record_ID: record.ID,
                });
            }

            if (record.workOrderWN) {
                aWorkOrderWNs.push(record.workOrderWN)
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

        aSalesContractIDs = [...new Set(aSalesContractIDs)];

        const [
            { reason: anySalesContractPrimaryErr, value: aSalesContractPrimaryResults },
            { reason: anySalesContractFallbackErr, value: aSalesContractFallbackResults },
            { reason: anyFieldValidationErr, value: aFieldValidations },
            { reason: anyZipCodeErr, value: aZipCodeValidations },
            { reason: anyDefEmpErr, value: aDefEmps },
            { reason: anySalesOrderErr, value: aSalesOrders },
        ] = await Promise.allSettled([
            // Sales Contract Information
            // this.salesContractAPI.executeQuery(
            //     SELECT.from('SalesContract')
            //         .columns(['SalesContract', 'SalesOrganization', 'DistributionChannel', 'SoldToParty', 'SalesContractType'])
            //         .where({ SalesContract: { in: aSalesContractIDs } }),
            // ),
            // Primary query using SalesContract field
            this.salesContractAPI.executeQuery(
                SELECT.from('SalesContract')
                    .columns(['SalesContract', 'SalesOrganization', 'DistributionChannel', 'SoldToParty', 'SalesContractType', 'PurchaseOrderByCustomer'])
                    .where({ SalesContract: { in: aSalesContractIDs } }),
            ),
            // Fallback query using PurchaseOrderByCustomer field
            this.salesContractAPI.executeQuery(
                SELECT.from('SalesContract')
                    .columns(['SalesContract', 'SalesOrganization', 'DistributionChannel', 'SoldToParty', 'SalesContractType', 'PurchaseOrderByCustomer'])
                    .where({ PurchaseOrderByCustomer: { in: aSalesContractIDs } }),
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

            // ZipCode Validation
            this.smartyAddressAPI.checkZipCodes(aZipCodesToCheck),

            // Default Employee
            SELECT.from(FGdefaultEmp)
                .columns(['employee']),

            this.salesOrderAPI.executeQuery(
                SELECT.from('A_SalesOrder')
                    .columns(['SalesOrder', 'YY1_AlphanumericSalesO_SDH'])
                    .where({ YY1_AlphanumericSalesO_SDH: { in: aWorkOrderWNs } })
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
        if (anySalesContractPrimaryErr) {
            LOG._error && LOG.error(anySalesContractPrimaryErr.message);
        }
        if (anySalesContractFallbackErr) {
            LOG._error && LOG.error(anySalesContractFallbackErr.message);
        }

        if (anyFieldValidationErr) {
            LOG._error && LOG.error(anyFieldValidationErr.message);
        }

        if (anyZipCodeErr) {
            LOG._error && LOG.error(anyZipCodeErr.message);
        }

        if (anyDefEmpErr) {
            LOG._error && LOG.error(anyDefEmpErr.message);
        }

        if (anySalesOrderErr) {
            LOG._error && LOG.error(anySalesOrderErr.message);
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
                oFieldValidationRes.errors.forEach((error) => {
                    error.process_code = sProcessCode;
                });
                aErrorLogs.push(...oFieldValidationRes.errors);
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }

            // Check sales contract
            const oSalesContractRes = await this._validateSalesContract(oRecord, aSalesContracts, mDistChannelMap);
            if (oSalesContractRes.hasError) {
                oSalesContractRes.errors.forEach((error) => {
                    error.process_code = sProcessCode;
                });
                aErrorLogs.push(...oSalesContractRes.errors);
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            } else {
                // Always use the resolved contract value for further processing
                oRecord.contractNo = oSalesContractRes.updatedContract;
            }

            // check default employee record
            if (!aDefEmps) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_DEFAULT_EMPLOYEE'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                hasRecordFailed = true;
            }

            // Check company code
            // if (!['1500', '2500'].includes(oRecord.companyCode)) {
            //     aErrorLogs.push({
            //         record_ID: oRecord.ID,
            //         message: cds.i18n.messages.at('ERR_INCORRECT_COMPANY_CODE'),
            //     });
            //     aFailedRecordIDs.push(oRecord.ID);
            //     hasRecordFailed = true;
            // }


            if (aSalesOrders?.some(item => item.YY1_AlphanumericSalesO_SDH === oRecord.workOrderWN)) {
                aErrorLogs.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_ORDER_EXIST'), process_code: sProcessCode
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
        // if (aErrorLogs.length) {
        //     try {
        //         await Promise.allSettled([
        //             ProcessLogger.addLogs(aErrorLogs),
        //             this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
        //         ]);
        //         this.LOG._info &&
        //             this.LOG.info(
        //                 cds.i18n.messages.at('INFO_RECORDS_UPDATED', [
        //                     sProcessCode,
        //                     aErrorLogs.map((log) => log.record_ID).join(','),
        //                 ]),
        //             );
        //     } catch (err) {
        //         this.LOG._error && this.LOG.error(err.message);
        //     }
        // }
        // if (aPassedRecordIDs.length) {
        //     await Promise.allSettled(
        //         aPassedRecordIDs.map(id => {
        //             const rec = this.records.find(r => r.ID === id);
        //             if (rec && rec.contractNo) {
        //                 return UPDATE(SowScWo)
        //                     .set({ contractNo: rec.contractNo })
        //                     .where({ ID: id });
        //             }
        //             return Promise.resolve();
        //         })
        //     );
        //     await Promise.allSettled([
        //         ProcessLogger.removeLogs(aPassedRecordIDs),
        //         this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
        //     ]);
        //     this.LOG._info && this.LOG.info(cds.i18n.messages.at('INFO_RECORDS_UPDATED', [sProcessCode, 'All']));
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
                        return UPDATE(SowScWo)
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
            await Promise.allSettled(
                aPassedRecordIDs.map(id => {
                    const rec = this.records.find(r => r.ID === id);
                    if (rec && rec.contractNo) {
                        return UPDATE(SowScWo)
                            .set({ contractNo: rec.contractNo })
                            .where({ ID: id });
                    }
                    return Promise.resolve();
                })
            );

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
                    return UPDATE(SowScWo)
                        .set({ valid: true, processLevel_code: recordProcessLevelCode })
                        .where({ ID: recordID });
                }),
            ]);
            this.LOG._info &&
                this.LOG.info(cds.i18n.messages.at('INFO_RECORDS_UPDATED', [sProcessCode, 'All']));
        }
        if (mDistChannelMap.size) {
            for (const [id, { distributionChannelSAP }] of mDistChannelMap.entries()) {
                // update this.records 
                const record = this.records.find(r => r.ID === id);
                record.distributionChannelSAP = distributionChannelSAP;
                // update DB
                await UPDATE(SowScWo)
                    .set({ distributionChannelSAP })
                    .where({ ID: id });
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

    // _validateSalesContract(oRecord, aSalesContracts, mDistChannelMap) {
    //     let hasError = false,
    //         aErrors = [];

    //     // Find salescontract based record;
    //     const oSalesContract = aSalesContracts.find((sc) => oRecord.contractNo === sc.SalesContract); // CHECK if padding needs to be done
    //     if (!oSalesContract) {
    //         hasError = true;
    //         aErrors.push({
    //             record_ID: oRecord.ID,
    //             message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'),
    //         });
    //     } else {
    //         if (oSalesContract.DistributionChannel !== 'SC') {
    //             hasError = true;
    //             aErrors.push({
    //                 record_ID: oRecord.ID,
    //                 message: cds.i18n.messages.at('ERR_SALES_CONTRACT_DIST'),
    //             });
    //         }

    //         mDistChannelMap.set(oRecord.ID, {
    //             distributionChannelSAP: oSalesContract.DistributionChannel
    //         });
    //     }

    //     return {
    //         hasError,
    //         errors: aErrors,
    //     };
    // }

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
                // Persist the change to the entity only if SalesContract is not null/undefined
                if (oSalesContract.PurchaseOrderByCustomer) {
                    await UPDATE('com.aleron.monitor.SowScWo')
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
            if (oSalesContract.DistributionChannel !== 'SC') {
                hasError = true;
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_CONTRACT_DIST'),
                });
            }

            mDistChannelMap.set(oRecord.ID, {
                distributionChannelSAP: oSalesContract.DistributionChannel
            });
        }

        return {
            hasError,
            errors: aErrors,
            updatedContract
        };
    }

    // Create and Update Project
    async processProject(sProcessCode, bBreakExecution) {
        LOG._info && LOG.info('Logging processProject');

        await ProcessLogger.removeLogs([...this.recordIDs]);

        const aRecordsForProcessing = [],
            aSkippedRecords = [],
            aErrorLogs = [],
            aPassedRecordIDs = [],
            aFailedRecordIDs = [];

        let aRecordIDs = [];

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
                // If record is on step level & is already valid, then skip
                aRecordsForProcessing.push({ ...record });
                aRecordIDs.push(record.ID);
            } else {
                aSkippedRecords.push({ ...record });
                continue;
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

        if (sProcessCode === '4') {
            let aPayloads = aRecordsForProcessing.map((record) => ({
                // record.distributionChannelSAP === 'IC' ? 'Z4' : 
                EnterpriseProjectType:'60',
                CompanyCode: record.companyCode,
                ProfitCenter: record.salesOffice,
                ProjectDescription: `${record.soldToParty}`,
                // ProjectDescription: `${record.soldToParty}-${record.personnelNoSAP}`,    // Employee No need to remove from Interface E
                ResponsibleCostCenter: `${record.companyCode}${record.salesOffice}`,
                ProjectStartDate: moment(record.beginDate).format('YYYY-MM-DD'),
                // ProjectEndDate: moment(record.beginDate).add(10, 'years').format('YYYY-MM-DD'),
                ProjectEndDate: '2200-12-31',
                ProjectProfileCode: 'YP05',
                EntProjIsMultiSlsOrdItmsEnbld: true,
                ProjectCurrency: record.currency_code,
                // YY1_EmployeeName_PPH: `${record.lastName} ${record.firstName}`,
                // YY1_Employee_PPH: record.personnelNoSAP,     // Employee No need to remove from Interface E
            }));

            try {
                for (let i = 0; i < aPayloads.length; i++) {
                    // Employee check we need to remove for Interface E
                    // Check for Employee Number   
                    // if (!aRecordsForProcessing[i].personnelNoSAP) {
                    //     aErrorLogs.push({
                    //         record_ID: aRecordsForProcessing[i].ID,
                    //         message: cds.i18n.messages.at('ERR_EMP_NUMBER_MISSING'),
                    //     });
                    //     aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                    //     continue; // Skip this record
                    // }

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
                        await UPDATE(SowScWo)
                            .set({
                                projectNumberSAP: insertedProject.Project,
                                projectUUID: insertedProject.ProjectUUID,
                                valid: true,
                                processLevel_code: sProcessCode,
                            })
                            .where({ ID: aRecordsForProcessing[i].ID });

                        aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
                    } else {
                        aErrorLogs.push({
                            record_ID: aRecordsForProcessing[i].ID,
                            message: `${insertedProject.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                        LOG.error(
                            `Error processing record ID ${aRecordsForProcessing[i]}: ${insertedProject.message}`,
                        );
                    }
                }
            } catch (error) {
                LOG.error(`Critical error in _processProject: ${error.message}`, { error });
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
                        message: `${updatedProject.message}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                    LOG.error(
                        `Error processing record ID ${aRecordsForProcessing[i].ID}: ${updatedProject.message}`,
                    );
                } else if (releaseProject.message) {
                    aErrorLogs.push({
                        record_ID: aRecordsForProcessing[i].ID,
                        message: `${releaseProject.message}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
                    LOG.error(
                        `Error processing record ID ${aRecordsForProcessing[i].ID}: ${releaseProject.message}`,
                    );
                } else {
                    await UPDATE(SowScWo)
                        .set({
                            valid: true,
                            processLevel_code: sProcessCode,
                        })
                        .where({ ID: aRecordsForProcessing[i].ID });

                    aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
                }
            }
        }

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(SowScWo)
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

    // Create SO of Recrods
    async processSalesOrder(sProcessCode, bBreakExecution) {
        // Clear the error logs for the selected records; so that new process can start
        await ProcessLogger.removeLogs([...this.recordIDs]);

        const aRecordsForProcessing = [],
            aErrorLogs = [],
            aFailedRecordIDs = [],
            aPassedRecordIDs = [],
            aSkippedRecords = [];

        let aSalesContractWhere = [],
            aSalesOrgWhere = [],
            aVendorRemitWhere = [],
            aSoldToPartyWhere = [],
            aTaxCodeByCountyWhere = [],
            aCustomerFieldNamesWhere = [],
            aCustomerEDIPartnerWhere = [],
            aTaxCodeByProvince = [],
            aTaxCodeByCity = [],
            aTaxCodeByCounty = [],
            aWorkforcRes = [],
            aMaterialNoWhere = [],
            aRegionWhere = [],
            aRecordIDs = [],
            // asalesDocumentTypeWhere = [],
            aAddresses = [];

        let sWhereForBusinessPartner = '',
            sWhereForBPCustomer = '',
            sTaxCodeByProvinceWhere = '',
            sTaxCodeByCountyWhere = '',
            sTaxCodeByCityWhere = '';

        let mSalesContract = new Map(), // Map for SalesContract API Response
            mPaymentTerms = new Map(), // Map for PaymentTerms Table
            mCustomerFieldNameValue = new Map(), // Map for CustomFieldsToVC Table
            mBusinessPartners = new Map(), // Map for PartnerFunction & BPCustomerNumber from BP
            mCustomerPaymentTerms = new Map(), // Map for CustomerPaymentTerm from BP
            mVendorRemits = new Map(), // Map for Vendor_VendorRemit Table
            mSupplierAccs = new Map(), // Map for Supplier from BP
            mCreatePO = new Map(), // Map for PORequiredSAP Indicator
            mBillingTypes = new Map(), // Map for Billing Types
            mProcessingRecordsToCentralMapping = new Map(),
            mBusinessPartnerWhere = new Map();

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

            if (record.contractNo) {
                aSalesContractWhere.push(record.contractNo);
                mBusinessPartnerWhere.set(record.contractNo, {
                    Customer: record.soldToParty,
                    SalesOrganization: null, // To be used after salescontract are fetched
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
                sTaxCodeByCityWhere += `or (country_code = '${record.country_code}' and city = '${record.city}' and region = '${record.region}')`;
                aTaxCodeByCountyWhere.push({
                    record_ID: record.ID,
                    country_code: record.country_code,
                    region: record.region,
                });
            }

            if (record.soldToParty) {
                aSoldToPartyWhere.push(record.soldToParty);
            }

            if (record.remitToVendor) {
                aVendorRemitWhere.push(record.remitToVendor);
                mCreatePO.set(record.ID, {
                    PORequiredSAP: "X"
                })
            }

            if (record.region) {
                aRegionWhere.push(record.region);
            }

            if (record.materialNo) {
                aMaterialNoWhere.push(record.materialNo);
            }

            // if (record.salesDocumentType) {
            //     asalesDocumentTypeWhere.push('ZW' + record.salesDocumentType);
            //   }

            ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));
        }

        sTaxCodeByProvinceWhere.length && (sTaxCodeByProvinceWhere = sTaxCodeByProvinceWhere.slice(3).trim());
        sTaxCodeByCityWhere.length && (sTaxCodeByCityWhere = sTaxCodeByCityWhere.slice(3).trim());

        await ProcessLogger.removeLogs(aRecordIDs);

        this.updateProcessingState(sProcessCode);
        if (!aRecordsForProcessing.length) {
            // If Step doesn't need to be processed, simply return to avoid costly calls
            return {
                hasError: false,
                continue: true,
            };
        }

        const defaultEmployee = await SELECT.one.from(FGdefaultEmp);

        try {
            const [
                { reason: anySalesContractErr, value: aSalesContracts },
                { reason: anyVendorRemitErr, value: aVendorRemits },
                { reason: anyPaymentTermsErr, value: aPaymentTerms },
                { reason: anyAddressErr, value: aAddressesWithCounty },
                { reason: anyTaxCodeByProvinceErr, value: aTaxCodeByProvinceResults },
                { reason: anyTaxCodeByCityErr, value: aTaxCodeByCityResults },
                { reason: anyCustomFieldsTOVCErr, value: aCustomFieldsTOVC },
                { reason: anyWorkforceErr, value: aWorkforces },
                { reason: anyBillingTypeErr, value: aBillingTypes }
            ] = await Promise.allSettled([
                this.salesContractAPI.executeQuery(this._getSalesContractQuery(aSalesContractWhere)),

                SELECT.from('com.aleron.monitor.Vendor_VendorRemit')
                    .columns(['vendor', 'vendorZR'])
                    .where({ vendor: { in: [...new Set(aVendorRemitWhere)] } }),

                SELECT.from('com.aleron.monitor.PaymentTerms')
                    .columns(['customerNo', 'supplierNo', 'customerTerm', 'vendorTerm', 'poBox'])
                    .where({
                        customerNo: { in: [...new Set(aSoldToPartyWhere)] },
                        supplierNo: { in: [...new Set(aVendorRemitWhere)] }
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
                    .where({ customValue: { in: aCustomerFieldNamesWhere } }),

                this.workforceAPI.executeQuery(
                    SELECT.from('YY1_workforce_cds')
                        .columns(['WorkforcePersonExternalID', 'PersonWorkAgreement'])
                        .where({ WorkforcePersonExternalID: defaultEmployee.employee })
                ),

                this.billingTypeAPI.executeQuery(
                    SELECT.from('YY1_BILLINGTYPE')
                        .columns(['Billing_type', 'SO_order_Type'])
                        .where({
                            SO_order_Type: { in: ['ZWCP', 'ZWBP', 'ZWDP', 'ZWMS', 'ZWSC'] }
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
            const [
                { reason: anyBusinessPartnerErr, value: aBusinessPartners },
                { reason: anyBPCustomerErr, value: aBPCustomers },
                { reason: anySupplierAccErr, value: aSupplierAccs },
                { reason: anyTaxCodeByCountyErr, value: aTaxCodeByCountyResults },
            ] = await Promise.allSettled([
                this.businesPartnerAPI.executeQuery(
                    SELECT.from('A_CustSalesPartnerFunc')
                        .columns(['Customer', 'PartnerFunction', 'BPCustomerNumber'])
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
                        .where({ Supplier: { in: [...new Set(aVendorRemitWhere)] } })
                ),

                SELECT.from('com.aleron.monitor.TaxCodeByCounty')
                    .columns(['country_code', 'region', 'county', 'taxJurisdiction'])
                    .where(`${sTaxCodeByCountyWhere}`),

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
                    message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'), process_code: sProcessCode
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
            //     const oAddr = aAddresses.find((oAddress) => oAddress.record_ID === oRecord.ID);
            //     if (!oAddr || !oAddr.county) {
            //         aErrors.push({
            //             record_ID: oRecord.ID,
            //             message: cds.i18n.messages.at('ERR_COUNTY_NOT_FOUND'),
            //         });
            //         aFailedRecordIDs.push(oRecord.ID);
            //         aErrorLogs.push(...aErrors);
            //         return; // Skip this record
            //     }
            // }

            const sTaxCode = this._getTaxCodeForRecord({
                record: oRecord,
                aTaxCodeByProvince,
                aTaxCodeByCity,
                aTaxCodeByCounty,
            });
            if (!sTaxCode) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_TAX_CODE_NOT_FOUND', [
                        oRecord.country_code,
                        oRecord.region,
                    ]), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            const oSalesContract = mSalesContract.get(oRecord.contractNo);
            if (!oSalesContract) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            // const oBillingType = mBillingTypes.get('ZW' + oRecord.salesDocumentType);
            // if (!oBillingType) {
            //     aErrors.push({
            //         record_ID: oRecord.ID,
            //         message: cds.i18n.messages.at('ERR_BILLING_TYPE', ['ZW' + oRecord.salesDocumentType]),
            //     });
            //     aFailedRecordIDs.push(oRecord.ID);
            //     aErrorLogs.push(...aErrors);
            //     return; // Skip this record . .
            // }

            const oSalesContractItem = oSalesContract._Item.find(
                (item) => item.Product === oRecord.materialNo && item.SalesContract === oRecord.contractNo,
              );
            if (!oSalesContractItem) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_MATERIAL_NOT_FOUND', [
                        oRecord.materialNo,
                        oRecord.contractNo
                    ]), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            const oVendorRemits = mVendorRemits.get(oRecord.remitToVendor);
            const oSupplierAccs = mSupplierAccs.get(oRecord.remitToVendor);
            const oCreatePO = mCreatePO.get(oRecord.ID);
            const PersonWorkAgreement = aWorkforcRes[0].PersonWorkAgreement;

            const salesOrderDocType = this._determineSalesOrderDocType(oSalesContract);
            if (!salesOrderDocType) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: 'Unable to determine Sales Order Document Type from contract data', process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            const oBillingType = mBillingTypes.get(salesOrderDocType);
            if (!oBillingType) {
                aErrors.push({
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_BILLING_TYPE', [salesOrderDocType]), process_code: sProcessCode
                });
                aFailedRecordIDs.push(oRecord.ID);
                aErrorLogs.push(...aErrors);
                return; // Skip this record
            }

            // Prepare payload for SalesOrder creation
            const oPayload = this._prepareDataForSalesOrderCreate({
                record: oRecord,
                salesContract: oSalesContract,
                paymentTermsMap: mPaymentTerms,
                customerPaymentTermsMap: mCustomerPaymentTerms,
                vendorRemit: oVendorRemits ?? {},
                supplierAcc: oSupplierAccs,
                businessPartnerMap: mBusinessPartners,
                taxCode: sTaxCode,
                personalNO: PersonWorkAgreement,
                createPO: oCreatePO,
                salesContractItem: oSalesContractItem,
                billingType: oBillingType
            });

            // Add payload to aPayloads and map record.ID to its payloadIndex
            const iPayloadIndex = aPayloads.push(oPayload) - 1;
            mPayloadMap.set(oRecord.ID, {
                payloadIndex: iPayloadIndex,
                salesOrder: null, // To be updated in Step 4
                scheduleLinePayloadIndex: null, // To be updated in Step 5
                partnerFunctionSAP: oSupplierAccs?.SupplierAccountGroup === 'ZRMT' ? 'ZR' : 'ZV'
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
                            ...oError, process_code: sProcessCode
                        });
                    });
                } else {
                    aErrorLogs.push({
                        record_ID: sRecordID,
                        message: cds.i18n.messages.at('ERR_SALES_ORDER_CREATION_FAILED', [oResult.reason]), process_code: sProcessCode
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
            aErrorLogs: aErrorLogs
        });

        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(SowScWo)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
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
            return oMapEntry && oMapEntry.salesOrder
                ? [
                    {
                        ID: oRecord.ID,
                        salesDocumentNoSAP: oMapEntry.salesOrder,
                        salesItemNoSAP: oMapEntry.salesOrderItem,
                        PORequiredSAP: oCreatePO.PORequiredSAP,
                        vcData1UUID: oMapEntry.vcData1UUID,
                        vcData2UUID: oMapEntry.vcData2UUID,
                        partnerFunctionSAP: oMapEntry.partnerFunctionSAP,
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
                    this.records[iRecordIndex].PORequiredSAP = oRecord.PORequiredSAP;
                    this.records[iRecordIndex].vcData1UUID = oRecord.vcData1UUID;
                    this.records[iRecordIndex].vcData2UUID = oRecord.vcData2UUID;
                    this.records[iRecordIndex].partnerFunctionSAP = oRecord.partnerFunctionSAP;
                    return UPDATE(SowScWo)
                        .set({
                            salesDocumentNoSAP: oRecord.salesDocumentNoSAP,
                            salesItemNoSAP: oRecord.salesItemNoSAP,
                            PORequiredSAP: oRecord.PORequiredSAP,
                            vcData1UUID: oRecord.vcData1UUID,
                            vcData2UUID: oRecord.vcData2UUID,
                            partnerFunctionSAP: oRecord.partnerFunctionSAP
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
        personalNO,
        createPO,
        salesContractItem,
        billingType
    }) {
        const oReturnData = {
            SalesOrderType: 'OR',
            SalesOrganization: salesContract.SalesOrganization,
            DistributionChannel: salesContract.DistributionChannel,
            OrganizationDivision: salesContract.OrganizationDivision,
            SalesOffice: salesContract.SalesOffice,
            ReferenceSDDocumentCategory: 'G',
            PurchaseOrderByCustomer: record?.custPurOrder,
            CustomerPurchaseOrderDate: `/Date(${+moment(record.beginDate, "YYYYMMDD").valueOf()})/`,
            TransactionCurrency: record.currency_code,
            // SDDocumentReason: '',
            PricingDate: `/Date(${+moment()})/`,
            IncotermsClassification: 'DAP',
            IncotermsLocation1: '1',
            CustomerPaymentTerms: '',
            YY1_CustomSalesOrder_SDH: salesContract.DistributionChannel === 'MS' ? 'ZWMS' : salesContract.DistributionChannel === 'SC' ? 'ZWSC' : salesContract.DistributionChannel,
            SoldToParty: record.soldToParty,
            YY1_AlphanumericSalesO_SDH: record.workOrderWN,
            YY1_ContractEndDate_SDH: `/Date(${moment(record.endDate, "YYYYMMDD").valueOf()})/`,
            YY1_ContractStartDate_SDH: `/Date(${moment(record.beginDate, "YYYYMMDD").valueOf()})/`,
            to_Item: [
                {
                    SalesOrderItem: '10',
                    SalesOrderItemCategory: 'TADN',
                    Material: record.materialNo,
                    RequestedQuantity: '1',
                    RequestedQuantityUnit: 'LAB',
                    RequestedQuantitySAPUnit: 'LAB',
                    RequestedQuantityISOUnit: '_01',
                    TransactionCurrency: record.currency_code,
                    ReferenceSDDocument: record.contractNo,
                    ReferenceSDDocumentItem: salesContractItem.SalesContractItem,
                    PurchaseOrderByCustomer: record?.custPurOrder,
                    SalesOrderItemText: record?.poDesc ?? '',
                    WBSElement: record.projectNumberSAP,
                    YY1_WeekEnd_SD_SDI: `/Date(${moment(record.beginDate, "YYYYMMDD").valueOf()})/`,
                    YY1_WNWorkOrder_SD_SDI: record.workOrderWN,
                    YY1_CustomBillingType_SDI: billingType.Billing_type,
                    to_ScheduleLine: [this._prepareDataForScheduleLine({ record })],
                },
            ],
            to_Partner: this._preparePartnerFunctions({ record, businessPartnerMap, vendorRemit, supplierAcc, personalNO, taxCode }),
            errors: [],
        };

        if (record.remitToVendor && supplierAcc.SupplierAccountGroup === 'ZRMT' && supplierAcc.Industry === 'ZMBE') {
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

        // Fill Item information
        // const oSalesContractItem = salesContract._Item.find(
        //     (item) => item.Product === record.materialNo && item.SalesContract === record.contractNo,
        // );

        // if (oSalesContractItem) {
        //     oReturnData.to_Item[0].ReferenceSDDocumentItem = oSalesContractItem.SalesContractItem;
        // } else {
        //     oReturnData.errors.push({
        //         record_ID: record.ID,
        //         message: cds.i18n.messages.at('ERR_MATERIAL_NOT_FOUND', [
        //             record.materialNo,
        //             record.contractNo,
        //         ]),
        //     });
        // }

        // Fill custom fields
        for (const fieldIndex of Array(15).keys()) {
            if (record[`customerFieldName${fieldIndex + 1}`] === 'Z20') {
                oReturnData.to_Item[0].to_Text[0].LongText = record[`customerFieldValue${fieldIndex + 1}`];
                oReturnData.to_Item[0].to_Text[0].LongTextID = 'ZJOB';
                oReturnData.to_Item[0].to_Text[0].Language = 'EN';
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

    _prepareDataForScheduleLine({ record }) {
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
    _preparePartnerFunctions({ record, businessPartnerMap, vendorRemit, supplierAcc, personalNO, taxCode }) {
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

        // SAP Employee
        aPartnerFunctions.push({
            PartnerFunction: 'Z3',
            Personnel: personalNO,
        });

        if (record.remitToVendor) {
            aPartnerFunctions.push({
                PartnerFunction: supplierAcc.SupplierAccountGroup === 'ZRMT' ? 'ZR' : 'ZV',
                Supplier: record.remitToVendor,
            });
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

        // // Email / Attention
        // const oEmailContact = businessPartnerMap.get(`${record.soldToParty}_Z5`);
        // if (!oEmailContact) {
        //   // Error
        // } else {
        //   if (record.attentionLine) {
        //     oAddr.AddresseeFullName = record.attentionLine; // Check again
        //   }
        //   if (record.distributionEmail) {
        //     oAddr.EmailAddress = record.distributionEmail;
        //   }
        //   aPartnerFunctions.push({
        //     PartnerFunction: 'Z5',
        //     ContactPerson: '21',  // Mapping needs to be done dynamic
        //     to_Address: [oAddr],
        //   });
        // }

        // const targetFields = ['Z13', 'Z14', 'Z15'];
        // const foundFields = {};

        // for (let fieldIndex = 1; fieldIndex <= 15; fieldIndex++) {
        //     const fieldName = record[`customerFieldName${fieldIndex}`];
        //     const fieldValue = record[`customerFieldValue${fieldIndex}`];

        //     if (targetFields.includes(fieldName)) {
        //         foundFields[fieldName] = fieldValue;
        //     }
        // }

        // if (Object.keys(foundFields).length) {
        //   oAddr.AddresseeFullName = foundFields.Z14 || '';
        //   oAddr.PhoneNumber = foundFields.Z15 || '';
        //   oAddr.EmailAddress = foundFields.Z13 || '';

        //   aPartnerFunctions.push({
        //     PartnerFunction: 'Z4',
        //     // Customer: oShipToParty.BPCustomerNumber,
        //     to_Address: [oAddr],
        //   });
        // } 

        return aPartnerFunctions;
    }

    _getSalesContractQuery(aSalesContractWhere) {
        // prettier-ignore
        return SELECT.from('SalesContract', sc => {
            sc.SalesContract,
                sc.SalesOrganization,
                sc.DistributionChannel,
                sc.OrganizationDivision,
                sc.CustomerGroup,
                sc.SalesOffice,                
                sc._Item((scItem) => {
                    scItem.SalesContract,
                        scItem.SalesContractItem,                        
                        scItem.Product
                })
        })
            .where({ SalesContract: { in: [...new Set(aSalesContractWhere)] } })
    }

       /**
     * Determine SalesOrderDocType based on contract data
     * @param {object} contractData - SalesContract record
     * @returns {string} SalesOrderDocType
     */
    _determineSalesOrderDocType(contractData) {
        let SalesOrderDocType = null;

        // Check Distribution Channel first
        // if (contractData.DistributionChannel === 'IC') {
        //     SalesOrderDocType = 'ZWCP';
        // } else if (contractData.DistributionChannel === 'MS') {
        //     SalesOrderDocType = 'ZWMS';
        // } else if (contractData.DistributionChannel === 'SC') {
        //     SalesOrderDocType = 'ZWSC';
        // } else if (contractData.DistributionChannel === 'CP') {
        //     // Interface will process only Managed Services and Subcontracting scenarios
        //     // This should be handled in validation, but keeping for consistency
        //     SalesOrderDocType = null;
        // }

        // If Distribution Channel didn't determine the type, check CustomerGroup
        // if (!SalesOrderDocType) 
            {
            if (contractData.CustomerGroup === 'ZC') {
                SalesOrderDocType = 'ZWCP';
            } else if (contractData.CustomerGroup === 'ZB') {
                SalesOrderDocType = 'ZWBP';
            } else if (contractData.CustomerGroup === 'ZD') {
                SalesOrderDocType = 'ZWDP';
            } else if (contractData.CustomerGroup === 'ZM') {
                SalesOrderDocType = 'ZWMS';
            } else if (contractData.CustomerGroup === 'ZS') {
                SalesOrderDocType = 'ZWSC';
            }
        }

        return SalesOrderDocType;
    }


    _getTaxCodeForRecord({ record, aTaxCodeByProvince, aTaxCodeByCity, aTaxCodeByCounty }) {
        let sTaxCode = null,
            oTaxCode;
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
    async _prepareVCData({
        records,
        mCustomerFieldNameValue,
        mPayloadMap,
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
                if (oMapEntry && oMapEntry.salesOrder) {

                    const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID);

                    // const VC1Fields = ['YY6_SC_LINE_ITEM_NUMBER', 'YY3_ACA_HRS_PRICE', 'YY118_MARK_UP_RG', 'YY119_MARK_UP_OT', 'YY120_MARK_UP_DB'];
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
                        SalesOrderItemNum: '10',
                        YY8_WEEK_ENDING2: moment(record.endDate).format('YYYY-MM-DD'),
                        // YY12_DAY1_SHIFT1_RG: shift,
                        // YY13_DAY1_SHIFT1_OT: shift,
                        // YY14_DAY1_SHIFT1_DB: shift,
                        // YY15_DAY1_SHIFT2_RG: shift,
                        // YY16_DAY1_SHIFT2_OT: shift,
                        // YY17_DAY1_SHIFT2_DB: shift,
                        // YY18_DAY1_SHIFT3_RG: shift,
                        // YY19_DAY1_SHIFT3_OT: shift,
                        // YY20_DAY1_SHIFT3_DB: shift,
                        // YY100_SHIFT1_TOTAL_HRS_RG: shift,
                        // YY101_SHIFT1_TOTAL_HRS_OT: shift,
                        // YY102_SHIFT1_TOTAL_HRS_DB: shift,
                        // YY103_SHIFT2_TOTAL_HRS_RG: shift,
                        // YY104_SHIFT2_TOTAL_HRS_OT: shift,
                        // YY105_SHIFT2_TOTAL_HRS_DB: shift,
                        // YY106_SHIFT3_TOTAL_HRS_RG: shift,
                        // YY107_SHIFT3_TOTAL_HRS_OT: shift,
                        // YY108_SHIFT3_TOTAL_HRS_DB: shift,
                        // YY109_SHIFT1_PRICE_RG: record.shiftCustomerBillRateFirst,
                        // YY110_SHIFT1_PRICE_OT: record.shiftCustomerOTBillRateFirst,
                        // YY111_SHIFT1_PRICE_DB: record.shiftCustomerDTBillRateFirst,
                        // YY112_SHIFT2_PRICE_RG: record.shiftCustomerBillRateSecond,
                        // YY113_SHIFT2_PRICE_OT: record.shiftCustomerOTBillRateSecond,
                        // YY114_SHIFT2_PRICE_DB: record.shiftCustomerDTBillRateSecond,
                        // YY115_SHIFT3_PRICE_RG: record.shiftCustomerBillRateThird,
                        // YY116_SHIFT3_PRICE_OT: record.shiftCustomerOTBillRateThird,
                        // YY117_SHIFT3_PRICE_DB: record.shiftCustomerDTBillRateThird,
                        // YY121_SHIFT1_TOTAL_PRICE_RG: shift * record.shiftCustomerBillRateFirst,
                        // YY122_SHIFT1_TOTAL_PRICE_OT: shift * record.shiftCustomerOTBillRateFirst,
                        // YY123_SHIFT1_TOTAL_PRICE_DB: shift * record.shiftCustomerDTBillRateFirst,
                        // YY124_SHIFT2_TOTAL_PRICE_RG: shift * record.shiftCustomerBillRateSecond,
                        // YY125_SHIFT2_TOTAL_PRICE_OT: shift * record.shiftCustomerOTBillRateSecond,
                        // YY126_SHIFT2_TOTAL_PRICE_DB: shift * record.shiftCustomerDTBillRateSecond,
                        // YY127_SHIFT3_TOTAL_PAY_RG: shift * record.shiftCustomerBillRateThird,
                        // YY128_SHIFT3_TOTAL_PAY_OT: shift * record.shiftCustomerOTBillRateThird,
                        // YY129_SHIFT3_TOTAL_PAY_DB: shift * record.shiftCustomerDTBillRateThird,
                        ...(oCustFieldResult.VC1Fields || {}),
                    };
                    const salesVC2 = {
                        Sales_Order_Number: oMapEntry.salesOrder,
                        Sales_Order_Item_Num: '10',
                        ORIGINAL_PO_AMOUNT: "0.00",
                        SERVICE_START_DATE: `/Date(${moment(record.beginDate, "YYYYMMDD").valueOf()})/`,
                        SERVICE_END_DATE: `/Date(${moment(record.endDate, "YYYYMMDD").valueOf()})/`,
                        HYBRID_PRICING: 'NO',
                        // YY135_DAILY_TOTAL_VENDOR: 0,
                        // YY137_HOLIDAY_TOTAL_VENDOR: 0,
                        // YY247_ZSD_WN_WORK_ORDER_VCSD: record.workOrderWN,
                        // YY251_SHIFT1_PAY_RATE_RG: record.shiftVendorPayRateFirst,
                        // YY252_SHIFT1_PAY_RATE_OT: record.shiftVendorOTPayRateFirst,
                        // YY253_SHIFT1_PAY_RATE_DB: record.shiftVendorDTPayRateFirst,
                        // YY254_SHIFT2_PAY_RATE_RG: record.shiftVendorPayRateSecond,
                        // YY255_SHIFT2_PAY_RATE_OT: record.shiftVendorOTPayRateSecond,
                        // YY256_SHIFT2_PAY_RATE_DB: record.shiftVendorDTPayRateSecond,
                        // YY257_SHIFT3_PAY_RATE_RG: record.shiftVendorPayRateThird,
                        // YY258_SHIFT3_PAY_RATE_OT: record.shiftVendorOTPayRateThird,
                        // YY259_SHIFT3_PAY_RATE_DB: record.shiftVendorDTPayRateThird,
                        // YY260_SHIFT1_TOTAL_PAY_RG: record.shiftVendorPayRateFirst,
                        // YY261_SHIFT1_TOTAL_PAY_OT: record.shiftVendorOTPayRateFirst,
                        // YY262_SHIFT1_TOTAL_PAY_DB: record.shiftVendorDTPayRateFirst,
                        // YY263_SHIFT2_TOTAL_PAY_RG: record.shiftVendorPayRateSecond,
                        // YY264_SHIFT2_TOTAL_PAY_OT: record.shiftVendorOTPayRateSecond,
                        // YY265_SHIFT2_TOTAL_PAY_DB: record.shiftVendorDTPayRateSecond,
                        // YY266_SHIFT3_TOTAL_PAY_RG: record.shiftVendorPayRateThird,
                        // YY267_SHIFT3_TOTAL_PAY_OT: record.shiftVendorOTPayRateThird,
                        // YY268_SHIFT3_TOTAL_PAY_DB: record.shiftVendorDTPayRateThird,
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
}

module.exports = SOWscWO;