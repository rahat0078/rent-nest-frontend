import { SearchFilter } from "@/components/dashboard/admin/search-filter";
import { UsersTable } from "@/components/dashboard/admin/users-table";
import { Users } from "lucide-react";

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          User Management
        </h1>
        <p className="text-xs text-muted-foreground">
          Inspect registered users, manage platform roles, and handle account status suspensions.
        </p>
      </div>

      {/* Filter Toolbar */}
      <SearchFilter
        searchPlaceholder="Search by name, email or phone..."
        filter1Label="Role"
        filter1Options={[
          { value: "TENANT", label: "Tenant" },
          { value: "LANDLORD", label: "Landlord" },
          { value: "ADMIN", label: "Admin" },
        ]}
        filter2Label="Status"
        filter2Options={[
          { value: "ACTIVE", label: "Active" },
          { value: "BLOCKED", label: "Banned / Blocked" },
        ]}
      />

      {/* Data Table */}
      <UsersTable />
    </div>
  );
}