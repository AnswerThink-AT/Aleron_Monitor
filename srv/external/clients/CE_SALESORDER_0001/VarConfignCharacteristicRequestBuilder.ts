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
import { VarConfignCharacteristic } from './VarConfignCharacteristic';

/**
 * Request builder class for operations supported on the {@link VarConfignCharacteristic} entity.
 */
export class VarConfignCharacteristicRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<VarConfignCharacteristic<T>, T> {
  /**
   * Returns a request builder for querying all `VarConfignCharacteristic` entities.
   * @returns A request builder for creating requests to retrieve all `VarConfignCharacteristic` entities.
   */
  getAll(): GetAllRequestBuilder<VarConfignCharacteristic<T>, T> {
    return new GetAllRequestBuilder<VarConfignCharacteristic<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `VarConfignCharacteristic` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `VarConfignCharacteristic`.
   */
  create(
    entity: VarConfignCharacteristic<T>
  ): CreateRequestBuilder<VarConfignCharacteristic<T>, T> {
    return new CreateRequestBuilder<VarConfignCharacteristic<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for retrieving one `VarConfignCharacteristic` entity based on its keys.
   * @param varConfigurationBusObjectKey Key property. See {@link VarConfignCharacteristic.varConfigurationBusObjectKey}.
   * @param varConfigurationBusObjectType Key property. See {@link VarConfignCharacteristic.varConfigurationBusObjectType}.
   * @param varConfignInstceInternalId Key property. See {@link VarConfignCharacteristic.varConfignInstceInternalId}.
   * @param characteristic Key property. See {@link VarConfignCharacteristic.characteristic}.
   * @returns A request builder for creating requests to retrieve one `VarConfignCharacteristic` entity based on its keys.
   */
  getByKey(
    varConfigurationBusObjectKey: DeserializedType<T, 'Edm.String'>,
    varConfigurationBusObjectType: DeserializedType<T, 'Edm.String'>,
    varConfignInstceInternalId: DeserializedType<T, 'Edm.Int32'>,
    characteristic: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<VarConfignCharacteristic<T>, T> {
    return new GetByKeyRequestBuilder<VarConfignCharacteristic<T>, T>(
      this.entityApi,
      {
        VarConfigurationBusObjectKey: varConfigurationBusObjectKey,
        VarConfigurationBusObjectType: varConfigurationBusObjectType,
        VarConfignInstceInternalID: varConfignInstceInternalId,
        Characteristic: characteristic
      }
    );
  }

  /**
   * Returns a request builder for updating an entity of type `VarConfignCharacteristic`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `VarConfignCharacteristic`.
   */
  update(
    entity: VarConfignCharacteristic<T>
  ): UpdateRequestBuilder<VarConfignCharacteristic<T>, T> {
    return new UpdateRequestBuilder<VarConfignCharacteristic<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `VarConfignCharacteristic`.
   * @param varConfigurationBusObjectKey Key property. See {@link VarConfignCharacteristic.varConfigurationBusObjectKey}.
   * @param varConfigurationBusObjectType Key property. See {@link VarConfignCharacteristic.varConfigurationBusObjectType}.
   * @param varConfignInstceInternalId Key property. See {@link VarConfignCharacteristic.varConfignInstceInternalId}.
   * @param characteristic Key property. See {@link VarConfignCharacteristic.characteristic}.
   * @returns A request builder for creating requests that delete an entity of type `VarConfignCharacteristic`.
   */
  delete(
    varConfigurationBusObjectKey: string,
    varConfigurationBusObjectType: string,
    varConfignInstceInternalId: number,
    characteristic: string
  ): DeleteRequestBuilder<VarConfignCharacteristic<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `VarConfignCharacteristic`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `VarConfignCharacteristic` by taking the entity as a parameter.
   */
  delete(
    entity: VarConfignCharacteristic<T>
  ): DeleteRequestBuilder<VarConfignCharacteristic<T>, T>;
  delete(
    varConfigurationBusObjectKeyOrEntity: any,
    varConfigurationBusObjectType?: string,
    varConfignInstceInternalId?: number,
    characteristic?: string
  ): DeleteRequestBuilder<VarConfignCharacteristic<T>, T> {
    return new DeleteRequestBuilder<VarConfignCharacteristic<T>, T>(
      this.entityApi,
      varConfigurationBusObjectKeyOrEntity instanceof VarConfignCharacteristic
        ? varConfigurationBusObjectKeyOrEntity
        : {
            VarConfigurationBusObjectKey: varConfigurationBusObjectKeyOrEntity!,
            VarConfigurationBusObjectType: varConfigurationBusObjectType!,
            VarConfignInstceInternalID: varConfignInstceInternalId!,
            Characteristic: characteristic!
          }
    );
  }
}
