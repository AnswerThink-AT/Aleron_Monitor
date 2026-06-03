/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntBlockFunc } from './EntProjElmntBlockFunc';
import { EntProjElmntBlockFuncRequestBuilder } from './EntProjElmntBlockFuncRequestBuilder';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
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
export class EntProjElmntBlockFuncApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjElmntBlockFunc<DeSerializersT>, DeSerializersT>
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
  ): EntProjElmntBlockFuncApi<DeSerializersT> {
    return new EntProjElmntBlockFuncApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjElmntBlockFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjElmntBlockFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      TO_ENTERPRISE_PROJECT_ELEMENT: new OneToOneLink(
        'to_EnterpriseProjectElement',
        this,
        linkedApis[0]
      ),
      TO_ENTERPRISE_PROJECT: new OneToOneLink(
        'to_EnterpriseProject',
        this,
        linkedApis[1]
      )
    };
    return this;
  }

  entityConstructor = EntProjElmntBlockFunc;

  requestBuilder(): EntProjElmntBlockFuncRequestBuilder<DeSerializersT> {
    return new EntProjElmntBlockFuncRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EntProjElmntBlockFunc<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<EntProjElmntBlockFunc<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EntProjElmntBlockFunc<DeSerializersT>,
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
    typeof EntProjElmntBlockFunc,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EntProjElmntBlockFunc,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_PURCHASING_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_SERVICE_POSTING_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    ENT_PROJ_TIME_RECG_IS_BLKD_FC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    ENT_PROJ_TIME_RECG_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_SERVICE_POSTING_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_PURCHASING_IS_BLKD: OrderableEdmTypeField<
      EntProjElmntBlockFunc<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjElmntBlockFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjElmntBlockFunc<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjElmntBlockFunc<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link entProjOtherExpensePostgIsBlkdFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_OTHER_EXPENSE_POSTG_IS_BLKD_FC: fieldBuilder.buildEdmTypeField(
          'EntProjOtherExpensePostgIsBlkd_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link entProjPurchasingIsBlkdFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_PURCHASING_IS_BLKD_FC: fieldBuilder.buildEdmTypeField(
          'EntProjPurchasingIsBlkd_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link entProjServicePostingIsBlkdFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_SERVICE_POSTING_IS_BLKD_FC: fieldBuilder.buildEdmTypeField(
          'EntProjServicePostingIsBlkd_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link entProjStaffExpensePostgIsBlkdFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_STAFF_EXPENSE_POSTG_IS_BLKD_FC: fieldBuilder.buildEdmTypeField(
          'EntProjStaffExpensePostgIsBlkd_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link entProjTimeRecgIsBlkdFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_TIME_RECG_IS_BLKD_FC: fieldBuilder.buildEdmTypeField(
          'EntProjTimeRecgIsBlkd_fc',
          'Edm.Byte',
          true
        ),
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
         * Static representation of the {@link projectElementUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ELEMENT_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectElementUUID',
          'Edm.Guid',
          false
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
        ALL_FIELDS: new AllFields('*', EntProjElmntBlockFunc)
      };
    }

    return this._schema;
  }
}
