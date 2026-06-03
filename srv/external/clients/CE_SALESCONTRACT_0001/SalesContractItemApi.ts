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
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  CollectionField,
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export class SalesContractItemApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SalesContractItem<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ) {
    this.deSerializers = deSerializers;
  }

  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  public static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): SalesContractItemApi<DeSerializersT> {
    return new SalesContractItemApi(deSerializers);
  }

  private navigationPropertyFields!: {
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
  };

  _addNavigationProperties(
    linkedApis: [
      SlsContrItemPricingElementApi<DeSerializersT>,
      SalesContractItemTextApi<DeSerializersT>,
      SalesContractApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      ITEM_PRICING_ELEMENT: new OneToManyLink(
        '_ItemPricingElement',
        this,
        linkedApis[0]
      ),
      ITEM_TEXT: new OneToManyLink('_ItemText', this, linkedApis[1]),
      SALES_CONTRACT_1: new OneToOneLink('_SalesContract', this, linkedApis[2])
    };
    return this;
  }

  entityConstructor = SalesContractItem;

  requestBuilder(): SalesContractItemRequestBuilder<DeSerializersT> {
    return new SalesContractItemRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SalesContractItem<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<SalesContractItem<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<SalesContractItem<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<
    typeof SalesContractItem,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SalesContractItem,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link salesContract} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_CONTRACT: fieldBuilder.buildEdmTypeField(
          'SalesContract',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link salesContractItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_CONTRACT_ITEM: fieldBuilder.buildEdmTypeField(
          'SalesContractItem',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link higherLevelItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        HIGHER_LEVEL_ITEM: fieldBuilder.buildEdmTypeField(
          'HigherLevelItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link salesContractItemCategory} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_CONTRACT_ITEM_CATEGORY: fieldBuilder.buildEdmTypeField(
          'SalesContractItemCategory',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link salesContractItemText} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_CONTRACT_ITEM_TEXT: fieldBuilder.buildEdmTypeField(
          'SalesContractItemText',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link purchaseOrderByCustomer} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_BY_CUSTOMER: fieldBuilder.buildEdmTypeField(
          'PurchaseOrderByCustomer',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link product} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRODUCT: fieldBuilder.buildEdmTypeField('Product', 'Edm.String', false),
        /**
         * Static representation of the {@link productGroup} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRODUCT_GROUP: fieldBuilder.buildEdmTypeField(
          'ProductGroup',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link materialByCustomer} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MATERIAL_BY_CUSTOMER: fieldBuilder.buildEdmTypeField(
          'MaterialByCustomer',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link pricingDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRICING_DATE: fieldBuilder.buildEdmTypeField(
          'PricingDate',
          'Edm.Date',
          true
        ),
        /**
         * Static representation of the {@link billingDocumentDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BILLING_DOCUMENT_DATE: fieldBuilder.buildEdmTypeField(
          'BillingDocumentDate',
          'Edm.Date',
          true
        ),
        /**
         * Static representation of the {@link requestedQuantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REQUESTED_QUANTITY: fieldBuilder.buildEdmTypeField(
          'RequestedQuantity',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link requestedQuantitySapUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REQUESTED_QUANTITY_SAP_UNIT: fieldBuilder.buildEdmTypeField(
          'RequestedQuantitySAPUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link requestedQuantityIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REQUESTED_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'RequestedQuantityISOUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link targetToBaseQuantityDnmntr} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TARGET_TO_BASE_QUANTITY_DNMNTR: fieldBuilder.buildEdmTypeField(
          'TargetToBaseQuantityDnmntr',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link targetToBaseQuantityNmrtr} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TARGET_TO_BASE_QUANTITY_NMRTR: fieldBuilder.buildEdmTypeField(
          'TargetToBaseQuantityNmrtr',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link slsContrItemReleasedQuantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SLS_CONTR_ITEM_RELEASED_QUANTITY: fieldBuilder.buildEdmTypeField(
          'SlsContrItemReleasedQuantity',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link slsContrItmReldQuantitySapUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SLS_CONTR_ITM_RELD_QUANTITY_SAP_UNIT: fieldBuilder.buildEdmTypeField(
          'SlsContrItmReldQuantitySAPUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link slsContrItmReldQuantityIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SLS_CONTR_ITM_RELD_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'SlsContrItmReldQuantityISOUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link itemGrossWeight} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_GROSS_WEIGHT: fieldBuilder.buildEdmTypeField(
          'ItemGrossWeight',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link itemNetWeight} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_NET_WEIGHT: fieldBuilder.buildEdmTypeField(
          'ItemNetWeight',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link itemWeightSapUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_WEIGHT_SAP_UNIT: fieldBuilder.buildEdmTypeField(
          'ItemWeightSAPUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link itemWeightIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_WEIGHT_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'ItemWeightISOUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link itemVolume} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_VOLUME: fieldBuilder.buildEdmTypeField(
          'ItemVolume',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link itemVolumeSapUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_VOLUME_SAP_UNIT: fieldBuilder.buildEdmTypeField(
          'ItemVolumeSAPUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link itemVolumeIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_VOLUME_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'ItemVolumeISOUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link outlineAgreementTargetAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        OUTLINE_AGREEMENT_TARGET_AMOUNT: fieldBuilder.buildEdmTypeField(
          'OutlineAgreementTargetAmount',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link slsContractItemReleasedAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SLS_CONTRACT_ITEM_RELEASED_AMOUNT: fieldBuilder.buildEdmTypeField(
          'SlsContractItemReleasedAmount',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link transactionCurrency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TRANSACTION_CURRENCY: fieldBuilder.buildEdmTypeField(
          'TransactionCurrency',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link netAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NET_AMOUNT: fieldBuilder.buildEdmTypeField(
          'NetAmount',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link customerPriceGroup} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_PRICE_GROUP: fieldBuilder.buildEdmTypeField(
          'CustomerPriceGroup',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link productPricingGroup} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRODUCT_PRICING_GROUP: fieldBuilder.buildEdmTypeField(
          'ProductPricingGroup',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link batch} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BATCH: fieldBuilder.buildEdmTypeField('Batch', 'Edm.String', false),
        /**
         * Static representation of the {@link productionPlant} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRODUCTION_PLANT: fieldBuilder.buildEdmTypeField(
          'ProductionPlant',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link storageLocation} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STORAGE_LOCATION: fieldBuilder.buildEdmTypeField(
          'StorageLocation',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link shippingPoint} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SHIPPING_POINT: fieldBuilder.buildEdmTypeField(
          'ShippingPoint',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link shippingType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SHIPPING_TYPE: fieldBuilder.buildEdmTypeField(
          'ShippingType',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link route} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ROUTE: fieldBuilder.buildEdmTypeField('Route', 'Edm.String', false),
        /**
         * Static representation of the {@link overdelivTolrtdLmtRatioInPct} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        OVERDELIV_TOLRTD_LMT_RATIO_IN_PCT: fieldBuilder.buildEdmTypeField(
          'OverdelivTolrtdLmtRatioInPct',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link underdelivTolrtdLmtRatioInPct} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UNDERDELIV_TOLRTD_LMT_RATIO_IN_PCT: fieldBuilder.buildEdmTypeField(
          'UnderdelivTolrtdLmtRatioInPct',
          'Edm.Decimal',
          false
        ),
        /**
         * Static representation of the {@link incotermsClassification} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_CLASSIFICATION: fieldBuilder.buildEdmTypeField(
          'IncotermsClassification',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link incotermsTransferLocation} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_TRANSFER_LOCATION: fieldBuilder.buildEdmTypeField(
          'IncotermsTransferLocation',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link incotermsLocation1} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_LOCATION_1: fieldBuilder.buildEdmTypeField(
          'IncotermsLocation1',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link incotermsLocation2} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INCOTERMS_LOCATION_2: fieldBuilder.buildEdmTypeField(
          'IncotermsLocation2',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link customerPaymentTerms} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_PAYMENT_TERMS: fieldBuilder.buildEdmTypeField(
          'CustomerPaymentTerms',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link salesDocumentRjcnReason} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_DOCUMENT_RJCN_REASON: fieldBuilder.buildEdmTypeField(
          'SalesDocumentRjcnReason',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link itemBillingBlockReason} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_BILLING_BLOCK_REASON: fieldBuilder.buildEdmTypeField(
          'ItemBillingBlockReason',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link profitCenter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROFIT_CENTER: fieldBuilder.buildEdmTypeField(
          'ProfitCenter',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link sdProcessStatus} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SD_PROCESS_STATUS: fieldBuilder.buildEdmTypeField(
          'SDProcessStatus',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link sapMessages} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SAP_MESSAGES: fieldBuilder.buildCollectionField(
          'SAP__Messages',
          Sap_Message,
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SalesContractItem)
      };
    }

    return this._schema;
  }
}
