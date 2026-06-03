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
import type { EntTeamMemberEntitlementApi } from './EntTeamMemberEntitlementApi';
import {
  EnterpriseProjectTeamMember,
  EnterpriseProjectTeamMemberType
} from './EnterpriseProjectTeamMember';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';
import {
  EnterpriseProjectRole,
  EnterpriseProjectRoleType
} from './EnterpriseProjectRole';
/**
 * This class represents the entity "A_EntTeamMemberEntitlement" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export declare class EntTeamMemberEntitlement<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntTeamMemberEntitlementType<T>
{
  /**
   * Technical entity name for EntTeamMemberEntitlement.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EntTeamMemberEntitlement entity.
   */
  static _keys: string[];
  /**
   * Dyn. Method Control.
   * @nullable
   */
  deleteMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dyn. Method Control.
   * @nullable
   */
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entitlement Guid.
   */
  projectEntitlementUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Project GUID.
   * @nullable
   */
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Role GUID.
   * @nullable
   */
  projectRoleUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Team Member GUID.
   * @nullable
   */
  teamMemberUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Role Type.
   * Maximum length: 15.
   * @nullable
   */
  projectRoleType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name of Person Who Created Object.
   * Maximum length: 12.
   * @nullable
   */
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Object Creation.
   * @nullable
   */
  creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Last Object Change.
   * @nullable
   */
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectTeamMember} entity.
   */
  toTeamMember?: EnterpriseProjectTeamMember<T> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  toEnterpriseProject?: EnterpriseProject<T> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectRole} entity.
   */
  toRole?: EnterpriseProjectRole<T> | null;
  constructor(_entityApi: EntTeamMemberEntitlementApi<T>);
}
export interface EntTeamMemberEntitlementType<
  T extends DeSerializers = DefaultDeSerializers
> {
  deleteMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectEntitlementUuid: DeserializedType<T, 'Edm.Guid'>;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectRoleUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  teamMemberUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectRoleType?: DeserializedType<T, 'Edm.String'> | null;
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  toTeamMember?: EnterpriseProjectTeamMemberType<T> | null;
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
  toRole?: EnterpriseProjectRoleType<T> | null;
}
