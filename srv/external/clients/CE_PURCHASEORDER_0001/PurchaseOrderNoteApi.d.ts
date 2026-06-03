/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurchaseOrderNote } from './PurchaseOrderNote';
import { PurchaseOrderNoteRequestBuilder } from './PurchaseOrderNoteRequestBuilder';
import { PurchaseOrderApi } from './PurchaseOrderApi';
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
export declare class PurchaseOrderNoteApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<PurchaseOrderNote<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): PurchaseOrderNoteApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [PurchaseOrderApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof PurchaseOrderNote;
  requestBuilder(): PurchaseOrderNoteRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurchaseOrderNote<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<PurchaseOrderNote<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof PurchaseOrderNote, DeSerializersT>;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurchaseOrderNote<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TEXT_OBJECT_TYPE: OrderableEdmTypeField<
      PurchaseOrderNote<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    LANGUAGE: OrderableEdmTypeField<
      PurchaseOrderNote<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PLAIN_LONG_TEXT: OrderableEdmTypeField<
      PurchaseOrderNote<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrder_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_1: OneToOneLink<
      PurchaseOrderNote<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurchaseOrderNote<DeSerializers>>;
  };
}
