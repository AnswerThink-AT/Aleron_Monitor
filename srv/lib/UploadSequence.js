// srv/lib/UploadSequence.js
const cds = require('@sap/cds');

function attachUploadSequenceHook(srv) {
  const entities = Object.values(srv.entities).filter(e => e?.elements?.uploadSeq);

  entities.forEach(entity => {
    srv.before('CREATE', entity, async req => {
      if (req.data.uploadSeq != null) return;

      const fileId = req.data.file_ID || req.data.file;
      if (!fileId) return;

      const ctx = req.context || req;
      ctx._uploadSeqCache ??= {};
      const cacheKey = `${entity.name}::${fileId}`;

      if (!ctx._uploadSeqCache[cacheKey]) {
        const tx = srv.transaction(req);

        // Get the highest non-null uploadSeq for this file (no aggregates)
        const row = await tx.run(
          SELECT.one.from(entity)
            .columns('uploadSeq')
            .where({ file_ID: fileId })
            .orderBy({ uploadSeq: 'desc' }, { createdAt: 'desc' }, { ID: 'desc' })
        );

        const base = row?.uploadSeq ?? 0; // if none or null, start at 0
        ctx._uploadSeqCache[cacheKey] = { next: base + 1 };
      }

      req.data.uploadSeq = ctx._uploadSeqCache[cacheKey].next++;
    });
  });
}

module.exports = { attachUploadSequenceHook };
