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
import { SupplierInvoiceItemAsset } from './SupplierInvoiceItemAsset';

/**
 * Request builder class for operations supported on the {@link SupplierInvoiceItemAsset} entity.
 */
export class SupplierInvoiceItemAssetRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SupplierInvoiceItemAsset<T>, T> {
  /**
   * Returns a request builder for querying all `SupplierInvoiceItemAsset` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierInvoiceItemAsset` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierInvoiceItemAsset<T>, T> {
    return new GetAllRequestBuilder<SupplierInvoiceItemAsset<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for retrieving one `SupplierInvoiceItemAsset` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SupplierInvoiceItemAsset.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SupplierInvoiceItemAsset.fiscalYear}.
   * @param supplierInvoiceItem Key property. See {@link SupplierInvoiceItemAsset.supplierInvoiceItem}.
   * @returns A request builder for creating requests to retrieve one `SupplierInvoiceItemAsset` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    supplierInvoiceItem: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SupplierInvoiceItemAsset<T>, T> {
    return new GetByKeyRequestBuilder<SupplierInvoiceItemAsset<T>, T>(
      this.entityApi,
      {
        SupplierInvoice: supplierInvoice,
        FiscalYear: fiscalYear,
        SupplierInvoiceItem: supplierInvoiceItem
      }
    );
  }
}
