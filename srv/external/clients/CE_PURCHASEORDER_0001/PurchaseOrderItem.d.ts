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
import type { PurchaseOrderItemApi } from './PurchaseOrderItemApi';
import {
  PurOrderItemDeliveryAddress,
  PurOrderItemDeliveryAddressType
} from './PurOrderItemDeliveryAddress';
import { PurchaseOrder, PurchaseOrderType } from './PurchaseOrder';
import {
  PurchaseOrderInvoicingPlan,
  PurchaseOrderInvoicingPlanType
} from './PurchaseOrderInvoicingPlan';
import {
  PurchaseOrderItemNote,
  PurchaseOrderItemNoteType
} from './PurchaseOrderItemNote';
import {
  PurchaseOrderScheduleLine,
  PurchaseOrderScheduleLineType
} from './PurchaseOrderScheduleLine';
import {
  PurchaseOrderAccountAssignment,
  PurchaseOrderAccountAssignmentType
} from './PurchaseOrderAccountAssignment';
import {
  PurOrderItemPricingElement,
  PurOrderItemPricingElementType
} from './PurOrderItemPricingElement';
/**
 * This class represents the entity "PurchaseOrderItem" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
export declare class PurchaseOrderItem<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements PurchaseOrderItemType<T>
{
  /**
   * Technical entity name for PurchaseOrderItem.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the PurchaseOrderItem entity.
   */
  static _keys: string[];
  /**
   * Purchase Order.
   * Maximum length: 10.
   */
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Item.
   * Maximum length: 5.
   */
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Category.
   * Maximum length: 1.
   */
  purchaseOrderCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Document Currency.
   * Maximum length: 3.
   */
  documentCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchasing Document Deletion Code.
   * Maximum length: 1.
   */
  purchasingDocumentDeletionCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Material Group.
   * Maximum length: 9.
   */
  materialGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Material.
   * Maximum length: 18.
   */
  material: DeserializedType<T, 'Edm.String'>;
  /**
   * Material Type.
   * Maximum length: 4.
   */
  materialType: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier Material Number.
   * Maximum length: 35.
   */
  supplierMaterialNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier Subrange.
   * Maximum length: 6.
   */
  supplierSubrange: DeserializedType<T, 'Edm.String'>;
  /**
   * Manufacturer Part Nmbr.
   * Maximum length: 40.
   */
  manufacturerPartNmbr: DeserializedType<T, 'Edm.String'>;
  /**
   * Manufacturer.
   * Maximum length: 10.
   */
  manufacturer: DeserializedType<T, 'Edm.String'>;
  /**
   * Manufacturer Material.
   * Maximum length: 18.
   */
  manufacturerMaterial: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Item Text.
   * Maximum length: 40.
   */
  purchaseOrderItemText: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Type Code.
   * Maximum length: 2.
   */
  productTypeCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Company Code.
   * Maximum length: 4.
   */
  companyCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Plant.
   * Maximum length: 4.
   */
  plant: DeserializedType<T, 'Edm.String'>;
  /**
   * Manual Delivery Address Id.
   * Maximum length: 10.
   */
  manualDeliveryAddressId: DeserializedType<T, 'Edm.String'>;
  /**
   * Reference Delivery Address Id.
   * Maximum length: 10.
   */
  referenceDeliveryAddressId: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer.
   * Maximum length: 10.
   */
  customer: DeserializedType<T, 'Edm.String'>;
  /**
   * Subcontractor.
   * Maximum length: 10.
   */
  subcontractor: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier Is Subcontractor.
   */
  supplierIsSubcontractor: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Cross Plant Configurable Product.
   * Maximum length: 18.
   */
  crossPlantConfigurableProduct: DeserializedType<T, 'Edm.String'>;
  /**
   * Article Category.
   * Maximum length: 2.
   */
  articleCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Plnd Order Replnmt Elmnt Type.
   * Maximum length: 1.
   */
  plndOrderReplnmtElmntType: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Purchase Points Qty Unit.
   * Maximum length: 3.
   */
  productPurchasePointsQtyUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Purchase Points Qty.
   */
  productPurchasePointsQty: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Storage Location.
   * Maximum length: 4.
   */
  storageLocation: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Quantity Unit.
   * Maximum length: 3.
   */
  purchaseOrderQuantityUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Order Item Qty To Base Qty Nmrtr.
   */
  orderItemQtyToBaseQtyNmrtr: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Order Item Qty To Base Qty Dnmntr.
   */
  orderItemQtyToBaseQtyDnmntr: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Net Price Quantity.
   */
  netPriceQuantity: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Is Completely Delivered.
   */
  isCompletelyDelivered: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Is Finally Invoiced.
   */
  isFinallyInvoiced: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Goods Receipt Is Expected.
   */
  goodsReceiptIsExpected: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Invoice Is Expected.
   */
  invoiceIsExpected: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Is Order Ackn Rqd.
   */
  isOrderAcknRqd: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Invoice Is Goods Receipt Based.
   */
  invoiceIsGoodsReceiptBased: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Purchase Contract.
   * Maximum length: 10.
   */
  purchaseContract: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Contract Item.
   * Maximum length: 5.
   */
  purchaseContractItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Requisition.
   * Maximum length: 10.
   */
  purchaseRequisition: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Requisition Item.
   * Maximum length: 5.
   */
  purchaseRequisitionItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Requirement Tracking.
   * Maximum length: 10.
   */
  requirementTracking: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier Quotation.
   * Maximum length: 10.
   */
  supplierQuotation: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier Quotation Item.
   * Maximum length: 5.
   */
  supplierQuotationItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Evald Rcpt Settlmt Is Allowed.
   */
  evaldRcptSettlmtIsAllowed: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Unlimited Overdelivery Is Allowed.
   */
  unlimitedOverdeliveryIsAllowed: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Overdeliv Tolrtd Lmt Ratio In Pct.
   */
  overdelivTolrtdLmtRatioInPct: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Underdeliv Tolrtd Lmt Ratio In Pct.
   */
  underdelivTolrtdLmtRatioInPct: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Requisitioner Name.
   * Maximum length: 12.
   */
  requisitionerName: DeserializedType<T, 'Edm.String'>;
  /**
   * Planned Delivery Duration In Days.
   */
  plannedDeliveryDurationInDays: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Goods Receipt Duration In Days.
   */
  goodsReceiptDurationInDays: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Partial Delivery Is Allowed.
   * Maximum length: 1.
   */
  partialDeliveryIsAllowed: DeserializedType<T, 'Edm.String'>;
  /**
   * Consumption Posting.
   * Maximum length: 1.
   */
  consumptionPosting: DeserializedType<T, 'Edm.String'>;
  /**
   * Service Performer.
   * Maximum length: 10.
   */
  servicePerformer: DeserializedType<T, 'Edm.String'>;
  /**
   * Service Package.
   * Maximum length: 10.
   */
  servicePackage: DeserializedType<T, 'Edm.String'>;
  /**
   * Base Unit.
   * Maximum length: 3.
   */
  baseUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Item Category.
   * Maximum length: 1.
   */
  purchaseOrderItemCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Profit Center.
   * Maximum length: 10.
   */
  profitCenter: DeserializedType<T, 'Edm.String'>;
  /**
   * Order Price Unit.
   * Maximum length: 3.
   */
  orderPriceUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Volume Unit.
   * Maximum length: 3.
   */
  itemVolumeUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Weight Unit.
   * Maximum length: 3.
   */
  itemWeightUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Multiple Acct Assgmt Distribution.
   * Maximum length: 1.
   */
  multipleAcctAssgmtDistribution: DeserializedType<T, 'Edm.String'>;
  /**
   * Partial Invoice Distribution.
   * Maximum length: 1.
   */
  partialInvoiceDistribution: DeserializedType<T, 'Edm.String'>;
  /**
   * Pricing Date Control.
   * Maximum length: 1.
   */
  pricingDateControl: DeserializedType<T, 'Edm.String'>;
  /**
   * Is Statistical Item.
   */
  isStatisticalItem: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Purchasing Parent Item.
   * Maximum length: 5.
   */
  purchasingParentItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Goods Receipt Latest Creation Date.
   * @nullable
   */
  goodsReceiptLatestCreationDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Is Returns Item.
   */
  isReturnsItem: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Purchasing Order Reason.
   * Maximum length: 3.
   */
  purchasingOrderReason: DeserializedType<T, 'Edm.String'>;
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
   * Prior Supplier.
   * Maximum length: 10.
   */
  priorSupplier: DeserializedType<T, 'Edm.String'>;
  /**
   * International Article Number.
   * Maximum length: 18.
   */
  internationalArticleNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Intrastat Service Code.
   * Maximum length: 30.
   */
  intrastatServiceCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Commodity Code.
   * Maximum length: 30.
   */
  commodityCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Material Freight Group.
   * Maximum length: 8.
   */
  materialFreightGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Discount In Kind Eligibility.
   * Maximum length: 1.
   */
  discountInKindEligibility: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Item Is Blocked For Delivery.
   */
  purgItemIsBlockedForDelivery: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Supplier Confirmation Control Key.
   * Maximum length: 4.
   */
  supplierConfirmationControlKey: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Doc Order Ackn Number.
   * Maximum length: 20.
   */
  purgDocOrderAcknNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Price Is To Be Printed.
   */
  priceIsToBePrinted: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Account Assignment Category.
   * Maximum length: 1.
   */
  accountAssignmentCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchasing Info Record.
   * Maximum length: 10.
   */
  purchasingInfoRecord: DeserializedType<T, 'Edm.String'>;
  /**
   * Net Amount.
   */
  netAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Gross Amount.
   */
  grossAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Effective Amount.
   */
  effectiveAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Subtotal 1 Amount.
   */
  subtotal1Amount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Subtotal 2 Amount.
   */
  subtotal2Amount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Subtotal 3 Amount.
   */
  subtotal3Amount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Subtotal 4 Amount.
   */
  subtotal4Amount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Subtotal 5 Amount.
   */
  subtotal5Amount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Subtotal 6 Amount.
   */
  subtotal6Amount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Order Quantity.
   */
  orderQuantity: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Net Price Amount.
   */
  netPriceAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Item Volume.
   */
  itemVolume: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Item Gross Weight.
   */
  itemGrossWeight: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Item Net Weight.
   */
  itemNetWeight: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Order Price Unit To Order Unit Nmrtr.
   */
  orderPriceUnitToOrderUnitNmrtr: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Ord Price Unit To Order Unit Dnmntr.
   */
  ordPriceUnitToOrderUnitDnmntr: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Goods Receipt Is Non Valuated.
   */
  goodsReceiptIsNonValuated: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Is To Be Accepted At Origin.
   */
  isToBeAcceptedAtOrigin: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Tax Code.
   * Maximum length: 2.
   */
  taxCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   */
  taxJurisdiction: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax Country.
   * Maximum length: 3.
   */
  taxCountry: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax Determination Date.
   * @nullable
   */
  taxDeterminationDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Shipping Instruction.
   * Maximum length: 2.
   */
  shippingInstruction: DeserializedType<T, 'Edm.String'>;
  /**
   * Non Deductible Input Tax Amount.
   */
  nonDeductibleInputTaxAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Stock Type.
   * Maximum length: 1.
   */
  stockType: DeserializedType<T, 'Edm.String'>;
  /**
   * Valuation Type.
   * Maximum length: 10.
   */
  valuationType: DeserializedType<T, 'Edm.String'>;
  /**
   * Valuation Category.
   * Maximum length: 1.
   */
  valuationCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Is Rejected By Supplier.
   */
  itemIsRejectedBySupplier: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Purg Doc Price Date.
   * @nullable
   */
  purgDocPriceDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Purchasing Info Record Update Code.
   * Maximum length: 1.
   */
  purchasingInfoRecordUpdateCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Inventory Special Stock Type.
   * Maximum length: 1.
   */
  inventorySpecialStockType: DeserializedType<T, 'Edm.String'>;
  /**
   * Delivery Document Type.
   * Maximum length: 4.
   */
  deliveryDocumentType: DeserializedType<T, 'Edm.String'>;
  /**
   * Issuing Storage Location.
   * Maximum length: 4.
   */
  issuingStorageLocation: DeserializedType<T, 'Edm.String'>;
  /**
   * Allocation Table.
   * Maximum length: 10.
   */
  allocationTable: DeserializedType<T, 'Edm.String'>;
  /**
   * Allocation Table Item.
   * Maximum length: 5.
   */
  allocationTableItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Retail Promotion.
   * Maximum length: 10.
   */
  retailPromotion: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Configurable Item Number.
   * Maximum length: 40.
   */
  purgConfigurableItemNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Doc Aggrgd Subitem Category.
   * Maximum length: 1.
   */
  purgDocAggrgdSubitemCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg External Sort Number.
   * Maximum length: 5.
   */
  purgExternalSortNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Batch.
   * Maximum length: 10.
   */
  batch: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchasing Item Is Free Of Charge.
   */
  purchasingItemIsFreeOfCharge: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Down Payment Type.
   * Maximum length: 4.
   */
  downPaymentType: DeserializedType<T, 'Edm.String'>;
  /**
   * Down Payment Percentage Of Tot Amt.
   */
  downPaymentPercentageOfTotAmt: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Down Payment Amount.
   */
  downPaymentAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Down Payment Due Date.
   * @nullable
   */
  downPaymentDueDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Expected Overall Limit Amount.
   */
  expectedOverallLimitAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Overall Limit Amount.
   */
  overallLimitAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Pur Contract For Overall Limit.
   * Maximum length: 10.
   */
  purContractForOverallLimit: DeserializedType<T, 'Edm.String'>;
  /**
   * Pur Contract Item For Overall Limit.
   * Maximum length: 5.
   */
  purContractItemForOverallLimit: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Prod Cmplnc Supplier Status.
   * Maximum length: 1.
   */
  purgProdCmplncSupplierStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Product Marketability Status.
   * Maximum length: 1.
   */
  purgProductMarketabilityStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Safety Data Sheet Status.
   * Maximum length: 1.
   */
  purgSafetyDataSheetStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Prod Cmplnc Dngrs Goods Status.
   * Maximum length: 1.
   */
  purgProdCmplncDngrsGoodsStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Br Material Origin.
   * Maximum length: 1.
   */
  brMaterialOrigin: DeserializedType<T, 'Edm.String'>;
  /**
   * Br Material Usage.
   * Maximum length: 1.
   */
  brMaterialUsage: DeserializedType<T, 'Edm.String'>;
  /**
   * Br Cfop Category.
   * Maximum length: 2.
   */
  brCfopCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Br Ncm.
   * Maximum length: 16.
   */
  brNcm: DeserializedType<T, 'Edm.String'>;
  /**
   * Consumption Tax Ctrl Code.
   * Maximum length: 16.
   */
  consumptionTaxCtrlCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Br Is Produced In House.
   */
  brIsProducedInHouse: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Product Season Year.
   * Maximum length: 4.
   */
  productSeasonYear: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Season.
   * Maximum length: 10.
   */
  productSeason: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Collection.
   * Maximum length: 10.
   */
  productCollection: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Theme.
   * Maximum length: 10.
   */
  productTheme: DeserializedType<T, 'Edm.String'>;
  /**
   * Season Completeness Status.
   * Maximum length: 1.
   */
  seasonCompletenessStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Shipping Group Rule.
   * Maximum length: 4.
   */
  shippingGroupRule: DeserializedType<T, 'Edm.String'>;
  /**
   * Shipping Group Number.
   * Maximum length: 10.
   */
  shippingGroupNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Characteristic 1.
   * Maximum length: 18.
   */
  productCharacteristic1: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Characteristic 2.
   * Maximum length: 18.
   */
  productCharacteristic2: DeserializedType<T, 'Edm.String'>;
  /**
   * Product Characteristic 3.
   * Maximum length: 18.
   */
  productCharacteristic3: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Doc Subitem Category.
   * Maximum length: 1.
   */
  purgDocSubitemCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Diversion Status.
   * Maximum length: 1.
   */
  diversionStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Reference Document Number.
   * Maximum length: 10.
   */
  referenceDocumentNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Reference Document Item.
   * Maximum length: 6.
   */
  referenceDocumentItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Reference Type.
   * Maximum length: 1.
   */
  purchaseOrderReferenceType: DeserializedType<T, 'Edm.String'>;
  /**
   * Item Has Value Added Service.
   */
  itemHasValueAddedService: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Val Added Srvc Parent Itm Number.
   * Maximum length: 5.
   */
  valAddedSrvcParentItmNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Stock Segment.
   * Maximum length: 40.
   */
  stockSegment: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-one navigation property to the {@link PurOrderItemDeliveryAddress} entity.
   */
  deliveryAddress?: PurOrderItemDeliveryAddress<T> | null;
  /**
   * One-to-one navigation property to the {@link PurchaseOrder} entity.
   */
  purchaseOrder_1?: PurchaseOrder<T> | null;
  /**
   * One-to-many navigation property to the {@link PurchaseOrderInvoicingPlan} entity.
   */
  purchaseOrderInvoicingPlan: PurchaseOrderInvoicingPlan<T>[];
  /**
   * One-to-many navigation property to the {@link PurchaseOrderItemNote} entity.
   */
  purchaseOrderItemNote: PurchaseOrderItemNote<T>[];
  /**
   * One-to-many navigation property to the {@link PurchaseOrderScheduleLine} entity.
   */
  purchaseOrderScheduleLineTp: PurchaseOrderScheduleLine<T>[];
  /**
   * One-to-many navigation property to the {@link PurchaseOrderAccountAssignment} entity.
   */
  purOrdAccountAssignment: PurchaseOrderAccountAssignment<T>[];
  /**
   * One-to-many navigation property to the {@link PurOrderItemPricingElement} entity.
   */
  purOrdPricingElement: PurOrderItemPricingElement<T>[];
  constructor(_entityApi: PurchaseOrderItemApi<T>);
}
export interface PurchaseOrderItemType<
  T extends DeSerializers = DefaultDeSerializers
