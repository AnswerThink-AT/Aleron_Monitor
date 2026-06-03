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
import type { EntProjectElementJvaApi } from './EntProjectElementJvaApi';
import {
  EnterpriseProjectElement,
  EnterpriseProjectElementType
} from './EnterpriseProjectElement';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';

/**
 * This class represents the entity "A_EntProjectElementJVA" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export class EntProjectElementJva<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjectElementJvaType<T>
{
  /**
   * Technical entity name for EntProjectElementJva.
   */
  static override _entityName = 'A_EntProjectElementJVA';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EntProjectElementJva entity.
   */
  static _keys = ['ProjectElementUUID'];
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
  declare projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Entity Guid.
   * @nullable
   */
  declare projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
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
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  declare toEnterpriseProjectElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EntProjectElementJvaApi<T>) {
    super(_entityApi);
  }
}

export interface EntProjectElementJvaType<
  T extends DeSerializers = DefaultDeSerializers
> {
  jntIntrstBillgClassFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jntIntrstBillgSubClassFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jntVntrProjectTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jointVentureFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jointVentureCostRecoveryCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  jointVentureEquityTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  jointVenture?: DeserializedType<T, 'Edm.String'> | null;
  jointVentureCostRecoveryCode?: DeserializedType<T, 'Edm.String'> | null;
  jointVentureEquityType?: DeserializedType<T, 'Edm.String'> | null;
  jntVntrProjectType?: DeserializedType<T, 'Edm.String'> | null;
  jntIntrstBillgClass?: DeserializedType<T, 'Edm.String'> | null;
  jntIntrstBillgSubClass?: DeserializedType<T, 'Edm.String'> | null;
  toEnterpriseProjectElement?: EnterpriseProjectElementType<T> | null;
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
