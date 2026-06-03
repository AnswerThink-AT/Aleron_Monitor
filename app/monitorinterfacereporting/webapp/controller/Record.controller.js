/* global $, sap */
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
  "sap/ui/export/Spreadsheet"
], function (Controller, JSONModel, MessageBox, MessageToast, Spreadsheet) {
  "use strict";

  // ===== Entity-set mapping (normalized keys) ================================
  const DETAIL_SET_BY_INTERFACE = {
    "times": "Times_Detail",
    "workorders": "WorkOrders_Detail",
    "workorders_wn": "WorkOrders_WN_Detail",
    "workorders_fg": "WorkOrders_FG_Detail",
    "employeehires": "EmployeeHires_Detail",
    "staffhires": "StaffHires_Detail",
    "terminations": "Terminations_Detail",
    "fg_invoices": "Fg_Invoices_Detail",
    "credit_rebill": "Credit_Rebill_Detail",
    "fg_credit_rebill": "Fg_Credit_Rebill_Detail",
    "otherbillables": "OtherBillables_Detail",
    "sowscwo": "SowScWo_Detail",
    "sowscinvoice": "SowScInvoice_Detail",
    "bonus": "Bonus_Detail",
    "travel": "Travel_Detail",
    "drug_background_check": "Drug_Background_Check_Detail"
  };

  

  // ===== SELECT lists (generated from your metadata) =========================
const SELECT_MAP = {
  "Times_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,shiftRGFirst,shiftOTFirst,shiftDTFirst,shiftRGSecond,shiftOTSecond,shiftDTSecond,shiftRGThird,shiftOTThird,shiftDTThird,shiftCustomerBillRateFirst,shiftCustomerOTBillRateFirst,shiftCustomerDTBillRateFirst,shiftCustomerBillRateSecond,shiftCustomerOTBillRateSecond,shiftCustomerDTBillRateSecond,shiftCustomerBillRateThird,shiftCustomerOTBillRateThird,shiftCustomerDTBillRateThird,shiftVendorPayRateFirst,shiftVendorOTPayRateFirst,shiftVendorDTPayRateFirst,shiftVendorPayRateSecond,shiftVendorOTPayRateSecond,shiftVendorDTPayRateSecond,shiftVendorPayRateThird,shiftVendorOTPayRateThird,shiftVendorDTPayRateThird,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,invoiceNoWN,employeeNo,tempusWorkOrder,salesDocumentType,orderNo,weekEndDate,beginDate,additionalDayOfWork,laborPurchaseOrder,ID,fileSource,uploadedAt,createdAt,createdBy,modifiedAt,modifiedBy",
  "WorkOrders_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,doorNo,street,city,region,country_code,postalCode,shiftCustomerBillRateFirst,shiftCustomerOTBillRateFirst,shiftCustomerDTBillRateFirst,shiftCustomerBillRateSecond,shiftCustomerOTBillRateSecond,shiftCustomerDTBillRateSecond,shiftCustomerBillRateThird,shiftCustomerOTBillRateThird,shiftCustomerDTBillRateThird,shiftVendorPayRateFirst,shiftVendorOTPayRateFirst,shiftVendorDTPayRateFirst,shiftVendorPayRateSecond,shiftVendorOTPayRateSecond,shiftVendorDTPayRateSecond,shiftVendorPayRateThird,shiftVendorOTPayRateThird,shiftVendorDTPayRateThird,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,soldToParty,billToParty,workOrderWN,salesOffice,salesDocumentType,materialNo,remitToVendor,currency_code,endDate,beginDate,ssn,workLocation,jobTemplate,actionType,lastName,firstName,middleName,laborPurchaseOrder,laborPODate,attentionLine,distributionEmail,distributionChannel,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "WorkOrders_WN_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,doorNo,street,city,region,country_code,postalCode,shiftCustomerBillRateFirst,shiftCustomerOTBillRateFirst,shiftCustomerDTBillRateFirst,shiftCustomerBillRateSecond,shiftCustomerOTBillRateSecond,shiftCustomerDTBillRateSecond,shiftCustomerBillRateThird,shiftCustomerOTBillRateThird,shiftCustomerDTBillRateThird,shiftVendorPayRateFirst,shiftVendorOTPayRateFirst,shiftVendorDTPayRateFirst,shiftVendorPayRateSecond,shiftVendorOTPayRateSecond,shiftVendorDTPayRateSecond,shiftVendorPayRateThird,shiftVendorOTPayRateThird,shiftVendorDTPayRateThird,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,soldToParty,billToParty,workOrderWN,salesOffice,salesDocumentType,materialNo,remitToVendor,currency_code,fedTax,salesDocItem,lineItemRate,itemQuantity,baseUnit,poDesc,lineItemDesc,endDate,beginDate,ssn,fundIndicator,custPurOrderTotal,vendPurOrderTotal,workLocation,actionType,lastName,firstName,middleName,laborPurchaseOrder,laborPODate,attentionLine,distributionEmail,distributionChannel,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "WorkOrders_FG_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,jobSeekerId,workerId,personId,securityId,woStatus,firstName,lastName,workerEmail,jobPostingTitle,workOrderId,owner,ownerId,businessUnitCode,businessUnitName,vendorCode,vendorName,buyerCode,remitTo,costCenterName,costCenterCode,bilPerDiem,startDate,endDate,currency_code,siteCode,siteName,managerName,purchaseOrder,wnContract,vendor,ssContract,billTo,soldTo,matnr,salesOffice,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "EmployeeHires_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,lastName,firstName,middleName,ssn,dateOfBirth,gender,maritalStatus,doorNo,street,city,region,country_code,postalCode,outboundStatus,plansSAP,shiftRGFirst,shiftOTFirst,shiftDTFirst,shiftRGSecond,shiftOTSecond,shiftDTSecond,shiftRGThird,shiftOTThird,shiftDTThird,shiftCustomerBillRateFirst,shiftCustomerOTBillRateFirst,shiftCustomerDTBillRateFirst,shiftCustomerBillRateSecond,shiftCustomerOTBillRateSecond,shiftCustomerDTBillRateSecond,shiftCustomerBillRateThird,shiftCustomerOTBillRateThird,shiftCustomerDTBillRateThird,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,recordCountry_code,recordIndicator,beginDate,actionIndicator,actionReason,descShort,descLong,orgUnit,soldToParty,billToParty,managerEmail,personnelArea,employeeGroup,employeeSubgroup,personnelSubarea,payrollArea,addressLine1,addressLine2,homeCity,homeCounty,homeRegion,homePostalCode,homeLocation_code,homeTelephoneAreaCode,homeTelephoneNo,workScheduleRule,workScheduleType,weeklySalary,biWeeklySalary,monthlySalary,dailyRate,residentTaxAreaState,residentTaxAreaCity,residentTaxAreaCounty,residentTaxAreaDistrict,residentTaxAreaOthers,workTaxAreaState,workTaxAreaCity,workTaxAreaCounty,workTaxAreaDistrict,workTaxAreaOthers,workLocation,county,employeeEmail,payroll,recruiterEmployeeNo,employeeResponsible,sourcedSDC,workNexusIndicator,contractNo,workOrderDoc,salesOffice,material,purchasingUOM,currency_code,monthlySalary2,dailyRate2,workerCompState,workerCompCode,benefitType,hireAct,customerAdminFee,customerAdminFeePercent,attentionLine,invoiceDistributionEmail,custAgrName,custBgChkDate,custBusUnitName,custChrgNo,custCostCtr,custDepNo,custDivUnit,custDOTSNo,custFEPSCode,custPosCode,custPONoLbr,custPODateLbr,custWBS,custWkTimeFee,custCompCode,custRUI,custAccNo,custBudCtr,custConNo,sgVendNoAtCust,custManEmail,custManName,custManPhone,custOrgName,custLegEnt,custOrcNo,custUtStrNo,custJobTitle,svcLineItemDesc,svcDatFrom,svcDatTo,custEmpNo,taskNo,bbNo,custGLCode,projectNo,purchaseAgreement,wnWork,cat1,cat2,cat3,markupTime,markupOT,markupDT,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "StaffHires_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,lastName,firstName,middleName,ssn,dateOfBirth,gender,maritalStatus,doorNo,street,city,region,country_code,postalCode,outboundStatus,plansSAP,shiftRGFirst,shiftOTFirst,shiftDTFirst,shiftRGSecond,shiftOTSecond,shiftDTSecond,shiftRGThird,shiftOTThird,shiftDTThird,shiftCustomerBillRateFirst,shiftCustomerOTBillRateFirst,shiftCustomerDTBillRateFirst,shiftCustomerBillRateSecond,shiftCustomerOTBillRateSecond,shiftCustomerDTBillRateSecond,shiftCustomerBillRateThird,shiftCustomerOTBillRateThird,shiftCustomerDTBillRateThird,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,recordCountry_code,recordIndicator,beginDate,actionIndicator,actionReason,descShort,descLong,orgUnit,soldToParty,billToParty,managerEmail,personnelArea,employeeGroup,employeeSubgroup,personnelSubarea,payrollArea,addressLine1,addressLine2,homeCity,homeCounty,homeRegion,homePostalCode,homeLocation_code,homeTelephoneAreaCode,homeTelephoneNo,workScheduleRule,workScheduleType,weeklySalary,biWeeklySalary,monthlySalary,dailyRate,residentTaxAreaState,residentTaxAreaCity,residentTaxAreaCounty,residentTaxAreaDistrict,residentTaxAreaOthers,workTaxAreaState,workTaxAreaCity,workTaxAreaCounty,workTaxAreaDistrict,workTaxAreaOthers,workLocation,county,employeeEmail,payroll,recruiterEmployeeNo,employeeResponsible,sourcedSDC,workNexusIndicator,contractNo,workOrderDoc,salesOffice,material,purchasingUOM,currency_code,monthlySalary2,dailyRate2,workerCompState,workerCompCode,benefitType,hireAct,customerAdminFee,customerAdminFeePercent,attentionLine,invoiceDistributionEmail,custAgrName,custBgChkDate,custBusUnitName,custChrgNo,custCostCtr,custDepNo,custDivUnit,custDOTSNo,custFEPSCode,custPosCode,custPONoLbr,custPODateLbr,custWBS,custWkTimeFee,custCompCode,custRUI,custAccNo,custBudCtr,custConNo,sgVendNoAtCust,custManEmail,custManName,custManPhone,custOrgName,custLegEnt,custOrcNo,custUtStrNo,custJobTitle,svcLineItemDesc,svcDatFrom,svcDatTo,custEmpNo,taskNo,bbNo,custGLCode,projectNo,purchaseAgreement,wnWork,cat1,cat2,cat3,markupTime,markupOT,markupDT,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "Terminations_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,contractNo,employeeNo,endDate,actionReason,salesDocumentType,workOrderWN,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "Fg_Invoices_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,workerID,fgInvoiceID,fgInvoicetype,fgInvoiceLinetype,invSubmissionDate,fgSiteCode,invLineAmount,invLineAdjAmount,currency,firstName,lastName,businessCode,costCenterCode,costCenterName,fgTaskCode,fgTaskName,glAccount,stHours,otHours,dtHours,customerBillRateST,customerBillRateOt,customerBillRateDt,fgWorkOrderID,timesheetID,parentTimesheetID,fgInvoiceOrgID,revision,timeSheetStatus,timeSheetStartDate,timeSheetEndDate,timeSheetApprovedDate,quantity,contractNoSS,timeSheetEntryDate,supplierPayRateST,supplierPayRateOT,supplierPayRateDT,contractNoWN,orderNo,personnelNo,fgGLCustomerCode,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "Credit_Rebill_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,wnInvoiceNo,wnWorkOrderNo,woType,wnInvalidationInvNo,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "Fg_Credit_Rebill_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,wokerID,fgInvoiceID,fgInvoicetype,fgInvoiceLinetype,invSubmissionDate,fgSiteCode,invLineAmount,invLineAdjAmount,curreny,firstName,lastName,businessCode,costCenterCode,costCenterName,fgTaskCode,fgTaskName,glAccount,stHours,otHours,dtHours,customerBillRateST,customerBillRateOt,customerBillRateDt,fgWorkOrderID,timesheetID,parentTimesheetID,fgInvoiceOrgID,revision,timeSheetStatus,timeSheetStartDate,timeSheetEndDate,timeSheetApprovedDate,quantity,contractNoSS,timeSheetEntryDate,supplierPayRateST,supplierPayRateOT,supplierPayRateDT,contractNoWN,orderNo,personnelNo,fgGLCustomerCode,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "OtherBillables_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,wnInvoiceNo,sapEmployeeNo,wnWorkOrder,woType,otherBillableType,internalOrder,weekEndDate,itemQuantity,customerBillDate,vendorPayDate,currency,customerPoNoLabor,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "SowScWo_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,doorNo,street,city,region,country_code,postalCode,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,soldToParty,billToParty,workOrderWN,salesOffice,custPurOrder,beginDate,endDate,currency_code,materialNo,workLocation,poDesc,remitToVendor,custPurOrderTotal,attentionLine,distributionEmail,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "SowScInvoice_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,wnInvoiceNo,internalOrder,wnWorkOrder,beginDate,endDate,materialNo,materialDesc,itemQuantity,purchasingUOM,custLineItemUOM,customerBillRate,customerTotal,wnVendorTaxAmount,custPurchaseOrder,custPoLineItemNo,vendorPayRate,vendorTotal,supplierInvoiceNo,hybridPricing,supplierAdminFee,customerAdminFee,commodityCode,categoryCode,taxIndicator,plant,clientTaxAmount,verbiageCode,clientTaxIndicator,vendorTaxIndicator,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "Bonus_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,wnInvoiceNo,sapEmployeeNo,wnWorkOrder,woType,internalOrder,endDate,customerBillRate,vendorPayRate,currency_code,customerPO,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "Travel_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,wnInvoiceNo,sapEmployeeNo,wnWorkOrder,woType,internalOrder,weekEndDate,beginDate,endDate,tripActivityType,country_code,tripExpenseType,amount,currency_code,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
  "Drug_Background_Check_Detail": "fileId,fileName,area,workOrderType,term,personnelNoSAP,salesDocumentNoSAP,salesItemNoSAP,projectNumberSAP,projectUUID,vcData1UUID,vcData2UUID,vcData1ICUUID,vcData2ICUUID,vendorZR,PORequiredSAP,purchaseDocumentNoSAP,purchaseDocumentItemSAP,tripRequiredSAP,tripNoSAP,salesDocumentTypeSAP,fiscalYearSAP,invoiceDocumentNoSAP,salesOrderICSAP,salesItemNoICSAP,partnerFunctionSAP,salesOrderICUpdateRequired,creditMemoSAP,creditMemoICSAP,p2SalesDocumentNoSAP,employeeSubgroupSAP,creditRebillSAP,invoiceNoWNSAP,invalidInvoiceNoWNSAP,creditYearSAP,creditInvoiceSAP,rejectReasonSalesOrderSAP,rejectReasonSalesOrderICSAP,z42SAP,creditSteps,overrideAt,overrideBy,salesItemNo,purchaseDocumentNo,purchaseDocumentItem,email,companyCode,distributionChannelSAP,distributionChannelICSAP,projectNumberICSAP,legacyContractNo,file_ID,processLevel_code,valid,criticality,rejected,uploadSeq,customerFieldName1,customerFieldValue1,customerFieldName2,customerFieldValue2,customerFieldName3,customerFieldValue3,customerFieldName4,customerFieldValue4,customerFieldName5,customerFieldValue5,customerFieldName6,customerFieldValue6,customerFieldName7,customerFieldValue7,customerFieldName8,customerFieldValue8,customerFieldName9,customerFieldValue9,customerFieldName10,customerFieldValue10,customerFieldName11,customerFieldValue11,customerFieldName12,customerFieldValue12,customerFieldName13,customerFieldValue13,customerFieldName14,customerFieldValue14,customerFieldName15,customerFieldValue15,contractNo,wnInvoiceNo,employeeNo,workOrderWN,salesDocumentType,expenseType,project,weekEndDate,amount,currency_code,customerPoNoLabor,fileSource,uploadedAt,ID,createdAt,createdBy,modifiedAt,modifiedBy",
};

// NEW >>> add once (module-scope)
const STEP_INFO = {
  "0":"FILE LOADED","1":"FILE VALIDATION","2":"HIRE/RE-HIRE PROCESS","3":"SALES ORDER CREATE/CHANGE",
  "4":"ENTERPRISE PROJECT CREATE","5":"PURCHASE ORDER/CHANGE","9":"INTERFACE PROCESS COMPLETE",
  "A":"TRIP","B":"MIRO CREATE","C":"UPDATE PROJECT","D":"UPDATE DELIVERY ADDRESS ON PO",
  "E":"SMART SEARCH ADDITIONAL INFOTYPE","F":"UPDATE SALES ORDER PARTNERS","G":"INTERCOMPANY SALES ORDER CREATE/CHANGE",
  "M":"CREATE IC CREDIT MEMO REQUEST","N":"CREATE MIRO CREDIT","O":"DELETE PARTNER FUNCTION","Q":"MAINTAIN CONTRACT DATES",
  "S":"HIRED IN SUCCESSFACTORS","T":"TIME PROCESS","Z":"MANUALLY REJECTED","U":"CHECK EMPLOYEE CREATION S4"
};
function _stepLabel(s){ return s ? `${s} ${STEP_INFO[s] || ""}`.trim() : ""; }



  // ===== file id field per set (prefer file_ID if present) ===================
  const FILEID_FIELD_MAP = {
    "Times_Detail": "file_ID",
    "WorkOrders_Detail": "file_ID",
    "WorkOrders_WN_Detail": "file_ID",
    "WorkOrders_FG_Detail": "file_ID",
    "EmployeeHires_Detail": "file_ID",
    "StaffHires_Detail": "file_ID",
    "Terminations_Detail": "file_ID",
    "Fg_Invoices_Detail": "file_ID",
    "Credit_Rebill_Detail": "file_ID",
    "Fg_Credit_Rebill_Detail": "file_ID",
    "OtherBillables_Detail": "file_ID",
    "SowScWo_Detail": "file_ID",
    "SowScInvoice_Detail": "file_ID",
    "Bonus_Detail": "file_ID",
    "Travel_Detail": "file_ID",
    "Drug_Background_Check_Detail": "file_ID",
    "default": "fileId"
  };

  // ===== paging / helpers ====================================================
  const PAGE_SIZE = 50000;
  const PAGE_AHEAD_THRESHOLD = 20;
  const FORCE_BASE = null;

  const _norm = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  const _svcBase = (model) => {
    const b = (FORCE_BASE || model?.sServiceUrl || "/odata/v4/analytics/");
    return b.endsWith("/") ? b : b + "/";
  };
  function loadFilterState() {
    try {
      const s = window.localStorage.getItem("monitorFilters");
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  }
  function ajaxJSON(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url, method: "GET",
        headers: { "Accept": "application/json" },
        success: data => resolve(data),
        error: (xhr, t, e) => reject(new Error(`${xhr?.status} ${xhr?.statusText} ${e || ""}`))
      });
    });
  }

  function addColumnsFromFields(oTable, fields) {
    oTable.destroyColumns();
    const toLabel = k => k.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, c => c.toUpperCase());
    fields.forEach(name => {
      oTable.addColumn(new sap.ui.table.Column({
        width: "12rem",
        label: new sap.m.Label({ text: toLabel(name) }),
        template: new sap.m.Text({
          text: {
            path: `rec>${name}`,
            formatter: v => (v === null || v === undefined) ? "" : String(v)
          }
        })
      }));
    });
  }
  function resolveDetailSet(interfaceName, interfaceId) {

    // Normalize safety
    interfaceId = String(interfaceId || "").toUpperCase();

    switch (interfaceId) {
      case "1": return "WorkOrders_WN_Detail";        // MS Work Orders
      case "M": return "WorkOrders_FG_Detail";        // FG Work Orders
      case "S": return "WorkOrders_Detail";           // VMS Work Orders

      case "T": return "EmployeeHires_Detail";        // SS Employee Records
      case "U": return "StaffHires_Detail";           // SS Staff Hire

      case "4": return "Terminations_Detail";
      case "N": return "Fg_Invoices_Detail";
      case "D": return "Credit_Rebill_Detail";
      case "Q": return "Fg_Credit_Rebill_Detail";
      case "O": return "OtherBillables_Detail";
      case "G": return "Bonus_Detail";
      case "C": return "Times_Detail";
      case "3": return "Times_Detail";
      case "E": return "SowScWo_Detail";
      case "F": return "SowScInvoice_Detail";
      case "2": return "Travel_Detail";
      case "A": return "Drug_Background_Check_Detail";
    }

    // default fallback → base WorkOrders
    return "WorkOrders_Detail";
  }
  function getSelectForSet(setName) {
    return SELECT_MAP[setName] || SELECT_MAP["Times_Detail"];
  }
  function getFileIdFieldForSet(setName) {
    return FILEID_FIELD_MAP[setName] || FILEID_FIELD_MAP.default;
  }
  // function buildFilterQP(setName, fileId, step, valid) {
  //   const fileField = getFileIdFieldForSet(setName);
  //   const isNum = /^\d+$/.test(String(fileId || ""));
  //   const litStep = `'${String(step || "").replace(/'/g, "''")}'`;
  //   const litValid = valid ? "true" : "false";
  //   const parts = [
  //     `processLevel_code eq ${litStep}`,
  //     `valid eq ${litValid}`
  //   ];
  //   if (fileId !== undefined && fileId !== null && String(fileId) !== "") {
  //     const litFile = isNum
  //       ? String(fileId)
  //       : `'${String(fileId).replace(/'/g, "''")}'`;
  //     parts.unshift(`${fileField} eq ${litFile}`);
  //   }
  //   const saved = loadFilterState();
  //   if (saved && saved.from && saved.to) {
  //     const d1 = new Date(saved.from);
  //     const d2 = new Date(saved.to);
  //     if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
  //       d1.setHours(0, 0, 0, 0);
  //       d2.setHours(23, 59, 59, 999);
  //       parts.push(
  //         `uploadedAt ge ${d1.toISOString()} and uploadedAt le ${d2.toISOString()}`
  //       );
  //     }
  //   }

  //   const filterExpr = parts.join(" and ");
  //   return "$filter=" + encodeURIComponent(filterExpr);
  // }


  // Build $filter for multi-fileIds + multi-steps (+ optional valid + date range)
