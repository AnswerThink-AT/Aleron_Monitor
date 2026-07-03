sap.ui.define([
    "sap/ui/core/mvc/Controller",                    
    "sap/ui/core/Fragment",                          
    "sap/ui/model/json/JSONModel",                   
    "sap/m/Label",                                   
    "sap/ui/model/Filter",                           
    "sap/ui/model/FilterOperator",                   
    "sap/ui/comp/smartvariants/PersonalizableInfo",  
    "sap/ui/core/ListItem"                      ,
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "tripmanagement/controller/formatter",
    "sap/ui/export/Spreadsheet",
  ], function (
    Controller,
    Fragment,
    JSONModel,
    Label,
    Filter,
    FilterOperator,
    PersonalizableInfo,
    ListItem         ,
    MessageBox,
    MessageToast,
    formatter,
    Spreadsheet
  ) {
  
    "use strict";

    const STATUS_CODE_BY_TEXT = Object.freeze({
    "Created": 0,
    "Approved": 1,
    "Settled": 2,
    "Sales Order Updated": 3,
    "Purchase Order Updated": 4,
    "Completed": 5,
    "Cancelled": 6,
    "Draft": 7,
    "Settle Error": 8
  });


    return Controller.extend("tripmanagement.controller.tripmanagement", {

      getBaseURL: function () {
        var appId   = this.getOwnerComponent().getManifestEntry("/sap.app/id");
        var appPath = appId.replace(/\./g, "/");
        return jQuery.sap.getModulePath(appPath);
      },
      formatter: formatter,
        onInit: function () {

            // 1) Create a JSON model to hold your suggestions
            this._oSuggestModel = new JSONModel({ items: [] });
            // 2) Expose it on the view under the name "suggest"
            this.getView().setModel(this._oSuggestModel, "suggest");

            // Bind methods
            this.applyData            = this.applyData.bind(this);
            this.fetchData            = this.fetchData.bind(this);
            this.getFiltersWithValues = this.getFiltersWithValues.bind(this);
            this.applyData            = this.applyData.bind(this);
            this.fetchData            = this.fetchData.bind(this);
            this.getFiltersWithValues = this.getFiltersWithValues.bind(this);

            // Grab controls
            this.oSmartVariantManagement = this.byId("svm");
            this.oExpandedLabel          = this.byId("expandedLabel");
            this.oSnappedLabel           = this.byId("snappedLabel");
            this.oFilterBar              = this.byId("filterbar");
            this.oTable                  = this.byId("table");

            // Register filter‐bar hooks
            this.oFilterBar.registerFetchData(this.fetchData);
            this.oFilterBar.registerApplyData(this.applyData);
            this.oFilterBar.registerGetFiltersWithValues(this.getFiltersWithValues);

            // Smart Variant persistence
            var oPersInfo = new PersonalizableInfo({
                type       : "filterBar",
                keyName    : "persistencyKey",
                dataSource : "",
                control    : this.oFilterBar
            });
            this.oSmartVariantManagement.addPersonalizableControl(oPersInfo);
            this.oSmartVariantManagement.initialise(function () {}, this.oFilterBar);

            

            // Prepare column settings model
            var aCols = this.oTable.getColumns().map(function(oCol) {
                return {
                    key     : oCol.getId(),
                    label   : oCol.getHeader().getText(),
                    visible : oCol.getVisible()
                };
            });
            this.getView().setModel(new JSONModel(aCols), "cols");
            this.getOwnerComponent().getRouter().getRoute("list").attachPatternMatched(this._onRouteMatched, this);
            const oFilterModel = new sap.ui.model.json.JSONModel({TripNumber: "", TripStartDate: null, TripEndDate: null, 
              SelectedProjects: [], SelectedPersonnel: [], SelectedTripStatuses: []});
            this.getView().setModel(oFilterModel, "filters");
            this._projectsModel = new sap.ui.model.json.JSONModel([]);
            this.getView().setModel(this._projectsModel, "projects");
            const oPersonnelInput = this.byId("miFilterPersonnel");
            oPersonnelInput.attachTokenUpdate((oEvent) => {
              const oSource = oEvent.getSource();
              setTimeout(() => {
                const aTokens = oSource.getTokens();
                const aSelected = aTokens.map(t => ({
                  key: t.getKey(),
                  text: t.getText()
                }));
                this.getView().getModel("filters").setProperty("/SelectedPersonnel", aSelected);
              }, 0);
            });
            const oMultiInput = this.byId("_IDGenMultiInput");
            oMultiInput.attachTokenUpdate((oEvent) => {
              const oSource = oEvent.getSource();
              setTimeout(() => {
                const aTokens = oSource.getTokens();
                const aSelected = aTokens.map(t => ({
                  key: t.getKey(),
                  text: t.getText()
                }));
                this.getView().getModel("filters").setProperty("/SelectedProjects", aSelected);
              }, 0);
            });
            const oTokenTemplatePersonnel = new sap.m.Token({
              key: "{filters>key}",
              text: "{filters>text}"
            });
            this.byId("miFilterPersonnel").bindAggregation("tokens", {
              path: "filters>/SelectedPersonnel",
              template: oTokenTemplatePersonnel,
              templateShareable: false
            }); 
            const oTokenTemplate = new sap.m.Token({
              key: "{filters>key}",
              text: "{filters>text}"
            });
            this.byId("_IDGenMultiInput").bindAggregation("tokens", {
              path: "filters>/SelectedProjects",
              template: oTokenTemplate,
              templateShareable: false
            });
            // fetch("/odata/v4/trip/EnterpriseProjectCache")
            fetch(this.getBaseURL() + "/odata/v4/trip/EnterpriseProjectCache")

              .then(res => res.json())
              .then(data => {
                const aProjects = data.value || [];
                this._projectsModel.setData(aProjects);
                this._allProjects = aProjects;
              }) 
            this._oSettleModel = new JSONModel({ total:0, completed:0, items:[] });
            this.getView().setModel(this._oSettleModel, "settle");

            // Immediately prepare the dialog promise
            this._pSettleDialog = Fragment.load({
              name: "tripmanagement.view.SettleDialog",
              controller: this
            }).then(oDlg => {
              this.getView().addDependent(oDlg);
              return oDlg;
            });

            const oTripStatusModel = new sap.ui.model.json.JSONModel({ TripStatusLists: [] });
            this.getView().setModel(oTripStatusModel, "tripStatus");

            // Load TripStatusLists from OData or AJAX
            // fetch("/odata/v4/trip/TripStatusLists")
            fetch(this.getBaseURL() + "/odata/v4/trip/TripStatusLists")

              .then(res => res.json())
              .then(data => {
                if (data.value) {
                  oTripStatusModel.setProperty("/TripStatusLists", data.value);
                }
              });
          
            this._oSuggestModel = new JSONModel({ items: [] });
            this.getView().setModel(this._oSuggestModel, "suggest");
            var aCols = this.getView().getModel("cols").getData();
            this._aColsDefaults = JSON.parse(JSON.stringify(aCols)); // deep copy
        },
        _onRouteMatched: function () {
          const oTable = this.byId("table");
          if (oTable) {
              const oBinding = oTable.getBinding("items");
              if (oBinding) {
                  oBinding.refresh();
                  // Sort descending by TripNumber
                  const oSorter = new sap.ui.model.Sorter("TripNumber", true); 
                  oBinding.sort(oSorter);
                  this._oDefaultSorter = oSorter;
              }
          }
      },
        onExit: function () {
            this.oModel                  = null;
            this.oSmartVariantManagement = null;
            this.oExpandedLabel          = null;
            this.oSnappedLabel           = null;
            this.oFilterBar              = null;
            this.oTable                  = null;
            if (this._oColDialog) {
                this._oColDialog.destroy();
                this._oColDialog = null;
            }
            if (this._pCreateDialog) {
                this._pCreateDialog.destroy();
                this._pCreateDialog = null;
            }
        },

        // View Settings fragment
       formatVisible: function (v) {
            return !!v;
        },

        onPersonalizeColumns: function () {
            if (!this._oColDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "tripmanagement.view.ColumnSettingsDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oColDialog = oDialog;
                    this.getView().addDependent(this._oColDialog);

                    this._oColDialog.setModel(this.getView().getModel("cols"), "cols");
                    this._aColsBefore = JSON.parse(JSON.stringify(this.getView().getModel("cols").getData()));

                    // update "Select All"
                    var a = this.getView().getModel("cols").getData();
                    var oCb = this.byId("cbSelectAll");
                    if (oCb) oCb.setSelected(a.every(c => !!c.visible));
                    this._updateSelectedCount();
                    this._oColDialog.open();
                }).catch((err) => console.error("Failed to load fragment", err));
            } else {
                this._aColsBefore = JSON.parse(JSON.stringify(this.getView().getModel("cols").getData()));
                var a = this.getView().getModel("cols").getData();
                var oCb = this.byId("cbSelectAll");
                if (oCb) oCb.setSelected(a.every(c => !!c.visible));
                this._updateSelectedCount();
                this._oColDialog.open();
            }
        },

        onColumnToggle: function (oEvent) {
            var oCheck = oEvent.getSource();
            var oCtx = oCheck.getBindingContext("cols");
            if (!oCtx) return;

            var sPath = oCtx.getPath();
            this.getView().getModel("cols").setProperty(sPath + "/visible", oEvent.getParameter("selected"));

            // update Select All
            var a = this.getView().getModel("cols").getData();
            var oCb = this._oColDialog && this._oColDialog.byId("cbSelectAll");
            if (oCb) oCb.setSelected(a.every(c => !!c.visible));
            this._updateSelectedCount();
        },

        onSelectAllColumns: function (oEvent) {
            var bSelected = oEvent.getParameter("selected");
            var oColsModel = this.getView().getModel("cols");
            var aCols = oColsModel.getData();

            aCols.forEach(col => col.visible = bSelected);
            oColsModel.refresh(true);

            this._updateSelectedCount();
        },

        onColumnReorder: function (oEvent) {
            var oList = this.byId("colList");
            var oModel = this.getView().getModel("cols");
            var aCols = oModel.getData();

            var oDragged = oEvent.getParameter("draggedControl");
            var oDropped = oEvent.getParameter("droppedControl");
            var sPos = oEvent.getParameter("dropPosition");

            var iFrom = oList.indexOfItem(oDragged);
            var iTo = oList.indexOfItem(oDropped);
            if (sPos === "After") iTo++;
            if (iFrom < 0 || iTo < 0 || iFrom === iTo) return;

            var aMoved = aCols.splice(iFrom, 1);
            aCols.splice(iTo, 0, aMoved[0]);
            oModel.setData(aCols);
        },

        onColumnsReset: function () {
            if (this._aColsDefaults) {
                var oColsModel = this.getView().getModel("cols");
                oColsModel.setData(JSON.parse(JSON.stringify(this._aColsDefaults)));
                if (this._oColDialog) {
                    var oCb = this._oColDialog.byId("cbSelectAll");
                    if (oCb) {
                        var a = oColsModel.getData();
                        oCb.setSelected(a.every(c => !!c.visible));
                    }
                }
                this._updateSelectedCount();

                sap.m.MessageToast.show("Columns reset to defaults");
            }
        },

        onColumnsCancel: function () {
            if (this._aColsBefore) {
                this.getView().getModel("cols").setData(this._aColsBefore);
            }
            if (this._oColDialog) this._oColDialog.close();
        },
        onColumnsConfirm: function () {
            var oTable = this.byId("table");
            var aMeta = this.getView().getModel("cols").getData();

            var aAllCols = oTable.getColumns().slice();
            var oTemplate = oTable.getBindingInfo("items").template;
            var aOrigCells = oTemplate.getCells();

            var mColMap = {};
            aAllCols.forEach((col, idx) => mColMap[col.getId()] = { col: col, cell: aOrigCells[idx] });

            // Clear & rebuild columns in new order & apply visibility
            aAllCols.forEach(col => oTable.removeColumn(col));
            var aNewCells = [];
            aMeta.forEach((m, idx) => {
                var oPair = mColMap[m.key];
                if (oPair) {
                    oPair.col.setVisible(!!m.visible);
                    oTable.insertColumn(oPair.col, idx);
                    aNewCells.push(oPair.cell.clone());
                }
            });

            // Rebind template and preserve default sorter
            var oNewTemplate = new sap.m.ColumnListItem({ cells: aNewCells });
            var oBindingInfo = oTable.getBindingInfo("items");
            oTable.bindItems({
                path: oBindingInfo.path,
                template: oNewTemplate,
                templateShareable: true,
                parameters: oBindingInfo.parameters
            });

            // Reapply default sorter
            if (this._oDefaultSorter) {
                const oBinding = oTable.getBinding("items");
                if (oBinding) {
                    oBinding.sort(this._oDefaultSorter);
                }
            }

            if (this._oColDialog) this._oColDialog.close();
            sap.m.MessageToast.show("View updated");
        },
        _updateSelectedCount: function () {
            var oColsModel = this.getView().getModel("cols");
            if (!oColsModel) return;

            var aCols = oColsModel.getData();
            var iTotal = aCols.length;
            var iVisible = aCols.filter(c => !!c.visible).length;

            var oTxt = sap.ui.core.Fragment.byId(this.getView().getId(), "txtSelectedCount");
            if (oTxt) {
                oTxt.setText("Columns"+" "+ "(" +iVisible + "/" + iTotal + ")");
            }
        },
        // Variant persistence callbacks
        fetchData: function () {
            return this.oFilterBar.getAllFilterItems().reduce(function (aRes, oItem) {
                aRes.push({
                    groupName : oItem.getGroupName(),
                    fieldName : oItem.getName(),
                    fieldData : oItem.getControl().getSelectedKeys
                        ? oItem.getControl().getSelectedKeys()
                        : oItem.getControl().getValue()
                });
                return aRes;
            }, []);
        },

        applyData: function (aData) {
            aData.forEach(function (o) {
                var oControl = this.oFilterBar.determineControlByName(o.fieldName, o.groupName);
                if (oControl.setSelectedKeys) {
                    oControl.setSelectedKeys(o.fieldData);
                } else {
                    oControl.setValue(o.fieldData);
                }
            }, this);
        },

        getFiltersWithValues: function () {
            return this.oFilterBar.getFilterGroupItems().filter(function (oFGI) {
                var oC = oFGI.getControl();
                return oC && (
                    (oC.getSelectedKeys && oC.getSelectedKeys().length > 0) ||
                    (oC.getValue && oC.getValue() !== "")
                );
            });
        },

        // Filter–table logic
        onSelectionChange: function () {
            this.oSmartVariantManagement.currentVariantSetModified(true);
            this.oFilterBar.fireFilterChange();
        },

        onSearch: function () {
            var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aRes, oFGI) {
                var oC = oFGI.getControl();
                var aValues = oC.getSelectedKeys
                    ? oC.getSelectedKeys()
                    : [ oC.getValue() ].filter(Boolean);

                var aFilters = aValues.map(function (v) {
                    return new Filter({
                        path     : oFGI.getName(),
                        operator : FilterOperator.Contains,
                        value1   : v
                    });
                });

                if (aFilters.length) {
                    aRes.push(new Filter({ filters: aFilters, and: false }));
                }
                return aRes;
            }, []);

            this.oTable.getBinding("items").filter(aTableFilters);
            this.oTable.setShowOverlay(false);
        },

        onFilterChange: function () {
            this._updateLabelsAndTable();
        },

        onAfterVariantLoad: function () {
            this._updateLabelsAndTable();
        },

        getFormattedSummaryText: function () {
            var a = this.oFilterBar.retrieveFiltersWithValues();
            if (!a.length) {
                return "No filters active";
            }
            return a.length === 1
                ? "1 filter active: " + a.join(", ")
                : a.length + " filters active: " + a.join(", ");
        },

        getFormattedSummaryTextExpanded: function () {
            var aAll    = this.oFilterBar.retrieveFiltersWithValues(),
                aHidden = this.oFilterBar.retrieveNonVisibleFiltersWithValues() || [],
                s       = !aAll.length
                    ? "No filters active"
                    : (aAll.length === 1 ? "1 filter active" : aAll.length + " filters active");
            return aHidden.length
                ? s + " (" + aHidden.length + " hidden)"
                : s;
        },

        _updateLabelsAndTable: function () {
            this.oExpandedLabel.setText(this.getFormattedSummaryTextExpanded());
            this.oSnappedLabel.setText  (this.getFormattedSummaryText());
            this.oTable.setShowOverlay  (true);
        },

        /**
         * Handler for row press: navigates to detail object page
         */
        onListItemPress: function (oEvent) {
            var oItem = oEvent.getSource();                        // your ColumnListItem
            var oCtx  = oItem.getBindingContext();                // default model
            var sTrip = oCtx.getProperty("TripNumber");
            var sPersonnel = oCtx.getProperty("Personnel");          // your key
            this.getOwnerComponent()
                .getRouter()
                .navTo("tripObject", { TripNumber: sTrip, Personnel: sPersonnel});
          },
          

        onCreate() {
            if (!this._pCreateDialog) {
              this._pCreateDialog = Fragment.load({
                id        : this.getView().getId(),
                name      : "tripmanagement.view.CreateTripDialog",
                controller: this
              }).then(oDialog => {
                this.getView().addDependent(oDialog);
          
                // <-- THIS is the only place you attach handlers
                const sFragId = this.getView().getId();
                const oInput  = sap.ui.core.Fragment.byId(sFragId, "inpPersonnel");
                oInput.attachLiveChange(this.onPersonnelSearch.bind(this));
                oInput.attachSuggestionItemSelected(this.onPersonnelSelect.bind(this));
          
                return oDialog;
              });
            }
          
            this._pCreateDialog.then(oDialog => {
              // reset & open…
              oDialog.getContent()[0].getItems().forEach(c => {
                if (c.setValue)     c.setValue("");
                if (c.setDateValue) c.setDateValue(null);
              });
              oDialog.open();
            });
          },
             
          

        onCreateCancel: function () {
            this.byId("createTripDialog").close();
        },

        
