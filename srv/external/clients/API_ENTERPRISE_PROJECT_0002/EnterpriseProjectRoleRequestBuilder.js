"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjectRoleRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link EnterpriseProjectRole} entity.
 */
class EnterpriseProjectRoleRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EnterpriseProjectRole` entities.
     * @returns A request builder for creating requests to retrieve all `EnterpriseProjectRole` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `EnterpriseProjectRole` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `EnterpriseProjectRole`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `EnterpriseProjectRole` entity based on its keys.
     * @param projectRoleUuid Key property. See {@link EnterpriseProjectRole.projectRoleUuid}.
     * @returns A request builder for creating requests to retrieve one `EnterpriseProjectRole` entity based on its keys.
     */
    getByKey(projectRoleUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { ProjectRoleUUID: projectRoleUuid });
    }
}
exports.EnterpriseProjectRoleRequestBuilder = EnterpriseProjectRoleRequestBuilder;
//# sourceMappingURL=EnterpriseProjectRoleRequestBuilder.js.map