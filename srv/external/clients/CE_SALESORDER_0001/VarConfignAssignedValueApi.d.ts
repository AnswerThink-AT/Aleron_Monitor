/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { VarConfignAssignedValue } from './VarConfignAssignedValue';
import { VarConfignAssignedValueRequestBuilder } from './VarConfignAssignedValueRequestBuilder';
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
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class VarConfignAssignedValueApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<VarConfignAssignedValue<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): VarConfignAssignedValueApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      VarConfignCharacteristicApi<DeSerializersT>,
      VariantConfigurationApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof VarConfignAssignedValue;
  requestBuilder(): VarConfignAssignedValueRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    VarConfignAssignedValue<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    VarConfignAssignedValue<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof VarConfignAssignedValue,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    VAR_CONFIGURATION_BUS_OBJECT_KEY: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CONFIGURATION_BUS_OBJECT_TYPE: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CONFIGN_INSTCE_INTERNAL_ID: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      false,
      true
    >;
    CHARACTERISTIC: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VARIANT_CONFIGURATION_VALUE_ID: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CNF_CHARACTERISTIC_VALUE: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CNF_CHARC_VALUE_DESCRIPTION: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CNF_CHARC_FROM_QUANTITY: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    VAR_CNF_CHARC_FROM_QUANTITY_UNIT: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CNF_CHARC_FROM_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CNF_CHARC_TO_QUANTITY: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    VAR_CNF_CHARC_TO_QUANTITY_UNIT: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CNF_CHARC_TO_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CNF_CHARC_FROM_NUMERIC_VALUE: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    VAR_CNF_CHARC_TO_NUMERIC_VALUE: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    VAR_CNF_CHARC_FROM_DATE: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    VAR_CNF_CHARC_FROM_TIME: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      true,
      true
    >;
    VAR_CNF_CHARC_FROM_AMOUNT: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    VAR_CNF_CHARC_TO_AMOUNT: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    VAR_CNF_CHARC_CURRENCY: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAR_CONFIGN_VALUE_ASSIGNMENT_TYPE: OrderableEdmTypeField<
      VarConfignAssignedValue<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link characteristic_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CHARACTERISTIC_1: OneToOneLink<
      VarConfignAssignedValue<DeSerializersT>,
      DeSerializersT,
      VarConfignCharacteristicApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link variantConfiguration} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    VARIANT_CONFIGURATION: OneToOneLink<
      VarConfignAssignedValue<DeSerializersT>,
      DeSerializersT,
      VariantConfigurationApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<VarConfignAssignedValue<DeSerializers>>;
  };
}
