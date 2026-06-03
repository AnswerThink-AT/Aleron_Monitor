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
import type { SalesOrderScheduleLineApi } from './SalesOrderScheduleLineApi';
import { SalesOrderItem, SalesOrderItemType } from './SalesOrderItem';
import { SalesOrder, SalesOrderType } from './SalesOrder';
/**
 * This class represents the entity "SalesOrderScheduleLine" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
export declare class SalesOrderScheduleLine<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SalesOrderScheduleLineType<T>
{
  /**
   * Technical entity name for SalesOrderScheduleLine.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SalesOrderScheduleLine entity.
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
   * Schedule Line.
   * Maximum length: 4.
   */
  scheduleLine: DeserializedType<T, 'Edm.String'>;
  /**
   * Schedule Line Category.
   * Maximum length: 2.
   */
  scheduleLineCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Schedule Line Order Quantity.
   * @nullable
   */
  scheduleLineOrderQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Order Quantity Sap Unit.
   * Maximum length: 3.
   */
  orderQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Order Quantity Iso Unit.
   * Maximum length: 3.
   */
  orderQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Requested Delivery Date.
   * @nullable
   */
  requestedDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Confirmed Delivery Date.
   * @nullable
   */
  confirmedDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Confd Order Qty By Matl Avail Check.
   * @nullable
   */
  confdOrderQtyByMatlAvailCheck?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Delivered Qty In Order Qty Unit.
   */
  deliveredQtyInOrderQtyUnit: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Open Confd Deliv Qty In Ord Qty Unit.
   */
  openConfdDelivQtyInOrdQtyUnit: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Corrected Qty In Order Qty Unit.
   */
  correctedQtyInOrderQtyUnit: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Deliv Block Reason For Sched Line.
   * Maximum length: 2.
   */
  delivBlockReasonForSchedLine: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Requisition.
   * Maximum length: 10.
   */
  purchaseRequisition: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Requisition Item.
   * Maximum length: 5.
   * @nullable
   */
  purchaseRequisitionItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Goods Movement Type.
   * Maximum length: 3.
   */
  goodsMovementType: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-one navigation property to the {@link SalesOrderItem} entity.
   */
  item?: SalesOrderItem<T> | null;
  /**
   * One-to-one navigation property to the {@link SalesOrder} entity.
   */
  salesOrder_1?: SalesOrder<T> | null;
  constructor(_entityApi: SalesOrderScheduleLineApi<T>);
}
export interface SalesOrderScheduleLineType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesOrder: DeserializedType<T, 'Edm.String'>;
  salesOrderItem: DeserializedType<T, 'Edm.String'>;
  scheduleLine: DeserializedType<T, 'Edm.String'>;
  scheduleLineCategory: DeserializedType<T, 'Edm.String'>;
  scheduleLineOrderQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  orderQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  orderQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  requestedDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  confirmedDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  confdOrderQtyByMatlAvailCheck?: DeserializedType<T, 'Edm.Decimal'> | null;
  deliveredQtyInOrderQtyUnit: DeserializedType<T, 'Edm.Decimal'>;
  openConfdDelivQtyInOrdQtyUnit: DeserializedType<T, 'Edm.Decimal'>;
  correctedQtyInOrderQtyUnit: DeserializedType<T, 'Edm.Decimal'>;
  delivBlockReasonForSchedLine: DeserializedType<T, 'Edm.String'>;
  purchaseRequisition: DeserializedType<T, 'Edm.String'>;
  purchaseRequisitionItem?: DeserializedType<T, 'Edm.String'> | null;
  goodsMovementType: DeserializedType<T, 'Edm.String'>;
  item?: SalesOrderItemType<T> | null;
  salesOrder_1?: SalesOrderType<T> | null;
}
