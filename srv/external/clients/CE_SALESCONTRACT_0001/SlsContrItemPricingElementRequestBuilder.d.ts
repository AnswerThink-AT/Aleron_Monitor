/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeSerializers,
  DefaultDeSerializers,
  DeleteRequestBuilder,
  DeserializedType,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  RequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { SlsContrItemPricingElement } from './SlsContrItemPricingElement';
/**
 * Request builder class for operations supported on the {@link SlsContrItemPricingElement} entity.
 */
export declare class SlsContrItemPricingElementRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SlsContrItemPricingElement<T>, T> {
  /**
   * Returns a request builder for querying all `SlsContrItemPricingElement` entities.
   * @returns A request builder for creating requests to retrieve all `SlsContrItemPricingElement` entities.
   */
  getAll(): GetAllRequestBuilder<SlsContrItemPricingElement<T>, T>;
  /**
   * Returns a request builder for creating a `SlsContrItemPricingElement` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SlsContrItemPricingElement`.
   */
  create(
    entity: SlsContrItemPricingElement<T>
  ): CreateRequestBuilder<SlsContrItemPricingElement<T>, T>;
  /**
   * Returns a request builder for retrieving one `SlsContrItemPricingElement` entity based on its keys.
   * @param salesContract Key property. See {@link SlsContrItemPricingElement.salesContract}.
   * @param salesContractItem Key property. See {@link SlsContrItemPricingElement.salesContractItem}.
   * @param pricingProcedureStep Key property. See {@link SlsContrItemPricingElement.pricingProcedureStep}.
   * @param pricingProcedureCounter Key property. See {@link SlsContrItemPricingElement.pricingProcedureCounter}.
   * @returns A request builder for creating requests to retrieve one `SlsContrItemPricingElement` entity based on its keys.
   */
  getByKey(
    salesContract: DeserializedType<T, 'Edm.String'>,
    salesContractItem: DeserializedType<T, 'Edm.String'>,
    pricingProcedureStep: DeserializedType<T, 'Edm.String'>,
    pricingProcedureCounter: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SlsContrItemPricingElement<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `SlsContrItemPricingElement`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SlsContrItemPricingElement`.
   */
  update(
    entity: SlsContrItemPricingElement<T>
  ): UpdateRequestBuilder<SlsContrItemPricingElement<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SlsContrItemPricingElement`.
   * @param salesContract Key property. See {@link SlsContrItemPricingElement.salesContract}.
   * @param salesContractItem Key property. See {@link SlsContrItemPricingElement.salesContractItem}.
   * @param pricingProcedureStep Key property. See {@link SlsContrItemPricingElement.pricingProcedureStep}.
   * @param pricingProcedureCounter Key property. See {@link SlsContrItemPricingElement.pricingProcedureCounter}.
   * @returns A request builder for creating requests that delete an entity of type `SlsContrItemPricingElement`.
   */
  delete(
    salesContract: string,
    salesContractItem: string,
    pricingProcedureStep: string,
    pricingProcedureCounter: string
  ): DeleteRequestBuilder<SlsContrItemPricingElement<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SlsContrItemPricingElement`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SlsContrItemPricingElement` by taking the entity as a parameter.
   */
  delete(
    entity: SlsContrItemPricingElement<T>
  ): DeleteRequestBuilder<SlsContrItemPricingElement<T>, T>;
}
