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
import type { SuplrInvcSeldPurgDocumentApi } from './SuplrInvcSeldPurgDocumentApi';
/**
 * This class represents the entity "A_SuplrInvcSeldPurgDocument" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SuplrInvcSeldPurgDocument<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcSeldPurgDocumentType<T>
{
  /**
   * Technical entity name for SuplrInvcSeldPurgDocument.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SuplrInvcSeldPurgDocument entity.
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
   * Purchasing Document Number.
   * Maximum length: 10.
   */
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Number of Purchasing Document.
   * Maximum length: 5.
   */
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: SuplrInvcSeldPurgDocumentApi<T>);
}
export interface SuplrInvcSeldPurgDocumentType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
}
