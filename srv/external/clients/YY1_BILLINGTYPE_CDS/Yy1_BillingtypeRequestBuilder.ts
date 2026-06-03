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
import { Yy1_Billingtype } from './Yy1_Billingtype';

/**
 * Request builder class for operations supported on the {@link Yy1_Billingtype} entity.
 */
export class Yy1_BillingtypeRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<Yy1_Billingtype<T>, T> {
  /**
   * Returns a request builder for querying all `Yy1_Billingtype` entities.
   * @returns A request builder for creating requests to retrieve all `Yy1_Billingtype` entities.
   */
  getAll(): GetAllRequestBuilder<Yy1_Billingtype<T>, T> {
    return new GetAllRequestBuilder<Yy1_Billingtype<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `Yy1_Billingtype` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Yy1_Billingtype`.
   */
  create(
    entity: Yy1_Billingtype<T>
  ): CreateRequestBuilder<Yy1_Billingtype<T>, T> {
    return new CreateRequestBuilder<Yy1_Billingtype<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for retrieving one `Yy1_Billingtype` entity based on its keys.
   * @param sapUuid Key property. See {@link Yy1_Billingtype.sapUuid}.
   * @returns A request builder for creating requests to retrieve one `Yy1_Billingtype` entity based on its keys.
   */
  getByKey(
    sapUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<Yy1_Billingtype<T>, T> {
    return new GetByKeyRequestBuilder<Yy1_Billingtype<T>, T>(this.entityApi, {
      SAP_UUID: sapUuid
    });
  }

  /**
   * Returns a request builder for updating an entity of type `Yy1_Billingtype`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Yy1_Billingtype`.
   */
  update(
    entity: Yy1_Billingtype<T>
  ): UpdateRequestBuilder<Yy1_Billingtype<T>, T> {
    return new UpdateRequestBuilder<Yy1_Billingtype<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `Yy1_Billingtype`.
   * @param sapUuid Key property. See {@link Yy1_Billingtype.sapUuid}.
   * @returns A request builder for creating requests that delete an entity of type `Yy1_Billingtype`.
   */
  delete(sapUuid: string): DeleteRequestBuilder<Yy1_Billingtype<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `Yy1_Billingtype`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Yy1_Billingtype` by taking the entity as a parameter.
   */
  delete(
    entity: Yy1_Billingtype<T>
  ): DeleteRequestBuilder<Yy1_Billingtype<T>, T>;
  delete(sapUuidOrEntity: any): DeleteRequestBuilder<Yy1_Billingtype<T>, T> {
    return new DeleteRequestBuilder<Yy1_Billingtype<T>, T>(
      this.entityApi,
      sapUuidOrEntity instanceof Yy1_Billingtype
        ? sapUuidOrEntity
        : { SAP_UUID: sapUuidOrEntity! }
    );
  }
}
