"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcSeldInbDeliveryNoteRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SuplrInvcSeldInbDeliveryNote} entity.
 */
class SuplrInvcSeldInbDeliveryNoteRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SuplrInvcSeldInbDeliveryNote` entities.
     * @returns A request builder for creating requests to retrieve all `SuplrInvcSeldInbDeliveryNote` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SuplrInvcSeldInbDeliveryNote` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SuplrInvcSeldInbDeliveryNote.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SuplrInvcSeldInbDeliveryNote.fiscalYear}.
     * @param inboundDeliveryNote Key property. See {@link SuplrInvcSeldInbDeliveryNote.inboundDeliveryNote}.
     * @returns A request builder for creating requests to retrieve one `SuplrInvcSeldInbDeliveryNote` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear, inboundDeliveryNote) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear,
            InboundDeliveryNote: inboundDeliveryNote
        });
    }
}
exports.SuplrInvcSeldInbDeliveryNoteRequestBuilder = SuplrInvcSeldInbDeliveryNoteRequestBuilder;
//# sourceMappingURL=SuplrInvcSeldInbDeliveryNoteRequestBuilder.js.map