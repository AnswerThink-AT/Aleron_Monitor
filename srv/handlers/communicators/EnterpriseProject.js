const cds = require('@sap/cds');
const LOG = cds.log('Monitor.Communicator-EnterpriseProject');

class EnterpriseProject {
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
    const s4 = cds.connect.to('API_ENTERPRISE_PROJECT_0002');
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
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_ENTERPRISEPROJECT_QUERY', [err.message]));
      return err;
    }
  }

  async updateProject(projectUUID, salesOrder) {
    try {
      if (!this.connection) {
        this.connection = await this.getConnection();
      }
      const result = await this.connection.send({
        method: 'PATCH',
        path: `A_EnterpriseProject(guid'${projectUUID}')`,
        headers: {
          'If-Match': '*',
          'Content-Type': 'application/json'
        },
        data: {
          YY1_SalesOrder_PPH: salesOrder
        }
      });
      return result;
    }catch(err){
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_ENTERPRISEPROJECT_UPDATE', [err.message]));
      return err;
    }
  }

  async releaseProject(projectUUID, status) {
    try {
      if (!this.connection) {
        this.connection = await this.getConnection();
      }
      const result = await this.connection.send({
        method: 'POST',
        path: `ChangeEntProjProcgStatus?ProjectUUID=guid'${projectUUID}'&ProcessingStatus='${status}'`,
        headers: {
          'If-Match': '*',
          'Content-Type': 'application/json'
        },
        data: {} // still required for POST
      });
      return result;
    } catch (err) {
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_PROJECT_STATUS_CHANGE', [err.message]));
      return err;
    }
  }
}

module.exports = EnterpriseProject;