onPersonnelValueHelp() {
    console.log("[onPersonnelValueHelp] ▶ triggered");
  
    // 1) Create the dialog once
    if (!this._oValueHelpDialog) {
      console.log("[onPersonnelValueHelp] ▶ Creating SelectDialog");
  
      this._oValueHelpDialog = new SelectDialog({
        title      : "Select Personnel",
        noDataText : "Type to search…",
  
        // arrow fns so 'this' is always the controller
        liveChange: (e) => this.onPersonnelSearch(e),
        confirm   : (e) => this.onPersonnelSelected(e),
        cancel    : () => {}
      });
  
      // make dialog inherit your "suggest" model
      this.getView().addDependent(this._oValueHelpDialog);
      this._oValueHelpDialog.setModel(this._oSuggestModel, "suggest");
  
      // 2) Bind the items aggregation using camelCase paths
      this._oValueHelpDialog.bindAggregation("items", {
        path    : "suggest>/items",
        template: new StandardListItem({
          title: "{suggest>PersonFullName}",
          description: {
            parts: [
              { path: "suggest>UserName" },
              { path: "suggest>EmailAddress" }
            ],
            formatter: (user, email) => [user, email].filter(Boolean).join(" | ")
          },
          customData: [
            new sap.ui.core.CustomData({
              key  : "PersonnelID",
              value: "{suggest>PersonExternalID}"
            })
          ]
        })
      });
  
      console.log("[onPersonnelValueHelp] ▶ Dialog created & aggregation bound");
    }
  
    // 3) Clear last results & open
    this._oSuggestModel.setData({ items: [] });
    this._oValueHelpDialog.open();
    console.log("[onPersonnelValueHelp] ▶ Dialog opened");
  },
  
  /**
 * Called when user picks one of the inline suggestions.
 */
  onPersonnelSelect: function (oEvt) {
    // 1) grab the selected ListItem
    const oItem = oEvt.getParameter("selectedItem");
    if (!oItem) {
      console.log("⚠️ No item selected");
      return;
    }
  
    // 2) pull the object out of your 'suggest' model
    const oUser = oItem.getBindingContext("suggest").getObject();
  
    // 3) build the display string
    const sDisplay = `${oUser.UserName} (${oUser.PersonFullName})`;
  
    // 4) set it back into the Input
    this.byId("inpPersonnel").setValue(sDisplay);
  
    // 5) (optional) keep it around for later
    this._oSelectedPersonnel = oUser;
  
    console.log("✔️ Display set to:", sDisplay);
  },  
  
  /**
   * Called on each keystroke in the dialog’s search field.
   * Fetches from backend, normalizes keys to camelCase, then sets the suggest model.
   */
  onPersonnelSearch(oEvent) {
    const term = (oEvent.getParameter("value") || "").trim();
    console.log("[onPersonnelSearch] ▶ term =", term);
  
    if (!term) {
      this._oSuggestModel.setData({ items: [] });
      return;
    }
  
    console.log("[onPersonnelSearch] ▶ Fetching from backend…");
  
//     $.ajax({
//       // url     : `/odata/v4/trip/CachedBusinessUser?search=${encodeURIComponent(term)}`,
//       url: this.getBaseURL() + "/odata/v4/trip/CachedBusinessUser?search=" + encodeURIComponent(term),
//       method  : "GET",
//       dataType: "json",
//       success: (oData) => {
//         console.log("[onPersonnelSearch] ✅ raw data:", oData);
  
//         const aItems = (oData.value || []).map(u => ({
//           PersonExternalID: u.PERSONEXTERNALID,
//           PersonFullName : u.PERSONFULLNAME,
//           UserName       : u.USERNAME,
//           EmailAddress   : u.EMAILADDRESS
//         }));
//         console.log("[onPersonnelSearch] ✅ normalized items:", aItems);
  
//         this._oSuggestModel.setData({ items: aItems });
  
//         // Debug: ensure suggestions are bound
//         const aSuggestions = this.byId("inpPersonnel").getSuggestionItems();
// console.log("[onPersonnelSearch] ▶ suggestionItems count:", aSuggestions.length);

//       },
//       error: (_, ts, err) => {
//         console.error("[onPersonnelSearch] ❌ Fetch failed:", ts, err);
//         this._oSuggestModel.setData({ items: [] });
//       }
//     });
$.ajax({
  url: this.getBaseURL() + "/odata/v4/trip/WorkAssignmentCache?search=" + encodeURIComponent(term) + "&$top=10",
  method: "GET",
  dataType: "json",
  success: (oData) => {
    const aItems = (oData.value || []).map(u => ({
      // keep the UI contract the same:
      PersonExternalID: u.WorkAssignmentExternalID     || u.WORKASSIGNMENTEXTERNALID,
      PersonFullName :  u.PersonFullName               || u.PERSONFULLNAME || u.FullName || u.FULLNAME,
      // reuse existing fields so the fragment stays unchanged
      UserName       :  u.WorkAssignmentExternalID     || u.WORKASSIGNMENTEXTERNALID,               // show the ID
      EmailAddress   : (u.WorkAssignmentBusinessPartner || u.WORKASSIGNMENTBUSINESSPARTNER) 
                        ? ("BP " + (u.WorkAssignmentBusinessPartner || u.WORKASSIGNMENTBUSINESSPARTNER))
                        : ""
    }));
    this._oSuggestModel.setData({ items: aItems });
  },
  error: () => this._oSuggestModel.setData({ items: [] })
});
  },  

  formatAdditionalText: function(user, email) {
    return [user, email].filter(Boolean).join(" | ");
  },
  

        onCreateSubmit: function () {
            var oPersonnel   = this.byId("inpPersonnel");
            var oStartOfTrip = this.byId("dpStart");
            var oEndOfTrip   = this.byId("dpEnd");
            var bValid = true;
            [oPersonnel, oStartOfTrip, oEndOfTrip].forEach(function (oCtrl) {
                oCtrl.setValueState("None");
            });
            // Validate Personnel
            if (!oPersonnel.getValue().trim()) {
                oPersonnel.setValueState("Error");
                oPersonnel.setValueStateText("Personnel is required");
                if (bValid) { oPersonnel.focus(); }
                bValid = false;
            }
            // Validate Start Date
            if (!oStartOfTrip.getDateValue()) {
                oStartOfTrip.setValueState("Error");
                oStartOfTrip.setValueStateText("Start of Trip is required");
                if (bValid) { oStartOfTrip.focus(); }
                bValid = false;
            }
            // Validate End Date
            if (!oEndOfTrip.getDateValue()) {
                oEndOfTrip.setValueState("Error");
                oEndOfTrip.setValueStateText("End of Trip is required");
                if (bValid) { oEndOfTrip.focus(); }
                bValid = false;
            }

            if (!bValid) {
                sap.m.MessageToast.show("Please fill all mandatory fields.");
                return;
            }
            this.byId("createTripDialog").close();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("object", {
                mode: "create",
                Personnel: oPersonnel.getValue().trim(),
                StartOfTrip: oStartOfTrip.getDateValue().toISOString().slice(0, 10),
                EndOfTrip: oEndOfTrip.getDateValue().toISOString().slice(0, 10)
            });
        },
        onDelete: function () {
            const oTable = this.byId("table");
            const aSelectedItems = oTable.getSelectedItems();
            if (!aSelectedItems.length) {
                MessageBox.warning("Please select at least one trip to delete.");
                return;
            }
            const aTripNumbers = aSelectedItems.map(item => {
                const oContext = item.getBindingContext();
                return oContext.getObject().TripNumber;
            });
            if (!aTripNumbers.length) {
                MessageBox.error("Trip numbers not found in selected items.");
                return;
            }
            const sMsg = aTripNumbers.length === 1
                ? "Are you sure you want to delete the selected trip?"
                : `Are you sure you want to delete the ${aTripNumbers.length} selected trips?`;

            MessageBox.confirm(sMsg, {
                title: "Confirm Deletion",
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: async (sAction) => {
                    if (sAction === MessageBox.Action.YES) {
                        try {
                            const oModel = this.getView().getModel(); // V4 OData model
                            const oActionContext = oModel.bindContext("/deleteFullTrip(...)");
        
                            oActionContext.setParameter("TripNumbers", aTripNumbers);
                            await oActionContext.execute();
        
                            MessageBox.success(`${aTripNumbers.length} trip(s) deleted successfully.`, {
                              actions: [MessageBox.Action.OK],
                              onClose: () => {
                                oTable.removeSelections(true);
                                const oBinding = oTable.getBinding("items");
                                if (oBinding && oBinding.refresh) {
                                  oBinding.refresh();
                                }
                              }
                            });

                        } catch (err) {
                            MessageBox.error("Delete failed: " + (err.message || err));
                        }
                    }
                }
            });
        },
        onCancel: function () {
          const oTable = this.byId("table");
          const aSelectedItems = oTable.getSelectedItems();
        
          if (!aSelectedItems.length) {
            MessageToast.show("Please select at least one trip to cancel.");
            return;
          }
        
          const aCancellableTrips = [];
          const aNonCancellableTrips = [];
        
          aSelectedItems.forEach(item => {
            const oContext = item.getBindingContext();
            const oTrip = oContext.getObject();
        
            // Only allow cancelling trips with status 'Created' or 'Draft'
            const allowedStatuses = ["Created", "Draft"];
            if (allowedStatuses.includes(oTrip.StatusText)) {
              aCancellableTrips.push(oTrip.TripNumber);
            } else {
              aNonCancellableTrips.push(oTrip.TripNumber);
            }
          });
        
          if (!aCancellableTrips.length) {
            MessageBox.error("Selected trips cannot be cancelled. Only trips in 'Created' status can be cancelled.");
            return;
          }
        
          // fetch("/odata/v4/Trip/cancelTrip", {
          fetch(this.getBaseURL() + "/odata/v4/trip/cancelTrip", {

            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              TripNumbers: aCancellableTrips
            })
          })
          .then(res => {
            if (!res.ok) {
              throw new Error("Trip cancellation failed.");
            }
            return res.json();
          })
          .then(() => {
            let sMessage = `${aCancellableTrips.length} trip(s) cancelled successfully.`;
            if (aNonCancellableTrips.length) {
              sMessage += `\n${aNonCancellableTrips.length} trip(s) were skipped because they are not in cancellable status.`;
            }
        
            MessageBox.success(sMessage, {
              actions: [MessageBox.Action.OK],
              onClose: () => {
                oTable.removeSelections(true);
                const oBinding = oTable.getBinding("items");
                if (oBinding && oBinding.refresh) {
                  oBinding.refresh();
                }
              }
            });
          })
          .catch(err => {
            MessageBox.error(err.message || "An error occurred while cancelling trips.");
          });
        },


        
