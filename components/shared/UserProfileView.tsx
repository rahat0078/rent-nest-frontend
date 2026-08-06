"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import { TGetMeResponse } from "@/app/(auth)/_authActions/getMe";
import { LandlordHeader } from "../dashboard/landlord/landlord-header";
import TenantHeader from "../dashboard/tenant/tenant-header";

interface UserProfileViewProps {
  user: TGetMeResponse;
}

export function UserProfileView({ user }: UserProfileViewProps) {
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name,
  )}&background=random&size=128`;

  return (
    <>
      {
        user.role === "ADMIN" ? "" : user.role === "LANDLORD" ? <LandlordHeader title="My Profile" description="Manage your personal details and account status."/>: <TenantHeader/>
      }
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                <Image
                  unoptimized
                  src={user.profilePhoto || defaultAvatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {user.name}
                  </h2>
                  <Badge
                    variant={user.status === "ACTIVE" ? "default" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  {user.email}
                </p>
                <div className="pt-1">
                  <Badge
                    variant="outline"
                    className="uppercase tracking-wider text-xs"
                  >
                    Role: {user.role}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details Grid */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  <p className="font-medium text-foreground">
                    {user.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Account Status
                  </p>
                  <p className="font-medium text-foreground capitalize">
                    {user.status.toLowerCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="font-medium text-foreground">
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
