/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CompanyCode } from './CompanyCode';
import { CompanyCodeRequestBuilder } from './CompanyCodeRequestBuilder';
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
export declare class CompanyCodeApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<CompanyCode<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): CompanyCodeApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof CompanyCode;
  requestBuilder(): CompanyCodeRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    CompanyCode<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<CompanyCode<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof CompanyCode, DeSerializersT>;
  private _schema?;
  get schema(): {
    COMPANY_CODE: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE_NAME: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CITY_NAME: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COUNTRY: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CURRENCY: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LANGUAGE: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CHART_OF_ACCOUNTS: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FISCAL_YEAR_VARIANT: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMPANY: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREDIT_CONTROL_AREA: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COUNTRY_CHART_OF_ACCOUNTS: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FINANCIAL_MANAGEMENT_AREA: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ADDRESS_ID: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAXABLE_ENTITY: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VAT_REGISTRATION: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    EXTENDED_WHLDG_TAX_IS_ACTIVE: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    CONTROLLING_AREA: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIELD_STATUS_VARIANT: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    NON_TAXABLE_TRANSACTION_TAX_CODE: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOC_DATE_IS_USED_FOR_TAX_DETN: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TAX_RPTG_DATE_IS_ACTIVE: OrderableEdmTypeField<
      CompanyCode<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ALL_FIELDS: AllFields<CompanyCode<DeSerializers>>;
  };
}