/**
 * Called when the user clicks “Settle”
 */
// onSettle: function() {
//   console.log("[Settle] ▶ Button pressed");

//   // 1) Get the single selected trip
//   const aSel = this.byId("table").getSelectedContexts();
//   if (!aSel.length) {
//     MessageToast.show("Please select one trip to settle");
//     return;
//   }
//   const { TripNumber, Personnel } = aSel[0].getObject();
//   console.log(`[Settle] ▶ Selected TripNumber=${TripNumber}, Personnel=${Personnel}`);

//   // 2) Fetch full trip with expand=Header,Items,Costs
//   const sFilter = `TripNumber eq '${TripNumber}' and Personnel eq '${Personnel}'`;
//   const sUrl = `/odata/v4/trip/Trip?$filter=${encodeURIComponent(sFilter)}&$expand=Header,Items,Costs`;
//   console.log("[Settle] ▶ Fetching full trip:", sUrl);

//   $.ajax({
//     url:    sUrl,
//     method: "GET",
//     dataType: "json",
//     success: (oData) => {
//       console.log("[Settle] ✓ Fetched Trip data:", oData);
//       const aTrips = oData.value || [];
//       if (!aTrips.length) {
//         MessageBox.error("Trip not found on the server");
//         return;
//       }
//       this._aSettleTrips = aTrips;        // store for processing
//       this._startSettleSequence();
//     },
//     error: (xhr, ts, err) => {
//       console.error("[Settle] ✖ Fetch failed:", ts, err, xhr.responseText);
//       MessageBox.error("Failed to load Trip details");
//     }
//   });
// },

