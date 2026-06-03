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
import type { EnterpriseProjectRoleApi } from './EnterpriseProjectRoleApi';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';

/**
 * This class represents the entity "A_EnterpriseProjectRole" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export class EnterpriseProjectRole<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjectRoleType<T>
{
  /**
   * Technical entity name for EnterpriseProjectRole.
   */
  static override _entityName = 'A_EnterpriseProjectRole';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EnterpriseProjectRole entity.
   */
  static _keys = ['ProjectRoleUUID'];
  /**
   * Role GUID.
   */
  declare projectRoleUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Project GUID.
   * @nullable
   */
  declare projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Role Type.
   * Maximum length: 15.
   * @nullable
   */
  declare projectRoleType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Role Category.
   * Maximum length: 3.
   * @nullable
   */
  declare projectRoleCategory?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Role Name.
   * Maximum length: 40.
   * @nullable
   */
  declare projectRoleName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name of Person Who Created Object.
   * Maximum length: 12.
   * @nullable
   */
  declare createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Object Creation.
   * @nullable
   */
  declare creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  declare lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Last Object Change.
   * @nullable
   */
  declare lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EnterpriseProjectRoleApi<T>) {
    super(_entityApi);
  }
}

export interface EnterpriseProjectRoleType<
  T extends DeSerializers = DefaultDeSerializers
> {
  projectRoleUuid: DeserializedType<T, 'Edm.Guid'>;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectRoleType?: DeserializedType<T, 'Edm.String'> | null;
  projectRoleCategory?: DeserializedType<T, 'Edm.String'> | null;
  projectRoleName?: DeserializedType<T, 'Edm.String'> | null;
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
