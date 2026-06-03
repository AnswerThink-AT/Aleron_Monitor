sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/export/Spreadsheet",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/viz/ui5/controls/common/feeds/FeedItem",
  "sap/viz/ui5/data/DimensionDefinition",
  "sap/ui/comp/smartvariants/PersonalizableInfo",
  "sap/ui/core/theming/Parameters"
], function (
  Controller, JSONModel, Filter, FilterOperator, Spreadsheet, MessageToast, MessageBox,
  FeedItem, DimensionDefinition, PersonalizableInfo, Parameters
) {
  "use strict";

  // --- Step dictionary -------------------------------------------------------
  const STEP_INFO = {
    "0": { name: "FILE LOADED" },
    "1": { name: "FILE VALIDATION" },
    "2": { name: "HIRE/RE-HIRE PROCESS" },
    "3": { name: "SALES ORDER CREATE/CHANGE" },
    "4": { name: "ENTERPRISE PROJECT CREATE" },
    "5": { name: "PURCHASE ORDER/CHANGE" },
    "6": { name: "UPDATE SALES ORDER" },
    "7": { name: "CREATE EMPLOYEE VENDOR" },
    "8": { name: "READY FOR OUTBOUND PROCESS" },
    "9": { name: "INTERFACE PROCESS COMPLETE" },
    "A": { name: "TRIP" },
    "B": { name: "MIRO CREATE" },
    "C": { name: "UPDATE PROJECT" },
    "D": { name: "UPDATE DELIVERY ADDRESS ON PO" },
    "E": { name: "SMART SEARCH ADDITIONAL INFOTYPE" },
    "F": { name: "UPDATE SALES ORDER PARTNERS" },
    "G": { name: "INTERCOMPANY SALES ORDER CREATE/CHANGE" },
    "H": { name: "REJECT SALES ORDER" },
    "I": { name: "REJECT IC SALES ORDER" },
    "J": { name: "CANCEL MIRO" },
    "K": { name: "REJECT PO" },
    "L": { name: "CREATE CREDIT MEMO REQUEST" },
    "M": { name: "CREATE IC CREDIT MEMO REQUEST" },
    "N": { name: "CREATE MIRO CREDIT" },
    "O": { name: "DELETE PARTNER FUNCTION" },
    "P": { name: "DELETE PARTNER FUNCTION IC" },
    "Q": { name: "MAINTAIN CONTRACT DATES" },
    "R": { name: "UPDATE HR COST DISTRIBUTION" },
    "T": { name: "TIME PROCESS" },
    "S": { name: "HIRED IN SUCCESSFACTORS" },
    "Z": { name: "MANUALLY REJECTED" },
    "U": { name: "CHECK EMPLOYEE CREATION S4" },
  };

  const stepName = (c) => {
    if (!c || c.trim() === "") return null; // remove instead of "No value"
    return (STEP_INFO[c] && STEP_INFO[c].name) || c;
  };

  const stepLabel = (c) => {
    const name = stepName(c);
    if (!name) return null; // hide from chart labels too
    return `${c} ${name}`;
  };

  // ===== Cross-app navigation (File app) =====================================
  const FILE_APP_BASES = {
    dev: "https://app-dev-393rfxdv.launchpad.cfapps.us10.hana.ondemand.com/c7ca4a65-f077-4e01-984d-c8f519addd16.monitor.monitor-0.0.1/index.html",
    qa:  "https://app-sbx-0hzzrvn1.launchpad.cfapps.us10.hana.ondemand.com/76fc447f-bef5-4b0a-8915-90ff530ae843.monitor.monitor-0.0.1/index.html"
  };
  const STEP_ORDER = [
    "0", "1", "2", "3", "4", "5", "9",
    "A", "B", "C", "D", "E", "F", "G",
    "M", "N", "O", "Q", "S", "T", "Z"
  ];

  function getStepSortIndex(step) {
    const s = String(step || "").toUpperCase();
    const idx = STEP_ORDER.indexOf(s);
    return idx >= 0 ? idx : 9999; 
  }
  function saveFilterState(state) {
    localStorage.setItem("monitorFilters", JSON.stringify(state));
  }

  function loadFilterState() {
    const s = localStorage.getItem("monitorFilters");
    return s ? JSON.parse(s) : null;
  }
  function detectEnvFromHost(hostname) {
    const h = String(hostname || window.location.hostname).toLowerCase();
    if (h.includes("app-dev") || h.includes("-dev-") || h.includes("localhost")) return "dev";
    if (h.includes("app-sbx") || h.includes("-sbx-") || h.includes("-qa-")) return "qa";
    try {
      const here = window.location.origin.toLowerCase();
      if (FILE_APP_BASES.dev.toLowerCase().startsWith(here)) return "dev";
      if (FILE_APP_BASES.qa.toLowerCase().startsWith(here))  return "qa";
    } catch (_) {}
    return "qa";
  }
  function getFileAppBaseUrl() {
    const env = detectEnvFromHost();
    return FILE_APP_BASES[env] || FILE_APP_BASES.qa;
  }


  // normalize and drop leading numbers like "3:Times"
function _norm(s){ 
  return String(s||"")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,"_")
    .replace(/^_+|_+$/g,"")
    .replace(/^\d+_*/, "");
}

  // --- helpers for detail fetch ----------------------------------------------
  function _lit(v, path) {
    if (v === true || v === false) return v ? "true" : "false";
    if (v instanceof Date) return v.toISOString();
    if (path === "fileId") {
      const n = typeof v === "number" ? v : (/^\d+$/.test(String(v)) ? Number(v) : v);
      return (typeof n === "number") ? String(n) : `'${String(v).replace(/'/g, "''")}'`;
    }
    return `'${String(v).replace(/'/g, "''")}'`;
  }

  // ===== which detail set to hit =============================================
  const DETAIL_SET_BY_INTERFACE = {
    "times": "Times_Detail",
    "workorders": "WorkOrders_Detail",
    "workorders_wn": "WorkOrders_WN_Detail",
    "workorders_fg": "WorkOrders_FG_Detail",
    "employeehires": "EmployeeHires_Detail",
    "staffhires": "StaffHires_Detail",
    "terminations": "Terminations_Detail",
    "fg_invoices": "Fg_Invoices_Detail",
    "credit_rebill": "Credit_Rebill_Detail",
    "fg_credit_rebill": "Fg_Credit_Rebill_Detail",
    "otherbillables": "OtherBillables_Detail",
    "sowscwo": "SowScWo_Detail",
    "sowscinvoice": "SowScInvoice_Detail",
    "bonus": "Bonus_Detail",
    "travel": "Travel_Detail",
    "drug_background_check": "Drug_Background_Check_Detail"
  };

  function _norm(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, ""); }
  function resolveDetailSet(interfaceName, interfaceId) {

    // Normalize safety
    interfaceId = String(interfaceId || "").toUpperCase();

    switch (interfaceId) {
      case "1": return "WorkOrders_WN_Detail";        // MS Work Orders
      case "M": return "WorkOrders_FG_Detail";        // FG Work Orders
      case "S": return "WorkOrders_Detail";           // VMS Work Orders

      case "T": return "EmployeeHires_Detail";        // SS Employee Records
      case "U": return "StaffHires_Detail";           // SS Staff Hire

      case "4": return "Terminations_Detail";
      case "N": return "Fg_Invoices_Detail";
      case "D": return "Credit_Rebill_Detail";
      case "Q": return "Fg_Credit_Rebill_Detail";
      case "O": return "OtherBillables_Detail";
      case "G": return "Bonus_Detail";
      case "C": return "Times_Detail";
      case "3": return "Times_Detail";
      case "E": return "SowScWo_Detail";
      case "F": return "SowScInvoice_Detail";
      case "2": return "Travel_Detail";
      case "A": return "Drug_Background_Check_Detail";
    }
    return "WorkOrders_Detail";
  }

  function _norm(s){
  return String(s||"")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,"_")
    .replace(/^_+|_+$/g,"")
    .replace(/^\d+_*/, ""); // <-- keep this line
}

