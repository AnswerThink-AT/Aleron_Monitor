"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntDlvbrlRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link EntProjElmntDlvbrl} entity.
 */
class EntProjElmntDlvbrlRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EntProjElmntDlvbrl` entities.
     * @returns A request builder for creating requests to retrieve all `EntProjElmntDlvbrl` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `EntProjElmntDlvbrl` entity based on its keys.
     * @param entProjElmntDeliverableUuid Key property. See {@link EntProjElmntDlvbrl.entProjElmntDeliverableUuid}.
     * @returns A request builder for creating requests to retrieve one `EntProjElmntDlvbrl` entity based on its keys.
     */
    getByKey(entProjElmntDeliverableUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { EntProjElmntDeliverableUUID: entProjElmntDeliverableUuid });
    }
    /**
     * Returns a request builder for updating an entity of type `EntProjElmntDlvbrl`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `EntProjElmntDlvbrl`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
}
exports.EntProjElmntDlvbrlRequestBuilder = EntProjElmntDlvbrlRequestBuilder;
//# sourceMappingURL=EntProjElmntDlvbrlRequestBuilder.js.map