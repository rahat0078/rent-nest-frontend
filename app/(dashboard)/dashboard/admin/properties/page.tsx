import { PropertyTable } from "@/components/dashboard/admin/property-table";
import { SearchFilter } from "@/components/dashboard/admin/search-filter";
import { Building2 } from "lucide-react";


export default function PropertyModerationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1 border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          Content Moderation: Properties
        </h1>
        <p className="text-xs text-muted-foreground">
          Review listed properties across Dhaka, verify landlord authenticity, and monitor availability status.
        </p>
      </div>

      {/* Filter Toolbar */}
      <SearchFilter
        searchPlaceholder="Search property title, location or landlord..."
        filter1Label="Category"
        filter1Options={[
          { value: "APARTMENT", label: "Apartment" },
          { value: "STUDIO", label: "Studio" },
          { value: "VILLA", label: "Villa" },
          { value: "OFFICE", label: "Office" },
          { value: "HOUSE", label: "House" },
        ]}
        filter2Label="Availability"
        filter2Options={[
          { value: "AVAILABLE", label: "Available" },
          { value: "UNAVAILABLE", label: "Unavailable / Rented" },
        ]}
      />

      {/* Data Table */}
      <PropertyTable />
    </div>
  );
}