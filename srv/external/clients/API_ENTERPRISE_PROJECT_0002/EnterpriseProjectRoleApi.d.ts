/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EnterpriseProjectRole } from './EnterpriseProjectRole';
import { EnterpriseProjectRoleRequestBuilder } from './EnterpriseProjectRoleRequestBuilder';
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
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export declare class EnterpriseProjectRoleApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProjectRole<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EnterpriseProjectRoleApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [EnterpriseProjectApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof EnterpriseProjectRole;
  requestBuilder(): EnterpriseProjectRoleRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EnterpriseProjectRole<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EnterpriseProjectRole<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EnterpriseProjectRole,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    PROJECT_ROLE_UUID: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ROLE_TYPE: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_ROLE_CATEGORY: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_ROLE_NAME: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATED_BY_USER: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CREATION_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    LAST_CHANGED_BY_USER: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LAST_CHANGE_DATE_TIME: OrderableEdmTypeField<
      EnterpriseProjectRole<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjectRole<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EnterpriseProjectRole<DeSerializers>>;
  };
}
