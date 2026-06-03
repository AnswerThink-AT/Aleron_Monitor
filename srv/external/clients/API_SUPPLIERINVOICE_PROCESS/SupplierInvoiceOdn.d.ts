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
export declare class SupplierInvoiceOdn<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SupplierInvoiceOdnType<T>
{
  /**
   * Technical entity name for SupplierInvoiceOdn.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SupplierInvoiceOdn entity.
   */
  static _keys: string[];
  /**
   * Globally Unique Identifier.
   */
  afdfUniqueKeyUuid: DeserializedType<T, 'Edm.Guid'>;
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
   * Official Document Number Country/Region.
   * Maximum length: 3.
   * @nullable
   */
  officialDocumentNumberCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Official Document Number Type.
   * Maximum length: 6.
   * @nullable
   */
  officialDocumentNumberType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Official Document Number Value.
   * Maximum length: 200.
   * @nullable
   */
  officialDocumentNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ODN Legal Timestamp.
   * Maximum length: 30.
   * @nullable
   */
  odnLegalDateTimeText?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Official Document Number Internal Type.
   * Maximum length: 6.
   * @nullable
   */
  officialDocumentNumberIntType?: DeserializedType<T, 'Edm.String'> | null;
  constructor(_entityApi: SupplierInvoiceOdnApi<T>);
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
