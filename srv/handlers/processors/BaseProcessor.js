const cds = require('@sap/cds');
const ProcessLogger = require('../common/ProcessLogger');

// Common Entities & Enum from data model
const {
  Files,
  InterfaceSteps,
  FileStatus: {
    elements: {
      code: {enum: mFileStatusEnum},
    },
  },
} = cds.entities('com.aleron.monitor');

class Processor {
  constructor(options) {
    this.file = options.file;
    this.recordIDs = new Set(options.recordIDs ?? []); // Unique record IDs
    this.records = options.records || [];
    this.columnsForRecords = [];
    // Processing configurators
    this.nextProcessStepCodes = [];
    this.previousProcessStepCodes = [];
    this.excludeFromFurtherProcessing = new Set();
    // Extra Information for future iterations
    this.locale = options.locale;

    // Extra variable for easy for base method
    this.LOG = cds.log('Monitor.Procesor-BaseProcessor');
  }

  async validate() {
    try {
      this.LOG._info && this.LOG.info('Starting Validate');

      this.prepareCommunicators();
      await this._fetchRecords(this.recordIDs);

      const {hasError} = await this.validateRecords('1', true);

      return {
        hasError,
        errors: [],
      };
    } catch (err) {
      this.LOG._error && this.LOG.error(err.message);
      return {
        hasError: true,
        errors: [err.message],
      };
    }
  }

  /**
   * Starts the process for EmployeeContractor from the provided step, otherwise from the beginning
   * If end step is provided, then stops the execution of further steps, otherwise till end
   * @param {object} options - Options for the process
   * @param {string} [options.from='-1'] - The step to start from
   * @returns {Promise<boolean>} true if the process is started successfully
   * @public
   */
  async startProcess({from = '-1'}) {
    // Prepare the environment
    this.prepareCommunicators();
    await this._fetchRecords(this.recordIDs);
    // Spawn a process & provide the caller response on true;
    try {
      this.LOG._info && this.LOG.info(`Starting Processor for ${this.recordsEntity}`);
      // this.countryRegionAPI = new CountryRegionComm();
      const job = cds.spawn(
        {user: this.user, locale: this.locale},
        this._runSteps.bind(this, {from}),
      );

      job.on('succeeded', () => {
        this.LOG._info && this.LOG.info('Processor succeeded');
      });
      job.on('failed', (err) => {
        this.LOG._error && this.LOG.error('Processor failed', err);
      });
      return true;
    } catch (err) {
      throw new Error(`Couldn't spawn the background job for Processor, ${err.message}`);
    }
  }

