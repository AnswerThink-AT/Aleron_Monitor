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
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToOneLink,
  Link
} from '@sap-cloud-sdk/odata-v2';
export class EnterpriseProjectElementApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProjectElement<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ) {
    this.deSerializers = deSerializers;
  }

  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  public static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): EnterpriseProjectElementApi<DeSerializersT> {
    return new EnterpriseProjectElementApi(deSerializers);
  }

  private navigationPropertyFields!: {
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
  };

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
  ): this {
    this.navigationPropertyFields = {
      TO_ENT_PROJECT_ELEMENT_JVA: new OneToOneLink(
        'to_EntProjectElementJVA',
        this,
        linkedApis[0]
      ),
      TO_ENT_PROJECT_ELMNT_PUBLIC_SECTOR: new OneToOneLink(
        'to_EntProjectElmntPublicSector',
        this,
        linkedApis[1]
      ),
      TO_ENT_PROJ_ELMNT_BLK_FUNC: new OneToOneLink(
        'to_EntProjElmntBlkFunc',
        this,
        linkedApis[2]
      ),
      TO_ENT_PROJ_ELMNT_DLVBRL: new Link(
        'to_EntProjElmntDlvbrl',
        this,
        linkedApis[3]
      ),
      TO_ENT_PROJ_ELMNT_WORK_ITEM: new Link(
        'to_EntProjElmntWorkItem',
        this,
        linkedApis[4]
      ),
      TO_PARENT_PROJ_ELEMENT: new OneToOneLink(
        'to_ParentProjElement',
        this,
        linkedApis[5]
      ),
      TO_SUB_PROJ_ELEMENT: new Link('to_SubProjElement', this, linkedApis[6]),
      TO_ENTERPRISE_PROJECT: new OneToOneLink(
        'to_EnterpriseProject',
        this,
        linkedApis[7]
      )
    };
    return this;
  }

  entityConstructor = EnterpriseProjectElement;

  requestBuilder(): EnterpriseProjectElementRequestBuilder<DeSerializersT> {
    return new EnterpriseProjectElementRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EnterpriseProjectElement<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EnterpriseProjectElement<DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<
    typeof EnterpriseProjectElement,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EnterpriseProjectElement,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link changeEntProjElmntPositionAc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CHANGE_ENT_PROJ_ELMNT_POSITION_AC: fieldBuilder.buildEdmTypeField(
          'ChangeEntProjElmntPosition_ac',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link changeEntProjElmntProcgStatusAc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CHANGE_ENT_PROJ_ELMNT_PROCG_STATUS_AC: fieldBuilder.buildEdmTypeField(
          'ChangeEntProjElmntProcgStatus_ac',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link actualEndDateFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACTUAL_END_DATE_FC: fieldBuilder.buildEdmTypeField(
          'ActualEndDate_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link actualStartDateFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACTUAL_START_DATE_FC: fieldBuilder.buildEdmTypeField(
          'ActualStartDate_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link controllingAreaFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONTROLLING_AREA_FC: fieldBuilder.buildEdmTypeField(
          'ControllingArea_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link costCenterFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COST_CENTER_FC: fieldBuilder.buildEdmTypeField(
          'CostCenter_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link costingSheetFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COSTING_SHEET_FC: fieldBuilder.buildEdmTypeField(
          'CostingSheet_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link factoryCalendarFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FACTORY_CALENDAR_FC: fieldBuilder.buildEdmTypeField(
          'FactoryCalendar_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link forecastedEndDateFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FORECASTED_END_DATE_FC: fieldBuilder.buildEdmTypeField(
          'ForecastedEndDate_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link functionalAreaFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUNCTIONAL_AREA_FC: fieldBuilder.buildEdmTypeField(
          'FunctionalArea_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link functionalLocationFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUNCTIONAL_LOCATION_FC: fieldBuilder.buildEdmTypeField(
          'FunctionalLocation_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link investmentProfileFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVESTMENT_PROFILE_FC: fieldBuilder.buildEdmTypeField(
          'InvestmentProfile_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link isMainMilestoneFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_MAIN_MILESTONE_FC: fieldBuilder.buildEdmTypeField(
          'IsMainMilestone_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link locationFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LOCATION_FC: fieldBuilder.buildEdmTypeField(
          'Location_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link milestoneApprovalStatusFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MILESTONE_APPROVAL_STATUS_FC: fieldBuilder.buildEdmTypeField(
          'MilestoneApprovalStatus_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link plannedEndDateFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PLANNED_END_DATE_FC: fieldBuilder.buildEdmTypeField(
          'PlannedEndDate_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link plannedStartDateFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PLANNED_START_DATE_FC: fieldBuilder.buildEdmTypeField(
          'PlannedStartDate_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link plantFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PLANT_FC: fieldBuilder.buildEdmTypeField('Plant_fc', 'Edm.Byte', true),
        /**
         * Static representation of the {@link profitCenterFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROFIT_CENTER_FC: fieldBuilder.buildEdmTypeField(
          'ProfitCenter_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link projectElementFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ELEMENT_FC: fieldBuilder.buildEdmTypeField(
          'ProjectElement_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link projectElementDescriptionFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ELEMENT_DESCRIPTION_FC: fieldBuilder.buildEdmTypeField(
          'ProjectElementDescription_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link responsibleCostCenterFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RESPONSIBLE_COST_CENTER_FC: fieldBuilder.buildEdmTypeField(
          'ResponsibleCostCenter_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link resultAnalysisInternalIdFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RESULT_ANALYSIS_INTERNAL_ID_FC: fieldBuilder.buildEdmTypeField(
          'ResultAnalysisInternalID_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link taxJurisdictionFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_JURISDICTION_FC: fieldBuilder.buildEdmTypeField(
          'TaxJurisdiction_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link wbsElementIsBillingElementFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WBS_ELEMENT_IS_BILLING_ELEMENT_FC: fieldBuilder.buildEdmTypeField(
          'WBSElementIsBillingElement_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link deleteMc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELETE_MC: fieldBuilder.buildEdmTypeField(
          'Delete_mc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link updateMc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UPDATE_MC: fieldBuilder.buildEdmTypeField(
          'Update_mc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link toEntProjElmntBlkFuncOc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_ENT_PROJ_ELMNT_BLK_FUNC_OC: fieldBuilder.buildEdmTypeField(
          'to_EntProjElmntBlkFunc_oc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link toEntProjElmntDlvbrlOc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_ENT_PROJ_ELMNT_DLVBRL_OC: fieldBuilder.buildEdmTypeField(
          'to_EntProjElmntDlvbrl_oc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link toEntProjElmntWorkItemOc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_ENT_PROJ_ELMNT_WORK_ITEM_OC: fieldBuilder.buildEdmTypeField(
          'to_EntProjElmntWorkItem_oc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link toSubProjElementOc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SUB_PROJ_ELEMENT_OC: fieldBuilder.buildEdmTypeField(
          'to_SubProjElement_oc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link projectElementUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ELEMENT_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectElementUUID',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the {@link projectElement} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ELEMENT: fieldBuilder.buildEdmTypeField(
          'ProjectElement',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link wbsElementInternalId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WBS_ELEMENT_INTERNAL_ID: fieldBuilder.buildEdmTypeField(
          'WBSElementInternalID',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link projectUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectUUID',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link projectElementDescription} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ELEMENT_DESCRIPTION: fieldBuilder.buildEdmTypeField(
          'ProjectElementDescription',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link parentObjectUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PARENT_OBJECT_UUID: fieldBuilder.buildEdmTypeField(
          'ParentObjectUUID',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link projectElementOrdinalNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ELEMENT_ORDINAL_NUMBER: fieldBuilder.buildEdmTypeField(
          'ProjectElementOrdinalNumber',
          'Edm.Int32',
          true
        ),
        /**
         * Static representation of the {@link processingStatus} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROCESSING_STATUS: fieldBuilder.buildEdmTypeField(
          'ProcessingStatus',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link entProjectElementType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJECT_ELEMENT_TYPE: fieldBuilder.buildEdmTypeField(
          'EntProjectElementType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link plannedStartDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PLANNED_START_DATE: fieldBuilder.buildEdmTypeField(
          'PlannedStartDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link plannedEndDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PLANNED_END_DATE: fieldBuilder.buildEdmTypeField(
          'PlannedEndDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link actualStartDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACTUAL_START_DATE: fieldBuilder.buildEdmTypeField(
          'ActualStartDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link actualEndDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACTUAL_END_DATE: fieldBuilder.buildEdmTypeField(
          'ActualEndDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link responsibleCostCenter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RESPONSIBLE_COST_CENTER: fieldBuilder.buildEdmTypeField(
          'ResponsibleCostCenter',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link companyCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: fieldBuilder.buildEdmTypeField(
          'CompanyCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link profitCenter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROFIT_CENTER: fieldBuilder.buildEdmTypeField(
          'ProfitCenter',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link functionalArea} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUNCTIONAL_AREA: fieldBuilder.buildEdmTypeField(
          'FunctionalArea',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link controllingArea} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONTROLLING_AREA: fieldBuilder.buildEdmTypeField(
          'ControllingArea',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link plant} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PLANT: fieldBuilder.buildEdmTypeField('Plant', 'Edm.String', true),
        /**
         * Static representation of the {@link location} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LOCATION: fieldBuilder.buildEdmTypeField(
          'Location',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link taxJurisdiction} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_JURISDICTION: fieldBuilder.buildEdmTypeField(
          'TaxJurisdiction',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link functionalLocation} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUNCTIONAL_LOCATION: fieldBuilder.buildEdmTypeField(
          'FunctionalLocation',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link factoryCalendar} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FACTORY_CALENDAR: fieldBuilder.buildEdmTypeField(
          'FactoryCalendar',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link costingSheet} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COSTING_SHEET: fieldBuilder.buildEdmTypeField(
          'CostingSheet',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link investmentProfile} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVESTMENT_PROFILE: fieldBuilder.buildEdmTypeField(
          'InvestmentProfile',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link wbsIsStatisticalWbsElement} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WBS_IS_STATISTICAL_WBS_ELEMENT: fieldBuilder.buildEdmTypeField(
          'WBSIsStatisticalWBSElement',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link costCenter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COST_CENTER: fieldBuilder.buildEdmTypeField(
          'CostCenter',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link wbsElementIsBillingElement} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WBS_ELEMENT_IS_BILLING_ELEMENT: fieldBuilder.buildEdmTypeField(
          'WBSElementIsBillingElement',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link resultAnalysisInternalId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RESULT_ANALYSIS_INTERNAL_ID: fieldBuilder.buildEdmTypeField(
          'ResultAnalysisInternalID',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isProjectMilestone} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_PROJECT_MILESTONE: fieldBuilder.buildEdmTypeField(
          'IsProjectMilestone',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link forecastedEndDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FORECASTED_END_DATE: fieldBuilder.buildEdmTypeField(
          'ForecastedEndDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link milestoneApprovalStatus} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MILESTONE_APPROVAL_STATUS: fieldBuilder.buildEdmTypeField(
          'MilestoneApprovalStatus',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isMainMilestone} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_MAIN_MILESTONE: fieldBuilder.buildEdmTypeField(
          'IsMainMilestone',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link createdByUser} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATED_BY_USER: fieldBuilder.buildEdmTypeField(
          'CreatedByUser',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link creationDateTime} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATION_DATE_TIME: fieldBuilder.buildEdmTypeField(
          'CreationDateTime',
          'Edm.DateTimeOffset',
          true
        ),
        /**
         * Static representation of the {@link lastChangeDateTime} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_CHANGE_DATE_TIME: fieldBuilder.buildEdmTypeField(
          'LastChangeDateTime',
          'Edm.DateTimeOffset',
          true
        ),
        /**
         * Static representation of the {@link lastChangedByUser} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_CHANGED_BY_USER: fieldBuilder.buildEdmTypeField(
          'LastChangedByUser',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EnterpriseProjectElement)
      };
    }

    return this._schema;
  }
}
