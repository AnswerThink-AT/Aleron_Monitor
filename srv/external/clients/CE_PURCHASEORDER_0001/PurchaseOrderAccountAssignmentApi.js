"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderAccountAssignmentApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PurchaseOrderAccountAssignment_1 = require("./PurchaseOrderAccountAssignment");
const PurchaseOrderAccountAssignmentRequestBuilder_1 = require("./PurchaseOrderAccountAssignmentRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class PurchaseOrderAccountAssignmentApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = PurchaseOrderAccountAssignment_1.PurchaseOrderAccountAssignment;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new PurchaseOrderAccountAssignmentApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            PURCHASE_ORDER_1: new odata_v4_1.OneToOneLink('_PurchaseOrder', this, linkedApis[0]),
            PURCHASE_ORDER_ITEM_1: new odata_v4_1.OneToOneLink('_PurchaseOrderItem', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new PurchaseOrderAccountAssignmentRequestBuilder_1.PurchaseOrderAccountAssignmentRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(PurchaseOrderAccountAssignment_1.PurchaseOrderAccountAssignment, this.deSerializers);
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
                 * Static representation of the {@link accountAssignmentNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCOUNT_ASSIGNMENT_NUMBER: fieldBuilder.buildEdmTypeField('AccountAssignmentNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link costCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COST_CENTER: fieldBuilder.buildEdmTypeField('CostCenter', 'Edm.String', false),
                /**
                 * Static representation of the {@link masterFixedAsset} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MASTER_FIXED_ASSET: fieldBuilder.buildEdmTypeField('MasterFixedAsset', 'Edm.String', false),
                /**
                 * Static representation of the {@link projectNetwork} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_NETWORK: fieldBuilder.buildEdmTypeField('ProjectNetwork', 'Edm.String', false),
                /**
                 * Static representation of the {@link networkActivity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NETWORK_ACTIVITY: fieldBuilder.buildEdmTypeField('NetworkActivity', 'Edm.String', false),
                /**
                 * Static representation of the {@link orderQuantityUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ORDER_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField('OrderQuantityUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link quantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                QUANTITY: fieldBuilder.buildEdmTypeField('Quantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link multipleAcctAssgmtDistrPercent} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MULTIPLE_ACCT_ASSGMT_DISTR_PERCENT: fieldBuilder.buildEdmTypeField('MultipleAcctAssgmtDistrPercent', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link documentCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField('DocumentCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link purgDocNetAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURG_DOC_NET_AMOUNT: fieldBuilder.buildEdmTypeField('PurgDocNetAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link isDeleted} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_DELETED: fieldBuilder.buildEdmTypeField('IsDeleted', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link glAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GL_ACCOUNT: fieldBuilder.buildEdmTypeField('GLAccount', 'Edm.String', false),
                /**
                 * Static representation of the {@link businessArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_AREA: fieldBuilder.buildEdmTypeField('BusinessArea', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER: fieldBuilder.buildEdmTypeField('SalesOrder', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrderItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_ITEM: fieldBuilder.buildEdmTypeField('SalesOrderItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrderScheduleLine} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_SCHEDULE_LINE: fieldBuilder.buildEdmTypeField('SalesOrderScheduleLine', 'Edm.String', false),
                /**
                 * Static representation of the {@link fixedAsset} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIXED_ASSET: fieldBuilder.buildEdmTypeField('FixedAsset', 'Edm.String', false),
                /**
                 * Static representation of the {@link orderId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ORDER_ID: fieldBuilder.buildEdmTypeField('OrderID', 'Edm.String', false),
                /**
                 * Static representation of the {@link unloadingPointName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UNLOADING_POINT_NAME: fieldBuilder.buildEdmTypeField('UnloadingPointName', 'Edm.String', false),
                /**
                 * Static representation of the {@link controllingArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONTROLLING_AREA: fieldBuilder.buildEdmTypeField('ControllingArea', 'Edm.String', false),
                /**
                 * Static representation of the {@link costObject} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COST_OBJECT: fieldBuilder.buildEdmTypeField('CostObject', 'Edm.String', false),
                /**
                 * Static representation of the {@link profitCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROFIT_CENTER: fieldBuilder.buildEdmTypeField('ProfitCenter', 'Edm.String', false),
                /**
                 * Static representation of the {@link wbsElementInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WBS_ELEMENT_INTERNAL_ID: fieldBuilder.buildEdmTypeField('WBSElementInternalID', 'Edm.String', false),
                /**
                 * Static representation of the {@link wbsElementExternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WBS_ELEMENT_EXTERNAL_ID: fieldBuilder.buildEdmTypeField('WBSElementExternalID', 'Edm.String', false),
                /**
                 * Static representation of the {@link projectNetworkInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_NETWORK_INTERNAL_ID: fieldBuilder.buildEdmTypeField('ProjectNetworkInternalID', 'Edm.String', false),
                /**
                 * Static representation of the {@link commitmentItemShortId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMMITMENT_ITEM_SHORT_ID: fieldBuilder.buildEdmTypeField('CommitmentItemShortID', 'Edm.String', false),
                /**
                 * Static representation of the {@link fundsCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNDS_CENTER: fieldBuilder.buildEdmTypeField('FundsCenter', 'Edm.String', false),
                /**
                 * Static representation of the {@link fund} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUND: fieldBuilder.buildEdmTypeField('Fund', 'Edm.String', false),
                /**
                 * Static representation of the {@link functionalArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FUNCTIONAL_AREA: fieldBuilder.buildEdmTypeField('FunctionalArea', 'Edm.String', false),
                /**
                 * Static representation of the {@link goodsRecipientName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GOODS_RECIPIENT_NAME: fieldBuilder.buildEdmTypeField('GoodsRecipientName', 'Edm.String', false),
                /**
                 * Static representation of the {@link isFinallyInvoiced} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_FINALLY_INVOICED: fieldBuilder.buildEdmTypeField('IsFinallyInvoiced', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link networkActivityInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NETWORK_ACTIVITY_INTERNAL_ID: fieldBuilder.buildEdmTypeField('NetworkActivityInternalID', 'Edm.String', false),
                /**
                 * Static representation of the {@link partnerAccountNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PARTNER_ACCOUNT_NUMBER: fieldBuilder.buildEdmTypeField('PartnerAccountNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link jointVentureRecoveryCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JOINT_VENTURE_RECOVERY_CODE: fieldBuilder.buildEdmTypeField('JointVentureRecoveryCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link settlementReferenceDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SETTLEMENT_REFERENCE_DATE: fieldBuilder.buildEdmTypeField('SettlementReferenceDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link orderInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ORDER_INTERNAL_ID: fieldBuilder.buildEdmTypeField('OrderInternalID', 'Edm.String', false),
                /**
                 * Static representation of the {@link orderIntBillOfOperationsItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ORDER_INT_BILL_OF_OPERATIONS_ITEM: fieldBuilder.buildEdmTypeField('OrderIntBillOfOperationsItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link taxCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_CODE: fieldBuilder.buildEdmTypeField('TaxCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link taxJurisdiction} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_JURISDICTION: fieldBuilder.buildEdmTypeField('TaxJurisdiction', 'Edm.String', false),
                /**
                 * Static representation of the {@link nonDeductibleInputTaxAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NON_DEDUCTIBLE_INPUT_TAX_AMOUNT: fieldBuilder.buildEdmTypeField('NonDeductibleInputTaxAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link costCtrActivityType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COST_CTR_ACTIVITY_TYPE: fieldBuilder.buildEdmTypeField('CostCtrActivityType', 'Edm.String', false),
                /**
                 * Static representation of the {@link businessProcess} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PROCESS: fieldBuilder.buildEdmTypeField('BusinessProcess', 'Edm.String', false),
                /**
                 * Static representation of the {@link grantId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GRANT_ID: fieldBuilder.buildEdmTypeField('GrantID', 'Edm.String', false),
                /**
                 * Static representation of the {@link budgetPeriod} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUDGET_PERIOD: fieldBuilder.buildEdmTypeField('BudgetPeriod', 'Edm.String', false),
                /**
                 * Static representation of the {@link earmarkedFundsDocument} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                EARMARKED_FUNDS_DOCUMENT: fieldBuilder.buildEdmTypeField('EarmarkedFundsDocument', 'Edm.String', false),
                /**
                 * Static representation of the {@link earmarkedFundsDocumentItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                EARMARKED_FUNDS_DOCUMENT_ITEM: fieldBuilder.buildEdmTypeField('EarmarkedFundsDocumentItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link validityDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VALIDITY_DATE: fieldBuilder.buildEdmTypeField('ValidityDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link chartOfAccounts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHART_OF_ACCOUNTS: fieldBuilder.buildEdmTypeField('ChartOfAccounts', 'Edm.String', false),
                /**
                 * Static representation of the {@link serviceDocumentType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SERVICE_DOCUMENT_TYPE: fieldBuilder.buildEdmTypeField('ServiceDocumentType', 'Edm.String', false),
                /**
                 * Static representation of the {@link serviceDocument} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SERVICE_DOCUMENT: fieldBuilder.buildEdmTypeField('ServiceDocument', 'Edm.String', false),
                /**
                 * Static representation of the {@link serviceDocumentItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SERVICE_DOCUMENT_ITEM: fieldBuilder.buildEdmTypeField('ServiceDocumentItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link creationDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CREATION_DATE: fieldBuilder.buildEdmTypeField('CreationDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link isAcctLineFinal} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_ACCT_LINE_FINAL: fieldBuilder.buildEdmTypeField('IsAcctLineFinal', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link acctLineFinalReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCT_LINE_FINAL_REASON: fieldBuilder.buildEdmTypeField('AcctLineFinalReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link companyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
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
                ALL_FIELDS: new odata_v4_1.AllFields('*', PurchaseOrderAccountAssignment_1.PurchaseOrderAccountAssignment)
            };
        }
        return this._schema;
    }
}
exports.PurchaseOrderAccountAssignmentApi = PurchaseOrderAccountAssignmentApi;
//# sourceMappingURL=PurchaseOrderAccountAssignmentApi.js.map