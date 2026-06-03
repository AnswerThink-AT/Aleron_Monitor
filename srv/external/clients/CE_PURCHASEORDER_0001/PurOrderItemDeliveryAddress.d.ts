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
import type { PurOrderItemDeliveryAddressApi } from './PurOrderItemDeliveryAddressApi';
import { PurchaseOrder, PurchaseOrderType } from './PurchaseOrder';
import { PurchaseOrderItem, PurchaseOrderItemType } from './PurchaseOrderItem';
/**
 * This class represents the entity "PurOrderItemDeliveryAddress" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
export declare class PurOrderItemDeliveryAddress<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements PurOrderItemDeliveryAddressType<T>
{
  /**
   * Technical entity name for PurOrderItemDeliveryAddress.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the PurOrderItemDeliveryAddress entity.
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
   * Delivery Address Id.
   * Maximum length: 10.
   */
  deliveryAddressId: DeserializedType<T, 'Edm.String'>;
  /**
   * Address Id.
   * Maximum length: 10.
   */
  addressId: DeserializedType<T, 'Edm.String'>;
  /**
   * Address Person Id.
   * Maximum length: 10.
   */
  addressPersonId: DeserializedType<T, 'Edm.String'>;
  /**
   * Address Representation Code.
   * Maximum length: 1.
   */
  addressRepresentationCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Correspondence Language.
   * Maximum length: 2.
   */
  correspondenceLanguage: DeserializedType<T, 'Edm.String'>;
  /**
   * Prfrd Comm Medium Type.
   * Maximum length: 3.
   */
  prfrdCommMediumType: DeserializedType<T, 'Edm.String'>;
  /**
   * Addressee Full Name.
   * Maximum length: 80.
   */
  addresseeFullName: DeserializedType<T, 'Edm.String'>;
  /**
   * Organization Name 1.
   * Maximum length: 40.
   */
  organizationName1: DeserializedType<T, 'Edm.String'>;
  /**
   * Organization Name 2.
   * Maximum length: 40.
   */
  organizationName2: DeserializedType<T, 'Edm.String'>;
  /**
   * Organization Name 3.
   * Maximum length: 40.
   */
  organizationName3: DeserializedType<T, 'Edm.String'>;
  /**
   * Organization Name 4.
   * Maximum length: 40.
   */
  organizationName4: DeserializedType<T, 'Edm.String'>;
  /**
   * Address Search Term 1.
   * Maximum length: 20.
   */
  addressSearchTerm1: DeserializedType<T, 'Edm.String'>;
  /**
   * Address Search Term 2.
   * Maximum length: 20.
   */
  addressSearchTerm2: DeserializedType<T, 'Edm.String'>;
  /**
   * City Name.
   * Maximum length: 40.
   */
  cityName: DeserializedType<T, 'Edm.String'>;
  /**
   * District Name.
   * Maximum length: 40.
   */
  districtName: DeserializedType<T, 'Edm.String'>;
  /**
   * Village Name.
   * Maximum length: 40.
   */
  villageName: DeserializedType<T, 'Edm.String'>;
  /**
   * Postal Code.
   * Maximum length: 10.
   */
  postalCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Company Postal Code.
   * Maximum length: 10.
   */
  companyPostalCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Street Name.
   * Maximum length: 60.
   */
  streetName: DeserializedType<T, 'Edm.String'>;
  /**
   * Street Prefix Name 1.
   * Maximum length: 40.
   */
  streetPrefixName1: DeserializedType<T, 'Edm.String'>;
  /**
   * Street Prefix Name 2.
   * Maximum length: 40.
   */
  streetPrefixName2: DeserializedType<T, 'Edm.String'>;
  /**
   * Street Suffix Name 1.
   * Maximum length: 40.
   */
  streetSuffixName1: DeserializedType<T, 'Edm.String'>;
  /**
   * Street Suffix Name 2.
   * Maximum length: 40.
   */
  streetSuffixName2: DeserializedType<T, 'Edm.String'>;
  /**
   * House Number.
   * Maximum length: 10.
   */
  houseNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * House Number Supplement Text.
   * Maximum length: 10.
   */
  houseNumberSupplementText: DeserializedType<T, 'Edm.String'>;
  /**
   * Building.
   * Maximum length: 20.
   */
  building: DeserializedType<T, 'Edm.String'>;
  /**
   * Floor.
   * Maximum length: 10.
   */
  floor: DeserializedType<T, 'Edm.String'>;
  /**
   * Room Number.
   * Maximum length: 10.
   */
  roomNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Country.
   * Maximum length: 3.
   */
  country: DeserializedType<T, 'Edm.String'>;
  /**
   * Region.
   * Maximum length: 3.
   */
  region: DeserializedType<T, 'Edm.String'>;
  /**
   * Form Of Address.
   * Maximum length: 4.
   */
  formOfAddress: DeserializedType<T, 'Edm.String'>;
  /**
   * Tax Jurisdiction.
   * Maximum length: 15.
   */
  taxJurisdiction: DeserializedType<T, 'Edm.String'>;
  /**
   * Transport Zone.
   * Maximum length: 10.
   */
  transportZone: DeserializedType<T, 'Edm.String'>;
  /**
   * Po Box.
   * Maximum length: 10.
   */
  poBox: DeserializedType<T, 'Edm.String'>;
  /**
   * Po Box Is Without Number.
   */
  poBoxIsWithoutNumber: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Po Box Postal Code.
   * Maximum length: 10.
   */
  poBoxPostalCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Po Box Lobby Name.
   * Maximum length: 40.
   */
  poBoxLobbyName: DeserializedType<T, 'Edm.String'>;
  /**
   * Po Box Deviating City Name.
   * Maximum length: 40.
   */
  poBoxDeviatingCityName: DeserializedType<T, 'Edm.String'>;
  /**
   * Po Box Deviating Region.
   * Maximum length: 3.
   */
  poBoxDeviatingRegion: DeserializedType<T, 'Edm.String'>;
  /**
   * Po Box Deviating Country.
   * Maximum length: 3.
   */
  poBoxDeviatingCountry: DeserializedType<T, 'Edm.String'>;
  /**
   * Care Of Name.
   * Maximum length: 40.
   */
  careOfName: DeserializedType<T, 'Edm.String'>;
  /**
   * Delivery Service Type Code.
   * Maximum length: 4.
   */
  deliveryServiceTypeCode: DeserializedType<T, 'Edm.String'>;
  /**
   * Delivery Service Number.
   * Maximum length: 10.
   */
  deliveryServiceNumber: DeserializedType<T, 'Edm.String'>;
  /**
   * Address Time Zone.
   * Maximum length: 6.
   */
  addressTimeZone: DeserializedType<T, 'Edm.String'>;
  /**
   * Email Address.
   * Maximum length: 241.
   */
  emailAddress: DeserializedType<T, 'Edm.String'>;
  /**
   * Regional Structure Check Status.
   * Maximum length: 1.
   */
  regionalStructureCheckStatus: DeserializedType<T, 'Edm.String'>;
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
  constructor(_entityApi: PurOrderItemDeliveryAddressApi<T>);
}
export interface PurOrderItemDeliveryAddressType<
  T extends DeSerializers = DefaultDeSerializers
