/* checksum : d9d49ab95805a7f287e978d3f826c68e */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service YY1_SALESVCDATA_2_CDS_0001 {};

@cds.external : true
@cds.persistence.skip : true
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'SalesVCData_2'
entity YY1_SALESVCDATA_2_CDS_0001.YY1_SALESVCDATA_2 {
  @sap.label : 'UUID'
  @sap.quickinfo : '16 Byte UUID in 16 Bytes (Raw Format)'
  key SAP_UUID : UUID not null;
  @sap.label : 'Sales Order Number'
  Sales_Order_Number : String(20);
  @sap.label : 'Sales Order Item Num'
  Sales_Order_Item_Num : String(20);
  @sap.label : 'Billing Document Number'
  Billing_Document_Number : String(20);
  @sap.label : 'Billing Document Item Number'
  Billing_Document_Item_Number : String(20);
  @sap.label : 'Distribution Channel'
  YY131_DC : String(2);
  @sap.label : 'H&W Vendor Pay Rate'
  YY132_HW_PAY_VENDOR : Decimal(15, 0);
  @sap.label : 'H&W Total Pay Vendor'
  YY133_HW_TOTAL_VENDOR : Decimal(15, 0);
  @sap.label : 'Daily Vendor Pay Amount'
  YY134_DAILY_PAY_VENDOR : Decimal(15, 0);
  @sap.label : 'Daily Total Pay Vendor'
  YY135_DAILY_TOTAL_VENDOR : Decimal(15, 0);
  @sap.label : 'Holiday Vendor Pay Rate'
  YY136_HOLIDAY_PAY_VENDOR : Decimal(15, 0);
  @sap.label : 'Holiday Total Pay Vendor'
  YY137_HOLIDAY_TOTAL_VENDOR : Decimal(15, 0);
  @sap.label : 'Oncall Vendor Pay Rate'
  YY138_ONCALL_PAY_VENDOR : Decimal(15, 0);
  @sap.label : 'Oncall Total Pay Vendor'
  YY139_ONCALL_TOTAL_VENDOR : Decimal(15, 0);
  @sap.label : 'Vacation Vendor Pay Rate'
  YY140_VACATION_PAY_VENDOR : Decimal(15, 0);
  @sap.label : 'Vacation Total Pay Vendor'
  YY141_VACATION_TOTAL_VENDOR : Decimal(15, 0);
  @sap.label : 'Salary Vendor Pay Amount'
  YY142_SALARY_PAY_VENDOR : Decimal(15, 0);
  @sap.label : 'Direct Placement Fee'
  YY143_DIRECT_PLACEMENT : Decimal(15, 0);
  @sap.label : 'Weekly Clock Fee'
  YY144_WEEKLY_CLOCK_FEE : Decimal(15, 0);
  @sap.label : 'Per Diem Days'
  YY145_PER_DIEM_DAYS : Decimal(15, 0);
  @sap.label : 'Per Diem Tax Price Per Day'
  YY146_PER_DIEM_TAX_PRICE : Decimal(15, 0);
  @sap.label : 'Per Diem No Tax Price Per Day'
  YY147_PER_DIEM_NOTAX_PRICE : Decimal(15, 0);
  @sap.label : 'Per Diem Taxable Total'
  YY148_PER_DIEM_TAX : Decimal(15, 0);
  @sap.label : 'Per Diem No Tax Total'
  YY149_PER_DIEM_NO_TAX : Decimal(15, 0);
  @sap.label : 'Daily Pay Days'
  YY150_DAILY_PAY_DAYS : Decimal(10, 2);
  @sap.label : 'Daily Pay Rate Per Day'
  YY151_DAILY_PRICE : Decimal(15, 0);
  @sap.label : 'Daily'
  YY152_DAILY_TOTAL_RATE : Decimal(15, 0);
  @sap.label : 'Sick Days'
  YY153_SICK_DAYS : Decimal(15, 0);
  @sap.label : 'Sick Days Price'
  YY154_SICK_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Sick Days Total Price'
  YY155_SICK_TOTAL_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Sick Hours'
  YY156_SICK_HOURS : Decimal(15, 0);
  @sap.label : 'Sick Hours Price'
  YY157_SICK_HRS_PRICE : Decimal(10, 2);
  @sap.label : 'Sick Hours Total Price'
  YY158_SICK_TOTAL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Miscellaneous Amount'
  YY159_MISC : Decimal(15, 0);
  @sap.label : 'Bereavement Days'
  YY160_BEREAV_DAYS : Decimal(15, 0);
  @sap.label : 'Bereavement Hours'
  YY161_BEREAV_HRS : Decimal(15, 0);
  @sap.label : 'Bereavement Hourly Rate'
  YY162_BEREAV_HRS_RATE : Decimal(15, 0);
  @sap.label : 'Bereavement Daily Rate'
  YY163_BEREAV_DAYS_RATE : Decimal(15, 0);
  @sap.label : 'Bereavement Hours Total Price'
  YY164_BEREAV_TOTAL_HRS_RATE : Decimal(15, 0);
  @sap.label : 'Bereavement Day Total Price'
  YY165_BEREAV_TOTAL_DAYS_RATE : Decimal(15, 0);
  @sap.label : 'Bonus'
  YY166_BONUS_PRICE : Decimal(15, 0);
  @sap.label : 'Bonus Vendor Pay Amount'
  YY167_BONUS_PAY_RATE : Decimal(15, 0);
  @sap.label : 'Commission'
  YY168_COMMISSION_PRICE : Decimal(15, 0);
  @sap.label : 'Holiday Days'
  YY169_HOL_DAYS : Decimal(15, 0);
  @sap.label : 'Holiday Hours'
  YY170_HOL_HRS : Decimal(15, 0);
  @sap.label : 'Holiday Hourly Rate'
  YY171_HOL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Holiday Daily Rate'
  YY172_HOL_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Holiday Hourly Total Price'
  YY173_HOL_TOTAL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Holiday Daily Total Price'
  YY174_HOL_TOTAL_DAYS_PRICE : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Holiday Date'
  YY175_HOLIDAY_DATE : Date;
  @sap.label : 'H&W Hours'
  YY176_HW_HRS : Decimal(15, 0);
  @sap.label : 'H&W Rate'
  YY177_HW_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'HW'
  YY178_HW_TOTAL_PRICE : Decimal(15, 0);
  @sap.label : 'Jury Duty Days'
  YY179_JURY_DAYS : Decimal(15, 0);
  @sap.label : 'Jury Duty Hours'
  YY180_JURY_HRS : Decimal(15, 0);
  @sap.label : 'Jury Duty HRs Rate'
  YY181_JURY_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Jury Duty Daily Rate'
  YY182_JURY_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Jury Duty Total HRs'
  YY183_JURY_TOTAL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Jury Duty Total Days'
  YY184_JURY_TOTAL_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Longevity Days'
  YY185_LONGEVITY_DAYS : Decimal(15, 0);
  @sap.label : 'Longevity Hours'
  YY186_LONGEVITY_HRS : Decimal(15, 0);
  @sap.label : 'Longevity Hours Price'
  YY187_LONGEVITY_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Longevity Days Price'
  YY188_LONGEVITY_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Longevity Total HRs Price'
  YY189_LONGEVITY_TOTAL_HRS_PR : Decimal(15, 0);
  @sap.label : 'Longevity Total Days Price'
  YY190_LONGEVITY_TOTAL_DAYS_P : Decimal(15, 0);
  @sap.label : 'Oncall Days'
  YY191_ONCALL_DAYS : Decimal(15, 0);
  @sap.label : 'Oncall Hours'
  YY192_ONCALL_HRS : Decimal(15, 0);
  @sap.label : 'Oncall Hours Price'
  YY193_ONCALL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Oncall Days Price'
  YY194_ONCALL_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Oncall Total HRs Price'
  YY195_ONCALL_TOTAL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Oncall Total Days Price'
  YY196_ONCALL_TOTAL_DAYS_PRIC : Decimal(15, 0);
  @sap.label : 'Retro Days'
  YY197_RETRO_DAYS : Decimal(15, 0);
  @sap.label : 'Retro Hours'
  YY198_RETRO_HRS : Decimal(15, 0);
  @sap.label : 'Retro Days Price'
  YY199_RETRO_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Retro Hours Price'
  YY200_RETRO_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Retro Total HRs Price'
  YY201_RETRO_TOTAL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Retro Total Days Price'
  YY202_RETRO_TOTAL_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Salary'
  YY203_SALARY : Decimal(15, 0);
  @sap.label : 'Severance Pay Days'
  YY204_SEV_PAY_DAYS : Decimal(15, 0);
  @sap.label : 'Severance Pay Hours'
  YY205_SEV_PAY_HRS : Decimal(15, 0);
  @sap.label : 'Severance Pay HRs Price'
  YY206_SEV_PAY_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Severance Pay Days Price'
  YY207_SEV_PAY_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Severance Pay Total HRs Price'
  YY208_SEV_PAY_TOTAL_HRS_PRIC : Decimal(15, 0);
  @sap.label : 'Severance Pay Total Days Price'
  YY209_SEV_PAY_TOTAL_DAYS_PRI : Decimal(15, 0);
  @sap.label : 'Vacation Billable Days'
  YY210_VAC_BILL_DAYS : Decimal(15, 0);
  @sap.label : 'Vacation Billable Hours'
  YY211_VAC_BILL_HRS : Decimal(15, 0);
  @sap.label : 'Vacation Billable Hrs Price'
  YY212_VAC_BILL_HRS_PRICE : Decimal(15, 0);
  @sap.label : 'Vacation Billable Days Price'
  YY213_VAC_BILL_DAYS_PRICE : Decimal(15, 0);
  @sap.label : 'Vac. Billable Tot Hrs Price'
  YY214_VAC_BILL_TOTAL_HRS_PRI : Decimal(15, 0);
  @sap.label : 'Vac Billable Tot Days Price'
  YY215_VAC_BILL_TOTAL_DAYS_PR : Decimal(15, 0);
  @sap.label : 'Customer Business Unit'
  @sap.quickinfo : 'Text of length 30'
  YY216_CUST_BUSINESS_UNIT : String(30);
  @sap.label : 'Customer Charge Number'
  @sap.quickinfo : 'Text of length 30'
  YY217_CUST_CHARGE_NUMBER : String(30);
  @sap.label : 'Project Number'
  @sap.quickinfo : 'Text of length 30'
  YY218_CUST_PROJECT_NUMBER : String(30);
  @sap.label : 'Customer Cost Center Old'
  @sap.quickinfo : 'Text of length 30'
  YY219_CUST_COST_CENTER : String(30);
  @sap.label : 'Customer Company Code'
  @sap.quickinfo : 'Text of length 30'
  YY220_CUST_COMPANY_CODE : String(30);
  @sap.label : 'Customer Department Number'
  @sap.quickinfo : 'Text of length 30'
  YY221_CUST_DEPT_NUMBER : String(30);
  @sap.label : 'Customer DOTS Number'
  @sap.quickinfo : 'Text of length 30'
  YY222_CUST_DOTS_NUMBER : String(30);
  @sap.label : 'Customer RUI'
  @sap.quickinfo : 'Text of length 30'
  YY223_CUST_RUI : String(30);
  @sap.label : 'Customer Account Number'
  @sap.quickinfo : 'Text of length 30'
  YY224_CUST_ACCT_NUMBER : String(30);
  @sap.label : 'Customer Budget Center'
  @sap.quickinfo : 'Text of length 30'
  YY225_CUST_BUDGET_CENTER : String(30);
  @sap.label : 'Customer Contract Number'
  @sap.quickinfo : 'Text of length 30'
  YY226_CUST_CON_NUMBER : String(30);
  @sap.label : 'SG Vendor Number'
  @sap.quickinfo : 'Text of length 30'
  YY227_CUST_VENDOR_NUMBER : String(30);
  @sap.label : 'Customer Org Code'
  @sap.quickinfo : 'Text of length 30'
  YY228_CUST_ORG_CODE : String(30);
  @sap.label : 'Customer Legal Entity'
  @sap.quickinfo : 'Text of length 30'
  YY229_CUST_LEGAL_ENTITY : String(30);
  @sap.label : 'Customer Oracle Number'
  @sap.quickinfo : 'Text of length 30'
  YY230_CUST_ORACLE_NUMBER : String(30);
  @sap.label : 'Customer Unit Store Number'
  @sap.quickinfo : 'Text of length 30'
  YY231_CUST_UNIT_STORE_NUMBER : String(30);
  @sap.display.format : 'Date'
  @sap.label : 'Service Date - FOR SDI IBM'
  YY232_CUST_SVC_DATE : Date;
  @sap.label : 'Customer Employee Number'
  @sap.quickinfo : 'Text of length 30'
  YY233_CUST_EMPLOYEE_NUMBER : String(30);
  @sap.label : 'Customer Agreement Name'
  @sap.quickinfo : 'Text of length 30'
  YY234_CUST_AGREE_NUMBER : String(30);
  @sap.label : 'TASK #'
  @sap.quickinfo : 'Text of length 30'
  YY235_CUST_TASK15 : String(30);
  @sap.label : 'FEPS Code'
  @sap.quickinfo : 'Text of length 30'
  YY236_CUST_FEPS_CODE : String(30);
  @sap.label : 'Customer Position'
  @sap.quickinfo : 'Text of length 30'
  YY237_CUST_POSITION : String(30);
  @sap.label : 'Customer G/L Code'
  @sap.quickinfo : 'Text of length 30'
  YY238_CUST_GL_CODE : String(30);
  @sap.label : 'Purchase Agreement'
  @sap.quickinfo : 'Text of length 30'
  YY239_CUST_PURCHASE_AGREE : String(30);
  @sap.label : 'BB#'
  @sap.quickinfo : 'Text of length 30'
  YY240_CUST_BB_NUMBER : String(30);
  @sap.display.format : 'Date'
  @sap.label : 'Customer Background Check Date'
  YY241_CUST_BGRD_CHECK_DATE : Date;
  @sap.label : 'Customer Division Unit Number'
  @sap.quickinfo : 'Text of length 30'
  YY242_CUST_DIV_UNIT_NUMBER : String(30);
  @sap.label : 'Customer Position Code/Job ID'
  @sap.quickinfo : 'Text of length 30'
  YY243_CUST_POSITION_CODE : String(30);
  @sap.label : 'Sales document item category'
  @sap.quickinfo : 'Text of length 4'
  YY244_ITEM_CATEGORY : String(4);
  @sap.label : 'Custom WN Invoice'
  @sap.quickinfo : 'Text of length 30'
  YY245_ZSD_WN_INVOICE_VBAP : String(30);
  @sap.label : 'WN Invoice Number'
  @sap.quickinfo : 'Text of length 30'
  YY246_ZSD_WN_INVOICE_VCSD : String(30);
  @sap.label : 'WN Work Order Number'
  @sap.quickinfo : 'Text of length 10'
  YY247_ZSD_WN_WORK_ORDER_VCSD : String(10);
  @sap.label : 'Sales and Distribution Document'
  @sap.quickinfo : 'Text of length 10'
  YY248_ZSD_WN_WORK_ORDER_VBAP : String(10);
  @sap.label : 'Cost Center VBAP'
  @sap.quickinfo : 'Text of length 30'
  YY249_CUST_COST_CENTER2_VBAP : String(30);
  @sap.label : 'Customer Cost Center'
  YY250_CUST_COST_CENTER2 : String(30);
  @sap.label : 'Shift 1 Pay Rate RG'
  YY251_SHIFT1_PAY_RATE_RG : Decimal(15, 0);
  @sap.label : 'Shift 1 Pay Rate OT'
  YY252_SHIFT1_PAY_RATE_OT : Decimal(15, 0);
  @sap.label : 'Shift 1 Pay Rate DB'
  YY253_SHIFT1_PAY_RATE_DB : Decimal(15, 0);
  @sap.label : 'Shift 2 Pay Rate RG'
  YY254_SHIFT2_PAY_RATE_RG : Decimal(15, 0);
  @sap.label : 'Shift 2 Pay Rate OT'
  YY255_SHIFT2_PAY_RATE_OT : Decimal(15, 0);
  @sap.label : 'Shift 2 Pay Rate DB'
  YY256_SHIFT2_PAY_RATE_DB : Decimal(15, 0);
  @sap.label : 'Shift 3 Pay Rate RG'
  YY257_SHIFT3_PAY_RATE_RG : Decimal(15, 0);
  @sap.label : 'Shift 3 Pay Rate OT'
  YY258_SHIFT3_PAY_RATE_OT : Decimal(15, 0);
  @sap.label : 'Shift 3 Pay Rate DB'
  YY259_SHIFT3_PAY_RATE_DB : Decimal(15, 0);
  @sap.label : 'Shift 1 Total Pay RG'
  YY260_SHIFT1_TOTAL_PAY_RG : Decimal(15, 0);
  @sap.label : 'Shift 1 Total Pay OT'
  YY261_SHIFT1_TOTAL_PAY_OT : Decimal(15, 0);
  @sap.label : 'Shift 1 Total Pay DB'
  YY262_SHIFT1_TOTAL_PAY_DB : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Pay RG'
  YY263_SHIFT2_TOTAL_PAY_RG : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Pay OT'
  YY264_SHIFT2_TOTAL_PAY_OT : Decimal(15, 0);
  @sap.label : 'Shift 2 Total Pay DB'
  YY265_SHIFT2_TOTAL_PAY_DB : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Pay RG'
  YY266_SHIFT3_TOTAL_PAY_RG : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Pay OT'
  YY267_SHIFT3_TOTAL_PAY_OT : Decimal(15, 0);
  @sap.label : 'Shift 3 Total Pay DB'
  YY268_SHIFT3_TOTAL_PAY_DB : Decimal(15, 0);
  @sap.label : 'Travel Expenses'
  TRAVEL_EXPENSE : Decimal(15, 0);
  @sap.label : 'Customer Category Code'
  CUST_CATERGORY_CODE2 : Decimal(15, 0);
  @sap.label : 'Accelerated Payment Fee'
  ACCELERATED_FEE_DISC_VEN : Decimal(15, 0);
  @sap.label : 'Original Customer PO Amount'
  ORIGINAL_PO_AMOUNT : Decimal(15, 0);
  @sap.display.format : 'Date'
  @sap.label : 'Service Start Date'
  SERVICE_START_DATE : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Service End Date'
  SERVICE_END_DATE : Date;
  @sap.label : 'Hybrid Pricing?'
  HYBRID_PRICING : String(30);
  @sap.label : 'Cust PO Line Item Number'
  SC_LINE_ITEM_NUMBER : Decimal(15, 0);
  @sap.label : 'Drug Screening'
  DRUG_SCREENING : String(30);
  @sap.label : 'Background Investigation'
  BACKGROUND_CHECK : Decimal(15, 0);
  @sap.label : 'Non-Travel Expense'
  NONTRAVEL_EXPENSE : String(15);
  @sap.label : 'Customer Commodity Code'
  CUST_COMMODITY_CODE2 : String(15);
  @sap.label : 'Field124'
  Field124 : String(20);
  @sap.label : 'Vc Price Cust'
  VC_PRICE_CUST : String(36);
  @sap.label : 'Vc Price Ven'
  VC_PRICE_VEN : String(26);
  @sap.label : 'Sc Uom'
  SC_UOM : String(5);
  @sap.label : 'Sc Tax'
  SC_TAX : Decimal(15, 2);
  @sap.label : 'Sc Vat Client'
  SC_VAT_CLIENT : Decimal(15, 2);
  @sap.label : 'Supplier Invoice Number'
  SUPPLIER_INVOICE_NUMBER : String(30);
  @sap.label : 'Sc Travel Expense'
  SC_TRAVEL_EXPENSE : Decimal(15, 2);
  @sap.label : 'Unlimited Price'
  UNLIMITED_PRICE : Decimal(15, 2);
  @sap.label : 'Sc Daily Total Rate'
  SC_DAILY_TOTAL_RATE : Decimal(15, 2);
  @sap.label : 'Each Total Price'
  EACH_TOTAL_PRICE : Decimal(15, 2);
  @sap.label : 'Hour Total Price'
  HOUR_TOTAL_PRICE : Decimal(15, 2);
  @sap.label : 'Minute Total Price'
  MINUTE_TOTAL_PRICE : Decimal(15, 2);
  @sap.label : 'Month Total Price'
  MONTH_TOTAL_PRICE : Decimal(15, 2);
  @sap.label : 'Piece Total Price'
  PIECE_TOTAL_PRICE : Decimal(15, 2);
  @sap.label : 'Project Amount'
  PROJECT_AMOUNT : Decimal(15, 2);
  @sap.label : 'Salary'
  SALARY : Decimal(15, 2);
  @sap.label : 'Semi Month Total Price'
  SEMI_MONTH_TOTAL_PRICE : Decimal(15, 2);
  @sap.label : 'Week Total Price'
  WEEK_TOTAL_PRICE : Decimal(15, 2);
  @sap.label : 'Sc Admin Cust'
  SC_ADMIN_CUST : Decimal(15, 2);
  @sap.label : 'Sc Admin Ven'
  SC_ADMIN_VEN : Decimal(15, 2);
  @sap.label : 'Sc Daily Pay Days'
  SC_DAILY_PAY_DAYS : Decimal(15, 7);
  @sap.label : 'Each'
  YY269_EACH : Decimal(15, 7);
  @sap.label : 'Hour'
  YY270_HOUR : Decimal(15, 7);
  @sap.label : 'Minute'
  YY271_MINUTE : Decimal(15, 7);
  @sap.label : 'Month'
  YY272_MONTH : Decimal(15, 7);
  @sap.label : 'Piece'
  PIECE : Decimal(15, 7);
  @sap.label : 'Semi Month'
  SEMI_MONTH : Decimal(15, 7);
  @sap.label : 'Week'
  WEEK : Decimal(15, 7);
  @sap.label : 'Sc Daily Price'
  SC_DAILY_PRICE : Decimal(15, 7);
  @sap.label : 'Each Price'
  EACH_PRICE : Decimal(15, 7);
  @sap.label : 'Hour Price'
  HOUR_PRICE : Decimal(15, 7);
  @sap.label : 'Minute Price'
  MINUTE_PRICE : Decimal(15, 7);
  @sap.label : 'Month Price'
  MONTH_PRICE : Decimal(15, 7);
  @sap.label : 'Piece Price'
  PIECE_PRICE : Decimal(15, 7);
  @sap.label : 'Semi Month Price'
  SEMI_MONTH_PRICE : Decimal(15, 7);
  @sap.label : 'Week Price'
  WEEK_PRICE : Decimal(15, 7);
  @sap.label : 'Sc Daily Pay Vendor'
  SC_DAILY_PAY_VENDOR : Decimal(15, 7);
  @sap.label : 'Easy Pay Rate'
  EACH_PAY_RATE : Decimal(15, 7);
  @sap.label : 'Hour Pay'
  HOUR_PAY : Decimal(15, 7);
  @sap.label : 'Minute Pay'
  MINUTE_PAY : Decimal(15, 7);
  @sap.label : 'Month Pay'
  MONTH_PAY : Decimal(15, 7);
  @sap.label : 'Piece Pay'
  PIECE_PAY : Decimal(15, 7);
  @sap.label : 'Semi Month Pay'
  SEMI_MONTH_PAY : Decimal(15, 7);
  @sap.label : 'Week Pay'
  WEEK_PAY : Decimal(15, 7);
  @sap.label : 'Material Group 3'
  MATERIAL_GROUP_3 : String(3);
  @sap.label : 'Text of length 20'
  Field187 : String(20);
  @sap.label : 'Text of length 20'
  Field186 : String(20);
};

