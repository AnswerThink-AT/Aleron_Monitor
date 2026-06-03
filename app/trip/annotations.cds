// using TripService as service from '../../srv/trip-service';

// annotate service.Trip with @(
//   // --- existing General Information facet ---
//   UI.FieldGroup #GeneratedGroup : {
//     $Type : 'UI.FieldGroupType',
//     Data : [
//         {
//             $Type : 'UI.DataField',
//             Value : Header.Project,
//             Label : 'Project',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.Comments,
//             Label : 'Comments',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.ContractNo,
//             Label : 'ContractNo',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.Country_code,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.Currency_code,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.Destination,
//             Label : 'Destination',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.ReasonForTrip,
//             Label : 'ReasonForTrip',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.Region,
//             Label : 'Region',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.TripSettlement,
//             Label : 'TripSettlement',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.TripType,
//             Label : 'TripType',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.WnInvoiceNo,
//             Label : 'WnInvoiceNo',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.WnWorkOrder,
//             Label : 'WnWorkOrder',
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Header.WoType,
//             Label : 'WoType',
//         },
//     ]
//   },

//   // --- assemble all facets ---
//   UI.Facets : [
//     { $Type : 'UI.ReferenceFacet', ID : 'GeneratedFacet1', Label : 'General Information', Target : '@UI.FieldGroup#GeneratedGroup' },
//     {
//         $Type : 'UI.ReferenceFacet',
//         Label : '{i18n>ExpenseReceipts}',
//         ID : 'i18nExpenseReceipts',
//         Target : 'Items/@UI.LineItem#i18nExpenseReceipts',
//     },
//     {
//         $Type : 'UI.ReferenceFacet',
//         Label : '{i18n>CustomerReferenceFields}',
//         ID : 'i18nCustomerReferenceFields',
//         Target : '@UI.FieldGroup#i18nCustomerReferenceFields',
//     },
//   ],

//   // --- line item adjustment: bring in some of the new fields too ---
//   UI.LineItem : [
//     { $Type : 'UI.DataField', Value : TripNumber },
//     { $Type : 'UI.DataField', Value : Personnel, Label : '{i18n>Personnel}', },
//     { $Type : 'UI.DataField', Value : StartOfTrip },
//     { $Type : 'UI.DataField', Value : EndOfTrip },
//     { $Type : 'UI.DataField', Value : Header.Project },
//     {
//             $Type       : 'UI.DataField',
//             Criticality : (Header.TripStatus.code = 0 ? 0 : 
//             (Header.TripStatus.code = 1 ? 3 : 
//             (Header.TripStatus.code = 2 ? 3 : 
//             (Header.TripStatus.code = 3 ? 2 :
//             (Header.TripStatus.code = 4 ? 2 : 
//             (Header.TripStatus.code = 5 ? 5 :  
//             (Header.TripStatus.code = 6 ? 0 : Header.TripStatus.code))))))),
//             Label       : '{i18n>TripStatus}',
//             Value       : Header.TripStatus.name,
//     },
//   ],

