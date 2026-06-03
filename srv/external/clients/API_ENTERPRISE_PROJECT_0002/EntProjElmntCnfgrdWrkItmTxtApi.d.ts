/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntCnfgrdWrkItmTxt } from './EntProjElmntCnfgrdWrkItmTxt';
import { EntProjElmntCnfgrdWrkItmTxtRequestBuilder } from './EntProjElmntCnfgrdWrkItmTxtRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export declare class EntProjElmntCnfgrdWrkItmTxtApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>, DeSerializersT>
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
  ): EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof EntProjElmntCnfgrdWrkItmTxt;
  requestBuilder(): EntProjElmntCnfgrdWrkItmTxtRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof EntProjElmntCnfgrdWrkItmTxt,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    ENT_PROJ_ELMNT_WORK_ITEM: OrderableEdmTypeField<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    LANGUAGE: OrderableEdmTypeField<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ENT_PROJ_ELMNT_CNFGRD_WRK_ITM_NAME: OrderableEdmTypeField<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<EntProjElmntCnfgrdWrkItmTxt<DeSerializers>>;
  };
}
