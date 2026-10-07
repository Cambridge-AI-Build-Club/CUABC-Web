import type { ReactNode } from 'react'
import { SiteDocument } from '@/components/SiteDocument'

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteDocument>{children}</SiteDocument>
}
