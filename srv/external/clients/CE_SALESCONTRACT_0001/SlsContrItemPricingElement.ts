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
export class SlsContrItemPricingElement<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SlsContrItemPricingElementType<T>
{
  /**
   * Technical entity name for SlsContrItemPricingElement.
   */
  static override _entityName = 'SlsContrItemPricingElement';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/';
  /**
   * All key fields of the SlsContrItemPricingElement entity.
   */
  static _keys = [
    'SalesContract',
    'SalesContractItem',
    'PricingProcedureStep',
    'PricingProcedureCounter'
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
   * Pricing Procedure Step.
   * Maximum length: 3.
   */
  declare pricingProcedureStep: DeserializedType<T, 'Edm.String'>;
  /**
   * Pricing Procedure Counter.
   * Maximum length: 3.
   */
  declare pricingProcedureCounter: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Type.
   * Maximum length: 4.
   */
  declare conditionType: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Calculation Type.
   * Maximum length: 3.
   */
  declare conditionCalculationType: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Rate Amount.
   * @nullable
   */
  declare conditionRateAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Currency.
   * Maximum length: 3.
   */
  declare conditionCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Rate Ratio.
   * @nullable
   */
  declare conditionRateRatio?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Rate Ratio Sap Unit.
   * Maximum length: 3.
   */
  declare conditionRateRatioSapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Rate Ratio Iso Unit.
   * Maximum length: 3.
   */
  declare conditionRateRatioIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Quantity.
   * @nullable
   */
  declare conditionQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Quantity Sap Unit.
   * Maximum length: 3.
   */
  declare conditionQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Quantity Iso Unit.
   * Maximum length: 3.
   */
  declare conditionQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Amount.
   * @nullable
   */
  declare conditionAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Transaction Currency.
   * Maximum length: 3.
   */
  declare transactionCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Base Amount.
   * @nullable
   */
  declare conditionBaseAmount?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Base Quantity.
   * @nullable
   */
  declare conditionBaseQuantity?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Condition Inactive Reason.
   * Maximum length: 1.
   */
  declare conditionInactiveReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Condition Is Manually Changed.
   */
  declare conditionIsManuallyChanged: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Condition Is For Statistics.
   */
  declare conditionIsForStatistics: DeserializedType<T, 'Edm.Boolean'>;
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

  constructor(_entityApi: SlsContrItemPricingElementApi<T>) {
    super(_entityApi);
  }
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
