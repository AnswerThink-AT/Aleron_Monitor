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
import type { SalesOrderItemApi } from './SalesOrderItemApi';
import {
  SalesOrderItemPartner,
  SalesOrderItemPartnerType
} from './SalesOrderItemPartner';
import {
  SalesOrderItemPricingElement,
  SalesOrderItemPricingElementType
} from './SalesOrderItemPricingElement';
import {
  SalesOrderItemText,
  SalesOrderItemTextType
} from './SalesOrderItemText';
import { SalesOrder, SalesOrderType } from './SalesOrder';
import {
  SalesOrderScheduleLine,
  SalesOrderScheduleLineType
} from './SalesOrderScheduleLine';
import {
  VariantConfiguration,
  VariantConfigurationType
} from './VariantConfiguration';
/**
 * This class represents the entity "SalesOrderItem" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
export declare class SalesOrderItem<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SalesOrderItemType<T>
{
  /**
   * Technical entity name for SalesOrderItem.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SalesOrderItem entity.
   */
  static _keys: string[];
  /**
   * Sales Order.
   * Maximum length: 10.
   */
  salesOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Order Item.
   * Maximum length: 6.
   */
  salesOrderItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Higher Level Item.
   * Maximum length: 6.
   * @nullable
   */
  higherLevelItem?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales Order Item Category.
   * Maximum length: 4.
   */
  salesOrderItemCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Order Item Text.
   * Maximum length: 40.
   */
  salesOrderItemText: DeserializedType<T, 'Edm.String'>;
  /**
   * Product.
   * Maximum length: 18.
   */
  product: DeserializedType<T, 'Edm.String'>;
  /**
   * Originally Requested Material.
   * Maximum length: 18.
   */
  originallyRequestedMaterial: DeserializedType<T, 'Edm.String'>;
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
   * International Article Number.
   * Maximum length: 18.
   */
  internationalArticleNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order By Customer.
   * Maximum length: 35.
   */
  purchaseOrderByCustomer: DeserializedType<T, 'Edm.String'>;
  /**
   * Confd Deliv Qty In Order Qty Unit.
   */
  confdDelivQtyInOrderQtyUnit: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Order Quantity Sap Unit.
   * Maximum length: 3.
   */
  orderQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Order Quantity Iso Unit.
   * Maximum length: 3.
   */
  orderQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
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
   * Reference Sd Document.
   * Maximum length: 10.
   */
  referenceSdDocument: DeserializedType<T, 'Edm.String'>;
  /**
   * Reference Sd Document Item.
   * Maximum length: 6.
   */
  referenceSdDocumentItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Reference Sd Document Category.
   * Maximum length: 4.
   */
  referenceSdDocumentCategory: DeserializedType<T, 'Edm.String'>;
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
   * Requested Delivery Date.
   * @nullable
   */
  requestedDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Confirmed Delivery Date.
   * @nullable
   */
  confirmedDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Pricing Date.
   * @nullable
   */
  pricingDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Services Rendered Date.
   * @nullable
   */
  servicesRenderedDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Billing Document Date.
   * @nullable
   */
  billingDocumentDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Net Amount.
   */
  netAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Transaction Currency.
   * Maximum length: 3.
   */
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax Amount.
   */
  taxAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Customer Group.
   * Maximum length: 2.
   */
  customerGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Batch.
   * Maximum length: 10.
   */
  batch: DeserializedType<T, 'Edm.String'>;
  /**
   * Plant.
   * Maximum length: 4.
   */
  plant: DeserializedType<T, 'Edm.String'>;
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
   * Delivery Priority.
   * Maximum length: 2.
   */
  deliveryPriority: DeserializedType<T, 'Edm.String'>;
  /**
   * Partial Delivery Is Allowed.
   * Maximum length: 1.
   */
  partialDeliveryIsAllowed: DeserializedType<T, 'Edm.String'>;
  /**
   * Max Nmbr Of Partial Delivery.
   */
  maxNmbrOfPartialDelivery: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Delivery Date Type Rule.
   * Maximum length: 1.
   */
  deliveryDateTypeRule: DeserializedType<T, 'Edm.String'>;
  /**
   * Receiving Point.
   * Maximum length: 25.
   */
  receivingPoint: DeserializedType<T, 'Edm.String'>;
  /**
   * Delivery Group.
   * Maximum length: 3.
   */
  deliveryGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Classification.
   * Maximum length: 3.
   */
  incotermsClassification: DeserializedType<T, 'Edm.String'>;
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
   * Incoterms Version.
   * Maximum length: 4.
   */
  incotermsVersion: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer Payment Terms.
   * Maximum length: 4.
   */
  customerPaymentTerms: DeserializedType<T, 'Edm.String'>;
  /**
   * Fixed Value Date.
   * @nullable
   */
  fixedValueDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Customer Price Group.
   * Maximum length: 2.
   */
  customerPriceGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Material Pricing Group.
   * Maximum length: 2.
   */
  materialPricingGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Business Area.
   * Maximum length: 4.
   */
  businessArea: DeserializedType<T, 'Edm.String'>;
  /**
   * Profit Center.
   * Maximum length: 10.
   */
  profitCenter: DeserializedType<T, 'Edm.String'>;
  /**
   * Matl Account Assignment Group.
   * Maximum length: 2.
   */
  matlAccountAssignmentGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Wbs Element External Id.
   * Maximum length: 24.
   */
  wbsElementExternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Billing Block Reason.
   * Maximum length: 2.
   */
  itemBillingBlockReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Document Rjcn Reason.
   * Maximum length: 2.
   */
  salesDocumentRjcnReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Configuration.
   * Maximum length: 18.
   */
  productConfiguration: DeserializedType<T, 'Edm.String'>;
  /**
   * Sd Process Status.
   * Maximum length: 1.
   */
  sdProcessStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Sd Document Rejection Status.
   * Maximum length: 1.
   */
  sdDocumentRejectionStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Delivery Status.
   * Maximum length: 1.
   */
  deliveryStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Billing Block Status.
   * Maximum length: 1.
   */
  billingBlockStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Item General Incompletion Status.
   * Maximum length: 1.
   */
  itemGeneralIncompletionStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Delivery Block Status.
   * Maximum length: 1.
   */
  deliveryBlockStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Sls Order Item Down Payment Status.
   * Maximum length: 1.
   */
  slsOrderItemDownPaymentStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Order Related Billing Status.
   * Maximum length: 1.
   */
  orderRelatedBillingStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Chml Cmplnc Status.
   * Maximum length: 1.
   */
  chmlCmplncStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Dangerous Goods Status.
   * Maximum length: 1.
   */
  dangerousGoodsStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Safety Data Sheet Status.
   * Maximum length: 1.
   */
  safetyDataSheetStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Trd Cmplnc Embargo Sts.
   * Maximum length: 1.
   */
  trdCmplncEmbargoSts: DeserializedType<T, 'Edm.String'>;
  /**
   * Trd Cmplnc Snctnd List Chk Sts.
   * Maximum length: 1.
   */
  trdCmplncSnctndListChkSts: DeserializedType<T, 'Edm.String'>;
  /**
   * Ovrl Trd Cmplnc Legal Ctrl Chk Sts.
   * Maximum length: 1.
   */
  ovrlTrdCmplncLegalCtrlChkSts: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-many navigation property to the {@link SalesOrderItemPartner} entity.
   */
  itemPartner: SalesOrderItemPartner<T>[];
  /**
   * One-to-many navigation property to the {@link SalesOrderItemPricingElement} entity.
   */
  itemPricingElement: SalesOrderItemPricingElement<T>[];
  /**
   * One-to-many navigation property to the {@link SalesOrderItemText} entity.
   */
  itemText: SalesOrderItemText<T>[];
  /**
   * One-to-one navigation property to the {@link SalesOrder} entity.
   */
  salesOrder_1?: SalesOrder<T> | null;
  /**
   * One-to-many navigation property to the {@link SalesOrderScheduleLine} entity.
   */
  scheduleLine: SalesOrderScheduleLine<T>[];
  /**
   * One-to-one navigation property to the {@link VariantConfiguration} entity.
   */
  variantConfiguration?: VariantConfiguration<T> | null;
  constructor(_entityApi: SalesOrderItemApi<T>);
}
export interface SalesOrderItemType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesOrder: DeserializedType<T, 'Edm.String'>;
  salesOrderItem: DeserializedType<T, 'Edm.String'>;
  higherLevelItem?: DeserializedType<T, 'Edm.String'> | null;
  salesOrderItemCategory: DeserializedType<T, 'Edm.String'>;
  salesOrderItemText: DeserializedType<T, 'Edm.String'>;
  product: DeserializedType<T, 'Edm.String'>;
  originallyRequestedMaterial: DeserializedType<T, 'Edm.String'>;
  productGroup: DeserializedType<T, 'Edm.String'>;
  materialByCustomer: DeserializedType<T, 'Edm.String'>;
  internationalArticleNumber: DeserializedType<T, 'Edm.String'>;
  purchaseOrderByCustomer: DeserializedType<T, 'Edm.String'>;
  confdDelivQtyInOrderQtyUnit: DeserializedType<T, 'Edm.Decimal'>;
  orderQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  orderQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  requestedQuantity: DeserializedType<T, 'Edm.Decimal'>;
  requestedQuantitySapUnit: DeserializedType<T, 'Edm.String'>;
  requestedQuantityIsoUnit: DeserializedType<T, 'Edm.String'>;
  referenceSdDocument: DeserializedType<T, 'Edm.String'>;
  referenceSdDocumentItem: DeserializedType<T, 'Edm.String'>;
  referenceSdDocumentCategory: DeserializedType<T, 'Edm.String'>;
  itemGrossWeight: DeserializedType<T, 'Edm.Decimal'>;
  itemNetWeight: DeserializedType<T, 'Edm.Decimal'>;
  itemWeightSapUnit: DeserializedType<T, 'Edm.String'>;
  itemWeightIsoUnit: DeserializedType<T, 'Edm.String'>;
  itemVolume: DeserializedType<T, 'Edm.Decimal'>;
  itemVolumeSapUnit: DeserializedType<T, 'Edm.String'>;
  itemVolumeIsoUnit: DeserializedType<T, 'Edm.String'>;
  requestedDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  confirmedDeliveryDate?: DeserializedType<T, 'Edm.Date'> | null;
  pricingDate?: DeserializedType<T, 'Edm.Date'> | null;
  servicesRenderedDate?: DeserializedType<T, 'Edm.Date'> | null;
  billingDocumentDate?: DeserializedType<T, 'Edm.Date'> | null;
  netAmount: DeserializedType<T, 'Edm.Decimal'>;
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  taxAmount: DeserializedType<T, 'Edm.Decimal'>;
  customerGroup: DeserializedType<T, 'Edm.String'>;
  batch: DeserializedType<T, 'Edm.String'>;
  plant: DeserializedType<T, 'Edm.String'>;
  storageLocation: DeserializedType<T, 'Edm.String'>;
  shippingPoint: DeserializedType<T, 'Edm.String'>;
  shippingType: DeserializedType<T, 'Edm.String'>;
  route: DeserializedType<T, 'Edm.String'>;
  deliveryPriority: DeserializedType<T, 'Edm.String'>;
  partialDeliveryIsAllowed: DeserializedType<T, 'Edm.String'>;
  maxNmbrOfPartialDelivery: DeserializedType<T, 'Edm.Decimal'>;
  deliveryDateTypeRule: DeserializedType<T, 'Edm.String'>;
  receivingPoint: DeserializedType<T, 'Edm.String'>;
  deliveryGroup: DeserializedType<T, 'Edm.String'>;
  incotermsClassification: DeserializedType<T, 'Edm.String'>;
  incotermsLocation1: DeserializedType<T, 'Edm.String'>;
  incotermsLocation2: DeserializedType<T, 'Edm.String'>;
  incotermsVersion: DeserializedType<T, 'Edm.String'>;
  customerPaymentTerms: DeserializedType<T, 'Edm.String'>;
  fixedValueDate?: DeserializedType<T, 'Edm.Date'> | null;
  customerPriceGroup: DeserializedType<T, 'Edm.String'>;
  materialPricingGroup: DeserializedType<T, 'Edm.String'>;
  businessArea: DeserializedType<T, 'Edm.String'>;
  profitCenter: DeserializedType<T, 'Edm.String'>;
  matlAccountAssignmentGroup: DeserializedType<T, 'Edm.String'>;
  wbsElementExternalId: DeserializedType<T, 'Edm.String'>;
  itemBillingBlockReason: DeserializedType<T, 'Edm.String'>;
  salesDocumentRjcnReason: DeserializedType<T, 'Edm.String'>;
  productConfiguration: DeserializedType<T, 'Edm.String'>;
  sdProcessStatus: DeserializedType<T, 'Edm.String'>;
  sdDocumentRejectionStatus: DeserializedType<T, 'Edm.String'>;
  deliveryStatus: DeserializedType<T, 'Edm.String'>;
  billingBlockStatus: DeserializedType<T, 'Edm.String'>;
  itemGeneralIncompletionStatus: DeserializedType<T, 'Edm.String'>;
  deliveryBlockStatus: DeserializedType<T, 'Edm.String'>;
  slsOrderItemDownPaymentStatus: DeserializedType<T, 'Edm.String'>;
  orderRelatedBillingStatus: DeserializedType<T, 'Edm.String'>;
  chmlCmplncStatus: DeserializedType<T, 'Edm.String'>;
  dangerousGoodsStatus: DeserializedType<T, 'Edm.String'>;
  safetyDataSheetStatus: DeserializedType<T, 'Edm.String'>;
  trdCmplncEmbargoSts: DeserializedType<T, 'Edm.String'>;
  trdCmplncSnctndListChkSts: DeserializedType<T, 'Edm.String'>;
  ovrlTrdCmplncLegalCtrlChkSts: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  itemPartner: SalesOrderItemPartnerType<T>[];
  itemPricingElement: SalesOrderItemPricingElementType<T>[];
  itemText: SalesOrderItemTextType<T>[];
  salesOrder_1?: SalesOrderType<T> | null;
  scheduleLine: SalesOrderScheduleLineType<T>[];
  variantConfiguration?: VariantConfigurationType<T> | null;
}
