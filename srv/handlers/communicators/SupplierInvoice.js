const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-SupplierInvoice');

class SupplierInvoice {
  constructor() {
    this.DESTINATION = { destinationName: 'S4HC_MONITOR_BASIC_AUTH_CUST' };
    this.connection = null;
  }

  /** 
   * Ensure we have an open connection. 
   * This lets you continue calling initConnection() in your processor.
   */
  async initConnection() {
    if (!this.connection) {
      this.connection = await cds.connect.to('API_SUPPLIERINVOICE_PROCESS');
      LOG.info('[SupplierInvoice COMM] Connection initialized');
    }
  }

  async getConnection() {
    if (!this.connection) {
      this.connection = await cds.connect.to('API_SUPPLIERINVOICE_PROCESS');
    }
    return this.connection;
  }

  async executeQuery(query) {
    try {
      const db = await this.getConnection();
      return await db.run(query);
    } catch (err) {
      LOG.error(`ERR_SUPPLIERINVOICE_QUERY: ${err.message}`);
      throw err;
    }
  }

  /**
   * Create a new Incoming Invoice in SAP
   */
  async createSupplierInvoice(fullPayload) {
    const oAPI = await this.getConnection();
    const path = `/A_SupplierInvoice`;

    LOG.info(`[SupplierInvoice COMM] POST URL: ${path}`);
    LOG.info(`[SupplierInvoice COMM] Payload → ${JSON.stringify(fullPayload)}`);

    try {
      const response = await oAPI.post(path, fullPayload, this.DESTINATION);
      LOG.info(`[SupplierInvoice COMM] Raw response → ${JSON.stringify(response)}`);

      const body = response.data ?? response;
      const invoice  = (body.d && body.d.SupplierInvoice)  || body.SupplierInvoice;
      const year     = (body.d && body.d.FiscalYear)       || body.FiscalYear;

      if (!invoice || !year) {
        throw new Error(`Could not find SupplierInvoice/FiscalYear in response: ${JSON.stringify(body)}`);
      }

      LOG.info(`[SupplierInvoice COMM] Created Incoming Invoice → ${invoice}, Year → ${year}`);
      return { SupplierInvoice: invoice, FiscalYear: year };

    } catch (err) {
      LOG.error(`[SupplierInvoice COMM] Create error → ${err.message}`);
      if (err.response) {
        LOG.error(`[SupplierInvoice COMM] HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      }
      return { error: err.response?.data || err.message };
    }
  }

  // async createSupplierInvoice(payload) {
  //   try {
  //     if (!this.connection) {
  //       this.connection = await this.getConnection();
  //     }

  //     const result = await this.connection.send({
  //       method: 'POST',
  //       path: '/A_SupplierInvoice',
  //       data: payload
  //     });

  //     return { success: true, message: result };
  //   } catch (err) {
  //     LOG._error && LOG.error(`Error in createSupplierInvoice: ${err.message}`);
  //     return { success: false, message: err.message };
  //   }
  // }

  // async cancelSupplierInvoice({ SupplierInvoice, FiscalYear, PostingDate, ReversalReason }) {
  //   try {
  //     if (!this.connection) {
  //       this.connection = await this.getConnection();
  //     }
  //     // Format PostingDate as datetime'YYYY-MM-DDT00:00:00'
  //     const postingDateStr = `datetime'${PostingDate}T00:00:00'`;
  //     const url = `/Cancel?SupplierInvoice='${SupplierInvoice}'&FiscalYear='${FiscalYear}'&PostingDate=${postingDateStr}&ReversalReason='${ReversalReason}'`;
  //     const result = await this.connection.send({
  //       method: 'POST',
  //       path: url
  //     });
  //     return { success: true, message: result };
  //   } catch (err) {
  //     LOG._error && LOG.error(`Error in cancelSupplierInvoice: ${err.message}`);
  //     return { success: false, message: err.message };
  //   }
  // }
  async cancelSupplierInvoice({ SupplierInvoice, FiscalYear, PostingDate, ReversalReason }) {
    try {
      const oAPI = await this.getConnection();
      // Format PostingDate as datetime'YYYY-MM-DDT00:00:00'
      const postingDateStr = `datetime'${PostingDate}T00:00:00'`;
      const path = `/Cancel?SupplierInvoice='${SupplierInvoice}'&FiscalYear='${FiscalYear}'&PostingDate=${postingDateStr}&ReversalReason='${ReversalReason}'`;
      
      LOG.info(`[SupplierInvoice COMM] POST URL: ${path}`);
      
      const response = await oAPI.post(path);
      LOG.info(`[SupplierInvoice COMM] Cancel response → ${JSON.stringify(response)}`);
      
      return { success: true, message: response };
    } catch (err) {
      LOG.error(`[SupplierInvoice COMM] Cancel error → ${err.message}`);
      if (err.response) {
        LOG.error(`[SupplierInvoice COMM] HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      }
      return { success: false, message: err.response?.data || err.message };
    }
  }
}

module.exports = SupplierInvoice;
