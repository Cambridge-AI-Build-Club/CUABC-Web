// Serves a static build directory under the /CUABC-Web prefix, the way GitHub Pages
// serves the project site. Used for visual comparison against the Jekyll build.
//
//   node scripts/serve.mjs ../_site 4101
//   node scripts/serve.mjs out 4102
import { createServer } from 'node:http'
import { statSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join, normalize, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const webDir = dirname(dirname(fileURLToPath(import.meta.url)))
const root = resolve(webDir, process.argv[2] ?? 'out')
const port = Number(process.argv[3] ?? 4102)
const prefix = '/CUABC-Web'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

function resolveFile(urlPath) {
  if (!urlPath.startsWith(prefix)) return null
  let rel = urlPath.slice(prefix.length)
  if (rel === '' || rel === '/') rel = '/index.html'
  const base = normalize(rel).replace(/^(\.\.[/\\])+/, '')
  const candidates = [base, base + '.html', join(base, 'index.html')]
  for (const c of candidates) {
    const full = join(root, c)
    if (existsSync(full) && statSync(full).isFile()) return full
  }
  return null
}

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const file = resolveFile(path)
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found: ' + path)
    return
  }
  res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
  res.end(readFileSync(file))
}).listen(port, () => {
  console.log(`serving ${root} at http://localhost:${port}${prefix}/`)
})
