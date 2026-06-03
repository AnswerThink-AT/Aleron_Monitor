"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderInvoicingPlanApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PurchaseOrderInvoicingPlan_1 = require("./PurchaseOrderInvoicingPlan");
const PurchaseOrderInvoicingPlanRequestBuilder_1 = require("./PurchaseOrderInvoicingPlanRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class PurchaseOrderInvoicingPlanApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = PurchaseOrderInvoicingPlan_1.PurchaseOrderInvoicingPlan;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new PurchaseOrderInvoicingPlanApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            PO_INVOICING_PLAN_ITEM: new odata_v4_1.OneToManyLink('_POInvoicingPlanItem', this, linkedApis[0]),
            PURCHASE_ORDER_1: new odata_v4_1.OneToOneLink('_PurchaseOrder', this, linkedApis[1]),
            PURCHASE_ORDER_ITEM_1: new odata_v4_1.OneToOneLink('_PurchaseOrderItem', this, linkedApis[2])
        };
        return this;
    }
    requestBuilder() {
        return new PurchaseOrderInvoicingPlanRequestBuilder_1.PurchaseOrderInvoicingPlanRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(PurchaseOrderInvoicingPlan_1.PurchaseOrderInvoicingPlan, this.deSerializers);
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
                 * Static representation of the {@link invoicingPlan} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN: fieldBuilder.buildEdmTypeField('InvoicingPlan', 'Edm.String', false),
                /**
                 * Static representation of the {@link invoicingPlanType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_TYPE: fieldBuilder.buildEdmTypeField('InvoicingPlanType', 'Edm.String', false),
                /**
                 * Static representation of the {@link invoicingPlanStartDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_START_DATE: fieldBuilder.buildEdmTypeField('InvoicingPlanStartDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link invoicingPlanEndDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_END_DATE: fieldBuilder.buildEdmTypeField('InvoicingPlanEndDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link invoicingPlanNextInvcDateRule} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PLAN_NEXT_INVC_DATE_RULE: fieldBuilder.buildEdmTypeField('InvoicingPlanNextInvcDateRule', 'Edm.String', false),
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
                ALL_FIELDS: new odata_v4_1.AllFields('*', PurchaseOrderInvoicingPlan_1.PurchaseOrderInvoicingPlan)
            };
        }
        return this._schema;
    }
}
exports.PurchaseOrderInvoicingPlanApi = PurchaseOrderInvoicingPlanApi;
//# sourceMappingURL=PurchaseOrderInvoicingPlanApi.js.map