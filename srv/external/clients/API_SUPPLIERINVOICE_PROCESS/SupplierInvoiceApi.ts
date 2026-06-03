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
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  Link,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export class SupplierInvoiceApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SupplierInvoice<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ) {
    this.deSerializers = deSerializers;
  }

  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  public static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): SupplierInvoiceApi<DeSerializersT> {
    return new SupplierInvoiceApi(deSerializers);
  }

  private navigationPropertyFields!: {
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
  };

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
  ): this {
    this.navigationPropertyFields = {
      TO_SELECTED_DELIVERY_NOTES: new Link(
        'to_SelectedDeliveryNotes',
        this,
        linkedApis[0]
      ),
      TO_SELECTED_PURCHASE_ORDERS: new Link(
        'to_SelectedPurchaseOrders',
        this,
        linkedApis[1]
      ),
      TO_SELECTED_SERVICE_ENTRY_SHEETS: new Link(
        'to_SelectedServiceEntrySheets',
        this,
        linkedApis[2]
      ),
      TO_SUPLR_INVC_ITEM_ASSET: new Link(
        'to_SuplrInvcItemAsset',
        this,
        linkedApis[3]
      ),
      TO_SUPLR_INVC_ITEM_MATERIAL: new Link(
        'to_SuplrInvcItemMaterial',
        this,
        linkedApis[4]
      ),
      TO_SUPLR_INVC_ITEM_PUR_ORD_REF: new Link(
        'to_SuplrInvcItemPurOrdRef',
        this,
        linkedApis[5]
      ),
      TO_SUPLR_INVOICE_ADDITIONAL_DATA: new OneToOneLink(
        'to_SuplrInvoiceAdditionalData',
        this,
        linkedApis[6]
      ),
      TO_SUPPLIER_INVOICE_ITEM_GL_ACCT: new Link(
        'to_SupplierInvoiceItemGLAcct',
        this,
        linkedApis[7]
      ),
      TO_SUPPLIER_INVOICE_ODN: new Link(
        'to_SupplierInvoiceODN',
        this,
        linkedApis[8]
      ),
      TO_SUPPLIER_INVOICE_TAX: new Link(
        'to_SupplierInvoiceTax',
        this,
        linkedApis[9]
      ),
      TO_SUPPLIER_INVOICE_WHLDG_TAX: new Link(
        'to_SupplierInvoiceWhldgTax',
        this,
        linkedApis[10]
      )
    };
    return this;
  }

  entityConstructor = SupplierInvoice;

  requestBuilder(): SupplierInvoiceRequestBuilder<DeSerializersT> {
    return new SupplierInvoiceRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierInvoice<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<SupplierInvoice<DeSerializersT>, DeSerializersT>(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<SupplierInvoice<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<typeof SupplierInvoice, DeSerializersT>;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SupplierInvoice,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link supplierInvoice} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE: fieldBuilder.buildEdmTypeField(
          'SupplierInvoice',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link fiscalYear} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FISCAL_YEAR: fieldBuilder.buildEdmTypeField(
          'FiscalYear',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link companyCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: fieldBuilder.buildEdmTypeField(
          'CompanyCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link documentDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOCUMENT_DATE: fieldBuilder.buildEdmTypeField(
          'DocumentDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link postingDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        POSTING_DATE: fieldBuilder.buildEdmTypeField(
          'PostingDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link creationDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATION_DATE: fieldBuilder.buildEdmTypeField(
          'CreationDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcLstChgDteTmeTxt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_LST_CHG_DTE_TME_TXT: fieldBuilder.buildEdmTypeField(
          'SuplrInvcLstChgDteTmeTxt',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplierInvoiceIdByInvcgParty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ID_BY_INVCG_PARTY: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceIDByInvcgParty',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link invoicingParty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVOICING_PARTY: fieldBuilder.buildEdmTypeField(
          'InvoicingParty',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link documentCurrency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField(
          'DocumentCurrency',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link invoiceGrossAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVOICE_GROSS_AMOUNT: fieldBuilder.buildEdmTypeField(
          'InvoiceGrossAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link unplannedDeliveryCost} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UNPLANNED_DELIVERY_COST: fieldBuilder.buildEdmTypeField(
          'UnplannedDeliveryCost',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link documentHeaderText} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOCUMENT_HEADER_TEXT: fieldBuilder.buildEdmTypeField(
          'DocumentHeaderText',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link manualCashDiscount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MANUAL_CASH_DISCOUNT: fieldBuilder.buildEdmTypeField(
          'ManualCashDiscount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link paymentTerms} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_TERMS: fieldBuilder.buildEdmTypeField(
          'PaymentTerms',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link dueCalculationBaseDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DUE_CALCULATION_BASE_DATE: fieldBuilder.buildEdmTypeField(
          'DueCalculationBaseDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link cashDiscount1Percent} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CASH_DISCOUNT_1_PERCENT: fieldBuilder.buildEdmTypeField(
          'CashDiscount1Percent',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link cashDiscount1Days} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CASH_DISCOUNT_1_DAYS: fieldBuilder.buildEdmTypeField(
          'CashDiscount1Days',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link cashDiscount2Percent} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CASH_DISCOUNT_2_PERCENT: fieldBuilder.buildEdmTypeField(
          'CashDiscount2Percent',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link cashDiscount2Days} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CASH_DISCOUNT_2_DAYS: fieldBuilder.buildEdmTypeField(
          'CashDiscount2Days',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link netPaymentDays} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NET_PAYMENT_DAYS: fieldBuilder.buildEdmTypeField(
          'NetPaymentDays',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link paymentBlockingReason} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_BLOCKING_REASON: fieldBuilder.buildEdmTypeField(
          'PaymentBlockingReason',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link accountingDocumentType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNTING_DOCUMENT_TYPE: fieldBuilder.buildEdmTypeField(
          'AccountingDocumentType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link bpBankAccountInternalId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_BANK_ACCOUNT_INTERNAL_ID: fieldBuilder.buildEdmTypeField(
          'BPBankAccountInternalID',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplierInvoiceStatus} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_STATUS: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceStatus',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link indirectQuotedExchangeRate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDIRECT_QUOTED_EXCHANGE_RATE: fieldBuilder.buildEdmTypeField(
          'IndirectQuotedExchangeRate',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link directQuotedExchangeRate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DIRECT_QUOTED_EXCHANGE_RATE: fieldBuilder.buildEdmTypeField(
          'DirectQuotedExchangeRate',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link stateCentralBankPaymentReason} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STATE_CENTRAL_BANK_PAYMENT_REASON: fieldBuilder.buildEdmTypeField(
          'StateCentralBankPaymentReason',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplyingCountry} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLYING_COUNTRY: fieldBuilder.buildEdmTypeField(
          'SupplyingCountry',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link paymentMethod} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_METHOD: fieldBuilder.buildEdmTypeField(
          'PaymentMethod',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link paymentMethodSupplement} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_METHOD_SUPPLEMENT: fieldBuilder.buildEdmTypeField(
          'PaymentMethodSupplement',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link paymentReference} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_REFERENCE: fieldBuilder.buildEdmTypeField(
          'PaymentReference',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link invoiceReference} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVOICE_REFERENCE: fieldBuilder.buildEdmTypeField(
          'InvoiceReference',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link invoiceReferenceFiscalYear} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVOICE_REFERENCE_FISCAL_YEAR: fieldBuilder.buildEdmTypeField(
          'InvoiceReferenceFiscalYear',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link fixedCashDiscount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FIXED_CASH_DISCOUNT: fieldBuilder.buildEdmTypeField(
          'FixedCashDiscount',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link unplannedDeliveryCostTaxCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UNPLANNED_DELIVERY_COST_TAX_CODE: fieldBuilder.buildEdmTypeField(
          'UnplannedDeliveryCostTaxCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link unplndDelivCostTaxJurisdiction} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UNPLND_DELIV_COST_TAX_JURISDICTION: fieldBuilder.buildEdmTypeField(
          'UnplndDelivCostTaxJurisdiction',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link unplndDeliveryCostTaxCountry} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UNPLND_DELIVERY_COST_TAX_COUNTRY: fieldBuilder.buildEdmTypeField(
          'UnplndDeliveryCostTaxCountry',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link assignmentReference} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ASSIGNMENT_REFERENCE: fieldBuilder.buildEdmTypeField(
          'AssignmentReference',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplierPostingLineItemText} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_POSTING_LINE_ITEM_TEXT: fieldBuilder.buildEdmTypeField(
          'SupplierPostingLineItemText',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link taxIsCalculatedAutomatically} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_IS_CALCULATED_AUTOMATICALLY: fieldBuilder.buildEdmTypeField(
          'TaxIsCalculatedAutomatically',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link businessPlace} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PLACE: fieldBuilder.buildEdmTypeField(
          'BusinessPlace',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link businessSectionCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_SECTION_CODE: fieldBuilder.buildEdmTypeField(
          'BusinessSectionCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link businessArea} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_AREA: fieldBuilder.buildEdmTypeField(
          'BusinessArea',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcIsCapitalGoodsRelated} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_IS_CAPITAL_GOODS_RELATED: fieldBuilder.buildEdmTypeField(
          'SuplrInvcIsCapitalGoodsRelated',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link supplierInvoiceIsCreditMemo} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_IS_CREDIT_MEMO: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceIsCreditMemo',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link paytSlipWthRefSubscriber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYT_SLIP_WTH_REF_SUBSCRIBER: fieldBuilder.buildEdmTypeField(
          'PaytSlipWthRefSubscriber',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link paytSlipWthRefCheckDigit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYT_SLIP_WTH_REF_CHECK_DIGIT: fieldBuilder.buildEdmTypeField(
          'PaytSlipWthRefCheckDigit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link paytSlipWthRefReference} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYT_SLIP_WTH_REF_REFERENCE: fieldBuilder.buildEdmTypeField(
          'PaytSlipWthRefReference',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link taxDeterminationDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_DETERMINATION_DATE: fieldBuilder.buildEdmTypeField(
          'TaxDeterminationDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link taxReportingDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_REPORTING_DATE: fieldBuilder.buildEdmTypeField(
          'TaxReportingDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link taxFulfillmentDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_FULFILLMENT_DATE: fieldBuilder.buildEdmTypeField(
          'TaxFulfillmentDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link invoiceReceiptDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVOICE_RECEIPT_DATE: fieldBuilder.buildEdmTypeField(
          'InvoiceReceiptDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link deliveryOfGoodsReportingCntry} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELIVERY_OF_GOODS_REPORTING_CNTRY: fieldBuilder.buildEdmTypeField(
          'DeliveryOfGoodsReportingCntry',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplierVatRegistration} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_VAT_REGISTRATION: fieldBuilder.buildEdmTypeField(
          'SupplierVATRegistration',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isEuTriangularDeal} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_EU_TRIANGULAR_DEAL: fieldBuilder.buildEdmTypeField(
          'IsEUTriangularDeal',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcDebitCrdtCodeDelivery} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_DEBIT_CRDT_CODE_DELIVERY: fieldBuilder.buildEdmTypeField(
          'SuplrInvcDebitCrdtCodeDelivery',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcDebitCrdtCodeReturns} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_DEBIT_CRDT_CODE_RETURNS: fieldBuilder.buildEdmTypeField(
          'SuplrInvcDebitCrdtCodeReturns',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link retentionDueDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RETENTION_DUE_DATE: fieldBuilder.buildEdmTypeField(
          'RetentionDueDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link paymentReason} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_REASON: fieldBuilder.buildEdmTypeField(
          'PaymentReason',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link houseBank} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        HOUSE_BANK: fieldBuilder.buildEdmTypeField(
          'HouseBank',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link houseBankAccount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        HOUSE_BANK_ACCOUNT: fieldBuilder.buildEdmTypeField(
          'HouseBankAccount',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link alternativePayeePayer} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ALTERNATIVE_PAYEE_PAYER: fieldBuilder.buildEdmTypeField(
          'AlternativePayeePayer',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplierInvoiceOrigin} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ORIGIN: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceOrigin',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link reverseDocument} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REVERSE_DOCUMENT: fieldBuilder.buildEdmTypeField(
          'ReverseDocument',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link reverseDocumentFiscalYear} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REVERSE_DOCUMENT_FISCAL_YEAR: fieldBuilder.buildEdmTypeField(
          'ReverseDocumentFiscalYear',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isReversal} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_REVERSAL: fieldBuilder.buildEdmTypeField(
          'IsReversal',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link isReversed} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_REVERSED: fieldBuilder.buildEdmTypeField(
          'IsReversed',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link inGstPartner} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IN_GST_PARTNER: fieldBuilder.buildEdmTypeField(
          'IN_GSTPartner',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link inGstPlaceOfSupply} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IN_GST_PLACE_OF_SUPPLY: fieldBuilder.buildEdmTypeField(
          'IN_GSTPlaceOfSupply',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link inInvoiceReferenceNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IN_INVOICE_REFERENCE_NUMBER: fieldBuilder.buildEdmTypeField(
          'IN_InvoiceReferenceNumber',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificRef1} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_REF_1: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificRef1',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificDate1} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_DATE_1: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificDate1',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificRef2} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_REF_2: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificRef2',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificDate2} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_DATE_2: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificDate2',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificRef3} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_REF_3: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificRef3',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificDate3} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_DATE_3: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificDate3',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificRef4} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_REF_4: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificRef4',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificDate4} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_DATE_4: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificDate4',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificRef5} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_REF_5: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificRef5',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificDate5} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_DATE_5: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificDate5',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificBp1} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_BP_1: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificBP1',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jrnlEntryCntrySpecificBp2} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JRNL_ENTRY_CNTRY_SPECIFIC_BP_2: fieldBuilder.buildEdmTypeField(
          'JrnlEntryCntrySpecificBP2',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SupplierInvoice)
      };
    }

    return this._schema;
  }
}
