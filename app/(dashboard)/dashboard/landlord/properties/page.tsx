'use client'

import { LandlordHeader } from '@/components/dashboard/landlord/landlord-header'
import { PropertyCard } from '@/components/dashboard/landlord/property-card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const PROPERTIES = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    title: 'Luxury Apartment Downtown',
    category: 'Apartment',
    location: 'Downtown, New York',
    rent: 3500,
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    available: true,
    createdDate: '2 days ago',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    title: 'Modern Studio',
    category: 'Studio',
    location: 'Upper East Side',
    rent: 1800,
    bedrooms: 0,
    bathrooms: 1,
    size: 600,
    available: true,
    createdDate: '5 days ago',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1560440021-33f237b74148?w=400&h=300&fit=crop',
    title: 'Spacious Family Home',
    category: 'Family House',
    location: 'Brooklyn Heights',
    rent: 4200,
    bedrooms: 4,
    bathrooms: 3,
    size: 2500,
    available: false,
    createdDate: '1 week ago',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a6f50f35f?w=400&h=300&fit=crop',
    title: 'Cozy 1-Bedroom Apartment',
    category: 'Apartment',
    location: 'Queens, New York',
    rent: 2200,
    bedrooms: 1,
    bathrooms: 1,
    size: 750,
    available: true,
    createdDate: '3 weeks ago',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
    title: 'Elegant Duplex',
    category: 'Duplex',
    location: 'Manhattan',
    rent: 5500,
    bedrooms: 3,
    bathrooms: 2,
    size: 1800,
    available: true,
    createdDate: '1 month ago',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1522859185100-19f1b9ae4ac0?w=400&h=300&fit=crop',
    title: 'Office Space Downtown',
    category: 'Office Space',
    location: 'Financial District',
    rent: 3000,
    bedrooms: 0,
    bathrooms: 2,
    size: 1500,
    available: true,
    createdDate: '2 months ago',
  },
]

export default function PropertiesPage() {
  return (
    <>
      <LandlordHeader
        title="My Properties"
        description="Manage and monitor all your rental properties"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header with Create Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Total Properties: {PROPERTIES.length}
              </h2>
              <p className="text-sm text-muted-foreground">
                {PROPERTIES.filter((p) => p.available).length} available for rent
              </p>
            </div>
            <Link href="/dashboard/landlord/properties/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Property
              </Button>
            </Link>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTIES.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
