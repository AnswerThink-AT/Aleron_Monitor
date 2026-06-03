/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvoiceAdditionalData } from './SuplrInvoiceAdditionalData';
import { SuplrInvoiceAdditionalDataRequestBuilder } from './SuplrInvoiceAdditionalDataRequestBuilder';
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
export declare class SuplrInvoiceAdditionalDataApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<SuplrInvoiceAdditionalData<DeSerializersT>, DeSerializersT>
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
  ): SuplrInvoiceAdditionalDataApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SuplrInvoiceAdditionalData;
  requestBuilder(): SuplrInvoiceAdditionalDataRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SuplrInvoiceAdditionalData<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SuplrInvoiceAdditionalData<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SuplrInvoiceAdditionalData,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INVOICING_PARTY_NAME_1: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVOICING_PARTY_NAME_2: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVOICING_PARTY_NAME_3: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVOICING_PARTY_NAME_4: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    POSTAL_CODE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CITY_NAME: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COUNTRY: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    STREET_ADDRESS_NAME: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PO_BOX: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PO_BOX_POSTAL_CODE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    POST_OFFICE_BANK_ACCOUNT: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BANK_ACCOUNT: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BANK: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BANK_COUNTRY: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_ID_1: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_ID_2: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_ID_3: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_ID_4: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_ID_5: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ONE_TME_ACCOUNT_IS_VAT_LIABLE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ONE_TME_ACCT_IS_EQUALIZATION_TX_SUBJ: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    REGION: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BANK_CONTROL_KEY: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_EXCHANGE_INSTRUCTION_KEY: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_MEDIUM_EXCHANGE_INDICATOR: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LANGUAGE_CODE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_ONE_TIME_ACCOUNT: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PAYMENT_RECIPIENT: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ACCOUNT_TAX_TYPE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_NUMBER_TYPE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_NATURAL_PERSON: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    BANK_DETAIL_REFERENCE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REPRESENTATIVE_NAME: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUSINESS_TYPE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INDUSTRY_TYPE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FORM_OF_ADDRESS_NAME: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAT_REGISTRATION: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ONE_TIME_ACCT_CNTRY_SPECIFIC_REF_1: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IBAN: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SWIFT_CODE: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ONE_TIME_BUSINESS_PARTNER_EMAIL: OrderableEdmTypeField<
      SuplrInvoiceAdditionalData<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SuplrInvoiceAdditionalData<DeSerializers>>;
  };
}
