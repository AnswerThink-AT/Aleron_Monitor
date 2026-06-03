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
  changeEntProjElmntPosition,
  changeEntProjElmntProcgStatus,
  changeEntProjProcgStatus,
  copyToActiveDocument,
  ChangeEntProjElmntPositionParameters,
  ChangeEntProjElmntProcgStatusParameters,
  ChangeEntProjProcgStatusParameters,
  CopyToActiveDocumentParameters
} from './operations';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
import {
  defaultDeSerializers,
  DeSerializers,
  DefaultDeSerializers,
  mergeDefaultDeSerializersWith,
  Time
} from '@sap-cloud-sdk/odata-v2';
import { batch, changeset } from './BatchRequest';

export function apiEnterpriseProject0002<
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
  deSerializers: Partial<
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
  > = defaultDeSerializers as any
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
> {
  return new ApiEnterpriseProject0002(
    mergeDefaultDeSerializersWith(deSerializers)
  );
}
class ApiEnterpriseProject0002<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis: Record<string, any> = {};
  private deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT) {
    this.deSerializers = deSerializers;
  }

  private initApi(key: string, entityApi: any): any {
    if (!this.apis[key]) {
      this.apis[key] = entityApi._privateFactory(this.deSerializers);
    }
    return this.apis[key];
  }

  get enterpriseProjBlkFuncApi(): EnterpriseProjBlkFuncApi<DeSerializersT> {
    const api = this.initApi(
      'enterpriseProjBlkFuncApi',
      EnterpriseProjBlkFuncApi
    );
    const linkedApis = [
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get enterpriseProjectElementApi(): EnterpriseProjectElementApi<DeSerializersT> {
    const api = this.initApi(
      'enterpriseProjectElementApi',
      EnterpriseProjectElementApi
    );
    const linkedApis = [
      this.initApi('entProjectElementJvaApi', EntProjectElementJvaApi),
      this.initApi(
        'entProjectElmntPublicSectorApi',
        EntProjectElmntPublicSectorApi
      ),
      this.initApi('entProjElmntBlockFuncApi', EntProjElmntBlockFuncApi),
      this.initApi('entProjElmntDlvbrlApi', EntProjElmntDlvbrlApi),
      this.initApi('entProjElmntWorkItemApi', EntProjElmntWorkItemApi),
      this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi),
      this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi),
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get enterpriseProjectJvaApi(): EnterpriseProjectJvaApi<DeSerializersT> {
    const api = this.initApi(
      'enterpriseProjectJvaApi',
      EnterpriseProjectJvaApi
    );
    const linkedApis = [
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get enterpriseProjectRoleApi(): EnterpriseProjectRoleApi<DeSerializersT> {
    const api = this.initApi(
      'enterpriseProjectRoleApi',
      EnterpriseProjectRoleApi
    );
    const linkedApis = [
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get enterpriseProjectTeamMemberApi(): EnterpriseProjectTeamMemberApi<DeSerializersT> {
    const api = this.initApi(
      'enterpriseProjectTeamMemberApi',
      EnterpriseProjectTeamMemberApi
    );
    const linkedApis = [
      this.initApi('entTeamMemberEntitlementApi', EntTeamMemberEntitlementApi),
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get enterpriseProjectApi(): EnterpriseProjectApi<DeSerializersT> {
    const api = this.initApi('enterpriseProjectApi', EnterpriseProjectApi);
    const linkedApis = [
      this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi),
      this.initApi('enterpriseProjectJvaApi', EnterpriseProjectJvaApi),
      this.initApi('enterpriseProjBlkFuncApi', EnterpriseProjBlkFuncApi),
      this.initApi('entProjectPublicSectorApi', EntProjectPublicSectorApi),
      this.initApi('enterpriseProjectRoleApi', EnterpriseProjectRoleApi),
      this.initApi(
        'enterpriseProjectTeamMemberApi',
        EnterpriseProjectTeamMemberApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get entProjectElementJvaApi(): EntProjectElementJvaApi<DeSerializersT> {
    const api = this.initApi(
      'entProjectElementJvaApi',
      EntProjectElementJvaApi
    );
    const linkedApis = [
      this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi),
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get entProjectPublicSectorApi(): EntProjectPublicSectorApi<DeSerializersT> {
    const api = this.initApi(
      'entProjectPublicSectorApi',
      EntProjectPublicSectorApi
    );
    const linkedApis = [
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get entProjElmntBlockFuncApi(): EntProjElmntBlockFuncApi<DeSerializersT> {
    const api = this.initApi(
      'entProjElmntBlockFuncApi',
      EntProjElmntBlockFuncApi
    );
    const linkedApis = [
      this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi),
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get entProjElmntCnfgrdWrkItmTxtApi(): EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT> {
    return this.initApi(
      'entProjElmntCnfgrdWrkItmTxtApi',
      EntProjElmntCnfgrdWrkItmTxtApi
    );
  }

  get entProjElmntDlvbrlApi(): EntProjElmntDlvbrlApi<DeSerializersT> {
    const api = this.initApi('entProjElmntDlvbrlApi', EntProjElmntDlvbrlApi);
    const linkedApis = [
      this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi),
      this.initApi('entProjElmntDlvbrlDistrApi', EntProjElmntDlvbrlDistrApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get entProjElmntDlvbrlDistrApi(): EntProjElmntDlvbrlDistrApi<DeSerializersT> {
    const api = this.initApi(
      'entProjElmntDlvbrlDistrApi',
      EntProjElmntDlvbrlDistrApi
    );
    const linkedApis = [
      this.initApi('entProjElmntDlvbrlApi', EntProjElmntDlvbrlApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get entProjectElmntPublicSectorApi(): EntProjectElmntPublicSectorApi<DeSerializersT> {
    const api = this.initApi(
      'entProjectElmntPublicSectorApi',
      EntProjectElmntPublicSectorApi
    );
    const linkedApis = [
      this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi),
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get entProjElmntWorkItemApi(): EntProjElmntWorkItemApi<DeSerializersT> {
    const api = this.initApi(
      'entProjElmntWorkItemApi',
      EntProjElmntWorkItemApi
    );
    const linkedApis = [
      this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi),
      this.initApi(
        'entProjElmntCnfgrdWrkItmTxtApi',
        EntProjElmntCnfgrdWrkItmTxtApi
      ),
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get entTeamMemberEntitlementApi(): EntTeamMemberEntitlementApi<DeSerializersT> {
    const api = this.initApi(
      'entTeamMemberEntitlementApi',
      EntTeamMemberEntitlementApi
    );
    const linkedApis = [
      this.initApi(
        'enterpriseProjectTeamMemberApi',
        EnterpriseProjectTeamMemberApi
      ),
      this.initApi('enterpriseProjectApi', EnterpriseProjectApi),
      this.initApi('enterpriseProjectRoleApi', EnterpriseProjectRoleApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get operations() {
    return {
      changeEntProjElmntPosition: (
        parameter: ChangeEntProjElmntPositionParameters<DeSerializersT>
      ) => changeEntProjElmntPosition(parameter, this.deSerializers),
      changeEntProjElmntProcgStatus: (
        parameter: ChangeEntProjElmntProcgStatusParameters<DeSerializersT>
      ) => changeEntProjElmntProcgStatus(parameter, this.deSerializers),
      changeEntProjProcgStatus: (
        parameter: ChangeEntProjProcgStatusParameters<DeSerializersT>
      ) => changeEntProjProcgStatus(parameter, this.deSerializers),
      copyToActiveDocument: (
        parameter: CopyToActiveDocumentParameters<DeSerializersT>
      ) => copyToActiveDocument(parameter, this.deSerializers)
    };
  }

  get batch(): typeof batch {
    return batch;
  }

  get changeset(): typeof changeset {
    return changeset;
  }
}
