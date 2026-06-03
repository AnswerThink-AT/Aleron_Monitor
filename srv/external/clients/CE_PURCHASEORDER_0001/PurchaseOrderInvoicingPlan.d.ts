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
import type { PurchaseOrderInvoicingPlanApi } from './PurchaseOrderInvoicingPlanApi';
import {
  PurchaseOrderInvoicingPlanItem,
  PurchaseOrderInvoicingPlanItemType
} from './PurchaseOrderInvoicingPlanItem';
import { PurchaseOrder, PurchaseOrderType } from './PurchaseOrder';
import { PurchaseOrderItem, PurchaseOrderItemType } from './PurchaseOrderItem';
/**
 * This class represents the entity "PurchaseOrderInvoicingPlan" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
export declare class PurchaseOrderInvoicingPlan<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements PurchaseOrderInvoicingPlanType<T>
{
  /**
   * Technical entity name for PurchaseOrderInvoicingPlan.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the PurchaseOrderInvoicingPlan entity.
   */
  static _keys: string[];
  /**
   * Purchase Order.
   * Maximum length: 10.
   */
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Item.
   * Maximum length: 5.
   */
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Invoicing Plan.
   * Maximum length: 10.
   */
  invoicingPlan: DeserializedType<T, 'Edm.String'>;
  /**
   * Invoicing Plan Type.
   * Maximum length: 2.
   */
  invoicingPlanType: DeserializedType<T, 'Edm.String'>;
  /**
   * Invoicing Plan Start Date.
   * @nullable
   */
  invoicingPlanStartDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Invoicing Plan End Date.
   * @nullable
   */
  invoicingPlanEndDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Invoicing Plan Next Invc Date Rule.
   * Maximum length: 2.
   */
  invoicingPlanNextInvcDateRule: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchasing Organization.
   * Maximum length: 4.
   */
  purchasingOrganization: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchasing Group.
   * Maximum length: 3.
   */
  purchasingGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Type.
   * Maximum length: 4.
   */
  purchaseOrderType: DeserializedType<T, 'Edm.String'>;
  /**
   * Plant.
   * Maximum length: 4.
   */
  plant: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-many navigation property to the {@link PurchaseOrderInvoicingPlanItem} entity.
   */
  poInvoicingPlanItem: PurchaseOrderInvoicingPlanItem<T>[];
  /**
   * One-to-one navigation property to the {@link PurchaseOrder} entity.
   */
  purchaseOrder_1?: PurchaseOrder<T> | null;
  /**
   * One-to-one navigation property to the {@link PurchaseOrderItem} entity.
   */
  purchaseOrderItem_1?: PurchaseOrderItem<T> | null;
  constructor(_entityApi: PurchaseOrderInvoicingPlanApi<T>);
}
export interface PurchaseOrderInvoicingPlanType<
  T extends DeSerializers = DefaultDeSerializers
> {
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  invoicingPlan: DeserializedType<T, 'Edm.String'>;
  invoicingPlanType: DeserializedType<T, 'Edm.String'>;
  invoicingPlanStartDate?: DeserializedType<T, 'Edm.Date'> | null;
  invoicingPlanEndDate?: DeserializedType<T, 'Edm.Date'> | null;
  invoicingPlanNextInvcDateRule: DeserializedType<T, 'Edm.String'>;
  purchasingOrganization: DeserializedType<T, 'Edm.String'>;
  purchasingGroup: DeserializedType<T, 'Edm.String'>;
  purchaseOrderType: DeserializedType<T, 'Edm.String'>;
  plant: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  poInvoicingPlanItem: PurchaseOrderInvoicingPlanItemType<T>[];
  purchaseOrder_1?: PurchaseOrderType<T> | null;
  purchaseOrderItem_1?: PurchaseOrderItemType<T> | null;
}
