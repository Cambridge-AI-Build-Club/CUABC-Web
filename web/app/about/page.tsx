// Port of _layouts/page.html rendering about.md.
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Markdown } from '@/lib/markdown'
import { loadPage } from '@/lib/content'

export default function AboutPage() {
  const page = loadPage('about.md')
  const title = page.title ?? 'About'
  return (
    <>
      <PageMeta title={title} description={page.description} />
      <Shell path="/about/">
        <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
          <div className="row justify-content-start">
            <div className="col-12 col-md-8">
              <div className="service service-single">
                <h1 className="title">{title}</h1>
                <div className="content">
                  <Markdown>{page.body}</Markdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </>
  )
}
