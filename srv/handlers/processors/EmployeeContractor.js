// Interface type 'T'
const moment = require('moment');
const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Procesor-EmployeeContractor');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');

const SalesContractComm = require('../communicators/SalesContract');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SalesOrderComm = require('../communicators/SalesOrder');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const HrCostDistObj = require('../communicators/HrCostDistObj');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const SmartyAddressComm = require('../communicators/SmartyAddress');
const BillingTypeComm = require('../communicators/BillingType');
const WorkforceComm = require('../communicators/Workforce');

// Utility & Common functions
const { toEmployeeType } = require('../common/utils');

// List of required entities
const {
  EmployeeHires,
  FieldValidations,
  FieldValidations: {
    elements: {
      validation: { enum: mFieldValidationTypeEnum },
    },
  },
} = cds.entities('com.aleron.monitor');

class EmployeeContractor extends Processor {
  constructor(options) {
    super(options);
    // Processor Specific configuration
    this.recordsEntity = 'com.aleron.monitor.EmployeeHires';
    this.LOG = cds.log('Monitor.Procesor-EmployeeContractor');
    this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

    // Communicators used by EmployeeContractor Processor
    this.salesContractAPI = null;
    this.businesPartnerAPI = null;
    this.countryRegionAPI = null;
    this.salesOrderAPI = null;
    this.smartyAddressAPI = null;
    this.billingTypeAPI = null;
    this.enterpriseProjectAPI = null;
    this.empCustInfoAPI = null;
    this.workforceAPI = null;
  }

  prepareCommunicators() {
    this.LOG._info && this.LOG.info('Preparing Communicators');
    this.salesContractAPI = new SalesContractComm();
    this.businesPartnerAPI = new BusinessPartnerComm();
    this.salesOrderAPI = new SalesOrderComm();
    this.smartyAddressAPI = new SmartyAddressComm();
    this.billingTypeAPI = new BillingTypeComm();
    this.enterpriseProjectAPI = new EnterpriseProjectComm();
    this.empCustInfoAPI = new EmpCustInfoComm();
    this.HrCostDistObjAPI = new HrCostDistObj();
    this.workforceAPI = new WorkforceComm();
    // this.countryRegionAPI = new CountryRegionComm();
  }

