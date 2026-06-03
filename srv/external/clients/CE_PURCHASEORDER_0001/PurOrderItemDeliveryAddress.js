"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurOrderItemDeliveryAddress = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "PurOrderItemDeliveryAddress" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PurOrderItemDeliveryAddress extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PurOrderItemDeliveryAddress = PurOrderItemDeliveryAddress;
/**
 * Technical entity name for PurOrderItemDeliveryAddress.
 */
PurOrderItemDeliveryAddress._entityName = 'PurOrderItemDeliveryAddress';
/**
 * Default url path for the according service.
 */
PurOrderItemDeliveryAddress._defaultBasePath = '/';
/**
 * All key fields of the PurOrderItemDeliveryAddress entity.
 */
PurOrderItemDeliveryAddress._keys = ['PurchaseOrder', 'PurchaseOrderItem', 'DeliveryAddressID'];
//# sourceMappingURL=PurOrderItemDeliveryAddress.js.map