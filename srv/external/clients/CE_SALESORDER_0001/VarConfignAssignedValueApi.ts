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
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  Time,
  OrderableEdmTypeField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export class VarConfignAssignedValueApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<VarConfignAssignedValue<DeSerializersT>, DeSerializersT>
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
  ): VarConfignAssignedValueApi<DeSerializersT> {
    return new VarConfignAssignedValueApi(deSerializers);
  }

  private navigationPropertyFields!: {
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
  };

  _addNavigationProperties(
    linkedApis: [
      VarConfignCharacteristicApi<DeSerializersT>,
      VariantConfigurationApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      CHARACTERISTIC_1: new OneToOneLink(
        '_Characteristic',
        this,
        linkedApis[0]
      ),
      VARIANT_CONFIGURATION: new OneToOneLink(
        '_VariantConfiguration',
        this,
        linkedApis[1]
      )
    };
    return this;
  }

  entityConstructor = VarConfignAssignedValue;

  requestBuilder(): VarConfignAssignedValueRequestBuilder<DeSerializersT> {
    return new VarConfignAssignedValueRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    VarConfignAssignedValue<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      VarConfignAssignedValue<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    VarConfignAssignedValue<DeSerializersT>,
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
    typeof VarConfignAssignedValue,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        VarConfignAssignedValue,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link varConfigurationBusObjectKey} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CONFIGURATION_BUS_OBJECT_KEY: fieldBuilder.buildEdmTypeField(
          'VarConfigurationBusObjectKey',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link varConfigurationBusObjectType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CONFIGURATION_BUS_OBJECT_TYPE: fieldBuilder.buildEdmTypeField(
          'VarConfigurationBusObjectType',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link varConfignInstceInternalId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CONFIGN_INSTCE_INTERNAL_ID: fieldBuilder.buildEdmTypeField(
          'VarConfignInstceInternalID',
          'Edm.Int32',
          false
        ),
        /**
         * Static representation of the {@link characteristic} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CHARACTERISTIC: fieldBuilder.buildEdmTypeField(
          'Characteristic',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link variantConfigurationValueId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VARIANT_CONFIGURATION_VALUE_ID: fieldBuilder.buildEdmTypeField(
          'VariantConfigurationValueID',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link varCnfCharacteristicValue} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARACTERISTIC_VALUE: fieldBuilder.buildEdmTypeField(
          'VarCnfCharacteristicValue',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcValueDescription} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_VALUE_DESCRIPTION: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcValueDescription',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcFromQuantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_FROM_QUANTITY: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcFromQuantity',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcFromQuantityUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_FROM_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcFromQuantityUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcFromQuantityIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_FROM_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcFromQuantityISOUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcToQuantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_TO_QUANTITY: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcToQuantity',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcToQuantityUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_TO_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcToQuantityUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcToQuantityIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_TO_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcToQuantityISOUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcFromNumericValue} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_FROM_NUMERIC_VALUE: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcFromNumericValue',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcToNumericValue} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_TO_NUMERIC_VALUE: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcToNumericValue',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcFromDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_FROM_DATE: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcFromDate',
          'Edm.Date',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcFromTime} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_FROM_TIME: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcFromTime',
          'Edm.TimeOfDay',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcFromAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_FROM_AMOUNT: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcFromAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcToAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_TO_AMOUNT: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcToAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcCurrency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_CURRENCY: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcCurrency',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varConfignValueAssignmentType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CONFIGN_VALUE_ASSIGNMENT_TYPE: fieldBuilder.buildEdmTypeField(
          'VarConfignValueAssignmentType',
          'Edm.Int32',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', VarConfignAssignedValue)
      };
    }

    return this._schema;
  }
}
