"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarConfignAssignedValueRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const VarConfignAssignedValue_1 = require("./VarConfignAssignedValue");
/**
 * Request builder class for operations supported on the {@link VarConfignAssignedValue} entity.
 */
class VarConfignAssignedValueRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `VarConfignAssignedValue` entities.
     * @returns A request builder for creating requests to retrieve all `VarConfignAssignedValue` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `VarConfignAssignedValue` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `VarConfignAssignedValue`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
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
    getByKey(varConfigurationBusObjectKey, varConfigurationBusObjectType, varConfignInstceInternalId, characteristic, variantConfigurationValueId) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            VarConfigurationBusObjectKey: varConfigurationBusObjectKey,
            VarConfigurationBusObjectType: varConfigurationBusObjectType,
            VarConfignInstceInternalID: varConfignInstceInternalId,
            Characteristic: characteristic,
            VariantConfigurationValueID: variantConfigurationValueId
        });
    }
    /**
     * Returns a request builder for updating an entity of type `VarConfignAssignedValue`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `VarConfignAssignedValue`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(varConfigurationBusObjectKeyOrEntity, varConfigurationBusObjectType, varConfignInstceInternalId, characteristic, variantConfigurationValueId) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, varConfigurationBusObjectKeyOrEntity instanceof VarConfignAssignedValue_1.VarConfignAssignedValue
            ? varConfigurationBusObjectKeyOrEntity
            : {
                VarConfigurationBusObjectKey: varConfigurationBusObjectKeyOrEntity,
                VarConfigurationBusObjectType: varConfigurationBusObjectType,
                VarConfignInstceInternalID: varConfignInstceInternalId,
                Characteristic: characteristic,
                VariantConfigurationValueID: variantConfigurationValueId
            });
    }
}
exports.VarConfignAssignedValueRequestBuilder = VarConfignAssignedValueRequestBuilder;
//# sourceMappingURL=VarConfignAssignedValueRequestBuilder.js.map