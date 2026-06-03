// srv/jobs/syncWorkAssignments.js
const cds = require('@sap/cds');
const { SELECT, UPSERT } = cds.ql;
const Workforce = require('../handlers/communicators/Workforce');

const PAGE_SIZE  = 1000;   // pull 1k at a time; raise/lower if needed
const CHUNK_SIZE = 1000;   // DB upsert chunk size

module.exports = async function syncWorkAssignments() {
  console.log('[syncWorkAssignments] ▶ Starting work assignment sync');

  // 1) Init communicator
  const comm = new Workforce();
  await comm.init();
  console.log('[syncWorkAssignments] ▶ Communicator initialized');

  // 2) DB handle + cache entity name
  const db        = await cds.connect.to('db');
  const cacheName = 'trip.WorkAssignmentCache';
  console.log(`[syncWorkAssignments] ▶ Connected to DB (kind=${db.kind}), cache=${cacheName}`);

  // 3) Page through YY1_workforce_cds until empty page
  const all = [];
  let skip = 0;
  for (;;) {
    const q = SELECT.from('YY1_workforce_cds')
      .columns(
        // primary fields you need
        'WorkAssignmentExternalID',
        'WorkAssignmentBusinessPartner',
        'PersonFullName',
        'FullName',
        'LastName',
        // fallbacks present in your payload (guard mapping)
        'WorkforcePersonExternalID',
        'BusinessPartner'
      )
      .limit(PAGE_SIZE, skip);

    let page = [];
    try {
      page = await comm.executeQuery(q);  // <-- your reference style
    } catch (e) {
      console.error('[syncWorkAssignments] ✖ Error fetching page:', e);
      throw e;
    }

    const n = Array.isArray(page) ? page.length : 0;
    console.log(`[syncWorkAssignments] ▶ Page @skip=${skip} received ${n}`);
    if (!n) break;

    all.push(...page);
    skip += n;
    if (n < PAGE_SIZE) break; // last page
  }

  console.log(`[syncWorkAssignments] ▶ Fetched total ${all.length} raw rows`);

  if (!all.length) {
    console.warn('[syncWorkAssignments] ⚠ No work assignment data received — exiting');
    return 0;
  }

  // 4) Map to cache shape (with safe fallbacks) + de-dupe
  const mapped = all.map(r => {
    const key = r.WorkAssignmentExternalID || r.WorkforcePersonExternalID;
    if (!key) return null;
    return {
      WorkAssignmentExternalID      : key,
      WorkAssignmentBusinessPartner : r.WorkAssignmentBusinessPartner || r.BusinessPartner || '',
      PersonFullName                : r.PersonFullName || r.FullName || '',
      FullName                      : r.FullName || r.PersonFullName || '',
      LastName                      : r.LastName || ''
    };
  }).filter(Boolean);

  const unique = Array.from(new Map(mapped.map(x => [x.WorkAssignmentExternalID, x])).values());
  const dupCount = mapped.length - unique.length;
  if (dupCount > 0) console.log(`[syncWorkAssignments] ⚠ Removed ${dupCount} duplicates by key`);

  // 5) UPSERT in chunks (driver rowcount can be misleading; return our count)
  for (let i = 0; i < unique.length; i += CHUNK_SIZE) {
    const chunk = unique.slice(i, i + CHUNK_SIZE);
    await db.run(UPSERT.into(cacheName).entries(chunk));
  }

  console.log(`[syncWorkAssignments] ✔ Upserted ${unique.length} work assignments into ${cacheName}`);
  console.log('[syncWorkAssignments] ✔ Work assignment sync complete');
  return unique.length;
};
