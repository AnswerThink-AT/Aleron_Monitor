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
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  Link,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export declare class EnterpriseProjectTeamMemberApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<EnterpriseProjectTeamMember<DeSerializersT>, DeSerializersT>
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
  ): EnterpriseProjectTeamMemberApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EntTeamMemberEntitlementApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EnterpriseProjectTeamMember;
  requestBuilder(): EnterpriseProjectTeamMemberRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EnterpriseProjectTeamMember<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EnterpriseProjectTeamMember<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EnterpriseProjectTeamMember,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
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
}
