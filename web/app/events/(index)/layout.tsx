import type { ReactNode } from 'react'
import '../../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for the events listing (_layouts/events.html bodyClass).
export default function EventsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-events">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
