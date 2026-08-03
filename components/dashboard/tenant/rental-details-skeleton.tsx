'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function RentalDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Property Image */}
        <Skeleton className="w-full h-96 rounded-xl" />

        {/* Property Info */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Request Details */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Landlord Card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-4">
            <Skeleton className="w-20 h-20 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex flex-wrap gap-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
