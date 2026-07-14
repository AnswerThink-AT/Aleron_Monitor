namespace com.aleron.monitor;

using {
    cuid,
    managed,
    User,
    Country
} from '@sap/cds/common';
using {sap.common.CodeList as CodeList} from '@sap/cds/common';
using {com.aleron.monitor.Files as Files} from '../schema';
using from '@sap/cds-common-content';


entity FileStatus : CodeList {
    key code : Integer enum {
            initial = 1; // New
            processing = 2; // In Process
            done = 3; // Completed
            error = 4; // Error
            canceled = 5; // Manually Rejected
            partial = 6; // Partially Completed
        };
}

entity TripStatusList : CodeList {
  key code : Integer enum {
    created                = 0;
    approved               = 1;
    settled                = 2;
    salesOrderUpdated      = 3;
    purchaseOrderUpdated   = 4;
    completed              = 5;
    cancelled              = 6;
    draft                  = 7;
  };
}

entity Processes : CodeList {
    key code : String(1) @title: '{i18n>processCode}';
}

entity LogType : CodeList {
        @title: '{i18n>logType}'
    key code : Integer enum {
            info = 0;
            error = 1;
            warn = 2;
            success = 3;
            debug = 5;
        };
}

entity ProcessLogs : cuid, managed {
    record_ID   : String;
    type        : Association to LogType;
    process_code: String(1);
    message     : String    @title: '{i18n>errorMessage}';
    createdtime : Timestamp @title: '{i18n>createdTime}'; // Explicit created timestamp, set at every log-creation code path, used to sort logs with most recent first
}

aspect record : cuid, managed, SAPFields {
    key file         : Association to one Files;
        processLevel : Association to one Processes     @title: '{i18n>processLevel}';
        logs         : Composition of many ProcessLogs
                           on logs.record_ID = $self.ID @title: '{i18n>processLogs}';
        valid        : Boolean default false            @title: '{i18n>valid}'; // Correctness on a particular step - status
        criticality  : String = (valid = true ? 3 : 1);
        rejected     : Boolean default false            @title: '{i18n>rejected}'; // true if file was rejected manually
        uploadSeq    : Integer @title: 'Upload Sequence';   // NEW — keeps original row order
}

aspect address {
    doorNo     : String(10) @title: '{i18n>doorNo}';
    street     : String(60) @title: '{i18n>street}';
    city       : String(40) @title: '{i18n>city}';
    region     : String(3)  @title: '{i18n>region}';
    country    : Country;
    postalCode : String(10) @title: '{i18n>postalCode}';
}

aspect personnelInfo {
    lastName      : String(40)           @title: '{i18n>lastName}';
    firstName     : String(40)           @title: '{i18n>firstName}';
    middleName    : String(40)           @title: '{i18n>middleName}';
    ssn           : String(11)           @title: '{i18n>ssn}';
    dateOfBirth   : GlobalTypes.ABAPDate @title: '{i18n>dateOfBirth}';

    @title: '{i18n>gender}'
    gender        : String enum {
        male = '1';
        female = '0';
    } default '1';

    @title: '{i18n>maritalStatus}'
    maritalStatus : String enum {
        single = 'S';
        married = 'M';
    };
}

