'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Arrow, Icon } from '@/components/Icon'

interface SiteData {
  title: string
  copyright: string
  logo: { desktop: string; mobile: string }
  signup: string
  email: string
  navigation: { name: string; href: string }[]
  links: { home: string; about: string; contact: string; committees: string; calendar: string }
}

export function SiteFrame({ data, path, children }: { data: SiteData; path: string; children: ReactNode }) {
  const [surface, setSurface] = useState<'paper' | 'charcoal'>('paper')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    try { if (localStorage.getItem('cbc-surface') === 'charcoal') setSurface('charcoal') } catch { /* Storage may be unavailable. */ }
  }, [])

  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [menuOpen])

  function toggleSurface() {
    const next = surface === 'paper' ? 'charcoal' : 'paper'
    setSurface(next)
    try { localStorage.setItem('cbc-surface', next) } catch { /* The current page still switches themes. */ }
  }

  return (
    <div className="lab site" data-surface={surface}>
      <a className="lab-skip" href="#site-main">Skip to content</a>
      <header className="lab-header site-header">
        <a className="lab-brand" href={data.links.home} aria-label={`${data.title} home`}>
          <picture>
            <source media="(max-width: 760px)" srcSet={data.logo.mobile} />
            <img src={data.logo.desktop} alt="Cambridge AI Builder Club" width={600} height={600} />
          </picture>
        </a>
        <div className="site-header-actions">
          <button className="site-theme" onClick={toggleSurface} aria-pressed={surface === 'charcoal'} aria-label="Dark appearance">
            <Icon name={surface === 'charcoal' ? 'moon' : 'sun'} size={20} />
          </button>
          <button ref={menuButton} className="lab-menu-toggle" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <Icon name={menuOpen ? 'close' : 'menu'} size={20} /></button>
        </div>
        <nav id="site-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">
          {data.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} aria-current={path.startsWith(item.href) ? 'page' : undefined}>{item.name}</a>
          ))}
          <a className="lab-button lab-button-small" href={data.signup} target="_blank" rel="noopener noreferrer">Join the club <Arrow /></a>
        </nav>
      </header>
      <main id="site-main" tabIndex={-1}>{children}</main>
      <footer className="lab-footer site-footer">
        <div><strong>{data.copyright}</strong><p>Stay curious. Keep building.</p></div>
        <nav aria-label="Footer navigation">
          <a href={data.links.committees}>Join the committee</a><a href={data.links.calendar}>Calendar</a>
          <a href={data.links.about}>About</a><a href={data.links.contact}>Contact</a>
          <a href={`mailto:${data.email}`}>Email us <Arrow /></a>
        </nav>
      </footer>
    </div>
  )
}
