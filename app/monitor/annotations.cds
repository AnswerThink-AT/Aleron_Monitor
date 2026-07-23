using MonitorService as service from '../../srv/monitor-service';
using from '../../db/schema';


annotate service.Files with @(
    UI.CreateHidden                  : true,
    // UI.UpdateHidden                : (status.code != 1),
    UI.UpdateHidden                  : false,
    UI.SelectionFields               : [
        ID,
        status_code,
        interfaceType_ID,
        createdAt,
        createdBy
    ],
    UI.SelectionPresentationVariant  : {
        $Type              : 'UI.SelectionPresentationVariantType',
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [
                {
                    $Type       : 'UI.SelectOptionType',
                    PropertyName: status_code,
                    Ranges      : [{
                        $Type : 'UI.SelectionRangeType',
                        Sign  : #I,
                        Option: #EQ,
                        Low   : 1,
                    }, ],
                },
                {
                    $Type       : 'UI.SelectOptionType',
                    PropertyName: status_code,
                    Ranges      : [{
                        $Type : 'UI.SelectionRangeType',
                        Sign  : #I,
                        Option: #EQ,
                        Low   : 2,
                    }, ],
                },
                {
                    $Type       : 'UI.SelectOptionType',
                    PropertyName: status_code,
                    Ranges      : [{
                        $Type : 'UI.SelectionRangeType',
                        Sign  : #I,
                        Option: #EQ,
                        Low   : 4,
                    }, ],
                },
                {
                    $Type       : 'UI.SelectOptionType',
                    PropertyName: status_code,
                    Ranges      : [{
                        $Type : 'UI.SelectionRangeType',
                        Sign  : #I,
                        Option: #EQ,
                        Low   : 6,
                    }, ],
                },
            ]
        },
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem',
            ],
            SortOrder     : [{
                $Type     : 'Common.SortOrderType',
                Property  : createdAt,
                Descending: true,
            }, ]
        },
    },
    UI.LineItem                      : [
        {
            $Type: 'UI.DataField',
            Value: ID,
        },
        {
            $Type       : 'UI.DataField',
            Criticality : (status.code = 4 ? 1 : (status.code = 1 ? 5 : status.code)),
            Label       : '{i18n>status}',
            Value       : status.name,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>type}',
            Value: interfaceType.name,
        },
        {
            $Type: 'UI.DataField',
            Value: recordsCount,
        },
        {
            $Type                : 'UI.DataField',
            Value                : source,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '5rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedBy,
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedAt,
        },
    ],
    UI.HeaderInfo                    : {
        TypeName      : '{i18n>filesSingular}',
        TypeNamePlural: '{i18n>filesPlural}',
        Title         : {
            $Type: 'UI.DataField',
            Value: name,
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: ID,
        },
        ImageUrl      : 'sap-icon://document-text',
    },
    UI.HeaderFacets                  : [
        {
            $Type : 'UI.ReferenceFacet',
            Target: '@UI.FieldGroup#FileInfo',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Target: '@UI.FieldGroup#RecordOverview',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Target: '@UI.FieldGroup#FileManaged',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Target: '@UI.DataPoint#FileStatus',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Process Level Counts',
            Target: '@UI.FieldGroup#ProcessLevelCounts'
        }
    ],

    // Header relevant facets
    UI.FieldGroup #FileInfo          : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>type}',
                Value: interfaceType.name,
            },
            {
                $Type: 'UI.DataField',
                Value: reprocessed,
            },
            {
                $Type: 'UI.DataField',
                Value: source
            },
        ]
    },
    UI.FieldGroup #RecordOverview    : {Data: [
        {
            $Type: 'UI.DataField',
            Label: '{i18n>processLevel}',
            Value: processLevel.name,
        },
        {
            $Type: 'UI.DataField',
            Value: recordsCount,
        },
    ]},
    UI.FieldGroup #FileManaged       : {Data: [
        {
            $Type: 'UI.DataField',
            Value: createdAt,
        },
        {
            $Type: 'UI.DataField',
            Value: createdBy,
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedAt,
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedBy,
        },
    ]},
    UI.DataPoint #FileStatus         : {
        Value       : status.name,
        Title       : '{i18n>status}',
        Criticality : (status.code = 4 ? 1 : (status.code = 1 ? 5 : (status.code = 6 ? 2 : status.code))),
    },
    UI.FieldGroup #ProcessLevelCounts: {Data: [{
        $Type: 'UI.DataField',
        Value: processLevelCounts,
    }]},


    // Associations facets
    UI.Facets                        : [
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Times',
            ID           : 'Times',
            Target       : 'to_Times/@UI.PresentationVariant#Times',
            ![@UI.Hidden]: showFacet_3
        // ![@UI.Hidden]: (interfaceType.ID != '3')
        },
        {
            $Type        : 'UI.ReferenceFacet',
            ID           : 'WorkOrders',
            Label        : 'VMS Work Orders',
            Target       : 'to_WorkOrders/@UI.PresentationVariant#WorkOrders',
            ![@UI.Hidden]: showFacet_S
        // ![@UI.Hidden]: (interfaceType.ID != 'S')
        },
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : '{i18n>employeeRecord}',
            ID           : 'EmployeeRecords',
            Target       : 'to_EmployeeHires/@UI.PresentationVariant#EmployeeRecords',
            ![@UI.Hidden]: showFacet_T
        // ![@UI.Hidden]: (interfaceType.ID != 'T')
        },
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : '{i18n>employeeRecord}',
            ID           : 'StaffRecords',
            Target       : 'to_StaffHires/@UI.PresentationVariant#StaffRecords',
            ![@UI.Hidden]: showFacet_U
        // ![@UI.Hidden]: (interfaceType.ID != 'U')
        },

        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'MS Work Orders',
            ID           : 'WorkOrdersWN',
            Target       : 'to_WorkOrders_WN/@UI.PresentationVariant#WorkOrdersWN',
            ![@UI.Hidden]: showFacet_1
        // ![@UI.Hidden]: (interfaceType.ID != '1')
        },

        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Work Orders FG',
            ID           : 'WorkOrdersFG',
            Target       : 'to_WorkOrders_FG/@UI.PresentationVariant#WorkOrdersFG',
            // ![@UI.Hidden]: {$edmJson: {$Ne: [{$Path: 'interfaceType/ID'}, 'M']}}
            ![@UI.Hidden]: showFacet_M
        // ![@UI.Hidden]: (interfaceType != 'M')
        },

        // term 4 interface
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Terminations',
            ID           : 'Terminations',
            Target       : 'to_Terminations/@UI.PresentationVariant#Terminations',
            ![@UI.Hidden]: showFacet_4
        // ![@UI.Hidden]: (interfaceType.ID != '4')
        },

        //interface N FG Time Invoices
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'FG Time Invoices',
            ID           : 'FgTimeInvoices',
            Target       : 'to_Fg_Invoices/@UI.PresentationVariant#FgTimeInvoices',
            ![@UI.Hidden]: showFacet_N
        // ![@UI.Hidden]: (interfaceType.ID != 'N')
        },

        // D Credit_Rebill interface
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Credit_Rebill',
            ID           : 'Credit_Rebill',
            Target       : 'to_Credit_Rebill/@UI.PresentationVariant#Credit_Rebill',
            ![@UI.Hidden]: showFacet_D
        // ![@UI.Hidden]: (interfaceType.ID != 'D')
        },

        //  Q Fg_Credit_Rebill interface
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Fg_Credit_Rebill',
            ID           : 'Fg_Credit_Rebill',
            Target       : 'to_Fg_Credit_Rebill/@UI.PresentationVariant#Fg_Credit_Rebill',
            ![@UI.Hidden]: showFacet_Q
        // ![@UI.Hidden]: (interfaceType.ID != 'Q')
        },
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Other Billables',
            ID           : 'OtherBillables',
            Target       : 'to_OtherBillables/@UI.PresentationVariant#OtherBillables',
            ![@UI.Hidden]: showFacet_O
        // ![@UI.Hidden]: (interfaceType.ID != 'O')
        },

        // G Bonus interface
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Bonus',
            ID           : 'Bonus',
            Target       : 'to_Bonus/@UI.PresentationVariant#Bonus',
            ![@UI.Hidden]: showFacet_G
        // ![@UI.Hidden]: (interfaceType.ID != 'G')
        },

        // Interface C
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Staff Time',
            ID           : 'StaffTime',
            Target       : 'to_Times/@UI.PresentationVariant#StaffTime',
            ![@UI.Hidden]: showFacet_C
        // ![@UI.Hidden]: (interfaceType.ID != 'C')
        },
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'SowScWo',
            ID           : 'SowScWo',
            Target       : 'to_SowScWo/@UI.PresentationVariant#SowScWo',
            ![@UI.Hidden]: showFacet_E
        //  ![@UI.Hidden]: (interfaceType.ID != 'E')
        },
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'SowScInvoice',
            ID           : 'SowScInvoice',
            Target       : 'to_SowScInvoice/@UI.PresentationVariant#SowScInvoice',
            ![@UI.Hidden]: showFacet_F
        //  ![@UI.Hidden]: (interfaceType.ID != 'F')
        },
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Travel',
            ID           : 'Travel',
            Target       : 'to_Travel/@UI.PresentationVariant#Travel',
            ![@UI.Hidden]: showFacet_2
        //  ![@UI.Hidden]: (interfaceType.ID != '2')
        },
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : 'Drug_Background_Check',
            ID           : 'Drug_Background_Check',
            Target       : 'to_Drug_Background_Check/@UI.PresentationVariant#Drug_Background_Check',
            ![@UI.Hidden]: showFacet_A
        //  ![@UI.Hidden]: (interfaceType.ID != 'A')
        },
    ],


) {
    type @UI.HiddenFilter;
};


