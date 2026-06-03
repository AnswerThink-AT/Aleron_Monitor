"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yy1_BillingtypeApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Yy1_Billingtype_1 = require("./Yy1_Billingtype");
const Yy1_BillingtypeRequestBuilder_1 = require("./Yy1_BillingtypeRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class Yy1_BillingtypeApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = Yy1_Billingtype_1.Yy1_Billingtype;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new Yy1_BillingtypeApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new Yy1_BillingtypeRequestBuilder_1.Yy1_BillingtypeRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(Yy1_Billingtype_1.Yy1_Billingtype, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link sapUuid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SAP_UUID: fieldBuilder.buildEdmTypeField('SAP_UUID', 'Edm.Guid', false),
                /**
                 * Static representation of the {@link soOrderType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SO_ORDER_TYPE: fieldBuilder.buildEdmTypeField('SO_order_Type', 'Edm.String', true),
                /**
                 * Static representation of the {@link billingType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BILLING_TYPE: fieldBuilder.buildEdmTypeField('Billing_type', 'Edm.String', true),
                /**
                 * Static representation of the {@link standardOrderType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STANDARD_ORDER_TYPE: fieldBuilder.buildEdmTypeField('StandardOrderType', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', Yy1_Billingtype_1.Yy1_Billingtype)
            };
        }
        return this._schema;
    }
}
exports.Yy1_BillingtypeApi = Yy1_BillingtypeApi;
//# sourceMappingURL=Yy1_BillingtypeApi.js.map