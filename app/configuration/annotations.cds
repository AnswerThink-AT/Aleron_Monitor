using ConfigService as service from '../../srv/config-service';
using from '../../db/schema';
using from '../../db/annotations';


annotate service.Configurations with @(
    
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>type}',
            ID : 'i18ntype',
            Target : 'interfaceTypes/@UI.LineItem#i18ntype',
            @UI.Hidden : (tableName != 'IFT')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>InterfaceSteps}',
            ID : 'i18nInterfaceSteps',
            Target : 'interfaceSteps/@UI.LineItem#i18nInterfaceSteps',
            @UI.Hidden : (tableName != 'IFS')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>FiledValidation}',
            ID : 'i18nFiledValidation',
            Target : 'fieldValidations/@UI.LineItem#i18nFiledValidation',
            @UI.Hidden : (tableName != 'FV')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Processes',
            ID : 'i18nProcessLevel',
            Target : 'processes/@UI.LineItem#i18nProcessLevel',
            @UI.Hidden : (tableName != 'PL')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>CustomerSalesOrder}',
            ID : 'i18nCustomerSalesOrder',
            Target : 'customerSaleOrders/@UI.LineItem#i18nCustomerSalesOrder',
            @UI.Hidden : (tableName != 'CSO')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>SkipInterface}',
            ID : 'i18nSkipInterface',
            Target : 'skipInterfaces/@UI.LineItem#i18nSkipInterface',
            @UI.Hidden : (tableName != 'SI')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>PurchaseOrders}',
            ID : 'i18nPurchaseOrders',
            Target : 'purchaseOrders/@UI.LineItem#i18nPurchaseOrders',
            @UI.Hidden : (tableName != 'PO')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>PaymentTerms}',
            ID : 'i18nPaymentTerms',
            Target : 'paymentTerms/@UI.LineItem#i18nPaymentTerms',
            @UI.Hidden : (tableName != 'PT')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Province',
            ID : 'Province',
            Target : 'taxCodeByProvince/@UI.LineItem#Province',
            @UI.Hidden : (tableName != 'PTJC')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'County',
            ID : 'County',
            Target : 'taxCodeByCounty/@UI.LineItem#County',
            @UI.Hidden : (tableName != 'COTJC')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'City',
            ID : 'City',
            Target : 'taxCodeByCity/@UI.LineItem#City',
            @UI.Hidden : (tableName != 'CTJC')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'SCON_UOM',
            ID : 'SCON_UOM',
            Target : 'scon_Uom/@UI.LineItem#SCON_UOM',
            @UI.Hidden : (tableName != 'SUOM')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vendor_VendorRemit',
            ID : 'Vendor_VendorRemit',
            Target : 'vendor_VendorRemit/@UI.LineItem#Vendor_VendorRemit',
            @UI.Hidden : (tableName != 'VVR')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'CustomerEDIPartnerConfig',
            ID : 'CustomerEDIPartnerConfig',
            Target : 'customerEDIPartnerConfig/@UI.LineItem#CustomerEDIPartnerConfig',
            @UI.Hidden : (tableName != 'CEPC')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'EdiShiftDiffForEmpSubGrp',
            ID : 'EdiShiftDiffForEmpSubGrp',
            Target : 'ediShiftDiffForEmpSubGrp/@UI.LineItem#EdiShiftDiffForEmpSubGrp',
            @UI.Hidden : (tableName != 'ESDFES')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'EdiShiftDiffForCanada',
            ID : 'EdiShiftDiffForCanada',
            Target : 'ediShiftDiffForCanada/@UI.LineItem#EdiShiftDiffForCanada',
            @UI.Hidden : (tableName != 'ESDFC')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'FGSiteCodeToAddressMapping',
            ID : 'FGSiteCodeToAddressMapping',
            Target : 'fGSiteCodeToAddressMapping/@UI.LineItem#FGSiteCodeToAddressMapping',
            @UI.Hidden : (tableName != 'SCAM')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'FGdefaultEmp',
            ID : 'FGdefaultEmp',
            Target : 'fGdefaultEmp/@UI.LineItem#FGdefaultEmp',
            @UI.Hidden : (tableName != 'DEPF')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'FGBusinessUnit',
            ID : 'FGBusinessUnit',
            Target : 'fGBusinessUnit/@UI.LineItem#FGBusinessUnit',
            @UI.Hidden : (tableName != 'BU')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'FGCostCenter',
            ID : 'FGCostCenter',
            Target : 'fGCostCenter/@UI.LineItem#FGCostCenter',
            @UI.Hidden : (tableName != 'CC')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'TravelCustomerPayTermByPOBox',
            ID : 'TravelCustomerPayTermByPOBox',
            Target : 'travelCustomerPayTermByPOBox/@UI.LineItem#TravelCustomerPayTermByPOBox',
            @UI.Hidden : (tableName != 'PTFPO')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'TravelPayTermFeed',
            ID : 'TravelPayTermFeed',
            Target : 'travelPayTermFeed/@UI.LineItem#TravelPayTermFeed',
            @UI.Hidden : (tableName != 'PTM')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'CustomFieldsToVC',
            ID : 'CustomFieldsToVC',
            Target : 'customFieldsToVC/@UI.LineItem#CustomFieldsToVC',
            @UI.Hidden : (tableName != 'CFVC')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'SalesCondition',
            ID : 'SalesCondition',
            Target : 'salesCondition/@UI.LineItem#SalesCondition',
            @UI.Hidden : (tableName != 'DSCT')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'CustomerZJOB',
            ID : 'CustomerZJOB',
            Target : 'customerZJOB/@UI.LineItem#CustomerZJOB',
            @UI.Hidden : (tableName != 'CSCL')
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Characteristic Usage Details',
            ID : 'Char_Usage_Details',
            Target : 'char_Usage_Details/@UI.LineItem#Char_Usage_Details',
            @UI.Hidden : (tableName != 'CUD')
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : tableDescr,
            ![@HTML5.CssDefaults] : {width: '100%'}
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : tableDescr,
        },
        TypeName : '',
        TypeNamePlural : ''
    },
);

