"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurOrderItemDeliveryAddressRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurOrderItemDeliveryAddress_1 = require("./PurOrderItemDeliveryAddress");
/**
 * Request builder class for operations supported on the {@link PurOrderItemDeliveryAddress} entity.
 */
class PurOrderItemDeliveryAddressRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurOrderItemDeliveryAddress` entities.
     * @returns A request builder for creating requests to retrieve all `PurOrderItemDeliveryAddress` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurOrderItemDeliveryAddress` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurOrderItemDeliveryAddress`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurOrderItemDeliveryAddress` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurOrderItemDeliveryAddress.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PurOrderItemDeliveryAddress.purchaseOrderItem}.
     * @param deliveryAddressId Key property. See {@link PurOrderItemDeliveryAddress.deliveryAddressId}.
     * @returns A request builder for creating requests to retrieve one `PurOrderItemDeliveryAddress` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem, deliveryAddressId) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem,
            DeliveryAddressID: deliveryAddressId
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurOrderItemDeliveryAddress`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurOrderItemDeliveryAddress`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem, deliveryAddressId) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurOrderItemDeliveryAddress_1.PurOrderItemDeliveryAddress
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem,
                DeliveryAddressID: deliveryAddressId
            });
    }
}
exports.PurOrderItemDeliveryAddressRequestBuilder = PurOrderItemDeliveryAddressRequestBuilder;
//# sourceMappingURL=PurOrderItemDeliveryAddressRequestBuilder.js.map