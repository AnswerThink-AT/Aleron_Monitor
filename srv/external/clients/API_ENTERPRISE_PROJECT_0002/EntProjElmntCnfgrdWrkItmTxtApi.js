"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntCnfgrdWrkItmTxtApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EntProjElmntCnfgrdWrkItmTxt_1 = require("./EntProjElmntCnfgrdWrkItmTxt");
const EntProjElmntCnfgrdWrkItmTxtRequestBuilder_1 = require("./EntProjElmntCnfgrdWrkItmTxtRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EntProjElmntCnfgrdWrkItmTxtApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EntProjElmntCnfgrdWrkItmTxt_1.EntProjElmntCnfgrdWrkItmTxt;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EntProjElmntCnfgrdWrkItmTxtApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new EntProjElmntCnfgrdWrkItmTxtRequestBuilder_1.EntProjElmntCnfgrdWrkItmTxtRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EntProjElmntCnfgrdWrkItmTxt_1.EntProjElmntCnfgrdWrkItmTxt, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link entProjElmntWorkItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WORK_ITEM: fieldBuilder.buildEdmTypeField('EntProjElmntWorkItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link language} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', false),
                /**
                 * Static representation of the {@link entProjElmntCnfgrdWrkItmName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_CNFGRD_WRK_ITM_NAME: fieldBuilder.buildEdmTypeField('EntProjElmntCnfgrdWrkItmName', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EntProjElmntCnfgrdWrkItmTxt_1.EntProjElmntCnfgrdWrkItmTxt)
            };
        }
        return this._schema;
    }
}
exports.EntProjElmntCnfgrdWrkItmTxtApi = EntProjElmntCnfgrdWrkItmTxtApi;
//# sourceMappingURL=EntProjElmntCnfgrdWrkItmTxtApi.js.map