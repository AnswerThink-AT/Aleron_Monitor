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
import { SupplierInvoiceTax } from './SupplierInvoiceTax';

/**
 * Request builder class for operations supported on the {@link SupplierInvoiceTax} entity.
 */
export class SupplierInvoiceTaxRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SupplierInvoiceTax<T>, T> {
  /**
   * Returns a request builder for querying all `SupplierInvoiceTax` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierInvoiceTax` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierInvoiceTax<T>, T> {
    return new GetAllRequestBuilder<SupplierInvoiceTax<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for retrieving one `SupplierInvoiceTax` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SupplierInvoiceTax.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SupplierInvoiceTax.fiscalYear}.
   * @param taxCode Key property. See {@link SupplierInvoiceTax.taxCode}.
   * @param supplierInvoiceTaxCounter Key property. See {@link SupplierInvoiceTax.supplierInvoiceTaxCounter}.
   * @returns A request builder for creating requests to retrieve one `SupplierInvoiceTax` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    taxCode: DeserializedType<T, 'Edm.String'>,
    supplierInvoiceTaxCounter: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SupplierInvoiceTax<T>, T> {
    return new GetByKeyRequestBuilder<SupplierInvoiceTax<T>, T>(
      this.entityApi,
      {
        SupplierInvoice: supplierInvoice,
        FiscalYear: fiscalYear,
        TaxCode: taxCode,
        SupplierInvoiceTaxCounter: supplierInvoiceTaxCounter
      }
    );
  }
}
