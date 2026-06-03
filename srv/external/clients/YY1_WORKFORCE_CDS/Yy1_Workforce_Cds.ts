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
export class Yy1_Workforce_Cds<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements Yy1_Workforce_CdsType<T>
{
  /**
   * Technical entity name for Yy1_Workforce_Cds.
   */
  static override _entityName = 'YY1_workforce_cds';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/YY1_WORKFORCE_CDS_CDS';
  /**
   * All key fields of the Yy1_Workforce_Cds entity.
   */
  static _keys = ['WorkforcePersonExternalID'];
  /**
   * External Person ID.
   * Maximum length: 100.
   */
  declare workforcePersonExternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * First Name of Business Partner (Person).
   * Maximum length: 40.
   * @nullable
   */
  declare firstName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner Number.
   * Maximum length: 10.
   * @nullable
   */
  declare businessPartner?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Middle Name or Second Forename of a Person.
   * Maximum length: 40.
   * @nullable
   */
  declare middleName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Authorization Group.
   * Maximum length: 4.
   * @nullable
   */
  declare authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController10?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController8?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController9?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController7?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController6?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller (Internal Use Only).
   * Maximum length: 30.
   * @nullable
   */
  declare dataController1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * BP: Data Controller Set Flag.
   * Maximum length: 1.
   * @nullable
   */
  declare dataControllerSet?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Purpose Completed Flag.
   * Maximum length: 1.
   * @nullable
   */
  declare isBusinessPurposeCompleted?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Business Partner: Correspondence Language.
   * Maximum length: 2.
   * @nullable
   */
  declare nativePreferredLanguage?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * "Middle Initial" or personal initials.
   * Maximum length: 10.
   * @nullable
   */
  declare initials?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name at birth of business partner.
   * Maximum length: 40.
   * @nullable
   */
  declare birthName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Full Name.
   * Maximum length: 80.
   * @nullable
   */
  declare fullName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Last Name of Business Partner (Person).
   * Maximum length: 40.
   * @nullable
   */
  declare lastName?: DeserializedType<T, 'Edm.String'> | null;

  constructor(_entityApi: Yy1_Workforce_CdsApi<T>) {
    super(_entityApi);
  }
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
