"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcHeaderWhldgTaxApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SuplrInvcHeaderWhldgTax_1 = require("./SuplrInvcHeaderWhldgTax");
const SuplrInvcHeaderWhldgTaxRequestBuilder_1 = require("./SuplrInvcHeaderWhldgTaxRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SuplrInvcHeaderWhldgTaxApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SuplrInvcHeaderWhldgTax_1.SuplrInvcHeaderWhldgTax;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new SuplrInvcHeaderWhldgTaxApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SuplrInvcHeaderWhldgTaxRequestBuilder_1.SuplrInvcHeaderWhldgTaxRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(SuplrInvcHeaderWhldgTax_1.SuplrInvcHeaderWhldgTax, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link supplierInvoice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_INVOICE: fieldBuilder.buildEdmTypeField('SupplierInvoice', 'Edm.String', false),
                /**
                 * Static representation of the {@link fiscalYear} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FISCAL_YEAR: fieldBuilder.buildEdmTypeField('FiscalYear', 'Edm.String', false),
                /**
                 * Static representation of the {@link withholdingTaxType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WITHHOLDING_TAX_TYPE: fieldBuilder.buildEdmTypeField('WithholdingTaxType', 'Edm.String', false),
                /**
                 * Static representation of the {@link documentCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField('DocumentCurrency', 'Edm.String', true),
                /**
                 * Static representation of the {@link withholdingTaxCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WITHHOLDING_TAX_CODE: fieldBuilder.buildEdmTypeField('WithholdingTaxCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link withholdingTaxBaseAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WITHHOLDING_TAX_BASE_AMOUNT: fieldBuilder.buildEdmTypeField('WithholdingTaxBaseAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link manuallyEnteredWhldgTaxAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MANUALLY_ENTERED_WHLDG_TAX_AMOUNT: fieldBuilder.buildEdmTypeField('ManuallyEnteredWhldgTaxAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link whldgTaxIsEnteredManually} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WHLDG_TAX_IS_ENTERED_MANUALLY: fieldBuilder.buildEdmTypeField('WhldgTaxIsEnteredManually', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link whldgTaxBaseIsEnteredManually} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WHLDG_TAX_BASE_IS_ENTERED_MANUALLY: fieldBuilder.buildEdmTypeField('WhldgTaxBaseIsEnteredManually', 'Edm.Boolean', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', SuplrInvcHeaderWhldgTax_1.SuplrInvcHeaderWhldgTax)
            };
        }
        return this._schema;
    }
}
exports.SuplrInvcHeaderWhldgTaxApi = SuplrInvcHeaderWhldgTaxApi;
//# sourceMappingURL=SuplrInvcHeaderWhldgTaxApi.js.map