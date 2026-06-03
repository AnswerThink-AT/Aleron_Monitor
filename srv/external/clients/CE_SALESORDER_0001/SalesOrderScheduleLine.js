"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderScheduleLine = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderScheduleLine" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderScheduleLine extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderScheduleLine = SalesOrderScheduleLine;
/**
 * Technical entity name for SalesOrderScheduleLine.
 */
SalesOrderScheduleLine._entityName = 'SalesOrderScheduleLine';
/**
 * Default url path for the according service.
 */
SalesOrderScheduleLine._defaultBasePath = '/';
/**
 * All key fields of the SalesOrderScheduleLine entity.
 */
SalesOrderScheduleLine._keys = ['SalesOrder', 'SalesOrderItem', 'ScheduleLine'];
//# sourceMappingURL=SalesOrderScheduleLine.js.map