  async markRecordsCompleted(sProcessCode, bBreakExecution) {
    const aRecordsForProcessing = [];
    await this._fetchRecords(this.recordIDs);
    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode)) {
        aRecordsForProcessing.push(record.ID);
      }
    }

    try  {
      if (aRecordsForProcessing.length) {
        await ProcessLogger.removeLogs(aRecordsForProcessing, null, sProcessCode);
        await ProcessLogger.addLogs(
          aRecordsForProcessing.map((sId) => ({
            record_ID: sId,
            message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]),
            process_code: sProcessCode,
            type: 3,
          })),
        );
        await this.markRecordsValid(sProcessCode, aRecordsForProcessing, true);
      }

      return {
        hasError: false,
        continue: true,
      };
    } catch (err) {
      this.LOG._error && this.LOG.error(err.message);
      return {
        hasError: true,
        continue: false,
      };
    }
  }

  // Utility Methods for Processors
  async markRecordsValid(processCode, recordIDs = [], valid = false) {
    try {

      await UPDATE(this.recordsEntity)
        .set({valid, processLevel_code: processCode})
        .where({ID: {in: recordIDs}});

      return true;
    } catch (err) {
      this.LOG._error && this.LOG.error(`Records couldn't be marked, ${err.message}`);
      return false;
    }
  }

  // Processing public methods
  updateProcessingState(currentProcessCode) {
    this.nextProcessStepCodes.shift(); // Remove the next step from processing
    this.previousProcessStepCodes.push(currentProcessCode); // Add the current step to previous steps
  }

  shouldRecordProcess(record, sProcessCode) {
    const aCompletedRecordLevel = ['8', '9', 'Z'];
    
    // Skip record if it's at a completed/rejected level
    if (aCompletedRecordLevel.includes(record.processLevel_code)) {
      return false;
    }
    
    if (
      // Skip record if (record level = process step level & is valid) OR (record level is higher than current process level)
      !(
        (record.processLevel_code === sProcessCode && record.valid) ||
        this.nextProcessStepCodes?.includes(record.processLevel_code) ||
        this.excludeFromFurtherProcessing?.has(record.ID)
      )
    ) {
      return true;
    }
    return false;
  }

  updateExclusionSet({passed = [], failed = [], skipped = [], bBreakExecution = false}) {
    // If the step is expects to break and record was processed in this step, that means it should be excluded going forward
    // E.g. Step 0 should be processed till 1 but after that it needs to stopped
    // E.g. record starting with step '2' should not be excluded in this step
    const allowedInterfaceTypes = ['T', 'U', '1', 'S'];
    passed.forEach((recordID) =>
      bBreakExecution ? this.excludeFromFurtherProcessing.add(recordID) : null,
    );
    failed.forEach((recordID) => this.excludeFromFurtherProcessing.add(recordID));

    // If records are skipped, they should be excluded from further processing if they are on lower process levels than current one or at current process level
    skipped.forEach((record) => {
      if (this.previousProcessStepCodes?.includes(record.processLevel_code)) {
        if (allowedInterfaceTypes.includes(this.file.interfaceType_ID) && 
            record.processLevel_code === '1' && record.valid) {
          // Don't add to exclusion set for these specific conditions
          return;
        }
        this.excludeFromFurtherProcessing.add(record.ID);
      }
    });
  }

  // Private Methods section

  async _runSteps({from}) {
    // Get the steps for this interfacetypes
    // Prepare queries for each interface step & pass on the communicator class or method of the processor

    let aInterfaceSteps = await SELECT.from(InterfaceSteps)
      .where({
        interfaceType_ID: this.file.interfaceType_ID,
      })
      .columns((step) => {
        step.ID,
          step.name,
          step.process_code,
          step.breakExecution,
          step.runner.executor.as('executor');
      })
      .orderBy('ID');

    let iStartIndex = 0;
    this.previousProcessStepCodes = ['0'];
    if (!['0', '-1'].includes(from)) {
      // if process is not on File Load or Process File is triggered; then check where to start
      iStartIndex = aInterfaceSteps.findIndex((step) => step.process_code === from);
    }

    if (iStartIndex === -1) {
      // Step was not found & we don't need to run the steps
      this.LOG._error && this.LOG.error(cds.i18n.messages.at('ERR_NO_STEP_TO_PROCESS', [from]));
    }

    aInterfaceSteps = aInterfaceSteps.slice(iStartIndex);
    this.nextProcessStepCodes = aInterfaceSteps.map((step) => step.process_code) ?? [];
    // this.nextProcessStepCodes.shift();
    this.updateProcessingState(aInterfaceSteps[0].process_code);

    for (const oStep of aInterfaceSteps) {

      try {
        if (!oStep.executor || !this[oStep.executor]) {
          this.updateProcessingState(oStep.process_code);
          // No executor defined of this step. Skip the step
          continue;
        }

        
        // Executor is available and run the step with the current process_code of step
        const {hasError} = await this[oStep.executor](
          oStep.process_code,
          oStep.breakExecution || false,
        );
        if (hasError) {
          // This step encountered any error, it will stop further execution
          //break;
        }
      } catch (err) {
        this.LOG._error && this.LOG.error(`${oStep.name}: ${err.message}`);
        break;
      }
    }

    const aCompletedRecordLevel = ['8', '9', 'Z'];
    // Fetch any record that has reached end of processing life
    const oCompletedQuery = SELECT.one
      .columns(['ID'])
      .from(this.recordsEntity)
      .where({file_ID: this.file.ID, processLevel_code: {in: aCompletedRecordLevel}});
    // Fetch any record that either has not reached end of life or is not intial
    const oPartialQuery = SELECT.one
      .from(this.recordsEntity)
      .columns(['ID'])
      .where({
        file_ID: this.file.ID,
        processLevel_code: {not: {in: [...aCompletedRecordLevel, '0']}},
      });
    // Fetch any record that is in initial state
    const oInitialQuery = SELECT.one
      .from(this.recordsEntity)
      .columns(['ID'])
      .where({file_ID: this.file.ID, processLevel_code: '0'});

    const [{value: oCompletedRecord}, {value: oPartialRecord}, {value: oInitialRecord}] =
      await Promise.allSettled([oCompletedQuery, oPartialQuery, oInitialQuery]);

    let sFileStatusCode = mFileStatusEnum.partial.val,
      bSomeCompleted = Boolean(oCompletedRecord),
      bSomePartial = Boolean(oPartialRecord),
      bSomeInitial = Boolean(oInitialRecord);

    // If no partial exist > completed & initial are mutually exclusive then mark accordingly

    if (!bSomePartial) {
      if (bSomeCompleted && !bSomeInitial) {
        sFileStatusCode = mFileStatusEnum.done.val;
      } else if (bSomeInitial && !bSomeCompleted) {
        sFileStatusCode = mFileStatusEnum.initial.val;
      }
    }

    try {
      await UPDATE(Files).set({status_code: sFileStatusCode}).where({ID: this.file.ID});
      this.LOG._info &&
        this.LOG.info(`File status updated to ${sFileStatusCode} for file: ${this.file.ID}`);
    } catch (err) {
      this.LOG._error && this.LOG.error(err.message);
    }
  }

  async _fetchRecords(stRecordID) {
    const aCompletedRecordLevel = ['8', '9', 'Z'];
    try {
      let oWhere = {
        file_ID: this.file.ID,
        processLevel_code: {not: {in: aCompletedRecordLevel}},
      };
      // aRecordID is Set so we are checking size insted of length
      if (stRecordID?.size) {
        oWhere.ID = {in: Array.from(stRecordID)};
      }else if (stRecordID !== undefined && stRecordID !== null) {
        this.records = [];
        return true;
      }
      this.records = await SELECT.from(this.recordsEntity)
        .columns(this.columnsForRecords)
        .where(oWhere);
      this.LOG._info && this.LOG.info(`Records fetched successfully`);
      return true;
    } catch (err) {
      this.LOG._error && this.LOG.error(err.message);
      throw new Error(`Failed to fetch record`);
    }
  }

  customerFieldNameValues(record, mCustomerFieldNameValue, aCustomerFieldNamesWhere){
    const customerfieldEntries = [];

      // Loop through the 15 possible customer fields for the current record
      for (const fieldIndex of Array(15).keys()) {
        let customerFieldName = record[`customerFieldName${fieldIndex + 1}`];
        let customerFieldValue = record[`customerFieldValue${fieldIndex + 1}`];

        // If the field name exists, push it to the array
        if (customerFieldName) {
          if (customerFieldValue && customerFieldName === 'Z39' && customerFieldValue.length > 15) {
            customerFieldValue = customerFieldValue.substring(0, 15);
          }
          // General case
          else if (customerFieldValue && customerFieldValue.length > 30) {
            customerFieldValue = customerFieldValue.substring(0, 30);
          }
          customerfieldEntries.push({ customerFieldName:customerFieldName, customerFieldValue:customerFieldValue , fieldName: ""});
          if (!aCustomerFieldNamesWhere.includes(customerFieldName)) {
            aCustomerFieldNamesWhere.push(customerFieldName);
          }
        }
      }

      mCustomerFieldNameValue.set(record.ID, customerfieldEntries);
      return { mCustomerFieldNameValue, aCustomerFieldNamesWhere };
  }

  // Method declarations which needs to be implemented at inheriting class
  prepareCommunicators() {}
  async validateRecords() {}
}

module.exports = Processor;
