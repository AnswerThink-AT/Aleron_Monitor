sap.ui.define(
  ['sap/ui/core/message/Message', 'sap/ui/core/message/MessageType', 'sap/m/MessageToast', "sap/m/MessageBox"],
  function (Message, MessageType, MessageToast, MessageBox) {
    'use strict';

    return {
      formatTypeLabel: function (sValue) {
        var map = { 0: "Info", 1: "Error", 2: "Warning", 3: "Success", 5: "Debug" };
        return map[sValue] !== undefined ? map[sValue] : sValue;
      },

      formatTypeState: function (sValue) {
        var map = { 0: "Information", 1: "Error", 2: "Warning", 3: "Success", 5: "None" };
        return map[sValue] !== undefined ? map[sValue] : "None";
      },
      onPressProcessRecords: async function (oCtx, aSelectedRecordCtx, oEvent) {
        const sFileNumber = oCtx.getProperty('ID');
        const oModel = this.getModel();
        const aRecords = aSelectedRecordCtx.map((oRecordCtx) => oRecordCtx.getProperty('ID'));

        // Extract all selected records processLevel/code values
        const aProcessCodes = aSelectedRecordCtx.map(oRecordCtx => oRecordCtx.getProperty("processLevel/code"));

        // Get the first code for comparison
        const firstCode = aProcessCodes[0];

        // Check if all codes are the same
        const allSame = aProcessCodes.every(code => code === firstCode);

        if (!allSame) {
          MessageBox.error("All selected records must have the same Process Level Code.");
          return;
        }

        const sFrom = firstCode;
        const sTo = "";
        let sTableId = oEvent.sPath;

        this.editFlow
          .invokeAction('MonitorService.EntityContainer/processFile', {
            model: oModel,
            skipParameterDialog: true,
            parameterValues: [
              {
                name: 'fileNumber',
                value: sFileNumber,
              },
              {
                name: 'records',
                value: aRecords,
              },
              {
                name: 'from',
                value: sFrom,
              },
              {
                name: 'to',
                value: sTo,
              },
              {
                name: 'tableId',
                value: sTableId,
              }
            ],
          })
          .then((oActionCtx) => {
            const oResult = oActionCtx.getObject();
            this.showMessages([new Message({ type: MessageType.Success, message: oActionCtx.message })]);
            this.refresh();
          });
      },

      onPressProcessFile: async function (oCtx, oEvent) {
        const sFileNumber = oCtx.getProperty('ID');
        let sTableId = oEvent.sPath;
        // Disable the Process All button by setting isEditable to true
        // const oUIModel = this.getModel("ui");
        // if (oUIModel) {
        //   oUIModel.setProperty("/isProcessingFile", true);
        // }

        this.editFlow
          .invokeAction('MonitorService.EntityContainer/processFile', {
            model: this.getModel(),
            skipParameterDialog: true,
            parameterValues: [
              {
                name: 'fileNumber',
                value: sFileNumber,
              },
              {
                name: 'records',
                value: [],
              },
              {
                name: 'from',
                value: '-1',
              },
              {
                name: 'to',
                value: '',
              },
              {
                name: 'tableId',
                value: sTableId,
              }
            ],
          })
          .then((oActionCtx) => {
            const oResult = oActionCtx.getObject();
            this.showMessages([new Message({ type: MessageType.Success, message: oResult.message })]);
            this.refresh();
          })
        // .catch((oError) => {
        //   // Re-enable the button on error
        //   if (oUIModel) {
        //     oUIModel.setProperty("/isProcessingFile", false);
        //   }
        //   console.error("Process File error:", oError);
        // })
        // .finally(() => {
        //   // Re-enable the button when operation completes (success or error)
        //   if (oUIModel) {
        //     oUIModel.setProperty("/isProcessingFile", false);
        //   }
        // });
      },

      onPressValidate: function (oCtx, aSelectedRecordCtx, oEvent) {
        const sFileNumber = oCtx.getProperty('ID');
        const oModel = this.getModel();
        const aRecords = aSelectedRecordCtx.map((oRecordCtx) => oRecordCtx.getProperty('ID'));

        let sTableId = oEvent.sPath;

        this.editFlow
          .invokeAction('MonitorService.EntityContainer/validateFile', {
            model: this.getModel(),
            skipParameterDialog: true,
            parameterValues: [
              {
                name: 'fileNumber',
                value: sFileNumber,
              },
              {
                name: 'records',
                value: aRecords,
              },
              {
                name: 'tableId',
                value: sTableId,
              },
            ],
          }).then((oActionCtx) => {
            const oResult = oActionCtx.getObject();
            // this.showMessages([new Message({ type: MessageType.Success, message:oResult.message })]);
            oResult.success === true ? MessageBox.success(oResult.message) : MessageBox.error(oResult.message);
            this.refresh();
          });
      },

      onPressRejectRecords: function (oCtx, aSelectedRecordCtx) {
        let that = this;
        const sFileNumber = oCtx.getProperty('ID');
        const oModel = this.getModel();
        const aRecords = aSelectedRecordCtx.map((oRecordCtx) => oRecordCtx.getProperty('ID'));

        MessageBox.confirm("Are you sure you want to reject this selected Recrods?", {
          title: "Confirm Rejection",
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          emphasizedAction: MessageBox.Action.OK,
          onClose: function (sAction) {
            if (sAction === "OK") {
              that.editFlow
                .invokeAction('MonitorService.EntityContainer/rejectFile', {
                  model: that.getModel(),
                  skipParameterDialog: true,
                  parameterValues: [
                    {
                      name: 'fileNumber',
                      value: sFileNumber,
                    },
                    {
                      name: 'records',
                      value: aRecords,
                    },
                  ],
                })
                .then((oActionCtx) => {
                  const oResult = oActionCtx.getObject();
                  that.showMessages([new Message({ type: MessageType.Success, message: oResult.message })]);
                  that.refresh();
                });
            } else {
              console.log("Rejection cancelled");
            }
          }
        });
      },

      onPressRejectFile: function (oCtx) {
        let that = this;
        const sFileNumber = oCtx.getProperty('ID');

        MessageBox.confirm("Are you sure you want to reject this File?", {
          title: "Confirm Rejection",
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          emphasizedAction: MessageBox.Action.OK,
          onClose: function (sAction) {
            if (sAction === "OK") {
              that.editFlow
                .invokeAction('MonitorService.EntityContainer/rejectFile', {
                  model: that.getModel(),
                  skipParameterDialog: true,
                  parameterValues: [
                    {
                      name: 'fileNumber',
                      value: sFileNumber,
                    },
                    {
                      name: 'records',
                      value: [],
                    },
                  ],
                })
                .then((oActionCtx) => {
                  const oResult = oActionCtx.getObject();
                  that.showMessages([new Message({ type: MessageType.Success, message: oResult.message })]);
                  that.refresh();
                });
            } else {
              console.log("Rejection cancelled");
            }
          }
        });
      },

      onPressProcessError: async function (oEvent) {
        var oModel = this.getModel();
        // open upload dialog

        this._ProcessErrorDialog ??= await this.loadFragment({
          id: 'processErrorDialog',
          name: 'monitor.ext.fragment.ProcessErrorsDialog',
        });
        var oTable = sap.ui.core.Fragment.byId("processErrorDialog", "idProcessLogsTable");
        let sRecordID = oEvent.getSource().getParent().getBindingContext().getProperty("ID");
        var oBinding = oTable.getBinding("items");
        if (oBinding && oBinding.isA("sap.ui.model.odata.v4.ODataListBinding")) {
          oBinding.refresh();
        }
        var aFilters = [
          new sap.ui.model.Filter(
            "record_ID",
            sap.ui.model.FilterOperator.EQ,
            sRecordID
          )
        ];

        oBinding.filter(aFilters);

        // const oVBox = new sap.m.VBox({
        //   items: [
        //     new sap.m.Text({
        //       text: "{message}",
        //       wrapping: true
        //     }),
        //   ],
        // });
        // oVBox.addStyleClass("customMessageBox");

        // oList.bindItems({
        //   path: "/ProcessLogs",
        //   filters: [new sap.ui.model.Filter("record_ID", sap.ui.model.FilterOperator.EQ, sRecordID)],
        //   template: new sap.m.CustomListItem({
        //     content: [oVBox],
        //   }),
        // });

        this._ProcessErrorDialog.open();
      },

      onProcessErrorsOK: function () {
        this._ProcessErrorDialog.close();
      },

    };
  },
);
