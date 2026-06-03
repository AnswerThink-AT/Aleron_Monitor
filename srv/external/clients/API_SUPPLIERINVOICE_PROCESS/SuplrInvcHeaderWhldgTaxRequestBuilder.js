"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcHeaderWhldgTaxRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link SuplrInvcHeaderWhldgTax} entity.
 */
class SuplrInvcHeaderWhldgTaxRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SuplrInvcHeaderWhldgTax` entities.
     * @returns A request builder for creating requests to retrieve all `SuplrInvcHeaderWhldgTax` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for retrieving one `SuplrInvcHeaderWhldgTax` entity based on its keys.
     * @param supplierInvoice Key property. See {@link SuplrInvcHeaderWhldgTax.supplierInvoice}.
     * @param fiscalYear Key property. See {@link SuplrInvcHeaderWhldgTax.fiscalYear}.
     * @param withholdingTaxType Key property. See {@link SuplrInvcHeaderWhldgTax.withholdingTaxType}.
     * @returns A request builder for creating requests to retrieve one `SuplrInvcHeaderWhldgTax` entity based on its keys.
     */
    getByKey(supplierInvoice, fiscalYear, withholdingTaxType) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            SupplierInvoice: supplierInvoice,
            FiscalYear: fiscalYear,
            WithholdingTaxType: withholdingTaxType
        });
    }
}
exports.SuplrInvcHeaderWhldgTaxRequestBuilder = SuplrInvcHeaderWhldgTaxRequestBuilder;
//# sourceMappingURL=SuplrInvcHeaderWhldgTaxRequestBuilder.js.map