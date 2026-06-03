"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyCodeRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link CompanyCode} entity.
 */
class CompanyCodeRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `CompanyCode` entities.
     * @returns A request builder for creating requests to retrieve all `CompanyCode` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `CompanyCode` entity based on its keys.
     * @param companyCode Key property. See {@link CompanyCode.companyCode}.
     * @returns A request builder for creating requests to retrieve one `CompanyCode` entity based on its keys.
     */
    getByKey(companyCode) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            CompanyCode: companyCode
        });
    }
}
exports.CompanyCodeRequestBuilder = CompanyCodeRequestBuilder;
//# sourceMappingURL=CompanyCodeRequestBuilder.js.map