aspect SAPFields {
    area                        : GlobalTypes.SalesDocumentType             @title: '{i18n>area}';
    workOrderType               : String(2)                                 @title: '{i18n>workOrderType}';
    term                        : String(2)                                 @title: '{i18n>term}';
    personnelNoSAP              : GlobalTypes.PersonnelNumber               @title: '{i18n>personnelNoSAP}';
    salesDocumentNoSAP          : GlobalTypes.SalesDocument                 @title: '{i18n>salesDocumentNoSAP}';
    salesItemNoSAP              : GlobalTypes.SalesDocumentItem             @title: '{i18n>salesItemNoSAP}';
    projectNumberSAP            : GlobalTypes.OrderNumber                   @title: '{i18n>projectNumberSAP}';
    projectUUID                 : String                                      @title: '{i18n>projectUUID}';
    vcData1UUID                 : String                                      @title: '{i18n>vcData1UUID}';
    vcData2UUID                 : String                                      @title: '{i18n>vcData2UUID}';
    vcData1ICUUID               : String                                      @title: '{i18n>vcData1ICUUID}';
    vcData2ICUUID               : String                                      @title: '{i18n>vcData2ICUUID}';
    vendorZR                    : String(10)                                 @title: '{i18n>lifnrZR}';
    @title: '{i18n>PORequiredSAP}'
    PORequiredSAP               : String enum {
        none = '';
        create_PO = '1';
        create_IC_PO = '2';
        create_PO_OLD = 'X';
    };
    purchaseDocumentNoSAP       : GlobalTypes.PurchasingDocument            @title: '{i18n>purchaseDocumentNoSAP}';
    purchaseDocumentItemSAP     : GlobalTypes.PurchasingDocumentItem        @title: '{i18n>purchaseDocumentItemSAP}';

    @title: '{i18n>tripRequiredSAP}'
    tripRequiredSAP             : String enum {
        none = '';
        create_trip = '1';
        create_IC_trip = '2';
        create_trip_OLD = 'X';
    };
    tripNoSAP                   : GlobalTypes.TripNumber                    @title: '{i18n>tripNoSAP}';
    salesDocumentTypeSAP        : GlobalTypes.SalesDocumentType             @title: '{i18n>salesDocumentTypeSAP}';
    fiscalYearSAP               : GlobalTypes.FiscalYear                    @title: '{i18n>fiscalYearSAP}';
    invoiceDocumentNoSAP        : GlobalTypes.InvoiceDocumentNumber         @title: '{i18n>invoiceDocumentNoSAP}';
    salesOrderICSAP             : GlobalTypes.SalesDocument                 @title: '{i18n>salesOrderICSAP}'; // IC = Intercompany
    salesItemNoICSAP            : GlobalTypes.SalesDocumentItem             @title: '{i18n>salesItemNoICSAP}';
    partnerFunctionSAP          : GlobalTypes.PartnerFunction               @title: '{i18n>partnerFunctionSAP}';
    salesOrderICUpdateRequired  : Boolean                                   @title: '{i18n>salesOrderICUpdateRequired}';
    creditMemoSAP               : GlobalTypes.CreditMemo                    @title: '{i18n>creditMemoSAP}';
    creditMemoICSAP             : GlobalTypes.CreditMemo                    @title: '{i18n>creditMemoICSAP}';
    p2SalesDocumentNoSAP        : GlobalTypes.SalesDocument                 @title: '{i18n>p2SalesDocumentNoSAP}';
    employeeSubgroupSAP         : GlobalTypes.EmployeeSubgroup              @title: '{i18n>employeeSubgroupSAP}';
    creditRebillSAP             : Boolean                                   @title: '{i18n>creditRebillSAP}';
    invoiceNoWNSAP              : GlobalTypes.InvoiceNumber                 @title: '{i18n>invoiceNoWNSAP}'; // WN = WorkNexus
    invalidInvoiceNoWNSAP       : GlobalTypes.InvoiceNumber                 @title: '{i18n>invalidInvoiceNoWNSAP}';
    creditYearSAP               : GlobalTypes.FiscalYear                    @title: '{i18n>creditYearSAP}';
    creditInvoiceSAP            : GlobalTypes.InvoiceDocumentNumber         @title: '{i18n>creditInvoiceSAP}';
    rejectReasonSalesOrderSAP   : GlobalTypes.QuotSalesOrderRejectionReason @title: '{i18n>rejectReasonSalesOrderSAP}';
    rejectReasonSalesOrderICSAP : GlobalTypes.QuotSalesOrderRejectionReason @title: '{i18n>rejectReasonSalesOrderICSAP}';
    z42SAP                      : Boolean                                   @title: '{i18n>z42SAP}';
    creditSteps                 : String(30)                                @title: '{i18n>creditSteps}';
    overrideAt                  : Timestamp                                 @title: '{i18n>overrideAt}';
    overrideBy                  : User                                      @title: '{i18n>overrideBy}';
    // salesDocumentNo             : GlobalTypes.SalesDocument;
    salesItemNo                 : GlobalTypes.SalesDocumentItem             @title: '{i18n>salesItemNo}';
    purchaseDocumentNo          : GlobalTypes.PurchasingDocument            @title: '{i18n>purchaseDocumentNo}';
    purchaseDocumentItem        : GlobalTypes.PurchasingDocumentItem        @title: '{i18n>purchaseDocumentItem}';
    email                       : GlobalTypes.Email                         @title: '{i18n>email}';
    companyCode                 : GlobalTypes.CompanyCode                   @title: '{i18n>companyCode}';
    distributionChannelSAP      : String(2)                                 @title: '{i18n>distributionChannelSAP}';
    distributionChannelICSAP    : String(2)                                 @title: '{i18n>distributionChannelICSAP}';
    projectNumberICSAP          : GlobalTypes.OrderNumber                   @title: '{i18n>projectNumberICSAP}';
    legacyContractNo            : String(20)                                @title: '{i18n>legacyContractNo}';
}

