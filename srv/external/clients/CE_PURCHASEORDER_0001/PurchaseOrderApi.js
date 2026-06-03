"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PurchaseOrder_1 = require("./PurchaseOrder");
const PurchaseOrderRequestBuilder_1 = require("./PurchaseOrderRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class PurchaseOrderApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = PurchaseOrder_1.PurchaseOrder;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new PurchaseOrderApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            PURCHASE_ORDER_ITEM: new odata_v4_1.OneToManyLink('_PurchaseOrderItem', this, linkedApis[0]),
            PURCHASE_ORDER_NOTE: new odata_v4_1.OneToManyLink('_PurchaseOrderNote', this, linkedApis[1]),
            PURCHASE_ORDER_PARTNER: new odata_v4_1.OneToManyLink('_PurchaseOrderPartner', this, linkedApis[2]),
            SUPPLIER_ADDRESS: new odata_v4_1.OneToOneLink('_SupplierAddress', this, linkedApis[3])
        };
        return this;
    }
    requestBuilder() {
        return new PurchaseOrderRequestBuilder_1.PurchaseOrderRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(PurchaseOrder_1.PurchaseOrder, this.deSerializers);
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
                 * Static representation of the {@link purchaseOrderType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_TYPE: fieldBuilder.buildEdmTypeField('PurchaseOrderType', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseOrderSubtype} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_SUBTYPE: fieldBuilder.buildEdmTypeField('PurchaseOrderSubtype', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchasingDocumentOrigin} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_DOCUMENT_ORIGIN: fieldBuilder.buildEdmTypeField('PurchasingDocumentOrigin', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchasingDocumentProcessCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_DOCUMENT_PROCESS_CODE: fieldBuilder.buildEdmTypeField('PurchasingDocumentProcessCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link createdByUser} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CREATED_BY_USER: fieldBuilder.buildEdmTypeField('CreatedByUser', 'Edm.String', false),
                /**
                 * Static representation of the {@link creationDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CREATION_DATE: fieldBuilder.buildEdmTypeField('CreationDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link purchaseOrderDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_DATE: fieldBuilder.buildEdmTypeField('PurchaseOrderDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link lastChangeDateTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGE_DATE_TIME: fieldBuilder.buildEdmTypeField('LastChangeDateTime', 'Edm.DateTimeOffset', true, 7),
                /**
                 * Static representation of the {@link validityStartDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link validityEndDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VALIDITY_END_DATE: fieldBuilder.buildEdmTypeField('ValidityEndDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link language} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseOrderDeletionCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_DELETION_CODE: fieldBuilder.buildEdmTypeField('PurchaseOrderDeletionCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link releaseIsNotCompleted} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RELEASE_IS_NOT_COMPLETED: fieldBuilder.buildEdmTypeField('ReleaseIsNotCompleted', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link purchasingCompletenessStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_COMPLETENESS_STATUS: fieldBuilder.buildEdmTypeField('PurchasingCompletenessStatus', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link purchasingProcessingStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_PROCESSING_STATUS: fieldBuilder.buildEdmTypeField('PurchasingProcessingStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link purgReleaseSequenceStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURG_RELEASE_SEQUENCE_STATUS: fieldBuilder.buildEdmTypeField('PurgReleaseSequenceStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link releaseCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RELEASE_CODE: fieldBuilder.buildEdmTypeField('ReleaseCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchasingReleaseStrategy} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_RELEASE_STRATEGY: fieldBuilder.buildEdmTypeField('PurchasingReleaseStrategy', 'Edm.String', false),
                /**
                 * Static representation of the {@link purgReasonForDocCancellation} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURG_REASON_FOR_DOC_CANCELLATION: fieldBuilder.buildEdmTypeField('PurgReasonForDocCancellation', 'Edm.String', false),
                /**
                 * Static representation of the {@link companyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchasingOrganization} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_ORGANIZATION: fieldBuilder.buildEdmTypeField('PurchasingOrganization', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchasingGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_GROUP: fieldBuilder.buildEdmTypeField('PurchasingGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplier} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', false),
                /**
                 * Static representation of the {@link manualSupplierAddressId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MANUAL_SUPPLIER_ADDRESS_ID: fieldBuilder.buildEdmTypeField('ManualSupplierAddressID', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplierAddressId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_ADDRESS_ID: fieldBuilder.buildEdmTypeField('SupplierAddressID', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplierRespSalesPersonName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_RESP_SALES_PERSON_NAME: fieldBuilder.buildEdmTypeField('SupplierRespSalesPersonName', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplierPhoneNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('SupplierPhoneNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplyingSupplier} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLYING_SUPPLIER: fieldBuilder.buildEdmTypeField('SupplyingSupplier', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplyingPlant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLYING_PLANT: fieldBuilder.buildEdmTypeField('SupplyingPlant', 'Edm.String', false),
                /**
                 * Static representation of the {@link invoicingParty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PARTY: fieldBuilder.buildEdmTypeField('InvoicingParty', 'Edm.String', false),
                /**
                 * Static representation of the {@link customer} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseContract} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_CONTRACT: fieldBuilder.buildEdmTypeField('PurchaseContract', 'Edm.String', false),
                /**
                 * Static representation of the {@link supplierQuotationExternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_QUOTATION_EXTERNAL_ID: fieldBuilder.buildEdmTypeField('SupplierQuotationExternalID', 'Edm.String', false),
                /**
                 * Static representation of the {@link quotationSubmissionDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                QUOTATION_SUBMISSION_DATE: fieldBuilder.buildEdmTypeField('QuotationSubmissionDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link itemNumberIntervalForSubItems} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ITEM_NUMBER_INTERVAL_FOR_SUB_ITEMS: fieldBuilder.buildEdmTypeField('ItemNumberIntervalForSubItems', 'Edm.String', false),
                /**
                 * Static representation of the {@link paymentTerms} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_TERMS: fieldBuilder.buildEdmTypeField('PaymentTerms', 'Edm.String', false),
                /**
                 * Static representation of the {@link cashDiscount1Days} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CASH_DISCOUNT_1_DAYS: fieldBuilder.buildEdmTypeField('CashDiscount1Days', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link cashDiscount2Days} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CASH_DISCOUNT_2_DAYS: fieldBuilder.buildEdmTypeField('CashDiscount2Days', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link netPaymentDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NET_PAYMENT_DAYS: fieldBuilder.buildEdmTypeField('NetPaymentDays', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link cashDiscount1Percent} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CASH_DISCOUNT_1_PERCENT: fieldBuilder.buildEdmTypeField('CashDiscount1Percent', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link cashDiscount2Percent} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CASH_DISCOUNT_2_PERCENT: fieldBuilder.buildEdmTypeField('CashDiscount2Percent', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link downPaymentType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOWN_PAYMENT_TYPE: fieldBuilder.buildEdmTypeField('DownPaymentType', 'Edm.String', false),
                /**
                 * Static representation of the {@link downPaymentPercentageOfTotAmt} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOWN_PAYMENT_PERCENTAGE_OF_TOT_AMT: fieldBuilder.buildEdmTypeField('DownPaymentPercentageOfTotAmt', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link downPaymentAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOWN_PAYMENT_AMOUNT: fieldBuilder.buildEdmTypeField('DownPaymentAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link downPaymentDueDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOWN_PAYMENT_DUE_DATE: fieldBuilder.buildEdmTypeField('DownPaymentDueDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link incotermsClassification} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_CLASSIFICATION: fieldBuilder.buildEdmTypeField('IncotermsClassification', 'Edm.String', false),
                /**
                 * Static representation of the {@link incotermsTransferLocation} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_TRANSFER_LOCATION: fieldBuilder.buildEdmTypeField('IncotermsTransferLocation', 'Edm.String', false),
                /**
                 * Static representation of the {@link incotermsVersion} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_VERSION: fieldBuilder.buildEdmTypeField('IncotermsVersion', 'Edm.String', false),
                /**
                 * Static representation of the {@link incotermsLocation1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_LOCATION_1: fieldBuilder.buildEdmTypeField('IncotermsLocation1', 'Edm.String', false),
                /**
                 * Static representation of the {@link incotermsLocation2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_LOCATION_2: fieldBuilder.buildEdmTypeField('IncotermsLocation2', 'Edm.String', false),
                /**
                 * Static representation of the {@link isIntrastatReportingRelevant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_INTRASTAT_REPORTING_RELEVANT: fieldBuilder.buildEdmTypeField('IsIntrastatReportingRelevant', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link isIntrastatReportingExcluded} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_INTRASTAT_REPORTING_EXCLUDED: fieldBuilder.buildEdmTypeField('IsIntrastatReportingExcluded', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link correspncExternalReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CORRESPNC_EXTERNAL_REFERENCE: fieldBuilder.buildEdmTypeField('CorrespncExternalReference', 'Edm.String', false),
                /**
                 * Static representation of the {@link correspncInternalReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CORRESPNC_INTERNAL_REFERENCE: fieldBuilder.buildEdmTypeField('CorrespncInternalReference', 'Edm.String', false),
                /**
                 * Static representation of the {@link pricingDocument} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_DOCUMENT: fieldBuilder.buildEdmTypeField('PricingDocument', 'Edm.String', false),
                /**
                 * Static representation of the {@link pricingProcedure} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_PROCEDURE: fieldBuilder.buildEdmTypeField('PricingProcedure', 'Edm.String', false),
                /**
                 * Static representation of the {@link documentCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField('DocumentCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link exchangeRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                EXCHANGE_RATE: fieldBuilder.buildEdmTypeField('ExchangeRate', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link exchangeRateIsFixed} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                EXCHANGE_RATE_IS_FIXED: fieldBuilder.buildEdmTypeField('ExchangeRateIsFixed', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link taxReturnCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_RETURN_COUNTRY: fieldBuilder.buildEdmTypeField('TaxReturnCountry', 'Edm.String', false),
                /**
                 * Static representation of the {@link vatRegistrationCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAT_REGISTRATION_COUNTRY: fieldBuilder.buildEdmTypeField('VATRegistrationCountry', 'Edm.String', false),
                /**
                 * Static representation of the {@link purgAggrgdProdCmplncSuplrSts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURG_AGGRGD_PROD_CMPLNC_SUPLR_STS: fieldBuilder.buildEdmTypeField('PurgAggrgdProdCmplncSuplrSts', 'Edm.String', false),
                /**
                 * Static representation of the {@link purgAggrgdProdMarketabilitySts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURG_AGGRGD_PROD_MARKETABILITY_STS: fieldBuilder.buildEdmTypeField('PurgAggrgdProdMarketabilitySts', 'Edm.String', false),
                /**
                 * Static representation of the {@link purgAggrgdSftyDataSheetStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURG_AGGRGD_SFTY_DATA_SHEET_STATUS: fieldBuilder.buildEdmTypeField('PurgAggrgdSftyDataSheetStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link purgProdCmplncTotDngrsGoodsSts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURG_PROD_CMPLNC_TOT_DNGRS_GOODS_STS: fieldBuilder.buildEdmTypeField('PurgProdCmplncTotDngrsGoodsSts', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchasingCollectiveNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASING_COLLECTIVE_NUMBER: fieldBuilder.buildEdmTypeField('PurchasingCollectiveNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link sapMessages} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SAP_MESSAGES: fieldBuilder.buildCollectionField('SAP__Messages', Sap_Message_1.Sap_Message, false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', PurchaseOrder_1.PurchaseOrder)
            };
        }
        return this._schema;
    }
}
exports.PurchaseOrderApi = PurchaseOrderApi;
//# sourceMappingURL=PurchaseOrderApi.js.map