function resolveSetName(rawIface){
  const k = _norm(rawIface);
  // 1) Try exact
  if (DETAIL_SET_BY_INTERFACE[k]) return DETAIL_SET_BY_INTERFACE[k];
  // 2) Try contains
  const hit = Object.keys(DETAIL_SET_BY_INTERFACE).find(key => k.includes(key));
  return hit ? DETAIL_SET_BY_INTERFACE[hit] : "Times_Detail";
}

  // ===== meta → property list (primitive only) ===============================
  function getEntityProps(oModel, setName) {
    const mm = oModel.getMetaModel();
    const es = mm.getObject(`/$EntityContainer/${setName}`);
    if (!es || !es.$Type) throw new Error(`EntitySet ${setName} not found`);
    const typeName = es.$Type;
    const typeObj  = mm.getObject(`/${typeName}`) || {};
    const props    = [];

    Object.keys(typeObj).forEach(p => {
      const def = typeObj[p];
      if (!def) return;
      if (def.$kind !== "Property") return;
      if (def.$isCollection) return;
      if (!def.$Type || !String(def.$Type).startsWith("Edm.")) return;
      if (def.$Type === "Edm.Stream") return;
      const label = mm.getObject(`/${typeName}/${p}/@com.sap.vocabularies.Common.v1.Label`) || p;
      props.push({ name: p, label, edmType: def.$Type });
    });

    const orderHint = ["ID", "recordId", "fileId", "file", "interfaceType", "processLevel", "valid", "createdAt", "modifiedAt"];
    props.sort((a, b) => {
      const ai = orderHint.indexOf(a.name), bi = orderHint.indexOf(b.name);
      if (ai >= 0 && bi >= 0) return ai - bi;
      if (ai >= 0) return -1;
      if (bi >= 0) return 1;
      return a.label.localeCompare(b.label);
    });

    return { typeName, props };
  }

  // ===== binding context extraction ==========================================
  function getRowDataFromEvent(oEvent, sModelName) {
    const src = oEvent.getSource();
    let ctx = src.getBindingContext && src.getBindingContext(sModelName);
    if (ctx) return ctx.getObject();

    let p = src;
    for (let i = 0; i < 7 && p; i++) {
      if (p.getBindingContext && p.getBindingContext(sModelName)) {
        return p.getBindingContext(sModelName).getObject();
      }
      p = p.getParent && p.getParent();
    }

    const table = this.byId("tbl") || this.byId("recTable");
    if (table && table.getSelectedIndex && table.getSelectedIndex() >= 0) {
      const rc = table.getContextByIndex(table.getSelectedIndex());
      if (rc) return rc.getObject();
    }

    ctx = src.getBindingContext && src.getBindingContext();
    if (ctx) return ctx.getObject();
    throw new Error("No row binding context could be resolved.");
  }

  // ===== dynamic column factory (JSON model: no OData types) ==================
  function buildTableColumns(oTable, props) {
    oTable.destroyColumns();
    props.forEach(p => {
      oTable.addColumn(new sap.ui.table.Column({
        width: "14rem",
        label: new sap.m.Label({ text: p.label }),
        template: new sap.m.Text({
          text: `{rec>${p.name}}`,
          tooltip: `{rec>${p.name}}`
        })
      }));
    });
  }

  // --- utils -----------------------------------------------------------------
  function normalizeStart(d) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
  function normalizeEnd(d)   { const x = new Date(d); x.setHours(23,59,59,999); return x; }
  function svcBase(model)    { let b = model?.sServiceUrl || "/odata/v4/analytics/"; return b.endsWith("/") ? b : b + "/"; }
  const isNumericString = v => typeof v === "string" && /^\d+$/.test(v);

  function buildFilterString(ctx) {
    const { iface, d1, d2, steps, vs} = ctx;
    const parts = [];
    if (iface) parts.push(`interfaceId eq '${iface.replace(/'/g, "''")}'`);
    if (d1 && d2) parts.push(`uploadedAt ge ${normalizeStart(d1).toISOString()} and uploadedAt le ${normalizeEnd(d2).toISOString()}`);
    if (steps && steps.length) {
      const or = steps.map(s => `processLevel eq '${s.replace(/'/g, "''")}'`).join(" or ");
      parts.push(`(${or})`);
    }
    if (vs === "valid")   parts.push("valid eq true");
    if (vs === "invalid") parts.push("valid eq false");
    if (ctx.fileId) {
      parts.push(`fileId eq ${ctx.fileId}`);
    }
    return parts.join(" and ");
  }

  
  // ===== EXACT SELECT for Times_Detail (your proven list) ====================
  const TIMES_SELECT =
    "ID,fileId,valid,createdAt,modifiedAt,additionalDayOfWork,area,beginDate,companyCode,contractNo,createdBy,creditInvoiceSAP,creditMemoICSAP,creditMemoSAP,creditRebillSAP,creditSteps,creditYearSAP,criticality,customerFieldName1,customerFieldName10,customerFieldName11,customerFieldName12,customerFieldName13,customerFieldName14,customerFieldName15,customerFieldName2,customerFieldName3,customerFieldName4,customerFieldName5,customerFieldName6,customerFieldName7,customerFieldName8,customerFieldName9,customerFieldValue1,customerFieldValue10,customerFieldValue11,customerFieldValue12,customerFieldValue13,customerFieldValue14,customerFieldValue15,customerFieldValue2,customerFieldValue3,customerFieldValue4,customerFieldValue5,customerFieldValue6,customerFieldValue7,customerFieldValue8,customerFieldValue9,distributionChannelICSAP,distributionChannelSAP,email,employeeNo,employeeSubgroupSAP,file_ID,fileName,fileSource,fiscalYearSAP,invalidInvoiceNoWNSAP,invoiceDocumentNoSAP,invoiceNoWN,invoiceNoWNSAP,laborPurchaseOrder,legacyContractNo,modifiedBy,orderNo,overrideAt,overrideBy,p2SalesDocumentNoSAP,partnerFunctionSAP,personnelNoSAP,PORequiredSAP,processLevel_code,projectNumberICSAP,projectNumberSAP,projectUUID,purchaseDocumentItem,purchaseDocumentItemSAP,purchaseDocumentNo,purchaseDocumentNoSAP,rejected,rejectReasonSalesOrderICSAP,rejectReasonSalesOrderSAP,salesDocumentNoSAP,salesDocumentType,salesDocumentTypeSAP,salesItemNo,salesItemNoICSAP,salesItemNoSAP,salesOrderICSAP,salesOrderICUpdateRequired,shiftCustomerBillRateFirst,shiftCustomerBillRateSecond,shiftCustomerBillRateThird,shiftCustomerDTBillRateFirst,shiftCustomerDTBillRateSecond,shiftCustomerDTBillRateThird,shiftCustomerOTBillRateFirst,shiftCustomerOTBillRateSecond,shiftCustomerOTBillRateThird,shiftDTFirst,shiftDTSecond,shiftDTThird,shiftOTFirst,shiftOTSecond,shiftOTThird,shiftRGFirst,shiftRGSecond,shiftRGThird,shiftVendorDTPayRateFirst,shiftVendorDTPayRateSecond,shiftVendorDTPayRateThird,shiftVendorOTPayRateFirst,shiftVendorOTPayRateSecond,shiftVendorOTPayRateThird,shiftVendorPayRateFirst,shiftVendorPayRateSecond,shiftVendorPayRateThird,tempusWorkOrder,term,tripNoSAP,tripRequiredSAP,uploadedAt,uploadSeq,vcData1ICUUID,vcData1UUID,vcData2ICUUID,vcData2UUID,vendorZR,weekEndDate,workOrderType,z42SAP";

  // Build columns purely from the select list (no meta needed)
  function buildColumnsFromSelect(table, selectList) {
    table.destroyColumns();
    const fields = selectList.split(",").map(s => s.trim()).filter(Boolean);
    const toLabel = k => k.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, c => c.toUpperCase());
    fields.forEach(name => {
      table.addColumn(new sap.ui.table.Column({
        width: "12rem",
        label: new sap.m.Label({ text: toLabel(name) }),
        template: new sap.m.Text({ text: `{rec>${name}}`, tooltip: `{rec>${name}}` })
      }));
    });
  }

  // ===========================================================================

  return Controller.extend("monitorinterfacereporting.controller.View1", {

    onInit: function () {
      this.getView().setModel(new JSONModel({ rows: [], rowsPie: [] }), "chart");
      this.getView().setModel(new JSONModel({ items: [] }), "steps");
      this.getView().setModel(new JSONModel({ rows: [], allRows: [] }), "tbl");

      const vs = this.byId("validSelect"); if (vs) vs.setSelectedKey("all");
      const saved = loadFilterState();
      if (saved) {
        this.byId("iface").setSelectedKey(saved.iface || "all");
        if (saved.from && saved.to) {
          this.byId("drs").setDateValue(new Date(saved.from));
          this.byId("drs").setSecondDateValue(new Date(saved.to));
        }
        this.byId("validSelect").setSelectedKey(saved.valid || "all");
        if (this.byId("stepsSelect")) {
          this.byId("stepsSelect").setSelectedKey(saved.step || "");
        }
        if (saved.iface) {
          setTimeout(() => this.onGo(), 200);
        }
      }
      this._chartHeight = 360; this._minHeight = 240; this._maxHeight = 720; this._stepHeight = 80; this._prevHeight = this._chartHeight;
      this.byId("chartType").setSelectedKey("column");
      this._setupChartMode("column");

      this._wireVariantsAndFilterBar();
      this._loadDistinctSteps();
      this._updateHeaderSummary();

      const tbl = this.byId("tbl");
      tbl.attachRowSelectionChange(this.onTableSelectionChange.bind(this));
    },

    onTableSelectionChange: function(oEvent) {
    const tbl = oEvent.getSource();
    const selectedIndices = tbl.getSelectedIndices() || [];
    this.byId("btnGo").setEnabled(selectedIndices.length > 1);
},

onGoSelectedRows: function () {
  console.group("[Summary] onGoSelectedRows");

  const tbl  = this.byId("tbl");
  const idxs = tbl.getSelectedIndices();
  console.log("selectedIndices:", idxs);

  if (!idxs || !idxs.length) {
    console.warn("No rows selected");
    sap.m.MessageBox.warning("Select at least one row to proceed.");
    console.groupEnd();
    return;
  }

  const rows  = tbl.getModel("tbl").getProperty("/rows") || [];
  const picked = idxs.map(i => rows[i]).filter(Boolean);
  console.log("picked rows:", picked.length, picked);

  // distinct step codes
  const steps = Array.from(new Set(
    picked.map(r => String(r.processLevel || "").trim()).filter(Boolean)
  ));
  console.log("steps (distinct):", steps);

  if (!steps.length) {
    console.error("No valid steps found in selection");
    sap.m.MessageBox.error("No valid steps found.");
    console.groupEnd();
    return;
  }

  // required route segment – pass ALL steps as CSV so Record can split
  const processLevelParam = steps.join(",");
  console.log("processLevelParam (CSV):", processLevelParam);

  // valid aggregation
  const hasTrue  = picked.some(r => r.valid === true);
  const hasFalse = picked.some(r => r.valid === false);
  const validParam = (hasTrue && hasFalse) ? "all" : (hasTrue ? "true" : "false");
  console.log("validParam:", validParam, "(hasTrue:", hasTrue, ", hasFalse:", hasFalse, ")");

  const ifaceKey  = this.byId("iface").getSelectedKey();
  const ifaceText = this.byId("iface").getSelectedItem()?.getText() || ifaceKey;
  const fromIso   = this.byId("drs").getDateValue()?.toISOString() || "";
  const toIso     = this.byId("drs").getSecondDateValue()?.toISOString() || "";
  const fileIdValue = this.byId("fileIdInput").getValue().trim();

  saveFilterState({ iface: ifaceKey, from: fromIso, to: toIso, valid: validParam, step: "" });
  console.log("saved filter state:", { iface: ifaceKey, fromIso, toIso, validParam });

  const params = {
    set: fileIdValue ? "Single" : "Merged",
    fileId: this.byId("fileIdInput").getValue().trim() || "merged",
    processLevel: processLevelParam,
    valid: validParam,
    iface: ifaceText,
    fileName: fileIdValue ? `File ${fileIdValue}` : "Merged Files"
  };
  console.log("navTo params:", params);

  this.getOwnerComponent().getRouter().navTo("Record", params, false);
  console.groupEnd();
},



    // --- Variant + FilterBar glue -------------------------------------------
    _wireVariantsAndFilterBar: function () {
      const vm = this.byId("vm");
      const fb = this.byId("fb");
      if (!vm || !fb) return;

      vm.addPersonalizableControl(new PersonalizableInfo({ type: "filterBar", keyName: "persistencyKey", control: fb }));
      fb.registerFetchData(this._fetchVariantContent.bind(this));
      fb.registerApplyData(this._applyVariantContent.bind(this));

      vm.initialise(function () {
        this._enforceDefaultVisibleFilters();
        this._updateHeaderSummary();
      }.bind(this), this);
    },

    _enforceDefaultVisibleFilters: function () {
      const fb = this.byId("fb"); if (!fb) return;
      fb.getFilterGroupItems().forEach(function (item) {
        const n = item.getName();
        item.setVisibleInFilterBar(n === "IFACE" || n === "DATE");
      });
    },

    _fetchVariantContent: function () {
      return {
        iface: this.byId("iface").getSelectedKey() || "",
        d1:    this.byId("drs").getDateValue() ? this.byId("drs").getDateValue().toISOString() : null,
        d2:    this.byId("drs").getSecondDateValue() ? this.byId("drs").getSecondDateValue().toISOString() : null,
        steps: this.byId("stepMCB") ? this.byId("stepMCB").getSelectedKeys() : [],
        valid: this.byId("validSelect") ? this.byId("validSelect").getSelectedKey() : "all"
      };
    },

    _applyVariantContent: function (c) {
      if (!c) return;
      this.byId("iface").setSelectedKey(c.iface || "");
      this.byId("drs").setDateValue(c.d1 ? new Date(c.d1) : null);
      this.byId("drs").setSecondDateValue(c.d2 ? new Date(c.d2) : null);
      if (Array.isArray(c.steps) && this.byId("stepMCB")) this.byId("stepMCB").setSelectedKeys(c.steps);
      if (c.valid && this.byId("validSelect")) this.byId("validSelect").setSelectedKey(c.valid);
      this._enforceDefaultVisibleFilters();
      this._updateHeaderSummary();
      this._loadDistinctSteps().catch(() => {});
    },
    onAfterVariantLoad: function () {
      this._enforceDefaultVisibleFilters();
      this._updateHeaderSummary();
      this._loadDistinctSteps().catch(() => {});
    },

    onFilterBarChange: function () {
      this.byId("vm")?.currentVariantSetModified(true);
      this._updateHeaderSummary();
      this._loadDistinctSteps().catch(() => {});
    },

    onSearchFB: function () { this.onGo(); },
    onDateChanged: function () { this._updateHeaderSummary(); },

    _updateHeaderSummary: function () {
      const ifaceTxt = this.byId("iface").getSelectedItem()?.getText();
      const d1 = this.byId("drs").getDateValue(), d2 = this.byId("drs").getSecondDateValue();
      const steps = this.byId("stepMCB")?.getSelectedKeys() || [];
      const valid = this.byId("validSelect")?.getSelectedKey();
      const fmt = sap.ui.core.format.DateFormat.getDateInstance({ style: "medium" });

      const parts = [];
      if (ifaceTxt) parts.push(`Interface: ${ifaceTxt}`);
      if (d1 && d2) parts.push(`Uploaded: ${fmt.format(d1)} – ${fmt.format(d2)}`);
      if (steps.length) parts.push(`${steps.length} step(s)`);
      if (valid && valid !== "all") parts.push(valid === "valid" ? "Valid only" : "Invalid only");

      const txt = parts.length ? parts.join(" • ") : "No filters active";
      this.byId("expandedLabel").setText(txt);
      this.byId("snappedLabel").setText(txt);
    },
    // --- main “Go” -----------------------------------------------------------
    _buildMainFilters: function () {
      const a = [];
      const iface = this.byId("iface").getSelectedKey();
      const d1 = this.byId("drs").getDateValue();
      const d2 = this.byId("drs").getSecondDateValue();
      const fileId = this.byId("fileIdInput").getValue().trim();
      if (fileId) {
        a.push(new Filter("fileId", FilterOperator.EQ, fileId));
      }

      if (iface) a.push(new Filter("interfaceId", FilterOperator.EQ, iface));
      if (d1 && d2) {
        a.push(new Filter({
          and: true, filters: [
            new Filter("uploadedAt", FilterOperator.GE, normalizeStart(d1)),
            new Filter("uploadedAt", FilterOperator.LE, normalizeEnd(d2))
          ]
        }));
      }

      const steps = this.byId("stepMCB").getSelectedKeys();
      if (steps && steps.length) a.push(new Filter(steps.map(s => new Filter("processLevel", FilterOperator.EQ, s)), false));

      const vs = this.byId("validSelect").getSelectedKey();
      if (vs === "valid")   a.push(new Filter("valid", FilterOperator.EQ, true));
      if (vs === "invalid") a.push(new Filter("valid", FilterOperator.EQ, false));
      return a;
    },
    formatValidText: function (v) {
      const isValid =
        v === true ||
        v === "true" ||
        v === "Y" ||
        v === "1";

      return isValid ? "Yes" : "No";
    },

    formatValidState: function (v) {
      const isValid =
        v === true ||
        v === "true" ||
        v === "Y" ||
        v === "1";

      return isValid ? "Success" : "Error";
    },

    onGo: function () {
      const iface = this.byId("iface").getSelectedKey();
      const from  = this.byId("drs").getDateValue();
      const to    = this.byId("drs").getSecondDateValue();
      const valid = this.byId("validSelect") ? this.byId("validSelect").getSelectedKey() : "all";
      const step  = this.byId("stepsSelect") ? this.byId("stepsSelect").getSelectedKey() : "";
      const fileId = this.byId("fileIdInput").getValue().trim();
      if (!iface) { MessageBox.warning("Please choose an Interface."); return; }
      if (!from || !to) { MessageBox.warning("Please choose an Uploaded On date range."); return; }
      saveFilterState({
        iface: this.byId("iface").getSelectedKey(),
        from: this.byId("drs").getDateValue()?.toISOString() || "",
        to: this.byId("drs").getSecondDateValue()?.toISOString() || "",
        valid: this.byId("validSelect").getSelectedKey(),
        step: "",
        fileId: this.byId("fileIdInput").getValue().trim() || "merged",
      });
      const fmt = sap.ui.core.format.DateFormat.getDateInstance({ style: "medium" });
      const ifaceTxt = this.byId("iface").getSelectedItem()?.getText() || iface;
      this.byId("chartTitle").setText(`Records by Step • ${ifaceTxt} • ${fmt.format(from)} - ${fmt.format(to)}`);
      if (fileId) {
        this.byId("stepMCB").setSelectedKeys([]); // no step filter when FileID used
      }
      this._refreshTable();
      this._refreshChart();
    },

    // --- summary table -------------------------------------------------------
    _refreshTable: function () {
      const tbl  = this.byId("tbl");
      const busy = this.byId("busyTbl");
      busy.setVisible(true);

      const odataBindInfo = {
        path: "/FileStepSummary",
        filters: this._buildMainFilters(),
        parameters: { "$orderby": "uploadedAt desc" }
      };
      tbl.unbindRows();
      tbl.bindRows(odataBindInfo);

      const binding = tbl.getBinding("rows");
      binding.requestContexts(0, 1).then(() => {
        busy.setVisible(false);
      }).catch(() => {
        this._loadTableViaFetch().finally(() => busy.setVisible(false));
      });
    },

    // --- chart props / mode --------------------------------------------------
    _applyChartProps: function (mode) {
      const vf = this.byId("chart");
      const good = (Parameters && Parameters.get && Parameters.get("sapUiChartPaletteSemanticGood")) || "#107E3E";
      const bad  = (Parameters && Parameters.get && Parameters.get("sapUiChartPaletteSemanticBad"))  || "#BB0000";

      if (mode === "column") {
        vf.setVizProperties({
          legend: { visible: true, position: "right" },
          plotArea: {
            colorPalette: [good, bad],
            dataLabel: { visible: true, position: "outside", formatString: ["#,##0"], hideWhenOverlap: true, callout: { visible: true } }
          },
          valueAxis: { title: { visible: false }, label: { formatString: "#,##0" } },
          categoryAxis: { title: { visible: false } },
          title: { visible: false }
        });
      } else {
        vf.setVizProperties({
          legend: { visible: true, position: "right" },
          plotArea: { colorPalette: [good, bad], dataLabel: { visible: true, type: "percentage", formatString: ["0%"] } },
          title: { visible: false }
        });
      }
      vf.setHeight(this._chartHeight + "px");
    },

    _setupChartMode: function (mode) {
      const vf = this.byId("chart");
      const ds = this.byId("_IDGenFlattenedDataset");
      vf.setVizType(mode);
      vf.removeAllFeeds();

      if (mode === "pie") {
        ds.unbindData && ds.unbindData();
        ds.bindData({ path: "chart>/rowsPie" });
        ds.removeAllDimensions();
        ds.addDimension(new DimensionDefinition({ name: "Step", value: "{chart>Step}", displayValue: "{chart>StepLabel}" }));
        vf.addFeed(new FeedItem({ uid: "size", type: "Measure", values: ["Records"] }));
        vf.addFeed(new FeedItem({ uid: "color", type: "Dimension", values: ["Step"] }));
        this._applyChartProps("pie");
      } else {
        ds.unbindData && ds.unbindData();
        ds.bindData({ path: "chart>/rows" });
        ds.removeAllDimensions();
        ds.addDimension(new DimensionDefinition({ name: "Step", value: "{chart>Step}", displayValue: "{chart>StepLabel}" }));
        ds.addDimension(new DimensionDefinition({ name: "Valid", value: "{chart>Valid}" }));
        vf.addFeed(new FeedItem({ uid: "categoryAxis", type: "Dimension", values: ["Step"] }));
        vf.addFeed(new FeedItem({ uid: "color", type: "Dimension", values: ["Valid"] }));
        vf.addFeed(new FeedItem({ uid: "valueAxis", type: "Measure", values: ["Records"] }));
        this._applyChartProps("column");
      }
    },
    // --- cross app open file -------------------------------------------------
    onOpenFileApp: function (oEvent) {
      const src   = oEvent.getSource();
      const rowCtx = src.getBindingContext("tbl") || src.getBindingContext();
      if (!rowCtx) { MessageToast.show("No row context found."); return; }

      const row   = rowCtx.getObject() || {};
      let fileId  = row.fileId;
      if (typeof fileId === "string" && /^\d+$/.test(fileId)) fileId = Number(fileId);
      if (fileId === undefined || fileId === null || fileId === "") { MessageToast.show("File ID is missing for this row."); return; }

      const base = getFileAppBaseUrl();
      const hash = `#/Files(ID=${fileId},IsActiveEntity=true)`;
      window.open(`${base}${hash}`, "_blank", "noopener,noreferrer");
    },
    // --- table fetch via JSON (summary) --------------------------------------
    _loadTableViaFetch: async function () {
      const v = this.getView();
      const base = svcBase(v.getModel());

      const ctx = {
        iface: this.byId("iface").getSelectedKey(),
        d1: this.byId("drs").getDateValue(),
        d2: this.byId("drs").getSecondDateValue(),
        steps: this.byId("stepMCB").getSelectedKeys(),
        vs: this.byId("validSelect").getSelectedKey(),
        fileId: this.byId("fileIdInput").getValue().trim() || null
      };

      const sFilter = buildFilterString(ctx);
      const url = `${base}FileStepSummary?${sFilter ? "$filter=" + encodeURIComponent(sFilter) + "&" : ""}$top=1000`;

      try {
        const r = await fetch(url, { headers: { "Accept": "application/json" } });
        const j = await r.json();
        let rows = Array.isArray(j.value) ? j.value : [];
        rows = rows.filter(x => (x.processLevel || "").trim() !== "");

        // --- MERGE across files: key = step + valid ----------------------------
        const merged = new Map();

        rows.forEach(x => {
          const step = (x.processLevel || "").trim();
          if (!step) return;

          const isValid = x.valid === true;
          const key = `${step}|${isValid ? "1" : "0"}`;
          const count = Number(x.recordCount || 0);

          if (!merged.has(key)) {
            merged.set(key, {
              interfaceName: x.interfaceName || x.fileName || "",
              processLevel: step,
              valid: isValid,
              recordCount: count
            });
          } else {
            merged.get(key).recordCount += count;
          }
        });
        const finalRows = Array.from(merged.values())
          .sort((a, b) => {
            const si = getStepSortIndex(a.processLevel);
            const sj = getStepSortIndex(b.processLevel);
            if (si !== sj) return si - sj;                   // step order first

            if (a.valid !== b.valid) return a.valid ? -1 : 1; // Valid=true before false

            return (b.recordCount || 0) - (a.recordCount || 0); // then records desc
          });
        v.getModel("tbl").setData({
          rows: finalRows,
          allRows: finalRows
        });

        const t = this.byId("tbl");
        t.unbindRows();
        t.bindRows({ path: "tbl>/rows" });
      } catch (err) {
        console.error(err);
        MessageBox.error("Failed to load table data.");
      }
    },

    fmtStep: function (c) { return stepName(c); },

    // --- toolbar actions -----------------------------------------------------
    onToggleTable: function (e) {
      const pressed = e.getSource().getPressed();
      this.byId("tableContainer").setVisible(pressed);
    },
    onZoomIn: function () { this._chartHeight = Math.min(this._maxHeight, this._chartHeight + this._stepHeight); this.byId("chart").setHeight(this._chartHeight + "px"); },
    onZoomOut: function () { this._chartHeight = Math.max(this._minHeight, this._chartHeight - this._stepHeight); this.byId("chart").setHeight(this._chartHeight + "px"); },
    onToggleChartFullScreen: function (e) {
      const full = e.getSource().getPressed();
      if (full) {
        this._prevHeight = this._chartHeight;
        this._chartHeight = Math.max(this._chartHeight, 640);
        this.byId("chart").setHeight(this._chartHeight + "px");
        this.byId("tableContainer").setVisible(false);
        this.byId("btnShowTable").setPressed(false);
      } else {
        this._chartHeight = this._prevHeight || 360;
        this.byId("chart").setHeight(this._chartHeight + "px");
        const show = this.byId("btnShowTable").getPressed();
        this.byId("tableContainer").setVisible(show);
      }
    },

    /* ===================== FULL RECORD (dynamic) ===================== */
    onOpenFullRecord: async function (oEvent) {
      let row;
      try {
        row = getRowDataFromEvent.call(this, oEvent, "rec");
      } catch (e) {
        sap.m.MessageBox.error("Could not determine the record to open.");
        return;
      }

      const setName = resolveDetailSet(row) || null;
      const form = this.byId("recForm");
      form.destroyContent();

      try {
        if (setName) {
          const { props } = getEntityProps(this.getView().getModel(), setName);
          props.forEach(p => {
            form.addContent(new sap.m.Label({ text: p.label }));
            form.addContent(new sap.m.Text({ text: row[p.name] == null ? "" : String(row[p.name]) }));
          });
        } else {
          Object.keys(row).forEach(k => {
            const v = row[k];
            if (v == null || typeof v === "object") return;
            form.addContent(new sap.m.Label({ text: k }));
            form.addContent(new sap.m.Text({ text: String(v) }));
          });
        }
      } catch (_) {
        Object.keys(row).forEach(k => {
          const v = row[k];
          if (v == null || typeof v === "object") return;
          form.addContent(new sap.m.Label({ text: k }));
          form.addContent(new sap.m.Text({ text: String(v) }));
        });
      }

      const titleIface = row.interfaceName || "";
      const titleId = row.recordId || row.ID || "";
      this.byId("fullRecTitle").setText(`Record ${titleId} • ${titleIface}`);
      this.byId("dlgFullRecord").open();
    },

    onCloseFullRecord: function () { this.byId("dlgFullRecord").close(); },

    onExportFullRecord: function () {
      try {
        const form = this.byId("recForm");
        const content = form.getContent() || [];
        const row = {};
        for (let i = 0; i < content.length; i += 2) {
          const label = content[i], value = content[i + 1];
          if (label && value && typeof label.getText === "function") {
            row[label.getText()] = (value.getText && value.getText()) || (value.getValue && value.getValue()) || "";
          }
        }
        const sheet = new sap.ui.export.Spreadsheet({
          workbook: { columns: Object.keys(row).map(k => ({ label: k, property: k })) },
          dataSource: [row],
          fileName: `record_${(row["Record ID"] || "details")}.xlsx`
        });
        sheet.build().then(() => sheet.destroy());
      } catch (e) {
        sap.m.MessageBox.error("Failed to export this record.");
      }
    },
    /* ===================== /FULL RECORD ===================== */

    // --- drill-in: DETAIL TABLE (hits exact Times_Detail URL) ----------------
onOpenRecords: function (oEvent) {
  const oRouter = this.getOwnerComponent().getRouter();
  const ctx = oEvent.getSource().getBindingContext("tbl") || oEvent.getSource().getBindingContext();
  if (!ctx) {
    sap.m.MessageBox.error("No row to open");
    return;
  }

  const r = ctx.getObject() || {};
  const ifaceKey  = this.byId("iface").getSelectedKey();
  const ifaceItem = this.byId("iface").getSelectedItem();
  const ifaceText = ifaceItem ? ifaceItem.getText() : (r.interfaceName || "");

  // FIX → never empty
  const fileIdValue = this.byId("fileIdInput")?.getValue().trim();
  const fileId = fileIdValue || "merged";

  const navArgs = {
    set: encodeURIComponent("Merged"),
    fileId: encodeURIComponent(fileId),        // FIXED
    processLevel: encodeURIComponent(String(r.processLevel || "")),
    valid: r.valid ? "true" : "false",
    iface: encodeURIComponent(ifaceText || ifaceKey || ""),
    fileName: encodeURIComponent(fileId === "merged" ? "Merged Files" : ("File " + fileId))
  };

  oRouter.navTo("Record", navArgs, false);
},
    // --- chart interactions ---------------------------------------------------
    onChartTypeChange: function (e) { this._setupChartMode(e.getParameter("item").getKey()); },

    onChartSelect: function (oEvent) {
      const sel = oEvent.getParameter("data") || [];
      if (!sel.length) return;

      const d = sel[sel.length - 1].data; // dataset row from chart

      const m = this.getView().getModel("tbl");
      const all = m.getProperty("/allRows") || [];
      const stepCode = String(d.Step || "").split(" ")[0].trim();

      const filtered = all.filter(r => {
        const rowStep = String(r.processLevel || "").trim();
        const isStepMatch = (rowStep === stepCode);

        if (d.Valid === "Valid") return isStepMatch && r.valid === true;
        if (d.Valid === "Invalid") return isStepMatch && r.valid === false;

        return isStepMatch;
      });

      m.setProperty("/rows", filtered);
    },


    onClearChartSelection: function () {
      const m = this.getView().getModel("tbl");
      const all = m.getProperty("/allRows") || [];
      m.setProperty("/rows", all.slice());
      try { this.byId("chart").vizSelection([]); } catch (_) {}
    },

    // --- chart data load ------------------------------------------------------
    _refreshChart: async function () {
      const view = this.getView();
      const model = this.getOwnerComponent().getModel();
      const base = model.sServiceUrl.endsWith("/") ? model.sServiceUrl : model.sServiceUrl + "/";

      const ctx = {
        iface: this.byId("iface").getSelectedKey(),
        d1: this.byId("drs").getDateValue(),
        d2: this.byId("drs").getSecondDateValue(),
        steps: this.byId("stepMCB").getSelectedKeys(),
        vs: this.byId("validSelect").getSelectedKey()
      };

      const sFilter = buildFilterString(ctx);
      const qp = [
        sFilter ? "$filter=" + encodeURIComponent(sFilter) : "",
        "$select=" + encodeURIComponent("processLevel,valid,recordCount,uploadedAt"),
        "$orderby=" + encodeURIComponent("uploadedAt desc"),
        "$top=1000"
      ].filter(Boolean).join("&");
      const url = `${base}FileStepSummary?${qp}`;

      try {
        const r = await fetch(url, { headers: { "Accept": "application/json" } });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json();
        const rows = Array.isArray(j.value) ? j.value : [];
        for (const x of rows) {
          x.processLevel = (x.processLevel ?? "").toString().trim();
        }
        const bucket = new Map();
        for (const x of rows) {
          const pl = x.processLevel;
          if (!pl) continue; 
          const v = x.valid === true ? "Valid" : "Invalid";
          const k = `${pl}|${v}`;
          bucket.set(k, (bucket.get(k) || 0) + Number(x.recordCount || 0));
        }

        // Bar chart dataset
        let vizRows = Array.from(bucket.entries()).map(([k, total]) => {
          const [pl, v] = k.split("|");
          return {
            StepCode: pl,
            Step: stepLabel(pl),
            Valid: v,
            Records: total
          };
        }).filter(r => r.StepCode && r.StepCode !== "");

        // sort by STEP ORDER, then Valid, then records desc
        vizRows.sort((a, b) => {
          const si = getStepSortIndex(a.StepCode);
          const sj = getStepSortIndex(b.StepCode);
          if (si !== sj) return si - sj;
          if (a.Valid !== b.Valid) return a.Valid === "Valid" ? -1 : 1;
          return (b.Records || 0) - (a.Records || 0);
        });

        vizRows = vizRows.filter(r => r.StepCode && r.StepCode !== "");

        let rowsPie = vizRows.reduce((acc, row) => {
          acc[row.Step] = (acc[row.Step] || 0) + row.Records;
          return acc;
        }, {});

        rowsPie = Object.entries(rowsPie).map(([Step, Records]) => ({
          Step,
          Records
        })).sort((a, b) => {
          const codeA = String(a.Step || "").charAt(0);
          const codeB = String(b.Step || "").charAt(0);
          const si = getStepSortIndex(codeA);
          const sj = getStepSortIndex(codeB);
          if (si !== sj) return si - sj;
          return (b.Records || 0) - (a.Records || 0);
        });

        view.getModel("chart").setData({ rows: vizRows, rowsPie });

        this._setupChartMode(this.byId("chartType").getSelectedKey());

        const fmt = sap.ui.core.format.DateFormat.getDateInstance({ style: "medium" });
        const from = this.byId("drs").getDateValue();
        const to = this.byId("drs").getSecondDateValue();
        const ifaceTxt = this.byId("iface").getSelectedItem()?.getText() || "";
        this.byId("chartTitle").setText(`Records by Step • ${ifaceTxt} • ${fmt.format(from)} - ${fmt.format(to)}`);

      } catch (e) {
        MessageToast.show("Failed to load chart data");
        this.getView().getModel("chart").setData({ rows: [], rowsPie: [] });
      }
    },

    _loadDistinctSteps: async function () {
      const base = svcBase(this.getView().getModel());

      const ctx = {
        iface: this.byId("iface").getSelectedKey(),
        d1: this.byId("drs").getDateValue(),
        d2: this.byId("drs").getSecondDateValue(),
        steps: [],
        vs: "all"
      };
      const sFilter = buildFilterString(ctx);
      const qp = [
        sFilter ? "$filter=" + encodeURIComponent(sFilter) : "",
        "$select=" + encodeURIComponent("processLevel"),
        "$orderby=" + encodeURIComponent("processLevel"),
        "$top=2000"
      ].filter(Boolean).join("&");

      const url = `${base}FileStepSummary?${qp}`;

      try {
        const r = await fetch(url, { headers: { "Accept": "application/json" } });
        const j = await r.json();

        const seen = new Set();
        const items = [];

        for (const o of (j.value || [])) {
          const code = (o.processLevel || "").trim();
          if (!code) continue;
          if (!seen.has(code)) {
            seen.add(code);
            items.push({ code, text: this.fmtStep(code) });
          }
        }

        this.getView().getModel("steps").setData({ items });

      } catch (_) {
        this.getView().getModel("steps").setData({ items: [] });
      }
    },

    // --- export --------------------------------------------------------------
    onExport: function () { this._exportRecords(this._buildMainFilters()); },

    onExportCurrentRecords: function () {
      const b = this.byId("recTable").getBinding("rows");
      this._exportRecords(b ? (b.aFilters || []) : []);
    },

    _exportRecords: async function (filters) {
      const view = this.getView();
      const prog = this.byId("dlgProgress");
      const setText = (t) => this.byId("progText").setText(t);
      prog.open(); setText("Preparing...");

      const base = svcBase(view.getModel());
      const page = 5000;
      let skip = 0;
      const rows = [];

      const sFilter = await this._filtersToQuery(filters);

      try {
        while (true) {
          setText(`Fetching ${skip + 1}…${skip + page}`);
          const url = `${base}InterfaceRecordFacts?$top=${page}&$skip=${skip}${sFilter ? "&$filter=" + encodeURIComponent(sFilter) : ""}&$orderby=recordId`;
          const r = await fetch(url, { headers: { "Accept": "application/json" } });
          const j = await r.json();
          const batch = Array.isArray(j.value) ? j.value : [];
          rows.push(...batch);
          if (batch.length < page) break;
          skip += page;
        }
      } catch (_) { prog.close(); MessageBox.error("Export failed."); return; }

      setText(`Building spreadsheet (${rows.length} rows)…`);

      const enriched = rows.map(r => Object.assign({ stepName: stepName(r.processLevel) }, r));
      const cols = [
        { label: "Record ID", property: "recordId" },
        { label: "File ID", property: "fileId" },
        { label: "Interface ID", property: "interfaceId" },
        { label: "Interface", property: "interfaceName" },
        { label: "File Name", property: "fileName" },
        { label: "File Status", property: "fileStatus" },
        { label: "Source", property: "source" },
        { label: "Step Code", property: "processLevel" },
        { label: "Step Name", property: "stepName" },
        { label: "Valid", property: "valid" },
        { label: "Uploaded At", property: "uploadedAt" }
      ];

      const sheet = new Spreadsheet({
        workbook: { columns: cols },
        dataSource: enriched,
        fileName: `records_export_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.xlsx`
      });

      sheet.build().then(() => { prog.close(); sheet.destroy(); MessageToast.show(`Exported ${rows.length} records`); })
                   .catch(() => { prog.close(); MessageBox.error("Failed to build spreadsheet."); });
    },

    async _filtersToQuery(filters) {
      if (!filters || !filters.length) return "";
      const walk = (f) => {
        if (f._bMultiFilter) {
          const parts = f.aFilters.map(walk).filter(Boolean);
          if (!parts.length) return "";
          return parts.length === 1 ? parts[0] : `(${parts.join(f.bAnd ? " and " : " or ")})`;
        }
        const lit = (v, path) => {
          if (v instanceof Date) return v.toISOString();
          if (typeof v === "boolean") return v ? "true" : "false";
          if (path === "fileId") {
            const n = typeof v === "number" ? v : (isNumericString(v) ? Number(v) : v);
            return (typeof n === "number") ? String(n) : `'${String(v).replace(/'/g, "''")}'`;
          }
          return `'${String(v).replace(/'/g, "''")}'`;
        };
        switch (f.sOperator) {
          case FilterOperator.EQ: return `${f.sPath} eq ${lit(f.oValue1, f.sPath)}`;
          case FilterOperator.GE: return `${f.sPath} ge ${lit(f.oValue1, f.sPath)}`;
          case FilterOperator.LE: return `${f.sPath} le ${lit(f.oValue1, f.sPath)}`;
          case FilterOperator.BT: return `(${f.sPath} ge ${lit(f.oValue1, f.sPath)} and ${f.sPath} le ${lit(f.oValue2, f.sPath)})`;
          default: return "";
        }
      };
      return filters.map(walk).filter(Boolean).join(" and ");
    }

  });
});
