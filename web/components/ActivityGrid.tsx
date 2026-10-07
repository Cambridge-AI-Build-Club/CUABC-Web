'use client'

import { useState } from 'react'

interface Activity { title: string; description: string; href: string; image?: string }

export function ActivityGrid({ activities, filterable = false }: { activities: Activity[]; filterable?: boolean }) {
  const [filter, setFilter] = useState('All')
  const visible = activities.filter((item) => filter === 'All' || item.title === filter)
  return (
    <>
      {filterable && <div className="lab-filters" role="group" aria-label="Filter activities">
        {['All', ...activities.map((item) => item.title)].map((title) => <button key={title} aria-pressed={filter === title} onClick={() => setFilter(title)}>{title === 'All' ? 'All activities' : title}</button>)}
      </div>}
      <div className="lab-activities" aria-live={filterable ? 'polite' : undefined}>
        {visible.map((item) => <a className="lab-activity" key={item.href} href={item.href}>
          <div className="lab-activity-art" aria-hidden="true">
            {item.image && <img src={item.image} alt="" width={240} height={160} loading="lazy" />}
            <span>BUILD / {item.title.toUpperCase()}</span>
          </div>
          <div className="lab-activity-copy">
            <span className="lab-kicker">{String(activities.indexOf(item) + 1).padStart(2, '0')} / {item.title === 'Workshop' ? 'GET HANDS-ON' : item.title === 'Demo' ? 'SHOW WHAT’S POSSIBLE' : 'BUILD TOGETHER'}</span>
            <h3>{item.title}<span aria-hidden="true">↗</span></h3><p>{item.description}</p>
            <span className="lab-card-link">Discover {item.title.toLowerCase()}s <span aria-hidden="true">↗</span></span>
          </div>
        </a>)}
        {!visible.length && <p>No activities match this filter. Choose another category.</p>}
      </div>
    </>
  )
}
