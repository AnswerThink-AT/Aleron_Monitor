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
export declare class EntProjElmntDlvbrlDistr<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjElmntDlvbrlDistrType<T>
{
  /**
   * Technical entity name for EntProjElmntDlvbrlDistr.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EntProjElmntDlvbrlDistr entity.
   */
  static _keys: string[];
  /**
   * Dyn. Method Control.
   * @nullable
   */
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  entProjElmntDlvbrlDistrUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Entity Guid.
   * @nullable
   */
  entProjElmntDeliverableUuid?: DeserializedType<T, 'Edm.Guid'> | null;
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
   * Year of a Distribution Period for a Deliverable.
   * Maximum length: 4.
   * @nullable
   */
  entProjElmntDlvbrlDistrYearVal?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Period to Which a Deliverable Quantity is Distributed.
   * Maximum length: 3.
   * @nullable
   */
  entProjElmntDlvbrlDistrPerdVal?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Deliverable Quantity Planned for a Distribution Period.
   * @nullable
   */
  entProjElmntDlvbrlDistrQty?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Unit of Measure for the Distributed Deliverable Quantity.
   * Maximum length: 3.
   * @nullable
   */
  entProjElmntDlvbrlDistrQtyUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EntProjElmntDlvbrl} entity.
   */
  toEntProjElmntDlvbrl?: EntProjElmntDlvbrl<T> | null;
  constructor(_entityApi: EntProjElmntDlvbrlDistrApi<T>);
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
