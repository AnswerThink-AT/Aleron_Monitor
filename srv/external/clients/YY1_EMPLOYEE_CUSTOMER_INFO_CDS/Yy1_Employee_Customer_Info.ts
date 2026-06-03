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
export class Yy1_Employee_Customer_Info<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements Yy1_Employee_Customer_InfoType<T>
{
  /**
   * Technical entity name for Yy1_Employee_Customer_Info.
   */
  static override _entityName = 'YY1_EMPLOYEE_CUSTOMER_INFO';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/YY1_EMPLOYEE_CUSTOMER_INFO_CDS';
  /**
   * All key fields of the Yy1_Employee_Customer_Info entity.
   */
  static _keys = ['SAP_UUID'];
  /**
   * 16 Byte UUID in 16 Bytes (Raw Format).
   */
  declare sapUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Text of length 15.
   * Maximum length: 15.
   * @nullable
   */
  declare workerId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Employee Name.
   * Maximum length: 50.
   * @nullable
   */
  declare name?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Social Security Number.
   * Maximum length: 15.
   * @nullable
   */
  declare ssn?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Employee Group.
   * Maximum length: 1.
   * @nullable
   */
  declare empGrp?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Employee Subgroup.
   * Maximum length: 2.
   * @nullable
   */
  declare empSubgrp?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Start Date.
   * @nullable
   */
  declare startDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * End Date.
   * @nullable
   */
  declare endDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Contract Number.
   * Maximum length: 15.
   * @nullable
   */
  declare contratSap?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales Order Number.
   * Maximum length: 15.
   * @nullable
   */
  declare salesOrdSap?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project ID.
   * Maximum length: 15.
   * @nullable
   */
  declare projectId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project Name.
   * Maximum length: 30.
   * @nullable
   */
  declare projectName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Number.
   * Maximum length: 10.
   * @nullable
   */
  declare customerId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * SS Sales Document.
   * Maximum length: 10.
   * @nullable
   */
  declare ssOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * WN Sales Document.
   * Maximum length: 10.
   * @nullable
   */
  declare wnOrder?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Position.
   * @nullable
   */
  declare positionId?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Job.
   * @nullable
   */
  declare jobId?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Payroll or Recruited.
   * Maximum length: 10.
   * @nullable
   */
  declare zpayroll?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Recruiter ID.
   * @nullable
   */
  declare recrid?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Work Nexus Time Indicator.
   * Maximum length: 3.
   * @nullable
   */
  declare ztimeInd?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Cust Hire Act.
   * Maximum length: 3.
   * @nullable
   */
  declare zhireAction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Custom Actions for inf. 9001.
   * Maximum length: 2.
   * @nullable
   */
  declare actionType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Termination Reason.
   * Maximum length: 2.
   * @nullable
   */
  declare tReason?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * HR Report.
   * Maximum length: 3.
   * @nullable
   */
  declare zhrrept?: DeserializedType<T, 'Edm.String'> | null;

  constructor(_entityApi: Yy1_Employee_Customer_InfoApi<T>) {
    super(_entityApi);
  }
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
