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
import { SuplrInvcHeaderWhldgTax } from './SuplrInvcHeaderWhldgTax';

/**
 * Request builder class for operations supported on the {@link SuplrInvcHeaderWhldgTax} entity.
 */
export class SuplrInvcHeaderWhldgTaxRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SuplrInvcHeaderWhldgTax<T>, T> {
  /**
   * Returns a request builder for querying all `SuplrInvcHeaderWhldgTax` entities.
   * @returns A request builder for creating requests to retrieve all `SuplrInvcHeaderWhldgTax` entities.
   */
  getAll(): GetAllRequestBuilder<SuplrInvcHeaderWhldgTax<T>, T> {
    return new GetAllRequestBuilder<SuplrInvcHeaderWhldgTax<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for retrieving one `SuplrInvcHeaderWhldgTax` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SuplrInvcHeaderWhldgTax.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SuplrInvcHeaderWhldgTax.fiscalYear}.
   * @param withholdingTaxType Key property. See {@link SuplrInvcHeaderWhldgTax.withholdingTaxType}.
   * @returns A request builder for creating requests to retrieve one `SuplrInvcHeaderWhldgTax` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    withholdingTaxType: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SuplrInvcHeaderWhldgTax<T>, T> {
    return new GetByKeyRequestBuilder<SuplrInvcHeaderWhldgTax<T>, T>(
      this.entityApi,
      {
        SupplierInvoice: supplierInvoice,
        FiscalYear: fiscalYear,
        WithholdingTaxType: withholdingTaxType
      }
    );
  }
}
