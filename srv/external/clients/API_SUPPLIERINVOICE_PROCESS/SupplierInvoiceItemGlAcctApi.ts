/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SupplierInvoiceItemGlAcct } from './SupplierInvoiceItemGlAcct';
import { SupplierInvoiceItemGlAcctRequestBuilder } from './SupplierInvoiceItemGlAcctRequestBuilder';
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
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export class SupplierInvoiceItemGlAcctApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<SupplierInvoiceItemGlAcct<DeSerializersT>, DeSerializersT>
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
  ): SupplierInvoiceItemGlAcctApi<DeSerializersT> {
    return new SupplierInvoiceItemGlAcctApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = SupplierInvoiceItemGlAcct;

  requestBuilder(): SupplierInvoiceItemGlAcctRequestBuilder<DeSerializersT> {
    return new SupplierInvoiceItemGlAcctRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierInvoiceItemGlAcct<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      SupplierInvoiceItemGlAcct<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    SupplierInvoiceItemGlAcct<DeSerializersT>,
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
    typeof SupplierInvoiceItemGlAcct,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SupplierInvoiceItemGlAcct,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    SUPPLIER_INVOICE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    FISCAL_YEAR: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SUPPLIER_INVOICE_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COST_CENTER: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CONTROLLING_AREA: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUSINESS_AREA: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROFIT_CENTER: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUNCTIONAL_AREA: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GL_ACCOUNT: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SALES_ORDER: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SALES_ORDER_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COST_OBJECT: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COST_CTR_ACTIVITY_TYPE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUSINESS_PROCESS: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WBS_ELEMENT: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DOCUMENT_CURRENCY: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_AMOUNT: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PERSONNEL_NUMBER: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    WORK_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    DEBIT_CREDIT_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_JURISDICTION: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPPLIER_INVOICE_ITEM_TEXT: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ASSIGNMENT_REFERENCE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_NOT_CASH_DISCOUNT_LIABLE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    INTERNAL_ORDER: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    PROJECT_NETWORK: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    NETWORK_ACTIVITY: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMMITMENT_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FUNDS_CENTER: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_BASE_AMOUNT_IN_TRANS_CRCY: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    FUND: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GRANT_ID: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY_UNIT: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ITM_QTY_UNIT_SAP_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SUPLR_INVC_ITM_QTY_UNIT_ISO_CODE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    QUANTITY: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    PARTNER_BUSINESS_AREA: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    FINANCIAL_TRANSACTION_TYPE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TAX_COUNTRY: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    EARMARKED_FUNDS_DOCUMENT: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    EARMARKED_FUNDS_DOCUMENT_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BUDGET_PERIOD: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SERVICE_DOCUMENT: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SERVICE_DOCUMENT_ITEM: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    SERVICE_DOCUMENT_TYPE: OrderableEdmTypeField<
      SupplierInvoiceItemGlAcct<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<SupplierInvoiceItemGlAcct<DeSerializers>>;
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
         * Static representation of the {@link companyCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: fieldBuilder.buildEdmTypeField(
          'CompanyCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link costCenter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COST_CENTER: fieldBuilder.buildEdmTypeField(
          'CostCenter',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link controllingArea} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONTROLLING_AREA: fieldBuilder.buildEdmTypeField(
          'ControllingArea',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link businessArea} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_AREA: fieldBuilder.buildEdmTypeField(
          'BusinessArea',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link profitCenter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROFIT_CENTER: fieldBuilder.buildEdmTypeField(
          'ProfitCenter',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link functionalArea} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUNCTIONAL_AREA: fieldBuilder.buildEdmTypeField(
          'FunctionalArea',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link glAccount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GL_ACCOUNT: fieldBuilder.buildEdmTypeField(
          'GLAccount',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link salesOrder} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_ORDER: fieldBuilder.buildEdmTypeField(
          'SalesOrder',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link salesOrderItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_ORDER_ITEM: fieldBuilder.buildEdmTypeField(
          'SalesOrderItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link costObject} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COST_OBJECT: fieldBuilder.buildEdmTypeField(
          'CostObject',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link costCtrActivityType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COST_CTR_ACTIVITY_TYPE: fieldBuilder.buildEdmTypeField(
          'CostCtrActivityType',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link businessProcess} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PROCESS: fieldBuilder.buildEdmTypeField(
          'BusinessProcess',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link wbsElement} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WBS_ELEMENT: fieldBuilder.buildEdmTypeField(
          'WBSElement',
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
         * Static representation of the {@link taxCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_CODE: fieldBuilder.buildEdmTypeField('TaxCode', 'Edm.String', true),
        /**
         * Static representation of the {@link personnelNumber} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PERSONNEL_NUMBER: fieldBuilder.buildEdmTypeField(
          'PersonnelNumber',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link workItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WORK_ITEM: fieldBuilder.buildEdmTypeField(
          'WorkItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link debitCreditCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DEBIT_CREDIT_CODE: fieldBuilder.buildEdmTypeField(
          'DebitCreditCode',
          'Edm.String',
          true
        ),
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
         * Static representation of the {@link supplierInvoiceItemText} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_INVOICE_ITEM_TEXT: fieldBuilder.buildEdmTypeField(
          'SupplierInvoiceItemText',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link assignmentReference} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ASSIGNMENT_REFERENCE: fieldBuilder.buildEdmTypeField(
          'AssignmentReference',
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
         * Static representation of the {@link internalOrder} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNAL_ORDER: fieldBuilder.buildEdmTypeField(
          'InternalOrder',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link projectNetwork} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PROJECT_NETWORK: fieldBuilder.buildEdmTypeField(
          'ProjectNetwork',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link networkActivity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NETWORK_ACTIVITY: fieldBuilder.buildEdmTypeField(
          'NetworkActivity',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link commitmentItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMMITMENT_ITEM: fieldBuilder.buildEdmTypeField(
          'CommitmentItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link fundsCenter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUNDS_CENTER: fieldBuilder.buildEdmTypeField(
          'FundsCenter',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link taxBaseAmountInTransCrcy} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_BASE_AMOUNT_IN_TRANS_CRCY: fieldBuilder.buildEdmTypeField(
          'TaxBaseAmountInTransCrcy',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link fund} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FUND: fieldBuilder.buildEdmTypeField('Fund', 'Edm.String', true),
        /**
         * Static representation of the {@link grantId} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GRANT_ID: fieldBuilder.buildEdmTypeField('GrantID', 'Edm.String', true),
        /**
         * Static representation of the {@link quantityUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        QUANTITY_UNIT: fieldBuilder.buildEdmTypeField(
          'QuantityUnit',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcItmQtyUnitSapCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_ITM_QTY_UNIT_SAP_CODE: fieldBuilder.buildEdmTypeField(
          'SuplrInvcItmQtyUnitSAPCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link suplrInvcItmQtyUnitIsoCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_INVC_ITM_QTY_UNIT_ISO_CODE: fieldBuilder.buildEdmTypeField(
          'SuplrInvcItmQtyUnitISOCode',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link quantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        QUANTITY: fieldBuilder.buildEdmTypeField(
          'Quantity',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link partnerBusinessArea} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PARTNER_BUSINESS_AREA: fieldBuilder.buildEdmTypeField(
          'PartnerBusinessArea',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link financialTransactionType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FINANCIAL_TRANSACTION_TYPE: fieldBuilder.buildEdmTypeField(
          'FinancialTransactionType',
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
         * Static representation of the {@link earmarkedFundsDocument} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EARMARKED_FUNDS_DOCUMENT: fieldBuilder.buildEdmTypeField(
          'EarmarkedFundsDocument',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link earmarkedFundsDocumentItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EARMARKED_FUNDS_DOCUMENT_ITEM: fieldBuilder.buildEdmTypeField(
          'EarmarkedFundsDocumentItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link budgetPeriod} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUDGET_PERIOD: fieldBuilder.buildEdmTypeField(
          'BudgetPeriod',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link serviceDocument} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SERVICE_DOCUMENT: fieldBuilder.buildEdmTypeField(
          'ServiceDocument',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link serviceDocumentItem} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SERVICE_DOCUMENT_ITEM: fieldBuilder.buildEdmTypeField(
          'ServiceDocumentItem',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link serviceDocumentType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SERVICE_DOCUMENT_TYPE: fieldBuilder.buildEdmTypeField(
          'ServiceDocumentType',
          'Edm.String',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SupplierInvoiceItemGlAcct)
      };
    }

    return this._schema;
  }
}
