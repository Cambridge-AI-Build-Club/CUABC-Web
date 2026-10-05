// Body structure of _layouts/default.html:
//   {% include main-menu-mobile.html %}
//   <div id="wrapper"> header + page content </div>
//   footer, sub-footer
// Pages pass the Jekyll page.url equivalent (e.g. "/" or "/about/") for the menu
// active states.
import type { ReactNode } from 'react'
import { Menu } from '@/components/Menu'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SubFooter } from '@/components/SubFooter'

export function Shell({ path, children }: { path: string; children: ReactNode }) {
  return (
    <>
      <Menu id="main-menu-mobile" className="main-menu-mobile" currentPath={path} />
      <div id="wrapper" className="wrapper">
        <Header currentPath={path} />
        {children}
      </div>
      <Footer currentPath={path} />
      <SubFooter />
    </>
  )
}
