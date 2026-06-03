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
export class EnterpriseProjectRoleApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProjectRole<DeSerializersT>, DeSerializersT>
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
  ): EnterpriseProjectRoleApi<DeSerializersT> {
    return new EnterpriseProjectRoleApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjectRole<DeSerializersT>,
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

  entityConstructor = EnterpriseProjectRole;

  requestBuilder(): EnterpriseProjectRoleRequestBuilder<DeSerializersT> {
    return new EnterpriseProjectRoleRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EnterpriseProjectRole<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<EnterpriseProjectRole<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EnterpriseProjectRole<DeSerializersT>,
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
    typeof EnterpriseProjectRole,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EnterpriseProjectRole,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link projectRoleUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ROLE_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectRoleUUID',
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
         * Static representation of the {@link projectRoleType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ROLE_TYPE: fieldBuilder.buildEdmTypeField(
          'ProjectRoleType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link projectRoleCategory} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ROLE_CATEGORY: fieldBuilder.buildEdmTypeField(
          'ProjectRoleCategory',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link projectRoleName} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ROLE_NAME: fieldBuilder.buildEdmTypeField(
          'ProjectRoleName',
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
        ALL_FIELDS: new AllFields('*', EnterpriseProjectRole)
      };
    }

    return this._schema;
  }
}
