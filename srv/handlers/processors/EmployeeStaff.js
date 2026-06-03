// Interface type 'U'
const moment = require('moment');
const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Procesor-EmployeeStaff');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');

const BusinessPartnerComm = require('../communicators/BusinessPartner');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SmartyAddressComm = require('../communicators/SmartyAddress');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const HrCostDistObj = require('../communicators/HrCostDistObj');
const WorkforceComm = require('../communicators/Workforce');

// List of required entities
const {
  StaffHires,
  FieldValidations,
  FieldValidations: {
    elements: {
      validation: {enum: mFieldValidationTypeEnum},
    },
  },
} = cds.entities('com.aleron.monitor');

class EmployeeStaff extends Processor {
  constructor(options) {
    super(options);
    // Processor Specific configuration
    this.recordsEntity = 'com.aleron.monitor.StaffHires';
    this.LOG = cds.log('Monitor.Procesor-EmployeeContractor');
    this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

    // Communicators used by EmployeeStaff Processor
    this.businesPartnerAPI = null;
    this.smartyAddressAPI = null;
    this.enterpriseProjectAPI = null;
    this.empCustInfoAPI = null;
    this.HrCostDistObjAPI = null;
    this.workforceAPI = null;
  }

  prepareCommunicators() {
    this.LOG._info && this.LOG.info('Preparing Communicators');
    this.businesPartnerAPI = new BusinessPartnerComm();
    this.smartyAddressAPI = new SmartyAddressComm();
    this.enterpriseProjectAPI = new EnterpriseProjectComm();
    this.empCustInfoAPI = new EmpCustInfoComm();
    this.HrCostDistObjAPI = new HrCostDistObj();
    this.workforceAPI = new WorkforceComm();
  }

  _getColumnsForFetch(sEntity) {
    const mEntityColumns = {
      'com.aleron.monitor.StaffHires': [
        ...['ID', 'file_ID', 'processLevel_code', 'valid', 'homeLocation_code', 'actionIndicator'], // mandatory columns
        ...['salesOffice'], // sales data columns
        ...[
          'employeeGroup',
          'employeeSubgroup',
          'shiftRGFirst',
          'shiftOTFirst',
          'shiftDTFirst',
          'shiftRGSecond',
          'shiftOTSecond',
          'shiftDTSecond',
          'shiftRGThird',
          'shiftOTThird',
          'shiftDTThird',
          'dailyRate',
          'weeklySalary',
          'biWeeklySalary',
          'monthlySalary',
          'dailyRate2',
          'monthlySalary2',
          'custWkTimeFee',
        ], // rate columns
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
        ], // shift customer bill rate
        ...[
          'custBusUnitName',
          'custChrgNo',
          'projectNo',
          'custCostCtr',
          'custCompCode',
          'custDepNo',
          'custDOTSNo',
          'custRUI',
          'custAccNo',
          'custBudCtr',
          'custConNo',
          'sgVendNoAtCust',
          'custOrgName',
          'custLegEnt',
          'custOrcNo',
          'custUtStrNo',
          'svcDatFrom',
          'custEmpNo',
          'custAgrName',
          'taskNo',
          'custFEPSCode',
          'custGLCode',
          'purchaseAgreement',
          'bbNo',
          'custBgChkDate',
          'custDivUnit',
          'custPosCode',
        ], // customer fields
        ...['workNexusIndicator', 'wnWork'], // work nexus columns
        ...['contractNo', 'payroll', 'companyCode', 'soldToParty', 'material'], // sales contract
        ...['soldToParty', 'companyCode', 'billToParty'], // partner function
        ...[
          'companyCode',
          'workTaxAreaState',
          'workerCompState',
          'homeRegion',
          'region',
          'postalCode',
          'residentTaxAreaState',
          'workLocation',
          'street',
          'city',
          'doorNo',
          'county',
        ], // tax area columns
        ...[
          'personnelNoSAP',
          'lastName',
          'firstName',
          'salesOffice',
          'beginDate',
          'country_code',
          'currency_code',
          'projectNumberSAP',
          'projectUUID',
          'vcData1UUID',
          'vcData2UUID',
          'ssn',
          'employeeGroup',
          'employeeSubgroup',
          'workOrderDoc',
          'plansSAP',
          'recruiterEmployeeNo',
          'hireAct',
          'actionReason',
          'benefitType',
        ], // extra columns
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
        ], // custom fields
        ...['markupTime', 'markupOT', 'markupDT'], // Markup information
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

    // Clear the error logs for the selected records; so that new process can start
    // await ProcessLogger.removeLogs([...this.recordIDs]);
    // Get list of countries by looping over `this.file.to_EmployeeHires` and get unique countries
    let aCountries = [];
    let aAreas = [];
    let aActionIndicators = [];
    let aSalesContractIDs = [];
    let aBusinessPartnerConditions = [];
    let aCountryRegionsConditions = [];
    let aZipCodesToCheck = [];

    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode)) {
        aRecordsForProcessing.push({...record});
      } else {
        aSkippedRecords.push({...record});
        continue;
      }

      if (record.homeLocation_code) {
        aCountries.push(record.homeLocation_code);
      }
      if (record.payroll) {
        aAreas.push(`ZW${record.payroll}`);
      }
      if (record.actionIndicator) {
        aActionIndicators.push(record.actionIndicator);
      }
      // if (record.contractNo) {
      //   aSalesContractIDs.push(record.contractNo);
      // }
      if (record.soldToParty && record.companyCode && record.billToParty) {
        aBusinessPartnerConditions.push({
          soldToParty: record.soldToParty,
          billToParty: record.billToParty,
          companyCode: record.companyCode,
          partnerFunction: 'Z1',
        });
      }
      if (record.country_code && record.region) {
        aCountryRegionsConditions.push({
          country_code: record.country_code,
          region: record.region,
        });
      }
      if (record.postalCode) {
        aZipCodesToCheck.push({
          zipcode: String(record.postalCode),
          record_ID: record.ID,
        });
      }

      this.updateProcessingState(sProcessCode);
      if (!aRecordsForProcessing.length) {
        // If Step doesn't need to be processed, simply return to avoid costly calls
        return {
          hasError: false,
          continue: true,
        };
      }
    }
    aCountries = [...new Set(aCountries)];
    aAreas = [...new Set(aAreas)];
    aActionIndicators = [...new Set(aActionIndicators)];
    // aSalesContractIDs = [...new Set(aSalesContractIDs)];

    const [{reason: anyFieldValidationErr, value: aFieldValidations}] = await Promise.allSettled([
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
    ]);

    // if (anyBusinessPartnerErr) {
    //   LOG._error && LOG.error(anyBusinessPartnerErr.message);
    // }

    // if (anySalesContractErr) {
    //   LOG._error && LOG.error(anySalesContractErr.message);
    // }

    if (anyFieldValidationErr) {
      this.LOG._error && this.LOG.error(anyFieldValidationErr.message);
    }

    // if (anyZipCodeErr) {
    //   LOG._error && LOG.error(anyZipCodeErr.message);
    // }

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

    // Map should have key value as parameter so cant use spread operator
    // const mZipCodeValidation = new Map(...aZipCodeValidations.map((r) => [r.record_ID, r]));
    // const mZipCodeValidation = new Map(
    //   aZipCodeValidations.map((r) => [r.record_ID, r])
    // );

    // Run the steps only for filtered records
    aRecordsForProcessing.forEach((oRecord) => {
      let hasRecordFailed = false;

      // Check postal code format
      // const oZipCode = mZipCodeValidation.get(oRecord.ID);
      // if (!oZipCode?.valid) {
      //   aErrorLogs.push({
      //     record_ID: oRecord.ID,
      //     message: cds.i18n.messages.at('ERR_ZIPCODE_NOT_VALID'),
      //   });
      //   aFailedRecordIDs.push(oRecord.ID);
      //   hasRecordFailed = true;
      // }

      // Check mandatory / blank fields
      const oFieldValidationRes = this._validateFieldValidations({
        stMandatoryFields,
        stBlankFields,
        oRecord,
      });
      if (oFieldValidationRes.hasError) {
        aErrorLogs.push(...oFieldValidationRes.errors);
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      }
      // Check Rates Validation
      const oRateValidationRes = this._validateRates(oRecord);
      if (oRateValidationRes.hasError) {
        aErrorLogs.push(...oRateValidationRes.errors);
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      }
      // Check Work Nexus Deploymentt
      const oWNDeploymentRes = this._validateWorkNexusDeployment(oRecord);
      if (oWNDeploymentRes.hasError) {
        aErrorLogs.push(...oWNDeploymentRes.errors);
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      }

      // Check sales contract
      // if (entity != 'MonitorService_StaffHires') {
      //   const oSalesContractRes = this._validateSalesContract(oRecord, aSalesContracts);
      //   if (oSalesContractRes.hasError) {
      //     aErrorLogs.push(...aErrorLogs, ...oSalesContractRes.errors);
      //     aFailedRecordIDs.push(oRecord.ID);
      //     hasRecordFailed = true;
      //   }
      // }

      // Check bill-to
      // const oPartnerFunctionRes = this._validatePartnerFunction(oRecord, aPartnerFunctions);
      // if (oPartnerFunctionRes.hasError) {
      //   aErrorLogs.push(...aErrorLogs, ...oPartnerFunctionRes.errors);
      //   aFailedRecordIDs.push(oRecord.ID);
      //   hasRecordFailed = true;
      // }

      // TODO: Check country region

      // Check Tax area
      const oTaxAreaRes = this._validateTaxArea(oRecord);
      if (oTaxAreaRes.hasError) {
        aErrorLogs.push(...oTaxAreaRes.errors);
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      }

      if (!hasRecordFailed) {
        aPassedRecordIDs.push(oRecord.ID);
      }
    });

    // If errors are there, log them and update failed records
    if (aErrorLogs.length) {
      try {
        await Promise.allSettled([
          ProcessLogger.removeLogs(aFailedRecordIDs),
          ProcessLogger.addLogs(aErrorLogs),
          // this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
          // UPDATE(StaffHires)
          //   .set({valid: false, processLevel_code: sProcessCode})
          //   .where({ID: {in: Array.from(new Set(aFailedRecordIDs))}}),
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
            return UPDATE(StaffHires)
              .set({valid: false, processLevel_code: recordProcessLevelCode})
              .where({ID: recordID});
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
      // const targetEntity = String(entity).includes('StaffHires') ? StaffHires : EmployeeHires;
      await Promise.allSettled([
        ProcessLogger.removeLogs(aPassedRecordIDs),
        // this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
        // UPDATE(StaffHires)
        //   .set({valid: true, processLevel_code: sProcessCode})
        //   .where({ID: {in: Array.from(new Set(aPassedRecordIDs))}}),
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
              } else if (record.processLevel_code === '2' && !record.valid) {
                recordProcessLevelCode = '1';
              } else {
                recordProcessLevelCode = record.processLevel_code;
              }
            }
            return UPDATE(StaffHires)
              .set({valid: true, processLevel_code: recordProcessLevelCode})
              .where({ID: recordID});
          }),
      ]);
      this.LOG._info &&
        this.LOG.info(cds.i18n.messages.at('INFO_RECORDS_UPDATED', [sProcessCode, 'All']));
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

  //  async employeeHire(sProcessCode, bBreakExecution) {
  //     this.LOG._info && this.LOG.info('Starting employeeHire process');
  
  //     let aRecordsForProcessing = [],
  //       aSkippedRecords = [],
  //       aErrorLogs = [],
  //       aPassedRecordIDs = [],
  //       aFailedRecordIDs = [];
  
  //    for (const record of this.records) {
  //     if (this.shouldRecordProcess(record, sProcessCode)) {
  //         aRecordsForProcessing.push({...record});
  //       } else {
  //         aSkippedRecords.push({...record});
  //         continue;
  //       }
  //     }
  
  //     this.updateProcessingState(sProcessCode);
  //     if (!aRecordsForProcessing.length) {
  //       return {
  //         hasError: false,
  //         continue: true,
  //       };
  //     }
  
  //     // Process each record to check if employee is found
  //     for (const record of aRecordsForProcessing) {
  //       let employeeFound = false;
        
  //       try {
  //         // Check if employee exists by personnelNoSAP
  //         if (record.personnelNoSAP) {        
  //           employeeFound = record.personnelNoSAP && record.personnelNoSAP.trim() !== '';
  //         }
  
  //         if (!employeeFound) {
  //           // Employee not found - update status to 1 and set yes flag
  //           await UPDATE(StaffHires)
  //             .set({
  //               valid: true,
  //               processLevel_code: '1' // Set status to 1              
  //             })
  //             .where({ID: record.ID});
  //           aErrorLogs.push({
  //           record_ID: record.ID,
  //           message: `Error processing employee hire for record`,
  //         });
  //           aFailedRecordIDs.push(record.ID);
  //           this.LOG._info && this.LOG.info(`Employee not found for record ID ${record.ID}, status updated to 1 and yes flag set`);
  //         } else {
  //           // Employee found - continue with normal processing
  //           aPassedRecordIDs.push(record.ID);
  //           this.LOG._info && this.LOG.info(`Employee found for record ID ${record.ID}, continuing normal processing`);
  //         }
  //       } catch (error) {
  //         aErrorLogs.push({
  //           record_ID: record.ID,
  //           message: `Error processing employee hire for record: ${error.message}`,
  //         });
  //         aFailedRecordIDs.push(record.ID);
  //         this.LOG._error && this.LOG.error(`Error processing record ID ${record.ID}: ${error.message}`);
  //       }
  //     }
  
  //     // Handle failed records
  //     if (aErrorLogs.length) {
  //       await ProcessLogger.addLogs(aErrorLogs);
  //       // await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
  //     }
  
  //     // Handle passed records
  //     if (aPassedRecordIDs.length) {
  //       // await ProcessLogger.removeLogs(aPassedRecordIDs);
  //       await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
  //     }
  
  //     this.updateExclusionSet({
  //       passed: aPassedRecordIDs,
  //       failed: aFailedRecordIDs,
  //       skipped: aSkippedRecords,
  //       bBreakExecution,
  //     });
  
  //     return {
  //       hasError: aFailedRecordIDs.length > 0,
  //       continue: aFailedRecordIDs.length === 0,
  //     };
  //   }

