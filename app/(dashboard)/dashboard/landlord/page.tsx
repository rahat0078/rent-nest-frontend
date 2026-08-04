"use client";

import { LandlordHeader } from "@/components/dashboard/landlord/landlord-header";
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

const STATS = [
  { icon: Building2, label: "Total Properties", value: "12", trend: 8 },
  { icon: Home, label: "Available Properties", value: "8", trend: 12 },
  { icon: Clock, label: "Pending Requests", value: "5", trend: -5 },
  { icon: CheckCircle, label: "Active Rentals", value: "4", trend: 0 },
  { icon: DollarSign, label: "Total Earnings", value: "$24,500", trend: 15 },
];

const RECENT_PROPERTIES = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    title: "Luxury Apartment Downtown",
    category: "Apartment",
    location: "Downtown, New York",
    rent: 3500,
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    available: true,
    createdDate: "2 days ago",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    title: "Modern Studio",
    category: "Studio",
    location: "Upper East Side",
    rent: 1800,
    bedrooms: 0,
    bathrooms: 1,
    size: 600,
    available: true,
    createdDate: "5 days ago",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1560440021-33f237b74148?w=400&h=300&fit=crop",
    title: "Spacious Family Home",
    category: "Family House",
    location: "Brooklyn Heights",
    rent: 4200,
    bedrooms: 4,
    bathrooms: 3,
    size: 2500,
    available: false,
    createdDate: "1 week ago",
  },
];

const RECENT_REQUESTS = [
  {
    id: "1",
    tenantImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    tenantName: "Sarah Johnson",
    propertyTitle: "Luxury Apartment Downtown",
    moveInDate: "Jan 15, 2025",
    message:
      "Interested in renting this beautiful apartment. Very interested in moving ASAP.",
    status: "PENDING" as const,
  },
  {
    id: "2",
    tenantImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    tenantName: "Michael Chen",
    propertyTitle: "Modern Studio",
    moveInDate: "Jan 20, 2025",
    message: "Perfect for my needs. Would like to schedule a viewing.",
    status: "APPROVED" as const,
  },
  {
    id: "3",
    tenantImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    tenantName: "Emily Rodriguez",
    propertyTitle: "Spacious Family Home",
    moveInDate: "Feb 1, 2025",
    message: "Looking for a family home. This seems perfect for us!",
    status: "ACTIVE" as const,
  },
];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

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
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">
                Recent Properties
              </h2>
              <Link href="/dashboard/landlord/properties">
                <Button variant="ghost" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECENT_PROPERTIES.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </section>

          {/* Recent Rental Requests */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">
                Recent Rental Requests
              </h2>
              <Link href="/dashboard/landlord/requests">
                <Button variant="ghost" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT_REQUESTS.map((request) => (
                <RentalRequestCard key={request.id} {...request} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
