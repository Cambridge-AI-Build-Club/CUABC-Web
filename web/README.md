# CUABC-Web — Next.js rebuild (`web/`)

This directory contains the club's Next.js static website. The Claude design migration
uses shared templates and local styles, while root content and the original Jekyll
templates remain available for the legacy rollback build.

## Architecture

- **Next.js 15, App Router, TypeScript, `output: 'export'`** — fully static, deployable
  to GitHub Pages (or any static host).
- **Content is not duplicated.** At build time, pages read the Jekyll sources in place:
  `_config.yml`, `_data/*`, `_events/`, `_blogs/`, `_team/`, and the root `*.md` pages.
  Editing content in the Jekyll files updates both builds.
- **Design styles.** `styles/claude.css` contains the approved shared visual system;
  `styles/site.css` covers production navigation, prose, profiles and calendar.
  `components/SiteDocument.tsx` loads both. The playground imports the same base CSS.
  The untouched `styles/globals.scss` and `assets/css/style.scss` mirrors support
  the legacy Jekyll design; production templates no longer import them.
- **Images** are copied from the repository-root `images/` into `web/public/images/` by
  `scripts/sync-assets.mjs` (runs automatically before `dev`/`build`; the copy is
  gitignored).
- **Base path.** The repository is named `Cambridge-AI-Build-Club.github.io`, so the
  org site serves at the root `https://cambridge-ai-build-club.github.io/` and the base
  path is empty. `next.config.mjs` sets `basePath`/`assetPrefix` from
  `NEXT_PUBLIC_BASE_PATH` (empty by default; CI passes the value reported by
  `actions/configure-pages`, which would restore a `/repo-name` prefix on a
  project-page deploy).
- **Old-URL redirects.** The rename killed the old `/CUABC-Web/...` addresses; GitHub
  Pages has no server-side redirects, so the build generates a 0-second meta-refresh
  stub for every former URL under `out/CUABC-Web/` (`scripts/gen-redirects.mjs`, runs
  automatically after `next build`; skipped in subpath mode).
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

## Claude design migration

The original parity migration table above is historical. On 6 October 2026 the owner
approved the Claude design direction and authorized migration of all production routes.
See [migration plan](../docs/design/migration-plan.md) for route, content and asset scope.

- Production shell: `SiteFrame`, server content wrapper `Shell`, shared `SiteSections`
  and `ArticlePage`; obsolete Next.js theme components were removed.
- Root `index.md` owns approved homepage copy. Root menus, collection records and
  committee front matter supply navigation, cards, roles and recruitment details.
- `ActivityGrid` provides the activity filters. The three new decorative SVGs live
  in `images/features/`; club logos, portraits and official Claude artwork are reused.
- The warm/dark appearance switch stores an optional local browser preference.
- Canonical URLs, sitemap, static metadata routes and legacy redirects remain available.

## Calendar page notes

- Calendar is a primary navigation page for the ongoing club programme. Add future
  sessions to `_data/calendar.json`; existing dates and month controls are unchanged.

- `_data/calendar.json` is the build-time source for all 14 existing session records. Dates,
  times, venues and types are preserved; cancellation is an explicit status.
- The calendar renders February 2026 with a matching selected event, supports all
  three currently populated months and uses UTC date formatting to avoid day shifts.
- CSS is local, with no Tailwind Play CDN, remote logo or font dependency.
- The original Jekyll calendar remains frozen in `_layouts/calendar.html` for rollback.
  Editing the new JSON changes the Next.js calendar; it does not update that legacy script.

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
