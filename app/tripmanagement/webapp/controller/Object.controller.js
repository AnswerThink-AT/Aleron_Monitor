sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Token"
], function(Controller, JSONModel, UIComponent, History, MessageToast, MessageBox,
    Fragment, Filter, FilterOperator, Token) {
    "use strict";

    function formatDateToEdm(oDate) {
        if (!oDate) return null;
        return oDate instanceof Date ? oDate.toISOString().split("T")[0] : oDate;
    }


    return Controller.extend("tripmanagement.controller.Object", {

        getBaseURL: function () {
          var appId   = this.getOwnerComponent().getManifestEntry("/sap.app/id");
          var appPath = appId.replace(/\./g, "/");
          return jQuery.sap.getModulePath(appPath);
        },

        updateTotalNetAmount: function() {
            const oModel = this.getView().getModel("trip"),
                aLines = oModel.getProperty("/ExpenseReceipts") || [],
                fSum = aLines.reduce((acc, l) => acc + (parseFloat(l.Amount) || 0), 0);
            oModel.setProperty("/TotalNetAmount", fSum.toFixed(2));
            oModel.setProperty("/Header/TripSettlement", fSum.toFixed(2));
        },

        _validationRules: {
            // General Information
            inpProject: {
                regex: /^[A-Za-z]+$/,
                max: 12,
                fieldName: "Project"
            },
            inpCountryRegion: {
                regex: /^[A-Z]{3}$/,
                max: 3,
                fieldName: "CountryRegion"
            },
            inpReasonForTrip: {
                regex: /^.*$/,
                max: 25,
                fieldName: "ReasonForTrip"
            },
            inpComments: {
                regex: /^.*$/,
                max: 100,
                fieldName: "Comments"
            },
            inpCurrency: {
                regex: /^[A-Z]{3}$/,
                max: 3,
                fieldName: "Currency"
            },
            inpRegion: {
                regex: /^[A-Z]{2}$/,
                max: 2,
                fieldName: "Region"
            },
            inpContractNo: {
                regex: /^[A-Za-z0-9]+$/,
                max: 10,
                fieldName: "ContractNo"
            },
            inpDestination: {
                regex: /^.*$/,
                max: 50,
                fieldName: "Destination"
            },
            inpTripSettlement: {
                regex: /^[0-9]+$/,
                max: null,
                fieldName: "TripSettlement"
            },
            inpTripType: {
                regex: /^.*$/,
                max: 2,
                fieldName: "TripType"
            },
            inpWnWorkOrder: {
                regex: /^.*$/,
                max: 30,
                fieldName: "WnWorkOrder"
            },
            inpWnInvoiceNo: {
                regex: /^.*$/,
                max: 15,
                fieldName: "WnInvoiceNo"
            },
            inpWoType: {
                regex: /^.*$/,
                max: 2,
                fieldName: "WoType"
            },

            // Expense Receipts
            _IDGenInput16: {
                regex: /^[0-9]{1,12}$/,
                max: 12,
                fieldName: "ExpenseReceiptNumber"
            },
            _IDGenInput17: {
                regex: /^[A-Za-z0-9]+$/,
                max: 4,
                fieldName: "TripExpenseType"
            },
            _IDGenInput18: {
                regex: /^[0-9]+(\.[0-9]{1,2})?$/,
                max: null,
                fieldName: "Amount"
            },
            _IDGenInput19: {
                regex: /^[A-Z]{3}$/,
                max: 3,
                fieldName: "Currency"
            },
            _IDGenInput20: {
                regex: /^.*$/,
                max: 20,
                fieldName: "From"
            },
            _IDGenInput21: {
                regex: /^.*$/,
                max: 20,
                fieldName: "To"
            },
            _IDGenInput22: {
                regex: /^[0-9]+$/,
                max: null,
                fieldName: "ReceiptsDocumentNumber"
            },
            _IDGenInput53: {
                regex: /^https?:\/\/.+$/,
                max: 120,
                fieldName: "UrlLink"
            },

            // Customer Reference Fields
            _IDGenInput1: {
                regex: /^[A-Za-z0-9]+$/,
                max: 10,
                fieldName: "SAPSalesOrderNumber"
            },
            _IDGenInput23: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerCompanyCode"
            },
            _IDGenInput24: {
                regex: /^.*$/,
                max: 30,
                fieldName: "SGVendorNumber"
            },
            _IDGenInput25: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerEmployeeNumber"
            },
            _IDGenInput26: {
                regex: /^.*$/,
                max: 30,
                fieldName: "PurchaseAgreement"
            },
            _IDGenInput27: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerCostCenter"
            },
            _IDGenInput28: {
                regex: /^.*$/,
                max: 10,
                fieldName: "SAPSalesOrderItemNumber"
            },
            _IDGenInput29: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerDepartmentNumber"
            },
            _IDGenInput30: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerOrgCode"
            },
            _IDGenInput31: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerAgreementName"
            },
            _IDGenInput32: {
                regex: /^.*$/,
                max: 30,
                fieldName: "BBNumber"
            },
            _IDGenInput33: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustPOLineItemNumber"
            },
            _IDGenInput34: {
                regex: /^\d{4}-\d{2}-\d{2}$/,
                max: null,
                fieldName: "CustomerWeekEnding"
            },
            _IDGenInput35: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerRUI"
            },
            _IDGenInput36: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerLegalEntity"
            },
            _IDGenInput37: {
                regex: /^.*$/,
                max: 30,
                fieldName: "TaskNumber"
            },
            _IDGenInput38: {
                regex: /^\d{4}-\d{2}-\d{2}$/,
                max: null,
                fieldName: "CustomerBackgroundCheckDate"
            },
            _IDGenInput39: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerBusinessUnit"
            },
            _IDGenInput40: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerAccountNumber"
            },
            _IDGenInput41: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerOracleNumber"
            },
            _IDGenInput42: {
                regex: /^.*$/,
                max: 30,
                fieldName: "FEPSCode"
            },
            _IDGenInput43: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerDivisionUnitNumber"
            },
            _IDGenInput44: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerChargeNumber"
            },
            _IDGenInput45: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerBudgetCenter"
            },
            _IDGenInput46: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerUnitStoreNumber"
            },
            _IDGenInput47: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerPosition"
            },
            _IDGenInput48: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerPositionCodeJobID"
            },
            _IDGenInput49: {
                regex: /^.*$/,
                max: 30,
                fieldName: "ProjectNumber"
            },
            _IDGenInput50: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerContractNumber"
            },
            _IDGenInput51: {
                regex: /^\d{4}-\d{2}-\d{2}$/,
                max: null,
                fieldName: "ServiceDateForSdiIbm"
            },
            _IDGenInput52: {
                regex: /^.*$/,
                max: 30,
                fieldName: "CustomerGLCode"
            }
        },

        /** Promise for lazy‐loaded country dialog */
        _pCountryDialog: null,
        _oCountryDialog: null,



        _mapStatusText: function(code) {
            switch (code) {
                case 0:
                    return "Created";
                case 1:
                    return "Approved";
                case 2:
                    return "Settled";
                case 3:
                    return "Sales Order Updated";
                case 4:
                    return "Purchase Order Updated";
                case 5:
                    return "Completed";
                case 6:
                    return "Cancelled";
                case 7:
                    return "Draft";
                case 8:
                    return "Settle Error";
                default:
                    return "Unknown";
            }
        },

        _mapStatusState: function(code) {
            switch (code) {
                case 0:
                    return "None";
                case 1:
                    return "Success";
                case 2:
                    return "Neutral";
                case 3:
                    return "Information";
                case 4:
                    return "Information";
                case 5:
                    return "Success";
                case 6:
                    return "None";
                case 7:
                    return "Warning";
                case 8:
                    return "Error";
                default:
                    return "None";
            }
        },


        /** Loads the fragment once, attaches it, and returns it */
        _getCountryDialog: function() {
            if (!this._pCountryDialog) {
                this._pCountryDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "tripmanagement.view.CountrySelectDialog",
                    controller: this
                }).then(function(oDlg) {
                    this._oCountryDialog = oDlg;
                    this.getView().addDependent(oDlg);
                    return oDlg;
                }.bind(this));
            }
            return this._pCountryDialog;
        },

        onInit: function() {
            const oRouter = UIComponent.getRouterFor(this);

            this._oExpenseTypesModel = new JSONModel([]);
            this.getView().setModel(this._oExpenseTypesModel, "expenseTypes");
            const oTripModel = new sap.ui.model.json.JSONModel({
                Header: {},
                Mode: "edit" // or "create"
            });
            this.getView().setModel(oTripModel, "trip");

            // only once!
            oRouter.getRoute("object")
                .attachPatternMatched(this._onObjectMatched, this);

            oRouter.getRoute("tripObject")
                .attachPatternMatched(this._onTripDisplayMatched, this);

            this._aAllExpenseTypes = [];
            $.ajax({
                // url: "/odata/v4/trip/ExpenseTypeMapping?$filter=TripProvision eq '07' or TripProvision eq '10'",
                url: this.getBaseURL() + "/odata/v4/trip/ExpenseTypeMapping?$filter=TripProvision eq '07' or TripProvision eq '10'",
                method: "GET",
                dataType: "json",
                success: oData => {
                    this._aAllExpenseTypes = oData.value; // stash entire list
                    console.log("All expense types loaded:", this._aAllExpenseTypes);
                    // ── NEW: seed US types immediately ────────────────────────
                    this._filterExpenseTypes("07");
                    // ensure the JSONModel notifies the table binding
                    this._oExpenseTypesModel.refresh(true);
                    // ── end NEW ───────────────────────────────────────────────
                },
                error: (jq, status, err) => {
                    console.error("Failed to load ExpenseTypeMapping:", status, err);
                }
            });

            // ←–– REPLACE your oData.callFunction(...) with a straight AJAX call:
            $.ajax({
                // url: "/odata/v4/trip/getCountryCurrencyMap",
                url: this.getBaseURL() + "/odata/v4/trip/getCountryCurrencyMap",
                method: "GET",
                dataType: "json",
                success: oResult => {
                    // keep the full array around
                    this._allCcMap = oResult.value;

                    // create a model for the dialog
                    this._ccMapModel = new JSONModel([]);
                    this.getView().setModel(this._ccMapModel, "ccMap");
                },
                error: () => MessageToast.show("Could not load CountryCurrencyMap")
            });

            // 1) prepare an empty cache + JSONModel for your project dialog
            this._allProjects = [];
            this._projectsModel = new JSONModel([]);
            this.getView().setModel(this._projectsModel, "projects");

            // 2) fetch your project cache once
            console.log("[onInit] Loading EnterpriseProjectCache...");
            $.ajax({
                // url: "/odata/v4/trip/EnterpriseProjectCache?$top=5000",
                url: this.getBaseURL() + "/odata/v4/trip/EnterpriseProjectCache?$top=5000",
                method: "GET",
                dataType: "json",
                success: function(oData) {
                    this._allProjects = oData.value || [];
                    console.log(`[onInit] Loaded ${this._allProjects.length} projects`);
                    // seed the model if you like, or wait until the user opens the dialog
                }.bind(this),
                error: function(err) {
                    console.error("[onInit] Failed to load projects", err);
                    MessageToast.show("Could not load project list");
                }.bind(this)
            });

        },


        // onCountryValueHelp: function() {
        //     this._getCountryDialog().then(function(oDlg){
        //       const oMI = this.byId("miCountry");
        //       if (!oMI.getTokens().length) {
        //         // seed a default if you want
        //         oMI.addToken(new Token({ key: "US", text: "US" }));
        //         this.getView().getModel("trip").setProperty("/Header/CountryRegion","US");
        //       }
        //       oDlg.open();
        //     }.bind(this));
        //   },
        // lazy‐load + cache the fragment
        // fragment loader
        /** lazy-loaded Fragment promise + reference */
        _pProjectDialog: null,
        _oProjectDialog: null,

        _getProjectDialog: function() {
            if (!this._pProjectDialog) {
                this._pProjectDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "tripmanagement.view.ProjectSelectDialog",
                    controller: this
                }).then(function(oDlg) {
                    this._oProjectDialog = oDlg;
                    this.getView().addDependent(oDlg);
                    return oDlg;
                }.bind(this));
            }
            return this._pProjectDialog;
        },

        /** open the dialog, seed first 10 projects for initial display */
        onProjectValueHelp: function() {
            const aTop10 = (this._allProjects || []).slice(0, 10);
            this._projectsModel.setData(aTop10);
            this._getProjectDialog().then(oDlg => oDlg.open());
        },

        /** filter locally as the user types */
        onProjectSearch: function(oEvent) {
            const sTerm = (oEvent.getParameter("newValue") || "")
                .trim()
                .toLowerCase();
            let aFiltered;

            if (!sTerm) {
                aFiltered = (this._allProjects || []).slice(0, 10);
            } else {
                aFiltered = (this._allProjects || []).filter(item => {
                    const code = (item.PROJECT || "").toString().toLowerCase();
                    const desc = (item.PROJECTDESCRIPTION || "").toString().toLowerCase();
                    return code.includes(sTerm) || desc.includes(sTerm);
                });
            }

            this._projectsModel.setData(aFiltered);
        },

        /** when the user confirms a row */
        onProjectSelect: function(oEvent) {
            const oItem = oEvent.getParameter("selectedItem") ||
                oEvent.getParameter("listItem");
            if (!oItem) {
                this._oProjectDialog.close();
                return;
            }

            const oCtx = oItem.getBindingContext("projects").getObject();
            const oTripM = this.getView().getModel("trip");

            // auto-populate your header
            oTripM.setProperty("/Header/Project", oCtx.PROJECT);
            oTripM.setProperty("/Header/SAPSalesOrderNumber", oCtx.YY1_SALESORDER_PPH);
            oTripM.setProperty("/Header/CustomerCompanyCode", oCtx.COMPANYCODE);
            oTripM.setProperty("/Header/CustomerEmployeeNumber", oCtx.YY1_EMPLOYEE_PPH);
            oTripM.setProperty("/Header/CustomerCostCenter", oCtx.RESPONSIBLECOSTCENTER);
            oTripM.setProperty("/Header/ProjectNumber", oCtx.PROJECT);

            // update the MultiInput token
            const mi = this.byId("miProject");
            mi.removeAllTokens();
            mi.addToken(new sap.m.Token({
                key: oCtx.PROJECT,
                text: `${oCtx.PROJECT} – ${oCtx.PROJECTDESCRIPTION}`
            }));

            this._oProjectDialog.close();
        },

        onProjectCancel: function() {
            this._oProjectDialog.close();
        },
        _pDestinationDialog: null,
        _oDestinationDialog: null,

        /** Load the fragment once, attach it, and return it */
        _getDestinationDialog: function() {
            if (!this._pDestinationDialog) {
                this._pDestinationDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "tripmanagement.view.DestinationSelectDialog",
                    controller: this
                }).then(function(oDlg) {
                    this._oDestinationDialog = oDlg;
                    this.getView().addDependent(oDlg);
                    return oDlg;
                }.bind(this));
            }
            return this._pDestinationDialog;
        },

        /** Load and open the destination dialog via AJAX */
        onDestinationValueHelp: function() {
            $.ajax({
                // url: "/odata/v4/trip/Countries",
                url: this.getBaseURL() + "/odata/v4/trip/Countries",
                method: "GET",
                dataType: "json",
                success: oResult => {
                    // oResult.value is array of { code, name, descr }
                    const aCountries = oResult.value.map(c => ({
                        code: c.code,
                        name: c.name
                    }));
                    // set into a new JSONModel named "countries"
                    this.getView().setModel(new JSONModel(aCountries), "countries");
                    // prime top-30 shown
                    this.getView().getModel("countries").setSizeLimit(aCountries.length);
                    this._getDestinationDialog().then(oDlg => oDlg.open());
                },
                error: () => {
                    MessageToast.show("Could not load country list");
                }
            });
        },

        /** Filter the dialog list locally after initial AJAX load */
        onDestinationSearch: function(oEvent) {
            const sTerm = (oEvent.getParameter("newValue") || "")
                .trim().toUpperCase();
            const oModel = this.getView().getModel("countries");
            const aAll = oModel.getData() || [];
            const aFiltered = !sTerm ?
                aAll.slice(0, 30) :
                aAll.filter(item =>
                    (item.code || "").toUpperCase().includes(sTerm) ||
                    (item.name || "").toUpperCase().includes(sTerm)
                );
            oModel.setData(aFiltered);
        },


        /** User picks one destination */
        onDestinationSelect: function(oEvent) {
            const oCtx = oEvent.getParameter("listItem")
                .getBindingContext("countries")
                .getObject(),
                sDest = oCtx.code,
                oTripM = this.getView().getModel("trip");

            // 1) set Destination only
            oTripM.setProperty("/Header/Destination", sDest);
            const oMiDest = this.byId("miDestination");
            oMiDest.removeAllTokens();
            oMiDest.addToken(new Token({
                key: sDest,
                text: sDest
            }));

            // 2) re-filter expense types based on the NEW destination provision
            //    but do NOT touch Currency!
            const sProv = sDest === "US" ? "07" :
                sDest === "CA" ? "10" :
                null;
            this._filterExpenseTypes(sProv);

            // 3) close the dialog
            this._oDestinationDialog.close();
        },



        onDestinationCancel: function() {
            this._oDestinationDialog.close();
        },

        onCountryValueHelp: function() {
            // take the first 5 entries
            const aTop5 = (this._allCcMap || []).slice(0, 5);
            this._ccMapModel.setData(aTop5);

            // open the dialog
            this._getCountryDialog().then(oDlg => oDlg.open());
        },



        onCountrySearch: function(oEvent) {
            // get typed text (liveChange & search)
            const sTerm = (oEvent.getParameter("newValue") ||
                oEvent.getSource().getValue() ||
                ""
            ).trim().toUpperCase();

            let aFiltered;
            if (!sTerm) {
                // no search → back to top 5
                aFiltered = (this._allCcMap || []).slice(0, 5);
            } else {
                // include any Country **or** Currency containing the term
                aFiltered = (this._allCcMap || []).filter(item =>
                    item.Country.toUpperCase().includes(sTerm) ||
                    item.Currency.toUpperCase().includes(sTerm)
                );
            }

            // update the dialog model
            this._ccMapModel.setData(aFiltered);
        },

        onCountrySelect: function(oEvent) {
            const oItem = oEvent.getParameter("listItem") || oEvent.getParameter("selectedItem"),
                oCtx = oItem.getBindingContext("ccMap").getObject(),
                sCountry = oCtx.Country,
                sCurrency = oCtx.Currency,
                oTripM = this.getView().getModel("trip");

            // seed the three MultiInputs + header
            const seed = (id, key, text) => {
                const mi = this.byId(id);
                mi.removeAllTokens();
                mi.addToken(new Token({
                    key,
                    text
                }));
            };
            seed("miCountry", sCountry, sCountry);
            oTripM.setProperty("/Header/CountryRegion", sCountry);

            seed("miDestination", sCountry, sCountry);
            oTripM.setProperty("/Header/Destination", sCountry);

            seed("miCurrency", sCurrency, sCurrency);
            oTripM.setProperty("/Header/Currency", sCurrency);

            // ── NEW: propagate into every receipt ─────────────────────
            const aReceipts = oTripM.getProperty("/ExpenseReceipts") || [];
            aReceipts.forEach(r => r.Currency = sCurrency);
            oTripM.setProperty("/ExpenseReceipts", aReceipts);
            oTripM.refresh(true);
            // ── end NEW ───────────────────────────────────────────────

            this._oCountryDialog.close();

            const sProv = (sCountry === "US" ? "07" :
                sCountry === "CA" ? "10" :
                null);
            this._filterExpenseTypes(sProv);
        },


        /**
         * Renumber ExpenseReceiptNumber (and optionally ReceiptsDocumentNumber) 1..n
         * Keeps everything else (amount, type, GL, etc.) unchanged.
         */
        _resequenceExpenseReceipts: function() {
            const oModel = this.getView().getModel("trip");
            const aItems = oModel.getProperty("/ExpenseReceipts") || [];

            console.group("[_resequenceExpenseReceipts]");
            const aNew = aItems.map((row, idx) => {
                const newNo = String(idx + 1);
                console.log(`  row old#=${row.ExpenseReceiptNumber} → new#=${newNo}`);
                return {
                    ...row,
                    ExpenseReceiptNumber: newNo,
                    ReceiptsDocumentNumber: newNo // keep in sync; remove if you don't want this
                };
            });
            console.groupEnd();

            oModel.setProperty("/ExpenseReceipts", aNew);
            oModel.refresh(true);
        },



        /**
         * Filter the preloaded array by provision (07 or 10) and push
         * the subset into the dropdown model.
         */
        // _filterExpenseTypes: function (provision) {
        //     const aFiltered = provision
        //     ? this._aAllExpenseTypes.filter(e => e.TripProvision === provision)
        //     : [];
        //     console.log("Filtered expense types for", provision, aFiltered);
        //     this._oExpenseTypesModel.setData(aFiltered);
        // },

        _filterExpenseTypes: function(provision) {
            const aFiltered = provision ?
                (this._aAllExpenseTypes || []).filter(e => e.TripProvision === provision) :
                [];
            console.log("[_filterExpenseTypes] provision =", provision, "count =", aFiltered.length, aFiltered);
            this._oExpenseTypesModel.setData(aFiltered);
        },




        /**
         * Display mode: fetch the Trip by its key (with expands)
         */

        _onTripDisplayMatched: function (oEvent) {
            const oArgs = oEvent.getParameter("arguments");
            const sTripNumber = oArgs.TripNumber;
            const sPersonnel = oArgs.Personnel;

            if (!sTripNumber || !sPersonnel) {
                MessageBox.error("TripNumber or Personnel is missing from route parameters.");
                return;
            }

            const oView = this.getView();
            const oEmptyModel = new sap.ui.model.json.JSONModel({
                Mode: "display",
                TripNumber: sTripNumber,
                Personnel: sPersonnel,
                Header: { Comments: "" },
                ExpenseReceipts: [],
                Costs: []
            });
            oView.setModel(oEmptyModel, "trip");
            oEmptyModel.refresh(true);
            this._allProjects = [];
            if (this._projectsModel) {
                this._projectsModel.setData([]);
                this._projectsModel.refresh(true);
            }

            const sUrl = `/odata/v4/trip/Trip?$filter=TripNumber eq '${sTripNumber}' and Personnel eq '${sPersonnel}'&$expand=Header,Items,Costs`;
            console.log("Fetching Trip:", sUrl);

            oView.setBusy(true);
            $.ajax({
                url: this.getBaseURL() + sUrl,
                method: "GET",
                cache: false,
                dataType: "json"
            })
                .then((oProjData) => {
                    this._allProjects = oProjData.value || [];
                    console.log(`[ObjectPage] ✅ Project cache refreshed (${this._allProjects.length} entries)`);
                    return $.ajax({
                        url: this.getBaseURL() + sUrl,
                        method: "GET",
                        cache: false,
                        headers: {
                            "Cache-Control": "no-cache, no-store, must-revalidate",
                            "Pragma": "no-cache",
                            "Expires": "0"
                        },
                        contentType: "application/json"
                    });
                })
                .then((oData) => {
                    console.log("[ObjectPage] Raw Trip OData:", oData);
                    const oTrip = oData.value && oData.value[0];
                    if (!oTrip) {
                        MessageBox.error("Trip not found.");
                        oView.setBusy(false);
                        return;
                    }

                    const aReceipts = (oTrip.Items || []).map(item => ({
                        ...item,
                        Currency: item.Currency_code
                    }));
                    const oDisplay = {
                        Mode: "display",
                        TripNumber: oTrip.TripNumber,
                        Personnel: oTrip.Personnel,
                        StartOfTrip: new Date(oTrip.StartOfTrip),
                        EndOfTrip: new Date(oTrip.EndOfTrip),

                        Header: {
                            Project: oTrip.Header.Project,
                            CountryRegion: oTrip.Header.Country_code,
                            Currency: oTrip.Header.Currency_code,
                            Region: oTrip.Header.Region,
                            TripType: oTrip.Header.TripType,
                            TripSettlement: oTrip.Header.TotalAmount,
                            WnInvoiceNo: oTrip.Header.WnInvoiceNo,
                            WnWorkOrder: oTrip.Header.WnWorkOrder,
                            WoType: oTrip.Header.WoType,
                            ReasonForTrip: oTrip.Header.ReasonForTrip,
                            Comments: oTrip.Header.Comments,
                            ContractNo: oTrip.Header.ContractNo,
                            Destination: oTrip.Header.Destination,

                            // — Customer Reference Fields —
                            SAPSalesOrderNumber: oTrip.Header.SapSalesDocNo,
                            CustomerCompanyCode: oTrip.Header.CustCompanyCode,
                            SGVendorNumber: oTrip.Header.SGVendorNo,
                            CustomerEmployeeNumber: oTrip.Header.CustEmployeeNo,
                            PurchaseAgreement: oTrip.Header.PurchaseAgreement,
                            CustomerCostCenter: oTrip.Header.CustCostCentre,
                            SAPSalesOrderItemNumber: oTrip.Header.SapSalesDocItemNo,
                            CustomerDepartmentNumber: oTrip.Header.CustDeptNo,
                            CustomerOrgCode: oTrip.Header.CustOrgCode,
                            CustomerAgreementName: oTrip.Header.CustAgreementName,
                            BBNumber: oTrip.Header.BB,
                            CustPOLineItemNumber: oTrip.Header.CustPoLineItemNo,
                            CustomerWeekEnding: oTrip.Header.CustWeekEnding,
                            CustomerRUI: oTrip.Header.CustRUI,
                            CustomerLegalEntity: oTrip.Header.CustLegalEntity,
                            TaskNumber: oTrip.Header.Task,
                            CustomerBackgroundCheckDate: oTrip.Header.CustBackgroundCheckDate,
                            CustomerBusinessUnit: oTrip.Header.CustBusinessUnit,
                            CustomerAccountNumber: oTrip.Header.CustAccountNo,
                            CustomerOracleNumber: oTrip.Header.CustOracleNo,
                            FEPSCode: oTrip.Header.FEPSCode,
                            CustomerDivisionUnitNumber: oTrip.Header.CustDivisionUnitNo,
                            CustomerChargeNumber: oTrip.Header.CustChargeNo,
                            CustomerBudgetCenter: oTrip.Header.CustBudgetCenter,
                            CustomerUnitStoreNumber: oTrip.Header.CustUnitStoreNo,
                            CustomerPosition: oTrip.Header.CustPosition,
                            CustomerPositionCodeJobID: oTrip.Header.CustPositionCode,
                            ProjectNumber: oTrip.Header.ProjectNo,
                            CustomerContractNumber: oTrip.Header.CustContractNo,
                            ServiceDateForSdiIbm: oTrip.Header.ServiceDate,
                            CustomerGLCode: oTrip.Header.CustGLCode
                        },

                        ExpenseReceipts: aReceipts,
                        Costs: oTrip.Costs || [],

                        _validations: {
                            Project: { state: "None", text: "" }
                        }
                    };

                    const iCode = Number(oTrip.Header.TripStatus_code);
                    oDisplay.StatusText = this._mapStatusText(iCode);
                    oDisplay.StatusState = this._mapStatusState(iCode);
                    const oTripModel = new sap.ui.model.json.JSONModel(oDisplay);
                    oTripModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                    oTripModel.refresh(true);

                    oView.setModel(oTripModel, "trip");
                    console.log("[ObjectPage] ✅ Trip model replaced with fresh data");

                    this.updateTotalNetAmount();
                    const seed = (id, key, text) => {
                        const mi = this.byId(id);
                        if (!mi) return;
                        mi.removeAllTokens();
                        if (key) mi.addToken(new sap.m.Token({ key, text }));
                    };

                    seed("miCountry", oDisplay.Header.CountryRegion, oDisplay.Header.CountryRegion);
                    seed("miCurrency", oDisplay.Header.Currency, oDisplay.Header.Currency);
                    seed("miDestination", oDisplay.Header.Destination, oDisplay.Header.Destination);
                    const sProjectKey = oDisplay.Header.Project;
                    let sProjectText = sProjectKey;
                    if (sProjectKey && this._allProjects?.length) {
                        const oProj = this._allProjects.find(p => p.PROJECT === sProjectKey);
                        if (oProj) {
                            sProjectText = `${oProj.PROJECT} – ${oProj.PROJECTDESCRIPTION}`;
                        }
                    }
                    seed("miProject", sProjectKey, sProjectText);
                    const sDest = oDisplay.Header.Destination;
                    const sProv = sDest === "US" ? "07" : sDest === "CA" ? "10" : null;
                    this._filterExpenseTypes(sProv);

                    oView.setBusy(false);
                })
                .catch((err) => {
                    console.error("[ObjectPage] Load failed:", err);
                    oView.setBusy(false);
                    MessageBox.error("Could not load trip data");
                });
        },

        _onObjectMatched: function(oEvent) {
            var oArgs = oEvent.getParameter("arguments"),
                sMode = oArgs.mode,
                sPersonnel = oArgs.Personnel,
                sStartOfTrip = oArgs.StartOfTrip,
                sEndOfTrip = oArgs.EndOfTrip;

            console.log("Matched with:", sPersonnel, sStartOfTrip, sEndOfTrip);
            // Now you can verify in the console that mode/personnel/startDate/endDate came through

            var oData = {
                Mode: sMode,
                Personnel: sPersonnel,
                StartOfTrip: new Date(sStartOfTrip),
                EndOfTrip: new Date(sEndOfTrip),
                // StatusText: this._mapStatusText(0),
                // StatusState: this._mapStatusState(0),
                StatusText: this._mapStatusText(sMode === "create" ? 7 : 0),
                StatusState: this._mapStatusState(sMode === "create" ? 7 : 0),

                //  everything your XML binds lives under Header
                Header: {
                    Project: "",
                    CountryRegion: "",
                    ReasonForTrip: "",
                    Comments: "",
                    Currency: "",
                    Region: "",
                    ContractNo: "",
                    Destination: "",
                    TripSettlement: 0,
                    TripType: "",
                    WnWorkOrder: "",
                    WnInvoiceNo: "",
                    WoType: "",

                    // Customer Reference Fields
                    SAPSalesOrderNumber: "",
                    CustomerCompanyCode: "",
                    SGVendorNumber: "",
                    CustomerEmployeeNumber: "",
                    PurchaseAgreement: "",
                    CustomerCostCenter: "",
                    SAPSalesOrderItemNumber: "",
                    CustomerDepartmentNumber: "",
                    CustomerOrgCode: "",
                    CustomerAgreementName: "",
                    BBNumber: "",
                    CustPOLineItemNumber: "",
                    CustomerWeekEnding: "",
                    CustomerRUI: "",
                    CustomerLegalEntity: "",
                    TaskNumber: "",
                    CustomerBackgroundCheckDate: "",
                    CustomerBusinessUnit: "",
                    CustomerAccountNumber: "",
                    CustomerOracleNumber: "",
                    FEPSCode: "",
                    CustomerDivisionUnitNumber: "",
                    CustomerChargeNumber: "",
                    CustomerBudgetCenter: "",
                    CustomerUnitStoreNumber: "",
                    CustomerPosition: "",
                    CustomerPositionCodeJobID: "",
                    ProjectNumber: "",
                    CustomerContractNumber: "",
                    ServiceDateForSdiIbm: "",
                    CustomerGLCode: ""
                },

                // table-bound section
                ExpenseReceipts: [],

                // your validation map (add more fields here as needed)
                _validations: {
                    Project: {
                        state: "None",
                        text: ""
                    }
                }
            };
            this.getView().setModel(new JSONModel(oData), "trip");
            this.updateTotalNetAmount();

            if (oArgs.mode === "create") {
                const sDefaultCountry = "US",
                    sDefaultCurrency = "USD",
                    oTripM = this.getView().getModel("trip");

                // 1) header defaults
                oTripM.setProperty("/Header/CountryRegion", sDefaultCountry);
                oTripM.setProperty("/Header/Destination", sDefaultCountry);
                oTripM.setProperty("/Header/Currency", sDefaultCurrency);

                // 2) seed the three MultiInputs
                const seed = (id, key, text) => {
                    const mi = this.byId(id);
                    mi.removeAllTokens();
                    mi.addToken(new Token({
                        key,
                        text
                    }));
                };
                seed("miCountry", sDefaultCountry, sDefaultCountry);
                seed("miDestination", sDefaultCountry, sDefaultCountry);
                seed("miCurrency", sDefaultCurrency, sDefaultCurrency);

                // 3) filter expense types for US (provision “07”)
                this._filterExpenseTypes("07");
            }
        },

        _setStatusByCode: function(iCode) {
            const oM = this.getView().getModel("trip");
            const n = Number(iCode);
            oM.setProperty("/StatusText", this._mapStatusText(n));
            oM.setProperty("/StatusState", this._mapStatusState(n));
            oM.setProperty("/Header/TripStatus_code", n);
            oM.refresh(true);
        },


        onSave: function() {
            const oModel = this.getView().getModel("trip"),
                oData = oModel.getData(),
                // 1) Recompute the total from the table
                fTotal = (oData.ExpenseReceipts || [])
                .reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0),
                sStart = formatDateToEdm(oData.StartOfTrip),
                sEnd = formatDateToEdm(oData.EndOfTrip),
                sPers = oData.Personnel,
                sTripNum = oData.TripNumber;

            console.group("🛠 onSave()");
            console.log(" Mode:       ", oData.Mode);
            console.log(" TripNumber: ", sTripNum);

            // 2) Write totals back into the JSONModel for immediate UI feedback
            oModel.setProperty("/TotalNetAmount", fTotal.toFixed(2));
            oModel.setProperty("/Header/TripSettlement", fTotal);


            const h = oData.Header;
            const provision = (h.Destination === "US" ? "07" :
                h.Destination === "CA" ? "10" :
                null);
            // list of allowed TripExpenseType codes for that provision
            const allowedTypes = provision ?
                this._aAllExpenseTypes
                .filter(e => e.TripProvision === provision)
                .map(e => e.TripExpenseType) :
                [];
            // abort if any receipt has an invalid code
            // for (const r of oData.ExpenseReceipts) {
            //     // skip any row that hasn’t been given a code yet
            //     if (!r.TripExpenseType) {
            //       continue;
            //     }
            //     if (!allowedTypes.includes(r.TripExpenseType)) {
            //       MessageBox.error(
            //         `Invalid Expense Type “${r.TripExpenseType}” for provision ${provision}.`
            //       );
            //       return;
            //     }
            //   }

            // 3) Build the Header payload, only including non-blank codes


            const oHeaderPayload = {
                TripType: h.TripType,
                Destination: h.Destination,
                Region: h.Region,
                TotalAmount: fTotal,
                ReasonForTrip: h.ReasonForTrip,
                Comments: h.Comments,
                ContractNo: h.ContractNo,
                WnInvoiceNo: h.WnInvoiceNo,
                SapEmployeeNo: sPers,
                WnWorkOrder: h.WnWorkOrder,
                WoType: h.WoType,
                Project: h.Project,
                TripStatus_code: 0,

                // <-- these two must match your deep-insert names
                ...(h.CountryRegion && {
                    Country_code: h.CountryRegion
                }),
                ...(h.Currency && {
                    Currency_code: h.Currency
                }),

                // all the rest exactly as your insert
                SapSalesDocNo: h.SAPSalesOrderNumber,
                SapSalesDocItemNo: h.SAPSalesOrderItemNumber,
                CustWeekEnding: formatDateToEdm(h.CustomerWeekEnding),
                CustBusinessUnit: h.CustomerBusinessUnit,
                CustChargeNo: h.CustomerChargeNumber,
                ProjectNo: h.ProjectNumber,
                CustCompanyCode: h.CustomerCompanyCode,
                CustDeptNo: h.CustomerDepartmentNumber,
                CustDOTSNo: h.CustPOLineItemNumber,
                CustRUI: h.CustomerRUI,
                CustAccountNo: h.CustomerAccountNumber,
                CustBudgetCenter: h.CustomerBudgetCenter,
                CustContractNo: h.CustomerContractNumber,
                SGVendorNo: h.SGVendorNumber,
                CustOrgCode: h.CustomerOrgCode,
                CustLegalEntity: h.CustomerLegalEntity,
                CustOracleNo: h.CustomerOracleNumber,
                CustUnitStoreNo: h.CustomerUnitStoreNumber,
                ServiceDate: formatDateToEdm(h.ServiceDateForSdiIbm),
                CustEmployeeNo: h.CustomerEmployeeNumber,
                CustAgreementName: h.CustomerAgreementName,
                Task: h.TaskNumber,
                FEPSCode: h.FEPSCode,
                CustPosition: h.CustomerPosition,
                CustGLCode: h.CustomerGLCode,
                PurchaseAgreement: h.PurchaseAgreement,
                BB: h.BBNumber,
                CustBackgroundCheckDate: formatDateToEdm(h.CustomerBackgroundCheckDate),
                CustDivisionUnitNo: h.CustomerDivisionUnitNumber,
                CustPositionCode: h.CustomerPositionCodeJobID,
                CustCostCentre: h.CustomerCostCenter,
                CustPoLineItemNo: h.CustPOLineItemNumber
            };

            // 4) Build the Items payload array — again using the deep-insert names…
            const aItems = (oData.ExpenseReceipts || []).map(r => {
                const i = {
                    ExpenseReceiptNumber: r.ExpenseReceiptNumber,
                    TripExpenseType: r.TripExpenseType,
                    Amount: parseFloat(r.Amount) || 0,
                    From: r.From,
                    To: r.To,
                    ReceiptsDocumentNumber: r.ReceiptsDocumentNumber,
                    UrlLink: r.UrlLink
                };
                // only include a currency if it’s non-blank
                if (r.Currency) {
                    i.Currency_code = r.Currency;
                }
                return i;
            });

            // 5) Deep payload for either POST (new) or PATCH (update)
            if (!sTripNum) {
                // — NEW Trip via deep-insert —
                const oPayload = {
                    Personnel: sPers,
                    StartOfTrip: sStart,
                    EndOfTrip: sEnd,
                    Header: oHeaderPayload,
                    Items: aItems,
                    Costs: oData.Costs // adjust similarly if you add Costs
                };
                console.log("→ POST payload:", oPayload);
                console.log("→ POST /odata/v4/trip/Trip");
                $.ajax({
                    // url: "/odata/v4/trip/Trip",
                    url: this.getBaseURL() + "/odata/v4/trip/Trip",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(oPayload),

                    success: (res) => {
                        console.log("✅ POST success:", res);

                        // put keys on the model
                        oModel.setProperty("/TripNumber", res.TripNumber);
                        oModel.setProperty("/Personnel", res.Personnel);
                        oModel.setProperty("/Mode", "display");

                        // set UI status from response (fallback → Created=0)
                        const codeFromRes =
                            (res && res.Header && res.Header.TripStatus_code) ??
                            (res && res.TripStatus_code) ?? 0;
                        this._setStatusByCode(codeFromRes);

                        // make sure bindings repaint
                        oModel.refresh(true);

                        MessageBox.success(
                            `Trip number ${res.TripNumber} for Personnel ${res.Personnel} has been saved.`, {
                                actions: [MessageBox.Action.OK]
                            }
                        );
                    },

                    error: xhr => {
                        console.error("❌ POST error:", xhr);
                        console.error(">>> raw responseText:", xhr.responseText);
                        MessageBox.error("Create failed: " + this._parseError(xhr));
                    }
                });

            } else {
                // — EXISTING Trip via deep-PATCH on the root Trip entity —
                const sKey = encodeURI(
                    `Trip(TripNumber=${sTripNum},Personnel='${sPers}',StartOfTrip='${sStart}',EndOfTrip='${sEnd}')`
                );
                const oDeepPayload = {
                    Header: oHeaderPayload,
                    Items: aItems,
                    Costs: oData.Costs
                };

                console.log("→ PATCH payload:", oDeepPayload);
                console.log("→ PATCH /odata/v4/trip/" + sKey);
                $.ajax({
                    // url: `/odata/v4/trip/${sKey}`,
                    url: this.getBaseURL() + `/odata/v4/trip/${sKey}`,
                    method: "PATCH",
                    contentType: "application/json",
                    data: JSON.stringify(oDeepPayload),

                    success: (res) => {
                        console.log("✅ PATCH success:", res);

                        // switch to display mode
                        oModel.setProperty("/Mode", "display");

                        // prefer backend status if it comes back; otherwise keep Created=0
                        const codeFromRes =
                            (res && res.Header && res.Header.TripStatus_code) ??
                            (res && res.TripStatus_code) ?? 0;
                        this._setStatusByCode(codeFromRes);
                        oModel.refresh(true);

                        MessageBox.success(
                            `Trip number ${res.TripNumber} for Personnel ${res.Personnel} has been saved.`, {
                                actions: [MessageBox.Action.OK]
                            }
                        );
                    },


                    error: xhr => {
                        console.error("❌ PATCH error:", xhr);
                        console.error(">>> raw responseText:", xhr.responseText);
                        try {
                            const oErr = JSON.parse(xhr.responseText).error;
                            console.error(">>> OData code:", oErr.code);
                            console.error(">>> OData message:", oErr.message);
                            (oErr.details || []).forEach((d, i) =>
                                console.error(`>>> detail[${i}]: target=${d.target}, message=${d.message}`)
                            );
                        } catch (e) {
                            console.warn("Could not JSON.parse error", e);
                        }
                        MessageBox.error("Update failed – see console for details");
                    }
                });
            }

            console.groupEnd();
        },

        _parseError: function(xhr) {
            try {
                return JSON.parse(xhr.responseText).error.message;
            } catch (e) {
                return xhr.responseText;
            }
        },

        onCountryDialogCancel: function() {
            this._oCountryDialog.close();
        },




        onDiscardDraft: function() {
            const oM = this.getView().getModel("trip");
            oM.setProperty("/Mode", "display");
            oM.setProperty("/StatusText", this._mapStatusText(0));
            oM.setProperty("/StatusState", this._mapStatusState(0));
        },


        onEdit: function() {
            const oModel = this.getView().getModel("trip");
            const sStatus = oModel.getProperty("/StatusText"); // “Draft”, “Created”, “Approved”, etc.
            // only allow edit if we’re still in Draft or Created
            if (sStatus !== "Draft" && sStatus !== "Created") {
                MessageBox.error(`You cannot edit this trip because its status is “${sStatus}”.`);
                return;
            }
            // ok, flip into edit mode
            oModel.setProperty("/StatusText", this._mapStatusText(7));
            oModel.setProperty("/StatusState", this._mapStatusState(7));
            oModel.setProperty("/Mode", "create");
        },

        onApprove: function() {
            const oModel = this.getView().getModel("trip");
            const oData = oModel.getData();
            const sTripNumber = oData?.TripNumber;
            const sPersonnel = oData?.Personnel;
            if (!sTripNumber || !sPersonnel) {
                MessageBox.error("TripNumber or Personnel is missing.");
                return;
            }
            // fetch("/odata/v4/Trip/approveTrip", {
                    fetch(this.getBaseURL() + "/odata/v4/Trip/approveTrip", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        TripNumbers: [String(sTripNumber)]
                    })
                })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Trip approval failed.");
                    }
                    return res.json();
                })
                .then(() => {
                    MessageBox.success("Trip approved successfully.", {
                        actions: [MessageBox.Action.OK],
                        onClose: () => {
                            const oRouter = UIComponent.getRouterFor(this);
                            oRouter.navTo("list");
                        }
                    });
                })
                .catch((err) => {
                    console.error("Approval error:", err);
                    MessageBox.error(err.message || "Trip approval failed.");
                });
        },
        // onCountryValueHelp: function() {
        //     this._getCountryDialog().then(() => {
        //         const oMulti = this.byId("miCountry");
        //         if (oMulti.getTokens().length === 0) {
        //             oMulti.addToken(new Token({
        //                 key: "US",
        //                 text: "United States"
        //             }));
        //             this.getView().getModel("trip")
        //                 .setProperty("/Header/CountryRegion", "US");
        //         }
        //         this._oCountryDialog.open();
        //     });
        // },

        // /** filter as user types */
        // onCountrySearch: function(oEvent) {
        //     const sValue = oEvent.getParameter("value");
        //     const aFilter = sValue ?
        //         [new Filter("Country", FilterOperator.Contains, sValue)] :
        //         [];
        //     this._oCountryDialog
        //         .byId("countryDialogList")
        //         .getBinding("items")
        //         .filter(aFilter);
        // },

        // /** user picked a country → fill Country + Destination + Currency */
        // onCountrySelect: function(oEvent) {
        //     const oItem = oEvent.getParameter("listItem"),
        //         sCode = oItem.getTitle(), // Country code
        //         sName = oItem.getDescription(), // Country description
        //         oView = this.getView(),
        //         oTripM = oView.getModel("trip"),
        //         oCountryMi = this.byId("miCountry"),
        //         oDestinationMi = this.byId("miDestination"),
        //         oCurrencyMi = this.byId("miCurrency"),
        //         aMap = this.getView().getModel("ccMap").getData(),
        //         oMapEntry = aMap.find(e => e.Country === sCode),
        //         sCurr = oMapEntry ? oMapEntry.Currency : null;

        //     // Country
        //     oCountryMi.removeAllTokens();
        //     oCountryMi.addToken(new Token({
        //         key: sCode,
        //         text: sName
        //     }));
        //     oTripM.setProperty("/Header/CountryRegion", sCode);

        //     // Destination
        //     oDestinationMi.removeAllTokens();
        //     oDestinationMi.addToken(new Token({
        //         key: sCode,
        //         text: sName
        //     }));
        //     oTripM.setProperty("/Header/Destination", sName);

        //     // Currency
        //     if (sCurr) {
        //         oCurrencyMi.removeAllTokens();
        //         oCurrencyMi.addToken(new Token({
        //             key: sCurr,
        //             text: sCurr
        //         }));
        //         oTripM.setProperty("/Header/Currency", sCurr);
        //     } else {
        //         MessageToast.show(`No currency mapping for ${sCode}`);
        //     }

        //     this._oCountryDialog.close();
        // },

        // --- helpers ---
        _getCurrentProvision: function() {
            const dest = this.getView().getModel("trip").getProperty("/Header/Destination");
            return dest === "US" ? "07" : dest === "CA" ? "10" : null;
        },

        _padGL8: function(gl) {
            return gl ? String(gl).replace(/\D/g, "").padStart(8, "0") : "";
        },


        /**
         * Given a row path (e.g. "/ExpenseReceipts/0") and an expense type,
         * resolve GL (cache first, then AJAX) and set row + header fields.
         */
        // _setRowGLFromType: function(rowPath, tripExpenseType) {
        //   if (!rowPath || !tripExpenseType) return;
        //   const tripM = this.getView().getModel("trip");

        //   this._lookupGLForExpenseType(tripExpenseType).then((gl) => {
        //     if (!gl) return; // let user type if not mapped
        //     const gl8 = this._padGL8(gl);
        //     tripM.setProperty(rowPath + "/GLAccount", gl8);
        //     tripM.setProperty("/Header/CustomerGLCode", gl8);
        //   });
        // },


        _setRowGLFromType: function(rowPath, tripExpenseType) {
            if (!rowPath || !tripExpenseType) {
                console.warn("[_setRowGLFromType] bad args", {
                    rowPath,
                    tripExpenseType
                });
                return;
            }
            console.log("[_setRowGLFromType] start for", rowPath, "type =", tripExpenseType);

            const tripM = this.getView().getModel("trip");
            this._lookupGLForExpenseType(tripExpenseType).then((gl) => {
                if (!gl) {
                    console.warn("[_setRowGLFromType] no GL mapping found for type", tripExpenseType);
                    return;
                }
                const gl8 = this._padGL8(gl);
                console.log("[_setRowGLFromType] resolved GL =", gl, "padded =", gl8);

                tripM.setProperty(rowPath + "/GLAccount", gl8);
                tripM.setProperty("/Header/CustomerGLCode", gl8);
            });
        },



        /**
         * Lookup GL for a TripExpenseType using the cache first,
         * then falling back to a precise AJAX call if needed.
         */
        // _lookupGLForExpenseType: function (tripExpenseType) {
        //   const prov = this._getCurrentProvision();

        //   // 1) try cache loaded in onInit (this._aAllExpenseTypes)
        //   if (Array.isArray(this._aAllExpenseTypes) && prov) {
        //     const row = this._aAllExpenseTypes.find(
        //       r => r.TripProvision === prov && r.TripExpenseType === tripExpenseType
        //     );
        //     if (row) {
        //       const cachedGL =
        //         row.GLAccount || row.CustomerGLCode || row.GL || row.GL_CODE || "";
        //       if (cachedGL) return Promise.resolve(cachedGL);
        //     }
        //   }

        //   // 2) fallback to API
        //   const q = `?$filter=TripProvision eq '${prov}' and TripExpenseType eq '${tripExpenseType}'&$top=1`;
        //   return new Promise((resolve) => {
        //     $.ajax({
        //       url: `/odata/v4/trip/ExpenseTypeMapping${q}`,
        //       method: "GET",
        //       dataType: "json",
        //       success: (data) => {
        //         const rec = (data && data.value && data.value[0]) || {};
        //         const gl  = rec.GLAccount || rec.CustomerGLCode || rec.GL || rec.GL_CODE || "";
        //         resolve(gl);
        //       },
        //       error: () => resolve("")
        //     });
        //   });
        // },

        _lookupGLForExpenseType: function(tripExpenseType) {
            const prov = this._getCurrentProvision();
            console.log("[_lookupGLForExpenseType] prov =", prov, "tripExpenseType =", tripExpenseType);

            // cache first
            if (Array.isArray(this._aAllExpenseTypes) && prov) {
                const row = this._aAllExpenseTypes.find(
                    r => r.TripProvision === prov && r.ExpenseType === tripExpenseType // <-- changed here
                );
                if (row) {
                    const cachedGL = row.GLAccount || row.CustomerGLCode || row.GL || row.GL_CODE || "";
                    console.log("[_lookupGLForExpenseType] cache hit GL =", cachedGL);
                    if (cachedGL) return Promise.resolve(cachedGL);
                } else {
                    console.log("[_lookupGLForExpenseType] cache miss for type =", tripExpenseType);
                }
            }

            // AJAX fallback (uses ExpenseType in filter)
            const q = `?$filter=TripProvision eq '${prov}' and ExpenseType eq '${tripExpenseType}'&$top=1`;
            console.log("[_lookupGLForExpenseType] ajax GET /ExpenseTypeMapping" + q);

            return new Promise((resolve) => {
                $.ajax({
                    // url: `/odata/v4/trip/ExpenseTypeMapping${q}`,
                    url: this.getBaseURL() + "/odata/v4/trip/ExpenseTypeMapping" + q,

                    method: "GET",
                    dataType: "json",
                    success: (data) => {
                        const rec = (data && data.value && data.value[0]) || {};
                        const gl = rec.GLAccount || rec.CustomerGLCode || rec.GL || rec.GL_CODE || "";
                        console.log("[_lookupGLForExpenseType] ajax success GL =", gl, "record =", rec);
                        resolve(gl);
                    },
                    error: (xhr, s, e) => {
                        console.error("[_lookupGLForExpenseType] ajax error", s, e);
                        resolve("");
                    }
                });
            });
        },


        /** XML uses change=".onTripExpenseTypeChange" */
        onTripExpenseTypeChange: function(oEvent) {
            console.log("[onTripExpenseTypeChange] fired", oEvent);
            this._onExpenseTypeChanged(oEvent);
        },


        /**
         * Fired when user changes the Trip Expense Type in a row.
         * Sets Header.CustomerGLCode and also stores per-row GLAccount.
         */
        // onExpenseTypeChange: function (oEvent) {
        //   // works for Select/ComboBox; prefer selectedKey, fall back to selected item/value
        //   const src = oEvent.getSource();
        //   const key =
        //     (src.getSelectedKey && src.getSelectedKey()) ||
        //     (oEvent.getParameter("selectedItem") && oEvent.getParameter("selectedItem").getKey && oEvent.getParameter("selectedItem").getKey()) ||
        //     (src.getValue && src.getValue()) || "";

        //   if (!key) return;

        //   const tripM = this.getView().getModel("trip");
        //   const rowCtx = src.getBindingContext("trip"); // e.g. "/ExpenseReceipts/0"
        //   const rowPath = rowCtx && rowCtx.getPath();
        //   this._setRowGLFromType(rowPath, key);

        //   this._lookupGLForExpenseType(key).then((gl) => {
        //     if (!gl) {
        //       sap.m.MessageToast.show("No GL mapping found for selected expense type.");
        //       return;
        //     }
        //     const gl8 = this._padGL8(gl);

        //     // update header field (Customer G/L Code)
        //     tripM.setProperty("/Header/CustomerGLCode", gl8);

        //     // also store it on the row (optional but useful for settlement)
        //     if (rowPath) {
        //       tripM.setProperty(rowPath + "/GLAccount", gl8);
        //     }
        //   });
        // },

        /**
         * Fired when user changes the Trip Expense Type in a row.
         * Sets Header.CustomerGLCode and stores per-row GLAccount.
         */
        _onExpenseTypeChanged: function(oEvent) {
            const src = oEvent.getSource();
            const key =
                (src.getSelectedKey && src.getSelectedKey()) ||
                (oEvent.getParameter("selectedItem") &&
                    oEvent.getParameter("selectedItem").getKey &&
                    oEvent.getParameter("selectedItem").getKey()) ||
                (src.getValue && src.getValue()) || "";

            console.log("[_onExpenseTypeChanged] selected key =", key);

            if (!key) return;

            const rowCtx = src.getBindingContext("trip");
            const rowPath = rowCtx && rowCtx.getPath(); // e.g., "/ExpenseReceipts/0"
            console.log("[_onExpenseTypeChanged] rowPath =", rowPath);

            // keep row’s TripExpenseType in sync (selectedKey is bound, but be explicit)
            const tripM = this.getView().getModel("trip");
            if (rowPath) tripM.setProperty(rowPath + "/TripExpenseType", key);

            // fetch GL and set it
            this._fetchAndSetGL(rowPath, key);
        },

        /**
         * AJAX fetch GL by provision + expenseType, then set row.GLAccount and Header.CustomerGLCode.
         * Uses ExpenseType in the filter to match your API shape.
         */
        _fetchAndSetGL: function(rowPath, expenseType) {
            const prov = this._getCurrentProvision();
            console.log("[_fetchAndSetGL] prov =", prov, "expenseType =", expenseType, "rowPath =", rowPath);
            if (!rowPath || !expenseType || !prov) return;

            const q = encodeURI(`?$filter=TripProvision eq '${prov}' and ExpenseType eq '${expenseType}'&$top=1`);
            console.log("[_fetchAndSetGL] ajax GET /ExpenseTypeMapping" + q);

            $.ajax({
                // url: `/odata/v4/trip/ExpenseTypeMapping${q}`,
                url: this.getBaseURL() + "/odata/v4/trip/ExpenseTypeMapping" + q,

                method: "GET",
                dataType: "json",
                success: (data) => {
                    const gl = (data && data.value && data.value[0] && data.value[0].GLAccount) || "";
                    console.log("[_fetchAndSetGL] ajax success GL =", gl, "data =", data);
                    if (!gl) return;
                    const gl8 = this._padGL8(gl);
                    const trip = this.getView().getModel("trip");
                    trip.setProperty(rowPath + "/GLAccount", gl8);
                    trip.setProperty("/Header/CustomerGLCode", gl8);
                },
                error: (xhr, s, e) => {
                    console.error("[_fetchAndSetGL] ajax error", s, e);
                }
            });
        },




        onAddExpense: function() {
            console.log("[onAddExpense] start");
            const oModel = this.getView().getModel("trip");
            const sProject = oModel.getProperty("/Header/Project");
            if (!sProject || sProject.trim() === "") {
                MessageBox.error("Please select a Project before adding an Expense Receipt.");
                return;
            }

            const aReceipts = oModel.getProperty("/ExpenseReceipts") || [];
            const iNext = aReceipts.length + 1;

            const aTypes = (this._oExpenseTypesModel && this._oExpenseTypesModel.getData()) || [];
            console.log("[onAddExpense] expenseTypes available =", aTypes.length, aTypes);
            const sDefault = (aTypes[0] && aTypes[0].ExpenseType) || ""; // <-- changed here
            console.log("[onAddExpense] default ExpenseType =", sDefault);

            const row = {
                ExpenseReceiptNumber: iNext.toString(),
                TripExpenseType: sDefault,
                Amount: 0,
                Currency: oModel.getProperty("/Header/Currency") || "",
                From: "",
                To: "",
                ReceiptsDocumentNumber: iNext.toString(),
                UrlLink: "",
                GLAccount: ""
            };
            aReceipts.push(row);
            oModel.setProperty("/ExpenseReceipts", aReceipts);
            oModel.refresh(true);

            if (sDefault) {
                const rowPath = `/ExpenseReceipts/${aReceipts.length - 1}`;
                console.log("[onAddExpense] fetching GL for default type", sDefault, "rowPath", rowPath);
                this._fetchAndSetGL(rowPath, sDefault);
            }

            const oTable = this.byId("expenseTable");
            oTable.getBinding("items").refresh();
            this.updateTotalNetAmount();
        },

        onDeleteExpense: function() {
            const oTable = this.byId("expenseTable");
            const oModel = this.getView().getModel("trip");
            const aItems = oModel.getProperty("/ExpenseReceipts") || [];

            // be robust: support both contexts and items
            const aSelectedContexts = oTable.getSelectedContexts ? oTable.getSelectedContexts() : [];
            const aSelectedItems = oTable.getSelectedItems ? oTable.getSelectedItems() : [];

            // derive indexes from whichever API has data
            let aIdx = [];
            if (aSelectedContexts.length) {
                aIdx = aSelectedContexts.map(ctx => {
                    const p = ctx.getPath(); // "/ExpenseReceipts/2"
                    return parseInt(p.split("/").pop(), 10);
                });
            } else if (aSelectedItems.length) {
                aIdx = aSelectedItems.map(it => {
                    const p = it.getBindingContext("trip").getPath();
                    return parseInt(p.split("/").pop(), 10);
                });
            }

            if (!aIdx.length) {
                sap.m.MessageToast.show("Please select at least one expense to delete.");
                return;
            }

            aIdx = aIdx.filter(i => i >= 0).sort((a, b) => a - b);

            console.group("[onDeleteExpense]");
            console.log("  before length:", aItems.length);
            console.log("  selected idx :", aIdx);

            // remove selected rows
            const aRemaining = aItems.filter((_, idx) => !aIdx.includes(idx));
            console.log("  after length :", aRemaining.length);
            console.groupEnd();

            // write back & clear selection
            oModel.setProperty("/ExpenseReceipts", aRemaining);
            oTable.removeSelections();

            // resequence numbers and refresh totals/UI
            this._resequenceExpenseReceipts();
            const oBinding = oTable.getBinding("items");
            if (oBinding) {
                oBinding.refresh();
            }
            this.updateTotalNetAmount();
        },


        onDuplicateExpense: function() {
            const oTable = this.byId("expenseTable");
            const oModel = this.getView().getModel("trip");
            const aItems = oModel.getProperty("/ExpenseReceipts") || [];

            const aSelectedContexts = oTable.getSelectedContexts();

            if (aSelectedContexts.length !== 1) {
                sap.m.MessageToast.show("Please select exactly one row to duplicate.");
                return;
            }

            const oSelected = aSelectedContexts[0].getObject();

            // Deep clone the object and modify it
            const oClone = JSON.parse(JSON.stringify(oSelected));

            // Generate new ExpenseReceiptNumber (increment max)
            const maxNum = aItems.reduce((max, item) => {
                const num = parseInt(item.ExpenseReceiptNumber, 10);
                return isNaN(num) ? max : Math.max(max, num);
            }, 0);
            oClone.ExpenseReceiptNumber = (maxNum + 1).toString();

            // Optionally clear fields like ReceiptsDocumentNumber
            oClone.ReceiptsDocumentNumber = (maxNum + 1).toString();

            // Push the clone to the array
            aItems.push(oClone);

            // Update model
            oModel.setProperty("/ExpenseReceipts", aItems);
        }

        //   updateTotalNetAmount: function() {
        //     const oModel  = this.getView().getModel("trip");
        //     const aLines  = oModel.getProperty("/ExpenseReceipts") || [];
        //     const fSum    = aLines.reduce((acc, l) => acc + (parseFloat(l.Amount) || 0), 0);

        //     // 1) keep your own JSONModel in sync
        //     oModel.setProperty("/TotalNetAmount", fSum.toFixed(2));
        //     oModel.setProperty("/Header/TripSettlement", fSum.toFixed(2));
        //   }



        // later: onAddExpense(), 
    });
});