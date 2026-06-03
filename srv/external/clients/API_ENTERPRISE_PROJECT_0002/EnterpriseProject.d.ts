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
import type { EnterpriseProjectApi } from './EnterpriseProjectApi';
import {
  EnterpriseProjectElement,
  EnterpriseProjectElementType
} from './EnterpriseProjectElement';
import {
  EnterpriseProjectJva,
  EnterpriseProjectJvaType
} from './EnterpriseProjectJva';
import {
  EnterpriseProjBlkFunc,
  EnterpriseProjBlkFuncType
} from './EnterpriseProjBlkFunc';
import {
  EntProjectPublicSector,
  EntProjectPublicSectorType
} from './EntProjectPublicSector';
import {
  EnterpriseProjectRole,
  EnterpriseProjectRoleType
} from './EnterpriseProjectRole';
import {
  EnterpriseProjectTeamMember,
  EnterpriseProjectTeamMemberType
} from './EnterpriseProjectTeamMember';
/**
 * This class represents the entity "A_EnterpriseProject" of service "API_ENTERPRISE_PROJECT_SRV".
 */
export declare class EnterpriseProject<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements EnterpriseProjectType<T>
{
  /**
   * Technical entity name for EnterpriseProject.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the EnterpriseProject entity.
   */
  static _keys: string[];
  /**
   * Dyn. Action Control.
   * @nullable
   */
  changeEntProjProcgStatusAc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dyn. Action Control.
   * @nullable
   */
  copyToActiveDocumentAc?: DeserializedType<T, 'Edm.Boolean'> | null;
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
  availabilityControlIsActiveFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  availabilityControlProfileFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  controllingAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  costingSheetFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  enterpriseProjectTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  entProjIsMultiSlsOrdItmsEnbldFc?: DeserializedType<T, 'Edm.Byte'> | null;
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
  isBillingRelevantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  locationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  plantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  priorityCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  profitCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  projectFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  projectCurrencyFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  projectDescriptionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  projectEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  projectProfileCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  projectStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
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
  toEnterpriseProjectElementOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toEntProjBlkFuncOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toEntProjRoleOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  toEntProjTeamMemberOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  projectUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Project (internal).
   * Maximum length: 8.
   * @nullable
   */
  projectInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project ID.
   * Maximum length: 24.
   * @nullable
   */
  project?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Description.
   * Maximum length: 60.
   * @nullable
   */
  projectDescription?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project Type.
   * Maximum length: 2.
   * @nullable
   */
  enterpriseProjectType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Priority.
   * Maximum length: 3.
   * @nullable
   */
  priorityCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Planned Start Date.
   * @nullable
   */
  projectStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Planned Finish Date.
   * @nullable
   */
  projectEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
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
   * Business Partner GUID.
   * @nullable
   */
  customerUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Service Organization.
   * Maximum length: 5.
   * @nullable
   */
  enterpriseProjectServiceOrg?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Enterprise Project Is Confidential.
   * @nullable
   */
  entProjectIsConfidential?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Restrict Unstaffed Posting.
   * Maximum length: 1.
   * @nullable
   */
  restrictedTimePosting?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Object Processing Status.
   * Maximum length: 2.
   * @nullable
   */
  processingStatus?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Responsible Cost Center.
   * Maximum length: 10.
   * @nullable
   */
  responsibleCostCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Profit Center.
   * Maximum length: 10.
   * @nullable
   */
  profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project Profile.
   * Maximum length: 7.
   * @nullable
   */
  projectProfileCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Functional Area.
   * Maximum length: 16.
   * @nullable
   */
  functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company code for the project.
   * Maximum length: 4.
   * @nullable
   */
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Controlling area for the project.
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
   * Project Currency.
   * Maximum length: 5.
   * @nullable
   */
  projectCurrency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Budget Availability Control: Profile.
   * Maximum length: 6.
   * @nullable
   */
  availabilityControlProfile?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Availability control indicator(AVC).
   * @nullable
   */
  availabilityControlIsActive?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Functional Location.
   * Maximum length: 40.
   * @nullable
   */
  functionalLocation?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Billing element.
   * @nullable
   */
  isBillingRelevant?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Investment Measure Profile.
   * Maximum length: 6.
   * @nullable
   */
  investmentProfile?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Last Object Change.
   * @nullable
   */
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Timestamp on which project data was changed last.
   * @nullable
   */
  projectLastChangedDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Enterprise Project Assigned to Multiple SO Items.
   * @nullable
   */
  entProjIsMultiSlsOrdItmsEnbld?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Results Analysis Key.
   * Maximum length: 6.
   * @nullable
   */
  resultAnalysisInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Costing Sheet.
   * Maximum length: 6.
   * @nullable
   */
  costingSheet?: DeserializedType<T, 'Edm.String'> | null;
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
   * One-to-many navigation property to the {@link EnterpriseProjectElement} entity.
   */
  toEnterpriseProjectElement: EnterpriseProjectElement<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectJva} entity.
   */
  toEnterpriseProjectJva?: EnterpriseProjectJva<T> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjBlkFunc} entity.
   */
  toEntProjBlkFunc?: EnterpriseProjBlkFunc<T> | null;
  /**
   * One-to-one navigation property to the {@link EntProjectPublicSector} entity.
   */
  toEntProjectPublicSector?: EntProjectPublicSector<T> | null;
  /**
   * One-to-many navigation property to the {@link EnterpriseProjectRole} entity.
   */
  toEntProjRole: EnterpriseProjectRole<T>[];
  /**
   * One-to-many navigation property to the {@link EnterpriseProjectTeamMember} entity.
   */
  toEntProjTeamMember: EnterpriseProjectTeamMember<T>[];
  constructor(_entityApi: EnterpriseProjectApi<T>);
}
export interface EnterpriseProjectType<
  T extends DeSerializers = DefaultDeSerializers
