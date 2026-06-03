"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntCnfgrdWrkItmTxtRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link EntProjElmntCnfgrdWrkItmTxt} entity.
 */
class EntProjElmntCnfgrdWrkItmTxtRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `EntProjElmntCnfgrdWrkItmTxt` entities.
     * @returns A request builder for creating requests to retrieve all `EntProjElmntCnfgrdWrkItmTxt` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `EntProjElmntCnfgrdWrkItmTxt` entity based on its keys.
     * @param entProjElmntWorkItem Key property. See {@link EntProjElmntCnfgrdWrkItmTxt.entProjElmntWorkItem}.
     * @param language Key property. See {@link EntProjElmntCnfgrdWrkItmTxt.language}.
     * @returns A request builder for creating requests to retrieve one `EntProjElmntCnfgrdWrkItmTxt` entity based on its keys.
     */
    getByKey(entProjElmntWorkItem, language) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            EntProjElmntWorkItem: entProjElmntWorkItem,
            Language: language
        });
    }
}
exports.EntProjElmntCnfgrdWrkItmTxtRequestBuilder = EntProjElmntCnfgrdWrkItmTxtRequestBuilder;
//# sourceMappingURL=EntProjElmntCnfgrdWrkItmTxtRequestBuilder.js.map