// _includes/footer.html
import { loadConfig, loadMenus, url } from '@/lib/content'

export function Footer({ currentPath }: { currentPath: string }) {
  const config = loadConfig()
  const items = [...loadMenus().footer].sort((a, b) => a.weight - b.weight)
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-inner">
              <h2 className="footer-title">{config.title}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.name} className={item.url === currentPath ? 'active' : ''}>
                    <a href={url(item.url)}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
