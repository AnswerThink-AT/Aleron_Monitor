using com.aleron.monitor as config from '../db/schema';

service ConfigService {
    @odata.draft.enabled
    @Capabilities: {
        InsertRestrictions: {Insertable: false},
        UpdateRestrictions: {Updatable: true},
        DeleteRestrictions: {Deletable: false},
        NavigationRestrictions : {
            $Type : 'Capabilities.NavigationRestrictionsType',
            RestrictedProperties : [
                {
                    $Type : 'Capabilities.NavigationPropertyRestriction',
                    NavigationProperty : DraftAdministrativeData,
                    FilterRestrictions : {
                        $Type : 'Capabilities.FilterRestrictionsType',
                        Filterable : false,
                    },
                },
            ],
        }
    }
    entity Configurations     as projection on config.Configurations;
    entity InterfaceTypes     as projection on config.InterfaceTypes;
    entity InterfaceSteps     as projection on config.InterfaceSteps;
    entity FieldValidations   as projection on config.FieldValidations;
    entity Processes          as projection on config.Processes;
    entity CustomerSaleOrders as projection on config.CustomerSaleOrders;
    entity SkipInterfaces     as projection on config.SkipInterfaces;
    entity PurchaseOrders     as projection on config.PurchaseOrders;
    entity PaymentTerms       as projection on config.PaymentTerms;

    entity Vendor_VendorRemit           as projection on config.Vendor_VendorRemit;
    entity CustomerEDIPartnerConfig     as projection on config.CustomerEDIPartnerConfig;
    entity EdiShiftDiffForEmpSubGrp     as projection on config.EdiShiftDiffForEmpSubGrp;
    entity EdiShiftDiffForCanada        as projection on config.EdiShiftDiffForCanada;
    entity TaxCodeByProvince            as projection on config.TaxCodeByProvince;
    entity TaxCodeByCity                as projection on config.TaxCodeByCity;
    entity TaxCodeByCounty              as projection on config.TaxCodeByCounty;
    entity FGdefaultEmp                 as projection on config.FGdefaultEmp;
    entity FGSiteCodeToAddressMapping   as projection on config.FGSiteCodeToAddressMapping;
    entity FGBusinessUnit               as projection on config.FGBusinessUnit;
    entity FGCostCenter                 as projection on config.FGCostCenter;
    entity TravelCustomerPayTermByPOBox as projection on config.TravelCustomerPayTermByPOBox;
    entity TravelPayTermFeed            as projection on config.TravelPayTermFeed;
    entity CustomFieldsToVC             as projection on config.CustomFieldsToVC;
    entity SCON_UOM                     as projection on config.SCON_UOM;
    entity SalesCondition               as projection on config.SalesCondition;
    entity CustomerZJOB                 as projection on config.CustomerZJOB;
    entity Char_Usage_Details           as projection on config.Char_Usage_Details
}
