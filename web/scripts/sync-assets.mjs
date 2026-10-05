// Copies the Jekyll site's images/ into web/public/ so that `next build` (static
// export) can serve them. The originals at the repository root stay the source of
// truth; this script runs before dev/build and the copy is gitignored.
import { cpSync, existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const webDir = dirname(dirname(fileURLToPath(import.meta.url)))
const src = join(webDir, '..', 'images')
const dest = join(webDir, 'public', 'images')

if (!existsSync(src)) {
  console.error(`[sync-assets] source directory not found: ${src}`)
  process.exit(1)
}

rmSync(dest, { recursive: true, force: true })
cpSync(src, dest, { recursive: true })
console.log('[sync-assets] images/ -> web/public/images/')
