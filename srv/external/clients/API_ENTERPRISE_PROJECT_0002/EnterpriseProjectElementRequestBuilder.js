"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjectElementRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const EnterpriseProjectElement_1 = require("./EnterpriseProjectElement");
/**
 * Request builder class for operations supported on the {@link EnterpriseProjectElement} entity.
 */
class EnterpriseProjectElementRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EnterpriseProjectElement` entities.
     * @returns A request builder for creating requests to retrieve all `EnterpriseProjectElement` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `EnterpriseProjectElement` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `EnterpriseProjectElement`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `EnterpriseProjectElement` entity based on its keys.
     * @param projectElementUuid Key property. See {@link EnterpriseProjectElement.projectElementUuid}.
     * @returns A request builder for creating requests to retrieve one `EnterpriseProjectElement` entity based on its keys.
     */
    getByKey(projectElementUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { ProjectElementUUID: projectElementUuid });
    }
    /**
     * Returns a request builder for updating an entity of type `EnterpriseProjectElement`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `EnterpriseProjectElement`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(projectElementUuidOrEntity) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, projectElementUuidOrEntity instanceof EnterpriseProjectElement_1.EnterpriseProjectElement
            ? projectElementUuidOrEntity
            : { ProjectElementUUID: projectElementUuidOrEntity });
    }
}
exports.EnterpriseProjectElementRequestBuilder = EnterpriseProjectElementRequestBuilder;
//# sourceMappingURL=EnterpriseProjectElementRequestBuilder.js.map