sap.ui.define(
  ["sap/fe/core/AppComponent", "sap/m/MessageToast"],
  function (Component, MessageToast) {
    "use strict";

    return Component.extend("monitor.Component", {
      metadata: {
        manifest: "json"
      },

      init: function () {
        Component.prototype.init.apply(this, arguments);

        const origShow = MessageToast.show;
        MessageToast.show = function (sMessage, mOptions) {
          if (sMessage === "Object created") {
            sMessage = "File created";
          } else if (sMessage === "Object saved") {
            sMessage = "File saved";
          } else if (sMessage === "Object deleted.") {
            sMessage = "File deleted.";
          }
          return origShow.call(this, sMessage, mOptions);
        };
      }
    });
  }
);