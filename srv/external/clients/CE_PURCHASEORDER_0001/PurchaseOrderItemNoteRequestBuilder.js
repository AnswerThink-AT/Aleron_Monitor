"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderItemNoteRequestBuilder = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const PurchaseOrderItemNote_1 = require("./PurchaseOrderItemNote");
/**
 * Request builder class for operations supported on the {@link PurchaseOrderItemNote} entity.
 */
class PurchaseOrderItemNoteRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `PurchaseOrderItemNote` entities.
     * @returns A request builder for creating requests to retrieve all `PurchaseOrderItemNote` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `PurchaseOrderItemNote` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `PurchaseOrderItemNote`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `PurchaseOrderItemNote` entity based on its keys.
     * @param purchaseOrder Key property. See {@link PurchaseOrderItemNote.purchaseOrder}.
     * @param purchaseOrderItem Key property. See {@link PurchaseOrderItemNote.purchaseOrderItem}.
     * @param textObjectType Key property. See {@link PurchaseOrderItemNote.textObjectType}.
     * @param language Key property. See {@link PurchaseOrderItemNote.language}.
     * @returns A request builder for creating requests to retrieve one `PurchaseOrderItemNote` entity based on its keys.
     */
    getByKey(purchaseOrder, purchaseOrderItem, textObjectType, language) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            PurchaseOrder: purchaseOrder,
            PurchaseOrderItem: purchaseOrderItem,
            TextObjectType: textObjectType,
            Language: language
        });
    }
    /**
     * Returns a request builder for updating an entity of type `PurchaseOrderItemNote`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `PurchaseOrderItemNote`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(purchaseOrderOrEntity, purchaseOrderItem, textObjectType, language) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, purchaseOrderOrEntity instanceof PurchaseOrderItemNote_1.PurchaseOrderItemNote
            ? purchaseOrderOrEntity
            : {
                PurchaseOrder: purchaseOrderOrEntity,
                PurchaseOrderItem: purchaseOrderItem,
                TextObjectType: textObjectType,
                Language: language
            });
    }
}
exports.PurchaseOrderItemNoteRequestBuilder = PurchaseOrderItemNoteRequestBuilder;
//# sourceMappingURL=PurchaseOrderItemNoteRequestBuilder.js.map