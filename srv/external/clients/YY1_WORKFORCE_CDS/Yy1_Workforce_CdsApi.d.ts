/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Yy1_Workforce_Cds } from './Yy1_Workforce_Cds';
import { Yy1_Workforce_CdsRequestBuilder } from './Yy1_Workforce_CdsRequestBuilder';
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
export declare class Yy1_Workforce_CdsApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Yy1_Workforce_Cds<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): Yy1_Workforce_CdsApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Yy1_Workforce_Cds;
  requestBuilder(): Yy1_Workforce_CdsRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    Yy1_Workforce_Cds<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Yy1_Workforce_Cds<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof Yy1_Workforce_Cds, DeSerializersT>;
  private _schema?;
  get schema(): {
    WORKFORCE_PERSON_EXTERNAL_ID: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FIRST_NAME: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUSINESS_PARTNER: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    MIDDLE_NAME: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    AUTHORIZATION_GROUP: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_10: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_8: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_9: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_7: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_6: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_5: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_4: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_3: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_2: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_1: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DATA_CONTROLLER_SET: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_BUSINESS_PURPOSE_COMPLETED: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    NATIVE_PREFERRED_LANGUAGE: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INITIALS: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BIRTH_NAME: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FULL_NAME: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    LAST_NAME: OrderableEdmTypeField<
      Yy1_Workforce_Cds<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<Yy1_Workforce_Cds<DeSerializers>>;
  };
}
