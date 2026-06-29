const Processor = require('./BaseProcessor');
const cds = require('@sap/cds');
const moment = require('moment');
const LOG = cds.log('Monitor.Processor-FgCreditRebill');
const ProcessLogger = require('../common/ProcessLogger');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const SalesOrderComm = require('../communicators/SalesOrder');
const SupplierInvoiceComm = require('../communicators/SupplierInvoice');
const PurchaseOrderComm = require('../communicators/PurchaseOrder');
const CreditMemoRequestComm = require('../communicators/CreditMemo');

// List of required entities
const {
    Files,
    Fg_Credit_Rebill,
    InterfaceSteps,
    FieldValidations,
    FieldValidations: {
        elements: {
            validation: { enum: mFieldValidationTypeEnum },
        },
    },
} = cds.entities('com.aleron.monitor');

class FgCreditRebill extends Processor {
    constructor(options) {
        super(options);
        this.recordsEntity = 'com.aleron.monitor.Fg_Credit_Rebill';
        this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

        // Global object to store sales order details
        this.salesOrderDetails = {};
    }

    prepareCommunicators() {
        this.LOG._info && this.LOG.info('Preparing Communicators');
        this.businesPartnerAPI = new BusinessPartnerComm();
        this.salesOrderAPI = new SalesOrderComm();
        this.supplierInvoiceAPI = new SupplierInvoiceComm();
        this.creditMemoRequestAPI = new CreditMemoRequestComm();
        this.purchaseOrderAPI = new PurchaseOrderComm();
    }