//  async employeeHire(sProcessCode, bBreakExecution) {
//     this.LOG._info && this.LOG.info('Starting employeeHire process');

//     let aRecordsForProcessing = [],
//       aSkippedRecords = [],
//       aErrorLogs = [],
//       aPassedRecordIDs = [],
//       aFailedRecordIDs = [];

//    for (const record of this.records) {
//     if (this.shouldRecordProcess(record, sProcessCode)) {
//         aRecordsForProcessing.push({...record});
//       } else {
//         aSkippedRecords.push({...record});
//         continue;
//       }
//     }

//     this.updateProcessingState(sProcessCode);
//     if (!aRecordsForProcessing.length) {
//       return {
//         hasError: false,
//         continue: true,
//       };
//     }

//     // Process each record to check if employee is foundd
//     for (const record of aRecordsForProcessing) {
//       let employeeFound = false;
//       await ProcessLogger.removeLogs(record.ID);
//       try {
//         // Check if employee exists by personnelNoSAP
//         if (record.personnelNoSAP) {        
//           employeeFound = record.personnelNoSAP && record.personnelNoSAP.trim() !== '';
//         }

//         if (!employeeFound) {
//           // Employee not found - add error log "Awaiting Employee Creation"
//           await UPDATE(StaffHires)
//             .set({
//               valid: true,
//               processLevel_code: sProcessCode
//             })
//             .where({ID: record.ID});
//           aErrorLogs.push({
//             record_ID: record.ID,
//             message: `Awaiting Employee Creation`,
//           });
//           aFailedRecordIDs.push(record.ID);
//           this.LOG._info && this.LOG.info(`Employee not found for record ID ${record.ID}, awaiting employee creation`);
//         } 
//         else {
//           // Employee found - call workforce API
//           let workforceResult = await this.workforceAPI.executeQuery(
//             SELECT.from('YY1_workforce_cds')
//               .columns(['WorkforcePersonExternalID', 'PersonWorkAgreement'])
//               .where({ WorkforcePersonExternalID: record.personnelNoSAP })
//           );
          
//           if (workforceResult && workforceResult.length > 0) {
//             // Found in workforce API - update with processLevel_code 2 and valid true
//             await UPDATE(StaffHires)
//               .set({ 
//                 valid: true,
//                 processLevel_code: '2'
//               })
//               .where({ID: record.ID});
//             aPassedRecordIDs.push(record.ID);
//             this.LOG._info && this.LOG.info(`Employee found in workforce system for record ID ${record.ID}, updated to processLevel_code 2`);
//           } else {
//             // Not found in workforce API - update with valid false
//             await UPDATE(StaffHires)
//               .set({
//                 valid: false,
//                 processLevel_code: sProcessCode
//               })
//               .where({ID: record.ID});
//             aErrorLogs.push({
//               record_ID: record.ID,
//               message: `Employee not Replicated In S/4`,
//             });
//             aFailedRecordIDs.push(record.ID);
//             this.LOG._info && this.LOG.info(`Employee not found in workforce system for record ID ${record.ID}, marked as invalid`);
//           }
//         }
//       } catch (error) {
//         aErrorLogs.push({
//           record_ID: record.ID,
//           message: `Error processing employee hire for record: ${error.message}`,
//         });
//         aFailedRecordIDs.push(record.ID);
//         this.LOG._error && this.LOG.error(`Error processing record ID ${record.ID}: ${error.message}`);
//       }
//     }

