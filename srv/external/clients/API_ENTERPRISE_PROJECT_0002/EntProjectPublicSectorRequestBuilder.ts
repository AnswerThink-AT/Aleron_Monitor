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
import { EntProjectPublicSector } from './EntProjectPublicSector';

/**
 * Request builder class for operations supported on the {@link EntProjectPublicSector} entity.
 */
export class EntProjectPublicSectorRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntProjectPublicSector<T>, T> {
  /**
   * Returns a request builder for querying all `EntProjectPublicSector` entities.
   * @returns A request builder for creating requests to retrieve all `EntProjectPublicSector` entities.
   */
  getAll(): GetAllRequestBuilder<EntProjectPublicSector<T>, T> {
    return new GetAllRequestBuilder<EntProjectPublicSector<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for retrieving one `EntProjectPublicSector` entity based on its keys.
   * @param projectUuid Key property. See {@link EntProjectPublicSector.projectUuid}.
   * @returns A request builder for creating requests to retrieve one `EntProjectPublicSector` entity based on its keys.
   */
  getByKey(
    projectUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EntProjectPublicSector<T>, T> {
    return new GetByKeyRequestBuilder<EntProjectPublicSector<T>, T>(
      this.entityApi,
      { ProjectUUID: projectUuid }
    );
  }

  /**
   * Returns a request builder for updating an entity of type `EntProjectPublicSector`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EntProjectPublicSector`.
   */
  update(
    entity: EntProjectPublicSector<T>
  ): UpdateRequestBuilder<EntProjectPublicSector<T>, T> {
    return new UpdateRequestBuilder<EntProjectPublicSector<T>, T>(
      this.entityApi,
      entity
    );
  }
}
