using com.aleron.monitor as monitor from '../db/schema';

service MonitorService {
    @odata.draft.enabled
    @odata.draft.bypass
    // entity Files          as projection on monitor.Files;
    entity Files                      as
        projection on monitor.Files {
            *,
            to_Drug_Background_Check,
            virtual processLevelCounts : String,
            virtual showFacet_M        : Boolean,
            virtual showFacet_1        : Boolean,
            virtual showFacet_S        : Boolean,
            virtual showFacet_3        : Boolean,
            virtual showFacet_T        : Boolean,
            virtual showFacet_U        : Boolean,
            virtual showFacet_E        : Boolean,
            virtual showFacet_F        : Boolean,
            virtual showFacet_2        : Boolean,
            virtual showFacet_G        : Boolean,
            virtual showFacet_O        : Boolean,
            virtual showFacet_N        : Boolean,
            virtual showFacet_A        : Boolean,
            virtual showFacet_D        : Boolean,
            virtual showFacet_Q        : Boolean,
            virtual showFacet_C        : Boolean,
            virtual showFacet_4        : Boolean
        }


    entity Times                      as projection on monitor.Times;
    entity WorkOrders                 as projection on monitor.WorkOrders;
    entity WorkOrders_WN              as projection on monitor.WorkOrders_WN;
    entity WorkOrders_FG              as projection on monitor.WorkOrders_FG;
    entity Terminations               as projection on monitor.Terminations;
    entity Fg_Credit_Rebill           as projection on monitor.Fg_Credit_Rebill;
    entity Credit_Rebill              as projection on monitor.Credit_Rebill;
    entity OtherBillables             as projection on monitor.OtherBillables;
    entity SowScWo                    as projection on monitor.SowScWo;
    entity SowScInvoice               as projection on monitor.SowScInvoice;
    entity Fg_Invoices                as projection on monitor.Fg_Invoices;
    entity Bonus                      as projection on monitor.Bonus;
    entity Travel                     as projection on monitor.Travel;
    entity Drug_Background_Check      as projection on monitor.Drug_Background_Check;
    entity StaffHires                 as projection on monitor.StaffHires;
    entity Credits_for_LegacyInvoices as projection on monitor.Credits_for_LegacyInvoices;


    @readonly
    entity InterfaceTypes             as
        projection on monitor.InterfaceTypes
        excluding {
            createdAt,
            createdBy,
            modifiedAt,
            modifiedBy,
            filePrefix,
            mappedEntity,
            config
        };

    entity EmployeeHires              as projection on monitor.EmployeeHires;
    entity ProcessLogs                as projection on monitor.ProcessLogs;

    // Unbound Actions & functions

    action processFile(fileNumber: Integer64, records: many UUID, from: String(2), to: String(2), tableId: String) returns {
        processed : Boolean;
        message   : String;
    };

    action rejectFile(fileNumber: Integer64, records: many UUID)                                                   returns {
        rejected : Boolean;
        message  : String;
    };

    action validateFile(fileNumber: Integer64, records: many UUID)                                                 returns {
        message : String;
    };

    // Get entity metadata for validation
    action getEntityMetadata(interfaceId: String(2))                                                               returns {
        entityName     : String;
        fields         : String;
        requiredFields : String;
        constraints    : String;
    };

    // Validate records against entity metadata
    action validateRecords(interfaceId: String(2), records: many String)                                           returns {
        isValid    : Boolean;
        errors     : String;
        errorCount : Integer;
    };

    @open
    type Record {
        ID      : UUID;
        file_ID : Integer64;
    }

    action updateRecords(interfaceType: String(1), records: many Record)                                           returns {
        message : String;
    };

    action addLogs(logs: many ProcessLogs)                                                                         returns {};
    action updateLogs(logs: many ProcessLogs, record_ID: String)                                                   returns {};
    action test()                                                                                                  returns {};
    action testFunction()                                                                                          returns Boolean;
    action createEmployeeHires(employeeHires: array of EmployeeHires)                                              returns many EmployeeHires;
    action createTimes(times: array of Times)                                                                      returns many Times;
    action createWorkOrders(workOrders: array of WorkOrders)                                                       returns many WorkOrders;
    action createWorkOrders_WN(workOrders_WN: array of WorkOrders_WN)                                              returns many WorkOrders_WN;
    action createWorkOrders_FG(workOrders_FG: array of WorkOrders_FG)                                              returns many WorkOrders_FG;
    action createStaffHires(staffHires: array of StaffHires)                                                       returns many StaffHires;
    action createTerminations(terminations: array of Terminations)                                                 returns many Terminations;
    action createFg_Invoices(fg_Invoices: array of Fg_Invoices)                                                    returns many Fg_Invoices;
    action createCredit_Rebill(credit_Rebill: array of Credit_Rebill)                                              returns many Credit_Rebill;
    action createFg_Credit_Rebill(fg_Credit_Rebill: array of Fg_Credit_Rebill)                                     returns many Fg_Credit_Rebill;
    action createTravel(travel: array of Travel)                                                                   returns many Travel; // Interface 2
    action createSowScWo(sowScWo: array of SowScWo)                                                                returns many SowScWo; // Interface E
    action createSowScInvoice(sowScInvoice: array of SowScInvoice)                                                 returns many SowScInvoice; // Interface F
    action createBonus(bonus: array of Bonus)                                                                      returns many Bonus; // Interface G
    action createOtherBillables(otherBillables: array of OtherBillables)                                           returns many OtherBillables; // Interface O
    action createDrug_Background_Check(drug_Background_Check: array of Drug_Background_Check)                      returns many Drug_Background_Check;

    action uploadInterfaceData(fileID: String,
                               interfaceID: String,
                               csvString: LargeString)                                                             returns String;

    action deletediscardedRecords(interfaceID: String(2), fileID: String)                                          returns {}
}
