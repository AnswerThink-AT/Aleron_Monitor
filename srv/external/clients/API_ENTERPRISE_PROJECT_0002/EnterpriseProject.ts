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
export class EnterpriseProject<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements EnterpriseProjectType<T>
{
  /**
   * Technical entity name for EnterpriseProject.
   */
  static override _entityName = 'A_EnterpriseProject';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002';
  /**
   * All key fields of the EnterpriseProject entity.
   */
  static _keys = ['ProjectUUID'];
  /**
   * Dyn. Action Control.
   * @nullable
   */
  declare changeEntProjProcgStatusAc?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Dyn. Action Control.
   * @nullable
   */
  declare copyToActiveDocumentAc?: DeserializedType<T, 'Edm.Boolean'> | null;
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
  declare availabilityControlIsActiveFc?: DeserializedType<
    T,
    'Edm.Byte'
  > | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare availabilityControlProfileFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare controllingAreaFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare costingSheetFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare enterpriseProjectTypeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare entProjIsMultiSlsOrdItmsEnbldFc?: DeserializedType<
    T,
    'Edm.Byte'
  > | null;
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
  declare isBillingRelevantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare locationFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare plantFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare priorityCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare profitCenterFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare projectFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare projectCurrencyFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare projectDescriptionFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare projectEndDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare projectProfileCodeFc?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * Dyn. Field Control.
   * @nullable
   */
  declare projectStartDateFc?: DeserializedType<T, 'Edm.Byte'> | null;
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
  declare toEnterpriseProjectElementOc?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toEntProjBlkFuncOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toEntProjRoleOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Dynamic CbA-Control.
   * @nullable
   */
  declare toEntProjTeamMemberOc?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Entity Guid.
   */
  declare projectUuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Project (internal).
   * Maximum length: 8.
   * @nullable
   */
  declare projectInternalId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project ID.
   * Maximum length: 24.
   * @nullable
   */
  declare project?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Description.
   * Maximum length: 60.
   * @nullable
   */
  declare projectDescription?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project Type.
   * Maximum length: 2.
   * @nullable
   */
  declare enterpriseProjectType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Priority.
   * Maximum length: 3.
   * @nullable
   */
  declare priorityCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Planned Start Date.
   * @nullable
   */
  declare projectStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Planned Finish Date.
   * @nullable
   */
  declare projectEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
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
   * Business Partner GUID.
   * @nullable
   */
  declare customerUuid?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Service Organization.
   * Maximum length: 5.
   * @nullable
   */
  declare enterpriseProjectServiceOrg?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Enterprise Project Is Confidential.
   * @nullable
   */
  declare entProjectIsConfidential?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Restrict Unstaffed Posting.
   * Maximum length: 1.
   * @nullable
   */
  declare restrictedTimePosting?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Object Processing Status.
   * Maximum length: 2.
   * @nullable
   */
  declare processingStatus?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Responsible Cost Center.
   * Maximum length: 10.
   * @nullable
   */
  declare responsibleCostCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Profit Center.
   * Maximum length: 10.
   * @nullable
   */
  declare profitCenter?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Project Profile.
   * Maximum length: 7.
   * @nullable
   */
  declare projectProfileCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Functional Area.
   * Maximum length: 16.
   * @nullable
   */
  declare functionalArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company code for the project.
   * Maximum length: 4.
   * @nullable
   */
  declare companyCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Controlling area for the project.
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
   * Project Currency.
   * Maximum length: 5.
   * @nullable
   */
  declare projectCurrency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Budget Availability Control: Profile.
   * Maximum length: 6.
   * @nullable
   */
  declare availabilityControlProfile?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Availability control indicator(AVC).
   * @nullable
   */
  declare availabilityControlIsActive?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Functional Location.
   * Maximum length: 40.
   * @nullable
   */
  declare functionalLocation?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Billing element.
   * @nullable
   */
  declare isBillingRelevant?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Investment Measure Profile.
   * Maximum length: 6.
   * @nullable
   */
  declare investmentProfile?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Timestamp of Last Object Change.
   * @nullable
   */
  declare lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Timestamp on which project data was changed last.
   * @nullable
   */
  declare projectLastChangedDateTime?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Name of Person Who Changed Object.
   * Maximum length: 12.
   * @nullable
   */
  declare lastChangedByUser?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Enterprise Project Assigned to Multiple SO Items.
   * @nullable
   */
  declare entProjIsMultiSlsOrdItmsEnbld?: DeserializedType<
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
   * Costing Sheet.
   * Maximum length: 6.
   * @nullable
   */
  declare costingSheet?: DeserializedType<T, 'Edm.String'> | null;
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
   * One-to-many navigation property to the {@link EnterpriseProjectElement} entity.
   */
  declare toEnterpriseProjectElement: EnterpriseProjectElement<T>[];
  /**
   * One-to-one navigation property to the {@link EnterpriseProjectJva} entity.
   */
  declare toEnterpriseProjectJva?: EnterpriseProjectJva<T> | null;
  /**
   * One-to-one navigation property to the {@link EnterpriseProjBlkFunc} entity.
   */
  declare toEntProjBlkFunc?: EnterpriseProjBlkFunc<T> | null;
  /**
   * One-to-one navigation property to the {@link EntProjectPublicSector} entity.
   */
  declare toEntProjectPublicSector?: EntProjectPublicSector<T> | null;
  /**
   * One-to-many navigation property to the {@link EnterpriseProjectRole} entity.
   */
  declare toEntProjRole: EnterpriseProjectRole<T>[];
  /**
   * One-to-many navigation property to the {@link EnterpriseProjectTeamMember} entity.
   */
  declare toEntProjTeamMember: EnterpriseProjectTeamMember<T>[];

  constructor(_entityApi: EnterpriseProjectApi<T>) {
    super(_entityApi);
  }
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
