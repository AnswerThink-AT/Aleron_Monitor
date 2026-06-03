/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjectElementJva } from './EntProjectElementJva';
import { EntProjectElementJvaRequestBuilder } from './EntProjectElementJvaRequestBuilder';
import { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
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
export declare class EntProjectElementJvaApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjectElementJva<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EntProjectElementJvaApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EnterpriseProjectApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EntProjectElementJva;
  requestBuilder(): EntProjectElementJvaRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntProjectElementJva<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EntProjectElementJva<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof EntProjectElementJva, DeSerializersT>;
  private _schema?;
  get schema(): {
    JNT_INTRST_BILLG_CLASS_FC: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JNT_INTRST_BILLG_SUB_CLASS_FC: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JNT_VNTR_PROJECT_TYPE_FC: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JOINT_VENTURE_FC: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JOINT_VENTURE_COST_RECOVERY_CODE_FC: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    JOINT_VENTURE_EQUITY_TYPE_FC: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    UPDATE_MC: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    JOINT_VENTURE: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JOINT_VENTURE_COST_RECOVERY_CODE: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JOINT_VENTURE_EQUITY_TYPE: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JNT_VNTR_PROJECT_TYPE: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JNT_INTRST_BILLG_CLASS: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    JNT_INTRST_BILLG_SUB_CLASS: OrderableEdmTypeField<
      EntProjectElementJva<DeSerializers>,
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
      EntProjectElementJva<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectElementApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EntProjectElementJva<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjectElementJva<DeSerializers>>;
  };
}
