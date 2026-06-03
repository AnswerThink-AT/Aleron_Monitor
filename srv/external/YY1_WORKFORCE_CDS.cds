/* checksum : 32d93c1b893f0fcab03bd697f5e81e24 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service YY1_WORKFORCE_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'workforce_cds'
entity YY1_WORKFORCE_CDS.YY1_workforce_cds {
  @sap.required.in.filter : 'false'
  @sap.label : 'External Person ID'
  key WorkforcePersonExternalID : String(100) not null;
  @sap.required.in.filter : 'false'
  @sap.label : 'First Name'
  @sap.quickinfo : 'First Name of Business Partner (Person)'
  FirstName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Business Partner'
  @sap.quickinfo : 'Business Partner Number'
  BusinessPartner : String(10);
  @sap.required.in.filter : 'false'
  @sap.label : 'Middle Name'
  @sap.quickinfo : 'Middle Name or Second Forename of a Person'
  MiddleName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController10 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController8 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController9 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController7 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController6 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController5 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController4 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController3 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController2 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Controller'
  @sap.quickinfo : 'BP: Data Controller (Internal Use Only)'
  DataController1 : String(30);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Ctrlr. Set'
  @sap.quickinfo : 'BP: Data Controller Set Flag'
  DataControllerSet : String(1);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Purpose Completed'
  @sap.quickinfo : 'Business Purpose Completed Flag'
  IsBusinessPurposeCompleted : String(1);
  @sap.required.in.filter : 'false'
  @sap.label : 'Correspondence Lang.'
  @sap.quickinfo : 'Business Partner: Correspondence Language'
  NativePreferredLanguage : String(2);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Initials'
  @sap.quickinfo : '&quot;Middle Initial&quot; or personal initials'
  Initials : String(10);
  @sap.required.in.filter : 'false'
  @sap.label : 'Name at Birth'
  @sap.quickinfo : 'Name at birth of business partner'
  BirthName : String(40);
  @sap.required.in.filter : 'false'
  @sap.label : 'Full Name'
  FullName : String(80);
  @sap.required.in.filter : 'false'
  @sap.label : 'Last Name'
  @sap.quickinfo : 'Last Name of Business Partner (Person)'
  LastName : String(40);
  @sap.display.format : 'NonNegative'
  @sap.required.in.filter : 'false'
  @sap.text : 'PersonFullName'
  @sap.label : 'Personnel Number'
  PersonWorkAgreement : String(8);
  @sap.required.in.filter : 'false'
  @sap.label : 'Full Name'
  PersonFullName : String(80);
  @sap.display.format : 'Date'
  @sap.required.in.filter : 'false'
  @sap.label : 'Start Date'
  WorkAssignmentStartDate : Date;
  @sap.display.format : 'Date'
  @sap.required.in.filter : 'false'
  @sap.label : 'End Date'
  WorkAssignmentEndDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Country/Region'
  @sap.quickinfo : 'Workforce Country ISO Code'
  Country2DigitISOCode : String(2);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Company Code'
  CompanyCode : String(4);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Cost Center'
  CostCenter : String(10);
  @sap.required.in.filter : 'false'
  @sap.label : 'Working Hours'
  @sap.quickinfo : 'Working Hours in a Week'
  WeeklyWorkingHours : Decimal(5, 2);
  @sap.required.in.filter : 'false'
  @sap.label : 'Working Days'
  @sap.quickinfo : 'Working Days in a Week'
  WeeklyWorkingDays : Decimal(4, 2);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Employment Status'
  WorkAssignmentStatus : String(1);
  @sap.required.in.filter : 'false'
  @sap.label : 'Emplymt Percentage'
  @sap.quickinfo : 'Employment Percentage'
  EmploymentPercent : Decimal(5, 2);
  @sap.required.in.filter : 'false'
  @sap.label : 'Blocked Indicator'
  IsBlocked : Boolean;
  @sap.required.in.filter : 'false'
  @sap.label : 'Manager External ID'
  @sap.quickinfo : 'Manager Workforce Assignment External ID'
  SupervisorWorkAssignmentExtID : String(100);
  @sap.required.in.filter : 'false'
  @sap.label : 'External Person ID'
  WorkforcePersonExternalID_1 : String(100);
  @sap.required.in.filter : 'false'
  @sap.label : 'WFA Ext. ID'
  @sap.quickinfo : 'Workforce Assignment External ID'
  WorkAssignmentExternalID : String(100);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Source'
  WorkforcePersonDataSource : String(1);
  @sap.required.in.filter : 'false'
  @sap.label : 'Data Source Text'
  @sap.quickinfo : 'Explanatory Short Text'
  WorkforcePersonDataSourceText : String(60);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Supplier'
  @sap.quickinfo : 'Account Number of Supplier'
  Supplier : String(10);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Business Partner (Employee)'
  @sap.quickinfo : 'Business Partner Number'
  WorkAssignmentBusinessPartner : String(10);
};

