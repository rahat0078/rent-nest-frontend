"use client";

import { StatCard } from "@/components/dashboard/landlord/stat-card";
import { PropertyCard } from "@/components/dashboard/landlord/property-card";
import { RentalRequestCard } from "@/components/dashboard/landlord/rental-request-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Home,
  Building2,
  Clock,
  CheckCircle,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { LandlordHeader } from "@/components/dashboard/landlord/landlord-header";

export default function LandlordDashboard() {
  return (
    <>
      <LandlordHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your rental business."
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Stats Grid */}

          {/* Quick Actions */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link href="/dashboard/landlord/properties/new">
                <Button className="w-full">Create New Property</Button>
              </Link>
              <Link href="/dashboard/landlord/requests">
                <Button variant="outline" className="w-full">
                  Review Rental Requests
                </Button>
              </Link>
              <Link href="/dashboard/landlord/properties">
                <Button variant="outline" className="w-full">
                  Manage Properties
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Properties */}

          {/* Recent Rental Requests */}
        </div>
      </div>
    </>
  );
}
