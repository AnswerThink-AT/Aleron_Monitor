"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntWorkItemRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const EntProjElmntWorkItem_1 = require("./EntProjElmntWorkItem");
/**
 * Request builder class for operations supported on the {@link EntProjElmntWorkItem} entity.
 */
class EntProjElmntWorkItemRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EntProjElmntWorkItem` entities.
     * @returns A request builder for creating requests to retrieve all `EntProjElmntWorkItem` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `EntProjElmntWorkItem` entity based on its keys.
     * @param entProjElmntWorkItemUuid Key property. See {@link EntProjElmntWorkItem.entProjElmntWorkItemUuid}.
     * @returns A request builder for creating requests to retrieve one `EntProjElmntWorkItem` entity based on its keys.
     */
    getByKey(entProjElmntWorkItemUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { EntProjElmntWorkItemUUID: entProjElmntWorkItemUuid });
    }
    /**
     * Returns a request builder for updating an entity of type `EntProjElmntWorkItem`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `EntProjElmntWorkItem`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(entProjElmntWorkItemUuidOrEntity) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, entProjElmntWorkItemUuidOrEntity instanceof EntProjElmntWorkItem_1.EntProjElmntWorkItem
            ? entProjElmntWorkItemUuidOrEntity
            : { EntProjElmntWorkItemUUID: entProjElmntWorkItemUuidOrEntity });
    }
}
exports.EntProjElmntWorkItemRequestBuilder = EntProjElmntWorkItemRequestBuilder;
//# sourceMappingURL=EntProjElmntWorkItemRequestBuilder.js.map