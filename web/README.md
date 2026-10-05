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
- **Base path.** GitHub Pages serves the site at `/CUABC-Web`. `next.config.mjs` sets
  `basePath`/`assetPrefix` from `NEXT_PUBLIC_BASE_PATH` (default `/CUABC-Web`). When the
  site later moves to a root domain, build with `NEXT_PUBLIC_BASE_PATH=''` and every
  URL drops the prefix — no code change needed.
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
| 6 | Full-site QA + cutover PR + rollback runbook | pending |

Every page is visually compared against the Jekyll build (desktop + mobile screenshots,
HTML/CSS diff) before it counts as done. Verification tooling: `scripts/serve.mjs`
serves any static build under the `/CUABC-Web` prefix the way GitHub Pages does, so the
Jekyll `_site/` and the Next.js `out/` can be browsed side by side.

## Quirks replicated from the Jekyll templates (on purpose, for parity)

These are pre-existing behaviours of the live site that the Next.js port reproduces
verbatim. They can be fixed later in a single pass on both sides if desired:

- `og:url` renders empty (`{{ url }}` is an undefined Liquid variable in
  `default.html`).
- `twitter:site` / `twitter:creator` render empty (`site.seo.*` is read instead of
  `site.data.seo.*`).
- The homepage hero image `src` is a bare relative path (`images/illustrations/...`)
  because `home.html` calls the Jekyll-unknown `relURL` filter, which passes the value
  through unchanged.
- The sub-footer copyright line links to www.zerostatic.io (theme attribution in
  `_data/seo.yml`).

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

While the migration is in flight, the live GitHub Pages site is still deployed by
`.github/workflows/jekyll.yml` from `main` — this branch cannot affect it (the
`nextjs-ci.yml` workflow here only builds, never deploys).

When Phase 6 lands, cutover is a single PR to `main` that disables the `jekyll.yml`
trigger and enables the Next.js deploy workflow. Rollback options, in order of speed:

1. **Re-run the last green "Deploy Jekyll site to Pages" run** in the Actions tab —
   restores the old site immediately (the artifact is still there).
2. **Revert the cutover commit** — `jekyll.yml` deploys again on the next push.
3. **Netlify**: `netlify.toml` is untouched and still builds the Jekyll site
   (`jekyll build` → `_site`), so it remains an independent Jekyll hosting fallback.

Because content lives only in the Jekyll files and both builds read the same sources,
there is no content divergence to worry about in any rollback path.
