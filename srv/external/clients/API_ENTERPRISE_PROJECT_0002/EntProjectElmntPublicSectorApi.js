"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntProjectElmntPublicSectorApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EntProjectElmntPublicSector_1 = require("./EntProjectElmntPublicSector");
const EntProjectElmntPublicSectorRequestBuilder_1 = require("./EntProjectElmntPublicSectorRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EntProjectElmntPublicSectorApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EntProjectElmntPublicSector_1.EntProjectElmntPublicSector;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EntProjectElmntPublicSectorApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENTERPRISE_PROJECT_ELEMENT: new odata_v2_1.OneToOneLink('to_EnterpriseProjectElement', this, linkedApis[0]),
            TO_ENTERPRISE_PROJECT: new odata_v2_1.OneToOneLink('to_EnterpriseProject', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new EntProjectElmntPublicSectorRequestBuilder_1.EntProjectElmntPublicSectorRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EntProjectElmntPublicSector_1.EntProjectElmntPublicSector, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link functionalAreaIsFixAssignedFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNCTIONAL_AREA_IS_FIX_ASSIGNED_FC: fieldBuilder.buildEdmTypeField('FunctionalAreaIsFixAssigned_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link fundFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUND_FC: fieldBuilder.buildEdmTypeField('Fund_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link fundIsFixAssignedFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUND_IS_FIX_ASSIGNED_FC: fieldBuilder.buildEdmTypeField('FundIsFixAssigned_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link grantIdFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GRANT_ID_FC: fieldBuilder.buildEdmTypeField('GrantID_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link grantIsFixAssignedFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GRANT_IS_FIX_ASSIGNED_FC: fieldBuilder.buildEdmTypeField('GrantIsFixAssigned_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link sponsoredProgramFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SPONSORED_PROGRAM_FC: fieldBuilder.buildEdmTypeField('SponsoredProgram_fc', 'Edm.Byte', true),
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
                 * Static representation of the {@link fund} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUND: fieldBuilder.buildEdmTypeField('Fund', 'Edm.String', true),
                /**
                 * Static representation of the {@link fundIsFixAssigned} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUND_IS_FIX_ASSIGNED: fieldBuilder.buildEdmTypeField('FundIsFixAssigned', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link functionalAreaIsFixAssigned} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNCTIONAL_AREA_IS_FIX_ASSIGNED: fieldBuilder.buildEdmTypeField('FunctionalAreaIsFixAssigned', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link grantId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GRANT_ID: fieldBuilder.buildEdmTypeField('GrantID', 'Edm.String', true),
                /**
                 * Static representation of the {@link grantIsFixAssigned} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GRANT_IS_FIX_ASSIGNED: fieldBuilder.buildEdmTypeField('GrantIsFixAssigned', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link sponsoredProgram} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SPONSORED_PROGRAM: fieldBuilder.buildEdmTypeField('SponsoredProgram', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EntProjectElmntPublicSector_1.EntProjectElmntPublicSector)
            };
        }
        return this._schema;
    }
}
exports.EntProjectElmntPublicSectorApi = EntProjectElmntPublicSectorApi;
//# sourceMappingURL=EntProjectElmntPublicSectorApi.js.map