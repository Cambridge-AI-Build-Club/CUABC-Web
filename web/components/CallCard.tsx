// _includes/call.html. _data/contact.yml currently has no phone (the phone block
// renders conditionally). The template's mailto href contains a stray dot
// ({{ .site.data.contact.email }}) which Liquid resolves anyway - rendered here as a
// normal mailto link. The optional button href is rendered raw (no relative_url) in
// the template, matching Jekyll.
import { loadContact } from '@/lib/content'

export function CallCard({ showButton = false }: { showButton?: boolean }) {
  const contact = loadContact()
  return (
    <div className="call">
      <div className="call-box-top">
        {contact.phone ? (
          <div className="call-phone">
            <strong>Phone: </strong> {contact.phone}
          </div>
        ) : null}
        {contact.email ? (
          <div className="call-email">
            <strong>Email: </strong>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        ) : null}
      </div>
      {showButton && (
        <div className="call-box-bottom">
          <a href={contact.contact_button_link} className="button">
            Contact
          </a>
        </div>
      )}
    </div>
  )
}
