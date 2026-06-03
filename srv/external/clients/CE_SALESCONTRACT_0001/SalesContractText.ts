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
} from '@sap-cloud-sdk/odata-v4';
import { Sap_Message } from './Sap_Message';
import type { SalesContractTextApi } from './SalesContractTextApi';
import { SalesContract, SalesContractType } from './SalesContract';

/**
 * This class represents the entity "SalesContractText" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
export class SalesContractText<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements SalesContractTextType<T>
{
  /**
   * Technical entity name for SalesContractText.
   */
  static override _entityName = 'SalesContractText';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/';
  /**
   * All key fields of the SalesContractText entity.
   */
  static _keys = ['SalesContract', 'Language', 'LongTextID'];
  /**
   * Sales Contract.
   * Maximum length: 10.
   */
  declare salesContract: DeserializedType<T, 'Edm.String'>;
  /**
   * Language.
   * Maximum length: 2.
   */
  declare language: DeserializedType<T, 'Edm.String'>;
  /**
   * Long Text Id.
   * Maximum length: 4.
   */
  declare longTextId: DeserializedType<T, 'Edm.String'>;
  /**
   * Long Text.
   */
  declare longText: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  declare sapMessages: Sap_Message<T>[];
  /**
   * One-to-one navigation property to the {@link SalesContract} entity.
   */
  declare salesContract_1?: SalesContract<T> | null;

  constructor(_entityApi: SalesContractTextApi<T>) {
    super(_entityApi);
  }
}

export interface SalesContractTextType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesContract: DeserializedType<T, 'Edm.String'>;
  language: DeserializedType<T, 'Edm.String'>;
  longTextId: DeserializedType<T, 'Edm.String'>;
  longText: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  salesContract_1?: SalesContractType<T> | null;
}
