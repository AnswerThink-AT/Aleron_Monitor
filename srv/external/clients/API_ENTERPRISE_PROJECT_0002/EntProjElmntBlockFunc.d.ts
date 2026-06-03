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
import type { EntProjElmntBlockFuncApi } from './EntProjElmntBlockFuncApi';
import {
  EnterpriseProjectElement,
  EnterpriseProjectElementType
} from './EnterpriseProjectElement';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';
/**
 * This class represents the entity "A_EntProjElmntBlockFunc" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export declare class EntProjElmntBlockFunc<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjElmntBlockFuncType<T>
{
  /**
   * Technical entity name for EntProjElmntBlockFunc.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EntProjElmntBlockFunc entity.
   */
  static _keys: string[];
  /**
   * Dyn. Field Control.
   * @nullable
   */
  entProjOtherExpensePostgIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  entProjPurchasingIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  entProjServicePostingIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  entProjStaffExpensePostgIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  entProjTimeRecgIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Method Control.
   * @nullable
   */
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Entity Guid.
   * @nullable
   */
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
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
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  toEnterpriseProjectElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  toEnterpriseProject?: EnterpriseProject<T> | null;
  constructor(_entityApi: EntProjElmntBlockFuncApi<T>);
}
export interface EntProjElmntBlockFuncType<
  T extends DeSerializers = DefaultDeSerializers
> {
  entProjOtherExpensePostgIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  entProjPurchasingIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  entProjServicePostingIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  entProjStaffExpensePostgIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  entProjTimeRecgIsBlkdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  entProjTimeRecgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjStaffExpensePostgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjServicePostingIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjOtherExpensePostgIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjPurchasingIsBlkd?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEnterpriseProjectElement?: EnterpriseProjectElementType<T> | null;
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
