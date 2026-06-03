// processors/FgtimeInvoice.js

const moment = require('moment');
const cds = require('@sap/cds');
const {
    INSERT,
    SELECT,
    UPDATE
} = require('@sap/cds/lib/ql/cds-ql');
const LOG = cds.log('Monitor.Processor-FgTimeInvoice');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');
const SalesOrderComm = require('../communicators/SalesOrder');
const PurchaseOrder = require('../communicators/PurchaseOrder');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const SupplierInvoiceComm = require('../communicators/SupplierInvoice');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const EmpTimeDataComm = require('../communicators/EmpTimeData');
const SalesContractComm = require('../communicators/SalesContract');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SupplierLFA1Comm = require('../communicators/SupplierLFA1');
const {
    determineConditionType
} = require('../common/pricingHelper');

class FgtimeInvoice extends Processor {
    constructor(options) {
        super(options);
        LOG.info(`[constructor] options=${JSON.stringify(options)}`);
        this.recordsEntity = 'com.aleron.monitor.Fg_Invoices';
        this.columnsForRecords = this._getColumnsForFetch();
        this.salesOrderAPI = null;
        this.purchaseOrderAPI = null;
        this.businesPartnerAPI = null;
        this.salesOrderAPI = null;
        // this.salesOrderV2API = null;
        this.SupplierInvoice = null;
        this.salesVCData_1Api = null;
        this.salesVCData_2Api = null;
        this.salesContractAPI = null;
        this.enterpriseProjectAPI = null;
        this.supplierLFA1API = null;



    }

    _getColumnsForFetch() {
        LOG.info('[ _getColumnsForFetch ]');
        return [
            'ID', 'file_ID', 'processLevel_code', 'valid',
            'workerID', 'fgInvoiceID', 'fgInvoicetype', 'fgInvoiceLinetype',
            'invSubmissionDate', 'fgSiteCode', 'invLineAmount', 'invLineAdjAmount',
            'currency', 'firstName', 'lastName', 'businessCode',
            'costCenterCode', 'costCenterName', 'fgTaskCode', 'fgTaskName',
            'glAccount', 'stHours', 'otHours', 'dtHours',
            'customerBillRateST', 'customerBillRateOt', 'customerBillRateDt',
            'supplierPayRateST', 'supplierPayRateOT', 'supplierPayRateDT',
            'fgWorkOrderID', 'timesheetID', 'parentTimesheetID', 'fgInvoiceOrgID',
            'revision', 'timeSheetStatus', 'timeSheetStartDate', 'timeSheetEndDate',
            'timeSheetApprovedDate', 'timeSheetEntryDate', 'quantity',
            'contractNoSS', 'contractNoWN', 'orderNo', 'personnelNo', 'fgGLCustomerCode',
            'personnelNoSAP', 'salesDocumentNoSAP', 'salesItemNoSAP', 'projectNumberSAP',
            'PORequiredSAP', 'purchaseDocumentNoSAP', 'purchaseDocumentItemSAP',
            'tripRequiredSAP', 'tripNoSAP', 'salesDocumentTypeSAP', 'fiscalYearSAP',
            'invoiceDocumentNoSAP', 'salesOrderICSAP', 'salesItemNoICSAP',
            'distributionChannelSAP', 'distributionChannelICSAP',
            'salesOrderICUpdateRequired', 'employeeSubgroupSAP', 'projectNumberICSAP'
        ];
    }

    async getPurchaseOrderNextItem(poNumber) {
        if (!poNumber) {
            this.LOG.warn(`[processSalesOrder] no PO number supplied, defaulting PO‐item → 00010`);
            return '00010';
        }
        const poItems = await this.purchaseOrderAPI.executeQuery(
            SELECT.from('_PurchaseOrderItem')
                .columns(['PurchaseOrderItem'])
                .where({
                    PurchaseOrder: poNumber
                })
        );
        const maxNo = poItems && poItems.length ?
            Math.max(...poItems.map(i => parseInt(i.PurchaseOrderItem, 10))) :
            0;
        const next = String(maxNo + 10).padStart(6, '0');
        this.LOG.info(`[processSalesOrder] getPurchaseOrderNextItem('${poNumber}') → '${next}'`);
        return next;
    }

    // helper to back-patch the dummy + real SO items with the PO number
    async patchSoItems(vbeln, soItem, poNumber) {
        const items = ['00010', soItem];
        for (const itm of items) {
            await this.salesOrderAPI.executeQuery(
                UPDATE('A_SalesOrderItem')
                    .set({
                        YY1_PurchasingDoc_SD_SDI: poNumber
                    })
                    .where({
                        SalesOrder: vbeln,
                        SalesOrderItem: itm.padStart(5, '0')
                    })
            );
            LOG.info(`[Step 5] Patched SO-item ${itm} → YY1_PurchasingDoc_SD_SDI='${poNumber}'`);
        }
    }





    async prepareCommunicators() {
        LOG.info('[prepareCommunicators] starting communicator setup');

        // Sales Order communicator
        this.salesOrderAPI = new SalesOrderComm();
        this.oAPI = await this.salesOrderAPI.getConnection(); // for $expand support
        LOG.info('[prepareCommunicators] salesOrderAPI communicator ready');

        // Purchase Order communicator
        this.purchaseOrderAPI = new PurchaseOrder();
        this.poAPI = await this.purchaseOrderAPI.getConnection();
        LOG.info('[prepareCommunicators] purchaseOrderAPI communicator ready');

        // Sales VC Data communicator #1
        this.salesVCData_1Api = new SalesVCData_1Comm();
        await this.salesVCData_1Api.getConnection();
        LOG.info('[prepareCommunicators] salesVCData_1 communicator ready');

        // ADD – Supplier LFA1 communicator
        this.supplierLFA1API = new SupplierLFA1Comm();
        await this.supplierLFA1API.getConnection();
        LOG.info('[prepareCommunicators] supplierLFA1 communicator ready');


        // Sales VC Data communicator #2
        this.salesVCData_2Api = new SalesVCData_2Comm();
        await this.salesVCData_2Api.getConnection();
        LOG.info('[prepareCommunicators] salesVCData_2 communicator ready');


        // Business Partner communicator
        this.businessPartnerAPI = new BusinessPartnerComm();
        this.bpAPI = await this.businessPartnerAPI.getConnection();
        LOG.info('[prepareCommunicators] businessPartnerAPI communicator ready');

        // Supplier Invoice communicator
        this.supplierInvoiceAPI = new SupplierInvoiceComm();
        this.siAPI = await this.supplierInvoiceAPI.getConnection();
        LOG.info('[prepareCommunicators] supplierInvoiceAPI communicator ready');

        this.empTimeDataAPI = new EmpTimeDataComm();

        //  Sales Contract communicator
        this.salesContractAPI = new SalesContractComm();
        await this.salesContractAPI.getConnection();
        LOG.info('[prepareCommunicators] salesContractAPI communicator ready');

        //  Enterprise Project communicator
        this.enterpriseProjectAPI = new EnterpriseProjectComm();
        await this.enterpriseProjectAPI.getConnection();
        LOG.info('[prepareCommunicators] enterpriseProjectAPI communicator ready');
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

        // 3) next = max + 10, zero-pad to 5 digits
        const next = Math.max(soMax, poMax) + 10;
        return String(next).padStart(5, '0');
    }

    /**
     * Re-fetch the records, filter for only those at the given level,
     * log summary, and return true if there’s nothing left to do.
     */
    async _bailIfNoRecordsAt(level, stepName) {
        // re-fetch from DB
        await this._fetchRecords(this.recordIDs);

        // after: only filter on processLevel_code, ignore valid
        const todo = this.records.filter(r =>
            r.processLevel_code === level
        );
        this.LOG.info(
            `[${stepName}] re-fetched → ${this.records.length} total, ` +
            `${todo.length} at level='${level}'`
        );

        if (!todo.length) {
            this.LOG.info(`[${stepName}] no records at '${level}', skipping`);
            return true;
        }

        // narrow recordIDs so downstream steps only see these
        this.recordIDs = new Set(todo.map(r => r.ID));
        return false;
    }

    // Step 1: Validate
    async validateRecords(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;

        // —————————————————————————————
        // INITIALIZE
        // —————————————————————————————
        LOG.info(`[validateRecords] ENTRY (processCode=${sProcessCode}, breakExecution=${bBreakExecution})`);
        const errorLogs = [];
        const failed = [];
        const passed = [];
        const skipped = [];
        const validRecs = [];
        const toGroup = [];

        // —————————————————————————————
        // STEP 0: InterfaceSteps & CLEAR LOGS
        // —————————————————————————————
        if (!['0', '1'].includes(sProcessCode)) {
            LOG.info(`[validateRecords] SKIPPING because processCode not in [0,1]`);
            return {
                hasError: false,
                continue: true
            };
        }

        LOG.info(`STEP 0.1: Checking InterfaceSteps`);
        if (!bBreakExecution) {
            const {
                InterfaceSteps
            } = cds.entities('com.aleron.monitor');
            const steps = await SELECT.from(InterfaceSteps)
                .columns('process_code')
                .where({
                    interfaceType_ID: this.file.interfaceType_ID
                });
            if (!steps.length) {
                const msg = 'Interface Steps are not defined';
                LOG.error(`STEP 0.1 FAILED → ${msg}`);
                await ProcessLogger.addLogs([{
                    record_ID: this.file.ID,
                    message: msg
                }]);
                return {
                    hasError: true,
                    continue: false
                };
            }
            LOG.info(`STEP 0.1 PASSED`);
        }

        LOG.info(`STEP 0.2: Clearing any existing logs for this batch`);
        await ProcessLogger.removeLogs([...this.recordIDs]);
        LOG.info(`STEP 0.2 DONE`);

        // —————————————————————————————
        // STEP 1: FETCH & FILTER
        // —————————————————————————————
        // LOG.info(`STEP 1: Selecting records where processLevel in ['0','1'] AND valid`);
        // await this._fetchRecords(this.recordIDs);

        // // filter down to only the ones we want to validate right now
        // const recordsToProcess = this.records.filter(r => ['0', '1'].includes(r.processLevel_code) && r.valid);

        LOG.info(`STEP 1: Selecting records where processLevel in ['0','1'] AND valid`);
        await this._fetchRecords(this.recordIDs);

        // >>> keep group intact for single-line "Process"
        // expand selection to include ALL siblings for EACH selected group's tuple
        if (this.recordIDs && this.recordIDs.size) {
            // collect seed rows for current selection
            const seeds = [];
            for (const id of this.recordIDs) {
                const r = this.records.find(x => x.ID === id);
                if (r) seeds.push(r);
            }

            // dedupe by group key (file_ID, fgInvoiceID, workerID, timesheetID)
            const seenKeys = new Set();
            const uniqSeeds = [];
            for (const s of seeds) {
                const k =
                    String(s.file_ID ?? '∅') + '|' +
                    String(s.fgInvoiceID ?? '∅') + '|' +
                    String(s.workerID ?? '∅') + '|' +
                    String(s.timesheetID ?? '∅');
                if (!seenKeys.has(k)) {
                    seenKeys.add(k);
                    uniqSeeds.push(s);
                }
            }

            if (uniqSeeds.length) {
                // build a CQN WHERE expression:  (A and B and C and D) OR (A2 and B2 and C2 and D2) ...
                const orConds = [];
                for (const s of uniqSeeds) {
                    const c = [];
                    // file_ID
                    c.push({ ref: ['file_ID'] });
                    if (s.file_ID == null) { c.push('is', 'null'); } else { c.push('=', { val: s.file_ID }); }
                    c.push('and');
                    // fgInvoiceID
                    c.push({ ref: ['fgInvoiceID'] });
                    if (s.fgInvoiceID == null) { c.push('is', 'null'); } else { c.push('=', { val: s.fgInvoiceID }); }
                    c.push('and');
                    // workerID
                    c.push({ ref: ['workerID'] });
                    if (s.workerID == null) { c.push('is', 'null'); } else { c.push('=', { val: s.workerID }); }
                    c.push('and');
                    // timesheetID
                    c.push({ ref: ['timesheetID'] });
                    if (s.timesheetID == null) { c.push('is', 'null'); } else { c.push('=', { val: s.timesheetID }); }

                    // wrap each group's AND block in parens
                    orConds.push(['(', ...c, ')']);
                }

                // stitch the OR chain together
                let whereExpr = orConds[0];
                for (let i = 1; i < orConds.length; i++) {
                    whereExpr = [...whereExpr, 'or', ...orConds[i]];
                }

                // fetch ALL sibling IDs across all selected groups
                const siblings = await SELECT.from(this.recordsEntity)
                    .columns(['ID'])
                    .where(whereExpr);

                const extra = siblings
                    .map(s => s.ID)
                    .filter(id => !this.recordIDs.has(id));

                if (extra.length) {
                    for (const id of extra) this.recordIDs.add(id);
                    await this._fetchRecords(this.recordIDs);
                    LOG.info(`[validateRecords] expanded selection to ${this.recordIDs.size} grouped rows`);
                }
            }
        }
        // <<< keep group intact

        // filter down to only the ones we want to validate right now
        const recordsToProcess = this.records.filter(r => ['0', '1'].includes(r.processLevel_code));


        const idsToProcess = recordsToProcess.map(r => r.ID);

        // mark the rest as skipped
        this.records
            .filter(r => !idsToProcess.includes(r.ID))
            .forEach(r => {
                skipped.push(r.ID);
            });

        LOG.info(`STEP 1: Removing old logs for IDs=[${idsToProcess.join(',')}]`);
        await ProcessLogger.removeLogs(idsToProcess);
        this.updateProcessingState(sProcessCode);

        if (!recordsToProcess.length) {
            LOG.info(`STEP 1: No records to process → EXIT`);
            return {
                hasError: false,
                continue: true
            };
        }
        LOG.info(`STEP 1: ${recordsToProcess.length} records WILL be processed`);

        // ── Step A: Mandatory checks ───────────────────────────────────────────────────────
        for (const rec of recordsToProcess) {
            LOG.info(`--- ENTER Record ${rec.ID} → Step A (mandatory checks) ---`);
            let hasErr = false;

            for (const {
                cond,
                msg
            }
                of [{
                    cond: !rec.fgInvoiceID,
                    msg: 'FG Invoice ID is blank'
                },
                {
                    cond: !rec.workerID,
                    msg: 'Worker ID is blank'
                },
                {
                    cond: !rec.contractNoSS && !rec.contractNoWN,
                    msg: 'SS & WN contract numbers are blank'
                },
                {
                    cond: rec.contractNoSS && rec.contractNoWN,
                    msg: 'Both SS & WN contract numbers provided'
                },
                {
                    cond: !rec.costCenterCode,
                    msg: 'Cost Center is blank'
                },
                {
                    cond: !rec.timeSheetStartDate,
                    msg: 'Timesheet Start Date is blank'
                },
                {
                    cond: !rec.timeSheetEndDate,
                    msg: 'Timesheet End Date is blank'
                },
                {
                    cond: rec.contractNoSS && !rec.personnelNoSAP,
                    msg: 'SAP Employee No missing for SS'
                }
                ]) {
                if (cond) {
                    LOG.error(`Record ${rec.ID} → Step A FAILED: ${msg}`);
                    errorLogs.push({
                        record_ID: rec.ID,
                        message: msg
                    });
                    failed.push(rec.ID);
                    hasErr = true;
                }
            }

            if (!hasErr) {
                LOG.info(`Record ${rec.ID} → Step A PASSED`);
                validRecs.push(rec);
            }
        }

        if (errorLogs.length) {
            LOG.info(`[validateRecords] ${errorLogs.length} errors in Step A, aborting`);
            await ProcessLogger.addLogs(errorLogs);
            await this.markRecordsValid('1', failed, false);
            return {
                hasError: true,
                continue: false
            };
        }

        // ── Group by FG_INV_ID / WORKORDER_ID / TIMESHEET_ID ────────────────────────────────
        LOG.info(`[validateRecords] grouping ${validRecs.length} valid records`);
        const groups = validRecs.reduce((acc, rec) => {
            const key = `${rec.fgInvoiceID}||${rec.workerID}||${rec.timesheetID}`;
            (acc[key] = acc[key] || []).push(rec);
            return acc;
        }, {});

        LOG.info(`[validateRecords] created ${Object.keys(groups).length} groups`);


        // ── Step B / C / D / E per group ────────────────────────────────────────────────────
        for (const [key, group] of Object.entries(groups)) {
            LOG.info(`>>> ENTER Group ${key}`);
            const rec = group[0]; // primary “lead” record

            // — WN_CONTRACT branch —
            if (rec.contractNoWN) {
                // B1: header
                LOG.info(`Group ${key} → ENTER Step B1: ZWMS header for AssignmentReference='${rec.fgWorkOrderID}'`);
                const soHdr = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns(['SalesOrder', 'DistributionChannel'])
                        .where({
                            YY1_CustomSalesOrder_SDH: 'ZWMS',
                            AssignmentReference: rec.fgWorkOrderID
                        })
                );
                LOG.info(`Group ${key} → B1 returned ${soHdr.length} row(s): ${JSON.stringify(soHdr)}`);
                if (!soHdr.length) {
                    const msg = `No ZWMS order for worker ${rec.fgWorkOrderID}`;
                    LOG.error(`Group ${key} → B1 FAILED: ${msg}`);
                    group.forEach(r => {
                        errorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        failed.push(r.ID);
                    });
                    LOG.info(`Group ${key} → EXIT (FAIL)`);
                    continue;
                }
                rec.salesDocumentNoSAP = soHdr[0].SalesOrder;
                rec.distributionChannelSAP = soHdr[0].DistributionChannel;
                LOG.info(`Group ${key} → Step B1 PASSED: salesDocumentNoSAP='${rec.salesDocumentNoSAP}', distributionChannelSAP='${rec.distributionChannelSAP}'`);
                LOG.info(`Group ${key} → EXIT Step B1`);

                // B2: item
                LOG.info(`Group ${key} → ENTER Step B2: ZWMS item 00010`);
                const soItems = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem', 'YY1_EEGroup_SD_SDI'])
                        .where({
                            SalesOrder: rec.salesDocumentNoSAP,
                            SalesOrderItem: '00010'
                        })
                );
                LOG.info(`Group ${key} → B2 returned ${soItems.length} row(s): ${JSON.stringify(soItems)}`);
                if (!soItems.length) {
                    const msg = `No item 00010 on SalesOrder ${rec.salesDocumentNoSAP}`;
                    LOG.error(`Group ${key} → B2 FAILED: ${msg}`);
                    group.forEach(r => {
                        errorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        failed.push(r.ID);
                    });
                    LOG.info(`Group ${key} → EXIT (FAIL)`);
                    continue;
                }
                rec.salesItemNoSAP = soItems[0].SalesOrderItem;
                rec.employeeSubgroupSAP = soItems[0].YY1_EEGroup_SD_SDI;
                LOG.info(`Group ${key} → Step B2 PASSED: salesItemNoSAP='${rec.salesItemNoSAP}', employeeSubgroupSAP='${rec.employeeSubgroupSAP}'`);
                LOG.info(`Group ${key} → EXIT Step B2`);

                // — Propagate to all in the group & persist —
                for (const r of group) {
                    r.salesDocumentNoSAP = rec.salesDocumentNoSAP;
                    r.distributionChannelSAP = rec.distributionChannelSAP;
                    r.salesItemNoSAP = rec.salesItemNoSAP;
                    r.employeeSubgroupSAP = rec.employeeSubgroupSAP;
                }
                const payloadB2 = {
                    salesDocumentNoSAP: rec.salesDocumentNoSAP,
                    distributionChannelSAP: rec.distributionChannelSAP,
                    salesItemNoSAP: rec.salesItemNoSAP,
                    employeeSubgroupSAP: rec.employeeSubgroupSAP
                };
                LOG.info(`Group ${key} → PERSIST WN-B2 for ${group.length} record(s): ${JSON.stringify(payloadB2)}`);
                await UPDATE(this.recordsEntity)
                    .set(payloadB2)
                    .where({
                        ID: group.map(r => r.ID)
                    });

                // B3: IC fallback (only if VTWEG==='IC')
                if (rec.distributionChannelSAP === 'IC') {
                    LOG.info(`Group ${key} → ENTER Step B3: IC fallback (ZWCP header)`);
                    const fbHdr = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrder')
                            .columns(['SalesOrder', 'DistributionChannel'])
                            .where({
                                YY1_CustomSalesOrder_SDH: 'ZWCP',
                                AssignmentReference: rec.fgWorkOrderID
                            })
                    );
                    LOG.info(`Group ${key} → B3 returned ${fbHdr.length} row(s): ${JSON.stringify(fbHdr)}`);
                    if (fbHdr.length !== 1) {
                        const msg = `Expected one ZWCP order for ${rec.workerID}`;
                        LOG.error(`Group ${key} → B3 FAILED: ${msg}`);
                        group.forEach(r => {
                            errorLogs.push({
                                record_ID: r.ID,
                                message: msg
                            });
                            failed.push(r.ID);
                        });
                        LOG.info(`Group ${key} → EXIT (FAIL)`);
                        continue;
                    }
                    rec.salesOrderICSAP = fbHdr[0].SalesOrder;
                    rec.distributionChannelICSAP = fbHdr[0].DistributionChannel;
                    LOG.info(`Group ${key} → Step B3 PASSED: salesOrderICSAP='${rec.salesOrderICSAP}', distributionChannelICSAP='${rec.distributionChannelICSAP}'`);
                    LOG.info(`Group ${key} → EXIT Step B3`);

                    // B3b: IC item
                    LOG.info(`Group ${key} → ENTER Step B3b: ZWCP item 00010`);
                    const icItems = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderItem')
                            .columns(['SalesOrderItem', 'YY1_EEGroup_SD_SDI'])
                            .where({
                                SalesOrder: rec.salesOrderICSAP,
                                SalesOrderItem: '00010'
                            })
                    );
                    rec.salesItemNoICSAP = icItems[0].SalesOrderItem;
                    rec.employeeSubgroupSAP = icItems[0].YY1_EEGroup_SD_SDI;
                    LOG.info(`Group ${key} → Step B3b PASSED: salesItemNoICSAP='${rec.salesItemNoICSAP}', employeeSubgroupSAP='${rec.employeeSubgroupSAP}'`);
                    LOG.info(`Group ${key} → EXIT Step B3b`);

