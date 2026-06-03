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
export declare class SalesContractItemText<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SalesContractItemTextType<T>
{
  /**
   * Technical entity name for SalesContractItemText.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SalesContractItemText entity.
   */
  static _keys: string[];
  /**
   * Sales Contract.
   * Maximum length: 10.
   */
  salesContract: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Contract Item.
   * Maximum length: 6.
   */
  salesContractItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Language.
   * Maximum length: 2.
   */
  language: DeserializedType<T, 'Edm.String'>;
  /**
   * Long Text Id.
   * Maximum length: 4.
   */
  longTextId: DeserializedType<T, 'Edm.String'>;
  /**
   * Long Text.
   */
  longText: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-one navigation property to the {@link SalesContractItem} entity.
   */
  item?: SalesContractItem<T> | null;
  /**
   * One-to-one navigation property to the {@link SalesContract} entity.
   */
  salesContract_1?: SalesContract<T> | null;
  constructor(_entityApi: SalesContractItemTextApi<T>);
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
