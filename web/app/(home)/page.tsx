import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { ActivityGrid } from '@/components/ActivityGrid'
import { Arrow, JoinSection, Recruitment, Welcome } from '@/components/SiteSections'
import { firstParagraph, loadCollection, loadPage, markdownifyStrip, url } from '@/lib/content'
import { formatPublicationDate, loadActivities, loadHomeCopy, loadSiteData } from '@/lib/site'

export default function HomePage() {
  const page = loadPage('index.md')
  const copy = loadHomeCopy()
  const site = loadSiteData()
  const blogs = loadCollection('_blogs', 'weight').slice(0, 3)
  return <>
    <PageMeta title={site.title} description={page.description} path="/" />
    <Shell path="/">
      <section className="lab-hero">
        <div className="lab-hero-copy">
          <p className="lab-kicker"><span className="lab-status-dot" />{copy.eyebrow}</p>
          <h1>{copy.headline[0]}<br /><span className="accent">{copy.headline[1]}</span></h1>
          <p className="lab-intro">{copy.intro}</p>
          <div className="lab-hero-actions"><a className="lab-button" href={site.signup} target="_blank" rel="noopener noreferrer">Join the club <Arrow /></a><a className="lab-text-link" href={url('/events/')}>See what we do <Arrow /></a></div>
          <p className="lab-hero-note">Curiosity is the only prerequisite.</p>
        </div>
        <div className="lab-hero-visual"><img src={url(String(page.intro_image))} alt="" width={1080} height={1080} fetchPriority="high" /><div className="lab-art-tag">CAMBRIDGE / BUILDERS AT WORK</div><span className="lab-art-index" aria-hidden="true">CAMBRIDGE, UK</span></div>
      </section>
      <div className="lab-manifesto" role="group" aria-label="Claude collaboration"><span>IN COLLABORATION WITH</span><a href="https://claude.com/" target="_blank" rel="noopener noreferrer"><img src={url('/images/brand/claude-official.svg')} alt="Claude" width={143} height={31} /></a><span>HUMAN CURIOSITY. REAL POSSIBILITIES.</span></div>
      <section className="lab-section" aria-labelledby="activities-heading"><div className="lab-section-head"><div><p className="lab-kicker">01 / LEARN. MAKE. SHARE.</p><h2 id="activities-heading">Find your starting point<span className="accent">.</span></h2></div><a className="lab-text-link" href={url('/events/')}>Explore the club <Arrow /></a></div><ActivityGrid activities={loadActivities()} /></section>
      <Welcome />
      <Recruitment />
      {blogs.length > 0 && <section className="lab-section site-journal-section" aria-labelledby="journal-heading"><div className="lab-section-head"><div><p className="lab-kicker">02 / NOTES FROM THE CLUB</p><h2 id="journal-heading">Ideas worth sharing<span className="accent">.</span></h2></div><a className="lab-text-link" href={url('/blogs/')}>Read the journal <Arrow /></a></div><div className="site-journal-grid">{blogs.map((blog) => <a className="site-journal-card" href={url(`/blogs/${blog.slug}/`)} key={blog.slug}><p className="lab-kicker">{formatPublicationDate(blog.date)}</p><h3>{String(blog.title)} <Arrow /></h3><p>{markdownifyStrip(firstParagraph(blog.body)).replace(/^Building the Future: /, '')}</p><span className="lab-card-link">Read the story <Arrow /></span></a>)}</div></section>}
      <JoinSection />
    </Shell>
  </>
}
