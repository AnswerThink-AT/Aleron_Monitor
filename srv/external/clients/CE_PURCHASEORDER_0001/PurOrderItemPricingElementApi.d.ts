/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurOrderItemPricingElement } from './PurOrderItemPricingElement';
import { PurOrderItemPricingElementRequestBuilder } from './PurOrderItemPricingElementRequestBuilder';
import { PurchaseOrderApi } from './PurchaseOrderApi';
import { PurchaseOrderItemApi } from './PurchaseOrderItemApi';
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
  EdmTypeField,
  CollectionField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class PurOrderItemPricingElementApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<PurOrderItemPricingElement<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers?: DeSerializersT
  ): PurOrderItemPricingElementApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      PurchaseOrderApi<DeSerializersT>,
      PurchaseOrderItemApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof PurOrderItemPricingElement;
  requestBuilder(): PurOrderItemPricingElementRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurOrderItemPricingElement<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    PurOrderItemPricingElement<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof PurOrderItemPricingElement,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_DOCUMENT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_DOCUMENT_ITEM: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_PROCEDURE_STEP: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_PROCEDURE_COUNTER: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_APPLICATION: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_TYPE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICE_CONDITION_DETERMINATION_DTE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    CONDITION_CALCULATION_TYPE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_BASE_AMOUNT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_BASE_VALUE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_RATE_AMOUNT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_RATE_RATIO: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_RATE_RATIO_UNIT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_CURRENCY: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICE_DETN_EXCHANGE_RATE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_QUANTITY: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_QUANTITY_UNIT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_TO_BASE_QTY_NMRTR: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_TO_BASE_QTY_DNMNTR: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_CATEGORY: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_IS_FOR_STATISTICS: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PRICING_SCALE_TYPE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IS_RELEVANT_FOR_ACCRUAL: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CNDN_IS_RELEVANT_FOR_INVOICE_LIST: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CONDITION_ORIGIN: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IS_GROUP_CONDITION: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    ACCESS_NUMBER_OF_ACCESS_SEQUENCE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RECORD: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_SEQUENTIAL_NUMBER: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ACCOUNT_KEY_FOR_GL_ACCOUNT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    GL_ACCOUNT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ACCT_KEY_FOR_ACCRUALS_GL_ACCOUNT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ACCRUALS_GL_ACCOUNT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    WITHHOLDING_TAX_CODE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FREIGHT_SUPPLIER: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CNDN_ROUNDING_OFF_DIFF_AMOUNT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_AMOUNT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    TRANSACTION_CURRENCY: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_CONTROL: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_INACTIVE_REASON: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_CLASS: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRCG_PROCEDURE_COUNTER_FOR_HEADER: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FACTOR_FOR_CONDITION_BASIS_VALUE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Double',
      false,
      true
    >;
    STRUCTURE_CONDITION: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PERIOD_FACTOR_FOR_CNDN_BASIS_VALUE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Double',
      false,
      true
    >;
    PRICING_SCALE_BASIS: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_SCALE_BASIS_VALUE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_SCALE_BASIS_UNIT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_SCALE_BASIS_CURRENCY: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_ALTERNATIVE_CURRENCY: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_AMOUNT_IN_LOCAL_CRCY: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CNDN_IS_RELEVANT_FOR_INTCO_BILLING: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CONDITION_IS_MANUALLY_CHANGED: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    BILLING_PRICE_SOURCE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_JURISDICTION_LEVEL: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_BYTE_SEQUENCE: EdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Binary',
      false,
      true
    >;
    CNDN_IS_RELEVANT_FOR_LIMIT_VALUE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CONDITION_BASIS_LIMIT_EXCEEDED: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_AMOUNT_LIMIT_EXCEEDED: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUMULATED_CONDITION_BASIS_VALUE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CUSTOMER_REBATE_RECIPIENT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_IS_FOR_CONFIGURATION: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    VARIANT_CONDITION: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_ACCT_ASSGMT_RELEVANCE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_MATRIX_MAINT_RELEVANCE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONFIGBL_PARAMETERS_AND_FORMULAS: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    CONDITION_ADJUSTED_QUANTITY: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CONDITION_TYPE_NAME: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_BASE_VALUE_INTL_UNIT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_BASE_VALUE_UNIT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RATE_VALUE_INTL_UNIT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RATE_VALUE_UNIT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_CODE_NAME: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_IS_DELETABLE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PRICING_PROCEDURE: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPERORDINATE_DOCUMENT: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPERORDINATE_DOCUMENT_ITEM: OrderableEdmTypeField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PurOrderItemPricingElement<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrder_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_1: OneToOneLink<
      PurOrderItemPricingElement<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrderItem_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_ITEM_1: OneToOneLink<
      PurOrderItemPricingElement<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderItemApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurOrderItemPricingElement<DeSerializers>>;
  };
}
