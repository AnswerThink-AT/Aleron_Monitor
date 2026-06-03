"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjBlkFuncApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EnterpriseProjBlkFunc_1 = require("./EnterpriseProjBlkFunc");
const EnterpriseProjBlkFuncRequestBuilder_1 = require("./EnterpriseProjBlkFuncRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EnterpriseProjBlkFuncApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EnterpriseProjBlkFunc_1.EnterpriseProjBlkFunc;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EnterpriseProjBlkFuncApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENTERPRISE_PROJECT: new odata_v2_1.OneToOneLink('to_EnterpriseProject', this, linkedApis[0])
        };
        return this;
    }
    requestBuilder() {
        return new EnterpriseProjBlkFuncRequestBuilder_1.EnterpriseProjBlkFuncRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EnterpriseProjBlkFunc_1.EnterpriseProjBlkFunc, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link updateMc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UPDATE_MC: fieldBuilder.buildEdmTypeField('Update_mc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link projectUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_UUID: fieldBuilder.buildEdmTypeField('ProjectUUID', 'Edm.Guid', false),
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
                ALL_FIELDS: new odata_v2_1.AllFields('*', EnterpriseProjBlkFunc_1.EnterpriseProjBlkFunc)
            };
        }
        return this._schema;
    }
}
exports.EnterpriseProjBlkFuncApi = EnterpriseProjBlkFuncApi;
//# sourceMappingURL=EnterpriseProjBlkFuncApi.js.map