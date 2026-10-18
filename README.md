# moss 🌱

**A little room for your mind.** A private, cloud-backed Markdown notebook with linked ideas, a visual canvas, spaced self-review, and a gentle animated companion.

[Open Moss](https://moss-notebook.snugbirch4.chatgpt.site) · [Feature roadmap](ROADMAP.md) · [Architecture](ARCHITECTURE.md)

The hosted notebook is owner-private and requires ChatGPT sign-in. The open source repository contains application code and starter notes only; your notebook data is never committed to GitHub.

## What works in 0.1

- Markdown source editing, reading, and split views; headings, code fences, tables, checklists, quotes, images, and links.
- Automatic cloud saves, per-user D1 storage, revision-based write conflict detection, and an IndexedDB device backup for interrupted connections while the page remains open.
- `[[Wiki links]]`, `[[target|aliases]]`, backlinks, automatic linked-title updates, search across titles and content, folders, tags, stars, and daily journals.
- Interactive linked-note graph (first 120 notes), draggable canvas cards, connections, and removable canvas edges.
- A library with card and table views, title/edited sorting, folder/tag filters, templates, and reusable notes tagged `template`.
- Markdown import/export with Moss metadata round trips; additive JSON backup import/export. Imported notes receive fresh IDs and never overwrite existing notes.
- Private attachments up to 8 MB each in R2; images render inline and other attachments open through an authorized endpoint.
- Recoverable trash and up to eight earlier content snapshots per note.
- Three CSS-drawn animated companions, editable names, three habitats, a midnight theme, reduced motion support, a quiet mode, and a 25-minute focus timer.
- Command palette (`Ctrl/Cmd+K`), save (`Ctrl/Cmd+S`), and Escape to dismiss overlays.
- Self-rated spaced review (1, 2, 4, 8…days). This is note recall, not generated questions or an AI tutor.

## Development

Requires **Node 24+** and **pnpm 11.25.0**. The repository uses the ChatGPT Sites Vinext/Cloudflare starter, including its platform build integration.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm exec wrangler d1 migrations apply site-creator-d1 --config wrangler.local.jsonc --local --persist-to .wrangler/state
pnpm dev
```

Local preview data and hosted data are separate. Portable local development uses the starter's mock identity; never use that mock identity integration as a substitute for hosted authentication.

```sh
pnpm test
pnpm exec tsc --noEmit
pnpm build
```

Hosted publication uses Sites source synchronization and deployment, which provisions D1/R2 and applies migrations. Cloning this repository does not grant access to the author's Site. To publish your own copy, register your own Site and replace `.openai/hosting.json`'s project identity through the Sites workflow.

## Data and backup limits

This first release stores the notebook as one versioned JSON record per user. It caps serialized notebook data at approximately **900 KB**, individual note bodies at 150,000 characters, notes at 1,500, and canvas cards at 300. History counts toward the notebook cap. It is suitable for a small personal notebook; a per-note database model is a roadmap item before larger vaults.

An exported JSON backup includes notes, histories, canvas layout, companion settings, and review state. Additive import currently restores notes and canvas cards, not companion/review state or canvas connections. Attachments live separately in R2 and are referenced by URLs; **JSON and Markdown backups do not contain attachment bytes**. Keep downloaded attachment copies. Offline editing requires an already-open page; there is no installed PWA/service worker in this release.

A sync conflict deliberately blocks further cloud writes. Export a backup, reload the latest cloud notebook, then import the backup to retain both sets of notes. There is no automatic merge or real-time collaboration. Browser backups are not encrypted independently of the device. The hosted app is private, but this is not end-to-end encryption.

## Scope

Moss is an independent app inspired by connected-note workflows. It is not affiliated with Obsidian or Finch, does not run Obsidian plugins, and does not claim complete Obsidian parity. No AI service, paid API key, or external note processing is required. Fonts are loaded from Google Fonts with local fallbacks.

## Validation

The initial release passed model/serialization tests, TypeScript checking, and a production Worker build. Browser interaction testing is tracked separately in release notes; a successful build alone is not a guarantee of every workflow on every device.

## License

MIT. The Sites starter plugin retains its own included license notice.
