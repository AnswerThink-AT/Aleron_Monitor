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
import type { VarConfignCharacteristicApi } from './VarConfignCharacteristicApi';
import {
  VarConfignAssignedValue,
  VarConfignAssignedValueType
} from './VarConfignAssignedValue';
import {
  VariantConfigurationInstance,
  VariantConfigurationInstanceType
} from './VariantConfigurationInstance';
import {
  VariantConfiguration,
  VariantConfigurationType
} from './VariantConfiguration';
/**
 * This class represents the entity "VarConfignCharacteristic" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
export declare class VarConfignCharacteristic<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements VarConfignCharacteristicType<T>
{
  /**
   * Technical entity name for VarConfignCharacteristic.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the VarConfignCharacteristic entity.
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
   * Var Confign Instce Internal Id.
   */
  varConfignInstceInternalId: DeserializedType<T, 'Edm.Int32'>;
  /**
   * Characteristic.
   * Maximum length: 30.
   */
  characteristic: DeserializedType<T, 'Edm.String'>;
  /**
   * Charc Data Type.
   * Maximum length: 4.
   */
  charcDataType: DeserializedType<T, 'Edm.String'>;
  /**
   * Charc Template.
   * Maximum length: 70.
   */
  charcTemplate: DeserializedType<T, 'Edm.String'>;
  /**
   * Currency.
   * Maximum length: 3.
   * @nullable
   */
  currency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Charc Value Unit.
   * Maximum length: 3.
   * @nullable
   */
  charcValueUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Var Cnf Charc Iso Unit.
   * Maximum length: 3.
   * @nullable
   */
  varCnfCharcIsoUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Is Read Only.
   */
  isReadOnly: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Entry Is Required.
   */
  entryIsRequired: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Charc Is Hidden.
   */
  charcIsHidden: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Additional Value Is Allowed.
   */
  additionalValueIsAllowed: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Multiple Values Are Allowed.
   */
  multipleValuesAreAllowed: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * One-to-many navigation property to the {@link VarConfignAssignedValue} entity.
   */
  assignedValue: VarConfignAssignedValue<T>[];
  /**
   * One-to-one navigation property to the {@link VariantConfigurationInstance} entity.
   */
  instance?: VariantConfigurationInstance<T> | null;
  /**
   * One-to-one navigation property to the {@link VariantConfiguration} entity.
   */
  variantConfiguration?: VariantConfiguration<T> | null;
  constructor(_entityApi: VarConfignCharacteristicApi<T>);
}
export interface VarConfignCharacteristicType<
  T extends DeSerializers = DefaultDeSerializers
> {
  varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>;
  varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>;
  varConfignInstceInternalId: DeserializedType<T, 'Edm.Int32'>;
  characteristic: DeserializedType<T, 'Edm.String'>;
  charcDataType: DeserializedType<T, 'Edm.String'>;
  charcTemplate: DeserializedType<T, 'Edm.String'>;
  currency?: DeserializedType<T, 'Edm.String'> | null;
  charcValueUnit?: DeserializedType<T, 'Edm.String'> | null;
  varCnfCharcIsoUnit?: DeserializedType<T, 'Edm.String'> | null;
  isReadOnly: DeserializedType<T, 'Edm.Boolean'>;
  entryIsRequired: DeserializedType<T, 'Edm.Boolean'>;
  charcIsHidden: DeserializedType<T, 'Edm.Boolean'>;
  additionalValueIsAllowed: DeserializedType<T, 'Edm.Boolean'>;
  multipleValuesAreAllowed: DeserializedType<T, 'Edm.Boolean'>;
  assignedValue: VarConfignAssignedValueType<T>[];
  instance?: VariantConfigurationInstanceType<T> | null;
  variantConfiguration?: VariantConfigurationType<T> | null;
}
