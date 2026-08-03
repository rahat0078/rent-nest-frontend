import { UsersTableClient } from "@/components/dashboard/admin/users-table-client";
import { getAllUsers } from "../_adminActions/adminActions";

export default async function AdminUsersPage() {
  const usersRes = await getAllUsers();
  const users = usersRes?.data?.users || [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-sm text-muted-foreground">
          View, filter, and manage platform user accounts.
        </p>
      </div>

      {/* Client component for Instant Search, Filter and Status Update */}
      <UsersTableClient initialUsers={users} />
    </div>
  );
}