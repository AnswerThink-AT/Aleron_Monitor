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
import { SuplrInvcItemPurOrdRef } from './SuplrInvcItemPurOrdRef';

/**
 * Request builder class for operations supported on the {@link SuplrInvcItemPurOrdRef} entity.
 */
export class SuplrInvcItemPurOrdRefRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SuplrInvcItemPurOrdRef<T>, T> {
  /**
   * Returns a request builder for querying all `SuplrInvcItemPurOrdRef` entities.
   * @returns A request builder for creating requests to retrieve all `SuplrInvcItemPurOrdRef` entities.
   */
  getAll(): GetAllRequestBuilder<SuplrInvcItemPurOrdRef<T>, T> {
    return new GetAllRequestBuilder<SuplrInvcItemPurOrdRef<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for retrieving one `SuplrInvcItemPurOrdRef` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SuplrInvcItemPurOrdRef.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SuplrInvcItemPurOrdRef.fiscalYear}.
   * @param supplierInvoiceItem Key property. See {@link SuplrInvcItemPurOrdRef.supplierInvoiceItem}.
   * @returns A request builder for creating requests to retrieve one `SuplrInvcItemPurOrdRef` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    supplierInvoiceItem: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SuplrInvcItemPurOrdRef<T>, T> {
    return new GetByKeyRequestBuilder<SuplrInvcItemPurOrdRef<T>, T>(
      this.entityApi,
      {
        SupplierInvoice: supplierInvoice,
        FiscalYear: fiscalYear,
        SupplierInvoiceItem: supplierInvoiceItem
      }
    );
  }
}
