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
import { EntProjectElmntPublicSector } from './EntProjectElmntPublicSector';
/**
 * Request builder class for operations supported on the {@link EntProjectElmntPublicSector} entity.
 */
export declare class EntProjectElmntPublicSectorRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntProjectElmntPublicSector<T>, T> {
  /**
   * Returns a request builder for querying all `EntProjectElmntPublicSector` entities.
   * @returns A request builder for creating requests to retrieve all `EntProjectElmntPublicSector` entities.
   */
  getAll(): GetAllRequestBuilder<EntProjectElmntPublicSector<T>, T>;
  /**
   * Returns a request builder for retrieving one `EntProjectElmntPublicSector` entity based on its keys.
   * @param projectElementUuid Key property. See {@link EntProjectElmntPublicSector.projectElementUuid}.
   * @returns A request builder for creating requests to retrieve one `EntProjectElmntPublicSector` entity based on its keys.
   */
  getByKey(
    projectElementUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EntProjectElmntPublicSector<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EntProjectElmntPublicSector`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EntProjectElmntPublicSector`.
   */
  update(
    entity: EntProjectElmntPublicSector<T>
  ): UpdateRequestBuilder<EntProjectElmntPublicSector<T>, T>;
}
