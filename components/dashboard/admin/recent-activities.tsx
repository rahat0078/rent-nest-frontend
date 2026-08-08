import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, CreditCard, } from "lucide-react";
import { TUser } from "@/app/(dashboard)/dashboard/admin/_adminActions/adminActions";

// Define custom interface for mapped request format
interface TFormattedRequest {
  id: string;
  propertyName: string;
  tenantName: string;
  amount: number;
  status: "ACTIVE" | "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
}

interface RecentActivitiesProps {
  recentUsers: TUser[];
  recentRequests: TFormattedRequest[]; // Updated type
}

export function RecentActivities({
  recentUsers,
  recentRequests,
}: RecentActivitiesProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Recent Users Card */}
      <Card className="border-border/70 shadow-2xs">
        {/* ... un-changed user card code ... */}
      </Card>

      {/* Recent Rental Requests Card */}
      <Card className="border-border/70 shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Recent Rental Activity
            </span>
            <Badge variant="outline" className="text-[10px] font-normal">
              Transactions
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Latest request submission & payment updates
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border/60">
          {recentRequests.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">
              No recent rental requests.
            </p>
          ) : (
            recentRequests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-none">
                      {req.propertyName} {/* Updated */}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-none mt-1">
                      By {req.tenantName} {/* Updated */}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-xs font-bold text-foreground">
                    ${req.amount ? req.amount.toLocaleString() : 0} {/* Updated */}
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      req.status === "ACTIVE" || req.status === "APPROVED"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] h-4"
                        : "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] h-4"
                    }
                  >
                    {req.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}