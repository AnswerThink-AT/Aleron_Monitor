"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesContractText = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesContractText" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
class SalesContractText extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesContractText = SalesContractText;
/**
 * Technical entity name for SalesContractText.
 */
SalesContractText._entityName = 'SalesContractText';
/**
 * Default url path for the according service.
 */
SalesContractText._defaultBasePath = '/';
/**
 * All key fields of the SalesContractText entity.
 */
SalesContractText._keys = ['SalesContract', 'Language', 'LongTextID'];
//# sourceMappingURL=SalesContractText.js.map