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
import { EntProjElmntDlvbrlDistr } from './EntProjElmntDlvbrlDistr';
/**
 * Request builder class for operations supported on the {@link EntProjElmntDlvbrlDistr} entity.
 */
export declare class EntProjElmntDlvbrlDistrRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntProjElmntDlvbrlDistr<T>, T> {
  /**
   * Returns a request builder for querying all `EntProjElmntDlvbrlDistr` entities.
   * @returns A request builder for creating requests to retrieve all `EntProjElmntDlvbrlDistr` entities.
   */
  getAll(): GetAllRequestBuilder<EntProjElmntDlvbrlDistr<T>, T>;
  /**
   * Returns a request builder for retrieving one `EntProjElmntDlvbrlDistr` entity based on its keys.
   * @param entProjElmntDlvbrlDistrUuid Key property. See {@link EntProjElmntDlvbrlDistr.entProjElmntDlvbrlDistrUuid}.
   * @returns A request builder for creating requests to retrieve one `EntProjElmntDlvbrlDistr` entity based on its keys.
   */
  getByKey(
    entProjElmntDlvbrlDistrUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EntProjElmntDlvbrlDistr<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EntProjElmntDlvbrlDistr`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EntProjElmntDlvbrlDistr`.
   */
  update(
    entity: EntProjElmntDlvbrlDistr<T>
  ): UpdateRequestBuilder<EntProjElmntDlvbrlDistr<T>, T>;
}
