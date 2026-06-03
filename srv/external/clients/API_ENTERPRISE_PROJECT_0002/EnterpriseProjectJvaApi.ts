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
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export class EnterpriseProjectJvaApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<EnterpriseProjectJva<DeSerializersT>, DeSerializersT>
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
  ): EnterpriseProjectJvaApi<DeSerializersT> {
    return new EnterpriseProjectJvaApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link toEnterpriseProject} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_ENTERPRISE_PROJECT: OneToOneLink<
      EnterpriseProjectJva<DeSerializersT>,
      DeSerializersT,
      EnterpriseProjectApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [EnterpriseProjectApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      TO_ENTERPRISE_PROJECT: new OneToOneLink(
        'to_EnterpriseProject',
        this,
        linkedApis[0]
      )
    };
    return this;
  }

  entityConstructor = EnterpriseProjectJva;

  requestBuilder(): EnterpriseProjectJvaRequestBuilder<DeSerializersT> {
    return new EnterpriseProjectJvaRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    EnterpriseProjectJva<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<EnterpriseProjectJva<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    EnterpriseProjectJva<DeSerializersT>,
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
    typeof EnterpriseProjectJva,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        EnterpriseProjectJva,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link jntIntrstBillgClassFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JNT_INTRST_BILLG_CLASS_FC: fieldBuilder.buildEdmTypeField(
          'JntIntrstBillgClass_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link jntIntrstBillgSubClassFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JNT_INTRST_BILLG_SUB_CLASS_FC: fieldBuilder.buildEdmTypeField(
          'JntIntrstBillgSubClass_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link jntVntrProjectTypeFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JNT_VNTR_PROJECT_TYPE_FC: fieldBuilder.buildEdmTypeField(
          'JntVntrProjectType_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link jointVentureFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JOINT_VENTURE_FC: fieldBuilder.buildEdmTypeField(
          'JointVenture_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link jointVentureCostRecoveryCodeFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JOINT_VENTURE_COST_RECOVERY_CODE_FC: fieldBuilder.buildEdmTypeField(
          'JointVentureCostRecoveryCode_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link jointVentureEquityTypeFc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JOINT_VENTURE_EQUITY_TYPE_FC: fieldBuilder.buildEdmTypeField(
          'JointVentureEquityType_fc',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link updateMc} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UPDATE_MC: fieldBuilder.buildEdmTypeField(
          'Update_mc',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link projectUuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_UUID: fieldBuilder.buildEdmTypeField(
          'ProjectUUID',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the {@link jointVenture} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JOINT_VENTURE: fieldBuilder.buildEdmTypeField(
          'JointVenture',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jointVentureCostRecoveryCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JOINT_VENTURE_COST_RECOVERY_CODE: fieldBuilder.buildEdmTypeField(
          'JointVentureCostRecoveryCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jointVentureEquityType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JOINT_VENTURE_EQUITY_TYPE: fieldBuilder.buildEdmTypeField(
          'JointVentureEquityType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jntVntrProjectType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JNT_VNTR_PROJECT_TYPE: fieldBuilder.buildEdmTypeField(
          'JntVntrProjectType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jntIntrstBillgClass} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JNT_INTRST_BILLG_CLASS: fieldBuilder.buildEdmTypeField(
          'JntIntrstBillgClass',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link jntIntrstBillgSubClass} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        JNT_INTRST_BILLG_SUB_CLASS: fieldBuilder.buildEdmTypeField(
          'JntIntrstBillgSubClass',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', EnterpriseProjectJva)
      };
    }

    return this._schema;
  }
}
