/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  RequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { EntProjElmntBlockFunc } from './EntProjElmntBlockFunc';
/**
 * Request builder class for operations supported on the {@link EntProjElmntBlockFunc} entity.
 */
export declare class EntProjElmntBlockFuncRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntProjElmntBlockFunc<T>, T> {
  /**
   * Returns a request builder for querying all `EntProjElmntBlockFunc` entities.
   * @returns A request builder for creating requests to retrieve all `EntProjElmntBlockFunc` entities.
   */
  getAll(): GetAllRequestBuilder<EntProjElmntBlockFunc<T>, T>;
  /**
   * Returns a request builder for creating a `EntProjElmntBlockFunc` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `EntProjElmntBlockFunc`.
   */
  create(
    entity: EntProjElmntBlockFunc<T>
  ): CreateRequestBuilder<EntProjElmntBlockFunc<T>, T>;
  /**
   * Returns a request builder for retrieving one `EntProjElmntBlockFunc` entity based on its keys.
   * @param projectElementUuid Key property. See {@link EntProjElmntBlockFunc.projectElementUuid}.
   * @returns A request builder for creating requests to retrieve one `EntProjElmntBlockFunc` entity based on its keys.
   */
  getByKey(
    projectElementUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EntProjElmntBlockFunc<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EntProjElmntBlockFunc`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EntProjElmntBlockFunc`.
   */
  update(
    entity: EntProjElmntBlockFunc<T>
  ): UpdateRequestBuilder<EntProjElmntBlockFunc<T>, T>;
}
