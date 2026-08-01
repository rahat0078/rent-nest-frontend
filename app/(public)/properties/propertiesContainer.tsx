"use client";


import { PropertyFilters } from "@/components/property/propertyFIlters";
import { PropertyGrid } from "@/components/property/propertyGrid";
import { PropertySearch } from "@/components/property/propertySearch";
import { IProperty } from "@/types/property";



interface Props {
  initialProperties:IProperty[];
}


export function PropertiesContainer({
  initialProperties
}:Props){

  return (
    <div>


      <div className="mb-8">
        <PropertySearch/>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">


        <aside className="lg:col-span-1">
          <PropertyFilters/>
        </aside>


        <div className="lg:col-span-3">

          <PropertyGrid
            properties={initialProperties}
          />

        </div>


      </div>


    </div>
  )
}