@cds.external : true
action YY1_SALESVCDATA_2_CDS_0001.YY1_SALESVCDATA_2Sap_upsert(
  @sap.label : 'Text of length 20'
  Sales_Order_Number : String(20),
  @sap.label : 'Text of length 20'
  Sales_Order_Item_Num : String(20),
  @sap.label : 'Text of length 20'
  Billing_Document_Number : String(20),
  @sap.label : 'Text of length 20'
  Billing_Document_Item_Number : String(20),
  @sap.label : 'Text of length 2'
  YY131_DC : String(2),
  @sap.label : 'H&W Vendor Pay Rate'
  YY132_HW_PAY_VENDOR : Decimal(15, 0),
  @sap.label : 'H&W Total Pay Vendor'
  YY133_HW_TOTAL_VENDOR : Decimal(15, 0),
  @sap.label : 'Daily Vendor Pay Amount'
  YY134_DAILY_PAY_VENDOR : Decimal(15, 0),
  @sap.label : 'Daily Total Pay Vendor'
  YY135_DAILY_TOTAL_VENDOR : Decimal(15, 0),
  @sap.label : 'Holiday Vendor Pay Rate'
  YY136_HOLIDAY_PAY_VENDOR : Decimal(15, 0),
  @sap.label : 'Holiday Total Pay Vendor'
  YY137_HOLIDAY_TOTAL_VENDOR : Decimal(15, 0),
  @sap.label : 'Oncall Vendor Pay Rate'
  YY138_ONCALL_PAY_VENDOR : Decimal(15, 0),
  @sap.label : 'Oncall Total Pay Vendor'
  YY139_ONCALL_TOTAL_VENDOR : Decimal(15, 0),
  @sap.label : 'Vacation Vendor Pay Rate'
  YY140_VACATION_PAY_VENDOR : Decimal(15, 0),
  @sap.label : 'Vacation Total Pay Vendor'
  YY141_VACATION_TOTAL_VENDOR : Decimal(15, 0),
  @sap.label : 'Salary Vendor Pay Amount'
  YY142_SALARY_PAY_VENDOR : Decimal(15, 0),
  @sap.label : 'Direct Placement Fee'
  YY143_DIRECT_PLACEMENT : Decimal(15, 0),
  @sap.label : 'Weekly Clock Fee'
  YY144_WEEKLY_CLOCK_FEE : Decimal(15, 0),
  @sap.label : 'Per Diem Days'
  YY145_PER_DIEM_DAYS : Decimal(15, 0),
  @sap.label : 'Per Diem Tax Price Per Day'
  YY146_PER_DIEM_TAX_PRICE : Decimal(15, 0),
  @sap.label : 'Per Diem No Tax Price Per Day'
  YY147_PER_DIEM_NOTAX_PRICE : Decimal(15, 0),
  @sap.label : 'Per Diem Taxable Total'
  YY148_PER_DIEM_TAX : Decimal(15, 0),
  @sap.label : 'Per Diem No Tax Total'
  YY149_PER_DIEM_NO_TAX : Decimal(15, 0),
  @sap.label : 'Daily Pay Days'
  YY150_DAILY_PAY_DAYS : Decimal(10, 2),
  @sap.label : 'Daily Pay Rate Per Day'
  YY151_DAILY_PRICE : Decimal(15, 0),
  @sap.label : 'Daily'
  YY152_DAILY_TOTAL_RATE : Decimal(15, 0),
  @sap.label : 'Sick Days'
  YY153_SICK_DAYS : Decimal(15, 0),
  @sap.label : 'Sick Days Price'
  YY154_SICK_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Sick Days Total Price'
  YY155_SICK_TOTAL_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Sick Hours'
  YY156_SICK_HOURS : Decimal(15, 0),
  @sap.label : 'Sick Hours Price'
  YY157_SICK_HRS_PRICE : Decimal(10, 2),
  @sap.label : 'Sick Hours Total Price'
  YY158_SICK_TOTAL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Miscellaneous Amount'
  YY159_MISC : Decimal(15, 0),
  @sap.label : 'Bereavement Days'
  YY160_BEREAV_DAYS : Decimal(15, 0),
  @sap.label : 'Bereavement Hours'
  YY161_BEREAV_HRS : Decimal(15, 0),
  @sap.label : 'Bereavement Hourly Rate'
  YY162_BEREAV_HRS_RATE : Decimal(15, 0),
  @sap.label : 'Bereavement Daily Rate'
  YY163_BEREAV_DAYS_RATE : Decimal(15, 0),
  @sap.label : 'Bereavement Hours Total Price'
  YY164_BEREAV_TOTAL_HRS_RATE : Decimal(15, 0),
  @sap.label : 'Bereavement Day Total Price'
  YY165_BEREAV_TOTAL_DAYS_RATE : Decimal(15, 0),
  @sap.label : 'Bonus'
  YY166_BONUS_PRICE : Decimal(15, 0),
  @sap.label : 'Bonus Vendor Pay Amount'
  YY167_BONUS_PAY_RATE : Decimal(15, 0),
  @sap.label : 'Commission'
  YY168_COMMISSION_PRICE : Decimal(15, 0),
  @sap.label : 'Holiday Days'
  YY169_HOL_DAYS : Decimal(15, 0),
  @sap.label : 'Holiday Hours'
  YY170_HOL_HRS : Decimal(15, 0),
  @sap.label : 'Holiday Hourly Rate'
  YY171_HOL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Holiday Daily Rate'
  YY172_HOL_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Holiday Hourly Total Price'
  YY173_HOL_TOTAL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Holiday Daily Total Price'
  YY174_HOL_TOTAL_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Holiday Date'
  @sap.display.format : 'Date'
  YY175_HOLIDAY_DATE : Date,
  @sap.label : 'H&W Hours'
  YY176_HW_HRS : Decimal(15, 0),
  @sap.label : 'H&W Rate'
  YY177_HW_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'HW'
  YY178_HW_TOTAL_PRICE : Decimal(15, 0),
  @sap.label : 'Jury Duty Days'
  YY179_JURY_DAYS : Decimal(15, 0),
  @sap.label : 'Jury Duty Hours'
  YY180_JURY_HRS : Decimal(15, 0),
  @sap.label : 'Jury Duty HRs Rate'
  YY181_JURY_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Jury Duty Daily Rate'
  YY182_JURY_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Jury Duty Total HRs'
  YY183_JURY_TOTAL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Jury Duty Total Days'
  YY184_JURY_TOTAL_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Longevity Days'
  YY185_LONGEVITY_DAYS : Decimal(15, 0),
  @sap.label : 'Longevity Hours'
  YY186_LONGEVITY_HRS : Decimal(15, 0),
  @sap.label : 'Longevity Hours Price'
  YY187_LONGEVITY_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Longevity Days Price'
  YY188_LONGEVITY_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Longevity Total HRs Price'
  YY189_LONGEVITY_TOTAL_HRS_PR : Decimal(15, 0),
  @sap.label : 'Longevity Total Days Price'
  YY190_LONGEVITY_TOTAL_DAYS_P : Decimal(15, 0),
  @sap.label : 'Oncall Days'
  YY191_ONCALL_DAYS : Decimal(15, 0),
  @sap.label : 'Oncall Hours'
  YY192_ONCALL_HRS : Decimal(15, 0),
  @sap.label : 'Oncall Hours Price'
  YY193_ONCALL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Oncall Days Price'
  YY194_ONCALL_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Oncall Total HRs Price'
  YY195_ONCALL_TOTAL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Oncall Total Days Price'
  YY196_ONCALL_TOTAL_DAYS_PRIC : Decimal(15, 0),
  @sap.label : 'Retro Days'
  YY197_RETRO_DAYS : Decimal(15, 0),
  @sap.label : 'Retro Hours'
  YY198_RETRO_HRS : Decimal(15, 0),
  @sap.label : 'Retro Days Price'
  YY199_RETRO_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Retro Hours Price'
  YY200_RETRO_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Retro Total HRs Price'
  YY201_RETRO_TOTAL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Retro Total Days Price'
  YY202_RETRO_TOTAL_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Salary'
  YY203_SALARY : Decimal(15, 0),
  @sap.label : 'Severance Pay Days'
  YY204_SEV_PAY_DAYS : Decimal(15, 0),
  @sap.label : 'Severance Pay Hours'
  YY205_SEV_PAY_HRS : Decimal(15, 0),
  @sap.label : 'Severance Pay HRs Price'
  YY206_SEV_PAY_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Severance Pay Days Price'
  YY207_SEV_PAY_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Severance Pay Total HRs Price'
  YY208_SEV_PAY_TOTAL_HRS_PRIC : Decimal(15, 0),
  @sap.label : 'Severance Pay Total Days Price'
  YY209_SEV_PAY_TOTAL_DAYS_PRI : Decimal(15, 0),
  @sap.label : 'Vacation Billable Days'
  YY210_VAC_BILL_DAYS : Decimal(15, 0),
  @sap.label : 'Vacation Billable Hours'
  YY211_VAC_BILL_HRS : Decimal(15, 0),
  @sap.label : 'Vacation Billable Hrs Price'
  YY212_VAC_BILL_HRS_PRICE : Decimal(15, 0),
  @sap.label : 'Vacation Billable Days Price'
  YY213_VAC_BILL_DAYS_PRICE : Decimal(15, 0),
  @sap.label : 'Vac. Billable Tot Hrs Price'
  YY214_VAC_BILL_TOTAL_HRS_PRI : Decimal(15, 0),
  @sap.label : 'Vac Billable Tot Days Price'
  YY215_VAC_BILL_TOTAL_DAYS_PR : Decimal(15, 0),
  @sap.label : 'Text of length 30'
  YY216_CUST_BUSINESS_UNIT : String(30),
  @sap.label : 'Text of length 30'
  YY217_CUST_CHARGE_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY218_CUST_PROJECT_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY219_CUST_COST_CENTER : String(30),
  @sap.label : 'Text of length 30'
  YY220_CUST_COMPANY_CODE : String(30),
  @sap.label : 'Text of length 30'
  YY221_CUST_DEPT_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY222_CUST_DOTS_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY223_CUST_RUI : String(30),
  @sap.label : 'Text of length 30'
  YY224_CUST_ACCT_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY225_CUST_BUDGET_CENTER : String(30),
  @sap.label : 'Text of length 30'
  YY226_CUST_CON_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY227_CUST_VENDOR_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY228_CUST_ORG_CODE : String(30),
  @sap.label : 'Text of length 30'
  YY229_CUST_LEGAL_ENTITY : String(30),
  @sap.label : 'Text of length 30'
  YY230_CUST_ORACLE_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY231_CUST_UNIT_STORE_NUMBER : String(30),
  @sap.label : 'Service Date - FOR SDI IBM'
  @sap.display.format : 'Date'
  YY232_CUST_SVC_DATE : Date,
  @sap.label : 'Text of length 30'
  YY233_CUST_EMPLOYEE_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY234_CUST_AGREE_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY235_CUST_TASK15 : String(30),
  @sap.label : 'Text of length 30'
  YY236_CUST_FEPS_CODE : String(30),
  @sap.label : 'Text of length 30'
  YY237_CUST_POSITION : String(30),
  @sap.label : 'Text of length 30'
  YY238_CUST_GL_CODE : String(30),
  @sap.label : 'Text of length 30'
  YY239_CUST_PURCHASE_AGREE : String(30),
  @sap.label : 'Text of length 30'
  YY240_CUST_BB_NUMBER : String(30),
  @sap.label : 'Customer Background Check Date'
  @sap.display.format : 'Date'
  YY241_CUST_BGRD_CHECK_DATE : Date,
  @sap.label : 'Text of length 30'
  YY242_CUST_DIV_UNIT_NUMBER : String(30),
  @sap.label : 'Text of length 30'
  YY243_CUST_POSITION_CODE : String(30),
  @sap.label : 'Text of length 4'
  YY244_ITEM_CATEGORY : String(4),
  @sap.label : 'Text of length 30'
  YY245_ZSD_WN_INVOICE_VBAP : String(30),
  @sap.label : 'Text of length 30'
  YY246_ZSD_WN_INVOICE_VCSD : String(30),
  @sap.label : 'Text of length 10'
  YY247_ZSD_WN_WORK_ORDER_VCSD : String(10),
  @sap.label : 'Text of length 10'
  YY248_ZSD_WN_WORK_ORDER_VBAP : String(10),
  @sap.label : 'Text of length 30'
  YY249_CUST_COST_CENTER2_VBAP : String(30),
  @sap.label : 'Text of length 30'
  YY250_CUST_COST_CENTER2 : String(30),
  @sap.label : 'Shift 1 Pay Rate RG'
  YY251_SHIFT1_PAY_RATE_RG : Decimal(15, 0),
  @sap.label : 'Shift 1 Pay Rate OT'
  YY252_SHIFT1_PAY_RATE_OT : Decimal(15, 0),
  @sap.label : 'Shift 1 Pay Rate DB'
  YY253_SHIFT1_PAY_RATE_DB : Decimal(15, 0),
  @sap.label : 'Shift 2 Pay Rate RG'
  YY254_SHIFT2_PAY_RATE_RG : Decimal(15, 0),
  @sap.label : 'Shift 2 Pay Rate OT'
  YY255_SHIFT2_PAY_RATE_OT : Decimal(15, 0),
  @sap.label : 'Shift 2 Pay Rate DB'
  YY256_SHIFT2_PAY_RATE_DB : Decimal(15, 0),
  @sap.label : 'Shift 3 Pay Rate RG'
  YY257_SHIFT3_PAY_RATE_RG : Decimal(15, 0),
  @sap.label : 'Shift 3 Pay Rate OT'
  YY258_SHIFT3_PAY_RATE_OT : Decimal(15, 0),
  @sap.label : 'Shift 3 Pay Rate DB'
  YY259_SHIFT3_PAY_RATE_DB : Decimal(15, 0),
  @sap.label : 'Shift 1 Total Pay RG'
  YY260_SHIFT1_TOTAL_PAY_RG : Decimal(15, 0),
  @sap.label : 'Shift 1 Total Pay OT'
  YY261_SHIFT1_TOTAL_PAY_OT : Decimal(15, 0),
  @sap.label : 'Shift 1 Total Pay DB'
  YY262_SHIFT1_TOTAL_PAY_DB : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Pay RG'
  YY263_SHIFT2_TOTAL_PAY_RG : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Pay OT'
  YY264_SHIFT2_TOTAL_PAY_OT : Decimal(15, 0),
  @sap.label : 'Shift 2 Total Pay DB'
  YY265_SHIFT2_TOTAL_PAY_DB : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Pay RG'
  YY266_SHIFT3_TOTAL_PAY_RG : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Pay OT'
  YY267_SHIFT3_TOTAL_PAY_OT : Decimal(15, 0),
  @sap.label : 'Shift 3 Total Pay DB'
  YY268_SHIFT3_TOTAL_PAY_DB : Decimal(15, 0),
  @sap.label : 'Travel Expenses'
  TRAVEL_EXPENSE : Decimal(15, 0),
  @sap.label : 'Customer Category Code'
  CUST_CATERGORY_CODE2 : Decimal(15, 0),
  @sap.label : 'Accelerated Payment Fee'
  ACCELERATED_FEE_DISC_VEN : Decimal(15, 0),
  @sap.label : 'Original Customer PO Amount'
  ORIGINAL_PO_AMOUNT : Decimal(15, 0),
  @sap.label : 'Service Start Date'
  @sap.display.format : 'Date'
  SERVICE_START_DATE : Date,
  @sap.label : 'Service End Date'
  @sap.display.format : 'Date'
  SERVICE_END_DATE : Date,
  @sap.label : 'Text of length 30'
  HYBRID_PRICING : String(30),
  @sap.label : 'Cust PO Line Item Number'
  SC_LINE_ITEM_NUMBER : Decimal(15, 0),
  @sap.label : 'Text of length 30'
  DRUG_SCREENING : String(30),
  @sap.label : 'Background Investigation'
  BACKGROUND_CHECK : Decimal(15, 0),
  @sap.label : 'Text of length 15'
  NONTRAVEL_EXPENSE : String(15),
  @sap.label : 'Text of length 15'
  CUST_COMMODITY_CODE2 : String(15),
  @sap.label : 'Text of length 20'
  Field124 : String(20),
  @sap.label : 'Text of length 36'
  VC_PRICE_CUST : String(36),
  @sap.label : 'Text of length 26'
  VC_PRICE_VEN : String(26),
  @sap.label : 'Text of length 5'
  SC_UOM : String(5),
  @sap.label : 'Sc Tax'
  SC_TAX : Decimal(15, 2),
  @sap.label : 'Sc Vat Client'
  SC_VAT_CLIENT : Decimal(15, 2),
  @sap.label : 'Text of length 30'
  SUPPLIER_INVOICE_NUMBER : String(30),
  @sap.label : 'Sc Travel Expense'
  SC_TRAVEL_EXPENSE : Decimal(15, 2),
  @sap.label : 'Unlimited Price'
  UNLIMITED_PRICE : Decimal(15, 2),
  @sap.label : 'Sc Daily Total Rate'
  SC_DAILY_TOTAL_RATE : Decimal(15, 2),
  @sap.label : 'Each Total Price'
  EACH_TOTAL_PRICE : Decimal(15, 2),
  @sap.label : 'Hour Total Price'
  HOUR_TOTAL_PRICE : Decimal(15, 2),
  @sap.label : 'Minute Total Price'
  MINUTE_TOTAL_PRICE : Decimal(15, 2),
  @sap.label : 'Month Total Price'
  MONTH_TOTAL_PRICE : Decimal(15, 2),
  @sap.label : 'Piece Total Price'
  PIECE_TOTAL_PRICE : Decimal(15, 2),
  @sap.label : 'Project Amount'
  PROJECT_AMOUNT : Decimal(15, 2),
  @sap.label : 'Salary'
  SALARY : Decimal(15, 2),
  @sap.label : 'Semi Month Total Price'
  SEMI_MONTH_TOTAL_PRICE : Decimal(15, 2),
  @sap.label : 'Week Total Price'
  WEEK_TOTAL_PRICE : Decimal(15, 2),
  @sap.label : 'Sc Admin Cust'
  SC_ADMIN_CUST : Decimal(15, 2),
  @sap.label : 'Sc Admin Ven'
  SC_ADMIN_VEN : Decimal(15, 2),
  @sap.label : 'Sc Daily Pay Days'
  SC_DAILY_PAY_DAYS : Decimal(15, 7),
  @sap.label : 'Each'
  YY269_EACH : Decimal(15, 7),
  @sap.label : 'Hour'
  YY270_HOUR : Decimal(15, 7),
  @sap.label : 'Minute'
  YY271_MINUTE : Decimal(15, 7),
  @sap.label : 'Month'
  YY272_MONTH : Decimal(15, 7),
  @sap.label : 'Piece'
  PIECE : Decimal(15, 7),
  @sap.label : 'Semi Month'
  SEMI_MONTH : Decimal(15, 7),
  @sap.label : 'Week'
  WEEK : Decimal(15, 7),
  @sap.label : 'Sc Daily Price'
  SC_DAILY_PRICE : Decimal(15, 7),
  @sap.label : 'Each Price'
  EACH_PRICE : Decimal(15, 7),
  @sap.label : 'Hour Price'
  HOUR_PRICE : Decimal(15, 7),
  @sap.label : 'Minute Price'
  MINUTE_PRICE : Decimal(15, 7),
  @sap.label : 'Month Price'
  MONTH_PRICE : Decimal(15, 7),
  @sap.label : 'Piece Price'
  PIECE_PRICE : Decimal(15, 7),
  @sap.label : 'Semi Month Price'
  SEMI_MONTH_PRICE : Decimal(15, 7),
  @sap.label : 'Week Price'
  WEEK_PRICE : Decimal(15, 7),
  @sap.label : 'Sc Daily Pay Vendor'
  SC_DAILY_PAY_VENDOR : Decimal(15, 7),
  @sap.label : 'Easy Pay Rate'
  EACH_PAY_RATE : Decimal(15, 7),
  @sap.label : 'Hour Pay'
  HOUR_PAY : Decimal(15, 7),
  @sap.label : 'Minute Pay'
  MINUTE_PAY : Decimal(15, 7),
  @sap.label : 'Month Pay'
  MONTH_PAY : Decimal(15, 7),
  @sap.label : 'Piece Pay'
  PIECE_PAY : Decimal(15, 7),
  @sap.label : 'Semi Month Pay'
  SEMI_MONTH_PAY : Decimal(15, 7),
  @sap.label : 'Week Pay'
  WEEK_PAY : Decimal(15, 7),
  @sap.label : 'Text of length 3'
  MATERIAL_GROUP_3 : String(3),
  @sap.label : 'Text of length 20'
  Field187 : String(20),
  @sap.label : 'Text of length 20'
  Field186 : String(20)
) returns YY1_SALESVCDATA_2_CDS_0001.YY1_SALESVCDATA_2;

