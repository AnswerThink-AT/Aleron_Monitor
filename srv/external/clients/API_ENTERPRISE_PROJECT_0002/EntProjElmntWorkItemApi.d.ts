/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntWorkItem } from './EntProjElmntWorkItem';
import { EntProjElmntWorkItemRequestBuilder } from './EntProjElmntWorkItemRequestBuilder';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
import { EntProjElmntCnfgrdWrkItmTxtApi } from './EntProjElmntCnfgrdWrkItmTxtApi';
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
export declare class EntProjElmntWorkItemApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjElmntWorkItem<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EntProjElmntWorkItemApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EntProjElmntWorkItem;
  requestBuilder(): EntProjElmntWorkItemRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntProjElmntWorkItem<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EntProjElmntWorkItem<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof EntProjElmntWorkItem, DeSerializersT>;
  private _schema?;
  get schema(): {
    DELETE_MC: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM_UUID: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM_NAME: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM_IS_INACTIVE: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM_IS_CNFGRD: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_LAST_UPDT_SRCE: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_CRTED_BY_USR: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_CRTN_DTE_TME: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_LST_CHG_BY_USR: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_LST_CHG_DTE_TME: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toConfiguredWorkItemText} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_CONFIGURED_WORK_ITEM_TEXT: Link<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjElmntWorkItem<DeSerializers>>;
  };
}
