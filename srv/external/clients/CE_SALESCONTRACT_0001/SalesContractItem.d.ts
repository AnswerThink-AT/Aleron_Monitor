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
import type { SalesContractItemApi } from './SalesContractItemApi';
import {
  SlsContrItemPricingElement,
  SlsContrItemPricingElementType
} from './SlsContrItemPricingElement';
import {
  SalesContractItemText,
  SalesContractItemTextType
} from './SalesContractItemText';
import { SalesContract, SalesContractType } from './SalesContract';
/**
 * This class represents the entity "SalesContractItem" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
export declare class SalesContractItem<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SalesContractItemType<T>
{
  /**
   * Technical entity name for SalesContractItem.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SalesContractItem entity.
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
   * Higher Level Item.
   * Maximum length: 6.
   * @nullable
   */
  higherLevelItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales Contract Item Category.
   * Maximum length: 4.
   */
  salesContractItemCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Contract Item Text.
   * Maximum length: 40.
   */
  salesContractItemText: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order By Customer.
   * Maximum length: 35.
   */
  purchaseOrderByCustomer: DeserializedType<T, 'Edm.String'>;
  /**
   * Product.
   * Maximum length: 18.
   */
  product: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Group.
   * Maximum length: 9.
   */
  productGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Material By Customer.
   * Maximum length: 35.
   */
  materialByCustomer: DeserializedType<T, 'Edm.String'>;
  /**
   * Pricing Date.
   * @nullable
   */
  pricingDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Billing Document Date.
   * @nullable
   */
  billingDocumentDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Requested Quantity.
   */
  requestedQuantity: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Requested Quantity Sap Unit.
   * Maximum length: 3.
   */
  requestedQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Requested Quantity Iso Unit.
   * Maximum length: 3.
   */
  requestedQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Target To Base Quantity Dnmntr.
   */
  targetToBaseQuantityDnmntr: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Target To Base Quantity Nmrtr.
   */
  targetToBaseQuantityNmrtr: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Sls Contr Item Released Quantity.
   */
  slsContrItemReleasedQuantity: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Sls Contr Itm Reld Quantity Sap Unit.
   * Maximum length: 3.
   */
  slsContrItmReldQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Sls Contr Itm Reld Quantity Iso Unit.
   * Maximum length: 3.
   */
  slsContrItmReldQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Gross Weight.
   */
  itemGrossWeight: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Item Net Weight.
   */
  itemNetWeight: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Item Weight Sap Unit.
   * Maximum length: 3.
   */
  itemWeightSapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Weight Iso Unit.
   * Maximum length: 3.
   */
  itemWeightIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Volume.
   */
  itemVolume: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Item Volume Sap Unit.
   * Maximum length: 3.
   */
  itemVolumeSapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Volume Iso Unit.
   * Maximum length: 3.
   */
  itemVolumeIsoUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Outline Agreement Target Amount.
   */
  outlineAgreementTargetAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Sls Contract Item Released Amount.
   */
  slsContractItemReleasedAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Transaction Currency.
   * Maximum length: 3.
   */
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Net Amount.
   */
  netAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Customer Price Group.
   * Maximum length: 2.
   */
  customerPriceGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Pricing Group.
   * Maximum length: 2.
   */
  productPricingGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Batch.
   * Maximum length: 10.
   */
  batch: DeserializedType<T, 'Edm.String'>;
  /**
   * Production Plant.
   * Maximum length: 4.
   */
  productionPlant: DeserializedType<T, 'Edm.String'>;
  /**
   * Storage Location.
   * Maximum length: 4.
   */
  storageLocation: DeserializedType<T, 'Edm.String'>;
  /**
   * Shipping Point.
   * Maximum length: 4.
   */
  shippingPoint: DeserializedType<T, 'Edm.String'>;
  /**
   * Shipping Type.
   * Maximum length: 2.
   */
  shippingType: DeserializedType<T, 'Edm.String'>;
  /**
   * Route.
   * Maximum length: 6.
   */
  route: DeserializedType<T, 'Edm.String'>;
  /**
   * Overdeliv Tolrtd Lmt Ratio In Pct.
   */
  overdelivTolrtdLmtRatioInPct: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Underdeliv Tolrtd Lmt Ratio In Pct.
   */
  underdelivTolrtdLmtRatioInPct: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Incoterms Classification.
   * Maximum length: 3.
   */
  incotermsClassification: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Transfer Location.
   * Maximum length: 28.
   */
  incotermsTransferLocation: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Location 1.
   * Maximum length: 70.
   */
  incotermsLocation1: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Location 2.
   * Maximum length: 70.
   */
  incotermsLocation2: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer Payment Terms.
   * Maximum length: 4.
   */
  customerPaymentTerms: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Document Rjcn Reason.
   * Maximum length: 2.
   */
  salesDocumentRjcnReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Billing Block Reason.
   * Maximum length: 2.
   */
  itemBillingBlockReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Profit Center.
   * Maximum length: 10.
   */
  profitCenter: DeserializedType<T, 'Edm.String'>;
  /**
   * Sd Process Status.
   * Maximum length: 1.
   */
  sdProcessStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-many navigation property to the {@link SlsContrItemPricingElement} entity.
   */
  itemPricingElement: SlsContrItemPricingElement<T>[];
  /**
   * One-to-many navigation property to the {@link SalesContractItemText} entity.
   */
  itemText: SalesContractItemText<T>[];
  /**
   * One-to-one navigation property to the {@link SalesContract} entity.
   */
  salesContract_1?: SalesContract<T> | null;
  constructor(_entityApi: SalesContractItemApi<T>);
}
export interface SalesContractItemType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesContract: DeserializedType<T, 'Edm.String'>;
  salesContractItem: DeserializedType<T, 'Edm.String'>;
  higherLevelItem?: DeserializedType<T, 'Edm.String'> | null;
  salesContractItemCategory: DeserializedType<T, 'Edm.String'>;
  salesContractItemText: DeserializedType<T, 'Edm.String'>;
  purchaseOrderByCustomer: DeserializedType<T, 'Edm.String'>;
  product: DeserializedType<T, 'Edm.String'>;
  productGroup: DeserializedType<T, 'Edm.String'>;
  materialByCustomer: DeserializedType<T, 'Edm.String'>;
  pricingDate?: DeserializedType<T, 'Edm.Date'> | null;
  billingDocumentDate?: DeserializedType<T, 'Edm.Date'> | null;
  requestedQuantity: DeserializedType<T, 'Edm.Decimal'>;
  requestedQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  requestedQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  targetToBaseQuantityDnmntr: DeserializedType<T, 'Edm.Decimal'>;
  targetToBaseQuantityNmrtr: DeserializedType<T, 'Edm.Decimal'>;
  slsContrItemReleasedQuantity: DeserializedType<T, 'Edm.Decimal'>;
  slsContrItmReldQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  slsContrItmReldQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  itemGrossWeight: DeserializedType<T, 'Edm.Decimal'>;
  itemNetWeight: DeserializedType<T, 'Edm.Decimal'>;
  itemWeightSapUnit: DeserializedType<T, 'Edm.String'>;
  itemWeightIsoUnit: DeserializedType<T, 'Edm.String'>;
  itemVolume: DeserializedType<T, 'Edm.Decimal'>;
  itemVolumeSapUnit: DeserializedType<T, 'Edm.String'>;
  itemVolumeIsoUnit: DeserializedType<T, 'Edm.String'>;
  outlineAgreementTargetAmount: DeserializedType<T, 'Edm.Decimal'>;
  slsContractItemReleasedAmount: DeserializedType<T, 'Edm.Decimal'>;
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  netAmount: DeserializedType<T, 'Edm.Decimal'>;
  customerPriceGroup: DeserializedType<T, 'Edm.String'>;
  productPricingGroup: DeserializedType<T, 'Edm.String'>;
  batch: DeserializedType<T, 'Edm.String'>;
  productionPlant: DeserializedType<T, 'Edm.String'>;
  storageLocation: DeserializedType<T, 'Edm.String'>;
  shippingPoint: DeserializedType<T, 'Edm.String'>;
  shippingType: DeserializedType<T, 'Edm.String'>;
  route: DeserializedType<T, 'Edm.String'>;
  overdelivTolrtdLmtRatioInPct: DeserializedType<T, 'Edm.Decimal'>;
  underdelivTolrtdLmtRatioInPct: DeserializedType<T, 'Edm.Decimal'>;
  incotermsClassification: DeserializedType<T, 'Edm.String'>;
  incotermsTransferLocation: DeserializedType<T, 'Edm.String'>;
  incotermsLocation1: DeserializedType<T, 'Edm.String'>;
  incotermsLocation2: DeserializedType<T, 'Edm.String'>;
  customerPaymentTerms: DeserializedType<T, 'Edm.String'>;
  salesDocumentRjcnReason: DeserializedType<T, 'Edm.String'>;
  itemBillingBlockReason: DeserializedType<T, 'Edm.String'>;
  profitCenter: DeserializedType<T, 'Edm.String'>;
  sdProcessStatus: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  itemPricingElement: SlsContrItemPricingElementType<T>[];
  itemText: SalesContractItemTextType<T>[];
  salesContract_1?: SalesContractType<T> | null;
}
