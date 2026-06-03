/* checksum : 4d298e773cb96464aa1cbea1d035d74f */
@cds.external : true
type CE_SALESCONTRACT_0001.SAP__Message {
  code : LargeString not null;
  message : LargeString not null;
  target : LargeString;
  additionalTargets : many LargeString not null;
  transition : Boolean not null;
  @odata.Type : 'Edm.Byte'
  numericSeverity : Integer not null;
  longtextUrl : LargeString;
};

@cds.external : true
@CodeList.CurrencyCodes : {
  Url: '../../../../default/iwbep/common/0001/$metadata',
  CollectionPath: 'Currencies'
}
@CodeList.UnitsOfMeasure : {
  Url: '../../../../default/iwbep/common/0001/$metadata',
  CollectionPath: 'UnitsOfMeasure'
}
@Common.ApplyMultiUnitBehaviorForSortingAndFiltering : true
@Capabilities.FilterFunctions : [
  'eq',
  'ne',
  'gt',
  'ge',
  'lt',
  'le',
  'and',
  'or',
  'contains',
  'startswith',
  'endswith',
  'any',
  'all'
]
@Capabilities.SupportedFormats : [ 'application/json', 'application/pdf' ]
@PDF.Features : {
  DocumentDescriptionReference: '../../../../default/iwbep/common/0001/$metadata',
  DocumentDescriptionCollection: 'MyDocumentDescriptions',
  ArchiveFormat: true,
  Border: true,
  CoverPage: true,
  FitToPage: true,
  FontName: true,
  FontSize: true,
  HeaderFooter: true,
  IANATimezoneFormat: true,
  Margin: true,
  Padding: true,
  ResultSizeDefault: 20000,
  ResultSizeMaximum: 20000,
  Signature: true,
  TextDirectionLayout: true,
  Treeview: true,
  UploadToFileShare: true
}
@Capabilities.KeyAsSegmentSupported : true
@Capabilities.AsynchronousRequestsSupported : true
service CE_SALESCONTRACT_0001 {};

