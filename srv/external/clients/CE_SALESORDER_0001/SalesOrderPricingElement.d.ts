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
import type { SalesOrderPricingElementApi } from './SalesOrderPricingElementApi';
import { SalesOrder, SalesOrderType } from './SalesOrder';
/**
 * This class represents the entity "SalesOrderPricingElement" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
export declare class SalesOrderPricingElement<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SalesOrderPricingElementType<T>
{
  /**
   * Technical entity name for SalesOrderPricingElement.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SalesOrderPricingElement entity.
   */
  static _keys: string[];
  /**
   * Sales Order.
   * Maximum length: 10.
   */
  salesOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Pricing Procedure Step.
   * Maximum length: 3.
   */
  pricingProcedureStep: DeserializedType<T, 'Edm.String'>;
  /**
   * Pricing Procedure Counter.
   * Maximum length: 3.
   */
  pricingProcedureCounter: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Type.
   * Maximum length: 4.
   */
  conditionType: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Calculation Type.
   * Maximum length: 3.
   */
  conditionCalculationType: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Rate Amount.
   * @nullable
   */
  conditionRateAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Currency.
   * Maximum length: 3.
   */
  conditionCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Quantity.
   * @nullable
   */
  conditionQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Base Quantity.
   * @nullable
   */
  conditionBaseQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Quantity Sap Unit.
   * Maximum length: 3.
   */
  conditionQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Quantity Iso Unit.
   * Maximum length: 3.
   */
  conditionQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Rate Ratio.
   * @nullable
   */
  conditionRateRatio?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Rate Ratio Sap Unit.
   * Maximum length: 3.
   */
  conditionRateRatioSapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Rate Ratio Iso Unit.
   * Maximum length: 3.
   */
  conditionRateRatioIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Amount.
   * @nullable
   */
  conditionAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Base Amount.
   * @nullable
   */
  conditionBaseAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Transaction Currency.
   * Maximum length: 3.
   */
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-one navigation property to the {@link SalesOrder} entity.
   */
  salesOrder_1?: SalesOrder<T> | null;
  constructor(_entityApi: SalesOrderPricingElementApi<T>);
}
export interface SalesOrderPricingElementType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesOrder: DeserializedType<T, 'Edm.String'>;
  pricingProcedureStep: DeserializedType<T, 'Edm.String'>;
  pricingProcedureCounter: DeserializedType<T, 'Edm.String'>;
  conditionType: DeserializedType<T, 'Edm.String'>;
  conditionCalculationType: DeserializedType<T, 'Edm.String'>;
  conditionRateAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionCurrency: DeserializedType<T, 'Edm.String'>;
  conditionQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionBaseQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  conditionQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  conditionRateRatio?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionRateRatioSapUnit: DeserializedType<T, 'Edm.String'>;
  conditionRateRatioIsoUnit: DeserializedType<T, 'Edm.String'>;
  conditionAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionBaseAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  salesOrder_1?: SalesOrderType<T> | null;
}
