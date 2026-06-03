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
import type { SalesContractItemTextApi } from './SalesContractItemTextApi';
import { SalesContractItem, SalesContractItemType } from './SalesContractItem';
import { SalesContract, SalesContractType } from './SalesContract';

/**
 * This class represents the entity "SalesContractItemText" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
export class SalesContractItemText<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SalesContractItemTextType<T>
{
  /**
   * Technical entity name for SalesContractItemText.
   */
  static override _entityName = 'SalesContractItemText';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/';
  /**
   * All key fields of the SalesContractItemText entity.
   */
  static _keys = [
    'SalesContract',
    'SalesContractItem',
    'Language',
    'LongTextID'
  ];
  /**
   * Sales Contract.
   * Maximum length: 10.
   */
  declare salesContract: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Contract Item.
   * Maximum length: 6.
   */
  declare salesContractItem: DeserializedType<T, 'Edm.String'>;
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
   * One-to-one navigation property to the {@link SalesContractItem} entity.
   */
  declare item?: SalesContractItem<T> | null;
  /**
   * One-to-one navigation property to the {@link SalesContract} entity.
   */
  declare salesContract_1?: SalesContract<T> | null;

  constructor(_entityApi: SalesContractItemTextApi<T>) {
    super(_entityApi);
  }
}

export interface SalesContractItemTextType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesContract: DeserializedType<T, 'Edm.String'>;
  salesContractItem: DeserializedType<T, 'Edm.String'>;
  language: DeserializedType<T, 'Edm.String'>;
  longTextId: DeserializedType<T, 'Edm.String'>;
  longText: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  item?: SalesContractItemType<T> | null;
  salesContract_1?: SalesContractType<T> | null;
}
