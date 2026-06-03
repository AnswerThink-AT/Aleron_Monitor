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
import { Yy1_Employee_Customer_Info } from './Yy1_Employee_Customer_Info';
/**
 * Request builder class for operations supported on the {@link Yy1_Employee_Customer_Info} entity.
 */
export declare class Yy1_Employee_Customer_InfoRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<Yy1_Employee_Customer_Info<T>, T> {
  /**
   * Returns a request builder for querying all `Yy1_Employee_Customer_Info` entities.
   * @returns A request builder for creating requests to retrieve all `Yy1_Employee_Customer_Info` entities.
   */
  getAll(): GetAllRequestBuilder<Yy1_Employee_Customer_Info<T>, T>;
  /**
   * Returns a request builder for creating a `Yy1_Employee_Customer_Info` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Yy1_Employee_Customer_Info`.
   */
  create(
    entity: Yy1_Employee_Customer_Info<T>
  ): CreateRequestBuilder<Yy1_Employee_Customer_Info<T>, T>;
  /**
   * Returns a request builder for retrieving one `Yy1_Employee_Customer_Info` entity based on its keys.
   * @param sapUuid Key property. See {@link Yy1_Employee_Customer_Info.sapUuid}.
   * @returns A request builder for creating requests to retrieve one `Yy1_Employee_Customer_Info` entity based on its keys.
   */
  getByKey(
    sapUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<Yy1_Employee_Customer_Info<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `Yy1_Employee_Customer_Info`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Yy1_Employee_Customer_Info`.
   */
  update(
    entity: Yy1_Employee_Customer_Info<T>
  ): UpdateRequestBuilder<Yy1_Employee_Customer_Info<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `Yy1_Employee_Customer_Info`.
   * @param sapUuid Key property. See {@link Yy1_Employee_Customer_Info.sapUuid}.
   * @returns A request builder for creating requests that delete an entity of type `Yy1_Employee_Customer_Info`.
   */
  delete(
    sapUuid: string
  ): DeleteRequestBuilder<Yy1_Employee_Customer_Info<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `Yy1_Employee_Customer_Info`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Yy1_Employee_Customer_Info` by taking the entity as a parameter.
   */
  delete(
    entity: Yy1_Employee_Customer_Info<T>
  ): DeleteRequestBuilder<Yy1_Employee_Customer_Info<T>, T>;
}
