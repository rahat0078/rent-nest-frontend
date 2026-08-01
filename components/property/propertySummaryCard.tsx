'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bed, Bath, Ruler, Check, Heart } from 'lucide-react'

interface PropertySummaryCardProps {
  rentAmount: number
  isAvailable: boolean
  category: string
  sizeSqFt: number
  bedrooms: number
  bathrooms: number
}

export function PropertySummaryCard({
  rentAmount,
  isAvailable,
  category,
  sizeSqFt,
  bedrooms,
  bathrooms,
}: PropertySummaryCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6 sticky top-24">
      {/* Price */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
        <p className="text-3xl font-bold text-primary">${rentAmount.toLocaleString()}</p>
      </div>

      {/* Status and Category */}
      <div className="flex items-center gap-2">
        {isAvailable ? (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-700">
            <Check className="w-3 h-3" />
            Available
          </Badge>
        ) : (
          <Badge variant="destructive">Rented</Badge>
        )}
        <Badge variant="secondary">{category}</Badge>
      </div>

      {/* Property Details */}
      <div className="space-y-3 border-t border-b border-border py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Size</span>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{sizeSqFt} sq ft</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Bedrooms</span>
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{bedrooms}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Bathrooms</span>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{bathrooms}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full">Request Rental</Button>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Save Property
        </Button>
      </div>
    </div>
  )
}
