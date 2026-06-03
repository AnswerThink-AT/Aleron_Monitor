"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurOrderItemPricingElementApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PurOrderItemPricingElement_1 = require("./PurOrderItemPricingElement");
const PurOrderItemPricingElementRequestBuilder_1 = require("./PurOrderItemPricingElementRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class PurOrderItemPricingElementApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = PurOrderItemPricingElement_1.PurOrderItemPricingElement;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new PurOrderItemPricingElementApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            PURCHASE_ORDER_1: new odata_v4_1.OneToOneLink('_PurchaseOrder', this, linkedApis[0]),
            PURCHASE_ORDER_ITEM_1: new odata_v4_1.OneToOneLink('_PurchaseOrderItem', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new PurOrderItemPricingElementRequestBuilder_1.PurOrderItemPricingElementRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(PurOrderItemPricingElement_1.PurOrderItemPricingElement, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link purchaseOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER: fieldBuilder.buildEdmTypeField('PurchaseOrder', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseOrderItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_ITEM: fieldBuilder.buildEdmTypeField('PurchaseOrderItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link pricingDocument} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_DOCUMENT: fieldBuilder.buildEdmTypeField('PricingDocument', 'Edm.String', false),
                /**
                 * Static representation of the {@link pricingDocumentItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_DOCUMENT_ITEM: fieldBuilder.buildEdmTypeField('PricingDocumentItem', 'Edm.String', false),
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
                 * Static representation of the {@link conditionApplication} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_APPLICATION: fieldBuilder.buildEdmTypeField('ConditionApplication', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_TYPE: fieldBuilder.buildEdmTypeField('ConditionType', 'Edm.String', false),
                /**
                 * Static representation of the {@link priceConditionDeterminationDte} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICE_CONDITION_DETERMINATION_DTE: fieldBuilder.buildEdmTypeField('PriceConditionDeterminationDte', 'Edm.Date', true),
                /**
                 * Static representation of the {@link conditionCalculationType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_CALCULATION_TYPE: fieldBuilder.buildEdmTypeField('ConditionCalculationType', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionBaseAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_BASE_AMOUNT: fieldBuilder.buildEdmTypeField('ConditionBaseAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionBaseValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_BASE_VALUE: fieldBuilder.buildEdmTypeField('ConditionBaseValue', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionRateAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_AMOUNT: fieldBuilder.buildEdmTypeField('ConditionRateAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionRateRatio} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_RATIO: fieldBuilder.buildEdmTypeField('ConditionRateRatio', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionRateRatioUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_RATIO_UNIT: fieldBuilder.buildEdmTypeField('ConditionRateRatioUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_CURRENCY: fieldBuilder.buildEdmTypeField('ConditionCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link priceDetnExchangeRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICE_DETN_EXCHANGE_RATE: fieldBuilder.buildEdmTypeField('PriceDetnExchangeRate', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_QUANTITY: fieldBuilder.buildEdmTypeField('ConditionQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionQuantityUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField('ConditionQuantityUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionToBaseQtyNmrtr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_TO_BASE_QTY_NMRTR: fieldBuilder.buildEdmTypeField('ConditionToBaseQtyNmrtr', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionToBaseQtyDnmntr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_TO_BASE_QTY_DNMNTR: fieldBuilder.buildEdmTypeField('ConditionToBaseQtyDnmntr', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionCategory} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_CATEGORY: fieldBuilder.buildEdmTypeField('ConditionCategory', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionIsForStatistics} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_IS_FOR_STATISTICS: fieldBuilder.buildEdmTypeField('ConditionIsForStatistics', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link pricingScaleType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_SCALE_TYPE: fieldBuilder.buildEdmTypeField('PricingScaleType', 'Edm.String', false),
                /**
                 * Static representation of the {@link isRelevantForAccrual} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_RELEVANT_FOR_ACCRUAL: fieldBuilder.buildEdmTypeField('IsRelevantForAccrual', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link cndnIsRelevantForInvoiceList} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CNDN_IS_RELEVANT_FOR_INVOICE_LIST: fieldBuilder.buildEdmTypeField('CndnIsRelevantForInvoiceList', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link conditionOrigin} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_ORIGIN: fieldBuilder.buildEdmTypeField('ConditionOrigin', 'Edm.String', false),
                /**
                 * Static representation of the {@link isGroupCondition} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_GROUP_CONDITION: fieldBuilder.buildEdmTypeField('IsGroupCondition', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link accessNumberOfAccessSequence} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCESS_NUMBER_OF_ACCESS_SEQUENCE: fieldBuilder.buildEdmTypeField('AccessNumberOfAccessSequence', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionRecord} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RECORD: fieldBuilder.buildEdmTypeField('ConditionRecord', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionSequentialNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_SEQUENTIAL_NUMBER: fieldBuilder.buildEdmTypeField('ConditionSequentialNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link accountKeyForGlAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCOUNT_KEY_FOR_GL_ACCOUNT: fieldBuilder.buildEdmTypeField('AccountKeyForGLAccount', 'Edm.String', false),
                /**
                 * Static representation of the {@link glAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GL_ACCOUNT: fieldBuilder.buildEdmTypeField('GLAccount', 'Edm.String', false),
                /**
                 * Static representation of the {@link taxCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_CODE: fieldBuilder.buildEdmTypeField('TaxCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link acctKeyForAccrualsGlAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCT_KEY_FOR_ACCRUALS_GL_ACCOUNT: fieldBuilder.buildEdmTypeField('AcctKeyForAccrualsGLAccount', 'Edm.String', false),
                /**
                 * Static representation of the {@link accrualsGlAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCRUALS_GL_ACCOUNT: fieldBuilder.buildEdmTypeField('AccrualsGLAccount', 'Edm.String', false),
                /**
                 * Static representation of the {@link withholdingTaxCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WITHHOLDING_TAX_CODE: fieldBuilder.buildEdmTypeField('WithholdingTaxCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link freightSupplier} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FREIGHT_SUPPLIER: fieldBuilder.buildEdmTypeField('FreightSupplier', 'Edm.String', false),
                /**
                 * Static representation of the {@link cndnRoundingOffDiffAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CNDN_ROUNDING_OFF_DIFF_AMOUNT: fieldBuilder.buildEdmTypeField('CndnRoundingOffDiffAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_AMOUNT: fieldBuilder.buildEdmTypeField('ConditionAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link transactionCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TRANSACTION_CURRENCY: fieldBuilder.buildEdmTypeField('TransactionCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionControl} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_CONTROL: fieldBuilder.buildEdmTypeField('ConditionControl', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionInactiveReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_INACTIVE_REASON: fieldBuilder.buildEdmTypeField('ConditionInactiveReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionClass} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_CLASS: fieldBuilder.buildEdmTypeField('ConditionClass', 'Edm.String', false),
                /**
                 * Static representation of the {@link prcgProcedureCounterForHeader} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRCG_PROCEDURE_COUNTER_FOR_HEADER: fieldBuilder.buildEdmTypeField('PrcgProcedureCounterForHeader', 'Edm.String', false),
                /**
                 * Static representation of the {@link factorForConditionBasisValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FACTOR_FOR_CONDITION_BASIS_VALUE: fieldBuilder.buildEdmTypeField('FactorForConditionBasisValue', 'Edm.Double', false),
                /**
                 * Static representation of the {@link structureCondition} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRUCTURE_CONDITION: fieldBuilder.buildEdmTypeField('StructureCondition', 'Edm.String', false),
                /**
                 * Static representation of the {@link periodFactorForCndnBasisValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PERIOD_FACTOR_FOR_CNDN_BASIS_VALUE: fieldBuilder.buildEdmTypeField('PeriodFactorForCndnBasisValue', 'Edm.Double', false),
                /**
                 * Static representation of the {@link pricingScaleBasis} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_SCALE_BASIS: fieldBuilder.buildEdmTypeField('PricingScaleBasis', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionScaleBasisValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_SCALE_BASIS_VALUE: fieldBuilder.buildEdmTypeField('ConditionScaleBasisValue', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionScaleBasisUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_SCALE_BASIS_UNIT: fieldBuilder.buildEdmTypeField('ConditionScaleBasisUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionScaleBasisCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_SCALE_BASIS_CURRENCY: fieldBuilder.buildEdmTypeField('ConditionScaleBasisCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionAlternativeCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_ALTERNATIVE_CURRENCY: fieldBuilder.buildEdmTypeField('ConditionAlternativeCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionAmountInLocalCrcy} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_AMOUNT_IN_LOCAL_CRCY: fieldBuilder.buildEdmTypeField('ConditionAmountInLocalCrcy', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link cndnIsRelevantForIntcoBilling} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CNDN_IS_RELEVANT_FOR_INTCO_BILLING: fieldBuilder.buildEdmTypeField('CndnIsRelevantForIntcoBilling', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link conditionIsManuallyChanged} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_IS_MANUALLY_CHANGED: fieldBuilder.buildEdmTypeField('ConditionIsManuallyChanged', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link billingPriceSource} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BILLING_PRICE_SOURCE: fieldBuilder.buildEdmTypeField('BillingPriceSource', 'Edm.String', false),
                /**
                 * Static representation of the {@link taxJurisdictionLevel} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_JURISDICTION_LEVEL: fieldBuilder.buildEdmTypeField('TaxJurisdictionLevel', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionByteSequence} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_BYTE_SEQUENCE: fieldBuilder.buildEdmTypeField('ConditionByteSequence', 'Edm.Binary', false),
                /**
                 * Static representation of the {@link cndnIsRelevantForLimitValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CNDN_IS_RELEVANT_FOR_LIMIT_VALUE: fieldBuilder.buildEdmTypeField('CndnIsRelevantForLimitValue', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link conditionBasisLimitExceeded} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_BASIS_LIMIT_EXCEEDED: fieldBuilder.buildEdmTypeField('ConditionBasisLimitExceeded', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionAmountLimitExceeded} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_AMOUNT_LIMIT_EXCEEDED: fieldBuilder.buildEdmTypeField('ConditionAmountLimitExceeded', 'Edm.String', false),
                /**
                 * Static representation of the {@link cumulatedConditionBasisValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUMULATED_CONDITION_BASIS_VALUE: fieldBuilder.buildEdmTypeField('CumulatedConditionBasisValue', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link customerRebateRecipient} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_REBATE_RECIPIENT: fieldBuilder.buildEdmTypeField('CustomerRebateRecipient', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionIsForConfiguration} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_IS_FOR_CONFIGURATION: fieldBuilder.buildEdmTypeField('ConditionIsForConfiguration', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link variantCondition} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VARIANT_CONDITION: fieldBuilder.buildEdmTypeField('VariantCondition', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionAcctAssgmtRelevance} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_ACCT_ASSGMT_RELEVANCE: fieldBuilder.buildEdmTypeField('ConditionAcctAssgmtRelevance', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionMatrixMaintRelevance} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_MATRIX_MAINT_RELEVANCE: fieldBuilder.buildEdmTypeField('ConditionMatrixMaintRelevance', 'Edm.String', false),
                /**
                 * Static representation of the {@link configblParametersAndFormulas} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONFIGBL_PARAMETERS_AND_FORMULAS: fieldBuilder.buildEdmTypeField('ConfigblParametersAndFormulas', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link conditionAdjustedQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_ADJUSTED_QUANTITY: fieldBuilder.buildEdmTypeField('ConditionAdjustedQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link conditionTypeName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_TYPE_NAME: fieldBuilder.buildEdmTypeField('ConditionTypeName', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionBaseValueIntlUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_BASE_VALUE_INTL_UNIT: fieldBuilder.buildEdmTypeField('ConditionBaseValueIntlUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionBaseValueUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_BASE_VALUE_UNIT: fieldBuilder.buildEdmTypeField('ConditionBaseValueUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionRateValueIntlUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_VALUE_INTL_UNIT: fieldBuilder.buildEdmTypeField('ConditionRateValueIntlUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionRateValueUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_RATE_VALUE_UNIT: fieldBuilder.buildEdmTypeField('ConditionRateValueUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link taxCodeName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_CODE_NAME: fieldBuilder.buildEdmTypeField('TaxCodeName', 'Edm.String', false),
                /**
                 * Static representation of the {@link conditionIsDeletable} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONDITION_IS_DELETABLE: fieldBuilder.buildEdmTypeField('ConditionIsDeletable', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link pricingProcedure} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_PROCEDURE: fieldBuilder.buildEdmTypeField('PricingProcedure', 'Edm.String', false),
                /**
                 * Static representation of the {@link superordinateDocument} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPERORDINATE_DOCUMENT: fieldBuilder.buildEdmTypeField('SuperordinateDocument', 'Edm.String', false),
                /**
                 * Static representation of the {@link superordinateDocumentItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPERORDINATE_DOCUMENT_ITEM: fieldBuilder.buildEdmTypeField('SuperordinateDocumentItem', 'Edm.String', false),
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
                ALL_FIELDS: new odata_v4_1.AllFields('*', PurOrderItemPricingElement_1.PurOrderItemPricingElement)
            };
        }
        return this._schema;
    }
}
exports.PurOrderItemPricingElementApi = PurOrderItemPricingElementApi;
//# sourceMappingURL=PurOrderItemPricingElementApi.js.map