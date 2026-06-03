const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-SalesContract');

class SalesContract {
  constructor(options) {
    this.options = options;
    this._connection = null;
  }

  /* TODO
1. Check the health if failure during connection or execution
2. Provide way to refresh the connection & retry - Resilient Programming
3. Integrate SAP Cloud Logging to log technical errors
*/

  async _initConnection() {
    const s4 = await cds.connect.to('CE_SALESCONTRACT_0001');
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
      const oAPI = await this.getConnection();
      const result = await oAPI.run(query);
      return result;
    } catch (err) {
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_SALESCONTRACT_QUERY', [err.message]));
    }
  }

  async getEntities(sNS) {
    const oAPI = await this.getConnection();
    return oAPI.entities(sNS);
  }
}

module.exports = SalesContract;
