const cds = require('@sap/cds');
const moment = require('moment');
const LOG = cds.log('Monitor.Processor-Time Contractor 3');
const Processor = require('./BaseProcessor');
const ProcessLogger = require('../common/ProcessLogger');
const SalesOrderComm = require('../communicators/SalesOrder');
const EmpTimeData = require('../communicators/EmpTimeData');
const SalesVCData_1Comm = require('../communicators/SalesVCData_1');
const SalesVCData_2Comm = require('../communicators/SalesVCData_2');
const PurchaseOrder = require('../communicators/PurchaseOrder');
const {
    INSERT,
    SELECT,
    UPDATE
} = require('@sap/cds/lib/ql/cds-ql');
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const SupplierInvoiceComm = require('../communicators/SupplierInvoice');
const EmpCustInfoComm = require('../communicators/EmpCustInfo');
const SalesContractComm = require('../communicators/SalesContract');
const EnterpriseProjectComm = require('../communicators/EnterpriseProject');
const SupplierLFA1Comm = require('../communicators/SupplierLFA1');

class TimeContractor_3 extends Processor {
    constructor(options) {
        super(options);
        this.recordsEntity = 'com.aleron.monitor.Times';
        this.columnsForRecords = this._getColumnsForFetch();
        this.salesOrderAPI = null;
        this.salesVCData_1Api = null;
        this.salesVCData_2Api = null;
        this.supplierLFA1API = this.supplierLFA1API || new SupplierLFA1Comm();

    }

