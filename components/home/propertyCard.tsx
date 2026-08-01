'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Ruler, MapPin } from 'lucide-react'

interface PropertyCardProps {
  image?: string
  category: string
  title: string
  location: string
  bedrooms: number
  bathrooms: number
  size: string
  rent: number
  availability: string
}

export default function PropertyCard({
  image,
  category,
  title,
  location,
  bedrooms,
  bathrooms,
  size,
  rent,
  availability,
}: PropertyCardProps) {
  return (
    <div className="group rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card">
      {/* Image Placeholder */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-2m-9-2l4 2m0-11L9 3m6 0l-4-2" />
          </svg>
        </div>
        <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">{category}</Badge>
        <Badge variant="outline" className="absolute top-4 right-4 bg-background/80 border-border">
          {availability}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-3 py-4 border-y border-border">
          <div className="flex flex-col items-center gap-1 text-center">
            <Bed className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-medium text-foreground">{bedrooms}</span>
            <span className="text-xs text-muted-foreground">Beds</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Bath className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-medium text-foreground">{bathrooms}</span>
            <span className="text-xs text-muted-foreground">Baths</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Ruler className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-medium text-foreground">{size}</span>
            <span className="text-xs text-muted-foreground">Size</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Monthly Rent</p>
            <p className="text-2xl font-bold text-primary"> ৳{rent}</p>
          </div>
          <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
