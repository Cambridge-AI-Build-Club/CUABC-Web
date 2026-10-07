import type { ReactNode } from 'react'
import { loadHomeCopy, loadRecruitment, loadSiteData, loadVisibleMembers } from '@/lib/site'
import { url } from '@/lib/content'

export function Arrow() { return <span aria-hidden="true">↗</span> }

export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description?: string; children?: ReactNode }) {
  return <section className="lab-page-intro"><p className="lab-kicker">{eyebrow}</p><h1>{title}</h1>{description && <p className="lab-intro">{description}</p>}{children}</section>
}

export function Welcome() {
  const data = loadSiteData()
  const copy = loadHomeCopy()
  return <section className="lab-welcome" aria-labelledby="welcome-heading">
    <img className="lab-welcome-symbol" src={data.logo.mobile} alt="" width={80} height={80} loading="lazy" />
    <div><p className="lab-kicker">ALL SUBJECTS. ALL STARTING POINTS.</p><h2 id="welcome-heading">{copy.welcome_title}</h2><p>{copy.welcome_copy}</p></div>
    <a className="lab-text-link" href={data.links.about}>Meet the club <Arrow /></a>
  </section>
}

export function JoinSection() {
  const data = loadSiteData()
  const copy = loadHomeCopy()
  return <section className="lab-join" aria-labelledby="join-heading">
    <p className="lab-kicker">A LITTLE CURIOSITY GOES A LONG WAY.</p><h2 id="join-heading">{copy.join_title}</h2><p>{copy.join_copy}</p>
    <a className="lab-button" href={data.signup} target="_blank" rel="noopener noreferrer">Join the club <Arrow /></a>
    <a className="lab-text-link" href={data.discord} target="_blank" rel="noopener noreferrer">Or say hello on Discord <Arrow /></a>
    <span className="lab-join-art" aria-hidden="true" />
  </section>
}

export function Recruitment({ direct = false }: { direct?: boolean }) {
  const data = loadRecruitment()
  return <section className="lab-archive site-recruitment" aria-labelledby="recruitment-heading">
    <div><p className="lab-kicker">COMMITTEE APPLICATIONS / OPEN</p><h2 id="recruitment-heading">{data.title}</h2><p>{data.summary}</p>
      <div className="site-chips"><span>{data.seats} open seats</span>{data.tracks.map((track) => <span key={track}>{track}</span>)}</div>
    </div>
    <a className="lab-button" href={direct ? data.application : url('/committees/')} {...(direct ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{direct ? 'Apply to the committee' : 'Explore committee roles'}<Arrow /></a>
  </section>
}

export function MemberCards() {
  const members = loadVisibleMembers()
  return <div className="lab-members">{members.map((member) => <a className={`lab-member${member.promoted ? '' : ' site-member-small'}`} href={member.href} key={member.href}>
    {member.image && <img src={member.image} alt={member.name} width={440} height={440} loading="lazy" />}
    <div><h3>{member.name}<Arrow /></h3><p>{member.role}</p></div>
  </a>)}</div>
}

export function CalendarSection() {
  return <section className="lab-archive"><div><p className="lab-kicker">THE CLUB CALENDAR</p><h2>Make time to build together.</h2><p>Explore demos, workshops and community events in the club calendar.</p></div><a className="lab-button lab-button-outline" href={url('/calendar/')}>Open calendar <Arrow /></a></section>
}
