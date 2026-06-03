/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcSeldPurgDocument } from './SuplrInvcSeldPurgDocument';
import { SuplrInvcSeldPurgDocumentRequestBuilder } from './SuplrInvcSeldPurgDocumentRequestBuilder';
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
export declare class SuplrInvcSeldPurgDocumentApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<SuplrInvcSeldPurgDocument<DeSerializersT>, DeSerializersT>
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
  ): SuplrInvcSeldPurgDocumentApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SuplrInvcSeldPurgDocument;
  requestBuilder(): SuplrInvcSeldPurgDocumentRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SuplrInvcSeldPurgDocument<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SuplrInvcSeldPurgDocument<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SuplrInvcSeldPurgDocument,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SuplrInvcSeldPurgDocument<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcSeldPurgDocument<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER: OrderableEdmTypeField<
      SuplrInvcSeldPurgDocument<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      SuplrInvcSeldPurgDocument<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<SuplrInvcSeldPurgDocument<DeSerializers>>;
  };
}