> {
  purchaseOrder: DeserializedType<T, 'Edm.String'>;
  purchaseOrderItem: DeserializedType<T, 'Edm.String'>;
  deliveryAddressId: DeserializedType<T, 'Edm.String'>;
  addressId: DeserializedType<T, 'Edm.String'>;
  addressPersonId: DeserializedType<T, 'Edm.String'>;
  addressRepresentationCode: DeserializedType<T, 'Edm.String'>;
  correspondenceLanguage: DeserializedType<T, 'Edm.String'>;
  prfrdCommMediumType: DeserializedType<T, 'Edm.String'>;
  addresseeFullName: DeserializedType<T, 'Edm.String'>;
  organizationName1: DeserializedType<T, 'Edm.String'>;
  organizationName2: DeserializedType<T, 'Edm.String'>;
  organizationName3: DeserializedType<T, 'Edm.String'>;
  organizationName4: DeserializedType<T, 'Edm.String'>;
  addressSearchTerm1: DeserializedType<T, 'Edm.String'>;
  addressSearchTerm2: DeserializedType<T, 'Edm.String'>;
  cityName: DeserializedType<T, 'Edm.String'>;
  districtName: DeserializedType<T, 'Edm.String'>;
  villageName: DeserializedType<T, 'Edm.String'>;
  postalCode: DeserializedType<T, 'Edm.String'>;
  companyPostalCode: DeserializedType<T, 'Edm.String'>;
  streetName: DeserializedType<T, 'Edm.String'>;
  streetPrefixName1: DeserializedType<T, 'Edm.String'>;
  streetPrefixName2: DeserializedType<T, 'Edm.String'>;
  streetSuffixName1: DeserializedType<T, 'Edm.String'>;
  streetSuffixName2: DeserializedType<T, 'Edm.String'>;
  houseNumber: DeserializedType<T, 'Edm.String'>;
  houseNumberSupplementText: DeserializedType<T, 'Edm.String'>;
  building: DeserializedType<T, 'Edm.String'>;
  floor: DeserializedType<T, 'Edm.String'>;
  roomNumber: DeserializedType<T, 'Edm.String'>;
  country: DeserializedType<T, 'Edm.String'>;
  region: DeserializedType<T, 'Edm.String'>;
  formOfAddress: DeserializedType<T, 'Edm.String'>;
  taxJurisdiction: DeserializedType<T, 'Edm.String'>;
  transportZone: DeserializedType<T, 'Edm.String'>;
  poBox: DeserializedType<T, 'Edm.String'>;
  poBoxIsWithoutNumber: DeserializedType<T, 'Edm.Boolean'>;
  poBoxPostalCode: DeserializedType<T, 'Edm.String'>;
  poBoxLobbyName: DeserializedType<T, 'Edm.String'>;
  poBoxDeviatingCityName: DeserializedType<T, 'Edm.String'>;
  poBoxDeviatingRegion: DeserializedType<T, 'Edm.String'>;
  poBoxDeviatingCountry: DeserializedType<T, 'Edm.String'>;
  careOfName: DeserializedType<T, 'Edm.String'>;
  deliveryServiceTypeCode: DeserializedType<T, 'Edm.String'>;
  deliveryServiceNumber: DeserializedType<T, 'Edm.String'>;
  addressTimeZone: DeserializedType<T, 'Edm.String'>;
  emailAddress: DeserializedType<T, 'Edm.String'>;
  regionalStructureCheckStatus: DeserializedType<T, 'Edm.String'>;
  sapMessages: Sap_Message<T>[];
  purchaseOrder_1?: PurchaseOrderType<T> | null;
  purchaseOrderItem_1?: PurchaseOrderItemType<T> | null;
}
