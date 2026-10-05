// _includes/social.html + _includes/sub-footer.html. The copyright text comes from
// _data/seo.yml and contains a raw HTML link, hence dangerouslySetInnerHTML.
import { loadSeo, loadSocial, url } from '@/lib/content'

export function SubFooter() {
  const social = loadSocial()
  const copyright = loadSeo().copyright_text
  return (
    <div className="sub-footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sub-footer-inner">
              {social.length > 0 && (
                <div className="social">
                  {social.map((item) => (
                    <a key={item.name} href={item.link} target="blank">
                      <img src={url(item.image)} title={item.name} alt={item.name} />
                    </a>
                  ))}
                </div>
              )}
              {copyright ? (
                <div className="copyright" dangerouslySetInnerHTML={{ __html: copyright }} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
