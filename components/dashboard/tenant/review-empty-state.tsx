import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ReviewsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-muted rounded-full p-4 mb-4">
        <MessageSquare className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">No Completed Rentals</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">
        You haven&apos;t completed any rentals yet. Complete a rental to share your experience with other tenants.
      </p>
      <Link href="/dashboard/tenant/requests">
        <Button>View Rental Requests</Button>
      </Link>
    </div>
  )
}
