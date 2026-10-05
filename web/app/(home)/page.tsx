// Port of _layouts/home.html rendering index.md.
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { SignupCard } from '@/components/SignupCard'
import { DiscordCard } from '@/components/DiscordCard'
import { Markdown } from '@/lib/markdown'
import {
  firstParagraph,
  loadConfig,
  loadCollection,
  loadFeatures,
  loadPage,
  markdownifyStrip,
  markdownifyStripTruncate,
  url,
  type CollectionEntry,
  type FeatureItem,
} from '@/lib/content'

// Card markup for the blogs strip of home.html.
function Card({ entry, kind }: { entry: CollectionEntry; kind: 'blog' }) {
  return (
    <div className="col-12 col-md-4 mb-1">
      <div className={`${kind} ${kind}-summary`}>
        <div className={`${kind}-content`}>
          <h2 className={`${kind}-title`}>
            <a href={url(`blogs/${entry.slug}/`)}>{String(entry.title)}</a>
          </h2>
          <p>{markdownifyStripTruncate(firstParagraph(entry.body), 100)}</p>
        </div>
      </div>
    </div>
  )
}

// "Demos" -> "demo", "Workshops" -> "workshop": pairs feature cards with their
// matching events when merging the two homepage sections.
function normalizeTitle(title: string) {
  return title.toLowerCase().replace(/s$/, '')
}

interface MergedEntry {
  feature?: FeatureItem
  event?: CollectionEntry
}

// One card per activity, merging the two former homepage sections: the feature card's
// logo plus the event's linked title and single merged description. Entries without a
// counterpart on the other side are still rendered.
function MergedCard({ feature, event }: MergedEntry) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-2">
      <div className="feature">
        {feature?.image && (
          <div className="feature-image">
            <img
              alt={`${feature.title} logo`}
              src={url(feature.image.url)}
              width={feature.image.width}
              height={feature.image.height}
            />
          </div>
        )}
        <h2 className="feature-title">
          {event ? (
            <a href={url(`events/${event.slug}/`)}>{String(event.title)}</a>
          ) : (
            String(feature?.title ?? '')
          )}
        </h2>
        {event && (
          <div className="feature-content">
            <p>{markdownifyStrip(firstParagraph(event.body))}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  const config = loadConfig()
  const page = loadPage('index.md')

  // {{ site.home.limit_services | default: 6 }}
  const limit = config.home?.limit_services || 6
  const events = loadCollection('_events', 'weight').slice(0, limit)
  const blogs = loadCollection('_blogs', 'weight').slice(0, limit)

  // Merge the feature cards (logo + description) with their events (linked title +
  // excerpt) by normalized title; events without a feature card are kept too.
  const features = loadFeatures()
  const eventByTitle = new Map(
    events.map((event) => [normalizeTitle(String(event.title)), event] as const),
  )
  const featureTitles = new Set(features.map((feature) => normalizeTitle(feature.title)))
  const merged: MergedEntry[] = [
    ...features.map((feature) => ({
      feature,
      event: eventByTitle.get(normalizeTitle(feature.title)),
    })),
    ...events
      .filter((event) => !featureTitles.has(normalizeTitle(String(event.title))))
      .map((event) => ({ event })),
  ]

  const title = page.title ?? config.title
  const description = page.description

  const introImage = page.intro_image ? String(page.intro_image) : undefined
  const introImageClass = [
    'intro-image',
    page.intro_image_absolute ? 'intro-image-absolute' : '',
    page.intro_image_hide_on_mobile ? 'intro-image-hide-mobile' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <PageMeta title={title} description={description} path="/" />
      <Shell path="/">
        <div className="intro">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
                <Markdown>{page.body}</Markdown>
                <SignupCard showButton />
                <DiscordCard showButton />
              </div>
              {introImage && (
                <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                  <img alt={title} className={introImageClass} src={url(introImage)} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="strip">
          <div className="container pt-6 pb-6 pb-md-10">
            <div className="topic">
              <h1>Our Events</h1>
            </div>
            <div className="row justify-content-start">
              {merged.map((entry, index) => (
                <MergedCard key={index} feature={entry.feature} event={entry.event} />
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <a className="button button-primary" href={url('events')}>
                  View All Events
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="strip">
          <div className="container pt-6 pb-6 pb-md-10">
            <div className="topic">
              <h1>Our Blogs</h1>
            </div>
            <div className="row justify-content-start">
              {blogs.map((blog) => (
                <Card key={blog.slug} entry={blog} kind="blog" />
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <a className="button button-primary" href={url('blogs')}>
                  View All Blogs
                </a>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </>
  )
}
