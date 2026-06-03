/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Yy1_Billingtype } from './Yy1_Billingtype';
import { Yy1_BillingtypeRequestBuilder } from './Yy1_BillingtypeRequestBuilder';
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
export declare class Yy1_BillingtypeApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Yy1_Billingtype<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): Yy1_BillingtypeApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Yy1_Billingtype;
  requestBuilder(): Yy1_BillingtypeRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    Yy1_Billingtype<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Yy1_Billingtype<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof Yy1_Billingtype, DeSerializersT>;
  private _schema?;
  get schema(): {
    SAP_UUID: OrderableEdmTypeField<
      Yy1_Billingtype<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    SO_ORDER_TYPE: OrderableEdmTypeField<
      Yy1_Billingtype<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BILLING_TYPE: OrderableEdmTypeField<
      Yy1_Billingtype<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    STANDARD_ORDER_TYPE: OrderableEdmTypeField<
      Yy1_Billingtype<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<Yy1_Billingtype<DeSerializers>>;
  };
}