annotate service.InterfaceTypes {
    ID @UI.Hidden;
};

annotate service.WorkOrders with @(
    UI.CreateHidden                   : true,
    UI.LineItem #WorkOrders           : {$value: [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon,
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: personnelNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: projectNumberSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: soldToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: billToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: workOrderWN,
        },
        {
            $Type: 'UI.DataField',
            Value: salesOffice,
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentType,
        },
        {
            $Type: 'UI.DataField',
            Value: materialNo,
        },
        {
            $Type: 'UI.DataField',
            Value: remitToVendor,
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code,
        },
        {
            $Type: 'UI.DataField',
            Value: endDate,
        },
        {
            $Type: 'UI.DataField',
            Value: beginDate,
        },
        {
            $Type: 'UI.DataField',
            Value: ssn,
        },
        {
            $Type: 'UI.DataField',
            Value: workLocation,
            Label: 'workLocation',
        },
        {
            $Type: 'UI.DataField',
            Value: doorNo,
        },
        {
            $Type: 'UI.DataField',
            Value: street,
        },
        {
            $Type: 'UI.DataField',
            Value: city,
        },
        {
            $Type: 'UI.DataField',
            Value: region,
        },
        {
            $Type: 'UI.DataField',
            Value: country_code,
        },
        {
            $Type: 'UI.DataField',
            Value: postalCode,
        },
        {
            $Type: 'UI.DataField',
            Value: jobTemplate,
            Label: 'jobTemplate',
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: actionType,
        },
        {
            $Type: 'UI.DataField',
            Value: lastName,
        },
        {
            $Type: 'UI.DataField',
            Value: firstName,
        },
        {
            $Type: 'UI.DataField',
            Value: middleName,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorPayRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorOTPayRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorDTPayRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorPayRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorOTPayRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorDTPayRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorPayRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorOTPayRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorDTPayRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: laborPurchaseOrder,
        },
        {
            $Type: 'UI.DataField',
            Value: laborPODate,
        },
        {
            $Type: 'UI.DataField',
            Value: attentionLine,
        },
        {
            $Type: 'UI.DataField',
            Value: distributionEmail,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName15,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue15,

        },
    ],
    // ![@UI.Criticality]: criticality,
    },
    UI.PresentationVariant #WorkOrders: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#WorkOrders'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq,
            Descending: false
        }]
    }
);

