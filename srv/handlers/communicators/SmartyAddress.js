const cds = require('@sap/cds');
const {executeHttpRequest} = require('@sap-cloud-sdk/http-client');
const LOG = cds.log('Monitor.Communicator-SmartyAPI');

class SmartyAddress {
  constructor(options) {
    this.options = options ?? {};
    this._connection = null;
    this.SMARTY_ADDRESS_DESTINATION = 'SMARTY_US_ADDRESS_API';
    this.SMARTY_ZIPCODE_DESTINATION = 'SMARTY_ZIPCODE_API';
  }

  /* TODO
  1. Check the health if failure during connection or execution
  2. Provide way to refresh the connection & retry - Resilient Programming
  3. Integrate SAP Cloud Logging to log technical errors
  */

  async _initConnection() {
    let api = await cds.connect.to('SMARTY_API');
    return api;
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
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_SMARTYAPI_QUERY', [err.message]));
    }
  }

  /**
   * Gets the list of combination of street + city + state & adds county with the same
   * If none, then county is marked null; but added nonetheless
   *
   * @typedef {Object} address - Address Type for input
   * @property {string} record_ID - record ID of the Record
   * @property {string} street - street of the adress
   * @property {string} state - state of the address
   * @property {string} city - city of the address
   * @property {string} [county] - county of the address
   *
   * @param {address[]} aAddresses  array of address for which county is to be determined
   * @returns {Promise<address[]>} List of address with determined county
   */
  async getCountyFor(aAddresses = []) {
    try {
      if (aAddresses.length) {
        const oResult = await executeHttpRequest(
          {destinationName: this.SMARTY_ADDRESS_DESTINATION},
          {method: 'POST', data: aAddresses},
          {fetchCsrfToken: false},
        );
        const aAddressesWithCountry = oResult?.data?.length
          ? oResult.data.flatMap((oAddr) => [
              {
                record_ID: aAddresses[oAddr.input_index].record_ID,
                county: oAddr.metadata.county_name ?? null,
                street: oAddr.components.street_name ?? aAddresses[oAddr.input_index].street,
                city: oAddr.components.city_name ?? aAddresses[oAddr.input_index].city,
                state: oAddr.components.state_abbreviation ?? aAddresses[oAddr.input_index].state,
                zipcode: oAddr.components.zipcode ?? aAddresses[oAddr.input_index].zipcode
              },
            ])
          : [];
        return aAddressesWithCountry;
      } else {
        return [];
      }
    } catch (err) {
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_SMARTYAPI_GET_COUNTY', [err.message]));
      return [];
    }
  }

  /**
   * Checks the provided zipcode and returns the valid or false
   *
   * @typedef {Object} zipcode - Address Type for input
   * @property {string} record_ID - record ID of the Record
   * @property {string} zipcode - zipcode of the adress
   * @property {boolean} [valid] - is valid or not
   *
   * @param {address[]} aZipCodes  array of zipcodes which are to be checked
   * @returns {Promise<zipcode[]>} List of address with determined county
   */
  async checkZipCodes(aZipCodes = []) {
    try {
      if (aZipCodes.length) {
        const oResult = await executeHttpRequest(
          {destinationName: this.SMARTY_ZIPCODE_DESTINATION},
          {method: 'POST', data: aZipCodes},
          {fetchCsrfToken: false},
        );
        const aZipCodesWithValid = oResult?.data?.length
          ? oResult.data.flatMap((oZip) => {
              // {
              //   record_ID: aZipCodes[oZip.input_index].record_ID,
              //   valid: oZip.status === 'invalid_zipcode' ? false : true,
              //   zipcode: oZip.zipcodes[0].zipcode ?? aZipCodes[oZip.input_index].zipcode,
              // },
              const inputZip = aZipCodes[oZip.input_index] ?? {};
              const resolvedZipCode = oZip.zipcodes?.[0]?.zipcode ?? inputZip.zipcode ?? null;
              return [
                {
                  record_ID: inputZip.record_ID,
                  valid: oZip.status !== 'invalid_zipcode',
                  zipcode: resolvedZipCode,
                },
              ];
      })
          : [];
        return aZipCodesWithValid;
      } else {
        return [];
      }
    } catch (err) {
      LOG._error && LOG.error(cds.i18n.messages.at('ERR_SMARTYAPI_CHECK_ZIPCODE', [err.message]));
      return [];
    }
  }
}

module.exports = SmartyAddress;