@cds.external : true
@cds.persistence.skip : true
@Common.Label : 'Sales Contract Header'
@Common.Messages : SAP__Messages
@Capabilities.NavigationRestrictions.RestrictedProperties : [
  {
    NavigationProperty: _Item,
    InsertRestrictions: { Insertable: true }
  },
  {
    NavigationProperty: _PricingElement,
    InsertRestrictions: { Insertable: true },
    FilterRestrictions: { Filterable: false }
  },
  {
    NavigationProperty: _Text,
    InsertRestrictions: { Insertable: true }
  }
]
@Capabilities.SearchRestrictions.Searchable : false
@Capabilities.InsertRestrictions.RequiredProperties : [ 'SalesContractType' ]
@Capabilities.DeleteRestrictions.Deletable : false
@Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_Item', '_PricingElement', '_Text' ]
@Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
@Core.OptimisticConcurrency : [ 'LastChangeDateTime' ]
@Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
  {
    Property: SalesContractType,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: TotalNetAmount,
    AllowedExpressions: 'MultiValue'
  }
]
entity CE_SALESCONTRACT_0001.SalesContract {
  @Core.Immutable : true
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Contract'
  @Common.Heading : 'SC'
  key SalesContract : String(10) not null;
  @Common.SAPObjectNodeTypeReference : 'SalesContractType'
  @Core.Immutable : true
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Contract Type'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SALES_CONTRACT_TYPE'
  SalesContractType : String(4) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Organization'
  @Common.Heading : 'SOrg.'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VKORG'
  SalesOrganization : String(4) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Distribution Channel'
  @Common.Heading : 'DChl'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VTWEG'
  DistributionChannel : String(2) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Division'
  @Common.Heading : 'Dv'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SPART'
  OrganizationDivision : String(2) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Group'
  @Common.Heading : 'SGrp'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VKGRP'
  SalesGroup : String(3) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Office'
  @Common.Heading : 'SOff.'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VKBUR'
  SalesOffice : String(4) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Sales District'
  @Common.Heading : 'SDst'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BZIRK'
  SalesDistrict : String(6) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Sold-to Party'
  @Common.Heading : 'Sold-to'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KUNAG'
  SoldToParty : String(10) not null;
  @Core.Computed : true
  @Common.Label : 'Created On'
  @Common.QuickInfo : 'Record Creation Date'
  CreationDate : Date;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Created By'
  @Common.QuickInfo : 'Name of Person Responsible for Creating the Object'
  CreatedByUser : String(12) not null;
  @Core.Computed : true
  @Common.Label : 'Changed On'
  @Common.Heading : 'Chngd On'
  @Common.QuickInfo : 'Last Changed On'
  LastChangeDate : Date;
  @odata.Precision : 7
  @odata.Type : 'Edm.DateTimeOffset'
  @Core.Computed : true
  @Common.Label : 'Last Changed On'
  @Common.QuickInfo : 'Last Changed Date Time'
  LastChangeDateTime : Timestamp;
  @Common.Label : 'Customer Reference'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BSTKD'
  PurchaseOrderByCustomer : String(35) not null;
  @Common.SAPObjectNodeTypeReference : 'PurchaseOrderTypeByCustomer'
  @Common.IsUpperCase : true
  @Common.Label : 'Purchase Order Type'
  @Common.Heading : 'POtyp'
  @Common.QuickInfo : 'Customer Purchase Order Type'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BSARK'
  CustomerPurchaseOrderType : String(4) not null;
  @Common.Label : 'Customer Reference Date'
  CustomerPurchaseOrderDate : Date;
  @Common.Label : 'Document Date'
  @Common.Heading : 'Doc. Date'
  @Common.QuickInfo : 'Document Date (Date Received/Sent)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=AUDAT'
  SalesContractDate : Date;
  @Core.Computed : true
  @Measures.ISOCurrency : TransactionCurrency
  @Common.Label : 'Net Value'
  @Common.QuickInfo : 'Net Value of the Sales Document in Document Currency'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=NETWR_AK'
  TotalNetAmount : Decimal(precision: 15) not null;
  @Common.SAPObjectNodeTypeReference : 'Currency'
  @Common.IsCurrency : true
  @Common.IsUpperCase : true
  @Common.Label : 'Document Currency'
  @Common.Heading : 'Crcy'
  @Common.QuickInfo : 'SD Document Currency'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERK'
  TransactionCurrency : String(3) not null;
  @Common.SAPObjectNodeTypeReference : 'SalesDocumentReason'
  @Common.IsUpperCase : true
  @Common.Label : 'Order Reason'
  @Common.Heading : 'OrdRs'
  @Common.QuickInfo : 'Order Reason (Reason for the Business Transaction)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=AUGRU'
  SDDocumentReason : String(3) not null;
  @Common.SAPObjectNodeTypeReference : 'CustomerGroup'
  @Common.IsUpperCase : true
  @Common.Label : 'Customer Group'
  @Common.Heading : 'CGrp'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KDGRP'
  CustomerGroup : String(2) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Shipping Conditions'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VSBED'
  ShippingCondition : String(2) not null;
  @Common.Label : 'Pricing Date'
  @Common.Heading : 'Pricing Dt'
  @Common.QuickInfo : 'Date for Pricing and Exchange Rate'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PRSDT'
  PricingDate : Date;
  @Common.Label : 'Billing Date'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FKDAT'
  BillingDocumentDate : Date;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Pricing Procedure'
  @Common.Heading : 'PriPr.'
  @Common.QuickInfo : 'Pricing Procedure in Pricing'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KALSMASD'
  SDPricingProcedure : String(6) not null;
  @Common.SAPObjectNodeTypeReference : 'CustomerPriceGroup'
  @Common.IsUpperCase : true
  @Common.Label : 'Customer Price Group'
  @Common.Heading : 'CPG'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KONDA'
  CustomerPriceGroup : String(2) not null;
  @Common.SAPObjectNodeTypeReference : 'IncotermsClassification'
  @Common.IsUpperCase : true
  @Common.Label : 'Incoterms'
  @Common.Heading : 'IncoT'
  @Common.QuickInfo : 'Incoterms (Part 1)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO1'
  IncotermsClassification : String(3) not null;
  @Common.Label : 'Incoterms (Part 2)'
  @Common.Heading : 'Inco. 2'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO2'
  IncotermsTransferLocation : String(28) not null;
  @Common.Label : 'Incoterms Location 1'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO2_L'
  IncotermsLocation1 : String(70) not null;
  @Common.Label : 'Incoterms Location 2'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO3_L'
  IncotermsLocation2 : String(70) not null;
  @Common.SAPObjectNodeTypeReference : 'IncotermsVersion'
  @Common.IsUpperCase : true
  @Common.Label : 'Incoterms Version'
  @Common.Heading : 'IncoV'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCOV'
  IncotermsVersion : String(4) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Terms of Payment'
  @Common.QuickInfo : 'Key for Terms of Payment'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=DZTERM'
  CustomerPaymentTerms : String(4) not null;
  @Common.SAPObjectNodeTypeReference : 'PaymentMethod'
  @Common.IsUpperCase : true
  @Common.Label : 'Payment Method'
  @Common.Heading : 'PM'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SCHZW_BSEG'
  PaymentMethod : String(1) not null;
  @Common.Label : 'Valid-From Date'
  @Common.Heading : 'Valid From'
  @Common.QuickInfo : 'Valid-From Date (Outline Agreements, Product Proposals)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=GUEBG'
  SalesContractValidityStartDate : Date;
  @Common.Label : 'Valid-To Date'
  @Common.Heading : 'Valid To'
  @Common.QuickInfo : 'Valid-To Date (Outline Agreements, Product Proposals)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=GUEEN'
  SalesContractValidityEndDate : Date;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Reference Document'
  @Common.Heading : 'Ref. Doc.'
  @Common.QuickInfo : 'Document Number of Reference Document'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VGBEL'
  ReferenceSDDocument : String(10) not null;
  @Core.Computed : true
  @Common.Label : 'Reference Document Category'
  ReferenceSDDocumentCategory : String(4) not null;
  @Common.SAPObjectNodeTypeReference : 'SalesDocApprovalStatus'
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Approval Status'
  @Common.QuickInfo : 'Document Approval Status'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SD_APM_APPROVAL_STATUS'
  SalesDocApprovalStatus : String(1) not null;
  @Common.SAPObjectNodeTypeReference : 'SalesContractApprovalReason'
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Approval Request Reason'
  @Common.QuickInfo : 'Approval Request Reason ID'
  SalesContractApprovalReason : String(4) not null;
  @Common.SAPObjectNodeTypeReference : 'OverallSDProcessStatus'
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Overall Status'
  @Common.Heading : 'OS'
  @Common.QuickInfo : 'Overall Processing Status (Header/All Items)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=GBSTK'
  OverallSDProcessStatus : String(1) not null;
  @Common.SAPObjectNodeTypeReference : 'TotalCreditCheckStatus'
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Credit Status'
  @Common.Heading : 'OvCS'
  @Common.QuickInfo : 'Overall Status of Credit Checks'
  TotalCreditCheckStatus : String(1) not null;
  @Common.SAPObjectNodeTypeReference : 'OverallSDDocumentRejectionSts'
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Rejection Status'
  @Common.Heading : 'Rj'
  @Common.QuickInfo : 'Rejection Status (All Items)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ABSTK'
  OverallSDDocumentRejectionSts : String(1) not null;
  SAP__Messages : many CE_SALESCONTRACT_0001.SAP__Message not null;
  @Common.Composition : true
  _Item : Composition of many CE_SALESCONTRACT_0001.SalesContractItem {  };
  @Common.Composition : true
  _PricingElement : Composition of many CE_SALESCONTRACT_0001.SlsContrPricingElement {  };
  @Common.Composition : true
  _Text : Composition of many CE_SALESCONTRACT_0001.SalesContractText {  };
};

