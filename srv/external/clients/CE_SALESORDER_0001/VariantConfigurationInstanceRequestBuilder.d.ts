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
import { VariantConfigurationInstance } from './VariantConfigurationInstance';
/**
 * Request builder class for operations supported on the {@link VariantConfigurationInstance} entity.
 */
export declare class VariantConfigurationInstanceRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<VariantConfigurationInstance<T>, T> {
  /**
   * Returns a request builder for querying all `VariantConfigurationInstance` entities.
   * @returns A request builder for creating requests to retrieve all `VariantConfigurationInstance` entities.
   */
  getAll(): GetAllRequestBuilder<VariantConfigurationInstance<T>, T>;
  /**
   * Returns a request builder for creating a `VariantConfigurationInstance` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `VariantConfigurationInstance`.
   */
  create(
    entity: VariantConfigurationInstance<T>
  ): CreateRequestBuilder<VariantConfigurationInstance<T>, T>;
  /**
   * Returns a request builder for retrieving one `VariantConfigurationInstance` entity based on its keys.
   * @param varConfigurationBusObjectKey Key property. See {@link VariantConfigurationInstance.varConfigurationBusObjectKey}.
   * @param varConfigurationBusObjectType Key property. See {@link VariantConfigurationInstance.varConfigurationBusObjectType}.
   * @param varConfignInstceInternalId Key property. See {@link VariantConfigurationInstance.varConfignInstceInternalId}.
   * @returns A request builder for creating requests to retrieve one `VariantConfigurationInstance` entity based on its keys.
   */
  getByKey(
    varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>,
    varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>,
    varConfignInstceInternalId: DeserializedType<T, 'Edm.Int32'>
  ): GetByKeyRequestBuilder<VariantConfigurationInstance<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `VariantConfigurationInstance`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `VariantConfigurationInstance`.
   */
  update(
    entity: VariantConfigurationInstance<T>
  ): UpdateRequestBuilder<VariantConfigurationInstance<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `VariantConfigurationInstance`.
   * @param varConfigurationBusObjectKey Key property. See {@link VariantConfigurationInstance.varConfigurationBusObjectKey}.
   * @param varConfigurationBusObjectType Key property. See {@link VariantConfigurationInstance.varConfigurationBusObjectType}.
   * @param varConfignInstceInternalId Key property. See {@link VariantConfigurationInstance.varConfignInstceInternalId}.
   * @returns A request builder for creating requests that delete an entity of type `VariantConfigurationInstance`.
   */
  delete(
    varConfigurationBusObjectKey: string,
    varConfigurationBusObjectType: string,
    varConfignInstceInternalId: number
  ): DeleteRequestBuilder<VariantConfigurationInstance<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `VariantConfigurationInstance`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `VariantConfigurationInstance` by taking the entity as a parameter.
   */
  delete(
    entity: VariantConfigurationInstance<T>
  ): DeleteRequestBuilder<VariantConfigurationInstance<T>, T>;
}