//     // Handle failed records
//     if (aErrorLogs.length) {
//       await ProcessLogger.addLogs(aErrorLogs);
//       // await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
//     }

//     // Handle passed records
//     if (aPassedRecordIDs.length) {
//       // await ProcessLogger.removeLogs(aPassedRecordIDs);
//       await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
//     }

//     this.updateExclusionSet({
//       passed: aPassedRecordIDs,
//       failed: aFailedRecordIDs,
//       skipped: aSkippedRecords,
//       bBreakExecution,
//     });

//     return {
//       hasError: aFailedRecordIDs.length > 0,
//       continue: aFailedRecordIDs.length === 0,
//     };
//   }

// ===== StaffHires: employeeHire (PL=1 grouping + safe heals; no step churn for existing rows) =====
async employeeHire(sProcessCode, bBreakExecution) {
  const LOG = this.LOG || console;
  const trim = v => (v ?? '').toString().trim();
  const uniq = arr => [...new Set(arr)];
  const { SELECT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');

  LOG.info('[StaffHires] employeeHire: start');

  // ---- PIN: capture current PL=2 leaders to restore (2,true) at the end
  const fileIdsInScope = uniq((this.records || []).map(r => r.file_ID).filter(Boolean));
  let pinnedLeaderIds = [];
  try {
    if (fileIdsInScope.length) {
      const snap = await SELECT.from(StaffHires)
        .columns('ID')
        .where({ file_ID: { in: fileIdsInScope }, processLevel_code: '2' });
      pinnedLeaderIds = (snap || []).map(r => String(r.ID));
      LOG.info(`[StaffHires][PIN] snapshot PL=2 leaders: ${pinnedLeaderIds.length} id(s)`);
    }
  } catch (e) {
    LOG.error(`[StaffHires][PIN] snapshot failed: ${e.message}`);
  }

  try {
    // ---- PRE-PASS: fill personnelNoSAP for S rows by SSN (number only, do NOT change step/valid)
    try {
      if (fileIdsInScope.length) {
        const siblingRows = await SELECT.from(StaffHires)
          .columns(['ID','file_ID','processLevel_code','valid','ssn','personnelNoSAP'])
          .where({ file_ID: { in: fileIdsInScope } });

        const mSsnToEmp = new Map();
        (siblingRows || []).forEach(r => {
          const emp = trim(r.personnelNoSAP);
          if (!emp) return;
          const s = trim(r.ssn);
          if (s && !mSsnToEmp.has(s)) mSsnToEmp.set(s, emp);
        });

        const toFill = (siblingRows || [])
          .filter(r => r.processLevel_code === 'S' && !trim(r.personnelNoSAP))
          .map(r => {
            const emp = mSsnToEmp.get(trim(r.ssn));
            return emp ? { id: r.ID, emp } : null;
          })
          .filter(Boolean);

        if (toFill.length) {
          await Promise.allSettled(
            toFill.map(x =>
              UPDATE(StaffHires)
                .set({ personnelNoSAP: x.emp })
                .where({ ID: x.id, processLevel_code: 'S' }) // HARD GUARD: stay at S
            )
          );
          // sync in-memory
          const filled = new Map(toFill.map(x => [String(x.id), x.emp]));
          for (const r of (this.records || [])) {
            const emp = filled.get(String(r.ID));
            if (emp) r.personnelNoSAP = emp;
          }
          LOG.info(`[StaffHires] Pre-pass S: filled personnelNoSAP on ${toFill.length} row(s) (SSN).`);
        }

        // optional Emp-Cust-Info supplement
        const stillBlankSSNs = (siblingRows || [])
          .filter(r => r.processLevel_code === 'S' && !trim(r.personnelNoSAP))
          .map(r => trim(r.ssn)).filter(Boolean);

        const remaining = uniq(stillBlankSSNs.filter(k => !mSsnToEmp.has(k)));
        if (remaining.length) {
          try {
            const empRows = await this.empCustInfoAPI.executeQuery(
              SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
                .columns(['SSN','WORKER_ID'])
                .where({ SSN: { in: remaining } })
            );
            const mECI = new Map();
            (empRows || []).forEach(r => {
              const s = trim(r.SSN), w = trim(r.WORKER_ID);
              if (s && w && !mECI.has(s)) mECI.set(s, w);
            });

            const toFillECI = (siblingRows || [])
              .filter(r => r.processLevel_code === 'S' && !trim(r.personnelNoSAP))
              .map(r => {
                const emp = mECI.get(trim(r.ssn));
                return emp ? { id: r.ID, emp } : null;
              })
              .filter(Boolean);

            if (toFillECI.length) {
              await Promise.allSettled(
                toFillECI.map(x =>
                  UPDATE(StaffHires)
                    .set({ personnelNoSAP: x.emp })
                    .where({ ID: x.id, processLevel_code: 'S' }) // HARD GUARD
                )
              );
              const filled2 = new Map(toFillECI.map(x => [String(x.id), x.emp]));
              for (const r of (this.records || [])) {
                const emp = filled2.get(String(r.ID));
                if (emp) r.personnelNoSAP = emp;
              }
              LOG.info(`[StaffHires] Pre-pass S (EmpCustInfo): filled ${toFillECI.length} row(s).`);
            }
          } catch (e) {
            LOG.error(`[StaffHires] Pre-pass S (EmpCustInfo) failed: ${e.message}`);
          }
        }
      }
    } catch (e) {
      LOG.error(`[StaffHires] Pre-pass S failed: ${e.message}`);
    }

    // ---- PRE-HEAL: (2,false & no emp) -> (2,true)  (don’t touch step)
    try {
      const healed = await UPDATE(StaffHires)
        .set({ valid: true })
        .where({ processLevel_code: '2', valid: false, personnelNoSAP: null });
      const healedCount = typeof healed === 'number'
        ? healed
        : (healed?.rowCount ?? healed?.rows ?? healed?.affectedRows ?? 0);
      LOG.info(`[StaffHires] Pre-heal: set valid=true for ${healedCount} row(s) w/o personnelNoSAP`);
    } catch (e) {
      LOG.error(`[StaffHires] Pre-heal failed: ${e.message}`);
    }

    // ---- Selection for this click
    let aRecordsForProcessing = [], aSkippedRecords = [];
    for (const record of (this.records || [])) {
      if (this.shouldRecordProcess(record, sProcessCode)) aRecordsForProcessing.push({ ...record });
      else aSkippedRecords.push({ ...record });
    }
    this.updateProcessingState(sProcessCode);
    if (!aRecordsForProcessing.length) {
      LOG.info('[StaffHires] No records to process at this step.');
      return { hasError: false, continue: true };
    }

    // =================== NEW BUSINESS LOGIC (aligned with T) ===================

    // CONFIG: ECI dates are START_DATE / END_DATE
    const ECI_VALID_FROM_COL = 'START_DATE';
    const ECI_VALID_TO_COL   = 'END_DATE';

    const getAI = r =>
      (r.actionIndicator ?? r.actionIndicator_code ?? r.actionIndicatorSAP ?? r.action_code ?? '')
        .toString().trim().toUpperCase();

    const HIRE_REHIRE = new Set(['U1', 'C1', 'U2', 'C2']);
    const isUxCx = ai => ai === 'UX' || ai === 'CX';

    // Normalize to UTC date-only to avoid TZ drift
    const toDateOnlyUTC = d => {
      if (!d && d !== 0) return null;
      const dd = new Date(d);
      if (!Number.isFinite(dd.valueOf())) return null;
      return new Date(Date.UTC(dd.getUTCFullYear(), dd.getUTCMonth(), dd.getUTCDate()));
    };
    const parseAnyDate = raw => {
      if (!raw && raw !== 0) return null;
      const s = String(raw);
      const m = /^\/Date\((\d+)\)\/$/.exec(s);
      if (m) return toDateOnlyUTC(new Date(Number(m[1])));
      // YYYYMMDD quick path
      if (/^\d{8}$/.test(s)) {
        const y = +s.slice(0,4), mo = +s.slice(4,6) - 1, d = +s.slice(6,8);
        return toDateOnlyUTC(new Date(Date.UTC(y, mo, d)));
      }
      const d = new Date(s);
      return Number.isFinite(d.valueOf()) ? toDateOnlyUTC(d) : null;
    };

    // On date of run, use system time (date-only)
    const runDate = toDateOnlyUTC(new Date());

    // ECI window check: does runDate fall within [START_DATE .. END_DATE]?
    const eciActiveOnRunDate = (from, to) => {
      const f = parseAnyDate(from);  // may be null/open
      const t = parseAnyDate(to);    // may be null/open
      if (!runDate) return false;    // defensive
      if (f && runDate < f) return false;
      if (t && runDate > t) return false;
      return true;
    };

    const ssnKey = r => trim(r.ssn);
    const groups = new Map();
    for (const r of aRecordsForProcessing) {
      const k = ssnKey(r);
      if (!k) continue;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(r);
    }
    const noSsnRows = aRecordsForProcessing.filter(r => !ssnKey(r));

    // fetch ECI by SSN (request START_DATE/END_DATE)
    const allSsns = [...groups.keys()];
    let eciRows = [];
    if (allSsns.length) {
      try {
        eciRows = await this.empCustInfoAPI.executeQuery(
          SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
            .columns(['SSN', 'WORKER_ID', ECI_VALID_FROM_COL, ECI_VALID_TO_COL])
            .where({ SSN: { in: allSsns } })
        );
      } catch (e) {
        LOG.error(`[StaffHires] ECI fetch failed: ${e.message}`);
        eciRows = [];
      }
    }
    const eciBySsn = new Map();
    for (const row of (eciRows || [])) {
      const s = trim(row.SSN);
      if (!s) continue;
      if (!eciBySsn.has(s)) eciBySsn.set(s, []);
      eciBySsn.get(s).push(row);
    }

    const doSet = (rows, payload, guard = {}) =>
      rows.length
        ? Promise.allSettled(rows.map(x =>
            UPDATE(StaffHires).set(payload).where(Object.assign({ ID: x.ID }, guard))
          ))
        : Promise.resolve([]);

    let totalSfalse = 0, total2true = 0, totalErrors = 0;

    for (const [ssn, rows] of groups.entries()) {
      const eciList = eciBySsn.get(ssn) || [];
      const hasActiveEciNow = eciList.some(eci =>
        eciActiveOnRunDate(eci[ECI_VALID_FROM_COL], eci[ECI_VALID_TO_COL])
      );

      if (hasActiveEciNow) {
        // Employee exists with dates as of run date -> ALL to S/FALSE
        await doSet(rows, { processLevel_code: 'S', valid: false });
        totalSfalse += rows.length;
        continue;
      }

      // No active ECI as of run date -> apply file-based AI rules
      const hires = rows.filter(r => HIRE_REHIRE.has(getAI(r)));
      const others = rows.filter(r => !HIRE_REHIRE.has(getAI(r)));

      if (hires.length) {
        // All U1/C1/U2/C2 -> 2/TRUE
        await doSet(hires, { processLevel_code: '2', valid: true });
        total2true += hires.length;

        // Any UX/CX in same file for the SSN -> S/FALSE
        const uxCx = others.filter(r => isUxCx(getAI(r)));
        if (uxCx.length) {
          await doSet(uxCx, { processLevel_code: 'S', valid: false });
          totalSfalse += uxCx.length;
        }
        // Other non-UX/CX rows left unchanged
      } else {
        // No Hire/Rehire at all in the file for this SSN, but UX/CX present -> Error
        const uxCx = rows.filter(r => isUxCx(getAI(r)));
        if (uxCx.length) {
          totalErrors += uxCx.length;
          for (const r of uxCx) {
            LOG.error(`[StaffHires] SSN=${ssn} ID=${r.ID}: Error - No Hire / Rehire record exist in the file`);
          }
        }
      }
    }

    // No-SSN rows: default to (2,TRUE) so they aren't blocked
    if (noSsnRows.length) {
      await doSet(noSsnRows, { processLevel_code: '2', valid: true });
      total2true += noSsnRows.length;
    }

    LOG.info(
      `[StaffHires] New rules (run-date) applied: to S/FALSE=${totalSfalse}, to 2/TRUE=${total2true}, errors=${totalErrors}`
    );

    // ---- FINAL-HEAL: (2,false & no emp) -> (2,true)
    try {
      const healed = await UPDATE(StaffHires)
        .set({ valid: true })
        .where({ processLevel_code: '2', valid: false, personnelNoSAP: null });
      const healedCount = typeof healed === 'number'
        ? healed
        : (healed?.rowCount ?? healed?.rows ?? healed?.affectedRows ?? 0);
      LOG.info(`[StaffHires] Final-heal: set valid=true for ${healedCount} row(s) w/o personnelNoSAP`);
    } catch (e) {
      LOG.error(`[StaffHires] Final-heal failed: ${e.message}`);
    }

    return { hasError: false, continue: true };
  } finally {
    // ---- RESTORE all originally-PL=2 to (2,true)
    try {
      if (pinnedLeaderIds.length) {
        await UPDATE(StaffHires)
          .set({ processLevel_code: '2', valid: true })
          .where({ ID: { in: pinnedLeaderIds } });
        LOG.info(`[StaffHires][PIN] restore applied to ${pinnedLeaderIds.length} id(s).`);
      }
    } catch (e) {
      LOG.error(`[StaffHires][PIN] restore failed: ${e.message}`);
    }
  }
}




  _validateFieldValidations({stMandatoryFields, stBlankFields, oRecord}) {
    let hasError = false,
      aErrorLogs = [];
    for (const anyField in oRecord) {
      if (stMandatoryFields.has(anyField) && !oRecord[anyField]) {
        hasError = true;
        aErrorLogs.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_MANDT_FIELD', [anyField]),
        });
      }
      if (stBlankFields.has(anyField) && oRecord[anyField]) {
        hasError = true;
        aErrorLogs.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_BLANK_FIELD', [anyField]),
        });
      }
    }
    return {
      hasError,
      errors: aErrorLogs,
    };
  }

  _validateRates(oRecord) {
    let hasError = false,
      aErrors = [];

    const mEmpSubgroupRate = Object.freeze({
      Hourly: [2, 6, 7, 9],
      Daily: [8, 10],
      Weekly: [5],
      BiWeekly: [12],
      Salaried: [13],
    });

    const sEmpSubgroup = oRecord.employeeSubgroup;
    if (
      mEmpSubgroupRate.Hourly.includes(sEmpSubgroup) &&
      [
        oRecord.shiftRGFirst,
        oRecord.shiftOTFirst,
        oRecord.shiftDTFirst,
        oRecord.shiftRGSecond,
        oRecord.shiftOTSecond,
        oRecord.shiftDTSecond,
        oRecord.shiftRGThird,
        oRecord.shiftOTThird,
        oRecord.shiftDTThird,
      ].includes('00.00')
    ) {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('ERR_RATE_MISSING_HOURLY'),
      });
    } else if (mEmpSubgroupRate.Daily.includes(sEmpSubgroup) && oRecord.dailyRate === '00.00') {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('ERR_RATE_MISSING_DAILY'),
      });
    } else if (mEmpSubgroupRate.Weekly.includes(sEmpSubgroup) && oRecord.weeklySalary === '00.00') {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('ERR_RATE_MISSING_WEEKLY'),
      });
    } else if (
      mEmpSubgroupRate.BiWeekly.includes(sEmpSubgroup) &&
      oRecord.biWeeklySalary === '00.00'
    ) {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('ERR_RATE_MISSING_BIWEEKLY'),
      });
    } else if (
      mEmpSubgroupRate.Salaried.includes(sEmpSubgroup) &&
      oRecord.monthlySalary === '00.00'
    ) {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('ERR_RATE_MISSING_SALARIED'),
      });
    }

    return {
      hasError,
      errors: aErrors,
    };
  }

  _validateWorkNexusDeployment(oRecord) {
    // if (oRecord.workNexusIndicator && oRecord.wnWork && oRecord.wnWork?.startsWith('WO-')) {
    //   return {
    //     hasError: true,
    //     errors: [
    //       {
    //         record_ID: oRecord.ID,
    //         message: cds.i18n.messages.at('ERR_WN_DEPLOYMENT'),
    //       },
    //     ],
    //   };
    // }
    if (oRecord.workNexusIndicator) {// Only check if the main indicator is set
    
    if (!oRecord.wnWork) {
        return {
            hasError: true,
            errors: [
                {
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_WN'),
                },
            ],
        };
    }
    if (String(oRecord.wnWork).startsWith('WO-')) {
        return {
            hasError: true,
            errors: [
                {
                    record_ID: oRecord.ID,
                    message: cds.i18n.messages.at('ERR_WN_DEPLOYMENT'),
                },
            ],
        };
    }
}
    return {
      hasError: false,
      errors: [],
    };
  }

  _validateSalesContract(oRecord, aSalesContracts) {
    let hasError = false,
      aErrors = [];

    // Find salescontract based record;
    const oSalesContract = aSalesContracts.find((sc) => oRecord.contractNo === sc.SalesContract); // CHECK if padding needs to be done
    if (!oSalesContract) {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'),
      });
    } else {
      if (oSalesContract.DistributionChannel !== oRecord.payroll) {
        hasError = true;
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_SALES_CONTRACT_DC', [oRecord.payroll]),
        });
      }
      if (oSalesContract.SalesOrganization !== oRecord.companyCode) {
        hasError = true;
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_SALES_CONTRACT_SO', [oRecord.companyCode]),
        });
      }
      if (oSalesContract.SoldToParty !== oRecord.soldToParty) {
        hasError = true;
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_SALES_CONTRACT_STP', [oRecord.soldToParty]),
        });
      }
    }

    return {
      hasError,
      errors: aErrors,
    };
  }

  _validatePartnerFunction(oRecord, aPartnerFunctions) {
    let hasError = false,
      aErrors = [];

    const oBillTo = aPartnerFunctions.find(
      (pf) =>
        pf?.Customer === oRecord.soldToParty &&
        pf?.SalesOrganization === oRecord.companyCode &&
        pf?.PartnerFunction === 'Z1' &&
        pf?.BPCustomerNumber === oRecord.billToParty,
    );

    if (!oBillTo) {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('ERR_BP_CUSTOMER_NOT_DEFINED', [
          oRecord.billToParty,
          oRecord.soldToParty,
        ]),
      });
    }

    return {
      hasError,
      errors: aErrors,
    };
  }

  _validateTaxArea(oRecord) {
    let hasError = false,
      aErrors = [];

    if (!['2200', '2500', '2100'].includes(oRecord.companyCode)) {
      if (oRecord.workTaxAreaState !== oRecord.region) {
        hasError = true;
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_WORK_TAX_AREA_STATE_MISMATCH', [
            oRecord.workTaxAreaState,
            oRecord.region,
          ]),
        });
      }

      if (oRecord.workTaxAreaState !== oRecord.workerCompState) {
        hasError = true;
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_WORK_TAX_AREA_COMP_STATE_MISMATCH', [
            oRecord.workTaxAreaState,
            oRecord.workerCompState,
          ]),
        });
      }

      if (oRecord.residentTaxAreaState !== oRecord.homeRegion) {
        hasError = true;
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_RESIDENT_TAX_AREA_STATE_MISMATCH', [
            oRecord.residentTaxAreaState,
            oRecord.homeRegion,
          ]),
        });
      }

      // TODO: Warning messages
    }

    return {
      hasError,
      errors: aErrors,
    };
  }

    /**
   * Level S – Awaiting Employee Replication (S/4 check)
   * Rules:
   *  - Success → set next step (T) & valid=true
   *  - Not replicated yet → keep at S & valid=false (log: "Employee not Replicated In S/4")
   *  - Fail (missing data/API error) → set Level 2 & valid=false
   */
