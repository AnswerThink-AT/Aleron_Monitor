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
import type { SupplierInvoiceTaxApi } from './SupplierInvoiceTaxApi';
/**
 * This class represents the entity "A_SupplierInvoiceTax" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SupplierInvoiceTax<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SupplierInvoiceTaxType<T>
{
  /**
   * Technical entity name for SupplierInvoiceTax.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SupplierInvoiceTax entity.
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
   * Tax code.
   * Maximum length: 2.
   */
  taxCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Document Item in Invoice Document.
   * Maximum length: 6.
   */
  supplierInvoiceTaxCounter: DeserializedType<T, 'Edm.String'>;
  /**
   * Currency Key.
   * Maximum length: 5.
   * @nullable
   */
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Amount in Document Currency with +/- Sign.
   * @nullable
   */
  taxAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Tax Base Amount in Document Currency.
   * @nullable
   */
  taxBaseAmountInTransCrcy?: DeserializedType<T, 'Edm.Decimal'> | null;
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
   * Valid-From Date of the Tax Rate.
   * @nullable
   */
  taxRateValidityStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  constructor(_entityApi: SupplierInvoiceTaxApi<T>);
}
export interface SupplierInvoiceTaxType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  taxCode: DeserializedType<T, 'Edm.String'>;
  supplierInvoiceTaxCounter: DeserializedType<T, 'Edm.String'>;
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  taxAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  taxBaseAmountInTransCrcy?: DeserializedType<T, 'Edm.Decimal'> | null;
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  taxCountry?: DeserializedType<T, 'Edm.String'> | null;
  taxDeterminationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  taxRateValidityStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
}
