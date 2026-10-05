// _includes/header.html
import { basePath, loadConfig, url } from '@/lib/content'
import { Menu } from '@/components/Menu'
import { Hamburger } from '@/components/Hamburger'

export function Header({ currentPath }: { currentPath: string }) {
  const config = loadConfig()
  // Jekyll renders the logo link as the raw site.baseurl value.
  const logoHref = basePath || '/'
  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <a href={logoHref}>
            <img
              width={config.logo.desktop_width}
              height={config.logo.desktop_height}
              alt={config.title}
              src={url(config.logo.desktop)}
            />
          </a>
        </div>
        <div className="logo-mobile">
          <a href={logoHref}>
            <img
              width={config.logo.mobile_width}
              height={config.logo.mobile_height}
              alt={config.title}
              src={url(config.logo.mobile)}
            />
          </a>
        </div>
        <Menu id="main-menu" className="main-menu" currentPath={currentPath} />
        <Hamburger />
      </div>
    </div>
  )
}
