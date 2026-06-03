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
import { EnterpriseProjectJva } from './EnterpriseProjectJva';
/**
 * Request builder class for operations supported on the {@link EnterpriseProjectJva} entity.
 */
export declare class EnterpriseProjectJvaRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EnterpriseProjectJva<T>, T> {
  /**
   * Returns a request builder for querying all `EnterpriseProjectJva` entities.
   * @returns A request builder for creating requests to retrieve all `EnterpriseProjectJva` entities.
   */
  getAll(): GetAllRequestBuilder<EnterpriseProjectJva<T>, T>;
  /**
   * Returns a request builder for retrieving one `EnterpriseProjectJva` entity based on its keys.
   * @param projectUuid Key property. See {@link EnterpriseProjectJva.projectUuid}.
   * @returns A request builder for creating requests to retrieve one `EnterpriseProjectJva` entity based on its keys.
   */
  getByKey(
    projectUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EnterpriseProjectJva<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EnterpriseProjectJva`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EnterpriseProjectJva`.
   */
  update(
    entity: EnterpriseProjectJva<T>
  ): UpdateRequestBuilder<EnterpriseProjectJva<T>, T>;
}
