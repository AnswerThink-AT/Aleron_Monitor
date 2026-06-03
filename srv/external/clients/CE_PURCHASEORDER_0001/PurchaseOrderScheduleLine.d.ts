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
import type { PurchaseOrderScheduleLineApi } from './PurchaseOrderScheduleLineApi';
import { PurchaseOrder, PurchaseOrderType } from './PurchaseOrder';
import { PurchaseOrderItem, PurchaseOrderItemType } from './PurchaseOrderItem';
import {
  PoSubcontractingComponent,
  PoSubcontractingComponentType
} from './PoSubcontractingComponent';
/**
 * This class represents the entity "PurchaseOrderScheduleLine" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
export declare class PurchaseOrderScheduleLine<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements PurchaseOrderScheduleLineType<T>
{
  /**
   * Technical entity name for PurchaseOrderScheduleLine.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the PurchaseOrderScheduleLine entity.
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
   * Schedule Line.
   * Maximum length: 4.
   */
  scheduleLine: DeserializedType<T, 'Edm.String'>;
  /**
   * Schedule Line Delivery Date.
   * @nullable
   */
  scheduleLineDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Sched Line Stsc Delivery Date.
   * @nullable
   */
  schedLineStscDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Performance Period Start Date.
   * @nullable
   */
  performancePeriodStartDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Performance Period End Date.
   * @nullable
   */
  performancePeriodEndDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Schedule Line Delivery Time.
   */
  scheduleLineDeliveryTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  /**
   * Batch.
   * Maximum length: 10.
   */
  batch: DeserializedType<T, 'Edm.String'>;
  /**
   * Batch By Supplier.
   * Maximum length: 15.
   */
  batchBySupplier: DeserializedType<T, 'Edm.String'>;
  /**
   * Schedule Line Order Quantity.
   */
  scheduleLineOrderQuantity: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Open Purchase Order Quantity.
   */
  openPurchaseOrderQuantity: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Purchase Order Quantity Unit.
   * Maximum length: 3.
   */
  purchaseOrderQuantityUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Currency.
   * Maximum length: 3.
   */
  currency: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Requisition.
   * Maximum length: 10.
   */
  purchaseRequisition: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Requisition Item.
   * Maximum length: 5.
   */
  purchaseRequisitionItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Deliv Date Category.
   * Maximum length: 1.
   */
  delivDateCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Schedule Line Order Date.
   * @nullable
   */
  scheduleLineOrderDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Product Availability Date.
   * @nullable
   */
  productAvailabilityDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Loading Date.
   * @nullable
   */
  loadingDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Loading Time.
   */
  loadingTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  /**
   * Transportation Planning Date.
   * @nullable
   */
  transportationPlanningDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Transportation Planning Time.
   */
  transportationPlanningTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  /**
   * Goods Issue Date.
   * @nullable
   */
  goodsIssueDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Goods Issue Time.
   */
  goodsIssueTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  /**
   * Route Schedule.
   * Maximum length: 10.
   */
  routeSchedule: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Availability Time.
   */
  productAvailabilityTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-one navigation property to the {@link PurchaseOrder} entity.
   */
  purchaseOrder_1?: PurchaseOrder<T> | null;
  /**
   * One-to-one navigation property to the {@link PurchaseOrderItem} entity.
   */
  purchaseOrderItem_1?: PurchaseOrderItem<T> | null;
  /**
   * One-to-many navigation property to the {@link PoSubcontractingComponent} entity.
   */
  subcontractingComponent: PoSubcontractingComponent<T>[];
  constructor(_entityApi: PurchaseOrderScheduleLineApi<T>);
}
export interface PurchaseOrderScheduleLineType<
  T extends DeSerializers = DefaultDeSerializers
> {
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  scheduleLine: DeserializedType<T, 'Edm.String'>;
  scheduleLineDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  schedLineStscDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  performancePeriodStartDate?: DeserializedType<T, 'Edm.Date'> | null;
  performancePeriodEndDate?: DeserializedType<T, 'Edm.Date'> | null;
  scheduleLineDeliveryTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  batch: DeserializedType<T, 'Edm.String'>;
  batchBySupplier: DeserializedType<T, 'Edm.String'>;
  scheduleLineOrderQuantity: DeserializedType<T, 'Edm.Decimal'>;
  openPurchaseOrderQuantity: DeserializedType<T, 'Edm.Decimal'>;
  purchaseOrderQuantityUnit: DeserializedType<T, 'Edm.String'>;
  currency: DeserializedType<T, 'Edm.String'>;
  purchaseRequisition: DeserializedType<T, 'Edm.String'>;
  purchaseRequisitionItem: DeserializedType<T, 'Edm.String'>;
  delivDateCategory: DeserializedType<T, 'Edm.String'>;
  scheduleLineOrderDate?: DeserializedType<T, 'Edm.Date'> | null;
  productAvailabilityDate?: DeserializedType<T, 'Edm.Date'> | null;
  loadingDate?: DeserializedType<T, 'Edm.Date'> | null;
  loadingTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  transportationPlanningDate?: DeserializedType<T, 'Edm.Date'> | null;
  transportationPlanningTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  goodsIssueDate?: DeserializedType<T, 'Edm.Date'> | null;
  goodsIssueTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  routeSchedule: DeserializedType<T, 'Edm.String'>;
  productAvailabilityTime: DeserializedType<T, 'Edm.TimeOfDay'>;
  sapMessages: Sap_Message<T>[];
  purchaseOrder_1?: PurchaseOrderType<T> | null;
  purchaseOrderItem_1?: PurchaseOrderItemType<T> | null;
  subcontractingComponent: PoSubcontractingComponentType<T>[];
}
