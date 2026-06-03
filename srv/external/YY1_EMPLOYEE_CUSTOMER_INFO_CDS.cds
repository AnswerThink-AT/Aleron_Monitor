/* checksum : 2af74b25217dd48cae73ae9a312e08ef */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service YY1_EMPLOYEE_CUSTOMER_INFO_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'EMPLOYEE_CUSTOMER_INFO'
entity YY1_EMPLOYEE_CUSTOMER_INFO_CDS.YY1_EMPLOYEE_CUSTOMER_INFO {
  @sap.label : 'UUID'
  @sap.quickinfo : '16 Byte UUID in 16 Bytes (Raw Format)'
  key SAP_UUID : UUID not null;
  @sap.label : 'Employee Number'
  @sap.quickinfo : 'Text of length 15'
  WORKER_ID : String(15);
  @sap.label : 'Employee Name'
  Name : String(50);
  @sap.label : 'Social Security Number'
  SSN : String(15);
  @sap.label : 'Employee Group'
  EMP_GRP : String(1);
  @sap.label : 'Employee Subgroup'
  EMP_SUBGRP : String(2);
  @sap.display.format : 'Date'
  @sap.label : 'Start Date'
  START_DATE : Date;
  @sap.display.format : 'Date'
  @sap.label : 'End Date'
  END_DATE : Date;
  @sap.label : 'Contract Number'
  CONTRAT_SAP : String(15);
  @sap.label : 'Sales Order Number'
  SALES_ORD_SAP : String(15);
  @sap.label : 'Project ID'
  PROJECT_ID : String(15);
  @sap.label : 'Project Name'
  PROJECT_NAME : String(30);
  @sap.label : 'Customer Number'
  CUSTOMER_ID : String(10);
  @sap.label : 'SS Sales Document'
  SS_ORDER : String(10);
  @sap.label : 'WN Sales Document'
  WN_ORDER : String(10);
  @sap.label : 'Position'
  POSITION_ID : Decimal(8, 0);
  @sap.label : 'Job'
  JOB_ID : Decimal(8, 0);
  @sap.label : 'Payroll or Recruited'
  ZPAYROLL : String(10);
  @sap.label : 'Recruiter ID'
  RECRID : Decimal(8, 0);
  @sap.label : 'Work Nexus Time Indicator'
  ZTIME_IND : String(3);
  @sap.label : 'Cust Hire Act'
  ZHIRE_ACTION : String(3);
  @sap.label : 'Custom Actions for inf. 9001'
  ACTION_TYPE : String(2);
  @sap.label : 'Termination Reason'
  T_REASON : String(2);
  @sap.label : 'HR Report'
  ZHRREPT : String(3);
  @sap.display.format : 'Date'
  @sap.label : 'Created On'
  CreatedOn : Date;
};

@cds.external : true
action YY1_EMPLOYEE_CUSTOMER_INFO_CDS.YY1_EMPLOYEE_CUSTOMER_INFOSap_upsert(
  @sap.label : 'Text of length 15'
  WORKER_ID : String(15),
  @sap.label : 'Text of length 50'
  Name : String(50),
  @sap.label : 'Text of length 15'
  SSN : String(15),
  @sap.label : 'Text of length 1'
  EMP_GRP : String(1),
  @sap.label : 'Text of length 2'
  EMP_SUBGRP : String(2),
  @sap.label : 'Start Date'
  @sap.display.format : 'Date'
  START_DATE : Date,
  @sap.label : 'End Date'
  @sap.display.format : 'Date'
  END_DATE : Date,
  @sap.label : 'Text of length 15'
  CONTRAT_SAP : String(15),
  @sap.label : 'Text of length 15'
  SALES_ORD_SAP : String(15),
  @sap.label : 'Text of length 15'
  PROJECT_ID : String(15),
  @sap.label : 'Text of length 30'
  PROJECT_NAME : String(30),
  @sap.label : 'Text of length 10'
  CUSTOMER_ID : String(10),
  @sap.label : 'Text of length 10'
  SS_ORDER : String(10),
  @sap.label : 'Text of length 10'
  WN_ORDER : String(10),
  @sap.label : 'Position'
  POSITION_ID : Decimal(8, 0),
  @sap.label : 'Job'
  JOB_ID : Decimal(8, 0),
  @sap.label : 'Text of length 10'
  ZPAYROLL : String(10),
  @sap.label : 'Recruiter ID'
  RECRID : Decimal(8, 0),
  @sap.label : 'Text of length 3'
  ZTIME_IND : String(3),
  @sap.label : 'Text of length 3'
  ZHIRE_ACTION : String(3),
  @sap.label : 'Text of length 2'
  ACTION_TYPE : String(2),
  @sap.label : 'Text of length 2'
  T_REASON : String(2),
  @sap.label : 'Text of length 3'
  ZHRREPT : String(3),
  @sap.label : 'Created On'
  @sap.display.format : 'Date'
  CreatedOn : Date
) returns YY1_EMPLOYEE_CUSTOMER_INFO_CDS.YY1_EMPLOYEE_CUSTOMER_INFO;

