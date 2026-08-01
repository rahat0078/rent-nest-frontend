'use client'

import PropertyCard from "./propertyCard"


const properties = [
  {
    category: 'Apartment',
    title: 'Modern Downtown Apartment',
    location: 'Downtown District',
    bedrooms: 2,
    bathrooms: 2,
    size: '1,200 sqft',
    rent: 2500,
    availability: 'Available Now',
  },
  {
    category: 'Villa',
    title: 'Luxury Suburban Villa',
    location: 'Riverside Estate',
    bedrooms: 4,
    bathrooms: 3,
    size: '3,500 sqft',
    rent: 4800,
    availability: 'Available Now',
  },
  {
    category: 'Studio',
    title: 'Cozy Studio Apartment',
    location: 'Arts District',
    bedrooms: 1,
    bathrooms: 1,
    size: '500 sqft',
    rent: 1200,
    availability: 'Available Soon',
  },
  {
    category: 'Family House',
    title: 'Spacious Family Home',
    location: 'Green Valley',
    bedrooms: 3,
    bathrooms: 2,
    size: '2,400 sqft',
    rent: 3500,
    availability: 'Available Now',
  },
  {
    category: 'Duplex',
    title: 'Contemporary Duplex',
    location: 'Midtown Heights',
    bedrooms: 2,
    bathrooms: 2,
    size: '1,800 sqft',
    rent: 2800,
    availability: 'Available Now',
  },
  {
    category: 'Office Space',
    title: 'Prime Business Office',
    location: 'Corporate Park',
    bedrooms: 0,
    bathrooms: 2,
    size: '2,000 sqft',
    rent: 3200,
    availability: 'Available Soon',
  },
]

export default function FeaturedProperties() {
return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Properties</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium rental properties verified by trusted landlords.
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </section>
  )
}