@cds.external : true
@cds.persistence.skip : true
@Common.Label : 'Sales Contract Items'
@Common.SemanticKey : [ 'SalesContractItem', 'SalesContract' ]
@Common.Messages : SAP__Messages
@Capabilities.NavigationRestrictions.RestrictedProperties : [
  {
    NavigationProperty: _ItemPricingElement,
    InsertRestrictions: { Insertable: true },
    FilterRestrictions: { Filterable: false }
  },
  {
    NavigationProperty: _ItemText,
    InsertRestrictions: { Insertable: true }
  }
]
@Capabilities.SearchRestrictions.Searchable : false
@Capabilities.FilterRestrictions.NonFilterableProperties : [ 'SlsContrItemReleasedQuantity' ]
@Capabilities.SortRestrictions.NonSortableProperties : [ 'SlsContrItemReleasedQuantity' ]
@Capabilities.InsertRestrictions.Insertable : false
@Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_ItemPricingElement', '_ItemText', '_SalesContract' ]
@Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
@Core.OptimisticConcurrency : [ '_SalesContract/LastChangeDateTime' ]
entity CE_SALESCONTRACT_0001.SalesContractItem {
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Contract'
  @Common.Heading : 'SC'
  key SalesContract : String(10) not null;
  @Core.Immutable : true
  @Common.IsDigitSequence : true
  @Common.Label : 'Sales Contract Item'
  @Common.Heading : 'SC Item'
  key SalesContractItem : String(6) not null;
  @Common.IsDigitSequence : true
  @Common.Label : 'Higher-Level Item'
  @Common.Heading : 'HgLvIt'
  @Common.QuickInfo : 'Higher-Level Item in Bill of Material Structures'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=UEPOS'
  HigherLevelItem : String(6);
  @Common.IsUpperCase : true
  @Common.Label : 'Item Category'
  @Common.Heading : 'ItCa'
  @Common.QuickInfo : 'Sales Document Item Category'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PSTYV'
  SalesContractItemCategory : String(4) not null;
  @Common.Label : 'Item Description'
  @Common.QuickInfo : 'Short Text for Sales Order Item'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ARKTX'
  SalesContractItemText : String(40) not null;
  @Common.Label : 'Customer Reference'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BSTKD'
  PurchaseOrderByCustomer : String(35) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Product'
  @Common.QuickInfo : 'Product Number'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PRODUCTNUMBER'
  Product : String(18) not null;
  @Common.SAPObjectNodeTypeReference : 'ProductGroup'
  @Common.IsUpperCase : true
  @Common.Label : 'Product Group'
  @Common.Heading : 'Prd Group'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PRODUCTGROUP'
  ProductGroup : String(9) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Customer Material'
  @Common.Heading : 'Customer Material Number'
  @Common.QuickInfo : 'Material Number Used by Customer'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MATNR_KU'
  MaterialByCustomer : String(35) not null;
  @Common.Label : 'Pricing Date'
  @Common.Heading : 'Pricing Dt'
  @Common.QuickInfo : 'Date for Pricing and Exchange Rate'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PRSDT'
  PricingDate : Date;
  @Common.Label : 'Billing Date'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FKDAT'
  BillingDocumentDate : Date;
  @Measures.Unit : RequestedQuantitySAPUnit
  @Measures.UNECEUnit : RequestedQuantityISOUnit
  @Validation.Minimum : 0
  @Common.Label : 'Requested Quantity'
  @Common.Heading : 'Reqd Qty'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=REQD_QTY'
  RequestedQuantity : Decimal(15, 3) not null;
  @Common.IsUnit : true
  @Common.Label : 'Requested Qty Unit'
  @Common.Heading : 'RQ Unit'
  @Common.QuickInfo : 'Unit of the Requested Quantity'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=REQD_QTY_UNIT'
  RequestedQuantitySAPUnit : String(3) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'ISO Code Req. Qty'
  @Common.Heading : 'ISO Unit Code for Requested Quantity'
  @Common.QuickInfo : 'ISO Unit Code for Requested Quantity'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SD_REQD_QTY_ISOUNIT'
  RequestedQuantityISOUnit : String(3) not null;
  @Common.Label : 'Conversion Factor'
  @Common.Heading : 'ConvFactor'
  @Common.QuickInfo : 'Factor for Converting Sales Units to Base Units (Target Qty)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=UMZIN'
  TargetToBaseQuantityDnmntr : Decimal(precision: 5) not null;
  @Common.Label : 'Conversion Factor'
  @Common.Heading : 'ConvFactor'
  @Common.QuickInfo : 'Factor for Converting Sales Units to Base Units (Target Qty)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=UMZIZ'
  TargetToBaseQuantityNmrtr : Decimal(precision: 5) not null;
  @Core.Computed : true
  @Measures.Unit : SlsContrItmReldQuantitySAPUnit
  @Measures.UNECEUnit : SlsContrItmReldQuantityISOUnit
  @Common.Label : 'Reld Contr Tgt Qty'
  @Common.Heading : 'Released Quantity on Sales Contract Item'
  @Common.QuickInfo : 'Released Quantity on Sales Contract Item'
  SlsContrItemReleasedQuantity : Decimal(15, 3) not null;
  @Common.IsUnit : true
  @Core.Computed : true
  @Common.Label : 'Released Qty Unit'
  @Common.Heading : 'Reld Unit'
  @Common.QuickInfo : 'Released Quantity Unit on Sales Contract Item'
  SlsContrItmReldQuantitySAPUnit : String(3) not null;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'ISO Code Reld Qty'
  @Common.Heading : 'ISO Unit Code for Released Quantity'
  @Common.QuickInfo : 'Released Quantity ISO Unit on Sales Contract Item'
  SlsContrItmReldQuantityISOUnit : String(3) not null;
  @Core.Computed : true
  @Measures.Unit : ItemWeightSAPUnit
  @Measures.UNECEUnit : ItemWeightISOUnit
  @Common.Label : 'Gross Weight'
  @Common.QuickInfo : 'Gross Weight of the Item'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BRGEW_AP'
  ItemGrossWeight : Decimal(15, 3) not null;
  @Core.Computed : true
  @Measures.Unit : ItemWeightSAPUnit
  @Measures.UNECEUnit : ItemWeightISOUnit
  @Common.Label : 'Net Weight'
  @Common.QuickInfo : 'Net Weight of the Item'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=NTGEW_AP'
  ItemNetWeight : Decimal(15, 3) not null;
  @Common.IsUnit : true
  @Core.Computed : true
  @Common.Label : 'Unit of Weight'
  @Common.Heading : 'WUn'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=GEWEI'
  ItemWeightSAPUnit : String(3) not null;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'ISO Code Item Weight'
  @Common.Heading : 'ISO Unit Code for Item Weight'
  @Common.QuickInfo : 'ISO Unit Code for Item Weight'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SD_ITM_WGT_ISOUNIT'
  ItemWeightISOUnit : String(3) not null;
  @Core.Computed : true
  @Measures.Unit : ItemVolumeSAPUnit
  @Measures.UNECEUnit : ItemVolumeISOUnit
  @Common.Label : 'Volume'
  @Common.QuickInfo : 'Volume of the item'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VOLUM_AP'
  ItemVolume : Decimal(15, 3) not null;
  @Common.IsUnit : true
  @Core.Computed : true
  @Common.Label : 'Volume Unit'
  @Common.Heading : 'VUn'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VOLEH'
  ItemVolumeSAPUnit : String(3) not null;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'ISO Unit Item Volume'
  @Common.Heading : 'ISO Unit Code for Item Volume'
  @Common.QuickInfo : 'ISO Unit Code for Item Volume'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SD_ITM_VOL_ISOUNIT'
  ItemVolumeISOUnit : String(3) not null;
  @Measures.ISOCurrency : TransactionCurrency
  @Common.Label : 'OA Target Value'
  @Common.Heading : 'Target Value'
  @Common.QuickInfo : 'Target Value for Outline Agreement in Document Currency'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=DZWERT'
  OutlineAgreementTargetAmount : Decimal(precision: 13) not null;
  @Core.Computed : true
  @Measures.ISOCurrency : TransactionCurrency
  @Common.Label : 'Released Value'
  @Common.Heading : 'Released Value in Sales Contracts'
  @Common.QuickInfo : 'Released Value in Sales Contracts in Transaction Currency'
  SlsContractItemReleasedAmount : Decimal(precision: 19) not null;
  @Common.SAPObjectNodeTypeReference : 'Currency'
  @Common.IsCurrency : true
  @Common.IsUpperCase : true
  @Common.Label : 'Document Currency'
  @Common.Heading : 'Crcy'
  @Common.QuickInfo : 'SD Document Currency'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERK'
  TransactionCurrency : String(3) not null;
  @Core.Computed : true
  @Measures.ISOCurrency : TransactionCurrency
  @Common.Label : 'Net Value'
  @Common.QuickInfo : 'Net Value of the Document Item in Document Currency'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=NETWR_AP'
  NetAmount : Decimal(precision: 15) not null;
  @Common.SAPObjectNodeTypeReference : 'CustomerPriceGroup'
  @Common.IsUpperCase : true
  @Common.Label : 'Customer Price Group'
  @Common.Heading : 'CPG'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KONDA'
  CustomerPriceGroup : String(2) not null;
  @Common.SAPObjectNodeTypeReference : 'MaterialPricingGroup'
  @Common.IsUpperCase : true
  @Common.Label : 'Product Price Group'
  @Common.Heading : 'PPG'
  ProductPricingGroup : String(2) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Batch'
  @Common.QuickInfo : 'Batch Number'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=CHARG_D'
  Batch : String(10) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Plant'
  @Common.Heading : 'Plnt'
  @Common.QuickInfo : 'Plant (Own or External)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WERKS_EXT'
  ProductionPlant : String(4) not null;
  @Common.SAPObjectNodeTypeReference : 'StorageLocation'
  @Common.IsUpperCase : true
  @Common.Label : 'Storage Location'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=LGORT_D'
  StorageLocation : String(4) not null;
  @Common.SAPObjectNodeTypeReference : 'ShippingPoint'
  @Common.IsUpperCase : true
  @Common.Label : 'Shipping Point'
  @Common.Heading : 'ShPt'
  @Common.QuickInfo : 'Shipping Point / Receiving Point'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VSTEL'
  ShippingPoint : String(4) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Shipping Type'
  @Common.Heading : 'ST'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VSARTTR'
  ShippingType : String(2) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Route'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ROUTE'
  Route : String(6) not null;
  @Common.Label : 'Overdeliv. Tolerance'
  @Common.Heading : 'Overdel. Tol.'
  @Common.QuickInfo : 'Overdelivery Tolerance'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=UEBTO'
  OverdelivTolrtdLmtRatioInPct : Decimal(3, 1) not null;
  @Common.Label : 'Underdel. Tolerance'
  @Common.Heading : 'Underdel.Tol.'
  @Common.QuickInfo : 'Underdelivery Tolerance'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=UNTTO'
  UnderdelivTolrtdLmtRatioInPct : Decimal(3, 1) not null;
  @Common.SAPObjectNodeTypeReference : 'IncotermsClassification'
  @Common.IsUpperCase : true
  @Common.Label : 'Incoterms'
  @Common.Heading : 'IncoT'
  @Common.QuickInfo : 'Incoterms (Part 1)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO1'
  IncotermsClassification : String(3) not null;
  @Common.Label : 'Incoterms (Part 2)'
  @Common.Heading : 'Inco. 2'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO2'
  IncotermsTransferLocation : String(28) not null;
  @Common.Label : 'Incoterms Location 1'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO2_L'
  IncotermsLocation1 : String(70) not null;
  @Common.Label : 'Incoterms Location 2'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO3_L'
  IncotermsLocation2 : String(70) not null;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Terms of Payment'
  @Common.QuickInfo : 'Key for Terms of Payment'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=DZTERM'
  CustomerPaymentTerms : String(4) not null;
  @Common.SAPObjectNodeTypeReference : 'SalesDocumentRjcnReason'
  @Common.IsUpperCase : true
  @Common.Label : 'Reason for Rejection'
  @Common.Heading : 'Rj'
  @Common.QuickInfo : 'Reason for Rejection of Sales Documents'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ABGRU_VA'
  SalesDocumentRjcnReason : String(2) not null;
  @Common.SAPObjectNodeTypeReference : 'BillingBlockReason'
  @Common.IsUpperCase : true
  @Common.Label : 'Billing Block'
  @Common.Heading : 'BB'
  @Common.QuickInfo : 'Billing Block for Item'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FAKSP_AP'
  ItemBillingBlockReason : String(2) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'Profit Center'
  @Common.Heading : 'Profit Ctr'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PRCTR'
  ProfitCenter : String(10) not null;
  @Common.SAPObjectNodeTypeReference : 'SDProcessStatus'
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Overall Status'
  @Common.Heading : 'OS'
  @Common.QuickInfo : 'Overall Processing Status (Item)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=GBSTA'
  SDProcessStatus : String(1) not null;
  SAP__Messages : many CE_SALESCONTRACT_0001.SAP__Message not null;
  @Common.Composition : true
  _ItemPricingElement : Composition of many CE_SALESCONTRACT_0001.SlsContrItemPricingElement {  };
  @Common.Composition : true
  _ItemText : Composition of many CE_SALESCONTRACT_0001.SalesContractItemText {  };
  _SalesContract : Association to one CE_SALESCONTRACT_0001.SalesContract {  };
};

