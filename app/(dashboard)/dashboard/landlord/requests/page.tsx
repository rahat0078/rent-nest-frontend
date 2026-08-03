

import { LandlordHeader } from '@/components/dashboard/landlord/landlord-header'
import { RentalRequestCard } from '@/components/dashboard/landlord/rental-request-card'

const REQUESTS = [
  {
    id: '1',
    tenantImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    tenantName: 'Sarah Johnson',
    propertyTitle: 'Luxury Apartment Downtown',
    moveInDate: 'Jan 15, 2025',
    message: 'Interested in renting this beautiful apartment. Very interested in moving ASAP.',
    status: 'PENDING' as const,
  },
  {
    id: '2',
    tenantImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    tenantName: 'Michael Chen',
    propertyTitle: 'Modern Studio',
    moveInDate: 'Jan 20, 2025',
    message: 'Perfect for my needs. Would like to schedule a viewing.',
    status: 'APPROVED' as const,
  },
  {
    id: '3',
    tenantImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    tenantName: 'Emily Rodriguez',
    propertyTitle: 'Spacious Family Home',
    moveInDate: 'Feb 1, 2025',
    message: 'Looking for a family home. This seems perfect for us!',
    status: 'ACTIVE' as const,
  },
  {
    id: '4',
    tenantImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    tenantName: 'James Wilson',
    propertyTitle: 'Cozy 1-Bedroom Apartment',
    moveInDate: 'Jan 25, 2025',
    message: 'Love the apartment. It meets all my requirements.',
    status: 'REJECTED' as const,
  },
  {
    id: '5',
    tenantImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    tenantName: 'Lisa Wong',
    propertyTitle: 'Elegant Duplex',
    moveInDate: 'Feb 10, 2025',
    message: 'Interested in this beautiful duplex. Can I schedule a tour?',
    status: 'PENDING' as const,
  },
  {
    id: '6',
    tenantImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    tenantName: 'David Martinez',
    propertyTitle: 'Office Space Downtown',
    moveInDate: 'Mar 1, 2025',
    message: 'Looking to expand our business. This location is ideal.',
    status: 'COMPLETED' as const,
  },
]

export default function RequestsPage() {
  return (
    <>
      <LandlordHeader
        title="Rental Requests"
        description="Review and manage incoming rental requests from tenants"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-medium">Total</p>
              <p className="text-2xl font-bold text-foreground">{REQUESTS.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {REQUESTS.filter((r) => r.status === 'PENDING').length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-medium">Approved</p>
              <p className="text-2xl font-bold text-blue-600">
                {REQUESTS.filter((r) => r.status === 'APPROVED').length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-medium">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {REQUESTS.filter((r) => r.status === 'ACTIVE').length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-medium">Completed</p>
              <p className="text-2xl font-bold text-gray-600">
                {REQUESTS.filter((r) => r.status === 'COMPLETED').length}
              </p>
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-3">
            {REQUESTS.map((request) => (
              <RentalRequestCard key={request.id} {...request} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
