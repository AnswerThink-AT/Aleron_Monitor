/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SalesContract } from './SalesContract';
import { SalesContractRequestBuilder } from './SalesContractRequestBuilder';
import { SalesContractItemApi } from './SalesContractItemApi';
import { SlsContrPricingElementApi } from './SlsContrPricingElementApi';
import { SalesContractTextApi } from './SalesContractTextApi';
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
export declare class SalesContractApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SalesContract<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SalesContractApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      SalesContractItemApi<DeSerializersT>,
      SlsContrPricingElementApi<DeSerializersT>,
      SalesContractTextApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof SalesContract;
  requestBuilder(): SalesContractRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SalesContract<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<SalesContract<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof SalesContract, DeSerializersT>;
  private _schema?;
  get schema(): {
    SALES_CONTRACT: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_CONTRACT_TYPE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_ORGANIZATION: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DISTRIBUTION_CHANNEL: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ORGANIZATION_DIVISION: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_GROUP: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_OFFICE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_DISTRICT: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SOLD_TO_PARTY: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CREATION_DATE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    LAST_CHANGE_DATE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    PURCHASE_ORDER_BY_CUSTOMER: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PURCHASE_ORDER_TYPE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PURCHASE_ORDER_DATE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    SALES_CONTRACT_DATE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    TOTAL_NET_AMOUNT: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    TRANSACTION_CURRENCY: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SD_DOCUMENT_REASON: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_GROUP: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SHIPPING_CONDITION: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_DATE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    BILLING_DOCUMENT_DATE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    SD_PRICING_PROCEDURE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PRICE_GROUP: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_CLASSIFICATION: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_TRANSFER_LOCATION: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_1: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_2: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_VERSION: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER_PAYMENT_TERMS: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PAYMENT_METHOD: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_CONTRACT_VALIDITY_START_DATE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    SALES_CONTRACT_VALIDITY_END_DATE: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    REFERENCE_SD_DOCUMENT: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    REFERENCE_SD_DOCUMENT_CATEGORY: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_DOC_APPROVAL_STATUS: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_CONTRACT_APPROVAL_REASON: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_SD_PROCESS_STATUS: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TOTAL_CREDIT_CHECK_STATUS: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OVERALL_SD_DOCUMENT_REJECTION_STS: OrderableEdmTypeField<
      SalesContract<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      SalesContract<DeSerializers>,
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
      SalesContract<DeSerializersT>,
      DeSerializersT,
      SalesContractItemApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link pricingElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PRICING_ELEMENT: OneToManyLink<
      SalesContract<DeSerializersT>,
      DeSerializersT,
      SlsContrPricingElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link text} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TEXT: OneToManyLink<
      SalesContract<DeSerializersT>,
      DeSerializersT,
      SalesContractTextApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SalesContract<DeSerializers>>;
  };
}
