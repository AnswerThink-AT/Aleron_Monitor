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
import type { EnterpriseProjBlkFuncApi } from './EnterpriseProjBlkFuncApi';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';

/**
 * This class represents the entity "A_EnterpriseProjBlkFunc" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export class EnterpriseProjBlkFunc<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjBlkFuncType<T>
{
  /**
   * Technical entity name for EnterpriseProjBlkFunc.
   */
  static override _entityName = 'A_EnterpriseProjBlkFunc';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EnterpriseProjBlkFunc entity.
   */
  static _keys = ['ProjectUUID'];
  /**
   * Dyn. Method Control.
   * @nullable
   */
  declare updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  declare projectUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  declare entProjTimeRecgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  declare entProjStaffExpensePostgIsBlkd?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  declare entProjServicePostingIsBlkd?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  declare entProjOtherExpensePostgIsBlkd?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  declare entProjPurchasingIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EnterpriseProjBlkFuncApi<T>) {
    super(_entityApi);
  }
}

export interface EnterpriseProjBlkFuncType<
  T extends DeSerializers = DefaultDeSerializers
> {
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectUuid: DeserializedType<T, 'Edm.Guid'>;
  entProjTimeRecgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjStaffExpensePostgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjServicePostingIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjOtherExpensePostgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjPurchasingIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
