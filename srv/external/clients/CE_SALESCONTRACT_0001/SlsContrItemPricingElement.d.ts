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
import type { SlsContrItemPricingElementApi } from './SlsContrItemPricingElementApi';
import { SalesContractItem, SalesContractItemType } from './SalesContractItem';
import { SalesContract, SalesContractType } from './SalesContract';
/**
 * This class represents the entity "SlsContrItemPricingElement" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
export declare class SlsContrItemPricingElement<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SlsContrItemPricingElementType<T>
{
  /**
   * Technical entity name for SlsContrItemPricingElement.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SlsContrItemPricingElement entity.
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
   * Condition Quantity.
   * @nullable
   */
  conditionQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
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
   * Condition Amount.
   * @nullable
   */
  conditionAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Transaction Currency.
   * Maximum length: 3.
   */
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Base Amount.
   * @nullable
   */
  conditionBaseAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Base Quantity.
   * @nullable
   */
  conditionBaseQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Inactive Reason.
   * Maximum length: 1.
   */
  conditionInactiveReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Is Manually Changed.
   */
  conditionIsManuallyChanged: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Condition Is For Statistics.
   */
  conditionIsForStatistics: DeserializedType<T, 'Edm.Boolean'>;
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
  constructor(_entityApi: SlsContrItemPricingElementApi<T>);
}
export interface SlsContrItemPricingElementType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesContract: DeserializedType<T, 'Edm.String'>;
  salesContractItem: DeserializedType<T, 'Edm.String'>;
  pricingProcedureStep: DeserializedType<T, 'Edm.String'>;
  pricingProcedureCounter: DeserializedType<T, 'Edm.String'>;
  conditionType: DeserializedType<T, 'Edm.String'>;
  conditionCalculationType: DeserializedType<T, 'Edm.String'>;
  conditionRateAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionCurrency: DeserializedType<T, 'Edm.String'>;
  conditionRateRatio?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionRateRatioSapUnit: DeserializedType<T, 'Edm.String'>;
  conditionRateRatioIsoUnit: DeserializedType<T, 'Edm.String'>;
  conditionQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  conditionQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  conditionAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  conditionBaseAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionBaseQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  conditionInactiveReason: DeserializedType<T, 'Edm.String'>;
  conditionIsManuallyChanged: DeserializedType<T, 'Edm.Boolean'>;
  conditionIsForStatistics: DeserializedType<T, 'Edm.Boolean'>;
  sapMessages: Sap_Message<T>[];
  item?: SalesContractItemType<T> | null;
  salesContract_1?: SalesContractType<T> | null;
}
