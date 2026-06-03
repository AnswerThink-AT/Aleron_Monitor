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
import type { Yy1_Salesvcdata_1Api } from './Yy1_Salesvcdata_1Api';

/**
 * This class represents the entity "YY1_SALESVCDATA_1" of service "YY1_SALESVCDATA_1_CDS".
 */
export class Yy1_Salesvcdata_1<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements Yy1_Salesvcdata_1Type<T>
{
  /**
   * Technical entity name for Yy1_Salesvcdata_1.
   */
  static override _entityName = 'YY1_SALESVCDATA_1';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/YY1_SALESVCDATA_1_CDS';
  /**
   * All key fields of the Yy1_Salesvcdata_1 entity.
   */
  static _keys = ['SAP_UUID'];
  /**
   * 16 Byte UUID in 16 Bytes (Raw Format).
   */
  declare sapUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Sales Order Number.
   * Maximum length: 20.
   * @nullable
   */
  declare salesOrderNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Sales Order Item Num.
   * Maximum length: 20.
   * @nullable
   */
  declare salesOrderItemNum?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Billing  Document Number.
   * @nullable
   */
  declare billingDocumentNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Billing Document Item Number.
   * @nullable
   */
  declare billingDocumentItemNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Custom Sales Order Type.
   * Maximum length: 4.
   * @nullable
   */
  declare customSalesOrderType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Custom Billing type.
   * Maximum length: 4.
   * @nullable
   */
  declare customBillingType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Customer condition group 2.
   * Maximum length: 2.
   * @nullable
   */
  declare yy1AcaRgOnly?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * ACA Hours.
   * @nullable
   */
  declare yy2AcaHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * ACA Hours Price.
   * @nullable
   */
  declare yy3AcaHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * ACA Total Hours Price.
   * @nullable
   */
  declare yy4AcaTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Line Item Number.
   * @nullable
   */
  declare yy5LineItemNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Cust PO Line Item Number.
   * Maximum length: 30.
   * @nullable
   */
  declare yy6ScLineItemNumber?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * INVISIBLE.
   * Maximum length: 30.
   * @nullable
   */
  declare yy7Invisible?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * DATE.
   * @nullable
   */
  declare yy8WeekEnding2?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Week End VBAP.
   * @nullable
   */
  declare yy9ZzweekEndVbap?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Employee Type.
   * Maximum length: 3.
   * @nullable
   */
  declare yy10EmployeeType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Eight Day Week.
   * Maximum length: 1.
   * @nullable
   */
  declare yy11EightDayWeek?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Day 1 Shift 1 RG.
   * @nullable
   */
  declare yy12Day1Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 1 Shift 1 Overtime.
   * @nullable
   */
  declare yy13Day1Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 1 Shift 1 DoubleTime.
   * @nullable
   */
  declare yy14Day1Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 1 Shift 2 RG.
   * @nullable
   */
  declare yy15Day1Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 1 Shift 2 Overtime.
   * @nullable
   */
  declare yy16Day1Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 1 Shift 2 DoubleTime.
   * @nullable
   */
  declare yy17Day1Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 1 Shift 3 RG.
   * @nullable
   */
  declare yy18Day1Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 1 Shift 3 Overtime.
   * @nullable
   */
  declare yy19Day1Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 1 Shift 3 DoubleTime.
   * @nullable
   */
  declare yy20Day1Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day One.
   * @nullable
   */
  declare yy21DayOne?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Daily: Enter 1 if Day 1 Worked.
   * @nullable
   */
  declare yy22DayOneWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 1 RG.
   * @nullable
   */
  declare yy23Day2Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 1 Overtime.
   * @nullable
   */
  declare yy24Day2Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 1 DoubleTime.
   * @nullable
   */
  declare yy25Day2Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 2 RG.
   * @nullable
   */
  declare yy26Day2Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 2 Overtime.
   * @nullable
   */
  declare yy27Day2Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 2 DoubleTime.
   * @nullable
   */
  declare yy28Day2Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 3 RG.
   * @nullable
   */
  declare yy29Day2Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 3 Overtime.
   * @nullable
   */
  declare yy30Day2Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 2 Shift 3 DoubleTime.
   * @nullable
   */
  declare yy31Day2Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day Two.
   * @nullable
   */
  declare yy32DayTwo?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Daily: Enter 1 if Day 2 Worked.
   * @nullable
   */
  declare yy33DayTwoWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 1 RG.
   * @nullable
   */
  declare yy34Day3Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 1 Overtime.
   * @nullable
   */
  declare yy35Day3Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 1 DoubleTime.
   * @nullable
   */
  declare yy36Day3Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 2 RG.
   * @nullable
   */
  declare yy37Day3Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 2 Overtime.
   * @nullable
   */
  declare yy38Day3Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 2 DoubleTime.
   * @nullable
   */
  declare yy39Day3Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 3 RG.
   * @nullable
   */
  declare yy40Day3Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 3 Overtime.
   * @nullable
   */
  declare yy41Day3Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 3 Shift 3 DoubleTime.
   * @nullable
   */
  declare yy42Day3Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day Three.
   * @nullable
   */
  declare yy43DayThree?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Daily: Enter 1 if Day 3 Worked.
   * @nullable
   */
  declare yy44DayThreeWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 1 RG.
   * @nullable
   */
  declare yy45Day4Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 1 Overtime.
   * @nullable
   */
  declare yy46Day4Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 1 DoubleTime.
   * @nullable
   */
  declare yy47Day4Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 2 RG.
   * @nullable
   */
  declare yy48Day4Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 2 OT.
   * @nullable
   */
  declare yy49Day4Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 2 DoubleTime.
   * @nullable
   */
  declare yy50Day4Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 3 RG.
   * @nullable
   */
  declare yy51Day4Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 3 Overtime.
   * @nullable
   */
  declare yy52Day4Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 4 Shift 3 DoubleTime.
   * @nullable
   */
  declare yy53Day4Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day Four.
   * @nullable
   */
  declare yy54DayFour?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Daily: Enter 1 if Day 4 Worked.
   * @nullable
   */
  declare yy55DayFourWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 1 RG.
   * @nullable
   */
  declare yy56Day5Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 1 Overtime.
   * @nullable
   */
  declare yy57Day5Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 1 DoubleTime.
   * @nullable
   */
  declare yy58Day5Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 2 RG.
   * @nullable
   */
  declare yy59Day5Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 2 Overtime.
   * @nullable
   */
  declare yy60Day5Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 2 DoubleTime.
   * @nullable
   */
  declare yy61Day5Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 3 RG.
   * @nullable
   */
  declare yy62Day5Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 3 Overtime.
   * @nullable
   */
  declare yy63Day5Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 5 Shift 3 DoubleTime.
   * @nullable
   */
  declare yy64Day5Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day Five.
   * @nullable
   */
  declare yy65DayFive?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Daily: Enter 1 if Day 5 Worked.
   * @nullable
   */
  declare yy66DayFiveWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 1 RG.
   * @nullable
   */
  declare yy67Day6Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 1 Overtime.
   * @nullable
   */
  declare yy68Day6Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 1 DoubleTime.
   * @nullable
   */
  declare yy69Day6Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 2 RG.
   * @nullable
   */
  declare yy70Day6Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 2 Overtime.
   * @nullable
   */
  declare yy71Day6Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 2 DoubleTime.
   * @nullable
   */
  declare yy72Day6Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 3 RG.
   * @nullable
   */
  declare yy73Day6Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 3 Overtime.
   * @nullable
   */
  declare yy74Day6Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 6 Shift 3 DoubleTime.
   * @nullable
   */
  declare yy75Day6Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day Six.
   * @nullable
   */
  declare yy76DaySix?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Daily: Enter 1 if Day 6 Worked.
   * @nullable
   */
  declare yy77DaySixWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 1 RG.
   * @nullable
   */
  declare yy78Day7Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 1 Overtime.
   * @nullable
   */
  declare yy79Day7Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 1 DoubleTime.
   * @nullable
   */
  declare yy80Day7Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 2 RG.
   * @nullable
   */
  declare yy81Day7Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 2 Overtime.
   * @nullable
   */
  declare yy82Day7Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 2 DoubleTime.
   * @nullable
   */
  declare yy83Day7Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 3 RG.
   * @nullable
   */
  declare yy84Day7Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 3 Overtime.
   * @nullable
   */
  declare yy85Day7Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 7 Shift 3 DoubleTime.
   * @nullable
   */
  declare yy86Day7Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day Seven.
   * @nullable
   */
  declare yy87DaySeven?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Daily: Enter 1 if Day 7 Worked.
   * @nullable
   */
  declare yy88DaySevenWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 1 RG.
   * @nullable
   */
  declare yy89Day8Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 1 Overtime.
   * @nullable
   */
  declare yy90Day8Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 1 DoubleTime.
   * @nullable
   */
  declare yy91Day8Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 2 RG.
   * @nullable
   */
  declare yy92Day8Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 2 Overtime.
   * @nullable
   */
  declare yy93Day8Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 2 DoubleTime.
   * @nullable
   */
  declare yy94Day8Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 3 Regular Time.
   * @nullable
   */
  declare yy95Day8Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 3 Overtime.
   * @nullable
   */
  declare yy96Day8Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day 8 Shift 3 DoubleTime.
   * @nullable
   */
  declare yy97Day8Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Day Eight.
   * @nullable
   */
  declare yy98DayEight?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Daily: Enter 1 if Day 8 Worked.
   * @nullable
   */
  declare yy99DayEightWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Total Hours RG.
   * @nullable
   */
  declare yy100Shift1TotalHrsRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Total Hours OT.
   * @nullable
   */
  declare yy101Shift1TotalHrsOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Total Hours DB.
   * @nullable
   */
  declare yy102Shift1TotalHrsDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Total Hours RG.
   * @nullable
   */
  declare yy103Shift2TotalHrsRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Total Hours OT.
   * @nullable
   */
  declare yy104Shift2TotalHrsOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Total Hours DB.
   * @nullable
   */
  declare yy105Shift2TotalHrsDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Total Hours RG.
   * @nullable
   */
  declare yy106Shift3TotalHrsRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Total Hours OT.
   * @nullable
   */
  declare yy107Shift3TotalHrsOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Total Hours DB.
   * @nullable
   */
  declare yy108Shift3TotalHrsDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Price RG.
   * @nullable
   */
  declare yy109Shift1PriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Price OT.
   * @nullable
   */
  declare yy110Shift1PriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Price DB.
   * @nullable
   */
  declare yy111Shift1PriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Price RG.
   * @nullable
   */
  declare yy112Shift2PriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Price OT.
   * @nullable
   */
  declare yy113Shift2PriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Price DB.
   * @nullable
   */
  declare yy114Shift2PriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Price RG.
   * @nullable
   */
  declare yy115Shift3PriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Price OT.
   * @nullable
   */
  declare yy116Shift3PriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Price DB.
   * @nullable
   */
  declare yy117Shift3PriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Straight time Mark Up %.
   * @nullable
   */
  declare yy118MarkUpRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Overtime Mark Up %.
   * @nullable
   */
  declare yy119MarkUpOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Double Time Mark Up %.
   * @nullable
   */
  declare yy120MarkUpDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Total Price RG.
   * @nullable
   */
  declare yy121Shift1TotalPriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Total Price OT.
   * @nullable
   */
  declare yy122Shift1TotalPriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 1 Total Price DB.
   * @nullable
   */
  declare yy123Shift1TotalPriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Total Price RG.
   * @nullable
   */
  declare yy124Shift2TotalPriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Total Price OT.
   * @nullable
   */
  declare yy125Shift2TotalPriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 2 Total Price DB.
   * @nullable
   */
  declare yy126Shift2TotalPriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Total Pay RG.
   * @nullable
   */
  declare yy127Shift3TotalPayRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Total Pay OT.
   * @nullable
   */
  declare yy128Shift3TotalPayOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Shift 3 Total Pay DB.
   * @nullable
   */
  declare yy129Shift3TotalPayDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * MS Admin Fee.
   * @nullable
   */
  declare yy130AdminFeePrice?: DeserializedType<T, 'Edm.Decimal'> | null;

