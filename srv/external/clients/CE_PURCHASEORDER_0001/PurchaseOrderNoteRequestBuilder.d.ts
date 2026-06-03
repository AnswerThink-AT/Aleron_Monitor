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
} from '@sap-cloud-sdk/odata-v4';
import { PurchaseOrderNote } from './PurchaseOrderNote';
/**
 * Request builder class for operations supported on the {@link PurchaseOrderNote} entity.
 */
export declare class PurchaseOrderNoteRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<PurchaseOrderNote<T>, T> {
  /**
   * Returns a request builder for querying all `PurchaseOrderNote` entities.
   * @returns A request builder for creating requests to retrieve all `PurchaseOrderNote` entities.
   */
  getAll(): GetAllRequestBuilder<PurchaseOrderNote<T>, T>;
  /**
   * Returns a request builder for creating a `PurchaseOrderNote` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `PurchaseOrderNote`.
   */
  create(
    entity: PurchaseOrderNote<T>
  ): CreateRequestBuilder<PurchaseOrderNote<T>, T>;
  /**
   * Returns a request builder for retrieving one `PurchaseOrderNote` entity based on its keys.
   * @param purchaseOrder Key property. See {@link PurchaseOrderNote.purchaseOrder}.
   * @param textObjectType Key property. See {@link PurchaseOrderNote.textObjectType}.
   * @param language Key property. See {@link PurchaseOrderNote.language}.
   * @returns A request builder for creating requests to retrieve one `PurchaseOrderNote` entity based on its keys.
   */
  getByKey(
    purchaseOrder: DeserializedType<T, 'Edm.String'>,
    textObjectType: DeserializedType<T, 'Edm.String'>,
    language: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<PurchaseOrderNote<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `PurchaseOrderNote`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `PurchaseOrderNote`.
   */
  update(
    entity: PurchaseOrderNote<T>
  ): UpdateRequestBuilder<PurchaseOrderNote<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `PurchaseOrderNote`.
   * @param purchaseOrder Key property. See {@link PurchaseOrderNote.purchaseOrder}.
   * @param textObjectType Key property. See {@link PurchaseOrderNote.textObjectType}.
   * @param language Key property. See {@link PurchaseOrderNote.language}.
   * @returns A request builder for creating requests that delete an entity of type `PurchaseOrderNote`.
   */
  delete(
    purchaseOrder: string,
    textObjectType: string,
    language: string
  ): DeleteRequestBuilder<PurchaseOrderNote<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `PurchaseOrderNote`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `PurchaseOrderNote` by taking the entity as a parameter.
   */
  delete(
    entity: PurchaseOrderNote<T>
  ): DeleteRequestBuilder<PurchaseOrderNote<T>, T>;
}
