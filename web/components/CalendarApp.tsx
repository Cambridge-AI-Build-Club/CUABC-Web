'use client'

import { useState } from 'react'
import type { CalendarEvent } from '@/lib/calendar'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dateLabel(date: string, short = false) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', short
    ? { day: 'numeric', month: 'short', timeZone: 'UTC' }
    : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function CalendarApp({ events }: { events: CalendarEvent[] }) {
  const months = [...new Set(events.map((event) => event.date.slice(0, 7)))].sort()
  const initialMonth = Math.max(0, months.indexOf('2026-02'))
  const [monthIndex, setMonthIndex] = useState(initialMonth)
  const [selectedId, setSelectedId] = useState(events.find((event) => event.date.startsWith(months[initialMonth]))?.id)
  const monthKey = months[monthIndex]
  const [year, month] = monthKey.split('-').map(Number)
  const monthName = new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
  const monthEvents = events.filter((event) => event.date.startsWith(monthKey))
  const selected = events.find((event) => event.id === selectedId)
  const firstDay = new Date(Date.UTC(year, month - 1, 1)).getUTCDay()
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate()

  function changeMonth(next: number) {
    setMonthIndex(next)
    setSelectedId(events.find((event) => event.date.startsWith(months[next]))?.id)
  }

  return <>
    <div className="site-calendar-meta"><p className="lab-kicker">{events.length} SESSIONS / {monthEvents.length} THIS MONTH</p><span className="site-status">Club calendar</span></div>
    <div className="site-calendar-layout">
      <div className="site-calendar">
        <div className="site-month-controls">
          <button aria-label="Previous month" disabled={monthIndex === 0} onClick={() => changeMonth(monthIndex - 1)}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
          <h2 aria-live="polite">{monthName}</h2>
          <button aria-label="Next month" disabled={monthIndex === months.length - 1} onClick={() => changeMonth(monthIndex + 1)}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
        </div>
        <div className="site-calendar-dates" role="region" aria-label="Calendar dates" tabIndex={0}>
          <div className="site-weekdays" aria-hidden="true">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="site-calendar-grid" role="group" aria-label={monthName}>
            {Array.from({ length: firstDay }, (_, index) => <div className="site-calendar-blank" key={`blank-${index}`} />)}
            {Array.from({ length: days }, (_, index) => {
              const day = index + 1
              const date = `${monthKey}-${String(day).padStart(2, '0')}`
              const dayEvents = monthEvents.filter((event) => event.date === date)
              return <div className="site-calendar-day" key={date}>
                {dayEvents.length ? <button aria-label={`${dateLabel(date)} — ${dayEvents.map((event) => `${event.title}${event.status === 'cancelled' ? ', cancelled' : ''}`).join(', ')}`} aria-pressed={dayEvents.some((event) => event.id === selectedId)} onClick={() => setSelectedId(dayEvents[0].id)}><span>{day}</span>{dayEvents.map((event) => <small key={event.id}>{event.title}{event.status === 'cancelled' && <span className="site-calendar-cancelled">Cancelled</span>}</small>)}</button> : <span className="site-day-number">{day}</span>}
              </div>
            })}
          </div>
        </div>
        <p className="site-calendar-hint"><span className="site-calendar-scroll-hint">Scroll across the calendar to see every day. </span>Select a session to see its details.</p>
      </div>
      <aside className="site-event-detail" aria-label="Selected session" aria-live="polite">
        {selected && <><p className="lab-kicker">{selected.type.toUpperCase()} / SESSION</p><h3>{selected.title}</h3><span className="site-status">{selected.status === 'cancelled' ? 'Cancelled' : 'Session'}</span><dl><dt>Date</dt><dd><time dateTime={selected.date}>{dateLabel(selected.date)}</time></dd><dt>Time</dt><dd>{selected.time}</dd><dt>Location</dt><dd>{selected.location}</dd></dl></>}
      </aside>
    </div>
    <div className="site-month-list"><h2>Sessions in {monthName}</h2><ul>{monthEvents.map((event) => <li key={event.id}><button aria-pressed={selectedId === event.id} onClick={() => setSelectedId(event.id)}><time dateTime={event.date}>{dateLabel(event.date, true)}</time><span><strong>{event.title}</strong><small>{event.time} · {event.location}</small></span><span className="site-status">{event.status === 'cancelled' ? 'Cancelled' : event.type}</span></button></li>)}</ul></div>
  </>
}
