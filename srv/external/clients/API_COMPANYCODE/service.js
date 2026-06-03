"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCompanycode = apiCompanycode;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CompanyCodeApi_1 = require("./CompanyCodeApi");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function apiCompanycode(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new ApiCompanycode((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class ApiCompanycode {
    constructor(deSerializers) {
        this.apis = {};
        this.deSerializers = deSerializers;
    }
    initApi(key, entityApi) {
        if (!this.apis[key]) {
            this.apis[key] = entityApi._privateFactory(this.deSerializers);
        }
        return this.apis[key];
    }
    get companyCodeApi() {
        return this.initApi('companyCodeApi', CompanyCodeApi_1.CompanyCodeApi);
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map