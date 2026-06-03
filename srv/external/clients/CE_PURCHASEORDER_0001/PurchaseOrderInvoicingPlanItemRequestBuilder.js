"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderInvoicingPlanItemRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrderInvoicingPlanItem_1 = require("./PurchaseOrderInvoicingPlanItem");
/**
 * Request builder class for operations supported on the {@link PurchaseOrderInvoicingPlanItem} entity.
 */
class PurchaseOrderInvoicingPlanItemRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrderInvoicingPlanItem` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrderInvoicingPlanItem` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrderInvoicingPlanItem` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrderInvoicingPlanItem`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrderInvoicingPlanItem` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurchaseOrderInvoicingPlanItem.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PurchaseOrderInvoicingPlanItem.purchaseOrderItem}.
     * @param invoicingPlanItem Key property. See {@link PurchaseOrderInvoicingPlanItem.invoicingPlanItem}.
     * @param invoicingPlan Key property. See {@link PurchaseOrderInvoicingPlanItem.invoicingPlan}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrderInvoicingPlanItem` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem, invoicingPlanItem, invoicingPlan) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem,
            InvoicingPlanItem: invoicingPlanItem,
            InvoicingPlan: invoicingPlan
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrderInvoicingPlanItem`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrderInvoicingPlanItem`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem, invoicingPlanItem, invoicingPlan) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurchaseOrderInvoicingPlanItem_1.PurchaseOrderInvoicingPlanItem
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem,
                InvoicingPlanItem: invoicingPlanItem,
                InvoicingPlan: invoicingPlan
            });
    }
}
exports.PurchaseOrderInvoicingPlanItemRequestBuilder = PurchaseOrderInvoicingPlanItemRequestBuilder;
//# sourceMappingURL=PurchaseOrderInvoicingPlanItemRequestBuilder.js.map