annotate service.Times with @(

    UI.CreateHidden                  : true,
    UI.LineItem #Times               : {$value: [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon,
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: invoiceNoWN
        },
        {
            $Type: 'UI.DataField',
            Value: orderNo
        },
        {
            $Type: 'UI.DataField',
            Value: purchaseDocumentNo
        },
        {
            $Type: 'UI.DataField',
            Value: salesItemNo
        },
        {
            $Type: 'UI.DataField',
            Value: term
        },
        {
            $Type: 'UI.DataField',
            Value: employeeNo
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode
        },
        {
            $Type: 'UI.DataField',
            Value: additionalDayOfWork
        },
    ],
    // ![@UI.Criticality]: criticality,
    },
    UI.PresentationVariant #Times    : {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#Times'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    },
    UI.LineItem #StaffTime           : {$value: [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithoutIcon,
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: invoiceNoWN
        },
        {
            $Type: 'UI.DataField',
            Value: orderNo
        },
        {
            $Type: 'UI.DataField',
            Value: purchaseDocumentNo
        },
        {
            $Type: 'UI.DataField',
            Value: salesItemNo
        },
        {
            $Type: 'UI.DataField',
            Value: term
        },
        {
            $Type: 'UI.DataField',
            Value: employeeNo
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode
        },
    ],
    // ![@UI.Criticality]: criticality,
    },

    UI.PresentationVariant #StaffTime: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#StaffTime'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

annotate service.EmployeeHires with @(
    UI.LineItem #EmployeeRecords           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon,
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: personnelNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: projectNumberSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: file_ID,
        },
        {
            $Type: 'UI.DataField',
            Value: recordCountry_code,
        },
        {
            $Type: 'UI.DataField',
            Value: recordIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: beginDate,
        },
        {
            $Type: 'UI.DataField',
            Value: actionIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: descShort,
        },
        {
            $Type: 'UI.DataField',
            Value: descLong,
        },
        {
            $Type: 'UI.DataField',
            Value: orgUnit,
        },
        {
            $Type: 'UI.DataField',
            Value: soldToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: billToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: wnWork,
        },
        {
            $Type: 'UI.DataField',
            Value: managerEmail,
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode,
        },
        {
            $Type: 'UI.DataField',
            Value: personnelArea,
        },
        {
            $Type: 'UI.DataField',
            Value: personnelSubarea,
        },
        {
            $Type: 'UI.DataField',
            Value: payrollArea,
        },
        {
            $Type: 'UI.DataField',
            Value: lastName,
        },
        {
            $Type: 'UI.DataField',
            Value: firstName,
        },
        {
            $Type: 'UI.DataField',
            Value: middleName,
        },
        {
            $Type: 'UI.DataField',
            Value: ssn,
        },
        {
            $Type: 'UI.DataField',
            Value: dateOfBirth,
        },
        {
            $Type: 'UI.DataField',
            Value: gender,
        },
        {
            $Type: 'UI.DataField',
            Value: maritalStatus,
        },
        {
            $Type: 'UI.DataField',
            Value: addressLine1,
        },
        {
            $Type: 'UI.DataField',
            Value: addressLine2,
        },
        {
            $Type: 'UI.DataField',
            Value: homeCity,
        },
        {
            $Type: 'UI.DataField',
            Value: homeCounty,
        },
        {
            $Type: 'UI.DataField',
            Value: homeRegion,
        },
        {
            $Type: 'UI.DataField',
            Value: homePostalCode,
        },
        {
            $Type: 'UI.DataField',
            Value: homeLocation_code,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftRGFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftOTFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftDTFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftRGSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftOTSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftDTSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftRGThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftOTThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftDTThird,
        },
        {
            $Type: 'UI.DataField',
            Value: weeklySalary,
        },
        {
            $Type: 'UI.DataField',
            Value: biWeeklySalary,
        },
        {
            $Type: 'UI.DataField',
            Value: monthlySalary,
        },
        {
            $Type: 'UI.DataField',
            Value: dailyRate,
        },
        {
            $Type: 'UI.DataField',
            Value: residentTaxAreaState,
        },
        {
            $Type: 'UI.DataField',
            Value: workTaxAreaState,
        },
        {
            $Type: 'UI.DataField',
            Value: employeeEmail,
        },
        {
            $Type: 'UI.DataField',
            Value: payroll,
        },
        {
            $Type: 'UI.DataField',
            Value: recruiterEmployeeNo,
        },
        {
            $Type: 'UI.DataField',
            Value: employeeResponsible,
        },
        {
            $Type: 'UI.DataField',
            Value: workNexusIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo,
        },
        {
            $Type: 'UI.DataField',
            Value: workOrderDoc,
        },
        {
            $Type: 'UI.DataField',
            Value: salesOffice,
        },
        {
            $Type: 'UI.DataField',
            Value: material,
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code,
        },
        {
            $Type: 'UI.DataField',
            Value: workLocation,
        },
        {
            $Type: 'UI.DataField',
            Value: doorNo,
        },
        {
            $Type: 'UI.DataField',
            Value: street,
        },
        {
            $Type: 'UI.DataField',
            Value: county,
        },
        {
            $Type: 'UI.DataField',
            Value: city,
        },
        {
            $Type: 'UI.DataField',
            Value: region,
        },
        {
            $Type: 'UI.DataField',
            Value: country_code,
        },
        {
            $Type: 'UI.DataField',
            Value: postalCode,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: monthlySalary2,
        },
        {
            $Type: 'UI.DataField',
            Value: dailyRate2,
        },
        {
            $Type: 'UI.DataField',
            Value: workerCompState,
        },
        {
            $Type: 'UI.DataField',
            Value: workerCompCode,
        },
        {
            $Type: 'UI.DataField',
            Value: markupTime,
        },
        {
            $Type: 'UI.DataField',
            Value: markupOT,
        },
        {
            $Type: 'UI.DataField',
            Value: markupDT,
        },
    ],
    UI.PresentationVariant #EmployeeRecords: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#EmployeeRecords'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);


