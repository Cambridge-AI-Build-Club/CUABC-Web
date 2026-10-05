// Port of _layouts/events.html rendering events.md + all event cards.
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Markdown } from '@/lib/markdown'
import {
  firstParagraph,
  loadCollection,
  loadPage,
  markdownifyStripTruncate,
  url,
} from '@/lib/content'

export default function EventsPage() {
  const page = loadPage('events.md')
  const events = loadCollection('_events', 'weight')
  const title = page.title ?? 'Events'
  return (
    <>
      <PageMeta title={title} description={page.description} />
      <Shell path="/events/">
        <div className="intro">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
                <Markdown>{page.body}</Markdown>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-6 pb-6">
          <div className="row">
            {events.map((event) => (
              <div className="col-12 col-md-6 mb-3" key={event.slug}>
                <div className="event event-summary">
                  <div className="event-content">
                    <h2 className="event-title">
                      <a href={url(`events/${event.slug}/`)}>{String(event.title)}</a>
                    </h2>
                    <p>{markdownifyStripTruncate(firstParagraph(event.body), 100)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </>
  )
}
