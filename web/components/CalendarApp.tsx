'use client'

// Port of the inline JavaScript in _layouts/calendar.html (renderCalendar /
// renderEventList / selectEvent). Event data, colors and defaults are verbatim,
// including the "Cancelded" typo. The static HTML renders the post-initialisation
// state (February 2026, first event selected, event count 14) - on the Jekyll site
// this state is produced by the script right after load, so the visible result is
// identical.
import { useState } from 'react'

const events = [
  { date: '2026-01-31', time: '12:00-16:00', title: 'Tabling Session', location: 'Library, Engineering Department', type: 'tabling' },
  { date: '2026-02-01', time: '14:00-15:00', title: 'Kick-off Event', location: 'Teams Meeting', type: 'kickoff' },
  { date: '2026-02-04', time: '13:00-14:00', title: 'Mini Demo Session', location: 'Judge Business School', type: 'demo' },
  { date: '2026-02-06', time: '12:00-13:00', title: 'Tabling Session', location: 'WestHub', type: 'tabling' },
  { date: '2026-02-13', time: '12:00-13:00', title: 'Tabling Session', location: 'Sidgwick Site', type: 'tabling' },
  { date: '2026-02-14', time: '15:00-16:00', title: 'Claude Code & Skills Workshop', location: 'LR4, Engineering Department', type: 'workshop' },
  { date: '2026-02-19', time: '13:00-14:00', title: 'Mini Demo Session (Cancelded)', location: 'N/A', type: 'demo' },
  { date: '2026-02-21', time: '14:00-15:00', title: 'Building with MCP Workshop', location: 'LR4, Engineering Department', type: 'workshop' },
  { date: '2026-02-26', time: '13:00-14:00', title: 'Mini Demo Session', location: 'West Cambridge (near WestHub)', type: 'demo' },
  { date: '2026-02-28', time: '14:00-15:00', title: 'Building with Agents Workshop', location: 'LR4, Engineering Department', type: 'workshop' },
  { date: '2026-03-07', time: '10:00-18:00', title: 'AI Hackathon', location: 'Constance Tipper, Engineering Department', type: 'hackathon' },
  { date: '2026-03-14', time: '14:00-15:00', title: 'Build your first MCP apps', location: 'LR4, Engineering Department', type: 'workshop' },
  { date: '2026-03-18', time: '13:00-14:00', title: 'Mini Demo Session', location: "King's Parade", type: 'demo' },
  { date: '2026-03-26', time: '13:30-14:30', title: 'MCP Masterclass for AI Agents', location: "Christ's College", type: 'demo' },
]

const typeColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  tabling: { bg: '#FDF2ED', border: '#DA7756', text: '#9A4F35', dot: '#DA7756' },
  kickoff: { bg: '#FDE8E4', border: '#E07B5D', text: '#A34B35', dot: '#E07B5D' },
  demo: { bg: '#F9F3EC', border: '#D4A574', text: '#8B6B4A', dot: '#D4A574' },
  workshop: { bg: '#F0F2ED', border: '#7D8471', text: '#525947', dot: '#7D8471' },
  hackathon: { bg: '#EDECEA', border: '#1A1915', text: '#1A1915', dot: '#1A1915' },
}

const months = [
  { name: 'January 2026', year: 2026, month: 0 },
  { name: 'February 2026', year: 2026, month: 1 },
  { name: 'March 2026', year: 2026, month: 2 },
]

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatShortDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function getEventsForDate(year: number, month: number, day: number) {
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return events.filter((e) => e.date === dateStr)
}

