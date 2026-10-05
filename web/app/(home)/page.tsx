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
  loadPage,
  markdownifyStripTruncate,
  url,
  type CollectionEntry,
} from '@/lib/content'

// Card markup shared by the events and blogs strips of home.html.
function Card({ entry, kind }: { entry: CollectionEntry; kind: 'event' | 'blog' }) {
  return (
    <div className="col-12 col-md-4 mb-1">
      <div className={`${kind} ${kind}-summary`}>
        <div className={`${kind}-content`}>
          <h2 className={`${kind}-title`}>
            <a href={url(`${kind}s/${entry.slug}/`)}>{String(entry.title)}</a>
          </h2>
          <p>{markdownifyStripTruncate(firstParagraph(entry.body), 100)}</p>
        </div>
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
              {events.map((event) => (
                <Card key={event.slug} entry={event} kind="event" />
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
