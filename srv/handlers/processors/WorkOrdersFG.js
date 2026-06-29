// Interface M
const moment = require('moment');
const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Procesor-WorkOrdersFG');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');
const SalesContractComm = require('../communicators/SalesContract');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SalesOrderComm = require('../communicators/SalesOrder');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const BillingTypeComm = require('../communicators/BillingType');
const WorkforceComm = require('../communicators/Workforce');

// Utility functions
const { toODataDate, toEmployeeType, todateConvert_Project } = require('../common/utils');

// List of required entities
const {
  Files,
  WorkOrders_FG,
  InterfaceSteps,
  FieldValidations,
  FieldValidations: {
    elements: {
      validation: { enum: mFieldValidationTypeEnum },
    },
  },
} = cds.entities('com.aleron.monitor');

class WorkOrdersFG extends Processor {
  constructor(options) {
    super(options);

    // Processor Specific configuration
    this.recordsEntity = 'com.aleron.monitor.WorkOrders_FG';
    this.LOG = cds.log('Monitor.Procesor-WorkOrderFG');
    this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

    this.salesContractAPI = null;
    this.businesPartnerAPI = null;
    this.countryRegionAPI = null;
    this.salesOrderAPI = null;
    this.salesOrderV2API = null;
    this.billingTypeAPI = null;
  }

  prepareCommunicators() {
    this.LOG._info && this.LOG.info('Preparing Communicators');
    this.salesContractAPI = new SalesContractComm();
    this.businesPartnerAPI = new BusinessPartnerComm();
    this.salesOrderAPI = new SalesOrderComm({ type: 'v4' });
    this.enterpriseProjectAPI = new EnterpriseProjectComm();
    this.empCustInfoAPI = new EmpCustInfoComm();
    this.workforceAPI = new WorkforceComm();
    this.billingTypeAPI = new BillingTypeComm();
    // this.countryRegionAPI = new CountryRegionComm();
  }

