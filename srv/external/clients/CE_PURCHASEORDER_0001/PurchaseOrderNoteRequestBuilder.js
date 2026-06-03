"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderNoteRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrderNote_1 = require("./PurchaseOrderNote");
/**
 * Request builder class for operations supported on the {@link PurchaseOrderNote} entity.
 */
class PurchaseOrderNoteRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrderNote` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrderNote` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrderNote` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrderNote`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrderNote` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurchaseOrderNote.purchaseOrder}.
     * @param textObjectType Key property. See {@link PurchaseOrderNote.textObjectType}.
     * @param language Key property. See {@link PurchaseOrderNote.language}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrderNote` entity based on its keys.
     */
    getByKey(purchaseOrder, textObjectType, language) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            TextObjectType: textObjectType,
            Language: language
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrderNote`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrderNote`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, textObjectType, language) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurchaseOrderNote_1.PurchaseOrderNote
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                TextObjectType: textObjectType,
                Language: language
            });
    }
}
exports.PurchaseOrderNoteRequestBuilder = PurchaseOrderNoteRequestBuilder;
//# sourceMappingURL=PurchaseOrderNoteRequestBuilder.js.map