import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'
import { DesignPlayground, type PlaygroundData } from '@/components/DesignPlayground'
import {
  firstParagraph,
  loadCollection,
  loadContact,
  loadDiscord,
  loadSignup,
  markdownifyStrip,
  url,
} from '@/lib/content'

export default function PlaygroundPage() {
  const copy: PlaygroundData['copy'] = parse(
    fs.readFileSync(path.join(process.cwd(), '..', '_data/design-playground.yml'), 'utf8'),
  )
  const data: PlaygroundData = {
    copy,
    signup: loadSignup().form,
    discord: loadDiscord().discord,
    email: loadContact().email ?? '',
    hero: url('/images/design/builder-engine.jpg'),
    events: loadCollection('_events', 'weight').map((entry) => ({
      title: String(entry.title),
      description: markdownifyStrip(firstParagraph(entry.body)).trim(),
      href: url(`/events/${entry.slug}/`),
    })),
    members: loadCollection('_team', 'weight')
      .filter((entry) => entry.promoted !== false)
      .map((entry) => ({
        name: String(entry.title),
        role: String(entry.jobtitle ?? ''),
        image: entry.image ? url(String(entry.image)) : undefined,
        href: url(`/team/${entry.slug}/`),
      })),
    links: {
      home: url('/'),
      journal: url('/blogs/'),
      calendar: url('/calendar/'),
      committees: url('/committees/'),
      about: url('/about/'),
      contact: url('/contact/'),
    },
  }
  return <DesignPlayground data={data} />
}
