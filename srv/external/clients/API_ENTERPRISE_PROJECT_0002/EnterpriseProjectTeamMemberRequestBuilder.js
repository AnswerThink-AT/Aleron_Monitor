"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjectTeamMemberRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link EnterpriseProjectTeamMember} entity.
 */
class EnterpriseProjectTeamMemberRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EnterpriseProjectTeamMember` entities.
     * @returns A request builder for creating requests to retrieve all `EnterpriseProjectTeamMember` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `EnterpriseProjectTeamMember` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `EnterpriseProjectTeamMember`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `EnterpriseProjectTeamMember` entity based on its keys.
     * @param teamMemberUuid Key property. See {@link EnterpriseProjectTeamMember.teamMemberUuid}.
     * @returns A request builder for creating requests to retrieve one `EnterpriseProjectTeamMember` entity based on its keys.
     */
    getByKey(teamMemberUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { TeamMemberUUID: teamMemberUuid });
    }
}
exports.EnterpriseProjectTeamMemberRequestBuilder = EnterpriseProjectTeamMemberRequestBuilder;
//# sourceMappingURL=EnterpriseProjectTeamMemberRequestBuilder.js.map