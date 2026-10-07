import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { ActivityGrid } from '@/components/ActivityGrid'
import { CalendarSection, JoinSection, PageIntro } from '@/components/SiteSections'
import { loadPage, markdownifyStrip } from '@/lib/content'
import { loadActivities } from '@/lib/site'

export default function EventsPage() {
  const page = loadPage('events.md')
  return <><PageMeta title="Explore | Cambridge AI Builder Club" description={page.description} path="/events/" /><Shell path="/events/">
    <PageIntro eyebrow="EXPLORE / THE CLUB" title={<>From “what if”<br />to <span className="accent">“look at this.”</span></>} description={markdownifyStrip(page.body).trim()} />
    <section className="lab-section" aria-labelledby="activities-heading"><div className="lab-section-head"><div><p className="lab-kicker">01 / LEARN. MAKE. SHARE.</p><h2 id="activities-heading">Find your starting point<span className="accent">.</span></h2></div></div><ActivityGrid activities={loadActivities()} filterable /></section>
    <CalendarSection /><JoinSection />
  </Shell></>
}
