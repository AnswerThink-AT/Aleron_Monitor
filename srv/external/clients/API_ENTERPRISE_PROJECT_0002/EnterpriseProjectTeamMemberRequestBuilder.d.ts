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
import { EnterpriseProjectTeamMember } from './EnterpriseProjectTeamMember';
/**
 * Request builder class for operations supported on the {@link EnterpriseProjectTeamMember} entity.
 */
export declare class EnterpriseProjectTeamMemberRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EnterpriseProjectTeamMember<T>, T> {
  /**
   * Returns a request builder for querying all `EnterpriseProjectTeamMember` entities.
   * @returns A request builder for creating requests to retrieve all `EnterpriseProjectTeamMember` entities.
   */
  getAll(): GetAllRequestBuilder<EnterpriseProjectTeamMember<T>, T>;
  /**
   * Returns a request builder for creating a `EnterpriseProjectTeamMember` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `EnterpriseProjectTeamMember`.
   */
  create(
    entity: EnterpriseProjectTeamMember<T>
  ): CreateRequestBuilder<EnterpriseProjectTeamMember<T>, T>;
  /**
   * Returns a request builder for retrieving one `EnterpriseProjectTeamMember` entity based on its keys.
   * @param teamMemberUuid Key property. See {@link EnterpriseProjectTeamMember.teamMemberUuid}.
   * @returns A request builder for creating requests to retrieve one `EnterpriseProjectTeamMember` entity based on its keys.
   */
  getByKey(
    teamMemberUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EnterpriseProjectTeamMember<T>, T>;
}
