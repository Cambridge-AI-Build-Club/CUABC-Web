import {
  firstParagraph, loadCollection, loadConfig, loadContact, loadDiscord,
  loadFeatures, loadMenus, loadPage, loadSeo, loadSignup, markdownifyStrip, url,
} from '@/lib/content'

export function loadHomeCopy() {
  const page = loadPage('index.md')
  return {
    headline: page.headline as string[],
    eyebrow: String(page.eyebrow),
    intro: markdownifyStrip(page.body).trim(),
    welcome_title: String(page.welcome_title),
    welcome_copy: String(page.welcome_copy),
    join_title: String(page.join_title),
    join_copy: String(page.join_copy),
  }
}

export function loadSiteData() {
  const config = loadConfig()
  return {
    title: config.title,
    copyright: loadSeo().copyright_text ?? `© 2026 ${config.title}`,
    logo: { desktop: url(config.logo.desktop), mobile: url(config.logo.mobile) },
    signup: loadSignup().form,
    discord: loadDiscord().discord,
    email: loadContact().email ?? '',
    navigation: loadMenus().main
      .filter((item) => ['/about/', '/events/', '/projects/', '/calendar/', '/team/', '/blogs/'].includes(item.url))
      .sort((a, b) => a.weight - b.weight)
      .map((item) => ({ name: item.name, href: url(item.url) })),
    links: {
      home: url('/'), about: url('/about/'), contact: url('/contact/'),
      committees: url('/committees/'), calendar: url('/calendar/'),
    },
  }
}

export function loadActivities() {
  const features = loadFeatures()
  const normalize = (title: string) => title.toLowerCase().replace(/s$/, '')
  return loadCollection('_events', 'weight').map((entry) => {
    const feature = features.find((item) => normalize(item.title) === normalize(String(entry.title)))
    return {
      title: String(entry.title),
      description: markdownifyStrip(firstParagraph(entry.body)).trim(),
      href: url(`/events/${entry.slug}/`),
      image: feature?.image ? url(feature.image.url) : undefined,
    }
  })
}

export function loadVisibleMembers() {
  return loadCollection('_team', 'weight').filter((entry) => entry.promoted !== false).map((entry) => ({
    name: String(entry.title), role: String(entry.jobtitle ?? ''),
    image: entry.image ? url(String(entry.image)) : undefined,
    href: url(`/team/${entry.slug}/`), promoted: entry.promoted === true,
  }))
}

export function loadRecruitment() {
  const page = loadPage('committees.md')
  return {
    title: String(page.recruitment_title),
    summary: String(page.recruitment_summary),
    application: String(page.application_url),
    seats: Number(page.seats),
    tracks: page.tracks as string[],
  }
}

export function formatPublicationDate(value: unknown) {
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
