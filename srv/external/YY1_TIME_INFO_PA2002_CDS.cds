/* checksum : 9a69b3de4ab116b8dd08d666133106aa */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service YY1_TIME_INFO_PA2002_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
@sap.label : 'User'
entity YY1_TIME_INFO_PA2002_CDS.P_Scbo_User {
  @sap.display.format : 'UpperCase'
  @sap.label : 'User'
  @sap.quickinfo : 'User Name in User Master Record'
  key name : String(12) not null;
  @sap.label : 'Description'
  @sap.quickinfo : 'Description of the Technical User Account'
  description : String(80);
};

@cds.external : true
@cds.persistence.skip : true
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'EMPLOYEE_TIME_INFO'
entity YY1_TIME_INFO_PA2002_CDS.YY1_TIME_INFO_PA2002 {
  @sap.label : 'UUID'
  @sap.quickinfo : '16 Byte UUID in 16 Bytes (Raw Format)'
  key SAP_UUID : UUID not null;
  @sap.label : 'Employee Number'
  @sap.quickinfo : 'Text of length 15'
  WORKER_ID : String(15);
  @sap.label : 'Subtype'
  Subtype : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Start Date'
  START_DATE : Date;
  @sap.display.format : 'Date'
  @sap.label : 'End Date'
  END_DATE : Date;
  @sap.label : 'WBS Element'
  WBSElement : String(10);
  @sap.label : 'Employee Name'
  Name : String(50);
  @sap.label : 'Start Time'
  START_TIME : Time;
  @sap.label : 'End Time'
  END_TIME : Time;
  @sap.label : 'Previous Day Indicator'
  PREVIOUS_DAY : String(1);
  @sap.label : 'Attendance or absence type'
  Type : String(4);
  @sap.label : 'Attendance and Absence Days'
  AttAbsDays : Decimal(6, 2);
  @sap.label : 'Payroll hours'
  PAYROLL_HOURS : Decimal(7, 2);
  @sap.label : 'Payroll Days'
  PAYROLL_DAYS : Decimal(6, 2);
  @sap.label : 'Calendar days'
  CAL_DAYS : Decimal(6, 2);
  @sap.label : 'Attendance hours'
  ATT_HOURS : Decimal(7, 2);
  @sap.label : 'Wage Type'
  WAGE_TYPE : String(4);
  @sap.label : 'Valuation'
  @sap.quickinfo : 'Valuation Basis for Different Payment'
  VALUATION : Decimal(13, 2);
  @sap.label : 'Extra Pay Indicator'
  EXTRA_PAY : String(1);
  @sap.label : 'Overtime Compensation Type'
  OVERTIME_TYPE : String(1);
  @sap.label : 'Pay Scale Group'
  PAY_SCALE_GRP : String(8);
  @sap.label : 'Pay Scale Level'
  PAY_SCALE_LEVEL : String(2);
  @sap.label : 'Premium Number'
  PRE_NUMBER : String(2);
  @sap.label : 'Premium Indicator'
  PremiumIndicator : String(4);
  @sap.label : 'Object Type'
  ObjectType : String(2);
  @sap.label : 'Position plans'
  @sap.quickinfo : 'Position'
  Positionplans : String(8);
  @sap.label : 'Generation flag'
  Generationflag : String(1);
  @sap.label : 'External Document Number'
  ExternalDocumentNumber : String(8);
  @sap.label : 'Set number of hours'
  Setnumberofhours : String(1);
  @sap.label : 'Record is for Full Day'
  RecordisforFullDay : String(1);
  @sap.label : 'Currency Key'
  CurrencyKey : String(5);
  @sap.label : 'Logical system'
  Logicalsystem : String(10);
  @sap.label : 'Reference Transaction'
  ReferenceTransaction : String(5);
  @sap.label : 'Reference Document Number'
  ReferenceDocumentNumber : String(10);
  @sap.label : 'Reference Organizational Units'
  ReferenceOrganizationalUnits : String(10);
  @sap.label : 'Logical system for document (personnel time)'
  Logicalsystemfordocumentpers : String(10);
  @sap.label : 'Document number for time data'
  Documentnumberfortimedata : String(20);
  @sap.label : 'Work tax area'
  Worktaxarea : String(4);
  @sap.label : 'Evaluation Type for Attendances/Absences'
  EvaluationTypeforAttendances : String(2);
  @sap.label : 'Definition Set for IDs'
  DefinitionSetforIDs : String(10);
  @sap.label : 'Definition Subset for IDs'
  DefinitionSubsetforIDs : String(3);
  @sap.label : 'Time Data ID Type'
  TimeDataIDType : String(4);
  @sap.label : 'No break'
  Nobreak : String(1);
  @sap.label : 'Breaks Specified Explicitly'
  BreaksSpecifiedExplicitly : String(1);
  @sap.label : 'Start of Break'
  StartofBreak : Time;
  @sap.label : 'End of Break'
  EndofBreak : Time;
  @sap.label : 'Paid Break Period'
  PaidBreakPeriod : Decimal(4, 2);
  @sap.label : 'Unpaid Break Period'
  UnpaidBreakPeriod : Decimal(4, 2);
  @sap.label : 'Start of Break 2'
  StartofBreak2 : Time;
  @sap.label : 'End of Break 2'
  EndofBreak2 : Time;
  @sap.label : 'Paid Break Period 2'
  PaidBreakPeriod2 : Decimal(4, 2);
  @sap.label : 'Unpaid Break Period 2'
  UnpaidBreakPeriod2 : Decimal(4, 2);
  @sap.label : 'Next Day Indicator'
  NextDayIndicator : String(1);
  @sap.label : 'Sequential number for PDC messages'
  SequentialnumberforPDCmessag : String(12);
  @sap.label : 'Company Code'
  CompanyCode : String(4);
  @sap.label : 'Business Area'
  BusinessArea : String(4);
  @sap.label : 'Controlling Area'
  ControllingArea : String(4);
  @sap.label : 'Number of Hours for Activity Allocation/External Services'
  NumberofHoursforActivityAllo : Decimal(7, 2);
  @sap.label : 'Seqnr'
  Seqnr : String(2);
  @sap.label : 'Refex'
  Refex : String(1);
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SAP_CreatedDateTime : Timestamp;
  @sap.display.format : 'UpperCase'
  @sap.text : 'SAP_CreatedByUser_Text'
  @sap.label : 'Created By'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SAP_CreatedByUser : String(12);
  @sap.label : 'Description'
  @sap.quickinfo : 'Description of the Technical User Account'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SAP_CreatedByUser_Text : String(80);
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.label : 'Last Changed On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SAP_LastChangedDateTime : Timestamp;
  @sap.display.format : 'UpperCase'
  @sap.text : 'SAP_LastChangedByUser_Text'
  @sap.label : 'Last Changed By'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SAP_LastChangedByUser : String(12);
  @sap.label : 'Description'
  @sap.quickinfo : 'Description of the Technical User Account'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SAP_LastChangedByUser_Text : String(80);
  to_SAPSysAdminDataChangeUser : Association to YY1_TIME_INFO_PA2002_CDS.P_Scbo_User {  };
  to_SAPSysAdminDataCreateUser : Association to YY1_TIME_INFO_PA2002_CDS.P_Scbo_User {  };
};

