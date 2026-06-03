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
import type { SupplierInvoiceItemGlAcctApi } from './SupplierInvoiceItemGlAcctApi';
/**
 * This class represents the entity "A_SupplierInvoiceItemGLAcct" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SupplierInvoiceItemGlAcct<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SupplierInvoiceItemGlAcctType<T>
{
  /**
   * Technical entity name for SupplierInvoiceItemGlAcct.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SupplierInvoiceItemGlAcct entity.
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
   * Four Character Sequential Number for Coding Block.
   * Maximum length: 4.
   */
  supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Company Code.
   * Maximum length: 4.
   * @nullable
   */
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Cost Center.
   * Maximum length: 10.
   * @nullable
   */
  costCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Controlling Area.
   * Maximum length: 4.
   * @nullable
   */
  controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Area.
   * Maximum length: 4.
   * @nullable
   */
  businessArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Profit Center.
   * Maximum length: 10.
   * @nullable
   */
  profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Functional Area.
   * Maximum length: 16.
   * @nullable
   */
  functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * G/L Account Number.
   * Maximum length: 10.
   * @nullable
   */
  glAccount?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales and Distribution Document Number.
   * Maximum length: 10.
   * @nullable
   */
  salesOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales document item.
   * Maximum length: 6.
   * @nullable
   */
  salesOrderItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Cost Object.
   * Maximum length: 12.
   * @nullable
   */
  costObject?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Activity Type.
   * Maximum length: 6.
   * @nullable
   */
  costCtrActivityType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Process.
   * Maximum length: 12.
   * @nullable
   */
  businessProcess?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Work Breakdown Structure Element (WBS Element).
   * Maximum length: 24.
   * @nullable
   */
  wbsElement?: DeserializedType<T, 'Edm.String'> | null;
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
   * Tax on Sales/Purchases Code.
   * Maximum length: 2.
   * @nullable
   */
  taxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Personnel Number.
   * Maximum length: 8.
   * @nullable
   */
  personnelNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Work Item ID.
   * Maximum length: 10.
   * @nullable
   */
  workItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Debit/Credit Indicator.
   * Maximum length: 1.
   * @nullable
   */
  debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   * @nullable
   */
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item Text.
   * Maximum length: 50.
   * @nullable
   */
  supplierInvoiceItemText?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Assignment Number.
   * Maximum length: 18.
   * @nullable
   */
  assignmentReference?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Line Item Not Liable to Cash Discount?.
   * @nullable
   */
  isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Order Number.
   * Maximum length: 12.
   * @nullable
   */
  internalOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Network Number for Account Assignment.
   * Maximum length: 12.
   * @nullable
   */
  projectNetwork?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Activity Number.
   * Maximum length: 4.
   * @nullable
   */
  networkActivity?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Commitment Item.
   * Maximum length: 24.
   * @nullable
   */
  commitmentItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Funds Center.
   * Maximum length: 16.
   * @nullable
   */
  fundsCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Base Amount in Document Currency.
   * @nullable
   */
  taxBaseAmountInTransCrcy?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Fund.
   * Maximum length: 10.
   * @nullable
   */
  fund?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Grant.
   * Maximum length: 20.
   * @nullable
   */
  grantId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Base Unit of Measure.
   * Maximum length: 3.
   * @nullable
   */
  quantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Base Unit of Measure.
   * Maximum length: 3.
   * @nullable
   */
  suplrInvcItmQtyUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ISO Code for Unit of Measurement.
   * Maximum length: 3.
   * @nullable
   */
  suplrInvcItmQtyUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Quantity.
   * @nullable
   */
  quantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Trading Partner's Business Area.
   * Maximum length: 4.
   * @nullable
   */
  partnerBusinessArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Transaction Type.
   * Maximum length: 3.
   * @nullable
   */
  financialTransactionType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Reporting Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Document Number for Earmarked Funds.
   * Maximum length: 10.
   * @nullable
   */
  earmarkedFundsDocument?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Earmarked Funds: Document Item.
   * Maximum length: 3.
   * @nullable
   */
  earmarkedFundsDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Budget Period.
   * Maximum length: 10.
   * @nullable
   */
  budgetPeriod?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Service Document ID.
   * Maximum length: 10.
   * @nullable
   */
  serviceDocument?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Service Document Item ID.
   * Maximum length: 6.
   * @nullable
   */
  serviceDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Service Document Type.
   * Maximum length: 4.
   * @nullable
   */
  serviceDocumentType?: DeserializedType<T, 'Edm.String'> | null;
  constructor(_entityApi: SupplierInvoiceItemGlAcctApi<T>);
}
export interface SupplierInvoiceItemGlAcctType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  costCenter?: DeserializedType<T, 'Edm.String'> | null;
  controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  businessArea?: DeserializedType<T, 'Edm.String'> | null;
  profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  glAccount?: DeserializedType<T, 'Edm.String'> | null;
  salesOrder?: DeserializedType<T, 'Edm.String'> | null;
  salesOrderItem?: DeserializedType<T, 'Edm.String'> | null;
  costObject?: DeserializedType<T, 'Edm.String'> | null;
  costCtrActivityType?: DeserializedType<T, 'Edm.String'> | null;
  businessProcess?: DeserializedType<T, 'Edm.String'> | null;
  wbsElement?: DeserializedType<T, 'Edm.String'> | null;
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceItemAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  taxCode?: DeserializedType<T, 'Edm.String'> | null;
  personnelNumber?: DeserializedType<T, 'Edm.String'> | null;
  workItem?: DeserializedType<T, 'Edm.String'> | null;
  debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceItemText?: DeserializedType<T, 'Edm.String'> | null;
  assignmentReference?: DeserializedType<T, 'Edm.String'> | null;
  isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  internalOrder?: DeserializedType<T, 'Edm.String'> | null;
  projectNetwork?: DeserializedType<T, 'Edm.String'> | null;
  networkActivity?: DeserializedType<T, 'Edm.String'> | null;
  commitmentItem?: DeserializedType<T, 'Edm.String'> | null;
  fundsCenter?: DeserializedType<T, 'Edm.String'> | null;
  taxBaseAmountInTransCrcy?: DeserializedType<T, 'Edm.Decimal'> | null;
  fund?: DeserializedType<T, 'Edm.String'> | null;
  grantId?: DeserializedType<T, 'Edm.String'> | null;
  quantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcItmQtyUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcItmQtyUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  quantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  partnerBusinessArea?: DeserializedType<T, 'Edm.String'> | null;
  financialTransactionType?: DeserializedType<T, 'Edm.String'> | null;
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  earmarkedFundsDocument?: DeserializedType<T, 'Edm.String'> | null;
  earmarkedFundsDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  budgetPeriod?: DeserializedType<T, 'Edm.String'> | null;
  serviceDocument?: DeserializedType<T, 'Edm.String'> | null;
  serviceDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  serviceDocumentType?: DeserializedType<T, 'Edm.String'> | null;
}
