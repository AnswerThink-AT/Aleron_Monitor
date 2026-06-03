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
import type { Yy1_BillingtypeApi } from './Yy1_BillingtypeApi';

/**
 * This class represents the entity "YY1_BILLINGTYPE" of service "YY1_BILLINGTYPE_CDS".
 */
export class Yy1_Billingtype<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements Yy1_BillingtypeType<T>
{
  /**
   * Technical entity name for Yy1_Billingtype.
   */
  static override _entityName = 'YY1_BILLINGTYPE';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/YY1_BILLINGTYPE_CDS';
  /**
   * All key fields of the Yy1_Billingtype entity.
   */
  static _keys = ['SAP_UUID'];
  /**
   * 16 Byte UUID in 16 Bytes (Raw Format).
   */
  declare sapUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Sales order Type.
   * Maximum length: 4.
   * @nullable
   */
  declare soOrderType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Billing type.
   * Maximum length: 4.
   * @nullable
   */
  declare billingType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Standard Order Type.
   * Maximum length: 20.
   * @nullable
   */
  declare standardOrderType?: DeserializedType<T, 'Edm.String'> | null;

  constructor(_entityApi: Yy1_BillingtypeApi<T>) {
    super(_entityApi);
  }
}

export interface Yy1_BillingtypeType<
  T extends DeSerializers = DefaultDeSerializers
> {
  sapUuid: DeserializedType<T, 'Edm.Guid'>;
  soOrderType?: DeserializedType<T, 'Edm.String'> | null;
  billingType?: DeserializedType<T, 'Edm.String'> | null;
  standardOrderType?: DeserializedType<T, 'Edm.String'> | null;
}
