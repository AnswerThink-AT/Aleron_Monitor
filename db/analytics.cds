using { com.aleron.monitor as monitor } from './schema';

@readonly
@Aggregation.ApplySupported: { Transformations: ['aggregate','groupby'], PropertyRestrictions: true }
entity InterfaceRecordFacts as

/* 1) Times */
select from monitor.Times as T {
  key T.ID                               as recordId,
  @Aggregation.Groupable: true T.file.ID                     as fileId,
  @Aggregation.Groupable: true T.file.interfaceType.ID       as interfaceId,
  @Aggregation.Groupable: true T.file.interfaceType.name     as interfaceName,
  @Aggregation.Groupable: true T.file.name                   as fileName,
  @Aggregation.Groupable: true T.file.status.code            as fileStatus,
  @Aggregation.Groupable: true T.file.source                 as source,
  @Aggregation.Groupable: true T.processLevel.code           as processLevel,
  @Aggregation.Groupable: true T.valid                       as valid,
  @Aggregation.Groupable: true T.file.createdAt              as uploadedAt
}
union all
/* 2) WorkOrders */
select from monitor.WorkOrders as W {
  key W.ID                               as recordId,
  W.file.ID                               as fileId,
  W.file.interfaceType.ID                 as interfaceId,
  W.file.interfaceType.name               as interfaceName,
  W.file.name                             as fileName,
  W.file.status.code                      as fileStatus,
  W.file.source                           as source,
  W.processLevel.code                     as processLevel,
  W.valid                                 as valid,
  W.file.createdAt                        as uploadedAt
}
union all
/* 3) WorkOrders_WN */
select from monitor.WorkOrders_WN as WN {
  key WN.ID                               as recordId,
  WN.file.ID                              as fileId,
  WN.file.interfaceType.ID                as interfaceId,
  WN.file.interfaceType.name              as interfaceName,
  WN.file.name                            as fileName,
  WN.file.status.code                     as fileStatus,
  WN.file.source                          as source,
  WN.processLevel.code                    as processLevel,
  WN.valid                                as valid,
  WN.file.createdAt                       as uploadedAt
}
union all
/* 4) WorkOrders_FG */
select from monitor.WorkOrders_FG as FG {
  key FG.ID                               as recordId,
  FG.file.ID                              as fileId,
  FG.file.interfaceType.ID                as interfaceId,
  FG.file.interfaceType.name              as interfaceName,
  FG.file.name                            as fileName,
  FG.file.status.code                     as fileStatus,
  FG.file.source                          as source,
  FG.processLevel.code                    as processLevel,
  FG.valid                                as valid,
  FG.file.createdAt                       as uploadedAt
}
union all
/* 5) EmployeeHires */
select from monitor.EmployeeHires as EH {
  key EH.ID                               as recordId,
  EH.file.ID                              as fileId,
  EH.file.interfaceType.ID                as interfaceId,
  EH.file.interfaceType.name              as interfaceName,
  EH.file.name                            as fileName,
  EH.file.status.code                     as fileStatus,
  EH.file.source                          as source,
  EH.processLevel.code                    as processLevel,
  EH.valid                                as valid,
  EH.file.createdAt                       as uploadedAt
}
union all
/* 6) StaffHires */
select from monitor.StaffHires as SH {
  key SH.ID                               as recordId,
  SH.file.ID                              as fileId,
  SH.file.interfaceType.ID                as interfaceId,
  SH.file.interfaceType.name              as interfaceName,
  SH.file.name                            as fileName,
  SH.file.status.code                     as fileStatus,
  SH.file.source                          as source,
  SH.processLevel.code                    as processLevel,
  SH.valid                                as valid,
  SH.file.createdAt                       as uploadedAt
}
union all
/* 7) Terminations */
select from monitor.Terminations as TM {
  key TM.ID                               as recordId,
  TM.file.ID                              as fileId,
  TM.file.interfaceType.ID                as interfaceId,
  TM.file.interfaceType.name              as interfaceName,
  TM.file.name                            as fileName,
  TM.file.status.code                     as fileStatus,
  TM.file.source                          as source,
  TM.processLevel.code                    as processLevel,
  TM.valid                                as valid,
  TM.file.createdAt                       as uploadedAt
}
union all
/* 8) Fg_Invoices */
select from monitor.Fg_Invoices as FI {
  key FI.ID                               as recordId,
  FI.file.ID                              as fileId,
  FI.file.interfaceType.ID                as interfaceId,
  FI.file.interfaceType.name              as interfaceName,
  FI.file.name                            as fileName,
  FI.file.status.code                     as fileStatus,
  FI.file.source                          as source,
  FI.processLevel.code                    as processLevel,
  FI.valid                                as valid,
  FI.file.createdAt                       as uploadedAt
}
union all
/* 9) Credit_Rebill */
select from monitor.Credit_Rebill as CR {
  key CR.ID                               as recordId,
  CR.file.ID                              as fileId,
  CR.file.interfaceType.ID                as interfaceId,
  CR.file.interfaceType.name              as interfaceName,
  CR.file.name                            as fileName,
  CR.file.status.code                     as fileStatus,
  CR.file.source                          as source,
  CR.processLevel.code                    as processLevel,
  CR.valid                                as valid,
  CR.file.createdAt                       as uploadedAt
}
union all
/* 10) Fg_Credit_Rebill */
select from monitor.Fg_Credit_Rebill as FCR {
  key FCR.ID                              as recordId,
  FCR.file.ID                             as fileId,
  FCR.file.interfaceType.ID               as interfaceId,
  FCR.file.interfaceType.name             as interfaceName,
  FCR.file.name                           as fileName,
  FCR.file.status.code                    as fileStatus,
  FCR.file.source                         as source,
  FCR.processLevel.code                   as processLevel,
  FCR.valid                               as valid,
  FCR.file.createdAt                      as uploadedAt
}
union all
/* 11) OtherBillables */
select from monitor.OtherBillables as OB {
  key OB.ID                               as recordId,
  OB.file.ID                              as fileId,
  OB.file.interfaceType.ID                as interfaceId,
  OB.file.interfaceType.name              as interfaceName,
  OB.file.name                            as fileName,
  OB.file.status.code                     as fileStatus,
  OB.file.source                          as source,
  OB.processLevel.code                    as processLevel,
  OB.valid                                as valid,
  OB.file.createdAt                       as uploadedAt
}
union all
/* 12) SowScWo */
select from monitor.SowScWo as E {
  key E.ID                                as recordId,
  E.file.ID                               as fileId,
  E.file.interfaceType.ID                 as interfaceId,
  E.file.interfaceType.name               as interfaceName,
  E.file.name                             as fileName,
  E.file.status.code                      as fileStatus,
  E.file.source                           as source,
  E.processLevel.code                     as processLevel,
  E.valid                                 as valid,
  E.file.createdAt                        as uploadedAt
}
union all
/* 13) SowScInvoice */
select from monitor.SowScInvoice as F {
  key F.ID                                as recordId,
  F.file.ID                               as fileId,
  F.file.interfaceType.ID                 as interfaceId,
  F.file.interfaceType.name               as interfaceName,
  F.file.name                             as fileName,
  F.file.status.code                      as fileStatus,
  F.file.source                           as source,
  F.processLevel.code                     as processLevel,
  F.valid                                 as valid,
  F.file.createdAt                        as uploadedAt
}
union all
/* 14) Bonus */
select from monitor.Bonus as G {
  key G.ID                                as recordId,
  G.file.ID                               as fileId,
  G.file.interfaceType.ID                 as interfaceId,
  G.file.interfaceType.name               as interfaceName,
  G.file.name                             as fileName,
  G.file.status.code                      as fileStatus,
  G.file.source                           as source,
  G.processLevel.code                     as processLevel,
  G.valid                                 as valid,
  G.file.createdAt                        as uploadedAt
}
union all
/* 15) Travel */
select from monitor.Travel as TR {
  key TR.ID                               as recordId,
  TR.file.ID                              as fileId,
  TR.file.interfaceType.ID                as interfaceId,
  TR.file.interfaceType.name              as interfaceName,
  TR.file.name                            as fileName,
  TR.file.status.code                     as fileStatus,
  TR.file.source                          as source,
  TR.processLevel.code                    as processLevel,
  TR.valid                                 as valid,
  TR.file.createdAt                       as uploadedAt
}
union all
/* 16) Drug_Background_Check */
select from monitor.Drug_Background_Check as DBC {
  key DBC.ID                              as recordId,
  DBC.file.ID                             as fileId,
  DBC.file.interfaceType.ID               as interfaceId,
  DBC.file.interfaceType.name             as interfaceName,
  DBC.file.name                           as fileName,
  DBC.file.status.code                    as fileStatus,
  DBC.file.source                         as source,
  DBC.processLevel.code                   as processLevel,
  DBC.valid                               as valid,
  DBC.file.createdAt                      as uploadedAt
};

@readonly
@Aggregation.ApplySupported: { Transformations: ['aggregate','groupby'], PropertyRestrictions: true }
entity FileStepSummary as select from InterfaceRecordFacts {
  key interfaceId,
  key interfaceName,
  key fileId,
  key fileName,
  key fileStatus,
  key source,
  key uploadedAt,
  key processLevel,
  key valid,

  @Aggregation.Aggregatable
  @Measures.isMeasure : true
  count(recordId) as recordCount : Integer
}
group by interfaceId, interfaceName, fileId, fileName, fileStatus, source, uploadedAt, processLevel, valid;

/* IMPORTANT:
   Do NOT define any *_Detail DB views here for HANA, to avoid
   “calculated elements in nested projections” errors.
   We’ll expose detail sets directly in the service as projections.
*/
