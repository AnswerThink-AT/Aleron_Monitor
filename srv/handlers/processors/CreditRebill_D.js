//Interface Q
const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Procesor-CreditRebill');
const moment = require('moment');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');
const SalesContractComm = require('../communicators/SalesContract');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SalesOrderComm = require('../communicators/SalesOrder');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const SupplierInvoiceComm = require('../communicators/SupplierInvoice');
const CreditMemoRequestComm = require('../communicators/CreditMemo');
const PurchaseOrderComm = require('../communicators/PurchaseOrder');
// Import SOAP service for Journal Entry
const { journalServicePromise, journalServiceEndpoint } = require('../../lib/handlers');

// Utility functions
const { toODataDate, toEmployeeType, todateConvert_Project } = require('../common/utils');

// List of required entities
const {
    Files,
    Credit_Rebill,
    Credits_for_LegacyInvoices,
    InterfaceSteps,
    FieldValidations,
    FieldValidations: {
        elements: {
            validation: { enum: mFieldValidationTypeEnum },
        },
    },
} = cds.entities('com.aleron.monitor');

class CreditFG extends Processor {
    constructor(options) {
        super(options);

        // Processor Specific configuration
        this.recordsEntity = 'com.aleron.monitor.Credit_Rebill';
        this.LOG = cds.log('Monitor.Procesor-Credit_Rebill');
        this.columnsForRecords = this._getColumnsForFetch(this.recordsEntity);

        this.salesContractAPI = null;
        this.businesPartnerAPI = null;
        this.countryRegionAPI = null;
        this.salesOrderAPI = null;
        this.salesOrderV2API = null;
        this.billingTypeAPI = null;
        this.creditMemoRequestAPI = null;
        this.salesOrderDetails = {};
        this.purchaseOrderAPI = null;
    }

    prepareCommunicators() {
        this.LOG._info && this.LOG.info('Preparing Communicators');
        // this.salesContractAPI = new SalesContractComm();
        this.businesPartnerAPI = new BusinessPartnerComm();
        this.salesOrderAPI = new SalesOrderComm();
        // this.enterpriseProjectAPI = new EnterpriseProjectComm();
        // this.empCustInfoAPI = new EmpCustInfoComm();
        // this.workforceAPI = new WorkforceComm();
        // this.billingTypeAPI = new BillingTypeComm();
        // this.countryRegionAPI = new CountryRegionComm();
        this.supplierInvoiceAPI = new SupplierInvoiceComm();
        this.creditMemoRequestAPI = new CreditMemoRequestComm();
        this.purchaseOrderAPI = new PurchaseOrderComm();;
    }

