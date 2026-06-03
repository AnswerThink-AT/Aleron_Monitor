"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SalesOrder_1 = require("./SalesOrder");
const SalesOrderRequestBuilder_1 = require("./SalesOrderRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class SalesOrderApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = SalesOrder_1.SalesOrder;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new SalesOrderApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            ITEM: new odata_v4_1.OneToManyLink('_Item', this, linkedApis[0]),
            PARTNER: new odata_v4_1.OneToManyLink('_Partner', this, linkedApis[1]),
            PRICING_ELEMENT: new odata_v4_1.OneToManyLink('_PricingElement', this, linkedApis[2]),
            TEXT: new odata_v4_1.OneToManyLink('_Text', this, linkedApis[3])
        };
        return this;
    }
    requestBuilder() {
        return new SalesOrderRequestBuilder_1.SalesOrderRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(SalesOrder_1.SalesOrder, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link salesOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER: fieldBuilder.buildEdmTypeField('SalesOrder', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrderType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_TYPE: fieldBuilder.buildEdmTypeField('SalesOrderType', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrderProcessingType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_PROCESSING_TYPE: fieldBuilder.buildEdmTypeField('SalesOrderProcessingType', 'Edm.String', false),
                /**
                 * Static representation of the {@link soldToParty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SOLD_TO_PARTY: fieldBuilder.buildEdmTypeField('SoldToParty', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrganization} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORGANIZATION: fieldBuilder.buildEdmTypeField('SalesOrganization', 'Edm.String', false),
                /**
                 * Static representation of the {@link distributionChannel} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DISTRIBUTION_CHANNEL: fieldBuilder.buildEdmTypeField('DistributionChannel', 'Edm.String', false),
                /**
                 * Static representation of the {@link referenceDistributionChannel} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REFERENCE_DISTRIBUTION_CHANNEL: fieldBuilder.buildEdmTypeField('ReferenceDistributionChannel', 'Edm.String', false),
                /**
                 * Static representation of the {@link organizationDivision} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ORGANIZATION_DIVISION: fieldBuilder.buildEdmTypeField('OrganizationDivision', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOffice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_OFFICE: fieldBuilder.buildEdmTypeField('SalesOffice', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_GROUP: fieldBuilder.buildEdmTypeField('SalesGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesDistrict} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_DISTRICT: fieldBuilder.buildEdmTypeField('SalesDistrict', 'Edm.String', false),
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
                 * Static representation of the {@link creationTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CREATION_TIME: fieldBuilder.buildEdmTypeField('CreationTime', 'Edm.TimeOfDay', false),
                /**
                 * Static representation of the {@link lastChangeDateTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGE_DATE_TIME: fieldBuilder.buildEdmTypeField('LastChangeDateTime', 'Edm.DateTimeOffset', true, 7),
                /**
                 * Static representation of the {@link lastChangedByUser} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LAST_CHANGED_BY_USER: fieldBuilder.buildEdmTypeField('LastChangedByUser', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseOrderByCustomer} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_BY_CUSTOMER: fieldBuilder.buildEdmTypeField('PurchaseOrderByCustomer', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseOrderByShipToParty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_BY_SHIP_TO_PARTY: fieldBuilder.buildEdmTypeField('PurchaseOrderByShipToParty', 'Edm.String', false),
                /**
                 * Static representation of the {@link customerPurchaseOrderType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_PURCHASE_ORDER_TYPE: fieldBuilder.buildEdmTypeField('CustomerPurchaseOrderType', 'Edm.String', false),
                /**
                 * Static representation of the {@link customerPurchaseOrderDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_PURCHASE_ORDER_DATE: fieldBuilder.buildEdmTypeField('CustomerPurchaseOrderDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link businessSolutionOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_SOLUTION_ORDER: fieldBuilder.buildEdmTypeField('BusinessSolutionOrder', 'Edm.String', false),
                /**
                 * Static representation of the {@link referenceSdDocument} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REFERENCE_SD_DOCUMENT: fieldBuilder.buildEdmTypeField('ReferenceSDDocument', 'Edm.String', false),
                /**
                 * Static representation of the {@link referenceSdDocumentCategory} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REFERENCE_SD_DOCUMENT_CATEGORY: fieldBuilder.buildEdmTypeField('ReferenceSDDocumentCategory', 'Edm.String', false),
                /**
                 * Static representation of the {@link sdDocumentReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SD_DOCUMENT_REASON: fieldBuilder.buildEdmTypeField('SDDocumentReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrderDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_DATE: fieldBuilder.buildEdmTypeField('SalesOrderDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link requestedDeliveryDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REQUESTED_DELIVERY_DATE: fieldBuilder.buildEdmTypeField('RequestedDeliveryDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link pricingDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICING_DATE: fieldBuilder.buildEdmTypeField('PricingDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link servicesRenderedDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SERVICES_RENDERED_DATE: fieldBuilder.buildEdmTypeField('ServicesRenderedDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link billingDocumentDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BILLING_DOCUMENT_DATE: fieldBuilder.buildEdmTypeField('BillingDocumentDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link totalNetAmount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TOTAL_NET_AMOUNT: fieldBuilder.buildEdmTypeField('TotalNetAmount', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link transactionCurrency} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TRANSACTION_CURRENCY: fieldBuilder.buildEdmTypeField('TransactionCurrency', 'Edm.String', false),
                /**
                 * Static representation of the {@link deliveryDateTypeRule} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DELIVERY_DATE_TYPE_RULE: fieldBuilder.buildEdmTypeField('DeliveryDateTypeRule', 'Edm.String', false),
                /**
                 * Static representation of the {@link shippingCondition} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SHIPPING_CONDITION: fieldBuilder.buildEdmTypeField('ShippingCondition', 'Edm.String', false),
                /**
                 * Static representation of the {@link completeDeliveryIsDefined} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPLETE_DELIVERY_IS_DEFINED: fieldBuilder.buildEdmTypeField('CompleteDeliveryIsDefined', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link slsDocIsRlvtForProofOfDeliv} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SLS_DOC_IS_RLVT_FOR_PROOF_OF_DELIV: fieldBuilder.buildEdmTypeField('SlsDocIsRlvtForProofOfDeliv', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link shippingType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SHIPPING_TYPE: fieldBuilder.buildEdmTypeField('ShippingType', 'Edm.String', false),
                /**
                 * Static representation of the {@link receivingPoint} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RECEIVING_POINT: fieldBuilder.buildEdmTypeField('ReceivingPoint', 'Edm.String', false),
                /**
                 * Static representation of the {@link incotermsClassification} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INCOTERMS_CLASSIFICATION: fieldBuilder.buildEdmTypeField('IncotermsClassification', 'Edm.String', false),
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
                 * Static representation of the {@link sdPricingProcedure} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SD_PRICING_PROCEDURE: fieldBuilder.buildEdmTypeField('SDPricingProcedure', 'Edm.String', false),
                /**
                 * Static representation of the {@link customerPriceGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_PRICE_GROUP: fieldBuilder.buildEdmTypeField('CustomerPriceGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link priceListType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRICE_LIST_TYPE: fieldBuilder.buildEdmTypeField('PriceListType', 'Edm.String', false),
                /**
                 * Static representation of the {@link fixedValueDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIXED_VALUE_DATE: fieldBuilder.buildEdmTypeField('FixedValueDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link taxDepartureCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_DEPARTURE_COUNTRY: fieldBuilder.buildEdmTypeField('TaxDepartureCountry', 'Edm.String', false),
                /**
                 * Static representation of the {@link vatRegistrationCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAT_REGISTRATION_COUNTRY: fieldBuilder.buildEdmTypeField('VATRegistrationCountry', 'Edm.String', false),
                /**
                 * Static representation of the {@link isEuTriangularDeal} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_EU_TRIANGULAR_DEAL: fieldBuilder.buildEdmTypeField('IsEUTriangularDeal', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link customerPaymentTerms} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_PAYMENT_TERMS: fieldBuilder.buildEdmTypeField('CustomerPaymentTerms', 'Edm.String', false),
                /**
                 * Static representation of the {@link paymentMethod} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PAYMENT_METHOD: fieldBuilder.buildEdmTypeField('PaymentMethod', 'Edm.String', false),
                /**
                 * Static representation of the {@link billingCompanyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BILLING_COMPANY_CODE: fieldBuilder.buildEdmTypeField('BillingCompanyCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link controllingArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONTROLLING_AREA: fieldBuilder.buildEdmTypeField('ControllingArea', 'Edm.String', false),
                /**
                 * Static representation of the {@link customerAccountAssignmentGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_ACCOUNT_ASSIGNMENT_GROUP: fieldBuilder.buildEdmTypeField('CustomerAccountAssignmentGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link assignmentReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ASSIGNMENT_REFERENCE: fieldBuilder.buildEdmTypeField('AssignmentReference', 'Edm.String', false),
                /**
                 * Static representation of the {@link accountingDocExternalReference} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCOUNTING_DOC_EXTERNAL_REFERENCE: fieldBuilder.buildEdmTypeField('AccountingDocExternalReference', 'Edm.String', false),
                /**
                 * Static representation of the {@link customerCreditAccount} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_CREDIT_ACCOUNT: fieldBuilder.buildEdmTypeField('CustomerCreditAccount', 'Edm.String', false),
                /**
                 * Static representation of the {@link headerBillingBlockReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                HEADER_BILLING_BLOCK_REASON: fieldBuilder.buildEdmTypeField('HeaderBillingBlockReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link deliveryBlockReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DELIVERY_BLOCK_REASON: fieldBuilder.buildEdmTypeField('DeliveryBlockReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrderApprovalReason} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_APPROVAL_REASON: fieldBuilder.buildEdmTypeField('SalesOrderApprovalReason', 'Edm.String', false),
                /**
                 * Static representation of the {@link customerGroup} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER_GROUP: fieldBuilder.buildEdmTypeField('CustomerGroup', 'Edm.String', false),
                /**
                 * Static representation of the {@link additionalCustomerGroup1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDITIONAL_CUSTOMER_GROUP_1: fieldBuilder.buildEdmTypeField('AdditionalCustomerGroup1', 'Edm.String', false),
                /**
                 * Static representation of the {@link additionalCustomerGroup2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDITIONAL_CUSTOMER_GROUP_2: fieldBuilder.buildEdmTypeField('AdditionalCustomerGroup2', 'Edm.String', false),
                /**
                 * Static representation of the {@link additionalCustomerGroup3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDITIONAL_CUSTOMER_GROUP_3: fieldBuilder.buildEdmTypeField('AdditionalCustomerGroup3', 'Edm.String', false),
                /**
                 * Static representation of the {@link additionalCustomerGroup4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDITIONAL_CUSTOMER_GROUP_4: fieldBuilder.buildEdmTypeField('AdditionalCustomerGroup4', 'Edm.String', false),
                /**
                 * Static representation of the {@link additionalCustomerGroup5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDITIONAL_CUSTOMER_GROUP_5: fieldBuilder.buildEdmTypeField('AdditionalCustomerGroup5', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallSdProcessStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_SD_PROCESS_STATUS: fieldBuilder.buildEdmTypeField('OverallSDProcessStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallDeliveryBlockStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_DELIVERY_BLOCK_STATUS: fieldBuilder.buildEdmTypeField('OverallDeliveryBlockStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallBillingBlockStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_BILLING_BLOCK_STATUS: fieldBuilder.buildEdmTypeField('OverallBillingBlockStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallDeliveryStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_DELIVERY_STATUS: fieldBuilder.buildEdmTypeField('OverallDeliveryStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link totalCreditCheckStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TOTAL_CREDIT_CHECK_STATUS: fieldBuilder.buildEdmTypeField('TotalCreditCheckStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallSdDocumentRejectionSts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_SD_DOCUMENT_REJECTION_STS: fieldBuilder.buildEdmTypeField('OverallSDDocumentRejectionSts', 'Edm.String', false),
                /**
                 * Static representation of the {@link totalBlockStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TOTAL_BLOCK_STATUS: fieldBuilder.buildEdmTypeField('TotalBlockStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link hdrGeneralIncompletionStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                HDR_GENERAL_INCOMPLETION_STATUS: fieldBuilder.buildEdmTypeField('HdrGeneralIncompletionStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link ovrlItmGeneralIncompletionSts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVRL_ITM_GENERAL_INCOMPLETION_STS: fieldBuilder.buildEdmTypeField('OvrlItmGeneralIncompletionSts', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallSdDocReferenceStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_SD_DOC_REFERENCE_STATUS: fieldBuilder.buildEdmTypeField('OverallSDDocReferenceStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesDocApprovalStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_DOC_APPROVAL_STATUS: fieldBuilder.buildEdmTypeField('SalesDocApprovalStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallChmlCmplncStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_CHML_CMPLNC_STATUS: fieldBuilder.buildEdmTypeField('OverallChmlCmplncStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallDangerousGoodsStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_DANGEROUS_GOODS_STATUS: fieldBuilder.buildEdmTypeField('OverallDangerousGoodsStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallSafetyDataSheetStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_SAFETY_DATA_SHEET_STATUS: fieldBuilder.buildEdmTypeField('OverallSafetyDataSheetStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallTrdCmplncEmbargoSts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_TRD_CMPLNC_EMBARGO_STS: fieldBuilder.buildEdmTypeField('OverallTrdCmplncEmbargoSts', 'Edm.String', false),
                /**
                 * Static representation of the {@link ovrlTrdCmplncSnctndListChkSts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVRL_TRD_CMPLNC_SNCTND_LIST_CHK_STS: fieldBuilder.buildEdmTypeField('OvrlTrdCmplncSnctndListChkSts', 'Edm.String', false),
                /**
                 * Static representation of the {@link ovrlTrdCmplncLegalCtrlChkSts} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVRL_TRD_CMPLNC_LEGAL_CTRL_CHK_STS: fieldBuilder.buildEdmTypeField('OvrlTrdCmplncLegalCtrlChkSts', 'Edm.String', false),
                /**
                 * Static representation of the {@link salesOrderDownPaymentStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_DOWN_PAYMENT_STATUS: fieldBuilder.buildEdmTypeField('SalesOrderDownPaymentStatus', 'Edm.String', false),
                /**
                 * Static representation of the {@link overallOrdReltdBillgStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OVERALL_ORD_RELTD_BILLG_STATUS: fieldBuilder.buildEdmTypeField('OverallOrdReltdBillgStatus', 'Edm.String', false),
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
                ALL_FIELDS: new odata_v4_1.AllFields('*', SalesOrder_1.SalesOrder)
            };
        }
        return this._schema;
    }
}
exports.SalesOrderApi = SalesOrderApi;
//# sourceMappingURL=SalesOrderApi.js.map