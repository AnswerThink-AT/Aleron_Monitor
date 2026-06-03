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
import type { EnterpriseProjectTeamMemberApi } from './EnterpriseProjectTeamMemberApi';
import {
  EntTeamMemberEntitlement,
  EntTeamMemberEntitlementType
} from './EntTeamMemberEntitlement';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';
/**
 * This class represents the entity "A_EnterpriseProjectTeamMember" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export declare class EnterpriseProjectTeamMember<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjectTeamMemberType<T>
{
  /**
   * Technical entity name for EnterpriseProjectTeamMember.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EnterpriseProjectTeamMember entity.
   */
  static _keys: string[];
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toEntProjEntitlementOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  teamMemberUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Business Partner GUID.
   * @nullable
   */
  businessPartnerUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
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
   * One-to-many navigation property to the {@link EntTeamMemberEntitlement} entity.
   */
  toEntProjEntitlement: EntTeamMemberEntitlement<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  toEnterpriseProject?: EnterpriseProject<T> | null;
  constructor(_entityApi: EnterpriseProjectTeamMemberApi<T>);
}
export interface EnterpriseProjectTeamMemberType<
  T extends DeSerializers = DefaultDeSerializers
> {
  toEntProjEntitlementOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  teamMemberUuid: DeserializedType<T, 'Edm.Guid'>;
  businessPartnerUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  toEntProjEntitlement: EntTeamMemberEntitlementType<T>[];
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
