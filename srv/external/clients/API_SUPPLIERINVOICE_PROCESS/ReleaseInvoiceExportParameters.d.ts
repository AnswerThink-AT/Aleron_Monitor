/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  ComplexTypeField,
  ConstructorOrField,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  Entity,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v2';
/**
 * ReleaseInvoiceExportParameters
 */
export interface ReleaseInvoiceExportParameters<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * TRUE.
   */
  success: DeserializedType<DeSerializersT, 'Edm.Boolean'>;
}
/**
 * ReleaseInvoiceExportParametersField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class ReleaseInvoiceExportParametersField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  ReleaseInvoiceExportParameters,
  NullableT,
  SelectableT
> {
  private _fieldBuilder;
  /**
   * Representation of the {@link ReleaseInvoiceExportParameters.success} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  success: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Boolean',
    false,
    false
  >;
  /**
   * Creates an instance of ReleaseInvoiceExportParametersField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace ReleaseInvoiceExportParameters {
  /**
   * Metadata information on all properties of the `ReleaseInvoiceExportParameters` complex type.
   */
  const _propertyMetadata: PropertyMetadata<ReleaseInvoiceExportParameters>[];
}
