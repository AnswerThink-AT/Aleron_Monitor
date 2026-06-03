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
import type { VariantConfigurationApi } from './VariantConfigurationApi';
import {
  VariantConfigurationInstance,
  VariantConfigurationInstanceType
} from './VariantConfigurationInstance';
/**
 * This class represents the entity "VariantConfiguration" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
export declare class VariantConfiguration<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements VariantConfigurationType<T>
{
  /**
   * Technical entity name for VariantConfiguration.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the VariantConfiguration entity.
   */
  static _keys: string[];
  /**
   * Var Configuration Bus Object Key.
   * Maximum length: 50.
   */
  varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>;
  /**
   * Var Configuration Bus Object Type.
   * Maximum length: 30.
   */
  varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>;
  /**
   * Var Confign Status.
   * Maximum length: 1.
   */
  varConfignStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-many navigation property to the {@link VariantConfigurationInstance} entity.
   */
  instance: VariantConfigurationInstance<T>[];
  constructor(_entityApi: VariantConfigurationApi<T>);
}
export interface VariantConfigurationType<
  T extends DeSerializers = DefaultDeSerializers
> {
  varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>;
  varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>;
  varConfignStatus: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  instance: VariantConfigurationInstanceType<T>[];
}
