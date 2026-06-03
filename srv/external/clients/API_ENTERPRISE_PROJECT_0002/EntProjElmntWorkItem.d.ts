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
export declare class EntProjElmntWorkItem<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjElmntWorkItemType<T>
{
  /**
   * Technical entity name for EntProjElmntWorkItem.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EntProjElmntWorkItem entity.
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
   * Entity Guid.
   */
  entProjElmntWorkItemUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Enterprise Project Element Work Item.
   * Maximum length: 10.
   */
  entProjElmntWorkItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Enterprise Project Element Work Item Name.
   * Maximum length: 40.
   * @nullable
   */
  entProjElmntWorkItemName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Enterprise Project Element Work Item is Inactive.
   * @nullable
   */
  entProjElmntWorkItemIsInactive?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Enterprise Project Element Work Item is Configured.
   * @nullable
   */
  entProjElmntWorkItemIsCnfgrd?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  projectElementUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Enterprise Project Element Work Item - Source of Update.
   * Maximum length: 1.
   * @nullable
   */
  entProjElmntWrkItmLastUpdtSrce?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name of Person Who Created Object.
   * Maximum length: 12.
   * @nullable
   */
  entProjElmntWrkItmCrtedByUsr?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Object Creation.
   * @nullable
   */
  entProjElmntWrkItmCrtnDteTme?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  entProjElmntWrkItmLstChgByUsr?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Last Object Change.
   * @nullable
   */
  entProjElmntWrkItmLstChgDteTme?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  toEnterpriseProjectElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-many navigation property to the {@link EntProjElmntCnfgrdWrkItmTxt} entity.
   */
  toConfiguredWorkItemText: EntProjElmntCnfgrdWrkItmTxt<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  toEnterpriseProject?: EnterpriseProject<T> | null;
  constructor(_entityApi: EntProjElmntWorkItemApi<T>);
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
