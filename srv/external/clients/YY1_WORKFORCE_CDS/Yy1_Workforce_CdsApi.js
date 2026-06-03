"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yy1_Workforce_CdsApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Yy1_Workforce_Cds_1 = require("./Yy1_Workforce_Cds");
const Yy1_Workforce_CdsRequestBuilder_1 = require("./Yy1_Workforce_CdsRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class Yy1_Workforce_CdsApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = Yy1_Workforce_Cds_1.Yy1_Workforce_Cds;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new Yy1_Workforce_CdsApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new Yy1_Workforce_CdsRequestBuilder_1.Yy1_Workforce_CdsRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(Yy1_Workforce_Cds_1.Yy1_Workforce_Cds, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link workforcePersonExternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WORKFORCE_PERSON_EXTERNAL_ID: fieldBuilder.buildEdmTypeField('WorkforcePersonExternalID', 'Edm.String', false),
                /**
                 * Static representation of the {@link firstName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIRST_NAME: fieldBuilder.buildEdmTypeField('FirstName', 'Edm.String', true),
                /**
                 * Static representation of the {@link businessPartner} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', true),
                /**
                 * Static representation of the {@link middleName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MIDDLE_NAME: fieldBuilder.buildEdmTypeField('MiddleName', 'Edm.String', true),
                /**
                 * Static representation of the {@link authorizationGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController10} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_10: fieldBuilder.buildEdmTypeField('DataController10', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController8} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_8: fieldBuilder.buildEdmTypeField('DataController8', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController9} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_9: fieldBuilder.buildEdmTypeField('DataController9', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController7} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_7: fieldBuilder.buildEdmTypeField('DataController7', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController6} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_6: fieldBuilder.buildEdmTypeField('DataController6', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_5: fieldBuilder.buildEdmTypeField('DataController5', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_4: fieldBuilder.buildEdmTypeField('DataController4', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_3: fieldBuilder.buildEdmTypeField('DataController3', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_2: fieldBuilder.buildEdmTypeField('DataController2', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataController1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_1: fieldBuilder.buildEdmTypeField('DataController1', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataControllerSet} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_CONTROLLER_SET: fieldBuilder.buildEdmTypeField('DataControllerSet', 'Edm.String', true),
                /**
                 * Static representation of the {@link isBusinessPurposeCompleted} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_BUSINESS_PURPOSE_COMPLETED: fieldBuilder.buildEdmTypeField('IsBusinessPurposeCompleted', 'Edm.String', true),
                /**
                 * Static representation of the {@link nativePreferredLanguage} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NATIVE_PREFERRED_LANGUAGE: fieldBuilder.buildEdmTypeField('NativePreferredLanguage', 'Edm.String', true),
                /**
                 * Static representation of the {@link initials} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INITIALS: fieldBuilder.buildEdmTypeField('Initials', 'Edm.String', true),
                /**
                 * Static representation of the {@link birthName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BIRTH_NAME: fieldBuilder.buildEdmTypeField('BirthName', 'Edm.String', true),
                /**
                 * Static representation of the {@link fullName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FULL_NAME: fieldBuilder.buildEdmTypeField('FullName', 'Edm.String', true),
                /**
                 * Static representation of the {@link lastName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_NAME: fieldBuilder.buildEdmTypeField('LastName', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', Yy1_Workforce_Cds_1.Yy1_Workforce_Cds)
            };
        }
        return this._schema;
    }
}
exports.Yy1_Workforce_CdsApi = Yy1_Workforce_CdsApi;
//# sourceMappingURL=Yy1_Workforce_CdsApi.js.map