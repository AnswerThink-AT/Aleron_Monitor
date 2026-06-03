"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SupplierInvoice_1 = require("./SupplierInvoice");
const SupplierInvoiceRequestBuilder_1 = require("./SupplierInvoiceRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SupplierInvoiceApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SupplierInvoice_1.SupplierInvoice;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new SupplierInvoiceApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_SELECTED_DELIVERY_NOTES: new odata_v2_1.Link('to_SelectedDeliveryNotes', this, linkedApis[0]),
            TO_SELECTED_PURCHASE_ORDERS: new odata_v2_1.Link('to_SelectedPurchaseOrders', this, linkedApis[1]),
            TO_SELECTED_SERVICE_ENTRY_SHEETS: new odata_v2_1.Link('to_SelectedServiceEntrySheets', this, linkedApis[2]),
            TO_SUPLR_INVC_ITEM_ASSET: new odata_v2_1.Link('to_SuplrInvcItemAsset', this, linkedApis[3]),
            TO_SUPLR_INVC_ITEM_MATERIAL: new odata_v2_1.Link('to_SuplrInvcItemMaterial', this, linkedApis[4]),
            TO_SUPLR_INVC_ITEM_PUR_ORD_REF: new odata_v2_1.Link('to_SuplrInvcItemPurOrdRef', this, linkedApis[5]),
            TO_SUPLR_INVOICE_ADDITIONAL_DATA: new odata_v2_1.OneToOneLink('to_SuplrInvoiceAdditionalData', this, linkedApis[6]),
            TO_SUPPLIER_INVOICE_ITEM_GL_ACCT: new odata_v2_1.Link('to_SupplierInvoiceItemGLAcct', this, linkedApis[7]),
            TO_SUPPLIER_INVOICE_ODN: new odata_v2_1.Link('to_SupplierInvoiceODN', this, linkedApis[8]),
            TO_SUPPLIER_INVOICE_TAX: new odata_v2_1.Link('to_SupplierInvoiceTax', this, linkedApis[9]),
            TO_SUPPLIER_INVOICE_WHLDG_TAX: new odata_v2_1.Link('to_SupplierInvoiceWhldgTax', this, linkedApis[10])
        };
        return this;
    }
    requestBuilder() {
        return new SupplierInvoiceRequestBuilder_1.SupplierInvoiceRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(SupplierInvoice_1.SupplierInvoice, this.deSerializers);
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
                 * Static representation of the {@link companyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link documentDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOCUMENT_DATE: fieldBuilder.buildEdmTypeField('DocumentDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link postingDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                POSTING_DATE: fieldBuilder.buildEdmTypeField('PostingDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link creationDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CREATION_DATE: fieldBuilder.buildEdmTypeField('CreationDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link suplrInvcLstChgDteTmeTxt} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPLR_INVC_LST_CHG_DTE_TME_TXT: fieldBuilder.buildEdmTypeField('SuplrInvcLstChgDteTmeTxt', 'Edm.String', true),
                /**
                 * Static representation of the {@link supplierInvoiceIdByInvcgParty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_INVOICE_ID_BY_INVCG_PARTY: fieldBuilder.buildEdmTypeField('SupplierInvoiceIDByInvcgParty', 'Edm.String', true),
                /**
                 * Static representation of the {@link invoicingParty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICING_PARTY: fieldBuilder.buildEdmTypeField('InvoicingParty', 'Edm.String', true),
                /**
                 * Static representation of the {@link documentCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField('DocumentCurrency', 'Edm.String', true),
                /**
                 * Static representation of the {@link invoiceGrossAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICE_GROSS_AMOUNT: fieldBuilder.buildEdmTypeField('InvoiceGrossAmount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link unplannedDeliveryCost} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UNPLANNED_DELIVERY_COST: fieldBuilder.buildEdmTypeField('UnplannedDeliveryCost', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link documentHeaderText} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOCUMENT_HEADER_TEXT: fieldBuilder.buildEdmTypeField('DocumentHeaderText', 'Edm.String', true),
                /**
                 * Static representation of the {@link manualCashDiscount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MANUAL_CASH_DISCOUNT: fieldBuilder.buildEdmTypeField('ManualCashDiscount', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link paymentTerms} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_TERMS: fieldBuilder.buildEdmTypeField('PaymentTerms', 'Edm.String', true),
                /**
                 * Static representation of the {@link dueCalculationBaseDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DUE_CALCULATION_BASE_DATE: fieldBuilder.buildEdmTypeField('DueCalculationBaseDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link cashDiscount1Percent} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CASH_DISCOUNT_1_PERCENT: fieldBuilder.buildEdmTypeField('CashDiscount1Percent', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link cashDiscount1Days} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CASH_DISCOUNT_1_DAYS: fieldBuilder.buildEdmTypeField('CashDiscount1Days', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link cashDiscount2Percent} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CASH_DISCOUNT_2_PERCENT: fieldBuilder.buildEdmTypeField('CashDiscount2Percent', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link cashDiscount2Days} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CASH_DISCOUNT_2_DAYS: fieldBuilder.buildEdmTypeField('CashDiscount2Days', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link netPaymentDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                NET_PAYMENT_DAYS: fieldBuilder.buildEdmTypeField('NetPaymentDays', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link paymentBlockingReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_BLOCKING_REASON: fieldBuilder.buildEdmTypeField('PaymentBlockingReason', 'Edm.String', true),
                /**
                 * Static representation of the {@link accountingDocumentType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCOUNTING_DOCUMENT_TYPE: fieldBuilder.buildEdmTypeField('AccountingDocumentType', 'Edm.String', true),
                /**
                 * Static representation of the {@link bpBankAccountInternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BP_BANK_ACCOUNT_INTERNAL_ID: fieldBuilder.buildEdmTypeField('BPBankAccountInternalID', 'Edm.String', true),
                /**
                 * Static representation of the {@link supplierInvoiceStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_INVOICE_STATUS: fieldBuilder.buildEdmTypeField('SupplierInvoiceStatus', 'Edm.String', true),
                /**
                 * Static representation of the {@link indirectQuotedExchangeRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INDIRECT_QUOTED_EXCHANGE_RATE: fieldBuilder.buildEdmTypeField('IndirectQuotedExchangeRate', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link directQuotedExchangeRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DIRECT_QUOTED_EXCHANGE_RATE: fieldBuilder.buildEdmTypeField('DirectQuotedExchangeRate', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link stateCentralBankPaymentReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STATE_CENTRAL_BANK_PAYMENT_REASON: fieldBuilder.buildEdmTypeField('StateCentralBankPaymentReason', 'Edm.String', true),
                /**
                 * Static representation of the {@link supplyingCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLYING_COUNTRY: fieldBuilder.buildEdmTypeField('SupplyingCountry', 'Edm.String', true),
                /**
                 * Static representation of the {@link paymentMethod} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_METHOD: fieldBuilder.buildEdmTypeField('PaymentMethod', 'Edm.String', true),
                /**
                 * Static representation of the {@link paymentMethodSupplement} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_METHOD_SUPPLEMENT: fieldBuilder.buildEdmTypeField('PaymentMethodSupplement', 'Edm.String', true),
                /**
                 * Static representation of the {@link paymentReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_REFERENCE: fieldBuilder.buildEdmTypeField('PaymentReference', 'Edm.String', true),
                /**
                 * Static representation of the {@link invoiceReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICE_REFERENCE: fieldBuilder.buildEdmTypeField('InvoiceReference', 'Edm.String', true),
                /**
                 * Static representation of the {@link invoiceReferenceFiscalYear} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICE_REFERENCE_FISCAL_YEAR: fieldBuilder.buildEdmTypeField('InvoiceReferenceFiscalYear', 'Edm.String', true),
                /**
                 * Static representation of the {@link fixedCashDiscount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIXED_CASH_DISCOUNT: fieldBuilder.buildEdmTypeField('FixedCashDiscount', 'Edm.String', true),
                /**
                 * Static representation of the {@link unplannedDeliveryCostTaxCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UNPLANNED_DELIVERY_COST_TAX_CODE: fieldBuilder.buildEdmTypeField('UnplannedDeliveryCostTaxCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link unplndDelivCostTaxJurisdiction} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UNPLND_DELIV_COST_TAX_JURISDICTION: fieldBuilder.buildEdmTypeField('UnplndDelivCostTaxJurisdiction', 'Edm.String', true),
                /**
                 * Static representation of the {@link unplndDeliveryCostTaxCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UNPLND_DELIVERY_COST_TAX_COUNTRY: fieldBuilder.buildEdmTypeField('UnplndDeliveryCostTaxCountry', 'Edm.String', true),
                /**
                 * Static representation of the {@link assignmentReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ASSIGNMENT_REFERENCE: fieldBuilder.buildEdmTypeField('AssignmentReference', 'Edm.String', true),
                /**
                 * Static representation of the {@link supplierPostingLineItemText} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_POSTING_LINE_ITEM_TEXT: fieldBuilder.buildEdmTypeField('SupplierPostingLineItemText', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxIsCalculatedAutomatically} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_IS_CALCULATED_AUTOMATICALLY: fieldBuilder.buildEdmTypeField('TaxIsCalculatedAutomatically', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link businessPlace} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PLACE: fieldBuilder.buildEdmTypeField('BusinessPlace', 'Edm.String', true),
                /**
                 * Static representation of the {@link businessSectionCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_SECTION_CODE: fieldBuilder.buildEdmTypeField('BusinessSectionCode', 'Edm.String', true),
                /**
                 * Static representation of the {@link businessArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_AREA: fieldBuilder.buildEdmTypeField('BusinessArea', 'Edm.String', true),
                /**
                 * Static representation of the {@link suplrInvcIsCapitalGoodsRelated} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPLR_INVC_IS_CAPITAL_GOODS_RELATED: fieldBuilder.buildEdmTypeField('SuplrInvcIsCapitalGoodsRelated', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link supplierInvoiceIsCreditMemo} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_INVOICE_IS_CREDIT_MEMO: fieldBuilder.buildEdmTypeField('SupplierInvoiceIsCreditMemo', 'Edm.String', true),
                /**
                 * Static representation of the {@link paytSlipWthRefSubscriber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYT_SLIP_WTH_REF_SUBSCRIBER: fieldBuilder.buildEdmTypeField('PaytSlipWthRefSubscriber', 'Edm.String', true),
                /**
                 * Static representation of the {@link paytSlipWthRefCheckDigit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYT_SLIP_WTH_REF_CHECK_DIGIT: fieldBuilder.buildEdmTypeField('PaytSlipWthRefCheckDigit', 'Edm.String', true),
                /**
                 * Static representation of the {@link paytSlipWthRefReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYT_SLIP_WTH_REF_REFERENCE: fieldBuilder.buildEdmTypeField('PaytSlipWthRefReference', 'Edm.String', true),
                /**
                 * Static representation of the {@link taxDeterminationDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_DETERMINATION_DATE: fieldBuilder.buildEdmTypeField('TaxDeterminationDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link taxReportingDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_REPORTING_DATE: fieldBuilder.buildEdmTypeField('TaxReportingDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link taxFulfillmentDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_FULFILLMENT_DATE: fieldBuilder.buildEdmTypeField('TaxFulfillmentDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link invoiceReceiptDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVOICE_RECEIPT_DATE: fieldBuilder.buildEdmTypeField('InvoiceReceiptDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link deliveryOfGoodsReportingCntry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DELIVERY_OF_GOODS_REPORTING_CNTRY: fieldBuilder.buildEdmTypeField('DeliveryOfGoodsReportingCntry', 'Edm.String', true),
                /**
                 * Static representation of the {@link supplierVatRegistration} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_VAT_REGISTRATION: fieldBuilder.buildEdmTypeField('SupplierVATRegistration', 'Edm.String', true),
                /**
                 * Static representation of the {@link isEuTriangularDeal} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_EU_TRIANGULAR_DEAL: fieldBuilder.buildEdmTypeField('IsEUTriangularDeal', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link suplrInvcDebitCrdtCodeDelivery} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPLR_INVC_DEBIT_CRDT_CODE_DELIVERY: fieldBuilder.buildEdmTypeField('SuplrInvcDebitCrdtCodeDelivery', 'Edm.String', true),
                /**
                 * Static representation of the {@link suplrInvcDebitCrdtCodeReturns} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPLR_INVC_DEBIT_CRDT_CODE_RETURNS: fieldBuilder.buildEdmTypeField('SuplrInvcDebitCrdtCodeReturns', 'Edm.String', true),
                /**
                 * Static representation of the {@link retentionDueDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RETENTION_DUE_DATE: fieldBuilder.buildEdmTypeField('RetentionDueDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link paymentReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_REASON: fieldBuilder.buildEdmTypeField('PaymentReason', 'Edm.String', true),
                /**
                 * Static representation of the {@link houseBank} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                HOUSE_BANK: fieldBuilder.buildEdmTypeField('HouseBank', 'Edm.String', true),
                /**
                 * Static representation of the {@link houseBankAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                HOUSE_BANK_ACCOUNT: fieldBuilder.buildEdmTypeField('HouseBankAccount', 'Edm.String', true),
                /**
                 * Static representation of the {@link alternativePayeePayer} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ALTERNATIVE_PAYEE_PAYER: fieldBuilder.buildEdmTypeField('AlternativePayeePayer', 'Edm.String', true),
                /**
                 * Static representation of the {@link supplierInvoiceOrigin} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER_INVOICE_ORIGIN: fieldBuilder.buildEdmTypeField('SupplierInvoiceOrigin', 'Edm.String', true),
                /**
                 * Static representation of the {@link reverseDocument} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REVERSE_DOCUMENT: fieldBuilder.buildEdmTypeField('ReverseDocument', 'Edm.String', true),
                /**
                 * Static representation of the {@link reverseDocumentFiscalYear} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REVERSE_DOCUMENT_FISCAL_YEAR: fieldBuilder.buildEdmTypeField('ReverseDocumentFiscalYear', 'Edm.String', true),
                /**
                 * Static representation of the {@link isReversal} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_REVERSAL: fieldBuilder.buildEdmTypeField('IsReversal', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link isReversed} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_REVERSED: fieldBuilder.buildEdmTypeField('IsReversed', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link inGstPartner} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IN_GST_PARTNER: fieldBuilder.buildEdmTypeField('IN_GSTPartner', 'Edm.String', true),
                /**
                 * Static representation of the {@link inGstPlaceOfSupply} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IN_GST_PLACE_OF_SUPPLY: fieldBuilder.buildEdmTypeField('IN_GSTPlaceOfSupply', 'Edm.String', true),
                /**
                 * Static representation of the {@link inInvoiceReferenceNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IN_INVOICE_REFERENCE_NUMBER: fieldBuilder.buildEdmTypeField('IN_InvoiceReferenceNumber', 'Edm.String', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificRef1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_REF_1: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificRef1', 'Edm.String', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificDate1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_DATE_1: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificDate1', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificRef2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_REF_2: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificRef2', 'Edm.String', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificDate2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_DATE_2: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificDate2', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificRef3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_REF_3: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificRef3', 'Edm.String', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificDate3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_DATE_3: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificDate3', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificRef4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_REF_4: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificRef4', 'Edm.String', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificDate4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_DATE_4: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificDate4', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificRef5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_REF_5: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificRef5', 'Edm.String', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificDate5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_DATE_5: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificDate5', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificBp1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_BP_1: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificBP1', 'Edm.String', true),
                /**
                 * Static representation of the {@link jrnlEntryCntrySpecificBp2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                JRNL_ENTRY_CNTRY_SPECIFIC_BP_2: fieldBuilder.buildEdmTypeField('JrnlEntryCntrySpecificBP2', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', SupplierInvoice_1.SupplierInvoice)
            };
        }
        return this._schema;
    }
}
exports.SupplierInvoiceApi = SupplierInvoiceApi;
//# sourceMappingURL=SupplierInvoiceApi.js.map