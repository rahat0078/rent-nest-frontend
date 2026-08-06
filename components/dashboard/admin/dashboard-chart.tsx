import { BarChart3, Calendar, Layers } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DashboardChart() {
  return (
    <div className="grid gap-4 lg:grid-cols-7">
      {/* Platform Growth Chart Card */}
      <Card className="lg:col-span-4 border-border/70 shadow-2xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              User Registration & Growth
            </CardTitle>
            <CardDescription className="text-xs">
              Monthly overview of new Tenants vs Landlords in 2026
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-normal font-mono">
            2026 YTD
          </Badge>
        </CardHeader>
        <CardContent>
          {/* Static Chart Mockup Representation */}
          <div className="h-64 w-full flex flex-col justify-end gap-3 pt-6 pb-2">
            <div className="flex-1 flex items-end justify-between gap-3 px-2 border-b border-border pb-2">
              {[
                { month: "Jan", h1: "40%", h2: "20%" },
                { month: "Feb", h1: "55%", h2: "30%" },
                { month: "Mar", h1: "45%", h2: "25%" },
                { month: "Apr", h1: "70%", h2: "40%" },
                { month: "May", h1: "85%", h2: "50%" },
                { month: "Jun", h1: "65%", h2: "35%" },
                { month: "Jul", h1: "95%", h2: "60%" },
              ].map((bar, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer"
                >
                  <div className="w-full max-w-7 flex items-end justify-center gap-1 h-full">
                    <div
                      style={{ height: bar.h1 }}
                      className="w-1/2 bg-primary/80 rounded-t-xs group-hover:bg-primary transition-all"
                    />
                    <div
                      style={{ height: bar.h2 }}
                      className="w-1/2 bg-chart-2/80 rounded-t-xs group-hover:bg-chart-2 transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono mt-1">
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-muted-foreground">Tenants</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">Landlords</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rental Status Breakdown */}
      <Card className="lg:col-span-3 border-border/70 shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            Rental Request Distribution
          </CardTitle>
          <CardDescription className="text-xs">
            Live request breakdown across the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Active Rentals
              </span>
              <span className="font-mono">50% (1)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-emerald-500 w-1/2 rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Approved (Pending Payment)
              </span>
              <span className="font-mono">50% (1)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-blue-500 w-1/2 rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Pending Verification
              </span>
              <span className="font-mono">0% (0)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-amber-500 w-0 rounded-full" />
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-muted/40 p-3 border border-border/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Total Revenue Vol:</span>
            </div>
            <span className="font-mono font-bold text-foreground">
              ৳ 108,500
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
