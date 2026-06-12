const cds = require('@sap/cds');
// const moment = require('moment');
const LOG = cds.log('monitor-service');
const constant = require('../utils/constant');
// Utilities
const SequenceHelper = require('../lib/SequenceHelper');
const { attachUploadSequenceHook } = require('../lib/UploadSequence'); // NEW


// Interface File mapping
const InterfaceMapping = require('./configurations/InterfaceToProcessorMappings.json');
// Interface Imports
const WorkOrderWNInterface = require('./processors/WorkOrdersWN');
const WorkOrderVNInterface = require('./processors/WorkOrdersVN');
const WorkOrderFGInterface = require('./processors/WorkOrdersFG');
const EmployeeContractorInterface = require('./processors/EmployeeContractor');
const EmployeeStaffInterface = require('./processors/EmployeeStaff');
const TimeContractorInterface = require('./processors/TimeContractor_3');
const TimeStaffInterface = require('./processors/TimeStaff_C');
const SOWscWOInterface = require('./processors/SOWscWO');
const SOWscInvoiceInterface = require('./processors/SOWscInvoice');
const DrugBackgroundCheckProcessor = require('./processors/DrugBackgroundCheck');
const Bonus_GInterface = require('./processors/Bonus_G');

const TermProcessor = require('./processors/Term');
const FgTimeInvoiceInterface = require('./processors/FgtimeInvoice');
const FgCreditRebill = require('./processors/FgCreditRebill');
const CreditFG = require('./processors/CreditRebill_D');
const TravelInterface = require('./processors/Travel');
// const BillingTypeComm = require('./communicators/BillingType');

// Communicators import - ONLY FOR TESTING
const SalesOrderComm = require('./communicators/SalesOrder');
const OtherBillables = require('./processors/OtherBillables');
const MetadataService = require('./MetadataService');
// const BusinessPartnerComm = require('./communicators/BusinessPartner');

// Enum for InterfaceTypes
const mInterfaceTypes = Object.freeze({
  WorkOrdersWN: '1',
  EmployeeContractor: 'T',
  EmployeeStaff: 'U',
  WorkOrdersVN: 'S',
  WorkOrdersFG: 'M',
  FgTimeInvoice: 'N',
  CreditFG: 'D',
  FgCreditRebill: 'Q',
  TimeContractor: '3',
  TimeStaff: 'C',
  SOWscWO: 'E',
  SOWscInvoice: 'F',
  DrugBackgroundCheckProcessor: 'A',
  Travel: '2',
  SOWscInvoice: 'F',
  Bonus_G: 'G',
  OtherBillables: 'O'
});
const interfaceTypeIdToEntityName = {
    '1': 'WorkOrders_WN',
    'S': 'WorkOrders',
    '3': 'Times',
    'T': 'EmployeeHires',
    'U': 'StaffHires',
    'E': 'SowScWo',
    'F': 'SowScInvoice',
    '2': 'Travel',
    'G': 'Bonus',
    'O': 'OtherBillables',
    'N': 'Fg_Invoices',
    'M': 'WorkOrders_FG',
    'A': 'Drug_Background_Check',
    'D': 'Credit_Rebill',
    'Q': 'Fg_Credit_Rebill',
    'C': 'Times'
};

