/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurchaseOrderInvoicingPlan } from './PurchaseOrderInvoicingPlan';
import { PurchaseOrderInvoicingPlanRequestBuilder } from './PurchaseOrderInvoicingPlanRequestBuilder';
import { PurchaseOrderInvoicingPlanItemApi } from './PurchaseOrderInvoicingPlanItemApi';
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
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class PurchaseOrderInvoicingPlanApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<PurchaseOrderInvoicingPlan<DeSerializersT>, DeSerializersT>
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
  ): PurchaseOrderInvoicingPlanApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      PurchaseOrderInvoicingPlanItemApi<DeSerializersT>,
      PurchaseOrderApi<DeSerializersT>,
      PurchaseOrderItemApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof PurchaseOrderInvoicingPlan;
  requestBuilder(): PurchaseOrderInvoicingPlanRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurchaseOrderInvoicingPlan<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    PurchaseOrderInvoicingPlan<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof PurchaseOrderInvoicingPlan,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INVOICING_PLAN: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INVOICING_PLAN_TYPE: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INVOICING_PLAN_START_DATE: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    INVOICING_PLAN_END_DATE: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    INVOICING_PLAN_NEXT_INVC_DATE_RULE: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_ORGANIZATION: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_GROUP: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_TYPE: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PLANT: OrderableEdmTypeField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PurchaseOrderInvoicingPlan<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link poInvoicingPlanItem} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PO_INVOICING_PLAN_ITEM: OneToManyLink<
      PurchaseOrderInvoicingPlan<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderInvoicingPlanItemApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrder_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_1: OneToOneLink<
      PurchaseOrderInvoicingPlan<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrderItem_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_ITEM_1: OneToOneLink<
      PurchaseOrderInvoicingPlan<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderItemApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurchaseOrderInvoicingPlan<DeSerializers>>;
  };
}
