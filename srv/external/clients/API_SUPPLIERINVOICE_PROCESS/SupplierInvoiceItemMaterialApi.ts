/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoiceItemMaterial } from './SupplierInvoiceItemMaterial';
import { SupplierInvoiceItemMaterialRequestBuilder } from './SupplierInvoiceItemMaterialRequestBuilder';
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
export class SupplierInvoiceItemMaterialApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<SupplierInvoiceItemMaterial<DeSerializersT>, DeSerializersT>
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
  ): SupplierInvoiceItemMaterialApi<DeSerializersT> {
    return new SupplierInvoiceItemMaterialApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = SupplierInvoiceItemMaterial;

  requestBuilder(): SupplierInvoiceItemMaterialRequestBuilder<DeSerializersT> {
    return new SupplierInvoiceItemMaterialRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierInvoiceItemMaterial<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      SupplierInvoiceItemMaterial<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    SupplierInvoiceItemMaterial<DeSerializersT>,
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
    typeof SupplierInvoiceItemMaterial,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SupplierInvoiceItemMaterial,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_INVOICE_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    MATERIAL: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VALUATION_AREA: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PLANT: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INVENTORY_VALUATION_TYPE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_AMOUNT: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    QUANTITY_UNIT: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ITM_QTY_UNIT_SAP_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ITM_QTY_UNIT_ISO_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    DEBIT_CREDIT_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_NOT_CASH_DISCOUNT_LIABLE: OrderableEdmTypeField<
      SupplierInvoiceItemMaterial<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SupplierInvoiceItemMaterial<DeSerializers>>;
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
         * Static representation of the {@link material} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MATERIAL: fieldBuilder.buildEdmTypeField(
          'Material',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link valuationArea} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALUATION_AREA: fieldBuilder.buildEdmTypeField(
          'ValuationArea',
          'Edm.String',
          true
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
         * Static representation of the {@link plant} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PLANT: fieldBuilder.buildEdmTypeField('Plant', 'Edm.String', true),
        /**
         * Static representation of the {@link inventoryValuationType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INVENTORY_VALUATION_TYPE: fieldBuilder.buildEdmTypeField(
          'InventoryValuationType',
          'Edm.String',
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
         * Static representation of the {@link isNotCashDiscountLiable} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_NOT_CASH_DISCOUNT_LIABLE: fieldBuilder.buildEdmTypeField(
          'IsNotCashDiscountLiable',
          'Edm.Boolean',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SupplierInvoiceItemMaterial)
      };
    }

    return this._schema;
  }
}
