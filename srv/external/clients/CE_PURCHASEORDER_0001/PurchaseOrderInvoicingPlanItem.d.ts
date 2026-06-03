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
import type { PurchaseOrderInvoicingPlanItemApi } from './PurchaseOrderInvoicingPlanItemApi';
import { PurchaseOrder, PurchaseOrderType } from './PurchaseOrder';
import {
  PurchaseOrderInvoicingPlan,
  PurchaseOrderInvoicingPlanType
} from './PurchaseOrderInvoicingPlan';
import { PurchaseOrderItem, PurchaseOrderItemType } from './PurchaseOrderItem';
/**
 * This class represents the entity "PurchaseOrderInvoicingPlanItem" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
export declare class PurchaseOrderInvoicingPlanItem<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements PurchaseOrderInvoicingPlanItemType<T>
{
  /**
   * Technical entity name for PurchaseOrderInvoicingPlanItem.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the PurchaseOrderInvoicingPlanItem entity.
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
   * Invoicing Plan Item.
   * Maximum length: 6.
   */
  invoicingPlanItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Invoicing Plan.
   * Maximum length: 10.
   */
  invoicingPlan: DeserializedType<T, 'Edm.String'>;
  /**
   * Invoicing Plan Settlement From Dte.
   * @nullable
   */
  invoicingPlanSettlementFromDte?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Invoicing Plan Settlement To Dte.
   * @nullable
   */
  invoicingPlanSettlementToDte?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Invoicing Plan Invoicing Date.
   * @nullable
   */
  invoicingPlanInvoicingDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Invoicing Plan Amount.
   */
  invoicingPlanAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Transaction Currency.
   * Maximum length: 3.
   */
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
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
   * One-to-one navigation property to the {@link PurchaseOrder} entity.
   */
  purchaseOrder_1?: PurchaseOrder<T> | null;
  /**
   * One-to-one navigation property to the {@link PurchaseOrderInvoicingPlan} entity.
   */
  purchaseOrderInvoicingPlan?: PurchaseOrderInvoicingPlan<T> | null;
  /**
   * One-to-one navigation property to the {@link PurchaseOrderItem} entity.
   */
  purchaseOrderItem_1?: PurchaseOrderItem<T> | null;
  constructor(_entityApi: PurchaseOrderInvoicingPlanItemApi<T>);
}
export interface PurchaseOrderInvoicingPlanItemType<
  T extends DeSerializers = DefaultDeSerializers
> {
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  invoicingPlanItem: DeserializedType<T, 'Edm.String'>;
  invoicingPlan: DeserializedType<T, 'Edm.String'>;
  invoicingPlanSettlementFromDte?: DeserializedType<T, 'Edm.Date'> | null;
  invoicingPlanSettlementToDte?: DeserializedType<T, 'Edm.Date'> | null;
  invoicingPlanInvoicingDate?: DeserializedType<T, 'Edm.Date'> | null;
  invoicingPlanAmount: DeserializedType<T, 'Edm.Decimal'>;
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  purchasingOrganization: DeserializedType<T, 'Edm.String'>;
  purchasingGroup: DeserializedType<T, 'Edm.String'>;
  purchaseOrderType: DeserializedType<T, 'Edm.String'>;
  plant: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  purchaseOrder_1?: PurchaseOrderType<T> | null;
  purchaseOrderInvoicingPlan?: PurchaseOrderInvoicingPlanType<T> | null;
  purchaseOrderItem_1?: PurchaseOrderItemType<T> | null;
}
