/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SalesOrder } from './SalesOrder';
import { SalesOrderRequestBuilder } from './SalesOrderRequestBuilder';
import { SalesOrderItemApi } from './SalesOrderItemApi';
import { SalesOrderPartnerApi } from './SalesOrderPartnerApi';
import { SalesOrderPricingElementApi } from './SalesOrderPricingElementApi';
import { SalesOrderTextApi } from './SalesOrderTextApi';
import { Sap_Message } from './Sap_Message';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  CollectionField,
  OneToManyLink
} from '@sap-cloud-sdk/odata-v4';
export declare class SalesOrderApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SalesOrder<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SalesOrderApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      SalesOrderItemApi<DeSerializersT>,
      SalesOrderPartnerApi<DeSerializersT>,
      SalesOrderPricingElementApi<DeSerializersT>,
      SalesOrderTextApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof SalesOrder;
  requestBuilder(): SalesOrderRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SalesOrder<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<SalesOrder<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof SalesOrder, DeSerializersT>;
  private _schema?;
  get schema(): {
    SALES_ORDER: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_TYPE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_PROCESSING_TYPE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SOLD_TO_PARTY: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORGANIZATION: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DISTRIBUTION_CHANNEL: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_DISTRIBUTION_CHANNEL: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_DIVISION: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_OFFICE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_GROUP: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_DISTRICT: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CREATION_DATE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    CREATION_TIME: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      false,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGED_BY_USER: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_BY_CUSTOMER: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_BY_SHIP_TO_PARTY: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PURCHASE_ORDER_TYPE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PURCHASE_ORDER_DATE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    BUSINESS_SOLUTION_ORDER: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_SD_DOCUMENT: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_SD_DOCUMENT_CATEGORY: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SD_DOCUMENT_REASON: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_DATE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    REQUESTED_DELIVERY_DATE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    PRICING_DATE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    SERVICES_RENDERED_DATE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    BILLING_DOCUMENT_DATE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    TOTAL_NET_AMOUNT: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    TRANSACTION_CURRENCY: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_DATE_TYPE_RULE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SHIPPING_CONDITION: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPLETE_DELIVERY_IS_DEFINED: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    SLS_DOC_IS_RLVT_FOR_PROOF_OF_DELIV: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    SHIPPING_TYPE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    RECEIVING_POINT: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_CLASSIFICATION: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_VERSION: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_1: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_2: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SD_PRICING_PROCEDURE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PRICE_GROUP: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICE_LIST_TYPE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FIXED_VALUE_DATE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    TAX_DEPARTURE_COUNTRY: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAT_REGISTRATION_COUNTRY: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IS_EU_TRIANGULAR_DEAL: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CUSTOMER_PAYMENT_TERMS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PAYMENT_METHOD: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BILLING_COMPANY_CODE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONTROLLING_AREA: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_ACCOUNT_ASSIGNMENT_GROUP: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ASSIGNMENT_REFERENCE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ACCOUNTING_DOC_EXTERNAL_REFERENCE: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_CREDIT_ACCOUNT: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    HEADER_BILLING_BLOCK_REASON: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_BLOCK_REASON: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_APPROVAL_REASON: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_GROUP: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDITIONAL_CUSTOMER_GROUP_1: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDITIONAL_CUSTOMER_GROUP_2: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDITIONAL_CUSTOMER_GROUP_3: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDITIONAL_CUSTOMER_GROUP_4: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDITIONAL_CUSTOMER_GROUP_5: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_SD_PROCESS_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_DELIVERY_BLOCK_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_BILLING_BLOCK_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_DELIVERY_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TOTAL_CREDIT_CHECK_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_SD_DOCUMENT_REJECTION_STS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TOTAL_BLOCK_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    HDR_GENERAL_INCOMPLETION_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVRL_ITM_GENERAL_INCOMPLETION_STS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_SD_DOC_REFERENCE_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_DOC_APPROVAL_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_CHML_CMPLNC_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_DANGEROUS_GOODS_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_SAFETY_DATA_SHEET_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_TRD_CMPLNC_EMBARGO_STS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVRL_TRD_CMPLNC_SNCTND_LIST_CHK_STS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVRL_TRD_CMPLNC_LEGAL_CTRL_CHK_STS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_DOWN_PAYMENT_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_ORD_RELTD_BILLG_STATUS: OrderableEdmTypeField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      SalesOrder<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link item} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ITEM: OneToManyLink<
      SalesOrder<DeSerializersT>,
      DeSerializersT,
      SalesOrderItemApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link partner} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PARTNER: OneToManyLink<
      SalesOrder<DeSerializersT>,
      DeSerializersT,
      SalesOrderPartnerApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link pricingElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PRICING_ELEMENT: OneToManyLink<
      SalesOrder<DeSerializersT>,
      DeSerializersT,
      SalesOrderPricingElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link text} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TEXT: OneToManyLink<
      SalesOrder<DeSerializersT>,
      DeSerializersT,
      SalesOrderTextApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SalesOrder<DeSerializers>>;
  };
}
