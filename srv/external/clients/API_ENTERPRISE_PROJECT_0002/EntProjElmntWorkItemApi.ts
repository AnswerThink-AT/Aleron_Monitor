/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntWorkItem } from './EntProjElmntWorkItem';
import { EntProjElmntWorkItemRequestBuilder } from './EntProjElmntWorkItemRequestBuilder';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
import { EntProjElmntCnfgrdWrkItmTxtApi } from './EntProjElmntCnfgrdWrkItmTxtApi';
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
  OneToOneLink,
  Link
} from '@sap-cloud-sdk/odata-v2';
export class EntProjElmntWorkItemApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjElmntWorkItem<DeSerializersT>, DeSerializersT>
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
  ): EntProjElmntWorkItemApi<DeSerializersT> {
    return new EntProjElmntWorkItemApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toConfiguredWorkItemText} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_CONFIGURED_WORK_ITEM_TEXT: Link<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      TO_ENTERPRISE_PROJECT_ELEMENT: new OneToOneLink(
        'to_EnterpriseProjectElement',
        this,
        linkedApis[0]
      ),
      TO_CONFIGURED_WORK_ITEM_TEXT: new Link(
        'to_ConfiguredWorkItemText',
        this,
        linkedApis[1]
      ),
      TO_ENTERPRISE_PROJECT: new OneToOneLink(
        'to_EnterpriseProject',
        this,
        linkedApis[2]
      )
    };
    return this;
  }

  entityConstructor = EntProjElmntWorkItem;

  requestBuilder(): EntProjElmntWorkItemRequestBuilder<DeSerializersT> {
    return new EntProjElmntWorkItemRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EntProjElmntWorkItem<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<EntProjElmntWorkItem<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EntProjElmntWorkItem<DeSerializersT>,
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
    typeof EntProjElmntWorkItem,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EntProjElmntWorkItem,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    DELETE_MC: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM_UUID: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM_NAME: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM_IS_INACTIVE: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WORK_ITEM_IS_CNFGRD: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_LAST_UPDT_SRCE: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_CRTED_BY_USR: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_CRTN_DTE_TME: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_LST_CHG_BY_USR: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_WRK_ITM_LST_CHG_DTE_TME: OrderableEdmTypeField<
      EntProjElmntWorkItem<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toConfiguredWorkItemText} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_CONFIGURED_WORK_ITEM_TEXT: Link<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjElmntWorkItem<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjElmntWorkItem<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link deleteMc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELETE_MC: fieldBuilder.buildEdmTypeField(
          'Delete_mc',
          'Edm.Boolean',
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
         * Static representation of the {@link entProjElmntWorkItemUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WORK_ITEM_UUID: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWorkItemUUID',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the {@link entProjElmntWorkItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WORK_ITEM: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWorkItem',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link entProjElmntWorkItemName} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WORK_ITEM_NAME: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWorkItemName',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntWorkItemIsInactive} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WORK_ITEM_IS_INACTIVE: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWorkItemIsInactive',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntWorkItemIsCnfgrd} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WORK_ITEM_IS_CNFGRD: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWorkItemIsCnfgrd',
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
         * Static representation of the {@link entProjElmntWrkItmLastUpdtSrce} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WRK_ITM_LAST_UPDT_SRCE: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWrkItmLastUpdtSrce',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntWrkItmCrtedByUsr} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WRK_ITM_CRTED_BY_USR: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWrkItmCrtedByUsr',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntWrkItmCrtnDteTme} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WRK_ITM_CRTN_DTE_TME: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWrkItmCrtnDteTme',
          'Edm.DateTimeOffset',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntWrkItmLstChgByUsr} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WRK_ITM_LST_CHG_BY_USR: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWrkItmLstChgByUsr',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntWrkItmLstChgDteTme} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WRK_ITM_LST_CHG_DTE_TME: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWrkItmLstChgDteTme',
          'Edm.DateTimeOffset',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EntProjElmntWorkItem)
      };
    }

    return this._schema;
  }
}
