const moment = require('moment');
const cds = require('@sap/cds');
const {
    SELECT,
    UPDATE,
    INSERT
} = cds.ql;
const LOG = cds.log('Monitor.Processor-OtherBillables');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');
const SalesOrderComm = require('../communicators/SalesOrder');
const PurchaseOrderComm = require('../communicators/PurchaseOrder');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const SupplierInvoiceComm = require('../communicators/SupplierInvoice');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const EmpTimeDataComm = require('../communicators/EmpTimeData');
const SalesContractComm = require('../communicators/SalesContract');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const BillingTypeComm = require('../communicators/BillingType');
const SupplierLFA1Comm = require('../communicators/SupplierLFA1');
const { determineConditionType } = require('../common/pricingHelper');

class OtherBillables extends Processor {
    constructor(options) {
        super(options);
        LOG.info(`[constructor] options=${JSON.stringify(options)}`);
        this.recordsEntity = 'com.aleron.monitor.OtherBillables';
        this.columnsForRecords = this._getColumnsForFetch();

        // Communicators
        this.salesOrderAPI = null;
        this.purchaseOrderAPI = null;
        this.businessPartnerAPI = null;
        this.supplierInvoiceAPI = null;
        this.salesVCData_1Api = null;
        this.salesVCData_2Api = null;
        this.empTimeDataAPI = null;
        this.salesContractAPI = null;
        this.billingTypeAPI = null;
        this.enterpriseProjectAPI = null;
        this.supplierLFA1API = null;
    }

    _getColumnsForFetch() {
        LOG.info('[ _getColumnsForFetch ]');
        return [
            'ID', 'file_ID', 'processLevel_code', 'valid',
            'contractNo', 'wnInvoiceNo', 'sapEmployeeNo', 'wnWorkOrder', 'woType', 'otherBillableType',
            'internalOrder', 'weekEndDate', 'itemQuantity', 'customerBillDate', 'vendorPayDate',
            'currency', 'customerPoNoLabor',
            'personnelNoSAP', 'salesDocumentNoSAP', 'salesItemNoSAP', 'projectNumberSAP',
            'PORequiredSAP', 'purchaseDocumentNoSAP', 'purchaseDocumentItemSAP',
            'tripRequiredSAP', 'tripNoSAP', 'salesDocumentTypeSAP', 'fiscalYearSAP',
            'invoiceDocumentNoSAP', 'salesOrderICSAP', 'salesItemNoICSAP',
            'distributionChannelSAP', 'distributionChannelICSAP', 'salesOrderICUpdateRequired',
            'employeeSubgroupSAP', 'projectNumberICSAP'
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

    /** Expand this.recordIDs so single-row “Process” includes its whole group */
    async _expandSelectionToGroups() {
        // nothing to do if no seed selection
        if (!this.recordIDs || !this.recordIDs.size) return;

        // ensure we have fresh rows for the current selection
        await this._fetchRecords(this.recordIDs);

        // pull the seed rows (those that are currently selected)
        const seeds = [];
        const byId = new Map(this.records.map(r => [r.ID, r]));
        for (const id of this.recordIDs) {
            const r = byId.get(id);
            if (r) seeds.push(r);
        }
        if (!seeds.length) return;

        // de-dupe by the SAME tuple you use for grouping throughout this interface
        const K = r => [
            r.contractNo, r.invoiceNoWN, r.employeeNo,
            r.tempusWorkOrder, r.salesDocumentType, r.orderNo, r.weekEndDate
        ].map(v => v ?? '∅').join('|');

        const seen = new Set();
        const uniqSeeds = [];
        for (const s of seeds) {
            const k = K(s);
            if (!seen.has(k)) { seen.add(k); uniqSeeds.push(s); }
        }
        if (!uniqSeeds.length) return;

        // build CQN WHERE:  (A=? AND B=? AND ... ) OR (A2=? AND B2=? AND ... )
        const F = ['contractNo', 'invoiceNoWN', 'employeeNo', 'tempusWorkOrder', 'salesDocumentType', 'orderNo', 'weekEndDate'];

        const orConds = uniqSeeds.map(s => {
            const and = [];
            for (const f of F) {
                and.push({ ref: [f] });
                const v = s[f];
                if (v == null) and.push('is', 'null');
                else and.push('=', { val: v });
                and.push('and');
            }
            and.pop(); // remove trailing 'and'
            return ['(', ...and, ')'];
        });

        // stitch ORs together
        let whereExpr = orConds[0];
        for (let i = 1; i < orConds.length; i++) {
            whereExpr = [...whereExpr, 'or', ...orConds[i]];
        }

        // fetch ALL siblings across all selected tuples
        const siblings = await SELECT.from(this.recordsEntity).columns(['ID']).where(whereExpr);
        const extra = (siblings || [])
            .map(x => x.ID)
            .filter(id => !this.recordIDs.has(id));

        if (extra.length) {
            for (const id of extra) this.recordIDs.add(id);
            await this._fetchRecords(this.recordIDs);
            (this.LOG || console).info(`[group-expand] expanded to ${this.recordIDs.size} rows (added ${extra.length})`);
        }
    }

    async prepareCommunicators() {
        LOG.info('[prepareCommunicators] starting communicator setup');

        // Sales Order communicator
        this.salesOrderAPI = new SalesOrderComm();
        this.soAPI = await this.salesOrderAPI.getConnection();
        LOG.info('[prepareCommunicators] salesOrderAPI ready');

        // Purchase Order communicator
        this.purchaseOrderAPI = new PurchaseOrderComm();
        this.poAPI = await this.purchaseOrderAPI.getConnection();
        LOG.info('[prepareCommunicators] purchaseOrderAPI ready');

        // Sales VC Data #1
        this.salesVCData_1Api = new SalesVCData_1Comm();
        await this.salesVCData_1Api.getConnection();
        LOG.info('[prepareCommunicators] salesVCData_1Api ready');

        // Sales VC Data #2
        this.salesVCData_2Api = new SalesVCData_2Comm();
        await this.salesVCData_2Api.getConnection();
        LOG.info('[prepareCommunicators] salesVCData_2Api ready');

        // Business Partner communicator
        this.businessPartnerAPI = new BusinessPartnerComm();
        this.bpAPI = await this.businessPartnerAPI.getConnection();
        LOG.info('[prepareCommunicators] businessPartnerAPI ready');

        // Supplier Invoice communicator
        this.supplierInvoiceAPI = new SupplierInvoiceComm();
        this.siAPI = await this.supplierInvoiceAPI.getConnection();
        LOG.info('[prepareCommunicators] supplierInvoiceAPI ready');

        // Employee Time Data communicator
        this.empTimeDataAPI = new EmpTimeDataComm();
        LOG.info('[prepareCommunicators] empTimeDataAPI ready');

        // Sales Contract communicator
        this.salesContractAPI = new SalesContractComm();
        await this.salesContractAPI.getConnection();
        LOG.info('[prepareCommunicators] salesContractAPI ready');

        // Enterprise Project communicator
        this.enterpriseProjectAPI = new EnterpriseProjectComm();
        await this.enterpriseProjectAPI.getConnection();
        LOG.info('[prepareCommunicators] enterpriseProjectAPI ready');

        // Supplier LFA1 communicator
        this.supplierLFA1API = new SupplierLFA1Comm();
        LOG.info('[prepareCommunicators] supplierLFA1API ready');

        this.billingTypeAPI = new BillingTypeComm();
        await this.billingTypeAPI.getConnection();
        LOG.info('[prepareCommunicators] billingTypeAPI ready');
    }

    async validateRecords(sProcessCode, bBreakExecution) {
        LOG.info(`Entering validateRecords: process=${sProcessCode}, totalRecords=${this.records.length}`);

        // ------------------------------------------------------------
        // Step 0: Filter records to process vs. skip
        //  - Use shouldRecordProcess
        //  - BUT: if record is already at this step AND valid=true,
        //    force it into toProcess (do not skip)
        // ------------------------------------------------------------
        const toProcess = [];
        const skipped = [];
        const stepCode = String(sProcessCode);

        for (const rec of this.records) {
            const recStep = String(rec.processLevel_code ?? '');
            const isValid = rec.valid === true;

            // extra rule: record at this step + valid => must process
            const explicitlyAllowed = recStep === stepCode && isValid;

            if (this.shouldRecordProcess(rec, sProcessCode) || explicitlyAllowed) {
                toProcess.push({ ...rec });
            } else {
                skipped.push({ ...rec });
            }
        }

        LOG.info(`Filtered: toProcess=${toProcess.length}, skipped=${skipped.length}`);
        this.updateProcessingState(sProcessCode);

        if (!toProcess.length) {
            LOG.info('No records to validate, exiting');
            return { hasError: false, continue: true };
        }

        // ------------------------------------------------------------
        // Step 1.1: Group by wnWorkOrder|wnInvoiceNo|weekEndDate|currency
        // ------------------------------------------------------------
        LOG.info('Step 1.1: grouping records');
        const groups = toProcess.reduce((acc, rec) => {
            const key = `${rec.wnWorkOrder}|${rec.wnInvoiceNo}|${rec.weekEndDate}|${rec.currency}`;
            (acc[key] ||= []).push(rec);
            return acc;
        }, {});
        LOG.info(` → ${Object.keys(groups).length} groups formed`);

        // ------------------------------------------------------------
        // Step 1.2: OPT-MAN placeholder
        // ------------------------------------------------------------
        LOG.info('Step 1.2: OPT-MAN placeholder (skipped)');

        // Prepare trackers
        const errorLogs = [];
        const failedRecordIDs = new Set();
        const passedRecordIDs = new Set();
        const writes = [];

        // ------------------------------------------------------------
        // Step 1.3: Mandatory grouping fields must **not** be blank
        // ------------------------------------------------------------
        LOG.info('Step 1.3: checking mandatory fields');
        for (const [key, group] of Object.entries(groups)) {
            const blank = group.find(r =>
                !r.wnWorkOrder || !r.wnInvoiceNo || !r.weekEndDate || !r.currency
            );
            if (blank) {
                errorLogs.push({
                    record_ID: blank.ID,
                    message: `Group ${key}: mandatory field blank`, process_code: sProcessCode
                });
                group.forEach(r => failedRecordIDs.add(r.ID));
                LOG.info(` → group ${key} FAILED mandatory check`);
            } else {
                group.forEach(r => passedRecordIDs.add(r.ID));
                LOG.info(` → group ${key} passed mandatory check`);
            }
        }

        // ------------------------------------------------------------
        // Step 1.4: Duplicate & ZLAB logic + NEW SO lookup from WorkOrder
        // ------------------------------------------------------------
        LOG.info('Step 1.4: duplicate and ZLAB logic');
        for (const [key, group] of Object.entries(groups)) {
            // if any in this group already failed, skip all further checks
            if (group.some(r => failedRecordIDs.has(r.ID))) {
                LOG.info(` → skipping ${key} (already failed)`);
                continue;
            }

            const rec = group[0];

            // ─────────────────────────────────────────────────────────
            // NEW STEP 1.4.A – Derive SAP SalesOrder from WorkOrder
            //   1) Try A_SalesOrderItem via YY1_WNWorkOrder_SD_SDI & item 000010
            //   2) Fallback: A_SalesOrder via YY1_AlphanumericSalesO_SDH
            //   3) Update wnWorkOrder in DB when we normalize it
            // ─────────────────────────────────────────────────────────
            LOG.info(
                `STEP 1.4.A: Group ${key} → Deriving SalesOrder from wnWorkOrder='${rec.wnWorkOrder}'`
            );

            let sapSO;
            let soItem;
            try {
                soItem = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['SalesOrder'])
                        .where({
                            YY1_WNWorkOrder_SD_SDI: rec.wnWorkOrder,
                            SalesOrderItem: '000010'
                        })
                );
            }
            catch (err) {
                LOG.error(err.message);
                errorLogs.push({
                    record_ID: rec.ID,
                    message: err.message + ` (WorkOrderNumber: ${rec.wnWorkOrder})`, process_code: sProcessCode
                });
            }
            // ----------------------------
            // NEW ELSE CASE (fallback)
            // ----------------------------
            if (!soItem) {
                LOG.info(
                    `STEP 1.0x: Record ${rec.ID} → No SalesOrderItem found via YY1_WNWorkOrder_SD_SDI, ` +
                    `trying fallback: A_SalesOrder with YY1_AlphanumericSalesO_SDH='${rec.wnWorkOrder}'`
                );

                let soHdrFallback;
                try {
                    soHdrFallback = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrder')
                            .columns(['SalesOrder'])   // we only need SalesOrder
                            .where({ YY1_AlphanumericSalesO_SDH: rec.wnWorkOrder })
                    );
                }

                catch (err) {
                    LOG.error(err.message);

                }

                if (soHdrFallback && soHdrFallback.SalesOrder) {
                    const newWO = soHdrFallback.SalesOrder;
                    LOG.info(
                        `STEP 1.0x: Record ${rec.ID} (fallback) → Updating wnWorkOrder '${rec.wnWorkOrder}' → '${newWO}'`
                    );

                    rec.wnWorkOrder = newWO;
                    sapSO = newWO;

                    await UPDATE(this.recordsEntity)
                        .set({ wnWorkOrder: newWO })
                        .where({ ID: rec.ID });

                    // fallback succeeded, continue with rest of validation
                } else {
                    LOG.error(
                        `STEP 1.0x: Record ${rec.ID} → Fallback SalesOrder lookup also failed → ERROR OUT`
                    );

                    errorLogs.push({
                        record_ID: rec.ID,
                        message: `Group ${key}: SAP SalesOrder not found from WorkOrder '${rec.wnWorkOrder}'`, process_code: sProcessCode
                    });
                    group.forEach(r => failedRecordIDs.add(r.ID));
                    LOG.info(` → group ${key} FAILED SO lookup (WorkOrder based)`);
                    continue;
                }
            } else {
                // ----------------------------
                // ORIGINAL LOGIC CONTINUES HERE
                // ----------------------------
                LOG.info(
                    `STEP 1.0x: Record ${rec.ID} → Found SalesOrder='${soItem.SalesOrder}', fetching alphanumeric`
                );
                let soHdr;
                try {
                     soHdr = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrder')
                            .columns(['YY1_AlphanumericSalesO_SDH'])
                            .where({ SalesOrder: soItem.SalesOrder })
                    );
                }

                catch (err) {
                    LOG.error(err.message);

                }
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
                    errorLogs.push({
                        record_ID: rec.ID,
                        message: `STEP 1.0x: Record ${rec.ID} → No alphanumeric found for SalesOrder='${soItem.SalesOrder}'`, process_code: sProcessCode
                    });
                }

