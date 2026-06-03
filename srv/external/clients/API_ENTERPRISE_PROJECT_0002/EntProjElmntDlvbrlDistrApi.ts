/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntDlvbrlDistr } from './EntProjElmntDlvbrlDistr';
import { EntProjElmntDlvbrlDistrRequestBuilder } from './EntProjElmntDlvbrlDistrRequestBuilder';
import { EntProjElmntDlvbrlApi } from './EntProjElmntDlvbrlApi';
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
  OrderableEdmTypeField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export class EntProjElmntDlvbrlDistrApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjElmntDlvbrlDistr<DeSerializersT>, DeSerializersT>
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
  ): EntProjElmntDlvbrlDistrApi<DeSerializersT> {
    return new EntProjElmntDlvbrlDistrApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toEntProjElmntDlvbrl} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ELMNT_DLVBRL: OneToOneLink<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT,
      EntProjElmntDlvbrlApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [EntProjElmntDlvbrlApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      TO_ENT_PROJ_ELMNT_DLVBRL: new OneToOneLink(
        'to_EntProjElmntDlvbrl',
        this,
        linkedApis[0]
      )
    };
    return this;
  }

  entityConstructor = EntProjElmntDlvbrlDistr;

  requestBuilder(): EntProjElmntDlvbrlDistrRequestBuilder<DeSerializersT> {
    return new EntProjElmntDlvbrlDistrRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EntProjElmntDlvbrlDistr<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EntProjElmntDlvbrlDistr<DeSerializersT>,
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
    typeof EntProjElmntDlvbrlDistr,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EntProjElmntDlvbrlDistr,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    UPDATE_MC: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    ENT_PROJ_ELMNT_DELIVERABLE_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_YEAR_VAL: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_PERD_VAL: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_QTY: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_QTY_UNIT: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEntProjElmntDlvbrl} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ELMNT_DLVBRL: OneToOneLink<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT,
      EntProjElmntDlvbrlApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjElmntDlvbrlDistr<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link updateMc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UPDATE_MC: fieldBuilder.buildEdmTypeField(
          'Update_mc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntDlvbrlDistrUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DLVBRL_DISTR_UUID: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDlvbrlDistrUUID',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the {@link entProjElmntDeliverableUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DELIVERABLE_UUID: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDeliverableUUID',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link projectElementUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ELEMENT_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectElementUUID',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link projectUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectUUID',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntDlvbrlDistrYearVal} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DLVBRL_DISTR_YEAR_VAL: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDlvbrlDistrYearVal',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntDlvbrlDistrPerdVal} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DLVBRL_DISTR_PERD_VAL: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDlvbrlDistrPerdVal',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntDlvbrlDistrQty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DLVBRL_DISTR_QTY: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDlvbrlDistrQty',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntDlvbrlDistrQtyUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DLVBRL_DISTR_QTY_UNIT: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDlvbrlDistrQtyUnit',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EntProjElmntDlvbrlDistr)
      };
    }

    return this._schema;
  }
}
