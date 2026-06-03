/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Yy1_Salesvcdata_2 } from './Yy1_Salesvcdata_2';
import { Yy1_Salesvcdata_2RequestBuilder } from './Yy1_Salesvcdata_2RequestBuilder';
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
export declare class Yy1_Salesvcdata_2Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Yy1_Salesvcdata_2<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): Yy1_Salesvcdata_2Api<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Yy1_Salesvcdata_2;
  requestBuilder(): Yy1_Salesvcdata_2RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    Yy1_Salesvcdata_2<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Yy1_Salesvcdata_2<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof Yy1_Salesvcdata_2, DeSerializersT>;
  private _schema?;
  get schema(): {
    SAP_UUID: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    SALES_ORDER_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    SALES_ORDER_ITEM_NUM: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    BILLING_DOCUMENT_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    BILLING_DOCUMENT_ITEM_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_131_DC: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_132_HW_PAY_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_133_HW_TOTAL_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_134_DAILY_PAY_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_135_DAILY_TOTAL_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_136_HOLIDAY_PAY_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_137_HOLIDAY_TOTAL_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_138_ONCALL_PAY_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_139_ONCALL_TOTAL_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_140_VACATION_PAY_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_141_VACATION_TOTAL_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_142_SALARY_PAY_VENDOR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_143_DIRECT_PLACEMENT: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_144_WEEKLY_CLOCK_FEE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_145_PER_DIEM_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_146_PER_DIEM_TAX_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_147_PER_DIEM_NOTAX_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_148_PER_DIEM_TAX: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_149_PER_DIEM_NO_TAX: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_150_DAILY_PAY_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_151_DAILY_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_152_DAILY_TOTAL_RATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_153_SICK_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_154_SICK_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_155_SICK_TOTAL_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_156_SICK_HOURS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_157_SICK_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_158_SICK_TOTAL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_159_MISC: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_160_BEREAV_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_161_BEREAV_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_162_BEREAV_HRS_RATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_163_BEREAV_DAYS_RATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_164_BEREAV_TOTAL_HRS_RATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_165_BEREAV_TOTAL_DAYS_RATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_166_BONUS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_167_BONUS_PAY_RATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_168_COMMISSION_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_169_HOL_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_170_HOL_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_171_HOL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_172_HOL_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_173_HOL_TOTAL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_174_HOL_TOTAL_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_175_HOLIDAY_DATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_176_HW_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_177_HW_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_178_HW_TOTAL_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_179_JURY_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_180_JURY_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_181_JURY_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_182_JURY_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_183_JURY_TOTAL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_184_JURY_TOTAL_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_185_LONGEVITY_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_186_LONGEVITY_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_187_LONGEVITY_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_188_LONGEVITY_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_189_LONGEVITY_TOTAL_HRS_PR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_190_LONGEVITY_TOTAL_DAYS_P: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_191_ONCALL_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_192_ONCALL_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_193_ONCALL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_194_ONCALL_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_195_ONCALL_TOTAL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_196_ONCALL_TOTAL_DAYS_PRIC: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_197_RETRO_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_198_RETRO_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_199_RETRO_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_200_RETRO_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_201_RETRO_TOTAL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_202_RETRO_TOTAL_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_203_SALARY: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_204_SEV_PAY_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_205_SEV_PAY_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_206_SEV_PAY_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_207_SEV_PAY_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_208_SEV_PAY_TOTAL_HRS_PRIC: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_209_SEV_PAY_TOTAL_DAYS_PRI: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_210_VAC_BILL_DAYS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_211_VAC_BILL_HRS: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_212_VAC_BILL_HRS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_213_VAC_BILL_DAYS_PRICE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_214_VAC_BILL_TOTAL_HRS_PRI: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_215_VAC_BILL_TOTAL_DAYS_PR: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    YY_216_CUST_BUSINESS_UNIT: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_217_CUST_CHARGE_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_218_CUST_PROJECT_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_219_CUST_COST_CENTER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_220_CUST_COMPANY_CODE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_221_CUST_DEPT_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_222_CUST_DOTS_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_223_CUST_RUI: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_224_CUST_ACCT_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_225_CUST_BUDGET_CENTER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_226_CUST_CON_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_227_CUST_VENDOR_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_228_CUST_ORG_CODE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_229_CUST_LEGAL_ENTITY: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_230_CUST_ORACLE_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_231_CUST_UNIT_STORE_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_232_CUST_SVC_DATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_233_CUST_EMPLOYEE_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_234_CUST_AGREE_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_235_CUST_TASK_15: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_236_CUST_FEPS_CODE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_237_CUST_POSITION: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_238_CUST_GL_CODE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_239_CUST_PURCHASE_AGREE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_240_CUST_BB_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_241_CUST_BGRD_CHECK_DATE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    YY_242_CUST_DIV_UNIT_NUMBER: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_243_CUST_POSITION_CODE: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_244_ITEM_CATEGORY: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_245_ZSD_WN_INVOICE_VBAP: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_246_ZSD_WN_INVOICE_VCSD: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_247_ZSD_WN_WORK_ORDER_VCSD: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_248_ZSD_WN_WORK_ORDER_VBAP: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    YY_249_CUST_COST_CENTER_2_VBAP: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIELD_124: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIELD_125: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIELD_126: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIELD_127: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIELD_128: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FIELD_129: OrderableEdmTypeField<
      Yy1_Salesvcdata_2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<Yy1_Salesvcdata_2<DeSerializers>>;
  };
}
