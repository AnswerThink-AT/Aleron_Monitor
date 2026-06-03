/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SalesOrderApi } from './SalesOrderApi';
import { SalesOrderItemApi } from './SalesOrderItemApi';
import { SalesOrderItemPartnerApi } from './SalesOrderItemPartnerApi';
import { SalesOrderItemPricingElementApi } from './SalesOrderItemPricingElementApi';
import { SalesOrderItemTextApi } from './SalesOrderItemTextApi';
import { SalesOrderPartnerApi } from './SalesOrderPartnerApi';
import { SalesOrderPricingElementApi } from './SalesOrderPricingElementApi';
import { SalesOrderScheduleLineApi } from './SalesOrderScheduleLineApi';
import { SalesOrderTextApi } from './SalesOrderTextApi';
import { VarConfignAssignedValueApi } from './VarConfignAssignedValueApi';
import { VarConfignCharacteristicApi } from './VarConfignCharacteristicApi';
import { VariantConfigurationApi } from './VariantConfigurationApi';
import { VariantConfigurationInstanceApi } from './VariantConfigurationInstanceApi';
import { Moment, Duration } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';
export declare function ceSalesorder0001<
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
): CeSalesorder0001<
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
declare class CeSalesorder0001<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get salesOrderApi(): SalesOrderApi<DeSerializersT>;
  get salesOrderItemApi(): SalesOrderItemApi<DeSerializersT>;
  get salesOrderItemPartnerApi(): SalesOrderItemPartnerApi<DeSerializersT>;
  get salesOrderItemPricingElementApi(): SalesOrderItemPricingElementApi<DeSerializersT>;
  get salesOrderItemTextApi(): SalesOrderItemTextApi<DeSerializersT>;
  get salesOrderPartnerApi(): SalesOrderPartnerApi<DeSerializersT>;
  get salesOrderPricingElementApi(): SalesOrderPricingElementApi<DeSerializersT>;
  get salesOrderScheduleLineApi(): SalesOrderScheduleLineApi<DeSerializersT>;
  get salesOrderTextApi(): SalesOrderTextApi<DeSerializersT>;
  get varConfignAssignedValueApi(): VarConfignAssignedValueApi<DeSerializersT>;
  get varConfignCharacteristicApi(): VarConfignCharacteristicApi<DeSerializersT>;
  get variantConfigurationApi(): VariantConfigurationApi<DeSerializersT>;
  get variantConfigurationInstanceApi(): VariantConfigurationInstanceApi<DeSerializersT>;
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
