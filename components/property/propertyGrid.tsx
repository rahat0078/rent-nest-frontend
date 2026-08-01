'use client'

import { PropertyCard } from "./propertyCard"


interface Property {
  id: string
  title: string
  location: string
  rentAmount: number
  bedrooms: number
  bathrooms: number
  sizeSqFt: number
  images: string[]
  isAvailable: boolean
  category: string
  landlord: {
    name: string
    profilePhoto: string
  }
}

interface PropertyGridProps {
  properties: Property[]
  onViewDetails?: (id: string) => void
}

export function PropertyGrid({ properties, onViewDetails }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          title={property.title}
          location={property.location}
          rentAmount={property.rentAmount}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          sizeSqFt={property.sizeSqFt}
          image={property.images[0]}
          isAvailable={property.isAvailable}
          category={property.category}
          landlord={property.landlord}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}