                    // B4: Z3 partner → PERNR
                    LOG.info(`Group ${key} → ENTER Step B4: query partner Z3`);
                    const z3 = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderHeaderPartner')
                            .columns(['Personnel'])
                            .where({
                                SalesOrder: rec.salesOrderICSAP,
                                PartnerFunction: 'Z3'
                            })
                    );
                    if (!z3.length) {
                        const msg = `CP/CR WO not loaded for ${rec.workerID}`;
                        LOG.error(`Group ${key} → B4 FAILED: ${msg}`);
                        group.forEach(r => {
                            errorLogs.push({
                                record_ID: r.ID,
                                message: msg
                            });
                            failed.push(r.ID);
                        });
                        LOG.info(`Group ${key} → EXIT (FAIL)`);
                        continue;
                    }
                    rec.personnelNoSAP = z3[0].Personnel;
                    rec.salesOrderICUpdateRequired = true;
                    LOG.info(`Group ${key} → Step B4 PASSED: personnelNoSAP='${rec.personnelNoSAP}'`);
                    LOG.info(`Group ${key} → EXIT Step B4`);

                    // B5: persist IC fields
                    for (const r of group) {
                        r.salesOrderICSAP = rec.salesOrderICSAP;
                        r.distributionChannelICSAP = rec.distributionChannelICSAP;
                        r.salesItemNoICSAP = rec.salesItemNoICSAP;
                        r.personnelNoSAP = rec.personnelNoSAP;
                        r.salesOrderICUpdateRequired = true;
                    }
                    const payloadB5 = {
                        salesOrderICSAP: rec.salesOrderICSAP,
                        distributionChannelICSAP: rec.distributionChannelICSAP,
                        salesItemNoICSAP: rec.salesItemNoICSAP,
                        personnelNoSAP: rec.personnelNoSAP,
                        salesOrderICUpdateRequired: true
                    };
                    LOG.info(`Group ${key} → PERSIST IC-B5 for ${group.length} record(s): ${JSON.stringify(payloadB5)}`);
                    await UPDATE(this.recordsEntity)
                        .set(payloadB5)
                        .where({
                            ID: group.map(r => r.ID)
                        });
                }
            }
            // — SS_CONTRACT branch —
            else {
                LOG.info(`Group ${key} → ENTER SS branch (Step C1): ZWCP header`);
                const soHdr = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrder')
                        .columns(['SalesOrder', 'DistributionChannel'])
                        .where({
                            YY1_CustomSalesOrder_SDH: 'ZWCP',
                            AssignmentReference: rec.fgWorkOrderID
                        })
                );
                LOG.info(`Group ${key} → C1 returned ${soHdr.length} row(s): ${JSON.stringify(soHdr)}`);
                if (!soHdr.length) {
                    const msg = `WORKORDER ID not loaded into SAP.`;
                    LOG.error(`Group ${key} → C1 FAILED: ${msg}`);
                    group.forEach(r => {
                        errorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        failed.push(r.ID);
                    });
                    LOG.info(`Group ${key} → EXIT (FAIL)`);
                    continue;
                }
                rec.salesDocumentNoSAP = soHdr[0].SalesOrder;
                rec.distributionChannelSAP = soHdr[0].DistributionChannel;
                LOG.info(`Group ${key} → Step C1 PASSED: salesDocumentNoSAP='${rec.salesDocumentNoSAP}', distributionChannelSAP='${rec.distributionChannelSAP}'`);
                LOG.info(`Group ${key} → EXIT Step C1`);

                // C2: item
                LOG.info(`Group ${key} → ENTER Step C2: ZWCP item 00010`);
                const soItems = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem', 'YY1_EEGroup_SD_SDI'])
                        .where({
                            SalesOrder: rec.salesDocumentNoSAP,
                            SalesOrderItem: '00010'
                        })
                );
                LOG.info(`Group ${key} → C2 returned ${soItems.length} row(s): ${JSON.stringify(soItems)}`);
                if (!soItems.length) {
                    const msg = `No item 00010 on SalesOrder ${rec.salesDocumentNoSAP}`;
                    LOG.error(`Group ${key} → C2 FAILED: ${msg}`);
                    group.forEach(r => {
                        errorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        failed.push(r.ID);
                    });
                    LOG.info(`Group ${key} → EXIT (FAIL)`);
                    continue;
                }
                rec.salesItemNoSAP = soItems[0].SalesOrderItem;
                rec.employeeSubgroupSAP = soItems[0].YY1_EEGroup_SD_SDI;
                LOG.info(`Group ${key} → Step C2 PASSED: salesItemNoSAP='${rec.salesItemNoSAP}', employeeSubgroupSAP='${rec.employeeSubgroupSAP}'`);
                LOG.info(`Group ${key} → EXIT Step C2`);

                // C3: Z3 partner
                LOG.info(`Group ${key} → ENTER Step C3: query partner Z3`);
                const z3 = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderHeaderPartner')
                        .columns(['Personnel'])
                        .where({
                            SalesOrder: rec.salesDocumentNoSAP,
                            PartnerFunction: 'Z3'
                        })
                );
                LOG.info(`Group ${key} → C3 returned ${z3.length} row(s): ${JSON.stringify(z3)}`);
                if (!z3.length) {
                    const msg = `Partner Z3 missing for SalesOrder ${rec.salesDocumentNoSAP}`;
                    LOG.error(`Group ${key} → C3 FAILED: ${msg}`);
                    group.forEach(r => {
                        errorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        failed.push(r.ID);
                    });
                    LOG.info(`Group ${key} → EXIT (FAIL)`);
                    continue;
                }
                rec.personnelNoSAP = z3[0].Personnel;
                LOG.info(`Group ${key} → Step C3 PASSED: personnelNoSAP='${rec.personnelNoSAP}'`);
                LOG.info(`Group ${key} → EXIT Step C3`);

                // C4: persist SS fields
                for (const r of group) {
                    r.salesDocumentNoSAP = rec.salesDocumentNoSAP;
                    r.distributionChannelSAP = rec.distributionChannelSAP;
                    r.salesItemNoSAP = rec.salesItemNoSAP;
                    r.employeeSubgroupSAP = rec.employeeSubgroupSAP;
                    r.personnelNoSAP = rec.personnelNoSAP;
                }
                const payloadC4 = {
                    salesDocumentNoSAP: rec.salesDocumentNoSAP,
                    distributionChannelSAP: rec.distributionChannelSAP,
                    salesItemNoSAP: rec.salesItemNoSAP,
                    employeeSubgroupSAP: rec.employeeSubgroupSAP,
                    personnelNoSAP: rec.personnelNoSAP
                };
                LOG.info(`Group ${key} → PERSIST SS-C4 for ${group.length} record(s): ${JSON.stringify(payloadC4)}`);
                await UPDATE(this.recordsEntity)
                    .set(payloadC4)
                    .where({
                        ID: group.map(r => r.ID)
                    });
            }

            // ── Step D & E: Duplicate check & finalize ────────────────────────────────────────
            for (const r of group) {
                // D: duplicate check
                LOG.info(`Record ${r.ID} → ENTER Step D: duplicate check on SalesOrder='${r.salesDocumentNoSAP}'`);
                const its = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem', 'YY1_WNInvoice_SD_SDI'])
                        .where({
                            SalesOrder: r.salesDocumentNoSAP
                        })
                );
                LOG.info(`Record ${r.ID} → D returned ${its.length} row(s): ${JSON.stringify(its)}`);
                const dup = its.find(i => i.YY1_WNInvoice_SD_SDI === r.fgInvoiceID);
                if (dup) {
                    const msg = `Duplicate FG Invoice in item ${dup.SalesOrderItem}`;
                    LOG.error(`Record ${r.ID} → D FAILED: ${msg}`);
                    errorLogs.push({
                        record_ID: r.ID,
                        message: msg
                    });
                    failed.push(r.ID);
                    LOG.info(`Record ${r.ID} → EXIT Step D (FAIL)`);
                    continue;
                }
                LOG.info(`Record ${r.ID} → Step D PASSED`);
                LOG.info(`Record ${r.ID} → EXIT Step D`);

                // E: finalize
                LOG.info(`Record ${r.ID} → ENTER Step E: finalizing DB update`);
                const updateE = {
                    duplicate: ' ',
                    status: 'ready to process',
                    processLevel_code: 'T',
                    salesOrderICUpdateRequired: r.salesOrderICUpdateRequired
                };
                LOG.info(`Record ${r.ID} → E: calling UPDATE with ${JSON.stringify(updateE)}`);
                await UPDATE(this.recordsEntity)
                    .set(updateE)
                    .where({
                        ID: r.ID
                    });
                LOG.info(`Record ${r.ID} → Step E END: DB updated`);
                passed.push(r.ID);
                toGroup.push(r);
                LOG.info(`Record ${r.ID} → EXIT Step E`);
            }

            LOG.info(`Group ${key} → END processing; passedRecords=${group.filter(r => passed.includes(r.ID)).length}`);
            LOG.info(`<<< EXIT Group ${key}`);
        }

        // —————————————————————————————
        // STEP 3: Persist results & update flags
        // —————————————————————————————
        if (errorLogs.length) {
            LOG.info(`STEP 3: writing ${errorLogs.length} error log(s)`);
            await ProcessLogger.removeLogs([...new Set(errorLogs.map(e => e.record_ID))]);
            await ProcessLogger.addLogs(errorLogs);
            await this.markRecordsValid('1', failed, false);
        }

        if (passed.length) {
            LOG.info(`STEP 3: marking ${passed.length} record(s) valid → moving to 'T'`);
            await ProcessLogger.removeLogs(passed);
            await this.markRecordsValid('T', passed, true);
        }

        // hand‑off the ones that passed into the next step
        this.recordIDs = new Set(passed);
        LOG.info(`[validateRecords] END: ${passed.length} records ready for T → [${[...this.recordIDs]}]`);

        return {
            hasError: failed.length > 0,
            continue: failed.length === 0
        };
    }

    // Step T: Push hours into S/4 via EmpTimeData API, with IC/CP/CR filter 
    async processTime(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        LOG.info(`[processTime] ► START (code=${sProcessCode}, breakExecution=${bBreakExecution}, recordIDs=[${[...this.recordIDs]}])`);

        // T.1) only run on “T”
        if (sProcessCode !== 'T') {
            LOG.info('[processTime] SKIP – processCode != T');
            return {
                hasError: false,
                continue: true
            };
        }

        // T.2) clear previous logs
        const allIds = [...this.recordIDs];
        await ProcessLogger.removeLogs(allIds);
        LOG.info(`T.2: Cleared existing logs for records [${allIds}]`);

        // T.3) re-fetch latest flags
        // await this._fetchRecords(this.recordIDs);
        // LOG.info(`T.3: Re-fetched ${this.records.length} records`);

        // // T.4) filter by level=T & valid
        // const candidates = this.records.filter(r => r.processLevel_code === 'T' && r.valid);

        // T.3) re-fetch latest flags
        // BEFORE
        await this._fetchRecords(this.recordIDs);

        // >>> keep group intact (file_ID, fgInvoiceID, fgWorkOrderID, timesheetID)
        if (this.recordIDs && this.recordIDs.size) {
            const seeds = [];
            for (const id of this.recordIDs) {
                const r = this.records.find(x => x.ID === id);
                if (r) seeds.push(r);
            }
            const seenKeys = new Set(), uniqSeeds = [];
            for (const s of seeds) {
                const k = String(s.file_ID ?? '∅') + '|' + String(s.fgInvoiceID ?? '∅') + '|' + String(s.fgWorkOrderID ?? '∅') + '|' + String(s.timesheetID ?? '∅');
                if (!seenKeys.has(k)) { seenKeys.add(k); uniqSeeds.push(s); }
            }
            if (uniqSeeds.length) {
                const orConds = [];
                for (const s of uniqSeeds) {
                    const c = [];
                    c.push({ ref: ['file_ID'] }); (s.file_ID == null) ? c.push('is', 'null') : c.push('=', { val: s.file_ID }); c.push('and');
                    c.push({ ref: ['fgInvoiceID'] }); (s.fgInvoiceID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgInvoiceID }); c.push('and');
                    c.push({ ref: ['fgWorkOrderID'] }); (s.fgWorkOrderID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgWorkOrderID }); c.push('and');
                    c.push({ ref: ['timesheetID'] }); (s.timesheetID == null) ? c.push('is', 'null') : c.push('=', { val: s.timesheetID });
                    orConds.push(['(', ...c, ')']);
                }
                let whereExpr = orConds[0];
                for (let i = 1; i < orConds.length; i++) whereExpr = [...whereExpr, 'or', ...orConds[i]];
                const siblings = await SELECT.from(this.recordsEntity).columns(['ID']).where(whereExpr);
                const extra = siblings.map(s => s.ID).filter(id => !this.recordIDs.has(id));
                if (extra.length) {
                    for (const id of extra) this.recordIDs.add(id);
                    await this._fetchRecords(this.recordIDs);
                    LOG.info(`[processTime] expanded selection to ${this.recordIDs.size} grouped rows`);
                }
            }
        }
        // <<< keep group intact

        // AFTER
        const candidates = this.records.filter(r => r.processLevel_code === 'T' && r.valid);


        const skipped = this.records
            .filter(r => !(r.processLevel_code === 'T' && r.valid))
            .map(r => r.ID);
        LOG.info(`T.4: ${candidates.length} to process, ${skipped.length} skipped`);

        // T.4.1) Split on distributionChannelSAP
        const allowed = ['IC', 'CP', 'CR'];
        const toProcess = candidates.filter(r => allowed.includes(r.distributionChannelSAP));
        const toSkip = candidates.filter(r => !allowed.includes(r.distributionChannelSAP));
        LOG.info(`T.4.1: toProcess=${toProcess.length}, toSkip=${toSkip.length}`);

        // T.4.2) auto‑promote toSkip to level 3
        if (toSkip.length) {
            const skipIds = toSkip.map(r => r.ID);
            LOG.info(`T.4.2: promoting ${skipIds.length} non‑IC/CP/CR to level '3'`);
            await this.markRecordsValid('T', skipIds, true);
            await UPDATE(this.recordsEntity)
                .set({
                    processLevel_code: '3'
                })
                .where({
                    ID: skipIds
                });

            this.updateExclusionSet({
                passed: skipIds,
                failed: [],
                skipped: [],
                bBreakExecution: false
            });
            this.recordIDs = new Set(skipIds);
        }

        // T.5) nothing left to process?
        if (!toProcess.length) {
            LOG.info('T.5: No IC/CP/CR records → EXIT');
            return {
                hasError: false,
                continue: true
            };
        }

        // T.6) fetch contract & project data
        LOG.info('T.6: Fetching SalesContract & Project info');
        const contractIDs = [...new Set(toProcess.map(r => r.contractNoSS || r.contractNoWN).filter(Boolean))];
        const empIDs = [...new Set(toProcess.map(r => r.personnelNoSAP).filter(Boolean))];

        const mSales = new Map();
        const mProjects = new Map();
        try {
            const [salesRes, projRes] = await Promise.allSettled([
                this.salesContractAPI.executeQuery(
                    SELECT.from('SalesContract')
                        .columns(['SalesContract', 'SalesOffice', 'SalesOrganization'])
                        .where({
                            SalesContract: {
                                in: contractIDs
                            }
                        })
                ),
                this.enterpriseProjectAPI.executeQuery(
                    SELECT.from('A_EnterpriseProject')
                        .columns(['YY1_Employee_PPH', 'Project'])
                        .where({
                            YY1_Employee_PPH: {
                                in: empIDs
                            }
                        })
                )
            ]);
            if (!salesRes.reason) salesRes.value.forEach(c => mSales.set(c.SalesContract, c));
            if (!projRes.reason) projRes.value.forEach(p => mProjects.set(p.YY1_Employee_PPH, p));
            LOG.info(`T.6: Loaded ${mSales.size} contracts, ${mProjects.size} projects`);
        } catch (e) {
            LOG.error(`T.6 FAILED → ${e.message}`);
        }

        // T.7) build payloads
        LOG.info('T.7: Building time-entry payloads');
        const payloads = [];
        const records = [];
        for (const rec of toProcess) {
            const ctr = mSales.get(rec.contractNoSS || rec.contractNoWN);
            const proj = mProjects.get(rec.personnelNoSAP);
            if (!ctr || !proj) {
                LOG.warn(`T.7: Missing data for ${rec.ID}, skipping`);
                continue;
            }
            const total = (+rec.stHours || 0) + (+rec.otHours || 0) + (+rec.dtHours || 0);
            payloads.push({
                WORKER_ID: rec.personnelNoSAP,
                Subtype: "1001",
                Type: "1001",
                START_DATE: moment(rec.timeSheetEntryDate, ['YYYY-MM-DD', 'MM/DD/YYYY']).format('YYYY-MM-DD'),
                END_DATE: moment(rec.timeSheetEndDate || rec.timeSheetEntryDate, ['YYYY-MM-DD', 'MM/DD/YYYY']).format('YYYY-MM-DD'),
                PAYROLL_HOURS: total.toString(),
                CAL_DAYS: "0.00",
                ATT_HOURS: total.toString(),
                PremiumIndicator: "0000",
                Logicalsystemfordocumentpers: "S4H",
                StartofBreak: "PT00H00M00S",
                EndofBreak: "PT00H00M00S",
                PaidBreakPeriod: "0.00",
                UnpaidBreakPeriod: "0.00",
                StartofBreak2: "PT00H00M00S",
                EndofBreak2: "PT00H00M00S",
                PaidBreakPeriod2: "0.00",
                UnpaidBreakPeriod2: "0.00",
                CompanyCode: ctr.SalesOrganization,
                BusinessArea: ctr.SalesOffice,
                ControllingArea: "A000",
                WBSElement: rec.orderNo,
                NumberofHoursforActivityAllo: total.toString()
            });
            records.push(rec);
        }
        LOG.info(`T.7: Prepared ${payloads.length} payload(s)`);

        // T.8) insert into YY1_TIME_INFO
        LOG.info('T.8: Inserting into YY1_TIME_INFO');
        const errorLogs = [];
        const failed = [];
        const passed = [];

        for (let i = 0; i < payloads.length; i++) {
            const rec = records[i];
            const entry = payloads[i];
            try {
                const res = await this.empTimeDataAPI.executeQuery(
                    INSERT.into('YY1_TIME_INFO').entries(entry)
                );
                if (res.SAP_UUID) {
                    passed.push(rec.ID);
                    LOG.info(`    ← ${rec.ID} → SAP_UUID=${res.SAP_UUID}`);
                } else {
                    const msg = res.message || 'Unknown error';
                    errorLogs.push({
                        record_ID: rec.ID,
                        message: msg
                    });
                    failed.push(rec.ID);
                }
            } catch (e) {
                errorLogs.push({
                    record_ID: rec.ID,
                    message: e.message
                });
                failed.push(rec.ID);
            }
        }

        // T.9) write logs & update valid flags
        LOG.info(`T.9: Writing ${errorLogs.length} error log(s)`);
        if (errorLogs.length) {
            await ProcessLogger.addLogs(errorLogs);
            await this.markRecordsValid('T', failed, false);
        }
        if (passed.length) {
            await ProcessLogger.removeLogs(passed);
            // promote passed to next step 'G'
            await this.markRecordsValid('G', passed, true);
            await UPDATE(this.recordsEntity)
                .set({
                    processLevel_code: 'G'
                })
                .where({
                    ID: passed
                });
        }

        // T.10) final exclusion set & hand‑off
        this.updateExclusionSet({
            passed,
            failed,
            skipped: [],
            bBreakExecution
        });
        this.recordIDs = new Set(passed);

        LOG.info(`[processTime] ◄ END (passed=${passed.length}, failed=${failed.length})`);
        return {
            hasError: failed.length > 0,
            continue: failed.length === 0
        };
    }

    async processSalesOrder(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        LOG.info(`[processSalesOrder] ENTRY processSalesOrder (code=${sProcessCode}, break=${bBreakExecution})`);
        // this.updateProcessingState(sProcessCode);

        const toODataDate = d => {
            if (!d) {
                throw new Error(`Date is missing or undefined`);
            }

            // 1) Try Moment without strict parsing
            let m = require('moment')(d);

            // 2) If that fails, try Date.parse()
            if (!m.isValid()) {
                const ts = Date.parse(d);
                if (isNaN(ts)) {
                    throw new Error(`Invalid date format: ${d}`);
                }
                m = require('moment')(ts);
            }

            return `/Date(${m.valueOf()})/`;
        };

        const toIsoDate = d => {
            if (!d) throw new Error(`Date is missing or undefined`);
            const m = require('moment')(d, ['YYYY-MM-DD', 'YYYYMMDD', 'YYYY/MM/DD'], true);
            if (!m.isValid()) throw new Error(`Invalid date format: ${d}`);
            return m.format('YYYY-MM-DDT00:00:00');
        };

        // -------- Step 1: Validate process code --------
        if (sProcessCode !== '3') {
            LOG.info(`[processSalesOrder][Exit] Skipped: Process code not '3' (current: ${sProcessCode})`);
            return {
                hasError: false,
                continue: true
            };
        }

        // -------- Step 2: Fetch valid records for process level 3 --------
        // LOG.info(`[processSalesOrder][Step 2] Fetching records at process level 3 and valid`);
        // await this._fetchRecords(this.recordIDs);
        // const recs = this.records.filter(r => r.processLevel_code === '3');

        // -------- Step 2: Fetch valid records for process level 3 --------
        LOG.info(`[processSalesOrder][Step 2] Fetching records at process level 3 and valid`);
        // BEFORE
        await this._fetchRecords(this.recordIDs);

        // >>> keep group intact (file_ID, salesDocumentNoSAP, fgInvoiceID, fgWorkOrderID, timesheetID)
        if (this.recordIDs && this.recordIDs.size) {
            const seeds = [];
            for (const id of this.recordIDs) {
                const r = this.records.find(x => x.ID === id);
                if (r) seeds.push(r);
            }
            const seenKeys = new Set(), uniqSeeds = [];
            for (const s of seeds) {
                const k = String(s.file_ID ?? '∅') + '|' + String(s.salesDocumentNoSAP ?? '∅') + '|' + String(s.fgInvoiceID ?? '∅') + '|' + String(s.fgWorkOrderID ?? '∅') + '|' + String(s.timesheetID ?? '∅');
                if (!seenKeys.has(k)) { seenKeys.add(k); uniqSeeds.push(s); }
            }
            if (uniqSeeds.length) {
                const orConds = [];
                for (const s of uniqSeeds) {
                    const c = [];
                    c.push({ ref: ['file_ID'] }); (s.file_ID == null) ? c.push('is', 'null') : c.push('=', { val: s.file_ID }); c.push('and');
                    c.push({ ref: ['salesDocumentNoSAP'] }); (s.salesDocumentNoSAP == null) ? c.push('is', 'null') : c.push('=', { val: s.salesDocumentNoSAP }); c.push('and');
                    c.push({ ref: ['fgInvoiceID'] }); (s.fgInvoiceID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgInvoiceID }); c.push('and');
                    c.push({ ref: ['fgWorkOrderID'] }); (s.fgWorkOrderID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgWorkOrderID }); c.push('and');
                    c.push({ ref: ['timesheetID'] }); (s.timesheetID == null) ? c.push('is', 'null') : c.push('=', { val: s.timesheetID });
                    orConds.push(['(', ...c, ')']);
                }
                let whereExpr = orConds[0];
                for (let i = 1; i < orConds.length; i++) whereExpr = [...whereExpr, 'or', ...orConds[i]];
                const siblings = await SELECT.from(this.recordsEntity).columns(['ID']).where(whereExpr);
                const extra = siblings.map(s => s.ID).filter(id => !this.recordIDs.has(id));
                if (extra.length) {
                    for (const id of extra) this.recordIDs.add(id);
                    await this._fetchRecords(this.recordIDs);
                    LOG.info(`[processSalesOrder] expanded selection to ${this.recordIDs.size} grouped rows`);
                }
            }
        }
        // <<< keep group intact

        // AFTER
        const recs = this.records.filter(r => r.processLevel_code === '3');

        if (!recs.length) {
            LOG.info(`[processSalesOrder][Step 2][Exit] No valid records found at level 3`);
            return {
                hasError: false,
                continue: true
            };
        }
        LOG.info(`[processSalesOrder][Step 2][Done] Fetched ${recs.length} valid records`);

        // 3.0b) Group by SO | FG_INV_ID | FG_WorkOrderID | timesheetID
        const groups = new Map();
        for (const r of recs) {
            const key = [r.salesDocumentNoSAP, r.fgInvoiceID, r.fgWorkOrderID, r.timesheetID].join('|');
            (groups.get(key) || groups.set(key, []).get(key)).push(r);
        }
        this.LOG.info(`3.0b: ${groups.size} SalesOrder group(s)`);

        // const toODataDate = d => {
        //     const m = moment(d, ['YYYY-MM-DD', 'MM/DD/YYYY'], true)
        //     if (!m.isValid()) {
        //         throw new Error(`Invalid date encountered in toODataDate(): ${d}`)
        //     }
        //     return `/Date(${m.valueOf()})/`
        // }
        //code not needed as moved to below step - initial comment
        // const getNextPOItem = async poNo => {
        //     // fetch all existing PO‐line items via our new OData GET
        //     const items = await this.purchaseOrderAPI.getPurchaseOrderItems(poNo);
        //     const maxIt = items.length ?
        //         Math.max(...items.map(i => +i.PurchasingDocumentItem)) :
        //         0;
        //     return String(maxIt + 10).padStart(6, '0');
        // };

        const errorLogs = [],
            passed = [],
            failed = [];
        let groupCounter = 1;
        for (const [key, lines] of groups.entries()) {
            const rec = lines[0],
                vbeln = rec.salesDocumentNoSAP;
            this.LOG.info(`\n--- Group ${key} (SO=${vbeln}) ---`);

            try {
                // 3.1 Header
                this.LOG.info(`3.1: fetching SalesOrder header for '${vbeln}'`);
                const hdr = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns([
                            'SalesOrganization', 'DistributionChannel', 'OrganizationDivision', 'LastChangeDateTime',
                            'SoldToParty', 'SDDocumentReason', 'AdditionalCustomerGroup2',
                            'ReferenceSDDocument'
                        ])
                        .where({
                            SalesOrder: vbeln
                        })
                );
                if (!hdr) throw new Error(`SalesOrder ${vbeln} not found`);
                this.LOG.info(`3.1 → ${JSON.stringify(hdr)}`);

                // 3.2 Dummy item 00010 & ZZPERSK
                this.LOG.info(`3.2: fetching dummy item '00010'`);
                const dummy = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns([
                            'SalesOrderItem', 'Material', 'WBSElement', 'ProfitCenter',
                            'YY1_EEGroup_SD_SDI', 'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI',
                            'YY1_StrTimeMarkup_SD_SDI', 'YY1_DoubTimeMarkup_SD_SDI',
                            'YY1_LegacyPurchase_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_CustomURL_SDI',
                            'YY1_ExtensionUUID1_SDI',

                            'YY1_DuplicateWeek_SD_SDI',
                            'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI', 'YY1_CommodityCode_SD_SDI',
                            'YY1_ExtensionUUID2_SDI', 'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_CategoryCode_SD_SDI', 'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({
                            SalesOrder: vbeln,
                            SalesOrderItem: '00010'
                        })
                );
                if (!dummy) throw new Error(`Dummy item 00010 missing`);
                const zzpersk = (!dummy.YY1_EEGroup_SD_SDI || dummy.YY1_EEGroup_SD_SDI === '11') ? '6' : dummy.YY1_EEGroup_SD_SDI;
                this.LOG.info(`3.2 → zzpersk='${zzpersk}'`);

                // 3.3 PO-Indicator
                let poIndicator = '';
                // Check 1: Vendor mapping in ZSD_MBEWBE (via Vendor_VendorRemit)
                this.LOG.info(`3.3.1: checking Vendor_VendorRemit for SoldToParty='${hdr.SoldToParty}'`);
                const vendMap = await SELECT.one.from('com.aleron.monitor.Vendor_VendorRemit')
                    .columns(['vendor'])
                    .where({
                        vendor: hdr.SoldToParty
                    });
                if (vendMap) {
                    // entry found → no PO
                    poIndicator = '';
                    this.LOG.info(`3.3.1 → vendor mapping found, poIndicator=''`);
                } else {
                    // no entry → create PO
                    poIndicator = '1';
                    this.LOG.info(`3.3.1 → no vendor mapping, poIndicator='1'`);
                }

                // Check 2: “ZM” price-group override
                this.LOG.info(`3.3.2: checking A_SalesOrder for SalesOrder='${vbeln}', Item='000000', CustomerPriceGroup='ZM'`);
                const bizData = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns(['CustomerPriceGroup'])
                        .where({
                            SalesOrder: vbeln,
                            // SalesOrderItem: '000000',
                            CustomerPriceGroup: 'ZM'
                        })
                );
                if (bizData) {
                    // if ZM exists → override back to no PO
                    poIndicator = '';
                    this.LOG.info(`3.3.2 → ZM override found, poIndicator=''`);
                }

                this.LOG.info(`3.3 → final poIndicator='${poIndicator}'`);

                // 3.4 Emp type
                let empType;
                if (['8', '10'].includes(zzpersk)) empType = 'D';
                else if (['1', '3', '5', '12', '13'].includes(zzpersk)) empType = 'S';
                else if (['2', '4', '6', '7', '9'].includes(zzpersk)) empType = 'H';
                else throw new Error(`Invalid SubGroup '${zzpersk}'`);
                this.LOG.info(`3.4 → empType='${empType}'`);

                // 3.5 Bill-to
                let billTo = '';
                try {
                    const b = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrderHeaderPartner')
                            .columns(['Customer'])
                            .where({
                                SalesOrder: vbeln,
                                PartnerFunction: 'Z3'
                            })
                    );
                    billTo = b?.Customer || '';
                } catch { }
                this.LOG.info(`3.5 → billTo='${billTo}'`);

                // ─── 3.6: locate existing PO by PDI 
                this.LOG.info(`3.6: locating existing PO by PDI for SO='${vbeln}'`);
                const poRec = await this.purchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder'])
                        .where({
                            YY1_SDDocumentPD_PDI: vbeln
                        })
                );
                let poNo = '';
                if (poRec?.PurchaseOrder) {
                    poNo = poRec.PurchaseOrder;
                    this.LOG.info(`3.6 → found PO='${poNo}'`);
                } else {
                    this.LOG.warn(`3.6 → no existing PO found for SalesOrder=${vbeln}, proceeding to next step.`);
                }


                // // ── 3.x: determine next common 5-digit item ──
                // this.LOG.info(`3.x: highest SO-item for SO='${vbeln}'`);
                // const soTop = await this.salesOrderAPI.executeQuery(
                //     SELECT.one.from('A_SalesOrderItem')
                //     .columns(['SalesOrderItem'])
                //     .where({
                //         SalesOrder: vbeln
                //     })
                //     .orderBy('SalesOrderItem desc')
                // );
                // this.LOG.info(`3.x: soTop raw → ${JSON.stringify(soTop)}`);
                // const soMax = soTop?.SalesOrderItem || '00000';

                // let poMax = '00000';
                // if (poNo) {
                //     // this now calls the helper above
                //     const poLines = await this.purchaseOrderAPI.fetchPurchaseOrderLines(poNo);
                //     this.LOG.info(`3.x: fetched PO-lines for PO='${poNo}' → ${poLines.length} items`);

                //     if (poLines.length) {
                //         const maxNum = poLines
                //             .map(i => parseInt(i.PurchaseOrderItem, 10))
                //             .reduce((a, b) => Math.max(a, b), 0);
                //         poMax = String(maxNum).padStart(5, '0');
                //     }
                // }
                // this.LOG.info(`3.x: soMax='${soMax}', poMax='${poMax}'`);

                // const highest = Math.max(parseInt(soMax, 10), parseInt(poMax, 10));
                // const nextItem = String(highest + 10).padStart(5, '0');
                // // if you need a separate SalesOrder-payload item:
                // const nextSO = nextItem;

                // this.LOG.info(`3.x → nextItem='${nextItem}', nextSO='${nextSO}'`);

                // ── 3.x: determine next line item ──
                const nextSO = await this.getNextLineItem(vbeln, poNo);
                this.LOG.info(`3.x → nextSO='${nextSO}'`);



                // 3.7 Expense vs Invoice
                // accept ISO or US format (MM/DD/YYYY)
                const endDate = moment(rec.timeSheetEndDate, ['YYYY-MM-DD', 'MM/DD/YYYY'], true);
                if (!endDate.isValid()) {
                    throw new Error(`Invalid timesheetEndDate: ${rec.timeSheetEndDate}`);
                }
                let expenseLine = false,
                    expenseAmt = 0;
                const dates = {},
                    hours = {};
                if (/EXPENSE/i.test(rec.invType)) {
                    expenseLine = true;
                    expenseAmt = +rec.invLineAmount || 0;
                    this.LOG.info(`3.7 expenseAmt=${expenseAmt}`);
                } else {
                    for (let i = 1; i <= 7; i++) {
                        const date = endDate.clone().subtract(7 - i, 'days').format('YYYY-MM-DD');
                        dates[`YY${7 + i}_DAY_${i === 1 ? 'ONE' : i === 2 ? 'TWO' : i === 3 ? 'THREE' : i === 4 ? 'FOUR' : i === 5 ? 'FIVE' : i === 6 ? 'SIX' : 'SEVEN'}`] = toODataDate(date);
                        const m = lines.find(l => l.timeEntryDate === date) || {};
                        hours[`YY${11 + (i - 1) * 12 + (i - 1) * 2}_SHIFT1_RG`] = m.stHours || 0;
                        hours[`YY${11 + (i - 1) * 12 + (i - 1) * 2 + 1}_SHIFT1_OT`] = m.otHours || 0;
                        hours[`YY${11 + (i - 1) * 12 + (i - 1) * 2 + 2}_SHIFT1_DB`] = m.dtHours || 0;
                    }
                }

                // 3.8 Cost center config
                this.LOG.info(`3.8: ensure cost center '${rec.costCenterCode}'`);
                const cfg = await SELECT.one.from('com.aleron.monitor.FGCostCenter')
                    .where({
                        soldToParty: hdr.SoldToParty,
                        costCentreCode: rec.costCenterCode
                    });
                if (!cfg) {
                    await INSERT.into('com.aleron.monitor.FGCostCenter').entries({
                        soldToParty: hdr.SoldToParty,
                        costCentreCode: rec.costCenterCode,
                        costCentreName: rec.costCentreName
                    });
                }

                // 3.9 Bill-block
                const billBlock = lines.some(l => +l.rejected > 0) ? 'Z1' : '';
                this.LOG.info(`3.9 → billBlock='${billBlock}'`);

                // 4) Build & POST new SO line
                this.LOG.info('4: building & creating new sales-order-item');
                const totalInvAmt = lines.reduce((s, l) => s + (+l.invLineAmount || 0), 0).toFixed(2);
                const costAmount = expenseLine ? expenseAmt.toFixed(2) : totalInvAmt;

                const scheduleLine = [{
                    ScheduleLine: '0001',
                    RequestedDeliveryDate: toODataDate(rec.timeSheetEndDate),
                    OrderQuantityUnit: 'LAB',
                    ScheduleLineOrderQuantity: '1'
                }];

                // after you’ve fetched hdr = A_SalesOrder header...
                const conditionType = await determineConditionType({
                    customer: hdr.SoldToParty,
                    salesOrganization: hdr.SalesOrganization,
                    distributionChannel: hdr.DistributionChannel,
                    division: hdr.OrganizationDivision
                });

                // // / ── TEST: hard-code CP to verify lookup ──
                // const conditionType = await determineConditionType({
                // customer:            hdr.SoldToParty,
                // salesOrganization:   hdr.SalesOrganization,
                // distributionChannel: 'CP',                    // ← hard-coded for testing
                // division:            hdr.OrganizationDivision
                // });

                // this.LOG.info(`>>> TEST CP → conditionType = ${conditionType}`);

                const linePayload = {
                    SalesOrder: vbeln,
                    SalesOrderItem: nextSO,
                    // ReferenceSDDocument: hdr.ReferenceSDDocument,
                    // ReferenceSDDocumentItem: nextSO,
                    SalesOrderItemCategory: 'TAD',
                    Material: dummy.Material,
                    RequestedQuantity: '1',
                    OrderQuantityUnit: 'LAB',
                    PricingDate: toODataDate(moment()),
                    WBSElement: dummy.WBSElement,
                    ProfitCenter: dummy.ProfitCenter,
                    ProductionPlant: hdr.SalesOrganization,
                    YY1_EEGroup_SD_SDI: zzpersk,
                    YY1_WNWorkOrder_SD_SDI: dummy.YY1_WNWorkOrder_SD_SDI, //rec.contractNoWN,
                    YY1_WNInvoice_SD_SDI: rec.fgInvoiceID,
                    YY1_PurchasingDoc_SD_SDI: poNo || '',
                    YY1_StrTimeMarkup_SD_SDI: dummy.YY1_StrTimeMarkup_SD_SDI || '',
                    YY1_DoubTimeMarkup_SD_SDI: dummy.YY1_DoubTimeMarkup_SD_SDI || '',
                    YY1_LegacyPurchase_SD_SDI: dummy.YY1_LegacyPurchase_SD_SDI || '',
                    // YY1_WeekEnd_SD_SDI: toODataDate(weekEndDate),
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
                    CostAmount: costAmount,
                    NetAmount: costAmount,
                    PurchaseOrderByCustomer: poIndicator,
                    // YY1_PurchasingDoc_SD_SDI: dummy.YY1_PurchasingDoc_SD_SDI,

                    to_ScheduleLine: scheduleLine,
                    YY1_WeekEnd_SD_SDI: toODataDate(rec.timeSheetEndDate),
                    YY1_CustomBillingType_SDI: rec.customBillingType,

                    // ← new pricing element block
                    to_PricingElement: {
                        results: [{
                            ConditionType: conditionType,
                            ConditionRateValue: costAmount
                        }]
                    }
                };

                this.LOG.info(`4: line payload: ${JSON.stringify(linePayload)}`);
                const createRes = await this.salesOrderAPI.createSalesOrderItems([linePayload]);
                this.LOG.info(`4: create response: ${JSON.stringify(createRes)}`);
                // ** new: write the new SalesOrderItem back to our UI table **
                await UPDATE(this.recordsEntity)
                    .set({
                        salesItemNoSAP: nextSO
                    })
                    .where({
                        ID: lines.map(l => l.ID)
                    });


                // 5) VC data: full payload per metadata
                this.LOG.info(`5: inserting VC1 invoice data for SO='${vbeln}', item='${nextSO}'`);

                const vc1 = {
                    SalesOrderNumber: vbeln,
                    SalesOrderItemNum: nextSO,
                    SAP_Description: rec.description || '',
                    Billing_Document_Number: rec.billingDocNo || '',
                    Billing_Document_Item_Number: rec.billingDocItemNo || '',
                    Custom_Sales_Order_Type: rec.customSalesOrderType || '',
                    Custom_Billing_type: rec.customBillingType || '',
                    YY1_ACA_RG_ONLY: rec.acaRgOnly || '',
                    YY2_ACA_HRS: rec.acaHrs || 0,
                    YY3_ACA_HRS_PRICE: rec.acaHrsPrice || 0,
                    YY4_ACA_TOTAL_HRS_PRICE: rec.acaTotalHrsPrice || 0,
                    YY5_LINE_ITEM_NUMBER: +nextSO,
                    YY6_SC_LINE_ITEM_NUMBER: rec.scLineItemNo || '',
                    YY7_INVISIBLE: '',
                    // use raw UI date for the weekend
                    YY8_WEEK_ENDING2: rec.timeSheetEndDate,
                    YY9_ZZWEEK_END_VBAP: rec.timeSheetEndDate,
                    YY10_EMPLOYEE_TYPE: empType,
                    YY11_EIGHT_DAY_WEEK: 'N',

                    // ─────── Summary fields only ───────────────────────────────────
                    YY100_SHIFT1_TOTAL_HRS_RG: rec.totalSt || 0,
                    YY101_SHIFT1_TOTAL_HRS_OT: rec.totalOt || 0,
                    YY102_SHIFT1_TOTAL_HRS_DB: rec.totalDt || 0,
                    YY103_SHIFT2_TOTAL_HRS_RG: rec.totalSt2 || 0,
                    YY104_SHIFT2_TOTAL_HRS_OT: rec.totalOt2 || 0,
                    YY105_SHIFT2_TOTAL_HRS_DB: rec.totalDt2 || 0,
                    YY106_SHIFT3_TOTAL_HRS_RG: rec.totalSt3 || 0,
                    YY107_SHIFT3_TOTAL_HRS_OT: rec.totalOt3 || 0,
                    YY108_SHIFT3_TOTAL_HRS_DB: rec.totalDt3 || 0,
                    YY109_SHIFT1_PRICE_RG: rec.customerBillRateST || 0,
                    YY110_SHIFT1_PRICE_OT: rec.customerBillRateOt || 0,
                    YY111_SHIFT1_PRICE_DB: rec.customerBillRateDt || 0,
                    YY112_SHIFT2_PRICE_RG: rec.rateSt2 || 0,
                    YY113_SHIFT2_PRICE_OT: rec.rateOt2 || 0,
                    YY114_SHIFT2_PRICE_DB: rec.rateDt2 || 0,
                    YY115_SHIFT3_PRICE_RG: rec.rateSt3 || 0,
                    YY116_SHIFT3_PRICE_OT: rec.rateOt3 || 0,
                    YY117_SHIFT3_PRICE_DB: rec.rateDt3 || 0,
                    YY118_MARK_UP_RG: rec.markupRg || 0,
                    YY119_MARK_UP_OT: rec.markupOt || 0,
                    YY120_MARK_UP_DB: rec.markupDb || 0,
                    YY121_SHIFT1_TOTAL_PRICE_RG: rec.totalPriceSt || 0,
                    YY122_SHIFT1_TOTAL_PRICE_OT: rec.totalPriceOt || 0,
                    YY123_SHIFT1_TOTAL_PRICE_DB: rec.totalPriceDt || 0,
                    YY124_SHIFT2_TOTAL_PRICE_RG: rec.totalPriceSt2 || 0,
                    YY125_SHIFT2_TOTAL_PRICE_OT: rec.totalPriceOt2 || 0,
                    YY126_SHIFT2_TOTAL_PRICE_DB: rec.totalPriceDt2 || 0,
                    YY127_SHIFT3_TOTAL_PAY_RG: rec.totalPaySt3 || 0,
                    YY128_SHIFT3_TOTAL_PAY_OT: rec.totalPayOt3 || 0,
                    YY129_SHIFT3_TOTAL_PAY_DB: rec.totalPayDt3 || 0,
                    YY130_ADMIN_FEE_PRICE: rec.adminFeePrice || 0
                };

                // always log the outgoing payload
                this.LOG.info(`VC1 payload → ${JSON.stringify(vc1)}`);

                let vc1Res;
                try {
                    vc1Res = await this.salesVCData_1Api.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_1').entries(vc1)
                    );
                    this.LOG.info(`VC1 raw response → ${JSON.stringify(vc1Res)}`);
                    this.LOG.info(`5 → VC1 data inserted`);
                } catch (err) {
                    this.LOG.error(`VC1 insert FAILED: ${err.message}`);
                    this.LOG.error(`VC1 payload was: ${JSON.stringify(vc1)}`);
                    throw err;
                }

                // capture + persist the returned UUID
                const vc1Uuid = Array.isArray(vc1Res) ?
                    vc1Res[0]?.SAP_UUID :
                    vc1Res.SAP_UUID;

                if (vc1Uuid) {
                    this.LOG.info(`VC1 returned UUID → ${vc1Uuid}`);
                    await UPDATE(this.recordsEntity)
                        .set({
                            vcData1UUID: vc1Uuid
                        })
                        .where({
                            ID: lines.map(l => l.ID)
                        });
                } else {
                    this.LOG.warn(`VC1 insert did not return a UUID`);
                }


                // ────────────────────────────────────────────────────────────────────
                // 5b) VC2 block
                this.LOG.info(`5: inserting VC2 invoice data for SO='${vbeln}', item='${nextSO}'`);

                const vc2 = {
                    Sales_Order_Number: vbeln,
                    Sales_Order_Item_Num: nextSO,
                    YY135_DAILY_TOTAL_VENDOR: 0,
                    YY137_HOLIDAY_TOTAL_VENDOR: 0,
                    YY247_ZSD_WN_WORK_ORDER_VCSD: rec.contractNoWN,
                    YY251_SHIFT1_PAY_RATE_RG: rec.shiftRGFirst,
                    YY252_SHIFT1_PAY_RATE_OT: rec.shiftOTFirst,
                    YY253_SHIFT1_PAY_RATE_DB: rec.shiftDTFirst,
                    YY254_SHIFT2_PAY_RATE_RG: rec.shiftRGSecond,
                    YY255_SHIFT2_PAY_RATE_OT: rec.shiftOTSecond,
                    YY256_SHIFT2_PAY_RATE_DB: rec.shiftDTSecond,
                    YY257_SHIFT3_PAY_RATE_RG: rec.shiftRGThird,
                    YY258_SHIFT3_PAY_RATE_OT: rec.shiftOTThird,
                    YY259_SHIFT3_PAY_RATE_DB: rec.shiftDTThird,
                    YY260_SHIFT1_TOTAL_PAY_RG: rec.shiftRGFirst,
                    YY261_SHIFT1_TOTAL_PAY_OT: rec.shiftOTFirst,
                    YY262_SHIFT1_TOTAL_PAY_DB: rec.shiftDTFirst,
                    YY263_SHIFT2_TOTAL_PAY_RG: rec.shiftRGSecond,
                    YY264_SHIFT2_TOTAL_PAY_OT: rec.shiftOTSecond,
                    YY265_SHIFT2_TOTAL_PAY_DB: rec.shiftDTSecond,
                    YY266_SHIFT3_TOTAL_PAY_RG: rec.shiftRGThird,
                    YY267_SHIFT3_TOTAL_PAY_OT: rec.shiftOTThird,
                    YY268_SHIFT3_TOTAL_PAY_DB: rec.shiftDTThird
                };

                this.LOG.info(`VC2 payload → ${JSON.stringify(vc2)}`);

                let vc2Res;
                try {
                    vc2Res = await this.salesVCData_2Api.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_2').entries(vc2)
                    );
                    this.LOG.info(`VC2 raw response → ${JSON.stringify(vc2Res)}`);
                    this.LOG.info(`5 → VC2 data inserted`);
                } catch (err) {
                    this.LOG.error(`VC2 insert FAILED: ${err.message}`);
                    this.LOG.error(`VC2 payload was: ${JSON.stringify(vc2)}`);
                    throw err;
                }

                const vc2Uuid = Array.isArray(vc2Res) ?
                    vc2Res[0]?.SAP_UUID :
                    vc2Res.SAP_UUID;

                if (vc2Uuid) {
                    this.LOG.info(`VC2 returned UUID → ${vc2Uuid}`);
                    await UPDATE(this.recordsEntity)
                        .set({
                            vcData2UUID: vc2Uuid
                        })
                        .where({
                            ID: lines.map(l => l.ID)
                        });
                } else {
                    this.LOG.warn(`VC2 insert did not return a UUID`);
                }


                //         // 6) Advance to level-5
                //         await UPDATE(this.recordsEntity)
                //             .set({
                //                 processLevel_code: '5'
                //             })
                //             .where({
                //                 ID: lines.map(l => l.ID)
                //             });
                //         passed.push(...lines.map(l => l.ID));
                //     } catch (e) {
                //         this.LOG.error(`*** Group ${key} FAILED: ${e.message}`);
                //         errorLogs.push({
                //             record_ID: rec.ID,
                //             message: e.message
                //         });
                //         failed.push(rec.ID);
                //     }
                // }

                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.7] Update DB records as processed`);
                await UPDATE(this.recordsEntity)
                    .set({
                        salesItemNoSAP: nextSO,
                        processLevel_code: '5'
                    })
                    .where({
                        ID: lines.map(l => l.ID)
                    });
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.7] Records updated`);

                passed.push(...lines.map(l => l.ID));
            } catch (e) {
                LOG.error(`[processSalesOrder][Group ${groupCounter}][ERROR] Group ${key} failed: ${e.message}`);
                for (const l of lines) {
                    errorLogs.push({
                        record_ID: l.ID,
                        message: e.message
                    });
                    failed.push(l.ID);
                }
            }
            groupCounter++;
        }

        // -------- Step 5: Logging and final updates --------
        LOG.info(`[processSalesOrder][Step 5] Finalize: Update log tables and statuses`);
        if (errorLogs.length) {
            await ProcessLogger.removeLogs(failed);
            await ProcessLogger.addLogs(errorLogs);
            // **failures stay at 3** so they'll be retried next run:
            await this.markRecordsValid('3', failed, false);
        }
        if (passed.length) {
            await ProcessLogger.removeLogs(passed);
            // **successes move to 5**, so they're skipped next time:
            await this.markRecordsValid('5', passed, true);
        }
        this.updateExclusionSet({
            passed,
            failed,
            skipped: [],
            bBreakExecution
        });
        this.recordIDs = new Set(passed);

        LOG.info(`[processSalesOrder][Step 5][Done] Summary: passed=${passed.length}, failed=${failed.length}]`);
        LOG.info(`[processSalesOrder][Exit]`);
        return {
            hasError: failed.length > 0,
            continue: failed.length === 0
        };
    }

    // Step G: Create/Change Intercompany Sales Orders
    async processIntercompanyso(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        LOG.info(`[processIntercompanyso] ENTRY (code=${sProcessCode}, break=${bBreakExecution})`);
        // this.updateProcessingState(sProcessCode);

        // -------- Step 1: Validate process code --------
        if (sProcessCode !== 'G') {
            LOG.info(`[processIntercompanyso][Exit] Skipped: process code not 'G'`);
            return {
                hasError: false,
                continue: true
            };
        }

        // -------- Step 2: Fetch records at level G --------
        // LOG.info(`[processIntercompanyso][Step 2] Re-fetching batch records`);
        // await this._fetchRecords(this.recordIDs);
        // const recs = this.records.filter(r =>
        //     r.processLevel_code === 'G' && ['IC'].includes(r.distributionChannelSAP)
        // );

        // -------- Step 2: Fetch records at level G --------
        LOG.info(`[processIntercompanyso][Step 2] Re-fetching batch records`);
        // BEFORE
        await this._fetchRecords(this.recordIDs);

        // >>> keep group intact (file_ID, salesOrderICSAP, fgInvoiceID, fgWorkOrderID, timesheetID)
        if (this.recordIDs && this.recordIDs.size) {
            const seeds = [];
            for (const id of this.recordIDs) {
                const r = this.records.find(x => x.ID === id);
                if (r) seeds.push(r);
            }
            const seenKeys = new Set(), uniqSeeds = [];
            for (const s of seeds) {
                const k = String(s.file_ID ?? '∅') + '|' + String(s.salesOrderICSAP ?? '∅') + '|' + String(s.fgInvoiceID ?? '∅') + '|' + String(s.fgWorkOrderID ?? '∅') + '|' + String(s.timesheetID ?? '∅');
                if (!seenKeys.has(k)) { seenKeys.add(k); uniqSeeds.push(s); }
            }
            if (uniqSeeds.length) {
                const orConds = [];
                for (const s of uniqSeeds) {
                    const c = [];
                    c.push({ ref: ['file_ID'] }); (s.file_ID == null) ? c.push('is', 'null') : c.push('=', { val: s.file_ID }); c.push('and');
                    c.push({ ref: ['salesOrderICSAP'] }); (s.salesOrderICSAP == null) ? c.push('is', 'null') : c.push('=', { val: s.salesOrderICSAP }); c.push('and');
                    c.push({ ref: ['fgInvoiceID'] }); (s.fgInvoiceID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgInvoiceID }); c.push('and');
                    c.push({ ref: ['fgWorkOrderID'] }); (s.fgWorkOrderID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgWorkOrderID }); c.push('and');
                    c.push({ ref: ['timesheetID'] }); (s.timesheetID == null) ? c.push('is', 'null') : c.push('=', { val: s.timesheetID });
                    orConds.push(['(', ...c, ')']);
                }
                let whereExpr = orConds[0];
                for (let i = 1; i < orConds.length; i++) whereExpr = [...whereExpr, 'or', ...orConds[i]];
                const siblings = await SELECT.from(this.recordsEntity).columns(['ID']).where(whereExpr);
                const extra = siblings.map(s => s.ID).filter(id => !this.recordIDs.has(id));
                if (extra.length) {
                    for (const id of extra) this.recordIDs.add(id);
                    await this._fetchRecords(this.recordIDs);
                    LOG.info(`[processIntercompanyso] expanded selection to ${this.recordIDs.size} grouped rows`);
                }
            }
        }
        // <<< keep group intact

        // AFTER
        const recs = this.records.filter(r =>
            r.processLevel_code === 'G' && ['IC'].includes(r.distributionChannelSAP)
        );


        LOG.info(`[processIntercompanyso][Step 2] Retrieved ${recs.length} records`);
        if (!recs.length) {
            LOG.info(`[processIntercompanyso][Exit] No IC records to process`);
            return {
                hasError: false,
                continue: true
            };
        }

        // G.3) group by FG_INV_ID | FG_WorkOrderID | TimesheetID | IC_SO
        const groups = new Map();
        for (const r of toProcess) {
            const key = [r.fgInvoiceID, r.fgWorkOrderID, r.timesheetID, r.salesOrderICSAP].join('|');
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(r);
        }
        this.LOG.info(`G.3: ${groups.size} IC group(s)`);

        const toODataDate = d => {
            const m = moment(d, ['YYYY-MM-DD', 'MM/DD/YYYY'], true);
            if (!m.isValid()) throw new Error(`Invalid date: ${d}`);
            return `/Date(${m.valueOf()})/`;
        };

        const errorLogs = [],
            passed = [],
            failed = [];
        let groupCounter = 1;
        for (const [key, lines] of groups.entries()) {
            const rec = lines[0];
            let icVbeln = rec.salesOrderICSAP;
            let persk = rec.employeeSubgroupSAP;

            // G.3.1) fallback to regular SO if IC_SO missing
            if (!icVbeln) {
                this.LOG.info(`G.fallback: IC_SO missing for group ${key}, using SO=${rec.salesDocumentNoSAP}`);
                const hdr0 = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns(['SalesOrder', 'DistributionChannel', 'ReferenceSDDocument'])
                        .where({
                            SalesOrder: rec.salesDocumentNoSAP
                        })
                );
                if (!hdr0) throw new Error(`SalesOrder ${rec.salesDocumentNoSAP} not found for IC fallback`);
                const dummy0 = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem', 'YY1_EEGroup_SD_SDI'])
                        .where({
                            SalesOrder: rec.salesDocumentNoSAP,
                            SalesOrderItem: '000010'
                        })
                );
                if (!dummy0) throw new Error(`Dummy item 000010 missing on SO ${rec.salesDocumentNoSAP}`);

                await UPDATE(this.recordsEntity)
                    .set({
                        salesOrderICSAP: hdr0.SalesOrder,
                        distributionChannelICSAP: hdr0.DistributionChannel,
                        salesItemNoICSAP: dummy0.SalesOrderItem,
                        employeeSubgroupSAP: dummy0.YY1_EEGroup_SD_SDI
                    })
                    .where({
                        ID: lines.map(l => l.ID)
                    });

                icVbeln = hdr0.SalesOrder;
                persk = dummy0.YY1_EEGroup_SD_SDI;
                this.LOG.info(`G.fallback → set IC_SO='${icVbeln}', PERSK='${persk}'`);
            }

            // G.3.2) ensure persk is never blank/11
            if (!persk || persk === '11') {
                this.LOG.info(`G.6.1: PERSK was '${persk}', fetching from dummy item 000010`);
                const dummyP = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['YY1_EEGroup_SD_SDI'])
                        .where({
                            SalesOrder: icVbeln,
                            SalesOrderItem: '000010'
                        })
                );
                if (!dummyP) throw new Error(`Cannot default PERSK: dummy item missing on ${icVbeln}`);
                let fixed = dummyP.YY1_EEGroup_SD_SDI || '6';
                if (fixed === '11') fixed = '6';
                await UPDATE(this.recordsEntity)
                    .set({
                        employeeSubgroupSAP: fixed
                    })
                    .where({
                        ID: lines.map(l => l.ID)
                    });
                persk = fixed;
                this.LOG.info(`G.6.1 → persisted employeeSubgroupSAP='${persk}'`);
            }

            this.LOG.info(`\n[processIntercompanyso] Group ${key} → IC_SO=${icVbeln}, PERSK=${persk}`);

            try {
                // G.4) sanity checks
                if (!icVbeln) throw new Error('IC sales order missing');
                if (!persk) throw new Error('Employee SubGroup missing');

                // G.5) fetch IC SO header (now allowing IC DC)
                const hdr = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns(['SalesOrganization', 'DistributionChannel', 'SoldToParty', 'SDDocumentReason', 'ReferenceSDDocument'])
                        .where({
                            SalesOrder: icVbeln
                        })
                );
                if (!hdr) throw new Error(`IC SalesOrder ${icVbeln} not found`);
                if (!['CP', 'CR', 'IC'].includes(hdr.DistributionChannel)) {
                    throw new Error(`IC SalesOrder must have DistributionChannel CP, CR or IC`);
                }

                // G.6) fetch dummy item 000010
                const dummy = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem', 'Material', 'WBSElement', 'ProfitCenter', 'YY1_EEGroup_SD_SDI'])
                        .where({
                            SalesOrder: icVbeln,
                            SalesOrderItem: '000010'
                        })
                );
                if (!dummy) throw new Error('IC dummy item 000010 not found');

                // G.7) next item number
                const items = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem'])
                        .where({
                            SalesOrder: icVbeln
                        })
                );
                const maxNo = items.length ? Math.max(...items.map(i => +i.SalesOrderItem)) : 0;
                const nextItem = String(maxNo + 10).padStart(5, '0');

                // G.8) expense vs labor
                const expenseLine = /EXPENSE/i.test(rec.fgInvoicetype);
                const expenseAmt = expenseLine ? +rec.invLineAmount || 0 : 0;
                const totalHrsNum = lines
                    .reduce((s, row) => s + (+row.stHours || 0) + (+row.otHours || 0) + (+row.dtHours || 0), 0);

                // G.9) PO-indicator (same as non-IC)
                let poIndicator = '';
                const vendMapIC = await SELECT.one.from('com.aleron.monitor.Vendor_VendorRemit')
                    .columns(['vendor'])
                    .where({
                        vendor: hdr.SoldToParty
                    });
                if (!vendMapIC) poIndicator = '1';
                const bizDataIC = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns(['CustomerPriceGroup'])
                        .where({
                            SalesOrder: icVbeln,
                            CustomerPriceGroup: 'ZM'
                        })
                );
                if (bizDataIC) poIndicator = '';

                // G.10) ensure cost-center
                const cfg = await SELECT.one.from('com.aleron.monitor.FGCostCenter')
                    .where({
                        soldToParty: hdr.SoldToParty,
                        costCentreCode: rec.costCenterCode
                    });
                if (!cfg) {
                    await INSERT.into('com.aleron.monitor.FGCostCenter').entries({
                        soldToParty: hdr.SoldToParty,
                        costCentreCode: rec.costCenterCode,
                        costCentreName: rec.costCentreName
                    });
                }

                // G.11) build exactly one schedule line
                const scheduleLines = [{
                    ScheduleLine: '0001',
                    RequestedDeliveryDate: toODataDate(rec.timeSheetEndDate),
                    OrderQuantityUnit: 'LAB',
                    ScheduleLineOrderQuantity: '1',

                }];

                // G.12) full payload (identical to your non-IC logic)
                const amtStr = (expenseLine ? expenseAmt : totalHrsNum).toFixed(2);
                const linePayload = {
                    SalesOrder: icVbeln,
                    SalesOrderItem: nextItem,
                    // ReferenceSDDocument:      hdr.ReferenceSDDocument,
                    // ReferenceSDDocumentItem:  nextItem,
                    SalesOrderItemCategory: 'TAD',
                    Material: expenseLine ? 'EXPENSE' : dummy.Material,
                    RequestedQuantity: '1',
                    OrderQuantityUnit: 'LAB',
                    PricingDate: toODataDate(moment()),
                    WBSElement: dummy.WBSElement,
                    ProfitCenter: dummy.ProfitCenter,
                    YY1_EEGroup_SD_SDI: persk,
                    YY1_WNWorkOrder_SD_SDI: dummy.WBSElement,
                    YY1_WNInvoice_SD_SDI: rec.fgInvoiceID,
                    PurchaseOrderByCustomer: poIndicator,
                    CostAmount: amtStr,
                    NetAmount: amtStr,

                    to_ScheduleLine: scheduleLines,
                    YY1_WeekEnd_SD_SDI: toODataDate(rec.timeSheetEndDate),
                    YY1_CustomBillingType_SDI: rec.customBillingType,
                    to_PricingElement: {
                        results: [{
                            ConditionType: 'ZPAY',
                            ConditionRateValue: amtStr
                        }]
                    }
                };
                this.LOG.info(`G.12 payload → ${JSON.stringify(linePayload)}`);

                // G.13) call OData
                const createRes = await this.salesOrderAPI.createSalesOrderItems([linePayload]);
                this.LOG.info(`4: create response: ${JSON.stringify(createRes)}`);
                await UPDATE(this.recordsEntity)
                    .set({
                        salesItemNoSAP: nextItem
                    })
                    .where({
                        ID: lines.map(l => l.ID)
                    });

                // 5) VC data: full payload per metadata
                this.LOG.info(`5: inserting VC1 invoice data for SO='${icVbeln}', item='${nextItem}'`);

                const vc1 = {
                    SalesOrderNumber: icVbeln,
                    SalesOrderItemNum: nextItem,
                    SAP_Description: rec.description || '',
                    Billing_Document_Number: rec.billingDocNo || '',
                    Billing_Document_Item_Number: rec.billingDocItemNo || '',
                    Custom_Sales_Order_Type: rec.customSalesOrderType || '',
                    Custom_Billing_type: rec.customBillingType || '',
                    YY1_ACA_RG_ONLY: rec.acaRgOnly || '',
                    YY2_ACA_HRS: rec.acaHrs || 0,
                    YY3_ACA_HRS_PRICE: rec.acaHrsPrice || 0,
                    YY4_ACA_TOTAL_HRS_PRICE: rec.acaTotalHrsPrice || 0,
                    YY5_LINE_ITEM_NUMBER: +nextItem,
                    YY6_SC_LINE_ITEM_NUMBER: rec.scLineItemNo || '',
                    YY7_INVISIBLE: '',
                    // use raw UI date for the weekend
                    YY8_WEEK_ENDING2: rec.timeSheetEndDate,
                    YY9_ZZWEEK_END_VBAP: rec.timeSheetEndDate,
                    // YY10_EMPLOYEE_TYPE: empType,
                    YY11_EIGHT_DAY_WEEK: 'N',

                    // ─────── Summary fields only ───────────────────────────────────
                    YY100_SHIFT1_TOTAL_HRS_RG: rec.totalSt || 0,
                    YY101_SHIFT1_TOTAL_HRS_OT: rec.totalOt || 0,
                    YY102_SHIFT1_TOTAL_HRS_DB: rec.totalDt || 0,
                    YY103_SHIFT2_TOTAL_HRS_RG: rec.totalSt2 || 0,
                    YY104_SHIFT2_TOTAL_HRS_OT: rec.totalOt2 || 0,
                    YY105_SHIFT2_TOTAL_HRS_DB: rec.totalDt2 || 0,
                    YY106_SHIFT3_TOTAL_HRS_RG: rec.totalSt3 || 0,
                    YY107_SHIFT3_TOTAL_HRS_OT: rec.totalOt3 || 0,
                    YY108_SHIFT3_TOTAL_HRS_DB: rec.totalDt3 || 0,
                    YY109_SHIFT1_PRICE_RG: rec.customerBillRateST || 0,
                    YY110_SHIFT1_PRICE_OT: rec.customerBillRateOt || 0,
                    YY111_SHIFT1_PRICE_DB: rec.customerBillRateDt || 0,
                    YY112_SHIFT2_PRICE_RG: rec.rateSt2 || 0,
                    YY113_SHIFT2_PRICE_OT: rec.rateOt2 || 0,
                    YY114_SHIFT2_PRICE_DB: rec.rateDt2 || 0,
                    YY115_SHIFT3_PRICE_RG: rec.rateSt3 || 0,
                    YY116_SHIFT3_PRICE_OT: rec.rateOt3 || 0,
                    YY117_SHIFT3_PRICE_DB: rec.rateDt3 || 0,
                    YY118_MARK_UP_RG: rec.markupRg || 0,
                    YY119_MARK_UP_OT: rec.markupOt || 0,
                    YY120_MARK_UP_DB: rec.markupDb || 0,
                    YY121_SHIFT1_TOTAL_PRICE_RG: rec.totalPriceSt || 0,
                    YY122_SHIFT1_TOTAL_PRICE_OT: rec.totalPriceOt || 0,
                    YY123_SHIFT1_TOTAL_PRICE_DB: rec.totalPriceDt || 0,
                    YY124_SHIFT2_TOTAL_PRICE_RG: rec.totalPriceSt2 || 0,
                    YY125_SHIFT2_TOTAL_PRICE_OT: rec.totalPriceOt2 || 0,
                    YY126_SHIFT2_TOTAL_PRICE_DB: rec.totalPriceDt2 || 0,
                    YY127_SHIFT3_TOTAL_PAY_RG: rec.totalPaySt3 || 0,
                    YY128_SHIFT3_TOTAL_PAY_OT: rec.totalPayOt3 || 0,
                    YY129_SHIFT3_TOTAL_PAY_DB: rec.totalPayDt3 || 0,
                    YY130_ADMIN_FEE_PRICE: rec.adminFeePrice || 0
                };

                // always log the outgoing payload
                this.LOG.info(`VC1 payload → ${JSON.stringify(vc1)}`);

                let vc1Res;
                try {
                    vc1Res = await this.salesVCData_1Api.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_1').entries(vc1)
                    );
                    this.LOG.info(`VC1 raw response → ${JSON.stringify(vc1Res)}`);
                    this.LOG.info(`5 → VC1 data inserted`);
                } catch (err) {
                    this.LOG.error(`VC1 insert FAILED: ${err.message}`);
                    this.LOG.error(`VC1 payload was: ${JSON.stringify(vc1)}`);
                    throw err;
                }

                // capture + persist the returned UUID
                const vc1Uuid = Array.isArray(vc1Res) ?
                    vc1Res[0]?.SAP_UUID :
                    vc1Res.SAP_UUID;

                if (vc1Uuid) {
                    this.LOG.info(`VC1 returned UUID → ${vc1Uuid}`);
                    await UPDATE(this.recordsEntity)
                        .set({
                            vcData1UUID: vc1Uuid
                        })
                        .where({
                            ID: lines.map(l => l.ID)
                        });
                } else {
                    this.LOG.warn(`VC1 insert did not return a UUID`);
                }


                // ────────────────────────────────────────────────────────────────────
                // 5b) VC2 block
                this.LOG.info(`5: inserting VC2 invoice data for SO='${icVbeln}', item='${nextItem}'`);

                const vc2 = {
                    Sales_Order_Number: icVbeln,
                    Sales_Order_Item_Num: nextItem,
                    YY135_DAILY_TOTAL_VENDOR: 0,
                    YY137_HOLIDAY_TOTAL_VENDOR: 0,
                    YY247_ZSD_WN_WORK_ORDER_VCSD: rec.contractNoWN,
                    YY251_SHIFT1_PAY_RATE_RG: rec.shiftRGFirst,
                    YY252_SHIFT1_PAY_RATE_OT: rec.shiftOTFirst,
                    YY253_SHIFT1_PAY_RATE_DB: rec.shiftDTFirst,
                    YY254_SHIFT2_PAY_RATE_RG: rec.shiftRGSecond,
                    YY255_SHIFT2_PAY_RATE_OT: rec.shiftOTSecond,
                    YY256_SHIFT2_PAY_RATE_DB: rec.shiftDTSecond,
                    YY257_SHIFT3_PAY_RATE_RG: rec.shiftRGThird,
                    YY258_SHIFT3_PAY_RATE_OT: rec.shiftOTThird,
                    YY259_SHIFT3_PAY_RATE_DB: rec.shiftDTThird,
                    YY260_SHIFT1_TOTAL_PAY_RG: rec.shiftRGFirst,
                    YY261_SHIFT1_TOTAL_PAY_OT: rec.shiftOTFirst,
                    YY262_SHIFT1_TOTAL_PAY_DB: rec.shiftDTFirst,
                    YY263_SHIFT2_TOTAL_PAY_RG: rec.shiftRGSecond,
                    YY264_SHIFT2_TOTAL_PAY_OT: rec.shiftOTSecond,
                    YY265_SHIFT2_TOTAL_PAY_DB: rec.shiftDTSecond,
                    YY266_SHIFT3_TOTAL_PAY_RG: rec.shiftRGThird,
                    YY267_SHIFT3_TOTAL_PAY_OT: rec.shiftOTThird,
                    YY268_SHIFT3_TOTAL_PAY_DB: rec.shiftDTThird
                };

                this.LOG.info(`VC2 payload → ${JSON.stringify(vc2)}`);

                let vc2Res;
                try {
                    vc2Res = await this.salesVCData_2Api.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_2').entries(vc2)
                    );
                    this.LOG.info(`VC2 raw response → ${JSON.stringify(vc2Res)}`);
                    this.LOG.info(`5 → VC2 data inserted`);
                } catch (err) {
                    this.LOG.error(`VC2 insert FAILED: ${err.message}`);
                    this.LOG.error(`VC2 payload was: ${JSON.stringify(vc2)}`);
                    throw err;
                }

                const vc2Uuid = Array.isArray(vc2Res) ?
                    vc2Res[0]?.SAP_UUID :
                    vc2Res.SAP_UUID;

                if (vc2Uuid) {
                    this.LOG.info(`VC2 returned UUID → ${vc2Uuid}`);
                    await UPDATE(this.recordsEntity)
                        .set({
                            vcData2UUID: vc2Uuid
                        })
                        .where({
                            ID: lines.map(l => l.ID)
                        });
                } else {
                    this.LOG.warn(`VC2 insert did not return a UUID`);
                }

                //             // G.14) advance to level-5
                //             await UPDATE(this.recordsEntity)
                //                 .set({
                //                     processLevel_code: '5'
                //                 })
                //                 .where({
                //                     ID: lines.map(l => l.ID)
                //                 });
                //             passed.push(...lines.map(l => l.ID));

                //         } catch (e) {
                //             this.LOG.error(`*** IC group ${key} FAILED: ${e.message}`);
                //             errorLogs.push({
                //                 record_ID: rec.ID,
                //                 message: e.message
                //             });
                //             failed.push(rec.ID);
                //         }
                //     }

                //     // G.15) write logs & mark validity
                //     if (errorLogs.length) {
                //         await ProcessLogger.removeLogs(failed);
                //         await ProcessLogger.addLogs(errorLogs);
                //         await this.markRecordsValid('G', failed, false);
                //     }
                //     if (passed.length) {
                //         await ProcessLogger.removeLogs(passed);
                //         await this.markRecordsValid('5', passed, true);
                //     }
                //     this.updateExclusionSet({
                //         passed,
                //         failed,
                //         skipped: [],
                //         bBreakExecution
                //     });
                //     this.recordIDs = new Set(passed);

                //     this.LOG.info(`[processIntercompanyso] EXIT (passed=${passed.length}, failed=${failed.length})`);
                //     return {
                //         hasError: failed.length > 0,
                //         continue: failed.length === 0
                //     };
                // }
                // 4.13: Mark processed
                const ids = lines.map(l => l.ID);
                await UPDATE(this.recordsEntity)
                    .set({
                        salesItemNoSAP: nextSO,
                        processLevel_code: '5'
                    })
                    .where({
                        ID: ids
                    });

                passed.push(...ids);
                LOG.info(`[processIntercompanyso][${groupCounter}] Success, item ${nextSO}`);
            } catch (e) {
                LOG.error(`[processIntercompanyso][Group ${groupCounter}] ERROR → ${e.message}`);
                for (const l of lines) {
                    errorLogs.push({
                        record_ID: l.ID,
                        message: e.message
                    });
                    failed.push(l.ID);
                }
            }

            groupCounter++;
        }

        // -------- Step 5: Finalize logs & statuses --------
        LOG.info(`[processIntercompanyso][Step 5] Finalizing (passed=${passed.length}, failed=${failed.length})`);
        if (errorLogs.length) {
            await ProcessLogger.removeLogs(failed);
            await ProcessLogger.addLogs(errorLogs);
            // failures stay at 'G' to be retried
            await this.markRecordsValid('G', failed, false);
        }
        if (passed.length) {
            await ProcessLogger.removeLogs(passed);
            // successes move to '5' so they’re skipped next run
            await this.markRecordsValid('5', passed, true);
        }
        this.updateExclusionSet({
            passed,
            failed,
            skipped: [],
            bBreakExecution
        });
        this.recordIDs = new Set(passed);

        LOG.info(`[processIntercompanyso][Exit]`);
        return {
            hasError: failed.length > 0,
            continue: failed.length === 0
        };
    }


    // Step 5: Update or Create Purchase Order
    async processPurchaseOrder(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        LOG.info(`[processPurchaseOrder] ENTRY  Starting PO processing, step code=${sProcessCode}`);
        // this.updateProcessingState(sProcessCode);
        // universal formatter for your week-end date

        const formatWeekEnd = raw => {
            if (!raw) return null;

            // 1) OData JSON date literal
            const mOdata = /^\/Date\((\d+)\)\/$/.exec(raw);
            if (mOdata) {
                return moment
                    .utc(parseInt(mOdata[1], 10))
                    .format('YYYY-MM-DD');
            }

            // 2) Try a handful of date formats
            const m = moment(raw, [
                'MM/DD/YYYY',
                'YYYY-MM-DD',
                'YYYYMMDD'
            ], true);

            if (!m.isValid()) {
                throw new Error(`Unrecognized date format for week-end: "${raw}"`);
            }

            return m.format('YYYY-MM-DD');
        };


        // Only process step '5'
        if (sProcessCode !== '5') {
            LOG.info('[processPurchaseOrder] SKIP  not step 5');
            return {
                hasError: false,
                continue: true
            };
        }
        LOG.info('=== Step 5 START: Update or Create Purchase Order ===');

        // THIS:
        if (await this._bailIfNoRecordsAt('5', 'processPurchaseOrder')) {
            return {
                hasError: false,
                continue: true
            };
        }



        // 5.1) Fetch batch records
        LOG.info('[Step 5.1] Re-fetching batch records');
        // BEFORE
        await this._fetchRecords(this.recordIDs);

        // >>> keep group intact (file_ID, salesDocumentNoSAP, salesItemNoSAP, fgWorkOrderID, fgInvoiceID)
        if (this.recordIDs && this.recordIDs.size) {
            const seeds = [];
            for (const id of this.recordIDs) {
                const r = this.records.find(x => x.ID === id);
                if (r) seeds.push(r);
            }
            const seenKeys = new Set(), uniqSeeds = [];
            for (const s of seeds) {
                const k = String(s.file_ID ?? '∅') + '|' + String(s.salesDocumentNoSAP ?? '∅') + '|' + String(s.salesItemNoSAP ?? '∅') + '|' + String(s.fgWorkOrderID ?? '∅') + '|' + String(s.fgInvoiceID ?? '∅');
                if (!seenKeys.has(k)) { seenKeys.add(k); uniqSeeds.push(s); }
            }
            if (uniqSeeds.length) {
                const orConds = [];
                for (const s of uniqSeeds) {
                    const c = [];
                    c.push({ ref: ['file_ID'] }); (s.file_ID == null) ? c.push('is', 'null') : c.push('=', { val: s.file_ID }); c.push('and');
                    c.push({ ref: ['salesDocumentNoSAP'] }); (s.salesDocumentNoSAP == null) ? c.push('is', 'null') : c.push('=', { val: s.salesDocumentNoSAP }); c.push('and');
                    c.push({ ref: ['salesItemNoSAP'] }); (s.salesItemNoSAP == null) ? c.push('is', 'null') : c.push('=', { val: s.salesItemNoSAP }); c.push('and');
                    c.push({ ref: ['fgWorkOrderID'] }); (s.fgWorkOrderID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgWorkOrderID }); c.push('and');
                    c.push({ ref: ['fgInvoiceID'] }); (s.fgInvoiceID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgInvoiceID });
                    orConds.push(['(', ...c, ')']);
                }
                let whereExpr = orConds[0];
                for (let i = 1; i < orConds.length; i++) whereExpr = [...whereExpr, 'or', ...orConds[i]];
                const siblings = await SELECT.from(this.recordsEntity).columns(['ID']).where(whereExpr);
                const extra = siblings.map(s => s.ID).filter(id => !this.recordIDs.has(id));
                if (extra.length) {
                    for (const id of extra) this.recordIDs.add(id);
                    await this._fetchRecords(this.recordIDs);
                    LOG.info(`[processPurchaseOrder] expanded selection to ${this.recordIDs.size} grouped rows`);
                }
            }
        }
        // <<< keep group intact

        // AFTER
        let recs = this.records.filter(r => r.processLevel_code === '5');


        LOG.info(`[Step 5.1] Retrieved ${recs.length} records`);
        if (!recs.length) return {
            hasError: false,
            continue: true
        };

        // 5.2) Group records by SO|Item|WO|INV
        LOG.info('[Step 5.2] Grouping records');
        const groups = new Map();
        for (const r of recs) {
            const key = [r.salesDocumentNoSAP, r.salesItemNoSAP, r.fgWorkOrderID, r.fgInvoiceID].join('|');
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(r);
        }
        LOG.info(`[Step 5.2] Formed ${groups.size} groups`);

        const errorLogs = [],
            passed = [],
            failed = [];
        const poComm = new PurchaseOrder();

        for (const [key, lines] of groups.entries()) {
            const rec = lines[0];
            const vbeln = rec.salesDocumentNoSAP;
            const posnr = rec.salesItemNoSAP;

            let ebeln, poItem, isUpdate = false;

            LOG.info(`--- Group ${key} (SO=${vbeln}, Item=${posnr}) ---`);
            try {

                const soTop = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem'])
                        .where({
                            SalesOrder: vbeln
                        })
                        .orderBy('SalesOrderItem desc')
                );
                const soMax = soTop?.SalesOrderItem?.padStart(5, '0') || '00000';
                this.LOG.info(`5.3.x → using SO item as PO item = '${soMax}'`);
                const nextItem = soMax;


                // 5.3) GET SO header
                LOG.info('[Step 5.3] GET SO header');
                const soHdr = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns([
                            'SalesOrder', 'SalesOrderType', 'SalesOrderTypeInternalCode', 'SalesOrganization',
                            'DistributionChannel', 'OrganizationDivision', 'SalesGroup', 'SalesOffice',
                            'SalesDistrict', 'SoldToParty', 'CreationDate', 'CreatedByUser', 'LastChangeDate',
                            'SenderBusinessSystemName', 'ExternalDocumentID', 'LastChangeDateTime',
                            'ExternalDocLastChangeDateTime', 'PurchaseOrderByCustomer', 'PurchaseOrderByShipToParty',
                            'CustomerPurchaseOrderType', 'CustomerPurchaseOrderDate', 'SalesOrderDate',
                            'TotalNetAmount', 'OverallDeliveryStatus', 'TotalBlockStatus', 'OverallOrdReltdBillgStatus',
                            'OverallSDDocReferenceStatus', 'TransactionCurrency', 'SDDocumentReason', 'PricingDate',
                            'PriceDetnExchangeRate', 'BillingPlan', 'RequestedDeliveryDate', 'ShippingCondition',
                            'CompleteDeliveryIsDefined', 'ShippingType', 'HeaderBillingBlockReason',
                            'DeliveryBlockReason', 'DeliveryDateTypeRule', 'IncotermsClassification',
                            'IncotermsTransferLocation', 'IncotermsLocation1', 'IncotermsLocation2', 'IncotermsVersion',
                            'CustomerPriceGroup', 'PriceListType', 'CustomerPaymentTerms', 'PaymentMethod', 'FixedValueDate',
                            'AssignmentReference', 'ReferenceSDDocument', 'ReferenceSDDocumentCategory',
                            'AccountingDocExternalReference', 'CustomerAccountAssignmentGroup',
                            'AccountingExchangeRate', 'CustomerGroup', 'AdditionalCustomerGroup1',
                            'AdditionalCustomerGroup2', 'AdditionalCustomerGroup3', 'AdditionalCustomerGroup4',
                            'AdditionalCustomerGroup5', 'SlsDocIsRlvtForProofOfDeliv',
                            'CustomerTaxClassification1', 'CustomerTaxClassification2', 'CustomerTaxClassification3',
                            'CustomerTaxClassification4', 'CustomerTaxClassification5', 'CustomerTaxClassification6',
                            'CustomerTaxClassification7', 'CustomerTaxClassification8', 'CustomerTaxClassification9',
                            'TaxDepartureCountry', 'VATRegistrationCountry', 'SalesOrderApprovalReason',
                            'SalesDocApprovalStatus', 'OverallSDProcessStatus', 'TotalCreditCheckStatus',
                            'OverallTotalDeliveryStatus', 'OverallSDDocumentRejectionSts', 'BillingDocumentDate',
                            'ContractAccount', 'AdditionalValueDays', 'CustomerPurchaseOrderSuplmnt',
                            'ServicesRenderedDate', 'YY1_AlphanumericSalesO_SDH', 'YY1_ShipToParty_SDH',
                            'YY1_CustomSalesOrder_SDH', 'YY1_CustomBillingType_SDH'
                        ])
                        .where({
                            SalesOrder: vbeln
                        })
                );
                if (!soHdr) throw new Error(`Missing SO header for SalesOrder='${vbeln}'`);
                LOG.info(`[Step 5.3] soHdr=${JSON.stringify(soHdr)}`);

                //
                // 5.3) GET SO items
                LOG.info('[Step 5.3] GET SO items');
                const soItems = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns([
                            'SalesOrder', 'SalesOrderItem', 'HigherLevelItem', 'HigherLevelItemUsage',
                            'SalesOrderItemCategory', 'SalesOrderItemText', 'PurchaseOrderByCustomer',
                            'PurchaseOrderByShipToParty', 'UnderlyingPurchaseOrderItem', 'ExternalItemID',
                            'Material', 'MaterialByCustomer', 'PricingDate', 'PricingReferenceMaterial',
                            'BillingPlan', 'RequestedQuantity', 'RequestedQuantityUnit',
                            'RequestedQuantitySAPUnit', 'RequestedQuantityISOUnit', 'OrderQuantityUnit',
                            'OrderQuantitySAPUnit', 'OrderQuantityISOUnit', 'ConfdDelivQtyInOrderQtyUnit',
                            'ItemGrossWeight', 'ItemNetWeight', 'ItemWeightUnit', 'ItemWeightSAPUnit',
                            'ItemWeightISOUnit', 'ItemVolume', 'ItemVolumeUnit', 'ItemVolumeSAPUnit',
                            'ItemVolumeISOUnit', 'OriginallyRequestedMaterial', 'TransactionCurrency',
                            'NetAmount', 'TotalSDDocReferenceStatus', 'SDDocReferenceStatus',
                            'MaterialSubstitutionReason', 'MaterialGroup', 'MaterialPricingGroup',
                            'AdditionalMaterialGroup1', 'AdditionalMaterialGroup2',
                            'AdditionalMaterialGroup3', 'AdditionalMaterialGroup4',
                            'AdditionalMaterialGroup5', 'BillingDocumentDate', 'ContractAccount',
                            'AdditionalValueDays', 'ServicesRenderedDate', 'Batch', 'ProductionPlant',
                            'OriginalPlant', 'AltvBsdConfSubstitutionStatus', 'StorageLocation',
                            'DeliveryGroup', 'ShippingPoint', 'ShippingType', 'DeliveryPriority',
                            'DeliveryDateQuantityIsFixed', 'DeliveryDateTypeRule',
                            'IncotermsClassification', 'IncotermsTransferLocation',
                            'IncotermsLocation1', 'IncotermsLocation2', 'TaxAmount',
                            'ProductTaxClassification1', 'ProductTaxClassification2',
                            'ProductTaxClassification3', 'ProductTaxClassification4',
                            'ProductTaxClassification5', 'ProductTaxClassification6',
                            'ProductTaxClassification7', 'ProductTaxClassification8',
                            'ProductTaxClassification9', 'MatlAccountAssignmentGroup', 'CostAmount',
                            'CustomerPaymentTerms', 'FixedValueDate', 'CustomerGroup',
                            'SalesDocumentRjcnReason', 'ItemBillingBlockReason',
                            'SlsDocIsRlvtForProofOfDeliv', 'WBSElement', 'ProfitCenter',
                            'AccountingExchangeRate', 'ReferenceSDDocument',
                            'ReferenceSDDocumentItem', 'SDProcessStatus', 'DeliveryStatus',
                            'OrderRelatedBillingStatus', 'Subtotal1Amount', 'Subtotal2Amount',
                            'Subtotal3Amount', 'Subtotal4Amount', 'Subtotal5Amount',
                            'Subtotal6Amount', 'YY1_StrTimeMarkup_SD_SDI', 'YY1_DoubTimeMarkup_SD_SDI',
                            'YY1_LegacyPurchase_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_CustomURL_SDI',
                            'YY1_ExtensionUUID1_SDI', 'YY1_EEGroup_SD_SDI',
                            'YY1_DuplicateWeek_SD_SDI', 'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI',
                            'YY1_CommodityCode_SD_SDI', 'YY1_ExtensionUUID2_SDI',
                            'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_WNWorkOrder_SD_SDI', 'YY1_CategoryCode_SD_SDI',
                            'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI',
                            'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({
                            SalesOrder: vbeln
                        })
                );
                if (!Array.isArray(soItems) || soItems.length === 0) {
                    throw new Error(`No SO items for SalesOrder='${vbeln}'`);
                }

                // pad our incoming item number to 5 digits
                const paddedPosnr = posnr.padStart(5, '0');

                // find the exact match (after padding); if none, fall back to the first element
                let soItem = soItems.find(item =>
                    item.SalesOrderItem.padStart(5, '0') === paddedPosnr
                ) || soItems[0];

                // log which branch we hit
                if (soItem.SalesOrderItem.padStart(5, '0') === paddedPosnr) {
                    LOG.info(`[Step 5.3] Found matching SO item '${paddedPosnr}'`);
                } else {
                    LOG.info(`[Step 5.3] SO item '${paddedPosnr}' not found; using '${soItem.SalesOrderItem.padStart(5, '0')}'`);
                }

                LOG.info(`[Step 5.3] Mapping from SO item: ${JSON.stringify(soItem)}`);

                // 5.3b) GET dummy item 00010 for fallback defaults
                LOG.info('[Step 5.3b] GET dummy SO item 00010 for fallback defaults');
                const dummy = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns(['Material', 'WBSElement', 'ProfitCenter', 'OrderQuantityUnit', 'ProductionPlant', 'YY1_WNWorkOrder_SD_SDI'])
                        .where({
                            SalesOrder: vbeln,
                            SalesOrderItem: '00010'
                        })
                );
                if (!dummy) {
                    LOG.warn(`[Step 5.3b] Dummy item 00010 not found on SO='${vbeln}', some fallbacks may be missing`);
                } else {
                    LOG.info(`[Step 5.3b] dummy=${JSON.stringify(dummy)}`);
                }



                // 5.4) Locate existing PO by PDI
                LOG.info('[Step 5.4] Locate existing PO by YY1_SDDocumentPD_PDI=' + vbeln);
                const existing = await this.purchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder'])
                        .where({
                            YY1_SDDocumentPD_PDI: vbeln
                        })
                );
                if (existing) {
                    ebeln = existing.PurchaseOrder;
                    isUpdate = true;
                    // poItem = await getPurchaseOrderNextItem.call(this, ebeln);
                    LOG.info(`[Step 5.4] Found existing PO=${ebeln}, next item=${poItem}`);
                }

                //
                // 5.5) Fallback via SO‐item reference
                if (!ebeln) {
                    const soItmRef = await this.salesOrderAPI.executeQuery(
                        SELECT.one.from('A_SalesOrderItem')
                            .columns(['YY1_PurchasingDoc_SD_SDI'])
                            .where({
                                SalesOrder: vbeln,
                                SalesOrderItem: posnr
                            })
                    );
                    if (soItmRef?.YY1_PurchasingDoc_SD_SDI) {
                        ebeln = soItmRef.YY1_PurchasingDoc_SD_SDI;
                        isUpdate = true;
                        // poItem = await getPurchaseOrderNextItem.call(this, ebeln);
                        LOG.info(`[Step 5.5] Fallback PO=${ebeln}, next item=${poItem}`);
                    }
                }

                // 5.x) Decide create vs update, then get the next PO line
                isUpdate = Boolean(ebeln);
                poItem = await this.getNextLineItem(vbeln, ebeln);
                LOG.info(`5.x → ${isUpdate ? 'updating' : 'creating'} PO='${ebeln || '<new>'}', next item='${poItem}'`);

                //
                // 5.x) Delivery address
                LOG.info('[Step 5.x] fetching ship-to partner SH');
                const part = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderHeaderPartner')
                        .columns(['ReferenceBusinessPartner', 'AddressID', 'Customer'])
                        .where({
                            SalesOrder: vbeln,
                            PartnerFunction: 'SH'
                        })
                );
                if (!part) throw new Error(`Ship-to partner SH missing for SO ${vbeln}`);
                const bp = part.ReferenceBusinessPartner;
                const AddressID = part.AddressID;
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
                            .where({
                                BusinessPartner: bp
                            })
                    );
                    if (!addr) throw new Error(`No address found for BP='${bp}'`);
                    deliveryAddress = {
                        PurchaseOrder: ebeln,
                        PurchaseOrderItem: poItem,
                        ...addr
                    };
                }

                //
                // 5.x) Tax jurisdiction
                LOG.info(`[Step 5.x] fetching TaxJurisdiction for BP=${bp}`);
                const addrRes = await this.businessPartnerAPI.executeQuery(
                    SELECT.one.from('A_BusinessPartnerAddress')
                        .columns(['TaxJurisdiction'])
                        .where({
                            BusinessPartner: bp
                        })
                );
                const taxJur = addrRes?.TaxJurisdiction || rec.taxJurisdiction;
                LOG.info(`[Step 5.x] TaxJurisdiction='${taxJur}'`);

                //
                // 5.x) Supplier mapping (ZR → ZV → fallback)
                let supplier = null;
                try {
                    LOG.info('[Step 5.x] fetching partner entries for supplier mapping');
                    const partners = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrderHeaderPartner')
                            .columns(['PartnerFunction', 'Customer', 'Supplier', 'ReferenceBusinessPartner'])
                            .where({
                                SalesOrder: vbeln
                            })
                    );

                    // 1) Try ZR → mapping table
                    const zr = partners.find(p => p.PartnerFunction === 'ZR');
                    if (zr) {
                        const zp = zr.Customer || zr.ReferenceBusinessPartner;
                        LOG.info(`[Step 5.x] Found ZR=${zp}`);
                        const map = await this.businessPartnerAPI.executeQuery(
                            SELECT.one.from('A_CustSalesPartnerFunc')
                                .columns(['BPCustomerNumber'])
                                .where({
                                    Customer: zp,
                                    SalesOrganization: soHdr.SalesOrganization,
                                    PartnerFunction: 'ZR'
                                })
                        );
                        LOG.info(`[Step 5.x] ZR mapping result: ${JSON.stringify(map)}`);

                        if (map?.BPCustomerNumber) {
                            supplier = map.BPCustomerNumber;
                            LOG.info(`[Step 5.x] Using ZR‐mapped supplier=${supplier}`);
                        }
                        // ← new: if no table entry, fall back to the partner record’s own Supplier
                        else if (zr.Supplier) {
                            supplier = zr.Supplier;
                            LOG.info(`[Step 5.x] Fallback to ZR partner’s own Supplier=${supplier}`);
                        }
                    }

                    // 2) If still no supplier, try ZV partner
                    if (!supplier) {
                        const zv = partners.find(p => p.PartnerFunction === 'ZV');
                        if (zv) {
                            supplier = zv.Supplier || zv.ReferenceBusinessPartner || zv.Customer;
                            LOG.info(`[Step 5.x] Using ZV partner supplier=${supplier}`);
                        }
                    }
                    // } catch (e) {
                    //     LOG.warn(`[Step 5.x] supplier‐mapping error: ${e.message}`);
                    // }

                    // // 3) Generic fallback
                    // if (!supplier) {
                    //     supplier = rec.vendorSAP ||
                    //         soHdr.PurchaseOrderByCustomer ||
                    //         soHdr.SoldToParty ||
                    //         '';
                    //     LOG.info(`[Step 5.x] Falling back to supplier='${supplier}'`);
                    // }

                    // if (!supplier) {
                    //     throw new Error(`Missing supplier for ${rec.ID}`);
                    // }

                } catch (e) {
                    LOG.warn(`[Step 5.x] supplier‐mapping error: ${e.message}`);
                }

                // Strict: DO NOT fall back to header fields. Fail with an actionable reason.
                if (!supplier) {
                    let reason = 'no ZR mapping and no ZV supplier';

                    // Try to diagnose precisely so functional team knows what to fix.
                    try {
                        const partners = await this.salesOrderAPI.executeQuery(
                            SELECT.from('A_SalesOrderHeaderPartner')
                                .columns(['PartnerFunction', 'Supplier', 'Customer', 'ReferenceBusinessPartner'])
                                .where({ SalesOrder: vbeln })
                        );
                        const hasZR = partners.some(p => p.PartnerFunction === 'ZR');
                        const hasZV = partners.some(p => p.PartnerFunction === 'ZV');

                        if (!hasZR && !hasZV) {
                            reason = `no ZR/ZV partner maintained on SO ${vbeln}`;
                        } else if (hasZR) {
                            reason = `ZR present but no A_CustSalesPartnerFunc mapping for SalesOrg ${soHdr.SalesOrganization} `
                                + `and ZR.Supplier is empty`;
                        } else if (hasZV) {
                            reason = `ZV present but Supplier/ReferenceBusinessPartner/Customer are all empty`;
                        }
                    } catch (_) {
                        // keep default 'reason' if diagnosis query fails
                    }

                    throw new Error(`Missing supplier for ${reason}. Maintain ZR/ZV partner or ZR mapping and reprocess.`);
                }



                // //
                // // common mappings: net amount, etc.
                // const docCurr = soItem.TransactionCurrency ||
                //     soHdr.TransactionCurrency ||
                //     rec.currency ||
                //     'USD';

                // const qtyRaw = soItem.OrderQuantity ||
                //     soItem.RequestedQuantity ||
                //     soItem.ConfdDelivQtyInOrderQtyUnit;
                // const qty = qtyRaw != null ?
                //     parseFloat(qtyRaw) :
                //     lines.length;

                // // net-amount fallback chain
                // const netAmtRaw = soItem.Subtotal1Amount ||
                //     soItem.NetAmount ||
                //     soItem.CostAmount;
                // const netAmount = netAmtRaw != null ?
                //     parseFloat(netAmtRaw) :
                //     lines.reduce((s, l) => s + (+l.invLineAmount || 0), 0);

                // const taxCode = soItem.TaxCode ||
                //     rec.taxCode ||
                //     'I0';
                // const priceUnit = soItem.OrderQuantityUnit ||
                //     soItem.RequestedQuantityUnit ||
                //     rec.orderUnit ||
                //     'EA';
                // const plant = soItem.ProductionPlant ||
                //     '1200';
                // const material = soItem.Material ||
                //     soItem.OriginallyRequestedMaterial ||
                //     rec.material ||
                //     '100000416';

                // LOG.info(`[Step 5.3] Mapped qty=${qty}, netAmount=${netAmount}, priceUnit='${priceUnit}', plant='${plant}', material='${material}'`);

                // 5.3 — Mapping with source tracking
                // document currency
                let docCurr, docCurrSource;
                if (soItem.TransactionCurrency) {
                    docCurr = soItem.TransactionCurrency;
                    docCurrSource = 'soItem.TransactionCurrency';
                } else if (soHdr.TransactionCurrency) {
                    docCurr = soHdr.TransactionCurrency;
                    docCurrSource = 'soHdr.TransactionCurrency';
                } else if (rec.currency) {
                    docCurr = rec.currency;
                    docCurrSource = 'rec.currency';
                } else {
                    docCurr = 'USD';
                    docCurrSource = 'default USD';
                }
                LOG.info(`[Step 5.3] docCurr=${docCurr} (source: ${docCurrSource})`);

                // quantity
                let qtyRaw, qty, qtySource;
                if (soItem.OrderQuantity != null) {
                    qtyRaw = soItem.OrderQuantity;
                    qtySource = 'soItem.OrderQuantity';
                } else if (soItem.RequestedQuantity != null) {
                    qtyRaw = soItem.RequestedQuantity;
                    qtySource = 'soItem.RequestedQuantity';
                } else if (soItem.ConfdDelivQtyInOrderQtyUnit != null) {
                    qtyRaw = soItem.ConfdDelivQtyInOrderQtyUnit;
                    qtySource = 'soItem.ConfdDelivQtyInOrderQtyUnit';
                } else {
                    qtySource = 'fallback lines.length';
                }
                if (qtyRaw != null) {
                    qty = parseFloat(qtyRaw);
                } else {
                    qty = lines.length;
                }
                LOG.info(`[Step 5.3] qty=${qty} (source: ${qtySource})`);

                // net amount
                let netAmtRaw, netAmtSource, netAmount;
                if (soItem.Subtotal1Amount != null) {
                    netAmtRaw = soItem.Subtotal1Amount;
                    netAmtSource = 'soItem.Subtotal1Amount';
                } else if (soItem.NetAmount != null) {
                    netAmtRaw = soItem.NetAmount;
                    netAmtSource = 'soItem.NetAmount';
                } else if (soItem.CostAmount != null) {
                    netAmtRaw = soItem.CostAmount;
                    netAmtSource = 'soItem.CostAmount';
                } else {
                    netAmtSource = 'fallback lines.reduce';
                }
                if (netAmtRaw != null) {
                    netAmount = parseFloat(netAmtRaw);
                } else {
                    netAmount = lines.reduce((s, l) => s + (+l.invLineAmount || 0), 0);
                }
                LOG.info(`[Step 5.3] netAmount=${netAmount} (source: ${netAmtSource})`);

                // tax code
                let taxCode, taxCodeSource;
                if (soItem.TaxCode) {
                    taxCode = soItem.TaxCode;
                    taxCodeSource = 'soItem.TaxCode';
                } else if (rec.taxCode) {
                    taxCode = rec.taxCode;
                    taxCodeSource = 'rec.taxCode';
                } else {
                    taxCode = 'I0';
                    taxCodeSource = 'default I0';
                }
                LOG.info(`[Step 5.3] taxCode='${taxCode}' (source: ${taxCodeSource})`);

                // price unit
                let priceUnit, priceUnitSource;
                if (soItem.OrderQuantityUnit) {
                    priceUnit = soItem.OrderQuantityUnit;
                    priceUnitSource = 'soItem.OrderQuantityUnit';
                } else if (soItem.RequestedQuantityUnit) {
                    priceUnit = soItem.RequestedQuantityUnit;
                    priceUnitSource = 'soItem.RequestedQuantityUnit';
                } else if (rec.orderUnit) {
                    priceUnit = rec.orderUnit;
                    priceUnitSource = 'rec.orderUnit';
                } else {
                    priceUnit = 'EA';
                    priceUnitSource = 'default EA';
                }
                LOG.info(`[Step 5.3] priceUnit='${priceUnit}' (source: ${priceUnitSource})`);

                // plant
                let plant, plantSource;
                if (soItem.ProductionPlant) {
                    plant = soItem.ProductionPlant;
                    plantSource = 'soItem.ProductionPlant';
                } else {
                    plant = '1200';
                    plantSource = 'default 1200';
                }
                LOG.info(`[Step 5.3] plant='${plant}' (source: ${plantSource})`);

                // material
                let material, materialSource;
                if (soItem.Material) {
                    material = soItem.Material;
                    materialSource = 'soItem.Material';
                } else if (soItem.OriginallyRequestedMaterial) {
                    material = soItem.OriginallyRequestedMaterial;
                    materialSource = 'soItem.OriginallyRequestedMaterial';
                } else if (rec.material) {
                    material = rec.material;
                    materialSource = 'rec.material';
                } else {
                    material = '100000416';
                    materialSource = 'default 100000416';
                }
                LOG.info(`[Step 5.3] material='${material}' (source: ${materialSource})`);


                //
                // 5.6) CREATE new PO header + first item
                if (!ebeln) {
                    poItem = nextItem;
                    // normalize the incoming date string to YYYY-MM-DD:
                    // const weekEndIso = toODataDateOnly(soItem.YY1_WeekEnd_SD_SDI);

                    // then build the OData literal:
                    const weekEndOData = formatWeekEnd(soItem.YY1_WeekEnd_SD_SDI);
                    const headerPayload = {
                        PurchaseOrderType: 'ZMS',
                        CompanyCode: soHdr.SalesOrganization,
                        PurchasingOrganization: soHdr.SalesOrganization,
                        PurchasingGroup: soHdr.DistributionChannel,
                        // Supplier: soHdr.SoldToParty, //pass supplier fetched above
                        Supplier: supplier,
                        DocumentCurrency: docCurr,
                        _PurchaseOrderItem: [{
                            PurchaseOrderItem: poItem,
                            PurchaseOrderCategory: 'F',
                            Material: material,
                            Plant: plant,
                            PurchaseOrderQuantityUnit: priceUnit,
                            OrderQuantity: qty,
                            NetPriceQuantity: 1,
                            OrderPriceUnit: priceUnit,
                            DocumentCurrency: docCurr,
                            NetPriceAmount: netAmount,
                            TaxCode: taxCode,
                            TaxJurisdiction: taxJur,
                            YY1_SDDocumentPD_PDI: vbeln,
                            YY1_WNWorkOrder_PDI: soItem.YY1_WNWorkOrder_SD_SDI,
                            YY1_WeekEnd_PDI: weekEndOData,
                            YY1_WNInvoice_PDI: rec.fgInvoiceID,
                            AccountAssignmentCategory: 'Z',
                            _PurOrdAccountAssignment: [{
                                // PurchaseOrderItem: poItem,
                                AccountAssignmentNumber: '1',
                                GLAccount: rec.glAccountSAP || '615115',
                                ControllingArea: rec.controllingArea || 'A000',
                                WBSElementExternalID: soItem.WBSElement || rec.WBSElement,
                                Quantity: qty,
                                OrderQuantityUnit: priceUnit,
                                DocumentCurrency: docCurr,
                                PurgDocNetAmount: netAmount
                            }]
                            // _PurOrdPricingElement: [{
                            //     ConditionType: 'ZPAY',
                            //     ConditionRateAmount: netAmount
                            // }]
                        }]
                    };

                    LOG.info(`[Step 5.6] CREATE PO payload: ${JSON.stringify(headerPayload)}`);
                    const res = await poComm.createPurchaseOrder(headerPayload);
                    if (res.error) throw new Error(`PO create failed: ${JSON.stringify(res.error)}`);
                    // ←— new: as soon as we have a PO number, patch both SO‐items

                    // grab the new PO number
                    const newPo = res.PurchaseOrder;
                    LOG.info(`Created PO ${newPo}`);

                    // write it back to all records in this group
                    await UPDATE(this.recordsEntity)
                        .set({
                            purchaseDocumentNoSAP: newPo,
                            purchaseDocumentItemSAP: poItem
                        })
                        .where({
                            ID: lines.map(l => l.ID)
                        });

                    // back-link on the SO header (00010) and the real item
                    try {
                        await this.salesOrderAPI.patchSalesOrderItemV2({
                            SalesOrder: vbeln,
                            SalesOrderItem: '00010',
                            YY1_PurchasingDoc_SD_SDI: newPo
                        });
                        await this.salesOrderAPI.patchSalesOrderItemV2({
                            SalesOrder: vbeln,
                            SalesOrderItem: poItem,
                            YY1_PurchasingDoc_SD_SDI: newPo
                        });
                        LOG.info(`Back-linked SO=${vbeln} ↔ PO=${newPo} on items 00010 & ${poItem}`);
                    } catch (e) {
                        LOG.error(`[Step 5.6] back-linking SO→PO failed: ${e.message}`);
                        throw e;
                    }

                    // set ebeln so downstream code knows we just created
                    ebeln = newPo;
                }
                //
                // ── 5.7) UPDATE existing PO: add new line ──
                // if (isUpdate) {
                //     // ↓↓↓ FALLBACKS FOR ANY MISSING FIELDS ↓↓↓
                //     const companyCode = soHdr.SalesOrganization || rec.companyCodeSAP || '1200';
                //     const material = dummy?.Material || rec.material || '100000046';
                //     const plant = dummy?.Plant || rec.plant || '1200';
                //     const priceUnit = soItem?.OrderQuantityUnit || rec.orderUnit || 'LAB';
                //     const docCurr = soHdr.TransactionCurrency || rec.currency || 'USD';
                //     const taxCode = soItem?.TaxCode || rec.taxCode || 'I0';
                //     const taxJur = rec.taxJurisdiction || '2600000000';
                //     const glAccount = rec.glAccountSAP || '615115';
                //     const controllingArea = rec.controllingArea || 'A000';
                //     const wbsext = rec.WBSElement || dummy?.WBSElement || '400287686';
                //     const deliveryID = deliveryAddress?.DeliveryAddressID || '30613';
                // ↑↑↑ FALLBACKS FOR ANY MISSING FIELDS ↑↑↑

                // 1) compute your line values up front
                // const lineQty = qty; // e.g. 30
                // const unitPrice = parseFloat(rec.invLineAmount) || 0;
                // const rawTotal = lineQty * unitPrice;
                // const totalAmt = Number(rawTotal.toFixed(2)); // JS Number with 2 decimals

                if (isUpdate) {
                    // ↓↓↓ FALLBACKS FOR ANY MISSING FIELDS WITH SOURCE TRACKING ↓↓↓
                    let companyCode, companyCodeSource;
                    if (soHdr.SalesOrganization) {
                        companyCode = soHdr.SalesOrganization;
                        companyCodeSource = 'soHdr.SalesOrganization';
                    } else if (rec.companyCodeSAP) {
                        companyCode = rec.companyCodeSAP;
                        companyCodeSource = 'rec.companyCodeSAP';
                    } else {
                        companyCode = '1200';
                        companyCodeSource = 'default 1200';
                    }
                    LOG.info(`[Update] companyCode=${companyCode} (source: ${companyCodeSource})`);

                    let material, materialSource;
                    if (dummy?.Material) {
                        material = dummy.Material;
                        materialSource = 'dummy.Material';
                    } else if (rec.material) {
                        material = rec.material;
                        materialSource = 'rec.material';
                    } else {
                        material = '100000046';
                        materialSource = 'default 100000046';
                    }
                    LOG.info(`[Update] material=${material} (source: ${materialSource})`);

                    let plant, plantSource;
                    if (soItem?.ProductionPlant) {
                        plant = soItem.ProductionPlant;
                        plantSource = 'soItem.ProductionPlant';
                    } else if (dummy?.Plant) {
                        plant = dummy.Plant;
                        plantSource = 'dummy.Plant';
                    } else if (rec.plant) {
                        plant = rec.plant;
                        plantSource = 'rec.plant';
                    } else {
                        plant = '1200';
                        plantSource = 'default 1200';
                    }
                    LOG.info(`[Update] plant=${plant} (source: ${plantSource})`);


                    let priceUnit, priceUnitSource;
                    if (soItem?.OrderQuantityUnit) {
                        priceUnit = soItem.OrderQuantityUnit;
                        priceUnitSource = 'soItem.OrderQuantityUnit';
                    } else if (rec.orderUnit) {
                        priceUnit = rec.orderUnit;
                        priceUnitSource = 'rec.orderUnit';
                    } else {
                        priceUnit = 'LAB';
                        priceUnitSource = 'default LAB';
                    }
                    LOG.info(`[Update] priceUnit=${priceUnit} (source: ${priceUnitSource})`);

                    let docCurr, docCurrSource;
                    if (soHdr.TransactionCurrency) {
                        docCurr = soHdr.TransactionCurrency;
                        docCurrSource = 'soHdr.TransactionCurrency';
                    } else if (rec.currency) {
                        docCurr = rec.currency;
                        docCurrSource = 'rec.currency';
                    } else {
                        docCurr = 'USD';
                        docCurrSource = 'default USD';
                    }
                    LOG.info(`[Update] docCurr=${docCurr} (source: ${docCurrSource})`);

                    let taxCode, taxCodeSource;
                    if (soItem?.TaxCode) {
                        taxCode = soItem.TaxCode;
                        taxCodeSource = 'soItem.TaxCode';
                    } else if (rec.taxCode) {
                        taxCode = rec.taxCode;
                        taxCodeSource = 'rec.taxCode';
                    } else {
                        taxCode = 'I0';
                        taxCodeSource = 'default I0';
                    }
                    LOG.info(`[Update] taxCode=${taxCode} (source: ${taxCodeSource})`);

                    let taxJur, taxJurSource;
                    if (rec.taxJurisdiction) {
                        taxJur = rec.taxJurisdiction;
                        taxJurSource = 'rec.taxJurisdiction';
                    } else {
                        taxJur = '2600000000';
                        taxJurSource = 'default 2600000000';
                    }
                    LOG.info(`[Update] taxJur=${taxJur} (source: ${taxJurSource})`);

                    let glAccount, glAccountSource;
                    if (rec.glAccountSAP) {
                        glAccount = rec.glAccountSAP;
                        glAccountSource = 'rec.glAccountSAP';
                    } else {
                        glAccount = '615115';
                        glAccountSource = 'default 615115';
                    }
                    LOG.info(`[Update] glAccount=${glAccount} (source: ${glAccountSource})`);

                    let controllingArea, controllingAreaSource;
                    if (rec.controllingArea) {
                        controllingArea = rec.controllingArea;
                        controllingAreaSource = 'rec.controllingArea';
                    } else {
                        controllingArea = 'A000';
                        controllingAreaSource = 'default A000';
                    }
                    LOG.info(`[Update] controllingArea=${controllingArea} (source: ${controllingAreaSource})`);

                    let wbsext, wbsextSource;
                    if (rec.WBSElement) {
                        wbsext = rec.WBSElement;
                        wbsextSource = 'rec.WBSElement';
                    } else if (dummy?.WBSElement) {
                        wbsext = dummy.WBSElement;
                        wbsextSource = 'dummy.WBSElement';
                    } else {
                        wbsext = '400287686';
                        wbsextSource = 'default 400287686';
                    }
                    LOG.info(`[Update] WBSElementExternalID=${wbsext} (source: ${wbsextSource})`);

                    let deliveryID, deliveryIDSource;
                    if (deliveryAddress?.DeliveryAddressID) {
                        deliveryID = deliveryAddress.DeliveryAddressID;
                        deliveryIDSource = 'deliveryAddress.DeliveryAddressID';
                    } else {
                        deliveryID = '30613';
                        deliveryIDSource = 'default 30613';
                    }
                    LOG.info(`[Update] deliveryID=${deliveryID} (source: ${deliveryIDSource})`);





                    const lineQty = qty; // still comes from your mapped qty
                    // pull SO’s Subtotal1Amount for the line:
                    const soNet = parseFloat(soItem.Subtotal1Amount);
                    if (isNaN(soNet)) throw new Error(`Missing Subtotal1Amount on SO item ${soItem.SalesOrderItem}`);
                    const totalAmt = soNet;

                    poItem = nextItem;
                    // normalize the incoming date string to YYYY-MM-DD:
                    // const weekEndIso = toODataDateOnly(soItem.YY1_WeekEnd_SD_SDI);

                    // then build the OData literal:
                    const weekEndOData = formatWeekEnd(soItem.YY1_WeekEnd_SD_SDI);
                    const updPayload = {
                        PurchaseOrder: ebeln,
                        PurchaseOrderItem: poItem,
                        PurchaseOrderCategory: 'F',
                        CompanyCode: companyCode,
                        Material: material,
                        Plant: plant,

                        PurchaseOrderQuantityUnit: priceUnit,
                        OrderQuantity: lineQty,
                        NetPriceQuantity: lineQty,
                        OrderPriceUnit: priceUnit,
                        DocumentCurrency: docCurr,
                        YY1_SDDocumentPD_PDI: vbeln,
                        YY1_WNWorkOrder_PDI: soItem.YY1_WNWorkOrder_SD_SDI,
                        YY1_WeekEnd_PDI: weekEndOData,
                        YY1_WNInvoice_PDI: rec.fgInvoiceID,
                        NetPriceAmount: totalAmt,
                        TaxCode: taxCode,
                        TaxJurisdiction: taxJur,
                        AccountAssignmentCategory: 'Z',
                        _PurOrdAccountAssignment: [{
                            PurchaseOrderItem: poItem,
                            AccountAssignmentNumber: '1',
                            GLAccount: glAccount,
                            ControllingArea: controllingArea,
                            WBSElementExternalID: wbsext,
                            Quantity: lineQty,
                            OrderQuantityUnit: priceUnit,
                            DocumentCurrency: docCurr,
                            PurgDocNetAmount: totalAmt
                        }],
                        _DeliveryAddress: {
                            PurchaseOrder: ebeln,
                            PurchaseOrderItem: poItem,
                            DeliveryAddressID: deliveryID
                        }
                        // _PurOrdPricingElement: [{
                        //     ConditionType: 'ZPAY',
                        //     ConditionRateAmount: totalAmt
                        // }]
                    };

                    this.LOG.info(`5.7 → add PO line payload: ${JSON.stringify(updPayload)}`);
                    const lineRes = await poComm.createPurchaseOrderItem(ebeln, updPayload);
                    if (lineRes.error) throw new Error(`Add PO line failed: ${JSON.stringify(lineRes.error)}`);
                    // ←— new: patch the SO‐items again

                    // write back into your records table
                    await UPDATE(this.recordsEntity)
                        .set({
                            purchaseDocumentNoSAP: ebeln,
                            purchaseDocumentItemSAP: poItem
                        })
                        .where({ ID: lines.map(l => l.ID) });

                    passed.push(...lines.map(l => l.ID));

                    // ** back-link both the dummy header (00010) and the real line **
                    if (ebeln) {
                        const soNum = vbeln;
                        const realItem = poItem;

                        try {
                            LOG.info(`[Step 5.7] patch SO item 00010 → YY1_PurchasingDoc_SD_SDI=${ebeln}`);
                            await this.salesOrderAPI.patchSalesOrderItemV2({
                                SalesOrder: soNum,
                                SalesOrderItem: '00010',
                                YY1_PurchasingDoc_SD_SDI: ebeln
                            });

                            LOG.info(`[Step 5.7] patch SO item ${realItem} → YY1_PurchasingDoc_SD_SDI=${ebeln}`);
                            await this.salesOrderAPI.patchSalesOrderItemV2({
                                SalesOrder: soNum,
                                SalesOrderItem: realItem,
                                YY1_PurchasingDoc_SD_SDI: ebeln
                            });

                            LOG.info(`Back-linked SO=${soNum} ↔ PO=${ebeln} on items 0010 & ${realItem}`);
                        } catch (e) {
                            LOG.error(`[Step 5.7] back-linking SO→PO failed: ${e.message}`);
                            throw e;  // bubble up so outer catch marks this group failed
                        }
                    } else {
                        LOG.error(`Cannot back-link: no PO number returned`);
                    }
                }



                //
                // 5.8) Advance to MIRO
                await UPDATE(this.recordsEntity)
                    .set({
                        processLevel_code: 'B',
                        purchaseDocumentNoSAP: ebeln,
                        purchaseDocumentItemSAP: poItem
                    })
                    .where({
                        ID: lines.map(l => l.ID)
                    });
                passed.push(...lines.map(l => l.ID));

            } catch (e) {
                LOG.error(`[Group ${key}] FAILED → ${e.message}`);
                for (const l of lines) {
                    errorLogs.push({
                        record_ID: l.ID,
                        message: e.message
                    });
                    failed.push(l.ID);
                }
            }
        }


        // 5.9) Finalize
        LOG.info('[Step 5.9] Finalizing');
        if (failed.length) {
            await ProcessLogger.removeLogs(failed);
            await ProcessLogger.addLogs(errorLogs);
            await this.markRecordsValid('5', failed, false);
        }
        if (passed.length) {
            await this.markRecordsValid('B', passed, true);
        }
        this.updateExclusionSet({
            passed,
            failed,
            skipped: [],
            bBreakExecution
        });
        this.recordIDs = new Set(passed);
        LOG.info(`=== Step 5 END: passed=${passed.length}, failed=${failed.length} ===`);

        return {
            hasError: failed.length > 0,
            // continue: failed.length === 0
            continue: passed.length > 0
        };
    }


    /*** Step B: MIRO (Incoming Invoice) creation ***/
    async processSupplierInvoice(sProcessCode, bBreakExecution) {
        LOG.info(`[processSupplierInvoice] ENTRY (code=${sProcessCode})`);

        // Only run at step 'B'
        if (sProcessCode !== 'B') {
            LOG.info('[processSupplierInvoice] SKIP – not at MIRO step (B)');
            return { hasError: false, continue: true };
        }

        const toODataDate = d => {
            const ms = (d instanceof Date ? d : new Date(d)).getTime();
            return `/Date(${ms})/`;
        };

        // 1) reload our batch
        // await this._fetchRecords(this.recordIDs);
        // const toProcess = this.records.filter(r => r.processLevel_code === 'B');
        // LOG.info(`[processSupplierInvoice] ${toProcess.length} records to invoice`);

        // 1) reload our batch
        // BEFORE
        await this._fetchRecords(this.recordIDs);

        // >>> keep group intact (file_ID, purchaseDocumentNoSAP, purchaseDocumentItemSAP, fgWorkOrderID, fgInvoiceID)
        if (this.recordIDs && this.recordIDs.size) {
            const seeds = [];
            for (const id of this.recordIDs) {
                const r = this.records.find(x => x.ID === id);
                if (r) seeds.push(r);
            }
            const seenKeys = new Set(), uniqSeeds = [];
            for (const s of seeds) {
                const k = String(s.file_ID ?? '∅') + '|' + String(s.purchaseDocumentNoSAP ?? '∅') + '|' + String(s.purchaseDocumentItemSAP ?? '∅') + '|' + String(s.fgWorkOrderID ?? '∅') + '|' + String(s.fgInvoiceID ?? '∅');
                if (!seenKeys.has(k)) { seenKeys.add(k); uniqSeeds.push(s); }
            }
            if (uniqSeeds.length) {
                const orConds = [];
                for (const s of uniqSeeds) {
                    const c = [];
                    c.push({ ref: ['file_ID'] }); (s.file_ID == null) ? c.push('is', 'null') : c.push('=', { val: s.file_ID }); c.push('and');
                    c.push({ ref: ['purchaseDocumentNoSAP'] }); (s.purchaseDocumentNoSAP == null) ? c.push('is', 'null') : c.push('=', { val: s.purchaseDocumentNoSAP }); c.push('and');
                    c.push({ ref: ['purchaseDocumentItemSAP'] }); (s.purchaseDocumentItemSAP == null) ? c.push('is', 'null') : c.push('=', { val: s.purchaseDocumentItemSAP }); c.push('and');
                    c.push({ ref: ['fgWorkOrderID'] }); (s.fgWorkOrderID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgWorkOrderID }); c.push('and');
                    c.push({ ref: ['fgInvoiceID'] }); (s.fgInvoiceID == null) ? c.push('is', 'null') : c.push('=', { val: s.fgInvoiceID });
                    orConds.push(['(', ...c, ')']);
                }
                let whereExpr = orConds[0];
                for (let i = 1; i < orConds.length; i++) whereExpr = [...whereExpr, 'or', ...orConds[i]];
                const siblings = await SELECT.from(this.recordsEntity).columns(['ID']).where(whereExpr);
                const extra = siblings.map(s => s.ID).filter(id => !this.recordIDs.has(id));
                if (extra.length) {
                    for (const id of extra) this.recordIDs.add(id);
                    await this._fetchRecords(this.recordIDs);
                    LOG.info(`[processSupplierInvoice] expanded selection to ${this.recordIDs.size} grouped rows`);
                }
            }
        }
        // <<< keep group intact

        // AFTER
        const toProcess = this.records.filter(r => r.processLevel_code === 'B');

        LOG.info(`[processSupplierInvoice] ${toProcess.length} records to invoice`);


        // 2) group by PO|Item|WO|Invoice
        const groups = new Map();
        toProcess.forEach(r => {
            const key = [r.purchaseDocumentNoSAP, r.purchaseDocumentItemSAP, r.fgWorkOrderID, r.fgInvoiceID].join('|');
            (groups.get(key) || groups.set(key, []).get(key)).push(r);
        });
        LOG.info(`[processSupplierInvoice] ${groups.size} unique groups`);

        // 3) ensure communicator ready
        await this.supplierInvoiceAPI.initConnection();
        LOG.info('[processSupplierInvoice] supplierInvoiceAPI initialized');

        const errorLogs = [], passed = [], failed = [];

        // 4) process each group
        for (const [key, recs] of groups) {
            const rec = recs[0];
            const poNumber = rec.purchaseDocumentNoSAP;
            const poItem = rec.purchaseDocumentItemSAP;
            LOG.info(`→ MIRO for PO=${poNumber}, Item=${poItem}`);

            // fetch PO header
            const poHdr = await this.purchaseOrderAPI.executeQuery(
                SELECT.one.from('PurchaseOrder')
                    .columns(['CompanyCode', 'DocumentCurrency', 'Supplier', 'PaymentTerms'])
                    .where({ PurchaseOrder: poNumber })
            );
            if (!poHdr) {
                const msg = `PO ${poNumber} not found`;
                LOG.error(msg);
                recs.forEach(r => { errorLogs.push({ record_ID: r.ID, message: msg }); failed.push(r.ID); });
                continue;
            }

            let paymentBlockingReason;
            try {
                const lfa1Row = await this.supplierLFA1API.executeQuery(
                    SELECT.one
                        .from('YY1_Supplier_LFA1') // entity set per S/4: .../YY1_SUPPLIER_LFA1_CDS/YY1_Supplier_LFA1
                        .columns(['Supplier', 'SupplierStandardCarrierAccess'])
                        .where({ Supplier: poHdr.Supplier })
                );
                const carrier = lfa1Row?.SupplierStandardCarrierAccess;
                paymentBlockingReason = carrier ? String(carrier).trim().slice(0, 2).toUpperCase() : undefined;
            } catch (e) {
                LOG.error(`[processSupplierInvoice] Supplier LFA1 lookup failed for ${poHdr.Supplier}: ${e.message}`);
            }

            // fetch PO item
            const poIt = await this.purchaseOrderAPI.executeQuery(
                SELECT.one.from('PurchaseOrderItem')
                    .columns([
                        'OrderQuantity', 'NetPriceAmount',
                        'TaxCode', 'TaxJurisdiction',
                        'Plant', 'PurchaseOrderQuantityUnit', 'Material'
                    ])
                    .where({ PurchaseOrder: poNumber, PurchaseOrderItem: poItem })
            );
            if (!poIt) {
                const msg = `Item ${poItem} on PO ${poNumber} not found`;
                LOG.error(msg);
                recs.forEach(r => { errorLogs.push({ record_ID: r.ID, message: msg }); failed.push(r.ID); });
                continue;
            }

            // build MIRO payload
            const today = toODataDate(new Date());
            const payload = {
                CompanyCode: poHdr.CompanyCode,
                DocumentDate: today,
                PostingDate: today,
                SupplierInvoiceIDByInvcgParty: rec.fgInvoiceID,
                InvoicingParty: poHdr.Supplier,
                DocumentCurrency: poHdr.DocumentCurrency || 'USD',
                InvoiceGrossAmount: poIt.NetPriceAmount.toString(),
                PaymentTerms: poHdr.PaymentTerms,
                DueCalculationBaseDate: today,
                ReconciliationAccount: rec.reconciliationAccount || '212100',
                TaxIsCalculatedAutomatically: true,
                AssignmentReference: rec.fgInvoiceID,
                PaymentBlockingReason: paymentBlockingReason,
                to_SuplrInvcItemPurOrdRef: {
                    results: [{
                        SupplierInvoiceItem: '1',
                        PurchaseOrder: poNumber,
                        PurchaseOrderItem: poItem,
                        Plant: poIt.Plant,
                        TaxCode: poIt.TaxCode,
                        TaxJurisdiction: poIt.TaxJurisdiction,
                        DocumentCurrency: poHdr.DocumentCurrency || 'USD',
                        SupplierInvoiceItemAmount: poIt.NetPriceAmount.toString(),
                        PurchaseOrderQuantityUnit: poIt.PurchaseOrderQuantityUnit,
                        PurchaseOrderQtyUnitSAPCode: poIt.PurchaseOrderQuantityUnit,
                        PurchaseOrderQtyUnitISOCode: '_01',
                        QuantityInPurchaseOrderUnit: poIt.OrderQuantity.toString(),
                        PurchaseOrderPriceUnit: poIt.PurchaseOrderQuantityUnit,
                        PurchaseOrderPriceUnitSAPCode: poIt.PurchaseOrderQuantityUnit,
                        PurchaseOrderPriceUnitISOCode: '_01',
                        QtyInPurchaseOrderPriceUnit: poIt.OrderQuantity.toString()
                    }]
                },
                to_SuplrInvcItemMaterial: {
                    results: [{
                        SupplierInvoiceItem: '1',
                        Material: poIt.Material,
                        ValuationArea: poHdr.CompanyCode,
                        TaxCode: poIt.TaxCode,
                        TaxJurisdiction: poIt.TaxJurisdiction,
                        TaxCountry: rec.taxCountry || 'US',
                        TaxDeterminationDate: today,
                        DocumentCurrency: poHdr.DocumentCurrency || 'USD',
                        SupplierInvoiceItemAmount: '0.00',
                        QuantityUnit: poIt.PurchaseOrderQuantityUnit,
                        SuplrInvcItmQtyUnitSAPCode: poIt.PurchaseOrderQuantityUnit,
                        SuplrInvcItmQtyUnitISOCode: '',
                        Quantity: poIt.OrderQuantity.toString(),
                        DebitCreditCode: 'S'
                    }]
                }
            };

            // single MIRO attempt
            try {
                const resp = await this.supplierInvoiceAPI.createSupplierInvoice(payload);

                // log full response for debugging
                LOG.info(`Raw MIRO response → ${JSON.stringify(resp)}`);

                const { SupplierInvoice, FiscalYear } = resp;
                if (!SupplierInvoice || !FiscalYear) {
                    const msg = `Invalid MIRO response: ${JSON.stringify(resp)}`;
                    LOG.error(msg);
                    recs.forEach(r => errorLogs.push({ record_ID: r.ID, message: msg }));
                    failed.push(...recs.map(r => r.ID));
                    continue;
                }

                LOG.info(`MIRO succeeded: ${SupplierInvoice}/${FiscalYear}`);
                const ids = recs.map(r => r.ID);
                await UPDATE(this.recordsEntity)
                    .set({
                        processLevel_code: '9',
                        invoiceDocumentNoSAP: SupplierInvoice,
                        invoiceFiscalYearSAP: FiscalYear
                    })
                    .where({ ID: ids });
                passed.push(...ids);

            } catch (err) {
                // capture and log the raw error
                const raw = err.response ? err.response.data : err.toString();
                LOG.error(`MIRO failed: ${raw}`);
                recs.forEach(r => errorLogs.push({
                    record_ID: r.ID,
                    message: `MIRO error: ${raw}`
                }));
                failed.push(...recs.map(r => r.ID));
            }
        }

        // finalize
        LOG.info('[processSupplierInvoice] finalizing');
        if (failed.length) {
            await ProcessLogger.removeLogs(failed);
            await ProcessLogger.addLogs(errorLogs);
            await this.markRecordsValid('B', failed, false);
            await UPDATE(this.recordsEntity).set({ processLevel_code: 'B' }).where({ ID: failed });
        }
        if (passed.length) {
            await this.markRecordsValid('9', passed, true);
            await UPDATE(this.recordsEntity).set({ processLevel_code: '9' }).where({ ID: passed });
        }
        this.updateExclusionSet({ passed, failed, skipped: [], bBreakExecution });

        return { hasError: failed.length > 0, continue: true };
    }


    updateExclusionSet({
        passed = [],
        failed = [],
        skipped = [],
        bBreakExecution
    }) {
        // 1) let the base class do all the include/exclude work
        super.updateExclusionSet({
            passed,
            failed,
            skipped,
            bBreakExecution
        });

        // 2) then log how many remain
        LOG.info(
            `[FgtimeInvoice.updateExclusionSet] ` +
            `after step (break=${bBreakExecution}), ${this.recordIDs.size} IDs remain: ` +
            `[passed=${passed.join(',')}; failed=${failed.join(',')}; skipped=${skipped.map(r => r.ID).join(',')}]`
        );
    }

}

module.exports = FgtimeInvoice;