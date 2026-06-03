"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceOdnRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SupplierInvoiceOdn} entity.
 */
class SupplierInvoiceOdnRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SupplierInvoiceOdn` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierInvoiceOdn` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SupplierInvoiceOdn` entity based on its keys.
     * @param afdfUniqueKeyUuid Key property. See {@link SupplierInvoiceOdn.afdfUniqueKeyUuid}.
     * @param supplierInvoice Key property. See {@link SupplierInvoiceOdn.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SupplierInvoiceOdn.fiscalYear}.
     * @returns A request builder for creating requests to retrieve one `SupplierInvoiceOdn` entity based on its keys.
     */
    getByKey(afdfUniqueKeyUuid, supplierInvoice, fiscalYear) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            AFDFUniqueKeyUUID: afdfUniqueKeyUuid,
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear
        });
    }
}
exports.SupplierInvoiceOdnRequestBuilder = SupplierInvoiceOdnRequestBuilder;
//# sourceMappingURL=SupplierInvoiceOdnRequestBuilder.js.map