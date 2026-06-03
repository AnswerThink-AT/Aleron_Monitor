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
import type { EntProjectElmntPublicSectorApi } from './EntProjectElmntPublicSectorApi';
import {
  EnterpriseProjectElement,
  EnterpriseProjectElementType
} from './EnterpriseProjectElement';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';
/**
 * This class represents the entity "A_EntProjectElmntPublicSector" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export declare class EntProjectElmntPublicSector<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjectElmntPublicSectorType<T>
{
  /**
   * Technical entity name for EntProjectElmntPublicSector.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EntProjectElmntPublicSector entity.
   */
  static _keys: string[];
  /**
   * Dyn. Field Control.
   * @nullable
   */
  functionalAreaIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  fundFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  fundIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  grantIdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  grantIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  sponsoredProgramFc?: DeserializedType<T, 'Edm.Byte'> | null;
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
   * Fund.
   * Maximum length: 10.
   * @nullable
   */
  fund?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator for Fund with Fixed Assignment.
   * @nullable
   */
  fundIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Indicator for Functional Area with Fixed Assignment.
   * @nullable
   */
  functionalAreaIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Grant.
   * Maximum length: 20.
   * @nullable
   */
  grantId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator for Grant with Fixed Assignment.
   * @nullable
   */
  grantIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Sponsored Program.
   * Maximum length: 20.
   * @nullable
   */
  sponsoredProgram?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  toEnterpriseProjectElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  toEnterpriseProject?: EnterpriseProject<T> | null;
  constructor(_entityApi: EntProjectElmntPublicSectorApi<T>);
}
export interface EntProjectElmntPublicSectorType<
  T extends DeSerializers = DefaultDeSerializers
> {
  functionalAreaIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  fundFc?: DeserializedType<T, 'Edm.Byte'> | null;
  fundIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  grantIdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  grantIsFixAssignedFc?: DeserializedType<T, 'Edm.Byte'> | null;
  sponsoredProgramFc?: DeserializedType<T, 'Edm.Byte'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  fund?: DeserializedType<T, 'Edm.String'> | null;
  fundIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  functionalAreaIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  grantId?: DeserializedType<T, 'Edm.String'> | null;
  grantIsFixAssigned?: DeserializedType<T, 'Edm.Boolean'> | null;
  sponsoredProgram?: DeserializedType<T, 'Edm.String'> | null;
  toEnterpriseProjectElement?: EnterpriseProjectElementType<T> | null;
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
