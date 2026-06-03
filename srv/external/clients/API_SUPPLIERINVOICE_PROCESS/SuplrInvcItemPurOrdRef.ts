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
export class SuplrInvcItemPurOrdRef<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcItemPurOrdRefType<T>
{
  /**
   * Technical entity name for SuplrInvcItemPurOrdRef.
   */
  static override _entityName = 'A_SuplrInvcItemPurOrdRef';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SuplrInvcItemPurOrdRef entity.
   */
  static _keys = ['SupplierInvoice', 'FiscalYear', 'SupplierInvoiceItem'];
  /**
   * Document Number of an Accounting Document.
   * Maximum length: 10.
   */
  declare supplierInvoice: DeserializedType<T, 'Edm.String'>;
  /**
   * Fiscal Year.
   * Maximum length: 4.
   */
  declare fiscalYear: DeserializedType<T, 'Edm.String'>;
  /**
   * Document Item in Invoice Document.
   * Maximum length: 6.
   */
  declare supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchasing Document Number.
   * Maximum length: 10.
   * @nullable
   */
  declare purchaseOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item Number of Purchasing Document.
   * Maximum length: 5.
   * @nullable
   */
  declare purchaseOrderItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Plant.
   * Maximum length: 4.
   * @nullable
   */
  declare plant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Document No. of a Reference Document.
   * Maximum length: 10.
   * @nullable
   */
  declare referenceDocument?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Fiscal Year of Current Period.
   * Maximum length: 4.
   * @nullable
   */
  declare referenceDocumentFiscalYear?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Item of a Reference Document.
   * Maximum length: 4.
   * @nullable
   */
  declare referenceDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Subsequent Debit/Credit.
   * Maximum length: 1.
   * @nullable
   */
  declare isSubsequentDebitCredit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax on Sales/Purchases Code.
   * Maximum length: 2.
   * @nullable
   */
  declare taxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   * @nullable
   */
  declare taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Currency Key.
   * Maximum length: 5.
   * @nullable
   */
  declare documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Amount in Document Currency.
   * @nullable
   */
  declare supplierInvoiceItemAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Purchase Order Unit of Measure.
   * Maximum length: 3.
   * @nullable
   */
  declare purchaseOrderQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Purchase Order Unit of Measure.
   * Maximum length: 3.
   * @nullable
   */
  declare purchaseOrderQtyUnitSapCode?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * ISO Code for Unit of Measurement.
   * Maximum length: 3.
   * @nullable
   */
  declare purchaseOrderQtyUnitIsoCode?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Quantity.
   * @nullable
   */
  declare quantityInPurchaseOrderUnit?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Order Price Unit (Purchasing).
   * Maximum length: 3.
   * @nullable
   */
  declare purchaseOrderPriceUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Order Price Unit (Purchasing).
   * Maximum length: 3.
   * @nullable
   */
  declare purchaseOrderPriceUnitSapCode?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * ISO Code for Unit of Measurement.
   * Maximum length: 3.
   * @nullable
   */
  declare purchaseOrderPriceUnitIsoCode?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Quantity in Purchase Order Price Unit.
   * @nullable
   */
  declare qtyInPurchaseOrderPriceUnit?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Condition Type.
   * Maximum length: 4.
   * @nullable
   */
  declare suplrInvcDeliveryCostCndnType?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Step Number.
   * Maximum length: 3.
   * @nullable
   */
  declare suplrInvcDeliveryCostCndnStep?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Condition Counter.
   * Maximum length: 3.
   * @nullable
   */
  declare suplrInvcDeliveryCostCndnCount?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Item Text.
   * Maximum length: 50.
   * @nullable
   */
  declare supplierInvoiceItemText?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Account Number of Supplier.
   * Maximum length: 10.
   * @nullable
   */
  declare freightSupplier?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Line Item Not Liable to Cash Discount?.
   * @nullable
   */
  declare isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Item category in purchasing document.
   * Maximum length: 1.
   * @nullable
   */
  declare purchasingDocumentItemCategory?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Product Type Group.
   * Maximum length: 2.
   * @nullable
   */
  declare productType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Retention Amount in Document Currency.
   * @nullable
   */
  declare retentionAmountInDocCurrency?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Retention in Percent.
   * @nullable
   */
  declare retentionPercentage?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Due Date for Retention.
   * @nullable
   */
  declare retentionDueDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Item Not Relevant to Retention.
   * @nullable
   */
  declare suplrInvcItmIsNotRlvtForRtntn?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Entry Sheet Number.
   * Maximum length: 10.
   * @nullable
   */
  declare serviceEntrySheet?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Line Number.
   * Maximum length: 10.
   * @nullable
   */
  declare serviceEntrySheetItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Reporting Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  declare taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Final Invoice Indicator.
   * @nullable
   */
  declare isFinallyInvoiced?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Date for Determining Tax Rates.
   * @nullable
   */
  declare taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * HSN or SAC Code.
   * Maximum length: 16.
   * @nullable
   */
  declare inHsnOrSacCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Assessable Value.
   * @nullable
   */
  declare inCustomDutyAssessableValue?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * One-to-many navigation property to the {@link SuplrInvcItemAcctAssgmt} entity.
   */
  declare toSupplierInvoiceItmAcctAssgmt: SuplrInvcItemAcctAssgmt<T>[];

  constructor(_entityApi: SuplrInvcItemPurOrdRefApi<T>) {
    super(_entityApi);
  }
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