annotate service.InterfaceTypes with @(
    UI.LineItem #i18ntype : [
        {
            $Type : 'UI.DataField',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Value : descr,
        },
        {
            $Type : 'UI.DataField',
            Value : filePrefix,
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Interface Type',
            ID : 'InterfaceType',
            Target : '@UI.FieldGroup#InterfaceType',
        },
    ],
    UI.FieldGroup #InterfaceType : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Value : descr,
            },
            {
                $Type : 'UI.DataField',
                Value : filePrefix,
            },
            {
                $Type : 'UI.DataField',
                Value : mappedEntity,
                Label : 'mappedEntity',
            },
        ],
    },
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : name,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : ID,
        }
    },
);

annotate service.InterfaceSteps with @(
    UI.LineItem #i18nInterfaceSteps : [
        {
            $Type : 'UI.DataField',
            Value : interfaceType.ID,
        },
        {
            $Type : 'UI.DataField',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Value : process_code,
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Interface Steps',
            ID : 'InterfaceSteps',
            Target : '@UI.FieldGroup#InterfaceSteps',
        },
    ],
    UI.FieldGroup #InterfaceSteps : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : interfaceType.ID,
            },
            {
                $Type : 'UI.DataField',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Value : process_code,
            },
        ],
    },
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : ID,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : ' ',
        },
    },
);

