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
import { EntProjElmntDlvbrl } from './EntProjElmntDlvbrl';
/**
 * Request builder class for operations supported on the {@link EntProjElmntDlvbrl} entity.
 */
export declare class EntProjElmntDlvbrlRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntProjElmntDlvbrl<T>, T> {
  /**
   * Returns a request builder for querying all `EntProjElmntDlvbrl` entities.
   * @returns A request builder for creating requests to retrieve all `EntProjElmntDlvbrl` entities.
   */
  getAll(): GetAllRequestBuilder<EntProjElmntDlvbrl<T>, T>;
  /**
   * Returns a request builder for retrieving one `EntProjElmntDlvbrl` entity based on its keys.
   * @param entProjElmntDeliverableUuid Key property. See {@link EntProjElmntDlvbrl.entProjElmntDeliverableUuid}.
   * @returns A request builder for creating requests to retrieve one `EntProjElmntDlvbrl` entity based on its keys.
   */
  getByKey(
    entProjElmntDeliverableUuid: DeserializedType<T, 'Edm.Guid'>
  ): GetByKeyRequestBuilder<EntProjElmntDlvbrl<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `EntProjElmntDlvbrl`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `EntProjElmntDlvbrl`.
   */
  update(
    entity: EntProjElmntDlvbrl<T>
  ): UpdateRequestBuilder<EntProjElmntDlvbrl<T>, T>;
}
