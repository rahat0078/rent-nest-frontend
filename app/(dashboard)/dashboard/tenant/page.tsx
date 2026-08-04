import { FileText, CheckCircle2, Home, Trophy } from "lucide-react";
import QuickActions from "@/components/dashboard/tenant/quick-actions";
import StatsCard from "@/components/dashboard/tenant/stat-card";
import { getTenantRentalStat } from "./_tenantActions/getTenantStats";

interface TenantRentalStats {
  totalRequests?: number;
  approvedRequests?: number;
  activeRentals?: number;
  completedRentals?: number;
}

export default async function TenantDashboardPage() {
  const response = await getTenantRentalStat();
  const data: TenantRentalStats = response?.data || {};

  const stats = [
    {
      icon: FileText,
      title: "Total Requests",
      value: String(data.totalRequests ?? 0),
      description: "Rental requests submitted",
      color: "text-blue-600",
    },
    {
      icon: CheckCircle2,
      title: "Approved Requests",
      value: String(data.approvedRequests ?? 0),
      description: "Successfully approved",
      color: "text-green-600",
    },
    {
      icon: Home,
      title: "Active Rentals",
      value: String(data.activeRentals ?? 0),
      description: "Currently active leases",
      color: "text-orange-600",
    },
    {
      icon: Trophy,
      title: "Completed Rentals",
      value: String(data.completedRentals ?? 0),
      description: "Successfully completed",
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
