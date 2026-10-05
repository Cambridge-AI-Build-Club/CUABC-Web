// Port of _layouts/event.html for each entry in _events/.
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Markdown } from '@/lib/markdown'
import { loadCollection } from '@/lib/content'

export function generateStaticParams() {
  return loadCollection('_events').map((event) => ({ slug: event.slug }))
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = loadCollection('_events').find((e) => e.slug === slug)
  if (!entry) throw new Error(`Event not found: ${slug}`)
  const title = String(entry.title ?? slug)
  return (
    <>
      <PageMeta title={title} />
      <Shell path={`/events/${slug}/`}>
        <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
          <div className="row justify-content-start">
            <div className="col-12 col-md-8">
              <div className="event event-single">
                <h1 className="title">{title}</h1>
                <div className="content">
                  <Markdown>{entry.body}</Markdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </>
  )
}
