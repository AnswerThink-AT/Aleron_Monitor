"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yy1_Employee_Customer_InfoRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const Yy1_Employee_Customer_Info_1 = require("./Yy1_Employee_Customer_Info");
/**
 * Request builder class for operations supported on the {@link Yy1_Employee_Customer_Info} entity.
 */
class Yy1_Employee_Customer_InfoRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `Yy1_Employee_Customer_Info` entities.
     * @returns A request builder for creating requests to retrieve all `Yy1_Employee_Customer_Info` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `Yy1_Employee_Customer_Info` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `Yy1_Employee_Customer_Info`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `Yy1_Employee_Customer_Info` entity based on its keys.
     * @param sapUuid Key property. See {@link Yy1_Employee_Customer_Info.sapUuid}.
     * @returns A request builder for creating requests to retrieve one `Yy1_Employee_Customer_Info` entity based on its keys.
     */
    getByKey(sapUuid) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { SAP_UUID: sapUuid });
    }
    /**
     * Returns a request builder for updating an entity of type `Yy1_Employee_Customer_Info`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `Yy1_Employee_Customer_Info`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(sapUuidOrEntity) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, sapUuidOrEntity instanceof Yy1_Employee_Customer_Info_1.Yy1_Employee_Customer_Info
            ? sapUuidOrEntity
            : { SAP_UUID: sapUuidOrEntity });
    }
}
exports.Yy1_Employee_Customer_InfoRequestBuilder = Yy1_Employee_Customer_InfoRequestBuilder;
//# sourceMappingURL=Yy1_Employee_Customer_InfoRequestBuilder.js.map