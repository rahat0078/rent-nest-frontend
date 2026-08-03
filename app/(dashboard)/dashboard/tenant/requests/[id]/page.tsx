'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Ruler } from 'lucide-react'
import { RentalDetailsSkeleton } from '@/components/dashboard/tenant/rental-details-skeleton'
import { LandlordCard } from '@/components/dashboard/tenant/landlord-card'
import { Amenities } from '@/components/dashboard/tenant/amenities'
import { RequestTimeline } from '@/components/dashboard/tenant/request-timeline'
import { PropertySummaryCard } from '@/components/dashboard/tenant/property-summary-card'

interface RentalRequest {
  id: string
  propertyTitle: string
  category: string
  location: string
  rent: number
  image: string
  bedrooms: number
  bathrooms: number
  size: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED'
  moveInDate: string
  submittedDate: string
  tenantMessage: string
  landlord: {
    name: string
    email: string
    phone: string
    avatar: string
    verified: boolean
  }
  description: string
  amenities: string[]
  availableFrom: string
}

const MOCK_REQUEST: RentalRequest = {
  id: '1',
  propertyTitle: 'Modern 3BHK Apartment in Downtown',
  category: 'Apartment',
  location: 'Downtown District, Metro City',
  rent: 1500,
  image:
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=600&fit=crop',
  bedrooms: 3,
  bathrooms: 2,
  size: 1200,
  status: 'APPROVED',
  moveInDate: 'August 15, 2024',
  submittedDate: 'July 25, 2024',
  tenantMessage:
    'I am very interested in this property. The location is perfect for my workplace, and I appreciate the modern amenities. I am a reliable tenant with a stable job and excellent rental history.',
  landlord: {
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1-555-0123',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    verified: true,
  },
  description:
    'Stunning modern apartment located in the heart of downtown. This 3-bedroom, 2-bathroom unit features floor-to-ceiling windows with city views, an open-concept living area, and a fully equipped kitchen with stainless steel appliances. The building offers state-of-the-art amenities including a fitness center, rooftop lounge, and 24/7 security. Perfect for young professionals or small families looking for convenient urban living.',
  amenities: ['WiFi', 'Generator', '24/7 Security', 'Parking', 'CCTV', 'Lift', 'Gym', 'Pool'],
  availableFrom: 'August 1, 2024',
}

const getStatusStep = (status: string): 'submitted' | 'approved' | 'payment' | 'active' | 'completed' => {
  switch (status) {
    case 'PENDING':
      return 'submitted'
    case 'APPROVED':
      return 'approved'
    case 'ACTIVE':
      return 'active'
    case 'COMPLETED':
      return 'completed'
    default:
      return 'submitted'
  }
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Apartment': 'bg-blue-500/10 text-blue-700 border-blue-200',
    'Studio': 'bg-purple-500/10 text-purple-700 border-purple-200',
    'Villa': 'bg-green-500/10 text-green-700 border-green-200',
    'Family House': 'bg-orange-500/10 text-orange-700 border-orange-200',
    'Duplex': 'bg-pink-500/10 text-pink-700 border-pink-200',
    'Office Space': 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
  }
  return colors[category] || colors['Apartment']
}

export default function RentalRequestDetailsPage({ params }: { params: { id: string } }) {
  const [isLoading] = useState(false)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <RentalDetailsSkeleton />
        </div>
      </main>
    )
  }

  const request = MOCK_REQUEST

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">
            ← Back to Requests
          </Button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{request.propertyTitle}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {request.location}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content (70%) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image */}
            <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
              unoptimized
                src={request.image}
                alt={request.propertyTitle}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={getCategoryColor(request.category)}>
                  {request.category}
                </Badge>
                <Badge className="bg-green-500/10 text-green-700 border-green-200">
                  Available
                </Badge>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Bed className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{request.bedrooms}</p>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Bath className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{request.bathrooms}</p>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Ruler className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{request.size}</p>
                <p className="text-sm text-muted-foreground">sq ft</p>
              </div>
            </div>

            {/* Request Details Card */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Request Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Request Status</p>
                  <Badge className="mt-2 bg-blue-500/10 text-blue-700 border-blue-200">
                    {request.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Move-in Date</p>
                  <p className="mt-2 font-semibold text-foreground">{request.moveInDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Request Submitted</p>
                  <p className="mt-2 font-semibold text-foreground">{request.submittedDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Your Message</p>
                <p className="text-foreground bg-muted/50 rounded-lg p-3">
                  {request.tenantMessage}
                </p>
              </div>
            </div>

            {/* Landlord Card */}
            <LandlordCard
              name={request.landlord.name}
              email={request.landlord.email}
              phone={request.landlord.phone}
              avatar={request.landlord.avatar}
              verified={request.landlord.verified}
            />

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Property Description</h2>
              <p className="text-foreground leading-relaxed">{request.description}</p>
            </div>

            {/* Amenities */}
            <Amenities amenities={request.amenities} />

            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Rental Process Timeline
              </h2>
              <RequestTimeline currentStep={getStatusStep(request.status)} />
            </div>
          </div>

          {/* Right Sidebar (30%) - Sticky Summary Card */}
          <div className="lg:col-span-1">
            <PropertySummaryCard
              monthlyRent={request.rent}
              status={request.status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED'}
              moveInDate={request.moveInDate}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
