import type { ReactNode } from 'react'
import { SiteFrame } from '@/components/SiteFrame'
import { loadSiteData } from '@/lib/site'
import { url } from '@/lib/content'

export function Shell({ path, children }: { path: string; children: ReactNode }) {
  return <SiteFrame data={loadSiteData()} path={url(path)}>{children}</SiteFrame>
}
