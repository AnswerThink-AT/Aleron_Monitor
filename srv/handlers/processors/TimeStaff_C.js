
// Interface C
const cds = require('@sap/cds');
const moment = require('moment');
const LOG = cds.log('Monitor.Processor-Time Contractor 3');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');

const EmpTimeDataComm = require('../communicators/EmpTimeData');
const SalesContractComm = require('../communicators/SalesContract');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');

// const { UPDATE, SELECT } = require('@sap/cds/lib/ql/cds-ql');
const { UPDATE, SELECT, INSERT } = require('@sap/cds/lib/ql/cds-ql');
const { or } = require('@sap-cloud-sdk/odata-v2');

// List of required entities
// const {
//   Times,
//   FieldValidations,
//   FieldValidations: {
//     elements: {
//       validation: {enum: mFieldValidationTypeEnum},
//     },
//   },
// } = cds.entities('com.aleron.monitor');

class TimeStaff_C extends Processor {
    constructor(options) {
      super(options);
      this.recordsEntity = 'com.aleron.monitor.Times';
      this.LOG = cds.log('Monitor.Processor-TimeContractor 3');
      this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

      // Communicators used by TimeContractor 3 Processor
      this.salesContractAPI = null;
      this.enterpriseProjectAPI = null;
    }

    prepareCommunicators() {
      this.LOG._info && this.LOG.info('Preparing Communicators');
      this.salesContractAPI = new SalesContractComm();
      this.enterpriseProjectAPI = new EnterpriseProjectComm();
      this.empTimeDataAPI = new EmpTimeDataComm();
    }

    _getColumnsForFetch(sEntity) {
      const mEntityColumns = {
        'com.aleron.monitor.Times': [
        'ID', 'file_ID', 'processLevel_code', 'valid',
        'contractNo',
        'legacyContractNo',
        'invoiceNoWN',
        'employeeNo',
        'tempusWorkOrder',
        'salesDocumentType',
        'orderNo',
        'weekEndDate',
        'beginDate',
        'additionalDayOfWork',
        'shiftRGFirst',
        'shiftOTFirst',
        'shiftDTFirst',
        'shiftRGSecond',
        'shiftOTSecond',
        'shiftDTSecond',
        'shiftRGThird',
        'shiftOTThird',
        'shiftDTThird',
        'shiftCustomerBillRateFirst',
        'shiftCustomerOTBillRateFirst',
        'shiftCustomerDTBillRateFirst',
        'shiftCustomerBillRateSecond',
        'shiftCustomerOTBillRateSecond',
        'shiftCustomerDTBillRateSecond',
        'shiftCustomerBillRateThird',
        'shiftCustomerOTBillRateThird',
        'shiftCustomerDTBillRateThird',
        'shiftVendorPayRateFirst',
        'shiftVendorOTPayRateFirst',
        'shiftVendorDTPayRateFirst',
        'shiftVendorPayRateSecond',
        'shiftVendorOTPayRateSecond',
        'shiftVendorDTPayRateSecond',
        'shiftVendorPayRateThird',
        'shiftVendorOTPayRateThird',
        'shiftVendorDTPayRateThird',
        'laborPurchaseOrder',
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
        ]
      }

      return [...new Set(mEntityColumns[sEntity])];
    };

