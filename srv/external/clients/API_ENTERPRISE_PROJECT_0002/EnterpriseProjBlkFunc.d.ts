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
export declare class EnterpriseProjBlkFunc<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjBlkFuncType<T>
{
  /**
   * Technical entity name for EnterpriseProjBlkFunc.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EnterpriseProjBlkFunc entity.
   */
  static _keys: string[];
  /**
   * Dyn. Method Control.
   * @nullable
   */
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  projectUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  entProjTimeRecgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  entProjStaffExpensePostgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  entProjServicePostingIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  entProjOtherExpensePostgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Boolean Variable (X = True, - = False, Space = Unknown).
   * @nullable
   */
  entProjPurchasingIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  toEnterpriseProject?: EnterpriseProject<T> | null;
  constructor(_entityApi: EnterpriseProjBlkFuncApi<T>);
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
