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
import { Yy1_Salesvcdata_1 } from './Yy1_Salesvcdata_1';

/**
 * Request builder class for operations supported on the {@link Yy1_Salesvcdata_1} entity.
 */
export class Yy1_Salesvcdata_1RequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<Yy1_Salesvcdata_1<T>, T> {
  /**
   * Returns a request builder for querying all `Yy1_Salesvcdata_1` entities.
   * @returns A request builder for creating requests to retrieve all `Yy1_Salesvcdata_1` entities.
   */
  getAll(): GetAllRequestBuilder<Yy1_Salesvcdata_1<T>, T> {
    return new GetAllRequestBuilder<Yy1_Salesvcdata_1<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `Yy1_Salesvcdata_1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Yy1_Salesvcdata_1`.
   */
  create(
    entity: Yy1_Salesvcdata_1<T>
  ): CreateRequestBuilder<Yy1_Salesvcdata_1<T>, T> {
    return new CreateRequestBuilder<Yy1_Salesvcdata_1<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for retrieving one `Yy1_Salesvcdata_1` entity based on its keys.
   * @param sapUuid Key property. See {@link Yy1_Salesvcdata_1.sapUuid}.
   * @returns A request builder for creating requests to retrieve one `Yy1_Salesvcdata_1` entity based on its keys.
   */
  getByKey(
    sapUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<Yy1_Salesvcdata_1<T>, T> {
    return new GetByKeyRequestBuilder<Yy1_Salesvcdata_1<T>, T>(this.entityApi, {
      SAP_UUID: sapUuid
    });
  }

  /**
   * Returns a request builder for updating an entity of type `Yy1_Salesvcdata_1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Yy1_Salesvcdata_1`.
   */
  update(
    entity: Yy1_Salesvcdata_1<T>
  ): UpdateRequestBuilder<Yy1_Salesvcdata_1<T>, T> {
    return new UpdateRequestBuilder<Yy1_Salesvcdata_1<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `Yy1_Salesvcdata_1`.
   * @param sapUuid Key property. See {@link Yy1_Salesvcdata_1.sapUuid}.
   * @returns A request builder for creating requests that delete an entity of type `Yy1_Salesvcdata_1`.
   */
  delete(sapUuid: string): DeleteRequestBuilder<Yy1_Salesvcdata_1<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `Yy1_Salesvcdata_1`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Yy1_Salesvcdata_1` by taking the entity as a parameter.
   */
  delete(
    entity: Yy1_Salesvcdata_1<T>
  ): DeleteRequestBuilder<Yy1_Salesvcdata_1<T>, T>;
  delete(sapUuidOrEntity: any): DeleteRequestBuilder<Yy1_Salesvcdata_1<T>, T> {
    return new DeleteRequestBuilder<Yy1_Salesvcdata_1<T>, T>(
      this.entityApi,
      sapUuidOrEntity instanceof Yy1_Salesvcdata_1
        ? sapUuidOrEntity
        : { SAP_UUID: sapUuidOrEntity! }
    );
  }
}
