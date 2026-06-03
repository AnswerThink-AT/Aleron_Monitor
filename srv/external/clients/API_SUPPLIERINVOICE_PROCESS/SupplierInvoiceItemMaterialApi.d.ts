/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoiceItemMaterial } from './SupplierInvoiceItemMaterial';
import { SupplierInvoiceItemMaterialRequestBuilder } from './SupplierInvoiceItemMaterialRequestBuilder';
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
export declare class SupplierInvoiceItemMaterialApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<SupplierInvoiceItemMaterial<DeSerializersT>, DeSerializersT>
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
  ): SupplierInvoiceItemMaterialApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SupplierInvoiceItemMaterial;
  requestBuilder(): SupplierInvoiceItemMaterialRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SupplierInvoiceItemMaterial<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SupplierInvoiceItemMaterial<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SupplierInvoiceItemMaterial,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
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
}