  constructor(_entityApi: Yy1_Salesvcdata_1Api<T>) {
    super(_entityApi);
  }
}

export interface Yy1_Salesvcdata_1Type<
  T extends DeSerializers = DefaultDeSerializers
> {
  sapUuid: DeserializedType<T, 'Edm.Guid'>;
  salesOrderNumber?: DeserializedType<T, 'Edm.String'> | null;
  salesOrderItemNum?: DeserializedType<T, 'Edm.String'> | null;
  billingDocumentNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  billingDocumentItemNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  customSalesOrderType?: DeserializedType<T, 'Edm.String'> | null;
  customBillingType?: DeserializedType<T, 'Edm.String'> | null;
  yy1AcaRgOnly?: DeserializedType<T, 'Edm.String'> | null;
  yy2AcaHrs?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy3AcaHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy4AcaTotalHrsPrice?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy5LineItemNumber?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy6ScLineItemNumber?: DeserializedType<T, 'Edm.String'> | null;
  yy7Invisible?: DeserializedType<T, 'Edm.String'> | null;
  yy8WeekEnding2?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy9ZzweekEndVbap?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy10EmployeeType?: DeserializedType<T, 'Edm.String'> | null;
  yy11EightDayWeek?: DeserializedType<T, 'Edm.String'> | null;
  yy12Day1Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy13Day1Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy14Day1Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy15Day1Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy16Day1Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy17Day1Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy18Day1Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy19Day1Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy20Day1Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy21DayOne?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy22DayOneWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy23Day2Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy24Day2Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy25Day2Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy26Day2Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy27Day2Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy28Day2Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy29Day2Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy30Day2Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy31Day2Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy32DayTwo?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy33DayTwoWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy34Day3Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy35Day3Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy36Day3Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy37Day3Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy38Day3Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy39Day3Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy40Day3Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy41Day3Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy42Day3Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy43DayThree?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy44DayThreeWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy45Day4Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy46Day4Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy47Day4Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy48Day4Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy49Day4Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy50Day4Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy51Day4Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy52Day4Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy53Day4Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy54DayFour?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy55DayFourWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy56Day5Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy57Day5Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy58Day5Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy59Day5Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy60Day5Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy61Day5Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy62Day5Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy63Day5Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy64Day5Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy65DayFive?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy66DayFiveWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy67Day6Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy68Day6Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy69Day6Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy70Day6Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy71Day6Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy72Day6Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy73Day6Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy74Day6Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy75Day6Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy76DaySix?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy77DaySixWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy78Day7Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy79Day7Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy80Day7Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy81Day7Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy82Day7Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy83Day7Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy84Day7Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy85Day7Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy86Day7Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy87DaySeven?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy88DaySevenWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy89Day8Shift1Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy90Day8Shift1Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy91Day8Shift1Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy92Day8Shift2Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy93Day8Shift2Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy94Day8Shift2Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy95Day8Shift3Rg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy96Day8Shift3Ot?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy97Day8Shift3Db?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy98DayEight?: DeserializedType<T, 'Edm.DateTime'> | null;
  yy99DayEightWorked?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy100Shift1TotalHrsRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy101Shift1TotalHrsOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy102Shift1TotalHrsDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy103Shift2TotalHrsRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy104Shift2TotalHrsOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy105Shift2TotalHrsDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy106Shift3TotalHrsRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy107Shift3TotalHrsOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy108Shift3TotalHrsDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy109Shift1PriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy110Shift1PriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy111Shift1PriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy112Shift2PriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy113Shift2PriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy114Shift2PriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy115Shift3PriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy116Shift3PriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy117Shift3PriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy118MarkUpRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy119MarkUpOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy120MarkUpDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy121Shift1TotalPriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy122Shift1TotalPriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy123Shift1TotalPriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy124Shift2TotalPriceRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy125Shift2TotalPriceOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy126Shift2TotalPriceDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy127Shift3TotalPayRg?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy128Shift3TotalPayOt?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy129Shift3TotalPayDb?: DeserializedType<T, 'Edm.Decimal'> | null;
  yy130AdminFeePrice?: DeserializedType<T, 'Edm.Decimal'> | null;
}
