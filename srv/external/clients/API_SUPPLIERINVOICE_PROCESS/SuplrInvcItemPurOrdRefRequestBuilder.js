"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcItemPurOrdRefRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SuplrInvcItemPurOrdRef} entity.
 */
class SuplrInvcItemPurOrdRefRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SuplrInvcItemPurOrdRef` entities.
     * @returns A request builder for creating requests to retrieve all `SuplrInvcItemPurOrdRef` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SuplrInvcItemPurOrdRef` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SuplrInvcItemPurOrdRef.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SuplrInvcItemPurOrdRef.fiscalYear}.
     * @param supplierInvoiceItem Key property. See {@link SuplrInvcItemPurOrdRef.supplierInvoiceItem}.
     * @returns A request builder for creating requests to retrieve one `SuplrInvcItemPurOrdRef` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear, supplierInvoiceItem) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear,
            SupplierInvoiceItem: supplierInvoiceItem
        });
    }
}
exports.SuplrInvcItemPurOrdRefRequestBuilder = SuplrInvcItemPurOrdRefRequestBuilder;
//# sourceMappingURL=SuplrInvcItemPurOrdRefRequestBuilder.js.map