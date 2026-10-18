# Architecture

React client → authenticated route handlers → Cloudflare D1 / R2.

`app/moss.tsx` owns interaction state. `lib/vault.ts` contains the data contract, seed content, linking, imports/exports, and review scheduling. Zod checks server writes and imported data. Markdown renders through React nodes, never raw HTML, and links allow only HTTP(S), mailto, and authorized attachment paths.

`GET /api/vault` returns the signed-in user's notebook and revision. `PUT /api/vault` performs a compare-and-swap: an insert may only win once, and updates must match the current revision. A stale client gets HTTP 409. The client serializes requests and preserves pending changes in IndexedDB. It never resolves a conflict by overwriting the newer cloud revision. A loaded tab retries saves after reconnection; offline app cold-start is not supported.

Attachment keys are namespaced by the server identity. Every read and write authorizes the current user. Active content is served as a download; safe supported types can render inline under a sandbox policy. R2 objects remain available when references are removed; garbage collection is deferred to avoid data loss from history or backups.

The hosting platform supplies authenticated identity headers. These are trustworthy only behind the Sites platform boundary. Deploying the source elsewhere requires replacing that boundary with verified authentication. Owner-private Site access further limits the hosted audience.

The notebook-wide revision favors simple, predictable consistency over concurrent editing. A future per-note schema, transactional conflict UI, attachment-inclusive archive export, and database indexes are required for large vaults.