annotate service.FieldValidations with @(
    UI.LineItem #i18nFiledValidation : [
        {
            $Type : 'UI.DataField',
            Value : interfaceType.ID,
        },
        {
            $Type : 'UI.DataField',
            Value : country
        },
        {
            $Type : 'UI.DataField',
            Value : area
        },
        {
            $Type : 'UI.DataField',
            Value : term
        },
        {
            $Type : 'UI.DataField',
            Value : actionIndicator
        },
        {
            $Type : 'UI.DataField',
            Value : field,
        },
        {
            $Type : 'UI.DataField',
            Value : validation
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : interfaceType.name,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : field,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Filed Validation',
            ID : 'FiledValidation',
            Target : '@UI.FieldGroup#FiledValidation',
        },
    ],
    UI.FieldGroup #FiledValidation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : interfaceType.ID,
            },
            {
                $Type : 'UI.DataField',
                Value : area,
            },
            {
                $Type : 'UI.DataField',
                Value : country,
            },
            {
                $Type : 'UI.DataField',
                Value : actionIndicator,
            },
            {
                $Type : 'UI.DataField',
                Value : field,
            },
            {
                $Type : 'UI.DataField',
                Value : term,
            },
            {
                $Type : 'UI.DataField',
                Value : validation,
            },
        ],
    },
);

annotate service.Processes with @(
    UI.LineItem #i18nProcessLevel : [
        {
            $Type : 'UI.DataField',
            Value : code,
        },
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Value : descr,
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : code,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : descr,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Processes',
            ID : 'Processes',
            Target : '@UI.FieldGroup#Processes',
        },
    ],
    UI.FieldGroup #Processes : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : code,
            },
            {
                $Type : 'UI.DataField',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Value : descr,
            },
        ],
    },
);

annotate service.CustomerSaleOrders with @(
    UI.LineItem #i18nCustomerSalesOrder : [
        {
            $Type : 'UI.DataField',
            Value : contract
        },
        {
            $Type : 'UI.DataField',
            Value : contractType
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : contract,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : contractType,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Customer Sales Order',
            ID : 'CustomerSalesOrder',
            Target : '@UI.FieldGroup#CustomerSalesOrder',
        },
    ],
    UI.FieldGroup #CustomerSalesOrder : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : contract,
                Label : 'contract',
            },
            {
                $Type : 'UI.DataField',
                Value : contractType,
                Label : 'contractType',
            },
        ],
    },
);

annotate service.SkipInterfaces with @(
    UI.LineItem #i18nSkipInterface : [
        {
            $Type : 'UI.DataField',
            Value : contract
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : contract,
        },
        TypeName : '',
        TypeNamePlural : '',
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Skip Interface',
            ID : 'SkipInterface',
            Target : '@UI.FieldGroup#SkipInterface',
        },
    ],
    UI.FieldGroup #SkipInterface : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : contract,
                Label : 'contract',
            },
        ],
    },
);

annotate service.PurchaseOrders with @(
    UI.LineItem #i18nPurchaseOrders : [
        {
            $Type : 'UI.DataField',
            Value : soldToParty,
        },
        {
            $Type : 'UI.DataField',
            Value : billToParty
        },
        {
            $Type : 'UI.DataField',
            Value : laberPO
        },
        {
            $Type : 'UI.DataField',
            Value : expensePO
        }
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : soldToParty,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : billToParty,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Labor PO and Expense PO',
            ID : 'LaborPOandExpensePO',
            Target : '@UI.FieldGroup#LaborPOandExpensePO',
        },
    ],
    UI.FieldGroup #LaborPOandExpensePO : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : soldToParty
            },
            {
                $Type : 'UI.DataField',
                Value : billToParty
            },
            {
                $Type : 'UI.DataField',
                Value : laberPO
            },
            {
                $Type : 'UI.DataField',
                Value : expensePO
            },
        ],
    },
);