@cds.external : true
@cds.persistence.skip : true
@Common.Label : 'Item Texts'
@Common.SemanticKey : [ 'LongTextID', 'Language', 'SalesContractItem', 'SalesContract' ]
@Common.Messages : SAP__Messages
@Capabilities.SearchRestrictions.Searchable : false
@Capabilities.FilterRestrictions.Filterable : true
@Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
  {
    Property: LongText,
    AllowedExpressions: 'SearchExpression'
  }
]
@Capabilities.FilterRestrictions.NonFilterableProperties : [ 'LongText' ]
@Capabilities.SortRestrictions.NonSortableProperties : [ 'LongText' ]
@Capabilities.InsertRestrictions.RequiredProperties : [ 'LongText' ]
@Capabilities.InsertRestrictions.Insertable : false
@Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_Item', '_SalesContract' ]
@Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
@Core.OptimisticConcurrency : [ '_SalesContract/LastChangeDateTime' ]
entity CE_SALESCONTRACT_0001.SalesContractItemText {
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Contract'
  @Common.Heading : 'SC'
  key SalesContract : String(10) not null;
  @Core.Computed : true
  @Common.IsDigitSequence : true
  @Common.Label : 'Sales Contract Item'
  @Common.Heading : 'SC Item'
  key SalesContractItem : String(6) not null;
  @Core.Immutable : true
  @Common.Label : 'Language Key'
  @Common.Heading : 'Language'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SPRAS'
  key Language : String(2) not null;
  @Core.Immutable : true
  @Common.IsUpperCase : true
  @Common.Label : 'Text ID'
  @Common.Heading : 'ID'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=TDID'
  key LongTextID : String(4) not null;
  @Common.Label : 'String'
  LongText : LargeString not null;
  SAP__Messages : many CE_SALESCONTRACT_0001.SAP__Message not null;
  _Item : Association to one CE_SALESCONTRACT_0001.SalesContractItem {  };
  _SalesContract : Association to one CE_SALESCONTRACT_0001.SalesContract {  };
};

