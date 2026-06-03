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
import { SupplierInvoiceOdn } from './SupplierInvoiceOdn';

/**
 * Request builder class for operations supported on the {@link SupplierInvoiceOdn} entity.
 */
export class SupplierInvoiceOdnRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SupplierInvoiceOdn<T>, T> {
  /**
   * Returns a request builder for querying all `SupplierInvoiceOdn` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierInvoiceOdn` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierInvoiceOdn<T>, T> {
    return new GetAllRequestBuilder<SupplierInvoiceOdn<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for retrieving one `SupplierInvoiceOdn` entity based on its keys.
   * @param afdfUniqueKeyUuid Key property. See {@link SupplierInvoiceOdn.afdfUniqueKeyUuid}.
   * @param supplierInvoice Key property. See {@link SupplierInvoiceOdn.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SupplierInvoiceOdn.fiscalYear}.
   * @returns A request builder for creating requests to retrieve one `SupplierInvoiceOdn` entity based on its keys.
   */
  getByKey(
    afdfUniqueKeyUuid: DeserializedType<T, 'Edm.Guid'>,
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SupplierInvoiceOdn<T>, T> {
    return new GetByKeyRequestBuilder<SupplierInvoiceOdn<T>, T>(
      this.entityApi,
      {
        AFDFUniqueKeyUUID: afdfUniqueKeyUuid,
        SupplierInvoice: supplierInvoice,
        FiscalYear: fiscalYear
      }
    );
  }
}