annotate service.PaymentTerms with @(
    UI.LineItem #i18nPaymentTerms : [
        {
            $Type : 'UI.DataField',
            Value : customerNo
        },
        {
            $Type : 'UI.DataField',
            Value : supplierNo
        },
        {
            $Type : 'UI.DataField',
            Value : vendorTerm
        },
        {
            $Type : 'UI.DataField',
            Value : customerTerm
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : customerNo,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : supplierNo,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Payment Term',
            ID : 'PaymentTerm',
            Target : '@UI.FieldGroup#PaymentTerm',
        },
    ],
    UI.FieldGroup #PaymentTerm : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : customerNo
            },
            {
                $Type : 'UI.DataField',
                Value : supplierNo
            },
            {
                $Type : 'UI.DataField',
                Value : customerTerm
            },
            {
                $Type : 'UI.DataField',
                Value : vendorTerm
            },
        ],
    },
);

annotate service.InterfaceSteps with {
    process @Common.ValueListWithFixedValues : true
};



annotate service.InterfaceTypes with {
    ID @Common.Text : {
        $value : name,
        ![@UI.TextArrangement] : #TextSeparate,
    }
};

annotate service.TaxCodeByProvince with @(
    UI.LineItem #Province : [
        {
            $Type : 'UI.DataField',
            Value : country_code,
        },
        {
            $Type : 'UI.DataField',
            Value : region,
        },
        {
            $Type : 'UI.DataField',
            Value : province,
        },
        {
            $Type : 'UI.DataField',
            Value : taxJurisdiction,
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : country_code,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : region,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Province',
            ID : 'Province',
            Target : '@UI.FieldGroup#Province',
        },
    ],
    UI.FieldGroup #Province : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : country_code,
            },
            {
                $Type : 'UI.DataField',
                Value : region,
            },
            {
                $Type : 'UI.DataField',
                Value : taxJurisdiction,
            },
            {
                $Type : 'UI.DataField',
                Value : province,
            },
        ],
    },
);

annotate service.TaxCodeByCounty with @(
    UI.LineItem #County : [
        {
            $Type : 'UI.DataField',
            Value : country_code,
        },
        {
            $Type : 'UI.DataField',
            Value : region,
        },
        {
            $Type : 'UI.DataField',
            Value : county,
        },
        {
            $Type : 'UI.DataField',
            Value : taxJurisdiction,
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : county,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : country_code,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'County',
            ID : 'County',
            Target : '@UI.FieldGroup#County',
        },
    ],
    UI.FieldGroup #County : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : country_code,
            },
            {
                $Type : 'UI.DataField',
                Value : region,
            },
            {
                $Type : 'UI.DataField',
                Value : county,
            },
            {
                $Type : 'UI.DataField',
                Value : taxJurisdiction,
            },
        ],
    },
);

annotate service.TaxCodeByCity with @(
    UI.LineItem #City : [
        {
            $Type : 'UI.DataField',
            Value : country_code,
        },
        {
            $Type : 'UI.DataField',
            Value : region,
        },
        {
            $Type : 'UI.DataField',
            Value : city,
        },
        {
            $Type : 'UI.DataField',
            Value : taxJurisdiction,
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : city,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : country_code,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'City',
            ID : 'City',
            Target : '@UI.FieldGroup#City',
        },
    ],
    UI.FieldGroup #City : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : country_code,
            },
            {
                $Type : 'UI.DataField',
                Value : region,
            },
            {
                $Type : 'UI.DataField',
                Value : city,
            },
            {
                $Type : 'UI.DataField',
                Value : taxJurisdiction,
            },
        ],
    },
);

