namespace com.aleron.monitor;

using {
    cuid,
    managed,
    Currency,
    Country
} from '@sap/cds/common';
using {
    com.aleron.monitor.FileStatus as FileStatus,
    com.aleron.monitor.TripStatusList as TripStatusList,
    com.aleron.monitor.record as record,
    com.aleron.monitor.shifts as shifts,
    com.aleron.monitor.personnelInfo as personnelInfo,
    com.aleron.monitor.address as address,
    com.aleron.monitor.customerFields as customerFields,
    com.aleron.monitor.shiftCustomerBillRate as shiftCustomerBillRate,
    com.aleron.monitor.shiftVendorPayRate as shiftVendorPayRate,
    com.aleron.monitor.Processes as Processes,
    com.aleron.monitor.employeeHireCommonFields as employeeHireCommonFields,
    com.aleron.monitor.GlobalTypes as GlobalTypes,
} from './common/types';

@cds.odata.valuelist
@cds.autoexpose: true
entity InterfaceTypes : managed {
    key ID           : String(1)        @title: '{i18n>interfaceTypeID}';
        name         : String           @title: '{i18n>interfaceTypeName}';
        descr        : localized String @title: '{i18n>interfaceTypeDescr}';
        mappedEntity : String;
        filePrefix   : String           @title: '{i18n>filePrefix}';
        // steps : Association to many InterfaceSteps on steps.interfaceType = $self;
        files        : Association to many Files
                           on files.interfaceType = $self;
        config       : Association to one Configurations; // Association to Configuration Table
}


entity InterfaceSteps : managed {
    key ID            : String(4)                    @title: '{i18n>interfaceStepID}';
    key interfaceType : Association to one InterfaceTypes;
        name          : localized String             @title: '{i18n>interfaceStepsName}';
        process       : Association to one Processes @title: '{i18n>processCode}';
        runner        : Association to one Runners;
        breakExecution: Boolean default false;
        // dataBundle: String; // TODO: Raghu will confirm if this needs to be removed or what functionality it serves
        config        : Association to one Configurations; // Association to Configuration Table
}

entity Runners : managed {
    key ID       : String;
        executor : String;
}

entity Files : managed {
    key ID               : Int64                             @title: '{i18n>fileNumber}';
        name             : String                            @title: '{i18n>name}';
        type             : String                            @Core.IsMediaType  @title: '{i18n>fileType}';
        status           : Association to one FileStatus     @title: '{i18n>status}';
        interfaceType    : Association to one InterfaceTypes @title: '{i18n>type}';

        @title: '{i18n>source}'
        source           : String enum {
            sftp  = 'SFTP';
            local = 'LOCAL'
        };
        recordsCount     : Integer                           @title: '{i18n>recordsCount}';
        reprocessed      : Boolean                           @title: '{i18n>reprocessed}';
        processMessage   : String                            @title: '{i18n>processMessage}';
        processLevel     : Association to one Processes      @title: '{i18n>processLevel}';
        virtual processLevelCounts : String;
        virtual showFacet_M  : Boolean;
        virtual showFacet_1  : Boolean;
        virtual showFacet_S  : Boolean;
        virtual showFacet_3  : Boolean;
        virtual showFacet_T  : Boolean;
        virtual showFacet_U  : Boolean;
        virtual showFacet_E  : Boolean;
        virtual showFacet_F  : Boolean;
        virtual showFacet_2  : Boolean;
        virtual showFacet_G  : Boolean;
        virtual showFacet_O  : Boolean;
        virtual showFacet_N  : Boolean;
        virtual showFacet_A  : Boolean;
        virtual showFacet_D  : Boolean;
        virtual showFacet_Q  : Boolean;
        virtual showFacet_C  : Boolean;
        virtual showFacet_4  : Boolean;


        // Associations to all the different interface types
        // to_Times         : Composition of many Times
        //                        on to_Times.file = $self;
        // to_WorkOrders    : Composition of many WorkOrders           // Interface S
        //                        on to_WorkOrders.file = $self;
        // to_WorkOrders_WN    : Composition of many WorkOrders_WN     // Interface 1
        //                        on to_WorkOrders_WN.file = $self;
        // to_WorkOrders_FG    : Composition of many WorkOrders_FG     // Interface M
        //                        on to_WorkOrders_FG.file = $self;
        // to_EmployeeHires : Composition of many EmployeeHires
        //                        on to_EmployeeHires.file = $self;
        // to_StaffHires : Composition of many StaffHires
        //                        on to_StaffHires.file = $self;   
        // to_Terminations : Composition of many Terminations
        //                        on to_Terminations.file = $self;  //term 4 interface
        // to_Fg_Invoices : Composition of many Fg_Invoices 
        //                         on to_Fg_Invoices.file = $self; //Interface N FG Time Invoices                       
        // to_Credit_Rebill : Composition of many Credit_Rebill
        //                         on to_Credit_Rebill.file = $self; //Credit-Rebill D
        // to_Fg_Credit_Rebill : Composition of many Fg_Credit_Rebill
        //                         on to_Fg_Credit_Rebill.file = $self; //FG Credit-Rebill Q            
        // to_OtherBillables : Composition of many OtherBillables
        //                        on to_OtherBillables.file = $self;
        // to_SowScWo        : Composition of many SowScWo
        //                        on to_SowScWo.file = $self;  //Interface E
        // to_SowScInvoice   : Composition of many SowScInvoice
        //                        on to_SowScInvoice.file = $self;  //Interface F
        // to_Bonus : Composition of many Bonus
        //                         on to_Bonus.file = $self;//Bonus- G
        // to_Travel         : Composition of many Travel
        //                         on to_Travel.file = $self; //Interface 2

        // to_Drug_Background_Check  : Composition of many Drug_Background_Check
        //                              on to_Drug_Background_Check.file = $self; //Interface A

         // Associations to all the different interface types
    @odata.on.delete: 'cascade'     
    to_Times             : Association to many Times                on to_Times.file = $self;
    to_WorkOrders        : Association to many WorkOrders           on to_WorkOrders.file = $self;
    to_WorkOrders_WN     : Association to many WorkOrders_WN        on to_WorkOrders_WN.file = $self;
    to_WorkOrders_FG     : Association to many WorkOrders_FG        on to_WorkOrders_FG.file = $self;
    to_EmployeeHires     : Association to many EmployeeHires        on to_EmployeeHires.file = $self;
    to_StaffHires        : Association to many StaffHires           on to_StaffHires.file = $self;
    to_Terminations      : Association to many Terminations         on to_Terminations.file = $self;
    to_Fg_Invoices       : Association to many Fg_Invoices          on to_Fg_Invoices.file = $self;
    to_Credit_Rebill     : Association to many Credit_Rebill        on to_Credit_Rebill.file = $self;
    to_Fg_Credit_Rebill  : Association to many Fg_Credit_Rebill     on to_Fg_Credit_Rebill.file = $self;
    to_OtherBillables    : Association to many OtherBillables       on to_OtherBillables.file = $self;
    to_SowScWo           : Association to many SowScWo              on to_SowScWo.file = $self;
    to_SowScInvoice      : Association to many SowScInvoice         on to_SowScInvoice.file = $self;
    to_Bonus             : Association to many Bonus                on to_Bonus.file = $self;
    to_Travel            : Association to many Travel               on to_Travel.file = $self;
    to_Drug_Background_Check : Association to many Drug_Background_Check on to_Drug_Background_Check.file = $self;

}

@cds.persistence.skip
entity FileUpload {
    key fileName : String;
        fileType : String      @Core.IsMediaType;
        data     : LargeBinary @Core.MediaType: fileType;
}

entity FieldValidations : managed {
    key interfaceType   : Association to one InterfaceTypes @title: '{i18n>interfaceTypeID}';
    key field           : String                            @title: '{i18n>field}';
    key country         : String                            @title: '{i18n>country}';
    key area            : String                            @title: '{i18n>area}';
    key term            : String                            @title: '{i18n>term}';
    key actionIndicator : String                            @title: '{i18n>actionIndicator}';
        validation      : String                            @title: '{i18n>validation}'
        enum {
            mandatory = 'M';
            optional  = 'O';
            blank     = 'B';
        };
        config          : Association to one Configurations; // Association to Configuration Table
}


entity ConditionTypeDetermination : managed {
    key salesOrg           : String(4)  @title: '{i18n>salesOrg}';
    key distChannel        : String(2)  @title: '{i18n>distChannel}';
    key division           : String(2)  @title: '{i18n>division}';
    key custPricingProc    : String(2)  @title: '{i18n>custPricingProc}';
        pricingProc        : String(6)  @title: '{i18n>pricingProc}';
        conditionType      : String(6)  @title: '{i18n>conditionType}';
        config             : Association to one Configurations; // Association to Configuration Table
}


entity Times : record, shifts, shiftCustomerBillRate, shiftVendorPayRate, customerFields {
    contractNo          : String(10)                    @title: '{i18n>contractNo}';
    invoiceNoWN         : GlobalTypes.InvoiceNumber     @title: '{i18n>invoiceNoWN}';
    employeeNo          : GlobalTypes.PersonnelNumber   @title: '{i18n>employeeNo}';
    tempusWorkOrder     : String(30)                    @title: '{i18n>tempusWorkOrder}'; // = Similar to VBELN / GlobalTypes.SalesDocument;
    salesDocumentType   : GlobalTypes.SalesDocumentType @title: '{i18n>salesDocumentType}'; // ECC Mapping : VBELN-ZWOTYPE;
    orderNo             : GlobalTypes.OrderNumber       @title: '{i18n>orderNo}';
    weekEndDate         : GlobalTypes.ABAPDate          @title: '{i18n>weekEndDate}';
    beginDate           : GlobalTypes.ABAPDate          @title: '{i18n>beginDate}';
    additionalDayOfWork : Boolean                       @title: '{i18n>additionalDayOfWork}';
    laborPurchaseOrder  : String(35)                    @title: '{i18n>laborPurchaseOrder}';
}

entity WorkOrders : record, address, shiftCustomerBillRate, shiftVendorPayRate, customerFields {
    contractNo         : String(10)           @title: '{i18n>contractNo}';
    soldToParty        : GlobalTypes.SoldToParty;
    billToParty        : GlobalTypes.BillToParty;
    workOrderWN        : String(30)           @title: '{i18n>workOrderWN}'; // Named as VBELN in ECC. But data type differs
    salesOffice        : GlobalTypes.SalesOffice;
    salesDocumentType  : GlobalTypes.SalesDocumentType; // ECC mapping = AUART-ZWOTYPE;
    materialNo         : GlobalTypes.MaterialNumber;
    remitToVendor      : String(10)           @title: '{i18n>remitToVendor}';
    currency           : Currency;
    endDate            : GlobalTypes.ABAPDate @title: '{i18n>endDate}';
    beginDate          : GlobalTypes.ABAPDate @title: '{i18n>beginDate}';
    ssn                : String(11)           @title: '{i18n>ssn}';
    workLocation       : String(35)           @title:  '{i18n>workLocation}';
    jobTemplate        : String(7)            @title: '{i18n>jobTemplate}';
    actionType         : String(2)            @title: '{i18n>actionType}';
    lastName           : String               @title: '{i18n>lastName}';
    firstName          : String               @title: '{i18n>firstName}';
    middleName         : String               @title: '{i18n>middleName}';
    laborPurchaseOrder : String(10)           @title: '{i18n>laborPurchaseOrder}';
    laborPODate        : GlobalTypes.ABAPDate @title: '{i18n>laborPODate}';
    attentionLine      : String(40)           @title: '{i18n>attentionLine}';
    distributionEmail  : String(130)          @title: '{i18n>distributionEmail}';
    distributionChannel: String(4)            @title: '{i18n>distributionChannel}';
}

