import type { ReactNode } from 'react'
import '../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for the calendar page (_layouts/calendar.html bodyClass).
export default function CalendarLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-calendar">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
