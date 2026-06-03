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
import type { PurchaseOrderAccountAssignmentApi } from './PurchaseOrderAccountAssignmentApi';
import { PurchaseOrder, PurchaseOrderType } from './PurchaseOrder';
import { PurchaseOrderItem, PurchaseOrderItemType } from './PurchaseOrderItem';
/**
 * This class represents the entity "PurchaseOrderAccountAssignment" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
export declare class PurchaseOrderAccountAssignment<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements PurchaseOrderAccountAssignmentType<T>
{
  /**
   * Technical entity name for PurchaseOrderAccountAssignment.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the PurchaseOrderAccountAssignment entity.
   */
  static _keys: string[];
  /**
   * Purchase Order.
   * Maximum length: 10.
   */
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchase Order Item.
   * Maximum length: 5.
   */
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Account Assignment Number.
   * Maximum length: 2.
   */
  accountAssignmentNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Cost Center.
   * Maximum length: 10.
   */
  costCenter: DeserializedType<T, 'Edm.String'>;
  /**
   * Master Fixed Asset.
   * Maximum length: 12.
   */
  masterFixedAsset: DeserializedType<T, 'Edm.String'>;
  /**
   * Project Network.
   * Maximum length: 12.
   */
  projectNetwork: DeserializedType<T, 'Edm.String'>;
  /**
   * Network Activity.
   * Maximum length: 4.
   */
  networkActivity: DeserializedType<T, 'Edm.String'>;
  /**
   * Order Quantity Unit.
   * Maximum length: 3.
   */
  orderQuantityUnit: DeserializedType<T, 'Edm.String'>;
  /**
   * Quantity.
   */
  quantity: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Multiple Acct Assgmt Distr Percent.
   */
  multipleAcctAssgmtDistrPercent: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Document Currency.
   * Maximum length: 3.
   */
  documentCurrency: DeserializedType<T, 'Edm.String'>;
  /**
   * Purg Doc Net Amount.
   */
  purgDocNetAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Is Deleted.
   */
  isDeleted: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Gl Account.
   * Maximum length: 10.
   */
  glAccount: DeserializedType<T, 'Edm.String'>;
  /**
   * Business Area.
   * Maximum length: 4.
   */
  businessArea: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Order.
   * Maximum length: 10.
   */
  salesOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Order Item.
   * Maximum length: 6.
   */
  salesOrderItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Sales Order Schedule Line.
   * Maximum length: 4.
   */
  salesOrderScheduleLine: DeserializedType<T, 'Edm.String'>;
  /**
   * Fixed Asset.
   * Maximum length: 4.
   */
  fixedAsset: DeserializedType<T, 'Edm.String'>;
  /**
   * Order Id.
   * Maximum length: 12.
   */
  orderId: DeserializedType<T, 'Edm.String'>;
  /**
   * Unloading Point Name.
   * Maximum length: 25.
   */
  unloadingPointName: DeserializedType<T, 'Edm.String'>;
  /**
   * Controlling Area.
   * Maximum length: 4.
   */
  controllingArea: DeserializedType<T, 'Edm.String'>;
  /**
   * Cost Object.
   * Maximum length: 12.
   */
  costObject: DeserializedType<T, 'Edm.String'>;
  /**
   * Profit Center.
   * Maximum length: 10.
   */
  profitCenter: DeserializedType<T, 'Edm.String'>;
  /**
   * Wbs Element Internal Id.
   * Maximum length: 8.
   */
  wbsElementInternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * Wbs Element External Id.
   * Maximum length: 24.
   */
  wbsElementExternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * Project Network Internal Id.
   * Maximum length: 10.
   */
  projectNetworkInternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * Commitment Item Short Id.
   * Maximum length: 14.
   */
  commitmentItemShortId: DeserializedType<T, 'Edm.String'>;
  /**
   * Funds Center.
   * Maximum length: 16.
   */
  fundsCenter: DeserializedType<T, 'Edm.String'>;
  /**
   * Fund.
   * Maximum length: 10.
   */
  fund: DeserializedType<T, 'Edm.String'>;
  /**
   * Functional Area.
   * Maximum length: 16.
   */
  functionalArea: DeserializedType<T, 'Edm.String'>;
  /**
   * Goods Recipient Name.
   * Maximum length: 12.
   */
  goodsRecipientName: DeserializedType<T, 'Edm.String'>;
  /**
   * Is Finally Invoiced.
   */
  isFinallyInvoiced: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Network Activity Internal Id.
   * Maximum length: 8.
   */
  networkActivityInternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * Partner Account Number.
   * Maximum length: 10.
   */
  partnerAccountNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Joint Venture Recovery Code.
   * Maximum length: 2.
   */
  jointVentureRecoveryCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Settlement Reference Date.
   * @nullable
   */
  settlementReferenceDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Order Internal Id.
   * Maximum length: 10.
   */
  orderInternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * Order Int Bill Of Operations Item.
   * Maximum length: 8.
   */
  orderIntBillOfOperationsItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax Code.
   * Maximum length: 2.
   */
  taxCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   */
  taxJurisdiction: DeserializedType<T, 'Edm.String'>;
  /**
   * Non Deductible Input Tax Amount.
   */
  nonDeductibleInputTaxAmount: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Cost Ctr Activity Type.
   * Maximum length: 6.
   */
  costCtrActivityType: DeserializedType<T, 'Edm.String'>;
  /**
   * Business Process.
   * Maximum length: 12.
   */
  businessProcess: DeserializedType<T, 'Edm.String'>;
  /**
   * Grant Id.
   * Maximum length: 20.
   */
  grantId: DeserializedType<T, 'Edm.String'>;
  /**
   * Budget Period.
   * Maximum length: 10.
   */
  budgetPeriod: DeserializedType<T, 'Edm.String'>;
  /**
   * Earmarked Funds Document.
   * Maximum length: 10.
   */
  earmarkedFundsDocument: DeserializedType<T, 'Edm.String'>;
  /**
   * Earmarked Funds Document Item.
   * Maximum length: 3.
   */
  earmarkedFundsDocumentItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Validity Date.
   * @nullable
   */
  validityDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Chart Of Accounts.
   * Maximum length: 4.
   */
  chartOfAccounts: DeserializedType<T, 'Edm.String'>;
  /**
   * Service Document Type.
   * Maximum length: 4.
   */
  serviceDocumentType: DeserializedType<T, 'Edm.String'>;
  /**
   * Service Document.
   * Maximum length: 10.
   */
  serviceDocument: DeserializedType<T, 'Edm.String'>;
  /**
   * Service Document Item.
   * Maximum length: 6.
   */
  serviceDocumentItem: DeserializedType<T, 'Edm.String'>;
  /**
   * Creation Date.
   * @nullable
   */
  creationDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Is Acct Line Final.
   */
  isAcctLineFinal: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Acct Line Final Reason.
   * Maximum length: 2.
   */
  acctLineFinalReason: DeserializedType<T, 'Edm.String'>;
  /**
   * Company Code.
   * Maximum length: 4.
   */
  companyCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-one navigation property to the {@link PurchaseOrder} entity.
   */
  purchaseOrder_1?: PurchaseOrder<T> | null;
  /**
   * One-to-one navigation property to the {@link PurchaseOrderItem} entity.
   */
  purchaseOrderItem_1?: PurchaseOrderItem<T> | null;
  constructor(_entityApi: PurchaseOrderAccountAssignmentApi<T>);
}
export interface PurchaseOrderAccountAssignmentType<
  T extends DeSerializers = DefaultDeSerializers
