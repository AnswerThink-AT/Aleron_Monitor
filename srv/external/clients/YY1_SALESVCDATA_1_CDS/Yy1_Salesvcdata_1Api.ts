/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Yy1_Salesvcdata_1 } from './Yy1_Salesvcdata_1';
import { Yy1_Salesvcdata_1RequestBuilder } from './Yy1_Salesvcdata_1RequestBuilder';
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
export class Yy1_Salesvcdata_1Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT>
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
  ): Yy1_Salesvcdata_1Api<DeSerializersT> {
    return new Yy1_Salesvcdata_1Api(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = Yy1_Salesvcdata_1;

  requestBuilder(): Yy1_Salesvcdata_1RequestBuilder<DeSerializersT> {
    return new Yy1_Salesvcdata_1RequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    Yy1_Salesvcdata_1<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT>(
      this
    );
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<
    typeof Yy1_Salesvcdata_1,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        Yy1_Salesvcdata_1,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    SAP_UUID: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    SALES_ORDER_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SALES_ORDER_ITEM_NUM: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BILLING_DOCUMENT_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    BILLING_DOCUMENT_ITEM_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CUSTOM_SALES_ORDER_TYPE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CUSTOM_BILLING_TYPE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_1_ACA_RG_ONLY: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_2_ACA_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_3_ACA_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_4_ACA_TOTAL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_5_LINE_ITEM_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_6_SC_LINE_ITEM_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_7_INVISIBLE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_8_WEEK_ENDING_2: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_9_ZZWEEK_END_VBAP: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_10_EMPLOYEE_TYPE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_11_EIGHT_DAY_WEEK: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_12_DAY_1_SHIFT_1_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_13_DAY_1_SHIFT_1_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_14_DAY_1_SHIFT_1_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_15_DAY_1_SHIFT_2_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_16_DAY_1_SHIFT_2_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_17_DAY_1_SHIFT_2_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_18_DAY_1_SHIFT_3_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_19_DAY_1_SHIFT_3_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_20_DAY_1_SHIFT_3_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_21_DAY_ONE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_22_DAY_ONE_WORKED: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_23_DAY_2_SHIFT_1_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_24_DAY_2_SHIFT_1_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_25_DAY_2_SHIFT_1_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_26_DAY_2_SHIFT_2_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_27_DAY_2_SHIFT_2_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_28_DAY_2_SHIFT_2_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_29_DAY_2_SHIFT_3_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_30_DAY_2_SHIFT_3_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_31_DAY_2_SHIFT_3_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_32_DAY_TWO: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_33_DAY_TWO_WORKED: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_34_DAY_3_SHIFT_1_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_35_DAY_3_SHIFT_1_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_36_DAY_3_SHIFT_1_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_37_DAY_3_SHIFT_2_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_38_DAY_3_SHIFT_2_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_39_DAY_3_SHIFT_2_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_40_DAY_3_SHIFT_3_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_41_DAY_3_SHIFT_3_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_42_DAY_3_SHIFT_3_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_43_DAY_THREE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_44_DAY_THREE_WORKED: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_45_DAY_4_SHIFT_1_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_46_DAY_4_SHIFT_1_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_47_DAY_4_SHIFT_1_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_48_DAY_4_SHIFT_2_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_49_DAY_4_SHIFT_2_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_50_DAY_4_SHIFT_2_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_51_DAY_4_SHIFT_3_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_52_DAY_4_SHIFT_3_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_53_DAY_4_SHIFT_3_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_54_DAY_FOUR: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_55_DAY_FOUR_WORKED: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_56_DAY_5_SHIFT_1_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_57_DAY_5_SHIFT_1_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_58_DAY_5_SHIFT_1_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_59_DAY_5_SHIFT_2_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_60_DAY_5_SHIFT_2_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_61_DAY_5_SHIFT_2_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_62_DAY_5_SHIFT_3_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_63_DAY_5_SHIFT_3_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_64_DAY_5_SHIFT_3_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_65_DAY_FIVE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_66_DAY_FIVE_WORKED: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_67_DAY_6_SHIFT_1_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_68_DAY_6_SHIFT_1_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_69_DAY_6_SHIFT_1_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_70_DAY_6_SHIFT_2_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_71_DAY_6_SHIFT_2_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_72_DAY_6_SHIFT_2_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_73_DAY_6_SHIFT_3_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_74_DAY_6_SHIFT_3_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_75_DAY_6_SHIFT_3_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_76_DAY_SIX: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_77_DAY_SIX_WORKED: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_78_DAY_7_SHIFT_1_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_79_DAY_7_SHIFT_1_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_80_DAY_7_SHIFT_1_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_81_DAY_7_SHIFT_2_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_82_DAY_7_SHIFT_2_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_83_DAY_7_SHIFT_2_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_84_DAY_7_SHIFT_3_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_85_DAY_7_SHIFT_3_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_86_DAY_7_SHIFT_3_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_87_DAY_SEVEN: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_88_DAY_SEVEN_WORKED: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_89_DAY_8_SHIFT_1_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_90_DAY_8_SHIFT_1_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_91_DAY_8_SHIFT_1_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_92_DAY_8_SHIFT_2_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_93_DAY_8_SHIFT_2_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_94_DAY_8_SHIFT_2_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_95_DAY_8_SHIFT_3_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_96_DAY_8_SHIFT_3_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_97_DAY_8_SHIFT_3_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_98_DAY_EIGHT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_99_DAY_EIGHT_WORKED: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_100_SHIFT_1_TOTAL_HRS_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_101_SHIFT_1_TOTAL_HRS_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_102_SHIFT_1_TOTAL_HRS_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_103_SHIFT_2_TOTAL_HRS_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_104_SHIFT_2_TOTAL_HRS_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_105_SHIFT_2_TOTAL_HRS_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_106_SHIFT_3_TOTAL_HRS_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_107_SHIFT_3_TOTAL_HRS_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_108_SHIFT_3_TOTAL_HRS_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_109_SHIFT_1_PRICE_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_110_SHIFT_1_PRICE_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_111_SHIFT_1_PRICE_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_112_SHIFT_2_PRICE_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_113_SHIFT_2_PRICE_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_114_SHIFT_2_PRICE_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_115_SHIFT_3_PRICE_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_116_SHIFT_3_PRICE_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_117_SHIFT_3_PRICE_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_118_MARK_UP_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_119_MARK_UP_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_120_MARK_UP_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_121_SHIFT_1_TOTAL_PRICE_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_122_SHIFT_1_TOTAL_PRICE_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_123_SHIFT_1_TOTAL_PRICE_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_124_SHIFT_2_TOTAL_PRICE_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_125_SHIFT_2_TOTAL_PRICE_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_126_SHIFT_2_TOTAL_PRICE_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_127_SHIFT_3_TOTAL_PAY_RG: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_128_SHIFT_3_TOTAL_PAY_OT: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_129_SHIFT_3_TOTAL_PAY_DB: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_130_ADMIN_FEE_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_1<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    ALL_FIELDS: AllFields<Yy1_Salesvcdata_1<DeSerializers>>;
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
         * Static representation of the {@link salesOrderNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_ORDER_NUMBER: fieldBuilder.buildEdmTypeField(
          'SalesOrderNumber',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link salesOrderItemNum} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_ORDER_ITEM_NUM: fieldBuilder.buildEdmTypeField(
          'SalesOrderItemNum',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link billingDocumentNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BILLING_DOCUMENT_NUMBER: fieldBuilder.buildEdmTypeField(
          'Billing_Document_Number',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link billingDocumentItemNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BILLING_DOCUMENT_ITEM_NUMBER: fieldBuilder.buildEdmTypeField(
          'Billing_Document_Item_Number',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link customSalesOrderType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOM_SALES_ORDER_TYPE: fieldBuilder.buildEdmTypeField(
          'Custom_Sales_Order_Type',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link customBillingType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOM_BILLING_TYPE: fieldBuilder.buildEdmTypeField(
          'Custom_Billing_type',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link yy1AcaRgOnly} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_1_ACA_RG_ONLY: fieldBuilder.buildEdmTypeField(
          'YY1_ACA_RG_ONLY',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link yy2AcaHrs} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_2_ACA_HRS: fieldBuilder.buildEdmTypeField(
          'YY2_ACA_HRS',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy3AcaHrsPrice} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_3_ACA_HRS_PRICE: fieldBuilder.buildEdmTypeField(
          'YY3_ACA_HRS_PRICE',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy4AcaTotalHrsPrice} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_4_ACA_TOTAL_HRS_PRICE: fieldBuilder.buildEdmTypeField(
          'YY4_ACA_TOTAL_HRS_PRICE',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy5LineItemNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_5_LINE_ITEM_NUMBER: fieldBuilder.buildEdmTypeField(
          'YY5_LINE_ITEM_NUMBER',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy6ScLineItemNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_6_SC_LINE_ITEM_NUMBER: fieldBuilder.buildEdmTypeField(
          'YY6_SC_LINE_ITEM_NUMBER',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link yy7Invisible} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_7_INVISIBLE: fieldBuilder.buildEdmTypeField(
          'YY7_INVISIBLE',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link yy8WeekEnding2} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_8_WEEK_ENDING_2: fieldBuilder.buildEdmTypeField(
          'YY8_WEEK_ENDING2',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy9ZzweekEndVbap} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_9_ZZWEEK_END_VBAP: fieldBuilder.buildEdmTypeField(
          'YY9_ZZWEEK_END_VBAP',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy10EmployeeType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_10_EMPLOYEE_TYPE: fieldBuilder.buildEdmTypeField(
          'YY10_EMPLOYEE_TYPE',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link yy11EightDayWeek} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_11_EIGHT_DAY_WEEK: fieldBuilder.buildEdmTypeField(
          'YY11_EIGHT_DAY_WEEK',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link yy12Day1Shift1Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_12_DAY_1_SHIFT_1_RG: fieldBuilder.buildEdmTypeField(
          'YY12_DAY1_SHIFT1_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy13Day1Shift1Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_13_DAY_1_SHIFT_1_OT: fieldBuilder.buildEdmTypeField(
          'YY13_DAY1_SHIFT1_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy14Day1Shift1Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_14_DAY_1_SHIFT_1_DB: fieldBuilder.buildEdmTypeField(
          'YY14_DAY1_SHIFT1_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy15Day1Shift2Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_15_DAY_1_SHIFT_2_RG: fieldBuilder.buildEdmTypeField(
          'YY15_DAY1_SHIFT2_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy16Day1Shift2Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_16_DAY_1_SHIFT_2_OT: fieldBuilder.buildEdmTypeField(
          'YY16_DAY1_SHIFT2_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy17Day1Shift2Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_17_DAY_1_SHIFT_2_DB: fieldBuilder.buildEdmTypeField(
          'YY17_DAY1_SHIFT2_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy18Day1Shift3Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_18_DAY_1_SHIFT_3_RG: fieldBuilder.buildEdmTypeField(
          'YY18_DAY1_SHIFT3_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy19Day1Shift3Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_19_DAY_1_SHIFT_3_OT: fieldBuilder.buildEdmTypeField(
          'YY19_DAY1_SHIFT3_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy20Day1Shift3Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_20_DAY_1_SHIFT_3_DB: fieldBuilder.buildEdmTypeField(
          'YY20_DAY1_SHIFT3_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy21DayOne} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_21_DAY_ONE: fieldBuilder.buildEdmTypeField(
          'YY21_DAY_ONE',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy22DayOneWorked} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_22_DAY_ONE_WORKED: fieldBuilder.buildEdmTypeField(
          'YY22_DAY_ONE_WORKED',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy23Day2Shift1Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_23_DAY_2_SHIFT_1_RG: fieldBuilder.buildEdmTypeField(
          'YY23_DAY2_SHIFT1_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy24Day2Shift1Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_24_DAY_2_SHIFT_1_OT: fieldBuilder.buildEdmTypeField(
          'YY24_DAY2_SHIFT1_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy25Day2Shift1Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_25_DAY_2_SHIFT_1_DB: fieldBuilder.buildEdmTypeField(
          'YY25_DAY2_SHIFT1_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy26Day2Shift2Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_26_DAY_2_SHIFT_2_RG: fieldBuilder.buildEdmTypeField(
          'YY26_DAY2_SHIFT2_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy27Day2Shift2Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_27_DAY_2_SHIFT_2_OT: fieldBuilder.buildEdmTypeField(
          'YY27_DAY2_SHIFT2_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy28Day2Shift2Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_28_DAY_2_SHIFT_2_DB: fieldBuilder.buildEdmTypeField(
          'YY28_DAY2_SHIFT2_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy29Day2Shift3Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_29_DAY_2_SHIFT_3_RG: fieldBuilder.buildEdmTypeField(
          'YY29_DAY2_SHIFT3_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy30Day2Shift3Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_30_DAY_2_SHIFT_3_OT: fieldBuilder.buildEdmTypeField(
          'YY30_DAY2_SHIFT3_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy31Day2Shift3Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_31_DAY_2_SHIFT_3_DB: fieldBuilder.buildEdmTypeField(
          'YY31_DAY2_SHIFT3_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy32DayTwo} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_32_DAY_TWO: fieldBuilder.buildEdmTypeField(
          'YY32_DAY_TWO',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy33DayTwoWorked} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_33_DAY_TWO_WORKED: fieldBuilder.buildEdmTypeField(
          'YY33_DAY_TWO_WORKED',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy34Day3Shift1Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_34_DAY_3_SHIFT_1_RG: fieldBuilder.buildEdmTypeField(
          'YY34_DAY3_SHIFT1_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy35Day3Shift1Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_35_DAY_3_SHIFT_1_OT: fieldBuilder.buildEdmTypeField(
          'YY35_DAY3_SHIFT1_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy36Day3Shift1Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_36_DAY_3_SHIFT_1_DB: fieldBuilder.buildEdmTypeField(
          'YY36_DAY3_SHIFT1_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy37Day3Shift2Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_37_DAY_3_SHIFT_2_RG: fieldBuilder.buildEdmTypeField(
          'YY37_DAY3_SHIFT2_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy38Day3Shift2Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_38_DAY_3_SHIFT_2_OT: fieldBuilder.buildEdmTypeField(
          'YY38_DAY3_SHIFT2_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy39Day3Shift2Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_39_DAY_3_SHIFT_2_DB: fieldBuilder.buildEdmTypeField(
          'YY39_DAY3_SHIFT2_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy40Day3Shift3Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_40_DAY_3_SHIFT_3_RG: fieldBuilder.buildEdmTypeField(
          'YY40_DAY3_SHIFT3_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy41Day3Shift3Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_41_DAY_3_SHIFT_3_OT: fieldBuilder.buildEdmTypeField(
          'YY41_DAY3_SHIFT3_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy42Day3Shift3Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_42_DAY_3_SHIFT_3_DB: fieldBuilder.buildEdmTypeField(
          'YY42_DAY3_SHIFT3_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy43DayThree} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_43_DAY_THREE: fieldBuilder.buildEdmTypeField(
          'YY43_DAY_THREE',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy44DayThreeWorked} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_44_DAY_THREE_WORKED: fieldBuilder.buildEdmTypeField(
          'YY44_DAY_THREE_WORKED',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy45Day4Shift1Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_45_DAY_4_SHIFT_1_RG: fieldBuilder.buildEdmTypeField(
          'YY45_DAY4_SHIFT1_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy46Day4Shift1Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_46_DAY_4_SHIFT_1_OT: fieldBuilder.buildEdmTypeField(
          'YY46_DAY4_SHIFT1_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy47Day4Shift1Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_47_DAY_4_SHIFT_1_DB: fieldBuilder.buildEdmTypeField(
          'YY47_DAY4_SHIFT1_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy48Day4Shift2Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_48_DAY_4_SHIFT_2_RG: fieldBuilder.buildEdmTypeField(
          'YY48_DAY4_SHIFT2_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy49Day4Shift2Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_49_DAY_4_SHIFT_2_OT: fieldBuilder.buildEdmTypeField(
          'YY49_DAY4_SHIFT2_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy50Day4Shift2Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_50_DAY_4_SHIFT_2_DB: fieldBuilder.buildEdmTypeField(
          'YY50_DAY4_SHIFT2_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy51Day4Shift3Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_51_DAY_4_SHIFT_3_RG: fieldBuilder.buildEdmTypeField(
          'YY51_DAY4_SHIFT3_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy52Day4Shift3Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_52_DAY_4_SHIFT_3_OT: fieldBuilder.buildEdmTypeField(
          'YY52_DAY4_SHIFT3_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy53Day4Shift3Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_53_DAY_4_SHIFT_3_DB: fieldBuilder.buildEdmTypeField(
          'YY53_DAY4_SHIFT3_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy54DayFour} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_54_DAY_FOUR: fieldBuilder.buildEdmTypeField(
          'YY54_DAY_FOUR',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy55DayFourWorked} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_55_DAY_FOUR_WORKED: fieldBuilder.buildEdmTypeField(
          'YY55_DAY_FOUR_WORKED',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy56Day5Shift1Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_56_DAY_5_SHIFT_1_RG: fieldBuilder.buildEdmTypeField(
          'YY56_DAY5_SHIFT1_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy57Day5Shift1Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_57_DAY_5_SHIFT_1_OT: fieldBuilder.buildEdmTypeField(
          'YY57_DAY5_SHIFT1_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy58Day5Shift1Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_58_DAY_5_SHIFT_1_DB: fieldBuilder.buildEdmTypeField(
          'YY58_DAY5_SHIFT1_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy59Day5Shift2Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_59_DAY_5_SHIFT_2_RG: fieldBuilder.buildEdmTypeField(
          'YY59_DAY5_SHIFT2_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy60Day5Shift2Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_60_DAY_5_SHIFT_2_OT: fieldBuilder.buildEdmTypeField(
          'YY60_DAY5_SHIFT2_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy61Day5Shift2Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_61_DAY_5_SHIFT_2_DB: fieldBuilder.buildEdmTypeField(
          'YY61_DAY5_SHIFT2_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy62Day5Shift3Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_62_DAY_5_SHIFT_3_RG: fieldBuilder.buildEdmTypeField(
          'YY62_DAY5_SHIFT3_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy63Day5Shift3Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_63_DAY_5_SHIFT_3_OT: fieldBuilder.buildEdmTypeField(
          'YY63_DAY5_SHIFT3_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy64Day5Shift3Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_64_DAY_5_SHIFT_3_DB: fieldBuilder.buildEdmTypeField(
          'YY64_DAY5_SHIFT3_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy65DayFive} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_65_DAY_FIVE: fieldBuilder.buildEdmTypeField(
          'YY65_DAY_FIVE',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy66DayFiveWorked} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_66_DAY_FIVE_WORKED: fieldBuilder.buildEdmTypeField(
          'YY66_DAY_FIVE_WORKED',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy67Day6Shift1Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_67_DAY_6_SHIFT_1_RG: fieldBuilder.buildEdmTypeField(
          'YY67_DAY6_SHIFT1_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy68Day6Shift1Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_68_DAY_6_SHIFT_1_OT: fieldBuilder.buildEdmTypeField(
          'YY68_DAY6_SHIFT1_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy69Day6Shift1Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_69_DAY_6_SHIFT_1_DB: fieldBuilder.buildEdmTypeField(
          'YY69_DAY6_SHIFT1_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy70Day6Shift2Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_70_DAY_6_SHIFT_2_RG: fieldBuilder.buildEdmTypeField(
          'YY70_DAY6_SHIFT2_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy71Day6Shift2Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_71_DAY_6_SHIFT_2_OT: fieldBuilder.buildEdmTypeField(
          'YY71_DAY6_SHIFT2_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy72Day6Shift2Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_72_DAY_6_SHIFT_2_DB: fieldBuilder.buildEdmTypeField(
          'YY72_DAY6_SHIFT2_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy73Day6Shift3Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_73_DAY_6_SHIFT_3_RG: fieldBuilder.buildEdmTypeField(
          'YY73_DAY6_SHIFT3_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy74Day6Shift3Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_74_DAY_6_SHIFT_3_OT: fieldBuilder.buildEdmTypeField(
          'YY74_DAY6_SHIFT3_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy75Day6Shift3Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_75_DAY_6_SHIFT_3_DB: fieldBuilder.buildEdmTypeField(
          'YY75_DAY6_SHIFT3_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy76DaySix} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_76_DAY_SIX: fieldBuilder.buildEdmTypeField(
          'YY76_DAY_SIX',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy77DaySixWorked} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_77_DAY_SIX_WORKED: fieldBuilder.buildEdmTypeField(
          'YY77_DAY_SIX_WORKED',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy78Day7Shift1Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_78_DAY_7_SHIFT_1_RG: fieldBuilder.buildEdmTypeField(
          'YY78_DAY7_SHIFT1_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy79Day7Shift1Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_79_DAY_7_SHIFT_1_OT: fieldBuilder.buildEdmTypeField(
          'YY79_DAY7_SHIFT1_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy80Day7Shift1Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_80_DAY_7_SHIFT_1_DB: fieldBuilder.buildEdmTypeField(
          'YY80_DAY7_SHIFT1_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy81Day7Shift2Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_81_DAY_7_SHIFT_2_RG: fieldBuilder.buildEdmTypeField(
          'YY81_DAY7_SHIFT2_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy82Day7Shift2Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_82_DAY_7_SHIFT_2_OT: fieldBuilder.buildEdmTypeField(
          'YY82_DAY7_SHIFT2_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy83Day7Shift2Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_83_DAY_7_SHIFT_2_DB: fieldBuilder.buildEdmTypeField(
          'YY83_DAY7_SHIFT2_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy84Day7Shift3Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_84_DAY_7_SHIFT_3_RG: fieldBuilder.buildEdmTypeField(
          'YY84_DAY7_SHIFT3_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy85Day7Shift3Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_85_DAY_7_SHIFT_3_OT: fieldBuilder.buildEdmTypeField(
          'YY85_DAY7_SHIFT3_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy86Day7Shift3Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_86_DAY_7_SHIFT_3_DB: fieldBuilder.buildEdmTypeField(
          'YY86_DAY7_SHIFT3_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy87DaySeven} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_87_DAY_SEVEN: fieldBuilder.buildEdmTypeField(
          'YY87_DAY_SEVEN',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy88DaySevenWorked} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_88_DAY_SEVEN_WORKED: fieldBuilder.buildEdmTypeField(
          'YY88_DAY_SEVEN_WORKED',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy89Day8Shift1Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_89_DAY_8_SHIFT_1_RG: fieldBuilder.buildEdmTypeField(
          'YY89_DAY8_SHIFT1_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy90Day8Shift1Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_90_DAY_8_SHIFT_1_OT: fieldBuilder.buildEdmTypeField(
          'YY90_DAY8_SHIFT1_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy91Day8Shift1Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_91_DAY_8_SHIFT_1_DB: fieldBuilder.buildEdmTypeField(
          'YY91_DAY8_SHIFT1_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy92Day8Shift2Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_92_DAY_8_SHIFT_2_RG: fieldBuilder.buildEdmTypeField(
          'YY92_DAY8_SHIFT2_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy93Day8Shift2Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_93_DAY_8_SHIFT_2_OT: fieldBuilder.buildEdmTypeField(
          'YY93_DAY8_SHIFT2_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy94Day8Shift2Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_94_DAY_8_SHIFT_2_DB: fieldBuilder.buildEdmTypeField(
          'YY94_DAY8_SHIFT2_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy95Day8Shift3Rg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_95_DAY_8_SHIFT_3_RG: fieldBuilder.buildEdmTypeField(
          'YY95_DAY8_SHIFT3_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy96Day8Shift3Ot} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_96_DAY_8_SHIFT_3_OT: fieldBuilder.buildEdmTypeField(
          'YY96_DAY8_SHIFT3_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy97Day8Shift3Db} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_97_DAY_8_SHIFT_3_DB: fieldBuilder.buildEdmTypeField(
          'YY97_DAY8_SHIFT3_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy98DayEight} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_98_DAY_EIGHT: fieldBuilder.buildEdmTypeField(
          'YY98_DAY_EIGHT',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link yy99DayEightWorked} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_99_DAY_EIGHT_WORKED: fieldBuilder.buildEdmTypeField(
          'YY99_DAY_EIGHT_WORKED',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy100Shift1TotalHrsRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_100_SHIFT_1_TOTAL_HRS_RG: fieldBuilder.buildEdmTypeField(
          'YY100_SHIFT1_TOTAL_HRS_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy101Shift1TotalHrsOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_101_SHIFT_1_TOTAL_HRS_OT: fieldBuilder.buildEdmTypeField(
          'YY101_SHIFT1_TOTAL_HRS_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy102Shift1TotalHrsDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_102_SHIFT_1_TOTAL_HRS_DB: fieldBuilder.buildEdmTypeField(
          'YY102_SHIFT1_TOTAL_HRS_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy103Shift2TotalHrsRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_103_SHIFT_2_TOTAL_HRS_RG: fieldBuilder.buildEdmTypeField(
          'YY103_SHIFT2_TOTAL_HRS_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy104Shift2TotalHrsOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_104_SHIFT_2_TOTAL_HRS_OT: fieldBuilder.buildEdmTypeField(
          'YY104_SHIFT2_TOTAL_HRS_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy105Shift2TotalHrsDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_105_SHIFT_2_TOTAL_HRS_DB: fieldBuilder.buildEdmTypeField(
          'YY105_SHIFT2_TOTAL_HRS_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy106Shift3TotalHrsRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_106_SHIFT_3_TOTAL_HRS_RG: fieldBuilder.buildEdmTypeField(
          'YY106_SHIFT3_TOTAL_HRS_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy107Shift3TotalHrsOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_107_SHIFT_3_TOTAL_HRS_OT: fieldBuilder.buildEdmTypeField(
          'YY107_SHIFT3_TOTAL_HRS_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy108Shift3TotalHrsDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_108_SHIFT_3_TOTAL_HRS_DB: fieldBuilder.buildEdmTypeField(
          'YY108_SHIFT3_TOTAL_HRS_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy109Shift1PriceRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_109_SHIFT_1_PRICE_RG: fieldBuilder.buildEdmTypeField(
          'YY109_SHIFT1_PRICE_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy110Shift1PriceOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_110_SHIFT_1_PRICE_OT: fieldBuilder.buildEdmTypeField(
          'YY110_SHIFT1_PRICE_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy111Shift1PriceDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_111_SHIFT_1_PRICE_DB: fieldBuilder.buildEdmTypeField(
          'YY111_SHIFT1_PRICE_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy112Shift2PriceRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_112_SHIFT_2_PRICE_RG: fieldBuilder.buildEdmTypeField(
          'YY112_SHIFT2_PRICE_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy113Shift2PriceOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_113_SHIFT_2_PRICE_OT: fieldBuilder.buildEdmTypeField(
          'YY113_SHIFT2_PRICE_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy114Shift2PriceDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_114_SHIFT_2_PRICE_DB: fieldBuilder.buildEdmTypeField(
          'YY114_SHIFT2_PRICE_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy115Shift3PriceRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_115_SHIFT_3_PRICE_RG: fieldBuilder.buildEdmTypeField(
          'YY115_SHIFT3_PRICE_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy116Shift3PriceOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_116_SHIFT_3_PRICE_OT: fieldBuilder.buildEdmTypeField(
          'YY116_SHIFT3_PRICE_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy117Shift3PriceDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_117_SHIFT_3_PRICE_DB: fieldBuilder.buildEdmTypeField(
          'YY117_SHIFT3_PRICE_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy118MarkUpRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_118_MARK_UP_RG: fieldBuilder.buildEdmTypeField(
          'YY118_MARK_UP_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy119MarkUpOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_119_MARK_UP_OT: fieldBuilder.buildEdmTypeField(
          'YY119_MARK_UP_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy120MarkUpDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_120_MARK_UP_DB: fieldBuilder.buildEdmTypeField(
          'YY120_MARK_UP_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy121Shift1TotalPriceRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_121_SHIFT_1_TOTAL_PRICE_RG: fieldBuilder.buildEdmTypeField(
          'YY121_SHIFT1_TOTAL_PRICE_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy122Shift1TotalPriceOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_122_SHIFT_1_TOTAL_PRICE_OT: fieldBuilder.buildEdmTypeField(
          'YY122_SHIFT1_TOTAL_PRICE_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy123Shift1TotalPriceDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_123_SHIFT_1_TOTAL_PRICE_DB: fieldBuilder.buildEdmTypeField(
          'YY123_SHIFT1_TOTAL_PRICE_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy124Shift2TotalPriceRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_124_SHIFT_2_TOTAL_PRICE_RG: fieldBuilder.buildEdmTypeField(
          'YY124_SHIFT2_TOTAL_PRICE_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy125Shift2TotalPriceOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_125_SHIFT_2_TOTAL_PRICE_OT: fieldBuilder.buildEdmTypeField(
          'YY125_SHIFT2_TOTAL_PRICE_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy126Shift2TotalPriceDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_126_SHIFT_2_TOTAL_PRICE_DB: fieldBuilder.buildEdmTypeField(
          'YY126_SHIFT2_TOTAL_PRICE_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy127Shift3TotalPayRg} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_127_SHIFT_3_TOTAL_PAY_RG: fieldBuilder.buildEdmTypeField(
          'YY127_SHIFT3_TOTAL_PAY_RG',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy128Shift3TotalPayOt} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_128_SHIFT_3_TOTAL_PAY_OT: fieldBuilder.buildEdmTypeField(
          'YY128_SHIFT3_TOTAL_PAY_OT',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy129Shift3TotalPayDb} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_129_SHIFT_3_TOTAL_PAY_DB: fieldBuilder.buildEdmTypeField(
          'YY129_SHIFT3_TOTAL_PAY_DB',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link yy130AdminFeePrice} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        YY_130_ADMIN_FEE_PRICE: fieldBuilder.buildEdmTypeField(
          'YY130_ADMIN_FEE_PRICE',
          'Edm.Decimal',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', Yy1_Salesvcdata_1)
      };
    }

    return this._schema;
  }
}