@cds.external : true
action YY1_TIME_INFO_PA2002_CDS.YY1_TIME_INFO_PA2002Sap_upsert(
  @sap.label : 'Text of length 15'
  WORKER_ID : String(15),
  @sap.label : 'Text of length 4'
  Subtype : String(4),
  @sap.label : 'Start Date'
  @sap.display.format : 'Date'
  START_DATE : Date,
  @sap.label : 'End Date'
  @sap.display.format : 'Date'
  END_DATE : Date,
  @sap.label : 'Text of length 10'
  WBSElement : String(10),
  @sap.label : 'Text of length 50'
  Name : String(50),
  @sap.label : 'Field of type TIMS'
  START_TIME : Time,
  @sap.label : 'Field of type TIMS'
  END_TIME : Time,
  @sap.label : 'Text of length 1'
  PREVIOUS_DAY : String(1),
  @sap.label : 'Text of length 4'
  Type : String(4),
  @sap.label : 'Attendance and Absence Days'
  AttAbsDays : Decimal(6, 2),
  @sap.label : 'Payroll hours'
  PAYROLL_HOURS : Decimal(7, 2),
  @sap.label : 'Payroll Days'
  PAYROLL_DAYS : Decimal(6, 2),
  @sap.label : 'Calendar days'
  CAL_DAYS : Decimal(6, 2),
  @sap.label : 'Attendance hours'
  ATT_HOURS : Decimal(7, 2),
  @sap.label : 'Text of length 4'
  WAGE_TYPE : String(4),
  @sap.label : 'Valuation'
  VALUATION : Decimal(13, 2),
  @sap.label : 'Text of length 1'
  EXTRA_PAY : String(1),
  @sap.label : 'Text of length 1'
  OVERTIME_TYPE : String(1),
  @sap.label : 'Text of length 8'
  PAY_SCALE_GRP : String(8),
  @sap.label : 'Text of length 2'
  PAY_SCALE_LEVEL : String(2),
  @sap.label : 'Text of length 2'
  PRE_NUMBER : String(2),
  @sap.label : 'Text of length 4'
  PremiumIndicator : String(4),
  @sap.label : 'Text of length 2'
  ObjectType : String(2),
  @sap.label : 'Text of length 8'
  Positionplans : String(8),
  @sap.label : 'Text of length 1'
  Generationflag : String(1),
  @sap.label : 'Text of length 8'
  ExternalDocumentNumber : String(8),
  @sap.label : 'Text of length 1'
  Setnumberofhours : String(1),
  @sap.label : 'Text of length 1'
  RecordisforFullDay : String(1),
  @sap.label : 'Text of length 5'
  CurrencyKey : String(5),
  @sap.label : 'Text of length 10'
  Logicalsystem : String(10),
  @sap.label : 'Text of length 5'
  ReferenceTransaction : String(5),
  @sap.label : 'Text of length 10'
  ReferenceDocumentNumber : String(10),
  @sap.label : 'Text of length 10'
  ReferenceOrganizationalUnits : String(10),
  @sap.label : 'Text of length 10'
  Logicalsystemfordocumentpers : String(10),
  @sap.label : 'Text of length 20'
  Documentnumberfortimedata : String(20),
  @sap.label : 'Text of length 4'
  Worktaxarea : String(4),
  @sap.label : 'Text of length 2'
  EvaluationTypeforAttendances : String(2),
  @sap.label : 'Text of length 10'
  DefinitionSetforIDs : String(10),
  @sap.label : 'Text of length 3'
  DefinitionSubsetforIDs : String(3),
  @sap.label : 'Text of length 4'
  TimeDataIDType : String(4),
  @sap.label : 'Text of length 1'
  Nobreak : String(1),
  @sap.label : 'Text of length 1'
  BreaksSpecifiedExplicitly : String(1),
  @sap.label : 'Field of type TIMS'
  StartofBreak : Time,
  @sap.label : 'Field of type TIMS'
  EndofBreak : Time,
  @sap.label : 'Paid Break Period'
  PaidBreakPeriod : Decimal(4, 2),
  @sap.label : 'Unpaid Break Period'
  UnpaidBreakPeriod : Decimal(4, 2),
  @sap.label : 'Field of type TIMS'
  StartofBreak2 : Time,
  @sap.label : 'Field of type TIMS'
  EndofBreak2 : Time,
  @sap.label : 'Paid Break Period 2'
  PaidBreakPeriod2 : Decimal(4, 2),
  @sap.label : 'Unpaid Break Period 2'
  UnpaidBreakPeriod2 : Decimal(4, 2),
  @sap.label : 'Text of length 1'
  NextDayIndicator : String(1),
  @sap.label : 'Text of length 12'
  SequentialnumberforPDCmessag : String(12),
  @sap.label : 'Text of length 4'
  CompanyCode : String(4),
  @sap.label : 'Text of length 4'
  BusinessArea : String(4),
  @sap.label : 'Text of length 4'
  ControllingArea : String(4),
  @sap.label : 'Number of Hours for Activity Allocation/External Services'
  NumberofHoursforActivityAllo : Decimal(7, 2),
  @sap.label : 'Text of length 2'
  Seqnr : String(2),
  @sap.label : 'Text of length 1'
  Refex : String(1)
) returns YY1_TIME_INFO_PA2002_CDS.YY1_TIME_INFO_PA2002;

