/* checksum : 34cc19c29a8804a556acf35fe5403472 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service YY1_SALESVCDATA_1_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'SalesVCData_1'
entity YY1_SALESVCDATA_1_CDS.YY1_SALESVCDATA_1 {
  @sap.label : 'UUID'
  @sap.quickinfo : '16 Byte UUID in 16 Bytes (Raw Format)'
  key SAP_UUID : UUID not null;
  @sap.label : 'Sales Order Number'
  SalesOrderNumber : String(20);
  @sap.label : 'Sales Order Item Num'
  SalesOrderItemNum : String(20);
  @sap.label : 'Billing Document Number'
  Billing_Document_Number : Decimal(10, 0);
  @sap.label : 'Billing Document Item Number'
  Billing_Document_Item_Number : Decimal(4, 0);
  @sap.label : 'Custom Sales Order Type'
  Custom_Sales_Order_Type : String(4);
  @sap.label : 'Custom Billing type'
  Custom_Billing_type : String(4);
  @sap.label : 'Customer condition group 2'
  YY1_ACA_RG_ONLY : String(2);
  @sap.label : 'ACA Hours'
  YY2_ACA_HRS : Decimal(15, 0);
  @sap.label : 'ACA Hours Price'
  YY3_ACA_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'ACA Total Hours Price'
  YY4_ACA_TOTAL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Line Item Number'
  YY5_LINE_ITEM_NUMBER : Decimal(15, 0);
  @sap.label : 'Cust PO Line Item Number'
  YY6_SC_LINE_ITEM_NUMBER : String(30);
  @sap.label : 'INVISIBLE'
  YY7_INVISIBLE : String(30);
  @sap.display.format : 'Date'
  @sap.label : 'DATE'
  YY8_WEEK_ENDING2 : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Week End VBAP'
  YY9_ZZWEEK_END_VBAP : Date;
  @sap.label : 'Employee Type'
  YY10_EMPLOYEE_TYPE : String(3);
  @sap.label : 'Eight Day Week'
  YY11_EIGHT_DAY_WEEK : String(1);
  @sap.label : 'Day 1 Shift 1 RG'
  YY12_DAY1_SHIFT1_RG : Decimal(15, 0);
  @sap.label : 'Day 1 Shift 1 Overtime'
  YY13_DAY1_SHIFT1_OT : Decimal(15, 0);
  @sap.label : 'Day 1 Shift 1 DoubleTime'
  YY14_DAY1_SHIFT1_DB : Decimal(15, 0);
  @sap.label : 'Day 1 Shift 2 RG'
  YY15_DAY1_SHIFT2_RG : Decimal(15, 0);
  @sap.label : 'Day 1 Shift 2 Overtime'
  YY16_DAY1_SHIFT2_OT : Decimal(15, 0);
  @sap.label : 'Day 1 Shift 2 DoubleTime'
  YY17_DAY1_SHIFT2_DB : Decimal(15, 0);
  @sap.label : 'Day 1 Shift 3 RG'
  YY18_DAY1_SHIFT3_RG : Decimal(15, 0);
  @sap.label : 'Day 1 Shift 3 Overtime'
  YY19_DAY1_SHIFT3_OT : Decimal(15, 0);
  @sap.label : 'Day 1 Shift 3 DoubleTime'
  YY20_DAY1_SHIFT3_DB : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Day One'
  YY21_DAY_ONE : Date;
  @sap.label : 'Daily: Enter 1 if Day 1 Worked'
  YY22_DAY_ONE_WORKED : Decimal(1, 0);
  @sap.label : 'Day 2 Shift 1 RG'
  YY23_DAY2_SHIFT1_RG : Decimal(15, 0);
  @sap.label : 'Day 2 Shift 1 Overtime'
  YY24_DAY2_SHIFT1_OT : Decimal(15, 0);
  @sap.label : 'Day 2 Shift 1 DoubleTime'
  YY25_DAY2_SHIFT1_DB : Decimal(14, 0);
  @sap.label : 'Day 2 Shift 2 RG'
  YY26_DAY2_SHIFT2_RG : Decimal(15, 0);
  @sap.label : 'Day 2 Shift 2 Overtime'
  YY27_DAY2_SHIFT2_OT : Decimal(15, 0);
  @sap.label : 'Day 2 Shift 2 DoubleTime'
  YY28_DAY2_SHIFT2_DB : Decimal(15, 0);
  @sap.label : 'Day 2 Shift 3 RG'
  YY29_DAY2_SHIFT3_RG : Decimal(15, 0);
  @sap.label : 'Day 2 Shift 3 Overtime'
  YY30_DAY2_SHIFT3_OT : Decimal(15, 0);
  @sap.label : 'Day 2 Shift 3 DoubleTime'
  YY31_DAY2_SHIFT3_DB : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Day Two'
  YY32_DAY_TWO : Date;
  @sap.label : 'Daily: Enter 1 if Day 2 Worked'
  YY33_DAY_TWO_WORKED : Decimal(1, 0);
  @sap.label : 'Day 3 Shift 1 RG'
  YY34_DAY3_SHIFT1_RG : Decimal(15, 0);
  @sap.label : 'Day 3 Shift 1 Overtime'
  YY35_DAY3_SHIFT1_OT : Decimal(15, 0);
  @sap.label : 'Day 3 Shift 1 DoubleTime'
  YY36_DAY3_SHIFT1_DB : Decimal(15, 0);
  @sap.label : 'Day 3 Shift 2 RG'
  YY37_DAY3_SHIFT2_RG : Decimal(15, 0);
  @sap.label : 'Day 3 Shift 2 Overtime'
  YY38_DAY3_SHIFT2_OT : Decimal(15, 0);
  @sap.label : 'Day 3 Shift 2 DoubleTime'
  YY39_DAY3_SHIFT2_DB : Decimal(15, 0);
  @sap.label : 'Day 3 Shift 3 RG'
  YY40_DAY3_SHIFT3_RG : Decimal(15, 0);
  @sap.label : 'Day 3 Shift 3 Overtime'
  YY41_DAY3_SHIFT3_OT : Decimal(15, 0);
  @sap.label : 'Day 3 Shift 3 DoubleTime'
  YY42_DAY3_SHIFT3_DB : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Day Three'
  YY43_DAY_THREE : Date;
  @sap.label : 'Daily: Enter 1 if Day 3 Worked'
  YY44_DAY_THREE_WORKED : Decimal(1, 0);
  @sap.label : 'Day 4 Shift 1 RG'
  YY45_DAY4_SHIFT1_RG : Decimal(15, 0);
  @sap.label : 'Day 4 Shift 1 Overtime'
  YY46_DAY4_SHIFT1_OT : Decimal(15, 0);
  @sap.label : 'Day 4 Shift 1 DoubleTime'
  YY47_DAY4_SHIFT1_DB : Decimal(15, 0);
  @sap.label : 'Day 4 Shift 2 RG'
  YY48_DAY4_SHIFT2_RG : Decimal(15, 0);
  @sap.label : 'Day 4 Shift 2 OT'
  YY49_DAY4_SHIFT2_OT : Decimal(15, 0);
  @sap.label : 'Day 4 Shift 2 DoubleTime'
  YY50_DAY4_SHIFT2_DB : Decimal(15, 0);
  @sap.label : 'Day 4 Shift 3 RG'
  YY51_DAY4_SHIFT3_RG : Decimal(15, 0);
  @sap.label : 'Day 4 Shift 3 Overtime'
  YY52_DAY4_SHIFT3_OT : Decimal(15, 0);
  @sap.label : 'Day 4 Shift 3 DoubleTime'
  YY53_DAY4_SHIFT3_DB : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Day Four'
  YY54_DAY_FOUR : Date;
  @sap.label : 'Daily: Enter 1 if Day 4 Worked'
  YY55_DAY_FOUR_WORKED : Decimal(1, 0);
  @sap.label : 'Day 5 Shift 1 RG'
  YY56_DAY5_SHIFT1_RG : Decimal(15, 0);
  @sap.label : 'Day 5 Shift 1 Overtime'
  YY57_DAY5_SHIFT1_OT : Decimal(15, 0);
  @sap.label : 'Day 5 Shift 1 DoubleTime'
  YY58_DAY5_SHIFT1_DB : Decimal(15, 0);
  @sap.label : 'Day 5 Shift 2 RG'
  YY59_DAY5_SHIFT2_RG : Decimal(15, 0);
  @sap.label : 'Day 5 Shift 2 Overtime'
  YY60_DAY5_SHIFT2_OT : Decimal(15, 0);
  @sap.label : 'Day 5 Shift 2 DoubleTime'
  YY61_DAY5_SHIFT2_DB : Decimal(15, 0);
  @sap.label : 'Day 5 Shift 3 RG'
  YY62_DAY5_SHIFT3_RG : Decimal(15, 0);
  @sap.label : 'Day 5 Shift 3 Overtime'
  YY63_DAY5_SHIFT3_OT : Decimal(15, 0);
  @sap.label : 'Day 5 Shift 3 DoubleTime'
  YY64_DAY5_SHIFT3_DB : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Day Five'
  YY65_DAY_FIVE : Date;
  @sap.label : 'Daily: Enter 1 if Day 5 Worked'
  YY66_DAY_FIVE_WORKED : Decimal(1, 0);
  @sap.label : 'Day 6 Shift 1 RG'
  YY67_DAY6_SHIFT1_RG : Decimal(15, 0);
  @sap.label : 'Day 6 Shift 1 Overtime'
  YY68_DAY6_SHIFT1_OT : Decimal(15, 0);
  @sap.label : 'Day 6 Shift 1 DoubleTime'
  YY69_DAY6_SHIFT1_DB : Decimal(15, 0);
  @sap.label : 'Day 6 Shift 2 RG'
  YY70_DAY6_SHIFT2_RG : Decimal(15, 0);
  @sap.label : 'Day 6 Shift 2 Overtime'
  YY71_DAY6_SHIFT2_OT : Decimal(15, 0);
  @sap.label : 'Day 6 Shift 2 DoubleTime'
  YY72_DAY6_SHIFT2_DB : Decimal(15, 0);
  @sap.label : 'Day 6 Shift 3 RG'
  YY73_DAY6_SHIFT3_RG : Decimal(15, 0);
  @sap.label : 'Day 6 Shift 3 Overtime'
  YY74_DAY6_SHIFT3_OT : Decimal(15, 0);
  @sap.label : 'Day 6 Shift 3 DoubleTime'
  YY75_DAY6_SHIFT3_DB : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Day Six'
  YY76_DAY_SIX : Date;
  @sap.label : 'Daily: Enter 1 if Day 6 Worked'
  YY77_DAY_SIX_WORKED : Decimal(1, 0);
  @sap.label : 'Day 7 Shift 1 RG'
  YY78_DAY7_SHIFT1_RG : Decimal(15, 0);
  @sap.label : 'Day 7 Shift 1 Overtime'
  YY79_DAY7_SHIFT1_OT : Decimal(15, 0);
  @sap.label : 'Day 7 Shift 1 DoubleTime'
  YY80_DAY7_SHIFT1_DB : Decimal(15, 0);
  @sap.label : 'Day 7 Shift 2 RG'
  YY81_DAY7_SHIFT2_RG : Decimal(15, 0);
  @sap.label : 'Day 7 Shift 2 Overtime'
  YY82_DAY7_SHIFT2_OT : Decimal(15, 0);
  @sap.label : 'Day 7 Shift 2 DoubleTime'
  YY83_DAY7_SHIFT2_DB : Decimal(15, 0);
  @sap.label : 'Day 7 Shift 3 RG'
  YY84_DAY7_SHIFT3_RG : Decimal(15, 0);
  @sap.label : 'Day 7 Shift 3 Overtime'
  YY85_DAY7_SHIFT3_OT : Decimal(15, 0);
  @sap.label : 'Day 7 Shift 3 DoubleTime'
  YY86_DAY7_SHIFT3_DB : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Day Seven'
  YY87_DAY_SEVEN : Date;
  @sap.label : 'Daily: Enter 1 if Day 7 Worked'
  YY88_DAY_SEVEN_WORKED : Decimal(1, 0);
  @sap.label : 'Day 8 Shift 1 RG'
  YY89_DAY8_SHIFT1_RG : Decimal(15, 0);
  @sap.label : 'Day 8 Shift 1 Overtime'
  YY90_DAY8_SHIFT1_OT : Decimal(15, 0);
  @sap.label : 'Day 8 Shift 1 DoubleTime'
  YY91_DAY8_SHIFT1_DB : Decimal(15, 0);
  @sap.label : 'Day 8 Shift 2 RG'
  YY92_DAY8_SHIFT2_RG : Decimal(15, 0);
  @sap.label : 'Day 8 Shift 2 Overtime'
  YY93_DAY8_SHIFT2_OT : Decimal(15, 0);
  @sap.label : 'Day 8 Shift 2 DoubleTime'
  YY94_DAY8_SHIFT2_DB : Decimal(15, 0);
  @sap.label : 'Day 8 Shift 3 Regular Time'
  YY95_DAY8_SHIFT3_RG : Decimal(15, 0);
  @sap.label : 'Day 8 Shift 3 Overtime'
  YY96_DAY8_SHIFT3_OT : Decimal(15, 0);
  @sap.label : 'Day 8 Shift 3 DoubleTime'
  YY97_DAY8_SHIFT3_DB : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Day Eight'
  YY98_DAY_EIGHT : Date;
  @sap.label : 'Daily: Enter 1 if Day 8 Worked'
  YY99_DAY_EIGHT_WORKED : Decimal(1, 0);
  @sap.label : 'Shift 1 Total Hours RG'
  YY100_SHIFT1_TOTAL_HRS_RG : Decimal(15, 0);
  @sap.label : 'Shift 1 Total Hours OT'
  YY101_SHIFT1_TOTAL_HRS_OT : Decimal(15, 0);
  @sap.label : 'Shift 1 Total Hours DB'
  YY102_SHIFT1_TOTAL_HRS_DB : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Hours RG'
  YY103_SHIFT2_TOTAL_HRS_RG : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Hours OT'
  YY104_SHIFT2_TOTAL_HRS_OT : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Hours DB'
  YY105_SHIFT2_TOTAL_HRS_DB : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Hours RG'
  YY106_SHIFT3_TOTAL_HRS_RG : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Hours OT'
  YY107_SHIFT3_TOTAL_HRS_OT : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Hours DB'
  YY108_SHIFT3_TOTAL_HRS_DB : Decimal(15, 0);
  @sap.label : 'Shift 1 Price RG'
  YY109_SHIFT1_PRICE_RG : Decimal(15, 0);
  @sap.label : 'Shift 1 Price OT'
  YY110_SHIFT1_PRICE_OT : Decimal(15, 0);
  @sap.label : 'Shift 1 Price DB'
  YY111_SHIFT1_PRICE_DB : Decimal(15, 0);
  @sap.label : 'Shift 2 Price RG'
  YY112_SHIFT2_PRICE_RG : Decimal(15, 0);
  @sap.label : 'Shift 2 Price OT'
  YY113_SHIFT2_PRICE_OT : Decimal(15, 0);
  @sap.label : 'Shift 2 Price DB'
  YY114_SHIFT2_PRICE_DB : Decimal(15, 0);
  @sap.label : 'Shift 3 Price RG'
  YY115_SHIFT3_PRICE_RG : Decimal(15, 0);
  @sap.label : 'Shift 3 Price OT'
  YY116_SHIFT3_PRICE_OT : Decimal(15, 0);
  @sap.label : 'Shift 3 Price DB'
  YY117_SHIFT3_PRICE_DB : Decimal(15, 0);
  @sap.label : 'Straight time Mark Up %'
  YY118_MARK_UP_RG : Decimal(15, 0);
  @sap.label : 'Overtime Mark Up %'
  YY119_MARK_UP_OT : Decimal(15, 0);
  @sap.label : 'Double Time Mark Up %'
  YY120_MARK_UP_DB : Decimal(15, 0);
  @sap.label : 'Shift 1 Total Price RG'
  YY121_SHIFT1_TOTAL_PRICE_RG : Decimal(15, 0);
  @sap.label : 'Shift 1 Total Price OT'
  YY122_SHIFT1_TOTAL_PRICE_OT : Decimal(15, 0);
  @sap.label : 'Shift 1 Total Price DB'
  YY123_SHIFT1_TOTAL_PRICE_DB : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Price RG'
  YY124_SHIFT2_TOTAL_PRICE_RG : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Price OT'
  YY125_SHIFT2_TOTAL_PRICE_OT : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Price DB'
  YY126_SHIFT2_TOTAL_PRICE_DB : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Pay RG'
  YY127_SHIFT3_TOTAL_PAY_RG : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Pay OT'
  YY128_SHIFT3_TOTAL_PAY_OT : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Pay DB'
  YY129_SHIFT3_TOTAL_PAY_DB : Decimal(15, 0);
  @sap.label : 'MS Admin Fee'
  YY130_ADMIN_FEE_PRICE : Decimal(15, 0);
};

@cds.external : true
action YY1_SALESVCDATA_1_CDS.YY1_SALESVCDATA_1Sap_upsert(
  @sap.label : 'Text of length 20'
  SalesOrderNumber : String(20),
  @sap.label : 'Text of length 20'
  SalesOrderItemNum : String(20),
  @sap.label : 'Billing Document Number'
  Billing_Document_Number : Decimal(10, 0),
  @sap.label : 'Billing Document Item Number'
  Billing_Document_Item_Number : Decimal(4, 0),
  @sap.label : 'Text of length 4'
  Custom_Sales_Order_Type : String(4),
  @sap.label : 'Text of length 4'
  Custom_Billing_type : String(4),
  @sap.label : 'Text of length 2'
  YY1_ACA_RG_ONLY : String(2),
  @sap.label : 'ACA Hours'
  YY2_ACA_HRS : Decimal(15, 0),
  @sap.label : 'ACA Hours Price'
  YY3_ACA_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'ACA Total Hours Price'
  YY4_ACA_TOTAL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Line Item Number'
  YY5_LINE_ITEM_NUMBER : Decimal(15, 0),
  @sap.label : 'Text of length 30'
  YY6_SC_LINE_ITEM_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY7_INVISIBLE : String(30),
  @sap.label : 'DATE'
  @sap.display.format : 'Date'
  YY8_WEEK_ENDING2 : Date,
  @sap.label : 'Week End VBAP'
  @sap.display.format : 'Date'
  YY9_ZZWEEK_END_VBAP : Date,
  @sap.label : 'Text of length 3'
  YY10_EMPLOYEE_TYPE : String(3),
  @sap.label : 'Text of length 1'
  YY11_EIGHT_DAY_WEEK : String(1),
  @sap.label : 'Day 1 Shift 1 RG'
  YY12_DAY1_SHIFT1_RG : Decimal(15, 0),
  @sap.label : 'Day 1 Shift 1 Overtime'
  YY13_DAY1_SHIFT1_OT : Decimal(15, 0),
  @sap.label : 'Day 1 Shift 1 DoubleTime'
  YY14_DAY1_SHIFT1_DB : Decimal(15, 0),
  @sap.label : 'Day 1 Shift 2 RG'
  YY15_DAY1_SHIFT2_RG : Decimal(15, 0),
  @sap.label : 'Day 1 Shift 2 Overtime'
  YY16_DAY1_SHIFT2_OT : Decimal(15, 0),
  @sap.label : 'Day 1 Shift 2 DoubleTime'
  YY17_DAY1_SHIFT2_DB : Decimal(15, 0),
  @sap.label : 'Day 1 Shift 3 RG'
  YY18_DAY1_SHIFT3_RG : Decimal(15, 0),
  @sap.label : 'Day 1 Shift 3 Overtime'
  YY19_DAY1_SHIFT3_OT : Decimal(15, 0),
  @sap.label : 'Day 1 Shift 3 DoubleTime'
  YY20_DAY1_SHIFT3_DB : Decimal(15, 0),
  @sap.label : 'Day One'
  @sap.display.format : 'Date'
  YY21_DAY_ONE : Date,
  @sap.label : 'Daily: Enter 1 if Day 1 Worked'
  YY22_DAY_ONE_WORKED : Decimal(1, 0),
  @sap.label : 'Day 2 Shift 1 RG'
  YY23_DAY2_SHIFT1_RG : Decimal(15, 0),
  @sap.label : 'Day 2 Shift 1 Overtime'
  YY24_DAY2_SHIFT1_OT : Decimal(15, 0),
  @sap.label : 'Day 2 Shift 1 DoubleTime'
  YY25_DAY2_SHIFT1_DB : Decimal(14, 0),
  @sap.label : 'Day 2 Shift 2 RG'
  YY26_DAY2_SHIFT2_RG : Decimal(15, 0),
  @sap.label : 'Day 2 Shift 2 Overtime'
  YY27_DAY2_SHIFT2_OT : Decimal(15, 0),
  @sap.label : 'Day 2 Shift 2 DoubleTime'
  YY28_DAY2_SHIFT2_DB : Decimal(15, 0),
  @sap.label : 'Day 2 Shift 3 RG'
  YY29_DAY2_SHIFT3_RG : Decimal(15, 0),
  @sap.label : 'Day 2 Shift 3 Overtime'
  YY30_DAY2_SHIFT3_OT : Decimal(15, 0),
  @sap.label : 'Day 2 Shift 3 DoubleTime'
  YY31_DAY2_SHIFT3_DB : Decimal(15, 0),
  @sap.label : 'Day Two'
  @sap.display.format : 'Date'
  YY32_DAY_TWO : Date,
  @sap.label : 'Daily: Enter 1 if Day 2 Worked'
  YY33_DAY_TWO_WORKED : Decimal(1, 0),
  @sap.label : 'Day 3 Shift 1 RG'
  YY34_DAY3_SHIFT1_RG : Decimal(15, 0),
  @sap.label : 'Day 3 Shift 1 Overtime'
  YY35_DAY3_SHIFT1_OT : Decimal(15, 0),
  @sap.label : 'Day 3 Shift 1 DoubleTime'
  YY36_DAY3_SHIFT1_DB : Decimal(15, 0),
  @sap.label : 'Day 3 Shift 2 RG'
  YY37_DAY3_SHIFT2_RG : Decimal(15, 0),
  @sap.label : 'Day 3 Shift 2 Overtime'
  YY38_DAY3_SHIFT2_OT : Decimal(15, 0),
  @sap.label : 'Day 3 Shift 2 DoubleTime'
  YY39_DAY3_SHIFT2_DB : Decimal(15, 0),
  @sap.label : 'Day 3 Shift 3 RG'
  YY40_DAY3_SHIFT3_RG : Decimal(15, 0),
  @sap.label : 'Day 3 Shift 3 Overtime'
  YY41_DAY3_SHIFT3_OT : Decimal(15, 0),
  @sap.label : 'Day 3 Shift 3 DoubleTime'
  YY42_DAY3_SHIFT3_DB : Decimal(15, 0),
  @sap.label : 'Day Three'
  @sap.display.format : 'Date'
  YY43_DAY_THREE : Date,
  @sap.label : 'Daily: Enter 1 if Day 3 Worked'
  YY44_DAY_THREE_WORKED : Decimal(1, 0),
  @sap.label : 'Day 4 Shift 1 RG'
  YY45_DAY4_SHIFT1_RG : Decimal(15, 0),
  @sap.label : 'Day 4 Shift 1 Overtime'
  YY46_DAY4_SHIFT1_OT : Decimal(15, 0),
  @sap.label : 'Day 4 Shift 1 DoubleTime'
  YY47_DAY4_SHIFT1_DB : Decimal(15, 0),
  @sap.label : 'Day 4 Shift 2 RG'
  YY48_DAY4_SHIFT2_RG : Decimal(15, 0),
  @sap.label : 'Day 4 Shift 2 OT'
  YY49_DAY4_SHIFT2_OT : Decimal(15, 0),
  @sap.label : 'Day 4 Shift 2 DoubleTime'
  YY50_DAY4_SHIFT2_DB : Decimal(15, 0),
  @sap.label : 'Day 4 Shift 3 RG'
  YY51_DAY4_SHIFT3_RG : Decimal(15, 0),
  @sap.label : 'Day 4 Shift 3 Overtime'
  YY52_DAY4_SHIFT3_OT : Decimal(15, 0),
  @sap.label : 'Day 4 Shift 3 DoubleTime'
  YY53_DAY4_SHIFT3_DB : Decimal(15, 0),
  @sap.label : 'Day Four'
  @sap.display.format : 'Date'
  YY54_DAY_FOUR : Date,
  @sap.label : 'Daily: Enter 1 if Day 4 Worked'
  YY55_DAY_FOUR_WORKED : Decimal(1, 0),
  @sap.label : 'Day 5 Shift 1 RG'
  YY56_DAY5_SHIFT1_RG : Decimal(15, 0),
  @sap.label : 'Day 5 Shift 1 Overtime'
  YY57_DAY5_SHIFT1_OT : Decimal(15, 0),
  @sap.label : 'Day 5 Shift 1 DoubleTime'
  YY58_DAY5_SHIFT1_DB : Decimal(15, 0),
  @sap.label : 'Day 5 Shift 2 RG'
  YY59_DAY5_SHIFT2_RG : Decimal(15, 0),
  @sap.label : 'Day 5 Shift 2 Overtime'
  YY60_DAY5_SHIFT2_OT : Decimal(15, 0),
  @sap.label : 'Day 5 Shift 2 DoubleTime'
  YY61_DAY5_SHIFT2_DB : Decimal(15, 0),
  @sap.label : 'Day 5 Shift 3 RG'
  YY62_DAY5_SHIFT3_RG : Decimal(15, 0),
  @sap.label : 'Day 5 Shift 3 Overtime'
  YY63_DAY5_SHIFT3_OT : Decimal(15, 0),
  @sap.label : 'Day 5 Shift 3 DoubleTime'
  YY64_DAY5_SHIFT3_DB : Decimal(15, 0),
  @sap.label : 'Day Five'
  @sap.display.format : 'Date'
  YY65_DAY_FIVE : Date,
  @sap.label : 'Daily: Enter 1 if Day 5 Worked'
  YY66_DAY_FIVE_WORKED : Decimal(1, 0),
  @sap.label : 'Day 6 Shift 1 RG'
  YY67_DAY6_SHIFT1_RG : Decimal(15, 0),
  @sap.label : 'Day 6 Shift 1 Overtime'
  YY68_DAY6_SHIFT1_OT : Decimal(15, 0),
  @sap.label : 'Day 6 Shift 1 DoubleTime'
  YY69_DAY6_SHIFT1_DB : Decimal(15, 0),
  @sap.label : 'Day 6 Shift 2 RG'
  YY70_DAY6_SHIFT2_RG : Decimal(15, 0),
  @sap.label : 'Day 6 Shift 2 Overtime'
  YY71_DAY6_SHIFT2_OT : Decimal(15, 0),
  @sap.label : 'Day 6 Shift 2 DoubleTime'
  YY72_DAY6_SHIFT2_DB : Decimal(15, 0),
  @sap.label : 'Day 6 Shift 3 RG'
  YY73_DAY6_SHIFT3_RG : Decimal(15, 0),
  @sap.label : 'Day 6 Shift 3 Overtime'
  YY74_DAY6_SHIFT3_OT : Decimal(15, 0),
  @sap.label : 'Day 6 Shift 3 DoubleTime'
  YY75_DAY6_SHIFT3_DB : Decimal(15, 0),
  @sap.label : 'Day Six'
  @sap.display.format : 'Date'
  YY76_DAY_SIX : Date,
  @sap.label : 'Daily: Enter 1 if Day 6 Worked'
  YY77_DAY_SIX_WORKED : Decimal(1, 0),
  @sap.label : 'Day 7 Shift 1 RG'
  YY78_DAY7_SHIFT1_RG : Decimal(15, 0),
  @sap.label : 'Day 7 Shift 1 Overtime'
  YY79_DAY7_SHIFT1_OT : Decimal(15, 0),
  @sap.label : 'Day 7 Shift 1 DoubleTime'
  YY80_DAY7_SHIFT1_DB : Decimal(15, 0),
  @sap.label : 'Day 7 Shift 2 RG'
  YY81_DAY7_SHIFT2_RG : Decimal(15, 0),
  @sap.label : 'Day 7 Shift 2 Overtime'
  YY82_DAY7_SHIFT2_OT : Decimal(15, 0),
  @sap.label : 'Day 7 Shift 2 DoubleTime'
  YY83_DAY7_SHIFT2_DB : Decimal(15, 0),
  @sap.label : 'Day 7 Shift 3 RG'
  YY84_DAY7_SHIFT3_RG : Decimal(15, 0),
  @sap.label : 'Day 7 Shift 3 Overtime'
  YY85_DAY7_SHIFT3_OT : Decimal(15, 0),
  @sap.label : 'Day 7 Shift 3 DoubleTime'
  YY86_DAY7_SHIFT3_DB : Decimal(15, 0),
  @sap.label : 'Day Seven'
  @sap.display.format : 'Date'
  YY87_DAY_SEVEN : Date,
  @sap.label : 'Daily: Enter 1 if Day 7 Worked'
  YY88_DAY_SEVEN_WORKED : Decimal(1, 0),
  @sap.label : 'Day 8 Shift 1 RG'
  YY89_DAY8_SHIFT1_RG : Decimal(15, 0),
  @sap.label : 'Day 8 Shift 1 Overtime'
  YY90_DAY8_SHIFT1_OT : Decimal(15, 0),
  @sap.label : 'Day 8 Shift 1 DoubleTime'
  YY91_DAY8_SHIFT1_DB : Decimal(15, 0),
  @sap.label : 'Day 8 Shift 2 RG'
  YY92_DAY8_SHIFT2_RG : Decimal(15, 0),
  @sap.label : 'Day 8 Shift 2 Overtime'
  YY93_DAY8_SHIFT2_OT : Decimal(15, 0),
  @sap.label : 'Day 8 Shift 2 DoubleTime'
  YY94_DAY8_SHIFT2_DB : Decimal(15, 0),
  @sap.label : 'Day 8 Shift 3 Regular Time'
  YY95_DAY8_SHIFT3_RG : Decimal(15, 0),
  @sap.label : 'Day 8 Shift 3 Overtime'
  YY96_DAY8_SHIFT3_OT : Decimal(15, 0),
  @sap.label : 'Day 8 Shift 3 DoubleTime'
  YY97_DAY8_SHIFT3_DB : Decimal(15, 0),
  @sap.label : 'Day Eight'
  @sap.display.format : 'Date'
  YY98_DAY_EIGHT : Date,
  @sap.label : 'Daily: Enter 1 if Day 8 Worked'
  YY99_DAY_EIGHT_WORKED : Decimal(1, 0),
  @sap.label : 'Shift 1 Total Hours RG'
  YY100_SHIFT1_TOTAL_HRS_RG : Decimal(15, 0),
  @sap.label : 'Shift 1 Total Hours OT'
  YY101_SHIFT1_TOTAL_HRS_OT : Decimal(15, 0),
  @sap.label : 'Shift 1 Total Hours DB'
  YY102_SHIFT1_TOTAL_HRS_DB : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Hours RG'
  YY103_SHIFT2_TOTAL_HRS_RG : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Hours OT'
  YY104_SHIFT2_TOTAL_HRS_OT : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Hours DB'
  YY105_SHIFT2_TOTAL_HRS_DB : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Hours RG'
  YY106_SHIFT3_TOTAL_HRS_RG : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Hours OT'
  YY107_SHIFT3_TOTAL_HRS_OT : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Hours DB'
  YY108_SHIFT3_TOTAL_HRS_DB : Decimal(15, 0),
  @sap.label : 'Shift 1 Price RG'
  YY109_SHIFT1_PRICE_RG : Decimal(15, 0),
  @sap.label : 'Shift 1 Price OT'
  YY110_SHIFT1_PRICE_OT : Decimal(15, 0),
  @sap.label : 'Shift 1 Price DB'
  YY111_SHIFT1_PRICE_DB : Decimal(15, 0),
  @sap.label : 'Shift 2 Price RG'
  YY112_SHIFT2_PRICE_RG : Decimal(15, 0),
  @sap.label : 'Shift 2 Price OT'
  YY113_SHIFT2_PRICE_OT : Decimal(15, 0),
  @sap.label : 'Shift 2 Price DB'
  YY114_SHIFT2_PRICE_DB : Decimal(15, 0),
  @sap.label : 'Shift 3 Price RG'
  YY115_SHIFT3_PRICE_RG : Decimal(15, 0),
  @sap.label : 'Shift 3 Price OT'
  YY116_SHIFT3_PRICE_OT : Decimal(15, 0),
  @sap.label : 'Shift 3 Price DB'
  YY117_SHIFT3_PRICE_DB : Decimal(15, 0),
  @sap.label : 'Straight time Mark Up %'
  YY118_MARK_UP_RG : Decimal(15, 0),
  @sap.label : 'Overtime Mark Up %'
  YY119_MARK_UP_OT : Decimal(15, 0),
  @sap.label : 'Double Time Mark Up %'
  YY120_MARK_UP_DB : Decimal(15, 0),
  @sap.label : 'Shift 1 Total Price RG'
  YY121_SHIFT1_TOTAL_PRICE_RG : Decimal(15, 0),
  @sap.label : 'Shift 1 Total Price OT'
  YY122_SHIFT1_TOTAL_PRICE_OT : Decimal(15, 0),
  @sap.label : 'Shift 1 Total Price DB'
  YY123_SHIFT1_TOTAL_PRICE_DB : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Price RG'
  YY124_SHIFT2_TOTAL_PRICE_RG : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Price OT'
  YY125_SHIFT2_TOTAL_PRICE_OT : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Price DB'
  YY126_SHIFT2_TOTAL_PRICE_DB : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Pay RG'
  YY127_SHIFT3_TOTAL_PAY_RG : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Pay OT'
  YY128_SHIFT3_TOTAL_PAY_OT : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Pay DB'
  YY129_SHIFT3_TOTAL_PAY_DB : Decimal(15, 0),
  @sap.label : 'MS Admin Fee'
  YY130_ADMIN_FEE_PRICE : Decimal(15, 0)
) returns YY1_SALESVCDATA_1_CDS.YY1_SALESVCDATA_1;

