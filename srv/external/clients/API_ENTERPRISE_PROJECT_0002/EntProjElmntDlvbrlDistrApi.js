"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntDlvbrlDistrApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EntProjElmntDlvbrlDistr_1 = require("./EntProjElmntDlvbrlDistr");
const EntProjElmntDlvbrlDistrRequestBuilder_1 = require("./EntProjElmntDlvbrlDistrRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EntProjElmntDlvbrlDistrApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EntProjElmntDlvbrlDistr_1.EntProjElmntDlvbrlDistr;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EntProjElmntDlvbrlDistrApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENT_PROJ_ELMNT_DLVBRL: new odata_v2_1.OneToOneLink('to_EntProjElmntDlvbrl', this, linkedApis[0])
        };
        return this;
    }
    requestBuilder() {
        return new EntProjElmntDlvbrlDistrRequestBuilder_1.EntProjElmntDlvbrlDistrRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EntProjElmntDlvbrlDistr_1.EntProjElmntDlvbrlDistr, this.deSerializers);
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
                 * Static representation of the {@link entProjElmntDlvbrlDistrUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DLVBRL_DISTR_UUID: fieldBuilder.buildEdmTypeField('EntProjElmntDlvbrlDistrUUID', 'Edm.Guid', false),
                /**
                 * Static representation of the {@link entProjElmntDeliverableUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DELIVERABLE_UUID: fieldBuilder.buildEdmTypeField('EntProjElmntDeliverableUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link projectElementUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_ELEMENT_UUID: fieldBuilder.buildEdmTypeField('ProjectElementUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link projectUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_UUID: fieldBuilder.buildEdmTypeField('ProjectUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link entProjElmntDlvbrlDistrYearVal} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DLVBRL_DISTR_YEAR_VAL: fieldBuilder.buildEdmTypeField('EntProjElmntDlvbrlDistrYearVal', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjElmntDlvbrlDistrPerdVal} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DLVBRL_DISTR_PERD_VAL: fieldBuilder.buildEdmTypeField('EntProjElmntDlvbrlDistrPerdVal', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjElmntDlvbrlDistrQty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DLVBRL_DISTR_QTY: fieldBuilder.buildEdmTypeField('EntProjElmntDlvbrlDistrQty', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link entProjElmntDlvbrlDistrQtyUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DLVBRL_DISTR_QTY_UNIT: fieldBuilder.buildEdmTypeField('EntProjElmntDlvbrlDistrQtyUnit', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EntProjElmntDlvbrlDistr_1.EntProjElmntDlvbrlDistr)
            };
        }
        return this._schema;
    }
}
exports.EntProjElmntDlvbrlDistrApi = EntProjElmntDlvbrlDistrApi;
//# sourceMappingURL=EntProjElmntDlvbrlDistrApi.js.map