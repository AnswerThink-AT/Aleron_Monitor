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
import type { SuplrInvcHeaderWhldgTaxApi } from './SuplrInvcHeaderWhldgTaxApi';

/**
 * This class represents the entity "A_SuplrInvcHeaderWhldgTax" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export class SuplrInvcHeaderWhldgTax<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcHeaderWhldgTaxType<T>
{
  /**
   * Technical entity name for SuplrInvcHeaderWhldgTax.
   */
  static override _entityName = 'A_SuplrInvcHeaderWhldgTax';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SuplrInvcHeaderWhldgTax entity.
   */
  static _keys = ['SupplierInvoice', 'FiscalYear', 'WithholdingTaxType'];
  /**
   * Document Number of an Invoice Document.
   * Maximum length: 10.
   */
  declare supplierInvoice: DeserializedType<T, 'Edm.String'>;
  /**
   * Fiscal Year.
   * Maximum length: 4.
   */
  declare fiscalYear: DeserializedType<T, 'Edm.String'>;
  /**
   * Indicator for Withholding Tax Type.
   * Maximum length: 2.
   */
  declare withholdingTaxType: DeserializedType<T, 'Edm.String'>;
  /**
   * Currency Key.
   * Maximum length: 5.
   * @nullable
   */
  declare documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Withholding Tax Code.
   * Maximum length: 2.
   * @nullable
   */
  declare withholdingTaxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Withholding Tax Base Amount in Document Currency.
   * @nullable
   */
  declare withholdingTaxBaseAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Withholding Tax Amount Entered Manually in Document Currency.
   * @nullable
   */
  declare manuallyEnteredWhldgTaxAmount?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Indicator: Withholding Tax Amount Entered Manually.
   * @nullable
   */
  declare whldgTaxIsEnteredManually?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Indicator: Withholding Tax Base Amount Entered Manually.
   * @nullable
   */
  declare whldgTaxBaseIsEnteredManually?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;

  constructor(_entityApi: SuplrInvcHeaderWhldgTaxApi<T>) {
    super(_entityApi);
  }
}

export interface SuplrInvcHeaderWhldgTaxType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  withholdingTaxType: DeserializedType<T, 'Edm.String'>;
  documentCurrency?: DeserializedType<T, 'Edm.String'> | null;
  withholdingTaxCode?: DeserializedType<T, 'Edm.String'> | null;
  withholdingTaxBaseAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  manuallyEnteredWhldgTaxAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  whldgTaxIsEnteredManually?: DeserializedType<T, 'Edm.Boolean'> | null;
  whldgTaxBaseIsEnteredManually?: DeserializedType<T, 'Edm.Boolean'> | null;
}