> {
  changeEntProjProcgStatusAc?: DeserializedType<T, 'Edm.Boolean'> | null;
  copyToActiveDocumentAc?: DeserializedType<T, 'Edm.Boolean'> | null;
  actualEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  actualStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  availabilityControlIsActiveFc?: DeserializedType<T, 'Edm.Byte'> | null;
  availabilityControlProfileFc?: DeserializedType<T, 'Edm.Byte'> | null;
  controllingAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  costingSheetFc?: DeserializedType<T, 'Edm.Byte'> | null;
  enterpriseProjectTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  entProjIsMultiSlsOrdItmsEnbldFc?: DeserializedType<T, 'Edm.Byte'> | null;
  functionalAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  functionalLocationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  investmentProfileFc?: DeserializedType<T, 'Edm.Byte'> | null;
  isBillingRelevantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  locationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  plantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  priorityCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  profitCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  projectFc?: DeserializedType<T, 'Edm.Byte'> | null;
  projectCurrencyFc?: DeserializedType<T, 'Edm.Byte'> | null;
  projectDescriptionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  projectEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  projectProfileCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  projectStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  responsibleCostCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  resultAnalysisInternalIdFc?: DeserializedType<T, 'Edm.Byte'> | null;
  deleteMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  updateMc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEnterpriseProjectElementOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEntProjBlkFuncOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEntProjRoleOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  toEntProjTeamMemberOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  projectUuid: DeserializedType<T, 'Edm.Guid'>;
  projectInternalId?: DeserializedType<T, 'Edm.String'> | null;
  project?: DeserializedType<T, 'Edm.String'> | null;
  projectDescription?: DeserializedType<T, 'Edm.String'> | null;
  enterpriseProjectType?: DeserializedType<T, 'Edm.String'> | null;
  priorityCode?: DeserializedType<T, 'Edm.String'> | null;
  projectStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  projectEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  actualStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  actualEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  customerUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  enterpriseProjectServiceOrg?: DeserializedType<T, 'Edm.String'> | null;
  entProjectIsConfidential?: DeserializedType<T, 'Edm.Boolean'> | null;
  restrictedTimePosting?: DeserializedType<T, 'Edm.String'> | null;
  processingStatus?: DeserializedType<T, 'Edm.String'> | null;
  responsibleCostCenter?: DeserializedType<T, 'Edm.String'> | null;
  profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  projectProfileCode?: DeserializedType<T, 'Edm.String'> | null;
  functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  companyCode?: DeserializedType<T, 'Edm.String'> | null;
  controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  plant?: DeserializedType<T, 'Edm.String'> | null;
  location?: DeserializedType<T, 'Edm.String'> | null;
  taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
  projectCurrency?: DeserializedType<T, 'Edm.String'> | null;
  availabilityControlProfile?: DeserializedType<T, 'Edm.String'> | null;
  availabilityControlIsActive?: DeserializedType<T, 'Edm.Boolean'> | null;
  functionalLocation?: DeserializedType<T, 'Edm.String'> | null;
  isBillingRelevant?: DeserializedType<T, 'Edm.Boolean'> | null;
  investmentProfile?: DeserializedType<T, 'Edm.String'> | null;
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  projectLastChangedDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  entProjIsMultiSlsOrdItmsEnbld?: DeserializedType<T, 'Edm.Boolean'> | null;
  resultAnalysisInternalId?: DeserializedType<T, 'Edm.String'> | null;
  costingSheet?: DeserializedType<T, 'Edm.String'> | null;
  createdByUser?: DeserializedType<T, 'Edm.String'> | null;
  creationDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  toEnterpriseProjectElement: EnterpriseProjectElementType<T>[];
  toEnterpriseProjectJva?: EnterpriseProjectJvaType<T> | null;
  toEntProjBlkFunc?: EnterpriseProjBlkFuncType<T> | null;
  toEntProjectPublicSector?: EntProjectPublicSectorType<T> | null;
  toEntProjRole: EnterpriseProjectRoleType<T>[];
  toEntProjTeamMember: EnterpriseProjectTeamMemberType<T>[];
}
