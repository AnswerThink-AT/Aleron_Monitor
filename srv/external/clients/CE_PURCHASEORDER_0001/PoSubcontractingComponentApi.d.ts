/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PoSubcontractingComponent } from './PoSubcontractingComponent';
import { PoSubcontractingComponentRequestBuilder } from './PoSubcontractingComponentRequestBuilder';
import { PurchaseOrderApi } from './PurchaseOrderApi';
import { PurchaseOrderItemApi } from './PurchaseOrderItemApi';
import { PurchaseOrderScheduleLineApi } from './PurchaseOrderScheduleLineApi';
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
export declare class PoSubcontractingComponentApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<PoSubcontractingComponent<DeSerializersT>, DeSerializersT>
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
  ): PoSubcontractingComponentApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      PurchaseOrderApi<DeSerializersT>,
      PurchaseOrderItemApi<DeSerializersT>,
      PurchaseOrderScheduleLineApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof PoSubcontractingComponent;
  requestBuilder(): PoSubcontractingComponentRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PoSubcontractingComponent<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    PoSubcontractingComponent<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof PoSubcontractingComponent,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SCHEDULE_LINE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    RESERVATION_ITEM: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    RECORD_TYPE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IS_MATERIAL_PROVISION: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    MATERIAL_PROVISION_TYPE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL_QTY_TO_BASE_QTY_NMRTR: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    MATERIAL_QTY_TO_BASE_QTY_DNMNTR: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    MATERIAL_REVISION_LEVEL: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL_COMP_IS_VARIABLE_SIZED: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    MATERIAL_COMPONENT_IS_PHANTOM_ITEM: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    RESERVATION: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REQUIRED_QUANTITY: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    REQUIREMENT_DATE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    REQUIREMENT_TIME: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      false,
      true
    >;
    RESERVATION_IS_FINALLY_ISSUED: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    BASE_UNIT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    QUANTITY_IN_ENTRY_UNIT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    ENTRY_UNIT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VARIABLE_SIZE_ITEM_QUANTITY: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    VARIABLE_SIZE_ITEM_UNIT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VARIABLE_SIZE_COMPONENT_UNIT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VARIABLE_SIZE_COMPONENT_QUANTITY: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    UNIT_OF_MEASURE_FOR_SIZE_1_TO_3: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SIZE_1: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SIZE_2: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    SIZE_3: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    PLANT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    LATEST_REQUIREMENT_DATE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    ORDER_LEVEL_VALUE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORDER_PATH_VALUE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BILL_OF_MATERIAL_ITEM_NUMBER: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATL_COMP_FREE_DEFINED_ATTRIBUTE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BOM_ITEM_CATEGORY: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IS_BULK_MATERIAL_COMPONENT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    ACCOUNT_ASSIGNMENT_CATEGORY: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INVENTORY_SPECIAL_STOCK_TYPE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONSUMPTION_POSTING: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INVENTORY_SPECIAL_STOCK_VALN_TYPE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DEBIT_CREDIT_CODE: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    WITHDRAWN_QUANTITY: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    QUANTITY_IS_FIXED: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    COMPONENT_SCRAP_IN_PERCENT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    OPERATION_SCRAP_IN_PERCENT: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    IS_NET_SCRAP: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    LEAD_TIME_OFFSET: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    QUANTITY_DISTRIBUTION_KEY: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FORMULA_KEY: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STORAGE_LOCATION: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRODUCTION_SUPPLY_AREA: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BATCH: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BOM_ITEM_DESCRIPTION: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BOM_ITEM_TEXT_2: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CHANGE_NUMBER: OrderableEdmTypeField<
      PoSubcontractingComponent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PoSubcontractingComponent<DeSerializers>,
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
      PoSubcontractingComponent<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrderItem_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_ITEM_1: OneToOneLink<
      PoSubcontractingComponent<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderItemApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link scheduleLine_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SCHEDULE_LINE_1: OneToOneLink<
      PoSubcontractingComponent<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderScheduleLineApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PoSubcontractingComponent<DeSerializers>>;
  };
}