entity WorkOrders_WN : record, address, shiftCustomerBillRate, shiftVendorPayRate, customerFields {
    contractNo         : String(10)           @title: '{i18n>contractNo}';
    soldToParty        : GlobalTypes.SoldToParty;
    billToParty        : GlobalTypes.BillToParty;
    workOrderWN        : String(30)           @title: '{i18n>workOrderWN}'; // Named as VBELN in ECC. But data type differs
    salesOffice        : GlobalTypes.SalesOffice;
    salesDocumentType  : GlobalTypes.SalesDocumentType; // ECC mapping = AUART-ZWOTYPE;
    materialNo         : GlobalTypes.MaterialNumber;
    remitToVendor      : String(10)           @title: '{i18n>remitToVendor}';
    currency           : Currency;
    fedTax             : String(20)           @title:'{i18n>fedTax}';
    salesDocItem       : String(6)            @title:'{i18n>salesDocItem}';
    lineItemRate       : String(18)           @title:'{i18n>lineItemRate}';
    itemQuantity       : String(18)           @title:'{i18n>itemQuantity}';
    baseUnit           : String(3)            @title:'{i18n>baseUnit}';
    poDesc             : String(40)           @title:'{i18n>poDesc}';
    lineItemDesc       : String(40)           @title:'{i18n>lineItemDesc}';
    endDate            : GlobalTypes.ABAPDate @title: '{i18n>endDate}';
    beginDate          : GlobalTypes.ABAPDate @title: '{i18n>beginDate}';
    ssn                : String(11)           @title: '{i18n>ssn}';
    fundIndicator      : String(1)            @title:'{i18n>fundIndicator}';
    custPurOrderTotal  : String(18)           @title:'{i18n>custPurOrderTotal}';
    vendPurOrderTotal  : String(18)           @title:'{i18n>vendPurOrderTotal}';
    workLocation       : String(35)           @title:'{i18n>workLocation}';
    actionType         : String(2)            @title: '{i18n>actionType}';
    lastName           : String               @title: '{i18n>lastName}';
    firstName          : String               @title: '{i18n>firstName}';
    middleName         : String               @title: '{i18n>middleName}';
    laborPurchaseOrder : String(10)           @title: '{i18n>laborPurchaseOrder}';
    laborPODate        : GlobalTypes.ABAPDate @title: '{i18n>laborPODate}';
    attentionLine      : String(40)           @title: '{i18n>attentionLine}';
    distributionEmail  : String(130)          @title: '{i18n>distributionEmail}';
    distributionChannel: String(4)            @title: '{i18n>distributionChannel}';
}

entity WorkOrders_FG : record, {
    jobSeekerId      : String(14) @title: '{i18n>jobSeekerId}';
    workerId         : String(14) @title: '{i18n>workerId}';
    personId         : String(24) @title: '{i18n>personId}';
    securityId       : String(100) @title: '{i18n>securityId}';
    woStatus         : String(12) @title: '{i18n>woStatus}';
    firstName        : String(100) @title: '{i18n>firstName}';
    lastName         : String(100) @title: '{i18n>lastName}';
    workerEmail      : String(100) @title: '{i18n>workerEmail}';
    jobPostingTitle  : String(100) @title: '{i18n>jobPostingTitle}';
    workOrderId      : String(14) @title: '{i18n>workOrderId}';
    owner            : String(100) @title: '{i18n>owner}';
    ownerId          : String(50) @title: '{i18n>ownerId}';
    businessUnitCode : String(100) @title: '{i18n>businessUnitCode}';
    businessUnitName : String(100) @title: '{i18n>businessUnitName}';
    vendorCode       : String(4) @title: '{i18n>vendorCode}';
    vendorName       : String(100) @title: '{i18n>vendorName}';
    buyerCode        : String(4) @title: '{i18n>buyerCode}';
    remitTo          : String(4) @title: '{i18n>remitTo}';
    costCenterName   : String(100) @title: '{i18n>costCenterName}';
    costCenterCode   : String(100) @title: '{i18n>costCenterCode}';
    bilPerDiem       : String(5) @title: '{i18n>bilPerDiem}';
    startDate        : String(10) @title: '{i18n>startDate}';
    endDate          : String(10) @title: '{i18n>endDate}';
    currency         : Currency;
    siteCode         : String(100) @title: '{i18n>siteCode}';
    siteName         : String(100) @title: '{i18n>siteName}';
    managerName      : String(80) @title: '{i18n>managerName}';
    purchaseOrder    : String(30) @title: '{i18n>purchaseOrder}';
    wnContract       : String(10) @title: '{i18n>wnContract}';
    companyCode      : String(4) @title: '{i18n>companyCode}';
    vendor           : String(10) @title: '{i18n>vendor}';
    ssContract       : String(10) @title: '{i18n>ssContract}';
    billTo           : String(10) @title: '{i18n>billTo}';
    soldTo           : String(10) @title: '{i18n>soldTo}';
    matnr            : String(18) @title: '{i18n>matnr}';
    salesOffice      : String(4) @title: '{i18n>salesOffice}';
}


entity EmployeeHires : record, personnelInfo, address, employeeHireCommonFields, shifts, shiftCustomerBillRate, customerFields {
    recordCountry            : Country                      @title: '{i18n>recordCountry}';
    recordIndicator          : String(1)                    @title: '{i18n>recordIndicator}'; // TODO: UPDATE after confirmation on possible values
    beginDate                : GlobalTypes.ABAPDate         @title: '{i18n>beginDate}';
    actionIndicator          : String(2)                    @title: '{i18n>actionIndicator}';
    actionReason             : String(2)                    @title: '{i18n>actionReason}';
    descShort                : String(12)                   @title: '{i18n>descShort}';
    descLong                 : String(40)                   @title: '{i18n>descLong}';
    orgUnit                  : GlobalTypes.OrganizationUnit @title: '{i18n>orgUnit}';
    soldToParty              : GlobalTypes.SoldToParty;
    billToParty              : GlobalTypes.BillToParty;
    managerEmail             : GlobalTypes.Email            @title: '{i18n>managerEmail}';
    personnelArea            : GlobalTypes.PersonnelArea    @title: '{i18n>personnelArea}';
    employeeGroup            : String(1)                    @title: '{i18n>employeeGroup}';
    employeeSubgroup         : GlobalTypes.EmployeeSubgroup;
    personnelSubarea         : String(4)                    @title: '{i18n>personnelSubarea}';
    payrollArea              : String(2)                    @title: '{i18n>payrollArea}';
    addressLine1             : String(60)                   @title: '{i18n>addressLine1}';
    addressLine2             : String(40)                   @title: '{i18n>addressLine2}';
    homeCity                 : String(40)                   @title: '{i18n>homeCity}';
    homeCounty               : String(35)                   @title: '{i18n>homeCounty}';
    homeRegion               : String(3)                    @title: '{i18n>homeRegion}';
    homePostalCode           : String(10)                   @title: '{i18n>homePostalCode}';
    homeLocation             : Country                      @title: '{i18n>homeLocation}';
    homeTelephoneAreaCode    : String(3)                    @title: '{i18n>homeTelephoneAreaCode}';
    homeTelephoneNo          : String(8)                    @title: '{i18n>homeTelephoneNo}';
    workScheduleRule         : String(8)                    @title: '{i18n>workScheduleRule}';
    workScheduleType         : String(2)                    @title: '{i18n>workScheduleType}';
    weeklySalary             : String(11)                   @title: '{i18n>weeklySalary}';
    biWeeklySalary           : String(11)                   @title: '{i18n>biWeeklySalary}';
    monthlySalary            : String(11)                   @title: '{i18n>monthlySalary}';
    dailyRate                : Decimal(11, 2)               @title: '{i18n>dailyRate}';
    residentTaxAreaState     : String(4)                    @title: '{i18n>residentTaxAreaState}';
    residentTaxAreaCity      : String(4)                    @title: '{i18n>residentTaxAreaCity}';
    residentTaxAreaCounty    : String(4)                    @title: '{i18n>residentTaxAreaCounty}';
    residentTaxAreaDistrict  : String(4)                    @title: '{i18n>residentTaxAreaDistrict}';
    residentTaxAreaOthers    : String(4)                    @title: '{i18n>residentTaxAreaOthers}';
    workTaxAreaState         : String(4)                    @title: '{i18n>workTaxAreaState}';
    workTaxAreaCity          : String(4)                    @title: '{i18n>workTaxAreaCity}';
    workTaxAreaCounty        : String(4)                    @title: '{i18n>workTaxAreaCounty}';
    workTaxAreaDistrict      : String(4)                    @title: '{i18n>workTaxAreaDistrict}';
    workTaxAreaOthers        : String(4)                    @title: '{i18n>workTaxAreaOthers}';
    workLocation             : String(35)                   @title: '{i18n>workLocation}';
    // address aspect
    county                   : String(35)                   @title: '{i18n>county}';
    employeeEmail            : GlobalTypes.Email            @title: '{i18n>employeeEmail}';
    payroll                  : String(4)                    @title: '{i18n>payroll}';
    recruiterEmployeeNo      : GlobalTypes.PersonnelNumber  @title: '{i18n>recruiterEmployeeNo}';
    employeeResponsible      : GlobalTypes.PersonnelNumber  @title: '{i18n>employeeResponsible}';
    sourcedSDC               : Boolean;
    workNexusIndicator       : Boolean                      @title: '{i18n>workNexusIndicator}';
    contractNo               : GlobalTypes.SalesDocument    @title: '{i18n>contractNo}';
    workOrderDoc             : GlobalTypes.SalesDocument    @title: '{i18n>workOrderDoc}';
    salesOffice              : String(4)                    @title: '{i18n>salesOffice}';
    material                 : GlobalTypes.MaterialNumber;
    purchasingUOM            : String(3)                    @title: '{i18n>purchasingUOM}';
    currency                 : Currency;
    monthlySalary2           : type of monthlySalary        @title: '{i18n>monthlySalary2}';
    dailyRate2               : type of dailyRate            @title: '{i18n>dailyRate2}';
    workerCompState          : String(2)                    @title: '{i18n>workerCompState}';
    workerCompCode           : String(4)                    @title: '{i18n>workerCompCode}';
    benefitType              : String(2)                    @title: '{i18n>benefitType}';
    hireAct                  : String(3)                    @title: '{i18n>hireAct}';
    customerAdminFee         : String(18)                   @title: '{i18n>customerAdminFee}';
    customerAdminFeePercent  : String(4)                    @title: '{i18n>customerAdminFeePercent}';
    attentionLine            : String(40)                   @title: '{i18n>attentionLine}';
    invoiceDistributionEmail : GlobalTypes.Email            @title: '{i18n>invoiceDistributionEmail}';
    custAgrName              : String(30)                   @title: '{i18n>custAgrName}';
    custBgChkDate            : GlobalTypes.ABAPDate         @title: '{i18n>custBkgrChkDate}';
    custBusUnitName          : String(30)                   @title: '{i18n>custBusUnitNam}';
    custChrgNo               : String(30)                   @title: '{i18n>custChrgNo}';
    custCostCtr              : String(30)                   @title: '{i18n>custCostCtr}';
    custDepNo                : String(30)                   @title: '{i18n>custDepNo}';
    custDivUnit              : String(30)                   @title: '{i18n>custDivUnit}';
    custDOTSNo               : String(30)                   @title: '{i18n>custDOTSNo}';
    custFEPSCode             : String(30)                   @title: '{i18n>custFEPSCode}';
    custPosCode              : String(30)                   @title: '{i18n>custPosCode}';
    custPONoLbr              : String(30)                   @title: '{i18n>custPONoLbr}';
    custPODateLbr            : GlobalTypes.ABAPDate         @title: '{i18n>custPODateLbr}';
    custWBS                  : String(30)                   @title: '{i18n>custWBS}';
    custWkTimeFee            : String(30)                   @title: '{i18n>custWkTimeFee}';
    custCompCode             : String(30)                   @title: '{i18n>custCompCode}';
    custRUI                  : String(30)                   @title: '{i18n>custRUI}';
    custAccNo                : String(30)                   @title: '{i18n>custAccNo}';
    custBudCtr               : String(30)                   @title: '{i18n>custBudCtr}';
    custConNo                : String(30)                   @title: '{i18n>custConNo}';
    sgVendNoAtCust           : String(30)                   @title: '{i18n>sgVendNoAtCust}';
    custManEmail             : GlobalTypes.Email            @title: '{i18n>custManEmail}';
    custManName              : String(60)                   @title: '{i18n>custManName}';
    custManPhone             : String(16)                   @title: '{i18n>custManPhone}';
    custOrgName              : String(30)                   @title: '{i18n>custOrgName}';
    custLegEnt               : String(30)                   @title: '{i18n>custLegEnt}';
    custOrcNo                : String(30)                   @title: '{i18n>custOrcNo}';
    custUtStrNo              : String(30)                   @title: '{i18n>custUtStrNo}';
    custJobTitle             : String(60)                   @title: '{i18n>custJobTitle}';
    svcLineItemDesc          : String(130)                  @title: '{i18n>svcLineItemDesc}';
    svcDatFrom               : GlobalTypes.ABAPDate         @title: '{i18n>svcDatFrom}';
    svcDatTo                 : GlobalTypes.ABAPDate         @title: '{i18n>svcDatTo}';
    custEmpNo                : String(30)                   @title: '{i18n>custEmpNo}';
    taskNo                   : String(30)                   @title: '{i18n>taskNo}';
    bbNo                     : String(30)                   @title: '{i18n>bbNo}';
    custGLCode               : String(30)                   @title: '{i18n>custGLCode}';
    projectNo                : String(30)                   @title: '{i18n>projectNo}';
    purchaseAgreement        : String(30)                   @title: '{i18n>purchaseAgreement}';
    wnWork                   : String(10)                   @title: '{i18n>wnWork}';
    cat1                     : String(10)                   @title: '{i18n>cat1}';
    cat2                     : String(10)                   @title: '{i18n>cat2}';
    cat3                     : String(10)                   @title: '{i18n>cat3}';
    markupTime               : String(6)                    @title: '{i18n>markupTime}';
    markupOT                 : String(6)                    @title: '{i18n>markupOvertime}';
    markupDT                 : String(6)                    @title: '{i18n>markupDoubleTime}';
}

