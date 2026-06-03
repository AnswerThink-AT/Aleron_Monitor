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
import { EnterpriseProject } from './EnterpriseProject';

/**
 * Request builder class for operations supported on the {@link EnterpriseProject} entity.
 */
export class EnterpriseProjectRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EnterpriseProject<T>, T> {
  /**
   * Returns a request builder for querying all `EnterpriseProject` entities.
   * @returns A request builder for creating requests to retrieve all `EnterpriseProject` entities.
   */
  getAll(): GetAllRequestBuilder<EnterpriseProject<T>, T> {
    return new GetAllRequestBuilder<EnterpriseProject<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `EnterpriseProject` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `EnterpriseProject`.
   */
  create(
    entity: EnterpriseProject<T>
  ): CreateRequestBuilder<EnterpriseProject<T>, T> {
    return new CreateRequestBuilder<EnterpriseProject<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for retrieving one `EnterpriseProject` entity based on its keys.
   * @param projectUuid Key property. See {@link EnterpriseProject.projectUuid}.
   * @returns A request builder for creating requests to retrieve one `EnterpriseProject` entity based on its keys.
   */
  getByKey(
    projectUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EnterpriseProject<T>, T> {
    return new GetByKeyRequestBuilder<EnterpriseProject<T>, T>(this.entityApi, {
      ProjectUUID: projectUuid
    });
  }

  /**
   * Returns a request builder for updating an entity of type `EnterpriseProject`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EnterpriseProject`.
   */
  update(
    entity: EnterpriseProject<T>
  ): UpdateRequestBuilder<EnterpriseProject<T>, T> {
    return new UpdateRequestBuilder<EnterpriseProject<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `EnterpriseProject`.
   * @param projectUuid Key property. See {@link EnterpriseProject.projectUuid}.
   * @returns A request builder for creating requests that delete an entity of type `EnterpriseProject`.
   */
  delete(projectUuid: string): DeleteRequestBuilder<EnterpriseProject<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `EnterpriseProject`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `EnterpriseProject` by taking the entity as a parameter.
   */
  delete(
    entity: EnterpriseProject<T>
  ): DeleteRequestBuilder<EnterpriseProject<T>, T>;
  delete(
    projectUuidOrEntity: any
  ): DeleteRequestBuilder<EnterpriseProject<T>, T> {
    return new DeleteRequestBuilder<EnterpriseProject<T>, T>(
      this.entityApi,
      projectUuidOrEntity instanceof EnterpriseProject
        ? projectUuidOrEntity
        : { ProjectUUID: projectUuidOrEntity! }
    );
  }
}
