/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SalesOrderItem } from './SalesOrderItem';
import { SalesOrderItemRequestBuilder } from './SalesOrderItemRequestBuilder';
import { SalesOrderItemPartnerApi } from './SalesOrderItemPartnerApi';
import { SalesOrderItemPricingElementApi } from './SalesOrderItemPricingElementApi';
import { SalesOrderItemTextApi } from './SalesOrderItemTextApi';
import { SalesOrderApi } from './SalesOrderApi';
import { SalesOrderScheduleLineApi } from './SalesOrderScheduleLineApi';
import { VariantConfigurationApi } from './VariantConfigurationApi';
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
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class SalesOrderItemApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SalesOrderItem<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SalesOrderItemApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      SalesOrderItemPartnerApi<DeSerializersT>,
      SalesOrderItemPricingElementApi<DeSerializersT>,
      SalesOrderItemTextApi<DeSerializersT>,
      SalesOrderApi<DeSerializersT>,
      SalesOrderScheduleLineApi<DeSerializersT>,
      VariantConfigurationApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof SalesOrderItem;
  requestBuilder(): SalesOrderItemRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SalesOrderItem<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<SalesOrderItem<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof SalesOrderItem, DeSerializersT>;
  private _schema?;
  get schema(): {
    SALES_ORDER: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_ITEM: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    HIGHER_LEVEL_ITEM: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SALES_ORDER_ITEM_CATEGORY: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_ITEM_TEXT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORIGINALLY_REQUESTED_MATERIAL: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_GROUP: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL_BY_CUSTOMER: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INTERNATIONAL_ARTICLE_NUMBER: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_BY_CUSTOMER: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONFD_DELIV_QTY_IN_ORDER_QTY_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ORDER_QUANTITY_SAP_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDER_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REQUESTED_QUANTITY: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    REQUESTED_QUANTITY_SAP_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REQUESTED_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_SD_DOCUMENT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_SD_DOCUMENT_ITEM: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_SD_DOCUMENT_CATEGORY: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_GROSS_WEIGHT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_NET_WEIGHT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_WEIGHT_SAP_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_WEIGHT_ISO_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_VOLUME: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_VOLUME_SAP_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_VOLUME_ISO_UNIT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REQUESTED_DELIVERY_DATE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    CONFIRMED_DELIVERY_DATE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    PRICING_DATE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    SERVICES_RENDERED_DATE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    BILLING_DOCUMENT_DATE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    NET_AMOUNT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    TRANSACTION_CURRENCY: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_AMOUNT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CUSTOMER_GROUP: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BATCH: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PLANT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STORAGE_LOCATION: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SHIPPING_POINT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SHIPPING_TYPE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ROUTE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_PRIORITY: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PARTIAL_DELIVERY_IS_ALLOWED: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MAX_NMBR_OF_PARTIAL_DELIVERY: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    DELIVERY_DATE_TYPE_RULE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    RECEIVING_POINT: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_GROUP: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_CLASSIFICATION: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_1: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_2: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_VERSION: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PAYMENT_TERMS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FIXED_VALUE_DATE: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    CUSTOMER_PRICE_GROUP: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL_PRICING_GROUP: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BUSINESS_AREA: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATL_ACCOUNT_ASSIGNMENT_GROUP: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    WBS_ELEMENT_EXTERNAL_ID: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_BILLING_BLOCK_REASON: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_DOCUMENT_RJCN_REASON: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_CONFIGURATION: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SD_PROCESS_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SD_DOCUMENT_REJECTION_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BILLING_BLOCK_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_GENERAL_INCOMPLETION_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_BLOCK_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SLS_ORDER_ITEM_DOWN_PAYMENT_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDER_RELATED_BILLING_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CHML_CMPLNC_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DANGEROUS_GOODS_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAFETY_DATA_SHEET_STATUS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TRD_CMPLNC_EMBARGO_STS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TRD_CMPLNC_SNCTND_LIST_CHK_STS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVRL_TRD_CMPLNC_LEGAL_CTRL_CHK_STS: OrderableEdmTypeField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      SalesOrderItem<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link itemPartner} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ITEM_PARTNER: OneToManyLink<
      SalesOrderItem<DeSerializersT>,
      DeSerializersT,
      SalesOrderItemPartnerApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link itemPricingElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ITEM_PRICING_ELEMENT: OneToManyLink<
      SalesOrderItem<DeSerializersT>,
      DeSerializersT,
      SalesOrderItemPricingElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link itemText} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ITEM_TEXT: OneToManyLink<
      SalesOrderItem<DeSerializersT>,
      DeSerializersT,
      SalesOrderItemTextApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link salesOrder_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SALES_ORDER_1: OneToOneLink<
      SalesOrderItem<DeSerializersT>,
      DeSerializersT,
      SalesOrderApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link scheduleLine} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SCHEDULE_LINE: OneToManyLink<
      SalesOrderItem<DeSerializersT>,
      DeSerializersT,
      SalesOrderScheduleLineApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link variantConfiguration} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    VARIANT_CONFIGURATION: OneToOneLink<
      SalesOrderItem<DeSerializersT>,
      DeSerializersT,
      VariantConfigurationApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SalesOrderItem<DeSerializers>>;
  };
}
