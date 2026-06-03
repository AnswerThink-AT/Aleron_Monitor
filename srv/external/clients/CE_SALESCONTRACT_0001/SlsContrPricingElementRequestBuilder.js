"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlsContrPricingElementRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const SlsContrPricingElement_1 = require("./SlsContrPricingElement");
/**
 * Request builder class for operations supported on the {@link SlsContrPricingElement} entity.
 */
class SlsContrPricingElementRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SlsContrPricingElement` entities.
     * @returns A request builder for creating requests to retrieve all `SlsContrPricingElement` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SlsContrPricingElement` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SlsContrPricingElement`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SlsContrPricingElement` entity based on its keys.
     * @param salesContract Key property. See {@link SlsContrPricingElement.salesContract}.
     * @param pricingProcedureStep Key property. See {@link SlsContrPricingElement.pricingProcedureStep}.
     * @param pricingProcedureCounter Key property. See {@link SlsContrPricingElement.pricingProcedureCounter}.
     * @returns A request builder for creating requests to retrieve one `SlsContrPricingElement` entity based on its keys.
     */
    getByKey(salesContract, pricingProcedureStep, pricingProcedureCounter) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SalesContract: salesContract,
            PricingProcedureStep: pricingProcedureStep,
            PricingProcedureCounter: pricingProcedureCounter
        });
    }
    /**
     * Returns a request builder for updating an entity of type `SlsContrPricingElement`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SlsContrPricingElement`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(salesContractOrEntity, pricingProcedureStep, pricingProcedureCounter) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, salesContractOrEntity instanceof SlsContrPricingElement_1.SlsContrPricingElement
            ? salesContractOrEntity
            : {
                SalesContract: salesContractOrEntity,
                PricingProcedureStep: pricingProcedureStep,
                PricingProcedureCounter: pricingProcedureCounter
            });
    }
}
exports.SlsContrPricingElementRequestBuilder = SlsContrPricingElementRequestBuilder;
//# sourceMappingURL=SlsContrPricingElementRequestBuilder.js.map