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
import type { EnterpriseProjectJvaApi } from './EnterpriseProjectJvaApi';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';
/**
 * This class represents the entity "A_EnterpriseProjectJVA" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export declare class EnterpriseProjectJva<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjectJvaType<T>
{
  /**
   * Technical entity name for EnterpriseProjectJva.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EnterpriseProjectJva entity.
   */
  static _keys: string[];
  /**
   * Dyn. Field Control.
   * @nullable
   */
  jntIntrstBillgClassFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  jntIntrstBillgSubClassFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  jntVntrProjectTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  jointVentureFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  jointVentureCostRecoveryCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  jointVentureEquityTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
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
   * Joint Venture.
   * Maximum length: 6.
   * @nullable
   */
  jointVenture?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Recovery Indicator.
   * Maximum length: 2.
   * @nullable
   */
  jointVentureCostRecoveryCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Equity Type.
   * Maximum length: 3.
   * @nullable
   */
  jointVentureEquityType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Joint Venture Object Type.
   * Maximum length: 4.
   * @nullable
   */
  jntVntrProjectType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * JIB/JIBE Class.
   * Maximum length: 3.
   * @nullable
   */
  jntIntrstBillgClass?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * JIB/JIBE Subclass A.
   * Maximum length: 5.
   * @nullable
   */
  jntIntrstBillgSubClass?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  toEnterpriseProject?: EnterpriseProject<T> | null;
  constructor(_entityApi: EnterpriseProjectJvaApi<T>);
}
export interface EnterpriseProjectJvaType<
  T extends DeSerializers = DefaultDeSerializers
> {
  jntIntrstBillgClassFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jntIntrstBillgSubClassFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jntVntrProjectTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jointVentureFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jointVentureCostRecoveryCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jointVentureEquityTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectUuid: DeserializedType<T, 'Edm.Guid'>;
  jointVenture?: DeserializedType<T, 'Edm.String'> | null;
  jointVentureCostRecoveryCode?: DeserializedType<T, 'Edm.String'> | null;
  jointVentureEquityType?: DeserializedType<T, 'Edm.String'> | null;
  jntVntrProjectType?: DeserializedType<T, 'Edm.String'> | null;
  jntIntrstBillgClass?: DeserializedType<T, 'Edm.String'> | null;
  jntIntrstBillgSubClass?: DeserializedType<T, 'Edm.String'> | null;
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