    async validateRecords(sProcessCode, bBreakExecution) {
      try {
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);

      const aRecordsForProcessing = [],
            aErrorLogs = [],
            aFailedRecordIDs = [],
            aPassedRecordIDs = [],
            aSkippedRecords = [];

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

      aRecordsForProcessing.forEach((oRecord) => {
        let hasRecordFailed = false;

        // Check Employee Number
        if (!oRecord.employeeNo) {
          aErrorLogs.push({
            record_ID: oRecord.ID,
            message: cds.i18n.messages.at('ERR_EMP_NUMBER_MISSING'), process_code: sProcessCode
          });
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
          return {
            hasError: true,
            continue: false,
          };
        }
      }
      if (aPassedRecordIDs.length) {
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
      } catch (err) {
        this.LOG._error && this.LOG.error(`validateRecords method error: ${err.message}`);
        return {
          hasError: true,
          continue: false,
        };
      }
    }

    async processTime(sProcessCode, bBreakExecution) {
      try {
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);

      const aRecordsForProcessing=[],
          aErrorLogs = [],
          aFailedRecordIDs = [],
          aPassedRecordIDs = [],
          aSkippedRecords = [];
      
      const aSalesContractIDs = [],
            aSalesContracts_Orgs = [],
            aEmpIDs = [],
            aProject_Emps = [],
            mSalesContracts = new Map(),
            mProjects = new Map();
      
      for (const record of this.records) {
        if (this.shouldRecordProcess(record, sProcessCode) && !record.salesDocumentNoSAP) {
          // If record is on step level & is already valid, then skip
          aRecordsForProcessing.push({...record});
        } else {
          aSkippedRecords.push({...record});
          continue;
        }

        if(record.contractNo){
          aSalesContractIDs.push(record.contractNo);
        }

        if(record.employeeNo){
          aEmpIDs.push(record.employeeNo);
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

      try{
        const [
          // {reason: anySalesContractErr, value: aSalesContracts},
          {reason: anySalesContractPrimaryErr, value: aSalesContractPrimaryResults},
          {reason: anySalesContractFallbackErr, value: aSalesContractFallbackResults},
          {reason: anyProjectErr, value: aProjects},
        ] = await Promise.allSettled([
          // Sales Contract Information
          this.salesContractAPI.executeQuery(
            SELECT.from('SalesContract')
              .columns(['SalesContract', 'SalesOffice', 'SalesOrganization'])
              .where({SalesContract: {in: [...new Set(aSalesContractIDs)]}}),
          ),
          // Fallback query using PurchaseOrderByCustomer field
          this.salesContractAPI.executeQuery(
            SELECT.from('SalesContract')
              .columns(['SalesContract', 'SalesOffice', 'SalesOrganization', 'PurchaseOrderByCustomer'])
              .where({PurchaseOrderByCustomer: {in: [...new Set(aSalesContractIDs)]}}),
          ),
          // Enterprise Project Information
          this.enterpriseProjectAPI.executeQuery(
            SELECT.from('A_EnterpriseProject')
              .columns(['YY1_Employee_PPH', 'Project'])
              .where({YY1_Employee_PPH: {in: [...new Set(aEmpIDs)]}}),
          )
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

        if (aSalesContracts.length) {
          aSalesContracts.forEach((oSalesContact) => {
            mSalesContracts.set(oSalesContact.SalesContract, oSalesContact);
          })
        }

        if (!anyProjectErr?.message && aProjects.length) {
          aProjects.forEach((oProject) => {
            mProjects.set(oProject.YY1_Employee_PPH, oProject);
          })        
        }
      }catch(err){
        // this.LOG._error & this.LOG.error(err.message);
        this.LOG._error && this.LOG.error(err.message);
        return {
          hasError: true,
          continue: false,
        };
      }

      const aPayloads = [];
      const aErrors = [];

      // aRecordsForProcessing.forEach((oRecord) => 
        for (const oRecord of aRecordsForProcessing){
        const aRecordErrors = [];

        const oSalesContractRes = await this._validateSalesContract(oRecord, mSalesContracts);
        if (oSalesContractRes.hasError) {
          oSalesContractRes.errors.forEach((error) => {
                    error.process_code = sProcessCode;
                });
          aRecordErrors.push(...oSalesContractRes.errors);
          aFailedRecordIDs.push(oRecord.ID);
          aErrorLogs.push(...aRecordErrors);
          // aErrorLogs.push(...aRecordErrors);
          continue; // Skip this record
        } else {
          // Always use the resolved contract value for further processing
          oRecord.contractNo = oSalesContractRes.updatedContract;
        }

        const oSalesContract = mSalesContracts.get(oRecord.contractNo);
        if (!oSalesContract) {
          // aRecordErrors.push({
          aRecordErrors.push({
            record_ID: oRecord.ID,
            message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'), process_code: sProcessCode
          });
          aFailedRecordIDs.push(oRecord.ID);
          aErrorLogs.push(...aRecordErrors);
          continue; // Skip this record
        }

        const oProject = mProjects.get(oRecord.employeeNo);
        if (!oProject) {
          // aRecordErrors.push({
          aRecordErrors.push({
            record_ID: oRecord.ID,
            message: cds.i18n.messages.at('ERR_PROJ_NO_MISSING'), process_code: sProcessCode
          });
          aFailedRecordIDs.push(oRecord.ID);
          aErrorLogs.push(...aRecordErrors);
          continue; // Skip this record
        }

        const oPayload = this._prepareDataForStaffCreate({
          record: oRecord,
          salesContract: oSalesContract,
          project: oProject,
        })

        aPayloads.push(oPayload);
        
      // });
        }

      for(let i=0; i<aPayloads.length; i++){
        for(let j=0; j<aPayloads[i].length; j++){
          try {
            const aEmpTimeDataResults = await this.empTimeDataAPI.executeQuery(
              INSERT.into('YY1_TIME_INFO_PA2002').entries(aPayloads[i][j]),
            );

            const recordID = aRecordsForProcessing[i].ID;

            if (aEmpTimeDataResults.SAP_UUID) {
              if (!aPassedRecordIDs.includes(recordID)) {
                aPassedRecordIDs.push(recordID);
              }
            } else {
              aErrorLogs.push({
                record_ID: recordID,
                message: `${aEmpTimeDataResults?.message || 'Unknown error'}`, process_code: sProcessCode
              });
        
              if (!aFailedRecordIDs.includes(recordID)) {
                aFailedRecordIDs.push(recordID);
              }
        
              LOG.error(
                `Error processing record ID ${recordID}: ${aEmpTimeDataResults?.message || 'Unknown error'}`,
              );
            }
          } catch (err) {
            const recordID = aRecordsForProcessing[i].ID;
            aErrorLogs.push({
              record_ID: recordID,
              message: `Database insert failed: ${err.message}`, process_code: sProcessCode
            });
    
            if (!aFailedRecordIDs.includes(recordID)) {
              aFailedRecordIDs.push(recordID);
            }
    
            LOG.error(
              `Database insert error for record ID ${recordID}: ${err.message}`,
            );
          }
        }
      }

      const passedSet = new Set(aPassedRecordIDs);
      const failedSet = new Set(aFailedRecordIDs);

      // Remove IDs that appear in both passed and failed
      for (const id of failedSet) {
        if (passedSet.has(id)) {
          passedSet.delete(id);
        }
      }

      aPassedRecordIDs.length = 0;  
      aPassedRecordIDs.push(...passedSet);
      
      // If errors are there, log them and update failedrecord
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
          return {
            hasError: true,
            continue: false,
          };
        }
      }
      if (aPassedRecordIDs.length) {
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
      } catch (err) {
        this.LOG._error && this.LOG.error(`processTime method error: ${err.message}`);
        return {
          hasError: true,
          continue: false,
        };
      }
    }

     async _validateSalesContract(oRecord, mSalesContracts) {
      let hasError = false,
        aErrors = [];

      let updatedContract = oRecord.contractNo;
      // Try to find by contractNo (primary)
      let oSalesContract = mSalesContracts.get(oRecord.contractNo);
      
      // Fallback: Try to find by PurchaseOrderByCustomer
      if (!oSalesContract) {
        // Search through all sales contracts for fallback match
        for (const [salesContractKey, salesContractValue] of mSalesContracts.entries()) {
          if (salesContractValue.PurchaseOrderByCustomer === oRecord.contractNo) {
            oSalesContract = salesContractValue;
            // Fallback found: update contractNo to resolved SalesContract
            oRecord.contractNo = salesContractValue.SalesContract;
            updatedContract = salesContractValue.SalesContract;
            
            // Update the database with the legacy contract number
            if (oSalesContract.PurchaseOrderByCustomer) {
              try {
                await UPDATE('com.aleron.monitor.Times')
                  .set({ legacyContractNo: oSalesContract.PurchaseOrderByCustomer })
                  .where({ ID: oRecord.ID });
              } catch (err) {
                this.LOG._error && this.LOG.error(`Failed to update legacy contract number: ${err.message}`);
                // Continue processing even if update fails
              }
            }
            break;
          }
        }
      }

      if (!oSalesContract) {
        hasError = true;
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'),
        });
      }

      return {
        hasError,
        errors: aErrors,
        updatedContract
      };
    }
    _prepareDataForStaffCreate({
      record,
      salesContract,
      project, 
    }){
      const subtypeMap = {
        shiftRGFirst: "1001",
        shiftOTFirst: "1501",
        shiftDTFirst: "2001",
        shiftRGSecond: "1002",
        shiftOTSecond: "1502",
        shiftDTSecond: "2002",
        shiftRGThird: "1003",
        shiftOTThird: "1503",
        shiftDTThird: "2003"
      };

      const oReturnData = [];

      for (const [key, subtype] of Object.entries(subtypeMap)) {
        if (record[key] !== "0.00") {
          const total = Number(record?.shiftDTFirst || 0) + Number(record?.shiftDTSecond || 0) + Number(record?.shiftDTThird || 0) +
                        Number(record?.shiftOTFirst || 0) + Number(record?.shiftOTSecond || 0) + Number(record?.shiftOTThird || 0) +
                        Number(record?.shiftRGFirst || 0) + Number(record?.shiftRGSecond || 0) + Number(record?.shiftRGThird || 0);
          const formattedTotal = total.toFixed(2);
          oReturnData.push({
            WORKER_ID: record.employeeNo, 
            Subtype: subtype,
            START_DATE: moment(record.beginDate).format('YYYY-MM-DD'),
            END_DATE: moment(record.beginDate).format('YYYY-MM-DD'),
            Type: subtype,
            PAYROLL_HOURS: formattedTotal, 
            CAL_DAYS: '0.00', 
            ATT_HOURS: formattedTotal,
            PremiumIndicator: '0000', 
            Positionplans: '', 
            Logicalsystemfordocumentpers: 'S4H', 
            StartofBreak: 'PT00H00M00S', 
            EndofBreak: 'PT00H00M00S', 
            PaidBreakPeriod: '0.00', 
            UnpaidBreakPeriod: '0.00', 
            StartofBreak2: 'PT00H00M00S', 
            EndofBreak2: 'PT00H00M00S', 
            PaidBreakPeriod2: '0.00', 
            UnpaidBreakPeriod2: '0.00', 
            CompanyCode: salesContract?.SalesOrganization || '',
            BusinessArea: salesContract?.SalesOffice || '',
            ControllingArea: '1000',
            WBSElement: record.orderNo,
            NumberofHoursforActivityAllo: formattedTotal,
            Seqnr: '',
            Refex: ''
          })
        }
      }
      return oReturnData;
    }

    async _buildTimePayload(data){ // right mapping needs to be pushed
  
      // Convert JavaScript dates to SAP-style /Date(...)/
      const formatSAPDate = (date) => `/Date(${new Date(date).getTime()})/`;
      return {
        WORKER_ID: data.workerId || "",
        Subtype: data.subtype || '',
        Name: data.name || "",
        START_DATE: formatSAPDate(data.startDate), // need to write in right format
        END_DATE: formatSAPDate(data.endDate), // need to write in right format
        START_TIME: data.startTime || "PT00H00M00S",
        END_TIME: data.endTime || "PT00H00M00S",
        PREVIOUS_DAY: data.previousDay || "",
        Type: data.type || "",
        AttAbsDays: data.attAbsDays || "0.00",
        PAYROLL_HOURS: data.payrollHours || "0.00",
        PAYROLL_DAYS: data.payrollDays || "0.00",
        CAL_DAYS: data.calDays || "0.00",
        ATT_HOURS: data.attHours || "0.00",
        WAGE_TYPE: data.wageType || "",
        VALUATION: data.valuation || "0.00",
        EXTRA_PAY: data.extraPay || "",
        OVERTIME_TYPE: data.overtimeType || "",
        PAY_SCALE_GRP: data.payScaleGrp || "",
        PAY_SCALE_LEVEL: data.payScaleLevel || "",
        PRE_NUMBER: data.preNumber || "",
        PremiumIndicator: data.premiumIndicator || "",
        ObjectType: data.objectType || "",
        Positionplans: data.positionPlans || "",
        Generationflag: data.generationFlag || "",
        ExternalDocumentNumber: data.externalDocumentNumber || "",
        Setnumberofhours: data.setNumberOfHours || "",
        RecordisforFullDay: data.recordIsFullDay || "",
        CurrencyKey: data.currencyKey || "",
        Logicalsystem: data.logicalSystem || "",
        ReferenceTransaction: data.referenceTransaction || "",
        ReferenceDocumentNumber: data.referenceDocumentNumber || "",
        ReferenceOrganizationalUnits: data.referenceOrgUnits || "",
        Logicalsystemfordocumentpers: data.logicalSystemForDocPers || "",
        Documentnumberfortimedata: data.docNumberForTimeData || "",
        Worktaxarea: data.workTaxArea || "",
        EvaluationTypeforAttendances: data.evaluationType || "",
        DefinitionSetforIDs: data.definitionSet || "",
        DefinitionSubsetforIDs: data.definitionSubset || "",
        TimeDataIDType: data.timeDataIdType || "",
        Nobreak: data.noBreak || "",
        BreaksSpecifiedExplicitly: data.breaksExplicit || "",
        StartofBreak: data.startBreak || "PT00H00M00S",
        EndofBreak: data.endBreak || "PT00H00M00S",
        PaidBreakPeriod: data.paidBreakPeriod || "0.00",
        UnpaidBreakPeriod: data.unpaidBreakPeriod || "0.00",
        StartofBreak2: data.startBreak2 || "PT00H00M00S",
        EndofBreak2: data.endBreak2 || "PT00H00M00S",
        PaidBreakPeriod2: data.paidBreakPeriod2 || "0.00",
        UnpaidBreakPeriod2: data.unpaidBreakPeriod2 || "0.00",
        NextDayIndicator: data.nextDayIndicator || "",
        SequentialnumberforPDCmessag: data.seqNumberPDC || "",
        CompanyCode: data.companyCode || "",
        BusinessArea: data.businessArea || "",
        ControllingArea: data.controllingArea || "",
        WBSElement: data.wbsElement || "",
        NumberofHoursforActivityAllo: data.hoursForActivity || "0.00"
      };
  }
    

}

module.exports = TimeStaff_C;