/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurchaseOrderSupplierAddress } from './PurchaseOrderSupplierAddress';
import { PurchaseOrderSupplierAddressRequestBuilder } from './PurchaseOrderSupplierAddressRequestBuilder';
import { PurchaseOrderApi } from './PurchaseOrderApi';
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
export declare class PurchaseOrderSupplierAddressApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<PurchaseOrderSupplierAddress<DeSerializersT>, DeSerializersT>
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
  ): PurchaseOrderSupplierAddressApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [PurchaseOrderApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof PurchaseOrderSupplierAddress;
  requestBuilder(): PurchaseOrderSupplierAddressRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurchaseOrderSupplierAddress<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    PurchaseOrderSupplierAddress<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof PurchaseOrderSupplierAddress,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SUPPLIER_ADDRESS_ID: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_ID: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_PERSON_ID: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_REPRESENTATION_CODE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CORRESPONDENCE_LANGUAGE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRFRD_COMM_MEDIUM_TYPE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESSEE_FULL_NAME: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_NAME_1: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_NAME_2: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_NAME_3: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_NAME_4: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_SEARCH_TERM_1: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_SEARCH_TERM_2: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CITY_NAME: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DISTRICT_NAME: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VILLAGE_NAME: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    POSTAL_CODE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_POSTAL_CODE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_NAME: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_PREFIX_NAME_1: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_PREFIX_NAME_2: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_SUFFIX_NAME_1: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STREET_SUFFIX_NAME_2: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    HOUSE_NUMBER: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    HOUSE_NUMBER_SUPPLEMENT_TEXT: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BUILDING: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FLOOR: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ROOM_NUMBER: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COUNTRY: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REGION: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FORM_OF_ADDRESS: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TRANSPORT_ZONE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_IS_WITHOUT_NUMBER: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PO_BOX_POSTAL_CODE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_LOBBY_NAME: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_DEVIATING_CITY_NAME: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_DEVIATING_REGION: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PO_BOX_DEVIATING_COUNTRY: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CARE_OF_NAME: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_SERVICE_TYPE_CODE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DELIVERY_SERVICE_NUMBER: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ADDRESS_TIME_ZONE: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    EMAIL_ADDRESS: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REGIONAL_STRUCTURE_CHECK_STATUS: OrderableEdmTypeField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PurchaseOrderSupplierAddress<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link purchaseOrderTp} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_TP: OneToOneLink<
      PurchaseOrderSupplierAddress<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurchaseOrderSupplierAddress<DeSerializers>>;
  };
}
