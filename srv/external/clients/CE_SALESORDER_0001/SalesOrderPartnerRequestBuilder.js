"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderPartnerRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const SalesOrderPartner_1 = require("./SalesOrderPartner");
/**
 * Request builder class for operations supported on the {@link SalesOrderPartner} entity.
 */
class SalesOrderPartnerRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `SalesOrderPartner` entities.
     * @returns A request builder for creating requests to retrieve all `SalesOrderPartner` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SalesOrderPartner` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SalesOrderPartner`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `SalesOrderPartner` entity based on its keys.
     * @param salesOrder Key property. See {@link SalesOrderPartner.salesOrder}.
     * @param partnerFunction Key property. See {@link SalesOrderPartner.partnerFunction}.
     * @returns A request builder for creating requests to retrieve one `SalesOrderPartner` entity based on its keys.
     */
    getByKey(salesOrder, partnerFunction) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            SalesOrder: salesOrder,
            PartnerFunction: partnerFunction
        });
    }
    /**
     * Returns a request builder for updating an entity of type `SalesOrderPartner`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SalesOrderPartner`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(salesOrderOrEntity, partnerFunction) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, salesOrderOrEntity instanceof SalesOrderPartner_1.SalesOrderPartner
            ? salesOrderOrEntity
            : {
                SalesOrder: salesOrderOrEntity,
                PartnerFunction: partnerFunction
            });
    }
}
exports.SalesOrderPartnerRequestBuilder = SalesOrderPartnerRequestBuilder;
//# sourceMappingURL=SalesOrderPartnerRequestBuilder.js.map