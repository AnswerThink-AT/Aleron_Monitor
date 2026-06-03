"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceOdnApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SupplierInvoiceOdn_1 = require("./SupplierInvoiceOdn");
const SupplierInvoiceOdnRequestBuilder_1 = require("./SupplierInvoiceOdnRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SupplierInvoiceOdnApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SupplierInvoiceOdn_1.SupplierInvoiceOdn;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new SupplierInvoiceOdnApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SupplierInvoiceOdnRequestBuilder_1.SupplierInvoiceOdnRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(SupplierInvoiceOdn_1.SupplierInvoiceOdn, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link afdfUniqueKeyUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                AFDF_UNIQUE_KEY_UUID: fieldBuilder.buildEdmTypeField('AFDFUniqueKeyUUID', 'Edm.Guid', false),
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
                 * Static representation of the {@link officialDocumentNumberCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OFFICIAL_DOCUMENT_NUMBER_COUNTRY: fieldBuilder.buildEdmTypeField('OfficialDocumentNumberCountry', 'Edm.String', true),
                /**
                 * Static representation of the {@link officialDocumentNumberType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OFFICIAL_DOCUMENT_NUMBER_TYPE: fieldBuilder.buildEdmTypeField('OfficialDocumentNumberType', 'Edm.String', true),
                /**
                 * Static representation of the {@link officialDocumentNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OFFICIAL_DOCUMENT_NUMBER: fieldBuilder.buildEdmTypeField('OfficialDocumentNumber', 'Edm.String', true),
                /**
                 * Static representation of the {@link odnLegalDateTimeText} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ODN_LEGAL_DATE_TIME_TEXT: fieldBuilder.buildEdmTypeField('ODNLegalDateTimeText', 'Edm.String', true),
                /**
                 * Static representation of the {@link officialDocumentNumberIntType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OFFICIAL_DOCUMENT_NUMBER_INT_TYPE: fieldBuilder.buildEdmTypeField('OfficialDocumentNumberIntType', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', SupplierInvoiceOdn_1.SupplierInvoiceOdn)
            };
        }
        return this._schema;
    }
}
exports.SupplierInvoiceOdnApi = SupplierInvoiceOdnApi;
//# sourceMappingURL=SupplierInvoiceOdnApi.js.map