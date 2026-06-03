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
import {
  Yy1_Employee_Customer_Info,
  Yy1EmployeeCustomerInfoSapUpsertParameters
} from './index';
/**
 * Batch builder for operations supported on the Yy1 Employee Customer Info Cds.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export declare function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadYy1EmployeeCustomerInfoCdsRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadYy1EmployeeCustomerInfoCdsRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Yy1 Employee Customer Info Cds.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    WriteYy1EmployeeCustomerInfoCdsRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteYy1EmployeeCustomerInfoCdsRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare const defaultYy1EmployeeCustomerInfoCdsPath =
  '/sap/opu/odata/sap/YY1_EMPLOYEE_CUSTOMER_INFO_CDS';
export type ReadYy1EmployeeCustomerInfoCdsRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<
      Yy1_Employee_Customer_Info<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      Yy1_Employee_Customer_Info<DeSerializersT>,
      DeSerializersT
    >;
export type WriteYy1EmployeeCustomerInfoCdsRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<
      Yy1_Employee_Customer_Info<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      Yy1_Employee_Customer_Info<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      Yy1_Employee_Customer_Info<DeSerializersT>,
      DeSerializersT
    >
  | OperationRequestBuilder<
      DeSerializersT,
      Yy1EmployeeCustomerInfoSapUpsertParameters<DeSerializersT>,
      Yy1_Employee_Customer_Info
    >;