annotate service.SCON_UOM with @(
    UI.LineItem #SCON_UOM: [
        { 
          $Type: 'UI.DataField',
          Value: salesDocItemCategory,
        },
        { 
          $Type: 'UI.DataField', 
          Value: uoM,
        },
        { 
          $Type: 'UI.DataField', 
          Value: description, 
        },
        { 
          $Type: 'UI.DataField', 
          Value: billQtyChar, 
        },
        { 
          $Type: 'UI.DataField', 
          Value: billRateChar, 
        },
        { 
          $Type: 'UI.DataField', 
          Value: billTotalChar, 
        },
        { 
          $Type: 'UI.DataField', 
          Value: payQtyChar, 
        },
        { 
          $Type: 'UI.DataField',
          Value: payRateChar, 
        },
        { 
          $Type: 'UI.DataField',
          Value: payTotalChar,
        },
        { 
          $Type: 'UI.DataField',
          Value: priceChar,
        }
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  salesDocItemCategory,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : description,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'SCON_UOM',
            ID    : 'SCON_UOM',
            Target : '@UI.FieldGroup#SCON_UOM',
        },
    ],
    UI.FieldGroup #SCON_UOM: {
        $Type: 'UI.FieldGroupType',
        Data: [
            { 
               $Type: 'UI.DataField', 
               Value: salesDocItemCategory, 
            },
            { 
               $Type: 'UI.DataField', 
               Value: uoM,
            },
            { 
               $Type: 'UI.DataField', 
               Value: description, 
            },
            { 
               $Type: 'UI.DataField', 
               Value: billQtyChar, 
            },
            { 
               $Type: 'UI.DataField', 
               Value: billRateChar, 
            },
            { 
               $Type: 'UI.DataField', 
               Value: billTotalChar, 
            },
            { 
               $Type: 'UI.DataField', 
               Value: payQtyChar, 
            },
            { 
               $Type: 'UI.DataField', 
               Value: payRateChar, 
            },
            { 
               $Type: 'UI.DataField', 
               Value: payTotalChar, 
            },
            { 
               $Type: 'UI.DataField', 
               Value: priceChar, 
            }
        ]
    }
);
annotate service.Vendor_VendorRemit with @(

  UI.LineItem #Vendor_VendorRemit: [
    { $Type: 'UI.DataField', Value: vendor },
    { $Type: 'UI.DataField', Value: vendorZR },
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  vendor,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : vendorZR,
        },
    },

  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Vendor_VendorRemit',
      ID    : 'Vendor_VendorRemit',
      Target : '@UI.FieldGroup#Vendor_VendorRemit'
    }
  ],

  UI.FieldGroup #Vendor_VendorRemit : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: vendor },
      { $Type: 'UI.DataField', Value: vendorZR },
    ]
  }

);



annotate service.CustomerEDIPartnerConfig with @(
    UI.LineItem #CustomerEDIPartnerConfig: [
        { $Type: 'UI.DataField', Value: customerNo },
        { $Type: 'UI.DataField', Value: materialGroup2 },
        { $Type: 'UI.DataField', Value: shiftDiffCustom },
        { $Type: 'UI.DataField', Value: shiftDiffUS },
        { $Type: 'UI.DataField', Value: shiftDiffCA },
        { $Type: 'UI.DataField', Value: refOrigInvoice }
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  customerNo,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : '',
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'CustomerEDIPartnerConfig',
            ID    : 'CustomerEDIPartnerConfig',
            Target : '@UI.FieldGroup#CustomerEDIPartnerConfig'
        }
    ],
    UI.FieldGroup #CustomerEDIPartnerConfig : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            { $Type: 'UI.DataField', Value: customerNo },
            { $Type: 'UI.DataField', Value: materialGroup2 },
            { $Type: 'UI.DataField', Value: shiftDiffCustom },
            { $Type: 'UI.DataField', Value: shiftDiffUS },
            { $Type: 'UI.DataField', Value: shiftDiffCA },
            { $Type: 'UI.DataField', Value: refOrigInvoice }
        ]
    }
);
annotate service.EdiShiftDiffForEmpSubGrp with @(

  UI.LineItem #EdiShiftDiffForEmpSubGrp: [
    { $Type: 'UI.DataField', Value: customerNo },
    { $Type: 'UI.DataField', Value: employeeSubGroup },
    { $Type: 'UI.DataField', Value: materialGroup2 },
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  customerNo,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : employeeSubGroup,
        },
    },


  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'EdiShiftDiffForEmpSubGrp',
      ID    : 'EdiShiftDiffForEmpSubGrp',
      Target : '@UI.FieldGroup#EdiShiftDiffForEmpSubGrp'
    }
  ],

  UI.FieldGroup #EdiShiftDiffForEmpSubGrp : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: customerNo },
      { $Type: 'UI.DataField', Value: employeeSubGroup },
      { $Type: 'UI.DataField', Value: materialGroup2 },
    ]
  }

);

