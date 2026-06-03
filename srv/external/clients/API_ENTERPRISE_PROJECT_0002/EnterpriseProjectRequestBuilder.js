"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjectRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const EnterpriseProject_1 = require("./EnterpriseProject");
/**
 * Request builder class for operations supported on the {@link EnterpriseProject} entity.
 */
class EnterpriseProjectRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EnterpriseProject` entities.
     * @returns A request builder for creating requests to retrieve all `EnterpriseProject` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `EnterpriseProject` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `EnterpriseProject`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `EnterpriseProject` entity based on its keys.
     * @param projectUuid Key property. See {@link EnterpriseProject.projectUuid}.
     * @returns A request builder for creating requests to retrieve one `EnterpriseProject` entity based on its keys.
     */
    getByKey(projectUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            ProjectUUID: projectUuid
        });
    }
    /**
     * Returns a request builder for updating an entity of type `EnterpriseProject`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `EnterpriseProject`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(projectUuidOrEntity) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, projectUuidOrEntity instanceof EnterpriseProject_1.EnterpriseProject
            ? projectUuidOrEntity
            : { ProjectUUID: projectUuidOrEntity });
    }
}
exports.EnterpriseProjectRequestBuilder = EnterpriseProjectRequestBuilder;
//# sourceMappingURL=EnterpriseProjectRequestBuilder.js.map