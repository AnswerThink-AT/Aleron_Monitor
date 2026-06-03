"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvoiceAdditionalDataApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SuplrInvoiceAdditionalData_1 = require("./SuplrInvoiceAdditionalData");
const SuplrInvoiceAdditionalDataRequestBuilder_1 = require("./SuplrInvoiceAdditionalDataRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SuplrInvoiceAdditionalDataApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SuplrInvoiceAdditionalData_1.SuplrInvoiceAdditionalData;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new SuplrInvoiceAdditionalDataApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SuplrInvoiceAdditionalDataRequestBuilder_1.SuplrInvoiceAdditionalDataRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(SuplrInvoiceAdditionalData_1.SuplrInvoiceAdditionalData, this.deSerializers);
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
                 * Static representation of the {@link invoicingPartyName1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PARTY_NAME_1: fieldBuilder.buildEdmTypeField('InvoicingPartyName1', 'Edm.String', true),
                /**
                 * Static representation of the {@link invoicingPartyName2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PARTY_NAME_2: fieldBuilder.buildEdmTypeField('InvoicingPartyName2', 'Edm.String', true),
                /**
                 * Static representation of the {@link invoicingPartyName3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PARTY_NAME_3: fieldBuilder.buildEdmTypeField('InvoicingPartyName3', 'Edm.String', true),
                /**
                 * Static representation of the {@link invoicingPartyName4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PARTY_NAME_4: fieldBuilder.buildEdmTypeField('InvoicingPartyName4', 'Edm.String', true),
                /**
                 * Static representation of the {@link postalCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                POSTAL_CODE: fieldBuilder.buildEdmTypeField('PostalCode', 'Edm.String', true),
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
                 * Static representation of the {@link streetAddressName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STREET_ADDRESS_NAME: fieldBuilder.buildEdmTypeField('StreetAddressName', 'Edm.String', true),
                /**
                 * Static representation of the {@link poBox} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PO_BOX: fieldBuilder.buildEdmTypeField('POBox', 'Edm.String', true),
                /**
                 * Static representation of the {@link poBoxPostalCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PO_BOX_POSTAL_CODE: fieldBuilder.buildEdmTypeField('POBoxPostalCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link postOfficeBankAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                POST_OFFICE_BANK_ACCOUNT: fieldBuilder.buildEdmTypeField('PostOfficeBankAccount', 'Edm.String', true),
                /**
                 * Static representation of the {@link bankAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BANK_ACCOUNT: fieldBuilder.buildEdmTypeField('BankAccount', 'Edm.String', true),
                /**
                 * Static representation of the {@link bank} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BANK: fieldBuilder.buildEdmTypeField('Bank', 'Edm.String', true),
                /**
                 * Static representation of the {@link bankCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BANK_COUNTRY: fieldBuilder.buildEdmTypeField('BankCountry', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxId1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_ID_1: fieldBuilder.buildEdmTypeField('TaxID1', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxId2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_ID_2: fieldBuilder.buildEdmTypeField('TaxID2', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxId3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_ID_3: fieldBuilder.buildEdmTypeField('TaxID3', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxId4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_ID_4: fieldBuilder.buildEdmTypeField('TaxID4', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxId5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_ID_5: fieldBuilder.buildEdmTypeField('TaxID5', 'Edm.String', true),
                /**
                 * Static representation of the {@link oneTmeAccountIsVatLiable} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ONE_TME_ACCOUNT_IS_VAT_LIABLE: fieldBuilder.buildEdmTypeField('OneTmeAccountIsVATLiable', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link oneTmeAcctIsEqualizationTxSubj} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ONE_TME_ACCT_IS_EQUALIZATION_TX_SUBJ: fieldBuilder.buildEdmTypeField('OneTmeAcctIsEqualizationTxSubj', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link region} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REGION: fieldBuilder.buildEdmTypeField('Region', 'Edm.String', true),
                /**
                 * Static representation of the {@link bankControlKey} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BANK_CONTROL_KEY: fieldBuilder.buildEdmTypeField('BankControlKey', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataExchangeInstructionKey} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_EXCHANGE_INSTRUCTION_KEY: fieldBuilder.buildEdmTypeField('DataExchangeInstructionKey', 'Edm.String', true),
                /**
                 * Static representation of the {@link dataMediumExchangeIndicator} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_MEDIUM_EXCHANGE_INDICATOR: fieldBuilder.buildEdmTypeField('DataMediumExchangeIndicator', 'Edm.String', true),
                /**
                 * Static representation of the {@link languageCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LANGUAGE_CODE: fieldBuilder.buildEdmTypeField('LanguageCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link isOneTimeAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_ONE_TIME_ACCOUNT: fieldBuilder.buildEdmTypeField('IsOneTimeAccount', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link paymentRecipient} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_RECIPIENT: fieldBuilder.buildEdmTypeField('PaymentRecipient', 'Edm.String', true),
                /**
                 * Static representation of the {@link accountTaxType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCOUNT_TAX_TYPE: fieldBuilder.buildEdmTypeField('AccountTaxType', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxNumberType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_NUMBER_TYPE: fieldBuilder.buildEdmTypeField('TaxNumberType', 'Edm.String', true),
                /**
                 * Static representation of the {@link isNaturalPerson} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_NATURAL_PERSON: fieldBuilder.buildEdmTypeField('IsNaturalPerson', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link bankDetailReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BANK_DETAIL_REFERENCE: fieldBuilder.buildEdmTypeField('BankDetailReference', 'Edm.String', true),
                /**
                 * Static representation of the {@link representativeName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REPRESENTATIVE_NAME: fieldBuilder.buildEdmTypeField('RepresentativeName', 'Edm.String', true),
                /**
                 * Static representation of the {@link businessType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_TYPE: fieldBuilder.buildEdmTypeField('BusinessType', 'Edm.String', true),
                /**
                 * Static representation of the {@link industryType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INDUSTRY_TYPE: fieldBuilder.buildEdmTypeField('IndustryType', 'Edm.String', true),
                /**
                 * Static representation of the {@link formOfAddressName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FORM_OF_ADDRESS_NAME: fieldBuilder.buildEdmTypeField('FormOfAddressName', 'Edm.String', true),
                /**
                 * Static representation of the {@link vatRegistration} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAT_REGISTRATION: fieldBuilder.buildEdmTypeField('VATRegistration', 'Edm.String', true),
                /**
                 * Static representation of the {@link oneTimeAcctCntrySpecificRef1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ONE_TIME_ACCT_CNTRY_SPECIFIC_REF_1: fieldBuilder.buildEdmTypeField('OneTimeAcctCntrySpecificRef1', 'Edm.String', true),
                /**
                 * Static representation of the {@link iban} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IBAN: fieldBuilder.buildEdmTypeField('IBAN', 'Edm.String', true),
                /**
                 * Static representation of the {@link swiftCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SWIFT_CODE: fieldBuilder.buildEdmTypeField('SWIFTCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link oneTimeBusinessPartnerEmail} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ONE_TIME_BUSINESS_PARTNER_EMAIL: fieldBuilder.buildEdmTypeField('OneTimeBusinessPartnerEmail', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', SuplrInvoiceAdditionalData_1.SuplrInvoiceAdditionalData)
            };
        }
        return this._schema;
    }
}
exports.SuplrInvoiceAdditionalDataApi = SuplrInvoiceAdditionalDataApi;
//# sourceMappingURL=SuplrInvoiceAdditionalDataApi.js.map