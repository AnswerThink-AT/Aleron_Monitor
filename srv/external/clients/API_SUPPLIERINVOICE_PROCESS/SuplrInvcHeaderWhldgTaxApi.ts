/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcHeaderWhldgTax } from './SuplrInvcHeaderWhldgTax';
import { SuplrInvcHeaderWhldgTaxRequestBuilder } from './SuplrInvcHeaderWhldgTaxRequestBuilder';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export class SuplrInvcHeaderWhldgTaxApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SuplrInvcHeaderWhldgTax<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ) {
    this.deSerializers = deSerializers;
  }

  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  public static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): SuplrInvcHeaderWhldgTaxApi<DeSerializersT> {
    return new SuplrInvcHeaderWhldgTaxApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = SuplrInvcHeaderWhldgTax;

  requestBuilder(): SuplrInvcHeaderWhldgTaxRequestBuilder<DeSerializersT> {
    return new SuplrInvcHeaderWhldgTaxRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SuplrInvcHeaderWhldgTax<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      SuplrInvcHeaderWhldgTax<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    SuplrInvcHeaderWhldgTax<DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<
    typeof SuplrInvcHeaderWhldgTax,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SuplrInvcHeaderWhldgTax,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link supplierInvoice} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE: fieldBuilder.buildEdmTypeField(
          'SupplierInvoice',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link fiscalYear} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FISCAL_YEAR: fieldBuilder.buildEdmTypeField(
          'FiscalYear',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link withholdingTaxType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_TYPE: fieldBuilder.buildEdmTypeField(
          'WithholdingTaxType',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link documentCurrency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField(
          'DocumentCurrency',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link withholdingTaxCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_CODE: fieldBuilder.buildEdmTypeField(
          'WithholdingTaxCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link withholdingTaxBaseAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_BASE_AMOUNT: fieldBuilder.buildEdmTypeField(
          'WithholdingTaxBaseAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link manuallyEnteredWhldgTaxAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MANUALLY_ENTERED_WHLDG_TAX_AMOUNT: fieldBuilder.buildEdmTypeField(
          'ManuallyEnteredWhldgTaxAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link whldgTaxIsEnteredManually} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WHLDG_TAX_IS_ENTERED_MANUALLY: fieldBuilder.buildEdmTypeField(
          'WhldgTaxIsEnteredManually',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link whldgTaxBaseIsEnteredManually} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WHLDG_TAX_BASE_IS_ENTERED_MANUALLY: fieldBuilder.buildEdmTypeField(
          'WhldgTaxBaseIsEnteredManually',
          'Edm.Boolean',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SuplrInvcHeaderWhldgTax)
      };
    }

    return this._schema;
  }
}
