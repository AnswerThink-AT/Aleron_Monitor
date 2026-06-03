"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yy1Salesvcdata1Cds = yy1Salesvcdata1Cds;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Yy1_Salesvcdata_1Api_1 = require("./Yy1_Salesvcdata_1Api");
const operations_1 = require("./operations");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function yy1Salesvcdata1Cds(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new Yy1Salesvcdata1Cds((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class Yy1Salesvcdata1Cds {
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
    get yy1_Salesvcdata_1Api() {
        return this.initApi('yy1_Salesvcdata_1Api', Yy1_Salesvcdata_1Api_1.Yy1_Salesvcdata_1Api);
    }
    get operations() {
        return {
            yy1Salesvcdata1SapUpsert: (parameter) => (0, operations_1.yy1Salesvcdata1SapUpsert)(parameter, this.deSerializers)
        };
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map