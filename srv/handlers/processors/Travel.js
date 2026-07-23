// processors/Travel.js

const moment = require('moment');
const cds = require('@sap/cds');
const {
    SELECT,
    UPDATE,
    INSERT
} = cds.ql;
const LOG = cds.log('Monitor.Processor-Travel');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');
const SalesOrderComm = require('../communicators/SalesOrder');
const PurchaseOrder = require('../communicators/PurchaseOrder');
const BusinessPartner = require('../communicators/BusinessPartner');
const SupplierInvoice = require('../communicators/SupplierInvoice');
const SalesVCData1 = require('../communicators/SalesVCData_1');
const SalesVCData2 = require('../communicators/SalesVCData_2');
const EmpTimeData = require('../communicators/EmpTimeData');
const SalesContract = require('../communicators/SalesContract');
const EnterpriseProject = require('../communicators/EnterpriseProject');
const SupplierLFA1Comm = require('../communicators/SupplierLFA1');
const {
    determineConditionType
} = require('../common/pricingHelper');

class Travel extends Processor {
    constructor(options) {
        super(options);
        LOG.info(`[constructor] options=${JSON.stringify(options)}`);
        this.recordsEntity = 'com.aleron.monitor.Travel';
        this.columnsForRecords = this._getColumnsForFetch();
        this.supplierLFA1API = this.supplierLFA1API || new SupplierLFA1Comm();

    }

    _getColumnsForFetch() {
        LOG.info('[ _getColumnsForFetch ]');
        return [
            'ID', 'file_ID', 'processLevel_code', 'valid',
            'contractNo', 'wnInvoiceNo', 'sapEmployeeNo', 'wnWorkOrder',
            'woType', 'internalOrder', 'weekEndDate', 'beginDate', 'endDate',
            'tripActivityType', 'country', 'tripExpenseType', 'amount', 'currency',
            'personnelNoSAP', 'salesDocumentNoSAP', 'salesItemNoSAP',
            'projectNumberSAP', 'PORequiredSAP', 'purchaseDocumentNoSAP',
            'purchaseDocumentItemSAP', 'tripRequiredSAP', 'tripNoSAP',
            'salesDocumentTypeSAP', 'fiscalYearSAP', 'invoiceDocumentNoSAP',
            'salesOrderICSAP', 'salesItemNoICSAP', 'distributionChannelSAP',
            'distributionChannelICSAP', 'salesOrderICUpdateRequired',
            'employeeSubgroupSAP', 'projectNumberICSAP', 'skipTrip'
        ];
    }

    async getNextLineItem(soNumber, poNumber) {
        // 1) SO max
        const soTop = await this.salesOrderAPI.executeQuery(
            SELECT.one.from('A_SalesOrderItem')
                .columns(['SalesOrderItem'])
                .where({
                    SalesOrder: soNumber
                })
                .orderBy('SalesOrderItem desc')
        );
        const soMax = parseInt(soTop?.SalesOrderItem || '0', 10);

        // 2) PO max
        let poMax = 0;
        if (poNumber) {
            const poTop = await this.purchaseOrderAPI.executeQuery(
                SELECT.one.from('PurchaseOrderItem')
                    .columns(['PurchaseOrderItem'])
                    .where({
                        PurchaseOrder: poNumber
                    })
                    .orderBy('PurchaseOrderItem desc')
            );
            poMax = parseInt(poTop?.PurchaseOrderItem || '0', 10);
        }

        // 3) next = max + 10, zero-pad
        const next = Math.max(soMax, poMax) + 10;
        return String(next).padStart(5, '0');
    }


    async prepareCommunicators() {
        LOG.info('[prepareCommunicators] starting communicator setup');

        // Sales Order communicator
        this.salesOrderAPI = new SalesOrderComm();
        this.oAPI = this.salesOrderAPI.getConnection();
        LOG.info('[prepareCommunicators] salesOrderAPI communicator ready');

        // Purchase Order communicator
        this.purchaseOrderAPI = new PurchaseOrder();
        this.poAPI = this.purchaseOrderAPI.getConnection();
        LOG.info('[prepareCommunicators] purchaseOrderAPI communicator ready');

        // Sales VC Data communicators
        this.salesVCData1Api = new SalesVCData1();
        await this.salesVCData1Api.getConnection();

        this.salesVCData2Api = new SalesVCData2();
        await this.salesVCData2Api.getConnection();

        // Business Partner communicator
        this.businessPartnerAPI = new BusinessPartner();
        this.bpAPI = this.businessPartnerAPI.getConnection();
        LOG.info('[prepareCommunicators] businessPartnerAPI communicator ready');

        // Supplier Invoice communicator
        this.supplierInvoiceAPI = new SupplierInvoice();
        this.siAPI = this.supplierInvoiceAPI.getConnection();
        LOG.info('[prepareCommunicators] supplierInvoiceAPI communicator ready');

        // Employee Time Data communicator
        this.empTimeDataAPI = new EmpTimeData();
        if (typeof this.empTimeDataAPI.initConnection === 'function') {
            this.empTimeDataAPI.initConnection();
        }
        LOG.info('[prepareCommunicators] empTimeDataAPI communicator ready');

        // Sales Contract communicator
        this.salesContractAPI = new SalesContract();
        this.scAPI = this.salesContractAPI.getConnection();
        LOG.info('[prepareCommunicators] salesContractAPI communicator ready');

        // Enterprise Project communicator
        this.enterpriseProjectAPI = new EnterpriseProject();
        this.epAPI = this.enterpriseProjectAPI.getConnection();
        LOG.info('[prepareCommunicators] enterpriseProjectAPI communicator ready');

        LOG.info('[prepareCommunicators] all communicators ready');
    }

    // Step 1: Validate
    async validateRecords(sProcessCode, bBreakExecution) {
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        // Enhancement: only process when processCode is 0 or 1
        if (!['0', '1'].includes(sProcessCode)) {
            LOG.info(`[validateRecords] SKIPPING because processCode not in [0,1]`);
            return {
                hasError: false,
                continue: true
            };
        }

        // clean logs once at start
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);

        // STEP 1: Filter & prepare
        LOG.info(`[validateRecords] STEP 1 BEGIN: Filter by processCode='${sProcessCode}'`);
        const aRecordsForProcessing = [];
        const aRecordIDs = [];

        for (const rec of this.records) {
            LOG.info(`Record ${rec.ID} → processLevel_code='${rec.processLevel_code}', valid='${rec.valid}'`);
            if (this.shouldRecordProcess(rec, sProcessCode)) {
                aRecordsForProcessing.push(rec);
                aRecordIDs.push(rec.ID);
                LOG.info(`Record ${rec.ID} → INCLUDED`);
            } else {
                aSkippedRecords.push(rec);
                LOG.info(`Record ${rec.ID} → SKIPPED`);
            }
        }

