"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcSeldPurgDocumentRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SuplrInvcSeldPurgDocument} entity.
 */
class SuplrInvcSeldPurgDocumentRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SuplrInvcSeldPurgDocument` entities.
     * @returns A request builder for creating requests to retrieve all `SuplrInvcSeldPurgDocument` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SuplrInvcSeldPurgDocument` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SuplrInvcSeldPurgDocument.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SuplrInvcSeldPurgDocument.fiscalYear}.
     * @param purchaseOrder Key property. See {@link SuplrInvcSeldPurgDocument.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link SuplrInvcSeldPurgDocument.purchaseOrderItem}.
     * @returns A request builder for creating requests to retrieve one `SuplrInvcSeldPurgDocument` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear, purchaseOrder, purchaseOrderItem) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear,
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem
        });
    }
}
exports.SuplrInvcSeldPurgDocumentRequestBuilder = SuplrInvcSeldPurgDocumentRequestBuilder;
//# sourceMappingURL=SuplrInvcSeldPurgDocumentRequestBuilder.js.map