annotate service.StaffHires with @(
    UI.LineItem #StaffRecords           : [

        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon,
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: personnelNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: projectNumberSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: file_ID,
        },
        {
            $Type: 'UI.DataField',
            Value: recordCountry_code,
        },
        {
            $Type: 'UI.DataField',
            Value: recordIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: beginDate,
        },
        {
            $Type: 'UI.DataField',
            Value: actionIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: descShort,
        },
        {
            $Type: 'UI.DataField',
            Value: descLong,
        },
        {
            $Type: 'UI.DataField',
            Value: orgUnit,
        },
        {
            $Type: 'UI.DataField',
            Value: soldToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: billToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: wnWork,
        },
        {
            $Type: 'UI.DataField',
            Value: managerEmail,
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode,
        },
        {
            $Type: 'UI.DataField',
            Value: personnelArea,
        },
        {
            $Type: 'UI.DataField',
            Value: personnelSubarea,
        },
        {
            $Type: 'UI.DataField',
            Value: payrollArea,
        },
        {
            $Type: 'UI.DataField',
            Value: lastName,
        },
        {
            $Type: 'UI.DataField',
            Value: firstName,
        },
        {
            $Type: 'UI.DataField',
            Value: middleName,
        },
        {
            $Type: 'UI.DataField',
            Value: ssn,
        },
        {
            $Type: 'UI.DataField',
            Value: dateOfBirth,
        },
        {
            $Type: 'UI.DataField',
            Value: gender,
        },
        {
            $Type: 'UI.DataField',
            Value: maritalStatus,
        },
        {
            $Type: 'UI.DataField',
            Value: addressLine1,
        },
        {
            $Type: 'UI.DataField',
            Value: addressLine2,
        },
        {
            $Type: 'UI.DataField',
            Value: homeCity,
        },
        {
            $Type: 'UI.DataField',
            Value: homeCounty,
        },
        {
            $Type: 'UI.DataField',
            Value: homeRegion,
        },
        {
            $Type: 'UI.DataField',
            Value: homePostalCode,
        },
        {
            $Type: 'UI.DataField',
            Value: homeLocation_code,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftRGFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftOTFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftDTFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftRGSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftOTSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftDTSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftRGThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftOTThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftDTThird,
        },
        {
            $Type: 'UI.DataField',
            Value: weeklySalary,
        },
        {
            $Type: 'UI.DataField',
            Value: biWeeklySalary,
        },
        {
            $Type: 'UI.DataField',
            Value: monthlySalary,
        },
        {
            $Type: 'UI.DataField',
            Value: dailyRate,
        },
        {
            $Type: 'UI.DataField',
            Value: residentTaxAreaState,
        },
        {
            $Type: 'UI.DataField',
            Value: workTaxAreaState,
        },
        {
            $Type: 'UI.DataField',
            Value: employeeEmail,
        },
        {
            $Type: 'UI.DataField',
            Value: payroll,
        },
        {
            $Type: 'UI.DataField',
            Value: recruiterEmployeeNo,
        },
        {
            $Type: 'UI.DataField',
            Value: employeeResponsible,
        },
        {
            $Type: 'UI.DataField',
            Value: workNexusIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo,
        },
        {
            $Type: 'UI.DataField',
            Value: workOrderDoc,
        },
        {
            $Type: 'UI.DataField',
            Value: salesOffice,
        },
        {
            $Type: 'UI.DataField',
            Value: material,
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code,
        },
        {
            $Type: 'UI.DataField',
            Value: workLocation,
        },
        {
            $Type: 'UI.DataField',
            Value: doorNo,
        },
        {
            $Type: 'UI.DataField',
            Value: street,
        },
        {
            $Type: 'UI.DataField',
            Value: county,
        },
        {
            $Type: 'UI.DataField',
            Value: city,
        },
        {
            $Type: 'UI.DataField',
            Value: region,
        },
        {
            $Type: 'UI.DataField',
            Value: country_code,
        },
        {
            $Type: 'UI.DataField',
            Value: postalCode,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: monthlySalary2,
        },
        {
            $Type: 'UI.DataField',
            Value: dailyRate2,
        },
        {
            $Type: 'UI.DataField',
            Value: workerCompState,
        },
        {
            $Type: 'UI.DataField',
            Value: workerCompCode,
        },
        {
            $Type: 'UI.DataField',
            Value: markupTime,
        },
        {
            $Type: 'UI.DataField',
            Value: markupOT,
        },
        {
            $Type: 'UI.DataField',
            Value: markupDT,
        },

    ],
    UI.PresentationVariant #StaffRecords: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#StaffRecords'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

