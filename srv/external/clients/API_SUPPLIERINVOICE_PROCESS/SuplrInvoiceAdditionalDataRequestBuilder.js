"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvoiceAdditionalDataRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SuplrInvoiceAdditionalData} entity.
 */
class SuplrInvoiceAdditionalDataRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SuplrInvoiceAdditionalData` entities.
     * @returns A request builder for creating requests to retrieve all `SuplrInvoiceAdditionalData` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SuplrInvoiceAdditionalData` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SuplrInvoiceAdditionalData.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SuplrInvoiceAdditionalData.fiscalYear}.
     * @returns A request builder for creating requests to retrieve one `SuplrInvoiceAdditionalData` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear
        });
    }
}
exports.SuplrInvoiceAdditionalDataRequestBuilder = SuplrInvoiceAdditionalDataRequestBuilder;
//# sourceMappingURL=SuplrInvoiceAdditionalDataRequestBuilder.js.map