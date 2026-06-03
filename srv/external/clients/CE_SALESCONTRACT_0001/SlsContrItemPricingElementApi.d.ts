/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SlsContrItemPricingElement } from './SlsContrItemPricingElement';
import { SlsContrItemPricingElementRequestBuilder } from './SlsContrItemPricingElementRequestBuilder';
import { SalesContractItemApi } from './SalesContractItemApi';
import { SalesContractApi } from './SalesContractApi';
import { Sap_Message } from './Sap_Message';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  CollectionField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class SlsContrItemPricingElementApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<SlsContrItemPricingElement<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers?: DeSerializersT
  ): SlsContrItemPricingElementApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      SalesContractItemApi<DeSerializersT>,
      SalesContractApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof SlsContrItemPricingElement;
  requestBuilder(): SlsContrItemPricingElementRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    SlsContrItemPricingElement<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    SlsContrItemPricingElement<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof SlsContrItemPricingElement,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    SALES_CONTRACT: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SALES_CONTRACT_ITEM: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_PROCEDURE_STEP: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_PROCEDURE_COUNTER: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_TYPE: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_CALCULATION_TYPE: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RATE_AMOUNT: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_CURRENCY: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RATE_RATIO: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_RATE_RATIO_SAP_UNIT: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RATE_RATIO_ISO_UNIT: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_QUANTITY: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_QUANTITY_SAP_UNIT: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_AMOUNT: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    TRANSACTION_CURRENCY: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_BASE_AMOUNT: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_BASE_QUANTITY: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_INACTIVE_REASON: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_IS_MANUALLY_CHANGED: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    CONDITION_IS_FOR_STATISTICS: OrderableEdmTypeField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    SAP_MESSAGES: CollectionField<
      SlsContrItemPricingElement<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link item} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ITEM: OneToOneLink<
      SlsContrItemPricingElement<DeSerializersT>,
      DeSerializersT,
      SalesContractItemApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link salesContract_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SALES_CONTRACT_1: OneToOneLink<
      SlsContrItemPricingElement<DeSerializersT>,
      DeSerializersT,
      SalesContractApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SlsContrItemPricingElement<DeSerializers>>;
  };
}
