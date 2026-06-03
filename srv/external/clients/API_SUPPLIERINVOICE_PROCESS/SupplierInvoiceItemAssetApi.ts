/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoiceItemAsset } from './SupplierInvoiceItemAsset';
import { SupplierInvoiceItemAssetRequestBuilder } from './SupplierInvoiceItemAssetRequestBuilder';
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
export class SupplierInvoiceItemAssetApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SupplierInvoiceItemAsset<DeSerializersT>, DeSerializersT>
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
  ): SupplierInvoiceItemAssetApi<DeSerializersT> {
    return new SupplierInvoiceItemAssetApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = SupplierInvoiceItemAsset;

  requestBuilder(): SupplierInvoiceItemAssetRequestBuilder<DeSerializersT> {
    return new SupplierInvoiceItemAssetRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierInvoiceItemAsset<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      SupplierInvoiceItemAsset<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    SupplierInvoiceItemAsset<DeSerializersT>,
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
    typeof SupplierInvoiceItemAsset,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SupplierInvoiceItemAsset,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_INVOICE_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    MASTER_FIXED_ASSET: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIXED_ASSET: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GL_ACCOUNT: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_AMOUNT: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    DEBIT_CREDIT_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_TEXT: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ASSIGNMENT_REFERENCE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_NOT_CASH_DISCOUNT_LIABLE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ASSET_VALUE_DATE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    QUANTITY_UNIT: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ITM_QTY_UNIT_SAP_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ITM_QTY_UNIT_ISO_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY: OrderableEdmTypeField<
      SupplierInvoiceItemAsset<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SupplierInvoiceItemAsset<DeSerializers>>;
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
         * Static representation of the {@link supplierInvoiceItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ITEM: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceItem',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link companyCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: fieldBuilder.buildEdmTypeField(
          'CompanyCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link masterFixedAsset} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MASTER_FIXED_ASSET: fieldBuilder.buildEdmTypeField(
          'MasterFixedAsset',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link fixedAsset} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FIXED_ASSET: fieldBuilder.buildEdmTypeField(
          'FixedAsset',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link profitCenter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROFIT_CENTER: fieldBuilder.buildEdmTypeField(
          'ProfitCenter',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link glAccount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GL_ACCOUNT: fieldBuilder.buildEdmTypeField(
          'GLAccount',
          'Edm.String',
          true
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
         * Static representation of the {@link supplierInvoiceItemAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ITEM_AMOUNT: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceItemAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link taxCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_CODE: fieldBuilder.buildEdmTypeField('TaxCode', 'Edm.String', true),
        /**
         * Static representation of the {@link taxJurisdiction} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_JURISDICTION: fieldBuilder.buildEdmTypeField(
          'TaxJurisdiction',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link taxCountry} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_COUNTRY: fieldBuilder.buildEdmTypeField(
          'TaxCountry',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link taxDeterminationDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_DETERMINATION_DATE: fieldBuilder.buildEdmTypeField(
          'TaxDeterminationDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link debitCreditCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DEBIT_CREDIT_CODE: fieldBuilder.buildEdmTypeField(
          'DebitCreditCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplierInvoiceItemText} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ITEM_TEXT: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceItemText',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link assignmentReference} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ASSIGNMENT_REFERENCE: fieldBuilder.buildEdmTypeField(
          'AssignmentReference',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isNotCashDiscountLiable} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_NOT_CASH_DISCOUNT_LIABLE: fieldBuilder.buildEdmTypeField(
          'IsNotCashDiscountLiable',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link assetValueDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ASSET_VALUE_DATE: fieldBuilder.buildEdmTypeField(
          'AssetValueDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link quantityUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        QUANTITY_UNIT: fieldBuilder.buildEdmTypeField(
          'QuantityUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcItmQtyUnitSapCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_ITM_QTY_UNIT_SAP_CODE: fieldBuilder.buildEdmTypeField(
          'SuplrInvcItmQtyUnitSAPCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcItmQtyUnitIsoCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_ITM_QTY_UNIT_ISO_CODE: fieldBuilder.buildEdmTypeField(
          'SuplrInvcItmQtyUnitISOCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link quantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        QUANTITY: fieldBuilder.buildEdmTypeField(
          'Quantity',
          'Edm.Decimal',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SupplierInvoiceItemAsset)
      };
    }

    return this._schema;
  }
}
