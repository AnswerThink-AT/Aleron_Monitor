"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceItemAsset = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_SupplierInvoiceItemAsset" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
class SupplierInvoiceItemAsset extends odata_v2_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SupplierInvoiceItemAsset = SupplierInvoiceItemAsset;
/**
 * Technical entity name for SupplierInvoiceItemAsset.
 */
SupplierInvoiceItemAsset._entityName = 'A_SupplierInvoiceItemAsset';
/**
 * Default url path for the according service.
 */
SupplierInvoiceItemAsset._defaultBasePath = '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
/**
 * All key fields of the SupplierInvoiceItemAsset entity.
 */
SupplierInvoiceItemAsset._keys = ['SupplierInvoice', 'FiscalYear', 'SupplierInvoiceItem'];
//# sourceMappingURL=SupplierInvoiceItemAsset.js.map