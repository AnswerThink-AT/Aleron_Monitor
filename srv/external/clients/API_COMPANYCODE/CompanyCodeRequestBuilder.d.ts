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
import { CompanyCode } from './CompanyCode';
/**
 * Request builder class for operations supported on the {@link CompanyCode} entity.
 */
export declare class CompanyCodeRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<CompanyCode<T>, T> {
  /**
   * Returns a request builder for querying all `CompanyCode` entities.
   * @returns A request builder for creating requests to retrieve all `CompanyCode` entities.
   */
  getAll(): GetAllRequestBuilder<CompanyCode<T>, T>;
  /**
   * Returns a request builder for retrieving one `CompanyCode` entity based on its keys.
   * @param companyCode Key property. See {@link CompanyCode.companyCode}.
   * @returns A request builder for creating requests to retrieve one `CompanyCode` entity based on its keys.
   */
  getByKey(
    companyCode: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<CompanyCode<T>, T>;
}
