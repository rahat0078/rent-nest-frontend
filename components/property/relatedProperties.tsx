'use client'

import { IProperty } from "@/types/property"
import { PropertyCard } from "./propertyCard"


interface RelatedPropertiesProps {
  properties: IProperty[]
}

export function RelatedProperties({ properties }: RelatedPropertiesProps) {
  return (
    <div className="space-y-6 pt-8 border-t border-border">
      <h3 className="text-2xl font-bold text-foreground">Related Properties</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