    _getColumnsForFetch(sEntity) {
        const mEntityColumns = {
            'com.aleron.monitor.Fg_Credit_Rebill': [
                ...['ID', 'file_ID', 'processLevel_code', 'valid'],

                // Entity specific fields
                'wokerID',
                'fgInvoiceID',
                'fgInvoicetype',
                'fgInvoiceLinetype',
                'invSubmissionDate',
                'fgSiteCode',
                'invLineAmount',
                'invLineAdjAmount',
                'curreny',
                'firstName',
                'lastName',
                'businessCode',
                'costCenterCode',
                'costCenterName',
                'fgTaskCode',
                'fgTaskName',
                'glAccount',
                'stHours',
                'otHours',
                'dtHours',
                'customerBillRateST',
                'customerBillRateOt',
                'customerBillRateDt',
                'fgWorkOrderID',
                'timesheetID',
                'parentTimesheetID',
                'fgInvoiceOrgID',
                'revision',
                'timeSheetStatus',
                'timeSheetStartDate',
                'timeSheetEndDate',
                'timeSheetApprovedDate',
                'quantity',
                'contractNoSS',
                'timeSheetEntryDate',
                'supplierPayRateST',
                'supplierPayRateOT',
                'supplierPayRateDT',
                'contractNoWN',
                'orderNo',
                'personnelNo',
                'fgGLCustomerCode',

                // SAPFields aspect fields
                'area',
                'workOrderType',
                'term',
                'personnelNoSAP',
                'salesDocumentNoSAP',
                'salesItemNoSAP',
                'projectNumberSAP',
                'projectUUID',
                'vcData1UUID',
                'vcData2UUID',
                'PORequiredSAP',
                'purchaseDocumentNoSAP',
                'purchaseDocumentItemSAP',
                'tripRequiredSAP',
                'tripNoSAP',
                'salesDocumentTypeSAP',
                'fiscalYearSAP',
                'invoiceDocumentNoSAP',
                'salesOrderICSAP',
                'salesItemNoICSAP',
                'partnerFunctionSAP',
                'salesOrderICUpdateRequired',
                'creditMemoSAP',
                'creditMemoICSAP',
                'p2SalesDocumentNoSAP',
                'employeeSubgroupSAP',
                'creditRebillSAP',
                'invoiceNoWNSAP',
                'invalidInvoiceNoWNSAP',
                'creditYearSAP',
                'creditInvoiceSAP',
                'rejectReasonSalesOrderSAP',
                'rejectReasonSalesOrderICSAP',
                'z42SAP',
                'creditSteps',
                'overrideAt',
                'overrideBy',
                'salesItemNo',
                'purchaseDocumentNo',
                'purchaseDocumentItem',
                'email',
                'companyCode',
                'distributionChannelSAP',
                'distributionChannelICSAP',
                'projectNumberICSAP',
                // 'itemCategorySAP',
                // 'rejectionReasonSAP',
                // 'wnInvoiceSAP',
                // 'weekEndSAP',
                // 'materialGroup3SAP',
                // 'orderRelatedBillingStatusSAP',
                // 'priceGroupSAP',
                // 'customerGroupSAP',
                // 'itemCategoryICSAP',
                // 'rejectionReasonICSAP',
                // 'wnInvoiceICSAP',
                // 'weekEndICSAP',
                // 'materialGroup3ICSAP',
                // 'orderRelatedBillingStatusICSAP',
                // 'orderNumberICSAP',
                // 'purchasingDocICSAP',
                // 'varIC',
                // 'billingStatusICSAP',
                // 'employeeNumberICSAP',
                // 'lifnrZR'
                // 'partnerFunctionSAP'
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

        // Group records by composite key
        const groupedRecords = aRecordsForProcessing.reduce((groups, record) => {
            const key = `${record.fgInvoiceOrgID}|${record.fgWorkOrderID}|${record.fgInvoiceID}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(record);
            return groups;
        }, {});

        LOG.info(`Total groups created: ${Object.keys(groupedRecords).length}`);
        // const [
        //     { reason: anyFieldValidationErr, value: aFieldValidations }
        // ] = await Promise.allSettled([
        //     SELECT.from(FieldValidations)
        //         .columns(['field', 'validation'])
        //         .where({
        //             interfaceType_ID: this.file.interfaceType_ID,
        //             validation: {
        //                 in: [mFieldValidationTypeEnum.blank.val, mFieldValidationTypeEnum.mandatory.val]
        //             }
        //         })
        // ]);

        // if (anyFieldValidationErr) {
        //     LOG._error && LOG.error(anyFieldValidationErr.message);
        // }

        // // Create sets for mandatory and blank field validations
        // const stMandatoryFields = new Set(
        //     aFieldValidations ? aFieldValidations.flatMap((record) =>
        //         record.validation === mFieldValidationTypeEnum.mandatory.val ? record.field : []
        //     ) : []
        // );
        // const stBlankFields = new Set(
        //     aFieldValidations ? aFieldValidations.flatMap((record) =>
        //         record.validation === mFieldValidationTypeEnum.blank.val ? record.field : []
        //     ) : []
        // );

        for (const groupKey in groupedRecords) {
            const recordsInGroup = groupedRecords[groupKey];
            // for (const record of recordsInGroup) 
            const record = recordsInGroup[0];
            {
                let hasRecordFailed = false;
                this.varIC = record.varIC || null;


                // Check if ORIGINAL_INVOICE_ID (fgInvoiceOrgID) is blank
                if (!record.fgInvoiceOrgID) {
                    const errorMsg = 'Original FG Invoice ID is Missing';
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: errorMsg,process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                    hasRecordFailed = true;
                }

                if (!hasRecordFailed) {
                    try {
                        // Step 1: Pull data from Sales Order Header with ZWMS
                        let salesOrderHeaderResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrder')
                                .columns(['SalesOrder', 'DistributionChannel', 'SalesOrganization', 'CreationDate', 'CustomerPriceGroup', 'CustomerGroup'])
                                .where({
                                    YY1_CustomSalesOrder_SDH: 'ZWMS',
                                    AssignmentReference: record.fgWorkOrderID
                                })
                        );

                        let salesOrderHeader;
                        if (salesOrderHeaderResult && salesOrderHeaderResult.length > 0) {
                            salesOrderHeader = salesOrderHeaderResult[0];
                        }

                        // If no entry, try with ZWCP
                        if (!salesOrderHeader) {
                            salesOrderHeaderResult = await this.salesOrderAPI.executeQuery(
                                SELECT.from('A_SalesOrder')
                                    .columns(['SalesOrder', 'DistributionChannel', 'SalesOrganization', 'CreationDate', 'CustomerPriceGroup', 'CustomerGroup'])
                                    .where({
                                        YY1_CustomSalesOrder_SDH: 'ZWCP',
                                        AssignmentReference: record.fgWorkOrderID
                                    })
                            );
                            if (salesOrderHeaderResult && salesOrderHeaderResult.length > 0) {
                                salesOrderHeader = salesOrderHeaderResult[0];
                            }
                        }

                        if (salesOrderHeader) {
                            record.salesDocumentNoSAP = salesOrderHeader.SalesOrder;
                            record.distributionChannelSAP = salesOrderHeader.DistributionChannel;
                            record.salesOrganizationSAP = salesOrderHeader.SalesOrganization;
                            record.creationDateSAP = salesOrderHeader.CreationDate;
                            record.priceGroupSAP = salesOrderHeader.CustomerPriceGroup;
                            record.customerGroupSAP = salesOrderHeader.CustomerGroup;

                            if (!['8', '9', 'M', 'N', 'O', 'P'].includes(sProcessCode)) {
                                const existingCreditInvoiceResult = await this.salesOrderAPI.executeQuery(
                                    SELECT.from('A_SalesOrderItem')
                                        .columns(['SalesOrderItem'])
                                        .where({
                                            SalesOrder: record.salesDocumentNoSAP,
                                            YY1_WNInvoice_SD_SDI: record.fgInvoiceID
                                        })
                                );

                                if (existingCreditInvoiceResult && existingCreditInvoiceResult.length > 0) {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: 'Credit Invoice already exist.',process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                }
                            }

                            if (!hasRecordFailed) {
                                try {
                                    // Find the corresponding Purchase Order number from the Sales Order
                                    const poItemResult = await this.salesOrderAPI.executeQuery(
                                        SELECT.from('A_SalesOrderItem')
                                            .columns(['YY1_PurchasingDoc_SD_SDI'])
                                            .where({
                                                SalesOrder: record.salesDocumentNoSAP,
                                                SalesOrderItem: '000010' // Assuming PO is on the main item
                                            })
                                    );

                                    if (poItemResult && poItemResult.length > 0 && poItemResult[0].YY1_PurchasingDoc_SD_SDI) {
                                        record.purchaseDocumentNoSAP = poItemResult[0].YY1_PurchasingDoc_SD_SDI;
                                    }

                                    // 1. Find SalesOrderItem using the original invoice ID
                                    const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                                        SELECT.from('A_SalesOrderItem')
                                            .columns(['SalesOrderItem', 'SalesOrderItemCategory', 'SalesDocumentRjcnReason', 'YY1_WNInvoice_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'AdditionalMaterialGroup3', 'OrderRelatedBillingStatus'])
                                            .where({
                                                SalesOrder: record.salesDocumentNoSAP,
                                                YY1_WNInvoice_SD_SDI: record.fgInvoiceOrgID
                                            })
                                    );

                                    if (salesOrderItemResult && salesOrderItemResult.length > 0) {
                                        record.salesItemNoSAP = salesOrderItemResult[0].SalesOrderItem;
                                        // record.itemCategorySAP = salesOrderItemResult[0].SalesDocumentItemCategory;
                                        record.purchaseDocumentItemSAP = salesOrderItemResult[0].SalesOrderItem;
                                        record.rejectionReasonSAP = salesOrderItemResult[0].SalesDocumentRjcnReason;
                                        record.wnInvoiceSAP = salesOrderItemResult[0].YY1_WNInvoice_SD_SDI;
                                        record.weekEndSAP = salesOrderItemResult[0].YY1_WeekEnd_SD_SDI;
                                        record.materialGroup3SAP = salesOrderItemResult[0].AdditionalMaterialGroup3;
                                        record.orderRelatedBillingStatusSAP = salesOrderItemResult[0].OrderRelatedBillingStatus;

                                        if (record.priceGroupSAP === 'ZM' && salesOrderItemResult[0].SalesOrderItemCategory === 'ZEXP') {
                                            const errorMsg = 'MBEWBE Expense. Please credit manually.';
                                            aErrorLogs.push({
                                                record_ID: record.ID,
                                                message: errorMsg,process_code: sProcessCode
                                            });
                                            aFailedRecordIDs.push(record.ID);
                                            hasRecordFailed = true;
                                        }

                                        if ((sProcessCode === '1' || sProcessCode === 'H') && !hasRecordFailed) {
                                            if (record.rejectionReasonSAP) {
                                                const errorMsg = `SO ${record.salesDocumentNoSAP} Line item ${record.salesItemNoSAP} already rejected.`;
                                                aErrorLogs.push({
                                                    record_ID: record.ID,
                                                    message: errorMsg, process_code: sProcessCode
                                                });
                                                aFailedRecordIDs.push(record.ID);
                                                hasRecordFailed = true;
                                            }
                                        }

                                        // Check for subsequent documents
                                        const subsequentDocFlowResult = await this.salesOrderAPI.executeQuery(
                                            SELECT.from('A_SalesOrderItmSubsqntProcFlow')
                                                .columns(['SubsequentDocument', 'SubsequentDocumentItem'])
                                                .where({
                                                    SalesOrder: record.salesDocumentNoSAP,
                                                    SalesOrderItem: record.salesItemNoSAP,
                                                    SubsequentDocumentCategory: 'K'
                                                })
                                        );

                                        if (subsequentDocFlowResult && subsequentDocFlowResult.length > 0) {
                                            if (subsequentDocFlowResult[0].SubsequentDocument && subsequentDocFlowResult[0].SubsequentDocumentItem) {
                                                const errorMsg = `Invoice ID ${record.fgInvoiceOrgID} is already invalidated once.`;
                                                aErrorLogs.push({
                                                    record_ID: record.ID,
                                                    message: errorMsg,process_code: sProcessCode
                                                });
                                                aFailedRecordIDs.push(record.ID);
                                                hasRecordFailed = true;
                                            }
                                        }

                                        // 2. Check for Purchase Order Item
                                        /*  if (!record.purchaseDocumentNoSAP && !hasRecordFailed) {
                                              const errorMsg = `Could not determine Purchase Order for Sales Order ${record.salesDocumentNoSAP}`;
                                              aErrorLogs.push({ record_ID: record.ID, message: errorMsg });
                                              aFailedRecordIDs.push(record.ID);
                                              hasRecordFailed = true;
                                          } else {
                                              const purchaseOrderItemResult = await this.purchaseOrderAPI.executeQuery(
                                                  SELECT.from('A_PurchaseOrderItem')
                                                      .columns(['PurchaseOrderItem'])
                                                      .where({
                                                          PurchaseOrder: record.purchaseDocumentNoSAP,
                                                          YY1_FGInvoice_PD_PDI: record.fgInvoiceOrgID
                                                      })
                                              );
      
                                              if (!purchaseOrderItemResult || purchaseOrderItemResult.length === 0) {
                                                  const errorMsg = `FG invoice #${record.fgInvoiceOrgID} is missing in the Purchase Order #${record.purchaseDocumentNoSAP}`;
                                                  aErrorLogs.push({
                                                      record_ID: record.ID,
                                                      message: errorMsg
                                                  });
                                                  aFailedRecordIDs.push(record.ID);
                                                  hasRecordFailed = true;
                                              } 
                                          } */
                                    } else {
                                        const errorMsg = `WN Invoice number ${record.fgInvoiceOrgID} does not exist in SO ${record.salesDocumentNoSAP}. Possible Legacy Invoice`;
                                        aErrorLogs.push({
                                            record_ID: record.ID,
                                            message: errorMsg, process_code: sProcessCode
                                        });
                                        aFailedRecordIDs.push(record.ID);
                                        hasRecordFailed = true;
                                    }
                                } catch (error) {
                                    this.LOG._error && this.LOG.error(`Error querying order details for ${record.fgWorkOrderID}: ${error.message}`);
                                    hasRecordFailed = true;
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: `Error querying order details: ${error.message}`, process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                }

                                if (!hasRecordFailed && record.customerGroupSAP === 'ZI') {
                                    try {
                                        const originalInvoiceIdIC = record.fgInvoiceOrgID + 'IC';

                                        // 1. Query for IC Sales Order Item first
                                        const salesOrderItemICResult = await this.salesOrderAPI.executeQuery(
                                            SELECT.from('A_SalesOrderItem')
                                                .columns(['SalesOrder', 'SalesOrderItem', 'SalesDocumentItemCategory', 'SalesDocumentRjcnReason', 'YY1_WNInvoice_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'MaterialGroup3', 'OrderRelatedBillingStatus', 'OrderNumber', 'YY1_PurchasingDoc_SD_SDI'])
                                                .where({ YY1_WNInvoice_SD_SDI: originalInvoiceIdIC })
                                        );

                                        if (salesOrderItemICResult && salesOrderItemICResult.length > 0) {
                                            const icSalesOrder = salesOrderItemICResult[0].SalesOrder;
                                            const icSalesOrderItem = salesOrderItemICResult[0].SalesOrderItem;
                                            record.salesOrderICSAP = icSalesOrder;
                                            record.salesItemNoICSAP = icSalesOrderItem;
                                            record.itemCategoryICSAP = salesOrderItemICResult[0].SalesDocumentItemCategory;
                                            record.rejectionReasonICSAP = salesOrderItemICResult[0].SalesDocumentRjcnReason;
                                            record.wnInvoiceICSAP = salesOrderItemICResult[0].YY1_WNInvoice_SD_SDI;
                                            record.weekEndICSAP = salesOrderItemICResult[0].YY1_WeekEnd_SD_SDI;
                                            record.materialGroup3ICSAP = salesOrderItemICResult[0].MaterialGroup3;
                                            record.orderRelatedBillingStatusICSAP = salesOrderItemICResult[0].OrderRelatedBillingStatus;
                                            record.orderNumberICSAP = salesOrderItemICResult[0].OrderNumber;
                                            record.purchasingDocICSAP = salesOrderItemICResult[0].YY1_PurchasingDoc_SD_SDI;
                                            // record.varIC = 'X';
                                            this.varIC = 'X';

                                            // Get billing status for IC sales order item
                                            const billingStatusICResult = await this.salesOrderAPI.executeQuery(
                                                SELECT.from('A_SalesOrderItem')
                                                    .columns(['OrderRelatedBillingStatus'])
                                                    .where({
                                                        SalesOrder: record.salesOrderICSAP,
                                                        SalesOrderItem: record.salesItemNoICSAP
                                                    })
                                            );

                                            if (billingStatusICResult && billingStatusICResult.length > 0) {
                                                record.billingStatusICSAP = billingStatusICResult[0].OrderRelatedBillingStatus;
                                            }

                                            // Get employee number from partner table for IC sales order
                                            const employeePartnerICResult = await this.salesOrderAPI.executeQuery(
                                                SELECT.from('A_SalesOrderHeaderPartner')
                                                    .columns(['Personnel'])
                                                    .where({
                                                        SalesOrder: record.salesOrderICSAP,
                                                        PartnerFunction: 'Z3'
                                                    })
                                            );

                                            if (employeePartnerICResult && employeePartnerICResult.length > 0) {
                                                record.employeeNumberICSAP = employeePartnerICResult[0].Personnel;
                                            }

                                            // Check for remit-to vendors based on distribution channel and IC indicator
                                            let partnerQuery;
                                            if (record.distributionChannelSAP === 'MS') {
                                                // Query main sales order partner table
                                                partnerQuery = await this.salesOrderAPI.executeQuery(
                                                    SELECT.from('A_SalesOrderHeaderPartner')
                                                        .columns(['PartnerFunction', 'Supplier'])
                                                        .where({
                                                            SalesOrder: record.salesDocumentNoSAP,
                                                            PartnerFunction: { in: ['ZV', 'ZR'] }
                                                        })
                                                );
                                            } else if (this.varIC === 'X') {
                                                // Query intercompany sales order partner table
                                                partnerQuery = await this.salesOrderAPI.executeQuery(
                                                    SELECT.from('A_SalesOrderHeaderPartner')
                                                        .columns(['PartnerFunction', 'Supplier'])
                                                        .where({
                                                            SalesOrder: record.salesOrderICSAP,
                                                            PartnerFunction: { in: ['ZV', 'ZR'] }
                                                        })
                                                );
                                            }

                                            if (partnerQuery && partnerQuery.length > 1) {
                                                const errorMsg = 'More than two remit to vendor found.';
                                                aErrorLogs.push({
                                                    record_ID: record.ID,
                                                    message: errorMsg, process_code: sProcessCode
                                                });
                                                aFailedRecordIDs.push(record.ID);
                                                hasRecordFailed = true;
                                            } else if (partnerQuery && partnerQuery.length === 1) {
                                                // Update main table with partner function and vendor
                                                record.partnerFunctionSAP = partnerQuery[0].PartnerFunction;
                                                record.lifnrZR = partnerQuery[0].Supplier;
                                            }

                                            if ((sProcessCode === '1' || sProcessCode === 'H') && !hasRecordFailed) {
                                                if (record.rejectionReasonICSAP) {
                                                    const errorMsg = `SO ${record.salesOrderICSAP} Line item ${record.salesItemNoICSAP} already rejected.`;
                                                    aErrorLogs.push({
                                                        record_ID: record.ID,
                                                        message: errorMsg, process_code: sProcessCode
                                                    });
                                                    aFailedRecordIDs.push(record.ID);
                                                    hasRecordFailed = true;
                                                }
                                            }

                                            // 2. Validate against IC Sales Order Header
                                            if (!hasRecordFailed) {
                                                const salesOrderICHeaderResult = await this.salesOrderAPI.executeQuery(
                                                    SELECT.from('A_SalesOrder')
                                                        .columns(['SalesOrder'])
                                                        .where({
                                                            SalesOrder: icSalesOrder,
                                                            YY1_CustomSalesOrder_SDH: 'ZWCP',
                                                            AssignmentReference: record.fgWorkOrderID // check once YY1_AlphanumericSalesO_SDH
                                                        })
                                                );

                                                if (salesOrderICHeaderResult && salesOrderICHeaderResult.length > 0) {
                                                    // If header is valid, store the IC details
                                                    record.salesOrderICSAP = icSalesOrder;
                                                    record.salesItemNoICSAP = icSalesOrderItem;
                                                } else {
                                                    const errorMsg = `CP/CR WO for IC WO (${record.fgWorkOrderID}) is not loaded in SAP.`;
                                                    aErrorLogs.push({ record_ID: record.ID, message: errorMsg, process_code: sProcessCode });
                                                    aFailedRecordIDs.push(record.ID);
                                                    hasRecordFailed = true;
                                                }
                                            }
                                        } else {
                                            const errorMsg = `Original IC Invoice ID ${originalInvoiceIdIC} not found in any Sales Order Item.`;
                                            aErrorLogs.push({ record_ID: record.ID, message: errorMsg, process_code: sProcessCode });
                                            aFailedRecordIDs.push(record.ID);
                                            hasRecordFailed = true;
                                        }
                                    } catch (error) {
                                        this.LOG._error && this.LOG.error(`Error querying Intercompany Sales Order for ${record.fgWorkOrderID}: ${error.message}`);
                                        hasRecordFailed = true;
                                        aErrorLogs.push({
                                            record_ID: record.ID,
                                            message: `Error querying Intercompany Sales Order: ${error.message}`, process_code: sProcessCode
                                        });
                                        aFailedRecordIDs.push(record.ID);
                                    }
                                }
                            }
                        } else {
                            // If no entry found in both cases, log an error
                            const errorMsg = `WorkOrder_ID ${record.fgWorkOrderID} not loaded to SAP`;
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: errorMsg, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            hasRecordFailed = true;
                        }
                    } catch (error) {
                        this.LOG._error && this.LOG.error(`Error querying Sales Order for ${record.fgWorkOrderID}: ${error.message}`);
                        hasRecordFailed = true;
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error querying Sales Order: ${error.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                    }
                }

