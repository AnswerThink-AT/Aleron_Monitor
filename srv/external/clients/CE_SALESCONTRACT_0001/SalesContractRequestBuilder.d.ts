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
import { SalesContract } from './SalesContract';
/**
 * Request builder class for operations supported on the {@link SalesContract} entity.
 */
export declare class SalesContractRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SalesContract<T>, T> {
  /**
   * Returns a request builder for querying all `SalesContract` entities.
   * @returns A request builder for creating requests to retrieve all `SalesContract` entities.
   */
  getAll(): GetAllRequestBuilder<SalesContract<T>, T>;
  /**
   * Returns a request builder for creating a `SalesContract` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SalesContract`.
   */
  create(entity: SalesContract<T>): CreateRequestBuilder<SalesContract<T>, T>;
  /**
   * Returns a request builder for retrieving one `SalesContract` entity based on its keys.
   * @param salesContract Key property. See {@link SalesContract.salesContract}.
   * @returns A request builder for creating requests to retrieve one `SalesContract` entity based on its keys.
   */
  getByKey(
    salesContract: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SalesContract<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `SalesContract`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SalesContract`.
   */
  update(entity: SalesContract<T>): UpdateRequestBuilder<SalesContract<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SalesContract`.
   * @param salesContract Key property. See {@link SalesContract.salesContract}.
   * @returns A request builder for creating requests that delete an entity of type `SalesContract`.
   */
  delete(salesContract: string): DeleteRequestBuilder<SalesContract<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SalesContract`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SalesContract` by taking the entity as a parameter.
   */
  delete(entity: SalesContract<T>): DeleteRequestBuilder<SalesContract<T>, T>;
}
