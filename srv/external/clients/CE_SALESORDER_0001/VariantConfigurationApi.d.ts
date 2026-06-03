/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { VariantConfiguration } from './VariantConfiguration';
import { VariantConfigurationRequestBuilder } from './VariantConfigurationRequestBuilder';
import { VariantConfigurationInstanceApi } from './VariantConfigurationInstanceApi';
import { Sap_Message } from './Sap_Message';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  CollectionField,
  OneToManyLink
} from '@sap-cloud-sdk/odata-v4';
export declare class VariantConfigurationApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<VariantConfiguration<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): VariantConfigurationApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [VariantConfigurationInstanceApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof VariantConfiguration;
  requestBuilder(): VariantConfigurationRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    VariantConfiguration<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    VariantConfiguration<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof VariantConfiguration, DeSerializersT>;
  private _schema?;
  get schema(): {
    VAR_CONFIGURATION_BUS_OBJECT_KEY: OrderableEdmTypeField<
      VariantConfiguration<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CONFIGURATION_BUS_OBJECT_TYPE: OrderableEdmTypeField<
      VariantConfiguration<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAR_CONFIGN_STATUS: OrderableEdmTypeField<
      VariantConfiguration<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      VariantConfiguration<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link instance} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    INSTANCE: OneToManyLink<
      VariantConfiguration<DeSerializersT>,
      DeSerializersT,
      VariantConfigurationInstanceApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<VariantConfiguration<DeSerializers>>;
  };
}