                // Compute creditSteps for the record if it passed validation
                if (!hasRecordFailed) {
                    let steps = [];
                    if ((record.orderRelatedBillingStatusSAP === 'A' || !record.orderRelatedBillingStatusSAP) && sProcessCode === '1') {
                        if (record.distributionChannelSAP === 'MS' && (!record.materialGroup3SAP || record.materialGroup3SAP === '') && record.customerGroupSAP !== 'ZM') {
                            steps.push('J', 'K');
                        }
                        if (record.orderRelatedBillingStatusSAP === 'A' && this.varIC === 'X') {
                            steps.push('I', 'J', 'K');
                        }
                        if (record.orderRelatedBillingStatusSAP === 'A') {
                            steps.push('H');
                        }
                    }
                    if (!record.orderRelatedBillingStatusSAP && !this.varIC && record.distributionChannelSAP === 'MS' && record.customerGroupSAP !== 'ZM') {
                        steps.push('J', 'K');
                    }
                    if (!record.orderRelatedBillingStatusSAP && (record.orderRelatedBillingStatusSAP === '' || record.orderRelatedBillingStatusSAP === 'A') && this.varIC === 'X') {
                        steps.push('I', 'J', 'K');
                    }
                    if (record.orderRelatedBillingStatusSAP === 'C' || record.orderRelatedBillingStatusSAP === 'C') {
                        steps.push('L', 'O');
                        if (record.distributionChannelSAP === 'MS' && (!record.materialGroup3SAP || record.materialGroup3SAP === '') && record.customerGroupSAP !== 'ZM') {
                            steps.push('N');
                        }
                        if (this.varIC === 'X') {
                            steps.push('M', 'P', 'N');
                        }
                    }
                    if (steps.length > 0) {
                        const uniqueSteps = Array.from(new Set([...(record.creditSteps ? record.creditSteps.split(',') : []), ...steps]));
                        record.creditSteps = uniqueSteps.join(',');
                    }
                }

