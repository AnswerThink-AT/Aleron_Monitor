"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yy1BillingtypeCds = yy1BillingtypeCds;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Yy1_BillingtypeApi_1 = require("./Yy1_BillingtypeApi");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function yy1BillingtypeCds(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new Yy1BillingtypeCds((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class Yy1BillingtypeCds {
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
    get yy1_BillingtypeApi() {
        return this.initApi('yy1_BillingtypeApi', Yy1_BillingtypeApi_1.Yy1_BillingtypeApi);
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map