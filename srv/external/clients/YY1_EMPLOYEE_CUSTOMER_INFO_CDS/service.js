"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yy1EmployeeCustomerInfoCds = yy1EmployeeCustomerInfoCds;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Yy1_Employee_Customer_InfoApi_1 = require("./Yy1_Employee_Customer_InfoApi");
const operations_1 = require("./operations");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function yy1EmployeeCustomerInfoCds(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new Yy1EmployeeCustomerInfoCds((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class Yy1EmployeeCustomerInfoCds {
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
    get yy1_Employee_Customer_InfoApi() {
        return this.initApi('yy1_Employee_Customer_InfoApi', Yy1_Employee_Customer_InfoApi_1.Yy1_Employee_Customer_InfoApi);
    }
    get operations() {
        return {
            yy1EmployeeCustomerInfoSapUpsert: (parameter) => (0, operations_1.yy1EmployeeCustomerInfoSapUpsert)(parameter, this.deSerializers)
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