/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder,
  BatchChangeSet
} from '@sap-cloud-sdk/odata-v2';
import { CompanyCode } from './index';
/**
 * Batch builder for operations supported on the Api Companycode.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export declare function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadApiCompanycodeRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadApiCompanycodeRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Api Companycode.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<WriteApiCompanycodeRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteApiCompanycodeRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare const defaultApiCompanycodePath =
  '/sap/opu/odata/sap/API_COMPANYCODE_SRV';
export type ReadApiCompanycodeRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<CompanyCode<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<CompanyCode<DeSerializersT>, DeSerializersT>;
export type WriteApiCompanycodeRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<CompanyCode<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<CompanyCode<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<CompanyCode<DeSerializersT>, DeSerializersT>;
