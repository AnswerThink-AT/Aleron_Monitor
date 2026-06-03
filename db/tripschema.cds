namespace trip;

using { Currency,Country, managed } from '@sap/cds/common';
using {sap.common.CodeList as CodeList} from '@sap/cds/common';
entity Trip : managed {
  key TripNumber : Decimal(10,0);
  key Personnel   : String(50);
  key StartOfTrip : Date;
  key EndOfTrip   : Date;

  Header : composition of one TRIPHeader on
    Header.TripNumber   = $self.TripNumber  and
    Header.Personnel    = $self.Personnel   and
    Header.StartOfTrip  = $self.StartOfTrip and
    Header.EndOfTrip    = $self.EndOfTrip;

  Items : composition of many TRIPItem on
    Items.TripNumber     = $self.TripNumber  and
    Items.Personnel      = $self.Personnel   and
    Items.StartOfTrip    = $self.StartOfTrip and
    Items.EndOfTrip      = $self.EndOfTrip;

  Costs : composition of many TRIPCost on
    Costs.TripNumber     = $self.TripNumber  and
    Costs.Personnel      = $self.Personnel   and
    Costs.StartOfTrip    = $self.StartOfTrip and
    Costs.EndOfTrip      = $self.EndOfTrip;
}

entity TripNumberSeq {
  key id     : Integer default 1;
      nextval: Decimal(10,0); 
}

entity TRIPHeader : managed {
  key TripNumber : Decimal(10,0);
  key Personnel    : String(50);
  key StartOfTrip  : Date;
  key EndOfTrip    : Date;

  Trip : Association to Trip on
    Trip.TripNumber   = $self.TripNumber  and
    Trip.Personnel    = $self.Personnel   and
    Trip.StartOfTrip  = $self.StartOfTrip and
    Trip.EndOfTrip    = $self.EndOfTrip;

  TripType         : String(2);
  Destination      : String(50) @mandatory;
  Country          : Country;
  Region           : String(2);
  TotalAmount      : Decimal(15,3);
  Currency         : Currency;
  ReasonForTrip    : String(25);
  TripStatus       : Association to one TripStatusLists;
  TripSettlement   : Integer;
  Comments         : String(5000);
  ContractNo       : String(10);
  WnInvoiceNo      : String(15);
  SapEmployeeNo    : String(50);
  WnWorkOrder      : String(30);
  WoType           : String(2);
  InternalOrder    : String(12);
  WeekEndDate      : String(8);
  Project          : String(50) @mandatory;
  SapSalesDocNo    : String(10);
  SapSalesDocItemNo: String(10);
  CustWeekEnding   : Date;
  CustBusinessUnit : String(30);
  CustChargeNo     : String(30);
  ProjectNo        : String(30);
  CustCompanyCode  : String(30);
  CustDeptNo       : String(30);
  CustDOTSNo       : String(30);
  CustRUI          : String(30);
  CustAccountNo    : String(30);
  CustBudgetCenter : String(30);
  CustContractNo   : String(30);
  SGVendorNo       : String(30);
  CustOrgCode      : String(30);
  CustLegalEntity  : String(30);
  CustOracleNo     : String(30);
  CustUnitStoreNo  : String(30);
  ServiceDate      : Date;
  CustEmployeeNo   : String(30);
  CustAgreementName: String(30);
  Task             : String(30);
  FEPSCode         : String(30);
  CustPosition     : String(30);
  CustGLCode       : String(30);
  PurchaseAgreement: String(30);
  BB               : String(30);
  CustBackgroundCheckDate: Date;
  CustDivisionUnitNo : String(30);
  CustPositionCode   : String(30);
  CustCostCentre     : String(30);
  CustPoLineItemNo   : String(30);

  JournalDocNo    : String(30);
  JournalResponse : String(500);
  SalesOrderNo    : String(30);
  SOResponse      : String(500);
  PurchaseOrderNo : String(30);
  POResponse      : String(500);
  MIROInvoiceNo   : String(30);
  MIROResponse    : String(500);
}

