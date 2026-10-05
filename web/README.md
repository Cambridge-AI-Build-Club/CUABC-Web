# CUABC-Web — Next.js rebuild (`web/`)

This directory contains the Next.js rebuild of the society's Jekyll site. It lives in a
subdirectory so that the Jekyll site at the repository root keeps building unchanged
until the migration is cut over — that is the rollback guarantee.

## Architecture

- **Next.js 15, App Router, TypeScript, `output: 'export'`** — fully static, deployable
  to GitHub Pages (or any static host).
- **Content is not duplicated.** At build time, pages read the Jekyll sources in place:
  `_config.yml`, `_data/*`, `_events/`, `_blogs/`, `_team/`, and the root `*.md` pages.
  Editing content in the Jekyll files updates both builds.
- **Styles are not duplicated.** `styles/globals.scss` mirrors `assets/css/style.scss`
  (same variables, same `@import` order) and the partials resolve against the
  repository-root `_sass/` via `sassOptions.includePaths` in `next.config.mjs`.
- **Images** are copied from the repository-root `images/` into `web/public/images/` by
  `scripts/sync-assets.mjs` (runs automatically before `dev`/`build`; the copy is
  gitignored).
- **Base path.** The repository is named `Cambridge-AI-Build-Club.github.io`, so the
  org site serves at the root `https://cambridge-ai-build-club.github.io/` and the base
  path is empty. `next.config.mjs` sets `basePath`/`assetPrefix` from
  `NEXT_PUBLIC_BASE_PATH` (empty by default; CI passes the value reported by
  `actions/configure-pages`, which would restore a `/repo-name` prefix on a
  project-page deploy).
- **URLs** match Jekyll's pretty permalinks exactly (`trailingSlash: true`; collection
  slugs keep their underscores, e.g. `/team/aditya_kalra/`).

## Commands (from this directory)

```
npm install        # once
npm run dev        # local dev server
npm run build      # static export into out/
```

## Migration phases

| Phase | Scope | Status |
|---|---|---|
| 0 | Skeleton: static export, basePath, SCSS pipeline, asset sync, CI build check | done |
| 1 | Global shell (head/meta, header, menus, footer, sub-footer, menu JS) + Home | done |
| 2 | About + Contact | done |
| 3 | Events listing + details, Blogs listing + details | done |
| 4 | Team listing + details | done |
| 5 | Calendar (interactive, ported verbatim incl. Tailwind CDN) | done |
| 6 | Full-site QA + cutover PR + rollback runbook | done (see CUTOVER.md) |

Every page is visually compared against the Jekyll build (desktop + mobile screenshots,
HTML/CSS diff) before it counts as done. Verification tooling: `scripts/serve.mjs`
serves any static build at the root the way GitHub Pages does, so the
Jekyll `_site/` and the Next.js `out/` can be browsed side by side.

## Quirks replicated during the migration, then fixed after cutover

These were Jekyll template bugs replicated 1:1 for exact parity during the migration,
and cleaned up once the site was live:

- `og:url` now carries the real absolute page URL (the Jekyll template rendered it
  empty — it read an undefined `url` variable).
- The empty `twitter:site` / `twitter:creator` meta tags are gone (the template read
  `site.seo.*` instead of `site.data.seo.*`, and the configured values were the theme
  author's handle anyway).
- The homepage hero image `src` is now a base-path-aware absolute URL (the Jekyll
  template called the nonexistent `relURL` filter and emitted a fragile relative path).
- The sub-footer copyright now reads `© 2026 Cambridge AI Builder Club`
  (`_data/seo.yml`), replacing the theme attribution.
- Added `sitemap.xml` and `robots.txt` (the Jekyll site had none).

## Calendar page notes

- The Tailwind **Play CDN** (`cdn.tailwindcss.com` + inline config with the `tw-`
  prefix) is kept exactly as in `_layouts/calendar.html`, so the calendar styles are
  generated at runtime client-side, identically to the Jekyll site. Replacing it with
  a locally built Tailwind setup (or porting the classes to the site's SCSS) is a
  possible future cleanup.
- The 14-event array, the "Cancelded" typo, and the brandfetch hot-linked logos are
  verbatim ports.
- Unlike Jekyll (which ships an empty grid and fills it with JS after load), the React
  page renders the initialised state (February 2026, first event selected) directly
  into the static HTML. The visible result and all interactions are identical; the
  "today" highlight is computed by the browser at hydration, matching Jekyll's
  runtime behaviour.

## Rollback / cutover

While the migration was in flight, the live GitHub Pages site stayed deployed by
`.github/workflows/jekyll.yml` from `main`. The full cutover procedure, the PR
description and the rollback runbook live in [`CUTOVER.md`](./CUTOVER.md). Summary:

- **Cutover** = merge the `nextjs` branch PR: it enables `nextjs.yml` (build `web/`,
  deploy to Pages) and disables the `jekyll.yml` trigger in one commit.
- **Rollback 1 — instant:** Actions tab → "Deploy Jekyll site to Pages" → last green
  run → Re-run all jobs (the old artifact is redeployed as-is).
- **Rollback 2 — one commit:** revert the cutover commit; the same push redeploys the
  Jekyll site.
- **Rollback 3 — fallback:** `netlify.toml` still builds the Jekyll site, so Netlify
  can serve the old site independently.

Because content lives only in the Jekyll files and both builds read the same sources,
there is no content divergence to worry about in any rollback path.
