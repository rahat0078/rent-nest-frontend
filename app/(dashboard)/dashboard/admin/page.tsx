import { StatsCards } from "@/components/dashboard/admin/stats-cards";
import { getAllProperties, getAllRentalRequests, getAllUsers } from "./_adminActions/adminActions";
import { RecentActivities } from "@/components/dashboard/admin/recent-activities";


export default async function AdminDashboardPage() {
  // Parallel Data Fetching
  const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getAllUsers(),
    getAllProperties(),
    getAllRentalRequests(),
  ]);

  const users = usersRes?.data?.users || [];
  const properties = propertiesRes?.data || [];
  const rentals = rentalsRes?.data || [];

  // Calculating Statistics dynamically from retrieved database records
  const stats = {
    totalUsers: usersRes?.data?.totalUsers || users.length,
    totalProperties: properties.length,
    totalRentals: rentals.length,
    activeTenants: users.filter((u) => u.role === "TENANT" && u.status === "ACTIVE").length,
    activeLandlords: users.filter((u) => u.role === "LANDLORD" && u.status === "ACTIVE").length,
    bannedUsers: users.filter((u) => u.status === "BANNED").length,
  };

  // Format recent users & rental requests for display
  const recentUsers = users.slice(-5).reverse();
  const recentRequests = rentals.slice(-5).reverse().map((r) => ({
    id: r.id,
    propertyName: r.property?.title || "Property",
    tenantName: r.tenant?.name || "Tenant",
    amount: r.payment?.amount || r.property?.rentAmount || 0,
    status: r.status,
  }));

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-sm text-muted-foreground">
          Platform performance metrics and recent operations
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Recent Activity Section */}
      <RecentActivities recentUsers={recentUsers} recentRequests={recentRequests} />
    </div>
  );
}