entity StaffHires : record, personnelInfo, address, employeeHireCommonFields, shifts, shiftCustomerBillRate, customerFields {
    recordCountry            : Country                      @title: '{i18n>recordCountry}';
    recordIndicator          : String(1)                    @title: '{i18n>recordIndicator}'; // TODO: UPDATE after confirmation on possible values
    beginDate                : GlobalTypes.ABAPDate         @title: '{i18n>beginDate}';
    actionIndicator          : String(2)                    @title: '{i18n>actionIndicator}';
    actionReason             : String(2)                    @title: '{i18n>actionReason}';
    descShort                : String(12)                   @title: '{i18n>descShort}';
    descLong                 : String(40)                   @title: '{i18n>descLong}';
    orgUnit                  : GlobalTypes.OrganizationUnit @title: '{i18n>orgUnit}';
    soldToParty              : GlobalTypes.SoldToParty;
    billToParty              : GlobalTypes.BillToParty;
    managerEmail             : GlobalTypes.Email            @title: '{i18n>managerEmail}';
    personnelArea            : GlobalTypes.PersonnelArea;
    employeeGroup            : String(1)                    @title: '{i18n>employeeGroup}';
    employeeSubgroup         : GlobalTypes.EmployeeSubgroup;
    personnelSubarea         : String(4)                    @title: '{i18n>personnelSubarea}';
    payrollArea              : String(2)                    @title: '{i18n>payrollArea}';
    addressLine1             : String(60)                   @title: '{i18n>addressLine1}';
    addressLine2             : String(40)                   @title: '{i18n>addressLine2}';
    homeCity                 : String(40)                   @title: '{i18n>homeCity}';
    homeCounty               : String(35)                   @title: '{i18n>homeCounty}';
    homeRegion               : String(3)                    @title: '{i18n>homeRegion}';
    homePostalCode           : String(10)                   @title: '{i18n>homePostalCode}';
    homeLocation             : Country                      @title: '{i18n>homeLocation}';
    homeTelephoneAreaCode    : String(3)                    @title: '{i18n>homeTelephoneAreaCode}';
    homeTelephoneNo          : String(8)                    @title: '{i18n>homeTelephoneNo}';
    workScheduleRule         : String(8)                    @title: '{i18n>workScheduleRule}';
    workScheduleType         : String(2)                    @title: '{i18n>workScheduleType}';
    weeklySalary             : String(11)                   @title: '{i18n>weeklySalary}';
    biWeeklySalary           : String(11)                   @title: '{i18n>biWeeklySalary}';
    monthlySalary            : String(11)                   @title: '{i18n>monthlySalary}';
    dailyRate                : Decimal(11, 2)               @title: '{i18n>dailyRate}';
    residentTaxAreaState     : String(4)                    @title: '{i18n>residentTaxAreaState}';
    residentTaxAreaCity      : String(4)                    @title: '{i18n>residentTaxAreaCity}';
    residentTaxAreaCounty    : String(4)                    @title: '{i18n>residentTaxAreaCounty}';
    residentTaxAreaDistrict  : String(4)                    @title: '{i18n>residentTaxAreaDistrict}';
    residentTaxAreaOthers    : String(4)                    @title: '{i18n>residentTaxAreaOthers}';
    workTaxAreaState         : String(4)                    @title: '{i18n>workTaxAreaState}';
    workTaxAreaCity          : String(4)                    @title: '{i18n>workTaxAreaCity}';
    workTaxAreaCounty        : String(4)                    @title: '{i18n>workTaxAreaCounty}';
    workTaxAreaDistrict      : String(4)                    @title: '{i18n>workTaxAreaDistrict}';
    workTaxAreaOthers        : String(4)                    @title: '{i18n>workTaxAreaOthers}';
    workLocation             : String(35)                   @title: '{i18n>workLocation}';
    // address aspect
    county                   : String(35)                   @title: '{i18n>county}';
    employeeEmail            : GlobalTypes.Email            @title: '{i18n>employeeEmail}';
    payroll                  : String(4)                    @title: '{i18n>payroll}';
    recruiterEmployeeNo      : GlobalTypes.PersonnelNumber  @title: '{i18n>recruiterEmployeeNo}';
    employeeResponsible      : GlobalTypes.PersonnelNumber  @title: '{i18n>employeeResponsible}';
    sourcedSDC               : Boolean                      @title: '{i18n>sourcedSDC}';
    workNexusIndicator       : Boolean                      @title: '{i18n>workNexusIndicator}';
    contractNo               : GlobalTypes.SalesDocument    @title: '{i18n>contractNo}';
    workOrderDoc             : GlobalTypes.SalesDocument    @title: '{i18n>workOrderDoc}';
    salesOffice              : String(4)                    @title: '{i18n>salesOffice}';
    material                 : GlobalTypes.MaterialNumber;
    purchasingUOM            : String(3)                    @title: '{i18n>purchasingUOM}';
    currency                 : Currency;
    monthlySalary2           : type of monthlySalary        @title: '{i18n>monthlySalary2}';
    dailyRate2               : type of dailyRate            @title: '{i18n>dailyRate2}';
    workerCompState          : String(2)                    @title: '{i18n>workerCompState}';
    workerCompCode           : String(4)                    @title: '{i18n>workerCompCode}';
    benefitType              : String(2)                    @title: '{i18n>benefitType}';
    hireAct                  : String(3)                    @title: '{i18n>hireAct}';
    customerAdminFee         : String(18)                   @title: '{i18n>customerAdminFee}';
    customerAdminFeePercent  : String(4)                    @title: '{i18n>customerAdminFeePercent}';
    attentionLine            : String(40)                   @title: '{i18n>attentionLine}';
    invoiceDistributionEmail : GlobalTypes.Email            @title: '{i18n>invoiceDistributionEmail}';
    custAgrName              : String(30)                   @title: '{i18n>custAgrName}';
    custBgChkDate            : GlobalTypes.ABAPDate         @title: '{i18n>custBkgrChkDate}';
    custBusUnitName          : String(30)                   @title: '{i18n>custBusUnitNam}';
    custChrgNo               : String(30)                   @title: '{i18n>custChrgNo}';
    custCostCtr              : String(30)                   @title: '{i18n>custCostCtr}';
    custDepNo                : String(30)                   @title: '{i18n>custDepNo}';
    custDivUnit              : String(30)                   @title: '{i18n>custDivUnit}';
    custDOTSNo               : String(30)                   @title: '{i18n>custDOTSNo}';
    custFEPSCode             : String(30)                   @title: '{i18n>custFEPSCode}';
    custPosCode              : String(30)                   @title: '{i18n>custPosCode}';
    custPONoLbr              : String(30)                   @title: '{i18n>custPONoLbr}';
    custPODateLbr            : GlobalTypes.ABAPDate         @title: '{i18n>custPODateLbr}';
    custWBS                  : String(30)                   @title: '{i18n>custWBS}';
    custWkTimeFee            : String(30)                   @title: '{i18n>custWkTimeFee}';
    custCompCode             : String(30)                   @title: '{i18n>custCompCode}';
    custRUI                  : String(30)                   @title: '{i18n>custRUI}';
    custAccNo                : String(30)                   @title: '{i18n>custAccNo}';
    custBudCtr               : String(30)                   @title: '{i18n>custBudCtr}';
    custConNo                : String(30)                   @title: '{i18n>custConNo}';
    sgVendNoAtCust           : String(30)                   @title: '{i18n>sgVendNoAtCust}';
    custManEmail             : GlobalTypes.Email            @title: '{i18n>custManEmail}';
    custManName              : String(60)                   @title: '{i18n>custManName}';
    custManPhone             : String(16)                   @title: '{i18n>custManPhone}';
    custOrgName              : String(30)                   @title: '{i18n>custOrgName}';
    custLegEnt               : String(30)                   @title: '{i18n>custLegEnt}';
    custOrcNo                : String(30)                   @title: '{i18n>custOrcNo}';
    custUtStrNo              : String(30)                   @title: '{i18n>custUtStrNo}';
    custJobTitle             : String(60)                   @title: '{i18n>custJobTitle}';
    svcLineItemDesc          : String(130)                  @title: '{i18n>svcLineItemDesc}';
    svcDatFrom               : GlobalTypes.ABAPDate         @title: '{i18n>svcDatFrom}';
    svcDatTo                 : GlobalTypes.ABAPDate         @title: '{i18n>svcDatTo}';
    custEmpNo                : String(30)                   @title: '{i18n>custEmpNo}';
    taskNo                   : String(30)                   @title: '{i18n>taskNo}';
    bbNo                     : String(30)                   @title: '{i18n>bbNo}';
    custGLCode               : String(30)                   @title: '{i18n>custGLCode}';
    projectNo                : String(30)                   @title: '{i18n>projectNo}';
    purchaseAgreement        : String(30)                   @title: '{i18n>purchaseAgreement}';
    wnWork                   : String(10)                   @title: '{i18n>wnWork}';
    cat1                     : String(10)                   @title: '{i18n>cat1}';
    cat2                     : String(10)                   @title: '{i18n>cat2}';
    cat3                     : String(10)                   @title: '{i18n>cat3}';
    markupTime               : String(6)                    @title: '{i18n>markupTime}';
    markupOT                 : String(6)                    @title: '{i18n>markupOvertime}';
    markupDT                 : String(6)                    @title: '{i18n>markupDoubleTime}';
}

