sap.ui.define(
  ['sap/ui/core/mvc/ControllerExtension', 'sap/ui/core/Fragment', 'sap/m/MessageToast', 'monitor/utils/constant'],
  function (ControllerExtension, Fragment, MessageToast, constant) {
    'use strict';

    return ControllerExtension.extend('monitor.ext.controller.ListExt', {
      _oUploadDialog: null,
      _metadataCache: {},
      // this section allows to extend lifecycle hooks or hooks provided by Fiori elements
      override: {
        /**
         * Called when a controller is instantiated and its View controls (if available) are already created.
         * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
         * @memberOf monitor.ext.controller.ListExt
         */
        onInit: function () {
          // you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
          var oModel = this.base.getExtensionAPI().getModel();
        },
      },

      getResourceModel: function () {
        return this.base.getExtensionAPI().getModel('i18n').getResourceBundle();
      },

      // open upload dialog
      onPressUpload: async function () {
        // let oView = this.getView();

        this._oUploadDialog ??= await this.base.getExtensionAPI().loadFragment({
          id: 'FileUploadDialog',
          name: 'monitor.ext.fragment.Upload',
          controller: this,
        });

        this._oUploadDialog.open();
        this._oUploadDialog.getContent()[1].setSelectedKey('');
        this._oUploadDialog.getContent()[2].setValue('');
      },

      // close upload dialog
      onPressCancel: function () {
        const oAppModel = this.base.getExtensionAPI().getModel("appModel");
        oAppModel.setProperty("/isUploadBusy", false);
        if (this._oUploadDialog) {
            this._oUploadDialog.close();
        }
        const oTable = this.base.byId("fe::table::Files::LineItem");
        if (oTable) {
            const oRowBinding = oTable.getRowBinding();
            if (oRowBinding) {
                oRowBinding.refresh();
            }
        }
      },

      // on File Upload
      onFileBrowse: function (oEvent) {
        let interfaceID = oEvent.getSource().getParent().getContent()[1].getSelectedKey();

        if (!interfaceID) {
          this._oUploadDialog.getContent()[2].setValue('');
          MessageToast.show(this.getResourceModel().getText("selectInterfaceTypeError"));
          return;
        }

        var oFileUploader = oEvent.getSource();
        var oFile = oFileUploader.oFileUpload.files[0];

        if (!oFile) {
          MessageToast.show(this.getResourceModel().getText('fileBrowseError'));
          return;
        }
        this._uploadedFileName = oFile.name;


        // eslint-disable-next-line no-undef
        var reader = new FileReader();

        reader.onload = async (e) => {
          var sContent = e.target.result;
          const aSubItemsPayload = this.aSubItemsPayload = await this._parseCSVWithValidation(sContent, interfaceID);
        };

        reader.readAsText(oFile);
      },

      _parseCSV: function (sCSV, interfaceID) {

        let columnMappings = {
          "1": "aWNWorkOrdersColumns",
          "C": "aTimesColumns",
          "3": "aTimesColumns",
          "T": "aEmployRecordsColumns",
          "U": "aStaffColumns",
          "S": "aVNWorkOrdersColumns",
          "M": "aWorkOrdersFGColumns",
          "4": "aTerminationsColumns", // term 4 interface
          "D": "aCredit_Rebill", // Credit_Rebill D interface
          "Q": "aFg_Credit_Rebill", // FQ Credit_Rebill Q interface
          "O": "aOtherBillablesColumns",
          "E": "aSowScWoColumns", //Interface E
          "F": "aSowScInvoiceColumns", //Interface F
          "N": "aFgTimeInvoicesColumns", //interface N FG Time Invoices
          "G": "aBonusColumns", // Bonus G interface
          "2": "aTravelColumns", //Interface 2
          "A": "aDrug_Background_CheckColumns" //Interface A
        };

        let columnMappingsBoolean = {
          "1": "aWNWorkOrdersColumnsBoolean",
          "C": "aTimesColumnsBoolean",
          "3": "aTimesColumnsBoolean",
          "T": "aEmployRecordsColumnsBoolean",
          "U": "aStaffColumnsBoolean",
          "S": "aVNWorkOrdersColumnsBoolean",
          "M": "aWorkOrdersFGColumnsBoolean",
          "4": "aTerminationsColumnsBoolean", // term 4 Interface
          "D": "aCreditRebillColumnsBoolean",
          "Q": "aFg_Credit_Rebill", // FQ Credit_Rebill Q interface
          "O": "aOtherBillablesColumnsBoolean",
          "E": "aSowScWoColumnsBoolean", //Interface E
          "F": "aSowScInvoiceColumnsBoolean", //Interface F
          "N": "aFgTimeInvoicesColumnsBoolean", //Interface N FG Time Invoices
          "Q": "aFg_Credit_RebillColumnsBoolean",
          "G": "aBonusColumnsBoolean", // Bonus G interface
          "2": "aTravelColumnsBoolean", //Interface 2
          "A": "aDrug_Background_CheckColumnsBoolean" //Interface A
        };

        let columnMappingsMarital = {
          "T": "aEmployRecordsColumnsMarital",
        }

        if (!columnMappings[interfaceID]) {
          console.error("Invalid Interface ID:", interfaceID);
          return;
        }

        let objectColumns = constant[columnMappings[interfaceID]];

        // let aLines = sCSV.split('\n');
        let aLines = sCSV.split(/\r?\n/);
        let aResults = [];

        // let aHeaders = aLines[0].split(',');

        // for (let i = 0; i < aLines.length; i++) {
        //   let aCols = aLines[i].split(',');
        //   if(aCols.length <= 1) continue;
        //   let oRecord = {};
        //   objectColumns.forEach((column, colIndex) => {
        //     if (!aCols[colIndex]) {
        //       return;
        //     }
            
        //     // oRecord[column] = aCols[colIndex].trim();
        //     let value = aCols[colIndex].trim();
        //     if (interfaceID === "M" && colIndex === 30 ) {
        //       if(value.includes(" - ")){
        //       value = value.split(" - ")[0].trim();
        //       }else {
        //         value = value.substring(0,10);
        //       }
        //     }
        //     if (interfaceID === "M" && colIndex === 24 && value) {
        //       value = value.toUpperCase();
        //     }
        //      oRecord[column] = value;
        //   });
        //   this.convertToBoolean(oRecord, constant[columnMappingsBoolean[interfaceID]]);
        //   oRecord.valid = true;
        //   oRecord.processLevel_code = "0";
        //   // if (oRecord.hasOwnProperty('country') && oRecord.country === 'US') {
        //   //   oRecord.country = 'USA';
        //   // }
        //   aResults.push(oRecord);
        // }
        const interfacesWithHeaders = ["M", "N", "Q"];
        const startIndex = interfacesWithHeaders.includes(interfaceID) ? 1 : 0;
        // for (let i = 0; i < aLines.length; i++) {
        for (let i = startIndex; i < aLines.length; i++) {
          if (!aLines[i].trim()) continue;
          
          let aCols = [];
          let currentCol = '';
          let inQuotes = false;
          
          try {
            
            for (let j = 0; j < aLines[i].length; j++) {
              let char = aLines[i][j];
              
              if (char === '"') {
                if (j + 1 < aLines[i].length && aLines[i][j + 1] === '"') {
                  currentCol += '"';
                  j++;
                } else {
                  inQuotes = !inQuotes;
                }
              } else if (char === ',' && !inQuotes) {
                aCols.push(currentCol.trim());
                currentCol = '';
              } else {
                currentCol += char;
              }
            }
            
            aCols.push(currentCol.trim());
            
            if (aCols.length <= 1) continue;
            
            // Validate number of columns matches expected columns
            // if (aCols.length !== objectColumns.length) {
            //   throw new Error(`Invalid number of columns in row ${i + 1}. Expected ${objectColumns.length}, got ${aCols.length}`);
            // }
                        
            let oRecord = {};
            objectColumns.forEach((column, colIndex) => {
              if (!aCols[colIndex]) {
                return;
              }
              let value = aCols[colIndex];
              if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
              }
               // Custom logic for interfaceID M
               
               if (interfaceID === "M" && colIndex === 30) {
                if (value.includes(" - ")) {
                  value = value.split(" - ")[0].trim();
                } else {
                  value = value.substring(0, 10);
                }
              }
              if (interfaceID === "M" && colIndex === 24 && value) {
                value = value.toUpperCase();
              }
              oRecord[column] = value;
            });

            if(interfaceID === 'T' || interfaceID === 'U'){
              if(oRecord.maritalStatus === '0'){
                oRecord.maritalStatus = 'S';
              }else if(oRecord.maritalStatus === '1'){
                oRecord.maritalStatus = 'M';                
              }
              if(oRecord.recruiterEmployeeNo.length == 7 )
              {
                oRecord.recruiterEmployeeNo = '0'+ oRecord.recruiterEmployeeNo
              }
              if(oRecord.employeeResponsible.length == 7)
              {
                oRecord.employeeResponsible = '0'+ oRecord.employeeResponsible
              }
              this._trimFieldsForZeros(oRecord);
            }

            if(interfaceID === '3'){
              if(oRecord.additionalDayOfWork && oRecord.additionalDayOfWork.trim() !== ''){
                oRecord.additionalDayOfWork = 'X';
              }
            }

            //  if(interfaceID === 'S' || interfaceID === '1'|| interfaceID === 'M' || interfaceID === 'E' || interfaceID === 'F' || interfaceID === 'C' || interfaceID === '3'){
              this._trimFieldsForZeros(oRecord);
            // }
            
            this.convertToBoolean(oRecord, constant[columnMappingsBoolean[interfaceID]]);
            oRecord.valid = true;
            oRecord.processLevel_code = "0";
            aResults.push(oRecord);
          } catch (error) {
            throw new Error(`Error processing row ${i + 1}: ${error.message}`);
          }
        }

        if (aResults.length === 0) {
          throw new Error('No valid records found in CSV file');
        }

        return aResults;
      },

      _trimFieldsForZeros: function (oRecord) {
        // Trim the fields for zeros
        // const aFieldsToTrimForZeros = ['contractNo', 'soldToParty', 'billToParty', 'material','wnContract'];
        const aFieldsToTrimForZeros = [
          'contractNo',       // Interfaces: C, 3, T, U, S, 1, E, 4, O, G, 2, F, A
          'contractNoSS',     // Interface: N (Fg_Invoices)
          'contractNoWN',     // Interface: N (Fg_Invoices)
          'soldToParty',      // Interfaces: S, 1, T, U, E
          'soldTo',           // Interface: M
          'billToParty',      // Interfaces: S, 1, T, U, E
          'billTo',           // Interface: M
          'material',         // Interfaces: T, U
          'materialNo',       // Interfaces: S, 1, E, F
          'matnr',            // Interface: M
          'wnContract',       // Interface: M
          'project',          // Interface: A (Drug_Background_Check)
          'projectNo',        // Interfaces: T, U (Employee/Staff Hires)
          'orderNo',          // Interfaces: C, 3, N (Times, Fg_Invoices)
          'internalOrder'     // Interfaces: F, O, G, 2 (SowScInvoice, OtherBillables, Bonus, Travel)
        ];
        for (const sField of aFieldsToTrimForZeros) {
          if (oRecord[sField]) {
            oRecord[sField] = oRecord[sField].replace(/^0+/, '');
          }
        }
        return oRecord;
      },

      convertToBoolean: function (obj, keys) {

        if (!Array.isArray(keys) || keys.length === 0) {
          return;
        }

        keys.forEach(key => {
          if (obj.hasOwnProperty(key)) {
            obj[key] = obj[key] === "X"; 
          }
        });
      },

      onFileUpload: function (oEvent) {
        if (this.aSubItemsPayload) {
          let interfaceID = oEvent.getSource().getParent().getContent()[1].getSelectedKey();
          if (interfaceID === '') {
            MessageToast.show(this.getResourceModel().getText('selectInterfaceTypeError'));
            return;
          }
          this._createMonitorFile(this.aSubItemsPayload, interfaceID);
        } else {
          MessageToast.show(this.getResourceModel().getText('fileBrowseError'));
          return;
        }
      },
      // 
      _createMonitorFile: async function (aSubItemsPayload, interfaceID) {
        console.log('Creating file with interface ID:', interfaceID);
        console.log('Payload data:', aSubItemsPayload);
        let oFile = {
          IsActiveEntity: false,
          source: 'LOCAL',
          interfaceType: {
            ID: interfaceID,
          },
          type: 'csv',
          recordsCount: aSubItemsPayload.length,
          processLevel: {
            code: '0',
          },
          status: {
            code: 1,
          },
          reprocessed: false,
          name: this._uploadedFileName || 'Dummy File from UI Upload',
        };
        this._pendingRecords = aSubItemsPayload;
        const columnMappings = {
          "1": "to_WorkOrders_WN",
          "C": "to_Times",
          "3": "to_Times",
          "T": "to_EmployeeHires",
          "U": "to_StaffHires",
          "S": "to_WorkOrders",
          "M": "to_WorkOrders_FG",
          "4": "to_Terminations", // term 4 Interface
          "D": "to_Credit_Rebill", // Credit_Rebill D interface
          "N": "to_Fg_Invoices", // Interface N FG Time Invoices
          "Q": "to_Fg_Credit_Rebill", // Interface FG Credit_Rebill Entity Q
          "O": "to_OtherBillables",  // Interface OtherBillables Entity O
          "G": "to_Bonus", // Bonus G interface
          "E": "to_SowScWo", // Interface E
          "F": "to_SowScInvoice", // Interface F
          "2": "to_Travel", //Interface 2
          "A": "to_Drug_Background_Check" // Drug Background Check interface
        };

        // if (interfaceID === 'A') {
        
        //   delete oFile.to_Drug_Background_Check;
        //   this._pendingDrugRecords = aSubItemsPayload; // Store for later
        // } else {
        //   oFile[columnMappings[interfaceID]] = aSubItemsPayload;
        // }

        
        // const interfacesWithFileAssociation = [
        //  "A"
        // ];

        
        // if (interfacesWithFileAssociation.includes(interfaceID)) {
        //   aSubItemsPayload = aSubItemsPayload.map(record => ({
        //     ...record,
        //     // file: null // 
        //   }));
        // }

        // oFile[columnMappings[interfaceID]] = aSubItemsPayload;

        // console.log('Final file object being sent:', oFile);
        // console.log('Association data:', oFile[columnMappings[interfaceID]]);

        const oAppModel = this.base.getExtensionAPI().getModel('appModel');
        const oModel = this.base.getExtensionAPI().getModel();
        // this._pendingDrugRecords = interfaceID === 'A' ? aSubItemsPayload : null;
        const oFilesListBinding = oModel.bindList('/Files');
        const oNewFileCtx = oFilesListBinding.create(oFile);

        // Attach success call
        oNewFileCtx.created().then(
          async () => {
            const oNewlyCreatedFile = oNewFileCtx.getObject();
            console.log('File created successfully:', oNewlyCreatedFile);            
            // if (interfaceID === 'A' && this._pendingDrugRecords) {
            //   console.log('Manually creating Drug Background Check records');
            //   await this._createDrugRecordsManually(oNewlyCreatedFile.ID, this._pendingDrugRecords);
            //   this._pendingDrugRecords = null; // Clear the pending records
            // }

            if (this._pendingRecords) {
              console.log('Manually creating records for interface:', interfaceID);
              try {
                await this._createRecordsManually(oNewlyCreatedFile.ID, this._pendingRecords, interfaceID);
                console.log('Records created successfully');
                this._pendingRecords = null; // Clear the pending records
              } catch (error) {
                console.error('Error creating records:', error);
                MessageBox.error('Error creating records: ' + error.message);
                return;
              }
            }

            this.onPressCancel();
            oAppModel.setProperty('/isUploadBusy', false);

            // generating the pattern for routing
            let sObjectPath = `ID=${oNewlyCreatedFile.ID},IsActiveEntity=false`;

            // nevigating to FilesObjectPage after uploading a file.
            this.base.routing.navigateToRoute("FilesObjectPage", { FilesKey: sObjectPath });

            // refreshing the table data on List page after uploading a file.
            this.base.byId('fe::table::Files::LineItem').getRowBinding().refresh();
          },
          (oErr) => {
            if (oErr.cancelled) {
              oNewFileCtx.delete();
            } else {
              // Handle different types of errors
              let sErrorMessage = "";
              
              if (oErr.statusCode === 400) {
                // Handle validation errors
                if (oErr.response && oErr.response.body) {
                  try {
                    const oErrorDetails = JSON.parse(oErr.response.body);
                    if (oErrorDetails.error && oErrorDetails.error.innererror) {
                      const oInnerError = oErrorDetails.error.innererror;
                      
                      // Handle specific validation errors
                      if (oInnerError.errordetails) {
                        const aErrorDetails = oInnerError.errordetails;
                        if (Array.isArray(aErrorDetails) && aErrorDetails.length > 0) {
                          sErrorMessage = aErrorDetails.map(error => {
                            if (error.message) {
                              return `${error.message}`;
                            }
                            return error;
                          }).join('\n');
                        }
                      } else if (oInnerError.message) {
                        sErrorMessage = oInnerError.message;
                      }
                    }
                  } catch (parseError) {
                    console.error("Error parsing error response:", parseError);
                    sErrorMessage = this.getResourceModel().getText('invalidDataError');
                  }
                } else {
                  sErrorMessage = this.getResourceModel().getText('invalidDataError');
                }
              } else if (oErr.statusCode === 401) {
                sErrorMessage = this.getResourceModel().getText('unauthorizedError');
              } else if (oErr.statusCode === 403) {
                sErrorMessage = this.getResourceModel().getText('forbiddenError');
              } else if (oErr.statusCode === 404) {
                sErrorMessage = this.getResourceModel().getText('notFoundError');
              } else if (oErr.statusCode === 413) {
                sErrorMessage = this.getResourceModel().getText('fileTooLargeError');
              } else if (oErr.statusCode >= 500) {
                sErrorMessage = this.getResourceModel().getText('serverError');
              } else {
                sErrorMessage = this.getResourceModel().getText('uploadError');
              }

              // Show error message with details
              MessageToast.show(sErrorMessage, {
                duration: 5000,
                width: "auto",
                closeOnBrowserNavigation: false
              });

              // Log detailed error for debugging
              console.error("Upload error:", {
                statusCode: oErr.statusCode,
                response: oErr.response,
                error: oErr
              });
            }
          },
        );

        // Batch
        oAppModel.setProperty('/isUploadBusy', true);
        oModel.submitBatch(oModel.getUpdateGroupId()).then(
          () => {
            // Success case is handled in oNewFileCtx.created()
          },
          (oErr) => {
            oAppModel.setProperty('/isUploadBusy', false);
            oNewFileCtx.delete();
            
            // Handle batch submission errors
            let sErrorMessage = this.getResourceModel().getText('batchError');
            if (oErr.response && oErr.response.body) {
              try {
                const oErrorDetails = JSON.parse(oErr.response.body);
                if (oErrorDetails.error && oErrorDetails.error.message) {
                  sErrorMessage = oErrorDetails.error.message;
                }
              } catch (parseError) {
                console.error("Error parsing batch error response:", parseError);
              }
            }

            MessageToast.show(sErrorMessage, {
              duration: 5000,
              width: "auto",
              closeOnBrowserNavigation: false
            });

            console.error("Batch submission error:", oErr);
          },
        );
      },
      // _createDrugRecordsManually: async function(fileID, records) {
      //   try {
      //     console.log('Creating Drug Background Check records manually for file:', fileID);
          
      //     const oModel = this.getView().getModel();
      //     const drugRecords = records.map(record => ({
      //       ...record,
      //       // file_ID: fileID,
      //       file: {
      //         ID: fileID
      //       },
      //       valid: record.valid || true,
      //       processLevel_code: record.processLevel_code || "0"
      //     }));
          
      //     console.log('Drug records to create:', drugRecords);

          
      //     // Create records using the model
      //     const drugBinding = oModel.bindList('/Drug_Background_Check');
      //     const createdRecords = [];
          
      //     for (const record of drugRecords) {
      //       // Remove any ID field to let the server generate it automatically
      //       delete record.ID;
            
      //       const context = drugBinding.create(record);
      //       await context.created();
      //       createdRecords.push(context.getObject());
      //     }
          
      //     console.log('Successfully created', createdRecords.length, 'Drug Background Check records');
          
      //   } catch (error) {
      //     console.error('Error creating Drug Background Check records:', error);
      //     MessageBox.error('Error creating records: ' + error.message);
      //   }
      // },
      _createRecordsManually: async function(fileID, records, interfaceType) {
        try {
          console.log('Creating records manually for file:', fileID, 'interface:', interfaceType);
          
          // Map interface types to entity names
          const entityMappings = {
            "1": "WorkOrders_WN",
            "C": "Times",
            "3": "Times",
            "T": "EmployeeHires",
            "U": "StaffHires",
            "S": "WorkOrders",
            "M": "WorkOrders_FG",
            "4": "Terminations",
            "D": "Credit_Rebill",
            "N": "Fg_Invoices",
            "Q": "Fg_Credit_Rebill",
            "O": "OtherBillables",
            "G": "Bonus",
            "E": "SowScWo",
            "F": "SowScInvoice",
            "2": "Travel",
            "A": "Drug_Background_Check"
          };
          
          const entityName = entityMappings[interfaceType];
          if (!entityName) {
            throw new Error('Unknown interface type: ' + interfaceType);
          }
          
          console.log('Using entity:', entityName);
          
          const oModel = this.getView().getModel();
          const processedRecords = records.map(record => ({
            ...record,
            file: {
              ID: fileID
            },  // Use association format
            valid: record.valid || true,
            processLevel_code: record.processLevel_code || "0"
          }));
          
          console.log('Records to create:', processedRecords.length);
          console.log('First record:', processedRecords[0]);
          
          // Create records using the model
          const entityBinding = oModel.bindList('/' + entityName);
          const createdRecords = [];
          
          for (const record of processedRecords) {
            // Remove any ID field to let the server generate it automatically
            delete record.ID;
            // Remove file_ID if it exists to avoid conflicts
            delete record.file_ID;
            
            console.log('Creating record with file association:', record.file);
            
            const context = entityBinding.create(record);
            await context.created();
            const createdRecord = context.getObject();
            createdRecords.push(createdRecord);
            
            console.log('Record created successfully:', createdRecord);
          }
          
          console.log('Successfully created', createdRecords.length, 'records for interface', interfaceType);
          return createdRecords;
          
        } catch (error) {
          console.error('Error creating records for interface', interfaceType, ':', error);
          throw error;
        }
      },

      // start
      // Enhanced CSV parsing with metadata validation using backend service
      _parseCSVWithValidation: async function(sCSV, interfaceID) {
        const aResults = this._parseCSV(sCSV, interfaceID);
        
        if (aResults.length === 0) {
          return aResults;
        }

        try {
           const metadata = await this._getEntityMetadataFromBackend(interfaceID);
          if (metadata) {
            this._applyStringLengthConstraints(aResults, metadata);
          }
          // Call backend validation service
          const validationResult = await this._validateRecordsViaBackend(interfaceID, aResults);
          
          if (!validationResult.isValid) {
            const validationErrors = JSON.parse(validationResult.errors);
            this._showMetadataValidationErrors(validationErrors);
            return []; // Return empty array to prevent processing invalid data
          }

          return aResults;
        } catch (error) {
          console.error('Validation error:', error);
          MessageToast.show('Error validating data: ' + error.message);
          return [];
        }
      },

      // Call backend validation service
      _validateRecordsViaBackend: async function(interfaceID, records) {
        const oModel = this.base.getExtensionAPI().getModel();
        
        // Convert records to JSON strings for backend processing
        const recordStrings = records.map(record => JSON.stringify(record));
        
        // Call the backend validateRecords action
        // const response = await oModel.invokeFunction('/validateRecords', {
        //   interfaceId: interfaceID,
        //   records: recordStrings
        // });
        const response = await this.base.getExtensionAPI().editFlow.invokeAction('MonitorService.EntityContainer/validateRecords', {
            model: oModel,
            skipParameterDialog: true,
            parameterValues: [
              {
                name: 'interfaceId',
                value: interfaceID
              },
              {
                name: 'records',
                value: recordStrings
              }
            ]
          });
        
        // return response.getObject();
        return (response && typeof response.getObject === 'function') ? response.getObject() : response;
      },

      // Get entity metadata from backend (for future use)
      // _getEntityMetadataFromBackend: async function(interfaceID) {
      //   const oModel = this.base.getExtensionAPI().getModel();
        
      //   try {
      //     const response = await oModel.invokeFunction('/getEntityMetadata', {
      //       interfaceId: interfaceID
      //     });
          
      //     return {
      //       entityName: response.entityName,
      //       fields: JSON.parse(response.fields),
      //       requiredFields: JSON.parse(response.requiredFields),
      //       constraints: JSON.parse(response.constraints)
      //     };
      //   } catch (error) {
      //     console.error('Error getting entity metadata:', error);
      //     throw error;
      //   }
      // },

       _getEntityMetadataFromBackend: async function(interfaceID) {
        if (!interfaceID) {
          return null;
        }

        if (!this._metadataCache) {
          this._metadataCache = {};
        }
        if (this._metadataCache[interfaceID]) {
          return this._metadataCache[interfaceID];
        }

        const oModel = this.base.getExtensionAPI().getModel();
        
        try {
          const response = await this.base.getExtensionAPI().editFlow.invokeAction(
            'MonitorService.EntityContainer/getEntityMetadata',
            {
              model: oModel,
              skipParameterDialog: true,
              parameterValues: [
                {
                  name: 'interfaceId',
                  value: interfaceID,
                },
              ],
            },
          );

          const result =
            response && typeof response.getObject === 'function'
              ? response.getObject()
              : response;
          if (!result) {
            return null;
          }

          var parseJSON = function(value, fallback) {
            if (!value) {
              return fallback;
            }
            try {
              return JSON.parse(value);
            } catch (parseError) {
              console.error('Error parsing metadata JSON:', parseError);
              return fallback;
            }
          };

          const metadata = {
            entityName: result.entityName,
            fields: parseJSON(result.fields, {}),
            requiredFields: parseJSON(result.requiredFields, []),
            constraints: parseJSON(result.constraints, {}),
          };

          this._metadataCache[interfaceID] = metadata;
          return metadata;
        } catch (error) {
          console.error('Error getting entity metadata:', error);
          return null;
        }
      },

      _applyStringLengthConstraints: function(records, metadata) {
        if (!Array.isArray(records) || !metadata) {
          return;
        }

        const constraints = metadata.constraints || {};
        const fieldDefinitions = metadata.fields || {};

        records.forEach(record => {
          if (!record || typeof record !== 'object') {
            return;
          }

          Object.keys(record).forEach(fieldName => {
            const fieldConstraint = constraints[fieldName];
            const fieldDefinition = fieldDefinitions[fieldName];
            const maxLength = fieldConstraint?.maxLength || fieldDefinition?.length;
            const fieldType = (fieldDefinition?.type || fieldConstraint?.type || '').toString().toLowerCase();
            const value = record[fieldName];

            if (!maxLength || typeof value !== 'string') {
              return;
            }

            if (fieldType && !fieldType.includes('string')) {
              return;
            }

            if (value.length > maxLength) {
              record[fieldName] = value.substring(0, maxLength);
            }
          });
        });
      },

      // Show metadata validation errors
      _showMetadataValidationErrors: async function(validationErrors) {
        try {
          // Create or get the validation errors dialog
          this._MetadataValidationDialog ??= await this.loadFragment({
            id: 'metadataValidationDialog',
            name: 'monitor.ext.fragment.MetadataValidationDialog',
          });

          // Group errors by record index for better display
          const errorSummary = validationErrors.reduce((acc, error) => {
            if (!acc[error.recordIndex]) {
              acc[error.recordIndex] = [];
            }
            acc[error.recordIndex].push(error);
            return acc;
          }, {});

          // Create a model for the validation errors
          const oValidationModel = new sap.ui.model.json.JSONModel({
            errors: validationErrors,
            errorCount: validationErrors.length,
            recordCount: Object.keys(errorSummary).length
          });

          this._MetadataValidationDialog.setModel(oValidationModel, 'validation');

          // Open the dialog
          this._MetadataValidationDialog.open();
        } catch (err) {
          console.error("Error showing metadata validation errors dialog:", err);
          // Fallback to MessageBox
          const errorMessage = validationErrors.map(err => `Record ${err.recordIndex}: ${err.field} - ${err.message}`).join('\n');
          sap.m.MessageBox.error(errorMessage, {
            title: "Data Validation Errors",
            actions: [sap.m.MessageBox.Action.OK]
          });
        }
      },

      // Download error report
      onDownloadErrorReport: function() {
        const oValidationModel = this._MetadataValidationDialog.getModel('validation');
        const aErrors = oValidationModel.getProperty('/errors');
        
        // Create CSV content
        const csvHeader = 'Record Index,Field,Severity,Error Message,Value\n';
        const csvContent = aErrors.map(error => 
          `${error.recordIndex},"${error.field}","${error.severity}","${error.message}","${error.value || ''}"`
        ).join('\n');
        
        const fullCsv = csvHeader + csvContent;
        
        // Create and download file
        const blob = new Blob([fullCsv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `validation_errors_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },

      // Close validation dialog
      onCloseValidationDialog: function() {
        this._MetadataValidationDialog.close();
      },
    });
  },
);
