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
  OperationRequestBuilder,
  BatchChangeSet
} from '@sap-cloud-sdk/odata-v2';
import { Yy1_Salesvcdata_1, Yy1Salesvcdata1SapUpsertParameters } from './index';
/**
 * Batch builder for operations supported on the Yy1 Salesvcdata 1 Cds.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export declare function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Yy1 Salesvcdata 1 Cds.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<WriteYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare const defaultYy1Salesvcdata1CdsPath =
  '/sap/opu/odata/sap/YY1_SALESVCDATA_1_CDS';
export type ReadYy1Salesvcdata1CdsRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT>;
export type WriteYy1Salesvcdata1CdsRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT>
  | OperationRequestBuilder<
      DeSerializersT,
      Yy1Salesvcdata1SapUpsertParameters<DeSerializersT>,
      Yy1_Salesvcdata_1
    >;
