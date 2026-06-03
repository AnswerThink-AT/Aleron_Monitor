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
} from '@sap-cloud-sdk/odata-v4';
import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  SalesContract,
  SalesContractItem,
  SalesContractItemText,
  SalesContractText,
  SlsContrItemPricingElement,
  SlsContrPricingElement
} from './index';

/**
 * Batch builder for operations supported on the Ce Salescontract 0001.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadCeSalescontract0001RequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadCeSalescontract0001RequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | ReadCeSalescontract0001RequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
    | Array<
        | ReadCeSalescontract0001RequestBuilder<DeSerializersT>
        | BatchChangeSet<DeSerializersT>
      >,
  ...rest: Array<
    | ReadCeSalescontract0001RequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT> {
  return new ODataBatchRequestBuilder(
    defaultCeSalescontract0001Path,
    transformVariadicArgumentToArray(first, rest)
  );
}

/**
 * Change set constructor consists of write operations supported on the Ce Salescontract 0001.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<WriteCeSalescontract0001RequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteCeSalescontract0001RequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | WriteCeSalescontract0001RequestBuilder<DeSerializersT>
    | Array<WriteCeSalescontract0001RequestBuilder<DeSerializersT>>,
  ...rest: Array<WriteCeSalescontract0001RequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(transformVariadicArgumentToArray(first, rest));
}

export const defaultCeSalescontract0001Path = '/';
export type ReadCeSalescontract0001RequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<SalesContract<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<SalesContractItem<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<SalesContractItemText<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<SalesContractText<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      SlsContrItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<SlsContrPricingElement<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<SalesContract<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<SalesContractItem<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      SalesContractItemText<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<SalesContractText<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      SlsContrItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SlsContrPricingElement<DeSerializersT>,
      DeSerializersT
    >;
export type WriteCeSalescontract0001RequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<SalesContract<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesContract<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesContract<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<SalesContractItem<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesContractItem<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesContractItem<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<SalesContractItemText<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesContractItemText<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesContractItemText<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<SalesContractText<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesContractText<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesContractText<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      SlsContrItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SlsContrItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SlsContrItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<SlsContrPricingElement<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SlsContrPricingElement<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<
      SlsContrPricingElement<DeSerializersT>,
      DeSerializersT
    >;
