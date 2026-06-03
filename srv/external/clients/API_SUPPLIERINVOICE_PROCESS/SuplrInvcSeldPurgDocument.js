"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuplrInvcSeldPurgDocument = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_SuplrInvcSeldPurgDocument" of service "API_SUPPLIERINVOICE_PROCESS_SRV".
 */
class SuplrInvcSeldPurgDocument extends odata_v2_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SuplrInvcSeldPurgDocument = SuplrInvcSeldPurgDocument;
/**
 * Technical entity name for SuplrInvcSeldPurgDocument.
 */
SuplrInvcSeldPurgDocument._entityName = 'A_SuplrInvcSeldPurgDocument';
/**
 * Default url path for the according service.
 */
SuplrInvcSeldPurgDocument._defaultBasePath = '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV';
/**
 * All key fields of the SuplrInvcSeldPurgDocument entity.
 */
SuplrInvcSeldPurgDocument._keys = [
    'SupplierInvoice',
    'FiscalYear',
    'PurchaseOrder',
    'PurchaseOrderItem'
];
//# sourceMappingURL=SuplrInvcSeldPurgDocument.js.map