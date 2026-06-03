/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntDlvbrl } from './EntProjElmntDlvbrl';
import { EntProjElmntDlvbrlRequestBuilder } from './EntProjElmntDlvbrlRequestBuilder';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
import { EntProjElmntDlvbrlDistrApi } from './EntProjElmntDlvbrlDistrApi';
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
export class EntProjElmntDlvbrlApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT>
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
  ): EntProjElmntDlvbrlApi<DeSerializersT> {
    return new EntProjElmntDlvbrlApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjElmntDlvbrl<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toEntProjElmntDlvDistr} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ELMNT_DLV_DISTR: Link<
      EntProjElmntDlvbrl<DeSerializersT>,
      DeSerializersT,
      EntProjElmntDlvbrlDistrApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EntProjElmntDlvbrlDistrApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      TO_ENTERPRISE_PROJECT_ELEMENT: new OneToOneLink(
        'to_EnterpriseProjectElement',
        this,
        linkedApis[0]
      ),
      TO_ENT_PROJ_ELMNT_DLV_DISTR: new Link(
        'to_EntProjElmntDlvDistr',
        this,
        linkedApis[1]
      )
    };
    return this;
  }

  entityConstructor = EntProjElmntDlvbrl;

  requestBuilder(): EntProjElmntDlvbrlRequestBuilder<DeSerializersT> {
    return new EntProjElmntDlvbrlRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EntProjElmntDlvbrl<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EntProjElmntDlvbrl<DeSerializersT>,
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
    typeof EntProjElmntDlvbrl,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EntProjElmntDlvbrl,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    UPDATE_MC: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TO_ENT_PROJ_ELMNT_DLV_DISTR_OC: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DELIVERABLE_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DELIVERABLE_TYPE: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_QUANTITY: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_QUANTITY_UNIT: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATION_DATE_TIME: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGED_BY_USER: OrderableEdmTypeField<
      EntProjElmntDlvbrl<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjElmntDlvbrl<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toEntProjElmntDlvDistr} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ELMNT_DLV_DISTR: Link<
      EntProjElmntDlvbrl<DeSerializersT>,
      DeSerializersT,
      EntProjElmntDlvbrlDistrApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjElmntDlvbrl<DeSerializers>>;
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
         * Static representation of the {@link toEntProjElmntDlvDistrOc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_ENT_PROJ_ELMNT_DLV_DISTR_OC: fieldBuilder.buildEdmTypeField(
          'to_EntProjElmntDlvDistr_oc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntDeliverableUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DELIVERABLE_UUID: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDeliverableUUID',
          'Edm.Guid',
          false
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
         * Static representation of the {@link entProjElmntDeliverableType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DELIVERABLE_TYPE: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDeliverableType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntDlvbrlQuantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DLVBRL_QUANTITY: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDlvbrlQuantity',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link entProjElmntDlvbrlQuantityUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_DLVBRL_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField(
          'EntProjElmntDlvbrlQuantityUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link createdByUser} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATED_BY_USER: fieldBuilder.buildEdmTypeField(
          'CreatedByUser',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link creationDateTime} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATION_DATE_TIME: fieldBuilder.buildEdmTypeField(
          'CreationDateTime',
          'Edm.DateTimeOffset',
          true
        ),
        /**
         * Static representation of the {@link lastChangeDateTime} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_CHANGE_DATE_TIME: fieldBuilder.buildEdmTypeField(
          'LastChangeDateTime',
          'Edm.DateTimeOffset',
          true
        ),
        /**
         * Static representation of the {@link lastChangedByUser} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_CHANGED_BY_USER: fieldBuilder.buildEdmTypeField(
          'LastChangedByUser',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EntProjElmntDlvbrl)
      };
    }

    return this._schema;
  }
}
