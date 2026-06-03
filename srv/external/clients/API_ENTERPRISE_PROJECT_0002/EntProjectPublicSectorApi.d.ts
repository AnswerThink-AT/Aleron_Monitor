/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjectPublicSector } from './EntProjectPublicSector';
import { EntProjectPublicSectorRequestBuilder } from './EntProjectPublicSectorRequestBuilder';
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
export declare class EntProjectPublicSectorApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjectPublicSector<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EntProjectPublicSectorApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [EnterpriseProjectApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof EntProjectPublicSector;
  requestBuilder(): EntProjectPublicSectorRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntProjectPublicSector<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EntProjectPublicSector<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EntProjectPublicSector,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    FUNCTIONAL_AREA_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUND_FC: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUND_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    GRANT_ID_FC: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    GRANT_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    SPONSORED_PROGRAM_FC: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    FUND: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUND_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    FUNCTIONAL_AREA_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    GRANT_ID: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GRANT_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    SPONSORED_PROGRAM: OrderableEdmTypeField<
      EntProjectPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjectPublicSector<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjectPublicSector<DeSerializers>>;
  };
}
