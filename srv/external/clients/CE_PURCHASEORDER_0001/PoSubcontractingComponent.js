"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoSubcontractingComponent = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "POSubcontractingComponent" of service "com.sap.gateway.srvd_a2x.api_purchaseorder_2.v0001".
 */
class PoSubcontractingComponent extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.PoSubcontractingComponent = PoSubcontractingComponent;
/**
 * Technical entity name for PoSubcontractingComponent.
 */
PoSubcontractingComponent._entityName = 'POSubcontractingComponent';
/**
 * Default url path for the according service.
 */
PoSubcontractingComponent._defaultBasePath = '/';
/**
 * All key fields of the PoSubcontractingComponent entity.
 */
PoSubcontractingComponent._keys = [
    'PurchaseOrder',
    'PurchaseOrderItem',
    'ScheduleLine',
    'ReservationItem',
    'RecordType'
];
//# sourceMappingURL=PoSubcontractingComponent.js.map