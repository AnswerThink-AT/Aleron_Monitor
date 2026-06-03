/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EnterpriseProject } from './EnterpriseProject';
import { EnterpriseProjectRequestBuilder } from './EnterpriseProjectRequestBuilder';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
import { EnterpriseProjectJvaApi } from './EnterpriseProjectJvaApi';
import { EnterpriseProjBlkFuncApi } from './EnterpriseProjBlkFuncApi';
import { EntProjectPublicSectorApi } from './EntProjectPublicSectorApi';
import { EnterpriseProjectRoleApi } from './EnterpriseProjectRoleApi';
import { EnterpriseProjectTeamMemberApi } from './EnterpriseProjectTeamMemberApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  Link,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export declare class EnterpriseProjectApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProject<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EnterpriseProjectApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EnterpriseProjectJvaApi<DeSerializersT>,
      EnterpriseProjBlkFuncApi<DeSerializersT>,
      EntProjectPublicSectorApi<DeSerializersT>,
      EnterpriseProjectRoleApi<DeSerializersT>,
      EnterpriseProjectTeamMemberApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EnterpriseProject;
  requestBuilder(): EnterpriseProjectRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EnterpriseProject<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<EnterpriseProject<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof EnterpriseProject, DeSerializersT>;
  private _schema?;
  get schema(): {
    CHANGE_ENT_PROJ_PROCG_STATUS_AC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    COPY_TO_ACTIVE_DOCUMENT_AC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ACTUAL_END_DATE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ACTUAL_START_DATE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    AVAILABILITY_CONTROL_IS_ACTIVE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    AVAILABILITY_CONTROL_PROFILE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    CONTROLLING_AREA_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    COSTING_SHEET_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENTERPRISE_PROJECT_TYPE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_IS_MULTI_SLS_ORD_ITMS_ENBLD_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUNCTIONAL_AREA_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUNCTIONAL_LOCATION_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    INVESTMENT_PROFILE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    IS_BILLING_RELEVANT_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    LOCATION_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PLANT_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PRIORITY_CODE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROFIT_CENTER_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROJECT_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROJECT_CURRENCY_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROJECT_DESCRIPTION_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROJECT_END_DATE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROJECT_PROFILE_CODE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROJECT_START_DATE_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    RESPONSIBLE_COST_CENTER_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    RESULT_ANALYSIS_INTERNAL_ID_FC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    DELETE_MC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_ENTERPRISE_PROJECT_ELEMENT_OC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_ENT_PROJ_BLK_FUNC_OC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_ENT_PROJ_ROLE_OC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_ENT_PROJ_TEAM_MEMBER_OC: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_INTERNAL_ID: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_DESCRIPTION: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENTERPRISE_PROJECT_TYPE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PRIORITY_CODE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_START_DATE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    PROJECT_END_DATE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    ACTUAL_START_DATE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    ACTUAL_END_DATE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    CUSTOMER_UUID: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    ENTERPRISE_PROJECT_SERVICE_ORG: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJECT_IS_CONFIDENTIAL: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    RESTRICTED_TIME_POSTING: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROCESSING_STATUS: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    RESPONSIBLE_COST_CENTER: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_PROFILE_CODE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUNCTIONAL_AREA: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CONTROLLING_AREA: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PLANT: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LOCATION: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_CURRENCY: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    AVAILABILITY_CONTROL_PROFILE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    AVAILABILITY_CONTROL_IS_ACTIVE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    FUNCTIONAL_LOCATION: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_BILLING_RELEVANT: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    INVESTMENT_PROFILE: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    PROJECT_LAST_CHANGED_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGED_BY_USER: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_IS_MULTI_SLS_ORD_ITMS_ENBLD: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    RESULT_ANALYSIS_INTERNAL_ID: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COSTING_SHEET: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATION_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProject<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: Link<
      EnterpriseProject<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectJva} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_JVA: OneToOneLink<
      EnterpriseProject<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectJvaApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEntProjBlkFunc} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_BLK_FUNC: OneToOneLink<
      EnterpriseProject<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjBlkFuncApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEntProjectPublicSector} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJECT_PUBLIC_SECTOR: OneToOneLink<
      EnterpriseProject<DeSerializersT>,
      DeSerializersT,
      EntProjectPublicSectorApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toEntProjRole} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ROLE: Link<
      EnterpriseProject<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectRoleApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toEntProjTeamMember} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_TEAM_MEMBER: Link<
      EnterpriseProject<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectTeamMemberApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EnterpriseProject<DeSerializers>>;
  };
}
