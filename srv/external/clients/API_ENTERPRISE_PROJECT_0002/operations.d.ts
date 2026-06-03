/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { EnterpriseProjectElement } from './EnterpriseProjectElement';
import { EnterpriseProject } from './EnterpriseProject';
/**
 * Type of the parameters to be passed to {@link changeEntProjElmntPosition}.
 */
export interface ChangeEntProjElmntPositionParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Project Element Uuid.
   */
  projectElementUuid?: string | null;
  /**
   * Parent Object Uuid.
   */
  parentObjectUuid?: string | null;
  /**
   * Left Sibling Uuid.
   */
  leftSiblingUuid?: string | null;
}
/**
 * Change Ent Proj Elmnt Position.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function changeEntProjElmntPosition<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ChangeEntProjElmntPositionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ChangeEntProjElmntPositionParameters<DeSerializersT>,
  EnterpriseProjectElement
>;
/**
 * Type of the parameters to be passed to {@link changeEntProjElmntProcgStatus}.
 */
export interface ChangeEntProjElmntProcgStatusParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Project Element Uuid.
   */
  projectElementUuid?: string | null;
  /**
   * Processing Status.
   */
  processingStatus?: string | null;
}
/**
 * Change Ent Proj Elmnt Procg Status.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function changeEntProjElmntProcgStatus<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ChangeEntProjElmntProcgStatusParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ChangeEntProjElmntProcgStatusParameters<DeSerializersT>,
  EnterpriseProjectElement
>;
/**
 * Type of the parameters to be passed to {@link changeEntProjProcgStatus}.
 */
export interface ChangeEntProjProcgStatusParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Project Uuid.
   */
  projectUuid?: string | null;
  /**
   * Processing Status.
   */
  processingStatus?: string | null;
}
/**
 * Change Ent Proj Procg Status.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function changeEntProjProcgStatus<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ChangeEntProjProcgStatusParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ChangeEntProjProcgStatusParameters<DeSerializersT>,
  EnterpriseProject
>;
/**
 * Type of the parameters to be passed to {@link copyToActiveDocument}.
 */
export interface CopyToActiveDocumentParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Project Uuid.
   */
  projectUuid?: string | null;
  /**
   * Ent Proj Demand Copy Is Requested.
   */
  entProjDemandCopyIsRequested?: boolean | null;
  /**
   * Ent Proj Settlmt Rule Cpy Is Reqd.
   */
  entProjSettlmtRuleCpyIsReqd?: boolean | null;
  /**
   * Project.
   */
  project?: string | null;
  /**
   * Project Name.
   */
  projectName?: string | null;
  /**
   * Project Start Date.
   */
  projectStartDate?: Moment | null;
  /**
   * Project End Date.
   */
  projectEndDate?: Moment | null;
  /**
   * Customer Uuid.
   */
  customerUuid?: string | null;
  /**
   * Enterprise Project Service Org.
   */
  enterpriseProjectServiceOrg?: string | null;
  /**
   * Responsible Cost Center.
   */
  responsibleCostCenter?: string | null;
  /**
   * Project Manager Uuid.
   */
  projectManagerUuid?: string | null;
  /**
   * Project Currency.
   */
  projectCurrency?: string | null;
  /**
   * Ent Project Is Confidential.
   */
  entProjectIsConfidential?: boolean | null;
  /**
   * Restricted Time Posting.
   */
  restrictedTimePosting?: string | null;
}
/**
 * Copy To Active Document.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function copyToActiveDocument<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: CopyToActiveDocumentParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  CopyToActiveDocumentParameters<DeSerializersT>,
  EnterpriseProject
>;
export declare const operations: {
  changeEntProjElmntPosition: typeof changeEntProjElmntPosition;
  changeEntProjElmntProcgStatus: typeof changeEntProjElmntProcgStatus;
  changeEntProjProcgStatus: typeof changeEntProjProcgStatus;
  copyToActiveDocument: typeof copyToActiveDocument;
};
