import { ArticlePage } from '@/components/ArticlePage'
import { loadContact, loadPage, url } from '@/lib/content'
import { Arrow } from '@/components/SiteSections'

export default function ContactPage() {
  const page = loadPage('contact.md')
  return <ArticlePage title="Let's start a conversation." path="/contact/" eyebrow="CONTACT / SAY HELLO" body={page.body}><div className="site-contact-actions"><a className="lab-button" href={`mailto:${loadContact().email}`}>Email the club <Arrow /></a><a className="lab-text-link" href={url('/committees/')}>Committee applications <Arrow /></a></div></ArticlePage>
}