    _getColumnsForFetch(sEntity) {
        const mEntityColumns = {
            'com.aleron.monitor.Credit_Rebill': [
                ...['ID', 'file_ID', 'processLevel_code', 'valid'],

                // Entity specific fields
                'wnInvoiceNo',
                'wnWorkOrderNo',
                'woType',
                'wnInvalidationInvNo',

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
                'projectNumberICSAP'
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

        // Get the database service instance
        const db = await cds.connect.to('db');

        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);

        for (const record of this.records) {
            if (this.shouldRecordProcess(record, sProcessCode)) {
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


        const [
            // { reason: anySalesOrderErr, value: aSalesOrders_I },
            // { reason: anySalesContractHeaderErr, value: aSalesHeaders },
            // { reason: anySalesContractItemErr, value: aSalesItems },
            { reason: anyFieldValidationErr, value: aFieldValidations }
        ] = await Promise.allSettled([
            // this.salesOrderAPI.executeQuery(
            //     SELECT.from('A_SalesOrderItem')
            //         .columns(['SalesOrder', 'SalesOrderItem', 'YY1_WNWorkOrder_SD_SDI', 'ItemCategory', 'YY1_PurchasingDoc_SD_SDI', 'YY1_WNInvoice_SD_SDI',
            //             'OrderRelatedBillingStatus', 'YY1_WNWorkOrder_SD_SDI', 'WBSElement', 'YY1_WeekEnd_SD_SDI', 'AdditionalMaterialGroup3', 'SalesDocumentRjcnReason'])
            //         .where({
            //             YY1_WNWorkOrder_SD_SDI: { in: aRecordsForProcessing.map(record => record.wnWorkOrderNo) }
            //         })
            // ),
            // this.salesOrderAPI.executeQuery(
            //     SELECT.from('A_SalesOrder')
            //         .columns(['SalesOrder', 'DistributionChannel', 'ZWOTYPE'])
            //         .where({
            //             YY1_WNWorkOrder_SD_SD: { in: aRecordsForProcessing.map(record => record.wnWorkOrderNo) }
            //         })
            // ),
            // this.salesOrderAPI.executeQuery(
            //     SELECT.from('A_SalesOrderItem')
            //         .columns(['SalesOrder', 'SalesOrderItem', 'ItemCategory', 'YY1_PurchasingDoc_SD_SDI', 'YY1_WNInvoice_SD_SDI',
            //             'OrderRelatedBillingStatus', 'YY1_WNWorkOrder_SD_SDI', 'WBSElement', 'YY1_WeekEnd_SD_SDI', 'AdditionalMaterialGroup3', 'SalesDocumentRjcnReason'])
            //         .where({
            //             and: [
            //                 { YY1_WNWorkOrder_SD_SDI: { in: aRecordsForProcessing.map(record => record.wnWorkOrderNo) } },
            //                 { SalesOrderItem: '000010' },
            //                 { ItemCategory: 'TADN' }
            //             ]
            //         })
            // ),

            SELECT.from(FieldValidations)
                .columns(['field', 'validation'])
                .where({
                    interfaceType_ID: this.file.interfaceType_ID,
                    validation: {
                        in: [mFieldValidationTypeEnum.blank.val, mFieldValidationTypeEnum.mandatory.val]
                    }
                })
        ]);

        // if (anySalesOrderErr) {
        //     LOG._error && LOG.error(anySalesOrderErr.message); // Sales Order Not Found For WN WorkOrder
        // }

        // if (anySalesContractHeaderErr) {
        //     LOG._error && LOG.error(anySalesContractHeaderErr.message);
        // }

        // if (anySalesContractItemErr) {
        //     LOG._error && LOG.error(anySalesContractItemErr.message);
        // }

        if (anyFieldValidationErr) {
            LOG._error && LOG.error(anyFieldValidationErr.message);
        }

        // Add partner function validation
        // const [
        //     { reason: anyEmployeePartnerErr, value: aEmployeePartners },
        //     { reason: anyVendorPartnerErr, value: aVendorPartners }
        // ] = await Promise.allSettled([
        //     // Get employee records from partner function table
        //     this.salesOrderAPI.executeQuery(
        //         SELECT.from('A_SalesOrderHeaderPartner')
        //             .columns(['SalesOrder', 'PartnerFunction', 'Personnel'])
        //             .where({
        //                 and: [
        //                     { SalesOrder: { in: aRecordsForProcessing.map(record => record.wnWorkOrderNo) } },
        //                     { PartnerFunction: 'Z3' }
        //                 ]
        //             })
        //     ),
        //     // Get vendor records from partner function table
        //     this.salesOrderAPI.executeQuery(
        //         SELECT.from('A_SalesOrderHeaderPartner')
        //             .columns(['SalesOrder', 'PartnerFunction', 'Supplier'])
        //             .where({
        //                 and: [
        //                     { SalesOrder: { in: aRecordsForProcessing.map(record => record.wnWorkOrderNo) } },
        //                     { PartnerFunction: { in: ['ZV', 'ZR'] } }
        //                 ]
        //             })
        //     )
        // ]);

        // if (anyEmployeePartnerErr) {
        //     LOG._error && LOG.error(anyEmployeePartnerErr.message);
        // }

        // if (anyVendorPartnerErr) {
        //     LOG._error && LOG.error(anyVendorPartnerErr.message);
        // }

        // Create sets for mandatory and blank field validations
        const stMandatoryFields = new Set(
            aFieldValidations.flatMap((record) =>
                record.validation === mFieldValidationTypeEnum.mandatory.val ? record.field : []
            )
        );
        const stBlankFields = new Set(
            aFieldValidations.flatMap((record) =>
                record.validation === mFieldValidationTypeEnum.blank.val ? record.field : []
            )
        );



        // Create sets for mandatory and blank field validations
        // const stMandatoryFields = new Set();
        // const stBlankFields = new Set();

        for (const record of aRecordsForProcessing) {
            let hasRecordFailed = false;
            let steps = [];
            let correspondingHeader = null;
            let VAR_SO_IC = null;
            let VAR_wnInvoiceNo = null;
            let isCP_CR_Processed = false;
            let isMS_SC_Processed = false;
            // Check field validations
            const oFieldValidationRes = this._validateFieldValidations({
                stMandatoryFields,
                stBlankFields,
                oRecord: record
            });
            if (oFieldValidationRes.hasError) {
                
                aErrorLogs.push(...oFieldValidationRes.errors);
                aErrorLogs = aErrorLogs.map(err => ({ ...err, process_code: sProcessCode }));
                aFailedRecordIDs.push(record.ID);
                hasRecordFailed = true;
            }

            if (!hasRecordFailed && record.wnInvoiceNo) {
                try {
                    const creditMemoRequestItemResult = await this.creditMemoRequestAPI.executeQuery(
                        SELECT.from('A_CreditMemoRequestItem')
                            .columns(['CreditMemoRequest', 'CreditMemoRequestItem'])
                            .where({ YY1_WNInvoice_SD_SDI: record.wnInvoiceNo })
                    );

                    if (creditMemoRequestItemResult && creditMemoRequestItemResult.length > 0) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Credit memo request item already exists for WN Invoice ${record.wnInvoiceNo}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        hasRecordFailed = true;
                    }
                } catch (error) {
                    LOG._error && LOG.error(`Error checking A_CreditMemoRequestItem: ${error.message}`);
                }
            }

            // Add ZWOTYPE validation for MS and SC
            if (!hasRecordFailed && (record.woType === 'MS' || record.woType === 'SC')) {

                record.isMS_SC_Processed = true;
                // 1. Get actual SalesOrder number from A_SalesOrderItem
                const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder'])
                        .where({ YY1_WNWorkOrder_SD_SDI: record.wnWorkOrderNo })
                );
                const actualSalesOrder = salesOrderItemResult[0].SalesOrder;
                // Get sales order header details
                const salesOrderHeaderResult = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns([
                            'SalesOrder',
                            'SoldToParty',
                            'SalesOrganization',
                            'DistributionChannel',
                            'CustomerGroup',
                            'CustomerPriceGroup',
                            'YY1_AlphanumericSalesO_SDH'
                        ])
                        .where({ SalesOrder: actualSalesOrder })
                );

                if (!salesOrderHeaderResult || !salesOrderHeaderResult.length) {
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: 'Sales Order not found.', process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                    hasRecordFailed = true;
                } else {
                    const salesOrderHeader = salesOrderHeaderResult[0];
                    record.salesDocumentNoSAP = salesOrderHeader.SalesOrder;
                    if (salesOrderHeader.DistributionChannel !== record.woType) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: 'ZWOTYPE does not match with the WO Type in SAP.', process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        hasRecordFailed = true;
                    } else {
                        // Get sales order item details
                        const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem')
                                .columns([
                                    'SalesOrder',
                                    'SalesOrderItem',
                                    'SalesDocumentRjcnReason',
                                    'OrderRelatedBillingStatus',
                                    'YY1_WNInvoice_SD_SDI',
                                    'Material',
                                    'WBSElement',
                                    'AdditionalMaterialGroup3',
                                    'YY1_PurchasingDoc_SD_SDI',
                                    'UnderlyingPurchaseOrderItem'
                                ])
                                .where({ SalesOrder: salesOrderHeader.SalesOrder })
                        );

                        if (!salesOrderItemResult || !salesOrderItemResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'Sales Order Item not found.', process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            hasRecordFailed = true;
                        } else {
                            // Store the sales order item details in the record
                            const salesOrderItem = salesOrderItemResult[0];
                            // record.salesDocumentNoSAP = salesOrderItem.SalesOrder;
                            // record.salesItemNoSAP = salesOrderItem.SalesOrderItem;
                            // record.salesDocumentRjcnReasonSAP = salesOrderItem.SalesDocumentRjcnReason;
                            // record.orderRelatedBillingStatusSAP = salesOrderItem.OrderRelatedBillingStatus;
                            // record.invoiceNoWNSAP = salesOrderItem.YY1_WNInvoice_SD_SDI;
                            // record.materialSAP = salesOrderItem.Material;
                            // record.projectNumberSAP = salesOrderItem.WBSElement;
                            record.materialGroup3SAP = salesOrderItem.AdditionalMaterialGroup3;
                            // record.purchaseDocumentNoSAP = salesOrderItem.YY1_PurchasingDoc_SD_SDI;

                            // Handle invoice number validation and assignment wnInvalidationInvNo                            
                            if (record.invalidInvoiceNoWNSAP && record.invalidInvoiceNoWNSAP.trim() !== '') {
                                if (record.invalidInvoiceNoWNSAP !== record.wnInvoiceNo) {
                                    record.invoiceNoWNSAP = record.invalidInvoiceNoWNSAP;
                                } else {
                                    record.invoiceNoWNSAP = record.wnInvoiceNo + '-C';
                                }
                            } else {
                                record.invoiceNoWNSAP = record.wnInvoiceNo + '-C';
                            }

                            // Step 5: Check for existing credit invoices if process code is not O, P, N, M, 8, or 9
                            if (!['O', 'P', 'N', 'M', '8', '9'].includes(sProcessCode)) {
                                // Use existing salesOrderItemResult instead of making a new query
                                const existingCreditInvoice = salesOrderItemResult.find(item =>
                                    item.YY1_WNInvoice_SD_SDI === record.invoiceNoWNSAP
                                );

                                if (existingCreditInvoice) {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: 'Credit Invoice already exists.', process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                }
                            }

                            // Check if WN Invoice Number exists in Sales Order Items using existing result
                            const matchingInvoice = salesOrderItemResult.find(item => item.YY1_WNInvoice_SD_SDI === record.wnInvoiceNo);
                            // if (!matchingInvoice) {
                            //     aErrorLogs.push({
                            //         record_ID: record.ID,
                            //         message: `WN Invoice number ${record.wnInvoiceNo} does not exist in SO ${salesOrderHeader.SalesOrder}. Possible Legacy Invoice.`
                            //     });
                            //     aFailedRecordIDs.push(record.ID);
                            //     hasRecordFailed = true;
                            // }
                            if (!matchingInvoice) {
                                // Search in Credits_for_LegacyInvoices entity for legacy invoice data
                                const legacyInvoiceResult = await SELECT.from(Credits_for_LegacyInvoices)
                                    .columns(['salesOrder', 'salesOrderItem', 'purchaseOrder', 'purchaseOrderItem'])
                                    .where({ zzInvoice: record.wnInvoiceNo });

                                if (legacyInvoiceResult && legacyInvoiceResult.length > 0) {
                                    const legacyInvoice = legacyInvoiceResult[0];
                                    // Use legacy invoice data
                                    record.salesDocumentNoSAP = legacyInvoice.salesOrder;
                                    record.salesItemNoSAP = legacyInvoice.salesOrderItem;
                                    record.purchaseDocumentNoSAP = legacyInvoice.purchaseOrder;
                                    record.purchaseDocumentItemSAP = legacyInvoice.purchaseOrderItem;

                                    // Continue processing with legacy data
                                    record.orderRelatedBillingStatusSAP = ''; // Set default for legacy invoices
                                    record.salesDocumentRjcnReasonSAP = ''; // Set default for legacy invoices

                                    steps.push('*');
                                    // Get corresponding header data from existing dataset
                                    correspondingHeader = salesOrderHeaderResult.find(header => header.SalesOrder === legacyInvoice.salesOrder);

                                    if (correspondingHeader) {
                                        // Check for ZM CustomerGroup and EXPENSE Material
                                        if (correspondingHeader.CustomerPriceGroup === 'ZM' && matchingInvoice?.Material === 'EXPENSE') {
                                            aErrorLogs.push({
                                                record_ID: record.ID,
                                                message: 'MBEWBE Expense. Please credit manually.', process_code: sProcessCode
                                            });
                                            aFailedRecordIDs.push(record.ID);
                                            hasRecordFailed = true;
                                        }
                                    }

                                    // Check partner function records for legacy invoice
                                    if (!hasRecordFailed) {
                                        const partnerRecords = await this.salesOrderAPI.executeQuery(
                                            SELECT.from('A_SalesOrderHeaderPartner')
                                                .columns(['SalesOrder', 'PartnerFunction', 'Personnel', 'Supplier'])
                                                .where({
                                                    SalesOrder: legacyInvoice.salesOrder,
                                                    PartnerFunction: { in: ['Z3', 'ZV', 'ZR'] }
                                                })
                                        );

                                        if (partnerRecords && partnerRecords.length > 0) {
                                            // Count ZV and ZR entries
                                            const zvRecords = partnerRecords.filter(p => p.PartnerFunction === 'ZV');
                                            const zrRecords = partnerRecords.filter(p => p.PartnerFunction === 'ZR');
                                            const z3Records = partnerRecords.filter(p => p.PartnerFunction === 'Z3');

                                            if ((zvRecords.length > 0 && zrRecords.length > 0) || zvRecords.length > 1 || zrRecords.length > 1) {
                                                aErrorLogs.push({
                                                    record_ID: record.ID,
                                                    message: 'More than two remit to vendor found.', process_code: sProcessCode
                                                });
                                                aFailedRecordIDs.push(record.ID);
                                                hasRecordFailed = true;
                                            } else if (zvRecords.length === 1 || zrRecords.length === 1 || z3Records.length === 1) {
                                                // Update fields based on which record type has exactly one entry
                                                if (zvRecords.length === 1) {
                                                    record.partnerFunctionSAP = zvRecords[0].PartnerFunction;
                                                    record.vendorZR = zvRecords[0].Supplier;
                                                }
                                                if (zrRecords.length === 1) {
                                                    record.partnerFunctionSAP = zrRecords[0].PartnerFunction;
                                                    record.vendorZR = zrRecords[0].Supplier;
                                                }
                                                if (z3Records.length === 1) {
                                                    record.personnelNoSAP = z3Records[0].Personnel;
                                                }
                                            }
                                        }
                                    }

                                    // Check if CustomerGroup is ZM for legacy invoice
                                    if (!hasRecordFailed && correspondingHeader && correspondingHeader.CustomerGroup === 'ZM') {
                                        record.creditRebillSAP = 'X';
                                    }

                                } else {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: `WN Invoice number ${record.wnInvoiceNo} does not exist in SO ${salesOrderHeader.SalesOrder} or in legacy invoices.`, process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                }
                            }

                            else {
                                record.orderRelatedBillingStatusSAP = matchingInvoice.OrderRelatedBillingStatus;
                                record.salesItemNoSAP = matchingInvoice.SalesOrderItem;
                                record.salesDocumentRjcnReasonSAP = matchingInvoice.SalesDocumentRjcnReason;
                                record.purchaseDocumentNoSAP = matchingInvoice.YY1_PurchasingDoc_SD_SDI;
                                record.purchaseDocumentItemSAP = matchingInvoice.SalesOrderItem;
                                // matchingInvoice.UnderlyingPurchaseOrderItem;
                                if ((sProcessCode === '1' || sProcessCode === 'H') &&
                                    matchingInvoice.SalesDocumentRjcnReason &&
                                    matchingInvoice.SalesDocumentRjcnReason.trim() !== '') {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: 'SO & Line item already rejected.', process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                }
                                // Get corresponding header data from existing dataset
                                correspondingHeader = salesOrderHeaderResult.find(header => header.SalesOrder === matchingInvoice.SalesOrder);

                                if (correspondingHeader) {
                                    // Check for ZM CustomerGroup and EXPENSE Material
                                    if (correspondingHeader.CustomerPriceGroup === 'ZM' && matchingInvoice.Material === 'EXPENSE') {
                                        aErrorLogs.push({
                                            record_ID: record.ID,
                                            message: 'MBEWBE Expense. Please credit manually.', process_code: sProcessCode
                                        });
                                        aFailedRecordIDs.push(record.ID);
                                        hasRecordFailed = true;
                                    }
                                }

                                // Check partner function records
                                if (!hasRecordFailed) {
                                    const partnerRecords = await this.salesOrderAPI.executeQuery(
                                        SELECT.from('A_SalesOrderHeaderPartner')
                                            .columns(['SalesOrder', 'PartnerFunction', 'Personnel', 'Supplier'])
                                            .where({

                                                SalesOrder: matchingInvoice.SalesOrder,
                                                PartnerFunction: { in: ['Z3', 'ZV', 'ZR'] }

                                            })
                                    );
                                    if (partnerRecords && partnerRecords.length > 0) {
                                        // Count ZV and ZR entries
                                        const zvRecords = partnerRecords.filter(p => p.PartnerFunction === 'ZV');
                                        const zrRecords = partnerRecords.filter(p => p.PartnerFunction === 'ZR');
                                        const z3Records = partnerRecords.filter(p => p.PartnerFunction === 'Z3');

                                        if ((zvRecords.length > 0 && zrRecords.length > 0) || zvRecords.length > 1 || zrRecords.length > 1) {
                                            aErrorLogs.push({
                                                record_ID: record.ID,
                                                message: 'More than two remit to vendor found.', process_code: sProcessCode
                                            });
                                            aFailedRecordIDs.push(record.ID);
                                            hasRecordFailed = true;
                                        } else if (zvRecords.length === 1 || zrRecords.length === 1 || z3Records.length === 1) {
                                            // Update fields based on which record type has exactly one entry
                                            if (zvRecords.length === 1) {
                                                record.partnerFunctionSAP = zvRecords[0].PartnerFunction;
                                                record.vendorZR = zvRecords[0].Supplier;
                                            }
                                            if (zrRecords.length === 1) {
                                                record.partnerFunctionSAP = zrRecords[0].PartnerFunction;
                                                record.vendorZR = zrRecords[0].Supplier;
                                            }
                                            if (z3Records.length === 1) {
                                                record.personnelNoSAP = z3Records[0].Personnel;
                                            }
                                        }
                                    }
                                }

                                // Check if CustomerGroup is ZM
                                if (!hasRecordFailed && correspondingHeader && correspondingHeader.CustomerGroup === 'ZM') {
                                    record.creditRebillSAP = 'X';
                                }

                                // Check length of SAP_WN_INV
                                if (!hasRecordFailed && record.invoiceNoWNSAP && record.invoiceNoWNSAP.length > 15) {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: 'Credit WN inv # cannot exceed 15 chars. Process entry manually.', process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                }
                            }
                        }
                    }
                }
                // Add - H
                if (record.orderRelatedBillingStatusSAP === 'A' || (record.orderRelatedBillingStatusSAP === '' && sProcessCode === '1')) {
                    // record.email = 'H'; // Or call Add-H logic here
                    steps.push('H');
                    if ((record.woType === 'MS' || record.woType === 'SC') &&
                        (!record.materialGroup3SAP || record.materialGroup3SAP === '') &&
                        correspondingHeader && correspondingHeader.CustomerGroup !== 'ZM') {
                        // record.email = 'J/K'; // Or call Add-J/K logic here
                        steps.push('J');
                        steps.push('K');
                    }
                }

                // Add J / K (second row, with GV_IC placeholder)
                if (record.orderRelatedBillingStatusSAP === '' &&
                    (!record.GV_IC || record.GV_IC === '') && // Replace GV_IC with actual field if needed
                    (!record.materialGroup3SAP || record.materialGroup3SAP === '') &&
                    (record.woType === 'MS' || record.woType === 'SC') &&
                    correspondingHeader && correspondingHeader.CustomerGroup !== 'ZM') {
                    // record.email = 'J/K'; // Or call Add-J/K logic here
                    steps.push('J');
                    steps.push('K');
                }

                // Add L / O
                if (record.orderRelatedBillingStatusSAP === 'C') {
                    // record.email = 'L/O'; // Or call Add-L/O logic here
                    steps.push('L');
                    steps.push('O');
                    if (!record.materialGroup3SAP || record.materialGroup3SAP === '') {
                        // record.email = 'N'; // Or call Add-N logic here
                        steps.push('N');
                    }
                }

                // Add N

                record.creditSteps = steps.join(',');
                if (!hasRecordFailed) {
                    aPassedRecordIDs.push(record.ID);
                }
            }

            if (!hasRecordFailed && (record.woType === 'CP' || record.woType === 'CR')) {
                record.isCP_CR_Processed = true;
                // Step 1: Get sales order number from sales order item table
                const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder'])
                        .where({ YY1_WNWorkOrder_SD_SDI: record.wnWorkOrderNo })
                );

