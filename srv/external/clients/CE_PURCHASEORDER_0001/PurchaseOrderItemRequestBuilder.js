"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderItemRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrderItem_1 = require("./PurchaseOrderItem");
/**
 * Request builder class for operations supported on the {@link PurchaseOrderItem} entity.
 */
class PurchaseOrderItemRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrderItem` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrderItem` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrderItem` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrderItem`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrderItem` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurchaseOrderItem.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PurchaseOrderItem.purchaseOrderItem}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrderItem` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrderItem`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrderItem`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurchaseOrderItem_1.PurchaseOrderItem
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem
            });
    }
}
exports.PurchaseOrderItemRequestBuilder = PurchaseOrderItemRequestBuilder;
//# sourceMappingURL=PurchaseOrderItemRequestBuilder.js.map