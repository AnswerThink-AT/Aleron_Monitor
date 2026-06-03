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
import {
  SalesOrder,
  SalesOrderItem,
  SalesOrderItemPartner,
  SalesOrderItemPricingElement,
  SalesOrderItemText,
  SalesOrderPartner,
  SalesOrderPricingElement,
  SalesOrderScheduleLine,
  SalesOrderText,
  VarConfignAssignedValue,
  VarConfignCharacteristic,
  VariantConfiguration,
  VariantConfigurationInstance
} from './index';
/**
 * Batch builder for operations supported on the Ce Salesorder 0001.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export declare function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadCeSalesorder0001RequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadCeSalesorder0001RequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Ce Salesorder 0001.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<WriteCeSalesorder0001RequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteCeSalesorder0001RequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare const defaultCeSalesorder0001Path = '/';
export type ReadCeSalesorder0001RequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<SalesOrder<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<SalesOrderItem<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<SalesOrderItemPartner<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      SalesOrderItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<SalesOrderItemText<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<SalesOrderPartner<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      SalesOrderPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<SalesOrderScheduleLine<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<SalesOrderText<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      VarConfignAssignedValue<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<VariantConfiguration<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      VariantConfigurationInstance<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<SalesOrder<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<SalesOrderItem<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      SalesOrderItemPartner<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SalesOrderItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<SalesOrderItemText<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<SalesOrderPartner<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      SalesOrderPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      SalesOrderScheduleLine<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<SalesOrderText<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      VarConfignAssignedValue<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<VariantConfiguration<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      VariantConfigurationInstance<DeSerializersT>,
      DeSerializersT
    >;
export type WriteCeSalesorder0001RequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<SalesOrder<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesOrder<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesOrder<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<SalesOrderItem<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesOrderItem<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesOrderItem<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<SalesOrderItemPartner<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesOrderItemPartner<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesOrderItemPartner<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      SalesOrderItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SalesOrderItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SalesOrderItemPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<SalesOrderItemText<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesOrderItemText<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesOrderItemText<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<SalesOrderPartner<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesOrderPartner<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesOrderPartner<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      SalesOrderPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      SalesOrderPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      SalesOrderPricingElement<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<SalesOrderScheduleLine<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesOrderScheduleLine<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesOrderScheduleLine<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<SalesOrderText<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<SalesOrderText<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<SalesOrderText<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      VarConfignAssignedValue<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      VarConfignAssignedValue<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      VarConfignAssignedValue<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      VarConfignCharacteristic<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<VariantConfiguration<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<VariantConfiguration<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<VariantConfiguration<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      VariantConfigurationInstance<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      VariantConfigurationInstance<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      VariantConfigurationInstance<DeSerializersT>,
      DeSerializersT
    >;
