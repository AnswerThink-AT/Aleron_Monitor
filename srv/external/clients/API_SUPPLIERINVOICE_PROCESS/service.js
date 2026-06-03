"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSupplierinvoiceProcess = apiSupplierinvoiceProcess;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SuplrInvcHeaderWhldgTaxApi_1 = require("./SuplrInvcHeaderWhldgTaxApi");
const SuplrInvcItemAcctAssgmtApi_1 = require("./SuplrInvcItemAcctAssgmtApi");
const SuplrInvcItemPurOrdRefApi_1 = require("./SuplrInvcItemPurOrdRefApi");
const SuplrInvcSeldInbDeliveryNoteApi_1 = require("./SuplrInvcSeldInbDeliveryNoteApi");
const SuplrInvcSeldPurgDocumentApi_1 = require("./SuplrInvcSeldPurgDocumentApi");
const SuplrInvcSeldSrvcEntrShtLeanApi_1 = require("./SuplrInvcSeldSrvcEntrShtLeanApi");
const SuplrInvoiceAdditionalDataApi_1 = require("./SuplrInvoiceAdditionalDataApi");
const SupplierInvoiceApi_1 = require("./SupplierInvoiceApi");
const SupplierInvoiceItemAssetApi_1 = require("./SupplierInvoiceItemAssetApi");
const SupplierInvoiceItemGlAcctApi_1 = require("./SupplierInvoiceItemGlAcctApi");
const SupplierInvoiceItemMaterialApi_1 = require("./SupplierInvoiceItemMaterialApi");
const SupplierInvoiceOdnApi_1 = require("./SupplierInvoiceOdnApi");
const SupplierInvoiceTaxApi_1 = require("./SupplierInvoiceTaxApi");
const operations_1 = require("./operations");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function apiSupplierinvoiceProcess(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new ApiSupplierinvoiceProcess((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class ApiSupplierinvoiceProcess {
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
    get suplrInvcHeaderWhldgTaxApi() {
        return this.initApi('suplrInvcHeaderWhldgTaxApi', SuplrInvcHeaderWhldgTaxApi_1.SuplrInvcHeaderWhldgTaxApi);
    }
    get suplrInvcItemAcctAssgmtApi() {
        return this.initApi('suplrInvcItemAcctAssgmtApi', SuplrInvcItemAcctAssgmtApi_1.SuplrInvcItemAcctAssgmtApi);
    }
    get suplrInvcItemPurOrdRefApi() {
        const api = this.initApi('suplrInvcItemPurOrdRefApi', SuplrInvcItemPurOrdRefApi_1.SuplrInvcItemPurOrdRefApi);
        const linkedApis = [
            this.initApi('suplrInvcItemAcctAssgmtApi', SuplrInvcItemAcctAssgmtApi_1.SuplrInvcItemAcctAssgmtApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get suplrInvcSeldInbDeliveryNoteApi() {
        return this.initApi('suplrInvcSeldInbDeliveryNoteApi', SuplrInvcSeldInbDeliveryNoteApi_1.SuplrInvcSeldInbDeliveryNoteApi);
    }
    get suplrInvcSeldPurgDocumentApi() {
        return this.initApi('suplrInvcSeldPurgDocumentApi', SuplrInvcSeldPurgDocumentApi_1.SuplrInvcSeldPurgDocumentApi);
    }
    get suplrInvcSeldSrvcEntrShtLeanApi() {
        return this.initApi('suplrInvcSeldSrvcEntrShtLeanApi', SuplrInvcSeldSrvcEntrShtLeanApi_1.SuplrInvcSeldSrvcEntrShtLeanApi);
    }
    get suplrInvoiceAdditionalDataApi() {
        return this.initApi('suplrInvoiceAdditionalDataApi', SuplrInvoiceAdditionalDataApi_1.SuplrInvoiceAdditionalDataApi);
    }
    get supplierInvoiceApi() {
        const api = this.initApi('supplierInvoiceApi', SupplierInvoiceApi_1.SupplierInvoiceApi);
        const linkedApis = [
            this.initApi('suplrInvcSeldInbDeliveryNoteApi', SuplrInvcSeldInbDeliveryNoteApi_1.SuplrInvcSeldInbDeliveryNoteApi),
            this.initApi('suplrInvcSeldPurgDocumentApi', SuplrInvcSeldPurgDocumentApi_1.SuplrInvcSeldPurgDocumentApi),
            this.initApi('suplrInvcSeldSrvcEntrShtLeanApi', SuplrInvcSeldSrvcEntrShtLeanApi_1.SuplrInvcSeldSrvcEntrShtLeanApi),
            this.initApi('supplierInvoiceItemAssetApi', SupplierInvoiceItemAssetApi_1.SupplierInvoiceItemAssetApi),
            this.initApi('supplierInvoiceItemMaterialApi', SupplierInvoiceItemMaterialApi_1.SupplierInvoiceItemMaterialApi),
            this.initApi('suplrInvcItemPurOrdRefApi', SuplrInvcItemPurOrdRefApi_1.SuplrInvcItemPurOrdRefApi),
            this.initApi('suplrInvoiceAdditionalDataApi', SuplrInvoiceAdditionalDataApi_1.SuplrInvoiceAdditionalDataApi),
            this.initApi('supplierInvoiceItemGlAcctApi', SupplierInvoiceItemGlAcctApi_1.SupplierInvoiceItemGlAcctApi),
            this.initApi('supplierInvoiceOdnApi', SupplierInvoiceOdnApi_1.SupplierInvoiceOdnApi),
            this.initApi('supplierInvoiceTaxApi', SupplierInvoiceTaxApi_1.SupplierInvoiceTaxApi),
            this.initApi('suplrInvcHeaderWhldgTaxApi', SuplrInvcHeaderWhldgTaxApi_1.SuplrInvcHeaderWhldgTaxApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get supplierInvoiceItemAssetApi() {
        return this.initApi('supplierInvoiceItemAssetApi', SupplierInvoiceItemAssetApi_1.SupplierInvoiceItemAssetApi);
    }
    get supplierInvoiceItemGlAcctApi() {
        return this.initApi('supplierInvoiceItemGlAcctApi', SupplierInvoiceItemGlAcctApi_1.SupplierInvoiceItemGlAcctApi);
    }
    get supplierInvoiceItemMaterialApi() {
        return this.initApi('supplierInvoiceItemMaterialApi', SupplierInvoiceItemMaterialApi_1.SupplierInvoiceItemMaterialApi);
    }
    get supplierInvoiceOdnApi() {
        return this.initApi('supplierInvoiceOdnApi', SupplierInvoiceOdnApi_1.SupplierInvoiceOdnApi);
    }
    get supplierInvoiceTaxApi() {
        return this.initApi('supplierInvoiceTaxApi', SupplierInvoiceTaxApi_1.SupplierInvoiceTaxApi);
    }
    get operations() {
        return {
            post: (parameter) => (0, operations_1.post)(parameter, this.deSerializers),
            release: (parameter) => (0, operations_1.release)(parameter, this.deSerializers),
            cancel: (parameter) => (0, operations_1.cancel)(parameter, this.deSerializers)
        };
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map