"use client";

import { IProperty } from "@/types/property";
import { PropertyCard } from "./propertyCard";

interface Props {
  properties: IProperty[];
}

export function PropertyGrid({ properties }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
