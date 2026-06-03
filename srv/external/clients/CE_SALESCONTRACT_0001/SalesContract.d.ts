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
} from '@sap-cloud-sdk/odata-v4';
import { Sap_Message } from './Sap_Message';
import type { SalesContractApi } from './SalesContractApi';
import { SalesContractItem, SalesContractItemType } from './SalesContractItem';
import {
  SlsContrPricingElement,
  SlsContrPricingElementType
} from './SlsContrPricingElement';
import { SalesContractText, SalesContractTextType } from './SalesContractText';
/**
 * This class represents the entity "SalesContract" of service "com.sap.gateway.srvd_a2x.api_salescontract.v0001".
 */
export declare class SalesContract<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements SalesContractType<T>
{
  /**
   * Technical entity name for SalesContract.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the SalesContract entity.
   */
  static _keys: string[];
  /**
   * Sales Contract.
   * Maximum length: 10.
   */
  salesContract: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Contract Type.
   * Maximum length: 4.
   */
  salesContractType: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Organization.
   * Maximum length: 4.
   */
  salesOrganization: DeserializedType<T, 'Edm.String'>;
  /**
   * Distribution Channel.
   * Maximum length: 2.
   */
  distributionChannel: DeserializedType<T, 'Edm.String'>;
  /**
   * Organization Division.
   * Maximum length: 2.
   */
  organizationDivision: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Group.
   * Maximum length: 3.
   */
  salesGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Office.
   * Maximum length: 4.
   */
  salesOffice: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales District.
   * Maximum length: 6.
   */
  salesDistrict: DeserializedType<T, 'Edm.String'>;
  /**
   * Sold To Party.
   * Maximum length: 10.
   */
  soldToParty: DeserializedType<T, 'Edm.String'>;
  /**
   * Creation Date.
   * @nullable
   */
  creationDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Created By User.
   * Maximum length: 12.
   */
  createdByUser: DeserializedType<T, 'Edm.String'>;
  /**
   * Last Change Date.
   * @nullable
   */
  lastChangeDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Last Change Date Time.
   * @nullable
   */
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Purchase Order By Customer.
   * Maximum length: 35.
   */
  purchaseOrderByCustomer: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer Purchase Order Type.
   * Maximum length: 4.
   */
  customerPurchaseOrderType: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer Purchase Order Date.
   * @nullable
   */
  customerPurchaseOrderDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Sales Contract Date.
   * @nullable
   */
  salesContractDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Total Net Amount.
   */
  totalNetAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Transaction Currency.
   * Maximum length: 3.
   */
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Sd Document Reason.
   * Maximum length: 3.
   */
  sdDocumentReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer Group.
   * Maximum length: 2.
   */
  customerGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Shipping Condition.
   * Maximum length: 2.
   */
  shippingCondition: DeserializedType<T, 'Edm.String'>;
  /**
   * Pricing Date.
   * @nullable
   */
  pricingDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Billing Document Date.
   * @nullable
   */
  billingDocumentDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Sd Pricing Procedure.
   * Maximum length: 6.
   */
  sdPricingProcedure: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer Price Group.
   * Maximum length: 2.
   */
  customerPriceGroup: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Classification.
   * Maximum length: 3.
   */
  incotermsClassification: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Transfer Location.
   * Maximum length: 28.
   */
  incotermsTransferLocation: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Location 1.
   * Maximum length: 70.
   */
  incotermsLocation1: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Location 2.
   * Maximum length: 70.
   */
  incotermsLocation2: DeserializedType<T, 'Edm.String'>;
  /**
   * Incoterms Version.
   * Maximum length: 4.
   */
  incotermsVersion: DeserializedType<T, 'Edm.String'>;
  /**
   * Customer Payment Terms.
   * Maximum length: 4.
   */
  customerPaymentTerms: DeserializedType<T, 'Edm.String'>;
  /**
   * Payment Method.
   * Maximum length: 1.
   */
  paymentMethod: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Contract Validity Start Date.
   * @nullable
   */
  salesContractValidityStartDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Sales Contract Validity End Date.
   * @nullable
   */
  salesContractValidityEndDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Reference Sd Document.
   * Maximum length: 10.
   */
  referenceSdDocument: DeserializedType<T, 'Edm.String'>;
  /**
   * Reference Sd Document Category.
   * Maximum length: 4.
   */
  referenceSdDocumentCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Doc Approval Status.
   * Maximum length: 1.
   */
  salesDocApprovalStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Contract Approval Reason.
   * Maximum length: 4.
   */
  salesContractApprovalReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Overall Sd Process Status.
   * Maximum length: 1.
   */
  overallSdProcessStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Total Credit Check Status.
   * Maximum length: 1.
   */
  totalCreditCheckStatus: DeserializedType<T, 'Edm.String'>;
  /**
   * Overall Sd Document Rejection Sts.
   * Maximum length: 1.
   */
  overallSdDocumentRejectionSts: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-many navigation property to the {@link SalesContractItem} entity.
   */
  item: SalesContractItem<T>[];
  /**
   * One-to-many navigation property to the {@link SlsContrPricingElement} entity.
   */
  pricingElement: SlsContrPricingElement<T>[];
  /**
   * One-to-many navigation property to the {@link SalesContractText} entity.
   */
  text: SalesContractText<T>[];
  constructor(_entityApi: SalesContractApi<T>);
}
export interface SalesContractType<
  T extends DeSerializers = DefaultDeSerializers
