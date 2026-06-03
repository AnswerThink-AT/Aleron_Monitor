"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yy1_Employee_Customer_InfoApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Yy1_Employee_Customer_Info_1 = require("./Yy1_Employee_Customer_Info");
const Yy1_Employee_Customer_InfoRequestBuilder_1 = require("./Yy1_Employee_Customer_InfoRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class Yy1_Employee_Customer_InfoApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = Yy1_Employee_Customer_Info_1.Yy1_Employee_Customer_Info;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new Yy1_Employee_Customer_InfoApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new Yy1_Employee_Customer_InfoRequestBuilder_1.Yy1_Employee_Customer_InfoRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(Yy1_Employee_Customer_Info_1.Yy1_Employee_Customer_Info, this.deSerializers);
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
                 * Static representation of the {@link workerId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WORKER_ID: fieldBuilder.buildEdmTypeField('WORKER_ID', 'Edm.String', true),
                /**
                 * Static representation of the {@link name} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NAME: fieldBuilder.buildEdmTypeField('Name', 'Edm.String', true),
                /**
                 * Static representation of the {@link ssn} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SSN: fieldBuilder.buildEdmTypeField('SSN', 'Edm.String', true),
                /**
                 * Static representation of the {@link empGrp} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                EMP_GRP: fieldBuilder.buildEdmTypeField('EMP_GRP', 'Edm.String', true),
                /**
                 * Static representation of the {@link empSubgrp} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                EMP_SUBGRP: fieldBuilder.buildEdmTypeField('EMP_SUBGRP', 'Edm.String', true),
                /**
                 * Static representation of the {@link startDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                START_DATE: fieldBuilder.buildEdmTypeField('START_DATE', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link endDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                END_DATE: fieldBuilder.buildEdmTypeField('END_DATE', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link contratSap} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONTRAT_SAP: fieldBuilder.buildEdmTypeField('CONTRAT_SAP', 'Edm.String', true),
                /**
                 * Static representation of the {@link salesOrdSap} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORD_SAP: fieldBuilder.buildEdmTypeField('SALES_ORD_SAP', 'Edm.String', true),
                /**
                 * Static representation of the {@link projectId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_ID: fieldBuilder.buildEdmTypeField('PROJECT_ID', 'Edm.String', true),
                /**
                 * Static representation of the {@link projectName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PROJECT_NAME: fieldBuilder.buildEdmTypeField('PROJECT_NAME', 'Edm.String', true),
                /**
                 * Static representation of the {@link customerId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_ID: fieldBuilder.buildEdmTypeField('CUSTOMER_ID', 'Edm.String', true),
                /**
                 * Static representation of the {@link ssOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SS_ORDER: fieldBuilder.buildEdmTypeField('SS_ORDER', 'Edm.String', true),
                /**
                 * Static representation of the {@link wnOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WN_ORDER: fieldBuilder.buildEdmTypeField('WN_ORDER', 'Edm.String', true),
                /**
                 * Static representation of the {@link positionId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                POSITION_ID: fieldBuilder.buildEdmTypeField('POSITION_ID', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link jobId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JOB_ID: fieldBuilder.buildEdmTypeField('JOB_ID', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link zpayroll} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ZPAYROLL: fieldBuilder.buildEdmTypeField('ZPAYROLL', 'Edm.String', true),
                /**
                 * Static representation of the {@link recrid} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RECRID: fieldBuilder.buildEdmTypeField('RECRID', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link ztimeInd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ZTIME_IND: fieldBuilder.buildEdmTypeField('ZTIME_IND', 'Edm.String', true),
                /**
                 * Static representation of the {@link zhireAction} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ZHIRE_ACTION: fieldBuilder.buildEdmTypeField('ZHIRE_ACTION', 'Edm.String', true),
                /**
                 * Static representation of the {@link actionType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACTION_TYPE: fieldBuilder.buildEdmTypeField('ACTION_TYPE', 'Edm.String', true),
                /**
                 * Static representation of the {@link tReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                T_REASON: fieldBuilder.buildEdmTypeField('T_REASON', 'Edm.String', true),
                /**
                 * Static representation of the {@link zhrrept} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ZHRREPT: fieldBuilder.buildEdmTypeField('ZHRREPT', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', Yy1_Employee_Customer_Info_1.Yy1_Employee_Customer_Info)
            };
        }
        return this._schema;
    }
}
exports.Yy1_Employee_Customer_InfoApi = Yy1_Employee_Customer_InfoApi;
//# sourceMappingURL=Yy1_Employee_Customer_InfoApi.js.map