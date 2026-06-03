sap.ui.define(
    ["sap/fe/core/AppComponent", "sap/m/MessageToast"],
    function (Component, MessageToast) {
        "use strict";

        return Component.extend("configuration.Component", {
            metadata: {
                manifest: "json"
            },
            init: function () {
                Component.prototype.init.apply(this, arguments);
                const origShow = MessageToast.show;
                MessageToast.show = function (sMessage, mOptions) {
                    switch (sMessage) {
                        case "Object created":
                            sMessage = "File created";
                            break;
                        case "Object saved":
                            sMessage = "File saved";
                            break;
                        case "Object deleted.":
                            sMessage = "File deleted.";
                            break;
                    }
                    return origShow.call(this, sMessage, mOptions);
                };
            }
        });
    }
);