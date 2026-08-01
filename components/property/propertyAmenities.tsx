'use client'

import { Badge } from '@/components/ui/badge'

interface PropertyAmenitiesProps {
  facilities: string[]
}

export function PropertyAmenities({ facilities }: PropertyAmenitiesProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-foreground mb-4">Amenities</h3>
      <div className="flex flex-wrap gap-2">
        {facilities.map((facility, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm">
            {facility}
          </Badge>
        ))}
      </div>
    </div>
  )
}
