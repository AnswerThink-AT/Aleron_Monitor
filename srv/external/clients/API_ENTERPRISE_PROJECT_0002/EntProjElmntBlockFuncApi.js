"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntBlockFuncApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EntProjElmntBlockFunc_1 = require("./EntProjElmntBlockFunc");
const EntProjElmntBlockFuncRequestBuilder_1 = require("./EntProjElmntBlockFuncRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EntProjElmntBlockFuncApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EntProjElmntBlockFunc_1.EntProjElmntBlockFunc;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EntProjElmntBlockFuncApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENTERPRISE_PROJECT_ELEMENT: new odata_v2_1.OneToOneLink('to_EnterpriseProjectElement', this, linkedApis[0]),
            TO_ENTERPRISE_PROJECT: new odata_v2_1.OneToOneLink('to_EnterpriseProject', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new EntProjElmntBlockFuncRequestBuilder_1.EntProjElmntBlockFuncRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EntProjElmntBlockFunc_1.EntProjElmntBlockFunc, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link entProjOtherExpensePostgIsBlkdFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD_FC: fieldBuilder.buildEdmTypeField('EntProjOtherExpensePostgIsBlkd_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link entProjPurchasingIsBlkdFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_PURCHASING_IS_BLKD_FC: fieldBuilder.buildEdmTypeField('EntProjPurchasingIsBlkd_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link entProjServicePostingIsBlkdFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_SERVICE_POSTING_IS_BLKD_FC: fieldBuilder.buildEdmTypeField('EntProjServicePostingIsBlkd_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link entProjStaffExpensePostgIsBlkdFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD_FC: fieldBuilder.buildEdmTypeField('EntProjStaffExpensePostgIsBlkd_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link entProjTimeRecgIsBlkdFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_TIME_RECG_IS_BLKD_FC: fieldBuilder.buildEdmTypeField('EntProjTimeRecgIsBlkd_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link updateMc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UPDATE_MC: fieldBuilder.buildEdmTypeField('Update_mc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link projectElementUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_ELEMENT_UUID: fieldBuilder.buildEdmTypeField('ProjectElementUUID', 'Edm.Guid', false),
                /**
                 * Static representation of the {@link projectUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_UUID: fieldBuilder.buildEdmTypeField('ProjectUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link entProjTimeRecgIsBlkd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_TIME_RECG_IS_BLKD: fieldBuilder.buildEdmTypeField('EntProjTimeRecgIsBlkd', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link entProjStaffExpensePostgIsBlkd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD: fieldBuilder.buildEdmTypeField('EntProjStaffExpensePostgIsBlkd', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link entProjServicePostingIsBlkd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_SERVICE_POSTING_IS_BLKD: fieldBuilder.buildEdmTypeField('EntProjServicePostingIsBlkd', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link entProjOtherExpensePostgIsBlkd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD: fieldBuilder.buildEdmTypeField('EntProjOtherExpensePostgIsBlkd', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link entProjPurchasingIsBlkd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_PURCHASING_IS_BLKD: fieldBuilder.buildEdmTypeField('EntProjPurchasingIsBlkd', 'Edm.Boolean', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EntProjElmntBlockFunc_1.EntProjElmntBlockFunc)
            };
        }
        return this._schema;
    }
}
exports.EntProjElmntBlockFuncApi = EntProjElmntBlockFuncApi;
//# sourceMappingURL=EntProjElmntBlockFuncApi.js.map