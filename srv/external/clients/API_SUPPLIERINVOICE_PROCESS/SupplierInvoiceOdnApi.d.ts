/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoiceOdn } from './SupplierInvoiceOdn';
import { SupplierInvoiceOdnRequestBuilder } from './SupplierInvoiceOdnRequestBuilder';
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
export declare class SupplierInvoiceOdnApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): SupplierInvoiceOdnApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof SupplierInvoiceOdn;
  requestBuilder(): SupplierInvoiceOdnRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SupplierInvoiceOdn<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof SupplierInvoiceOdn, DeSerializersT>;
  private _schema?;
  get schema(): {
    AFDF_UNIQUE_KEY_UUID: OrderableEdmTypeField<
      SupplierInvoiceOdn<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SupplierInvoiceOdn<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoiceOdn<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    OFFICIAL_DOCUMENT_NUMBER_COUNTRY: OrderableEdmTypeField<
      SupplierInvoiceOdn<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    OFFICIAL_DOCUMENT_NUMBER_TYPE: OrderableEdmTypeField<
      SupplierInvoiceOdn<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    OFFICIAL_DOCUMENT_NUMBER: OrderableEdmTypeField<
      SupplierInvoiceOdn<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ODN_LEGAL_DATE_TIME_TEXT: OrderableEdmTypeField<
      SupplierInvoiceOdn<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    OFFICIAL_DOCUMENT_NUMBER_INT_TYPE: OrderableEdmTypeField<
      SupplierInvoiceOdn<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SupplierInvoiceOdn<DeSerializers>>;
  };
}
