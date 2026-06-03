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
import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Yy1_Salesvcdata_1, Yy1Salesvcdata1SapUpsertParameters } from './index';

/**
 * Batch builder for operations supported on the Yy1 Salesvcdata 1 Cds.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | ReadYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
    | Array<
        | ReadYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>
        | BatchChangeSet<DeSerializersT>
      >,
  ...rest: Array<
    | ReadYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT> {
  return new ODataBatchRequestBuilder(
    defaultYy1Salesvcdata1CdsPath,
    transformVariadicArgumentToArray(first, rest)
  );
}

/**
 * Change set constructor consists of write operations supported on the Yy1 Salesvcdata 1 Cds.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<WriteYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | WriteYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>
    | Array<WriteYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>>,
  ...rest: Array<WriteYy1Salesvcdata1CdsRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(transformVariadicArgumentToArray(first, rest));
}

export const defaultYy1Salesvcdata1CdsPath =
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
