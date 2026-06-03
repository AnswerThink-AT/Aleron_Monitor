/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntTeamMemberEntitlement } from './EntTeamMemberEntitlement';
import { EntTeamMemberEntitlementRequestBuilder } from './EntTeamMemberEntitlementRequestBuilder';
import { EnterpriseProjectTeamMemberApi } from './EnterpriseProjectTeamMemberApi';
import { EnterpriseProjectApi } from './EnterpriseProjectApi';
import { EnterpriseProjectRoleApi } from './EnterpriseProjectRoleApi';
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
export class EntTeamMemberEntitlementApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntTeamMemberEntitlement<DeSerializersT>, DeSerializersT>
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
  ): EntTeamMemberEntitlementApi<DeSerializersT> {
    return new EntTeamMemberEntitlementApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toTeamMember} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_TEAM_MEMBER: OneToOneLink<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectTeamMemberApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toRole} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ROLE: OneToOneLink<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectRoleApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectTeamMemberApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>,
      EnterpriseProjectRoleApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      TO_TEAM_MEMBER: new OneToOneLink('to_TeamMember', this, linkedApis[0]),
      TO_ENTERPRISE_PROJECT: new OneToOneLink(
        'to_EnterpriseProject',
        this,
        linkedApis[1]
      ),
      TO_ROLE: new OneToOneLink('to_Role', this, linkedApis[2])
    };
    return this;
  }

  entityConstructor = EntTeamMemberEntitlement;

  requestBuilder(): EntTeamMemberEntitlementRequestBuilder<DeSerializersT> {
    return new EntTeamMemberEntitlementRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EntTeamMemberEntitlement<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EntTeamMemberEntitlement<DeSerializersT>,
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
    typeof EntTeamMemberEntitlement,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EntTeamMemberEntitlement,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    DELETE_MC: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_ENTITLEMENT_UUID: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ROLE_UUID: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    TEAM_MEMBER_UUID: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ROLE_TYPE: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATION_DATE_TIME: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGED_BY_USER: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      EntTeamMemberEntitlement<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toTeamMember} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_TEAM_MEMBER: OneToOneLink<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectTeamMemberApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toRole} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ROLE: OneToOneLink<
      EntTeamMemberEntitlement<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectRoleApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntTeamMemberEntitlement<DeSerializers>>;
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
         * Static representation of the {@link projectEntitlementUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ENTITLEMENT_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectEntitlementUUID',
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
         * Static representation of the {@link projectRoleUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ROLE_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectRoleUUID',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link teamMemberUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TEAM_MEMBER_UUID: fieldBuilder.buildEdmTypeField(
          'TeamMemberUUID',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link projectRoleType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ROLE_TYPE: fieldBuilder.buildEdmTypeField(
          'ProjectRoleType',
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
         * Static representation of the {@link lastChangedByUser} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_CHANGED_BY_USER: fieldBuilder.buildEdmTypeField(
          'LastChangedByUser',
          'Edm.String',
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
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EntTeamMemberEntitlement)
      };
    }

    return this._schema;
  }
}