@cds.external : true
@cds.persistence.skip : true
@Common.Label : 'Header Texts'
@Common.SemanticKey : [ 'LongTextID', 'Language', 'SalesContract' ]
@Common.Messages : SAP__Messages
@Capabilities.SearchRestrictions.Searchable : false
@Capabilities.FilterRestrictions.Filterable : true
@Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
  {
    Property: LongText,
    AllowedExpressions: 'SearchExpression'
  }
]
@Capabilities.FilterRestrictions.NonFilterableProperties : [ 'LongText' ]
@Capabilities.SortRestrictions.NonSortableProperties : [ 'LongText' ]
@Capabilities.InsertRestrictions.RequiredProperties : [ 'LongText' ]
@Capabilities.InsertRestrictions.Insertable : false
@Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_SalesContract' ]
@Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
@Core.OptimisticConcurrency : [ '_SalesContract/LastChangeDateTime' ]
entity CE_SALESCONTRACT_0001.SalesContractText {
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Contract'
  @Common.Heading : 'SC'
  key SalesContract : String(10) not null;
  @Core.Immutable : true
  @Common.Label : 'Language Key'
  @Common.Heading : 'Language'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SPRAS'
  key Language : String(2) not null;
  @Core.Immutable : true
  @Common.IsUpperCase : true
  @Common.Label : 'Text ID'
  @Common.Heading : 'ID'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=TDID'
  key LongTextID : String(4) not null;
  @Common.Label : 'String'
  LongText : LargeString not null;
  SAP__Messages : many CE_SALESCONTRACT_0001.SAP__Message not null;
  _SalesContract : Association to one CE_SALESCONTRACT_0001.SalesContract {  };
};

