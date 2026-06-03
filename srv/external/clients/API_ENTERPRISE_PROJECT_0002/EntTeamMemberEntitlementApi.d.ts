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
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export declare class EntTeamMemberEntitlementApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntTeamMemberEntitlement<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers?: DeSerializersT
  ): EntTeamMemberEntitlementApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectTeamMemberApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>,
      EnterpriseProjectRoleApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EntTeamMemberEntitlement;
  requestBuilder(): EntTeamMemberEntitlementRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntTeamMemberEntitlement<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EntTeamMemberEntitlement<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EntTeamMemberEntitlement,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
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
}