  _getColumnsForFetch(sEntity) {
    const mEntityColumns = {
      'com.aleron.monitor.WorkOrders_FG': [
        ...['ID', 'file_ID', 'processLevel_code', 'valid'],
        'jobSeekerId',
        'workerId',
        'personId',
        'securityId',
        'woStatus',
        'firstName',
        'lastName',
        'workerEmail',
        'jobPostingTitle',
        'workOrderId',
        'owner',
        'ownerId',
        'businessUnitCode',
        'businessUnitName',
        'vendorCode',
        'vendorName',
        'buyerCode',
        'remitTo',
        'costCenterName',
        'costCenterCode',
        'bilPerDiem',
        'startDate',
        'endDate',
        'currency_code',
        'siteCode',
        'siteName',
        'managerName',
        'purchaseOrder',
        'wnContract',
        'companyCode',
        'vendor',
        'ssContract',
        'billTo',
        'soldTo',
        'matnr',
        'salesOffice',
        'salesDocumentNoSAP',
        'salesItemNoSAP',
        'projectUUID',
        'vcData1UUID',
        'vcData2UUID',


      ]
    };

    return [...new Set(mEntityColumns[sEntity])];
  }
  async validateRecords(sProcessCode, bBreakExecution) {
    const aRecordsForProcessing = [];
    // temp only once validate function is build we can remove - end
    const { SalesContract } = await this.salesContractAPI.getEntities();
    const aErrorLogs = [];
    const aFailedRecordIDs = [];
    const aPassedRecordIDs = [];
    const aSkippedRecords = [];
    const aRejectedRecordIDs = [];

    let aSalesOrderConditions = [];
    let aSalesContractHeaderConditions = [];
    let aSalesContractItemConditions = [];
    let aBusinessConditions = [];
    let aSalesContractHeaders = [];
    let aSalesContractItems = [];
    // Clear the error logs for the selected records; so that new process can start
    await ProcessLogger.removeLogs([...this.recordIDs]);


    /*    const salesOrderError = await this.salesOrderAPI.executeQuery(
          SELECT.from('SalesOrder')
            .columns(['SalesOrder', 'AssignmentReference'])
            .where({
              AssignmentReference: 'RRNAWO00000358'
            })
        );
  
        if (salesOrderError && salesOrderError.length > 0) {
          const salesOrder = salesOrderError[0];
          
          // Use the SalesOrder value from the first query
          const salesContractResult = await this.salesOrderAPI.executeQuery(
            SELECT.from('SalesOrderItem')
              .columns(['SalesOrder', 'SalesOrderItem'])
              .where({
                SalesOrder: salesOrder.SalesOrder,
                SalesOrderItem: '000010'
              })
          ); */


    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode)) {
        aRecordsForProcessing.push({ ...record });
      } else {
        aSkippedRecords.push({ ...record });
      }

      if (record.wnContract) {
        aSalesOrderConditions.push({
          // YY1_CustomSalesOrder_SDH:'ZWMS',
          AssignmentReference: record.workOrderId
        });

        aSalesContractHeaderConditions.push({
          SalesContract: record.wnContract,
          SoldToParty: record.soldTo

        });

        aSalesContractItemConditions.push({
          SalesContract: record.wnContract,
          Product: record.matnr          // check this
        });

        aBusinessConditions.push({
          AuthorizationGroup: record.vendorCode
        });


      }

    }

    const aSalesContractPrimaryConditions = aSalesContractHeaderConditions.map(cond => ({
      SalesContract: cond.SalesContract,
      SoldToParty: cond.SoldToParty
    }));

    const aSalesContractFallbackConditions = aSalesContractHeaderConditions.map(cond => ({
      PurchaseOrderByCustomer: cond.SalesContract,
      SoldToParty: cond.SoldToParty
    }));

    this.updateProcessingState(sProcessCode);

    if (!aRecordsForProcessing.length) {
      // If Step doesn't need to be processed, simply return to avoid costly calls
      return {
        hasError: false,
        continue: true,
      };
    }

    const [
      { reason: anySalesOrderErr, value: aSalesOrders },
      // {reason: anySalesContractHeaderErr, value: aSalesContractHeaders},
      { reason: anySalesContractPrimaryErr, value: aSalesContractPrimaryResults },
      { reason: anySalesContractFallbackErr, value: aSalesContractFallbackResults },
      {reason: anySalesContractItemPrimaryErr, value: aSalesContractItemPrimaryResults},
      {reason: anySalesContractItemFallbackErr, value: aSalesContractItemFallbackResults},
      { reason: anyVendorMasterErr, value: aVendorMasterItems },
    ] = await Promise.allSettled([
      // Country Region Call 
      // this.salesOrderAPI.executeQuery(
      //   aSalesOrderConditions.map((bp) => {
      //     return SELECT.one
      //       .from('SalesOrder')
      //       .columns(['SalesOrder', 'AssignmentReference'])
      //       .where({
      //         // YY1_CustomSalesOrder_SDH: 'ZWMS',
      //         AssignmentReference: bp.workOrderId              
      //       });
      //   }),
      // ),
      this.salesOrderAPI.executeQuery(
        SELECT.from('SalesOrder')
          .columns(['SalesOrder', 'AssignmentReference','YY1_AlphanumericSalesO_SDH'])
          .where({
            AssignmentReference: { in: aSalesOrderConditions.map(cond => cond.AssignmentReference) }
          }).limit(10000)
      ),

      // Sales Contract Header Call
      // this.salesContractAPI.executeQuery(
      //   SELECT.from('SalesContract')
      //     .columns(['SalesContract', 'SoldToParty'])
      //     .where({
      //       SalesContract: { in: aSalesContractHeaderConditions.map(cond => cond.SalesContract) },
      //       SoldToParty: { in: aSalesContractHeaderConditions.map(cond => cond.SoldToParty) }
      //     })
      // ),
      // this._querySalesContractHeaderWithFallback(aSalesContractHeaderConditions),
      this.salesContractAPI.executeQuery(
        SELECT.from('SalesContract')
          .columns(['SalesContract', 'SoldToParty', 'PurchaseOrderByCustomer'])
          .where({
            SalesContract: { in: aSalesContractHeaderConditions.map(cond => cond.SalesContract) },
            SoldToParty: { in: aSalesContractHeaderConditions.map(cond => cond.SoldToParty) }
          }).limit(10000)
      ),
      // Fallback query using PurchaseOrderByCustomer field
      this.salesContractAPI.executeQuery(
        SELECT.from('SalesContract')
          .columns(['SalesContract', 'SoldToParty', 'PurchaseOrderByCustomer'])
          .where({
            PurchaseOrderByCustomer: { in: aSalesContractHeaderConditions.map(cond => cond.SalesContract) },
            SoldToParty: { in: aSalesContractHeaderConditions.map(cond => cond.SoldToParty) }
          }).limit(10000)
        ),
  /////
      this.salesContractAPI.executeQuery(
            SELECT.from('SalesContractItem')
              .columns(['SalesContract', 'Product','PurchaseOrderByCustomer'])
              .where({
                SalesContract: { in: aSalesContractItemConditions.map(cond => cond.SalesContract) },
                Product: { in: aSalesContractItemConditions.map(cond => cond.Product) }
              }).limit(10000)
          ),
          this.salesContractAPI.executeQuery(
            SELECT.from('SalesContractItem')
              .columns(['SalesContract', 'Product','PurchaseOrderByCustomer'])
              .where({
                PurchaseOrderByCustomer: { in: aSalesContractItemConditions.map(cond => cond.SalesContract) },
                Product: { in: aSalesContractItemConditions.map(cond => cond.Product) }
              }).limit(10000)
          ),
        // Partner Function calls
        // this.businesPartnerAPI.executeQuery(
        //   aBusinessConditions.map((bp) => {
        //     return SELECT.one
        //       .from('A_BusinessPartner')
        //       .columns(['AuthorizationGroup'])
        //       .where({
        //         AuthorizationGroup: bp.AuthorizationGroup
        //       });
        //   }),
        // ), 
        this.businesPartnerAPI.executeQuery(
          SELECT.from('A_BusinessPartner')
            .columns(['AuthorizationGroup'])
            .where({
              AuthorizationGroup: { in: aBusinessConditions.map(cond => cond.AuthorizationGroup) }
            }).limit(10000)
        )  
    ]);

    if (anySalesOrderErr) {
      LOG._error && LOG.error(anySalesOrderErr.message);      
    }

    
    if (!anySalesContractPrimaryErr && aSalesContractPrimaryResults && aSalesContractPrimaryResults.length > 0) {
      aSalesContractHeaders.push(...aSalesContractPrimaryResults);
    }
    
    if (!anySalesContractFallbackErr && aSalesContractFallbackResults && aSalesContractFallbackResults.length > 0) {
      const primarySalesContracts = new Set(aSalesContractHeaders.map(r => r.SalesContract));
      const fallbackOnly = aSalesContractFallbackResults.filter(r => !primarySalesContracts.has(r.SalesContract));
      aSalesContractHeaders.push(...fallbackOnly);
      
      if (fallbackOnly.length > 0) {
        this.LOG._info && this.LOG.info(`Found ${fallbackOnly.length} SalesContract records using PurchaseOrderByCustomer fallback`);
      }
    }

    // if (anySalesContractHeaderErr) {
    //   LOG._error && LOG.error(anySalesContractHeaderErr.message);
    // }

      // Combine SalesContractItem results (primary + fallback)
      if (!anySalesContractItemPrimaryErr && aSalesContractItemPrimaryResults && aSalesContractItemPrimaryResults.length > 0) {
        aSalesContractItems.push(...aSalesContractItemPrimaryResults);
      }
      
      if (!anySalesContractItemFallbackErr && aSalesContractItemFallbackResults && aSalesContractItemFallbackResults.length > 0) {
        const primarySalesContractItems = new Set(aSalesContractItems.map(r => `${r.SalesContract}-${r.Product}`));
        const fallbackOnly = aSalesContractItemFallbackResults.filter(r => !primarySalesContractItems.has(`${r.SalesContract}-${r.Product}`));
        aSalesContractItems.push(...fallbackOnly);
        
        if (fallbackOnly.length > 0) {
          this.LOG._info && this.LOG.info(`Found ${fallbackOnly.length} SalesContractItem records using PurchaseOrderByCustomer fallback`);
        }
      }
      
      // Log any errors
      if (anySalesContractItemPrimaryErr) {
        LOG._error && LOG.error(`Error in primary SalesContractItem query: ${anySalesContractItemPrimaryErr.message}`);
      }
      if (anySalesContractItemFallbackErr) {
        LOG._error && LOG.error(`Error in fallback SalesContractItem query: ${anySalesContractItemFallbackErr.message}`);
      }

    if (anyVendorMasterErr) {
      LOG._error && LOG.error(anyVendorMasterErr.message);
    }

    const processedWorkOrderIDs = new Set();
    
    
    if (aSalesOrders && Array.isArray(aSalesOrders)) {
      aSalesOrders.forEach(so => {
        if (so.AssignmentReference) {
          processedWorkOrderIDs.add(so.AssignmentReference);
        }
      });
    }

    for (const record of aRecordsForProcessing) {
      let hasRecordFailed = false;

      const wnContract = record.wnContract;
      const ssContract = record.ssContract;

      const isWnValid = wnContract !== undefined && wnContract !== null && wnContract !== "" && wnContract !== "0";
      const isSsValid = ssContract !== undefined && ssContract !== null && ssContract !== "" && ssContract !== "0";

      if (isWnValid && isSsValid) {
        aErrorLogs.push({
          record_ID: record.ID,
          message: "Only one contract must be provided — WN_CONTRACT or SS_CONTRACT, not both.",process_code: sProcessCode
        });
        aFailedRecordIDs.push(record.ID);
        hasRecordFailed = true;
      }

      if (!isWnValid && !isSsValid) {
        aErrorLogs.push({
          record_ID: record.ID,
          message: "At least one contract must be provided — WN_CONTRACT or SS_CONTRACT.",process_code: sProcessCode
        });
        aFailedRecordIDs.push(record.ID);
        hasRecordFailed = true;
      }

      if (isWnValid) {
        if (!record.securityId) {
          aErrorLogs.push({ record_ID: record.ID, message: "FG Worker Security ID is blank", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.firstName) {
          aErrorLogs.push({ record_ID: record.ID, message: "First Name is blank", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.lastName) {
          aErrorLogs.push({ record_ID: record.ID, message: "Last Name is blank", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.workOrderId) {
          aErrorLogs.push({ record_ID: record.ID, message: "FG Workorder is blank", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.siteCode) {
          aErrorLogs.push({ record_ID: record.ID, message: "FG Site Code is blank", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        } else {
          const siteDetails = await this._checkSiteCodeExists(record.siteCode);
          if (!siteDetails) {
            aErrorLogs.push({ record_ID: record.ID, message: `Site Code ${record.siteCode} is not maintained in table FGSiteCodeToAddressMapping`, process_code: sProcessCode });
            aFailedRecordIDs.push(record.ID);
            hasRecordFailed = true;
          }
        }

        if (!record.companyCode) {
          aErrorLogs.push({ record_ID: record.ID, message: "Company Code is required", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.billTo) {
          aErrorLogs.push({ record_ID: record.ID, message: "BILL_TO is required field", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.soldTo) {
          aErrorLogs.push({ record_ID: record.ID, message: "Sold TO is required field", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.salesOffice) {
          aErrorLogs.push({ record_ID: record.ID, message: "Sales Office is required", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.matnr) {
          aErrorLogs.push({ record_ID: record.ID, message: "Material is required field", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        if (!record.vendorCode) {
          aErrorLogs.push({ record_ID: record.ID, message: "Vendor Code is required", process_code: sProcessCode });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        // Check sales contract 
        const [lv_prefix, lv_wo] = record.workOrderId.split('WO');
        const result = lv_prefix.substring(0, 2) + lv_wo;
        const oSalesOrderRes = this._validateSalesOrder(record, aSalesOrders, result);
        if (oSalesOrderRes.hasError) {
          // Check if error is from result (alphanumeric sales order)
          // this.LOG._info && this.LOG.info(
          //   `Validation error for record ${record.ID}: errors=${JSON.stringify(oSalesOrderRes.errors)}`
          // );
          const resultError = oSalesOrderRes.errors.find(error =>
            error.message.includes('Alphanumeric Sales Order')|| error.message.includes('is already loaded in SAP')
          );

          this.LOG._info && this.LOG.info(
            `Record ${record.workOrderId}: resultError found=${!!resultError}, message=${resultError?.message}`
          );

          if (resultError) {
            // Error is from result - update entity
            this.LOG._info && this.LOG.info(
                `Updating record ${record.ID} to processLevel='Z', rejected=true, valid=false`
              );
            try {
              await Promise.allSettled([
                ProcessLogger.addLogs(oSalesOrderRes.errors),
                // this.markRecordsValid('Z', [record.ID], true)
                UPDATE('com.aleron.monitor.WorkOrders_FG')
                  .set({ rejected: true, processLevel_code: 'Z', valid: false })
                  .where({ ID: record.ID })
              ]);

              //  this.LOG._info && this.LOG.info(
              //   `Update results for record ${record.ID}: ${JSON.stringify(updateResults.map(r => ({status: r.status, value: r.value})))}`
              // );

               const recordIndex = this.records.findIndex(r => r.ID === record.ID);
              if (recordIndex !== -1) {
                this.records[recordIndex].rejected = true;
                this.records[recordIndex].processLevel_code = 'Z';
                this.records[recordIndex].valid = false;
              }

              aRejectedRecordIDs.push(record.ID);
              hasRecordFailed = true;
              continue;
              // Exit validation step after successful update
              // return {
              //   hasError: true,
              //   continue: false,
              // };
            } catch (updateError) {
              aErrorLogs.push({
                record_ID: record.ID,
                message: `Error updating alphanumeric sales order: ${updateError.message}`, process_code: sProcessCode

              });
              aFailedRecordIDs.push(record.ID);
              hasRecordFailed = true;
            }
          } else {
            // Error is from normal record validation - existing logic
            oSalesOrderRes.errors.forEach((error) => {
                    error.process_code = sProcessCode;
                });
            aErrorLogs.push(...oSalesOrderRes.errors);
            aFailedRecordIDs.push(record.ID);
            hasRecordFailed = true;
          }
        }


        // Check Sales Contract Header
        const oSalesContHeaderRes = await this._validateSalesContHeader(record, aSalesContractHeaders);
        if (oSalesContHeaderRes.hasError) {
          oSalesContHeaderRes.errors.forEach((error) => {
                    error.process_code = sProcessCode;
                });
          aErrorLogs.push(...oSalesContHeaderRes.errors);

          
          aFailedRecordIDs.push(record.ID);

          hasRecordFailed = true;
        }else {
          // Store the updated contract value for database update                    
          record.wnContract = oSalesContHeaderRes.updatedContract;
          const idx = this.records.findIndex(r => r.ID === record.ID);
         if (idx !== -1) {
           this.records[idx].wnContract = oSalesContHeaderRes.updatedContract;
         }
        }

        // Check Sales Contract Item
        const oSalesContItemRes = this._validateSalesContItem(record, aSalesContractItems);
        if (oSalesContItemRes.hasError) {
          oSalesContItemRes.errors.forEach((error) => {
                    error.process_code = sProcessCode;
                });
          aErrorLogs.push(...oSalesContItemRes.errors);
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }

        // Check Vendor Master
        /*  const oVendorMasterRes = this._validateVendorMaster(record, aVendorMasterItems);
          if (oVendorMasterRes.hasError) {
            aErrorLogs.push(...oVendorMasterRes.errors);
            aFailedRecordIDs.push(record.ID);
            hasRecordFailed = true;
          } */

        if (!hasRecordFailed) {
          aPassedRecordIDs.push(record.ID);
        }

      }

      if (isSsValid) {
        try {
          // Query sales order header
          const salesOrderHeader = await this.salesOrderAPI.executeQuery(
            SELECT.one.from('SalesOrder')
              .columns(['SalesOrder', 'YY1_AlphanumericSalesO_SDH', 'DistributionChannel'])
              .where({
                YY1_CustomSalesOrder_SDH: 'ZWCP',
                YY1_AlphanumericSalesO_SDH: record.workOrderId
              })
          );

          if (!salesOrderHeader) {
            aErrorLogs.push({
              record_ID: record.ID,
              message: `CP/CR is not loaded in SAP for FG WO`, process_code: sProcessCode
            });
            aFailedRecordIDs.push(record.ID);
            hasRecordFailed = true;
          } else {
            // Query sales order item
            const salesOrderItem = await this.salesOrderAPI.executeQuery(
              SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrder', 'SalesOrderItem', 'WBSElement', 'YY1_EEGroup_SD_SDI'])
                .where({
                  SalesOrder: salesOrderHeader.SalesOrder,
                  SalesOrderItem: '10'
                })
            );

            if (salesOrderItem) {
              // Update record fields with values from sales order
              try {
                await UPDATE('com.aleron.monitor.WorkOrders_FG')
                  .set({
                    salesDocumentNoSAP: salesOrderHeader.SalesOrder,
                    distributionChannelSAP: salesOrderHeader.DistributionChannel.substring(salesOrderHeader.DistributionChannel.length - 2),
                    projectNumberSAP: salesOrderItem.WBSElement,
                    employeeSubgroupSAP: salesOrderItem.YY1_EEGroup_SD_SDI
                  })
                  .where({ ID: record.ID });
              
                if (!hasRecordFailed) {
                  aPassedRecordIDs.push(record.ID);
                }
              } catch (updateError) {
                aErrorLogs.push({
                  record_ID: record.ID,
                  message: `Error updating record fields: ${updateError.message}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(record.ID);
                hasRecordFailed = true;
              }
            }
          }
        } catch (error) {
          aErrorLogs.push({
            record_ID: record.ID,
            message: `Error validating SS contract: ${error.message}`, process_code: sProcessCode
          });
          aFailedRecordIDs.push(record.ID);
          hasRecordFailed = true;
        }
      }

    }
const aFailedRecordIDsFiltered = aFailedRecordIDs.filter(id => !aRejectedRecordIDs.includes(id));
    // If errors are there, log them and update failed records
    if (aErrorLogs.length) {
      try {
        await Promise.allSettled([
          ProcessLogger.addLogs(aErrorLogs),
          this.markRecordsValid(sProcessCode, aFailedRecordIDsFiltered, false),
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
    if (aRejectedRecordIDs.length) {
      try {
        await this.markRecordsValid('Z', aRejectedRecordIDs, false);
        this.LOG._info &&
          this.LOG.info(
            `Marked ${aRejectedRecordIDs.length} rejected records as invalid with processLevel 'Z'`
          );
      } catch (err) {
        this.LOG._error && this.LOG.error(err.message);
      }
    }
    
    if (aPassedRecordIDs.length) {
      // await Promise.allSettled(
      //   aPassedRecordIDs.map(id => {
      //     const rec = this.records.find(r => r.ID === id);
      //     if (rec && rec.wnContract) {
      //       return UPDATE(WorkOrders_FG)
      //         .set({ wnContract: rec.wnContract })
      //         .where({ ID: id });
      //     }
      //     return Promise.resolve();
      //   })
      // );

      await Promise.allSettled([
        ProcessLogger.removeLogs(aPassedRecordIDs),
        this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
      ]);
      this.LOG._info &&
        this.LOG.info(cds.i18n.messages.at('INFO_RECORDS_UPDATED', [sProcessCode, 'All']));
    }

    const allFailedRecords = [...aFailedRecordIDs, ...aRejectedRecordIDs];

    this.updateExclusionSet({
      passed: aPassedRecordIDs,
      failed: allFailedRecords,
      skipped: aSkippedRecords,
      bBreakExecution,
    });
    return {
      hasError: aFailedRecordIDs.length > 0 || aRejectedRecordIDs.length > 0,
      continue: aFailedRecordIDs.length === 0 && aRejectedRecordIDs.length > 0,
    };
  }

  // async processProject(sProcessCode, bBreakExecution) {
  //   LOG._info && LOG.info('Logging _processProject');

  //   let aRecordsForProcessing = [],
  //     aSkippedRecords = [],
  //     aErrorLogs = [],
  //     aPassedRecordIDs = [],
  //     aFailedRecordIDs = [];

  //   for (const record of this.records) {
  //     if (this.shouldRecordProcess(record, sProcessCode)) {
  //       aRecordsForProcessing.push({ ...record });
  //     } else {
  //       aSkippedRecords.push({ ...record });
  //       continue;
  //     }
  //   }

  //   this.updateProcessingState(sProcessCode);
  //   if (!aRecordsForProcessing.length) {
  //     // If Step doesn't need to be processed, simply return to avoid costly calls
  //     return {
  //       hasError: false,
  //       continue: true,
  //     };
  //   }

  //   // const EnterpriseProject = new EnterpriseProjectComm();

  //   if (sProcessCode === '4') {
  //     // Filter records where ssContract is empty
  //     const recordsWithoutSSContract = aRecordsForProcessing.filter(record => !record.ssContract);

  //     if (recordsWithoutSSContract.length > 0) {
  //       let aPayloads = recordsWithoutSSContract.map((record) => ({
  //         EnterpriseProjectType: record.payroll === 'IC' ? 'Z4' : '40',
  //         CompanyCode: record.companyCode,
  //         ProfitCenter: record.salesOffice,
  //         ProjectDescription: `${record.soldTo}-11016895`,  // populate dynamically afterwards
  //         ResponsibleCostCenter: `${record.companyCode}${record.salesOffice}`,
  //         ProjectStartDate: moment(record.startDate).format('YYYY-MM-DD'),
  //         // ProjectEndDate: moment(record.endDate).format('YYYY-MM-DD'),,
  //         ProjectEndDate: '2200-12-31',
  //         ProjectProfileCode: 'YP05',
  //         EntProjIsMultiSlsOrdItmsEnbld: true,
  //         ProjectCurrency: record.currency_code,
  //         // WBSElementInternalID:'00000000',
  //         // YY1_EmployeeName_PPH: `${record.firstName}${record.lastName}`,
  //         YY1_Employee_PPH: record.personnelNoSAP
  //       }));

  //       try {
  //         for (let i = 0; i < aPayloads.length; i++) {
  //           let insertedProject = await this.enterpriseProjectAPI.executeQuery(
  //             INSERT.into('A_EnterpriseProject').entries(aPayloads[i]),
  //           );
  //           if (insertedProject.Project) {
  //             this.records[i].projectNumberSAP = insertedProject.Project;
  //             this.records[i].projectUUID = insertedProject.ProjectUUID;
  //             await UPDATE('MonitorService.WorkOrders_FG')
  //               .set({
  //                 projectNumberSAP: insertedProject.Project,
  //                 projectUUID: insertedProject.ProjectUUID,
  //                 valid: true,
  //                 processLevel_code: sProcessCode,
  //               })
  //               .where({ ID: this.records[i].ID });

  //             aPassedRecordIDs.push(this.records[i].ID);
  //           } else {
  //             aErrorLogs.push({
  //               record_ID: this.records[i].ID,
  //               message: `${insertedProject.message}`,
  //             });
  //             aFailedRecordIDs.push(this.records[i].ID);
  //             LOG.error(`Error processing record ID ${this.records[i]}: ${insertedProject.message}`);
  //           }
  //         }
  //       } catch (error) {
  //         LOG.error(`Critical error in _processProject: ${error.message}`, { error });
  //       }
  //     } else {
  //       // Add records with ssContract to passedRecordIDs
  //       for (const record of aRecordsForProcessing) {
  //         if (record.ssContract) {
  //           aPassedRecordIDs.push(record.ID);
  //           await UPDATE('MonitorService.WorkOrders_FG')
  //             .set({
  //               valid: true,
  //               processLevel_code: sProcessCode,
  //             })
  //             .where({ ID: record.ID });
  //         }
  //       }
  //     }
  //   } else if (sProcessCode === 'C') {
  //     for (let i = 0; i < aRecordsForProcessing.length; i++) {
  //       let updatedProject = await this.enterpriseProjectAPI.updateProject(
  //         aRecordsForProcessing[i].projectUUID,
  //         aRecordsForProcessing[i].salesDocumentNoSAP,
  //       );
  //       let releaseProject = await this.enterpriseProjectAPI.releaseProject(
  //         aRecordsForProcessing[i].projectUUID,
  //         "10"
  //       );
  //       if (updatedProject.message) {
  //         aErrorLogs.push({
  //           record_ID: aRecordsForProcessing[i].ID,
  //           message: `${updatedProject.message}`,
  //         });
  //         aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
  //         LOG.error(
  //           `Error processing record ID ${aRecordsForProcessing[i].ID}: ${updatedProject.message}`,
  //         );
  //       }else if(releaseProject.message){
  //         aErrorLogs.push({
  //           record_ID: aRecordsForProcessing[i].ID,
  //           message: `${releaseProject.message}`,
  //         });
  //         aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
  //         LOG.error(
  //           `Error processing record ID ${aRecordsForProcessing[i].ID}: ${releaseProject.message}`,
  //         );
  //       }  else {
  //         await UPDATE('MonitorService.WorkOrders_FG')
  //           .set({
  //             valid: true,
  //             processLevel_code: sProcessCode,
  //           })
  //           .where({ ID: aRecordsForProcessing[i].ID });

  //         aPassedRecordIDs.push(aRecordsForProcessing[i].ID);
  //       }
  //     }
  //   }

  //   if (aErrorLogs.length) {
  //     await ProcessLogger.addLogs(aErrorLogs);
  //     await UPDATE(WorkOrders_FG)
  //       .set({ valid: false, processLevel_code: sProcessCode })
  //       .where({ ID: { in: aFailedRecordIDs } });
  //   }

  //   if (aPassedRecordIDs.length) {
  //     await ProcessLogger.removeLogs(aPassedRecordIDs);
  //     await UPDATE(WorkOrders_FG)
  //       .set({ valid: true, processLevel_code: sProcessCode })
  //       .where({ ID: { in: aPassedRecordIDs } });
  //   }


  //   return {
  //     hasError: aFailedRecordIDs.length > 0,
  //     continue: aFailedRecordIDs.length === 0
  //   }
  // }

  // _validateSalesOrder(oRecord, aSalesOrders) {{
  //   let hasError = false,
  //     aErrors = [];
  //    const oSalesContract = aSalesOrders.find((sc) => oRecord.workOrderId === sc.AssignmentReference); // 1 more condition
  //       if (oSalesContract) {
  //         hasError = true;
  //         aErrors.push({
  //           record_ID: oRecord.ID,
  //           message: cds.i18n.messages.at('msg.wordOrderLoaded'),
  //         });
  //       }   
  //       return {
  //         hasError,
  //         errors: aErrors,
  //       };   
  // }

  async processProject(sProcessCode, bBreakExecution) {
    LOG._info && LOG.info('Logging _processProject');

    let aRecordsForProcessing = [],
      aSkippedRecords = [],
      aErrorLogs = [],
      aPassedRecordIDs = [],
      aFailedRecordIDs = [];

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

    // const EnterpriseProject = new EnterpriseProjectComm();

    if (sProcessCode === '4') {
      // Separate records into two groups
      const recordsWithoutSSContract = aRecordsForProcessing.filter(record => !record.ssContract);
      const recordsWithSSContract = aRecordsForProcessing.filter(record => record.ssContract);

      // Process records WITHOUT ssContract - create enterprise projects
      if (recordsWithoutSSContract.length > 0) {
        let aPayloads = recordsWithoutSSContract.map((record) => ({
          EnterpriseProjectType: record.payroll === 'IC' ? 'Z4' : '40',
          CompanyCode: record.companyCode,
          ProfitCenter: record.salesOffice,
          ProjectDescription: `${record.soldTo}-11016895`,  // populate dynamically afterwards
          ResponsibleCostCenter: `${record.companyCode}${record.salesOffice}`,
          ProjectStartDate: moment(record.startDate).format('YYYY-MM-DD'),
          // ProjectEndDate: moment(record.endDate).format('YYYY-MM-DD'),,
          ProjectEndDate: '2200-12-31',
          ProjectProfileCode: 'YP05',
          EntProjIsMultiSlsOrdItmsEnbld: true,
          ProjectCurrency: record.currency_code,
          // WBSElementInternalID:'00000000',
          // YY1_EmployeeName_PPH: `${record.firstName}${record.lastName}`,
          YY1_Employee_PPH: record.personnelNoSAP
        }));

        try {
          for (let i = 0; i < aPayloads.length; i++) {
            let insertedProject = await this.enterpriseProjectAPI.executeQuery(
              INSERT.into('A_EnterpriseProject').entries(aPayloads[i]),
            );
            if (insertedProject.Project) {
              // Find correct record index in this.records
              const recordIndex = this.records.findIndex(r => r.ID === recordsWithoutSSContract[i].ID);
              if (recordIndex !== -1) {
                this.records[recordIndex].projectNumberSAP = insertedProject.Project;
                this.records[recordIndex].projectUUID = insertedProject.ProjectUUID;
              }
              
              await UPDATE('MonitorService.WorkOrders_FG')
                .set({
                  projectNumberSAP: insertedProject.Project,
                  projectUUID: insertedProject.ProjectUUID,
                  valid: true,
                  processLevel_code: sProcessCode,
                })
                .where({ ID: recordsWithoutSSContract[i].ID });

              aPassedRecordIDs.push(recordsWithoutSSContract[i].ID);
            } else {
              aErrorLogs.push({
                record_ID: recordsWithoutSSContract[i].ID,
                message: `${insertedProject.message}`, process_code: sProcessCode
              });
              aFailedRecordIDs.push(recordsWithoutSSContract[i].ID);
              LOG.error(`Error processing record ID ${recordsWithoutSSContract[i].ID}: ${insertedProject.message}`);
            }
          }
        } catch (error) {
          LOG.error(`Critical error in _processProject: ${error.message}`, { error });
        }
      }

      // Process records WITH ssContract - just mark as passed
      if (recordsWithSSContract.length > 0) {
        for (const record of recordsWithSSContract) {
          aPassedRecordIDs.push(record.ID);
          await UPDATE('MonitorService.WorkOrders_FG')
            .set({
              valid: true,
              processLevel_code: sProcessCode,
            })
            .where({ ID: record.ID });
        }
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
        }else if(releaseProject.message){
          aErrorLogs.push({
            record_ID: aRecordsForProcessing[i].ID,
            message: `${releaseProject.message}`, process_code: sProcessCode
          });
          aFailedRecordIDs.push(aRecordsForProcessing[i].ID);
          LOG.error(
            `Error processing record ID ${aRecordsForProcessing[i].ID}: ${releaseProject.message}`,
          );
        }  else {
          await UPDATE('MonitorService.WorkOrders_FG')
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
      await UPDATE(WorkOrders_FG)
        .set({ valid: false, processLevel_code: sProcessCode })
        .where({ ID: { in: aFailedRecordIDs } });
    }

    if (aPassedRecordIDs.length) {
      await ProcessLogger.removeLogs(aPassedRecordIDs);
      await UPDATE(WorkOrders_FG)
        .set({ valid: true, processLevel_code: sProcessCode })
        .where({ ID: { in: aPassedRecordIDs } });
    }


    return {
      hasError: aFailedRecordIDs.length > 0,
      continue: aFailedRecordIDs.length === 0
    }
  }

  _validateSalesOrder(oRecord, aSalesOrders, result) {
    let hasError = false,
      aErrors = [];
    const oSalesContract = aSalesOrders.find((sc) => oRecord.workOrderId === sc.AssignmentReference); // 1 more condition
    if (oSalesContract) {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: `Work Order ID ${oRecord.workOrderId} is already loaded in SAP`,
      });
    }

    // Additional validation using the result (alphanumeric sales order)
    if (result) {
      const oSalesOrderWithResult = aSalesOrders.find((sc) => result === sc.YY1_AlphanumericSalesO_SDH);
      if (oSalesOrderWithResult) {
        hasError = true;
        aErrors.push({
          record_ID: oRecord.ID,
          message: `Alphanumeric Sales Order ${result} is already loaded in SAP`,
        });
      }
    }

    return {
      hasError,
      errors: aErrors,
    };
  }

  async _validateSalesContHeader(oRecord, aSalesContracts) {
    let hasError = false,
      aErrors = [];
     const oSalesContract = aSalesContracts.find((sc) => oRecord.soldTo === sc.SoldToParty && (oRecord.wnContract === sc.SalesContract || oRecord.wnContract === sc.PurchaseOrderByCustomer)); 
         let updatedContract = oRecord.wnContract;  
         // If found via fallback (PurchaseOrderByCustomer), update the record
           if (oSalesContract && oRecord.wnContract === oSalesContract.PurchaseOrderByCustomer) {
            this.LOG._info && this.LOG.info(`Found SalesContract via fallback for record ${oRecord.ID}: ${oRecord.wnContract} -> ${oSalesContract.SalesContract}`);
            oRecord.wnContract = oSalesContract.SalesContract;
            updatedContract = oSalesContract.SalesContract;
            if (oSalesContract.PurchaseOrderByCustomer) {
              await UPDATE(WorkOrders_FG)
                .set({ legacyContractNo: oSalesContract.PurchaseOrderByCustomer })
                .where({ ID: oRecord.ID });
            }
          } 
      if (!oSalesContract) {
          hasError = true;
          aErrors.push({
            record_ID: oRecord.ID,
            message: cds.i18n.messages.at('msg.contractNotCreated'),
          });
        }   
        return {
          hasError,
          errors: aErrors,
          updatedContract: updatedContract
        };   
  }


  _validateSalesContItem(oRecord, aSalesContracts) {
    let hasError = false,
      aErrors = [];
    const oSalesContract = aSalesContracts.find((sc) => oRecord.matnr === sc.Product && oRecord.wnContract === sc.SalesContract);
    if (!oSalesContract) {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('msg.materialMissingOnContract'),
      });
    }
    return {
      hasError,
      errors: aErrors,
    };
  }

  _validateVendorMaster(oRecord, aSalesContracts) {
    let hasError = false,
      aErrors = [];
    const oSalesContract = aSalesContracts.find((sc) => oRecord.vendorCode === sc.AuthorizationGroup);
    if (!oSalesContract) {
      hasError = true;
      aErrors.push({
        record_ID: oRecord.ID,
        message: cds.i18n.messages.at('msg.vendorMissing'),
      });
    }
    return {
      hasError,
      errors: aErrors,
    };
  }

  async _checkSiteCodeExists(siteCode) {
    try {
      const siteDetails = await SELECT.one.from('com.aleron.monitor.FGSiteCodeToAddressMapping')
        .where({
          siteCodeName: siteCode
        });

      return !!siteDetails; // Returns true if site exists, false otherwise
    } catch (error) {
      this.LOG._error && this.LOG.error(`Error checking site code: ${error.message}`);
      return false;
    }
  }

  /**
  * Query SalesContract with fallback to PurchaseOrderByCustomer
  * @param {Array} conditions - Array of {SalesContract, SoldToParty} objects
  * @returns {Promise<Array>} - Array of SalesContract records
  */
  async _querySalesContractHeaderWithFallback(conditions) {
    const allResults = [];

    for (const condition of conditions) {
      try {
        // First try with SalesContract field
        let query = SELECT.from('SalesContract')
          .columns(['SalesContract', 'SoldToParty', 'PurchaseOrderByCustomer'])
          .where({
            SalesContract: condition.SalesContract,
            SoldToParty: condition.SoldToParty
          });

        let result = await this.salesContractAPI.executeQuery(query);

        // If no results found, try with PurchaseOrderByCustomer as fallback
        if (!result || result.length === 0) {
          this.LOG._info && this.LOG.info(`No SalesContract found for contract ${condition.SalesContract}, trying PurchaseOrderByCustomer fallback`);

          query = SELECT.from('SalesContract')
            .columns(['SalesContract', 'SoldToParty', 'PurchaseOrderByCustomer'])
            .where({
              PurchaseOrderByCustomer: condition.SalesContract,
              SoldToParty: condition.SoldToParty
            });

          result = await this.salesContractAPI.executeQuery(query);

          if (result && result.length > 0) {
            this.LOG._info && this.LOG.info(`Found SalesContract using PurchaseOrderByCustomer fallback for contract ${condition.SalesContract}`);
          }
        }

        if (result && result.length > 0) {
          allResults.push(...result);
        }
      } catch (error) {
        this.LOG._error && this.LOG.error(`Error querying SalesContract for ${condition.SalesContract}: ${error.message}`);
      }
    }

    return allResults;
  }

  async processSalesOrder(sProcessCode, bBreakExecution) {
    const aRecordsForProcessing = [],
      mProcessingRecordsToCentralMapping = new Map();
    const aErrorLogsForUpdate = [],
      aErrorLogs = [],
      aFailedRecordIDs = [],
      aPassedRecordIDs = [],
      aSkippedRecords = [];

    // const alphanumericSalesOrderMap = new Map();

    // Step 1: Fetch SalesContract, Business Partners &Payment Terms
    let sWhereForSalesContract = '',
      sWhereForBusinessPartner = '',
      aSalesContractWhere = [],
      aSalesContractItemConditions = [],
      aAddresses = [],
      mBusinessPartnerWhere = new Map(),
      aSoldToPartyWhere = [],
      aTaxCodeByProvince = [],
      sTaxCodeByProvinceWhere = '',
      aTaxCodeByCity = [],
      sTaxCodeByCityWhere = '',
      aTaxCodeByCounty = [],
      aTaxCodeByCountyWhere = '',
      sTaxCodeByCountyWhere = '',
      oBillingType = {};

    // Prepare where conditions for all the calls
    for (const [iRecordIndex, record] of this.records.entries()) {
      if (this.shouldRecordProcess(record, sProcessCode) && !record.salesDocumentNoSAP) {
        // If record is on step level & is already valid, then skip
        aRecordsForProcessing.push({ ...record });
        mProcessingRecordsToCentralMapping.set(record.ID, iRecordIndex);
      } else {
        aSkippedRecords.push({ ...record });
        continue;
      }
      if (record.wnContract) {
        aSalesContractWhere.push(record.wnContract); // required
        aSalesContractItemConditions.push({
          SalesContract: record.wnContract,
          Product: record.matnr
        });
        mBusinessPartnerWhere.set(record.wnContract, {
          Customer: record.soldTo,
          SalesOrganization: null, // To be used after salescontract are fetched          
          DistributionChannel: '01',
          OrganizationDivision: null, // To be changed after salescontracts are fetched
        });
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
        { reason: anySalesContractError, value: bSalesContracts },
        { reason: anyPaymentTermsErr, value: aPaymentTerms },
        //   {reason: anyAddressErr, value: aAddressesWithCounty},
        // {reason: anyTaxCodeByProvinceErr, value: aTaxCodeByProvinceResults},
        // {reason: anyTaxCodeByCityErr, value: aTaxCodeByCityResults},
        // {reason: anyBillingTypeErr, value: oBillingTypeResult},
      ] = await Promise.allSettled([
        this.salesContractAPI.executeQuery(this._getSalesContractQuery(aSalesContractWhere)),
        this.salesContractAPI.executeQuery(
          SELECT.from('SalesContractItem')
            .columns(['SalesContract', 'Product'])
            .where({
              SalesContract: { in: aSalesContractItemConditions.map(cond => cond.SalesContract) },
              Product: { in: aSalesContractItemConditions.map(cond => cond.Product) }
            }).limit(2000)
        ),
        SELECT.from('com.aleron.monitor.PaymentTerms')
          .columns(['customerNo', 'supplierNo', 'customerTerm', 'vendorTerm', 'poBox'])
          .where({
            customerNo: { in: aSoldToPartyWhere },
            vendorTerm: null,
          }).limit(2000),
        // this.smartyAddressAPI.getCountyFor(aAddresses),
        // SELECT.from('com.aleron.monitor.TaxCodeByProvince')
        //   .columns(['country_code', 'region', 'taxJurisdiction'])
        //   .where(`${sTaxCodeByProvinceWhere}`),
        // SELECT.from('com.aleron.monitor.TaxCodeByCity')
        //   .columns(['country_code', 'region', 'city', 'taxJurisdiction'])
        //   .where(`${sTaxCodeByCityWhere}`),
        // this.billingTypeAPI.executeQuery(
        //   SELECT.one
        //     .from('YY1_BILLINGTYPE')
        //     .columns(['Billing_type'])
        //     .where({SO_order_Type: 'ZWCP'}),
        // ),
      ]);
      if (!anySalesContractErr?.message && aSalesContracts.length) {
        aSalesContracts.forEach((oSalesContract) => {
          mSalesContract.set(oSalesContract.SalesContract, oSalesContract);
          // Build the query for Business Partners fetch since it depends on salescontract
          const oBusinessPartnerWhere = mBusinessPartnerWhere.get(oSalesContract.SalesContract);
          if (oBusinessPartnerWhere) {
            // sWhereForBusinessPartner += `or (Customer = '${oBusinessPartnerWhere.Customer}' and SalesOrganization = '${oSalesContract.SalesOrganization}' and (PartnerFunction = 'WE' or PartnerFunction = 'Z4' or PartnerFunction = 'Z5') and DistributionChannel = '01' and Division = '${oSalesContract.OrganizationDivision}')`;
            sWhereForBusinessPartner += `or (Customer = '${oBusinessPartnerWhere.Customer}' and SalesOrganization = '${oSalesContract.SalesOrganization}' and DistributionChannel = '01' and Division = '${oSalesContract.OrganizationDivision}')`;
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

      // if (!anyAddressErr?.message && aAddressesWithCounty.length) {
      //   aAddresses = aAddressesWithCounty;
      //   aAddresses.forEach((oAddress) => {
      //     const oWhere = aTaxCodeByCountyWhere.find(
      //       (oWhere) => oWhere.record_ID === oAddress.record_ID,
      //     );
      //     if (oWhere && oAddress.county) {
      //       sTaxCodeByCountyWhere += `or (country_code = '${oWhere.country_code}' and county = '${oAddress.county}' and region = '${oWhere.region}')`;
      //     }
      //   });
      //   sTaxCodeByCountyWhere.length &&
      //     (sTaxCodeByCountyWhere = sTaxCodeByCountyWhere.slice(3).trim());
      // }
      // if (!anyTaxCodeByProvinceErr?.message && aTaxCodeByProvinceResults.length) {
      //   aTaxCodeByProvince = aTaxCodeByProvinceResults;
      // }
      // if (!anyTaxCodeByCityErr?.message && aTaxCodeByCityResults.length) {
      //   aTaxCodeByCity = aTaxCodeByCityResults;
      // }
      // if (!anyBillingTypeErr?.message && oBillingTypeResult) {
      //   oBillingType = oBillingTypeResult;
      // }
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

    // Step 3: Prepare Payload for SalesOrder Creation
    const aPayloads = [];
    let endDateTime;
    const mPayloadMap = new Map();
    const alphanumericSalesOrderMap = new Map();
    let SalesOrderDocType = null;
    let custGroup = '';
    let contractData;
    let salesContractItem = null;
    let billingType = null;
    // First populate the alphanumericSalesOrderMap
    for (const oRecord of aRecordsForProcessing) {
      if (oRecord.workOrderId) {
        const [lv_prefix, lv_wo] = oRecord.workOrderId.split('WO');
        if (lv_prefix && lv_wo) {
          const result = lv_prefix.substring(0, 2) + lv_wo;
          alphanumericSalesOrderMap.set(oRecord.ID, result);
        }
      }
    }
    for (const oRecord of aRecordsForProcessing) {
      const aErrors = [];
      oRecord.PORequiredSAP = 'X';
      const oSalesContract = mSalesContract.get(oRecord.wnContract);
      if (!oSalesContract) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: cds.i18n.messages.at('ERR_SALES_CONTRACT_NOT_FOUND'), process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }


      try {
        const defaultEmployee = await SELECT.one.from('com.aleron.monitor.FGdefaultEmp')
      }
      catch (insertError) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: `Maintain Z3 Employee In Config Table`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }

      // Check if business unit exists in FGBusinessUnit table
      try {
        const existingBU = await SELECT.one.from('com.aleron.monitor.FGBusinessUnit')
          .where({
            businessCode: oRecord.businessUnitCode
          });

        if (!existingBU) {
          // No entry found, create new entry
          const newBU = {
            soldToParty: oRecord.soldTo,
            businessCode: oRecord.businessUnitCode,
            businessUnitName: oRecord.businessUnitName
          };



          try {
            await INSERT.into('com.aleron.monitor.FGBusinessUnit').entries(newBU);
          } catch (insertError) {
            aErrors.push({
              record_ID: oRecord.ID,
              message: `Please maintain business unit ${oRecord.businessUnitCode} in table ZFG_BU`, process_code: sProcessCode
            });
            aFailedRecordIDs.push(oRecord.ID);
            aErrorLogs.push(...aErrors);
            continue;
          }
        }
      } catch (error) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: `Error checking business unit: ${error.message}`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }

      // Check if cost center exists in FGCostCenter table
      try {
        const existingCC = await SELECT.one.from('com.aleron.monitor.FGCostCenter')
          .where({
            costCentreCode: oRecord.costCenterCode
          });

        if (!existingCC) {
          // No entry found, create new entry
          const newCC = {
            soldToParty: oRecord.soldTo,
            costCentreCode: oRecord.costCenterCode,
            costCentreName: oRecord.costCenterName
          };

          try {
            await INSERT.into('com.aleron.monitor.FGCostCenter').entries(newCC);
          } catch (insertError) {
            aErrors.push({
              record_ID: oRecord.ID,
              message: `Please maintain cost center ${oRecord.costCenterCode} in table ZFG_COST_CENTER`, process_code: sProcessCode
            });
            aFailedRecordIDs.push(oRecord.ID);
            aErrorLogs.push(...aErrors);
            continue;
          }
        }
      } catch (error) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: `Error checking cost center: ${error.message}`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }

      // Check Sales Contract Item
      try {
        salesContractItem = await this.salesContractAPI.executeQuery(
          SELECT.one.from('SalesContractItem')
            .columns(['SalesContract', 'SalesContractItem', 'Product'])
            .where({
              SalesContract: oRecord.wnContract,
              Product: oRecord.matnr
            })
        );


        if (!salesContractItem) {
          aErrors.push({
            record_ID: oRecord.ID,
            message: `Material ${oRecord.matnr} not present in contract ${oRecord.wnContract}`, process_code: sProcessCode
          });
          aFailedRecordIDs.push(oRecord.ID);
          aErrorLogs.push(...aErrors);
          continue;
        }
      } catch (error) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: `Error checking sales contract item: ${error.message}`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }

      // Check if WN_CONTRACT is valid
      if (!oRecord.wnContract || oRecord.wnContract === '0' || oRecord.wnContract.trim() === '') {
        aErrors.push({
          record_ID: oRecord.ID,
          message: 'WN_CONTRACT cannot be empty or 0', process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }

      // Check if contract exists in SkipInterfaces
      try {
        const skipInterface = await SELECT.one.from('com.aleron.monitor.SkipInterfaces')
          .where({
            contract: oRecord.wnContract
          });

        if (skipInterface) {
          // Contract exists in SkipInterfaces, proceed to next step
          continue;
        }
      } catch (error) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: `Error checking skip interfaces: ${error.message}`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }

      // Check contract data
      try {
        contractData = await this.salesContractAPI.executeQuery(
          SELECT.one.from('SalesContract')
            .columns(['SalesContract', 'DistributionChannel', 'CustomerGroup'])
            .where({
              SalesContract: oRecord.wnContract
            })
        );

        if (!contractData) {
          aErrors.push({
            record_ID: oRecord.ID,
            message: `Contract ${oRecord.wnContract} not found`, process_code: sProcessCode
          });
          aFailedRecordIDs.push(oRecord.ID);
          aErrorLogs.push(...aErrors);
          continue;
        }


        oRecord.icSOEmployeeNumber = '';
        // Check if Distribution Channel is IC
        if (contractData.DistributionChannel === 'IC') {
          // Check for existing IC SO
          const existingICSO = await this.salesOrderAPI.executeQuery(
            SELECT.one.from('SalesOrder')
              .columns(['SalesOrder', 'AssignmentReference'])
              .where({
                YY1_CustomSalesOrder_SDH: 'ZWCP',
                AssignmentReference: oRecord.workOrderId
              })
          );

          if (!existingICSO) {
            aErrors.push({
              record_ID: oRecord.ID,
              message: `Cannot find IC SO tied to FG WO ${oRecord.workOrderId}`, process_code: sProcessCode
            });
            aFailedRecordIDs.push(oRecord.ID);
            aErrorLogs.push(...aErrors);
            continue;
          }

          try {
            const icSOEmployee = await this.salesOrderAPI.executeQuery(
              SELECT.one.from('A_SalesOrderPartner')
                .columns(['SalesOrder', 'PartnerFunction', 'PersonnelNumber'])
                .where({
                  SalesOrder: existingICSO.SalesOrder,
                  PartnerFunction: 'Z3'
                })
            );

            // Store the employee number for later use
            oRecord.icSOEmployeeNumber = icSOEmployee.PersonnelNumber;

            if (!icSOEmployee) {
              aErrors.push({
                record_ID: oRecord.ID,
                message: `No Z3 partner function found in IC Sales Order ${existingICSO.SalesOrder}`, process_code: sProcessCode
              });
              aFailedRecordIDs.push(oRecord.ID);
              aErrorLogs.push(...aErrors);
              continue;
            }


          } catch (error) {
            aErrors.push({
              record_ID: oRecord.ID,
              message: `Error checking IC Sales Order partner: ${error.message}`, process_code: sProcessCode
            });
            aFailedRecordIDs.push(oRecord.ID);
            aErrorLogs.push(...aErrors);
            continue;
          }

          if (contractData.DistributionChannel === 'CP') {
            aErrors.push({
              record_ID: oRecord.ID,
              message: `Interface will process only Managed Services and Subcontracting scenarios `, process_code: sProcessCode
            });
            aFailedRecordIDs.push(oRecord.ID);
            aErrorLogs.push(...aErrors);
            continue;
          } else if (contractData.DistributionChannel === 'MS') {
            SalesOrderDocType = 'ZWMS';
          }
          else if (contractData.DistributionChannel === 'SC') {
            SalesOrderDocType = 'ZWSC';
          }

          if (contractData.DistributionChannel === 'IC') {
            custGroup = 'ZI';
          }


        }
        else if (contractData.CustomerGroup === 'ZC') {
          SalesOrderDocType = 'ZWCP';
        }
        else if (contractData.CustomerGroup === 'ZB') {
          SalesOrderDocType = 'ZWBP';
        }
        else if (contractData.CustomerGroup === 'ZD') {
          SalesOrderDocType = 'ZWDP';
        }
        else if (contractData.CustomerGroup === 'ZM') {
          SalesOrderDocType = 'ZWMS';
        }
        else if (contractData.CustomerGroup === 'ZS') {
          SalesOrderDocType = 'ZWSC';
        }
      } catch (error) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: `Error checking contract data: ${error.message}`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }


      const billiType = await this.billingTypeAPI.executeQuery(
        SELECT.one.from('YY1_BILLINGTYPE')
          .columns(['Billing_type'])
          .where({
            SO_order_Type: SalesOrderDocType
          })
      );



      if (!billiType) {
        aErrors.push({
          record_ID: oRecord.ID,
          message: `Billing Type not found for Sales Order Type ${SalesOrderDocType}`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(oRecord.ID);
        aErrorLogs.push(...aErrors);
        continue;
      }

      if (oRecord.endDate) {
        const endDateObj = new Date(oRecord.endDate); // safely convert string to Date
        endDateTime = `/Date(${endDateObj.getTime()})/`;
      }


      // Prepare payload for SalesOrder creation
      const oPayload = await this._prepareDataForSalesOrderCreate({
        record: oRecord,
        salesContract: oSalesContract,
        salesContractItem: salesContractItem,
        billingType: billiType,
        paymentTermsMap: mPaymentTerms,
        businessPartnerMap: mBusinessPartners,
        taxCode: 'sTaxCode',
        SalesOrderDocType,
        custGroup,
        alphanumericSalesOrderMap,
        endDateTime
      });

      // Get partner functions
      // const partnerFunctions 
      const { to_Partner: aPartnerFunctions } = await this._preparePartnerFunctions({
        record: oRecord,
        businessPartnerMap: mBusinessPartners,
        taxCode: 'sTaxCode'
      });

      // Add partner functions to payload
      if (aPartnerFunctions) {
        oPayload.to_Partner = aPartnerFunctions;
      }
      // if (partnerFunctions.errors.length > 0) {
      //   aFailedRecordIDs.push(oRecord.ID);
      //   aErrors.push(...partnerFunctions.errors);
      // }

      // Add payload to aPayloads and map record.ID to its payloadIndex
      const iPayloadIndex = aPayloads.push(oPayload) - 1;
      mPayloadMap.set(oRecord.ID, {
        payloadIndex: iPayloadIndex,
        salesOrder: null,
        scheduleLinePayloadIndex: null,
      });
    }

    // ... rest of the code ....

    // Step 4: Create SalesOrders in S/4HANA via OData
    // const aSalesOrderResults = await this.salesOrderAPI.createSalesOrders(aPayloads);

     let aSalesOrderResults = [];
    if (aPayloads.length > 0) {
      aSalesOrderResults = await this.salesOrderAPI.createSalesOrders(aPayloads);
    } else {
      this.LOG._info && this.LOG.info('[VC] No valid payloads to create SalesOrders');
    }

    // Process the results
    aSalesOrderResults.forEach((oResult, iPayloadIndex) => {
      // Find the record ID corresponding to the payload index
      const sRecordID = [...mPayloadMap.entries()].find(
        ([, oMapEntry]) => oMapEntry.payloadIndex === iPayloadIndex,
      )?.[0];

      if (!oResult.hasError) {
        const oCreatedSalesOrder = oResult.value;
        aPassedRecordIDs.push(sRecordID);

        //         // Update the map entry with the created SalesOrder ID
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

    //     // TODO: VC Date update process - TESTCHECK
    await this._prepareVCData(
      this.records,
      mPayloadMap,
      aPassedRecordIDs,
      aFailedRecordIDs,
      aErrorLogs,
    );

    //     // Step 7: Update Error Logs
    if (aErrorLogs.length) {
      await ProcessLogger.addLogs(aErrorLogs);
      await UPDATE(WorkOrders_FG)
        .set({ valid: false, processLevel_code: sProcessCode })
        .where({ ID: { in: aFailedRecordIDs } });
    }

    //     // Step 8: Update Passed and Failed Records

    //     // Update the `salesDocumentNoSAP` field in `this.records` and the database
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

    //     // Create records to update using flatMap
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
          return UPDATE(WorkOrders_FG)
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
      await UPDATE(WorkOrders_FG)
        .set({ valid: true, processLevel_code: sProcessCode })
        .where({ ID: { in: aPassedRecordIDs } });
    }

    // Update the status of failed records
    if (aFailedRecordIDs.length) {
      await UPDATE(WorkOrders_FG)
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


  /**
  * Prepare data for SalesOrder creation
  * @param {object} mParams
  * @param {object} mParams.record - WorkOrdersFG record
  * @param {object} mParams.salesContract - SalesContract record
  * @param {object} mParams.businessPartnerMap - Map of BusinessPartner data
  * @param {object} mParams.paymentTermsMap - Map of payment terms
  * @param {string} mParams.taxCode - Tax code
  * @returns {object} SalesOrder payload with 'errors' property. `errors` property MUST BE removed before sending to S/4HANA
  */
  async _prepareDataForSalesOrderCreate({
    record,
    salesContract,
    salesContractItem,
    businessPartnerMap,
    paymentTermsMap,
    taxCode,
    SalesOrderDocType,
    custGroup,
    billingType,
    alphanumericSalesOrderMap,
    endDateTime
  }) {
    const oReturnData = {
      SalesOrderType: 'OR',
      SalesOrganization: salesContract.SalesOrganization,
      DistributionChannel: salesContract.DistributionChannel,
      OrganizationDivision: salesContract.OrganizationDivision,
      SalesOffice: record.salesOffice,
      PurchaseOrderByCustomer:record.purchaseOrder,
      PurchaseOrderByShipToParty: record.businessUnitCode,//'100',
      SDDocumentReason: '',
      PricingDate: `/Date(${+moment()})/`,
      IncotermsClassification: 'DAP',
      IncotermsLocation1: '1',
      YY1_AlphanumericSalesO_SDH: alphanumericSalesOrderMap.get(record.ID) || null,
      AssignmentReference: record.workOrderId,
      // CustomerPaymentTerms: 'NT65', // From Customer Master     
      YY1_CustomSalesOrder_SDH: SalesOrderDocType,//'ZWCP'
      ReferenceSDDocument: record.wnContract,
      ReferenceSDDocumentCategory: 'G',
      CustomerGroup: custGroup,
      CustomerPriceGroup: salesContract.CustomerPriceGroup, //'ZM', // Get From COntract
      to_Item: [
        {
          SalesOrderItemCategory: 'TADN',
          Material: record.matnr,
          RequestedQuantity: '1',
          RequestedQuantityUnit: 'LAB',
          RequestedQuantitySAPUnit: 'LAB',
          RequestedQuantityISOUnit: '_01',
          TransactionCurrency: record.currency_code,
          ReferenceSDDocument: record.wnContract,
          YY1_CommodityCode_SD_SDI: record.workOrderId,

          YY1_WNWorkOrder_SD_SDI: alphanumericSalesOrderMap.get(record.ID) || null,
          YY1_CustomBillingType_SDI: billingType.Billing_type || null,
          YY1_WeekEnd_SD_SDI: endDateTime,
          // YY1_CostCenter_SD_SDI: record.costCenterCode,
          ReferenceSDDocumentItem: salesContractItem.SalesContractItem, // '10',
          NetAmount: '0',
          WBSElement: record.projectNumberSAP,  // custom fields ZZ Comoditycode YY1_CommodityCode_SD_SDI = workorderid
          to_ScheduleLine: [this._prepareDataForScheduleLine({ record })],
          to_Partner: [],
        },
      ],
      // to_Partner: this._preparePartnerFunctions({record, businessPartnerMap, taxCode}), // check T partner ZF -- Get details from contract and add
      // errors: [],
    };

    // CustomerPaymentTerms logic
    // First try to get ZTERM_CUSTOMER and PO_BOX from ZSD_LIFNR_ZTERM table
    const oPaymentTerm = paymentTermsMap.get(record.soldTo);
    if (oPaymentTerm?.customerTerm) {
      oReturnData.CustomerPaymentTerms = oPaymentTerm.customerTerm;
    } else {
      // If no entry found in ZSD_LIFNR_ZTERM, get ZTERM from KNVV table
      const oCustomerSalesData = businessPartnerMap.get(record.vendorSAP);
      if (oCustomerSalesData?.CustomerPaymentTerms && salesContract.SalesOrganization) {
        oReturnData.CustomerPaymentTerms = oCustomerSalesData.CustomerPaymentTerms;
      }
    }

    // Set PO Box if available from ZSD_LIFNR_ZTERM
    if (oPaymentTerm?.poBox) {
      oReturnData.PurchaseOrderByShipToParty = oPaymentTerm.poBox;
    }

    if (record.vendor) {
      try {
        const vendorMaster = await this.businesPartnerAPI.executeQuery(
          SELECT.one.from('A_Supplier')
            .columns(['SupplierAccountGroup', 'Industry'])
            .where({
              Supplier: record.vendor
            })
        );
        
        if (vendorMaster) {
          // Set partner function based on account group           
          oReturnData.to_Item[0].to_Partner.push({
            PartnerFunction: 'ZV',
            Supplier: record.vendor
          });
          
        }
      } catch (error) {
        this.LOG._error && this.LOG.error(`Error checking vendor for item partner: ${error.message}`);
      }
    }

    // Check if contract number exists in skip table
    if (record.wnContract && record.wnContract !== '0' && record.wnContract !== '') {
      // Check vendor master
      // const vendorMaster = businessPartnerMap.get(record.vendorCode);
      // if (!vendorMaster) {
      //   oReturnData.errors.push({
      //     record_ID: record.ID,
      //     message: 'Vendor not found in master data',
      //   });
      //   return oReturnData;
      // }

      // Set PO flag based on vendor account group and industry key
      // if (vendorMaster.AccountGroup === 'ZRMT' && vendorMaster.IndustryKey === 'ZMBE') {
      //   oReturnData.PurchaseOrderByCustomer = ''; // No PO needed
      // } else {
      //   oReturnData.PurchaseOrderByCustomer = 'X';
      // }

      // Check contract data
      // if (!salesContract) {
      //   oReturnData.errors.push({
      //     record_ID: record.ID,
      //     message: 'Contract not found',
      //   });
      //   return oReturnData;
      // }

      // Set sold to and bill to from contract
      oReturnData.SoldToParty = salesContract.SoldToParty;
      // oReturnData.BillToParty = salesContract.SoldToParty;

      // // Add partner functions
      // const aPartnerFunctions = [];

      // // Sold to Party (AG)
      // aPartnerFunctions.push({
      //   PartnerFunction: 'AG',
      //   Customer: salesContract.SoldToParty,
      // });

      // // Bill to Party (RE) - 
      // aPartnerFunctions.push({
      //   PartnerFunction: 'RE',
      //   Customer: salesContract.SoldToParty,
      // });

      // // Remit to Vendor (ZR/ZV)
      // // if (vendorMaster.AccountGroup === 'ZRMT') {
      // //   aPartnerFunctions.push({
      // //     PartnerFunction: 'ZR',
      // //     Customer: record.vendorCode,
      // //   });
      // // } else {
      // //   aPartnerFunctions.push({
      // //     PartnerFunction: 'ZV',
      // //     Customer: record.vendorCode,
      // //   });
      // // }

      // // Ship to Party (WE)
      // const shipToParty = businessPartnerMap.get(`${salesContract.SoldToParty}_WE`);
      // if (shipToParty && record.siteCode) {
      //   const siteDetails = businessPartnerMap.get(record.siteCode);
      //   if (siteDetails) {
      //     aPartnerFunctions.push({
      //       PartnerFunction: 'WE',
      //       Customer: shipToParty.BPCustomer,
      //       to_Address: [{
      //         CorrespondenceLanguage: 'EN',
      //         StreetName: siteDetails.address1,
      //         CityName: siteDetails.city,
      //         Region: siteDetails.state,
      //         Country: siteDetails.country.substring(0, 2),
      //         PostalCode: siteDetails.zipCode,
      //         TaxJurisdiction: siteDetails.taxJurCode,
      //         DistrictName: siteDetails.county,
      //         Language: 'EN',
      //         Name: record.siteName,
      //       }],
      //     });
      //   } else {
      //     oReturnData.errors.push({
      //       record_ID: record.ID,
      //       message: 'Site code not maintained in table ZFG_SITE_CODE',
      //     });
      //   }
      // }

      // // Owner Partner (Z4)
      // if (record.owner) {
      //   const ownerPartner = salesContract._Partner.find(p => p.PartnerFunction === 'Z4');
      //   if (ownerPartner) {
      //     const siteDetails = businessPartnerMap.get(record.siteCode);
      //     if (siteDetails) {
      //       aPartnerFunctions.push({
      //         PartnerFunction: 'Z4',
      //         Customer: ownerPartner.Customer,
      //         to_Address: [{
      //           CorrespondenceLanguage: 'EN',
      //           StreetName: siteDetails.address1,
      //           CityName: siteDetails.city,
      //           Region: siteDetails.state,
      //           Country: siteDetails.country.substring(0, 2),
      //           PostalCode: siteDetails.zipCode,
      //           TaxJurisdiction: siteDetails.taxJurCode,
      //           DistrictName: siteDetails.county,
      //           Language: 'EN',
      //           Name: record.managerName,
      //           Name2: `WO OWNER ID ${record.ownerId}`,
      //         }],
      //       });
      //     }
      //   } else {
      //     oReturnData.errors.push({
      //       record_ID: record.ID,
      //       message: 'Z4 partner contact is applicable to SO. Please maintain the data manually.',
      //     });
      //   }
      // }

      // // ZF Partner from contract
      // const zfPartner = salesContract._Partner.find(p => p.PartnerFunction === 'ZF');
      // if (zfPartner) {
      //   const siteDetails = businessPartnerMap.get(record.siteCode);
      //   if (siteDetails) {
      //     aPartnerFunctions.push({
      //       PartnerFunction: 'ZF',
      //       Customer: zfPartner.Customer,
      //       to_Address: [{
      //         CorrespondenceLanguage: 'EN',
      //         StreetName: siteDetails.address1,
      //         CityName: siteDetails.city,
      //         Region: siteDetails.state,
      //         Country: siteDetails.country.substring(0, 2),
      //         PostalCode: siteDetails.zipCode,
      //         TaxJurisdiction: siteDetails.taxJurCode,
      //         DistrictName: siteDetails.county,
      //         Language: 'EN',
      //       }],
      //     });
      //   }
      // }

      // // Add ZW partner if flag is set
      // if (record.createZMPartner === 'X') {
      //   aPartnerFunctions.push({
      //     PartnerFunction: 'ZW',
      //     Customer: record.vendorCode,
      //   });
      // }

      // oReturnData.to_Partner = aPartnerFunctions;

      // Add header text if job posting title exists Check Afterwards
      //  if (record.jobPostingTitle) {
      //   oReturnData.to_Text = [{
      //     TextID: 'ZJOB',
      //     Language: 'EN',
      //     LongText: record.jobPostingTitle,
      //   }];
      // }

      // Set price to 0 for dummy item
      // oReturnData.to_Item[0].NetPrice = '0';
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
  async _preparePartnerFunctions({ record, businessPartnerMap, taxCode }) {
    const aPartnerFunctions = [];
    const aErrors = [];

    // Z3 Partner - Default Employee
    if (record.icSOEmployeeNumber == '') {
      try {

        const defaultEmployee = await SELECT.one.from('com.aleron.monitor.FGdefaultEmp')

        const workPersonnel = await this.workforceAPI.executeQuery(
          SELECT.from('YY1_workforce_cds')
            .columns(['WorkforcePersonExternalID', 'PersonWorkAgreement'])
            .where({ WorkforcePersonExternalID: defaultEmployee.employee })
        )

        if (workPersonnel) {
          aPartnerFunctions.push({
            PartnerFunction: 'Z3',
            Customer: workPersonnel[0].PersonWorkAgreement
          });
        } else {
          aErrors.push({
            record_ID: record.ID,
            message: 'Default Z3 employee not found', process_code: sProcessCode
          });
        }

      } catch (error) {
        aErrors.push({
          record_ID: record.ID,
          message: `Error getting default Z3 employee: ${error.message}`, process_code: sProcessCode
        });
      }
    } else {
      aPartnerFunctions.push({
        PartnerFunction: 'Z3',
        Customer: record.icSOEmployeeNumber
      });
    }

    // Sold to Party
    aPartnerFunctions.push({
      PartnerFunction: 'AG',
      Customer: record.soldTo,
    });

    // Remit Vendor Check Afterwards
    try {
      const vendorMaster = await this.businesPartnerAPI.executeQuery(
        SELECT.one.from('A_Supplier')
          .columns(['SupplierAccountGroup', 'Industry'])
          .where({
            Supplier: record.vendor
          })
      );
      if (!vendorMaster) {
        aErrors.push({
          record_ID: record.ID,
          message: 'Vendor does not exist', process_code: sProcessCode
        });
      } else {
        // Set partner function based on account group
        const partnerFunction = vendorMaster.SupplierAccountGroup === 'ZRMT' ? 'ZR' : 'ZV';
        aPartnerFunctions.push({
          PartnerFunction: partnerFunction,
          Customer: record.vendor
        });

        // Set PO flag based on industry key
        if (vendorMaster.SupplierAccountGroup === 'ZRMT' && vendorMaster.Industry === 'ZMBE') {
          record.PORequiredSAP = ''; // No PO needed
          record.priceGroup = 'ZM';  // customerprizegroup
        }
      }
    } catch (error) {
      aErrors.push({
        record_ID: record.ID,
        message: `Error checking vendor master: ${error.message}`, process_code: sProcessCode
      });
    }

    // Bill to Party
    aPartnerFunctions.push({
      PartnerFunction: 'RE',
      Customer: record.billTo,
    });

    // Ship To Partner
    try {
      // Search for WE partner function in the business partner map
      const shipToPartner = Array.from(businessPartnerMap.entries())
        .find(([key, value]) => {
          const [customer, partnerFunction] = key.split('_');
          return partnerFunction === 'SH' && customer === record.soldTo;
        })?.[1];

      if (shipToPartner && record.siteCode) {
        // Get site details
        const siteDetails = await SELECT.one.from('com.aleron.monitor.FGSiteCodeToAddressMapping')
          .where({
            siteCodeName: record.siteCode,
            customerNo: shipToPartner.Customer
          });

        if (!siteDetails) {
          aErrors.push({
            record_ID: record.ID,
            message: 'Site code not maintained in table SITE_CODE', process_code: sProcessCode
          });
        } else {
          aPartnerFunctions.push({
            PartnerFunction: 'WE',
            Customer: shipToPartner.Customer,
            to_Address: [{
              CorrespondenceLanguage: 'EN',
              StreetName: siteDetails.siteAddress1,
              CityName: siteDetails.city,
              Region: siteDetails.state,
              Country: siteDetails.country_code.substring(0, 2),
              PostalCode: siteDetails.zipCode,
              TaxJurisdiction: siteDetails.taxJurCode,
              DistrictName: siteDetails.county,             
              OrganizationName1: record.siteName?.substring(0, 40)
            }]
          });
        }
      } else if (!shipToPartner) {
        // aErrors.push({
        //   record_ID: record.ID,
        //   message: `WE partner function not found for customer ${record.soldTo}`
        // });
      }
    } catch (error) {
      // aErrors.push({
      //   record_ID: record.ID,
      //   message: `Error checking ship to partner: ${error.message}`
      // });
    }

    // Z4 Partner (Owner)
    if (record.owner) {
      try {
        // Search for Z4 partner function in the business partner map
        const ownerPartner = Array.from(businessPartnerMap.entries())
          .find(([key, value]) => {
            const [customer, partnerFunction] = key.split('_');
            return partnerFunction === 'Z4' && customer === record.soldTo;
          })?.[1];

        if (ownerPartner) {
          const siteDetails = await SELECT.one.from('com.aleron.monitor.FGSiteCodeToAddressMapping')
            .where({
              siteCodeName: record.siteCode,
              customerNo:ownerPartner.Customer
            });

          if (siteDetails) {
            aPartnerFunctions.push({
              PartnerFunction: 'Z4',
              ContactPerson: ownerPartner.ContactPerson,
              to_Address: [{
                CorrespondenceLanguage: 'EN',
                StreetName: siteDetails.siteAddress1,
                CityName: siteDetails.city,
                Region: siteDetails.state,
                Country: siteDetails.country_code?.substring(0, 2),
                PostalCode: siteDetails.zipCode,
                TaxJurisdiction: siteDetails.taxJurCode,
                DistrictName: siteDetails.county,                
                OrganizationName1: record.managerName?.substring(0, 40),
                OrganizationName2: `WO OWNER ID ${record.ownerId}`
              }]
            });
          } else {
            aErrors.push({
              record_ID: record.ID,
              message: 'Site details not found for Z4 partner', process_code: sProcessCode
            });
          }
        } else {
          // aErrors.push({
          //   record_ID: record.ID,
          //   message: `Z4 partner function not found for customer ${record.soldTo}`
          // });
        }
      } catch (error) {
        // aErrors.push({
        //   record_ID: record.ID,
        //   message: `Error checking owner partner: ${error.message}`
        // });
      }
    }


    // ZF
     if (record.firstName) {
      try {
        // Search for ZF partner function in the business partner map
        const zfPartner = Array.from(businessPartnerMap.entries())
          .find(([key, value]) => {
            const [customer, partnerFunction] = key.split('_');
            return partnerFunction === 'ZF' && customer === record.soldTo;
          })?.[1];

        if (zfPartner) {
          const siteDetails = await SELECT.one.from('com.aleron.monitor.FGSiteCodeToAddressMapping')
            .where({
              siteCodeName: record.siteCode,
              customerNo:zfPartner.Customer
            });

          if (siteDetails) {            
            try {
              const zfPartnerData = {
                PartnerFunction: 'ZF',
                ContactPerson: zfPartner.ContactPerson,
                to_Address: [{
                  CorrespondenceLanguage: 'EN',
                  StreetName: siteDetails.siteAddress1 || '',
                  CityName: siteDetails.city || '',
                  Region: siteDetails.state || '',
                  Country: siteDetails.country_code ? siteDetails.country_code.substring(0, 2) : '',
                  PostalCode: siteDetails.zipCode || '',
                  TaxJurisdiction: siteDetails.taxJurCode || '',
                  DistrictName: siteDetails.county || '',
                  // Language: 'EN',
                  OrganizationName1: `${record.firstName || ''} ${record.lastName || ''}`.trim().substring(0, 40)
                }]
              };           
              
              aPartnerFunctions.push(zfPartnerData);
              
            } catch (pushError) {
              console.error('Error adding ZF partner:', pushError);
              aErrors.push({
                record_ID: record.ID,
                message: `Error adding ZF partner: ${pushError.message}`, process_code: sProcessCode
              });
            }
          } else {
            aErrors.push({
              record_ID: record.ID,
              message: 'Site details not found for ZF partner ', process_code: sProcessCode
            });
          }
        } else {
          // aErrors.push({
          //   record_ID: record.ID,,
          //   message: `ZF partner function not found for customer ${record.soldTo}`
          // });
        }
      } catch (error) {
        // aErrors.push({
        //   record_ID: record.ID,
        //   message: `Error checking owner partner: ${error.message}`
        // });
      }
    }

    return {
      to_Partner: aPartnerFunctions,
      errors: aErrors,
      hasError: aErrors.length > 0
    };
  }

  async updateSalesOrderWithIO(sProcessCode, bBreakExecution) {
    const aRecordsForProcessing = [];
    const aErrorLogs = [];
    const aFailedRecordIDs = [];
    const aPassedRecordIDs = [];
    const aSkippedRecords = [];

    // Step 1: Filter records that need processing
    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode) && record.salesDocumentNoSAP) {
        aRecordsForProcessing.push({ ...record });
      } else {
        aSkippedRecords.push({ ...record });
      }
    }

    this.updateProcessingState(sProcessCode);

    if (!aRecordsForProcessing.length) {
      return {
        hasError: false,
        continue: true,
      };
    }

    // Step 2: Process each record
    for (const record of aRecordsForProcessing) {
      try {
        // Check distribution channel
        const salesOrder = await this.salesOrderAPI.executeQuery(
          SELECT.one.from('SalesOrder')
            .columns(['SalesOrder', 'DistributionChannel'])
            .where({
              SalesOrder: record.salesDocumentNoSAP
            })
        );

        if (!salesOrder) {
          aErrorLogs.push({
            record_ID: record.ID,
            message: `Sales Order ${record.salesDocumentNoSAP} not found`, process_code: sProcessCode
          });
          aFailedRecordIDs.push(record.ID);
          continue;
        }

        // Only process if distribution channel is MS or IC
        if (salesOrder.DistributionChannel !== 'MS' && salesOrder.DistributionChannel !== 'IC') {
          aSkippedRecords.push(record);
          continue;
        }

        // Prepare update payload
        const updatePayload = {
          SalesOrder: record.salesDocumentNoSAP,
          to_Item: [{
            SalesOrderItem: record.salesItemNoSAP,
            OrderID: record.internalOrderNumber, // Internal order number
            PurchaseOrderByCustomer: record.purchaseDocumentNo,
            YY1_CommodityCode_SD_SDI: record.workOrderId
            // to_AdditionalData: [{   // Check
            //   Name: 'BAPE_VBAP',
            //   Value: {
            //     posnr: record.salesItemNoSAP,
            //     zz_ebeln: record.purchaseOrder,  // YY PO Num
            //     zzcomcode: record.workOrderId
            //   }
            // }],
            // to_AdditionalDataX: [{  // Check 
            //   Name: 'BAPE_VBAPX',
            //   Value: {
            //     posnr: record.salesItemNoSAP,
            //     zz_ebeln: 'X',
            //     zzcomcode: 'X'
            //   }
            // }]
          }]
        };

        // Call update API
        const updateResult = await this.salesOrderAPI.updateSalesOrder(updatePayload);

        if (updateResult.hasError) {
          aErrorLogs.push({
            record_ID: record.ID,
            message: `Failed to update Sales Order: ${updateResult.reason}`, process_code: sProcessCode
          });
          aFailedRecordIDs.push(record.ID);
        } else {
          aPassedRecordIDs.push(record.ID);
        }

      } catch (error) {
        aErrorLogs.push({
          record_ID: record.ID,
          message: `Error updating Sales Order: ${error.message}`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(record.ID);
      }
    }

    // Step 3: Update error logs and record status
    if (aErrorLogs.length) {
      await ProcessLogger.addLogs(aErrorLogs);
      await UPDATE(WorkOrders_FG)
        .set({ valid: false, processLevel_code: sProcessCode })
        .where({ ID: { in: aFailedRecordIDs } });
    }

    if (aPassedRecordIDs.length) {
      await ProcessLogger.removeLogs(aPassedRecordIDs);
      await UPDATE(WorkOrders_FG)
        .set({ valid: true, processLevel_code: sProcessCode })
        .where({ ID: { in: aPassedRecordIDs } });
    }

    // Step 4: Update exclusion set
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
        sc.CustomerPriceGroup
      sc._Item((scItem) => {
        scItem.SalesContract,
          scItem.SalesContractItem,
          scItem.Product
      })
    })
      .where({ SalesContract: { in: [...new Set(aSalesContractWhere)] } })
  }

  async createPurchaseOrder(sProcessCode, bBreakExecution) {
    const aRecordsForProcessing = [];
    const aErrorLogs = [];
    const aFailedRecordIDs = [];
    const aPassedRecordIDs = [];
    const aSkippedRecords = [];

    // Step 1: Filter records that need processing
    for (const record of this.records) {
      if (this.shouldRecordProcess(record, sProcessCode) && record.salesDocumentNoSAP) {
        aRecordsForProcessing.push({ ...record });
      } else {
        aSkippedRecords.push({ ...record });
      }
    }

    this.updateProcessingState(sProcessCode);

    if (!aRecordsForProcessing.length) {
      return {
        hasError: false,
        continue: true,
      };
    }

    // Step 2: Process each record
    for (const record of aRecordsForProcessing) {
      try {
        // Get SO header details
        const salesOrder = await this.salesOrderAPI.executeQuery(
          SELECT.one.from('SalesOrder')
            .columns(['SalesOrder', 'SalesOrderType', 'SalesOrganization', 'DistributionChannel', 'Currency'])
            .where({
              SalesOrder: record.salesDocumentNoSAP
            })
        );

        if (!salesOrder) {
          aErrorLogs.push({
            record_ID: record.ID,
            message: `Sales Order ${record.salesDocumentNoSAP} not found`, process_code: sProcessCode
          });
          aFailedRecordIDs.push(record.ID);
          continue;
        }

        // Check for ZV partner function
        const zvPartner = await this.salesOrderAPI.executeQuery(
          SELECT.one.from('A_SalesOrderPartner')
            .columns(['SalesOrder', 'PartnerFunction', 'Customer'])
            .where({
              SalesOrder: record.salesDocumentNoSAP,
              PartnerFunction: 'ZV'
            })
        );

        if (zvPartner) {
          // ZV partner exists, skip PO creation
          aSkippedRecords.push(record);
          continue;
        }

        // Get ZR partner function
        const zrPartner = await this.salesOrderAPI.executeQuery(
          SELECT.one.from('A_SalesOrderPartner')
            .columns(['SalesOrder', 'PartnerFunction', 'Customer'])
            .where({
              SalesOrder: record.salesDocumentNoSAP,
              PartnerFunction: 'ZR'
            })
        );

        if (!zrPartner) {
          aErrorLogs.push({
            record_ID: record.ID,
            message: 'ZR partner function not found in sales order', process_code: sProcessCode
          });
          aFailedRecordIDs.push(record.ID);
          continue;
        }

        // Get vendor from partner function table
        const vendorPartner = await this.businesPartnerAPI.executeQuery(
          SELECT.one.from('A_CustSalesPartnerFunc')
            .columns(['Customer', 'PartnerFunction', 'BPCustomerNumber'])
            .where({
              Customer: zrPartner.Customer,
              SalesOrganization: salesOrder.SalesOrganization,
              PartnerFunction: 'ZR'
            })
        );

        if (!vendorPartner) {
          aErrorLogs.push({
            record_ID: record.ID,
            message: 'Vendor not found in partner function table', process_code: sProcessCode
          });
          aFailedRecordIDs.push(record.ID);
          continue;
        }

        // Get payment terms
        let paymentTerms = null;
        try {
          // First try ZSD_LIFNR_ZTERM table
          const ztermResult = await SELECT.one.from('com.aleron.monitor.PaymentTerms')
            .where({
              customerNo: record.soldTo,
              supplierNo: vendorPartner.BPCustomerNumber
            });

          if (ztermResult) {
            paymentTerms = ztermResult.vendorTerm;
          } else {
            // Try LFM1 table
            const lfm1Result = await this.businesPartnerAPI.executeQuery(
              SELECT.one.from('A_SupplierPurchasingOrg')
                .columns(['Supplier', 'PaymentTerms'])
                .where({
                  Supplier: vendorPartner.BPCustomerNumber,
                  PurchasingOrganization: salesOrder.SalesOrganization
                })
            );
            if (lfm1Result) {
              paymentTerms = lfm1Result.PaymentTerms;
            }
          }
        } catch (error) {
          this.LOG._error && this.LOG.error(`Error getting payment terms: ${error.message}`);
        }

        // Prepare PO header
        const poHeader = {
          PurchaseOrderType: salesOrder.SalesOrderType === 'ZWMS' ? 'ZMS' : 'ZNB',
          PurchaseOrderSubtype: '',
          PurchasingDocumentProcessCode: '',
          PurchaseOrderDate: moment().format('YYYY-MM-DD'),
          Language: 'EN',
          PurchaseOrderDeletionCode: '',
          ReleaseIsNotCompleted: false,
          PurchasingCompletenessStatus: false,
          PurchasingProcessingStatus: '02',
          CompanyCode: salesOrder.SalesOrganization,
          PurchasingOrganization: salesOrder.SalesOrganization,
          PurchasingGroup: salesOrder.DistributionChannel,
          Currency: salesOrder.Currency,
          ExchangeRate: '1',
          CreationDate: moment().format('YYYY-MM-DD'),
          CreatedBy: this.user,
          Status: 'X',
          DocumentType: salesOrder.SalesOrderType === 'ZWMS' ? 'ZMS' : 'ZNB',
          Supplier: vendorPartner.BPCustomerNumber,
          ManualSupplierAddressID: '',
          SupplierAddressID: '',
          SupplierRespSalesPersonName: '',
          SupplierPhoneNumber: '',
          SupplyingSupplier: '',
          SupplyingPlant: '',
          InvoicingParty: vendorPartner.BPCustomerNumber,
          Customer: '',
          PurchaseContract: '',
          SupplierQuotationExternalID: '',
          QuotationSubmissionDate: null,
          ItemNumberIntervalForSubItems: '1'
        };

        // Add payment terms if found
        if (paymentTerms) {
          poHeader.PaymentTerms = paymentTerms;
        }

        // Prepare partner functions
        const poPartners = [];

        // Add ZR partner
        poPartners.push({
          PartnerFunction: 'ZR',
          Language: 'EN',
          BusinessPartner: vendorPartner.BPCustomerNumber
        });

        // Add PI partner
        poPartners.push({
          PartnerFunction: 'PI',
          Language: 'EN',
          BusinessPartner: vendorPartner.BPCustomerNumber
        });

        // Add Z3 partner with employee
        try {
          const defaultEmployee = await SELECT.one.from('com.aleron.monitor.ZSCON_Z3_EMPLOYEE')
            .where({
              employeeNumber: '11016895' // Default employee number
            });

          if (defaultEmployee) {
            poPartners.push({
              PartnerFunction: 'Z3',
              Language: 'EN',
              BusinessPartner: defaultEmployee.employeeNumber
            });
          }
        } catch (error) {
          this.LOG._error && this.LOG.error(`Error getting default employee: ${error.message}`);
        }

        // // Prepare final payload
        // const poPayload = {
        //   ...poHeader,
        //   to_Partner: poPartners
        // };

        // Prepare final payload
        const Payload = {
          ...poHeader,
          to_Partner: poPartners,
          _PurchaseOrderItem: [{
            PurchaseOrderItem: "10",
            PurchaseOrderCategory: "F",
            DocumentCurrency: record.currency_code || "USD",
            Material: "100000416",
            CompanyCode: "1200",
            Plant: "1200",
            PurchaseOrderQuantityUnit: "LAB",
            OrderItemQtyToBaseQtyNmrtr: 1,
            OrderItemQtyToBaseQtyDnmntr: 1,
            NetPriceQuantity: 1,
            BaseUnit: "LAB",
            PurchaseOrderItemCategory: "0",
            OrderPriceUnit: "LAB",
            ItemWeightUnit: "KG",
            PriceIsToBePrinted: true,
            AccountAssignmentCategory: "P",
            NetAmount: 10,
            GrossAmount: 10,
            OrderQuantity: 1,
            NetPriceAmount: 10,
            OrderPriceUnitToOrderUnitNmrtr: 1,
            OrdPriceUnitToOrderUnitDnmntr: 1,
            TaxCode: "I0",
            TaxJurisdiction: "4503132560",
            TaxCountry: "",
            TaxDeterminationDate: null,
            ShippingInstruction: "",
            NonDeductibleInputTaxAmount: 0,
            YY1_SupplierInvoiceNum_PDI: "",
            YY1_SDDocument_PDI: null,
            YY1_CommodityCode_PDI: "",
            YY1_DuplicateWeek_PDI: "",
            YY1_LegacyPurchaseOrde_PDI: "",
            YY1_CategoryCode_PDI: "",
            YY1_WNWorkOrder_PDI: "",
            YY1_WeekEnd_PDI: null,
            YY1_CostCenter_PDI: "",
            _PurOrdAccountAssignment: [{
              PurchaseOrderItem: "10",
              AccountAssignmentNumber: "1",
              GLAccount: "615115",
              ControllingArea: "A000",
              WBSElementExternalID: "900000520"
            }]
          }]
        };

        // Call PO creation API
        const poResult = await this.purchaseOrderAPI.createPurchaseOrder(Payload);

        if (poResult.hasError) {
          aErrorLogs.push({
            record_ID: record.ID,
            message: `Failed to create Purchase Order: ${poResult.reason}`, process_code: sProcessCode
          });
          aFailedRecordIDs.push(record.ID);
        } else {
          // Update record with created PO number
          record.purchaseOrder = poResult.value.PurchaseOrder;

          // Update purchaseDocumentNo in WorkOrders_FG entity
          try {
            await UPDATE('com.aleron.monitor.WorkOrders_FG')
              .set({
                purchaseDocumentNo: poResult.value.PurchaseOrder
                // valid: true,
                // processLevel_code: sProcessCode
              })
              .where({ ID: record.ID });

            aPassedRecordIDs.push(record.ID);
          } catch (updateError) {
            aErrorLogs.push({
              record_ID: record.ID,
              message: `Failed to update purchaseDocumentNo: ${updateError.message}`, process_code: sProcessCode
            });
            aFailedRecordIDs.push(record.ID);
          }
          aPassedRecordIDs.push(record.ID);
        }

      } catch (error) {
        aErrorLogs.push({
          record_ID: record.ID,
          message: `Error creating Purchase Order: ${error.message}`, process_code: sProcessCode
        });
        aFailedRecordIDs.push(record.ID);
      }
    }

    // Step 3: Update error logs and record status
    if (aErrorLogs.length) {
      await ProcessLogger.addLogs(aErrorLogs);
      await UPDATE(WorkOrders_FG)
        .set({ valid: false, processLevel_code: sProcessCode })
        .where({ ID: { in: aFailedRecordIDs } });
    }

    if (aPassedRecordIDs.length) {
      await ProcessLogger.removeLogs(aPassedRecordIDs);
      await UPDATE(WorkOrders_FG)
        .set({ valid: true, processLevel_code: sProcessCode })
        .where({ ID: { in: aPassedRecordIDs } });
    }

    // Step 4: Update exclusion set
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

  // async _prepareVCData(records, mPayloadMap, aPassedRecordIDs, aFailedRecordIDs, aErrorLogs) {

  //   const SalesVCData_1 = new SalesVCData_1Comm();
  //   const SalesVCData_2 = new SalesVCData_2Comm();

  //   // 1. filtering the records based on the not failed records ids.
  //   // 2. generating payload for both VCData1 & VCData2 based on the salesorder for that record id.
  //   let aPayloadsSalesVCData = records
  //     .filter((record) => !aFailedRecordIDs.includes(record.ID))
  //     .map((record) => {
  //       const oMapEntry = mPayloadMap.get(record.ID);
  //       if (oMapEntry && oMapEntry.salesOrder) {

  //         // const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID);

  //         // const VC1Fields = ['YY6_SC_LINE_ITEM_NUMBER', 'YY3_ACA_HRS_PRICE', 'YY118_MARK_UP_RG', 'YY119_MARK_UP_OT', 'YY120_MARK_UP_DB'];

  //         // const oCustFieldResult = aCustomerfieldEntry.reduce((acc, entry) => {
  //         //   if (VC1Fields.includes(entry.fieldName)) {
  //         //     acc.VC1Fields[entry.fieldName] = entry.customerFieldValue;
  //         //   }else{
  //         //     acc.VC2Fields[entry.fieldName] = entry.customerFieldValue;
  //         //   }
  //         //   return acc;
  //         // }, 
  //         // {VC1Fields: {}, VC2Fields: {}});


  //         let shift = 1;
  //         const salesVC1 = {
  //           SalesOrderNumber: oMapEntry.salesOrder,
  //           SalesOrderItemNum: '10',
  //           YY12_DAY1_SHIFT1_RG: '1',
  //           YY13_DAY1_SHIFT1_OT: '1',
  //           YY14_DAY1_SHIFT1_DB: '1',
  //           YY15_DAY1_SHIFT2_RG: '1',
  //           YY16_DAY1_SHIFT2_OT: '1',
  //           YY17_DAY1_SHIFT2_DB: '1',
  //           YY18_DAY1_SHIFT3_RG: '1',
  //           YY19_DAY1_SHIFT3_OT: '1',
  //           YY20_DAY1_SHIFT3_DB: '1',
  //           YY100_SHIFT1_TOTAL_HRS_RG: "1",
  //           YY101_SHIFT1_TOTAL_HRS_OT: "1",
  //           YY102_SHIFT1_TOTAL_HRS_DB: "1",
  //           YY103_SHIFT2_TOTAL_HRS_RG: "1",
  //           YY104_SHIFT2_TOTAL_HRS_OT: "1",
  //           YY105_SHIFT2_TOTAL_HRS_DB: "1",
  //           YY106_SHIFT3_TOTAL_HRS_RG: "1",
  //           YY107_SHIFT3_TOTAL_HRS_OT: "1",
  //           YY108_SHIFT3_TOTAL_HRS_DB: "1",
  //           YY109_SHIFT1_PRICE_RG: "1",
  //           YY110_SHIFT1_PRICE_OT: "1",
  //           YY121_SHIFT1_TOTAL_PRICE_RG: '0',
  //           YY122_SHIFT1_TOTAL_PRICE_OT: '0',
  //           YY123_SHIFT1_TOTAL_PRICE_DB: '0',
  //           YY124_SHIFT2_TOTAL_PRICE_RG: '0',
  //           YY125_SHIFT2_TOTAL_PRICE_OT: '0',
  //           YY126_SHIFT2_TOTAL_PRICE_DB: '0',
  //           YY127_SHIFT3_TOTAL_PAY_RG: '0',
  //           YY128_SHIFT3_TOTAL_PAY_OT: '0',
  //           YY129_SHIFT3_TOTAL_PAY_DB: '0',
  //           // YY247_ZSD_WN_WORK_ORDER_VCSD: "1",
  //           // YY250_CUST_COST_CENTER2: "1",
  //           // ...(oCustFieldResult.VC1Fields || {}),
  //         };
  //         const salesVC2 = {
  //           Sales_Order_Number: oMapEntry.salesOrder,
  //           Sales_Order_Item_Num: '10',
  //           // YY135_DAILY_TOTAL_VENDOR: '',
  //           YY137_HOLIDAY_TOTAL_VENDOR: 0,
  //           YY251_SHIFT1_PAY_RATE_RG: '1',
  //           YY252_SHIFT1_PAY_RATE_OT: '1',
  //           YY253_SHIFT1_PAY_RATE_DB: '1',
  //           YY254_SHIFT2_PAY_RATE_RG: '1',
  //           YY255_SHIFT2_PAY_RATE_OT: '1',
  //           YY256_SHIFT2_PAY_RATE_DB: '1',
  //           // YY247_ZSD_WN_WORK_ORDER_VCSD: "1",
  //           // YY250_CUST_COST_CENTER2: "1",
  //           // ...(oCustFieldResult.VC2Fields || {}),
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



  // // Prepare VC Data Payload and insert it (interface variant w/ minimal base mapping)
  // async _prepareVCData(records, mPayloadMap, aPassedRecordIDs, aFailedRecordIDs, aErrorLogs) {
  //   const SalesVCData_1 = new SalesVCData_1Comm();
  //   const SalesVCData_2 = new SalesVCData_2Comm();

  //   // Optional 6th argument compat: mCustomerFieldNameValue (Map<recordID, [{customerFieldName, fieldName, customerFieldValue}, ...]>)
  //   // If not provided, we default to an empty Map (no custom fields applied).
  //   const mCustomerFieldNameValue =
  //     (arguments && arguments.length > 5 && arguments[5] instanceof Map)
  //       ? arguments[5]
  //       : (this && this.mCustomerFieldNameValue instanceof Map ? this.mCustomerFieldNameValue : new Map());

  //   // --- Z -> target mapping from your HANA table (same as other interface) -----
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
  //     // Z13..Z15: no mapped YY
  //     Z16: 'YY228_CUST_ORG_CODE',
  //     Z17: 'YY229_CUST_LEGAL_ENTITY',
  //     Z18: 'YY230_CUST_ORACLE_NUMBER',
  //     Z19: 'YY231_CUST_UNIT_STORE_NUMBER',
  //     // Z20..Z23: no mapped YY
  //     Z24: 'YY233_CUST_EMPLOYEE_NUMBER',
  //     Z25: 'YY234_CUST_AGREE_NUMBER',
  //     Z26: 'YY241_CUST_BGRD_CHECK_DATE',
  //     Z27: 'YY242_CUST_DIV_UNIT_NUMBER',
  //     Z28: 'YY236_CUST_FEPS_CODE',
  //     Z29: 'YY237_CUST_POSITION',
  //     // Z30: no mapped YY
  //     Z31: 'YY235_CUST_TASK15',
  //     Z32: 'YY238_CUST_GL_CODE',
  //     Z33: 'YY240_CUST_BB_NUMBER',
  //     Z34: 'YY218_CUST_PROJECT_NUMBER',
  //     Z35: 'YY239_CUST_PURCHASE_AGREE',
  //     // Z36: no mapped YY
  //     Z37: 'YY237_CUST_POSITION',
  //     // Z38: no mapped YY
  //     Z39: 'CUST_CATERGORY_CODE2',       // non-YY, VC2
  //     Z40: 'YY6_SC_LINE_ITEM_NUMBER',   // VC1
  //     // Z41: no mapped YY
  //     Z42: 'ACCELERATED_FEE_DISC_VEN',  // non-YY, VC2
  //     Z43: 'YY3_ACA_HRS_PRICE',         // VC1
  //     Z44: 'YY118_MARK_UP_RG',          // VC1
  //     Z45: 'YY119_MARK_UP_OT',          // VC1
  //     Z46: 'YY120_MARK_UP_DB'           // VC1
  //   });

  //   // VC1 vs VC2 property guards (from EDMX)
  //   const VC1_PROPS = new Set([
  //     'YY3_ACA_HRS_PRICE',
  //     'YY6_SC_LINE_ITEM_NUMBER',
  //     'YY12_DAY1_SHIFT1_RG','YY13_DAY1_SHIFT1_OT','YY14_DAY1_SHIFT1_DB',
  //     'YY15_DAY1_SHIFT2_RG','YY16_DAY1_SHIFT2_OT','YY17_DAY1_SHIFT2_DB',
  //     'YY18_DAY1_SHIFT3_RG','YY19_DAY1_SHIFT3_OT','YY20_DAY1_SHIFT3_DB',
  //     'YY100_SHIFT1_TOTAL_HRS_RG','YY101_SHIFT1_TOTAL_HRS_OT','YY102_SHIFT1_TOTAL_HRS_DB',
  //     'YY103_SHIFT2_TOTAL_HRS_RG','YY104_SHIFT2_TOTAL_HRS_OT','YY105_SHIFT2_TOTAL_HRS_DB',
  //     'YY106_SHIFT3_TOTAL_HRS_RG','YY107_SHIFT3_TOTAL_HRS_OT','YY108_SHIFT3_TOTAL_HRS_DB',
  //     'YY109_SHIFT1_PRICE_RG','YY110_SHIFT1_PRICE_OT',
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
  //     'YY254_SHIFT2_PAY_RATE_RG','YY255_SHIFT2_PAY_RATE_OT','YY256_SHIFT2_PAY_RATE_DB'
  //     // (This interface’s base mapping uses rates 251..256 only.)
  //     ,
  //     // non-YY backed custom props that still belong to VC2:
  //     'ACCELERATED_FEE_DISC_VEN','CUST_CATERGORY_CODE2'
  //   ]);

  //   // 1) Filter not-failed; 2) Build payloads
  //   let aPayloadsSalesVCData = records
  //     .filter((record) => !aFailedRecordIDs.includes(record.ID))
  //     .map((record) => {
  //       const oMapEntry = mPayloadMap.get(record.ID);
  //       if (!(oMapEntry && oMapEntry.salesOrder)) return [];

  //       // --- build custom field maps from mCustomerFieldNameValue (if available) ---
  //       const aCustomerfieldEntry = mCustomerFieldNameValue.get(record.ID) || [];
  //       const oCustFieldResult = aCustomerfieldEntry.reduce(
  //         (acc, entry) => {
  //           const z = (entry.customerFieldName || '').trim();
  //           const target = Z_MAP[z];
  //           if (!target) return acc; // ignore Z with no configured target

  //           if (VC1_PROPS.has(target)) {
  //             acc.VC1Fields[target] = entry.customerFieldValue;
  //           } else if (VC2_PROPS.has(target)) {
  //             acc.VC2Fields[target] = entry.customerFieldValue;
  //           } else {
  //             // fallback to VC2 if property unknown (most Z → VC2)
  //             acc.VC2Fields[target] = entry.customerFieldValue;
  //           }
  //           return acc;
  //         },
  //         { VC1Fields: {}, VC2Fields: {} }
  //       );

  //       // ---- base mapping ----
  //       let shift = 1;

  //       const salesVC1 = {
  //         SalesOrderNumber: oMapEntry.salesOrder,
  //         SalesOrderItemNum: '10',
  //         YY12_DAY1_SHIFT1_RG: '1',
  //         YY13_DAY1_SHIFT1_OT: '1',
  //         YY14_DAY1_SHIFT1_DB: '1',
  //         YY15_DAY1_SHIFT2_RG: '1',
  //         YY16_DAY1_SHIFT2_OT: '1',
  //         YY17_DAY1_SHIFT2_DB: '1',
  //         YY18_DAY1_SHIFT3_RG: '1',
  //         YY19_DAY1_SHIFT3_OT: '1',
  //         YY20_DAY1_SHIFT3_DB: '1',
  //         YY100_SHIFT1_TOTAL_HRS_RG: '1',
  //         YY101_SHIFT1_TOTAL_HRS_OT: '1',
  //         YY102_SHIFT1_TOTAL_HRS_DB: '1',
  //         YY103_SHIFT2_TOTAL_HRS_RG: '1',
  //         YY104_SHIFT2_TOTAL_HRS_OT: '1',
  //         YY105_SHIFT2_TOTAL_HRS_DB: '1',
  //         YY106_SHIFT3_TOTAL_HRS_RG: '1',
  //         YY107_SHIFT3_TOTAL_HRS_OT: '1',
  //         YY108_SHIFT3_TOTAL_HRS_DB: '1',
  //         YY109_SHIFT1_PRICE_RG: '1',
  //         YY110_SHIFT1_PRICE_OT: '1',
  //         YY121_SHIFT1_TOTAL_PRICE_RG: '0',
  //         YY122_SHIFT1_TOTAL_PRICE_OT: '0',
  //         YY123_SHIFT1_TOTAL_PRICE_DB: '0',
  //         YY124_SHIFT2_TOTAL_PRICE_RG: '0',
  //         YY125_SHIFT2_TOTAL_PRICE_OT: '0',
  //         YY126_SHIFT2_TOTAL_PRICE_DB: '0',
  //         YY127_SHIFT3_TOTAL_PAY_RG: '0',
  //         YY128_SHIFT3_TOTAL_PAY_OT: '0',
  //         YY129_SHIFT3_TOTAL_PAY_DB: '0',
  //         ...(oCustFieldResult.VC1Fields || {}),
  //       };

  //       const salesVC2 = {
  //         Sales_Order_Number: oMapEntry.salesOrder,
  //         Sales_Order_Item_Num: '10',
  //         YY137_HOLIDAY_TOTAL_VENDOR: 0,
  //         YY251_SHIFT1_PAY_RATE_RG: '1',
  //         YY252_SHIFT1_PAY_RATE_OT: '1',
  //         YY253_SHIFT1_PAY_RATE_DB: '1',
  //         YY254_SHIFT2_PAY_RATE_RG: '1',
  //         YY255_SHIFT2_PAY_RATE_OT: '1',
  //         YY256_SHIFT2_PAY_RATE_DB: '1',
  //         ...(oCustFieldResult.VC2Fields || {}),
  //       };

  //       // readable debug log of constructed payloads
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
  //     });

  //   for (let i = 0; i < aPayloadsSalesVCData.length; i++) {
  //     let insertedSalesVCData1, insertedSalesVCData2;

  //     const recID = aPayloadsSalesVCData[i][2];
  //     const hasVC1Already = !!aPayloadsSalesVCData[i][3];
  //     const hasVC2Already = !!aPayloadsSalesVCData[i][4];

  //     const vc1Payload = aPayloadsSalesVCData[i][0];
  //     const vc2Payload = aPayloadsSalesVCData[i][1];

  //     // pre-insert log
  //     try {
  //       LOG.info(
  //         `[VC] PRE-INSERT for record ${recID}`,
  //         {
  //           recID,
  //           hasVC1Already,
  //           hasVC2Already,
  //           vc1Payload: vc1Payload?JSON.stringify(vc1Payload, null, 2): 'undefined',
  //           vc2Payload: vc2Payload?JSON.stringify(vc2Payload, null, 2): 'undefined'
  //         }
  //       );
  //     } catch (e) {}

  //     if (!vc1Payload && !vc2Payload) {
  //       LOG.warn(`[VC] Skipping record ${recID} - both VC1 and VC2 payloads are undefined`);
  //       continue;
  //     }

  //     // keep call pattern as-is
  //     if (!aPayloadsSalesVCData[i][3] && vc1Payload) {
  //       insertedSalesVCData1 = await SalesVCData_1.executeQuery(
  //         INSERT.into('YY1_SALESVCDATA_1').entries(vc1Payload),
  //       );
  //     }
  //     if (!aPayloadsSalesVCData[i][4] && vc2Payload) {
  //       insertedSalesVCData2 = await SalesVCData_2.executeQuery(
  //         INSERT.into('YY1_SALESVCDATA_2').entries(vc2Payload),
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

  /**
 * WHAT CHANGED (aligned with Interface T):
 * 1) Z_MAP now includes VC routing: { target, vc } so Z fields deterministically land in VC1/VC2.
 * 2) Added helpers:
 *    - fmtDecimal(), fmtDateISO(), validateFormats(), toEmployeeType()
 * 3) Shift logic standardized:
 *    - shift = 1 only for Hourly; 0 for Salary/Daily (prevents inflated totals for non-hourly).
 * 4) VC2 built from record first, then Z overrides:
 *    - YY144_WEEKLY_CLOCK_FEE takes base from record.custWkTimeFee; Z08 overrides if present.
 * 5) Per-record validation (no hard stop): collect errors in aErrorLogs/aFailedRecordIDs.
 * 6) UUID-respecting inserts + mapping back SAP_UUID on success, try/catch around each insert.
 *
 * WHAT STAYS THE SAME:
 * - Your optional 6th argument fallback for mCustomerFieldNameValue is preserved.
 * - Your minimal base mapping style (VC1 constants, VC2 251..256 set) is preserved, just normalized.
 * - PRE/POST insert logs and payload echoing remain.
 * - Same communicators and INSERT targets (YY1_SALESVCDATA_1 / _2).
 */

async _prepareVCData(records, mPayloadMap, aPassedRecordIDs, aFailedRecordIDs, aErrorLogs) {
  const LOG = this.LOG || console;
  const moment = require('moment');

  if (!aPassedRecordIDs || aPassedRecordIDs.length === 0) {
    LOG.info('[VC] No passed records to process VC Data. Skipping VC Data preparation.');
    return;
  }

  // // Early return if no payload mapping
  // if (!mPayloadMap || mPayloadMap.size === 0) {
  //   LOG.info('[VC] No payload mapping available. Skipping VC Data preparation.');
  //   return;
  // }

  const SalesVCData_1 = new SalesVCData_1Comm();
  const SalesVCData_2 = new SalesVCData_2Comm();

  // Optional 6th argument compat: Map<recordID, [{customerFieldName, fieldName, customerFieldValue}, ...]>
  const mCustomerFieldNameValue =
    (arguments && arguments.length > 5 && arguments[5] instanceof Map)
      ? arguments[5]
      : (this && this.mCustomerFieldNameValue instanceof Map ? this.mCustomerFieldNameValue : new Map());

  const mEmployeeType = { Salary: 'SAL', Daily: 'DAY', Hourly: 'HOU' };

  // ---- Z-code mapping with VC routing (same targets you listed) ----
  /** @type {Record<string,{target:string, vc:1|2}|undefined>} */
  const Z_MAP = Object.freeze({
    Z01:{target:'YY216_CUST_BUSINESS_UNIT',vc:2},
    Z02:{target:'YY217_CUST_CHARGE_NUMBER',vc:2},
    Z03:{target:'YY250_CUST_COST_CENTER2',vc:2},
    Z04:{target:'YY220_CUST_COMPANY_CODE',vc:2},
    Z05:{target:'YY221_CUST_DEPT_NUMBER',vc:2},
    Z06:{target:'YY222_CUST_DOTS_NUMBER',vc:2},
    Z07:{target:'YY223_CUST_RUI',vc:2},
    Z08:{target:'YY144_WEEKLY_CLOCK_FEE',vc:2},          // override base if present
    Z09:{target:'YY224_CUST_ACCT_NUMBER',vc:2},
    Z10:{target:'YY225_CUST_BUDGET_CENTER',vc:2},
    Z11:{target:'YY226_CUST_CON_NUMBER',vc:2},
    Z12:{target:'YY227_CUST_VENDOR_NUMBER',vc:2},
    // Z13..Z15: ignore
    Z16:{target:'YY228_CUST_ORG_CODE',vc:2},
    Z17:{target:'YY229_CUST_LEGAL_ENTITY',vc:2},
    Z18:{target:'YY230_CUST_ORACLE_NUMBER',vc:2},
    Z19:{target:'YY231_CUST_UNIT_STORE_NUMBER',vc:2},
    // Z20..Z23: ignore
    Z24:{target:'YY233_CUST_EMPLOYEE_NUMBER',vc:2},
    Z25:{target:'YY234_CUST_AGREE_NUMBER',vc:2},
    Z26:{target:'YY241_CUST_BGRD_CHECK_DATE',vc:2},
    Z27:{target:'YY242_CUST_DIV_UNIT_NUMBER',vc:2},
    Z28:{target:'YY236_CUST_FEPS_CODE',vc:2},
    Z29:{target:'YY237_CUST_POSITION',vc:2},
    // Z30: ignore
    Z31:{target:'YY235_CUST_TASK15',vc:2},
    Z32:{target:'YY238_CUST_GL_CODE',vc:2},
    Z33:{target:'YY240_CUST_BB_NUMBER',vc:2},
    Z34:{target:'YY218_CUST_PROJECT_NUMBER',vc:2},
    Z35:{target:'YY239_CUST_PURCHASE_AGREE',vc:2},
    // Z36: ignore
    Z37:{target:'YY237_CUST_POSITION',vc:2},
    // Z38: ignore
    Z39:{target:'CUST_CATERGORY_CODE2',vc:2},             // non-YY VC2
    Z40:{target:'YY6_SC_LINE_ITEM_NUMBER',vc:1},          // VC1
    // Z41: ignore
    Z42:{target:'ACCELERATED_FEE_DISC_VEN',vc:2},         // non-YY VC2
    Z43:{target:'YY3_ACA_HRS_PRICE',vc:1},                // VC1
    Z44:{target:'YY118_MARK_UP_RG',vc:1},
    Z45:{target:'YY119_MARK_UP_OT',vc:1},
    Z46:{target:'YY120_MARK_UP_DB',vc:1},
    Z30:{target:'SUPPLIER_INVOICE_NUMBER',vc:2}, // SUPPLIER'S INVOICE (SUBCON SCENARIO)
Z36:{target:'YY232_CUST_SVC_DATE',vc:2}, 
  });

  // ---- Validation sets (limited to fields used by this interface + safe extras) ----
  const DECIMAL_VC1 = new Set([
    'YY3_ACA_HRS_PRICE','YY12_DAY1_SHIFT1_RG','YY13_DAY1_SHIFT1_OT','YY14_DAY1_SHIFT1_DB',
    'YY15_DAY1_SHIFT2_RG','YY16_DAY1_SHIFT2_OT','YY17_DAY1_SHIFT2_DB','YY18_DAY1_SHIFT3_RG',
    'YY19_DAY1_SHIFT3_OT','YY20_DAY1_SHIFT3_DB','YY100_SHIFT1_TOTAL_HRS_RG','YY101_SHIFT1_TOTAL_HRS_OT',
    'YY102_SHIFT1_TOTAL_HRS_DB','YY103_SHIFT2_TOTAL_HRS_RG','YY104_SHIFT2_TOTAL_HRS_OT',
    'YY105_SHIFT2_TOTAL_HRS_DB','YY106_SHIFT3_TOTAL_HRS_RG','YY107_SHIFT3_TOTAL_HRS_OT',
    'YY108_SHIFT3_TOTAL_HRS_DB','YY109_SHIFT1_PRICE_RG','YY110_SHIFT1_PRICE_OT',
    'YY121_SHIFT1_TOTAL_PRICE_RG','YY122_SHIFT1_TOTAL_PRICE_OT','YY123_SHIFT1_TOTAL_PRICE_DB',
    'YY124_SHIFT2_TOTAL_PRICE_RG','YY125_SHIFT2_TOTAL_PRICE_OT','YY126_SHIFT2_TOTAL_PRICE_DB',
    'YY127_SHIFT3_TOTAL_PAY_RG','YY128_SHIFT3_TOTAL_PAY_OT','YY129_SHIFT3_TOTAL_PAY_DB',
    'YY118_MARK_UP_RG','YY119_MARK_UP_OT','YY120_MARK_UP_DB'
  ]);
  const DATE_VC1 = new Set(['YY8_WEEK_ENDING2']); // not used in this minimal base, but allowed if provided via Z or later

  const DECIMAL_VC2 = new Set([
    'YY134_DAILY_PAY_VENDOR','YY142_SALARY_PAY_VENDOR','YY144_WEEKLY_CLOCK_FEE',
    'YY150_DAILY_PAY_DAYS','YY151_DAILY_PRICE','YY152_DAILY_TOTAL_RATE','YY203_SALARY',
    'YY251_SHIFT1_PAY_RATE_RG','YY252_SHIFT1_PAY_RATE_OT','YY253_SHIFT1_PAY_RATE_DB',
    'YY254_SHIFT2_PAY_RATE_RG','YY255_SHIFT2_PAY_RATE_OT','YY256_SHIFT2_PAY_RATE_DB',
    'YY260_SHIFT1_TOTAL_PAY_RG','YY261_SHIFT1_TOTAL_PAY_OT','YY262_SHIFT1_TOTAL_PAY_DB',
    'YY263_SHIFT2_TOTAL_PAY_RG','YY264_SHIFT2_TOTAL_PAY_OT','YY265_SHIFT2_TOTAL_PAY_DB',
    'YY266_SHIFT3_TOTAL_PAY_RG','YY267_SHIFT3_TOTAL_PAY_OT','YY268_SHIFT3_TOTAL_PAY_DB',
    'YY135_DAILY_TOTAL_VENDOR','YY137_HOLIDAY_TOTAL_VENDOR'
  ]);
  const DATE_VC2 = new Set(['YY241_CUST_BGRD_CHECK_DATE','YY232_CUST_SVC_DATE']);

  // ---- Helpers (same as Interface T) ----
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
      const oMapEntry = mPayloadMap.get(record.ID);
      if (!(oMapEntry && oMapEntry.salesOrder)) return null;

      // Employee type + shift (T logic)
      const employeeType = toEmployeeType(record.employeeSubgroup);
      const shift = employeeType === mEmployeeType.Hourly ? 1 : 0.0;

      // Build custom field maps from Z codes (normalize on the way in)
      const cf = mCustomerFieldNameValue.get(record.ID) || [];
      const VC1Fields = {};
      const VC2Fields = {};
      for (const entry of cf) {
        const z = (entry.customerFieldName || '').trim();
        const cfg = Z_MAP[z];
        if (!cfg || !cfg.target) continue;

        const key = cfg.target;
        let value = entry.customerFieldValue;

        if (DATE_VC2.has(key)) value = fmtDateISO(value);
        if (DECIMAL_VC2.has(key)) value = fmtDecimal(value);

        if (cfg.vc === 1) VC1Fields[key] = value;
        else VC2Fields[key] = value;
      }

      // ---- minimal VC1 base mapping (kept), normalized to decimals ----
      const salesVC1 = {
        SalesOrderNumber: String(oMapEntry.salesOrder),
        SalesOrderItemNum: '10',

        // Hours/quantities: keep your “1” constants but normalize
        YY12_DAY1_SHIFT1_RG: fmtDecimal(1),
        YY13_DAY1_SHIFT1_OT: fmtDecimal(1),
        YY14_DAY1_SHIFT1_DB: fmtDecimal(1),
        YY15_DAY1_SHIFT2_RG: fmtDecimal(1),
        YY16_DAY1_SHIFT2_OT: fmtDecimal(1),
        YY17_DAY1_SHIFT2_DB: fmtDecimal(1),
        YY18_DAY1_SHIFT3_RG: fmtDecimal(1),
        YY19_DAY1_SHIFT3_OT: fmtDecimal(1),
        YY20_DAY1_SHIFT3_DB: fmtDecimal(1),
        YY100_SHIFT1_TOTAL_HRS_RG: fmtDecimal(1),
        YY101_SHIFT1_TOTAL_HRS_OT: fmtDecimal(1),
        YY102_SHIFT1_TOTAL_HRS_DB: fmtDecimal(1),
        YY103_SHIFT2_TOTAL_HRS_RG: fmtDecimal(1),
        YY104_SHIFT2_TOTAL_HRS_OT: fmtDecimal(1),
        YY105_SHIFT2_TOTAL_HRS_DB: fmtDecimal(1),
        YY106_SHIFT3_TOTAL_HRS_RG: fmtDecimal(1),
        YY107_SHIFT3_TOTAL_HRS_OT: fmtDecimal(1),
        YY108_SHIFT3_TOTAL_HRS_DB: fmtDecimal(1),

        // Prices/totals: keep your constants (1 / 0) but normalize
        YY109_SHIFT1_PRICE_RG: fmtDecimal(1),
        YY110_SHIFT1_PRICE_OT: fmtDecimal(1),

        YY121_SHIFT1_TOTAL_PRICE_RG: fmtDecimal(0),
        YY122_SHIFT1_TOTAL_PRICE_OT: fmtDecimal(0),
        YY123_SHIFT1_TOTAL_PRICE_DB: fmtDecimal(0),
        YY124_SHIFT2_TOTAL_PRICE_RG: fmtDecimal(0),
        YY125_SHIFT2_TOTAL_PRICE_OT: fmtDecimal(0),
        YY126_SHIFT2_TOTAL_PRICE_DB: fmtDecimal(0),
        YY127_SHIFT3_TOTAL_PAY_RG: fmtDecimal(0),
        YY128_SHIFT3_TOTAL_PAY_OT: fmtDecimal(0),
        YY129_SHIFT3_TOTAL_PAY_DB: fmtDecimal(0),

        // Allow Z-mapped VC1 overrides
        ...VC1Fields,
      };

      // ---- minimal VC2 base mapping (kept), add fee base + normalize ----
      const baseVC2 = {
        Sales_Order_Number: String(oMapEntry.salesOrder),
        Sales_Order_Item_Num: '10',

        YY137_HOLIDAY_TOTAL_VENDOR: fmtDecimal(0),

        // Your base rates 251..256
        YY251_SHIFT1_PAY_RATE_RG: fmtDecimal(1),
        YY252_SHIFT1_PAY_RATE_OT: fmtDecimal(1),
        YY253_SHIFT1_PAY_RATE_DB: fmtDecimal(1),
        YY254_SHIFT2_PAY_RATE_RG: fmtDecimal(1),
        YY255_SHIFT2_PAY_RATE_OT: fmtDecimal(1),
        YY256_SHIFT2_PAY_RATE_DB: fmtDecimal(1),

        // Add base for weekly clock fee so Z08 can override consistently (like Interface T)
        YY144_WEEKLY_CLOCK_FEE: fmtDecimal(record?.custWkTimeFee),

        // Leave other optional VC2 fields unset unless provided by Z
      };

      // Apply Z overrides (incl. Z08 → YY144_WEEKLY_CLOCK_FEE)
      const salesVC2 = { ...baseVC2, ...VC2Fields };

      // Validate formats (collect, don’t hard-stop)
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

      // readable debug log
      try {
        LOG.info(`[VC] Constructed payloads for record ${record.ID}`, {
          recID: record.ID,
          salesOrder: String(oMapEntry.salesOrder),
          vc1Payload: JSON.stringify(salesVC1, null, 2),
          vc2Payload: JSON.stringify(salesVC2, null, 2),
        });
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

  // Insert loop (no hard stop; UUID-aware; try/catch around each call)
  for (const row of prepared) {
    const { salesVC1, salesVC2, recID } = row;
    let insertedSalesVCData1, insertedSalesVCData2;

    // pre-insert log
    try {
      LOG.info(`[VC] PRE-INSERT for record ${recID}`, {
        recID,
        hasVC1Already: !!row.vcData1UUID,
        hasVC2Already: !!row.vcData2UUID,
        vc1Payload: JSON.stringify(salesVC1, null, 2),
        vc2Payload: JSON.stringify(salesVC2, null, 2),
      });
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
      aErrorLogs.push({ record_ID: recID, message: e?.message || 'VC1 INSERT exception', process_code: sProcessCode });
      aFailedRecordIDs.push(recID);
      const idx = aPassedRecordIDs.indexOf(recID);
      if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
      continue;
    }
    if (insertedSalesVCData1?.message) {
      aErrorLogs.push({ record_ID: recID, message: insertedSalesVCData1.message, process_code: sProcessCode });
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
      aErrorLogs.push({ record_ID: recID, message: e?.message || 'VC2 INSERT exception', process_code: sProcessCode });
      aFailedRecordIDs.push(recID);
      const idx = aPassedRecordIDs.indexOf(recID);
      if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
      continue;
    }
    if (insertedSalesVCData2?.message) {
      aErrorLogs.push({ record_ID: recID, message: insertedSalesVCData2.message , process_code: sProcessCode});
      aFailedRecordIDs.push(recID);
      const idx = aPassedRecordIDs.indexOf(recID);
      if (idx !== -1) aPassedRecordIDs.splice(idx, 1);
      continue;
    }

    // map UUIDs back
    const oMapEntry = mPayloadMap.get(recID) || {};
    if (insertedSalesVCData1?.SAP_UUID || row.vcData1UUID) {
      oMapEntry.vcData1UUID = insertedSalesVCData1?.SAP_UUID ?? row.vcData1UUID;
    }
    if (insertedSalesVCData2?.SAP_UUID || row.vcData2UUID) {
      oMapEntry.vcData2UUID = insertedSalesVCData2?.SAP_UUID ?? row.vcData2UUID;
    }
    mPayloadMap.set(recID, oMapEntry);

    // post-insert log
    try {
      LOG.info(`[VC] POST-INSERT result for record ${recID}`, {
        recID,
        vc1Result: JSON.stringify(insertedSalesVCData1 || {}, null, 2),
        vc2Result: JSON.stringify(insertedSalesVCData2 || {}, null, 2),
      });
    } catch (e) {}
  }
}



}

module.exports = WorkOrdersFG;