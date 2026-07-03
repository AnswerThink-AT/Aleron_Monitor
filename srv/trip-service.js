// srv/trip-service.js
const cds = require('@sap/cds');
const { INSERT, DELETE, UPDATE, SELECT, or, like } = cds.ql;
const SequenceHelper    = require('./lib/SequenceHelpertrip');
const syncBusinessUsers = require('./Jobs/syncBusinessUsers');
const syncEnterpriseProjects = require('./Jobs/syncEnterpriseProjects');
const syncWorkAssignments = require('./Jobs/syncWorkAssignments');
const { readBusinessUser } = require('./lib/handlers');
const { journalServicePromise, journalServiceEndpoint } = require('./lib/handlers');

module.exports = cds.service.impl(async (srv) => {
  console.log('[trip-service] ▶ service implementation loaded');

  // Connect
  const db = await cds.connect.to('db');
  console.log('[trip-service] ▶ connected to DB kind =', db.kind);

  // Entities
  const {
    Trip,
    TRIPHeader,
    TRIPItem,
    TRIPCost,
    BusinessUser,
    CachedBusinessUser,
    EnterpriseProjectCache,
    WorkAssignmentCache 
  } = srv.entities;

  // ─── Initial sync ─────────────────────────
  try {
    await syncBusinessUsers();
    console.log('[trip-service] ▶ Business user sync complete');
  } catch (e) {
    console.error('[trip-service] ✖ Sync failed:', e.message);
  }

    try {
    const count = await syncWorkAssignments();
    console.log(`[trip-service] ▶ Work assignments sync complete (${count})`);
  } catch (e) {
    console.error('[trip-service] ✖ Work assignments sync failed:', e.message);
  }
    // ─── EnterpriseProject sync ───────────────
  try {
    await syncEnterpriseProjects();
    console.log('[trip-service] ▶ Enterprise project sync complete');
  } catch (e) {
    console.error('[trip-service] ✖ Enterprise project sync failed:', e.message);
  }
  const PROJECT_SYNC_INTERVAL_MS = 15 * 60 * 1000;
  setInterval(async () => {
    try {
      await syncEnterpriseProjects();
      console.log('[trip-service] ▶ Scheduled enterprise project sync complete (15 min)');
    } catch (e) {
      console.error('[trip-service] ✖ Scheduled enterprise project sync failed:', e.message);
    }
  }, PROJECT_SYNC_INTERVAL_MS).unref();
  // Sequence helper factory
  const makeSeq = tx => new SequenceHelper({
    db: tx,
    sequence: 'COM_ALERON_MONITOR_TripNumberSeq',
    table: 'Trip',
    field: 'TripNumber'
  });

  // ─── BusinessUser handlers ─────────────────
  // Live SOAP lookup
  srv.on('READ', BusinessUser, readBusinessUser);

  srv.on('postJournalEntry', async (req) => {
    const { xmlPayload } = req.data;
    if (!xmlPayload) {
      return req.error(400, 'xmlPayload is required');
    }
  
    // 1) get the SOAP client + endpoint
    const client = await journalServicePromise;
    client.setEndpoint(journalServiceEndpoint.url);
    console.log('SOAP client methods:', Object.keys(client));
  
    try {
      // 2) invoke the WSDL operation
      const [result] = await client.JournalEntryCreateRequestConfirmation_InAsync({ _xml: xmlPayload });
      console.log('[CAP][postJournalEntry] SOAP result:', result);
  
      // 3) return raw XML back to the UI
      return client.lastResponse;
    } catch (e) {
      console.error('[CAP][postJournalEntry] SOAP error', e);
      req.error(502, 'SOAP call failed: ' + e.message);
    }
  });

  // Cached value‑help
  if (CachedBusinessUser) {
    srv.on('READ', CachedBusinessUser, async (req) => {
      const input = req._.req?.query?.search?.toLowerCase() || '';
      const tx = cds.transaction(req);

      if (!input) {
        return tx.run(`SELECT * FROM "TRIP_CACHEDBUSINESSUSER" LIMIT 10`);
      }

      const search = `%${input}%`;
      const isDigit = /^\d/.test(input);

      const sql = isDigit
        ? `SELECT * FROM "TRIP_CACHEDBUSINESSUSER"
           WHERE LOWER("PERSONEXTERNALID") LIKE ?
              OR LOWER("USERNAME") LIKE ?
           LIMIT 10`
        : `SELECT * FROM "TRIP_CACHEDBUSINESSUSER"
           WHERE LOWER("PERSONFULLNAME") LIKE ?
              OR LOWER("EMAILADDRESS") LIKE ?
           LIMIT 10`;

      return tx.run(sql, [search, search]);
    });
  } else {
    console.warn('[trip-service] ⚠ CachedBusinessUser not available, skipping');
  }

  if (WorkAssignmentCache) {
    srv.on('READ', WorkAssignmentCache, async (req) => {
      const tx    = cds.transaction(req);
      const q     = (req._.req?.query?.search || '').toLowerCase(); // supports $search=
      const top   = parseInt(req._.req?.query?.$top, 10) || 10;

      if (!q) {
        // no search term: return top N
        return tx.run(`
          SELECT *
            FROM "TRIP_WORKASSIGNMENTCACHE"
           ORDER BY "PERSONFULLNAME"
           LIMIT ${top}
        `);
      }

      const s = `%${q}%`;
      return tx.run(`
        SELECT *
          FROM "TRIP_WORKASSIGNMENTCACHE"
         WHERE LOWER("PERSONFULLNAME") LIKE ?
            OR LOWER("FULLNAME")       LIKE ?
            OR LOWER("LASTNAME")       LIKE ?
            OR LOWER("WORKASSIGNMENTEXTERNALID") LIKE ?
            OR LOWER("WORKASSIGNMENTBUSINESSPARTNER") LIKE ?
         ORDER BY "PERSONFULLNAME"
         LIMIT ${top}
      `, [s, s, s, s, s]);
    });
  } else {
    console.warn('[trip-service] ⚠ WorkAssignmentCache not available, skipping');
  }

  // ─── Action to refresh cache on demand ─────────────────────────────────
  srv.on('refreshWorkAssignmentCache', async (req) => {
    try {
      const n = await syncWorkAssignments();
      return n; // number of rows written
    } catch (e) {
      console.error('[trip-service] refreshWorkAssignmentCache failed:', e);
      req.error(500, e.message);
    }
  });

  // if (EnterpriseProjectCache) {
  //   srv.on('READ', EnterpriseProjectCache, async (req) => {
  //     const input = req._.req?.query?.search?.toLowerCase() || '';
  //     const tx = cds.transaction(req);
  
  //     // no search term? return top 10
  //     if (!input) {
  //       return tx.run(`SELECT * FROM "TRIP_ENTERPRISEPROJECTCACHE" LIMIT 10`);
  //     }
  
  //     const search = `%${input}%`;
  
  //     // search across project code, description, employee name or project type
  //     const sql = `
  //       SELECT * FROM "TRIP_ENTERPRISEPROJECTCACHE"
  //       WHERE LOWER("PROJECT")              LIKE ?
  //          OR LOWER("PROJECTDESCRIPTION")   LIKE ?
  //          OR LOWER("YY1_EMPLOYEE_NAME_PPH") LIKE ?
  //          OR LOWER("ENTERPRISEPROJECTTYPE") LIKE ?
  //       LIMIT 10
  //     `;
  
  //     return tx.run(sql, [search, search, search, search]);
  //   });
  // } else {
  //   console.warn('[trip-service] ⚠ EnterpriseProjectCache not available, skipping');
  // }

  // srv.on('READ', EnterpriseProjectCache, async (req) => {
  //   const tx    = cds.transaction(req);
  //   const input = (req._.req.query.search || '').toLowerCase();
  //   const top   = parseInt(req._.req.query.$top, 10) || 10;
  
  //   if (!input) {
  //     // honor the client’s $top (or default to 10)
  //     return tx.run(`
  //       SELECT * 
  //       FROM "TRIP_ENTERPRISEPROJECTCACHE"
  //       LIMIT ${ top }
  //     `);
  //   }
  
  //   const term = `%${ input }%`;
  //   return tx.run(`
  //     SELECT *
  //       FROM "TRIP_ENTERPRISEPROJECTCACHE"
  //      WHERE LOWER("PROJECT")            LIKE ?
  //         OR LOWER("PROJECTDESCRIPTION") LIKE ?
  //         OR LOWER("YY1_EMPLOYEE_PPH")    LIKE ?
  //         OR LOWER("ENTERPRISEPROJECTTYPE") LIKE ?
  //      LIMIT ${ top }
  //   `, [ term, term, term, term ]);
  // });
  srv.on('READ', EnterpriseProjectCache, async (req) => {

  if (req.query.SELECT.where) {
    const result = await cds.run(req.query);
    return toUpperCaseKeys(result);
  }

  const tx = cds.transaction(req);
  const input = (req._.req.query.search || '').toLowerCase();
  const top = parseInt(req._.req.query.$top, 10) || 10;

  if (!input) {
    const result = await tx.run(
      SELECT.from(EnterpriseProjectCache).limit(top)
    );
    return toUpperCaseKeys(result);
  }

  const term = `%${input}%`;

  const result = await tx.run(`
    SELECT *
    FROM "TRIP_ENTERPRISEPROJECTCACHE"
    WHERE LOWER("PROJECT") LIKE ?
       OR LOWER("PROJECTDESCRIPTION") LIKE ?
       OR LOWER("YY1_EMPLOYEE_PPH") LIKE ?
       OR LOWER("ENTERPRISEPROJECTTYPE") LIKE ?
    LIMIT ${top}
  `, [term, term, term, term]);

  return toUpperCaseKeys(result);
});


function toUpperCaseKeys(data) {
  const upperRow = (row) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [key.toUpperCase(), value])
    );

  return Array.isArray(data) ? data.map(upperRow) : upperRow(data);
}
  


