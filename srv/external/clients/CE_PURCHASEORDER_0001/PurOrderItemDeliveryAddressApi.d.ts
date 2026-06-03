/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurOrderItemDeliveryAddress } from './PurOrderItemDeliveryAddress';
import { PurOrderItemDeliveryAddressRequestBuilder } from './PurOrderItemDeliveryAddressRequestBuilder';
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
export declare class PurOrderItemDeliveryAddressApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<PurOrderItemDeliveryAddress<DeSerializersT>, DeSerializersT>
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
  ): PurOrderItemDeliveryAddressApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      PurchaseOrderApi<DeSerializersT>,
      PurchaseOrderItemApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof PurOrderItemDeliveryAddress;
  requestBuilder(): PurOrderItemDeliveryAddressRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurOrderItemDeliveryAddress<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    PurOrderItemDeliveryAddress<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof PurOrderItemDeliveryAddress,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_ADDRESS_ID: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_ID: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_PERSON_ID: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_REPRESENTATION_CODE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CORRESPONDENCE_LANGUAGE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRFRD_COMM_MEDIUM_TYPE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESSEE_FULL_NAME: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_NAME_1: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_NAME_2: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_NAME_3: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_NAME_4: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_SEARCH_TERM_1: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_SEARCH_TERM_2: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CITY_NAME: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DISTRICT_NAME: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VILLAGE_NAME: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    POSTAL_CODE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_POSTAL_CODE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_NAME: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_PREFIX_NAME_1: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_PREFIX_NAME_2: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_SUFFIX_NAME_1: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_SUFFIX_NAME_2: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    HOUSE_NUMBER: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    HOUSE_NUMBER_SUPPLEMENT_TEXT: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BUILDING: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FLOOR: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ROOM_NUMBER: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COUNTRY: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REGION: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FORM_OF_ADDRESS: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TRANSPORT_ZONE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_IS_WITHOUT_NUMBER: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PO_BOX_POSTAL_CODE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_LOBBY_NAME: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_DEVIATING_CITY_NAME: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_DEVIATING_REGION: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_DEVIATING_COUNTRY: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CARE_OF_NAME: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_SERVICE_TYPE_CODE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_SERVICE_NUMBER: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_TIME_ZONE: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    EMAIL_ADDRESS: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REGIONAL_STRUCTURE_CHECK_STATUS: OrderableEdmTypeField<
      PurOrderItemDeliveryAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PurOrderItemDeliveryAddress<DeSerializers>,
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
      PurOrderItemDeliveryAddress<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrderItem_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_ITEM_1: OneToOneLink<
      PurOrderItemDeliveryAddress<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderItemApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurOrderItemDeliveryAddress<DeSerializers>>;
  };
}
