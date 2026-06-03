/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjectElmntPublicSector } from './EntProjectElmntPublicSector';
import { EntProjectElmntPublicSectorRequestBuilder } from './EntProjectElmntPublicSectorRequestBuilder';
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
export class EntProjectElmntPublicSectorApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<EntProjectElmntPublicSector<DeSerializersT>, DeSerializersT>
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
  ): EntProjectElmntPublicSectorApi<DeSerializersT> {
    return new EntProjectElmntPublicSectorApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProjectElement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT_ELEMENT: OneToOneLink<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjectElmntPublicSector<DeSerializersT>,
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

  entityConstructor = EntProjectElmntPublicSector;

  requestBuilder(): EntProjectElmntPublicSectorRequestBuilder<DeSerializersT> {
    return new EntProjectElmntPublicSectorRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EntProjectElmntPublicSector<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EntProjectElmntPublicSector<DeSerializersT>,
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
    typeof EntProjectElmntPublicSector,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EntProjectElmntPublicSector,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    FUNCTIONAL_AREA_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUND_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    FUND_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    GRANT_ID_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    GRANT_IS_FIX_ASSIGNED_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    SPONSORED_PROGRAM_FC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    FUND: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUND_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    FUNCTIONAL_AREA_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    GRANT_ID: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GRANT_IS_FIX_ASSIGNED: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    SPONSORED_PROGRAM: OrderableEdmTypeField<
      EntProjectElmntPublicSector<DeSerializers>,
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
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjectElmntPublicSector<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjectElmntPublicSector<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link functionalAreaIsFixAssignedFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUNCTIONAL_AREA_IS_FIX_ASSIGNED_FC: fieldBuilder.buildEdmTypeField(
          'FunctionalAreaIsFixAssigned_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link fundFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUND_FC: fieldBuilder.buildEdmTypeField('Fund_fc', 'Edm.Byte', true),
        /**
         * Static representation of the {@link fundIsFixAssignedFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUND_IS_FIX_ASSIGNED_FC: fieldBuilder.buildEdmTypeField(
          'FundIsFixAssigned_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link grantIdFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GRANT_ID_FC: fieldBuilder.buildEdmTypeField(
          'GrantID_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link grantIsFixAssignedFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GRANT_IS_FIX_ASSIGNED_FC: fieldBuilder.buildEdmTypeField(
          'GrantIsFixAssigned_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link sponsoredProgramFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SPONSORED_PROGRAM_FC: fieldBuilder.buildEdmTypeField(
          'SponsoredProgram_fc',
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
         * Static representation of the {@link fund} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUND: fieldBuilder.buildEdmTypeField('Fund', 'Edm.String', true),
        /**
         * Static representation of the {@link fundIsFixAssigned} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUND_IS_FIX_ASSIGNED: fieldBuilder.buildEdmTypeField(
          'FundIsFixAssigned',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link functionalAreaIsFixAssigned} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUNCTIONAL_AREA_IS_FIX_ASSIGNED: fieldBuilder.buildEdmTypeField(
          'FunctionalAreaIsFixAssigned',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link grantId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GRANT_ID: fieldBuilder.buildEdmTypeField('GrantID', 'Edm.String', true),
        /**
         * Static representation of the {@link grantIsFixAssigned} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GRANT_IS_FIX_ASSIGNED: fieldBuilder.buildEdmTypeField(
          'GrantIsFixAssigned',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link sponsoredProgram} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SPONSORED_PROGRAM: fieldBuilder.buildEdmTypeField(
          'SponsoredProgram',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EntProjectElmntPublicSector)
      };
    }

    return this._schema;
  }
}
