"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceTaxApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SupplierInvoiceTax_1 = require("./SupplierInvoiceTax");
const SupplierInvoiceTaxRequestBuilder_1 = require("./SupplierInvoiceTaxRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SupplierInvoiceTaxApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SupplierInvoiceTax_1.SupplierInvoiceTax;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new SupplierInvoiceTaxApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SupplierInvoiceTaxRequestBuilder_1.SupplierInvoiceTaxRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(SupplierInvoiceTax_1.SupplierInvoiceTax, this.deSerializers);
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
                 * Static representation of the {@link taxCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_CODE: fieldBuilder.buildEdmTypeField('TaxCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplierInvoiceTaxCounter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_INVOICE_TAX_COUNTER: fieldBuilder.buildEdmTypeField('SupplierInvoiceTaxCounter', 'Edm.String', false),
                /**
                 * Static representation of the {@link documentCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField('DocumentCurrency', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_AMOUNT: fieldBuilder.buildEdmTypeField('TaxAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link taxBaseAmountInTransCrcy} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_BASE_AMOUNT_IN_TRANS_CRCY: fieldBuilder.buildEdmTypeField('TaxBaseAmountInTransCrcy', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link taxJurisdiction} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_JURISDICTION: fieldBuilder.buildEdmTypeField('TaxJurisdiction', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_COUNTRY: fieldBuilder.buildEdmTypeField('TaxCountry', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxDeterminationDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_DETERMINATION_DATE: fieldBuilder.buildEdmTypeField('TaxDeterminationDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link taxRateValidityStartDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_RATE_VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('TaxRateValidityStartDate', 'Edm.DateTime', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', SupplierInvoiceTax_1.SupplierInvoiceTax)
            };
        }
        return this._schema;
    }
}
exports.SupplierInvoiceTaxApi = SupplierInvoiceTaxApi;
//# sourceMappingURL=SupplierInvoiceTaxApi.js.map