// srv/jobs/syncEnterpriseProjects.js

const cds = require('@sap/cds');
const { SELECT, UPSERT } = cds.ql;
const EnterpriseProject = require('../handlers/communicators/EnterpriseProject');

module.exports = async function syncEnterpriseProjects() {
  console.log('[syncEnterpriseProjects] ▶ Starting enterprise project sync');

  // 1) Instantiate & init the communicator
  const comm = new EnterpriseProject();
  await comm.init();
  console.log('[syncEnterpriseProjects] ▶ Communicator initialized');

  // 2) Connect to your local DB
  const db        = await cds.connect.to('db');
  const cacheName = 'trip.EnterpriseProjectCache';
  console.log(`[syncEnterpriseProjects] ▶ Connected to DB (kind=${db.kind}), cache=${cacheName}`);

  // 3) Build the OData SELECT for only the fields you need
  const q = SELECT.from('A_EnterpriseProject').columns([
    'ProjectUUID',
    'Project',
    'ProjectDescription',
    'EnterpriseProjectType',
    'ProfitCenter',
    'ResponsibleCostCenter',
    'CompanyCode',
    'YY1_SalesOrder_PPH',
    'YY1_Employee_PPH',
    'YY1_EmployeeName_PPH'
  ]).where({ ProcessingStatus: '10' });

  // 4) Fetch from S/4
  let allProjects;
  try {
    allProjects = await comm.executeQuery(q);
    console.log(`[syncEnterpriseProjects] ▶ Fetched ${Array.isArray(allProjects) ? allProjects.length : 0} projects`);
  } catch (e) {
    console.error('[syncEnterpriseProjects] ✖ Error fetching projects:', e);
    throw e;
  }

  if (!Array.isArray(allProjects) || allProjects.length === 0) {
    console.warn('[syncEnterpriseProjects] ⚠ No project data received — exiting');
    return;
  }

  // 5) Map to your cache structure
  const entries = allProjects.map(p => ({
    Project:                p.Project,
    ProjectDescription:     p.ProjectDescription,
    EnterpriseProjectType:  p.EnterpriseProjectType,
    ProfitCenter:           p.ProfitCenter,
    ResponsibleCostCenter:  p.ResponsibleCostCenter,
    CompanyCode:            p.CompanyCode,
    YY1_SalesOrder_PPH:     p.YY1_SalesOrder_PPH,
    YY1_Employee_PPH:       p.YY1_Employee_PPH,
    YY1_EmployeeName_PPH:   p.YY1_EmployeeName_PPH,
    LastSyncedAt:           new Date()
  }));

  // 6) Deduplicate by Project key
  const uniqueEntries = Array.from(
    new Map(entries.map(e => [e.Project, e])).values()
  );
  const dupCount = entries.length - uniqueEntries.length;
  if (dupCount > 0) {
    console.log(`[syncEnterpriseProjects] ⚠ Removed ${dupCount} duplicate entries`);
  }

  // 7) Upsert into cache (insert or update, no key conflicts)
  try {
    await db.run(
      UPSERT.into(cacheName).entries(uniqueEntries)
    );
    console.log(`[syncEnterpriseProjects] ✔ Upserted ${uniqueEntries.length} projects into ${cacheName}`);
  } catch (e) {
    console.error('[syncEnterpriseProjects] ✖ Error upserting cache entries:', e);
    throw e;
  }

  console.log('[syncEnterpriseProjects] ✔ Enterprise project sync complete');
};
