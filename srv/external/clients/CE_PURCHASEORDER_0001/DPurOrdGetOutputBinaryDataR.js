"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPurOrdGetOutputBinaryDataR = exports.DPurOrdGetOutputBinaryDataRField = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * DPurOrdGetOutputBinaryDataRField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class DPurOrdGetOutputBinaryDataRField extends odata_v4_1.ComplexTypeField {
    /**
     * Creates an instance of DPurOrdGetOutputBinaryDataRField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, DPurOrdGetOutputBinaryDataR, fieldOptions);
        this._fieldBuilder = new odata_v4_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link DPurOrdGetOutputBinaryDataR.mimeType} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.mimeType = this._fieldBuilder.buildEdmTypeField('MimeType', 'Edm.String', false);
        /**
         * Representation of the {@link DPurOrdGetOutputBinaryDataR.outputBinaryData} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.outputBinaryData = this._fieldBuilder.buildEdmTypeField('OutputBinaryData', 'Edm.Binary', false);
        /**
         * Representation of the {@link DPurOrdGetOutputBinaryDataR.outputChannel} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.outputChannel = this._fieldBuilder.buildEdmTypeField('OutputChannel', 'Edm.String', false);
        /**
         * Representation of the {@link DPurOrdGetOutputBinaryDataR.outputDocumentName} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.outputDocumentName = this._fieldBuilder.buildEdmTypeField('OutputDocumentName', 'Edm.String', false);
        /**
         * Representation of the {@link DPurOrdGetOutputBinaryDataR.recipient} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.recipient = this._fieldBuilder.buildEdmTypeField('Recipient', 'Edm.String', false);
        /**
         * Representation of the {@link DPurOrdGetOutputBinaryDataR.recipientRole} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.recipientRole = this._fieldBuilder.buildEdmTypeField('RecipientRole', 'Edm.String', false);
    }
}
exports.DPurOrdGetOutputBinaryDataRField = DPurOrdGetOutputBinaryDataRField;
var DPurOrdGetOutputBinaryDataR;
(function (DPurOrdGetOutputBinaryDataR) {
    /**
     * Metadata information on all properties of the `DPurOrdGetOutputBinaryDataR` complex type.
     */
    DPurOrdGetOutputBinaryDataR._propertyMetadata = [
        {
            originalName: 'MimeType',
            name: 'mimeType',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'OutputBinaryData',
            name: 'outputBinaryData',
            type: 'Edm.Binary',
            isCollection: false
        },
        {
            originalName: 'OutputChannel',
            name: 'outputChannel',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'OutputDocumentName',
            name: 'outputDocumentName',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'Recipient',
            name: 'recipient',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'RecipientRole',
            name: 'recipientRole',
            type: 'Edm.String',
            isCollection: false
        }
    ];
})(DPurOrdGetOutputBinaryDataR || (exports.DPurOrdGetOutputBinaryDataR = DPurOrdGetOutputBinaryDataR = {}));
//# sourceMappingURL=DPurOrdGetOutputBinaryDataR.js.map