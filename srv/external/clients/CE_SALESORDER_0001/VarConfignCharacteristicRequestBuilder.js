"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarConfignCharacteristicRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const VarConfignCharacteristic_1 = require("./VarConfignCharacteristic");
/**
 * Request builder class for operations supported on the {@link VarConfignCharacteristic} entity.
 */
class VarConfignCharacteristicRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `VarConfignCharacteristic` entities.
     * @returns A request builder for creating requests to retrieve all `VarConfignCharacteristic` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `VarConfignCharacteristic` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `VarConfignCharacteristic`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `VarConfignCharacteristic` entity based on its keys.
     * @param varConfigurationBusObjectKey Key property. See {@link VarConfignCharacteristic.varConfigurationBusObjectKey}.
     * @param varConfigurationBusObjectType Key property. See {@link VarConfignCharacteristic.varConfigurationBusObjectType}.
     * @param varConfignInstceInternalId Key property. See {@link VarConfignCharacteristic.varConfignInstceInternalId}.
     * @param characteristic Key property. See {@link VarConfignCharacteristic.characteristic}.
     * @returns A request builder for creating requests to retrieve one `VarConfignCharacteristic` entity based on its keys.
     */
    getByKey(varConfigurationBusObjectKey, varConfigurationBusObjectType, varConfignInstceInternalId, characteristic) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            VarConfigurationBusObjectKey: varConfigurationBusObjectKey,
            VarConfigurationBusObjectType: varConfigurationBusObjectType,
            VarConfignInstceInternalID: varConfignInstceInternalId,
            Characteristic: characteristic
        });
    }
    /**
     * Returns a request builder for updating an entity of type `VarConfignCharacteristic`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `VarConfignCharacteristic`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(varConfigurationBusObjectKeyOrEntity, varConfigurationBusObjectType, varConfignInstceInternalId, characteristic) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, varConfigurationBusObjectKeyOrEntity instanceof VarConfignCharacteristic_1.VarConfignCharacteristic
            ? varConfigurationBusObjectKeyOrEntity
            : {
                VarConfigurationBusObjectKey: varConfigurationBusObjectKeyOrEntity,
                VarConfigurationBusObjectType: varConfigurationBusObjectType,
                VarConfignInstceInternalID: varConfignInstceInternalId,
                Characteristic: characteristic
            });
    }
}
exports.VarConfignCharacteristicRequestBuilder = VarConfignCharacteristicRequestBuilder;
//# sourceMappingURL=VarConfignCharacteristicRequestBuilder.js.map