_getTripStatusCode: function (oRow) {
  // numeric candidates first
  const candidates = [
    oRow.TripStatus_code,
    oRow.Status_code,
    oRow.TripStatusCode,
    oRow.StatusCode
  ];
  for (const c of candidates) {
    if (Number.isFinite(c)) return c;
    if (c !== undefined && c !== null && !Number.isNaN(Number(c))) return Number(c);
  }

  // fallback from text
  const txt = oRow.StatusText || oRow.TripStatusText || oRow.Status || "";
  const code = STATUS_CODE_BY_TEXT[txt];
  return Number.isFinite(code) ? code : -1;
},


onSettle: function () {
  console.log("[Settle] ▶ Button pressed");

  const oTable  = this.byId("table");
  const aSelCtx = oTable.getSelectedContexts();

  if (!aSelCtx.length) {
    sap.m.MessageToast.show("Please select one or more trips to settle");
    return;
  }

  // Allowed statuses: Approved(1) or Settle Error(8)
  const ALLOWED = new Set([1, 8]);

  const seen         = new Set();
  const aValidRows   = [];
  const aInvalidRows = [];

  // Build unique keys and classify rows by status
  aSelCtx.forEach(ctx => {
    const o = ctx.getObject();
    const key = `${o.TripNumber}||${o.Personnel}`;
    if (seen.has(key)) return;
    seen.add(key);

    const code = this._getTripStatusCode(o);
    const isAllowed = ALLOWED.has(code);

    (isAllowed ? aValidRows : aInvalidRows).push({
      TripNumber : o.TripNumber,
      Personnel  : o.Personnel,
      StatusText : o.StatusText || o.TripStatusText || String(code)
    });
  });

  // If there are invalid rows, show a summary (we will skip them)
  if (aInvalidRows.length) {
    const sample = aInvalidRows.slice(0, 5).map(r =>
      `• Trip ${r.TripNumber} / ${r.Personnel} — ${r.StatusText}`
    ).join("\n");

    const more = aInvalidRows.length > 5
      ? `\n…and ${aInvalidRows.length - 5} more.` : "";

    sap.m.MessageBox.information(
      `Only trips in Approved or Settle Error can be settled.\n\n` +
      `Skipping ${aInvalidRows.length} trip(s):\n${sample}${more}`
    );
  }

  // Nothing valid? stop here
  if (!aValidRows.length) {
    sap.m.MessageToast.show("No selected trips are eligible for settlement.");
    return;
  }

  // Proceed with your existing chunked fetch → process flow for only the valid rows
  const aKeys = aValidRows.map(r => ({ TripNumber: r.TripNumber, Personnel: r.Personnel }));

  // Helper to create a single $filter clause for a chunk of keys
  const buildFilter = (pairs) =>
    pairs.map(p =>
      `(TripNumber eq '${String(p.TripNumber).replace(/'/g,"''")}' and Personnel eq '${String(p.Personnel).replace(/'/g,"''")}')`
    ).join(" or ");

  // Chunk to avoid very long URLs
  const CHUNK_SIZE = 20;
  const chunks = [];
  for (let i = 0; i < aKeys.length; i += CHUNK_SIZE) {
    chunks.push(aKeys.slice(i, i + CHUNK_SIZE));
  }

  const aPromises = chunks.map(chunk => {
    const sFilter = buildFilter(chunk);
    // const sUrl = `/odata/v4/trip/Trip?$filter=${encodeURIComponent(sFilter)}&$expand=Header,Items,Costs`;
    const sUrl = this.getBaseURL() + "/odata/v4/trip/Trip?$filter=" + encodeURIComponent(sFilter) + "&$expand=Header,Items,Costs";

    console.log("[Settle] ▶ Fetching chunk:", sUrl);

    return new Promise((resolve) => {
      $.ajax({
        url: sUrl,
        method: "GET",
        dataType: "json",
        success: (oData) => resolve(oData && oData.value ? oData.value : []),
        error  : (xhr, ts, err) => {
          console.error("[Settle] ✖ Fetch chunk failed:", ts, err, xhr.responseText);
          resolve([]); // keep going
        }
      });
    });
  });

  Promise.all(aPromises).then(aResults => {
    const aTrips = aResults.flat();

    if (!aTrips.length) {
      sap.m.MessageBox.error("No trip details found for the eligible selection.");
      return;
    }

    this._aSettleTrips = aTrips;
    console.log(`[Settle] ✓ Loaded ${aTrips.length} eligible trip(s). Starting processing…`);
    this._startSettleSequence();
  });
},



/**
 * Begins the progress dialog + processing sequence
 */
