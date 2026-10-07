import type { ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { Shell } from '@/components/Shell'
import { PageMeta } from '@/components/PageMeta'
import { JoinSection, PageIntro } from '@/components/SiteSections'
import { Markdown } from '@/lib/markdown'
import { url } from '@/lib/content'

export function ArticlePage({ title, description, path, eyebrow, body, back, children }: {
  title: string; description?: string; path: string; eyebrow: string; body: string
  back?: { label: string; href: string }; children?: ReactNode
}) {
  return <>
    <PageMeta title={`${title} | Cambridge AI Builder Club`} description={description} path={path} />
    <Shell path={path}>
      <PageIntro eyebrow={eyebrow} title={<span className="site-article-title">{title}</span>} description={description} />
      <div className="site-article-wrap">
        {back && <a className="site-back" href={url(back.href)}><Icon name="arrow-left" hoverName="chevron-left" />{back.label}</a>}
        <article className="site-prose"><Markdown>{body}</Markdown>{children}</article>
      </div>
      <JoinSection />
    </Shell>
  </>
}