function buildFilterQP(setName, fileIds, steps, validB) {
  const parts = [];
  const fileField = getFileIdFieldForSet(setName);

  // fileIds: OR across all passed ids
  if (Array.isArray(fileIds) && fileIds.length) {
    const ors = fileIds.map(fid => {
      const isNum = /^\d+$/.test(String(fid));
      const lit   = isNum ? String(fid) : `'${String(fid).replace(/'/g, "''")}'`;
      return `${fileField} eq ${lit}`;
    }).join(" or ");
    parts.push(`(${ors})`);
  }

  // steps: OR across all selected steps
  if (Array.isArray(steps) && steps.length) {

    const ors = steps.map(st => {
      const lit = `'${String(st).replace(/'/g, "''")}'`;

      return `(processLevel_code eq ${lit} and processLevel_code ne '')`;
    }).join(" or ");

    parts.push(`(${ors})`);
  }

  // valid: include only if strictly boolean; skip if "all"
  if (validB === true) {
    // Only strict boolean true
    parts.push("(valid eq true)");
  }
  else if (validB === false) {
    // Only strict boolean false
    parts.push("(valid eq false)");
  }
  else {
    // "all" → exclude dirty rows: null, '', strings, numbers
    parts.push("(valid eq true or valid eq false)");
  }


  // date range from saved state
  const saved = loadFilterState();
  if (saved && saved.from && saved.to) {
    const d1 = new Date(saved.from); d1.setHours(0,0,0,0);
    const d2 = new Date(saved.to);   d2.setHours(23,59,59,999);
    parts.push(`uploadedAt ge ${d1.toISOString()} and uploadedAt le ${d2.toISOString()}`);
  }

  const expr = parts.join(" and ");
  return expr ? "$filter=" + encodeURIComponent(expr) : "";
}



  return Controller.extend("monitorinterfacereporting.controller.Record", {
    onInit: function () {
      // header model for ObjectPage title
      this.getView().setModel(new JSONModel({}), "recHdr");

      // data model with paging state
      const m = new JSONModel({ rows: [], hasMore: false, skip: 0, total: 0 });
      m.setSizeLimit(50000);
      this.getView().setModel(m, "rec");

      // route hook
      this.getOwnerComponent().getRouter().getRoute("Record")
        .attachPatternMatched(this._onRouteMatched, this);
    },

    // NEW >>> add inside Controller.extend({...})
fmtProcessLevelsText: function (arr) {
  if (!arr || !arr.length) return "-";
  return arr.map(_stepLabel).join(", ");
},
fmtValidText: function (v) {
  if (v === true)  return "Yes";
  if (v === false) return "No";
  return "Yes & No";
},


_onRouteMatched: async function (e) {
  console.group("[Record] _onRouteMatched");
  const a = e.getParameter("arguments") || {};
  console.log("raw args:", a);

  const ifaceRaw  = decodeURIComponent(a.iface || "");
  const fileIdRaw = decodeURIComponent(a.fileId || "");
  const stepRaw   = decodeURIComponent(a.processLevel || ""); // may be "1,5"
  const validRaw  = (a.valid || "");
  const fileName  = decodeURIComponent(a.fileName || "");

  console.log("decoded:", { ifaceRaw, fileIdRaw, stepRaw, validRaw, fileName });

  // parse steps: support CSV ("1,5") or JSON ("[\"1\",\"5\"]")
  let steps = [];
  if (stepRaw) {
    if (stepRaw.indexOf(",") >= 0) {
      steps = stepRaw.split(",").map(s => s.trim()).filter(Boolean);
    } else if (/^\s*\[.*\]\s*$/.test(stepRaw)) {
      try { steps = JSON.parse(stepRaw).map(String).map(s => s.trim()).filter(Boolean); } catch (_) {}
    } else {
      steps = [stepRaw.trim()];
    }
  }
  // unique & clean
  steps = Array.from(new Set(steps.filter(Boolean)));
  console.log("steps (final):", steps);

  // valid can be true/false/all
  const validB = (validRaw === "true" || validRaw === "1") ? true
               : (validRaw === "false" || validRaw === "0") ? false
               : "all";
  console.log("valid (boolean|'all'):", validB);

  // multiple fileIds (if ever sent)
  let fileIds = [];
  if (fileIdRaw && fileIdRaw !== "merged") {
    fileIds = fileIdRaw.split(",").map(s => s.trim()).filter(Boolean);
  }
  console.log("fileIds:", fileIds);

  // resolve entity set
  let interfaceId = "";
  try {
    interfaceId = ifaceRaw.includes(":") ? ifaceRaw.split(":")[0].toUpperCase() : ifaceRaw.toUpperCase();
  } catch (_) {}
  const setName = resolveDetailSet(ifaceRaw, interfaceId);
  console.log("interfaceId:", interfaceId, "=> setName:", setName);

  // header
  this.getView().getModel("recHdr").setData({
    set: setName,
    fileIdList: fileIds,
    processLevels: steps,   // <-- store all
    valid: validB,
    iface: ifaceRaw,
    fileName
  });
  console.log("recHdr model set:", this.getView().getModel("recHdr").getData());

  // table/columns
  const table = this.byId("recTable12");
  table.setBusy(true);

  const fields = getSelectForSet(setName).split(",").map(s => s.trim()).filter(Boolean);
  console.log("columns from select fields:", fields.length);
  addColumnsFromFields(table, fields);

  // reset paging
  const rec = this.getView().getModel("rec");
  rec.setData({ rows: [], hasMore: true, skip: 0, total: 0 });
  console.log("rec model reset.");

  table.detachFirstVisibleRowChanged(this._onTableScroll, this);
  table.attachFirstVisibleRowChanged(this._onTableScroll, this);

  try {
    console.log("calling _loadPage with:", { setName, fileIds, steps, validB, append: true });
    await this._loadPage({ setName, fileIds, steps, validB, append: true }); // <-- pass steps array
    table.bindRows("rec>/rows");
    const len = (this.getView().getModel("rec").getProperty("/rows") || []).length;
    console.log("initial page loaded. rows:", len);
  } catch (err) {
    console.error("_loadPage failed:", err);
    sap.m.MessageBox.error("Failed to load detail data.");
  } finally {
    table.setBusy(false);
    console.groupEnd();
  }
},




    // _loadPage: async function ({ setName, fileId, step, validB, append }) {

  
    //   const base    = _svcBase(this.getView().getModel());
    //   const rec     = this.getView().getModel("rec");
    //   const skip    = rec.getProperty("/skip") || 0;

    //   const selectQP = "$select=" + encodeURIComponent(getSelectForSet(setName));
    //   const filterQP = buildFilterQP(setName, fileId, step, validB);
    //   const orderQP  = "$orderby=" + encodeURIComponent("ID asc");
    //   const topQP    = "$top=" + PAGE_SIZE;
    //   const skipQP   = skip ? ("&$skip=" + skip) : "";

    //   const url = `${base}${setName}?${selectQP}&${filterQP}&${orderQP}&${topQP}${skipQP}`;

    //   const j = await ajaxJSON(url);
    //   const batch = Array.isArray(j.value) ? j.value : [];
    //   const newRows = append ? (rec.getProperty("/rows").concat(batch)) : batch;

    //   rec.setProperty("/rows", newRows);
    //   rec.setProperty("/skip", skip + batch.length);
    //   rec.setProperty("/hasMore", batch.length === PAGE_SIZE);
    //   rec.setProperty("/total", newRows.length);
    //   const distinctFiles = new Set(newRows.map(r => r.fileId));
    //   this.getView().getModel("rec").setProperty("/fileCount", distinctFiles.size);
    // },


    // NOTE: now accepts arrays: fileIds, steps
_loadPage: async function ({ setName, fileIds = [], steps = [], validB, append }) {
  const base = _svcBase(this.getView().getModel());
  const rec  = this.getView().getModel("rec");
  const skip = rec.getProperty("/skip") || 0;

  const selectQP = "$select=" + encodeURIComponent(getSelectForSet(setName));
  const filterQP = buildFilterQP(setName, fileIds, steps, validB);
  const orderQP  = "$orderby=" + encodeURIComponent("ID asc");
  const topQP    = "$top=" + PAGE_SIZE;
  const skipQP   = skip ? ("&$skip=" + skip) : "";

  const url = `${base}${setName}?${selectQP}&${filterQP}&${orderQP}&${topQP}${skipQP}`;
  console.log("[Record] fetch url:", url);
  console.log("[Record] filterQP (decoded):", decodeURIComponent(filterQP || ""));

  const j = await ajaxJSON(url);
  let batch = Array.isArray(j.value) ? j.value : [];

  // --- MATCH SUMMARY PAGE FILTERING EXACTLY ---
  batch = batch.filter(r => {
    // Summary removes only rows with empty/null processLevel (processLevel_code in detail)
    if (!r.processLevel_code || String(r.processLevel_code).trim() === "") return false;

    // Summary only rejects rows where valid is NULL or ''.
    // Everything else is treated as valid/invalid and counted.
    if (r.valid === null || r.valid === "") return false;

    return true;
  });
  const newRows = append ? (rec.getProperty("/rows").concat(batch)) : batch;

  rec.setProperty("/rows", newRows);
  rec.setProperty("/skip", skip + batch.length);
  rec.setProperty("/hasMore", batch.length === PAGE_SIZE);
  rec.setProperty("/total", newRows.length);
  const distinctFiles = new Set(newRows.map(r => r.fileId));
  this.getView().getModel("rec").setProperty("/fileCount", distinctFiles.size);
  this.getView().getModel("recHdr").setProperty("/total", newRows.length);
},


    // _onTableScroll: function (oEvent) {
    //   const table = oEvent.getSource();
    //   const first = table.getFirstVisibleRow();
    //   const vis   = table.getVisibleRowCount();
    //   const len   = this.getView().getModel("rec").getProperty("/rows").length;
    //   const hasMore = this.getView().getModel("rec").getProperty("/hasMore");

    //   if (hasMore && (first + vis + PAGE_AHEAD_THRESHOLD >= len)) {
    //     const hdr = this.getView().getModel("recHdr").getData();
    //     this.getView().getModel("rec").setProperty("/hasMore", false);
    //     this._loadPage({
    //       setName: hdr.set,
    //       fileId:  hdr.fileId,
    //       step:    hdr.processLevel,
    //       validB:  (hdr.valid === "true"),
    //       append:  true
    //     }).catch(() => {
    //       this.getView().getModel("rec").setProperty("/hasMore", true);
    //     });
    //   }
    // },


    _onTableScroll: function (oEvent) {
  const table   = oEvent.getSource();
  const first   = table.getFirstVisibleRow();
  const vis     = table.getVisibleRowCount();
  const recM    = this.getView().getModel("rec");
  const len     = recM.getProperty("/rows").length;
  const hasMore = recM.getProperty("/hasMore");

  if (hasMore && (first + vis + PAGE_AHEAD_THRESHOLD >= len)) {
    const hdr = this.getView().getModel("recHdr").getData();
    // prevent concurrent loads until this finishes
    recM.setProperty("/hasMore", false);

    this._loadPage({
      setName: hdr.set,
      fileIds: Array.isArray(hdr.fileIdList) ? hdr.fileIdList : [],
      steps:   Array.isArray(hdr.processLevels) ? hdr.processLevels : [],
      validB:  hdr.valid,   // boolean or "all"
      append:  true
    }).catch(() => {
      recM.setProperty("/hasMore", true);
    });
  }
},


    onExportCurrentRecords: function () {
      const rows = this.getView().getModel("rec").getProperty("/rows") || [];
      if (!rows.length) return MessageToast.show("Nothing to export.");

      const cols = Object.keys(rows[0]).map(k => ({ label: k, property: k }));
      const sheet = new Spreadsheet({
        workbook: { columns: cols },
        dataSource: rows,
        fileName: `records_export_${Date.now()}.xlsx`
      });
      sheet.build().then(() => sheet.destroy());
    }
  });
});