_startSettleSequence: function() {
  const aItems = this._aSettleTrips.map(trip => ({
    TripNumber: trip.TripNumber,
    Personnel  : trip.Personnel,  
    status:     "PENDING",
    message:    ""
  }));
  this._oSettleModel.setData({
    total:     aItems.length,
    completed: 0,
    items:     aItems
  });
  console.log(`[Settle] ▶ Initialized model for ${aItems.length} items`);

  this._pSettleDialog.then(oDlg => {
    oDlg.open();
    console.log("[Settle] ▶ Dialog opened, processing items");
    this._aSettleTrips.reduce((p, trip, idx) =>
      p.then(() => this._processOneTrip(trip, idx)),
      Promise.resolve()
    )
    .then(() => console.log("[Settle] ▶ All trips processed"))
    .catch(e => console.error("[Settle] ✖ Sequence error:", e));
  });
},
// build an OData key literal for string parts
_escapeOdataString: function (s) {
  return String(s || "").replace(/'/g, "''");
},

// Dates in OData V4 key MUST be unquoted YYYY-MM-DD
_fmtDateYYYYMMDD: function (v) {
  const d = (v instanceof Date) ? v : new Date(v);
  if (isNaN(d)) return "";
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
},

_buildTripHeaderKey: function (tripNumber, personnel, startDate, endDate) {
  // Note: dates are NOT quoted; personnel IS quoted and single-quotes doubled
  const p = this._escapeOdataString(personnel);
  const key = `TRIPHeader(TripNumber=${tripNumber},Personnel='${p}',StartOfTrip=${startDate},EndOfTrip=${endDate})`;
  // encodeURI keeps ( ) = , ' while encoding spaces, etc.
  return encodeURI(key);
},



/**
 * Append one line to TRIPHeader.Comments via direct PATCH on TRIPHeader.
 * Uses the 4-part key: TripNumber (Decimal), Personnel (String), StartOfTrip (Date), EndOfTrip (Date).
 */
_appendHeaderComment: function (idx, line) {
  const trip = this._aSettleTrips[idx] || {};
  const tn = trip.TripNumber;
  const personnel = trip.Personnel;

  const soRaw = trip.Header?.StartOfTrip || trip.TripStartDate || trip.StartOfTrip;
  const eoRaw = trip.Header?.EndOfTrip   || trip.TripEndDate   || trip.EndOfTrip;

  const sStart = this._fmtDateYYYYMMDD(soRaw);
  const sEnd   = this._fmtDateYYYYMMDD(eoRaw);

  if (!tn || !personnel || !sStart || !sEnd) {
    console.error("❌ Missing one or more key parts — aborting TRIPHeader PATCH");
    return Promise.resolve();
  }
  const prevComments = trip.Header?.Comments || "";
  const cleaned = prevComments
    .split(/\n+/)
    .filter(line => !line.match(/\[\d{4}-\d{2}-\d{2}T.*\] Settle (ERROR|SUCCESS):/))
    .join("\n")
    .trim();
  const stamp = new Date().toISOString();
  const newLine = `[${stamp}] ${String(line || "OK").replace(/\s+/g, " ").trim()}`;

  const next = cleaned ? `${cleaned}\n${newLine}` : newLine;

  console.groupCollapsed(`[Comments][Trip=${tn}]`);
  console.log("Prev Comments:", prevComments);
  console.log("Cleaned Comments:", cleaned);
  console.log("Final Comments:", next);
  console.groupEnd();

  const sKey = this._buildTripHeaderKey(tn, personnel, sStart, sEnd);
  const url =  this.getBaseURL() + "/odata/v4/trip/" + sKey;
  const payload = { Comments: next };

  console.log("PATCH URL:", url);
  console.log("PATCH payload:", payload);

  return $.ajax({
    url: url,
    method: "PATCH",
    contentType: "application/json",
    data: JSON.stringify(payload)
  })
  .then((res) => {
    console.log("PATCH OK ✅ — TRIPHeader.Comments replaced.", res);
    const oView = this.getView?.() || sap.ui.getCore().byId("App");
    if (oView) {
      const oTripModel = oView.getModel("trip");
      if (oTripModel) {
        oTripModel.setProperty("/Header/Comments", next);
        oTripModel.refresh(true);
        console.log("[UI Sync] Local Comments model refreshed instantly");
      }
    }
  })
  .catch((xhr) => {
    console.error("PATCH FAIL ❌", {
      status: xhr?.status,
      statusText: xhr?.statusText,
      responseText: xhr?.responseText || xhr
    });
  });
},


/**
 * Process exactly one Trip record: build XML + POST + update UI
 */
// _processOneTrip: function(oTrip, idx) {
//   console.log(`[Settle][${idx}] ▶ Processing TripNumber=${oTrip.TripNumber}`);

//   // build only the payload fragment
//   const sXmlPayload = this._buildJournalXml(oTrip);
//   console.log(`[Settle][${idx}] ▶ Built payload:\n`, sXmlPayload);

//   return new Promise(resolve => {
//     $.ajax({
//       url:      "/odata/v4/trip/postJournalEntry",
//       method:   "POST",
//       contentType: "application/json",
//       dataType: "json",
//       data:     JSON.stringify({ xmlPayload: sXmlPayload }),

//       beforeSend: () => console.log(`[Settle][${idx}] → Sending POST`),

//       success: (data) => {
//         const xml = data.value; // raw SOAP envelope
//         console.log(`[Settle][${idx}] ✓ POST returned XML:\n`, xml);

//         // detect any SAP error severity (3) or Note entries
//         const hasError =
//           /<SeverityCode>3<\/SeverityCode>/i.test(xml) ||
//           /<Note>.*?<\/Note>/i.test(xml);

//         if (hasError) {
//           // extract all <Note>…</Note> messages
//           const notes = Array.from(xml.matchAll(/<Note>(.*?)<\/Note>/g))
//                              .map(m => m[1])
//                              .join('; ');
//           console.warn(`[Settle][${idx}] ✖ SOAP returned errors:`, notes);
//           this._updateSettleItem(idx, "ERROR", notes);
//         } else {
//           console.log(`[Settle][${idx}] ✓ SOAP response contains no errors`);
//           this._updateSettleItem(idx, "SUCCESS", "");
//         }
//         resolve();
//       },

//       error: (xhr, ts, err) => {
//         const msg = xhr.responseJSON?.error?.message?.value || err;
//         console.error(`[Settle][${idx}] ✖ POST error`, ts, err, xhr.responseText);
//         this._updateSettleItem(idx, "ERROR", msg);
//         resolve();
//       },

//       complete: () => console.log(`[Settle][${idx}] → POST complete`)
//     });
//   });
// },

// Pull "07012739" out of "07012739 (MASSIMO VALENZANO)"
_extractPersonnelNumber: function (s) {
  if (!s) return "";
  const m = String(s).match(/^(\d+)\b/);
  return m ? m[1] : String(s).trim();
},

// Look up PERSONID by PERSONEXTERNALID and return it (or "")
// Return PERSONID (vendor) for a given Personnel string like "07012739 (NAME)"
// _fetchCreditorIdByPersonnel: function (sPersonnel) {
//   const persNo = this._extractPersonnelNumber(sPersonnel); // -> "07012739"
//   return new Promise((resolve) => {
//     if (!persNo) return resolve("");

//     // Per your note: service expects ?search=<number> (no extra quotes/encoding needed)
//     // const url = `/odata/v4/trip/CachedBusinessUser?search=${persNo}`;
//     const url = this.getBaseURL() + "/odata/v4/trip/CachedBusinessUser?search=" + persNo;

//     $.ajax({
//       url,
//       method: "GET",
//       dataType: "json",
//       success: (data) => {
//         const rows = Array.isArray(data?.value) ? data.value : [];

//         // Find exact match on PERSONEXTERNALID first (service uses UPPER-CASE keys)
//         const exact = rows.find(r => String(r.PERSONEXTERNALID || r.PersonExternalID || "").trim() === persNo) || rows[0];

//         // Try common casings/aliases for PERSONID/Vendor
//         const creditor =
//           exact?.PERSONID ??
//           exact?.PersonID ??
//           exact?.VENDORNO ??
//           exact?.VendorNo ??
//           "";

//         console.log("[CreditorLookup] rows:", rows.length, "match->", exact, "Creditor(PERSONID):", creditor);
//         resolve(creditor || "");
//       },
//       error: (xhr, ts, err) => {
//         console.warn("[CreditorLookup] search call failed", ts, err, xhr?.responseText);
//         resolve("");
//       }
//     });
//   });
// },

// Return Vendor (Creditor) for a given Personnel string like "07012739 (NAME)"
_fetchCreditorIdByPersonnel: function (sPersonnel) {
  const persNo = this._extractPersonnelNumber(sPersonnel); // e.g. "07012739"
  return new Promise((resolve) => {
    if (!persNo) return resolve("");

    const urlWA = this.getBaseURL() +
      "/odata/v4/trip/WorkAssignmentCache?search=" + encodeURIComponent(persNo) + "&$top=10";

    $.ajax({
      url: urlWA,
      method: "GET",
      dataType: "json",
      success: (data) => {
        const rows = Array.isArray(data?.value) ? data.value : [];
        // exact match by WorkAssignmentExternalID if possible
        const exact =
          rows.find(r =>
            String(r.WorkAssignmentExternalID || r.WORKASSIGNMENTEXTERNALID || "").trim() === persNo
          ) || rows[0];

        // pull Business Partner with robust casing fallbacks
        const bp =
          exact?.WorkAssignmentBusinessPartner ??
          exact?.WORKASSIGNMENTBUSINESSPARTNER ??
          exact?.BusinessPartner ??
          exact?.BUSINESSPARTNER ??
          "";

        if (bp) {
          console.log("[CreditorLookup][WA] extId:", persNo, "→ BP:", bp);
          return resolve(String(bp));
        }

        console.warn("[CreditorLookup][WA] No BP for", persNo, "→ falling back to CachedBusinessUser");
        // Fallback (only if WA had no BP)
        const urlCBU = this.getBaseURL() + "/odata/v4/trip/CachedBusinessUser?search=" + encodeURIComponent(persNo);
        $.ajax({
          url: urlCBU,
          method: "GET",
          dataType: "json",
          success: (cbu) => {
            const rows2 = Array.isArray(cbu?.value) ? cbu.value : [];
            const exact2 =
              rows2.find(r =>
                String(r.PERSONEXTERNALID || r.PersonExternalID || "").trim() === persNo
              ) || rows2[0];
            const creditor =
              exact2?.PERSONID ??
              exact2?.PersonID ??
              exact2?.VENDORNO ??
              exact2?.VendorNo ??
              "";
            resolve(creditor || "");
          },
          error: () => resolve("")
        });
      },
      error: () => {
        // if WA call itself fails, try fallback too (keeps current behavior safe)
        const urlCBU = this.getBaseURL() + "/odata/v4/trip/CachedBusinessUser?search=" + encodeURIComponent(persNo);
        $.ajax({
          url: urlCBU,
          method: "GET",
          dataType: "json",
          success: (cbu) => {
            const rows2 = Array.isArray(cbu?.value) ? cbu.value : [];
            const exact2 =
              rows2.find(r =>
                String(r.PERSONEXTERNALID || r.PersonExternalID || "").trim() === persNo
              ) || rows2[0];
            const creditor =
              exact2?.PERSONID ??
              exact2?.PersonID ??
              exact2?.VENDORNO ??
              exact2?.VendorNo ??
              "";
            resolve(creditor || "");
          },
          error: () => resolve("")
        });
      }
    });
  });
},




_processOneTrip: function (oTrip, idx) {
  console.log(`[Settle][${idx}] ▶ Processing TripNumber=${oTrip.TripNumber}`);
  const personnel = oTrip.Personnel || oTrip.Header?.SapEmployeeNo || "";

  return this._fetchCreditorIdByPersonnel(personnel).then((sCreditor) => {
    if (!sCreditor) {
      const msg = `No PERSONID found for Personnel; cannot set Creditor (vendor). Personnel: ${personnel}`;
      this._updateSettleItem(idx, "ERROR", msg);
      return;
    }

    const sXmlPayload = this._buildJournalXml(oTrip, sCreditor);
    console.log(`[Settle][${idx}] ▶ Built payload:\n`, sXmlPayload);

    return new Promise((resolve) => {
      $.ajax({
        // url: "/odata/v4/trip/postJournalEntry",
        url: this.getBaseURL() + "/odata/v4/trip/postJournalEntry",
        method: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ xmlPayload: sXmlPayload }),
        beforeSend: () => console.log(`[Settle][${idx}] → Sending POST`),
        success: (data) => {
        const xml = data.value || "";

        // collect all <Note>…</Note> texts
        const notes = Array.from(xml.matchAll(/<Note>([\s\S]*?)<\/Note>/gi))
                          .map(m => (m[1] || "").trim());
        const msg = notes.join("; ");

        // detect explicit success phrases/patterns (either in notes or anywhere in xml)
        const successByMsg =
          /\bDocument posted successfully\b/i.test(msg) ||
          /\bDocument posted successfully\b/i.test(xml) ||
          /\bBKPFF\s+\d+/i.test(msg) ||
          /\bBKPFF\s+\d+/i.test(xml);

        // existing hard error flag (kept for fallback)
        const hasHardError = /<SeverityCode>\s*3\s*<\/SeverityCode>/i.test(xml);

        if (successByMsg) {
          // Force SUCCESS whenever SAP says "Document posted successfully"
          this._updateSettleItem(idx, "SUCCESS", msg || "Document posted successfully");
        } else if (hasHardError || notes.length) {
          // any other notes or SeverityCode=3 → error
          this._updateSettleItem(idx, "ERROR", msg || "Unknown error");
        } else {
          // no errors, no notes → success
          this._updateSettleItem(idx, "SUCCESS", "");
        }
        resolve();
      },

        error: (xhr, ts, err) => {
          const msg = xhr.responseJSON?.error?.message?.value || err;
          this._updateSettleItem(idx, "ERROR", msg);
          resolve();
        },
        complete: () => console.log(`[Settle][${idx}] → POST complete`)
      });
    });
  });
},



