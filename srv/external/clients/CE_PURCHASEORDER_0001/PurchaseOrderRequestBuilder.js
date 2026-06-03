"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrder_1 = require("./PurchaseOrder");
/**
 * Request builder class for operations supported on the {@link PurchaseOrder} entity.
 */
class PurchaseOrderRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrder` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrder` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrder` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrder`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrder` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurchaseOrder.purchaseOrder}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrder` entity based on its keys.
     */
    getByKey(purchaseOrder) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrder`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrder`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurchaseOrder_1.PurchaseOrder
            ? purchaseOrderOrEntity
            : { PurchaseOrder: purchaseOrderOrEntity });
    }
}
exports.PurchaseOrderRequestBuilder = PurchaseOrderRequestBuilder;
//# sourceMappingURL=PurchaseOrderRequestBuilder.js.map