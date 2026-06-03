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
import {
  SuplrInvcHeaderWhldgTax,
  SuplrInvcItemAcctAssgmt,
  SuplrInvcItemPurOrdRef,
  SuplrInvcSeldInbDeliveryNote,
  SuplrInvcSeldPurgDocument,
  SuplrInvcSeldSrvcEntrShtLean,
  SuplrInvoiceAdditionalData,
  SupplierInvoice,
  SupplierInvoiceItemAsset,
  SupplierInvoiceItemGlAcct,
  SupplierInvoiceItemMaterial,
  SupplierInvoiceOdn,
  SupplierInvoiceTax,
  PostParameters,
  ReleaseParameters,
  CancelParameters,
  PostInvoiceExportParameters,
  ReleaseInvoiceExportParameters,
  CancelInvoiceExportParameters
} from './index';

/**
 * Batch builder for operations supported on the Api Supplierinvoice Process.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | ReadApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
    | Array<
        | ReadApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>
        | BatchChangeSet<DeSerializersT>
      >,
  ...rest: Array<
    | ReadApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT> {
  return new ODataBatchRequestBuilder(
    defaultApiSupplierinvoiceProcessPath,
    transformVariadicArgumentToArray(first, rest)
  );
}

/**
 * Change set constructor consists of write operations supported on the Api Supplierinvoice Process.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    WriteApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | WriteApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>
    | Array<WriteApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>>,
  ...rest: Array<WriteApiSupplierinvoiceProcessRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(transformVariadicArgumentToArray(first, rest));
}

export const defaultApiSupplierinvoiceProcessPath =
  '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
export type ReadApiSupplierinvoiceProcessRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<
      SuplrInvcHeaderWhldgTax<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      SuplrInvcItemAcctAssgmt<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<SuplrInvcItemPurOrdRef<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      SuplrInvcSeldInbDeliveryNote<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      SuplrInvcSeldPurgDocument<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      SuplrInvoiceAdditionalData<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<SupplierInvoice<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      SupplierInvoiceItemAsset<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      SupplierInvoiceItemGlAcct<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      SupplierInvoiceItemMaterial<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<SupplierInvoiceTax<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      SuplrInvcHeaderWhldgTax<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SuplrInvcItemAcctAssgmt<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SuplrInvcItemPurOrdRef<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SuplrInvcSeldInbDeliveryNote<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SuplrInvcSeldPurgDocument<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SuplrInvoiceAdditionalData<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<SupplierInvoice<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      SupplierInvoiceItemAsset<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SupplierInvoiceItemGlAcct<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SupplierInvoiceItemMaterial<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<SupplierInvoiceTax<DeSerializersT>, DeSerializersT>;
export type WriteApiSupplierinvoiceProcessRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<
      SuplrInvcHeaderWhldgTax<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SuplrInvcHeaderWhldgTax<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SuplrInvcHeaderWhldgTax<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      SuplrInvcItemAcctAssgmt<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SuplrInvcItemAcctAssgmt<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SuplrInvcItemAcctAssgmt<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<SuplrInvcItemPurOrdRef<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SuplrInvcItemPurOrdRef<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SuplrInvcItemPurOrdRef<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      SuplrInvcSeldInbDeliveryNote<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SuplrInvcSeldInbDeliveryNote<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SuplrInvcSeldInbDeliveryNote<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      SuplrInvcSeldPurgDocument<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SuplrInvcSeldPurgDocument<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SuplrInvcSeldPurgDocument<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      SuplrInvoiceAdditionalData<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SuplrInvoiceAdditionalData<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SuplrInvoiceAdditionalData<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<SupplierInvoice<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SupplierInvoice<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SupplierInvoice<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      SupplierInvoiceItemAsset<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SupplierInvoiceItemAsset<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SupplierInvoiceItemAsset<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      SupplierInvoiceItemGlAcct<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SupplierInvoiceItemGlAcct<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SupplierInvoiceItemGlAcct<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      SupplierInvoiceItemMaterial<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SupplierInvoiceItemMaterial<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SupplierInvoiceItemMaterial<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<SupplierInvoiceTax<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SupplierInvoiceTax<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SupplierInvoiceTax<DeSerializersT>, DeSerializersT>
  | OperationRequestBuilder<
      DeSerializersT,
      PostParameters<DeSerializersT>,
      PostInvoiceExportParameters
    >
  | OperationRequestBuilder<
      DeSerializersT,
      ReleaseParameters<DeSerializersT>,
      ReleaseInvoiceExportParameters
    >
  | OperationRequestBuilder<
      DeSerializersT,
      CancelParameters<DeSerializersT>,
      CancelInvoiceExportParameters
    >;
