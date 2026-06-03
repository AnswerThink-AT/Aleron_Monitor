"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
exports.post = post;
exports.release = release;
exports.cancel = cancel;
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const PostInvoiceExportParameters_1 = require("./PostInvoiceExportParameters");
const ReleaseInvoiceExportParameters_1 = require("./ReleaseInvoiceExportParameters");
const CancelInvoiceExportParameters_1 = require("./CancelInvoiceExportParameters");
/**
 * Post.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function post(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        fiscalYear: new odata_v2_1.OperationParameter('FiscalYear', 'Edm.String', parameters.fiscalYear),
        supplierInvoice: new odata_v2_1.OperationParameter('SupplierInvoice', 'Edm.String', parameters.supplierInvoice)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV', 'Post', data => (0, odata_v2_1.transformReturnValueForComplexType)(data, data => (0, odata_v2_1.entityDeserializer)(deSerializers || odata_v2_1.defaultDeSerializers).deserializeComplexType(data, PostInvoiceExportParameters_1.PostInvoiceExportParameters)), params, deSerializers);
}
/**
 * Release.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function release(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        discountDaysHaveToBeShifted: new odata_v2_1.OperationParameter('DiscountDaysHaveToBeShifted', 'Edm.Boolean', parameters.discountDaysHaveToBeShifted),
        fiscalYear: new odata_v2_1.OperationParameter('FiscalYear', 'Edm.String', parameters.fiscalYear),
        supplierInvoice: new odata_v2_1.OperationParameter('SupplierInvoice', 'Edm.String', parameters.supplierInvoice)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV', 'Release', data => (0, odata_v2_1.transformReturnValueForComplexType)(data, data => (0, odata_v2_1.entityDeserializer)(deSerializers || odata_v2_1.defaultDeSerializers).deserializeComplexType(data, ReleaseInvoiceExportParameters_1.ReleaseInvoiceExportParameters)), params, deSerializers);
}
/**
 * Cancel.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function cancel(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        supplierInvoice: new odata_v2_1.OperationParameter('SupplierInvoice', 'Edm.String', parameters.supplierInvoice),
        fiscalYear: new odata_v2_1.OperationParameter('FiscalYear', 'Edm.String', parameters.fiscalYear),
        reversalReason: new odata_v2_1.OperationParameter('ReversalReason', 'Edm.String', parameters.reversalReason),
        postingDate: new odata_v2_1.OperationParameter('PostingDate', 'Edm.DateTime', parameters.postingDate)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV', 'Cancel', data => (0, odata_v2_1.transformReturnValueForComplexType)(data, data => (0, odata_v2_1.entityDeserializer)(deSerializers || odata_v2_1.defaultDeSerializers).deserializeComplexType(data, CancelInvoiceExportParameters_1.CancelInvoiceExportParameters)), params, deSerializers);
}
exports.operations = {
    post,
    release,
    cancel
};
//# sourceMappingURL=operations.js.map