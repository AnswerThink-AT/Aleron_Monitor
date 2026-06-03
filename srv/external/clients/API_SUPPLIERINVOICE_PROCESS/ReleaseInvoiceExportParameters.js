"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseInvoiceExportParameters = exports.ReleaseInvoiceExportParametersField = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * ReleaseInvoiceExportParametersField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class ReleaseInvoiceExportParametersField extends odata_v2_1.ComplexTypeField {
    /**
     * Creates an instance of ReleaseInvoiceExportParametersField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, ReleaseInvoiceExportParameters, fieldOptions);
        this._fieldBuilder = new odata_v2_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link ReleaseInvoiceExportParameters.success} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.success = this._fieldBuilder.buildEdmTypeField('Success', 'Edm.Boolean', false);
    }
}
exports.ReleaseInvoiceExportParametersField = ReleaseInvoiceExportParametersField;
var ReleaseInvoiceExportParameters;
(function (ReleaseInvoiceExportParameters) {
    /**
     * Metadata information on all properties of the `ReleaseInvoiceExportParameters` complex type.
     */
    ReleaseInvoiceExportParameters._propertyMetadata = [
        {
            originalName: 'Success',
            name: 'success',
            type: 'Edm.Boolean',
            isCollection: false
        }
    ];
})(ReleaseInvoiceExportParameters || (exports.ReleaseInvoiceExportParameters = ReleaseInvoiceExportParameters = {}));
//# sourceMappingURL=ReleaseInvoiceExportParameters.js.map