annotate service.EdiShiftDiffForCanada with @(

  UI.LineItem #EdiShiftDiffForCanada: [
    { $Type: 'UI.DataField', Value: customerNo },
    { $Type: 'UI.DataField', Value: region },
    { $Type: 'UI.DataField', Value: materialNo },
    { $Type: 'UI.DataField', Value: shiftDifferential },
  ],

  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  customerNo,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : region,
        },
    },
  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'EdiShiftDiffForCanada',
      ID    : 'EdiShiftDiffForCanada',
      Target : '@UI.FieldGroup#EdiShiftDiffForCanada'
    }
  ],

  UI.FieldGroup #EdiShiftDiffForCanada : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: customerNo },
      { $Type: 'UI.DataField', Value: region },
      { $Type: 'UI.DataField', Value: materialNo },
      { $Type: 'UI.DataField', Value: shiftDifferential },
    ]
  }

);

annotate service.FGdefaultEmp with @(
    UI.LineItem #FGdefaultEmp: [
        { $Type: 'UI.DataField', Value: employee }
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  employee,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : '',
        },
    },
    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'FGdefaultEmp',
            ID     : 'FGdefaultEmp',
            Target : '@UI.FieldGroup#FGdefaultEmp'
        }
    ],

    UI.FieldGroup #FGdefaultEmp : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            { $Type: 'UI.DataField', Value: employee }
        ]
    }
);

annotate service.FGSiteCodeToAddressMapping with @(

  UI.LineItem #FGSiteCodeToAddressMapping: [
    { $Type: 'UI.DataField', Value: customerNo },
    { $Type: 'UI.DataField', Value: siteCodeName },
    { $Type: 'UI.DataField', Value: siteName },
    { $Type: 'UI.DataField', Value: siteAddress1 },
    { $Type: 'UI.DataField', Value: siteAddress2 },
    { $Type: 'UI.DataField', Value: city },
    { $Type: 'UI.DataField', Value: state },
    { $Type: 'UI.DataField', Value: zipCode },
    { $Type: 'UI.DataField', Value: country_code },
    { $Type: 'UI.DataField', Value: county },
    { $Type: 'UI.DataField', Value: taxJurisdiction }
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  customerNo,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : siteCodeName,
        },
    },


  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'FGSiteCodeToAddressMapping',
      ID    : 'FGSiteCodeToAddressMapping',
      Target : '@UI.FieldGroup#FGSiteCodeToAddressMapping'
    }
  ],

  UI.FieldGroup #FGSiteCodeToAddressMapping : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: customerNo },
      { $Type: 'UI.DataField', Value: siteCodeName },
      { $Type: 'UI.DataField', Value: siteName },
      { $Type: 'UI.DataField', Value: siteAddress1 },
      { $Type: 'UI.DataField', Value: siteAddress2 },
      { $Type: 'UI.DataField', Value: city },
      { $Type: 'UI.DataField', Value: state },
      { $Type: 'UI.DataField', Value: zipCode },
      { $Type: 'UI.DataField', Value: country_code },
      { $Type: 'UI.DataField', Value: county },
      { $Type: 'UI.DataField', Value: taxJurisdiction },
    ]
  }

);