> {
  salesContract: DeserializedType<T, 'Edm.String'>;
  salesContractType: DeserializedType<T, 'Edm.String'>;
  salesOrganization: DeserializedType<T, 'Edm.String'>;
  distributionChannel: DeserializedType<T, 'Edm.String'>;
  organizationDivision: DeserializedType<T, 'Edm.String'>;
  salesGroup: DeserializedType<T, 'Edm.String'>;
  salesOffice: DeserializedType<T, 'Edm.String'>;
  salesDistrict: DeserializedType<T, 'Edm.String'>;
  soldToParty: DeserializedType<T, 'Edm.String'>;
  creationDate?: DeserializedType<T, 'Edm.Date'> | null;
  createdByUser: DeserializedType<T, 'Edm.String'>;
  lastChangeDate?: DeserializedType<T, 'Edm.Date'> | null;
  lastChangeDateTime?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  purchaseOrderByCustomer: DeserializedType<T, 'Edm.String'>;
  customerPurchaseOrderType: DeserializedType<T, 'Edm.String'>;
  customerPurchaseOrderDate?: DeserializedType<T, 'Edm.Date'> | null;
  salesContractDate?: DeserializedType<T, 'Edm.Date'> | null;
  totalNetAmount: DeserializedType<T, 'Edm.Decimal'>;
  transactionCurrency: DeserializedType<T, 'Edm.String'>;
  sdDocumentReason: DeserializedType<T, 'Edm.String'>;
  customerGroup: DeserializedType<T, 'Edm.String'>;
  shippingCondition: DeserializedType<T, 'Edm.String'>;
  pricingDate?: DeserializedType<T, 'Edm.Date'> | null;
  billingDocumentDate?: DeserializedType<T, 'Edm.Date'> | null;
  sdPricingProcedure: DeserializedType<T, 'Edm.String'>;
  customerPriceGroup: DeserializedType<T, 'Edm.String'>;
  incotermsClassification: DeserializedType<T, 'Edm.String'>;
  incotermsTransferLocation: DeserializedType<T, 'Edm.String'>;
  incotermsLocation1: DeserializedType<T, 'Edm.String'>;
  incotermsLocation2: DeserializedType<T, 'Edm.String'>;
  incotermsVersion: DeserializedType<T, 'Edm.String'>;
  customerPaymentTerms: DeserializedType<T, 'Edm.String'>;
  paymentMethod: DeserializedType<T, 'Edm.String'>;
  salesContractValidityStartDate?: DeserializedType<T, 'Edm.Date'> | null;
  salesContractValidityEndDate?: DeserializedType<T, 'Edm.Date'> | null;
  referenceSdDocument: DeserializedType<T, 'Edm.String'>;
  referenceSdDocumentCategory: DeserializedType<T, 'Edm.String'>;
  salesDocApprovalStatus: DeserializedType<T, 'Edm.String'>;
  salesContractApprovalReason: DeserializedType<T, 'Edm.String'>;
  overallSdProcessStatus: DeserializedType<T, 'Edm.String'>;
  totalCreditCheckStatus: DeserializedType<T, 'Edm.String'>;
  overallSdDocumentRejectionSts: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  item: SalesContractItemType<T>[];
  pricingElement: SlsContrPricingElementType<T>[];
  text: SalesContractTextType<T>[];
}
