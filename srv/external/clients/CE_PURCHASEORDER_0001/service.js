"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cePurchaseorder0001 = cePurchaseorder0001;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PoSubcontractingComponentApi_1 = require("./PoSubcontractingComponentApi");
const PurchaseOrderApi_1 = require("./PurchaseOrderApi");
const PurchaseOrderAccountAssignmentApi_1 = require("./PurchaseOrderAccountAssignmentApi");
const PurchaseOrderInvoicingPlanApi_1 = require("./PurchaseOrderInvoicingPlanApi");
const PurchaseOrderInvoicingPlanItemApi_1 = require("./PurchaseOrderInvoicingPlanItemApi");
const PurchaseOrderItemApi_1 = require("./PurchaseOrderItemApi");
const PurchaseOrderItemNoteApi_1 = require("./PurchaseOrderItemNoteApi");
const PurchaseOrderNoteApi_1 = require("./PurchaseOrderNoteApi");
const PurchaseOrderPartnerApi_1 = require("./PurchaseOrderPartnerApi");
const PurchaseOrderScheduleLineApi_1 = require("./PurchaseOrderScheduleLineApi");
const PurchaseOrderSupplierAddressApi_1 = require("./PurchaseOrderSupplierAddressApi");
const PurOrderItemDeliveryAddressApi_1 = require("./PurOrderItemDeliveryAddressApi");
const PurOrderItemPricingElementApi_1 = require("./PurOrderItemPricingElementApi");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const BatchRequest_1 = require("./BatchRequest");
function cePurchaseorder0001(deSerializers = odata_v4_1.defaultDeSerializers) {
    return new CePurchaseorder0001((0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class CePurchaseorder0001 {
    constructor(deSerializers) {
        this.apis = {};
        this.deSerializers = deSerializers;
    }
    initApi(key, entityApi) {
        if (!this.apis[key]) {
            this.apis[key] = entityApi._privateFactory(this.deSerializers);
        }
        return this.apis[key];
    }
    get poSubcontractingComponentApi() {
        const api = this.initApi('poSubcontractingComponentApi', PoSubcontractingComponentApi_1.PoSubcontractingComponentApi);
        const linkedApis = [
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi),
            this.initApi('purchaseOrderScheduleLineApi', PurchaseOrderScheduleLineApi_1.PurchaseOrderScheduleLineApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderApi() {
        const api = this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi);
        const linkedApis = [
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi),
            this.initApi('purchaseOrderNoteApi', PurchaseOrderNoteApi_1.PurchaseOrderNoteApi),
            this.initApi('purchaseOrderPartnerApi', PurchaseOrderPartnerApi_1.PurchaseOrderPartnerApi),
            this.initApi('purchaseOrderSupplierAddressApi', PurchaseOrderSupplierAddressApi_1.PurchaseOrderSupplierAddressApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderAccountAssignmentApi() {
        const api = this.initApi('purchaseOrderAccountAssignmentApi', PurchaseOrderAccountAssignmentApi_1.PurchaseOrderAccountAssignmentApi);
        const linkedApis = [
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderInvoicingPlanApi() {
        const api = this.initApi('purchaseOrderInvoicingPlanApi', PurchaseOrderInvoicingPlanApi_1.PurchaseOrderInvoicingPlanApi);
        const linkedApis = [
            this.initApi('purchaseOrderInvoicingPlanItemApi', PurchaseOrderInvoicingPlanItemApi_1.PurchaseOrderInvoicingPlanItemApi),
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderInvoicingPlanItemApi() {
        const api = this.initApi('purchaseOrderInvoicingPlanItemApi', PurchaseOrderInvoicingPlanItemApi_1.PurchaseOrderInvoicingPlanItemApi);
        const linkedApis = [
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderInvoicingPlanApi', PurchaseOrderInvoicingPlanApi_1.PurchaseOrderInvoicingPlanApi),
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderItemApi() {
        const api = this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi);
        const linkedApis = [
            this.initApi('purOrderItemDeliveryAddressApi', PurOrderItemDeliveryAddressApi_1.PurOrderItemDeliveryAddressApi),
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderInvoicingPlanApi', PurchaseOrderInvoicingPlanApi_1.PurchaseOrderInvoicingPlanApi),
            this.initApi('purchaseOrderItemNoteApi', PurchaseOrderItemNoteApi_1.PurchaseOrderItemNoteApi),
            this.initApi('purchaseOrderScheduleLineApi', PurchaseOrderScheduleLineApi_1.PurchaseOrderScheduleLineApi),
            this.initApi('purchaseOrderAccountAssignmentApi', PurchaseOrderAccountAssignmentApi_1.PurchaseOrderAccountAssignmentApi),
            this.initApi('purOrderItemPricingElementApi', PurOrderItemPricingElementApi_1.PurOrderItemPricingElementApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderItemNoteApi() {
        const api = this.initApi('purchaseOrderItemNoteApi', PurchaseOrderItemNoteApi_1.PurchaseOrderItemNoteApi);
        const linkedApis = [
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderNoteApi() {
        const api = this.initApi('purchaseOrderNoteApi', PurchaseOrderNoteApi_1.PurchaseOrderNoteApi);
        const linkedApis = [this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi)];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderPartnerApi() {
        const api = this.initApi('purchaseOrderPartnerApi', PurchaseOrderPartnerApi_1.PurchaseOrderPartnerApi);
        const linkedApis = [this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi)];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderScheduleLineApi() {
        const api = this.initApi('purchaseOrderScheduleLineApi', PurchaseOrderScheduleLineApi_1.PurchaseOrderScheduleLineApi);
        const linkedApis = [
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi),
            this.initApi('poSubcontractingComponentApi', PoSubcontractingComponentApi_1.PoSubcontractingComponentApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purchaseOrderSupplierAddressApi() {
        const api = this.initApi('purchaseOrderSupplierAddressApi', PurchaseOrderSupplierAddressApi_1.PurchaseOrderSupplierAddressApi);
        const linkedApis = [this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi)];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purOrderItemDeliveryAddressApi() {
        const api = this.initApi('purOrderItemDeliveryAddressApi', PurOrderItemDeliveryAddressApi_1.PurOrderItemDeliveryAddressApi);
        const linkedApis = [
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get purOrderItemPricingElementApi() {
        const api = this.initApi('purOrderItemPricingElementApi', PurOrderItemPricingElementApi_1.PurOrderItemPricingElementApi);
        const linkedApis = [
            this.initApi('purchaseOrderApi', PurchaseOrderApi_1.PurchaseOrderApi),
            this.initApi('purchaseOrderItemApi', PurchaseOrderItemApi_1.PurchaseOrderItemApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map