                if (!hasRecordFailed) {
                    aPassedRecordIDs.push(record.ID);
                }
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
        if (aPassedRecordIDs.length > 0) {
            const passedRecordIDSet = new Set(aPassedRecordIDs);
            const allRecordIDsToUpdateAsValid = new Set();
            const recordsToUpdate = [];

            const recordIdToIndexMap = new Map(
                this.records.map((record, index) => [record.ID, index])
            );

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // 1. Check if AT LEAST ONE record in the group passed validation.
                if (recordsInGroup.some(record => passedRecordIDSet.has(record.ID))) {

                    // 2. Get the representative record (first record) that has all the computed values
                    const representativeRecord = recordsInGroup[0];

                    // 3. Copy computed values to all records in the group
                    recordsInGroup.forEach(record => {
                        // Copy all the SAP fields from the representative record
                        const fieldsToCopy = [
                            'salesDocumentNoSAP', 'distributionChannelSAP', 'salesOrganizationSAP', 'creationDateSAP',
                            'salesItemNoSAP', 'rejectionReasonSAP',
                            'wnInvoiceSAP', 'weekEndSAP', 'materialGroup3SAP', 'orderRelatedBillingStatusSAP',
                            'purchaseDocumentNoSAP', 'purchaseDocumentItemSAP', 'salesOrderICSAP', 'salesItemNoICSAP',
                            'rejectionReasonICSAP', 'wnInvoiceICSAP', 'weekEndICSAP',
                            'materialGroup3ICSAP', 'orderRelatedBillingStatusICSAP', 'orderNumberICSAP',
                            'purchasingDocICSAP', 'billingStatusICSAP', 'employeeNumberICSAP',
                            'partnerFunctionSAP', 'lifnrZR', 'creditSteps'
                        ];

                        fieldsToCopy.forEach(field => {
                            if (representativeRecord[field] !== undefined) {
                                record[field] = representativeRecord[field];
                            }
                        });

                        allRecordIDsToUpdateAsValid.add(record.ID);
                        recordsToUpdate.push(record);
                    });
                }
            }

