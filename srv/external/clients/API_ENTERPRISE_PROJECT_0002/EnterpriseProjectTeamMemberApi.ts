/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EnterpriseProjectTeamMember } from './EnterpriseProjectTeamMember';
import { EnterpriseProjectTeamMemberRequestBuilder } from './EnterpriseProjectTeamMemberRequestBuilder';
import { EntTeamMemberEntitlementApi } from './EntTeamMemberEntitlementApi';
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
  Link,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export class EnterpriseProjectTeamMemberApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<EnterpriseProjectTeamMember<DeSerializersT>, DeSerializersT>
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
  ): EnterpriseProjectTeamMemberApi<DeSerializersT> {
    return new EnterpriseProjectTeamMemberApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property {@link toEntProjEntitlement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ENTITLEMENT: Link<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT,
      EntTeamMemberEntitlementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [
      EntTeamMemberEntitlementApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      TO_ENT_PROJ_ENTITLEMENT: new Link(
        'to_EntProjEntitlement',
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

  entityConstructor = EnterpriseProjectTeamMember;

  requestBuilder(): EnterpriseProjectTeamMemberRequestBuilder<DeSerializersT> {
    return new EnterpriseProjectTeamMemberRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EnterpriseProjectTeamMember<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EnterpriseProjectTeamMember<DeSerializersT>,
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
    typeof EnterpriseProjectTeamMember,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EnterpriseProjectTeamMember,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    TO_ENT_PROJ_ENTITLEMENT_OC: OrderableEdmTypeField<
      EnterpriseProjectTeamMember<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TEAM_MEMBER_UUID: OrderableEdmTypeField<
      EnterpriseProjectTeamMember<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    BUSINESS_PARTNER_UUID: OrderableEdmTypeField<
      EnterpriseProjectTeamMember<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EnterpriseProjectTeamMember<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      EnterpriseProjectTeamMember<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATION_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProjectTeamMember<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGED_BY_USER: OrderableEdmTypeField<
      EnterpriseProjectTeamMember<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProjectTeamMember<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toEntProjEntitlement} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ENTITLEMENT: Link<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT,
      EntTeamMemberEntitlementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjectTeamMember<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EnterpriseProjectTeamMember<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link toEntProjEntitlementOc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_ENT_PROJ_ENTITLEMENT_OC: fieldBuilder.buildEdmTypeField(
          'to_EntProjEntitlement_oc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link teamMemberUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TEAM_MEMBER_UUID: fieldBuilder.buildEdmTypeField(
          'TeamMemberUUID',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the {@link businessPartnerUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER_UUID: fieldBuilder.buildEdmTypeField(
          'BusinessPartnerUUID',
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
        ALL_FIELDS: new AllFields('*', EnterpriseProjectTeamMember)
      };
    }

    return this._schema;
  }
}
