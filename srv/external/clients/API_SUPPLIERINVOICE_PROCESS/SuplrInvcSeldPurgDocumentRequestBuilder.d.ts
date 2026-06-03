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
import { SuplrInvcSeldPurgDocument } from './SuplrInvcSeldPurgDocument';
/**
 * Request builder class for operations supported on the {@link SuplrInvcSeldPurgDocument} entity.
 */
export declare class SuplrInvcSeldPurgDocumentRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SuplrInvcSeldPurgDocument<T>, T> {
  /**
   * Returns a request builder for querying all `SuplrInvcSeldPurgDocument` entities.
   * @returns A request builder for creating requests to retrieve all `SuplrInvcSeldPurgDocument` entities.
   */
  getAll(): GetAllRequestBuilder<SuplrInvcSeldPurgDocument<T>, T>;
  /**
   * Returns a request builder for retrieving one `SuplrInvcSeldPurgDocument` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SuplrInvcSeldPurgDocument.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SuplrInvcSeldPurgDocument.fiscalYear}.
   * @param purchaseOrder Key property. See {@link SuplrInvcSeldPurgDocument.purchaseOrder}.
   * @param purchaseOrderItem Key property. See {@link SuplrInvcSeldPurgDocument.purchaseOrderItem}.
   * @returns A request builder for creating requests to retrieve one `SuplrInvcSeldPurgDocument` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>,
    purchaseOrder: DeserializedType<T, 'Edm.String'>,
    purchaseOrderItem: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SuplrInvcSeldPurgDocument<T>, T>;
}
