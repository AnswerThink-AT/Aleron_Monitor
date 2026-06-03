/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import {
  transformReturnValueForEntity,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  OperationParameter,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { yy1Salesvcdata1Cds } from './service';
import { Yy1_Salesvcdata_1 } from './Yy1_Salesvcdata_1';
import { Yy1_Salesvcdata_1Api } from './Yy1_Salesvcdata_1Api';

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
export function yy1Salesvcdata1SapUpsert<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: Yy1Salesvcdata1SapUpsertParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  Yy1Salesvcdata1SapUpsertParameters<DeSerializersT>,
  Yy1_Salesvcdata_1
> {
  const params = {
    salesOrderNumber: new OperationParameter(
      'SalesOrderNumber',
      'Edm.String',
      parameters.salesOrderNumber
    ),
    salesOrderItemNum: new OperationParameter(
      'SalesOrderItemNum',
      'Edm.String',
      parameters.salesOrderItemNum
    ),
    billingDocumentNumber: new OperationParameter(
      'Billing_Document_Number',
      'Edm.Decimal',
      parameters.billingDocumentNumber
    ),
    billingDocumentItemNumber: new OperationParameter(
      'Billing_Document_Item_Number',
      'Edm.Decimal',
      parameters.billingDocumentItemNumber
    ),
    customSalesOrderType: new OperationParameter(
      'Custom_Sales_Order_Type',
      'Edm.String',
      parameters.customSalesOrderType
    ),
    customBillingType: new OperationParameter(
      'Custom_Billing_type',
      'Edm.String',
      parameters.customBillingType
    ),
    yy1AcaRgOnly: new OperationParameter(
      'YY1_ACA_RG_ONLY',
      'Edm.String',
      parameters.yy1AcaRgOnly
    ),
    yy2AcaHrs: new OperationParameter(
      'YY2_ACA_HRS',
      'Edm.Decimal',
      parameters.yy2AcaHrs
    ),
    yy3AcaHrsPrice: new OperationParameter(
      'YY3_ACA_HRS_PRICE',
      'Edm.Decimal',
      parameters.yy3AcaHrsPrice
    ),
    yy4AcaTotalHrsPrice: new OperationParameter(
      'YY4_ACA_TOTAL_HRS_PRICE',
      'Edm.Decimal',
      parameters.yy4AcaTotalHrsPrice
    ),
    yy5LineItemNumber: new OperationParameter(
      'YY5_LINE_ITEM_NUMBER',
      'Edm.Decimal',
      parameters.yy5LineItemNumber
    ),
    yy6ScLineItemNumber: new OperationParameter(
      'YY6_SC_LINE_ITEM_NUMBER',
      'Edm.String',
      parameters.yy6ScLineItemNumber
    ),
    yy7Invisible: new OperationParameter(
      'YY7_INVISIBLE',
      'Edm.String',
      parameters.yy7Invisible
    ),
    yy8WeekEnding2: new OperationParameter(
      'YY8_WEEK_ENDING2',
      'Edm.DateTime',
      parameters.yy8WeekEnding2
    ),
    yy9ZzweekEndVbap: new OperationParameter(
      'YY9_ZZWEEK_END_VBAP',
      'Edm.DateTime',
      parameters.yy9ZzweekEndVbap
    ),
    yy10EmployeeType: new OperationParameter(
      'YY10_EMPLOYEE_TYPE',
      'Edm.String',
      parameters.yy10EmployeeType
    ),
    yy11EightDayWeek: new OperationParameter(
      'YY11_EIGHT_DAY_WEEK',
      'Edm.String',
      parameters.yy11EightDayWeek
    ),
    yy12Day1Shift1Rg: new OperationParameter(
      'YY12_DAY1_SHIFT1_RG',
      'Edm.Decimal',
      parameters.yy12Day1Shift1Rg
    ),
    yy13Day1Shift1Ot: new OperationParameter(
      'YY13_DAY1_SHIFT1_OT',
      'Edm.Decimal',
      parameters.yy13Day1Shift1Ot
    ),
    yy14Day1Shift1Db: new OperationParameter(
      'YY14_DAY1_SHIFT1_DB',
      'Edm.Decimal',
      parameters.yy14Day1Shift1Db
    ),
    yy15Day1Shift2Rg: new OperationParameter(
      'YY15_DAY1_SHIFT2_RG',
      'Edm.Decimal',
      parameters.yy15Day1Shift2Rg
    ),
    yy16Day1Shift2Ot: new OperationParameter(
      'YY16_DAY1_SHIFT2_OT',
      'Edm.Decimal',
      parameters.yy16Day1Shift2Ot
    ),
    yy17Day1Shift2Db: new OperationParameter(
      'YY17_DAY1_SHIFT2_DB',
      'Edm.Decimal',
      parameters.yy17Day1Shift2Db
    ),
    yy18Day1Shift3Rg: new OperationParameter(
      'YY18_DAY1_SHIFT3_RG',
      'Edm.Decimal',
      parameters.yy18Day1Shift3Rg
    ),
    yy19Day1Shift3Ot: new OperationParameter(
      'YY19_DAY1_SHIFT3_OT',
      'Edm.Decimal',
      parameters.yy19Day1Shift3Ot
    ),
    yy20Day1Shift3Db: new OperationParameter(
      'YY20_DAY1_SHIFT3_DB',
      'Edm.Decimal',
      parameters.yy20Day1Shift3Db
    ),
    yy21DayOne: new OperationParameter(
      'YY21_DAY_ONE',
      'Edm.DateTime',
      parameters.yy21DayOne
    ),
    yy22DayOneWorked: new OperationParameter(
      'YY22_DAY_ONE_WORKED',
      'Edm.Decimal',
      parameters.yy22DayOneWorked
    ),
    yy23Day2Shift1Rg: new OperationParameter(
      'YY23_DAY2_SHIFT1_RG',
      'Edm.Decimal',
      parameters.yy23Day2Shift1Rg
    ),
    yy24Day2Shift1Ot: new OperationParameter(
      'YY24_DAY2_SHIFT1_OT',
      'Edm.Decimal',
      parameters.yy24Day2Shift1Ot
    ),
    yy25Day2Shift1Db: new OperationParameter(
      'YY25_DAY2_SHIFT1_DB',
      'Edm.Decimal',
      parameters.yy25Day2Shift1Db
    ),
    yy26Day2Shift2Rg: new OperationParameter(
      'YY26_DAY2_SHIFT2_RG',
      'Edm.Decimal',
      parameters.yy26Day2Shift2Rg
    ),
    yy27Day2Shift2Ot: new OperationParameter(
      'YY27_DAY2_SHIFT2_OT',
      'Edm.Decimal',
      parameters.yy27Day2Shift2Ot
    ),
    yy28Day2Shift2Db: new OperationParameter(
      'YY28_DAY2_SHIFT2_DB',
      'Edm.Decimal',
      parameters.yy28Day2Shift2Db
    ),
    yy29Day2Shift3Rg: new OperationParameter(
      'YY29_DAY2_SHIFT3_RG',
      'Edm.Decimal',
      parameters.yy29Day2Shift3Rg
    ),
    yy30Day2Shift3Ot: new OperationParameter(
      'YY30_DAY2_SHIFT3_OT',
      'Edm.Decimal',
      parameters.yy30Day2Shift3Ot
    ),
    yy31Day2Shift3Db: new OperationParameter(
      'YY31_DAY2_SHIFT3_DB',
      'Edm.Decimal',
      parameters.yy31Day2Shift3Db
    ),
    yy32DayTwo: new OperationParameter(
      'YY32_DAY_TWO',
      'Edm.DateTime',
      parameters.yy32DayTwo
    ),
    yy33DayTwoWorked: new OperationParameter(
      'YY33_DAY_TWO_WORKED',
      'Edm.Decimal',
      parameters.yy33DayTwoWorked
    ),
    yy34Day3Shift1Rg: new OperationParameter(
      'YY34_DAY3_SHIFT1_RG',
      'Edm.Decimal',
      parameters.yy34Day3Shift1Rg
    ),
    yy35Day3Shift1Ot: new OperationParameter(
      'YY35_DAY3_SHIFT1_OT',
      'Edm.Decimal',
      parameters.yy35Day3Shift1Ot
    ),
    yy36Day3Shift1Db: new OperationParameter(
      'YY36_DAY3_SHIFT1_DB',
      'Edm.Decimal',
      parameters.yy36Day3Shift1Db
    ),
    yy37Day3Shift2Rg: new OperationParameter(
      'YY37_DAY3_SHIFT2_RG',
      'Edm.Decimal',
      parameters.yy37Day3Shift2Rg
    ),
    yy38Day3Shift2Ot: new OperationParameter(
      'YY38_DAY3_SHIFT2_OT',
      'Edm.Decimal',
      parameters.yy38Day3Shift2Ot
    ),
    yy39Day3Shift2Db: new OperationParameter(
      'YY39_DAY3_SHIFT2_DB',
      'Edm.Decimal',
      parameters.yy39Day3Shift2Db
    ),
    yy40Day3Shift3Rg: new OperationParameter(
      'YY40_DAY3_SHIFT3_RG',
      'Edm.Decimal',
      parameters.yy40Day3Shift3Rg
    ),
    yy41Day3Shift3Ot: new OperationParameter(
      'YY41_DAY3_SHIFT3_OT',
      'Edm.Decimal',
      parameters.yy41Day3Shift3Ot
    ),
    yy42Day3Shift3Db: new OperationParameter(
      'YY42_DAY3_SHIFT3_DB',
      'Edm.Decimal',
      parameters.yy42Day3Shift3Db
    ),
    yy43DayThree: new OperationParameter(
      'YY43_DAY_THREE',
      'Edm.DateTime',
      parameters.yy43DayThree
    ),
    yy44DayThreeWorked: new OperationParameter(
      'YY44_DAY_THREE_WORKED',
      'Edm.Decimal',
      parameters.yy44DayThreeWorked
    ),
    yy45Day4Shift1Rg: new OperationParameter(
      'YY45_DAY4_SHIFT1_RG',
      'Edm.Decimal',
      parameters.yy45Day4Shift1Rg
    ),
    yy46Day4Shift1Ot: new OperationParameter(
      'YY46_DAY4_SHIFT1_OT',
      'Edm.Decimal',
      parameters.yy46Day4Shift1Ot
    ),
    yy47Day4Shift1Db: new OperationParameter(
      'YY47_DAY4_SHIFT1_DB',
      'Edm.Decimal',
      parameters.yy47Day4Shift1Db
    ),
    yy48Day4Shift2Rg: new OperationParameter(
      'YY48_DAY4_SHIFT2_RG',
      'Edm.Decimal',
      parameters.yy48Day4Shift2Rg
    ),
    yy49Day4Shift2Ot: new OperationParameter(
      'YY49_DAY4_SHIFT2_OT',
      'Edm.Decimal',
      parameters.yy49Day4Shift2Ot
    ),
    yy50Day4Shift2Db: new OperationParameter(
      'YY50_DAY4_SHIFT2_DB',
      'Edm.Decimal',
      parameters.yy50Day4Shift2Db
    ),
    yy51Day4Shift3Rg: new OperationParameter(
      'YY51_DAY4_SHIFT3_RG',
      'Edm.Decimal',
      parameters.yy51Day4Shift3Rg
    ),
    yy52Day4Shift3Ot: new OperationParameter(
      'YY52_DAY4_SHIFT3_OT',
      'Edm.Decimal',
      parameters.yy52Day4Shift3Ot
    ),
    yy53Day4Shift3Db: new OperationParameter(
      'YY53_DAY4_SHIFT3_DB',
      'Edm.Decimal',
      parameters.yy53Day4Shift3Db
    ),
    yy54DayFour: new OperationParameter(
      'YY54_DAY_FOUR',
      'Edm.DateTime',
      parameters.yy54DayFour
    ),
    yy55DayFourWorked: new OperationParameter(
      'YY55_DAY_FOUR_WORKED',
      'Edm.Decimal',
      parameters.yy55DayFourWorked
    ),
    yy56Day5Shift1Rg: new OperationParameter(
      'YY56_DAY5_SHIFT1_RG',
      'Edm.Decimal',
      parameters.yy56Day5Shift1Rg
    ),
    yy57Day5Shift1Ot: new OperationParameter(
      'YY57_DAY5_SHIFT1_OT',
      'Edm.Decimal',
      parameters.yy57Day5Shift1Ot
    ),
    yy58Day5Shift1Db: new OperationParameter(
      'YY58_DAY5_SHIFT1_DB',
      'Edm.Decimal',
      parameters.yy58Day5Shift1Db
    ),
    yy59Day5Shift2Rg: new OperationParameter(
      'YY59_DAY5_SHIFT2_RG',
      'Edm.Decimal',
      parameters.yy59Day5Shift2Rg
    ),
    yy60Day5Shift2Ot: new OperationParameter(
      'YY60_DAY5_SHIFT2_OT',
      'Edm.Decimal',
      parameters.yy60Day5Shift2Ot
    ),
    yy61Day5Shift2Db: new OperationParameter(
      'YY61_DAY5_SHIFT2_DB',
      'Edm.Decimal',
      parameters.yy61Day5Shift2Db
    ),
    yy62Day5Shift3Rg: new OperationParameter(
      'YY62_DAY5_SHIFT3_RG',
      'Edm.Decimal',
      parameters.yy62Day5Shift3Rg
    ),
    yy63Day5Shift3Ot: new OperationParameter(
      'YY63_DAY5_SHIFT3_OT',
      'Edm.Decimal',
      parameters.yy63Day5Shift3Ot
    ),
    yy64Day5Shift3Db: new OperationParameter(
      'YY64_DAY5_SHIFT3_DB',
      'Edm.Decimal',
      parameters.yy64Day5Shift3Db
    ),
    yy65DayFive: new OperationParameter(
      'YY65_DAY_FIVE',
      'Edm.DateTime',
      parameters.yy65DayFive
    ),
    yy66DayFiveWorked: new OperationParameter(
      'YY66_DAY_FIVE_WORKED',
      'Edm.Decimal',
      parameters.yy66DayFiveWorked
    ),
    yy67Day6Shift1Rg: new OperationParameter(
      'YY67_DAY6_SHIFT1_RG',
      'Edm.Decimal',
      parameters.yy67Day6Shift1Rg
    ),
    yy68Day6Shift1Ot: new OperationParameter(
      'YY68_DAY6_SHIFT1_OT',
      'Edm.Decimal',
      parameters.yy68Day6Shift1Ot
    ),
    yy69Day6Shift1Db: new OperationParameter(
      'YY69_DAY6_SHIFT1_DB',
      'Edm.Decimal',
      parameters.yy69Day6Shift1Db
    ),
    yy70Day6Shift2Rg: new OperationParameter(
      'YY70_DAY6_SHIFT2_RG',
      'Edm.Decimal',
      parameters.yy70Day6Shift2Rg
    ),
    yy71Day6Shift2Ot: new OperationParameter(
      'YY71_DAY6_SHIFT2_OT',
      'Edm.Decimal',
      parameters.yy71Day6Shift2Ot
    ),
    yy72Day6Shift2Db: new OperationParameter(
      'YY72_DAY6_SHIFT2_DB',
      'Edm.Decimal',
      parameters.yy72Day6Shift2Db
    ),
    yy73Day6Shift3Rg: new OperationParameter(
      'YY73_DAY6_SHIFT3_RG',
      'Edm.Decimal',
      parameters.yy73Day6Shift3Rg
    ),
    yy74Day6Shift3Ot: new OperationParameter(
      'YY74_DAY6_SHIFT3_OT',
      'Edm.Decimal',
      parameters.yy74Day6Shift3Ot
    ),
    yy75Day6Shift3Db: new OperationParameter(
      'YY75_DAY6_SHIFT3_DB',
      'Edm.Decimal',
      parameters.yy75Day6Shift3Db
    ),
    yy76DaySix: new OperationParameter(
      'YY76_DAY_SIX',
      'Edm.DateTime',
      parameters.yy76DaySix
    ),
    yy77DaySixWorked: new OperationParameter(
      'YY77_DAY_SIX_WORKED',
      'Edm.Decimal',
      parameters.yy77DaySixWorked
    ),
    yy78Day7Shift1Rg: new OperationParameter(
      'YY78_DAY7_SHIFT1_RG',
      'Edm.Decimal',
      parameters.yy78Day7Shift1Rg
    ),
    yy79Day7Shift1Ot: new OperationParameter(
      'YY79_DAY7_SHIFT1_OT',
      'Edm.Decimal',
      parameters.yy79Day7Shift1Ot
    ),
    yy80Day7Shift1Db: new OperationParameter(
      'YY80_DAY7_SHIFT1_DB',
      'Edm.Decimal',
      parameters.yy80Day7Shift1Db
    ),
    yy81Day7Shift2Rg: new OperationParameter(
      'YY81_DAY7_SHIFT2_RG',
      'Edm.Decimal',
      parameters.yy81Day7Shift2Rg
    ),
    yy82Day7Shift2Ot: new OperationParameter(
      'YY82_DAY7_SHIFT2_OT',
      'Edm.Decimal',
      parameters.yy82Day7Shift2Ot
    ),
    yy83Day7Shift2Db: new OperationParameter(
      'YY83_DAY7_SHIFT2_DB',
      'Edm.Decimal',
      parameters.yy83Day7Shift2Db
    ),
    yy84Day7Shift3Rg: new OperationParameter(
      'YY84_DAY7_SHIFT3_RG',
      'Edm.Decimal',
      parameters.yy84Day7Shift3Rg
    ),
    yy85Day7Shift3Ot: new OperationParameter(
      'YY85_DAY7_SHIFT3_OT',
      'Edm.Decimal',
      parameters.yy85Day7Shift3Ot
    ),
    yy86Day7Shift3Db: new OperationParameter(
      'YY86_DAY7_SHIFT3_DB',
      'Edm.Decimal',
      parameters.yy86Day7Shift3Db
    ),
    yy87DaySeven: new OperationParameter(
      'YY87_DAY_SEVEN',
      'Edm.DateTime',
      parameters.yy87DaySeven
    ),
    yy88DaySevenWorked: new OperationParameter(
      'YY88_DAY_SEVEN_WORKED',
      'Edm.Decimal',
      parameters.yy88DaySevenWorked
    ),
    yy89Day8Shift1Rg: new OperationParameter(
      'YY89_DAY8_SHIFT1_RG',
      'Edm.Decimal',
      parameters.yy89Day8Shift1Rg
    ),
    yy90Day8Shift1Ot: new OperationParameter(
      'YY90_DAY8_SHIFT1_OT',
      'Edm.Decimal',
      parameters.yy90Day8Shift1Ot
    ),
    yy91Day8Shift1Db: new OperationParameter(
      'YY91_DAY8_SHIFT1_DB',
      'Edm.Decimal',
      parameters.yy91Day8Shift1Db
    ),
    yy92Day8Shift2Rg: new OperationParameter(
      'YY92_DAY8_SHIFT2_RG',
      'Edm.Decimal',
      parameters.yy92Day8Shift2Rg
    ),
    yy93Day8Shift2Ot: new OperationParameter(
      'YY93_DAY8_SHIFT2_OT',
      'Edm.Decimal',
      parameters.yy93Day8Shift2Ot
    ),
    yy94Day8Shift2Db: new OperationParameter(
      'YY94_DAY8_SHIFT2_DB',
      'Edm.Decimal',
      parameters.yy94Day8Shift2Db
    ),
    yy95Day8Shift3Rg: new OperationParameter(
      'YY95_DAY8_SHIFT3_RG',
      'Edm.Decimal',
      parameters.yy95Day8Shift3Rg
    ),
    yy96Day8Shift3Ot: new OperationParameter(
      'YY96_DAY8_SHIFT3_OT',
      'Edm.Decimal',
      parameters.yy96Day8Shift3Ot
    ),
    yy97Day8Shift3Db: new OperationParameter(
      'YY97_DAY8_SHIFT3_DB',
      'Edm.Decimal',
      parameters.yy97Day8Shift3Db
    ),
    yy98DayEight: new OperationParameter(
      'YY98_DAY_EIGHT',
      'Edm.DateTime',
      parameters.yy98DayEight
    ),
    yy99DayEightWorked: new OperationParameter(
      'YY99_DAY_EIGHT_WORKED',
      'Edm.Decimal',
      parameters.yy99DayEightWorked
    ),
    yy100Shift1TotalHrsRg: new OperationParameter(
      'YY100_SHIFT1_TOTAL_HRS_RG',
      'Edm.Decimal',
      parameters.yy100Shift1TotalHrsRg
    ),
    yy101Shift1TotalHrsOt: new OperationParameter(
      'YY101_SHIFT1_TOTAL_HRS_OT',
      'Edm.Decimal',
      parameters.yy101Shift1TotalHrsOt
    ),
    yy102Shift1TotalHrsDb: new OperationParameter(
      'YY102_SHIFT1_TOTAL_HRS_DB',
      'Edm.Decimal',
      parameters.yy102Shift1TotalHrsDb
    ),
    yy103Shift2TotalHrsRg: new OperationParameter(
      'YY103_SHIFT2_TOTAL_HRS_RG',
      'Edm.Decimal',
      parameters.yy103Shift2TotalHrsRg
    ),
    yy104Shift2TotalHrsOt: new OperationParameter(
      'YY104_SHIFT2_TOTAL_HRS_OT',
      'Edm.Decimal',
      parameters.yy104Shift2TotalHrsOt
    ),
    yy105Shift2TotalHrsDb: new OperationParameter(
      'YY105_SHIFT2_TOTAL_HRS_DB',
      'Edm.Decimal',
      parameters.yy105Shift2TotalHrsDb
    ),
    yy106Shift3TotalHrsRg: new OperationParameter(
      'YY106_SHIFT3_TOTAL_HRS_RG',
      'Edm.Decimal',
      parameters.yy106Shift3TotalHrsRg
    ),
    yy107Shift3TotalHrsOt: new OperationParameter(
      'YY107_SHIFT3_TOTAL_HRS_OT',
      'Edm.Decimal',
      parameters.yy107Shift3TotalHrsOt
    ),
    yy108Shift3TotalHrsDb: new OperationParameter(
      'YY108_SHIFT3_TOTAL_HRS_DB',
      'Edm.Decimal',
      parameters.yy108Shift3TotalHrsDb
    ),
    yy109Shift1PriceRg: new OperationParameter(
      'YY109_SHIFT1_PRICE_RG',
      'Edm.Decimal',
      parameters.yy109Shift1PriceRg
    ),
    yy110Shift1PriceOt: new OperationParameter(
      'YY110_SHIFT1_PRICE_OT',
      'Edm.Decimal',
      parameters.yy110Shift1PriceOt
    ),
    yy111Shift1PriceDb: new OperationParameter(
      'YY111_SHIFT1_PRICE_DB',
      'Edm.Decimal',
      parameters.yy111Shift1PriceDb
    ),
    yy112Shift2PriceRg: new OperationParameter(
      'YY112_SHIFT2_PRICE_RG',
      'Edm.Decimal',
      parameters.yy112Shift2PriceRg
    ),
    yy113Shift2PriceOt: new OperationParameter(
      'YY113_SHIFT2_PRICE_OT',
      'Edm.Decimal',
      parameters.yy113Shift2PriceOt
    ),
    yy114Shift2PriceDb: new OperationParameter(
      'YY114_SHIFT2_PRICE_DB',
      'Edm.Decimal',
      parameters.yy114Shift2PriceDb
    ),
    yy115Shift3PriceRg: new OperationParameter(
      'YY115_SHIFT3_PRICE_RG',
      'Edm.Decimal',
      parameters.yy115Shift3PriceRg
    ),
    yy116Shift3PriceOt: new OperationParameter(
      'YY116_SHIFT3_PRICE_OT',
      'Edm.Decimal',
      parameters.yy116Shift3PriceOt
    ),
    yy117Shift3PriceDb: new OperationParameter(
      'YY117_SHIFT3_PRICE_DB',
      'Edm.Decimal',
      parameters.yy117Shift3PriceDb
    ),
    yy118MarkUpRg: new OperationParameter(
      'YY118_MARK_UP_RG',
      'Edm.Decimal',
      parameters.yy118MarkUpRg
    ),
    yy119MarkUpOt: new OperationParameter(
      'YY119_MARK_UP_OT',
      'Edm.Decimal',
      parameters.yy119MarkUpOt
    ),
    yy120MarkUpDb: new OperationParameter(
      'YY120_MARK_UP_DB',
      'Edm.Decimal',
      parameters.yy120MarkUpDb
    ),
    yy121Shift1TotalPriceRg: new OperationParameter(
      'YY121_SHIFT1_TOTAL_PRICE_RG',
      'Edm.Decimal',
      parameters.yy121Shift1TotalPriceRg
    ),
    yy122Shift1TotalPriceOt: new OperationParameter(
      'YY122_SHIFT1_TOTAL_PRICE_OT',
      'Edm.Decimal',
      parameters.yy122Shift1TotalPriceOt
    ),
    yy123Shift1TotalPriceDb: new OperationParameter(
      'YY123_SHIFT1_TOTAL_PRICE_DB',
      'Edm.Decimal',
      parameters.yy123Shift1TotalPriceDb
    ),
    yy124Shift2TotalPriceRg: new OperationParameter(
      'YY124_SHIFT2_TOTAL_PRICE_RG',
      'Edm.Decimal',
      parameters.yy124Shift2TotalPriceRg
    ),
    yy125Shift2TotalPriceOt: new OperationParameter(
      'YY125_SHIFT2_TOTAL_PRICE_OT',
      'Edm.Decimal',
      parameters.yy125Shift2TotalPriceOt
    ),
    yy126Shift2TotalPriceDb: new OperationParameter(
      'YY126_SHIFT2_TOTAL_PRICE_DB',
      'Edm.Decimal',
      parameters.yy126Shift2TotalPriceDb
    ),
    yy127Shift3TotalPayRg: new OperationParameter(
      'YY127_SHIFT3_TOTAL_PAY_RG',
      'Edm.Decimal',
      parameters.yy127Shift3TotalPayRg
    ),
    yy128Shift3TotalPayOt: new OperationParameter(
      'YY128_SHIFT3_TOTAL_PAY_OT',
      'Edm.Decimal',
      parameters.yy128Shift3TotalPayOt
    ),
    yy129Shift3TotalPayDb: new OperationParameter(
      'YY129_SHIFT3_TOTAL_PAY_DB',
      'Edm.Decimal',
      parameters.yy129Shift3TotalPayDb
    ),
    yy130AdminFeePrice: new OperationParameter(
      'YY130_ADMIN_FEE_PRICE',
      'Edm.Decimal',
      parameters.yy130AdminFeePrice
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/YY1_SALESVCDATA_1_CDS',
    'YY1_SALESVCDATA_1Sap_upsert',
    data =>
      transformReturnValueForEntity(
        data,
        yy1Salesvcdata1Cds(deSerializers).yy1_Salesvcdata_1Api
      ),
    params,
    deSerializers
  );
}

export const operations = {
  yy1Salesvcdata1SapUpsert
};
