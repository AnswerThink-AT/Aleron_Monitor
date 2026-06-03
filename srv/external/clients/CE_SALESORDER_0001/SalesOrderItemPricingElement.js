"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderItemPricingElement = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderItemPricingElement" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderItemPricingElement extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderItemPricingElement = SalesOrderItemPricingElement;
/**
 * Technical entity name for SalesOrderItemPricingElement.
 */
SalesOrderItemPricingElement._entityName = 'SalesOrderItemPricingElement';
/**
 * Default url path for the according service.
 */
SalesOrderItemPricingElement._defaultBasePath = '/';
/**
 * All key fields of the SalesOrderItemPricingElement entity.
 */
SalesOrderItemPricingElement._keys = [
    'SalesOrder',
    'SalesOrderItem',
    'PricingProcedureStep',
    'PricingProcedureCounter'
];
//# sourceMappingURL=SalesOrderItemPricingElement.js.map