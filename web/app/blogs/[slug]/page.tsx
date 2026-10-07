import { ArticlePage } from '@/components/ArticlePage'
import { loadCollection } from '@/lib/content'
import { formatPublicationDate } from '@/lib/site'

export function generateStaticParams() { return loadCollection('_blogs').map((entry) => ({ slug: entry.slug })) }

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = loadCollection('_blogs').find((item) => item.slug === slug)
  if (!entry) throw new Error(`Story not found: ${slug}`)
  const heading = entry.body.match(/^\s*# ([^\n]+)\n/)
  const title = heading ? heading[1].trim() : String(entry.title)
  const body = heading ? entry.body.slice(heading[0].length) : entry.body
  return <ArticlePage title={title} path={`/blogs/${slug}/`} eyebrow={`JOURNAL / ${formatPublicationDate(entry.date)}`} body={body} back={{ label: 'All stories', href: '/blogs/' }} />
}
