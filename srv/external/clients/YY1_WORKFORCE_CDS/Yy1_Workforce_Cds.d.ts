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
import type { Yy1_Workforce_CdsApi } from './Yy1_Workforce_CdsApi';
/**
 * This class represents the entity "YY1_workforce_cds" of service "YY1_WORKFORCE_CDS_CDS".
 */
export declare class Yy1_Workforce_Cds<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements Yy1_Workforce_CdsType<T>
{
  /**
   * Technical entity name for Yy1_Workforce_Cds.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the Yy1_Workforce_Cds entity.
   */
  static _keys: string[];
  /**
   * External Person ID.
   * Maximum length: 100.
   */
  workforcePersonExternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * First Name of Business Partner (Person).
   * Maximum length: 40.
   * @nullable
   */
  firstName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner Number.
   * Maximum length: 10.
   * @nullable
   */
  businessPartner?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Middle Name or Second Forename of a Person.
   * Maximum length: 40.
   * @nullable
   */
  middleName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Authorization Group.
   * Maximum length: 4.
   * @nullable
   */
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController10?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController8?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController9?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController7?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController6?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  dataController1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller Set Flag.
   * Maximum length: 1.
   * @nullable
   */
  dataControllerSet?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Purpose Completed Flag.
   * Maximum length: 1.
   * @nullable
   */
  isBusinessPurposeCompleted?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner: Correspondence Language.
   * Maximum length: 2.
   * @nullable
   */
  nativePreferredLanguage?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * "Middle Initial" or personal initials.
   * Maximum length: 10.
   * @nullable
   */
  initials?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name at birth of business partner.
   * Maximum length: 40.
   * @nullable
   */
  birthName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Full Name.
   * Maximum length: 80.
   * @nullable
   */
  fullName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Last Name of Business Partner (Person).
   * Maximum length: 40.
   * @nullable
   */
  lastName?: DeserializedType<T, 'Edm.String'> | null;
  constructor(_entityApi: Yy1_Workforce_CdsApi<T>);
}
export interface Yy1_Workforce_CdsType<
  T extends DeSerializers = DefaultDeSerializers
> {
  workforcePersonExternalId: DeserializedType<T, 'Edm.String'>;
  firstName?: DeserializedType<T, 'Edm.String'> | null;
  businessPartner?: DeserializedType<T, 'Edm.String'> | null;
  middleName?: DeserializedType<T, 'Edm.String'> | null;
  authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  dataController10?: DeserializedType<T, 'Edm.String'> | null;
  dataController8?: DeserializedType<T, 'Edm.String'> | null;
  dataController9?: DeserializedType<T, 'Edm.String'> | null;
  dataController7?: DeserializedType<T, 'Edm.String'> | null;
  dataController6?: DeserializedType<T, 'Edm.String'> | null;
  dataController5?: DeserializedType<T, 'Edm.String'> | null;
  dataController4?: DeserializedType<T, 'Edm.String'> | null;
  dataController3?: DeserializedType<T, 'Edm.String'> | null;
  dataController2?: DeserializedType<T, 'Edm.String'> | null;
  dataController1?: DeserializedType<T, 'Edm.String'> | null;
  dataControllerSet?: DeserializedType<T, 'Edm.String'> | null;
  isBusinessPurposeCompleted?: DeserializedType<T, 'Edm.String'> | null;
  nativePreferredLanguage?: DeserializedType<T, 'Edm.String'> | null;
  initials?: DeserializedType<T, 'Edm.String'> | null;
  birthName?: DeserializedType<T, 'Edm.String'> | null;
  fullName?: DeserializedType<T, 'Edm.String'> | null;
  lastName?: DeserializedType<T, 'Edm.String'> | null;
}
