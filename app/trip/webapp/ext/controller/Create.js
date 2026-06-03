sap.ui.define([
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/core/Fragment",
  "sap/ui/model/json/JSONModel"
], function (MessageToast, MessageBox, Fragment, JSONModel) {
  "use strict";

  return {

    create: function () {
      const oView = this.getRouting().getView();
      const oCreateModel = new JSONModel({
        Personnel:   "",
        StartOfTrip: "",
        EndOfTrip:   ""
      });
      oView.setModel(oCreateModel, "createModel");

      if (!this._pDialog) {
        this._pDialog = Fragment.load({
          id:         "frag_createTripDialog1",
          name:       "trip.ext.fragment.Create",
          controller: this
        });
      }
      this._pDialog.then(oDialog => {
        this._oDialog = oDialog;
        oView.addDependent(oDialog);
        oDialog.open();
      });
    },

    onCancel: function () {
      this._oDialog && this._oDialog.close();
    },

    onSubmit: function () {
      const sFrag = "frag_createTripDialog1";
      const sPersonnel = Fragment.byId(sFrag, "frag__IDGenInput1").getValue();
      const oStartDate = Fragment.byId(sFrag, "frag__IDGenDatePicker").getDateValue();
      const oEndDate   = Fragment.byId(sFrag, "frag__IDGenDatePicker1").getDateValue();

      if (!sPersonnel || isNaN(sPersonnel) || !oStartDate || !oEndDate) {
        return MessageToast.show("Enter valid Personnel & both dates.");
      }

      const fmt = d => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const D = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${D}`;
      };

      const mPayload = {
        Personnel:   +sPersonnel,
        StartOfTrip: fmt(oStartDate),
        EndOfTrip:   fmt(oEndDate)
      };

      fetch("/odata/v4/trip/createFullTrip", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(mPayload)
      })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: res.statusText }));
          throw err;
        }
        return res.json().catch(() => null);
      })
      .then(data => {
        this._oDialog.close();
      
        MessageBox.success("Trip created successfully!", {
          title: "Success",
          actions: [sap.m.MessageBox.Action.OK],
          onClose: () => {
            const oView  = this.getRouting().getView();
            const oTable = oView.byId("tripTable");
            if (oTable) {
              const oItems = oTable.getBinding("items");
              if (oItems) {
                oItems.refresh();
              } else {
                const oRows = oTable.getBinding("rows");
                oRows && oRows.refresh();
              }
            }
          }
        });
      })      
      .catch(err => {
        MessageToast.show("Error creating Trip: " + (err.message || err.code || "Unknown"));
        this._oDialog.close();
      });
    },
    delete: function () {
      const oView = this.getRouting().getView();
      const oTable = oView.byId("fe::table::Trip::LineItem");
    
      if (!oTable) {
        return MessageToast.show("Trip table not found.");
      }
    
      const aSelectedContexts = oTable.getSelectedContexts();
      if (!aSelectedContexts.length) {
        return MessageToast.show("Select at least one trip to delete.");
      }
      const aTripNumbers = aSelectedContexts.map(oCtx => oCtx.getObject().TripNumber);

      fetch("/odata/v4/trip/deleteFullTrip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TripNumbers: aTripNumbers })  // ← notice 'TripNumbers'
      })
        .then(async res => {
          if (!res.ok) {
            const err = await res.json().catch(() => ({ message: res.statusText }));
            throw err;
          }
          return res.json();
        })
        .then(() => {
          MessageBox.success("Trip Deleted successfully!", {
            title: "Success",
            actions: [sap.m.MessageBox.Action.OK],
            onClose: () => {
              const oBinding = oTable.getBinding("items");
              oBinding && oBinding.refresh();
            }
          });
        })
        .catch(err => {
          MessageToast.show("Error deleting Trip(s): " + (err.message || "Unknown error."));
        });
    },
    cancel: function() {
      try {
        const oView = this.getRouting().getView();
        const oTable = oView.byId("fe::table::Trip::LineItem");
    
        if (!oTable) {
          MessageToast.show("Trip table not found");
          return;
        }
    
        const aSelectedContexts = oTable.getSelectedContexts();
        if (!aSelectedContexts.length) {
          MessageToast.show("Please select at least one trip to cancel");
          return;
        }
    
        const aTripsAnalysis = aSelectedContexts.map(oCtx => {
          const oData = oCtx.getObject();
          return {
            context: oCtx,
            path: oCtx.getPath(),
            isDraft: oData.IsActiveEntity === false,
            isAlreadyCancelled: oData.TripStatus_code === 10
          };
        });
    
        const aEligibleTrips = aTripsAnalysis.filter(
          trip => !trip.isDraft && !trip.isAlreadyCancelled
        );
    
        if (aEligibleTrips.length === 0) {
          const hasDrafts = aTripsAnalysis.some(trip => trip.isDraft);
          const allCancelled = aTripsAnalysis.every(trip => trip.isAlreadyCancelled);
    
          if (hasDrafts) {
            MessageToast.show("Please save draft trips before cancelling");
          } else if (allCancelled) {
            MessageToast.show("Selected trips are already cancelled");
          } else {
            MessageToast.show("No eligible trips found to cancel");
          }
          return;
        }
    
        const aTripNumbers = aEligibleTrips.map(trip => trip.context.getObject().TripNumber);
        fetch("/odata/v4/Trip/cancelTrip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ TripNumbers: aTripNumbers })
        })
        .then(response => {
          if (!response.ok) throw new Error("You have already Cancelled");
          return response.json();
        })
        .then(data => {
          MessageBox.success(
            data.message || "Trip Cancelled Successfully", {
              title: "Success",
              actions: [sap.m.MessageBox.Action.OK],
              onClose: function () {
                const oBinding = oTable.getBinding("items");
                oBinding && oBinding.refresh();
              }
            }
          );
        })
        .catch(error => {
          console.error("CancelTrip error:", error);
          MessageToast.show(error.message || "Failed to cancel trip");
        });
    
      } catch (error) {
        console.error("Cancel error:", error);
        MessageToast.show("An unexpected error occurred");
      }
    }
  };
});