> {
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  purchaseOrderCategory: DeserializedType<T, 'Edm.String'>;
  documentCurrency: DeserializedType<T, 'Edm.String'>;
  purchasingDocumentDeletionCode: DeserializedType<T, 'Edm.String'>;
  materialGroup: DeserializedType<T, 'Edm.String'>;
  material: DeserializedType<T, 'Edm.String'>;
  materialType: DeserializedType<T, 'Edm.String'>;
  supplierMaterialNumber: DeserializedType<T, 'Edm.String'>;
  supplierSubrange: DeserializedType<T, 'Edm.String'>;
  manufacturerPartNmbr: DeserializedType<T, 'Edm.String'>;
  manufacturer: DeserializedType<T, 'Edm.String'>;
  manufacturerMaterial: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItemText: DeserializedType<T, 'Edm.String'>;
  productTypeCode: DeserializedType<T, 'Edm.String'>;
  companyCode: DeserializedType<T, 'Edm.String'>;
  plant: DeserializedType<T, 'Edm.String'>;
  manualDeliveryAddressId: DeserializedType<T, 'Edm.String'>;
  referenceDeliveryAddressId: DeserializedType<T, 'Edm.String'>;
  customer: DeserializedType<T, 'Edm.String'>;
  subcontractor: DeserializedType<T, 'Edm.String'>;
  supplierIsSubcontractor: DeserializedType<T, 'Edm.Boolean'>;
  crossPlantConfigurableProduct: DeserializedType<T, 'Edm.String'>;
  articleCategory: DeserializedType<T, 'Edm.String'>;
  plndOrderReplnmtElmntType: DeserializedType<T, 'Edm.String'>;
  productPurchasePointsQtyUnit: DeserializedType<T, 'Edm.String'>;
  productPurchasePointsQty: DeserializedType<T, 'Edm.Decimal'>;
  storageLocation: DeserializedType<T, 'Edm.String'>;
  purchaseOrderQuantityUnit: DeserializedType<T, 'Edm.String'>;
  orderItemQtyToBaseQtyNmrtr: DeserializedType<T, 'Edm.Decimal'>;
  orderItemQtyToBaseQtyDnmntr: DeserializedType<T, 'Edm.Decimal'>;
  netPriceQuantity: DeserializedType<T, 'Edm.Decimal'>;
  isCompletelyDelivered: DeserializedType<T, 'Edm.Boolean'>;
  isFinallyInvoiced: DeserializedType<T, 'Edm.Boolean'>;
  goodsReceiptIsExpected: DeserializedType<T, 'Edm.Boolean'>;
  invoiceIsExpected: DeserializedType<T, 'Edm.Boolean'>;
  isOrderAcknRqd: DeserializedType<T, 'Edm.Boolean'>;
  invoiceIsGoodsReceiptBased: DeserializedType<T, 'Edm.Boolean'>;
  purchaseContract: DeserializedType<T, 'Edm.String'>;
  purchaseContractItem: DeserializedType<T, 'Edm.String'>;
  purchaseRequisition: DeserializedType<T, 'Edm.String'>;
  purchaseRequisitionItem: DeserializedType<T, 'Edm.String'>;
  requirementTracking: DeserializedType<T, 'Edm.String'>;
  supplierQuotation: DeserializedType<T, 'Edm.String'>;
  supplierQuotationItem: DeserializedType<T, 'Edm.String'>;
  evaldRcptSettlmtIsAllowed: DeserializedType<T, 'Edm.Boolean'>;
  unlimitedOverdeliveryIsAllowed: DeserializedType<T, 'Edm.Boolean'>;
  overdelivTolrtdLmtRatioInPct: DeserializedType<T, 'Edm.Decimal'>;
  underdelivTolrtdLmtRatioInPct: DeserializedType<T, 'Edm.Decimal'>;
  requisitionerName: DeserializedType<T, 'Edm.String'>;
  plannedDeliveryDurationInDays: DeserializedType<T, 'Edm.Decimal'>;
  goodsReceiptDurationInDays: DeserializedType<T, 'Edm.Decimal'>;
  partialDeliveryIsAllowed: DeserializedType<T, 'Edm.String'>;
  consumptionPosting: DeserializedType<T, 'Edm.String'>;
  servicePerformer: DeserializedType<T, 'Edm.String'>;
  servicePackage: DeserializedType<T, 'Edm.String'>;
  baseUnit: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItemCategory: DeserializedType<T, 'Edm.String'>;
  profitCenter: DeserializedType<T, 'Edm.String'>;
  orderPriceUnit: DeserializedType<T, 'Edm.String'>;
  itemVolumeUnit: DeserializedType<T, 'Edm.String'>;
  itemWeightUnit: DeserializedType<T, 'Edm.String'>;
  multipleAcctAssgmtDistribution: DeserializedType<T, 'Edm.String'>;
  partialInvoiceDistribution: DeserializedType<T, 'Edm.String'>;
  pricingDateControl: DeserializedType<T, 'Edm.String'>;
  isStatisticalItem: DeserializedType<T, 'Edm.Boolean'>;
  purchasingParentItem: DeserializedType<T, 'Edm.String'>;
  goodsReceiptLatestCreationDate?: DeserializedType<T, 'Edm.Date'> | null;
  isReturnsItem: DeserializedType<T, 'Edm.Boolean'>;
  purchasingOrderReason: DeserializedType<T, 'Edm.String'>;
  incotermsClassification: DeserializedType<T, 'Edm.String'>;
  incotermsTransferLocation: DeserializedType<T, 'Edm.String'>;
  incotermsLocation1: DeserializedType<T, 'Edm.String'>;
  incotermsLocation2: DeserializedType<T, 'Edm.String'>;
  priorSupplier: DeserializedType<T, 'Edm.String'>;
  internationalArticleNumber: DeserializedType<T, 'Edm.String'>;
  intrastatServiceCode: DeserializedType<T, 'Edm.String'>;
  commodityCode: DeserializedType<T, 'Edm.String'>;
  materialFreightGroup: DeserializedType<T, 'Edm.String'>;
  discountInKindEligibility: DeserializedType<T, 'Edm.String'>;
  purgItemIsBlockedForDelivery: DeserializedType<T, 'Edm.Boolean'>;
  supplierConfirmationControlKey: DeserializedType<T, 'Edm.String'>;
  purgDocOrderAcknNumber: DeserializedType<T, 'Edm.String'>;
  priceIsToBePrinted: DeserializedType<T, 'Edm.Boolean'>;
  accountAssignmentCategory: DeserializedType<T, 'Edm.String'>;
  purchasingInfoRecord: DeserializedType<T, 'Edm.String'>;
  netAmount: DeserializedType<T, 'Edm.Decimal'>;
  grossAmount: DeserializedType<T, 'Edm.Decimal'>;
  effectiveAmount: DeserializedType<T, 'Edm.Decimal'>;
  subtotal1Amount: DeserializedType<T, 'Edm.Decimal'>;
  subtotal2Amount: DeserializedType<T, 'Edm.Decimal'>;
  subtotal3Amount: DeserializedType<T, 'Edm.Decimal'>;
  subtotal4Amount: DeserializedType<T, 'Edm.Decimal'>;
  subtotal5Amount: DeserializedType<T, 'Edm.Decimal'>;
  subtotal6Amount: DeserializedType<T, 'Edm.Decimal'>;
  orderQuantity: DeserializedType<T, 'Edm.Decimal'>;
  netPriceAmount: DeserializedType<T, 'Edm.Decimal'>;
  itemVolume: DeserializedType<T, 'Edm.Decimal'>;
  itemGrossWeight: DeserializedType<T, 'Edm.Decimal'>;
  itemNetWeight: DeserializedType<T, 'Edm.Decimal'>;
  orderPriceUnitToOrderUnitNmrtr: DeserializedType<T, 'Edm.Decimal'>;
  ordPriceUnitToOrderUnitDnmntr: DeserializedType<T, 'Edm.Decimal'>;
  goodsReceiptIsNonValuated: DeserializedType<T, 'Edm.Boolean'>;
  isToBeAcceptedAtOrigin: DeserializedType<T, 'Edm.Boolean'>;
  taxCode: DeserializedType<T, 'Edm.String'>;
  taxJurisdiction: DeserializedType<T, 'Edm.String'>;
  taxCountry: DeserializedType<T, 'Edm.String'>;
  taxDeterminationDate?: DeserializedType<T, 'Edm.Date'> | null;
  shippingInstruction: DeserializedType<T, 'Edm.String'>;
  nonDeductibleInputTaxAmount: DeserializedType<T, 'Edm.Decimal'>;
  stockType: DeserializedType<T, 'Edm.String'>;
  valuationType: DeserializedType<T, 'Edm.String'>;
  valuationCategory: DeserializedType<T, 'Edm.String'>;
  itemIsRejectedBySupplier: DeserializedType<T, 'Edm.Boolean'>;
  purgDocPriceDate?: DeserializedType<T, 'Edm.Date'> | null;
  purchasingInfoRecordUpdateCode: DeserializedType<T, 'Edm.String'>;
  inventorySpecialStockType: DeserializedType<T, 'Edm.String'>;
  deliveryDocumentType: DeserializedType<T, 'Edm.String'>;
  issuingStorageLocation: DeserializedType<T, 'Edm.String'>;
  allocationTable: DeserializedType<T, 'Edm.String'>;
  allocationTableItem: DeserializedType<T, 'Edm.String'>;
  retailPromotion: DeserializedType<T, 'Edm.String'>;
  purgConfigurableItemNumber: DeserializedType<T, 'Edm.String'>;
  purgDocAggrgdSubitemCategory: DeserializedType<T, 'Edm.String'>;
  purgExternalSortNumber: DeserializedType<T, 'Edm.String'>;
  batch: DeserializedType<T, 'Edm.String'>;
  purchasingItemIsFreeOfCharge: DeserializedType<T, 'Edm.Boolean'>;
  downPaymentType: DeserializedType<T, 'Edm.String'>;
  downPaymentPercentageOfTotAmt: DeserializedType<T, 'Edm.Decimal'>;
  downPaymentAmount: DeserializedType<T, 'Edm.Decimal'>;
  downPaymentDueDate?: DeserializedType<T, 'Edm.Date'> | null;
  expectedOverallLimitAmount: DeserializedType<T, 'Edm.Decimal'>;
  overallLimitAmount: DeserializedType<T, 'Edm.Decimal'>;
  purContractForOverallLimit: DeserializedType<T, 'Edm.String'>;
  purContractItemForOverallLimit: DeserializedType<T, 'Edm.String'>;
  purgProdCmplncSupplierStatus: DeserializedType<T, 'Edm.String'>;
  purgProductMarketabilityStatus: DeserializedType<T, 'Edm.String'>;
  purgSafetyDataSheetStatus: DeserializedType<T, 'Edm.String'>;
  purgProdCmplncDngrsGoodsStatus: DeserializedType<T, 'Edm.String'>;
  brMaterialOrigin: DeserializedType<T, 'Edm.String'>;
  brMaterialUsage: DeserializedType<T, 'Edm.String'>;
  brCfopCategory: DeserializedType<T, 'Edm.String'>;
  brNcm: DeserializedType<T, 'Edm.String'>;
  consumptionTaxCtrlCode: DeserializedType<T, 'Edm.String'>;
  brIsProducedInHouse: DeserializedType<T, 'Edm.Boolean'>;
  productSeasonYear: DeserializedType<T, 'Edm.String'>;
  productSeason: DeserializedType<T, 'Edm.String'>;
  productCollection: DeserializedType<T, 'Edm.String'>;
  productTheme: DeserializedType<T, 'Edm.String'>;
  seasonCompletenessStatus: DeserializedType<T, 'Edm.String'>;
  shippingGroupRule: DeserializedType<T, 'Edm.String'>;
  shippingGroupNumber: DeserializedType<T, 'Edm.String'>;
  productCharacteristic1: DeserializedType<T, 'Edm.String'>;
  productCharacteristic2: DeserializedType<T, 'Edm.String'>;
  productCharacteristic3: DeserializedType<T, 'Edm.String'>;
  purgDocSubitemCategory: DeserializedType<T, 'Edm.String'>;
  diversionStatus: DeserializedType<T, 'Edm.String'>;
  referenceDocumentNumber: DeserializedType<T, 'Edm.String'>;
  referenceDocumentItem: DeserializedType<T, 'Edm.String'>;
  purchaseOrderReferenceType: DeserializedType<T, 'Edm.String'>;
  itemHasValueAddedService: DeserializedType<T, 'Edm.Boolean'>;
  valAddedSrvcParentItmNumber: DeserializedType<T, 'Edm.String'>;
  stockSegment: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  deliveryAddress?: PurOrderItemDeliveryAddressType<T> | null;
  purchaseOrder_1?: PurchaseOrderType<T> | null;
  purchaseOrderInvoicingPlan: PurchaseOrderInvoicingPlanType<T>[];
  purchaseOrderItemNote: PurchaseOrderItemNoteType<T>[];
  purchaseOrderScheduleLineTp: PurchaseOrderScheduleLineType<T>[];
  purOrdAccountAssignment: PurchaseOrderAccountAssignmentType<T>[];
  purOrdPricingElement: PurOrderItemPricingElementType<T>[];
}
