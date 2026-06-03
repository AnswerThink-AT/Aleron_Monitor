"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntTeamMemberEntitlementApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EntTeamMemberEntitlement_1 = require("./EntTeamMemberEntitlement");
const EntTeamMemberEntitlementRequestBuilder_1 = require("./EntTeamMemberEntitlementRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EntTeamMemberEntitlementApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EntTeamMemberEntitlement_1.EntTeamMemberEntitlement;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EntTeamMemberEntitlementApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_TEAM_MEMBER: new odata_v2_1.OneToOneLink('to_TeamMember', this, linkedApis[0]),
            TO_ENTERPRISE_PROJECT: new odata_v2_1.OneToOneLink('to_EnterpriseProject', this, linkedApis[1]),
            TO_ROLE: new odata_v2_1.OneToOneLink('to_Role', this, linkedApis[2])
        };
        return this;
    }
    requestBuilder() {
        return new EntTeamMemberEntitlementRequestBuilder_1.EntTeamMemberEntitlementRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EntTeamMemberEntitlement_1.EntTeamMemberEntitlement, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link deleteMc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DELETE_MC: fieldBuilder.buildEdmTypeField('Delete_mc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link updateMc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UPDATE_MC: fieldBuilder.buildEdmTypeField('Update_mc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link projectEntitlementUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_ENTITLEMENT_UUID: fieldBuilder.buildEdmTypeField('ProjectEntitlementUUID', 'Edm.Guid', false),
                /**
                 * Static representation of the {@link projectUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_UUID: fieldBuilder.buildEdmTypeField('ProjectUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link projectRoleUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_ROLE_UUID: fieldBuilder.buildEdmTypeField('ProjectRoleUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link teamMemberUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TEAM_MEMBER_UUID: fieldBuilder.buildEdmTypeField('TeamMemberUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link projectRoleType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_ROLE_TYPE: fieldBuilder.buildEdmTypeField('ProjectRoleType', 'Edm.String', true),
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
                ALL_FIELDS: new odata_v2_1.AllFields('*', EntTeamMemberEntitlement_1.EntTeamMemberEntitlement)
            };
        }
        return this._schema;
    }
}
exports.EntTeamMemberEntitlementApi = EntTeamMemberEntitlementApi;
//# sourceMappingURL=EntTeamMemberEntitlementApi.js.map