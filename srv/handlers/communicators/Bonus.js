const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-Bonus');

class Bonus {
  init(options) {
    this.options = options;
    this.initConnection();
  }

  /* TODO
1. Check the health if failure during connection or execution
2. Provide way to refresh the connection & retry - Resilient Programming
3. Integrate SAP Cloud Logging to log technical errors
*/

  async initConnection() {
    this.connection = await this.getConnection();
  }

  async getConnection() {
    const s4 = cds.connect.to('YY1_EMPLOYEE_FEED_CDS');
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
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_TIMEDATA_1_QUERY', [err.message]));
      return err;
    }
  }
}

module.exports = Bonus;