"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceOdn = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_SupplierInvoiceODN" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
class SupplierInvoiceOdn extends odata_v2_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SupplierInvoiceOdn = SupplierInvoiceOdn;
/**
 * Technical entity name for SupplierInvoiceOdn.
 */
SupplierInvoiceOdn._entityName = 'A_SupplierInvoiceODN';
/**
 * Default url path for the according service.
 */
SupplierInvoiceOdn._defaultBasePath = '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
/**
 * All key fields of the SupplierInvoiceOdn entity.
 */
SupplierInvoiceOdn._keys = ['AFDFUniqueKeyUUID', 'SupplierInvoice', 'FiscalYear'];
//# sourceMappingURL=SupplierInvoiceOdn.js.map