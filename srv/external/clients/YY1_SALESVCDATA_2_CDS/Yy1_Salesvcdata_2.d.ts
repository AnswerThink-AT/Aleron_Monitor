/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v2';
import type { Yy1_Salesvcdata_2Api } from './Yy1_Salesvcdata_2Api';
/**
 * This class represents the entity "YY1_SALESVCDATA_2" of service "YY1_SALESVCDATA_2_CDS".
 */
export declare class Yy1_Salesvcdata_2<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements Yy1_Salesvcdata_2Type<T>
{
  /**
   * Technical entity name for Yy1_Salesvcdata_2.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the Yy1_Salesvcdata_2 entity.
   */
  static _keys: string[];
  /**
   * 16 Byte UUID in 16 Bytes (Raw Format).
   */
  sapUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Sales Order Number.
   * @nullable
   */
  salesOrderNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Sales Order Item Num.
   * @nullable
   */
  salesOrderItemNum?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Billing  Document Number.
   * @nullable
   */
  billingDocumentNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Billing Document Item Number.
   * @nullable
   */
  billingDocumentItemNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Distribution Channel.
   * Maximum length: 2.
   * @nullable
   */
  yy131Dc?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * H&W Vendor Pay Rate.
   * @nullable
   */
  yy132HwPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * H&W Total Pay Vendor.
   * @nullable
   */
  yy133HwTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Daily Vendor Pay Amount.
   * @nullable
   */
  yy134DailyPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Daily Total Pay Vendor.
   * @nullable
   */
  yy135DailyTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Vendor Pay Rate.
   * @nullable
   */
  yy136HolidayPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Total Pay Vendor.
   * @nullable
   */
  yy137HolidayTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Oncall Vendor Pay Rate.
   * @nullable
   */
  yy138OncallPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Oncall Total Pay Vendor.
   * @nullable
   */
  yy139OncallTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Vacation Vendor Pay Rate.
   * @nullable
   */
  yy140VacationPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Vacation Total Pay Vendor.
   * @nullable
   */
  yy141VacationTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Salary Vendor Pay Amount.
   * @nullable
   */
  yy142SalaryPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Direct Placement Fee.
   * @nullable
   */
  yy143DirectPlacement?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Weekly Clock Fee.
   * @nullable
   */
  yy144WeeklyClockFee?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Per Diem Days.
   * @nullable
   */
  yy145PerDiemDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Per Diem Tax  Price Per Day.
   * @nullable
   */
  yy146PerDiemTaxPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Per Diem No Tax  Price Per Day.
   * @nullable
   */
  yy147PerDiemNotaxPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Per Diem Taxable Total.
   * @nullable
   */
  yy148PerDiemTax?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Per Diem No Tax Total.
   * @nullable
   */
  yy149PerDiemNoTax?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Daily Pay Days.
   * @nullable
   */
  yy150DailyPayDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Daily Pay Rate Per Day.
   * @nullable
   */
  yy151DailyPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Daily.
   * @nullable
   */
  yy152DailyTotalRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Sick Days.
   * @nullable
   */
  yy153SickDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Sick Days Price.
   * @nullable
   */
  yy154SickDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Sick Days Total Price.
   * @nullable
   */
  yy155SickTotalDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Sick Hours.
   * @nullable
   */
  yy156SickHours?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Sick Hours Price.
   * @nullable
   */
  yy157SickHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Sick Hours Total Price.
   * @nullable
   */
  yy158SickTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Miscellaneous Amount.
   * @nullable
   */
  yy159Misc?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Bereavement Days.
   * @nullable
   */
  yy160BereavDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Bereavement Hours.
   * @nullable
   */
  yy161BereavHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Bereavement Hourly Rate.
   * @nullable
   */
  yy162BereavHrsRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Bereavement Daily Rate.
   * @nullable
   */
  yy163BereavDaysRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Bereavement Hours Total Price.
   * @nullable
   */
  yy164BereavTotalHrsRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Bereavement Day Total Price.
   * @nullable
   */
  yy165BereavTotalDaysRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Bonus.
   * @nullable
   */
  yy166BonusPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Bonus Vendor Pay Amount.
   * @nullable
   */
  yy167BonusPayRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Commission.
   * @nullable
   */
  yy168CommissionPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Days.
   * @nullable
   */
  yy169HolDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Hours.
   * @nullable
   */
  yy170HolHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Hourly Rate.
   * @nullable
   */
  yy171HolHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Daily Rate.
   * @nullable
   */
  yy172HolDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Hourly Total Price.
   * @nullable
   */
  yy173HolTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Daily Total Price.
   * @nullable
   */
  yy174HolTotalDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Holiday Date.
   * @nullable
   */
  yy175HolidayDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * H&W Hours.
   * @nullable
   */
  yy176HwHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * H&W Rate.
   * @nullable
   */
  yy177HwHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * HW.
   * @nullable
   */
  yy178HwTotalPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Jury Duty Days.
   * @nullable
   */
  yy179JuryDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Jury Duty Hours.
   * @nullable
   */
  yy180JuryHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Jury Duty HRs Rate.
   * @nullable
   */
  yy181JuryHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Jury Duty Daily Rate.
   * @nullable
   */
  yy182JuryDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Jury Duty Total HRs.
   * @nullable
   */
  yy183JuryTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Jury Duty Total Days.
   * @nullable
   */
  yy184JuryTotalDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Longevity Days.
   * @nullable
   */
  yy185LongevityDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Longevity Hours.
   * @nullable
   */
  yy186LongevityHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Longevity Hours Price.
   * @nullable
   */
  yy187LongevityHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Longevity Days Price.
   * @nullable
   */
  yy188LongevityDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Longevity Total HRs Price.
   * @nullable
   */
  yy189LongevityTotalHrsPr?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Longevity Total Days Price.
   * @nullable
   */
  yy190LongevityTotalDaysP?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Oncall Days.
   * @nullable
   */
  yy191OncallDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Oncall Hours.
   * @nullable
   */
  yy192OncallHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Oncall Hours Price.
   * @nullable
   */
  yy193OncallHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Oncall Days Price.
   * @nullable
   */
  yy194OncallDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Oncall Total HRs Price.
   * @nullable
   */
  yy195OncallTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Oncall Total Days Price.
   * @nullable
   */
  yy196OncallTotalDaysPric?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Retro Days.
   * @nullable
   */
  yy197RetroDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Retro Hours.
   * @nullable
   */
  yy198RetroHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Retro Days Price.
   * @nullable
   */
  yy199RetroDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Retro Hours Price.
   * @nullable
   */
  yy200RetroHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Retro Total HRs Price.
   * @nullable
   */
  yy201RetroTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Retro Total Days Price.
   * @nullable
   */
  yy202RetroTotalDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Salary.
   * @nullable
   */
  yy203Salary?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Severance Pay Days.
   * @nullable
   */
  yy204SevPayDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Severance Pay Hours.
   * @nullable
   */
  yy205SevPayHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Severance Pay HRs Price.
   * @nullable
   */
  yy206SevPayHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Severance Pay Days Price.
   * @nullable
   */
  yy207SevPayDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Severance Pay Total HRs Price.
   * @nullable
   */
  yy208SevPayTotalHrsPric?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Severance Pay Total Days Price.
   * @nullable
   */
  yy209SevPayTotalDaysPri?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Vacation Billable Days.
   * @nullable
   */
  yy210VacBillDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Vacation Billable Hours.
   * @nullable
   */
  yy211VacBillHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Vacation Billable Hrs Price.
   * @nullable
   */
  yy212VacBillHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Vacation  Billable Days Price.
   * @nullable
   */
  yy213VacBillDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Vac. Billable Tot Hrs Price.
   * @nullable
   */
  yy214VacBillTotalHrsPri?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Vac Billable Tot Days Price.
   * @nullable
   */
  yy215VacBillTotalDaysPr?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy216CustBusinessUnit?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy217CustChargeNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy218CustProjectNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy219CustCostCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy220CustCompanyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy221CustDeptNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy222CustDotsNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy223CustRui?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy224CustAcctNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy225CustBudgetCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy226CustConNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy227CustVendorNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy228CustOrgCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy229CustLegalEntity?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy230CustOracleNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy231CustUnitStoreNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Service Date - FOR SDI IBM.
   * @nullable
   */
  yy232CustSvcDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy233CustEmployeeNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy234CustAgreeNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy235CustTask15?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy236CustFepsCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy237CustPosition?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy238CustGlCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy239CustPurchaseAgree?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy240CustBbNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer Background Check Date.
   * @nullable
   */
  yy241CustBgrdCheckDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy242CustDivUnitNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy243CustPositionCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 4.
   * Maximum length: 4.
   * @nullable
   */
  yy244ItemCategory?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy245ZsdWnInvoiceVbap?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy246ZsdWnInvoiceVcsd?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 10.
   * Maximum length: 10.
   * @nullable
   */
  yy247ZsdWnWorkOrderVcsd?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 10.
   * Maximum length: 10.
   * @nullable
   */
  yy248ZsdWnWorkOrderVbap?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 30.
   * Maximum length: 30.
   * @nullable
   */
  yy249CustCostCenter2Vbap?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 20.
   * Maximum length: 20.
   * @nullable
   */
  field124?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 20.
   * Maximum length: 20.
   * @nullable
   */
  field125?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 20.
   * Maximum length: 20.
   * @nullable
   */
  field126?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 20.
   * Maximum length: 20.
   * @nullable
   */
  field127?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 20.
   * Maximum length: 20.
   * @nullable
   */
  field128?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Text of length 20.
   * Maximum length: 20.
   * @nullable
   */
  field129?: DeserializedType<T, 'Edm.String'> | null;
  constructor(_entityApi: Yy1_Salesvcdata_2Api<T>);
}
export interface Yy1_Salesvcdata_2Type<
  T extends DeSerializers = DefaultDeSerializers