annotate service.FGBusinessUnit with @(

  UI.LineItem #FGBusinessUnit: [
    { $Type: 'UI.DataField', Value: soldToParty },
    { $Type: 'UI.DataField', Value: businessCode },
    { $Type: 'UI.DataField', Value: businessUnitName },
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  soldToParty,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value :  businessCode,
        },
    },

  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'FGBusinessUnit',
      ID    : 'FGBusinessUnit',
      Target : '@UI.FieldGroup#FGBusinessUnit'
    }
  ],

  UI.FieldGroup #FGBusinessUnit : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: soldToParty },
      { $Type: 'UI.DataField', Value: businessCode },
      { $Type: 'UI.DataField', Value: businessUnitName },
    ]
  }

);

annotate service.FGCostCenter with @(

  UI.LineItem #FGCostCenter: [
    { $Type: 'UI.DataField', Value: soldToParty },
    { $Type: 'UI.DataField', Value: costCentreCode },
    { $Type: 'UI.DataField', Value: costCentreName },
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  soldToParty,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : costCentreCode,
        },
    },

  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'FGCostCenter',
      ID    : 'FGCostCenter',
      Target : '@UI.FieldGroup#FGCostCenter'
    }
  ],

  UI.FieldGroup #FGCostCenter : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: soldToParty },
      { $Type: 'UI.DataField', Value: costCentreCode },
      { $Type: 'UI.DataField', Value: costCentreName },
    ]
  }

);

annotate service.TravelCustomerPayTermByPOBox with @(

  UI.LineItem #TravelCustomerPayTermByPOBox : [
    { $Type: 'UI.DataField', Value: customerNo },
    { $Type: 'UI.DataField', Value: customerTerm },
    { $Type: 'UI.DataField', Value: poBox },
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  customerNo,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : customerTerm,
        },
    },

  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'TravelCustomerPayTermByPOBox',
      ID    : 'TravelCustomerPayTermByPOBox',
      Target : '@UI.FieldGroup#TravelCustomerPayTermByPOBox'
    }
  ],

  UI.FieldGroup #TravelCustomerPayTermByPOBox : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: customerNo },
      { $Type: 'UI.DataField', Value: customerTerm },
      { $Type: 'UI.DataField', Value: poBox },
    ]
  }

);

annotate service.TravelPayTermFeed with @(

  UI.LineItem #TravelPayTermFeed: [
    { $Type: 'UI.DataField', Value: paymentTerm },
    { $Type: 'UI.DataField', Value: netPaymentTerm },
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  paymentTerm,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : '',
        },
    },


  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'TravelPayTermFeed',
      ID    : 'TravelPayTermFeed',
      Target : '@UI.FieldGroup#TravelPayTermFeed'
    }
  ],

  UI.FieldGroup #TravelPayTermFeed : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: paymentTerm },
      { $Type: 'UI.DataField', Value: netPaymentTerm },
    ]
  }

);

annotate service.CustomFieldsToVC with @(

  UI.LineItem #CustomFieldsToVC : [
    { $Type: 'UI.DataField', Value: customValue },
    { $Type: 'UI.DataField', Value: description },
    { $Type: 'UI.DataField', Value: characteristicName },
    { $Type: 'UI.DataField', Value: fieldName },
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value :  customValue,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : '',
        },
    },
  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'CustomFieldsToVC',
      ID    : 'CustomFieldsToVC',
      Target : '@UI.FieldGroup#CustomFieldsToVC'
    }
  ],

  UI.FieldGroup #CustomFieldsToVC : {
    $Type: 'UI.FieldGroupType',
    Data: [
      { $Type: 'UI.DataField', Value: customValue },
      { $Type: 'UI.DataField', Value: description },
      { $Type: 'UI.DataField', Value: characteristicName },
      { $Type: 'UI.DataField', Value: fieldName },
    ]
  }

);

