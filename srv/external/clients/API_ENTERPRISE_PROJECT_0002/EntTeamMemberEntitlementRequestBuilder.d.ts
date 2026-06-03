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
import { EntTeamMemberEntitlement } from './EntTeamMemberEntitlement';
/**
 * Request builder class for operations supported on the {@link EntTeamMemberEntitlement} entity.
 */
export declare class EntTeamMemberEntitlementRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntTeamMemberEntitlement<T>, T> {
  /**
   * Returns a request builder for querying all `EntTeamMemberEntitlement` entities.
   * @returns A request builder for creating requests to retrieve all `EntTeamMemberEntitlement` entities.
   */
  getAll(): GetAllRequestBuilder<EntTeamMemberEntitlement<T>, T>;
  /**
   * Returns a request builder for creating a `EntTeamMemberEntitlement` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `EntTeamMemberEntitlement`.
   */
  create(
    entity: EntTeamMemberEntitlement<T>
  ): CreateRequestBuilder<EntTeamMemberEntitlement<T>, T>;
  /**
   * Returns a request builder for retrieving one `EntTeamMemberEntitlement` entity based on its keys.
   * @param projectEntitlementUuid Key property. See {@link EntTeamMemberEntitlement.projectEntitlementUuid}.
   * @returns A request builder for creating requests to retrieve one `EntTeamMemberEntitlement` entity based on its keys.
   */
  getByKey(
    projectEntitlementUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EntTeamMemberEntitlement<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EntTeamMemberEntitlement`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EntTeamMemberEntitlement`.
   */
  update(
    entity: EntTeamMemberEntitlement<T>
  ): UpdateRequestBuilder<EntTeamMemberEntitlement<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `EntTeamMemberEntitlement`.
   * @param projectEntitlementUuid Key property. See {@link EntTeamMemberEntitlement.projectEntitlementUuid}.
   * @returns A request builder for creating requests that delete an entity of type `EntTeamMemberEntitlement`.
   */
  delete(
    projectEntitlementUuid: string
  ): DeleteRequestBuilder<EntTeamMemberEntitlement<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `EntTeamMemberEntitlement`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `EntTeamMemberEntitlement` by taking the entity as a parameter.
   */
  delete(
    entity: EntTeamMemberEntitlement<T>
  ): DeleteRequestBuilder<EntTeamMemberEntitlement<T>, T>;
}
