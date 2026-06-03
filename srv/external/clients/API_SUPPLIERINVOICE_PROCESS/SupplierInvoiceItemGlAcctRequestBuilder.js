"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceItemGlAcctRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SupplierInvoiceItemGlAcct} entity.
 */
class SupplierInvoiceItemGlAcctRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SupplierInvoiceItemGlAcct` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierInvoiceItemGlAcct` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SupplierInvoiceItemGlAcct` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SupplierInvoiceItemGlAcct.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SupplierInvoiceItemGlAcct.fiscalYear}.
     * @param supplierInvoiceItem Key property. See {@link SupplierInvoiceItemGlAcct.supplierInvoiceItem}.
     * @returns A request builder for creating requests to retrieve one `SupplierInvoiceItemGlAcct` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear, supplierInvoiceItem) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear,
            SupplierInvoiceItem: supplierInvoiceItem
        });
    }
}
exports.SupplierInvoiceItemGlAcctRequestBuilder = SupplierInvoiceItemGlAcctRequestBuilder;
//# sourceMappingURL=SupplierInvoiceItemGlAcctRequestBuilder.js.map