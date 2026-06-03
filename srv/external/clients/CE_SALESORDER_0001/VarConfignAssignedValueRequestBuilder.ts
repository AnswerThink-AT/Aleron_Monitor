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
import { VarConfignAssignedValue } from './VarConfignAssignedValue';

/**
 * Request builder class for operations supported on the {@link VarConfignAssignedValue} entity.
 */
export class VarConfignAssignedValueRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<VarConfignAssignedValue<T>, T> {
  /**
   * Returns a request builder for querying all `VarConfignAssignedValue` entities.
   * @returns A request builder for creating requests to retrieve all `VarConfignAssignedValue` entities.
   */
  getAll(): GetAllRequestBuilder<VarConfignAssignedValue<T>, T> {
    return new GetAllRequestBuilder<VarConfignAssignedValue<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `VarConfignAssignedValue` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `VarConfignAssignedValue`.
   */
  create(
    entity: VarConfignAssignedValue<T>
  ): CreateRequestBuilder<VarConfignAssignedValue<T>, T> {
    return new CreateRequestBuilder<VarConfignAssignedValue<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for retrieving one `VarConfignAssignedValue` entity based on its keys.
   * @param varConfigurationBusObjectKey Key property. See {@link VarConfignAssignedValue.varConfigurationBusObjectKey}.
   * @param varConfigurationBusObjectType Key property. See {@link VarConfignAssignedValue.varConfigurationBusObjectType}.
   * @param varConfignInstceInternalId Key property. See {@link VarConfignAssignedValue.varConfignInstceInternalId}.
   * @param characteristic Key property. See {@link VarConfignAssignedValue.characteristic}.
   * @param variantConfigurationValueId Key property. See {@link VarConfignAssignedValue.variantConfigurationValueId}.
   * @returns A request builder for creating requests to retrieve one `VarConfignAssignedValue` entity based on its keys.
   */
  getByKey(
    varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>,
    varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>,
    varConfignInstceInternalId: DeserializedType<T, 'Edm.Int32'>,
    characteristic: DeserializedType<T, 'Edm.String'>,
    variantConfigurationValueId: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<VarConfignAssignedValue<T>, T> {
    return new GetByKeyRequestBuilder<VarConfignAssignedValue<T>, T>(
      this.entityApi,
      {
        VarConfigurationBusObjectKey: varConfigurationBusObjectKey,
        VarConfigurationBusObjectType: varConfigurationBusObjectType,
        VarConfignInstceInternalID: varConfignInstceInternalId,
        Characteristic: characteristic,
        VariantConfigurationValueID: variantConfigurationValueId
      }
    );
  }

  /**
   * Returns a request builder for updating an entity of type `VarConfignAssignedValue`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `VarConfignAssignedValue`.
   */
  update(
    entity: VarConfignAssignedValue<T>
  ): UpdateRequestBuilder<VarConfignAssignedValue<T>, T> {
    return new UpdateRequestBuilder<VarConfignAssignedValue<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `VarConfignAssignedValue`.
   * @param varConfigurationBusObjectKey Key property. See {@link VarConfignAssignedValue.varConfigurationBusObjectKey}.
   * @param varConfigurationBusObjectType Key property. See {@link VarConfignAssignedValue.varConfigurationBusObjectType}.
   * @param varConfignInstceInternalId Key property. See {@link VarConfignAssignedValue.varConfignInstceInternalId}.
   * @param characteristic Key property. See {@link VarConfignAssignedValue.characteristic}.
   * @param variantConfigurationValueId Key property. See {@link VarConfignAssignedValue.variantConfigurationValueId}.
   * @returns A request builder for creating requests that delete an entity of type `VarConfignAssignedValue`.
   */
  delete(
    varConfigurationBusObjectKey: string,
    varConfigurationBusObjectType: string,
    varConfignInstceInternalId: number,
    characteristic: string,
    variantConfigurationValueId: string
  ): DeleteRequestBuilder<VarConfignAssignedValue<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `VarConfignAssignedValue`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `VarConfignAssignedValue` by taking the entity as a parameter.
   */
  delete(
    entity: VarConfignAssignedValue<T>
  ): DeleteRequestBuilder<VarConfignAssignedValue<T>, T>;
  delete(
    varConfigurationBusObjectKeyOrEntity: any,
    varConfigurationBusObjectType?: string,
    varConfignInstceInternalId?: number,
    characteristic?: string,
    variantConfigurationValueId?: string
  ): DeleteRequestBuilder<VarConfignAssignedValue<T>, T> {
    return new DeleteRequestBuilder<VarConfignAssignedValue<T>, T>(
      this.entityApi,
      varConfigurationBusObjectKeyOrEntity instanceof VarConfignAssignedValue
        ? varConfigurationBusObjectKeyOrEntity
        : {
            VarConfigurationBusObjectKey: varConfigurationBusObjectKeyOrEntity!,
            VarConfigurationBusObjectType: varConfigurationBusObjectType!,
            VarConfignInstceInternalID: varConfignInstceInternalId!,
            Characteristic: characteristic!,
            VariantConfigurationValueID: variantConfigurationValueId!
          }
    );
  }
}
