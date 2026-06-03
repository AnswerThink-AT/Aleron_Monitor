/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EnterpriseProjectJva } from './EnterpriseProjectJva';
import { EnterpriseProjectJvaRequestBuilder } from './EnterpriseProjectJvaRequestBuilder';
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
export declare class EnterpriseProjectJvaApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProjectJva<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EnterpriseProjectJvaApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [EnterpriseProjectApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof EnterpriseProjectJva;
  requestBuilder(): EnterpriseProjectJvaRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EnterpriseProjectJva<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EnterpriseProjectJva<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof EnterpriseProjectJva, DeSerializersT>;
  private _schema?;
  get schema(): {
    JNT_INTRST_BILLG_CLASS_FC: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JNT_INTRST_BILLG_SUB_CLASS_FC: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JNT_VNTR_PROJECT_TYPE_FC: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JOINT_VENTURE_FC: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JOINT_VENTURE_COST_RECOVERY_CODE_FC: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JOINT_VENTURE_EQUITY_TYPE_FC: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    JOINT_VENTURE: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JOINT_VENTURE_COST_RECOVERY_CODE: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JOINT_VENTURE_EQUITY_TYPE: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JNT_VNTR_PROJECT_TYPE: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JNT_INTRST_BILLG_CLASS: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JNT_INTRST_BILLG_SUB_CLASS: OrderableEdmTypeField<
      EnterpriseProjectJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjectJva<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EnterpriseProjectJva<DeSerializers>>;
  };
}
