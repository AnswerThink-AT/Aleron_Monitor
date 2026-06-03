"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurOrderItemPricingElementRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurOrderItemPricingElement_1 = require("./PurOrderItemPricingElement");
/**
 * Request builder class for operations supported on the {@link PurOrderItemPricingElement} entity.
 */
class PurOrderItemPricingElementRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurOrderItemPricingElement` entities.
     * @returns A request builder for creating requests to retrieve all `PurOrderItemPricingElement` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurOrderItemPricingElement` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurOrderItemPricingElement`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurOrderItemPricingElement` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurOrderItemPricingElement.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PurOrderItemPricingElement.purchaseOrderItem}.
     * @param pricingDocument Key property. See {@link PurOrderItemPricingElement.pricingDocument}.
     * @param pricingDocumentItem Key property. See {@link PurOrderItemPricingElement.pricingDocumentItem}.
     * @param pricingProcedureStep Key property. See {@link PurOrderItemPricingElement.pricingProcedureStep}.
     * @param pricingProcedureCounter Key property. See {@link PurOrderItemPricingElement.pricingProcedureCounter}.
     * @returns A request builder for creating requests to retrieve one `PurOrderItemPricingElement` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem, pricingDocument, pricingDocumentItem, pricingProcedureStep, pricingProcedureCounter) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem,
            PricingDocument: pricingDocument,
            PricingDocumentItem: pricingDocumentItem,
            PricingProcedureStep: pricingProcedureStep,
            PricingProcedureCounter: pricingProcedureCounter
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurOrderItemPricingElement`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurOrderItemPricingElement`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem, pricingDocument, pricingDocumentItem, pricingProcedureStep, pricingProcedureCounter) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurOrderItemPricingElement_1.PurOrderItemPricingElement
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem,
                PricingDocument: pricingDocument,
                PricingDocumentItem: pricingDocumentItem,
                PricingProcedureStep: pricingProcedureStep,
                PricingProcedureCounter: pricingProcedureCounter
            });
    }
}
exports.PurOrderItemPricingElementRequestBuilder = PurOrderItemPricingElementRequestBuilder;
//# sourceMappingURL=PurOrderItemPricingElementRequestBuilder.js.map