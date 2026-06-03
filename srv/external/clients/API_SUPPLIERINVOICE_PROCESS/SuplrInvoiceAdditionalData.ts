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
import type { SuplrInvoiceAdditionalDataApi } from './SuplrInvoiceAdditionalDataApi';

/**
 * This class represents the entity "A_SuplrInvoiceAdditionalData" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
export class SuplrInvoiceAdditionalData<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SuplrInvoiceAdditionalDataType<T>
{
  /**
   * Technical entity name for SuplrInvoiceAdditionalData.
   */
  static override _entityName = 'A_SuplrInvoiceAdditionalData';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
  /**
   * All key fields of the SuplrInvoiceAdditionalData entity.
   */
  static _keys = ['SupplierInvoice', 'FiscalYear'];
  /**
   * Document Number of an Invoice Document.
   * Maximum length: 10.
   */
  declare supplierInvoice: DeserializedType<T, 'Edm.String'>;
  /**
   * Fiscal Year.
   * Maximum length: 4.
   */
  declare fiscalYear: DeserializedType<T, 'Edm.String'>;
  /**
   * Name.
   * Maximum length: 35.
   * @nullable
   */
  declare invoicingPartyName1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 2.
   * Maximum length: 35.
   * @nullable
   */
  declare invoicingPartyName2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 3.
   * Maximum length: 35.
   * @nullable
   */
  declare invoicingPartyName3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name 4.
   * Maximum length: 35.
   * @nullable
   */
  declare invoicingPartyName4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Postal Code.
   * Maximum length: 10.
   * @nullable
   */
  declare postalCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * City.
   * Maximum length: 35.
   * @nullable
   */
  declare cityName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region Key.
   * Maximum length: 3.
   * @nullable
   */
  declare country?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Street and House Number.
   * Maximum length: 35.
   * @nullable
   */
  declare streetAddressName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * PO Box.
   * Maximum length: 10.
   * @nullable
   */
  declare poBox?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * P.O. Box Postal Code.
   * Maximum length: 10.
   * @nullable
   */
  declare poBoxPostalCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * PO Bank Current Acct No. or Building Society Ref. No.
   * Maximum length: 16.
   * @nullable
   */
  declare postOfficeBankAccount?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Bank Account Number.
   * Maximum length: 18.
   * @nullable
   */
  declare bankAccount?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Bank Number.
   * Maximum length: 15.
   * @nullable
   */
  declare bank?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Bank Country/Region Key.
   * Maximum length: 3.
   * @nullable
   */
  declare bankCountry?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 1.
   * Maximum length: 16.
   * @nullable
   */
  declare taxId1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 2.
   * Maximum length: 11.
   * @nullable
   */
  declare taxId2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 3.
   * Maximum length: 18.
   * @nullable
   */
  declare taxId3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 4.
   * Maximum length: 18.
   * @nullable
   */
  declare taxId4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number 5.
   * Maximum length: 60.
   * @nullable
   */
  declare taxId5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Liable for VAT.
   * @nullable
   */
  declare oneTmeAccountIsVatLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Checkbox.
   * @nullable
   */
  declare oneTmeAcctIsEqualizationTxSubj?: DeserializedType<
    T,
    'Edm.Boolean'
  > | null;
  /**
   * Region (State, Province, County).
   * Maximum length: 3.
   * @nullable
   */
  declare region?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Bank Control Key.
   * Maximum length: 2.
   * @nullable
   */
  declare bankControlKey?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Instruction Key for Data Medium Exchange.
   * Maximum length: 2.
   * @nullable
   */
  declare dataExchangeInstructionKey?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Recipient Code for Data Medium Exchange.
   * Maximum length: 1.
   * @nullable
   */
  declare dataMediumExchangeIndicator?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * Language Key.
   * Maximum length: 2.
   * @nullable
   */
  declare languageCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Indicator: Is the Account a One-Time Account?.
   * @nullable
   */
  declare isOneTimeAccount?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Payment Recipient Code.
   * Maximum length: 16.
   * @nullable
   */
  declare paymentRecipient?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Type.
   * Maximum length: 2.
   * @nullable
   */
  declare accountTaxType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Tax Number Type.
   * Maximum length: 2.
   * @nullable
   */
  declare taxNumberType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Checkbox.
   * @nullable
   */
  declare isNaturalPerson?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Reference Details for Bank Details.
   * Maximum length: 20.
   * @nullable
   */
  declare bankDetailReference?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Name of Representative.
   * Maximum length: 10.
   * @nullable
   */
  declare representativeName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Type of Business.
   * Maximum length: 30.
   * @nullable
   */
  declare businessType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Type of Industry.
   * Maximum length: 30.
   * @nullable
   */
  declare industryType?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Title.
   * Maximum length: 15.
   * @nullable
   */
  declare formOfAddressName?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * VAT Registration Number.
   * Maximum length: 20.
   * @nullable
   */
  declare vatRegistration?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Country/Region specific Ref. in the One Time Account Data.
   * Maximum length: 140.
   * @nullable
   */
  declare oneTimeAcctCntrySpecificRef1?: DeserializedType<
    T,
    'Edm.String'
  > | null;
  /**
   * IBAN (International Bank Account Number).
   * Maximum length: 34.
   * @nullable
   */
  declare iban?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * SWIFT/BIC for International Payments.
   * Maximum length: 11.
   * @nullable
   */
  declare swiftCode?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Internet address of partner company clerk.
   * Maximum length: 130.
   * @nullable
   */
  declare oneTimeBusinessPartnerEmail?: DeserializedType<
    T,
    'Edm.String'
  > | null;

  constructor(_entityApi: SuplrInvoiceAdditionalDataApi<T>) {
    super(_entityApi);
  }
}

