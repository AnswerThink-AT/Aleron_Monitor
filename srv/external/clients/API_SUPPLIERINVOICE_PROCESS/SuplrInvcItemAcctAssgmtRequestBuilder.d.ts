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
import { SuplrInvcItemAcctAssgmt } from './SuplrInvcItemAcctAssgmt';
/**
 * Request builder class for operations supported on the {@link SuplrInvcItemAcctAssgmt} entity.
 */
export declare class SuplrInvcItemAcctAssgmtRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SuplrInvcItemAcctAssgmt<T>, T> {
  /**
   * Returns a request builder for querying all `SuplrInvcItemAcctAssgmt` entities.
   * @returns A request builder for creating requests to retrieve all `SuplrInvcItemAcctAssgmt` entities.
   */
  getAll(): GetAllRequestBuilder<SuplrInvcItemAcctAssgmt<T>, T>;
  /**
   * Returns a request builder for retrieving one `SuplrInvcItemAcctAssgmt` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SuplrInvcItemAcctAssgmt.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SuplrInvcItemAcctAssgmt.fiscalYear}.
   * @param supplierInvoiceItem Key property. See {@link SuplrInvcItemAcctAssgmt.supplierInvoiceItem}.
   * @param ordinalNumber Key property. See {@link SuplrInvcItemAcctAssgmt.ordinalNumber}.
   * @returns A request builder for creating requests to retrieve one `SuplrInvcItemAcctAssgmt` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    supplierInvoiceItem: DeserializedType<T, 'Edm.String'>,
    ordinalNumber: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SuplrInvcItemAcctAssgmt<T>, T>;
}
