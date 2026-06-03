/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EnterpriseProjectElement } from './EnterpriseProjectElement';
import { EnterpriseProjectElementRequestBuilder } from './EnterpriseProjectElementRequestBuilder';
import { EntProjectElementJvaApi } from './EntProjectElementJvaApi';
import { EntProjectElmntPublicSectorApi } from './EntProjectElmntPublicSectorApi';
import { EntProjElmntBlockFuncApi } from './EntProjElmntBlockFuncApi';
import { EntProjElmntDlvbrlApi } from './EntProjElmntDlvbrlApi';
import { EntProjElmntWorkItemApi } from './EntProjElmntWorkItemApi';
import { EnterpriseProjectApi } from './EnterpriseProjectApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToOneLink,
  Link
} from '@sap-cloud-sdk/odata-v2';
export declare class EnterpriseProjectElementApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProjectElement<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers?: DeSerializersT
  ): EnterpriseProjectElementApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EntProjectElementJvaApi<DeSerializersT>,
      EntProjectElmntPublicSectorApi<DeSerializersT>,
      EntProjElmntBlockFuncApi<DeSerializersT>,
      EntProjElmntDlvbrlApi<DeSerializersT>,
      EntProjElmntWorkItemApi<DeSerializersT>,
      EnterpriseProjectElementApi<DeSerializersT>,
      EnterpriseProjectElementApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EnterpriseProjectElement;
  requestBuilder(): EnterpriseProjectElementRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EnterpriseProjectElement<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EnterpriseProjectElement<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EnterpriseProjectElement,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    CHANGE_ENT_PROJ_ELMNT_POSITION_AC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    CHANGE_ENT_PROJ_ELMNT_PROCG_STATUS_AC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ACTUAL_END_DATE_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ACTUAL_START_DATE_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    CONTROLLING_AREA_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    COST_CENTER_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    COSTING_SHEET_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FACTORY_CALENDAR_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FORECASTED_END_DATE_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUNCTIONAL_AREA_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUNCTIONAL_LOCATION_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    INVESTMENT_PROFILE_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    IS_MAIN_MILESTONE_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    LOCATION_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    MILESTONE_APPROVAL_STATUS_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PLANNED_END_DATE_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PLANNED_START_DATE_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PLANT_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROFIT_CENTER_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROJECT_ELEMENT_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    PROJECT_ELEMENT_DESCRIPTION_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    RESPONSIBLE_COST_CENTER_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    RESULT_ANALYSIS_INTERNAL_ID_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    TAX_JURISDICTION_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    WBS_ELEMENT_IS_BILLING_ELEMENT_FC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    DELETE_MC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_ENT_PROJ_ELMNT_BLK_FUNC_OC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_ENT_PROJ_ELMNT_DLVBRL_OC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_ENT_PROJ_ELMNT_WORK_ITEM_OC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_SUB_PROJ_ELEMENT_OC: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_ELEMENT: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WBS_ELEMENT_INTERNAL_ID: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ELEMENT_DESCRIPTION: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PARENT_OBJECT_UUID: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ELEMENT_ORDINAL_NUMBER: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      true,
      true
    >;
    PROCESSING_STATUS: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJECT_ELEMENT_TYPE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PLANNED_START_DATE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    PLANNED_END_DATE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    ACTUAL_START_DATE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    ACTUAL_END_DATE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    RESPONSIBLE_COST_CENTER: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUNCTIONAL_AREA: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CONTROLLING_AREA: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PLANT: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LOCATION: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUNCTIONAL_LOCATION: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FACTORY_CALENDAR: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COSTING_SHEET: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVESTMENT_PROFILE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WBS_IS_STATISTICAL_WBS_ELEMENT: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    COST_CENTER: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WBS_ELEMENT_IS_BILLING_ELEMENT: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    RESULT_ANALYSIS_INTERNAL_ID: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_PROJECT_MILESTONE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FORECASTED_END_DATE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    MILESTONE_APPROVAL_STATUS: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_MAIN_MILESTONE: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATION_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGED_BY_USER: OrderableEdmTypeField<
      EnterpriseProjectElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEntProjectElementJva} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJECT_ELEMENT_JVA: OneToOneLink<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT,
      EntProjectElementJvaApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEntProjectElmntPublicSector} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJECT_ELMNT_PUBLIC_SECTOR: OneToOneLink<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT,
      EntProjectElmntPublicSectorApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEntProjElmntBlkFunc} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ELMNT_BLK_FUNC: OneToOneLink<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT,
      EntProjElmntBlockFuncApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toEntProjElmntDlvbrl} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ELMNT_DLVBRL: Link<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT,
      EntProjElmntDlvbrlApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toEntProjElmntWorkItem} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ELMNT_WORK_ITEM: Link<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT,
      EntProjElmntWorkItemApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toParentProjElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_PARENT_PROJ_ELEMENT: OneToOneLink<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSubProjElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUB_PROJ_ELEMENT: Link<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EnterpriseProjectElement<DeSerializers>>;
  };
}
