// Port of _layouts/blogs.html rendering blogs.md + all blog cards.
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Markdown } from '@/lib/markdown'
import {
  firstParagraph,
  loadCollection,
  loadPage,
  markdownifyStripTruncate,
  url,
} from '@/lib/content'

export default function BlogsPage() {
  const page = loadPage('blogs.md')
  const blogs = loadCollection('_blogs', 'weight')
  const title = page.title ?? 'Blogs'
  return (
    <>
      <PageMeta title={title} description={page.description} />
      <Shell path="/blogs/">
        <div className="intro">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
                <Markdown>{page.body}</Markdown>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-6 pb-6">
          <div className="row">
            {blogs.map((blog) => (
              <div className="col-12 col-md-6 mb-3" key={blog.slug}>
                <div className="blog blog-summary">
                  <div className="blog-content">
                    <h2 className="blog-title">
                      <a href={url(`blogs/${blog.slug}/`)}>{String(blog.title)}</a>
                    </h2>
                    <p>{markdownifyStripTruncate(firstParagraph(blog.body), 100)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </>
  )
}