> {
  sapUuid: DeserializedType<T, 'Edm.Guid'>;
  salesOrderNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  salesOrderItemNum?: DeserializedType<T, 'Edm.Decimal'> | null;
  billingDocumentNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  billingDocumentItemNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy131Dc?: DeserializedType<T, 'Edm.String'> | null;
  yy132HwPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy133HwTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy134DailyPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy135DailyTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy136HolidayPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy137HolidayTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy138OncallPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy139OncallTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy140VacationPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy141VacationTotalVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy142SalaryPayVendor?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy143DirectPlacement?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy144WeeklyClockFee?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy145PerDiemDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy146PerDiemTaxPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy147PerDiemNotaxPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy148PerDiemTax?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy149PerDiemNoTax?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy150DailyPayDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy151DailyPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy152DailyTotalRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy153SickDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy154SickDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy155SickTotalDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy156SickHours?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy157SickHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy158SickTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy159Misc?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy160BereavDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy161BereavHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy162BereavHrsRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy163BereavDaysRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy164BereavTotalHrsRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy165BereavTotalDaysRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy166BonusPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy167BonusPayRate?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy168CommissionPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy169HolDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy170HolHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy171HolHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy172HolDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy173HolTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy174HolTotalDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy175HolidayDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy176HwHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy177HwHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy178HwTotalPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy179JuryDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy180JuryHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy181JuryHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy182JuryDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy183JuryTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy184JuryTotalDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy185LongevityDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy186LongevityHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy187LongevityHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy188LongevityDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy189LongevityTotalHrsPr?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy190LongevityTotalDaysP?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy191OncallDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy192OncallHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy193OncallHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy194OncallDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy195OncallTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy196OncallTotalDaysPric?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy197RetroDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy198RetroHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy199RetroDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy200RetroHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy201RetroTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy202RetroTotalDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy203Salary?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy204SevPayDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy205SevPayHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy206SevPayHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy207SevPayDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy208SevPayTotalHrsPric?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy209SevPayTotalDaysPri?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy210VacBillDays?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy211VacBillHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy212VacBillHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy213VacBillDaysPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy214VacBillTotalHrsPri?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy215VacBillTotalDaysPr?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy216CustBusinessUnit?: DeserializedType<T, 'Edm.String'> | null;
  yy217CustChargeNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy218CustProjectNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy219CustCostCenter?: DeserializedType<T, 'Edm.String'> | null;
  yy220CustCompanyCode?: DeserializedType<T, 'Edm.String'> | null;
  yy221CustDeptNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy222CustDotsNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy223CustRui?: DeserializedType<T, 'Edm.String'> | null;
  yy224CustAcctNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy225CustBudgetCenter?: DeserializedType<T, 'Edm.String'> | null;
  yy226CustConNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy227CustVendorNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy228CustOrgCode?: DeserializedType<T, 'Edm.String'> | null;
  yy229CustLegalEntity?: DeserializedType<T, 'Edm.String'> | null;
  yy230CustOracleNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy231CustUnitStoreNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy232CustSvcDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy233CustEmployeeNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy234CustAgreeNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy235CustTask15?: DeserializedType<T, 'Edm.String'> | null;
  yy236CustFepsCode?: DeserializedType<T, 'Edm.String'> | null;
  yy237CustPosition?: DeserializedType<T, 'Edm.String'> | null;
  yy238CustGlCode?: DeserializedType<T, 'Edm.String'> | null;
  yy239CustPurchaseAgree?: DeserializedType<T, 'Edm.String'> | null;
  yy240CustBbNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy241CustBgrdCheckDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy242CustDivUnitNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy243CustPositionCode?: DeserializedType<T, 'Edm.String'> | null;
  yy244ItemCategory?: DeserializedType<T, 'Edm.String'> | null;
  yy245ZsdWnInvoiceVbap?: DeserializedType<T, 'Edm.String'> | null;
  yy246ZsdWnInvoiceVcsd?: DeserializedType<T, 'Edm.String'> | null;
  yy247ZsdWnWorkOrderVcsd?: DeserializedType<T, 'Edm.String'> | null;
  yy248ZsdWnWorkOrderVbap?: DeserializedType<T, 'Edm.String'> | null;
  yy249CustCostCenter2Vbap?: DeserializedType<T, 'Edm.String'> | null;
  field124?: DeserializedType<T, 'Edm.String'> | null;
  field125?: DeserializedType<T, 'Edm.String'> | null;
  field126?: DeserializedType<T, 'Edm.String'> | null;
  field127?: DeserializedType<T, 'Edm.String'> | null;
  field128?: DeserializedType<T, 'Edm.String'> | null;
  field129?: DeserializedType<T, 'Edm.String'> | null;
}
