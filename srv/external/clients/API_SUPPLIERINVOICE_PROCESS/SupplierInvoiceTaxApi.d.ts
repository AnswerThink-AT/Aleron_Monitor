/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoiceTax } from './SupplierInvoiceTax';
import { SupplierInvoiceTaxRequestBuilder } from './SupplierInvoiceTaxRequestBuilder';
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
export declare class SupplierInvoiceTaxApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SupplierInvoiceTax<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SupplierInvoiceTaxApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SupplierInvoiceTax;
  requestBuilder(): SupplierInvoiceTaxRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SupplierInvoiceTax<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<SupplierInvoiceTax<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof SupplierInvoiceTax, DeSerializersT>;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_INVOICE_TAX_COUNTER: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_AMOUNT: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    TAX_BASE_AMOUNT_IN_TRANS_CRCY: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    TAX_RATE_VALIDITY_START_DATE: OrderableEdmTypeField<
      SupplierInvoiceTax<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SupplierInvoiceTax<DeSerializers>>;
  };
}
