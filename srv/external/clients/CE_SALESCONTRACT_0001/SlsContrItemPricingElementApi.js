"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlsContrItemPricingElementApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SlsContrItemPricingElement_1 = require("./SlsContrItemPricingElement");
const SlsContrItemPricingElementRequestBuilder_1 = require("./SlsContrItemPricingElementRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class SlsContrItemPricingElementApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = SlsContrItemPricingElement_1.SlsContrItemPricingElement;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new SlsContrItemPricingElementApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            ITEM: new odata_v4_1.OneToOneLink('_Item', this, linkedApis[0]),
            SALES_CONTRACT_1: new odata_v4_1.OneToOneLink('_SalesContract', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new SlsContrItemPricingElementRequestBuilder_1.SlsContrItemPricingElementRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(SlsContrItemPricingElement_1.SlsContrItemPricingElement, this.deSerializers);
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
                 * Static representation of the {@link pricingProcedureStep} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_PROCEDURE_STEP: fieldBuilder.buildEdmTypeField('PricingProcedureStep', 'Edm.String', false),
                /**
                 * Static representation of the {@link pricingProcedureCounter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_PROCEDURE_COUNTER: fieldBuilder.buildEdmTypeField('PricingProcedureCounter', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_TYPE: fieldBuilder.buildEdmTypeField('ConditionType', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionCalculationType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_CALCULATION_TYPE: fieldBuilder.buildEdmTypeField('ConditionCalculationType', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionRateAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_AMOUNT: fieldBuilder.buildEdmTypeField('ConditionRateAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link conditionCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_CURRENCY: fieldBuilder.buildEdmTypeField('ConditionCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionRateRatio} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_RATIO: fieldBuilder.buildEdmTypeField('ConditionRateRatio', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link conditionRateRatioSapUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_RATIO_SAP_UNIT: fieldBuilder.buildEdmTypeField('ConditionRateRatioSAPUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionRateRatioIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_RATIO_ISO_UNIT: fieldBuilder.buildEdmTypeField('ConditionRateRatioISOUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_QUANTITY: fieldBuilder.buildEdmTypeField('ConditionQuantity', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link conditionQuantitySapUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_QUANTITY_SAP_UNIT: fieldBuilder.buildEdmTypeField('ConditionQuantitySAPUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionQuantityIsoUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField('ConditionQuantityISOUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_AMOUNT: fieldBuilder.buildEdmTypeField('ConditionAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link transactionCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TRANSACTION_CURRENCY: fieldBuilder.buildEdmTypeField('TransactionCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionBaseAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_BASE_AMOUNT: fieldBuilder.buildEdmTypeField('ConditionBaseAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link conditionBaseQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_BASE_QUANTITY: fieldBuilder.buildEdmTypeField('ConditionBaseQuantity', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link conditionInactiveReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_INACTIVE_REASON: fieldBuilder.buildEdmTypeField('ConditionInactiveReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionIsManuallyChanged} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_IS_MANUALLY_CHANGED: fieldBuilder.buildEdmTypeField('ConditionIsManuallyChanged', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link conditionIsForStatistics} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_IS_FOR_STATISTICS: fieldBuilder.buildEdmTypeField('ConditionIsForStatistics', 'Edm.Boolean', false),
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
                ALL_FIELDS: new odata_v4_1.AllFields('*', SlsContrItemPricingElement_1.SlsContrItemPricingElement)
            };
        }
        return this._schema;
    }
}
exports.SlsContrItemPricingElementApi = SlsContrItemPricingElementApi;
//# sourceMappingURL=SlsContrItemPricingElementApi.js.map