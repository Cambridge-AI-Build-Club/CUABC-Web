// Port of _layouts/team.html for each entry in _team/. Slugs keep their underscores
// (e.g. /team/aditya_kalra/).
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Markdown } from '@/lib/markdown'
import { loadCollection } from '@/lib/content'

export function generateStaticParams() {
  return loadCollection('_team').map((member) => ({ slug: member.slug }))
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = loadCollection('_team').find((m) => m.slug === slug)
  if (!entry) throw new Error(`Team member not found: ${slug}`)
  const title = String(entry.title ?? slug)
  return (
    <>
      <PageMeta title={title} />
      <Shell path={`/team/${slug}/`}>
        <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
          <div className="row justify-content-start">
            <div className="col-12 col-md-8">
              <div className="team team-single">
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
