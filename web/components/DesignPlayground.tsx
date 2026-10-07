'use client'

import { useEffect, useRef, useState } from 'react'

export interface PlaygroundData {
  copy: {
    headline: string[]
    eyebrow: string
    intro: string
    welcome_title: string
    welcome_copy: string
    join_title: string
    join_copy: string
  }
  copyright: string
  signup: string
  discord: string
  email: string
  hero: string
  logo: { desktop: string; mobile: string }
  claudeLogo: string
  events: { title: string; description: string; href: string; image?: string }[]
  members: { name: string; role: string; image?: string; href: string }[]
  links: Record<'home' | 'journal' | 'calendar' | 'committees' | 'about' | 'contact', string>
}

type View = 'home' | 'explore' | 'community'
type Surface = 'paper' | 'charcoal'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export function DesignPlayground({ data }: { data: PlaygroundData }) {
  const [view, setView] = useState<View>('home')
  const [surface, setSurface] = useState<Surface>('paper')
  const [motion, setMotion] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const menuButton = useRef<HTMLButtonElement>(null)
  const controlsButton = useRef<HTMLButtonElement>(null)
  const mainHeading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const syncView = () => {
      const hash = window.location.hash.slice(1)
      setView(hash === 'explore' || hash === 'community' ? hash : 'home')
      setMenuOpen(false)
    }
    syncView()
    window.addEventListener('hashchange', syncView)
    window.addEventListener('popstate', syncView)
    return () => {
      window.removeEventListener('hashchange', syncView)
      window.removeEventListener('popstate', syncView)
    }
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (controlsOpen) {
        setControlsOpen(false)
        controlsButton.current?.focus()
      } else if (menuOpen) {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen, controlsOpen])

  function showView(next: View) {
    setView(next)
    setMenuOpen(false)
    window.history.pushState(null, '', `#${next}`)
    window.scrollTo({ top: 0, behavior: 'instant' })
    requestAnimationFrame(() => mainHeading.current?.focus({ preventScroll: true }))
  }

  const filteredEvents = data.events.filter((event) => filter === 'All' || event.title === filter)

  function Activities({ full = false }: { full?: boolean }) {
    return (
      <section className="lab-section" aria-labelledby="activities-heading">
        <div className="lab-section-head">
          <div>
            <p className="lab-kicker">01 / LEARN. MAKE. SHARE.</p>
            <h2 id="activities-heading">Find your starting point<span className="accent">.</span></h2>
          </div>
          {!full && <button className="lab-text-link" onClick={() => showView('explore')}>Explore the club <Arrow /></button>}
        </div>
        {full && (
          <div className="lab-filters" role="group" aria-label="Filter activities">
            {['All', ...data.events.map((event) => event.title)].map((title) => (
              <button key={title} aria-pressed={filter === title} onClick={() => setFilter(title)}>{title === 'All' ? 'All activities' : title}</button>
            ))}
          </div>
        )}
        <div className="lab-activities" aria-live="polite">
          {(full ? filteredEvents : data.events).map((event, index) => (
            <a className="lab-activity" href={event.href} key={event.title}>
              <div className="lab-activity-art" aria-hidden="true">
                {event.image && <img src={event.image} alt="" width={80} height={80} loading="lazy" />}
                <span>BUILD / {event.title.toUpperCase()}</span>
              </div>
              <div className="lab-activity-copy">
                <span className="lab-kicker">{String(index + 1).padStart(2, '0')} / {event.title === 'Workshop' ? 'GET HANDS-ON' : event.title === 'Demo' ? 'SHOW WHAT’S POSSIBLE' : 'BUILD TOGETHER'}</span>
                <h3>{event.title}<Arrow /></h3>
                <p>{event.description}</p>
                <span className="lab-card-link">Discover {event.title.toLowerCase()}s <Arrow /></span>
              </div>
            </a>
          ))}
          {filteredEvents.length === 0 && <p>No activities match this filter. Choose another category.</p>}
        </div>
      </section>
    )
  }

  function Welcome() {
    return (
      <section className="lab-welcome" aria-labelledby="welcome-heading">
        <img className="lab-welcome-symbol" src={data.logo.mobile} alt="" width={80} height={80} loading="lazy" />
        <div><p className="lab-kicker">ALL SUBJECTS. ALL STARTING POINTS.</p><h2 id="welcome-heading">{data.copy.welcome_title}</h2><p>{data.copy.welcome_copy}</p></div>
        <a className="lab-text-link" href={data.links.about}>Meet the club <Arrow /></a>
      </section>
    )
  }

  return (
    <div className="lab" data-surface={surface} data-motion={motion ? 'on' : 'off'}>
      <a className="lab-skip" href="#lab-main">Skip to content</a>
      <div className="lab-review-bar">
        <span><i aria-hidden="true" /> DESIGN PLAYGROUND <span className="lab-review-sub">/ CLAUDE EDITION</span></span>
        <button ref={controlsButton} aria-expanded={controlsOpen} aria-controls="lab-controls" onClick={() => setControlsOpen(!controlsOpen)}>Design controls <span aria-hidden="true">{controlsOpen ? '−' : '+'}</span></button>
      </div>

      <header className="lab-header">
        <a className="lab-brand" href="#home" onClick={(event) => { event.preventDefault(); showView('home') }} aria-label="Cambridge AI Builder Club concept home">
          <picture>
            <source media="(max-width: 760px)" srcSet={data.logo.mobile} />
            <img src={data.logo.desktop} alt="Cambridge AI Builder Club" width={600} height={600} />
          </picture>
        </a>
        <button className="lab-menu-toggle" ref={menuButton} aria-expanded={menuOpen} aria-controls="lab-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
        <nav id="lab-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Concept navigation">
          <button aria-current={view === 'explore' ? 'page' : undefined} onClick={() => showView('explore')}>Explore</button>
          <a href={data.links.calendar}>Calendar</a>
          <button aria-current={view === 'community' ? 'page' : undefined} onClick={() => showView('community')}>Community</button>
          <a href={data.links.journal}>Journal <span aria-hidden="true">↗</span></a>
          <a className="lab-button lab-button-small" href={data.signup} target="_blank" rel="noopener noreferrer">Join the club <Arrow /></a>
        </nav>
      </header>

      <main id="lab-main" tabIndex={-1}>
        {view === 'home' ? (
          <>
            <section className="lab-hero">
              <div className="lab-hero-copy">
                <p className="lab-kicker"><span className="lab-status-dot" />{data.copy.eyebrow}</p>
                <h1 ref={mainHeading} tabIndex={-1}>{data.copy.headline[0]}<br /><span className="accent">{data.copy.headline[1]}</span></h1>
                <p className="lab-intro">{data.copy.intro}</p>
                <div className="lab-hero-actions">
                  <a className="lab-button" href={data.signup} target="_blank" rel="noopener noreferrer">Find your people <Arrow /></a>
                  <button className="lab-text-link" onClick={() => showView('explore')}>See what we do <Arrow /></button>
                </div>
                <p className="lab-hero-note">Curiosity is the only prerequisite.</p>
              </div>
              <div className="lab-hero-visual">
                <img src={data.hero} alt="" width={1080} height={1080} fetchPriority="high" />
                <div className="lab-art-tag"><span>CAMBRIDGE / BUILDERS AT WORK<br /><small>CURIOUS MINDS. PRACTICAL IDEAS.</small></span></div>
                <span className="lab-art-index" aria-hidden="true">CAMBRIDGE, UK</span>
              </div>
            </section>
            <div className="lab-manifesto" role="group" aria-label="Claude collaboration"><span>IN COLLABORATION WITH</span><a href="https://claude.com/" target="_blank" rel="noopener noreferrer"><img src={data.claudeLogo} alt="Claude" width={143} height={31} /></a><span>HUMAN CURIOSITY. REAL POSSIBILITIES.</span></div>
            <Activities />
            <Welcome />
          </>
        ) : view === 'explore' ? (
          <>
            <section className="lab-page-intro">
              <p className="lab-kicker">EXPLORE / THE CLUB</p>
              <h1 ref={mainHeading} tabIndex={-1}>From “what if”<br />to <span className="accent">“look at this.”</span></h1>
              <p className="lab-intro">Discover the ways our community learns, experiments and shares. Pick a starting point that interests you.</p>
            </section>
            <Activities full />
            <section className="lab-archive"><div><p className="lab-kicker">THE CLUB CALENDAR</p><h2>Make time to build together.</h2><p>Explore demos, workshops and community events in the club calendar.</p></div><a className="lab-button lab-button-outline" href={data.links.calendar}>Open calendar <Arrow /></a></section>
          </>
        ) : (
          <>
            <section className="lab-page-intro">
              <p className="lab-kicker">COMMUNITY / BETTER TOGETHER</p>
              <h1 ref={mainHeading} tabIndex={-1}>Good ideas need<br /><span className="accent">good company.</span></h1>
              <p className="lab-intro">A student-led community for exploring AI’s creative and practical possibilities. Bring a question. Meet a collaborator.</p>
              <a className="lab-button" href={data.discord} target="_blank" rel="noopener noreferrer">Join our Discord <Arrow /></a>
            </section>
            <Welcome />
            <section className="lab-section" aria-labelledby="members-heading">
              <div className="lab-section-head"><div><p className="lab-kicker">THE PEOPLE / BEHIND THE CLUB</p><h2 id="members-heading">Meet the team leads<span className="accent">.</span></h2></div></div>
              <div className="lab-members">{data.members.map((member) => (
                <a className="lab-member" key={member.name} href={member.href}>
                  {member.image && <img src={member.image} alt={member.name} width={440} height={440} loading="lazy" />}
                  <div><h3>{member.name}<Arrow /></h3><p>{member.role}</p></div>
                </a>
              ))}</div>
            </section>
            <section className="lab-archive"><div><p className="lab-kicker">COMMITTEE APPLICATIONS / OPEN</p><h2>Build the community, too.</h2><p>We’re recruiting for our outreach and technical committees. Explore the roles and help shape the year ahead.</p></div><a className="lab-button lab-button-outline" href={data.links.committees}>Explore committee roles <Arrow /></a></section>
          </>
        )}

        <section className="lab-join" aria-labelledby="join-heading">
          <p className="lab-kicker">A LITTLE CURIOSITY GOES A LONG WAY.</p>
          <h2 id="join-heading">{data.copy.join_title}</h2>
          <p>{data.copy.join_copy}</p>
          <a className="lab-button" href={data.signup} target="_blank" rel="noopener noreferrer">Join the club <Arrow /></a>
          <a className="lab-text-link" href={data.discord} target="_blank" rel="noopener noreferrer">Or say hello on Discord <Arrow /></a>
          <span className="lab-join-art" aria-hidden="true" />
        </section>
      </main>

      <footer className="lab-footer">
        <div><strong>{data.copyright}</strong><p>Stay curious. Keep building.</p></div>
        <div><a href={data.links.about}>About</a><a href={data.links.contact}>Contact</a><a href={`mailto:${data.email}`}>Email us <Arrow /></a></div>
      </footer>

      {controlsOpen && (
        <aside id="lab-controls" className="lab-controls" aria-label="Design review controls">
          <div className="lab-controls-heading"><span className="lab-kicker">LOCAL REVIEW / CLAUDE EDITION</span><button aria-label="Close design controls" onClick={() => { setControlsOpen(false); controlsButton.current?.focus() }}>×</button></div>
          <h2>One brand. Two moods.</h2>
          <p>Official Claude colors, with a choice of warm or dark surfaces.</p>
          <fieldset><legend>Page surface</legend><div className="lab-view-options">{(['paper', 'charcoal'] as const).map((mode) => <button key={mode} aria-pressed={surface === mode} onClick={() => setSurface(mode)}>{mode === 'paper' ? 'Warm paper' : 'Charcoal'}</button>)}</div></fieldset>
          <div className="lab-brand-colors" role="group" aria-label="Official brand palette"><span><i />Orange</span><span><i />Warm white</span><span><i />Charcoal</span></div>
          <fieldset><legend>Preview a page</legend><div className="lab-view-options">{(['home', 'explore', 'community'] as const).map((page) => <button key={page} aria-pressed={view === page} onClick={() => { showView(page); setControlsOpen(false) }}>{page}</button>)}</div></fieldset>
          <button className="lab-motion" aria-pressed={motion} onClick={() => setMotion(!motion)}>Ambient motion<span>{motion ? 'On' : 'Off'}</span></button>
          <p className="lab-controls-note">Existing club logos and illustration are reused. Activity icons have been redesigned for the approved direction. The Claude wordmark comes from claude.com. Journal and detail links open the migrated site; Join opens the real form. Local design review only.</p>
          <a className="lab-text-link" href={data.links.home}>Open migrated homepage <Arrow /></a>
        </aside>
      )}
    </div>
  )
}
