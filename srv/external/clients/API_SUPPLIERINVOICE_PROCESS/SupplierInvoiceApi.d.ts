/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoice } from './SupplierInvoice';
import { SupplierInvoiceRequestBuilder } from './SupplierInvoiceRequestBuilder';
import { SuplrInvcSeldInbDeliveryNoteApi } from './SuplrInvcSeldInbDeliveryNoteApi';
import { SuplrInvcSeldPurgDocumentApi } from './SuplrInvcSeldPurgDocumentApi';
import { SuplrInvcSeldSrvcEntrShtLeanApi } from './SuplrInvcSeldSrvcEntrShtLeanApi';
import { SupplierInvoiceItemAssetApi } from './SupplierInvoiceItemAssetApi';
import { SupplierInvoiceItemMaterialApi } from './SupplierInvoiceItemMaterialApi';
import { SuplrInvcItemPurOrdRefApi } from './SuplrInvcItemPurOrdRefApi';
import { SuplrInvoiceAdditionalDataApi } from './SuplrInvoiceAdditionalDataApi';
import { SupplierInvoiceItemGlAcctApi } from './SupplierInvoiceItemGlAcctApi';
import { SupplierInvoiceOdnApi } from './SupplierInvoiceOdnApi';
import { SupplierInvoiceTaxApi } from './SupplierInvoiceTaxApi';
import { SuplrInvcHeaderWhldgTaxApi } from './SuplrInvcHeaderWhldgTaxApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  Link,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export declare class SupplierInvoiceApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SupplierInvoice<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SupplierInvoiceApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      SuplrInvcSeldInbDeliveryNoteApi<DeSerializersT>,
      SuplrInvcSeldPurgDocumentApi<DeSerializersT>,
      SuplrInvcSeldSrvcEntrShtLeanApi<DeSerializersT>,
      SupplierInvoiceItemAssetApi<DeSerializersT>,
      SupplierInvoiceItemMaterialApi<DeSerializersT>,
      SuplrInvcItemPurOrdRefApi<DeSerializersT>,
      SuplrInvoiceAdditionalDataApi<DeSerializersT>,
      SupplierInvoiceItemGlAcctApi<DeSerializersT>,
      SupplierInvoiceOdnApi<DeSerializersT>,
      SupplierInvoiceTaxApi<DeSerializersT>,
      SuplrInvcHeaderWhldgTaxApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof SupplierInvoice;
  requestBuilder(): SupplierInvoiceRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SupplierInvoice<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<SupplierInvoice<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof SupplierInvoice, DeSerializersT>;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOCUMENT_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    POSTING_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    CREATION_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    SUPLR_INVC_LST_CHG_DTE_TME_TXT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ID_BY_INVCG_PARTY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVOICING_PARTY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVOICE_GROSS_AMOUNT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    UNPLANNED_DELIVERY_COST: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    DOCUMENT_HEADER_TEXT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    MANUAL_CASH_DISCOUNT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PAYMENT_TERMS: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DUE_CALCULATION_BASE_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    CASH_DISCOUNT_1_PERCENT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CASH_DISCOUNT_1_DAYS: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CASH_DISCOUNT_2_PERCENT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CASH_DISCOUNT_2_DAYS: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    NET_PAYMENT_DAYS: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PAYMENT_BLOCKING_REASON: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ACCOUNTING_DOCUMENT_TYPE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BP_BANK_ACCOUNT_INTERNAL_ID: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_STATUS: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INDIRECT_QUOTED_EXCHANGE_RATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    DIRECT_QUOTED_EXCHANGE_RATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    STATE_CENTRAL_BANK_PAYMENT_REASON: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLYING_COUNTRY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PAYMENT_METHOD: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PAYMENT_METHOD_SUPPLEMENT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PAYMENT_REFERENCE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVOICE_REFERENCE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVOICE_REFERENCE_FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIXED_CASH_DISCOUNT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    UNPLANNED_DELIVERY_COST_TAX_CODE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    UNPLND_DELIV_COST_TAX_JURISDICTION: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    UNPLND_DELIVERY_COST_TAX_COUNTRY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ASSIGNMENT_REFERENCE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_POSTING_LINE_ITEM_TEXT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_IS_CALCULATED_AUTOMATICALLY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    BUSINESS_PLACE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUSINESS_SECTION_CODE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUSINESS_AREA: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_IS_CAPITAL_GOODS_RELATED: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    SUPPLIER_INVOICE_IS_CREDIT_MEMO: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PAYT_SLIP_WTH_REF_SUBSCRIBER: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PAYT_SLIP_WTH_REF_CHECK_DIGIT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PAYT_SLIP_WTH_REF_REFERENCE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    TAX_REPORTING_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    TAX_FULFILLMENT_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    INVOICE_RECEIPT_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    DELIVERY_OF_GOODS_REPORTING_CNTRY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_VAT_REGISTRATION: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_EU_TRIANGULAR_DEAL: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    SUPLR_INVC_DEBIT_CRDT_CODE_DELIVERY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_DEBIT_CRDT_CODE_RETURNS: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    RETENTION_DUE_DATE: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    PAYMENT_REASON: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    HOUSE_BANK: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    HOUSE_BANK_ACCOUNT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALTERNATIVE_PAYEE_PAYER: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ORIGIN: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REVERSE_DOCUMENT: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REVERSE_DOCUMENT_FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_REVERSAL: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    IS_REVERSED: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    IN_GST_PARTNER: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IN_GST_PLACE_OF_SUPPLY: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IN_INVOICE_REFERENCE_NUMBER: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_REF_1: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_DATE_1: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_REF_2: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_DATE_2: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_REF_3: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_DATE_3: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_REF_4: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_DATE_4: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_REF_5: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_DATE_5: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_BP_1: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JRNL_ENTRY_CNTRY_SPECIFIC_BP_2: OrderableEdmTypeField<
      SupplierInvoice<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSelectedDeliveryNotes} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SELECTED_DELIVERY_NOTES: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SuplrInvcSeldInbDeliveryNoteApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSelectedPurchaseOrders} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SELECTED_PURCHASE_ORDERS: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SuplrInvcSeldPurgDocumentApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSelectedServiceEntrySheets} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SELECTED_SERVICE_ENTRY_SHEETS: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SuplrInvcSeldSrvcEntrShtLeanApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSuplrInvcItemAsset} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPLR_INVC_ITEM_ASSET: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SupplierInvoiceItemAssetApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSuplrInvcItemMaterial} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPLR_INVC_ITEM_MATERIAL: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SupplierInvoiceItemMaterialApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSuplrInvcItemPurOrdRef} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPLR_INVC_ITEM_PUR_ORD_REF: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SuplrInvcItemPurOrdRefApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toSuplrInvoiceAdditionalData} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPLR_INVOICE_ADDITIONAL_DATA: OneToOneLink<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SuplrInvoiceAdditionalDataApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSupplierInvoiceItemGlAcct} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPPLIER_INVOICE_ITEM_GL_ACCT: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SupplierInvoiceItemGlAcctApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSupplierInvoiceOdn} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPPLIER_INVOICE_ODN: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SupplierInvoiceOdnApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSupplierInvoiceTax} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPPLIER_INVOICE_TAX: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SupplierInvoiceTaxApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSupplierInvoiceWhldgTax} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPPLIER_INVOICE_WHLDG_TAX: Link<
      SupplierInvoice<DeSerializersT>,
      DeSerializersT,
      SuplrInvcHeaderWhldgTaxApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SupplierInvoice<DeSerializers>>;
  };
}
