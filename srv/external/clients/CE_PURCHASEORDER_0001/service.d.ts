/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PoSubcontractingComponentApi } from './PoSubcontractingComponentApi';
import { PurchaseOrderApi } from './PurchaseOrderApi';
import { PurchaseOrderAccountAssignmentApi } from './PurchaseOrderAccountAssignmentApi';
import { PurchaseOrderInvoicingPlanApi } from './PurchaseOrderInvoicingPlanApi';
import { PurchaseOrderInvoicingPlanItemApi } from './PurchaseOrderInvoicingPlanItemApi';
import { PurchaseOrderItemApi } from './PurchaseOrderItemApi';
import { PurchaseOrderItemNoteApi } from './PurchaseOrderItemNoteApi';
import { PurchaseOrderNoteApi } from './PurchaseOrderNoteApi';
import { PurchaseOrderPartnerApi } from './PurchaseOrderPartnerApi';
import { PurchaseOrderScheduleLineApi } from './PurchaseOrderScheduleLineApi';
import { PurchaseOrderSupplierAddressApi } from './PurchaseOrderSupplierAddressApi';
import { PurOrderItemDeliveryAddressApi } from './PurOrderItemDeliveryAddressApi';
import { PurOrderItemPricingElementApi } from './PurOrderItemPricingElementApi';
import { Moment, Duration } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';
export declare function cePurchaseorder0001<
  BinaryT = string,
  BooleanT = boolean,
  ByteT = number,
  DecimalT = BigNumber,
  DoubleT = number,
  FloatT = number,
  Int16T = number,
  Int32T = number,
  Int64T = BigNumber,
  GuidT = string,
  SByteT = number,
  SingleT = number,
  StringT = string,
  AnyT = any,
  DateTimeOffsetT = Moment,
  DateT = Moment,
  DurationT = Duration,
  TimeOfDayT = Time,
  EnumT = any
>(
  deSerializers?: Partial<
    DeSerializers<
      BinaryT,
      BooleanT,
      ByteT,
      DecimalT,
      DoubleT,
      FloatT,
      Int16T,
      Int32T,
      Int64T,
      GuidT,
      SByteT,
      SingleT,
      StringT,
      AnyT,
      DateTimeOffsetT,
      DateT,
      DurationT,
      TimeOfDayT,
      EnumT
    >
  >
): CePurchaseorder0001<
  DeSerializers<
    BinaryT,
    BooleanT,
    ByteT,
    DecimalT,
    DoubleT,
    FloatT,
    Int16T,
    Int32T,
    Int64T,
    GuidT,
    SByteT,
    SingleT,
    StringT,
    AnyT,
    DateTimeOffsetT,
    DateT,
    DurationT,
    TimeOfDayT,
    EnumT
  >
>;
declare class CePurchaseorder0001<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get poSubcontractingComponentApi(): PoSubcontractingComponentApi<DeSerializersT>;
  get purchaseOrderApi(): PurchaseOrderApi<DeSerializersT>;
  get purchaseOrderAccountAssignmentApi(): PurchaseOrderAccountAssignmentApi<DeSerializersT>;
  get purchaseOrderInvoicingPlanApi(): PurchaseOrderInvoicingPlanApi<DeSerializersT>;
  get purchaseOrderInvoicingPlanItemApi(): PurchaseOrderInvoicingPlanItemApi<DeSerializersT>;
  get purchaseOrderItemApi(): PurchaseOrderItemApi<DeSerializersT>;
  get purchaseOrderItemNoteApi(): PurchaseOrderItemNoteApi<DeSerializersT>;
  get purchaseOrderNoteApi(): PurchaseOrderNoteApi<DeSerializersT>;
  get purchaseOrderPartnerApi(): PurchaseOrderPartnerApi<DeSerializersT>;
  get purchaseOrderScheduleLineApi(): PurchaseOrderScheduleLineApi<DeSerializersT>;
  get purchaseOrderSupplierAddressApi(): PurchaseOrderSupplierAddressApi<DeSerializersT>;
  get purOrderItemDeliveryAddressApi(): PurOrderItemDeliveryAddressApi<DeSerializersT>;
  get purOrderItemPricingElementApi(): PurOrderItemPricingElementApi<DeSerializersT>;
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
