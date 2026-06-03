const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-BillingType');

class BillingType {
  init(options) {
    this.options = options;
    this.connection = null;
  }

  async initConnection() {
    this.connection = await this.getConnection();
  }

  async getConnection() {
    const s4 = await cds.connect.to('YY1_BILLINGTYPE_CDS');
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
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_BILLINGTYPE_QUERY', [err.message]));
    }
  }
}

module.exports = BillingType;
