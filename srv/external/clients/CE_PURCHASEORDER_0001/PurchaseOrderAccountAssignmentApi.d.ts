/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurchaseOrderAccountAssignment } from './PurchaseOrderAccountAssignment';
import { PurchaseOrderAccountAssignmentRequestBuilder } from './PurchaseOrderAccountAssignmentRequestBuilder';
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
  CollectionField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class PurchaseOrderAccountAssignmentApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<PurchaseOrderAccountAssignment<DeSerializersT>, DeSerializersT>
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
  ): PurchaseOrderAccountAssignmentApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      PurchaseOrderApi<DeSerializersT>,
      PurchaseOrderItemApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof PurchaseOrderAccountAssignment;
  requestBuilder(): PurchaseOrderAccountAssignmentRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurchaseOrderAccountAssignment<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    PurchaseOrderAccountAssignment<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof PurchaseOrderAccountAssignment,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ACCOUNT_ASSIGNMENT_NUMBER: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COST_CENTER: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MASTER_FIXED_ASSET: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PROJECT_NETWORK: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    NETWORK_ACTIVITY: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDER_QUANTITY_UNIT: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    QUANTITY: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    MULTIPLE_ACCT_ASSGMT_DISTR_PERCENT: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_DOC_NET_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    IS_DELETED: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    GL_ACCOUNT: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BUSINESS_AREA: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_ITEM: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORDER_SCHEDULE_LINE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FIXED_ASSET: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDER_ID: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    UNLOADING_POINT_NAME: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONTROLLING_AREA: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COST_OBJECT: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    WBS_ELEMENT_INTERNAL_ID: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    WBS_ELEMENT_EXTERNAL_ID: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PROJECT_NETWORK_INTERNAL_ID: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMMITMENT_ITEM_SHORT_ID: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FUNDS_CENTER: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FUND: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FUNCTIONAL_AREA: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    GOODS_RECIPIENT_NAME: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IS_FINALLY_INVOICED: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    NETWORK_ACTIVITY_INTERNAL_ID: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PARTNER_ACCOUNT_NUMBER: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    JOINT_VENTURE_RECOVERY_CODE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SETTLEMENT_REFERENCE_DATE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    ORDER_INTERNAL_ID: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDER_INT_BILL_OF_OPERATIONS_ITEM: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    NON_DEDUCTIBLE_INPUT_TAX_AMOUNT: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    COST_CTR_ACTIVITY_TYPE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BUSINESS_PROCESS: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    GRANT_ID: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BUDGET_PERIOD: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    EARMARKED_FUNDS_DOCUMENT: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    EARMARKED_FUNDS_DOCUMENT_ITEM: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VALIDITY_DATE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    CHART_OF_ACCOUNTS: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SERVICE_DOCUMENT_TYPE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SERVICE_DOCUMENT: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SERVICE_DOCUMENT_ITEM: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CREATION_DATE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    IS_ACCT_LINE_FINAL: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    ACCT_LINE_FINAL_REASON: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      PurchaseOrderAccountAssignment<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PurchaseOrderAccountAssignment<DeSerializers>,
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
      PurchaseOrderAccountAssignment<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrderItem_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_ITEM_1: OneToOneLink<
      PurchaseOrderAccountAssignment<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderItemApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurchaseOrderAccountAssignment<DeSerializers>>;
  };
}
