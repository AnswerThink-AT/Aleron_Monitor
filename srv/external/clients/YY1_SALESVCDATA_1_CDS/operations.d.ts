/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { Yy1_Salesvcdata_1 } from './Yy1_Salesvcdata_1';
/**
 * Type of the parameters to be passed to {@link yy1Salesvcdata1SapUpsert}.
 */
export interface Yy1Salesvcdata1SapUpsertParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Sales Order Number.
   */
  salesOrderNumber?: string | null;
  /**
   * Sales Order Item Num.
   */
  salesOrderItemNum?: string | null;
  /**
   * Billing Document Number.
   */
  billingDocumentNumber?: BigNumber | null;
  /**
   * Billing Document Item Number.
   */
  billingDocumentItemNumber?: BigNumber | null;
  /**
   * Custom Sales Order Type.
   */
  customSalesOrderType?: string | null;
  /**
   * Custom Billing Type.
   */
  customBillingType?: string | null;
  /**
   * Yy 1 Aca Rg Only.
   */
  yy1AcaRgOnly?: string | null;
  /**
   * Yy 2 Aca Hrs.
   */
  yy2AcaHrs?: BigNumber | null;
  /**
   * Yy 3 Aca Hrs Price.
   */
  yy3AcaHrsPrice?: BigNumber | null;
  /**
   * Yy 4 Aca Total Hrs Price.
   */
  yy4AcaTotalHrsPrice?: BigNumber | null;
  /**
   * Yy 5 Line Item Number.
   */
  yy5LineItemNumber?: BigNumber | null;
  /**
   * Yy 6 Sc Line Item Number.
   */
  yy6ScLineItemNumber?: string | null;
  /**
   * Yy 7 Invisible.
   */
  yy7Invisible?: string | null;
  /**
   * Yy 8 Week Ending 2.
   */
  yy8WeekEnding2?: Moment | null;
  /**
   * Yy 9 Zzweek End Vbap.
   */
  yy9ZzweekEndVbap?: Moment | null;
  /**
   * Yy 10 Employee Type.
   */
  yy10EmployeeType?: string | null;
  /**
   * Yy 11 Eight Day Week.
   */
  yy11EightDayWeek?: string | null;
  /**
   * Yy 12 Day 1 Shift 1 Rg.
   */
  yy12Day1Shift1Rg?: BigNumber | null;
  /**
   * Yy 13 Day 1 Shift 1 Ot.
   */
  yy13Day1Shift1Ot?: BigNumber | null;
  /**
   * Yy 14 Day 1 Shift 1 Db.
   */
  yy14Day1Shift1Db?: BigNumber | null;
  /**
   * Yy 15 Day 1 Shift 2 Rg.
   */
  yy15Day1Shift2Rg?: BigNumber | null;
  /**
   * Yy 16 Day 1 Shift 2 Ot.
   */
  yy16Day1Shift2Ot?: BigNumber | null;
  /**
   * Yy 17 Day 1 Shift 2 Db.
   */
  yy17Day1Shift2Db?: BigNumber | null;
  /**
   * Yy 18 Day 1 Shift 3 Rg.
   */
  yy18Day1Shift3Rg?: BigNumber | null;
  /**
   * Yy 19 Day 1 Shift 3 Ot.
   */
  yy19Day1Shift3Ot?: BigNumber | null;
  /**
   * Yy 20 Day 1 Shift 3 Db.
   */
  yy20Day1Shift3Db?: BigNumber | null;
  /**
   * Yy 21 Day One.
   */
  yy21DayOne?: Moment | null;
  /**
   * Yy 22 Day One Worked.
   */
  yy22DayOneWorked?: BigNumber | null;
  /**
   * Yy 23 Day 2 Shift 1 Rg.
   */
  yy23Day2Shift1Rg?: BigNumber | null;
  /**
   * Yy 24 Day 2 Shift 1 Ot.
   */
  yy24Day2Shift1Ot?: BigNumber | null;
  /**
   * Yy 25 Day 2 Shift 1 Db.
   */
  yy25Day2Shift1Db?: BigNumber | null;
  /**
   * Yy 26 Day 2 Shift 2 Rg.
   */
  yy26Day2Shift2Rg?: BigNumber | null;
  /**
   * Yy 27 Day 2 Shift 2 Ot.
   */
  yy27Day2Shift2Ot?: BigNumber | null;
  /**
   * Yy 28 Day 2 Shift 2 Db.
   */
  yy28Day2Shift2Db?: BigNumber | null;
  /**
   * Yy 29 Day 2 Shift 3 Rg.
   */
  yy29Day2Shift3Rg?: BigNumber | null;
  /**
   * Yy 30 Day 2 Shift 3 Ot.
   */
  yy30Day2Shift3Ot?: BigNumber | null;
  /**
   * Yy 31 Day 2 Shift 3 Db.
   */
  yy31Day2Shift3Db?: BigNumber | null;
  /**
   * Yy 32 Day Two.
   */
  yy32DayTwo?: Moment | null;
  /**
   * Yy 33 Day Two Worked.
   */
  yy33DayTwoWorked?: BigNumber | null;
  /**
   * Yy 34 Day 3 Shift 1 Rg.
   */
  yy34Day3Shift1Rg?: BigNumber | null;
  /**
   * Yy 35 Day 3 Shift 1 Ot.
   */
  yy35Day3Shift1Ot?: BigNumber | null;
  /**
   * Yy 36 Day 3 Shift 1 Db.
   */
  yy36Day3Shift1Db?: BigNumber | null;
  /**
   * Yy 37 Day 3 Shift 2 Rg.
   */
  yy37Day3Shift2Rg?: BigNumber | null;
  /**
   * Yy 38 Day 3 Shift 2 Ot.
   */
  yy38Day3Shift2Ot?: BigNumber | null;
  /**
   * Yy 39 Day 3 Shift 2 Db.
   */
  yy39Day3Shift2Db?: BigNumber | null;
  /**
   * Yy 40 Day 3 Shift 3 Rg.
   */
  yy40Day3Shift3Rg?: BigNumber | null;
  /**
   * Yy 41 Day 3 Shift 3 Ot.
   */
  yy41Day3Shift3Ot?: BigNumber | null;
  /**
   * Yy 42 Day 3 Shift 3 Db.
   */
  yy42Day3Shift3Db?: BigNumber | null;
  /**
   * Yy 43 Day Three.
   */
  yy43DayThree?: Moment | null;
  /**
   * Yy 44 Day Three Worked.
   */
  yy44DayThreeWorked?: BigNumber | null;
  /**
   * Yy 45 Day 4 Shift 1 Rg.
   */
  yy45Day4Shift1Rg?: BigNumber | null;
  /**
   * Yy 46 Day 4 Shift 1 Ot.
   */
  yy46Day4Shift1Ot?: BigNumber | null;
  /**
   * Yy 47 Day 4 Shift 1 Db.
   */
  yy47Day4Shift1Db?: BigNumber | null;
  /**
   * Yy 48 Day 4 Shift 2 Rg.
   */
  yy48Day4Shift2Rg?: BigNumber | null;
  /**
   * Yy 49 Day 4 Shift 2 Ot.
   */
  yy49Day4Shift2Ot?: BigNumber | null;
  /**
   * Yy 50 Day 4 Shift 2 Db.
   */
  yy50Day4Shift2Db?: BigNumber | null;
  /**
   * Yy 51 Day 4 Shift 3 Rg.
   */
  yy51Day4Shift3Rg?: BigNumber | null;
  /**
   * Yy 52 Day 4 Shift 3 Ot.
   */
  yy52Day4Shift3Ot?: BigNumber | null;
  /**
   * Yy 53 Day 4 Shift 3 Db.
   */
  yy53Day4Shift3Db?: BigNumber | null;
  /**
   * Yy 54 Day Four.
   */
  yy54DayFour?: Moment | null;
  /**
   * Yy 55 Day Four Worked.
   */
  yy55DayFourWorked?: BigNumber | null;
  /**
   * Yy 56 Day 5 Shift 1 Rg.
   */
  yy56Day5Shift1Rg?: BigNumber | null;
  /**
   * Yy 57 Day 5 Shift 1 Ot.
   */
  yy57Day5Shift1Ot?: BigNumber | null;
  /**
   * Yy 58 Day 5 Shift 1 Db.
   */
  yy58Day5Shift1Db?: BigNumber | null;
  /**
   * Yy 59 Day 5 Shift 2 Rg.
   */
  yy59Day5Shift2Rg?: BigNumber | null;
  /**
   * Yy 60 Day 5 Shift 2 Ot.
   */
  yy60Day5Shift2Ot?: BigNumber | null;
  /**
   * Yy 61 Day 5 Shift 2 Db.
   */
  yy61Day5Shift2Db?: BigNumber | null;
  /**
   * Yy 62 Day 5 Shift 3 Rg.
   */
  yy62Day5Shift3Rg?: BigNumber | null;
  /**
   * Yy 63 Day 5 Shift 3 Ot.
   */
  yy63Day5Shift3Ot?: BigNumber | null;
  /**
   * Yy 64 Day 5 Shift 3 Db.
   */
  yy64Day5Shift3Db?: BigNumber | null;
  /**
   * Yy 65 Day Five.
   */
  yy65DayFive?: Moment | null;
  /**
   * Yy 66 Day Five Worked.
   */
  yy66DayFiveWorked?: BigNumber | null;
  /**
   * Yy 67 Day 6 Shift 1 Rg.
   */
  yy67Day6Shift1Rg?: BigNumber | null;
  /**
   * Yy 68 Day 6 Shift 1 Ot.
   */
  yy68Day6Shift1Ot?: BigNumber | null;
  /**
   * Yy 69 Day 6 Shift 1 Db.
   */
  yy69Day6Shift1Db?: BigNumber | null;
  /**
   * Yy 70 Day 6 Shift 2 Rg.
   */
  yy70Day6Shift2Rg?: BigNumber | null;
  /**
   * Yy 71 Day 6 Shift 2 Ot.
   */
  yy71Day6Shift2Ot?: BigNumber | null;
  /**
   * Yy 72 Day 6 Shift 2 Db.
   */
  yy72Day6Shift2Db?: BigNumber | null;
  /**
   * Yy 73 Day 6 Shift 3 Rg.
   */
  yy73Day6Shift3Rg?: BigNumber | null;
  /**
   * Yy 74 Day 6 Shift 3 Ot.
   */
  yy74Day6Shift3Ot?: BigNumber | null;
  /**
   * Yy 75 Day 6 Shift 3 Db.
   */
  yy75Day6Shift3Db?: BigNumber | null;
  /**
   * Yy 76 Day Six.
   */
  yy76DaySix?: Moment | null;
  /**
   * Yy 77 Day Six Worked.
   */
  yy77DaySixWorked?: BigNumber | null;
  /**
   * Yy 78 Day 7 Shift 1 Rg.
   */
  yy78Day7Shift1Rg?: BigNumber | null;
  /**
   * Yy 79 Day 7 Shift 1 Ot.
   */
  yy79Day7Shift1Ot?: BigNumber | null;
  /**
   * Yy 80 Day 7 Shift 1 Db.
   */
  yy80Day7Shift1Db?: BigNumber | null;
  /**
   * Yy 81 Day 7 Shift 2 Rg.
   */
  yy81Day7Shift2Rg?: BigNumber | null;
  /**
   * Yy 82 Day 7 Shift 2 Ot.
   */
  yy82Day7Shift2Ot?: BigNumber | null;
  /**
   * Yy 83 Day 7 Shift 2 Db.
   */
  yy83Day7Shift2Db?: BigNumber | null;
  /**
   * Yy 84 Day 7 Shift 3 Rg.
   */
  yy84Day7Shift3Rg?: BigNumber | null;
  /**
   * Yy 85 Day 7 Shift 3 Ot.
   */
  yy85Day7Shift3Ot?: BigNumber | null;
  /**
   * Yy 86 Day 7 Shift 3 Db.
   */
  yy86Day7Shift3Db?: BigNumber | null;
  /**
   * Yy 87 Day Seven.
   */
  yy87DaySeven?: Moment | null;
  /**
   * Yy 88 Day Seven Worked.
   */
  yy88DaySevenWorked?: BigNumber | null;
  /**
   * Yy 89 Day 8 Shift 1 Rg.
   */
  yy89Day8Shift1Rg?: BigNumber | null;
  /**
   * Yy 90 Day 8 Shift 1 Ot.
   */
  yy90Day8Shift1Ot?: BigNumber | null;
  /**
   * Yy 91 Day 8 Shift 1 Db.
   */
  yy91Day8Shift1Db?: BigNumber | null;
  /**
   * Yy 92 Day 8 Shift 2 Rg.
   */
  yy92Day8Shift2Rg?: BigNumber | null;
  /**
   * Yy 93 Day 8 Shift 2 Ot.
   */
  yy93Day8Shift2Ot?: BigNumber | null;
  /**
   * Yy 94 Day 8 Shift 2 Db.
   */
  yy94Day8Shift2Db?: BigNumber | null;
  /**
   * Yy 95 Day 8 Shift 3 Rg.
   */
  yy95Day8Shift3Rg?: BigNumber | null;
  /**
   * Yy 96 Day 8 Shift 3 Ot.
   */
  yy96Day8Shift3Ot?: BigNumber | null;
  /**
   * Yy 97 Day 8 Shift 3 Db.
   */
  yy97Day8Shift3Db?: BigNumber | null;
  /**
   * Yy 98 Day Eight.
   */
  yy98DayEight?: Moment | null;
  /**
   * Yy 99 Day Eight Worked.
   */
  yy99DayEightWorked?: BigNumber | null;
  /**
   * Yy 100 Shift 1 Total Hrs Rg.
   */
  yy100Shift1TotalHrsRg?: BigNumber | null;
  /**
   * Yy 101 Shift 1 Total Hrs Ot.
   */
  yy101Shift1TotalHrsOt?: BigNumber | null;
  /**
   * Yy 102 Shift 1 Total Hrs Db.
   */
  yy102Shift1TotalHrsDb?: BigNumber | null;
  /**
   * Yy 103 Shift 2 Total Hrs Rg.
   */
  yy103Shift2TotalHrsRg?: BigNumber | null;
  /**
   * Yy 104 Shift 2 Total Hrs Ot.
   */
  yy104Shift2TotalHrsOt?: BigNumber | null;
  /**
   * Yy 105 Shift 2 Total Hrs Db.
   */
  yy105Shift2TotalHrsDb?: BigNumber | null;
  /**
   * Yy 106 Shift 3 Total Hrs Rg.
   */
  yy106Shift3TotalHrsRg?: BigNumber | null;
  /**
   * Yy 107 Shift 3 Total Hrs Ot.
   */
  yy107Shift3TotalHrsOt?: BigNumber | null;
  /**
   * Yy 108 Shift 3 Total Hrs Db.
   */
  yy108Shift3TotalHrsDb?: BigNumber | null;
  /**
   * Yy 109 Shift 1 Price Rg.
   */
  yy109Shift1PriceRg?: BigNumber | null;
  /**
   * Yy 110 Shift 1 Price Ot.
   */
  yy110Shift1PriceOt?: BigNumber | null;
  /**
   * Yy 111 Shift 1 Price Db.
   */
  yy111Shift1PriceDb?: BigNumber | null;
  /**
   * Yy 112 Shift 2 Price Rg.
   */
  yy112Shift2PriceRg?: BigNumber | null;
  /**
   * Yy 113 Shift 2 Price Ot.
   */
  yy113Shift2PriceOt?: BigNumber | null;
  /**
   * Yy 114 Shift 2 Price Db.
   */
  yy114Shift2PriceDb?: BigNumber | null;
  /**
   * Yy 115 Shift 3 Price Rg.
   */
  yy115Shift3PriceRg?: BigNumber | null;
  /**
   * Yy 116 Shift 3 Price Ot.
   */
  yy116Shift3PriceOt?: BigNumber | null;
  /**
   * Yy 117 Shift 3 Price Db.
   */
  yy117Shift3PriceDb?: BigNumber | null;
  /**
   * Yy 118 Mark Up Rg.
   */
  yy118MarkUpRg?: BigNumber | null;
  /**
   * Yy 119 Mark Up Ot.
   */
  yy119MarkUpOt?: BigNumber | null;
  /**
   * Yy 120 Mark Up Db.
   */
  yy120MarkUpDb?: BigNumber | null;
  /**
   * Yy 121 Shift 1 Total Price Rg.
   */
  yy121Shift1TotalPriceRg?: BigNumber | null;
  /**
   * Yy 122 Shift 1 Total Price Ot.
   */
  yy122Shift1TotalPriceOt?: BigNumber | null;
  /**
   * Yy 123 Shift 1 Total Price Db.
   */
  yy123Shift1TotalPriceDb?: BigNumber | null;
  /**
   * Yy 124 Shift 2 Total Price Rg.
   */
  yy124Shift2TotalPriceRg?: BigNumber | null;
  /**
   * Yy 125 Shift 2 Total Price Ot.
   */
  yy125Shift2TotalPriceOt?: BigNumber | null;
  /**
   * Yy 126 Shift 2 Total Price Db.
   */
  yy126Shift2TotalPriceDb?: BigNumber | null;
  /**
   * Yy 127 Shift 3 Total Pay Rg.
   */
  yy127Shift3TotalPayRg?: BigNumber | null;
  /**
   * Yy 128 Shift 3 Total Pay Ot.
   */
  yy128Shift3TotalPayOt?: BigNumber | null;
  /**
   * Yy 129 Shift 3 Total Pay Db.
   */
  yy129Shift3TotalPayDb?: BigNumber | null;
  /**
   * Yy 130 Admin Fee Price.
   */
  yy130AdminFeePrice?: BigNumber | null;
}
/**
 * Yy 1 Salesvcdata 1 Sap Upsert.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function yy1Salesvcdata1SapUpsert<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: Yy1Salesvcdata1SapUpsertParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  Yy1Salesvcdata1SapUpsertParameters<DeSerializersT>,
  Yy1_Salesvcdata_1
>;
export declare const operations: {
  yy1Salesvcdata1SapUpsert: typeof yy1Salesvcdata1SapUpsert;
};
