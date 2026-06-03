/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoiceItemAsset } from './SupplierInvoiceItemAsset';
import { SupplierInvoiceItemAssetRequestBuilder } from './SupplierInvoiceItemAssetRequestBuilder';
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
export declare class SupplierInvoiceItemAssetApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SupplierInvoiceItemAsset<DeSerializersT>, DeSerializersT>
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
  ): SupplierInvoiceItemAssetApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SupplierInvoiceItemAsset;
  requestBuilder(): SupplierInvoiceItemAssetRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SupplierInvoiceItemAsset<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SupplierInvoiceItemAsset<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SupplierInvoiceItemAsset,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_INVOICE_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    MASTER_FIXED_ASSET: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIXED_ASSET: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GL_ACCOUNT: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_AMOUNT: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    DEBIT_CREDIT_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_TEXT: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ASSIGNMENT_REFERENCE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_NOT_CASH_DISCOUNT_LIABLE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ASSET_VALUE_DATE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    QUANTITY_UNIT: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ITM_QTY_UNIT_SAP_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ITM_QTY_UNIT_ISO_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SupplierInvoiceItemAsset<DeSerializers>>;
  };
}
