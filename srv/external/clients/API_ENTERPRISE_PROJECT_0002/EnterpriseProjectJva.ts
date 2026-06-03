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
export class EnterpriseProjectJva<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjectJvaType<T>
{
  /**
   * Technical entity name for EnterpriseProjectJva.
   */
  static override _entityName = 'A_EnterpriseProjectJVA';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EnterpriseProjectJva entity.
   */
  static _keys = ['ProjectUUID'];
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare jntIntrstBillgClassFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare jntIntrstBillgSubClassFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare jntVntrProjectTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare jointVentureFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare jointVentureCostRecoveryCodeFc?: DeserializedType<
    T,
    'Edm.Byte'
  > | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare jointVentureEquityTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
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
   * Joint Venture.
   * Maximum length: 6.
   * @nullable
   */
  declare jointVenture?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Recovery Indicator.
   * Maximum length: 2.
   * @nullable
   */
  declare jointVentureCostRecoveryCode?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Equity Type.
   * Maximum length: 3.
   * @nullable
   */
  declare jointVentureEquityType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Joint Venture Object Type.
   * Maximum length: 4.
   * @nullable
   */
  declare jntVntrProjectType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * JIB/JIBE Class.
   * Maximum length: 3.
   * @nullable
   */
  declare jntIntrstBillgClass?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * JIB/JIBE Subclass A.
   * Maximum length: 5.
   * @nullable
   */
  declare jntIntrstBillgSubClass?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EnterpriseProjectJvaApi<T>) {
    super(_entityApi);
  }
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
