/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcSeldInbDeliveryNote } from './SuplrInvcSeldInbDeliveryNote';
import { SuplrInvcSeldInbDeliveryNoteRequestBuilder } from './SuplrInvcSeldInbDeliveryNoteRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export declare class SuplrInvcSeldInbDeliveryNoteApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<SuplrInvcSeldInbDeliveryNote<DeSerializersT>, DeSerializersT>
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
  ): SuplrInvcSeldInbDeliveryNoteApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SuplrInvcSeldInbDeliveryNote;
  requestBuilder(): SuplrInvcSeldInbDeliveryNoteRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SuplrInvcSeldInbDeliveryNote<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SuplrInvcSeldInbDeliveryNote<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SuplrInvcSeldInbDeliveryNote,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SuplrInvcSeldInbDeliveryNote<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcSeldInbDeliveryNote<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INBOUND_DELIVERY_NOTE: OrderableEdmTypeField<
      SuplrInvcSeldInbDeliveryNote<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<SuplrInvcSeldInbDeliveryNote<DeSerializers>>;
  };
}
