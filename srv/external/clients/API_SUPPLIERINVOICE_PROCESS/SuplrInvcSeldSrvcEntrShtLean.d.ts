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
import type { SuplrInvcSeldSrvcEntrShtLeanApi } from './SuplrInvcSeldSrvcEntrShtLeanApi';
/**
 * This class represents the entity "A_SuplrInvcSeldSrvcEntrShtLean" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export declare class SuplrInvcSeldSrvcEntrShtLean<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcSeldSrvcEntrShtLeanType<T>
{
  /**
   * Technical entity name for SuplrInvcSeldSrvcEntrShtLean.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SuplrInvcSeldSrvcEntrShtLean entity.
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
   * Service Entry Sheet.
   * Maximum length: 10.
   */
  serviceEntrySheet: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Number of Service Entry Sheet.
   * Maximum length: 5.
   */
  serviceEntrySheetItem: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: SuplrInvcSeldSrvcEntrShtLeanApi<T>);
}
export interface SuplrInvcSeldSrvcEntrShtLeanType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  serviceEntrySheet: DeserializedType<T, 'Edm.String'>;
  serviceEntrySheetItem: DeserializedType<T, 'Edm.String'>;
}
