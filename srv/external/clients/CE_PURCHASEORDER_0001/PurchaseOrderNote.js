"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderNote = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "PurchaseOrderNote" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PurchaseOrderNote extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PurchaseOrderNote = PurchaseOrderNote;
/**
 * Technical entity name for PurchaseOrderNote.
 */
PurchaseOrderNote._entityName = 'PurchaseOrderNote';
/**
 * Default url path for the according service.
 */
PurchaseOrderNote._defaultBasePath = '/';
/**
 * All key fields of the PurchaseOrderNote entity.
 */
PurchaseOrderNote._keys = ['PurchaseOrder', 'TextObjectType', 'Language'];
//# sourceMappingURL=PurchaseOrderNote.js.map