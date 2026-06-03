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
export class SupplierInvoiceItemMaterial<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SupplierInvoiceItemMaterialType<T>
{
  /**
   * Technical entity name for SupplierInvoiceItemMaterial.
   */
  static override _entityName = 'A_SupplierInvoiceItemMaterial';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SupplierInvoiceItemMaterial entity.
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
   * Material Number.
   * Maximum length: 40.
   * @nullable
   */
  declare material?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Valuation Area.
   * Maximum length: 4.
   * @nullable
   */
  declare valuationArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company Code.
   * Maximum length: 4.
   * @nullable
   */
  declare companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Plant.
   * Maximum length: 4.
   * @nullable
   */
  declare plant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Valuation Type.
   * Maximum length: 10.
   * @nullable
   */
  declare inventoryValuationType?: DeserializedType<T, 'Edm.String'> | null;
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
   * Debit/Credit Indicator.
   * Maximum length: 1.
   * @nullable
   */
  declare debitCreditCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Line Item Not Liable to Cash Discount?.
   * @nullable
   */
  declare isNotCashDiscountLiable?: DeserializedType<T, 'Edm.Boolean'> | null;

  constructor(_entityApi: SupplierInvoiceItemMaterialApi<T>) {
    super(_entityApi);
  }
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
