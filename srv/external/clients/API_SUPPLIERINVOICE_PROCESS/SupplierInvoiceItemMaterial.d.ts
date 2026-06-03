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
import type { SupplierInvoiceItemMaterialApi } from './SupplierInvoiceItemMaterialApi';
/**
 * This class represents the entity "A_SupplierInvoiceItemMaterial" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SupplierInvoiceItemMaterial<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SupplierInvoiceItemMaterialType<T>
{
  /**
   * Technical entity name for SupplierInvoiceItemMaterial.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SupplierInvoiceItemMaterial entity.
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
   * Material Number.
   * Maximum length: 40.
   * @nullable
   */
  material?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Valuation Area.
   * Maximum length: 4.
   * @nullable
   */
  valuationArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company Code.
   * Maximum length: 4.
   * @nullable
   */
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Plant.
   * Maximum length: 4.
   * @nullable
   */
  plant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Valuation Type.
   * Maximum length: 10.
   * @nullable
   */
  inventoryValuationType?: DeserializedType<T, 'Edm.String'> | null;
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
   * Debit/Credit Indicator.
   * Maximum length: 1.
   * @nullable
   */
  debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Line Item Not Liable to Cash Discount?.
   * @nullable
   */
  isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  constructor(_entityApi: SupplierInvoiceItemMaterialApi<T>);
}
export interface SupplierInvoiceItemMaterialType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  supplierInvoiceItem: DeserializedType<T, 'Edm.String'>;
  material?: DeserializedType<T, 'Edm.String'> | null;
  valuationArea?: DeserializedType<T, 'Edm.String'> | null;
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  plant?: DeserializedType<T, 'Edm.String'> | null;
  inventoryValuationType?: DeserializedType<T, 'Edm.String'> | null;
  taxCode?: DeserializedType<T, 'Edm.String'> | null;
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  supplierInvoiceItemAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  quantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcItmQtyUnitSapCode?: DeserializedType<T, 'Edm.String'> | null;
  suplrInvcItmQtyUnitIsoCode?: DeserializedType<T, 'Edm.String'> | null;
  quantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
  isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
}
