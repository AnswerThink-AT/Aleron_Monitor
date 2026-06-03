"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjElmntDlvbrlApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EntProjElmntDlvbrl_1 = require("./EntProjElmntDlvbrl");
const EntProjElmntDlvbrlRequestBuilder_1 = require("./EntProjElmntDlvbrlRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EntProjElmntDlvbrlApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EntProjElmntDlvbrl_1.EntProjElmntDlvbrl;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EntProjElmntDlvbrlApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENTERPRISE_PROJECT_ELEMENT: new odata_v2_1.OneToOneLink('to_EnterpriseProjectElement', this, linkedApis[0]),
            TO_ENT_PROJ_ELMNT_DLV_DISTR: new odata_v2_1.Link('to_EntProjElmntDlvDistr', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new EntProjElmntDlvbrlRequestBuilder_1.EntProjElmntDlvbrlRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EntProjElmntDlvbrl_1.EntProjElmntDlvbrl, this.deSerializers);
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
                 * Static representation of the {@link toEntProjElmntDlvDistrOc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TO_ENT_PROJ_ELMNT_DLV_DISTR_OC: fieldBuilder.buildEdmTypeField('to_EntProjElmntDlvDistr_oc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link entProjElmntDeliverableUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DELIVERABLE_UUID: fieldBuilder.buildEdmTypeField('EntProjElmntDeliverableUUID', 'Edm.Guid', false),
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
                 * Static representation of the {@link entProjElmntDeliverableType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DELIVERABLE_TYPE: fieldBuilder.buildEdmTypeField('EntProjElmntDeliverableType', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjElmntDlvbrlQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DLVBRL_QUANTITY: fieldBuilder.buildEdmTypeField('EntProjElmntDlvbrlQuantity', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link entProjElmntDlvbrlQuantityUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_ELMNT_DLVBRL_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField('EntProjElmntDlvbrlQuantityUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link createdByUser} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CREATED_BY_USER: fieldBuilder.buildEdmTypeField('CreatedByUser', 'Edm.String', true),
                /**
                 * Static representation of the {@link creationDateTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CREATION_DATE_TIME: fieldBuilder.buildEdmTypeField('CreationDateTime', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link lastChangeDateTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGE_DATE_TIME: fieldBuilder.buildEdmTypeField('LastChangeDateTime', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link lastChangedByUser} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGED_BY_USER: fieldBuilder.buildEdmTypeField('LastChangedByUser', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EntProjElmntDlvbrl_1.EntProjElmntDlvbrl)
            };
        }
        return this._schema;
    }
}
exports.EntProjElmntDlvbrlApi = EntProjElmntDlvbrlApi;
//# sourceMappingURL=EntProjElmntDlvbrlApi.js.map