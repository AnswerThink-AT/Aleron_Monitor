/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcItemAcctAssgmt } from './SuplrInvcItemAcctAssgmt';
import { SuplrInvcItemAcctAssgmtRequestBuilder } from './SuplrInvcItemAcctAssgmtRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export declare class SuplrInvcItemAcctAssgmtApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SuplrInvcItemAcctAssgmt<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SuplrInvcItemAcctAssgmtApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SuplrInvcItemAcctAssgmt;
  requestBuilder(): SuplrInvcItemAcctAssgmtRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SuplrInvcItemAcctAssgmt<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SuplrInvcItemAcctAssgmt<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SuplrInvcItemAcctAssgmt,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_INVOICE_ITEM: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDINAL_NUMBER: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COST_CENTER: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CONTROLLING_AREA: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUSINESS_AREA: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUNCTIONAL_AREA: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GL_ACCOUNT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SALES_ORDER: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SALES_ORDER_ITEM: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COST_OBJECT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COST_CTR_ACTIVITY_TYPE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUSINESS_PROCESS: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WBS_ELEMENT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ACCT_ASSIGNMENT_AMOUNT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PURCHASE_ORDER_QUANTITY_UNIT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_QTY_UNIT_SAP_CODE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_QTY_UNIT_ISO_CODE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ACCOUNT_ASSIGNMENT_NUMBER: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ACCOUNT_ASSIGNMENT_IS_UNPLANNED: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PERSONNEL_NUMBER: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WORK_ITEM: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    MASTER_FIXED_ASSET: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIXED_ASSET: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DEBIT_CREDIT_CODE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INTERNAL_ORDER: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_NETWORK_INTERNAL_ID: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    NETWORK_ACTIVITY_INTERNAL_ID: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_NETWORK: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    NETWORK_ACTIVITY: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMMITMENT_ITEM: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUNDS_CENTER: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUND: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GRANT_ID: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PARTNER_BUSINESS_AREA: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ACCOUNT_ASSIGNMENT_TEXT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT_SAP_CODE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT_ISO_CODE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY_IN_PURCHASE_ORDER_UNIT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PROFITABILITY_SEGMENT: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUDGET_PERIOD: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      SuplrInvcItemAcctAssgmt<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SuplrInvcItemAcctAssgmt<DeSerializers>>;
  };
}
