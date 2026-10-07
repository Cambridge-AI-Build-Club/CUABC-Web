import fs from 'node:fs'
import path from 'node:path'

export interface CalendarEvent {
  id: string
  date: string
  time: string
  title: string
  location: string
  type: string
  status: 'archived' | 'cancelled'
}

export function loadCalendar(): CalendarEvent[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), '..', '_data/calendar.json'), 'utf8'))
}
