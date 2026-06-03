/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Yy1_Employee_Customer_Info } from './Yy1_Employee_Customer_Info';
import { Yy1_Employee_Customer_InfoRequestBuilder } from './Yy1_Employee_Customer_InfoRequestBuilder';
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
export class Yy1_Employee_Customer_InfoApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<Yy1_Employee_Customer_Info<DeSerializersT>, DeSerializersT>
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
  ): Yy1_Employee_Customer_InfoApi<DeSerializersT> {
    return new Yy1_Employee_Customer_InfoApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = Yy1_Employee_Customer_Info;

  requestBuilder(): Yy1_Employee_Customer_InfoRequestBuilder<DeSerializersT> {
    return new Yy1_Employee_Customer_InfoRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    Yy1_Employee_Customer_Info<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      Yy1_Employee_Customer_Info<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    Yy1_Employee_Customer_Info<DeSerializersT>,
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
    typeof Yy1_Employee_Customer_Info,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        Yy1_Employee_Customer_Info,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link sapUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SAP_UUID: fieldBuilder.buildEdmTypeField('SAP_UUID', 'Edm.Guid', false),
        /**
         * Static representation of the {@link workerId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WORKER_ID: fieldBuilder.buildEdmTypeField(
          'WORKER_ID',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link name} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NAME: fieldBuilder.buildEdmTypeField('Name', 'Edm.String', true),
        /**
         * Static representation of the {@link ssn} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SSN: fieldBuilder.buildEdmTypeField('SSN', 'Edm.String', true),
        /**
         * Static representation of the {@link empGrp} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EMP_GRP: fieldBuilder.buildEdmTypeField('EMP_GRP', 'Edm.String', true),
        /**
         * Static representation of the {@link empSubgrp} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EMP_SUBGRP: fieldBuilder.buildEdmTypeField(
          'EMP_SUBGRP',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link startDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        START_DATE: fieldBuilder.buildEdmTypeField(
          'START_DATE',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link endDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        END_DATE: fieldBuilder.buildEdmTypeField(
          'END_DATE',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link contratSap} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONTRAT_SAP: fieldBuilder.buildEdmTypeField(
          'CONTRAT_SAP',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link salesOrdSap} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_ORD_SAP: fieldBuilder.buildEdmTypeField(
          'SALES_ORD_SAP',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link projectId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_ID: fieldBuilder.buildEdmTypeField(
          'PROJECT_ID',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link projectName} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_NAME: fieldBuilder.buildEdmTypeField(
          'PROJECT_NAME',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link customerId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_ID: fieldBuilder.buildEdmTypeField(
          'CUSTOMER_ID',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link ssOrder} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SS_ORDER: fieldBuilder.buildEdmTypeField(
          'SS_ORDER',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link wnOrder} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WN_ORDER: fieldBuilder.buildEdmTypeField(
          'WN_ORDER',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link positionId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        POSITION_ID: fieldBuilder.buildEdmTypeField(
          'POSITION_ID',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link jobId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JOB_ID: fieldBuilder.buildEdmTypeField('JOB_ID', 'Edm.Decimal', true),
        /**
         * Static representation of the {@link zpayroll} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ZPAYROLL: fieldBuilder.buildEdmTypeField(
          'ZPAYROLL',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link recrid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RECRID: fieldBuilder.buildEdmTypeField('RECRID', 'Edm.Decimal', true),
        /**
         * Static representation of the {@link ztimeInd} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ZTIME_IND: fieldBuilder.buildEdmTypeField(
          'ZTIME_IND',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link zhireAction} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ZHIRE_ACTION: fieldBuilder.buildEdmTypeField(
          'ZHIRE_ACTION',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link actionType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACTION_TYPE: fieldBuilder.buildEdmTypeField(
          'ACTION_TYPE',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link tReason} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        T_REASON: fieldBuilder.buildEdmTypeField(
          'T_REASON',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link zhrrept} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ZHRREPT: fieldBuilder.buildEdmTypeField('ZHRREPT', 'Edm.String', true),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', Yy1_Employee_Customer_Info)
      };
    }

    return this._schema;
  }
}
