sap.ui.define([], function () {
    "use strict";
	return {
        getBaseURL: function (that) {
            var appId = that.getOwnerComponent().getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = jQuery.sap.getModulePath(appPath);
            return appModulePath;
        },

    }
})