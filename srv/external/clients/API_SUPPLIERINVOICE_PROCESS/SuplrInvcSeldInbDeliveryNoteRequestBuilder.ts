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
import { SuplrInvcSeldInbDeliveryNote } from './SuplrInvcSeldInbDeliveryNote';

/**
 * Request builder class for operations supported on the {@link SuplrInvcSeldInbDeliveryNote} entity.
 */
export class SuplrInvcSeldInbDeliveryNoteRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SuplrInvcSeldInbDeliveryNote<T>, T> {
  /**
   * Returns a request builder for querying all `SuplrInvcSeldInbDeliveryNote` entities.
   * @returns A request builder for creating requests to retrieve all `SuplrInvcSeldInbDeliveryNote` entities.
   */
  getAll(): GetAllRequestBuilder<SuplrInvcSeldInbDeliveryNote<T>, T> {
    return new GetAllRequestBuilder<SuplrInvcSeldInbDeliveryNote<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for retrieving one `SuplrInvcSeldInbDeliveryNote` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SuplrInvcSeldInbDeliveryNote.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SuplrInvcSeldInbDeliveryNote.fiscalYear}.
   * @param inboundDeliveryNote Key property. See {@link SuplrInvcSeldInbDeliveryNote.inboundDeliveryNote}.
   * @returns A request builder for creating requests to retrieve one `SuplrInvcSeldInbDeliveryNote` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    inboundDeliveryNote: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SuplrInvcSeldInbDeliveryNote<T>, T> {
    return new GetByKeyRequestBuilder<SuplrInvcSeldInbDeliveryNote<T>, T>(
      this.entityApi,
      {
        SupplierInvoice: supplierInvoice,
        FiscalYear: fiscalYear,
        InboundDeliveryNote: inboundDeliveryNote
      }
    );
  }
}
