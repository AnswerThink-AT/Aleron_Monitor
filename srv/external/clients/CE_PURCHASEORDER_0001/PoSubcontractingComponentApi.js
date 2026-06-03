"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoSubcontractingComponentApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PoSubcontractingComponent_1 = require("./PoSubcontractingComponent");
const PoSubcontractingComponentRequestBuilder_1 = require("./PoSubcontractingComponentRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class PoSubcontractingComponentApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = PoSubcontractingComponent_1.PoSubcontractingComponent;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new PoSubcontractingComponentApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            PURCHASE_ORDER_1: new odata_v4_1.OneToOneLink('_PurchaseOrder', this, linkedApis[0]),
            PURCHASE_ORDER_ITEM_1: new odata_v4_1.OneToOneLink('_PurchaseOrderItem', this, linkedApis[1]),
            SCHEDULE_LINE_1: new odata_v4_1.OneToOneLink('_ScheduleLine', this, linkedApis[2])
        };
        return this;
    }
    requestBuilder() {
        return new PoSubcontractingComponentRequestBuilder_1.PoSubcontractingComponentRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(PoSubcontractingComponent_1.PoSubcontractingComponent, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link purchaseOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER: fieldBuilder.buildEdmTypeField('PurchaseOrder', 'Edm.String', false),
                /**
                 * Static representation of the {@link purchaseOrderItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PURCHASE_ORDER_ITEM: fieldBuilder.buildEdmTypeField('PurchaseOrderItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link scheduleLine} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SCHEDULE_LINE: fieldBuilder.buildEdmTypeField('ScheduleLine', 'Edm.String', false),
                /**
                 * Static representation of the {@link reservationItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RESERVATION_ITEM: fieldBuilder.buildEdmTypeField('ReservationItem', 'Edm.String', false),
                /**
                 * Static representation of the {@link recordType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RECORD_TYPE: fieldBuilder.buildEdmTypeField('RecordType', 'Edm.String', false),
                /**
                 * Static representation of the {@link material} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATERIAL: fieldBuilder.buildEdmTypeField('Material', 'Edm.String', false),
                /**
                 * Static representation of the {@link isMaterialProvision} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_MATERIAL_PROVISION: fieldBuilder.buildEdmTypeField('IsMaterialProvision', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link materialProvisionType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATERIAL_PROVISION_TYPE: fieldBuilder.buildEdmTypeField('MaterialProvisionType', 'Edm.String', false),
                /**
                 * Static representation of the {@link materialQtyToBaseQtyNmrtr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATERIAL_QTY_TO_BASE_QTY_NMRTR: fieldBuilder.buildEdmTypeField('MaterialQtyToBaseQtyNmrtr', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link materialQtyToBaseQtyDnmntr} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATERIAL_QTY_TO_BASE_QTY_DNMNTR: fieldBuilder.buildEdmTypeField('MaterialQtyToBaseQtyDnmntr', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link materialRevisionLevel} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATERIAL_REVISION_LEVEL: fieldBuilder.buildEdmTypeField('MaterialRevisionLevel', 'Edm.String', false),
                /**
                 * Static representation of the {@link materialCompIsVariableSized} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATERIAL_COMP_IS_VARIABLE_SIZED: fieldBuilder.buildEdmTypeField('MaterialCompIsVariableSized', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link materialComponentIsPhantomItem} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATERIAL_COMPONENT_IS_PHANTOM_ITEM: fieldBuilder.buildEdmTypeField('MaterialComponentIsPhantomItem', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link reservation} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RESERVATION: fieldBuilder.buildEdmTypeField('Reservation', 'Edm.String', false),
                /**
                 * Static representation of the {@link requiredQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REQUIRED_QUANTITY: fieldBuilder.buildEdmTypeField('RequiredQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link requirementDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REQUIREMENT_DATE: fieldBuilder.buildEdmTypeField('RequirementDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link requirementTime} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REQUIREMENT_TIME: fieldBuilder.buildEdmTypeField('RequirementTime', 'Edm.TimeOfDay', false),
                /**
                 * Static representation of the {@link reservationIsFinallyIssued} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                RESERVATION_IS_FINALLY_ISSUED: fieldBuilder.buildEdmTypeField('ReservationIsFinallyIssued', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link baseUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BASE_UNIT: fieldBuilder.buildEdmTypeField('BaseUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link quantityInEntryUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                QUANTITY_IN_ENTRY_UNIT: fieldBuilder.buildEdmTypeField('QuantityInEntryUnit', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link entryUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ENTRY_UNIT: fieldBuilder.buildEdmTypeField('EntryUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link variableSizeItemQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VARIABLE_SIZE_ITEM_QUANTITY: fieldBuilder.buildEdmTypeField('VariableSizeItemQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link variableSizeItemUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VARIABLE_SIZE_ITEM_UNIT: fieldBuilder.buildEdmTypeField('VariableSizeItemUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link variableSizeComponentUnit} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VARIABLE_SIZE_COMPONENT_UNIT: fieldBuilder.buildEdmTypeField('VariableSizeComponentUnit', 'Edm.String', false),
                /**
                 * Static representation of the {@link variableSizeComponentQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VARIABLE_SIZE_COMPONENT_QUANTITY: fieldBuilder.buildEdmTypeField('VariableSizeComponentQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link unitOfMeasureForSize1To3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UNIT_OF_MEASURE_FOR_SIZE_1_TO_3: fieldBuilder.buildEdmTypeField('UnitOfMeasureForSize1To3', 'Edm.String', false),
                /**
                 * Static representation of the {@link size1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SIZE_1: fieldBuilder.buildEdmTypeField('Size1', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link size2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SIZE_2: fieldBuilder.buildEdmTypeField('Size2', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link size3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SIZE_3: fieldBuilder.buildEdmTypeField('Size3', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link plant} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PLANT: fieldBuilder.buildEdmTypeField('Plant', 'Edm.String', false),
                /**
                 * Static representation of the {@link latestRequirementDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LATEST_REQUIREMENT_DATE: fieldBuilder.buildEdmTypeField('LatestRequirementDate', 'Edm.Date', true),
                /**
                 * Static representation of the {@link orderLevelValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ORDER_LEVEL_VALUE: fieldBuilder.buildEdmTypeField('OrderLevelValue', 'Edm.String', false),
                /**
                 * Static representation of the {@link orderPathValue} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ORDER_PATH_VALUE: fieldBuilder.buildEdmTypeField('OrderPathValue', 'Edm.String', false),
                /**
                 * Static representation of the {@link billOfMaterialItemNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BILL_OF_MATERIAL_ITEM_NUMBER: fieldBuilder.buildEdmTypeField('BillOfMaterialItemNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link matlCompFreeDefinedAttribute} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MATL_COMP_FREE_DEFINED_ATTRIBUTE: fieldBuilder.buildEdmTypeField('MatlCompFreeDefinedAttribute', 'Edm.String', false),
                /**
                 * Static representation of the {@link bomItemCategory} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOM_ITEM_CATEGORY: fieldBuilder.buildEdmTypeField('BOMItemCategory', 'Edm.String', false),
                /**
                 * Static representation of the {@link isBulkMaterialComponent} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_BULK_MATERIAL_COMPONENT: fieldBuilder.buildEdmTypeField('IsBulkMaterialComponent', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link accountAssignmentCategory} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ACCOUNT_ASSIGNMENT_CATEGORY: fieldBuilder.buildEdmTypeField('AccountAssignmentCategory', 'Edm.String', false),
                /**
                 * Static representation of the {@link inventorySpecialStockType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVENTORY_SPECIAL_STOCK_TYPE: fieldBuilder.buildEdmTypeField('InventorySpecialStockType', 'Edm.String', false),
                /**
                 * Static representation of the {@link consumptionPosting} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONSUMPTION_POSTING: fieldBuilder.buildEdmTypeField('ConsumptionPosting', 'Edm.String', false),
                /**
                 * Static representation of the {@link inventorySpecialStockValnType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INVENTORY_SPECIAL_STOCK_VALN_TYPE: fieldBuilder.buildEdmTypeField('InventorySpecialStockValnType', 'Edm.String', false),
                /**
                 * Static representation of the {@link debitCreditCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DEBIT_CREDIT_CODE: fieldBuilder.buildEdmTypeField('DebitCreditCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link withdrawnQuantity} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                WITHDRAWN_QUANTITY: fieldBuilder.buildEdmTypeField('WithdrawnQuantity', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link quantityIsFixed} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                QUANTITY_IS_FIXED: fieldBuilder.buildEdmTypeField('QuantityIsFixed', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link componentScrapInPercent} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPONENT_SCRAP_IN_PERCENT: fieldBuilder.buildEdmTypeField('ComponentScrapInPercent', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link operationScrapInPercent} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                OPERATION_SCRAP_IN_PERCENT: fieldBuilder.buildEdmTypeField('OperationScrapInPercent', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link isNetScrap} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                IS_NET_SCRAP: fieldBuilder.buildEdmTypeField('IsNetScrap', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link leadTimeOffset} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                LEAD_TIME_OFFSET: fieldBuilder.buildEdmTypeField('LeadTimeOffset', 'Edm.Decimal', false),
                /**
                 * Static representation of the {@link quantityDistributionKey} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                QUANTITY_DISTRIBUTION_KEY: fieldBuilder.buildEdmTypeField('QuantityDistributionKey', 'Edm.String', false),
                /**
                 * Static representation of the {@link formulaKey} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FORMULA_KEY: fieldBuilder.buildEdmTypeField('FormulaKey', 'Edm.String', false),
                /**
                 * Static representation of the {@link storageLocation} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STORAGE_LOCATION: fieldBuilder.buildEdmTypeField('StorageLocation', 'Edm.String', false),
                /**
                 * Static representation of the {@link productionSupplyArea} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PRODUCTION_SUPPLY_AREA: fieldBuilder.buildEdmTypeField('ProductionSupplyArea', 'Edm.String', false),
                /**
                 * Static representation of the {@link batch} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BATCH: fieldBuilder.buildEdmTypeField('Batch', 'Edm.String', false),
                /**
                 * Static representation of the {@link bomItemDescription} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOM_ITEM_DESCRIPTION: fieldBuilder.buildEdmTypeField('BOMItemDescription', 'Edm.String', false),
                /**
                 * Static representation of the {@link bomItemText2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOM_ITEM_TEXT_2: fieldBuilder.buildEdmTypeField('BOMItemText2', 'Edm.String', false),
                /**
                 * Static representation of the {@link changeNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CHANGE_NUMBER: fieldBuilder.buildEdmTypeField('ChangeNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link sapMessages} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SAP_MESSAGES: fieldBuilder.buildCollectionField('SAP__Messages', Sap_Message_1.Sap_Message, false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', PoSubcontractingComponent_1.PoSubcontractingComponent)
            };
        }
        return this._schema;
    }
}
exports.PoSubcontractingComponentApi = PoSubcontractingComponentApi;
//# sourceMappingURL=PoSubcontractingComponentApi.js.map