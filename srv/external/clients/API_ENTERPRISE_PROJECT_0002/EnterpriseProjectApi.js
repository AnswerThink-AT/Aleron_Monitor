"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseProjectApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EnterpriseProject_1 = require("./EnterpriseProject");
const EnterpriseProjectRequestBuilder_1 = require("./EnterpriseProjectRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class EnterpriseProjectApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = EnterpriseProject_1.EnterpriseProject;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new EnterpriseProjectApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ENTERPRISE_PROJECT_ELEMENT: new odata_v2_1.Link('to_EnterpriseProjectElement', this, linkedApis[0]),
            TO_ENTERPRISE_PROJECT_JVA: new odata_v2_1.OneToOneLink('to_EnterpriseProjectJVA', this, linkedApis[1]),
            TO_ENT_PROJ_BLK_FUNC: new odata_v2_1.OneToOneLink('to_EntProjBlkFunc', this, linkedApis[2]),
            TO_ENT_PROJECT_PUBLIC_SECTOR: new odata_v2_1.OneToOneLink('to_EntProjectPublicSector', this, linkedApis[3]),
            TO_ENT_PROJ_ROLE: new odata_v2_1.Link('to_EntProjRole', this, linkedApis[4]),
            TO_ENT_PROJ_TEAM_MEMBER: new odata_v2_1.Link('to_EntProjTeamMember', this, linkedApis[5])
        };
        return this;
    }
    requestBuilder() {
        return new EnterpriseProjectRequestBuilder_1.EnterpriseProjectRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(EnterpriseProject_1.EnterpriseProject, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link changeEntProjProcgStatusAc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHANGE_ENT_PROJ_PROCG_STATUS_AC: fieldBuilder.buildEdmTypeField('ChangeEntProjProcgStatus_ac', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link copyToActiveDocumentAc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COPY_TO_ACTIVE_DOCUMENT_AC: fieldBuilder.buildEdmTypeField('CopyToActiveDocument_ac', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link actualEndDateFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACTUAL_END_DATE_FC: fieldBuilder.buildEdmTypeField('ActualEndDate_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link actualStartDateFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACTUAL_START_DATE_FC: fieldBuilder.buildEdmTypeField('ActualStartDate_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link availabilityControlIsActiveFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                AVAILABILITY_CONTROL_IS_ACTIVE_FC: fieldBuilder.buildEdmTypeField('AvailabilityControlIsActive_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link availabilityControlProfileFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                AVAILABILITY_CONTROL_PROFILE_FC: fieldBuilder.buildEdmTypeField('AvailabilityControlProfile_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link controllingAreaFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONTROLLING_AREA_FC: fieldBuilder.buildEdmTypeField('ControllingArea_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link costingSheetFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COSTING_SHEET_FC: fieldBuilder.buildEdmTypeField('CostingSheet_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link enterpriseProjectTypeFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENTERPRISE_PROJECT_TYPE_FC: fieldBuilder.buildEdmTypeField('EnterpriseProjectType_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link entProjIsMultiSlsOrdItmsEnbldFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_IS_MULTI_SLS_ORD_ITMS_ENBLD_FC: fieldBuilder.buildEdmTypeField('EntProjIsMultiSlsOrdItmsEnbld_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link functionalAreaFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNCTIONAL_AREA_FC: fieldBuilder.buildEdmTypeField('FunctionalArea_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link functionalLocationFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNCTIONAL_LOCATION_FC: fieldBuilder.buildEdmTypeField('FunctionalLocation_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link investmentProfileFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVESTMENT_PROFILE_FC: fieldBuilder.buildEdmTypeField('InvestmentProfile_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link isBillingRelevantFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_BILLING_RELEVANT_FC: fieldBuilder.buildEdmTypeField('IsBillingRelevant_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link locationFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LOCATION_FC: fieldBuilder.buildEdmTypeField('Location_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link plantFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PLANT_FC: fieldBuilder.buildEdmTypeField('Plant_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link priorityCodeFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRIORITY_CODE_FC: fieldBuilder.buildEdmTypeField('PriorityCode_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link profitCenterFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROFIT_CENTER_FC: fieldBuilder.buildEdmTypeField('ProfitCenter_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link projectFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_FC: fieldBuilder.buildEdmTypeField('Project_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link projectCurrencyFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_CURRENCY_FC: fieldBuilder.buildEdmTypeField('ProjectCurrency_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link projectDescriptionFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_DESCRIPTION_FC: fieldBuilder.buildEdmTypeField('ProjectDescription_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link projectEndDateFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_END_DATE_FC: fieldBuilder.buildEdmTypeField('ProjectEndDate_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link projectProfileCodeFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_PROFILE_CODE_FC: fieldBuilder.buildEdmTypeField('ProjectProfileCode_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link projectStartDateFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_START_DATE_FC: fieldBuilder.buildEdmTypeField('ProjectStartDate_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link responsibleCostCenterFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RESPONSIBLE_COST_CENTER_FC: fieldBuilder.buildEdmTypeField('ResponsibleCostCenter_fc', 'Edm.Byte', true),
                /**
                 * Static representation of the {@link resultAnalysisInternalIdFc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RESULT_ANALYSIS_INTERNAL_ID_FC: fieldBuilder.buildEdmTypeField('ResultAnalysisInternalID_fc', 'Edm.Byte', true),
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
                 * Static representation of the {@link toEnterpriseProjectElementOc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TO_ENTERPRISE_PROJECT_ELEMENT_OC: fieldBuilder.buildEdmTypeField('to_EnterpriseProjectElement_oc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link toEntProjBlkFuncOc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TO_ENT_PROJ_BLK_FUNC_OC: fieldBuilder.buildEdmTypeField('to_EntProjBlkFunc_oc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link toEntProjRoleOc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TO_ENT_PROJ_ROLE_OC: fieldBuilder.buildEdmTypeField('to_EntProjRole_oc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link toEntProjTeamMemberOc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TO_ENT_PROJ_TEAM_MEMBER_OC: fieldBuilder.buildEdmTypeField('to_EntProjTeamMember_oc', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link projectUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_UUID: fieldBuilder.buildEdmTypeField('ProjectUUID', 'Edm.Guid', false),
                /**
                 * Static representation of the {@link projectInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_INTERNAL_ID: fieldBuilder.buildEdmTypeField('ProjectInternalID', 'Edm.String', true),
                /**
                 * Static representation of the {@link project} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT: fieldBuilder.buildEdmTypeField('Project', 'Edm.String', true),
                /**
                 * Static representation of the {@link projectDescription} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_DESCRIPTION: fieldBuilder.buildEdmTypeField('ProjectDescription', 'Edm.String', true),
                /**
                 * Static representation of the {@link enterpriseProjectType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENTERPRISE_PROJECT_TYPE: fieldBuilder.buildEdmTypeField('EnterpriseProjectType', 'Edm.String', true),
                /**
                 * Static representation of the {@link priorityCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRIORITY_CODE: fieldBuilder.buildEdmTypeField('PriorityCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link projectStartDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_START_DATE: fieldBuilder.buildEdmTypeField('ProjectStartDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link projectEndDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_END_DATE: fieldBuilder.buildEdmTypeField('ProjectEndDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link actualStartDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACTUAL_START_DATE: fieldBuilder.buildEdmTypeField('ActualStartDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link actualEndDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACTUAL_END_DATE: fieldBuilder.buildEdmTypeField('ActualEndDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link customerUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_UUID: fieldBuilder.buildEdmTypeField('CustomerUUID', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link enterpriseProjectServiceOrg} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENTERPRISE_PROJECT_SERVICE_ORG: fieldBuilder.buildEdmTypeField('EnterpriseProjectServiceOrg', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjectIsConfidential} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJECT_IS_CONFIDENTIAL: fieldBuilder.buildEdmTypeField('EntProjectIsConfidential', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link restrictedTimePosting} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RESTRICTED_TIME_POSTING: fieldBuilder.buildEdmTypeField('RestrictedTimePosting', 'Edm.String', true),
                /**
                 * Static representation of the {@link processingStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROCESSING_STATUS: fieldBuilder.buildEdmTypeField('ProcessingStatus', 'Edm.String', true),
                /**
                 * Static representation of the {@link responsibleCostCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RESPONSIBLE_COST_CENTER: fieldBuilder.buildEdmTypeField('ResponsibleCostCenter', 'Edm.String', true),
                /**
                 * Static representation of the {@link profitCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROFIT_CENTER: fieldBuilder.buildEdmTypeField('ProfitCenter', 'Edm.String', true),
                /**
                 * Static representation of the {@link projectProfileCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_PROFILE_CODE: fieldBuilder.buildEdmTypeField('ProjectProfileCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link functionalArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNCTIONAL_AREA: fieldBuilder.buildEdmTypeField('FunctionalArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link companyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link controllingArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONTROLLING_AREA: fieldBuilder.buildEdmTypeField('ControllingArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link plant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PLANT: fieldBuilder.buildEdmTypeField('Plant', 'Edm.String', true),
                /**
                 * Static representation of the {@link location} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LOCATION: fieldBuilder.buildEdmTypeField('Location', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxJurisdiction} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_JURISDICTION: fieldBuilder.buildEdmTypeField('TaxJurisdiction', 'Edm.String', true),
                /**
                 * Static representation of the {@link projectCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_CURRENCY: fieldBuilder.buildEdmTypeField('ProjectCurrency', 'Edm.String', true),
                /**
                 * Static representation of the {@link availabilityControlProfile} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                AVAILABILITY_CONTROL_PROFILE: fieldBuilder.buildEdmTypeField('AvailabilityControlProfile', 'Edm.String', true),
                /**
                 * Static representation of the {@link availabilityControlIsActive} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                AVAILABILITY_CONTROL_IS_ACTIVE: fieldBuilder.buildEdmTypeField('AvailabilityControlIsActive', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link functionalLocation} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNCTIONAL_LOCATION: fieldBuilder.buildEdmTypeField('FunctionalLocation', 'Edm.String', true),
                /**
                 * Static representation of the {@link isBillingRelevant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_BILLING_RELEVANT: fieldBuilder.buildEdmTypeField('IsBillingRelevant', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link investmentProfile} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVESTMENT_PROFILE: fieldBuilder.buildEdmTypeField('InvestmentProfile', 'Edm.String', true),
                /**
                 * Static representation of the {@link lastChangeDateTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGE_DATE_TIME: fieldBuilder.buildEdmTypeField('LastChangeDateTime', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link projectLastChangedDateTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_LAST_CHANGED_DATE_TIME: fieldBuilder.buildEdmTypeField('ProjectLastChangedDateTime', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link lastChangedByUser} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGED_BY_USER: fieldBuilder.buildEdmTypeField('LastChangedByUser', 'Edm.String', true),
                /**
                 * Static representation of the {@link entProjIsMultiSlsOrdItmsEnbld} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENT_PROJ_IS_MULTI_SLS_ORD_ITMS_ENBLD: fieldBuilder.buildEdmTypeField('EntProjIsMultiSlsOrdItmsEnbld', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link resultAnalysisInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RESULT_ANALYSIS_INTERNAL_ID: fieldBuilder.buildEdmTypeField('ResultAnalysisInternalID', 'Edm.String', true),
                /**
                 * Static representation of the {@link costingSheet} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COSTING_SHEET: fieldBuilder.buildEdmTypeField('CostingSheet', 'Edm.String', true),
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
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', EnterpriseProject_1.EnterpriseProject)
            };
        }
        return this._schema;
    }
}
exports.EnterpriseProjectApi = EnterpriseProjectApi;
//# sourceMappingURL=EnterpriseProjectApi.js.map