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
export class VariantConfigurationInstanceApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<VariantConfigurationInstance<DeSerializersT>, DeSerializersT>
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
  ): VariantConfigurationInstanceApi<DeSerializersT> {
    return new VariantConfigurationInstanceApi(deSerializers);
  }

  private navigationPropertyFields!: {
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
  };

  _addNavigationProperties(
    linkedApis: [
      VarConfignCharacteristicApi<DeSerializersT>,
      VariantConfigurationApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      CHARACTERISTIC: new OneToManyLink('_Characteristic', this, linkedApis[0]),
      VARIANT_CONFIGURATION: new OneToOneLink(
        '_VariantConfiguration',
        this,
        linkedApis[1]
      )
    };
    return this;
  }

  entityConstructor = VariantConfigurationInstance;

  requestBuilder(): VariantConfigurationInstanceRequestBuilder<DeSerializersT> {
    return new VariantConfigurationInstanceRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    VariantConfigurationInstance<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      VariantConfigurationInstance<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    VariantConfigurationInstance<DeSerializersT>,
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
    typeof VariantConfigurationInstance,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        VariantConfigurationInstance,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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
         * Static representation of the {@link varConfignParInstceInternalId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CONFIGN_PAR_INSTCE_INTERNAL_ID: fieldBuilder.buildEdmTypeField(
          'VarConfignParInstceInternalID',
          'Edm.Int32',
          false
        ),
        /**
         * Static representation of the {@link product} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRODUCT: fieldBuilder.buildEdmTypeField('Product', 'Edm.String', true),
        /**
         * Static representation of the {@link identifierBomItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IDENTIFIER_BOM_ITEM: fieldBuilder.buildEdmTypeField(
          'IdentifierBOMItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link variantConfigurationQuantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VARIANT_CONFIGURATION_QUANTITY: fieldBuilder.buildEdmTypeField(
          'VariantConfigurationQuantity',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link varConfignQuantityUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CONFIGN_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField(
          'VarConfignQuantityUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link varConfignQuantityIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAR_CONFIGN_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'VarConfignQuantityISOUnit',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', VariantConfigurationInstance)
      };
    }

    return this._schema;
  }
}
