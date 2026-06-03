const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-CreditMemoRequest');

class CreditMemoRequest {
  constructor(options) {
    this.options = options ?? {};
    this.options.v4 = this.options.type === 'v4';
    this._connection = null;
    this.DESTINATION = { destinationName: 'S4HC_MONITOR_BASIC_AUTH_CUST' };
  }

  async _initConnection() {
    return cds.connect.to('API_CREDIT_MEMO_REQUEST_SRV');
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
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_CREDITMEMO_QUERY', [err.message]));
      return err;
    }
  }

  async createCreditMemoRequest(fullPayload) {
    const oAPI = await this.getConnection();
    // const path = `/sap/opu/odata/sap/API_CREDIT_MEMO_REQUEST_SRV/A_CreditMemoRequest`;
    const path = `/A_CreditMemoRequest`;

    LOG.info(`[CreditMemoRequest COMM] POST URL: ${path}`);
    LOG.info(`[CreditMemoRequest COMM] Payload → ${JSON.stringify(fullPayload)}`);

    try {
      const response = await oAPI.post(path, fullPayload, this.DESTINATION);
      LOG.info(`[CreditMemoRequest COMM] Raw response → ${JSON.stringify(response)}`);

      const body = response.data ?? response;

      const created =
        (body.d && body.d.CreditMemoRequest) ||
        body.CreditMemoRequest;

      if (!created) {
        throw new Error(`Could not find CreditMemoRequest in response: ${JSON.stringify(body)}`);
      }

      LOG.info(`[CreditMemoRequest COMM] Created Credit Memo Request → ${created}`);
      return { CreditMemoRequest: created };
    } catch (err) {
      LOG.error(`[CreditMemoRequest COMM] Create error → ${err.message}`);
      if (err.response) {
        LOG.error(`[CreditMemoRequest COMM] HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      }
      return { error: err.response?.data || err.message };
    }
  }
}

module.exports = CreditMemoRequest; 