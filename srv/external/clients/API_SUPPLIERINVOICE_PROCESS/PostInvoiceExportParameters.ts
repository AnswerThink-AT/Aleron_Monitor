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
  EdmTypeField,
  Entity,
  FieldBuilder,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v2';

/**
 * PostInvoiceExportParameters
 */
export interface PostInvoiceExportParameters<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * TRUE.
   */
  success: DeserializedType<DeSerializersT, 'Edm.Boolean'>;
}

/**
 * PostInvoiceExportParametersField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export class PostInvoiceExportParametersField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  PostInvoiceExportParameters,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the {@link PostInvoiceExportParameters.success} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  success: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Boolean',
    false,
    false
  > = this._fieldBuilder.buildEdmTypeField('Success', 'Edm.Boolean', false);

  /**
   * Creates an instance of PostInvoiceExportParametersField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(
      fieldName,
      fieldOf,
      deSerializers,
      PostInvoiceExportParameters,
      fieldOptions
    );
  }
}

export namespace PostInvoiceExportParameters {
  /**
   * Metadata information on all properties of the `PostInvoiceExportParameters` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<PostInvoiceExportParameters>[] =
    [
      {
        originalName: 'Success',
        name: 'success',
        type: 'Edm.Boolean',
        isCollection: false
      }
    ];
}