// Entities
// const { EmployeeHires, ProcessLogs, StaffHires, WorkOrders_WN, WorkOrders, SowScWo, SowScInvoice, Bonus } = cds.entities('com.aleron.monitor');
const { EmployeeHires, ProcessLogs, StaffHires, WorkOrders_WN, WorkOrders, SowScWo, SowScInvoice, Bonus, Travel,Fg_Credit_Rebill, Credit_Rebill, Fg_Invoices, Terminations, Times,Drug_Background_Check } = cds.entities('com.aleron.monitor');
class MonitorService extends cds.ApplicationService {
  init() {
    const { Files } = this.entities;
    this.metadataService = new MetadataService();
    // List of interfaces & their processors
    this.WorkOrderWNInterface = WorkOrderWNInterface;
    this.WorkOrderVNInterface = WorkOrderVNInterface;
    this.WorkOrderFGInterface = WorkOrderFGInterface;
    this.EmployeeContractorInterface = EmployeeContractorInterface;
    this.EmployeeStaffInterface = EmployeeStaffInterface;
    this.TimeContractorInterface = TimeContractorInterface;
    this.TimeStaffInterface = TimeStaffInterface;
    this.SOWscWOInterface = SOWscWOInterface;
    this.SOWscInvoiceInterface = SOWscInvoiceInterface;
    this.Bonus_GInterface = Bonus_GInterface;
    this.TermProcessor = TermProcessor;
    this.FgTimeInvoiceInterface = FgTimeInvoiceInterface;
    this.FgCreditRebill = FgCreditRebill;
    this.CreditFG = CreditFG;
    this.DrugBackgroundCheckProcessor = DrugBackgroundCheckProcessor;
    this.TravelInterface = TravelInterface;
    this.OtherBillablesInterface = OtherBillables;


    this.before(['CREATE'], [Files, Files.drafts], this._onBeforeFilesCreate);
    this.on('processFile', this._onProcessFile);
    this.on('uploadInterfaceData', this._uploadInterfaceData);
    this.on('rejectFile', this._onRejectFile);
    this.on('validateFile', this._onValidateFile);
    this.on('updateRecords', this._onUpdateRecords);
    this.on('addLogs', this._addLogs);
    this.on('updateLogs', this._updateLogs);
            // Handle metadata validation actions
    this.on('getEntityMetadata', async (req) => {
      try {
        const { interfaceId } = req.data;
        const metadata = await this.metadataService.getInterfaceEntityMetadata(interfaceId);
        
        return {
          entityName: metadata.entityName,
          fields: JSON.stringify(metadata.fields),
          requiredFields: JSON.stringify(metadata.requiredFields),
          constraints: JSON.stringify(metadata.constraints)
        };
      } catch (error) {
        req.error(400, error.message);
      }
    });
    this.after('READ', [this.entities.Files,this.entities.Files.drafts], async (files, req) => {
      if (!Array.isArray(files)) files = [files];

      for (const file of files) {
        // Extract the interfaceType_ID properly
        const key =
          file.interfaceType_ID ||
          (file.interfaceType && file.interfaceType.ID) ||
          null;

        if (!key) {
          file.processLevelCounts = 'No interface type ID';
          continue;
        }

        const entityName = interfaceTypeIdToEntityName[key];
        if (!entityName) {
          file.processLevelCounts = `No entity mapping for key [${key}]`;
          continue;
        }

        const entity = this.entities[entityName];
        if (!entity) {
          file.processLevelCounts = `No entity found for [${entityName}]`;
          continue;
        }

        const records = await this.run(
          SELECT.from(entity)
            .where({ file_ID: file.ID })
            .columns('processLevel_code', 'valid')
            .limit(10000)
        );
        const levelSummary = {};

        for (const rec of records) {
          const level = rec.processLevel_code || 'Unknown';
          const isValid = rec.valid === true ? 'Yes' : 'No';

          if (!levelSummary[level]) {
            levelSummary[level] = { Yes: 0, No: 0 };
          }

          levelSummary[level][isValid]++;
        }
        const sortedLevels = Object.keys(levelSummary).sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true })
        );
        const parts = [];
        for (const level of sortedLevels) {
          const yesCount = levelSummary[level].Yes;
          const noCount = levelSummary[level].No;

          // Skip completely empty levels
          if (yesCount === 0 && noCount === 0) continue;

          let segment = `${level} -`;
          const details = [];
          if (yesCount > 0) details.push(`${yesCount} Yes`);
          if (noCount > 0) details.push(`${noCount} No`);

          // Combine Yes/No parts for the same level
          segment += ` ${details.join(' & ')}`;
          parts.push(segment);
        }

        file.processLevelCounts = parts.length > 0 ? parts.join(' | ') : 'No process levels found';

        file.showFacet_M  = true;
        file.showFacet_1  = true;
        file.showFacet_S  = true;
        file.showFacet_3  = true;
        file.showFacet_T  = true;
        file.showFacet_U  = true;
        file.showFacet_E  = true;
        file.showFacet_F  = true;
        file.showFacet_2  = true;
        file.showFacet_G  = true;
        file.showFacet_O  = true;
        file.showFacet_N  = true;
        file.showFacet_A  = true;
        file.showFacet_D  = true;
        file.showFacet_Q  = true;
        file.showFacet_C  = true;
        file.showFacet_4  = true;
        
        if (key === 'M')  file.showFacet_M  = false;
        if (key === '1')  file.showFacet_1  = false;
        if (key === 'S')  file.showFacet_S  = false;
        if (key === '3')  file.showFacet_3  = false;
        if (key === 'T')  file.showFacet_T  = false;
        if (key === 'U')  file.showFacet_U  = false;
        if (key === 'E')  file.showFacet_E  = false;
        if (key === 'F')  file.showFacet_F  = false;
        if (key === '2')  file.showFacet_2  = false;
        if (key === 'G')  file.showFacet_G  = false;
        if (key === 'O')  file.showFacet_O  = false;
        if (key === 'N')  file.showFacet_N  = false;
        if (key === 'A')  file.showFacet_A  = false;
        if (key === 'D')  file.showFacet_D  = false;
        if (key === 'Q')  file.showFacet_Q  = false;
        if (key === 'C')  file.showFacet_C  = false;
        if (key === '4')  file.showFacet_4  = false;
      }
    });
    // this.on('validateRecords', async (req) => {
    //   try {
    //     const { interfaceId, records } = req.data;
    //     const metadata = await this.metadataService.getInterfaceEntityMetadata(interfaceId);
        
    //     const allErrors = [];
    //     records.forEach((recordJson, index) => {
    //       try {
    //         const record = JSON.parse(recordJson);
    //         const errors = this.metadataService.validateRecord(record, metadata, index + 1);
    //         allErrors.push(...errors);
    //       } catch (parseError) {
    //         allErrors.push({
    //           field: 'JSON',
    //           message: `Invalid JSON in record ${index + 1}: ${parseError.message}`,
    //           code: 'INVALID_JSON',
    //           severity: 'error',
    //           recordIndex: index + 1
    //         });
    //       }
    //     });

    //     return {
    //       isValid: allErrors.length === 0,
    //       errors: JSON.stringify(allErrors),
    //       errorCount: allErrors.length
    //     };
    //   } catch (error) {
    //     req.error(400, error.message);
    //   }
    // });

    this.on('validateRecords', async (req) => {
      try {
        const { interfaceId, records } = req.data;
        const metadata = await this.metadataService.getInterfaceEntityMetadata(interfaceId);
        
        const allErrors = [];
        
        // Process records sequentially to handle async validation
        for (let index = 0; index < records.length; index++) {
          const recordJson = records[index];
          try {
            const record = JSON.parse(recordJson);
            // Call async validateRecord with await (includes format validation)
            const errors = await this.metadataService.validateRecord(record, metadata, index + 1);
            allErrors.push(...errors);
          } catch (parseError) {
            allErrors.push({
              field: 'JSON',
              message: `Invalid JSON in record ${index + 1}: ${parseError.message}`,
              code: 'INVALID_JSON',
              severity: 'error',
              recordIndex: index + 1
            });
          }
        }

        return {
          isValid: allErrors.length === 0,
          errors: JSON.stringify(allErrors),
          errorCount: allErrors.length
        };
      } catch (error) {
        req.error(400, error.message);
      }
    });
    this.on('createEmployeeHires', async (req) => {
      const employeeHiresArray = req.data.employeeHires;
      if (!Array.isArray(employeeHiresArray)) {
        return req.error(400, 'Input must be an array of EmployeeHires');
      }
      try {
        var that = this;
        const results = await Promise.all(
          employeeHiresArray.map(function(emp){
            // Marital status logic
            if (emp.maritalStatus === '0') {
              emp.maritalStatus = 'S';
            } else if (emp.maritalStatus === '1') {
              emp.maritalStatus = 'M';
            }
            // Leading Zerod removal function
            emp = that._trimFieldsForZeros(emp);
            return INSERT.into(EmployeeHires).entries(emp);
          }))
        return results;
      }
      catch (err) {
        req.error(500, 'Failed to create EmployeeHires: ' + err.message);
      }
    });
    this.on('createTimes', async (req) => {
      const timesArray = req.data.times;
      if (!Array.isArray(timesArray)) {
        return req.error(400, 'Input must be an array of Times');
      }
      try {
        const results = await Promise.all(
          timesArray.map(time => INSERT.into(this.entities.Times).entries(time))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create Times: ' + err.message);
      }
    });
    this.on('createWorkOrders', async (req) => {
      const workOrdersArray = req.data.workOrders;
      if (!Array.isArray(workOrdersArray)) {
        return req.error(400, 'Input must be an array of WorkOrders');
      }
      try {
        const results = await Promise.all(
          workOrdersArray.map(order => INSERT.into(this.entities.WorkOrders).entries(order))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create WorkOrders: ' + err.message);
      }
    });
    this.on('createWorkOrders_WN', async (req) => {
      const workOrdersWNArray = req.data.workOrders_WN;
      if (!Array.isArray(workOrdersWNArray)) {
        return req.error(400, 'Input must be an array of WorkOrders_WN');
      }
      try {
        const results = await Promise.all(
          workOrdersWNArray.map(order => INSERT.into(this.entities.WorkOrders_WN).entries(order))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create WorkOrders_WN: ' + err.message);
      }
    });
    this.on('createWorkOrders_FG', async (req) => {
      const workOrdersFGArray = req.data.workOrders_FG;
      if (!Array.isArray(workOrdersFGArray)) {
        return req.error(400, 'Input must be an array of WorkOrders_FG');
      }
      try {
        const results = await Promise.all(
          workOrdersFGArray.map(order => INSERT.into(this.entities.WorkOrders_FG).entries(order))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create WorkOrders_FG: ' + err.message);
      }
    });
    this.on('createStaffHires', async (req) => {
      const staffHiresArray = req.data.staffHires;
      if (!Array.isArray(staffHiresArray)) {
        return req.error(400, 'Input must be an array of StaffHires');
      }
      try {
        var that = this;
        const results = await Promise.all(
          staffHiresArray.map(function(staff) {
            // Leading Zerod removal function
            staff = that._trimFieldsForZeros(staff);
            return INSERT.into(StaffHires).entries(staff)
          }))
        return results;
      } catch (err) {
        req.error(500, 'Failed to create StaffHires: ' + err.message);
      }
    });
    this.on('createTerminations', async (req) => {
      const terminationsArray = req.data.terminations;
      if (!Array.isArray(terminationsArray)) {
        return req.error(400, 'Input must be an array of Terminations');
      }
      try {
        const results = await Promise.all(
          terminationsArray.map(term => INSERT.into(this.entities.Terminations).entries(term))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create Terminations: ' + err.message);
      }
    });
    this.on('createFg_Invoices', async (req) => {
      const fgInvoicesArray = req.data.fg_Invoices;
      if (!Array.isArray(fgInvoicesArray)) {
        return req.error(400, 'Input must be an array of Fg_Invoices');
      }
      try {
        const results = await Promise.all(
          fgInvoicesArray.map(inv => INSERT.into(this.entities.Fg_Invoices).entries(inv))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create Fg_Invoices: ' + err.message);
      }
    });
    this.on('createCredit_Rebill', async (req) => {
      const creditRebillArray = req.data.credit_Rebill;
      if (!Array.isArray(creditRebillArray)) {
        return req.error(400, 'Input must be an array of Credit_Rebill');
      }
      try {
        const results = await Promise.all(
          creditRebillArray.map(cr => INSERT.into(this.entities.Credit_Rebill).entries(cr))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create Credit_Rebill: ' + err.message);
      }
    });
    this.on('createFg_Credit_Rebill', async (req) => {
      const fgCreditRebillArray = req.data.fg_Credit_Rebill;
      if (!Array.isArray(fgCreditRebillArray)) {
        return req.error(400, 'Input must be an array of Fg_Credit_Rebill');
      }
      try {
        const results = await Promise.all(
          fgCreditRebillArray.map(fgcr => INSERT.into(this.entities.Fg_Credit_Rebill).entries(fgcr))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create Fg_Credit_Rebill: ' + err.message);
      }
    });

    this.on('createTravel', async (req) => {
      const travelArray = req.data.travel;
      if (!Array.isArray(travelArray)) {
        return req.error(400, 'Input must be an array of Travel');
      }
      try {
        const results = await Promise.all(
          travelArray.map(travel => INSERT.into(Travel).entries(travel))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create Travel: ' + err.message);
      }
    });
    this.on('createSowScWo', async (req) => {
      const sowScWoArray = req.data.sowScWo;
      if (!Array.isArray(sowScWoArray)) {
        return req.error(400, 'Input must be an array of SowScWo');
      }
      try {
        const results = await Promise.all(
          sowScWoArray.map(sowScWo => INSERT.into(SowScWo).entries(sowScWo))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create SowScWo: ' + err.message);
      }
    });
    this.on('createSowScInvoice', async (req) => {
      const sowScInvoiceArray = req.data.sowScInvoice;
      if (!Array.isArray(sowScInvoiceArray)) {
        return req.error(400, 'Input must be an array of SowScInvoice');
      }
      try {
        const results = await Promise.all(
          sowScInvoiceArray.map(sowScInvoice => INSERT.into(SowScInvoice).entries(sowScInvoice))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create SowScInvoice: ' + err.message);
      }
    });
    this.on('createBonus', async (req) => {
      const bonusArray = req.data.bonus;
      if (!Array.isArray(bonusArray)) {
        return req.error(400, 'Input must be an array of Bonus');
      }
      try {
        const results = await Promise.all(
          bonusArray.map(bonus => INSERT.into(Bonus).entries(bonus))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create Bonus: ' + err.message);
      }
    });
    this.on('createOtherBillables', async (req) => {
      const otherBillablesArray = req.data.otherBillables;
      if (!Array.isArray(otherBillablesArray)) {
        return req.error(400, 'Input must be an array of OtherBillables');
      }
      try {
        const results = await Promise.all(
          otherBillablesArray.map(otherBillable => INSERT.into(this.entities.OtherBillables).entries(otherBillable))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create OtherBillables: ' + err.message);
      }
    });

    this.on('createDrug_Background_Check', async (req) => {
      const drugBackgroundCheckArray = req.data.drug_Background_Check;
      if (!Array.isArray(drugBackgroundCheckArray)) {
        return req.error(400, 'Input must be an array of Drug_Background_Check');
      }
      try {
        const results = await Promise.all(
          drugBackgroundCheckArray.map(drugRecord => INSERT.into(Drug_Background_Check).entries(drugRecord))
        );
        return results;
      } catch (err) {
        req.error(500, 'Failed to create Drug_Background_Check: ' + err.message);
      }
    });
    //this.on('test', this._test);
    attachUploadSequenceHook(this);  // NEW - enables per-file sequencing for all record-based entities

    return super.init();
  }

  async _generateFileNumber(req) {
    const db = await cds.connect.to('db');
    const fileNumberSequence = new SequenceHelper({
      db: db,
      sequence: 'COM_ALERON_MONITOR_FILENUMBER',
      table: 'COM_ALERON_MONITOR_FILES',
      field: 'ID',
    });

    try {
      req.data.ID = await fileNumberSequence.getNextNumber();
    } catch (err) {
      LOG._error && LOG.error(err.message);
      return req.reject();
    }
  }

  async _onBeforeFilesCreate(req) {
    if (!req.data.ID) {
      await this._generateFileNumber(req);
    }
    const { data: oFile } = req;
    LOG._info && LOG.info('InterfaceId On BeforeFile Create Method', oFile.interfaceType_ID);
    // switch (oFile.interfaceID) {
    switch (oFile.interfaceType_ID) {
      // case 'T':
      //   if (
      //     [mInterfaceTypes.EmployeeContractor, mInterfaceTypes.EmployeeStaff].includes(
      //       oFile.interfaceType_ID,
      //     )
      //   ) {
      //     const mMaritalStatusTransformer = {
      //       0: 'S',
      //       1: 'M',
      //     };
      //     for (const [iIndex, oEmployeeHire] of oFile.to_EmployeeHires.entries()) {
      //       if (['0', '1'].includes(oEmployeeHire.maritalStatus)) {
      //         oFile.to_EmployeeHires[iIndex]['maritalStatus'] =
      //           mMaritalStatusTransformer[oEmployeeHire.maritalStatus];
      //       }
      //       oFile.to_EmployeeHires[iIndex] = this._trimFieldsForZeros(oEmployeeHire);
      //     }
      //     req.data = oFile;
      //   }
      //   break;

      // case 'U':
      //   // if (
      //   //   [mInterfaceTypes.EmployeeContractor, mInterfaceTypes.EmployeeStaff].includes(
      //   //     oFile.interfaceType_ID,
      //   //   )
      //   // )

      //   {
      //     const mMaritalStatusTransformer = {
      //       0: 'S',
      //       1: 'M',
      //     };

      //     for (const [iIndex, oStaffHire] of oFile.to_StaffHires.entries()) {
      //       if (['0', '1'].includes(oStaffHire.maritalStatus)) {
      //         oFile.to_StaffHires[iIndex]['maritalStatus'] =
      //           mMaritalStatusTransformer[oStaffHire.maritalStatus];
      //       }
      //       oFile.to_StaffHires[iIndex] = this._trimFieldsForZeros(oStaffHire);
      //     }
      //     req.data = oFile;
      //   }
      //   break;

      case 'A':
        // Handle Drug Background Check interface
        if (oFile.to_Drug_Background_Check && Array.isArray(oFile.to_Drug_Background_Check)) {
          for (const [iIndex, oDrugRecord] of oFile.to_Drug_Background_Check.entries()) {
            oFile.to_Drug_Background_Check[iIndex] = this._trimFieldsForZeros(oDrugRecord);
          }
          req.data = oFile;
        }
        break;

    }
  }

  async _onProcessFile(req) {
    /*
    1. Read the records for the file (all) or records based on ID
    2. Read the interfacesteps based on file information in ascending orders
    3. Determine the runner from the interfacestep / process 
    4. Call the runner.executor for all records & update the status 
    */
    const {
      Files,
      FileStatus: {
        elements: {
          code: { enum: fileStatusTypeEnum },
        },
      },
    } = this.entities;
    const { fileNumber, records: recordIDs, from, to, tableId } = req.data;

    const file = await SELECT.one.from(Files).where({ ID: fileNumber });
    let bReject = false,
      sMessageKey;

    // Make sure that file can be processedd
    switch (file.status_code) {
      case fileStatusTypeEnum.canceled.val:
      case fileStatusTypeEnum.done.val:
        bReject = true;
        sMessageKey = 'ERR_FILE_ALREADY_PROCESSED';
        break;
      case fileStatusTypeEnum.processing.val:
        // REMOVE: Temporary fix to allow reprocessing of files from specific step
        break;
      // if (from !== '-1') {
      //   break;
      // }
      // bReject = true;
      // sMessageKey = 'ERR_FILE_IN_PROCESS';
      // break;
      default:
        break;
    }
    if (bReject) {
      return req.reject(sMessageKey);
    }
    const processor = new this[InterfaceMapping[file.interfaceType_ID]]({
      file,
      recordIDs,
    });

    try {
      // Set the File to processing status before starting the process
      await UPDATE(Files)
        .set({ status_code: fileStatusTypeEnum.processing.val })
        .where({ ID: fileNumber });
      await processor.startProcess({ from, to }, tableId);
      return {
        processed: true,
        message: recordIDs.length === 0 ? cds.i18n.messages.at('INFO_PROCESSING_STARTED', [fileNumber]) : cds.i18n.messages.at('INFO_RECORD_PROCESSING_STARTED'),
      };
    } catch (err) {
      LOG._error && LOG.error(err.message);
      return req.reject();
    }
  }

  async _onRejectFile(req) {
    /*
    1. Read the records for the file (all) or records based on ID
    2. Update the records based on the selection
    3. if no records pendding in File to be update then update the File status
    */
    const {
      Files,
      Times,
      EmployeeHires,
      FileStatus: {
        elements: {
          code: { enum: FileStatusCodeTypeEnum },
        },
      },
    } = this.entities;
    const { fileNumber, records: recordIDs } = req.data;

    const result = await SELECT.from(Files).columns('interfaceType').where({ ID: fileNumber });
    let interfaceTypeMapping = {
      1: 'WorkOrders_WN',
      S: 'WorkOrders',
      3: 'Times',
      T: 'EmployeeHires',
      U: 'StaffHires',
      E: 'SowScWo',
      F: 'SowScInvoice',
      2: 'Travel',
      G: 'Bonus',
      O: 'OtherBillables',
      N: 'Fg_Invoices',
      M: 'WorkOrders_FG',
      A:'Drug_Background_Check',
      D: 'Credit_Rebill',
      Q: 'Fg_Credit_Rebill',
      O: 'OtherBillables'
    };
    let interfaceType = interfaceTypeMapping[result[0].interfaceType_ID];

    const allRecords = await SELECT.from(this.entities[interfaceType])
      .columns('ID')
      .where({ file_ID: fileNumber });
    const allRecordIDs = allRecords.map((r) => r.ID);

    let recordsToUpdate = recordIDs?.length ? recordIDs : allRecordIDs;

    if (recordsToUpdate?.length) {
      await UPDATE(this.entities[interfaceType])
        .set({ rejected: true, processLevel_code: 'Z', valid: true })
        .where({ ID: { in: recordsToUpdate } });
    }

    const remainingRecord = await SELECT.from(this.entities[interfaceType])
      .columns('ID')
      .where({ file_ID: fileNumber, rejected: false });

    if (remainingRecord.length === 0) {
      await UPDATE(Files)
        .set({ status_code: FileStatusCodeTypeEnum.canceled })
        .where({ ID: fileNumber });
    }
  }

  async _onValidateFile(req) {
    const { Files } = this.entities;
    const { fileNumber, records: recordIDs } = req.data;

    
    const file = await SELECT.one.from(Files).where({ ID: fileNumber });
    const processor = new this[InterfaceMapping[file.interfaceType_ID]]({
      file,
      recordIDs,
    });

    const { hasError, errors } = await processor.validate();

    if (hasError) {
      // return //req.reject(cds.i18n.messages.at('ERR_VALIDATED'));
      return {
        success: false,
        message: cds.i18n.messages.at('ERR_VALIDATED'),
      };
    } else {
      return {
        success: true,
        message: cds.i18n.messages.at('INFO_VALIDATED'),
      };
    }
  }

  async _onUpdateRecords(req) {
    const {
      data: { interfaceType: sInterfaceType, records: aRecords },
    } = req;

    try {
      LOG._info && LOG.info('sInterfaceType on CPI Update' + sInterfaceType);
      switch (sInterfaceType) {
        case mInterfaceTypes.EmployeeContractor:
          await UPSERT.into(EmployeeHires).entries(aRecords);
          break;
        case mInterfaceTypes.EmployeeStaff:
          await UPSERT.into(StaffHires).entries(aRecords);
          break;
        case mInterfaceTypes.WorkOrdersWN:
          await UPSERT.into(WorkOrders_WN).entries(aRecords);
          break;
        case mInterfaceTypes.WorkOrdersVN:
          await UPSERT.into(WorkOrders).entries(aRecords);
          break;
        case mInterfaceTypes.SOWscWO:
          await UPSERT.into(SowScWo).entries(aRecords);
          break;
        case mInterfaceTypes.SOWscInvoice:
          await UPSERT.into(SowScInvoice).entries(aRecords);
          break;
        case mInterfaceTypes.Bonus_G:
          await UPSERT.into(Bonus).entries(aRecords);
          break;
        default:
          break;
      }
      return {
        message: `Records Completed`,
      };
    } catch (err) {
      return req.reject(err.message);
    }
  }

  async _addLogs(req) {
    const { logs: aLogs } = req.data;
    try {
      await INSERT.into(ProcessLogs).entries(aLogs);
    } catch (err) {
      return req.reject(err.message);
    }
  }

  // async _updateLogs(req) {
  //   const { logs: aLogs, record_ID: sRecordID } = req.data;
  //   try {
  //     const db = await cds.connect.to('db');
  //     if (sRecordID) {
  //       // const existingLogs = await SELECT.from(ProcessLogs).where({ record_ID: sRecordID });
  //       // if (existingLogs && existingLogs.length > 0) {
  //       //   for (const log of existingLogs) {
  //       //     await DELETE.from(ProcessLogs).where({ ID: log.ID });
  //       //   }
  //       // }
  //        await db.run(DELETE.from(ProcessLogs).where({ record_ID: sRecordID }));
  //     }      
      
  //     // if (aLogs && aLogs.length > 0) {
  //     //   await INSERT.into(ProcessLogs).entries(aLogs);
  //     // }
  //     if (aLogs && aLogs.length > 0) {
  //       // Remove ID field from logs to ensure fresh insert
  //       const logsWithoutIds = aLogs.map(log => {
  //         const { ID, ...logWithoutId } = log;
  //         return logWithoutId;
  //       });
  //       // await INSERT.into(ProcessLogs).entries(logsWithoutIds);
  //       await db.run(INSERT.into(ProcessLogs).entries(logsWithoutIds));
  //     }
  //   } catch (err) {
  //     LOG._error && LOG.error('Error in _updateLogs:', err.message);
  //     return req.reject(err.message);
  //   }
  // }

   async _updateLogs(req) {
    const { logs: aLogs, record_ID: sRecordID } = req.data;
    try {
      // Get database connection
      const db = await cds.connect.to('db');
      
      // Always remove existing logs for the specific record before inserting new ones
      if (sRecordID) {
        // First check what logs exist
        const existingLogsQuery = `SELECT ID FROM COM_ALERON_MONITOR_PROCESSLOGS WHERE RECORD_ID = ?`;
        const existingLogs = await db.run(existingLogsQuery, [sRecordID]);
        LOG._info && LOG.info(`Found ${existingLogs.length} existing logs (including all entities) for record_ID: ${sRecordID}`);
        
        // Delete using raw SQL to ensure all logs are deleted
        const deleteQuery = `DELETE FROM COM_ALERON_MONITOR_PROCESSLOGS WHERE RECORD_ID = ?`;
        const deleteResult = await db.run(deleteQuery, [sRecordID]);
        LOG._info && LOG.info(`Delete result: ${deleteResult} rows deleted`);
      }
      
      // Insert new logs (strip IDs since we're creating new ones)
      if (aLogs && aLogs.length > 0) {
        // Remove ID and other managed fields from logs to ensure fresh insert
        const logsWithoutIds = aLogs.map(log => {
          const { ID, IsActiveEntity, HasActiveEntity, HasDraftEntity, ...logWithoutId } = log;
          return logWithoutId;
        });
        await db.run(INSERT.into('com.aleron.monitor.ProcessLogs').entries(logsWithoutIds));
        LOG._info && LOG.info(`Inserted ${logsWithoutIds.length} new logs`);
      }
      
      return { success: true, message: 'Logs updated successfully' };
    } catch (err) {
      LOG._error && LOG.error('Error in _updateLogs:', err.message);
      return req.reject(err.message);
    }
  }

  
  async _uploadInterfaceData(req) {
  let {
    fileID,
    interfaceID,
    csvString
} = req.data;


csvString =
    Buffer
        .from(csvString, 'base64')
        .toString('utf8');

  try {

    LOG.info(`Starting upload for interface ${interfaceID}`);

    /*
     * Parse CSV
     * Reuse your existing parsing logic here.
     * Ideally move the code from UI _parseCSV()
     */
    const records = this._parseCSV(csvString, interfaceID);

    if (!records || records.length === 0) {
      return req.reject(400, 'No valid records found');
    }

    /*
     * Create File Header
     */
    const tx = cds.tx(req);

    LOG.info(`File created successfully: ${fileID}`);

    /*
     * Determine entity
     */
    const entityName = interfaceTypeIdToEntityName[interfaceID];

    if (!entityName) {
      return req.reject(400, `No entity mapping found for interface ${interfaceID}`);
    }

    /*
     * Add common fields
     */
    records.forEach(record => {
      record.file_ID = fileID;
      record.valid = true;
      record.processLevel_code = '0';

      delete record.ID;
      delete record.file;
    });

    /*
     * Bulk insert in chunks
     */
    const CHUNK_SIZE = 1000;

    for (let i = 0; i < records.length; i += CHUNK_SIZE) {

      const chunk = records.slice(i, i + CHUNK_SIZE);

      await tx.run(
        INSERT.into(this.entities[entityName]).entries(chunk)
      );

      LOG.info(
        `Inserted ${Math.min(i + CHUNK_SIZE, records.length)} of ${records.length}`
      );
    }
    LOG.info(`Upload completed successfully for file ${fileID}`);

    return fileID;

  } catch (error) {

    LOG.error('Upload failed', error);

    return req.reject(
      500,
      `Upload failed: ${error.message}`
    );
  }
}
  async _test() {
    const BusinessPartner = new BusinessPartnerComm();

    let BP = await BusinessPartner.executeQuery(
      SELECT.one
        .from('A_CustSalesPartnerFunc')
        .columns(['Customer', 'SalesOrganization', 'PartnerFunction', 'BPCustomerNumber'])
        .where({
          // Customer: '10409',
          SalesOrganization: '1200',
          // PartnerFunction: 'RE',
          // BPCustomerNumber: '300044'
        }),
    );
  }
  _parseCSV (sCSV, interfaceID) {

        let columnMappings = {
          "1": "aWNWorkOrdersColumns",
          "C": "aTimesColumns",
          "3": "aTimesColumns",
          "T": "aEmployRecordsColumns",
          "U": "aStaffColumns",
          "S": "aVNWorkOrdersColumns",
          "M": "aWorkOrdersFGColumns",
          "4": "aTerminationsColumns", // term 4 interface
          "D": "aCredit_Rebill", // Credit_Rebill D interface
          "Q": "aFg_Credit_Rebill", // FQ Credit_Rebill Q interface
          "O": "aOtherBillablesColumns",
          "E": "aSowScWoColumns", //Interface E
          "F": "aSowScInvoiceColumns", //Interface F
          "N": "aFgTimeInvoicesColumns", //interface N FG Time Invoices
          "G": "aBonusColumns", // Bonus G interface
          "2": "aTravelColumns", //Interface 2
          "A": "aDrug_Background_CheckColumns" //Interface A
        };

        let columnMappingsBoolean = {
          "1": "aWNWorkOrdersColumnsBoolean",
          "C": "aTimesColumnsBoolean",
          "3": "aTimesColumnsBoolean",
          "T": "aEmployRecordsColumnsBoolean",
          "U": "aStaffColumnsBoolean",
          "S": "aVNWorkOrdersColumnsBoolean",
          "M": "aWorkOrdersFGColumnsBoolean",
          "4": "aTerminationsColumnsBoolean", // term 4 Interface
          "D": "aCreditRebillColumnsBoolean",
          "Q": "aFg_Credit_Rebill", // FQ Credit_Rebill Q interface
          "O": "aOtherBillablesColumnsBoolean",
          "E": "aSowScWoColumnsBoolean", //Interface E
          "F": "aSowScInvoiceColumnsBoolean", //Interface F
          "N": "aFgTimeInvoicesColumnsBoolean", //Interface N FG Time Invoices
          "Q": "aFg_Credit_RebillColumnsBoolean",
          "G": "aBonusColumnsBoolean", // Bonus G interface
          "2": "aTravelColumnsBoolean", //Interface 2
          "A": "aDrug_Background_CheckColumnsBoolean" //Interface A
        };

        let columnMappingsMarital = {
          "T": "aEmployRecordsColumnsMarital",
        }

        if (!columnMappings[interfaceID]) {
          console.error("Invalid Interface ID:", interfaceID);
          return;
        }

        let objectColumns = constant[columnMappings[interfaceID]];

        // let aLines = sCSV.split('\n');
        let aLines = sCSV.split(/\r?\n/);
        let aResults = [];

        // let aHeaders = aLines[0].split(',');

        // for (let i = 0; i < aLines.length; i++) {
        //   let aCols = aLines[i].split(',');
        //   if(aCols.length <= 1) continue;
        //   let oRecord = {};
        //   objectColumns.forEach((column, colIndex) => {
        //     if (!aCols[colIndex]) {
        //       return;
        //     }
            
        //     // oRecord[column] = aCols[colIndex].trim();
        //     let value = aCols[colIndex].trim();
        //     if (interfaceID === "M" && colIndex === 30 ) {
        //       if(value.includes(" - ")){
        //       value = value.split(" - ")[0].trim();
        //       }else {
        //         value = value.substring(0,10);
        //       }
        //     }
        //     if (interfaceID === "M" && colIndex === 24 && value) {
        //       value = value.toUpperCase();
        //     }
        //      oRecord[column] = value;
        //   });
        //   this.convertToBoolean(oRecord, constant[columnMappingsBoolean[interfaceID]]);
        //   oRecord.valid = true;
        //   oRecord.processLevel_code = "0";
        //   // if (oRecord.hasOwnProperty('country') && oRecord.country === 'US') {
        //   //   oRecord.country = 'USA';
        //   // }
        //   aResults.push(oRecord);
        // }
        const interfacesWithHeaders = ["M", "N", "Q"];
        const startIndex = interfacesWithHeaders.includes(interfaceID) ? 1 : 0;
        // for (let i = 0; i < aLines.length; i++) {
        for (let i = startIndex; i < aLines.length; i++) {
          if (!aLines[i].trim()) continue;
          
          let aCols = [];
          let currentCol = '';
          let inQuotes = false;
          
          try {
            
            for (let j = 0; j < aLines[i].length; j++) {
              let char = aLines[i][j];
              
              if (char === '"') {
                if (j + 1 < aLines[i].length && aLines[i][j + 1] === '"') {
                  currentCol += '"';
                  j++;
                } else {
                  inQuotes = !inQuotes;
                }
              } else if (char === ',' && !inQuotes) {
                aCols.push(currentCol.trim());
                currentCol = '';
              } else {
                currentCol += char;
              }
            }
            
            aCols.push(currentCol.trim());
            
            if (aCols.length <= 1) continue;
            
            // Validate number of columns matches expected columns
            // if (aCols.length !== objectColumns.length) {
            //   throw new Error(`Invalid number of columns in row ${i + 1}. Expected ${objectColumns.length}, got ${aCols.length}`);
            // }
                        
            let oRecord = {};
            objectColumns.forEach((column, colIndex) => {
              if (!aCols[colIndex]) {
                return;
              }
              let value = aCols[colIndex];
              if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
              }
               // Custom logic for interfaceID M
               
               if (interfaceID === "M" && colIndex === 30) {
                if (value.includes(" - ")) {
                  value = value.split(" - ")[0].trim();
                } else {
                  value = value.substring(0, 10);
                }
              }
              if (interfaceID === "M" && colIndex === 24 && value) {
                value = value.toUpperCase();
              }
              oRecord[column] = value;
            });

            if(interfaceID === 'T' || interfaceID === 'U'){
              if(oRecord.maritalStatus === '0'){
                oRecord.maritalStatus = 'S';
              }else if(oRecord.maritalStatus === '1'){
                oRecord.maritalStatus = 'M';                
              }
              if(oRecord.recruiterEmployeeNo.length == 7 )
              {
                oRecord.recruiterEmployeeNo = '0'+ oRecord.recruiterEmployeeNo
              }
              if(oRecord.employeeResponsible.length == 7)
              {
                oRecord.employeeResponsible = '0'+ oRecord.employeeResponsible
              }
              this._trimFieldsForZeros(oRecord);
            }

            if(interfaceID === '3'){
              if(oRecord.additionalDayOfWork && oRecord.additionalDayOfWork.trim() !== ''){
                oRecord.additionalDayOfWork = 'X';
              }
            }

            //  if(interfaceID === 'S' || interfaceID === '1'|| interfaceID === 'M' || interfaceID === 'E' || interfaceID === 'F' || interfaceID === 'C' || interfaceID === '3'){
              this._trimFieldsForZeros(oRecord);
            // }
            
            this.convertToBoolean(oRecord, constant[columnMappingsBoolean[interfaceID]]);
            oRecord.valid = true;
            oRecord.processLevel_code = "0";
            aResults.push(oRecord);
          } catch (error) {
            throw new Error(`Error processing row ${i + 1}: ${error.message}`);
          }
        }

        if (aResults.length === 0) {
          throw new Error('No valid records found in CSV file');
        }

        return aResults;
      }

       _trimFieldsForZeros (oRecord) {
        // Trim the fields for zeros
        // const aFieldsToTrimForZeros = ['contractNo', 'soldToParty', 'billToParty', 'material','wnContract'];
        const aFieldsToTrimForZeros = [
          'contractNo',       // Interfaces: C, 3, T, U, S, 1, E, 4, O, G, 2, F, A
          'contractNoSS',     // Interface: N (Fg_Invoices)
          'contractNoWN',     // Interface: N (Fg_Invoices)
          'soldToParty',      // Interfaces: S, 1, T, U, E
          'soldTo',           // Interface: M
          'billToParty',      // Interfaces: S, 1, T, U, E
          'billTo',           // Interface: M
          'material',         // Interfaces: T, U
          'materialNo',       // Interfaces: S, 1, E, F
          'matnr',            // Interface: M
          'wnContract',       // Interface: M
          'project',          // Interface: A (Drug_Background_Check)
          'projectNo',        // Interfaces: T, U (Employee/Staff Hires)
          'orderNo',          // Interfaces: C, 3, N (Times, Fg_Invoices)
          'internalOrder'     // Interfaces: F, O, G, 2 (SowScInvoice, OtherBillables, Bonus, Travel)
        ];
        for (const sField of aFieldsToTrimForZeros) {
          if (oRecord[sField]) {
            oRecord[sField] = oRecord[sField].replace(/^0+/, '');
          }
        }
        return oRecord;
      }

     convertToBoolean (obj, keys) {

        if (!Array.isArray(keys) || keys.length === 0) {
          return;
        }

        keys.forEach(key => {
          if (obj.hasOwnProperty(key)) {
            obj[key] = obj[key] === "X"; 
          }
        });
      }

  async testFunction(req) {
    const SalesOrderAPI = new SalesOrderComm();
    const result = SalesOrderAPI.executeQuery(
      SELECT.from('A_SalesOrder',
        sc => {
          sc.SalesOrder,
            sc.SalesOrganization,
            sc.SalesOrganization,
            sc.DistributionChannel,
            sc.OrganizationDivision,
            sc.to_Item((scItem) => {
              scItem.SalesOrder,
                scItem.SalesOrderItem
            })
        })
        .where({ SalesOrder: '2700000074' })
    );
  }

  _dateConvert(date, flag) {
    let year = parseInt(date.substring(0, 4));
    if (flag === 'E') {
      year += 10;
    }
    return `${year}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
  }
}
module.exports = MonitorService;
