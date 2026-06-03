"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceTaxRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SupplierInvoiceTax} entity.
 */
class SupplierInvoiceTaxRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SupplierInvoiceTax` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierInvoiceTax` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SupplierInvoiceTax` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SupplierInvoiceTax.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SupplierInvoiceTax.fiscalYear}.
     * @param taxCode Key property. See {@link SupplierInvoiceTax.taxCode}.
     * @param supplierInvoiceTaxCounter Key property. See {@link SupplierInvoiceTax.supplierInvoiceTaxCounter}.
     * @returns A request builder for creating requests to retrieve one `SupplierInvoiceTax` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear, taxCode, supplierInvoiceTaxCounter) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear,
            TaxCode: taxCode,
            SupplierInvoiceTaxCounter: supplierInvoiceTaxCounter
        });
    }
}
exports.SupplierInvoiceTaxRequestBuilder = SupplierInvoiceTaxRequestBuilder;
//# sourceMappingURL=SupplierInvoiceTaxRequestBuilder.js.map