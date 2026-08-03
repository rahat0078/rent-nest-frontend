import { Calendar, Plus, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/dashboard/admin/stats-cards";
import { DashboardChart } from "@/components/dashboard/admin/dashboard-chart";
import { RecentActivities } from "@/components/dashboard/admin/recent-activities";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              Welcome back, Ruhul
            </h1>
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Today is Monday, August 3, 2026</span>
            <span>•</span>
            <span>Platform Overview</span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh Data
          </Button>
          <Button size="sm" className="h-9 text-xs gap-1.5 shadow-xs">
            <Plus className="h-3.5 w-3.5" />
            Quick Export
          </Button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <StatsCards />

      {/* Charts Section */}
      <DashboardChart />

      {/* Bottom Activities */}
      <RecentActivities />
    </div>
  );
}