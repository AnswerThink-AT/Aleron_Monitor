"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarConfignAssignedValue = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "VarConfignAssignedValue" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class VarConfignAssignedValue extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.VarConfignAssignedValue = VarConfignAssignedValue;
/**
 * Technical entity name for VarConfignAssignedValue.
 */
VarConfignAssignedValue._entityName = 'VarConfignAssignedValue';
/**
 * Default url path for the according service.
 */
VarConfignAssignedValue._defaultBasePath = '/';
/**
 * All key fields of the VarConfignAssignedValue entity.
 */
VarConfignAssignedValue._keys = [
    'VarConfigurationBusObjectKey',
    'VarConfigurationBusObjectType',
    'VarConfignInstceInternalID',
    'Characteristic',
    'VariantConfigurationValueID'
];
//# sourceMappingURL=VarConfignAssignedValue.js.map