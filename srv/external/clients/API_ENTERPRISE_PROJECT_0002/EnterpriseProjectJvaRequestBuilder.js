"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjectJvaRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link EnterpriseProjectJva} entity.
 */
class EnterpriseProjectJvaRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EnterpriseProjectJva` entities.
     * @returns A request builder for creating requests to retrieve all `EnterpriseProjectJva` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `EnterpriseProjectJva` entity based on its keys.
     * @param projectUuid Key property. See {@link EnterpriseProjectJva.projectUuid}.
     * @returns A request builder for creating requests to retrieve one `EnterpriseProjectJva` entity based on its keys.
     */
    getByKey(projectUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { ProjectUUID: projectUuid });
    }
    /**
     * Returns a request builder for updating an entity of type `EnterpriseProjectJva`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `EnterpriseProjectJva`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
}
exports.EnterpriseProjectJvaRequestBuilder = EnterpriseProjectJvaRequestBuilder;
//# sourceMappingURL=EnterpriseProjectJvaRequestBuilder.js.map