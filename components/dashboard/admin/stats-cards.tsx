import {
  Users,
  Building2,
  FileCheck,
  UserCheck,
  Home,
  UserX,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const mockStats = [
  {
    title: "Total Users",
    value: "12",
    growth: "+18.2%",
    timeframe: "from last month",
    icon: Users,
    description: "All registered system users",
  },
  {
    title: "Total Properties",
    value: "5",
    growth: "+12.5%",
    timeframe: "from last month",
    icon: Building2,
    description: "Active platform listings",
  },
  {
    title: "Rental Requests",
    value: "2",
    growth: "+8.4%",
    timeframe: "from last month",
    icon: FileCheck,
    description: "Pending and approved requests",
  },
  {
    title: "Active Tenants",
    value: "8",
    growth: "+22.0%",
    timeframe: "from last month",
    icon: UserCheck,
    description: "Users looking for properties",
  },
  {
    title: "Active Landlords",
    value: "3",
    growth: "+5.1%",
    timeframe: "from last month",
    icon: Home,
    description: "Verified property managers",
  },
  {
    title: "Banned Users",
    value: "0",
    growth: "0%",
    timeframe: "clean record",
    icon: UserX,
    description: "Flagged or suspended accounts",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {mockStats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card
            key={i}
            className="border-border/70 shadow-2xs hover:border-border transition-all duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/60 text-foreground">
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <TrendingUp className="h-3 w-3 mr-0.5 inline" />
                  {stat.growth}
                </span>
                <span className="text-muted-foreground text-[11px]">
                  {stat.timeframe}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}