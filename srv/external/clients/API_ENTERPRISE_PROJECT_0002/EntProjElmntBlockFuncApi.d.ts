/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntBlockFunc } from './EntProjElmntBlockFunc';
import { EntProjElmntBlockFuncRequestBuilder } from './EntProjElmntBlockFuncRequestBuilder';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
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
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export declare class EntProjElmntBlockFuncApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjElmntBlockFunc<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EntProjElmntBlockFuncApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EntProjElmntBlockFunc;
  requestBuilder(): EntProjElmntBlockFuncRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntProjElmntBlockFunc<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EntProjElmntBlockFunc<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EntProjElmntBlockFunc,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_PURCHASING_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_SERVICE_POSTING_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_TIME_RECG_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    ENT_PROJ_TIME_RECG_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_SERVICE_POSTING_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_PURCHASING_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjElmntBlockFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjElmntBlockFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjElmntBlockFunc<DeSerializers>>;
  };
}
