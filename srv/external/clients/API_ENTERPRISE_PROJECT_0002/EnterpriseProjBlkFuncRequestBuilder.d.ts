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
import { EnterpriseProjBlkFunc } from './EnterpriseProjBlkFunc';
/**
 * Request builder class for operations supported on the {@link EnterpriseProjBlkFunc} entity.
 */
export declare class EnterpriseProjBlkFuncRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EnterpriseProjBlkFunc<T>, T> {
  /**
   * Returns a request builder for querying all `EnterpriseProjBlkFunc` entities.
   * @returns A request builder for creating requests to retrieve all `EnterpriseProjBlkFunc` entities.
   */
  getAll(): GetAllRequestBuilder<EnterpriseProjBlkFunc<T>, T>;
  /**
   * Returns a request builder for creating a `EnterpriseProjBlkFunc` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `EnterpriseProjBlkFunc`.
   */
  create(
    entity: EnterpriseProjBlkFunc<T>
  ): CreateRequestBuilder<EnterpriseProjBlkFunc<T>, T>;
  /**
   * Returns a request builder for retrieving one `EnterpriseProjBlkFunc` entity based on its keys.
   * @param projectUuid Key property. See {@link EnterpriseProjBlkFunc.projectUuid}.
   * @returns A request builder for creating requests to retrieve one `EnterpriseProjBlkFunc` entity based on its keys.
   */
  getByKey(
    projectUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EnterpriseProjBlkFunc<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EnterpriseProjBlkFunc`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EnterpriseProjBlkFunc`.
   */
  update(
    entity: EnterpriseProjBlkFunc<T>
  ): UpdateRequestBuilder<EnterpriseProjBlkFunc<T>, T>;
}
