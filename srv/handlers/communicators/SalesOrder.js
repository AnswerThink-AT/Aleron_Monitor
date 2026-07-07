const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-SalesOrder');

// Modules
// const {ceSalesorder0001} = require('../../external/CE_SALESORDER_0001');
const {
    batch,
    changeset,
    apiSalesOrderSrv
} = require('../../external/clients/API_SALES_ORDER_SRV');
const {
    defaultDeSerializers,
    entityDeserializer
} = require('@sap-cloud-sdk/odata-v2');
const {
    parseODataV2Error
} = require('../common/sdk');

class SalesOrder {
    constructor(options) {
        this.options = options ?? {};
        this.options.v4 = this.options.type === 'v4';
        this._connection = null;
        this.DESTINATION = {
            destinationName: 'S4HC_MONITOR_BASIC_AUTH_CUST'
        };
    }

    /* TODO
    1. Check the health if failure during connection or execution
    2. Provide way to refresh the connection & retry - Resilient Programming
    3. Integrate SAP Cloud Logging to log technical errors
    */

    async _initConnection() {
        let s4;
        if (this.options.v4) {
            s4 = await cds.connect.to('CE_SALESORDER_0001');
        } else {
            s4 = await cds.connect.to('API_SALES_ORDER_SRV');
        }
        return s4;
    }

    async getConnection() {
        if (!this._connection) {
            this._connection = await this._initConnection();
        }
        return this._connection;
    }

