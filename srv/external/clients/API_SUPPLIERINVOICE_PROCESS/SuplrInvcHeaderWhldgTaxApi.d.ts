/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcHeaderWhldgTax } from './SuplrInvcHeaderWhldgTax';
import { SuplrInvcHeaderWhldgTaxRequestBuilder } from './SuplrInvcHeaderWhldgTaxRequestBuilder';
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
export declare class SuplrInvcHeaderWhldgTaxApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SuplrInvcHeaderWhldgTax<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SuplrInvcHeaderWhldgTaxApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SuplrInvcHeaderWhldgTax;
  requestBuilder(): SuplrInvcHeaderWhldgTaxRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SuplrInvcHeaderWhldgTax<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SuplrInvcHeaderWhldgTax<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SuplrInvcHeaderWhldgTax,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    WITHHOLDING_TAX_TYPE: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WITHHOLDING_TAX_CODE: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WITHHOLDING_TAX_BASE_AMOUNT: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    MANUALLY_ENTERED_WHLDG_TAX_AMOUNT: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    WHLDG_TAX_IS_ENTERED_MANUALLY: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    WHLDG_TAX_BASE_IS_ENTERED_MANUALLY: OrderableEdmTypeField<
      SuplrInvcHeaderWhldgTax<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SuplrInvcHeaderWhldgTax<DeSerializers>>;
  };
}
