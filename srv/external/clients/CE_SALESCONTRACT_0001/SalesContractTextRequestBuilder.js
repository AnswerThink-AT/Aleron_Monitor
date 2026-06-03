"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesContractTextRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const SalesContractText_1 = require("./SalesContractText");
/**
 * Request builder class for operations supported on the {@link SalesContractText} entity.
 */
class SalesContractTextRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SalesContractText` entities.
     * @returns A request builder for creating requests to retrieve all `SalesContractText` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SalesContractText` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SalesContractText`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SalesContractText` entity based on its keys.
     * @param salesContract Key property. See {@link SalesContractText.salesContract}.
     * @param language Key property. See {@link SalesContractText.language}.
     * @param longTextId Key property. See {@link SalesContractText.longTextId}.
     * @returns A request builder for creating requests to retrieve one `SalesContractText` entity based on its keys.
     */
    getByKey(salesContract, language, longTextId) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SalesContract: salesContract,
            Language: language,
            LongTextID: longTextId
        });
    }
    /**
     * Returns a request builder for updating an entity of type `SalesContractText`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SalesContractText`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(salesContractOrEntity, language, longTextId) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, salesContractOrEntity instanceof SalesContractText_1.SalesContractText
            ? salesContractOrEntity
            : {
                SalesContract: salesContractOrEntity,
                Language: language,
                LongTextID: longTextId
            });
    }
}
exports.SalesContractTextRequestBuilder = SalesContractTextRequestBuilder;
//# sourceMappingURL=SalesContractTextRequestBuilder.js.map