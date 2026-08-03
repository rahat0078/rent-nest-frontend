import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6">
            <Skeleton className="w-12 h-12 rounded-lg mb-4" />
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-16 h-8 mb-2" />
            <Skeleton className="w-32 h-3" />
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <Skeleton className="w-32 h-6 mb-6" />
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="w-48 h-4 mb-2" />
                  <Skeleton className="w-32 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <Skeleton className="w-full h-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <Skeleton className="w-32 h-6 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 h-40">
              <Skeleton className="w-12 h-12 rounded-lg mb-4" />
              <Skeleton className="w-24 h-4 mb-2" />
              <Skeleton className="w-32 h-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
