"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcSeldInbDeliveryNoteApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SuplrInvcSeldInbDeliveryNote_1 = require("./SuplrInvcSeldInbDeliveryNote");
const SuplrInvcSeldInbDeliveryNoteRequestBuilder_1 = require("./SuplrInvcSeldInbDeliveryNoteRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SuplrInvcSeldInbDeliveryNoteApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SuplrInvcSeldInbDeliveryNote_1.SuplrInvcSeldInbDeliveryNote;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new SuplrInvcSeldInbDeliveryNoteApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SuplrInvcSeldInbDeliveryNoteRequestBuilder_1.SuplrInvcSeldInbDeliveryNoteRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(SuplrInvcSeldInbDeliveryNote_1.SuplrInvcSeldInbDeliveryNote, this.deSerializers);
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
                 * Static representation of the {@link inboundDeliveryNote} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INBOUND_DELIVERY_NOTE: fieldBuilder.buildEdmTypeField('InboundDeliveryNote', 'Edm.String', false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', SuplrInvcSeldInbDeliveryNote_1.SuplrInvcSeldInbDeliveryNote)
            };
        }
        return this._schema;
    }
}
exports.SuplrInvcSeldInbDeliveryNoteApi = SuplrInvcSeldInbDeliveryNoteApi;
//# sourceMappingURL=SuplrInvcSeldInbDeliveryNoteApi.js.map