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
} from '@sap-cloud-sdk/odata-v2';
import { EnterpriseProjectElement } from './EnterpriseProjectElement';
/**
 * Request builder class for operations supported on the {@link EnterpriseProjectElement} entity.
 */
export declare class EnterpriseProjectElementRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EnterpriseProjectElement<T>, T> {
  /**
   * Returns a request builder for querying all `EnterpriseProjectElement` entities.
   * @returns A request builder for creating requests to retrieve all `EnterpriseProjectElement` entities.
   */
  getAll(): GetAllRequestBuilder<EnterpriseProjectElement<T>, T>;
  /**
   * Returns a request builder for creating a `EnterpriseProjectElement` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `EnterpriseProjectElement`.
   */
  create(
    entity: EnterpriseProjectElement<T>
  ): CreateRequestBuilder<EnterpriseProjectElement<T>, T>;
  /**
   * Returns a request builder for retrieving one `EnterpriseProjectElement` entity based on its keys.
   * @param projectElementUuid Key property. See {@link EnterpriseProjectElement.projectElementUuid}.
   * @returns A request builder for creating requests to retrieve one `EnterpriseProjectElement` entity based on its keys.
   */
  getByKey(
    projectElementUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EnterpriseProjectElement<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EnterpriseProjectElement`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EnterpriseProjectElement`.
   */
  update(
    entity: EnterpriseProjectElement<T>
  ): UpdateRequestBuilder<EnterpriseProjectElement<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `EnterpriseProjectElement`.
   * @param projectElementUuid Key property. See {@link EnterpriseProjectElement.projectElementUuid}.
   * @returns A request builder for creating requests that delete an entity of type `EnterpriseProjectElement`.
   */
  delete(
    projectElementUuid: string
  ): DeleteRequestBuilder<EnterpriseProjectElement<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `EnterpriseProjectElement`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `EnterpriseProjectElement` by taking the entity as a parameter.
   */
  delete(
    entity: EnterpriseProjectElement<T>
  ): DeleteRequestBuilder<EnterpriseProjectElement<T>, T>;
}
