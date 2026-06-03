/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcHeaderWhldgTaxApi } from './SuplrInvcHeaderWhldgTaxApi';
import { SuplrInvcItemAcctAssgmtApi } from './SuplrInvcItemAcctAssgmtApi';
import { SuplrInvcItemPurOrdRefApi } from './SuplrInvcItemPurOrdRefApi';
import { SuplrInvcSeldInbDeliveryNoteApi } from './SuplrInvcSeldInbDeliveryNoteApi';
import { SuplrInvcSeldPurgDocumentApi } from './SuplrInvcSeldPurgDocumentApi';
import { SuplrInvcSeldSrvcEntrShtLeanApi } from './SuplrInvcSeldSrvcEntrShtLeanApi';
import { SuplrInvoiceAdditionalDataApi } from './SuplrInvoiceAdditionalDataApi';
import { SupplierInvoiceApi } from './SupplierInvoiceApi';
import { SupplierInvoiceItemAssetApi } from './SupplierInvoiceItemAssetApi';
import { SupplierInvoiceItemGlAcctApi } from './SupplierInvoiceItemGlAcctApi';
import { SupplierInvoiceItemMaterialApi } from './SupplierInvoiceItemMaterialApi';
import { SupplierInvoiceOdnApi } from './SupplierInvoiceOdnApi';
import { SupplierInvoiceTaxApi } from './SupplierInvoiceTaxApi';
import {
  post,
  release,
  cancel,
  PostParameters,
  ReleaseParameters,
  CancelParameters
} from './operations';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
import {
  defaultDeSerializers,
  DeSerializers,
  DefaultDeSerializers,
  mergeDefaultDeSerializersWith,
  Time
} from '@sap-cloud-sdk/odata-v2';
import { batch, changeset } from './BatchRequest';

export function apiSupplierinvoiceProcess<
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
  DateTimeT = Moment,
  TimeT = Time
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
      DateTimeT,
      TimeT
    >
  > = defaultDeSerializers as any
): ApiSupplierinvoiceProcess<
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
    DateTimeT,
    TimeT
  >
> {
  return new ApiSupplierinvoiceProcess(
    mergeDefaultDeSerializersWith(deSerializers)
  );
}
class ApiSupplierinvoiceProcess<
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

  get suplrInvcHeaderWhldgTaxApi(): SuplrInvcHeaderWhldgTaxApi<DeSerializersT> {
    return this.initApi(
      'suplrInvcHeaderWhldgTaxApi',
      SuplrInvcHeaderWhldgTaxApi
    );
  }

  get suplrInvcItemAcctAssgmtApi(): SuplrInvcItemAcctAssgmtApi<DeSerializersT> {
    return this.initApi(
      'suplrInvcItemAcctAssgmtApi',
      SuplrInvcItemAcctAssgmtApi
    );
  }

  get suplrInvcItemPurOrdRefApi(): SuplrInvcItemPurOrdRefApi<DeSerializersT> {
    const api = this.initApi(
      'suplrInvcItemPurOrdRefApi',
      SuplrInvcItemPurOrdRefApi
    );
    const linkedApis = [
      this.initApi('suplrInvcItemAcctAssgmtApi', SuplrInvcItemAcctAssgmtApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get suplrInvcSeldInbDeliveryNoteApi(): SuplrInvcSeldInbDeliveryNoteApi<DeSerializersT> {
    return this.initApi(
      'suplrInvcSeldInbDeliveryNoteApi',
      SuplrInvcSeldInbDeliveryNoteApi
    );
  }

  get suplrInvcSeldPurgDocumentApi(): SuplrInvcSeldPurgDocumentApi<DeSerializersT> {
    return this.initApi(
      'suplrInvcSeldPurgDocumentApi',
      SuplrInvcSeldPurgDocumentApi
    );
  }

  get suplrInvcSeldSrvcEntrShtLeanApi(): SuplrInvcSeldSrvcEntrShtLeanApi<DeSerializersT> {
    return this.initApi(
      'suplrInvcSeldSrvcEntrShtLeanApi',
      SuplrInvcSeldSrvcEntrShtLeanApi
    );
  }

  get suplrInvoiceAdditionalDataApi(): SuplrInvoiceAdditionalDataApi<DeSerializersT> {
    return this.initApi(
      'suplrInvoiceAdditionalDataApi',
      SuplrInvoiceAdditionalDataApi
    );
  }

  get supplierInvoiceApi(): SupplierInvoiceApi<DeSerializersT> {
    const api = this.initApi('supplierInvoiceApi', SupplierInvoiceApi);
    const linkedApis = [
      this.initApi(
        'suplrInvcSeldInbDeliveryNoteApi',
        SuplrInvcSeldInbDeliveryNoteApi
      ),
      this.initApi(
        'suplrInvcSeldPurgDocumentApi',
        SuplrInvcSeldPurgDocumentApi
      ),
      this.initApi(
        'suplrInvcSeldSrvcEntrShtLeanApi',
        SuplrInvcSeldSrvcEntrShtLeanApi
      ),
      this.initApi('supplierInvoiceItemAssetApi', SupplierInvoiceItemAssetApi),
      this.initApi(
        'supplierInvoiceItemMaterialApi',
        SupplierInvoiceItemMaterialApi
      ),
      this.initApi('suplrInvcItemPurOrdRefApi', SuplrInvcItemPurOrdRefApi),
      this.initApi(
        'suplrInvoiceAdditionalDataApi',
        SuplrInvoiceAdditionalDataApi
      ),
      this.initApi(
        'supplierInvoiceItemGlAcctApi',
        SupplierInvoiceItemGlAcctApi
      ),
      this.initApi('supplierInvoiceOdnApi', SupplierInvoiceOdnApi),
      this.initApi('supplierInvoiceTaxApi', SupplierInvoiceTaxApi),
      this.initApi('suplrInvcHeaderWhldgTaxApi', SuplrInvcHeaderWhldgTaxApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get supplierInvoiceItemAssetApi(): SupplierInvoiceItemAssetApi<DeSerializersT> {
    return this.initApi(
      'supplierInvoiceItemAssetApi',
      SupplierInvoiceItemAssetApi
    );
  }

  get supplierInvoiceItemGlAcctApi(): SupplierInvoiceItemGlAcctApi<DeSerializersT> {
    return this.initApi(
      'supplierInvoiceItemGlAcctApi',
      SupplierInvoiceItemGlAcctApi
    );
  }

  get supplierInvoiceItemMaterialApi(): SupplierInvoiceItemMaterialApi<DeSerializersT> {
    return this.initApi(
      'supplierInvoiceItemMaterialApi',
      SupplierInvoiceItemMaterialApi
    );
  }

  get supplierInvoiceOdnApi(): SupplierInvoiceOdnApi<DeSerializersT> {
    return this.initApi('supplierInvoiceOdnApi', SupplierInvoiceOdnApi);
  }

  get supplierInvoiceTaxApi(): SupplierInvoiceTaxApi<DeSerializersT> {
    return this.initApi('supplierInvoiceTaxApi', SupplierInvoiceTaxApi);
  }

  get operations() {
    return {
      post: (parameter: PostParameters<DeSerializersT>) =>
        post(parameter, this.deSerializers),
      release: (parameter: ReleaseParameters<DeSerializersT>) =>
        release(parameter, this.deSerializers),
      cancel: (parameter: CancelParameters<DeSerializersT>) =>
        cancel(parameter, this.deSerializers)
    };
  }

  get batch(): typeof batch {
    return batch;
  }

  get changeset(): typeof changeset {
    return changeset;
  }
}
