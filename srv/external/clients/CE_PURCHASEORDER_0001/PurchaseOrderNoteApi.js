"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderNoteApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PurchaseOrderNote_1 = require("./PurchaseOrderNote");
const PurchaseOrderNoteRequestBuilder_1 = require("./PurchaseOrderNoteRequestBuilder");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class PurchaseOrderNoteApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = PurchaseOrderNote_1.PurchaseOrderNote;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new PurchaseOrderNoteApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            PURCHASE_ORDER_1: new odata_v4_1.OneToOneLink('_PurchaseOrder', this, linkedApis[0])
        };
        return this;
    }
    requestBuilder() {
        return new PurchaseOrderNoteRequestBuilder_1.PurchaseOrderNoteRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(PurchaseOrderNote_1.PurchaseOrderNote, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link purchaseOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER: fieldBuilder.buildEdmTypeField('PurchaseOrder', 'Edm.String', false),
                /**
                 * Static representation of the {@link textObjectType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TEXT_OBJECT_TYPE: fieldBuilder.buildEdmTypeField('TextObjectType', 'Edm.String', false),
                /**
                 * Static representation of the {@link language} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', false),
                /**
                 * Static representation of the {@link plainLongText} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PLAIN_LONG_TEXT: fieldBuilder.buildEdmTypeField('PlainLongText', 'Edm.String', false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', PurchaseOrderNote_1.PurchaseOrderNote)
            };
        }
        return this._schema;
    }
}
exports.PurchaseOrderNoteApi = PurchaseOrderNoteApi;
//# sourceMappingURL=PurchaseOrderNoteApi.js.map