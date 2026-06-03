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
  RequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { SalesContractItemText } from './SalesContractItemText';
/**
 * Request builder class for operations supported on the {@link SalesContractItemText} entity.
 */
export declare class SalesContractItemTextRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SalesContractItemText<T>, T> {
  /**
   * Returns a request builder for querying all `SalesContractItemText` entities.
   * @returns A request builder for creating requests to retrieve all `SalesContractItemText` entities.
   */
  getAll(): GetAllRequestBuilder<SalesContractItemText<T>, T>;
  /**
   * Returns a request builder for creating a `SalesContractItemText` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SalesContractItemText`.
   */
  create(
    entity: SalesContractItemText<T>
  ): CreateRequestBuilder<SalesContractItemText<T>, T>;
  /**
   * Returns a request builder for retrieving one `SalesContractItemText` entity based on its keys.
   * @param salesContract Key property. See {@link SalesContractItemText.salesContract}.
   * @param salesContractItem Key property. See {@link SalesContractItemText.salesContractItem}.
   * @param language Key property. See {@link SalesContractItemText.language}.
   * @param longTextId Key property. See {@link SalesContractItemText.longTextId}.
   * @returns A request builder for creating requests to retrieve one `SalesContractItemText` entity based on its keys.
   */
  getByKey(
    salesContract: DeserializedType<T, 'Edm.String'>,
    salesContractItem: DeserializedType<T, 'Edm.String'>,
    language: DeserializedType<T, 'Edm.String'>,
    longTextId: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SalesContractItemText<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `SalesContractItemText`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SalesContractItemText`.
   */
  update(
    entity: SalesContractItemText<T>
  ): UpdateRequestBuilder<SalesContractItemText<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SalesContractItemText`.
   * @param salesContract Key property. See {@link SalesContractItemText.salesContract}.
   * @param salesContractItem Key property. See {@link SalesContractItemText.salesContractItem}.
   * @param language Key property. See {@link SalesContractItemText.language}.
   * @param longTextId Key property. See {@link SalesContractItemText.longTextId}.
   * @returns A request builder for creating requests that delete an entity of type `SalesContractItemText`.
   */
  delete(
    salesContract: string,
    salesContractItem: string,
    language: string,
    longTextId: string
  ): DeleteRequestBuilder<SalesContractItemText<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SalesContractItemText`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SalesContractItemText` by taking the entity as a parameter.
   */
  delete(
    entity: SalesContractItemText<T>
  ): DeleteRequestBuilder<SalesContractItemText<T>, T>;
}
