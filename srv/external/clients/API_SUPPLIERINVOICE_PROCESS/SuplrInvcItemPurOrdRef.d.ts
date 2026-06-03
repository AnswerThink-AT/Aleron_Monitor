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
import type { SuplrInvcItemPurOrdRefApi } from './SuplrInvcItemPurOrdRefApi';
import {
  SuplrInvcItemAcctAssgmt,
  SuplrInvcItemAcctAssgmtType
} from './SuplrInvcItemAcctAssgmt';
/**
 * This class represents the entity "A_SuplrInvcItemPurOrdRef" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SuplrInvcItemPurOrdRef<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcItemPurOrdRefType<T>
{
  /**
   * Technical entity name for SuplrInvcItemPurOrdRef.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SuplrInvcItemPurOrdRef entity.
   */
  static _keys: string[];
  /**
   * Document Number of an Accounting Document.
   * Maximum length: 10.
   */
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  /**
   * Fiscal Year.
   * Maximum length: 4.
   */
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  /**
   * Document Item in Invoice Document.
   * Maximum length: 6.
   */
  supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchasing Document Number.
   * Maximum length: 10.
   * @nullable
   */
  purchaseOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item Number of Purchasing Document.
   * Maximum length: 5.
   * @nullable
   */
  purchaseOrderItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Plant.
   * Maximum length: 4.
   * @nullable
   */
  plant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Document No. of a Reference Document.
   * Maximum length: 10.
   * @nullable
   */
  referenceDocument?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Fiscal Year of Current Period.
   * Maximum length: 4.
   * @nullable
   */
  referenceDocumentFiscalYear?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item of a Reference Document.
   * Maximum length: 4.
   * @nullable
   */
  referenceDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Subsequent Debit/Credit.
   * Maximum length: 1.
   * @nullable
   */
  isSubsequentDebitCredit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax on Sales/Purchases Code.
   * Maximum length: 2.
   * @nullable
   */
  taxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   * @nullable
   */
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Currency Key.
   * Maximum length: 5.
   * @nullable
   */
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Amount in Document Currency.
   * @nullable
   */
  supplierInvoiceItemAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Purchase Order Unit of Measure.
   * Maximum length: 3.
   * @nullable
   */
  purchaseOrderQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Purchase Order Unit of Measure.
   * Maximum length: 3.
   * @nullable
   */
  purchaseOrderQtyUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ISO Code for Unit of Measurement.
   * Maximum length: 3.
   * @nullable
   */
  purchaseOrderQtyUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Quantity.
   * @nullable
   */
  quantityInPurchaseOrderUnit?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Order Price Unit (Purchasing).
   * Maximum length: 3.
   * @nullable
   */
  purchaseOrderPriceUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Order Price Unit (Purchasing).
   * Maximum length: 3.
   * @nullable
   */
  purchaseOrderPriceUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ISO Code for Unit of Measurement.
   * Maximum length: 3.
   * @nullable
   */
  purchaseOrderPriceUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Quantity in Purchase Order Price Unit.
   * @nullable
   */
  qtyInPurchaseOrderPriceUnit?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Type.
   * Maximum length: 4.
   * @nullable
   */
  suplrInvcDeliveryCostCndnType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Step Number.
   * Maximum length: 3.
   * @nullable
   */
  suplrInvcDeliveryCostCndnStep?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Condition Counter.
   * Maximum length: 3.
   * @nullable
   */
  suplrInvcDeliveryCostCndnCount?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item Text.
   * Maximum length: 50.
   * @nullable
   */
  supplierInvoiceItemText?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Account Number of Supplier.
   * Maximum length: 10.
   * @nullable
   */
  freightSupplier?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Line Item Not Liable to Cash Discount?.
   * @nullable
   */
  isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Item category in purchasing document.
   * Maximum length: 1.
   * @nullable
   */
  purchasingDocumentItemCategory?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Product Type Group.
   * Maximum length: 2.
   * @nullable
   */
  productType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Retention Amount in Document Currency.
   * @nullable
   */
  retentionAmountInDocCurrency?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Retention in Percent.
   * @nullable
   */
  retentionPercentage?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Due Date for Retention.
   * @nullable
   */
  retentionDueDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Item Not Relevant to Retention.
   * @nullable
   */
  suplrInvcItmIsNotRlvtForRtntn?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entry Sheet Number.
   * Maximum length: 10.
   * @nullable
   */
  serviceEntrySheet?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Line Number.
   * Maximum length: 10.
   * @nullable
   */
  serviceEntrySheetItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Reporting Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Final Invoice Indicator.
   * @nullable
   */
  isFinallyInvoiced?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Date for Determining Tax Rates.
   * @nullable
   */
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * HSN or SAC Code.
   * Maximum length: 16.
   * @nullable
   */
  inHsnOrSacCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Assessable Value.
   * @nullable
   */
  inCustomDutyAssessableValue?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * One-to-many navigation property to the {@link SuplrInvcItemAcctAssgmt} entity.
   */
  toSupplierInvoiceItmAcctAssgmt: SuplrInvcItemAcctAssgmt<T>[];
  constructor(_entityApi: SuplrInvcItemPurOrdRefApi<T>);
}
export interface SuplrInvcItemPurOrdRefType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  purchaseOrder?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderItem?: DeserializedType<T, 'Edm.String'> | null;
  plant?: DeserializedType<T, 'Edm.String'> | null;
  referenceDocument?: DeserializedType<T, 'Edm.String'> | null;
  referenceDocumentFiscalYear?: DeserializedType<T, 'Edm.String'> | null;
  referenceDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  isSubsequentDebitCredit?: DeserializedType<T, 'Edm.String'> | null;
  taxCode?: DeserializedType<T, 'Edm.String'> | null;
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceItemAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  purchaseOrderQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderQtyUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderQtyUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  quantityInPurchaseOrderUnit?: DeserializedType<T, 'Edm.Decimal'> | null;
  purchaseOrderPriceUnit?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderPriceUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderPriceUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  qtyInPurchaseOrderPriceUnit?: DeserializedType<T, 'Edm.Decimal'> | null;
  suplrInvcDeliveryCostCndnType?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcDeliveryCostCndnStep?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcDeliveryCostCndnCount?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceItemText?: DeserializedType<T, 'Edm.String'> | null;
  freightSupplier?: DeserializedType<T, 'Edm.String'> | null;
  isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  purchasingDocumentItemCategory?: DeserializedType<T, 'Edm.String'> | null;
  productType?: DeserializedType<T, 'Edm.String'> | null;
  retentionAmountInDocCurrency?: DeserializedType<T, 'Edm.Decimal'> | null;
  retentionPercentage?: DeserializedType<T, 'Edm.Decimal'> | null;
  retentionDueDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  suplrInvcItmIsNotRlvtForRtntn?: DeserializedType<T, 'Edm.Boolean'> | null;
  serviceEntrySheet?: DeserializedType<T, 'Edm.String'> | null;
  serviceEntrySheetItem?: DeserializedType<T, 'Edm.String'> | null;
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  isFinallyInvoiced?: DeserializedType<T, 'Edm.Boolean'> | null;
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  inHsnOrSacCode?: DeserializedType<T, 'Edm.String'> | null;
  inCustomDutyAssessableValue?: DeserializedType<T, 'Edm.Decimal'> | null;
  toSupplierInvoiceItmAcctAssgmt: SuplrInvcItemAcctAssgmtType<T>[];
}
