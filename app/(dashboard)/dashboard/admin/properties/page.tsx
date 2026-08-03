import { Building2 } from "lucide-react";
import { PropertyTable } from "@/components/dashboard/admin/property-table";
import { getAllProperties } from "../_adminActions/adminActions";

export default async function PropertyModerationPage() {
  const res = await getAllProperties();


  const properties = res.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          Content Moderation: Properties
        </h1>
        <p className="text-xs text-muted-foreground">
          Review listed properties across Dhaka, verify landlord authenticity, and monitor availability status.
        </p>
      </div>

      <PropertyTable properties={properties} />
    </div>
  );
}