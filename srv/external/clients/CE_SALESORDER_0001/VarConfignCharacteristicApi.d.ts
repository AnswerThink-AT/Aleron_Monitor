/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { VarConfignCharacteristic } from './VarConfignCharacteristic';
import { VarConfignCharacteristicRequestBuilder } from './VarConfignCharacteristicRequestBuilder';
import { VarConfignAssignedValueApi } from './VarConfignAssignedValueApi';
import { VariantConfigurationInstanceApi } from './VariantConfigurationInstanceApi';
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
export declare class VarConfignCharacteristicApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<VarConfignCharacteristic<DeSerializersT>, DeSerializersT>
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
  ): VarConfignCharacteristicApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      VarConfignAssignedValueApi<DeSerializersT>,
      VariantConfigurationInstanceApi<DeSerializersT>,
      VariantConfigurationApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof VarConfignCharacteristic;
  requestBuilder(): VarConfignCharacteristicRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    VarConfignCharacteristic<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    VarConfignCharacteristic<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof VarConfignCharacteristic,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    VAR_CONFIGURATION_BUS_OBJECT_KEY: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CONFIGURATION_BUS_OBJECT_TYPE: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CONFIGN_INSTCE_INTERNAL_ID: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      false,
      true
    >;
    CHARACTERISTIC: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CHARC_DATA_TYPE: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CHARC_TEMPLATE: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CURRENCY: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CHARC_VALUE_UNIT: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CNF_CHARC_ISO_UNIT: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_READ_ONLY: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    ENTRY_IS_REQUIRED: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CHARC_IS_HIDDEN: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    ADDITIONAL_VALUE_IS_ALLOWED: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    MULTIPLE_VALUES_ARE_ALLOWED: OrderableEdmTypeField<
      VarConfignCharacteristic<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link assignedValue} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ASSIGNED_VALUE: OneToManyLink<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT,
      VarConfignAssignedValueApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link instance} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    INSTANCE: OneToOneLink<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT,
      VariantConfigurationInstanceApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link variantConfiguration} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    VARIANT_CONFIGURATION: OneToOneLink<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT,
      VariantConfigurationApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<VarConfignCharacteristic<DeSerializers>>;
  };
}
