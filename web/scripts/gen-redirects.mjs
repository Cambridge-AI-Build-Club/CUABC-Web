// Generates redirect stubs for the pre-rename project-page URLs. GitHub Pages has no
// server-side redirect configuration, so each former /CUABC-Web/<path>/ address gets a
// 0-second meta-refresh page (plus canonical and a JS location.replace) pointing at the
// root-domain equivalent - the same approach as Jekyll's jekyll-redirect-from plugin.
// Only runs in root mode: in subpath mode the /CUABC-Web URLs are the live ones.
//
//   node scripts/gen-redirects.mjs [outDir]
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const outDir = process.argv[2] ?? 'out'
const oldPrefix = 'CUABC-Web'
const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://cambridge-ai-build-club.github.io'

if (process.env.NEXT_PUBLIC_BASE_PATH) {
  console.log(
    `gen-redirects: NEXT_PUBLIC_BASE_PATH is set ('${process.env.NEXT_PUBLIC_BASE_PATH}'), ` +
      'skipping - the /CUABC-Web URLs are the live ones in subpath mode',
  )
  process.exit(0)
}

// Collect every generated page: each directory containing an index.html, plus the
// output root itself (the homepage). Skip the stub tree from a previous run.
const pageDirs = []
if (existsSync(join(outDir, 'index.html'))) pageDirs.push('')
walk(outDir)
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === oldPrefix) continue
    const full = join(dir, entry)
    if (!statSync(full).isDirectory()) continue
    if (existsSync(join(full, 'index.html'))) pageDirs.push(relative(outDir, full))
    walk(full)
  }
}
function existsSync(p) {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

rmSync(join(outDir, oldPrefix), { recursive: true, force: true })
for (const dir of pageDirs) {
  // '' (the homepage) redirects to '/', any other page keeps its trailing slash.
  const target = dir === '' ? '/' : `/${dir.replaceAll('\\', '/')}/`
  const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting&hellip;</title>
<link rel="canonical" href="${origin}${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<style>body{font-family:system-ui,sans-serif;margin:4rem auto;max-width:36rem;padding:0 1rem}a{color:#0366d6}</style>
</head>
<body>
<h1>Redirecting&hellip;</h1>
<p>This page has moved to <a href="${target}">${origin}${target}</a>.</p>
<script>location.replace(${JSON.stringify(target)})</script>
</body>
</html>
`
  const stubDir = join(outDir, oldPrefix, dir)
  mkdirSync(stubDir, { recursive: true })
  writeFileSync(join(stubDir, 'index.html'), page)
}
console.log(`gen-redirects: wrote ${pageDirs.length} redirect stubs under ${oldPrefix}/`)
