/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SalesContractApi } from './SalesContractApi';
import { SalesContractItemApi } from './SalesContractItemApi';
import { SalesContractItemTextApi } from './SalesContractItemTextApi';
import { SalesContractTextApi } from './SalesContractTextApi';
import { SlsContrItemPricingElementApi } from './SlsContrItemPricingElementApi';
import { SlsContrPricingElementApi } from './SlsContrPricingElementApi';
import { Moment, Duration } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';
export declare function ceSalescontract0001<
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
): CeSalescontract0001<
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
declare class CeSalescontract0001<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get salesContractApi(): SalesContractApi<DeSerializersT>;
  get salesContractItemApi(): SalesContractItemApi<DeSerializersT>;
  get salesContractItemTextApi(): SalesContractItemTextApi<DeSerializersT>;
  get salesContractTextApi(): SalesContractTextApi<DeSerializersT>;
  get slsContrItemPricingElementApi(): SlsContrItemPricingElementApi<DeSerializersT>;
  get slsContrPricingElementApi(): SlsContrPricingElementApi<DeSerializersT>;
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
