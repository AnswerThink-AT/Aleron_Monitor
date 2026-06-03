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
  EnterpriseProjBlkFunc,
  EnterpriseProjectElement,
  EnterpriseProjectJva,
  EnterpriseProjectRole,
  EnterpriseProjectTeamMember,
  EnterpriseProject,
  EntProjectElementJva,
  EntProjectPublicSector,
  EntProjElmntBlockFunc,
  EntProjElmntCnfgrdWrkItmTxt,
  EntProjElmntDlvbrl,
  EntProjElmntDlvbrlDistr,
  EntProjectElmntPublicSector,
  EntProjElmntWorkItem,
  EntTeamMemberEntitlement,
  ChangeEntProjElmntPositionParameters,
  ChangeEntProjElmntProcgStatusParameters,
  ChangeEntProjProcgStatusParameters,
  CopyToActiveDocumentParameters
} from './index';
/**
 * Batch builder for operations supported on the Api Enterprise Project 0002.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export declare function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadApiEnterpriseProject0002RequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadApiEnterpriseProject0002RequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Api Enterprise Project 0002.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    WriteApiEnterpriseProject0002RequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<WriteApiEnterpriseProject0002RequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT>;
export declare const defaultApiEnterpriseProject0002Path =
  '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
export type ReadApiEnterpriseProject0002RequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<EnterpriseProjBlkFunc<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<EnterpriseProjectJva<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<EnterpriseProjectRole<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<EnterpriseProject<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<EntProjectElementJva<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<EntProjectPublicSector<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<EntProjElmntBlockFunc<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT
    >
  | GetAllRequestBuilder<EntProjElmntWorkItem<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      EnterpriseProjBlkFunc<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<EnterpriseProjectJva<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      EnterpriseProjectRole<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<EnterpriseProject<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<EntProjectElementJva<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      EntProjectPublicSector<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      EntProjElmntBlockFunc<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT
    >
  | GetByKeyRequestBuilder<EntProjElmntWorkItem<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT
    >;
export type WriteApiEnterpriseProject0002RequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<EnterpriseProjBlkFunc<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EnterpriseProjBlkFunc<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EnterpriseProjBlkFunc<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      EnterpriseProjectElement<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<EnterpriseProjectJva<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EnterpriseProjectJva<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EnterpriseProjectJva<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<EnterpriseProjectRole<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EnterpriseProjectRole<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EnterpriseProjectRole<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<EnterpriseProject<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EnterpriseProject<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EnterpriseProject<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<EntProjectElementJva<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EntProjectElementJva<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EntProjectElementJva<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<EntProjectPublicSector<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EntProjectPublicSector<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EntProjectPublicSector<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<EntProjElmntBlockFunc<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EntProjElmntBlockFunc<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EntProjElmntBlockFunc<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT
    >
  | CreateRequestBuilder<EntProjElmntWorkItem<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<EntProjElmntWorkItem<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<EntProjElmntWorkItem<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT
    >
  | UpdateRequestBuilder<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT
    >
  | DeleteRequestBuilder<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT
    >
  | OperationRequestBuilder<
      DeSerializersT,
      ChangeEntProjElmntPositionParameters<DeSerializersT>,
      EnterpriseProjectElement
    >
  | OperationRequestBuilder<
      DeSerializersT,
      ChangeEntProjElmntProcgStatusParameters<DeSerializersT>,
      EnterpriseProjectElement
    >
  | OperationRequestBuilder<
      DeSerializersT,
      ChangeEntProjProcgStatusParameters<DeSerializersT>,
      EnterpriseProject
    >
  | OperationRequestBuilder<
      DeSerializersT,
      CopyToActiveDocumentParameters<DeSerializersT>,
      EnterpriseProject
    >;
