"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjectJvaApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EnterpriseProjectJva_1 = require("./EnterpriseProjectJva");
const EnterpriseProjectJvaRequestBuilder_1 = require("./EnterpriseProjectJvaRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EnterpriseProjectJvaApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EnterpriseProjectJva_1.EnterpriseProjectJva;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EnterpriseProjectJvaApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENTERPRISE_PROJECT: new odata_v2_1.OneToOneLink('to_EnterpriseProject', this, linkedApis[0])
        };
        return this;
    }
    requestBuilder() {
        return new EnterpriseProjectJvaRequestBuilder_1.EnterpriseProjectJvaRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EnterpriseProjectJva_1.EnterpriseProjectJva, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link jntIntrstBillgClassFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JNT_INTRST_BILLG_CLASS_FC: fieldBuilder.buildEdmTypeField('JntIntrstBillgClass_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link jntIntrstBillgSubClassFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JNT_INTRST_BILLG_SUB_CLASS_FC: fieldBuilder.buildEdmTypeField('JntIntrstBillgSubClass_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link jntVntrProjectTypeFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JNT_VNTR_PROJECT_TYPE_FC: fieldBuilder.buildEdmTypeField('JntVntrProjectType_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link jointVentureFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JOINT_VENTURE_FC: fieldBuilder.buildEdmTypeField('JointVenture_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link jointVentureCostRecoveryCodeFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JOINT_VENTURE_COST_RECOVERY_CODE_FC: fieldBuilder.buildEdmTypeField('JointVentureCostRecoveryCode_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link jointVentureEquityTypeFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JOINT_VENTURE_EQUITY_TYPE_FC: fieldBuilder.buildEdmTypeField('JointVentureEquityType_fc', 'Edm.Byte', true),
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
                 * Static representation of the {@link jointVenture} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JOINT_VENTURE: fieldBuilder.buildEdmTypeField('JointVenture', 'Edm.String', true),
                /**
                 * Static representation of the {@link jointVentureCostRecoveryCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JOINT_VENTURE_COST_RECOVERY_CODE: fieldBuilder.buildEdmTypeField('JointVentureCostRecoveryCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link jointVentureEquityType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JOINT_VENTURE_EQUITY_TYPE: fieldBuilder.buildEdmTypeField('JointVentureEquityType', 'Edm.String', true),
                /**
                 * Static representation of the {@link jntVntrProjectType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JNT_VNTR_PROJECT_TYPE: fieldBuilder.buildEdmTypeField('JntVntrProjectType', 'Edm.String', true),
                /**
                 * Static representation of the {@link jntIntrstBillgClass} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JNT_INTRST_BILLG_CLASS: fieldBuilder.buildEdmTypeField('JntIntrstBillgClass', 'Edm.String', true),
                /**
                 * Static representation of the {@link jntIntrstBillgSubClass} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JNT_INTRST_BILLG_SUB_CLASS: fieldBuilder.buildEdmTypeField('JntIntrstBillgSubClass', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EnterpriseProjectJva_1.EnterpriseProjectJva)
            };
        }
        return this._schema;
    }
}
exports.EnterpriseProjectJvaApi = EnterpriseProjectJvaApi;
//# sourceMappingURL=EnterpriseProjectJvaApi.js.map