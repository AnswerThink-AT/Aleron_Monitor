"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntTeamMemberEntitlementRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const EntTeamMemberEntitlement_1 = require("./EntTeamMemberEntitlement");
/**
 * Request builder class for operations supported on the {@link EntTeamMemberEntitlement} entity.
 */
class EntTeamMemberEntitlementRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EntTeamMemberEntitlement` entities.
     * @returns A request builder for creating requests to retrieve all `EntTeamMemberEntitlement` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `EntTeamMemberEntitlement` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `EntTeamMemberEntitlement`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `EntTeamMemberEntitlement` entity based on its keys.
     * @param projectEntitlementUuid Key property. See {@link EntTeamMemberEntitlement.projectEntitlementUuid}.
     * @returns A request builder for creating requests to retrieve one `EntTeamMemberEntitlement` entity based on its keys.
     */
    getByKey(projectEntitlementUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { ProjectEntitlementUUID: projectEntitlementUuid });
    }
    /**
     * Returns a request builder for updating an entity of type `EntTeamMemberEntitlement`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `EntTeamMemberEntitlement`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(projectEntitlementUuidOrEntity) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, projectEntitlementUuidOrEntity instanceof EntTeamMemberEntitlement_1.EntTeamMemberEntitlement
            ? projectEntitlementUuidOrEntity
            : { ProjectEntitlementUUID: projectEntitlementUuidOrEntity });
    }
}
exports.EntTeamMemberEntitlementRequestBuilder = EntTeamMemberEntitlementRequestBuilder;
//# sourceMappingURL=EntTeamMemberEntitlementRequestBuilder.js.map