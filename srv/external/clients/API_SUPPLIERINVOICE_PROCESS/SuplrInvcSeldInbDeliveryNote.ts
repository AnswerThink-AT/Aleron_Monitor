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
export class SuplrInvcSeldInbDeliveryNote<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcSeldInbDeliveryNoteType<T>
{
  /**
   * Technical entity name for SuplrInvcSeldInbDeliveryNote.
   */
  static override _entityName = 'A_SuplrInvcSeldInbDeliveryNote';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SuplrInvcSeldInbDeliveryNote entity.
   */
  static _keys = ['SupplierInvoice', 'FiscalYear', 'InboundDeliveryNote'];
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
   * Number of External Delivery Note.
   * Maximum length: 16.
   */
  declare inboundDeliveryNote: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: SuplrInvcSeldInbDeliveryNoteApi<T>) {
    super(_entityApi);
  }
}

export interface SuplrInvcSeldInbDeliveryNoteType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  inboundDeliveryNote: DeserializedType<T, 'Edm.String'>;
}
