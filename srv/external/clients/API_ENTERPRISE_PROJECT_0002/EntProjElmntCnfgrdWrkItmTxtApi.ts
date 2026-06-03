/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { EntProjElmntCnfgrdWrkItmTxt } from './EntProjElmntCnfgrdWrkItmTxt';
import { EntProjElmntCnfgrdWrkItmTxtRequestBuilder } from './EntProjElmntCnfgrdWrkItmTxtRequestBuilder';
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
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export class EntProjElmntCnfgrdWrkItmTxtApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>, DeSerializersT>
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
  ): EntProjElmntCnfgrdWrkItmTxtApi<DeSerializersT> {
    return new EntProjElmntCnfgrdWrkItmTxtApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = EntProjElmntCnfgrdWrkItmTxt;

  requestBuilder(): EntProjElmntCnfgrdWrkItmTxtRequestBuilder<DeSerializersT> {
    return new EntProjElmntCnfgrdWrkItmTxtRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EntProjElmntCnfgrdWrkItmTxt<DeSerializersT>,
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
    typeof EntProjElmntCnfgrdWrkItmTxt,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EntProjElmntCnfgrdWrkItmTxt,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link entProjElmntWorkItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_WORK_ITEM: fieldBuilder.buildEdmTypeField(
          'EntProjElmntWorkItem',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link language} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LANGUAGE: fieldBuilder.buildEdmTypeField(
          'Language',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link entProjElmntCnfgrdWrkItmName} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENT_PROJ_ELMNT_CNFGRD_WRK_ITM_NAME: fieldBuilder.buildEdmTypeField(
          'EntProjElmntCnfgrdWrkItmName',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EntProjElmntCnfgrdWrkItmTxt)
      };
    }

    return this._schema;
  }
}
