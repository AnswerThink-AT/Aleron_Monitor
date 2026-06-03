"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderItemPricingElementRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const SalesOrderItemPricingElement_1 = require("./SalesOrderItemPricingElement");
/**
 * Request builder class for operations supported on the {@link SalesOrderItemPricingElement} entity.
 */
class SalesOrderItemPricingElementRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SalesOrderItemPricingElement` entities.
     * @returns A request builder for creating requests to retrieve all `SalesOrderItemPricingElement` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SalesOrderItemPricingElement` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SalesOrderItemPricingElement`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SalesOrderItemPricingElement` entity based on its keys.
     * @param salesOrder Key property. See {@link SalesOrderItemPricingElement.salesOrder}.
     * @param salesOrderItem Key property. See {@link SalesOrderItemPricingElement.salesOrderItem}.
     * @param pricingProcedureStep Key property. See {@link SalesOrderItemPricingElement.pricingProcedureStep}.
     * @param pricingProcedureCounter Key property. See {@link SalesOrderItemPricingElement.pricingProcedureCounter}.
     * @returns A request builder for creating requests to retrieve one `SalesOrderItemPricingElement` entity based on its keys.
     */
    getByKey(salesOrder, salesOrderItem, pricingProcedureStep, pricingProcedureCounter) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SalesOrder: salesOrder,
            SalesOrderItem: salesOrderItem,
            PricingProcedureStep: pricingProcedureStep,
            PricingProcedureCounter: pricingProcedureCounter
        });
    }
    /**
     * Returns a request builder for updating an entity of type `SalesOrderItemPricingElement`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SalesOrderItemPricingElement`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(salesOrderOrEntity, salesOrderItem, pricingProcedureStep, pricingProcedureCounter) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, salesOrderOrEntity instanceof SalesOrderItemPricingElement_1.SalesOrderItemPricingElement
            ? salesOrderOrEntity
            : {
                SalesOrder: salesOrderOrEntity,
                SalesOrderItem: salesOrderItem,
                PricingProcedureStep: pricingProcedureStep,
                PricingProcedureCounter: pricingProcedureCounter
            });
    }
}
exports.SalesOrderItemPricingElementRequestBuilder = SalesOrderItemPricingElementRequestBuilder;
//# sourceMappingURL=SalesOrderItemPricingElementRequestBuilder.js.map