export function CalendarApp() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1)
  const [selected, setSelected] = useState(events[0])

  const { year, month, name } = months[currentMonthIndex]
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const blanks = Array.from({ length: firstDay }, (_, i) => i)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <>
      <div className="tw-p-4 md:tw-p-6">
        <div className="tw-max-w-6xl tw-mx-auto">
          {/* Header */}
          <div className="tw-text-center tw-mb-8">
        <div className="tw-flex tw-items-center tw-justify-center tw-gap-3 tw-mb-3">
          {/* Claude Logo Mark */}
          <img
            src="https://cdn.brandfetch.io/idW5s392j1/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1738315809101"
            alt="Claude Logo"
            style={{ height: '32px', width: 'auto' }}
          />
          <div>
            <h1 className="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-claude-charcoal tw-m-0">Builder Club Events</h1>
          </div>
        </div>
        <p className="tw-text-claude-charcoal-light tw-m-0">Cambridge - January - March 2026</p>
      </div>

      {/* Legend */}
      <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-p-4 tw-mb-6 tw-border tw-border-claude-sand">
        <div className="tw-flex tw-flex-wrap tw-gap-3 md:tw-gap-5 tw-justify-center">
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-claude-orange" />
            <span className="tw-text-sm tw-text-claude-charcoal">Tabling Session</span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-claude-coral" />
            <span className="tw-text-sm tw-text-claude-charcoal">Kick-off Event</span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-claude-tan" />
            <span className="tw-text-sm tw-text-claude-charcoal">Mini Demo</span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-claude-sage" />
            <span className="tw-text-sm tw-text-claude-charcoal">Workshop</span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-claude-charcoal" />
            <span className="tw-text-sm tw-text-claude-charcoal">Hackathon</span>
          </div>
        </div>
      </div>

      <div className="tw-grid lg:tw-grid-cols-3 tw-gap-6">
        {/* Calendar */}
        <div className="lg:tw-col-span-2 tw-bg-white tw-rounded-2xl tw-shadow-sm tw-overflow-hidden tw-border tw-border-claude-sand">
          <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border-b tw-border-claude-sand tw-bg-claude-cream-dark">
            <button
              id="prevMonth"
              className="tw-p-2 tw-rounded-xl hover:tw-bg-claude-sand disabled:tw-opacity-30 disabled:tw-cursor-not-allowed tw-transition-colors tw-text-claude-charcoal tw-border-0 tw-bg-transparent tw-cursor-pointer"
              disabled={currentMonthIndex === 0}
              onClick={() => {
                if (currentMonthIndex > 0) setCurrentMonthIndex(currentMonthIndex - 1)
              }}
            >
              <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 id="monthTitle" className="tw-text-lg tw-font-semibold tw-text-claude-charcoal tw-m-0">
              {name}
            </h2>
            <button
              id="nextMonth"
              className="tw-p-2 tw-rounded-xl hover:tw-bg-claude-sand disabled:tw-opacity-30 disabled:tw-cursor-not-allowed tw-transition-colors tw-text-claude-charcoal tw-border-0 tw-bg-transparent tw-cursor-pointer"
              disabled={currentMonthIndex === months.length - 1}
              onClick={() => {
                if (currentMonthIndex < months.length - 1) setCurrentMonthIndex(currentMonthIndex + 1)
              }}
            >
              <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="tw-p-2 md:tw-p-4">
            <div className="tw-grid tw-grid-cols-7 tw-border-b tw-border-claude-sand">
              {weekdays.map((day) => (
                <div key={day} className="tw-text-center tw-text-xs tw-font-semibold tw-text-claude-charcoal-light tw-py-2">
                  {day}
                </div>
              ))}
            </div>
            <div id="calendarGrid" className="tw-grid tw-grid-cols-7">
              {blanks.map((i) => (
                <div key={`blank-${i}`} className="tw-p-1 tw-min-h-[70px] md:tw-min-h-[80px]" />
              ))}
              {days.map((day) => {
                const dayEvents = getEventsForDate(year, month, day)
                const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()
                return (
                  <div
                    key={day}
                    className={`tw-p-1 tw-min-h-[70px] md:tw-min-h-[80px] tw-border tw-border-[#E8E4DD] ${isToday ? 'tw-bg-[#FDF2ED]' : 'tw-bg-white'} hover:tw-bg-[#F5F4EF] tw-transition-colors tw-rounded-lg tw-m-0.5`}
                  >
                    <div className={`tw-text-sm tw-font-medium tw-mb-1 ${isToday ? 'tw-text-[#DA7756]' : 'tw-text-[#1A1915]'}`}>{day}</div>
                    <div className="tw-space-y-1">
                      {dayEvents.map((event, index) => (
                        <button
                          key={index}
                          onClick={() => setSelected(event)}
                          className="tw-w-full tw-text-left tw-px-1.5 tw-py-0.5 tw-rounded-md tw-text-xs tw-truncate hover:tw-opacity-80 tw-transition-opacity tw-font-medium tw-border-0 tw-cursor-pointer"
                          style={{ backgroundColor: typeColors[event.type].bg, color: typeColors[event.type].text }}
                        >
                          {event.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="tw-space-y-6">
          {/* Selected Event */}
          <div
            id="selectedEvent"
            className="tw-rounded-2xl tw-shadow-sm tw-overflow-hidden"
            style={{ borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: typeColors[selected.type].border }}
          >
            <div id="selectedEventHeader" className="tw-p-4" style={{ backgroundColor: typeColors[selected.type].bg }}>
              <h3 id="selectedEventTitle" className="tw-font-semibold tw-m-0" style={{ color: typeColors[selected.type].text }}>
                {selected.title}
              </h3>
            </div>
            <div className="tw-bg-white tw-p-4 tw-space-y-3 tw-border tw-border-claude-sand tw-border-l-0 tw-rounded-r-2xl">
              <div className="tw-flex tw-items-center tw-gap-2 tw-text-claude-charcoal-light">
                <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke-width="2" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke-width="2" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke-width="2" />
                </svg>
                <span id="selectedEventDate" className="tw-text-sm">{formatDate(selected.date)}</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2 tw-text-claude-charcoal-light">
                <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke-width="2" />
                  <polyline points="12,6 12,12 16,14" stroke-width="2" />
                </svg>
                <span id="selectedEventTime" className="tw-text-sm">{selected.time}</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2 tw-text-claude-charcoal-light">
                <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span id="selectedEventLocation" className="tw-text-sm">{selected.location}</span>
              </div>
            </div>
          </div>

          {/* All Events List */}
          <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-overflow-hidden tw-border tw-border-claude-sand">
            <div className="tw-p-4 tw-border-b tw-border-claude-sand tw-bg-claude-cream-dark">
              <h3 className="tw-font-semibold tw-text-claude-charcoal tw-m-0">
                All Events (<span id="eventCount">{events.length}</span>)
              </h3>
            </div>
            <div id="eventList" className="tw-divide-y tw-divide-claude-sand tw-max-h-96 tw-overflow-y-auto scrollbar-thin">
              {events.map((event, index) => (
                <button
                  key={index}
                  onClick={() => setSelected(event)}
                  className="tw-w-full tw-text-left tw-p-3 hover:tw-bg-[#F5F4EF] tw-transition-colors tw-border-0 tw-bg-transparent tw-cursor-pointer"
                >
                  <div className="tw-flex tw-items-start tw-gap-3">
                    <div className="tw-w-2 tw-h-2 tw-rounded-full tw-mt-2" style={{ backgroundColor: typeColors[event.type].dot }} />
                    <div className="tw-flex-1 tw-min-w-0">
                      <p className="tw-font-medium tw-text-[#1A1915] tw-text-sm tw-truncate tw-m-0">{event.title}</p>
                      <p className="tw-text-xs tw-text-[#3D3929] tw-m-0">{formatShortDate(event.date)} - {event.time}</p>
                      <p className="tw-text-xs tw-text-[#7D8471] tw-truncate tw-m-0">{event.location}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Claude Builder Club Badge */}
          <div className="tw-bg-claude-charcoal tw-rounded-2xl tw-p-5 tw-text-white tw-shadow-sm">
            <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3">
              <img
                src="https://cdn.brandfetch.io/idW5s392j1/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1738315809319"
                alt="Claude Logo"
                style={{ height: '24px', width: 'auto' }}
              />
              <span className="tw-font-semibold tw-text-lg">Builder Club</span>
            </div>
            <p className="tw-text-sm tw-m-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Bringing AI to Cambridge University
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="tw-mt-8 tw-text-center tw-text-sm tw-text-claude-charcoal-light">
        <p className="tw-m-0">
          Powered by Claude from <span className="tw-font-medium">Anthropic</span>
        </p>
      </div>
        </div>
      </div>
    </>
  )
}
