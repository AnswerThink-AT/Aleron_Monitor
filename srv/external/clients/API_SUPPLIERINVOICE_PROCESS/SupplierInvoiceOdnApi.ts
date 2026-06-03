/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoiceOdn } from './SupplierInvoiceOdn';
import { SupplierInvoiceOdnRequestBuilder } from './SupplierInvoiceOdnRequestBuilder';
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
export class SupplierInvoiceOdnApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT>
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
  ): SupplierInvoiceOdnApi<DeSerializersT> {
    return new SupplierInvoiceOdnApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = SupplierInvoiceOdn;

  requestBuilder(): SupplierInvoiceOdnRequestBuilder<DeSerializersT> {
    return new SupplierInvoiceOdnRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierInvoiceOdn<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<SupplierInvoiceOdn<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    SupplierInvoiceOdn<DeSerializersT>,
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
    typeof SupplierInvoiceOdn,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SupplierInvoiceOdn,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link afdfUniqueKeyUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AFDF_UNIQUE_KEY_UUID: fieldBuilder.buildEdmTypeField(
          'AFDFUniqueKeyUUID',
          'Edm.Guid',
          false
        ),
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
         * Static representation of the {@link officialDocumentNumberCountry} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        OFFICIAL_DOCUMENT_NUMBER_COUNTRY: fieldBuilder.buildEdmTypeField(
          'OfficialDocumentNumberCountry',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link officialDocumentNumberType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        OFFICIAL_DOCUMENT_NUMBER_TYPE: fieldBuilder.buildEdmTypeField(
          'OfficialDocumentNumberType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link officialDocumentNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        OFFICIAL_DOCUMENT_NUMBER: fieldBuilder.buildEdmTypeField(
          'OfficialDocumentNumber',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link odnLegalDateTimeText} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ODN_LEGAL_DATE_TIME_TEXT: fieldBuilder.buildEdmTypeField(
          'ODNLegalDateTimeText',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link officialDocumentNumberIntType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        OFFICIAL_DOCUMENT_NUMBER_INT_TYPE: fieldBuilder.buildEdmTypeField(
          'OfficialDocumentNumberIntType',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SupplierInvoiceOdn)
      };
    }

    return this._schema;
  }
}