    _getColumnsForFetch() {
        return [
            'ID',
            'PORequiredSAP',
            'additionalDayOfWork',
            'area',
            'beginDate',
            'companyCode',
            'contractNo',
            'createdAt',
            'createdBy',
            'creditInvoiceSAP',
            'creditMemoICSAP',
            'creditMemoSAP',
            'creditRebillSAP',
            'creditSteps',
            'creditYearSAP',
            'customerFieldName1',
            'customerFieldName10',
            'customerFieldName11',
            'customerFieldName12',
            'customerFieldName13',
            'customerFieldName14',
            'customerFieldName15',
            'customerFieldName2',
            'customerFieldName3',
            'customerFieldName4',
            'customerFieldName5',
            'customerFieldName6',
            'customerFieldName7',
            'customerFieldName8',
            'customerFieldName9',
            'customerFieldValue1',
            'customerFieldValue10',
            'customerFieldValue11',
            'customerFieldValue12',
            'customerFieldValue13',
            'customerFieldValue14',
            'customerFieldValue15',
            'customerFieldValue2',
            'customerFieldValue3',
            'customerFieldValue4',
            'customerFieldValue5',
            'customerFieldValue6',
            'customerFieldValue7',
            'customerFieldValue8',
            'customerFieldValue9',
            'distributionChannelICSAP',
            'distributionChannelSAP',
            'email',
            'employeeNo',
            'employeeSubgroupSAP',
            'file_ID',
            'fiscalYearSAP',
            'invalidInvoiceNoWNSAP',
            'invoiceDocumentNoSAP',
            'invoiceNoWN',
            'invoiceNoWNSAP',
            'laborPurchaseOrder',
            'modifiedAt',
            'modifiedBy',
            'orderNo',
            'overrideAt',
            'overrideBy',
            'p2SalesDocumentNoSAP',
            'partnerFunctionSAP',
            'personnelNoSAP',
            'processLevel_code',
            'projectNumberICSAP',
            'projectNumberSAP',
            'projectUUID',
            'purchaseDocumentItem',
            'purchaseDocumentItemSAP',
            'purchaseDocumentNo',
            'purchaseDocumentNoSAP',
            'rejectReasonSalesOrderICSAP',
            'rejectReasonSalesOrderSAP',
            'rejected',
            'salesDocumentNoSAP',
            'salesDocumentType',
            'salesDocumentTypeSAP',
            'salesItemNo',
            'salesItemNoICSAP',
            'salesItemNoSAP',
            'salesOrderICSAP',
            'salesOrderICUpdateRequired',
            'shiftCustomerBillRateFirst',
            'shiftCustomerBillRateSecond',
            'shiftCustomerBillRateThird',
            'shiftCustomerDTBillRateFirst',
            'shiftCustomerDTBillRateSecond',
            'shiftCustomerDTBillRateThird',
            'shiftCustomerOTBillRateFirst',
            'shiftCustomerOTBillRateSecond',
            'shiftCustomerOTBillRateThird',
            'shiftDTFirst',
            'shiftDTSecond',
            'shiftDTThird',
            'shiftOTFirst',
            'shiftOTSecond',
            'shiftOTThird',
            'shiftRGFirst',
            'shiftRGSecond',
            'shiftRGThird',
            'shiftVendorDTPayRateFirst',
            'shiftVendorDTPayRateSecond',
            'shiftVendorDTPayRateThird',
            'shiftVendorOTPayRateFirst',
            'shiftVendorOTPayRateSecond',
            'shiftVendorOTPayRateThird',
            'shiftVendorPayRateFirst',
            'shiftVendorPayRateSecond',
            'shiftVendorPayRateThird',
            'tempusWorkOrder',
            'term',
            'tripNoSAP',
            'tripRequiredSAP',
            'valid',
            'vcData1UUID',
            'vcData2UUID',
            'weekEndDate',
            'workOrderType',
            'z42SAP'
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
    const F = ['contractNo','invoiceNoWN','employeeNo','tempusWorkOrder','salesDocumentType','orderNo','weekEndDate'];

    const orConds = uniqSeeds.map(s => {
        const and = [];
        for (const f of F) {
        and.push({ ref: [f] });
        const v = s[f];
        if (v == null) and.push('is','null');
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
        this.oAPI = this.salesOrderAPI.getConnection(); // If needed, just store the promise or connection
        LOG.info('[prepareCommunicators] salesOrderAPI communicator ready');

        // Purchase Order communicator
        this.purchaseOrderAPI = new PurchaseOrder();
        this.poAPI = this.purchaseOrderAPI.getConnection();
        LOG.info('[prepareCommunicators] purchaseOrderAPI communicator ready');

        this.salesVCData_1Api = new SalesVCData_1Comm();
        await this.salesVCData_1Api.getConnection();

        this.salesVCData_2Api = new SalesVCData_2Comm();
        await this.salesVCData_2Api.getConnection();




        // Business Partner communicator
        this.businessPartnerAPI = new BusinessPartnerComm();
        this.bpAPI = this.businessPartnerAPI.getConnection();
        LOG.info('[prepareCommunicators] businessPartnerAPI communicator ready');

        // Supplier Invoice communicator
        this.supplierInvoiceAPI = new SupplierInvoiceComm();
        this.siAPI = this.supplierInvoiceAPI.getConnection();
        LOG.info('[prepareCommunicators] supplierInvoiceAPI communicator ready');

        this.empCustInfoAPI = new EmpCustInfoComm();
        this.salesContractAPI = new SalesContractComm();

        // Employee‐TimeData communicator
        this.empTimeDataAPI = new EmpTimeData();
        if (typeof this.empTimeDataAPI.initConnection === 'function') {
            this.empTimeDataAPI.initConnection();
        }
        LOG.info('[prepareCommunicators] empTimeDataAPI communicator ready');

        this.enterpriseProjectAPI = new EnterpriseProjectComm();
        this.epAPI = this.enterpriseProjectAPI.getConnection();
        LOG.info('[prepareCommunicators] enterpriseProjectAPI communicator ready');
    }

    // • Validate (bBreakExecution === true):
    //   - Run validations for ALL levels [0,1,T,3,5,9,G,B].
    //   - Do NOT change processLevel_code or valid (only write error logs).
    //   - Do NOT delete existing logs; append new ones.
    // • Process All (bBreakExecution === false):
    //   - ONLY validate records at the CURRENT step sProcessCode (resume-from-here).
    //   - After validations:
    //       • Only for step '1': set valid=false for errored rows at 0/1.
    //       • Only for step '1': promote clean groups entirely at 0/1 → 'T'.
    async validateRecords(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        const step = String(sProcessCode || '').toUpperCase(); // normalize

        LOG.info(`[validateRecords] ENTRY (processCode=${step}, breakExecution=${bBreakExecution})`);

        // === State ===
        const aErrorLogs = [];
        const aFailedRecordIDs = [];
        const aPassedRecordIDs = [];
        const aSkippedRecords = [];

        const previewLogs = (logs, label = 'LOG PREVIEW') => {
            if (!logs?.length) return;
            LOG.info(`${label}: count=${logs.length}`);
            logs.slice(0, 5).forEach((e, i) => LOG.error(`  [${i + 1}] ID=${e.record_ID} → ${e.message}`));
            if (logs.length > 5) LOG.error(`  ... +${logs.length - 5} more`);
        };

        // ========= TRACE HELPERS (adds rich logs around every API call) =========
        const TRACE = String(process.env.VALIDATE_TRACE || '1') !== '0'; // VALIDATE_TRACE=0 to mute payload previews
        const cut = (v, n = 800) => {
            try {
                const s = typeof v === 'string' ? v : JSON.stringify(v);
                return s.length > n ? s.slice(0, n) + '…' : s;
            } catch {
                return String(v);
            }
        };
        const since = (t0) => `${Date.now() - t0}ms`;

        // Inspect cds SELECT to print the target (best-effort)
        const targetOf = (q) => {
            try {
                if (q && q.SELECT && q.SELECT.from) {
                    if (q.SELECT.from.ref) return q.SELECT.from.ref.map(r => (r.id || r)).join('.');
                    if (q.SELECT.from) return String(q.SELECT.from);
                }
            } catch { }
            return '<?>'
        };

        // Unified runner for API calls
        const runQuery = async (apiName, label, execFn, q) => {
            const t0 = Date.now();
            const target = targetOf(q);
            LOG.info(`[API] ${apiName} → ${label} :: target=${target}`);
            if (TRACE) LOG.info(`[API] ${apiName} → ${label} :: query=${cut(q)}`);
            try {
                const rows = await execFn(q);
                const count = Array.isArray(rows) ? rows.length : (rows ? 1 : 0);
                LOG.info(`[API] ${apiName} ← ${label} :: rows=${count} in ${since(t0)}`);
                if (TRACE && rows && rows.length) LOG.info(`[API] ${apiName} ← ${label} :: firstRow=${cut(rows[0])}`);
                return rows;
            } catch (e) {
                LOG.error(`[API] ${apiName} !! ${label} :: ERROR after ${since(t0)} → ${e.message}`);
                throw e;
            }
        };

        // Shorthands bound to your communicators
        const SO = (label, q) => runQuery('SalesOrderAPI', label, this.salesOrderAPI.executeQuery.bind(this.salesOrderAPI), q);
        const EMP = (label, q) => runQuery('EmpCustInfoAPI', label, this.empCustInfoAPI.executeQuery.bind(this.empCustInfoAPI), q);

        // ========= DATE NORMALIZATION (file '20250829', OData '/Date(…)/', ISO, Date) =========
        // Returns { ymd: 'YYYY-MM-DD', yyyymmdd: 'YYYYMMDD', tsUtcMidnight: number | null }
        const normDate = (v) => {
            if (v == null) return {
                ymd: null,
                yyyymmdd: null,
                tsUtcMidnight: null
            };

            // '/Date(1757808000000)/' pattern
            if (typeof v === 'string') {
                const s = v.trim();
                const m = s.match(/^\/Date\((\d+)\)\/$/);
                if (m) {
                    const ms = Number(m[1]);
                    return fromEpochMsUtc(ms);
                }
                // 'YYYYMMDD'
                if (/^\d{8}$/.test(s)) {
                    const y = Number(s.slice(0, 4));
                    const mth = Number(s.slice(4, 6)) - 1;
                    const d = Number(s.slice(6, 8));
                    return fromYMD(y, mth, d);
                }
                // 'YYYY-MM-DD'
                if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
                    const [y, mth, d] = s.split('-').map(Number);
                    return fromYMD(y, mth - 1, d);
                }
                // fallback: Date.parse-able
                const dt = new Date(s);
                if (!isNaN(dt)) {
                    return fromEpochMsUtc(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()));
                }
                return {
                    ymd: null,
                    yyyymmdd: null,
                    tsUtcMidnight: null
                };
            }

            // JS Date
            if (v instanceof Date) {
                return fromEpochMsUtc(Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()));
            }

            // Number epoch ms
            if (typeof v === 'number' && isFinite(v)) {
                return fromEpochMsUtc(v);
            }

            // unknown type → string cast attempt
            return normDate(String(v));
        };

        function fromYMD(y, mth, d) {
            const ts = Date.UTC(y, mth, d); // midnight UTC
            const ymd = `${y}-${String(mth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const yyyymmdd = `${y}${String(mth + 1).padStart(2, '0')}${String(d).padStart(2, '0')}`;
            return {
                ymd,
                yyyymmdd,
                tsUtcMidnight: ts
            };
        }

        function fromEpochMsUtc(ms) {
            const dt = new Date(ms);
            const y = dt.getUTCFullYear();
            const mth = dt.getUTCMonth();
            const d = dt.getUTCDate();
            return fromYMD(y, mth, d);
        }

        const sameDate = (a, b) => {
            const na = normDate(a);
            const nb = normDate(b);
            if (na.tsUtcMidnight == null || nb.tsUtcMidnight == null) return false;
            return na.tsUtcMidnight === nb.tsUtcMidnight;
        };

        const fmtYMD = (v) => normDate(v).ymd ?? String(v);

        // ——————————————————————————————————————————
        // STEP 0: InterfaceSteps & (conditional) CLEAR FILE-SCOPE LOGS
        // ——————————————————————————————————————————
        LOG.info(`STEP 0.1: Checking InterfaceSteps`);
        try {
            const {
                InterfaceSteps
            } = cds.entities('com.aleron.monitor');
            const steps = await SELECT.from(InterfaceSteps)
                .columns('process_code')
                .where({
                    interfaceType_ID: this.file.interfaceType_ID
                });
            LOG.info(`STEP 0.1 OUTPUT → stepsFound=${steps.length}`);
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
        } catch (e) {
            LOG.error(`STEP 0.1 FAILED (exception) → ${e.message}`);
            await ProcessLogger.addLogs([{
                record_ID: this.file.ID,
                message: `InterfaceSteps lookup failed: ${e.message}`
            }]);
            return {
                hasError: true,
                continue: false
            };
        }

        // CHANGE #1: only clear file-scope logs during Process-All
        if (!bBreakExecution) {
            LOG.info(`STEP 0.2: Clearing any existing logs for this batch (Process-All)`);
            await ProcessLogger.removeLogs([...this.recordIDs]);
            LOG.info(`STEP 0.2 DONE`);
        } else {
            LOG.info(`STEP 0.2: Validate mode → NOT clearing existing logs; will append`);
        }

        // ——————————————————————————————————————————
        // STEP 1: FETCH & SELECT
        // ——————————————————————————————————————————
        await this._fetchRecords(this.recordIDs);

        await this._expandSelectionToGroups();   // <<< keep group intact for “Process”

        const ALL_LEVELS = new Set(['0', '1', 'T', '3', '5', '9', 'G', 'B']);
        const PROCESS_ALL_FILTER = {
            '0': new Set(['0']),
            '1': new Set(['0', '1']),
            'T': new Set(['T']),
            '3': new Set(['3']),
            '5': new Set(['5']),
            '9': new Set(['9']),
            'G': new Set(['G']),
            'B': new Set(['B'])
        };

        const ALLOWED = bBreakExecution ? ALL_LEVELS : (PROCESS_ALL_FILTER[step] || new Set([step])); // default strict to given step

        LOG.info(`STEP 1: Selecting records → processLevel in [${[...ALLOWED].join(',')}] (mode=${bBreakExecution ? 'VALIDATE' : 'PROCESS-ALL'})`);

        const aRecordsForProcessing = [];
        const aRecordIDs = [];
        for (const rec of this.records) {
            const allowed = ALLOWED.has(String(rec.processLevel_code).toUpperCase());
            LOG.info(`Record ${rec.ID} → processLevel='${rec.processLevel_code}', valid='${rec.valid}' → ${allowed ? 'INCLUDED' : 'SKIPPED'}`);
            if (allowed) {
                aRecordsForProcessing.push(rec);
                aRecordIDs.push(rec.ID);
            } else {
                aSkippedRecords.push(rec);
            }
        }

        // CHANGE #2: only remove per-record logs during Process-All
        if (!bBreakExecution) {
            LOG.info(`STEP 1: Removing old logs for IDs=[${aRecordIDs.join(',')}] (Process-All)`);
            await ProcessLogger.removeLogs(aRecordIDs);
        } else {
            LOG.info(`STEP 1: Validate mode → NOT removing old logs for IDs; will append`);
        }

        if (!aRecordsForProcessing.length) {
            LOG.info(`STEP 1: No records to process at this step → EXIT`);
            return {
                hasError: false,
                continue: true
            };
        }
        LOG.info(`STEP 1: ${aRecordsForProcessing.length} records WILL be processed`);

        // ——————————————————————————————————————————
        // STEP 1.0x: Contract type enrichment (persist to feed UI)
        // ——————————————————————————————————————————
        LOG.info(`STEP 1.0x: Enriching tempusWorkOrder based on contract type rules`);
        for (const rec of aRecordsForProcessing) {
            try {
                LOG.info(`1.0x INPUT → ID=${rec.ID}, contractNo='${rec.contractNo}', tempusWorkOrder='${rec.tempusWorkOrder}'`);
                const csOrder = await SELECT.one
                    .from('com.aleron.monitor.CUSTOMERSALEORDERS')
                    .columns(['CONTRACTTYPE', 'CONTRACT'])
                    .where({
                        CONTRACT: rec.contractNo
                    });

                if (!csOrder) {
                    LOG.info(`1.0x SKIP → No CustomerSalesOrder found`);
                    continue;
                }
                const contractType = csOrder.CONTRACTTYPE;
                LOG.info(`1.0x FOUND → CONTRACTTYPE='${contractType}', CONTRACT='${csOrder.CONTRACT}'`);

                if (contractType === '1') {
                    const it = await SO('1.0x: find SO by WNWorkOrder + item 000010',
                        SELECT.from('A_SalesOrderItem').columns(['SalesOrder']).where({
                            YY1_WNWorkOrder_SD_SDI: rec.tempusWorkOrder,
                            SalesOrderItem: '000010'
                        }).limit(1)
                    );
                    LOG.info(`1.0x A_SalesOrderItem rows=${it.length}`);
                    if (it.length) {
                        const soNo = it[0].SalesOrder;
                        const hdr = await SO('1.0x: header → YY1_AlphanumericSalesO_SDH',
                            SELECT.from('A_SalesOrder').columns(['YY1_AlphanumericSalesO_SDH']).where({
                                SalesOrder: soNo
                            }).limit(1)
                        );
                        LOG.info(`1.0x A_SalesOrder rows=${hdr.length}`);
                        if (hdr.length && hdr[0].YY1_AlphanumericSalesO_SDH) {
                            const newWO = hdr[0].YY1_AlphanumericSalesO_SDH;
                            LOG.info(`1.0x REPLACE tempusWorkOrder '${rec.tempusWorkOrder}' → '${newWO}'`);
                            rec.tempusWorkOrder = newWO;
                            await UPDATE(this.recordsEntity).set({
                                tempusWorkOrder: newWO
                            }).where({
                                ID: rec.ID
                            });
                            LOG.info(`1.0x PERSISTED new tempusWorkOrder='${newWO}'`);
                        } else {
                            LOG.info(`1.0x No YY1_AlphanumericSalesO_SDH → no change`);
                        }
                    } else {
                        LOG.info(`1.0x No SalesOrderItem found → no change`);
                    }
                } else if (contractType === '2') {
                    const hdr2 = await SO('1.0x: find SO by AssignmentReference',
                        SELECT.from('A_SalesOrder').columns(['YY1_AlphanumericSalesO_SDH']).where({
                            AssignmentReference: rec.tempusWorkOrder
                        }).limit(1)
                    );
                    LOG.info(`1.0x A_SalesOrder(type2) rows=${hdr2.length}`);
                    if (hdr2.length && hdr2[0].YY1_AlphanumericSalesO_SDH) {
                        const newWO = hdr2[0].YY1_AlphanumericSalesO_SDH;
                        LOG.info(`1.0x REPLACE tempusWorkOrder '${rec.tempusWorkOrder}' → '${newWO}'`);
                        rec.tempusWorkOrder = newWO;
                        await UPDATE(this.recordsEntity).set({
                            tempusWorkOrder: newWO
                        }).where({
                            ID: rec.ID
                        });
                        LOG.info(`1.0x PERSISTED new tempusWorkOrder='${newWO}'`);
                    } else {
                        LOG.info(`1.0x No match in A_SalesOrder → no change`);
                    }
                } else {
                    LOG.info(`1.0x contractType='${contractType}' not handled → no change`);
                }
            } catch (err) {
                LOG.error(`STEP 1.0x FAILED for record ${rec.ID} → ${err.message}`);
                LOG.error(err.stack);
            }
        }
        LOG.info(`STEP 1.0x DONE → proceeding to Step 1.1 grouping`);

        // ——————————————————————————————————————————
        // STEP 1.1: GROUPING
        // ——————————————————————————————————————————
        LOG.info(`STEP 1.1: Grouping records for per-group validation (key includes weekEndDate)`);
        const groups = new Map(); // key -> array of records
        const makeKey = (r) => [r.contractNo, r.invoiceNoWN, r.employeeNo, r.tempusWorkOrder, r.salesDocumentType, r.orderNo, r.weekEndDate].join('|');

        for (const rec of aRecordsForProcessing) {
            const key = makeKey(rec);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(rec);
        }
        LOG.info(`STEP 1.1: formed ${groups.size} group(s)`);
        if (TRACE) {
            for (const [k, g] of groups.entries()) {
                LOG.info(`STEP 1.1 DETAIL → group='${k}' size=${g.length} ids=${g.map(x => x.ID).join(',')}`);
            }
        }

        // ——————————————————————————————————————————
        // STEP 1.2 / 1.3: VALIDATE per GROUP
        // ——————————————————————————————————————————
        for (const [key, grp] of groups.entries()) {
            const one = grp[0]; // representative

            // —— A) Mandatory checks
            {
                LOG.info(`Group '${key}' → STEP A: mandatory checks`);
                const mand = [{
                    cond: !one.invoiceNoWN,
                    msg: `WN Invoice Number is blank (invoiceNoWN='${one.invoiceNoWN ?? ''}')`
                },
                {
                    cond: !one.employeeNo,
                    msg: `Employee Number is blank (employeeNo='${one.employeeNo ?? ''}')`
                },
                {
                    cond: !one.contractNo,
                    msg: `Contract Number is blank (contractNo='${one.contractNo ?? ''}')`
                },
                {
                    cond: !one.beginDate,
                    msg: `Process Date (beginDate) is blank (beginDate='${one.beginDate ?? ''}')`
                },
                {
                    cond: !one.weekEndDate,
                    msg: `Week End Date is blank (weekEndDate='${one.weekEndDate ?? ''}')`
                },
                ];
                const fails = mand.filter(m => m.cond);
                if (fails.length) {
                    for (const {
                        msg
                    }
                        of fails) {
                        LOG.error(`STEP A FAILED → ${msg}`);
                        for (const r of grp) {
                            aErrorLogs.push({
                                record_ID: r.ID,
                                message: msg
                            });
                            if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                        }
                    }
                    LOG.error(`STEP A: Group '${key}' validation FAILED, skipping remaining checks`);
                    continue;
                }
                LOG.info(`STEP A PASSED`);
            }

            // —— B) Resolve Sales Order once per group
            let soNo = null;
            {
                LOG.info(`Group '${key}' → STEP B: lookup SalesOrder for WO='${one.tempusWorkOrder}'`);
                const byWn = await SO('B: via A_SalesOrderItem (YY1_WNWorkOrder + 000010)',
                    SELECT.from('A_SalesOrderItem').columns(['SalesOrder']).where({
                        YY1_WNWorkOrder_SD_SDI: one.tempusWorkOrder,
                        SalesOrderItem: '000010'
                    }).limit(1)
                );
                LOG.info(`STEP B OUTPUT → A_SalesOrderItem rows=${byWn.length}`);
                if (byWn.length) {
                    soNo = byWn[0].SalesOrder;
                    LOG.info(`Found via WNWorkOrder → SO='${soNo}'`);
                } else {
                    const bySo = await SO('B: via A_SalesOrder (YY1_AlphanumericSalesO_SDH)',
                        SELECT.from('A_SalesOrder').columns(['SalesOrder']).where({
                            YY1_AlphanumericSalesO_SDH: one.tempusWorkOrder
                        }).limit(1)
                    );
                    LOG.info(`STEP B OUTPUT → A_SalesOrder rows=${bySo.length}`);
                    if (bySo.length) {
                        soNo = bySo[0].SalesOrder;
                        LOG.info(`Found via SalesOrder match → SO='${soNo}'`);
                    }
                }
                if (!soNo) {
                    const msg = `No SalesOrder with item 000010 for WO='${one.tempusWorkOrder}'`;
                    LOG.error(`STEP B FAILED → ${msg}`);
                    for (const r of grp) {
                        aErrorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                    }
                    continue;
                }
                LOG.info(`STEP B PASSED → SO='${soNo}'`);
            }

            // —— B.2) DistributionChannel (group-level)
            let distCh = null;
            {
                LOG.info(`Group '${key}' → STEP B.2: fetching DistributionChannel for SO='${soNo}'`);
                const hdr = await SO('B.2: header DistributionChannel',
                    SELECT.from('A_SalesOrder').columns(['DistributionChannel']).where({
                        SalesOrder: soNo
                    }).limit(1)
                );
                LOG.info(`STEP B.2 OUTPUT → rows=${hdr.length} value='${hdr?.[0]?.DistributionChannel ?? ''}'`);
                if (!hdr.length || !hdr[0].DistributionChannel) {
                    const msg = `Could not retrieve DistributionChannel for SO='${soNo}'`;
                    LOG.error(`STEP B.2 FAILED → ${msg}`);
                    for (const r of grp) {
                        aErrorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                    }
                    continue;
                }
                distCh = hdr[0].DistributionChannel;
                LOG.info(`STEP B.2 PASSED → channel='${distCh}'`);
            }

            // —— B.3) Employee subgroup once (SO item → EMP_INFO → MS fallback)
            let empSubGrp = null;
            {
                LOG.info(`Group '${key}' → STEP B.3: resolving EMP_SUBGRP`);
                const itRows = await SO('B.3: item(000010) → YY1_EEGroup_SD_SDI',
                    SELECT.from('A_SalesOrderItem')
                        .columns(['YY1_EEGroup_SD_SDI'])
                        .where({
                            SalesOrder: soNo,
                            SalesOrderItem: '000010'
                        })
                        .limit(1)
                );
                LOG.info(`STEP B.3 OUTPUT (SO item) → rows=${itRows.length} value='${itRows?.[0]?.YY1_EEGroup_SD_SDI ?? ''}'`);
                if (itRows.length) {
                    const v = itRows[0].YY1_EEGroup_SD_SDI;
                    if (v != null && String(v).trim() !== '') empSubGrp = String(v).trim();
                }

                if (!empSubGrp) {
                    const empInfo = await EMP('B.3: EMP_INFO by WORKER_ID',
                        SELECT.from('YY1_EMPLOYEE_CUSTOMER_INFO')
                            .columns(['EMP_SUBGRP'])
                            .where({
                                WORKER_ID: one.employeeNo
                            })
                            .limit(1)
                    );
                    LOG.info(`STEP B.3 OUTPUT (EMP_INFO) → rows=${empInfo.length} value='${empInfo?.[0]?.EMP_SUBGRP ?? ''}'`);
                    if (empInfo.length && empInfo[0].EMP_SUBGRP) empSubGrp = String(empInfo[0].EMP_SUBGRP).trim();
                }

                if (!empSubGrp && distCh === 'MS') {
                    empSubGrp = '11';
                    LOG.warn(`STEP B.3: USING MS FALLBACK → subgroup='11'`);
                }

                if (!empSubGrp) {
                    const msg = `Employee subgroup not found (SO item, EMP_INFO, and MS fallback all empty)`;
                    LOG.error(`STEP B.3 FAILED → ${msg}`);
                    for (const r of grp) {
                        aErrorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                    }
                    continue;
                }

                LOG.info(`STEP B.3 PASSED → subgroup='${empSubGrp}'`);
            }

            // —— Persist UI fields for every record in the group
            {
                LOG.info(`PERSISTING header/item/subgroup for group size=${grp.length}`);
                const updates = grp.map(r => UPDATE(this.recordsEntity)
                    .set({
                        salesDocumentNoSAP: soNo,
                        distributionChannelSAP: distCh,
                        salesItemNoSAP: '000010',
                        employeeSubgroupSAP: empSubGrp
                    })
                    .where({
                        ID: r.ID
                    })
                );
                for (const u of updates) await u;
            }

            // ======= GROUP-WIDE LOGGING (C + D) =======
            const groupFailedIds = new Set();
            const groupFailMsgs = new Set();

            // —— C) Duplicate check (item-level: same SO, same invoice, same week end date on the same item)
            for (const r of grp) {
                LOG.info(`Group '${key}' → STEP C: item-level duplicate check (ID=${r.ID})`);
                LOG.info(`STEP C INPUT → r.invoiceNoWN='${r.invoiceNoWN}', r.weekEndDate='${r.weekEndDate}' (norm=${fmtYMD(r.weekEndDate)})`);

                const items = await SO(`C: items with invoice='${r.invoiceNoWN}' for SO='${soNo}'`,
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrderItem', 'YY1_WNInvoice_SD_SDI', 'YY1_WeekEnd_SD_SDI'])
                        .where({
                            SalesOrder: soNo,
                            YY1_WNInvoice_SD_SDI: r.invoiceNoWN
                        })
                );

                // Compare normalized dates
                let dup = false;
                for (const it of items || []) {
                    const lhs = it.YY1_WeekEnd_SD_SDI; // could be '/Date(..)/', 'YYYY-MM-DD', etc.
                    const eq = sameDate(lhs, r.weekEndDate);
                    LOG.info(`STEP C COMPARE → item=${it.SalesOrderItem} inv='${it.YY1_WNInvoice_SD_SDI}' weekEnd(item)='${lhs}' → norm='${fmtYMD(lhs)}' vs rec='${fmtYMD(r.weekEndDate)}' → equal=${eq}`);
                    if (eq) {
                        dup = true;
                        break;
                    }
                }

                LOG.info(`STEP C OUTPUT → matchingItems=${items?.length ?? 0}, dup=${dup}`);
                if (dup) {
                    const msg = `Duplicate for SO='${soNo}', Inv='${r.invoiceNoWN}', Date='${fmtYMD(r.weekEndDate)}' (item-level)`;
                    LOG.error(`STEP C FAILED → ${msg}`);
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg
                    });
                    if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                    groupFailedIds.add(r.ID);
                    groupFailMsgs.add(`STEP C FAILED → ${msg}`);
                    continue;
                }
                LOG.info(`STEP C PASSED (ID=${r.ID})`);
            }

            // —— D) Subgroup & rate validation
            for (const r of grp) {
                LOG.info(`Group '${key}' → STEP D: subgroup & rate validation (ID=${r.ID})`);
                const rawGrp = r.employeeSubgroupSAP || empSubGrp;
                const isZero = v => v == null || parseFloat(v) === 0;
                const anyRate = () => [
                    r.shiftRGFirst, r.shiftRGSecond, r.shiftRGThird,
                    r.shiftOTFirst, r.shiftOTSecond, r.shiftOTThird,
                    r.shiftDTFirst, r.shiftDTSecond, r.shiftDTThird,
                    r.shiftVendorPayRateFirst, r.shiftVendorPayRateSecond, r.shiftVendorPayRateThird,
                    r.shiftVendorOTPayRateFirst, r.shiftVendorOTPayRateSecond, r.shiftVendorOTPayRateThird,
                    r.shiftVendorDTPayRateFirst, r.shiftVendorDTPayRateSecond, r.shiftVendorDTPayRateThird
                ].some(v => !isZero(v));

                let derived = rawGrp;
                if (['8', '10'].includes(rawGrp)) derived = 'DAY';
                else if (['1', '3', '5', '12', '13'].includes(rawGrp)) derived = 'SAL';
                else if (['2', '4', '6', '7', '9', '11'].includes(rawGrp)) derived = 'HOU';
                else if (!isZero(r.shiftRGFirst) && !isZero(r.shiftVendorPayRateFirst)) derived = 'SAL';
                else if (anyRate()) derived = 'HOU';
                else {
                    const msg = 'Cannot determine subgroup or all rates zero';
                    LOG.error(`STEP D FAILED → ${msg}`);
                    aErrorLogs.push({
                        record_ID: r.ID,
                        message: msg
                    });
                    if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                    groupFailedIds.add(r.ID);
                    groupFailMsgs.add(`STEP D FAILED → ${msg}`);
                    continue;
                }
                LOG.info(`STEP D PASSED → raw='${rawGrp}', derived='${derived}'`);
                aPassedRecordIDs.push(r.ID);
            }

            // —— Propagate group failures
            if (groupFailMsgs.size > 0) {
                LOG.error(`GROUP-WIDE: At least one row failed in STEP C/D for group '${key}'. Propagating errors to all rows in the group.`);
                for (const r of grp) {
                    if (groupFailedIds.has(r.ID)) continue;
                    for (const msg of groupFailMsgs) {
                        aErrorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                    }
                    if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                }
            }

            LOG.info(`STEP E: Skipped processLevel_code/valid flips for group '${key}' (validate logic only)`);
        }

        // —————————————————————————————
        // STEP 2: size + future-date + week-alignment (Mon..Sun)
        // —————————————————————————————
        {
            LOG.info(`STEP 2: enforcing size + future-date + week alignment (Mon..Sun) rules`);

            const VERBOSE = (this && this.debugGrouping === true) || ((process.env.GROUPING_LOG || '').toLowerCase() === 'verbose');
            const source = aRecordsForProcessing;

            const parseDate = (v) => {
                const n = normDate(v);
                if (n.tsUtcMidnight == null) return null;
                const d = new Date(n.tsUtcMidnight);
                return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
            };

            const fmt = (d) => d ? `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}` : 'invalid';

            const explainAdw = (v) => {
                if (v == null) return {
                    present: false,
                    reason: 'empty'
                };
                const t = typeof v;
                if (t === 'boolean') return {
                    present: v === true,
                    reason: v ? 'boolean-true' : 'boolean-false'
                };
                if (t === 'number') return {
                    present: v !== 0,
                    reason: v !== 0 ? 'number-nonzero' : 'number-zero'
                };
                if (t === 'string') {
                    const s = v.trim();
                    if (s === '') return {
                        present: false,
                        reason: 'string-empty'
                    };
                    const l = s.toLowerCase();
                    if (['false', '0', 'no', 'n', 'none', 'na'].includes(l)) return {
                        present: false,
                        reason: `string-${l}`
                    };
                    if (['true', '1', 'yes', 'y', 't'].includes(l)) return {
                        present: true,
                        reason: `string-${l}`
                    };
                    if (/^\d{8}$/.test(s) || /^\d{4}-\d{2}-\d{2}$/.test(s) || /^\/Date\(\d+\)\/$/.test(s)) return {
                        present: true,
                        reason: 'date-like'
                    };
                    return {
                        present: true,
                        reason: 'string-nonempty'
                    };
                }
                return {
                    present: !!v,
                    reason: 'truthy-fallback'
                };
            };

            const grpMap = new Map();
            const dbgMap = new Map();
            for (const r of source) {
                const key = [r.contractNo, r.invoiceNoWN, r.employeeNo, r.tempusWorkOrder, r.salesDocumentType, r.orderNo, r.weekEndDate].join('|');

                const adw = explainAdw(r.additionalDayOfWork);
                if (!grpMap.has(key)) {
                    grpMap.set(key, []);
                    dbgMap.set(key, {
                        adwTrue: 0,
                        adwFalse: 0,
                        adwEmpty: 0
                    });
                }
                grpMap.get(key).push(r);

                const dbg = dbgMap.get(key);
                if (adw.present) dbg.adwTrue++;
                else if (adw.reason === 'empty' || adw.reason === 'string-empty') dbg.adwEmpty++;
                else dbg.adwFalse++;

                if (VERBOSE) LOG.info(`STEP 2 TRACE: rec ${r.ID} ADW='${r.additionalDayOfWork}' → present=${adw.present} (${adw.reason}) key='${key}'`);
            }

            for (const [key, grp] of grpMap.entries()) {
                const dbg = dbgMap.get(key);
                const expected = dbg.adwTrue > 0 ? 8 : 7;
                const actual = grp.length;

                LOG.info(`STEP 2 SIZE: group='${key}' → rows=${actual}, expected=${expected}, ADW:true=${dbg.adwTrue}, false=${dbg.adwFalse}, empty=${dbg.adwEmpty}`);
                if (actual !== expected) {
                    const msg = `Group size was ${actual}, expected ${expected} (ADW:true=${dbg.adwTrue}, false=${dbg.adwFalse}, empty=${dbg.adwEmpty})`;
                    for (const r of grp) {
                        aErrorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                    }
                }
            }

            const today = new Date(); // now
            const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
            for (const [key, grp] of grpMap.entries()) {
                const we = parseDate(grp[0].weekEndDate);
                if (we && we.getTime() > todayUTC.getTime()) {
                    const msg = `weekEndDate is in future`;
                    LOG.error(`STEP 2 FUTURE-DATE: group='${key}' today=${fmt(todayUTC)} weekEndDate=${fmt(we)} → BLOCK WHOLE GROUP`);
                    for (const r of grp) {
                        aErrorLogs.push({
                            record_ID: r.ID,
                            message: msg
                        });
                        if (!aFailedRecordIDs.includes(r.ID)) aFailedRecordIDs.push(r.ID);
                    }
                }
            }

            LOG.info(`STEP 2 DONE`);
        }

        // ——————————————————————————————————————————
        // STEP 3: Persist RESULTS
        // ——————————————————————————————————————————
        LOG.info(`STEP 3: preparing to write ${aErrorLogs.length} error log(s)`);
        previewLogs(aErrorLogs, 'STEP 3 LOGS TO WRITE');

        if (aErrorLogs.length) {
            // CHANGE #3:
            //  - Process-All: keep your current behavior (replace logs for these records this run).
            //  - Validate: DO NOT remove old logs → just append new ones.
            if (!bBreakExecution) {
                await ProcessLogger.removeLogs([...new Set(aErrorLogs.map(e => e.record_ID))]);
                LOG.info(`STEP 3: Process-All → old logs cleared for errored records, writing fresh logs`);
            } else {
                LOG.info(`STEP 3: Validate mode → NOT clearing old logs; appending new logs`);
            }

            await ProcessLogger.addLogs(aErrorLogs);

            if (!bBreakExecution && step === '1') {
                const failedSet = new Set(aFailedRecordIDs);
                const toInvalidate = aRecordsForProcessing
                    .filter(r => failedSet.has(r.ID) && (r.processLevel_code === '0' || r.processLevel_code === '1'))
                    .map(r => r.ID);

                if (toInvalidate.length) {
                    LOG.info(`STEP 3: setting valid=false for ${toInvalidate.length} errored record(s) at level 0/1`);
                    await UPDATE(this.recordsEntity).set({
                        valid: false
                    }).where({
                        ID: {
                            in: toInvalidate
                        }
                    });
                } else {
                    LOG.info(`STEP 3: no 0/1 records to invalidate`);
                }
            } else if (!bBreakExecution) {
                LOG.info(`STEP 3: Process-All at step '${step}' → NO valid flips (only step '1' can flip).`);
            } else {
                LOG.info(`STEP 3: Validate-only mode → DO NOT change valid`);
            }
        } else {
            LOG.info(`STEP 3: no errors → no log writes; no valid flips`);
        }

        // ——————————————————————————————————————————
        // STEP 3.5: Process-All → promotions (only at step '1')
        // ——————————————————————————————————————————
        if (!bBreakExecution && step === '1') {
            LOG.info(`STEP 3.5: Process-All step '1' → promote clean groups to 'T'`);

            const byGroup = new Map();
            for (const r of aRecordsForProcessing) {
                const k = [r.contractNo, r.invoiceNoWN, r.employeeNo, r.tempusWorkOrder, r.salesDocumentType, r.orderNo, r.weekEndDate].join('|');
                if (!byGroup.has(k)) byGroup.set(k, []);
                byGroup.get(k).push(r);
            }

            const failedSet = new Set(aFailedRecordIDs);
            const promotable = [];
            const toClearLogs = [];

            for (const [key, grp] of byGroup.entries()) {
                const hasFailure = grp.some(r => failedSet.has(r.ID));
                const allAtZeroOne = grp.every(r => r.processLevel_code === '0' || r.processLevel_code === '1');

                if (!hasFailure && allAtZeroOne) {
                    const ids = grp.map(r => r.ID);
                    promotable.push(...ids);
                    toClearLogs.push(...ids);
                    LOG.info(`STEP 3.5: Group '${key}' is CLEAN and all at 0/1 → promote ${ids.length} row(s) to 'T'`);
                } else if (!allAtZeroOne) {
                    LOG.warn(`STEP 3.5: Group '${key}' contains rows beyond 0/1 → NO PROMOTION`);
                } else {
                    LOG.warn(`STEP 3.5: Group '${key}' has errors → remain at current level`);
                }
            }

            if (promotable.length) {
                await ProcessLogger.removeLogs([...new Set(toClearLogs)]);
                await UPDATE(this.recordsEntity)
                    .set({
                        processLevel_code: 'T',
                        valid: true
                    })
                    .where({
                        ID: {
                            in: promotable
                        }
                    });
                LOG.info(`STEP 3.5: Promoted ${promotable.length} record(s) to 'T'`);
                this.recordIDs = new Set(promotable);
                // === STEP 3.6: Auto-chain the clean group(s) straight into PROCESS-TIME ===
                try {
                    LOG.info(`[STEP 3.6] Auto-chaining ${promotable.length} promoted row(s) into PROCESS-TIME`);
                    // Reuse your existing TIME handler; it will re-fetch and only touch 'T' rows in this.recordIDs
                    await this.processTime('T', /* bBreakExecution */ false);
                    LOG.info(`[STEP 3.6] PROCESS-TIME completed for promoted row(s)`);
                } catch (e) {
                    LOG.error(`[STEP 3.6] PROCESS-TIME failed: ${e.message}`);
                    // soft-fail: keep overall pipeline running; errors are already logged inside processTime
                }
            } else {
                LOG.info(`STEP 3.5: No groups eligible for promotion`);
            }
        } else if (!bBreakExecution) {
            LOG.info(`STEP 3.5: Process-All step '${step}' → NO promotions here (skip earlier steps).`);
        }

        // FINISH
        LOG.info(`[validateRecords] END: wrote ${aErrorLogs.length} error log(s); processLevel_code never changed in validate-mode; promotions/valid flips only at step '1' on Process-All`);
        // return {
        //     hasError: aFailedRecordIDs.length > 0,
        //     continue: aFailedRecordIDs.length === 0
        // };

        try {
            // re-fetch the batch so we can see newly promoted-to-‘T’ records
            await this._fetchRecords(this.recordIDs);

            const idsAtT = this.records
                .filter(r => r.processLevel_code === 'T' && r.rejected === false)
                .map(r => r.ID);

            if (idsAtT.length) {
                this.LOG.info(`[AUTO] validate → processTime: launching on ${idsAtT.length} record(s) at 'T'`);
                this.recordIDs = new Set(idsAtT);
                await this.processTime('T', false);
            } else {
                this.LOG.info('[AUTO] validate → processTime: nothing at T');
            }
        } catch (e) {
            this.LOG.error(`[AUTO] validate → processTime failed: ${e.message}`);
        }
        return {
            hasError: aFailedRecordIDs.length > 0,
            // Non-blocking: even with errors, let the pipeline continue.
            continue: true
        };
    }

    async processTime(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        LOG.info(`[processTime] ► ENTRY (processCode=${sProcessCode}, breakExecution=${bBreakExecution}, recordIDs=[${[...this.recordIDs].join(',')}])`);

        // ---------- Small helpers ----------
        const toTIMS6 = (hrs) => {
            const n = Math.max(0, Number(hrs) || 0);
            const h = Math.floor(n);
            const m = Math.round((n - h) * 60);
            return `${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
        };

        // employee types (subgroups) for which EmpTimeData POST must be skipped
        const SKIP_EMP_SUBGROUPS = new Set(['6', '11']);
        const normSubgrp = (v) => {
            if (v == null) return null;
            const s = String(v).trim();
            const n = Number(s);
            return Number.isFinite(n) ? String(n) : s; // '06' -> '6'
        };

        const toISODuration = (hrs) => {
            const n = Math.max(0, Number(hrs) || 0);
            const h = Math.floor(n);
            const m = Math.round((n - h) * 60);
            return `PT${String(h).padStart(2, '0')}H${String(m).padStart(2, '0')}M00S`;
        };
        const num = (v) => Number(v) || 0;
        const as2 = (v) => num(v).toFixed(2);

        // Normalize employee id key (avoid leading-zero mismatches)
        const normEmp = v => String(v ?? '').trim().replace(/^0+/, ''); // "000123" -> "123"

        // Previous-week window helpers (KEPT, but gate is disabled below)
        const toMoment = d => moment(d || undefined);
        const chooseOverride = (rec) => rec.overrideDate || rec.OVERRIDE_DATE || this.overrideDate || null;
        const inPreviousISOWeek = (dateStr, refStr) => {
            const ref = toMoment(refStr || undefined);
            const refStartPrev = ref.clone().startOf('isoWeek').subtract(1, 'week');
            const refEndPrev = ref.clone().endOf('isoWeek').subtract(1, 'week');
            const d = toMoment(dateStr);
            return d.isBetween(refStartPrev, refEndPrev, null, '[]');
        };

        // Builds bucket list
        const splitShiftBuckets = (rec) => {
            const buckets = [
                { hrs: num(rec.shiftRGFirst), type: '1001', isRG: true, tag: 'RG1' },
                { hrs: num(rec.shiftOTFirst), type: '1501', isRG: false, tag: 'OT1' },
                { hrs: num(rec.shiftDTFirst), type: '2001', isRG: false, tag: 'DT1' },
                { hrs: num(rec.shiftRGSecond), type: '1002', isRG: true, tag: 'RG2' },
                { hrs: num(rec.shiftOTSecond), type: '1502', isRG: false, tag: 'OT2' },
                { hrs: num(rec.shiftDTSecond), type: '2002', isRG: false, tag: 'DT2' },
                { hrs: num(rec.shiftRGThird), type: '1003', isRG: true, tag: 'RG3' },
                { hrs: num(rec.shiftOTThird), type: '1503', isRG: false, tag: 'OT3' },
                { hrs: num(rec.shiftDTThird), type: '2003', isRG: false, tag: 'DT3' },
            ];
            return buckets
                .filter(b => b.hrs > 0)
                .map(b => ({
                    type: b.type,
                    tag: b.tag,
                    attHours: as2(b.hrs),
                    endTime: toISODuration(b.hrs),
                    allocHours: b.isRG ? as2(b.hrs) : "0.00"
                }));
        };

        // ---------- STEP 0: Only run on “T” ----------
        if (sProcessCode !== 'T') {
            LOG.info('[processTime] SKIP – processCode != T');
            return { hasError: false, continue: true };
        }

        // ---------- STEP 1: Clear previous logs ----------
        LOG.info(`STEP 1: Clearing existing logs for records [${[...this.recordIDs].join(', ')}]`);
        await ProcessLogger.removeLogs([...this.recordIDs]);

        // ---------- STEP 2: Re-fetch latest batch ----------
        LOG.info(`STEP 2: Re-fetching records [${[...this.recordIDs].join(', ')}]`);
        await this._fetchRecords(this.recordIDs);

        await this._expandSelectionToGroups();

        LOG.info(`STEP 2: Retrieved ${this.records.length} records`);

        // ---------- STEP 3: Split into toProcess vs skipped ----------
        const toProcess = [];
        const skipped = [];
        for (const rec of this.records) {
            if (rec.processLevel_code === 'T') toProcess.push(rec);
            else skipped.push(rec);
        }
        LOG.info(`STEP 3: ${toProcess.length} to process, ${skipped.length} skipped (not at 'T')`);

        if (!toProcess.length) {
            LOG.info('STEP 3.1: No records to process → EXIT');
            return { hasError: false, continue: true };
        }

        // ---------- STEP 4: Fetch SalesContract & Project info ----------
        LOG.info('STEP 4: Fetching SalesContract & Project info');
        const contractIDs = [...new Set(toProcess.map(r => r.contractNo).filter(Boolean))];
        const rawEmpIDs = toProcess.map(r => r.employeeNo).filter(Boolean);
        const empIDs = [...new Set(rawEmpIDs.map(normEmp))];

        const mSales = new Map();
        const mProjects = new Map();
        const mSOByWorkOrder = new Map();
        const mSalesOfficeBySO = new Map();
        const mSalesOrgBySO = new Map();

        const errorLogs = [];
        const failed = [];

        try {
            const [salesSettled, projSettled] = await Promise.allSettled([
                this.salesContractAPI.executeQuery(
                    SELECT.from('SalesContract')
                        .columns(['SalesContract', 'SalesOffice', 'SalesOrganization'])
                        .where({ SalesContract: { in: contractIDs } })
                ),
                this.enterpriseProjectAPI.executeQuery(
                    SELECT.from('A_EnterpriseProject')
                        .columns(['YY1_Employee_PPH', 'Project'])
                        .where({ YY1_Employee_PPH: { in: empIDs } })
                )
            ]);

            // SALES
            if (salesSettled.status === 'fulfilled') {
                const salesList = salesSettled.value || [];
                salesList.forEach(c => mSales.set(c.SalesContract, c));

                const missingContracts = contractIDs.filter(id => !mSales.has(id));
                if (missingContracts.length) {
                    LOG.info(`STEP 4: Fallback by PurchaseOrderByCustomer for ${missingContracts.length} id(s) → ${missingContracts.join(', ')}`);
                    try {
                        const altList = await this.salesContractAPI.executeQuery(
                            SELECT.from('SalesContract')
                                .columns(['SalesContract', 'SalesOffice', 'SalesOrganization', 'PurchaseOrderByCustomer'])
                                .where({ PurchaseOrderByCustomer: { in: missingContracts } })
                        );
                        (altList || []).forEach(c => {
                            mSales.set(c.PurchaseOrderByCustomer, {
                                SalesContract: c.SalesContract,
                                SalesOffice: c.SalesOffice,
                                SalesOrganization: c.SalesOrganization
                            });
                        });
                        const stillMissing = contractIDs.filter(id => !mSales.has(id));
                        if (stillMissing.length) {
                            const msg = 'ERR_SALES_CONTRACT_NOT_FOUND_AFTER_FALLBACK';
                            LOG.warn(`STEP 4: ${msg} for ${stillMissing.length} contract(s) → ${stillMissing.join(', ')}`);
                            for (const rec of toProcess) {
                                if (rec.contractNo && stillMissing.includes(rec.contractNo)) {
                                    errorLogs.push({ record_ID: rec.ID, message: msg });
                                    failed.push(rec.ID);
                                }
                            }
                        }
                    } catch (e) {
                        const msg = `ERR_SALES_FALLBACK_FAILED: ${e.message || e}`;
                        LOG.error(`STEP 4 Fallback FAILED → ${msg}`);
                        for (const rec of toProcess) {
                            if (rec.contractNo && missingContracts.includes(rec.contractNo)) {
                                errorLogs.push({ record_ID: rec.ID, message: msg });
                                failed.push(rec.ID);
                            }
                        }
                    }
                }
            } else {
                const reason = salesSettled.reason?.message || String(salesSettled.reason || 'Unknown error');
                LOG.error(`STEP 4 SALES FETCH FAILED → ${reason}`);
                const msg = `ERR_SALES_FETCH_FAILED: ${reason}`;
                for (const rec of toProcess) {
                    if (rec.contractNo && contractIDs.includes(rec.contractNo)) {
                        errorLogs.push({ record_ID: rec.ID, message: msg });
                        failed.push(rec.ID);
                    }
                }
            }

            // PROJECTS
            if (projSettled.status === 'fulfilled') {
                const projList = projSettled.value || [];
                projList.forEach(p => mProjects.set(normEmp(p.YY1_Employee_PPH), p));
                const notFoundEmps = empIDs.filter(id => !mProjects.has(id));
                if (notFoundEmps.length) {
                    LOG.warn(`STEP 4: EnterpriseProject NOT FOUND for ${notFoundEmps.length} employee(s) → sample=${notFoundEmps.slice(0, 25).join(', ')}${notFoundEmps.length > 25 ? '...' : ''}`);
                }
            } else {
                const reason = projSettled.reason?.message || String(projSettled.reason || 'Unknown error');
                LOG.error(`STEP 4 PROJECT FETCH FAILED → ${reason}`);
                const msg = `ERR_PROJECT_FETCH_FAILED: ${reason}`;
                for (const rec of toProcess) {
                    const empKey = normEmp(rec.employeeNo);
                    if (empKey && empIDs.includes(empKey)) {
                        errorLogs.push({ record_ID: rec.ID, message: msg });
                        failed.push(rec.ID);
                    }
                }
            }

            LOG.info(`STEP 4: Loaded Sales=(${mSales.size}), Projects=(${mProjects.size}) (incl. fallback)`);
        } catch (e) {
            const msg = `ERR_STEP4_UNHANDLED: ${e.message || e}`;
            LOG.error(`STEP 4 FAILED → ${msg}`);
            for (const rec of toProcess) {
                errorLogs.push({ record_ID: rec.ID, message: msg });
                failed.push(rec.ID);
            }
        }

        // ---------- STEP 4a: Resolve SalesOffice/SalesOrganization via SalesOrder (Work Order) ----------
        LOG.info('STEP 4a: Resolving SalesOffice/SalesOrganization from SalesOrder for BusinessArea/CompanyCode fallback');
        const workOrders = [...new Set(toProcess.map(r => r.tempusWorkOrder).filter(Boolean))];

        if (this.salesOrderAPI && workOrders.length) {
            try {
                const soItems = await this.salesOrderAPI.executeQuery(
                    SELECT.from('A_SalesOrderItem')
                        .columns(['SalesOrder', 'YY1_WNWorkOrder_SD_SDI'])
                        .where({
                            YY1_WNWorkOrder_SD_SDI: { in: workOrders },
                            SalesOrderItem: '000010'
                        })
                );
                (soItems || []).forEach(it => {
                    if (it.YY1_WNWorkOrder_SD_SDI && it.SalesOrder) {
                        mSOByWorkOrder.set(it.YY1_WNWorkOrder_SD_SDI, it.SalesOrder);
                    }
                });

                const salesOrders = [...new Set((soItems || []).map(it => it.SalesOrder).filter(Boolean))];
                if (salesOrders.length) {
                    const soHeaders = await this.salesOrderAPI.executeQuery(
                        SELECT.from('A_SalesOrder')
                            .columns(['SalesOrder', 'SalesOffice', 'SalesOrganization'])
                            .where({ SalesOrder: { in: salesOrders } })
                    );
                    (soHeaders || []).forEach(h => {
                        if (h.SalesOrder) {
                            mSalesOfficeBySO.set(h.SalesOrder, h.SalesOffice);
                            mSalesOrgBySO.set(h.SalesOrder, h.SalesOrganization);
                        }
                    });
                }

                LOG.info(`STEP 4a: Mapped workOrders→SO: ${mSOByWorkOrder.size}, headers found: ${mSalesOfficeBySO.size}`);
            } catch (e) {
                LOG.warn(`STEP 4a FAILED → ${e.message}`);
            }
        } else {
            LOG.info('STEP 4a: Skipped (no salesOrderAPI or no workOrders)');
        }

        // ---------- STEP 5: Build time-entry payloads ----------
        LOG.info('STEP 5: Building time-entry payloads (previous-week gate DISABLED)');

        const insertables = []; // [{ rec, entry, bucketTag }]
        const records = [];
        const passed = [];

        const zeroHours = new Set(); // total zero (no buckets)
        const prevWeekSkip = new Set();

        const needPerRecord = new Map(); // record.ID -> #payloads planned
        const okPerRecord = new Map(); // record.ID -> #payloads succeeded

        // NEW: capture INSERTed SAP_UUIDs per record; we persist later into projectUUID
        const insertedUUIDsByRecord = new Map(); // ID -> string[]

        for (const rec of toProcess) {
            const errs = [];

            // Skip subgroup 6/11
            const subgrp = normSubgrp(rec.employeeSubgroupSAP);
            if (subgrp && SKIP_EMP_SUBGROUPS.has(subgrp)) {
                LOG.info(`STEP 5: Record ${rec.ID} employeeSubgroupSAP=${subgrp} → SKIP EmpTimeData POST`);
                records.push(rec);
                continue;
            }

            const ctr = mSales.get(rec.contractNo);
            let proj = mProjects.get(normEmp(rec.employeeNo));

            if (!ctr) errs.push('ERR_SALES_CONTRACT_NOT_FOUND');
            if (!proj) errs.push('ERR_PROJECT_NOT_FOUND');

            const refDate = chooseOverride(rec) || new Date();

            // const isPrevWeek = inPreviousISOWeek(rec.beginDate, refDate);
            const isPrevWeek = true;
            LOG.info(`STEP 5: Record ${rec.ID} date=${rec.beginDate} | OVERRIDE=${chooseOverride(rec) ? moment(chooseOverride(rec)).format('YYYY-MM-DD') : 'n/a'} | ref=${moment(refDate).format('YYYY-MM-DD')} | prevWeek=${isPrevWeek} (gate OFF)`);

            if (errs.length) {
                const msg = errs.join(', ');
                LOG.warn(`STEP 5: Missing data for record ${rec.ID} → ${msg}, NOT calling API`);
                records.push(rec);
                errorLogs.push({ record_ID: rec.ID, message: msg });
                failed.push(rec.ID);
                continue;
            }

            const buckets = splitShiftBuckets(rec);

            if (!buckets.length) {
                LOG.info(`STEP 5: Record ${rec.ID} has only zero-hour buckets → skipping API insert, will rely on group promotion`);
                zeroHours.add(rec.ID);
                records.push(rec);
                continue;
            }

            needPerRecord.set(rec.ID, buckets.length);
            okPerRecord.set(rec.ID, 0);

            const soFromWO = mSOByWorkOrder.get(rec.tempusWorkOrder);
            const businessArea = soFromWO ? mSalesOfficeBySO.get(soFromWO) : undefined;
            const salesOrg = soFromWO ? mSalesOrgBySO.get(soFromWO) : undefined;

            for (const b of buckets) {
                const payload = {
                    WORKER_ID: rec.employeeNo,
                    Subtype: b.type,
                    START_DATE: moment(rec.beginDate).format('YYYY-MM-DD'),
                    END_DATE: moment(rec.beginDate).format('YYYY-MM-DD'),
                    Type: b.type,
                    CAL_DAYS: "0.00",
                    ATT_HOURS: b.attHours,
                    PremiumIndicator: "0000",
                    Positionplans: "",
                    Logicalsystemfordocumentpers: "S4H",
                    StartofBreak: "PT00H00M00S",
                    EndofBreak: "PT00H00M00S",
                    PaidBreakPeriod: "0.00",
                    UnpaidBreakPeriod: "0.00",
                    StartofBreak2: "PT00H00M00S",
                    EndofBreak2: "PT00H00M00S",
                    PaidBreakPeriod2: "0.00",
                    UnpaidBreakPeriod2: "0.00",
                    CompanyCode: salesOrg || ctr.SalesOrganization,
                    BusinessArea: businessArea || ctr.SalesOffice,
                    ControllingArea: "1000",
                    WBSElement: rec.orderNo,
                    NumberofHoursforActivityAllo: b.allocHours, // RG bucket hours; "0.00" for OT/DT
                    END_TIME: b.endTime,
                };

                LOG.info(`STEP 5: Rec ${rec.ID} → Bucket ${b.tag} → Payload ${JSON.stringify(payload)}`);
                insertables.push({ rec, entry: payload, bucketTag: b.tag });
            }

            records.push(rec);
        }

        LOG.info(`STEP 5: Prepared payloads=${insertables.length} across records=${records.length}, zeroHourHeld=${zeroHours.size}, prevWeekSkips=${prevWeekSkip.size}`);

        // ---------- STEP 6: Insert YY1_TIME_INFO ----------
        LOG.info('STEP 6: Inserting into YY1_TIME_INFO');
        for (const { rec, entry, bucketTag } of insertables) {
            try {
                LOG.info(` → Record ${rec.ID}: EmpTimeData API INSERT (Subtype=${entry.Subtype}, Bucket=${bucketTag}, ATT_HOURS=${entry.ATT_HOURS})`);
                const res = await this.empTimeDataAPI.executeQuery(
                    INSERT.into('YY1_TIME_INFO_PA2002').entries(entry)
                );
                LOG.info(`   ← Rec ${rec.ID}, Bucket ${bucketTag}: Response ${JSON.stringify(res)}`);
                if (res.SAP_UUID) {
                    okPerRecord.set(rec.ID, (okPerRecord.get(rec.ID) || 0) + 1);
                    // CAPTURE UUID
                    const arr = insertedUUIDsByRecord.get(rec.ID) || [];
                    arr.push(res.SAP_UUID);
                    insertedUUIDsByRecord.set(rec.ID, arr);
                } else {
                    const msg = res.message || 'Unknown error';
                    errorLogs.push({ record_ID: rec.ID, message: `BUCKET ${bucketTag}: ${msg}` });
                }
            } catch (e) {
                LOG.error(`   ← Rec ${rec.ID}, Bucket ${bucketTag}: Insert failed → ${e.message}`);
                errorLogs.push({ record_ID: rec.ID, message: `BUCKET ${bucketTag}: ${e.message}` });
            }
        }

        // Persist projectUUID (comma-separated) per record, AFTER all inserts
        for (const [recId, uuids] of insertedUUIDsByRecord.entries()) {
            try {
                await UPDATE(this.recordsEntity).set({ projectUUID: uuids.join(',') }).where({ ID: recId });
                LOG.info(`STEP 6.1: Stored projectUUID for ID=${recId} → count=${uuids.length}`);
            } catch (e) {
                LOG.warn(`STEP 6.1: Failed to persist projectUUID for ID=${recId} → ${e.message}`);
            }
        }

        // Decide pass/fail per record (pre-group)
        for (const rec of records) {
            if (zeroHours.has(rec.ID) || prevWeekSkip.has(rec.ID)) continue;
            const need = needPerRecord.get(rec.ID) || 0;
            const ok = okPerRecord.get(rec.ID) || 0;
            if (need > 0 && ok === need) passed.push(rec.ID);
            else if (need > 0) failed.push(rec.ID);
        }

        // ---------- STEP 7: De-dupe passed vs failed ----------
        const passedSet = new Set(passed);
        failed.forEach(id => passedSet.delete(id));
        let finalPassed = [...passedSet];

        // ---------- STEP 7.1: Group-based promotion (all-or-nothing) ----------
        LOG.info(`STEP 7.1: Group-based promotion start`);
        const byGroup = new Map();
        const keyOf = (r) => [
            r.contractNo || '',
            r.invoiceNoWN || '',
            r.employeeNo || '',
            r.tempusWorkOrder || ''
        ].join('|');

        for (const r of records) {
            const k = keyOf(r);
            if (!byGroup.has(k)) byGroup.set(k, new Set());
            byGroup.get(k).add(r.ID);
        }

        const failedSet = new Set(failed);
        const groupPromoted = new Set();
        const groupFailed = new Set();

        for (const [key, idSet] of byGroup.entries()) {
            const ids = [...idSet];
            const hasFailure = ids.some(id => failedSet.has(id));

            LOG.info(`STEP 7.1: Group='${key}' → members=${ids.length}, failed=${hasFailure ? 'YES' : 'NO'}`);

            if (hasFailure) {
                ids.forEach(id => groupFailed.add(id));
                LOG.warn(`STEP 7.1: Group='${key}' FAILED → all ${ids.length} members marked invalid`);
            } else {
                ids.forEach(id => groupPromoted.add(id));
                LOG.info(`STEP 7.1: Group='${key}' PROMOTED → all ${ids.length} members marked valid`);
            }
        }

        // === NEW: If a group failed, roll back any previously successful inserts for every member ===
        if (groupFailed.size) {
            LOG.warn(`STEP 7.1 CLEANUP: Deleting previously inserted time rows for ${groupFailed.size} failed record(s)`);
            for (const recId of groupFailed) {
                const uuids = insertedUUIDsByRecord.get(recId) || [];
                // If not captured in-memory (edge), try from persisted projectUUID
                if (!uuids.length) {
                    const rec = records.find(r => r.ID === recId);
                    const persisted = (rec && typeof rec.projectUUID === 'string') ? rec.projectUUID : null;
                    if (persisted) uuids.push(...persisted.split(',').map(s => s.trim()).filter(Boolean));
                }
                for (const uuid of uuids) {
                    try {
                        LOG.info(`CLEANUP DELETE → ID=${recId} UUID=${uuid}`);
                        await this.empTimeDataAPI.executeQuery(
                            DELETE.from('YY1_TIME_INFO_PA2002').where({ SAP_UUID: uuid })
                        );
                    } catch (e) {
                        const msg = `CLEANUP_DELETE_FAILED for UUID=${uuid}: ${e.message}`;
                        LOG.error(msg);
                        errorLogs.push({ record_ID: recId, message: msg });
                    }
                }
                // Clear persisted UUIDs to avoid stale state
                try {
                    await UPDATE(this.recordsEntity).set({ projectUUID: null }).where({ ID: recId });
                } catch (e) {
                    LOG.warn(`CLEANUP: Failed to clear projectUUID for ID=${recId} → ${e.message}`);
                }
            }
        }

        // overwrite with final group-based results
        failed.splice(0, failed.length, ...groupFailed);
        finalPassed = [...groupPromoted];

        LOG.info(`STEP 7.1: Total group-passed=${finalPassed.length}, group-failed=${failed.length}`);

        // ---------- STEP 8: Write logs & valid flags ----------
        LOG.info(`STEP 8: Writing ${errorLogs.length} error log(s)`);
        if (errorLogs.length) {
            await ProcessLogger.addLogs(errorLogs);
            await this.markRecordsValid(sProcessCode, failed, false); // keep failures for retry
        }
        LOG.info(`STEP 8: Marking ${finalPassed.length} record(s) valid`);
        if (finalPassed.length) {
            await ProcessLogger.removeLogs(finalPassed);
            await this.markRecordsValid(sProcessCode, finalPassed, true);
        }

        // // ---------- STEP 9: Next processLevel_code for group-passed ----------
        // LOG.info('STEP 9: Assigning next processLevel_code (group-based)');
        // for (const rec of records) {
        //     if (finalPassed.includes(rec.ID)) {
        //         const next = (rec.distributionChannelSAP === 'IC') ? 'G' : '3';
        //         await UPDATE(this.recordsEntity).set({ processLevel_code: next }).where({ ID: rec.ID });
        //         LOG.info(` → Record ${rec.ID}: moved to next step '${next}'`);
        //     } else {
        //         LOG.info(` → Record ${rec.ID}: remains at 'T' (group not fully valid)`);
        //     }
        // }

        // ---------- STEP 9: Next processLevel_code for group-passed ----------
        LOG.info('STEP 9: Assigning next processLevel_code (group-based)');
        const idsTo3 = [];
        const idsToG = [];
        for (const rec of records) {
            if (finalPassed.includes(rec.ID)) {
                const next = (rec.distributionChannelSAP === 'IC') ? 'G' : '3';
                await UPDATE(this.recordsEntity).set({ processLevel_code: next }).where({ ID: rec.ID });
                LOG.info(` → Record ${rec.ID}: moved to next step '${next}'`);
                if (next === '3') idsTo3.push(rec.ID);
                else idsToG.push(rec.ID);
            } else {
                LOG.info(` → Record ${rec.ID}: remains at 'T' (group not fully valid)`);
            }
        }


        // ---------- STEP 10: Summary & exclusion ----------
        LOG.info(`[processTime] ◄ END (processed=${toProcess.length}, passed=${finalPassed.length}, failed=${failed.length}, skippedNotAtT=${skipped.length}, zeroHourHeld=${zeroHours.size}, prevWeekSkips=${prevWeekSkip.size})`);

        this.recordIDs = new Set(finalPassed);
        try {
            if (idsTo3.length) {
                LOG.info(`[AUTO] Chaining ${idsTo3.length} row(s) to processSalesOrder('3')`);
                this.recordIDs = new Set(idsTo3);
                await this.processSalesOrder('3', false);
            }
            if (idsToG.length) {
                LOG.info(`[AUTO] Chaining ${idsToG.length} row(s) to processIntercompanyso('G')`);
                this.recordIDs = new Set(idsToG);
                await this.processIntercompanyso('G', false);
            }
        } catch (e) {
            LOG.error(`[AUTO] processTime chaining failed: ${e.message}`);
        }

        return { hasError: failed.length > 0, continue: true };
    }


    // Step 3: Sales Order Update
    async processSalesOrder(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        LOG.info(`[processSalesOrder] ENTRY processSalesOrder (code=${sProcessCode}, break=${bBreakExecution})`);

        // date helpers
        const toODataDate = d => {
            if (!d) throw new Error(`Date is missing or undefined`);
            const m = require('moment')(d, ['YYYY-MM-DD', 'YYYYMMDD', 'YYYY/MM/DD'], true);
            if (!m.isValid()) throw new Error(`Invalid date format: ${d}`);
            return `/Date(${m.valueOf()})/`;
        };
        const toIsoDate = d => {
            if (!d) throw new Error(`Date is missing or undefined`);
            const m = require('moment')(d, ['YYYY-MM-DD', 'YYYYMMDD', 'YYYY/MM/DD'], true);
            if (!m.isValid()) throw new Error(`Invalid date format: ${d}`);
            return m.format('YYYY-MM-DDT00:00:00');
        };

        // ===== Interface-T style helpers & validation (ADDED) ===================
        const moment = require('moment');

        const fmtDecimal = (v) => {
            if (v === null || v === undefined || v === '') return '0.00';
            const n = Number(v);
            return Number.isFinite(n) ? n.toFixed(2) : null; // null => invalid
        };

        const fmtDateISO = (v) => {
            if (!v) return null;
            const m = moment(v, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true);
            return m.isValid() ? m.format('YYYY-MM-DD') : null;
        };

        const validateFormats = (obj, decSet, dateSet, which, recID, errs, LOGref) => {
            for (const [k, v] of Object.entries(obj)) {
                if (decSet.has(k)) {
                    if (!(v === null || v === '' || Number.isFinite(Number(v)))) {
                        const msg = `${which}: ${k} must be decimal (got '${v}')`;
                        LOGref.info(`[VC] ${msg} recID=${recID}`);
                        errs.push({ record_ID: recID, message: msg });
                    }
                }
                if (dateSet.has(k)) {
                    if (!(v === null || moment(v, 'YYYY-MM-DD', true).isValid())) {
                        const msg = `${which}: ${k} invalid date (got '${v}')`;
                        LOGref.info(`[VC] ${msg} recID=${recID}`);
                        errs.push({ record_ID: recID, message: msg });
                    }
                }
            }
        };

        // Validation sets (cover the fields we populate here)
        const DECIMAL_VC1 = new Set([
            'YY2_ACA_HRS', 'YY3_ACA_HRS_PRICE', 'YY4_ACA_TOTAL_HRS_PRICE',
            'YY100_SHIFT1_TOTAL_HRS_RG', 'YY101_SHIFT1_TOTAL_HRS_OT', 'YY102_SHIFT1_TOTAL_HRS_DB',
            'YY103_SHIFT2_TOTAL_HRS_RG', 'YY104_SHIFT2_TOTAL_HRS_OT', 'YY105_SHIFT2_TOTAL_HRS_DB',
            'YY106_SHIFT3_TOTAL_HRS_RG', 'YY107_SHIFT3_TOTAL_HRS_OT', 'YY108_SHIFT3_TOTAL_HRS_DB',
            'YY109_SHIFT1_PRICE_RG', 'YY110_SHIFT1_PRICE_OT', 'YY111_SHIFT1_PRICE_DB',
            'YY112_SHIFT2_PRICE_RG', 'YY113_SHIFT2_PRICE_OT', 'YY114_SHIFT2_PRICE_DB',
            'YY115_SHIFT3_PRICE_RG', 'YY116_SHIFT3_PRICE_OT', 'YY117_SHIFT3_PRICE_DB',
            'YY118_MARK_UP_RG', 'YY119_MARK_UP_OT', 'YY120_MARK_UP_DB',
            'YY121_SHIFT1_TOTAL_PRICE_RG', 'YY122_SHIFT1_TOTAL_PRICE_OT', 'YY123_SHIFT1_TOTAL_PRICE_DB',
            'YY124_SHIFT2_TOTAL_PRICE_RG', 'YY125_SHIFT2_TOTAL_PRICE_OT', 'YY126_SHIFT2_TOTAL_PRICE_DB',
            'YY127_SHIFT3_TOTAL_PAY_RG', 'YY128_SHIFT3_TOTAL_PAY_OT', 'YY129_SHIFT3_TOTAL_PAY_DB',
            'YY130_ADMIN_FEE_PRICE'
        ]);
        const DATE_VC1 = new Set(['YY8_WEEK_ENDING2']);

        const DECIMAL_VC2 = new Set([
            'YY251_SHIFT1_PAY_RATE_RG', 'YY252_SHIFT1_PAY_RATE_OT', 'YY253_SHIFT1_PAY_RATE_DB',
            'YY254_SHIFT2_PAY_RATE_RG', 'YY255_SHIFT2_PAY_RATE_OT', 'YY256_SHIFT2_PAY_RATE_DB',
            'YY257_SHIFT3_PAY_RATE_RG', 'YY258_SHIFT3_PAY_RATE_OT', 'YY259_SHIFT3_PAY_RATE_DB',
            'YY260_SHIFT1_TOTAL_PAY_RG', 'YY261_SHIFT1_TOTAL_PAY_OT', 'YY262_SHIFT1_TOTAL_PAY_DB',
            'YY263_SHIFT2_TOTAL_PAY_RG', 'YY264_SHIFT2_TOTAL_PAY_OT', 'YY265_SHIFT2_TOTAL_PAY_DB',
            'YY266_SHIFT3_TOTAL_PAY_RG', 'YY267_SHIFT3_TOTAL_PAY_OT', 'YY268_SHIFT3_TOTAL_PAY_DB',
            'YY135_DAILY_TOTAL_VENDOR', 'YY137_HOLIDAY_TOTAL_VENDOR', 'YY144_WEEKLY_CLOCK_FEE'
        ]);
        const DATE_VC2 = new Set(['YY241_CUST_BGRD_CHECK_DATE', 'YY232_CUST_SVC_DATE']);

        /** Z routing map (same as Interface-T) */
        const Z_MAP = Object.freeze({
            Z01: { target: 'YY216_CUST_BUSINESS_UNIT', vc: 2 },
            Z02: { target: 'YY217_CUST_CHARGE_NUMBER', vc: 2 },
            Z03: { target: 'YY250_CUST_COST_CENTER2', vc: 2 },
            Z04: { target: 'YY220_CUST_COMPANY_CODE', vc: 2 },
            Z05: { target: 'YY221_CUST_DEPT_NUMBER', vc: 2 },
            Z06: { target: 'YY222_CUST_DOTS_NUMBER', vc: 2 },
            Z07: { target: 'YY223_CUST_RUI', vc: 2 },
            Z08: { target: 'YY144_WEEKLY_CLOCK_FEE', vc: 2 }, // Z08 override
            Z09: { target: 'YY224_CUST_ACCT_NUMBER', vc: 2 },
            Z10: { target: 'YY225_CUST_BUDGET_CENTER', vc: 2 },
            Z11: { target: 'YY226_CUST_CON_NUMBER', vc: 2 },
            Z12: { target: 'YY227_CUST_VENDOR_NUMBER', vc: 2 },
            Z16: { target: 'YY228_CUST_ORG_CODE', vc: 2 },
            Z17: { target: 'YY229_CUST_LEGAL_ENTITY', vc: 2 },
            Z18: { target: 'YY230_CUST_ORACLE_NUMBER', vc: 2 },
            Z19: { target: 'YY231_CUST_UNIT_STORE_NUMBER', vc: 2 },
            Z24: { target: 'YY233_CUST_EMPLOYEE_NUMBER', vc: 2 },
            Z25: { target: 'YY234_CUST_AGREE_NUMBER', vc: 2 },
            Z26: { target: 'YY241_CUST_BGRD_CHECK_DATE', vc: 2 },
            Z27: { target: 'YY242_CUST_DIV_UNIT_NUMBER', vc: 2 },
            Z28: { target: 'YY236_CUST_FEPS_CODE', vc: 2 },
            Z29: { target: 'YY237_CUST_POSITION', vc: 2 },
            Z31: { target: 'YY235_CUST_TASK15', vc: 2 },
            Z32: { target: 'YY238_CUST_GL_CODE', vc: 2 },
            Z33: { target: 'YY240_CUST_BB_NUMBER', vc: 2 },
            Z34: { target: 'YY218_CUST_PROJECT_NUMBER', vc: 2 },
            Z35: { target: 'YY239_CUST_PURCHASE_AGREE', vc: 2 },
            Z37: { target: 'YY237_CUST_POSITION', vc: 2 },
            Z38:{target:'CUST_COMMODITY_CODE2',vc:2},
            Z39: { target: 'CUST_CATERGORY_CODE2', vc: 2 },
            Z40: { target: 'YY6_SC_LINE_ITEM_NUMBER', vc: 1 },
            Z42: { target: 'ACCELERATED_FEE_DISC_VEN', vc: 2 },
            Z43: { target: 'YY3_ACA_HRS_PRICE', vc: 1 },
            Z44: { target: 'YY118_MARK_UP_RG', vc: 1 },
            Z45: { target: 'YY119_MARK_UP_OT', vc: 1 },
            Z46: { target: 'YY120_MARK_UP_DB', vc: 1 },
            Z30: { target: 'SUPPLIER_INVOICE_NUMBER', vc: 2 }, // SUPPLIER'S INVOICE (SUBCON SCENARIO)
            Z36: { target: 'YY232_CUST_SVC_DATE', vc: 2 },
        });
        // =====================================================================

        // -------- Step 1: Validate process code --------
        if (sProcessCode !== '3') {
            LOG.info(`[processSalesOrder][Exit] Skipped: Process code not '3' (current: ${sProcessCode})`);
            return { hasError: false, continue: true };
        }

        // -------- Step 2: Fetch valid records for process level 3 --------
        LOG.info(`[processSalesOrder][Step 2] Fetching records at process level 3 and valid`);
        await this._fetchRecords(this.recordIDs);

        await this._expandSelectionToGroups();


        const recs = this.records.filter(r => r.processLevel_code === '3');
        if (!recs.length) {
            LOG.info(`[processSalesOrder][Step 2][Exit] No valid records found at level 3`);
            return { hasError: false, continue: true };
        }
        LOG.info(`[processSalesOrder][Step 2][Done] Fetched ${recs.length} valid records`);

        // -------- Step 3: Group records for SO processing --------
        LOG.info(`[processSalesOrder][Step 3] Grouping by contractNo, invoiceNoWN, employeeNo, tempusWorkOrder (+additionalDayOfWork when present)`);

        const hasAdw = v => v !== null && v !== undefined && String(v).trim() !== '';
        const groups = new Map();
        for (const r of recs) {
            const parts = [r.contractNo, r.invoiceNoWN, r.employeeNo, r.tempusWorkOrder];
            if (hasAdw(r.additionalDayOfWork)) parts.push(`ADW:${String(r.additionalDayOfWork).trim()}`);
            const key = parts.join('|');
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(r);
        }
        LOG.info(`[processSalesOrder][Step 3][Done] Grouped into ${groups.size} record sets`);

        // -------- Step 4: Process each group --------
        const shiftFields = [
            'shiftRGFirst', 'shiftOTFirst', 'shiftDTFirst',
            'shiftRGSecond', 'shiftOTSecond', 'shiftDTSecond',
            'shiftRGThird', 'shiftOTThird', 'shiftDTThird'
        ];
        const billFields = [
            'shiftCustomerBillRateFirst', 'shiftCustomerOTBillRateFirst', 'shiftCustomerDTBillRateFirst',
            'shiftCustomerBillRateSecond', 'shiftCustomerOTBillRateSecond', 'shiftCustomerDTBillRateSecond',
            'shiftCustomerBillRateThird', 'shiftCustomerOTBillRateThird', 'shiftCustomerDTBillRateThird'
        ];
        const suppFields = [
            'shiftVendorPayRateFirst', 'shiftVendorOTPayRateFirst', 'shiftVendorDTPayRateFirst',
            'shiftVendorPayRateSecond', 'shiftVendorOTPayRateSecond', 'shiftVendorDTPayRateSecond',
            'shiftVendorPayRateThird', 'shiftVendorOTPayRateThird', 'shiftVendorDTPayRateThird'
        ];

        // builds YY12..YY99 named day/shift fields for VC1 from the group's lines
        function buildVC1DailyShifts(lines) {
            const moment = require('moment');
            const perDate = new Map(); // 'YYYY-MM-DD' -> { s1:{rg,ot,db}, s2:{rg,ot,db}, s3:{rg,ot,db}, total }
            const num = v => (v == null || v === '' ? 0 : Number(v));

            for (const l of lines) {
                const d = moment(l.beginDate, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true);
                if (!d.isValid()) continue;
                const key = d.format('YYYY-MM-DD');
                if (!perDate.has(key)) {
                    perDate.set(key, {
                        s1: { rg: 0, ot: 0, db: 0 },
                        s2: { rg: 0, ot: 0, db: 0 },
                        s3: { rg: 0, ot: 0, db: 0 },
                        total: 0
                    });
                }
                const agg = perDate.get(key);
                // shift 1
                agg.s1.rg += num(l.shiftRGFirst);
                agg.s1.ot += num(l.shiftOTFirst);
                agg.s1.db += num(l.shiftDTFirst);
                // shift 2
                agg.s2.rg += num(l.shiftRGSecond);
                agg.s2.ot += num(l.shiftOTSecond);
                agg.s2.db += num(l.shiftDTSecond);
                // shift 3
                agg.s3.rg += num(l.shiftRGThird);
                agg.s3.ot += num(l.shiftOTThird);
                agg.s3.db += num(l.shiftDTThird);
                // total
                agg.total +=
                    num(l.shiftRGFirst) + num(l.shiftOTFirst) + num(l.shiftDTFirst) +
                    num(l.shiftRGSecond) + num(l.shiftOTSecond) + num(l.shiftDTSecond) +
                    num(l.shiftRGThird) + num(l.shiftOTThird) + num(l.shiftDTThird);
            }

            const days = Array.from(perDate.keys()).sort().slice(0, 8);
            const dayNums = ['DAY1', 'DAY2', 'DAY3', 'DAY4', 'DAY5', 'DAY6', 'DAY7', 'DAY8'];
            const dayWords = ['DAY_ONE', 'DAY_TWO', 'DAY_THREE', 'DAY_FOUR', 'DAY_FIVE', 'DAY_SIX', 'DAY_SEVEN', 'DAY_EIGHT'];

            const out = {};
            for (let i = 0; i < 8; i++) {
                const base = 12 + (11 * i); // 12, 23, 34, ...
                const dateIdx = base + 9; // 21, 32, 43, ...
                const workedIdx = base + 10; // 22, 33, 44, ...
                const dNum = dayNums[i];
                const dWord = dayWords[i];
                const d = days[i];
                const agg = d ? perDate.get(d) : null;

                out[`YY${base + 0}_${dNum}_SHIFT1_RG`] = agg ? Number(agg.s1.rg.toFixed(2)) : 0;
                out[`YY${base + 1}_${dNum}_SHIFT1_OT`] = agg ? Number(agg.s1.ot.toFixed(2)) : 0;
                out[`YY${base + 2}_${dNum}_SHIFT1_DB`] = agg ? Number(agg.s1.db.toFixed(2)) : 0;

                out[`YY${base + 3}_${dNum}_SHIFT2_RG`] = agg ? Number(agg.s2.rg.toFixed(2)) : 0;
                out[`YY${base + 4}_${dNum}_SHIFT2_OT`] = agg ? Number(agg.s2.ot.toFixed(2)) : 0;
                out[`YY${base + 5}_${dNum}_SHIFT2_DB`] = agg ? Number(agg.s2.db.toFixed(2)) : 0;

                out[`YY${base + 6}_${dNum}_SHIFT3_RG`] = agg ? Number(agg.s3.rg.toFixed(2)) : 0;
                out[`YY${base + 7}_${dNum}_SHIFT3_OT`] = agg ? Number(agg.s3.ot.toFixed(2)) : 0;
                out[`YY${base + 8}_${dNum}_SHIFT3_DB`] = agg ? Number(agg.s3.db.toFixed(2)) : 0;

                out[`YY${dateIdx}_${dWord}`] = d || null;
                out[`YY${workedIdx}_${dWord}_WORKED`] = (agg && agg.total > 0) ? '1' : '0';
            }
            return out;
        }

        const sumFields = (arr, fields) =>
            fields.reduce((totals, field) => {
                totals[field] = arr.reduce((sum, x) => sum + (+x[field] || 0), 0);
                return totals;
            }, {});

        const errorLogs = [], passed = [], failed = [];
        let groupCounter = 1;

        // ----- VC custom-field helpers (KEPT heading; RE-IMPLEMENTED for T) -------
        // (We no longer need VC1_PROPS/VC2_PROPS sets here because routing is from Z_MAP)

        function ensureMaxLen(v, max = 30) {
            if (v == null) return v;
            if (typeof v === 'number') return v;
            const s = String(v).trim();
            if (s.length <= max) return s;
            const cut = s.slice(0, max);
            try { (this?.LOG || console).warn?.(`[VC] Truncated value '${s}' → '${cut}' (${s.length}>${max})`); } catch { }
            return cut;
        }

        function buildCustomerVCFields(lines, cfvcMap) {
            // collect entries from record-level pairs customerFieldName1..15 / customerFieldValue1..15
            const src = (lines && lines[0]) || {};
            const outEntries = [];
            for (let i = 1; i <= 15; i++) {
                const zCode = src?.[`customerFieldName${i}`];
                const zValue = src?.[`customerFieldValue${i}`];
                if (!zCode || zValue == null) continue;

                // prefer explicit T routing via Z_MAP; if not present, fall back to cfvcMap’s fieldName
                const z = String(zCode).trim();
                const cfg = Z_MAP[z];
                let target = cfg?.target || cfvcMap.get(z); // fallback
                if (!target) continue;

                let val = ensureMaxLen.call(this, zValue, 30);
                if (DECIMAL_VC1.has(target) || DECIMAL_VC2.has(target)) val = fmtDecimal(val);
                if (DATE_VC1.has(target) || DATE_VC2.has(target)) val = fmtDateISO(val);

                outEntries.push({ target, vc: cfg?.vc || 2, value: val });
            }

            const bags = { VC1Fields: {}, VC2Fields: {} };
            for (const e of outEntries) {
                if (e.vc === 1) bags.VC1Fields[e.target] = e.value;
                else bags.VC2Fields[e.target] = e.value;
            }
            return bags;
        }
        // ----------------------------------------------------------------------

        for (const [key, lines] of groups.entries()) {
            if (!lines.length) {
                LOG.warn(`[processSalesOrder][Group ${groupCounter}] Empty lines array, skipping group ${key}`);
                groupCounter++;
                continue;
            }
            const rec = lines[0];
            const isEightDayWeek = lines.some(l => hasAdw(l.additionalDayOfWork));

            try {
                // 4.1: Fetch SO header
                const vbeln = rec.salesDocumentNoSAP;
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.1] Fetch SO header for SalesOrderNo=${vbeln}`);
                const soHeader = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns(['SalesOrder', 'ReferenceSDDocument', 'SalesOrganization', 'DistributionChannel'])
                        .where({ SalesOrder: vbeln })
                );
                if (!soHeader) throw new Error(`SalesOrder ${vbeln} not found`);

                const distChannel = soHeader.DistributionChannel;
                const pricingConditionType = ['IC', 'CP', 'CR'].includes(distChannel) ? 'ZLAB' : 'ZPAY';
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.1] DistributionChannel=${distChannel}, ConditionType=${pricingConditionType}`);

                // 4.2: Fetch dummy item
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.2] Fetch dummy item 000010 for SO ${vbeln}`);
                const dummy = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns([
                            'Material', 'WBSElement', 'ProfitCenter',
                            'YY1_EEGroup_SD_SDI', 'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI',
                            'YY1_StrTimeMarkup_SD_SDI', 'YY1_DoubTimeMarkup_SD_SDI',
                            'YY1_LegacyPurchase_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_CustomURL_SDI',
                            'YY1_ExtensionUUID1_SDI', 'YY1_DuplicateWeek_SD_SDI',
                            'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI', 'YY1_CommodityCode_SD_SDI',
                            'YY1_ExtensionUUID2_SDI', 'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_CategoryCode_SD_SDI', 'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({ SalesOrder: vbeln, SalesOrderItem: '000010' })
                );
                if (!dummy) throw new Error(`Dummy item 000010 not found for SO ${vbeln}`);

                LOG.info(`[processSalesOrder][Group ${groupCounter}] Locating existing PO by PDI for SO='${vbeln}'`);
                const poRec = await this.purchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder'])
                        .where({ YY1_SDDocumentPD_PDI: vbeln })
                );
                const poNo = poRec?.PurchaseOrder || '';
                LOG.info(poNo
                    ? `[processSalesOrder][Group ${groupCounter}] Found PO='${poNo}'`
                    : `[processSalesOrder][Group ${groupCounter}] No existing PO for SO='${vbeln}', will create new.`
                );

                const nextSO = await this.getNextLineItem(vbeln, poNo);
                LOG.info(`[processSalesOrder][Group ${groupCounter}] Next SO/PO line → ${nextSO}`);

                // 4.4: Calculate totals
                let totalSale = 0, totalHours = 0;
                for (const l of lines) {
                    const rg1 = +l.shiftRGFirst || 0, ot1 = +l.shiftOTFirst || 0, dt1 = +l.shiftDTFirst || 0;
                    const rg2 = +l.shiftRGSecond || 0, ot2 = +l.shiftOTSecond || 0, dt2 = +l.shiftDTSecond || 0;
                    const rg3 = +l.shiftRGThird || 0, ot3 = +l.shiftOTThird || 0, dt3 = +l.shiftDTThird || 0;
                    const hrs = rg1 + ot1 + dt1 + rg2 + ot2 + dt2 + rg3 + ot3 + dt3;
                    totalHours += hrs;

                    const rateRG1 = +l.shiftCustomerBillRateFirst || 0,
                        rateOT1 = +l.shiftCustomerOTBillRateFirst || 0,
                        rateDT1 = +l.shiftCustomerDTBillRateFirst || 0;
                    const rateRG2 = +l.shiftCustomerBillRateSecond || 0,
                        rateOT2 = +l.shiftCustomerOTBillRateSecond || 0,
                        rateDT2 = +l.shiftCustomerDTBillRateSecond || 0;
                    const rateRG3 = +l.shiftCustomerBillRateThird || 0,
                        rateOT3 = +l.shiftCustomerOTBillRateThird || 0,
                        rateDT3 = +l.shiftCustomerDTBillRateThird || 0;

                    totalSale += rg1 * rateRG1 + ot1 * rateOT1 + dt1 * rateDT1
                        + rg2 * rateRG2 + ot2 * rateOT2 + dt2 * rateDT2
                        + rg3 * rateRG3 + ot3 * rateOT3 + dt3 * rateDT3;
                }
                const costAmount = Number(totalSale.toFixed(2));
                const safeSale = costAmount > 0 ? costAmount : 1;
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.4] totalSale=${totalSale}, costAmount=${costAmount}, safeSale=${safeSale}, totalHours=${totalHours}`);

