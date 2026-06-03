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
import { SalesContractItem } from './SalesContractItem';
/**
 * Request builder class for operations supported on the {@link SalesContractItem} entity.
 */
export declare class SalesContractItemRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SalesContractItem<T>, T> {
  /**
   * Returns a request builder for querying all `SalesContractItem` entities.
   * @returns A request builder for creating requests to retrieve all `SalesContractItem` entities.
   */
  getAll(): GetAllRequestBuilder<SalesContractItem<T>, T>;
  /**
   * Returns a request builder for creating a `SalesContractItem` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SalesContractItem`.
   */
  create(
    entity: SalesContractItem<T>
  ): CreateRequestBuilder<SalesContractItem<T>, T>;
  /**
   * Returns a request builder for retrieving one `SalesContractItem` entity based on its keys.
   * @param salesContract Key property. See {@link SalesContractItem.salesContract}.
   * @param salesContractItem Key property. See {@link SalesContractItem.salesContractItem}.
   * @returns A request builder for creating requests to retrieve one `SalesContractItem` entity based on its keys.
   */
  getByKey(
    salesContract: DeserializedType<T, 'Edm.String'>,
    salesContractItem: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SalesContractItem<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `SalesContractItem`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SalesContractItem`.
   */
  update(
    entity: SalesContractItem<T>
  ): UpdateRequestBuilder<SalesContractItem<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SalesContractItem`.
   * @param salesContract Key property. See {@link SalesContractItem.salesContract}.
   * @param salesContractItem Key property. See {@link SalesContractItem.salesContractItem}.
   * @returns A request builder for creating requests that delete an entity of type `SalesContractItem`.
   */
  delete(
    salesContract: string,
    salesContractItem: string
  ): DeleteRequestBuilder<SalesContractItem<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SalesContractItem`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SalesContractItem` by taking the entity as a parameter.
   */
  delete(
    entity: SalesContractItem<T>
  ): DeleteRequestBuilder<SalesContractItem<T>, T>;
}
