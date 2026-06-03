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
import type { EntProjElmntDlvbrlApi } from './EntProjElmntDlvbrlApi';
import {
  EnterpriseProjectElement,
  EnterpriseProjectElementType
} from './EnterpriseProjectElement';
import {
  EntProjElmntDlvbrlDistr,
  EntProjElmntDlvbrlDistrType
} from './EntProjElmntDlvbrlDistr';
/**
 * This class represents the entity "A_EntProjElmntDlvbrl" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export declare class EntProjElmntDlvbrl<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjElmntDlvbrlType<T>
{
  /**
   * Technical entity name for EntProjElmntDlvbrl.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EntProjElmntDlvbrl entity.
   */
  static _keys: string[];
  /**
   * Dyn. Method Control.
   * @nullable
   */
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toEntProjElmntDlvDistrOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  entProjElmntDeliverableUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Entity Guid.
   * @nullable
   */
  projectElementUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Type of a Project Element Deliverable.
   * Maximum length: 6.
   * @nullable
   */
  entProjElmntDeliverableType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Total Quantity of a Project Element Deliverable.
   * @nullable
   */
  entProjElmntDlvbrlQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Unit of Measure for the Deliverable Quantity.
   * Maximum length: 3.
   * @nullable
   */
  entProjElmntDlvbrlQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
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
   * Timestamp of Last Object Change.
   * @nullable
   */
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  toEnterpriseProjectElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-many navigation property to the {@link EntProjElmntDlvbrlDistr} entity.
   */
  toEntProjElmntDlvDistr: EntProjElmntDlvbrlDistr<T>[];
  constructor(_entityApi: EntProjElmntDlvbrlApi<T>);
}
export interface EntProjElmntDlvbrlType<
  T extends DeSerializers = DefaultDeSerializers
> {
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEntProjElmntDlvDistrOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjElmntDeliverableUuid: DeserializedType<T, 'Edm.Guid'>;
  projectElementUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  entProjElmntDeliverableType?: DeserializedType<T, 'Edm.String'> | null;
  entProjElmntDlvbrlQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  entProjElmntDlvbrlQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  toEnterpriseProjectElement?: EnterpriseProjectElementType<T> | null;
  toEntProjElmntDlvDistr: EntProjElmntDlvbrlDistrType<T>[];
}
