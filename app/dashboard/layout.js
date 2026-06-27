'use client'

import { Providers } from '../providers'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function DashboardRootLayout({ children }) {
  return (
    <Providers>
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  )
}