annotate service.WorkOrders_WN with @(
    UI.LineItem #WorkOrdersWN           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon,
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: personnelNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: projectNumberSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode,
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo,
        },
        {
            $Type: 'UI.DataField',
            Value: soldToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: billToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: workOrderWN,
        },
        {
            $Type: 'UI.DataField',
            Value: salesOffice,
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentType,
        },
        {
            $Type: 'UI.DataField',
            Value: materialNo,
        },
        {
            $Type: 'UI.DataField',
            Value: remitToVendor,
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code,
        },
        {
            $Type: 'UI.DataField',
            Value: fedTax,
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocItem,
        },
        {
            $Type: 'UI.DataField',
            Value: lineItemRate,
        },
        {
            $Type: 'UI.DataField',
            Value: itemQuantity,
        },
        {
            $Type: 'UI.DataField',
            Value: baseUnit,
        },
        {
            $Type: 'UI.DataField',
            Value: poDesc,
        },
        {
            $Type: 'UI.DataField',
            Value: lineItemDesc,
        },
        {
            $Type: 'UI.DataField',
            Value: endDate,
        },
        {
            $Type: 'UI.DataField',
            Value: beginDate,
        },
        {
            $Type: 'UI.DataField',
            Value: ssn,
        },
        {
            $Type: 'UI.DataField',
            Value: fundIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: custPurOrderTotal,
        },
        {
            $Type: 'UI.DataField',
            Value: vendPurOrderTotal,
        },
        {
            $Type: 'UI.DataField',
            Value: workLocation,
        },
        {
            $Type: 'UI.DataField',
            Value: doorNo,
        },
        {
            $Type: 'UI.DataField',
            Value: street,
        },
        {
            $Type: 'UI.DataField',
            Value: city,
        },
        {
            $Type: 'UI.DataField',
            Value: region,
        },
        {
            $Type: 'UI.DataField',
            Value: country_code,
        },
        {
            $Type: 'UI.DataField',
            Value: postalCode,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerOTBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftCustomerDTBillRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: actionType,
        },
        {
            $Type: 'UI.DataField',
            Value: lastName,
        },
        {
            $Type: 'UI.DataField',
            Value: firstName,
        },
        {
            $Type: 'UI.DataField',
            Value: middleName,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorPayRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorOTPayRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorDTPayRateFirst,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorPayRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorOTPayRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorDTPayRateSecond,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorPayRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorOTPayRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: shiftVendorDTPayRateThird,
        },
        {
            $Type: 'UI.DataField',
            Value: laborPurchaseOrder,
        },
        {
            $Type: 'UI.DataField',
            Value: laborPODate,
        },
        {
            $Type: 'UI.DataField',
            Value: attentionLine,
        },
        {
            $Type: 'UI.DataField',
            Value: distributionEmail,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName15,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue15,
        },
    ],
    UI.PresentationVariant #WorkOrdersWN: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#WorkOrdersWN'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

annotate service.WorkOrders_FG with @(
    UI.LineItem #WorkOrdersFG           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon,
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: jobSeekerId,
        },
        {
            $Type: 'UI.DataField',
            Value: workerId,
        },
        {
            $Type: 'UI.DataField',
            Value: personId,
        },
        {
            $Type: 'UI.DataField',
            Value: securityId,
        },
        {
            $Type: 'UI.DataField',
            Value: woStatus,
        },
        {
            $Type: 'UI.DataField',
            Value: firstName,
        },
        {
            $Type: 'UI.DataField',
            Value: lastName,
        },
        {
            $Type: 'UI.DataField',
            Value: workerEmail,
        },
        {
            $Type: 'UI.DataField',
            Value: jobPostingTitle,
        },
        {
            $Type: 'UI.DataField',
            Value: workOrderId,
        },
        {
            $Type: 'UI.DataField',
            Value: owner,
        },
        {
            $Type: 'UI.DataField',
            Value: ownerId,
        },
        {
            $Type: 'UI.DataField',
            Value: businessUnitCode,
        },
        {
            $Type: 'UI.DataField',
            Value: businessUnitName,
        },
        {
            $Type: 'UI.DataField',
            Value: vendorCode,
        },
        {
            $Type: 'UI.DataField',
            Value: vendorName,
        },
        {
            $Type: 'UI.DataField',
            Value: buyerCode,
        },
        {
            $Type: 'UI.DataField',
            Value: remitTo,
        },
        {
            $Type: 'UI.DataField',
            Value: costCenterName,
        },
        {
            $Type: 'UI.DataField',
            Value: costCenterCode,
        },
        {
            $Type: 'UI.DataField',
            Value: bilPerDiem,
        },
        {
            $Type: 'UI.DataField',
            Value: startDate,
        },
        {
            $Type: 'UI.DataField',
            Value: endDate,
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code,
        },
        {
            $Type: 'UI.DataField',
            Value: siteCode,
        },
        {
            $Type: 'UI.DataField',
            Value: siteName,
        },
        {
            $Type: 'UI.DataField',
            Value: managerName,
        },
        {
            $Type: 'UI.DataField',
            Value: purchaseOrder,
        },
        {
            $Type: 'UI.DataField',
            Value: wnContract,
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode,
        },
        {
            $Type: 'UI.DataField',
            Value: vendor,
        },
        {
            $Type: 'UI.DataField',
            Value: ssContract,
        },
        {
            $Type: 'UI.DataField',
            Value: billTo,
        },
        {
            $Type: 'UI.DataField',
            Value: soldTo,
        },
        {
            $Type: 'UI.DataField',
            Value: matnr,
        },
        {
            $Type: 'UI.DataField',
            Value: salesOffice,
        }
    ],
    UI.PresentationVariant #WorkOrdersFG: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#WorkOrdersFG'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);


