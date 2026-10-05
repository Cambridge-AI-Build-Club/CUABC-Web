// Port of _layouts/calendar.html rendering calendar.md: the Tailwind Play CDN setup
// and static skeleton live here; the interactive parts are ported to <CalendarApp />.
import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { CalendarApp } from '@/components/CalendarApp'
import { loadPage } from '@/lib/content'

const tailwindConfig = `tailwind.config = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        claude: {
          orange: '#DA7756',
          'orange-light': '#E8A88C',
          'orange-dark': '#C45D3A',
          cream: '#FAF9F7',
          'cream-dark': '#F5F4EF',
          sand: '#E8E4DD',
          charcoal: '#1A1915',
          'charcoal-light': '#3D3929',
          tan: '#D4A574',
          coral: '#E07B5D',
          sage: '#7D8471',
          'sage-light': '#A8B099',
        }
      }
    }
  }
}`

const calendarStyles = `.calendar-container { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
.scrollbar-thin::-webkit-scrollbar { width: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: #F5F4EF; border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #D4A574; border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #DA7756; }`

export default function CalendarPage() {
  const page = loadPage('calendar.md')
  const title = page.title ?? 'Event Calendar'
  return (
    <>
      <PageMeta title={title} description={page.description} path="/calendar/" />
      <Shell path="/calendar/">
        {/* Tailwind CSS for calendar (Play CDN, as in the Jekyll layout) */}
        <script src="https://cdn.tailwindcss.com" />
        <script dangerouslySetInnerHTML={{ __html: tailwindConfig }} />
        <style dangerouslySetInnerHTML={{ __html: calendarStyles }} />
        <div className="calendar-container tw-bg-claude-cream tw-min-h-screen">
          <CalendarApp />
        </div>
      </Shell>
    </>
  )
}
