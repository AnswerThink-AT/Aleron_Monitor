// communicators/PurchaseOrder.js

const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-PurchaseOrder');
const { defaultDeSerializers, entityDeserializer } = require('@sap-cloud-sdk/odata-v2');
const { batch, changeset, cePurchaseorder0001 } = require('../../external/clients/CE_PURCHASEORDER_0001');
const { parseODataV2Error } = require('../common/sdk');
console.log(require('../../external/clients/CE_PURCHASEORDER_0001'));


class PurchaseOrder {
  constructor(options) {
    this.options = options ?? {};
    this.options.v4 = this.options.type === 'v4';
    this._connection = null;
    this.DESTINATION = { destinationName: 'S4HC_MONITOR_BASIC_AUTH_CUST' };
  }

  async _initConnection() {
    // v4 on CE_PURCHASEORDER_0001
    return cds.connect.to('CE_PURCHASEORDER_0001');
  }

  async getConnection() {
    if (!this._connection) {
      this._connection = await this._initConnection();
    }
    return this._connection;
  }

  async executeQuery(query) {
    try {
      const db = await this.getConnection();
      return await db.run(query);
    } catch (e) {
      LOG.error(`ERR_PURCHASEORDER_QUERY: ${e.message}`);
      throw e;
    }
  }
  // communicators/PurchaseOrder.js

/// communicators/PurchaseOrder.js
// — add this inside your PurchaseOrder class —
// communicators/PurchaseOrder.js

/**
 * Fetch *all* line-items for a given PO, returning an array.
 */
async fetchPurchaseOrderLines(poKey) {
  const oAPI = await this.getConnection();
  const path = `/PurchaseOrder('${poKey}')/_PurchaseOrderItem`;
  LOG.info(`[PurchaseOrder COMM] GET URL → ${path}`);

  try {
    const rawResponse = await oAPI.get(path, this.DESTINATION);
    // unwrap cds.connect’s response
    const raw = rawResponse.data ?? rawResponse;

    // dump *exactly* what came back
    LOG.info(`[PurchaseOrder COMM] raw →\n${JSON.stringify(raw, null, 2)}`);

    // if it’s already an array, use it directly
    let lines;
    if (Array.isArray(raw)) {
      lines = raw;
    } else {
      // otherwise fall back to the usual OData patterns
      lines =
        raw.value
        ?? raw.d?.results
        ?? raw.results
        ?? [];
    }

    LOG.info(`[PurchaseOrder COMM] extracted ${lines.length} line-items`);
    return lines;

  } catch (err) {
    LOG.error(`[PurchaseOrder COMM] fetchPurchaseOrderLines failed → ${err.message}`);
    throw err;
  }
}
    
