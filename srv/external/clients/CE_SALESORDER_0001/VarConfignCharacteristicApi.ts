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
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export class VarConfignCharacteristicApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<VarConfignCharacteristic<DeSerializersT>, DeSerializersT>
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
  ): VarConfignCharacteristicApi<DeSerializersT> {
    return new VarConfignCharacteristicApi(deSerializers);
  }

  private navigationPropertyFields!: {
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
  };

  _addNavigationProperties(
    linkedApis: [
      VarConfignAssignedValueApi<DeSerializersT>,
      VariantConfigurationInstanceApi<DeSerializersT>,
      VariantConfigurationApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      ASSIGNED_VALUE: new OneToManyLink('_AssignedValue', this, linkedApis[0]),
      INSTANCE: new OneToOneLink('_Instance', this, linkedApis[1]),
      VARIANT_CONFIGURATION: new OneToOneLink(
        '_VariantConfiguration',
        this,
        linkedApis[2]
      )
    };
    return this;
  }

  entityConstructor = VarConfignCharacteristic;

  requestBuilder(): VarConfignCharacteristicRequestBuilder<DeSerializersT> {
    return new VarConfignCharacteristicRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    VarConfignCharacteristic<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    VarConfignCharacteristic<DeSerializersT>,
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
    typeof VarConfignCharacteristic,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        VarConfignCharacteristic,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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
         * Static representation of the {@link charcDataType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CHARC_DATA_TYPE: fieldBuilder.buildEdmTypeField(
          'CharcDataType',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link charcTemplate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CHARC_TEMPLATE: fieldBuilder.buildEdmTypeField(
          'CharcTemplate',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link currency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CURRENCY: fieldBuilder.buildEdmTypeField(
          'Currency',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link charcValueUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CHARC_VALUE_UNIT: fieldBuilder.buildEdmTypeField(
          'CharcValueUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varCnfCharcIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CNF_CHARC_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'VarCnfCharcISOUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isReadOnly} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_READ_ONLY: fieldBuilder.buildEdmTypeField(
          'IsReadOnly',
          'Edm.Boolean',
          false
        ),
        /**
         * Static representation of the {@link entryIsRequired} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENTRY_IS_REQUIRED: fieldBuilder.buildEdmTypeField(
          'EntryIsRequired',
          'Edm.Boolean',
          false
        ),
        /**
         * Static representation of the {@link charcIsHidden} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CHARC_IS_HIDDEN: fieldBuilder.buildEdmTypeField(
          'CharcIsHidden',
          'Edm.Boolean',
          false
        ),
        /**
         * Static representation of the {@link additionalValueIsAllowed} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_VALUE_IS_ALLOWED: fieldBuilder.buildEdmTypeField(
          'AdditionalValueIsAllowed',
          'Edm.Boolean',
          false
        ),
        /**
         * Static representation of the {@link multipleValuesAreAllowed} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MULTIPLE_VALUES_ARE_ALLOWED: fieldBuilder.buildEdmTypeField(
          'MultipleValuesAreAllowed',
          'Edm.Boolean',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', VarConfignCharacteristic)
      };
    }

    return this._schema;
  }
}
