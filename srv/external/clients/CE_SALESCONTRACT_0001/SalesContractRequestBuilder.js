"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesContractRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const SalesContract_1 = require("./SalesContract");
/**
 * Request builder class for operations supported on the {@link SalesContract} entity.
 */
class SalesContractRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SalesContract` entities.
     * @returns A request builder for creating requests to retrieve all `SalesContract` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SalesContract` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SalesContract`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SalesContract` entity based on its keys.
     * @param salesContract Key property. See {@link SalesContract.salesContract}.
     * @returns A request builder for creating requests to retrieve one `SalesContract` entity based on its keys.
     */
    getByKey(salesContract) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SalesContract: salesContract
        });
    }
    /**
     * Returns a request builder for updating an entity of type `SalesContract`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SalesContract`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(salesContractOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, salesContractOrEntity instanceof SalesContract_1.SalesContract
            ? salesContractOrEntity
            : { SalesContract: salesContractOrEntity });
    }
}
exports.SalesContractRequestBuilder = SalesContractRequestBuilder;
//# sourceMappingURL=SalesContractRequestBuilder.js.map