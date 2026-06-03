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
import type { SuplrInvcItemAcctAssgmtApi } from './SuplrInvcItemAcctAssgmtApi';
/**
 * This class represents the entity "A_SuplrInvcItemAcctAssgmt" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SuplrInvcItemAcctAssgmt<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcItemAcctAssgmtType<T>
{
  /**
   * Technical entity name for SuplrInvcItemAcctAssgmt.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SuplrInvcItemAcctAssgmt entity.
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
   * Four Character Sequential Number for Coding Block.
   * Maximum length: 4.
   */
  ordinalNumber: DeserializedType<T, 'Edm.String'>;
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
  suplrInvcAcctAssignmentAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
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
  quantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Tax on Sales/Purchases Code.
   * Maximum length: 2.
   * @nullable
   */
  taxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sequential Number of Account Assignment.
   * Maximum length: 2.
   * @nullable
   */
  accountAssignmentNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Unplanned Account Assignment from Invoice Verification.
   * @nullable
   */
  accountAssignmentIsUnplanned?: DeserializedType<T, 'Edm.Boolean'> | null;
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
   * Main Asset Number.
   * Maximum length: 12.
   * @nullable
   */
  masterFixedAsset?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Asset Subnumber.
   * Maximum length: 4.
   * @nullable
   */
  fixedAsset?: DeserializedType<T, 'Edm.String'> | null;
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
   * Order Number.
   * Maximum length: 12.
   * @nullable
   */
  internalOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Routing Number of Operations in the Order.
   * Maximum length: 10.
   * @nullable
   */
  projectNetworkInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Routing Number of Operations in the Order.
   * Maximum length: 10.
   * @nullable
   */
  networkActivityInternalId?: DeserializedType<T, 'Edm.String'> | null;
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
   * Trading Partner's Business Area.
   * Maximum length: 4.
   * @nullable
   */
  partnerBusinessArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company Code.
   * Maximum length: 4.
   * @nullable
   */
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item Text.
   * Maximum length: 50.
   * @nullable
   */
  suplrInvcAccountAssignmentText?: DeserializedType<T, 'Edm.String'> | null;
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
  quantityInPurchaseOrderUnit?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Profitability Segment Number (CO-PA).
   * Maximum length: 10.
   * @nullable
   */
  profitabilitySegment?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Budget Period.
   * Maximum length: 10.
   * @nullable
   */
  budgetPeriod?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Reporting Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date for Determining Tax Rates.
   * @nullable
   */
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  constructor(_entityApi: SuplrInvcItemAcctAssgmtApi<T>);
}
export interface SuplrInvcItemAcctAssgmtType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  ordinalNumber: DeserializedType<T, 'Edm.String'>;
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
  suplrInvcAcctAssignmentAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  purchaseOrderQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderQtyUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderQtyUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  quantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  taxCode?: DeserializedType<T, 'Edm.String'> | null;
  accountAssignmentNumber?: DeserializedType<T, 'Edm.String'> | null;
  accountAssignmentIsUnplanned?: DeserializedType<T, 'Edm.Boolean'> | null;
  personnelNumber?: DeserializedType<T, 'Edm.String'> | null;
  workItem?: DeserializedType<T, 'Edm.String'> | null;
  masterFixedAsset?: DeserializedType<T, 'Edm.String'> | null;
  fixedAsset?: DeserializedType<T, 'Edm.String'> | null;
  debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  internalOrder?: DeserializedType<T, 'Edm.String'> | null;
  projectNetworkInternalId?: DeserializedType<T, 'Edm.String'> | null;
  networkActivityInternalId?: DeserializedType<T, 'Edm.String'> | null;
  projectNetwork?: DeserializedType<T, 'Edm.String'> | null;
  networkActivity?: DeserializedType<T, 'Edm.String'> | null;
  commitmentItem?: DeserializedType<T, 'Edm.String'> | null;
  fundsCenter?: DeserializedType<T, 'Edm.String'> | null;
  fund?: DeserializedType<T, 'Edm.String'> | null;
  grantId?: DeserializedType<T, 'Edm.String'> | null;
  partnerBusinessArea?: DeserializedType<T, 'Edm.String'> | null;
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcAccountAssignmentText?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderPriceUnit?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderPriceUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  purchaseOrderPriceUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  quantityInPurchaseOrderUnit?: DeserializedType<T, 'Edm.Decimal'> | null;
  profitabilitySegment?: DeserializedType<T, 'Edm.String'> | null;
  budgetPeriod?: DeserializedType<T, 'Edm.String'> | null;
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
}
