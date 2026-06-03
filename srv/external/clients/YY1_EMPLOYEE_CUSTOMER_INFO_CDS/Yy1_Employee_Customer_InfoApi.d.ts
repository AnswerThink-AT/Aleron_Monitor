/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Yy1_Employee_Customer_Info } from './Yy1_Employee_Customer_Info';
import { Yy1_Employee_Customer_InfoRequestBuilder } from './Yy1_Employee_Customer_InfoRequestBuilder';
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
export declare class Yy1_Employee_Customer_InfoApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<Yy1_Employee_Customer_Info<DeSerializersT>, DeSerializersT>
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
  ): Yy1_Employee_Customer_InfoApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Yy1_Employee_Customer_Info;
  requestBuilder(): Yy1_Employee_Customer_InfoRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    Yy1_Employee_Customer_Info<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    Yy1_Employee_Customer_Info<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof Yy1_Employee_Customer_Info,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SAP_UUID: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    WORKER_ID: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    NAME: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SSN: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    EMP_GRP: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    EMP_SUBGRP: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    START_DATE: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    END_DATE: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    CONTRAT_SAP: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SALES_ORD_SAP: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_ID: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_NAME: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CUSTOMER_ID: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SS_ORDER: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WN_ORDER: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    POSITION_ID: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    JOB_ID: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    ZPAYROLL: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    RECRID: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    ZTIME_IND: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ZHIRE_ACTION: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ACTION_TYPE: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    T_REASON: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ZHRREPT: OrderableEdmTypeField<
      Yy1_Employee_Customer_Info<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<Yy1_Employee_Customer_Info<DeSerializers>>;
  };
}
