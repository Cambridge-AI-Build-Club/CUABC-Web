// Port of _layouts/contact.html rendering contact.md (call card + content).
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { CallCard } from '@/components/CallCard'
import { Markdown } from '@/lib/markdown'
import { loadPage } from '@/lib/content'

export default function ContactPage() {
  const page = loadPage('contact.md')
  const title = page.title ?? 'Contact'
  return (
    <>
      <PageMeta title={title} description={page.description} path="/contact/" />
      <Shell path="/contact/">
        <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
          <div className="row justify-content-start">
            <div className="col-12 col-md-8">
              <div className="service service-single">
                <h1 className="title">{title}</h1>
                <CallCard />
                <div className="content mt-4">
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
