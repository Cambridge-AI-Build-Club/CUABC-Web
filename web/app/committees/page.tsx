import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Arrow, JoinSection, PageIntro } from '@/components/SiteSections'
import { Markdown } from '@/lib/markdown'
import { loadPage } from '@/lib/content'
import { loadRecruitment } from '@/lib/site'

export default function CommitteesPage() {
  const page = loadPage('committees.md')
  const recruitment = loadRecruitment()
  return <><PageMeta title="Join the committee | Cambridge AI Builder Club" description={page.description} path="/committees/" /><Shell path="/committees/">
    <PageIntro eyebrow="COMMITTEE APPLICATIONS / 2026–27 / OPEN" title={<>Build the<br /><span className="accent">community, too.</span></>} description={recruitment.summary}><div className="site-chips"><span>{recruitment.seats} open seats</span>{recruitment.tracks.map((track) => <a key={track} href={`#${track.toLowerCase()}-track`}>{track} track ↓</a>)}</div><a className="lab-button" href={recruitment.application} target="_blank" rel="noopener noreferrer">Apply to the committee <Arrow /></a></PageIntro>
    <div className="site-article-wrap site-recruitment-body"><article className="site-prose"><Markdown>{page.body}</Markdown></article><aside className="site-application-note"><p className="lab-kicker">YOUR NEXT STEP</p><h2>Bring your ideas.</h2><p>Cambridge account · Short CV · Up to two roles</p><a className="lab-button" href={recruitment.application} target="_blank" rel="noopener noreferrer">Apply now <Arrow /></a><p>Rolling applications. Full requirements are listed on this page.</p></aside></div><JoinSection />
  </Shell></>
}