/**
 * Build just the SOAP body fragment — the node-soap client will wrap it
 */
// _buildJournalXml: function(oTrip) {
//   const now  = new Date().toISOString();
//   const TN   = oTrip.TripNumber;
//   const hdr  = oTrip.Header || {};
//   const it   = (oTrip.Items && oTrip.Items[0]) || {};
//   const cc   = hdr.CustCompanyCode || "1200";
//   const user = hdr.CreatedByUser   || "SAP";
//   const doc  = now.slice(0,10);

//   return `
//     <sfin:JournalEntryBulkCreateRequest xmlns:sfin="http://sap.com/xi/SAPSCORE/SFIN">
//       <MessageHeader>
//         <ID>MSG_${TN}</ID>
//         <CreationDateTime>${now}</CreationDateTime>
//       </MessageHeader>
//       <JournalEntryCreateRequest>
//         <MessageHeader>
//           <ID>SUB_MSG_${TN}</ID>
//           <CreationDateTime>${now}</CreationDateTime>
//         </MessageHeader>
//         <JournalEntry>
//           <OriginalReferenceDocumentType>BKPFF</OriginalReferenceDocumentType>
//           <OriginalReferenceDocument>${hdr.ContractNo||""}</OriginalReferenceDocument>
//           <OriginalReferenceDocumentLogicalSystem/>
//           <BusinessTransactionType>RFBU</BusinessTransactionType>
//           <AccountingDocumentType>KR</AccountingDocumentType>
//           <DocumentReferenceID>${hdr.DocumentReferenceID||""}</DocumentReferenceID>
//           <DocumentHeaderText>${hdr.DocumentHeaderText||""}</DocumentHeaderText>
//           <CreatedByUser>${user}</CreatedByUser>
//           <CompanyCode>${cc}</CompanyCode>
//           <DocumentDate>${doc}</DocumentDate>
//           <PostingDate>${doc}</PostingDate>
//           <Item>
//             <GLAccount>${it.GLAccount||""}</GLAccount>
//             <AmountInTransactionCurrency currencyCode="${it.Currency_code||"USD"}">${it.Amount||0}</AmountInTransactionCurrency>
//             <DebitCreditCode>${it.Amount>=0?"S":"H"}</DebitCreditCode>
//             <Tax>
//               <TaxCode>I0</TaxCode>
//               <TaxJurisdiction>4500000000</TaxJurisdiction>
//               <TaxItemGroup>001</TaxItemGroup>
//             </Tax>
//             <AccountAssignment>
//               <WBSElement>${hdr.InternalOrder||""}</WBSElement>
//             </AccountAssignment>
//           </Item>
//           <CreditorItem>
//             <ReferenceDocumentItem>1</ReferenceDocumentItem>
//             <Creditor>${hdr.SGVendorNo||""}</Creditor>
//             <AmountInTransactionCurrency currencyCode="${it.Currency_code||"USD"}">${-(it.Amount||0)}</AmountInTransactionCurrency>
//             <DebitCreditCode>${it.Amount>=0?"H":"S"}</DebitCreditCode>
//           </CreditorItem>
//           <ProductTaxItem>
//             <TaxCode>I0</TaxCode>
//             <TaxItemGroup>001</TaxItemGroup>
//             <TaxJurisdiction>4500000000</TaxJurisdiction>
//             <TaxItemClassification>NVV</TaxItemClassification>
//             <AmountInTransactionCurrency currencyCode="${it.Currency_code||"USD"}">0</AmountInTransactionCurrency>
//             <TaxBaseAmountInTransCrcy currencyCode="${it.Currency_code||"USD"}">${Math.abs(it.Amount||0)}</TaxBaseAmountInTransCrcy>
//           </ProductTaxItem>
//         </JournalEntry>
//       </JournalEntryCreateRequest>
//     </sfin:JournalEntryBulkCreateRequest>`;
// },


/**
 * Build the SOAP body fragment.
 * @param {object} oTrip - trip payload
 * @param {string} sCreditor - PERSONID resolved from CachedBusinessUser (may be "")
 */
_buildJournalXml: function (oTrip, sCreditor) {
  const now = new Date().toISOString();
  const TN  = oTrip.TripNumber || "NA";
  const hdr = oTrip.Header || {};
  const items = Array.isArray(oTrip.Items) ? oTrip.Items : [];

  const pick = (...vals) => vals.find(v => v !== undefined && v !== null && String(v).trim() !== "") || "";
  const padGL = gl => (gl ? String(gl).replace(/\D/g, "").padStart(8, "0") : "");
  const toStrNum = n => (Number.isFinite(+n) ? String(+n) : "0");

  const companyCode = pick(hdr.CustCompanyCode, "1200");
  const createdBy   = pick(hdr.CreatedByUser, "SAP");
  const currency    = pick(hdr.Currency_code, items[0]?.Currency_code, "USD");
  const docDate     = now.slice(0, 10);

  const headerGL    = hdr.CustGLCode ? padGL(hdr.CustGLCode) : "";
  const firstItemGL = items[0]?.GLAccount ? padGL(items[0].GLAccount) : "";
  const glAccount   = pick(firstItemGL, headerGL, "");

  // Hardcode per your request
  const origRefDoc  = "TRIP";
  // const wbs         = "4400000310";
  const wbs = pick(
  hdr.ProjectNumber, hdr.ProjectNo,
  oTrip.ProjectNumber, oTrip.ProjectNo,
  items[0]?.ProjectNumber, items[0]?.ProjectNo,
  "4400000310" // fallback if nothing present
);

  // Creditor from lookup (PERSONID). If empty, you can keep it blank or set a default vendor.
  const creditor    = sCreditor || "";

  const amounts = items.map(it => Number(it.Amount) || 0);
  const total   = amounts.reduce((a, b) => a + b, 0);

  const itemXml = `
    <Item>
      <GLAccount>${glAccount}</GLAccount>
      <AmountInTransactionCurrency currencyCode="${currency}">${toStrNum(total)}</AmountInTransactionCurrency>
      <DebitCreditCode>S</DebitCreditCode>
      <Tax>
        <TaxCode>I0</TaxCode>
        <TaxJurisdiction>4500000000</TaxJurisdiction>
        <TaxItemGroup>001</TaxItemGroup>
      </Tax>
      <AssignmentReference>${wbs}</AssignmentReference>
    </Item>`.trim();

  const creditorItemsXml = items.map((it, idx) => {
    const amt = Number(it.Amount) || 0;
    const lineNo = 2 + idx; // 2,3,4...
    return `
      <CreditorItem>
        <ReferenceDocumentItem>${lineNo}</ReferenceDocumentItem>
        <Creditor>${creditor}</Creditor>
        <AmountInTransactionCurrency currencyCode="${pick(it.Currency_code, currency)}">${toStrNum(-Math.abs(amt))}</AmountInTransactionCurrency>
        <DebitCreditCode>H</DebitCreditCode>
      </CreditorItem>`.trim();
  }).join("\n");

  const productTaxXml = `
    <ProductTaxItem>
      <TaxCode>I0</TaxCode>
      <TaxItemGroup>001</TaxItemGroup>
      <TaxJurisdiction>4500000000</TaxJurisdiction>
      <TaxItemClassification>NVV</TaxItemClassification>
      <AmountInTransactionCurrency currencyCode="${currency}">0</AmountInTransactionCurrency>
      <TaxBaseAmountInTransCrcy currencyCode="${currency}">${toStrNum(Math.abs(total))}</TaxBaseAmountInTransCrcy>
    </ProductTaxItem>`.trim();

  return `
<sfin:JournalEntryBulkCreateRequest xmlns:sfin="http://sap.com/xi/SAPSCORE/SFIN">
  <MessageHeader>
    <ID>MSG_${TN}</ID>
    <CreationDateTime>${now}</CreationDateTime>
  </MessageHeader>
  <JournalEntryCreateRequest>
    <MessageHeader>
      <ID>SUB_MSG_${TN}</ID>
      <CreationDateTime>${now}</CreationDateTime>
    </MessageHeader>
    <JournalEntry>
      <OriginalReferenceDocumentType>BKPFF</OriginalReferenceDocumentType>
      <OriginalReferenceDocument>${origRefDoc}</OriginalReferenceDocument>
      <OriginalReferenceDocumentLogicalSystem/>
      <BusinessTransactionType>RFBU</BusinessTransactionType>
      <AccountingDocumentType>KR</AccountingDocumentType>
      <DocumentReferenceID>${TN}</DocumentReferenceID>
      <DocumentHeaderText>Trip App</DocumentHeaderText>
      <CreatedByUser>${createdBy}</CreatedByUser>
      <CompanyCode>${companyCode}</CompanyCode>
      <DocumentDate>${docDate}</DocumentDate>
      <PostingDate>${docDate}</PostingDate>
      ${itemXml}
      ${creditorItemsXml}
      ${productTaxXml}
    </JournalEntry>
  </JournalEntryCreateRequest>
</sfin:JournalEntryBulkCreateRequest>`.trim();
},