// term 4 interface
annotate service.Terminations with @(
    UI.LineItem #Terminations           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: term
        },
        {
            $Type: 'UI.DataField',
            Value: employeeNo
        },
        {
            $Type: 'UI.DataField',
            Value: endDate
        },
        {
            $Type: 'UI.DataField',
            Value: actionReason
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentType
        },
        {
            $Type: 'UI.DataField',
            Value: workOrderWN
        }
    ],
    UI.PresentationVariant #Terminations: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#Terminations'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

// Credit_Rebill D interface
annotate service.Credit_Rebill with @(
    UI.LineItem #Credit_Rebill           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: wnInvoiceNo
        },
        {
            $Type: 'UI.DataField',
            Value: wnWorkOrderNo
        },
        {
            $Type: 'UI.DataField',
            Value: woType
        },
        {
            $Type: 'UI.DataField',
            Value: wnInvalidationInvNo
        }
    ],
    UI.PresentationVariant #Credit_Rebill: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#Credit_Rebill'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);


// Fg_Credit_Rebill Q interface
annotate service.Fg_Credit_Rebill with @(
    UI.LineItem #Fg_Credit_Rebill           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: wokerID
        },
        {
            $Type: 'UI.DataField',
            Value: fgInvoiceID
        },
        {
            $Type: 'UI.DataField',
            Value: fgInvoicetype
        },
        {
            $Type: 'UI.DataField',
            Value: fgInvoiceLinetype
        },
        {
            $Type: 'UI.DataField',
            Value: invSubmissionDate
        },
        {
            $Type: 'UI.DataField',
            Value: fgSiteCode
        },
        {
            $Type: 'UI.DataField',
            Value: invLineAmount
        },
        {
            $Type: 'UI.DataField',
            Value: invLineAdjAmount
        },
        {
            $Type: 'UI.DataField',
            Value: curreny
        },
        {
            $Type: 'UI.DataField',
            Value: firstName
        },
        {
            $Type: 'UI.DataField',
            Value: lastName
        },
        {
            $Type: 'UI.DataField',
            Value: businessCode
        },
        {
            $Type: 'UI.DataField',
            Value: costCenterCode
        },
        {
            $Type: 'UI.DataField',
            Value: costCenterName
        },
        {
            $Type: 'UI.DataField',
            Value: fgTaskCode
        },
        {
            $Type: 'UI.DataField',
            Value: fgTaskName
        },
        {
            $Type: 'UI.DataField',
            Value: glAccount
        },
        {
            $Type: 'UI.DataField',
            Value: stHours
        },
        {
            $Type: 'UI.DataField',
            Value: otHours
        },
        {
            $Type: 'UI.DataField',
            Value: dtHours
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillRateST
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillRateOt
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillRateDt
        },
        {
            $Type: 'UI.DataField',
            Value: fgWorkOrderID
        },
        {
            $Type: 'UI.DataField',
            Value: timesheetID
        },
        {
            $Type: 'UI.DataField',
            Value: parentTimesheetID
        },
        {
            $Type: 'UI.DataField',
            Value: fgInvoiceOrgID
        },
        {
            $Type: 'UI.DataField',
            Value: revision
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetStatus
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetStartDate
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetEndDate
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetApprovedDate
        },
        {
            $Type: 'UI.DataField',
            Value: quantity
        },
        {
            $Type: 'UI.DataField',
            Value: contractNoSS
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetEntryDate
        },
        {
            $Type: 'UI.DataField',
            Value: supplierPayRateST
        },
        {
            $Type: 'UI.DataField',
            Value: supplierPayRateOT
        },
        {
            $Type: 'UI.DataField',
            Value: supplierPayRateDT
        },
        {
            $Type: 'UI.DataField',
            Value: contractNoWN
        },
        // {
        //     $Type: 'UI.DataField',
        //     Value: corderNo
        // },
        {
            $Type: 'UI.DataField',
            Value: personnelNo
        },
        {
            $Type: 'UI.DataField',
            Value: fgGLCustomerCode
        },
    ],
    UI.PresentationVariant #Fg_Credit_Rebill: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#Fg_Credit_Rebill'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

annotate service.OtherBillables with @(
    UI.LineItem #OtherBillables           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}',
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: term
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: wnInvoiceNo
        },
        {
            $Type: 'UI.DataField',
            Value: sapEmployeeNo
        },
        {
            $Type: 'UI.DataField',
            Value: wnWorkOrder
        },
        {
            $Type: 'UI.DataField',
            Value: woType
        },
        {
            $Type: 'UI.DataField',
            Value: otherBillableType
        },
        {
            $Type: 'UI.DataField',
            Value: internalOrder
        },
        {
            $Type: 'UI.DataField',
            Value: weekEndDate
        },
        {
            $Type: 'UI.DataField',
            Value: itemQuantity
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillDate
        },
        {
            $Type: 'UI.DataField',
            Value: vendorPayDate
        },
        {
            $Type: 'UI.DataField',
            Value: currency
        },
        {
            $Type: 'UI.DataField',
            Value: customerPoNoLabor
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName15,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue15,
        },


    ],
    UI.PresentationVariant #OtherBillables: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#OtherBillables'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