// ===== StaffHires: Hiredinsuccessfactors (S-step check; never change step, only valid) =====
async Hiredinsuccessfactors(sProcessCode, bBreakExecution) {
  const LOG = this.LOG || console;
  const trim = v => (v ?? '').toString().trim();
  const uniq = arr => [...new Set(arr.map(String))];
  const { SELECT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');

  LOG.info(`[StaffHires] Starting Hiredinsuccessfactors (Step '${sProcessCode}')`);

  // ---- PIN: snapshot current PL=2 leaders (for safety restore)
  const fileIdsInScope = uniq((this.records || []).map(r => r.file_ID).filter(Boolean));
  let pinnedLeaderIds = [];
  try {
    if (fileIdsInScope.length) {
      const snap = await SELECT.from(StaffHires)
        .columns('ID')
        .where({ file_ID: { in: fileIdsInScope }, processLevel_code: '2' });
      pinnedLeaderIds = (snap || []).map(r => String(r.ID));
      LOG.info(`[StaffHires][PIN] snapshot PL=2 leaders: ${pinnedLeaderIds.length} id(s).`);
    }
  } catch (e) {
    LOG.error(`[StaffHires][PIN] snapshot failed: ${e.message}`);
  }

  try {
    // 1) Selection: ONLY what UI intended this click to process
    const aRecordsForProcessing = [];
    const aSkippedRecords = [];
    for (const rec of (this.records || [])) {
      if (this.shouldRecordProcess(rec, sProcessCode)) aRecordsForProcessing.push({ ...rec });
      else aSkippedRecords.push({ ...rec });
    }
    this.updateProcessingState(sProcessCode);
    if (!aRecordsForProcessing.length) {
      LOG.info('[StaffHires] No records to process at this step.');
      return { hasError: false, continue: true };
    }

    const selectedIds = new Set(aRecordsForProcessing.map(r => String(r.ID)));
    const aErrorLogs = [];
    const aPassedRecordIDs = [];
    const aFailedRecordIDs = [];

    // 2) PREFILL for selected S rows: copy personnelNoSAP by SSN (leaders → S duplicates), and then EmpCustInfo
    try {
      if (fileIdsInScope.length) {
        const siblingRows = await SELECT.from(StaffHires)
          .columns(['ID','file_ID','processLevel_code','valid','ssn','personnelNoSAP'])
          .where({ file_ID: { in: fileIdsInScope } });

        const mSsnToEmp = new Map();
        (siblingRows || []).forEach(r => {
          const emp = trim(r.personnelNoSAP);
          if (!emp) return;
          const s = trim(r.ssn);
          if (s && !mSsnToEmp.has(s)) mSsnToEmp.set(s, emp);
        });

        const toFill = (siblingRows || [])
          .filter(r =>
            r.processLevel_code === sProcessCode &&
            !trim(r.personnelNoSAP) &&
            selectedIds.has(String(r.ID))
          )
          .map(r => {
            const emp = mSsnToEmp.get(trim(r.ssn));
            return emp ? { id: r.ID, emp } : null;
          })
          .filter(Boolean);

        if (toFill.length) {
          await Promise.allSettled(
            toFill.map(x =>
              UPDATE(StaffHires)
                .set({ personnelNoSAP: x.emp })
                .where({ ID: x.id, processLevel_code: sProcessCode }) // HARD GUARD: keep step
            )
          );
          const justFilled = new Map(toFill.map(x => [String(x.id), x.emp]));
          for (const r of this.records) {
            const emp = justFilled.get(String(r.ID));
            if (emp) r.personnelNoSAP = emp;
          }
          toFill.forEach(x => aErrorLogs.push({
            record_ID: x.id,
            message: `Employee number ${x.emp} copied from leader (S step; ssn match).`
          }));
          aPassedRecordIDs.push(...toFill.map(x => x.id));
          LOG.info(`[StaffHires][S] Filled personnelNoSAP for ${toFill.length} selected duplicate row(s) (by ssn).`);
        } else {
          LOG.info('[StaffHires][S] No selected duplicates needed personnel copy (by ssn).');
        }

        const stillBlankSelectedSSNs = (siblingRows || [])
          .filter(r =>
            r.processLevel_code === sProcessCode &&
            !trim(r.personnelNoSAP) &&
            selectedIds.has(String(r.ID))
          )
          .map(r => trim(r.ssn)).filter(Boolean);

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
              const s = trim(r.SSN), w = trim(r.WORKER_ID);
              if (s && w && !mECI.has(s)) mECI.set(s, w);
            });

            const toFillECI = (siblingRows || [])
              .filter(r =>
                r.processLevel_code === sProcessCode &&
                !trim(r.personnelNoSAP) &&
                selectedIds.has(String(r.ID))
              )
              .map(r => {
                const emp = mECI.get(trim(r.ssn));
                return emp ? { id: r.ID, emp } : null;
              })
              .filter(Boolean);

            if (toFillECI.length) {
              await Promise.allSettled(
                toFillECI.map(x =>
                  UPDATE(StaffHires)
                    .set({ personnelNoSAP: x.emp })
                    .where({ ID: x.id, processLevel_code: sProcessCode }) // HARD GUARD
                )
              );
              const justFilled2 = new Map(toFillECI.map(x => [String(x.id), x.emp]));
              for (const r of this.records) {
                const emp = justFilled2.get(String(r.ID));
                if (emp) r.personnelNoSAP = emp;
              }
              toFillECI.forEach(x => aErrorLogs.push({
                record_ID: x.id,
                message: `Employee number ${x.emp} copied from EmpCustInfo (S step; ssn).`
              }));
              aPassedRecordIDs.push(...toFillECI.map(x => x.id));
              LOG.info(`[StaffHires][S] Filled personnelNoSAP for ${toFillECI.length} selected row(s) from EmpCustInfo.`);
            }
          } catch (e) {
            LOG.error(`[StaffHires][S] EmpCustInfo supplemental fill failed: ${e.message}`);
          }
        }
      }
    } catch (e) {
      LOG.error(`[StaffHires][S] Prefill by ssn failed: ${e.message}`);
    }

    // 3) S/4 replication check — NEVER change step, only flip valid
    for (const rec of aRecordsForProcessing) {
      try {
        const emp = trim(rec.personnelNoSAP);
        if (!emp) {
          await UPDATE(StaffHires)
            .set({ valid: false })
            .where({ ID: rec.ID, processLevel_code: sProcessCode }); // stay at S
          aFailedRecordIDs.push(rec.ID);
          aErrorLogs.push({ record_ID: rec.ID, message: 'Employee not yet created in S/4 (no personnel number found).' });
          continue;
        }

        const res = await this.workforceAPI.executeQuery(
          SELECT.from('YY1_workforce_cds')
            .columns(['WorkforcePersonExternalID'])
            .where({ WorkforcePersonExternalID: emp })
        );
        const replicated = Array.isArray(res) && res.length > 0;

        if (replicated) {
          await UPDATE(StaffHires)
            .set({ valid: true })
            .where({ ID: rec.ID, processLevel_code: sProcessCode }); // stay at S
          aPassedRecordIDs.push(rec.ID);
        } else {
          await UPDATE(StaffHires)
            .set({ valid: false })
            .where({ ID: rec.ID, processLevel_code: sProcessCode }); // stay at S
          aFailedRecordIDs.push(rec.ID);
          aErrorLogs.push({ record_ID: rec.ID, message: 'Employee not Replicated In S/4' });
        }
      } catch (e) {
        // transport/service error → keep S/false, no demotion
        try {
          await UPDATE(StaffHires)
            .set({ valid: false })
            .where({ ID: rec.ID, processLevel_code: sProcessCode }); // stay at S
        } catch (_) {}
        aFailedRecordIDs.push(rec.ID);
        aErrorLogs.push({ record_ID: rec.ID, message: `S/4 replication check failed: ${e.message}` });
        LOG.error(`[StaffHires][S] check error for ${rec.ID}: ${e.message}`);
      }
    }

    // 4) Logs + valid flags
    if (aErrorLogs.length) await ProcessLogger.addLogs(aErrorLogs);
    if (aPassedRecordIDs.length) {
      await ProcessLogger.removeLogs(aPassedRecordIDs);
      this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
    }
    if (aFailedRecordIDs.length) this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);

    // 5) Exclusion set
    this.updateExclusionSet({
      passed: aPassedRecordIDs,
      failed: aFailedRecordIDs,
      skipped: aSkippedRecords,
      bBreakExecution,
    });

    LOG.info(
      `[StaffHires] Step ${sProcessCode} summary → passed: ${aPassedRecordIDs.length}, failed: ${aFailedRecordIDs.length}, skipped: ${aSkippedRecords.length}`
    );

    return { hasError: aFailedRecordIDs.length > 0, continue: aFailedRecordIDs.length === 0 };
  } finally {
    // ---- RESTORE all originally-PL=2 to (2,true)
    try {
      if (pinnedLeaderIds.length) {
        await UPDATE(StaffHires)
          .set({ processLevel_code: '2', valid: true })
          .where({ ID: { in: pinnedLeaderIds } });
        LOG.info(`[StaffHires][PIN] restore applied to ${pinnedLeaderIds.length} id(s).`);
      }
    } catch (e) {
      LOG.error(`[StaffHires][PIN] restore failed: ${e.message}`);
    }
  }
}


  async processProject(sProcessCode, bBreakExecution) {
    this.LOG._info && this.LOG.info('Logging _processProject');

    let aRecordsForProcessing = [],
      aSkippedRecords = [],
      aErrorLogs = [],
      aPassedRecordIDs = [],
      aFailedRecordIDs = [];

    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode)) {
        // If record is on step level & is already valid, then skip
        aRecordsForProcessing.push({...record});
      } else {
        aSkippedRecords.push({...record});
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

    if (sProcessCode === '4') {
      // Step 1: check the records having employee ID or not

      let aPayloads = aRecordsForProcessing.map((record) => ({
        EnterpriseProjectType: 'SP',
        CompanyCode: record.companyCode,
        ProfitCenter: record.salesOffice,
        // ProfitCenter: '1227',
        // ProfitCenter: '1340',
        ProjectDescription: `${record.salesOffice}-${record.personnelNoSAP}`,
        ResponsibleCostCenter: `${record.companyCode}${record.salesOffice}`,
        // ResponsibleCostCenter: '12001227',
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
          let insertedProject = await this.enterpriseProjectAPI.executeQuery(
            INSERT.into('A_EnterpriseProject').entries(aPayloads[i]),
          );
          let releaseProject = await this.enterpriseProjectAPI.releaseProject(
            insertedProject.ProjectUUID,
            "10"
          );
          if (insertedProject.Project) {
            // this.records[i].projectNumberSAP = insertedProject.Project;
            // this.records[i].projectUUID = insertedProject.ProjectUUID;

            aRecordsForProcessing[i].projectNumberSAP = insertedProject.Project;
            aRecordsForProcessing[i].projectUUID = insertedProject.ProjectUUID;

            const item = this.records.find((record) => record.ID === aRecordsForProcessing[i].ID);
            if (item) {
              item.projectNumberSAP = insertedProject.Project;
              item.projectUUID = insertedProject.ProjectUUID;
            }

            let releaseProject = await this.enterpriseProjectAPI.releaseProject(
              insertedProject.ProjectUUID,
              "10"
            );
            
            if (releaseProject.error || releaseProject.message) {
              aErrorLogs.push({
                record_ID: aRecordsForProcessing[i].ID,
                message: `Project created but release failed: ${releaseProject.message || 'Unknown error'}`,
              });
              aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
              LOG.error(
                `Error releasing project for record ID ${aRecordsForProcessing[i].ID}: ${releaseProject.message || 'Unknown error'}`,
              );
            } else{

            await UPDATE('MonitorService.StaffHires')
              .set({
                projectNumberSAP: insertedProject.Project,
                projectUUID: insertedProject.ProjectUUID,
                valid: true,
                processLevel_code: sProcessCode,
              })
              .where({ID: aRecordsForProcessing[i].ID});

            aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
            }
          } else {
            aErrorLogs.push({
              record_ID: aRecordsForProcessing[i].ID,
              message: `${insertedProject.message}`,
            });
            aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
            LOG.error(
              `Error processing record ID ${aRecordsForProcessing[i]}: ${insertedProject.message}`,
            );
          }
        }
      } catch (error) {
        LOG.error(`Critical error in _processProject: ${error.message}`, {error});
      }
    } else if (sProcessCode === 'E') {
      for (let i = 0; i <= this.records.length; i++) {
        let updatedProject = await this.enterpriseProjectAPI.updateProject(
          this.records[i].projectUUID,
          this.records[i].salesDocumentNoSAP,
        );
        if (updatedProject.message) {
          aErrorLogs.push({
            record_ID: this.records[i].ID,
            message: `${updatedProject.message}`,
          });
          aFailedRecordIDs.push(this.records[i].ID);
          LOG.error(`Error processing record ID ${this.records[i].ID}: ${updatedProject.message}`);
        } else {
          await UPDATE('MonitorService.StaffHires')
            .set({
              valid: true,
              processLevel_code: sProcessCode,
            })
            .where({ID: this.records[i].ID});

          aPassedRecordIDs.push(this.records[i].ID);
        }
      }
    }

    if (aErrorLogs.length) {
      await ProcessLogger.addLogs(aErrorLogs);
      await UPDATE(StaffHires)
        .set({valid: false, processLevel_code: sProcessCode})
        .where({ID: {in: aFailedRecordIDs}});
    }

    if (aPassedRecordIDs.length) {
      await ProcessLogger.removeLogs(aPassedRecordIDs);
       this.markRecordsValid(sProcessCode, aPassedRecordIDs, true)
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

  async updateInfotype(sProcessCode, bBreakExecution) {
    this.LOG._info && this.LOG.info('Logging _updateInfotype');

    let aRecordsForProcessing = [],
      aSkippedRecords = [],
      aErrorLogs = [],
      aPassedRecordIDs = [],
      aFailedRecordIDs = [];

    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode)) {
        aRecordsForProcessing.push({...record});
      } else {
        aSkippedRecords.push({...record});
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

    // let aPayloads = aRecordsForProcessing.map((record) => ({
    //   WORKER_ID: record.personnelNoSAP,
    //   Name: `${record.lastName}-${record.firstName}`,
    //   SSN: record.ssn,
    //   EMP_GRP: record.employeeGroup,
    //   EMP_SUBGRP: record.employeeSubgroup,
    //   START_DATE: moment(record.beginDate).format('YYYY-MM-DD'),
    //   END_DATE: moment(record.beginDate).add(10, 'years').format('YYYY-MM-DD'),
    //   CONTRAT_SAP: record.contractNo,
    //   SALES_ORD_SAP: '0',
    //   PROJECT_ID: record.projectNumberSAP,
    //   PROJECT_NAME: `${record.salesOffice}-${record.personnelNoSAP}`,
    //   CUSTOMER_ID: record.soldToParty,
    //   SS_ORDER: record.workOrderDoc,
    //   WN_ORDER: record.workNexusIndicator === 'X' ? record.wnWork : record.workOrderDoc,
    //   POSITION_ID: record.plansSAP,
    //   ZPAYROLL: record.payroll === 'CR' ? 'RECRUITED' : 'PAYROLL',
    //   RECRID: record.recruiterEmployeeNo,
    //   ZTIME_IND: record.workNexusIndicator === 'X' ? 'Yes' : 'No',
    //   ZHIRE_ACTION: record.hireAct === 'X' ? 'Yes' : 'No',
    //   ACTION_TYPE: record.actionIndicator,
    //   T_REASON: record.actionReason,
    //   CreatedOn: moment().format('YYYY-MM-DD'),
    // }));

    let aPayloads = aRecordsForProcessing.map((record) => {
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
      let zPayroll = 'NON-PAYROLL';
      if (['CP', 'BP', 'DP'].includes(record.payroll)) {
        zPayroll = 'PAYROLL';
      } else if (record.payroll === 'CR') {
        zPayroll = 'RECRUITED';
      }

      // Determine ZTIME_IND and WN_ORDER
      let zTimeInd = 'No';
      let wnOrder = record.workOrderDoc;
      if (record.workNexusIndicator === 'X') {
        zTimeInd = 'Yes';
        wnOrder = record.wnWork;
      }

      return {
        WORKER_ID: record.personnelNoSAP,        
        Name: record.lastName,
        FirstName: record.firstName,
        MiddleName: record.middleName || '',
        WorkScheduleRule: record.workScheduleRule || '',
        WorkScheduleType: record.workScheduleType || '',
        EmployeePersonnelArea: personnelSubArea,
        EmploymentType: record.payroll,
        SSN: record.ssn,
        EMP_GRP: record.employeeGroup,
        EMP_SUBGRP: record.employeeSubgroup,
        START_DATE: moment(record.beginDate).format('YYYY-MM-DD'),
        END_DATE: '9999-12-31',
        CONTRAT_SAP: record.contractNo,
        SALES_ORD_SAP: record.salesDocumentNoSAP||'0000000000',
        PROJECT_ID: record.projectNumberSAP,
        PROJECT_NAME: `${record.soldToParty}-${record.personnelNoSAP}`,
        CUSTOMER_ID: record.billToParty||'0',
        SS_ORDER: record.workOrderDoc,
        WN_ORDER: record.workNexusIndicator ? record.wnWork : record.workOrderDoc,
        POSITION_ID: record.plansSAP,
        JOB_ID: null,
        ZPAYROLL: zPayroll,
        RECRID: record.recruiterEmployeeNo,
        ZTIME_IND: record.workNexusIndicator ? 'Yes' : 'No',
        ZHIRE_ACTION: record.hireAct === 'X' ? 'Yes' : 'No',
        ACTION_TYPE: record.actionIndicator,
        T_REASON: '',
        ZHRREPT: '',
        CreatedOn: moment().format('YYYY-MM-DD')
      };
    });

    for (let i = 0; i < aPayloads.length; i++) {
      let CustomerInfo = await this.empCustInfoAPI.executeQuery(
        INSERT.into('YY1_EMPLOYEE_CUSTOMER_INFO').entries(aPayloads[i]),
      );
      if (CustomerInfo.PROJECT_ID) {
        await UPDATE(StaffHires)
          .set({
            valid: true,
            processLevel_code: sProcessCode,
          })
          .where({ID: aRecordsForProcessing[i].ID});

        aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
      } else {
        aErrorLogs.push({
          record_ID: aRecordsForProcessing[i].ID,
          message: `${CustomerInfo.message}`,
        });
        aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
        LOG.error(
          `Error processing record ID ${aRecordsForProcessing[i].ID}: ${CustomerInfo.message}`,
        );
      }
    }

    if (aErrorLogs.length) {
      await ProcessLogger.addLogs(aErrorLogs);
      await UPDATE(StaffHires)
        .set({valid: false, processLevel_code: sProcessCode})
        .where({ID: {in: aFailedRecordIDs}});
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

  // async processHrCostDistObj(sProcessCode, bBreakExecution) {
  //   this.LOG._info && this.LOG.info('Logging _processHrCostDistObj');

  //   let aRecordsForProcessing = [],
  //       aSkippedRecords = [],
  //       aErrorLogs = [],
  //       aPassedRecordIDs = [],
  //       aFailedRecordIDs = [];

  //   for (const record of this.records) {
  //     if (this.shouldRecordProcess(record, sProcessCode)) {
  //       aRecordsForProcessing.push({...record});
  //     } else {
  //       aSkippedRecords.push({...record});
  //       continue;
  //     }
  //   }

  //   this.updateProcessingState(sProcessCode);
  //   if (!aRecordsForProcessing.length) {
  //     return {
  //       hasError: false,
  //       continue: true,
  //     };
  //   }

  //   // let aHRPayloads = aRecordsForProcessing.map(record => ({
  //   //   WorkerID: record.personnelNoSAP || '15000609' ,
  //   //   StartDate: moment(record.beginDate).format('YYYY-MM-DD'),
  //   //   EndDate: moment(record.beginDate).add(10, 'years').format('YYYY-MM-DD'),
  //   //   CompanyCode1: record.companyCode,
  //   //   CompanyCode1_Text: record.companyCodeDescription || '',
  //   //   Project1: record.projectNumberSAP,
  //   //   Percentage1: '100.00'
  //   // }));

  //   // for (let i = 0; i < aHRPayloads.length; i++) {
  //   //   let HRCostObj = await this.HrCostDistObjAPI.executeQuery(
  //   //     INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(aHRPayloads[i])
  //   //   );
  //   //   if (HRCostObj && !HRCostObj.error) {
  //   //     await UPDATE(StaffHires)
  //   //       .set({
  //   //         valid: true,
  //   //         processLevel_code: sProcessCode,
  //   //       })
  //   //       .where({ID: aRecordsForProcessing[i].ID});
  //   //     aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
  //   //   } else {
  //   //     aErrorLogs.push({
  //   //       record_ID: aRecordsForProcessing[i].ID,
  //   //       message: HRCostObj ? HRCostObj.message : 'Unknown error',
  //   //     });
  //   //     aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
  //   //     LOG.error(
  //   //       `Error processing record ID ${aRecordsForProcessing[i].ID}: ${HRCostObj ? HRCostObj.message : 'Unknown error'}`,
  //   //     );
  //   //   }
  //   // }

  //   // Create TWO inserts per record, SEQUENTIALLY (CostDistribution '1' then '2')
  //   for (let i = 0; i < aRecordsForProcessing.length; i++) {
  //     const rec = aRecordsForProcessing[i];

  //     // Base payload (same as before)
  //     const base = {
  //       WorkerID: rec.personnelNoSAP || '15000609',
  //       StartDate: moment(rec.beginDate).format('YYYY-MM-DD'),
  //       // EndDate: moment(rec.beginDate).add(10, 'years').format('YYYY-MM-DD'),
  //       EndDate: '9999-12-31',
  //       CompanyCode1: rec.companyCode,
  //       CompanyCode1_Text: rec.companyCodeDescription || '',
  //       Project1: rec.projectNumberSAP,
  //       Percentage1: '100.00',
  //     };

  //     let ok1 = false, ok2 = false;
  //     let msg1 = '', msg2 = '';

  //     // 1) Insert CostDistribution = '1'
  //     try {
  //       const r1 = await this.HrCostDistObjAPI.executeQuery(
  //         INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries({ ...base, CostDistribution: '01' })
  //       );
  //       ok1 = r1 && !r1.error;
  //       if (!ok1) msg1 = r1?.message || 'Unknown error';
  //     } catch (e) {
  //       msg1 = e?.message || 'Unknown error';
  //     }

  //     // 2) Then insert CostDistribution = '2'
  //     try {
  //       const r2 = await this.HrCostDistObjAPI.executeQuery(
  //         INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries({ ...base, CostDistribution: '02' })
  //       );
  //       ok2 = r2 && !r2.error;
  //       if (!ok2) msg2 = r2?.message || 'Unknown error';
  //     } catch (e) {
  //       msg2 = e?.message || 'Unknown error';
  //     }

  //     if (ok1 && ok2) {
  //       await UPDATE(StaffHires)
  //         .set({ valid: true, processLevel_code: sProcessCode })
  //         .where({ ID: rec.ID });
  //       aPassedRecordIDs.push(rec.ID);
  //     } else {
  //       aErrorLogs.push({
  //         record_ID: rec.ID,
  //         message:
  //           `CostDistribution insert failed: ` +
  //           `${ok1 ? '' : '[1] ' + (msg1 || 'Unknown error')} ` +
  //           `${ok2 ? '' : '[2] ' + (msg2 || 'Unknown error')}`.trim(),
  //       });
  //       aFailedRecordIDs.push(rec.ID);
  //       LOG.error(
  //         `Error processing record ID ${rec.ID}: ` +
  //         `${ok1 ? '' : '[CostDistribution=1] ' + (msg1 || 'Unknown error')} ` +
  //         `${ok2 ? '' : '[CostDistribution=2] ' + (msg2 || 'Unknown error')}`.trim()
  //       );
  //     }
  //   }


  //   if (aErrorLogs.length) {
  //     await ProcessLogger.addLogs(aErrorLogs);
  //     await UPDATE(StaffHires)
  //       .set({valid: false, processLevel_code: sProcessCode})
  //       .where({ID: {in: aFailedRecordIDs}});
  //   }

  //   if (aPassedRecordIDs.length) {
  //     await ProcessLogger.removeLogs(aPassedRecordIDs);
  //   }

  //   this.updateExclusionSet({
  //     passed: aPassedRecordIDs,
  //     failed: aFailedRecordIDs,
  //     skipped: aSkippedRecords,
  //     bBreakExecution,
  //   });

  //   return {
  //     hasError: aFailedRecordIDs.length > 0,
  //     continue: aFailedRecordIDs.length === 0,
  //   };
  // }

  async processHrCostDistObj(sProcessCode, bBreakExecution) {
    this.LOG._info && this.LOG.info('Logging _processHrCostDistObj');

    let aRecordsForProcessing = [],
      aSkippedRecords = [],
      aErrorLogs = [],
      aPassedRecordIDs = [],
      aFailedRecordIDs = [];

    let aRecordIDs = [];

    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode)) {
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
      return {
        hasError: false,
        continue: true,
      };
    }

    // Create two inserts per record with CostDistribution: '01' and '02'  
    for (let i = 0; i < aRecordsForProcessing.length; i++) {
      const rec = aRecordsForProcessing[i];
      const newStartDate = moment(rec.beginDate).format('YYYY-MM-DD');
      
      try {
        // Query for existing records where StartDate < newStartDate and EndDate > newStartDate
        const existingRecords = await this.HrCostDistObjAPI.executeQuery(
          SELECT.from('YY1_HRCOSTDISTRIBUTIONOBJ')
            .where({
              WorkerID: rec.personnelNoSAP,
              StartDate: { '<': newStartDate },
              EndDate: { '>': newStartDate }
            })
        );

        let allOperationsSuccess = true;
        const errors = [];

        // Base payload for new records
        const base = {
          WorkerID: rec.personnelNoSAP,
          StartDate: newStartDate,
          EndDate: '9999-12-31',
          CompanyCode1: rec.companyCode,
          CompanyCode1_Text: rec.companyCodeDescription || '',
          Project1: rec.projectNumberSAP,
          Percentage1: '100.00',
        };

        if (existingRecords && existingRecords.length > 0) {
          // Existing records found - need to close them and create new ones
          this.LOG._info && this.LOG.info(`Found ${existingRecords.length} existing records for WorkerID ${rec.personnelNoSAP}`);
          
          // Calculate the end date for existing records (new start date - 1 day)
          const closingEndDate = moment(rec.beginDate).subtract(1, 'days').format('YYYY-MM-DD');
          
          // Get the original StartDate from the first existing record (all should have same StartDate)
          const originalStartDate = existingRecords[0].StartDate;

          try {
            // Step 1: Delete ALL existing records FIRST to avoid key conflicts
            for (const existingRec of existingRecords) {
              if (existingRec.SAP_UUID) {
                const deleteExisting = await this.HrCostDistObjAPI.executeQuery(
                  DELETE.from('YY1_HRCOSTDISTRIBUTIONOBJ').where({ SAP_UUID: existingRec.SAP_UUID })
                );

                if (deleteExisting?.error || deleteExisting?.message) {
                  allOperationsSuccess = false;
                  errors.push(`Failed to delete existing record (UUID: ${existingRec.SAP_UUID}): ${deleteExisting?.message || 'Unknown error'}`);
                  this.LOG._error && this.LOG.error(`Failed to delete existing record with UUID ${existingRec.SAP_UUID}`);
                }
              }
            }

            // Only proceed with inserts if all deletions were successful
            if (allOperationsSuccess) {
              // Step 2: Create ONE set of closed records with original StartDate and closing EndDate
              const closedRecord1 = {
                ...base,
                StartDate: originalStartDate,
                EndDate: closingEndDate,
                CostDistribution: '01'
              };
              
              const insertClosed1 = await this.HrCostDistObjAPI.executeQuery(
                INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(closedRecord1)
              );

              if (insertClosed1?.error || insertClosed1?.message) {
                allOperationsSuccess = false;
                errors.push(`Failed to close existing record with CostDistribution 01: ${insertClosed1?.message || 'Unknown error'}`);
              }

              const closedRecord2 = {
                ...base,
                StartDate: originalStartDate,
                EndDate: closingEndDate,
                CostDistribution: '02'
              };
              
              const insertClosed2 = await this.HrCostDistObjAPI.executeQuery(
                INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(closedRecord2)
              );

              if (insertClosed2?.error || insertClosed2?.message) {
                allOperationsSuccess = false;
                errors.push(`Failed to close existing record with CostDistribution 02: ${insertClosed2?.message || 'Unknown error'}`);
              }

              const newRecord1 = {
                ...base,
                CostDistribution: '01'
              };

              const insertNew1 = await this.HrCostDistObjAPI.executeQuery(
                INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(newRecord1)
              );

              if (insertNew1?.error || insertNew1?.message) {
                allOperationsSuccess = false;
                errors.push(`Failed to insert new record with CostDistribution 01: ${insertNew1?.message || 'Unknown error'}`);
              }

              const newRecord2 = {
                ...base,
                CostDistribution: '02'
              };

              const insertNew2 = await this.HrCostDistObjAPI.executeQuery(
                INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(newRecord2)
              );

              if (insertNew2?.error || insertNew2?.message) {
                allOperationsSuccess = false;
                errors.push(`Failed to insert new record with CostDistribution 02: ${insertNew2?.message || 'Unknown error'}`);
              }
            }

          } catch (err) {
            allOperationsSuccess = false;
            errors.push(`Exception processing existing records: ${err.message}`);
            this.LOG._error && this.LOG.error(`Error processing existing records: ${err.message}`);
          }
        } else {
          // No existing records found - create new records with CostDistribution '01' and '02'
          const [ins1, ins2] = await Promise.allSettled([
            this.HrCostDistObjAPI.executeQuery(
              INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries({ ...base, CostDistribution: '01' })
            ),
            this.HrCostDistObjAPI.executeQuery(
              INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries({ ...base, CostDistribution: '02' })
            ),
          ]);

          const ok1 = ins1.status === 'fulfilled' && !ins1.value?.error;
          const ok2 = ins2.status === 'fulfilled' && !ins2.value?.error;

          if (!ok1 || !ok2) {
            allOperationsSuccess = false;
            const msg1 = ins1.status === 'rejected' ? ins1.reason?.message : ins1.value?.message;
            const msg2 = ins2.status === 'rejected' ? ins2.reason?.message : ins2.value?.message;
            
            if (!ok1) errors.push(`[CostDistribution 01] ${msg1 || 'Unknown error'}`);
            if (!ok2) errors.push(`[CostDistribution 02] ${msg2 || 'Unknown error'}`);
          }
        }

        if (allOperationsSuccess) {
          await UPDATE(StaffHires)
            .set({ valid: true, processLevel_code: sProcessCode })
            .where({ ID: rec.ID });
          aPassedRecordIDs.push(rec.ID);
        } else {
          let errorMessage = 'CostDistribution operation failed: ';
          if (errors.length > 0) errorMessage += errors.join(', ');

          aErrorLogs.push({
            record_ID: rec.ID,
            message: errorMessage.trim(),
          });
          aFailedRecordIDs.push(rec.ID);

          LOG.error(`Error processing record ID ${rec.ID}: ${errorMessage.trim()}`);
        }
      } catch (err) {
        aErrorLogs.push({
          record_ID: rec.ID,
          message: `Exception in processHrCostDistObj: ${err.message}`,
        });
        aFailedRecordIDs.push(rec.ID);
        this.LOG._error && this.LOG.error(`Exception processing record ID ${rec.ID}: ${err.message}`);
      }
    }

    if (aErrorLogs.length) {
      await ProcessLogger.addLogs(aErrorLogs);
      await UPDATE(StaffHires)
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
}

module.exports = EmployeeStaff;