/**
 * Update the model row & progress bar
 */
_updateSettleItem: function (idx, status, message) {
  const base       = `/items/${idx}`;
  const tripNumber = this._oSettleModel.getProperty(base + "/TripNumber");
  const personnel  = this._oSettleModel.getProperty(base + "/Personnel");

  console.groupCollapsed(`[SettleItem][Trip=${tripNumber}] Update`);
  console.log("idx:", idx, "status:", status, "message:", message);
  console.log("Model Personnel:", personnel);

  this._oSettleModel.setProperty(base + "/status", status);
  this._oSettleModel.setProperty(base + "/message", message);

  const lineForComments = `Settle ${status}: ${message || "OK"}`;
  console.log("Append to Comments:", lineForComments);
  Promise
    .resolve(this._appendHeaderComment(idx, lineForComments))
    .then(() => console.log("Comments append resolved."))
    .catch(e => console.error("Comments append threw:", e));

  // If error → call markSettleError
  if (status === "ERROR") {
    $.ajax({
      // url: "/odata/v4/trip/markSettleError",
      url: this.getBaseURL() + "/odata/v4/trip/markSettleError",

      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ TripNumbers: [tripNumber] }),
      success: function (data) {
        console.log(`[SettleError][${tripNumber}] Updated in backend`, data);
      },
      error: function (xhr) {
        console.error(`[SettleError][${tripNumber}] Backend update failed`, xhr.responseText);
      }
    });
  }

  // If success → call markTripSettled
  if (status === "SUCCESS") {
    $.ajax({
      // url: "/odata/v4/trip/markTripSettled",
      url: this.getBaseURL() + "/odata/v4/trip/markTripSettled",

      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ TripNumbers: [tripNumber] }),
      success: function (data) {
        console.log(`[TripSettled][${tripNumber}] Updated in backend`, data);
      },
      error: function (xhr) {
        console.error(`[TripSettled][${tripNumber}] Backend update failed`, xhr.responseText);
      }
    });
  }

  // Progress counter
  const done = this._oSettleModel.getProperty("/completed") + 1;
  this._oSettleModel.setProperty("/completed", done);
  console.log(`[Settle] ▶ Progress ${done}/${this._oSettleModel.getProperty("/total")}`);

  // When all trips processed → close dialog & refresh table
  if (done === this._oSettleModel.getProperty("/total")) {
    const oDialog = this.byId("settleDialog");
    if (oDialog) {
      oDialog.close();
    }
    
    const oSmartTable = this.byId("table");
    if (oSmartTable && oSmartTable.rebindTable) {
      console.log("[Settle] ▶ Rebinding SmartTable");
      oSmartTable.rebindTable();
    } else {
      const oTable = this.byId("table");
      if (oTable) {
        oTable.removeSelections(true);
        const oBinding = oTable.getBinding("items");
        if (oBinding && oBinding.refresh) {
          console.log("[Settle] ▶ Refreshing table binding");
          oBinding.refresh();
        }
      }
    }
  }
},

/**
 * Handler for the Close button in the SettleDialog.
 */
