"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcSeldSrvcEntrShtLeanRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SuplrInvcSeldSrvcEntrShtLean} entity.
 */
class SuplrInvcSeldSrvcEntrShtLeanRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SuplrInvcSeldSrvcEntrShtLean` entities.
     * @returns A request builder for creating requests to retrieve all `SuplrInvcSeldSrvcEntrShtLean` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SuplrInvcSeldSrvcEntrShtLean` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SuplrInvcSeldSrvcEntrShtLean.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SuplrInvcSeldSrvcEntrShtLean.fiscalYear}.
     * @param serviceEntrySheet Key property. See {@link SuplrInvcSeldSrvcEntrShtLean.serviceEntrySheet}.
     * @param serviceEntrySheetItem Key property. See {@link SuplrInvcSeldSrvcEntrShtLean.serviceEntrySheetItem}.
     * @returns A request builder for creating requests to retrieve one `SuplrInvcSeldSrvcEntrShtLean` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear, serviceEntrySheet, serviceEntrySheetItem) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear,
            ServiceEntrySheet: serviceEntrySheet,
            ServiceEntrySheetItem: serviceEntrySheetItem
        });
    }
}
exports.SuplrInvcSeldSrvcEntrShtLeanRequestBuilder = SuplrInvcSeldSrvcEntrShtLeanRequestBuilder;
//# sourceMappingURL=SuplrInvcSeldSrvcEntrShtLeanRequestBuilder.js.map