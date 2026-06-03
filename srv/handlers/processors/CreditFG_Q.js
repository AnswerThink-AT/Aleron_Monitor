//Interface Q
const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Procesor-WorkOrdersWN');
const ProcessLogger = require('../common/ProcessLogger');
const SalesContractComm = require('../communicators/SalesContract');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SalesOrderComm = require('../communicators/SalesOrder');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');

// Utility functions
const {toODataDate, toEmployeeType, todateConvert_Project} = require('../common/utils');

// List of required entities
const {
  Files,
  WorkOrders_WN,
  InterfaceSteps,
  FieldValidations,
  FieldValidations: {
    elements: {
      validation: {enum: mFieldValidationTypeEnum},
    },
  },
} = cds.entities('com.aleron.monitor');


class CreditFG {

    constructor(options) {
/*        this.salesContractAPI = null;
        this.businesPartnerAPI = null;
        this.countryRegionAPI = null;
        this.salesOrderAPI = null;
        this.salesOrderV2API = null;
*/
        this.locale = options.locale;
        this.file = options.file;
        this.recordIDs = new Set(options.recordIDs ?? []); // Unique record IDs
        this.records = options.records ?? [];
    }

    /**
    * Starts the process for EmployeeContractor from the provided step, otherwise from the beginning
    * If end step is provided, then stops the execution of further steps, otherwise till end
    * @param {object} options - Options for the process
    * @param {string} [options.from='-1'] - The step to start from
    * @param {string} [options.to='-1'] - The step to end
    * @returns {Promise<boolean>} true if the process is started successfully
    * @public
    */

    async startProcess({from = '-1', to = '-1'}) {
        // Spawn a process & provide the caller response on true;
        try {

            
          LOG._info && LOG.info('Starting WorkOrdersWN');
          this.salesContractAPI = new SalesContractComm();
          this.businesPartnerAPI = new BusinessPartnerComm();
          this.salesOrderAPI = new SalesOrderComm;
          this.salesOrderV2API = new SalesOrderComm({
            type: 'v2',
          });
          
          const job = cds.spawn(
            {user: this.user, locale: this.locale},
            this._runSteps.bind(this, {from, to}),
          );
    
          job.on('succeeded', () => {
            LOG._info && LOG.info('Credit succeeded');
          });
          job.on('failed', (err) => {
            LOG._error && LOG.error('Credit failed', err);
          });
          return true;
        } catch (err) {
          throw new Error(`Couldn't spawn the background job for WorkOrdersWN, ${err.message}`);
        }
    }

    async _runSteps({from, to}) {

        // Get the records for this file
        await this._fetchRecords(this.recordIDs);
                // Get the steps for this interfacetypes
        // Prepare queries for each interface step & pass on the communicator class or method of the processor
        let bHasStarted = from === '-1' ? true : false,
            bHasReachedEnd = false,
            sLastProcessedStep;
        const aInterfaceSteps = await SELECT.from(InterfaceSteps)
            .where({
            interfaceType_ID: this.file.interfaceType_ID,
            })
            .columns((step) => {
            step.ID, step.name, step.process_code, step.runner.executor.as('executor');
            })
            .orderBy('ID');
        for (const oStep of aInterfaceSteps) {
            try {
            if (!oStep.executor) {
                continue;
            }
            if (!bHasReachedEnd && oStep.process_code === from) {
                bHasStarted = true;
            }
            if (!bHasReachedEnd && oStep.process_code === to) {
                bHasReachedEnd = true;
            }
            if (bHasReachedEnd) {
                break;
            }
            if (!bHasStarted) {
                continue;
            }
            
            const {hasError} = await this[oStep.executor](oStep.process_code);
            if (hasError) {
                break;
            }
            sLastProcessedStep = oStep.process_code;
            } catch (err) {
            LOG._error && LOG.error(`${oStep.name}: ${err.message}`);
            break;
            }
        }

        if (sLastProcessedStep === '4') {
            //FIXME: Change to more dynamic expression to check last step in interfacesteps
            try {
            await UPDATE(Files).set({status_code: '3'}).where({ID: this.file.ID}); // FIXME: Change to enum
            LOG._info && LOG.info('File status updated to done');
            } catch (err) {
            LOG._error && LOG.error(err.message);
            }
        }

    }

    async _fetchRecords(aRecordID) {
        try {
            let oWhere = {
            file_ID: this.file.ID,
            };
            if (aRecordID?.length) {
            oWhere.ID = {in: Array.from(aRecordID)};
            }
            const aRecordColumns = this._getColumnsForFetch('TO DO TO DO TO DO');
            this.records = await SELECT.from(WorkOrders_WN).columns(aRecordColumns).where(oWhere);
            LOG._info && LOG.info(`Records fetched successfully`);
            return true;
        } catch (err) {
            LOG._error && LOG.error(err.message);
            throw new Error(`Failed to fetch record`);
        }
    }

    _getColumnsForFetch(sEntity) {
        const mEntityColumns = {
            WorkOrders_WN: [
            ...['ID', 'file_ID', 'homeLocation_code', 'actionIndicator'], // mandatory columns
            ///// TO DO TO DO
        ]
        };

        return [...new Set(mEntityColumns[sEntity])];
    }


    //interface steps
//Step 1 (Validate Data)
    async validate(sProcessCode){

    }

    //Step H (Reject SO)
    async RejectSO(sProcessCode){
      
    }

    //Step I (Reject SO for InterCompany)
    async RejectSOIC(sProcessCode){
      
    }

    //Step J (Cancel MIRO)
    async CancelMIRO(sProcessCode){
      
    }

    //Step K (Cancel Purchase Order)
    async CancelPO(sProcessCode){
      
    }

    //Step L (Create Credit Memo)
    async CancelCRMEMO(sProcessCode){
      
    }

    //Step M (Create Credit Memo for Intercompany)
    async CancelCRMEMOIC(sProcessCode){
      
    }

    //Step N (Create MIRO)
    async CreditMIRO(sProcessCode){
      
    }



}