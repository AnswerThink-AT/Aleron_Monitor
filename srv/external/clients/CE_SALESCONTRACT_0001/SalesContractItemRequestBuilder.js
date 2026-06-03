"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesContractItemRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const SalesContractItem_1 = require("./SalesContractItem");
/**
 * Request builder class for operations supported on the {@link SalesContractItem} entity.
 */
class SalesContractItemRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SalesContractItem` entities.
     * @returns A request builder for creating requests to retrieve all `SalesContractItem` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SalesContractItem` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SalesContractItem`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SalesContractItem` entity based on its keys.
     * @param salesContract Key property. See {@link SalesContractItem.salesContract}.
     * @param salesContractItem Key property. See {@link SalesContractItem.salesContractItem}.
     * @returns A request builder for creating requests to retrieve one `SalesContractItem` entity based on its keys.
     */
    getByKey(salesContract, salesContractItem) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SalesContract: salesContract,
            SalesContractItem: salesContractItem
        });
    }
    /**
     * Returns a request builder for updating an entity of type `SalesContractItem`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SalesContractItem`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(salesContractOrEntity, salesContractItem) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, salesContractOrEntity instanceof SalesContractItem_1.SalesContractItem
            ? salesContractOrEntity
            : {
                SalesContract: salesContractOrEntity,
                SalesContractItem: salesContractItem
            });
    }
}
exports.SalesContractItemRequestBuilder = SalesContractItemRequestBuilder;
//# sourceMappingURL=SalesContractItemRequestBuilder.js.map