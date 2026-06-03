"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yy1_Salesvcdata_1RequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const Yy1_Salesvcdata_1_1 = require("./Yy1_Salesvcdata_1");
/**
 * Request builder class for operations supported on the {@link Yy1_Salesvcdata_1} entity.
 */
class Yy1_Salesvcdata_1RequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `Yy1_Salesvcdata_1` entities.
     * @returns A request builder for creating requests to retrieve all `Yy1_Salesvcdata_1` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `Yy1_Salesvcdata_1` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `Yy1_Salesvcdata_1`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `Yy1_Salesvcdata_1` entity based on its keys.
     * @param sapUuid Key property. See {@link Yy1_Salesvcdata_1.sapUuid}.
     * @returns A request builder for creating requests to retrieve one `Yy1_Salesvcdata_1` entity based on its keys.
     */
    getByKey(sapUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SAP_UUID: sapUuid
        });
    }
    /**
     * Returns a request builder for updating an entity of type `Yy1_Salesvcdata_1`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `Yy1_Salesvcdata_1`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(sapUuidOrEntity) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, sapUuidOrEntity instanceof Yy1_Salesvcdata_1_1.Yy1_Salesvcdata_1
            ? sapUuidOrEntity
            : { SAP_UUID: sapUuidOrEntity });
    }
}
exports.Yy1_Salesvcdata_1RequestBuilder = Yy1_Salesvcdata_1RequestBuilder;
//# sourceMappingURL=Yy1_Salesvcdata_1RequestBuilder.js.map