annotate service.SalesCondition with @(

  UI.LineItem #SalesCondition : [
    { 
        $Type: 'UI.DataField', 
        Value: salesOrganization 
    },
    { 
        $Type: 'UI.DataField', 
        Value: distributionChannel 
    },
    { 
        $Type: 'UI.DataField', 
        Value: division 
    },
    { 
        $Type: 'UI.DataField', 
        Value: custPricProcedure 
    },
    {  
        $Type: 'UI.DataField', 
        Value: pricingProcedure 
    },
    { 
        $Type: 'UI.DataField', 
        Value: conditionType 
    },
    
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : salesOrganization,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : distributionChannel,
        },
    },
  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'SalesCondition',
      ID    : 'SalesCondition',
      Target : '@UI.FieldGroup#SalesCondition'
    }
  ],

  UI.FieldGroup #SalesCondition : {
    $Type: 'UI.FieldGroupType',
    Data: [
        { 
            $Type: 'UI.DataField', 
            Value: salesOrganization 
        },
        { 
            $Type: 'UI.DataField', 
            Value: distributionChannel 
        },
        { 
            $Type: 'UI.DataField', 
            Value: division 
        },
        { 
            $Type: 'UI.DataField', 
            Value: custPricProcedure 
        },
        { 
            $Type: 'UI.DataField', 
            Value: pricingProcedure 
        },
        { 
            $Type: 'UI.DataField', 
            Value: conditionType 
        },
    ]
  }

);

annotate service.CustomerZJOB with @(

  UI.LineItem #CustomerZJOB : [
    { 
        $Type: 'UI.DataField', 
        Value: customerNo 
    } 
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : customerNo,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : '',
        },
    },
  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'CustomerZJOB',
      ID    : 'CustomerZJOB',
      Target : '@UI.FieldGroup#CustomerZJOB'
    }
  ],

  UI.FieldGroup #CustomerZJOB : {
    $Type: 'UI.FieldGroupType',
    Data: [
        { 
            $Type: 'UI.DataField', 
            Value: customerNo 
        }
    ]
  }
);

annotate service.Char_Usage_Details with @(

  UI.LineItem #Char_Usage_Details : [
    { 
        $Type: 'UI.DataField', 
        Value: application 
    },
    { 
        $Type: 'UI.DataField', 
        Value: charDescription 
    },
    { 
        $Type: 'UI.DataField', 
        Value: hasSequence 
    },
    { 
        $Type: 'UI.DataField', 
        Value: qtyChar 
    },
    {  
        $Type: 'UI.DataField', 
        Value: uom 
    },
    { 
        $Type: 'UI.DataField', 
        Value: rateChar 
    },
    { 
        $Type: 'UI.DataField', 
        Value: totalChar 
    },
    { 
        $Type: 'UI.DataField', 
        Value: vendorRate 
    },
    { 
        $Type: 'UI.DataField', 
        Value: deDescription 
    },
    
  ],
  UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : application,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : charDescription,
        },
    },
  UI.Facets : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Characteristic Usage Details',
      ID    : 'Char_Usage_Details',
      Target : '@UI.FieldGroup#Char_Usage_Details'
    }
  ],

  UI.FieldGroup #Char_Usage_Details : {
    $Type: 'UI.FieldGroupType',
    Data: [
        { 
            $Type: 'UI.DataField', 
            Value: application 
        },
        { 
            $Type: 'UI.DataField', 
            Value: charDescription 
        },
        { 
            $Type: 'UI.DataField', 
            Value: hasSequence 
        },
        { 
            $Type: 'UI.DataField', 
            Value: qtyChar 
        },
        {  
            $Type: 'UI.DataField', 
            Value: uom 
        },
        { 
            $Type: 'UI.DataField', 
            Value: rateChar 
        },
        { 
            $Type: 'UI.DataField', 
            Value: totalChar 
        },
        { 
            $Type: 'UI.DataField', 
            Value: vendorRate 
        },
        { 
            $Type: 'UI.DataField', 
            Value: deDescription 
        },
    ]
  }

);

