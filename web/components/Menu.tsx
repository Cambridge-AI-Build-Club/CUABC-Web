// _includes/main-menu.html and _includes/main-menu-mobile.html: the same list, two
// wrappers. Active state matches item.url against the Jekyll page.url (leading and
// trailing slashes included), which callers pass as `currentPath`.
import { loadMenus, url } from '@/lib/content'

function sortedByName(menus: { name: string; url: string; weight: number }[]) {
  return [...menus].sort((a, b) => a.weight - b.weight)
}

export function Menu({
  id,
  className,
  currentPath,
}: {
  id: string
  className: string
  currentPath: string
}) {
  const items = sortedByName(loadMenus().main)
  return (
    <div id={id} className={className}>
      <ul>
        {items.map((item) => (
          <li key={item.name} className={item.url === currentPath ? 'active' : ''}>
            <a href={url(item.url)}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