aspect customerFields {
    customerFieldName1   : String                      @title: '{i18n>customerFieldName1}';
    customerFieldValue1  : String                      @title: '{i18n>customerFieldValue1}';
    customerFieldName2   : type of customerFieldName1  @title: '{i18n>customerFieldName2}';
    customerFieldValue2  : type of customerFieldValue1 @title: '{i18n>customerFieldValue2}';
    customerFieldName3   : type of customerFieldName1  @title: '{i18n>customerFieldName3}';
    customerFieldValue3  : type of customerFieldValue1 @title: '{i18n>customerFieldValue3}';
    customerFieldName4   : type of customerFieldName1  @title: '{i18n>customerFieldName4}';
    customerFieldValue4  : type of customerFieldValue1 @title: '{i18n>customerFieldValue4}';
    customerFieldName5   : type of customerFieldName1  @title: '{i18n>customerFieldName5}';
    customerFieldValue5  : type of customerFieldValue1 @title: '{i18n>customerFieldValue5}';
    customerFieldName6   : type of customerFieldName1  @title: '{i18n>customerFieldName6}';
    customerFieldValue6  : type of customerFieldValue1 @title: '{i18n>customerFieldValue6}';
    customerFieldName7   : type of customerFieldName1  @title: '{i18n>customerFieldName7}';
    customerFieldValue7  : type of customerFieldValue1 @title: '{i18n>customerFieldValue7}';
    customerFieldName8   : type of customerFieldName1  @title: '{i18n>customerFieldName8}';
    customerFieldValue8  : type of customerFieldValue1 @title: '{i18n>customerFieldValue8}';
    customerFieldName9   : type of customerFieldName1  @title: '{i18n>customerFieldName9}';
    customerFieldValue9  : type of customerFieldValue1 @title: '{i18n>customerFieldValue9}';
    customerFieldName10  : type of customerFieldName1  @title: '{i18n>customerFieldName10}';
    customerFieldValue10 : type of customerFieldValue1 @title: '{i18n>customerFieldValue10}';
    customerFieldName11  : type of customerFieldName1  @title: '{i18n>customerFieldName11}';
    customerFieldValue11 : type of customerFieldValue1 @title: '{i18n>customerFieldValue11}';
    customerFieldName12  : type of customerFieldName1  @title: '{i18n>customerFieldName12}';
    customerFieldValue12 : type of customerFieldValue1 @title: '{i18n>customerFieldValue12}';
    customerFieldName13  : type of customerFieldName1  @title: '{i18n>customerFieldName13}';
    customerFieldValue13 : type of customerFieldValue1 @title: '{i18n>customerFieldValue13}';
    customerFieldName14  : type of customerFieldName1  @title: '{i18n>customerFieldName14}';
    customerFieldValue14 : type of customerFieldValue1 @title: '{i18n>customerFieldValue14}';
    customerFieldName15  : type of customerFieldName1  @title: '{i18n>customerFieldName15}';
    customerFieldValue15 : type of customerFieldValue1 @title: '{i18n>customerFieldValue15}';
}

aspect employeeHireCommonFields {
    @title: '{i18n>outboundStatus}'
    outboundStatus : String enum {
        ready = '8';
        complete = '9';
        notready = 'N';
    };
    plansSAP       : String(8)  @assert.format: '^[0-9]{8}$'  @title: '{i18n>plansSAP}';
}

aspect shifts {
    shiftRGFirst  : Decimal(11, 2)       @title: '{i18n>shiftRGFirst}'; // Regular
    shiftOTFirst  : type of shiftRGFirst @title: '{i18n>shiftOTFirst}'; // Overtime
    shiftDTFirst  : type of shiftRGFirst @title: '{i18n>shiftDTFirst}'; // Double Time
    shiftRGSecond : type of shiftRGFirst @title: '{i18n>shiftRGSecond}';
    shiftOTSecond : type of shiftRGFirst @title: '{i18n>shiftOTSecond}';
    shiftDTSecond : type of shiftRGFirst @title: '{i18n>shiftDTSecond}';
    shiftRGThird  : type of shiftRGFirst @title: '{i18n>shiftRGThird}';
    shiftOTThird  : type of shiftRGFirst @title: '{i18n>shiftOTThird}';
    shiftDTThird  : type of shiftRGFirst @title: '{i18n>shiftDTThird}';
}

aspect shiftCustomerBillRate {
    shiftCustomerBillRateFirst    : Decimal(18, 2)                     @title: '{i18n>shiftCustomerBillRateFirst}';
    shiftCustomerOTBillRateFirst  : type of shiftCustomerBillRateFirst @title: '{i18n>shiftCustomerOTBillRateFirst}';
    shiftCustomerDTBillRateFirst  : type of shiftCustomerBillRateFirst @title: '{i18n>shiftCustomerDTBillRateFirst}';
    shiftCustomerBillRateSecond   : type of shiftCustomerBillRateFirst @title: '{i18n>shiftCustomerBillRateSecond}';
    shiftCustomerOTBillRateSecond : type of shiftCustomerBillRateFirst @title: '{i18n>shiftCustomerOTBillRateSecond}';
    shiftCustomerDTBillRateSecond : type of shiftCustomerBillRateFirst @title: '{i18n>shiftCustomerDTBillRateSecond}';
    shiftCustomerBillRateThird    : type of shiftCustomerBillRateFirst @title: '{i18n>shiftCustomerBillRateThird}';
    shiftCustomerOTBillRateThird  : type of shiftCustomerBillRateFirst @title: '{i18n>shiftCustomerOTBillRateThird}';
    shiftCustomerDTBillRateThird  : type of shiftCustomerBillRateFirst @title: '{i18n>shiftCustomerDTBillRateThird}';
}