        LOG.info(`→ Removing previous logs for these IDs: ${aRecordIDs.join(',')}`);
        await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);
        this.updateProcessingState(sProcessCode);

        if (!aRecordsForProcessing.length) {
            LOG.info(`[validateRecords] STEP 1 END: No records to process`);
            return { hasError: false, continue: true };
        }
        LOG.info(`[validateRecords] STEP 1 CONTINUE: processing IDs=${aRecordIDs.join(',')}`);

        // —————————————————————————————
        // STEP 1.0x: Contract type enrichment (before grouping)
        // —————————————————————————————
        LOG.info(`STEP 1.0x: Enriching wnWorkOrder based on contract type rules`);

        for (const rec of aRecordsForProcessing) {
            try {
                LOG.info(`STEP 1.0x: Record ${rec.ID} → Input: contractNo='${rec.contractNo}', wnWorkOrder='${rec.wnWorkOrder}'`);

                // lookup in custom mapping table
                const csOrder = await SELECT.one
                    .from('com.aleron.monitor.CUSTOMERSALEORDERS')
                    .columns(['CONTRACTTYPE', 'CONTRACT'])
                    .where({ CONTRACT: rec.contractNo });

                if (!csOrder) {
                    LOG.info(`STEP 1.0x: Record ${rec.ID} → No matching CUSTOMER SALE ORDER → skipping enrichment`);
                    continue;
                }

                const contractType = csOrder.CONTRACTTYPE;
                LOG.info(`STEP 1.0x: Record ${rec.ID} → Found contractType='${contractType}'`);

                // — Case 1: CONTRACTTYPE = 1 —
                if (contractType === '1' && rec.wnWorkOrder) {

                    LOG.info(
                        `STEP 1.0x: Record ${rec.ID} → Looking up SalesOrderItem with wnWorkOrder='${rec.wnWorkOrder}', item='000010'`
                    );

                    let soItem = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrderItem')
                            .columns(['SalesOrder'])
                            .where({
                                YY1_WNWorkOrder_SD_SDI: rec.wnWorkOrder,
                                SalesOrderItem: '000010'
                            })
                    );

                    // ----------------------------
                    // NEW ELSE CASE (fallback)
                    // ----------------------------
                    if (!soItem) {
                        LOG.info(
                            `STEP 1.0x: Record ${rec.ID} → No SalesOrderItem found via YY1_WNWorkOrder_SD_SDI, ` +
                            `trying fallback: A_SalesOrder with YY1_AlphanumericSalesO_SDH='${rec.wnWorkOrder}'`
                        );

                        const soHdrFallback = await this.salesOrderAPI.executeQuery(
                            SELECT.one.from('A_SalesOrder')
                                .columns(['SalesOrder'])   // we only need SalesOrder
                                .where({ YY1_AlphanumericSalesO_SDH: rec.wnWorkOrder })
                        );

                        if (soHdrFallback && soHdrFallback.SalesOrder) {
                            const newWO = soHdrFallback.SalesOrder;   // 
                            LOG.info(
                                `STEP 1.0x: Record ${rec.ID} (fallback) → Updating wnWorkOrder '${rec.wnWorkOrder}' → '${newWO}'`
                            );

                            rec.wnWorkOrder = newWO;
                            await UPDATE(this.recordsEntity)
                                .set({ wnWorkOrder: newWO })
                                .where({ ID: rec.ID });

                            // fallback succeeded, continue with rest of validation
                        } else {
                            LOG.error(
                                `STEP 1.0x: Record ${rec.ID} → Fallback SalesOrder lookup also failed → ERROR OUT`
                            );
                            continue;
                        }
                    } else {
                        // ----------------------------
                        // ORIGINAL LOGIC CONTINUES HERE
                        // ----------------------------
                        LOG.info(
                            `STEP 1.0x: Record ${rec.ID} → Found SalesOrder='${soItem.SalesOrder}', fetching alphanumeric`
                        );

                        const soHdr = await this.salesOrderAPI.executeQuery(
                            SELECT.one.from('A_SalesOrder')
                                .columns(['YY1_AlphanumericSalesO_SDH'])
                                .where({ SalesOrder: soItem.SalesOrder })
                        );

                        if (soHdr && soHdr.YY1_AlphanumericSalesO_SDH) {
                            const newWO = soHdr.YY1_AlphanumericSalesO_SDH;
                            LOG.info(
                                `STEP 1.0x: Record ${rec.ID} → Updating wnWorkOrder '${rec.wnWorkOrder}' → '${newWO}'`
                            );

                            rec.wnWorkOrder = newWO;

                            await UPDATE(this.recordsEntity)
                                .set({ wnWorkOrder: newWO })
                                .where({ ID: rec.ID });
                        } else {
                            LOG.info(
                                `STEP 1.0x: Record ${rec.ID} → No alphanumeric found for SalesOrder='${soItem.SalesOrder}'`
                            );
                        }
                    }
                }

                // — Case 2: CONTRACTTYPE = 2 —
                else if (contractType === '2' && rec.wnWorkOrder) {
                    LOG.info(`STEP 1.0x: Record ${rec.ID} → Looking up SalesOrder by AssignmentReference='${rec.wnWorkOrder}'`);

                    const soHdr2 = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrder')
                            .columns(['YY1_AlphanumericSalesO_SDH'])
                            .where({ AssignmentReference: rec.wnWorkOrder })
                    );

                    if (soHdr2 && soHdr2.YY1_AlphanumericSalesO_SDH) {
                        const newWO = soHdr2.YY1_AlphanumericSalesO_SDH;
                        LOG.info(`STEP 1.0x: Record ${rec.ID} → Updating wnWorkOrder '${rec.wnWorkOrder}' → '${newWO}'`);
                        rec.wnWorkOrder = newWO;
                        await UPDATE(this.recordsEntity)
                            .set({ wnWorkOrder: newWO })
                            .where({ ID: rec.ID });
                    } else {
                        LOG.info(`STEP 1.0x: Record ${rec.ID} → No alphanumeric found for AssignmentReference='${rec.wnWorkOrder}'`);
                    }
                }

                // — Else: do nothing —
                else {
                    LOG.info(`STEP 1.0x: Record ${rec.ID} → Skipped enrichment (contractType='${contractType}', wnWorkOrder='${rec.wnWorkOrder}')`);
                }

            } catch (err) {
                LOG.error(`STEP 1.0x FAILED for record ${rec.ID} → ${err.message}`);
                LOG.error(`STEP 1.0x FAILED stack → ${err.stack}`);
            }
        }
        LOG.info(`STEP 1.0x DONE → proceeding to Step 1.1 grouping`);


        // STEP 1.1: Grouping
        LOG.info(`[validateRecords] STEP 1.1 BEGIN: Grouping ${aRecordsForProcessing.length} records`);
        const groups = {};
        for (const rec of aRecordsForProcessing) {
            const key = [
                rec.woType,
                rec.wnWorkOrder,
                rec.wnInvoiceNo,
                rec.endDate,
                rec.currency
            ].join('||');
            (groups[key] = groups[key] || []).push(rec);
        }
        LOG.info(`[validateRecords] STEP 1.1 END: Created ${Object.keys(groups).length} groups`);



        // STEP 1.2 / 1.3: DUPLICATE & FALIDATE per group
        for (const [key, group] of Object.entries(groups)) {
            LOG.info(`>>> ENTER GROUP ${key} (size=${group.length})`);
            const lead = group[0];

            // STEP 1.2: DUPLICATE CHECK
            LOG.info(`Group ${key} → STEP 1.2 BEGIN`);
            let dupFailed = false;

            if (['CP', 'CR'].includes(lead.woType)) {
                // — fetch header
                let soHdr = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns(['SalesOrder', 'DistributionChannel', 'CustomerGroup'])
                        .where({
                            SalesOrder: lead.wnWorkOrder,
                            DistributionChannel: { in: ['CP', 'CR'] }
                        })
                );
                if (!soHdr.length) {
                    soHdr = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderItem')
                            .columns(['SalesOrder', 'CustomerGroup'])
                            .where({
                                YY1_WNWorkOrder_SD_SDI: lead.wnWorkOrder   // <-- corrected fallback
                                // DistributionChannel: { in: ['CP', 'CR'] }
                            })
                    );
                }

                if (!soHdr.length) {
                    const msg = `No CP/CR order for '${lead.wnWorkOrder}'`;
                    LOG.error(`Group ${key} → STEP 1.2 FAILED: ${msg}`);
                    group.forEach(r => {
                        aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode });
                        aFailedRecordIDs.push(r.ID);
                    });
                    dupFailed = true;
                } else {
                    const { SalesOrder, CustomerGroup } = soHdr[0];
                    lead.salesDocumentNoSAP = SalesOrder;
                    await UPDATE(this.recordsEntity)
                        .set({ salesDocumentNoSAP: SalesOrder })
                        .where({ ID: lead.ID });

                    const invoiceKey = (CustomerGroup === 'ZI')
                        ? lead.wnInvoiceNo + 'IC'
                        : lead.wnInvoiceNo;

                    const dupItems = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderItem')
                            .columns(['SalesOrderItem'])
                            .where({
                                SalesOrder: lead.salesDocumentNoSAP,
                                YY1_WNInvoice_SD_SDI: invoiceKey
                            })
                    );
                    if (dupItems.length) {
                        const msg = `Duplicate WN_INV='${invoiceKey}' on item ${dupItems[0].SalesOrderItem}`;
                        LOG.error(`Group ${key} → STEP 1.2 FAILED: ${msg}`);
                        group.forEach(r => {
                            aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode });
                            aFailedRecordIDs.push(r.ID);
                        });
                        dupFailed = true;
                    }
                }

            } else if (['MS', 'SC'].includes(lead.woType)) {
                // MS/SC path: check ZZWN_INVOICE
                const dupItems = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem'])
                        .where({ YY1_WNInvoice_SD_SDI: lead.wnInvoiceNo })
                );
                if (dupItems.length) {
                    const msg = `Duplicate WN_INV='${lead.wnInvoiceNo}' on item ${dupItems[0].SalesOrderItem}`;
                    LOG.error(`Group ${key} → STEP 1.2 FAILED: ${msg}`);
                    group.forEach(r => {
                        aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode });
                        aFailedRecordIDs.push(r.ID);
                    });
                    dupFailed = true;
                }
            }

            if (dupFailed) {
                LOG.info(`Group ${key} → STEP 1.2 END: FAILED`);
                continue;
            }
            LOG.info(`Group ${key} → STEP 1.2 END: PASSED`);

            // STEP 1.3: FALIDATE
            LOG.info(`Group ${key} → STEP 1.3 BEGIN`);

            // 1) direct VBELN header check
            let soHdr2 = await this.salesOrderAPI.executeQuery(
                SELECT.one.from('A_SalesOrderItem')
                    .columns(['SalesOrder'])
                    .where({
                        SalesOrder: lead.wnWorkOrder,
                        SalesOrderItem: '00010'
                    })
            );
            // 2) fallback on custom header YY1_WNWorkOrder_SD_SDI
            if (!soHdr2) {
                soHdr2 = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['SalesOrder'])
                        .where({
                            YY1_WNWorkOrder_SD_SDI: lead.wnWorkOrder,   // <-- corrected fallback
                            SalesOrderItem: '00010'
                        })
                );
            }

            if (!soHdr2) {
                const msg = `No SAP SalesOrder found for WN='${lead.wnWorkOrder}'`;
                LOG.error(`Group ${key} → STEP 1.3 FAILED: ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode });
                    aFailedRecordIDs.push(r.ID);
                });
                LOG.info(`Group ${key} → STEP 1.3 END: FAILED`);
                continue;
            }

            const realSO = soHdr2.SalesOrder;
            LOG.info(`Group ${key} → STEP 1.3.1 PASSED: realSO='${realSO}'`);

            // 3) fetch “dummy” item 00010
            const dummy = await this.salesOrderAPI.executeQuery(
                SELECT.one.from('A_SalesOrderItem')
                    .columns(['SalesOrderItem', 'YY1_WeekEnd_SD_SDI'])
                    .where({
                        SalesOrder: realSO,
                        SalesOrderItem: '00010'
                    })
            );
            if (!dummy) {
                const msg = `No dummy item 00010 for SalesOrder='${realSO}'`;
                LOG.error(`Group ${key} → STEP 1.3 FAILED: ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode });
                    aFailedRecordIDs.push(r.ID);
                });
                continue;
            }

            // 4) compare week-end
            const raw = dummy.YY1_WeekEnd_SD_SDI;
            const ts = raw ? parseInt(raw.replace(/\D/g, ''), 10) : null;
            const apiWeekEnd = ts ? moment(ts).format('YYYYMMDD') : null;
            if (apiWeekEnd === lead.weekEndDate) {
                const msg = `Duplicate week-end in dummy item for SalesOrder='${realSO}', weekEnd='${lead.weekEndDate}'`;
                LOG.error(`Group ${key} → STEP 1.3 FAILED: ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode });
                    aFailedRecordIDs.push(r.ID);
                });
                continue;
            }

            // 5) fetch all items & check week-end duplicates
            const allItems = await this.salesOrderAPI.executeQuery(
                SELECT.from('A_SalesOrderItem')
                    .columns(['SalesOrderItem', 'YY1_WeekEnd_SD_SDI'])
                    .where({ SalesOrder: realSO })
            );
            const itemsWithWE = allItems.filter(i => {
                const t = i.YY1_WeekEnd_SD_SDI
                    ? parseInt(i.YY1_WeekEnd_SD_SDI.replace(/\D/g, ''), 10)
                    : null;
                return t && moment(t).format('YYYYMMDD') === lead.weekEndDate;
            });
            if (itemsWithWE.length) {
                const ids = itemsWithWE.map(i => i.SalesOrderItem).join(',');
                const msg = `Duplicate week-end in items [${ids}] for SalesOrder='${realSO}'`;
                LOG.error(`Group ${key} → STEP 1.3 FAILED: ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode });
                    aFailedRecordIDs.push(r.ID);
                });
                continue;
            }

            // All checks passed
            group.forEach(r => aPassedRecordIDs.push(r.ID));
            LOG.info(`Group ${key} → STEP 1.3 END: PASSED`);
        }

        // Persist results
        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
        }
        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({ record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3 })));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
            if (sProcessCode === '1') {
                await UPDATE(this.recordsEntity)
                    .set({ processLevel_code: '3' })
                    .where({ ID: aPassedRecordIDs });
                this.records.forEach(r => {
                    if (aPassedRecordIDs.includes(r.ID)) r.processLevel_code = '3';
                });
            }
        }

        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords,
            bBreakExecution
        });
        LOG.info(`[validateRecords] END: hasError=${aFailedRecordIDs.length > 0}, continue=${aFailedRecordIDs.length === 0}`);
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0
        };
    }


    // Step 3: sales order update
    async processSalesOrder(sProcessCode, bBreakExecution) {
        // 0) Clear all previous logs
        //await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);
        await this._fetchRecords(this.recordIDs);

        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        //
        // 1) Process‐level gating
        //
        LOG.info(`[processSalesOrder] STEP 1.1: Checking process‐level '${sProcessCode}'`);
        const aRecordsForProcessing = [];
        const aRecordIDs = [];
        this.records.forEach(rec => {
            LOG.info(` → Record ${rec.ID}: processLevel='${rec.processLevel_code}', valid='${rec.valid}'`);
            if (rec.processLevel_code === sProcessCode) {
                aRecordsForProcessing.push(rec);
                aRecordIDs.push(rec.ID);
                LOG.info(`    INCLUDED`);
            } else {
                aSkippedRecords.push(rec);
                LOG.info(`    SKIPPED`);
            }
        });

        LOG.info(`[processSalesOrder] STEP 1.2: Removing old logs for [${aRecordIDs.join(',')}]`);
        await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);
        this.updateProcessingState(sProcessCode);

        if (!aRecordsForProcessing.length) {
            LOG.info(`[processSalesOrder] STEP 1.3: No records to process → EXIT`);
            return { hasError: false, continue: true };
        }
        LOG.info(`[processSalesOrder] STEP 1.3: ${aRecordsForProcessing.length} records WILL be processed`);

        // 2) Grouping
        LOG.info(`[processSalesOrder] STEP 2.1: Grouping ${aRecordsForProcessing.length} records`);
        const groups = {};
        aRecordsForProcessing.forEach(rec => {
            const key = [rec.sapEmployeeNo, rec.wnWorkOrder, rec.wnInvoiceNo, rec.endDate, rec.currency].join('||');
            (groups[key] = groups[key] || []).push(rec);
        });
        LOG.info(`[processSalesOrder] STEP 2.2: Created ${Object.keys(groups).length} group(s)`);
        LOG.debug(`[processSalesOrder] STEP 2.3: Group sizes → ${JSON.stringify(
            Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length]))
        )}`);

        // 3) Per‐group logic
        for (const [key, group] of Object.entries(groups)) {
            LOG.info(`\n>>> ENTER GROUP ${key} (size=${group.length})`);

            // 3.1) SAP_POSNR skip
            LOG.info(`Group ${key} → STEP 3.1: SAP_POSNR skip check`);
            const hasPosnr = group.some(r => !!r.SAP_POSNR);
            LOG.debug(`Group ${key} → Found SAP_POSNR: ${group.map(r => r.SAP_POSNR).join(',')}`);
            if (hasPosnr) {
                LOG.info(`Group ${key} → SKIPPING (existing SAP_POSNR)`);
                group.forEach(r => aSkippedRecords.push(r));
                continue;
            }

            // 3.2) same process‐level check
            LOG.info(`Group ${key} → STEP 3.2: verifying all processLevel_code === '${sProcessCode}'`);
            group.forEach(r => LOG.debug(`  • Record ${r.ID} has processLevel_code='${r.processLevel_code}'`));
            const bad = group.find(r => Number(r.processLevel_code) !== Number(sProcessCode));
            if (bad) {
                const msg = `Not all records at processLevel='${sProcessCode}'`;
                LOG.error(`Group ${key} → STEP 3.2 FAILED: ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode });
                    aFailedRecordIDs.push(r.ID);
                });
                continue;
            }
            LOG.info(`Group ${key} → STEP 3.2 PASSED`);

            // 3.3) aggregate amounts
            LOG.info(`Group ${key} → STEP 3.3: amount aggregation`);
            const lead = { ...group[0] };
            lead.amount = group.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
            LOG.info(`Group ${key} → aggregated amount = ${lead.amount}`);

            // 3.4) woType blank?
            LOG.info(`Group ${key} → STEP 3.4: woType validation`);
            if (!lead.woType) {
                const msg = `woType is blank`;
                LOG.error(`Group ${key} → STEP 3.4 FAILED: ${msg}`);
                group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                continue;
            }
            if (!['CP', 'CR', 'MS', 'SC', 'IC'].includes(lead.woType)) {
                const msg = `Invalid woType='${lead.woType}'`;
                LOG.error(`Group ${key} → STEP 3.4 FAILED: ${msg}`);
                group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                continue;
            }
            LOG.info(`Group ${key} → STEP 3.4 PASSED: woType='${lead.woType}'`);

            // 3.5) IC skip
            if (lead.woType === 'IC') {
                LOG.info(`Group ${key} → woType='IC' → SKIPPING group for intercompany processing`);
                group.forEach(r => aSkippedRecords.push(r));
                continue;
            }

            // 3.6) branch CP/CR vs MS/SC + always capture fullHdr
            let sapTrip = '';
            let sapPo = '';
            let fullHdr; // will hold the A_SalesOrder header
            let billTo = '';
            let billingBlock = '';

            if (['CP', 'CR'].includes(lead.woType)) {
                // -----------------------------
                // FIXED CP/CR BRANCH (no soItem)
                // -----------------------------
                LOG.info(`Group ${key} → STEP 3.6: CP/CR branch`);
                LOG.info(`Group ${key} → STEP 3.6.1: resolving SalesOrder (CP/CR) by VBELN/WorkOrder`);

                let soNumber = '';
                let resolvedBy = '';

                // Try 1: direct numeric VBELN (if file carries true SO)
                if (/^\d+$/.test(lead.wnWorkOrder || '')) {
                    const tryHdr = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrder').columns(['SalesOrder'])
                            .where({ SalesOrder: lead.wnWorkOrder })
                    );
                    if (tryHdr?.SalesOrder) { soNumber = tryHdr.SalesOrder; resolvedBy = 'direct VBELN'; }
                }

                // Try 2: header custom (alphanumeric work order)
                if (!soNumber) {
                    const tryHdr2 = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrder').columns(['SalesOrder'])
                            .where({ YY1_AlphanumericSalesO_SDH: lead.wnWorkOrder })
                    );
                    if (tryHdr2?.SalesOrder) { soNumber = tryHdr2.SalesOrder; resolvedBy = 'header YY1_AlphanumericSalesO_SDH'; }
                }

                // Try 3: item custom (work order at item)
                if (!soNumber) {
                    const tryItem = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrderItem').columns(['SalesOrder'])
                            .where({ YY1_WNWorkOrder_SD_SDI: lead.wnWorkOrder })
                    );
                    if (tryItem?.SalesOrder) { soNumber = tryItem.SalesOrder; resolvedBy = 'item YY1_WNWorkOrder_SD_SDI'; }
                }

                if (!soNumber) {
                    const msg = `Cannot resolve SalesOrder for VBELN/WorkOrder='${lead.wnWorkOrder}' (CP/CR)`;
                    LOG.error(`Group ${key} → STEP 3.6 FAILED: ${msg}`);
                    group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                    continue;
                }
                LOG.info(`Group ${key} → STEP 3.6.2: resolved SO='${soNumber}' via ${resolvedBy}`);

                // Fetch full header
                fullHdr = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder').columns([
                        'SalesOrder', 'SalesOrderType', 'SalesOrganization', 'DistributionChannel',
                        'OrganizationDivision', 'PurchaseOrderByCustomer', 'CustomerPriceGroup',
                        'CustomerGroup', 'YY1_AlphanumericSalesO_SDH', 'SoldToParty', 'CustomerPaymentTerms'
                    ]).where({ SalesOrder: soNumber })
                );

                if (!fullHdr) {
                    const msg = `Cannot fetch header for SO='${soNumber}'`;
                    LOG.error(`Group ${key} → STEP 3.6 FAILED: ${msg}`);
                    group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                    continue;
                }

                // (optional per spec) mark trip flag for CP/CR
                sapTrip = '1';

            } else {
                // MS - SC branch
                LOG.info(`Group ${key} → STEP 3.7: ${lead.woType} branch (MS/SC)`);

                // 3.7.1 fetch SalesOrder via the item‐level custom work-order
                LOG.info(`Group ${key} → STEP 3.7.1: fetching SalesOrder by WorkOrder='${lead.wnWorkOrder}'`);
                const itemRec = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['SalesOrder'])
                        .where({ YY1_WNWorkOrder_SD_SDI: lead.wnWorkOrder })
                );
                if (!itemRec?.SalesOrder) {
                    const msg = `Cannot fetch SalesOrder for WorkOrder='${lead.wnWorkOrder}'`;
                    LOG.error(`Group ${key} → STEP 3.7 FAILED: ${msg}`);
                    group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                    continue;
                }
                const soNumber = itemRec.SalesOrder;

                // fetch the full SalesOrder header as before
                fullHdr = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder').columns([
                        'SalesOrder', 'SalesOrderType', 'SalesOrganization', 'DistributionChannel',
                        'OrganizationDivision', 'PurchaseOrderByCustomer', 'CustomerPriceGroup',
                        'CustomerGroup', 'YY1_AlphanumericSalesO_SDH', 'SoldToParty', 'CustomerPaymentTerms'
                    ]).where({ SalesOrder: soNumber })
                );
                if (!fullHdr) {
                    const msg = `Cannot fetch header for SO='${soNumber}'`;
                    LOG.error(`Group ${key} → STEP 3.7 FAILED: ${msg}`);
                    group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                    continue;
                }

                // 3.7.x) partner‐function lookup
                LOG.info(`Group ${key} → STEP 3.7.x: fetching header partners`);
                const partners = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderHeaderPartner')
                        .columns(['PartnerFunction', 'Customer', 'Supplier', 'ReferenceBusinessPartner'])
                        .where({ SalesOrder: fullHdr.SalesOrder })
                );

                // ZR‐rejection (best-effort as in your current logic)
                try {
                    const zr = partners.find(p => p.PartnerFunction === 'ZR');
                    const lastContact = zr?.ReferenceBusinessPartner;
                    if (lastContact && moment(lead.weekEndDate).isSameOrAfter(lastContact, 'day')) {
                        fullHdr.SO_REJ = 'ZR';
                        billingBlock = 'Z1';
                        LOG.info(`Group ${key} → ZR rejection applied`);
                    }
                } catch {
                    LOG.warn(`Group ${key} → ZR lookup failed, skipping`);
                }

                // Bill‐to
                const re = partners.find(p => p.PartnerFunction === 'RE');
                billTo = re?.Customer || '';

                // 3.7.6) PO-indicator (existing logic)
                LOG.info(`Group ${key} → STEP 3.7.6: checking Vendor_VendorRemit for SoldToParty='${fullHdr.SoldToParty}'`);
                let poIndicator = '';
                const vendMap = await SELECT.one.from('com.aleron.monitor.Vendor_VendorRemit')
                    .columns(['vendor'])
                    .where({ vendor: fullHdr.SoldToParty });

                if (vendMap) {
                    LOG.info(`Group ${key} → 3.7.6: vendor mapping found → no PO`);
                    poIndicator = '';
                } else {
                    LOG.info(`Group ${key} → 3.7.6: no vendor mapping → create PO`);
                    poIndicator = '1';
                }

                if (fullHdr.CustomerPriceGroup === 'ZM') {
                    LOG.info(`Group ${key} → 3.7.6: CustomerPriceGroup='ZM' → no PO`);
                    poIndicator = '';
                }

                sapPo = poIndicator;

                // persist PORequiredSAP
                LOG.info(`Group ${key} → STEP 3.7.7: setting PORequiredSAP='${sapPo}' for this group`);
                await UPDATE(this.recordsEntity).set({ PORequiredSAP: sapPo }).where({ ID: group.map(r => r.ID) });
                group.forEach(r => { r.PORequiredSAP = sapPo; });
            }

            // // 3.8) locate existing PO & compute next item
            // const vbeln = fullHdr.SalesOrder;
            // LOG.info(`Group ${key} → STEP 3.8: locating existing PO by PDI for SO='${vbeln}'`);
            // const poRec = await this.purchaseOrderAPI.executeQuery(
            // SELECT.one.from('PurchaseOrderItem').columns(['PurchaseOrder']).where({ YY1_SDDocumentPD_PDI: vbeln })
            // );
            // let poNo = poRec?.PurchaseOrder || '';
            // if (!poNo) LOG.warn(`Group ${key} → no existing PO, will create new`);

            // const soTop = await this.salesOrderAPI.executeQuery(
            // SELECT.one.from('A_SalesOrderItem').columns(['SalesOrderItem'])
            //     .where({ SalesOrder: vbeln }).orderBy('SalesOrderItem desc')
            // );
            // const soMax = soTop?.SalesOrderItem || '00000';

            // let poMax = '00000';
            // if (poNo) {
            // const poLines = await this.purchaseOrderAPI.fetchPurchaseOrderLines(poNo);
            // if (poLines.length) {
            //     const maxNum = poLines.map(i => parseInt(i.PurchaseOrderItem, 10)).reduce((a,b)=>Math.max(a,b), 0);
            //     poMax = String(maxNum).padStart(5, '0');
            // }
            // }

            // const highest = Math.max(parseInt(soMax,10), parseInt(poMax,10));
            // const nextItem = String(highest + 10).padStart(5, '0');

            // 3.8) locate existing PO & compute next item
            const vbeln = fullHdr.SalesOrder;
            LOG.info(`Group ${key} → STEP 3.8: locating existing PO by PDI for SO='${vbeln}'`);
            const poRec = await this.purchaseOrderAPI.executeQuery(
                SELECT.one.from('PurchaseOrderItem').columns(['PurchaseOrder']).where({ YY1_SDDocumentPD_PDI: vbeln })
            );
            let poNo = poRec?.PurchaseOrder || '';
            if (!poNo) LOG.warn(`Group ${key} → no existing PO, will create new`);

            // 🔹 use helper instead of manual soMax/poMax logic
            const nextItem = await this.getNextLineItem(vbeln, poNo);
            LOG.info(`Group ${key} → STEP 3.8: computed next item = '${nextItem}'`);

            // 3.8.x) Duplicate‐SO check
            LOG.info(`Group ${key} → STEP 3.8.x: duplicate SO‐item check`);
            const dupInvoice = fullHdr.CustomerGroup === 'ZI' ? `${lead.wnInvoiceNo}IC` : lead.wnInvoiceNo;
            try {
                var existingItem = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem'])
                        .where({ SalesOrder: vbeln, YY1_WNInvoice_SD_SDI: dupInvoice })
                );

            } catch (error) {
                LOG.error(`Group ${key} → STEP 3.8.x ERROR: ${error.message}`);
            }
            if (existingItem) {
                const msg = `Duplicate invoice '${dupInvoice}' on SalesOrder '${vbeln}'`;
                LOG.error(`Group ${key} → STEP 3.8.x FAILED: ${msg}`);
                group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                continue; // skip this group entirely
            }


            // 3.9) dummy item + WBSElement check
            try {
                LOG.info(`Group ${key} → STEP 3.9: fetching dummy item '00010'`);
                var dummy = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns([
                            'SalesOrderItem',
                            'Material',
                            'WBSElement',
                            'ProfitCenter',
                            'ProductionPlant',
                            'YY1_EEGroup_SD_SDI',
                            'YY1_WNInvoice_SD_SDI',
                            'YY1_PurchasingDoc_SD_SDI',
                            'YY1_StrTimeMarkup_SD_SDI',
                            'YY1_DoubTimeMarkup_SD_SDI',
                            'YY1_LegacyPurchase_SD_SDI',
                            'YY1_WeekEnd_SD_SDI',
                            'YY1_CustomURL_SDI',
                            'YY1_ExtensionUUID1_SDI',
                            'YY1_DuplicateWeek_SD_SDI',
                            'YY1_ACA_HRS_SDI',
                            'YY1_Royality_SD_SDI',
                            'YY1_CommodityCode_SD_SDI',
                            'YY1_ExtensionUUID2_SDI',
                            'YY1_SupplierInvoice_SD_SDI',
                            'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_CategoryCode_SD_SDI',
                            'YY1_OverTimeMarkup_SD_SDI',
                            'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_CustomBillingType_SDI',
                            'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({ SalesOrder: vbeln, SalesOrderItem: '00010' })
                );

            } catch (error) {
                LOG.error(`Group ${key} → STEP 3.9 ERROR: ${error.message}`);
            }

            if (!dummy) { throw new Error(`Group ${key} → dummy item 00010 missing for SO='${vbeln}'`); }
            if (!dummy.WBSElement) {
                const msg = `Project Number is missing`;
                LOG.error(`Group ${key} → STEP 3.9 FAILED: ${msg}`);
                group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: msg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                continue;
            }


            // 3.11) build & post new SO‐Item (expense)
            LOG.info(`Group ${key} → STEP 3.11: building expense payload`);
            const toODataDate = date => {
                const ms = +moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).valueOf();
                return `/Date(${ms})/`;
            };
            const prod = (lead.woType === 'MS' && fullHdr.SalesOrganization === '2100') ? 'MS_EXPENSE' : 'EXPENSE';

            const linePayload = {
                SalesOrder: vbeln,
                SalesOrderItem: nextItem,
                SalesOrderItemCategory: 'TAD',
                Material: prod,                        // travel-specific product (MS_EXPENSE / EXPENSE)
                RequestedQuantity: '1',
                OrderQuantityUnit: 'EA',
                PricingDate: toODataDate(moment()),
                WBSElement: dummy.WBSElement,
                ProfitCenter: dummy.ProfitCenter,
                ProductionPlant: dummy.ProductionPlant,


                YY1_EEGroup_SD_SDI: dummy.YY1_EEGroup_SD_SDI || '',
                YY1_WNInvoice_SD_SDI: dupInvoice || '',
                YY1_WNWorkOrder_SD_SDI: lead.wnWorkOrder || '',
                YY1_PurchasingDoc_SD_SDI: dummy.YY1_PurchasingDoc_SD_SDI || '',
                YY1_StrTimeMarkup_SD_SDI: dummy.YY1_StrTimeMarkup_SD_SDI || '',
                YY1_DoubTimeMarkup_SD_SDI: dummy.YY1_DoubTimeMarkup_SD_SDI || '',
                YY1_LegacyPurchase_SD_SDI: dummy.YY1_LegacyPurchase_SD_SDI || '',
                YY1_WeekEnd_SD_SDI: toODataDate(lead.weekEndDate),
                YY1_CustomURL_SDI: dummy.YY1_CustomURL_SDI || '',
                YY1_ExtensionUUID1_SDI: dummy.YY1_ExtensionUUID1_SDI || '',
                YY1_DuplicateWeek_SD_SDI: dummy.YY1_DuplicateWeek_SD_SDI || '',
                YY1_ACA_HRS_SDI: dummy.YY1_ACA_HRS_SDI || '',
                YY1_Royality_SD_SDI: dummy.YY1_Royality_SD_SDI || '',
                YY1_CommodityCode_SD_SDI: dummy.YY1_CommodityCode_SD_SDI || '',
                YY1_ExtensionUUID2_SDI: dummy.YY1_ExtensionUUID2_SDI || '',
                YY1_SupplierInvoice_SD_SDI: dummy.YY1_SupplierInvoice_SD_SDI || '',
                YY1_InvoiceVATtxt_SD_SDI: dummy.YY1_InvoiceVATtxt_SD_SDI || '',
                YY1_CategoryCode_SD_SDI: dummy.YY1_CategoryCode_SD_SDI || '',
                YY1_OverTimeMarkup_SD_SDI: dummy.YY1_OverTimeMarkup_SD_SDI || '',
                YY1_ACA_HRS_PRICE_SDI: dummy.YY1_ACA_HRS_PRICE_SDI || '',
                YY1_CustomBillingType_SDI: dummy.YY1_CustomBillingType_SDI || '',
                YY1_ACA_RG_ONLY_SDI: dummy.YY1_ACA_RG_ONLY_SDI || '',

                // Existing travel-specific fields
                ItemBillingBlockReason: billingBlock,

                to_PricingElement: {
                    results: [{
                        ConditionType: 'ZEXP',
                        ConditionRateValue: lead.amount.toFixed(2)
                    }]
                },
                to_ScheduleLine: [{
                    ScheduleLine: '0001',
                    RequestedDeliveryDate: toODataDate(lead.weekEndDate),
                    OrderQuantityUnit: 'EA',
                    ScheduleLineOrderQuantity: '1'
                }]
            };


            LOG.info(`Group ${key} → Payload:\n${JSON.stringify(linePayload, null, 2)}`);

            LOG.info(`Group ${key} → STEP 3.12: calling createSalesOrderItems`);
            const [createRes] = await this.salesOrderAPI.createSalesOrderItems([linePayload]);
            LOG.info(`Group ${key} → response:\n${JSON.stringify(createRes, null, 2)}`);

            if (createRes.hasError) {
                const errMsg = Array.isArray(createRes.reason)
                    ? createRes.reason.map(e => e.message || JSON.stringify(e)).join(' • ')
                    : (createRes.reason.message || String(createRes.reason));
                group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: errMsg, process_code: sProcessCode }); aFailedRecordIDs.push(r.ID); });
                //await ProcessLogger.addLogs(aErrorLogs);
                await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
                continue;
            } else {
                group.forEach(r => aPassedRecordIDs.push(r.ID));
                await UPDATE(this.recordsEntity)
                    .set({ salesItemNoSAP: nextItem, salesDocumentNoSAP: vbeln })
                    .where({ ID: group.map(r => r.ID) });

                // 3.15) VC1 insert
                LOG.info(`[processSalesOrder] STEP 3.15: inserting VC1 for SO='${vbeln}', item='${nextItem}'`);
                const vc1 = {
                    SalesOrderNumber: vbeln,
                    SalesOrderItemNum: nextItem,
                    SAP_Description: lead.description || '',
                    Billing_Document_Number: lead.billingDocNo || '',
                    YY1_ACA_RG_ONLY: lead.acaRgOnly || '',
                    YY2_ACA_HRS: lead.acaHrs || 0,
                    YY3_ACA_HRS_PRICE: lead.acaHrsPrice || 0,
                    YY4_ACA_TOTAL_HRS_PRICE: lead.acaTotalHrsPrice || 0,
                    YY5_LINE_ITEM_NUMBER: +nextItem,
                    YY8_WEEK_ENDING2: lead.timeSheetEndDate,
                };
                LOG.info(`VC1 payload → ${JSON.stringify(vc1)}`);

                let vc1Res;
                try {
                    vc1Res = await this.salesVCData1Api.executeQuery(INSERT.into('YY1_SALESVCDATA_1').entries(vc1));
                    LOG.info(`VC1 raw response → ${JSON.stringify(vc1Res)}`);
                } catch (err) {
                    LOG.error(`VC1 insert FAILED: ${err.message}`);
                    LOG.error(`VC1 payload was: ${JSON.stringify(vc1)}`);
                    throw err;
                }

                const vc1Uuid = Array.isArray(vc1Res) ? vc1Res[0]?.SAP_UUID : vc1Res.SAP_UUID;
                if (vc1Uuid) {
                    LOG.info(`VC1 returned UUID → ${vc1Uuid}`);
                    var Vcdata = [];
                    group.forEach(r => Vcdata.push(r.ID));
                    await UPDATE(this.recordsEntity).set({ vcData1UUID: vc1Uuid }).where({ ID: group.map(r => r.ID) });
                    await ProcessLogger.addLogs(Vcdata.map((sId) => ({ record_ID: sId, message: `VC1 data successfully inserted with UUID: ${vc1Uuid} for record ${sId} and sales order ${vbeln}`, process_code: sProcessCode, type: 3 })));

                } else {
                    LOG.warn(`VC1 insert did not return a UUID`);
                    group.forEach(r => { aErrorLogs.push({ record_ID: r.ID, message: `VC1 data inserted failed for record ${r.ID} and sales order ${vbeln}`, process_code: sProcessCode }); });
                    await ProcessLogger.addLogs(aErrorLogs);
                }

                // 3.17) TRIP inserts (Header, Item, Cost)
                // Sequence helper factory
                const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
                if (!lead.skipTrip) {
                    try {
                        const totalAmount = group.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

                        const sPers = lead.sapEmployeeNo;
                        const sStart = moment(lead.beginDate, 'YYYYMMDD').format('YYYY-MM-DD');
                        const sEnd = moment(lead.endDate, 'YYYYMMDD').format('YYYY-MM-DD');

                        const oHeaderPayload = {
                            ContractNo: lead.contractNo,
                            WnInvoiceNo: lead.wnInvoiceNo,
                            SapEmployeeNo: sPers,
                            WnWorkOrder: lead.wnWorkOrder,
                            WoType: lead.woType,
                            WeekEndDate: lead.weekEndDate,
                            TotalAmount: totalAmount,
                            Currency: lead.currency,
                            TripStatus_code: 0,
                            Project: lead.internalOrder || '',
                            Destination: "US",
                        };

                        const aItems = [
                            {
                                ExpenseReceiptNumber: '1',
                                TripExpenseType: lead.tripExpenseType,
                                Amount: totalAmount,
                                Currency: lead.currency,
                                From: lead.FromLocation || '',
                                To: lead.ToLocation || '',
                                ReceiptsDocumentNumber: '1',
                                UrlLink: ''
                            }
                        ];

                        const aCosts = undefined;

                        const oPayload = {
                            Personnel: sPers,
                            StartOfTrip: sStart,
                            EndOfTrip: sEnd,
                            Header: oHeaderPayload,
                            Items: aItems
                        };

                        LOG.info(`[processSalesOrder] STEP 3.17: sending Trip payload → ${JSON.stringify(oPayload)}`);

                        const response = await executeHttpRequest(
                            { destinationName: 'monitor_baseurl' },
                            {
                                method: 'POST',
                                url: '/trip/Trip',
                                data: oPayload,
                                headers: { 'Content-Type': 'application/json' }
                            }
                        );

                        LOG.info(`[processSalesOrder] STEP 3.17: Trip created → TripNumber=${response.data.TripNumber}`);

                        const tripIds = group.map(r => r.ID);
                        await ProcessLogger.addLogs(
                            tripIds.map(sId => ({
                                record_ID: sId,
                                message: `${response.data.TripNumber} Trip created for Employee ${sPers}`,
                                process_code: sProcessCode,
                                type: 3
                            }))
                        );

                    } catch (error) {
                        const errMsg = error.response?.data?.error?.message || error.message;
                        LOG.warn(`Group ${key} → STEP 3.17 TRIP insert failed, skipping group: ${errMsg}`);
                        group.forEach(r => aSkippedRecords.push(r));
                        group.forEach(r => {
                            aErrorLogs.push({
                                record_ID: r.ID,
                                message: `Failed to insert TRIP with error ${errMsg} for Employee ${r.sapEmployeeNo}`,
                                process_code: sProcessCode
                            });
                        });
                        //await ProcessLogger.addLogs(aErrorLogs);
                    }
                }
            }
        }

        // 4) Persist & mark
        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
        }
        if (aPassedRecordIDs.length) {
            //await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({ record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3 })));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
            await UPDATE(this.recordsEntity).set({ processLevel_code: 'G' }).where({ ID: aPassedRecordIDs });
            this.records.forEach(r => { if (aPassedRecordIDs.includes(r.ID)) r.processLevel_code = 'G'; });
        }

        // 5) Exclusion set & return
        this.updateExclusionSet({ passed: aPassedRecordIDs, failed: aFailedRecordIDs, skipped: aSkippedRecords, bBreakExecution });
        return { hasError: aFailedRecordIDs.length > 0, continue: aFailedRecordIDs.length === 0 };
    }


    async processIntercompanyso(sProcessCode, bBreakExecution) {
        // 0) clear old logs
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);
        await this._fetchRecords(this.recordIDs);

        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        // 1) process‐level gating
        LOG.info(`[processIntercompanyso] STEP 1.1: Checking process‐level '${sProcessCode}'`);
        const aRecordsForProcessing = [];
        const aRecordIDs = [];
        this.records.forEach(rec => {
            LOG.info(` → Record ${rec.ID}: level='${rec.processLevel_code}', valid='${rec.valid}'`);
            // if (rec.processLevel_code === sProcessCode && rec.valid) {
            // if (this.shouldRecordProcess(rec, sProcessCode)) {
            if (rec.processLevel_code === sProcessCode) {
                aRecordsForProcessing.push(rec);
                aRecordIDs.push(rec.ID);
                LOG.info(`    INCLUDED`);
            } else {
                aSkippedRecords.push(rec);
                LOG.info(`    SKIPPED`);
            }
        });
        await ProcessLogger.removeLogs(aRecordIDs, null, sProcessCode);
        this.updateProcessingState(sProcessCode);
        if (!aRecordsForProcessing.length) {
            LOG.info(`[processIntercompanyso] STEP 1.2: no records → exit`);
            return {
                hasError: false,
                continue: true
            };
        }

        // 2) grouping
        LOG.info(`[processIntercompanyso] STEP 2: grouping ${aRecordsForProcessing.length} records`);
        const groups = {};
        aRecordsForProcessing.forEach(rec => {
            const key = [rec.sapEmployeeNo, rec.wnWorkOrder, rec.wnInvoiceNo, rec.endDate, rec.currency].join('||');
            (groups[key] = groups[key] || []).push(rec);
        });
        LOG.info(`[processIntercompanyso] STEP 2: ${Object.keys(groups).length} group(s)`);

        // 3) per-group logic
        for (const [key, group] of Object.entries(groups)) {
            LOG.info(`\n>>> IC GROUP ${key} (size=${group.length})`);

            // build our “lead” record + total up the amounts
            const lead = {
                ...group[0]
            };
            lead.amount = group.reduce((s, r) => s + (Number(r.amount) || 0), 0);

            // 3.0) SKIP anything that isn't IC
            if (lead.woType !== 'IC') {
                LOG.info(`Group ${key} → woType='${lead.woType}' → routing to PO step`);
                group.forEach(r => aPassedRecordIDs.push(r.ID));
                await UPDATE(this.recordsEntity)
                    .set({
                        processLevel_code: '5'
                    })
                    .where({
                        ID: group.map(r => r.ID)
                    });
                this.records.forEach(r => {
                    if (group.some(g => g.ID === r.ID)) r.processLevel_code = '5';
                });
                continue;
            }

            // 3.1) must have SAP_P_2_SO
            const icSo = lead.salesOrderICSAP;
            if (!icSo) {
                const msg = `IC SO not provided (SAP_P_2_SO blank)`;
                LOG.error(`Group ${key} → ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(r.ID);
                });
                await ProcessLogger.addLogs(aErrorLogs);
                await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
                continue;
            }

            // 3.2) fetch IC header & check channel
            LOG.info(`Group ${key} → fetching header for IC SO='${icSo}'`);
            const icHdr = await this.salesOrderAPI.executeQuery(
                SELECT.one.from('A_SalesOrder')
                    .columns([
                        'SalesOrder', 'DistributionChannel', 'CustomerPriceGroup',
                        'SoldToParty', 'SalesOrganization', 'CustomerPaymentTerms'
                    ])
                    .where({
                        SalesOrder: icSo
                    })
            );
            if (!icHdr) {
                const msg = `Cannot fetch header for IC SO='${icSo}'`;
                LOG.error(`Group ${key} → ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(r.ID);
                });
                await ProcessLogger.addLogs(aErrorLogs);
                await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
                continue;
            }
            if (icHdr.DistributionChannel !== 'IC') {
                const msg = `IC SO='${icSo}' has channel='${icHdr.DistributionChannel}', expected 'IC'`;
                LOG.error(`Group ${key} → ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(r.ID);
                });
                await ProcessLogger.addLogs(aErrorLogs);
                await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
                continue;
            }

            // 3.3) partner lookups → lifnr + billTo
            LOG.info(`Group ${key} → fetching partners for IC SO`);
            const partners = await this.salesOrderAPI.executeQuery(
                SELECT.from('A_SalesOrderHeaderPartner')
                    .columns(['PartnerFunction', 'Customer', 'Supplier'])
                    .where({
                        SalesOrder: icSo
                    })
            );
            const zr = partners.find(p => p.PartnerFunction === 'ZR');
            const lifnr = zr?.Supplier || '';
            const re = partners.find(p => p.PartnerFunction === 'RE');
            const billTo = re?.Customer || '';

            // 3.4) PO indicator for IC
            const vendRem = await SELECT.one.from('com.aleron.monitor.Vendor_VendorRemit')
                .columns(['vendor'])
                .where({
                    vendor: lifnr
                });
            let sapPoIC = vendRem ? '' : '2';
            if (icHdr.CustomerPriceGroup === 'ZM') sapPoIC = '';

            // 3.5) dummy line 00010
            LOG.info(`Group ${key} → fetching dummy item '00010'`);
            const dummy = await this.salesOrderAPI.executeQuery(
                SELECT.one.from('A_SalesOrderItem')
                    .columns([
                        'SalesOrderItem', 'Material', 'WBSElement', 'ProfitCenter',
                        'YY1_PurchasingDoc_SD_SDI', 'ProductionPlant'
                    ])
                    .where({
                        SalesOrder: icSo,
                        SalesOrderItem: '00010'
                    })
            );
            if (!dummy) {
                const msg = `No dummy item 00010 for IC SO='${icSo}'`;
                LOG.error(`Group ${key} → ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(r.ID);
                });
                await ProcessLogger.addLogs(aErrorLogs);
                await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
                continue;
            }
            if (!dummy.WBSElement) {
                const msg = `Project Number missing for IC SO='${icSo}'`;
                LOG.error(`Group ${key} → ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(r.ID);
                });
                await ProcessLogger.addLogs(aErrorLogs);
                await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
                continue;
            }

            // 3.6) next-item & PO lines
            LOG.info(`Group ${key} → computing next item`);
            const soTop = await this.salesOrderAPI.executeQuery(
                SELECT.one.from('A_SalesOrderItem')
                    .columns(['SalesOrderItem'])
                    .where({
                        SalesOrder: icSo
                    })
                    .orderBy('SalesOrderItem desc')
            );
            const soMax = soTop?.SalesOrderItem || '00000';
            let poMax = '00000';
            if (sapPoIC === '2') {
                const poRec = await this.purchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder'])
                        .where({
                            YY1_SDDocumentPD_PDI: icSo
                        })
                );
                if (poRec?.PurchaseOrder) {
                    const lines = await this.purchaseOrderAPI.fetchPurchaseOrderLines(poRec.PurchaseOrder);
                    if (lines.length) {
                        poMax = String(
                            lines.map(l => parseInt(l.PurchaseOrderItem, 10))
                                .reduce((a, b) => Math.max(a, b), 0)
                        ).padStart(5, '0');
                    }
                }
            }
            const highest = Math.max(parseInt(soMax, 10), parseInt(poMax, 10));
            const nextItem = String(highest + 10).padStart(5, '0');

            // 3.7) duplicate-SO check
            LOG.info(`Group ${key} → duplicate check for invoice='${lead.wnInvoiceNo}'`);
            const dup = await this.salesOrderAPI.executeQuery(
                SELECT.one.from('A_SalesOrderItem')
                    .columns(['SalesOrderItem'])
                    .where({
                        SalesOrder: icSo,
                        YY1_WNInvoice_SD_SDI: lead.wnInvoiceNo
                    })
            );
            if (dup) {
                const msg = `Duplicate IC invoice='${lead.wnInvoiceNo}' on SO='${icSo}'`;
                LOG.error(`Group ${key} → ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(r.ID);
                });
                await ProcessLogger.addLogs(aErrorLogs);
                await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
                continue;
            }

            // 3.8) build & post IC SO‐Item
            LOG.info(`Group ${key} → building IC payload SO='${icSo}', item='${nextItem}'`);
            const toODataDate = d => `/Date(${moment(d, ['YYYYMMDD', 'YYYY-MM-DD']).valueOf()})/`;
            const icPayload = {
                SalesOrder: icSo,
                SalesOrderItem: nextItem,
                SalesOrderItemCategory: 'ZEXP',
                Material: 'EXPENSE',
                RequestedQuantity: '1',
                OrderQuantityUnit: 'LAB',
                PricingDate: toODataDate(moment()),
                WBSElement: dummy.WBSElement,
                ProfitCenter: dummy.ProfitCenter,
                ProductionPlant: dummy.ProductionPlant,
                PurchaseOrderByCustomer: sapPoIC,
                YY1_PurchasingDoc_SD_SDI: dummy.YY1_PurchasingDoc_SD_SDI || '',
                YY1_WNInvoice_SD_SDI: lead.wnInvoiceNo,
                YY1_WNWorkOrder_SD_SDI: lead.wnWorkOrder,
                YY1_WeekEnd_SD_SDI: toODataDate(lead.weekEndDate),
                to_PricingElement: {
                    results: [{
                        ConditionType: await determineConditionType({
                            customer: icHdr.SoldToParty,
                            salesOrganization: icHdr.SalesOrganization,
                            distributionChannel: icHdr.DistributionChannel,
                            division: icHdr.SalesOrganization
                        }),
                        ConditionRateValue: lead.amount.toFixed(2)
                    }]
                },
                to_ScheduleLine: [{
                    ScheduleLine: '0001',
                    RequestedDeliveryDate: toODataDate(lead.weekEndDate),
                    OrderQuantityUnit: 'LAB',
                    ScheduleLineOrderQuantity: '1'
                }]
            };
            const [icRes] = await this.salesOrderAPI.createSalesOrderItems([icPayload]);
            if (icRes.hasError) {
                const msg = Array.isArray(icRes.reason) ?
                    icRes.reason.map(e => e.message || e).join(' • ') :
                    icRes.reason.message;
                LOG.error(`Group ${key} → IC create FAILED: ${msg}`);
                group.forEach(r => {
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg, process_code: sProcessCode
                    });
                    aFailedRecordIDs.push(r.ID);
                });
                await ProcessLogger.addLogs(aErrorLogs);
                await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
                continue;
            }

            // 3.9) update back UI with IC fields
            group.forEach(r => aPassedRecordIDs.push(r.ID));
            await UPDATE(this.recordsEntity)
                .set({
                    salesOrderICSAP: icSo,
                    salesItemNoICSAP: nextItem,
                    distributionChannelICSAP: icHdr.DistributionChannel,
                    purchaseDocumentNoSAP: sapPoIC === '2' ? icRes.PurchaseOrder : '',
                    salesOrderICUpdateRequired: false
                })
                .where({
                    ID: group.map(r => r.ID)
                });

            // 3.10) VC1 insert
            LOG.info(`Group ${key} → inserting VC1 for IC SO='${icSo}', item='${nextItem}'`);
            const vc1 = {
                SalesOrderNumber: icSo,
                SalesOrderItemNum: nextItem,
                YY8_WEEK_ENDING2: lead.weekEndDate,
                TRAVEL_EXPENSE: lead.amount || 0,
                ZSD_WN_INVOICE_VCSD: lead.wnInvoiceNo,
                ZSD_WN_WORK_ORDER_VCSD: icSo
            };
            let vc1Res = await this.salesVCData1Api.executeQuery(
                INSERT.into('YY1_SALESVCDATA_1').entries(vc1)
            );
            const vc1Uuid = Array.isArray(vc1Res) ? vc1Res[0]?.SAP_UUID : vc1Res.SAP_UUID;
            if (vc1Uuid) {
                await UPDATE(this.recordsEntity)
                    .set({
                        vcData1UUID: vc1Uuid
                    })
                    .where({
                        ID: group.map(r => r.ID)
                    });
            }

            // 3.11) VC2 insert
            LOG.info(`Group ${key} → inserting VC2 for IC SO='${icSo}', item='${nextItem}'`);
            const vc2 = {
                Sales_Order_Number: icSo,
                Sales_Order_Item_Num: nextItem,
                WEEK_ENDING2: lead.weekEndDate,
                TRAVEL_EXPENSE: lead.amount || 0,
                ZSD_WN_INVOICE_VCSD: lead.wnInvoiceNo,
                ZSD_WN_WORK_ORDER_VCSD: icSo
            };
            let vc2Res = await this.salesVCData2Api.executeQuery(
                INSERT.into('YY1_SALESVCDATA_2').entries(vc2)
            );
            const vc2Uuid = Array.isArray(vc2Res) ? vc2Res[0]?.SAP_UUID : vc2Res.SAP_UUID;
            if (vc2Uuid) {
                await UPDATE(this.recordsEntity)
                    .set({
                        vcData2UUID: vc2Uuid
                    })
                    .where({
                        ID: group.map(r => r.ID)
                    });
            }

            // 3.12) Trip insert (one header + one aggregated item + cost)

            // 3.17) TRIP inserts (Header, Item, Cost)
            // Sequence helper factory
            const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
            if (!lead.skipTrip) {
                try {
                    const totalAmount = group.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

                    const sPers = lead.sapEmployeeNo;
                    const sStart = moment(lead.beginDate, 'YYYYMMDD').format('YYYY-MM-DD');
                    const sEnd = moment(lead.endDate, 'YYYYMMDD').format('YYYY-MM-DD');

                    const oHeaderPayload = {
                        ContractNo: lead.contractNo,
                        WnInvoiceNo: lead.wnInvoiceNo,
                        SapEmployeeNo: sPers,
                        WnWorkOrder: lead.wnWorkOrder,
                        WoType: lead.woType,
                        WeekEndDate: lead.weekEndDate,
                        TotalAmount: totalAmount,
                        Currency: lead.currency,
                        TripStatus_code: 0,
                        Project: lead.internalOrder || '',
                        Destination: "US",
                    };

                    const aItems = [
                        {
                            ExpenseReceiptNumber: '1',
                            TripExpenseType: lead.tripExpenseType,
                            Amount: totalAmount,
                            Currency: lead.currency,
                            From: lead.FromLocation || '',
                            To: lead.ToLocation || '',
                            ReceiptsDocumentNumber: '1',
                            UrlLink: ''
                        }
                    ];

                    const aCosts = undefined;

                    const oPayload = {
                        Personnel: sPers,
                        StartOfTrip: sStart,
                        EndOfTrip: sEnd,
                        Header: oHeaderPayload,
                        Items: aItems
                    };

                    LOG.info(`[processSalesOrder] STEP 3.17: sending Trip payload → ${JSON.stringify(oPayload)}`);

                    const response = await executeHttpRequest(
                        { destinationName: 'monitor_baseurl' },
                        {
                            method: 'POST',
                            url: '/trip/Trip',
                            data: oPayload,
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );

                    LOG.info(`[processSalesOrder] STEP 3.17: Trip created → TripNumber=${response.data.TripNumber}`);

                    const tripIds = group.map(r => r.ID);
                    await ProcessLogger.addLogs(
                        tripIds.map(sId => ({
                            record_ID: sId,
                            message: `${response.data.TripNumber} Trip created for Employee ${sPers}`,
                            process_code: sProcessCode,
                            type: 3
                        }))
                    );

                } catch (error) {
                    const errMsg = error.response?.data?.error?.message || error.message;
                    LOG.warn(`Group ${key} → STEP 3.17 TRIP insert failed, skipping group: ${errMsg}`);
                    group.forEach(r => aSkippedRecords.push(r));
                    group.forEach(r => {
                        aErrorLogs.push({
                            record_ID: r.ID,
                            message: `Failed to insert TRIP with error ${errMsg} for Employee ${r.sapEmployeeNo}`,
                            process_code: sProcessCode
                        });
                    });
                    //await ProcessLogger.addLogs(aErrorLogs);
                }
            }
        }

        // 4) persist & mark
        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
        }
        if (aPassedRecordIDs.length) {
            //await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({ record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3 })));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);

            // bump to next step 5
            await UPDATE(this.recordsEntity)
                .set({
                    processLevel_code: '5'
                })
                .where({
                    ID: aPassedRecordIDs
                });
            this.records.forEach(r => {
                if (aPassedRecordIDs.includes(r.ID)) {
                    r.processLevel_code = '5';
                }
            });
        }

        // 5) exclusion & return
        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords,
            bBreakExecution
        });
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0
        };
    }


    // Step 5: Update or Create Purchase Order
    async processPurchaseOrder(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        LOG.info(`[processPurchaseOrder] ENTRY  Starting PO processing, step code=${sProcessCode}`);
        // this.updateProcessingState(sProcessCode);

        // Only process step '5'
        if (sProcessCode !== '5') {
            LOG.info('[processPurchaseOrder] SKIP  not step 5');
            return {
                hasError: false,
                continue: true
            };
        }
        LOG.info('=== Step 5 START: Update or Create Purchase Order ===');

        // 5.1) Fetch batch records
        LOG.info('[Step 5.1] Re-fetching batch records');
        await this._fetchRecords(this.recordIDs);
        let recs = this.records.filter(r => r.processLevel_code === '5');
        LOG.info(`[Step 5.1] Retrieved ${recs.length} records`);
        if (!recs.length) return {
            hasError: false,
            continue: true
        };

        // 5.1b) Skip CP/CR orders — mark complete (code '9') and remove them
        const cpcrIDs = recs
            .filter(r => ['CP', 'CR'].includes(r.distributionChannelSAP))
            .map(r => r.ID);
        if (cpcrIDs.length) {
            LOG.info(
                `[Step 5.1b] Skipping CP/CR orders (IDs=${cpcrIDs.join(',')}); ` +
                `marking processLevel='9'`
            );
            await UPDATE(this.recordsEntity)
                .set({ processLevel_code: '9' })
                .where({ ID: cpcrIDs });
            recs = recs.filter(r => !cpcrIDs.includes(r.ID));
        }
        if (!recs.length) {
            // nothing left to do
            return {
                hasError: false,
                continue: true
            };
        }

        // 5.2) Group remaining records (7 lines by default, 8 when additionalDayOfWork has data)
        LOG.info('[Step 5.2] Grouping records (+additionalDayOfWork when present)');

        const hasAdw = v => v !== null && v !== undefined && String(v).trim() !== '';

        const groups = new Map();
        for (const r of recs) {
            const parts = [r.contractNo, r.invoiceNoWN, r.employeeNo, r.tempusWorkOrder];
            if (hasAdw(r.additionalDayOfWork)) {
                parts.push(`ADW:${String(r.additionalDayOfWork).trim()}`);
            }
            const key = parts.join('|');
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(r);
        }

        LOG.info(`[Step 5.2] Formed ${groups.size} groups`);

        const errorLogs = [], passed = [], failed = [];
        const poComm = new PurchaseOrder();

        for (const [key, lines] of groups.entries()) {
            const rec = lines[0];
            const vbeln = rec.salesDocumentNoSAP; // Sales Order number
            const posnr = rec.salesItemNoSAP;     // Sales Order item number
            const firstItem = posnr;              // always defined for CREATE
            let ebeln, poItem, isUpdate = false;


            LOG.info(`--- Group ${key} (SO=${vbeln}, Item=${posnr}) ---`);
            try {
                //
                // 5.3) GET SO header
                LOG.info('[Step 5.3] GET SO header');
                const soHdr = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns([
                            'SalesOrder', 'SalesOrderType', 'SalesOrderTypeInternalCode', 'SalesOrganization', 'DistributionChannel',
                            'OrganizationDivision', 'SalesGroup', 'SalesOffice', 'SalesDistrict', 'SoldToParty', 'CreationDate',
                            'CreatedByUser', 'LastChangeDate', 'SenderBusinessSystemName', 'ExternalDocumentID', 'LastChangeDateTime',
                            'ExternalDocLastChangeDateTime', 'PurchaseOrderByCustomer', 'PurchaseOrderByShipToParty',
                            'CustomerPurchaseOrderType', 'CustomerPurchaseOrderDate', 'SalesOrderDate', 'TotalNetAmount',
                            'OverallDeliveryStatus', 'TotalBlockStatus', 'OverallOrdReltdBillgStatus', 'OverallSDDocReferenceStatus',
                            'TransactionCurrency', 'SDDocumentReason', 'PricingDate', 'PriceDetnExchangeRate', 'BillingPlan',
                            'RequestedDeliveryDate', 'ShippingCondition', 'CompleteDeliveryIsDefined', 'ShippingType',
                            'HeaderBillingBlockReason', 'DeliveryBlockReason', 'DeliveryDateTypeRule', 'IncotermsClassification',
                            'IncotermsTransferLocation', 'IncotermsLocation1', 'IncotermsLocation2', 'IncotermsVersion',
                            'CustomerPriceGroup', 'PriceListType', 'CustomerPaymentTerms', 'PaymentMethod', 'FixedValueDate',
                            'AssignmentReference', 'ReferenceSDDocument', 'ReferenceSDDocumentCategory', 'AccountingDocExternalReference',
                            'CustomerAccountAssignmentGroup', 'AccountingExchangeRate', 'CustomerGroup', 'AdditionalCustomerGroup1',
                            'AdditionalCustomerGroup2', 'AdditionalCustomerGroup3', 'AdditionalCustomerGroup4', 'AdditionalCustomerGroup5',
                            'SlsDocIsRlvtForProofOfDeliv', 'CustomerTaxClassification1', 'CustomerTaxClassification2',
                            'CustomerTaxClassification3', 'CustomerTaxClassification4', 'CustomerTaxClassification5',
                            'CustomerTaxClassification6', 'CustomerTaxClassification7', 'CustomerTaxClassification8',
                            'CustomerTaxClassification9', 'TaxDepartureCountry', 'VATRegistrationCountry', 'SalesOrderApprovalReason',
                            'SalesDocApprovalStatus', 'OverallSDProcessStatus', 'TotalCreditCheckStatus', 'OverallTotalDeliveryStatus',
                            'OverallSDDocumentRejectionSts', 'BillingDocumentDate', 'ContractAccount', 'AdditionalValueDays',
                            'CustomerPurchaseOrderSuplmnt', 'ServicesRenderedDate', 'YY1_AlphanumericSalesO_SDH', 'YY1_ShipToParty_SDH',
                            'YY1_CustomSalesOrder_SDH', 'YY1_CustomBillingType_SDH'
                        ])
                        .where({ SalesOrder: vbeln })
                );
                if (!soHdr) {
                    throw new Error(`Missing SO header for SalesOrder='${vbeln}'`);
                }
                LOG.info(`[Step 5.3] soHdr=${JSON.stringify(soHdr)}`);

                //
                // 5.3) GET SO items
                LOG.info('[Step 5.3] GET SO items');
                const soItems = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns([
                            'SalesOrder', 'SalesOrderItem', 'HigherLevelItem', 'HigherLevelItemUsage', 'SalesOrderItemCategory',
                            'SalesOrderItemText', 'PurchaseOrderByCustomer', 'PurchaseOrderByShipToParty', 'UnderlyingPurchaseOrderItem',
                            'ExternalItemID', 'Material', 'MaterialByCustomer', 'PricingDate', 'PricingReferenceMaterial', 'BillingPlan',
                            'RequestedQuantity', 'RequestedQuantityUnit', 'RequestedQuantitySAPUnit', 'RequestedQuantityISOUnit',
                            'OrderQuantityUnit', 'OrderQuantitySAPUnit', 'OrderQuantityISOUnit', 'ConfdDelivQtyInOrderQtyUnit',
                            'ItemGrossWeight', 'ItemNetWeight', 'ItemWeightUnit', 'ItemWeightSAPUnit', 'ItemWeightISOUnit', 'ItemVolume',
                            'ItemVolumeUnit', 'ItemVolumeSAPUnit', 'ItemVolumeISOUnit', 'OriginallyRequestedMaterial', 'TransactionCurrency',
                            'NetAmount', 'TotalSDDocReferenceStatus', 'SDDocReferenceStatus', 'MaterialSubstitutionReason', 'MaterialGroup',
                            'MaterialPricingGroup', 'AdditionalMaterialGroup1', 'AdditionalMaterialGroup2', 'AdditionalMaterialGroup3',
                            'AdditionalMaterialGroup4', 'AdditionalMaterialGroup5', 'BillingDocumentDate', 'ContractAccount',
                            'AdditionalValueDays', 'ServicesRenderedDate', 'Batch', 'ProductionPlant', 'OriginalPlant',
                            'AltvBsdConfSubstitutionStatus', 'StorageLocation', 'DeliveryGroup', 'ShippingPoint', 'ShippingType',
                            'DeliveryPriority', 'DeliveryDateQuantityIsFixed', 'DeliveryDateTypeRule', 'IncotermsClassification',
                            'IncotermsTransferLocation', 'IncotermsLocation1', 'IncotermsLocation2', 'TaxAmount',
                            'ProductTaxClassification1', 'ProductTaxClassification2', 'ProductTaxClassification3',
                            'ProductTaxClassification4', 'ProductTaxClassification5', 'ProductTaxClassification6',
                            'ProductTaxClassification7', 'ProductTaxClassification8', 'ProductTaxClassification9',
                            'MatlAccountAssignmentGroup', 'CostAmount', 'CustomerPaymentTerms', 'FixedValueDate', 'CustomerGroup',
                            'SalesDocumentRjcnReason', 'ItemBillingBlockReason', 'SlsDocIsRlvtForProofOfDeliv', 'WBSElement', 'ProfitCenter',
                            'AccountingExchangeRate', 'ReferenceSDDocument', 'ReferenceSDDocumentItem', 'SDProcessStatus', 'DeliveryStatus',
                            'OrderRelatedBillingStatus', 'Subtotal1Amount', 'Subtotal2Amount', 'Subtotal3Amount', 'Subtotal4Amount',
                            'Subtotal5Amount', 'Subtotal6Amount', 'YY1_StrTimeMarkup_SD_SDI', 'YY1_DoubTimeMarkup_SD_SDI',
                            'YY1_LegacyPurchase_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_CustomURL_SDI', 'YY1_ExtensionUUID1_SDI',
                            'YY1_EEGroup_SD_SDI', 'YY1_DuplicateWeek_SD_SDI', 'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI',
                            'YY1_CommodityCode_SD_SDI', 'YY1_ExtensionUUID2_SDI', 'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_WNWorkOrder_SD_SDI', 'YY1_CategoryCode_SD_SDI', 'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI', 'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({ SalesOrder: vbeln, SalesOrderItem: posnr })
                );
                if (!Array.isArray(soItems) || soItems.length === 0) {
                    throw new Error(`SO item ${posnr} not found on SalesOrder ${vbeln}`);
                }

                // extract the exact line you want
                const soItem = soItems[0];
                LOG.info(`[Step 5.3] soItem → ${JSON.stringify(soItem)}`);

                // 5.3b) GET dummy SO item 000010 for fallback defaults
                LOG.info('[Step 5.3b] Fetching dummy SO item 000010 for fallback defaults');
                const dummy = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['Material', 'WBSElement', 'ProfitCenter', 'OrderQuantityUnit', 'ProductionPlant'])
                        .where({ SalesOrder: vbeln, SalesOrderItem: posnr })
                );
                if (!dummy) {
                    LOG.warn(`[Step 5.3b] Dummy SO item 000010 not found for SalesOrder='${vbeln}', some fallbacks will be missing`);
                } else {
                    LOG.info(`[Step 5.3b] dummy=${JSON.stringify(dummy)}`);
                }

                // 5.4) Try to locate an existing PO by PDI
                LOG.info(`5.4: locating existing PO by PDI for SO='${vbeln}'`);
                const poRec = await this.purchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder'])
                        .where({ YY1_SDDocumentPD_PDI: vbeln })
                );
                let poNo = poRec?.PurchaseOrder || '';
                if (poNo) {
                    LOG.info(`5.4 → found existing PO='${poNo}'`);
                } else {
                    LOG.warn(`5.4 → no existing PO found for SO='${vbeln}'`);
                }

                // 5.5) Fallback: check the custom field on the SO‐item only if no PO yet
                if (!poNo) {
                    LOG.info(`5.5: checking fallback field YY1_PurchasingDoc_SD_SDI for SO='${vbeln}', item='${posnr}'`);
                    const soItmRef = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrderItem')
                            .columns(['YY1_PurchasingDoc_SD_SDI'])
                            .where({ SalesOrder: vbeln, SalesOrderItem: posnr })
                    );
                    const fallback = soItmRef?.YY1_PurchasingDoc_SD_SDI;
                    if (fallback && fallback !== vbeln) {
                        poNo = fallback;
                        LOG.info(`5.5 → fallback PO='${poNo}'`);
                    } else {
                        LOG.warn(
                            `5.5 → no valid fallback PO found ` +
                            `(field value='${fallback}'); will create a new PO next.`
                        );
                    }
                }

                // 5.x) Decide create vs. update and compute the next item number
                isUpdate = Boolean(poNo);
                poItem = await this.getNextLineItem(vbeln, poNo);
                LOG.info(`5.x → ${isUpdate ? 'updating' : 'creating'} PO='${poNo || '<new>'}', next item='${poItem}'`);

                // === ADD CALCULATION HERE ===
                let totalSale = 0;
                let totalHours = 0;
                for (const l of lines) {
                    const hrs1 = Number(l.shiftRGFirst) || 0;
                    const ot1 = Number(l.shiftOTFirst) || 0;
                    const dt1 = Number(l.shiftDTFirst) || 0;
                    const hrs2 = Number(l.shiftRGSecond) || 0;
                    const ot2 = Number(l.shiftOTSecond) || 0;
                    const dt2 = Number(l.shiftDTSecond) || 0;
                    const hrs3 = Number(l.shiftRGThird) || 0;
                    const ot3 = Number(l.shiftOTThird) || 0;
                    const dt3 = Number(l.shiftDTThird) || 0;

                    const rateRg1 = Number(l.shiftVendorPayRateFirst) || 0;
                    const rateOt1 = Number(l.shiftVendorOTPayRateFirst) || 0;
                    const rateDt1 = Number(l.shiftVendorDTPayRateFirst) || 0;
                    const rateRg2 = Number(l.shiftVendorPayRateSecond) || 0;
                    const rateOt2 = Number(l.shiftVendorOTPayRateSecond) || 0;
                    const rateDt2 = Number(l.shiftVendorDTPayRateSecond) || 0;
                    const rateRg3 = Number(l.shiftVendorPayRateThird) || 0;
                    const rateOt3 = Number(l.shiftVendorOTPayRateThird) || 0;
                    const rateDt3 = Number(l.shiftVendorDTPayRateThird) || 0;

                    const hrsThis = hrs1 + ot1 + dt1 + hrs2 + ot2 + dt2 + hrs3 + ot3 + dt3;
                    totalHours += hrsThis;

                    totalSale +=
                        hrs1 * rateRg1 +
                        ot1 * rateOt1 +
                        dt1 * rateDt1 +
                        hrs2 * rateRg2 +
                        ot2 * rateOt2 +
                        dt2 * rateDt2 +
                        hrs3 * rateRg3 +
                        ot3 * rateOt3 +
                        dt3 * rateDt3;
                }
                const poNetAmount = Number(totalSale.toFixed(2));
                const safePoAmount = poNetAmount > 0 ? poNetAmount : 1;
                LOG.info(`[processPurchaseOrder][Group ${key}] totalHours=${totalHours}, safePoAmount=${safePoAmount}`);
                // === END CALCULATION ===

                // === NEW: hours × vendor rate mapping (keeps inserts from failing) ===
                const qtyHours = Number((totalHours || 0).toFixed(2));
                const useQty = 1;                            // quantity = HOURS (fallback 1)
                const unitRate = Number((safePoAmount / (qtyHours || 1)).toFixed(2));    // unit price = vendor rate

                // 5.x) Delivery address & tax logic 
                LOG.info('[Step 5.x] fetching ship-to partner SH');
                const part = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderHeaderPartner')
                        .columns(['ReferenceBusinessPartner', 'AddressID', 'Customer'])
                        .where({ SalesOrder: vbeln, PartnerFunction: 'SH' })
                );
                if (!part) throw new Error(`Ship-to partner SH missing for SO ${vbeln}`);
                const bp = part.ReferenceBusinessPartner;
                const AddressID = part.AddressID;
                const Customer = part.Customer;
                let deliveryAddress;
                if (AddressID) {
                    deliveryAddress = {
                        PurchaseOrder: ebeln,
                        PurchaseOrderItem: poItem,
                        DeliveryAddressID: AddressID
                    };
                } else {
                    LOG.info('[Step 5.x] fetching full BP address');
                    const addr = await this.businessPartnerAPI.executeQuery(
                        SELECT.one.from('A_BusinessPartnerAddress')
                            .columns(['CorrespondenceLanguage', 'HouseNumber', 'StreetName', 'CityName', 'PostalCode', 'Country', 'Region'])
                            .where({ BusinessPartner: bp })
                    );
                    if (!addr) throw new Error(`No address found for BusinessPartner='${bp}'`);
                    deliveryAddress = {
                        PurchaseOrder: ebeln,
                        PurchaseOrderItem: poItem,
                        ...addr
                    };
                }
                // Tax jurisdiction
                LOG.info(`[Step 5.x] fetching TaxJurisdiction from BusinessPartnerAddress for BP=${bp}`);
                const addrRes = await this.businessPartnerAPI.executeQuery(
                    SELECT.one.from('A_BusinessPartnerAddress')
                        .columns(['TaxJurisdiction'])
                        .where({ BusinessPartner: bp })
                );
                const taxJurValue = addrRes?.TaxJurisdiction || rec.taxJurisdiction;
                LOG.info(`[Step 5.x] TaxJurisdiction='${taxJurValue}'`);

                // === Supplier mapping via to_Partner expand (ZV first, then ZR) ===
                let supplier = null;
                try {
                    const partners = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderHeaderPartner')
                            .columns(['PartnerFunction', 'Customer', 'Supplier', 'ReferenceBusinessPartner'])
                            .where({ SalesOrder: vbeln })
                    );
                    const zrEntry = partners.find(p => p.PartnerFunction === 'ZR');
                    if (zrEntry) {
                        const zpCustomer = zrEntry.Customer || zrEntry.ReferenceBusinessPartner;
                        if (zpCustomer) {
                            LOG.info(`[Step 5.x] Found ZR partner entry on SO ${vbeln}, partner=${zpCustomer}`);
                            try {
                                const vp = await this.businesPartnerAPI.executeQuery(
                                    SELECT.one.from('A_CustSalesPartnerFunc')
                                        .columns(['BPCustomerNumber'])
                                        .where({
                                            Customer: zpCustomer,
                                            SalesOrganization: soHdr.SalesOrganization,
                                            PartnerFunction: 'ZR'
                                        })
                                );
                                if (vp?.BPCustomerNumber) {
                                    supplier = vp.BPCustomerNumber;
                                    LOG.info(`[Step 5.x] Supplier from ZR mapping: ${supplier}`);
                                }
                            } catch (errInner) {
                                LOG.warn(`Error querying A_CustSalesPartnerFunc for ZR=${zpCustomer}: ${errInner.message}`);
                            }
                        }
                    }
                    if (!supplier) {
                        const zvEntry = partners.find(p => p.PartnerFunction === 'ZV');
                        if (zvEntry) {
                            const zvSupplier = zvEntry.Supplier || zvEntry.ReferenceBusinessPartner || zvEntry.Customer;
                            if (zvSupplier) {
                                supplier = zvSupplier;
                                LOG.info(`[Step 5.x] Supplier from ZV partner entry: ${supplier}`);
                            }
                        }
                    }
                } catch (err) {
                    LOG.warn(`Error querying A_SalesOrderHeaderPartner for SO ${vbeln}: ${err.message}`);
                }
                if (!supplier) {
                    supplier = rec.vendorSAP ||
                        soItem.PurchaseOrderByCustomer ||
                        soHdr.PurchaseOrderByCustomer ||
                        soHdr.SoldToParty || '';
                    LOG.info(`[Step 5.x] Fallback supplier: ${supplier}`);
                }
                if (!supplier) {
                    throw new Error(`Missing supplier for record ${rec.ID}`);
                }
                // === End supplier mapping ===

                // date helpers steps 
                const toODataDateOnly = d => {
                    const m = require('moment')(d, ['YYYY-MM-DD', 'YYYYMMDD'], true);
                    if (!m.isValid()) throw new Error(`Invalid date: ${d}`);
                    return m.format('YYYY-MM-DD');
                };

                const toIsoDateTime = d => {
                    const m = require('moment')(d, ['YYYY-MM-DD', 'YYYYMMDD', 'YYYY/MM/DD'], true);
                    if (!m.isValid()) throw new Error(`Invalid date: ${d}`);
                    return m.format('YYYY-MM-DDT00:00:00'); // or .toISOString() + 'Z' if you need UTC
                };

                // Common field fallbacks
                const docCurr = soItem.TransactionCurrency || soHdr.TransactionCurrency || rec.currencySAP || 'USD';
                const qtyRaw = soItem.OrderQuantity || soItem.RequestedQuantity || soItem.ConfdDelivQtyInOrderQtyUnit;
                const qty = qtyRaw != null ? parseFloat(qtyRaw) : lines.length;
                const netAmtRaw = soItem.NetAmount || soItem.CostAmount || soItem.Subtotal1Amount;
                const netAmount = netAmtRaw != null ? parseFloat(netAmtRaw) : lines.reduce((s, l) => s + (+l.invLineAmount || 0), 0);
                const taxCode = soItem.TaxCode || rec.taxCode || 'I0';
                const priceUnit = soItem.OrderQuantityUnit || soItem.RequestedQuantityUnit || rec.orderUnit || 'EA';
                const plant = soItem.ProductionPlant || '1200';
                const material = soItem.Material || rec.material || '100000416';

                // 5.6) CREATE new PO header + first item
                if (!poNo) {
                    const firstItem = rec.salesItemNoSAP;
                    const payload = {
                        PurchaseOrderType: 'ZMS',
                        CompanyCode: soHdr.SalesOrganization,
                        PurchasingOrganization: soHdr.SalesOrganization,
                        PurchasingGroup: soHdr.DistributionChannel,
                        Supplier: supplier,
                        DocumentCurrency: docCurr,
                        _PurchaseOrderItem: [{
                            PurchaseOrderItem: rec.salesItemNoSAP,
                            Material: material,
                            Plant: soHdr.SalesOrganization,
                            NetPriceAmount: safePoAmount,
                            // PurchaseOrderQuantityUnit: soItem.OrderQuantityUnit || 'LAB',
                            PurchaseOrderQuantityUnit: 'EA',
                            // === FIX: quantity = hours, price = vendor rate ===
                            OrderQuantity: useQty,
                            NetPriceQuantity: useQty,
                            // OrderPriceUnit: soItem.OrderQuantityUnit || 'LAB',
                            OrderPriceUnit: 'EA',
                            DocumentCurrency: docCurr,

                            // ================================================
                            TaxCode: taxCode,
                            TaxJurisdiction: taxJurValue,
                            AccountAssignmentCategory: 'Z',
                            YY1_SDDocumentPD_PDI: soHdr.SalesOrder,       // link back to SO
                            YY1_WNInvoice_PDI: rec.invoiceNoWN || '',      // from your file
                            YY1_WNWorkOrder_PDI: rec.tempusWorkOrder || '',// from your file
                            YY1_WeekEnd_PDI: toODataDateOnly(rec.weekEndDate), // weekend date
                            _PurOrdAccountAssignment: [{
                                AccountAssignmentNumber: '1',
                                // OrderQuantityUnit: soItem.OrderQuantityUnit || 'LAB',
                                OrderQuantityUnit: 'EA',
                                Quantity: 1,                 // match qty (hours)
                                DocumentCurrency: docCurr,
                                // PurgDocNetAmount: safePoAmount,   // keep TOTAL here
                                GLAccount: rec.glAccountSAP || '540110',
                                ControllingArea: rec.controllingArea || 'A000',
                                WBSElementExternalID: soItem.WBSElement || rec.WBSElement
                            }]
                            // _PurOrdPricingElement: [{ ConditionType: 'ZPAY', ConditionRateAmount: safePoAmount }]
                        }]
                    };

                    LOG.info(`[Step 5.6] CREATE PO payload: ${JSON.stringify(payload)}`);
                    const res = await poComm.createPurchaseOrder(payload);
                    if (res.error) {
                        throw new Error(`PO create failed: ${JSON.stringify(res.error)}`);
                    }

                    // **1) capture the new PO number**
                    poNo = res.PurchaseOrder;
                    LOG.info(`Created PO ${poNo}`);

                    // **2) write it back into your Times table**
                    await UPDATE(this.recordsEntity)
                        .set({ purchaseDocumentNoSAP: poNo, purchaseDocumentItemSAP: rec.salesItemNoSAP })
                        .where({ ID: lines.map(l => l.ID) });

                    // **3) back-link**
                    if (poNo) {
                        const soNum = vbeln;
                        try {
                            LOG.info(`[Step 5.6] patch SO item 00010 → YY1_PurchasingDoc_SD_SDI=${poNo}`);
                            const resp1 = await this.salesOrderAPI.patchSalesOrderItemV2({
                                SalesOrder: soNum,
                                SalesOrderItem: '00010',
                                YY1_PurchasingDoc_SD_SDI: poNo
                            });
                            LOG.info(`[Step 5.6] patch dummy header response: ${JSON.stringify(resp1)}`);

                            LOG.info(`[Step 5.6] patch SO item ${firstItem} → YY1_PurchasingDoc_SD_SDI=${poNo}`);
                            const resp2 = await this.salesOrderAPI.patchSalesOrderItemV2({
                                SalesOrder: soNum,
                                SalesOrderItem: firstItem,
                                YY1_PurchasingDoc_SD_SDI: poNo
                            });
                            LOG.info(`[Step 5.6] patch real item response:  ${JSON.stringify(resp2)}`);

                            LOG.info(`Back-linked SO=${soNum} ↔ PO=${poNo} on items 0010 & ${firstItem}`);
                        } catch (e) {
                            LOG.error(`[Step 5.6] back-linking SO→PO failed: ${e.message}`);
                            throw e;
                        }
                    } else {
                        LOG.error(`Cannot back-link: createPurchaseOrder returned no PO number`);
                    }
                }

                // 5.7) UPDATE existing PO: add new line
                if (isUpdate) {
                    // fallbacks...
                    const companyCode = soHdr.SalesOrganization || rec.companyCodeSAP || '1200';
                    const matFallback = soItem.Material || rec.material || '100000046';
                    const plantFallback = soItem.ProductionPlant || rec.ProductionPlant || '1200';
                    // const unitFallback = soItem.OrderQuantityUnit || rec.orderUnit || 'LAB';
                    const unitFallback = 'EA';
                    const currFallback = soHdr.TransactionCurrency || rec.currency || 'USD';
                    const tCodeFallback = soItem.TaxCode || rec.taxCode || 'I0';
                    const jurFallback = rec.taxJurisdiction || '2600000000';
                    const glFallback = rec.glAccountSAP || '540110';
                    const ctrlFallback = rec.controllingArea || 'A000';
                    const wbsextFallback = soItem.WBSElement || rec.WBSElement || '400287686';
                    const delAddrFallback = deliveryAddress?.DeliveryAddressID || '30613';

                    // === FIX: use hours/rate from above, keep totals in assignment ===
                    const updPayload = {
                        PurchaseOrder: poNo,
                        PurchaseOrderItem: rec.salesItemNoSAP,
                        PurchaseOrderCategory: 'F',
                        CompanyCode: companyCode,
                        Material: matFallback,
                        Plant: plantFallback,
                        PurchaseOrderQuantityUnit: unitFallback,
                        OrderQuantity: useQty,             // HOURS
                        NetPriceQuantity: useQty,          // HOURS
                        OrderPriceUnit: unitFallback,
                        DocumentCurrency: currFallback,
                        NetPriceAmount: unitRate,          // VENDOR RATE (per hour)
                        TaxCode: tCodeFallback,
                        YY1_SDDocumentPD_PDI: vbeln,       // SO no.
                        YY1_WNInvoice_PDI: rec.invoiceNoWN || '',
                        YY1_WNWorkOrder_PDI: rec.tempusWorkOrder || '',
                        YY1_WeekEnd_PDI: toODataDateOnly(rec.weekEndDate),
                        TaxJurisdiction: jurFallback,
                        AccountAssignmentCategory: 'Z',
                        _PurOrdAccountAssignment: [{
                            PurchaseOrderItem: rec.salesItemNoSAP,
                            AccountAssignmentNumber: '1',
                            GLAccount: glFallback,
                            ControllingArea: ctrlFallback,
                            WBSElementExternalID: wbsextFallback,
                            Quantity: useQty,                // match qty
                            OrderQuantityUnit: unitFallback,
                            DocumentCurrency: currFallback,
                            PurgDocNetAmount: safePoAmount   // TOTAL
                        }],
                        _DeliveryAddress: {
                            PurchaseOrder: poNo,
                            PurchaseOrderItem: rec.salesItemNoSAP,
                            DeliveryAddressID: delAddrFallback
                        }
                        // _PurOrdPricingElement: [{ ConditionType: 'ZPAY', ConditionRateAmount: safePoAmount }]
                    };

                    LOG.info(`[Step 5.7] ADD PO line payload: ${JSON.stringify(updPayload)}`);
                    const lineRes = await poComm.createPurchaseOrderItem(poNo, updPayload);
                    if (lineRes.error) {
                        throw new Error(`Add PO line failed: ${JSON.stringify(lineRes.error)}`);
                    }
                    LOG.info(`Added PO line ${poItem} to ${poNo}`);

                    // write it back into your Times table
                    await UPDATE(this.recordsEntity)
                        .set({ purchaseDocumentNoSAP: poNo, purchaseDocumentItemSAP: rec.salesItemNoSAP })
                        .where({ ID: lines.map(l => l.ID) });

                    // back-link SO↔PO on both dummy (00010) and your new line
                    if (poNo) {
                        const soNum = vbeln;
                        try {
                            LOG.info(`[Step 5.7] patch SO item 00010 → YY1_PurchasingDoc_SD_SDI=${poNo}`);
                            const resp1 = await this.salesOrderAPI.patchSalesOrderItemV2({
                                SalesOrder: soNum,
                                SalesOrderItem: '00010',
                                YY1_PurchasingDoc_SD_SDI: poNo
                            });
                            LOG.info(`[Step 5.7] patch dummy response: ${JSON.stringify(resp1)}`);

                            LOG.info(`[Step 5.7] patch SO item ${poItem} → YY1_PurchasingDoc_SD_SDI=${poNo}`);
                            const resp2 = await this.salesOrderAPI.patchSalesOrderItemV2({
                                SalesOrder: soNum,
                                SalesOrderItem: poItem,
                                YY1_PurchasingDoc_SD_SDI: poNo
                            });
                            LOG.info(`[Step 5.7] patch new-line response: ${JSON.stringify(resp2)}`);

                            LOG.info(`Back-linked SO=${soNum} ↔ PO=${poNo} on items 0010 & ${poItem}`);
                        } catch (e) {
                            // swallow error silently so flow continues
                        }
                    } else {
                        // skip back-link: poNo is undefined (no log)
                    }

                }

                // 5.8) Advance to MIRO
                await UPDATE(this.recordsEntity)
                    .set({ processLevel_code: 'B', sapPurchaseOrder: poNo })
                    .where({ ID: lines.map(l => l.ID) });

                passed.push(...lines.map(l => l.ID));
            } catch (e) {
                LOG.error(`[Group ${key}] FAILED → ${e.message}`);
                for (const l of lines) {
                    errorLogs.push({ record_ID: l.ID, message: e.message, process_code: sProcessCode });
                    failed.push(l.ID);
                }
            }
        }

        // 5.9) Finalize
        LOG.info('[Step 5.9] Finalizing');
        if (failed.length) {
            await ProcessLogger.removeLogs(failed, null, sProcessCode);
            await ProcessLogger.addLogs(errorLogs);
            // keep failures at '5' so they’ll be retried next time
            await this.markRecordsValid('5', failed, false);
        }
        if (passed.length) {
            // move successes to 'B' so they’re skipped next time
            await this.markRecordsValid('B', passed, true);
        }
        this.updateExclusionSet({ passed, failed, skipped: [], bBreakExecution });
        this.recordIDs = new Set(passed);
        LOG.info(`=== Step 5 END: passed=${passed.length}, failed=${failed.length} ===`);
        try {
            if (passed.length) {
                LOG.info(`[AUTO] Chaining ${passed.length} PO-passed row(s) to processSupplierInvoice('B')`);
                await this.processSupplierInvoice('B', false);
            }
        } catch (e) {
            LOG.error(`[AUTO] processPurchaseOrder chaining to MIRO failed: ${e.message}`);
        }
        return {
            hasError: failed.length > 0,
            continue: true
        };
    }


    /*** Step B: MIRO (Incoming Invoice) creation ***/
    async processSupplierInvoice(sProcessCode, bBreakExecution) {
        LOG.info(`[processSupplierInvoice] ENTRY (code=${sProcessCode})`);
        // this.updateProcessingState(sProcessCode);

        if (sProcessCode !== 'B') {
            LOG.info('[processSupplierInvoice] SKIP – not at MIRO step (B)');
            return {
                hasError: false,
                continue: true
            };
        }

        // helper to format JS Date/ISO → OData “/Date(…)/” wrapper
        const toODataDate = d => {
            const ms = (d instanceof Date) ? d.getTime() : new Date(d).getTime();
            return `/Date(${ms})/`;
        };

        // ==== item-number helpers (add once, near your requires) ====
        const toCanonItem = s => {
            const n = Number(String(s ?? '').replace(/^0+/, '')) || 0; // "000010" -> 10
            return String(n);
        };
        const canonToSO = canon => String(Number(canon)).padStart(6, '0'); // "10" -> "000010"
        const canonToPO = canon => String(Number(canon)).padStart(5, '0'); // "10" -> "00010"


        // 1) re-fetch batch records at B
        await this._fetchRecords(this.recordIDs);
        const toProcess = this.records.filter(r => r.processLevel_code === 'B');
        LOG.info(`[processSupplierInvoice] ${toProcess.length} records to invoice (step B)`);

        // 2) group by PO|Item|WO|Invoice
        const groups = new Map();
        toProcess.forEach(r => {
            const key = [r.purchaseDocumentNoSAP, r.purchaseDocumentItemSAP, r.fgWorkOrderID, r.fgInvoiceID].join('|');
            (groups.get(key) || groups.set(key, []).get(key)).push(r);
        });
        LOG.info(`[processSupplierInvoice] ${groups.size} unique PO/Item/WO/Inv groups`);

        // 3) prepare communicator
        const invApi = this.supplierInvoiceAPI;
        await invApi.initConnection();
        await this.supplierLFA1API.initConnection();

        const errorLogs = [],
            passed = [],
            failed = [];

        // 4) process each group
        for (const [key, recs] of groups.entries()) {
            const rec = recs[0];
            const {
                purchaseDocumentNoSAP: poNumber,
                purchaseDocumentItemSAP: poItem
            } = rec;
            LOG.info(`→ Creating MIRO for PO ${poNumber}, Item ${poItem} (group ${key})`);

            try {
                // a) PO header — CompanyCode, Currency, Supplier
                const po = await this.purchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrder')
                        .columns(['CompanyCode', 'DocumentCurrency', 'Supplier', 'PaymentTerms'])
                        .where({
                            PurchaseOrder: poNumber
                        })
                );
                if (!po) {
                    throw new Error(`PO ${poNumber} header not found`);
                }

                // fallback supplier if none on PO
                const invoicingParty = po.Supplier || '40151';


                // inside try { ... } after computing invoicingParty:
                const lfa1Row = await this.supplierLFA1API.executeQuery(
                    SELECT.one
                        .from('YY1_Supplier_LFA1') // <-- entity set from Portman: .../YY1_SUPPLIER_LFA1_CDS/YY1_Supplier_LFA1
                        .columns(['Supplier', 'SupplierStandardCarrierAccess'])
                        .where({ Supplier: invoicingParty })
                );

                const supplierCarrierAccess = lfa1Row?.SupplierStandardCarrierAccess ?? null;
                const paymentBlockingReason = supplierCarrierAccess
                    ? String(supplierCarrierAccess).trim().slice(0, 2).toUpperCase()
                    : undefined;

                // b) PO item
                const item = await this.purchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrderItem')
                        .columns([
                            'OrderQuantity', 'NetPriceAmount',
                            'TaxCode', 'TaxJurisdiction', 'Plant',
                            'PurchaseOrderQuantityUnit', 'Material'
                        ])
                        .where({
                            PurchaseOrder: poNumber,
                            PurchaseOrderItem: poItem
                        })
                );
                if (!item) {
                    throw new Error(`PO item ${poItem} not found on ${poNumber}`);
                }

                // c) build today in OData format
                const todayOData = toODataDate(new Date());

                // d) full MIRO payload
                const payload = {
                    CompanyCode: po.CompanyCode,
                    DocumentDate: todayOData,
                    PostingDate: todayOData,
                    SupplierInvoiceIDByInvcgParty: rec.fgInvoiceID || poNumber,
                    InvoicingParty: invoicingParty,
                    PaymentBlockingReason: paymentBlockingReason,
                    DocumentCurrency: po.DocumentCurrency || 'USD',
                    InvoiceGrossAmount: item.NetPriceAmount.toString(),
                    PaymentTerms: po.PaymentTerms,
                    DueCalculationBaseDate: todayOData,
                    AssignmentReference: rec.invoiceNoWN,
                    // HeaderText:                    rec.contractNo,       
                    ReconciliationAccount: rec.reconciliationAccount || '212100',
                    TaxIsCalculatedAutomatically: true,

                    to_SuplrInvcItemPurOrdRef: {
                        results: [{
                            SupplierInvoiceItem: '1',
                            PurchaseOrder: poNumber,
                            PurchaseOrderItem: poItem,
                            Plant: item.Plant,
                            TaxCode: item.TaxCode,
                            TaxJurisdiction: item.TaxJurisdiction,
                            DocumentCurrency: po.DocumentCurrency || 'USD',
                            SupplierInvoiceItemAmount: item.NetPriceAmount.toString(),
                            PurchaseOrderQuantityUnit: item.PurchaseOrderQuantityUnit,
                            // PurchaseOrderQtyUnitSAPCode: item.PurchaseOrderQuantityUnit,
                            // PurchaseOrderQtyUnitISOCode: '_01',
                            QuantityInPurchaseOrderUnit: item.OrderQuantity.toString(),
                            PurchaseOrderPriceUnit: item.PurchaseOrderQuantityUnit,
                            // PurchaseOrderPriceUnitSAPCode: item.PurchaseOrderQuantityUnit,
                            // PurchaseOrderPriceUnitISOCode: '_01',
                            QtyInPurchaseOrderPriceUnit: item.OrderQuantity.toString()
                        }]
                    },

                    to_SuplrInvcItemMaterial: {
                        results: [{
                            SupplierInvoiceItem: '1',
                            Material: item.Material,
                            ValuationArea: po.CompanyCode,
                            TaxCode: item.TaxCode,
                            TaxJurisdiction: item.TaxJurisdiction,
                            TaxCountry: rec.supplyingCountry || 'US',
                            TaxDeterminationDate: todayOData,
                            DocumentCurrency: po.DocumentCurrency || 'USD',
                            SupplierInvoiceItemAmount: '0.00',
                            QuantityUnit: item.PurchaseOrderQuantityUnit,
                            SuplrInvcItmQtyUnitSAPCode: item.PurchaseOrderQuantityUnit,
                            SuplrInvcItmQtyUnitISOCode: '',
                            Quantity: item.OrderQuantity.toString(),
                            DebitCreditCode: 'S'
                        }]
                    }
                };

                // e) call communicator, and explicitly fail if no invoice returned
                let res;
                try {
                    res = await invApi.createSupplierInvoice(payload);
                } catch (e) {
                    // network / unexpected errors
                    throw new Error(`MIRO call threw: ${e.message}`);
                }
                if (!res.SupplierInvoice) {
                    // communicator returned an error payload instead of throwing
                    const msg = res.error || 'no SupplierInvoice returned';
                    throw new Error(`MIRO failed: ${msg}`);
                }
                const invNumber = res.SupplierInvoice;
                const FiscalYear = res.FiscalYear;
                LOG.info(`MIRO created: ${invNumber}/${FiscalYear}`);


                // f) advance all recs in this group to step “9”
                const ids = recs.map(r => r.ID);
                await UPDATE(this.recordsEntity)
                    .set({
                        processLevel_code: '9',
                        invoiceDocumentNoSAP: invNumber,
                        invoiceFiscalYearSAP: FiscalYear
                    })
                    .where({
                        ID: ids
                    });

                passed.push(...ids);
            } catch (err) {
                LOG.error(`Group ${key} MIRO failed → ${err.message}`);
                for (const r of recs) {
                    errorLogs.push({
                        record_ID: r.ID,
                        message: err.message, process_code: sProcessCode
                    });
                    failed.push(r.ID);
                }
            }
        }

        // 5) finalize logs & validity
        LOG.info('[processSupplierInvoice] Finalizing MIRO step');
        if (failed.length) {
            await ProcessLogger.removeLogs(failed, null, sProcessCode);
            await ProcessLogger.addLogs(errorLogs);
            // keep failures at 'B' so they’ll be retried next time
            // await this.markRecordsValid('B', failed, false);
            await this.markRecordsValid('B', failed, false);
            // explicitly leave them at step B
            await UPDATE(this.recordsEntity)
                .set({
                    processLevel_code: 'B'
                })
                .where({
                    ID: failed
                });
        }
        if (passed.length) {
            // move successes to '9' so they’re skipped next time
            // await this.markRecordsValid('9', passed, true);
            await this.markRecordsValid('9', passed, true);
            // and bump them to step 9 in the DB
            await UPDATE(this.recordsEntity)
                .set({
                    processLevel_code: '9'
                })
                .where({
                    ID: passed
                });
        }
        this.updateExclusionSet({
            passed,
            failed,
            skipped: [],
            bBreakExecution
        });
        // return {
        //     hasError: failed.length > 0,
        //     continue: true
        // };

        this.recordIDs = new Set(passed); // if you have a final “complete” state
        return { hasError: failed.length > 0, continue: true };
    }
    //Step A Trip Management
    async TripManage(sProcessCode, bBreakExecution) {
        await ProcessLogger.removeLogs([...this.recordIDs], null, sProcessCode);
        await this._fetchRecords(this.recordIDs);
        LOG.info(`[processTripManagement] ENTRY (code=${sProcessCode})`);
        // this.updateProcessingState(sProcessCode);

        if (sProcessCode !== 'A') {
            LOG.info('[processTripManagement] SKIP – not at Trip Management step (A)');
            return {
                hasError: false,
                continue: true
            };
        }

        // 1) re-fetch batch records at A
        await this._fetchRecords(this.recordIDs);
        const toProcess = this.records.filter(r => r.processLevel_code === 'A');
        LOG.info(`[processTripManagement] ${toProcess.length} records to process (step A)`);
    }


}

module.exports = Travel;
