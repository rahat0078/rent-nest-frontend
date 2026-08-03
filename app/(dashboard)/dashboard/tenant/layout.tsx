'use client'

import TenantHeader from '@/components/dashboard/tenant/tenant-header'
import TenantSidebar from '@/components/dashboard/tenant/tenant-sidebar'
import { useState } from 'react'

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <TenantSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <TenantHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <main className="md:ml-64 mt-16 p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