// Bonus G interface
annotate service.Bonus with @(
    UI.LineItem #Bonus           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}'
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: wnInvoiceNo
        },
        {
            $Type: 'UI.DataField',
            Value: sapEmployeeNo
        },
        {
            $Type: 'UI.DataField',
            Value: wnWorkOrder
        },
        {
            $Type: 'UI.DataField',
            Value: woType
        },
        {
            $Type: 'UI.DataField',
            Value: internalOrder
        },
        {
            $Type: 'UI.DataField',
            Value: endDate
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillRate
        },
        {
            $Type: 'UI.DataField',
            Value: vendorPayRate
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code
        },
        {
            $Type: 'UI.DataField',
            Value: customerPO
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName15,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue15,
        }

    ],
    UI.PresentationVariant #Bonus: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#Bonus'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

annotate service.SowScWo with @(
    UI.LineItem #SowScWo           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}'
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentNoSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: projectNumberSAP,
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode,
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo,
        },
        {
            $Type: 'UI.DataField',
            Value: soldToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: billToParty,
        },
        {
            $Type: 'UI.DataField',
            Value: workOrderWN,
        },
        {
            $Type: 'UI.DataField',
            Value: salesOffice,
        },
        {
            $Type: 'UI.DataField',
            Value: custPurOrder,
        },
        {
            $Type: 'UI.DataField',
            Value: 'beginDate',
        },
        {
            $Type: 'UI.DataField',
            Value: endDate,
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code,
        },
        {
            $Type: 'UI.DataField',
            Value: materialNo,
        },
        {
            $Type: 'UI.DataField',
            Value: workLocation,
        },
        {
            $Type: 'UI.DataField',
            Value: doorNo,
        },
        {
            $Type: 'UI.DataField',
            Value: street,
        },
        {
            $Type: 'UI.DataField',
            Value: city,
        },
        {
            $Type: 'UI.DataField',
            Value: region,
        },
        {
            $Type: 'UI.DataField',
            Value: country_code,
        },
        {
            $Type: 'UI.DataField',
            Value: postalCode,
        },
        {
            $Type: 'UI.DataField',
            Value: poDesc,
        },
        {
            $Type: 'UI.DataField',
            Value: remitToVendor,
        },
        {
            $Type: 'UI.DataField',
            Value: custPurOrderTotal,
        },
        {
            $Type: 'UI.DataField',
            Value: attentionLine,
        },
        {
            $Type: 'UI.DataField',
            Value: distributionEmail,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName15,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue15,
        }
    ],
    UI.PresentationVariant #SowScWo: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#SowScWo'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

annotate service.SowScInvoice with @(
    UI.LineItem #SowScInvoice           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}'
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo,
        },
        {
            $Type: 'UI.DataField',
            Value: wnInvoiceNo,
        },
        {
            $Type: 'UI.DataField',
            Value: internalOrder,
        },
        {
            $Type: 'UI.DataField',
            Value: wnWorkOrder,
        },
        {
            $Type: 'UI.DataField',
            Value: beginDate,
        },
        {
            $Type: 'UI.DataField',
            Value: endDate,
        },
        {
            $Type: 'UI.DataField',
            Value: materialNo,
        },
        {
            $Type: 'UI.DataField',
            Value: materialDesc,
        },
        {
            $Type: 'UI.DataField',
            Value: itemQuantity,
        },
        {
            $Type: 'UI.DataField',
            Value: purchasingUOM,
        },
        {
            $Type: 'UI.DataField',
            Value: custLineItemUOM,
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillRate,
        },
        {
            $Type: 'UI.DataField',
            Value: customerTotal,
        },
        {
            $Type: 'UI.DataField',
            Value: wnVendorTaxAmount,
        },
        {
            $Type: 'UI.DataField',
            Value: custPurchaseOrder,
        },
        {
            $Type: 'UI.DataField',
            Value: custPoLineItemNo,
        },
        {
            $Type: 'UI.DataField',
            Value: vendorPayRate,
        },
        {
            $Type: 'UI.DataField',
            Value: vendorTotal,
        },
        {
            $Type: 'UI.DataField',
            Value: supplierInvoiceNo,
        },
        {
            $Type: 'UI.DataField',
            Value: hybridPricing,
        },
        {
            $Type: 'UI.DataField',
            Value: supplierAdminFee,
        },
        {
            $Type: 'UI.DataField',
            Value: customerAdminFee,
        },
        {
            $Type: 'UI.DataField',
            Value: commodityCode,
        },
        {
            $Type: 'UI.DataField',
            Value: categoryCode,
        },
        {
            $Type: 'UI.DataField',
            Value: taxIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: plant,
        },
        {
            $Type: 'UI.DataField',
            Value: clientTaxAmount,
        },
        {
            $Type: 'UI.DataField',
            Value: verbiageCode,
        },
        {
            $Type: 'UI.DataField',
            Value: clientTaxIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: vendorTaxIndicator,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName15,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue15,
        }
    ],
    UI.PresentationVariant #SowScInvoice: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#SowScInvoice'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

//Interface N FG Invoices

