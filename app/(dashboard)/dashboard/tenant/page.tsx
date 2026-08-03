'use client'

import { FileText, CheckCircle2, Home, Trophy } from 'lucide-react'
import QuickActions from '@/components/dashboard/tenant/quick-actions'
import StatsCard from '@/components/dashboard/tenant/stat-card'
import RecentActivity from '@/components/dashboard/tenant/recent-activity'

export default function TenantDashboardPage() {
  const stats = [
    {
      icon: FileText,
      title: 'Total Requests',
      value: '12',
      description: 'Rental requests submitted',
      trend: { value: 8, positive: true },
    },
    {
      icon: CheckCircle2,
      title: 'Approved Requests',
      value: '8',
      description: 'Successfully approved',
      trend: { value: 5, positive: true },
    },
    {
      icon: Home,
      title: 'Active Rentals',
      value: '2',
      description: 'Currently active leases',
      trend: { value: 0, positive: true },
    },
    {
      icon: Trophy,
      title: 'Completed Rentals',
      value: '5',
      description: 'Successfully completed',
      trend: { value: 12, positive: true },
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Rental Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Active Leases</span>
                <span className="font-semibold text-primary">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Pending Approvals</span>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Upcoming Renewals</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">3</span>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">Next Renewal</h3>
            <p className="text-sm text-muted-foreground mb-4">Your Downtown Apartment lease renews in</p>
            <div className="text-3xl font-bold text-primary mb-1">45</div>
            <p className="text-xs text-muted-foreground">days</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  )
}
