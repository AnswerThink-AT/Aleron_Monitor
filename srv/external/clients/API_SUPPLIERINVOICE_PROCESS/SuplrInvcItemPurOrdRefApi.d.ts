/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcItemPurOrdRef } from './SuplrInvcItemPurOrdRef';
import { SuplrInvcItemPurOrdRefRequestBuilder } from './SuplrInvcItemPurOrdRefRequestBuilder';
import { SuplrInvcItemAcctAssgmtApi } from './SuplrInvcItemAcctAssgmtApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  Link
} from '@sap-cloud-sdk/odata-v2';
export declare class SuplrInvcItemPurOrdRefApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SuplrInvcItemPurOrdRef<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SuplrInvcItemPurOrdRefApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [SuplrInvcItemAcctAssgmtApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof SuplrInvcItemPurOrdRef;
  requestBuilder(): SuplrInvcItemPurOrdRefRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SuplrInvcItemPurOrdRef<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SuplrInvcItemPurOrdRef<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SuplrInvcItemPurOrdRef,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_INVOICE_ITEM: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PLANT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REFERENCE_DOCUMENT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REFERENCE_DOCUMENT_FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REFERENCE_DOCUMENT_ITEM: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_SUBSEQUENT_DEBIT_CREDIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_AMOUNT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PURCHASE_ORDER_QUANTITY_UNIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_QTY_UNIT_SAP_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_QTY_UNIT_ISO_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY_IN_PURCHASE_ORDER_UNIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT_SAP_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT_ISO_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QTY_IN_PURCHASE_ORDER_PRICE_UNIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    SUPLR_INVC_DELIVERY_COST_CNDN_TYPE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_DELIVERY_COST_CNDN_STEP: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_DELIVERY_COST_CNDN_COUNT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_TEXT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FREIGHT_SUPPLIER: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_NOT_CASH_DISCOUNT_LIABLE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PURCHASING_DOCUMENT_ITEM_CATEGORY: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PRODUCT_TYPE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    RETENTION_AMOUNT_IN_DOC_CURRENCY: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    RETENTION_PERCENTAGE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    RETENTION_DUE_DATE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    SUPLR_INVC_ITM_IS_NOT_RLVT_FOR_RTNTN: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    SERVICE_ENTRY_SHEET: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SERVICE_ENTRY_SHEET_ITEM: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_FINALLY_INVOICED: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    IN_HSN_OR_SAC_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IN_CUSTOM_DUTY_ASSESSABLE_VALUE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSupplierInvoiceItmAcctAssgmt} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPPLIER_INVOICE_ITM_ACCT_ASSGMT: Link<
      SuplrInvcItemPurOrdRef<DeSerializersT>,
      DeSerializersT,
      SuplrInvcItemAcctAssgmtApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SuplrInvcItemPurOrdRef<DeSerializers>>;
  };
}
