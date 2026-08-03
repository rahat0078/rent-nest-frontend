'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function RentalRequestSkeleton() {
  return (
    <div className="space-y-4">
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-4 space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-xl overflow-hidden">
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border-b last:border-b-0">
              <Skeleton className="h-16 w-16 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
