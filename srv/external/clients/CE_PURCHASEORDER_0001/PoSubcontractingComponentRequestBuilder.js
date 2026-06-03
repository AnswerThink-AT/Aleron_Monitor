"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoSubcontractingComponentRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PoSubcontractingComponent_1 = require("./PoSubcontractingComponent");
/**
 * Request builder class for operations supported on the {@link PoSubcontractingComponent} entity.
 */
class PoSubcontractingComponentRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PoSubcontractingComponent` entities.
     * @returns A request builder for creating requests to retrieve all `PoSubcontractingComponent` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PoSubcontractingComponent` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PoSubcontractingComponent`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PoSubcontractingComponent` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PoSubcontractingComponent.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PoSubcontractingComponent.purchaseOrderItem}.
     * @param scheduleLine Key property. See {@link PoSubcontractingComponent.scheduleLine}.
     * @param reservationItem Key property. See {@link PoSubcontractingComponent.reservationItem}.
     * @param recordType Key property. See {@link PoSubcontractingComponent.recordType}.
     * @returns A request builder for creating requests to retrieve one `PoSubcontractingComponent` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem, scheduleLine, reservationItem, recordType) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem,
            ScheduleLine: scheduleLine,
            ReservationItem: reservationItem,
            RecordType: recordType
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PoSubcontractingComponent`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PoSubcontractingComponent`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem, scheduleLine, reservationItem, recordType) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PoSubcontractingComponent_1.PoSubcontractingComponent
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem,
                ScheduleLine: scheduleLine,
                ReservationItem: reservationItem,
                RecordType: recordType
            });
    }
}
exports.PoSubcontractingComponentRequestBuilder = PoSubcontractingComponentRequestBuilder;
//# sourceMappingURL=PoSubcontractingComponentRequestBuilder.js.map