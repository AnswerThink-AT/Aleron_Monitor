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
export class SuplrInvcSeldSrvcEntrShtLean<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvcSeldSrvcEntrShtLeanType<T>
{
  /**
   * Technical entity name for SuplrInvcSeldSrvcEntrShtLean.
   */
  static override _entityName = 'A_SuplrInvcSeldSrvcEntrShtLean';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SuplrInvcSeldSrvcEntrShtLean entity.
   */
  static _keys = [
    'SupplierInvoice',
    'FiscalYear',
    'ServiceEntrySheet',
    'ServiceEntrySheetItem'
  ];
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
   * Service Entry Sheet.
   * Maximum length: 10.
   */
  declare serviceEntrySheet: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Number of Service Entry Sheet.
   * Maximum length: 5.
   */
  declare serviceEntrySheetItem: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: SuplrInvcSeldSrvcEntrShtLeanApi<T>) {
    super(_entityApi);
  }
}

export interface SuplrInvcSeldSrvcEntrShtLeanType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  serviceEntrySheet: DeserializedType<T, 'Edm.String'>;
  serviceEntrySheetItem: DeserializedType<T, 'Edm.String'>;
}