extend Processes {
    config : Association to one Configurations; // Association to Configuration Table
}

entity Configurations : cuid {
    key tableName                   : String           @title: '{i18n>tableName}';
        tableDescr                  : localized String @title: '{i18n>tableDescr}';
        interfaceTypes              : Composition of many InterfaceTypes
                                        on interfaceTypes.config = $self;
        interfaceSteps              : Composition of many InterfaceSteps
                                        on interfaceSteps.config = $self;
        fieldValidations            : Composition of many FieldValidations
                                        on fieldValidations.config = $self;
        processes                   : Composition of many Processes
                                        on processes.config = $self;
        customerSaleOrders          : Composition of many CustomerSaleOrders
                                        on customerSaleOrders.config = $self;
        skipInterfaces              : Composition of many SkipInterfaces
                                        on skipInterfaces.config = $self;
        purchaseOrders              : Composition of many PurchaseOrders
                                        on purchaseOrders.config = $self;
        paymentTerms                : Composition of many PaymentTerms
                                        on paymentTerms.config = $self;
        vendor_VendorRemit          : Composition of many Vendor_VendorRemit
                                        on vendor_VendorRemit.config=$self;
        customerEDIPartnerConfig    : Composition of many CustomerEDIPartnerConfig
                                        on customerEDIPartnerConfig.config = $self;
        ediShiftDiffForEmpSubGrp    : Composition of many EdiShiftDiffForEmpSubGrp
                                        on ediShiftDiffForEmpSubGrp.config = $self;
        ediShiftDiffForCanada       : Composition of many EdiShiftDiffForCanada
                                        on ediShiftDiffForCanada.config = $self;
        taxCodeByProvince           : Composition of many TaxCodeByProvince
                                        on taxCodeByProvince.config = $self;
        taxCodeByCity               : Composition of many TaxCodeByCity
                                        on taxCodeByCity.config = $self;
        taxCodeByCounty             : Composition of many TaxCodeByCounty
                                        on taxCodeByCounty.config = $self;
        fGdefaultEmp                : Composition of many FGdefaultEmp
                                        on fGdefaultEmp.config = $self;
        fGSiteCodeToAddressMapping  : Composition of many FGSiteCodeToAddressMapping
                                        on fGSiteCodeToAddressMapping.config = $self;
        fGBusinessUnit              : Composition of many FGBusinessUnit
                                        on fGBusinessUnit.config = $self;
        fGCostCenter                : Composition of many FGCostCenter
                                        on fGCostCenter.config = $self;
        travelCustomerPayTermByPOBox: Composition of many TravelCustomerPayTermByPOBox
                                        on travelCustomerPayTermByPOBox.config = $self;
        travelPayTermFeed           : Composition of many TravelPayTermFeed
                                        on travelPayTermFeed.config = $self;
        customFieldsToVC            : Composition of many CustomFieldsToVC
                                        on customFieldsToVC.config = $self;
        scon_Uom                    : Composition of many SCON_UOM
                                        on scon_Uom.config = $self;
        salesCondition              : Composition of many SalesCondition
                                        on salesCondition.config = $self;
        customerZJOB                : Composition of many CustomerZJOB
                                        on customerZJOB.config = $self;
        char_Usage_Details          : Composition of many Char_Usage_Details
                                        on char_Usage_Details.config = $self;
}


entity CustomerSaleOrders : cuid {
    contract     : String(10) @title: '{i18n>contract}';
    contractType : String(1)  @title: '{i18n>contractType}';
    config       : Association to one Configurations; // Association to Configuration Table
}

entity SkipInterfaces {
    key contract : String(10) @title: '{i18n>contract}';
        config   : Association to one Configurations; // Association to Configuration Table
}

entity PurchaseOrders : cuid {
    soldToParty   : String(10) @title: '{i18n>soldToParty}';
    billToParty   : String(10) @title: '{i18n>billToParty}';
    laberPO       : String(35) @title: '{i18n>laberPO}';
    expensePO     : String(35) @title: '{i18n>expensePO}';
    laberItemNO   : String(35) @title: '{i18n>laberItemNO}';
    expenseItemNO : String(35) @title: '{i18n>expenseItemNO}';
    config        : Association to one Configurations; // Association to Configuration Table
}

entity PaymentTerms : cuid {
    key customerNo   : String(10) @title: '{i18n>customerNo}';
    key supplierNo   : String(10) @title: '{i18n>supplierNo}';
        customerTerm : String(4)  @title: '{i18n>customerTerm}';
        vendorTerm   : String(4)  @title: '{i18n>vendorTerm}';
        poBox        : String(20) @title: '{i18n>poBox}';
        config       : Association to one Configurations; // Association to Configuration Table
}