  _getColumnsForFetch(sEntity) {
    const mEntityColumns = {
      'com.aleron.monitor.EmployeeHires': [
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
    // === NEW: local logger alias for concise logging
    const LOG = this.LOG || console;
    // === END NEW

    const aRecordsForProcessing = [];
    // temp only once validate function is build we can remove - end
    const { SalesContract } = await this.salesContractAPI.getEntities();
    const aErrorLogs = [];
    const aFailedRecordIDs = [];
    const aPassedRecordIDs = [];
    const aSkippedRecords = [];
    let aSalesContracts = [];

    // Clear the error logs for the selected records; so that new process can start
    await ProcessLogger.removeLogs([...this.recordIDs]);
    // Get list of countries by looping over `this.file.to_EmployeeHires` and get unique countries
    let aCountries = [];
    let aAreas = [];
    let aActionIndicators = [];
    let aSalesContractIDs = [];
    let aBusinessPartnerConditions = [];
    let aCountryRegionsConditions = [];
    let aZipCodesToCheck = [];
    let aWorkOrders = [];

    let aRecordIDs = [];

    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode)) {
        aRecordsForProcessing.push({ ...record });
        aRecordIDs.push(record.ID);
      } else {
        aSkippedRecords.push({ ...record });
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
      if (record.contractNo) {
        aSalesContractIDs.push(record.contractNo);
      }
      if (record.soldToParty && record.companyCode && record.billToParty) {
        aBusinessPartnerConditions.push({
          soldToParty: record.soldToParty,
          billToParty: record.billToParty,
          companyCode: record.companyCode,
          partnerFunction: 'BP',
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
      if (record.workOrderDoc) {
        aWorkOrders.push(record.workOrderDoc);
      }
    }

    // await ProcessLogger.removeLogs(aRecordIDs);

    this.updateProcessingState(sProcessCode);
    if (!aRecordsForProcessing.length) {
      // If Step doesn't need to be processed, simply return to avoid costly calls
      return {
        hasError: false,
        continue: true,
      };
    }
    aCountries = [...new Set(aCountries)];
    aAreas = [...new Set(aAreas)];
    aActionIndicators = [...new Set(aActionIndicators)];
    aSalesContractIDs = [...new Set(aSalesContractIDs)];

    // === NEW: Duplicate check within current file (SSN + actionIndicator in U1/C1/U2/C2) WITH LOGS
    (LOG.info || LOG.log)?.(`[DUPCHK] Starting in-file duplicate scan… total candidates=${aRecordsForProcessing.length}`);

    const ALLOWED_AI = new Set(['U1', 'C1', 'U2', 'C2']);
    const seenByKey = new Map();  // key: `${ssn}|${ai}` -> firstRecordID
    const dupeIds = [];
    let considered = 0;

    for (const rec of aRecordsForProcessing) {
      const aiUpper = String(rec.actionIndicator || '').trim().toUpperCase();
      const ssn = String(rec.ssn ?? '').trim(); // <— only your UI field

      // only check when SSN present and actionIndicator is in the allowed set
      if (!ssn || !ALLOWED_AI.has(aiUpper)) {
        LOG.debug && LOG.debug(`[DUPCHK] skip rec=${rec.ID} reason=${!ssn ? 'no-ssn' : 'ai-not-in-scope'} ai=${aiUpper}`);
        continue;
      }

      considered++;
      const key = `${ssn}|${aiUpper}`;

      if (!seenByKey.has(key)) {
        seenByKey.set(key, rec.ID);
        LOG.debug && LOG.debug(`[DUPCHK] seed key=${key} firstId=${rec.ID}`);
      } else {
        const firstId = seenByKey.get(key);

        (LOG.info || LOG.log)?.(
          `[DUPCHK] DUPLICATE FOUND key=${key} firstId=${firstId} dupId=${rec.ID}`
        );

        // Queue error (first wins, later is error)
        const msg = cds.i18n.messages.at('ERR_DUPLICATE_IN_FILE_SSN_AI', [ssn, aiUpper]);
        aErrorLogs.push({ record_ID: rec.ID, message: msg });
        aFailedRecordIDs.push(rec.ID);
        dupeIds.push(rec.ID);

        // extra visible log for your console
        (LOG.error || LOG.log)?.(`[DUPCHK] Queued error for rec=${rec.ID} :: ${msg}`);
      }
    }

    const stDuplicateIds = new Set(dupeIds);

    (LOG.info || LOG.log)?.(
      `[DUPCHK] Scan summary: considered=${considered}, uniqueKeys=${seenByKey.size}, duplicates=${dupeIds.length}`
    );
    if (dupeIds.length) {
      (LOG.info || LOG.log)?.(`[DUPCHK] Duplicate record IDs flagged: ${dupeIds.join(', ')}`);
    } else {
      (LOG.info || LOG.log)?.(`[DUPCHK] No in-file duplicates by (SSN, actionIndicator ∈ U1/C1/U2/C2).`);
    }
    // === END NEW

    const [
      // {reason: anyCountryRegionErr, value: aCountryRegions},
      { reason: anyBusinessPartnerErr, value: aPartnerFunctions },
      { reason: anySalesContractPrimaryErr, value: aSalesContractPrimaryResults },
      { reason: anySalesContractFallbackErr, value: aSalesContractFallbackResults },
      { reason: anyFieldValidationErr, value: aFieldValidations },
      { reason: anyZipCodeErr, value: aZipCodeValidations },
      { reason: anySalesOrderItemErr, value: aSalesOrderItems },
    ] = await Promise.allSettled([
      // Country Region Call
      /* this.countryRegionAPI.executeQuery(
        aCountryRegionsConditions.map((cr) => {
          return SELECT.one.from('CnsldtnCountry').columns(['Country']).where({
            Country: cr.country_code,
          });
        }),
      ), */
      // Partner Function calls
      this.businesPartnerAPI.executeQuery(
        aBusinessPartnerConditions.map((bp) => {
          return SELECT.one
            .from('A_CustSalesPartnerFunc')
            .columns(['Customer', 'SalesOrganization', 'PartnerFunction', 'BPCustomerNumber'])
            .where({
              Customer: bp.soldToParty,
              SalesOrganization: bp.companyCode,
              PartnerFunction: bp.partnerFunction,
              BPCustomerNumber: bp.billToParty,
            });
        }),
      ),
      // Sales Contract Information
      //
      // Primary Sales Contract Information
      this.salesContractAPI.executeQuery(
        SELECT.from(SalesContract)
          .columns(['SalesContract', 'SalesOrganization', 'DistributionChannel', 'SoldToParty', 'PurchaseOrderByCustomer'])
          .where({ SalesContract: { in: aSalesContractIDs } }),
      ),
      // Fallback Sales Contract Information
      this.salesContractAPI.executeQuery(
        SELECT.from(SalesContract)
          .columns(['SalesContract', 'SalesOrganization', 'DistributionChannel', 'SoldToParty', 'PurchaseOrderByCustomer'])
          .where({ PurchaseOrderByCustomer: { in: aSalesContractIDs } }),
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
      // Sales Order Item Validation for Work Orders
      aWorkOrders.length > 0 ? this.salesOrderAPI.executeQuery(
        SELECT.from('A_SalesOrder')
          .columns(['SalesOrder', 'YY1_AlphanumericSalesO_SDH'])
          .where({
            YY1_AlphanumericSalesO_SDH: { in: aWorkOrders }
          })
      ) : Promise.resolve([]),
    ]);

    if (anyBusinessPartnerErr) {
      this.LOG._error && this.LOG.error(anyBusinessPartnerErr.message);
    }

    if (!anySalesContractPrimaryErr && aSalesContractPrimaryResults && aSalesContractPrimaryResults.length > 0) {
      aSalesContracts.push(...aSalesContractPrimaryResults);
    }
    if (!anySalesContractFallbackErr && aSalesContractFallbackResults && aSalesContractFallbackResults.length > 0) {
      const primarySet = new Set(aSalesContracts.map(r => r.SalesContract));
      const fallbackOnly = aSalesContractFallbackResults.filter(r => !primarySet.has(r.SalesContract));
      aSalesContracts.push(...fallbackOnly);
    }

    if (anyFieldValidationErr) {
      this.LOG._error && this.LOG.error(anyFieldValidationErr.message);
    }

    if (anyZipCodeErr) {
      this.LOG._error && this.LOG.error(anyZipCodeErr.message);
    }

    if (anySalesOrderItemErr) {
      this.LOG._error && this.LOG.error(anySalesOrderItemErr.message);
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

    const mSalesOrderItems = new Map();
    if (!anySalesOrderItemErr?.message && aSalesOrderItems.length) {
      aSalesOrderItems.forEach((oSalesOrderItem) => {
        mSalesOrderItems.set(oSalesOrderItem.YY1_AlphanumericSalesO_SDH, oSalesOrderItem);
      });
    }

    // Run the steps only for filtered records
    // aRecordsForProcessing.forEach(async (oRecord) =>
    for (const oRecord of aRecordsForProcessing) {
      // === NEW: skip further validations for duplicates already failed above, with a log
      if (stDuplicateIds.has(oRecord.ID)) {
        (LOG.info || LOG.log)?.(`[DUPCHK] Skip further validations for duplicate rec=${oRecord.ID}`);
        continue;
      }
      // === END NEW

      let hasRecordFailed = false;

      // Check postal code format
      const oZipCode = mZipCodeValidation.get(oRecord.ID);
      // if (!oZipCode?.valid && oRecord.country_code != 'CA')
      if (mZipCodeValidation.size > 0 && oRecord.country_code !== 'CA' && oZipCode?.valid === false) {
        aErrorLogs.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_ZIPCODE_NOT_VALID'),
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
      // Check Work Nexus Deployment
      const oWNDeploymentRes = this._validateWorkNexusDeployment(oRecord);
      if (oWNDeploymentRes.hasError) {
        aErrorLogs.push(...oWNDeploymentRes.errors);
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      }

      // Check sales contract
      const oSalesContractRes = await this._validateSalesContract(oRecord, aSalesContracts);
      if (oSalesContractRes.hasError) {
        aErrorLogs.push(...oSalesContractRes.errors);
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      } else {
        // Always use the resolved contract value for further processing
        oRecord.contractNo = oSalesContractRes.updatedContract;
      }

      // Check bill-to
      const oPartnerFunctionRes = this._validatePartnerFunction(oRecord, aPartnerFunctions);
      if (oPartnerFunctionRes.hasError) {
        aErrorLogs.push(...oPartnerFunctionRes.errors);
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      }

      // TODO: Check country region

      // Check Tax area
      const oTaxAreaRes = this._validateTaxArea(oRecord);
      if (oTaxAreaRes.hasError) {
        aErrorLogs.push(...oTaxAreaRes.errors);
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      }

      // Check Work Order validation
      const oSalesOrderItem = mSalesOrderItems.get(oRecord.workOrderDoc);
      if (oSalesOrderItem) {
        aErrorLogs.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_SALES_ORDER_EXIST_WORKORDER', [
            oSalesOrderItem.SalesOrder,
            oRecord.workOrderDoc
          ]),
        });
        aFailedRecordIDs.push(oRecord.ID);
        hasRecordFailed = true;
      }

      if (!hasRecordFailed) {
        aPassedRecordIDs.push(oRecord.ID);
      }
    }
    // });

    // If errors are there, log them and update failed records
    if (aErrorLogs.length) {
      (LOG.info || LOG.log)?.(`[DUPCHK] Persisting ${aErrorLogs.length} error log(s) to ProcessLogs…`);
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
            return UPDATE(EmployeeHires)
              .set({ valid: false, processLevel_code: recordProcessLevelCode })
              .where({ ID: recordID });
          }),
        ]);
        (LOG.info || LOG.log)?.(`[DUPCHK] Error logs persisted. FailedCount=${aFailedRecordIDs.length}`);
        this.LOG._info &&
          this.LOG.info(
            cds.i18n.messages.at('INFO_RECORDS_UPDATED', [
              sProcessCode,
              aErrorLogs.map((log) => log.record_ID).join(','),
            ]),
          );
      } catch (err) {
        (LOG.error || LOG.log)?.(`[DUPCHK] Persisting error logs failed: ${err.message}`);
        this.LOG._error && this.LOG.error(err.message);
      }
    }
    if (aPassedRecordIDs.length) {
      await ProcessLogger.removeLogs(aPassedRecordIDs);
      await Promise.allSettled(
        aPassedRecordIDs.map(id => {
          const rec = this.records.find(r => r.ID === id);
          if (rec && rec.contractNo) {
            return UPDATE(EmployeeHires)
              .set({ contractNo: rec.contractNo })
              .where({ ID: id });
          }
          return Promise.resolve();
        })
      );

      await Promise.allSettled([
        ProcessLogger.removeLogs(aPassedRecordIDs),
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
          return UPDATE(EmployeeHires)
            .set({ valid: true, processLevel_code: recordProcessLevelCode })
            .where({ ID: recordID });
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


  _validateFieldValidations({ stMandatoryFields, stBlankFields, oRecord }) {
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
    if (oRecord.workNexusIndicator && oRecord.wnWork?.startsWith('WO-')) {
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
    return {
      hasError: false,
      errors: [],
    };
  }

  async employeeHire(sProcessCode, bBreakExecution) {
    const LOG = this.LOG || console;
    const trim = v => (v ?? '').toString().trim();
    const uniq = arr => [...new Set(arr)];
    const { SELECT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');

    LOG.info('Starting employeeHire process');

    // ==== SNAPSHOT: capture current PL=2 leaders for files in scope ====
    const fileIdsInScope = uniq((this.records || []).map(r => r.file_ID).filter(Boolean));
    let pinnedLeaderIds = [];
    try {
      if (fileIdsInScope.length) {
        const snap = await SELECT.from(EmployeeHires)
          .columns('ID')
          .where({ file_ID: { in: fileIdsInScope }, processLevel_code: '2' });
        pinnedLeaderIds = (snap || []).map(r => String(r.ID));
        LOG.info(`[PIN] snapshot PL=2 leaders: ${pinnedLeaderIds.length} id(s)`);
      }
    } catch (e) {
      LOG.error(`[PIN] snapshot failed: ${e.message}`);
    }

    try {
      // ============== PRE-PASS: fill personnelNoSAP for 'S' duplicates (by ssn) ==============
      try {
        if (fileIdsInScope.length) {
          const siblingRows = await SELECT.from(EmployeeHires)
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
                UPDATE(EmployeeHires)
                  .set({ personnelNoSAP: x.emp }) // number only; do NOT change step/valid
                  .where({ ID: x.id, processLevel_code: 'S' })
              )
            );

            // sync in-memory for this run
            const filled = new Map(toFill.map(x => [String(x.id), x.emp]));
            for (const r of (this.records || [])) {
              const emp = filled.get(String(r.ID));
              if (emp) r.personnelNoSAP = emp;
            }
            LOG.info(`[WO] Pre-pass S: filled personnelNoSAP on ${toFill.length} row(s) (SSN).`);
          }

          // optional supplement from Emp-Cust-Info
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
                    UPDATE(EmployeeHires)
                      .set({ personnelNoSAP: x.emp })
                      .where({ ID: x.id, processLevel_code: 'S' })
                  )
                );
                const filled2 = new Map(toFillECI.map(x => [String(x.id), x.emp]));
                for (const r of (this.records || [])) {
                  const emp = filled2.get(String(r.ID));
                  if (emp) r.personnelNoSAP = emp;
                }
                LOG.info(`[WO] Pre-pass S (EmpCustInfo): filled personnelNoSAP on ${toFillECI.length} row(s).`);
              }
            } catch (e) {
              LOG.error(`[WO] Pre-pass S (EmpCustInfo) failed: ${e.message}`);
            }
          }
        }
      } catch (e) {
        LOG.error(`[WO] Pre-pass S failed: ${e.message}`);
      }

      // ============== PRE-HEAL: flip (2,false) with NO personnel number -> (2,true) ==============
      try {
        const healed = await UPDATE(EmployeeHires)
          .set({ valid: true })
          .where({ processLevel_code: '2', valid: false, personnelNoSAP: null });
        const healedCount = typeof healed === 'number'
          ? healed
          : (healed?.rowCount ?? healed?.rows ?? healed?.affectedRows ?? 0);
        LOG.info(`[WO] Pre-heal: set valid=true for ${healedCount} row(s) with no personnel number`);
      } catch (e) {
        LOG.error(`[WO] Pre-heal failed: ${e.message}`);
      }

      // ============== SELECTION ==============
      let aRecordsForProcessing = [], aSkippedRecords = [];
      for (const record of (this.records || [])) {
        if (this.shouldRecordProcess(record, sProcessCode)) aRecordsForProcessing.push({ ...record });
        else aSkippedRecords.push({ ...record });
      }
      this.updateProcessingState(sProcessCode);
      if (!aRecordsForProcessing.length) {
        LOG.info('No records to process at this step.');
        return { hasError: false, continue: true };
      }

      // ---------------- NEW BUSINESS LOGIC (per SSN group; run-date based) ----------------
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
        // Add YYYYMMDD quick path
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
          LOG.error(`[WO] ECI fetch failed: ${e.message}`);
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
              UPDATE(EmployeeHires).set(payload).where(Object.assign({ ID: x.ID }, guard))
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
              LOG.error(`[WO] SSN=${ssn} ID=${r.ID}: Error - No Hire / Rehire record exist in the file`);
            }
          }
        }
      }

      // No-SSN rows: default to (2,TRUE) so they aren't blocked (remove if you prefer no change)
      if (noSsnRows.length) {
        await doSet(noSsnRows, { processLevel_code: '2', valid: true });
        total2true += noSsnRows.length;
      }

      LOG.info(`[WO] New rules (run-date) applied: to S/FALSE=${totalSfalse}, to 2/TRUE=${total2true}, errors=${totalErrors}`);

      // ============== FINAL-HEAL (non-destructive): (2,false & no emp) -> (2,true) ==============
      try {
        const healed = await UPDATE(EmployeeHires)
          .set({ valid: true })
          .where({ processLevel_code: '2', valid: false, personnelNoSAP: null });
        const healedCount = typeof healed === 'number'
          ? healed
          : (healed?.rowCount ?? healed?.rows ?? healed?.affectedRows ?? 0);
        LOG.info(`[WO] Final-heal: set valid=true for ${healedCount} row(s) with no personnel number`);
      } catch (e) {
        LOG.error(`[WO] Final-heal failed: ${e.message}`);
      }

      return { hasError: false, continue: true };
    } finally {
      // ==== RESTORE: force every originally-PL=2 id back to (2,true) ====
      try {
        if (pinnedLeaderIds.length) {
          await UPDATE(EmployeeHires)
            .set({ processLevel_code: '2', valid: true })
            .where({ ID: { in: pinnedLeaderIds } });
          LOG.info(`[PIN] restore applied to ${pinnedLeaderIds.length} id(s).`);
        }
      } catch (e) {
        LOG.error(`[PIN] restore failed: ${e.message}`);
      }
    }
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
          await UPDATE('com.aleron.monitor.EmployeeHires')
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
      updatedContract
    };
  }

  _validatePartnerFunction(oRecord, aPartnerFunctions) {
    let hasError = false,
      aErrors = [];

    const oBillTo = aPartnerFunctions.find(
      (pf) =>
        pf?.Customer === oRecord.soldToParty &&
        pf?.SalesOrganization === oRecord.companyCode &&
        pf?.PartnerFunction === 'BP' &&
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


  async Hiredinsuccessfactors(sProcessCode, bBreakExecution) {
    const LOG = this.LOG || console;
    const trim = v => (v ?? '').toString().trim();
    const uniq = arr => [...new Set(arr.map(String))];
    const { SELECT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');

    LOG.info(`Starting Hiredinsuccessfactors (Step '${sProcessCode}')`);

    // ==== SNAPSHOT: capture current PL=2 leaders for files in scope ====
    const fileIdsInScope = uniq((this.records || []).map(r => r.file_ID).filter(Boolean));
    let pinnedLeaderIds = [];
    try {
      if (fileIdsInScope.length) {
        const snap = await SELECT.from(EmployeeHires)
          .columns('ID')
          .where({ file_ID: { in: fileIdsInScope }, processLevel_code: '2' });
        pinnedLeaderIds = (snap || []).map(r => String(r.ID));
        LOG.info(`[PIN] snapshot PL=2 leaders: ${pinnedLeaderIds.length} id(s).`);
      }
    } catch (e) {
      LOG.error(`[PIN] snapshot failed: ${e.message}`);
    }

    try {
      // 1) pick ONLY what UI intended (S step rows)
      const aRecordsForProcessing = [];
      const aSkippedRecords = [];
      for (const rec of (this.records || [])) {
        if (this.shouldRecordProcess(rec, sProcessCode)) aRecordsForProcessing.push({ ...rec });
        else aSkippedRecords.push({ ...rec });
      }
      this.updateProcessingState(sProcessCode);
      if (!aRecordsForProcessing.length) {
        LOG.info(`No records to process at step ${sProcessCode}`);
        return { hasError: false, continue: true };
      }

      const selectedIds = new Set(aRecordsForProcessing.map(r => String(r.ID)));
      const aErrorLogs = [];
      const aPassedRecordIDs = [];
      const aFailedRecordIDs = [];

      // 2) prefill personnelNoSAP on selected S rows by ssn (leaders → S duplicates)
      try {
        if (fileIdsInScope.length) {
          const siblingRows = await SELECT.from(EmployeeHires)
            .columns(['ID','file_ID','processLevel_code','valid','ssn','personnelNoSAP'])
            .where({ file_ID: { in: fileIdsInScope } });

          const mSsnToEmp = new Map();
          (siblingRows || []).forEach(r => {
            const emp = trim(r.personnelNoSAP);
            if (!emp) return;
            const s = trim(r.ssn);    // lowercase 'ssn'
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
                UPDATE(EmployeeHires)
                  .set({ personnelNoSAP: x.emp })
                  .where({ ID: x.id, processLevel_code: sProcessCode }) // stay at S
              )
            );

            // sync in-memory
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
            LOG.info(`[S] Filled personnelNoSAP on ${toFill.length} selected duplicate row(s) (by ssn).`);
          } else {
            LOG.info('[S] No selected duplicates needed personnel copy (by ssn).');
          }

          // optional Emp-Cust-Info supplement for still blanks
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
                    UPDATE(EmployeeHires)
                      .set({ personnelNoSAP: x.emp })
                      .where({ ID: x.id, processLevel_code: sProcessCode }) // stay at S
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
                LOG.info(`[S] Filled personnelNoSAP on ${toFillECI.length} selected row(s) from EmpCustInfo (ssn).`);
              }
            } catch (e) {
              LOG.error(`[S] EmpCustInfo supplemental fill failed: ${e.message}`);
            }
          }
        }
      } catch (e) {
        LOG.error(`[S] Prefill by ssn failed: ${e.message}`);
      }

      // 3) replication check (never change step; only valid flag)
      for (const rec of aRecordsForProcessing) {
        try {
          const emp = trim(rec.personnelNoSAP);
          if (!emp) {
            await UPDATE(EmployeeHires)
              .set({ valid: false })
              .where({ ID: rec.ID, processLevel_code: sProcessCode });   // stay at S
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
            await UPDATE(EmployeeHires)
              .set({ valid: true })
              .where({ ID: rec.ID, processLevel_code: sProcessCode }); // stay at S
            aPassedRecordIDs.push(rec.ID);
          } else {
            await UPDATE(EmployeeHires)
              .set({ valid: false })
              .where({ ID: rec.ID, processLevel_code: sProcessCode }); // stay at S
            aFailedRecordIDs.push(rec.ID);
            aErrorLogs.push({ record_ID: rec.ID, message: 'Employee not Replicated In S/4' });
          }
        } catch (e) {
          try {
            await UPDATE(EmployeeHires)
              .set({ valid: false })
              .where({ ID: rec.ID, processLevel_code: sProcessCode });   // stay at S
          } catch (_) {}
          aFailedRecordIDs.push(rec.ID);
          aErrorLogs.push({ record_ID: rec.ID, message: `S/4 replication check failed: ${e.message}` });
          LOG.error(`S check error for ${rec.ID}: ${e.message}`);
        }
      }

      if (aErrorLogs.length) await ProcessLogger.addLogs(aErrorLogs);
      if (aPassedRecordIDs.length) {
        await ProcessLogger.removeLogs(aPassedRecordIDs);
        this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
      }
      if (aFailedRecordIDs.length) this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);

      this.updateExclusionSet({
        passed: aPassedRecordIDs,
        failed: aFailedRecordIDs,
        skipped: aSkippedRecords,
        bBreakExecution,
      });

      LOG.info(
        `Step ${sProcessCode} summary → passed: ${aPassedRecordIDs.length}, failed: ${aFailedRecordIDs.length}, skipped: ${aSkippedRecords.length}`
      );

      return { hasError: aFailedRecordIDs.length > 0, continue: aFailedRecordIDs.length === 0 };
    } finally {
      // ==== RESTORE: force every originally-PL=2 id back to (2,true) ====
      try {
        if (pinnedLeaderIds.length) {
          await UPDATE(EmployeeHires)
            .set({ processLevel_code: '2', valid: true })
            .where({ ID: { in: pinnedLeaderIds } });
          LOG.info(`[PIN] restore applied to ${pinnedLeaderIds.length} id(s).`);
        }
      } catch (e) {
        LOG.error(`[PIN] restore failed: ${e.message}`);
      }
    }
  }


  async processSalesOrder(sProcessCode, bBreakExecution) {
    const aRecordsForProcessing = [],
      mProcessingRecordsToCentralMapping = new Map();
    const aErrorLogsForUpdate = [],
      aErrorLogs = [],
      aFailedRecordIDs = [],
      aPassedRecordIDs = [],
      aSkippedRecords = [];

    // Step 1: Fetch SalesContract, Business Partners & Payment Terms
    let sWhereForSalesContract = '',
      sWhereForBusinessPartner = '',
      aSalesContractWhere = [],
      aAddresses = [],
      mBusinessPartnerWhere = new Map(),
      aSoldToPartyWhere = [],
      aTaxCodeByProvince = [],
      sTaxCodeByProvinceWhere = '',
      aTaxCodeByCity = [],
      sTaxCodeByCityWhere = '',
      aTaxCodeByCounty = [],
      aTaxCodeByCountyWhere = [],
      aPersonalIDs = [],
      aPersonalIDRes = [],
      aRecordIDs = [],
      aEmpRespIDs = [],
      aEmpRespIDRes = [],
      aRecEmpNoIDs = [],
      aRecEmpNoIDRes = [],
      sTaxCodeByCountyWhere = '',
      oBillingType = {};

      let aCustomerFieldNamesWhere = [],
      mCustomerFieldNameValue = new Map();

    // Prepare where conditions for all the calls
    for (const [iRecordIndex, record] of this.records.entries()) {
      if (this.shouldRecordProcess(record, sProcessCode) && !record.salesDocumentNoSAP) {
        // If record is on step level & is already valid, then skipp
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
          OrganizationDivision: null, // To be changed after ssalescontracts are fetched
        });
      }
      if (
        !record.county &&
        record.street &&
        record.region &&
        record.city &&
        record.workLocation &&
        record.doorNo &&
        record.postalCode
      ) {
        // Only get results for missing county
        aAddresses.push({
          record_ID: record.ID,
          street: `${record.doorNo} ${record.street}`,
          city: record.city,
          state: record.region,
          zipcode: record.postalCode,
        });
      }
      // Prepare query for aTaxCodeBy<...> selectss
      if (record.country_code === 'CA') {
        sTaxCodeByProvinceWhere += `or (country_code = '${record.country_code}' and region = '${record.region}')`;
      } else if (record.country_code === 'US') {
        sTaxCodeByProvinceWhere += `or (country_code = '${record.country_code}' and region = '${record.region}')`;
        // sTaxCodeByCityWhere += `or (country_code = '${record.country_code}' and city = '${record.city}' and region = '${record.region}')` ;
        sTaxCodeByCityWhere += `or (upper(country_code) = upper('${record.country_code}') and upper(city) = upper('${record.city}') and upper(region) = upper('${record.region}'))`;
        aTaxCodeByCountyWhere.push({
          record_ID: record.ID,
          country_code: record.country_code,
          region: record.region,
          county: record.county,
        });
      }
      if (record.personnelNoSAP) {
        aPersonalIDs.push(record.personnelNoSAP);
      }
      if (record.employeeResponsible) {
        aEmpRespIDs.push(record.employeeResponsible);
      }
      if (record.recruiterEmployeeNo) {
        aRecEmpNoIDs.push(record.recruiterEmployeeNo);
      }

      ({ mCustomerFieldNameValue, aCustomerFieldNamesWhere } = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere));
      // const result = this.customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere);
      // mCustomerFieldNameValue = result.mCustomerFieldNameValue;
      // aCustomerFieldNamesWhere = result.aCustomerFieldNamesWhere;
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

    // Remove the first `or `
    sTaxCodeByProvinceWhere.length &&
      (sTaxCodeByProvinceWhere = sTaxCodeByProvinceWhere.slice(3).trim());
    sTaxCodeByCityWhere.length && (sTaxCodeByCityWhere = sTaxCodeByCityWhere.slice(3).trim());

    let mSalesContract = new Map(),
      mPaymentTerms = new Map();

    try {
      // Get the SalesContracts & Payment Terms parallely
      const [
        { reason: anySalesContractErr, value: aSalesContracts },
        { reason: anyPaymentTermsErr, value: aPaymentTerms },
        { reason: anyAddressErr, value: aAddressesWithCounty },
        { reason: anyTaxCodeByProvinceErr, value: aTaxCodeByProvinceResults },
        { reason: anyTaxCodeByCityErr, value: aTaxCodeByCityResults },
        { reason: anyCustomFieldsTOVCErr, value: aCustomFieldsTOVC },
        { reason: anyBillingTypeErr, value: oBillingTypeResult },
        { reason: anyrecruiterEmpNoErr, value: recruiterEmpResult },
        { reason: anyemployeeResErr, value: employeeResponsibleResult },
        { reason: anypersonnelNoSAPErr, value: opersonnelNoSAPResult },
      ] = await Promise.allSettled([
        this.salesContractAPI.executeQuery(this._getSalesContractQuery(aSalesContractWhere)),
        SELECT.from('com.aleron.monitor.PaymentTerms')
          .columns(['customerNo', 'supplierNo', 'customerTerm', 'vendorTerm', 'poBox'])
          .where({
            customerNo: { in: aSoldToPartyWhere },
            vendorTerm: null,
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
        this.billingTypeAPI.executeQuery(
          SELECT.one
            .from('YY1_BILLINGTYPE')
            .columns(['Billing_type'])
            .where({ SO_order_Type: 'ZWCP' }),
        ),
        aRecEmpNoIDs.length > 0 ? this.workforceAPI.executeQuery(
          SELECT.from('YY1_workforce_cds')
            .columns(['WorkforcePersonExternalID', 'PersonWorkAgreement'])
            .where({ WorkforcePersonExternalID: { in: [...new Set(aRecEmpNoIDs)] } })
        ) : Promise.resolve([]),
        aEmpRespIDs.length > 0 ? this.workforceAPI.executeQuery(
          SELECT.from('YY1_workforce_cds')
            .columns(['WorkforcePersonExternalID', 'PersonWorkAgreement'])
            .where({ WorkforcePersonExternalID: { in: [...new Set(aEmpRespIDs)] } })
        ) : Promise.resolve([]),
        aPersonalIDs.length > 0 ? this.workforceAPI.executeQuery(
          SELECT.from('YY1_workforce_cds')
            .columns(['WorkforcePersonExternalID', 'PersonWorkAgreement'])
            .where({ WorkforcePersonExternalID: { in: [...new Set(aPersonalIDs)] } })
        ) : Promise.resolve([])
      ]);
      if (!anySalesContractErr?.message && aSalesContracts.length) {
        aSalesContracts.forEach((oSalesContract) => {
          mSalesContract.set(oSalesContract.SalesContract, oSalesContract);
          // Build the query for Business Partners fetch since it depends on salescontracts
          const oBusinessPartnerWhere = mBusinessPartnerWhere.get(oSalesContract.SalesContract);
          if (oBusinessPartnerWhere) {
            sWhereForBusinessPartner += `or (Customer = '${oBusinessPartnerWhere.Customer}' and SalesOrganization = '${oSalesContract.SalesOrganization}' and (PartnerFunction = 'WE' or PartnerFunction = 'Z4' or PartnerFunction = 'Z5') and DistributionChannel = '01' and Division = '${oSalesContract.OrganizationDivision}')`;
          }
        });
        sWhereForBusinessPartner.length &&
          (sWhereForBusinessPartner = sWhereForBusinessPartner.slice(3).trim()); // Remove the first `or `;
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
            // sTaxCodeByCountyWhere  += `or (country_code = '${oWhere.country_code}' and county = '${oAddress.county}' and region = '${oWhere.region}')`;
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

      if (!anyBillingTypeErr?.message && oBillingTypeResult) {
        oBillingType = oBillingTypeResult;
      }

      if (!anyrecruiterEmpNoErr?.message && recruiterEmpResult.length) {
        aRecEmpNoIDRes = [...recruiterEmpResult];
      }
      if (!anyemployeeResErr?.message && employeeResponsibleResult.length) {
        aEmpRespIDRes = [...employeeResponsibleResult];
      }
      if (!anypersonnelNoSAPErr?.message && opersonnelNoSAPResult.length) {
        aPersonalIDRes = [...opersonnelNoSAPResult];
      }

    } catch (err) {
      this.LOG._error && this.LOG.error(err.message);
    }

    // Step 2: Get the Business Partners & TaxByCountry
    const mBusinessPartners = new Map();
    try {
      const [
        { reason: anyBusinessPartnerErr, value: aBusinessPartners },
        { reason: anyTaxCodeByCountyErr, value: aTaxCodeByCountyResults },
      ] = await Promise.allSettled([
        this.businesPartnerAPI.executeQuery(
          SELECT.from('A_CustSalesPartnerFunc')
            .columns(['Customer', 'PartnerFunction', 'BPCustomerNumber','Supplier','PersonnelNumber','ContactPerson'])
            .where(`${sWhereForBusinessPartner}`),
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
        });
      }
      if (!anyTaxCodeByCountyErr?.message && aTaxCodeByCountyResults.length) {
        aTaxCodeByCounty = aTaxCodeByCountyResults;        
      }
    } catch (err) {
      this.LOG._error & this.LOG.error(err.message);
    }

    // Step 3: Prepare Payload for SalesOrder Creations
    const aPayloads = [];
    const mPayloadMap = new Map();

    aRecordsForProcessing.forEach((oRecord) => {
      // oRecord.county = aTaxCodeByCounty[0]?.county;
      const aErrors = [];
      if (!oRecord.projectNumberSAP) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING'),
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

      // if (oRecord.country_code !== 'CA' && !oRecord.county) {
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
      //   // Get the county from the address
        // oRecord.county = oAddr.county;
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
            oRecord.county,
            oRecord.region,
          ]),
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        return; // Skip this record
      }

      const oSalesContract = mSalesContract.get(oRecord.contractNo);
      if (!oSalesContract) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'),
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        return; // Skip this record
      }

      const recEmplNo = aRecEmpNoIDRes.find(item => item.WorkforcePersonExternalID === oRecord.recruiterEmployeeNo)?.PersonWorkAgreement;
      const personnelNoSAP = aPersonalIDRes.find(item => item.WorkforcePersonExternalID === oRecord.personnelNoSAP)?.PersonWorkAgreement;
      const empResponsible = aEmpRespIDRes.find(item => item.WorkforcePersonExternalID === oRecord.employeeResponsible)?.PersonWorkAgreement;
      const oSalesContractItem = oSalesContract._Item.find(
        (item) => item.Product === oRecord.material && item.SalesContract === oRecord.contractNo,
      );

      if (!personnelNoSAP) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_PERSONAL_NO'),
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        return; // Skip this record
      }

      if (!oSalesContractItem) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_MATERIAL_NOT_FOUND', [
            oRecord.material,
            oRecord.contractNo
          ]),
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        return; // Skip this record
      }
      // Prepare payload for SalesOrder creation
      const oPayload = this._prepareDataForSalesOrderCreate({
        record: oRecord,
        salesContract: oSalesContract,
        billingType: oBillingType,
        paymentTermsMap: mPaymentTerms,
        businessPartnerMap: mBusinessPartners,
        taxCode: sTaxCode,
        recEmplNo: recEmplNo,
        personnelNoSAP: personnelNoSAP,
        empResponsible: empResponsible,
        salesContractItem: oSalesContractItem
      });

      // Add payload to aPayloads and map record.ID to its payloadIndex
      const iPayloadIndex = aPayloads.push(oPayload) - 1;
      mPayloadMap.set(oRecord.ID, {
        payloadIndex: iPayloadIndex,
        salesOrder: null, // To be updated in Step 4
        scheduleLinePayloadIndex: null, // To be updated in Step 5
      });
    });

    // TODO: Check if aPayloads[].errors has any value; process accordinglyy
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
              ...oError,
            });
          });
        } else {
          aErrorLogs.push({
            record_ID: sRecordID,
            message: cds.i18n.messages.at('ERR_SALES_ORDER_CREATION_FAILED', [oResult.reason]),
          });
        }

        // Remove the failed record from the map
        mPayloadMap.delete(sRecordID);
      }
    });

    // TODO: VC Date update process - TESTCHECK
    await this._prepareVCData(
      this.records,
      mCustomerFieldNameValue,
      mPayloadMap,
      aPassedRecordIDs,
      aFailedRecordIDs,
      aErrorLogs,
    );

    // Step 7: Update Error Logs
    if (aErrorLogs.length) {
      await ProcessLogger.addLogs(aErrorLogs);
      await UPDATE(EmployeeHires)
        .set({ valid: false, processLevel_code: sProcessCode })
        .where({ ID: { in: aFailedRecordIDs } });
    }

    // Step 8: Update Passed and Failed Records

    // Update the `salesDocumentNoSAP` field in `this.records` and the database
    this.records.forEach((oRecord) => {
      const oMapEntry = mPayloadMap.get(oRecord.ID);
      if (oMapEntry && oMapEntry.salesOrder) {
        // Update fields in memory
        oRecord.salesDocumentNoSAP = oMapEntry.salesOrder;
        oRecord.salesItemNoSAP = oMapEntry.salesOrderItem;
        oRecord.vcData1UUID = oMapEntry.vcData1UUID ?? '';
        oRecord.vcData2UUID = oMapEntry.vcData2UUID ?? '';
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
          return UPDATE(EmployeeHires)
            .set({
              salesDocumentNoSAP: oRecord.salesDocumentNoSAP,
              salesItemNoSAP: oRecord.salesItemNoSAP,
              vcData1UUID: oRecord.vcData1UUID,
              vcData2UUID: oRecord.vcData2UUID,
            })
            .where({ ID: oRecord.ID });
        }),
      );
    }

    // Update the status of passed records
    if (aPassedRecordIDs.length) {
      await ProcessLogger.removeLogs(aPassedRecordIDs);
      await UPDATE(EmployeeHires)
        .set({ valid: true, processLevel_code: sProcessCode })
        .where({ ID: { in: aPassedRecordIDs } });
    }

    // Update the status of failed records
    if (aFailedRecordIDs.length) {
      await UPDATE(EmployeeHires)
        .set({ valid: false, processLevel_code: sProcessCode })
        .where({ ID: { in: aFailedRecordIDs } });
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

  async deleteOrderPartners(sProcessCode, bBreakExecution) {
    const aRecordsForProcessing = [],
      aSkippedRecords = [],
      aErrorLogs = [],
      mPayloadIndices = new Map();
    let aDeletePayloads = [],
      aFailedRecordIDs = [],
      aPassedRecordIDs = [],
      aDeleteResponse = [];

    this.records.forEach((oRecord) => {
      if (this.shouldRecordProcess(oRecord, sProcessCode) && oRecord.salesDocumentNoSAP) {
        // If record is on step level & is already valid, then ski
        aRecordsForProcessing.push({ ...oRecord });
      } else {
        aSkippedRecords.push({ ...oRecord });
      }
    });

    this.updateProcessingState(sProcessCode);
    if (!aRecordsForProcessing.length) {
      // If Step doesn't need to be processed, simply return to avoid costly calls
      return {
        hasError: false,
        continue: true,
      };
    }

    aRecordsForProcessing.forEach((record) => {
      aDeletePayloads = [
        ...aDeletePayloads,
        {
          SalesOrder: record.salesDocumentNoSAP,
          PartnerFunction: 'ZR',
        },
        {
          SalesOrder: record.salesDocumentNoSAP,
          PartnerFunction: 'ZV',
        },
      ];
      mPayloadIndices.set(aDeletePayloads.length - 1, record.ID);
      mPayloadIndices.set(aDeletePayloads.length - 2, record.ID);
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
                  ...oError,
                });
              });
            } else {
              aErrorLogs.push({
                record_ID: sRecordID,
                message: cds.i18n.messages.at('ERR_SALES_ORDER_PARTNER_DELETION_FAILED', [
                  oResult.reason,
                ]),
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
      .where({ SalesContract: { in: [...new Set(aSalesContractWhere)] } })
  }

  // // // Prepare VC Data Payload and insert it
  // async _prepareVCData(records,mCustomerFieldNameValue, mPayloadMap, aPassedRecordIDs, aFailedRecordIDs, aErrorLogs) {
  //   const SalesVCData_1 = new SalesVCData_1Comm();
  //   const SalesVCData_2 = new SalesVCData_2Comm();
  //   const mEmployeeType = {
  //     Salary: 'SAL',
  //     Daily: 'DAY',
  //     Hourly: 'HOU',
  //   };

  //   // 1. filtering the records based on the not failed records ids.
  //   // 2. generating payload for both VCData1 & VCData2 based on the salesorder for that record id.
  //   let aPayloadsSalesVCData = records
  //     .filter((record) => !aFailedRecordIDs.includes(record.ID))
  //     .map((record) => {
  //       const oMapEntry = mPayloadMap.get(record.ID);
  //       if (oMapEntry && oMapEntry.salesOrder) {
  //         let employeeType = toEmployeeType(record.employeeSubgroup);
  //         let shift = employeeType === mEmployeeType.Hourly ? 1 : 0.0;

  //         let salary = null;

  //         if (employeeType === mEmployeeType.Salary) {
  //           salary =
  //             record.weeklySalary !== null &&
  //               record.weeklySalary !== undefined &&
  //               record.weeklySalary !== ''
  //               ? record.weeklySalary
  //               : record.biWeeklySalary !== null &&
  //                 record.biWeeklySalary !== undefined &&
  //                 record.biWeeklySalary !== ''
  //                 ? record.biWeeklySalary
  //                 : record.monthlySalary;
  //         }

  //         const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID);

  //         // Define VC1 and VC2 field mappings for EmployeeContractor
  //         const VC1CustomerFieldName = ['Z40', 'Z43', 'Z44', 'Z45', 'Z46'];
  //         const VC2CustomerFieldName = ['Z01', 'Z02', 'Z03', 'Z04', 'Z05', 'Z06', 'Z07', 'Z08', 'Z09', 'Z10', 'Z11', 'Z12',
  //           'Z16', 'Z17', 'Z18', 'Z19', 'Z24', 'Z25', 'Z26', 'Z27', 'Z28', 'Z29', 'Z31',
  //           'Z32', 'Z33', 'Z34', 'Z35', 'Z37', 'Z39', 'Z42'];
  //         const oCustFieldResult = aCustomerfieldEntry ? aCustomerfieldEntry.reduce((acc, entry) => {
  //           if (VC1CustomerFieldName.includes(entry.customerFieldName)) {
  //             acc.VC1Fields[entry.fieldName] = entry.customerFieldValue;
  //           } else if (VC2CustomerFieldName.includes(entry.customerFieldName)) {
  //             acc.VC2Fields[entry.fieldName] = entry.customerFieldValue;
  //           }
  //           return acc;
  //         }, { VC1Fields: {}, VC2Fields: {} }) : { VC1Fields: {}, VC2Fields: {} };


  //         const salesVC1 = {
  //           SalesOrderNumber: oMapEntry.salesOrder,
  //           SalesOrderItemNum: '10',
  //           YY8_WEEK_ENDING2: moment(record.beginDate).format('YYYY-MM-DD'),
  //           YY10_EMPLOYEE_TYPE: employeeType,
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
  //           YY118_MARK_UP_RG: record.markupTime,
  //           YY119_MARK_UP_OT: record.markupOT,
  //           YY120_MARK_UP_DB: record.markupDT,
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
  //           YY134_DAILY_PAY_VENDOR:
  //             employeeType === mEmployeeType.Daily ? record.dailyRate : '0.00',
  //           YY142_SALARY_PAY_VENDOR: salary,
  //           YY144_WEEKLY_CLOCK_FEE: record.custWkTimeFee,
  //           YY150_DAILY_PAY_DAYS: employeeType === mEmployeeType.Daily ? '1' : '0',
  //           YY151_DAILY_PRICE: employeeType === mEmployeeType.Daily ? record.dailyRate2 : '0.00',
  //           YY152_DAILY_TOTAL_RATE:
  //             employeeType === mEmployeeType.Daily ? record.dailyRate2 : '0.00',
  //           YY203_SALARY: employeeType === mEmployeeType.Salary ? record.monthlySalary2 : '0.00',
  //           YY216_CUST_BUSINESS_UNIT: record.custBusUnitName,
  //           YY217_CUST_CHARGE_NUMBER: record.custChrgNo,
  //           YY218_CUST_PROJECT_NUMBER: record.projectNo,
  //           YY219_CUST_COST_CENTER: record.custCostCtr,
  //           YY220_CUST_COMPANY_CODE: record.custCompCode,
  //           YY221_CUST_DEPT_NUMBER: record.custDepNo,
  //           YY222_CUST_DOTS_NUMBER: record.custDOTSNo,
  //           YY223_CUST_RUI: record.custRUI,
  //           YY224_CUST_ACCT_NUMBER: record.custAccNo,
  //           YY225_CUST_BUDGET_CENTER: record.custBudCtr,
  //           YY226_CUST_CON_NUMBER: record.custConNo,
  //           YY227_CUST_VENDOR_NUMBER: record.sgVendNoAtCust,
  //           YY228_CUST_ORG_CODE: record.custOrgName,
  //           YY229_CUST_LEGAL_ENTITY: record.custLegEnt,
  //           YY230_CUST_ORACLE_NUMBER: record.custOrcNo,
  //           YY231_CUST_UNIT_STORE_NUMBER: record.custUtStrNo,
  //           YY232_CUST_SVC_DATE: record.svcDatFrom,
  //           YY233_CUST_EMPLOYEE_NUMBER: record.custEmpNo,
  //           YY234_CUST_AGREE_NUMBER: record.custAgrName,
  //           YY235_CUST_TASK15: record.taskNo,
  //           YY236_CUST_FEPS_CODE: record.custFEPSCode,
  //           YY238_CUST_GL_CODE: record.custGLCode,
  //           YY239_CUST_PURCHASE_AGREE: record.purchaseAgreement,
  //           YY240_CUST_BB_NUMBER: record.bbNo,
  //           YY241_CUST_BGRD_CHECK_DATE: record.custBgChkDate,
  //           YY242_CUST_DIV_UNIT_NUMBER: record.custDivUnit,
  //           YY243_CUST_POSITION_CODE: record.custPosCode,
  //           YY247_ZSD_WN_WORK_ORDER_VCSD: record.wnWork,
  //           YY250_CUST_COST_CENTER2: record.custCostCtr,
  //           YY251_SHIFT1_PAY_RATE_RG: record.shiftRGFirst,
  //           YY252_SHIFT1_PAY_RATE_OT: record.shiftOTFirst,
  //           YY253_SHIFT1_PAY_RATE_DB: record.shiftDTFirst,
  //           YY254_SHIFT2_PAY_RATE_RG: record.shiftRGSecond,
  //           YY255_SHIFT2_PAY_RATE_OT: record.shiftOTSecond,
  //           YY256_SHIFT2_PAY_RATE_DB: record.shiftDTSecond,
  //           YY257_SHIFT3_PAY_RATE_RG: record.shiftRGThird,
  //           YY258_SHIFT3_PAY_RATE_OT: record.shiftOTThird,
  //           YY259_SHIFT3_PAY_RATE_DB: record.shiftDTThird,
  //           YY260_SHIFT1_TOTAL_PAY_RG: record.shiftRGFirst,
  //           YY261_SHIFT1_TOTAL_PAY_OT: record.shiftOTFirst,
  //           YY262_SHIFT1_TOTAL_PAY_DB: record.shiftDTFirst,
  //           YY263_SHIFT2_TOTAL_PAY_RG: record.shiftRGSecond,
  //           YY264_SHIFT2_TOTAL_PAY_OT: record.shiftOTSecond,
  //           YY265_SHIFT2_TOTAL_PAY_DB: record.shiftDTSecond,
  //           YY266_SHIFT3_TOTAL_PAY_RG: record.shiftRGThird,
  //           YY267_SHIFT3_TOTAL_PAY_OT: record.shiftOTThird,
  //           YY268_SHIFT3_TOTAL_PAY_DB: record.shiftDTThird,
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

  //   async _prepareVCData(
  //   records,
  //   mCustomerFieldNameValue,
  //   mPayloadMap,
  //   aPassedRecordIDs,
  //   aFailedRecordIDs,
  //   aErrorLogs
  // ) {
  //   const SalesVCData_1 = new SalesVCData_1Comm();
  //   const SalesVCData_2 = new SalesVCData_2Comm();
  //   const mEmployeeType = {
  //     Salary: 'SAL',
  //     Daily: 'DAY',
  //     Hourly: 'HOU',
  //   };

  //   // --- Z-field mapping from HANA table (decides VC1 vs VC2 by EDMX) ----------
  //   // VC1 props (from VC1 EDMX)
  //   const VC1_PROPS = new Set([
  //     'YY3_ACA_HRS_PRICE',
  //     'YY6_SC_LINE_ITEM_NUMBER',
  //     'YY8_WEEK_ENDING2',
  //     'YY10_EMPLOYEE_TYPE',
  //     'YY12_DAY1_SHIFT1_RG',
  //     'YY13_DAY1_SHIFT1_OT',
  //     'YY14_DAY1_SHIFT1_DB',
  //     'YY15_DAY1_SHIFT2_RG',
  //     'YY16_DAY1_SHIFT2_OT',
  //     'YY17_DAY1_SHIFT2_DB',
  //     'YY18_DAY1_SHIFT3_RG',
  //     'YY19_DAY1_SHIFT3_OT',
  //     'YY20_DAY1_SHIFT3_DB',
  //     'YY100_SHIFT1_TOTAL_HRS_RG',
  //     'YY101_SHIFT1_TOTAL_HRS_OT',
  //     'YY102_SHIFT1_TOTAL_HRS_DB',
  //     'YY103_SHIFT2_TOTAL_HRS_RG',
  //     'YY104_SHIFT2_TOTAL_HRS_OT',
  //     'YY105_SHIFT2_TOTAL_HRS_DB',
  //     'YY106_SHIFT3_TOTAL_HRS_RG',
  //     'YY107_SHIFT3_TOTAL_HRS_OT',
  //     'YY108_SHIFT3_TOTAL_HRS_DB',
  //     'YY109_SHIFT1_PRICE_RG',
  //     'YY110_SHIFT1_PRICE_OT',
  //     'YY111_SHIFT1_PRICE_DB',
  //     'YY112_SHIFT2_PRICE_RG',
  //     'YY113_SHIFT2_PRICE_OT',
  //     'YY114_SHIFT2_PRICE_DB',
  //     'YY115_SHIFT3_PRICE_RG',
  //     'YY116_SHIFT3_PRICE_OT',
  //     'YY117_SHIFT3_PRICE_DB',
  //     'YY118_MARK_UP_RG',
  //     'YY119_MARK_UP_OT',
  //     'YY120_MARK_UP_DB',
  //     'YY121_SHIFT1_TOTAL_PRICE_RG',
  //     'YY122_SHIFT1_TOTAL_PRICE_OT',
  //     'YY123_SHIFT1_TOTAL_PRICE_DB',
  //     'YY124_SHIFT2_TOTAL_PRICE_RG',
  //     'YY125_SHIFT2_TOTAL_PRICE_OT',
  //     'YY126_SHIFT2_TOTAL_PRICE_DB',
  //     'YY127_SHIFT3_TOTAL_PAY_RG',
  //     'YY128_SHIFT3_TOTAL_PAY_OT',
  //     'YY129_SHIFT3_TOTAL_PAY_DB',
  //   ]);

  //   // VC2 props (subset from VC2 EDMX, plus two non-YY props present in your table)
  //   const VC2_PROPS = new Set([
  //     'YY216_CUST_BUSINESS_UNIT',
  //     'YY217_CUST_CHARGE_NUMBER',
  //     'YY218_CUST_PROJECT_NUMBER',
  //     'YY219_CUST_COST_CENTER',
  //     'YY220_CUST_COMPANY_CODE',
  //     'YY221_CUST_DEPT_NUMBER',
  //     'YY222_CUST_DOTS_NUMBER',
  //     'YY223_CUST_RUI',
  //     'YY224_CUST_ACCT_NUMBER',
  //     'YY225_CUST_BUDGET_CENTER',
  //     'YY226_CUST_CON_NUMBER',
  //     'YY227_CUST_VENDOR_NUMBER',
  //     'YY228_CUST_ORG_CODE',
  //     'YY229_CUST_LEGAL_ENTITY',
  //     'YY230_CUST_ORACLE_NUMBER',
  //     'YY231_CUST_UNIT_STORE_NUMBER',
  //     'YY232_CUST_SVC_DATE',
  //     'YY233_CUST_EMPLOYEE_NUMBER',
  //     'YY234_CUST_AGREE_NUMBER',
  //     'YY235_CUST_TASK15',
  //     'YY236_CUST_FEPS_CODE',
  //     'YY237_CUST_POSITION',
  //     'YY238_CUST_GL_CODE',
  //     'YY239_CUST_PURCHASE_AGREE',
  //     'YY240_CUST_BB_NUMBER',
  //     'YY241_CUST_BGRD_CHECK_DATE',
  //     'YY242_CUST_DIV_UNIT_NUMBER',
  //     'YY243_CUST_POSITION_CODE',
  //     'YY247_ZSD_WN_WORK_ORDER_VCSD',
  //     'YY250_CUST_COST_CENTER2',

  //     // VC2 rate/total fields (your old mapping already uses these)
  //     'YY251_SHIFT1_PAY_RATE_RG',
  //     'YY252_SHIFT1_PAY_RATE_OT',
  //     'YY253_SHIFT1_PAY_RATE_DB',
  //     'YY254_SHIFT2_PAY_RATE_RG',
  //     'YY255_SHIFT2_PAY_RATE_OT',
  //     'YY256_SHIFT2_PAY_RATE_DB',
  //     'YY257_SHIFT3_PAY_RATE_RG',
  //     'YY258_SHIFT3_PAY_RATE_OT',
  //     'YY259_SHIFT3_PAY_RATE_DB',
  //     'YY260_SHIFT1_TOTAL_PAY_RG',
  //     'YY261_SHIFT1_TOTAL_PAY_OT',
  //     'YY262_SHIFT1_TOTAL_PAY_DB',
  //     'YY263_SHIFT2_TOTAL_PAY_RG',
  //     'YY264_SHIFT2_TOTAL_PAY_OT',
  //     'YY265_SHIFT2_TOTAL_PAY_DB',
  //     'YY266_SHIFT3_TOTAL_PAY_RG',
  //     'YY267_SHIFT3_TOTAL_PAY_OT',
  //     'YY268_SHIFT3_TOTAL_PAY_DB',

  //     // also VC2 totals/fees used in old code
  //     'YY134_DAILY_PAY_VENDOR',
  //     'YY142_SALARY_PAY_VENDOR',
  //     'YY144_WEEKLY_CLOCK_FEE',
  //     'YY150_DAILY_PAY_DAYS',
  //     'YY151_DAILY_PRICE',
  //     'YY152_DAILY_TOTAL_RATE',
  //     'YY203_SALARY',

  //     // Non-YY custom properties that exist in your table (VC2 side in your backend)
  //     'ACCELERATED_FEE_DISC_VEN',
  //     'CUST_CATERGORY_CODE2',
  //   ]);

  //   // Build the Z -> target property map from your table
  //   /** @type {Record<string,{target:string, vc:1|2}|undefined>} */
  //   const Z_MAP = {
  //     Z01: { target: 'YY216_CUST_BUSINESS_UNIT', vc: 2 },
  //     Z02: { target: 'YY217_CUST_CHARGE_NUMBER', vc: 2 },
  //     Z03: { target: 'YY250_CUST_COST_CENTER2', vc: 2 },
  //     Z04: { target: 'YY220_CUST_COMPANY_CODE', vc: 2 },
  //     Z05: { target: 'YY221_CUST_DEPT_NUMBER', vc: 2 },
  //     Z06: { target: 'YY222_CUST_DOTS_NUMBER', vc: 2 },
  //     Z07: { target: 'YY223_CUST_RUI', vc: 2 },
  //     Z08: { target: 'YY144_WEEKLY_CLOCK_FEE', vc: 2 },
  //     Z09: { target: 'YY224_CUST_ACCT_NUMBER', vc: 2 },
  //     Z10: { target: 'YY225_CUST_BUDGET_CENTER', vc: 2 },
  //     Z11: { target: 'YY226_CUST_CON_NUMBER', vc: 2 },
  //     Z12: { target: 'YY227_CUST_VENDOR_NUMBER', vc: 2 },
  //     // Z13..Z15 have no target in your table → ignore if present
  //     Z16: { target: 'YY228_CUST_ORG_CODE', vc: 2 },
  //     Z17: { target: 'YY229_CUST_LEGAL_ENTITY', vc: 2 },
  //     Z18: { target: 'YY230_CUST_ORACLE_NUMBER', vc: 2 },
  //     Z19: { target: 'YY231_CUST_UNIT_STORE_NUMBER', vc: 2 },
  //     // Z20..Z23 no target → ignore
  //     Z24: { target: 'YY233_CUST_EMPLOYEE_NUMBER', vc: 2 },
  //     Z25: { target: 'YY234_CUST_AGREE_NUMBER', vc: 2 },
  //     Z26: { target: 'YY241_CUST_BGRD_CHECK_DATE', vc: 2 },
  //     Z27: { target: 'YY242_CUST_DIV_UNIT_NUMBER', vc: 2 },
  //     Z28: { target: 'YY236_CUST_FEPS_CODE', vc: 2 },
  //     Z29: { target: 'YY237_CUST_POSITION', vc: 2 },
  //     // Z30 no target → ignore
  //     Z31: { target: 'YY235_CUST_TASK15', vc: 2 },
  //     Z32: { target: 'YY238_CUST_GL_CODE', vc: 2 },
  //     Z33: { target: 'YY240_CUST_BB_NUMBER', vc: 2 },
  //     Z34: { target: 'YY218_CUST_PROJECT_NUMBER', vc: 2 },
  //     Z35: { target: 'YY239_CUST_PURCHASE_AGREE', vc: 2 },
  //     // Z36 no target → ignore
  //     Z37: { target: 'YY237_CUST_POSITION', vc: 2 },
  //     // Z38 has no target in the table → ignore
  //     Z39: { target: 'CUST_CATERGORY_CODE2', vc: 2 }, // non-YY, VC2
  //     Z40: { target: 'YY6_SC_LINE_ITEM_NUMBER', vc: 1 },
  //     // Z41 has no target in the table → ignore
  //     Z42: { target: 'ACCELERATED_FEE_DISC_VEN', vc: 2 }, // non-YY, VC2
  //     Z43: { target: 'YY3_ACA_HRS_PRICE', vc: 1 },
  //     Z44: { target: 'YY118_MARK_UP_RG', vc: 1 },
  //     Z45: { target: 'YY119_MARK_UP_OT', vc: 1 },
  //     Z46: { target: 'YY120_MARK_UP_DB', vc: 1 },
  //   };

  //   // 1) Filter out already failed records; 2) Build payloads
  //   let aPayloadsSalesVCData = records
  //     .filter((record) => !aFailedRecordIDs.includes(record.ID))
  //     .map((record) => {
  //       const oMapEntry = mPayloadMap.get(record.ID);
  //       if (!(oMapEntry && oMapEntry.salesOrder)) return [];

  //       let employeeType = toEmployeeType(record.employeeSubgroup);
  //       let shift = employeeType === mEmployeeType.Hourly ? 1 : 0.0;

  //       let salary = null;
  //       if (employeeType === mEmployeeType.Salary) {
  //         salary =
  //           record.weeklySalary !== null &&
  //           record.weeklySalary !== undefined &&
  //           record.weeklySalary !== ''
  //             ? record.weeklySalary
  //             : record.biWeeklySalary !== null &&
  //               record.biWeeklySalary !== undefined &&
  //               record.biWeeklySalary !== ''
  //             ? record.biWeeklySalary
  //             : record.monthlySalary;
  //       }

  //       const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID);

  //       // Build VC1/VC2 maps using the Z table → ensures all Z fields map to the right entity
  //       const oCustFieldResult = aCustomerfieldEntry
  //         ? aCustomerfieldEntry.reduce(
  //             (acc, entry) => {
  //               const zcode = (entry.customerFieldName || '').trim();
  //               const cfg = Z_MAP[zcode];
  //               if (!cfg || !cfg.target) return acc; // Z has no mapped target, skip

  //               // Pick bucket by EDMX presence; trust our cfg.vc but also guard with props sets
  //               const targetProp = cfg.target;
  //               if (cfg.vc === 1 || VC1_PROPS.has(targetProp)) {
  //                 acc.VC1Fields[targetProp] = entry.customerFieldValue;
  //               } else if (cfg.vc === 2 || VC2_PROPS.has(targetProp)) {
  //                 acc.VC2Fields[targetProp] = entry.customerFieldValue;
  //               } else {
  //                 // fallback: if neither set knows it, prefer VC2 (most Zs are VC2)
  //                 acc.VC2Fields[targetProp] = entry.customerFieldValue;
  //               }
  //               return acc;
  //             },
  //             { VC1Fields: {}, VC2Fields: {} }
  //           )
  //         : { VC1Fields: {}, VC2Fields: {} };

  //       // --- Construct VC1 exactly like your old code (unchanged) ----------------
  //       const salesVC1 = {
  //         SalesOrderNumber: oMapEntry.salesOrder,
  //         SalesOrderItemNum: '10',
  //         YY8_WEEK_ENDING2: moment(record.beginDate).format('YYYY-MM-DD'),
  //         YY10_EMPLOYEE_TYPE: employeeType,
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
  //         YY118_MARK_UP_RG: record.markupTime,
  //         YY119_MARK_UP_OT: record.markupOT,
  //         YY120_MARK_UP_DB: record.markupDT,
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

  //       // --- Construct VC2 exactly like your old code (unchanged) ----------------
  //       const salesVC2 = {
  //         Sales_Order_Number: oMapEntry.salesOrder,
  //         Sales_Order_Item_Num: '10',
  //         YY134_DAILY_PAY_VENDOR:
  //           employeeType === mEmployeeType.Daily ? record.dailyRate : '0.00',
  //         YY142_SALARY_PAY_VENDOR: salary,
  //         YY144_WEEKLY_CLOCK_FEE: record.custWkTimeFee,
  //         YY150_DAILY_PAY_DAYS: employeeType === mEmployeeType.Daily ? '1' : '0',
  //         YY151_DAILY_PRICE:
  //           employeeType === mEmployeeType.Daily ? record.dailyRate2 : '0.00',
  //         YY152_DAILY_TOTAL_RATE:
  //           employeeType === mEmployeeType.Daily ? record.dailyRate2 : '0.00',
  //         YY203_SALARY:
  //           employeeType === mEmployeeType.Salary ? record.monthlySalary2 : '0.00',
  //         YY216_CUST_BUSINESS_UNIT: record.custBusUnitName,
  //         YY217_CUST_CHARGE_NUMBER: record.custChrgNo,
  //         YY218_CUST_PROJECT_NUMBER: record.projectNo,
  //         YY219_CUST_COST_CENTER: record.custCostCtr,
  //         YY220_CUST_COMPANY_CODE: record.custCompCode,
  //         YY221_CUST_DEPT_NUMBER: record.custDepNo,
  //         YY222_CUST_DOTS_NUMBER: record.custDOTSNo,
  //         YY223_CUST_RUI: record.custRUI,
  //         YY224_CUST_ACCT_NUMBER: record.custAccNo,
  //         YY225_CUST_BUDGET_CENTER: record.custBudCtr,
  //         YY226_CUST_CON_NUMBER: record.custConNo,
  //         YY227_CUST_VENDOR_NUMBER: record.sgVendNoAtCust,
  //         YY228_CUST_ORG_CODE: record.custOrgName,
  //         YY229_CUST_LEGAL_ENTITY: record.custLegEnt,
  //         YY230_CUST_ORACLE_NUMBER: record.custOrcNo,
  //         YY231_CUST_UNIT_STORE_NUMBER: record.custUtStrNo,
  //         YY232_CUST_SVC_DATE: record.svcDatFrom,
  //         YY233_CUST_EMPLOYEE_NUMBER: record.custEmpNo,
  //         YY234_CUST_AGREE_NUMBER: record.custAgrName,
  //         YY235_CUST_TASK15: record.taskNo,
  //         YY236_CUST_FEPS_CODE: record.custFEPSCode,
  //         YY238_CUST_GL_CODE: record.custGLCode,
  //         YY239_CUST_PURCHASE_AGREE: record.purchaseAgreement,
  //         YY240_CUST_BB_NUMBER: record.bbNo,
  //         YY241_CUST_BGRD_CHECK_DATE: record.custBgChkDate,
  //         YY242_CUST_DIV_UNIT_NUMBER: record.custDivUnit,
  //         YY243_CUST_POSITION_CODE: record.custPosCode,
  //         YY247_ZSD_WN_WORK_ORDER_VCSD: record.wnWork,
  //         YY250_CUST_COST_CENTER2: record.custCostCtr,
  //         YY251_SHIFT1_PAY_RATE_RG: record.shiftRGFirst,
  //         YY252_SHIFT1_PAY_RATE_OT: record.shiftOTFirst,
  //         YY253_SHIFT1_PAY_RATE_DB: record.shiftDTFirst,
  //         YY254_SHIFT2_PAY_RATE_RG: record.shiftRGSecond,
  //         YY255_SHIFT2_PAY_RATE_OT: record.shiftOTSecond,
  //         YY256_SHIFT2_PAY_RATE_DB: record.shiftDTSecond,
  //         YY257_SHIFT3_PAY_RATE_RG: record.shiftRGThird,
  //         YY258_SHIFT3_PAY_RATE_OT: record.shiftOTThird,
  //         YY259_SHIFT3_PAY_RATE_DB: record.shiftDTThird,
  //         YY260_SHIFT1_TOTAL_PAY_RG: record.shiftRGFirst,
  //         YY261_SHIFT1_TOTAL_PAY_OT: record.shiftOTFirst,
  //         YY262_SHIFT1_TOTAL_PAY_DB: record.shiftDTFirst,
  //         YY263_SHIFT2_TOTAL_PAY_RG: record.shiftRGSecond,
  //         YY264_SHIFT2_TOTAL_PAY_OT: record.shiftOTSecond,
  //         YY265_SHIFT2_TOTAL_PAY_DB: record.shiftDTSecond,
  //         YY266_SHIFT3_TOTAL_PAY_RG: record.shiftRGThird,
  //         YY267_SHIFT3_TOTAL_PAY_OT: record.shiftOTThird,
  //         YY268_SHIFT3_TOTAL_PAY_DB: record.shiftDTThird,
  //         ...(oCustFieldResult.VC2Fields || {}),
  //       };

  //       // ---- DEBUG LOG: constructed payloads (pretty JSON) ---------------------
  //       try {
  //         LOG.info(
  //           `[VC] Constructed payloads for record ${record.ID}`,
  //           {
  //             recID: record.ID,
  //             salesOrder: oMapEntry.salesOrder,
  //             vc1Payload: JSON.stringify(salesVC1, null, 2),
  //             vc2Payload: JSON.stringify(salesVC2, null, 2),
  //           }
  //         );
  //       } catch (e) {
  //         // best-effort logging; never break build
  //       }

  //       const recordID = record.ID;
  //       const vcData1UUID = record.vcData1UUID;
  //       const vcData2UUID = record.vcData2UUID;
  //       return [salesVC1, salesVC2, recordID, vcData1UUID, vcData2UUID];
  //     }).filter(payload => payload.length > 0);

  //   // ---- Insert loop (unchanged flow) + DEBUG logs around calls ----------------
  //   for (let i = 0; i < aPayloadsSalesVCData.length; i++) {
  //     let insertedSalesVCData1, insertedSalesVCData2;

  //     const recID = aPayloadsSalesVCData[i][2];
  //     const hasVC1Already = !!aPayloadsSalesVCData[i][3];
  //     const hasVC2Already = !!aPayloadsSalesVCData[i][4];

  //     // Pre-insert log: shows if we will insert or skip because UUID exists
  //     try {
  //       LOG.info(
  //         `[VC] PRE-INSERT for record ${recID}`,
  //         {
  //           recID,
  //           hasVC1Already,
  //           hasVC2Already,
  //           vc1Payload: JSON.stringify(aPayloadsSalesVCData[i][0], null, 2),
  //           vc2Payload: JSON.stringify(aPayloadsSalesVCData[i][1], null, 2),
  //         }
  //       );
  //     } catch (e) {}

  //     try {
  //       // TODO: Convert to Batch call (kept as-is per your request)
  //       if (!aPayloadsSalesVCData[i][3]) {
  //         insertedSalesVCData1 = await SalesVCData_1.executeQuery(
  //           INSERT.into('YY1_SALESVCDATA_1').entries(aPayloadsSalesVCData[i][0]),
  //         );
  //       }
  //       if (!aPayloadsSalesVCData[i][4]) {
  //         insertedSalesVCData2 = await SalesVCData_2.executeQuery(
  //           INSERT.into('YY1_SALESVCDATA_2').entries(aPayloadsSalesVCData[i][1]),
  //         );
  //       }
  //     } catch (e) {
  //       // capture hard errors at transport/service level
  //       aErrorLogs.push({
  //         record_ID: recID,
  //         message: `${e.message}`,
  //       });
  //       aFailedRecordIDs.push(recID);
  //       const index = aPassedRecordIDs.indexOf(recID);
  //       if (index !== -1) aPassedRecordIDs.splice(index, 1);
  //       LOG.error(`[VC] INSERT exception for record ${recID}: ${e.message}`);
  //     }

  //     // Map UUIDs back
  //     const oMapEntry = mPayloadMap.get(recID) || {};
  //     if (insertedSalesVCData1?.SAP_UUID || aPayloadsSalesVCData[i][3]) {
  //       oMapEntry.vcData1UUID =
  //         insertedSalesVCData1?.SAP_UUID ?? aPayloadsSalesVCData[i][3];
  //     }
  //     if (insertedSalesVCData2?.SAP_UUID || aPayloadsSalesVCData[i][4]) {
  //       oMapEntry.vcData2UUID =
  //         insertedSalesVCData2?.SAP_UUID ?? aPayloadsSalesVCData[i][4];
  //     }
  //     mPayloadMap.set(recID, oMapEntry);

  //     // ---- DEBUG LOG: post-insert raw results ---------------------------------
  //     try {
  //       LOG.info(
  //         `[VC] POST-INSERT result for record ${recID}`,
  //         {
  //           recID,
  //           vc1Result: JSON.stringify(insertedSalesVCData1 ?? {}, null, 2),
  //           vc2Result: JSON.stringify(insertedSalesVCData2 ?? {}, null, 2),
  //         }
  //       );
  //     } catch (e) {}

  //     // error log for failed to insert records in VCData (unchanged)
  //     if (insertedSalesVCData1?.message || insertedSalesVCData2?.message) {
  //       if (insertedSalesVCData1?.message) {
  //         aErrorLogs.push({
  //           record_ID: recID,
  //           message: `${insertedSalesVCData1.message}`,
  //         });
  //       }
  //       if (insertedSalesVCData2?.message) {
  //         aErrorLogs.push({
  //           record_ID: recID,
  //           message: `${insertedSalesVCData2.message}`,
  //         });
  //       }

  //       aFailedRecordIDs.push(recID);

  //       // remove id which is getting error from PassRecordIds.
  //       const index = aPassedRecordIDs.indexOf(recID);
  //       if (index !== -1) aPassedRecordIDs.splice(index, 1);

  //       LOG.error(
  //         `Error processing record ID ${recID}: ${insertedSalesVCData1?.message} || ${insertedSalesVCData2?.message}`,
  //       );
  //     }
  //   }
  // }

  // Prepare VC Data Payload and insert it (LOG.info only; no hard stop)
  async _prepareVCData(
    records,
    mCustomerFieldNameValue,
    mPayloadMap,
    aPassedRecordIDs,
    aFailedRecordIDs,
    aErrorLogs
  ) {
    const LOG = this.LOG || console;
    LOG.info(`[VC] ENTRY _prepareVCData: records=${records?.length ?? 0}, passedIDs=${aPassedRecordIDs.length}, failedIDs=${aFailedRecordIDs.length}`);

    const moment = require('moment');

    const SalesVCData_1 = new SalesVCData_1Comm();
    const SalesVCData_2 = new SalesVCData_2Comm();

    const mEmployeeType = { Salary: 'SAL', Daily: 'DAY', Hourly: 'HOU' };

    // ---- Z-code mapping (incl. requested Z08 & Z11) ----
    /** @type {Record<string,{target:string, vc:1|2}|undefined>} */
    const Z_MAP = {
      Z01:{target:'YY216_CUST_BUSINESS_UNIT',vc:2}, Z02:{target:'YY217_CUST_CHARGE_NUMBER',vc:2},
      Z03:{target:'YY250_CUST_COST_CENTER2',vc:2},  Z04:{target:'YY220_CUST_COMPANY_CODE',vc:2},
      Z05:{target:'YY221_CUST_DEPT_NUMBER',vc:2},   Z06:{target:'YY222_CUST_DOTS_NUMBER',vc:2},
      Z07:{target:'YY223_CUST_RUI',vc:2},           Z08:{target:'YY144_WEEKLY_CLOCK_FEE',vc:2}, // <-- fix
      Z09:{target:'YY224_CUST_ACCT_NUMBER',vc:2},   Z10:{target:'YY225_CUST_BUDGET_CENTER',vc:2},
      Z11:{target:'YY226_CUST_CON_NUMBER',vc:2},    // <-- fix
      Z12:{target:'YY227_CUST_VENDOR_NUMBER',vc:2},
      Z16:{target:'YY228_CUST_ORG_CODE',vc:2},      Z17:{target:'YY229_CUST_LEGAL_ENTITY',vc:2},
      Z18:{target:'YY230_CUST_ORACLE_NUMBER',vc:2}, Z19:{target:'YY231_CUST_UNIT_STORE_NUMBER',vc:2},
      Z24:{target:'YY233_CUST_EMPLOYEE_NUMBER',vc:2}, Z25:{target:'YY234_CUST_AGREE_NUMBER',vc:2},
      Z26:{target:'YY241_CUST_BGRD_CHECK_DATE',vc:2}, Z27:{target:'YY242_CUST_DIV_UNIT_NUMBER',vc:2},
      Z28:{target:'YY236_CUST_FEPS_CODE',vc:2},     Z29:{target:'YY237_CUST_POSITION',vc:2},
      Z31:{target:'YY235_CUST_TASK15',vc:2},        Z32:{target:'YY238_CUST_GL_CODE',vc:2},
      Z33:{target:'YY240_CUST_BB_NUMBER',vc:2},     Z34:{target:'YY218_CUST_PROJECT_NUMBER',vc:2},
      Z35:{target:'YY239_CUST_PURCHASE_AGREE',vc:2},Z37:{target:'YY237_CUST_POSITION',vc:2},
      Z30:{target:'SUPPLIER_INVOICE_NUMBER',vc:2}, // SUPPLIER'S INVOICE (SUBCON SCENARIO)
Z36:{target:'YY232_CUST_SVC_DATE',vc:2}, 
Z38:{target:'CUST_COMMODITY_CODE2',vc:2},    // SERVICE DATE - FOR SDI IBM
      Z39:{target:'CUST_CATERGORY_CODE2',vc:2},     Z40:{target:'YY6_SC_LINE_ITEM_NUMBER',vc:1},
      Z42:{target:'ACCELERATED_FEE_DISC_VEN',vc:2}, Z43:{target:'YY3_ACA_HRS_PRICE',vc:1},
      Z44:{target:'YY118_MARK_UP_RG',vc:1},         Z45:{target:'YY119_MARK_UP_OT',vc:1},
      Z46:{target:'YY120_MARK_UP_DB',vc:1},
    };

    // For quick format validation
    const DECIMAL_VC1 = new Set([
      'YY3_ACA_HRS_PRICE','YY12_DAY1_SHIFT1_RG','YY13_DAY1_SHIFT1_OT','YY14_DAY1_SHIFT1_DB',
      'YY15_DAY1_SHIFT2_RG','YY16_DAY1_SHIFT2_OT','YY17_DAY1_SHIFT2_DB','YY18_DAY1_SHIFT3_RG',
      'YY19_DAY1_SHIFT3_OT','YY20_DAY1_SHIFT3_DB','YY100_SHIFT1_TOTAL_HRS_RG','YY101_SHIFT1_TOTAL_HRS_OT',
      'YY102_SHIFT1_TOTAL_HRS_DB','YY103_SHIFT2_TOTAL_HRS_RG','YY104_SHIFT2_TOTAL_HRS_OT',
      'YY105_SHIFT2_TOTAL_HRS_DB','YY106_SHIFT3_TOTAL_HRS_RG','YY107_SHIFT3_TOTAL_HRS_OT',
      'YY108_SHIFT3_TOTAL_HRS_DB','YY109_SHIFT1_PRICE_RG','YY110_SHIFT1_PRICE_OT','YY111_SHIFT1_PRICE_DB',
      'YY112_SHIFT2_PRICE_RG','YY113_SHIFT2_PRICE_OT','YY114_SHIFT2_PRICE_DB','YY115_SHIFT3_PRICE_RG',
      'YY116_SHIFT3_PRICE_OT','YY117_SHIFT3_PRICE_DB','YY118_MARK_UP_RG','YY119_MARK_UP_OT',
      'YY120_MARK_UP_DB','YY121_SHIFT1_TOTAL_PRICE_RG','YY122_SHIFT1_TOTAL_PRICE_OT',
      'YY123_SHIFT1_TOTAL_PRICE_DB','YY124_SHIFT2_TOTAL_PRICE_RG','YY125_SHIFT2_TOTAL_PRICE_OT',
      'YY126_SHIFT2_TOTAL_PRICE_DB','YY127_SHIFT3_TOTAL_PAY_RG','YY128_SHIFT3_TOTAL_PAY_OT',
      'YY129_SHIFT3_TOTAL_PAY_DB',
    ]);
    const DATE_VC1 = new Set(['YY8_WEEK_ENDING2']);

    const DECIMAL_VC2 = new Set([
      'YY134_DAILY_PAY_VENDOR','YY142_SALARY_PAY_VENDOR','YY144_WEEKLY_CLOCK_FEE',
      'YY150_DAILY_PAY_DAYS','YY151_DAILY_PRICE','YY152_DAILY_TOTAL_RATE','YY203_SALARY',
      'YY251_SHIFT1_PAY_RATE_RG','YY252_SHIFT1_PAY_RATE_OT','YY253_SHIFT1_PAY_RATE_DB',
      'YY254_SHIFT2_PAY_RATE_RG','YY255_SHIFT2_PAY_RATE_OT','YY256_SHIFT2_PAY_RATE_DB',
      'YY257_SHIFT3_PAY_RATE_RG','YY258_SHIFT3_PAY_RATE_OT','YY259_SHIFT3_PAY_RATE_DB',
      'YY260_SHIFT1_TOTAL_PAY_RG','YY261_SHIFT1_TOTAL_PAY_OT','YY262_SHIFT1_TOTAL_PAY_DB',
      'YY263_SHIFT2_TOTAL_PAY_RG','YY264_SHIFT2_TOTAL_PAY_OT','YY265_SHIFT2_TOTAL_PAY_DB',
      'YY266_SHIFT3_TOTAL_PAY_RG','YY267_SHIFT3_TOTAL_PAY_OT','YY268_SHIFT3_TOTAL_PAY_DB',
    ]);
    const DATE_VC2 = new Set(['YY241_CUST_BGRD_CHECK_DATE','YY232_CUST_SVC_DATE']);

    const toEmployeeType = (subgrp) => {
      const s = String(subgrp || '').toUpperCase();
      if (s.includes('SAL')) return mEmployeeType.Salary;
      if (s.includes('DAY')) return mEmployeeType.Daily;
      return mEmployeeType.Hourly;
    };

    const fmtDecimal = (v) => {
      if (v === null || v === undefined || v === '') return '0.00';
      const n = Number(v);
      return Number.isFinite(n) ? n.toFixed(2) : null; // null => invalid
    };

    const fmtDateISO = (v) => {
      if (!v) return null;
      const m = moment(v, ['YYYY-MM-DD','YYYY/MM/DD','YYYYMMDD','MM/DD/YYYY','DD/MM/YYYY'], true);
      return m.isValid() ? m.format('YYYY-MM-DD') : null;
    };

    const validateFormats = (obj, decSet, dateSet, which, recID, errs) => {
      for (const [k, v] of Object.entries(obj)) {
        if (decSet.has(k)) {
          if (!(v === null || v === '' || Number.isFinite(Number(v)))) {
            const msg = `${which}: ${k} must be decimal (got '${v}')`;
            LOG.info(`[VC] ${msg} recID=${recID}`);
            errs.push({ record_ID: recID, message: msg });
          }
        }
        if (dateSet.has(k)) {
          if (!(v === null || moment(v, 'YYYY-MM-DD', true).isValid())) {
            const msg = `${which}: ${k} invalid date (got '${v}')`;
            LOG.info(`[VC] ${msg} recID=${recID}`);
            errs.push({ record_ID: recID, message: msg });
          }
        }
      }
    };

    LOG.info(`[VC] Mapping records to payloads…`);

    const prepared = records
      .filter((r) => !aFailedRecordIDs.includes(r.ID))
      .map((record) => {
        const mapEntry = mPayloadMap.get(record.ID);
        if (!(mapEntry && mapEntry.salesOrder)) {
          LOG.info(`[VC] Skip record; no SalesOrder in map. recID=${record.ID}`);
          return null;
        }

        const employeeType = toEmployeeType(record.employeeSubgroup);
        const shift = employeeType === mEmployeeType.Hourly ? 1 : 0.0;

        let salary = null;
        if (employeeType === mEmployeeType.Salary) {
          salary = record.weeklySalary ?? record.biWeeklySalary ?? record.monthlySalary ?? null;
        }

        // Collect custom fields by Z-code
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
          if (DECIMAL_VC2.has(key)) value = fmtDecimal(value); // null if non-numeric (e.g. "*")

          if (cfg.vc === 1) VC1Fields[key] = value;
          else VC2Fields[key] = value;
        }

        // Build VC1 payload
        const salesVC1 = {
          SalesOrderNumber: mapEntry.salesOrder,
          SalesOrderItemNum: '10',
          YY8_WEEK_ENDING2: fmtDateISO(record.beginDate),
          YY10_EMPLOYEE_TYPE: employeeType,
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
          YY118_MARK_UP_RG: fmtDecimal(record.markupTime),
          YY119_MARK_UP_OT: fmtDecimal(record.markupOT),
          YY120_MARK_UP_DB: fmtDecimal(record.markupDT),
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

        // Build VC2 payload from record first, then override with Z fields
        const baseVC2 = {
          Sales_Order_Number: mapEntry.salesOrder,
          Sales_Order_Item_Num: '10',
          YY134_DAILY_PAY_VENDOR: (employeeType === mEmployeeType.Daily) ? fmtDecimal(record.dailyRate) : '0.00',
          YY142_SALARY_PAY_VENDOR: fmtDecimal(salary),
          YY144_WEEKLY_CLOCK_FEE: fmtDecimal(record.custWkTimeFee), // will be overridden by Z08 if provided
          YY150_DAILY_PAY_DAYS: (employeeType === mEmployeeType.Daily) ? '1.00' : '0.00',
          YY151_DAILY_PRICE: (employeeType === mEmployeeType.Daily) ? fmtDecimal(record.dailyRate2) : '0.00',
          YY152_DAILY_TOTAL_RATE: (employeeType === mEmployeeType.Daily) ? fmtDecimal(record.dailyRate2) : '0.00',
          YY203_SALARY: (employeeType === mEmployeeType.Salary) ? fmtDecimal(record.monthlySalary2) : '0.00',
          YY216_CUST_BUSINESS_UNIT: record.custBusUnitName,
          YY217_CUST_CHARGE_NUMBER: record.custChrgNo,
          YY218_CUST_PROJECT_NUMBER: record.projectNo,
          YY219_CUST_COST_CENTER:   record.custCostCtr,
          YY220_CUST_COMPANY_CODE:  record.custCompCode,
          YY221_CUST_DEPT_NUMBER:   record.custDepNo,
          YY222_CUST_DOTS_NUMBER:   record.custDOTSNo,
          YY223_CUST_RUI:           record.custRUI,
          YY224_CUST_ACCT_NUMBER:   record.custAccNo,
          YY225_CUST_BUDGET_CENTER: record.custBudCtr,
          YY226_CUST_CON_NUMBER:    record.custConNo,
          YY227_CUST_VENDOR_NUMBER: record.sgVendNoAtCust,
          YY228_CUST_ORG_CODE:      record.custOrgName,
          YY229_CUST_LEGAL_ENTITY:  record.custLegEnt,
          YY230_CUST_ORACLE_NUMBER: record.custOrcNo,
          YY231_CUST_UNIT_STORE_NUMBER: record.custUtStrNo,
          YY232_CUST_SVC_DATE:      fmtDateISO(record.svcDatFrom),
          YY233_CUST_EMPLOYEE_NUMBER: record.custEmpNo,
          YY234_CUST_AGREE_NUMBER:  record.custAgrName,
          YY235_CUST_TASK15:        record.taskNo,
          YY236_CUST_FEPS_CODE:     record.custFEPSCode,
          YY238_CUST_GL_CODE:       record.custGLCode,
          YY239_CUST_PURCHASE_AGREE: record.purchaseAgreement,
          YY240_CUST_BB_NUMBER:     record.bbNo,
          YY241_CUST_BGRD_CHECK_DATE: fmtDateISO(record.custBgChkDate),
          YY242_CUST_DIV_UNIT_NUMBER: record.custDivUnit,
          YY243_CUST_POSITION_CODE: record.custPosCode,
          YY247_ZSD_WN_WORK_ORDER_VCSD: record.wnWork,
          YY250_CUST_COST_CENTER2:  record.custCostCtr,
          YY251_SHIFT1_PAY_RATE_RG: fmtDecimal(record.shiftRGFirst),
          YY252_SHIFT1_PAY_RATE_OT: fmtDecimal(record.shiftOTFirst),
          YY253_SHIFT1_PAY_RATE_DB: fmtDecimal(record.shiftDTFirst),
          YY254_SHIFT2_PAY_RATE_RG: fmtDecimal(record.shiftRGSecond),
          YY255_SHIFT2_PAY_RATE_OT: fmtDecimal(record.shiftOTSecond),
          YY256_SHIFT2_PAY_RATE_DB: fmtDecimal(record.shiftDTSecond),
          YY257_SHIFT3_PAY_RATE_RG: fmtDecimal(record.shiftRGThird),
          YY258_SHIFT3_PAY_RATE_OT: fmtDecimal(record.shiftOTThird),
          YY259_SHIFT3_PAY_RATE_DB: fmtDecimal(record.shiftDTThird),
          YY260_SHIFT1_TOTAL_PAY_RG: fmtDecimal(record.shiftRGFirst),
          YY261_SHIFT1_TOTAL_PAY_OT: fmtDecimal(record.shiftOTFirst),
          YY262_SHIFT1_TOTAL_PAY_DB: fmtDecimal(record.shiftDTFirst),
          YY263_SHIFT2_TOTAL_PAY_RG: fmtDecimal(record.shiftRGSecond),
          YY264_SHIFT2_TOTAL_PAY_OT: fmtDecimal(record.shiftOTSecond),
          YY265_SHIFT2_TOTAL_PAY_DB: fmtDecimal(record.shiftDTSecond),
          YY266_SHIFT3_TOTAL_PAY_RG: fmtDecimal(record.shiftRGThird),
          YY267_SHIFT3_TOTAL_PAY_OT: fmtDecimal(record.shiftOTThird),
          YY268_SHIFT3_TOTAL_PAY_DB: fmtDecimal(record.shiftDTThird),
        };

        // Apply Z overrides (incl. Z08 for YY144_WEEKLY_CLOCK_FEE)
        const salesVC2 = { ...baseVC2, ...VC2Fields };

        // Validate formats; if invalid, mark failed and skip inserts for this record
        const localErrs = [];
        validateFormats(salesVC1, DECIMAL_VC1, DATE_VC1, 'VC1', record.ID, localErrs);
        validateFormats(salesVC2, DECIMAL_VC2, DATE_VC2, 'VC2', record.ID, localErrs);
        if (localErrs.length) {
          aErrorLogs.push(...localErrs);
          aFailedRecordIDs.push(record.ID);
          const idx = aPassedRecordIDs.indexOf(record.ID);
          if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
          LOG.info(`[VC] Validation failed; skipping inserts recID=${record.ID}`);
          return null;
        }

        return {
          salesVC1,
          salesVC2,
          recID: record.ID,
          vcData1UUID: record.vcData1UUID,
          vcData2UUID: record.vcData2UUID,
        };
      })
      .filter(Boolean);

    LOG.info(`[VC] Payloads prepared: count=${prepared.length}`);
    if (!prepared.length) {
      LOG.info(`[VC] EXIT _prepareVCData: nothing to insert.`);
      return;
    }

    // Insert loop (no hard stop; errors mark record failed and continue)
    for (const row of prepared) {
      const { salesVC1, salesVC2, recID } = row;
      let insertedSalesVCData1, insertedSalesVCData2;

      LOG.info(`[VC] PRE-INSERT recID=${recID}`);

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
        aErrorLogs.push({ record_ID: recID, message: e?.message || 'VC1 INSERT exception' });
        aFailedRecordIDs.push(recID);
        const idx = aPassedRecordIDs.indexOf(recID);
        if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
        // continue to next record (no hard stop)
        continue;
      }
      if (insertedSalesVCData1?.message) {
        LOG.info(`[VC] VC1 service error recID=${recID}: ${insertedSalesVCData1.message}`);
        aErrorLogs.push({ record_ID: recID, message: insertedSalesVCData1.message });
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
        aErrorLogs.push({ record_ID: recID, message: e?.message || 'VC2 INSERT exception' });
        aFailedRecordIDs.push(recID);
        const idx = aPassedRecordIDs.indexOf(recID);
        if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
        continue;
      }
      if (insertedSalesVCData2?.message) {
        LOG.info(`[VC] VC2 service error recID=${recID}: ${insertedSalesVCData2.message}`);
        aErrorLogs.push({ record_ID: recID, message: insertedSalesVCData2.message });
        aFailedRecordIDs.push(recID);
        const idx = aPassedRecordIDs.indexOf(recID);
        if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
        continue;
      }

      // Map UUIDs back (only on success)
      const oMapEntry = mPayloadMap.get(recID) || {};
      if (insertedSalesVCData1?.SAP_UUID || row.vcData1UUID) {
        oMapEntry.vcData1UUID = insertedSalesVCData1?.SAP_UUID ?? row.vcData1UUID;
      }
      if (insertedSalesVCData2?.SAP_UUID || row.vcData2UUID) {
        oMapEntry.vcData2UUID = insertedSalesVCData2?.SAP_UUID ?? row.vcData2UUID;
      }
      mPayloadMap.set(recID, oMapEntry);

      LOG.info(`[VC] POST-INSERT recID=${recID}`, {
        vcData1UUID: oMapEntry.vcData1UUID,
        vcData2UUID: oMapEntry.vcData2UUID,
      });
    }

    LOG.info(`[VC] EXIT _prepareVCData`);
  }


  /**
   * Prepare data for SalesOrder creation
   * @param {object} mParams
   * @param {object} mParams.record - EmployeeHires record
   * @param {object} mParams.salesContract - SalesContract record
   * @param {object} mParams.partner - BusinessPartner record
   * @param {object} mParams.paymentTermsMap - Map of payment terms
   * @param {object} mParams.taxCode - Tax code
   * @returns {object} SalesOrder payload with 'errors' property. `errors` property MUST BE removed before sending to S/4HANA
   */
  _prepareDataForSalesOrderCreate({
    record,
    salesContract,
    billingType,
    businessPartnerMap,
    paymentTermsMap,
    taxCode,
    recEmplNo,
    personnelNoSAP,
    empResponsible,
    salesContractItem
  }) {
    const mBenefitTypeToGrp1 = {
      '01': 'ZBN',
      '02': 'ZBY',
      '03': 'ZEB',
    };
    let oReturnData = {
      SalesOrderType: 'OR',
      SoldToParty: record.soldToParty,
      SalesOrganization: salesContract.SalesOrganization,
      DistributionChannel: salesContract.DistributionChannel,
      OrganizationDivision: salesContract.OrganizationDivision,
      SalesOffice: record.salesOffice,
      PurchaseOrderByShipToParty: '100',
      PricingDate: `/Date(${+moment()})/`,
      IncotermsClassification: 'DAP',
      IncotermsLocation1: '1',
      CustomerPaymentTerms: 'NT65',
      YY1_CustomSalesOrder_SDH: 'ZWCP',
      AdditionalCustomerGroup1: mBenefitTypeToGrp1[record.benefitType.padStart(2, '0')],
      AdditionalCustomerGroup2: record.workNexusIndicator ? 'ZWY' : 'ZWN',
      AdditionalCustomerGroup3: '',
      ReferenceSDDocumentCategory: 'G',
      YY1_AlphanumericSalesO_SDH: record.workOrderDoc,
      to_Item: [
        {
          SalesOrderItemCategory: 'TADN',
          Material: record.material,
          RequestedQuantity: '1',
          RequestedQuantityUnit: 'LAB',
          RequestedQuantitySAPUnit: 'LAB',
          RequestedQuantityISOUnit: '_01',
          TransactionCurrency: record.currency_code,
          YY1_EEGroup_SD_SDI: record.employeeSubgroup,
          YY1_StrTimeMarkup_SD_SDI: record.markupTime,
          YY1_OverTimeMarkup_SD_SDI: record.markupOT,
          YY1_DoubTimeMarkup_SD_SDI: record.markupDT,
          YY1_WNWorkOrder_SD_SDI: record.wnWork,
          YY1_CustomBillingType_SDI: billingType.Billing_type,
          ProductionPlant: salesContract.SalesOrganization,
          ReferenceSDDocument: record.contractNo,
          ReferenceSDDocumentItem: salesContractItem.SalesContractItem,
          WBSElement: record.projectNumberSAP,
          CustomerPurchaseOrderDate: record.custPODateLbr,
          to_ScheduleLine: [this._prepareDataForScheduleLine({ record })],
          to_Text:[],
        },
      ],
      to_Partner: this._preparePartnerFunctions({ record, businessPartnerMap, taxCode, recEmplNo, personnelNoSAP, empResponsible }),
      errors: [],
      
    };

    if (record.sourcedSDC) {
      oReturnData.AdditionalCustomerGroup3 = 'ZI';
    }
    if (record.soldToParty?.startsWith('IC')) {
      oReturnData.CustomerGroup = 'ZI';
    }

    // CustomerPaymentTerms logic (currently marked red)
    const oPaymentTerm = paymentTermsMap.get(record.soldToParty);
    if (oPaymentTerm?.customerTerm) {
      oReturnData.CustomerPaymentTerms = oPaymentTerm.customerTerm;
    }

    if (oPaymentTerm?.poBox) {
      oReturnData.PurchaseOrderByShipToParty = oPaymentTerm.poBox;
    }

    if (
      ['1100', '1200', '1500', '2500'].includes(record.companyCode) &&
      ['CP', 'CR', 'SC'].includes(salesContract.OrganizationDivision)
    ) {
      oReturnData.PurchaseOrderByCustomer = record.custPONoLbr;
    }

    if (record.beginDate) {
      oReturnData.to_Item[0].YY1_WeekEnd_SD_SDI = `/Date(${moment(record.beginDate, "YYYYMMDD").valueOf()})/`;
    }

    // Fill Item information
    // const oSalesContractItem = salesContract._Item.find(
    //   (item) => item.Product === record.material && item.SalesContract === record.contractNo,
    // );

    // if (oSalesContractItem) {
    //   oReturnData.to_Item[0].ReferenceSDDocumentItem = oSalesContractItem.SalesContractItem;
    // } else {
    //   oReturnData.errors.push({
    //     record_ID: record.ID,
    //     message: cds.i18n.messages.at('ERR_MATERIAL_NOT_FOUND', [
    //       record.material,,
    //       record.contractNo,
    //     ]),
    //   });
    // }

    if (
      !(
        ['1100', '1200', '1500', '2500'].includes(record.companyCode) &&
        ['CP', 'CR', 'SC'].includes(salesContract.OrganizationDivision)
      )
    ) {
      oReturnData.to_Item[0].PurchaseOrderByCustomer = record.custPONoLbr;
    }

    // Fill custom fields
    for (const fieldIndex of Array(15).keys()) {
      if (record[`customerFieldName${fieldIndex + 1}`] === 'Z20') {
        oReturnData.to_Item[0].to_Text.push({
          LongText: record[`customerFieldValue${fieldIndex + 1}`],
          LongTextID: 'ZJOB',
          Language: 'EN'
        });
        // break;,
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
   * @param {Map} params.businessPartnerMap - Map of BusinessPartner data
   * @param {string} params.taxCode - Tax code
   * @returns {object} Partner Functions payload
   */
  _preparePartnerFunctions({ record, businessPartnerMap, taxCode, recEmplNo, personnelNoSAP, empResponsible }) {
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

    //TODO: Commented for Data inconsistency due to sync
    // SAP Employee
    aPartnerFunctions.push({
      PartnerFunction: 'Z3',
      Personnel: personnelNoSAP,
    });

    // Branch Payroll Rep
    if (record.employeeResponsible) {
      aPartnerFunctions.push({
        PartnerFunction: 'ZB',
        Customer: empResponsible,
      });
    }

    // Recruiter
    if (record.recruiterEmployeeNo) {
      aPartnerFunctions.push({
        PartnerFunction: 'ZC',
        Customer: recEmplNo,
      });
    }

    // Ship to Party (at header)
    const oShipToParty = businessPartnerMap.get(`${record.soldToParty}_SH`);  // Defect _WE to _SH
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
    if (record.country_code !== 'CA') {
      oAddr.DistrictName = record.county;
    }
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
        oAddr.AddresseeFullName = record.workLocation; // Check again
      }
      if (record.invoiceDistributionEmail) {
        oAddr.EmailAddress = record.invoiceDistributionEmail;
      }
      aPartnerFunctions.push({
        PartnerFunction: 'Z5',
        //Customer: oShipToParty.BPCustomerNumber,
        ContactPerson: oEmailContact.BPCustomerNumber,
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
    // Customer contact info
    // if (record.custManEmail || record.custManName || record.custManPhone) {
    //  const oContactInfo = businessPartnerMap.get(`${record.soldToParty}_Z4`);
    //   oAddr.AddresseeFullName = record.custManName || '';
    //   oAddr.PhoneNumber = record.custManPhone || '';
    //   oAddr.EmailAddress = record.custManEmail || '';

    //   aPartnerFunctions.push({
    //     PartnerFunction: 'Z4',
    //     //Customer: oShipToParty.BPCustomerNumber,
    //     ContactPerson: oContactInfo.ContactPerson,,
    //     to_Address: [oAddr],
    //   });
    // }

    return aPartnerFunctions;
  }

  _getTaxCodeForRecord({ record, aTaxCodeByProvince, aTaxCodeByCity, aTaxCodeByCounty,aAddresses }) {
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
            laddr  = aAddresses.find(
            (addr) =>
              addr.zipcode === record.postalCode              
          );
          record.county = laddr?.county?.toUpperCase();
          oTaxCode = aTaxCodeByCounty.find(
            (oTaxCode) =>
              oTaxCode.county === record.county &&
              oTaxCode.region === record.region &&
              oTaxCode.country_code === record.country_code,
          ); // CHECK: Does record.county exists yet ???
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

  async processProject(sProcessCode, bBreakExecution) {
    this.LOG._info && this.LOG.info('Logging _processProject');

    let aRecordsForProcessing = [],
      aSkippedRecords = [],
      aErrorLogs = [],
      aPassedRecordIDs = [],
      aFailedRecordIDs = [],
      aRecordIDs = [];

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
        EnterpriseProjectType: record.payroll === 'IC' ? 'Z4' : '40',
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
          if (!aRecordsForProcessing[i].personnelNoSAP) {
            aErrorLogs.push({
              record_ID: aRecordsForProcessing[i].ID,
              message: cds.i18n.messages.at('ERR_EMP_NUMBER_MISSING'),
            });
            aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
            continue; // Skip this record
          }
          let insertedProject = await this.enterpriseProjectAPI.executeQuery(
            INSERT.into('A_EnterpriseProject').entries(aPayloads[i]),
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
            await UPDATE('MonitorService.EmployeeHires')
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
              message: `${insertedProject.message}`,
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
          aRecordsForProcessing[i].salesDocumentNoSAP
        );
        let releaseProject = await this.enterpriseProjectAPI.releaseProject(
          aRecordsForProcessing[i].projectUUID,
          "10"
        );
        if (updatedProject.message) {
          aErrorLogs.push({
            record_ID: aRecordsForProcessing[i].ID,
            message: `${updatedProject.message}`,
          });
          aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
          LOG.error(
            `Error processing record ID ${aRecordsForProcessing[i].ID}: ${updatedProject.message}`,
          );
        } else if (releaseProject.message) {
          aErrorLogs.push({
            record_ID: aRecordsForProcessing[i].ID,
            message: `${releaseProject.message}`,
          });
          aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
          LOG.error(
            `Error processing record ID ${aRecordsForProcessing[i].ID}: ${releaseProject.message}`,
          );
        } else {
          await UPDATE('MonitorService.EmployeeHires')
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
      await UPDATE(EmployeeHires)
        .set({ valid: false, processLevel_code: sProcessCode })
        .where({ ID: { in: aFailedRecordIDs } });
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
      aFailedRecordIDs = [],
      aRecordIDs = [];

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
    //   SALES_ORD_SAP: record.salesDocumentNoSAP,
    //   PROJECT_ID: record.projectNumberSAP,
    //   PROJECT_NAME: `${record.soldToParty}-${record.personnelNoSAP}`,
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

      return {
        WORKER_ID: record.personnelNoSAP,
        Name: record.lastName,
        FirstName: record.firstName,
        MiddleName: record.middleName || '',
        WorkScheduleRule: record.workScheduleRule || '',
        WorkScheduleType: record.workScheduleType || '',
        EmployeePersonnelArea: personnelSubArea,
        EmploymentType: record.salesDocumentType,
        SSN: record.ssn,
        EMP_GRP: record.employeeGroup,
        EMP_SUBGRP: record.employeeSubgroup,
        START_DATE: moment(record.beginDate).format('YYYY-MM-DD'),
        // END_DATE:  moment(record.beginDate).add(10, 'years').format('YYYY-MM-DD'),// 12/31/9999
        END_DATE: '9999-12-31',
        CONTRAT_SAP: record.contractNo,
        SALES_ORD_SAP: record.salesDocumentNoSAP,
        PROJECT_ID: record.projectNumberSAP,
        PROJECT_NAME: `${record.soldToParty}-${record.personnelNoSAP}`,
        CUSTOMER_ID: record.billToParty,
        SS_ORDER: record.workOrderDoc,
        WN_ORDER: record.workNexusIndicator ? record.wnWork : record.workOrderDoc,
        POSITION_ID: record.plansSAP,
        ZPAYROLL: zPayroll,
        RECRID: record.recruiterEmployeeNo,
        ZTIME_IND: record.workNexusIndicator ? 'Yes' : 'No',
        ZHIRE_ACTION: record.hireAct === 'X' ? 'Yes' : 'No',
        ACTION_TYPE: record.actionIndicator,
        T_REASON: '', //record.actionReason,
        ZHRREPT: '',
        CreatedOn: moment().format('YYYY-MM-DD')
      };
    });

    for (let i = 0; i < aPayloads.length; i++) {
      let CustomerInfo = await this.empCustInfoAPI.executeQuery(
        INSERT.into('YY1_EMPLOYEE_CUSTOMER_INFO').entries(aPayloads[i]),
      );
      if (CustomerInfo.PROJECT_ID) {
        await UPDATE(EmployeeHires)
          .set({
            valid: true,
            processLevel_code: sProcessCode,
          })
          .where({ ID: aRecordsForProcessing[i].ID });

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

    //update HR Cost Distribution Object
    // let aHRPayloads = aRecordsForProcessing.map((record) => ({
    //   SAP_Description: "",
    //   WorkerID: record.personnelNoSAP,
    //   StartDate: moment(record.beginDate).format('YYYY-MM-DD'),
    //   EndDate: moment(record.beginDate).add(10, 'years').format('YYYY-MM-DD'),
    //   CompanyCode1: "",
    //   //CompanyCode1_Text: "",
    //   Project1: record.projectNumberSAP,
    //   Percentage1: "100.00",
    //   CompanyCode2: "",
    //  // CompanyCode2_Text: "Aleron Shared Resources,",
    //   Project2: "",
    //   Percentage2: "0.00",
    //   CompanyCode3: "",
    //  // CompanyCode3_Text: "",
    //   Project3: "",
    //   Percentage3: "0.00",
    //   CompanyCode4: "",
    //  // CompanyCode4_Text: "",
    //   Project4: "",
    //   Percentage4: "0.00",
    //   CompanyCode5: "",
    //   //CompanyCode5_Text: "",
    //   Project5: "",
    //   Percentage5: "0.00",
    //   CompanyCode6: "",
    //   //CompanyCode6_Text: "",
    //   Project6: "",
    //   Percentage6: "0.00",
    // }));

    // for (let i = 0; i < aHRPayloads.length; i++) {
    //   let HRCostObj= await this.HrCostDistObjAPI.executeQuery(
    //     INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(aHRPayloads[i]),
    //   );
    //   if (HRCostObj) {

    //   } else {
    //     LOG.error(
    //       `Error processing record ID ${aRecordsForProcessing[i].ID}: HRCostDistData Not lloaded`,
    //     );
    //   }
    // }


    if (aErrorLogs.length) {
      await ProcessLogger.addLogs(aErrorLogs);
      await UPDATE(EmployeeHires)
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

  // async processHrCostDistObj(sProcessCode, bBreakExecution) {
  //   this.LOG._info && this.LOG.info('Logging _processHrCostDistObj');

  //   let aRecordsForProcessing = [],
  //     aSkippedRecords = [],
  //     aErrorLogs = [],
  //     aPassedRecordIDs = [],
  //     aFailedRecordIDs = [];

  //   let aRecordIDs = [];

  //   for (const record of this.records) {
  //     if (this.shouldRecordProcess(record, sProcessCode)) {
  //       aRecordsForProcessing.push({ ...record });
  //       aRecordIDs.push(record.ID);
  //     } else {
  //       aSkippedRecords.push({ ...record });
  //       continue;
  //     }
  //   }

  //   await ProcessLogger.removeLogs(aRecordIDs);

  //   this.updateProcessingState(sProcessCode);
  //   if (!aRecordsForProcessing.length) {
  //     return {
  //       hasError: false,
  //       continue: true,
  //     };
  //   }

  //   // let aHRPayloads = aRecordsForProcessing.map(record => ({
  //   //   WorkerID: record.personnelNoSAP,
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
  //   //     await UPDATE(EmployeeHires)
  //   //       .set({
  //   //         valid: true,
  //   //         processLevel_code: sProcessCode,
  //   //       })
  //   //       .where({ ID: aRecordsForProcessing[i].ID });
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
    
  //   // new code 3-1837
  //   // Create two inserts per record with CostDistribution: '1' and '2'  
  // //   rec.personnelNoSAP and startDate
  //   for (let i = 0; i < aRecordsForProcessing.length; i++) {
  //     const rec = aRecordsForProcessing[i];

  //     // Base payload (same as before)
  //     const base = {
  //       WorkerID: rec.personnelNoSAP,
  //       StartDate: moment(rec.beginDate).format('YYYY-MM-DD'),
  //       // EndDate: moment(rec.beginDate).add(10, 'years').format('YYYY-MM-DD'),
  //       EndDate: '9999-12-31',
  //       CompanyCode1: rec.companyCode,
  //       CompanyCode1_Text: rec.companyCodeDescription || '',
  //       Project1: rec.projectNumberSAP,
  //       Percentage1: '100.00',
  //     };

  //     // Fire both inserts in parallel
  //     const [ins1, ins2] = await Promise.allSettled([
  //       this.HrCostDistObjAPI.executeQuery(
  //         INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries({ ...base, CostDistribution: '01' })
  //       ),
  //       this.HrCostDistObjAPI.executeQuery(
  //         INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries({ ...base, CostDistribution: '02' })
  //       ),
  //     ]);

  //     const ok1 = ins1.status === 'fulfilled' && !ins1.value?.error;
  //     const ok2 = ins2.status === 'fulfilled' && !ins2.value?.error;

  //     if (ok1 && ok2) {
  //       await UPDATE(EmployeeHires)
  //         .set({ valid: true, processLevel_code: sProcessCode })
  //         .where({ ID: rec.ID });
  //       aPassedRecordIDs.push(rec.ID);
  //     } else {
  //       const msg1 = ins1.status === 'rejected' ? ins1.reason?.message : ins1.value?.message;
  //       const msg2 = ins2.status === 'rejected' ? ins2.reason?.message : ins2.value?.message;

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
  //     await UPDATE(EmployeeHires)
  //       .set({ valid: false, processLevel_code: sProcessCode })
  //       .where({ ID: { in: aFailedRecordIDs } });
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

  // async processHrCostDistObj(sProcessCode, bBreakExecution) {
  //   this.LOG._info && this.LOG.info('Logging _processHrCostDistObj');

  //   let aRecordsForProcessing = [],
  //     aSkippedRecords = [],
  //     aErrorLogs = [],
  //     aPassedRecordIDs = [],
  //     aFailedRecordIDs = [];

  //   let aRecordIDs = [];

  //   for (const record of this.records) {
  //     if (this.shouldRecordProcess(record, sProcessCode)) {
  //       aRecordsForProcessing.push({ ...record });
  //       aRecordIDs.push(record.ID);
  //     } else {
  //       aSkippedRecords.push({ ...record });
  //       continue;
  //     }
  //   }

  //   await ProcessLogger.removeLogs(aRecordIDs);

  //   this.updateProcessingState(sProcessCode);
  //   if (!aRecordsForProcessing.length) {
  //     return {
  //       hasError: false,
  //       continue: true,
  //     };
  //   }

  //   // let aHRPayloads = aRecordsForProcessing.map(record => ({
  //   //   WorkerID: record.personnelNoSAP,
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
  //   //     await UPDATE(EmployeeHires)
  //   //       .set({
  //   //         valid: true,
  //   //         processLevel_code: sProcessCode,
  //   //       })
  //   //       .where({ ID: aRecordsForProcessing[i].ID });
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
    
  //   // new code 3-1837
  //   // Create two inserts per record with CostDistribution: '1' and '2'  
  //   for (let i = 0; i < aRecordsForProcessing.length; i++) {
  //     const rec = aRecordsForProcessing[i];
  //     const newStartDate = moment(rec.beginDate).format('YYYY-MM-DD');
      
  //     try {
  //       // Query for existing records where StartDate < newStartDate and EndDate > newStartDate
  //       const existingRecords = await this.HrCostDistObjAPI.executeQuery(
  //         SELECT.from('YY1_HRCOSTDISTRIBUTIONOBJ')
  //           .where({
  //             WorkerID: rec.personnelNoSAP,
  //             StartDate: { '<': newStartDate },
  //             EndDate: { '>': newStartDate }
  //           })
  //       );

  //       let allOperationsSuccess = true;
  //       const errors = [];

  //       // Base payload for new records
  //       const base = {
  //         WorkerID: rec.personnelNoSAP,
  //         StartDate: newStartDate,
  //         EndDate: '9999-12-31',
  //         CompanyCode1: rec.companyCode,
  //         CompanyCode1_Text: rec.companyCodeDescription || '',
  //         Project1: rec.projectNumberSAP,
  //         Percentage1: '100.00',
  //       };

  //       if (existingRecords && existingRecords.length > 0) {
  //         // Existing records found - need to close them and create new ones
  //         this.LOG._info && this.LOG.info(`Found ${existingRecords.length} existing records for WorkerID ${rec.personnelNoSAP}`);
          
  //         // Calculate the end date for existing records (new start date - 1 day)
  //         const closingEndDate = moment(rec.beginDate).subtract(1, 'days').format('YYYY-MM-DD');

  //         // Process each existing record - close it and create new records
  //         for (const existingRec of existingRecords) {
  //           try {
  //             // Create closed record with CostDistribution '01'
  //             const closedRecord1 = {
  //               ...base,
  //               StartDate: existingRec.StartDate, // Keep original StartDate
  //               EndDate: closingEndDate, // Set EndDate to new StartDate - 1 day
  //               CostDistribution: '01'
  //             };
              
  //             const insertClosed1 = await this.HrCostDistObjAPI.executeQuery(
  //               INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(closedRecord1)
  //             );

  //             if (insertClosed1?.error || insertClosed1?.message) {
  //               allOperationsSuccess = false;
  //               errors.push(`Failed to close existing record with CostDistribution 01: ${insertClosed1?.message || 'Unknown error'}`);
  //             }

  //             // Create closed record with CostDistribution '02'
  //             const closedRecord2 = {
  //               ...base,
  //               StartDate: existingRec.StartDate, // Keep original StartDate
  //               EndDate: closingEndDate, // Set EndDate to new StartDate - 1 day
  //               CostDistribution: '02'
  //             };
              
  //             const insertClosed2 = await this.HrCostDistObjAPI.executeQuery(
  //               INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(closedRecord2)
  //             );

  //             if (insertClosed2?.error || insertClosed2?.message) {
  //               allOperationsSuccess = false;
  //               errors.push(`Failed to close existing record with CostDistribution 02: ${insertClosed2?.message || 'Unknown error'}`);
  //             }

  //             // Insert new record with CostDistribution '01'
  //             const newRecord1 = {
  //               ...base,
  //               CostDistribution: '01'
  //             };

  //             const insertNew1 = await this.HrCostDistObjAPI.executeQuery(
  //               INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(newRecord1)
  //             );

  //             if (insertNew1?.error || insertNew1?.message) {
  //               allOperationsSuccess = false;
  //               errors.push(`Failed to insert new record with CostDistribution 01: ${insertNew1?.message || 'Unknown error'}`);
  //             }

  //             // Insert new record with CostDistribution '02'
  //             const newRecord2 = {
  //               ...base,
  //               CostDistribution: '02'
  //             };

  //             const insertNew2 = await this.HrCostDistObjAPI.executeQuery(
  //               INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(newRecord2)
  //             );

  //             if (insertNew2?.error || insertNew2?.message) {
  //               allOperationsSuccess = false;
  //               errors.push(`Failed to insert new record with CostDistribution 02: ${insertNew2?.message || 'Unknown error'}`);
  //             }

  //             // Delete the original existing record after successful inserts
  //             if (existingRec.SAP_UUID) {
  //               const deleteExisting = await this.HrCostDistObjAPI.executeQuery(
  //                 DELETE.from('YY1_HRCOSTDISTRIBUTIONOBJ').where({ SAP_UUID: existingRec.SAP_UUID })
  //               );

  //               if (deleteExisting?.error || deleteExisting?.message) {
  //                 allOperationsSuccess = false;
  //                 errors.push(`Failed to delete existing record: ${deleteExisting?.message || 'Unknown error'}`);
  //                 this.LOG._error && this.LOG.error(`Failed to delete existing record with UUID ${existingRec.SAP_UUID}`);
  //               }
  //             }

  //           } catch (err) {
  //             allOperationsSuccess = false;
  //             errors.push(`Exception processing existing record: ${err.message}`);
  //             this.LOG._error && this.LOG.error(`Error processing existing record: ${err.message}`);
  //           }
  //         }
  //       } else {
  //         // No existing records found - create new records with CostDistribution '01' and '02'
  //         const [ins1, ins2] = await Promise.allSettled([
  //           this.HrCostDistObjAPI.executeQuery(
  //             INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries({ ...base, CostDistribution: '01' })
  //           ),
  //           this.HrCostDistObjAPI.executeQuery(
  //             INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries({ ...base, CostDistribution: '02' })
  //           ),
  //         ]);

  //         const ok1 = ins1.status === 'fulfilled' && !ins1.value?.error;
  //         const ok2 = ins2.status === 'fulfilled' && !ins2.value?.error;

  //         if (!ok1 || !ok2) {
  //           allOperationsSuccess = false;
  //           const msg1 = ins1.status === 'rejected' ? ins1.reason?.message : ins1.value?.message;
  //           const msg2 = ins2.status === 'rejected' ? ins2.reason?.message : ins2.value?.message;
            
  //           if (!ok1) errors.push(`[CostDistribution 01] ${msg1 || 'Unknown error'}`);
  //           if (!ok2) errors.push(`[CostDistribution 02] ${msg2 || 'Unknown error'}`);
  //         }
  //       }

  //       if (allOperationsSuccess) {
  //         await UPDATE(EmployeeHires)
  //           .set({ valid: true, processLevel_code: sProcessCode })
  //           .where({ ID: rec.ID });
  //         aPassedRecordIDs.push(rec.ID);
  //       } else {
  //         let errorMessage = 'CostDistribution operation failed: ';
  //         if (errors.length > 0) errorMessage += errors.join(', ');

  //         aErrorLogs.push({
  //           record_ID: rec.ID,
  //           message: errorMessage.trim(),
  //         });
  //         aFailedRecordIDs.push(rec.ID);

  //         LOG.error(`Error processing record ID ${rec.ID}: ${errorMessage.trim()}`);
  //       }
  //     } catch (err) {
  //       aErrorLogs.push({
  //         record_ID: rec.ID,
  //         message: `Exception in processHrCostDistObj: ${err.message}`,
  //       });
  //       aFailedRecordIDs.push(rec.ID);
  //       this.LOG._error && this.LOG.error(`Exception processing record ID ${rec.ID}: ${err.message}`);
  //     }
  //   }



  //   if (aErrorLogs.length) {
  //     await ProcessLogger.addLogs(aErrorLogs);
  //     await UPDATE(EmployeeHires)
  //       .set({ valid: false, processLevel_code: sProcessCode })
  //       .where({ ID: { in: aFailedRecordIDs } });
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

    // let aHRPayloads = aRecordsForProcessing.map(record => ({
    //   WorkerID: record.personnelNoSAP,
    //   StartDate: moment(record.beginDate).format('YYYY-MM-DD'),
    //   EndDate: moment(record.beginDate).add(10, 'years').format('YYYY-MM-DD'),
    //   CompanyCode1: record.companyCode,
    //   CompanyCode1_Text: record.companyCodeDescription || '',
    //   Project1: record.projectNumberSAP,
    //   Percentage1: '100.00'
    // }));

    // for (let i = 0; i < aHRPayloads.length; i++) {
    //   let HRCostObj = await this.HrCostDistObjAPI.executeQuery(
    //     INSERT.into('YY1_HRCOSTDISTRIBUTIONOBJ').entries(aHRPayloads[i])
    //   );
    //   if (HRCostObj && !HRCostObj.error) {
    //     await UPDATE(EmployeeHires)
    //       .set({
    //         valid: true,
    //         processLevel_code: sProcessCode,
    //       })
    //       .where({ ID: aRecordsForProcessing[i].ID });
    //     aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
    //   } else {
    //     aErrorLogs.push({
    //       record_ID: aRecordsForProcessing[i].ID,
    //       message: HRCostObj ? HRCostObj.message : 'Unknown error',
    //     });
    //     aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
    //     LOG.error(
    //       `Error processing record ID ${aRecordsForProcessing[i].ID}: ${HRCostObj ? HRCostObj.message : 'Unknown error'}`,
    //     );
    //   }
    // }
    
    // new code 3-1837
    // Create two inserts per record with CostDistribution: '1' and '2'  
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
          await UPDATE(EmployeeHires)
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
      await UPDATE(EmployeeHires)
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

module.exports = EmployeeContractor;
