/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeSerializers,
  DefaultDeSerializers,
  DeleteRequestBuilder,
  DeserializedType,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  RequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { SupplierInvoice } from './SupplierInvoice';
/**
 * Request builder class for operations supported on the {@link SupplierInvoice} entity.
 */
export declare class SupplierInvoiceRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SupplierInvoice<T>, T> {
  /**
   * Returns a request builder for querying all `SupplierInvoice` entities.
   * @returns A request builder for creating requests to retrieve all `SupplierInvoice` entities.
   */
  getAll(): GetAllRequestBuilder<SupplierInvoice<T>, T>;
  /**
   * Returns a request builder for creating a `SupplierInvoice` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SupplierInvoice`.
   */
  create(
    entity: SupplierInvoice<T>
  ): CreateRequestBuilder<SupplierInvoice<T>, T>;
  /**
   * Returns a request builder for retrieving one `SupplierInvoice` entity based on its keys.
   * @param supplierInvoice Key property. See {@link SupplierInvoice.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SupplierInvoice.fiscalYear}.
   * @returns A request builder for creating requests to retrieve one `SupplierInvoice` entity based on its keys.
   */
  getByKey(
    supplierInvoice: DeserializedType<T, 'Edm.String'>,
    fiscalYear: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SupplierInvoice<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SupplierInvoice`.
   * @param supplierInvoice Key property. See {@link SupplierInvoice.supplierInvoice}.
   * @param fiscalYear Key property. See {@link SupplierInvoice.fiscalYear}.
   * @returns A request builder for creating requests that delete an entity of type `SupplierInvoice`.
   */
  delete(
    supplierInvoice: string,
    fiscalYear: string
  ): DeleteRequestBuilder<SupplierInvoice<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SupplierInvoice`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SupplierInvoice` by taking the entity as a parameter.
   */
  delete(
    entity: SupplierInvoice<T>
  ): DeleteRequestBuilder<SupplierInvoice<T>, T>;
}
