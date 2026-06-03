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
import type { EntProjectPublicSectorApi } from './EntProjectPublicSectorApi';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';

/**
 * This class represents the entity "A_EntProjectPublicSector" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export class EntProjectPublicSector<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjectPublicSectorType<T>
{
  /**
   * Technical entity name for EntProjectPublicSector.
   */
  static override _entityName = 'A_EntProjectPublicSector';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EntProjectPublicSector entity.
   */
  static _keys = ['ProjectUUID'];
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare functionalAreaIsFixAssignedFc?: DeserializedType<
    T,
    'Edm.Byte'
  > | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare fundFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare fundIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare grantIdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare grantIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare sponsoredProgramFc?: DeserializedType<T, 'Edm.Byte'> | null;
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
   * Fund.
   * Maximum length: 10.
   * @nullable
   */
  declare fund?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator for Fund with Fixed Assignment.
   * @nullable
   */
  declare fundIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Indicator for Functional Area with Fixed Assignment.
   * @nullable
   */
  declare functionalAreaIsFixAssigned?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Grant.
   * Maximum length: 20.
   * @nullable
   */
  declare grantId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator for Grant with Fixed Assignment.
   * @nullable
   */
  declare grantIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Sponsored Program.
   * Maximum length: 20.
   * @nullable
   */
  declare sponsoredProgram?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EntProjectPublicSectorApi<T>) {
    super(_entityApi);
  }
}

export interface EntProjectPublicSectorType<
  T extends DeSerializers = DefaultDeSerializers
> {
  functionalAreaIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  fundFc?: DeserializedType<T, 'Edm.Byte'> | null;
  fundIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  grantIdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  grantIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  sponsoredProgramFc?: DeserializedType<T, 'Edm.Byte'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectUuid: DeserializedType<T, 'Edm.Guid'>;
  fund?: DeserializedType<T, 'Edm.String'> | null;
  fundIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  functionalAreaIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  grantId?: DeserializedType<T, 'Edm.String'> | null;
  grantIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  sponsoredProgram?: DeserializedType<T, 'Edm.String'> | null;
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
