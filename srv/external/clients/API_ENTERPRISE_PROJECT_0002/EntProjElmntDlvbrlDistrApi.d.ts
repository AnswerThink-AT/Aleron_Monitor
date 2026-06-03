/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntDlvbrlDistr } from './EntProjElmntDlvbrlDistr';
import { EntProjElmntDlvbrlDistrRequestBuilder } from './EntProjElmntDlvbrlDistrRequestBuilder';
import { EntProjElmntDlvbrlApi } from './EntProjElmntDlvbrlApi';
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
export declare class EntProjElmntDlvbrlDistrApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EntProjElmntDlvbrlDistr<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): EntProjElmntDlvbrlDistrApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [EntProjElmntDlvbrlApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof EntProjElmntDlvbrlDistr;
  requestBuilder(): EntProjElmntDlvbrlDistrRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntProjElmntDlvbrlDistr<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EntProjElmntDlvbrlDistr<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EntProjElmntDlvbrlDistr,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    UPDATE_MC: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    ENT_PROJ_ELMNT_DELIVERABLE_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_ELEMENT_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    PROJECT_UUID: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_YEAR_VAL: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_PERD_VAL: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_QTY: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    ENT_PROJ_ELMNT_DLVBRL_DISTR_QTY_UNIT: OrderableEdmTypeField<
      EntProjElmntDlvbrlDistr<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toEntProjElmntDlvbrl} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENT_PROJ_ELMNT_DLVBRL: OneToOneLink<
      EntProjElmntDlvbrlDistr<DeSerializersT>,
      DeSerializersT,
      EntProjElmntDlvbrlApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<EntProjElmntDlvbrlDistr<DeSerializers>>;
  };
}
