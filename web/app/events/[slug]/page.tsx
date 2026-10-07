import { ArticlePage } from '@/components/ArticlePage'
import { Arrow } from '@/components/SiteSections'
import { loadCollection, url } from '@/lib/content'
import { loadActivities } from '@/lib/site'

export function generateStaticParams() { return loadCollection('_events').map((entry) => ({ slug: entry.slug })) }

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = loadCollection('_events').find((item) => item.slug === slug)
  if (!entry) throw new Error(`Activity not found: ${slug}`)
  const title = String(entry.title)
  const activity = loadActivities().find((item) => item.title === title)
  return <ArticlePage title={title} path={`/events/${slug}/`} eyebrow="EXPLORE / ACTIVITY FORMAT" body={entry.body} back={{ label: 'All activities', href: '/events/' }}>
    {activity?.image && <div className="site-detail-art"><img src={activity.image} width={240} height={160} alt="" /></div>}
    <div className="site-note"><h2>Find your next session.</h2><p>Explore the club calendar and join the club to hear about new sessions.</p><a className="lab-text-link" href={url('/calendar/')}>View the calendar <Arrow /></a></div>
  </ArticlePage>
}
