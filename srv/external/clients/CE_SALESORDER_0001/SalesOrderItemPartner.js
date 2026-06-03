"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderItemPartner = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderItemPartner" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderItemPartner extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderItemPartner = SalesOrderItemPartner;
/**
 * Technical entity name for SalesOrderItemPartner.
 */
SalesOrderItemPartner._entityName = 'SalesOrderItemPartner';
/**
 * Default url path for the according service.
 */
SalesOrderItemPartner._defaultBasePath = '/';
/**
 * All key fields of the SalesOrderItemPartner entity.
 */
SalesOrderItemPartner._keys = ['SalesOrder', 'SalesOrderItem', 'PartnerFunction'];
//# sourceMappingURL=SalesOrderItemPartner.js.map