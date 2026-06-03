"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesContractItemTextRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const SalesContractItemText_1 = require("./SalesContractItemText");
/**
 * Request builder class for operations supported on the {@link SalesContractItemText} entity.
 */
class SalesContractItemTextRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SalesContractItemText` entities.
     * @returns A request builder for creating requests to retrieve all `SalesContractItemText` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SalesContractItemText` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SalesContractItemText`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SalesContractItemText` entity based on its keys.
     * @param salesContract Key property. See {@link SalesContractItemText.salesContract}.
     * @param salesContractItem Key property. See {@link SalesContractItemText.salesContractItem}.
     * @param language Key property. See {@link SalesContractItemText.language}.
     * @param longTextId Key property. See {@link SalesContractItemText.longTextId}.
     * @returns A request builder for creating requests to retrieve one `SalesContractItemText` entity based on its keys.
     */
    getByKey(salesContract, salesContractItem, language, longTextId) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SalesContract: salesContract,
            SalesContractItem: salesContractItem,
            Language: language,
            LongTextID: longTextId
        });
    }
    /**
     * Returns a request builder for updating an entity of type `SalesContractItemText`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SalesContractItemText`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(salesContractOrEntity, salesContractItem, language, longTextId) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, salesContractOrEntity instanceof SalesContractItemText_1.SalesContractItemText
            ? salesContractOrEntity
            : {
                SalesContract: salesContractOrEntity,
                SalesContractItem: salesContractItem,
                Language: language,
                LongTextID: longTextId
            });
    }
}
exports.SalesContractItemTextRequestBuilder = SalesContractItemTextRequestBuilder;
//# sourceMappingURL=SalesContractItemTextRequestBuilder.js.map