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
import type { SupplierInvoiceOdnApi } from './SupplierInvoiceOdnApi';

/**
 * This class represents the entity "A_SupplierInvoiceODN" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export class SupplierInvoiceOdn<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements SupplierInvoiceOdnType<T>
{
  /**
   * Technical entity name for SupplierInvoiceOdn.
   */
  static override _entityName = 'A_SupplierInvoiceODN';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SupplierInvoiceOdn entity.
   */
  static _keys = ['AFDFUniqueKeyUUID', 'SupplierInvoice', 'FiscalYear'];
  /**
   * Globally Unique Identifier.
   */
  declare afdfUniqueKeyUuid: DeserializedType<T, 'Edm.Guid'>;
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
   * Official Document Number Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  declare officialDocumentNumberCountry?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Official Document Number Type.
   * Maximum length: 6.
   * @nullable
   */
  declare officialDocumentNumberType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Official Document Number Value.
   * Maximum length: 200.
   * @nullable
   */
  declare officialDocumentNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ODN Legal Timestamp.
   * Maximum length: 30.
   * @nullable
   */
  declare odnLegalDateTimeText?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Official Document Number Internal Type.
   * Maximum length: 6.
   * @nullable
   */
  declare officialDocumentNumberIntType?: DeserializedType<
    T,
    'Edm.String'
  > | null;

  constructor(_entityApi: SupplierInvoiceOdnApi<T>) {
    super(_entityApi);
  }
}

export interface SupplierInvoiceOdnType<
  T extends DeSerializers = DefaultDeSerializers
> {
  afdfUniqueKeyUuid: DeserializedType<T, 'Edm.Guid'>;
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  officialDocumentNumberCountry?: DeserializedType<T, 'Edm.String'> | null;
  officialDocumentNumberType?: DeserializedType<T, 'Edm.String'> | null;
  officialDocumentNumber?: DeserializedType<T, 'Edm.String'> | null;
  odnLegalDateTimeText?: DeserializedType<T, 'Edm.String'> | null;
  officialDocumentNumberIntType?: DeserializedType<T, 'Edm.String'> | null;
}
