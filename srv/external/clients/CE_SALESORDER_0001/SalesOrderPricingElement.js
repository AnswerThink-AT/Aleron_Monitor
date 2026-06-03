"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderPricingElement = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderPricingElement" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderPricingElement extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderPricingElement = SalesOrderPricingElement;
/**
 * Technical entity name for SalesOrderPricingElement.
 */
SalesOrderPricingElement._entityName = 'SalesOrderPricingElement';
/**
 * Default url path for the according service.
 */
SalesOrderPricingElement._defaultBasePath = '/';
/**
 * All key fields of the SalesOrderPricingElement entity.
 */
SalesOrderPricingElement._keys = [
    'SalesOrder',
    'PricingProcedureStep',
    'PricingProcedureCounter'
];
//# sourceMappingURL=SalesOrderPricingElement.js.map