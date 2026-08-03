'use client'

import { ReviewCard } from "@/components/dashboard/tenant/review-card"
import { ReviewsEmptyState } from "@/components/dashboard/tenant/review-empty-state"


// Mock data for completed rentals
const COMPLETED_RENTALS = [
  {
    id: 'rental-1',
    propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
    propertyTitle: 'Modern 2BR Apartment',
    propertyLocation: 'Downtown District',
    completedDate: '2024-06-15',
  },
  {
    id: 'rental-2',
    propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop',
    propertyTitle: 'Cozy Studio Near Park',
    propertyLocation: 'Green Valley',
    completedDate: '2024-05-20',
  },
  {
    id: 'rental-3',
    propertyImage: 'https://images.unsplash.com/photo-1545859303-30eb578e8a3a?w=500&h=300&fit=crop',
    propertyTitle: 'Luxury 3BR Villa',
    propertyLocation: 'Westside Heights',
    completedDate: '2024-04-10',
  },
]

export default function ReviewsPage() {
  const hasCompletedRentals = COMPLETED_RENTALS.length > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Share Your Reviews</h1>
        <p className="text-muted-foreground mt-2">
          Help other tenants by sharing your experience with properties you&apos;ve rented
        </p>
      </div>

      {/* Content */}
      {hasCompletedRentals ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPLETED_RENTALS.map((rental) => (
            <ReviewCard
              key={rental.id}
              id={rental.id}
              propertyImage={rental.propertyImage}
              propertyTitle={rental.propertyTitle}
              propertyLocation={rental.propertyLocation}
              completedDate={rental.completedDate}
            />
          ))}
        </div>
      ) : (
        <ReviewsEmptyState />
      )}
    </div>
  )
}
