import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Arrow, JoinSection, MemberCards, PageIntro, Recruitment, Welcome } from '@/components/SiteSections'
import { loadPage, markdownifyStrip } from '@/lib/content'
import { loadSiteData } from '@/lib/site'

export default function TeamPage() {
  const page = loadPage('team.md')
  return <><PageMeta title="Community | Cambridge AI Builder Club" description={page.description} path="/team/" /><Shell path="/team/">
    <PageIntro eyebrow="COMMUNITY / BETTER TOGETHER" title={<>Good ideas need<br /><span className="accent">good company.</span></>} description={markdownifyStrip(page.body).trim()}><a className="lab-button" href={loadSiteData().discord} target="_blank" rel="noopener noreferrer">Join our Discord <Arrow /></a></PageIntro>
    <Welcome /><section className="lab-section" aria-labelledby="members-heading"><div className="lab-section-head"><div><p className="lab-kicker">THE PEOPLE / BEHIND THE CLUB</p><h2 id="members-heading">Meet the team leads<span className="accent">.</span></h2></div></div><MemberCards /></section>
    <Recruitment /><JoinSection />
  </Shell></>
}
