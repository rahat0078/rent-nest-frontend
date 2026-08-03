'use client'

import { RentalRequestCard } from "@/components/dashboard/tenant/rental-request-card"
import { RentalRequestEmptyState } from "@/components/dashboard/tenant/rental-request-empy-state"
import { RentalRequestSkeleton } from "@/components/dashboard/tenant/rental-request-skeleton"
import { RentalRequestTable } from "@/components/dashboard/tenant/rental-request-table"


// Mock data - replace with real API data
const RENTAL_REQUESTS = [
  {
    id: '1',
    propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    propertyTitle: 'Modern Downtown Apartment with City Views',
    category: 'Apartment',
    location: 'Downtown, New York',
    rentAmount: 2500,
    landlordName: 'John Smith',
    landlordPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
    moveInDate: '2024-09-01',
    requestDate: '2024-08-15',
    status: 'APPROVED' as const,
  },
  {
    id: '2',
    propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=500&h=400&fit=crop',
    propertyTitle: 'Cozy Studio in Vibrant Neighborhood',
    category: 'Studio',
    location: 'Brooklyn, New York',
    rentAmount: 1800,
    landlordName: 'Sarah Johnson',
    landlordPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
    moveInDate: '2024-10-15',
    requestDate: '2024-08-10',
    status: 'PENDING' as const,
  },
  {
    id: '3',
    propertyImage: 'https://images.unsplash.com/photo-1512917774080-9b274b5ce486?w=500&h=400&fit=crop',
    propertyTitle: 'Spacious Family House with Garden',
    category: 'Family House',
    location: 'Queens, New York',
    rentAmount: 3200,
    landlordName: 'Michael Brown',
    landlordPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
    moveInDate: '2024-08-20',
    requestDate: '2024-08-01',
    status: 'ACTIVE' as const,
  },
  {
    id: '4',
    propertyImage: 'https://images.unsplash.com/photo-1542228373-7c70c7d0f2c4?w=500&h=400&fit=crop',
    propertyTitle: 'Luxury Duplex with Modern Amenities',
    category: 'Duplex',
    location: 'Manhattan, New York',
    rentAmount: 4500,
    landlordName: 'Emily Davis',
    landlordPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
    moveInDate: '2024-07-15',
    requestDate: '2024-07-01',
    status: 'COMPLETED' as const,
  },
  {
    id: '5',
    propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    propertyTitle: 'Premium Office Space with Parking',
    category: 'Office Space',
    location: 'Financial District, New York',
    rentAmount: 5000,
    landlordName: 'Robert Wilson',
    landlordPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
    moveInDate: '2024-09-10',
    requestDate: '2024-08-18',
    status: 'REJECTED' as const,
  },
]

export default function RentalRequestsPage() {
  const isLoading = false
  const hasRequests = RENTAL_REQUESTS.length > 0

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Rental Requests</h1>
        <p className="text-muted-foreground mt-2">Track all your rental requests and their current status.</p>
      </div>

      {/* Content */}
      {isLoading ? (
        <RentalRequestSkeleton />
      ) : !hasRequests ? (
        <RentalRequestEmptyState />
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {RENTAL_REQUESTS.map((request) => (
              <RentalRequestCard key={request.id} {...request} />
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <RentalRequestTable requests={RENTAL_REQUESTS} />
          </div>
        </>
      )}
    </div>
  )
}
