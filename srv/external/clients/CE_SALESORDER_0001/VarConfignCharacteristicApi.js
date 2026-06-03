"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarConfignCharacteristicApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const VarConfignCharacteristic_1 = require("./VarConfignCharacteristic");
const VarConfignCharacteristicRequestBuilder_1 = require("./VarConfignCharacteristicRequestBuilder");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class VarConfignCharacteristicApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = VarConfignCharacteristic_1.VarConfignCharacteristic;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new VarConfignCharacteristicApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            ASSIGNED_VALUE: new odata_v4_1.OneToManyLink('_AssignedValue', this, linkedApis[0]),
            INSTANCE: new odata_v4_1.OneToOneLink('_Instance', this, linkedApis[1]),
            VARIANT_CONFIGURATION: new odata_v4_1.OneToOneLink('_VariantConfiguration', this, linkedApis[2])
        };
        return this;
    }
    requestBuilder() {
        return new VarConfignCharacteristicRequestBuilder_1.VarConfignCharacteristicRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(VarConfignCharacteristic_1.VarConfignCharacteristic, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link varConfigurationBusObjectKey} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CONFIGURATION_BUS_OBJECT_KEY: fieldBuilder.buildEdmTypeField('VarConfigurationBusObjectKey', 'Edm.String', false),
                /**
                 * Static representation of the {@link varConfigurationBusObjectType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CONFIGURATION_BUS_OBJECT_TYPE: fieldBuilder.buildEdmTypeField('VarConfigurationBusObjectType', 'Edm.String', false),
                /**
                 * Static representation of the {@link varConfignInstceInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CONFIGN_INSTCE_INTERNAL_ID: fieldBuilder.buildEdmTypeField('VarConfignInstceInternalID', 'Edm.Int32', false),
                /**
                 * Static representation of the {@link characteristic} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHARACTERISTIC: fieldBuilder.buildEdmTypeField('Characteristic', 'Edm.String', false),
                /**
                 * Static representation of the {@link charcDataType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHARC_DATA_TYPE: fieldBuilder.buildEdmTypeField('CharcDataType', 'Edm.String', false),
                /**
                 * Static representation of the {@link charcTemplate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHARC_TEMPLATE: fieldBuilder.buildEdmTypeField('CharcTemplate', 'Edm.String', false),
                /**
                 * Static representation of the {@link currency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CURRENCY: fieldBuilder.buildEdmTypeField('Currency', 'Edm.String', true),
                /**
                 * Static representation of the {@link charcValueUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHARC_VALUE_UNIT: fieldBuilder.buildEdmTypeField('CharcValueUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link varCnfCharcIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_ISO_UNIT: fieldBuilder.buildEdmTypeField('VarCnfCharcISOUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link isReadOnly} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_READ_ONLY: fieldBuilder.buildEdmTypeField('IsReadOnly', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link entryIsRequired} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENTRY_IS_REQUIRED: fieldBuilder.buildEdmTypeField('EntryIsRequired', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link charcIsHidden} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHARC_IS_HIDDEN: fieldBuilder.buildEdmTypeField('CharcIsHidden', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link additionalValueIsAllowed} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDITIONAL_VALUE_IS_ALLOWED: fieldBuilder.buildEdmTypeField('AdditionalValueIsAllowed', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link multipleValuesAreAllowed} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MULTIPLE_VALUES_ARE_ALLOWED: fieldBuilder.buildEdmTypeField('MultipleValuesAreAllowed', 'Edm.Boolean', false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', VarConfignCharacteristic_1.VarConfignCharacteristic)
            };
        }
        return this._schema;
    }
}
exports.VarConfignCharacteristicApi = VarConfignCharacteristicApi;
//# sourceMappingURL=VarConfignCharacteristicApi.js.map