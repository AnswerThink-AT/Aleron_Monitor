"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyCodeApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CompanyCode_1 = require("./CompanyCode");
const CompanyCodeRequestBuilder_1 = require("./CompanyCodeRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class CompanyCodeApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = CompanyCode_1.CompanyCode;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new CompanyCodeApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new CompanyCodeRequestBuilder_1.CompanyCodeRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(CompanyCode_1.CompanyCode, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link companyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link companyCodeName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY_CODE_NAME: fieldBuilder.buildEdmTypeField('CompanyCodeName', 'Edm.String', true),
                /**
                 * Static representation of the {@link cityName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CITY_NAME: fieldBuilder.buildEdmTypeField('CityName', 'Edm.String', true),
                /**
                 * Static representation of the {@link country} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COUNTRY: fieldBuilder.buildEdmTypeField('Country', 'Edm.String', true),
                /**
                 * Static representation of the {@link currency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CURRENCY: fieldBuilder.buildEdmTypeField('Currency', 'Edm.String', true),
                /**
                 * Static representation of the {@link language} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', true),
                /**
                 * Static representation of the {@link chartOfAccounts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHART_OF_ACCOUNTS: fieldBuilder.buildEdmTypeField('ChartOfAccounts', 'Edm.String', true),
                /**
                 * Static representation of the {@link fiscalYearVariant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FISCAL_YEAR_VARIANT: fieldBuilder.buildEdmTypeField('FiscalYearVariant', 'Edm.String', true),
                /**
                 * Static representation of the {@link company} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY: fieldBuilder.buildEdmTypeField('Company', 'Edm.String', true),
                /**
                 * Static representation of the {@link creditControlArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CREDIT_CONTROL_AREA: fieldBuilder.buildEdmTypeField('CreditControlArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link countryChartOfAccounts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COUNTRY_CHART_OF_ACCOUNTS: fieldBuilder.buildEdmTypeField('CountryChartOfAccounts', 'Edm.String', true),
                /**
                 * Static representation of the {@link financialManagementArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FINANCIAL_MANAGEMENT_AREA: fieldBuilder.buildEdmTypeField('FinancialManagementArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link addressId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDRESS_ID: fieldBuilder.buildEdmTypeField('AddressID', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxableEntity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAXABLE_ENTITY: fieldBuilder.buildEdmTypeField('TaxableEntity', 'Edm.String', true),
                /**
                 * Static representation of the {@link vatRegistration} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAT_REGISTRATION: fieldBuilder.buildEdmTypeField('VATRegistration', 'Edm.String', true),
                /**
                 * Static representation of the {@link extendedWhldgTaxIsActive} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                EXTENDED_WHLDG_TAX_IS_ACTIVE: fieldBuilder.buildEdmTypeField('ExtendedWhldgTaxIsActive', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link controllingArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONTROLLING_AREA: fieldBuilder.buildEdmTypeField('ControllingArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link fieldStatusVariant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIELD_STATUS_VARIANT: fieldBuilder.buildEdmTypeField('FieldStatusVariant', 'Edm.String', true),
                /**
                 * Static representation of the {@link nonTaxableTransactionTaxCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NON_TAXABLE_TRANSACTION_TAX_CODE: fieldBuilder.buildEdmTypeField('NonTaxableTransactionTaxCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link docDateIsUsedForTaxDetn} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOC_DATE_IS_USED_FOR_TAX_DETN: fieldBuilder.buildEdmTypeField('DocDateIsUsedForTaxDetn', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link taxRptgDateIsActive} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_RPTG_DATE_IS_ACTIVE: fieldBuilder.buildEdmTypeField('TaxRptgDateIsActive', 'Edm.Boolean', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', CompanyCode_1.CompanyCode)
            };
        }
        return this._schema;
    }
}
exports.CompanyCodeApi = CompanyCodeApi;
//# sourceMappingURL=CompanyCodeApi.js.map