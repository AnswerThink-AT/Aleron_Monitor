/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
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
export declare function post<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: PostParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  PostParameters<DeSerializersT>,
  PostInvoiceExportParameters
>;
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
export declare function release<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ReleaseParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  ReleaseParameters<DeSerializersT>,
  ReleaseInvoiceExportParameters
>;
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
export declare function cancel<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: CancelParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  CancelParameters<DeSerializersT>,
  CancelInvoiceExportParameters
>;
export declare const operations: {
  post: typeof post;
  release: typeof release;
  cancel: typeof cancel;
};
