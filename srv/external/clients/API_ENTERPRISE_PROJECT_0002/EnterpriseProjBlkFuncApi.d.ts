/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EnterpriseProjBlkFunc } from './EnterpriseProjBlkFunc';
import { EnterpriseProjBlkFuncRequestBuilder } from './EnterpriseProjBlkFuncRequestBuilder';
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
export declare class EnterpriseProjBlkFuncApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProjBlkFunc<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EnterpriseProjBlkFuncApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [EnterpriseProjectApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof EnterpriseProjBlkFunc;
  requestBuilder(): EnterpriseProjBlkFuncRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EnterpriseProjBlkFunc<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EnterpriseProjBlkFunc<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EnterpriseProjBlkFunc,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    UPDATE_MC: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    ENT_PROJ_TIME_RECG_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_SERVICE_POSTING_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_PURCHASING_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjBlkFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EnterpriseProjBlkFunc<DeSerializers>>;
  };
}
