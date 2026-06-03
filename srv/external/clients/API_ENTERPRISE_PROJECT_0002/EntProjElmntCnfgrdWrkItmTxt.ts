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
import type { EntProjElmntCnfgrdWrkItmTxtApi } from './EntProjElmntCnfgrdWrkItmTxtApi';

/**
 * This class represents the entity "A_EntProjElmntCnfgrdWrkItmTxt" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export class EntProjElmntCnfgrdWrkItmTxt<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EntProjElmntCnfgrdWrkItmTxtType<T>
{
  /**
   * Technical entity name for EntProjElmntCnfgrdWrkItmTxt.
   */
  static override _entityName = 'A_EntProjElmntCnfgrdWrkItmTxt';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EntProjElmntCnfgrdWrkItmTxt entity.
   */
  static _keys = ['EntProjElmntWorkItem', 'Language'];
  /**
   * Work Item ID.
   * Maximum length: 10.
   */
  declare entProjElmntWorkItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Language Key.
   * Maximum length: 2.
   */
  declare language: DeserializedType<T, 'Edm.String'>;
  /**
   * Work Item Name.
   * Maximum length: 40.
   * @nullable
   */
  declare entProjElmntCnfgrdWrkItmName?: DeserializedType<
    T,
    'Edm.String'
  > | null;

  constructor(_entityApi: EntProjElmntCnfgrdWrkItmTxtApi<T>) {
    super(_entityApi);
  }
}

export interface EntProjElmntCnfgrdWrkItmTxtType<
  T extends DeSerializers = DefaultDeSerializers
> {
  entProjElmntWorkItem: DeserializedType<T, 'Edm.String'>;
  language: DeserializedType<T, 'Edm.String'>;
  entProjElmntCnfgrdWrkItmName?: DeserializedType<T, 'Edm.String'> | null;
}