            // 4. Update each record individually with its own field values
            if (allRecordIDsToUpdateAsValid.size > 0) {

                // First, update all records with valid=true and processLevel_code
                await UPDATE(Fg_Credit_Rebill)
                    .set({
                        valid: true,
                        processLevel_code: sProcessCode
                    })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsValid) } });

                // Update each record with its own specific values
                const updatePromises = recordsToUpdate.map(record => {
                    const additionalFields = {};
                    // Add all the fields we've populated during validation
                    const fieldsToUpdate = [
                        'salesDocumentNoSAP', 'distributionChannelSAP', 'salesOrganizationSAP', 'creationDateSAP',
                        'salesItemNoSAP', 'rejectionReasonSAP',
                        'wnInvoiceSAP', 'weekEndSAP', 'materialGroup3SAP', 'orderRelatedBillingStatusSAP',
                        'purchaseDocumentNoSAP', 'purchaseDocumentItemSAP', 'salesOrderICSAP', 'salesItemNoICSAP',
                        'rejectionReasonICSAP', 'wnInvoiceICSAP', 'weekEndICSAP',
                        'materialGroup3ICSAP', 'orderRelatedBillingStatusICSAP', 'orderNumberICSAP',
                        'purchasingDocICSAP', 'billingStatusICSAP', 'employeeNumberICSAP',
                        'partnerFunctionSAP', 'lifnrZR', 'creditSteps'
                    ];

                    fieldsToUpdate.forEach(field => {
                        if (record[field] !== undefined) {
                            additionalFields[field] = record[field];
                        }
                    });

                    const recordIndex = recordIdToIndexMap.get(record.ID);
                    if (recordIndex !== undefined && this.records[recordIndex]) {
                        Object.assign(this.records[recordIndex], {
                            valid: true,
                            processLevel_code: sProcessCode,
                            ...additionalFields
                        });
                        LOG._info && LOG.info(`Updated in-memory record ${record.ID} with creditSteps: ${additionalFields.creditSteps}`);
                    }

                    return this.markRecordsValid(sProcessCode, [record.ID], true, additionalFields);
                });

                await Promise.all(updatePromises);
            }
        }
       
        // if (aFailedRecordIDs.length > 0) {
        //     const failedRecordIDSet = new Set(aFailedRecordIDs);
        //     const allRecordIDsToUpdateAsFailed = new Set();

        //     for (const groupKey in groupedRecords) {
        //         const recordsInGroup = groupedRecords[groupKey];

        //         // Check if AT LEAST ONE record in the group failed validation
        //         if (recordsInGroup.some(record => failedRecordIDSet.has(record.ID))) {

        //             // If yes, add ALL record IDs from that group to be updated as failed
        //             recordsInGroup.forEach(record => {
        //                 allRecordIDsToUpdateAsFailed.add(record.ID);
        //             });
        //         }
        //     }

        //     // Update all collected IDs at once with only valid and processLevel_code
        //     if (allRecordIDsToUpdateAsFailed.size > 0) {
        //         const updatePromises = Array.from(allRecordIDsToUpdateAsFailed).map(recordID => {
        //             return this.markRecordsValid(sProcessCode, [recordID], false);
        //         });

        //         await Promise.all(updatePromises);
        //     }
        // }

        if (aFailedRecordIDs.length > 0) {
            const failedRecordIDSet = new Set(aFailedRecordIDs);
            const allRecordIDsToUpdateAsFailed = new Set();
            const recordErrorLogMap = new Map();
            for (const logEntry of aErrorLogs) {
                if (!recordErrorLogMap.has(logEntry.record_ID)) {
                    recordErrorLogMap.set(logEntry.record_ID, []);
                }
                recordErrorLogMap.get(logEntry.record_ID).push(logEntry.message);
            }
            const additionalErrorLogs = [];

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group failed validation
                if (recordsInGroup.some(record => failedRecordIDSet.has(record.ID))) {
                    const groupMessages = [];
                    recordsInGroup.forEach(record => {
                        const messages = recordErrorLogMap.get(record.ID);
                        if (messages && messages.length) {
                            groupMessages.push(...messages);
                        }
                    });
                    const uniqueGroupMessages = [...new Set(groupMessages)];

                    // If yes, add ALL record IDs from that group to be updated as failed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsFailed.add(record.ID);
                        if (uniqueGroupMessages.length) {
                            uniqueGroupMessages.forEach(message => {
                                additionalErrorLogs.push({
                                    record_ID: record.ID,
                                    message, process_code: sProcessCode
                                });
                            });
                        }
                    });
                }
            }

            if (additionalErrorLogs.length) {
                const existingLogKeys = new Set(
                    aErrorLogs.map(log => `${log.record_ID}|${log.message}`)
                );
                for (const logEntry of additionalErrorLogs) {

                    const key = `${logEntry.record_ID}|${logEntry.message}`;
                    if (!existingLogKeys.has(key)) {
                        aErrorLogs.push(logEntry);
                        existingLogKeys.add(key);
                    }
                }
            }

            if (aErrorLogs.length) {
                await ProcessLogger.addLogs(aErrorLogs);
            }

            // Update all collected IDs at once with only valid and processLevel_code
            if (allRecordIDsToUpdateAsFailed.size > 0) {
                const updatePromises = Array.from(allRecordIDsToUpdateAsFailed).map(recordID => {
                    return this.markRecordsValid(sProcessCode, [recordID], false);
                });

                await Promise.all(updatePromises);
            }
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

    
    //Step H (Reject SO)
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

        // Group records by composite key (3-4 fields)
        const groupedRecords = this.records.reduce((groups, record) => {
            const key = `${record.fgInvoiceOrgID}|${record.fgWorkOrderID}|${record.fgInvoiceID}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(record);
            return groups;
        }, {});

        for (const groupKey in groupedRecords) {
            const recordsInGroup = groupedRecords[groupKey];

            // Process each group - if any record in the group needs step H, process the group
            const needsProcessing = recordsInGroup.some(record =>
                record.creditSteps && record.creditSteps.split(',').includes('H')
            );

            if (needsProcessing) {
                // Get the first record from the group for processing (assuming all records in group have same SAP data)
                const representativeRecord = recordsInGroup[0];

                try {
                    const status = representativeRecord.orderRelatedBillingStatus;
                    // if (sProcessCode === '1' && (status === 'A' || status === '')) 
                    {
                        // PATCH SalesOrderItem to set rejection reason
                        const patchResult = await this.salesOrderAPI.executeQuery(
                            UPDATE('A_SalesOrderItem')
                                .set({
                                    SalesDocumentRjcnReason: 'ZA' // or your required reason code
                                })
                                .where({

                                    SalesOrder: representativeRecord.salesDocumentNoSAP,
                                    SalesOrderItem: representativeRecord.salesItemNoSAP

                                })
                        );

                        if (!patchResult.error) {
                            // Mark all records in the group as passed
                            for (const record of recordsInGroup) {
                                // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'H', createdAt: new Date() });
                                // await this._deletePreviousSteps(record.ID, 'H');
                                aPassedRecordIDs.push(record.ID);
                            }
                        } else {
                            // Mark all records in the group as failed
                            for (const record of recordsInGroup) {
                                aErrorLogs.push({
                                    record_ID: record.ID,
                                    message: `Error rejecting sales order item: ${patchResult.error}`, process_code: sProcessCode
                                });
                                aFailedRecordIDs.push(record.ID);
                            }
                        }
                    }
                } catch (err) {
                    // Mark all records in the group as failed
                    for (const record of recordsInGroup) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error rejecting sales order: ${err.message}`,process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                    }
                }
            } else {
                // If no records in the group need step H, mark all as passed
                for (const record of recordsInGroup) {
                    aPassedRecordIDs.push(record.ID);
                }
            }
        }

        // Update the status of passed records
        // if (aPassedRecordIDs.length) {
        //     await ProcessLogger.removeLogs(aPassedRecordIDs);
    
        //     try {
        //         await UPDATE(Fg_Credit_Rebill)
        //             .set({
        //                 valid: true,
        //                 processLevel_code: sProcessCode
        //             })
        //             .where({ ID: { in: aPassedRecordIDs } });
                
        //         LOG.info(`Successfully updated ${aPassedRecordIDs.length} records as passed for step ${sProcessCode}`);
        //     } catch (updateError) {
        //         LOG.error(`Error updating passed records: ${updateError.message}`);
        //         // If update fails, mark these records as failed
        //         for (const recordID of aPassedRecordIDs) {
        //             aFailedRecordIDs.push(recordID);
        //             aErrorLogs.push({
        //                 record_ID: recordID,
        //                 message: `Database update failed: ${updateError.message}`
        //             });
        //         }
                
        //     }
        // }

        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);
    
            try {
                const updateResult = await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
                if (updateResult) {
                    LOG.info(`Successfully updated ${aPassedRecordIDs.length} records as passed for step ${sProcessCode}`);
                } else {
                    throw new Error('markRecordsValid returned false');
                }
            } catch (updateError) {
                LOG.error(`Error updating passed records: ${updateError.message}`);
                // If update fails, mark these records as failed
                for (const recordID of aPassedRecordIDs) {
                    aFailedRecordIDs.push(recordID);
                    aErrorLogs.push({
                        record_ID: recordID,
                        message: `Database update failed: ${updateError.message}`, process_code: sProcessCode
                    });
                }
                // Clear the passed records since update failed
                aPassedRecordIDs.length = 0;
            }
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);

            // Get all record IDs that need to be updated as failed (including group members)
            const allRecordIDsToUpdateAsFailed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aFailedRecordIDs
                if (recordsInGroup.some(record => aFailedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as failed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsFailed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsFailed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({ valid: false, processLevel_code: sProcessCode })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsFailed) } });
            }
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step I (Reject SO for InterCompany)
    async RejectSOIC(sProcessCode) {
        const aRecordsForProcessing = [];
        const aPassedRecordIDs = [];
        const aFailedRecordIDs = [];
        const aSkippedRecords = [];
        const aErrorLogs = [];

        for (const record of this.records) {
            if (record.creditSteps && record.creditSteps.split(',').includes('I')) {
                try {
                    // const bs = record.orderRelatedBillingStatus, bsi = record.orderRelatedBillingStatusIC, varIC = record.varIC;

                    // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'I', createdAt: new Date() });
                    // await this._deletePreviousSteps(record.ID, 'I');
                    aPassedRecordIDs.push(record.ID);
                } catch (err) {
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: `Error rejecting intercompany sales order: ${err.message}`,process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                }
            } else {
                aPassedRecordIDs.push(record.ID);
            }
        }
        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);
            await UPDATE(Fg_Credit_Rebill)
                .set({
                    valid: true,
                    processLevel_code: sProcessCode
                })
                .where({ ID: { in: aPassedRecordIDs } });
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await UPDATE(Fg_Credit_Rebill)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step J (Cancel MIRO)
    async CancelMIRO(sProcessCode) {
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

        // Group records by composite key (3-4 fields)
        const groupedRecords = this.records.reduce((groups, record) => {
            const key = `${record.fgInvoiceOrgID}|${record.fgWorkOrderID}|${record.fgInvoiceID}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(record);
            return groups;
        }, {});

        for (const groupKey in groupedRecords) {
            const recordsInGroup = groupedRecords[groupKey];

            // Process each group - if any record in the group needs step J, process the group
            const needsProcessing = recordsInGroup.some(record =>
                record.creditSteps && record.creditSteps.split(',').includes('J')
            );

            if (needsProcessing) {
                // Get the first record from the group for processing (assuming all records in group have same SAP data)
                const representativeRecord = recordsInGroup[0];

                try {
                    // Query 1: Get sales order and item number using invoice number
                    // const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                    //     SELECT.from('A_SalesOrderItem')
                    //         .columns(['SalesOrder', 'SalesOrderItem'])
                    //         .where({ YY1_WNInvoice_SD_SDI: representativeRecord.fgInvoiceOrgID })
                    // );

                    // if (!salesOrderItemResult || !salesOrderItemResult.length) {
                    //     // Mark all records in the group as failed
                    //     for (const record of recordsInGroup) {
                    //         aErrorLogs.push({
                    //             record_ID: record.ID,
                    //             message: `No sales order item found for invoice ${representativeRecord.wnInvoiceNo}`
                    //         });
                    //         aFailedRecordIDs.push(record.ID);
                    //     }
                    //     continue;
                    // }

                    // const salesOrder = salesOrderItemResult[0].SalesOrder;
                    // const salesOrderItem = salesOrderItemResult[0].SalesOrderItem;

                    // Query 2: Get purchase order using sales order and item 0010
                    // const purchaseOrderResult = await this.salesOrderAPI.executeQuery(
                    //     SELECT.from('A_SalesOrderItem')
                    //         .columns(['YY1_PurchasingDoc_SD_SDI'])
                    //         .where({
                    //             and: [
                    //                 { SalesOrder: salesOrder },
                    //                 { SalesOrderItem: '000010' }
                    //             ]
                    //         })
                    // );

                    // if (!purchaseOrderResult || !purchaseOrderResult.length) {
                    //     // Mark all records in the group as failed
                    //     for (const record of recordsInGroup) {
                    //         aErrorLogs.push({
                    //             record_ID: record.ID,
                    //             message: `No purchase order found for sales order ${salesOrder}`
                    //         });
                    //         aFailedRecordIDs.push(record.ID);
                    //     }
                    //     continue;
                    // }

                    // const purchaseOrder = purchaseOrderResult[0].YY1_PurchasingDoc_SD_SDI;

                    // Query 3: Get SupplierInvoice using PurchaseOrder and PurchaseOrderItem
                    const supplierInvoiceResult = await this.supplierInvoiceAPI.executeQuery(
                        SELECT.from('A_SuplrInvcItemPurOrdRef')
                            .columns(['SupplierInvoice', 'SupplierInvoiceItem', 'FiscalYear'])
                            .where({                                
                                     PurchaseOrder: representativeRecord.purchaseDocumentNoSAP ,
                                     PurchaseOrderItem: representativeRecord.purchaseDocumentItemSAP                                
                            })
                    );

                    if (!supplierInvoiceResult || !supplierInvoiceResult.length) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No supplier invoice found for purchase order ${representativeRecord.purchaseDocumentNoSAP} and item ${representativeRecord.purchaseDocumentItemSAP}`,
                                process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    const supplierInvoice = supplierInvoiceResult[0].SupplierInvoice;
                    const fiscalYear = supplierInvoiceResult[0].FiscalYear;

                    // Store the values in the representative record
                    // representativeRecord.purchaseDocumentNoSAP = purchaseOrder;
                    // representativeRecord.purchaseDocumentItemSAP = salesOrderItem;
                    representativeRecord.supplierInvoiceSAP = supplierInvoice;
                    representativeRecord.supplierInvoiceItemSAP = supplierInvoiceResult[0].SupplierInvoiceItem;

                    // Get current date in the required format for the cancel endpoint
                    const currentDate = new Date();
                    const postingDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

                    // Call the cancel endpoint using the supplier invoice communicator
                    const cancelResult = await this.supplierInvoiceAPI.cancelSupplierInvoice({
                        SupplierInvoice: supplierInvoice,
                        FiscalYear: fiscalYear,
                        PostingDate: postingDate,
                        ReversalReason: '01'
                    });

                    if (cancelResult.success) {
                        // Mark all records in the group as passed
                        for (const record of recordsInGroup) {
                            // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'J', createdAt: new Date() });
                            // await this._deletePreviousSteps(record.ID, 'J');
                            aPassedRecordIDs.push(record.ID);
                        }
                    } else {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error canceling MIRO: ${cancelResult.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                    }
                } catch (err) {
                    // Mark all records in the group as failed
                    for (const record of recordsInGroup) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error canceling MIRO: ${err.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                    }
                }
            } else {
                // If no records in the group need step J, mark all as passed
                for (const record of recordsInGroup) {
                    aPassedRecordIDs.push(record.ID);
                }
            }
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);

            // Get all record IDs that need to be updated as passed (including group members)
            const allRecordIDsToUpdateAsPassed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aPassedRecordIDs
                if (recordsInGroup.some(record => aPassedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as passed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsPassed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsPassed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({
                        valid: true,
                        processLevel_code: sProcessCode
                    })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsPassed) } });
            }
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {

            await ProcessLogger.addLogs(aErrorLogs);

            // Get all record IDs that need to be updated as failed (including group members)
            const allRecordIDsToUpdateAsFailed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aFailedRecordIDs
                if (recordsInGroup.some(record => aFailedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as failed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsFailed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsFailed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({ valid: false, processLevel_code: sProcessCode })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsFailed) } });
            }
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step K (Cancel Purchase Order)
    async CancelPO(sProcessCode) {
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

        // Group records by composite key (3-4 fields)
        const groupedRecords = this.records.reduce((groups, record) => {
            const key = `${record.fgInvoiceOrgID}|${record.fgWorkOrderID}|${record.fgInvoiceID}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(record);
            return groups;
        }, {});

        for (const groupKey in groupedRecords) {
            const recordsInGroup = groupedRecords[groupKey];

            // Process each group - if any record in the group needs step K, process the group
            const needsProcessing = recordsInGroup.some(record =>
                record.creditSteps && record.creditSteps.split(',').includes('K')
            );

            if (needsProcessing) {
                // Get the first record from the group for processing (assuming all records in group have same SAP data)
                const representativeRecord = recordsInGroup[0];

                try {
                    // Use the purchase order details stored in the record from validation
                    if (!representativeRecord.purchaseDocumentNoSAP || !representativeRecord.purchaseDocumentItemSAP) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                process_code: sProcessCode,
                                message: `Purchase order details not found in record for invoice ${representativeRecord.fgInvoiceOrgID}`
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    // Call the communicator to mark the PO item for deletion using stored values
                    const updateResult = await this.purchaseOrderAPI.deletePurchaseOrderItems({
                        PurchaseOrder: representativeRecord.purchaseDocumentNoSAP,
                        PurchaseOrderItem: representativeRecord.purchaseDocumentItemSAP                        
                    });

                    if (updateResult.success) {
                        // Mark all records in the group as passed
                        for (const record of recordsInGroup) {
                            // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'K', createdAt: new Date() });
                            // await this._deletePreviousSteps(record.ID, 'K');
                            aPassedRecordIDs.push(record.ID);
                        }
                    } else {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error marking purchase order item for deletion: ${updateResult.message}`,process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                    }
                } catch (err) {
                    // Mark all records in the group as failed
                    for (const record of recordsInGroup) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error canceling purchase order: ${err.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                    }
                }
            } else {
                // If no records in the group need step K, mark all as passed
                for (const record of recordsInGroup) {
                    aPassedRecordIDs.push(record.ID);
                }
            }
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);

            // Get all record IDs that need to be updated as passed (including group members)
            const allRecordIDsToUpdateAsPassed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aPassedRecordIDs
                if (recordsInGroup.some(record => aPassedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as passed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsPassed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsPassed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({
                        valid: true,
                        processLevel_code: sProcessCode
                    })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsPassed) } });
            }
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);

            // Get all record IDs that need to be updated as failed (including group members)
            const allRecordIDsToUpdateAsFailed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aFailedRecordIDs
                if (recordsInGroup.some(record => aFailedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as failed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsFailed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsFailed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({ valid: false, processLevel_code: sProcessCode })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsFailed) } });
            }
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step L (Create Credit Memo)
    async CreateCRMEMO(sProcessCode, bBreakExecution) {
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

        // Group records by composite key (3-4 fields)
        const groupedRecords = this.records.reduce((groups, record) => {
            const key = `${record.fgInvoiceOrgID}|${record.fgWorkOrderID}|${record.fgInvoiceID}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(record);
            return groups;
        }, {});

        for (const groupKey in groupedRecords) {
            const recordsInGroup = groupedRecords[groupKey];

            // Process each group - if any record in the group needs step L, process the group
            const needsProcessing = recordsInGroup.some(record =>
                record.creditSteps && record.creditSteps.split(',').includes('L')
            );

            if (needsProcessing) {
                // Get the first record from the group for processing (assuming all records in group have same SAP data)
                const representativeRecord = recordsInGroup[0];

                try {
                    // Validate required fields
                    if (!representativeRecord.salesDocumentNoSAP) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'SO missing.',process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    if (!representativeRecord.wnInvoiceNo) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'WN Invoice Number is missing.', process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    // Get sales order and item number using invoice number
                    const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderItem')
                            .columns(['SalesOrder', 'SalesOrderItem'])
                            .where({ YY1_WNInvoice_SD_SDI: representativeRecord.wnInvoiceNo })
                    );

                    if (!salesOrderItemResult || !salesOrderItemResult.length) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No sales order item found for invoice ${representativeRecord.wnInvoiceNo}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    const VAR_VBELN = salesOrderItemResult[0].SalesOrder;
                    const VAR_POSNR = salesOrderItemResult[0].SalesOrderItem;

                    // Get Customer group from Sales Document
                    const salesOrderResult = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrder')
                            .columns(['SalesOrder', 'CustomerGroup', 'TransactionCurrency'])
                            .where({
                                SalesOrder: VAR_VBELN
                                //  SalesOrderItem: '000000'                                
                            })
                    );

                    if (!salesOrderResult || !salesOrderResult.length) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No sales order found for ${VAR_VBELN}`,process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    const customerGroup = salesOrderResult[0].CustomerGroup;
                    const transactionCurrency = salesOrderResult[0].TransactionCurrency;
                    let VAR_SAP_WN_INV;

                    if (customerGroup === 'ZI') {
                        if (representativeRecord.invalidInvoiceNoWNSAP && representativeRecord.invalidInvoiceNoWNSAP !== representativeRecord.wnInvoiceNo) {
                            VAR_SAP_WN_INV = representativeRecord.invalidInvoiceNoWNSAP + 'IC-C';
                        } else {
                            VAR_SAP_WN_INV = representativeRecord.wnInvoiceNo + 'IC-C';
                        }
                    } else {
                        VAR_SAP_WN_INV = representativeRecord.wnInvoiceNo + 'IC-C';
                    }

                    // Validate invoice number length
                    if (VAR_SAP_WN_INV.length > 15) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'Credit WN inv # cannot exceed 15 chars. Process entry manually.', process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    // Mark all records in the group as passed
                    for (const record of recordsInGroup) {
                        aPassedRecordIDs.push(record.ID);
                    }
                } catch (err) {
                    // Mark all records in the group as failed
                    for (const record of recordsInGroup) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error creating credit memo: ${err.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                    }
                }
            } else {
                // If no records in the group need step L, mark all as passed
                for (const record of recordsInGroup) {
                    aPassedRecordIDs.push(record.ID);
                }
            }
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);

            // Get all record IDs that need to be updated as passed (including group members)
            const allRecordIDsToUpdateAsPassed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aPassedRecordIDs
                if (recordsInGroup.some(record => aPassedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as passed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsPassed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsPassed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({
                        valid: true,
                        processLevel_code: sProcessCode
                    })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsPassed) } });
            }
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);

            // Get all record IDs that need to be updated as failed (including group members)
            const allRecordIDsToUpdateAsFailed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aFailedRecordIDs
                if (recordsInGroup.some(record => aFailedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as failed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsFailed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsFailed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({ valid: false, processLevel_code: sProcessCode })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsFailed) } });
            }
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step M (Create Credit Memo for Intercompany)
    async CreateCRMEMOIC(sProcessCode) {
        const aRecordsForProcessing = [];
        const aPassedRecordIDs = [];
        const aFailedRecordIDs = [];
        const aSkippedRecords = [];
        const aErrorLogs = [];

        for (const record of this.records) {
            try {
                if (record.varIC === 'X' && record.salesOrderICSAP && record.salesOrderICSAP.trim() !== '') {
                    // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'M', createdAt: new Date() });
                    // await this._deletePreviousSteps(record.ID, 'M');
                    aPassedRecordIDs.push(record.ID);
                } else {
                    aSkippedRecords.push(record.ID);
                }
            } catch (err) {
                aErrorLogs.push({
                    record_ID: record.ID,
                    message: `Error creating intercompany credit memo: ${err.message}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(record.ID);
            }
        }
        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);
            await UPDATE(Fg_Credit_Rebill)
                .set({
                    valid: true,
                    processLevel_code: sProcessCode
                })
                .where({ ID: { in: aPassedRecordIDs } });
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await UPDATE(Fg_Credit_Rebill)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step N (Create Credit MIRO)
    async CreditMIRO(sProcessCode) {
        const aRecordsForProcessing = [];
        const aPassedRecordIDs = [];
        const aFailedRecordIDs = [];
        const aSkippedRecords = [];
        const aErrorLogs = [];

        // Group records by composite key (3-4 fields)
        const groupedRecords = this.records.reduce((groups, record) => {
            const key = `${record.fgInvoiceOrgID}|${record.fgWorkOrderID}|${record.fgInvoiceID}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(record);
            return groups;
        }, {});

        for (const groupKey in groupedRecords) {
            const recordsInGroup = groupedRecords[groupKey];

            // Process each group - if any record in the group needs step N, process the group
            const needsProcessing = recordsInGroup.some(record =>
                record.creditSteps && record.creditSteps.split(',').includes('N')
            );

            if (needsProcessing) {
                // Get the first record from the group for processing (assuming all records in group have same SAP data)
                const representativeRecord = recordsInGroup[0];

                try {
                    // Query 1: Get sales order and item number using invoice number
                    // const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                    //     SELECT.from('A_SalesOrderItem')
                    //         .columns(['SalesOrder', 'SalesOrderItem'])
                    //         .where({ YY1_WNInvoice_SD_SDI: representativeRecord.wnInvoiceNo })
                    // );

                    // if (!salesOrderItemResult || !salesOrderItemResult.length) {
                    //     // Mark all records in the group as failed
                    //     for (const record of recordsInGroup) {
                    //         aErrorLogs.push({
                    //             record_ID: record.ID,
                    //             message: `No sales order item found for invoice ${representativeRecord.wnInvoiceNo}`
                    //         });
                    //         aFailedRecordIDs.push(record.ID);
                    //     }
                    //     continue;
                    // }

                    // const salesOrder = salesOrderItemResult[0].SalesOrder;
                    // const salesOrderItem = salesOrderItemResult[0].SalesOrderItem;

                    // Query 2: Get purchase order using sales order and item 0010
                    // const purchaseOrderResult = await this.salesOrderAPI.executeQuery(
                    //     SELECT.from('A_SalesOrderItem')
                    //         .columns(['YY1_PurchasingDoc_SD_SDI'])
                    //         .where({
                    //             and: [
                    //                 { SalesOrder: salesOrder },
                    //                 { SalesOrderItem: '000010' }
                    //             ]
                    //         })
                    // );

                    // if (!purchaseOrderResult || !purchaseOrderResult.length) {
                    //     // Mark all records in the group as failed
                    //     for (const record of recordsInGroup) {
                    //         aErrorLogs.push({
                    //             record_ID: record.ID,
                    //             message: `No purchase order found for sales order ${salesOrder}`
                    //         });
                    //         aFailedRecordIDs.push(record.ID);
                    //     }
                    //     continue;
                    // }

                    // const purchaseOrder = purchaseOrderResult[0].YY1_PurchasingDoc_SD_SDI;

                    // Query 3: Get SupplierInvoice using PurchaseOrder and PurchaseOrderItem
                    const supplierInvoiceResult = await this.supplierInvoiceAPI.executeQuery(
                        SELECT.from('A_SuplrInvcItemPurOrdRef')
                            .columns(['SupplierInvoice', 'SupplierInvoiceItem'])
                            .where({
                                
                                     PurchaseOrder: representativeRecord.purchaseDocumentNoSAP ,
                                     PurchaseOrderItem: representativeRecord.purchaseDocumentItemSAP 
                                
                            })
                    );

                    if (!supplierInvoiceResult || !supplierInvoiceResult.length) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                process_code: sProcessCode,
                                message: `No supplier invoice found for purchase order ${record.purchaseDocumentNoSAP} and item ${record.purchaseDocumentItemSAP}`
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    const supplierInvoice = supplierInvoiceResult[0].SupplierInvoice;
                    const supplierInvoiceItem = supplierInvoiceResult[0].SupplierInvoiceItem;

                    // Store the values in the representative record
                    // representativeRecord.purchaseDocumentNoSAP = purchaseOrder;
                    // representativeRecord.purchaseDocumentItemSAP = salesOrderItem;
                    representativeRecord.supplierInvoiceSAP = supplierInvoice;
                    representativeRecord.supplierInvoiceItemSAP = supplierInvoiceItem;

                    // Get current date in the required format
                    const currentDate = new Date();
                    const fiscalYear = currentDate.getFullYear().toString();
                    const dateString = `/Date(${currentDate.getTime()})/`;

                    // Query 4: Get Supplier Invoice details
                    const supplierInvoiceDetails = await this.supplierInvoiceAPI.executeQuery(
                        SELECT.from('A_SupplierInvoice')
                            .columns([
                                'CompanyCode',
                                'SupplierInvoiceIsCreditMemo',
                                'SupplierInvoiceIDByInvcgParty',
                                'InvoicingParty',
                                'DocumentCurrency',
                                'InvoiceGrossAmount',
                                'PaymentTerms',
                                'AccountingDocumentType',
                                // 'Plant',
                                // 'TaxCode',
                                // 'TaxJurisdiction',
                                'SupplierInvoiceItemAmount',
                                'PurchaseOrderQuantityUnit',
                                'PurchaseOrderQtyUnitSAPCode',
                                'PurchaseOrderQtyUnitISOCode',
                                'QuantityInPurchaseOrderUnit',
                                'DocumentHeaderText',
                                'AssignmentReference',
                                'BusinessArea'
                            ])
                            .where({
                                SupplierInvoice: supplierInvoice,
                                FiscalYear: fiscalYear
                            })
                    );

                    if (!supplierInvoiceDetails || !supplierInvoiceDetails.length) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No details found for supplier invoice ${supplierInvoice}`,
                                process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }

                    const invoiceDetails = supplierInvoiceDetails[0];

                    // Call the credit MIRO endpoint
                    const creditMIROData = {
                        CompanyCode: invoiceDetails.CompanyCode,
                        DocumentDate: dateString,
                        PostingDate: dateString,
                        SupplierInvoiceIsCreditMemo: true,
                        SupplierInvoiceIDByInvcgParty: representativeRecord.wnInvoiceNo + '-C', // Credit invoice ID
                        InvoicingParty: invoiceDetails.InvoicingParty,
                        DocumentCurrency: invoiceDetails.DocumentCurrency,
                        InvoiceGrossAmount: invoiceDetails.InvoiceGrossAmount,
                        DueCalculationBaseDate: dateString,
                        PaymentTerms: invoiceDetails.PaymentTerms,
                        AccountingDocumentType: 'RE',
                        // Plant: invoiceDetails.Plant,
                        // TaxCode: invoiceDetails.TaxCode,
                        // TaxJurisdiction: invoiceDetails.TaxJurisdiction,
                        to_SuplrInvcItemPurOrdRef: [{
                            SupplierInvoiceItem: supplierInvoiceItem,
                            PurchaseOrder: purchaseOrder,
                            PurchaseOrderItem: salesOrderItem,
                            SupplierInvoiceItemAmount: invoiceDetails.SupplierInvoiceItemAmount,
                            PurchaseOrderQuantityUnit: invoiceDetails.PurchaseOrderQuantityUnit,
                            PurchaseOrderQtyUnitSAPCode: invoiceDetails.PurchaseOrderQtyUnitSAPCode,
                            PurchaseOrderQtyUnitISOCode: invoiceDetails.PurchaseOrderQtyUnitISOCode,
                            QuantityInPurchaseOrderUnit: invoiceDetails.QuantityInPurchaseOrderUnit,
                            DocumentHeaderText: invoiceDetails.DocumentHeaderText
                        }]
                    };

                    const createResult = await this.supplierInvoiceAPI.createSupplierInvoice(creditMIROData);

                    if (createResult.success) {
                        // Mark all records in the group as passed
                        for (const record of recordsInGroup) {
                            await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'N', createdAt: new Date() });
                            await this._deletePreviousSteps(record.ID, 'N');
                            aPassedRecordIDs.push(record.ID);
                        }
                    } else {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error creating credit MIRO: ${createResult.message}`,
                                process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                    }
                } catch (err) {
                    // Mark all records in the group as failed
                    for (const record of recordsInGroup) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error creating credit MIRO: ${err.message}`,process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                    }
                }
            } else {
                // If no records in the group need step N, mark all as passed
                for (const record of recordsInGroup) {
                    aPassedRecordIDs.push(record.ID);
                }
            }
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);

            // Get all record IDs that need to be updated as passed (including group members)
            const allRecordIDsToUpdateAsPassed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aPassedRecordIDs
                if (recordsInGroup.some(record => aPassedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as passed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsPassed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsPassed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({
                        valid: true,
                        processLevel_code: sProcessCode
                    })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsPassed) } });
            }
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);

            // Get all record IDs that need to be updated as failed (including group members)
            const allRecordIDsToUpdateAsFailed = new Set();

            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];

                // Check if AT LEAST ONE record in the group is in aFailedRecordIDs
                if (recordsInGroup.some(record => aFailedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as failed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsFailed.add(record.ID);
                    });
                }
            }

            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsFailed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({ valid: false, processLevel_code: sProcessCode })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsFailed) } });
            }
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step O (Delete Partner Function) or P (Delete Partner Function for IC)
    async DeletePF(sProcessCode) {
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
  
        // Group records by composite key (3-4 fields)
        const groupedRecords = this.records.reduce((groups, record) => {
            const key = `${record.fgInvoiceOrgID}|${record.fgWorkOrderID}|${record.fgInvoiceID}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(record);
            return groups;
        }, {});
  
        for (const groupKey in groupedRecords) {
            const recordsInGroup = groupedRecords[groupKey];
            
            // Process each group - if any record in the group needs step O, process the group
            const needsProcessing = recordsInGroup.some(record => 
                record.creditSteps && record.creditSteps.split(',').includes('O')
            );
  
            if (needsProcessing) {
                
                const representativeRecord = recordsInGroup[0];
                
                try {
                    const step = 'O';
                    const VAR_SO = representativeRecord.fgWorkOrderID;
  
                    // 1. Get Customer Number from sales order header
                    const salesOrderResult = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrder')
                            .columns(['SalesOrder', 'Customer'])
                            .where({ SalesOrder: VAR_SO })
                    );
  
                    if (!salesOrderResult || !salesOrderResult.length) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Sales Order ${VAR_SO} not found`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }
  
                    const customerNumber = salesOrderResult[0].Customer;
  
                    // 2. Get Group Invoice from Customer Master
                    const customerResult = await this.businesPartnerAPI.executeQuery(
                        SELECT.from('A_BusinessPartner')
                            .columns(['BusinessPartner'])
                            .where({ BusinessPartner: customerNumber })
                    );
  
                    if (!customerResult || !customerResult.length) {
                        // Mark all records in the group as failed
                        for (const record of recordsInGroup) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Customer ${customerNumber} not found`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                        continue;
                    }
  
                   
                    const groupInvoice = true; // or check a specific field if available
  
                    // 3. If Group Invoice exists, proceed with partner function removal
                    if (groupInvoice) {
                        // 3.1 Remove Employee Number from partner function
                        const employeePartnerResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderHeaderPartner')
                                .columns(['SalesOrder', 'PartnerFunction', 'Personnel'])
                                .where({
                                    and: [
                                        { SalesOrder: VAR_SO },
                                        { PartnerFunction: 'Z3' }
                                    ]
                                })
                        );
  
                        if (employeePartnerResult && employeePartnerResult.length > 0) {
                            try {
                                const deleteEmployeeResult = await this.salesOrderAPI.deleteSalesOrderPartners([{
                                    SalesOrder: VAR_SO,
                                    PartnerFunction: 'Z3',
                                    Personnel: employeePartnerResult[0].Personnel
                                }]);
  
                                if (!deleteEmployeeResult || deleteEmployeeResult.length === 0 || deleteEmployeeResult[0].hasError) {
                                    // Mark all records in the group as failed
                                    for (const record of recordsInGroup) {
                                        aErrorLogs.push({
                                            record_ID: record.ID,
                                            process_code: sProcessCode,
                                            message: `Failed to remove employee partner function: ${deleteEmployeeResult?.[0]?.reason || 'Unknown error'}`
                                        });
                                        aFailedRecordIDs.push(record.ID);
                                    }
                                    continue;
                                }
                            } catch (deleteErr) {
                                // Mark all records in the group as failed
                                for (const record of recordsInGroup) {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        process_code: sProcessCode,
                                        message: `Error removing employee partner function: ${deleteErr.message}`
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                }
                                continue;
                            }
                        }
  
                        // 3.2 Get Sales Order/Item/Partner Function/Vendor details
                        const partnerResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderHeaderPartner')
                                .columns(['SalesOrder', 'PartnerFunction', 'Supplier'])
                                .where({
                                    and: [
                                        { SalesOrder: VAR_SO },
                                        { PartnerFunction: { in: ['ZR', 'ZV'] } }
                                    ]
                                })
                        );
  
                        // 3.3 Remove specific vendor line
                        if (partnerResult && partnerResult.length > 0) {
                            for (const partner of partnerResult) {
                                if (partner.Supplier === representativeRecord.lifnrZR && partner.PartnerFunction === representativeRecord.partnerFunctionSAP) {
                                    try {
                                        const deletePartnerResult = await this.salesOrderAPI.deleteSalesOrderPartners([{
                                            SalesOrder: VAR_SO,
                                            PartnerFunction: partner.PartnerFunction,
                                            Supplier: partner.Supplier
                                        }]);
  
                                        if (!deletePartnerResult || deletePartnerResult.length === 0 || deletePartnerResult[0].hasError) {
                                            // Mark all records in the group as failed
                                            for (const record of recordsInGroup) {
                                                aErrorLogs.push({
                                                    record_ID: record.ID,
                                                    process_code: sProcessCode,
                                                    message: `Failed to remove vendor partner function: ${deletePartnerResult?.[0]?.reason || 'Unknown error'}`
                                                });
                                                aFailedRecordIDs.push(record.ID);
                                            }
                                            continue;
                                        }
                                    } catch (deleteErr) {
                                        // Mark all records in the group as failed
                                        for (const record of recordsInGroup) {
                                            aErrorLogs.push({
                                                record_ID: record.ID,
                                                process_code: sProcessCode,
                                                message: `Error removing vendor partner function: ${deleteErr.message}`
                                            });
                                            aFailedRecordIDs.push(record.ID);
                                        }
                                        continue;
                                    }
                                }
                            }
                        }
  
                        // 3.4 Remove all entries from credit memo if any exist
                        const creditMemoResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem')
                                .columns(['SalesOrder', 'SalesOrderItem', 'OrderRelatedBillingStatus'])
                                .where({
                                    and: [
                                        { SalesOrder: VAR_SO },
                                        { OrderRelatedBillingStatus: 'C' }
                                    ]
                                })
                        );
  
                        if (creditMemoResult && creditMemoResult.length > 0) {
                            
                            LOG.info(`Found ${creditMemoResult.length} credit memo items for Sales Order ${VAR_SO}. These cannot be deleted via API.`);
                            
                            // Optionally, you could update them to mark for deletion instead:
                            // for (const creditMemo of creditMemoResult) {
                            //     await this.salesOrderAPI.updateSalesOrderItem({
                            //         SalesOrder: VAR_SO,
                            //         SalesOrderItem: creditMemo.SalesOrderItem,
                            //         // Add appropriate fields to mark for deletion
                            //     });
                            // }
                        }
                    }
  
                    // If we reach here, all operations were successful
                    // Mark all records in the group as passed
                    for (const record of recordsInGroup) {
                        await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step, createdAt: new Date() });
                        await this._deletePreviousSteps(record.ID, step);
                        aPassedRecordIDs.push(record.ID);
                    }
  
                } catch (err) {
                    // Mark all records in the group as failed
                    for (const record of recordsInGroup) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error in DeletePF: ${err.message}`,
                            process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                    }
                }
            } else {
                // If no records in the group need step O, mark all as passed
                for (const record of recordsInGroup) {
                    aPassedRecordIDs.push(record.ID);
                }
            }
        }
  
        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs);
            
            // Get all record IDs that need to be updated as passed (including group members)
            const allRecordIDsToUpdateAsPassed = new Set();
            
            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];
                
                // Check if AT LEAST ONE record in the group is in aPassedRecordIDs
                if (recordsInGroup.some(record => aPassedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as passed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsPassed.add(record.ID);
                    });
                }
            }
            
            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsPassed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({
                        valid: true,
                        processLevel_code: sProcessCode
                    })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsPassed) } });
            }
        }
  
        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            
            // Get all record IDs that need to be updated as failed (including group members)
            const allRecordIDsToUpdateAsFailed = new Set();
            
            for (const groupKey in groupedRecords) {
                const recordsInGroup = groupedRecords[groupKey];
                
                // Check if AT LEAST ONE record in the group is in aFailedRecordIDs
                if (recordsInGroup.some(record => aFailedRecordIDs.includes(record.ID))) {
                    // If yes, add ALL record IDs from that group to be updated as failed
                    recordsInGroup.forEach(record => {
                        allRecordIDsToUpdateAsFailed.add(record.ID);
                    });
                }
            }
            
            // Update all collected IDs at once
            if (allRecordIDsToUpdateAsFailed.size > 0) {
                await UPDATE(Fg_Credit_Rebill)
                    .set({ valid: false, processLevel_code: sProcessCode })
                    .where({ ID: { in: Array.from(allRecordIDsToUpdateAsFailed) } });
            }
        }
  
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    async markRecordsValid(processCode, recordIDs = [], valid = false, additionalFields = {}) {
        try {
            const updateData = { valid, processLevel_code: processCode, ...additionalFields };
            await UPDATE(this.recordsEntity)
                .set(updateData)
                .where({ ID: { in: recordIDs } });
            return true;
        } catch (err) {
            this.LOG._error && this.LOG.error(`Records couldn't be marked, ${err.message}`);
            return false;
        }
    }
}

module.exports = FgCreditRebill;
