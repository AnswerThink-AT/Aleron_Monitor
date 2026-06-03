/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v2';
import type { Yy1_Employee_Customer_InfoApi } from './Yy1_Employee_Customer_InfoApi';
/**
 * This class represents the entity "YY1_EMPLOYEE_CUSTOMER_INFO" of service "YY1_EMPLOYEE_CUSTOMER_INFO_CDS".
 */
export declare class Yy1_Employee_Customer_Info<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements Yy1_Employee_Customer_InfoType<T>
{
  /**
   * Technical entity name for Yy1_Employee_Customer_Info.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the Yy1_Employee_Customer_Info entity.
   */
  static _keys: string[];
  /**
   * 16 Byte UUID in 16 Bytes (Raw Format).
   */
  sapUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Text of length 15.
   * Maximum length: 15.
   * @nullable
   */
  workerId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Employee Name.
   * Maximum length: 50.
   * @nullable
   */
  name?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Social Security Number.
   * Maximum length: 15.
   * @nullable
   */
  ssn?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Employee Group.
   * Maximum length: 1.
   * @nullable
   */
  empGrp?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Employee Subgroup.
   * Maximum length: 2.
   * @nullable
   */
  empSubgrp?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Start Date.
   * @nullable
   */
  startDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * End Date.
   * @nullable
   */
  endDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Contract Number.
   * Maximum length: 15.
   * @nullable
   */
  contratSap?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales Order Number.
   * Maximum length: 15.
   * @nullable
   */
  salesOrdSap?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project ID.
   * Maximum length: 15.
   * @nullable
   */
  projectId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project Name.
   * Maximum length: 30.
   * @nullable
   */
  projectName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Number.
   * Maximum length: 10.
   * @nullable
   */
  customerId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * SS Sales Document.
   * Maximum length: 10.
   * @nullable
   */
  ssOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * WN Sales Document.
   * Maximum length: 10.
   * @nullable
   */
  wnOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Position.
   * @nullable
   */
  positionId?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Job.
   * @nullable
   */
  jobId?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Payroll or Recruited.
   * Maximum length: 10.
   * @nullable
   */
  zpayroll?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Recruiter ID.
   * @nullable
   */
  recrid?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Work Nexus Time Indicator.
   * Maximum length: 3.
   * @nullable
   */
  ztimeInd?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Cust Hire Act.
   * Maximum length: 3.
   * @nullable
   */
  zhireAction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Custom Actions for inf. 9001.
   * Maximum length: 2.
   * @nullable
   */
  actionType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Termination Reason.
   * Maximum length: 2.
   * @nullable
   */
  tReason?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * HR Report.
   * Maximum length: 3.
   * @nullable
   */
  zhrrept?: DeserializedType<T, 'Edm.String'> | null;
  constructor(_entityApi: Yy1_Employee_Customer_InfoApi<T>);
}
export interface Yy1_Employee_Customer_InfoType<
  T extends DeSerializers = DefaultDeSerializers
> {
  sapUuid: DeserializedType<T, 'Edm.Guid'>;
  workerId?: DeserializedType<T, 'Edm.String'> | null;
  name?: DeserializedType<T, 'Edm.String'> | null;
  ssn?: DeserializedType<T, 'Edm.String'> | null;
  empGrp?: DeserializedType<T, 'Edm.String'> | null;
  empSubgrp?: DeserializedType<T, 'Edm.String'> | null;
  startDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  endDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  contratSap?: DeserializedType<T, 'Edm.String'> | null;
  salesOrdSap?: DeserializedType<T, 'Edm.String'> | null;
  projectId?: DeserializedType<T, 'Edm.String'> | null;
  projectName?: DeserializedType<T, 'Edm.String'> | null;
  customerId?: DeserializedType<T, 'Edm.String'> | null;
  ssOrder?: DeserializedType<T, 'Edm.String'> | null;
  wnOrder?: DeserializedType<T, 'Edm.String'> | null;
  positionId?: DeserializedType<T, 'Edm.Decimal'> | null;
  jobId?: DeserializedType<T, 'Edm.Decimal'> | null;
  zpayroll?: DeserializedType<T, 'Edm.String'> | null;
  recrid?: DeserializedType<T, 'Edm.Decimal'> | null;
  ztimeInd?: DeserializedType<T, 'Edm.String'> | null;
  zhireAction?: DeserializedType<T, 'Edm.String'> | null;
  actionType?: DeserializedType<T, 'Edm.String'> | null;
  tReason?: DeserializedType<T, 'Edm.String'> | null;
  zhrrept?: DeserializedType<T, 'Edm.String'> | null;
}
