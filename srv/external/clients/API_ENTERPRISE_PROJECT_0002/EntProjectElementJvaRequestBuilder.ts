/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  RequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { EntProjectElementJva } from './EntProjectElementJva';

/**
 * Request builder class for operations supported on the {@link EntProjectElementJva} entity.
 */
export class EntProjectElementJvaRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntProjectElementJva<T>, T> {
  /**
   * Returns a request builder for querying all `EntProjectElementJva` entities.
   * @returns A request builder for creating requests to retrieve all `EntProjectElementJva` entities.
   */
  getAll(): GetAllRequestBuilder<EntProjectElementJva<T>, T> {
    return new GetAllRequestBuilder<EntProjectElementJva<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for retrieving one `EntProjectElementJva` entity based on its keys.
   * @param projectElementUuid Key property. See {@link EntProjectElementJva.projectElementUuid}.
   * @returns A request builder for creating requests to retrieve one `EntProjectElementJva` entity based on its keys.
   */
  getByKey(
    projectElementUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EntProjectElementJva<T>, T> {
    return new GetByKeyRequestBuilder<EntProjectElementJva<T>, T>(
      this.entityApi,
      { ProjectElementUUID: projectElementUuid }
    );
  }

  /**
   * Returns a request builder for updating an entity of type `EntProjectElementJva`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EntProjectElementJva`.
   */
  update(
    entity: EntProjectElementJva<T>
  ): UpdateRequestBuilder<EntProjectElementJva<T>, T> {
    return new UpdateRequestBuilder<EntProjectElementJva<T>, T>(
      this.entityApi,
      entity
    );
  }
}