  /**
   * Create a new PO header + first item in one go
   */
  async createPurchaseOrder(fullPayload) {
    const oAPI = await this.getConnection();
    const path = `/PurchaseOrder`;
  
    LOG.info(`[PurchaseOrder COMM] POST URL: ${path}`);
    LOG.info(`[PurchaseOrder COMM] Payload → ${JSON.stringify(fullPayload)}`);
  
    try {
      const response = await oAPI.post(path, fullPayload, this.DESTINATION);
      LOG.info(`[PurchaseOrder COMM] Raw response → ${JSON.stringify(response)}`);
  
      // response might be the body itself (no .data), so:
      const body = response.data ?? response;
  
      // extract new key (check both V2 & V4 conventions)
      const created =
        (body.d && body.d.PurchaseOrder) ||
        body.PurchaseOrder;
  
      if (!created) {
        throw new Error(`Could not find PurchaseOrder in response: ${JSON.stringify(body)}`);
      }
  
      LOG.info(`[PurchaseOrder COMM] Created PO → ${created}`);
      return { PurchaseOrder: created };
    } catch (err) {
      LOG.error(`[PurchaseOrder COMM] Create error → ${err.message}`);
      if (err.response) {
        LOG.error(`[PurchaseOrder COMM] HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      }
      return { error: err.response?.data || err.message };
    }
  }


  async getPurchaseOrderItems(poKey) {
    const oAPI = await this.getConnection();
    const path = `/PurchaseOrder/${poKey}/_PurchaseOrderItem`;
    LOG.info(`[PurchaseOrder COMM] GET URL: ${path}`);
    try {
      const response = await oAPI.get(path, this.DESTINATION);
      // guard against missing .data
      const raw = response.data ?? response ?? {};
      // OData v4 uses .value, v2 uses d.results, some use .results, fallback to empty array
      return raw.value
          ?? raw.d?.results
          ?? raw.results
          ?? [];
    } catch (err) {
      LOG.error(`[PurchaseOrder COMM] ERR_FETCH_PO_ITEMS: ${err.message}`);
      throw err;
    }
  }
  

  /**
   * GET PurchaseOrders by Sales-Doc PDI:
   *   GET /PurchaseOrder?$filter=YY1_SDDocumentPD_PDI eq '{salesDocPD}'
   */
  async getPurchaseOrdersByPDI(salesDocPD) {
    const oAPI = await this.getConnection();
    const path   = `/PurchaseOrder`;
    const filter = `$filter=YY1_SDDocumentPD_PDI eq '${salesDocPD}'`;
    LOG.info(`[PurchaseOrder COMM] GET URL: ${path}?${filter}`);
    try {
      const response = await oAPI.get(`${path}?${filter}`, this.DESTINATION);
      return response.data.value || response.data.d?.results || [];
    } catch (e) {
      LOG.error(`[PurchaseOrder COMM] ERR_FETCH_PO_BY_PDI: ${e.message}`);
      throw e;
    }
  }

  

  /**
   * Create a single new line‐item under an existing PO:
   * POST to /PurchaseOrder('')/_PurchaseOrderItem
   */
  // communicators/PurchaseOrder.js

async createPurchaseOrderItem(poKey, itemPayload) {
  // 1) get the generated SDK APIs
  const { purchaseOrderItemApi } = cePurchaseorder0001();
  // 2) get the direct proxy (oAPI), not cds.run
  const oAPI = await this.getConnection();

  // 3) deserialize to a typed entity
  const entity = entityDeserializer(defaultDeSerializers)
    .deserializeEntity(itemPayload, purchaseOrderItemApi);

  // 4) build the navigation path
  const path = `/PurchaseOrder/${poKey}/_PurchaseOrderItem`;

  LOG.info(`[PurchaseOrder COMM] POST URL: ${path}`);
  LOG.info(`[PurchaseOrder COMM] Payload → ${JSON.stringify(itemPayload)}`);

  try {
    // 5) call post directly on the proxy, passing DEST as second arg
    const response = await oAPI.post(path, itemPayload, this.DESTINATION);

    LOG.info(`[PurchaseOrder COMM] Response status=${response.status}`);
    return { success: true, value: response?.data ?? response };
  } catch (err) {
    LOG.error(`[PurchaseOrder COMM] Error → ${err.message}`);
    if (err.response) {
      LOG.error(`[PurchaseOrder COMM] HTTP Status: ${err.response.status}`);
      LOG.error(`[PurchaseOrder COMM] HTTP Body: ${JSON.stringify(err.response.data)}`);
    }
    return { error: err.message };
  }
}
 
 /**
 * Update a single existing PO line-item by its own entity set,
 * not via the non-containment navigation path.
 */
async updatePurchaseOrderItem(poKey, itemKey, itemPayload) {
  const oAPI = await this.getConnection();
  const paddedItem = String(itemKey).padStart(5,'0');

  // PATCH the PurchaseOrderItem entity directly:
  //    /PurchaseOrderItem(PurchaseOrder='4500003805',PurchaseOrderItem='00010')
  const path = `/PurchaseOrderItem(PurchaseOrder='${poKey}',PurchaseOrderItem='${paddedItem}')`;

  LOG.info(`[PurchaseOrder COMM] PATCH ${path}`, itemPayload);

  try {
    const response = await oAPI.patch(path, itemPayload, this.DESTINATION);
    return response.data ?? response;
  } catch (err) {
    LOG.error(`[PurchaseOrder COMM] updatePurchaseOrderItem failed → ${err.message}`);
    if (err.response) {
      LOG.error(
        `[PurchaseOrder COMM] HTTP ${err.response.status}: ` +
        JSON.stringify(err.response.data)
      );
    }
    throw err;
  }
}




  /**
   * Upsert item + sub‐entities (delivery & account)
   */
  async upsertPurchaseOrderItem(itemPayload, relations = {}) {
    const {
      purchaseOrderItemApi,
      purchaseOrderDeliveryAddressApi,
      purchaseOrderAccountApi
    } = cePurchaseorder0001();
    const db = await this.getConnection();

    try {
      const changes = [];

      // main item
      const itemEnt = entityDeserializer(defaultDeSerializers)
        .deserializeEntity(itemPayload, purchaseOrderItemApi);
      changes.push(changeset(
        purchaseOrderItemApi.requestBuilder().upsert(itemEnt)
      ));

      // delivery sub‐entity
      if (relations.delivery) {
        const delEnt = entityDeserializer(defaultDeSerializers)
          .deserializeEntity(relations.delivery, purchaseOrderDeliveryAddressApi);
        changes.push(changeset(
          purchaseOrderDeliveryAddressApi.requestBuilder().upsert(delEnt)
        ));
      }

      // account sub‐entity
      if (relations.account) {
        const accEnt = entityDeserializer(defaultDeSerializers)
          .deserializeEntity(relations.account, purchaseOrderAccountApi);
        changes.push(changeset(
          purchaseOrderAccountApi.requestBuilder().upsert(accEnt)
        ));
      }

      // execute all
      const responses = await batch(...changes).execute(this.DESTINATION);
      const errs = responses.filter(r => r.isError())
                            .map(r => parseODataV2Error(r.body));

      if (errs.length) {
        LOG.error(`ERR_UPSERT_PO_ITEM: ${JSON.stringify(errs)}`);
        return { error: errs };
      }

      return { success: true };
    } catch (err) {
      LOG.error(`ERR_UPSERT_EXCEPTION: ${err.message}`);
      return { error: [err.message] };
    }
  }

  async deletePurchaseOrderItem({ PurchaseOrder, PurchaseOrderItem }) {
    const oAPI = await this.getConnection();
 
    const path = `/PurchaseOrder('${PurchaseOrder}')/_PurchaseOrderItem('${PurchaseOrderItem}')`;
  
    LOG.info(`[PurchaseOrder COMM] DELETE URL: ${path}`);
  
    try {
      const response = await oAPI.delete(path, this.DESTINATION);
      LOG.info(`[PurchaseOrder COMM] DELETE response status=${response.status}`);
      return { success: true, value: response.data };
    } catch (err) {
      LOG.error(`[PurchaseOrder COMM] DELETE error → ${err.message}`);
      if (err.response) {
        LOG.error(`[PurchaseOrder COMM] HTTP Status: ${err.response.status}`);
        LOG.error(`[PurchaseOrder COMM] HTTP Body: ${JSON.stringify(err.response.data)}`);
      }
      return { success: false, message: err.message, error: err.response?.data };
    }
  }

  async deletePurchaseOrderItems({ PurchaseOrder, PurchaseOrderItem }) {
    try {
      if (!this.connection) {
        this.connection = await this.getConnection();
      }
      
      // Build the path for deleting a specific purchase order item
      const path = `/PurchaseOrderItem(PurchaseOrder='${PurchaseOrder}',PurchaseOrderItem='${PurchaseOrderItem}')`;
      
      LOG.info(`[PurchaseOrder COMM] DELETE URL: ${path}`);
      
      const response = await this.connection.delete(path);
      LOG.info(`[PurchaseOrder COMM] Delete response → ${JSON.stringify(response)}`);
      
      return { success: true, message: response };
    } catch (err) {
      LOG.error(`[PurchaseOrder COMM] Delete error → ${err.message}`);
      if (err.response) {
        LOG.error(`[PurchaseOrder COMM] HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      }
      return { success: false, message: err.response?.data || err.message };
    }
  }
}

module.exports = PurchaseOrder;
