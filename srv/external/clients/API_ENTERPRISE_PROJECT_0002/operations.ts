/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import {
  transformReturnValueForEntity,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  OperationParameter,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { apiEnterpriseProject0002 } from './service';
import { EnterpriseProjectElement } from './EnterpriseProjectElement';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
import { EnterpriseProject } from './EnterpriseProject';
import { EnterpriseProjectApi } from './EnterpriseProjectApi';

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
export function changeEntProjElmntPosition<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ChangeEntProjElmntPositionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ChangeEntProjElmntPositionParameters<DeSerializersT>,
  EnterpriseProjectElement
> {
  const params = {
    projectElementUuid: new OperationParameter(
      'ProjectElementUUID',
      'Edm.Guid',
      parameters.projectElementUuid
    ),
    parentObjectUuid: new OperationParameter(
      'ParentObjectUUID',
      'Edm.Guid',
      parameters.parentObjectUuid
    ),
    leftSiblingUuid: new OperationParameter(
      'LeftSiblingUUID',
      'Edm.Guid',
      parameters.leftSiblingUuid
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002',
    'ChangeEntProjElmntPosition',
    data =>
      transformReturnValueForEntity(
        data,
        apiEnterpriseProject0002(deSerializers).enterpriseProjectElementApi
      ),
    params,
    deSerializers
  );
}

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
export function changeEntProjElmntProcgStatus<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ChangeEntProjElmntProcgStatusParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ChangeEntProjElmntProcgStatusParameters<DeSerializersT>,
  EnterpriseProjectElement
> {
  const params = {
    projectElementUuid: new OperationParameter(
      'ProjectElementUUID',
      'Edm.Guid',
      parameters.projectElementUuid
    ),
    processingStatus: new OperationParameter(
      'ProcessingStatus',
      'Edm.String',
      parameters.processingStatus
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002',
    'ChangeEntProjElmntProcgStatus',
    data =>
      transformReturnValueForEntity(
        data,
        apiEnterpriseProject0002(deSerializers).enterpriseProjectElementApi
      ),
    params,
    deSerializers
  );
}

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
export function changeEntProjProcgStatus<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ChangeEntProjProcgStatusParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ChangeEntProjProcgStatusParameters<DeSerializersT>,
  EnterpriseProject
> {
  const params = {
    projectUuid: new OperationParameter(
      'ProjectUUID',
      'Edm.Guid',
      parameters.projectUuid
    ),
    processingStatus: new OperationParameter(
      'ProcessingStatus',
      'Edm.String',
      parameters.processingStatus
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002',
    'ChangeEntProjProcgStatus',
    data =>
      transformReturnValueForEntity(
        data,
        apiEnterpriseProject0002(deSerializers).enterpriseProjectApi
      ),
    params,
    deSerializers
  );
}

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
export function copyToActiveDocument<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: CopyToActiveDocumentParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  CopyToActiveDocumentParameters<DeSerializersT>,
  EnterpriseProject
> {
  const params = {
    projectUuid: new OperationParameter(
      'ProjectUUID',
      'Edm.Guid',
      parameters.projectUuid
    ),
    entProjDemandCopyIsRequested: new OperationParameter(
      'EntProjDemandCopyIsRequested',
      'Edm.Boolean',
      parameters.entProjDemandCopyIsRequested
    ),
    entProjSettlmtRuleCpyIsReqd: new OperationParameter(
      'EntProjSettlmtRuleCpyIsReqd',
      'Edm.Boolean',
      parameters.entProjSettlmtRuleCpyIsReqd
    ),
    project: new OperationParameter(
      'Project',
      'Edm.String',
      parameters.project
    ),
    projectName: new OperationParameter(
      'ProjectName',
      'Edm.String',
      parameters.projectName
    ),
    projectStartDate: new OperationParameter(
      'ProjectStartDate',
      'Edm.DateTime',
      parameters.projectStartDate
    ),
    projectEndDate: new OperationParameter(
      'ProjectEndDate',
      'Edm.DateTime',
      parameters.projectEndDate
    ),
    customerUuid: new OperationParameter(
      'CustomerUUID',
      'Edm.Guid',
      parameters.customerUuid
    ),
    enterpriseProjectServiceOrg: new OperationParameter(
      'EnterpriseProjectServiceOrg',
      'Edm.String',
      parameters.enterpriseProjectServiceOrg
    ),
    responsibleCostCenter: new OperationParameter(
      'ResponsibleCostCenter',
      'Edm.String',
      parameters.responsibleCostCenter
    ),
    projectManagerUuid: new OperationParameter(
      'ProjectManagerUUID',
      'Edm.Guid',
      parameters.projectManagerUuid
    ),
    projectCurrency: new OperationParameter(
      'ProjectCurrency',
      'Edm.String',
      parameters.projectCurrency
    ),
    entProjectIsConfidential: new OperationParameter(
      'EntProjectIsConfidential',
      'Edm.Boolean',
      parameters.entProjectIsConfidential
    ),
    restrictedTimePosting: new OperationParameter(
      'RestrictedTimePosting',
      'Edm.String',
      parameters.restrictedTimePosting
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002',
    'CopyToActiveDocument',
    data =>
      transformReturnValueForEntity(
        data,
        apiEnterpriseProject0002(deSerializers).enterpriseProjectApi
      ),
    params,
    deSerializers
  );
}

export const operations = {
  changeEntProjElmntPosition,
  changeEntProjElmntProcgStatus,
  changeEntProjProcgStatus,
  copyToActiveDocument
};
