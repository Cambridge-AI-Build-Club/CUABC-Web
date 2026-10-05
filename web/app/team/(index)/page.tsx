// Port of _layouts/teams.html rendering team.md + member cards.
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Markdown } from '@/lib/markdown'
import {
  excerptHtmlTruncate,
  loadCollection,
  loadPage,
  url,
  type CollectionEntry,
} from '@/lib/content'

// site.team | where: "promoted", true | sort: "weight"
function promotedMembers(members: CollectionEntry[]) {
  return members
    .filter((m) => m.promoted === true)
    .sort((a, b) => Number(a.weight) - Number(b.weight))
}

// site.team | where: "promoted", empty | sort: "weight" (field absent)
function regularMembers(members: CollectionEntry[]) {
  return members
    .filter((m) => m.promoted === undefined)
    .sort((a, b) => Number(a.weight) - Number(b.weight))
}

export default function TeamPage() {
  const page = loadPage('team.md')
  const members = loadCollection('_team')
  const title = page.title ?? 'Team'

  const promoted = promotedMembers(members)
  const regular = regularMembers(members)

  return (
    <>
      <PageMeta title={title} description={page.description} path="/team/" />
      <Shell path="/team/">
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
            {promoted.map((member) => (
              <div className="col-12 col-md-6 mb-2" key={member.slug}>
                <div className="team team-summary team-summary-large">
                  {member.image ? (
                    <div className="team-image">
                      <img
                        width="90"
                        height="90"
                        alt={String(member.title)}
                        className="img-fluid mb-2"
                        src={url(String(member.image))}
                      />
                    </div>
                  ) : null}
                  <div className="team-meta">
                    <h2 className="team-name">
                      <a href={url(`team/${member.slug}/`)}>{String(member.title)}</a>
                    </h2>
                    <p className="team-description">{String(member.jobtitle ?? '')}</p>
                    {member.linkedinurl ? (
                      <a target="_blank" href={String(member.linkedinurl)} rel="noreferrer">
                        LinkedIn
                      </a>
                    ) : null}
                  </div>
                  {/* Jekyll truncates the rendered excerpt HTML string itself */}
                  <div
                    className="team-content"
                    dangerouslySetInnerHTML={{ __html: excerptHtmlTruncate(String(member.body), 120) }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Kept even when empty - its pt-6 pb-6 padding affects page spacing */}
          <div className="row pt-6 pb-6">
            {regular.map((member) => (
              <div className="col-12 col-md-4 mb-3" key={member.slug}>
                <div className="team team-summary">
                  {member.image ? (
                    <div className="team-image">
                      <img
                        width="60"
                        height="60"
                        alt={String(member.title)}
                        className="img-fluid mb-2"
                        src={url(String(member.image))}
                      />
                    </div>
                  ) : null}
                  <div className="team-meta">
                    <h2 className="team-name">
                      <a href={url(`team/${member.slug}/`)}>{String(member.title)}</a>
                    </h2>
                    <p className="team-description">{String(member.jobtitle ?? '')}</p>
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