                // 4.5: Prepare payload
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.5] Prepare SO item payload`);
                const weekEndDate = rec.weekEndDate;
                if (!weekEndDate) throw new Error(`Missing weekEndDate for group ${key}`);
                const payload = {
                    SalesOrder: vbeln,
                    SalesOrderItem: nextSO,
                    Material: dummy.Material,
                    RequestedQuantity: '1',
                    OrderQuantityUnit: 'EA',
                    PricingDate: toODataDate(new Date()),
                    WBSElement: dummy.WBSElement,
                    ProfitCenter: dummy.ProfitCenter,
                    ProductionPlant: soHeader.SalesOrganization,
                    YY1_EEGroup_SD_SDI: dummy.YY1_EEGroup_SD_SDI || '',
                    YY1_WNInvoice_SD_SDI: rec.invoiceNoWN || '',
                    YY1_WNWorkOrder_SD_SDI: rec.tempusWorkOrder || '',
                    YY1_PurchasingDoc_SD_SDI: poNo || '',
                    YY1_StrTimeMarkup_SD_SDI: dummy.YY1_StrTimeMarkup_SD_SDI || '',
                    YY1_DoubTimeMarkup_SD_SDI: dummy.YY1_DoubTimeMarkup_SD_SDI || '',
                    YY1_LegacyPurchase_SD_SDI: dummy.YY1_LegacyPurchase_SD_SDI || '',
                    YY1_WeekEnd_SD_SDI: toODataDate(weekEndDate),
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
                    to_PricingElement: {
                        results: [{
                            ConditionType: pricingConditionType,
                            ConditionRateValue: safeSale.toFixed(2)
                        }]
                    },
                    to_ScheduleLine: [{
                        ScheduleLine: '0001',
                        RequestedDeliveryDate: toODataDate(weekEndDate),
                        OrderQuantityUnit: 'EA',
                        ScheduleLineOrderQuantity: '1'
                    }]
                };
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.5] Payload prepared`);

                // -------- Step 4.6: Create SO item via OData --------
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.6] Creating SO item via OData API`);
                const createRes = await this.salesOrderAPI.createSalesOrderItems([payload]);
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.6] Response: ${JSON.stringify(createRes, null, 2)}`);
                if (createRes.error) {
                    LOG.error(`[processSalesOrder][Group ${groupCounter}][4.6] Create Error: ${JSON.stringify(createRes, null, 2)}`);
                    throw new Error(`Create SO-item failed: ${createRes.error}`);
                }
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.6] SO item created`);

                // --- BEGIN: Customer-field helpers for VC payloads (business ask) ---
                // Build VC extra fields (Z-codes → YY* fields) using CustomFieldsToVC table
                if (!this._cfvcMap) {
                    const rows = await SELECT.from('com.aleron.monitor.CustomFieldsToVC')
                        .columns(['customValue', 'fieldName']);
                    this._cfvcMap = new Map(
                        (rows || []).map(r => [String(r.customValue || '').trim(), String(r.fieldName || '').trim()])
                    );
                }
                const { VC1Fields: extraVC1, VC2Fields: extraVC2 } =
                    buildCustomerVCFields.call(this, lines, this._cfvcMap);
                LOG.info(`[processSalesOrder][Group ${groupCounter}] VC extra fields → VC1=${Object.keys(extraVC1).length}, VC2=${Object.keys(extraVC2).length}`);

                // 4.6.1: Sum up 7-days and attach to rec.*
                {
                    const weekly = sumFields(lines, shiftFields);
                    rec.totalSt = weekly.shiftRGFirst;
                    rec.totalOt = weekly.shiftOTFirst;
                    rec.totalDt = weekly.shiftDTFirst;
                    rec.totalSt2 = weekly.shiftRGSecond;
                    rec.totalOt2 = weekly.shiftOTSecond;
                    rec.totalDt2 = weekly.shiftDTSecond;
                    rec.totalSt3 = weekly.shiftRGThird;
                    rec.totalOt3 = weekly.shiftOTThird;
                    rec.totalDt3 = weekly.shiftDTThird;
                    const first = lines[0] || {};
                    rec.customerBillRateST = Number(first.shiftCustomerBillRateFirst) || 0;
                    rec.customerBillRateOt = Number(first.shiftCustomerOTBillRateFirst) || 0;
                    rec.customerBillRateDt = Number(first.shiftCustomerDTBillRateFirst) || 0;
                    rec.rateSt2 = Number(first.shiftCustomerBillRateSecond) || 0;
                    rec.rateOt2 = Number(first.shiftCustomerOTBillRateSecond) || 0;
                    rec.rateDt2 = Number(first.shiftCustomerDTBillRateSecond) || 0;
                    rec.rateSt3 = Number(first.shiftCustomerBillRateThird) || 0;
                    rec.rateOt3 = Number(first.shiftCustomerOTBillRateThird) || 0;
                    rec.rateDt3 = Number(first.shiftCustomerDTBillRateThird) || 0;
                }

                // 4.6.1: Insert VC1 and VC2
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.6.1] Inserting VC1 and VC2 data`);

                const dec = (v, d = 2) => {
                    const n = Number(v);
                    return Number.isFinite(n) ? n.toFixed(d) : (0).toFixed(d);
                };

                const vc1Daily = buildVC1DailyShifts(lines);

                // --- VC1 payload (original mapping + extraVC1), normalized decimals (CHANGED) ---
                const vc1 = {
                    SalesOrderNumber: vbeln,
                    SalesOrderItemNum: nextSO,

                    SAP_Description: rec.description || '',
                    Billing_Document_Number: rec.billingDocNo || '',
                    Billing_Document_Item_Number: rec.billingDocItemNo || '',
                    Custom_Sales_Order_Type: rec.customSalesOrderType || '',
                    Custom_Billing_type: rec.customBillingType || '',

                    YY1_ACA_RG_ONLY: rec.acaRgOnly || '',
                    YY2_ACA_HRS: fmtDecimal(rec.acaHrs),
                    YY3_ACA_HRS_PRICE: fmtDecimal(rec.acaHrsPrice),
                    YY4_ACA_TOTAL_HRS_PRICE: fmtDecimal(rec.acaTotalHrsPrice),

                    YY5_LINE_ITEM_NUMBER: nextSO,
                    YY6_SC_LINE_ITEM_NUMBER: rec.scLineItemNo || '',
                    YY7_INVISIBLE: '',

                    YY8_WEEK_ENDING2: (function () {
                        try {
                            return toIsoDate(rec.weekEndDate).split('T')[0]; // <-- keep only YYYY-MM-DD
                        } catch {
                            return null;
                        }
                    })(),
                    YY9_ZZWEEK_END_VBAP: null,

                    YY10_EMPLOYEE_TYPE: rec.employeeType || '',
                    YY11_EIGHT_DAY_WEEK: isEightDayWeek ? 'Y' : 'N',

                    // per-day/per-shift fields (YY12..YY99)
                    ...vc1Daily,

                    // totals (hours)
                    YY100_SHIFT1_TOTAL_HRS_RG: fmtDecimal(rec.totalSt),
                    YY101_SHIFT1_TOTAL_HRS_OT: fmtDecimal(rec.totalOt),
                    YY102_SHIFT1_TOTAL_HRS_DB: fmtDecimal(rec.totalDt),
                    YY103_SHIFT2_TOTAL_HRS_RG: fmtDecimal(rec.totalSt2),
                    YY104_SHIFT2_TOTAL_HRS_OT: fmtDecimal(rec.totalOt2),
                    YY105_SHIFT2_TOTAL_HRS_DB: fmtDecimal(rec.totalDt2),
                    YY106_SHIFT3_TOTAL_HRS_RG: fmtDecimal(rec.totalSt3),
                    YY107_SHIFT3_TOTAL_HRS_OT: fmtDecimal(rec.totalOt3),
                    YY108_SHIFT3_TOTAL_HRS_DB: fmtDecimal(rec.totalDt3),

                    // customer prices (bill rates)
                    YY109_SHIFT1_PRICE_RG: fmtDecimal(rec.customerBillRateST),
                    YY110_SHIFT1_PRICE_OT: fmtDecimal(rec.customerBillRateOt),
                    YY111_SHIFT1_PRICE_DB: fmtDecimal(rec.customerBillRateDt),
                    YY112_SHIFT2_PRICE_RG: fmtDecimal(rec.rateSt2),
                    YY113_SHIFT2_PRICE_OT: fmtDecimal(rec.rateOt2),
                    YY114_SHIFT2_PRICE_DB: fmtDecimal(rec.rateDt2),
                    YY115_SHIFT3_PRICE_RG: fmtDecimal(rec.rateSt3),
                    YY116_SHIFT3_PRICE_OT: fmtDecimal(rec.rateOt3),
                    YY117_SHIFT3_PRICE_DB: fmtDecimal(rec.rateDt3),

                    // markups & totals (customer side)
                    YY118_MARK_UP_RG: fmtDecimal(rec.markupRg),
                    YY119_MARK_UP_OT: fmtDecimal(rec.markupOt),
                    YY120_MARK_UP_DB: fmtDecimal(rec.markupDb),
                    YY121_SHIFT1_TOTAL_PRICE_RG: fmtDecimal(rec.totalPriceSt),
                    YY122_SHIFT1_TOTAL_PRICE_OT: fmtDecimal(rec.totalPriceOt),
                    YY123_SHIFT1_TOTAL_PRICE_DB: fmtDecimal(rec.totalPriceDt),
                    YY124_SHIFT2_TOTAL_PRICE_RG: fmtDecimal(rec.totalPriceSt2),
                    YY125_SHIFT2_TOTAL_PRICE_OT: fmtDecimal(rec.totalPriceOt2),
                    YY126_SHIFT2_TOTAL_PRICE_DB: fmtDecimal(rec.totalPriceDt2),
                    YY127_SHIFT3_TOTAL_PAY_RG: fmtDecimal(rec.totalPaySt3),
                    YY128_SHIFT3_TOTAL_PAY_OT: fmtDecimal(rec.totalPayOt3),
                    YY129_SHIFT3_TOTAL_PAY_DB: fmtDecimal(rec.totalPayDt3),
                    YY130_ADMIN_FEE_PRICE: fmtDecimal(rec.adminFeePrice),

                    // custom fields (Z → VC1)
                    ...extraVC1
                };

                LOG.info(`VC1 payload → ${JSON.stringify(vc1, null, 2)}`);

                // --- VC2 payload (DECIMALS AS STRINGS), add base weekly-clock fee (CHANGED) ---
                const first = lines[0] || {};
                const dec2 = (v) => fmtDecimal(v);
                const v1_rg = dec2(first.shiftVendorPayRateFirst);
                const v1_ot = dec2(first.shiftVendorOTPayRateFirst);
                const v1_db = dec2(first.shiftVendorDTPayRateFirst);
                const v2_rg = dec2(first.shiftVendorPayRateSecond);
                const v2_ot = dec2(first.shiftVendorOTPayRateSecond);
                const v2_db = dec2(first.shiftVendorDTPayRateSecond);
                const v3_rg = dec2(first.shiftVendorPayRateThird);
                const v3_ot = dec2(first.shiftVendorOTPayRateThird);
                const v3_db = dec2(first.shiftVendorDTPayRateThird);

                const VT1_RG = dec2((Number(rec.totalSt) || 0) * Number(v1_rg));
                const VT1_OT = dec2((Number(rec.totalOt) || 0) * Number(v1_ot));
                const VT1_DB = dec2((Number(rec.totalDt) || 0) * Number(v1_db));
                const VT2_RG = dec2((Number(rec.totalSt2) || 0) * Number(v2_rg));
                const VT2_OT = dec2((Number(rec.totalOt2) || 0) * Number(v2_ot));
                const VT2_DB = dec2((Number(rec.totalDt2) || 0) * Number(v2_db));
                const VT3_RG = dec2((Number(rec.totalSt3) || 0) * Number(v3_rg));
                const VT3_OT = dec2((Number(rec.totalOt3) || 0) * Number(v3_ot));
                const VT3_DB = dec2((Number(rec.totalDt3) || 0) * Number(v3_db));

                const vc2Base = {
                    Sales_Order_Number: vbeln,
                    Sales_Order_Item_Num: nextSO,

                    YY251_SHIFT1_PAY_RATE_RG: v1_rg,
                    YY252_SHIFT1_PAY_RATE_OT: v1_ot,
                    YY253_SHIFT1_PAY_RATE_DB: v1_db,
                    YY254_SHIFT2_PAY_RATE_RG: v2_rg,
                    YY255_SHIFT2_PAY_RATE_OT: v2_ot,
                    YY256_SHIFT2_PAY_RATE_DB: v2_db,
                    YY257_SHIFT3_PAY_RATE_RG: v3_rg,
                    YY258_SHIFT3_PAY_RATE_OT: v3_ot,
                    YY259_SHIFT3_PAY_RATE_DB: v3_db,

                    YY260_SHIFT1_TOTAL_PAY_RG: VT1_RG,
                    YY261_SHIFT1_TOTAL_PAY_OT: VT1_OT,
                    YY262_SHIFT1_TOTAL_PAY_DB: VT1_DB,
                    YY263_SHIFT2_TOTAL_PAY_RG: VT2_RG,
                    YY264_SHIFT2_TOTAL_PAY_OT: VT2_OT,
                    YY265_SHIFT2_TOTAL_PAY_DB: VT2_DB,
                    YY266_SHIFT3_TOTAL_PAY_RG: VT3_RG,
                    YY267_SHIFT3_TOTAL_PAY_OT: VT3_OT,
                    YY268_SHIFT3_TOTAL_PAY_DB: VT3_DB,

                    YY135_DAILY_TOTAL_VENDOR: dec2(0),
                    YY137_HOLIDAY_TOTAL_VENDOR: dec2(0),

                    YY247_ZSD_WN_WORK_ORDER_VCSD: rec.tempusWorkOrder || '',

                    // Base weekly clock fee — will be overridden by Z08 if present
                    YY144_WEEKLY_CLOCK_FEE: dec2(rec.custWkTimeFee),
                };

                // merge Z-based VC2 fields AFTER base so Z08 overrides
                const vc2 = { ...vc2Base, ...extraVC2 };

                LOG.info(`VC2 payload → ${JSON.stringify(vc2, null, 2)}`);

                // ---- Validate before inserts (ADDED) ----
                {
                    const localErrs = [];
                    validateFormats(vc1, DECIMAL_VC1, DATE_VC1, 'VC1', rec.ID, localErrs, LOG);
                    validateFormats(vc2, DECIMAL_VC2, DATE_VC2, 'VC2', rec.ID, localErrs, LOG);
                    if (localErrs.length) {
                        const msg = localErrs.map(e => e.message).join('; ');
                        throw new Error(`Validation failed: ${msg}`);
                    }
                }

                // INSERT VC1
                let vc1Res = await this.salesVCData_1Api.executeQuery(
                    INSERT.into('YY1_SALESVCDATA_1').entries(vc1)
                );
                this.LOG.info(`VC1 raw response → ${JSON.stringify(vc1Res, null, 2)}`);

                const vc1Uuid = Array.isArray(vc1Res) ? vc1Res[0]?.SAP_UUID : vc1Res.SAP_UUID;
                if (vc1Uuid) {
                    this.LOG.info(`VC1 returned UUID → ${vc1Uuid}`);
                    await UPDATE(this.recordsEntity)
                        .set({ vcData1UUID: vc1Uuid })
                        .where({ ID: lines.map(l => l.ID) });
                } else {
                    this.LOG.warn(`VC1 insert did not return a UUID`);
                }

                // INSERT VC2
                let vc2Res = await this.salesVCData_2Api.executeQuery(
                    INSERT.into('YY1_SALESVCDATA_2').entries(vc2)
                );
                this.LOG.info(`VC2 raw response → ${JSON.stringify(vc2Res, null, 2)}`);

                const vc2Uuid = Array.isArray(vc2Res) ? vc2Res[0]?.SAP_UUID : vc2Res.SAP_UUID;
                if (vc2Uuid) {
                    this.LOG.info(`VC2 returned UUID → ${vc2Uuid}`);
                    await UPDATE(this.recordsEntity)
                        .set({ vcData2UUID: vc2Uuid })
                        .where({ ID: lines.map(l => l.ID) });
                } else {
                    this.LOG.warn(`VC2 insert did not return a UUID`);
                }

                // Step 4.7: Mark records as processed
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.7] Update DB records as processed`);
                await UPDATE(this.recordsEntity)
                    .set({
                        salesItemNoSAP: nextSO,
                        purchaseDocumentItemSAP: nextSO,
                        processLevel_code: '5'
                    })
                    .where({ ID: lines.map(l => l.ID) });
                LOG.info(`[processSalesOrder][Group ${groupCounter}][4.7] Records updated`);

                passed.push(...lines.map(l => l.ID));
            } catch (e) {
                LOG.error(`[processSalesOrder][Group ${groupCounter}][ERROR] Group ${key} failed: ${e.message}`);
                for (const l of lines) {
                    errorLogs.push({ record_ID: l.ID, message: e.message });
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
            await this.markRecordsValid('3', failed, false); // keep at 3 for retry
        }
        if (passed.length) {
            await ProcessLogger.removeLogs(passed);
            await this.markRecordsValid('5', passed, true); // move to 5
        }

        this.updateExclusionSet({ passed, failed, skipped: [], bBreakExecution });
        this.recordIDs = new Set(passed);
        try {
            if (passed.length) {
                LOG.info(`[AUTO] Chaining ${passed.length} SO-passed row(s) to processPurchaseOrder('5')`);
                await this.processPurchaseOrder('5', false);
            }
        } catch (e) {
            LOG.error(`[AUTO] processSalesOrder chaining failed: ${e.message}`);
        }
        return { hasError: failed.length > 0, continue: true };
    }


    // Step G: Intercompany Sales Order Create/Change (aligned with normal Sales Order flow)
    async processIntercompanyso(sProcessCode, bBreakExecution) {
        const LOG = this.LOG || console;
        LOG.info(`[processIntercompanyso] ENTRY (code=${sProcessCode}, break=${bBreakExecution})`);

        // -------- Step 1: Validate process code --------
        if (sProcessCode !== 'G') {
            LOG.info(`[processIntercompanyso][Exit] Skipped: process code not 'G'`);
            return { hasError: false, continue: true };
        }

        // -------- Step 2: Fetch IC records at level G (same gating as discussed) --------
        LOG.info(`[processIntercompanyso][Step 2] Re-fetching batch records`);
        await this._fetchRecords(this.recordIDs);

        await this._expandSelectionToGroups();
        const recs = this.records.filter(
            r => r.processLevel_code === 'G' && r.distributionChannelSAP === 'IC'
        );
        LOG.info(`[processIntercompanyso][Step 2] Retrieved ${recs.length} records`);
        if (!recs.length) {
            LOG.info(`[processIntercompanyso][Exit] No IC records to process`);
            return { hasError: false, continue: true };
        }

        // -------- Helpers (identical to normal SO path) --------
        const moment = require('moment');

        const toODataDate = d => {
            if (!d) throw new Error(`Date is missing or undefined`);
            const m = moment(d, ['YYYY-MM-DD', 'YYYYMMDD', 'YYYY/MM/DD'], true);
            if (!m.isValid()) throw new Error(`Invalid date format: ${d}`);
            return `/Date(${m.valueOf()})/`;
        };

        const toIsoDate = d => {
            if (!d) throw new Error(`Date is missing or undefined`);
            const m = moment(d, ['YYYY-MM-DD', 'YYYYMMDD', 'YYYY/MM/DD'], true);
            if (!m.isValid()) throw new Error(`Invalid date format: ${d}`);
            return m.format('YYYY-MM-DDT00:00:00');
        };

        function ensureMaxLen(v, max = 30) {
            if (v == null) return v;
            if (typeof v === 'number') return v;
            const s = String(v).trim();
            if (s.length <= max) return s;
            const cut = s.slice(0, max);
            try { (this?.LOG || console).warn?.(`[VC] Truncated value '${s}' → '${cut}' (${s.length}>${max})`); } catch { }
            return cut;
        }

        const VC1_CUSTOMER_FIELD_CODES = new Set(['Z40', 'Z43', 'Z44', 'Z45', 'Z46']);
        const VC2_CUSTOMER_FIELD_CODES = new Set([
            'Z01', 'Z02', 'Z03', 'Z04', 'Z05', 'Z06', 'Z07', 'Z08', 'Z09', 'Z10', 'Z11', 'Z12',
            'Z16', 'Z17', 'Z18', 'Z19', 'Z24', 'Z25', 'Z26', 'Z27', 'Z28', 'Z29', 'Z31',
            'Z32', 'Z33', 'Z34', 'Z35', 'Z37', 'Z39', 'Z42'
        ]);

        function buildCustomerVCFields(lines) {
            const LOG = this.LOG || console;
            const all = [];

            // inline arrays per line
            for (const l of (lines || [])) {
                if (Array.isArray(l.customerFields)) all.push(...l.customerFields);
            }
            // optional map on processor
            if (this?.mCustomerFieldNameValue instanceof Map) {
                for (const l of (lines || [])) {
                    const arr = this.mCustomerFieldNameValue.get(l.ID);
                    if (Array.isArray(arr)) all.push(...arr);
                }
            }
            // optional hook
            if (typeof this?.getCustomerFields === 'function') {
                try {
                    const ids = [...new Set((lines || []).map(x => x.ID))];
                    const extra = this.getCustomerFields(ids);
                    if (Array.isArray(extra)) all.push(...extra);
                } catch (e) {
                    LOG.warn(`[processIntercompanyso] getCustomerFields hook failed → ${e.message}`);
                }
            }

            const bags = { VC1Fields: {}, VC2Fields: {} };
            for (const entry of all) {
                if (!entry || !entry.customerFieldName || !entry.fieldName) continue;
                const code = String(entry.customerFieldName).trim();
                const key = String(entry.fieldName).trim();
                const val = entry.customerFieldValue;
                if (VC1_CUSTOMER_FIELD_CODES.has(code)) bags.VC1Fields[key] = ensureMaxLen.call(this, val, 30);
                else if (VC2_CUSTOMER_FIELD_CODES.has(code)) bags.VC2Fields[key] = ensureMaxLen.call(this, val, 30);
            }
            return bags;
        }

        function buildVC1DailyShifts(lines) {
            const perDate = new Map(); // 'YYYY-MM-DD' -> agg
            const num = v => (v == null || v === '' ? 0 : Number(v));
            for (const l of lines) {
                const d = moment(l.beginDate, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true);
                if (!d.isValid()) continue;
                const key = d.format('YYYY-MM-DD');
                if (!perDate.has(key)) {
                    perDate.set(key, {
                        s1: { rg: 0, ot: 0, db: 0 },
                        s2: { rg: 0, ot: 0, db: 0 },
                        s3: { rg: 0, ot: 0, db: 0 },
                        total: 0
                    });
                }
                const agg = perDate.get(key);
                // shift 1
                agg.s1.rg += num(l.shiftRGFirst);
                agg.s1.ot += num(l.shiftOTFirst);
                agg.s1.db += num(l.shiftDTFirst);
                // shift 2
                agg.s2.rg += num(l.shiftRGSecond);
                agg.s2.ot += num(l.shiftOTSecond);
                agg.s2.db += num(l.shiftDTSecond);
                // shift 3
                agg.s3.rg += num(l.shiftRGThird);
                agg.s3.ot += num(l.shiftOTThird);
                agg.s3.db += num(l.shiftDTThird);

                agg.total +=
                    num(l.shiftRGFirst) + num(l.shiftOTFirst) + num(l.shiftDTFirst) +
                    num(l.shiftRGSecond) + num(l.shiftOTSecond) + num(l.shiftDTSecond) +
                    num(l.shiftRGThird) + num(l.shiftOTThird) + num(l.shiftDTThird);
            }

            const days = Array.from(perDate.keys()).sort().slice(0, 8);
            const dayNums = ['DAY1', 'DAY2', 'DAY3', 'DAY4', 'DAY5', 'DAY6', 'DAY7', 'DAY8'];
            const dayWords = ['DAY_ONE', 'DAY_TWO', 'DAY_THREE', 'DAY_FOUR', 'DAY_FIVE', 'DAY_SIX', 'DAY_SEVEN', 'DAY_EIGHT'];

            const out = {};
            for (let i = 0; i < 8; i++) {
                const base = 12 + (11 * i);  // 12, 23, 34, ...
                const dateIdx = base + 9;    // 21, 32, ...
                const workedIdx = base + 10; // 22, 33, ...
                const dNum = dayNums[i];
                const dWord = dayWords[i];
                const d = days[i];
                const agg = d ? perDate.get(d) : null;

                out[`YY${base + 0}_${dNum}_SHIFT1_RG`] = agg ? Number(agg.s1.rg.toFixed(2)) : 0;
                out[`YY${base + 1}_${dNum}_SHIFT1_OT`] = agg ? Number(agg.s1.ot.toFixed(2)) : 0;
                out[`YY${base + 2}_${dNum}_SHIFT1_DB`] = agg ? Number(agg.s1.db.toFixed(2)) : 0;
                out[`YY${base + 3}_${dNum}_SHIFT2_RG`] = agg ? Number(agg.s2.rg.toFixed(2)) : 0;
                out[`YY${base + 4}_${dNum}_SHIFT2_OT`] = agg ? Number(agg.s2.ot.toFixed(2)) : 0;
                out[`YY${base + 5}_${dNum}_SHIFT2_DB`] = agg ? Number(agg.s2.db.toFixed(2)) : 0;
                out[`YY${base + 6}_${dNum}_SHIFT3_RG`] = agg ? Number(agg.s3.rg.toFixed(2)) : 0;
                out[`YY${base + 7}_${dNum}_SHIFT3_OT`] = agg ? Number(agg.s3.ot.toFixed(2)) : 0;
                out[`YY${base + 8}_${dNum}_SHIFT3_DB`] = agg ? Number(agg.s3.db.toFixed(2)) : 0;

                out[`YY${dateIdx}_${dWord}`] = d || null;
                out[`YY${workedIdx}_${dWord}_WORKED`] = (agg && agg.total > 0) ? '1' : '0';
            }
            return out;
        }

        const sumFields = (arr, fields) =>
            fields.reduce((totals, field) => {
                totals[field] = arr.reduce((sum, x) => sum + (+x[field] || 0), 0);
                return totals;
            }, {});

        const dec = (v, d = 2) => {
            const n = Number(v);
            return Number.isFinite(n) ? n.toFixed(d) : (0).toFixed(d);
        };

        const hasAdw = v => v !== null && v !== undefined && String(v).trim() !== '';

        // -------- Step 3: Group records (IDENTICAL to normal SO path) --------
        LOG.info(`[processIntercompanyso][Step 3] Grouping by contractNo, invoiceNoWN, employeeNo, tempusWorkOrder (+ADW when present)`);
        const groups = new Map();
        for (const r of recs) {
            const parts = [r.contractNo, r.invoiceNoWN, r.employeeNo, r.tempusWorkOrder];
            if (hasAdw(r.additionalDayOfWork)) parts.push(`ADW:${String(r.additionalDayOfWork).trim()}`);
            const key = parts.join('|');
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(r);
        }
        LOG.info(`[processIntercompanyso][Step 3][Done] Grouped into ${groups.size} record sets`);

        // -------- Step 4: Process groups (MIRROR normal SO flow) --------
        const shiftFields = [
            'shiftRGFirst', 'shiftOTFirst', 'shiftDTFirst',
            'shiftRGSecond', 'shiftOTSecond', 'shiftDTSecond',
            'shiftRGThird', 'shiftOTThird', 'shiftDTThird'
        ];

        const billFields = [
            'shiftCustomerBillRateFirst', 'shiftCustomerOTBillRateFirst', 'shiftCustomerDTBillRateFirst',
            'shiftCustomerBillRateSecond', 'shiftCustomerOTBillRateSecond', 'shiftCustomerDTBillRateSecond',
            'shiftCustomerBillRateThird', 'shiftCustomerOTBillRateThird', 'shiftCustomerDTBillRateThird'
        ];

        const errorLogs = [], passed = [], failed = [];
        let groupCounter = 1;

        for (const [key, lines] of groups.entries()) {
            if (!lines.length) {
                LOG.warn(`[processIntercompanyso][Group ${groupCounter}] Empty lines array, skipping group ${key}`);
                groupCounter++;
                continue;
            }
            const rec = lines[0];
            const isEightDayWeek = lines.some(l => hasAdw(l.additionalDayOfWork));
            try {
                // 4.1: Fetch SO header (IC SO already exists)
                const vbeln = rec.salesDocumentNoSAP;
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.1] Fetch SO header for SalesOrderNo=${vbeln}`);
                const soHeader = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrder')
                        .columns(['SalesOrder', 'ReferenceSDDocument', 'SalesOrganization', 'DistributionChannel'])
                        .where({ SalesOrder: vbeln })
                );
                if (!soHeader) throw new Error(`SalesOrder ${vbeln} not found`);

                // Determine pricing condition type (SAME rule as normal)
                const distChannel = soHeader.DistributionChannel;
                const pricingConditionType = ['IC', 'CP', 'CR'].includes(distChannel) ? 'ZLAB' : 'ZPAY';
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.1] DistributionChannel=${distChannel}, ConditionType=${pricingConditionType}`);

                // 4.2: Fetch dummy item 000010 (same columns as normal)
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.2] Fetch dummy item 000010 for SO ${vbeln}`);
                const dummy = await this.salesOrderAPI.executeQuery(
                    SELECT.one.from('A_SalesOrderItem')
                        .columns([
                            'Material', 'WBSElement', 'ProfitCenter',
                            'YY1_EEGroup_SD_SDI', 'YY1_WNInvoice_SD_SDI', 'YY1_PurchasingDoc_SD_SDI',
                            'YY1_StrTimeMarkup_SD_SDI', 'YY1_DoubTimeMarkup_SD_SDI',
                            'YY1_LegacyPurchase_SD_SDI', 'YY1_WeekEnd_SD_SDI', 'YY1_CustomURL_SDI',
                            'YY1_ExtensionUUID1_SDI', 'YY1_DuplicateWeek_SD_SDI',
                            'YY1_ACA_HRS_SDI', 'YY1_Royality_SD_SDI', 'YY1_CommodityCode_SD_SDI',
                            'YY1_ExtensionUUID2_SDI', 'YY1_SupplierInvoice_SD_SDI', 'YY1_InvoiceVATtxt_SD_SDI',
                            'YY1_CategoryCode_SD_SDI', 'YY1_OverTimeMarkup_SD_SDI', 'YY1_ACA_HRS_PRICE_SDI',
                            'YY1_CustomBillingType_SDI', 'YY1_ACA_RG_ONLY_SDI'
                        ])
                        .where({ SalesOrder: vbeln, SalesOrderItem: '000010' })
                );
                if (!dummy) throw new Error(`Dummy item 000010 not found for SO ${vbeln}`);

                // 4.3: Find an existing PO by PDI (same as normal)
                LOG.info(`[processIntercompanyso][Group ${groupCounter}] Locating existing PO by PDI for SO='${vbeln}'`);
                const poRec = await this.purchaseOrderAPI.executeQuery(
                    SELECT.one.from('PurchaseOrderItem')
                        .columns(['PurchaseOrder'])
                        .where({ YY1_SDDocumentPD_PDI: vbeln })
                );
                const poNo = poRec?.PurchaseOrder || '';
                LOG.info(poNo
                    ? `[processIntercompanyso][Group ${groupCounter}] Found PO='${poNo}'`
                    : `[processIntercompanyso][Group ${groupCounter}] No existing PO for SO='${vbeln}', will create new.`
                );

                // 4.4: Next SO line number (identical helper to normal path)
                const nextSO = await this.getNextLineItem(vbeln, poNo);
                LOG.info(`[processIntercompanyso][Group ${groupCounter}] Next SO/PO line → ${nextSO}`);

                // 4.5: Compute totals & safe price (identical)
                let totalSale = 0, totalHours = 0;
                for (const l of lines) {
                    const rg1 = +l.shiftRGFirst || 0, ot1 = +l.shiftOTFirst || 0, dt1 = +l.shiftDTFirst || 0;
                    const rg2 = +l.shiftRGSecond || 0, ot2 = +l.shiftOTSecond || 0, dt2 = +l.shiftDTSecond || 0;
                    const rg3 = +l.shiftRGThird || 0, ot3 = +l.shiftOTThird || 0, dt3 = +l.shiftDTThird || 0;
                    const hrs = rg1 + ot1 + dt1 + rg2 + ot2 + dt2 + rg3 + ot3 + dt3;
                    totalHours += hrs;

                    const rateRG1 = +l.shiftCustomerBillRateFirst || 0, rateOT1 = +l.shiftCustomerOTBillRateFirst || 0, rateDT1 = +l.shiftCustomerDTBillRateFirst || 0;
                    const rateRG2 = +l.shiftCustomerBillRateSecond || 0, rateOT2 = +l.shiftCustomerOTBillRateSecond || 0, rateDT2 = +l.shiftCustomerDTBillRateSecond || 0;
                    const rateRG3 = +l.shiftCustomerBillRateThird || 0, rateOT3 = +l.shiftCustomerOTBillRateThird || 0, rateDT3 = +l.shiftCustomerDTBillRateThird || 0;

                    totalSale += rg1 * rateRG1 + ot1 * rateOT1 + dt1 * rateDT1
                        + rg2 * rateRG2 + ot2 * rateOT2 + dt2 * rateDT2
                        + rg3 * rateRG3 + ot3 * rateOT3 + dt3 * rateDT3;
                }
                const costAmount = Number(totalSale.toFixed(2));
                const safeSale = costAmount > 0 ? costAmount : 1;
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.5] totalSale=${totalSale}, costAmount=${costAmount}, safeSale=${safeSale}, totalHours=${totalHours}`);

                // 4.6: Build payload (IDENTICAL shape to normal path)
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.6] Prepare SO item payload`);
                const weekEndDate = rec.weekEndDate;
                if (!weekEndDate) throw new Error(`Missing weekEndDate for group ${key}`);

                const payload = {
                    SalesOrder: vbeln,
                    SalesOrderItem: nextSO,
                    Material: dummy.Material,
                    RequestedQuantity: '1',
                    OrderQuantityUnit: 'EA',
                    PricingDate: toODataDate(new Date()),
                    WBSElement: dummy.WBSElement,
                    ProfitCenter: dummy.ProfitCenter,
                    ProductionPlant: soHeader.SalesOrganization,

                    YY1_EEGroup_SD_SDI: dummy.YY1_EEGroup_SD_SDI || '',
                    YY1_WNInvoice_SD_SDI: rec.invoiceNoWN || '',
                    YY1_WNWorkOrder_SD_SDI: rec.tempusWorkOrder || '',
                    YY1_PurchasingDoc_SD_SDI: poNo || '',
                    YY1_StrTimeMarkup_SD_SDI: dummy.YY1_StrTimeMarkup_SD_SDI || '',
                    YY1_DoubTimeMarkup_SD_SDI: dummy.YY1_DoubTimeMarkup_SD_SDI || '',
                    YY1_LegacyPurchase_SD_SDI: dummy.YY1_LegacyPurchase_SD_SDI || '',
                    YY1_WeekEnd_SD_SDI: toODataDate(weekEndDate),
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

                    to_PricingElement: {
                        results: [{
                            ConditionType: pricingConditionType,
                            ConditionRateValue: safeSale.toFixed(2)
                        }]
                    },
                    to_ScheduleLine: [{
                        ScheduleLine: '0001',
                        RequestedDeliveryDate: toODataDate(weekEndDate),
                        OrderQuantityUnit: 'EA',
                        ScheduleLineOrderQuantity: '1'
                    }]
                };
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.6] Payload prepared`);

                // 4.7: Create SO item via OData (SAME call)
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.7] Creating SO item via OData API`);
                const createRes = await this.salesOrderAPI.createSalesOrderItems([payload]);
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.7] Response: ${JSON.stringify(createRes, null, 2)}`);
                if (createRes.error) {
                    LOG.error(`[processIntercompanyso][Group ${groupCounter}][4.7] Create Error: ${JSON.stringify(createRes, null, 2)}`);
                    throw new Error(`Create SO-item failed: ${createRes.error}`);
                }
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.7] SO item created`);

                // 4.8: Aggregate shifts & rates (same as normal path) for VC1/VC2
                {
                    const weekly = sumFields(lines, shiftFields);
                    rec.totalSt = weekly.shiftRGFirst;
                    rec.totalOt = weekly.shiftOTFirst;
                    rec.totalDt = weekly.shiftDTFirst;
                    rec.totalSt2 = weekly.shiftRGSecond;
                    rec.totalOt2 = weekly.shiftOTSecond;
                    rec.totalDt2 = weekly.shiftDTSecond;
                    rec.totalSt3 = weekly.shiftRGThird;
                    rec.totalOt3 = weekly.shiftOTThird;
                    rec.totalDt3 = weekly.shiftDTThird;

                    const first = lines[0] || {};
                    rec.customerBillRateST = Number(first.shiftCustomerBillRateFirst) || 0;
                    rec.customerBillRateOt = Number(first.shiftCustomerOTBillRateFirst) || 0;
                    rec.customerBillRateDt = Number(first.shiftCustomerDTBillRateFirst) || 0;
                    rec.rateSt2 = Number(first.shiftCustomerBillRateSecond) || 0;
                    rec.rateOt2 = Number(first.shiftCustomerOTBillRateSecond) || 0;
                    rec.rateDt2 = Number(first.shiftCustomerDTBillRateSecond) || 0;
                    rec.rateSt3 = Number(first.shiftCustomerBillRateThird) || 0;
                    rec.rateOt3 = Number(first.shiftCustomerOTBillRateThird) || 0;
                    rec.rateDt3 = Number(first.shiftCustomerDTBillRateThird) || 0;
                }

                // 4.9: VC1 + VC2 (identical to normal path)
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.9] Inserting VC1 and VC2 data`);
                try {
                    // lazy-load Zxx → fieldName map
                    if (!this._cfvcMap) {
                        const rows = await SELECT.from('com.aleron.monitor.CustomFieldsToVC')
                            .columns(['customValue', 'fieldName']);
                        this._cfvcMap = new Map(
                            (rows || []).map(r => [String(r.customValue || '').trim(), String(r.fieldName || '').trim()])
                        );
                    }

                    // collect up to 15 custom fields from first line
                    const src = lines[0] || rec;
                    const cfEntries = [];
                    for (let i = 1; i <= 15; i++) {
                        const zCode = src?.[`customerFieldName${i}`];
                        const zValue = src?.[`customerFieldValue${i}`];
                        if (!zCode || zValue == null) continue;
                        const fieldName = this._cfvcMap.get(String(zCode).trim());
                        if (!fieldName) continue;
                        cfEntries.push({
                            customerFieldName: String(zCode).trim(),
                            fieldName,
                            customerFieldValue: zValue
                        });
                    }

                    // expose to builder via map
                    const localMap = new Map();
                    for (const l of (lines || [])) localMap.set(l.ID, cfEntries);
                    const oldMap = this.mCustomerFieldNameValue;
                    this.mCustomerFieldNameValue = localMap;
                    const { VC1Fields: extraVC1, VC2Fields: extraVC2 } = buildCustomerVCFields.call(this, lines);
                    this.mCustomerFieldNameValue = oldMap;

                    const vc1Daily = buildVC1DailyShifts(lines);

                    // VC1 payload (same fields as normal)
                    const vc1 = {
                        SalesOrderNumber: vbeln,
                        SalesOrderItemNum: nextSO,

                        SAP_Description: rec.description || '',
                        Billing_Document_Number: rec.billingDocNo || '',
                        Billing_Document_Item_Number: rec.billingDocItemNo || '',
                        Custom_Sales_Order_Type: rec.customSalesOrderType || '',
                        Custom_Billing_type: rec.customBillingType || '',

                        YY1_ACA_RG_ONLY: rec.acaRgOnly || '',
                        YY2_ACA_HRS: Number(rec.acaHrs) || 0.00,
                        YY3_ACA_HRS_PRICE: Number(rec.acaHrsPrice) || 0.00,
                        YY4_ACA_TOTAL_HRS_PRICE: Number(rec.acaTotalHrsPrice) || 0.00,

                        YY5_LINE_ITEM_NUMBER: nextSO,
                        YY6_SC_LINE_ITEM_NUMBER: rec.scLineItemNo || '',
                        YY7_INVISIBLE: '',

                        YY8_WEEK_ENDING2: (function () { try { return toIsoDate(rec.weekEndDate); } catch { return null; } })(),
                        YY9_ZZWEEK_END_VBAP: null,

                        YY10_EMPLOYEE_TYPE: rec.employeeType || '',
                        YY11_EIGHT_DAY_WEEK: isEightDayWeek ? 'Y' : 'N',

                        ...vc1Daily,

                        YY100_SHIFT1_TOTAL_HRS_RG: Number(rec.totalSt) || 0,
                        YY101_SHIFT1_TOTAL_HRS_OT: Number(rec.totalOt) || 0,
                        YY102_SHIFT1_TOTAL_HRS_DB: Number(rec.totalDt) || 0,
                        YY103_SHIFT2_TOTAL_HRS_RG: Number(rec.totalSt2) || 0,
                        YY104_SHIFT2_TOTAL_HRS_OT: Number(rec.totalOt2) || 0,
                        YY105_SHIFT2_TOTAL_HRS_DB: Number(rec.totalDt2) || 0,
                        YY106_SHIFT3_TOTAL_HRS_RG: Number(rec.totalSt3) || 0,
                        YY107_SHIFT3_TOTAL_HRS_OT: Number(rec.totalOt3) || 0,
                        YY108_SHIFT3_TOTAL_HRS_DB: Number(rec.totalDt3) || 0,

                        YY109_SHIFT1_PRICE_RG: Number(rec.customerBillRateST) || 0,
                        YY110_SHIFT1_PRICE_OT: Number(rec.customerBillRateOt) || 0,
                        YY111_SHIFT1_PRICE_DB: Number(rec.customerBillRateDt) || 0,
                        YY112_SHIFT2_PRICE_RG: Number(rec.rateSt2) || 0,
                        YY113_SHIFT2_PRICE_OT: Number(rec.rateOt2) || 0,
                        YY114_SHIFT2_PRICE_DB: Number(rec.rateDt2) || 0,
                        YY115_SHIFT3_PRICE_RG: Number(rec.rateSt3) || 0,
                        YY116_SHIFT3_PRICE_OT: Number(rec.rateOt3) || 0,
                        YY117_SHIFT3_PRICE_DB: Number(rec.rateDt3) || 0,

                        YY118_MARK_UP_RG: Number(rec.markupRg) || 0,
                        YY119_MARK_UP_OT: Number(rec.markupOt) || 0,
                        YY120_MARK_UP_DB: Number(rec.markupDb) || 0,
                        YY121_SHIFT1_TOTAL_PRICE_RG: Number(rec.totalPriceSt) || 0,
                        YY122_SHIFT1_TOTAL_PRICE_OT: Number(rec.totalPriceOt) || 0,
                        YY123_SHIFT1_TOTAL_PRICE_DB: Number(rec.totalPriceDt) || 0,
                        YY124_SHIFT2_TOTAL_PRICE_RG: Number(rec.totalPriceSt2) || 0,
                        YY125_SHIFT2_TOTAL_PRICE_OT: Number(rec.totalPriceOt2) || 0,
                        YY126_SHIFT2_TOTAL_PRICE_DB: Number(rec.totalPriceDt2) || 0,
                        YY127_SHIFT3_TOTAL_PAY_RG: Number(rec.totalPaySt3) || 0,
                        YY128_SHIFT3_TOTAL_PAY_OT: Number(rec.totalPayOt3) || 0,
                        YY129_SHIFT3_TOTAL_PAY_DB: Number(rec.totalPayDt3) || 0,
                        YY130_ADMIN_FEE_PRICE: Number(rec.adminFeePrice) || 0,

                        ...extraVC1
                    };

                    LOG.info(`[IC][VC1] ${JSON.stringify(vc1)}`);
                    let vc1Res = await this.salesVCData_1Api.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_1').entries(vc1)
                    );
                    const vc1Uuid = Array.isArray(vc1Res) ? vc1Res[0]?.SAP_UUID : vc1Res?.SAP_UUID;
                    if (vc1Uuid) {
                        await UPDATE(this.recordsEntity)
                            .set({ vcData1UUID: vc1Uuid })
                            .where({ ID: lines.map(l => l.ID) });
                    } else {
                        this.LOG.warn(`IC VC1 insert did not return a UUID`);
                    }

                    // VC2 payload (DECIMALS as strings)
                    const first = lines[0] || {};
                    const v1_rg = dec(first.shiftVendorPayRateFirst);
                    const v1_ot = dec(first.shiftVendorOTPayRateFirst);
                    const v1_db = dec(first.shiftVendorDTPayRateFirst);
                    const v2_rg = dec(first.shiftVendorPayRateSecond);
                    const v2_ot = dec(first.shiftVendorOTPayRateSecond);
                    const v2_db = dec(first.shiftVendorDTPayRateSecond);
                    const v3_rg = dec(first.shiftVendorPayRateThird);
                    const v3_ot = dec(first.shiftVendorOTPayRateThird);
                    const v3_db = dec(first.shiftVendorDTPayRateThird);

                    const VT1_RG = dec((Number(rec.totalSt) || 0) * Number(v1_rg));
                    const VT1_OT = dec((Number(rec.totalOt) || 0) * Number(v1_ot));
                    const VT1_DB = dec((Number(rec.totalDt) || 0) * Number(v1_db));
                    const VT2_RG = dec((Number(rec.totalSt2) || 0) * Number(v2_rg));
                    const VT2_OT = dec((Number(rec.totalOt2) || 0) * Number(v2_ot));
                    const VT2_DB = dec((Number(rec.totalDt2) || 0) * Number(v2_db));
                    const VT3_RG = dec((Number(rec.totalSt3) || 0) * Number(v3_rg));
                    const VT3_OT = dec((Number(rec.totalOt3) || 0) * Number(v3_ot));
                    const VT3_DB = dec((Number(rec.totalDt3) || 0) * Number(v3_db));

                    const vc2 = {
                        Sales_Order_Number: vbeln,
                        Sales_Order_Item_Num: nextSO,

                        YY251_SHIFT1_PAY_RATE_RG: v1_rg,
                        YY252_SHIFT1_PAY_RATE_OT: v1_ot,
                        YY253_SHIFT1_PAY_RATE_DB: v1_db,
                        YY254_SHIFT2_PAY_RATE_RG: v2_rg,
                        YY255_SHIFT2_PAY_RATE_OT: v2_ot,
                        YY256_SHIFT2_PAY_RATE_DB: v2_db,
                        YY257_SHIFT3_PAY_RATE_RG: v3_rg,
                        YY258_SHIFT3_PAY_RATE_OT: v3_ot,
                        YY259_SHIFT3_PAY_RATE_DB: v3_db,

                        YY260_SHIFT1_TOTAL_PAY_RG: VT1_RG,
                        YY261_SHIFT1_TOTAL_PAY_OT: VT1_OT,
                        YY262_SHIFT1_TOTAL_PAY_DB: VT1_DB,
                        YY263_SHIFT2_TOTAL_PAY_RG: VT2_RG,
                        YY264_SHIFT2_TOTAL_PAY_OT: VT2_OT,
                        YY265_SHIFT2_TOTAL_PAY_DB: VT2_DB,
                        YY266_SHIFT3_TOTAL_PAY_RG: VT3_RG,
                        YY267_SHIFT3_TOTAL_PAY_OT: VT3_OT,
                        YY268_SHIFT3_TOTAL_PAY_DB: VT3_DB,

                        YY135_DAILY_TOTAL_VENDOR: dec(0),
                        YY137_HOLIDAY_TOTAL_VENDOR: dec(0),

                        YY247_ZSD_WN_WORK_ORDER_VCSD: rec.tempusWorkOrder || '',

                        ...extraVC2
                    };

                    LOG.info(`[IC][VC2] ${JSON.stringify(vc2)}`);
                    let vc2Res = await this.salesVCData_2Api.executeQuery(
                        INSERT.into('YY1_SALESVCDATA_2').entries(vc2)
                    );
                    const vc2Uuid = Array.isArray(vc2Res) ? vc2Res[0]?.SAP_UUID : vc2Res?.SAP_UUID;
                    if (vc2Uuid) {
                        await UPDATE(this.recordsEntity)
                            .set({ vcData2UUID: vc2Uuid })
                            .where({ ID: lines.map(l => l.ID) });
                    } else {
                        this.LOG.warn(`IC VC2 insert did not return a UUID`);
                    }

                } catch (e) {
                    throw new Error(`VC1/VC2 insert failed: ${e.message}`);
                }

                // 4.10: Mark processed (same as normal)
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.10] Update DB records as processed`);
                await UPDATE(this.recordsEntity)
                    .set({
                        salesItemNoSAP: nextSO,
                        purchaseDocumentItemSAP: nextSO,
                        processLevel_code: '5'
                    })
                    .where({ ID: lines.map(l => l.ID) });
                LOG.info(`[processIntercompanyso][Group ${groupCounter}][4.10] Records updated`);

                passed.push(...lines.map(l => l.ID));

            } catch (e) {
                LOG.error(`[processIntercompanyso][Group ${groupCounter}][ERROR] Group ${key} failed: ${e.message}`);
                for (const l of lines) {
                    errorLogs.push({ record_ID: l.ID, message: e.message });
                    failed.push(l.ID);
                }
            }
            groupCounter++;
        }

        // -------- Step 5: Finalize logs & statuses (same as normal) --------
        LOG.info(`[processIntercompanyso][Step 5] Finalize: Update log tables and statuses`);
        if (errorLogs.length) {
            await ProcessLogger.removeLogs(failed);
            await ProcessLogger.addLogs(errorLogs);
            await this.markRecordsValid('G', failed, false); // stay at G to retry
        }
        if (passed.length) {
            await ProcessLogger.removeLogs(passed);
            await this.markRecordsValid('5', passed, true);  // advance on success
        }

        this.updateExclusionSet({ passed, failed, skipped: [], bBreakExecution });
        this.recordIDs = new Set(passed);
        try {
            if (passed.length) {
                LOG.info(`[AUTO] Chaining ${passed.length} IC SO-passed row(s) to processPurchaseOrder('5')`);
                await this.processPurchaseOrder('5', false);
            }
        } catch (e) {
            LOG.error(`[AUTO] processIntercompanyso chaining failed: ${e.message}`);
        }

        return { hasError: failed.length > 0, continue: true };
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
                    errorLogs.push({ record_ID: l.ID, message: e.message });
                    failed.push(l.ID);
                }
            }
        }

        // 5.9) Finalize
        LOG.info('[Step 5.9] Finalizing');
        if (failed.length) {
            await ProcessLogger.removeLogs(failed);
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
                        message: err.message
                    });
                    failed.push(r.ID);
                }
            }
        }

        // 5) finalize logs & validity
        LOG.info('[processSupplierInvoice] Finalizing MIRO step');
        if (failed.length) {
            await ProcessLogger.removeLogs(failed);
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

module.exports = TimeContractor_3;