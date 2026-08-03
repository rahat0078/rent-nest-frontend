'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { RentalStatusBadge } from './rental-requst-badge'

interface RentalRequest {
  id: string
  propertyImage: string
  propertyTitle: string
  category: string
  location: string
  rentAmount: number
  landlordName: string
  landlordPhoto: string
  moveInDate: string
  requestDate: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED'
}

interface RentalRequestTableProps {
  requests: RentalRequest[]
}

export function RentalRequestTable({ requests }: RentalRequestTableProps) {
  const renderActions = (status: string) => {
    const baseButton = (
      <Button variant="outline" size="sm" className="rounded-lg">
        View Details
      </Button>
    )

    if (status === 'PENDING') {
      return (
        <div className="flex gap-2">
          {baseButton}
          <Button size="sm" disabled className="rounded-lg">
            Pay Now
          </Button>
        </div>
      )
    }

    if (status === 'APPROVED') {
      return (
        <div className="flex gap-2">
          {baseButton}
          <Button size="sm" className="rounded-lg">
            Pay Now
          </Button>
        </div>
      )
    }

    if (status === 'COMPLETED') {
      return (
        <div className="flex gap-2">
          {baseButton}
          <Button size="sm" className="rounded-lg">
            Leave Review
          </Button>
        </div>
      )
    }

    if (status === 'REJECTED') {
      return baseButton
    }

    return baseButton
  }

  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-semibold text-foreground">Property</th>
              <th className="text-left p-4 font-semibold text-foreground">Location</th>
              <th className="text-left p-4 font-semibold text-foreground">Monthly Rent</th>
              <th className="text-left p-4 font-semibold text-foreground">Landlord</th>
              <th className="text-left p-4 font-semibold text-foreground">Move-in Date</th>
              <th className="text-left p-4 font-semibold text-foreground">Status</th>
              <th className="text-left p-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id} className={`border-b last:border-b-0 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                      unoptimized
                        src={request.propertyImage}
                        alt={request.propertyTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{request.propertyTitle}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {request.category}
                      </Badge>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {request.location}
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-semibold text-foreground">${request.rentAmount.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Image
                    unoptimized
                      src={request.landlordPhoto}
                      alt={request.landlordName}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-foreground">{request.landlordName}</span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">
                    {new Date(request.moveInDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="p-4">
                  <RentalStatusBadge status={request.status} />
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {renderActions(request.status)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
