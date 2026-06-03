"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderScheduleLine = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "PurchaseOrderScheduleLine" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PurchaseOrderScheduleLine extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PurchaseOrderScheduleLine = PurchaseOrderScheduleLine;
/**
 * Technical entity name for PurchaseOrderScheduleLine.
 */
PurchaseOrderScheduleLine._entityName = 'PurchaseOrderScheduleLine';
/**
 * Default url path for the according service.
 */
PurchaseOrderScheduleLine._defaultBasePath = '/';
/**
 * All key fields of the PurchaseOrderScheduleLine entity.
 */
PurchaseOrderScheduleLine._keys = ['PurchaseOrder', 'PurchaseOrderItem', 'ScheduleLine'];
//# sourceMappingURL=PurchaseOrderScheduleLine.js.map