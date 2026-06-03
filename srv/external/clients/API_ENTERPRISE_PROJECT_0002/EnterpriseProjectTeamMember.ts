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
export class EnterpriseProjectTeamMember<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjectTeamMemberType<T>
{
  /**
   * Technical entity name for EnterpriseProjectTeamMember.
   */
  static override _entityName = 'A_EnterpriseProjectTeamMember';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EnterpriseProjectTeamMember entity.
   */
  static _keys = ['TeamMemberUUID'];
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toEntProjEntitlementOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  declare teamMemberUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Business Partner GUID.
   * @nullable
   */
  declare businessPartnerUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  declare projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
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
   * One-to-many navigation property to the {@link EntTeamMemberEntitlement} entity.
   */
  declare toEntProjEntitlement: EntTeamMemberEntitlement<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EnterpriseProjectTeamMemberApi<T>) {
    super(_entityApi);
  }
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
