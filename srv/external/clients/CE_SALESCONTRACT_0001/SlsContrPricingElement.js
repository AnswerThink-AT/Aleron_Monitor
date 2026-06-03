"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlsContrPricingElement = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SlsContrPricingElement" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
class SlsContrPricingElement extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SlsContrPricingElement = SlsContrPricingElement;
/**
 * Technical entity name for SlsContrPricingElement.
 */
SlsContrPricingElement._entityName = 'SlsContrPricingElement';
/**
 * Default url path for the according service.
 */
SlsContrPricingElement._defaultBasePath = '/';
/**
 * All key fields of the SlsContrPricingElement entity.
 */
SlsContrPricingElement._keys = [
    'SalesContract',
    'PricingProcedureStep',
    'PricingProcedureCounter'
];
//# sourceMappingURL=SlsContrPricingElement.js.map