'use client'

import { Badge } from '@/components/ui/badge'

interface AmenitiesProps {
  amenities: string[]
}

export function Amenities({ amenities }: AmenitiesProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Amenities</h3>

      <div className="flex flex-wrap gap-3">
        {amenities.map((amenity) => (
          <Badge
            key={amenity}
            variant="secondary"
            className="px-3 py-1.5 text-sm font-medium"
          >
            {amenity}
          </Badge>
        ))}
      </div>
    </div>
  )
}
