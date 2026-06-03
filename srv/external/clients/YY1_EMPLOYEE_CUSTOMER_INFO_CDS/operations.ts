/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import {
  transformReturnValueForEntity,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  OperationParameter,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { yy1EmployeeCustomerInfoCds } from './service';
import { Yy1_Employee_Customer_Info } from './Yy1_Employee_Customer_Info';
import { Yy1_Employee_Customer_InfoApi } from './Yy1_Employee_Customer_InfoApi';

/**
 * Type of the parameters to be passed to {@link yy1EmployeeCustomerInfoSapUpsert}.
 */
export interface Yy1EmployeeCustomerInfoSapUpsertParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Worker Id.
   */
  workerId?: string | null;
  /**
   * Name.
   */
  name?: string | null;
  /**
   * Ssn.
   */
  ssn?: string | null;
  /**
   * Emp Grp.
   */
  empGrp?: string | null;
  /**
   * Emp Subgrp.
   */
  empSubgrp?: string | null;
  /**
   * Start Date.
   */
  startDate?: Moment | null;
  /**
   * End Date.
   */
  endDate?: Moment | null;
  /**
   * Contrat Sap.
   */
  contratSap?: string | null;
  /**
   * Sales Ord Sap.
   */
  salesOrdSap?: string | null;
  /**
   * Project Id.
   */
  projectId?: string | null;
  /**
   * Project Name.
   */
  projectName?: string | null;
  /**
   * Customer Id.
   */
  customerId?: string | null;
  /**
   * Ss Order.
   */
  ssOrder?: string | null;
  /**
   * Wn Order.
   */
  wnOrder?: string | null;
  /**
   * Position Id.
   */
  positionId?: BigNumber | null;
  /**
   * Job Id.
   */
  jobId?: BigNumber | null;
  /**
   * Zpayroll.
   */
  zpayroll?: string | null;
  /**
   * Recrid.
   */
  recrid?: BigNumber | null;
  /**
   * Ztime Ind.
   */
  ztimeInd?: string | null;
  /**
   * Zhire Action.
   */
  zhireAction?: string | null;
  /**
   * Action Type.
   */
  actionType?: string | null;
  /**
   * T Reason.
   */
  tReason?: string | null;
  /**
   * Zhrrept.
   */
  zhrrept?: string | null;
}

/**
 * Yy 1 Employee Customer Info Sap Upsert.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function yy1EmployeeCustomerInfoSapUpsert<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: Yy1EmployeeCustomerInfoSapUpsertParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  Yy1EmployeeCustomerInfoSapUpsertParameters<DeSerializersT>,
  Yy1_Employee_Customer_Info
> {
  const params = {
    workerId: new OperationParameter(
      'WORKER_ID',
      'Edm.String',
      parameters.workerId
    ),
    name: new OperationParameter('Name', 'Edm.String', parameters.name),
    ssn: new OperationParameter('SSN', 'Edm.String', parameters.ssn),
    empGrp: new OperationParameter('EMP_GRP', 'Edm.String', parameters.empGrp),
    empSubgrp: new OperationParameter(
      'EMP_SUBGRP',
      'Edm.String',
      parameters.empSubgrp
    ),
    startDate: new OperationParameter(
      'START_DATE',
      'Edm.DateTime',
      parameters.startDate
    ),
    endDate: new OperationParameter(
      'END_DATE',
      'Edm.DateTime',
      parameters.endDate
    ),
    contratSap: new OperationParameter(
      'CONTRAT_SAP',
      'Edm.String',
      parameters.contratSap
    ),
    salesOrdSap: new OperationParameter(
      'SALES_ORD_SAP',
      'Edm.String',
      parameters.salesOrdSap
    ),
    projectId: new OperationParameter(
      'PROJECT_ID',
      'Edm.String',
      parameters.projectId
    ),
    projectName: new OperationParameter(
      'PROJECT_NAME',
      'Edm.String',
      parameters.projectName
    ),
    customerId: new OperationParameter(
      'CUSTOMER_ID',
      'Edm.String',
      parameters.customerId
    ),
    ssOrder: new OperationParameter(
      'SS_ORDER',
      'Edm.String',
      parameters.ssOrder
    ),
    wnOrder: new OperationParameter(
      'WN_ORDER',
      'Edm.String',
      parameters.wnOrder
    ),
    positionId: new OperationParameter(
      'POSITION_ID',
      'Edm.Decimal',
      parameters.positionId
    ),
    jobId: new OperationParameter('JOB_ID', 'Edm.Decimal', parameters.jobId),
    zpayroll: new OperationParameter(
      'ZPAYROLL',
      'Edm.String',
      parameters.zpayroll
    ),
    recrid: new OperationParameter('RECRID', 'Edm.Decimal', parameters.recrid),
    ztimeInd: new OperationParameter(
      'ZTIME_IND',
      'Edm.String',
      parameters.ztimeInd
    ),
    zhireAction: new OperationParameter(
      'ZHIRE_ACTION',
      'Edm.String',
      parameters.zhireAction
    ),
    actionType: new OperationParameter(
      'ACTION_TYPE',
      'Edm.String',
      parameters.actionType
    ),
    tReason: new OperationParameter(
      'T_REASON',
      'Edm.String',
      parameters.tReason
    ),
    zhrrept: new OperationParameter('ZHRREPT', 'Edm.String', parameters.zhrrept)
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/YY1_EMPLOYEE_CUSTOMER_INFO_CDS',
    'YY1_EMPLOYEE_CUSTOMER_INFOSap_upsert',
    data =>
      transformReturnValueForEntity(
        data,
        yy1EmployeeCustomerInfoCds(deSerializers).yy1_Employee_Customer_InfoApi
      ),
    params,
    deSerializers
  );
}

export const operations = {
  yy1EmployeeCustomerInfoSapUpsert
};
