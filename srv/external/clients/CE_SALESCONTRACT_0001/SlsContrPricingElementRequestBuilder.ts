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
import { SlsContrPricingElement } from './SlsContrPricingElement';

/**
 * Request builder class for operations supported on the {@link SlsContrPricingElement} entity.
 */
export class SlsContrPricingElementRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<SlsContrPricingElement<T>, T> {
  /**
   * Returns a request builder for querying all `SlsContrPricingElement` entities.
   * @returns A request builder for creating requests to retrieve all `SlsContrPricingElement` entities.
   */
  getAll(): GetAllRequestBuilder<SlsContrPricingElement<T>, T> {
    return new GetAllRequestBuilder<SlsContrPricingElement<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `SlsContrPricingElement` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `SlsContrPricingElement`.
   */
  create(
    entity: SlsContrPricingElement<T>
  ): CreateRequestBuilder<SlsContrPricingElement<T>, T> {
    return new CreateRequestBuilder<SlsContrPricingElement<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for retrieving one `SlsContrPricingElement` entity based on its keys.
   * @param salesContract Key property. See {@link SlsContrPricingElement.salesContract}.
   * @param pricingProcedureStep Key property. See {@link SlsContrPricingElement.pricingProcedureStep}.
   * @param pricingProcedureCounter Key property. See {@link SlsContrPricingElement.pricingProcedureCounter}.
   * @returns A request builder for creating requests to retrieve one `SlsContrPricingElement` entity based on its keys.
   */
  getByKey(
    salesContract: DeserializedType<T, 'Edm.String'>,
    pricingProcedureStep: DeserializedType<T, 'Edm.String'>,
    pricingProcedureCounter: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<SlsContrPricingElement<T>, T> {
    return new GetByKeyRequestBuilder<SlsContrPricingElement<T>, T>(
      this.entityApi,
      {
        SalesContract: salesContract,
        PricingProcedureStep: pricingProcedureStep,
        PricingProcedureCounter: pricingProcedureCounter
      }
    );
  }

  /**
   * Returns a request builder for updating an entity of type `SlsContrPricingElement`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `SlsContrPricingElement`.
   */
  update(
    entity: SlsContrPricingElement<T>
  ): UpdateRequestBuilder<SlsContrPricingElement<T>, T> {
    return new UpdateRequestBuilder<SlsContrPricingElement<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `SlsContrPricingElement`.
   * @param salesContract Key property. See {@link SlsContrPricingElement.salesContract}.
   * @param pricingProcedureStep Key property. See {@link SlsContrPricingElement.pricingProcedureStep}.
   * @param pricingProcedureCounter Key property. See {@link SlsContrPricingElement.pricingProcedureCounter}.
   * @returns A request builder for creating requests that delete an entity of type `SlsContrPricingElement`.
   */
  delete(
    salesContract: string,
    pricingProcedureStep: string,
    pricingProcedureCounter: string
  ): DeleteRequestBuilder<SlsContrPricingElement<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `SlsContrPricingElement`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `SlsContrPricingElement` by taking the entity as a parameter.
   */
  delete(
    entity: SlsContrPricingElement<T>
  ): DeleteRequestBuilder<SlsContrPricingElement<T>, T>;
  delete(
    salesContractOrEntity: any,
    pricingProcedureStep?: string,
    pricingProcedureCounter?: string
  ): DeleteRequestBuilder<SlsContrPricingElement<T>, T> {
    return new DeleteRequestBuilder<SlsContrPricingElement<T>, T>(
      this.entityApi,
      salesContractOrEntity instanceof SlsContrPricingElement
        ? salesContractOrEntity
        : {
            SalesContract: salesContractOrEntity!,
            PricingProcedureStep: pricingProcedureStep!,
            PricingProcedureCounter: pricingProcedureCounter!
          }
    );
  }
}
