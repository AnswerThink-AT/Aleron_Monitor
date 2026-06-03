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
import type { VariantConfigurationInstanceApi } from './VariantConfigurationInstanceApi';
import {
  VarConfignCharacteristic,
  VarConfignCharacteristicType
} from './VarConfignCharacteristic';
import {
  VariantConfiguration,
  VariantConfigurationType
} from './VariantConfiguration';

/**
 * This class represents the entity "VariantConfigurationInstance" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
export class VariantConfigurationInstance<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements VariantConfigurationInstanceType<T>
{
  /**
   * Technical entity name for VariantConfigurationInstance.
   */
  static override _entityName = 'VariantConfigurationInstance';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/';
  /**
   * All key fields of the VariantConfigurationInstance entity.
   */
  static _keys = [
    'VarConfigurationBusObjectKey',
    'VarConfigurationBusObjectType',
    'VarConfignInstceInternalID'
  ];
  /**
   * Var Configuration Bus Object Key.
   * Maximum length: 50.
   */
  declare varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>;
  /**
   * Var Configuration Bus Object Type.
   * Maximum length: 30.
   */
  declare varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>;
  /**
   * Var Confign Instce Internal Id.
   */
  declare varConfignInstceInternalId: DeserializedType<T, 'Edm.Int32'>;
  /**
   * Var Confign Par Instce Internal Id.
   */
  declare varConfignParInstceInternalId: DeserializedType<T, 'Edm.Int32'>;
  /**
   * Product.
   * Maximum length: 18.
   * @nullable
   */
  declare product?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Identifier Bom Item.
   * Maximum length: 8.
   * @nullable
   */
  declare identifierBomItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Variant Configuration Quantity.
   * @nullable
   */
  declare variantConfigurationQuantity?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Var Confign Quantity Unit.
   * Maximum length: 3.
   * @nullable
   */
  declare varConfignQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Var Confign Quantity Iso Unit.
   * Maximum length: 3.
   * @nullable
   */
  declare varConfignQuantityIsoUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-many navigation property to the {@link VarConfignCharacteristic} entity.
   */
  declare characteristic: VarConfignCharacteristic<T>[];
  /**
   * One-to-one navigation property to the {@link VariantConfiguration} entity.
   */
  declare variantConfiguration?: VariantConfiguration<T> | null;

  constructor(_entityApi: VariantConfigurationInstanceApi<T>) {
    super(_entityApi);
  }
}

export interface VariantConfigurationInstanceType<
  T extends DeSerializers = DefaultDeSerializers
> {
  varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>;
  varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>;
  varConfignInstceInternalId: DeserializedType<T, 'Edm.Int32'>;
  varConfignParInstceInternalId: DeserializedType<T, 'Edm.Int32'>;
  product?: DeserializedType<T, 'Edm.String'> | null;
  identifierBomItem?: DeserializedType<T, 'Edm.String'> | null;
  variantConfigurationQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  varConfignQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  varConfignQuantityIsoUnit?: DeserializedType<T, 'Edm.String'> | null;
  characteristic: VarConfignCharacteristicType<T>[];
  variantConfiguration?: VariantConfigurationType<T> | null;
}
