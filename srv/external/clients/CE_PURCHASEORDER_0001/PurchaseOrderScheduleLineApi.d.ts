/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurchaseOrderScheduleLine } from './PurchaseOrderScheduleLine';
import { PurchaseOrderScheduleLineRequestBuilder } from './PurchaseOrderScheduleLineRequestBuilder';
import { PurchaseOrderApi } from './PurchaseOrderApi';
import { PurchaseOrderItemApi } from './PurchaseOrderItemApi';
import { PoSubcontractingComponentApi } from './PoSubcontractingComponentApi';
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
  OneToOneLink,
  OneToManyLink
} from '@sap-cloud-sdk/odata-v4';
export declare class PurchaseOrderScheduleLineApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<PurchaseOrderScheduleLine<DeSerializersT>, DeSerializersT>
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
  ): PurchaseOrderScheduleLineApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      PurchaseOrderApi<DeSerializersT>,
      PurchaseOrderItemApi<DeSerializersT>,
      PoSubcontractingComponentApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof PurchaseOrderScheduleLine;
  requestBuilder(): PurchaseOrderScheduleLineRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurchaseOrderScheduleLine<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    PurchaseOrderScheduleLine<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof PurchaseOrderScheduleLine,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SCHEDULE_LINE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SCHEDULE_LINE_DELIVERY_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    SCHED_LINE_STSC_DELIVERY_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    PERFORMANCE_PERIOD_START_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    PERFORMANCE_PERIOD_END_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    SCHEDULE_LINE_DELIVERY_TIME: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      false,
      true
    >;
    BATCH: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BATCH_BY_SUPPLIER: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SCHEDULE_LINE_ORDER_QUANTITY: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    OPEN_PURCHASE_ORDER_QUANTITY: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    PURCHASE_ORDER_QUANTITY_UNIT: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CURRENCY: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_REQUISITION: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_REQUISITION_ITEM: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIV_DATE_CATEGORY: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SCHEDULE_LINE_ORDER_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    PRODUCT_AVAILABILITY_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    LOADING_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    LOADING_TIME: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      false,
      true
    >;
    TRANSPORTATION_PLANNING_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    TRANSPORTATION_PLANNING_TIME: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      false,
      true
    >;
    GOODS_ISSUE_DATE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    GOODS_ISSUE_TIME: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      false,
      true
    >;
    ROUTE_SCHEDULE: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCT_AVAILABILITY_TIME: OrderableEdmTypeField<
      PurchaseOrderScheduleLine<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PurchaseOrderScheduleLine<DeSerializers>,
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
      PurchaseOrderScheduleLine<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrderItem_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_ITEM_1: OneToOneLink<
      PurchaseOrderScheduleLine<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderItemApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link subcontractingComponent} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SUBCONTRACTING_COMPONENT: OneToManyLink<
      PurchaseOrderScheduleLine<DeSerializersT>,
      DeSerializersT,
      PoSubcontractingComponentApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurchaseOrderScheduleLine<DeSerializers>>;
  };
}
