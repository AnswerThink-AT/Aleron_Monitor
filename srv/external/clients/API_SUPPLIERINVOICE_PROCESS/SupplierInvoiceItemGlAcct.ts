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
export class SupplierInvoiceItemGlAcct<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SupplierInvoiceItemGlAcctType<T>
{
  /**
   * Technical entity name for SupplierInvoiceItemGlAcct.
   */
  static override _entityName = 'A_SupplierInvoiceItemGLAcct';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SupplierInvoiceItemGlAcct entity.
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
   * Four Character Sequential Number for Coding Block.
   * Maximum length: 4.
   */
  declare supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Company Code.
   * Maximum length: 4.
   * @nullable
   */
  declare companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Cost Center.
   * Maximum length: 10.
   * @nullable
   */
  declare costCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Controlling Area.
   * Maximum length: 4.
   * @nullable
   */
  declare controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Area.
   * Maximum length: 4.
   * @nullable
   */
  declare businessArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Profit Center.
   * Maximum length: 10.
   * @nullable
   */
  declare profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Functional Area.
   * Maximum length: 16.
   * @nullable
   */
  declare functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * G/L Account Number.
   * Maximum length: 10.
   * @nullable
   */
  declare glAccount?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales and Distribution Document Number.
   * Maximum length: 10.
   * @nullable
   */
  declare salesOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales document item.
   * Maximum length: 6.
   * @nullable
   */
  declare salesOrderItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Cost Object.
   * Maximum length: 12.
   * @nullable
   */
  declare costObject?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Activity Type.
   * Maximum length: 6.
   * @nullable
   */
  declare costCtrActivityType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Process.
   * Maximum length: 12.
   * @nullable
   */
  declare businessProcess?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Work Breakdown Structure Element (WBS Element).
   * Maximum length: 24.
   * @nullable
   */
  declare wbsElement?: DeserializedType<T, 'Edm.String'> | null;
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
   * Tax on Sales/Purchases Code.
   * Maximum length: 2.
   * @nullable
   */
  declare taxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Personnel Number.
   * Maximum length: 8.
   * @nullable
   */
  declare personnelNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Work Item ID.
   * Maximum length: 10.
   * @nullable
   */
  declare workItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Debit/Credit Indicator.
   * Maximum length: 1.
   * @nullable
   */
  declare debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   * @nullable
   */
  declare taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item Text.
   * Maximum length: 50.
   * @nullable
   */
  declare supplierInvoiceItemText?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Assignment Number.
   * Maximum length: 18.
   * @nullable
   */
  declare assignmentReference?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Line Item Not Liable to Cash Discount?.
   * @nullable
   */
  declare isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Order Number.
   * Maximum length: 12.
   * @nullable
   */
  declare internalOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Network Number for Account Assignment.
   * Maximum length: 12.
   * @nullable
   */
  declare projectNetwork?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Activity Number.
   * Maximum length: 4.
   * @nullable
   */
  declare networkActivity?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Commitment Item.
   * Maximum length: 24.
   * @nullable
   */
  declare commitmentItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Funds Center.
   * Maximum length: 16.
   * @nullable
   */
  declare fundsCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Base Amount in Document Currency.
   * @nullable
   */
  declare taxBaseAmountInTransCrcy?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Fund.
   * Maximum length: 10.
   * @nullable
   */
  declare fund?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Grant.
   * Maximum length: 20.
   * @nullable
   */
  declare grantId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Base Unit of Measure.
   * Maximum length: 3.
   * @nullable
   */
  declare quantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Base Unit of Measure.
   * Maximum length: 3.
   * @nullable
   */
  declare suplrInvcItmQtyUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ISO Code for Unit of Measurement.
   * Maximum length: 3.
   * @nullable
   */
  declare suplrInvcItmQtyUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Quantity.
   * @nullable
   */
  declare quantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Trading Partner's Business Area.
   * Maximum length: 4.
   * @nullable
   */
  declare partnerBusinessArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Transaction Type.
   * Maximum length: 3.
   * @nullable
   */
  declare financialTransactionType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Reporting Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  declare taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Document Number for Earmarked Funds.
   * Maximum length: 10.
   * @nullable
   */
  declare earmarkedFundsDocument?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Earmarked Funds: Document Item.
   * Maximum length: 3.
   * @nullable
   */
  declare earmarkedFundsDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Budget Period.
   * Maximum length: 10.
   * @nullable
   */
  declare budgetPeriod?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Service Document ID.
   * Maximum length: 10.
   * @nullable
   */
  declare serviceDocument?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Service Document Item ID.
   * Maximum length: 6.
   * @nullable
   */
  declare serviceDocumentItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Service Document Type.
   * Maximum length: 4.
   * @nullable
   */
  declare serviceDocumentType?: DeserializedType<T, 'Edm.String'> | null;

  constructor(_entityApi: SupplierInvoiceItemGlAcctApi<T>) {
    super(_entityApi);
  }
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
