/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SuplrInvcItemPurOrdRef } from './SuplrInvcItemPurOrdRef';
import { SuplrInvcItemPurOrdRefRequestBuilder } from './SuplrInvcItemPurOrdRefRequestBuilder';
import { SuplrInvcItemAcctAssgmtApi } from './SuplrInvcItemAcctAssgmtApi';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  Link
} from '@sap-cloud-sdk/odata-v2';
export class SuplrInvcItemPurOrdRefApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<SuplrInvcItemPurOrdRef<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ) {
    this.deSerializers = deSerializers;
  }

  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  public static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): SuplrInvcItemPurOrdRefApi<DeSerializersT> {
    return new SuplrInvcItemPurOrdRefApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property {@link toSupplierInvoiceItmAcctAssgmt} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPPLIER_INVOICE_ITM_ACCT_ASSGMT: Link<
      SuplrInvcItemPurOrdRef<DeSerializersT>,
      DeSerializersT,
      SuplrInvcItemAcctAssgmtApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [SuplrInvcItemAcctAssgmtApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      TO_SUPPLIER_INVOICE_ITM_ACCT_ASSGMT: new Link(
        'to_SupplierInvoiceItmAcctAssgmt',
        this,
        linkedApis[0]
      )
    };
    return this;
  }

  entityConstructor = SuplrInvcItemPurOrdRef;

  requestBuilder(): SuplrInvcItemPurOrdRefRequestBuilder<DeSerializersT> {
    return new SuplrInvcItemPurOrdRefRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SuplrInvcItemPurOrdRef<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      SuplrInvcItemPurOrdRef<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    SuplrInvcItemPurOrdRef<DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<
    typeof SuplrInvcItemPurOrdRef,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SuplrInvcItemPurOrdRef,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_INVOICE_ITEM: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PURCHASE_ORDER: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_ITEM: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PLANT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REFERENCE_DOCUMENT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REFERENCE_DOCUMENT_FISCAL_YEAR: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    REFERENCE_DOCUMENT_ITEM: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_SUBSEQUENT_DEBIT_CREDIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_AMOUNT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PURCHASE_ORDER_QUANTITY_UNIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_QTY_UNIT_SAP_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_QTY_UNIT_ISO_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY_IN_PURCHASE_ORDER_UNIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT_SAP_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PURCHASE_ORDER_PRICE_UNIT_ISO_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QTY_IN_PURCHASE_ORDER_PRICE_UNIT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    SUPLR_INVC_DELIVERY_COST_CNDN_TYPE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_DELIVERY_COST_CNDN_STEP: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_DELIVERY_COST_CNDN_COUNT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_TEXT: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FREIGHT_SUPPLIER: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_NOT_CASH_DISCOUNT_LIABLE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    PURCHASING_DOCUMENT_ITEM_CATEGORY: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PRODUCT_TYPE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    RETENTION_AMOUNT_IN_DOC_CURRENCY: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    RETENTION_PERCENTAGE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    RETENTION_DUE_DATE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    SUPLR_INVC_ITM_IS_NOT_RLVT_FOR_RTNTN: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    SERVICE_ENTRY_SHEET: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SERVICE_ENTRY_SHEET_ITEM: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_FINALLY_INVOICED: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TAX_DETERMINATION_DATE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    IN_HSN_OR_SAC_CODE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IN_CUSTOM_DUTY_ASSESSABLE_VALUE: OrderableEdmTypeField<
      SuplrInvcItemPurOrdRef<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toSupplierInvoiceItmAcctAssgmt} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SUPPLIER_INVOICE_ITM_ACCT_ASSGMT: Link<
      SuplrInvcItemPurOrdRef<DeSerializersT>,
      DeSerializersT,
      SuplrInvcItemAcctAssgmtApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SuplrInvcItemPurOrdRef<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link supplierInvoice} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE: fieldBuilder.buildEdmTypeField(
          'SupplierInvoice',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link fiscalYear} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FISCAL_YEAR: fieldBuilder.buildEdmTypeField(
          'FiscalYear',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link supplierInvoiceItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ITEM: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceItem',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link purchaseOrder} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER: fieldBuilder.buildEdmTypeField(
          'PurchaseOrder',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link purchaseOrderItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_ITEM: fieldBuilder.buildEdmTypeField(
          'PurchaseOrderItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link plant} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PLANT: fieldBuilder.buildEdmTypeField('Plant', 'Edm.String', true),
        /**
         * Static representation of the {@link referenceDocument} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REFERENCE_DOCUMENT: fieldBuilder.buildEdmTypeField(
          'ReferenceDocument',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link referenceDocumentFiscalYear} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REFERENCE_DOCUMENT_FISCAL_YEAR: fieldBuilder.buildEdmTypeField(
          'ReferenceDocumentFiscalYear',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link referenceDocumentItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REFERENCE_DOCUMENT_ITEM: fieldBuilder.buildEdmTypeField(
          'ReferenceDocumentItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isSubsequentDebitCredit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_SUBSEQUENT_DEBIT_CREDIT: fieldBuilder.buildEdmTypeField(
          'IsSubsequentDebitCredit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link taxCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_CODE: fieldBuilder.buildEdmTypeField('TaxCode', 'Edm.String', true),
        /**
         * Static representation of the {@link taxJurisdiction} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_JURISDICTION: fieldBuilder.buildEdmTypeField(
          'TaxJurisdiction',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link documentCurrency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOCUMENT_CURRENCY: fieldBuilder.buildEdmTypeField(
          'DocumentCurrency',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplierInvoiceItemAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ITEM_AMOUNT: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceItemAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link purchaseOrderQuantityUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_QUANTITY_UNIT: fieldBuilder.buildEdmTypeField(
          'PurchaseOrderQuantityUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link purchaseOrderQtyUnitSapCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_QTY_UNIT_SAP_CODE: fieldBuilder.buildEdmTypeField(
          'PurchaseOrderQtyUnitSAPCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link purchaseOrderQtyUnitIsoCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_QTY_UNIT_ISO_CODE: fieldBuilder.buildEdmTypeField(
          'PurchaseOrderQtyUnitISOCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link quantityInPurchaseOrderUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        QUANTITY_IN_PURCHASE_ORDER_UNIT: fieldBuilder.buildEdmTypeField(
          'QuantityInPurchaseOrderUnit',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link purchaseOrderPriceUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_PRICE_UNIT: fieldBuilder.buildEdmTypeField(
          'PurchaseOrderPriceUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link purchaseOrderPriceUnitSapCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_PRICE_UNIT_SAP_CODE: fieldBuilder.buildEdmTypeField(
          'PurchaseOrderPriceUnitSAPCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link purchaseOrderPriceUnitIsoCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASE_ORDER_PRICE_UNIT_ISO_CODE: fieldBuilder.buildEdmTypeField(
          'PurchaseOrderPriceUnitISOCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link qtyInPurchaseOrderPriceUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        QTY_IN_PURCHASE_ORDER_PRICE_UNIT: fieldBuilder.buildEdmTypeField(
          'QtyInPurchaseOrderPriceUnit',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcDeliveryCostCndnType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_DELIVERY_COST_CNDN_TYPE: fieldBuilder.buildEdmTypeField(
          'SuplrInvcDeliveryCostCndnType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcDeliveryCostCndnStep} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_DELIVERY_COST_CNDN_STEP: fieldBuilder.buildEdmTypeField(
          'SuplrInvcDeliveryCostCndnStep',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcDeliveryCostCndnCount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_DELIVERY_COST_CNDN_COUNT: fieldBuilder.buildEdmTypeField(
          'SuplrInvcDeliveryCostCndnCount',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link supplierInvoiceItemText} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ITEM_TEXT: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceItemText',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link freightSupplier} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FREIGHT_SUPPLIER: fieldBuilder.buildEdmTypeField(
          'FreightSupplier',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isNotCashDiscountLiable} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_NOT_CASH_DISCOUNT_LIABLE: fieldBuilder.buildEdmTypeField(
          'IsNotCashDiscountLiable',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link purchasingDocumentItemCategory} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASING_DOCUMENT_ITEM_CATEGORY: fieldBuilder.buildEdmTypeField(
          'PurchasingDocumentItemCategory',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link productType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRODUCT_TYPE: fieldBuilder.buildEdmTypeField(
          'ProductType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link retentionAmountInDocCurrency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RETENTION_AMOUNT_IN_DOC_CURRENCY: fieldBuilder.buildEdmTypeField(
          'RetentionAmountInDocCurrency',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link retentionPercentage} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RETENTION_PERCENTAGE: fieldBuilder.buildEdmTypeField(
          'RetentionPercentage',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link retentionDueDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RETENTION_DUE_DATE: fieldBuilder.buildEdmTypeField(
          'RetentionDueDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcItmIsNotRlvtForRtntn} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_ITM_IS_NOT_RLVT_FOR_RTNTN: fieldBuilder.buildEdmTypeField(
          'SuplrInvcItmIsNotRlvtForRtntn',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link serviceEntrySheet} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SERVICE_ENTRY_SHEET: fieldBuilder.buildEdmTypeField(
          'ServiceEntrySheet',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link serviceEntrySheetItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SERVICE_ENTRY_SHEET_ITEM: fieldBuilder.buildEdmTypeField(
          'ServiceEntrySheetItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link taxCountry} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_COUNTRY: fieldBuilder.buildEdmTypeField(
          'TaxCountry',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isFinallyInvoiced} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_FINALLY_INVOICED: fieldBuilder.buildEdmTypeField(
          'IsFinallyInvoiced',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link taxDeterminationDate} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_DETERMINATION_DATE: fieldBuilder.buildEdmTypeField(
          'TaxDeterminationDate',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the {@link inHsnOrSacCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IN_HSN_OR_SAC_CODE: fieldBuilder.buildEdmTypeField(
          'IN_HSNOrSACCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link inCustomDutyAssessableValue} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IN_CUSTOM_DUTY_ASSESSABLE_VALUE: fieldBuilder.buildEdmTypeField(
          'IN_CustomDutyAssessableValue',
          'Edm.Decimal',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SuplrInvcItemPurOrdRef)
      };
    }

    return this._schema;
  }
}
