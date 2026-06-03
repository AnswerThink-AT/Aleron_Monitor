"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yy1_Workforce_CdsRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link Yy1_Workforce_Cds} entity.
 */
class Yy1_Workforce_CdsRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `Yy1_Workforce_Cds` entities.
     * @returns A request builder for creating requests to retrieve all `Yy1_Workforce_Cds` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `Yy1_Workforce_Cds` entity based on its keys.
     * @param workforcePersonExternalId Key property. See {@link Yy1_Workforce_Cds.workforcePersonExternalId}.
     * @returns A request builder for creating requests to retrieve one `Yy1_Workforce_Cds` entity based on its keys.
     */
    getByKey(workforcePersonExternalId) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            WorkforcePersonExternalID: workforcePersonExternalId
        });
    }
}
exports.Yy1_Workforce_CdsRequestBuilder = Yy1_Workforce_CdsRequestBuilder;
//# sourceMappingURL=Yy1_Workforce_CdsRequestBuilder.js.map