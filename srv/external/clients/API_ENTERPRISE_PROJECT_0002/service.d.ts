/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EnterpriseProjBlkFuncApi } from './EnterpriseProjBlkFuncApi';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
import { EnterpriseProjectJvaApi } from './EnterpriseProjectJvaApi';
import { EnterpriseProjectRoleApi } from './EnterpriseProjectRoleApi';
import { EnterpriseProjectTeamMemberApi } from './EnterpriseProjectTeamMemberApi';
import { EnterpriseProjectApi } from './EnterpriseProjectApi';
import { EntProjectElementJvaApi } from './EntProjectElementJvaApi';
import { EntProjectPublicSectorApi } from './EntProjectPublicSectorApi';
import { EntProjElmntBlockFuncApi } from './EntProjElmntBlockFuncApi';
import { EntProjElmntCnfgrdWrkItmTxtApi } from './EntProjElmntCnfgrdWrkItmTxtApi';
import { EntProjElmntDlvbrlApi } from './EntProjElmntDlvbrlApi';
import { EntProjElmntDlvbrlDistrApi } from './EntProjElmntDlvbrlDistrApi';
import { EntProjectElmntPublicSectorApi } from './EntProjectElmntPublicSectorApi';
import { EntProjElmntWorkItemApi } from './EntProjElmntWorkItemApi';
import { EntTeamMemberEntitlementApi } from './EntTeamMemberEntitlementApi';
import {
  ChangeEntProjElmntPositionParameters,
  ChangeEntProjElmntProcgStatusParameters,
  ChangeEntProjProcgStatusParameters,
  CopyToActiveDocumentParameters
} from './operations';
import { Moment } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v2';
import { batch, changeset } from './BatchRequest';
export declare function apiEnterpriseProject0002<
  BinaryT = string,
  BooleanT = boolean,
  ByteT = number,
  DecimalT = BigNumber,
  DoubleT = number,
  FloatT = number,
  Int16T = number,
  Int32T = number,
  Int64T = BigNumber,
  GuidT = string,
  SByteT = number,
  SingleT = number,
  StringT = string,
  AnyT = any,
  DateTimeOffsetT = Moment,
  DateTimeT = Moment,
  TimeT = Time
>(
  deSerializers?: Partial<
    DeSerializers<
      BinaryT,
      BooleanT,
      ByteT,
      DecimalT,
      DoubleT,
      FloatT,
      Int16T,
      Int32T,
      Int64T,
      GuidT,
      SByteT,
      SingleT,
      StringT,
      AnyT,
      DateTimeOffsetT,
      DateTimeT,
      TimeT
    >
  >
): ApiEnterpriseProject0002<
  DeSerializers<
    BinaryT,
    BooleanT,
    ByteT,
    DecimalT,
    DoubleT,
    FloatT,
    Int16T,
    Int32T,
    Int64T,
    GuidT,
    SByteT,
    SingleT,
    StringT,
    AnyT,
    DateTimeOffsetT,
    DateTimeT,
    TimeT
  >
>;
declare class ApiEnterpriseProject0002<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get enterpriseProjBlkFuncApi(): EnterpriseProjBlkFuncApi<DeSerializersT>;
  get enterpriseProjectElementApi(): EnterpriseProjectElementApi<DeSerializersT>;
  get enterpriseProjectJvaApi(): EnterpriseProjectJvaApi<DeSerializersT>;
  get enterpriseProjectRoleApi(): EnterpriseProjectRoleApi<DeSerializersT>;
  get enterpriseProjectTeamMemberApi(): EnterpriseProjectTeamMemberApi<DeSerializersT>;
  get enterpriseProjectApi(): EnterpriseProjectApi<DeSerializersT>;
  get entProjectElementJvaApi(): EntProjectElementJvaApi<DeSerializersT>;
  get entProjectPublicSectorApi(): EntProjectPublicSectorApi<DeSerializersT>;
  get entProjElmntBlockFuncApi(): EntProjElmntBlockFuncApi<DeSerializersT>;
  get entProjElmntCnfgrdWrkItmTxtApi(): EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT>;
  get entProjElmntDlvbrlApi(): EntProjElmntDlvbrlApi<DeSerializersT>;
  get entProjElmntDlvbrlDistrApi(): EntProjElmntDlvbrlDistrApi<DeSerializersT>;
  get entProjectElmntPublicSectorApi(): EntProjectElmntPublicSectorApi<DeSerializersT>;
  get entProjElmntWorkItemApi(): EntProjElmntWorkItemApi<DeSerializersT>;
  get entTeamMemberEntitlementApi(): EntTeamMemberEntitlementApi<DeSerializersT>;
  get operations(): {
    changeEntProjElmntPosition: (
      parameter: ChangeEntProjElmntPositionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').OperationRequestBuilder<
      DeSerializersT,
      ChangeEntProjElmntPositionParameters<DeSerializersT>,
      import('./EnterpriseProjectElement').EnterpriseProjectElement<DefaultDeSerializers>
    >;
    changeEntProjElmntProcgStatus: (
      parameter: ChangeEntProjElmntProcgStatusParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').OperationRequestBuilder<
      DeSerializersT,
      ChangeEntProjElmntProcgStatusParameters<DeSerializersT>,
      import('./EnterpriseProjectElement').EnterpriseProjectElement<DefaultDeSerializers>
    >;
    changeEntProjProcgStatus: (
      parameter: ChangeEntProjProcgStatusParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').OperationRequestBuilder<
      DeSerializersT,
      ChangeEntProjProcgStatusParameters<DeSerializersT>,
      import('./EnterpriseProject').EnterpriseProject<DefaultDeSerializers>
    >;
    copyToActiveDocument: (
      parameter: CopyToActiveDocumentParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').OperationRequestBuilder<
      DeSerializersT,
      CopyToActiveDocumentParameters<DeSerializersT>,
      import('./EnterpriseProject').EnterpriseProject<DefaultDeSerializers>
    >;
  };
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
