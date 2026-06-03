/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v2';
import type { EnterpriseProjectElementApi } from './EnterpriseProjectElementApi';
import {
  EntProjectElementJva,
  EntProjectElementJvaType
} from './EntProjectElementJva';
import {
  EntProjectElmntPublicSector,
  EntProjectElmntPublicSectorType
} from './EntProjectElmntPublicSector';
import {
  EntProjElmntBlockFunc,
  EntProjElmntBlockFuncType
} from './EntProjElmntBlockFunc';
import {
  EntProjElmntDlvbrl,
  EntProjElmntDlvbrlType
} from './EntProjElmntDlvbrl';
import {
  EntProjElmntWorkItem,
  EntProjElmntWorkItemType
} from './EntProjElmntWorkItem';
import { EnterpriseProject, EnterpriseProjectType } from './EnterpriseProject';
/**
 * This class represents the entity "A_EnterpriseProjectElement" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export declare class EnterpriseProjectElement<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjectElementType<T>
{
  /**
   * Technical entity name for EnterpriseProjectElement.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EnterpriseProjectElement entity.
   */
  static _keys: string[];
  /**
   * Dyn. Action Control.
   * @nullable
   */
  changeEntProjElmntPositionAc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dyn. Action Control.
   * @nullable
   */
  changeEntProjElmntProcgStatusAc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  actualEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  actualStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  controllingAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  costCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  costingSheetFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  factoryCalendarFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  forecastedEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  functionalAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  functionalLocationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  investmentProfileFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  isMainMilestoneFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  locationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  milestoneApprovalStatusFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  plannedEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  plannedStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  plantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  profitCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  projectElementFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  projectElementDescriptionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  responsibleCostCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  resultAnalysisInternalIdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  taxJurisdictionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  wbsElementIsBillingElementFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Method Control.
   * @nullable
   */
  deleteMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dyn. Method Control.
   * @nullable
   */
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toEntProjElmntBlkFuncOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toEntProjElmntDlvbrlOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toEntProjElmntWorkItemOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toSubProjElementOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Project Element ID.
   * Maximum length: 24.
   * @nullable
   */
  projectElement?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * WBS Element.
   * Maximum length: 8.
   * @nullable
   */
  wbsElementInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Description.
   * Maximum length: 60.
   * @nullable
   */
  projectElementDescription?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Parent Entity Guid.
   * @nullable
   */
  parentObjectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Sortnumber.
   * @nullable
   */
  projectElementOrdinalNumber?: DeserializedType<T, 'Edm.Int32'> | null;
  /**
   * Object Processing Status.
   * Maximum length: 2.
   * @nullable
   */
  processingStatus?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Task Type.
   * Maximum length: 15.
   * @nullable
   */
  entProjectElementType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Planned Start Date.
   * @nullable
   */
  plannedStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Planned Finish Date.
   * @nullable
   */
  plannedEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Actual Start.
   * @nullable
   */
  actualStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Actual Finish.
   * @nullable
   */
  actualEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Responsible Cost Center.
   * Maximum length: 10.
   * @nullable
   */
  responsibleCostCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company code for WBS element.
   * Maximum length: 4.
   * @nullable
   */
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Profit Center.
   * Maximum length: 10.
   * @nullable
   */
  profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Functional Area.
   * Maximum length: 16.
   * @nullable
   */
  functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Controlling area for WBS element.
   * Maximum length: 4.
   * @nullable
   */
  controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Plant.
   * Maximum length: 4.
   * @nullable
   */
  plant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Location.
   * Maximum length: 10.
   * @nullable
   */
  location?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   * @nullable
   */
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Functional Location.
   * Maximum length: 40.
   * @nullable
   */
  functionalLocation?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Factory calendar key.
   * Maximum length: 2.
   * @nullable
   */
  factoryCalendar?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Costing Sheet.
   * Maximum length: 6.
   * @nullable
   */
  costingSheet?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Investment Measure Profile.
   * Maximum length: 6.
   * @nullable
   */
  investmentProfile?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Statistical WBS element.
   * @nullable
   */
  wbsIsStatisticalWbsElement?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Cost center to which costs are actually posted.
   * Maximum length: 10.
   * @nullable
   */
  costCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Billing element.
   * @nullable
   */
  wbsElementIsBillingElement?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Results Analysis Key.
   * Maximum length: 6.
   * @nullable
   */
  resultAnalysisInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Milestone flag.
   * Maximum length: 1.
   * @nullable
   */
  isProjectMilestone?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Forecasted Finish.
   * @nullable
   */
  forecastedEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Milestone Approval Status.
   * Maximum length: 5.
   * @nullable
   */
  milestoneApprovalStatus?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Milestone is essential for Project Planning.
   * @nullable
   */
  isMainMilestone?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Name of Person Who Created Object.
   * Maximum length: 12.
   * @nullable
   */
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Object Creation.
   * @nullable
   */
  creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Timestamp of Last Object Change.
   * @nullable
   */
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EntProjectElementJva} entity.
   */
  toEntProjectElementJva?: EntProjectElementJva<T> | null;
  /**
   * One-to-one navigation property to the {@link EntProjectElmntPublicSector} entity.
   */
  toEntProjectElmntPublicSector?: EntProjectElmntPublicSector<T> | null;
  /**
   * One-to-one navigation property to the {@link EntProjElmntBlockFunc} entity.
   */
  toEntProjElmntBlkFunc?: EntProjElmntBlockFunc<T> | null;
  /**
   * One-to-many navigation property to the {@link EntProjElmntDlvbrl} entity.
   */
  toEntProjElmntDlvbrl: EntProjElmntDlvbrl<T>[];
  /**
   * One-to-many navigation property to the {@link EntProjElmntWorkItem} entity.
   */
  toEntProjElmntWorkItem: EntProjElmntWorkItem<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  toParentProjElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-many navigation property to the {@link EnterpriseProjectElement} entity.
   */
  toSubProjElement: EnterpriseProjectElement<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  toEnterpriseProject?: EnterpriseProject<T> | null;
  constructor(_entityApi: EnterpriseProjectElementApi<T>);
}
export interface EnterpriseProjectElementType<
  T extends DeSerializers = DefaultDeSerializers
