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
import type { CompanyCodeApi } from './CompanyCodeApi';
/**
 * This class represents the entity "A_CompanyCode" of service "API_COMPANYCODE_SRV".
 */
export declare class CompanyCode<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements CompanyCodeType<T>
{
  /**
   * Technical entity name for CompanyCode.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the CompanyCode entity.
   */
  static _keys: string[];
  /**
   * Company Code.
   * Maximum length: 4.
   */
  companyCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Name of Company Code or Company.
   * Maximum length: 25.
   * @nullable
   */
  companyCodeName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * City.
   * Maximum length: 25.
   * @nullable
   */
  cityName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Key.
   * Maximum length: 3.
   * @nullable
   */
  country?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Currency Key.
   * Maximum length: 5.
   * @nullable
   */
  currency?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Language Key.
   * Maximum length: 2.
   * @nullable
   */
  language?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Chart of Accounts.
   * Maximum length: 4.
   * @nullable
   */
  chartOfAccounts?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Fiscal Year Variant.
   * Maximum length: 2.
   * @nullable
   */
  fiscalYearVariant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Company.
   * Maximum length: 6.
   * @nullable
   */
  company?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Credit Control Area.
   * Maximum length: 4.
   * @nullable
   */
  creditControlArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Alternative Chart of Accounts.
   * Maximum length: 4.
   * @nullable
   */
  countryChartOfAccounts?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Financial Management Area.
   * Maximum length: 4.
   * @nullable
   */
  financialManagementArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Address.
   * Maximum length: 10.
   * @nullable
   */
  addressId?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Taxes on Sales/Purchases Group.
   * Maximum length: 4.
   * @nullable
   */
  taxableEntity?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * VAT Registration Number.
   * Maximum length: 20.
   * @nullable
   */
  vatRegistration?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Extended Withholding Tax Active.
   * @nullable
   */
  extendedWhldgTaxIsActive?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Controlling Area.
   * Maximum length: 4.
   * @nullable
   */
  controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Field Status Variant.
   * Maximum length: 4.
   * @nullable
   */
  fieldStatusVariant?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Output Tax Code for Non-Taxable Transactions.
   * Maximum length: 2.
   * @nullable
   */
  nonTaxableTransactionTaxCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Document Date As the Basis for Tax Determination.
   * @nullable
   */
  docDateIsUsedForTaxDetn?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Tax Reporting Date Active in Documents.
   * @nullable
   */
  taxRptgDateIsActive?: DeserializedType<T, 'Edm.Boolean'> | null;
  constructor(_entityApi: CompanyCodeApi<T>);
}
export interface CompanyCodeType<
  T extends DeSerializers = DefaultDeSerializers
> {
  companyCode: DeserializedType<T, 'Edm.String'>;
  companyCodeName?: DeserializedType<T, 'Edm.String'> | null;
  cityName?: DeserializedType<T, 'Edm.String'> | null;
  country?: DeserializedType<T, 'Edm.String'> | null;
  currency?: DeserializedType<T, 'Edm.String'> | null;
  language?: DeserializedType<T, 'Edm.String'> | null;
  chartOfAccounts?: DeserializedType<T, 'Edm.String'> | null;
  fiscalYearVariant?: DeserializedType<T, 'Edm.String'> | null;
  company?: DeserializedType<T, 'Edm.String'> | null;
  creditControlArea?: DeserializedType<T, 'Edm.String'> | null;
  countryChartOfAccounts?: DeserializedType<T, 'Edm.String'> | null;
  financialManagementArea?: DeserializedType<T, 'Edm.String'> | null;
  addressId?: DeserializedType<T, 'Edm.String'> | null;
  taxableEntity?: DeserializedType<T, 'Edm.String'> | null;
  vatRegistration?: DeserializedType<T, 'Edm.String'> | null;
  extendedWhldgTaxIsActive?: DeserializedType<T, 'Edm.Boolean'> | null;
  controllingArea?: DeserializedType<T, 'Edm.String'> | null;
  fieldStatusVariant?: DeserializedType<T, 'Edm.String'> | null;
  nonTaxableTransactionTaxCode?: DeserializedType<T, 'Edm.String'> | null;
  docDateIsUsedForTaxDetn?: DeserializedType<T, 'Edm.Boolean'> | null;
  taxRptgDateIsActive?: DeserializedType<T, 'Edm.Boolean'> | null;
}
