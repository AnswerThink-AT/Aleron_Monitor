/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { VariantConfigurationInstance } from './VariantConfigurationInstance';
import { VariantConfigurationInstanceRequestBuilder } from './VariantConfigurationInstanceRequestBuilder';
import { VarConfignCharacteristicApi } from './VarConfignCharacteristicApi';
import { VariantConfigurationApi } from './VariantConfigurationApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class VariantConfigurationInstanceApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<VariantConfigurationInstance<DeSerializersT>, DeSerializersT>
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
  ): VariantConfigurationInstanceApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      VarConfignCharacteristicApi<DeSerializersT>,
      VariantConfigurationApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof VariantConfigurationInstance;
  requestBuilder(): VariantConfigurationInstanceRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    VariantConfigurationInstance<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    VariantConfigurationInstance<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof VariantConfigurationInstance,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    VAR_CONFIGURATION_BUS_OBJECT_KEY: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CONFIGURATION_BUS_OBJECT_TYPE: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CONFIGN_INSTCE_INTERNAL_ID: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      false,
      true
    >;
    VAR_CONFIGN_PAR_INSTCE_INTERNAL_ID: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      false,
      true
    >;
    PRODUCT: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IDENTIFIER_BOM_ITEM: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VARIANT_CONFIGURATION_QUANTITY: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    VAR_CONFIGN_QUANTITY_UNIT: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CONFIGN_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      VariantConfigurationInstance<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link characteristic} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CHARACTERISTIC: OneToManyLink<
      VariantConfigurationInstance<DeSerializersT>,
      DeSerializersT,
      VarConfignCharacteristicApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link variantConfiguration} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    VARIANT_CONFIGURATION: OneToOneLink<
      VariantConfigurationInstance<DeSerializersT>,
      DeSerializersT,
      VariantConfigurationApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<VariantConfigurationInstance<DeSerializers>>;
  };
}
