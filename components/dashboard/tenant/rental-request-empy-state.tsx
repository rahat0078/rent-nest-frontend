'use client'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function RentalRequestEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 p-4 bg-muted rounded-full">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">No rental requests found</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        You haven&apos;t submitted any rental requests yet. Start exploring properties and submit your first request.
      </p>
      <Button size="lg" className="rounded-lg">
        Browse Properties
      </Button>
    </div>
  )
}
