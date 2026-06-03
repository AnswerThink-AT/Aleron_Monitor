"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntDlvbrlDistrRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link EntProjElmntDlvbrlDistr} entity.
 */
class EntProjElmntDlvbrlDistrRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EntProjElmntDlvbrlDistr` entities.
     * @returns A request builder for creating requests to retrieve all `EntProjElmntDlvbrlDistr` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `EntProjElmntDlvbrlDistr` entity based on its keys.
     * @param entProjElmntDlvbrlDistrUuid Key property. See {@link EntProjElmntDlvbrlDistr.entProjElmntDlvbrlDistrUuid}.
     * @returns A request builder for creating requests to retrieve one `EntProjElmntDlvbrlDistr` entity based on its keys.
     */
    getByKey(entProjElmntDlvbrlDistrUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { EntProjElmntDlvbrlDistrUUID: entProjElmntDlvbrlDistrUuid });
    }
    /**
     * Returns a request builder for updating an entity of type `EntProjElmntDlvbrlDistr`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `EntProjElmntDlvbrlDistr`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
}
exports.EntProjElmntDlvbrlDistrRequestBuilder = EntProjElmntDlvbrlDistrRequestBuilder;
//# sourceMappingURL=EntProjElmntDlvbrlDistrRequestBuilder.js.map