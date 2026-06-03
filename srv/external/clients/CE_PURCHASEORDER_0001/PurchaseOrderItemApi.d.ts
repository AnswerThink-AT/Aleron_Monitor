/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurchaseOrderItem } from './PurchaseOrderItem';
import { PurchaseOrderItemRequestBuilder } from './PurchaseOrderItemRequestBuilder';
import { PurOrderItemDeliveryAddressApi } from './PurOrderItemDeliveryAddressApi';
import { PurchaseOrderApi } from './PurchaseOrderApi';
import { PurchaseOrderInvoicingPlanApi } from './PurchaseOrderInvoicingPlanApi';
import { PurchaseOrderItemNoteApi } from './PurchaseOrderItemNoteApi';
import { PurchaseOrderScheduleLineApi } from './PurchaseOrderScheduleLineApi';
import { PurchaseOrderAccountAssignmentApi } from './PurchaseOrderAccountAssignmentApi';
import { PurOrderItemPricingElementApi } from './PurOrderItemPricingElementApi';
import { Sap_Message } from './Sap_Message';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  CollectionField,
  OneToOneLink,
  OneToManyLink
} from '@sap-cloud-sdk/odata-v4';
export declare class PurchaseOrderItemApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<PurchaseOrderItem<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): PurchaseOrderItemApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      PurOrderItemDeliveryAddressApi<DeSerializersT>,
      PurchaseOrderApi<DeSerializersT>,
      PurchaseOrderInvoicingPlanApi<DeSerializersT>,
      PurchaseOrderItemNoteApi<DeSerializersT>,
      PurchaseOrderScheduleLineApi<DeSerializersT>,
      PurchaseOrderAccountAssignmentApi<DeSerializersT>,
      PurOrderItemPricingElementApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof PurchaseOrderItem;
  requestBuilder(): PurchaseOrderItemRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurchaseOrderItem<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<PurchaseOrderItem<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof PurchaseOrderItem, DeSerializersT>;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_DOCUMENT_DELETION_CODE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL_GROUP: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL_TYPE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_MATERIAL_NUMBER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_SUBRANGE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MANUFACTURER_PART_NMBR: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MANUFACTURER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MANUFACTURER_MATERIAL: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM_TEXT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_TYPE_CODE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PLANT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MANUAL_DELIVERY_ADDRESS_ID: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_DELIVERY_ADDRESS_ID: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUBCONTRACTOR: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_IS_SUBCONTRACTOR: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CROSS_PLANT_CONFIGURABLE_PRODUCT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ARTICLE_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PLND_ORDER_REPLNMT_ELMNT_TYPE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_PURCHASE_POINTS_QTY_UNIT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_PURCHASE_POINTS_QTY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    STORAGE_LOCATION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_QUANTITY_UNIT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDER_ITEM_QTY_TO_BASE_QTY_NMRTR: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ORDER_ITEM_QTY_TO_BASE_QTY_DNMNTR: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    NET_PRICE_QUANTITY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    IS_COMPLETELY_DELIVERED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    IS_FINALLY_INVOICED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    GOODS_RECEIPT_IS_EXPECTED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    INVOICE_IS_EXPECTED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    IS_ORDER_ACKN_RQD: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    INVOICE_IS_GOODS_RECEIPT_BASED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PURCHASE_CONTRACT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_CONTRACT_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_REQUISITION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_REQUISITION_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REQUIREMENT_TRACKING: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_QUOTATION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_QUOTATION_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    EVALD_RCPT_SETTLMT_IS_ALLOWED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    UNLIMITED_OVERDELIVERY_IS_ALLOWED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    OVERDELIV_TOLRTD_LMT_RATIO_IN_PCT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    UNDERDELIV_TOLRTD_LMT_RATIO_IN_PCT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    REQUISITIONER_NAME: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PLANNED_DELIVERY_DURATION_IN_DAYS: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    GOODS_RECEIPT_DURATION_IN_DAYS: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    PARTIAL_DELIVERY_IS_ALLOWED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONSUMPTION_POSTING: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SERVICE_PERFORMER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SERVICE_PACKAGE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BASE_UNIT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDER_PRICE_UNIT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_VOLUME_UNIT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_WEIGHT_UNIT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MULTIPLE_ACCT_ASSGMT_DISTRIBUTION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PARTIAL_INVOICE_DISTRIBUTION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_DATE_CONTROL: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IS_STATISTICAL_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PURCHASING_PARENT_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    GOODS_RECEIPT_LATEST_CREATION_DATE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    IS_RETURNS_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PURCHASING_ORDER_REASON: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_CLASSIFICATION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_TRANSFER_LOCATION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_1: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_2: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRIOR_SUPPLIER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INTERNATIONAL_ARTICLE_NUMBER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INTRASTAT_SERVICE_CODE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMMODITY_CODE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL_FREIGHT_GROUP: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DISCOUNT_IN_KIND_ELIGIBILITY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_ITEM_IS_BLOCKED_FOR_DELIVERY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    SUPPLIER_CONFIRMATION_CONTROL_KEY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_DOC_ORDER_ACKN_NUMBER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICE_IS_TO_BE_PRINTED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    ACCOUNT_ASSIGNMENT_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_INFO_RECORD: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    NET_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    GROSS_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    EFFECTIVE_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SUBTOTAL_1_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SUBTOTAL_2_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SUBTOTAL_3_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SUBTOTAL_4_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SUBTOTAL_5_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SUBTOTAL_6_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ORDER_QUANTITY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    NET_PRICE_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_VOLUME: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_GROSS_WEIGHT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_NET_WEIGHT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ORDER_PRICE_UNIT_TO_ORDER_UNIT_NMRTR: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ORD_PRICE_UNIT_TO_ORDER_UNIT_DNMNTR: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    GOODS_RECEIPT_IS_NON_VALUATED: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    IS_TO_BE_ACCEPTED_AT_ORIGIN: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    SHIPPING_INSTRUCTION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    NON_DEDUCTIBLE_INPUT_TAX_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    STOCK_TYPE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VALUATION_TYPE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VALUATION_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_IS_REJECTED_BY_SUPPLIER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PURG_DOC_PRICE_DATE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    PURCHASING_INFO_RECORD_UPDATE_CODE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INVENTORY_SPECIAL_STOCK_TYPE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_DOCUMENT_TYPE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ISSUING_STORAGE_LOCATION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALLOCATION_TABLE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALLOCATION_TABLE_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    RETAIL_PROMOTION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_CONFIGURABLE_ITEM_NUMBER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_DOC_AGGRGD_SUBITEM_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_EXTERNAL_SORT_NUMBER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BATCH: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_ITEM_IS_FREE_OF_CHARGE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    DOWN_PAYMENT_TYPE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DOWN_PAYMENT_PERCENTAGE_OF_TOT_AMT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    DOWN_PAYMENT_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    DOWN_PAYMENT_DUE_DATE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    EXPECTED_OVERALL_LIMIT_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    OVERALL_LIMIT_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    PUR_CONTRACT_FOR_OVERALL_LIMIT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PUR_CONTRACT_ITEM_FOR_OVERALL_LIMIT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_PROD_CMPLNC_SUPPLIER_STATUS: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_PRODUCT_MARKETABILITY_STATUS: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_SAFETY_DATA_SHEET_STATUS: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_PROD_CMPLNC_DNGRS_GOODS_STATUS: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BR_MATERIAL_ORIGIN: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BR_MATERIAL_USAGE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BR_CFOP_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BR_NCM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONSUMPTION_TAX_CTRL_CODE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BR_IS_PRODUCED_IN_HOUSE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PRODUCT_SEASON_YEAR: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_SEASON: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_COLLECTION: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_THEME: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SEASON_COMPLETENESS_STATUS: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SHIPPING_GROUP_RULE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SHIPPING_GROUP_NUMBER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_CHARACTERISTIC_1: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_CHARACTERISTIC_2: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_CHARACTERISTIC_3: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_DOC_SUBITEM_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DIVERSION_STATUS: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_DOCUMENT_NUMBER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_DOCUMENT_ITEM: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_REFERENCE_TYPE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_HAS_VALUE_ADDED_SERVICE: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    VAL_ADDED_SRVC_PARENT_ITM_NUMBER: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STOCK_SEGMENT: OrderableEdmTypeField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PurchaseOrderItem<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link deliveryAddress} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    DELIVERY_ADDRESS: OneToOneLink<
      PurchaseOrderItem<DeSerializersT>,
      DeSerializersT,
      PurOrderItemDeliveryAddressApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrder_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_1: OneToOneLink<
      PurchaseOrderItem<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link purchaseOrderInvoicingPlan} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_INVOICING_PLAN: OneToManyLink<
      PurchaseOrderItem<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderInvoicingPlanApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link purchaseOrderItemNote} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_ITEM_NOTE: OneToManyLink<
      PurchaseOrderItem<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderItemNoteApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link purchaseOrderScheduleLineTp} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_SCHEDULE_LINE_TP: OneToManyLink<
      PurchaseOrderItem<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderScheduleLineApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link purOrdAccountAssignment} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PUR_ORD_ACCOUNT_ASSIGNMENT: OneToManyLink<
      PurchaseOrderItem<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderAccountAssignmentApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link purOrdPricingElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PUR_ORD_PRICING_ELEMENT: OneToManyLink<
      PurchaseOrderItem<DeSerializersT>,
      DeSerializersT,
      PurOrderItemPricingElementApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurchaseOrderItem<DeSerializers>>;
  };
}
