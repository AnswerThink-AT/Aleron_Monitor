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
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToOneLink,
  Link
} from '@sap-cloud-sdk/odata-v2';
export declare class EntProjElmntDlvbrlApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EntProjElmntDlvbrlApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      EnterpriseProjectElementApi<DeSerializersT>,
      EntProjElmntDlvbrlDistrApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof EntProjElmntDlvbrl;
  requestBuilder(): EntProjElmntDlvbrlRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntProjElmntDlvbrl<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<EntProjElmntDlvbrl<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof EntProjElmntDlvbrl, DeSerializersT>;
  private _schema?;
  get schema(): {
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
}
