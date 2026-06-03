"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yy1WorkforceCds = yy1WorkforceCds;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Yy1_Workforce_CdsApi_1 = require("./Yy1_Workforce_CdsApi");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function yy1WorkforceCds(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new Yy1WorkforceCds((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class Yy1WorkforceCds {
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
    get yy1_Workforce_CdsApi() {
        return this.initApi('yy1_Workforce_CdsApi', Yy1_Workforce_CdsApi_1.Yy1_Workforce_CdsApi);
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map