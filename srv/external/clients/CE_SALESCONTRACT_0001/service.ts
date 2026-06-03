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
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import {
  defaultDeSerializers,
  DeSerializers,
  DefaultDeSerializers,
  mergeDefaultDeSerializersWith,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';

export function ceSalescontract0001<
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
  deSerializers: Partial<
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
  > = defaultDeSerializers as any
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
> {
  return new CeSalescontract0001(mergeDefaultDeSerializersWith(deSerializers));
}
class CeSalescontract0001<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis: Record<string, any> = {};
  private deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT) {
    this.deSerializers = deSerializers;
  }

  private initApi(key: string, entityApi: any): any {
    if (!this.apis[key]) {
      this.apis[key] = entityApi._privateFactory(this.deSerializers);
    }
    return this.apis[key];
  }

  get salesContractApi(): SalesContractApi<DeSerializersT> {
    const api = this.initApi('salesContractApi', SalesContractApi);
    const linkedApis = [
      this.initApi('salesContractItemApi', SalesContractItemApi),
      this.initApi('slsContrPricingElementApi', SlsContrPricingElementApi),
      this.initApi('salesContractTextApi', SalesContractTextApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get salesContractItemApi(): SalesContractItemApi<DeSerializersT> {
    const api = this.initApi('salesContractItemApi', SalesContractItemApi);
    const linkedApis = [
      this.initApi(
        'slsContrItemPricingElementApi',
        SlsContrItemPricingElementApi
      ),
      this.initApi('salesContractItemTextApi', SalesContractItemTextApi),
      this.initApi('salesContractApi', SalesContractApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get salesContractItemTextApi(): SalesContractItemTextApi<DeSerializersT> {
    const api = this.initApi(
      'salesContractItemTextApi',
      SalesContractItemTextApi
    );
    const linkedApis = [
      this.initApi('salesContractItemApi', SalesContractItemApi),
      this.initApi('salesContractApi', SalesContractApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get salesContractTextApi(): SalesContractTextApi<DeSerializersT> {
    const api = this.initApi('salesContractTextApi', SalesContractTextApi);
    const linkedApis = [this.initApi('salesContractApi', SalesContractApi)];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get slsContrItemPricingElementApi(): SlsContrItemPricingElementApi<DeSerializersT> {
    const api = this.initApi(
      'slsContrItemPricingElementApi',
      SlsContrItemPricingElementApi
    );
    const linkedApis = [
      this.initApi('salesContractItemApi', SalesContractItemApi),
      this.initApi('salesContractApi', SalesContractApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get slsContrPricingElementApi(): SlsContrPricingElementApi<DeSerializersT> {
    const api = this.initApi(
      'slsContrPricingElementApi',
      SlsContrPricingElementApi
    );
    const linkedApis = [this.initApi('salesContractApi', SalesContractApi)];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get batch(): typeof batch {
    return batch;
  }

  get changeset(): typeof changeset {
    return changeset;
  }
}
