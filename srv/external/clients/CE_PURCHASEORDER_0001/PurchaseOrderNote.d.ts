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
} from '@sap-cloud-sdk/odata-v4';
import type { PurchaseOrderNoteApi } from './PurchaseOrderNoteApi';
import { PurchaseOrder, PurchaseOrderType } from './PurchaseOrder';
/**
 * This class represents the entity "PurchaseOrderNote" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
export declare class PurchaseOrderNote<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements PurchaseOrderNoteType<T>
{
  /**
   * Technical entity name for PurchaseOrderNote.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the PurchaseOrderNote entity.
   */
  static _keys: string[];
  /**
   * Purchase Order.
   * Maximum length: 10.
   */
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Text Object Type.
   * Maximum length: 4.
   */
  textObjectType: DeserializedType<T, 'Edm.String'>;
  /**
   * Language.
   * Maximum length: 2.
   */
  language: DeserializedType<T, 'Edm.String'>;
  /**
   * Plain Long Text.
   */
  plainLongText: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-one navigation property to the {@link PurchaseOrder} entity.
   */
  purchaseOrder_1?: PurchaseOrder<T> | null;
  constructor(_entityApi: PurchaseOrderNoteApi<T>);
}
export interface PurchaseOrderNoteType<
  T extends DeSerializers = DefaultDeSerializers
> {
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  textObjectType: DeserializedType<T, 'Edm.String'>;
  language: DeserializedType<T, 'Edm.String'>;
  plainLongText: DeserializedType<T, 'Edm.String'>;
  purchaseOrder_1?: PurchaseOrderType<T> | null;
}
