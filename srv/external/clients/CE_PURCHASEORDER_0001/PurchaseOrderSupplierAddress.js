"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderSupplierAddress = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "PurchaseOrderSupplierAddress" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PurchaseOrderSupplierAddress extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PurchaseOrderSupplierAddress = PurchaseOrderSupplierAddress;
/**
 * Technical entity name for PurchaseOrderSupplierAddress.
 */
PurchaseOrderSupplierAddress._entityName = 'PurchaseOrderSupplierAddress';
/**
 * Default url path for the according service.
 */
PurchaseOrderSupplierAddress._defaultBasePath = '/';
/**
 * All key fields of the PurchaseOrderSupplierAddress entity.
 */
PurchaseOrderSupplierAddress._keys = ['SupplierAddressID', 'PurchaseOrder'];
//# sourceMappingURL=PurchaseOrderSupplierAddress.js.map