"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderItem = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderItem" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderItem extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderItem = SalesOrderItem;
/**
 * Technical entity name for SalesOrderItem.
 */
SalesOrderItem._entityName = 'SalesOrderItem';
/**
 * Default url path for the according service.
 */
SalesOrderItem._defaultBasePath = '/';
/**
 * All key fields of the SalesOrderItem entity.
 */
SalesOrderItem._keys = ['SalesOrder', 'SalesOrderItem'];
//# sourceMappingURL=SalesOrderItem.js.map