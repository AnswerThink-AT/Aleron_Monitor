/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  DeleteRequestBuilder,
  DeserializedType,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  RequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { EntProjElmntWorkItem } from './EntProjElmntWorkItem';
/**
 * Request builder class for operations supported on the {@link EntProjElmntWorkItem} entity.
 */
export declare class EntProjElmntWorkItemRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntProjElmntWorkItem<T>, T> {
  /**
   * Returns a request builder for querying all `EntProjElmntWorkItem` entities.
   * @returns A request builder for creating requests to retrieve all `EntProjElmntWorkItem` entities.
   */
  getAll(): GetAllRequestBuilder<EntProjElmntWorkItem<T>, T>;
  /**
   * Returns a request builder for retrieving one `EntProjElmntWorkItem` entity based on its keys.
   * @param entProjElmntWorkItemUuid Key property. See {@link EntProjElmntWorkItem.entProjElmntWorkItemUuid}.
   * @returns A request builder for creating requests to retrieve one `EntProjElmntWorkItem` entity based on its keys.
   */
  getByKey(
    entProjElmntWorkItemUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EntProjElmntWorkItem<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EntProjElmntWorkItem`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EntProjElmntWorkItem`.
   */
  update(
    entity: EntProjElmntWorkItem<T>
  ): UpdateRequestBuilder<EntProjElmntWorkItem<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `EntProjElmntWorkItem`.
   * @param entProjElmntWorkItemUuid Key property. See {@link EntProjElmntWorkItem.entProjElmntWorkItemUuid}.
   * @returns A request builder for creating requests that delete an entity of type `EntProjElmntWorkItem`.
   */
  delete(
    entProjElmntWorkItemUuid: string
  ): DeleteRequestBuilder<EntProjElmntWorkItem<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `EntProjElmntWorkItem`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `EntProjElmntWorkItem` by taking the entity as a parameter.
   */
  delete(
    entity: EntProjElmntWorkItem<T>
  ): DeleteRequestBuilder<EntProjElmntWorkItem<T>, T>;
}
