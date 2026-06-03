"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostInvoiceExportParameters = exports.PostInvoiceExportParametersField = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * PostInvoiceExportParametersField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class PostInvoiceExportParametersField extends odata_v2_1.ComplexTypeField {
    /**
     * Creates an instance of PostInvoiceExportParametersField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, PostInvoiceExportParameters, fieldOptions);
        this._fieldBuilder = new odata_v2_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link PostInvoiceExportParameters.success} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.success = this._fieldBuilder.buildEdmTypeField('Success', 'Edm.Boolean', false);
    }
}
exports.PostInvoiceExportParametersField = PostInvoiceExportParametersField;
var PostInvoiceExportParameters;
(function (PostInvoiceExportParameters) {
    /**
     * Metadata information on all properties of the `PostInvoiceExportParameters` complex type.
     */
    PostInvoiceExportParameters._propertyMetadata = [
        {
            originalName: 'Success',
            name: 'success',
            type: 'Edm.Boolean',
            isCollection: false
        }
    ];
})(PostInvoiceExportParameters || (exports.PostInvoiceExportParameters = PostInvoiceExportParameters = {}));
//# sourceMappingURL=PostInvoiceExportParameters.js.map