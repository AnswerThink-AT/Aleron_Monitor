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
export class SuplrInvcItemAcctAssgmt<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcItemAcctAssgmtType<T>
{
  /**
   * Technical entity name for SuplrInvcItemAcctAssgmt.
   */
  static override _entityName = 'A_SuplrInvcItemAcctAssgmt';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SuplrInvcItemAcctAssgmt entity.
   */
  static _keys = [
    'SupplierInvoice',
    'FiscalYear',
    'SupplierInvoiceItem',
    'OrdinalNumber'
  ];
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
   * Four Character Sequential Number for Coding Block.
   * Maximum length: 4.
   */
  declare ordinalNumber: DeserializedType<T, 'Edm.String'>;
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
  declare suplrInvcAcctAssignmentAmount?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
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
  declare quantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Tax on Sales/Purchases Code.
   * Maximum length: 2.
   * @nullable
   */
  declare taxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sequential Number of Account Assignment.
   * Maximum length: 2.
   * @nullable
   */
  declare accountAssignmentNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Unplanned Account Assignment from Invoice Verification.
   * @nullable
   */
  declare accountAssignmentIsUnplanned?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
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
   * Main Asset Number.
   * Maximum length: 12.
   * @nullable
   */
  declare masterFixedAsset?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Asset Subnumber.
   * Maximum length: 4.
   * @nullable
   */
  declare fixedAsset?: DeserializedType<T, 'Edm.String'> | null;
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
   * Order Number.
   * Maximum length: 12.
   * @nullable
   */
  declare internalOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Routing Number of Operations in the Order.
   * Maximum length: 10.
   * @nullable
   */
  declare projectNetworkInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Routing Number of Operations in the Order.
   * Maximum length: 10.
   * @nullable
   */
  declare networkActivityInternalId?: DeserializedType<T, 'Edm.String'> | null;
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
   * Trading Partner's Business Area.
   * Maximum length: 4.
   * @nullable
   */
  declare partnerBusinessArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company Code.
   * Maximum length: 4.
   * @nullable
   */
  declare companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Item Text.
   * Maximum length: 50.
   * @nullable
   */
  declare suplrInvcAccountAssignmentText?: DeserializedType<
    T,
    'Edm.String'
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
  declare quantityInPurchaseOrderUnit?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Profitability Segment Number (CO-PA).
   * Maximum length: 10.
   * @nullable
   */
  declare profitabilitySegment?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Budget Period.
   * Maximum length: 10.
   * @nullable
   */
  declare budgetPeriod?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Reporting Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  declare taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Date for Determining Tax Rates.
   * @nullable
   */
  declare taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;

  constructor(_entityApi: SuplrInvcItemAcctAssgmtApi<T>) {
    super(_entityApi);
  }
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
