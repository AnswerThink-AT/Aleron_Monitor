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
import type { EntProjElmntWorkItemApi } from './EntProjElmntWorkItemApi';
import {
  EnterpriseProjectElement,
  EnterpriseProjectElementType
} from './EnterpriseProjectElement';
import {
  EntProjElmntCnfgrdWrkItmTxt,
  EntProjElmntCnfgrdWrkItmTxtType
} from './EntProjElmntCnfgrdWrkItmTxt';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';

/**
 * This class represents the entity "A_EntProjElmntWorkItem" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export class EntProjElmntWorkItem<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjElmntWorkItemType<T>
{
  /**
   * Technical entity name for EntProjElmntWorkItem.
   */
  static override _entityName = 'A_EntProjElmntWorkItem';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EntProjElmntWorkItem entity.
   */
  static _keys = ['EntProjElmntWorkItemUUID'];
  /**
   * Dyn. Method Control.
   * @nullable
   */
  declare deleteMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dyn. Method Control.
   * @nullable
   */
  declare updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  declare entProjElmntWorkItemUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Enterprise Project Element Work Item.
   * Maximum length: 10.
   */
  declare entProjElmntWorkItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Enterprise Project Element Work Item Name.
   * Maximum length: 40.
   * @nullable
   */
  declare entProjElmntWorkItemName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Enterprise Project Element Work Item is Inactive.
   * @nullable
   */
  declare entProjElmntWorkItemIsInactive?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Enterprise Project Element Work Item is Configured.
   * @nullable
   */
  declare entProjElmntWorkItemIsCnfgrd?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Entity Guid.
   * @nullable
   */
  declare projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  declare projectElementUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Enterprise Project Element Work Item - Source of Update.
   * Maximum length: 1.
   * @nullable
   */
  declare entProjElmntWrkItmLastUpdtSrce?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Name of Person Who Created Object.
   * Maximum length: 12.
   * @nullable
   */
  declare entProjElmntWrkItmCrtedByUsr?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Timestamp of Object Creation.
   * @nullable
   */
  declare entProjElmntWrkItmCrtnDteTme?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  declare entProjElmntWrkItmLstChgByUsr?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Timestamp of Last Object Change.
   * @nullable
   */
  declare entProjElmntWrkItmLstChgDteTme?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  declare toEnterpriseProjectElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-many navigation property to the {@link EntProjElmntCnfgrdWrkItmTxt} entity.
   */
  declare toConfiguredWorkItemText: EntProjElmntCnfgrdWrkItmTxt<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EntProjElmntWorkItemApi<T>) {
    super(_entityApi);
  }
}

export interface EntProjElmntWorkItemType<
  T extends DeSerializers = DefaultDeSerializers
> {
  deleteMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjElmntWorkItemUuid: DeserializedType<T, 'Edm.Guid'>;
  entProjElmntWorkItem: DeserializedType<T, 'Edm.String'>;
  entProjElmntWorkItemName?: DeserializedType<T, 'Edm.String'> | null;
  entProjElmntWorkItemIsInactive?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjElmntWorkItemIsCnfgrd?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectElementUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  entProjElmntWrkItmLastUpdtSrce?: DeserializedType<T, 'Edm.String'> | null;
  entProjElmntWrkItmCrtedByUsr?: DeserializedType<T, 'Edm.String'> | null;
  entProjElmntWrkItmCrtnDteTme?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  entProjElmntWrkItmLstChgByUsr?: DeserializedType<T, 'Edm.String'> | null;
  entProjElmntWrkItmLstChgDteTme?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  toEnterpriseProjectElement?: EnterpriseProjectElementType<T> | null;
  toConfiguredWorkItemText: EntProjElmntCnfgrdWrkItmTxtType<T>[];
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
