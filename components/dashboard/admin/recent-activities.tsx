import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus, Building, CreditCard, Clock } from "lucide-react";

export const mockRecentUsers = [
  {
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "TENANT",
    photo: "https://i.pravatar.cc/300?img=47",
    date: "Jul 30, 2026",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    role: "LANDLORD",
    photo: "https://i.pravatar.cc/300?img=12",
    date: "Jul 30, 2026",
  },
  {
    name: "Robin Rana",
    email: "robin@example.com",
    role: "TENANT",
    photo: "https://i.pravatar.cc/300?img=5",
    date: "Jul 30, 2026",
  },
];

export const mockRecentRequests = [
  {
    id: "REQ-d41d",
    tenant: "Tanvir Hasan",
    property: "Studio Apartment",
    amount: "৳13,500",
    status: "APPROVED",
    date: "Jul 9, 2026",
  },
  {
    id: "REQ-b163",
    tenant: "Tanvir Hasan",
    property: "Luxury Villa",
    amount: "৳95,000",
    status: "ACTIVE",
    date: "Jul 9, 2026",
  },
];

export function RecentActivities() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Recent Users Card */}
      <Card className="border-border/70 shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-primary" />
              Recently Registered Users
            </span>
            <Badge variant="outline" className="text-[10px] font-normal">
              Latest 3
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Newest tenants and landlords onboarded
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border/60">
          {mockRecentUsers.map((u, idx) => (
            <div key={idx} className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={u.photo} alt={u.name} />
                  <AvatarFallback>{u.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">
                    {u.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-none mt-1">
                    {u.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant={u.role === "LANDLORD" ? "secondary" : "outline"}
                  className="text-[10px] px-2 py-0 h-4 font-mono"
                >
                  {u.role}
                </Badge>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {u.date}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
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
          {mockRecentRequests.map((req, idx) => (
            <div key={idx} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                  <Building className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">
                    {req.property}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-none mt-1">
                    By {req.tenant}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-mono text-xs font-bold text-foreground">
                  {req.amount}
                </span>
                <Badge
                  variant="outline"
                  className={
                    req.status === "ACTIVE"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] h-4"
                      : "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] h-4"
                  }
                >
                  {req.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}