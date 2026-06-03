"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjectTeamMemberApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EnterpriseProjectTeamMember_1 = require("./EnterpriseProjectTeamMember");
const EnterpriseProjectTeamMemberRequestBuilder_1 = require("./EnterpriseProjectTeamMemberRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EnterpriseProjectTeamMemberApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EnterpriseProjectTeamMember_1.EnterpriseProjectTeamMember;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EnterpriseProjectTeamMemberApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENT_PROJ_ENTITLEMENT: new odata_v2_1.Link('to_EntProjEntitlement', this, linkedApis[0]),
            TO_ENTERPRISE_PROJECT: new odata_v2_1.OneToOneLink('to_EnterpriseProject', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new EnterpriseProjectTeamMemberRequestBuilder_1.EnterpriseProjectTeamMemberRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EnterpriseProjectTeamMember_1.EnterpriseProjectTeamMember, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link toEntProjEntitlementOc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TO_ENT_PROJ_ENTITLEMENT_OC: fieldBuilder.buildEdmTypeField('to_EntProjEntitlement_oc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link teamMemberUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TEAM_MEMBER_UUID: fieldBuilder.buildEdmTypeField('TeamMemberUUID', 'Edm.Guid', false),
                /**
                 * Static representation of the {@link businessPartnerUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PARTNER_UUID: fieldBuilder.buildEdmTypeField('BusinessPartnerUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link projectUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_UUID: fieldBuilder.buildEdmTypeField('ProjectUUID', 'Edm.Guid', true),
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
                 * Static representation of the {@link lastChangedByUser} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGED_BY_USER: fieldBuilder.buildEdmTypeField('LastChangedByUser', 'Edm.String', true),
                /**
                 * Static representation of the {@link lastChangeDateTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGE_DATE_TIME: fieldBuilder.buildEdmTypeField('LastChangeDateTime', 'Edm.DateTimeOffset', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EnterpriseProjectTeamMember_1.EnterpriseProjectTeamMember)
            };
        }
        return this._schema;
    }
}
exports.EnterpriseProjectTeamMemberApi = EnterpriseProjectTeamMemberApi;
//# sourceMappingURL=EnterpriseProjectTeamMemberApi.js.map