entity TRIPItem : managed {
  key TripNumber : Decimal(10,0);
  key Personnel            : String(50);
  key StartOfTrip          : Date;
  key EndOfTrip            : Date;
  key ExpenseReceiptNumber : String(12);

  Header : Association to TRIPHeader on
    Header.TripNumber   = $self.TripNumber  and
    Header.Personnel    = $self.Personnel   and
    Header.StartOfTrip  = $self.StartOfTrip and
    Header.EndOfTrip    = $self.EndOfTrip;

  TripExpenseType : String(4);
  Amount          : Decimal(15,3);
  Currency        : Currency;

  ![From]         : String(20);
  ![To]           : String(20);
  
  ReceiptsDocumentNumber : Integer;
  UrlLink                : String(120);
}

entity TRIPCost : managed {
  key TripNumber : Decimal(10,0);
  key Personnel                  : String(50);
  key StartOfTrip                : Date;
  key EndOfTrip                  : Date;
  key CostDistributionPercentage : Decimal(3,2);

  Trip : Association to Trip on
    Trip.TripNumber  = $self.TripNumber  and
    Trip.Personnel   = $self.Personnel   and
    Trip.StartOfTrip = $self.StartOfTrip and
    Trip.EndOfTrip   = $self.EndOfTrip;

  Project : String(50);
}

entity ExpenseTypes {
  key language      : String;
  key tripProvision : String;
  key expenseType   : String;

  description : String;
  glAccount   : String;
}
view TripReport as select from Trip as T
  inner join TRIPHeader as H on T.TripNumber = H.TripNumber
{
  key T.TripNumber      as TripNumber,
      T.Personnel       as Personnel,        
      T.StartOfTrip     as TripStartDate,
      T.EndOfTrip       as TripEndDate,
      H.Project         as ProjectName,      
      H.Destination     as DestinationName,  
      H.TripStatus.name as StatusText,       
      T.createdAt       as CreatedAt,
      T.createdBy       as CreatedBy,
      T.modifiedAt      as ModifiedAt,
      T.modifiedBy      as ModifiedBy
}


entity CachedBusinessUser {
  key PersonID         : String(10);
      PersonExternalID : String(20);
      PersonFullName   : String(100);
      UserName         : String(50);
      EmailAddress     : String(100);
      BusinessPartnerID         : String(10);  // new
      BusinessPartnerExternalID : String(60);  // new
      BusinessPartnerRoleCode   : String(6);   // new
      RoleName                  : String(40);  // new
}

entity WorkAssignmentCache : managed {
  key WorkAssignmentExternalID     : String(40);   // e.g., "15000864" (keep roomy)
      WorkAssignmentBusinessPartner: String(20);   // e.g., "9980017419"
      PersonFullName               : String(258);  // e.g., "Cory Masi"
      FullName                     : String(258);  // e.g., "Cory Masi"
      LastName                     : String(120);  // e.g., "Masi"
}

entity TripStatusLists : CodeList {
  key code : Integer enum {
    created                = 0;
    approved               = 1;
    settled                = 2;
    salesOrderUpdated      = 3;
    purchaseOrderUpdated   = 4;
    completed              = 5;
    cancelled              = 6;
    draft                  = 7;
    settleError            = 8;
  };
}

entity ExpenseTypeMapping {
  key Language     : String(2);  
  key TripProvision: String(2);   
  key ExpenseType  : String(4);   
  Description      : String(50);
  GLAccount        : String(10);
}

entity EnterpriseProjectCache {
  key Project                : String(20);         // e.g. "900000014"
      ProjectDescription     : String(100);        // e.g. "Sonic 01"
      EnterpriseProjectType  : String(10);         // e.g. "40"
      ProfitCenter           : String(20);         // e.g. "9914"
      ResponsibleCostCenter  : String(20);         // e.g. "10009914"
      CompanyCode            : String(10);         // e.g. "1000"
      YY1_SalesOrder_PPH     : String(20);         // e.g. "2700000010"
      YY1_Employee_PPH       : String(20);         // e.g. "SAIV"
      YY1_EmployeeName_PPH   : String(100);        // e.g. employee name
      LastSyncedAt           : Timestamp;          // optional: for tracking last job sync
}

