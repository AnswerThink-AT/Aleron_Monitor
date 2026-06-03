"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderScheduleLineApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PurchaseOrderScheduleLine_1 = require("./PurchaseOrderScheduleLine");
const PurchaseOrderScheduleLineRequestBuilder_1 = require("./PurchaseOrderScheduleLineRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class PurchaseOrderScheduleLineApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = PurchaseOrderScheduleLine_1.PurchaseOrderScheduleLine;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new PurchaseOrderScheduleLineApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            PURCHASE_ORDER_1: new odata_v4_1.OneToOneLink('_PurchaseOrder', this, linkedApis[0]),
            PURCHASE_ORDER_ITEM_1: new odata_v4_1.OneToOneLink('_PurchaseOrderItem', this, linkedApis[1]),
            SUBCONTRACTING_COMPONENT: new odata_v4_1.OneToManyLink('_SubcontractingComponent', this, linkedApis[2])
        };
        return this;
    }
    requestBuilder() {
        return new PurchaseOrderScheduleLineRequestBuilder_1.PurchaseOrderScheduleLineRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(PurchaseOrderScheduleLine_1.PurchaseOrderScheduleLine, this.deSerializers);
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
                 * Static representation of the {@link scheduleLine} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SCHEDULE_LINE: fieldBuilder.buildEdmTypeField('ScheduleLine', 'Edm.String', false),
                /**
                 * Static representation of the {@link scheduleLineDeliveryDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SCHEDULE_LINE_DELIVERY_DATE: fieldBuilder.buildEdmTypeField('ScheduleLineDeliveryDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link schedLineStscDeliveryDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SCHED_LINE_STSC_DELIVERY_DATE: fieldBuilder.buildEdmTypeField('SchedLineStscDeliveryDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link performancePeriodStartDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PERFORMANCE_PERIOD_START_DATE: fieldBuilder.buildEdmTypeField('PerformancePeriodStartDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link performancePeriodEndDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PERFORMANCE_PERIOD_END_DATE: fieldBuilder.buildEdmTypeField('PerformancePeriodEndDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link scheduleLineDeliveryTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SCHEDULE_LINE_DELIVERY_TIME: fieldBuilder.buildEdmTypeField('ScheduleLineDeliveryTime', 'Edm.TimeOfDay', false),
                /**
                 * Static representation of the {@link batch} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BATCH: fieldBuilder.buildEdmTypeField('Batch', 'Edm.String', false),
                /**
                 * Static representation of the {@link batchBySupplier} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BATCH_BY_SUPPLIER: fieldBuilder.buildEdmTypeField('BatchBySupplier', 'Edm.String', false),
                /**
                 * Static representation of the {@link scheduleLineOrderQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SCHEDULE_LINE_ORDER_QUANTITY: fieldBuilder.buildEdmTypeField('ScheduleLineOrderQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link openPurchaseOrderQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OPEN_PURCHASE_ORDER_QUANTITY: fieldBuilder.buildEdmTypeField('OpenPurchaseOrderQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link purchaseOrderQuantityUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField('PurchaseOrderQuantityUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link currency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CURRENCY: fieldBuilder.buildEdmTypeField('Currency', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseRequisition} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_REQUISITION: fieldBuilder.buildEdmTypeField('PurchaseRequisition', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseRequisitionItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_REQUISITION_ITEM: fieldBuilder.buildEdmTypeField('PurchaseRequisitionItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link delivDateCategory} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DELIV_DATE_CATEGORY: fieldBuilder.buildEdmTypeField('DelivDateCategory', 'Edm.String', false),
                /**
                 * Static representation of the {@link scheduleLineOrderDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SCHEDULE_LINE_ORDER_DATE: fieldBuilder.buildEdmTypeField('ScheduleLineOrderDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link productAvailabilityDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRODUCT_AVAILABILITY_DATE: fieldBuilder.buildEdmTypeField('ProductAvailabilityDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link loadingDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LOADING_DATE: fieldBuilder.buildEdmTypeField('LoadingDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link loadingTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LOADING_TIME: fieldBuilder.buildEdmTypeField('LoadingTime', 'Edm.TimeOfDay', false),
                /**
                 * Static representation of the {@link transportationPlanningDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TRANSPORTATION_PLANNING_DATE: fieldBuilder.buildEdmTypeField('TransportationPlanningDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link transportationPlanningTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TRANSPORTATION_PLANNING_TIME: fieldBuilder.buildEdmTypeField('TransportationPlanningTime', 'Edm.TimeOfDay', false),
                /**
                 * Static representation of the {@link goodsIssueDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GOODS_ISSUE_DATE: fieldBuilder.buildEdmTypeField('GoodsIssueDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link goodsIssueTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GOODS_ISSUE_TIME: fieldBuilder.buildEdmTypeField('GoodsIssueTime', 'Edm.TimeOfDay', false),
                /**
                 * Static representation of the {@link routeSchedule} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ROUTE_SCHEDULE: fieldBuilder.buildEdmTypeField('RouteSchedule', 'Edm.String', false),
                /**
                 * Static representation of the {@link productAvailabilityTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRODUCT_AVAILABILITY_TIME: fieldBuilder.buildEdmTypeField('ProductAvailabilityTime', 'Edm.TimeOfDay', false),
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
                ALL_FIELDS: new odata_v4_1.AllFields('*', PurchaseOrderScheduleLine_1.PurchaseOrderScheduleLine)
            };
        }
        return this._schema;
    }
}
exports.PurchaseOrderScheduleLineApi = PurchaseOrderScheduleLineApi;
//# sourceMappingURL=PurchaseOrderScheduleLineApi.js.map