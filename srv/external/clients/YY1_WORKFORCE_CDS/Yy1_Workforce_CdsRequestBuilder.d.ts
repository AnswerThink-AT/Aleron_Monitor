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
  RequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { Yy1_Workforce_Cds } from './Yy1_Workforce_Cds';
/**
 * Request builder class for operations supported on the {@link Yy1_Workforce_Cds} entity.
 */
export declare class Yy1_Workforce_CdsRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<Yy1_Workforce_Cds<T>, T> {
  /**
   * Returns a request builder for querying all `Yy1_Workforce_Cds` entities.
   * @returns A request builder for creating requests to retrieve all `Yy1_Workforce_Cds` entities.
   */
  getAll(): GetAllRequestBuilder<Yy1_Workforce_Cds<T>, T>;
  /**
   * Returns a request builder for retrieving one `Yy1_Workforce_Cds` entity based on its keys.
   * @param workforcePersonExternalId Key property. See {@link Yy1_Workforce_Cds.workforcePersonExternalId}.
   * @returns A request builder for creating requests to retrieve one `Yy1_Workforce_Cds` entity based on its keys.
   */
  getByKey(
    workforcePersonExternalId: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<Yy1_Workforce_Cds<T>, T>;
}