//   // --- selection fields: add a few filters on new props ---
//   UI.SelectionFields : [
//     TripNumber,
//     StartOfTrip,
//     EndOfTrip,
//     Costs.Project,
//     Header.Destination,
//     Header.TripStatus_code,
//   ],
//     UI.HeaderFacets : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             ID : 'i18nAdminInfo',
//             Target : '@UI.FieldGroup#i18nAdminInfo',
//         },
//         {
//             $Type : 'UI.ReferenceFacet',
//             ID : 'i18nTotalAmount',
//             Target : '@UI.FieldGroup#i18nTotalAmount',
//         },
//         {
//             $Type : 'UI.ReferenceFacet',
//             Target: '@UI.DataPoint#TripStatus',
//         },
//     ],
//     UI.DataPoint #TripStatus       : {
//         Value       : Header.TripStatus.name,
//         Title       : '{i18n>TripStatus}',
//         Criticality : (Header.TripStatus.code = 0 ? 0 : 
//         (Header.TripStatus.code = 1 ? 3 : 
//         (Header.TripStatus.code = 2 ? 3 : 
//         (Header.TripStatus.code = 3 ? 2 :
//         (Header.TripStatus.code = 4 ? 2 : 
//         (Header.TripStatus.code = 5 ? 5 :  
//         (Header.TripStatus.code = 6 ? 0 : Header.TripStatus.code))))))),
//     },
//     UI.SelectionPresentationVariant #table : {
//         $Type : 'UI.SelectionPresentationVariantType',
//         PresentationVariant : {
//             $Type : 'UI.PresentationVariantType',
//             Visualizations : [
//                 '@UI.LineItem',
//             ],
//         },
//         SelectionVariant : {
//             $Type : 'UI.SelectionVariantType',
//             SelectOptions : [
//             ],
//         },
//     },
//     UI.FieldGroup #i18nAdminInfo : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : Personnel,
//                 Label : '{i18n>Personnel}',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : StartOfTrip,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : EndOfTrip,
//             },
//         ],
//     },
//     UI.FieldGroup #i18nCustomerReferenceFields : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.SapSalesDocNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.SapSalesDocItemNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustWeekEnding,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustBusinessUnit,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustChargeNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.ProjectNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustCompanyCode,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustDeptNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustRUI,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustAccountNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustBudgetCenter,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustContractNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.SGVendorNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustOrgCode,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustLegalEntity,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustOracleNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustUnitStoreNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.ServiceDate,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustEmployeeNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustAgreementName,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.Task,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.FEPSCode,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustPosition,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustGLCode,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.PurchaseAgreement,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.BB,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustBackgroundCheckDate,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustDivisionUnitNo,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustPositionCode,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustCostCentre,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.CustPoLineItemNo,
//             },
//         ],
//     },
//     UI.FieldGroup #i18nTotalAmount : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : Header.TotalAmount,
//                 Label : 'TotalAmount',
//             },
//         ],
//     },
// );

// annotate service.TRIPHeader with {
//   TripNumber  @Common.Label : 'headers/tripNumber'
// };

// annotate service.Trip with {
//   Personnel   @Common.Label : '{i18n>personnel}'
// };

// annotate service.TRIPHeader with {
//   Personnel   @Common.Label : 'Headers/Personnel'
// };

// annotate service.TRIPItem with @(
//     UI.LineItem #i18nExpenseReceipts : [
//         {
//             $Type : 'UI.DataField',
//             Value : ExpenseReceiptNumber,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : TripExpenseType,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Amount,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : Currency_code,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : From,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : To,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : ReceiptsDocumentNumber,
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : UrlLink,
//         },
//     ],
//     UI.Facets : [
//         {
//         $Type : 'UI.ReferenceFacet',
//         Label : '{i18n>ExpenseReceipts}',
//         ID : 'i18nExpenseReceipts',
//         Target : '@UI.FieldGroup#i18nExpenseReceipts',
//         },
//     ],
//     UI.FieldGroup #i18nExpenseReceipts : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//             $Type : 'UI.DataField',
//             Value : ExpenseReceiptNumber,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : TripExpenseType,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Amount,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : Currency_code,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : From,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : To,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : ReceiptsDocumentNumber,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : UrlLink,
//             },      
//         ],
//     },
// );
// annotate service.Trip with @Capabilities.InsertRestrictions: {
//   Insertable: false
// };

// annotate service.TRIPHeader with @(
//     Communication.Contact #contact : {
//         $Type : 'Communication.ContactType',
//         fn : Comments,
//     }
// );

// annotate service.TRIPHeader with {
//     Destination @Common.Label : 'Header/Destination'
// };

// annotate service.TRIPHeader with {
//     TripStatus @Common.Label : 'Header/TripStatus'
// };

// annotate TripService.ExpenseTypes with {
//     expenseType @Common: {
//         Text: description,
//         TextArrangement: #TextFirst
//     };
// };

// annotate TripService.TRIPItem with {
//     TripExpenseType @(Common:{
//         ValueListWithFixedValues,
//         ValueList: {
//             CollectionPath: 'ExpenseTypes',
//             Parameters: [
//                 {
//                     $Type: 'Common.ValueListParameterInOut',
//                     LocalDataProperty: TripExpenseType,
//                     ValueListProperty: 'expenseType'
//                 },
//                 {
//                     $Type: 'Common.ValueListParameterInOut',
//                     LocalDataProperty: Header.Destination,
//                     ValueListProperty: 'tripProvision'
//                 },
//                 {
//                     $Type: 'Common.ValueListParameterDisplayOnly',
//                     ValueListProperty: 'description'
//                 }
//             ],
//             SearchSupported: true
//         }
//     });
// };