entity SOItemVC : cuid {
    acaRgOnly               : String(2);
    acaHrs                  : Decimal(15, 2);
    acaHrsPrice             : type of acaHrs;
    acaTotalHrsPrice        : type of acaHrs;
    lineItemNumber          : String(30);
    scLineItemNumber        : String(30);
    invisible               : String(1);
    weekEnding2             : Date;
    zzWeekEndVbap           : Date;
    employeeType            : String(3);
    eightDayWeek            : String(1);
    day1Shift1RG            : type of acaHrs;
    day1Shift1OT            : type of acaHrs;
    day1Shift1DB            : type of acaHrs;
    day1Shift2RG            : type of acaHrs;
    day1Shift2OT            : type of acaHrs;
    day1Shift2DB            : type of acaHrs;
    day1Shift3RG            : type of acaHrs;
    day1Shift3OT            : type of acaHrs;
    day1Shift3DB            : type of acaHrs;
    dayOne                  : Date;
    dayOneWorked            : String(1);
    day2Shift1RG            : type of acaHrs;
    day2Shift1OT            : type of acaHrs;
    day2Shift1DB            : type of acaHrs;
    day2Shift2RG            : type of acaHrs;
    day2Shift2OT            : type of acaHrs;
    day2Shift2DB            : type of acaHrs;
    day2Shift3RG            : type of acaHrs;
    day2Shift3OT            : type of acaHrs;
    day2Shift3DB            : type of acaHrs;
    dayTwo                  : Date;
    dayTwoWorked            : String(1);
    day3Shift1RG            : type of acaHrs;
    day3Shift1OT            : type of acaHrs;
    day3Shift1DB            : type of acaHrs;
    day3Shift2RG            : type of acaHrs;
    day3Shift2OT            : type of acaHrs;
    day3Shift2DB            : type of acaHrs;
    day3Shift3RG            : type of acaHrs;
    day3Shift3OT            : type of acaHrs;
    day3Shift3DB            : type of acaHrs;
    dayThree                : Date;
    dayThreeWorked          : String(1);
    day4Shift1RG            : type of acaHrs;
    day4Shift1OT            : type of acaHrs;
    day4Shift1DB            : type of acaHrs;
    day4Shift2RG            : type of acaHrs;
    day4Shift2OT            : type of acaHrs;
    day4Shift2DB            : type of acaHrs;
    day4Shift3RG            : type of acaHrs;
    day4Shift3OT            : type of acaHrs;
    day4Shift3DB            : type of acaHrs;
    dayFour                 : Date;
    dayFourWorked           : String(1);
    day5Shift1RG            : type of acaHrs;
    day5Shift1OT            : type of acaHrs;
    day5Shift1DB            : type of acaHrs;
    day5Shift2RG            : type of acaHrs;
    day5Shift2OT            : type of acaHrs;
    day5Shift2DB            : type of acaHrs;
    day5Shift3RG            : type of acaHrs;
    day5Shift3OT            : type of acaHrs;
    day5Shift3DB            : type of acaHrs;
    dayFive                 : Date;
    dayFiveWorked           : String(1);
    day6Shift1RG            : type of acaHrs;
    day6Shift1OT            : type of acaHrs;
    day6Shift1DB            : type of acaHrs;
    day6Shift2RG            : type of acaHrs;
    day6Shift2OT            : type of acaHrs;
    day6Shift2DB            : type of acaHrs;
    day6Shift3RG            : type of acaHrs;
    day6Shift3OT            : type of acaHrs;
    day6Shift3DB            : type of acaHrs;
    daySix                  : Date;
    daySixWorked            : String(1);
    day7Shift1RG            : type of acaHrs;
    day7Shift1OT            : type of acaHrs;
    day7Shift1DB            : type of acaHrs;
    day7Shift2RG            : type of acaHrs;
    day7Shift2OT            : type of acaHrs;
    day7Shift2DB            : type of acaHrs;
    day7Shift3RG            : type of acaHrs;
    day7Shift3OT            : type of acaHrs;
    day7Shift3DB            : type of acaHrs;
    daySeven                : Date;
    daySevenWorked          : String(1);
    day8Shift1RG            : type of acaHrs;
    day8Shift1OT            : type of acaHrs;
    day8Shift1DB            : type of acaHrs;
    day8Shift2RG            : type of acaHrs;
    day8Shift2OT            : type of acaHrs;
    day8Shift2DB            : type of acaHrs;
    day8Shift3RG            : type of acaHrs;
    day8Shift3OT            : type of acaHrs;
    day8Shift3DB            : type of acaHrs;
    dayEight                : Date;
    dayEightWorked          : String(1);
    shift1TotalHrsRG        : type of acaHrs;
    shift1TotalHrsOT        : type of acaHrs;
    shift1TotalHrsDB        : type of acaHrs;
    shift2TotalHrsRG        : type of acaHrs;
    shift2TotalHrsOT        : type of acaHrs;
    shift2TotalHrsDB        : type of acaHrs;
    shift3TotalHrsRG        : type of acaHrs;
    shift3TotalHrsOT        : type of acaHrs;
    shift3TotalHrsDB        : type of acaHrs;
    shift1PriceRG           : type of acaHrs;
    shift1PriceOT           : type of acaHrs;
    shift1PriceDB           : type of acaHrs;
    shift2PriceRG           : type of acaHrs;
    shift2PriceOT           : type of acaHrs;
    shift2PriceDB           : type of acaHrs;
    shift3PriceRG           : type of acaHrs;
    shift3PriceOT           : type of acaHrs;
    shift3PriceDB           : type of acaHrs;
    markUpRG                : type of acaHrs;
    markUpOT                : type of acaHrs;
    markUpDB                : type of acaHrs;
    shift1TotalPriceRG      : type of acaHrs;
    shift1TotalPriceOT      : type of acaHrs;
    shift1TotalPriceDB      : type of acaHrs;
    shift2TotalPriceRG      : type of acaHrs;
    shift2TotalPriceOT      : type of acaHrs;
    shift2TotalPriceDB      : type of acaHrs;
    shift3TotalPayRG        : type of acaHrs;
    shift3TotalPayOT        : type of acaHrs;
    shift3TotalPayDB        : type of acaHrs;
    adminFeePrice           : type of acaHrs;
    dc                      : type of acaHrs;
    hwPayVendor             : type of acaHrs;
    hwTotalVendor           : type of acaHrs;
    dailyPayVendor          : type of acaHrs;
    dailyTotalVendor        : type of acaHrs;
    holidayPayVendor        : type of acaHrs;
    holidayTotalVendor      : type of acaHrs;
    oncallPayVendor         : type of acaHrs;
    oncallTotalVendor       : type of acaHrs;
    vacationPayVendor       : type of acaHrs;
    vacationTotalVendor     : type of acaHrs;
    salaryPayVendor         : type of acaHrs;
    directPlacement         : type of acaHrs;
    weeklyClockFee          : type of acaHrs;
    perDiemDays             : type of acaHrs;
    perDiemTaxPrice         : type of acaHrs;
    perDiemNoTaxPrice       : type of acaHrs;
    perDiemTax              : type of acaHrs;
    perDiemNoTax            : type of acaHrs;
    dailyPayDays            : type of acaHrs;
    dailyPrice              : type of acaHrs;
    dailyTotalRate          : type of acaHrs;
    sickDays                : type of acaHrs;
    sickDaysPrice           : type of acaHrs;
    sickTotalDaysPrice      : type of acaHrs;
    sickHours               : type of acaHrs;
    sickHrsPrice            : type of acaHrs;
    sickTotalHrsPrice       : type of acaHrs;
    misc                    : type of acaHrs;
    bereavDays              : type of acaHrs;
    bereavHrs               : type of acaHrs;
    bereavHrsRate           : type of acaHrs;
    bereavDaysRate          : type of acaHrs;
    bereavTotalHrsRate      : type of acaHrs;
    bereavTotalDaysRate     : type of acaHrs;
    bonusPrice              : type of acaHrs;
    bonusPayRate            : type of acaHrs;
    commissionPrice         : type of acaHrs;
    holDays                 : type of acaHrs;
    holHrs                  : type of acaHrs;
    holHrsPrice             : type of acaHrs;
    holDaysPrice            : type of acaHrs;
    holTotalHrsPrice        : type of acaHrs;
    holTotalDaysPrice       : type of acaHrs;
    holidayDate             : Date;
    hwHrs                   : type of acaHrs;
    hwHrsPrice              : type of acaHrs;
    hwTotalPrice            : type of acaHrs;
    juryDays                : type of acaHrs;
    juryHrs                 : type of acaHrs;
    juryHrsPrice            : type of acaHrs;
    juryDaysPrice           : type of acaHrs;
    juryTotalHrsPrice       : type of acaHrs;
    juryTotalDaysPrice      : type of acaHrs;
    longevityDays           : type of acaHrs;
    longevityHrs            : type of acaHrs;
    longevityHrsPrice       : type of acaHrs;
    longevityDaysPrice      : type of acaHrs;
    longevityTotalHrsPrice  : type of acaHrs;
    longevityTotalDaysPrice : type of acaHrs;
    oncallDays              : type of acaHrs;
    oncallHrs               : type of acaHrs;
    oncallHrsPrice          : type of acaHrs;
    oncallDaysPrice         : type of acaHrs;
    oncallTotalHrsPrice     : type of acaHrs;
    oncallTotalDaysPrice    : type of acaHrs;
    retroDays               : type of acaHrs;
    retroHrs                : type of acaHrs;
    retroDaysPrice          : type of acaHrs;
    retroHrsPrice           : type of acaHrs;
    retroTotalHrsPrice      : type of acaHrs;
    retroTotalDaysPrice     : type of acaHrs;
    salary                  : type of acaHrs;
    sevPayDays              : type of acaHrs;
    sevPayHrs               : type of acaHrs;
    sevPayHrsPrice          : type of acaHrs;
    sevPayDaysPrice         : type of acaHrs;
    sevPayTotalHrsPrice     : type of acaHrs;
    sevPayTotalDaysPrice    : type of acaHrs;
    vacBillDays             : type of acaHrs;
    vacBillHrs              : type of acaHrs;
    vacBillHrsPrice         : type of acaHrs;
    vacBillDaysPrice        : type of acaHrs;
    vacBillTotalHrsPrice    : type of acaHrs;
    vacBillTotalDaysPrice   : type of acaHrs;
    custBusinessUnit        : String(30);
    custChargeNumber        : String(30);
    custProjectNumber       : String(30);
    custCostCenter          : String(30);
    custCompanyCode         : String(30);
    custDeptNumber          : String(30);
    custDotsNumber          : String(30);
    custRUI                 : String(30);
    custAcctNumber          : String(30);
    custBudgetCenter        : String(30);
    custConNumber           : String(30);
    custVendorNumber        : String(30);
    custOrgCode             : String(30);
    custLegalEntity         : String(30);
    custOracleNumber        : String(30);
    custUnitStoreNumber     : String(30);
    custSVCDate             : Date;
    custEmployeeNumber      : String(30);
    custAgreeNumber         : String(30);
    custTask15              : String(30);
    custFepsCode            : String(30);
    custPosition            : String(30);
    custGLCode              : String(30);
    custPurchaseAgree       : String(30);
    custBbNumber            : String(30);
    custBgrdCheckDate       : Date;
    custDivUnitNumber       : String(30);
    custPositionCode        : String(30);
    itemCategory            : String(4);
    zsdWnInvoiceVbap        : String(30);
    zsdWnInvoiceVcsd        : String(30);
    zsdWnWorkOrderVcsd      : String(30);
    zsdWnWorkOrderVbap      : String(30);
    custCostCenter2Vbap     : String(30);
    custCostCenter2         : String(30);
}

entity TaxCodeByProvince    : managed {
    key country             : Country    @title: '{i18n>countryCode}';
    key region              : String(3)  @title: '{i18n>region}';
        taxJurisdiction     : String(15) @title: '{i18n>taxJurisdiction}';
        province            : String(40) @title: '{i18n>province}';
        config              : Association to one Configurations; //Association to Configuration Table      
}
 
entity TaxCodeByCity        : managed {
    key country             : Country     @title: '{i18n>countryCode}';
    key region              : String(3)   @title: '{i18n>region}';
    key city                : String(40)  @title: '{i18n>city}';
        taxJurisdiction     : String(15)  @title: '{i18n>taxJurisdiction}';
        config              : Association to one Configurations; // Association to Configuration Table  
}
 
entity TaxCodeByCounty      : managed {
    key country             : Country     @title: '{i18n>countryCode}';
    key region              : String(3)   @title: '{i18n>region}';
    key county              : String(40)  @title: '{i18n>county}';
        taxJurisdiction     : String(15)  @title: '{i18n>taxJurisdiction}';
        config              : Association to one Configurations; // Association to Configuration Table
}

entity Vendor_VendorRemit : managed {
    key vendor      : String(10) @title: '{i18n>vendor}';
    key vendorZR    : String(10) @title: '{i18n>vendorZR}';
        config      : Association to one Configurations; // Association to Configuration Table
}

entity CustomerEDIPartnerConfig : managed {
    key customerNo          : String(10) @title: '{i18n>customerNo}';
        materialGroup2      : String(3)  @title: '{i18n>materialGroup2}';
        shiftDiffCustom     : String(1)  @title: '{i18n>shiftDiffCustom}';
        shiftDiffUS         : String(1)  @title: '{i18n>shiftDiffUS}';
        shiftDiffCA         : String(1)  @title: '{i18n>shiftDiffCA}';
        refOrigInvoice      : String(1)  @title: '{i18n>RefOrigInvoice}';
        config              : Association to one Configurations; // Association to Configuration Table
}

entity EdiShiftDiffForEmpSubGrp : managed {
    key customerNo          : String(10) @title: '{i18n>customerNo}';
    key employeeSubGroup    : String(2)  @title: '{i18n>employeeSubGroup}';
        materialGroup2      : String(3)  @title: '{i18n>materialGroup2}';
        config              : Association to one Configurations; // Association to Configuration Table
}

entity EdiShiftDiffForCanada  : managed {
    key customerNo          : String(10) @title: '{i18n>customerNo}';
    key region              : String(3)  @title: '{i18n>region}';
    key materialNo          : String(18) @title: '{i18n>materialNo}';
        shiftDifferential   : String(1)  @title: '{i18n>shiftDifferential}';
        config              : Association to one Configurations; // Association to Configuration Table        
}

entity FGdefaultEmp         : managed {
    key employee            : String(10)  @title: '{i18n>employee}';
        config              : Association to one Configurations; // Association to Configuration Table
}

entity FGSiteCodeToAddressMapping  : managed {
    key customerNo          : String(10)   @title: '{i18n>customerNo}';
    key siteCodeName        : String(100)  @title: '{i18n>siteCodeName}';
        siteName            : String(100)  @title: '{i18n>siteName}';
        siteAddress1        : String(100)  @title: '{i18n>siteAddress1}';
        siteAddress2        : String(100)  @title: '{i18n>siteAddress2}';
        city                : String(40)   @title: '{i18n>city}';
        state               : String(3)    @title: '{i18n>state}';
        zipCode             : String(10)   @title: '{i18n>cityPostalCode}';
        country             : Country      @title: '{i18n>countryCode}';
        county              : String(40)   @title: '{i18n>district}';
        taxJurisdiction     : String(15)   @title: '{i18n>taxJurisdiction}';
        config              : Association to one Configurations; // Association to Configuration Table;      
}

