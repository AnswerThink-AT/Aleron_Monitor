"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjectElmntPublicSectorRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link EntProjectElmntPublicSector} entity.
 */
class EntProjectElmntPublicSectorRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EntProjectElmntPublicSector` entities.
     * @returns A request builder for creating requests to retrieve all `EntProjectElmntPublicSector` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `EntProjectElmntPublicSector` entity based on its keys.
     * @param projectElementUuid Key property. See {@link EntProjectElmntPublicSector.projectElementUuid}.
     * @returns A request builder for creating requests to retrieve one `EntProjectElmntPublicSector` entity based on its keys.
     */
    getByKey(projectElementUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { ProjectElementUUID: projectElementUuid });
    }
    /**
     * Returns a request builder for updating an entity of type `EntProjectElmntPublicSector`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `EntProjectElmntPublicSector`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
}
exports.EntProjectElmntPublicSectorRequestBuilder = EntProjectElmntPublicSectorRequestBuilder;
//# sourceMappingURL=EntProjectElmntPublicSectorRequestBuilder.js.map