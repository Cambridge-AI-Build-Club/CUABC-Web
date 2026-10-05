// Build-time loaders for the Jekyll content sources. The repository root stays the
// single source of truth: _config.yml, _data/*, root pages and _collections are read
// from disk here (server components only - this module must never be imported from
// client code).
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { parse as parseYaml } from 'yaml'
import { marked } from 'marked'

const repoRoot = path.join(process.cwd(), '..')

// The GitHub Pages org site serves at the root domain. CI passes
// NEXT_PUBLIC_BASE_PATH from actions/configure-pages (a /repo-name prefix on a
// project-page deploy); locally the empty default matches production.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// Origin used for canonical URLs (og:url, sitemap, robots). Override with
// NEXT_PUBLIC_SITE_ORIGIN when the site moves to its own domain.
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://cambridge-ai-build-club.github.io'

// Absolute canonical URL for a Jekyll-style page path (leading + trailing slash).
export function absoluteUrl(pagePath: string): string {
  return `${siteOrigin}${basePath}${pagePath}`
}

// Replicates Liquid's relative_url: prefixes the base path, keeps trailing slashes
// ("/blogs/" stays "/blogs/", "events" stays without one) and percent-encodes like
// Addressable does (e.g. spaces in SVG filenames become %20).
export function url(p: string): string {
  const stripped = p.replace(/^\/+/, '')
  if (stripped === '') return p === '/' ? `${basePath}/` : basePath || '/'
  return encodeURI(`${basePath}/${stripped}`)
}

function readRepoFile(rel: string): string {
  // Normalize CRLF: the Jekyll build treats \r\n\r\n as a paragraph break, so the
  // excerpt split below must see the same content regardless of checkout settings.
  return fs.readFileSync(path.join(repoRoot, rel), 'utf8').replace(/\r\n/g, '\n')
}

// --- site config (_config.yml) ---

export interface LogoConfig {
  mobile: string
  mobile_height: string
  mobile_width: string
  desktop: string
  desktop_height: string
  desktop_width: string
}

export interface SiteConfig {
  title: string
  logo: LogoConfig
  home?: { limit_services?: number }
}

export function loadConfig(): SiteConfig {
  return parseYaml(readRepoFile('_config.yml'))
}

// --- data files (_data/*) ---

export interface MenuItem {
  name: string
  url: string
  weight: number
}

export function loadMenus(): { main: MenuItem[]; footer: MenuItem[] } {
  return parseYaml(readRepoFile('_data/menus.yml'))
}

export function loadSignup(): { form: string } {
  return parseYaml(readRepoFile('_data/signup.yml'))
}

export function loadContact(): {
  email?: string
  phone?: string
  contact_button_link: string
} {
  return parseYaml(readRepoFile('_data/contact.yml'))
}

export function loadDiscord(): { discord: string } {
  return parseYaml(readRepoFile('_data/discord.yml'))
}

export interface SocialItem {
  name: string
  link: string
  image: string
}

export function loadSocial(): SocialItem[] {
  return JSON.parse(readRepoFile('_data/social.json'))
}

export interface FeatureItem {
  title: string
  description?: string
  image?: { url: string; width: number; height: number }
}

export function loadFeatures(): FeatureItem[] {
  return JSON.parse(readRepoFile('_data/features.json'))
}

export function loadSeo(): { copyright_text?: string } {
  return parseYaml(readRepoFile('_data/seo.yml'))
}

// --- markdown helpers (Liquid filter parity) ---

// kramdown converts straight quotes, dashes and ellipses in prose (smart_quotes is on
// by default) and marked/react-markdown do not. The subset below covers the patterns
// that appear in this content; applied to bodies at load time so excerpts (which
// truncate the HTML string and are therefore length-sensitive) and page rendering see
// the same text kramdown would produce.
export function smartQuotes(s: string): string {
  return s
    .replace(/(\w)'(?=\w)/g, '$1\u2019') // Queen's -> Queen’s
    .replace(/([ \t])---([ \t])/g, '$1\u2014$2') // word --- word -> —
    .replace(/([ \t])--([ \t])/g, '$1\u2013$2') // word -- word -> –
    .replace(/\.\.\./g, '\u2026') // ... -> …
}

// Jekyll's default excerpt separator: the first paragraph.
export function firstParagraph(body: string): string {
  return body.split('\n\n')[0] ?? ''
}

// Liquid's truncate: the ellipsis counts towards the length.
export function truncate(s: string, length: number): string {
  if (s.length <= length) return s
  return s.slice(0, length - 3) + '...'
}

// `| markdownify | strip_html` (no truncation - used where the copy is written to fit)
export function markdownifyStrip(md: string): string {
  const html = marked.parse(md, { async: false })
  return html.replace(/<[^>]*>/g, '')
}

// `| markdownify | strip_html | truncate: N`
export function markdownifyStripTruncate(md: string, length: number): string {
  return truncate(markdownifyStrip(md), length)
}

// `{{ team.excerpt | truncate: N }}`: Jekyll's excerpt renders to the *HTML* of the
// first paragraph, and the template truncates that HTML string directly - the closing
// </p> gets cut off and browsers auto-close it. Replicated verbatim.
export function excerptHtmlTruncate(body: string, length: number): string {
  const html = marked.parse(firstParagraph(body), { async: false })
  return truncate(html, length)
}

// --- pages (root *.md) and collections (_events, _blogs, _team) ---

export interface Page {
  title?: string
  description?: string
  [key: string]: unknown
  body: string
}

export function loadPage(file: string): Page {
  const { data, content } = matter(readRepoFile(file))
  return { ...data, body: smartQuotes(content) }
}

export interface CollectionEntry extends Record<string, unknown> {
  slug: string
  body: string
}

export function loadCollection(dir: string, sortBy?: string): CollectionEntry[] {
  const full = path.join(repoRoot, dir)
  const entries: CollectionEntry[] = fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(readRepoFile(path.join(dir, f)))
      return { slug: f.replace(/\.md$/, ''), ...data, body: smartQuotes(content) }
    })
  if (sortBy) {
    entries.sort(
      (a, b) => Number(a[sortBy] ?? Infinity) - Number(b[sortBy] ?? Infinity),
    )
  }
  return entries
}
