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
import { Yy1_Employee_Customer_Info } from './Yy1_Employee_Customer_Info';
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
export declare function yy1EmployeeCustomerInfoSapUpsert<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: Yy1EmployeeCustomerInfoSapUpsertParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  Yy1EmployeeCustomerInfoSapUpsertParameters<DeSerializersT>,
  Yy1_Employee_Customer_Info
>;
export declare const operations: {
  yy1EmployeeCustomerInfoSapUpsert: typeof yy1EmployeeCustomerInfoSapUpsert;
};
