using {
  InterfaceRecordFacts as IFR,
  FileStepSummary      as FSS
} from '../db/analytics';
using { com.aleron.monitor as monitor } from '../db/schema';

@path:'analytics'
service AnalyticsService {

  @readonly
  @Aggregation.ApplySupported: { Transformations: ['aggregate','groupby'], PropertyRestrictions: true }
  entity InterfaceRecordFacts as projection on IFR;

  @readonly
  @Aggregation.ApplySupported: { Transformations: ['aggregate','groupby'], PropertyRestrictions: true }
  entity FileStepSummary      as projection on FSS;

  @readonly
  entity Files as projection on monitor.Files {
    key ID,
        name,
        source,
        createdAt,
        status,
        interfaceType
  };

  /* ---- Value help for interfaces ---- */
  @readonly
  entity VH_InterfaceTypes as projection on monitor.InterfaceTypes {
    key ID,
        name
  };

  /* ---- Detail sets (export/drill) ---- */
  @readonly entity Times_Detail                 as projection on monitor.Times                 { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity WorkOrders_Detail            as projection on monitor.WorkOrders            { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity WorkOrders_WN_Detail         as projection on monitor.WorkOrders_WN         { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity WorkOrders_FG_Detail         as projection on monitor.WorkOrders_FG         { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity EmployeeHires_Detail         as projection on monitor.EmployeeHires         { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity StaffHires_Detail            as projection on monitor.StaffHires            { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity Terminations_Detail          as projection on monitor.Terminations          { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity Fg_Invoices_Detail           as projection on monitor.Fg_Invoices           { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity Credit_Rebill_Detail         as projection on monitor.Credit_Rebill         { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity Fg_Credit_Rebill_Detail      as projection on monitor.Fg_Credit_Rebill      { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity OtherBillables_Detail        as projection on monitor.OtherBillables        { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity SowScWo_Detail               as projection on monitor.SowScWo               { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity SowScInvoice_Detail          as projection on monitor.SowScInvoice          { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity Bonus_Detail                 as projection on monitor.Bonus                 { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity Travel_Detail                as projection on monitor.Travel                { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };

  @readonly entity Drug_Background_Check_Detail as projection on monitor.Drug_Background_Check { *,
    file.ID as fileId, file.name as fileName, file.source as fileSource, file.createdAt as uploadedAt };
}
