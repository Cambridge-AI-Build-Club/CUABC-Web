import type { MetadataRoute } from 'next'
import { absoluteUrl, loadCollection } from '@/lib/content'

export const dynamic = 'force-static'

const staticPages = ['/', '/about/', '/contact/', '/events/', '/blogs/', '/team/', '/committees/', '/calendar/']

export default function sitemap(): MetadataRoute.Sitemap {
  const collectionPages = [
    ...loadCollection('_events').map((e) => `/events/${e.slug}/`),
    ...loadCollection('_blogs').map((b) => `/blogs/${b.slug}/`),
    ...loadCollection('_team').map((m) => `/team/${m.slug}/`),
  ]
  return [...staticPages, ...collectionPages].map((path) => ({
    url: absoluteUrl(path),
  }))
}
