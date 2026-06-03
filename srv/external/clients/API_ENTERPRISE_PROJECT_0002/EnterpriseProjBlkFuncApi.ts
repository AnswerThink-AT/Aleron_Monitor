/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EnterpriseProjBlkFunc } from './EnterpriseProjBlkFunc';
import { EnterpriseProjBlkFuncRequestBuilder } from './EnterpriseProjBlkFuncRequestBuilder';
import { EnterpriseProjectApi } from './EnterpriseProjectApi';
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
export class EnterpriseProjBlkFuncApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProjBlkFunc<DeSerializersT>, DeSerializersT>
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
  ): EnterpriseProjBlkFuncApi<DeSerializersT> {
    return new EnterpriseProjBlkFuncApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjBlkFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [EnterpriseProjectApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      TO_ENTERPRISE_PROJECT: new OneToOneLink(
        'to_EnterpriseProject',
        this,
        linkedApis[0]
      )
    };
    return this;
  }

  entityConstructor = EnterpriseProjBlkFunc;

  requestBuilder(): EnterpriseProjBlkFuncRequestBuilder<DeSerializersT> {
    return new EnterpriseProjBlkFuncRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EnterpriseProjBlkFunc<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<EnterpriseProjBlkFunc<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EnterpriseProjBlkFunc<DeSerializersT>,
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
    typeof EnterpriseProjBlkFunc,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EnterpriseProjBlkFunc,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    UPDATE_MC: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    ENT_PROJ_TIME_RECG_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_SERVICE_POSTING_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_PURCHASING_IS_BLKD: OrderableEdmTypeField<
      EnterpriseProjBlkFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjBlkFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EnterpriseProjBlkFunc<DeSerializers>>;
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
         * Static representation of the {@link projectUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectUUID',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the {@link entProjTimeRecgIsBlkd} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_TIME_RECG_IS_BLKD: fieldBuilder.buildEdmTypeField(
          'EntProjTimeRecgIsBlkd',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link entProjStaffExpensePostgIsBlkd} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD: fieldBuilder.buildEdmTypeField(
          'EntProjStaffExpensePostgIsBlkd',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link entProjServicePostingIsBlkd} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_SERVICE_POSTING_IS_BLKD: fieldBuilder.buildEdmTypeField(
          'EntProjServicePostingIsBlkd',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link entProjOtherExpensePostgIsBlkd} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD: fieldBuilder.buildEdmTypeField(
          'EntProjOtherExpensePostgIsBlkd',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link entProjPurchasingIsBlkd} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_PURCHASING_IS_BLKD: fieldBuilder.buildEdmTypeField(
          'EntProjPurchasingIsBlkd',
          'Edm.Boolean',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EnterpriseProjBlkFunc)
      };
    }

    return this._schema;
  }
}
