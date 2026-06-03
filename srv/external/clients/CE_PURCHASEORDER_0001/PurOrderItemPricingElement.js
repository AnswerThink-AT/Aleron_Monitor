"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurOrderItemPricingElement = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "PurOrderItemPricingElement" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PurOrderItemPricingElement extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PurOrderItemPricingElement = PurOrderItemPricingElement;
/**
 * Technical entity name for PurOrderItemPricingElement.
 */
PurOrderItemPricingElement._entityName = 'PurOrderItemPricingElement';
/**
 * Default url path for the according service.
 */
PurOrderItemPricingElement._defaultBasePath = '/';
/**
 * All key fields of the PurOrderItemPricingElement entity.
 */
PurOrderItemPricingElement._keys = [
    'PurchaseOrder',
    'PurchaseOrderItem',
    'PricingDocument',
    'PricingDocumentItem',
    'PricingProcedureStep',
    'PricingProcedureCounter'
];
//# sourceMappingURL=PurOrderItemPricingElement.js.map