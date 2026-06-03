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
import { Sap_Message } from './Sap_Message';
import type { SalesOrderItemPartnerApi } from './SalesOrderItemPartnerApi';
import { SalesOrderItem, SalesOrderItemType } from './SalesOrderItem';
import { SalesOrder, SalesOrderType } from './SalesOrder';
/**
 * This class represents the entity "SalesOrderItemPartner" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
export declare class SalesOrderItemPartner<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SalesOrderItemPartnerType<T>
{
  /**
   * Technical entity name for SalesOrderItemPartner.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SalesOrderItemPartner entity.
   */
  static _keys: string[];
  /**
   * Sales Order.
   * Maximum length: 10.
   */
  salesOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Order Item.
   * Maximum length: 6.
   */
  salesOrderItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Partner Function.
   * Maximum length: 2.
   */
  partnerFunction: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer.
   * Maximum length: 10.
   * @nullable
   */
  customer?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Supplier.
   * Maximum length: 10.
   * @nullable
   */
  supplier?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Personnel.
   * Maximum length: 8.
   * @nullable
   */
  personnel?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Contact Person.
   * Maximum length: 10.
   * @nullable
   */
  contactPerson?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Partner Is Specific For Sd Doc Item.
   */
  partnerIsSpecificForSdDocItem: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-one navigation property to the {@link SalesOrderItem} entity.
   */
  item?: SalesOrderItem<T> | null;
  /**
   * One-to-one navigation property to the {@link SalesOrder} entity.
   */
  salesOrder_1?: SalesOrder<T> | null;
  constructor(_entityApi: SalesOrderItemPartnerApi<T>);
}
export interface SalesOrderItemPartnerType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesOrder: DeserializedType<T, 'Edm.String'>;
  salesOrderItem: DeserializedType<T, 'Edm.String'>;
  partnerFunction: DeserializedType<T, 'Edm.String'>;
  customer?: DeserializedType<T, 'Edm.String'> | null;
  supplier?: DeserializedType<T, 'Edm.String'> | null;
  personnel?: DeserializedType<T, 'Edm.String'> | null;
  contactPerson?: DeserializedType<T, 'Edm.String'> | null;
  partnerIsSpecificForSdDocItem: DeserializedType<T, 'Edm.Boolean'>;
  sapMessages: Sap_Message<T>[];
  item?: SalesOrderItemType<T> | null;
  salesOrder_1?: SalesOrderType<T> | null;
}
