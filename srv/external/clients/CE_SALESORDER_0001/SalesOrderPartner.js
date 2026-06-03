"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderPartner = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderPartner" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderPartner extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderPartner = SalesOrderPartner;
/**
 * Technical entity name for SalesOrderPartner.
 */
SalesOrderPartner._entityName = 'SalesOrderPartner';
/**
 * Default url path for the according service.
 */
SalesOrderPartner._defaultBasePath = '/';
/**
 * All key fields of the SalesOrderPartner entity.
 */
SalesOrderPartner._keys = ['SalesOrder', 'PartnerFunction'];
//# sourceMappingURL=SalesOrderPartner.js.map