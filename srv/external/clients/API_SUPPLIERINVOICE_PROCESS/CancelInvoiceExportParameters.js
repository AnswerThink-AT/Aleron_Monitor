"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelInvoiceExportParameters = exports.CancelInvoiceExportParametersField = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * CancelInvoiceExportParametersField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class CancelInvoiceExportParametersField extends odata_v2_1.ComplexTypeField {
    /**
     * Creates an instance of CancelInvoiceExportParametersField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, CancelInvoiceExportParameters, fieldOptions);
        this._fieldBuilder = new odata_v2_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link CancelInvoiceExportParameters.reverseDocument} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.reverseDocument = this._fieldBuilder.buildEdmTypeField('ReverseDocument', 'Edm.String', false);
        /**
         * Representation of the {@link CancelInvoiceExportParameters.fiscalYear} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.fiscalYear = this._fieldBuilder.buildEdmTypeField('FiscalYear', 'Edm.String', false);
        /**
         * Representation of the {@link CancelInvoiceExportParameters.success} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.success = this._fieldBuilder.buildEdmTypeField('Success', 'Edm.Boolean', false);
    }
}
exports.CancelInvoiceExportParametersField = CancelInvoiceExportParametersField;
var CancelInvoiceExportParameters;
(function (CancelInvoiceExportParameters) {
    /**
     * Metadata information on all properties of the `CancelInvoiceExportParameters` complex type.
     */
    CancelInvoiceExportParameters._propertyMetadata = [
        {
            originalName: 'ReverseDocument',
            name: 'reverseDocument',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'FiscalYear',
            name: 'fiscalYear',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'Success',
            name: 'success',
            type: 'Edm.Boolean',
            isCollection: false
        }
    ];
})(CancelInvoiceExportParameters || (exports.CancelInvoiceExportParameters = CancelInvoiceExportParameters = {}));
//# sourceMappingURL=CancelInvoiceExportParameters.js.map