    async executeQuery(query) {
        // Query can be array of queries or a single query
        try {
            if (!query) {
            LOG._error && LOG.error('[executeQuery] Query parameter is undefined');
            return [];
          }
            const oAPI = await this.getConnection();
            const result = await oAPI.run(query);
            if (!result) {
                LOG._error && LOG.error('[executeQuery] Query execution returned undefined result');
                throw new Error('Query execution returned undefined result');
            }else if (Array.isArray(result) && result.length === 0) {
                LOG._error && LOG.error('[executeQuery] Query execution returned empty array');
               // throw new Error('Query execution returned empty array');
            }
            return result;
     
        } catch (err) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESORDER_QUERY', [err.message]));
            throw err;
        }
    }

    async getEntities(sNS) {
        const oAPI = await this.getConnection();
        return oAPI.entities(sNS);
    }

    async createSalesOrders(aPayloads) {
        const {
            salesOrderApi
        } = apiSalesOrderSrv();

        let aFinalRes = [];
        // Check if aPayloads is an array and is not empty
        if (!Array.isArray(aPayloads) || aPayloads.length === 0) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESORDER_CREATE_PAYLOAD_EMPTY'));
            return [];
        }

        try {
            // Wrap Promise.allSettled with oAPI.run
            let aResults = [];

            // Use batch request for better performance
            const aCreateRequests = aPayloads.map((oPayload) => {
                const oCreatePayload = entityDeserializer(defaultDeSerializers).deserializeEntity(
                    oPayload,
                    salesOrderApi,
                );
                // const oCreatePayload = salesOrderApi.entityBuilder().fromJson(oPayload);
                return changeset(salesOrderApi.requestBuilder().create(oCreatePayload));
            });

            const aBatchResponses = await batch(...aCreateRequests)
                .withSubRequestPathType('noPath')
                .execute(this.DESTINATION);

            aResults = aBatchResponses.map((batchResponse) => {
                if (batchResponse.isError()) {
                    return {
                        status: 'rejected',
                        reason: batchResponse.body?.error?.message?.value,
                    };
                }
                if (batchResponse.isWriteResponses()) {
                    // Changeset response
                    const oCreateResponse = batchResponse.responses[0]; // Only response in changeset for one sales order
                    return {
                        status: 'fulfilled',
                        value: oCreateResponse.body?.d,
                    };
                }
            });

            // Map results to ensure both fulfilled and rejected have value and reason
            aFinalRes = aResults.map((oResult) => ({
                hasError: oResult.status === 'rejected' ? true : false,
                value: oResult.status === 'fulfilled' ? oResult.value : null,
                reason: oResult.status === 'rejected' ? oResult.reason : null,
            }));
        } catch (err) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESORDER_CREATE',[err?.cause?.cause?.response?.statusText || err.message]));
             // Rethrow the error to be handled by the caller
            const sErrMsg = cds.i18n.messages.at('ERR_SALESORDER_CREATE', [err?.cause?.cause?.response?.statusText || err.message]);
            aFinalRes = aPayloads.map(() => ({
            hasError: true,
            value: null,
            reason: sErrMsg
        }));
        }

        return aFinalRes;
    }

    async createScheduleLinesFor(aScheduleLines = []) {
        let aFinalRes = [];

        // Check if aScheduleLines is an array and is not empty
        if (!Array.isArray(aScheduleLines) || aScheduleLines.length === 0) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SCHEDULE_LINE_CREATE_PAYLOAD_EMPTY'));
            return [];
        }

        const oAPI = await this.getConnection();

        try {
            // Wrap Promise.allSettled with oAPI.run
            let aResults = [];
            await oAPI.run(async () => {
                aResults = await Promise.allSettled(
                    aScheduleLines.map((oScheduleLine) =>
                        oAPI.post(
                            `/A_SalesOrderItem(SalesOrder='${oScheduleLine.salesOrder}',SalesOrderItem='${oScheduleLine.salesOrderItem}')/to_ScheduleLine`,
                            oScheduleLine.payload,
                        ),
                    ),
                );
            });

            // Map results to ensure both fulfilled and rejected have value and reason
            aFinalRes = aResults.map((oResult) => ({
                hasError: oResult.status === 'rejected' ? true : false,
                value: oResult.status === 'fulfilled' ? oResult.value : null,
                reason: oResult.status === 'rejected' ? oResult.reason : null,
            }));
        } catch (err) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SCHEDULE_LINE_CREATE', [err.message]));
        }

        return aFinalRes;
    }

    async deleteSalesOrderPartners(aPayloads = []) {
        const {
            salesOrderHeaderPartnerApi
        } = apiSalesOrderSrv();
        let aFinalRes = [];

        // Check if aSalesOrderPartners is an array and is not empty
        if (!Array.isArray(aPayloads) || aPayloads.length === 0) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESORDER_PARTNER_DELETE_PAYLOAD_EMPTY'));
            return [];
        }

        try {
            // Wrap Promise.allSettled with oAPI.run
            let aResults = [];

            // Use batch request for better performance
            const aDeleteRequests = aPayloads.map((oPayload) => {
                const oDeletePayload = entityDeserializer(defaultDeSerializers).deserializeEntity(
                    oPayload,
                    salesOrderHeaderPartnerApi,
                );
                // const oDeletePayload = salesOrderHeaderPartnerApi.entityBuilder().fromJson(oPayload);
                return changeset(salesOrderHeaderPartnerApi.requestBuilder().delete(oDeletePayload));
            });

            const aBatchResponses = await batch(...aDeleteRequests)
                .withSubRequestPathType('noPath')
                .execute(this.DESTINATION);

            aResults = aBatchResponses.map((batchResponse) => {
                if (batchResponse.isError()) {
                    const [{
                        message
                    }] = parseODataV2Error(batchResponse.body, false);
                    if (message?.includes('A_SalesOrderHeaderPartnerType')) {
                        // If partner function doesn't exist, then we need to ignore the error thrown by API
                        return {
                            status: 'fulfilled',
                            value: 'Non Existent Partner Function: IGNORE the error',
                        };
                    } else {
                        return {
                            status: 'rejected',
                            reason: parseODataV2Error(batchResponse.body),
                        };
                    }
                }
                if (batchResponse.isWriteResponses()) {
                    // Changeset response
                    const oDeleteResponse = batchResponse[0][0].response; // Only response in changeset for one sales order
                    return {
                        status: 'fulfilled',
                        value: oDeleteResponse.as(salesOrderHeaderPartnerApi),
                    };
                }
            });

            // Map results to ensure both fulfilled and rejected have value and reason
            aFinalRes = aResults.map((oResult) => ({
                hasError: oResult.status === 'rejected' ? true : false,
                value: oResult.status === 'fulfilled' ? oResult.value : null,
                reason: oResult.status === 'rejected' ? oResult.reason : null,
            }));
        } catch (err) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESORDER_PARTNER_DELETE', [err.message]));
        }

        return aFinalRes;
    }

    async getSalesOrders() {
        const {
            salesOrderApi
        } = apiSalesOrderSrv();
        try {
            const batchRequests = [salesOrderApi.requestBuilder().getAll().top(10)];

            const batchResponse = await batch(...batchRequests).execute({
                destinationName: 'S4HC_MONITOR_BASIC_AUTH_CUST',
            });

            const salesOrders = batchResponse
                .map((response) => {
                    if (response.isSuccess() && response.isReadResponse()) {
                        return response.as(salesOrderApi);
                    } else {
                        LOG._error && LOG.error(`Failed to fetch sales order: ${response.message}`);
                        return null;
                    }
                })
                .filter((order) => order !== null);

            return salesOrders;
        } catch (err) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESORDER_BATCH', [err.message]));
            return [];
        }
    }
    async updateSalesOrder(payload) {
        const {
            salesOrderApi
        } = apiSalesOrderSrv();

        // 1) guard
        if (!payload?.salesOrder) {
            LOG._error && LOG.error('ERR_SALESORDER_UPDATE: SalesOrder key is missing in payload');
            return {
                message: 'SalesOrder key is missing in payload'
            };
        }

        try {
            // 2) pull out the key and build an entity instance
            const {
                salesOrder,
                ...updateFields
            } = payload;
            const oEntity = entityDeserializer(defaultDeSerializers)
                .deserializeEntity({
                    SalesOrder: salesOrder,
                    ...updateFields
                }, salesOrderApi);

            // 3) wrap the single update into a changeset
            const change = changeset(salesOrderApi.requestBuilder().update(oEntity).withSalesOrder(salesOrder));

            // 4) fire it off as a batch
            const [response] = await batch(change)
                .withSubRequestPathType('noPath')
                .execute(this.DESTINATION);

            // 5) check for OData errors
            if (response.isError()) {
                const [err] = parseODataV2Error(response.body);
                LOG._error && LOG.error(`ERR_SALESORDER_UPDATE: ${err.message}`);
                return {
                    message: err.message
                };
            }

            // 6) success
            return {
                success: true,
                data: response.responses?.[0]?.body?.d ?? null
            };

        } catch (err) {
            LOG._error && LOG.error(`ERR_SALESORDER_UPDATE: ${err.message}`);
            return {
                message: err.message
            };
        }
    }

    async updateSalesOrderItem(payload) {
        const {
            salesOrderItemApi
        } = apiSalesOrderSrv();

        if (!payload?.SalesOrder || !payload?.SalesOrderItem) {
            LOG._error && LOG.error('ERR_SALESORDERITEM_UPDATE: SalesOrder or SalesOrderItem key is missing in payload');
            return {
                message: 'SalesOrder or SalesOrderItem key is missing in payload'
            };
        }

        try {
            const {
                SalesOrder,
                SalesOrderItem,
                ...updateFields
            } = payload;

            const oUpdatePayload = entityDeserializer(defaultDeSerializers).deserializeEntity(
                updateFields,
                salesOrderItemApi
            );

            const updateRequest = changeset(
                salesOrderItemApi.requestBuilder()
                .update(oUpdatePayload)
                .withSalesOrder(SalesOrder)
                .withSalesOrderItem(SalesOrderItem)
            );

            const response = await batch(updateRequest)
                .withSubRequestPathType('noPath')
                .execute(this.DESTINATION);

            const result = response[0];

            if (result.isError()) {
                const error = parseODataV2Error(result.body);
                LOG._error && LOG.error(`Sales Order Item update failed: ${error[0]?.message}`);
                return {
                    message: error[0]?.message
                };
            }

            return {
                success: true,
                data: result.body?.d || null
            };

        } catch (err) {
            LOG._error && LOG.error(`ERR_SALESORDERITEM_UPDATE: ${err.message}`);
            return {
                message: err.message
            };
        }
    }


    /**
     * Patch a SalesOrderItem by embedding its keys in the entity itself,
     * instead of calling .withSalesOrder()/withSalesOrderItem().
     */
    async patchSalesOrderItemV2({ SalesOrder, SalesOrderItem, YY1_PurchasingDoc_SD_SDI }) {
        if (!SalesOrder || !SalesOrderItem) {
          throw new Error('patchSalesOrderItemV2: SalesOrder or SalesOrderItem key is missing');
        }
      
        // 1) get the CDS-connected OData V2 client
        const oAPI = await this.getConnection();
      
        // 2) build the exact path you tested in Postman
        const path = `/A_SalesOrderItem(SalesOrder='${SalesOrder}',SalesOrderItem='${SalesOrderItem}')`;
      
        // 3) PATCH only the custom field
        try {
          const result = await oAPI.patch(path, {
            YY1_PurchasingDoc_SD_SDI
          });
          LOG.info(`[patchSalesOrderItemV2] ✔ success for ${SalesOrder}/${SalesOrderItem}`);
          return result;
        }
        catch (err) {
          LOG.error(`[patchSalesOrderItemV2] ❌ failed to patch ${SalesOrder}/${SalesOrderItem}: ${err.message}`, err);
          throw err;
        }
      }
       


    async createSalesOrderItems(aPayloads = []) {
        const {
            salesOrderItemApi
        } = apiSalesOrderSrv();

        let aFinalRes = [];
        // guard
        if (!Array.isArray(aPayloads) || aPayloads.length === 0) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESORDER_ITEM_CREATE_PAYLOAD_EMPTY'));
            return [];
        }

        try {
            // Wrap Promise.allSettled with oAPI.run
            let aResults = [];

            // build one changeset per payload
            const aCreateRequests = aPayloads.map(oPayload => {
                const oEntity = entityDeserializer(defaultDeSerializers)
                    .deserializeEntity(oPayload, salesOrderItemApi);
                return changeset(salesOrderItemApi.requestBuilder().create(oEntity));
            });

            // send them in a single batch
            const aBatchResponses = await batch(...aCreateRequests)
                .withSubRequestPathType('noPath')
                .execute(this.DESTINATION);

            aResults = aBatchResponses.map((batchResponse) => {
                if (batchResponse.isError()) {
                    return {
                        status: 'rejected',
                        reason: parseODataV2Error(batchResponse.body),
                    };
                }
                if (batchResponse.isWriteResponses()) {
                    // Changeset response
                    const oCreateResponse = batchResponse.responses[0]; // Only response in changeset for one sales order
                    return {
                        status: 'fulfilled',
                        value: oCreateResponse.body?.d,
                    };
                }
            });

            // Map results to ensure both fulfilled and rejected have value and reason
            aFinalRes = aResults.map((oResult) => ({
                hasError: oResult.status === 'rejected' ? true : false,
                value: oResult.status === 'fulfilled' ? oResult.value : null,
                reason: oResult.status === 'rejected' ? oResult.reason : null,
            }));
        } catch (err) {
            LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESORDER_ITEM_CREATE', [err.message]));
        }

        return aFinalRes;
    }
}

module.exports = SalesOrder;