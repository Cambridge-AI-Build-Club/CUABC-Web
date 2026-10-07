import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const web = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const glyphs = /[\u2190-\u21ff\u2794-\u27bf\u2715\u2716\u00d7\u2212\ufe0f]|['"]\s*\+\s*['"]|>\s*[+-]\s*</u

function inspect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) inspect(path)
    else if (entry.name.endsWith('.tsx')) {
      const source = readFileSync(path, 'utf8')
      const name = relative(web, path).replaceAll('\\', '/')
      if (glyphs.test(source)) failures.push(`${name}: replace text/emoji UI pictograms with Icon.`)
      if (/<svg\b/.test(source)) failures.push(`${name}: use Morphicons instead of a custom UI SVG.`)
      if (name !== 'components/Icon.tsx' && /from ['"](?:morphicons|lucide|lucide-react)(?:\/[^'"]*)?['"]/.test(source)) {
        failures.push(`${name}: use the shared components/Icon.tsx entry point.`)
      }
    }
  }
}

const contract = readFileSync(join(web, '..', 'DESIGN.md'), 'utf8')
if (!contract.includes('Morphicons') || !contract.includes('before editing the implementation')) {
  failures.push('DESIGN.md must record the shared icon policy and maintenance-first workflow.')
}
const base = process.env.DESIGN_BASE_SHA
const root = join(web, '..')
if (base || existsSync(join(root, '.git'))) {
  const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim().split('\n')
  const changed = base
    ? git(['diff', '--name-only', base, 'HEAD'])
    : [...git(['diff', '--name-only', 'HEAD']), ...git(['ls-files', '--others', '--exclude-standard'])]
  const designPaths = /^(web\/(app|components|styles)\/|images\/(features|logo|brand|illustrations)\/|_data\/(menus\.yml|features\.json)$|_config\.yml$)/
  if (changed.some((name) => designPaths.test(name)) && !changed.includes('DESIGN.md')) {
    failures.push('UI/design files changed without DESIGN.md. Update the contract and change record before implementation.')
  }
}
inspect(join(web, 'app'))
inspect(join(web, 'components'))
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('[check-design] UI icons follow DESIGN.md and the shared Morphicons entry point.')
