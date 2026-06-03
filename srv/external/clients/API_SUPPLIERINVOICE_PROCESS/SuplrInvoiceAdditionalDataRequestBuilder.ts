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
import { SuplrInvoiceAdditionalData } from './SuplrInvoiceAdditionalData';

/**
 * Request builder class for operations supported on the {@link SuplrInvoiceAdditionalData} entity.
 */
export class SuplrInvoiceAdditionalDataRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SuplrInvoiceAdditionalData<T>, T> {
  /**
   * Returns a request builder for querying all `SuplrInvoiceAdditionalData` entities.
   * @returns A request builder for creating requests to retrieve all `SuplrInvoiceAdditionalData` entities.
   */
  getAll(): GetAllRequestBuilder<SuplrInvoiceAdditionalData<T>, T> {
    return new GetAllRequestBuilder<SuplrInvoiceAdditionalData<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for retrieving one `SuplrInvoiceAdditionalData` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SuplrInvoiceAdditionalData.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SuplrInvoiceAdditionalData.fiscalYear}.
   * @returns A request builder for creating requests to retrieve one `SuplrInvoiceAdditionalData` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SuplrInvoiceAdditionalData<T>, T> {
    return new GetByKeyRequestBuilder<SuplrInvoiceAdditionalData<T>, T>(
      this.entityApi,
      {
        SupplierInvoice: supplierInvoice,
        FiscalYear: fiscalYear
      }
    );
  }
}
