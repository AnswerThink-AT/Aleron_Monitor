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
import type { SupplierInvoiceItemAssetApi } from './SupplierInvoiceItemAssetApi';
/**
 * This class represents the entity "A_SupplierInvoiceItemAsset" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SupplierInvoiceItemAsset<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SupplierInvoiceItemAssetType<T>
{
  /**
   * Technical entity name for SupplierInvoiceItemAsset.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SupplierInvoiceItemAsset entity.
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
   * Profit Center.
   * Maximum length: 10.
   * @nullable
   */
  profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * G/L Account Number.
   * Maximum length: 10.
   * @nullable
   */
  glAccount?: DeserializedType<T, 'Edm.String'> | null;
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
   * Tax Jurisdiction.
   * Maximum length: 15.
   * @nullable
   */
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
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
  /**
   * Debit/Credit Indicator.
   * Maximum length: 1.
   * @nullable
   */
  debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
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
   * Asset Value Date.
   * @nullable
   */
  assetValueDate?: DeserializedType<T, 'Edm.DateTime'> | null;
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
  constructor(_entityApi: SupplierInvoiceItemAssetApi<T>);
}
export interface SupplierInvoiceItemAssetType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  masterFixedAsset?: DeserializedType<T, 'Edm.String'> | null;
  fixedAsset?: DeserializedType<T, 'Edm.String'> | null;
  profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  glAccount?: DeserializedType<T, 'Edm.String'> | null;
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceItemAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  taxCode?: DeserializedType<T, 'Edm.String'> | null;
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceItemText?: DeserializedType<T, 'Edm.String'> | null;
  assignmentReference?: DeserializedType<T, 'Edm.String'> | null;
  isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  assetValueDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  quantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcItmQtyUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcItmQtyUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  quantity?: DeserializedType<T, 'Edm.Decimal'> | null;
}
