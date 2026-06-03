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
  RequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { EnterpriseProjectRole } from './EnterpriseProjectRole';

/**
 * Request builder class for operations supported on the {@link EnterpriseProjectRole} entity.
 */
export class EnterpriseProjectRoleRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EnterpriseProjectRole<T>, T> {
  /**
   * Returns a request builder for querying all `EnterpriseProjectRole` entities.
   * @returns A request builder for creating requests to retrieve all `EnterpriseProjectRole` entities.
   */
  getAll(): GetAllRequestBuilder<EnterpriseProjectRole<T>, T> {
    return new GetAllRequestBuilder<EnterpriseProjectRole<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `EnterpriseProjectRole` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `EnterpriseProjectRole`.
   */
  create(
    entity: EnterpriseProjectRole<T>
  ): CreateRequestBuilder<EnterpriseProjectRole<T>, T> {
    return new CreateRequestBuilder<EnterpriseProjectRole<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for retrieving one `EnterpriseProjectRole` entity based on its keys.
   * @param projectRoleUuid Key property. See {@link EnterpriseProjectRole.projectRoleUuid}.
   * @returns A request builder for creating requests to retrieve one `EnterpriseProjectRole` entity based on its keys.
   */
  getByKey(
    projectRoleUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EnterpriseProjectRole<T>, T> {
    return new GetByKeyRequestBuilder<EnterpriseProjectRole<T>, T>(
      this.entityApi,
      { ProjectRoleUUID: projectRoleUuid }
    );
  }
}
