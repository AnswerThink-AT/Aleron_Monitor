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
export class EntProjElmntDlvbrl<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements EntProjElmntDlvbrlType<T>
{
  /**
   * Technical entity name for EntProjElmntDlvbrl.
   */
  static override _entityName = 'A_EntProjElmntDlvbrl';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EntProjElmntDlvbrl entity.
   */
  static _keys = ['EntProjElmntDeliverableUUID'];
  /**
   * Dyn. Method Control.
   * @nullable
   */
  declare updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toEntProjElmntDlvDistrOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  declare entProjElmntDeliverableUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Entity Guid.
   * @nullable
   */
  declare projectElementUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  declare projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Type of a Project Element Deliverable.
   * Maximum length: 6.
   * @nullable
   */
  declare entProjElmntDeliverableType?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Total Quantity of a Project Element Deliverable.
   * @nullable
   */
  declare entProjElmntDlvbrlQuantity?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Unit of Measure for the Deliverable Quantity.
   * Maximum length: 3.
   * @nullable
   */
  declare entProjElmntDlvbrlQuantityUnit?: DeserializedType<
    T,
    'Edm.String'
  > | null;
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
   * Timestamp of Last Object Change.
   * @nullable
   */
  declare lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  declare lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  declare toEnterpriseProjectElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-many navigation property to the {@link EntProjElmntDlvbrlDistr} entity.
   */
  declare toEntProjElmntDlvDistr: EntProjElmntDlvbrlDistr<T>[];

  constructor(_entityApi: EntProjElmntDlvbrlApi<T>) {
    super(_entityApi);
  }
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
