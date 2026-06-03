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
import type { SuplrInvcSeldInbDeliveryNoteApi } from './SuplrInvcSeldInbDeliveryNoteApi';
/**
 * This class represents the entity "A_SuplrInvcSeldInbDeliveryNote" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SuplrInvcSeldInbDeliveryNote<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcSeldInbDeliveryNoteType<T>
{
  /**
   * Technical entity name for SuplrInvcSeldInbDeliveryNote.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SuplrInvcSeldInbDeliveryNote entity.
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
   * Number of External Delivery Note.
   * Maximum length: 16.
   */
  inboundDeliveryNote: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: SuplrInvcSeldInbDeliveryNoteApi<T>);
}
export interface SuplrInvcSeldInbDeliveryNoteType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  inboundDeliveryNote: DeserializedType<T, 'Edm.String'>;
}
