/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SalesContractItem } from './SalesContractItem';
import { SalesContractItemRequestBuilder } from './SalesContractItemRequestBuilder';
import { SlsContrItemPricingElementApi } from './SlsContrItemPricingElementApi';
import { SalesContractItemTextApi } from './SalesContractItemTextApi';
import { SalesContractApi } from './SalesContractApi';
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
export declare class SalesContractItemApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SalesContractItem<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SalesContractItemApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      SlsContrItemPricingElementApi<DeSerializersT>,
      SalesContractItemTextApi<DeSerializersT>,
      SalesContractApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof SalesContractItem;
  requestBuilder(): SalesContractItemRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SalesContractItem<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<SalesContractItem<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof SalesContractItem, DeSerializersT>;
  private _schema?;
  get schema(): {
    SALES_CONTRACT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_CONTRACT_ITEM: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    HIGHER_LEVEL_ITEM: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SALES_CONTRACT_ITEM_CATEGORY: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_CONTRACT_ITEM_TEXT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_BY_CUSTOMER: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_GROUP: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL_BY_CUSTOMER: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_DATE: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    BILLING_DOCUMENT_DATE: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    REQUESTED_QUANTITY: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    REQUESTED_QUANTITY_SAP_UNIT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REQUESTED_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TARGET_TO_BASE_QUANTITY_DNMNTR: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    TARGET_TO_BASE_QUANTITY_NMRTR: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SLS_CONTR_ITEM_RELEASED_QUANTITY: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SLS_CONTR_ITM_RELD_QUANTITY_SAP_UNIT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SLS_CONTR_ITM_RELD_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_GROSS_WEIGHT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_NET_WEIGHT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_WEIGHT_SAP_UNIT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_WEIGHT_ISO_UNIT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_VOLUME: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ITEM_VOLUME_SAP_UNIT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_VOLUME_ISO_UNIT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OUTLINE_AGREEMENT_TARGET_AMOUNT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SLS_CONTRACT_ITEM_RELEASED_AMOUNT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    TRANSACTION_CURRENCY: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    NET_AMOUNT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CUSTOMER_PRICE_GROUP: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_PRICING_GROUP: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BATCH: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCTION_PLANT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STORAGE_LOCATION: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SHIPPING_POINT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SHIPPING_TYPE: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ROUTE: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERDELIV_TOLRTD_LMT_RATIO_IN_PCT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    UNDERDELIV_TOLRTD_LMT_RATIO_IN_PCT: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    INCOTERMS_CLASSIFICATION: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_TRANSFER_LOCATION: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_1: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_2: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PAYMENT_TERMS: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_DOCUMENT_RJCN_REASON: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ITEM_BILLING_BLOCK_REASON: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SD_PROCESS_STATUS: OrderableEdmTypeField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      SalesContractItem<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link itemPricingElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ITEM_PRICING_ELEMENT: OneToManyLink<
      SalesContractItem<DeSerializersT>,
      DeSerializersT,
      SlsContrItemPricingElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link itemText} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ITEM_TEXT: OneToManyLink<
      SalesContractItem<DeSerializersT>,
      DeSerializersT,
      SalesContractItemTextApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link salesContract_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SALES_CONTRACT_1: OneToOneLink<
      SalesContractItem<DeSerializersT>,
      DeSerializersT,
      SalesContractApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SalesContractItem<DeSerializers>>;
  };
}