entity FGBusinessUnit       : managed {
    key soldToParty         : String(10)  @title:'{i18n>soldToParty}';
    key businessCode        : String(100) @title:'{i18n>businessCode}';
        businessUnitName    : String(100) @title:'{i18n>businessUnitName}';
        config              : Association to one Configurations; // Association to Configuration Table
}

entity FGCostCenter         : managed {
    key soldToParty         : String(10)  @title:'{i18n>soldToParty}';
    key costCentreCode      : String(100) @title:'{i18n>costCentreCode}';
        costCentreName      : String(100) @title:'{i18n>costCentreName}';
        config              : Association to one Configurations; // Association to Configuration Table
}

entity TravelCustomerPayTermByPOBox : managed {
    key customerNo           : String(10)  @title:'{i18n>customerNo}';
    key customerTerm         : String(4)   @title:'{i18n>customerTerm}';
        poBox                : String(20)  @title:'{i18n>poBox}';
        config               : Association to one Configurations; // Association to Configuration Table
}
 
entity TravelPayTermFeed  : managed {
    key paymentTerm       : String(4)  @title:'{i18n>paymentTerm}';
        netPaymentTerm    : String(4)  @title:'{i18n>netPaymentTerm}';
        config            : Association to one Configurations; // Association to Configuration Table
}

entity CustomFieldsToVC    : managed {
    key customValue        : String(3)  @title:'{i18n>customValue}';
        description        : String(60) @title:'{i18n>description}';
        characteristicName : String(30) @title:'{i18n>characteristicName}';
        fieldName          : String(40) @title:'{i18n>fieldName}';
        config             : Association to one Configurations; // Association to Configuration Table
}

entity SCON_UOM 	         : managed {
    key salesDocItemCategory : String(4)  @title:'{i18n>salesDocItemCategory}';
    key uoM                  : String(3)  @title:'{i18n>uoM}';
        description          : String(25) @title:'{i18n>description}';
        billQtyChar          : String(30) @title:'{i18n>billQtyChar}';
        billRateChar         : String(30) @title:'{i18n>billRateChar}';
        billTotalChar        : String(30) @title:'{i18n>billTotalChar}';
        payQtyChar           : String(30) @title:'{i18n>payQtyChar}';
        payRateChar          : String(30) @title:'{i18n>payRateChar}';
        payTotalChar         : String(30) @title:'{i18n>payTotalChar}';
        priceChar            : String(30) @title:'{i18n>priceChar}';
        config               : Association to one Configurations; // Association to Configuration Table 
}

entity SalesCondition            : managed {
    key salesOrganization        : String(4) @title:'{i18n>salesOrganization}';
    key distributionChannel      : String(2) @title:'{i18n>distributionChannel}';
    key division                 : String(2) @title:'{i18n>division}';
    key custPricProcedure        : String(2) @title:'{i18n>custPricProcedure}';
        pricingProcedure         : String(5) @title:'{i18n>pricingProcedure}';
        conditionType            : String(4) @title:'{i18n>conditionType}';
        config                   : Association to one Configurations; // Association to Configuration Table 
}

entity CustomerZJOB  : managed{
    key customerNo   : String(10)  @title:'{i18n>customerNo}';
        config       : Association to one Configurations; // Association to Configuration Table 
}

entity Char_Usage_Details: managed{
    key application          : String(2)  @title:'{i18n>application}';
    key charDescription      : String(30) @title:'{i18n>charDescription}';
    key hasSequence          : Integer    @title:'{i18n>hasSequence}';
        qtyChar              : String(30) @title:'{i18n>qtyChar}';
        uom                  : String(2)  @title:'{i18n>uom}';
        rateChar             : String(30) @title:'{i18n>rateChar}';
        totalChar            : String(35) @title:'{i18n>totalChar}';
        vendorRate           : String(30) @title:'{i18n>vendorRate}';
        deDescription        : String(30) @title:'{i18n>deDescription}';
        config               : Association to one Configurations;
}

// entity Trip : managed {
//   key TripNumber   : Integer      @title:'{i18n>TripNumber}';
//   key Personnel    : Integer      @title:'{i18n>Personnel}';
//   key StartOfTrip  : Date         @title:'{i18n>StartOfTrip}';
//   key EndOfTrip    : Date         @title:'{i18n>EndOfTrip}';

//   Headers          : Association to many TRIPHeader on
//                         Headers.TripNumber   = $self.TripNumber  and
//                         Headers.Personnel    = $self.Personnel   and
//                         Headers.StartOfTrip  = $self.StartOfTrip and
//                         Headers.EndOfTrip    = $self.EndOfTrip;
//   Items            : Association to many TRIPItem   on
//                         Items.TripNumber     = $self.TripNumber  and
//                         Items.Personnel      = $self.Personnel   and
//                         Items.StartOfTrip    = $self.StartOfTrip and
//                         Items.EndOfTrip      = $self.EndOfTrip;
//   Costs            : Association to many TRIPCost   on
//                         Costs.TripNumber     = $self.TripNumber  and
//                         Costs.Personnel      = $self.Personnel   and
//                         Costs.StartOfTrip    = $self.StartOfTrip and
//                         Costs.EndOfTrip      = $self.EndOfTrip;
// }

// entity TRIPHeader : managed {
//   // Composite key linking to Trip
//   key TripNumber   : Integer;
//   key Personnel    : Integer;
//   key StartOfTrip  : Date;
//   key EndOfTrip    : Date;

//   // FK
//   Trip             : Association to Trip on
//                         Trip.TripNumber   = $self.TripNumber  and
//                         Trip.Personnel    = $self.Personnel   and
//                         Trip.StartOfTrip  = $self.StartOfTrip and
//                         Trip.EndOfTrip    = $self.EndOfTrip;

//   // Header-specific
//   TripType         : String(2)     @title:'{i18n>TripType}';
//   Destination      : String(50)    @title:'{i18n>Destination}';
//   Country          : Country       @title:'{i18n>Country}';
//   Region           : String(2)     @title:'{i18n>Region}';
//   TotalAmount      : Decimal(15,3) @title:'{i18n>TotalAmount}';
//   Currency         : Currency      @title:'{i18n>Currency}';
//   ReasonForTrip    : String(25)    @title:'{i18n>ReasonForTrip}';
//   TripStatus       : Integer       @title:'{i18n>TripStatus}';
//   TripSettlement   : Integer       @title:'{i18n>TripSettlement}';
//   Comments         : String(100)   @title:'{i18n>Comments}';
//   ContractNo       : String(10)    @title:'{i18n>ContractNo}';
//   WnInvoiceNo      : String(15)    @title:'{i18n>WnInvoiceNo}';
//   SapEmployeeNo    : String(8)     @title:'{i18n>SapEmployeeNo}';
//   WnWorkOrder      : String(30)    @title:'{i18n>WnWorkOrder}';
//   WoType           : String(2)     @title:'{i18n>WoType}';
//   InternalOrder    : String(12)    @title:'{i18n>InternalOrder}';
//   WeekEndDate      : String(8)     @title:'{i18n>WeekEndDate}';
// }

// entity TRIPItem : managed {
//   // Composite key + receipt
//   key TripNumber           : Integer      @title:'{i18n>TripNumber}';
//   key Personnel            : Integer      @title:'{i18n>Personnel}';
//   key StartOfTrip          : Date         @title:'{i18n>StartOfTrip}';
//   key EndOfTrip            : Date         @title:'{i18n>EndOfTrip}';
//   key ExpenseReceiptNumber : String(12)   @title:'{i18n>ExpenseReceiptNumber}';

//   // Associations
//   Header                  : Association to TRIPHeader on
//                         Header.TripNumber   = $self.TripNumber  and
//                         Header.Personnel    = $self.Personnel   and
//                         Header.StartOfTrip  = $self.StartOfTrip and
//                         Header.EndOfTrip    = $self.EndOfTrip;
//   Trip                    : Association to Trip      on
//                         Trip.TripNumber       = $self.TripNumber  and
//                         Trip.Personnel        = $self.Personnel   and
//                         Trip.StartOfTrip      = $self.StartOfTrip and
//                         Trip.EndOfTrip        = $self.EndOfTrip;

//   // Item-specific
//   TripExpenseType         : String(4)     @title:'{i18n>TripExpenseType}';
//   Amount                  : Decimal(15,3) @title:'{i18n>Amount}';
//   Currency                : Currency      @title:'{i18n>Currency}';
//   ![From]                 : String(20)    @title:'{i18n>From}';
//   ![To]                   : String(20)    @title:'{i18n>To}';
//   ReceiptsDocumentNumber  : Integer       @title:'{i18n>ReceiptsDocumentNumber}';
//   UrlLink                 : String(120)   @title:'{i18n>UrlLink}';
// }

// entity TRIPCost : managed {
//   // Composite key + distribution
//   key TripNumber                 : Integer      @title:'{i18n>TripNumber}';
//   key Personnel                  : Integer      @title:'{i18n>Personnel}';
//   key StartOfTrip                : Date         @title:'{i18n>StartOfTrip}';
//   key EndOfTrip                  : Date         @title:'{i18n>EndOfTrip}';
//   key CostDistributionPercentage : Decimal(3,2) @title:'{i18n>CostDistributionPercentage}';

//   // FK
//   Trip                          : Association to Trip on
//                         Trip.TripNumber      = $self.TripNumber  and
//                         Trip.Personnel       = $self.Personnel   and
//                         Trip.StartOfTrip     = $self.StartOfTrip and
//                         Trip.EndOfTrip       = $self.EndOfTrip;

//   // Cost-specific
//   Project                       : String(12)    @title:'{i18n>Project}';
// }



