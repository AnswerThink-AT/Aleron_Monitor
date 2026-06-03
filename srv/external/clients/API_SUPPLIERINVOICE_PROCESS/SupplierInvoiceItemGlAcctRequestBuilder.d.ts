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
import { SupplierInvoiceItemGlAcct } from './SupplierInvoiceItemGlAcct';
/**
 * Request builder class for operations supported on the {@link SupplierInvoiceItemGlAcct} entity.
 */
export declare class SupplierInvoiceItemGlAcctRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SupplierInvoiceItemGlAcct<T>, T> {
  /**
   * Returns a request builder for querying all `SupplierInvoiceItemGlAcct` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierInvoiceItemGlAcct` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierInvoiceItemGlAcct<T>, T>;
  /**
   * Returns a request builder for retrieving one `SupplierInvoiceItemGlAcct` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SupplierInvoiceItemGlAcct.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SupplierInvoiceItemGlAcct.fiscalYear}.
   * @param supplierInvoiceItem Key property. See {@link SupplierInvoiceItemGlAcct.supplierInvoiceItem}.
   * @returns A request builder for creating requests to retrieve one `SupplierInvoiceItemGlAcct` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    supplierInvoiceItem: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SupplierInvoiceItemGlAcct<T>, T>;
}
