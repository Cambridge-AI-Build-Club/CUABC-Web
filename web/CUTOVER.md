# Cutover: Jekyll → Next.js

This branch (`nextjs`) contains the complete Next.js rebuild of the site in `web/`.
Merging it to `main` is the cutover: it activates `.github/workflows/nextjs.yml` and
disables the `jekyll.yml` trigger in the same commit. Nothing else changes — the
Jekyll sources stay in place and remain buildable.

## Suggested PR description

---

**Title:** Rebuild the site with Next.js (static export) and switch Pages deployment

**Body:**

Replaces the Jekyll build with a Next.js 15 static export in `web/`, deployed by a
new Pages workflow. The live site's pages, URLs and styling are unchanged.

- **Same content, new engine.** The Next.js build reads the Jekyll sources in place
  (`_config.yml`, `_data/*`, root `*.md`, `_events/`, `_blogs/`, `_team/`) at build
  time — content remains a single source of truth and is not duplicated.
- **Same styles.** `web/styles/globals.scss` mirrors `assets/css/style.scss` and
  compiles the same `_sass/` partials (including the vendored Bootstrap 5.3.2 subset);
  the compiled CSS is rule-for-rule equivalent to Jekyll's output.
- **Same URLs.** All 16 pages map 1:1 to the old pretty permalinks (trailing slashes,
  underscore team slugs), rendered statically under the `/CUABC-Web` base path.
- **Deploy.** `.github/workflows/nextjs.yml` builds `web/` and deploys to Pages;
  the `jekyll.yml` trigger is disabled (file kept for rollback).

Verification performed (per page, against a local Jekyll build served identically):
- Desktop (1440px) and mobile (375px) full-page screenshots — identical.
- href/src/class multiset diff of the exported HTML — no real differences.
- Runtime DOM comparison for the interactive calendar — identical (272 elements),
  interactions (month navigation, event selection) verified.
- Link integrity, image sync and external-link attributes checked.

**Rollback** (see `web/README.md`): re-run the last green "Deploy Jekyll site to
Pages" workflow run for an instant restore, or revert this single commit.

---

## Cutover steps

1. Open a PR from `nextjs` to `main` (description above).
2. Let the `Build Next.js site (no deploy)` check run — it validates a clean
   Linux build.
3. Merge. The merge push triggers `nextjs.yml`, which deploys the Next.js build to
   GitHub Pages. `jekyll.yml` no longer runs automatically.

## Rollback (in order of speed)

1. **Instant (no commit):** Actions tab → "Deploy Jekyll site to Pages" → open the
   last successful run on `main` → **Re-run all jobs**. The old Jekyll artifact is
   redeployed as-is.
2. **One commit:** `git revert` the cutover commit on `main` and push. This restores
   the `jekyll.yml` trigger and removes `nextjs.yml`, so the same push redeploys the
   Jekyll site.
3. **Netlify fallback:** `netlify.toml` is untouched and still builds the Jekyll site
   (`jekyll build` → `_site`), so Netlify can serve the old site independently.

## Root-domain deployment (done)

On 2026-10-05 the repository was renamed to `Cambridge-AI-Build-Club.github.io`, so the
org site serves at the root `https://cambridge-ai-build-club.github.io/`. No deploy
changes were needed: `actions/configure-pages` reports an empty base path and CI builds
with `NEXT_PUBLIC_BASE_PATH=''`. A follow-up commit switched the local defaults
(`next.config.mjs`, `lib/content.ts`, `scripts/serve.mjs`) and the docs to match.
URLs from before the rename (`.../CUABC-Web/...`) are dead — since Pages has no
server-side redirects, the build emits 0-second meta-refresh stubs for every former
URL under `out/CUABC-Web/` (see `scripts/gen-redirects.mjs`).

## Emergency deploy (bypassing Actions)

If Actions runners are unavailable (e.g. the 2026-10-05 GitHub incident, where deploy
runs sat queued for hours), the site can be published without Actions:

1. `cd web && npm run build`
2. Push `web/out/` to the `gh-pages` branch (init a throwaway repo, commit the export,
   force-push to `gh-pages`; keep the `.nojekyll` marker at the branch root).
3. Point Pages at the branch: Settings → Pages → "Deploy from a branch" →
   `gh-pages / (root)` (API equivalent: `PUT /repos/<owner>/<repo>/pages` with
   `build_type=legacy` and `source[branch]=gh-pages`, `source[path]=/`).
   `web/public/.nojekyll` ships with the build so the publisher never runs Jekyll
   over the export (it would drop the `_next/` directory).
4. Once Actions is healthy again: switch the Pages source back to "GitHub Actions"
   (`build_type=workflow`) and run the deploy workflow — it replaces the branch build.
   Branch-based publishing runs on the Pages infrastructure, not Actions runners, so
   it keeps working during Actions outages.
