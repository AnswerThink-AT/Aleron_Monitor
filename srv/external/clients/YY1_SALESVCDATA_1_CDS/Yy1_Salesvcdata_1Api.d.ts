/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Yy1_Salesvcdata_1 } from './Yy1_Salesvcdata_1';
import { Yy1_Salesvcdata_1RequestBuilder } from './Yy1_Salesvcdata_1RequestBuilder';
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
export declare class Yy1_Salesvcdata_1Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): Yy1_Salesvcdata_1Api<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Yy1_Salesvcdata_1;
  requestBuilder(): Yy1_Salesvcdata_1RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    Yy1_Salesvcdata_1<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Yy1_Salesvcdata_1<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof Yy1_Salesvcdata_1, DeSerializersT>;
  private _schema?;
  get schema(): {
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
}
