sap.ui.define(
  ['sap/ui/core/message/Message', 'sap/ui/core/message/MessageType', 'sap/m/MessageToast', "sap/m/MessageBox"],
  function (Message, MessageType, MessageToast, MessageBox) {
    'use strict';
    const aInterfaceSteps = [
      { "ID": "0010", "interfaceType_ID": "2",  "name": "UPLOAD DATA",                              "process_code": "0" },
      { "ID": "0010", "interfaceType_ID": "A",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0010", "interfaceType_ID": "G",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0010", "interfaceType_ID": "O",  "name": "UPLOAD DATA",                              "process_code": "0" },
      { "ID": "0010", "interfaceType_ID": "T",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0010", "interfaceType_ID": "U",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "1",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "2",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "3",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "4",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "A",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0020", "interfaceType_ID": "C",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "D",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "E",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "F",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "G",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0020", "interfaceType_ID": "M",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "N",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "O",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "Q",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "S",  "name": "FILE VALIDATION",                          "process_code": "1" },
      { "ID": "0020", "interfaceType_ID": "T",  "name": "HIRE/RE-HIRE PROCESS",                     "process_code": "2" },
      { "ID": "0020", "interfaceType_ID": "U",  "name": "HIRE/RE-HIRE PROCESS",                     "process_code": "2" },
      { "ID": "0026", "interfaceType_ID": "T",  "name": "Hiredinsuccessfactors",                    "process_code": "S" },
      { "ID": "0026", "interfaceType_ID": "U",  "name": "Hiredinsuccessfactors",                    "process_code": "S" },
      { "ID": "0030", "interfaceType_ID": "1",  "name": "HIRE/RE-HIRE PROCESS",                     "process_code": "2" },
      { "ID": "0030", "interfaceType_ID": "2",  "name": "REJECT SALES ORDER",                       "process_code": "H" },
      { "ID": "0030", "interfaceType_ID": "3",  "name": "TIME PROCESS",                             "process_code": "T" },
      { "ID": "0030", "interfaceType_ID": "A",  "name": "INTERCOMPANY SALES ORDER CREATE/CHANGE",   "process_code": "G" },
      { "ID": "0030", "interfaceType_ID": "C",  "name": "TIME PROCESS",                             "process_code": "T" },
      { "ID": "0030", "interfaceType_ID": "D",  "name": "REJECT SALES ORDER",                       "process_code": "H" },
      { "ID": "0030", "interfaceType_ID": "E",  "name": "INTERNAL ORDER CREATE",                    "process_code": "4" },
      { "ID": "0030", "interfaceType_ID": "F",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0030", "interfaceType_ID": "G",  "name": "INTERCOMPANY SALES ORDER CREATE/CHANGE",   "process_code": "G" },
      { "ID": "0030", "interfaceType_ID": "N",  "name": "TIME PROCESS",                             "process_code": "T" },
      { "ID": "0030", "interfaceType_ID": "Q",  "name": "REJECT SALES ORDER",                       "process_code": "H" },
      { "ID": "0030", "interfaceType_ID": "S",  "name": "HIRE/RE-HIRE PROCESS",                     "process_code": "2" },
      { "ID": "0030", "interfaceType_ID": "T",  "name": "ENTERPRISE PROJECT CREATE",                "process_code": "4" },
      { "ID": "0030", "interfaceType_ID": "U",  "name": "ENTERPRISE PROJECT CREATE",                "process_code": "4" },
      { "ID": "0036", "interfaceType_ID": "1",  "name": "CHECK EMPLOYEE CREATION S4",               "process_code": "U" },
      { "ID": "0036", "interfaceType_ID": "S",  "name": "CHECK EMPLOYEE CREATION S4",               "process_code": "U" },
      { "ID": "0040", "interfaceType_ID": "1",  "name": "INTERNAL ORDER CREATE",                    "process_code": "4" },
      { "ID": "0040", "interfaceType_ID": "2",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0040", "interfaceType_ID": "3",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0040", "interfaceType_ID": "4",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0040", "interfaceType_ID": "A",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0040", "interfaceType_ID": "D",  "name": "REJECT IC SALES ORDER",                    "process_code": "I" },
      { "ID": "0040", "interfaceType_ID": "E",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0040", "interfaceType_ID": "F",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0040", "interfaceType_ID": "G",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0040", "interfaceType_ID": "M",  "name": "ENTERPRISE PROJECT CREATE",                "process_code": "4" },
      { "ID": "0040", "interfaceType_ID": "N",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0040", "interfaceType_ID": "O",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0040", "interfaceType_ID": "Q",  "name": "REJECT IC SALES ORDER",                    "process_code": "I" },
      { "ID": "0040", "interfaceType_ID": "S",  "name": "INTERNAL ORDER CREATE",                    "process_code": "4" },
      { "ID": "0040", "interfaceType_ID": "T",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0040", "interfaceType_ID": "U",  "name": "SMART SEARCH ADDITIONAL INFOTYPE",         "process_code": "E" },
      { "ID": "0045", "interfaceType_ID": "2",  "name": "INTERCOMPANY SALES ORDER CREATE/CHANGE",   "process_code": "G" },
      { "ID": "0045", "interfaceType_ID": "3",  "name": "INTERCOMPANY SALES ORDER CREATE/CHANGE",   "process_code": "G" },
      { "ID": "0045", "interfaceType_ID": "E",  "name": "UPDATE SALES ORDER PARTNERS",              "process_code": "F" },
      { "ID": "0045", "interfaceType_ID": "N",  "name": "INTERCOMPANY SALES ORDER CREATE/CHANGE",   "process_code": "G" },
      { "ID": "0045", "interfaceType_ID": "O",  "name": "INTERCOMPANY SALES ORDER CREATE/CHANGE",   "process_code": "G" },
      { "ID": "0045", "interfaceType_ID": "U",  "name": "UPDATE HR COST DISTRIBUTION",              "process_code": "R" },
      { "ID": "0050", "interfaceType_ID": "1",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0050", "interfaceType_ID": "2",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0050", "interfaceType_ID": "3",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0050", "interfaceType_ID": "4",  "name": "PURCHASE ORDER CREATE/CHANGE",             "process_code": "5" },
      { "ID": "0050", "interfaceType_ID": "A",  "name": "CREATE MIRO CREDIT",                       "process_code": "N" },
      { "ID": "0050", "interfaceType_ID": "D",  "name": "CANCEL MIRO",                              "process_code": "J" },
      { "ID": "0050", "interfaceType_ID": "E",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0050", "interfaceType_ID": "F",  "name": "MIRO CREATE",                              "process_code": "B" },
      { "ID": "0050", "interfaceType_ID": "G",  "name": "MIRO CREATE",                              "process_code": "B" },
      { "ID": "0050", "interfaceType_ID": "M",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0050", "interfaceType_ID": "N",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0050", "interfaceType_ID": "O",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0050", "interfaceType_ID": "Q",  "name": "CANCEL MIRO",                              "process_code": "J" },
      { "ID": "0050", "interfaceType_ID": "S",  "name": "SALES ORDER CREATE/CHANGE",                "process_code": "3" },
      { "ID": "0050", "interfaceType_ID": "T",  "name": "DELETE PARTNERS",                          "process_code": "O" },
      { "ID": "0050", "interfaceType_ID": "U",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0055", "interfaceType_ID": "1",  "name": "UPDATE SALES ORDER PARTNERS",              "process_code": "F" },
      { "ID": "0055", "interfaceType_ID": "M",  "name": "UPDATE SALES ORDER PARTNERS",              "process_code": "F" },
      { "ID": "0055", "interfaceType_ID": "S",  "name": "UPDATE SALES ORDER PARTNERS",              "process_code": "F" },
      { "ID": "0057", "interfaceType_ID": "2",  "name": "MIRO CREATE",                              "process_code": "B" },
      { "ID": "0057", "interfaceType_ID": "3",  "name": "MIRO CREATE",                              "process_code": "B" },
      { "ID": "0057", "interfaceType_ID": "N",  "name": "MIRO CREATE",                              "process_code": "B" },
      { "ID": "0057", "interfaceType_ID": "O",  "name": "MIRO CREATE",                              "process_code": "B" },
      { "ID": "0060", "interfaceType_ID": "1",  "name": "UPDATE INTERNAL ORDER",                    "process_code": "C" },
      { "ID": "0060", "interfaceType_ID": "2",  "name": "REJECT IC SALES ORDER",                    "process_code": "I" },
      { "ID": "0060", "interfaceType_ID": "4",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0060", "interfaceType_ID": "C",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0060", "interfaceType_ID": "D",  "name": "REJECT PO",                                "process_code": "K" },
      { "ID": "0060", "interfaceType_ID": "E",  "name": "UPDATE SALES ORDER",                       "process_code": "6" },
      { "ID": "0060", "interfaceType_ID": "F",  "name": "UPDATE SALES ORDER",                       "process_code": "Q" },
      { "ID": "0060", "interfaceType_ID": "G",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0060", "interfaceType_ID": "M",  "name": "PURCHASE ORDER/CHANGE",                    "process_code": "5" },
      { "ID": "0060", "interfaceType_ID": "Q",  "name": "REJECT PO",                                "process_code": "K" },
      { "ID": "0060", "interfaceType_ID": "S",  "name": "UPDATE INTERNAL ORDER",                    "process_code": "C" },
      { "ID": "0060", "interfaceType_ID": "T",  "name": "UPDATE ENTERPRISE PROJECT",                "process_code": "C" },
      { "ID": "0060", "interfaceType_ID": "U",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0065", "interfaceType_ID": "1",  "name": "SMART SEARCH ADDITIONAL INFOTYPE",         "process_code": "E" },
      { "ID": "0065", "interfaceType_ID": "S",  "name": "SMART SEARCH ADDITIONAL INFOTYPE",         "process_code": "E" },
      { "ID": "0067", "interfaceType_ID": "E",  "name": "UPDATE INTERNAL ORDER",                    "process_code": "C" },
      { "ID": "0067", "interfaceType_ID": "M",  "name": "UPDATE SALES ORDER",                       "process_code": "6" },
      { "ID": "0068", "interfaceType_ID": "M",  "name": "UPDATE INTERNAL ORDER",                    "process_code": "C" },
      { "ID": "0069", "interfaceType_ID": "E",  "name": "UPDATE HR COST DISTRIBUTION",              "process_code": "R" },
      { "ID": "0070", "interfaceType_ID": "1",  "name": "READY FOR OUTBOUND PROCESS",               "process_code": "8" },
      { "ID": "0070", "interfaceType_ID": "4",  "name": "MANUAL REJECT",                            "process_code": "Z" },
      { "ID": "0070", "interfaceType_ID": "A",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0070", "interfaceType_ID": "C",  "name": "MANUAL REJECT",                            "process_code": "Z" },
      { "ID": "0070", "interfaceType_ID": "D",  "name": "CREATE CREDIT MEMO REQUEST",               "process_code": "L" },
      { "ID": "0070", "interfaceType_ID": "E",  "name": "READY FOR OUTBOUND PROCESS",               "process_code": "8" },
      { "ID": "0070", "interfaceType_ID": "F",  "name": "REJECT SALES ORDER",                       "process_code": "H" },
      { "ID": "0070", "interfaceType_ID": "G",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0070", "interfaceType_ID": "M",  "name": "READY FOR OUTBOUND PROCESS",               "process_code": "8" },
      { "ID": "0070", "interfaceType_ID": "Q",  "name": "CREATE CREDIT MEMO REQUEST",               "process_code": "L" },
      { "ID": "0070", "interfaceType_ID": "S",  "name": "READY FOR OUTBOUND PROCESS",               "process_code": "8" },
      { "ID": "0070", "interfaceType_ID": "T",  "name": "SMART SEARCH ADDITIONAL INFOTYPE",         "process_code": "E" },
      { "ID": "0075", "interfaceType_ID": "T",  "name": "UPDATE HR COST DISTRIBUTION",              "process_code": "R" },
      { "ID": "0080", "interfaceType_ID": "1",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0080", "interfaceType_ID": "2",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0080", "interfaceType_ID": "3",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0080", "interfaceType_ID": "A",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0080", "interfaceType_ID": "D",  "name": "CREATE IC CREDIT MEMO REQUEST",            "process_code": "M" },
      { "ID": "0080", "interfaceType_ID": "E",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0080", "interfaceType_ID": "F",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0080", "interfaceType_ID": "M",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0080", "interfaceType_ID": "N",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0080", "interfaceType_ID": "O",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0080", "interfaceType_ID": "Q",  "name": "CREATE IC CREDIT MEMO REQUEST",            "process_code": "M" },
      { "ID": "0080", "interfaceType_ID": "S",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0080", "interfaceType_ID": "T",  "name": "READY FOR OUTBOUND PROCESS",               "process_code": "8" },
      { "ID": "0090", "interfaceType_ID": "3",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0090", "interfaceType_ID": "D",  "name": "CREATE MIRO CREDIT",                       "process_code": "N" },
      { "ID": "0090", "interfaceType_ID": "F",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0090", "interfaceType_ID": "N",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0090", "interfaceType_ID": "O",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0090", "interfaceType_ID": "Q",  "name": "CREATE MIRO CREDIT",                       "process_code": "N" },
      { "ID": "0090", "interfaceType_ID": "T",  "name": "MANUALLY REJECTED",                        "process_code": "Z" },
      { "ID": "0100", "interfaceType_ID": "D",  "name": "DELETE PARTNER FUNCTION",                  "process_code": "O" },
      { "ID": "0100", "interfaceType_ID": "Q",  "name": "DELETE PARTNER FUNCTION",                  "process_code": "O" },
      { "ID": "0110", "interfaceType_ID": "D",  "name": "DELETE PARTNER FUNCTION IC",               "process_code": "P" },
      { "ID": "0110", "interfaceType_ID": "Q",  "name": "DELETE PARTNER FUNCTION IC",               "process_code": "P" },
      { "ID": "0120", "interfaceType_ID": "D",  "name": "INTERFACE PROCESS COMPLETE",               "process_code": "9" },
      { "ID": "0130", "interfaceType_ID": "D",  "name": "MANUALLY REJECTED",                        "process_code": "Z" }
    ];
    return {
      formatTypeLabel: function (sValue) {
        var map = { 0: "Info", 1: "Error", 2: "Warning", 3: "Success", 5: "Debug" };
        return map[sValue] !== undefined ? map[sValue] : sValue;
      },

      formatTypeState: function (sValue) {
        var map = { 0: "Information", 1: "Error", 2: "Warning", 3: "Success", 5: "None" };
        return map[sValue] !== undefined ? map[sValue] : "None";
      },

      formatProcessCodeLabel: function (sProcessCode, sInterfaceTypeId) {
        console.log("formatProcessCodeLabel called with:", sProcessCode, sInterfaceTypeId);
        if (!sProcessCode || !sInterfaceTypeId) return sProcessCode || "";

        var oMatch = aInterfaceSteps.find(function (oStep) {
          return oStep.process_code === sProcessCode
              && oStep.interfaceType_ID === sInterfaceTypeId;
        });

        var sName = oMatch ? oMatch.name : sProcessCode;
        return sProcessCode + ": " + sName;
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