entity Trip : managed {
  key TripNumber  : Integer       @title:'{i18n>TripNumber}';
  key Personnel   : String(8)     @title:'{i18n>Personnel}';
  key StartOfTrip : Date          @title:'{i18n>StartOfTrip}';
  key EndOfTrip   : Date          @title:'{i18n>EndOfTrip}';

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

entity TRIPHeader : managed {
  key TripNumber   : Integer;
  key Personnel    : String(8);
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
  TripStatus       : Association to one TripStatusList;
  TripSettlement   : Integer;
  Comments         : String(100);
  ContractNo       : String(10);
  WnInvoiceNo      : String(15);
  SapEmployeeNo    : String(8);
  WnWorkOrder      : String(30);
  WoType           : String(2);
  InternalOrder    : String(12);
  WeekEndDate      : String(8);
  Project          : String(12) @mandatory;
  SapSalesDocNo    : String(10) @title:'{i18n>SapSalesDocNo}';
  SapSalesDocItemNo: String(10) @title:'{i18n>SapSalesDocItemNo}';
  CustWeekEnding   : Date       @title:'{i18n>CustWeekEnding}';
  CustBusinessUnit : String(30) @title:'{i18n>CustBusinessUnit}';
  CustChargeNo     : String(30) @title:'{i18n>CustChargeNo}';
  ProjectNo        : String(30) @title:'{i18n>ProjectNo}';
  CustCompanyCode  : String(30) @title:'{i18n>CustCompanyCode}';
  CustDeptNo       : String(30) @title:'{i18n>CustDeptNo}';
  CustDOTSNo       : String(30) @title:'{i18n>CustDOTSNo}';
  CustRUI          : String(30) @title:'{i18n>CustRUI}';
  CustAccountNo    : String(30) @title:'{i18n>CustAccountNo}';
  CustBudgetCenter : String(30) @title:'{i18n>CustBudgetCenter}';
  CustContractNo   : String(30) @title:'{i18n>CustContractNo}';
  SGVendorNo       : String(30) @title:'{i18n>SGVendorNo}';
  CustOrgCode      : String(30) @title:'{i18n>CustOrgCode}';
  CustLegalEntity  : String(30) @title:'{i18n>CustLegalEntity}';
  CustOracleNo     : String(30) @title:'{i18n>CustOracleNo}';
  CustUnitStoreNo  : String(30) @title:'{i18n>CustUnitStoreNo}';
  ServiceDate      : Date       @title:'{i18n>ServiceDate}';
  CustEmployeeNo   : String(30) @title:'{i18n>CustEmployeeNo}';
  CustAgreementName: String(30) @title:'{i18n>CustAgreementName}';
  Task             : String(30) @title:'{i18n>Task}';
  FEPSCode         : String(30) @title:'{i18n>FEPSCode}';
  CustPosition     : String(30) @title:'{i18n>CustPosition}';
  CustGLCode       : String(30) @title:'{i18n>CustGLCode}';
  PurchaseAgreement: String(30) @title:'{i18n>PurchaseAgreement}';
  BB               : String(30) @title:'{i18n>BB}';
  CustBackgroundCheckDate: Date @title:'{i18n>CustBackgroundCheckDate}';
  CustDivisionUnitNo : String(30) @title:'{i18n>CustDivisionUnitNo}';
  CustPositionCode   : String(30) @title:'{i18n>CustPositionCode}';
  CustCostCentre     : String(30) @title:'{i18n>CustCostCentre}';
  CustPoLineItemNo   : String(30) @title:'{i18n>CustPoLineItemNo}'
}

entity TRIPItem : managed {
  key TripNumber           : Integer;
  key Personnel            : String(8);
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

  /* Escape reserved names */
  ![From]         : String(20)   @title:'{i18n>From}';
  ![To]           : String(20)   @title:'{i18n>To}';
  
  ReceiptsDocumentNumber : Integer;
  UrlLink                : String(120);
}

entity TRIPCost : managed {
  key TripNumber                 : Integer;
  key Personnel                  : String(8);
  key StartOfTrip                : Date;
  key EndOfTrip                  : Date;
  key CostDistributionPercentage : Decimal(3,2);

  Trip : Association to Trip on
    Trip.TripNumber  = $self.TripNumber  and
    Trip.Personnel   = $self.Personnel   and
    Trip.StartOfTrip = $self.StartOfTrip and
    Trip.EndOfTrip   = $self.EndOfTrip;

  Project                    : String(12);
}

entity ExpenseTypes {
  key language          : String;
  key tripProvision     : String;
  key expenseType       : String;
      description       : String;
      glAccount         : String;
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
      H.TripStatus.code as StatusText,       
      T.createdAt       as CreatedAt,
      T.createdBy       as CreatedBy,
      T.modifiedAt      as ModifiedAt,
      T.modifiedBy      as ModifiedBy
}

entity Credit_Rebill : record, {
    wnInvoiceNo          : String(15)                    @title: '{i18n>wnInvoiceNo}';
    wnWorkOrderNo        : String(30)                    @title: '{i18n>wnWorkOrderNo}';
    woType               : String(2)                     @title: '{i18n>woType}';
    wnInvalidationInvNo  : String(15)                    @title: '{i18n>wnInvalidationInvNo}';

}

entity Fg_Invoices : record {
    workerID               : String(15)     @title: '{i18n>wokerID}';
    fgInvoiceID            : String(15)     @title: '{i18n>fgInvoiceID}';
    fgInvoicetype          : String(15)     @title: '{i18n>fgInvoicetype}';
    fgInvoiceLinetype      : String(15)     @title: '{i18n>fgInvoiceLinetype}';
    invSubmissionDate      : String(20)     @title: '{i18n>invSubmissionDate}';
    fgSiteCode             : String(100)    @title: '{i18n>fgSiteCode}';
    invLineAmount          : String(30)     @title: '{i18n>invLineAmount}';
    invLineAdjAmount       : String(30)     @title: '{i18n>invLineAdjAmount}';
    currency               : String(5)      @title: '{i18n>currency}'; // fixed typo from curreny
    firstName              : String(100)    @title: '{i18n>firstName}';
    lastName               : String(100)    @title: '{i18n>lastName}';
    businessCode           : String(100)    @title: '{i18n>businessCode}';
    costCenterCode         : String(100)    @title: '{i18n>costCenterCode}';
    costCenterName         : String(100)    @title: '{i18n>costCenterName}';
    fgTaskCode             : String(100)    @title: '{i18n>fgTaskCode}';
    fgTaskName             : String(100)    @title: '{i18n>fgTaskName}';
    glAccount              : String(100)    @title: '{i18n>glAccount}';
    stHours                : String(18)     @title: '{i18n>stHours}';
    otHours                : String(18)     @title: '{i18n>otHours}';
    dtHours                : String(18)     @title: '{i18n>dtHours}';
    customerBillRateST     : String(18)     @title: '{i18n>customerBillRateST}';
    customerBillRateOt     : String(18)     @title: '{i18n>customerBillRateOt}';
    customerBillRateDt     : String(18)     @title: '{i18n>customerBillRateDt}';
    fgWorkOrderID          : String(30)     @title: '{i18n>fgWorkOrderID}'; // extended length to allow business unit names like "Power Systems"
    timesheetID            : String(14)     @title: '{i18n>timesheetID}';
    parentTimesheetID      : String(14)     @title: '{i18n>parentTimesheetID}';
    fgInvoiceOrgID         : String(14)     @title: '{i18n>fgInvoiceOrgID}';
    revision               : String(10)     @title: '{i18n>revision}';
    timeSheetStatus        : String(15)     @title: '{i18n>timeSheetStatus}';
    timeSheetStartDate     : String(10)     @title: '{i18n>timeSheetStartDate}';
    timeSheetEndDate       : String(10)     @title: '{i18n>timeSheetEndDate}';
    timeSheetApprovedDate  : String(20)     @title: '{i18n>timeSheetApprovedDate}';
    quantity               : String(18)     @title: '{i18n>quantity}'; // changed from Decimal
    contractNoSS           : String(10)     @title: '{i18n>contractNoSS}';
    timeSheetEntryDate     : String(10)     @title: '{i18n>timeSheetEntryDate}';
    supplierPayRateST      : String(18)     @title: '{i18n>supplierPayRateST}';
    supplierPayRateOT      : String(18)     @title: '{i18n>supplierPayRateOT}';
    supplierPayRateDT      : String(18)     @title: '{i18n>supplierPayRateDT}';
    contractNoWN           : String(30)     @title: '{i18n>contractNoWN}'; // extended due to "Human Resources"
    orderNo                : String(12)     @title: '{i18n>orderNo}';
    personnelNo            : String(20)     @title: '{i18n>personnelNo}'; // removed regex to allow values like "Invoiced"
    fgGLCustomerCode       : String(20)     @title: '{i18n>fgGLCustomerCode}';
}

entity Fg_Credit_Rebill: record, {
    wokerID                   : String(14)                    @title: '{i18n>wokerID}';
    fgInvoiceID               : String(14)                    @title: '{i18n>fgInvoiceID}';
    fgInvoicetype             : String(15)                    @title: '{i18n>fgInvoicetype}';
    fgInvoiceLinetype         : String(15)                    @title: '{i18n>fgInvoiceLinetype}';
    invSubmissionDate         : String(20)                    @title: '{i18n>invSubmissionDate}';
    fgSiteCode                : String(100)                   @title: '{i18n>fgSiteCode}';
    invLineAmount             : String(30)                    @title: '{i18n>invLineAmount}';
    invLineAdjAmount          : String(30)                    @title: '{i18n>invLineAdjAmount}';
    curreny                   : String(5)                     @title: '{i18n>curreny}';
    firstName                 : String(100)                   @title: '{i18n>firstName}';
    lastName                  : String(100)                   @title: '{i18n>lastName}';
    businessCode              : String(100)                   @title: '{i18n>businessCode}';
    costCenterCode            : String(100)                   @title: '{i18n>costCenterCode}';
    costCenterName            : String(100)                   @title: '{i18n>costCenterName}';
    fgTaskCode                : String(100)                   @title: '{i18n>fgTaskCode}';
    fgTaskName                : String(100)                   @title: '{i18n>fgTaskName}';
    glAccount                 : String(100)                   @title: '{i18n>glAccount}';
    stHours                   : String(18)                    @title: '{i18n>stHours}';
    otHours                   : String(18)                    @title: '{i18n>otHours}';
    dtHours                   : String(18)                    @title: '{i18n>dtHours}';
    customerBillRateST        : String(18)                    @title: '{i18n>customerBillRateST}';
    customerBillRateOt        : String(18)                    @title: '{i18n>customerBillRateOt}';
    customerBillRateDt        : String(18)                    @title: '{i18n>customerBillRateDt}';
    fgWorkOrderID             : String(14)                    @title: '{i18n>fgWorkOrderID}';
    timesheetID               : String(14)                    @title: '{i18n>timesheetID}';
    parentTimesheetID         : String(14)                    @title: '{i18n>parentTimesheetID}';
    fgInvoiceOrgID            : String(14)                    @title: '{i18n>fgInvoiceOrgID}';
    revision                  : String(10)                    @title: '{i18n>revision}';
    timeSheetStatus           : String(15)                    @title: '{i18n>timeSheetStatus}';
    timeSheetStartDate        : String(10)                    @title: '{i18n>timeSheetStartDate}';
    timeSheetEndDate          : String(10)                    @title: '{i18n>timeSheetEndDate}';
    timeSheetApprovedDate     : String(20)                    @title: '{i18n>timeSheetApprovedDate}';
    quantity                  : Decimal(15,2)                 @title: '{i18n>quantity}';
    contractNoSS              : String(10)                    @title: '{i18n>contractNoSS}';
    timeSheetEntryDate        : String(10)                    @title: '{i18n>timeSheetEntryDate}';
    supplierPayRateST         : String(18)                    @title: '{i18n>supplierPayRateST}';
    supplierPayRateOT         : String(18)                    @title: '{i18n>supplierPayRateOT}';
    supplierPayRateDT         : String(18)                    @title: '{i18n>supplierPayRateDT}';
    contractNoWN              : String(10)                    @title: '{i18n>contractNoWN}';
    orderNo                   : String(12)                    @title: '{i18n>orderNo}';
    personnelNo               : String(8)                     @assert.format: '^[0-9]{1,8}$' @title: '{i18n>personnelNo}';
    fgGLCustomerCode          : String(20)                    @title: '{i18n>fgGLCustomerCode}';
}


// interface 4 - Term

entity Terminations : record {
    contractNo                : String(10)                            @title: '{i18n>contractNo}';
    term                      : String(2)                             @title: '{i18n>term}';
    employeeNo                : GlobalTypes.PersonnelNumber           @title: '{i18n>employeeNo}';
    endDate                   : String(10)                            @title: '{i18n>endDate}';
    actionReason              : String(2)                             @title: '{i18n>actionReason}';
    salesDocumentType         : GlobalTypes.SalesDocumentType         @title: '{i18n>salesDocumentType}';
    workOrderWN               : String(30)                            @title: '{i18n>workOrderWN}';
}
// Entity O
entity OtherBillables:record,customerFields {  
    contractNo              : String(10)      @title: '{i18n>contractNo}';
    wnInvoiceNo             : String(15)      @title: '{i18n>wnInvoiceNo}';
    sapEmployeeNo           : String(8)       @title: '{i18n>sapEmployeeNo}';
    wnWorkOrder             : String(30)      @title: '{i18n>wnWorkOrder}';
    woType                  : String(2)       @title: '{i18n>woType}';
    otherBillableType       : String(16)      @title: '{i18n>otherBillableType}';
    internalOrder           : String(12)      @title: '{i18n>internalOrder}';
    weekEndDate             : String(8)       @title: '{i18n>weekEndDate}';
    itemQuantity            : String(18)      @title: '{i18n>itemQuantity}';
    customerBillDate        : String(18)      @title: '{i18n>customerBillDate}';
    vendorPayDate           : String(18)      @title: '{i18n>vendorPayDate}';
    currency                : String(5)       @title: '{i18n>currency}';
    customerPoNoLabor       : String(35)      @title: '{i18n>customerPoNoLabor}';
}

// entity G
entity Bonus:record,customerFields {
    contractNo         : String(10)   @title: '{i18n>contractNo}';
    wnInvoiceNo        : String(15)   @title: '{i18n>wnInvoiceNo}';
    sapEmployeeNo      : String(8)    @title: '{i18n>sapEmployeeNo}';
    wnWorkOrder        : String(30)   @title: '{i18n>wnWorkOrder}';
    woType             : String(2)    @title: '{i18n>woType}';
    internalOrder      : String(12)   @title: '{i18n>internalOrder}';
    endDate            : String(8)    @title: '{i18n>endDate}';
    customerBillRate   : String(18)   @title: '{i18n>customerBillRate}';
    vendorPayRate      : String(18)   @title: '{i18n>vendorPayDate}';
    currency           : Currency;
    customerPO         : String(35)   @title: '{i18n>customerPO}';
}

//entity Travel-WN-2
entity Travel:         record,customerFields {
  contractNo           : String(10)      @title: '{i18n>contractNo}';
  wnInvoiceNo          : String(15)      @title: '{i18n>wnInvoiceNo}';
  sapEmployeeNo        : String(8)       @title: '{i18n>sapEmployeeNo}';
  wnWorkOrder          : String(30)      @title: '{i18n>wnWorkOrder}';
  woType               : String(2)       @title: '{i18n>woType}';
  internalOrder        : String(12)      @title: '{i18n>internalOrder}';
  weekEndDate          : String(8)       @title: '{i18n>weekEndDate}';
  beginDate            : String(8)       @title: '{i18n>beginDate}';
  endDate              : String(8)       @title: '{i18n>endDate}';
  tripActivityType     : String(1)       @title: '{i18n>tripActivityType}';
  country              : Country;
  tripExpenseType      : String(4)       @title: '{i18n>tripExpenseType}';
  amount               : String(18)      @title: '{i18n>amount}';
  currency             : Currency;

}

//Entity E
entity SowScWo: record, address, customerFields{
    contractNo         : String(10)              @title: '{i18n>contractNo}';
    soldToParty        : GlobalTypes.SoldToParty;
    billToParty        : GlobalTypes.BillToParty;
    workOrderWN        : String(30)              @title: '{i18n>workOrderWN}';
    salesOffice        : GlobalTypes.SalesOffice;
    custPurOrder       : String(35)              @title: '{i18n>custPurOrder}';
    beginDate          : GlobalTypes.ABAPDate    @title: '{i18n>beginDate}';
    endDate            : GlobalTypes.ABAPDate    @title: '{i18n>endDate}';
    currency           : Currency;
    materialNo         : GlobalTypes.MaterialNumber;
    workLocation       : String(35)              @title: '{i18n>workLocation}';
    poDesc             : String(50)              @title: '{i18n>poDesc}';
    remitToVendor      : String(10)              @title: '{i18n>remitToVendor}';
    custPurOrderTotal  : String(18)              @title: '{i18n>custPurOrderTotal}';
    attentionLine      : String(40)              @title: '{i18n>attensionLine}';
    distributionEmail  : String(130)             @title: '{i18n>distributionEmail}';
}
 
//Entity F
entity SowScInvoice: record, customerFields{
    contractNo          : String(10)             @title: '{i18n>contractNo}';
    wnInvoiceNo         : String(15)             @title: '{i18n>wnInvoiceNo}';
    internalOrder       : String(12)             @title: '{i18n>internalOrder}';
    wnWorkOrder         : String(30)             @title: '{i18n>wnWorkOrder}';
    beginDate           : GlobalTypes.ABAPDate   @title: '{i18n>beginDate}';
    endDate             : GlobalTypes.ABAPDate   @title: '{i18n>endDate}';
    materialNo          : GlobalTypes.MaterialNumber;
    materialDesc        : String(50)             @title: '{i18n>materialDesc}';        
    itemQuantity        : String(18)             @title: '{i18n>itemQuantity}';
    purchasingUOM       : String(3)              @title: '{i18n>purchasingUOM}';
    custLineItemUOM     : String(5)              @title: '{i18n>custLineItemUOM}';
    customerBillRate    : String(18)             @title: '{i18n>customerBillRate}';
    customerTotal       : String(18)             @title: '{i18n>customerTotal}';
    wnVendorTaxAmount   : String(18)             @title: '{i18n>wnVendorTaxAmount}';
    custPurchaseOrder   : String(35)             @title: '{i18n>custPurchaseOrder}';
    custPoLineItemNo    : String(4)              @title: '{i18n>custPoLineItemNo}';
    vendorPayRate       : String(18)             @title: '{i18n>vendorPayRate}';
    vendorTotal         : String(18)             @title: '{i18n>vendorTotal}';
    supplierInvoiceNo   : String(15)             @title: '{i18n>supplierInvoiceNo}';
    hybridPricing       : String(1)              @title: '{i18n>hybridPricing}';
    supplierAdminFee    : String(18)             @title: '{i18n>supplierAdminFee}';
    customerAdminFee    : String(18)             @title: '{i18n>customerAdminFee}';
    commodityCode       : String(15)             @title: '{i18n>commodityCode}';
    categoryCode        : String(15)             @title: '{i18n>categoryCode}';
    taxIndicator        : String(1)              @title: '{i18n>taxIndicator}';
    plant               : String(4)              @title: '{i18n>plant}';
    clientTaxAmount     : String(18)             @title: '{i18n>clientTaxAmount}';
    verbiageCode        : String(4)              @title: '{i18n>verbiageCode}';
    clientTaxIndicator  : String(1)              @title: '{i18n>clientTaxIndicator}';
    vendorTaxIndicator  : String(1)              @title: '{i18n>vendorTaxIndicator}';
 
}
entity Drug_Background_Check : record, customerFields {
    file                    : Association to one Files;
    contractNo               : String(10)  @title:'{i18n>contractNo}';
    wnInvoiceNo              : String(15)  @title:'{i18n>wnInvoiceNo}';
    employeeNo               : String(8)   @title:'{i18n>employeeNo}';
    workOrderWN              : String(30)  @title:'{i18n>workOrderWN}';
    salesDocumentType        : String(2)   @title:'{i18n>salesDocumentType}';
    expenseType              : String(4)   @title:'{i18n>expenseType}';
    project                  : String(12)  @title:'{i18n>project}';
    weekEndDate              : String(8)   @title:'{i18n>weekEndDate}';
    amount                   : String(18)  @title:'{i18n>amount}';
    currency                 : Currency;
    customerPoNoLabor        : String(35)  @title:'{i18n>customerPoNoLabor}';                  
}

entity Credits_for_LegacyInvoices: managed {
    key zzInvoice                : String(30) @title:'{i18n>zzInvoice}';
    key workOrder                : String(30) @title:'{i18n>workOrder}';
    key contract                 : String(10) @title:'{i18n>contract}';
    key employeeZ3               : String(8)  @title:'{i18n>employeeZ3}';
        creditProcessed          : Boolean    @title:'{i18n>creditProcessed}';
        companyCode              : String(4)  @title:'{i18n>companyCode}';
        salesOrganization        : String(4)  @title:'{i18n>salesOrganization}';
        distributionChannel      : String(2)  @title:'{i18n>distributionChannel}';
        division                 : String(2)  @title:'{i18n>division}';
        salesOffice              : String(4)  @title:'{i18n>salesOffice}';
        soldToParty              : String(10) @title:'{i18n>soldToParty}';
        billToParty              : String(10) @title:'{i18n>billToParty}';
        payer                    : String(10) @title:'{i18n>payer}';
        employeeName             : String(40) @title:'{i18n>employeeName}';
        salesOrder               : String(10) @title:'{i18n>salesOrder}';
        salesOrderItem           : String(6)  @title:'{i18n>salesOrderItem}';
        customerGroup            : String(2)  @title:'{i18n>customerGroup}';   
        transactionCurrency      : String(5)  @title:'{i18n>transactionCurrency}';
        purchaseOrderByCustomer  : String(35) @title:'{i18n>purchaseOrderByCustomer}';
        billingDocument          : String(10) @title:'{i18n>billingDocument}';
        billingDate              : Date       @title:'{i18n>billingDate}';
        billingDocumentItem      : String(6)  @title:'{i18n>billingDocumentItem}';
        salesOrderMaterial       : String(40) @title:'{i18n>salesOrderMaterial}';
        salesOrderMaterialText   : String(40) @title:'{i18n>salesOrderMaterialText}';
        paymentTerms             : String(4)  @title:'{i18n>paymentTerms}';
        plant                    : String(4)  @title:'{i18n>plant}';
        internalOrderNo          : String(10) @title:'{i18n>internalOrderNo}';
        conditionType            : String(4)  @title:'{i18n>conditionType}';
        amount                   : Integer    @title:'{i18n>amount}';
        purchaseOrder            : String(35) @title:'{i18n>purchaseOrder}';
        purchaseOrderItem        : String(5)  @title:'{i18n>purchaseOrderItem}';
        supplier                 : String(10) @title:'{i18n>supplier}';
        taxCode                  : String(2)  @title:'{i18n>taxCode}';
        taxJurisdictionCode      : String(12) @title:'{i18n>taxJurisdictionCode}';
        taxItemClassification    : String(3)  @title:'{i18n>taxItemClassification}';
        glAccount                : String(10) @title:'{i18n>glAccount}';
        materialUoM              : String(10) @title:'{i18n>materialUoM}';
        poNetAmount              : Integer    @title:'{i18n>poNetAmount}';
        poTaxAmount              : Integer    @title:'{i18n>poTaxAmount}';
        glAccountAmount          : Integer    @title:'{i18n>glAccountAmount}'
}
