/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v2';
import type { SupplierInvoiceApi } from './SupplierInvoiceApi';
import {
  SuplrInvcSeldInbDeliveryNote,
  SuplrInvcSeldInbDeliveryNoteType
} from './SuplrInvcSeldInbDeliveryNote';
import {
  SuplrInvcSeldPurgDocument,
  SuplrInvcSeldPurgDocumentType
} from './SuplrInvcSeldPurgDocument';
import {
  SuplrInvcSeldSrvcEntrShtLean,
  SuplrInvcSeldSrvcEntrShtLeanType
} from './SuplrInvcSeldSrvcEntrShtLean';
import {
  SupplierInvoiceItemAsset,
  SupplierInvoiceItemAssetType
} from './SupplierInvoiceItemAsset';
import {
  SupplierInvoiceItemMaterial,
  SupplierInvoiceItemMaterialType
} from './SupplierInvoiceItemMaterial';
import {
  SuplrInvcItemPurOrdRef,
  SuplrInvcItemPurOrdRefType
} from './SuplrInvcItemPurOrdRef';
import {
  SuplrInvoiceAdditionalData,
  SuplrInvoiceAdditionalDataType
} from './SuplrInvoiceAdditionalData';
import {
  SupplierInvoiceItemGlAcct,
  SupplierInvoiceItemGlAcctType
} from './SupplierInvoiceItemGlAcct';
import {
  SupplierInvoiceOdn,
  SupplierInvoiceOdnType
} from './SupplierInvoiceOdn';
import {
  SupplierInvoiceTax,
  SupplierInvoiceTaxType
} from './SupplierInvoiceTax';
import {
  SuplrInvcHeaderWhldgTax,
  SuplrInvcHeaderWhldgTaxType
} from './SuplrInvcHeaderWhldgTax';
/**
 * This class represents the entity "A_SupplierInvoice" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SupplierInvoice<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SupplierInvoiceType<T>
{
  /**
   * Technical entity name for SupplierInvoice.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SupplierInvoice entity.
   */
  static _keys: string[];
  /**
   * Document Number of an Invoice Document.
   * Maximum length: 10.
   */
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  /**
   * Fiscal Year.
   * Maximum length: 4.
   */
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  /**
   * Company Code.
   * Maximum length: 4.
   * @nullable
   */
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Invoice Date in Document.
   * @nullable
   */
  documentDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Posting Date in the Document.
   * @nullable
   */
  postingDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Day On Which Accounting Document Was Entered.
   * @nullable
   */
  creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * UTC Time Stamp in Long Form (YYYYMMDDhhmmssmmmuuun) as Text.
   * Maximum length: 23.
   * @nullable
   */
  suplrInvcLstChgDteTmeTxt?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Reference Document Number.
   * Maximum length: 16.
   * @nullable
   */
  supplierInvoiceIdByInvcgParty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Different Invoicing Party.
   * Maximum length: 10.
   * @nullable
   */
  invoicingParty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Currency Key.
   * Maximum length: 5.
   * @nullable
   */
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Gross Invoice Amount in Document Currency.
   * @nullable
   */
  invoiceGrossAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Unplanned Delivery Costs.
   * @nullable
   */
  unplannedDeliveryCost?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Document Header Text.
   * Maximum length: 25.
   * @nullable
   */
  documentHeaderText?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Cash Discount Amount in Document Currency.
   * @nullable
   */
  manualCashDiscount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Key for Terms of Payment.
   * Maximum length: 4.
   * @nullable
   */
  paymentTerms?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Baseline Date for Due Date Calculation.
   * @nullable
   */
  dueCalculationBaseDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Cash Discount Percentage 1.
   * @nullable
   */
  cashDiscount1Percent?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Cash Discount Days 1.
   * @nullable
   */
  cashDiscount1Days?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Cash Discount Percentage 2.
   * @nullable
   */
  cashDiscount2Percent?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Cash Discount Days 2.
   * @nullable
   */
  cashDiscount2Days?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Net Payment Terms Period.
   * @nullable
   */
  netPaymentDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Payment Block Key.
   * Maximum length: 1.
   * @nullable
   */
  paymentBlockingReason?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Document Type.
   * Maximum length: 2.
   * @nullable
   */
  accountingDocumentType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Partner bank type.
   * Maximum length: 4.
   * @nullable
   */
  bpBankAccountInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Invoice document status.
   * Maximum length: 1.
   * @nullable
   */
  supplierInvoiceStatus?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indirect Quoted Exchange Rate.
   * @nullable
   */
  indirectQuotedExchangeRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Direct Quoted Exchange Rate.
   * @nullable
   */
  directQuotedExchangeRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * State Central Bank Indicator.
   * Maximum length: 3.
   * @nullable
   */
  stateCentralBankPaymentReason?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Supplying Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  supplyingCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Payment Method.
   * Maximum length: 1.
   * @nullable
   */
  paymentMethod?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Payment method supplement.
   * Maximum length: 2.
   * @nullable
   */
  paymentMethodSupplement?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Payment Reference.
   * Maximum length: 30.
   * @nullable
   */
  paymentReference?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Invoice reference: Document number for invoice reference.
   * Maximum length: 10.
   * @nullable
   */
  invoiceReference?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Fiscal Year of the Relevant Invoice (for Credit Memo).
   * Maximum length: 4.
   * @nullable
   */
  invoiceReferenceFiscalYear?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Fixed Payment Terms.
   * Maximum length: 1.
   * @nullable
   */
  fixedCashDiscount?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Code.
   * Maximum length: 2.
   * @nullable
   */
  unplannedDeliveryCostTaxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   * @nullable
   */
  unplndDelivCostTaxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Reporting Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  unplndDeliveryCostTaxCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Assignment Number.
   * Maximum length: 18.
   * @nullable
   */
  assignmentReference?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item Text.
   * Maximum length: 50.
   * @nullable
   */
  supplierPostingLineItemText?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Calculate Tax Automatically.
   * @nullable
   */
  taxIsCalculatedAutomatically?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Business Place.
   * Maximum length: 4.
   * @nullable
   */
  businessPlace?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Section Code.
   * Maximum length: 4.
   * @nullable
   */
  businessSectionCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Area.
   * Maximum length: 4.
   * @nullable
   */
  businessArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Capital Goods Affected?.
   * @nullable
   */
  suplrInvcIsCapitalGoodsRelated?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Single-Character Flag.
   * Maximum length: 1.
   * @nullable
   */
  supplierInvoiceIsCreditMemo?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ISR Subscriber Number.
   * Maximum length: 11.
   * @nullable
   */
  paytSlipWthRefSubscriber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * POR check digit.
   * Maximum length: 2.
   * @nullable
   */
  paytSlipWthRefCheckDigit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ISR/QR Reference Number.
   * Maximum length: 27.
   * @nullable
   */
  paytSlipWthRefReference?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date for Determining Tax Rates.
   * @nullable
   */
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Tax Reporting Date.
   * @nullable
   */
  taxReportingDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Tax Fulfillment Date.
   * @nullable
   */
  taxFulfillmentDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Invoice Receipt Date.
   * @nullable
   */
  invoiceReceiptDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Reporting Country/Region for Delivery of Goods Within the EU.
   * Maximum length: 3.
   * @nullable
   */
  deliveryOfGoodsReportingCntry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * VAT Registration Number.
   * Maximum length: 20.
   * @nullable
   */
  supplierVatRegistration?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Triangular Deal Within the EU.
   * @nullable
   */
  isEuTriangularDeal?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Posting logic for delivery items (invoice/credit memo).
   * Maximum length: 1.
   * @nullable
   */
  suplrInvcDebitCrdtCodeDelivery?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Posting logic for returns items (invoice/credit memo).
   * Maximum length: 1.
   * @nullable
   */
  suplrInvcDebitCrdtCodeReturns?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Due Date for Retention (Default).
   * @nullable
   */
  retentionDueDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Payment Reason.
   * Maximum length: 4.
   * @nullable
   */
  paymentReason?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Short Key for a House Bank.
   * Maximum length: 5.
   * @nullable
   */
  houseBank?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ID for Account Details.
   * Maximum length: 5.
   * @nullable
   */
  houseBankAccount?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Payee/Payer.
   * Maximum length: 10.
   * @nullable
   */
  alternativePayeePayer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Origin of a Logistics Invoice Verification Document.
   * Maximum length: 1.
   * @nullable
   */
  supplierInvoiceOrigin?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Reversal document number.
   * Maximum length: 10.
   * @nullable
   */
  reverseDocument?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Fiscal year of reversal document.
   * Maximum length: 4.
   * @nullable
   */
  reverseDocumentFiscalYear?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Is Reversal.
   * @nullable
   */
  isReversal?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Is Reversed.
   * @nullable
   */
  isReversed?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * GST Partner.
   * Maximum length: 10.
   * @nullable
   */
  inGstPartner?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Place of Supply.
   * Maximum length: 3.
   * @nullable
   */
  inGstPlaceOfSupply?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Invoice Reference Number.
   * Maximum length: 64.
   * @nullable
   */
  inInvoiceReferenceNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Specific Reference 1 in the Document.
   * Maximum length: 80.
   * @nullable
   */
  jrnlEntryCntrySpecificRef1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Specific Date 1 in the Document.
   * @nullable
   */
  jrnlEntryCntrySpecificDate1?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Country/Region Specific Reference 2 in the Document.
   * Maximum length: 25.
   * @nullable
   */
  jrnlEntryCntrySpecificRef2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Specific Date 2 in the Document.
   * @nullable
   */
  jrnlEntryCntrySpecificDate2?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Country/Region Specific Reference 3 in the Document.
   * Maximum length: 25.
   * @nullable
   */
  jrnlEntryCntrySpecificRef3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Specific Date 3 in the Document.
   * @nullable
   */
  jrnlEntryCntrySpecificDate3?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Country/Region Specific Reference 4 in the Document.
   * Maximum length: 50.
   * @nullable
   */
  jrnlEntryCntrySpecificRef4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Specific Date 4 in the Document.
   * @nullable
   */
  jrnlEntryCntrySpecificDate4?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Country/Region Specific Reference 5 in the Document.
   * Maximum length: 50.
   * @nullable
   */
  jrnlEntryCntrySpecificRef5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Specific Date 5 in the Document.
   * @nullable
   */
  jrnlEntryCntrySpecificDate5?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Country/Region specific Business Partner 1 in the Document.
   * Maximum length: 10.
   * @nullable
   */
  jrnlEntryCntrySpecificBp1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Specific Business Partner 2 in the Document.
   * Maximum length: 10.
   * @nullable
   */
  jrnlEntryCntrySpecificBp2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-many navigation property to the {@link SuplrInvcSeldInbDeliveryNote} entity.
   */
  toSelectedDeliveryNotes: SuplrInvcSeldInbDeliveryNote<T>[];
  /**
   * One-to-many navigation property to the {@link SuplrInvcSeldPurgDocument} entity.
   */
  toSelectedPurchaseOrders: SuplrInvcSeldPurgDocument<T>[];
  /**
   * One-to-many navigation property to the {@link SuplrInvcSeldSrvcEntrShtLean} entity.
   */
  toSelectedServiceEntrySheets: SuplrInvcSeldSrvcEntrShtLean<T>[];
  /**
   * One-to-many navigation property to the {@link SupplierInvoiceItemAsset} entity.
   */
  toSuplrInvcItemAsset: SupplierInvoiceItemAsset<T>[];
  /**
   * One-to-many navigation property to the {@link SupplierInvoiceItemMaterial} entity.
   */
  toSuplrInvcItemMaterial: SupplierInvoiceItemMaterial<T>[];
  /**
   * One-to-many navigation property to the {@link SuplrInvcItemPurOrdRef} entity.
   */
  toSuplrInvcItemPurOrdRef: SuplrInvcItemPurOrdRef<T>[];
  /**
   * One-to-one navigation property to the {@link SuplrInvoiceAdditionalData} entity.
   */
  toSuplrInvoiceAdditionalData?: SuplrInvoiceAdditionalData<T> | null;
  /**
   * One-to-many navigation property to the {@link SupplierInvoiceItemGlAcct} entity.
   */
  toSupplierInvoiceItemGlAcct: SupplierInvoiceItemGlAcct<T>[];
  /**
   * One-to-many navigation property to the {@link SupplierInvoiceOdn} entity.
   */
  toSupplierInvoiceOdn: SupplierInvoiceOdn<T>[];
  /**
   * One-to-many navigation property to the {@link SupplierInvoiceTax} entity.
   */
  toSupplierInvoiceTax: SupplierInvoiceTax<T>[];
  /**
   * One-to-many navigation property to the {@link SuplrInvcHeaderWhldgTax} entity.
   */
  toSupplierInvoiceWhldgTax: SuplrInvcHeaderWhldgTax<T>[];
  constructor(_entityApi: SupplierInvoiceApi<T>);
}
export interface SupplierInvoiceType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  documentDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  postingDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  suplrInvcLstChgDteTmeTxt?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceIdByInvcgParty?: DeserializedType<T, 'Edm.String'> | null;
  invoicingParty?: DeserializedType<T, 'Edm.String'> | null;
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  invoiceGrossAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  unplannedDeliveryCost?: DeserializedType<T, 'Edm.Decimal'> | null;
  documentHeaderText?: DeserializedType<T, 'Edm.String'> | null;
  manualCashDiscount?: DeserializedType<T, 'Edm.Decimal'> | null;
  paymentTerms?: DeserializedType<T, 'Edm.String'> | null;
  dueCalculationBaseDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  cashDiscount1Percent?: DeserializedType<T, 'Edm.Decimal'> | null;
  cashDiscount1Days?: DeserializedType<T, 'Edm.Decimal'> | null;
  cashDiscount2Percent?: DeserializedType<T, 'Edm.Decimal'> | null;
  cashDiscount2Days?: DeserializedType<T, 'Edm.Decimal'> | null;
  netPaymentDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  paymentBlockingReason?: DeserializedType<T, 'Edm.String'> | null;
  accountingDocumentType?: DeserializedType<T, 'Edm.String'> | null;
  bpBankAccountInternalId?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceStatus?: DeserializedType<T, 'Edm.String'> | null;
  indirectQuotedExchangeRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  directQuotedExchangeRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  stateCentralBankPaymentReason?: DeserializedType<T, 'Edm.String'> | null;
  supplyingCountry?: DeserializedType<T, 'Edm.String'> | null;
  paymentMethod?: DeserializedType<T, 'Edm.String'> | null;
  paymentMethodSupplement?: DeserializedType<T, 'Edm.String'> | null;
  paymentReference?: DeserializedType<T, 'Edm.String'> | null;
  invoiceReference?: DeserializedType<T, 'Edm.String'> | null;
  invoiceReferenceFiscalYear?: DeserializedType<T, 'Edm.String'> | null;
  fixedCashDiscount?: DeserializedType<T, 'Edm.String'> | null;
  unplannedDeliveryCostTaxCode?: DeserializedType<T, 'Edm.String'> | null;
  unplndDelivCostTaxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  unplndDeliveryCostTaxCountry?: DeserializedType<T, 'Edm.String'> | null;
  assignmentReference?: DeserializedType<T, 'Edm.String'> | null;
  supplierPostingLineItemText?: DeserializedType<T, 'Edm.String'> | null;
  taxIsCalculatedAutomatically?: DeserializedType<T, 'Edm.Boolean'> | null;
  businessPlace?: DeserializedType<T, 'Edm.String'> | null;
  businessSectionCode?: DeserializedType<T, 'Edm.String'> | null;
  businessArea?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcIsCapitalGoodsRelated?: DeserializedType<T, 'Edm.Boolean'> | null;
  supplierInvoiceIsCreditMemo?: DeserializedType<T, 'Edm.String'> | null;
  paytSlipWthRefSubscriber?: DeserializedType<T, 'Edm.String'> | null;
  paytSlipWthRefCheckDigit?: DeserializedType<T, 'Edm.String'> | null;
  paytSlipWthRefReference?: DeserializedType<T, 'Edm.String'> | null;
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  taxReportingDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  taxFulfillmentDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  invoiceReceiptDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  deliveryOfGoodsReportingCntry?: DeserializedType<T, 'Edm.String'> | null;
  supplierVatRegistration?: DeserializedType<T, 'Edm.String'> | null;
  isEuTriangularDeal?: DeserializedType<T, 'Edm.Boolean'> | null;
  suplrInvcDebitCrdtCodeDelivery?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcDebitCrdtCodeReturns?: DeserializedType<T, 'Edm.String'> | null;
  retentionDueDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  paymentReason?: DeserializedType<T, 'Edm.String'> | null;
  houseBank?: DeserializedType<T, 'Edm.String'> | null;
  houseBankAccount?: DeserializedType<T, 'Edm.String'> | null;
  alternativePayeePayer?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceOrigin?: DeserializedType<T, 'Edm.String'> | null;
  reverseDocument?: DeserializedType<T, 'Edm.String'> | null;
  reverseDocumentFiscalYear?: DeserializedType<T, 'Edm.String'> | null;
  isReversal?: DeserializedType<T, 'Edm.Boolean'> | null;
  isReversed?: DeserializedType<T, 'Edm.Boolean'> | null;
  inGstPartner?: DeserializedType<T, 'Edm.String'> | null;
  inGstPlaceOfSupply?: DeserializedType<T, 'Edm.String'> | null;
  inInvoiceReferenceNumber?: DeserializedType<T, 'Edm.String'> | null;
  jrnlEntryCntrySpecificRef1?: DeserializedType<T, 'Edm.String'> | null;
  jrnlEntryCntrySpecificDate1?: DeserializedType<T, 'Edm.DateTime'> | null;
  jrnlEntryCntrySpecificRef2?: DeserializedType<T, 'Edm.String'> | null;
  jrnlEntryCntrySpecificDate2?: DeserializedType<T, 'Edm.DateTime'> | null;
  jrnlEntryCntrySpecificRef3?: DeserializedType<T, 'Edm.String'> | null;
  jrnlEntryCntrySpecificDate3?: DeserializedType<T, 'Edm.DateTime'> | null;
  jrnlEntryCntrySpecificRef4?: DeserializedType<T, 'Edm.String'> | null;
  jrnlEntryCntrySpecificDate4?: DeserializedType<T, 'Edm.DateTime'> | null;
  jrnlEntryCntrySpecificRef5?: DeserializedType<T, 'Edm.String'> | null;
  jrnlEntryCntrySpecificDate5?: DeserializedType<T, 'Edm.DateTime'> | null;
  jrnlEntryCntrySpecificBp1?: DeserializedType<T, 'Edm.String'> | null;
  jrnlEntryCntrySpecificBp2?: DeserializedType<T, 'Edm.String'> | null;
  toSelectedDeliveryNotes: SuplrInvcSeldInbDeliveryNoteType<T>[];
  toSelectedPurchaseOrders: SuplrInvcSeldPurgDocumentType<T>[];
  toSelectedServiceEntrySheets: SuplrInvcSeldSrvcEntrShtLeanType<T>[];
  toSuplrInvcItemAsset: SupplierInvoiceItemAssetType<T>[];
  toSuplrInvcItemMaterial: SupplierInvoiceItemMaterialType<T>[];
  toSuplrInvcItemPurOrdRef: SuplrInvcItemPurOrdRefType<T>[];
  toSuplrInvoiceAdditionalData?: SuplrInvoiceAdditionalDataType<T> | null;
  toSupplierInvoiceItemGlAcct: SupplierInvoiceItemGlAcctType<T>[];
  toSupplierInvoiceOdn: SupplierInvoiceOdnType<T>[];
  toSupplierInvoiceTax: SupplierInvoiceTaxType<T>[];
  toSupplierInvoiceWhldgTax: SuplrInvcHeaderWhldgTaxType<T>[];
}