export interface SuplrInvoiceAdditionalDataType<
  T extends DeSerializers = DefaultDeSerializers
> {
  supplierInvoice: DeserializedType<T, 'Edm.String'>;
  fiscalYear: DeserializedType<T, 'Edm.String'>;
  invoicingPartyName1?: DeserializedType<T, 'Edm.String'> | null;
  invoicingPartyName2?: DeserializedType<T, 'Edm.String'> | null;
  invoicingPartyName3?: DeserializedType<T, 'Edm.String'> | null;
  invoicingPartyName4?: DeserializedType<T, 'Edm.String'> | null;
  postalCode?: DeserializedType<T, 'Edm.String'> | null;
  cityName?: DeserializedType<T, 'Edm.String'> | null;
  country?: DeserializedType<T, 'Edm.String'> | null;
  streetAddressName?: DeserializedType<T, 'Edm.String'> | null;
  poBox?: DeserializedType<T, 'Edm.String'> | null;
  poBoxPostalCode?: DeserializedType<T, 'Edm.String'> | null;
  postOfficeBankAccount?: DeserializedType<T, 'Edm.String'> | null;
  bankAccount?: DeserializedType<T, 'Edm.String'> | null;
  bank?: DeserializedType<T, 'Edm.String'> | null;
  bankCountry?: DeserializedType<T, 'Edm.String'> | null;
  taxId1?: DeserializedType<T, 'Edm.String'> | null;
  taxId2?: DeserializedType<T, 'Edm.String'> | null;
  taxId3?: DeserializedType<T, 'Edm.String'> | null;
  taxId4?: DeserializedType<T, 'Edm.String'> | null;
  taxId5?: DeserializedType<T, 'Edm.String'> | null;
  oneTmeAccountIsVatLiable?: DeserializedType<T, 'Edm.Boolean'> | null;
  oneTmeAcctIsEqualizationTxSubj?: DeserializedType<T, 'Edm.Boolean'> | null;
  region?: DeserializedType<T, 'Edm.String'> | null;
  bankControlKey?: DeserializedType<T, 'Edm.String'> | null;
  dataExchangeInstructionKey?: DeserializedType<T, 'Edm.String'> | null;
  dataMediumExchangeIndicator?: DeserializedType<T, 'Edm.String'> | null;
  languageCode?: DeserializedType<T, 'Edm.String'> | null;
  isOneTimeAccount?: DeserializedType<T, 'Edm.Boolean'> | null;
  paymentRecipient?: DeserializedType<T, 'Edm.String'> | null;
  accountTaxType?: DeserializedType<T, 'Edm.String'> | null;
  taxNumberType?: DeserializedType<T, 'Edm.String'> | null;
  isNaturalPerson?: DeserializedType<T, 'Edm.Boolean'> | null;
  bankDetailReference?: DeserializedType<T, 'Edm.String'> | null;
  representativeName?: DeserializedType<T, 'Edm.String'> | null;
  businessType?: DeserializedType<T, 'Edm.String'> | null;
  industryType?: DeserializedType<T, 'Edm.String'> | null;
  formOfAddressName?: DeserializedType<T, 'Edm.String'> | null;
  vatRegistration?: DeserializedType<T, 'Edm.String'> | null;
  oneTimeAcctCntrySpecificRef1?: DeserializedType<T, 'Edm.String'> | null;
  iban?: DeserializedType<T, 'Edm.String'> | null;
  swiftCode?: DeserializedType<T, 'Edm.String'> | null;
  oneTimeBusinessPartnerEmail?: DeserializedType<T, 'Edm.String'> | null;
}