                if (!salesOrderItemResult || !salesOrderItemResult.length) {
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: `No sales order found for work order ${record.wnWorkOrderNo}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                    hasRecordFailed = true;
                } else {
                    const salesOrder = salesOrderItemResult[0].SalesOrder;
                    record.salesDocumentNoSAP = salesOrder;
                    // Get alphanumeric sales order from header
                    const salesOrderHeaderResult = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrder')
                            .columns(['YY1_AlphanumericSalesO_SDH'])
                            .where({ SalesOrder: salesOrder })
                    );

                    if (!salesOrderHeaderResult || !salesOrderHeaderResult.length) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `No sales order header found for sales order ${salesOrder}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        hasRecordFailed = true;
                    } else {
                        // Update the work order number with the alphanumeric sales order
                        record.wnWorkOrderNo = salesOrderHeaderResult[0].YY1_AlphanumericSalesO_SDH;
                    }
                }

                // Step 2: Get sales order header details with the updated work order number
                if (!hasRecordFailed) {
                    const salesOrderHeaderDetails = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrder')
                            .columns([
                                'SalesOrder',
                                'SoldToParty',
                                'SalesOrganization',
                                'DistributionChannel',
                                'CustomerGroup',
                                'CustomerPriceGroup',
                                'YY1_AlphanumericSalesO_SDH'
                            ])
                            .where({ YY1_AlphanumericSalesO_SDH: record.wnWorkOrderNo })
                    );

                    if (!salesOrderHeaderDetails || !salesOrderHeaderDetails.length) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: 'Sales Order not found.', process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        hasRecordFailed = true;
                    } else {
                        const headerDetails = salesOrderHeaderDetails[0];

                        // Store the header details in the record
                        // record.soldToPartySAP = headerDetails.SoldToParty;
                        // record.salesOrganizationSAP = headerDetails.SalesOrganization;
                        // record.salesDocumentNoSAP = headerDetails.SalesOrder;
                        // record.distributionChannelSAP = headerDetails.DistributionChannel;
                        // record.customerGroupSAP = headerDetails.CustomerGroup;
                        // record.customerPriceGroupSAP = headerDetails.CustomerPriceGroup;
                        // record.alphanumericSalesOrderSAP = headerDetails.YY1_AlphanumericSalesO_SDH;

                        // Set woType to distribution channel
                        record.woType = headerDetails.DistributionChannel;

                        // Step 3: Get sales order item details
                        const salesOrderItemDetails = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem')
                                .columns([
                                    'SalesOrder',
                                    'SalesOrderItem',
                                    'SalesDocumentRjcnReason',
                                    'OrderRelatedBillingStatus',
                                    'YY1_WNInvoice_SD_SDI',
                                    'Material',
                                    'WBSElement',
                                    'AdditionalMaterialGroup3',
                                    'YY1_PurchasingDoc_SD_SDI',
                                    'YY1_WNWorkOrder_SD_SDI'
                                ])
                                .where({ SalesOrder: headerDetails.SalesOrder })
                        );

                        if (!salesOrderItemDetails || !salesOrderItemDetails.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'Sales Order Item not found.', process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            hasRecordFailed = true;
                        } else {
                            const itemDetails = salesOrderItemDetails[0];

                            // Store the item details in the record
                            // record.salesDocumentNoSAP = itemDetails.SalesOrder;
                            record.salesItemNoSAP = itemDetails.SalesOrderItem;
                            record.purchaseDocumentItemSAP = itemDetails.SalesOrderItem;
                            // record.salesDocumentRjcnReasonSAP = itemDetails.SalesDocumentRjcnReason;
                            // record.orderRelatedBillingStatusSAP = itemDetails.OrderRelatedBillingStatus;
                            // record.invoiceNoWNSAP = itemDetails.YY1_WNInvoice_SD_SDI;
                            // record.materialSAP = itemDetails.Material;
                            // record.projectNumberSAP = itemDetails.WBSElement;
                            // record.materialGroup3SAP = itemDetails.AdditionalMaterialGroup3;
                            // record.purchaseDocumentNoSAP = itemDetails.YY1_PurchasingDoc_SD_SDI;
                            // record.wnWorkOrderNo = itemDetails.YY1_WNWorkOrder_SD_SDI;

                            // Step 4: Handle invoice number validation and assignment
                            if (record.invalidInvoiceNoWNSAP && record.invalidInvoiceNoWNSAP.trim() !== '') {
                                if (record.invalidInvoiceNoWNSAP !== record.wnInvoiceNo) {
                                    record.invoiceNoWNSAP = record.invalidInvoiceNoWNSAP;
                                } else {
                                    record.invoiceNoWNSAP = record.wnInvoiceNo + '-C';
                                }
                            } else {
                                record.invoiceNoWNSAP = record.wnInvoiceNo + '-C';
                            }

                            // Step 5: Check for existing credit invoices if process code is not O, P, N, M, 8, or 9
                            if (!['O', 'P', 'N', 'M', '8', '9'].includes(sProcessCode)) {
                                // Use existing salesOrderItemResult instead of making a new query
                                const existingCreditInvoice = salesOrderItemDetails.find(item =>
                                    item.YY1_WNInvoice_SD_SDI === record.invoiceNoWNSAP
                                );

                                if (existingCreditInvoice) {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: 'Credit Invoice already exists.', process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                }
                            }

                            // Step 6: Check for WN Invoice Number in existing dataset
                            const matchingInvoice = salesOrderItemDetails.find(item =>
                                item.YY1_WNInvoice_SD_SDI === record.wnInvoiceNo
                            );

                            if (!matchingInvoice) {
                                // If no entry found, concatenate wnInvoiceNo with 'IC'
                                record.wnInvoiceNo = record.wnInvoiceNo + 'IC';
                            }

                            // Step 7: Check for invoice in sales order item table
                            const invoiceEntry = salesOrderItemDetails.find(item =>
                                item.YY1_WNInvoice_SD_SDI === record.wnInvoiceNo
                            );

                            // Save YY1_WNWorkOrder_SD_SDI to VAR_SO_IC variable at highest scope
                            VAR_SO_IC = invoiceEntry ? invoiceEntry.YY1_WNWorkOrder_SD_SDI : null;

                            if (!invoiceEntry) {
                                aErrorLogs.push({
                                    record_ID: record.ID,
                                    message: `No invoice found for WN Invoice Number ${record.wnInvoiceNo}`, process_code: sProcessCode
                                });
                                aFailedRecordIDs.push(record.ID);
                                hasRecordFailed = true;
                            } else {
                                // Step 8: Check process level and rejection reason
                                if ((sProcessCode === '1' || sProcessCode === 'H') &&
                                    invoiceEntry.SalesDocumentRjcnReason &&
                                    invoiceEntry.SalesDocumentRjcnReason.trim() !== '') {
                                    aErrorLogs.push({
                                        record_ID: record.ID,
                                        message: 'SO & Line item already rejected.', process_code: sProcessCode
                                    });
                                    aFailedRecordIDs.push(record.ID);
                                    hasRecordFailed = true;
                                }

                                // Step 9: Check CustomerPriceGroup and Material
                                if (!hasRecordFailed) {
                                    // Get corresponding header for the invoice entry
                                    const correspondingHeader = await this.salesOrderAPI.executeQuery(
                                        SELECT.from('A_SalesOrder')
                                            .columns(['CustomerPriceGroup', 'CustomerGroup'])
                                            .where({ SalesOrder: invoiceEntry.SalesOrder })
                                    );

                                    if (correspondingHeader && correspondingHeader.length > 0 &&
                                        correspondingHeader[0].CustomerPriceGroup === 'ZM' &&
                                        invoiceEntry.Material === 'EXPENSE') {
                                        aErrorLogs.push({
                                            record_ID: record.ID,
                                            message: 'MBEWBE Expense. Please credit manually.', process_code: sProcessCode
                                        });
                                        aFailedRecordIDs.push(record.ID);
                                        hasRecordFailed = true;
                                    }

                                    // Check if CustomerGroup is ZM and set creditRebillSAP
                                    if (!hasRecordFailed && correspondingHeader && correspondingHeader.length > 0 &&
                                        correspondingHeader[0].CustomerGroup === 'ZM') {
                                        record.creditRebillSAP = 'X';
                                    }

                                    // Step 10: Handle ZI CustomerGroup case
                                    if (!hasRecordFailed && correspondingHeader[0].CustomerGroup === 'ZI') {
                                        // Concatenate wnInvoiceNo with IC and store in VAR_wnInvoiceNo
                                        VAR_wnInvoiceNo = record.wnInvoiceNo + 'IC';

                                        // Check length of SAP_WN_INV for IC ZWOTYPR
                                        if (record.woType === 'IC') {
                                            const SAP_WN_INV = record.invoiceNoWNSAP;
                                            if (SAP_WN_INV && SAP_WN_INV.length > 15) {
                                                aErrorLogs.push({
                                                    record_ID: record.ID,
                                                    message: 'Credit WN inv # cannot exceed 15 chars. Process entry manually.', process_code: sProcessCode
                                                });
                                                aFailedRecordIDs.push(record.ID);
                                                hasRecordFailed = true;
                                                continue; // Exit the current iteration
                                            }
                                        }

                                        // Get sales order number using VAR_SO_IC
                                        const salesOrderResult = await this.salesOrderAPI.executeQuery(
                                            SELECT.from('A_SalesOrder')
                                                .columns(['SalesOrder'])
                                                .where({ YY1_AlphanumericSalesO_SDH: VAR_SO_IC })
                                        );

                                        if (!salesOrderResult || !salesOrderResult.length) {
                                            aErrorLogs.push({
                                                record_ID: record.ID,
                                                message: `No sales order found for alphanumeric sales order ${VAR_SO_IC}`, process_code: sProcessCode
                                            });
                                            aFailedRecordIDs.push(record.ID);
                                            hasRecordFailed = true;
                                        } else {
                                            // Get sales order item details with VAR_wnInvoiceNo
                                            record.salesOrderICSAP = salesOrderResult.SalesOrder;
                                            const salesOrderItemResult1 = await this.salesOrderAPI.executeQuery(
                                                SELECT.from('A_SalesOrderItem')
                                                    .columns([
                                                        'SalesOrder',
                                                        'SalesOrderItem',
                                                        'SalesDocumentRjcnReason',
                                                        'OrderRelatedBillingStatus',
                                                        'YY1_PurchasingDoc_SD_SDI'
                                                    ])
                                                    .where({
                                                        and: [
                                                            { SalesOrder: headerDetails.SalesOrder },
                                                            { YY1_WNInvoice_SD_SDI: VAR_wnInvoiceNo }
                                                        ]
                                                    })
                                            );

                                            // If no entry found with VAR_wnInvoiceNo, try with wnInvoiceNo
                                            if (!salesOrderItemResult1 || !salesOrderItemResult1.length) {
                                                const salesOrderItemResult2 = await this.salesOrderAPI.executeQuery(
                                                    SELECT.from('A_SalesOrderItem')
                                                        .columns([
                                                            'SalesOrder',
                                                            'SalesOrderItem',
                                                            'SalesDocumentRjcnReason',
                                                            'OrderRelatedBillingStatus',
                                                            'YY1_PurchasingDoc_SD_SDI'
                                                        ])
                                                        .where({
                                                            and: [
                                                                { SalesOrder: salesOrderResult[0].SalesOrder },
                                                                { YY1_WNInvoice_SD_SDI: record.wnInvoiceNo }
                                                            ]
                                                        })
                                                );

                                                if (salesOrderItemResult2 && salesOrderItemResult2.length > 0) {
                                                    // Set VAR_IC to X if entry found with wnInvoiceNo
                                                    record.purchaseDocumentNoSAP = salesOrderItemResult2[0].YY1_PurchasingDoc_SD_SDI;
                                                    record.varIC = 'X';
                                                }
                                            } else {
                                                record.salesItemNoICSAP = salesOrderItemResult1[0].SalesOrderItem;

                                            }

                                            // Get partner function records for employee and supplier
                                            const partnerFunctionResult = await this.salesOrderAPI.executeQuery(
                                                SELECT.from('A_SalesOrderHeaderPartner')
                                                    .columns(['SalesOrder', 'PartnerFunction', 'Personnel', 'Supplier'])
                                                    .where({
                                                        and: [
                                                            { SalesOrder: salesOrderResult[0].SalesOrder },
                                                            { PartnerFunction: { in: ['Z3', 'ZV', 'ZR'] } }
                                                        ]
                                                    })
                                            );

                                            if (partnerFunctionResult && partnerFunctionResult.length > 0) {
                                                // Count ZV and ZR entries
                                                const zvEntries = partnerFunctionResult.filter(entry => entry.PartnerFunction === 'ZV');
                                                const zrEntries = partnerFunctionResult.filter(entry => entry.PartnerFunction === 'ZR');
                                                const z3Records = partnerFunctionResult.filter(p => p.PartnerFunction === 'Z3');
                                                // Check for multiple entries
                                                if ((zvEntries.length > 0 && zrEntries.length > 0) ||
                                                    zvEntries.length > 1 ||
                                                    zrEntries.length > 1) {
                                                    aErrorLogs.push({
                                                        record_ID: record.ID,
                                                        message: 'More than two remit to vendor found.', process_code: sProcessCode
                                                    });
                                                    aFailedRecordIDs.push(record.ID);
                                                    hasRecordFailed = true;
                                                }
                                                // else if (zvEntries.length === 1 || zrEntries.length === 1) {
                                                //     // Get the single ZV or ZR entry
                                                //     const vendorEntry = zvEntries.length > 0 ? zvEntries[0] : zrEntries[0];

                                                //     // Update record fields
                                                //     record.partnerFunctionSAP = vendorEntry.PartnerFunction;
                                                //     record.vendorZR = vendorEntry.Supplier;
                                                // }
                                                else if (zvEntries.length === 1 || zrEntries.length === 1 || z3Records.length === 1) {
                                                    // Update fields based on which record type has exactly one entry
                                                    if (zvEntries.length === 1) {
                                                        record.partnerFunctionSAP = zvEntries[0].PartnerFunction;
                                                        record.vendorZR = zvEntries[0].Supplier;
                                                    }
                                                    if (zrEntries.length === 1) {
                                                        record.partnerFunctionSAP = zrEntries[0].PartnerFunction;
                                                        record.vendorZR = zrEntries[0].Supplier;
                                                    }
                                                    if (z3Records.length === 1) {
                                                        record.personnelNoSAP = z3Records[0].Personnel;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // Block 1
                if (
                    record.orderRelatedBillingStatusSAP === 'A' &&
                    (!record.orderRelatedBillingStatusICSAP || record.orderRelatedBillingStatusICSAP.trim() === '') &&
                    sProcessCode === '1'
                ) {
                    steps.push('H');
                    if (record.salesOrderICSAP && record.salesOrderICSAP.trim() !== '') {
                        steps.push('I/J/K');
                    }
                }

                // Block 2
                if (
                    (!record.orderRelatedBillingStatusSAP || record.orderRelatedBillingStatusSAP.trim() === '') &&
                    record.orderRelatedBillingStatusICSAP === 'A' &&
                    (!record.salesOrderICSAP || record.salesOrderICSAP.trim() === '')
                ) {
                    steps.push('I/J/K');
                }

                // Block 3
                if (record.orderRelatedBillingStatusSAP === 'C') {
                    if (record.salesOrderICSAP && record.salesOrderICSAP.trim() !== '') {
                        steps.push('L/O');
                    } else if (!record.salesOrderICSAP || record.salesOrderICSAP.trim() === '') {
                        steps.push('M/P/N');
                    }
                }
                if (steps.includes('*')) {
                    steps = ['*'];
                }
                record.creditSteps = steps.join(',');
                if (!hasRecordFailed) {
                    aPassedRecordIDs.push(record.ID);
                }
            }
        }

        
//   if (aFailedRecordIDs.length) {
//     const processedRecordsMap = new Map(
//         aRecordsForProcessing.map(record => [record.ID, record])
//     );
//             try {
//                 await Promise.allSettled([
//                     ProcessLogger.addLogs(aErrorLogs),
//                     // this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
//                     ...aFailedRecordIDs.filter(recordID => {
//                         // const record = this.records.find(r => r.ID === recordID);
//                         const record = processedRecordsMap.get(recordID);
//                         let recordProcessLevelCode = sProcessCode;
//                         if (record) {
//                             if (record.processLevel_code === '0') {
//                                 recordProcessLevelCode = '1';
//                             } else if (record.processLevel_code === '1') {
//                                 recordProcessLevelCode = '1';
//                             } 
//                             // else if (record.processLevel_code === '2' && !record.valid) {
//                             //     recordProcessLevelCode = '1';
//                             // } 
//                             else {
//                                 recordProcessLevelCode = record.processLevel_code;
//                             }
//                         }
//                         return recordProcessLevelCode === '1';
//                     }).map(recordID => {
//                         // const record = this.records.find(r => r.ID === recordID);
//                         const record = processedRecordsMap.get(recordID);
//                         let recordProcessLevelCode = sProcessCode;
//                         if (record) {
//                             if (record.processLevel_code === '0') {
//                                 recordProcessLevelCode = '1';
//                             } else if (record.processLevel_code === '1') {
//                                 recordProcessLevelCode = '1';
//                             } 
//                             // else if (record.processLevel_code === '2' && !record.valid) {
//                             //     recordProcessLevelCode = '1';
//                             // } 
//                             else {
//                                 recordProcessLevelCode = record.processLevel_code;
//                             }
//                         }
//                         return UPDATE(Credit_Rebill)
//                             .set({valid: false, processLevel_code: recordProcessLevelCode})
//                             .where({ID: recordID});
//                     }),
//                 ]);
//                 this.LOG._info &&
//                     this.LOG.info(
//                         cds.i18n.messages.at('INFO_RECORDS_UPDATED', [
//                             sProcessCode,
//                             aErrorLogs.map((log) => log.record_ID).join(','),
//                         ]),
//                     );
//             } catch (err) {
//                 this.LOG._error && this.LOG.error(err.message);
//             }
//         }
//         if (aPassedRecordIDs.length) {
//             const processedRecordsMap = new Map(
//         aRecordsForProcessing.map(record => [record.ID, record])
//     );

//             await Promise.allSettled([
//                 ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode),
//                 // this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
//                 ...aPassedRecordIDs.filter(recordID => {
//                     //const record = this.records.find(r => r.ID === recordID);
//                     const record = processedRecordsMap.get(recordID);
//                     let recordProcessLevelCode = sProcessCode;
//                     if (record) {
//                         if (record.processLevel_code === '0') {
//                             recordProcessLevelCode = '1';
//                         } else if (record.processLevel_code === '1') {
//                             recordProcessLevelCode = '1';
//                         } 
//                         // else if (record.processLevel_code === '2' && !record.valid) {
//                         //     recordProcessLevelCode = '1';
//                         // } 
//                         else {
//                             recordProcessLevelCode = record.processLevel_code;
//                         }
//                     }
//                     return recordProcessLevelCode === '1';
//                 }).map(recordID => {
//                     //const record = this.records.find(r => r.ID === recordID);
//                     const record = processedRecordsMap.get(recordID);
//                     let recordProcessLevelCode = sProcessCode;
//                     if (record) {
//                         if (record.processLevel_code === '0') {
//                             recordProcessLevelCode = '1';
//                         } else if (record.processLevel_code === '1') {
//                             recordProcessLevelCode = '1';
//                         } 
//                         // else if (record.processLevel_code === '2' && !record.valid) {
//                         //     recordProcessLevelCode = '1';
//                         // } 
//                         else {
//                             recordProcessLevelCode = record.processLevel_code;
//                         }
//                     }
                    
//                     // Build update payload with CreditRebill-specific fields
//                     const updatePayload = {
//                         valid: true,
//                         processLevel_code: recordProcessLevelCode
//                     };

//                     if (record.isMS_SC_Processed) {
//                         Object.assign(updatePayload, {
//                             salesDocumentNoSAP: record.salesDocumentNoSAP,
//                             salesItemNoSAP: record.salesItemNoSAP,
//                             purchaseDocumentNoSAP: record.purchaseDocumentNoSAP,
//                             purchaseDocumentItemSAP: record.purchaseDocumentItemSAP,
//                             personnelNoSAP: record.personnelNoSAP,
//                             creditSteps: record.creditSteps
//                         });
//                     }

//                     if (record.isCP_CR_Processed) {
//                         Object.assign(updatePayload, {
//                             email: record.email,
//                             creditRebillSAP: record.creditRebillSAP,
//                             personnelNoSAP: record.personnelNoSAP,
//                             invoiceNoWNSAP: record.invoiceNoWNSAP,
//                             salesDocumentNoSAP: record.salesDocumentNoSAP,
//                             salesItemNoSAP: record.salesItemNoSAP,
//                             salesDocumentRjcnReasonSAP: record.salesDocumentRjcnReasonSAP,
//                             orderRelatedBillingStatusSAP: record.orderRelatedBillingStatusSAP,
//                             materialSAP: record.materialSAP,
//                             projectNumberSAP: record.projectNumberSAP,
//                             materialGroup3SAP: record.materialGroup3SAP,
//                             purchaseDocumentNoSAP: record.purchaseDocumentNoSAP
//                         });
//                     }

//                     return UPDATE(Credit_Rebill)
//                         .set(updatePayload)
//                         .where({ID: recordID});
//                 }),
//             ]);
//             this.LOG._info &&
//                 this.LOG.info(cds.i18n.messages.at('INFO_RECORDS_UPDATED', [sProcessCode, 'All']));
//         }

 if (aFailedRecordIDs.length) {
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
                            //     recordProcessLevelCode = '1';
                            // } 
                            else {
                                recordProcessLevelCode = record.processLevel_code;
                            }
                        }
                        return recordProcessLevelCode === '1';
                    }).map(async (recordID) => {
                        try {
                            const record = this.records.find(r => r.ID === recordID);
                            let recordProcessLevelCode = sProcessCode;
                            if (record) {
                                if (record.processLevel_code === '0') {
                                    recordProcessLevelCode = '1';
                                } else if (record.processLevel_code === '1') {
                                    recordProcessLevelCode = '1';
                                } 
                                // else if (record.processLevel_code === '2' && !record.valid) {
                                //     recordProcessLevelCode = '1';
                                // } 
                                else {
                                    recordProcessLevelCode = record.processLevel_code;
                                }
                            }
                            
                            const updateData = {
                                valid: false,
                                processLevel_code: recordProcessLevelCode
                            };

                            // 🔑 CRITICAL STEP: Use db.tx() to ensure immediate update and commit
                            await db.tx(async (tx) => {
                                await tx.update(Credit_Rebill)
                                    .set(updateData)
                                    .where({ ID: recordID });
                                // Changes are automatically committed here if successful
                            });
                        } catch (updateError) {
                            this.LOG._error && this.LOG.error(`Failed to update failed record ${recordID}: ${updateError.message}`);
                            throw updateError;
                        }
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
            const processedRecordsMap = new Map(
        aRecordsForProcessing.map(record => [record.ID, record])
    ); 
          
            // Create a map of record IDs to indices in this.records for efficient updates
            const recordIdToIndexMap = new Map(
                this.records.map((record, index) => [record.ID, index])
            );

            await Promise.allSettled([
                ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode),
                ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3}))),
                // this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
                ...aPassedRecordIDs.filter(recordID => {
                    //const record = this.records.find(r => r.ID === recordID);
                    const record = processedRecordsMap.get(recordID);
                    let recordProcessLevelCode = sProcessCode;
                    if (record) {
                        if (record.processLevel_code === '0') {
                            recordProcessLevelCode = '1';
                        } else if (record.processLevel_code === '1') {
                            recordProcessLevelCode = '1';
                        } 
                        // else if (record.processLevel_code === '2' && !record.valid) {
                        //     recordProcessLevelCode = '1';
                        // } 
                        else {
                            recordProcessLevelCode = record.processLevel_code;
                        }
                    }
                    return recordProcessLevelCode === '1';
                }).map(async (recordID) => {
                    try {
                        //const record = this.records.find(r => r.ID === recordID);
                        const record = processedRecordsMap.get(recordID);
                        let recordProcessLevelCode = sProcessCode;
                        if (record) {
                            if (record.processLevel_code === '0') {
                                recordProcessLevelCode = '1';
                            } else if (record.processLevel_code === '1') {
                                recordProcessLevelCode = '1';
                            } 
                            // else if (record.processLevel_code === '2' && !record.valid) {
                            //     recordProcessLevelCode = '1';
                            // } 
                            else {
                                recordProcessLevelCode = record.processLevel_code;
                            }
                        }
                        
                        // Build update payload with CreditRebill-specific fields
                        const updatePayload = {
                            valid: true,
                            processLevel_code: recordProcessLevelCode
                        };

                        if (record.isMS_SC_Processed) {
                            Object.assign(updatePayload, {
                                salesDocumentNoSAP: record.salesDocumentNoSAP,
                                salesItemNoSAP: record.salesItemNoSAP,
                                purchaseDocumentNoSAP: record.purchaseDocumentNoSAP,
                                purchaseDocumentItemSAP: record.purchaseDocumentItemSAP,
                                personnelNoSAP: record.personnelNoSAP,
                                creditSteps: record.creditSteps
                            });
                        }

                        if (record.isCP_CR_Processed) {
                            Object.assign(updatePayload, {
                                email: record.email,
                                creditRebillSAP: record.creditRebillSAP,
                                personnelNoSAP: record.personnelNoSAP,
                                invoiceNoWNSAP: record.invoiceNoWNSAP,
                                salesDocumentNoSAP: record.salesDocumentNoSAP,
                                salesItemNoSAP: record.salesItemNoSAP,
                                salesDocumentRjcnReasonSAP: record.salesDocumentRjcnReasonSAP,
                                orderRelatedBillingStatusSAP: record.orderRelatedBillingStatusSAP,
                                materialSAP: record.materialSAP,
                                projectNumberSAP: record.projectNumberSAP,
                                materialGroup3SAP: record.materialGroup3SAP,
                                purchaseDocumentNoSAP: record.purchaseDocumentNoSAP,
                                creditSteps: record.creditSteps
                            });
                        }

                        // 🔑 CRITICAL STEP: Use db.tx() to ensure immediate update and commit
                        await db.tx(async (tx) => {
                            await tx.update(Credit_Rebill)
                                .set(updatePayload)
                                .where({ ID: recordID });
                            // Changes are automatically committed here if successful
                        });

                        const recordIndex = recordIdToIndexMap.get(recordID);
                        if (recordIndex !== undefined && this.records[recordIndex]) {
                            Object.assign(this.records[recordIndex], updatePayload);
                            this.LOG._info && this.LOG.info(`Updated in-memory record ${recordID} with creditSteps: ${updatePayload.creditSteps}`);
                        }
                        
                    } catch (updateError) {
                        this.LOG._error && this.LOG.error(`Failed to update passed record ${recordID}: ${updateError.message}`);
                        throw updateError;
                    }
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


        for (const record of aRecordsForProcessing) {
            if (record.creditSteps && record.creditSteps.split(',').includes('H')) {
                try {
                    const status = record.orderRelatedBillingStatus;
                    // if (sProcessCode === '1' && (status === 'A' || status === '')) 
                    {
                        // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'H', createdAt: new Date() });
                        // await this._deletePreviousSteps(record.ID, 'H');
                        // aPassedRecordIDs.push(record.ID);
                        // PATCH SalesOrderItem to set rejection reason
                        // const patchResult = await this.salesOrderAPI.updateSalesOrderItem({
                        //     SalesOrder: record.salesDocumentNoSAP,
                        //     SalesOrderItem: record.salesItemNoSAP || '000010',
                        //     SalesDocumentRjcnReason: '60' // or your required reason code
                        // });
                        const patchResult = await this.salesOrderAPI.executeQuery(
                            UPDATE('A_SalesOrderItem')
                                .set({
                                    SalesDocumentRjcnReason: '60' // or your required reason code
                                })
                                .where({
                                    SalesOrder: record.salesDocumentNoSAP,
                                    SalesOrderItem: record.salesItemNoSAP
                                })
                        );

                        if (!patchResult.error) {
                            // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'H', createdAt: new Date() });
                            // await this._deletePreviousSteps(record.ID, 'H');
                            aPassedRecordIDs.push(record.ID);
                        } else {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error rejecting sales order item: ${patchResult.error}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                    }
                    // else {
                    //     aaSkippedRecords.push(record.ID);
                    // }
                } catch (err) {
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: `Error rejecting sales order: ${err.message}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                }
            } else {
                aPassedRecordIDs.push(record.ID);
            }
        }
        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
            await UPDATE(Credit_Rebill)
                .set({
                    valid: true,
                    processLevel_code: sProcessCode
                })
                .where({ ID: { in: aPassedRecordIDs } });
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(Credit_Rebill)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step I (Reject SO for InterCompany)
    async RejectSOIC(sProcessCode, bBreakExecution) {
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

        for (const record of aRecordsForProcessing) {
            if (record.creditSteps && record.creditSteps.split(',').includes('I')) {
                try {

                    {
                        // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'I', createdAt: new Date() });
                        // await this._deletePreviousSteps(record.ID, 'I');
                        const patchResult = await this.salesOrderAPI.executeQuery(
                            UPDATE('A_SalesOrderItem')
                                .set({
                                    SalesDocumentRjcnReason: '60' // or your required reason code
                                })
                                .where({
                                    SalesOrder: record.salesDocumentNoSAP,
                                    SalesOrderItem: record.salesItemNoSAP
                                })
                        );

                        if (!patchResult.error) {
                            // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'H', createdAt: new Date() });
                            // await this._deletePreviousSteps(record.ID, 'H');
                            aPassedRecordIDs.push(record.ID);
                        } else {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error rejecting sales order item: ${patchResult.error}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                    }

                } catch (err) {
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: `Error rejecting intercompany sales order: ${err.message}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                }
            } else {
                aPassedRecordIDs.push(record.ID);
            }
        }
        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
            await UPDATE(Credit_Rebill)
                .set({
                    valid: true,
                    processLevel_code: sProcessCode
                })
                .where({ ID: { in: aPassedRecordIDs } });
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(Credit_Rebill)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step J (Cancel MIRO)
    async CancelMIRO(sProcessCode, bBreakExecution) {
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

        for (const record of aRecordsForProcessing) {
            if (record.creditSteps && record.creditSteps.split(',').includes('J')) {
                try {
                    // if ((record.woType === 'MS' || record.woType === 'SC') && record.priceGroup !== 'ZM' && !record.materialGroup3) 
                    {
                        // Query 1: Get sales order and item number using invoice number
                        const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem')
                                .columns(['SalesOrder', 'SalesOrderItem'])
                                .where({ YY1_WNInvoice_SD_SDI: record.wnInvoiceNo })
                        );

                        if (!salesOrderItemResult || !salesOrderItemResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No sales order item found for invoice ${record.wnInvoiceNo}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        const salesOrder = salesOrderItemResult[0].SalesOrder;
                        const salesOrderItem = salesOrderItemResult[0].SalesOrderItem;

                        // Query 2: Get purchase order using sales order and item 0010
                        const purchaseOrderResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem')
                                .columns(['YY1_PurchasingDoc_SD_SDI'])
                                .where({

                                    SalesOrder: salesOrder,
                                    SalesOrderItem: salesOrderItem

                                })
                        );

                        if (!purchaseOrderResult || !purchaseOrderResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No purchase order found for sales order ${salesOrder}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        const purchaseOrder = purchaseOrderResult[0].YY1_PurchasingDoc_SD_SDI;

                        // Query 3: Get SupplierInvoice using PurchaseOrder and PurchaseOrderItem
                        const supplierInvoiceResult = await this.supplierInvoiceAPI.executeQuery(
                            SELECT.from('A_SuplrInvcItemPurOrdRef')
                                .columns(['SupplierInvoice', 'SupplierInvoiceItem', 'FiscalYear'])
                                .where({

                                    PurchaseOrder: purchaseOrder,
                                    PurchaseOrderItem: record.purchaseDocumentItemSAP // use record purchase order number

                                })
                        );

                        if (!supplierInvoiceResult || !supplierInvoiceResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No supplier invoice found for purchase order ${purchaseOrder} and item ${salesOrderItem}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        const supplierInvoice = supplierInvoiceResult[0].SupplierInvoice;
                        const fiscalYear = supplierInvoiceResult[0].FiscalYear;
                        const supplierInvoiceItem = supplierInvoiceResult[0].SupplierInvoiceItem;

                        // Store the values in the record
                        record.purchaseDocumentNoSAP = purchaseOrder;
                        record.purchaseDocumentItemSAP = salesOrderItem;
                        record.supplierInvoiceSAP = supplierInvoice;
                        record.supplierInvoiceItemSAP = supplierInvoiceItem;

                        // Get current date in the required format
                        const currentDate = new Date();
                        // const fiscalYear = currentDate.getFullYear().toString();  // FiscalYear
                        const dateString = `/Date(${currentDate.getTime()})/`;


                        const postingDate = currentDate.toISOString().split('T')[0];

                        // const invoiceDetails = supplierInvoiceDetails[0];
                        const cancelResult = await this.supplierInvoiceAPI.cancelSupplierInvoice({
                            SupplierInvoice: supplierInvoice,
                            FiscalYear: fiscalYear,
                            PostingDate: postingDate,
                            ReversalReason: '01'
                        });

                        console.log(cancelResult.success);

                        if (cancelResult.success) {
                            // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'J', createdAt: new Date() });
                            // await this._deletePreviousSteps(record.ID, 'J');
                            aPassedRecordIDs.push(record.ID);
                        } else {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error creating MIRO: ${createResult.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                    }
                    // else {
                    //     aSkippedRecords.push(record.ID);
                    // }
                } catch (err) {
                    aErrorLogs.push({
                        record_ID: record.ID,
                        message: `Error canceling MIRO: ${err.message}`, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(record.ID);
                }
            } else {
                aPassedRecordIDs.push(record.ID);
            }
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
            await UPDATE(Credit_Rebill)
                .set({
                    valid: true,
                    processLevel_code: sProcessCode,
                    // purchaseDocumentNoSAP: record.purchaseDocumentNoSAP,
                    // purchaseDocumentItemSAP: record.purchaseDocumentItemSAP,
                    // supplierInvoiceSAP: record.supplierInvoiceSAP,
                    // supplierInvoiceItemSAP: record.supplierInvoiceItemSAP
                })
                .where({ ID: { in: aPassedRecordIDs } });
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(Credit_Rebill)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step K (Cancel Purchase Order)
    async CancelPO(sProcessCode, bBreakExecution) {
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


        for (const record of aRecordsForProcessing) {
            try {
                if (record.creditSteps && record.creditSteps.split(',').includes('K')) {
                    // if ((record.woType === 'MS' || record.woType === 'SC') && record.priceGroup !== 'ZM' && !record.materialGroup3) {
                    // Query 1: Get sales order and item number using invoice number
                    // const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                    //     SELECT.from('A_SalesOrderItem')
                    //         .columns(['SalesOrder', 'SalesOrderItem'])
                    //         .where({ YY1_WNInvoice_SD_SDI: record.wnInvoiceNo })
                    // );

                    // if (!salesOrderItemResult || !salesOrderItemResult.length) {
                    //     aErrorLogs.push({
                    //         record_ID: record.ID,
                    //         message: `No sales order item found for invoice ${record.wnInvoiceNo}`
                    //     });
                    //     aFailedRecordIDs.push(record.ID);
                    //     continue;
                    // }

                    // const salesOrder = salesOrderItemResult[0].SalesOrder;
                    // const salesOrderItem = salesOrderItemResult[0].SalesOrderItem;

                    // // Query 2: Get purchase order using sales order and item 0010
                    // const purchaseOrderResult = await this.salesOrderAPI.executeQuery(
                    //     SELECT.from('A_SalesOrderItem')
                    //         .columns(['YY1_WNWorkOrder_SD_SDI'])
                    //         .where({
                    //             and: [
                    //                 { SalesOrder: salesOrder },
                    //                 { SalesOrderItem: '000010' }
                    //             ]
                    //         })
                    // );

                    // if (!purchaseOrderResult || !purchaseOrderResult.length) {
                    //     aErrorLogs.push({
                    //         record_ID: record.ID,
                    //         message: `No purchase order found for sales order ${salesOrder}`
                    //     });
                    //     aFailedRecordIDs.push(record.ID);
                    //     continue;
                    // }

                    // const purchaseOrder = purchaseOrderResult[0].YY1_WNWorkOrder_SD_SDI;

                    // Call the communicator to delete the PO item

                    const deleteResult = await this.purchaseOrderAPI.deletePurchaseOrderItems({
                        PurchaseOrder: record.purchaseDocumentNoSAP,
                        PurchaseOrderItem: record.purchaseDocumentItemSAP
                    });

                    if (deleteResult.success) {
                        // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'K', createdAt: new Date() });
                        // await this._deletePreviousSteps(record.ID, 'K');
                        aPassedRecordIDs.push(record.ID);
                    } else {

                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Error deleting purchase order item: ${deleteResult.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                    }
                } else {
                    aPassedRecordIDs.push(record.ID);
                }
            } catch (err) {
                aErrorLogs.push({
                    record_ID: record.ID,
                    message: `Error canceling purchase order: ${err.message}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(record.ID);
            }
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
            await UPDATE(Credit_Rebill)
                .set({
                    valid: true,
                    processLevel_code: sProcessCode
                })
                .where({ ID: { in: aPassedRecordIDs } });
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(Credit_Rebill)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
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


        for (const record of aRecordsForProcessing) {
            try {
                if (record.creditSteps && (record.creditSteps.split(',').includes('L') || record.creditSteps.split(',').includes('*')) && (!record.creditMemoSAP || record.creditMemoSAP.trim() === '')) {
                    // if (sProcessCode === 'L') {
                    if (record.creditSteps && record.creditSteps.split(',').includes('*')) {
                        // Get legacy invoice data directly from entity
                        const legacyInvoiceResult = await SELECT.from(Credits_for_LegacyInvoices)
                            .columns([
                                'salesOrder', 'salesOrderItem', 'purchaseOrder', 'purchaseOrderItem',
                                'employeeZ3', 'supplier', 'companyCode',
                                'salesOrganization', 'distributionChannel', 'division', 'salesOffice',
                                'soldToParty', 'billToParty', 'payer', 'employeeName', 'customerGroup',
                                'transactionCurrency', 'purchaseOrderByCustomer', 'billingDocument',
                                'billingDate', 'billingDocumentItem', 'salesOrderMaterial',
                                'salesOrderMaterialText', 'paymentTerms', 'plant', 'internalOrderNo',
                                'conditionType', 'amount', 'taxCode', 'taxJurisdictionCode',
                                'taxItemClassification', 'glAccount', 'billingTaxAmount'
                            ])
                            .where({ zzInvoice: record.wnInvoiceNo });

                        if (!legacyInvoiceResult || !legacyInvoiceResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No legacy invoice data found for WN Invoice ${record.wnInvoiceNo}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        const legacyData = legacyInvoiceResult[0];

                        // Create payload for legacy invoices
                        const currentDate = new Date();
                        const dateString = `/Date(${currentDate.getTime()})/`;

                        const creditMemoPayload = {
                            CreditMemoRequestType: "CR",
                            SalesOrganization: legacyData.salesOrganization,
                            DistributionChannel: legacyData.distributionChannel,
                            OrganizationDivision: legacyData.division || '',
                            SalesOffice: legacyData.salesOffice || "",
                            SoldToParty: legacyData.soldToParty,
                            PurchaseOrderByCustomer: legacyData.purchaseOrderByCustomer || "",
                            CreditMemoRequestDate: dateString,
                            TransactionCurrency: legacyData.transactionCurrency || "USD",
                            SDDocumentReason: "Z02",
                            PricingDate: dateString,
                            CustomerPaymentTerms: legacyData.paymentTerms || "4580",
                            BillingDocumentDate: dateString,
                            ServicesRenderedDate: dateString,
                            AssignmentReference: record.wnInvoiceNo, // ZZINVOICE number
                            to_Item: {
                                results: [
                                    {
                                        CreditMemoRequestItem: "10",
                                        CreditMemoRequestItemCategory: "G2W",
                                        Material: legacyData.salesOrderMaterial || "EXPENSE",
                                        CreditMemoRequestItemText: legacyData.salesOrderMaterialText || "EXPENSE",
                                        PricingDate: dateString,
                                        RequestedQuantity: "1",
                                        RequestedQuantityUnit: "LAB",
                                        RequestedQuantitySAPUnit: "LAB",
                                        RequestedQuantityISOUnit: "_01",
                                        Plant: legacyData.plant || "1200",
                                        WBSElement: legacyData.internalOrderNo,
                                        ServicesRenderedDate: dateString,
                                        YY1_WNInvoice_SD_SDI: record.wnInvoiceNo,
                                        YY1_WNWorkOrder_SD_SDI: record.wnWorkOrderNo, // Work Order Number
                                        to_PricingElement: {
                                            results: [
                                                {
                                                    CreditMemoRequestItem: "10",
                                                    ConditionType: legacyData.conditionType || "ZBPO",
                                                    ConditionRateValue: legacyData.amount ? legacyData.amount.toString() : "102.00"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        };

                        // Call the Credit Memo Request API for legacy invoices
                        const createResult = await this.creditMemoRequestAPI.createCreditMemoRequest(creditMemoPayload);

                        if (createResult.CreditMemoRequest) {
                            // Update the record with the created credit memo
                            await UPDATE(Credit_Rebill)
                                .set({
                                    creditMemoSAP: createResult.CreditMemoRequest,
                                    valid: true,
                                    processLevel_code: sProcessCode
                                })
                                .where({ ID: record.ID });

                            aPassedRecordIDs.push(record.ID);
                        } else {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error creating Credit Memo for legacy invoice: ${createResult.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }

                        continue; // Skip the rest of the processing for legacy invoices
                    }
                    else {


                        // Validate required fields
                        if (!record.salesDocumentNoSAP) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'SO missing.', process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        if (!record.wnInvoiceNo) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'WN Invoice Number is missing.', process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        // if (!record.invoiceNoWNSAP) {
                        //     aErrorLogs.push({
                        //         record_ID: record.ID,
                        //         message: 'Credit WN Invoice Number missing.'
                        //     });
                        //     aFailedRecordIDs.push(record.ID);
                        //     continue;
                        // }

                        // Get sales order and item number using invoice number
                        const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem')
                                .columns(['SalesOrder', 'SalesOrderItem'])
                                .where({ YY1_WNInvoice_SD_SDI: record.wnInvoiceNo })
                        );

                        if (!salesOrderItemResult || !salesOrderItemResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No sales order item found for invoice ${record.wnInvoiceNo}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
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
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No sales order found for ${VAR_VBELN}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        const customerGroup = salesOrderResult[0].CustomerGroup;
                        const transactionCurrency = salesOrderResult[0].TransactionCurrency;
                        let VAR_SAP_WN_INV;

                        if (customerGroup === 'ZI') {
                            if (record.invalidInvoiceNoWNSAP && record.invalidInvoiceNoWNSAP !== record.wnInvoiceNo) {
                                VAR_SAP_WN_INV = record.invalidInvoiceNoWNSAP + 'IC-C';
                            } else {
                                VAR_SAP_WN_INV = record.wnInvoiceNo + 'IC-C';
                            }
                        } else {
                            VAR_SAP_WN_INV = record.wnInvoiceNo + 'IC-C';
                        }

                        // Validate invoice number lengthh
                        if (VAR_SAP_WN_INV.length > 15) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'Credit WN inv # cannot exceed 15 chars. Process entry manually.', process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }


                        const subsequentFlowResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem', soi => {
                                soi.SalesOrder,
                                    soi.SalesOrderItem,
                                    soi.to_SubsequentProcFlowDocItem(subsequentItem => {
                                        subsequentItem.SalesOrder,
                                            subsequentItem.SalesOrderItem,
                                            subsequentItem.SubsequentDocumentCategory,
                                            subsequentItem.SubsequentDocument,
                                            subsequentItem.SubsequentDocumentItem
                                    })
                            })
                                .where({
                                    SalesOrder: VAR_VBELN,
                                    SalesOrderItem: VAR_POSNR
                                })
                        );
                        // subsequentFlowResult[0].to_SubsequentProcFlowDocItem;
                        const filteredSubsequentItems = subsequentFlowResult[0].to_SubsequentProcFlowDocItem.filter(
                            item => item.SubsequentDocumentCategory === 'M'
                        );

                        if (!filteredSubsequentItems || filteredSubsequentItems.length === 0) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No invoices for WN inv # ${record.wnInvoiceNo} exist.`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        if (filteredSubsequentItems.length > 1) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: 'Multiple SAP Invoices for one WN Invoice. Do not know which one to credit', process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        // Store the calculated invoice number
                        record.invoiceNoWNSAP = VAR_SAP_WN_INV;

                        const currentDate = new Date();
                        const dateString = `/Date(${currentDate.getTime()})/`;

                        // Create payload for credit memo request
                        const creditMemoPayload = {
                            CreditMemoRequestType: 'CR',
                            CreditMemoRequestDate: dateString, //currentdate
                            TransactionCurrency: transactionCurrency, // Sales order Header currency
                            SDDocumentReason: '101',
                            BillingDocumentDate: dateString, //curentdate
                            ReferenceSDDocument: filteredSubsequentItems[0].SubsequentDocument,
                            ReferenceSDDocumentCategory: 'M',
                            to_Item: {
                                results: filteredSubsequentItems.map(item => ({
                                    CreditMemoRequestItem: '10',
                                    ReferenceSDDocument: item.SubsequentDocument,
                                    ReferenceSDDocumentItem: item.SubsequentDocumentItem,
                                    // AssignmentReference: record.wnInvoiceNo
                                }))
                            }
                        };

                        console.log('Credit Memo Payload:', JSON.stringify(creditMemoPayload, null, 2));
                        let result;
                        try {
                            result = await this.creditMemoRequestAPI.createCreditMemoRequest(creditMemoPayload);
                        } catch (apiError) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `API Error creating credit memo request: ${apiError.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }


                        if (!result || !result.CreditMemoRequest) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Failed to create credit memo request: ${result.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        console.log('Credit Memo Request Created:', result);
                        // Store the credit memo number in the record
                        if (result.CreditMemoRequest) {
                            record.creditMemoSAP = result.CreditMemoRequest;
                        }



                        // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'L', createdAt: new Date() });
                        // await this._deletePreviousSteps(record.ID, 'L');
                        aPassedRecordIDs.push(record.ID);
                    }
                } else {
                    aPassedRecordIDs.push(record.ID);
                }
            } catch (err) {
                aErrorLogs.push({
                    record_ID: record.ID,
                    message: `Error creating credit memo: ${err.message}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(record.ID);
            }
        }

        // Update the status of passed records
        // if (aPassedRecordIDs.length) {
        //     await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
        //     this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
        //     await Promise.allSettled(
        //         aRecordsForProcessing
        //             .filter(record => aPassedRecordIDs.includes(record.ID))
        //             .map(record =>
        //                 UPDATE(Credit_Rebill)
        //                     .set({
        //                         valid: true,
        //                         processLevel_code: sProcessCode,
        //                         invoiceNoWNSAP: record.invoiceNoWNSAP,
        //                         creditMemoSAP: record.creditMemoSAP
        //                     })
        //                     .where({ ID: record.ID })
        //             )
        //     );
        // }

        if (aPassedRecordIDs.length) {
            await Promise.allSettled([
                ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode),
                ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3}))),
                this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
                ...aRecordsForProcessing
                    .filter(record => aPassedRecordIDs.includes(record.ID))
                    .map(record => {
                        const updatePayload = {
                            valid: true,
                            processLevel_code: sProcessCode
                        };

                        // Add conditional fields if they exist
                        if (record.invoiceNoWNSAP) {
                            updatePayload.invoiceNoWNSAP = record.invoiceNoWNSAP;
                        }
                        if (record.creditMemoSAP) {
                            updatePayload.creditMemoSAP = record.creditMemoSAP;
                        }

                        return UPDATE(Credit_Rebill).set(updatePayload).where({ ID: record.ID });
                    })
            ]);
        }
        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
                await UPDATE(Credit_Rebill)
                    .set({ valid: false, processLevel_code: sProcessCode })
                    .where({ ID: { in: aFailedRecordIDs } });
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step M (Create Credit Memo for Intercompany)
    async CreateCRMEMOIC(sProcessCode, bBreakExecution) {
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

        for (const record of aRecordsForProcessing) {
            try {
                if (record.creditSteps && record.creditSteps.split(',').includes('M')) {
                    // if (sProcessCode === 'L') {
                    // Validate required fields
                    if (!record.salesDocumentNoSAP) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: 'SO missing.', process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        continue;
                    }

                    if (!record.wnInvoiceNo) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: 'WN Invoice Number is missing.', process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        continue;
                    }

                    // if (!record.invoiceNoWNSAP) {
                    //     aErrorLogs.push({
                    //         record_ID: record.ID,
                    //         message: 'Credit WN Invoice Number missing.'
                    //     });
                    //     aFailedRecordIDs.push(record.ID);
                    //     continue;
                    // }

                    // Get sales order and item number using invoice number
                    const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderItem')
                            .columns(['SalesOrder', 'SalesOrderItem'])
                            .where({ YY1_WNInvoice_SD_SDI: record.wnInvoiceNo })
                    );

                    if (!salesOrderItemResult || !salesOrderItemResult.length) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `No sales order item found for invoice ${record.wnInvoiceNo}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
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
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `No sales order found for ${VAR_VBELN}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        continue;
                    }

                    const customerGroup = salesOrderResult[0].CustomerGroup;
                    const transactionCurrency = salesOrderResult[0].TransactionCurrency;
                    let VAR_SAP_WN_INV;

                    if (customerGroup === 'ZI') {
                        if (record.invalidInvoiceNoWNSAP && record.invalidInvoiceNoWNSAP !== record.wnInvoiceNo) {
                            VAR_SAP_WN_INV = record.invalidInvoiceNoWNSAP + 'IC-C';
                        } else {
                            VAR_SAP_WN_INV = record.wnInvoiceNo + 'IC-C';
                        }
                    } else {
                        VAR_SAP_WN_INV = record.wnInvoiceNo + 'IC-C';
                    }

                    // Validate invoice number length
                    if (VAR_SAP_WN_INV.length > 15) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: 'Credit WN inv # cannot exceed 15 chars. Process entry manually.', process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        continue;
                    }


                    const subsequentFlowResult = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderItem', soi => {
                            soi.SalesOrder,
                                soi.SalesOrderItem,
                                soi.to_SubsequentProcFlowDocItem(subsequentItem => {
                                    subsequentItem.SalesOrder,
                                        subsequentItem.SalesOrderItem,
                                        subsequentItem.SubsequentDocumentCategory,
                                        subsequentItem.SubsequentDocument,
                                        subsequentItem.SubsequentDocumentItem
                                })
                        })
                            .where({
                                SalesOrder: VAR_VBELN,
                                SalesOrderItem: VAR_POSNR
                            })
                    );
                    // subsequentFlowResult[0].to_SubsequentProcFlowDocItem;
                    const filteredSubsequentItems = subsequentFlowResult[0].to_SubsequentProcFlowDocItem.filter(
                        item => item.SubsequentDocumentCategory === 'M'
                    );

                    if (!filteredSubsequentItems || filteredSubsequentItems.length === 0) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `No invoices for WN inv # ${record.wnInvoiceNo} exist.`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        continue;
                    }

                    if (filteredSubsequentItems.length > 1) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: 'Multiple SAP Invoices for one WN Invoice. Do not know which one to credit', process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        continue;
                    }

                    // Store the calculated invoice number
                    record.invoiceNoWNSAP = VAR_SAP_WN_INV;

                    const currentDate = new Date();
                    const dateString = `/Date(${currentDate.getTime()})/`;

                    // Create payload for credit memo request
                    const creditMemoPayload = {
                        CreditMemoRequestType: 'CR',
                        CreditMemoRequestDate: dateString, //currentdate
                        TransactionCurrency: transactionCurrency, // Sales order Header currency
                        SDDocumentReason: '101',
                        BillingDocumentDate: dateString, //curentdate
                        ReferenceSDDocument: filteredSubsequentItems[0].SubsequentDocument,
                        ReferenceSDDocumentCategory: 'M',
                        AssignmentReference: record.wnInvoiceNo,
                        to_Item: {
                            results: filteredSubsequentItems.map(item => ({
                                CreditMemoRequestItem: '10',
                                ReferenceSDDocument: item.SubsequentDocument,
                                ReferenceSDDocumentItem: item.SubsequentDocumentItem
                            }))
                        }
                    };

                    console.log('Credit Memo Payload:', JSON.stringify(creditMemoPayload, null, 2));
                    let result;
                    try {
                        result = await this.creditMemoRequestAPI.createCreditMemoRequest(creditMemoPayload);
                    } catch (apiError) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `API Error creating credit memo request: ${apiError.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        continue;
                    }


                    if (!result || !result.CreditMemoRequest) {
                        aErrorLogs.push({
                            record_ID: record.ID,
                            message: `Failed to create credit memo request: ${result.message}`, process_code: sProcessCode
                        });
                        aFailedRecordIDs.push(record.ID);
                        continue;
                    }

                    console.log('Credit Memo Request Created:', result);
                    // Store the credit memo number in the record
                    if (result.CreditMemoRequest) {
                        record.creditMemoSAP = result.CreditMemoRequest;
                    }



                    // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'L', createdAt: new Date() });
                    // await this._deletePreviousSteps(record.ID, 'L');
                    aPassedRecordIDs.push(record.ID);
                } else {
                    aPassedRecordIDs.push(record.ID);
                }
            } catch (err) {
                aErrorLogs.push({
                    record_ID: record.ID,
                    message: `Error creating credit memo: ${err.message}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(record.ID);
            }
        }
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true),
                await Promise.allSettled(
                    aRecordsForProcessing
                        .filter(record => aPassedRecordIDs.includes(record.ID))
                        .map(record =>
                            UPDATE(Credit_Rebill)
                                .set({
                                    valid: true,
                                    processLevel_code: sProcessCode,
                                    invoiceNoWNSAP: record.invoiceNoWNSAP,
                                    creditMemoSAP: record.creditMemoSAP
                                })
                                .where({ ID: record.ID })
                        )
                );
        }
        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            this.markRecordsValid(sProcessCode, aFailedRecordIDs, false),
                await UPDATE(Credit_Rebill)
                    .set({ valid: false, processLevel_code: sProcessCode })
                    .where({ ID: { in: aFailedRecordIDs } });
        }
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step N (Create Credit MIRO)
    async CreditMIRO(sProcessCode, bBreakExecution) {
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

        for (const record of aRecordsForProcessing) {
            try {
                if (record.creditSteps && record.creditSteps.split(',').includes('N') || record.creditSteps.split(',').includes('*')) {

                    let salesOrder, salesOrderItem, purchaseOrder, purchaseOrderItem;

                    if (record.creditSteps && record.creditSteps.split(',').includes('*')) {
                        // Get legacy invoice data directly from entity
                        const legacyInvoiceResult = await SELECT.from(Credits_for_LegacyInvoices)
                            .columns([
                                'salesOrder', 'salesOrderItem', 'purchaseOrder', 'purchaseOrderItem',
                                'employeeZ3', 'supplier', 'companyCode',
                                'salesOrganization', 'distributionChannel', 'division', 'salesOffice',
                                'soldToParty', 'billToParty', 'payer', 'employeeName', 'customerGroup',
                                'transactionCurrency', 'purchaseOrderByCustomer', 'billingDocument',
                                'billingDate', 'billingDocumentItem', 'salesOrderMaterial',
                                'salesOrderMaterialText', 'paymentTerms', 'plant', 'internalOrderNo',
                                'conditionType', 'amount', 'taxCode', 'taxJurisdictionCode',
                                'taxItemClassification', 'glAccount', 'billingTaxAmount'
                            ])
                            .where({ zzInvoice: record.wnInvoiceNo });

                        if (!legacyInvoiceResult || !legacyInvoiceResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No legacy invoice data found for WN Invoice ${record.wnInvoiceNo}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        const legacyData = legacyInvoiceResult[0];

                        // Use legacy data for step N processing
                        salesOrder = legacyData.salesOrder;
                        salesOrderItem = legacyData.salesOrderItem;
                        purchaseOrder = legacyData.purchaseOrder;
                        purchaseOrderItem = legacyData.purchaseOrderItem;

                        // Store the values in the record
                        record.purchaseDocumentNoSAP = purchaseOrder;
                        record.purchaseDocumentItemSAP = purchaseOrderItem;

                        // Create Journal Entry for legacy invoice using WSDL
                        try {
                            const currentDate = new Date();
                            const fiscalYear = currentDate.getFullYear().toString();
                            const dateString = `/Date(${currentDate.getTime()})/`;
                            const postingDate = currentDate.toISOString().split('T')[0];
                            const shortId = record.ID.toString().substring(0, 20);
                            const msgId = `MSG_${shortId}`;
                            const subMsgId = `SUB_${shortId}`;
                            // Create XML payload for Journal Entry using legacy data
                            //                             const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
                            // <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sfi="http://sap.com/xi/SAPSCORE/SFIN">
                            //     <soapenv:Header/>
                            //     <soapenv:Body>
                            //         <sfi:JournalEntryBulkCreateRequest>
                            //             <MessageHeader>
                            //                 <ID>${record.ID}</ID>
                            //                 <CreationDateTime>${currentDate.toISOString()}</CreationDateTime>
                            //                 <TestDataIndicator>false</TestDataIndicator>
                            //             </MessageHeader>
                            //             <JournalEntry>
                            //                 <BusinessTransactionType>1000</BusinessTransactionType>
                            //                 <AccountingDocumentType>SA</AccountingDocumentType>
                            //                 <CreatedByUser>SYSTEM</CreatedByUser>
                            //                 <CompanyCode>${legacyData.companyCode || '1200'}</CompanyCode>
                            //                 <DocumentDate>${postingDate}</DocumentDate>
                            //                 <PostingDate>${postingDate}</PostingDate>
                            //                 <DocumentHeaderText>Credit Rebill Legacy</DocumentHeaderText>
                            //                 <AssignmentReference>${record.wnInvoiceNo}</AssignmentReference>
                            //                 <Item>
                            //                     <GLAccount>${legacyData.glAccount || '0000400000'}</GLAccount>
                            //                     <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">${legacyData.amount || '0.00'}</AmountInTransactionCurrency>
                            //                     <DebitCreditCode>H</DebitCreditCode>
                            //                     <DocumentItemText>Credit for ${record.wnInvoiceNo}</DocumentItemText>
                            //                     <AssignmentReference>${record.wnInvoiceNo}</AssignmentReference>
                            //                     <AccountAssignment>
                            //                         <CostCenter>${legacyData.costCenter || '0000000000'}</CostCenter>
                            //                     </AccountAssignment>
                            //                 </Item>
                            //                 <Item>
                            //                     <GLAccount>${legacyData.glAccount || '0000400000'}</GLAccount>
                            //                     <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">-${legacyData.amount || '0.00'}</AmountInTransactionCurrency>
                            //                     <DebitCreditCode>S</DebitCreditCode>
                            //                     <DocumentItemText>Credit for ${record.wnInvoiceNo}</DocumentItemText>
                            //                     <AssignmentReference>${record.wnInvoiceNo}</AssignmentReference>
                            //                     <AccountAssignment>
                            //                         <CostCenter>${legacyData.costCenter || '0000000000'}</CostCenter>
                            //                     </AccountAssignment>
                            //                 </Item>
                            //             </JournalEntry>
                            //         </sfi:JournalEntryBulkCreateRequest>
                            //     </soapenv:Body>
                            // </soapenv:Envelope>`;   
                            // const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
                            // <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sfi="http://sap.com/xi/SAPSCORE/SFIN">
                            //     <soapenv:Header/>
                            //     <soapenv:Body>
                            //         <sfi:JournalEntryBulkCreateRequest>
                            //             <MessageHeader>
                            //                 <ID>MSG_${record.ID}</ID>
                            //                 <CreationDateTime>${currentDate.toISOString()}</CreationDateTime>
                            //                 <TestDataIndicator>false</TestDataIndicator>
                            //             </MessageHeader>
                            //             <JournalEntryCreateRequest>
                            //                 <MessageHeader>
                            //                     <ID>SUB_MSG_${record.ID}</ID>
                            //                     <CreationDateTime>${currentDate.toISOString()}</CreationDateTime>
                            //                 </MessageHeader>
                            //                 <JournalEntry>
                            //                     <OriginalReferenceDocumentType>BKPFF</OriginalReferenceDocumentType>
                            //                     <OriginalReferenceDocument>CREDIT_REBILL</OriginalReferenceDocument>
                            //                     <OriginalReferenceDocumentLogicalSystem/>
                            //                     <BusinessTransactionType>RFBU</BusinessTransactionType>
                            //                     <AccountingDocumentType>KR</AccountingDocumentType>
                            //                     <DocumentReferenceID>${record.wnInvoiceNo}</DocumentReferenceID>
                            //                     <DocumentHeaderText>Credit Rebill Legacy Invoice</DocumentHeaderText>
                            //                     <CreatedByUser>SYSTEM</CreatedByUser>
                            //                     <CompanyCode>${legacyData.companyCode || '1200'}</CompanyCode>
                            //                     <DocumentDate>${postingDate}</DocumentDate>
                            //                     <PostingDate>${postingDate}</PostingDate>
                            //                     <AssignmentReference>${record.wnInvoiceNo}</AssignmentReference>
                            //                     <Item>
                            //                         <GLAccount>${legacyData.glAccount || '0000400000'}</GLAccount>
                            //                         <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">${legacyData.amount || '0.00'}</AmountInTransactionCurrency>
                            //                         <DebitCreditCode>S</DebitCreditCode>
                            //                         <DocumentItemText>Credit for ${record.wnInvoiceNo}</DocumentItemText>
                            //                         <AssignmentReference>${record.wnInvoiceNo}</AssignmentReference>
                            //                         <AccountAssignment>
                            //                             <WBSElement>${legacyData.internalOrderNo || '4400000072'}</WBSElement>
                            //                         </AccountAssignment>
                            //                         <Tax>
                            //                             <TaxCode>I0</TaxCode>
                            //                             <TaxJurisdiction>4500000000</TaxJurisdiction>
                            //                             <TaxItemGroup>001</TaxItemGroup>
                            //                         </Tax>
                            //                     </Item>
                            //                     <CreditorItem>
                            //                         <ReferenceDocumentItem>2</ReferenceDocumentItem>
                            //                         <Creditor>${legacyData.supplier || ''}</Creditor>
                            //                         <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">-${legacyData.amount || '0.00'}</AmountInTransactionCurrency>
                            //                         <DebitCreditCode>H</DebitCreditCode>
                            //                     </CreditorItem>
                            //                     <ProductTaxItem>
                            //                         <TaxCode>I0</TaxCode>
                            //                         <TaxItemGroup>001</TaxItemGroup>
                            //                         <TaxJurisdiction>4500000000</TaxJurisdiction>
                            //                         <TaxItemClassification>NVV</TaxItemClassification>
                            //                         <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">0</AmountInTransactionCurrency>
                            //                         <TaxBaseAmountInTransCrcy currencyCode="${legacyData.transactionCurrency || 'USD'}">${legacyData.amount || '0.00'}</TaxBaseAmountInTransCrcy>
                            //                     </ProductTaxItem>
                            //                 </JournalEntry>
                            //             </JournalEntryCreateRequest>
                            //         </sfi:JournalEntryBulkCreateRequest>
                            //     </soapenv:Body>
                            // </soapenv:Envelope>`;
                            //                             const xmlPayload = `<sfin:JournalEntryBulkCreateRequest xmlns:sfin="http://sap.com/xi/SAPSCORE/SFIN">
                            //     <MessageHeader>
                            //         <ID>${msgId}</ID>
                            //         <CreationDateTime>${currentDate.toISOString()}</CreationDateTime>
                            //         <TestDataIndicator>false</TestDataIndicator>
                            //     </MessageHeader>
                            //     <JournalEntryCreateRequest>
                            //         <MessageHeader>
                            //             <ID>${subMsgId}</ID>
                            //             <CreationDateTime>${currentDate.toISOString()}</CreationDateTime>
                            //         </MessageHeader>
                            //         <JournalEntry>
                            //             <OriginalReferenceDocumentType>BKPFF</OriginalReferenceDocumentType>
                            //             <OriginalReferenceDocument>CREDIT_REBILL</OriginalReferenceDocument>
                            //             <OriginalReferenceDocumentLogicalSystem/>
                            //             <BusinessTransactionType>RFBU</BusinessTransactionType>
                            //             <AccountingDocumentType>KR</AccountingDocumentType>
                            //             <DocumentReferenceID>${record.wnInvoiceNo}</DocumentReferenceID>
                            //             <DocumentHeaderText>Credit Rebill Legacy Invoice</DocumentHeaderText>
                            //             <CreatedByUser>SYSTEM</CreatedByUser>
                            //             <CompanyCode>${legacyData.companyCode || '1200'}</CompanyCode>
                            //             <DocumentDate>${postingDate}</DocumentDate>
                            //             <PostingDate>${postingDate}</PostingDate>
                            //             <AssignmentReference>${record.wnInvoiceNo}</AssignmentReference>
                            //             <Item>
                            //                 <GLAccount>${legacyData.glAccount || '0000400000'}</GLAccount>
                            //                 <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">${legacyData.amount || '0.00'}</AmountInTransactionCurrency>
                            //                 <DebitCreditCode>S</DebitCreditCode>
                            //                 <DocumentItemText>Credit for ${record.wnInvoiceNo}</DocumentItemText>
                            //                 <AssignmentReference>${record.wnInvoiceNo}</AssignmentReference>
                            //                 <AccountAssignment>
                            //                     <WBSElement>${legacyData.internalOrderNo || '4400000072'}</WBSElement>
                            //                 </AccountAssignment>
                            //                 <Tax>
                            //                     <TaxCode>I0</TaxCode>
                            //                     <TaxJurisdiction>4500000000</TaxJurisdiction>
                            //                     <TaxItemGroup>001</TaxItemGroup>
                            //                 </Tax>
                            //             </Item>
                            //             <CreditorItem>
                            //                 <ReferenceDocumentItem>2</ReferenceDocumentItem>
                            //                 <Creditor>${legacyData.supplier || ''}</Creditor>
                            //                 <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">-${legacyData.amount || '0.00'}</AmountInTransactionCurrency>
                            //                 <DebitCreditCode>H</DebitCreditCode>
                            //             </CreditorItem>
                            //             <ProductTaxItem>
                            //                 <TaxCode>I0</TaxCode>
                            //                 <TaxItemGroup>001</TaxItemGroup>
                            //                 <TaxJurisdiction>4500000000</TaxJurisdiction>
                            //                 <TaxItemClassification>NVV</TaxItemClassification>
                            //                 <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">0</AmountInTransactionCurrency>
                            //                 <TaxBaseAmountInTransCrcy currencyCode="${legacyData.transactionCurrency || 'USD'}">${legacyData.amount || '0.00'}</TaxBaseAmountInTransCrcy>
                            //             </ProductTaxItem>
                            //         </JournalEntry>
                            //     </JournalEntryCreateRequest>
                            // </sfin:JournalEntryBulkCreateRequest>`;
                            const xmlPayload = `<sfin:JournalEntryBulkCreateRequest xmlns:sfin="http://sap.com/xi/SAPSCORE/SFIN">
<MessageHeader>
  <ID>${msgId}</ID>
  <CreationDateTime>${currentDate.toISOString()}</CreationDateTime>
</MessageHeader>
<JournalEntryCreateRequest>
  <MessageHeader>
    <ID>${subMsgId}</ID>
    <CreationDateTime>${currentDate.toISOString()}</CreationDateTime>
  </MessageHeader>
  <JournalEntry>
    <OriginalReferenceDocumentType>BKPFF</OriginalReferenceDocumentType>
    <OriginalReferenceDocument>CREDIT_REBILL</OriginalReferenceDocument>
    <OriginalReferenceDocumentLogicalSystem/>
    <BusinessTransactionType>RFBU</BusinessTransactionType>
    <AccountingDocumentType>KR</AccountingDocumentType>
    <DocumentReferenceID>${record.wnInvoiceNo}</DocumentReferenceID>
    <DocumentHeaderText>Credit Rebill</DocumentHeaderText>
    <CreatedByUser>SYSTEM</CreatedByUser>
    <CompanyCode>${legacyData.companyCode || '1200'}</CompanyCode>
    <DocumentDate>${postingDate}</DocumentDate>
    <PostingDate>${postingDate}</PostingDate>
    <Item>
      <GLAccount>${legacyData.glAccount || '0000400000'}</GLAccount>
      <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">${legacyData.amount || '0.00'}</AmountInTransactionCurrency>
      <DebitCreditCode>S</DebitCreditCode>
      <Tax>
        <TaxCode>I0</TaxCode>
        <TaxJurisdiction>4500000000</TaxJurisdiction>
        <TaxItemGroup>001</TaxItemGroup>
      </Tax>
      <AccountAssignment>
        <WBSElement>${legacyData.internalOrderNo || '4400000072'}</WBSElement>
      </AccountAssignment>
    </Item>
    <CreditorItem>
      <ReferenceDocumentItem>2</ReferenceDocumentItem>
      <Creditor>${legacyData.supplier || ''}</Creditor>
      <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">-${legacyData.amount || '0.00'}</AmountInTransactionCurrency>
      <DebitCreditCode>H</DebitCreditCode>
    </CreditorItem>
    <ProductTaxItem>
      <TaxCode>I0</TaxCode>
      <TaxItemGroup>001</TaxItemGroup>
      <TaxJurisdiction>4500000000</TaxJurisdiction>
      <TaxItemClassification>NVV</TaxItemClassification>
      <AmountInTransactionCurrency currencyCode="${legacyData.transactionCurrency || 'USD'}">0</AmountInTransactionCurrency>
      <TaxBaseAmountInTransCrcy currencyCode="${legacyData.transactionCurrency || 'USD'}">${legacyData.amount || '0.00'}</TaxBaseAmountInTransCrcy>
    </ProductTaxItem>
  </JournalEntry>
</JournalEntryCreateRequest>
</sfin:JournalEntryBulkCreateRequest>`;

                            // Call the Journal Entry WSDL service
                            const client = await journalServicePromise;
                            const hardcodedEndpoint = 'https://my420210-api.s4hana.cloud.sap/sap/bc/srt/scs_ext/sap/journalentrycreaterequestconfi';
                            client.setEndpoint(hardcodedEndpoint);
                            // client.setEndpoint(journalServiceEndpoint.url);
                            const [journalResult] = await client.JournalEntryCreateRequestConfirmation_InAsync({ _xml: xmlPayload });

                            if (journalResult && journalResult.JournalEntryCreateConfirmation) {
                                this.LOG._info && this.LOG.info(`Journal Entry created successfully for record ${record.ID}`);
                                aPassedRecordIDs.push(record.ID);
                                continue;
                            } else {
                                throw new Error('Journal Entry creation failed - no confirmation received');
                            }

                        } catch (journalError) {
                            this.LOG._error && this.LOG.error(`Journal Entry creation failed for record ${record.ID}:`, journalError);
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Journal Entry creation failed: ${journalError.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                    }
                    else {

                        // Query 1: Get sales order and item number using invoice number
                        const salesOrderItemResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem')
                                .columns(['SalesOrder', 'SalesOrderItem'])
                                .where({ YY1_WNInvoice_SD_SDI: record.wnInvoiceNo })
                        );

                        if (!salesOrderItemResult || !salesOrderItemResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No sales order item found for invoice ${record.wnInvoiceNo}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        salesOrder = salesOrderItemResult[0].SalesOrder;
                        salesOrderItem = salesOrderItemResult[0].SalesOrderItem;

                        // Query 2: Get purchase order using sales order and item 0010
                        const purchaseOrderResult = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderItem')
                                .columns(['YY1_WNWorkOrder_SD_SDI', 'YY1_PurchasingDoc_SD_SDI'])
                                .where({

                                    SalesOrder: salesOrder,
                                    SalesOrderItem: '000010'

                                })
                        );

                        if (!purchaseOrderResult || !purchaseOrderResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No purchase order found for sales order ${salesOrder}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        purchaseOrder = purchaseOrderResult[0].YY1_PurchasingDoc_SD_SDI;

                        // Query 3: Get SupplierInvoice using PurchaseOrder and PurchaseOrderItem
                        const supplierInvoiceResult = await this.supplierInvoiceAPI.executeQuery(
                            SELECT.from('A_SuplrInvcItemPurOrdRef')
                                .columns(['SupplierInvoice', 'SupplierInvoiceItem', 'SupplierInvoiceItemAmount',
                                    'PurchaseOrderQuantityUnit',
                                    'PurchaseOrderQtyUnitSAPCode',
                                    'PurchaseOrderQtyUnitISOCode',
                                    'QuantityInPurchaseOrderUnit',
                                    'PurchaseOrderPriceUnit',
                                    'PurchaseOrderPriceUnitSAPCode',
                                    'PurchaseOrderPriceUnitISOCode',
                                    'QtyInPurchaseOrderPriceUnit'])
                                .where({
                                    PurchaseOrder: purchaseOrder,
                                    PurchaseOrderItem: salesOrderItem

                                })
                        );

                        if (!supplierInvoiceResult || !supplierInvoiceResult.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No supplier invoice found for purchase order ${purchaseOrder} and item ${salesOrderItem}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }



                        const supplierInvoice = supplierInvoiceResult[0].SupplierInvoice;
                        const supplierInvoiceItem = supplierInvoiceResult[0].SupplierInvoiceItem;

                        // Store the values in the record
                        record.purchaseDocumentNoSAP = purchaseOrder;
                        record.purchaseDocumentItemSAP = salesOrderItem;
                        record.supplierInvoiceSAP = supplierInvoice;
                        record.supplierInvoiceItemSAP = supplierInvoiceItem;

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
                                ])
                                .where({

                                    SupplierInvoice: supplierInvoice,
                                    FiscalYear: fiscalYear

                                })
                        );

                        if (!supplierInvoiceDetails || !supplierInvoiceDetails.length) {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `No supplier invoice details found for invoice ${supplierInvoice} and fiscal year ${fiscalYear}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                            continue;
                        }

                        const invoiceDetails = supplierInvoiceDetails[0];

                        // Create MIRO payload with mapped fields from supplier invoice
                        const miroPayload = {
                            CompanyCode: invoiceDetails.CompanyCode,
                            DocumentDate: dateString,
                            SupplierInvoiceIsCreditMemo: "X",
                            PostingDate: dateString,
                            SupplierInvoiceIDByInvcgParty: invoiceDetails.SupplierInvoiceIDByInvcgParty,
                            InvoicingParty: invoiceDetails.InvoicingParty,
                            DocumentCurrency: invoiceDetails.DocumentCurrency,
                            InvoiceGrossAmount: supplierInvoiceResult[0].SupplierInvoiceItemAmount,
                            PaymentTerms: invoiceDetails.PaymentTerms,
                            DueCalculationBaseDate: dateString,
                            AccountingDocumentType: "RE",
                            AssignmentReference: record.wnInvoiceNo,
                            to_SuplrInvcItemPurOrdRef: {
                                results: [
                                    {
                                        SupplierInvoiceItem: "1",
                                        PurchaseOrder: record.purchaseDocumentNoSAP,
                                        PurchaseOrderItem: record.purchaseDocumentItemSAP,
                                        // Plant: invoiceDetails.Plant,
                                        // TaxCode: invoiceDetails.TaxCode,
                                        // TaxJurisdiction: invoiceDetails.TaxJurisdiction,
                                        DocumentCurrency: invoiceDetails.DocumentCurrency,
                                        SupplierInvoiceItemAmount: supplierInvoiceResult[0].SupplierInvoiceItemAmount,
                                        PurchaseOrderQuantityUnit: supplierInvoiceResult[0].PurchaseOrderQuantityUnit,
                                        PurchaseOrderQtyUnitSAPCode: supplierInvoiceResult[0].PurchaseOrderQtyUnitSAPCode,
                                        PurchaseOrderQtyUnitISOCode: supplierInvoiceResult[0].PurchaseOrderQtyUnitISOCode,
                                        QuantityInPurchaseOrderUnit: supplierInvoiceResult[0].QuantityInPurchaseOrderUnit,
                                        PurchaseOrderPriceUnit: supplierInvoiceResult[0].PurchaseOrderPriceUnit,
                                        PurchaseOrderPriceUnitSAPCode: supplierInvoiceResult[0].PurchaseOrderPriceUnitSAPCode,
                                        PurchaseOrderPriceUnitISOCode: supplierInvoiceResult[0].PurchaseOrderPriceUnitISOCode,
                                        QtyInPurchaseOrderPriceUnit: supplierInvoiceResult[0].QtyInPurchaseOrderPriceUnit
                                    }
                                ]
                            }
                        };

                        // Call the SupplierInvoice API to create MIRO
                        const createResult = await this.supplierInvoiceAPI.createSupplierInvoice(miroPayload);

                        if (createResult.SupplierInvoice) {
                            // await INSERT.into(InterfaceSteps).entries({ record_ID: record.ID, step: 'N', createdAt: new Date() });
                            // await this._deletePreviousSteps(record.ID, 'N');

                            aPassedRecordIDs.push(record.ID);
                        } else {
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error creating MIRO: ${createResult.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);
                        }
                    }
                } else {
                    aPassedRecordIDs.push(record.ID);
                }
            } catch (err) {
                aErrorLogs.push({
                    record_ID: record.ID,
                    message: `Error creating MIRO: ${err.message}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(record.ID);
            }
        }


        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(Credit_Rebill)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }

    //Step O (Delete Partner Function) or P (Delete Partner Function for IC)
    async DeletePF(sProcessCode, bBreakExecution) {
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

        for (const record of aRecordsForProcessing) {
            try {
                if (record.creditSteps && record.creditSteps.split(',').includes('O')) {
                    // const step = record.varIC === 'X' ? 'P' : 'O';
                    const VAR_SO = record.wnWorkOrderNo;
                    let soldToParty = null;
                    let freeDefinedAttribute02 = null;
                    let customerResult = null;
                    if (record.creditMemoSAP) {
                        const creditMemoRequestResult = await this.creditMemoRequestAPI.executeQuery(
                            SELECT.from('A_CreditMemoRequest')
                                .columns(['SoldToParty'])
                                .where({ CreditMemoRequest: record.creditMemoSAP })
                        );

                        if (creditMemoRequestResult && creditMemoRequestResult.length > 0) {
                            soldToParty = creditMemoRequestResult[0].SoldToParty;
                        }
                    }
                    if (soldToParty) {
                        customerResult = await this.businesPartnerAPI.executeQuery(
                            SELECT.from('A_Customer')
                                .columns(['FreeDefinedAttribute02'])
                                .where({ Customer: soldToParty })
                        );

                        if (customerResult && customerResult.length > 0) {
                            freeDefinedAttribute02 = customerResult[0].FreeDefinedAttribute02.trim();
                        }
                    }

                    let creditMemoReqPartner = null;
                    if (record.creditMemoSAP) {
                        const creditMemoReqPartnerResult = await this.creditMemoRequestAPI.executeQuery(
                            SELECT.from('A_CreditMemoReqPartner')
                                .columns(['CreditMemoRequest', 'PartnerFunction', 'Customer', 'Supplier'])
                                .where({ CreditMemoRequest: record.creditMemoSAP })
                        );
                        if (creditMemoReqPartnerResult && creditMemoReqPartnerResult.length > 0) {
                            creditMemoReqPartner = creditMemoReqPartnerResult;
                        }
                    }

                    if (record.creditMemoSAP && creditMemoReqPartner && creditMemoReqPartner.length > 0 && freeDefinedAttribute02 && freeDefinedAttribute02.trim().length > 0) {
                        try {
                            // Check which partner functions exist in the result
                            const partnerFunctionsToDelete = [];
                            const validPartnerFunctions = ['Z3', 'ZV', 'ZR'];

                            for (const partner of creditMemoReqPartner) {
                                if (validPartnerFunctions.includes(partner.PartnerFunction)) {
                                    partnerFunctionsToDelete.push(partner.PartnerFunction);
                                }
                            }

                            // Delete each partner function found
                            for (const partnerFunction of partnerFunctionsToDelete) {
                                const deletePartnerResult = await this.creditMemoRequestAPI.executeQuery(
                                    DELETE.from('A_CreditMemoReqPartner')
                                        .where({

                                            CreditMemoRequest: record.creditMemoSAP,
                                            PartnerFunction: partnerFunction

                                        })
                                );

                                console.log(`Deleted CreditMemoReqPartner with ${partnerFunction} PartnerFunction:`, deletePartnerResult);
                            }
                        } catch (deleteError) {
                            console.error('Error deleting CreditMemoReqPartner:', deleteError);
                            aErrorLogs.push({
                                record_ID: record.ID,
                                message: `Error deleting CreditMemoReqPartner: ${deleteError.message}`, process_code: sProcessCode
                            });
                            aFailedRecordIDs.push(record.ID);

                        }
                    }
                    if (!aFailedRecordIDs.includes(record.ID)) {
                        aPassedRecordIDs.push(record.ID);
                    }
                    // aPassedRecordIDs.push(record.ID);
                } else {
                    aPassedRecordIDs.push(record.ID);
                }
            } catch (err) {
                aErrorLogs.push({
                    record_ID: record.ID,
                    message: `Error in DeletePF: ${err.message}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(record.ID);
            }
        }

        // Update the status of passed records
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3})));
            await UPDATE(Credit_Rebill)
                .set({
                    valid: true,
                    processLevel_code: sProcessCode
                })
                .where({ ID: { in: aPassedRecordIDs } });
        }

        // Update the status of failed records
        if (aFailedRecordIDs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(Credit_Rebill)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0,
        };
    }
}

module.exports = CreditFG;