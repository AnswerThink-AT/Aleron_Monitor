// srv/common/pricingHelper.js
const cds = require('@sap/cds');
const { SELECT } = cds.ql;
const BusinessPartnerComm = require('../communicators/BusinessPartner');
const LOG = cds.log('pricingHelper');

/**
 * Determines the pricing condition type based on customer sales-area and local SalesCondition table
 * Logs key steps and data for debugging.
 */
async function determineConditionType({ customer, salesOrganization, distributionChannel, division }) {
  // guard
  if (!customer || !salesOrganization || !distributionChannel || !division) {
    const msg = 'Missing one of required inputs: customer, salesOrganization, distributionChannel, division';
    LOG.error(msg, { customer, salesOrganization, distributionChannel, division });
    throw new Error(msg);
  }
  LOG.info('Inputs received', { customer, salesOrganization, distributionChannel, division });

  // fetch all sales‐area entries for that customer
  const bpComm = new BusinessPartnerComm();
  await bpComm.getConnection();
  const salesAreas = await bpComm.executeQuery(
    SELECT.from('A_CustomerSalesArea')
      .columns([
        'SalesOrganization',
        'DistributionChannel',
        'Division',
        'CustomerPricingProcedure'
      ])
      .where({ Customer: customer })
  );
  LOG.info(`Fetched sales-area entries count=${salesAreas.length}`, { salesAreas });

  // find exact match
  LOG.info('Searching for exact match in sales-area entries');
  const match = salesAreas.find(sa =>
    sa.SalesOrganization   === salesOrganization &&
    sa.DistributionChannel === '01' &&
    sa.Division            === '01'
  );

  if (!match) {
    const procs = salesAreas.map(sa => sa.CustomerPricingProcedure).join(', ');
    const errMsg = `No pricing-procedure for customer=${customer} / salesOrg=${salesOrganization}. ` +
                   `Found procedures: [${procs}]`;
    LOG.error(errMsg);
    throw new Error(errMsg);
  }
  LOG.info('Matched sales-area entry', { match });

  // now lookup conditionType in SalesCondition
  LOG.info('Querying SalesCondition table', {
    salesOrganization,
    distributionChannel,
    division,
    custPricProcedure: match.CustomerPricingProcedure
  });
  const [ entry ] = await cds.run(
    SELECT.from('com.aleron.monitor.SalesCondition')
      .columns('conditionType')
      .where({
        salesOrganization,
        distributionChannel,
        division,
        custPricProcedure: match.CustomerPricingProcedure
      })
  );

  if (!entry || !entry.conditionType) {
    const errMsg = `No conditionType found for salesOrg=${salesOrganization} / distCh=${distributionChannel} / ` +
                   `division=${division} / custPricProcedure=${match.CustomerPricingProcedure}`;
    LOG.error(errMsg);
    throw new Error(errMsg);
  }
  LOG.info('Resolved conditionType', { conditionType: entry.conditionType });

  return entry.conditionType;
}

module.exports = { determineConditionType };