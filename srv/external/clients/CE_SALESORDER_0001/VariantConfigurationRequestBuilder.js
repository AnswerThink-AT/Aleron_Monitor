"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantConfigurationRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const VariantConfiguration_1 = require("./VariantConfiguration");
/**
 * Request builder class for operations supported on the {@link VariantConfiguration} entity.
 */
class VariantConfigurationRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `VariantConfiguration` entities.
     * @returns A request builder for creating requests to retrieve all `VariantConfiguration` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `VariantConfiguration` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `VariantConfiguration`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `VariantConfiguration` entity based on its keys.
     * @param varConfigurationBusObjectKey Key property. See {@link VariantConfiguration.varConfigurationBusObjectKey}.
     * @param varConfigurationBusObjectType Key property. See {@link VariantConfiguration.varConfigurationBusObjectType}.
     * @returns A request builder for creating requests to retrieve one `VariantConfiguration` entity based on its keys.
     */
    getByKey(varConfigurationBusObjectKey, varConfigurationBusObjectType) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            VarConfigurationBusObjectKey: varConfigurationBusObjectKey,
            VarConfigurationBusObjectType: varConfigurationBusObjectType
        });
    }
    /**
     * Returns a request builder for updating an entity of type `VariantConfiguration`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `VariantConfiguration`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(varConfigurationBusObjectKeyOrEntity, varConfigurationBusObjectType) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, varConfigurationBusObjectKeyOrEntity instanceof VariantConfiguration_1.VariantConfiguration
            ? varConfigurationBusObjectKeyOrEntity
            : {
                VarConfigurationBusObjectKey: varConfigurationBusObjectKeyOrEntity,
                VarConfigurationBusObjectType: varConfigurationBusObjectType
            });
    }
}
exports.VariantConfigurationRequestBuilder = VariantConfigurationRequestBuilder;
//# sourceMappingURL=VariantConfigurationRequestBuilder.js.map