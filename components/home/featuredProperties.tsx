'use client'

import { IProperty } from "@/types/property";
import PropertyCard from "./propertyCard"



type FeaturedPropertiesProps = {
  properties: IProperty[];
};

export default function FeaturedProperties({properties}: FeaturedPropertiesProps) {
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
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  )
}
