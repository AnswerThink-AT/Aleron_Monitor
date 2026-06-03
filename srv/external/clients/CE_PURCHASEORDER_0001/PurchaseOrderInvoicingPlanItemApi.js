"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderInvoicingPlanItemApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PurchaseOrderInvoicingPlanItem_1 = require("./PurchaseOrderInvoicingPlanItem");
const PurchaseOrderInvoicingPlanItemRequestBuilder_1 = require("./PurchaseOrderInvoicingPlanItemRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class PurchaseOrderInvoicingPlanItemApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = PurchaseOrderInvoicingPlanItem_1.PurchaseOrderInvoicingPlanItem;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new PurchaseOrderInvoicingPlanItemApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            PURCHASE_ORDER_1: new odata_v4_1.OneToOneLink('_PurchaseOrder', this, linkedApis[0]),
            PURCHASE_ORDER_INVOICING_PLAN: new odata_v4_1.OneToOneLink('_PurchaseOrderInvoicingPlan', this, linkedApis[1]),
            PURCHASE_ORDER_ITEM_1: new odata_v4_1.OneToOneLink('_PurchaseOrderItem', this, linkedApis[2])
        };
        return this;
    }
    requestBuilder() {
        return new PurchaseOrderInvoicingPlanItemRequestBuilder_1.PurchaseOrderInvoicingPlanItemRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(PurchaseOrderInvoicingPlanItem_1.PurchaseOrderInvoicingPlanItem, this.deSerializers);
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
                 * Static representation of the {@link invoicingPlanItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_ITEM: fieldBuilder.buildEdmTypeField('InvoicingPlanItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link invoicingPlan} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN: fieldBuilder.buildEdmTypeField('InvoicingPlan', 'Edm.String', false),
                /**
                 * Static representation of the {@link invoicingPlanSettlementFromDte} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_SETTLEMENT_FROM_DTE: fieldBuilder.buildEdmTypeField('InvoicingPlanSettlementFromDte', 'Edm.Date', true),
                /**
                 * Static representation of the {@link invoicingPlanSettlementToDte} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_SETTLEMENT_TO_DTE: fieldBuilder.buildEdmTypeField('InvoicingPlanSettlementToDte', 'Edm.Date', true),
                /**
                 * Static representation of the {@link invoicingPlanInvoicingDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_INVOICING_DATE: fieldBuilder.buildEdmTypeField('InvoicingPlanInvoicingDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link invoicingPlanAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_AMOUNT: fieldBuilder.buildEdmTypeField('InvoicingPlanAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link transactionCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TRANSACTION_CURRENCY: fieldBuilder.buildEdmTypeField('TransactionCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchasingOrganization} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_ORGANIZATION: fieldBuilder.buildEdmTypeField('PurchasingOrganization', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchasingGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_GROUP: fieldBuilder.buildEdmTypeField('PurchasingGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseOrderType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_TYPE: fieldBuilder.buildEdmTypeField('PurchaseOrderType', 'Edm.String', false),
                /**
                 * Static representation of the {@link plant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PLANT: fieldBuilder.buildEdmTypeField('Plant', 'Edm.String', false),
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
                ALL_FIELDS: new odata_v4_1.AllFields('*', PurchaseOrderInvoicingPlanItem_1.PurchaseOrderInvoicingPlanItem)
            };
        }
        return this._schema;
    }
}
exports.PurchaseOrderInvoicingPlanItemApi = PurchaseOrderInvoicingPlanItemApi;
//# sourceMappingURL=PurchaseOrderInvoicingPlanItemApi.js.map