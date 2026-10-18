# Local development

Install Node 24+, enable Corepack, and run `pnpm install --frozen-lockfile`.

A dedicated local migration config is included. Apply the schema before starting:

```sh
pnpm exec wrangler d1 migrations apply site-creator-d1 --config wrangler.local.jsonc --local --persist-to .wrangler/state
pnpm dev
```

The starter selects a portable local execution profile when no ignored profile exists. Its portable preview supplies mock authentication. The managed ChatGPT build environment uses real platform identity instead. Do not commit local runtime state, `.env` files, credentials, databases, or notebook exports.

Run `pnpm test`, `pnpm exec tsc --noEmit`, and `pnpm build` before publication. Lint is available on demand. The hosted Sites workflow applies migrations and provisions storage. The `wrangler.local.jsonc` file is only for local migrations and is not a production deployment configuration.
