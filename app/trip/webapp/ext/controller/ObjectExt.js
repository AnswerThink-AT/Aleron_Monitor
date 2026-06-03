sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(MessageToast, MessageBox) {
    'use strict';

    return {
        edit: function() {
            MessageToast.show("Custom handler invoked.");
        },
        approve: function (oBindingContext) {
            const oTripContext = oBindingContext;
            if (!oTripContext) {
              MessageToast.show("No trip selected.");
              return;
            }
      
            const TripNumber = oTripContext.getObject().TripNumber;
      
            fetch("/odata/v4/Trip/approveTrip", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ TripNumbers: [TripNumber] })
            })
              .then(response => {
                if (!response.ok) throw new Error("You have already Approved");
                return response.json();
              })
              .then(data => {
                MessageBox.success(
                  data.message || "Trip Approved successfully", {
                    title: "Approval Success",
                    actions: [sap.m.MessageBox.Action.OK],
                    onClose: function () {
                      oTripContext.getModel().refresh();
                    }
                  }
                );
              })
              .catch(error => {
                console.error("approveTrip error:", error);
                MessageToast.show(error.message || "Failed to approve trip");
              });
          }
    };
});
