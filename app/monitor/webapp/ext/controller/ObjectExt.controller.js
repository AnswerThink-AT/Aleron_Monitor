sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('monitor.ext.controller.ObjectExt', {
		aPersistedFilters: [], // Store filters globally
		_bDelegateAdded: false,
		aFileId: null,
		aInterfaceType: null,
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf monitor.ext.controller.ObjectExt
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				this.getView().attachModelContextChange(function () {
					var oContext = this.getView().getBindingContext();
					if (oContext && !this.aFileId) {
						oContext.requestObject().then(function (oData) {
							this.aFileId = oData.ID;
							this.aInterfaceType = oData.interfaceType.ID;
							console.log(oData.interfaceType.ID);
							console.log("Captured ID:", oData.ID);
						}.bind(this));
					}
				}.bind(this));
				let oTable = this.getView().byId("monitor::FilesObjectPage--fe::table::to_Times::LineItem::Times")
				// if (oTable) {
				// 	oTable.getColumns()[0].setProperty("hAlign", "Center");
				// 	if (!this._bDelegateAdded) {
				// 		oTable.addEventDelegate({
				// 			onBeforeRendering: this.onBeforeRebindTable.bind(this)
				// 		});
				// 		oTable.attachEvent("bindingUpdated", this.onTableBindingUpdate.bind(this));
				// 		this._bDelegateAdded = true;
				// 	}
				// }
				if (oTable) {
					const aCols = oTable.getColumns();
					if (aCols.length) {
						aCols[0].setProperty("hAlign", "Center");
					}
				}

			},
			editFlow: {
				onAfterDiscard: async function () {
					const oExtensionAPI = this.base.getExtensionAPI();
					const oView = this.getView();

					// Get the current binding context of the Object Page
					const oContext = oView.getBindingContext();

					if (!oExtensionAPI.getModel() || !oContext) {
						await this._onDeleteDiscardedRecords(this.aFileId, this.aInterfaceType, oExtensionAPI.getModel());
						console.log(this.aFileId);
						return;
					}
				}
			}
		},

		onBeforeRebindTable: function () {
			var oTable = this.getView().byId("monitor::FilesObjectPage--fe::table::to_Times::LineItem::Times"),
				oBinding = oTable?.getRowBinding();
			if (!oBinding) return;

			oBinding.detachEvent("dataReceived", this.onTableDataLoaded, this)
				.attachEvent("dataReceived", this.onTableDataLoaded, this);

			if (!oBinding.aFilters?.length) this.aPersistedFilters = [new sap.ui.model.Filter("rejected", "EQ", false)];
			oBinding.filter(this.aPersistedFilters);
		},

		onTableDataLoaded: function (oBinding) {
			var oTable = this.getView().byId("monitor::FilesObjectPage--fe::table::to_Times::LineItem::Times");
			this.applyPersistedFilters(oBinding || oTable?.getRowBinding(), oTable);
		},

		applyPersistedFilters: function (oBinding, oTable) {
			if (!oBinding) return;

			var aUserFilters = oBinding.aFilters || [];
			var aNewFilters = [...aUserFilters];

			var bDefaultFilterExists = aUserFilters.some(filter => filter.sPath === "rejected" && filter.oValue1 === false);
			if (!bDefaultFilterExists) {
				aNewFilters.push(new sap.ui.model.Filter("rejected", "EQ", false));
			}

			if (JSON.stringify(aNewFilters) !== JSON.stringify(this.aPersistedFilters)) {
				this.aPersistedFilters = aNewFilters;
				oBinding.filter(aNewFilters);
			}
		},

		onTableBindingUpdate: function () {
			// Fix: Ensure filters persist even when columns are added/removed
			var oTable = this.getView().byId("monitor::FilesObjectPage--fe::table::to_Times::LineItem::Times"),
				oBinding = oTable?.getRowBinding();
			if (oBinding) this.applyPersistedFilters(oBinding, oTable);
		},
		onPressRefresh: function () {
			const oExtensionAPI = this.base.getExtensionAPI();
			oExtensionAPI.refresh();
		},
		_onDeleteDiscardedRecords : async function (fileID, interfaceID, oModel) {
			await this.base.getExtensionAPI()
				.editFlow.invokeAction(
					"MonitorService.EntityContainer/deletediscardedRecords",
					{
						model: oModel,
						skipParameterDialog: true,
						parameterValues: [
							{
								name: "fileID",
								value: fileID
							},
							{
								name: "interfaceID",
								value: interfaceID
							}
						]
					}
				);
		},
	});
});
