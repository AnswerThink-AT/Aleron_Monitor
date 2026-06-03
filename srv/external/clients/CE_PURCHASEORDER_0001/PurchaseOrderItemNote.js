"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderItemNote = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "PurchaseOrderItemNote" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PurchaseOrderItemNote extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PurchaseOrderItemNote = PurchaseOrderItemNote;
/**
 * Technical entity name for PurchaseOrderItemNote.
 */
PurchaseOrderItemNote._entityName = 'PurchaseOrderItemNote';
/**
 * Default url path for the according service.
 */
PurchaseOrderItemNote._defaultBasePath = '/';
/**
 * All key fields of the PurchaseOrderItemNote entity.
 */
PurchaseOrderItemNote._keys = [
    'PurchaseOrder',
    'PurchaseOrderItem',
    'TextObjectType',
    'Language'
];
//# sourceMappingURL=PurchaseOrderItemNote.js.map