/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcSeldSrvcEntrShtLean } from './SuplrInvcSeldSrvcEntrShtLean';
import { SuplrInvcSeldSrvcEntrShtLeanRequestBuilder } from './SuplrInvcSeldSrvcEntrShtLeanRequestBuilder';
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
export class SuplrInvcSeldSrvcEntrShtLeanApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>, DeSerializersT>
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
  ): SuplrInvcSeldSrvcEntrShtLeanApi<DeSerializersT> {
    return new SuplrInvcSeldSrvcEntrShtLeanApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = SuplrInvcSeldSrvcEntrShtLean;

  requestBuilder(): SuplrInvcSeldSrvcEntrShtLeanRequestBuilder<DeSerializersT> {
    return new SuplrInvcSeldSrvcEntrShtLeanRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    SuplrInvcSeldSrvcEntrShtLean<DeSerializersT>,
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
    typeof SuplrInvcSeldSrvcEntrShtLean,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SuplrInvcSeldSrvcEntrShtLean,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SERVICE_ENTRY_SHEET: OrderableEdmTypeField<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SERVICE_ENTRY_SHEET_ITEM: OrderableEdmTypeField<
      SuplrInvcSeldSrvcEntrShtLean<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<SuplrInvcSeldSrvcEntrShtLean<DeSerializers>>;
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
         * Static representation of the {@link serviceEntrySheet} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SERVICE_ENTRY_SHEET: fieldBuilder.buildEdmTypeField(
          'ServiceEntrySheet',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link serviceEntrySheetItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SERVICE_ENTRY_SHEET_ITEM: fieldBuilder.buildEdmTypeField(
          'ServiceEntrySheetItem',
          'Edm.String',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SuplrInvcSeldSrvcEntrShtLean)
      };
    }

    return this._schema;
  }
}