aspect shiftVendorPayRate {
    shiftVendorPayRateFirst    : Decimal(18, 2)                  @title: '{i18n>shiftVendorPayRateFirst}';
    shiftVendorOTPayRateFirst  : type of shiftVendorPayRateFirst @title: '{i18n>shiftVendorOTPayRateFirst}';
    shiftVendorDTPayRateFirst  : type of shiftVendorPayRateFirst @title: '{i18n>shiftVendorDTPayRateFirst}';
    shiftVendorPayRateSecond   : type of shiftVendorPayRateFirst @title: '{i18n>shiftVendorPayRateSecond}';
    shiftVendorOTPayRateSecond : type of shiftVendorPayRateFirst @title: '{i18n>shiftVendorOTPayRateSecond}';
    shiftVendorDTPayRateSecond : type of shiftVendorPayRateFirst @title: '{i18n>shiftVendorDTPayRateSecond}';
    shiftVendorPayRateThird    : type of shiftVendorPayRateFirst @title: '{i18n>shiftVendorPayRateThird}';
    shiftVendorOTPayRateThird  : type of shiftVendorPayRateFirst @title: '{i18n>shiftVendorOTPayRateThird}';
    shiftVendorDTPayRateThird  : type of shiftVendorPayRateFirst @title: '{i18n>shiftVendorDTPayRateThird}';

}

context GlobalTypes {
    type OrganizationUnit              : String(8) @title:'{i18n>OrganizationUnit}';// ORGEH
    type SalesDocumentType             : String(4) @title: '{i18n>SalesDocumentType}'; // AUART
    type PersonnelNumber               : String(8)  @title: '{i18n>PersonnelNumber}'  @assert.format: '^[0-9]{7,8}$'; // PERNR
    type SalesDocument                 : String(10) @title:'{i18n>SalesDocument}'; // VBELN
    type SalesDocumentItem             : String(6) @title:'{i18n>SalesDocumentItem}' @assert.format: '^[0-9]{1,6}$'; // POSNR
    type OrderNumber                   : String(12) @title: '{i18n>OrderNumber}'; // AUFNR
    type PurchasingDocument            : String(10) @title: '{i18n>PurchasingDocument}'; // EBELN
    type PurchasingDocumentItem        : String(5) @title:'{i18n>PurchasingDocumentItem}' @assert.format: '^[0-9]{1,5}$'; // EBELP
    type TripNumber                    : String(10) @title:'{i18n>TripNumber}' @assert.format: '^[0-9]{10}$'; // REINR
    type FiscalYear                    : String(4) @title:'{i18n>FiscalYear}' @assert.format: '^[0-9]{4}$'; // GJAHR
    type InvoiceDocumentNumber         : String(10) @title:'{i18n>InvoiceDocumentNumber}' @assert.format: '^[0-9]{1,10}$'; // BELNR
    type PartnerFunction               : String(2) @title:'{PartnerFunction}'; // PARVW
    type CreditMemo                    : String(10)@title:'{i18n>CreditMemo}';
    type EmployeeSubgroup              : String(2) @title:'{i18n>EmployeeSubgroup}'; // PERSK
    type InvoiceNumber                 : String(15) @title: '{i18n>InvoiceNumber}';
    type QuotSalesOrderRejectionReason : String(2) @title:'{i18n>QuotSalesOrderRejectionReason}'; // ABGRU
    type CompanyCode                   : String(4) @title: '{i18n>CompanyCode}'; // BUKRS
    type SoldToParty                   : String(10) @title: '{i18n>SoldToParty}'; // KUNNR
    type BillToParty                   : String(10) @title: '{i18n>BillToParty}'; // KUNRE
    type SalesOffice                   : String(4) @title: '{i18n>SalesOffice}'; // VKBUR
    type MaterialNumber                : String(18) @title: '{i18n>MaterialNumber}'; // MATNR
    type PersonnelArea                 : String(4) @title: '{i18n>PersonnelArea}'; // WERKS
    type Email                         : String(130) @assert.format: '^.*[^\s]@[^\s].*[.][^\s].*$'; // Regex checks for 'anything@anything.anything'
    type ABAPDate                      : String(8) @title:'{i18n>ABAPDate}' @assert.format: '^[0-9]{8}$'; // YYYYMMDD
}