// ─── Revised Country ↔ Currency map ───────────
// ─── Robust Country ↔ Currency map ───────────
srv.on('getCountryCurrencyMap', async (req) => {
  const tx = cds.transaction(req);

  // 1) Fetch code-lists
  const countries  = await tx.run(SELECT.from('sap.common.Countries'));
  const currencies = await tx.run(SELECT.from('sap.common.Currencies'));

  // 2) Quick sanity-check in the logs
  console.log(`→ loaded ${countries.length} countries, ${currencies.length} currencies`);
  console.log('→ has US country?', countries.some(c => c.code==='US'));
  console.log('→ has USD currency?', currencies.some(c => c.code==='USD'));

  // 3) Build map
  const map = countries.map(({ code }) => {
    // try exact two-letter match:
    let cur = currencies.find(c => c.code.slice(0,2) === code);

    // fallback: currency code === country code (rare)
    if (!cur) {
      cur = currencies.find(c => c.code === code);
    }

    // still nothing? special-case US
    if (!cur && code === 'US') {
      cur = currencies.find(c => c.code === 'USD');
    }

    return {
      Country:  code,
      Currency: cur ? cur.code : null
    };
  });

  // 4) Drop any unmapped entries
  return map.filter(entry => entry.Currency);
});



  // ─── Hooks for Trip & Items ─────────────────
  // Auto‑assign TripNumber on CREATE
  srv.before('CREATE', Trip, async (req) => {
    if (!req.data.TripNumber) {
      const tx   = cds.transaction(req);
      const next = await makeSeq(tx).getNextNumber();
      console.log('[trip-service][CREATE] Assign TripNumber =', next);
      req.data.TripNumber = next;
    }
  });

  // Truncate receipt numbers
  srv.before(['CREATE', 'UPDATE'], TRIPItem, (req) => {
    const num = req.data.ReceiptsDocumentNumber;
    if (num != null) {
      req.data.ExpenseReceiptNumber = String(num).substring(0, 12);
    }
  });

  // ─── Custom Actions ────────────────────────
  srv.on('getTripReport', async (req) => {
    const tx = cds.tx(req);
    const sql = `
      SELECT 
        T."TripNumber",
        T."TripStartDate",
        T."TripEndDate",
        H."Project",
        H."Destination",
        H."TripStatus.name" AS "TripStatus"
      FROM "trip"."Trip"    AS T
      JOIN "trip"."TRIPHeader" AS H
        ON T."TripNumber" = H."TripNumber"
    `;
    return tx.run(sql);
  });

  srv.on('createFullTrip', async (req) => {
    const { Personnel, StartOfTrip, EndOfTrip } = req.data;
    if (!Personnel || !StartOfTrip || !EndOfTrip) {
      return req.error(400, 'Personnel, StartOfTrip and EndOfTrip are required');
    }

    const tx = cds.transaction(req);
    let TripNumber;
    try {
      TripNumber = await makeSeq(tx).getNextNumber();
    } catch {
      return req.error(500, 'Could not generate TripNumber');
    }

    try {
      await tx.run(INSERT.into(Trip).entries({ TripNumber, Personnel, StartOfTrip, EndOfTrip }));
      await tx.run(INSERT.into(TRIPHeader).entries({
        TripNumber, Personnel, StartOfTrip, EndOfTrip,
        Destination: '', Project: '', TotalAmount: 0
      }));
      await tx.run(INSERT.into(TRIPItem).entries({
        TripNumber, Personnel, StartOfTrip, EndOfTrip,
        ExpenseReceiptNumber: '0', Amount: 0
      }));
      await tx.run(INSERT.into(TRIPCost).entries({
        TripNumber, Personnel, StartOfTrip, EndOfTrip,
        CostDistributionPercentage: 0, Project: ''
      }));
    } catch {
      return req.error(500, 'Failed to insert one or more trip records');
    }

    return { TripNumber, Personnel, StartOfTrip, EndOfTrip };
  });

  srv.on('deleteFullTrip', async (req) => {
    const { TripNumbers } = req.data;
    if (!Array.isArray(TripNumbers) || !TripNumbers.length) {
      return req.error(400, 'No TripNumbers provided');
    }

    await DELETE.from(TRIPItem).where({ TripNumber: { in: TripNumbers } });
    await DELETE.from(TRIPCost).where({ TripNumber: { in: TripNumbers } });
    await DELETE.from(TRIPHeader).where({ TripNumber: { in: TripNumbers } });
    await DELETE.from(Trip).where({ TripNumber: { in: TripNumbers } });

    return {
      success: true,
      message: `${TripNumbers.length} trip(s) deleted`
    };
  });

  srv.on('cancelTrip', async (req) => {
    let { TripNumbers } = req.data;
    if (!TripNumbers || !TripNumbers.length) {
      req.reject(400, 'No trip numbers provided');
    }
    TripNumbers = TripNumbers.map(String);
    const tx = cds.tx(req);
    await tx.run(
      UPDATE(TRIPHeader)
        .set({ TripStatus_code: 6 })
        .where({ TripNumber: { in: TripNumbers } })
    );
    return { message: 'Trips cancelled successfully' };
  });

  srv.on('approveTrip', async (req) => {
    let { TripNumbers } = req.data;
    if (!TripNumbers || !TripNumbers.length) {
      req.reject(400, 'No trip numbers provided');
    }
    TripNumbers = TripNumbers.map(String);
    const tx = cds.tx(req);
      await tx.run(
        UPDATE(TRIPHeader)
          .set({ TripStatus_code: 1 })
          .where({ TripNumber: { in: TripNumbers } })
      );
      return { message: 'Trips approved successfully' };
  });

  srv.on('markTripSettled', async (req) => {
  let { TripNumbers } = req.data;
  if (!TripNumbers || !TripNumbers.length) {
    req.reject(400, 'No trip numbers provided');
  }

  TripNumbers = TripNumbers.map(String);
  const tx = cds.tx(req);

  await tx.run(
    UPDATE(TRIPHeader)
      .set({ TripStatus_code: 2 }) // Settled
      .where({ TripNumber: { in: TripNumbers } })
  );

  return { message: 'Trips settled successfully' };
  });

  srv.on('markSettleError', async (req) => {
    let { TripNumbers } = req.data;
    if (!TripNumbers || !TripNumbers.length) {
      req.reject(400, 'No trip numbers provided');
    }

    TripNumbers = TripNumbers.map(String);
    const tx = cds.tx(req);

    await tx.run(
      UPDATE(TRIPHeader)
        .set({ TripStatus_code: 8 }) // Settlement error
        .where({ TripNumber: { in: TripNumbers } })
    );

    return { message: 'Trips marked as settlement error' };
  });

  // ─── Deep update: Trip + Header ────────────
  srv.on('UPDATE', Trip, async (req) => {
    const { TripNumber, Personnel, Header, ...tripData } = req.data;
    if (!TripNumber || !Personnel) {
      return req.error(400, 'Trip key missing');
    }

    await UPDATE(Trip).set(tripData).where({ TripNumber, Personnel });

    if (Header) {
      await UPDATE(TRIPHeader).set(Header).where({ TripNumber, Personnel });
    }

    return req.data;
  });

  // Logging hooks
  srv.before('UPDATE', Trip,       req => console.log('[Trip UPDATE] ▶', req.data));
  srv.before('UPDATE', TRIPHeader, req => console.log('[TRIPHeader UPDATE] ▶', req.data));
});
