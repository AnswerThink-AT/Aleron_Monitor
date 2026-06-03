"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantConfigurationApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const VariantConfiguration_1 = require("./VariantConfiguration");
const VariantConfigurationRequestBuilder_1 = require("./VariantConfigurationRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class VariantConfigurationApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = VariantConfiguration_1.VariantConfiguration;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new VariantConfigurationApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            INSTANCE: new odata_v4_1.OneToManyLink('_Instance', this, linkedApis[0])
        };
        return this;
    }
    requestBuilder() {
        return new VariantConfigurationRequestBuilder_1.VariantConfigurationRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(VariantConfiguration_1.VariantConfiguration, this.deSerializers);
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
                 * Static representation of the {@link varConfignStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAR_CONFIGN_STATUS: fieldBuilder.buildEdmTypeField('VarConfignStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link sapMessages} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SAP_MESSAGES: fieldBuilder.buildCollectionField('SAP__Messages', Sap_Message_1.Sap_Message, false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', VariantConfiguration_1.VariantConfiguration)
            };
        }
        return this._schema;
    }
}
exports.VariantConfigurationApi = VariantConfigurationApi;
//# sourceMappingURL=VariantConfigurationApi.js.map