@cds.external : true
@cds.persistence.skip : true
@Common.Label : 'Item Pricing Elements'
@Common.SemanticKey : [ 'PricingProcedureCounter', 'PricingProcedureStep', 'SalesContractItem', 'SalesContract' ]
@Common.Messages : SAP__Messages
@Capabilities.NavigationRestrictions.RestrictedProperties : [
  {
    NavigationProperty: _Item,
    SortRestrictions: { Sortable: false },
    FilterRestrictions: { Filterable: false }
  },
  {
    NavigationProperty: _SalesContract,
    SortRestrictions: { Sortable: false },
    FilterRestrictions: { Filterable: false }
  }
]
@Capabilities.SearchRestrictions.Searchable : false
@Capabilities.InsertRestrictions.RequiredProperties : [ 'ConditionType' ]
@Capabilities.InsertRestrictions.Insertable : false
@Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_Item', '_SalesContract' ]
@Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
@Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
  {
    Property: ConditionRateRatio,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionRateRatioSAPUnit,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionRateRatioISOUnit,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionQuantity,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionQuantitySAPUnit,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionQuantityISOUnit,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionAmount,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionBaseQuantity,
    AllowedExpressions: 'MultiValue'
  }
]
entity CE_SALESCONTRACT_0001.SlsContrItemPricingElement {
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Contract'
  @Common.Heading : 'SC'
  key SalesContract : String(10) not null;
  @Core.Computed : true
  @Common.IsDigitSequence : true
  @Common.Label : 'Sales Contract Item'
  @Common.Heading : 'SC Item'
  key SalesContractItem : String(6) not null;
  @Core.Computed : true
  @Common.IsDigitSequence : true
  @Common.Label : 'Step Number'
  @Common.Heading : 'Step'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=STUNR'
  key PricingProcedureStep : String(3) not null;
  @Core.Computed : true
  @Common.IsDigitSequence : true
  @Common.Label : 'Counter'
  @Common.Heading : 'Cntr'
  @Common.QuickInfo : 'Condition Counter'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_COND_COUNT'
  key PricingProcedureCounter : String(3) not null;
  @Common.SAPObjectNodeTypeReference : 'SalesPricingConditionType'
  @Core.Immutable : true
  @Common.IsUpperCase : true
  @Common.Label : 'Condition Type'
  @Common.Heading : 'CnTy'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KSCHA'
  ConditionType : String(4) not null;
  @Common.SAPObjectNodeTypeReference : 'PriceConditionCalculationType'
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Calculation Type'
  @Common.Heading : 'CalTy'
  @Common.QuickInfo : 'Calculation Type for Condition'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KRECH_LONG'
  ConditionCalculationType : String(3) not null;
  @Measures.ISOCurrency : ConditionCurrency
  @Common.Label : 'Condition Amount'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_RATE_AMOUNT'
  ConditionRateAmount : Decimal(24, 9);
  @Common.SAPObjectNodeTypeReference : 'Currency'
  @Common.IsCurrency : true
  @Common.IsUpperCase : true
  @Common.Label : 'Currency'
  @Common.Heading : 'Crcy'
  @Common.QuickInfo : 'Currency Key'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERS'
  ConditionCurrency : String(3) not null;
  @Measures.Unit : ConditionRateRatioSAPUnit
  @Measures.UNECEUnit : ConditionRateRatioISOUnit
  @Common.Label : 'Ratio'
  @Common.QuickInfo : 'Condition Ratio (in Percent or Per Mille)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_ELEMENT_RATIO'
  ConditionRateRatio : Decimal(24, 9);
  @Common.IsUnit : true
  @Core.Computed : true
  @Common.Label : 'Internal UoM'
  @Common.Heading : 'MU'
  @Common.QuickInfo : 'Unit of Measurement'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MSEHI'
  ConditionRateRatioSAPUnit : String(3) not null;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'ISO Unit Code for Condition Ratio'
  ConditionRateRatioISOUnit : String(3) not null;
  @Measures.Unit : ConditionQuantitySAPUnit
  @Measures.UNECEUnit : ConditionQuantityISOUnit
  @Common.Label : 'Pricing Unit'
  @Common.Heading : 'per'
  @Common.QuickInfo : 'Condition Pricing Unit'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KPEIN'
  ConditionQuantity : Decimal(precision: 5);
  @Common.IsUnit : true
  @Common.Label : 'Condition Unit'
  @Common.Heading : 'UoM'
  @Common.QuickInfo : 'Condition Unit in the Document'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KVMEI'
  ConditionQuantitySAPUnit : String(3) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'ISO Condition Qty'
  @Common.Heading : 'ISO Code for Condition Quantity'
  @Common.QuickInfo : 'ISO Unit Code for Condition Quantity'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SD_CNDN_QTY_ISOUNIT'
  ConditionQuantityISOUnit : String(3) not null;
  @Measures.ISOCurrency : TransactionCurrency
  @Common.Label : 'Condition Value'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_ELEMENT_VALUE'
  ConditionAmount : Decimal(precision: 15);
  @Common.SAPObjectNodeTypeReference : 'Currency'
  @Common.IsCurrency : true
  @Common.IsUpperCase : true
  @Common.Label : 'Document Currency'
  @Common.Heading : 'Crcy'
  @Common.QuickInfo : 'SD Document Currency'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERK'
  TransactionCurrency : String(3) not null;
  @Core.Computed : true
  @Measures.ISOCurrency : TransactionCurrency
  @Common.Label : 'Cndn Bs Amt'
  @Common.Heading : 'Condition Basis Amount'
  @Common.QuickInfo : 'Amount of the Condition Basis'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_BASE_AMOUNT'
  ConditionBaseAmount : Decimal(24, 9);
  @Core.Computed : true
  @Measures.Unit : ConditionQuantitySAPUnit
  @Measures.UNECEUnit : ConditionQuantityISOUnit
  @Common.Label : 'Quantity'
  @Common.QuickInfo : 'Quantity of the Condition Basis'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_ELEMENT_QUANTITY'
  ConditionBaseQuantity : Decimal(24, 9);
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Inactive Condition'
  @Common.Heading : 'Inact'
  @Common.QuickInfo : 'Condition is Inactive'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KINAK'
  ConditionInactiveReason : String(1) not null;
  @Core.Computed : true
  @Common.Label : 'Changed Manually'
  @Common.Heading : 'Man'
  @Common.QuickInfo : 'Condition Changed Manually'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KMPRS'
  ConditionIsManuallyChanged : Boolean not null;
  @Core.Computed : true
  @Common.Label : 'Statistical'
  @Common.Heading : 'Stat'
  @Common.QuickInfo : 'Condition is used for statistics'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KSTAT'
  ConditionIsForStatistics : Boolean not null;
  SAP__Messages : many CE_SALESCONTRACT_0001.SAP__Message not null;
  _Item : Association to one CE_SALESCONTRACT_0001.SalesContractItem {  };
  _SalesContract : Association to one CE_SALESCONTRACT_0001.SalesContract {  };
};

