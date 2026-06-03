/* checksum : d26c5bf88ac8a7aae597b031826d0efd */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service YY1_HRCOSTDISTRIBUTIONOBJ_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Company Code'
entity YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_CompanyCodeStdVH {
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCodeName'
  @sap.label : 'Company Code'
  key CompanyCode : String(4) not null;
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  CompanyCodeName : String(25);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Text for ILM Status'
entity YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_Scbo_ILM_Status_Text {
  @sap.label : 'Lang.'
  @sap.quickinfo : 'Language Key'
  key language : String(2) not null;
  @sap.display.format : 'UpperCase'
  @sap.text : 'description'
  @sap.label : 'Lower Value'
  @sap.quickinfo : 'Values for Domains: Single Value/Lower Limit'
  key code : String(10) not null;
  @sap.label : 'Short Description'
  @sap.quickinfo : 'Short Text for Fixed Values'
  description : String(60);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
@sap.label : 'User'
entity YY1_HRCOSTDISTRIBUTIONOBJ_CDS.P_Scbo_User {
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
@sap.label : 'HR Cost Distribution Obj'
entity YY1_HRCOSTDISTRIBUTIONOBJ_CDS.YY1_HRCOSTDISTRIBUTIONOBJ {
  @sap.label : 'UUID'
  @sap.quickinfo : '16 Byte UUID in 16 Bytes (Raw Format)'
  key SAP_UUID : UUID not null;
  @sap.label : 'Description'
  SAP_Description : String(80);
  @sap.label : 'WorkerID'
  WorkerID : String(20);
  @sap.display.format : 'Date'
  @sap.label : 'Start Date'
  StartDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'End Date'
  EndDate : Date;
  @sap.label : 'Cost Distribution'
  CostDistribution : String(4);
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCode1_Text'
  @sap.label : 'Company Code 1'
  @sap.value.list : 'standard'
  CompanyCode1 : String(4);
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CompanyCode1_Text : String(25);
  @sap.label : 'Project 1'
  Project1 : String(20);
  @sap.label : 'Percentage 1'
  Percentage1 : Decimal(5, 2);
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCode2_Text'
  @sap.label : 'Company Code 2'
  @sap.value.list : 'standard'
  CompanyCode2 : String(4);
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CompanyCode2_Text : String(25);
  @sap.label : 'Project 2'
  Project2 : String(20);
  @sap.label : 'Percentage 2'
  Percentage2 : Decimal(5, 2);
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCode3_Text'
  @sap.label : 'Company Code 3'
  @sap.value.list : 'standard'
  CompanyCode3 : String(4);
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CompanyCode3_Text : String(25);
  @sap.label : 'Project 3'
  Project3 : String(20);
  @sap.label : 'Percentage 3'
  Percentage3 : Decimal(5, 2);
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCode4_Text'
  @sap.label : 'Company Code 4'
  @sap.value.list : 'standard'
  CompanyCode4 : String(4);
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CompanyCode4_Text : String(25);
  @sap.label : 'Project 4'
  Project4 : String(20);
  @sap.label : 'Percentage 4'
  Percentage4 : Decimal(5, 2);
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCode5_Text'
  @sap.label : 'Company Code 5'
  @sap.value.list : 'standard'
  CompanyCode5 : String(4);
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CompanyCode5_Text : String(25);
  @sap.label : 'Project 5'
  Project5 : String(20);
  @sap.label : 'Percentage 5'
  Percentage5 : Decimal(5, 2);
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCode6_Text'
  @sap.label : 'Company Code 6'
  @sap.value.list : 'standard'
  CompanyCode6 : String(4);
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CompanyCode6_Text : String(25);
  @sap.label : 'Project 6'
  Project6 : String(20);
  @sap.label : 'Percentage 6'
  Percentage6 : Decimal(5, 2);
  @sap.display.format : 'UpperCase'
  @sap.text : 'SAP_LifecycleStatus_Text'
  @sap.label : 'Lifecycle Status'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SAP_LifecycleStatus : String(1);
  @sap.label : 'Short Description'
  @sap.quickinfo : 'Short Text for Fixed Values'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SAP_LifecycleStatus_Text : String(60);
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
  to_CompanyCode1 : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_CompanyCodeStdVH {  };
  to_CompanyCode2 : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_CompanyCodeStdVH {  };
  to_CompanyCode3 : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_CompanyCodeStdVH {  };
  to_CompanyCode4 : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_CompanyCodeStdVH {  };
  to_CompanyCode5 : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_CompanyCodeStdVH {  };
  to_CompanyCode6 : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_CompanyCodeStdVH {  };
  to_ILM_Status_Text : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.I_Scbo_ILM_Status_Text {  };
  to_SAPSysAdminDataChangeUser : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.P_Scbo_User {  };
  to_SAPSysAdminDataCreateUser : Association to YY1_HRCOSTDISTRIBUTIONOBJ_CDS.P_Scbo_User {  };
};

@cds.external : true
action YY1_HRCOSTDISTRIBUTIONOBJ_CDS.YY1_HRCOSTDISTRIBUTIONOBJSap_upsert(
  @sap.label : 'Text of length 80'
  SAP_Description : String(80),
  @sap.label : 'Text of length 20'
  WorkerID : String(20),
  @sap.label : 'Start Date'
  @sap.display.format : 'Date'
  StartDate : Date,
  @sap.label : 'End Date'
  @sap.display.format : 'Date'
  EndDate : Date,
  @sap.label : 'Text of length 4'
  CostDistribution : String(4),
  @sap.label : 'CompanyCode1'
  CompanyCode1 : String(4),
  @sap.label : 'Text of length 20'
  Project1 : String(20),
  @sap.label : 'Percentage 1'
  Percentage1 : Decimal(5, 2),
  @sap.label : 'CompanyCode2'
  CompanyCode2 : String(4),
  @sap.label : 'Text of length 20'
  Project2 : String(20),
  @sap.label : 'Percentage 2'
  Percentage2 : Decimal(5, 2),
  @sap.label : 'CompanyCode3'
  CompanyCode3 : String(4),
  @sap.label : 'Text of length 20'
  Project3 : String(20),
  @sap.label : 'Percentage 3'
  Percentage3 : Decimal(5, 2),
  @sap.label : 'CompanyCode4'
  CompanyCode4 : String(4),
  @sap.label : 'Text of length 20'
  Project4 : String(20),
  @sap.label : 'Percentage 4'
  Percentage4 : Decimal(5, 2),
  @sap.label : 'CompanyCode5'
  CompanyCode5 : String(4),
  @sap.label : 'Text of length 20'
  Project5 : String(20),
  @sap.label : 'Percentage 5'
  Percentage5 : Decimal(5, 2),
  @sap.label : 'CompanyCode6'
  CompanyCode6 : String(4),
  @sap.label : 'Text of length 20'
  Project6 : String(20),
  @sap.label : 'Percentage 6'
  Percentage6 : Decimal(5, 2)
) returns YY1_HRCOSTDISTRIBUTIONOBJ_CDS.YY1_HRCOSTDISTRIBUTIONOBJ;

