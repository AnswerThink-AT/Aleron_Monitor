"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderInvoicingPlanRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrderInvoicingPlan_1 = require("./PurchaseOrderInvoicingPlan");
/**
 * Request builder class for operations supported on the {@link PurchaseOrderInvoicingPlan} entity.
 */
class PurchaseOrderInvoicingPlanRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrderInvoicingPlan` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrderInvoicingPlan` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrderInvoicingPlan` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrderInvoicingPlan`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrderInvoicingPlan` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurchaseOrderInvoicingPlan.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PurchaseOrderInvoicingPlan.purchaseOrderItem}.
     * @param invoicingPlan Key property. See {@link PurchaseOrderInvoicingPlan.invoicingPlan}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrderInvoicingPlan` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem, invoicingPlan) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem,
            InvoicingPlan: invoicingPlan
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrderInvoicingPlan`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrderInvoicingPlan`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem, invoicingPlan) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurchaseOrderInvoicingPlan_1.PurchaseOrderInvoicingPlan
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem,
                InvoicingPlan: invoicingPlan
            });
    }
}
exports.PurchaseOrderInvoicingPlanRequestBuilder = PurchaseOrderInvoicingPlanRequestBuilder;
//# sourceMappingURL=PurchaseOrderInvoicingPlanRequestBuilder.js.map