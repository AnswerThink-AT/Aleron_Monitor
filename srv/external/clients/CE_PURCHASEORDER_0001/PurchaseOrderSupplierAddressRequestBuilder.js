"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderSupplierAddressRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrderSupplierAddress_1 = require("./PurchaseOrderSupplierAddress");
/**
 * Request builder class for operations supported on the {@link PurchaseOrderSupplierAddress} entity.
 */
class PurchaseOrderSupplierAddressRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrderSupplierAddress` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrderSupplierAddress` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrderSupplierAddress` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrderSupplierAddress`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrderSupplierAddress` entity based on its keys.
     * @param supplierAddressId Key property. See {@link PurchaseOrderSupplierAddress.supplierAddressId}.
     * @param purchaseOrder Key property. See {@link PurchaseOrderSupplierAddress.purchaseOrder}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrderSupplierAddress` entity based on its keys.
     */
    getByKey(supplierAddressId, purchaseOrder) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierAddressID: supplierAddressId,
            PurchaseOrder: purchaseOrder
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrderSupplierAddress`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrderSupplierAddress`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(supplierAddressIdOrEntity, purchaseOrder) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, supplierAddressIdOrEntity instanceof PurchaseOrderSupplierAddress_1.PurchaseOrderSupplierAddress
            ? supplierAddressIdOrEntity
            : {
                SupplierAddressID: supplierAddressIdOrEntity,
                PurchaseOrder: purchaseOrder
            });
    }
}
exports.PurchaseOrderSupplierAddressRequestBuilder = PurchaseOrderSupplierAddressRequestBuilder;
//# sourceMappingURL=PurchaseOrderSupplierAddressRequestBuilder.js.map