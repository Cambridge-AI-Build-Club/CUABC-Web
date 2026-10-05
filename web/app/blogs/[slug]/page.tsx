// Port of _layouts/blog.html for each entry in _blogs/.
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Markdown } from '@/lib/markdown'
import { loadCollection } from '@/lib/content'

export function generateStaticParams() {
  return loadCollection('_blogs').map((blog) => ({ slug: blog.slug }))
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = loadCollection('_blogs').find((b) => b.slug === slug)
  if (!entry) throw new Error(`Blog not found: ${slug}`)
  const title = String(entry.title ?? slug)
  return (
    <>
      <PageMeta title={title} path={`/blogs/${slug}/`} />
      <Shell path={`/blogs/${slug}/`}>
        <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
          <div className="row justify-content-start">
            <div className="col-12 col-md-8">
              <div className="blog blog-single">
                <h1 className="title">{title}</h1>
                <div className="content">
                  <Markdown>{entry.body}</Markdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </>
  )
}