annotate service.Fg_Invoices with @(
    UI.LineItem #FgTimeInvoices           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}'
        },
        {
            $Type: 'UI.DataField',
            Value: workerID
        },
        {
            $Type: 'UI.DataField',
            Value: fgInvoiceID
        },
        {
            $Type: 'UI.DataField',
            Value: fgInvoicetype
        },
        {
            $Type: 'UI.DataField',
            Value: fgInvoiceLinetype
        },
        {
            $Type: 'UI.DataField',
            Value: invSubmissionDate
        },
        {
            $Type: 'UI.DataField',
            Value: fgSiteCode
        },
        {
            $Type: 'UI.DataField',
            Value: invLineAmount
        },
        {
            $Type: 'UI.DataField',
            Value: invLineAdjAmount
        },
        {
            $Type: 'UI.DataField',
            Value: currency
        },
        {
            $Type: 'UI.DataField',
            Value: firstName
        },
        {
            $Type: 'UI.DataField',
            Value: lastName
        },
        {
            $Type: 'UI.DataField',
            Value: businessCode
        },
        {
            $Type: 'UI.DataField',
            Value: costCenterCode
        },
        {
            $Type: 'UI.DataField',
            Value: costCenterName
        },
        {
            $Type: 'UI.DataField',
            Value: fgTaskCode
        },
        {
            $Type: 'UI.DataField',
            Value: fgTaskName
        },
        {
            $Type: 'UI.DataField',
            Value: glAccount
        },
        {
            $Type: 'UI.DataField',
            Value: stHours
        },
        {
            $Type: 'UI.DataField',
            Value: otHours
        },
        {
            $Type: 'UI.DataField',
            Value: dtHours
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillRateST
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillRateOt
        },
        {
            $Type: 'UI.DataField',
            Value: customerBillRateDt
        },
        {
            $Type: 'UI.DataField',
            Value: supplierPayRateST
        },
        {
            $Type: 'UI.DataField',
            Value: supplierPayRateOT
        },
        {
            $Type: 'UI.DataField',
            Value: supplierPayRateDT
        },
        {
            $Type: 'UI.DataField',
            Value: quantity
        },
        {
            $Type: 'UI.DataField',
            Value: fgWorkOrderID
        },
        {
            $Type: 'UI.DataField',
            Value: timesheetID
        },
        {
            $Type: 'UI.DataField',
            Value: parentTimesheetID
        },
        {
            $Type: 'UI.DataField',
            Value: fgInvoiceOrgID
        },
        {
            $Type: 'UI.DataField',
            Value: revision
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetStatus
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetStartDate
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetEndDate
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetApprovedDate
        },
        {
            $Type: 'UI.DataField',
            Value: contractNoSS
        },
        {
            $Type: 'UI.DataField',
            Value: timeSheetEntryDate
        },
        {
            $Type: 'UI.DataField',
            Value: contractNoWN
        },
        {
            $Type: 'UI.DataField',
            Value: orderNo
        },
        {
            $Type: 'UI.DataField',
            Value: personnelNo
        },
        {
            $Type: 'UI.DataField',
            Value: fgGLCustomerCode
        }
    ],
    UI.PresentationVariant #FgTimeInvoices: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#FgTimeInvoices'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

annotate service.Travel with @(
    UI.LineItem #Travel           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}'
        },
        {
            $Type                    : 'UI.DataField',
            Value                    : skipTrip,
            Criticality              : (skipTrip = false ? 5 : 3),
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: wnInvoiceNo
        },
        {
            $Type: 'UI.DataField',
            Value: sapEmployeeNo
        },
        {
            $Type: 'UI.DataField',
            Value: wnWorkOrder
        },
        {
            $Type: 'UI.DataField',
            Value: woType
        },
        {
            $Type: 'UI.DataField',
            Value: internalOrder
        },
        {
            $Type: 'UI.DataField',
            Value: weekEndDate
        },
        {
            $Type: 'UI.DataField',
            Value: beginDate
        },
        {
            $Type: 'UI.DataField',
            Value: endDate
        },
        {
            $Type: 'UI.DataField',
            Value: tripActivityType
        },
        {
            $Type: 'UI.DataField',
            Value: country_code
        },
        {
            $Type: 'UI.DataField',
            Value: tripExpenseType
        },
        {
            $Type: 'UI.DataField',
            Value: amount
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue1,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue2,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue3,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue4,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue5,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue6,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue7,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue8,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue9,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue10,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue11,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue12,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue13,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue14,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldName15,
        },
        {
            $Type: 'UI.DataField',
            Value: customerFieldValue15,
        }

    ],
    UI.PresentationVariant #Travel: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#Travel'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);

annotate service.Drug_Background_Check with @(
    UI.LineItem #Drug_Background_Check           : [
        {
            $Type                    : 'UI.DataField',
            Value                    : valid,
            Criticality              : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type: 'UI.DataField',
            Value: processLevel.name,
            Label: '{i18n>processLevel}'
        },
        {
            $Type: 'UI.DataField',
            Value: contractNo
        },
        {
            $Type: 'UI.DataField',
            Value: wnInvoiceNo
        },
        {
            $Type: 'UI.DataField',
            Value: employeeNo
        },
        {
            $Type: 'UI.DataField',
            Value: workOrderWN
        },
        {
            $Type: 'UI.DataField',
            Value: salesDocumentType
        },
        {
            $Type: 'UI.DataField',
            Value: expenseType
        },
        {
            $Type: 'UI.DataField',
            Value: project
        },
        {
            $Type: 'UI.DataField',
            Value: weekEndDate
        },
        {
            $Type: 'UI.DataField',
            Value: amount
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code
        },
        {
            $Type: 'UI.DataField',
            Value: customerPoNoLabor
        }
    ],
    UI.PresentationVariant #Drug_Background_Check: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem#Drug_Background_Check'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : uploadSeq, // sort by your field
            Descending: false // ascending
        }]
    }
);
annotate service.Travel with {
    skipTrip @Common.FieldControl : #ReadOnly
};