                sapSO = soItem.SalesOrder;
            }

            LOG.info(` → Group ${key}: resolved SAP SO=${sapSO}`);

            // ─── 1.4.B — “skip ZEXP check if any item already has this invoice” ───
            let existing;
            try {
                existing = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem'])
                        .where({
                            SalesOrder: sapSO,
                            YY1_WNInvoice_SD_SDI: rec.wnInvoiceNo
                        })
                );
            }
            catch (err) {
                LOG.error(err.message);

            }

            if (existing.length) {
                LOG.info(
                    ` → order ${sapSO} already has ${existing.length}` +
                    ` item(s) for invoice ${rec.wnInvoiceNo}; skipping ZEXP check`
                );
            } else {
                LOG.info(
                    ` → no existing item found for invoice ${rec.wnInvoiceNo}; ZEXP check passes`
                );
            }

            // Date Check convertor as per S4
            const parts = rec.weekEndDate.match(/(\d{4})(\d{2})(\d{2})/);
            const weekEndDate = parts ?
                new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3])) :
                null;

            // ─── 1.4.C — Duplicate check via TADN schedule-lines ───
            let scheduleItems;
            try {
                scheduleItems = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns([
                            'SalesOrderItem',
                            'YY1_WeekEnd_SD_SDI',
                            'SalesOrderItemCategory'
                        ])
                        .where({
                            SalesOrder: sapSO,
                            YY1_WNInvoice_SD_SDI: rec.wnInvoiceNo
                        })
                );
            }
            catch (err) {
                LOG.error(err.message);

            }

            const m = rec.weekEndDate.match(/^(\d{4})(\d{2})(\d{2})$/);
            const weekEnd = m ?
                new Date(+m[1], +m[2] - 1, +m[3]) :
                null;

            const duplicates = scheduleItems.filter(i => {
                if (i.SalesOrderItemCategory !== 'TADN') return false;
                if (!weekEnd || !i.YY1_WeekEnd_SD_SDI) return false;
                const svcDate = new Date(i.YY1_WeekEnd_SD_SDI);
                return svcDate.toISOString().slice(0, 10) ===
                    weekEnd.toISOString().slice(0, 10);
            });

            LOG.info(` → found ${duplicates.length} existing TADN line(s)`);

            if (duplicates.length) {
                errorLogs.push({
                    record_ID: rec.ID,
                    message: `Group ${key}: duplicate TADN schedule-line exists`, process_code: sProcessCode
                });
                group.forEach(r => failedRecordIDs.add(r.ID));
                LOG.info(` → group ${key} FAILED duplicate TADN check`);
                continue;
            }

            LOG.info(` → group ${key} passed duplicate TADN check`);

            const salesItem = existing[0]?.SalesOrderItem;
            if (!salesItem) {
                LOG.warn(` → group ${key}: could not find a SalesOrderItem to write back`);
            }

            // queue the write-back of salesDocumentNoSAP & salesItemNoSAP
            group.forEach(r => {
                writes.push({
                    ID: r.ID,
                    salesDocumentNoSAP: sapSO,
                    salesItemNoSAP: salesItem
                });
                passedRecordIDs.add(r.ID);
            });
        }

        // ------------------------------------------------------------
        // Persist all salesDocumentNoSAP & salesItemNoSAP updates
        // ------------------------------------------------------------
        if (writes.length) {
            await Promise.all(writes.map(w =>
                UPDATE(this.recordsEntity)
                    .set({
                        salesDocumentNoSAP: w.salesDocumentNoSAP,
                        salesItemNoSAP: w.salesItemNoSAP
                    })
                    .where({ ID: w.ID })
            ));
            LOG.info(`Wrote back ${writes.length} SAP fields`);
        }

        // ------------------------------------------------------------
        // Finalize: log, persist errors, mark records valid/invalid
        // ------------------------------------------------------------
        const failed = Array.from(failedRecordIDs);
        const passed = Array.from(passedRecordIDs).filter(id => !failedRecordIDs.has(id));

        LOG.info(`Exiting validateRecords: passed=${passed.length}, failed=${failed.length}, skipped=${skipped.length}`);

        // Handle failed records
        if (failed.length) {
            try {
                await Promise.allSettled([
                    // add error logs
                    ProcessLogger.addLogs(errorLogs),
                    // mark failed records invalid with correct processLevel_code
                    ...failed.map(recordID => {
                        const record = this.records.find(r => r.ID === recordID);
                        let recordProcessLevelCode = sProcessCode;

                        if (record) {
                            if (record.processLevel_code === '0') {
                                recordProcessLevelCode = '1';
                            } else if (record.processLevel_code === '1') {
                                recordProcessLevelCode = '1';
                            } else {
                                recordProcessLevelCode = record.processLevel_code;
                            }
                        }

                        return UPDATE(this.recordsEntity)
                            .set({ valid: false, processLevel_code: recordProcessLevelCode })
                            .where({ ID: recordID });
                    })
                ]);

                LOG.info(
                    cds.i18n.messages.at('INFO_RECORDS_UPDATED', [
                        sProcessCode,
                        failed.join(',')
                    ])
                );
            } catch (err) {
                LOG.error(err.message);
            }
        }

        // Handle passed records
        if (passed.length) {
            const stepCodeStr = String(sProcessCode);

            await Promise.allSettled([
                ProcessLogger.removeLogs(passed, null, sProcessCode),
                ProcessLogger.addLogs(passed.map((sId) => ({ record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [stepCodeStr]), process_code: stepCodeStr, type: 3 }))),
                ...passed.map(recordID => {
                    const record = this.records.find(r => r.ID === recordID);

                    // default to current DB value
                    let recordProcessLevelCode = record?.processLevel_code ?? stepCodeStr;

                    // --- KEY LOGIC ---
                    //  step 0  -> after pass, move to 1
                    //  step 1  -> after pass, move to 3 (so Sales Order step will not skip)
                    if (stepCodeStr === '0') {
                        recordProcessLevelCode = '1';
                    } else if (stepCodeStr === '1') {
                        recordProcessLevelCode = '3';
                    }

                    return UPDATE(this.recordsEntity)
                        .set({ valid: true, processLevel_code: recordProcessLevelCode })
                        .where({ ID: recordID });
                })
            ]);

            LOG.info(
                cds.i18n.messages.at('INFO_RECORDS_UPDATED', [
                    sProcessCode,
                    'All'
                ])
            );

            // keep in-memory snapshot in sync
            this.records.forEach(r => {
                if (passed.includes(r.ID)) {
                    if (stepCodeStr === '0') {
                        r.processLevel_code = '1';
                    } else if (stepCodeStr === '1') {
                        r.processLevel_code = '3';
                    }
                    r.valid = true;
                }
            });
        }

        this.updateExclusionSet({
            passed,
            failed,
            skipped,
            bBreakExecution
        });

        return {
            hasError: failed.length > 0,
            continue: failed.length === 0
        };
    }



    async processSalesOrder(sProcessCode, bBreakExecution) {
        LOG.info(`=== Entering processSalesOrder: code=${sProcessCode}, totalRecords=${this.records.length} ===`);

        // only run this step at process code “3”
        if (String(sProcessCode) !== '3') {
            LOG.info(`--- Skipping processSalesOrder: not at step 3 (current step=${sProcessCode})`);
            return { hasError: false, continue: true };
        }

        // ─── Step 3.0: Classify & filter records ───────────────────────────────
        LOG.info('--- Starting Step 3.0: Classifying records');
        const toProcess = [], skipped = [];
        this.records.forEach(r => {
            LOG.info(`   Checking record ID=${r.ID}: processLevel_code=${r.processLevel_code}, valid=${r.valid}`);
            if (String(r.processLevel_code) === '3') {
                toProcess.push({ ...r });
                LOG.info('     → will process');
            } else {
                skipped.push({ ...r });
                LOG.info('     → will skip');
            }
        });
        LOG.info(`--- Completed Step 3.0: toProcess=${toProcess.length}, skipped=${skipped.length}`);
        LOG.info(`   toProcess IDs: [${toProcess.map(r => r.ID).join(', ')}]`);
        await ProcessLogger.removeLogs(toProcess.map(r => r.ID), null, sProcessCode);
        this.updateProcessingState(sProcessCode);
        if (!toProcess.length) {
            LOG.info('--- Step 3.0: no records → exit early');
            LOG.info('=== Exiting processSalesOrder: no records ===');
            return { hasError: false, continue: true };
        }

        // ─── Step 3.1: Grouping by WN-WorkOrder|Invoice|WeekEnd|Currency ───────
        LOG.info('--- Starting Step 3.1: grouping records');
        const groups = {};
        toProcess.forEach(r => {
            const key = `${r.wnWorkOrder}|${r.wnInvoiceNo}|${r.weekEndDate}|${r.currency}`;
            LOG.info(`   Assigning record ID=${r.ID} to group key='${key}'`);
            (groups[key] = groups[key] || []).push(r);
        });
        const groupKeys = Object.keys(groups);
        LOG.info(`--- Completed Step 3.1: formed ${groupKeys.length} group(s)`);
        groupKeys.forEach(key =>
            LOG.info(`   Group '${key}' contains IDs [${groups[key].map(r => r.ID).join(', ')}]`)
        );
        if (!groupKeys.length) {
            LOG.info('--- Step 3.1: no groups → exit early');
            LOG.info('=== Exiting processSalesOrder: no groups ===');
            return { hasError: false, continue: true };
        }

        // ─── Prepare for Steps 3.2–3.8 ──────────────────────────────────────────
        const aRecordsForProcessing = [];
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aRecordIDs = [];
        const aWNWorkOrderWhere = [];
        const aSalesOrderWhere = [];
        const aPurchaseOrderItemWhere = [];
        const aCustomerWhere = [];
        const aCustomerTermWhere = [];
        const aVendorWhere = [];
        const aCustomerFieldNamesWhere = [];
        const mSalesOrder = new Map();
        const mSalesOrderItem = new Map();
        const mSalesOrderFirstItem = new Map();
        const mSalesOrderPartner = new Map();
        const mVendor = new Map();
        const mPurchaseOrderItem = new Map();
        const mTravelPayTerm = new Map();
        const mTravelPayTermFeed = new Map();
        const mCustomerFieldNameValue = new Map();
        const mProcessingRecordsToCentralMapping = new Map();

        LOG.info('--- Flattening toProcess → building filters');
        toProcess.forEach(r => {
            aRecordsForProcessing.push({ ...r });
            const idx = this.records.findIndex(x => x.ID === r.ID);
            mProcessingRecordsToCentralMapping.set(r.ID, idx);
            aRecordIDs.push(r.ID);
            LOG.info(`   Record ID=${r.ID} at original index=${idx}`);

            if (r.wnWorkOrder) {
                aWNWorkOrderWhere.push(r.wnWorkOrder);
                LOG.info(`     Added wnWorkOrder filter: ${r.wnWorkOrder}`);
            }

            (r.customerFieldNameValues || []).forEach(entry => {
                if (!mCustomerFieldNameValue.has(r.ID)) mCustomerFieldNameValue.set(r.ID, []);
                mCustomerFieldNameValue.get(r.ID).push({ ...entry });
                aCustomerFieldNamesWhere.push(entry.customerFieldName);
                LOG.info(`     Added custom field filter: ${entry.customerFieldName}`);
            });
        });
        LOG.info(`   Final wnWorkOrder filter list: [${[...new Set(aWNWorkOrderWhere)].join(', ')}]`);
        LOG.info(`   Final customFieldNames filter list: [${[...new Set(aCustomerFieldNamesWhere)].join(', ')}]`);

        // ─── Step 3.2: fetch first items & custom‐fields → VC mapping ───────────
        LOG.info('--- Starting Step 3.2: fetch first items & CustomFieldsToVC');
        try {
            const [
                aSalesOrderFirstItems,
                aCustomFieldsTOVC
            ] = await Promise.all([
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns([
                            'SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI',
                            'SalesOrderItemCategory', 'YY1_WNWorkOrder_SD_SDI',
                            'Material', 'WBSElement', 'ProductionPlant'
                        ])
                        .where({
                            YY1_WNWorkOrder_SD_SDI: { in: [...new Set(aWNWorkOrderWhere)] },
                            SalesOrderItem: '10'
                        })
                ),
                SELECT.from('com.aleron.monitor.CustomFieldsToVC')
                    .columns(['customValue', 'fieldName'])
                    .where({ customValue: { in: [...new Set(aCustomerFieldNamesWhere)] } })
            ]);

            LOG.info(`   Retrieved ${aSalesOrderFirstItems.length} first‐item(s)`);
            aSalesOrderFirstItems.forEach(o => {
                LOG.info(`     WNWorkOrder=${o.YY1_WNWorkOrder_SD_SDI}, SalesOrder=${o.SalesOrder}, Item=${o.SalesOrderItem}`);
                if (!mSalesOrderFirstItem.has(o.YY1_WNWorkOrder_SD_SDI)) {
                    mSalesOrderFirstItem.set(o.YY1_WNWorkOrder_SD_SDI, []);
                }
                mSalesOrderFirstItem.get(o.YY1_WNWorkOrder_SD_SDI).push(o);
                aSalesOrderWhere.push(o.SalesOrder);
            });

            LOG.info(`   Retrieved ${aCustomFieldsTOVC.length} CustomFieldsToVC entries`);
            aCustomFieldsTOVC.forEach(x =>
                LOG.info(`     customValue='${x.customValue}' → fieldName='${x.fieldName}'`)
            );

            // annotate customerFieldNameValue
            for (const [recordID, entries] of mCustomerFieldNameValue.entries()) {
                entries.forEach(entry => {
                    const match = aCustomFieldsTOVC.find(x => x.customValue === entry.customerFieldName);
                    if (match) {
                        entry.fieldName = match.fieldName;
                        LOG.info(`   Mapped record ${recordID} field '${entry.customerFieldName}' → '${match.fieldName}'`);
                    }
                });
            }
        } catch (err) {
            LOG.error(`   ERROR in Step 3.2: ${err.message}`);
        }

        // ─── Step 3.3: fetch SalesOrders, items & partners ────────────────────
        LOG.info('--- Starting Step 3.3: fetch SalesOrders, SalesOrderItems, SalesOrderHeaderPartners');
        try {
            const [
                aSalesOrders,
                aSalesOrderItems,
                aSalesOrderPartners
            ] = await Promise.all([
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns([
                            'SalesOrder', 'SalesOrganization', 'DistributionChannel',
                            'OrganizationDivision', 'SoldToParty', 'YY1_AlphanumericSalesO_SDH',
                            'YY1_CustomSalesOrder_SDH', 'CustomerGroup', 'CustomerPaymentTerms'
                        ])
                        .where({ SalesOrder: { in: [...new Set(aSalesOrderWhere)] } })
                ),
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns([
                            'SalesOrder', 'SalesOrderItem', 'YY1_PurchasingDoc_SD_SDI',
                            'SalesOrderItemCategory', 'YY1_WNWorkOrder_SD_SDI',
                            'Material', 'WBSElement', 'ProductionPlant'
                        ])
                        .where({ SalesOrder: { in: [...new Set(aSalesOrderWhere)] } })
                ),
                this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderHeaderPartner')
                        .columns(['SalesOrder', 'Customer', 'Supplier', 'PartnerFunction'])
                        .where({
                            SalesOrder: { in: [...new Set(aSalesOrderWhere)] },
                            PartnerFunction: { in: ['ZR', 'BP'] }
                        })
                )
            ]);

            LOG.info(`   Fetched ${aSalesOrders.length} SalesOrder(s)`);
            aSalesOrders.forEach(o => {
                mSalesOrder.set(o.SalesOrder, o);
                aCustomerWhere.push(o.SoldToParty);
                aCustomerTermWhere.push(o.CustomerPaymentTerms);
                LOG.info(`     SO=${o.SalesOrder}, DistChannel=${o.DistributionChannel}, SoldTo=${o.SoldToParty}`);
            });

            LOG.info(`   Fetched ${aSalesOrderItems.length} SalesOrderItem(s)`);
            aSalesOrderItems?.forEach(o => {
                if (!mSalesOrderItem.has(o.SalesOrder)) mSalesOrderItem?.set(o.SalesOrder, []);
                mSalesOrderItem?.get(o.SalesOrder).push(o);
                if (o.YY1_PurchasingDoc_SD_SDI && !aPurchaseOrderItemWhere.includes(o.YY1_PurchasingDoc_SD_SDI)) {
                    aPurchaseOrderItemWhere.push(o.YY1_PurchasingDoc_SD_SDI);
                }
                LOG.info(`     SO=${o.SalesOrder}, Item=${o.SalesOrderItem}, Cat=${o.SalesOrderItemCategory}`);
            });

            LOG.info(`   Fetched ${aSalesOrderPartners.length} SalesOrderHeaderPartner(s)`);
            aSalesOrderPartners?.forEach(o => {
                if (!mSalesOrderPartner?.has(o.SalesOrder)) mSalesOrderPartner?.set(o.SalesOrder, []);
                mSalesOrderPartner?.get(o.SalesOrder).push(o);
                if (o.PartnerFunction === 'ZR') aVendorWhere?.push(o.Supplier);
                LOG.info(`     SO=${o.SalesOrder}, PF=${o.PartnerFunction}, Supp/Buyer=${o.Supplier || o.Customer}`);
            });
        } catch (err) {
            LOG.error(`   ERROR in Step 3.3: ${err.message}`);
        }

        // ─── Step 3.4: fetch Vendors, PO items & Travel terms ────────────────
        LOG.info('--- Starting Step 3.4: fetch Vendor_VendorRemit, PurchaseOrderItem, TravelCustomerPayTermByPOBox, TravelPayTermFeed');
        try {
            const [
                aVendors,
                aPurchaseOrderItems,
                aTravelPayTerms,
                aTravelPayTermFeeds
            ] = await Promise.all([
                SELECT.from('com.aleron.monitor.Vendor_VendorRemit')
                    .columns(['vendor', 'vendorZR'])
                    .where({ vendor: { in: [...new Set(aVendorWhere)] } }),
                this.purchaseOrderAPI.executeQuery(
                    SELECT.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder', 'PurchaseOrderItem'])
                        .where({ PurchaseOrder: { in: [...new Set(aPurchaseOrderItemWhere)] } })
                ),
                SELECT.from('com.aleron.monitor.TravelCustomerPayTermByPOBox')
                    .columns(['customerNo', 'customerTerm', 'poBox'])
                    .where({
                        customerNo: { in: [...new Set(aCustomerWhere)] },
                        customerTerm: { in: [...new Set(aCustomerTermWhere)] }
                    }),
                SELECT.from('com.aleron.monitor.TravelPayTermFeed')
                    .columns(['paymentTerm', 'netPaymentTerm'])
                    .where({ paymentTerm: { in: [...new Set(aCustomerTermWhere)] } })
            ]);

            LOG.info(`   Retrieved ${aVendors.length} Vendor_VendorRemit entries`);
            aVendors?.forEach(o => {
                mVendor.set(o.vendor, o);
                LOG.info(`     vendor=${o.vendor}, vendorZR=${o.vendorZR}`);
            });

            LOG.info(`   Retrieved ${aPurchaseOrderItems?.length} PurchaseOrderItem(s)`);
            aPurchaseOrderItems?.forEach(o => {
                if (!mPurchaseOrderItem?.has(o.PurchaseOrder)) mPurchaseOrderItem?.set(o.PurchaseOrder, []);
                mPurchaseOrderItem?.get(o.PurchaseOrder).push(o);
                LOG.info(`     PO=${o.PurchaseOrder}, POItem=${o.PurchaseOrderItem}`);
            });

            LOG.info(`   Retrieved ${aTravelPayTerms?.length} TravelCustomerPayTermByPOBox entries`);
            aTravelPayTerms?.forEach(o => {
                mTravelPayTerm?.set(o.customerNo, o);
                LOG.info(`     customerNo=${o.customerNo}, poBox=${o.poBox}`);
            });

            LOG.info(`   Retrieved ${aTravelPayTermFeeds?.length} TravelPayTermFeed entries`);
            aTravelPayTermFeeds?.forEach(o => {
                mTravelPayTermFeed?.set(o.paymentTerm, o);
                LOG.info(`     paymentTerm=${o.paymentTerm}, netPaymentTerm=${o.netPaymentTerm}`);
            });
        } catch (err) {
            LOG.error(`   ERROR in Step 3.4: ${err.message}`);
        }

        // ─── Step 3.5: build payloads for new SalesOrderItems ────────────────
        LOG.info('--- Starting Step 3.5: building payloads');
        const aPayloads = [];
        const mPayloadMap = new Map();

        for (const record of aRecordsForProcessing) {
            LOG.info(`\n--- Payload build for record ID=${record.ID} ---`);
            const aErrors = [];
            let oSalesOrder, oPartnerFunctionZV;
            const firstItems = mSalesOrderFirstItem.get(record.wnWorkOrder) || [];
            LOG.info(`   firstItems for WN=${record.wnWorkOrder}: [${firstItems.map(o => o.SalesOrder + '#' + o.SalesOrderItem).join(', ')}]`);

            // skip if already created
            if (record.salesItemNoSAP) {
                LOG.info(`   salesItemNoSAP already set (${record.salesItemNoSAP}) → marking passed`);
                aPassedRecordIDs.push(record.ID);
                mPayloadMap.set(record.ID, {
                    salesOrder: record.salesDocumentNoSAP,
                    salesOrderItem: record.salesItemNoSAP,
                    salesOrderICUpdateRequired: record.salesOrderICUpdateRequired,
                    p2SalesDocumentNoSAP: record.p2SalesDocumentNoSAP,
                    PORequiredSAP: record.PORequiredSAP,
                    purchaseDocumentNoSAP: record.purchaseDocumentNoSAP
                });
                continue;
            }

            // type validation
            LOG.info(`   Validating woType='${record.woType}'`);
            if (!record.woType || !['SC', 'MS', 'IC', 'CP'].includes(record.woType)) {
                const msg = cds.i18n.messages.at('ERR_SALES_DOCUMENT_TYPE');
                LOG.error(`   ERR_SALES_DOCUMENT_TYPE: ${msg}`);
                aErrors.push({ record_ID: record.ID, message: msg, process_code: sProcessCode });
                aFailedRecordIDs.push(record.ID);
                aErrorLogs.push(...aErrors);
                continue;
            }

            // CP/CR branch
            if (['CP', 'CR'].includes(record.woType)) {
                LOG.info('   Entering CP/CR logic');
                if (firstItems?.length === 1) {
                    const so = mSalesOrder?.get(firstItems[0]?.SalesOrder);
                    LOG.info(`     single firstItem → SO=${so?.SalesOrder}, DistChannel=${so?.DistributionChannel}`);
                    if (!['CP', 'CR'].includes(so?.DistributionChannel)) {
                        const msg = cds.i18n.messages.at('ERR_SALES_ORDER_PAYROLL');
                        LOG.error(`     ERR_SALES_ORDER_PAYROLL: ${msg}`);
                        aErrors.push({ record_ID: record.ID, message: msg, process_code: sProcessCode });
                        aFailedRecordIDs.push(record.ID);
                        aErrorLogs.push(...aErrors);
                        continue;
                    }
                    oSalesOrder = so;
                } else {
                    LOG.info('     multiple firstItems → searching CP/CR or IC/Z1');
                    for (const item of firstItems) {
                        const so = mSalesOrder?.get(item.SalesOrder);
                        LOG.info(`       check SO=${so?.SalesOrder}, DistChannel=${so?.DistributionChannel}, CustGroup=${so?.CustomerGroup}`);
                        if (['CP', 'CR'].includes(so?.DistributionChannel)) {
                            oSalesOrder = so;
                        } else if (so?.DistributionChannel === 'IC' && so?.CustomerGroup === 'Z1') {
                            record.salesOrderICUpdateRequired = 'X';
                            record.p2SalesDocumentNoSAP = so.SalesOrder;
                            LOG.info(`         flagged IC update for P2 SO=${so.SalesOrder}`);
                        }
                    }
                }
            }
            // MS branch
            else if (record.woType === 'MS') {
                LOG.info('   Entering MS logic');
                for (const item of firstItems) {
                    const so = mSalesOrder?.get(item.SalesOrder);
                    LOG.info(`       check SO=${so?.SalesOrder}, DistChannel=${so?.DistributionChannel}`);
                    if (so?.DistributionChannel === 'MS') {
                        oSalesOrder = so;
                        const partners = mSalesOrderPartner?.get(so.SalesOrder) || [];
                        oPartnerFunctionZV = partners.find(p => p.PartnerFunction === 'ZV');
                        const vendor = mVendor.get(oPartnerFunctionZV?.Supplier);
                        record.PORequiredSAP = vendor ? '' : '1';
                        LOG.info(`         partner ZV → vendor=${vendor?.vendorZR || vendor?.vendor || 'none'} → PORequiredSAP='${record.PORequiredSAP}'`);
                        if (so.CustomerPriceGroup === 'ZM') {
                            record.PORequiredSAP = '';
                            LOG.info('         CustomerPriceGroup=ZM → PORequiredSAP cleared');
                        }
                    }
                }
            }

            if (!oSalesOrder) {
                const msg = cds.i18n.messages.at('ERR_SALES_ORDER_NOT_EXIST');
                LOG.error(`   ERR_SALES_ORDER_NOT_EXIST: ${msg}`);
                aErrors.push({ record_ID: record.ID, message: msg, process_code: sProcessCode });
                aFailedRecordIDs.push(record.ID);
                aErrorLogs.push(...aErrors);
                continue;
            }
            LOG.info(`   Using SalesOrder ${oSalesOrder?.SalesOrder}`);

            // collect existing SO items
            const items = mSalesOrderItem?.get(oSalesOrder.SalesOrder) || [];
            const firstSOItem = items?.find(i => i.SalesOrderItem === '10' && i.SalesOrderItemCategory === 'TADN');
            const lastSOItem = items?.reduce((max, cur) =>
                Number(cur.SalesOrderItem) > Number(max.SalesOrderItem) ? cur : max, items[0]
            );
            LOG.info(`   Found ${items.length} existing SO items; firstSOItem=${firstSOItem?.SalesOrderItem}, lastSOItem=${lastSOItem?.SalesOrderItem}`);

            // pricing & billing type
            LOG.info('   Determining conditionType via pricingHelper');
            const conditionType = await determineConditionType({
                customer: oSalesOrder.SoldToParty,
                salesOrganization: oSalesOrder.SalesOrganization,
                distributionChannel: oSalesOrder.DistributionChannel,
                division: oSalesOrder.OrganizationDivision
            });
            LOG.info(`   → conditionType='${conditionType}'`);

            LOG.info('   Fetching billingType from YY1_BILLINGTYPE');
            const billingTypeRes = await this.billingTypeAPI.executeQuery(
                SELECT.from('YY1_BILLINGTYPE').columns(['Billing_type', 'SO_order_Type'])
                    .where({ SO_order_Type: oSalesOrder.YY1_CustomSalesOrder_SDH })
            );
            const billingType = billingTypeRes[0] || {};
            LOG.info(`   → billingType='${billingType.Billing_type}' for orderType='${billingType.SO_order_Type}'`);

            // project number check
            if (!firstSOItem?.WBSElement || firstSOItem?.WBSElement !== record.internalOrder) {
                const msg = cds.i18n.messages.at('ERR_PROJECT_NUMBER_MISSING');
                LOG.error(`   ERR_PROJECT_NUMBER_MISSING: ${msg} (expected '${record.internalOrder}', got '${firstSOItem?.WBSElement}')`);
                aErrors.push({ record_ID: record.ID, message: msg, process_code: sProcessCode });
                aFailedRecordIDs.push(record.ID);
                aErrorLogs.push(...aErrors);
                continue;
            }

            // PO creation logic
            if (record.PORequiredSAP === '1') {
                LOG.info('   PORequiredSAP flag is set → validating purchaseDocument...');
                if (!firstSOItem?.YY1_PurchasingDoc_SD_SDI) {
                    const msg = cds.i18n.messages.at('ERR_CREATE_PO');
                    LOG.error(`   ERR_CREATE_PO: ${msg}`);
                    aErrors.push({ record_ID: record.ID, message: msg, process_code: sProcessCode });
                    aFailedRecordIDs.push(record.ID);
                    aErrorLogs.push(...aErrors);
                    continue;
                }
                record.purchaseDocumentNoSAP = firstSOItem?.YY1_PurchasingDoc_SD_SDI;
                LOG.info(`   Using existing PO=${record.purchaseDocumentNoSAP}`);
                const poItems = mPurchaseOrderItem?.get(firstSOItem.YY1_PurchasingDoc_SD_SDI) || [];
                const maxPO = poItems?.reduce((max, cur) =>
                    cur.PurchaseOrderItem > max.PurchaseOrderItem ? cur : max, poItems[0]
                );
                if (poItems?.length) {
                    LOG.info(`     Found ${poItems.length} PO items; maxPOItem=${maxPO?.PurchaseOrderItem}`);
                    if (Number(maxPO?.PurchaseOrderItem) > Number(lastSOItem?.SalesOrderItem)) {
                        lastSOItem.SalesOrderItem = maxPO.PurchaseOrderItem;
                        LOG.info(`     lastSOItem adjusted up to ${lastSOItem.SalesOrderItem}`);
                    }
                }
            }

            // duplicate invoice check
            if (record.wnInvoiceNo === oSalesOrder?.YY1_WNInvoice_SD_SDI) {
                const msg = cds.i18n.messages.at('ERR_DUPLICATE_LINES');
                LOG.error(`   ERR_DUPLICATE_LINES: ${msg}`);
                aErrorLogs.push({ record_ID: record.ID, message: msg, process_code: sProcessCode });
                aFailedRecordIDs.push(record.ID);
                continue;
            }

            // build payload
            const newItemNum = String(Number(lastSOItem.SalesOrderItem) + 10);
            LOG.info(`   Building payload → newItemNum=${newItemNum}`);
            const payload = {
                SalesOrder: firstSOItem.SalesOrder,
                SalesOrderItem: newItemNum,
                SalesOrderItemCategory: 'TAD',
                Material: firstSOItem.Material,
                RequestedQuantity: '1',
                OrderQuantityUnit: 'LAB',
                ProductionPlant: firstSOItem.ProductionPlant || '',
                SalesOrderItemText: 'BONUS',
                WBSElement: firstSOItem.WBSElement,
                PurchaseOrderByCustomer: record.customerPO || '',
                PricingDate: `/Date(${+moment()})/`,
                YY1_PurchasingDoc_SD_SDI: firstSOItem.YY1_PurchasingDoc_SD_SDI || '',
                YY1_WeekEnd_SD_SDI: `/Date(${moment(record.endDate, 'YYYYMMDD').valueOf()})/`,
                YY1_CustomBillingType_SDI: billingType.Billing_type || '',
                YY1_WNWorkOrder_SD_SDI: firstSOItem.YY1_WNWorkOrder_SD_SDI,
                YY1_WNInvoice_SD_SDI: record.wnInvoiceNo,
                to_ScheduleLine: [{
                    SalesOrderItem: newItemNum,
                    RequestedDeliveryDate: `/Date(${+moment()})/`,
                    ScheduleLineOrderQuantity: '1',
                    OrderQuantityISOUnit: '_01'
                }],
                to_PricingElement: {
                    results: [{ ConditionType: conditionType, ConditionRateValue: record.customerBillRate }]
                }
            };

            LOG.info('   Applying travel terms & text fields');
            const travelTerm = mTravelPayTerm?.get(oSalesOrder?.SoldToParty);
            if (travelTerm) {
                payload.PurchaseOrderByShipToParty = travelTerm.poBox;
                LOG.info(`     PurchaseOrderByShipToParty='${travelTerm.poBox}'`);
            }
            const termFeed = mTravelPayTermFeed?.get(oSalesOrder?.CustomerPaymentTerms);
            if (termFeed) {
                payload.CustomerPaymentTerms = termFeed.netPaymentTerm;
                LOG.info(`     CustomerPaymentTerms='${termFeed.netPaymentTerm}'`);
            }
            payload.to_Text = [{ LongText: '', LongTextID: '', Language: 'EN' }];
            for (let idx = 1; idx <= 15; idx++) {
                const name = record[`customerFieldName${idx}`];
                const val = record[`customerFieldValue${idx}`];
                if (name === 'Z20') {
                    payload.to_Text[0].LongText = val;
                    payload.to_Text[0].LongTextID = 'ZJOB';
                    LOG.info(`     to_Text set ZJOB → '${val}'`);
                    break;
                }
                if (name === 'Z21') {
                    payload.to_Text[0].LongText = val;
                    payload.to_Text[0].LongTextID = 'ZSLD';
                    LOG.info(`     to_Text set ZSLD → '${val}'`);
                    break;
                }
                if (name === 'Z41' && ['X', 'YES', 'Y'].includes(val)) {
                    payload.PriceListType = 'ZD';
                    LOG.info(`     PriceListType='ZD'`);
                    break;
                }
            }
            LOG.info('   Final payload JSON:');
            LOG.info(JSON.stringify(payload, null, 2));

            const payloadIndex = aPayloads.push(payload) - 1;
            mPayloadMap.set(record.ID, {
                payloadIndex,
                salesOrderICUpdateRequired: record.salesOrderICUpdateRequired,
                p2SalesDocumentNoSAP: record.p2SalesDocumentNoSAP,
                PORequiredSAP: record.PORequiredSAP,
                purchaseDocumentNoSAP: record.purchaseDocumentNoSAP
            });
            LOG.info(`   Payload[${payloadIndex}] queued for record ID=${record.ID}`);
        }

        // ─── Step 3.6: send payloads to SAP ────────────────────────────────────
        LOG.info(`--- Starting Step 3.6: sending ${aPayloads.length} payload(s) to SAP`);
        if (aPayloads.length) {
            aPayloads.forEach(p => delete p.errors);
            const results = await this.salesOrderAPI.createSalesOrderItems(aPayloads);
            LOG.info(`   Received ${results.length} response(s) from SAP`);
            results.forEach((res, i) => {
                const recID = [...mPayloadMap.entries()]
                    .find(([id, m]) => m.payloadIndex === i)[0];
                if (!res.hasError) {
                    LOG.info(`     Success for payload[${i}] → record ID=${recID}, newItem=${res.value.SalesOrderItem}`);
                    aPassedRecordIDs.push(recID);
                    const map = mPayloadMap.get(recID);
                    map.salesOrder = res.value.SalesOrder;
                    map.salesOrderItem = res.value.SalesOrderItem;
                    mPayloadMap.set(recID, map);
                } else {
                    LOG.error(`     Error for payload[${i}] → record ID=${recID}:`, res.reason);
                    aFailedRecordIDs.push(recID);
                    if (Array.isArray(res.reason)) {
                        res.reason.forEach(err => aErrorLogs.push({ record_ID: recID, ...err, process_code: sProcessCode }));
                    } else {
                        aErrorLogs.push({
                            record_ID: recID,
                            message: cds.i18n.messages.at('ERR_SALES_ORDER_ITEM_CREATION_FAILED', [res.reason]), process_code: sProcessCode
                        });
                    }
                    mPayloadMap.delete(recID);
                }
            });
        } else {
            LOG.info('   No payloads to send');
        }

        // ─── Step 3.7: inline VC data updates ──────────────────────────────────
        LOG.info('--- Starting Step 3.7: inserting VC data for passed records');
        {
            for (const record of this.records) {
                if (aFailedRecordIDs.includes(record.ID)) {
                    LOG.info(`   Skipping VC insert for failed record ID=${record.ID}`);
                    continue;
                }
                const map = mPayloadMap.get(record.ID);
                if (!map?.salesOrder) {
                    LOG.info(`   No salesOrder mapped for record ID=${record.ID} → skipping VC`);
                    continue;
                }
                LOG.info(`   Building VC1/VC2 for record ID=${record.ID}, SalesOrder=${map.salesOrder}, Item=${map.salesOrderItem}`);

                // assemble VC fields
                const entries = mCustomerFieldNameValue.get(record.ID) || [];
                const VC1Names = ['Z40', 'Z43', 'Z44', 'Z45', 'Z46'];
                const VC2Names = [ /*...*/];
                const VC1Fields = {};
                const VC2Fields = {};
                entries.forEach(e => {
                    if (VC1Names.includes(e.customerFieldName)) {
                        VC1Fields[e.fieldName] = e.customerFieldValue;
                        LOG.info(`     VC1 field ${e.fieldName} → '${e.customerFieldValue}'`);
                    }
                    if (VC2Names.includes(e.customerFieldName)) {
                        VC2Fields[e.fieldName] = e.customerFieldValue;
                        LOG.info(`     VC2 field ${e.fieldName} → '${e.customerFieldValue}'`);
                    }
                });

                const salesVC1 = {
                    SalesOrderNumber: map.salesOrder,
                    SalesOrderItemNum: map.salesOrderItem,
                    YY8_WEEK_ENDING2: moment(record.endDate).format('YYYY-MM-DD'),
                    ...VC1Fields
                };
                const salesVC2 = {
                    Sales_Order_Number: map.salesOrder,
                    Sales_Order_Item_Num: map.salesOrderItem,
                    YY166_BONUS_PRICE: record.customerBillRate?.toString() || '0.00',
                    YY167_BONUS_PAY_RATE: record.vendorPayRate?.toString() || '0.00',
                    YY246_ZSD_WN_INVOICE_VCSD: (map.salesOrderICUpdateRequired === 'X'
                        ? record.wnInvoiceNo + 'IC'
                        : record.wnInvoiceNo),
                    YY247_ZSD_WN_WORK_ORDER_VCSD: record.wnWorkOrder,
                    ...VC2Fields
                };

                LOG.info(`     VC1 payload: ${JSON.stringify(salesVC1, null, 2)}`);
                LOG.info(`     VC2 payload: ${JSON.stringify(salesVC2, null, 2)}`);

                let inserted1, inserted2;
                if (!record.vcData1UUID) {
                    inserted1 = await this.salesVCData_1Api.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_1').entries(salesVC1)
                    );
                }
                if (!record.vcData2UUID) {
                    inserted2 = await this.salesVCData_2Api.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_2').entries(salesVC2)
                    );
                }

                if (inserted1?.SAP_UUID) {
                    map.vcData1UUID = inserted1.SAP_UUID;
                    LOG.info(`     VC1 inserted → SAP_UUID=${inserted1.SAP_UUID}`);
                }
                if (inserted2?.SAP_UUID) {
                    map.vcData2UUID = inserted2.SAP_UUID;
                    LOG.info(`     VC2 inserted → SAP_UUID=${inserted2.SAP_UUID}`);
                }
                if (inserted1?.message) {
                    LOG.error(`     VC1 error message: ${inserted1.message}`);
                    aErrorLogs.push({ record_ID: record.ID, message: inserted1.message, process_code: sProcessCode });
                }
                if (inserted2?.message) {
                    LOG.error(`     VC2 error message: ${inserted2.message}`);
                    aErrorLogs.push({ record_ID: record.ID, message: inserted2.message, process_code: sProcessCode });
                }
                if (inserted1?.message || inserted2?.message) {
                    aFailedRecordIDs.push(record.ID);
                    const idx = aPassedRecordIDs.indexOf(record.ID);
                    if (idx > -1) aPassedRecordIDs.splice(idx, 1);
                    LOG.error(`     Marking record ID=${record.ID} failed due to VC errors`);
                }
                mPayloadMap.set(record.ID, map);
            }
        }

        // ─── Step 3.8: final logging & updates ────────────────────────────────
        LOG.info('--- Starting Step 3.8: final logging & updates');
        if (aErrorLogs.length) {
            LOG.info(`   Persisting ${aErrorLogs.length} error log(s)`);
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(this.recordsEntity)
                .set({ valid: false, processLevel_code: sProcessCode })
                .where({ ID: { in: aFailedRecordIDs } });
        }

        // write back all the newly‐created SAP fields
        const aUpdates = [];
        this.records.forEach(r => {
            const m = mPayloadMap.get(r.ID);
            if (m?.salesOrder) {
                Object.assign(r, {
                    salesDocumentNoSAP: m.salesOrder,
                    salesItemNoSAP: m.salesOrderItem,
                    vcData1UUID: m.vcData1UUID || '',
                    vcData2UUID: m.vcData2UUID || '',
                    salesOrderICUpdateRequired: m.salesOrderICUpdateRequired,
                    p2SalesDocumentNoSAP: m.p2SalesDocumentNoSAP,
                    PORequiredSAP: m.PORequiredSAP,
                    purchaseDocumentNoSAP: m.purchaseDocumentNoSAP
                });
                aUpdates.push({
                    ID: r.ID,
                    salesDocumentNoSAP: m.salesOrder,
                    salesItemNoSAP: m.salesOrderItem,
                    vcData1UUID: m.vcData1UUID,
                    vcData2UUID: m.vcData2UUID,
                    salesOrderICUpdateRequired: m.salesOrderICUpdateRequired,
                    p2SalesDocumentNoSAP: m.p2SalesDocumentNoSAP,
                    PORequiredSAP: m.PORequiredSAP,
                    purchaseDocumentNoSAP: m.purchaseDocumentNoSAP
                });
            }
        });
        LOG.info(`   Writing back ${aUpdates.length} record update(s) to the database`);
        await Promise.all(aUpdates.map(u =>
            UPDATE(this.recordsEntity).set(u).where({ ID: u.ID })
        ));

        if (aPassedRecordIDs.length) {
            LOG.info(`   Marking ${aPassedRecordIDs.length} passed record(s) valid`);
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({ record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3 })));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
        }
        if (aFailedRecordIDs.length) {
            LOG.info(`   Marking ${aFailedRecordIDs.length} failed record(s) invalid`);
            await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
        }

        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped,
            bBreakExecution
        });

        LOG.info(`=== Exiting processSalesOrder: passed=${aPassedRecordIDs.length}, failed=${aFailedRecordIDs.length}, skipped=${skipped.length} ===`);
        return {
            hasError: aFailedRecordIDs.length > 0,
            continue: aFailedRecordIDs.length === 0
        };
    }

    async processIntercompanyso(sProcessCode, bBreakExecution) {
        LOG.info(`=== Entering processIntercompanyso: process=${sProcessCode}, totalRecords=${this.records.length} ===`);

        // ─── Step 3.0: Classify IC records ─────────────────────────────────────────────────────────
        LOG.info('Step 3.0: Classifying records for IC processing');
        const aRecordsForProcessing = [];
        const aSkippedRecords = [];
        for (const rec of this.records) {
            // only IC records at this step, and only if they haven't already had an IC line created
            if (this.shouldRecordProcess(rec, sProcessCode) &&
                rec.woType === 'IC' &&
                !rec.sapPosnrIc) {
                aRecordsForProcessing.push({
                    ...rec
                });
            } else {
                aSkippedRecords.push({
                    ...rec
                });
            }
        }
        LOG.info(`Step 3.0: toProcess=${aRecordsForProcessing.length}, skipped=${aSkippedRecords.length}`);
        await ProcessLogger.removeLogs(aRecordsForProcessing.map(r => r.ID), null, sProcessCode);
        this.updateProcessingState(sProcessCode);
        if (!aRecordsForProcessing.length) {
            LOG.info('Step 3.0: no IC records → exit');
            return {
                hasError: false,
                continue: true
            };
        }

        // ─── Step 3.1: Iterate each IC record ───────────────────────────────────────────────────────
        const aErrorLogs = [];
        const aPassedRecordIDs = [];
        const aFailedRecordIDs = [];

        for (const rec of aRecordsForProcessing) {
            LOG.info(`\n--- IC Record ID=${rec.ID}, WN=${rec.wnWorkOrder} ---`);
            let failed = false;

            // 3.1.1 If SAP_P_2_SO is not set → skip
            LOG.info(`3.1: checking SAP_P_2_SO flag (rec.sapP2So='${rec.salesOrderICUpdateRequired}')`);
            if (!rec.salesOrderICUpdateRequired) {
                LOG.info('3.1 → no P2 sales order → skipping IC');
                continue;
            }

            // 3.1.2 Use SAP_P_2_VBELN
            const VAR_VBELN_SO = rec.p2SalesDocumentNoSAP;
            LOG.info(`3.1 → VAR_VBELN_SO='${VAR_VBELN_SO}'`);
            if (!VAR_VBELN_SO) {
                aErrorLogs.push({
                    record_ID: rec.ID,
                    message: 'IC Sales order not found', process_code: sProcessCode
                });
                aFailedRecordIDs.push(rec.ID);
                LOG.error('3.1 → VAR_VBELN_SO blank → fail');
                continue;
            }

            // 3.1.3 Fetch header and validate dist channel = IC
            LOG.info(`3.1.3: fetching SO header for '${VAR_VBELN_SO}'`);
            let hdr;
            try {
                hdr = await this.soAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns(['DistributionChannel', 'SalesOrganization', 'LastChangeDateTime', 'SoldToParty', 'SDDocumentReason', 'AdditionalCustomerGroup2'])
                        .where({
                            SalesOrder: VAR_VBELN_SO
                        })
                );
            } catch (e) {
                hdr = null;
                LOG.error(`3.1.3 → error fetching header: ${e.message}`);
            }
            if (!hdr) {
                aErrorLogs.push({
                    record_ID: rec.ID,
                    message: 'IC SO header not found', process_code: sProcessCode
                });
                aFailedRecordIDs.push(rec.ID);
                LOG.error('3.1.3 → header missing → fail');
                continue;
            }
            if (hdr.DistributionChannel !== 'IC') {
                aErrorLogs.push({
                    record_ID: rec.ID,
                    message: 'IC SO has wrong distribution channel', process_code: sProcessCode
                });
                aFailedRecordIDs.push(rec.ID);
                LOG.error(`3.1.3 → DistChannel='${hdr.DistributionChannel}' ≠ IC → fail`);
                continue;
            }
            LOG.info(`3.1.3 → header OK (DistChannel=IC)`);

            // 3.1.4 Determine SAP_PO (PO creation flag)
            let SAP_PO = 2; // default for IC
            // 3.1.4.1 partner ZR → vendor
            LOG.info('3.1.4.1: fetching partner ZR');
            const partZR = await this.soAPI.executeQuery(
                SELECT.one.from('A_SalesOrderHeaderPartner')
                    .columns(['Supplier'])
                    .where({
                        SalesOrder: VAR_VBELN_SO,
                        PartnerFunction: 'ZR'
                    })
            );
            const VAR_LIFNR = partZR?.Supplier;
            LOG.info(`3.1.4.1 → VAR_LIFNR='${VAR_LIFNR}'`);
            if (VAR_LIFNR) {
                // 3.1.4.2 custom mapping table ZSD_MBEWBE
                LOG.info(`3.1.4.2: checking ZSD_MBEWBE for '${VAR_LIFNR}'`);
                const mbe = await SELECT.one.from('ZSD_MBEWBE')
                    .columns(['vendorZR'])
                    .where({
                        vendor: VAR_LIFNR
                    });
                if (mbe) {
                    SAP_PO = '';
                    LOG.info('3.1.4.2 → mapping found → SAP_PO=""');
                } else {
                    LOG.info('3.1.4.2 → no mapping → SAP_PO=2');
                }
            }

            // 3.1.4.3 ZM override
            LOG.info('3.1.4.3: checking CustomerPriceGroup=ZM override');
            const biz = await this.soAPI.executeQuery(
                SELECT.one.from('A_SalesOrder')
                    .columns(['CustomerPriceGroup'])
                    .where({
                        SalesOrder: VAR_VBELN_SO,
                        PriceGroup: 'ZM'
                    })
            );
            if (biz) {
                SAP_PO = '';
                LOG.info('3.1.4.3 → ZM override → SAP_PO=""');
            }
            LOG.info(`3.1.4 → final SAP_PO='${SAP_PO}'`);

            // 3.1.5 Get sold-to party & order reason
            LOG.info('3.1.5: pulling sold-to party & order reason');
            const {
                SoldToParty: VAR_CUSTOMER,
                SDDocumentReason: VAR_ORD_REASON,
                LastChangeDateTime: VAR_CUST_CONTACT_DATE,
                SalesOrganization: VAR_SORG,
                AdditionalCustomerGroup2: VAR_CUST_GRP_2
            } = hdr;
            LOG.info(`3.1.5 → SoldTo='${VAR_CUSTOMER}', Reason='${VAR_ORD_REASON}', ContactDate='${VAR_CUST_CONTACT_DATE}'`);

            // 3.1.6 Get bill-to party
            LOG.info('3.1.6: fetching partner RE');
            const partRE = await this.soAPI.executeQuery(
                SELECT.one.from('A_SalesOrderHeaderPartner')
                    .columns(['Customer'])
                    .where({
                        SalesOrder: VAR_VBELN_SO,
                        PartnerFunction: 'RE'
                    })
            );
            const VAR_BILLTO = partRE?.Customer || '';
            LOG.info(`3.1.6 → VAR_BILLTO='${VAR_BILLTO}'`);

            // 3.1.7 Get ZDUM item to pull base data
            LOG.info('3.1.7: fetching ZDUM item 000010');
            const zdum = await this.soAPI.executeQuery(
                SELECT.one.from('A_SalesOrderItem')
                    .columns(['SalesOrderItem', 'Material', 'ZZ_EBELN'])
                    .where({
                        SalesOrder: VAR_VBELN_SO,
                        SalesOrderItem: '000010',
                        SalesOrderItemCategory: 'ZDUM'
                    })
            );
            if (!zdum) {
                aErrorLogs.push({
                    record_ID: rec.ID,
                    message: 'ZDUM item missing', process_code: sProcessCode
                });
                aFailedRecordIDs.push(rec.ID);
                LOG.error('3.1.7 → ZDUM missing → fail');
                continue;
            }
            const VAR_SO_ITEM0 = zdum.SalesOrderItem;
            const VAR_MAT = zdum.Material;
            const VAR_ZZ_EBELN = zdum.ZZ_EBELN;
            LOG.info(`3.1.7 → base SO_ITEM='${VAR_SO_ITEM0}', MAT='${VAR_MAT}', ZZ_EBELN='${VAR_ZZ_EBELN}'`);

            // 3.1.8 Compute next item number
            LOG.info('3.1.8: determining next SO item number');
            const top = await this.soAPI.executeQuery(
                SELECT.one.from('A_SalesOrderItem')
                    .columns(['SalesOrderItem'])
                    .where({
                        SalesOrder: VAR_VBELN_SO
                    })
                    .orderBy('SalesOrderItem desc')
            );
            let VAR_SO_ITEM = (top?.SalesOrderItem || '00000');
            VAR_SO_ITEM = String(parseInt(VAR_SO_ITEM, 10) + 10).padStart(5, '0');
            LOG.info(`3.1.8 → VAR_SO_ITEM='${VAR_SO_ITEM}'`);

            // 3.1.9 If SAP_PO=2, check PO lines
            if (SAP_PO === 2) {
                LOG.info('3.1.9: checking existing PO lines');
                const poTop = await this.PurchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrderItem')
                        .columns(['PurchaseOrderItem'])
                        .where({
                            PurchaseOrder: VAR_ZZ_EBELN
                        })
                        .orderBy('PurchaseOrderItem desc')
                );
                let VAR_PO_ITEM = (poTop?.PurchaseOrderItem || '00000');
                VAR_PO_ITEM = String(parseInt(VAR_PO_ITEM, 10) + 10).padStart(5, '0');
                if (parseInt(VAR_PO_ITEM, 10) > parseInt(VAR_SO_ITEM, 10)) {
                    VAR_SO_ITEM = VAR_PO_ITEM;
                }
                LOG.info(`3.1.9 → VAR_SO_ITEM adjusted='${VAR_SO_ITEM}'`);
            }

            // 3.1.10 Rejection logic
            let SAP_SO_REJ_IC = '';
            if (VAR_ORD_REASON && moment(rec.weekEndDate).isSameOrAfter(VAR_CUST_CONTACT_DATE)) {
                SAP_SO_REJ_IC = 'ZR';
                LOG.info('3.1.10 → rejection flag ZR');
            }

            // 3.1.11 Duplicate check
            LOG.info('3.1.11: checking duplicates');
            const dupErr = await this.checkDuplicates({
                wnInvoice: rec.wnInvoiceNo,
                salesOrder: VAR_VBELN_SO,
                auart: 'MS', // IC uses MS doc type for duplicate check
                weekEndDate: rec.weekEndDate
            });
            if (dupErr) {
                aErrorLogs.push({
                    record_ID: rec.ID,
                    message: dupErr, process_code: sProcessCode
                });
                aFailedRecordIDs.push(rec.ID);
                LOG.error(`3.1.11 → duplicate → ${dupErr}`);
                continue;
            }
            LOG.info('3.1.11 → no duplicates');

            // 3.1.12 Build and call change‐line payload
            LOG.info('3.1.12: building IC-line payload');
            const payload = {
                SalesOrder: VAR_VBELN_SO,
                SalesOrderItem: VAR_SO_ITEM,
                SalesOrderItemCategory: 'ZLAB',
                Material: VAR_MAT,
                PurchaseOrderByCustomer: SAP_PO === 2 ? '2' : '',
                SalesOrderItemText: (() => {
                    switch (rec.otherBillType) {
                        case 'ACA_SURCHARGE':
                            return 'ACA SURCHARGE';
                        case 'BEREAV_DAYS':
                            return 'BEREAVEMENT DAYS';
                        case 'BEREAV_HRS':
                            return 'BEREAVEMENT HOURS';
                        case 'DAILY_PAY':
                            return 'DAILY PAY';
                        case 'DIRECT_PLACEMENT':
                            return 'DIRECT PLACEMENT';
                        case 'HOL_DAYS':
                            return 'HOLIDAY DAYS';
                        case 'HOL_HRS':
                            return 'HOLIDAY HOURS';
                        case 'HW_HRS':
                            return 'H&W HOURS';
                        case 'JURY_DAYS':
                            return 'JURY DUTY DAYS';
                        case 'JURY_HRS':
                            return 'JURY DUTY HOURS';
                        case 'LONGEVITY_DAYS':
                            return 'LONGEVITY DAYS';
                        case 'LONGEVITY_HRS':
                            return 'LONGEVITY HOURS';
                        case 'MISC':
                            return 'MISCELLANEOUS';
                        case 'ONCALL_DAYS':
                            return 'ONCALL DAYS';
                        case 'ONCALL_HRS':
                            return 'ONCALL HOURS';
                        case 'RETRO_DAYS':
                            return 'RETRO DAYS';
                        case 'RETRO_HRS':
                            return 'RETRO HOURS';
                        case 'SEV_PAY_DAYS':
                            return 'SEVERANCE PAY DAYS';
                        case 'SEV_PAY_HRS':
                            return 'SEVERENCE PAY HOURS';
                        case 'SICK_DAYS':
                            return 'SICK DAYS';
                        case 'SICK_HOURS':
                            return 'SICK HOURS';
                        case 'SICK_LEAVE_DAYS':
                            return 'SICK LEAVE DAYS';
                        case 'SICK_LEAVE_HOURS':
                            return 'SICK LEAVE HOURS';
                        case 'VAC_BILL_DAYS':
                            return 'VACATION BILLABLE DAYS';
                        case 'VAC_BILL_HRS':
                            return 'VACATION BILLABLE HOURS';
                        default:
                            return '';
                    }
                })(),
                YY1_WNWorkOrder_SD_SDI: rec.wnWorkOrder,
                YY1_WNInvoice_SD_SDI: rec.wnInvoiceNo,
                BillBlockReason: SAP_SO_REJ_IC ? 'Z1' : undefined,
                PricingDate: `/Date(${Date.now()})/`,
                Plant: hdr.ProductionPlant || '', // if in header
                WBSElement: hdr.AUFNR || '', // if in header
                to_ScheduleLine: [{
                    SalesOrderItem: VAR_SO_ITEM,
                    RequestedDeliveryDate: `/Date(${moment(rec.weekEndDate).valueOf()})/`,
                    ScheduleLineOrderQuantity: '1.000',
                    ScheduleLineType: 'ZS'
                }]
            };
            LOG.info(`3.1.12 → payload=${JSON.stringify(payload)}`);

            // call OData change (same service interface you use for create)
            let res;
            try {
                res = await this.salesOrderAPI.changeSalesOrderItems([payload]);
                LOG.info(`3.1.12 → API response: ${JSON.stringify(res)}`);
            } catch (e) {
                aErrorLogs.push({
                    record_ID: rec.ID,
                    message: `IC line change failed: ${e.message}`, process_code: sProcessCode
                });
                aFailedRecordIDs.push(rec.ID);
                LOG.error(`3.1.12 → error on change: ${e.message}`);
                continue;
            }

            // 3.1.13 Capture returned item & mark success
            if (!res[0].hasError) {
                const created = res[0].value;
                rec.sapVbelnIc = created.SalesOrder;
                rec.sapPosnrIc = created.SalesOrderItem;
                rec.sapPo = SAP_PO.toString();
                rec.sapSoRejIc = SAP_SO_REJ_IC;
                aPassedRecordIDs.push(rec.ID);
                LOG.info(`3.1.13 → IC line created: SO=${created.SalesOrder}, Item=${created.SalesOrderItem}`);
            } else {
                aErrorLogs.push({
                    record_ID: rec.ID,
                    message: res[0].reason, process_code: sProcessCode
                });
                aFailedRecordIDs.push(rec.ID);
                LOG.error(`3.1.13 → API reported error: ${JSON.stringify(res[0].reason)}`);
            }
        }

        // ─── Step 3.2: Persist logs & back-end updates ───────────────────────────────────────────────
        LOG.info('Step 3.2: Finalizing IC process');
        if (aErrorLogs.length) {
            await ProcessLogger.addLogs(aErrorLogs);
            await UPDATE(this.recordsEntity)
                .set({
                    valid: false,
                    processLevel_code: sProcessCode
                })
                .where({
                    ID: {
                        in: aFailedRecordIDs
                    }
                });
        }

        // write back IC fields
        const updates = this.records
            .filter(r => aPassedRecordIDs.includes(r.ID))
            .map(r => ({
                ID: r.ID,
                sapVbelnIc: r.sapVbelnIc,
                sapPosnrIc: r.sapPosnrIc,
                sapPo: r.sapPo,
                sapSoRejIc: r.sapSoRejIc
            }));
        if (updates.length) {
            await Promise.all(updates.map(u =>
                UPDATE(this.recordsEntity).set(u).where({
                    ID: u.ID
                })
            ));
        }

        if (aPassedRecordIDs.length) {
            await ProcessLogger.removeLogs(aPassedRecordIDs, null, sProcessCode);
            await ProcessLogger.addLogs(aPassedRecordIDs.map((sId) => ({ record_ID: sId, message: cds.i18n.messages.at('SUCCESS_RECORD_PROCESSED', [sProcessCode]), process_code: sProcessCode, type: 3 })));
            await this.markRecordsValid(sProcessCode, aPassedRecordIDs, true);
        }
        if (aFailedRecordIDs.length) {
            await this.markRecordsValid(sProcessCode, aFailedRecordIDs, false);
        }
        this.updateExclusionSet({
            passed: aPassedRecordIDs,
            failed: aFailedRecordIDs,
            skipped: aSkippedRecords,
            bBreakExecution
        });

        LOG.info(`=== Exiting processIntercompanyso: passed=${aPassedRecordIDs.length}, failed=${aFailedRecordIDs.length}, skipped=${aSkippedRecords.length} ===`);
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

        await this._expandSelectionToGroups();
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
                            PurchaseOrderQuantityUnit: soItem.OrderQuantityUnit || 'LAB',
                            // === FIX: quantity = hours, price = vendor rate ===
                            OrderQuantity: useQty,
                            NetPriceQuantity: useQty,
                            OrderPriceUnit: soItem.OrderQuantityUnit || 'LAB',
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
                                OrderQuantityUnit: soItem.OrderQuantityUnit || 'LAB',
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
                        .set({ purchaseDocumentNoSAP: poNo })
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
                    const unitFallback = soItem.OrderQuantityUnit || rec.orderUnit || 'LAB';
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
                        .set({ purchaseDocumentNoSAP: poNo })
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

        await this._expandSelectionToGroups();

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
                        .columns(['CompanyCode', 'DocumentCurrency', 'Supplier'])
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
                    PaymentTerms: rec.paymentTerms || '0001',
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
                            PurchaseOrderQtyUnitSAPCode: item.PurchaseOrderQuantityUnit,
                            PurchaseOrderQtyUnitISOCode: '_01',
                            QuantityInPurchaseOrderUnit: item.OrderQuantity.toString(),
                            PurchaseOrderPriceUnit: item.PurchaseOrderQuantityUnit,
                            PurchaseOrderPriceUnitSAPCode: item.PurchaseOrderQuantityUnit,
                            PurchaseOrderPriceUnitISOCode: '_01',
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

}

module.exports = OtherBillables;