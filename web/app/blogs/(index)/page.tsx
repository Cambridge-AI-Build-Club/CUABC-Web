import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Arrow, JoinSection, PageIntro } from '@/components/SiteSections'
import { firstParagraph, loadCollection, loadPage, markdownifyStrip, url } from '@/lib/content'
import { formatPublicationDate } from '@/lib/site'

export default function BlogsPage() {
  const page = loadPage('blogs.md')
  const blogs = loadCollection('_blogs', 'weight')
  return <><PageMeta title="Journal | Cambridge AI Builder Club" description={page.description} path="/blogs/" /><Shell path="/blogs/">
    <PageIntro eyebrow="JOURNAL / NOTES FROM THE CLUB" title={<>Ideas worth<br /><span className="accent">sharing.</span></>} description={markdownifyStrip(page.body).trim()} />
    <section className="lab-section" aria-label="Club stories"><div className="site-journal-grid">{blogs.map((blog) => <a className="site-journal-card" href={url(`/blogs/${blog.slug}/`)} key={blog.slug}><p className="lab-kicker">{formatPublicationDate(blog.date)}</p><h2>{String(blog.title)} <Arrow /></h2><p>{markdownifyStrip(firstParagraph(blog.body))}</p><span className="lab-card-link">Read the story <Arrow /></span></a>)}</div></section><JoinSection />
  </Shell></>
}
