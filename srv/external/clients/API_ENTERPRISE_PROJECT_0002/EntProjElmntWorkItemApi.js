"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntWorkItemApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EntProjElmntWorkItem_1 = require("./EntProjElmntWorkItem");
const EntProjElmntWorkItemRequestBuilder_1 = require("./EntProjElmntWorkItemRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EntProjElmntWorkItemApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EntProjElmntWorkItem_1.EntProjElmntWorkItem;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EntProjElmntWorkItemApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENTERPRISE_PROJECT_ELEMENT: new odata_v2_1.OneToOneLink('to_EnterpriseProjectElement', this, linkedApis[0]),
            TO_CONFIGURED_WORK_ITEM_TEXT: new odata_v2_1.Link('to_ConfiguredWorkItemText', this, linkedApis[1]),
            TO_ENTERPRISE_PROJECT: new odata_v2_1.OneToOneLink('to_EnterpriseProject', this, linkedApis[2])
        };
        return this;
    }
    requestBuilder() {
        return new EntProjElmntWorkItemRequestBuilder_1.EntProjElmntWorkItemRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EntProjElmntWorkItem_1.EntProjElmntWorkItem, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link deleteMc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DELETE_MC: fieldBuilder.buildEdmTypeField('Delete_mc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link updateMc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UPDATE_MC: fieldBuilder.buildEdmTypeField('Update_mc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link entProjElmntWorkItemUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WORK_ITEM_UUID: fieldBuilder.buildEdmTypeField('EntProjElmntWorkItemUUID', 'Edm.Guid', false),
                /**
                 * Static representation of the {@link entProjElmntWorkItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WORK_ITEM: fieldBuilder.buildEdmTypeField('EntProjElmntWorkItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link entProjElmntWorkItemName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WORK_ITEM_NAME: fieldBuilder.buildEdmTypeField('EntProjElmntWorkItemName', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjElmntWorkItemIsInactive} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WORK_ITEM_IS_INACTIVE: fieldBuilder.buildEdmTypeField('EntProjElmntWorkItemIsInactive', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link entProjElmntWorkItemIsCnfgrd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WORK_ITEM_IS_CNFGRD: fieldBuilder.buildEdmTypeField('EntProjElmntWorkItemIsCnfgrd', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link projectUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_UUID: fieldBuilder.buildEdmTypeField('ProjectUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link projectElementUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_ELEMENT_UUID: fieldBuilder.buildEdmTypeField('ProjectElementUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link entProjElmntWrkItmLastUpdtSrce} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WRK_ITM_LAST_UPDT_SRCE: fieldBuilder.buildEdmTypeField('EntProjElmntWrkItmLastUpdtSrce', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjElmntWrkItmCrtedByUsr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WRK_ITM_CRTED_BY_USR: fieldBuilder.buildEdmTypeField('EntProjElmntWrkItmCrtedByUsr', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjElmntWrkItmCrtnDteTme} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WRK_ITM_CRTN_DTE_TME: fieldBuilder.buildEdmTypeField('EntProjElmntWrkItmCrtnDteTme', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link entProjElmntWrkItmLstChgByUsr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WRK_ITM_LST_CHG_BY_USR: fieldBuilder.buildEdmTypeField('EntProjElmntWrkItmLstChgByUsr', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjElmntWrkItmLstChgDteTme} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_WRK_ITM_LST_CHG_DTE_TME: fieldBuilder.buildEdmTypeField('EntProjElmntWrkItmLstChgDteTme', 'Edm.DateTimeOffset', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EntProjElmntWorkItem_1.EntProjElmntWorkItem)
            };
        }
        return this._schema;
    }
}
exports.EntProjElmntWorkItemApi = EntProjElmntWorkItemApi;
//# sourceMappingURL=EntProjElmntWorkItemApi.js.map