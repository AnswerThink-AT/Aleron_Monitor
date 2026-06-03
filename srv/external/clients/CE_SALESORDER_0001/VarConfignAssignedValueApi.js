"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarConfignAssignedValueApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const VarConfignAssignedValue_1 = require("./VarConfignAssignedValue");
const VarConfignAssignedValueRequestBuilder_1 = require("./VarConfignAssignedValueRequestBuilder");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class VarConfignAssignedValueApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = VarConfignAssignedValue_1.VarConfignAssignedValue;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new VarConfignAssignedValueApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            CHARACTERISTIC_1: new odata_v4_1.OneToOneLink('_Characteristic', this, linkedApis[0]),
            VARIANT_CONFIGURATION: new odata_v4_1.OneToOneLink('_VariantConfiguration', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new VarConfignAssignedValueRequestBuilder_1.VarConfignAssignedValueRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(VarConfignAssignedValue_1.VarConfignAssignedValue, this.deSerializers);
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
                 * Static representation of the {@link variantConfigurationValueId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VARIANT_CONFIGURATION_VALUE_ID: fieldBuilder.buildEdmTypeField('VariantConfigurationValueID', 'Edm.String', false),
                /**
                 * Static representation of the {@link varCnfCharacteristicValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARACTERISTIC_VALUE: fieldBuilder.buildEdmTypeField('VarCnfCharacteristicValue', 'Edm.String', true),
                /**
                 * Static representation of the {@link varCnfCharcValueDescription} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_VALUE_DESCRIPTION: fieldBuilder.buildEdmTypeField('VarCnfCharcValueDescription', 'Edm.String', true),
                /**
                 * Static representation of the {@link varCnfCharcFromQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_FROM_QUANTITY: fieldBuilder.buildEdmTypeField('VarCnfCharcFromQuantity', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link varCnfCharcFromQuantityUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_FROM_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField('VarCnfCharcFromQuantityUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link varCnfCharcFromQuantityIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_FROM_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField('VarCnfCharcFromQuantityISOUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link varCnfCharcToQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_TO_QUANTITY: fieldBuilder.buildEdmTypeField('VarCnfCharcToQuantity', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link varCnfCharcToQuantityUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_TO_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField('VarCnfCharcToQuantityUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link varCnfCharcToQuantityIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_TO_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField('VarCnfCharcToQuantityISOUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link varCnfCharcFromNumericValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_FROM_NUMERIC_VALUE: fieldBuilder.buildEdmTypeField('VarCnfCharcFromNumericValue', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link varCnfCharcToNumericValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_TO_NUMERIC_VALUE: fieldBuilder.buildEdmTypeField('VarCnfCharcToNumericValue', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link varCnfCharcFromDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_FROM_DATE: fieldBuilder.buildEdmTypeField('VarCnfCharcFromDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link varCnfCharcFromTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_FROM_TIME: fieldBuilder.buildEdmTypeField('VarCnfCharcFromTime', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the {@link varCnfCharcFromAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_FROM_AMOUNT: fieldBuilder.buildEdmTypeField('VarCnfCharcFromAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link varCnfCharcToAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_TO_AMOUNT: fieldBuilder.buildEdmTypeField('VarCnfCharcToAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link varCnfCharcCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CNF_CHARC_CURRENCY: fieldBuilder.buildEdmTypeField('VarCnfCharcCurrency', 'Edm.String', true),
                /**
                 * Static representation of the {@link varConfignValueAssignmentType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CONFIGN_VALUE_ASSIGNMENT_TYPE: fieldBuilder.buildEdmTypeField('VarConfignValueAssignmentType', 'Edm.Int32', false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', VarConfignAssignedValue_1.VarConfignAssignedValue)
            };
        }
        return this._schema;
    }
}
exports.VarConfignAssignedValueApi = VarConfignAssignedValueApi;
//# sourceMappingURL=VarConfignAssignedValueApi.js.map