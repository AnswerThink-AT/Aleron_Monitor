const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-SupplierLFA1');

class SupplierLFA1 {
  init(options) {
    this.options = options;
    this.initConnection();
  }

  /* TODO
  1. Check health if failure during connection or execution
  2. Provide way to refresh the connection & retry - Resilient Programming
  3. Integrate SAP Cloud Logging to log technical errors
  */

  async initConnection() {
    this.connection = await this.getConnection();
  }

  async getConnection() {
    // MUST match cds.requires key in package.json
    const s4 = cds.connect.to('YY1_SUPPLIER_LFA1_CDS');
    return s4;
  }

  async executeQuery(query) {
    // Query can be array of queries or a single query
    try {
      if (!this.connection) {
        this.connection = await this.getConnection();
      }
      const result = await this.connection.run(query);
      return result;
    } catch (err) {
      // mirror your other communicators' style
      const msg = cds.i18n?.messages?.at
        ? cds.i18n.messages.at('ERR_SUPPLIER_LFA1_QUERY', [err.message])
        : `[SupplierLFA1] Query failed: ${err.message}`;
      LOG._error && LOG.error(msg);
      return err;
    }
  }
}

module.exports = SupplierLFA1;