onSettleDialogClose: function() {
  this._pSettleDialog.then(oDlg => {
    console.log("Dialog instance:", oDlg);
    oDlg.close();
  });
},



          onSearch: function () {
            const oFilterModel = this.getView().getModel("filters");
            const aFilters = [];
        
            const sTripNumber = oFilterModel.getProperty("/TripNumber");
            const sStartDate = oFilterModel.getProperty("/TripStartDate");
            const sEndDate = oFilterModel.getProperty("/TripEndDate");
            const aSelectedProjects = oFilterModel.getProperty("/SelectedProjects");
            const aSelectedPersonnel = oFilterModel.getProperty("/SelectedPersonnel");
            const aSelectedTripStatuses = oFilterModel.getProperty("/SelectedTripStatuses");

        
            if (sTripNumber) {
                const iTripNumber = parseInt(sTripNumber, 10);
                if (!isNaN(iTripNumber)) {
                    aFilters.push(new sap.ui.model.Filter("TripNumber", "EQ", iTripNumber));
                }
            }
        
            if (sStartDate) {
                const oStart = new Date(sStartDate);
                aFilters.push(new sap.ui.model.Filter("TripStartDate", "GE", oStart.toISOString()));
            }
        
            if (sEndDate) {
                const oEnd = new Date(sEndDate);
                aFilters.push(new sap.ui.model.Filter("TripEndDate", "LE", oEnd.toISOString()));
            }
    
            if (aSelectedProjects.length > 0) {
              const aProjectFilters = aSelectedProjects.map(p =>
                  new sap.ui.model.Filter("ProjectName", "EQ", p.key)
              );
              aFilters.push(new sap.ui.model.Filter({
                  filters: aProjectFilters,
                  and: false
              }));
            }
  
            if (aSelectedPersonnel.length > 0) {
              const aPersonnelFilters = aSelectedPersonnel.map(p =>
                new sap.ui.model.Filter("Personnel", "Contains", p.key)
              );
              aFilters.push(new sap.ui.model.Filter({ filters: aPersonnelFilters, and: false }));
            }
            
            if (aSelectedTripStatuses && aSelectedTripStatuses.length > 0) {
              const aTripStatusFilters = aSelectedTripStatuses.map(status =>
                new sap.ui.model.Filter("StatusText", "EQ", status.key)
              );
              aFilters.push(new sap.ui.model.Filter({ filters: aTripStatusFilters, and: false }));
            }
            
            const oTable = this.byId("table");
            const oBinding = oTable.getBinding("items");
            if (oBinding) {
                oBinding.filter(aFilters);
            }
        },
        onPersonnelFilterSearch: function (oEvent) {
          // const sTerm = oEvent.getParameter("suggestValue") || "";
          // if (!sTerm.trim()) {
          //   this._oSuggestModel.setData({ items: [] });
          //   return;
          // }
        
          // $.ajax({
          //   // url: `/odata/v4/trip/CachedBusinessUser?search=${encodeURIComponent(sTerm)}`,
          //   url: this.getBaseURL() + "/odata/v4/trip/CachedBusinessUser?search=" + encodeURIComponent(sTerm),

          //   method: "GET",
          //   dataType: "json",
          //   success: (oData) => {
          //     const aItems = (oData.value || []).map(u => ({
          //       PersonExternalID: u.PERSONEXTERNALID,
          //       PersonFullName: u.PERSONFULLNAME
          //     }));
          //     this._oSuggestModel.setData({ items: aItems });
          //   },
          //   error: () => {
          //     this._oSuggestModel.setData({ items: [] });
          //   }
          // });
          const sTerm = oEvent.getParameter("suggestValue") || "";
if (!sTerm.trim()) {
  this._oSuggestModel.setData({ items: [] });
  return;
}

$.ajax({
  url: this.getBaseURL() + "/odata/v4/trip/WorkAssignmentCache?search=" + encodeURIComponent(sTerm) + "&$top=10",
  method: "GET",
  dataType: "json",
  success: (oData) => {
    const aItems = (oData.value || []).map(u => ({
      PersonExternalID: u.WorkAssignmentExternalID || u.WORKASSIGNMENTEXTERNALID,
      PersonFullName  : u.PersonFullName          || u.PERSONFULLNAME || u.FullName || u.FULLNAME
    }));
    this._oSuggestModel.setData({ items: aItems });
  },
  error: () => this._oSuggestModel.setData({ items: [] })
});

        },
        
        onOpenPersonnelValueHelp: function () {
          if (!this._oPersonnelVHDialog) {
            this._oPersonnelVHDialog = new sap.m.SelectDialog({
              title: "Select Personnel",
              search: this._onPersonnelVHSearch.bind(this),
              liveChange: this._onPersonnelVHSearch.bind(this),
              confirm: this._onPersonnelVHConfirm.bind(this),
              cancel: () => {},
              items: {
                path: "suggest>/items",
                template: new sap.m.StandardListItem({
                  title: "{suggest>PersonFullName}",
                  description: "{suggest>PersonExternalID}"
                })
              }
            });
            this.getView().addDependent(this._oPersonnelVHDialog);
          }
        
          this._fetchPersonnelSuggestions("").then(() => {
            this._oPersonnelVHDialog.setModel(this._oSuggestModel, "suggest");
            this._oPersonnelVHDialog.open();
          });
        },
        
        _onPersonnelVHSearch: function (oEvent) {
          const sValue = oEvent.getParameter("value") || "";
          this._fetchPersonnelSuggestions(sValue);
        },
        
        _fetchPersonnelSuggestions: function (sTerm) {
          return new Promise((resolve, reject) => {
            // $.ajax({
            //   // url: `/odata/v4/trip/CachedBusinessUser?search=${encodeURIComponent(sTerm)}`,
            //   url: this.getBaseURL() + "/odata/v4/trip/CachedBusinessUser?search=" + encodeURIComponent(sTerm),

            //   method: "GET",
            //   dataType: "json",
            //   success: (oData) => {
            //     const aItems = (oData.value || []).map(u => ({
            //       PersonExternalID: u.PERSONEXTERNALID,
            //       PersonFullName: u.PERSONFULLNAME
            //     }));
            //     this._oSuggestModel.setData({ items: aItems });
            //     resolve();
            //   },
            //   error: (err) => {
            //     this._oSuggestModel.setData({ items: [] });
            //     reject(err);
            //   }
            // });
            $.ajax({
  url: this.getBaseURL() + "/odata/v4/trip/WorkAssignmentCache?search=" + encodeURIComponent(sTerm || "") + "&$top=10",
  method: "GET",
  dataType: "json",
  success: (oData) => {
    const aItems = (oData.value || []).map(u => ({
      PersonExternalID: u.WorkAssignmentExternalID || u.WORKASSIGNMENTEXTERNALID,
      PersonFullName  : u.PersonFullName          || u.PERSONFULLNAME || u.FullName || u.FULLNAME
    }));
    this._oSuggestModel.setData({ items: aItems });
    resolve();
  },
  error: (err) => {
    this._oSuggestModel.setData({ items: [] });
    reject(err);
  }
});

          });
        },
        
        _onPersonnelVHConfirm: function (oEvent) {
          const oSelected = oEvent.getParameter("selectedItem");
          if (oSelected) {
            const sName = oSelected.getTitle();
            const sID = oSelected.getDescription();
        
            const oMultiInput = this.byId("miFilterPersonnel");
            const bExists = oMultiInput.getTokens().some(t => t.getKey() === sID);
        
            if (!bExists) {
              const oToken = new sap.m.Token({ key: sID, text: sName });
              oMultiInput.addToken(oToken);
            }
        
            this.onPersonnelTokensChanged({ getSource: () => oMultiInput });
          }
        },
        
        onPersonnelTokensChanged: function (oEvent) {
          const aTokens = oEvent.getSource().getTokens();
          const aSelected = aTokens.map(t => ({
            key: t.getKey(),
            text: t.getText()
          }));
          this.getView().getModel("filters").setProperty("/SelectedPersonnel", aSelected);
        },
        onFilterProjectValueHelp: function () {
          if (!this._pProjectDialog) {
            this._pProjectDialog = Fragment.load({
              name: "tripmanagement.view.ProjectSelectDialog",
              controller: this
            }).then(oDialog => {
              this.getView().addDependent(oDialog);
              oDialog.setModel(this._projectsModel, "projects");
              return oDialog;
            });
          }
        
          this._pProjectDialog.then(oDialog => {
            this._projectsModel.setData(this._allProjects);
            const oList = oDialog.getContent()[0];
            if (oList && oList.removeSelections) {
              oList.removeSelections(true);
            }
        
            oDialog.open();
          });
        },
        
        onProjectSearch: function (oEvent) {
          const sQuery = oEvent.getSource().getValue().toLowerCase();
        
          const aFiltered = this._allProjects.filter(p =>
            p.PROJECT.toLowerCase().includes(sQuery) ||
            p.PROJECTDESCRIPTION.toLowerCase().includes(sQuery)
          );
        
          this._projectsModel.setData(aFiltered); 
        },
        
        onProjectSelect: function (oEvent) {
          const oSelected = oEvent.getParameter("listItem").getBindingContext("projects").getObject();
          const oMultiInput = this.byId("_IDGenMultiInput");
          const aTokens = oMultiInput.getTokens();
          const bExists = aTokens.some(t => t.getKey() === oSelected.PROJECT);
          if (bExists) {
            this._pProjectDialog.then(d => d.close());
            return;
          }
          const oToken = new sap.m.Token({
            key: oSelected.PROJECT,
            text: oSelected.PROJECTDESCRIPTION
          });
          oMultiInput.addToken(oToken);
          this.onProjectTokensChanged({ getSource: () => oMultiInput });
        
          this._pProjectDialog.then(d => d.close());
        },
        
        onProjectCancel: function () {
          this._pProjectDialog.then(d => d.close());
        },
        onProjectTokensChanged: function (oEvent) {
          const aTokens = oEvent.getSource().getTokens();
          const aSelected = aTokens.map(t => ({
            key: t.getKey(),
            text: t.getText()
          }));
          this.getView().getModel("filters").setProperty("/SelectedProjects", aSelected);
        },

        onStartDateChange: function (oEvent) {
  const oStart = oEvent.getSource();
  const oEnd   = this.byId("dpEnd");
  const start  = oStart.getDateValue(); // JS Date or null

  if (start) {
    // user chose a start date: enable End picker and lock it to >= start
    oEnd.setEnabled(true);
    oEnd.setMinDate(start);

    // if End is already earlier, snap it to Start
    const end = oEnd.getDateValue();
    if (end && end < start) {
      oEnd.setDateValue(start);
    }
    oEnd.setValueState("None");
    oEnd.setValueStateText("");
  } else {
    // cleared start date: disable End picker again
    oEnd.setEnabled(false);
    oEnd.setMinDate(null);
    oEnd.setDateValue(null);
    oEnd.setValueState("None");
    oEnd.setValueStateText("");
  }
},
onExportToExcel: function () {
    var oTable = this.byId("table");
    var oBinding = oTable.getBinding("items");

    // Define the column config for Excel
    var aCols = [
        {label: "Trip Number", property: "TripNumber", type: "string"},
        {label: "Personnel", property: "Personnel", type: "string"},
        {label: "Start Date", property: "TripStartDate", type: "date"},
        {label: "End Date", property: "TripEndDate", type: "date"},
        {label: "Project", property: "ProjectName", type: "string"},
        {label: "Destination", property: "DestinationName", type: "string"},
        {label: "Status", property: "StatusText", type: "string"},
        {label: "Changed On", property: "ModifiedAt", type: "date"},
        {label: "Changed By", property: "ModifiedBy", type: "string"},
        {label: "Created On", property: "CreatedAt", type: "date"},
        {label: "Created By", property: "CreatedBy", type: "string"}
    ];

    // Prepare the export settings
    var oSettings = {
        workbook: {
            columns: aCols
        },
        dataSource: oBinding,
        fileName: "TripReport.xlsx",
        worker: true // use a web worker for performance
    };

    // Trigger the download
    var oSpreadsheet = new Spreadsheet(oSettings);
    oSpreadsheet.build()
        .then(function () {
            MessageToast.show("Excel export finished");
        })
        .finally(function () {
            oSpreadsheet.destroy();
        });
},

onUpdateFinished: function (oEvent) {
    var oTable = oEvent.getSource();
    var oBinding = oTable.getBinding("items");

    if (oBinding && oBinding.isA("sap.ui.model.odata.v4.ODataListBinding")) {
        // Request the backend count
        oBinding.requestContexts(0, Infinity).then(function (aContexts) {
            var iTotal = aContexts.length;
            this.byId("tripTableTitle").setText("Trips (" + iTotal + ")");
        }.bind(this));
    } else {
        // fallback if no binding
        var iLength = oTable.getItems().length;
        this.byId("tripTableTitle").setText("Trips (" + iLength + ")");
    }
},
onEndDateChange: function (oEvent) {
  const oEnd   = oEvent.getSource();
  const oStart = this.byId("dpStart");
  const start  = oStart.getDateValue();
  const end    = oEnd.getDateValue();

  if (start && end && end < start) {
    // guardrail: disallow back date
    oEnd.setValueState("Error");
    oEnd.setValueStateText("End date can’t be before Start date.");
    oEnd.setDateValue(null); // clear invalid input
  } else {
    oEnd.setValueState("None");
    oEnd.setValueStateText("");
  }
},

        onTripStatusChange: function (oEvent) {
          const aSelectedItems = oEvent.getSource().getSelectedItems();
          const aTokens = aSelectedItems.map(item => ({
            key: item.getKey(),   
            text: item.getText() 
          }));
          this.getView().getModel("filters").setProperty("/SelectedTripStatuses", aTokens);
        }
    });
});
