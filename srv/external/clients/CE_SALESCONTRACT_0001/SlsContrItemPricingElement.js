"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlsContrItemPricingElement = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SlsContrItemPricingElement" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
class SlsContrItemPricingElement extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SlsContrItemPricingElement = SlsContrItemPricingElement;
/**
 * Technical entity name for SlsContrItemPricingElement.
 */
SlsContrItemPricingElement._entityName = 'SlsContrItemPricingElement';
/**
 * Default url path for the according service.
 */
SlsContrItemPricingElement._defaultBasePath = '/';
/**
 * All key fields of the SlsContrItemPricingElement entity.
 */
SlsContrItemPricingElement._keys = [
    'SalesContract',
    'SalesContractItem',
    'PricingProcedureStep',
    'PricingProcedureCounter'
];
//# sourceMappingURL=SlsContrItemPricingElement.js.map