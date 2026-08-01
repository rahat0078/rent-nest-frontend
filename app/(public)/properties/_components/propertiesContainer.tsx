"use client";

import { PropertyGrid } from "@/components/property/propertyGrid";
import { PropertySearch } from "@/components/property/propertySearch";
import { PropertyPagination } from "@/components/property/propertyPagination";
import { IProperty } from "@/types/property";
import { TMeta } from "@/types/api";
import { PropertyFilters } from "@/components/property/propertyFIlters";

interface Props {
  initialProperties: IProperty[];
  meta: TMeta;
}

export function PropertiesContainer({
  initialProperties,
  meta,
}: Props) {
  return (
    <div>
      <div className="mb-8">
        <PropertySearch />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          {/* Removed categories prop */}
          <PropertyFilters />
        </aside>

        <div className="lg:col-span-3 flex flex-col min-h-125">
          <div className="grow">
            {initialProperties.length > 0 ? (
              <PropertyGrid properties={initialProperties} />
            ) : (
              <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">No properties found matching your criteria.</p>
              </div>
            )}
          </div>

          {meta.totalPage && meta.page && meta.totalPage > 1 && (
            <div className="mt-8">
              <PropertyPagination 
                currentPage={meta.page} 
                totalPages={meta.totalPage} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}