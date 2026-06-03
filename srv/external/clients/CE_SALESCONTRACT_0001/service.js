"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ceSalescontract0001 = ceSalescontract0001;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SalesContractApi_1 = require("./SalesContractApi");
const SalesContractItemApi_1 = require("./SalesContractItemApi");
const SalesContractItemTextApi_1 = require("./SalesContractItemTextApi");
const SalesContractTextApi_1 = require("./SalesContractTextApi");
const SlsContrItemPricingElementApi_1 = require("./SlsContrItemPricingElementApi");
const SlsContrPricingElementApi_1 = require("./SlsContrPricingElementApi");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const BatchRequest_1 = require("./BatchRequest");
function ceSalescontract0001(deSerializers = odata_v4_1.defaultDeSerializers) {
    return new CeSalescontract0001((0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class CeSalescontract0001 {
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
    get salesContractApi() {
        const api = this.initApi('salesContractApi', SalesContractApi_1.SalesContractApi);
        const linkedApis = [
            this.initApi('salesContractItemApi', SalesContractItemApi_1.SalesContractItemApi),
            this.initApi('slsContrPricingElementApi', SlsContrPricingElementApi_1.SlsContrPricingElementApi),
            this.initApi('salesContractTextApi', SalesContractTextApi_1.SalesContractTextApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesContractItemApi() {
        const api = this.initApi('salesContractItemApi', SalesContractItemApi_1.SalesContractItemApi);
        const linkedApis = [
            this.initApi('slsContrItemPricingElementApi', SlsContrItemPricingElementApi_1.SlsContrItemPricingElementApi),
            this.initApi('salesContractItemTextApi', SalesContractItemTextApi_1.SalesContractItemTextApi),
            this.initApi('salesContractApi', SalesContractApi_1.SalesContractApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesContractItemTextApi() {
        const api = this.initApi('salesContractItemTextApi', SalesContractItemTextApi_1.SalesContractItemTextApi);
        const linkedApis = [
            this.initApi('salesContractItemApi', SalesContractItemApi_1.SalesContractItemApi),
            this.initApi('salesContractApi', SalesContractApi_1.SalesContractApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get salesContractTextApi() {
        const api = this.initApi('salesContractTextApi', SalesContractTextApi_1.SalesContractTextApi);
        const linkedApis = [this.initApi('salesContractApi', SalesContractApi_1.SalesContractApi)];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get slsContrItemPricingElementApi() {
        const api = this.initApi('slsContrItemPricingElementApi', SlsContrItemPricingElementApi_1.SlsContrItemPricingElementApi);
        const linkedApis = [
            this.initApi('salesContractItemApi', SalesContractItemApi_1.SalesContractItemApi),
            this.initApi('salesContractApi', SalesContractApi_1.SalesContractApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get slsContrPricingElementApi() {
        const api = this.initApi('slsContrPricingElementApi', SlsContrPricingElementApi_1.SlsContrPricingElementApi);
        const linkedApis = [this.initApi('salesContractApi', SalesContractApi_1.SalesContractApi)];
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