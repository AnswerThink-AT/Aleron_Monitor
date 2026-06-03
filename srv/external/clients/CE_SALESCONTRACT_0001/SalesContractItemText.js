"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesContractItemText = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesContractItemText" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
class SalesContractItemText extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesContractItemText = SalesContractItemText;
/**
 * Technical entity name for SalesContractItemText.
 */
SalesContractItemText._entityName = 'SalesContractItemText';
/**
 * Default url path for the according service.
 */
SalesContractItemText._defaultBasePath = '/';
/**
 * All key fields of the SalesContractItemText entity.
 */
SalesContractItemText._keys = [
    'SalesContract',
    'SalesContractItem',
    'Language',
    'LongTextID'
];
//# sourceMappingURL=SalesContractItemText.js.map