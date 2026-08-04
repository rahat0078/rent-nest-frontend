'use client'

import { FileText, CheckCircle2, Home, Trophy } from 'lucide-react'
import QuickActions from '@/components/dashboard/tenant/quick-actions'
import StatsCard from '@/components/dashboard/tenant/stat-card'

export default function TenantDashboardPage() {
  const stats = [
    {
      icon: FileText,
      title: 'Total Requests',
      value: '12',
      description: 'Rental requests submitted',
    },
    {
      icon: CheckCircle2,
      title: 'Approved Requests',
      value: '8',
      description: 'Successfully approved',
    },
    {
      icon: Home,
      title: 'Active Rentals',
      value: '2',
      description: 'Currently active leases',
    },
    {
      icon: Trophy,
      title: 'Completed Rentals',
      value: '5',
      description: 'Successfully completed',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  )
}