@cds.external : true
@cds.persistence.skip : true
@Common.Label : 'Header Pricing Elements'
@Common.SemanticKey : [ 'PricingProcedureCounter', 'PricingProcedureStep', 'SalesContract' ]
@Common.Messages : SAP__Messages
@Capabilities.NavigationRestrictions.RestrictedProperties : [
  {
    NavigationProperty: _SalesContract,
    SortRestrictions: { Sortable: false },
    FilterRestrictions: { Filterable: false }
  }
]
@Capabilities.SearchRestrictions.Searchable : false
@Capabilities.InsertRestrictions.RequiredProperties : [ 'ConditionType' ]
@Capabilities.InsertRestrictions.Insertable : false
@Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_SalesContract' ]
@Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
@Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
  {
    Property: ConditionRateRatio,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionRateRatioSAPUnit,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionRateRatioISOUnit,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionQuantity,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionQuantitySAPUnit,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionQuantityISOUnit,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionAmount,
    AllowedExpressions: 'MultiValue'
  },
  {
    Property: ConditionBaseQuantity,
    AllowedExpressions: 'MultiValue'
  }
]
entity CE_SALESCONTRACT_0001.SlsContrPricingElement {
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Sales Contract'
  @Common.Heading : 'SC'
  key SalesContract : String(10) not null;
  @Core.Computed : true
  @Common.IsDigitSequence : true
  @Common.Label : 'Step Number'
  @Common.Heading : 'Step'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=STUNR'
  key PricingProcedureStep : String(3) not null;
  @Core.Computed : true
  @Common.IsDigitSequence : true
  @Common.Label : 'Counter'
  @Common.Heading : 'Cntr'
  @Common.QuickInfo : 'Condition Counter'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_COND_COUNT'
  key PricingProcedureCounter : String(3) not null;
  @Common.SAPObjectNodeTypeReference : 'SalesPricingConditionType'
  @Core.Immutable : true
  @Common.IsUpperCase : true
  @Common.Label : 'Condition Type'
  @Common.Heading : 'CnTy'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KSCHA'
  ConditionType : String(4) not null;
  @Common.SAPObjectNodeTypeReference : 'PriceConditionCalculationType'
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Calculation Type'
  @Common.Heading : 'CalTy'
  @Common.QuickInfo : 'Calculation Type for Condition'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KRECH_LONG'
  ConditionCalculationType : String(3) not null;
  @Measures.ISOCurrency : ConditionCurrency
  @Common.Label : 'Condition Amount'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_RATE_AMOUNT'
  ConditionRateAmount : Decimal(24, 9);
  @Common.SAPObjectNodeTypeReference : 'Currency'
  @Common.IsCurrency : true
  @Common.IsUpperCase : true
  @Common.Label : 'Currency'
  @Common.Heading : 'Crcy'
  @Common.QuickInfo : 'Currency Key'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERS'
  ConditionCurrency : String(3) not null;
  @Measures.Unit : ConditionRateRatioSAPUnit
  @Measures.UNECEUnit : ConditionRateRatioISOUnit
  @Common.Label : 'Ratio'
  @Common.QuickInfo : 'Condition Ratio (in Percent or Per Mille)'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_ELEMENT_RATIO'
  ConditionRateRatio : Decimal(24, 9);
  @Common.IsUnit : true
  @Core.Computed : true
  @Common.Label : 'Internal UoM'
  @Common.Heading : 'MU'
  @Common.QuickInfo : 'Unit of Measurement'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MSEHI'
  ConditionRateRatioSAPUnit : String(3) not null;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'ISO Unit Code for Condition Ratio'
  ConditionRateRatioISOUnit : String(3) not null;
  @Measures.Unit : ConditionQuantitySAPUnit
  @Measures.UNECEUnit : ConditionQuantityISOUnit
  @Common.Label : 'Pricing Unit'
  @Common.Heading : 'per'
  @Common.QuickInfo : 'Condition Pricing Unit'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KPEIN'
  ConditionQuantity : Decimal(precision: 5);
  @Common.IsUnit : true
  @Common.Label : 'Condition Unit'
  @Common.Heading : 'UoM'
  @Common.QuickInfo : 'Condition Unit in the Document'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KVMEI'
  ConditionQuantitySAPUnit : String(3) not null;
  @Common.IsUpperCase : true
  @Common.Label : 'ISO Condition Qty'
  @Common.Heading : 'ISO Code for Condition Quantity'
  @Common.QuickInfo : 'ISO Unit Code for Condition Quantity'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SD_CNDN_QTY_ISOUNIT'
  ConditionQuantityISOUnit : String(3) not null;
  @Measures.ISOCurrency : TransactionCurrency
  @Common.Label : 'Condition Value'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_ELEMENT_VALUE'
  ConditionAmount : Decimal(precision: 15);
  @Common.SAPObjectNodeTypeReference : 'Currency'
  @Common.IsCurrency : true
  @Common.IsUpperCase : true
  @Common.Label : 'Document Currency'
  @Common.Heading : 'Crcy'
  @Common.QuickInfo : 'SD Document Currency'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERK'
  TransactionCurrency : String(3) not null;
  @Core.Computed : true
  @Measures.ISOCurrency : TransactionCurrency
  @Common.Label : 'Cndn Bs Amt'
  @Common.Heading : 'Condition Basis Amount'
  @Common.QuickInfo : 'Amount of the Condition Basis'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_BASE_AMOUNT'
  ConditionBaseAmount : Decimal(24, 9);
  @Core.Computed : true
  @Measures.Unit : ConditionQuantitySAPUnit
  @Measures.UNECEUnit : ConditionQuantityISOUnit
  @Common.Label : 'Quantity'
  @Common.QuickInfo : 'Quantity of the Condition Basis'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=VFPRC_ELEMENT_QUANTITY'
  ConditionBaseQuantity : Decimal(24, 9);
  @Core.Computed : true
  @Common.Label : 'Statistical'
  @Common.Heading : 'Stat'
  @Common.QuickInfo : 'Condition is used for statistics'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KSTAT'
  ConditionIsForStatistics : Boolean not null;
  @Core.Computed : true
  @Common.Label : 'Changed Manually'
  @Common.Heading : 'Man'
  @Common.QuickInfo : 'Condition Changed Manually'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KMPRS'
  ConditionIsManuallyChanged : Boolean not null;
  @Core.Computed : true
  @Common.IsUpperCase : true
  @Common.Label : 'Inactive Condition'
  @Common.Heading : 'Inact'
  @Common.QuickInfo : 'Condition is Inactive'
  @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KINAK'
  ConditionInactiveReason : String(1) not null;
  SAP__Messages : many CE_SALESCONTRACT_0001.SAP__Message not null;
  _SalesContract : Association to one CE_SALESCONTRACT_0001.SalesContract {  };
};

