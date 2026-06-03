"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcItemAcctAssgmtApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SuplrInvcItemAcctAssgmt_1 = require("./SuplrInvcItemAcctAssgmt");
const SuplrInvcItemAcctAssgmtRequestBuilder_1 = require("./SuplrInvcItemAcctAssgmtRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SuplrInvcItemAcctAssgmtApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SuplrInvcItemAcctAssgmt_1.SuplrInvcItemAcctAssgmt;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new SuplrInvcItemAcctAssgmtApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SuplrInvcItemAcctAssgmtRequestBuilder_1.SuplrInvcItemAcctAssgmtRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(SuplrInvcItemAcctAssgmt_1.SuplrInvcItemAcctAssgmt, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link supplierInvoice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_INVOICE: fieldBuilder.buildEdmTypeField('SupplierInvoice', 'Edm.String', false),
                /**
                 * Static representation of the {@link fiscalYear} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FISCAL_YEAR: fieldBuilder.buildEdmTypeField('FiscalYear', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplierInvoiceItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_INVOICE_ITEM: fieldBuilder.buildEdmTypeField('SupplierInvoiceItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link ordinalNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ORDINAL_NUMBER: fieldBuilder.buildEdmTypeField('OrdinalNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link costCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COST_CENTER: fieldBuilder.buildEdmTypeField('CostCenter', 'Edm.String', true),
                /**
                 * Static representation of the {@link controllingArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONTROLLING_AREA: fieldBuilder.buildEdmTypeField('ControllingArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link businessArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_AREA: fieldBuilder.buildEdmTypeField('BusinessArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link profitCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROFIT_CENTER: fieldBuilder.buildEdmTypeField('ProfitCenter', 'Edm.String', true),
                /**
                 * Static representation of the {@link functionalArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNCTIONAL_AREA: fieldBuilder.buildEdmTypeField('FunctionalArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link glAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GL_ACCOUNT: fieldBuilder.buildEdmTypeField('GLAccount', 'Edm.String', true),
                /**
                 * Static representation of the {@link salesOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER: fieldBuilder.buildEdmTypeField('SalesOrder', 'Edm.String', true),
                /**
                 * Static representation of the {@link salesOrderItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_ITEM: fieldBuilder.buildEdmTypeField('SalesOrderItem', 'Edm.String', true),
                /**
                 * Static representation of the {@link costObject} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COST_OBJECT: fieldBuilder.buildEdmTypeField('CostObject', 'Edm.String', true),
                /**
                 * Static representation of the {@link costCtrActivityType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COST_CTR_ACTIVITY_TYPE: fieldBuilder.buildEdmTypeField('CostCtrActivityType', 'Edm.String', true),
                /**
                 * Static representation of the {@link businessProcess} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PROCESS: fieldBuilder.buildEdmTypeField('BusinessProcess', 'Edm.String', true),
                /**
                 * Static representation of the {@link wbsElement} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WBS_ELEMENT: fieldBuilder.buildEdmTypeField('WBSElement', 'Edm.String', true),
                /**
                 * Static representation of the {@link documentCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField('DocumentCurrency', 'Edm.String', true),
                /**
                 * Static representation of the {@link suplrInvcAcctAssignmentAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPLR_INVC_ACCT_ASSIGNMENT_AMOUNT: fieldBuilder.buildEdmTypeField('SuplrInvcAcctAssignmentAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link purchaseOrderQuantityUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField('PurchaseOrderQuantityUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link purchaseOrderQtyUnitSapCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_QTY_UNIT_SAP_CODE: fieldBuilder.buildEdmTypeField('PurchaseOrderQtyUnitSAPCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link purchaseOrderQtyUnitIsoCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_QTY_UNIT_ISO_CODE: fieldBuilder.buildEdmTypeField('PurchaseOrderQtyUnitISOCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link quantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                QUANTITY: fieldBuilder.buildEdmTypeField('Quantity', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link taxCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_CODE: fieldBuilder.buildEdmTypeField('TaxCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link accountAssignmentNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCOUNT_ASSIGNMENT_NUMBER: fieldBuilder.buildEdmTypeField('AccountAssignmentNumber', 'Edm.String', true),
                /**
                 * Static representation of the {@link accountAssignmentIsUnplanned} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCOUNT_ASSIGNMENT_IS_UNPLANNED: fieldBuilder.buildEdmTypeField('AccountAssignmentIsUnplanned', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link personnelNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PERSONNEL_NUMBER: fieldBuilder.buildEdmTypeField('PersonnelNumber', 'Edm.String', true),
                /**
                 * Static representation of the {@link workItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WORK_ITEM: fieldBuilder.buildEdmTypeField('WorkItem', 'Edm.String', true),
                /**
                 * Static representation of the {@link masterFixedAsset} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MASTER_FIXED_ASSET: fieldBuilder.buildEdmTypeField('MasterFixedAsset', 'Edm.String', true),
                /**
                 * Static representation of the {@link fixedAsset} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIXED_ASSET: fieldBuilder.buildEdmTypeField('FixedAsset', 'Edm.String', true),
                /**
                 * Static representation of the {@link debitCreditCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DEBIT_CREDIT_CODE: fieldBuilder.buildEdmTypeField('DebitCreditCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxJurisdiction} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_JURISDICTION: fieldBuilder.buildEdmTypeField('TaxJurisdiction', 'Edm.String', true),
                /**
                 * Static representation of the {@link internalOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INTERNAL_ORDER: fieldBuilder.buildEdmTypeField('InternalOrder', 'Edm.String', true),
                /**
                 * Static representation of the {@link projectNetworkInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_NETWORK_INTERNAL_ID: fieldBuilder.buildEdmTypeField('ProjectNetworkInternalID', 'Edm.String', true),
                /**
                 * Static representation of the {@link networkActivityInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NETWORK_ACTIVITY_INTERNAL_ID: fieldBuilder.buildEdmTypeField('NetworkActivityInternalID', 'Edm.String', true),
                /**
                 * Static representation of the {@link projectNetwork} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_NETWORK: fieldBuilder.buildEdmTypeField('ProjectNetwork', 'Edm.String', true),
                /**
                 * Static representation of the {@link networkActivity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NETWORK_ACTIVITY: fieldBuilder.buildEdmTypeField('NetworkActivity', 'Edm.String', true),
                /**
                 * Static representation of the {@link commitmentItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMMITMENT_ITEM: fieldBuilder.buildEdmTypeField('CommitmentItem', 'Edm.String', true),
                /**
                 * Static representation of the {@link fundsCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNDS_CENTER: fieldBuilder.buildEdmTypeField('FundsCenter', 'Edm.String', true),
                /**
                 * Static representation of the {@link fund} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUND: fieldBuilder.buildEdmTypeField('Fund', 'Edm.String', true),
                /**
                 * Static representation of the {@link grantId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GRANT_ID: fieldBuilder.buildEdmTypeField('GrantID', 'Edm.String', true),
                /**
                 * Static representation of the {@link partnerBusinessArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PARTNER_BUSINESS_AREA: fieldBuilder.buildEdmTypeField('PartnerBusinessArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link companyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link suplrInvcAccountAssignmentText} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPLR_INVC_ACCOUNT_ASSIGNMENT_TEXT: fieldBuilder.buildEdmTypeField('SuplrInvcAccountAssignmentText', 'Edm.String', true),
                /**
                 * Static representation of the {@link purchaseOrderPriceUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_PRICE_UNIT: fieldBuilder.buildEdmTypeField('PurchaseOrderPriceUnit', 'Edm.String', true),
                /**
                 * Static representation of the {@link purchaseOrderPriceUnitSapCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_PRICE_UNIT_SAP_CODE: fieldBuilder.buildEdmTypeField('PurchaseOrderPriceUnitSAPCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link purchaseOrderPriceUnitIsoCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_PRICE_UNIT_ISO_CODE: fieldBuilder.buildEdmTypeField('PurchaseOrderPriceUnitISOCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link quantityInPurchaseOrderUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                QUANTITY_IN_PURCHASE_ORDER_UNIT: fieldBuilder.buildEdmTypeField('QuantityInPurchaseOrderUnit', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link profitabilitySegment} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROFITABILITY_SEGMENT: fieldBuilder.buildEdmTypeField('ProfitabilitySegment', 'Edm.String', true),
                /**
                 * Static representation of the {@link budgetPeriod} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUDGET_PERIOD: fieldBuilder.buildEdmTypeField('BudgetPeriod', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_COUNTRY: fieldBuilder.buildEdmTypeField('TaxCountry', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxDeterminationDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_DETERMINATION_DATE: fieldBuilder.buildEdmTypeField('TaxDeterminationDate', 'Edm.DateTime', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', SuplrInvcItemAcctAssgmt_1.SuplrInvcItemAcctAssgmt)
            };
        }
        return this._schema;
    }
}
exports.SuplrInvcItemAcctAssgmtApi = SuplrInvcItemAcctAssgmtApi;
//# sourceMappingURL=SuplrInvcItemAcctAssgmtApi.js.map