import type { ReactNode } from 'react'
import '../../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for single event pages (_layouts/event.html bodyClass). The
// page-event class drives the grey lead-paragraph styling in _sass/pages/_page-event.scss.
export default function EventDetailLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-event">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
