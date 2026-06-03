"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderText = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderText" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderText extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderText = SalesOrderText;
/**
 * Technical entity name for SalesOrderText.
 */
SalesOrderText._entityName = 'SalesOrderText';
/**
 * Default url path for the according service.
 */
SalesOrderText._defaultBasePath = '/';
/**
 * All key fields of the SalesOrderText entity.
 */
SalesOrderText._keys = ['SalesOrder', 'Language', 'LongTextID'];
//# sourceMappingURL=SalesOrderText.js.map