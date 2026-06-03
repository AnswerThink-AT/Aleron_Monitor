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
import { PurchaseOrderItem } from './PurchaseOrderItem';
/**
 * Request builder class for operations supported on the {@link PurchaseOrderItem} entity.
 */
export declare class PurchaseOrderItemRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<PurchaseOrderItem<T>, T> {
  /**
   * Returns a request builder for querying all `PurchaseOrderItem` entities.
   * @returns A request builder for creating requests to retrieve all `PurchaseOrderItem` entities.
   */
  getAll(): GetAllRequestBuilder<PurchaseOrderItem<T>, T>;
  /**
   * Returns a request builder for creating a `PurchaseOrderItem` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `PurchaseOrderItem`.
   */
  create(
    entity: PurchaseOrderItem<T>
  ): CreateRequestBuilder<PurchaseOrderItem<T>, T>;
  /**
   * Returns a request builder for retrieving one `PurchaseOrderItem` entity based on its keys.
   * @param purchaseOrder Key property. See {@link PurchaseOrderItem.purchaseOrder}.
   * @param purchaseOrderItem Key property. See {@link PurchaseOrderItem.purchaseOrderItem}.
   * @returns A request builder for creating requests to retrieve one `PurchaseOrderItem` entity based on its keys.
   */
  getByKey(
    purchaseOrder: DeserializedType<T, 'Edm.String'>,
    purchaseOrderItem: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<PurchaseOrderItem<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `PurchaseOrderItem`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `PurchaseOrderItem`.
   */
  update(
    entity: PurchaseOrderItem<T>
  ): UpdateRequestBuilder<PurchaseOrderItem<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `PurchaseOrderItem`.
   * @param purchaseOrder Key property. See {@link PurchaseOrderItem.purchaseOrder}.
   * @param purchaseOrderItem Key property. See {@link PurchaseOrderItem.purchaseOrderItem}.
   * @returns A request builder for creating requests that delete an entity of type `PurchaseOrderItem`.
   */
  delete(
    purchaseOrder: string,
    purchaseOrderItem: string
  ): DeleteRequestBuilder<PurchaseOrderItem<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `PurchaseOrderItem`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `PurchaseOrderItem` by taking the entity as a parameter.
   */
  delete(
    entity: PurchaseOrderItem<T>
  ): DeleteRequestBuilder<PurchaseOrderItem<T>, T>;
}
