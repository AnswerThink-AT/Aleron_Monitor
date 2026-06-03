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
import type { VarConfignAssignedValueApi } from './VarConfignAssignedValueApi';
import {
  VarConfignCharacteristic,
  VarConfignCharacteristicType
} from './VarConfignCharacteristic';
import {
  VariantConfiguration,
  VariantConfigurationType
} from './VariantConfiguration';

/**
 * This class represents the entity "VarConfignAssignedValue" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
export class VarConfignAssignedValue<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements VarConfignAssignedValueType<T>
{
  /**
   * Technical entity name for VarConfignAssignedValue.
   */
  static override _entityName = 'VarConfignAssignedValue';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/';
  /**
   * All key fields of the VarConfignAssignedValue entity.
   */
  static _keys = [
    'VarConfigurationBusObjectKey',
    'VarConfigurationBusObjectType',
    'VarConfignInstceInternalID',
    'Characteristic',
    'VariantConfigurationValueID'
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
   * Characteristic.
   * Maximum length: 30.
   */
  declare characteristic: DeserializedType<T, 'Edm.String'>;
  /**
   * Variant Configuration Value Id.
   * Maximum length: 150.
   */
  declare variantConfigurationValueId: DeserializedType<T, 'Edm.String'>;
  /**
   * Var Cnf Characteristic Value.
   * Maximum length: 70.
   * @nullable
   */
  declare varCnfCharacteristicValue?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Var Cnf Charc Value Description.
   * Maximum length: 70.
   * @nullable
   */
  declare varCnfCharcValueDescription?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Var Cnf Charc From Quantity.
   * @nullable
   */
  declare varCnfCharcFromQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Var Cnf Charc From Quantity Unit.
   * Maximum length: 3.
   * @nullable
   */
  declare varCnfCharcFromQuantityUnit?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Var Cnf Charc From Quantity Iso Unit.
   * Maximum length: 3.
   * @nullable
   */
  declare varCnfCharcFromQuantityIsoUnit?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Var Cnf Charc To Quantity.
   * @nullable
   */
  declare varCnfCharcToQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Var Cnf Charc To Quantity Unit.
   * Maximum length: 3.
   * @nullable
   */
  declare varCnfCharcToQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Var Cnf Charc To Quantity Iso Unit.
   * Maximum length: 3.
   * @nullable
   */
  declare varCnfCharcToQuantityIsoUnit?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Var Cnf Charc From Numeric Value.
   * @nullable
   */
  declare varCnfCharcFromNumericValue?: DeserializedType<
    T,
    'Edm.Decimal'
  > | null;
  /**
   * Var Cnf Charc To Numeric Value.
   * @nullable
   */
  declare varCnfCharcToNumericValue?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Var Cnf Charc From Date.
   * @nullable
   */
  declare varCnfCharcFromDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Var Cnf Charc From Time.
   * @nullable
   */
  declare varCnfCharcFromTime?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Var Cnf Charc From Amount.
   * @nullable
   */
  declare varCnfCharcFromAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Var Cnf Charc To Amount.
   * @nullable
   */
  declare varCnfCharcToAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Var Cnf Charc Currency.
   * Maximum length: 3.
   * @nullable
   */
  declare varCnfCharcCurrency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Var Confign Value Assignment Type.
   */
  declare varConfignValueAssignmentType: DeserializedType<T, 'Edm.Int32'>;
  /**
   * One-to-one navigation property to the {@link VarConfignCharacteristic} entity.
   */
  declare characteristic_1?: VarConfignCharacteristic<T> | null;
  /**
   * One-to-one navigation property to the {@link VariantConfiguration} entity.
   */
  declare variantConfiguration?: VariantConfiguration<T> | null;

  constructor(_entityApi: VarConfignAssignedValueApi<T>) {
    super(_entityApi);
  }
}

export interface VarConfignAssignedValueType<
  T extends DeSerializers = DefaultDeSerializers
> {
  varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>;
  varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>;
  varConfignInstceInternalId: DeserializedType<T, 'Edm.Int32'>;
  characteristic: DeserializedType<T, 'Edm.String'>;
  variantConfigurationValueId: DeserializedType<T, 'Edm.String'>;
  varCnfCharacteristicValue?: DeserializedType<T, 'Edm.String'> | null;
  varCnfCharcValueDescription?: DeserializedType<T, 'Edm.String'> | null;
  varCnfCharcFromQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  varCnfCharcFromQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  varCnfCharcFromQuantityIsoUnit?: DeserializedType<T, 'Edm.String'> | null;
  varCnfCharcToQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  varCnfCharcToQuantityUnit?: DeserializedType<T, 'Edm.String'> | null;
  varCnfCharcToQuantityIsoUnit?: DeserializedType<T, 'Edm.String'> | null;
  varCnfCharcFromNumericValue?: DeserializedType<T, 'Edm.Decimal'> | null;
  varCnfCharcToNumericValue?: DeserializedType<T, 'Edm.Decimal'> | null;
  varCnfCharcFromDate?: DeserializedType<T, 'Edm.Date'> | null;
  varCnfCharcFromTime?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  varCnfCharcFromAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  varCnfCharcToAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  varCnfCharcCurrency?: DeserializedType<T, 'Edm.String'> | null;
  varConfignValueAssignmentType: DeserializedType<T, 'Edm.Int32'>;
  characteristic_1?: VarConfignCharacteristicType<T> | null;
  variantConfiguration?: VariantConfigurationType<T> | null;
}
