"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yy1_Salesvcdata_2Api = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Yy1_Salesvcdata_2_1 = require("./Yy1_Salesvcdata_2");
const Yy1_Salesvcdata_2RequestBuilder_1 = require("./Yy1_Salesvcdata_2RequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class Yy1_Salesvcdata_2Api {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = Yy1_Salesvcdata_2_1.Yy1_Salesvcdata_2;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new Yy1_Salesvcdata_2Api(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new Yy1_Salesvcdata_2RequestBuilder_1.Yy1_Salesvcdata_2RequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(Yy1_Salesvcdata_2_1.Yy1_Salesvcdata_2, this.deSerializers);
        }
        return this._fieldBuilder;
    }
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
                SALES_ORDER_NUMBER: fieldBuilder.buildEdmTypeField('Sales_Order_Number', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link salesOrderItemNum} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER_ITEM_NUM: fieldBuilder.buildEdmTypeField('Sales_Order_Item_Num', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link billingDocumentNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BILLING_DOCUMENT_NUMBER: fieldBuilder.buildEdmTypeField('Billing_Document_Number', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link billingDocumentItemNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BILLING_DOCUMENT_ITEM_NUMBER: fieldBuilder.buildEdmTypeField('Billing_Document_Item_Number', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy131Dc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_131_DC: fieldBuilder.buildEdmTypeField('YY131_DC', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy132HwPayVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_132_HW_PAY_VENDOR: fieldBuilder.buildEdmTypeField('YY132_HW_PAY_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy133HwTotalVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_133_HW_TOTAL_VENDOR: fieldBuilder.buildEdmTypeField('YY133_HW_TOTAL_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy134DailyPayVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_134_DAILY_PAY_VENDOR: fieldBuilder.buildEdmTypeField('YY134_DAILY_PAY_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy135DailyTotalVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_135_DAILY_TOTAL_VENDOR: fieldBuilder.buildEdmTypeField('YY135_DAILY_TOTAL_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy136HolidayPayVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_136_HOLIDAY_PAY_VENDOR: fieldBuilder.buildEdmTypeField('YY136_HOLIDAY_PAY_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy137HolidayTotalVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_137_HOLIDAY_TOTAL_VENDOR: fieldBuilder.buildEdmTypeField('YY137_HOLIDAY_TOTAL_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy138OncallPayVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_138_ONCALL_PAY_VENDOR: fieldBuilder.buildEdmTypeField('YY138_ONCALL_PAY_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy139OncallTotalVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_139_ONCALL_TOTAL_VENDOR: fieldBuilder.buildEdmTypeField('YY139_ONCALL_TOTAL_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy140VacationPayVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_140_VACATION_PAY_VENDOR: fieldBuilder.buildEdmTypeField('YY140_VACATION_PAY_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy141VacationTotalVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_141_VACATION_TOTAL_VENDOR: fieldBuilder.buildEdmTypeField('YY141_VACATION_TOTAL_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy142SalaryPayVendor} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_142_SALARY_PAY_VENDOR: fieldBuilder.buildEdmTypeField('YY142_SALARY_PAY_VENDOR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy143DirectPlacement} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_143_DIRECT_PLACEMENT: fieldBuilder.buildEdmTypeField('YY143_DIRECT_PLACEMENT', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy144WeeklyClockFee} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_144_WEEKLY_CLOCK_FEE: fieldBuilder.buildEdmTypeField('YY144_WEEKLY_CLOCK_FEE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy145PerDiemDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_145_PER_DIEM_DAYS: fieldBuilder.buildEdmTypeField('YY145_PER_DIEM_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy146PerDiemTaxPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_146_PER_DIEM_TAX_PRICE: fieldBuilder.buildEdmTypeField('YY146_PER_DIEM_TAX_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy147PerDiemNotaxPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_147_PER_DIEM_NOTAX_PRICE: fieldBuilder.buildEdmTypeField('YY147_PER_DIEM_NOTAX_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy148PerDiemTax} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_148_PER_DIEM_TAX: fieldBuilder.buildEdmTypeField('YY148_PER_DIEM_TAX', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy149PerDiemNoTax} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_149_PER_DIEM_NO_TAX: fieldBuilder.buildEdmTypeField('YY149_PER_DIEM_NO_TAX', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy150DailyPayDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_150_DAILY_PAY_DAYS: fieldBuilder.buildEdmTypeField('YY150_DAILY_PAY_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy151DailyPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_151_DAILY_PRICE: fieldBuilder.buildEdmTypeField('YY151_DAILY_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy152DailyTotalRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_152_DAILY_TOTAL_RATE: fieldBuilder.buildEdmTypeField('YY152_DAILY_TOTAL_RATE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy153SickDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_153_SICK_DAYS: fieldBuilder.buildEdmTypeField('YY153_SICK_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy154SickDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_154_SICK_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY154_SICK_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy155SickTotalDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_155_SICK_TOTAL_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY155_SICK_TOTAL_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy156SickHours} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_156_SICK_HOURS: fieldBuilder.buildEdmTypeField('YY156_SICK_HOURS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy157SickHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_157_SICK_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY157_SICK_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy158SickTotalHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_158_SICK_TOTAL_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY158_SICK_TOTAL_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy159Misc} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_159_MISC: fieldBuilder.buildEdmTypeField('YY159_MISC', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy160BereavDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_160_BEREAV_DAYS: fieldBuilder.buildEdmTypeField('YY160_BEREAV_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy161BereavHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_161_BEREAV_HRS: fieldBuilder.buildEdmTypeField('YY161_BEREAV_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy162BereavHrsRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_162_BEREAV_HRS_RATE: fieldBuilder.buildEdmTypeField('YY162_BEREAV_HRS_RATE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy163BereavDaysRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_163_BEREAV_DAYS_RATE: fieldBuilder.buildEdmTypeField('YY163_BEREAV_DAYS_RATE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy164BereavTotalHrsRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_164_BEREAV_TOTAL_HRS_RATE: fieldBuilder.buildEdmTypeField('YY164_BEREAV_TOTAL_HRS_RATE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy165BereavTotalDaysRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_165_BEREAV_TOTAL_DAYS_RATE: fieldBuilder.buildEdmTypeField('YY165_BEREAV_TOTAL_DAYS_RATE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy166BonusPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_166_BONUS_PRICE: fieldBuilder.buildEdmTypeField('YY166_BONUS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy167BonusPayRate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_167_BONUS_PAY_RATE: fieldBuilder.buildEdmTypeField('YY167_BONUS_PAY_RATE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy168CommissionPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_168_COMMISSION_PRICE: fieldBuilder.buildEdmTypeField('YY168_COMMISSION_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy169HolDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_169_HOL_DAYS: fieldBuilder.buildEdmTypeField('YY169_HOL_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy170HolHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_170_HOL_HRS: fieldBuilder.buildEdmTypeField('YY170_HOL_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy171HolHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_171_HOL_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY171_HOL_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy172HolDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_172_HOL_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY172_HOL_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy173HolTotalHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_173_HOL_TOTAL_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY173_HOL_TOTAL_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy174HolTotalDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_174_HOL_TOTAL_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY174_HOL_TOTAL_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy175HolidayDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_175_HOLIDAY_DATE: fieldBuilder.buildEdmTypeField('YY175_HOLIDAY_DATE', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link yy176HwHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_176_HW_HRS: fieldBuilder.buildEdmTypeField('YY176_HW_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy177HwHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_177_HW_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY177_HW_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy178HwTotalPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_178_HW_TOTAL_PRICE: fieldBuilder.buildEdmTypeField('YY178_HW_TOTAL_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy179JuryDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_179_JURY_DAYS: fieldBuilder.buildEdmTypeField('YY179_JURY_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy180JuryHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_180_JURY_HRS: fieldBuilder.buildEdmTypeField('YY180_JURY_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy181JuryHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_181_JURY_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY181_JURY_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy182JuryDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_182_JURY_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY182_JURY_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy183JuryTotalHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_183_JURY_TOTAL_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY183_JURY_TOTAL_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy184JuryTotalDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_184_JURY_TOTAL_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY184_JURY_TOTAL_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy185LongevityDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_185_LONGEVITY_DAYS: fieldBuilder.buildEdmTypeField('YY185_LONGEVITY_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy186LongevityHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_186_LONGEVITY_HRS: fieldBuilder.buildEdmTypeField('YY186_LONGEVITY_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy187LongevityHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_187_LONGEVITY_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY187_LONGEVITY_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy188LongevityDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_188_LONGEVITY_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY188_LONGEVITY_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy189LongevityTotalHrsPr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_189_LONGEVITY_TOTAL_HRS_PR: fieldBuilder.buildEdmTypeField('YY189_LONGEVITY_TOTAL_HRS_PR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy190LongevityTotalDaysP} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_190_LONGEVITY_TOTAL_DAYS_P: fieldBuilder.buildEdmTypeField('YY190_LONGEVITY_TOTAL_DAYS_P', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy191OncallDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_191_ONCALL_DAYS: fieldBuilder.buildEdmTypeField('YY191_ONCALL_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy192OncallHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_192_ONCALL_HRS: fieldBuilder.buildEdmTypeField('YY192_ONCALL_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy193OncallHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_193_ONCALL_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY193_ONCALL_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy194OncallDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_194_ONCALL_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY194_ONCALL_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy195OncallTotalHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_195_ONCALL_TOTAL_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY195_ONCALL_TOTAL_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy196OncallTotalDaysPric} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_196_ONCALL_TOTAL_DAYS_PRIC: fieldBuilder.buildEdmTypeField('YY196_ONCALL_TOTAL_DAYS_PRIC', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy197RetroDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_197_RETRO_DAYS: fieldBuilder.buildEdmTypeField('YY197_RETRO_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy198RetroHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_198_RETRO_HRS: fieldBuilder.buildEdmTypeField('YY198_RETRO_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy199RetroDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_199_RETRO_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY199_RETRO_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy200RetroHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_200_RETRO_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY200_RETRO_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy201RetroTotalHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_201_RETRO_TOTAL_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY201_RETRO_TOTAL_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy202RetroTotalDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_202_RETRO_TOTAL_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY202_RETRO_TOTAL_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy203Salary} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_203_SALARY: fieldBuilder.buildEdmTypeField('YY203_SALARY', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy204SevPayDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_204_SEV_PAY_DAYS: fieldBuilder.buildEdmTypeField('YY204_SEV_PAY_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy205SevPayHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_205_SEV_PAY_HRS: fieldBuilder.buildEdmTypeField('YY205_SEV_PAY_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy206SevPayHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_206_SEV_PAY_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY206_SEV_PAY_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy207SevPayDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_207_SEV_PAY_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY207_SEV_PAY_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy208SevPayTotalHrsPric} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_208_SEV_PAY_TOTAL_HRS_PRIC: fieldBuilder.buildEdmTypeField('YY208_SEV_PAY_TOTAL_HRS_PRIC', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy209SevPayTotalDaysPri} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_209_SEV_PAY_TOTAL_DAYS_PRI: fieldBuilder.buildEdmTypeField('YY209_SEV_PAY_TOTAL_DAYS_PRI', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy210VacBillDays} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_210_VAC_BILL_DAYS: fieldBuilder.buildEdmTypeField('YY210_VAC_BILL_DAYS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy211VacBillHrs} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_211_VAC_BILL_HRS: fieldBuilder.buildEdmTypeField('YY211_VAC_BILL_HRS', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy212VacBillHrsPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_212_VAC_BILL_HRS_PRICE: fieldBuilder.buildEdmTypeField('YY212_VAC_BILL_HRS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy213VacBillDaysPrice} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_213_VAC_BILL_DAYS_PRICE: fieldBuilder.buildEdmTypeField('YY213_VAC_BILL_DAYS_PRICE', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy214VacBillTotalHrsPri} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_214_VAC_BILL_TOTAL_HRS_PRI: fieldBuilder.buildEdmTypeField('YY214_VAC_BILL_TOTAL_HRS_PRI', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy215VacBillTotalDaysPr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_215_VAC_BILL_TOTAL_DAYS_PR: fieldBuilder.buildEdmTypeField('YY215_VAC_BILL_TOTAL_DAYS_PR', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link yy216CustBusinessUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_216_CUST_BUSINESS_UNIT: fieldBuilder.buildEdmTypeField('YY216_CUST_BUSINESS_UNIT', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy217CustChargeNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_217_CUST_CHARGE_NUMBER: fieldBuilder.buildEdmTypeField('YY217_CUST_CHARGE_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy218CustProjectNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_218_CUST_PROJECT_NUMBER: fieldBuilder.buildEdmTypeField('YY218_CUST_PROJECT_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy219CustCostCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_219_CUST_COST_CENTER: fieldBuilder.buildEdmTypeField('YY219_CUST_COST_CENTER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy220CustCompanyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_220_CUST_COMPANY_CODE: fieldBuilder.buildEdmTypeField('YY220_CUST_COMPANY_CODE', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy221CustDeptNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_221_CUST_DEPT_NUMBER: fieldBuilder.buildEdmTypeField('YY221_CUST_DEPT_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy222CustDotsNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_222_CUST_DOTS_NUMBER: fieldBuilder.buildEdmTypeField('YY222_CUST_DOTS_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy223CustRui} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_223_CUST_RUI: fieldBuilder.buildEdmTypeField('YY223_CUST_RUI', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy224CustAcctNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_224_CUST_ACCT_NUMBER: fieldBuilder.buildEdmTypeField('YY224_CUST_ACCT_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy225CustBudgetCenter} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_225_CUST_BUDGET_CENTER: fieldBuilder.buildEdmTypeField('YY225_CUST_BUDGET_CENTER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy226CustConNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_226_CUST_CON_NUMBER: fieldBuilder.buildEdmTypeField('YY226_CUST_CON_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy227CustVendorNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_227_CUST_VENDOR_NUMBER: fieldBuilder.buildEdmTypeField('YY227_CUST_VENDOR_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy228CustOrgCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_228_CUST_ORG_CODE: fieldBuilder.buildEdmTypeField('YY228_CUST_ORG_CODE', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy229CustLegalEntity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_229_CUST_LEGAL_ENTITY: fieldBuilder.buildEdmTypeField('YY229_CUST_LEGAL_ENTITY', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy230CustOracleNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_230_CUST_ORACLE_NUMBER: fieldBuilder.buildEdmTypeField('YY230_CUST_ORACLE_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy231CustUnitStoreNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_231_CUST_UNIT_STORE_NUMBER: fieldBuilder.buildEdmTypeField('YY231_CUST_UNIT_STORE_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy232CustSvcDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_232_CUST_SVC_DATE: fieldBuilder.buildEdmTypeField('YY232_CUST_SVC_DATE', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link yy233CustEmployeeNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_233_CUST_EMPLOYEE_NUMBER: fieldBuilder.buildEdmTypeField('YY233_CUST_EMPLOYEE_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy234CustAgreeNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_234_CUST_AGREE_NUMBER: fieldBuilder.buildEdmTypeField('YY234_CUST_AGREE_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy235CustTask15} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_235_CUST_TASK_15: fieldBuilder.buildEdmTypeField('YY235_CUST_TASK15', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy236CustFepsCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_236_CUST_FEPS_CODE: fieldBuilder.buildEdmTypeField('YY236_CUST_FEPS_CODE', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy237CustPosition} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_237_CUST_POSITION: fieldBuilder.buildEdmTypeField('YY237_CUST_POSITION', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy238CustGlCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_238_CUST_GL_CODE: fieldBuilder.buildEdmTypeField('YY238_CUST_GL_CODE', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy239CustPurchaseAgree} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_239_CUST_PURCHASE_AGREE: fieldBuilder.buildEdmTypeField('YY239_CUST_PURCHASE_AGREE', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy240CustBbNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_240_CUST_BB_NUMBER: fieldBuilder.buildEdmTypeField('YY240_CUST_BB_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy241CustBgrdCheckDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_241_CUST_BGRD_CHECK_DATE: fieldBuilder.buildEdmTypeField('YY241_CUST_BGRD_CHECK_DATE', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link yy242CustDivUnitNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_242_CUST_DIV_UNIT_NUMBER: fieldBuilder.buildEdmTypeField('YY242_CUST_DIV_UNIT_NUMBER', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy243CustPositionCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_243_CUST_POSITION_CODE: fieldBuilder.buildEdmTypeField('YY243_CUST_POSITION_CODE', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy244ItemCategory} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_244_ITEM_CATEGORY: fieldBuilder.buildEdmTypeField('YY244_ITEM_CATEGORY', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy245ZsdWnInvoiceVbap} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_245_ZSD_WN_INVOICE_VBAP: fieldBuilder.buildEdmTypeField('YY245_ZSD_WN_INVOICE_VBAP', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy246ZsdWnInvoiceVcsd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_246_ZSD_WN_INVOICE_VCSD: fieldBuilder.buildEdmTypeField('YY246_ZSD_WN_INVOICE_VCSD', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy247ZsdWnWorkOrderVcsd} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_247_ZSD_WN_WORK_ORDER_VCSD: fieldBuilder.buildEdmTypeField('YY247_ZSD_WN_WORK_ORDER_VCSD', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy248ZsdWnWorkOrderVbap} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_248_ZSD_WN_WORK_ORDER_VBAP: fieldBuilder.buildEdmTypeField('YY248_ZSD_WN_WORK_ORDER_VBAP', 'Edm.String', true),
                /**
                 * Static representation of the {@link yy249CustCostCenter2Vbap} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                YY_249_CUST_COST_CENTER_2_VBAP: fieldBuilder.buildEdmTypeField('YY249_CUST_COST_CENTER2_VBAP', 'Edm.String', true),
                /**
                 * Static representation of the {@link field124} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIELD_124: fieldBuilder.buildEdmTypeField('Field124', 'Edm.String', true),
                /**
                 * Static representation of the {@link field125} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIELD_125: fieldBuilder.buildEdmTypeField('Field125', 'Edm.String', true),
                /**
                 * Static representation of the {@link field126} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIELD_126: fieldBuilder.buildEdmTypeField('Field126', 'Edm.String', true),
                /**
                 * Static representation of the {@link field127} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIELD_127: fieldBuilder.buildEdmTypeField('Field127', 'Edm.String', true),
                /**
                 * Static representation of the {@link field128} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIELD_128: fieldBuilder.buildEdmTypeField('Field128', 'Edm.String', true),
                /**
                 * Static representation of the {@link field129} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FIELD_129: fieldBuilder.buildEdmTypeField('Field129', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', Yy1_Salesvcdata_2_1.Yy1_Salesvcdata_2)
            };
        }
        return this._schema;
    }
}
exports.Yy1_Salesvcdata_2Api = Yy1_Salesvcdata_2Api;
//# sourceMappingURL=Yy1_Salesvcdata_2Api.js.map