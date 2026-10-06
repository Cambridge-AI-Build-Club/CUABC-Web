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
  signup: string
  discord: string
  email: string
  hero: string
  events: { title: string; description: string; href: string }[]
  members: { name: string; role: string; image?: string; href: string }[]
  links: Record<'home' | 'journal' | 'calendar' | 'committees' | 'about' | 'contact', string>
}

type View = 'home' | 'explore' | 'community'
type Accent = 'acid' | 'ice' | 'ember'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function ActivityArt({ title }: { title: string }) {
  return (
    <div className={`lab-activity-art art-${title.toLowerCase()}`} aria-hidden="true">
      <svg viewBox="0 0 300 170" fill="none">
        <defs>
          <pattern id={`grid-${title}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" stroke="currentColor" strokeOpacity=".09" />
          </pattern>
        </defs>
        <rect width="300" height="170" fill={`url(#grid-${title})`} />
        {title === 'Workshop' ? (
          <g stroke="currentColor" strokeWidth="1.5">
            <rect x="66" y="32" width="168" height="108" rx="5" />
            <path d="M66 55H234M94 80L110 95L94 110M125 110H155" />
            <circle cx="80" cy="44" r="2" /><circle cx="88" cy="44" r="2" />
            <path d="M194 78V111M179 94H210" />
          </g>
        ) : title === 'Demo' ? (
          <g stroke="currentColor" strokeWidth="1.5">
            <circle cx="150" cy="85" r="51" /><ellipse cx="150" cy="85" rx="25" ry="51" />
            <ellipse cx="150" cy="85" rx="51" ry="19" />
            <path d="M99 85H201M150 34V136M65 48L235 123" />
            <circle cx="215" cy="114" r="6" fill="currentColor" />
          </g>
        ) : (
          <g stroke="currentColor" strokeWidth="1.5">
            <path d="M150 25L210 60V112L150 147L90 112V60L150 25ZM90 60L150 95L210 60M150 95V147M150 25V75M112 125L173 90L173 38" />
            <path d="M150 56L183 75L150 114L117 95L150 56Z" fill="currentColor" fillOpacity=".14" />
          </g>
        )}
      </svg>
      <span>BUILD / {title.toUpperCase()}</span>
    </div>
  )
}

export function DesignPlayground({ data }: { data: PlaygroundData }) {
  const [view, setView] = useState<View>('home')
  const [accent, setAccent] = useState<Accent>('acid')
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
              <ActivityArt title={event.title} />
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
        <div className="lab-welcome-symbol" aria-hidden="true">✳</div>
        <div><p className="lab-kicker">ALL SUBJECTS. ALL STARTING POINTS.</p><h2 id="welcome-heading">{data.copy.welcome_title}</h2><p>{data.copy.welcome_copy}</p></div>
        <a className="lab-text-link" href={data.links.about}>Meet the club <Arrow /></a>
      </section>
    )
  }

  return (
    <div className="lab" data-accent={accent} data-motion={motion ? 'on' : 'off'}>
      <a className="lab-skip" href="#lab-main">Skip to content</a>
      <div className="lab-review-bar">
        <span><i aria-hidden="true" /> DESIGN PLAYGROUND <span className="lab-review-sub">/ CONCEPT 01</span></span>
        <button ref={controlsButton} aria-expanded={controlsOpen} aria-controls="lab-controls" onClick={() => setControlsOpen(!controlsOpen)}>Design controls <span aria-hidden="true">{controlsOpen ? '−' : '+'}</span></button>
      </div>

      <header className="lab-header">
        <a className="lab-brand" href="#home" onClick={(event) => { event.preventDefault(); showView('home') }} aria-label="Cambridge AI Builders Club concept home">
          <span className="lab-brand-mark" aria-hidden="true">↗</span>
          <span>CAMBRIDGE<span>AI BUILDERS CLUB</span></span>
        </a>
        <button className="lab-menu-toggle" ref={menuButton} aria-expanded={menuOpen} aria-controls="lab-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
        <nav id="lab-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Concept navigation">
          <button aria-current={view === 'explore' ? 'page' : undefined} onClick={() => showView('explore')}>Explore</button>
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
                <img src={data.hero} alt="" width={1536} height={1024} fetchPriority="high" />
                <div className="lab-art-tag"><span className="lab-crosshair" aria-hidden="true">+</span><span>THE BUILDER ENGINE<br /><small>AI-GENERATED / CONCEPT ART</small></span></div>
                <span className="lab-art-index" aria-hidden="true">FIG. 001</span>
              </div>
            </section>
            <div className="lab-manifesto" role="group" aria-label="Club values"><span>HUMAN CURIOSITY</span><i aria-hidden="true">✳</i><span>ARTIFICIAL INTELLIGENCE</span><i aria-hidden="true">✳</i><span>REAL POSSIBILITIES</span><i aria-hidden="true">✳</i><span>CAMBRIDGE, UK</span></div>
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
            <section className="lab-archive"><div><p className="lab-kicker">THE EVENT ARCHIVE</p><h2>A look back at what we’ve done.</h2><p>The current calendar covers January–March 2026. Explore the past programme while the next schedule takes shape.</p></div><a className="lab-button lab-button-outline" href={data.links.calendar}>Open calendar archive <Arrow /></a></section>
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
              <div className="lab-section-head"><div><p className="lab-kicker">THE PEOPLE / BEHIND THE CLUB</p><h2 id="members-heading">Meet the builders<span className="accent">.</span></h2></div></div>
              <div className="lab-members">{data.members.map((member) => (
                <a className="lab-member" key={member.name} href={member.href}>
                  {member.image && <img src={member.image} alt={member.name} width={440} height={440} loading="lazy" />}
                  <div><h3>{member.name}<Arrow /></h3><p>{member.role}</p></div>
                </a>
              ))}</div>
            </section>
            <section className="lab-archive"><div><p className="lab-kicker">HELP SHAPE THE CLUB</p><h2>Build the community, too.</h2><p>Explore the outreach and technical committee tracks, responsibilities, and application details.</p></div><a className="lab-button lab-button-outline" href={data.links.committees}>Explore committee roles <Arrow /></a></section>
          </>
        )}

        <section className="lab-join" aria-labelledby="join-heading">
          <p className="lab-kicker">A LITTLE CURIOSITY GOES A LONG WAY.</p>
          <h2 id="join-heading">{data.copy.join_title}</h2>
          <p>{data.copy.join_copy}</p>
          <a className="lab-button" href={data.signup} target="_blank" rel="noopener noreferrer">Join the club <Arrow /></a>
          <a className="lab-text-link" href={data.discord} target="_blank" rel="noopener noreferrer">Or say hello on Discord <Arrow /></a>
          <span className="lab-join-art" aria-hidden="true">✳</span>
        </section>
      </main>

      <footer className="lab-footer">
        <div><strong>CAMBRIDGE AI BUILDERS CLUB</strong><p>Stay curious. Keep building.</p></div>
        <div><a href={data.links.about}>About</a><a href={data.links.contact}>Contact</a><a href={`mailto:${data.email}`}>Email us <Arrow /></a></div>
        <span>CAMBRIDGE, UK / DESIGN CONCEPT 01</span>
      </footer>

      {controlsOpen && (
        <aside id="lab-controls" className="lab-controls" aria-label="Design review controls">
          <div className="lab-controls-heading"><span className="lab-kicker">CONCEPT 01 / BUILDER LAB</span><button aria-label="Close design controls" onClick={() => { setControlsOpen(false); controlsButton.current?.focus() }}>×</button></div>
          <h2>Make it your own.</h2>
          <p>Try the accents and explore the page templates.</p>
          <fieldset><legend>Accent palette</legend><div className="lab-swatches">{(['acid', 'ice', 'ember'] as const).map((color) => <button key={color} className={`swatch-${color}`} aria-pressed={accent === color} onClick={() => setAccent(color)}><i aria-hidden="true" />{color === 'acid' ? 'Acid' : color === 'ice' ? 'Ice' : 'Ember'}</button>)}</div></fieldset>
          <fieldset><legend>Preview a page</legend><div className="lab-view-options">{(['home', 'explore', 'community'] as const).map((page) => <button key={page} aria-pressed={view === page} onClick={() => { showView(page); setControlsOpen(false) }}>{page}</button>)}</div></fieldset>
          <button className="lab-motion" aria-pressed={motion} onClick={() => setMotion(!motion)}>Ambient motion<span>{motion ? 'On' : 'Off'}</span></button>
          <p className="lab-controls-note">Concept artwork is tinted with the palette. Journal, activity details and other outbound pages open the current site. Join opens the real signup form. This is a design review, with no new event schedule.</p>
          <a className="lab-text-link" href={data.links.home}>Compare current homepage <Arrow /></a>
        </aside>
      )}
    </div>
  )
}
