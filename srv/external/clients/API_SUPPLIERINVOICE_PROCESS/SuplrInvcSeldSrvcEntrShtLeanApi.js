"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcSeldSrvcEntrShtLeanApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SuplrInvcSeldSrvcEntrShtLean_1 = require("./SuplrInvcSeldSrvcEntrShtLean");
const SuplrInvcSeldSrvcEntrShtLeanRequestBuilder_1 = require("./SuplrInvcSeldSrvcEntrShtLeanRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SuplrInvcSeldSrvcEntrShtLeanApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SuplrInvcSeldSrvcEntrShtLean_1.SuplrInvcSeldSrvcEntrShtLean;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new SuplrInvcSeldSrvcEntrShtLeanApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SuplrInvcSeldSrvcEntrShtLeanRequestBuilder_1.SuplrInvcSeldSrvcEntrShtLeanRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(SuplrInvcSeldSrvcEntrShtLean_1.SuplrInvcSeldSrvcEntrShtLean, this.deSerializers);
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
                 * Static representation of the {@link serviceEntrySheet} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SERVICE_ENTRY_SHEET: fieldBuilder.buildEdmTypeField('ServiceEntrySheet', 'Edm.String', false),
                /**
                 * Static representation of the {@link serviceEntrySheetItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SERVICE_ENTRY_SHEET_ITEM: fieldBuilder.buildEdmTypeField('ServiceEntrySheetItem', 'Edm.String', false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', SuplrInvcSeldSrvcEntrShtLean_1.SuplrInvcSeldSrvcEntrShtLean)
            };
        }
        return this._schema;
    }
}
exports.SuplrInvcSeldSrvcEntrShtLeanApi = SuplrInvcSeldSrvcEntrShtLeanApi;
//# sourceMappingURL=SuplrInvcSeldSrvcEntrShtLeanApi.js.map