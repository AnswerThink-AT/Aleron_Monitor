/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PurchaseOrder } from './PurchaseOrder';
import { PurchaseOrderRequestBuilder } from './PurchaseOrderRequestBuilder';
import { PurchaseOrderItemApi } from './PurchaseOrderItemApi';
import { PurchaseOrderNoteApi } from './PurchaseOrderNoteApi';
import { PurchaseOrderPartnerApi } from './PurchaseOrderPartnerApi';
import { PurchaseOrderSupplierAddressApi } from './PurchaseOrderSupplierAddressApi';
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
export declare class PurchaseOrderApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<PurchaseOrder<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): PurchaseOrderApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      PurchaseOrderItemApi<DeSerializersT>,
      PurchaseOrderNoteApi<DeSerializersT>,
      PurchaseOrderPartnerApi<DeSerializersT>,
      PurchaseOrderSupplierAddressApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof PurchaseOrder;
  requestBuilder(): PurchaseOrderRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    PurchaseOrder<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<PurchaseOrder<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof PurchaseOrder, DeSerializersT>;
  private _schema?;
  get schema(): {
    PURCHASE_ORDER: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_TYPE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_SUBTYPE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_DOCUMENT_ORIGIN: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_DOCUMENT_PROCESS_CODE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CREATION_DATE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    PURCHASE_ORDER_DATE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    VALIDITY_START_DATE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    VALIDITY_END_DATE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    LANGUAGE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER_DELETION_CODE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    RELEASE_IS_NOT_COMPLETED: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PURCHASING_COMPLETENESS_STATUS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    PURCHASING_PROCESSING_STATUS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_RELEASE_SEQUENCE_STATUS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    RELEASE_CODE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_RELEASE_STRATEGY: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_REASON_FOR_DOC_CANCELLATION: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_ORGANIZATION: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_GROUP: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MANUAL_SUPPLIER_ADDRESS_ID: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_ADDRESS_ID: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_RESP_SALES_PERSON_NAME: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_PHONE_NUMBER: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLYING_SUPPLIER: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLYING_PLANT: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INVOICING_PARTY: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CUSTOMER: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_CONTRACT: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_QUOTATION_EXTERNAL_ID: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    QUOTATION_SUBMISSION_DATE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    ITEM_NUMBER_INTERVAL_FOR_SUB_ITEMS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PAYMENT_TERMS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CASH_DISCOUNT_1_DAYS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CASH_DISCOUNT_2_DAYS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    NET_PAYMENT_DAYS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CASH_DISCOUNT_1_PERCENT: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    CASH_DISCOUNT_2_PERCENT: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    DOWN_PAYMENT_TYPE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DOWN_PAYMENT_PERCENTAGE_OF_TOT_AMT: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    DOWN_PAYMENT_AMOUNT: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    DOWN_PAYMENT_DUE_DATE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    INCOTERMS_CLASSIFICATION: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_TRANSFER_LOCATION: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_VERSION: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_1: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INCOTERMS_LOCATION_2: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IS_INTRASTAT_REPORTING_RELEVANT: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    IS_INTRASTAT_REPORTING_EXCLUDED: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CORRESPNC_EXTERNAL_REFERENCE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CORRESPNC_INTERNAL_REFERENCE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_DOCUMENT: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_PROCEDURE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    EXCHANGE_RATE: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      false,
      true
    >;
    EXCHANGE_RATE_IS_FIXED: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    TAX_RETURN_COUNTRY: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    VAT_REGISTRATION_COUNTRY: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_AGGRGD_PROD_CMPLNC_SUPLR_STS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_AGGRGD_PROD_MARKETABILITY_STS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_AGGRGD_SFTY_DATA_SHEET_STATUS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURG_PROD_CMPLNC_TOT_DNGRS_GOODS_STS: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASING_COLLECTIVE_NUMBER: OrderableEdmTypeField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      PurchaseOrder<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link purchaseOrderItem} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_ITEM: OneToManyLink<
      PurchaseOrder<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderItemApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link purchaseOrderNote} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_NOTE: OneToManyLink<
      PurchaseOrder<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderNoteApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link purchaseOrderPartner} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PURCHASE_ORDER_PARTNER: OneToManyLink<
      PurchaseOrder<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderPartnerApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link supplierAddress} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SUPPLIER_ADDRESS: OneToOneLink<
      PurchaseOrder<DeSerializersT>,
      DeSerializersT,
      PurchaseOrderSupplierAddressApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<PurchaseOrder<DeSerializers>>;
  };
}
