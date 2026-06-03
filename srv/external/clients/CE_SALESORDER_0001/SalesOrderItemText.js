"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderItemText = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderItemText" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderItemText extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderItemText = SalesOrderItemText;
/**
 * Technical entity name for SalesOrderItemText.
 */
SalesOrderItemText._entityName = 'SalesOrderItemText';
/**
 * Default url path for the according service.
 */
SalesOrderItemText._defaultBasePath = '/';
/**
 * All key fields of the SalesOrderItemText entity.
 */
SalesOrderItemText._keys = ['SalesOrder', 'SalesOrderItem', 'Language', 'LongTextID'];
//# sourceMappingURL=SalesOrderItemText.js.map