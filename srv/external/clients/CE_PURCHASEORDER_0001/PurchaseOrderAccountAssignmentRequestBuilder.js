"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderAccountAssignmentRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrderAccountAssignment_1 = require("./PurchaseOrderAccountAssignment");
/**
 * Request builder class for operations supported on the {@link PurchaseOrderAccountAssignment} entity.
 */
class PurchaseOrderAccountAssignmentRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrderAccountAssignment` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrderAccountAssignment` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrderAccountAssignment` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrderAccountAssignment`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrderAccountAssignment` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurchaseOrderAccountAssignment.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PurchaseOrderAccountAssignment.purchaseOrderItem}.
     * @param accountAssignmentNumber Key property. See {@link PurchaseOrderAccountAssignment.accountAssignmentNumber}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrderAccountAssignment` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem, accountAssignmentNumber) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem,
            AccountAssignmentNumber: accountAssignmentNumber
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrderAccountAssignment`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrderAccountAssignment`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem, accountAssignmentNumber) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurchaseOrderAccountAssignment_1.PurchaseOrderAccountAssignment
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem,
                AccountAssignmentNumber: accountAssignmentNumber
            });
    }
}
exports.PurchaseOrderAccountAssignmentRequestBuilder = PurchaseOrderAccountAssignmentRequestBuilder;
//# sourceMappingURL=PurchaseOrderAccountAssignmentRequestBuilder.js.map