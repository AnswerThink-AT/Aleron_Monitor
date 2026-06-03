"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceTax = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_SupplierInvoiceTax" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
class SupplierInvoiceTax extends odata_v2_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SupplierInvoiceTax = SupplierInvoiceTax;
/**
 * Technical entity name for SupplierInvoiceTax.
 */
SupplierInvoiceTax._entityName = 'A_SupplierInvoiceTax';
/**
 * Default url path for the according service.
 */
SupplierInvoiceTax._defaultBasePath = '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
/**
 * All key fields of the SupplierInvoiceTax entity.
 */
SupplierInvoiceTax._keys = [
    'SupplierInvoice',
    'FiscalYear',
    'TaxCode',
    'SupplierInvoiceTaxCounter'
];
//# sourceMappingURL=SupplierInvoiceTax.js.map