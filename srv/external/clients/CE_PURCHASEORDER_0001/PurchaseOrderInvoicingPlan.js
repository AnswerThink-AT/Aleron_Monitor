"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderInvoicingPlan = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "PurchaseOrderInvoicingPlan" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PurchaseOrderInvoicingPlan extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PurchaseOrderInvoicingPlan = PurchaseOrderInvoicingPlan;
/**
 * Technical entity name for PurchaseOrderInvoicingPlan.
 */
PurchaseOrderInvoicingPlan._entityName = 'PurchaseOrderInvoicingPlan';
/**
 * Default url path for the according service.
 */
PurchaseOrderInvoicingPlan._defaultBasePath = '/';
/**
 * All key fields of the PurchaseOrderInvoicingPlan entity.
 */
PurchaseOrderInvoicingPlan._keys = ['PurchaseOrder', 'PurchaseOrderItem', 'InvoicingPlan'];
//# sourceMappingURL=PurchaseOrderInvoicingPlan.js.map