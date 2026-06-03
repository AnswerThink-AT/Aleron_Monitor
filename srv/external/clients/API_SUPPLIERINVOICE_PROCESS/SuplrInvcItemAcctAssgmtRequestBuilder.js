"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcItemAcctAssgmtRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SuplrInvcItemAcctAssgmt} entity.
 */
class SuplrInvcItemAcctAssgmtRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SuplrInvcItemAcctAssgmt` entities.
     * @returns A request builder for creating requests to retrieve all `SuplrInvcItemAcctAssgmt` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SuplrInvcItemAcctAssgmt` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SuplrInvcItemAcctAssgmt.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SuplrInvcItemAcctAssgmt.fiscalYear}.
     * @param supplierInvoiceItem Key property. See {@link SuplrInvcItemAcctAssgmt.supplierInvoiceItem}.
     * @param ordinalNumber Key property. See {@link SuplrInvcItemAcctAssgmt.ordinalNumber}.
     * @returns A request builder for creating requests to retrieve one `SuplrInvcItemAcctAssgmt` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear, supplierInvoiceItem, ordinalNumber) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear,
            SupplierInvoiceItem: supplierInvoiceItem,
            OrdinalNumber: ordinalNumber
        });
    }
}
exports.SuplrInvcItemAcctAssgmtRequestBuilder = SuplrInvcItemAcctAssgmtRequestBuilder;
//# sourceMappingURL=SuplrInvcItemAcctAssgmtRequestBuilder.js.map