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
import type { PurchaseOrderPartnerApi } from './PurchaseOrderPartnerApi';
import { PurchaseOrder, PurchaseOrderType } from './PurchaseOrder';
/**
 * This class represents the entity "PurchaseOrderPartner" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
export declare class PurchaseOrderPartner<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements PurchaseOrderPartnerType<T>
{
  /**
   * Technical entity name for PurchaseOrderPartner.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the PurchaseOrderPartner entity.
   */
  static _keys: string[];
  /**
   * Purchase Order.
   * Maximum length: 10.
   */
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  /**
   * Partner Function.
   * Maximum length: 2.
   */
  partnerFunction: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier Subrange.
   * Maximum length: 6.
   */
  supplierSubrange: DeserializedType<T, 'Edm.String'>;
  /**
   * Plant.
   * Maximum length: 4.
   */
  plant: DeserializedType<T, 'Edm.String'>;
  /**
   * Purchasing Organization.
   * Maximum length: 4.
   */
  purchasingOrganization: DeserializedType<T, 'Edm.String'>;
  /**
   * Partner Counter.
   * Maximum length: 3.
   */
  partnerCounter: DeserializedType<T, 'Edm.String'>;
  /**
   * Created By User.
   * Maximum length: 12.
   */
  createdByUser: DeserializedType<T, 'Edm.String'>;
  /**
   * Creation Date.
   * @nullable
   */
  creationDate?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Purchasing Document Partner Type.
   * Maximum length: 2.
   */
  purchasingDocumentPartnerType: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier.
   * Maximum length: 10.
   */
  supplier: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier Hierarchy Category.
   * Maximum length: 1.
   */
  supplierHierarchyCategory: DeserializedType<T, 'Edm.String'>;
  /**
   * Supplier Contact.
   * Maximum length: 10.
   */
  supplierContact: DeserializedType<T, 'Edm.String'>;
  /**
   * Person Work Agreement.
   * Maximum length: 8.
   */
  personWorkAgreement: DeserializedType<T, 'Edm.String'>;
  /**
   * Employment Internal Id.
   * Maximum length: 8.
   */
  employmentInternalId: DeserializedType<T, 'Edm.String'>;
  /**
   * Default Partner.
   */
  defaultPartner: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Sap Messages.
   */
  sapMessages: Sap_Message<T>[];
  /**
   * One-to-one navigation property to the {@link PurchaseOrder} entity.
   */
  purchaseOrderTp?: PurchaseOrder<T> | null;
  constructor(_entityApi: PurchaseOrderPartnerApi<T>);
}
export interface PurchaseOrderPartnerType<
  T extends DeSerializers = DefaultDeSerializers
> {
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  partnerFunction: DeserializedType<T, 'Edm.String'>;
  supplierSubrange: DeserializedType<T, 'Edm.String'>;
  plant: DeserializedType<T, 'Edm.String'>;
  purchasingOrganization: DeserializedType<T, 'Edm.String'>;
  partnerCounter: DeserializedType<T, 'Edm.String'>;
  createdByUser: DeserializedType<T, 'Edm.String'>;
  creationDate?: DeserializedType<T, 'Edm.Date'> | null;
  purchasingDocumentPartnerType: DeserializedType<T, 'Edm.String'>;
  supplier: DeserializedType<T, 'Edm.String'>;
  supplierHierarchyCategory: DeserializedType<T, 'Edm.String'>;
  supplierContact: DeserializedType<T, 'Edm.String'>;
  personWorkAgreement: DeserializedType<T, 'Edm.String'>;
  employmentInternalId: DeserializedType<T, 'Edm.String'>;
  defaultPartner: DeserializedType<T, 'Edm.Boolean'>;
  sapMessages: Sap_Message<T>[];
  purchaseOrderTp?: PurchaseOrderType<T> | null;
}
