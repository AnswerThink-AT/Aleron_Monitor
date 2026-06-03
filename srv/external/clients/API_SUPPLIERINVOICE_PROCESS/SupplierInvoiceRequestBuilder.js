"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const SupplierInvoice_1 = require("./SupplierInvoice");
/**
 * Request builder class for operations supported on the {@link SupplierInvoice} entity.
 */
class SupplierInvoiceRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SupplierInvoice` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierInvoice` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SupplierInvoice` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SupplierInvoice`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SupplierInvoice` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SupplierInvoice.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SupplierInvoice.fiscalYear}.
     * @returns A request builder for creating requests to retrieve one `SupplierInvoice` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear
        });
    }
    delete(supplierInvoiceOrEntity, fiscalYear) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, supplierInvoiceOrEntity instanceof SupplierInvoice_1.SupplierInvoice
            ? supplierInvoiceOrEntity
            : {
                SupplierInvoice: supplierInvoiceOrEntity,
                FiscalYear: fiscalYear
            });
    }
}
exports.SupplierInvoiceRequestBuilder = SupplierInvoiceRequestBuilder;
//# sourceMappingURL=SupplierInvoiceRequestBuilder.js.map