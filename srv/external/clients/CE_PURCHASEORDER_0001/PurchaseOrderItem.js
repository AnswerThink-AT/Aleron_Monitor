"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderItem = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "PurchaseOrderItem" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PurchaseOrderItem extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PurchaseOrderItem = PurchaseOrderItem;
/**
 * Technical entity name for PurchaseOrderItem.
 */
PurchaseOrderItem._entityName = 'PurchaseOrderItem';
/**
 * Default url path for the according service.
 */
PurchaseOrderItem._defaultBasePath = '/';
/**
 * All key fields of the PurchaseOrderItem entity.
 */
PurchaseOrderItem._keys = ['PurchaseOrder', 'PurchaseOrderItem'];
//# sourceMappingURL=PurchaseOrderItem.js.map