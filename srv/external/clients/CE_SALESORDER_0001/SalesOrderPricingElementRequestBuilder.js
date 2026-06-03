"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderPricingElementRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const SalesOrderPricingElement_1 = require("./SalesOrderPricingElement");
/**
 * Request builder class for operations supported on the {@link SalesOrderPricingElement} entity.
 */
class SalesOrderPricingElementRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SalesOrderPricingElement` entities.
     * @returns A request builder for creating requests to retrieve all `SalesOrderPricingElement` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SalesOrderPricingElement` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SalesOrderPricingElement`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SalesOrderPricingElement` entity based on its keys.
     * @param salesOrder Key property. See {@link SalesOrderPricingElement.salesOrder}.
     * @param pricingProcedureStep Key property. See {@link SalesOrderPricingElement.pricingProcedureStep}.
     * @param pricingProcedureCounter Key property. See {@link SalesOrderPricingElement.pricingProcedureCounter}.
     * @returns A request builder for creating requests to retrieve one `SalesOrderPricingElement` entity based on its keys.
     */
    getByKey(salesOrder, pricingProcedureStep, pricingProcedureCounter) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SalesOrder: salesOrder,
            PricingProcedureStep: pricingProcedureStep,
            PricingProcedureCounter: pricingProcedureCounter
        });
    }
    /**
     * Returns a request builder for updating an entity of type `SalesOrderPricingElement`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SalesOrderPricingElement`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(salesOrderOrEntity, pricingProcedureStep, pricingProcedureCounter) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, salesOrderOrEntity instanceof SalesOrderPricingElement_1.SalesOrderPricingElement
            ? salesOrderOrEntity
            : {
                SalesOrder: salesOrderOrEntity,
                PricingProcedureStep: pricingProcedureStep,
                PricingProcedureCounter: pricingProcedureCounter
            });
    }
}
exports.SalesOrderPricingElementRequestBuilder = SalesOrderPricingElementRequestBuilder;
//# sourceMappingURL=SalesOrderPricingElementRequestBuilder.js.map