> {
  changeEntProjElmntPositionAc?: DeserializedType<T, 'Edm.Boolean'> | null;
  changeEntProjElmntProcgStatusAc?: DeserializedType<T, 'Edm.Boolean'> | null;
  actualEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  actualStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  controllingAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  costCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  costingSheetFc?: DeserializedType<T, 'Edm.Byte'> | null;
  factoryCalendarFc?: DeserializedType<T, 'Edm.Byte'> | null;
  forecastedEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  functionalAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  functionalLocationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  investmentProfileFc?: DeserializedType<T, 'Edm.Byte'> | null;
  isMainMilestoneFc?: DeserializedType<T, 'Edm.Byte'> | null;
  locationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  milestoneApprovalStatusFc?: DeserializedType<T, 'Edm.Byte'> | null;
  plannedEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  plannedStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  plantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  profitCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  projectElementFc?: DeserializedType<T, 'Edm.Byte'> | null;
  projectElementDescriptionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  responsibleCostCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  resultAnalysisInternalIdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  taxJurisdictionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  wbsElementIsBillingElementFc?: DeserializedType<T, 'Edm.Byte'> | null;
  deleteMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEntProjElmntBlkFuncOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEntProjElmntDlvbrlOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEntProjElmntWorkItemOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toSubProjElementOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  projectElement?: DeserializedType<T, 'Edm.String'> | null;
  wbsElementInternalId?: DeserializedType<T, 'Edm.String'> | null;
  projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectElementDescription?: DeserializedType<T, 'Edm.String'> | null;
  parentObjectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  projectElementOrdinalNumber?: DeserializedType<T, 'Edm.Int32'> | null;
  processingStatus?: DeserializedType<T, 'Edm.String'> | null;
  entProjectElementType?: DeserializedType<T, 'Edm.String'> | null;
  plannedStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  plannedEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  actualStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  actualEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  responsibleCostCenter?: DeserializedType<T, 'Edm.String'> | null;
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  plant?: DeserializedType<T, 'Edm.String'> | null;
  location?: DeserializedType<T, 'Edm.String'> | null;
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  functionalLocation?: DeserializedType<T, 'Edm.String'> | null;
  factoryCalendar?: DeserializedType<T, 'Edm.String'> | null;
  costingSheet?: DeserializedType<T, 'Edm.String'> | null;
  investmentProfile?: DeserializedType<T, 'Edm.String'> | null;
  wbsIsStatisticalWbsElement?: DeserializedType<T, 'Edm.Boolean'> | null;
  costCenter?: DeserializedType<T, 'Edm.String'> | null;
  wbsElementIsBillingElement?: DeserializedType<T, 'Edm.Boolean'> | null;
  resultAnalysisInternalId?: DeserializedType<T, 'Edm.String'> | null;
  isProjectMilestone?: DeserializedType<T, 'Edm.String'> | null;
  forecastedEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  milestoneApprovalStatus?: DeserializedType<T, 'Edm.String'> | null;
  isMainMilestone?: DeserializedType<T, 'Edm.Boolean'> | null;
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  toEntProjectElementJva?: EntProjectElementJvaType<T> | null;
  toEntProjectElmntPublicSector?: EntProjectElmntPublicSectorType<T> | null;
  toEntProjElmntBlkFunc?: EntProjElmntBlockFuncType<T> | null;
  toEntProjElmntDlvbrl: EntProjElmntDlvbrlType<T>[];
  toEntProjElmntWorkItem: EntProjElmntWorkItemType<T>[];
  toParentProjElement?: EnterpriseProjectElementType<T> | null;
  toSubProjElement: EnterpriseProjectElementType<T>[];
  toEnterpriseProject?: EnterpriseProjectType<T> | null;
}
