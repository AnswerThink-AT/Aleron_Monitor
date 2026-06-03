"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderScheduleLineRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrderScheduleLine_1 = require("./PurchaseOrderScheduleLine");
/**
 * Request builder class for operations supported on the {@link PurchaseOrderScheduleLine} entity.
 */
class PurchaseOrderScheduleLineRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrderScheduleLine` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrderScheduleLine` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrderScheduleLine` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrderScheduleLine`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrderScheduleLine` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurchaseOrderScheduleLine.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PurchaseOrderScheduleLine.purchaseOrderItem}.
     * @param scheduleLine Key property. See {@link PurchaseOrderScheduleLine.scheduleLine}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrderScheduleLine` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem, scheduleLine) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem,
            ScheduleLine: scheduleLine
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrderScheduleLine`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrderScheduleLine`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem, scheduleLine) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurchaseOrderScheduleLine_1.PurchaseOrderScheduleLine
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem,
                ScheduleLine: scheduleLine
            });
    }
}
exports.PurchaseOrderScheduleLineRequestBuilder = PurchaseOrderScheduleLineRequestBuilder;
//# sourceMappingURL=PurchaseOrderScheduleLineRequestBuilder.js.map