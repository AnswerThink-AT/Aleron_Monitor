"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesContractItemApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SalesContractItem_1 = require("./SalesContractItem");
const SalesContractItemRequestBuilder_1 = require("./SalesContractItemRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class SalesContractItemApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = SalesContractItem_1.SalesContractItem;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new SalesContractItemApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            ITEM_PRICING_ELEMENT: new odata_v4_1.OneToManyLink('_ItemPricingElement', this, linkedApis[0]),
            ITEM_TEXT: new odata_v4_1.OneToManyLink('_ItemText', this, linkedApis[1]),
            SALES_CONTRACT_1: new odata_v4_1.OneToOneLink('_SalesContract', this, linkedApis[2])
        };
        return this;
    }
    requestBuilder() {
        return new SalesContractItemRequestBuilder_1.SalesContractItemRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(SalesContractItem_1.SalesContractItem, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link salesContract} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_CONTRACT: fieldBuilder.buildEdmTypeField('SalesContract', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesContractItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_CONTRACT_ITEM: fieldBuilder.buildEdmTypeField('SalesContractItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link higherLevelItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                HIGHER_LEVEL_ITEM: fieldBuilder.buildEdmTypeField('HigherLevelItem', 'Edm.String', true),
                /**
                 * Static representation of the {@link salesContractItemCategory} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_CONTRACT_ITEM_CATEGORY: fieldBuilder.buildEdmTypeField('SalesContractItemCategory', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesContractItemText} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_CONTRACT_ITEM_TEXT: fieldBuilder.buildEdmTypeField('SalesContractItemText', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseOrderByCustomer} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_BY_CUSTOMER: fieldBuilder.buildEdmTypeField('PurchaseOrderByCustomer', 'Edm.String', false),
                /**
                 * Static representation of the {@link product} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRODUCT: fieldBuilder.buildEdmTypeField('Product', 'Edm.String', false),
                /**
                 * Static representation of the {@link productGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRODUCT_GROUP: fieldBuilder.buildEdmTypeField('ProductGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link materialByCustomer} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATERIAL_BY_CUSTOMER: fieldBuilder.buildEdmTypeField('MaterialByCustomer', 'Edm.String', false),
                /**
                 * Static representation of the {@link pricingDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_DATE: fieldBuilder.buildEdmTypeField('PricingDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link billingDocumentDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BILLING_DOCUMENT_DATE: fieldBuilder.buildEdmTypeField('BillingDocumentDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link requestedQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REQUESTED_QUANTITY: fieldBuilder.buildEdmTypeField('RequestedQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link requestedQuantitySapUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REQUESTED_QUANTITY_SAP_UNIT: fieldBuilder.buildEdmTypeField('RequestedQuantitySAPUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link requestedQuantityIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REQUESTED_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField('RequestedQuantityISOUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link targetToBaseQuantityDnmntr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TARGET_TO_BASE_QUANTITY_DNMNTR: fieldBuilder.buildEdmTypeField('TargetToBaseQuantityDnmntr', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link targetToBaseQuantityNmrtr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TARGET_TO_BASE_QUANTITY_NMRTR: fieldBuilder.buildEdmTypeField('TargetToBaseQuantityNmrtr', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link slsContrItemReleasedQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SLS_CONTR_ITEM_RELEASED_QUANTITY: fieldBuilder.buildEdmTypeField('SlsContrItemReleasedQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link slsContrItmReldQuantitySapUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SLS_CONTR_ITM_RELD_QUANTITY_SAP_UNIT: fieldBuilder.buildEdmTypeField('SlsContrItmReldQuantitySAPUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link slsContrItmReldQuantityIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SLS_CONTR_ITM_RELD_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField('SlsContrItmReldQuantityISOUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link itemGrossWeight} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_GROSS_WEIGHT: fieldBuilder.buildEdmTypeField('ItemGrossWeight', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link itemNetWeight} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_NET_WEIGHT: fieldBuilder.buildEdmTypeField('ItemNetWeight', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link itemWeightSapUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_WEIGHT_SAP_UNIT: fieldBuilder.buildEdmTypeField('ItemWeightSAPUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link itemWeightIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_WEIGHT_ISO_UNIT: fieldBuilder.buildEdmTypeField('ItemWeightISOUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link itemVolume} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_VOLUME: fieldBuilder.buildEdmTypeField('ItemVolume', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link itemVolumeSapUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_VOLUME_SAP_UNIT: fieldBuilder.buildEdmTypeField('ItemVolumeSAPUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link itemVolumeIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_VOLUME_ISO_UNIT: fieldBuilder.buildEdmTypeField('ItemVolumeISOUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link outlineAgreementTargetAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OUTLINE_AGREEMENT_TARGET_AMOUNT: fieldBuilder.buildEdmTypeField('OutlineAgreementTargetAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link slsContractItemReleasedAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SLS_CONTRACT_ITEM_RELEASED_AMOUNT: fieldBuilder.buildEdmTypeField('SlsContractItemReleasedAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link transactionCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TRANSACTION_CURRENCY: fieldBuilder.buildEdmTypeField('TransactionCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link netAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NET_AMOUNT: fieldBuilder.buildEdmTypeField('NetAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link customerPriceGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_PRICE_GROUP: fieldBuilder.buildEdmTypeField('CustomerPriceGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link productPricingGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRODUCT_PRICING_GROUP: fieldBuilder.buildEdmTypeField('ProductPricingGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link batch} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BATCH: fieldBuilder.buildEdmTypeField('Batch', 'Edm.String', false),
                /**
                 * Static representation of the {@link productionPlant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRODUCTION_PLANT: fieldBuilder.buildEdmTypeField('ProductionPlant', 'Edm.String', false),
                /**
                 * Static representation of the {@link storageLocation} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STORAGE_LOCATION: fieldBuilder.buildEdmTypeField('StorageLocation', 'Edm.String', false),
                /**
                 * Static representation of the {@link shippingPoint} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SHIPPING_POINT: fieldBuilder.buildEdmTypeField('ShippingPoint', 'Edm.String', false),
                /**
                 * Static representation of the {@link shippingType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SHIPPING_TYPE: fieldBuilder.buildEdmTypeField('ShippingType', 'Edm.String', false),
                /**
                 * Static representation of the {@link route} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ROUTE: fieldBuilder.buildEdmTypeField('Route', 'Edm.String', false),
                /**
                 * Static representation of the {@link overdelivTolrtdLmtRatioInPct} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERDELIV_TOLRTD_LMT_RATIO_IN_PCT: fieldBuilder.buildEdmTypeField('OverdelivTolrtdLmtRatioInPct', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link underdelivTolrtdLmtRatioInPct} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UNDERDELIV_TOLRTD_LMT_RATIO_IN_PCT: fieldBuilder.buildEdmTypeField('UnderdelivTolrtdLmtRatioInPct', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link incotermsClassification} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_CLASSIFICATION: fieldBuilder.buildEdmTypeField('IncotermsClassification', 'Edm.String', false),
                /**
                 * Static representation of the {@link incotermsTransferLocation} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_TRANSFER_LOCATION: fieldBuilder.buildEdmTypeField('IncotermsTransferLocation', 'Edm.String', false),
                /**
                 * Static representation of the {@link incotermsLocation1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_LOCATION_1: fieldBuilder.buildEdmTypeField('IncotermsLocation1', 'Edm.String', false),
                /**
                 * Static representation of the {@link incotermsLocation2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_LOCATION_2: fieldBuilder.buildEdmTypeField('IncotermsLocation2', 'Edm.String', false),
                /**
                 * Static representation of the {@link customerPaymentTerms} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_PAYMENT_TERMS: fieldBuilder.buildEdmTypeField('CustomerPaymentTerms', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesDocumentRjcnReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_DOCUMENT_RJCN_REASON: fieldBuilder.buildEdmTypeField('SalesDocumentRjcnReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link itemBillingBlockReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_BILLING_BLOCK_REASON: fieldBuilder.buildEdmTypeField('ItemBillingBlockReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link profitCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROFIT_CENTER: fieldBuilder.buildEdmTypeField('ProfitCenter', 'Edm.String', false),
                /**
                 * Static representation of the {@link sdProcessStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SD_PROCESS_STATUS: fieldBuilder.buildEdmTypeField('SDProcessStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link sapMessages} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SAP_MESSAGES: fieldBuilder.buildCollectionField('SAP__Messages', Sap_Message_1.Sap_Message, false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', SalesContractItem_1.SalesContractItem)
            };
        }
        return this._schema;
    }
}
exports.SalesContractItemApi = SalesContractItemApi;
//# sourceMappingURL=SalesContractItemApi.js.map