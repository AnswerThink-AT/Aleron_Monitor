/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import {
  entityDeserializer,
  transformReturnValueForComplexType,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  OperationParameter,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { apiSupplierinvoiceProcess } from './service';
import { PostInvoiceExportParameters } from './PostInvoiceExportParameters';
import { ReleaseInvoiceExportParameters } from './ReleaseInvoiceExportParameters';
import { CancelInvoiceExportParameters } from './CancelInvoiceExportParameters';

/**
 * Type of the parameters to be passed to {@link post}.
 */
export interface PostParameters<DeSerializersT extends DeSerializers> {
  /**
   * Fiscal Year.
   */
  fiscalYear?: string | null;
  /**
   * Supplier Invoice.
   */
  supplierInvoice?: string | null;
}

/**
 * Post.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function post<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: PostParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  PostParameters<DeSerializersT>,
  PostInvoiceExportParameters
> {
  const params = {
    fiscalYear: new OperationParameter(
      'FiscalYear',
      'Edm.String',
      parameters.fiscalYear
    ),
    supplierInvoice: new OperationParameter(
      'SupplierInvoice',
      'Edm.String',
      parameters.supplierInvoice
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV',
    'Post',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, PostInvoiceExportParameters)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link release}.
 */
export interface ReleaseParameters<DeSerializersT extends DeSerializers> {
  /**
   * Discount Days Have To Be Shifted.
   */
  discountDaysHaveToBeShifted?: boolean | null;
  /**
   * Fiscal Year.
   */
  fiscalYear?: string | null;
  /**
   * Supplier Invoice.
   */
  supplierInvoice?: string | null;
}

/**
 * Release.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function release<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ReleaseParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ReleaseParameters<DeSerializersT>,
  ReleaseInvoiceExportParameters
> {
  const params = {
    discountDaysHaveToBeShifted: new OperationParameter(
      'DiscountDaysHaveToBeShifted',
      'Edm.Boolean',
      parameters.discountDaysHaveToBeShifted
    ),
    fiscalYear: new OperationParameter(
      'FiscalYear',
      'Edm.String',
      parameters.fiscalYear
    ),
    supplierInvoice: new OperationParameter(
      'SupplierInvoice',
      'Edm.String',
      parameters.supplierInvoice
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV',
    'Release',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, ReleaseInvoiceExportParameters)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link cancel}.
 */
export interface CancelParameters<DeSerializersT extends DeSerializers> {
  /**
   * Supplier Invoice.
   */
  supplierInvoice?: string | null;
  /**
   * Fiscal Year.
   */
  fiscalYear?: string | null;
  /**
   * Reversal Reason.
   */
  reversalReason?: string | null;
  /**
   * Posting Date.
   */
  postingDate?: Moment | null;
}

/**
 * Cancel.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function cancel<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: CancelParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  CancelParameters<DeSerializersT>,
  CancelInvoiceExportParameters
> {
  const params = {
    supplierInvoice: new OperationParameter(
      'SupplierInvoice',
      'Edm.String',
      parameters.supplierInvoice
    ),
    fiscalYear: new OperationParameter(
      'FiscalYear',
      'Edm.String',
      parameters.fiscalYear
    ),
    reversalReason: new OperationParameter(
      'ReversalReason',
      'Edm.String',
      parameters.reversalReason
    ),
    postingDate: new OperationParameter(
      'PostingDate',
      'Edm.DateTime',
      parameters.postingDate
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_SUPPLIERINVOICE_PROCESS_SRV',
    'Cancel',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, CancelInvoiceExportParameters)
      ),
    params,
    deSerializers
  );
}

export const operations = {
  post,
  release,
  cancel
};
