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
import type { EntProjElmntDlvbrlDistrApi } from './EntProjElmntDlvbrlDistrApi';
import {
  EntProjElmntDlvbrl,
  EntProjElmntDlvbrlType
} from './EntProjElmntDlvbrl';

/**
 * This class represents the entity "A_EntProjElmntDlvbrlDistr" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export class EntProjElmntDlvbrlDistr<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjElmntDlvbrlDistrType<T>
{
  /**
   * Technical entity name for EntProjElmntDlvbrlDistr.
   */
  static override _entityName = 'A_EntProjElmntDlvbrlDistr';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EntProjElmntDlvbrlDistr entity.
   */
  static _keys = ['EntProjElmntDlvbrlDistrUUID'];
  /**
   * Dyn. Method Control.
   * @nullable
   */
  declare updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  declare entProjElmntDlvbrlDistrUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Entity Guid.
   * @nullable
   */
  declare entProjElmntDeliverableUuid?: DeserializedType<T, 'Edm.Guid'> | null;
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
   * Year of a Distribution Period for a Deliverable.
   * Maximum length: 4.
   * @nullable
   */
  declare entProjElmntDlvbrlDistrYearVal?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Period to Which a Deliverable Quantity is Distributed.
   * Maximum length: 3.
   * @nullable
   */
  declare entProjElmntDlvbrlDistrPerdVal?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Deliverable Quantity Planned for a Distribution Period.
   * @nullable
   */
  declare entProjElmntDlvbrlDistrQty?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Unit of Measure for the Distributed Deliverable Quantity.
   * Maximum length: 3.
   * @nullable
   */
  declare entProjElmntDlvbrlDistrQtyUnit?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * One-to-one navigation property to the {@link EntProjElmntDlvbrl} entity.
   */
  declare toEntProjElmntDlvbrl?: EntProjElmntDlvbrl<T> | null;

  constructor(_entityApi: EntProjElmntDlvbrlDistrApi<T>) {
    super(_entityApi);
  }
}

export interface EntProjElmntDlvbrlDistrType<
  T extends DeSerializers = DefaultDeSerializers
> {
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  entProjElmntDlvbrlDistrUuid: DeserializedType<T, 'Edm.Guid'>;
  entProjElmntDeliverableUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectElementUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  entProjElmntDlvbrlDistrYearVal?: DeserializedType<T, 'Edm.String'> | null;
  entProjElmntDlvbrlDistrPerdVal?: DeserializedType<T, 'Edm.String'> | null;
  entProjElmntDlvbrlDistrQty?: DeserializedType<T, 'Edm.Decimal'> | null;
  entProjElmntDlvbrlDistrQtyUnit?: DeserializedType<T, 'Edm.String'> | null;
  toEntProjElmntDlvbrl?: EntProjElmntDlvbrlType<T> | null;
}
