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
export class EntProjectElmntPublicSector<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjectElmntPublicSectorType<T>
{
  /**
   * Technical entity name for EntProjectElmntPublicSector.
   */
  static override _entityName = 'A_EntProjectElmntPublicSector';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EntProjectElmntPublicSector entity.
   */
  static _keys = ['ProjectElementUUID'];
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
  declare projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Entity Guid.
   * @nullable
   */
  declare projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
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
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  declare toEnterpriseProjectElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EntProjectElmntPublicSectorApi<T>) {
    super(_entityApi);
  }
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
