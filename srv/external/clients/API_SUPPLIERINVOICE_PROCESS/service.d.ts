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
  PostParameters,
  ReleaseParameters,
  CancelParameters
} from './operations';
import { Moment } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v2';
import { batch, changeset } from './BatchRequest';
export declare function apiSupplierinvoiceProcess<
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
      DateTimeT,
      TimeT
    >
  >
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
>;
declare class ApiSupplierinvoiceProcess<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get suplrInvcHeaderWhldgTaxApi(): SuplrInvcHeaderWhldgTaxApi<DeSerializersT>;
  get suplrInvcItemAcctAssgmtApi(): SuplrInvcItemAcctAssgmtApi<DeSerializersT>;
  get suplrInvcItemPurOrdRefApi(): SuplrInvcItemPurOrdRefApi<DeSerializersT>;
  get suplrInvcSeldInbDeliveryNoteApi(): SuplrInvcSeldInbDeliveryNoteApi<DeSerializersT>;
  get suplrInvcSeldPurgDocumentApi(): SuplrInvcSeldPurgDocumentApi<DeSerializersT>;
  get suplrInvcSeldSrvcEntrShtLeanApi(): SuplrInvcSeldSrvcEntrShtLeanApi<DeSerializersT>;
  get suplrInvoiceAdditionalDataApi(): SuplrInvoiceAdditionalDataApi<DeSerializersT>;
  get supplierInvoiceApi(): SupplierInvoiceApi<DeSerializersT>;
  get supplierInvoiceItemAssetApi(): SupplierInvoiceItemAssetApi<DeSerializersT>;
  get supplierInvoiceItemGlAcctApi(): SupplierInvoiceItemGlAcctApi<DeSerializersT>;
  get supplierInvoiceItemMaterialApi(): SupplierInvoiceItemMaterialApi<DeSerializersT>;
  get supplierInvoiceOdnApi(): SupplierInvoiceOdnApi<DeSerializersT>;
  get supplierInvoiceTaxApi(): SupplierInvoiceTaxApi<DeSerializersT>;
  get operations(): {
    post: (
      parameter: PostParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').OperationRequestBuilder<
      DeSerializersT,
      PostParameters<DeSerializersT>,
      import('./PostInvoiceExportParameters').PostInvoiceExportParameters<DefaultDeSerializers>
    >;
    release: (
      parameter: ReleaseParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').OperationRequestBuilder<
      DeSerializersT,
      ReleaseParameters<DeSerializersT>,
      import('./ReleaseInvoiceExportParameters').ReleaseInvoiceExportParameters<DefaultDeSerializers>
    >;
    cancel: (
      parameter: CancelParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').OperationRequestBuilder<
      DeSerializersT,
      CancelParameters<DeSerializersT>,
      import('./CancelInvoiceExportParameters').CancelInvoiceExportParameters<DefaultDeSerializers>
    >;
  };
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
