/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  RequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { EntProjElmntCnfgrdWrkItmTxt } from './EntProjElmntCnfgrdWrkItmTxt';

/**
 * Request builder class for operations supported on the {@link EntProjElmntCnfgrdWrkItmTxt} entity.
 */
export class EntProjElmntCnfgrdWrkItmTxtRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<EntProjElmntCnfgrdWrkItmTxt<T>, T> {
  /**
   * Returns a request builder for querying all `EntProjElmntCnfgrdWrkItmTxt` entities.
   * @returns A request builder for creating requests to retrieve all `EntProjElmntCnfgrdWrkItmTxt` entities.
   */
  getAll(): GetAllRequestBuilder<EntProjElmntCnfgrdWrkItmTxt<T>, T> {
    return new GetAllRequestBuilder<EntProjElmntCnfgrdWrkItmTxt<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for retrieving one `EntProjElmntCnfgrdWrkItmTxt` entity based on its keys.
   * @param entProjElmntWorkItem Key property. See {@link EntProjElmntCnfgrdWrkItmTxt.entProjElmntWorkItem}.
   * @param language Key property. See {@link EntProjElmntCnfgrdWrkItmTxt.language}.
   * @returns A request builder for creating requests to retrieve one `EntProjElmntCnfgrdWrkItmTxt` entity based on its keys.
   */
  getByKey(
    entProjElmntWorkItem: DeserializedType<T, 'Edm.String'>,
    language: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<EntProjElmntCnfgrdWrkItmTxt<T>, T> {
    return new GetByKeyRequestBuilder<EntProjElmntCnfgrdWrkItmTxt<T>, T>(
      this.entityApi,
      {
        EntProjElmntWorkItem: entProjElmntWorkItem,
        Language: language
      }
    );
  }
}
