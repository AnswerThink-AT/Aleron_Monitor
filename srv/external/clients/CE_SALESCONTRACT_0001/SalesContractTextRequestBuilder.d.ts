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
import { SalesContractText } from './SalesContractText';
/**
 * Request builder class for operations supported on the {@link SalesContractText} entity.
 */
export declare class SalesContractTextRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SalesContractText<T>, T> {
  /**
   * Returns a request builder for querying all `SalesContractText` entities.
   * @returns A request builder for creating requests to retrieve all `SalesContractText` entities.
   */
  getAll(): GetAllRequestBuilder<SalesContractText<T>, T>;
  /**
   * Returns a request builder for creating a `SalesContractText` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SalesContractText`.
   */
  create(
    entity: SalesContractText<T>
  ): CreateRequestBuilder<SalesContractText<T>, T>;
  /**
   * Returns a request builder for retrieving one `SalesContractText` entity based on its keys.
   * @param salesContract Key property. See {@link SalesContractText.salesContract}.
   * @param language Key property. See {@link SalesContractText.language}.
   * @param longTextId Key property. See {@link SalesContractText.longTextId}.
   * @returns A request builder for creating requests to retrieve one `SalesContractText` entity based on its keys.
   */
  getByKey(
    salesContract: DeserializedType<T, 'Edm.String'>,
    language: DeserializedType<T, 'Edm.String'>,
    longTextId: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SalesContractText<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `SalesContractText`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SalesContractText`.
   */
  update(
    entity: SalesContractText<T>
  ): UpdateRequestBuilder<SalesContractText<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SalesContractText`.
   * @param salesContract Key property. See {@link SalesContractText.salesContract}.
   * @param language Key property. See {@link SalesContractText.language}.
   * @param longTextId Key property. See {@link SalesContractText.longTextId}.
   * @returns A request builder for creating requests that delete an entity of type `SalesContractText`.
   */
  delete(
    salesContract: string,
    language: string,
    longTextId: string
  ): DeleteRequestBuilder<SalesContractText<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SalesContractText`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SalesContractText` by taking the entity as a parameter.
   */
  delete(
    entity: SalesContractText<T>
  ): DeleteRequestBuilder<SalesContractText<T>, T>;
}
