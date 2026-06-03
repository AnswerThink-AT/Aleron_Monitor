/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjectElmntPublicSector } from './EntProjectElmntPublicSector';
import { EntProjectElmntPublicSectorRequestBuilder } from './EntProjectElmntPublicSectorRequestBuilder';
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
export declare class EntProjectElmntPublicSectorApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<EntProjectElmntPublicSector<DeSerializersT>, DeSerializersT>
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
  ): EntProjectElmntPublicSectorApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EntProjectElmntPublicSector;
  requestBuilder(): EntProjectElmntPublicSectorRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntProjectElmntPublicSector<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EntProjectElmntPublicSector<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EntProjectElmntPublicSector,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    FUNCTIONAL_AREA_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUND_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUND_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    GRANT_ID_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    GRANT_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    SPONSORED_PROGRAM_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    FUND: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUND_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    FUNCTIONAL_AREA_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    GRANT_ID: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GRANT_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    SPONSORED_PROGRAM: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjectElmntPublicSector<DeSerializers>>;
  };
}