> {
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  accountAssignmentNumber: DeserializedType<T, 'Edm.String'>;
  costCenter: DeserializedType<T, 'Edm.String'>;
  masterFixedAsset: DeserializedType<T, 'Edm.String'>;
  projectNetwork: DeserializedType<T, 'Edm.String'>;
  networkActivity: DeserializedType<T, 'Edm.String'>;
  orderQuantityUnit: DeserializedType<T, 'Edm.String'>;
  quantity: DeserializedType<T, 'Edm.Decimal'>;
  multipleAcctAssgmtDistrPercent: DeserializedType<T, 'Edm.Decimal'>;
  documentCurrency: DeserializedType<T, 'Edm.String'>;
  purgDocNetAmount: DeserializedType<T, 'Edm.Decimal'>;
  isDeleted: DeserializedType<T, 'Edm.Boolean'>;
  glAccount: DeserializedType<T, 'Edm.String'>;
  businessArea: DeserializedType<T, 'Edm.String'>;
  salesOrder: DeserializedType<T, 'Edm.String'>;
  salesOrderItem: DeserializedType<T, 'Edm.String'>;
  salesOrderScheduleLine: DeserializedType<T, 'Edm.String'>;
  fixedAsset: DeserializedType<T, 'Edm.String'>;
  orderId: DeserializedType<T, 'Edm.String'>;
  unloadingPointName: DeserializedType<T, 'Edm.String'>;
  controllingArea: DeserializedType<T, 'Edm.String'>;
  costObject: DeserializedType<T, 'Edm.String'>;
  profitCenter: DeserializedType<T, 'Edm.String'>;
  wbsElementInternalId: DeserializedType<T, 'Edm.String'>;
  wbsElementExternalId: DeserializedType<T, 'Edm.String'>;
  projectNetworkInternalId: DeserializedType<T, 'Edm.String'>;
  commitmentItemShortId: DeserializedType<T, 'Edm.String'>;
  fundsCenter: DeserializedType<T, 'Edm.String'>;
  fund: DeserializedType<T, 'Edm.String'>;
  functionalArea: DeserializedType<T, 'Edm.String'>;
  goodsRecipientName: DeserializedType<T, 'Edm.String'>;
  isFinallyInvoiced: DeserializedType<T, 'Edm.Boolean'>;
  networkActivityInternalId: DeserializedType<T, 'Edm.String'>;
  partnerAccountNumber: DeserializedType<T, 'Edm.String'>;
  jointVentureRecoveryCode: DeserializedType<T, 'Edm.String'>;
  settlementReferenceDate?: DeserializedType<T, 'Edm.Date'> | null;
  orderInternalId: DeserializedType<T, 'Edm.String'>;
  orderIntBillOfOperationsItem: DeserializedType<T, 'Edm.String'>;
  taxCode: DeserializedType<T, 'Edm.String'>;
  taxJurisdiction: DeserializedType<T, 'Edm.String'>;
  nonDeductibleInputTaxAmount: DeserializedType<T, 'Edm.Decimal'>;
  costCtrActivityType: DeserializedType<T, 'Edm.String'>;
  businessProcess: DeserializedType<T, 'Edm.String'>;
  grantId: DeserializedType<T, 'Edm.String'>;
  budgetPeriod: DeserializedType<T, 'Edm.String'>;
  earmarkedFundsDocument: DeserializedType<T, 'Edm.String'>;
  earmarkedFundsDocumentItem: DeserializedType<T, 'Edm.String'>;
  validityDate?: DeserializedType<T, 'Edm.Date'> | null;
  chartOfAccounts: DeserializedType<T, 'Edm.String'>;
  serviceDocumentType: DeserializedType<T, 'Edm.String'>;
  serviceDocument: DeserializedType<T, 'Edm.String'>;
  serviceDocumentItem: DeserializedType<T, 'Edm.String'>;
  creationDate?: DeserializedType<T, 'Edm.Date'> | null;
  isAcctLineFinal: DeserializedType<T, 'Edm.Boolean'>;
  acctLineFinalReason: DeserializedType<T, 'Edm.String'>;
  companyCode: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  purchaseOrder_1?: PurchaseOrderType<T> | null;
  purchaseOrderItem_1?: PurchaseOrderItemType<T> | null;
}
