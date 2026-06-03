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
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v4';
/**
 * DPurOrdGetOutputBinaryDataR
 */
export interface DPurOrdGetOutputBinaryDataR<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * Mime Type.
   */
  mimeType: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Output Binary Data.
   */
  outputBinaryData: DeserializedType<DeSerializersT, 'Edm.Binary'>;
  /**
   * Output Channel.
   */
  outputChannel: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Output Document Name.
   */
  outputDocumentName: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Recipient.
   */
  recipient: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Recipient Role.
   */
  recipientRole: DeserializedType<DeSerializersT, 'Edm.String'>;
}
/**
 * DPurOrdGetOutputBinaryDataRField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class DPurOrdGetOutputBinaryDataRField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  DPurOrdGetOutputBinaryDataR,
  NullableT,
  SelectableT
> {
  private _fieldBuilder;
  /**
   * Representation of the {@link DPurOrdGetOutputBinaryDataR.mimeType} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  mimeType: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Representation of the {@link DPurOrdGetOutputBinaryDataR.outputBinaryData} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  outputBinaryData: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Binary',
    false,
    false
  >;
  /**
   * Representation of the {@link DPurOrdGetOutputBinaryDataR.outputChannel} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  outputChannel: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Representation of the {@link DPurOrdGetOutputBinaryDataR.outputDocumentName} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  outputDocumentName: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Representation of the {@link DPurOrdGetOutputBinaryDataR.recipient} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  recipient: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Representation of the {@link DPurOrdGetOutputBinaryDataR.recipientRole} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  recipientRole: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Creates an instance of DPurOrdGetOutputBinaryDataRField.
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
export declare namespace DPurOrdGetOutputBinaryDataR {
  /**
   * Metadata information on all properties of the `DPurOrdGetOutputBinaryDataR` complex type.
   */
  const _propertyMetadata: PropertyMetadata<DPurOrdGetOutputBinaryDataR>[];
}
