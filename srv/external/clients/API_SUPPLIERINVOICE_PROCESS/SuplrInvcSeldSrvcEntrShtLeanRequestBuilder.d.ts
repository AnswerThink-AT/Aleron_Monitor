/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  RequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { SuplrInvcSeldSrvcEntrShtLean } from './SuplrInvcSeldSrvcEntrShtLean';
/**
 * Request builder class for operations supported on the {@link SuplrInvcSeldSrvcEntrShtLean} entity.
 */
export declare class SuplrInvcSeldSrvcEntrShtLeanRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SuplrInvcSeldSrvcEntrShtLean<T>, T> {
  /**
   * Returns a request builder for querying all `SuplrInvcSeldSrvcEntrShtLean` entities.
   * @returns A request builder for creating requests to retrieve all `SuplrInvcSeldSrvcEntrShtLean` entities.
   */
  getAll(): GetAllRequestBuilder<SuplrInvcSeldSrvcEntrShtLean<T>, T>;
  /**
   * Returns a request builder for retrieving one `SuplrInvcSeldSrvcEntrShtLean` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SuplrInvcSeldSrvcEntrShtLean.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SuplrInvcSeldSrvcEntrShtLean.fiscalYear}.
   * @param serviceEntrySheet Key property. See {@link SuplrInvcSeldSrvcEntrShtLean.serviceEntrySheet}.
   * @param serviceEntrySheetItem Key property. See {@link SuplrInvcSeldSrvcEntrShtLean.serviceEntrySheetItem}.
   * @returns A request builder for creating requests to retrieve one `SuplrInvcSeldSrvcEntrShtLean` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    serviceEntrySheet: DeserializedType<T, 'Edm.String'>,
    serviceEntrySheetItem: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SuplrInvcSeldSrvcEntrShtLean<T>, T>;
}
