"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcItemAcctAssgmt = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_SuplrInvcItemAcctAssgmt" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
class SuplrInvcItemAcctAssgmt extends odata_v2_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SuplrInvcItemAcctAssgmt = SuplrInvcItemAcctAssgmt;
/**
 * Technical entity name for SuplrInvcItemAcctAssgmt.
 */
SuplrInvcItemAcctAssgmt._entityName = 'A_SuplrInvcItemAcctAssgmt';
/**
 * Default url path for the according service.
 */
SuplrInvcItemAcctAssgmt._defaultBasePath = '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
/**
 * All key fields of the SuplrInvcItemAcctAssgmt entity.
 */
SuplrInvcItemAcctAssgmt._keys = [
    'SupplierInvoice',
    'FiscalYear',
    'SupplierInvoiceItem',
    'OrdinalNumber'
];
//# sourceMappingURL=SuplrInvcItemAcctAssgmt.js.map