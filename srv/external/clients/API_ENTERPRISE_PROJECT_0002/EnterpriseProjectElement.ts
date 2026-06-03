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
export class EnterpriseProjectElement<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjectElementType<T>
{
  /**
   * Technical entity name for EnterpriseProjectElement.
   */
  static override _entityName = 'A_EnterpriseProjectElement';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EnterpriseProjectElement entity.
   */
  static _keys = ['ProjectElementUUID'];
  /**
   * Dyn. Action Control.
   * @nullable
   */
  declare changeEntProjElmntPositionAc?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Dyn. Action Control.
   * @nullable
   */
  declare changeEntProjElmntProcgStatusAc?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare actualEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare actualStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare controllingAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare costCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare costingSheetFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare factoryCalendarFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare forecastedEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare functionalAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare functionalLocationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare investmentProfileFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare isMainMilestoneFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare locationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare milestoneApprovalStatusFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare plannedEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare plannedStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare plantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare profitCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare projectElementFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare projectElementDescriptionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare responsibleCostCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare resultAnalysisInternalIdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare taxJurisdictionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare wbsElementIsBillingElementFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Method Control.
   * @nullable
   */
  declare deleteMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dyn. Method Control.
   * @nullable
   */
  declare updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toEntProjElmntBlkFuncOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toEntProjElmntDlvbrlOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toEntProjElmntWorkItemOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toSubProjElementOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  declare projectElementUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Project Element ID.
   * Maximum length: 24.
   * @nullable
   */
  declare projectElement?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * WBS Element.
   * Maximum length: 8.
   * @nullable
   */
  declare wbsElementInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Entity Guid.
   * @nullable
   */
  declare projectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Description.
   * Maximum length: 60.
   * @nullable
   */
  declare projectElementDescription?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Parent Entity Guid.
   * @nullable
   */
  declare parentObjectUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Sortnumber.
   * @nullable
   */
  declare projectElementOrdinalNumber?: DeserializedType<T, 'Edm.Int32'> | null;
  /**
   * Object Processing Status.
   * Maximum length: 2.
   * @nullable
   */
  declare processingStatus?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Task Type.
   * Maximum length: 15.
   * @nullable
   */
  declare entProjectElementType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Planned Start Date.
   * @nullable
   */
  declare plannedStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Planned Finish Date.
   * @nullable
   */
  declare plannedEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Actual Start.
   * @nullable
   */
  declare actualStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Actual Finish.
   * @nullable
   */
  declare actualEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Responsible Cost Center.
   * Maximum length: 10.
   * @nullable
   */
  declare responsibleCostCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company code for WBS element.
   * Maximum length: 4.
   * @nullable
   */
  declare companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Profit Center.
   * Maximum length: 10.
   * @nullable
   */
  declare profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Functional Area.
   * Maximum length: 16.
   * @nullable
   */
  declare functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Controlling area for WBS element.
   * Maximum length: 4.
   * @nullable
   */
  declare controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Plant.
   * Maximum length: 4.
   * @nullable
   */
  declare plant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Location.
   * Maximum length: 10.
   * @nullable
   */
  declare location?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   * @nullable
   */
  declare taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Functional Location.
   * Maximum length: 40.
   * @nullable
   */
  declare functionalLocation?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Factory calendar key.
   * Maximum length: 2.
   * @nullable
   */
  declare factoryCalendar?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Costing Sheet.
   * Maximum length: 6.
   * @nullable
   */
  declare costingSheet?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Investment Measure Profile.
   * Maximum length: 6.
   * @nullable
   */
  declare investmentProfile?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Statistical WBS element.
   * @nullable
   */
  declare wbsIsStatisticalWbsElement?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Cost center to which costs are actually posted.
   * Maximum length: 10.
   * @nullable
   */
  declare costCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Billing element.
   * @nullable
   */
  declare wbsElementIsBillingElement?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Results Analysis Key.
   * Maximum length: 6.
   * @nullable
   */
  declare resultAnalysisInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Milestone flag.
   * Maximum length: 1.
   * @nullable
   */
  declare isProjectMilestone?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Forecasted Finish.
   * @nullable
   */
  declare forecastedEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Milestone Approval Status.
   * Maximum length: 5.
   * @nullable
   */
  declare milestoneApprovalStatus?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Milestone is essential for Project Planning.
   * @nullable
   */
  declare isMainMilestone?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Name of Person Who Created Object.
   * Maximum length: 12.
   * @nullable
   */
  declare createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Object Creation.
   * @nullable
   */
  declare creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Timestamp of Last Object Change.
   * @nullable
   */
  declare lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  declare lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * One-to-one navigation property to the {@link EntProjectElementJva} entity.
   */
  declare toEntProjectElementJva?: EntProjectElementJva<T> | null;
  /**
   * One-to-one navigation property to the {@link EntProjectElmntPublicSector} entity.
   */
  declare toEntProjectElmntPublicSector?: EntProjectElmntPublicSector<T> | null;
  /**
   * One-to-one navigation property to the {@link EntProjElmntBlockFunc} entity.
   */
  declare toEntProjElmntBlkFunc?: EntProjElmntBlockFunc<T> | null;
  /**
   * One-to-many navigation property to the {@link EntProjElmntDlvbrl} entity.
   */
  declare toEntProjElmntDlvbrl: EntProjElmntDlvbrl<T>[];
  /**
   * One-to-many navigation property to the {@link EntProjElmntWorkItem} entity.
   */
  declare toEntProjElmntWorkItem: EntProjElmntWorkItem<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectElement} entity.
   */
  declare toParentProjElement?: EnterpriseProjectElement<T> | null;
  /**
   * One-to-many navigation property to the {@link EnterpriseProjectElement} entity.
   */
  declare toSubProjElement: EnterpriseProjectElement<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProject} entity.
   */
  declare toEnterpriseProject?: EnterpriseProject<T> | null;

  constructor(_entityApi: EnterpriseProjectElementApi<T>) {
    super(_entityApi);
  }
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
