"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ceSalesorder0001 = ceSalesorder0001;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SalesOrderApi_1 = require("./SalesOrderApi");
const SalesOrderItemApi_1 = require("./SalesOrderItemApi");
const SalesOrderItemPartnerApi_1 = require("./SalesOrderItemPartnerApi");
const SalesOrderItemPricingElementApi_1 = require("./SalesOrderItemPricingElementApi");
const SalesOrderItemTextApi_1 = require("./SalesOrderItemTextApi");
const SalesOrderPartnerApi_1 = require("./SalesOrderPartnerApi");
const SalesOrderPricingElementApi_1 = require("./SalesOrderPricingElementApi");
const SalesOrderScheduleLineApi_1 = require("./SalesOrderScheduleLineApi");
const SalesOrderTextApi_1 = require("./SalesOrderTextApi");
const VarConfignAssignedValueApi_1 = require("./VarConfignAssignedValueApi");
const VarConfignCharacteristicApi_1 = require("./VarConfignCharacteristicApi");
const VariantConfigurationApi_1 = require("./VariantConfigurationApi");
const VariantConfigurationInstanceApi_1 = require("./VariantConfigurationInstanceApi");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const BatchRequest_1 = require("./BatchRequest");
function ceSalesorder0001(deSerializers = odata_v4_1.defaultDeSerializers) {
    return new CeSalesorder0001((0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class CeSalesorder0001 {
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
    get salesOrderApi() {
        const api = this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi);
        const linkedApis = [
            this.initApi('salesOrderItemApi', SalesOrderItemApi_1.SalesOrderItemApi),
            this.initApi('salesOrderPartnerApi', SalesOrderPartnerApi_1.SalesOrderPartnerApi),
            this.initApi('salesOrderPricingElementApi', SalesOrderPricingElementApi_1.SalesOrderPricingElementApi),
            this.initApi('salesOrderTextApi', SalesOrderTextApi_1.SalesOrderTextApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesOrderItemApi() {
        const api = this.initApi('salesOrderItemApi', SalesOrderItemApi_1.SalesOrderItemApi);
        const linkedApis = [
            this.initApi('salesOrderItemPartnerApi', SalesOrderItemPartnerApi_1.SalesOrderItemPartnerApi),
            this.initApi('salesOrderItemPricingElementApi', SalesOrderItemPricingElementApi_1.SalesOrderItemPricingElementApi),
            this.initApi('salesOrderItemTextApi', SalesOrderItemTextApi_1.SalesOrderItemTextApi),
            this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi),
            this.initApi('salesOrderScheduleLineApi', SalesOrderScheduleLineApi_1.SalesOrderScheduleLineApi),
            this.initApi('variantConfigurationApi', VariantConfigurationApi_1.VariantConfigurationApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesOrderItemPartnerApi() {
        const api = this.initApi('salesOrderItemPartnerApi', SalesOrderItemPartnerApi_1.SalesOrderItemPartnerApi);
        const linkedApis = [
            this.initApi('salesOrderItemApi', SalesOrderItemApi_1.SalesOrderItemApi),
            this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesOrderItemPricingElementApi() {
        const api = this.initApi('salesOrderItemPricingElementApi', SalesOrderItemPricingElementApi_1.SalesOrderItemPricingElementApi);
        const linkedApis = [
            this.initApi('salesOrderItemApi', SalesOrderItemApi_1.SalesOrderItemApi),
            this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesOrderItemTextApi() {
        const api = this.initApi('salesOrderItemTextApi', SalesOrderItemTextApi_1.SalesOrderItemTextApi);
        const linkedApis = [
            this.initApi('salesOrderItemApi', SalesOrderItemApi_1.SalesOrderItemApi),
            this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesOrderPartnerApi() {
        const api = this.initApi('salesOrderPartnerApi', SalesOrderPartnerApi_1.SalesOrderPartnerApi);
        const linkedApis = [this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi)];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesOrderPricingElementApi() {
        const api = this.initApi('salesOrderPricingElementApi', SalesOrderPricingElementApi_1.SalesOrderPricingElementApi);
        const linkedApis = [this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi)];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesOrderScheduleLineApi() {
        const api = this.initApi('salesOrderScheduleLineApi', SalesOrderScheduleLineApi_1.SalesOrderScheduleLineApi);
        const linkedApis = [
            this.initApi('salesOrderItemApi', SalesOrderItemApi_1.SalesOrderItemApi),
            this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesOrderTextApi() {
        const api = this.initApi('salesOrderTextApi', SalesOrderTextApi_1.SalesOrderTextApi);
        const linkedApis = [this.initApi('salesOrderApi', SalesOrderApi_1.SalesOrderApi)];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get varConfignAssignedValueApi() {
        const api = this.initApi('varConfignAssignedValueApi', VarConfignAssignedValueApi_1.VarConfignAssignedValueApi);
        const linkedApis = [
            this.initApi('varConfignCharacteristicApi', VarConfignCharacteristicApi_1.VarConfignCharacteristicApi),
            this.initApi('variantConfigurationApi', VariantConfigurationApi_1.VariantConfigurationApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get varConfignCharacteristicApi() {
        const api = this.initApi('varConfignCharacteristicApi', VarConfignCharacteristicApi_1.VarConfignCharacteristicApi);
        const linkedApis = [
            this.initApi('varConfignAssignedValueApi', VarConfignAssignedValueApi_1.VarConfignAssignedValueApi),
            this.initApi('variantConfigurationInstanceApi', VariantConfigurationInstanceApi_1.VariantConfigurationInstanceApi),
            this.initApi('variantConfigurationApi', VariantConfigurationApi_1.VariantConfigurationApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get variantConfigurationApi() {
        const api = this.initApi('variantConfigurationApi', VariantConfigurationApi_1.VariantConfigurationApi);
        const linkedApis = [
            this.initApi('variantConfigurationInstanceApi', VariantConfigurationInstanceApi_1.VariantConfigurationInstanceApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get variantConfigurationInstanceApi() {
        const api = this.initApi('variantConfigurationInstanceApi', VariantConfigurationInstanceApi_1.VariantConfigurationInstanceApi);
        const linkedApis = [
            this.initApi('varConfignCharacteristicApi', VarConfignCharacteristicApi_1.VarConfignCharacteristicApi),
            this.initApi('variantConfigurationApi', VariantConfigurationApi_1.VariantConfigurationApi)
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